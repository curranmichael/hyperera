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
    "slug": "serbia-vucic-resign",
    "headline": "Serbia's President Aleksandar Vučić says he will resign within weeks and call early elections",
    "overview": "Serbia's populist president Aleksandar Vučić told supporters at a Belgrade rally that he will step down within weeks, paving the way for early presidential and parliamentary elections. The announcement follows more than a year of student-led mass protests sparked by the November 2024 Novi Sad rail-station disaster that killed 16 people. Vučić, who is barred from a third term, said he would campaign to help his Serbian Progressive Party win the coming vote.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNaWswUmpzRjlYcjZidUdnOF9iYmxXUDVFNUdHRWdINUJ0bHliUjVva2I1dHNCUjRTTmRndXdfZlIwamRUanplQWhMcFI5bWJTWHZ3cXY0VzE4TTEwNjNoY1d1aFdadVdnMW1xeXJ3aEtoaFctZjhYd0J4dlR5REVlMG8tamU2aklpQWFQRG85UUR4SmtYenJmWTBsSkZmb2lOQ3kxMHhVMUViVEV0Z3J6cnFpZEs1TkZpcXc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/6/27/serbias-president-aleksandar-vucic-says-will-resign-within-weeks"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/serbia-vucic-resign.png",
      "alt": "Serbian President Aleksandar Vučić speaking at a podium",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Abdication of King Edward VIII (1936)",
        "excerpt": "But you must believe me when I tell you that I have found it impossible to carry the heavy burden of responsibility and to discharge my duties as King as I would wish to do without the help and support of the woman I love.",
        "source": "Edward VIII, Abdication broadcast, 11 December 1936 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Edward_VIII_of_the_United_Kingdom%27s_Abdication"
      },
      {
        "category": "historical",
        "title": "Napoleon's First Abdication at Fontainebleau (1814)",
        "excerpt": "The allied powers having proclaimed that the Emperor Napoleon was the sole obstacle to the re-establishment of peace in Europe, the Emperor Napoleon, faithful to his oath, declares that he is ready to descend from the throne, to leave France and even to lay down his life for the welfare of the fatherland, which cannot lie separated from the rights of his son, those of the regency of the Empress, and the laws of the Empire.",
        "source": "Act of Abdication of Napoleon I, Fontainebleau, April 1814 (Napoleon & Empire, official texts)",
        "href": "https://www.napoleon-empire.org/en/official-texts/abdication_1.php"
      },
      {
        "category": "literary",
        "title": "William Shakespeare, Richard II (Act IV, Scene 1 — the deposition)",
        "excerpt": "Now mark me, how I will undo myself; I give this heavy weight from off my head And this unwieldy sceptre from my hand, The pride of kingly sway from out my heart; With mine own tears I wash away my balm, With mine own hands I give away my crown, With mine own tongue deny my sacred state",
        "source": "Shakespeare, The Life and Death of King Richard II, Act IV, Scene 1 (MIT Complete Works of Shakespeare)",
        "href": "https://shakespeare.mit.edu/richardii/richardii.4.1.html"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.",
        "source": "P. B. Shelley, \"Ozymandias,\" Complete Poetical Works (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/4798/pg4798-images.html"
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky, Boris Godunov (opera, 1869–72) — musical work",
        "excerpt": "Mussorgsky's towering Russian opera dramatizes a guilt-haunted ruler whose grip on power dissolves amid popular unrest and rumor, culminating in the Tsar's anguished collapse and death. The brooding orchestral colors, the great Coronation Scene's pealing bells, and the surging choruses of the common people make the crowd itself a character that can lift up and bring down a sovereign. It is a study of the loneliness and impermanence of authority — apt for a strongman forced toward the exit by a restless nation.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)"
      },
      {
        "category": "artistic",
        "title": "Paul Delaroche, Napoleon I at Fontainebleau, 31 March 1814 (1840) — visual artwork",
        "excerpt": "Delaroche paints the once-invincible emperor slumped in a chair, his hat fallen to the floor and his boots still dirty from the field, the very image of a fallen strongman. The stillness and downcast gaze turn a world-shaking abdication into an intimate portrait of exhaustion and defeat. Against the empty room, the diminished figure makes vivid how swiftly absolute power can drain away under the weight of events.",
        "source": "Paul Delaroche, Museum der bildenden Künste, Leipzig (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:DelarocheNapoleon.jpg",
        "image": {
          "src": "/covers/serbia-vucic-resign--art.png",
          "alt": "Paul Delaroche's painting of a dejected Napoleon seated at Fontainebleau after his 1814 abdication, hat on the floor and gaze cast down.",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "pakistan-rangers-hq-attack",
    "headline": "Militant rams explosive-laden vehicle into Pakistan Rangers headquarters in Karachi, killing six",
    "overview": "A militant rammed an explosives-laden vehicle into the provincial headquarters of the paramilitary Pakistan Rangers in Karachi, setting off an intense gun battle with security forces. A little-known group, Jamaat-ul-Ahrar, claimed responsibility for the assault. At least three troops and three militants were killed, in the latest of a surge of attacks on Pakistani security forces.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxNN09XY3hBLUg0WUZOc3ZuZVRQSUsySjZtTVFSbWRMNTRFa3VzMjR0Y0hiODA0b2IyMG1tY1hpNHNmVENPN1Z6ajBmaV9hZXVqTWhfazJSU1NxOUxwZGpNRUJyM3RiT19rOENMcXB1MHhaNnpEZktweldza3poT1ZBcjBXZnNjb2IwMHhJdzlhbEd2TlA2RWRlQ3dUenJGSUxlOE9YamVDZzBMR3BZTHdFMmE5V2ZZVk9PRGlpM1VkSXdILUNPS0E?oc=5"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/06/27/pakistan-militants-attack-paramilitary-rangers-headquarters-karachi/f6a7895a-7254-11f1-8730-e7fd0e2a6404_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/pakistan-rangers-hq-attack.png",
      "alt": "Smoke and floodlights over the wall of a fortified security compound at night",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fall of Constantinople (1453): Storming of the Theodosian Walls",
        "excerpt": "Hassan and his twelve companions had reached the summit: the giant was precipitated from the rampart: he rose on one knee, and was again oppressed by a shower of darts and stones. But his success had proved that the achievement was possible: the walls and towers were instantly covered with a swarm of Turks; and the Greeks, now driven from the vantage ground, were overwhelmed by increasing multitudes.",
        "source": "Edward Gibbon, History of the Decline and Fall of the Roman Empire, Chapter LXVIII",
        "href": "https://www.ccel.org/g/gibbon/decline/volume2/chap68.htm"
      },
      {
        "category": "historical",
        "title": "The Storming of the Bastille (1789): The Fortress Stronghold Falls",
        "excerpt": "Smite, thou Louis Tournay, cartwright of the Marais, old-soldier of the Regiment Dauphine; smite at that Outer Drawbridge chain, though the fiery hail whistles round thee! ... Sinks the drawbridge,-- Usher Maillard bolting it when down; rushes-in the living deluge: the Bastille is fallen! Victoire! La Bastille est prise!",
        "source": "Thomas Carlyle, The French Revolution: A History (1837)",
        "href": "https://fulltextarchive.com/page/The-French-Revolution-A-History4"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry V — \"Once more unto the breach\" (Act III, Scene I)",
        "excerpt": "Once more unto the breach, dear friends, once more;\nOr close the wall up with our English dead!\nIn peace there's nothing so becomes a man,\nAs modest stillness and humility;",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act III, Scene I",
        "href": "https://poets.org/poem/henry-v-act-iii-scene-i-once-more-unto-breach-dear-friends"
      },
      {
        "category": "literary",
        "title": "Homer's Iliad, Book XII — Hector Bursts the Rampart Gate (trans. Pope)",
        "excerpt": "Then thundering through the planks, with forceful sway,\nDrives the sharp rock: the solid beams give way;\nThe folds are shattered; from the crackling door\nLeap the resounding bars, the flying hinges roar.",
        "source": "Homer, The Iliad, Book XII, translated by Alexander Pope",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_12"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture, Op. 49 (musical)",
        "excerpt": "Tchaikovsky's festival overture stages a battle in sound, opening with a solemn Orthodox hymn that is soon overrun by the clash of opposing themes, surging strings, and martial brass. The music drives toward a thunderous climax of cannon fire, pealing bells, and a triumphant fanfare, evoking the assault, defense, and breaking of a besieged stronghold. Its relentless escalation from quiet prayer to explosive violence mirrors the storming of a fortified position.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Emanuel Leutze, Storming of the Teocalli by Cortez and His Troops (1848) (visual artwork)",
        "excerpt": "Leutze's sweeping 1848 history painting depicts conquistadors fighting their way to the summit of an Aztec temple-pyramid in a desperate, close-quarters assault on a fortified height. Bodies tumble from the stone terraces as armored attackers and defenders grapple amid smoke, banners, and bristling weapons at the breached stronghold. The vertiginous composition captures the savagery of storming a citadel gate-by-gate to its very pinnacle.",
        "source": "Emanuel Leutze, Wadsworth Atheneum (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Leutze,_Emanuel_%E2%80%94_Storming_of_the_Teocalli_by_Cortez_and_His_Troops_%E2%80%94_1848.jpg",
        "image": {
          "src": "/covers/pakistan-rangers-hq-attack--art.png",
          "alt": "Spanish conquistadors storming the summit of an Aztec temple-pyramid in close combat, defenders falling from the terraces",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "iraq-green-zone-corruption-arrests",
    "headline": "Iraqi forces seal Baghdad's Green Zone and arrest seven officials, including five lawmakers, on corruption charges",
    "overview": "Iraqi security forces sealed off the fortified Green Zone in Baghdad and carried out overnight raids, arresting seven people, among them five members of parliament whose immunity had been lifted. The arrests, tied to testimony from a detained former deputy oil minister, are part of Prime Minister Ali Al Zaidi's escalating anti-corruption campaign. Some of those detained belong to the bloc of a former prime minister.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNMGNjMGlKN1dXNmp4T1lwWkhISjhBZF8wRXhHa0o5YzVPUjRiemZub1BFNFJBLWxCakU3d1NFUkxxb3k0aHR2a1V5OEFBMmRsQ3hWMXl4U0RtVDVOTVVuN0JTQkZwbWViWXBOWlV2NVJpNU1BelRoVmNkWHFHLWFJUmtrNWk0N1RVN1NF?oc=5"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/news/mena/2026/06/28/wave-of-overnight-arrests-hits-baghdads-green-zone-amid-anti-corruption-push/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/iraq-green-zone-corruption-arrests.png",
      "alt": "The Republican Palace inside Baghdad's fortified Green Zone",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Impeachment of Warren Hastings (Edmund Burke, 1788)",
        "excerpt": "Therefore, it is with confidence that, ordered by the Commons, I impeach Warren Hastings, Esquire, of high crimes and misdemeanors. I impeach him in the name of the Commons of Great Britain in Parliament assembled, whose parliamentary trust he has betrayed. I impeach him in the name of all the Commons of Great Britain, whose national character he has dishonored.",
        "source": "Edmund Burke, \"At the Trial of Warren Hastings,\" The World's Famous Orations, Vol. VI (via Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_World%27s_Famous_Orations/Volume_6/At_the_Trial_of_Warren_Hastings"
      },
      {
        "category": "historical",
        "title": "Cicero, The First Oration Against Verres (70 BC)",
        "excerpt": "For an opinion has now become established, pernicious to us, and pernicious to the republic, which has been the common talk of every one, not only at Rome, but among foreign nations also,—that in the courts of law as they exist at present, no wealthy man, however guilty he may be, can possibly be convicted.",
        "source": "Cicero, Against Verres I.1, trans. C. D. Yonge (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0018:text=Ver.:actio=1:book=1:section=1"
      },
      {
        "category": "literary",
        "title": "Dante, Inferno, Canto XXI — The Bolgia of the Peculators",
        "excerpt": "Behold one of the elders of Saint Zita; / Plunge him beneath, for I return for others / Unto that town, which is well furnished with them. / All there are barrators, except Bonturo; / No into Yes for money there is changed.",
        "source": "Dante Alighieri, The Divine Comedy: Hell, Canto XXI, trans. Henry Wadsworth Longfellow (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1001/pg1001-images.html"
      },
      {
        "category": "literary",
        "title": "The Cleansing of the Temple (Gospel of Matthew 21:12–13)",
        "excerpt": "And Jesus went into the temple of God, and cast out all them that sold and bought in the temple, and overthrew the tables of the moneychangers, and the seats of them that sold doves, And said unto them, It is written, My house shall be called the house of prayer; but ye have made it a den of thieves.",
        "source": "The Holy Bible, King James Version, Matthew 21:12–13 (via Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "artistic",
        "title": "Handel, Belshazzar, HWV 61 (1745) — oratorio (musical)",
        "excerpt": "Handel's oratorio sets the Book of Daniel's account of the doomed Babylonian king whose feast is interrupted by a divine hand inscribing the words of judgment upon the wall. With a single eerie violin line Handel paints the spectral writing taking form, and the prophet Daniel reads the verdict: the kingdom is weighed, found wanting, and divided. The mighty ruler is brought low overnight, his city falling to Cyrus, a tale of pride and venality answered by sudden reckoning.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Rembrandt, Belshazzar's Feast (c. 1635–1638) — painting (visual artwork)",
        "excerpt": "In Rembrandt's blazing canvas the Babylonian king recoils in terror from the supernatural Hebrew script glowing in the darkness above his banquet. Gold goblets plundered from the Temple spill their wine as courtiers shrink back, the whole scene lit by the cold fire of divine judgment. It captures the precise instant a powerful, sacrilegious ruler is told his reign of greed and impiety is finished.",
        "source": "Rembrandt, National Gallery, London (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt-Belsazar.jpg",
        "image": {
          "src": "/covers/iraq-green-zone-corruption-arrests--art.png",
          "alt": "Rembrandt's Belshazzar's Feast: a startled king turns from glowing Hebrew writing on the wall as gold vessels spill at a torchlit banquet",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "obamacare-enrollment-drops-subsidies",
    "headline": "Nearly 3 million Americans drop Affordable Care Act coverage after subsidies expire and premiums soar",
    "overview": "About 3 million fewer people held Affordable Care Act health plans in February than a year earlier, a 13% drop from 22.1 million to 19.2 million, according to new federal data. Health analysts attribute the decline to the January 1 expiration of enhanced federal subsidies, which sent premiums up by double and triple digits and priced many enrollees out. The administration instead credited a crackdown on fraudulent enrollment.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPclVEQU9pV2NjNEl5aWhjQnJHa05pSlNxUTgtanVod3dZR3N4ZXd6ZF9YSjdPREVzR3doaDN0WWZubzZPaGxOM0hyNlo1MHQ0d0RMRmtqWDVoZzU2Y1M4cXU0VkhGX2pYYlVOZDRub0MxcThXYnV0am05QXJoOEZLRGdTYUFzbE1fS1pxWE5QcmtpSThZM1dUZThVOUVPTFg1bWpUamxLLWc0eS1heUsydzJycGdVQQ?oc=5"
      },
      {
        "name": "U.S. News & World Report",
        "href": "https://www.usnews.com/news/business/articles/2026-06-27/millions-drop-obamacare-health-coverage-after-subsidies-expire-and-costs-rise"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/obamacare-enrollment-drops-subsidies.png",
      "alt": "A pharmacist filling prescriptions behind a counter",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Elizabethan Poor Law (An Acte for the Reliefe of the Poore, 1601)",
        "excerpt": "And also competent Sums of Money for and towards the necessary Relief of the Lame, Impotent, Old, Blind, and such other among them being Poor, and not able to work",
        "source": "An Act for the Relief of the Poor, 43 Elizabeth I (1601)",
        "href": "https://www.workhouses.org.uk/poorlaws/1601act.shtml"
      },
      {
        "category": "historical",
        "title": "Daniel Defoe, A Journal of the Plague Year (1722) — the poor untended in the Great Plague of London",
        "excerpt": "and had not public charity provided for these poor creatures, whose number was exceeding great and in all cases of this nature must be so, they would have been in the worst condition of any people in the city.",
        "source": "Daniel Defoe, A Journal of the Plague Year (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "literary",
        "title": "The Parable of the Good Samaritan (Gospel of Luke, King James Version)",
        "excerpt": "But a certain Samaritan, as he journeyed, came where he was: and when he saw him, he had compassion on him, And went to him, and bound up his wounds, pouring in oil and wine, and set him on his own beast, and brought him to an inn, and took care of him.",
        "source": "The Bible, King James Version, Luke 10:33–34 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Luke"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, A Christmas Carol (1843) — Scrooge refuses the charity collectors",
        "excerpt": "\"If they would rather die,\" said Scrooge, \"they had better do it, and decrease the surplus population.\"",
        "source": "Charles Dickens, A Christmas Carol (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/46/pg46.txt"
      },
      {
        "category": "artistic",
        "title": "Giovanni Battista Pergolesi, Stabat Mater, P.77 (1736) — musical work",
        "excerpt": "Pergolesi's final composition sets the medieval Latin sequence of the grieving mother standing at the foot of the cross, scored intimately for soprano, alto, strings, and continuo. Its aching suspensions and weeping melodic lines turn private sorrow into a universal cry of compassion for the suffering. The work has endured as one of music's most tender meditations on mercy in the face of pain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Stabat_Mater,_P.77_(Pergolesi,_Giovanni_Battista)"
      },
      {
        "category": "artistic",
        "title": "Luke Fildes, Applicants for Admission to a Casual Ward (1874) — visual artwork",
        "excerpt": "Fildes lines up a shivering queue of the homeless and destitute against a cold London wall as they wait for a ticket admitting them to a workhouse ward for a single night. Mothers clutch infants, the sick lean on the well, and a policeman regulates the desperate column, making charity feel rationed and grudging. A landmark of Victorian social realism, the painting confronts the viewer with the human face of poverty pushed to the edge of survival.",
        "source": "Luke Fildes, Applicants for Admission to a Casual Ward, Royal Holloway, University of London (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Luke_Fildes_(1843-1927)_-_Applicants_for_Admission_to_a_Casual_Ward_-_THC0021_-_Royal_Holloway,_University_of_London.jpg",
        "image": {
          "src": "/covers/obamacare-enrollment-drops-subsidies--art.png",
          "alt": "Oil painting of a ragged, weary line of poor men, women, and children waiting in the cold outside a workhouse casual ward",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "japan-tropical-storms-floods",
    "headline": "Two tropical storms batter Japan with floods and landslides, killing at least one",
    "overview": "Two storm systems, Mekkhala and Higos, struck Japan during the annual rainy season, dumping heavy rain that triggered landslides and flooding. A man in his 70s died and three people were injured when a house was buried by a landslide in Yamaguchi prefecture. Flooding alerts were issued across Kyoto, Osaka and other parts of western Japan, where dozens of homes were inundated.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNUHJCNzlnVE12LU51OWtkZVh2bHpLbFFneXdmbVB2bk5GOG9VSTctV0xEQU04a0VuSVJxVTdxSTVxRFdQSzRCZ2ptTWtlUE5UVDBNcktZNTBGcWRnMGctVXhQc3gwVWlTUkFyU09CMWp4X2ZqT3BmY0kxT1ZBLVhlR3BPOXZDUWxU?oc=5"
      },
      {
        "name": "Washington Times",
        "href": "https://www.washingtontimes.com/news/2026/jun/27/2-tropical-storms-pound-japan-floods-landslides-killing-1/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/japan-tropical-storms-floods.png",
      "alt": "Aerial view of floodwaters submerging streets and homes in Japan",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Johnstown Flood of 1889",
        "excerpt": "Houses were spinning through beneath the bridge, and I did not know at what moment the structure would melt away under the train.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (1889), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "historical",
        "title": "The Great Galveston Hurricane of 1900",
        "excerpt": "With the first shifting of the wind the waters of the Gulf swept over the city.",
        "source": "Paul Lester, The Great Galveston Disaster (1900), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/60105/60105-h/60105-h.htm"
      },
      {
        "category": "literary",
        "title": "The Genesis Flood (Genesis 7)",
        "excerpt": "The waters prevailed exceedingly on the earth. All the high mountains that were under the whole sky were covered.",
        "source": "Genesis 7:19, World English Bible, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(World_English)/Genesis"
      },
      {
        "category": "literary",
        "title": "The Deluge of Deucalion in Ovid's Metamorphoses, Book I",
        "excerpt": "And now sea and land had no mark of distinction; everything now was ocean; and to that ocean shores were wanting.",
        "source": "Ovid, Metamorphoses, Book I (trans. Henry T. Riley), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi, Violin Concerto in E-flat major, RV 253, \"La tempesta di mare\" (musical)",
        "excerpt": "Published in 1725 within Vivaldi's Op. 8, this Baroque concerto translates a storm at sea into sound, its outer Presto movements driving forward in restless surges of rushing strings that mimic howling wind and pounding waves. Between them a brief Largo offers a fragile lull, like a lone ship riding the swell before the tempest closes in again. The relentless rhythmic energy makes the listener feel small before the fury of the elements.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_E-flat_major,_RV_253_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "Katsushika Hokusai, \"The Great Wave off Kanagawa\" (visual artwork)",
        "excerpt": "In this iconic woodblock print from Hokusai's Thirty-six Views of Mount Fuji (c. 1831), a towering wave rears up with claw-like crests of foam, dwarfing the tiny fishing boats and the rowers clinging to them. Far in the distance, Mount Fuji sits small and serene beneath the curling water, underscoring humanity's fragility before nature's overwhelming power. It is perhaps the most famous image ever made of the sea's sublime and terrifying force.",
        "source": "Katsushika Hokusai (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Katsushika_Hokusai_-_Thirty-Six_Views_of_Mount_Fuji-_The_Great_Wave_Off_the_Coast_of_Kanagawa_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/japan-tropical-storms-floods--art.png",
          "alt": "A great cresting wave with foaming claw-like crests towers over small boats, with a small Mount Fuji in the distance",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "google-limits-meta-gemini",
    "headline": "Google limits Meta's access to its Gemini AI models amid a compute capacity crunch",
    "overview": "Google has capped Meta's use of its Gemini artificial-intelligence models after Meta sought more computing capacity than Google could supply, the Financial Times reported. Google told Meta around March it could not meet the full demand, delaying some of Meta's internal AI projects and prompting it to tell staff to use AI 'tokens' more efficiently. Other Google clients were affected to a lesser degree as the industry scrambles for scarce compute.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQOEhSTWNhT0E1aGtldms3cmlxVjFlOVl5Z2t1ZTRTU2hjb2FSV1ZfczIwOGMwU0JMU2lqNTI1THhWU0UyS1k5aGVrNjBlYy1Iek9TNW5DOXVmM2ZiUmUxaGVoZ0N0cDFLZTNXejVLWExrV01nR2hFY2N2c0FqT1JvM3V1R0l1eTlwLWVPbkg4SHZ2SzJRczc2dDBFaC1YQ1Y3dkE?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-06-28/google-caps-meta-s-use-of-gemini-ai-financial-times-reports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/google-limits-meta-gemini.png",
      "alt": "Rows of servers inside a data center",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nixon's Address on the Energy Shortages (1973)",
        "excerpt": "We are heading toward the most acute shortages of energy since World War II. Our supply of petroleum this winter will be at least 10 percent short of our anticipated demands, and it could fall short by as much as 17 percent.",
        "source": "Richard Nixon, Address to the Nation About Policies To Deal With the Energy Shortages, November 7, 1973 — The American Presidency Project",
        "href": "https://www.presidency.ucsb.edu/documents/address-the-nation-about-policies-deal-with-the-energy-shortages"
      },
      {
        "category": "historical",
        "title": "Augustus and Rome's Grain Supply (Res Gestae Divi Augusti)",
        "excerpt": "I did not decline in the great scarcity of corn and the superintendence of the supply, and I so administered it that within a few days I had freed the whole community from the immediate fear and peril through my expenditure and care.",
        "source": "Res Gestae Divi Augusti (The Achievements of the Deified Augustus), §5 — Wikisource",
        "href": "https://en.wikisource.org/wiki/Translation:The_Achievements_of_the_Deified_Augustus"
      },
      {
        "category": "literary",
        "title": "Hesiod, Works and Days — Zeus hides fire, Prometheus steals it",
        "excerpt": "But Zeus in the anger of his heart hid it, because Prometheus the crafty deceived him; therefore he planned sorrow and mischief against men. He hid fire; but that the noble son of Iapetus stole again for men from Zeus the counsellor in a hollow fennel-stalk, so that Zeus who delights in thunder did not see it.",
        "source": "Hesiod, Works and Days (Hugh G. Evelyn-White trans.) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/348/pg348.txt"
      },
      {
        "category": "literary",
        "title": "Aeschylus, Prometheus Bound — the stolen source of fire",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound (Theodore Alois Buckley trans.) — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "artistic",
        "title": "Beethoven — The Creatures of Prometheus, Op. 43 (musical)",
        "excerpt": "Beethoven's only full-length ballet, composed in 1800-01, dramatizes the Titan who carries divine fire to humankind and awakens lifeless clay figures into thinking, feeling beings. Its brilliant overture bursts open with a jolt of energy that mirrors the spark of stolen knowledge being handed to mortals, and the finale's heroic theme would later reappear in the Eroica Symphony. The work casts Prometheus as the great benefactor whose gift, like access to a guarded power, transforms those he chooses to bestow it upon.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jan Cossiers — Prometheus Carrying Fire, 1637 (visual artwork)",
        "excerpt": "In this Flemish Baroque oil painting, the Titan Prometheus strides through darkness shielding a single flickering torch, his muscular body twisting to guard the precious stolen fire from the night around him. The chiaroscuro turns the small flame into the painting's only true light, an image of a scarce and vital resource clutched against the dark. Based on a design by Rubens for the Torre de la Parada, it now hangs in the Museo del Prado.",
        "source": "Jan Cossiers, Museo del Prado (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Cossiers_-_Prometheus_Carrying_Fire.jpg",
        "image": {
          "src": "/covers/google-limits-meta-gemini--art.png",
          "alt": "Baroque painting of Prometheus striding through darkness, shielding a lit torch of stolen fire against his body",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "ukraine-strikes-russian-refineries",
    "headline": "Ukrainian drones strike two oil refineries in the Russian city of Ufa in overnight raids",
    "overview": "Ukraine said its Security Service drones struck two oil refineries, Ufaneftekhim and Bashneft Novoil, in the Russian city of Ufa, more than 1,300 kilometers from the front line. The raids are part of an intensified Ukrainian campaign against Russian energy infrastructure meant to choke fuel supplies and pressure Moscow toward negotiations. Russia said its defenses destroyed hundreds of drones overnight.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOYTFJUS10c1JERUVWMWFOZEsyR2xuRDlJNWZGQ2VvaVU3YWlxQjVzME50Nm10ZWVjMGUyNnZEZ0FjVlJldk9ydkVYNGdqdUt6UlJzWVk4c2MzM3NFMHV6ZDJuZU5XTy00YlBwZ0lmUWEtcER6OWk3eEotdmFXRTJ3STFnUVZnMlIzZllHYTFIZ1lKNkdUSzdtc0VWTXZZa1RaNmNv?oc=5"
      },
      {
        "name": "The Kyiv Independent",
        "href": "https://kyivindependent.com/ukrainian-drones-reportedly-strike-oil-refinery-in-russian-city-of-ufa/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/ukraine-strikes-russian-refineries.png",
      "alt": "An oil refinery's flare stacks burning against a dark night sky",
      "credit": "AI-generated"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sherman's telegram to Grant: \"make Georgia howl\" (October 9, 1864)",
        "excerpt": "Until we can repopulate Georgia it is useless to occupy it, but utter destruction of its roads, houses, and people will cripple their military resources. By attempting to hold the roads we will lose a thousand men monthly and will gain no result. \"I can make the march and make Georgia howl.\"",
        "source": "Telegram of William T. Sherman to Ulysses S. Grant, October 9, 1864 (Civil War Era NC, North Carolina State University)",
        "href": "https://cwnc.omeka.chass.ncsu.edu/items/show/143"
      },
      {
        "category": "historical",
        "title": "United States Strategic Bombing Survey: The Attack on Oil (1945)",
        "excerpt": "Consumption of oil exceeded production from May 1944 on. Accumulated stocks were rapidly used up, and in six months were practically exhausted.",
        "source": "The United States Strategic Bombing Survey, Summary Report (European War), 1945 — public-domain U.S. Government document",
        "href": "https://www.anesi.com/ussbs02.htm"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book II — the burning of Troy (Dryden's translation)",
        "excerpt": "The palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (Project Gutenberg eBook #228)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book XV — Hector calls for fire to burn the Greek ships (Pope's translation)",
        "excerpt": "Haste, bring the flames! the toil of ten long years\nIs finished, and the day desired appears;",
        "source": "Homer, The Iliad, Book XV, trans. Alexander Pope (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_15"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky — 1812 Overture, Op. 49 (musical)",
        "excerpt": "Tchaikovsky's thunderous festival overture stages the 1812 repulse of Napoleon's invasion of Russia as a sonic battlefield, building from a solemn hymn through churning martial themes to a climax punctuated by live cannon fire and pealing bells. The clash of the French \"Marseillaise\" against Russian melodies and the imperial anthem dramatizes an enemy army broken deep inside hostile territory. It remains the definitive orchestral evocation of war waged with fire, artillery, and the burning of a campaign's hopes.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner — The Burning of the Houses of Lords and Commons, 16 October 1834 (visual artwork)",
        "excerpt": "Turner's oil painting captures the night the Palace of Westminster went up in flames, a wall of orange-white fire roaring into the dark sky and reflecting in lurid streaks across the Thames. Tiny crowds and boats are dwarfed by the conflagration, conveying the helplessness of onlookers before an inferno consuming the heart of a nation's power. The blaze, set far from any front line yet striking at a symbolic stronghold, makes the canvas a vivid emblem of fire as both spectacle and instrument of destruction.",
        "source": "Philadelphia Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-strikes-russian-refineries--art.png",
          "alt": "J. M. W. Turner's painting of the Houses of Parliament engulfed in towering flames at night, the fire reflected across the Thames",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "dr-congo-first-world-cup-win",
    "headline": "DR Congo win their first World Cup match, beating Uzbekistan 3-1 to reach the round of 32",
    "overview": "DR Congo's Leopards won their first-ever World Cup match, coming from behind to beat Uzbekistan 3-1 and advance to the round of 32, where they will face England. Newcastle forward Yoane Wissa scored twice and Fiston Mayele added the other goal after Uzbekistan took an early lead. The result set off jubilation across the central African nation at the expanded 2026 tournament.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQaWMxczk0eGI3azhIenI2WjNWZU1QQTIydzZ3ekpsMU1nR2lUczM3OFpOS2VJTUtXRExQRlhCcm8zX2RuMVIzWl9yWkhBeU5sMEZ6SjVmUnVXNGZKd3ZmOWltdm9aN0ZHQTZYdjJlcVZRbVNFOXJjZFczUG1VWVJoLVJGMTBkdFc1OVo0OVRZQ2dUcWxWRFdkcWtLdXBzb3ZOOUN6Y1NmNFNYTDl1bnF1QjlOZFgxY3NfUlNia3pGWTg?oc=5"
      },
      {
        "name": "Sky Sports",
        "href": "https://www.skysports.com/football/news/12098/13556707/world-cup-2026-dr-congo-3-1-uzbekistan-yoane-wissa-stars-as-the-leopards-complete-comeback-win-to-set-up-last-32-clash-against-england"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/dr-congo-first-world-cup-win.png",
      "alt": "Jubilant Congolese football supporters celebrating in the stands",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Athenians charge at Marathon (490 BC)",
        "excerpt": "but the Athenians, closing all together with the Persians, fought in admirable fashion; for they were the first Greeks, within my knowledge, who charged their enemies at a run, and the first who endured the sight of Median garments and men clad therein; till then, the Greeks were affrighted by the very name of the Medes.",
        "source": "Herodotus, Histories, Book VI.112 (Godley translation)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/6c*.html"
      },
      {
        "category": "historical",
        "title": "The epitaph of the Spartans at Thermopylae (480 BC)",
        "excerpt": "Go tell the Spartans, thou that passest by, / That here obedient to their words we lie.",
        "source": "Herodotus, Histories, Book VII.228 (Godley translation)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/7D*.html"
      },
      {
        "category": "literary",
        "title": "David answers Goliath (1 Samuel 17:45-46, King James Bible)",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee.",
        "source": "The Holy Bible, King James Version, 1 Samuel 17:45-46",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "literary",
        "title": "Shakespeare, King Henry V — the St Crispin's Day speech",
        "excerpt": "From this day to the ending of the world, / But we in it shall be remembered; / We few, we happy few, we band of brothers; / For he to-day that sheds his blood with me / Shall be my brother.",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act IV, Scene III",
        "href": "https://en.wikisource.org/wiki/Henry_V_(1918)_Yale/Text/Act_IV"
      },
      {
        "category": "artistic",
        "title": "Handel, \"See, the Conqu'ring Hero Comes\" from Judas Maccabaeus, HWV 63 (musical)",
        "excerpt": "Composed by George Frideric Handel for his 1746 oratorio Judas Maccabaeus, this radiant chorus greets a victorious leader returning home in triumph, its melody rising from a single treble line into full, pealing rejoicing. Originally celebrating a small people's deliverance against a mighty empire, the march became the universal anthem of the hero's homecoming, sounded for conquerors and champions ever since. Its bright, processional swing turns a hard-won victory into shared public jubilation.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath (visual artwork)",
        "excerpt": "In Caravaggio's late masterpiece (c. 1610, Galleria Borghese, Rome), a young, almost sorrowful David holds aloft the severed head of the giant Goliath, the slain champion's face emerging from deep shadow. The unheralded shepherd boy has felled the seemingly invincible warrior, the eternal image of the small triumphing over the great. Caravaggio's stark light and unflinching realism make the underdog's victory feel both monumental and intimately human.",
        "source": "Caravaggio (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/dr-congo-first-world-cup-win--art.png",
          "alt": "Caravaggio's painting of a young David holding the severed head of the giant Goliath against a dark background",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "trump-250th-passport-portrait",
    "headline": "US to issue limited commemorative passports bearing Trump's portrait for America's 250th anniversary",
    "overview": "The State Department plans a limited release of commemorative US passports featuring a portrait of President Donald Trump, who would be the first living president pictured in the travel document, to mark the nation's 250th anniversary. Between 25,000 and 30,000 will be offered at the Washington passport office around July 4, with Trump's likeness and signature added to an interior page. The unusual design has drawn criticism as a cult-of-personality gesture.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce3ewkdgw9ro"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/politics/2026/06/27/trump-reveals-new-image-passports-mark-america-250th/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/trump-250th-passport-portrait.png",
      "alt": "A United States passport book",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius on Augustus remaking Rome in his own image",
        "excerpt": "he could justly boast that he had found it built of brick and left it in marble.",
        "source": "Suetonius, The Lives of the Caesars, Life of Augustus, ch. 28 (Loeb/Rolfe trans., LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Augustus*.html"
      },
      {
        "category": "historical",
        "title": "Augustus tallies his own statues in the Res Gestae",
        "excerpt": "Some eighty silver statues of me, on foot, on horse and in chariots had been set up in Rome ; I myself removed them, and with the money that they realized I set golden offerings in the temple of Apollo, in my own name and in the names of those who had honored me with the statues.",
        "source": "Res Gestae Divi Augusti, section 24 (English translation)",
        "href": "https://droitromain.univ-grenoble-alpes.fr/Anglica/resgest_engl.htm"
      },
      {
        "category": "literary",
        "title": "Shelley, \"Ozymandias\" — the ruler's image outlasted by ruin",
        "excerpt": "And on the pedestal these words appear:\n\"My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!\"\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "literary",
        "title": "\"Render unto Caesar\" — the image and superscription on the coin",
        "excerpt": "And he saith unto them, Whose is this image and superscription? They say unto him, Caesar's. Then saith he unto them, Render therefore unto Caesar the things which are Caesar's; and unto God the things that are God's.",
        "source": "Gospel of Matthew 22:20–21, King James Version",
        "href": "https://www.gutenberg.org/cache/epub/8040/pg8040.txt"
      },
      {
        "category": "artistic",
        "title": "Handel, \"Zadok the Priest\" from the Coronation Anthems, HWV 258–261 (musical)",
        "excerpt": "Composed in 1727 for the coronation of George II at Westminster Abbey, Handel's four Coronation Anthems are the supreme musical expression of sacred royal pageantry. \"Zadok the Priest,\" the most famous, opens with a long, swelling orchestral crescendo that bursts into a blaze of choral and trumpet acclamation at the words \"Zadok the Priest, and Nathan the Prophet anointed Solomon King.\" Sung at every British coronation since, it transforms the anointing of a ruler into an overwhelming public spectacle of legitimacy and power.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Coronation_Anthems,_HWV_258-261_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Ingres, \"Napoleon I on his Imperial Throne\" (1806) (visual artwork)",
        "excerpt": "Jean-Auguste-Dominique Ingres painted the newly crowned emperor enthroned in rigid frontal majesty, clutching the scepter of Charlemagne and the hand of justice, robed in ermine and gold like a Byzantine icon or pagan idol. The deliberately archaic, almost god-like image fuses the man and the symbols of absolute power into a single graven emblem of the state. Contemporaries found its cold grandeur unsettling — a portrait less of a person than of authority itself demanding worship.",
        "source": "Jean-Auguste-Dominique Ingres, Musée de l'Armée, Paris (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Ingres,_Napoleon_on_his_Imperial_throne.jpg",
        "image": {
          "src": "/covers/trump-250th-passport-portrait--art.png",
          "alt": "Ingres's 1806 state portrait of Napoleon I enthroned in coronation robes, holding scepter and hand of justice in rigid frontal majesty",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "nasa-webb-cigar-galaxy-image",
    "headline": "NASA's Webb telescope captures a 223-megapixel image of the Cigar Galaxy revealing 16.5 million stars",
    "overview": "NASA's James Webb Space Telescope has produced a 223-megapixel composite image of Messier 82, the Cigar Galaxy, resolving roughly 16.5 million stars across 65 hours of observation. The starburst galaxy, 12 million light-years away, is forming stars about ten times faster than the Milky Way. The image combines Webb's infrared data with Hubble's visible-light observations for unprecedented detail.",
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
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/nasa-webb-cigar-galaxy-image.png",
      "alt": "The Cigar Galaxy Messier 82 resolved into millions of stars by the Webb telescope",
      "credit": "NASA, ESA, CSA"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo turns his telescope on the Milky Way (Sidereus Nuncius, 1610)",
        "excerpt": "The Galaxy is nothing else but a mass of innumerable stars planted together in clusters.",
        "source": "Galileo Galilei, Sidereus Nuncius (The Sidereal Messenger, 1610), trans. Edward Stafford Carlos",
        "href": "https://www.gutenberg.org/cache/epub/46036/pg46036-images.html"
      },
      {
        "category": "historical",
        "title": "Galileo on the uncountable small stars revealed by the spyglass",
        "excerpt": "a vast crowd of stars presents itself to view; many of them are tolerably large and extremely bright, but the number of small ones is quite beyond determination.",
        "source": "Galileo Galilei, Sidereus Nuncius (The Sidereal Messenger, 1610), trans. Edward Stafford Carlos",
        "href": "https://www.gutenberg.org/cache/epub/46036/pg46036-images.html"
      },
      {
        "category": "literary",
        "title": "Psalm 8 — \"When I consider thy heavens\" (King James Bible)",
        "excerpt": "When I consider thy heavens, the work of thy fingers, the moon and the stars, which thou hast ordained; What is man, that thou art mindful of him?",
        "source": "The Bible, King James Version, Psalm 8:3–4",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "Walt Whitman, \"When I Heard the Learn'd Astronomer\" (1865)",
        "excerpt": "Till rising and gliding out I wander'd off by myself, In the mystical moist night-air, and from time to time, Look'd up in perfect silence at the stars.",
        "source": "Walt Whitman, Leaves of Grass (\"When I Heard the Learn'd Astronomer,\" 1865)",
        "href": "https://www.poetryfoundation.org/poems/45479/when-i-heard-the-learnd-astronomer"
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, \"The Heavens Are Telling\" from The Creation (Die Schöpfung, 1798) — musical",
        "excerpt": "Closing Part I of Haydn's oratorio, this radiant chorus sets Psalm 19 — \"The heavens are telling the glory of God\" — for soloists and full chorus. The voices build from hushed wonder to a jubilant fugue on \"and the firmament sheweth his handywork,\" turning the contemplation of the star-filled sky into an outpouring of cosmic praise. It remains the work's most beloved hymn to the order and grandeur of the heavens.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "Vincent van Gogh, The Starry Night (1889) — visual artwork",
        "excerpt": "Painted from his asylum window at Saint-Rémy in 1889, Van Gogh's most famous canvas swirls a luminous night sky of blazing stars and a radiant crescent moon above a quiet village. Thick, rhythmic brushstrokes set the heavens churning in spirals of blue and gold, conveying both the immensity and the emotional pull of the cosmos. It endures as art's defining vision of humanity gazing up in awe at the stars.",
        "source": "Vincent van Gogh, The Starry Night, Museum of Modern Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/nasa-webb-cigar-galaxy-image--art.png",
          "alt": "Vincent van Gogh's The Starry Night, a swirling night sky filled with bright stars and a glowing crescent moon over a village",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "kennedy-center-tarp-court-order",
    "headline": "Federal judge orders Trump administration to explain the tarp covering the Kennedy Center facade",
    "overview": "US District Judge Christopher Cooper ordered the Trump administration to explain by July 31 why a large tarp still covers the facade of Washington's Kennedy Center after the president's name was removed from the building. The tarp went up on June 13, the deadline Cooper had set for the name's removal; he had earlier blocked a renovation plan and ordered the name taken down. The dispute is part of a broader fight over control of the arts center.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/judge-demands-trump-explain-kennedy-center-tarp-1234753521/"
      },
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/06/24/nx-s1-5869578/kennedy-center-tarp"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/kennedy-center-tarp-court-order.png",
      "alt": "The facade of the John F. Kennedy Center for the Performing Arts",
      "credit": "Artforum"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The damnatio memoriae of the emperor Geta (211 AD)",
        "excerpt": "Indeed, if anyone so much as wrote the name Geta or even uttered it, he was immediately put to death.",
        "source": "Cassius Dio, Roman History, Epitome of Book LXXVIII (Loeb / Earnest Cary trans.), via LacusCurtius",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/78*.html"
      },
      {
        "category": "historical",
        "title": "Pulling down the leaden statue of King George III at Bowling Green, New York, 9 July 1776",
        "excerpt": "Emanations from the Leaden George ... deep impressions in the Bodies of some of his red-Coated and Torie Subjects",
        "source": "Lt. Isaac Bangs, contemporary journal, quoted in Smithsonian Magazine",
        "href": "https://www.smithsonianmag.com/history/a-toppled-statue-of-george-iii-epitomizes-the-ongoing-debate-over-americas-monuments-180979463/"
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
        "excerpt": "And on the pedestal these words appear:\n\"My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!\"\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Wikisource (The Hundred Best Poems in the English Language)",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "literary",
        "title": "Nathaniel Hawthorne, \"The Minister's Black Veil\" (1836)",
        "excerpt": "I look around me, and, lo! on every visage a Black Veil!",
        "source": "Nathaniel Hawthorne, Twice-Told Tales, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/508/508-h/508-h.htm"
      },
      {
        "category": "artistic",
        "title": "Maurice Ravel, \"Pavane pour une infante défunte\" (1899) (musical)",
        "excerpt": "A slow, hushed processional dance composed in 1899, its title — a \"pavane for a dead princess\" — evokes the courtly funeral rites of a vanished Spanish past. Its tender, archaic melody drifts like a memory half-effaced, mourning not a real person but a lost age and the fading of remembrance itself. The score, in the public domain, suits a meditation on monuments shrouded and names removed.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Pavane_pour_une_infante_d%C3%A9funte,_M.19_(Ravel,_Maurice)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, \"Imaginary View of the Grande Galerie in the Louvre in Ruins\" (1796) (visual artwork)",
        "excerpt": "Hubert Robert, nicknamed \"Robert des Ruines,\" imagines the very gallery in which his picture hung reduced to a roofless, crumbling shell, its grand vaulted arches open to the sky. Tiny figures sketch and scavenge among the broken statuary, a vision of how even the proudest monument is destined for decay. Painted in 1796, it turns a living institution into a future ruin — a meditation on impermanence, erasure, and the fragility of public memory.",
        "source": "Hubert Robert, Musée du Louvre (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_Imaginary_View_of_the_Grande_Galerie_in_the_Louvre_in_Ruins_-_WGA19589.jpg",
        "image": {
          "src": "/covers/kennedy-center-tarp-court-order--art.png",
          "alt": "Oil painting of the Louvre's Grande Galerie depicted as a roofless ruin, with broken columns and statuary and small figures amid the rubble",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "saype-beyond-walls-minneapolis",
    "headline": "Artist Saype paints a monumental biodegradable grass mural of clasping hands in Minneapolis",
    "overview": "Franco-Swiss land artist Saype created a vast mural of two clasping hands on the grass of Minneapolis's Boom Island Park, using a biodegradable paint designed to fade over time. The work, the first US edition of his global 'Beyond Walls' series, was made in response to recent community trauma, with hundreds of residents forming a human chain to symbolize solidarity and resilience. Saype said he found 'an incredible humanity in Minneapolis.'",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/06/saype-beyond-walls-minneapolis-temporary-mural/"
      },
      {
        "name": "MPR News",
        "href": "https://www.mprnews.org/story/2026/06/05/massive-mural-by-franco-swiss-artist-saype-debuts-at-boom-island-park-in-minneapolis"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/saype-beyond-walls-minneapolis.png",
      "alt": "Saype's giant grass mural of two clasping hands seen from above",
      "credit": "Saype"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marcus Aurelius on the impermanence of all things",
        "excerpt": "Consider how quickly all things are dissolved and resolved: the bodies and substances themselves, into the matter and substance of the world: and their memories into the general age and time of the world.",
        "source": "Marcus Aurelius, Meditations, Book III (trans. Méric Casaubon), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2680/2680-h/2680-h.htm"
      },
      {
        "category": "historical",
        "title": "The Roman dextrarum iunctio: the clasped right hands of fellowship",
        "excerpt": "This early-3rd-century A.D. Roman marble sarcophagus fragment from the Metropolitan Museum of Art depicts a marriage scene in which husband and wife perform the dextrarum iunctio, the ceremonial joining of right hands. The ancient gesture of clasped hands signified concord, fidelity, and the bond between people, the same symbolism Saype invokes with his mural of two arms reaching across to clasp one another.",
        "source": "Marble sarcophagus fragment with marriage scene, Roman, ca. 3rd century A.D., The Metropolitan Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Marble_sarcophagus_fragment-_marriage_scene_MET_DP276799.jpg"
      },
      {
        "category": "literary",
        "title": "John Donne, \"No man is an island\" (Meditation XVII)",
        "excerpt": "No man is an island, entire of itself; every man is a piece of the continent, a part of the main. If a clod be washed away by the sea, Europe is the less, as well as if a promontory were, as well as if a manor of thy friend's or of thine own were: any man's death diminishes me, because I am involved in mankind, and therefore never send to know for whom the bell tolls; it tolls for thee.",
        "source": "John Donne, Devotions upon Emergent Occasions, Meditation XVII (1624), Wikisource",
        "href": "https://en.wikisource.org/wiki/Meditation_XVII"
      },
      {
        "category": "literary",
        "title": "Robert Herrick, \"To the Virgins, to Make Much of Time\"",
        "excerpt": "Gather ye Rose-buds while ye may,\n    Old Time is still a-flying:\nAnd this same flower that smiles to day,\n    To morrow will be dying.",
        "source": "Robert Herrick, Hesperides (1648), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/To_the_Virgins,_to_Make_Much_of_Time"
      },
      {
        "category": "artistic",
        "title": "Friedrich Schiller, \"Ode to Joy\" / Beethoven's Symphony No. 9 (musical)",
        "excerpt": "Beethoven set Schiller's \"An die Freude\" in the choral finale of his Ninth Symphony, Op. 125, completed in 1824, where massed voices proclaim that \"All men become brothers.\" The exultant tune, rising through soloists, chorus, and orchestra, has become a universal anthem of joy, fellowship, and human solidarity. Its score is freely available in the public domain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Roman marble relief of the dextrarum iunctio, marriage scene (visual artwork)",
        "excerpt": "This Roman marble sarcophagus fragment, dated to about the early 3rd century A.D. and held at the Metropolitan Museum of Art, shows a bride and groom joining their right hands in the dextrarum iunctio while a small winged Eros looks on. The carved gesture of two clasped hands made fellowship, trust, and union visible in stone. It is an ancient counterpart to Saype's grass mural of two arms reaching to grasp each other.",
        "source": "Marble sarcophagus fragment with marriage scene, Roman, ca. 3rd century A.D., The Metropolitan Museum of Art (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Marble_sarcophagus_fragment-_marriage_scene_MET_DP276799.jpg",
        "image": {
          "src": "/covers/saype-beyond-walls-minneapolis--art.png",
          "alt": "Roman marble relief fragment showing a married couple clasping right hands in the dextrarum iunctio, with a small winged Eros between them",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "gaudi-centenary-influence",
    "headline": "Architecture world marks the centenary of Antoni Gaudí's death and weighs his global influence",
    "overview": "A century after the Catalan architect Antoni Gaudí died in Barcelona on 10 June 1926, days after being struck by a tram, the design world is reassessing his enduring influence. His organic, nature-inspired Modernisme — above all the still-unfinished Sagrada Família basilica, now nearing completion — reshaped ideas of structure, ornament and form. Critics and architects are debating whether he ranks among the greatest builders in history.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/27/gaudi-centenary-impact-dezeen-in-depth/"
      },
      {
        "name": "Dezeen (Weekly)",
        "href": "https://www.dezeen.com/2026/06/26/gaudi-dezeen-weekly-podcast/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-28",
    "image": {
      "src": "/covers/gaudi-centenary-influence.png",
      "alt": "Antoni Gaudí's Sagrada Família basilica in Barcelona",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 28 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Brunelleschi's dome of Florence Cathedral, in Vasari's Lives",
        "excerpt": "And it can be said with confidence that the ancients never went so high with their buildings, and never exposed themselves to so great a risk as to try to challenge the heavens, even as this structure truly appears to challenge them, seeing that it rises to such a height that the mountains round Florence appear no higher. And it seems, in truth, that the heavens are envious of it, since the lightning keeps on striking it every day.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors & Architects, Vol. II, Life of Filippo Brunelleschi (trans. de Vere)",
        "href": "https://www.gutenberg.org/files/25759/25759-h/25759-h.htm"
      },
      {
        "category": "historical",
        "title": "The building of Solomon's Temple (1 Kings 6:7)",
        "excerpt": "And the house, when it was in building, was built of stone made ready before it was brought thither: so that there was neither hammer nor ax nor any tool of iron heard in the house, while it was in building.",
        "source": "The Holy Bible, King James Version, 1 Kings 6:7",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "literary",
        "title": "Victor Hugo, Notre-Dame de Paris — \"This Will Kill That\"",
        "excerpt": "In fact, from the origin of things down to the fifteenth century of the Christian era, inclusive, architecture is the great book of humanity, the principal expression of man in his different stages of development, either as a force or as an intelligence.",
        "source": "Victor Hugo, Notre-Dame de Paris (trans. Isabel F. Hapgood), Book Fifth, Ch. II",
        "href": "https://www.gutenberg.org/files/2610/2610-h/2610-h.htm"
      },
      {
        "category": "literary",
        "title": "John Ruskin, \"The Nature of Gothic,\" The Stones of Venice",
        "excerpt": "No human face is exactly the same in its lines on each side, no leaf perfect in its lobes, no branch in its symmetry. All admit irregularity as they imply change; and to banish imperfection is to destroy expression, to check exertion, to paralyse vitality. All things are literally better, lovelier, and more beloved for the imperfections which have been divinely appointed, that the law of human life may be Effort, and the law of human judgment, Mercy.",
        "source": "John Ruskin, The Stones of Venice, Vol. II, Ch. VI, \"The Nature of Gothic\"",
        "href": "https://www.gutenberg.org/files/30755/30755-h/30755-h.htm"
      },
      {
        "category": "artistic",
        "title": "J. S. Bach, Toccata and Fugue in D minor, BWV 565 (musical)",
        "excerpt": "Bach's most famous organ work opens with a thunderous descending flourish before unfurling into a vast contrapuntal fugue, the very sound of cathedral grandeur conjured from pipes and stone vaults. Its towering arches of sound and dramatic registration evoke the soaring interior of a great church, an apt sonic parallel to Gaudí's stone forests rising toward heaven. The Bach-Gesellschaft edition score is in the public domain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Toccata_and_Fugue_in_D_minor,_BWV_565_(Bach,_Johann_Sebastian)"
      },
      {
        "category": "artistic",
        "title": "Claude Monet, Rouen Cathedral, Facade (Morning Effect) (visual artwork)",
        "excerpt": "Painted between 1892 and 1894, this canvas dissolves the great Gothic facade of Rouen Cathedral into shimmering veils of dawn light, its carved stone seemingly melting into atmosphere. Monet returned again and again to the same portal at different hours, treating the ancient edifice as living, changing matter rather than fixed masonry. The series anticipates Gaudí's own conviction that architecture should breathe with the rhythms and forms of nature.",
        "source": "Claude Monet, Museum Folkwang, Essen (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Rouen_Cathedral,_Facade_(Morning_effect).JPG",
        "image": {
          "src": "/covers/gaudi-centenary-influence--art.png",
          "alt": "Impressionist painting of the light-dappled Gothic facade of Rouen Cathedral at morning by Claude Monet",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "venezuela-earthquakes-kill-920",
    "headline": "Venezuela earthquakes kill at least 920 as international rescue teams arrive in Caracas",
    "overview": "Two powerful earthquakes that struck Venezuela have killed at least 920 people, the country's worst seismic disaster in modern memory, with the death toll still climbing as rescuers dig through collapsed buildings in Caracas and surrounding states. International rescue teams, including some 1,600 foreign personnel, have arrived to join the search for survivors. Many residents, frustrated by the pace of the official response, have taken the search for missing relatives into their own hands.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c39y79g7gzko"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPc0sxNlk4eExrc1BtZ0M1ZW1ocUJlSUxWdXdhTmhQdjNqRVFJYmdkdlJBUGttZHd5VzJNcGR2UkFHQVh1REs2N2tnWHowMVlqVzlBd3gydlNMRzFqSlQ2U1I2LU01WVVlM2ltRUpZNnNYc0lZSVl2aHVwd2Y4bDdVTWpRbkZZUktQclAtUHM2QUhpNDVlWFZtR2ZQUFZOYzQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/venezuela-earthquakes-kill-920.png",
      "alt": "Rescue workers searching the rubble of a collapsed building after an earthquake",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Younger on the Earthquakes at Misenum (AD 79)",
        "excerpt": "It was now the first hour of the day, but the light was still faint and weak. The buildings all round us were beginning to totter, and, though we were in the open, the courtyard was so narrow that we were greatly afraid, and indeed sure of being overwhelmed by their fall. So that decided us to leave the town. We were followed by a distracted crowd, which, when in a panic, always prefers someone else's judgment to its own as the most prudent course to adopt, and when we set out these people came crowding in masses upon us, and pressed and urged us forward.",
        "source": "Attalus (J. B. Firth translation)",
        "href": "https://www.attalus.org/old/pliny6.html"
      },
      {
        "category": "historical",
        "title": "Jack London, \"The Story of an Eyewitness\" (1906 San Francisco)",
        "excerpt": "The earthquake shook down in San Francisco hundreds of thousands of dollars worth of walls and chimneys. But the conflagration that followed burned up hundreds of millions of dollars' worth of property There is no estimating within hundreds of millions the actual damage wrought. Not in history has a modern imperial city been so completely destroyed. San Francisco is gone. Nothing remains of it but memories and a fringe of dwelling-houses on its outskirts. Its industrial section is wiped out. Its business section is wiped out. Its social and residential section is wiped out.",
        "source": "California State Parks",
        "href": "https://www.parks.ca.gov/?page_id=24206"
      },
      {
        "category": "literary",
        "title": "Voltaire, Candide, Chapter V (The Lisbon Earthquake)",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/19942/pg19942.txt"
      },
      {
        "category": "literary",
        "title": "Heinrich von Kleist, Das Erdbeben in Chili (1807)",
        "excerpt": "In St. Jago, der Hauptstadt des Königreichs Chili, stand gerade in dem Augenblicke der großen Erderschütterung vom Jahre 1647, bei welcher viele tausend Menschen ihren Untergang fanden, ein junger, auf ein Verbrechen angeklagter Spanier, namens Jeronimo Rugera, an einem Pfeiler des Gefängnisses, in welches man ihn eingesperrt hatte, und wollte sich erhenken.",
        "source": "Project Gutenberg Canada",
        "href": "https://gutenberg.ca/ebooks/kleist-erdbebeninchili/kleist-erdbebeninchili-00-h.html"
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov, The Last Day of Pompeii (1830–1833)",
        "excerpt": "Karl Bryullov's monumental canvas freezes the instant Vesuvius buries Pompeii: under a blood-red sky split by lightning, statues topple from their pedestals and columns crash down upon crowds fleeing into the dark. Mothers shield their children, a son carries his aged father, and a fallen woman lies beside her infant amid the rubble. Painted between 1830 and 1833 and now in the State Russian Museum in Saint Petersburg, it became the most celebrated Russian image of a city destroyed in a single catastrophic night.",
        "source": "The State Russian Museum (via Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/venezuela-earthquakes-kill-920--art.png",
          "alt": "Karl Bryullov's painting The Last Day of Pompeii, crowds fleeing beneath a fiery sky as columns and statues fall",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Mozart, Requiem in D minor, K. 626",
        "excerpt": "Left unfinished at Mozart's death in 1791 and completed by his pupil Süssmayr, the Requiem is the West's great public-domain music of mass death and mourning. Its \"Dies irae\" hurls the chorus into the terror of a day of wrath, while the \"Lacrimosa\" sinks into weeping for the dead being raised from the ashes — a fitting score for a city digging its people from collapsed stone. The full scores and parts are freely available here.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 14
  },
  {
    "slug": "iran-us-tanker-hormuz-escalation",
    "headline": "Tanker struck in Strait of Hormuz as Iran and U.S. trade attacks in worst escalation since peace deal",
    "overview": "A tanker was struck in the Strait of Hormuz and Iranian drones attacked Bahrain after the United States carried out airstrikes on Iran, marking the worst escalation in the Gulf since the two sides reached a peace deal. Iran said it had struck U.S.-linked targets in response to the American attacks, which Washington said answered a drone strike on a Gulf cargo ship. The exchange has rattled global shipping through the world's most important oil chokepoint.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOamVFR0VfZVlNU01BWjNWakdNczVUSHAzNWFlM0J3MGV1b0ZmbldmdnhQUHVpLTNabjVZSG5tSDJ0RDlQREk0emJnT3ZGbjFEZjVpTEt2UDgxOXpMdWV3dTIzX1ZtQVNpeUdDRVplMkUxd0FVNzNPTEFwZ3BVSUo4SG1BcHFDeEdYS2tIM3RUaWpZNEtyeWlub0h5c29pNjJmdDZ6Y2tha2hKWkNGa3Y0Y2JNYnk4ZWJuUlk4?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxOU21jd0pJa095S19rRUp3Q1NSN3dJZkxJVzYwNGFNbWtMa2ZqZ1lxWkx1T2xjbGI4UkhJd0sxXzJNcjVNNmllcmZ5SDlnZUlTMU1sV1NSRGlSbVRHMHFvX2pOWW5zT0JNNF8tdnEtSnYwQ1dQV3d0M0g4U0RBZEdZWlcwMFVFMGVER1N6NlRUOVVacVp4X18yS2FoczFWd1piYzdDeDlhSkc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/iran-us-tanker-hormuz-escalation.png",
      "alt": "An oil tanker silhouetted at dusk in a narrow strait",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Oil Platforms (Islamic Republic of Iran v. United States of America)",
        "excerpt": "The last time U.S. and Iranian forces traded blows across the Persian Gulf, it ended at the World Court. During the 'Tanker War' of the 1980s, mines, missiles and gunboats turned the Strait of Hormuz into a shooting gallery for oil shipping, and in October 1987 and April 1988 American warships destroyed Iranian offshore oil platforms in retaliation for attacks on U.S.-flagged vessels. In 2003 the International Court of Justice ruled fourteen votes to two that those strikes 'cannot be justified as measures necessary to protect the essential security interests of the United States,' a verdict that still frames every cycle of tit-for-tat escalation in these narrow waters.",
        "source": "International Court of Justice, Judgment of 6 November 2003",
        "href": "https://www.icj-cij.org/node/101613"
      },
      {
        "category": "historical",
        "title": "The History of Herodotus, Book VIII (Themistocles argues to fight in the narrows)",
        "excerpt": "If however thou shalt do as I say, thou wilt find therein all the advantages which I shall tell thee of:—in the first place by engaging in a narrow place with few ships against many, if the fighting has that issue which it is reasonable to expect, we shall have very much the better; for to fight a sea-fight in a narrow space is for our advantage, but to fight in a wide open space is for theirs.",
        "source": "Herodotus, trans. G. C. Macaulay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "literary",
        "title": "The Persians (the Messenger reports the Persian fleet destroyed at Salamis)",
        "excerpt": "Ship into ship drave hard its brazen beak\nWith speed of thought, a shattering blow! and first\nOne Grecian bark plunged straight, and sheared away\nBowsprit and stem of a Phoenician ship.\nAnd then each galley on some other’s prow\nCame crashing in. Awhile our stream of ships\nHeld onward, till within the narrowing creek\nOur jostling vessels were together driven,\nAnd none could aid another: each on each\nDrave hard their brazen beaks, or brake away\nThe oar-banks of each other, stem to stern,\nWhile the Greek galleys, with no lack of skill,\nHemmed them and battered in their sides, and soon\nThe hulls rolled over, and the sea was hid,\nCrowded with wrecks and butchery of men.",
        "source": "Aeschylus, trans. E. D. A. Morshead (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/8714/8714-h/8714-h.htm"
      },
      {
        "category": "literary",
        "title": "The Odyssey, Book XII (the ship runs the strait of Scylla and Charybdis)",
        "excerpt": "We entered the Straits in great fear of mind, for on the one hand was Scylla, and on the other dread Charybdis kept sucking up the salt water. As she vomited it up, it was like the water in a cauldron when it is boiling over upon a great fire, and the spray reached the top of the rocks on either side. When she began to suck again, we could see the water all inside whirling round and round, and it made a deafening sound as it broke against the rocks. We could see the bottom of the whirlpool all black with sand and mud, and the men were at their wits ends for fear.",
        "source": "Homer, trans. Samuel Butler (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "artistic",
        "title": "Die Seeschlacht bei Salamis (The Naval Battle of Salamis)",
        "excerpt": "Kaulbach's vast 1868 canvas freezes the moment a chokepoint becomes a slaughterhouse: in the narrow strait between Salamis and the mainland, Greek and Persian galleys are jammed prow to prow, oars splintering, men spilling into a sea churned white with wreckage. The painting renders in paint exactly what Aeschylus and Herodotus describe in words—how superior numbers count for nothing once a fleet is funneled into water too tight to maneuver. It stands as a permanent emblem of how decisive, and how ruinous, a battle in a strait can be.",
        "source": "Wilhelm von Kaulbach, 1868 (Maximilianeum, Munich)",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/iran-us-tanker-hormuz-escalation--art.png",
          "alt": "Wilhelm von Kaulbach's 1868 painting of the Battle of Salamis, with Greek and Persian galleys colliding in the crowded strait amid wreckage and drowning men",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Fighting Temeraire, tugged to her last berth to be broken up",
        "excerpt": "Turner's elegiac seascape shows a ghostly warship—veteran of Trafalgar—towed across glassy water beneath a burning sunset toward the breaker's yard. It is a meditation on the passing of an age of sail and sea power, the fragile glory of fleets that command straits and then fade. Against the Hormuz crisis it reads as a warning about the impermanence of any maritime order: the ships that rule the world's narrows today drift, like the Temeraire, toward their own twilight.",
        "source": "J. M. W. Turner, 1839 (The National Gallery, London)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg"
      }
    ],
    "rank": 15
  },
  {
    "slug": "hezbollah-rejects-israel-lebanon-deal",
    "headline": "Hezbollah rejects U.S.-brokered Israel-Lebanon security deal as a 'surrender'",
    "overview": "Hezbollah has rejected the U.S.-brokered security agreement signed by Israel and Lebanon, denouncing the framework as a 'surrender' and casting doubt on whether the deal can hold. The Iran-backed group's opposition sets up a confrontation with the Lebanese state, which agreed to the framework in Washington after months of American mediation. Analysts warn the rejection could unravel one of the region's most fragile recent settlements.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxNMUlLNE8zdUhsWi1UT2xqU2F4aFdsNlpQUzlUdUlMQ19wNXFJaEpibm9ZVXlsS09xd3llRXYtd09uX2NKNzBIX0lHNlRVS2owX3pFcjlXcUU5YXNJeDRkbWNacXBaa0tSdjlCaW5BV0RJbDhXQU13ZWtWM0lHd3Y4bE43V3E3eEhlenlVc204MHZwOE5aOGFscmdvTUFMV2FpTUtPWjlZS2VEMEJfVTJWS1cycXA1RVFWMWszUg?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxNYWtiMUI4NktLVWg4WjVHQTd5emRGX0hkMXVOaW5FWjlSN3Q2WGZJcmVSa1A0WEFUZ21MUDlpRXBHMzBGSm9hN1NPalJpMEdPWmE5X1hDY2U1WXN1cFp6N0dXRHMyNGJpdEc5YzdSb1c5aWkxU2FUVGpaMllDdDJmSk9rVFhETUZHaDh5UVJaSTNGTW9sY3dxVHdJa0NJVXhlV1pzWjR0X3ZOclNBeV8zSUxB0gG3AUFVX3lxTE9LRU9jNV9teVhSVG1YVWVJYzlCVVpybXZUS3R6YnR6SFlVMTdGM19mZkhIeHVkOEVjaWhibGFCTUw4YXN3dkJLcElzZF9uVE9pT3llaC00ZVFIUUs1cHR1WmFZNC1CN21sWGNfdkpVUHV4Y2hoRkxWSzRFWk5VYTlIMWJiaHl3RDB3dXZ5T2JKX2FYelJsZTVTNllQN2pIN25YZFdaa1prbjN2TGRPM2g1d2FTSXFRTQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/hezbollah-rejects-israel-lebanon-deal.png",
      "alt": "Flags of Israel and Lebanon at a diplomatic signing table",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Anglo-Irish Treaty (1921) and the cry of 'surrender'",
        "excerpt": "Ireland shall have the same constitutional status in the Community of Nations known as the British Empire as the Dominion of Canada, the Commonwealth of Australia, the Dominion of New Zealand, and the Union of South Africa with a Parliament having powers to make laws for the peace, order and good government of Ireland and an Executive responsible to that Parliament, and shall be styled and known as the Irish Free State.",
        "source": "Articles of Agreement for a Treaty between Great Britain and Ireland, 6 December 1921 (Documents on Irish Foreign Policy / National Archives of Ireland)",
        "href": "https://www.difp.ie/volume-1/1921/final-text-of-the-articles-of-agreement-for-a-treaty-between-great-britain-and-ireland-as-signed/214/"
      },
      {
        "category": "historical",
        "title": "Henry Cabot Lodge and the Senate's rejection of the League of Nations (1919)",
        "excerpt": "We abandon entirely by the proposed constitution the policy laid down by Washington in his Farewell Address and the Monroe doctrine. It is worse than idle, it is not honest, to evade or deny this fact, and every fairminded supporter of this draft plan for a league admits it. ... Standing always firmly by these great policies, we have thriven and prospered and have done more to preserve the world's peace than any nation, league, or alliance which ever existed.",
        "source": "Henry Cabot Lodge, Speech in the U.S. Senate opposing the League of Nations, 12 August 1919 (MIT primary-source text)",
        "href": "https://web.mit.edu/21h.102/www/Lodge,%20Opposition%20to%20the%20League%20of%20Nations.html"
      },
      {
        "category": "literary",
        "title": "Coriolanus turns on the city: 'I banish you'",
        "excerpt": "You common cry of curs! whose breath I hate / As reek o' the rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you; / And here remain with your uncertainty! / Let every feeble rumour shake your hearts! / Your enemies, with nodding of their plumes, / Fan you into despair! Have the power still / To banish your defenders; till at length / Your ignorance, which finds not till it feels, / Making not reservation of yourselves, / Still your own foes, deliver you as most / Abated captives to some nation / That won you without blows! Despising, / For you, the city, thus I turn my back: / There is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus, Act III, Scene iii (Complete Moby Shakespeare text)",
        "href": "http://shakespeare.mit.edu/coriolanus/coriolanus.3.3.html"
      },
      {
        "category": "literary",
        "title": "Achilles refuses the embassy and Agamemnon's gifts (Iliad, Book 9)",
        "excerpt": "For hateful in my eyes, even as the gates of Hades, is that man that hideth one thing in his mind and sayeth another.",
        "source": "Homer, Iliad 9.307 ff., trans. A. T. Murray (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D9%3Acard%3D307"
      },
      {
        "category": "artistic",
        "title": "The Signing of Peace in the Hall of Mirrors, Versailles, 1919",
        "excerpt": "Orpen was the British official war artist at the 1919 peace conference and was commissioned to record the signing of the Versailles treaty. He came to despise the assembled statesmen as vain and self-serving, and in this canvas he dwarfs them beneath the vast gilded mirrors of the hall, the diplomats reduced to small figures swallowed by the grandeur around them. The painting reads less as a celebration of peace than as a quiet indictment of a settlement many believed was already doomed.",
        "source": "Sir William Orpen, oil on canvas, 1919 (Imperial War Museum, IWM ART 2856), via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:William_Orpen_-_The_Signing_of_Peace_in_the_Hall_of_Mirrors.jpg",
        "image": {
          "src": "/covers/hezbollah-rejects-israel-lebanon-deal--art.png",
          "alt": "William Orpen's 1919 painting of statesmen signing the Treaty of Versailles beneath the gilded mirrors of the Hall of Mirrors at Versailles",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Sibelius, Finlandia, Op. 26 (1900) — music of national defiance",
        "excerpt": "Composed in 1900 to rouse Finnish feeling against Russian press censorship and imperial rule, Finlandia opens with menacing brass that gives way to a soaring hymn of resistance. So charged was its nationalism that censors forced it to be performed under disguised, innocuous titles. It endures as the sound of a people refusing an order imposed from outside, an unofficial anthem of defiance set to music.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1900), public-domain scores (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      }
    ],
    "rank": 16
  },
  {
    "slug": "europe-heatwave-breaks-german-record",
    "headline": "Europe's deadly heatwave breaks Germany's temperature record and halts public events",
    "overview": "A severe heatwave gripping Europe has broken Germany's national temperature record and forced the cancellation of public events as the hot air mass moves east into Denmark, Switzerland and the Czech Republic. Authorities have reported deaths linked to the extreme heat and issued health warnings across the continent. The episode is the latest in a string of intensifying European summers that scientists link to climate change.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2knzzwprgo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxPNW4yWVJLNlBEUHVERnVYU0hDWHc0bE5Ua0psdk04TkRMTk9JZjZiRlRkWGhlR2ljZTV6Tmx2eXFiM09ZdjFZTkswTkczeG1iZGJzVDk5ZWRSckZrV2o3cGFxSjV1ZDNnZk45Rkw1ZXhZdm1uOXJVZTg2Z2l4Y1g0M1hsU1F5VWxqUnRSdjdOX3ZidV8yNnYwU05yRlV0VnVyNHVaZnQ1V19IQ2xpMjBjWEpRLTlwVE5MT0k0?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/europe-heatwave-breaks-german-record.png",
      "alt": "People sheltering from the sun in a sweltering European city square",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The August 2003 European heat wave in France",
        "excerpt": "From August 1st to 5th, 2003, the average maximum temperatures recorded in France increased from a value close to the normal value (25°C) to 37°C, then remained between 36 and 37°C until August 13th. From August 1st to 20th, 2003, 15000 excess deaths were observed. The present heat wave was the most disastrous one ever recorded, since the next most dramatic one, in 1976, was responsible for only 6000 excess deaths.",
        "source": "Fouillet et al., \"Excess mortality related to the August 2003 heat wave in France,\" International Archives of Occupational and Environmental Health (PubMed Central PMC1950160)",
        "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC1950160/"
      },
      {
        "category": "historical",
        "title": "Black Sunday and the Dust Bowl, April 14, 1935",
        "excerpt": "The wall of blowing sand and dust first blasted into the eastern Oklahoma panhandle and far northwestern Oklahoma around 4 PM. It raced to the south and southeast across the main body of Oklahoma that evening, accompanied by heavy blowing dust, winds of 40 MPH or more, and rapidly falling temperatures. As eyewitness Pauline Winkler Grey recalled: \"As the wall of dust and sand struck our house the sun was instantly blotted out completely...We stood in our living room in pitch blackness. We were stunned.\"",
        "source": "NOAA / National Weather Service, Norman OK — \"The Black Sunday Dust Storm of April 14, 1935\" (with contemporary eyewitness accounts)",
        "href": "https://www.weather.gov/oun/events-19350414"
      },
      {
        "category": "literary",
        "title": "Phaethon and the Burning Earth — Ovid, Metamorphoses, Book II",
        "excerpt": "The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction—Oh what small complaints! Great cities perish with their walls, and peopled nations are consumed to dust. The highest altitudes are caught in flames, and as their moistures dry they crack in chasms.",
        "source": "Ovid, Metamorphoses, Book 2 (Brookes More translation), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=227"
      },
      {
        "category": "literary",
        "title": "The Rain of Fire on the Burning Sands — Dante, Inferno, Canto XIV",
        "excerpt": "It was an area wide / Of arid sand and thick, resembling most / The soil that erst by Cato's foot was trod. / Vengeance of Heav'n! Oh! how shouldst thou be fear'd / By all, who read what here my eyes beheld! ... O'er all the sand fell slowly wafting down / Dilated flakes of fire, as flakes of snow / On Alpine summit, when the wind is hush'd.",
        "source": "Dante Alighieri, The Vision of Hell (Inferno), trans. Henry Francis Cary, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/8800/pg8800.txt"
      },
      {
        "category": "artistic",
        "title": "Languor in the Scorching Heat — Vivaldi, \"L'estate\" (Summer), The Four Seasons",
        "excerpt": "Vivaldi's \"Summer\" concerto (1723), the second of The Four Seasons, opens with the marking Allegro non molto and the instruction Languidezza per il caldo — \"languor caused by the heat.\" The strings droop and pant in the oppressive air before the music erupts into the Tempo impetuoso d'estate, the violent summer storm. The score, public domain, sets a sonnet of fields parched under a merciless sun until thunder breaks the swelter.",
        "source": "Antonio Vivaldi, Violin Concerto in G minor, RV 315 (\"L'estate\"), Op. 8 No. 2, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Violin_Concerto_in_G_minor,_RV_315_(Vivaldi,_Antonio)"
      },
      {
        "category": "artistic",
        "title": "The Sower beneath a Blazing Sun — Vincent van Gogh (1888)",
        "excerpt": "Painted in Arles in June 1888, van Gogh's \"The Sower\" sets a laboring figure against an enormous, low-hanging sun that fills the sky with searing yellow. The disc of the sun blazes like a halo over a parched field, its heat radiating in concentric strokes. Van Gogh, obsessed with the southern light, turned the Provencal summer sun into a near-sacred force of fire that dominates the burning landscape.",
        "source": "Vincent van Gogh, \"The Sower\" (1888), Van Gogh Museum / Wikimedia Commons (Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh_-_The_sower_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/europe-heatwave-breaks-german-record--art.png",
          "alt": "Van Gogh's painting The Sower (1888), a sower in a field beneath a huge blazing yellow sun",
          "credit": "Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "australia-toughens-child-social-media-ban",
    "headline": "Australia toughens its under-16 social media ban and doubles potential penalties for tech firms",
    "overview": "Australia has strengthened its world-first ban on social media for children under 16, doubling the maximum penalties that technology companies can face for failing to keep minors off their platforms. The expanded rules increase enforcement powers and broaden the services covered by the law. Tech firms have warned the regime is difficult to implement, while the government says it is protecting children from online harms.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxPdjNWWE45OGxaRVY3b2FvV0x4RDRfT3d5aTZBRFM0UFhQREVLaGpEQjhFelA0UHBPUFhqWTlYcEwtTWI0dWdNanVJdDRjTlpmNndMLTZMQV9XeGRnQm1OakVkaDJMOE5ZYnEwb3Q3bWhxVDAwYUlRQlp3R3FjekV4Yk1wR2psQTZLNERqMEppOEJQU0RfZ2hnb0VzaE9sWktHc25oOWtuS1o4amFwQkt5bmJpakcwT1I3OEoxMDRqdHJFSW1NM1I4SFV6Um82aWh2YXQySw?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOWUEtdENFQ2FYTXU4SjA1b1BoVmR2dmtRQzNQUHBqemtYWncyMnJkQkNsS1dfWE85TFFpZEJ6SnRaWklaWkIxZEtoZmhTRXhHWFFZcXdaOHF4anRjRlNHQW53Z0J5MW5SOWM2QVItMkpnNTBGekxQQkZQRkhyVFg4RGFSNnQ3VzVReDlpSF9xWWV6NTY1Ykk0eDhTeUhocm5mQngwSFdPNVYtRWdsRUxXcUQtUWphajFKM2NvQg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/australia-toughens-child-social-media-ban.png",
      "alt": "A teenager's hands holding a smartphone in shadow",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plato establishes a censorship of children's tales in the Republic",
        "excerpt": "And shall we just carelessly allow children to hear any casual tales which may be devised by casual persons, and to receive into their minds ideas for the most part the very opposite of those which we should wish them to have when they are grown up? We cannot. Then the first thing will be to establish a censorship of the writers of fiction, and let the censors receive any tale of fiction which is good, and reject the bad.",
        "source": "Plato, The Republic, Book II (trans. Benjamin Jowett)",
        "href": "https://www.gutenberg.org/cache/epub/1497/pg1497.txt"
      },
      {
        "category": "historical",
        "title": "The 1954 comic-book panic: Wertham's Seduction of the Innocent",
        "excerpt": "Slowly, and at first reluctantly, I have come to the conclusion that this chronic stimulation, temptation and seduction by comic books, both their content and their alluring advertisements of knives and guns, are contributing factors to many children's maladjustment. It is our clinical judgment, in all kinds of behavior disorders and personality difficulties of children, that comic books do play a part.",
        "source": "Fredric Wertham, Seduction of the Innocent (1954), Chapter I",
        "href": "https://archive.org/stream/fredricwerthamseductionoftheinnocent19542ndprinting/Fredric%20Wertham%20Seduction%20of%20the%20Innocent%201954%202nd%20Printing_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Socrates indicted for corrupting the youth",
        "excerpt": "It says that Socrates is a doer of evil, who corrupts the youth; and who does not believe in the gods of the state, but has other new divinities of his own. Such is the charge; and now let us examine the particular counts. He says that I am a doer of evil, and corrupt the youth.",
        "source": "Plato, Apology (trans. Benjamin Jowett)",
        "href": "https://www.gutenberg.org/cache/epub/1656/pg1656.txt"
      },
      {
        "category": "literary",
        "title": "Frankenstein and the creation that escapes its maker",
        "excerpt": "I had desired it with an ardour that far exceeded moderation; but now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart. Unable to endure the aspect of the being I had created, I rushed out of the room and continued a long time traversing my bed-chamber, unable to compose my mind to sleep.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Chapter V",
        "href": "https://www.gutenberg.org/cache/epub/84/pg84.txt"
      },
      {
        "category": "artistic",
        "title": "Goya: The Sleep of Reason Produces Monsters",
        "excerpt": "Goya's etching shows a slumped, dreaming author swarmed by owls and bats as reason sleeps. Its inscription warns that fantasy abandoned by reason produces impossible monsters. The image became the era's emblem for what happens when a society stops guarding the minds it is meant to enlighten.",
        "source": "Francisco de Goya, El sueño de la razón produce monstruos (Los Caprichos, plate 43), 1799",
        "href": "https://commons.wikimedia.org/wiki/File:Francisco_Jos%C3%A9_de_Goya_y_Lucientes_-_The_sleep_of_reason_produces_monsters_(No._43),_from_Los_Caprichos_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/australia-toughens-child-social-media-ban--art.png",
          "alt": "Goya etching of a man asleep at his desk as owls and bats swarm around him; inscription reads 'El sueño de la razon produce monstruos'",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Dukas's The Sorcerer's Apprentice: forces unleashed beyond control",
        "excerpt": "Dukas's 1897 scherzo, written after Goethe's ballad Der Zauberlehrling, sets the tale of an apprentice who borrows his master's magic to animate a broom and then cannot stop it. The music swells into a relentless, flooding deluge as the enchantment multiplies out of control. It is the perfect score for a technology summoned for convenience that no one knows how to switch off.",
        "source": "Paul Dukas, L'apprenti sorcier (symphonic scherzo after Goethe), 1897",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 18
  },
  {
    "slug": "ntsb-ends-tesla-power-steering-probe",
    "headline": "U.S. safety regulator ends its power-steering investigation into 376,000 Tesla vehicles",
    "overview": "The U.S. National Highway Traffic Safety Administration has closed its investigation into power-steering failures affecting about 376,000 Tesla electric vehicles, concluding a probe opened after reports of loss of steering control. The agency ended the inquiry without ordering a new recall. The case is among several federal safety reviews of the automaker's vehicles in recent years.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxQdFp0VUdMWjBPQ2NXdEVRemwxZkx0czFWWXlISDVkNzlqOEJITVhVQUN0am4takgxUkxYc3htWG44cHYtZjZvOEJfcmhtN3l5b25abHpFb2RvSHVzaEp1bDM5YzgySHVfQ1R2bUtQZ2JNU3VKWGRPZ2FGNTNQVWZLMXFwaXhCVmtDYVBzbXNvNmxFUEpYOUMzemU2RXQ2LTNfZVNlQ1FpZEZvelFNN0dGT3ppZzhmd0kzTS1ULXZQYy1uX1VVYTUyX1Nn?oc=5"
      },
      {
        "name": "Finimize",
        "href": "https://news.google.com/rss/articles/CBMikAFBVV95cUxQbXJ3UmRKazBWOUJ2N3FLMGV2UlZMQzJFUEpBekZ5b0ZvdE54UlpXRGxCbEFkVlJKUnpoTXpCbHJqcmZMSE4wME5CNHB4T3VvbW9hMGZiUUlvcVN0aWJSbXlLc01DcDdQQkV5OXdiSjdFUXFhMFRxelJJVFlybHZwc0U2MlhIaVM5TTZEUHNtdGE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/ntsb-ends-tesla-power-steering-probe.png",
      "alt": "A steering wheel inside a modern electric car",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ralph Nader, \"Unsafe at Any Speed\" (1965)",
        "excerpt": "A decade before the federal safety agency existed, Ralph Nader's 1965 book accused American automakers of building cars whose dangers were engineered in rather than accidental, and of treating driver error as an excuse to ignore mechanical defects. The uproar helped create the National Highway Traffic Safety Administration itself in 1970 and the legal machinery of the federal defect investigation. Tesla's closed power-steering probe is a direct descendant of that machinery: a regulator weighing whether a loss of control was the driver's fault or the design's.",
        "source": "Ralph Nader, Unsafe at Any Speed: The Designed-In Dangers of the American Automobile",
        "href": "https://www.nhtsa.gov/book/countermeasures/countermeasures-discourage-speeding"
      },
      {
        "category": "historical",
        "title": "The Tay Bridge Disaster (1879)",
        "excerpt": "Beautiful Railway Bridge of the Silv'ry Tay! / Alas! I am very sorry to say / That ninety lives have been taken away / On the last Sabbath day of 1879, / Which will be remember'd for a very long time.",
        "source": "William McGonagall, \"The Tay Bridge Disaster\" (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Tay_Bridge_Disaster"
      },
      {
        "category": "literary",
        "title": "Ovid, Metamorphoses Book II — Phaethon cannot control the chariot of the Sun",
        "excerpt": "and Phaethon filled with fear, knew not to guide with trusted reins, nor where the way might be— nor, if he knew, could he control their flight. ... the steeds perceived it, with a rush impetuous, they left the beaten track; regardless of all order and control.",
        "source": "Ovid, Metamorphoses, trans. Brookes More (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=150"
      },
      {
        "category": "literary",
        "title": "Horace, Odes I.14 — \"O ship\" (the ship of state)",
        "excerpt": "O navis, referent in mare te novi fluctus. ... nonne vides, ut nudum remigio latus et malus celeri saucius Africo ... non tibi sunt integra lintea, non di, quos iterum pressa voces malo.",
        "source": "Horace, Carmina (Odes) Book 1, Poem 14 (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0024:book=1:poem=14"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, \"The Fall of Phaeton\" (c. 1604–08)",
        "excerpt": "Rubens freezes the catastrophe at its peak: Phaethon is hurled from the sun-chariot as the panicked horses of the Sun bolt off course, the reins useless, the wheels and bodies tumbling through a sky split by lightning. The machine has overpowered its master, and the only fix left is the thunderbolt that ends the ride. Oil on canvas, National Gallery of Art, Washington (accession 1990.1.1).",
        "source": "Peter Paul Rubens, The Fall of Phaeton, National Gallery of Art (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/ntsb-ends-tesla-power-steering-probe--art.png",
          "alt": "Peter Paul Rubens, The Fall of Phaeton — Phaethon hurled from the runaway chariot of the Sun amid panicked horses and lightning",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Rossini, Guillaume Tell Overture — the galloping Finale (\"March of the Swiss Soldiers\")",
        "excerpt": "Rossini's 1829 overture closes with its famous galloping finale, the \"March of the Swiss Soldiers\": a headlong cavalry charge of trumpets and racing strings that has become the universal sound of horses at full, barely-governed speed. It is the runaway chariot rendered as music — exhilaration and the edge of losing control in the same breathless gallop. Public-domain full scores and parts are available on IMSLP.",
        "source": "Gioachino Rossini, Guillaume Tell (IMSLP / Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Guillaume_Tell_(Rossini,_Gioacchino)"
      }
    ],
    "rank": 19
  },
  {
    "slug": "leon-black-walks-out-epstein-hearing",
    "headline": "Billionaire Leon Black walks out of a congressional hearing on the Epstein investigation",
    "overview": "Billionaire investor Leon Black walked out of a hearing tied to the investigation into Jeffrey Epstein, abruptly ending his appearance before lawmakers examining Epstein's finances and associates. Black, the former Apollo Global Management chief, has previously acknowledged large payments to Epstein for advisory work but denied wrongdoing. His departure drew sharp criticism from members of the panel.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn948lwyl3jo"
      },
      {
        "name": "The New York Times",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNeV9QV0pzT0tyN2llZ01rMERKRWRGcEVNWU9XdVNCR3hGaHlUUzViRnpfMUZYdXJ6RnI4ZzZrWEVxRUdQOHg0U2tRVlFhN3RFdjg0LXBsUHktN2RXZXg0RGtZSW1ta2NlRjQybDBYLXU1ZllMSUJHd1BnS0FsWVJ6OF9hc2JqZE1ITTFv?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/leon-black-walks-out-epstein-hearing.png",
      "alt": "An empty witness chair before a congressional hearing dais",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Joseph Welch confronts McCarthy: \"Have you no sense of decency?\"",
        "excerpt": "Until this moment, Senator, I think I have never really gauged your cruelty or your recklessness. ... Have you no sense of decency, sir? At long last, have you left no sense of decency?",
        "source": "Army-McCarthy hearings, June 9, 1954 (Joseph N. Welch)",
        "href": "https://en.wikiquote.org/wiki/Joseph_N._Welch"
      },
      {
        "category": "historical",
        "title": "Émile Zola, \"J'Accuse...!\" — the Dreyfus inquiry",
        "excerpt": "I accuse Major Du Paty de Clam as the diabolic workman of the miscarriage of justice ... I accuse General Billot of having held in his hands the unquestionable evidence of Dreyfus's innocence ... I accuse the offices of the war of carrying out an abominable press campaign",
        "source": "Émile Zola, open letter to the President of the Republic, L'Aurore, 13 January 1898 (Wikisource translation)",
        "href": "https://en.wikisource.org/wiki/Translation:J%27Accuse...!"
      },
      {
        "category": "literary",
        "title": "Socrates before his accusers — Plato's Apology",
        "excerpt": "How you, O Athenians, have been affected by my accusers, I cannot tell; but I know that they almost made me forget who I was—so persuasively did they speak; and yet they have hardly uttered a word of truth.",
        "source": "Plato, Apology, trans. Benjamin Jowett (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "literary",
        "title": "Geryon, the image of fraud, and the usurers — Dante's Inferno",
        "excerpt": "“Behold the monster with the pointed tail, / Who cleaves the hills, and breaketh walls and weapons, / Behold him who infecteth all the world.” / Thus unto me my Guide began to say,",
        "source": "Dante Alighieri, Inferno, Canto XVII, trans. Henry Wadsworth Longfellow (1867), Wikisource",
        "href": "https://www.gutenberg.org/cache/epub/1001/pg1001.txt"
      },
      {
        "category": "artistic",
        "title": "A defendant before the judges — Gérôme's \"Phryne before the Areopagus\"",
        "excerpt": "Gérôme's 1861 canvas stages the ancient trial of the hetaira Phryne, hauled before the assembled judges of the Areopagus on a charge of impiety. Her advocate Hypereides flings back her robe, and the magistrates recoil in a single startled gesture — the moment a tribunal's solemn judgment collapses into spectacle. It is the powerful brought to account, and the theater of standing before one's accusers.",
        "source": "Jean-Léon Gérôme, Phryne revealed before the Areopagus (1861), Hamburger Kunsthalle (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me,_Phryne_revealed_before_the_Areopagus_(1861)_-_01.jpg",
        "image": {
          "src": "/covers/leon-black-walks-out-epstein-hearing--art.png",
          "alt": "Jean-Léon Gérôme's painting Phryne before the Areopagus, showing a defendant exposed before a row of judges who react in alarm.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The day of wrath and judgment — Verdi's \"Dies Irae\"",
        "excerpt": "Verdi's 1874 Requiem unleashes its \"Dies Irae\" — the medieval \"day of wrath\" — with hammered bass-drum strokes and a chorus crying out before the throne of judgment. The text imagines no defendant who can evade the summons: every hidden thing is brought forth, and the mighty are called at last to answer. The movement is the sound of accounting that cannot be walked out on.",
        "source": "Giuseppe Verdi, Messa da Requiem (1874), \"Dies Irae\" sequence (IMSLP, public domain)",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 20
  },
  {
    "slug": "buttigieg-false-report-children",
    "headline": "Pete Buttigieg briefly separated from his children after a false police report",
    "overview": "Former U.S. Transportation Secretary Pete Buttigieg was briefly separated from his children after police responded to a false report at his home, an apparent 'swatting' incident, authorities said. Officers arrived in force before determining the report was a hoax. The episode is the latest in a wave of false emergency calls targeting public figures in the United States.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQVGktUXdaTUpaYmFCZWJwOG4tVWwzLVR4cEtCWk1zY3ExQnItQkxmWE9jRTJuRFcta2JYYUFyNG5GU0tzZ1FnODBVbVRmVVhlMjlQM0FIS3FqRm1naDhBSElkSldIbmZkWkxDSkZXaXlXZmtrVTg4WTAxZ1djUC00UnJlbWtVUURoTFVPTnNvUTJHNTB6WmV3Y0k1QUQ3bjZN?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwydx95kjx0o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/buttigieg-false-report-children.png",
      "alt": "Police cruiser lights glowing outside a suburban home at night",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Tacitus on the revival of the treason law under Tiberius",
        "excerpt": "It was Augustus who first, under colour of this law, applied legal inquiry to libellous writings, provoked, as he had been, by the licentious freedom with which Cassius Severus had defamed men and women of distinction in his insulting satires. Tiberius, when consulted by Pompeius Macer, the praetor, as to whether prosecutions for treason should be revived, replied that the laws must be enforced. The revival of the maiestas charge opened the door to a swarm of informers, the delatores, who could summon the full machinery of the state against a man on nothing more than a whispered accusation.",
        "source": "Tacitus, Annals, Book 1.72 (trans. Church & Brodribb)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D1%3Achapter%3D72"
      },
      {
        "category": "historical",
        "title": "Émile Zola, 'J'Accuse...!' on the false conviction of Alfred Dreyfus",
        "excerpt": "I accuse the first council of war of violating the law by condemning a defendant with unrevealed evidence, and I accuse the second council of war of covering up this illegality, by order, by committing in his turn the legal crime of knowingly discharging the culprit.",
        "source": "Émile Zola, 'J'Accuse...!', open letter in L'Aurore, 13 January 1898 (English translation, Wikisource)",
        "href": "https://en.wikisource.org/wiki/Translation:J%27Accuse...!"
      },
      {
        "category": "literary",
        "title": "Aesop, 'The Shepherd's Boy and the Wolf' — the cry of 'Wolf!'",
        "excerpt": "A SHEPHERD-BOY, who watched a flock of sheep near a village, brought out the villagers three or four times by crying out, “Wolf! Wolf!” and when his neighbors came to help him, laughed at them for their pains. The Wolf, however, did truly come at last. The Shepherd-boy, now really alarmed, shouted in an agony of terror: “Pray, do come and help me; the Wolf is killing the sheep;” but no one paid any heed to his cries, nor rendered any assistance. The Wolf, having no cause of fear, at his leisure lacerated or destroyed the whole flock. ... There is no believing a liar, even when he speaks the truth.",
        "source": "Aesop's Fables (George Fyler Townsend translation), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/21/pg21.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare, 'Othello' — the false report that demands 'ocular proof'",
        "excerpt": "Villain, be sure thou prove my love a whore;\nBe sure of it. Give me the ocular proof,\nOr, by the worth of man's eternal soul,\nThou hadst been better have been born a dog\nThan answer my waked wrath!",
        "source": "William Shakespeare, Othello, Act 3, Scene 3, Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1531/pg1531.txt"
      },
      {
        "category": "artistic",
        "title": "Artemisia Gentileschi, 'Susanna and the Elders' (1610) — the false accusation made flesh",
        "excerpt": "Gentileschi paints the moment before the lie is told: two elders crowd over the bathing Susanna, who recoils and twists away, hands raised against them. When she refuses them, they will fabricate a charge of adultery and condemn her to death on their false testimony — 'these things do we testify' — until Daniel exposes their perjury. The painting turns the Apocryphal story of malicious denunciation into a study of a woman trapped by powerful men's words.",
        "source": "Artemisia Gentileschi, Susanna and the Elders (1610), oil on canvas, Schönborn Collection, Pommersfelden — Wikimedia Commons object page",
        "href": "https://commons.wikimedia.org/wiki/File:Susanna_and_the_Elders_(1610),_Artemisia_Gentileschi.jpg",
        "image": {
          "src": "/covers/buttigieg-false-report-children--art.png",
          "alt": "Artemisia Gentileschi's 1610 painting Susanna and the Elders, showing a nude Susanna recoiling from two elders leaning over her",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, 'Wellington's Victory', Op. 91 — the alarum that summons cannon and force",
        "excerpt": "Beethoven's 'Battle Symphony' opens with opposing drum-rolls, trumpet signals and answering volleys of musket and cannon fire scored directly into the orchestra — the music of an alarm raised and an armed force converging. It is the eighteenth-century sound of overwhelming response: bugles, fusillades and the rush of troops, summoned and bearing down before a single note of victory is sounded.",
        "source": "Ludwig van Beethoven, Wellingtons Sieg (Wellington's Victory, or the Battle of Vittoria), Op. 91 (1813), public-domain scores on IMSLP",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 21
  },
  {
    "slug": "cape-verde-world-cup-round-of-32",
    "headline": "Cape Verde reaches the World Cup round of 32 and will face Argentina",
    "overview": "Cape Verde, one of the smallest nations ever to qualify for the World Cup, has advanced to the round of 32 at the expanded tournament and will play Argentina next. The island nation's improbable run has been celebrated as a fairytale of the new 48-team format. Players and fans described the achievement as a defining moment for the country's football history.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxPLWxmNDBfN1h2Wm9ZaF9VMXRnQjNCaC12UGZGXzFsTzVWcXgwRDF5OHl3TWYxYk1FS3I5NktTU1d6QXI1YXRtdnl1SHlKWUpLTmhSRWVoN2JXTHVPNU9iMlQ5X291Z1piZDY5WDFrdFlvQlpvdzc1eTdyNmNGMldGMlgzaGROd0lMdlFOY3NDMFUtYUNsX0lwUXh1a3Qyejhtd05yU1BWSGFQY0RSNkNRUmxB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxPa1VpZDYwbWFVTk8wOFVwRVU1VHg1Zm9UU0JfbnhXazZtOWVNY2lTWDVXc2x4RkRZaXNTYjB6Ul9hcld4SXlHVXlYelV3bHlNV3lLUXBiRV9JYWxXUWRWX1g0R1FTXy1tbWFJcW5lQjgtTXFXNXRtQTVuUDF0bnpucnFZeEpJTnlXenRkb0tnYmt2RXhEWFktanZxcklCMVc0bGQxWnFqQllKS2lhSGFEMXJMU1RtTl82UmYxbkFENVg2RFE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/cape-verde-world-cup-round-of-32.png",
      "alt": "A football resting on the centre spot of a floodlit pitch at night",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "David and Goliath",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. ... So David prevailed over the Philistine with a sling and with a stone, and smote the Philistine, and slew him; but there was no sword in the hand of David.",
        "source": "The Bible, King James Version, 1 Samuel 17 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel"
      },
      {
        "category": "historical",
        "title": "The Battle of Marathon: the few who ran at the many",
        "excerpt": "And when they had been arranged in their places and the sacrifices proved favourable, then the Athenians were let go, and they set forth at a run to attack the Barbarians.",
        "source": "Herodotus, The History, Book VI.112, trans. G. C. Macaulay (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt"
      },
      {
        "category": "literary",
        "title": "The Hare and the Tortoise: the race is not always to the swift",
        "excerpt": "The Hare was soon far out of sight, and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare, he lay down beside the course to take a nap until the Tortoise should catch up. The Tortoise meanwhile kept going slowly but steadily, and, after a time, passed the place where the Hare was sleeping. ... The Hare now ran his swiftest, but he could not overtake the Tortoise in time. The race is not always to the swift.",
        "source": "Aesop, The Aesop for Children, illus. Milo Winter (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/19994/19994-h/19994-h.htm"
      },
      {
        "category": "literary",
        "title": "Pindar, Olympian Ode I: the glory of the unlikely victor",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic whereof to utter our voice: for hence cometh the glorious hymn and entereth into the minds of the skilled in song.",
        "source": "Pindar, The Extant Odes of Pindar, Olympian I, trans. Ernest Myers (Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/10717/pg10717.txt"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, David with the Head of Goliath",
        "excerpt": "In Caravaggio's late masterpiece the boy David, lit by a single raking beam, holds aloft the severed head of the giant he was never meant to beat. The sword bears the abbreviated motto humilitas occidit superbiam, humility kills pride. The painting freezes the instant the underdog's improbable triumph becomes undeniable fact.",
        "source": "Michelangelo Merisi da Caravaggio, David with the Head of Goliath (c. 1610), Galleria Borghese, Rome (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:David_with_the_Head_of_Goliath-Caravaggio_(1610).jpg",
        "image": {
          "src": "/covers/cape-verde-world-cup-round-of-32--art.png",
          "alt": "Caravaggio's painting David with the Head of Goliath, the young David holding the giant's severed head against a dark background",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel, \"See, the Conqu'ring Hero Comes\" from Judas Maccabaeus",
        "excerpt": "Handel wrote his triumphal chorus to greet a small people's victorious champion, and ever since it has been the music of the unlikely conqueror's homecoming. Trumpet, drum and rising voices turn a humble return into a national celebration. It is the sound of a tiny nation hailing heroes the world thought could never win.",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63 (1746), Act III chorus (IMSLP, public domain)",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      }
    ],
    "rank": 22
  },
  {
    "slug": "gehry-abu-dhabi-arts-venue",
    "headline": "Abu Dhabi unveils plans for a Frank Gehry-designed performing arts centre on Saadiyat Island",
    "overview": "Abu Dhabi has revealed plans for Dar al Funoon, a performing arts venue designed by architect Frank Gehry for its Saadiyat Island cultural district. The building joins a cluster of major museums on the island, including the Louvre Abu Dhabi and a forthcoming Guggenheim, also designed by Gehry. The sculptural design continues the architect's signature language of curving, fragmented forms.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/26/dar-al-funoon-abu-dhabi-frank-gehry/"
      },
      {
        "name": "The National",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQSWdsQlFMT25kWU0yVXlFaEhTNkloMWVoUVBCWjUtNUtPaWF0MmNlYlA4aGRnQ01pMzBkUUV3cUFUWWc3eW5FVExQaXUtTEVmS29penozOTZRZGlGTS1IRXpPRHFjWHpLNndmOFpidnc5X1p3ekxIMkd1dGhlZFo5TmFscEJTMFdKRDhFRkdndzdfUjM5c3VlWVlJQkphYm1ZVGNNUm00ZzZ3T3JITzlxcQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/gehry-abu-dhabi-arts-venue.png",
      "alt": "A sculptural performing arts building with curving fragmented forms",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The building of the Parthenon under Pericles",
        "excerpt": "For this reason are the works of Pericles all the more to be wondered at; they were created in a short time for all time. Each one of them, in its beauty, was even then and at once antique; but in the freshness of its vigor it is, even to the present day, recent and newly wrought. Such is the bloom of perpetual newness, as it were, upon these works of his, which makes them ever to look untouched by time, as though the unfaltering breath of an ageless spirit had been infused into them.",
        "source": "Plutarch, Life of Pericles 13 (Perrin trans., LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
      },
      {
        "category": "historical",
        "title": "Justinian's Hagia Sophia, a dome hung from heaven",
        "excerpt": "Yet it seems not to rest upon solid masonry, but to cover the space with its golden dome suspended from Heaven. And all these details, fitted together with incredible skill in mid-air and floating off from each other and resting only on the parts next to them, produce a single and most extraordinary harmony in the work, and yet do not permit the spectator to linger much over the study of any one of them. Indeed one might say that its interior is not illuminated from without by the sun, but that the radiance comes into being within it, such an abundance of light bathes this shrine.",
        "source": "Procopius, Buildings I.i (Dewing trans., LacusCurtius)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Buildings/1A*.html"
      },
      {
        "category": "literary",
        "title": "Coleridge's stately pleasure-dome in Xanadu",
        "excerpt": "In Xanadu did Kubla Khan / A stately pleasure-dome decree: / Where Alph, the sacred river, ran / Through caverns measureless to man / Down to a sunless sea. / So twice five miles of fertile ground / With walls and towers were girdled round: / And there were gardens bright with sinuous rills, / Where blossomed many an incense-bearing tree; / And here were forests ancient as the hills, / Enfolding sunny spots of greenery.",
        "source": "Samuel Taylor Coleridge, \"Kubla Khan\", The Complete Poetical Works of Samuel Taylor Coleridge (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/29090.txt.utf-8"
      },
      {
        "category": "literary",
        "title": "Shelley's Ozymandias: monuments and ambition in the sand",
        "excerpt": "I met a traveller from an antique land / Who said: Two vast and trunkless legs of stone / Stand in the desert...Near them, on the sand, / Half sunk, a shattered visage lies, whose frown, ... Tell that its sculptor well those passions read / Which yet survive, stamped on these lifeless things, / The hand that mocked them, and the heart that fed: / And on the pedestal these words appear: ... Look on my works, ye Mighty, and despair!’",
        "source": "Percy Bysshe Shelley, \"Ozymandias\", The Complete Poetical Works of Percy Bysshe Shelley (Project Gutenberg)",
        "href": "https://www.gutenberg.org/ebooks/4800.txt.utf-8"
      },
      {
        "category": "artistic",
        "title": "Thomas Cole, \"The Architect's Dream\" (1840)",
        "excerpt": "Cole's 1840 canvas seats a tiny architect atop an oversized column, reclining before a fantastical skyline that vaults across four thousand years of building. Egyptian pylons, Greek temples, Roman aqueducts and a Gothic cathedral rise from a luminous harbour, a dreamer's compendium of every wonder humanity has dared to raise. It is the patron's vision made paint: architecture imagined as pure spectacle, untethered from utility and answerable only to ambition.",
        "source": "Thomas Cole, The Architect's Dream, Toledo Museum of Art (via Wikimedia Commons / Google Art Project)",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Cole_-_Architect%E2%80%99s_Dream_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/gehry-abu-dhabi-arts-venue--art.png",
          "alt": "The Architect's Dream by Thomas Cole, 1840 oil painting showing a reclining architect before a fantastical assembly of Egyptian, Greek, Roman and Gothic structures",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's Music for the Royal Fireworks, a festival for a monument",
        "excerpt": "Handel scored his Royal Fireworks suite for a vast wind band of oboes, horns, trumpets and drums to crown a public spectacle staged before a purpose-built ceremonial pavilion in London's Green Park. The blazing overture and its dancing movements turn the unveiling of a monument into communal jubilation, sound rising with the architecture it celebrates. Like a new temple of the arts, it announces that a place has been made for wonder, and invites a whole city in.",
        "source": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749), IMSLP",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "arizona-sect-leader-convicted-abuse",
    "headline": "Polygamous sect leader convicted of abuse after girls were found in a trailer on an Arizona highway",
    "overview": "A polygamous sect leader has been convicted on abuse charges after authorities discovered young girls in a trailer stopped on an Arizona highway, a case that exposed the group's practices. Prosecutors said the conviction caps a long investigation into the sect's leadership. The verdict was welcomed by advocates for the children involved.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQYXM5NDllNUY2dHUwc2dCTFV5RGh2bnVLOFlISjB2bEJvQnVTRmhnV2luU2xFRV9HekRTdDRlVzh5Rm1SRG1uWU1EVnU5anFZTnpwSDdjVlFCUWNGRVY5ZjJmUXdmNjN0anZRbUhjN05URkdXYU80TkF4WmtaY2xTOUNaalJTWGdWVzB4ZFUwb09fZzZZQW9VaFA4VDdCeXFvY0lqZmRQZG9xN1duVGc?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMihwFBVV95cUxPX1U5eUdKWkZSanFxM3JhamNteVBLU2U2bUtqSDl3a09xUVhOc0liUkl2a2RwSS1PQnppYVlsYnBERkZLN29rZmJSS3VZbm9Ucm9QbTFqbXFKMEdpX3FDbDU1bmE2bEMzQ2V1TUdIajhWSk42dDNQQ0JZWHFCMldLRzhfMnRjams?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/arizona-sect-leader-convicted-abuse.png",
      "alt": "A lonely desert highway stretching toward distant hills",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "John of Leiden and the polygamous \"kingdom\" of Münster (1534-35)",
        "excerpt": "Gresbeck betrays himself on one occasion by his reference to the fact that Jan shared in the universal want: \"Most of the women, therefore, had fled the town through great hunger. The king had fifteen wives, to whom, with the exception of the queen, he gave leave of absence, telling them that each should go to her friends, and that all were to obtain food wherever they could.\"",
        "source": "Karl Kautsky, Communism in Central Europe in the Time of the Reformation (1897), quoting the eyewitness account of Heinrich Gresbeck — Internet Archive",
        "href": "https://archive.org/details/communismincentr00kautuoft"
      },
      {
        "category": "historical",
        "title": "David Koresh and the Branch Davidians at Mount Carmel (Waco, 1993)",
        "excerpt": "On February 28, 1993, the Bureau of Alcohol, Tobacco and Firearms (BATF) attempted to serve a search warrant on the Branch Davidian religious community near Waco, TX, and an arrest warrant on the community's leader, David Koresh. The fact that approximately 80 men, women and children did not flee tear gas and flames, and instead met gruesome deaths, has led a large cross section of the American public to suspect that the government somehow prevented the Davidians from escaping their residence on April 19, 1993.",
        "source": "U.S. House of Representatives, Committee on Government Reform, Report 106-1037, \"The Tragedy at Waco: New Evidence Examined\" (December 28, 2000) — GovInfo",
        "href": "https://www.govinfo.gov/content/pkg/CRPT-106hrpt1037/html/CRPT-106hrpt1037.htm"
      },
      {
        "category": "literary",
        "title": "Susanna and the wicked elders (History of Susanna, Apocrypha)",
        "excerpt": "And the two elders saw her going in every day, and walking; so that their lust was inflamed toward her. ... Behold, the garden doors are shut, that no man can see us, and we are in love with thee; therefore consent unto us, and lie with us. If thou wilt not, we will bear witness against thee, that a young man was with thee: and therefore thou didst send away thy maids from thee.",
        "source": "The History of Susanna, King James Version — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Susanna"
      },
      {
        "category": "literary",
        "title": "The false shepherds who feed on the flock (Ezekiel 34)",
        "excerpt": "Son of man, prophesy against the shepherds of Israel, prophesy, and say unto them, Thus saith the Lord GOD unto the shepherds; Woe be to the shepherds of Israel that do feed themselves! should not the shepherds feed the flocks? Ye eat the fat, and ye clothe you with the wool, ye kill them that are fed: but ye feed not the flock. ... but with force and with cruelty have ye ruled them.",
        "source": "Book of Ezekiel, chapter 34, King James Version — Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ezekiel"
      },
      {
        "category": "artistic",
        "title": "William Blake, \"The Chimney Sweeper\" (Songs of Innocence, 1789; illuminated plate, copy Z, 1826)",
        "excerpt": "When my mother died I was very young,\nAnd my father sold me while yet my tongue,\nCould scarcely cry weep weep weep weep.\nSo your chimneys I sweep & in soot I sleep.\n\nTheres little Tom Dacre who cried when his head\nThat curl'd like a lambs back, was shav'd, so I said,\nHush Tom never mind it, for when your head's bare,\nYou know that the soot cannot spoil your white hair.",
        "source": "William Blake, Songs of Innocence and of Experience, copy Z (1826), Library of Congress — Wikisource transcription of the illuminated plate",
        "href": "https://en.wikisource.org/wiki/Songs_of_Innocence_and_of_Experience_(1826)/Songs_of_Innocence/The_Chimney_Sweeper",
        "image": {
          "src": "/covers/arizona-sect-leader-convicted-abuse--art.png",
          "alt": "William Blake's illuminated plate of \"The Chimney Sweeper\" from Songs of Innocence and of Experience, copy Z (1826), depicting exploited child sweeps and an angel setting them free from coffins of black.",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel, Susanna, HWV 66 (oratorio, 1749)",
        "excerpt": "Handel's 1749 oratorio dramatizes the apocryphal History of Susanna: two respected elders, consumed by lust, ambush a virtuous wife in her garden and, when rebuffed, swear false witness to send her to death. The music turns the courtroom into a moral reckoning, with the youth Daniel cross-examining the predators until their lies collapse and judgment falls on them instead of their innocent victim. The score is a public-domain meditation on hidden abuse exposed and the deliverance of the wronged.",
        "source": "Susanna, HWV 66 (Handel) — full public-domain scores at IMSLP (Walsh 1749 print and Chrysander edition)",
        "href": "https://imslp.org/wiki/Susanna,_HWV_66_(Handel,_George_Frideric)"
      }
    ],
    "rank": 24
  },
  {
    "slug": "vespa-80th-anniversary-rome",
    "headline": "Thousands of Vespa scooters swarm Rome's historic center to mark the icon's 80th anniversary",
    "overview": "Thousands of Vespa riders converged on Rome's historic center to celebrate the 80th anniversary of the iconic Italian scooter, parading past the city's landmarks in a sea of pastel bodywork. The Vespa, first produced in 1946, became a symbol of postwar Italian design and the country's economic recovery. Enthusiasts traveled from around the world to join the commemorative ride.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNb0JNazNkT0w1YXQ2LVFuTGRHZ0Nxa2pFVDFwQ1VqZV9KUjFpdy04NlFKaUhKR3lqLXNjell2ZWRZNnFyazJ3dFhpV0hkSG9TU1hGQi1WRkk0WUFkSzRjb3hNRWhsbDV2U3o1WjZmNnpZVkpEc3lKcGJOZnJNQTF4WE5QREViWWFIRE9uZmFuQlE3aS1FSmRVbExhYnExVHdlZXNMMXB3?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxPUVV6SHlVZkpHa2NwSUpjQ3ByVGhxV05ScXQ0SkoydGRBMDdLZVE4NDZjMjliNE9EUXE3WE5mMS01OWZYM2VqdnlqSGhDb1ZTamJ5Y083Z2FDa0NvdGVfV0tqWFNkWVYtSmxta3ZwM2YzX0UxMy1lWlNzNlpmMWJwbG5JSHBzWmdrVlU2MjNCXzZhNmdEckkwdGhrd0NFNXZEVUswMzY5TTJZME4wcWF5Nm10SW9uUGtLZTQzUG1yclBBUDRDc2dPZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/vespa-80th-anniversary-rome.png",
      "alt": "A crowd of vintage Vespa scooters parading through a historic Italian square",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Roman Triumph of Aemilius Paulus",
        "excerpt": "Three days were assigned for the triumphal procession. The first barely sufficed for the exhibition of the captured statues, paintings, and colossal figures, which were carried on two hundred and fifty chariots.",
        "source": "Plutarch, Life of Aemilius Paulus 32 (trans. Bernadotte Perrin, Loeb 1918)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0003:chapter=32"
      },
      {
        "category": "historical",
        "title": "The Marshall Plan and Italy's Postwar Recovery",
        "excerpt": "The rehabilitation of the economic structure of Europe quite evidently will require a much longer time and greater effort than had been foreseen. It is logical that the United States should do whatever it is able to do to assist in the return of normal economic health in the world, without which there can be no political stability and no assured peace.",
        "source": "George C. Marshall, Harvard Commencement Address, June 5, 1947 (U.S. National Archives, Milestone Documents)",
        "href": "https://www.archives.gov/milestone-documents/marshall-plan"
      },
      {
        "category": "literary",
        "title": "Song of the Open Road",
        "excerpt": "Afoot and light-hearted I take to the open road, / Healthy, free, the world before me, / The long brown path before me leading wherever I choose.",
        "source": "Walt Whitman, Leaves of Grass (1882), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Leaves_of_Grass_(1882)/Song_of_the_Open_Road"
      },
      {
        "category": "literary",
        "title": "Phaethon Mounts the Chariot of the Sun",
        "excerpt": "The other leaps into the light chariot with his youthful body, and stands aloft, and rejoices to take in his hand the reins presented to him, and then gives thanks to his reluctant parent. In the meantime the swift Pyroeis, and Eoüs and Æthon, the horses of the sun, and Phlegon, making the fourth, fill the air with neighings, sending forth flames, and beat the barriers with their feet.",
        "source": "Ovid, Metamorphoses, Book II (trans. Henry T. Riley), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm"
      },
      {
        "category": "artistic",
        "title": "Unique Forms of Continuity in Space",
        "excerpt": "Boccioni's striding bronze figure dissolves a body into pure forward motion, its surfaces fluttering like flames in a slipstream. The Futurist sculpture distills the joy of speed and the worship of the machine that would later make a little Italian scooter a national emblem of mobility and modern life.",
        "source": "Umberto Boccioni, 1913 (cast bronze), Italian Futurism — via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:%27Unique_Forms_of_Continuity_in_Space%27,_1913_bronze_by_Umberto_Boccioni.jpg",
        "image": {
          "src": "/covers/vespa-80th-anniversary-rome--art.png",
          "alt": "Umberto Boccioni's bronze sculpture 'Unique Forms of Continuity in Space' (1913), a striding figure abstracted into flowing forms of motion",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Overture to Guillaume Tell (William Tell)",
        "excerpt": "Rossini's galloping finale, with its breathless cavalry rhythm and headlong rush of strings, has become the universal sound of joyful pursuit and the open road. Composed in 1829 and long in the public domain, its exuberant momentum mirrors a sea of scooters streaming through the Eternal City.",
        "source": "Gioachino Rossini, 1829 — full score on IMSLP (public domain)",
        "href": "https://imslp.org/wiki/Guillaume_Tell_(Rossini,_Gioacchino)"
      }
    ],
    "rank": 25
  },
  {
    "slug": "willison-red-team-ai-assistant",
    "headline": "Public challenge to hack an AI email assistant ends with no one leaking its secret after 6,000 tries",
    "overview": "Developer Fernando Irarrázaval invited the public to try to make an AI email assistant reveal a secret it held, running a challenge at hackmyclaw.com against a test instance of the OpenClaw assistant. After roughly 2,000 participants and 6,000 attempts — and about $500 in token costs — no one succeeded in extracting the secret through prompt-injection or social-engineering emails. The experiment, widely shared after a write-up by AI commentator Simon Willison, became a practical case study in the security of giving language models access to real tools.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Fernando Irarrázaval",
        "href": "https://www.fernandoi.cl/posts/hackmyclaw/"
      },
      {
        "name": "Simon Willison's Weblog",
        "href": "https://simonwillison.net/2026/Jun/26/hack-my-ai-assistant/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-27",
    "image": {
      "src": "/covers/willison-red-team-ai-assistant.png",
      "alt": "A glowing terminal screen reflected in a developer's glasses in a dark room",
      "credit": "AI-generated"
    },
    "edition": "Evening Edition · 27 June 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Laocoön's warning and the Trojan Horse (Virgil, Aeneid II)",
        "excerpt": "aut hoc inclusi ligno occultantur Achivi, aut haec in nostros fabricata est machina muros inspectura domos venturaque desuper urbi, aut aliquis latet error; equo ne credite, Teucri. Quicquid id est, timeo Danaos et dona ferentis.",
        "source": "Virgil, Aeneid, Book II (Latin text, Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0055%3Abook%3D2%3Acard%3D40"
      },
      {
        "category": "historical",
        "title": "The Sirens' deceptive song (Homer, Odyssey XII)",
        "excerpt": "Come hither, as thou farest, renowned Odysseus, great glory of the Achaeans; stay thy ship that thou mayest listen to the voice of us two. For never yet has any man rowed past this isle in his black ship until he has heard the sweet voice from our lips. Nay, he has joy of it, and goes his way a wiser man.",
        "source": "Homer, Odyssey, Book XII, trans. A. T. Murray (Perseus Digital Library)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D12%3Acard%3D153"
      },
      {
        "category": "literary",
        "title": "\"Trust not their presents, nor admit the horse\" (Dryden's Aeneid)",
        "excerpt": "This hollow fabric either must inclose, / Within its blind recess, our secret foes; / Or 'tis an engine rais'd above the town, / T' o'erlook the walls, and then to batter down. / Somewhat is sure design'd, by fraud or force: / Trust not their presents, nor admit the horse.",
        "source": "Virgil, Aeneid, Book II, trans. John Dryden (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "The servant that obeys too literally (Goethe, \"The Sorcerer's Apprentice\")",
        "excerpt": "And now come, thou well-worn broom, / And thy wretched form bestir; / Thou hast ever served as groom, / So fulfil my pleasure, sir! / On two legs now stand, / With a head on top; / Waterpail in hand, / Haste, and do not stop!",
        "source": "Goethe, \"The Pupil in Magic\" (Der Zauberlehrling), trans. Edgar Alfred Bowring (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
      },
      {
        "category": "artistic",
        "title": "The city wheels its own ruin through the gate",
        "excerpt": "Tiepolo paints the moment of fatal welcome: crowds of Trojans haul the towering wooden horse through their own gates in festive procession, mistaking the engine of their destruction for a trophy. The deceit has already won; the walls that held for ten years are opened from the inside by trust alone.",
        "source": "Giovanni Domenico Tiepolo, \"The Procession of the Trojan Horse into Troy\" (c. 1760), National Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Domenico_Tiepolo_-_The_Procession_of_the_Trojan_Horse_in_Troy_-_WGA22382.jpg",
        "image": {
          "src": "/covers/willison-red-team-ai-assistant--art.png",
          "alt": "Crowds of Trojans drawing the great wooden horse in procession through the gates of Troy, oil painting by Giovanni Domenico Tiepolo",
          "credit": "Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas, \"L'apprenti sorcier\" (The Sorcerer's Apprentice)",
        "excerpt": "Dukas's 1897 scherzo sets Goethe's parable to music: a giddy theme marches the enchanted broom into motion, then surges out of control as the apprentice's command, obeyed too well, floods the room. It is the sound of an automaton that follows instructions perfectly and disastrously, halting only when the master returns to speak the words that bind it.",
        "source": "Paul Dukas, L'apprenti sorcier, full orchestral score (Durand, 1897), IMSLP",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 26
  },
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
