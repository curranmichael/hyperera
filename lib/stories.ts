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
    "slug": "messi-argentina-spain-world-cup-final",
    "headline": "Lionel Messi's Argentina and Spain will meet in the men's World Cup final, with Argentina chasing back-to-back titles",
    "overview": "Argentina, captained by Lionel Messi, will face Spain in the men's World Cup final, a match pitting the defending champions against a Spanish side built around a younger generation. Messi told reporters that his team 'will give it our all,' as the tournament has been shadowed by off-field controversies, including a dispute over a Falklands banner and a starring role for U.S. President Donald Trump. Argentina is seeking to become the first team in decades to win consecutive World Cups.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxNU1NyaFA2YmFjazZUQm8yVHM4UkQ5Tmc5TzdkM19EWTFlem0yR3EyRlM1WUYwN2hnZDc3QjJKak1FT2JzdFYzdEk0S2xkaW9qaVlHcTFyc1ZmcXppa1kyMnhrVkJuMHJJaE5rT2ZnSG41MEUxQmV2d0U4XzAtRUJpQXRSZ0xLVXRxVWRlWjNlSU0zTlM0aUE?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxOelBSNFRlSzlVdFNZUUhXeWhfamtoSVYzSE85OE55bGZTMXk4em95bDRSamZ1eHZBdTkzWUViVFBDMXREbGlTMlQ0TWtGS29CdV9zclNLel8wQVdmcHdma3NLS0YyQVZBMmZXQmdtRHgzODhra3hNT1JYREM0TjhraFM2SU1sdGZBOUkzMWROVDVXZFUyXy13enBXSkNrUnNLeUJZYy05TjJuWDVrNFZZRnBLU2JuRWdhc2d2VTMxN1otY2dp?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/messi-argentina-spain-world-cup-final.png",
      "alt": "Lionel Messi in Argentina's blue-and-white striped jersey during a World Cup match.",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 7th-century-BC Italy, Rome and Alba Longa agreed to settle their war not with two full armies but with three brothers a side, the Horatii and the Curiatii, as Livy records in Book I of his History of Rome. The fate of two nations hung on one decisive contest, exactly as a World Cup final compresses a people's hopes into a single afternoon. When Messi's Argentina and Spain walk out, they too are champions chosen to carry an entire nation's pride into a winner-take-all combat. And like the lone surviving Horatius, the victor will be remembered forever while the vanquished are left to mourn.",
        "excerpt": "Therefore, in the name of heaven, since, not content with certain liberty, we are incurring the dubious risk of sovereignty and slavery, let us adopt some method, whereby, without much loss, without much blood of either nation, it may be decided which shall rule the other.\n[...]\nThe Roman, exulting, says, 'Two I have offered to the shades of my brothers: the third I will offer to the cause of this war, that the Roman may rule over the Alban.'",
        "source": "Livy (Titus Livius), The History of Rome, Book I, ch. 24-25 (the single combat of the Horatii and Curiatii), c. 27 BC; trans. D. Spillan, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/19725/19725-h/19725-h.htm"
      },
      {
        "category": "historical",
        "title": "On 16 July 1950, before nearly 200,000 spectators at the Maracana, underdog Uruguay beat host favourites Brazil 2-1 in the deciding match of the World Cup, the 'Maracanazo,' still the sport's most famous final upset. It is the shadow that hangs over every World Cup decider: proof that a favoured, dominant powerhouse can be toppled by a hungrier side on the day. As holders Argentina chase back-to-back titles against a rising Spanish generation, both camps know a final rewards nerve over reputation. Alcides Ghiggia's late winner silenced a stadium of 200,000, a reminder that in a title decider a nation's legacy is settled in a single game.",
        "excerpt": "The 1950 final round was decided in this last match, with Brazil needing only a draw before their own vast home crowd and Uruguay needing to win outright. Friaca put Brazil ahead early in the second half, but Juan Alberto Schiaffino equalised and Alcides Ghiggia struck the winner, and the Maracana fell into stunned silence. It endures as one of the greatest upsets in football history, the template for how a favoured side can be undone in a single decisive final.",
        "source": "The 1950 FIFA World Cup Final (the 'Maracanazo'), Uruguay 2-1 Brazil, Maracana Stadium, Rio de Janeiro, 16 July 1950.",
        "href": "https://en.wikipedia.org/wiki/1950_FIFA_World_Cup_Final"
      },
      {
        "category": "literary",
        "title": "In Book 23 of Homer's Iliad, Achilles stages funeral games for Patroclus, and the fiercest event is the chariot race, where seasoned champions strain every nerve for the prize and the glory of winning. Homer treats athletic contest as the arena where heroic identity is proved, the same stage on which Messi now seeks to crown his career. The charioteers' 'lust of victory' mirrors the intensity of a World Cup final, where mastery, cunning and heart decide who is remembered. It is the oldest literary template for what Argentina and Spain will enact: greatness measured in a single, watched contest.",
        "excerpt": "At one moment the chariots seemed to touch the ground, and then again they bounded into the air; the drivers stood erect, and their hearts beat fast and furious in their lust of victory. Each kept calling on his horses, and the horses scoured the plain amid the clouds of dust that they raised.",
        "source": "Homer, The Iliad, Book XXIII (the funeral games of Patroclus), trans. Samuel Butler (1898); Internet Classics Archive, MIT.",
        "href": "http://classics.mit.edu/Homer/iliad.23.xxiii.html"
      },
      {
        "category": "literary",
        "title": "Pindar's Olympian Ode I, composed around 476 BC for Hieron of Syracuse's victory in the horse race, is the supreme ancient hymn to athletic triumph, declaring no games greater than the Olympic and promising the champion undying fame in song. Pindar understood what a final confers: not just a trophy but immortality in memory, the poet's task being to make a victor's glory permanent. Messi, at his last stand, plays for exactly this Pindaric prize, a legacy sealed by winning the greatest contest of all. Spain's young side chases the same laurel, knowing the winner's name will be sung for generations.",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth\n[...]\nso neither shall we find any games greater than the Olympic whereof to utter our voice: for hence cometh the glorious hymn and entereth into the minds of the skilled in song",
        "source": "Pindar, Olympian Ode I (for Hieron of Syracuse), c. 476 BC; trans. Ernest Myers (1874), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's 'Oath of the Horatii' (1784, Musee du Louvre) freezes the moment before that Roman single combat: three brothers salute the swords their father raises, bodies rigid with a collective resolve to win or die for the nation. The painting distills a final's essence, unity, sacrifice and the terrible weight of representing your people in one decisive clash. Its taut male figures, set against the collapsing, grieving women at the right, capture both the glory and the cost of such a contest. Set before Argentina against Spain, it reads as the emotional charge a captain like Messi asks of his team: everything, offered for a single victory.",
        "excerpt": "David's vast neoclassical canvas locks three young warriors in a single diagonal thrust as they stretch their arms toward the gleaming swords their father holds aloft against a stark colonnade. The men are all sharp lines and coiled muscle, sworn as one to the fate of their city, while the softly curved, weeping women slumped to the right embody everything at stake. The severe geometry and cold clarity make the image feel like the held breath before a decisive contest.",
        "source": "Jacques-Louis David, Oath of the Horatii (Le Serment des Horaces), 1784, oil on canvas, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David,_Le_Serment_des_Horaces.jpg",
        "image": {
          "src": "/covers/messi-argentina-spain-world-cup-final--a4.png",
          "alt": "Jacques-Louis David's painting The Oath of the Horatii, three brothers swearing on raised swords held by their father while women grieve at the right",
          "credit": "Jacques-Louis David (1784), Musee du Louvre; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The 'Charioteer of Delphi' (c. 470 BC, Delphi Archaeological Museum) is a life-size bronze dedicated by the Sicilian ruler Polyzalos to commemorate a victory in the chariot race of the Pythian Games, the ancient world's monument to a champion's triumph. Serene and upright, the reins still in his hand and his inlaid eyes gazing calmly outward, the victor embodies mastery held with grace at the moment of glory. It is the sculptural ideal of the athletic champion whose win is cast in bronze for the ages. For Messi, chasing a final that would immortalise his legacy, it is the perfect emblem: victory made permanent.",
        "excerpt": "One of the finest surviving bronzes of antiquity, the Charioteer stands calm and erect in a long pleated tunic, the reins of his vanished team still gathered in an outstretched hand. His copper lips, silver-banded headband and inlaid glass eyes give the face a startling living presence, the composed dignity of a man at the instant of his greatest win. Once part of a full chariot group set up at Delphi, he survives as the enduring image of the victorious athlete honoured for all time.",
        "source": "Charioteer of Delphi (Heniokhos), c. 470 BC, bronze, Delphi Archaeological Museum, Greece.",
        "href": "https://commons.wikimedia.org/wiki/File:Delphi_charioteer_front_DSC06255.JPG",
        "image": {
          "src": "/covers/messi-argentina-spain-world-cup-final--a5.png",
          "alt": "The bronze Charioteer of Delphi, a life-size ancient Greek statue of a victorious chariot driver holding the reins",
          "credit": "Charioteer of Delphi, c. 470 BC, Delphi Archaeological Museum; photo via Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "iran-gulf-states-kuwait-desalination",
    "headline": "Iran strikes Gulf Arab states and damages a Kuwait desalination plant as the U.S. carries out a seventh straight night of strikes on Iran",
    "overview": "Iran launched a new wave of attacks on U.S.-allied Gulf Arab states, with one strike damaging a desalination plant in Kuwait and exposing the region's water vulnerability, after the U.S. military completed a seventh consecutive night of strikes on Iranian targets. The widening exchange has drawn in more of the Gulf and raised fears for the region's energy and water infrastructure. Both sides have signalled they will keep up the pressure.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNUVgwRnh4bGg5bXVrMEdSNXEydXpjb0dCTmQwQlV2MHlydHJTU05DcUxIbktrZW82aGUwZ2F4R2h6bkJXOEpFQy1DREthRVFySzUzNkpVMGNSdXdTMlVjVFR4ZTkyYlRqRTU4bEo1cHR1Y3RMSDJ0UV9Ed01tbnVZbUdyN29ZZWpqQU5VZDd3b3dkS0VlMVp5UUJSZHdPVUUzVjZGNmFHWUJOYWVFZDd0ekJnV293QTg?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQRGVJbndDX0t6eVRMcXVhUEtKLVlUYmJZeG5yYWNja0VPdU9nYTRuN25NeVRYcGNhaU5YT1poZW5LN2ZxUHRXaFhOZnp5Y2V6YnpUdWxaWUEyZlMzc2M0c1lIaUxIMmVpMkwza1NUSXAtbkhZNmYyekcxaFJTNmdTckhQamhyNHEyM2JickFyUFNMOVVLM1F5WVFkUlFmdHJIMVd3LWFJTmw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/iran-gulf-states-kuwait-desalination.png",
      "alt": "A large seawater desalination plant on the coast.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 539 BC Cyrus the Great captured Babylon by turning water itself into a weapon. According to Herodotus, the Persian king diverted the Euphrates into an old marsh-basin until the river that ran through the city sank to a man's thigh, then marched his soldiers up the drained riverbed and into the town. It is the founding image, in this very region between Persia and Mesopotamia, of controlling water to break an enemy. The strike on a Kuwaiti desalination plant is the mirror inverse: instead of draining a river to enter a city, a modern combatant threatens the water a Gulf city needs to live, proving that in the desert the water supply is still the softest and most decisive target.",
        "excerpt": "he turned the Euphrates by a canal into the basin, which was then a marsh, on which the river sank to such an extent that the natural bed of the stream became fordable.\n\nHereupon the Persians who had been left for the purpose at Babylon by the river-side, entered the stream, which had now sunk so as to reach about midway up a man's thigh, and thus got into the town.",
        "source": "Herodotus, The Histories, Book 1.190–191, trans. George Rawlinson.",
        "href": "https://www.livius.org/sources/content/herodotus/cyrus-takes-babylon/",
        "image": {
          "src": "/covers/iran-gulf-states-kuwait-desalination--a0.png",
          "alt": "The Cyrus Cylinder, a Babylonian clay barrel recording Cyrus the Great's capture of Babylon in 539 BC.",
          "credit": "The British Museum, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "During the Iran–Iraq War the fighting spilled across the whole Persian Gulf in the 'Tanker War' of the mid-1980s, when Iran and Iraq attacked hundreds of merchant ships and Iran struck at Kuwait's tankers and oil facilities to punish the emirate for backing Baghdad. Kuwait's appeal for protection drew the United States directly into the Gulf in 1987 under Operation Earnest Will, escorting reflagged Kuwaiti tankers with warships. It is the closest precedent for the present event: a bilateral war widening by retaliation until it lands on U.S.-allied Gulf Arab states and pulls in American forces. Then as now, Iran answered pressure by hitting the vulnerable civilian and economic lifelines of its neighbors, and Kuwait again found itself in the line of fire.",
        "excerpt": "The 'Tanker War' phase of the Iran–Iraq conflict (1984–88) saw Iran and Iraq attack neutral merchant shipping across the Persian Gulf, with Iran striking Kuwaiti tankers and installations in reprisal for Kuwait's support of Iraq. In December 1986 Kuwait asked Washington for protection, and in July 1987 the U.S. Navy launched Operation Earnest Will, reflagging Kuwaiti tankers as American vessels and escorting them through the Gulf in the largest convoy operation since World War II.",
        "source": "The Tanker War and Operation Earnest Will, Persian Gulf, 1984–1988 (Iran–Iraq War).",
        "href": "https://en.wikipedia.org/wiki/Tanker_war",
        "image": {
          "src": "/covers/iran-gulf-states-kuwait-desalination--a1.png",
          "alt": "U.S. Navy warships escort the tanker Gas King through the Persian Gulf, 21 October 1987, during Operation Earnest Will.",
          "credit": "U.S. Navy photograph, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus's tragedy The Persians (472 BC) is the oldest surviving play in the world, and it stages a war between Persia and its foes from the losing side, as the Persian court learns that Xerxes' vast host has been annihilated at Salamis. The drama is built on the theme of hubris meeting retribution: an empire that overreached is broken, and the stage fills with the grief of a people counting their dead. Told sympathetically from Persia's own perspective, it warns how quickly a campaign of dominance curdles into ruin and mourning. Read against today's widening war, it is a reminder that escalation is measured in the end by the wailing of civilians, whichever power began it.",
        "excerpt": "Wo to the land of Persia, once the port\nOf boundless wealth, how is thy glorious state\nVanish'd at once, and all thy spreading honours\nFall'n, lost!...\nPersians, the whole barbaric host is fall'n.\nCHORUS\nO horror, horror! What a baleful train\nOf recent ills! Ah, Persians, as he speaks\nOf ruin, let your tears stream to the earth.",
        "source": "Aeschylus, The Persians (472 BC), trans. Robert Potter; Messenger's speech.",
        "href": "https://classics.mit.edu/Aeschylus/persians.html"
      },
      {
        "category": "literary",
        "title": "The Book of Isaiah records the Assyrian king Sennacherib's siege of Jerusalem, where his field commander taunts the starving defenders about their food and water, promising them their own vine, fig tree and cistern only if they surrender. Water is at the center of the threat: to besiege a city is to strangle its supply. The story ends with sudden catastrophe visited on the Assyrian host, the classic scriptural warning that the aggressor who preys on a people's basic sustenance meets a terrible reckoning. The passage speaks directly to a war now aimed at desalinated water and civilian infrastructure, and to the ancient truth that thirst is the sharpest instrument of siege.",
        "excerpt": "[Isaiah 36:16] Hearken not to Hezekiah: for thus saith the king of Assyria, Make an agreement with me by a present, and come out to me: and eat ye every one of his vine, and every one of his fig tree, and drink ye every one the waters of his own cistern;\n[17] Until I come and take you away to a land like your own land, a land of corn and wine, a land of bread and vineyards.\n[37:36] Then the angel of the LORD went forth, and smote in the camp of the Assyrians a hundred and fourscore and five thousand: and when they arose early in the morning, behold, they were all dead corpses.",
        "source": "The Book of Isaiah 36:16–17; 37:36, King James Version.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah",
        "image": {
          "src": "/covers/iran-gulf-states-kuwait-desalination--a3.png",
          "alt": "Assyrian palace relief depicting Sennacherib's siege of the city of Lachish in 701 BC.",
          "credit": "Nineveh palace relief, The British Museum, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens's oil painting The Defeat of Sennacherib (c. 1612–1614, Alte Pinakothek, Munich) turns the Isaiah story into a churning nocturnal catastrophe: the Assyrian army and its horses are hurled backward in a tangle of light and shadow as a heavenly force scatters the invaders in an instant. It is one of the great Baroque images of an overwhelming attack visited upon an aggressor without warning, all violence and reversal. As a war painting it captures exactly the vertigo of sudden escalation, the moment when a mighty striking force is itself overtaken by chaos. Set beside a seventh straight night of strikes and answering blows across the Gulf, it visualizes the terrifying speed with which a campaign can turn into a scene of ruin.",
        "excerpt": "A tumult of rearing horses and falling soldiers fills the canvas as a burst of divine light routs Sennacherib's army in the dark. Rubens sends the whole Assyrian host recoiling in a single violent instant, armor and flesh dissolving into shadow. The painting stages war as sudden, total reversal, the striking force struck down.",
        "source": "Peter Paul Rubens, The Defeat of Sennacherib, c. 1612–1614, oil on panel, Alte Pinakothek, Munich.",
        "href": "https://en.wikipedia.org/wiki/The_Defeat_of_Sennacherib",
        "image": {
          "src": "/covers/iran-gulf-states-kuwait-desalination--a4.png",
          "alt": "Rubens's Baroque painting The Defeat of Sennacherib, showing the Assyrian army routed at night by a heavenly force.",
          "credit": "Peter Paul Rubens, Alte Pinakothek, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel's oratorio Belshazzar (HWV 61, composed 1744), on a libretto by Charles Jennens, sets to music the very campaign of Cyrus against Babylon, including the stratagem of draining the Euphrates and marching along its bed to take the city. The score moves from the doomed feast and the writing on the wall to the conqueror's river-diversion and the fall of a great capital, making music out of a war decided by control of water. It is the artistic bookend to this whole cluster: the same Persian-Mesopotamian drama of siege, sudden reversal, and a diverted river, now sung. Heard against a Gulf war in which a water plant becomes a target, its choruses of triumph and lament underline how old and how musical the theme of water as the hinge of war really is.",
        "excerpt": "Handel's oratorio dramatizes the fall of Babylon, following Cyrus as he is seized by the idea of draining the Euphrates and leading his army into the city along the empty riverbed. Solemn choruses of feasting and doom give way to the triumphant Persians and the conquered captives, turning a war won by manipulating a river into sung tragedy and deliverance. The music makes vivid, three centuries on, the same theme of water as the decisive weapon of a regional war.",
        "source": "George Frideric Handel, Belshazzar, HWV 61 (composed 1744, premiered 1745), libretto by Charles Jennens.",
        "href": "https://imslp.org/wiki/Belshazzar,_HWV_61_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/iran-gulf-states-kuwait-desalination--a5.png",
          "alt": "Portrait of the composer George Frideric Handel by Balthasar Denner.",
          "credit": "Balthasar Denner, via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "ukraine-defense-minister-ousted",
    "headline": "Ukraine fights on under an interim defence chief after Zelensky's contested reshuffle removes the defence minister",
    "overview": "Ukraine is being run by an interim defence chief after President Volodymyr Zelensky's disputed government shake-up removed the country's defence minister, a move that has angered many soldiers who spoke to the BBC. The reshuffle comes at a precarious moment in the war with Russia. Critics say its timing risks disrupting the military's command as heavy fighting continues.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOTVpfV3hyQU9laFE5UWxLVVl2QmtxellGOTVLUmVnZjRGYm9CSVpWZGFnS3ZDMnlGNE5xYzhZc0Y4Mm1WTUxqNVY1N0FsWk9tbFZLS3ZWbXFSMXFuRXJQdWZfWnk0MlA2N3NDaXhZV0ZqZ3NOYkE2YXJ1V2tqNUQ1Sk9uRTlUMkxiQkJpYzlMaVBrUUFmNWowSFVKR21VQzdFRndyOFlB?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvg8w4dpjkwo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/ukraine-defense-minister-ousted.png",
      "alt": "The Ukrainian flag flying against a grey sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 406 BC, after Athenian commanders won the great sea battle of Arginusae against Sparta but failed, in a rising storm, to rescue survivors and recover the dead, the Athenian assembly turned on its own victorious generals. As Xenophon records in the Hellenica, the people at home deposed the entire board of generals in the middle of the war and then condemned eight of them, executing the six who were in Athens. It became the classic warning of a wartime democracy purging its military command in a fit of anger and political passion, throwing away experienced leadership while Sparta still pressed at sea. Like Kyiv's contested removal of its defence minister in the middle of the fight with Russia, it shows how the bond between civic authority and its fighting commanders can snap under the strain of war, and how the army pays the price.",
        "excerpt": "All the above-named generals, with the exception of Conon, were presently deposed by the home authorities.\n\n... by the votes recorded the eight generals were condemned, and the six who were in Athens were put to death.",
        "source": "Xenophon, Hellenica, Book I, Chapter 7, trans. H. G. Dakyns (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm"
      },
      {
        "category": "historical",
        "title": "On November 5, 1862, in the middle of the American Civil War, President Abraham Lincoln issued the terse executive order relieving Major-General George B. McClellan of command of the Army of the Potomac and installing Ambrose Burnside in his place. McClellan was popular with his soldiers, who idolized 'Little Mac,' and his abrupt dismissal by the civilian commander-in-chief exposed the raw tension between political leadership and a beloved general in the field. Lincoln judged McClellan too cautious after Antietam; the reshuffle rippled through the ranks and unsettled the army mid-campaign. The episode mirrors Ukraine's contested wartime shake-up: a head of state overriding his war chief in the middle of a conflict, weighing political judgment against the loyalty troops feel toward their commander.",
        "excerpt": "By direction of the President, it is ordered that Major-General McClellan be relieved from the command of the Army of the Potomac, and that Major-General Burnside take the command of that army; also that Major-General Hunter take command of the corps in said army which is now commanded by General Burnside; that Major-General Fitz John Porter be relieved from the command of the corps he now commands in said army, and that Major-General Hooker take command of said corps.\n\nThe General in Chief is authorized, in (his) discretion, to issue an order substantially as the above forthwith, or so soon as he may deem proper.\n\nA. LINCOLN.",
        "source": "Abraham Lincoln, 'Executive Order—Relieving General G. B. McClellan and Making Other Changes,' November 5, 1862.",
        "href": "https://www.presidency.ucsb.edu/documents/executive-order-relieving-general-g-b-mcclellan-and-making-other-changes",
        "image": {
          "src": "/covers/ukraine-defense-minister-ousted--a1.png",
          "alt": "President Lincoln and General George B. McClellan seated facing each other in the general's tent at Antietam, October 1862.",
          "credit": "Photograph by Alexander Gardner, October 1862. Library of Congress Prints and Photographs Division; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The founding quarrel of Western literature, in Book I of Homer's Iliad, is a dispute over command and honor between the supreme leader Agamemnon and his greatest warrior, Achilles. When Agamemnon is forced to give up his prize, he humiliates Achilles by seizing Briseis instead, asserting his authority as commander over the fighter the army most reveres. Achilles withdraws in fury, and the Greek host suffers grievously for the rupture between political-military leadership and its finest soldier. The scene distills the danger dramatized by Ukraine's reshuffle: when a ruler's assertion of authority collides with the loyalty and pride of the men who actually do the fighting, the whole war effort can falter.",
        "excerpt": "and thus will I do: since Phoebus Apollo is taking Chryseis from me, I shall send her with my ship and my followers, but I shall come to your tent and take your own prize Briseis, that you may learn how much stronger I am than you are, and that another may fear to set himself up as equal or comparable with me.”",
        "source": "Homer, The Iliad, Book I, trans. Samuel Butler (Project Gutenberg).",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
        "image": {
          "src": "/covers/ukraine-defense-minister-ousted--a2.png",
          "alt": "Roman wall painting from Pompeii showing Briseis being led away from Achilles by heralds.",
          "credit": "Wall painting from Pompeii (House of the Tragic Poet, VI 8 5), Naples National Archaeological Museum (inv. 9105); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare's Coriolanus dramatizes the collision between a formidable war-hero general and the civic authorities of Rome. Caius Marcius Coriolanus, whose battlefield valor saved the city, is stripped of standing and banished by the tribunes and the people in a bitter political struggle over who commands the loyalty of the state. In Act III, Scene 3, hearing his sentence, he flings the banishment back in their faces, defiant and contemptuous, before turning his back on Rome with the great line 'There is a world elsewhere.' The play captures the volatile aftermath of a wartime leadership rupture, the resentment of a soldier cast out by political leaders, and the peril of divorcing a proven commander from the cause he defended, echoing the anger of Ukrainian soldiers at their minister's removal.",
        "excerpt": "You common cry of curs, whose breath I hate\nAs reek o’ th’ rotten fens, whose loves I prize\nAs the dead carcasses of unburied men\nThat do corrupt my air, I banish you!\nAnd here remain with your uncertainty;\nLet every feeble rumour shake your hearts;\nYour enemies, with nodding of their plumes,\nFan you into despair! Have the power still\nTo banish your defenders, till at length\nYour ignorance—which finds not till it feels,\nMaking but reservation of yourselves,\nStill your own foes—deliver you,\nAs most abated captives to some nation\nThat won you without blows! Despising\nFor you the city, thus I turn my back.\nThere is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus, Act III, Scene 3 (First Folio text, Project Gutenberg).",
        "href": "https://www.gutenberg.org/cache/epub/1535/pg1535.txt"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's late masterpiece 'The Anger of Achilles' (1819), now in the Kimbell Art Museum, freezes the moment of a leadership rupture at the outbreak of the Trojan War. Agamemnon, the commander, stands calmly imposing his will, while Achilles' hand flies to his sword hilt, his face contorted with fury at the affront to his honor. The neoclassical composition makes visible the exact instant when authority and a warrior's pride become irreconcilable. It is a vivid emblem for Ukraine's contested reshuffle, the frozen breath before command friction erupts into open anger among the fighting men.",
        "excerpt": "David paints the confrontation with taut, statuesque restraint: four figures crowded against a dark ground, gestures poised on a knife-edge. Agamemnon's outstretched arm and cold gaze embody unbending command, while young Achilles grips his sword in barely contained rage and Iphigenia and Clytemnestra register the human cost between them. The painting makes command friction feel like a held breath about to break.",
        "source": "Jacques-Louis David, The Anger of Achilles (La Colère d'Achille), oil on canvas, 1819, Kimbell Art Museum, Fort Worth.",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Anger_of_Achilles_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ukraine-defense-minister-ousted--a4.png",
          "alt": "Neoclassical painting: Agamemnon confronting an enraged Achilles who reaches for his sword, with two women between them.",
          "credit": "Jacques-Louis David, 'The Anger of Achilles' (1819), Kimbell Art Museum; public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's 'Coriolan' Overture, Op. 62 (1807), written for Heinrich von Collin's tragedy on the Roman general Coriolanus, sets to music the same story of a war leader broken against the authority of the state. Its stabbing C-minor chords depict the proud, unyielding commander, while a tender contrasting theme pleads for restraint, dramatizing the tension between a soldier's defiance and the demands of the polity. The music collapses at the end into fading, hesitant pulses as the general's resolve, and the man himself, gives way. As a portrait of the danger and human toll of a rupture between a commander and the civic power he served, it resonates with Ukraine's fraught wartime removal of its defence chief.",
        "excerpt": "The overture erupts with three hammered unison C's answered by furious orchestral chords, the sound of an implacable warrior. Against this Beethoven sets a lyrical, imploring second theme, and the two forces contend without reconciliation. In the closing bars the driving pulse fragments into soft, broken pizzicato notes that die away, a musical image of a commander's downfall.",
        "source": "Ludwig van Beethoven, Coriolan Overture, Op. 62 (1807); scores at IMSLP.",
        "href": "https://imslp.org/wiki/Coriolan,_Op.62_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/ukraine-defense-minister-ousted--a5.png",
          "alt": "Oil portrait of Ludwig van Beethoven holding a manuscript, painted by Joseph Karl Stieler in 1820.",
          "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven, 1820; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "ukraine-drones-russia-oil-depot",
    "headline": "Ukrainian drone attacks kill seven warehouse workers in Russia and set an oil depot ablaze near Moscow",
    "overview": "Waves of Ukrainian drones killed seven night-shift workers at a warehouse in Russia's Tambov region and injured dozens more, while a separate strike sparked a fire at an oil depot in Noginsk, about 50 kilometres east of the Kremlin, regional governors said. Moscow's mayor claimed hundreds of drones were launched toward the capital region and that many were shot down. It was among the largest Ukrainian drone assaults on the Moscow area of the war.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQdy1tV0VCdllFYU1ydXJTWE1YbmM3TlZIYU5yLTZSQ243TVZacXFXc3lzVmxBMEtHNzJLS1RfWEk2bGViWHgxdVBaUjVjN0tZV1dDS1VXN3BvVTZsMW1PeENJbVNrOUZXVHY1UHUxLV9HVVlodFdhQnczQldxd0QtTWh1a2RwR3EteTVINHhfM0hpZlh2SGZyUS1RZlo1cDR6WXZlVHNDU0tHUEtsUFlwRkg5cGpJT2JrY09mQUZIalVfRmtG?oc=5"
      },
      {
        "name": "Kyiv Independent",
        "href": "https://kyivindependent.com/oil-depot-in-moscow-oblast-reportedly-struck-by-ukrainian-drones/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/ukraine-drones-russia-oil-depot.png",
      "alt": "Rows of large cylindrical oil storage tanks at a fuel depot.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 1 August 1943 — a day the airmen called Black Sunday — 178 American B-24 Liberators skimmed at treetop height over Ploiești, Romania, in Operation Tidal Wave, striking the refineries that supplied roughly sixty percent of Axis fuel. Like the Ukrainian drones reaching a depot near Moscow, the raid carried the war deep behind enemy lines to burn the fuel and supply that armies cannot fight without. The refineries erupted into walls of flame and black smoke, and 101 Romanian civilians on the ground were killed, some when a stricken bomber crashed into a Ploiești prison. It was the costliest air raid in U.S. history, and yet within weeks the refineries were producing again — a reminder of how stubbornly such infrastructure resists destruction.",
        "excerpt": "It was a strategic bombing mission and part of the oil campaign to deny petroleum-based fuel to the Axis powers. The Ploiești oil refining complex produced roughly sixty percent of the petroleum products used by the Axis in Europe. Flying at treetop height to evade radar, the B-24 crews met walls of smoke, exploding storage tanks, and intense flak; of some 1,750 airmen who set out, 310 were killed or missing, and the mission became the costliest major Allied air raid of the war.",
        "source": "Operation Tidal Wave (the low-level bombing of the Ploiești oil refineries, 1 August 1943), World War II Allied oil campaign.",
        "href": "https://en.wikipedia.org/wiki/Operation_Tidal_Wave"
      },
      {
        "category": "historical",
        "title": "In November 1864, General William Tecumseh Sherman put Atlanta's railroads, warehouses, foundries, and depots to the torch before marching to the sea, deliberately destroying the supply and transport that kept the Confederacy in the field. As with the drone strikes that gutted a warehouse and set an oil depot ablaze, the target was the enemy's home-front machinery of war, and the method was fire. Riding out of the city at dawn, Sherman turned to watch Atlanta smoldering behind him, a black pall of smoke hanging over the ruins. His campaign became the archetype of carrying destruction into an aggressor's own heartland to break its capacity to sustain a war.",
        "excerpt": "Behind us lay Atlanta, smouldering and in ruins, the black smoke rising high in air, and hanging like a pall over the ruined city. Away off in the distance, on the McDonough road, was the rear of Howard's column, the gun-barrels glistening in the sun, the white-topped wagons stretching away to the south.",
        "source": "William T. Sherman, Memoirs of General William T. Sherman, Vol. II (1875), on the departure from Atlanta, 16 November 1864.",
        "href": "https://www.gutenberg.org/cache/epub/4361/pg4361.txt"
      },
      {
        "category": "literary",
        "title": "In Book II of Virgil's Aeneid, Aeneas climbs to the palace roof and watches the great city of Troy consumed house by house in the night, the flames leaping from the palace of Deiphobus to the home of Ucalegon until even the distant sea glows with the reflected fire. It is the ancient image that the strikes near Moscow evoke: war reaching into the heart of a great capital, fire spreading in the dark, and the light of a burning city seen for miles. Virgil renders the catastrophe as both intimate and cosmic, a household ablaze and a whole civilization falling at once. Dryden's translation makes the flames roar with the roll of trumpets and rising clamor.",
        "excerpt": "The palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.\nNew clamours and new clangours now arise,\nThe sound of trumpets mix'd with fighting cries.",
        "source": "Virgil, The Aeneid, Book II, translated by John Dryden (1697).",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations mourns Jerusalem after the Babylonian assault of 586 BC, when the enemy at last passed through the city's gates and a fire was kindled that devoured its very foundations. Its verses speak directly to the shock of destruction reaching a place long thought secure, the disbelief that walls could be breached and a capital set alight. Like the fires burning behind Russia's front lines and near its capital, the poem fixes on the moment a war thought to be far away suddenly consumes the home ground. The lament turns catastrophe into a keening chorus of grief for a fallen and burning city.",
        "excerpt": "The LORD hath accomplished his fury; he hath poured out his fierce anger, and hath kindled a fire in Zion, and it hath devoured the foundations thereof. The kings of the earth, and all the inhabitants of the world, would not have believed that the adversary and the enemy should have entered into the gates of Jerusalem.",
        "source": "Lamentations 4:11-12, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Albrecht Adam's oil painting Napoleon in Burning Moscow (1841) shows the emperor and his staff on horseback silhouetted against a city turned into an inferno, the sky and clouds stained orange by the fires that gutted Moscow in September 1812. The German painter had ridden with the Grande Armée into Russia and rendered the scene as spectacle and omen: the invader stranded amid the flames of the very capital he had seized. The canvas speaks uncannily to fires near present-day Moscow — the war's violence turned back upon the aggressor's own soil, the great city burning in the night. It is at once a portrait of triumph curdling into ruin and a study of a capital ablaze.",
        "excerpt": "A history painting of Napoleon and his mounted officers halted before Moscow as the city burns, their dark forms sharp against a vast wall of flame and smoke. The whole sky glows with firelight, and the reflected blaze paints the horses and riders in lurid orange, capturing the moment an invasion is swallowed by the conflagration of the capital it captured.",
        "source": "Albrecht Adam (1786-1862), Napoleon in Burning Moscow, oil on canvas, 1841.",
        "href": "https://commons.wikimedia.org/wiki/File:Napoleon_in_burning_Moscow_-_Adam_Albrecht_(1841).jpg",
        "image": {
          "src": "/covers/ukraine-drones-russia-oil-depot--a4.png",
          "alt": "Painting of Napoleon and his officers on horseback before Moscow as the city burns behind them under a sky of orange flame and smoke.",
          "credit": "Albrecht Adam, Napoleon in Burning Moscow (1841). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Dmitri Shostakovich composed his Symphony No. 7 in C major, the Leningrad, in 1941 as German bombs and shells fell on his besieged city, and its famous first movement builds a relentless, mechanical march — the invasion theme — that swells from a whisper into a deafening, grinding assault. Premiered in starving Leningrad in August 1942 and broadcast toward the enemy lines, it became the sound of a great city under aerial and artillery bombardment refusing to fall silent. It captures precisely the atmosphere of these strikes: the drone of attack reaching the home front, the pounding of ordnance in the night, and the human cost beneath it. The music is both an act of witness and an act of defiance against the war brought to a capital's doorstep.",
        "excerpt": "In the first movement an innocent little tune is repeated over and over, growing louder and more menacing with each pass as drums and brass pile on, until it becomes a crushing march of mechanized violence — the sound of a war machine bearing down on a living city. Against it the strings mount a broken, grieving resistance, so that bombardment and mourning sound together in one vast orchestral crescendo.",
        "source": "Dmitri Shostakovich, Symphony No. 7 in C major, Op. 60 (Leningrad), 1941; premiered besieged Leningrad, 9 August 1942.",
        "href": "https://imslp.org/wiki/Symphony_No.7,_Op.60_(Shostakovich,_Dmitry)",
        "image": {
          "src": "/covers/ukraine-drones-russia-oil-depot--a5.png",
          "alt": "Photographic portrait of composer Dmitri Shostakovich in glasses, looking toward the camera.",
          "credit": "Deutsche Fotothek, portrait of Dmitri Shostakovich. CC BY-SA 3.0 DE, via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "skyroot-vikram-1-orbital-launch",
    "headline": "India's Skyroot launches Vikram-1, the country's first privately developed orbital rocket, into a 450-km orbit",
    "overview": "Skyroot Aerospace launched Vikram-1, India's first privately built orbital rocket, from the Satish Dhawan Space Centre in Sriharikota, placing customer payloads into a roughly 450-kilometre orbit about 15 minutes after lift-off. The company called the maiden mission, dubbed 'Aagaman,' a 'grand success.' The flight is a milestone for India's push to win a larger share of the global commercial launch market.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNMUZqeXJNOXVSbW4yeUF2ZXdzY1Z4cWpPal9WRzI4RXYtYUdpR0s0WjdkNVZsRXpBMmFmRktTYTdDUE1CZG95dnQ3bkJLZzZDTlp6X05FVzBINmthbkhHaVhfUDRHTENxM2k1bzlvYjJ5aWU3TkljLWJNZVh0TXpPd3dIYlo5Qjg3bjAxZUdOelBXT0RwMWx4bmxxcUdTanpSRldzT2JFamRYcUhRcmVwVGtYTQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/clyekv7rld3o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/skyroot-vikram-1-orbital-launch.png",
      "alt": "A rocket lifting off on a plume of fire and smoke.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 21 November 1783, over the rooftops of Paris, Jean-Francois Pilatre de Rozier and the Marquis d'Arlandes rose into the sky aboard a Montgolfier hot-air balloon, the first human beings ever to fly free of the earth. Their fragile paper-and-linen craft, warmed by a straw fire, drifted some twelve kilometers in twenty-five minutes and proved that ordinary people, not just birds and gods, could ascend into the heavens. Like Skyroot's Vikram-1 climbing to a 450-km orbit, it was a maiden voyage that turned a long-held human dream of flight into engineering fact. Both flights announced that a new frontier, once the domain of imagination alone, had been opened by daring builders.",
        "excerpt": "On 21 November 1783 the Montgolfier brothers' hot-air balloon carried Pilatre de Rozier and the Marquis d'Arlandes aloft from the Chateau de la Muette, the first manned free flight in history. Rising to roughly 3,000 feet and sustained only by a fire of straw, the two aeronauts floated across Paris before landing safely near the Butte-aux-Cailles. In a single quarter of an hour, humankind's ancient longing to leave the ground became a demonstrated reality.",
        "source": "The first manned free flight of the Montgolfier balloon, Paris, 21 November 1783. See 'Montgolfier brothers,' Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Montgolfier_brothers",
        "image": {
          "src": "/covers/skyroot-vikram-1-orbital-launch--a0.png",
          "alt": "Contemporary 1783 engraving by Claude-Louis Desrais depicting the ascent of a Montgolfier manned hot-air balloon in Paris.",
          "credit": "Engraving by Claude-Louis Desrais (1746-1816), 1783; Bildarchiv Preussischer Kulturbesitz, Berlin. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 19 April 1975, India launched Aryabhata, its first satellite, an experimental spacecraft built by the young Indian Space Research Organisation and named for the sixth-century astronomer-mathematician of the same name. That launch announced that India could design and build its own machines for space, planting the seed of a national space ambition. Skyroot's Vikram-1, half a century later, extends that same arc: where Aryabhata was the state's first satellite named for an ancient Indian sage, Vikram-1 is the nation's first privately built orbital rocket, named for Vikram Sarabhai, father of India's space program. Both mark a proud step in a nation's steady ascent toward the stars.",
        "excerpt": "Aryabhata, India's first satellite, was launched on 19 April 1975 from Kapustin Yar aboard a Soviet Kosmos-3M rocket, a 360-kg, 26-sided spacecraft built to study X-ray astronomy, aeronomics, and solar physics. Named after the classical Indian astronomer Aryabhata, it was the first satellite designed and constructed in India, a founding milestone for ISRO. Its image was proud enough to appear on the Indian two-rupee note from 1976 to 1997.",
        "source": "Aryabhata satellite, launched 19 April 1975; built by the Indian Space Research Organisation (ISRO). See 'Aryabhata (satellite),' Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Aryabhata_(satellite)",
        "image": {
          "src": "/covers/skyroot-vikram-1-orbital-launch--a1.png",
          "alt": "Photograph of Aryabhata, India's first satellite, a 26-sided polyhedron spacecraft built by ISRO and launched in 1975.",
          "credit": "Indian Space Research Organisation (ISRO). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book VIII of Ovid's 'Metamorphoses,' the master craftsman Daedalus builds wings of feathers and wax so that he and his son Icarus can escape Crete by flying, the archetypal Western myth of human beings engineering their own flight. Daedalus warns Icarus to hold a middle course, neither so low that the sea soaks the wings nor so high that the sun melts them, a caution every launch engineer would recognize. Skyroot's Vikram-1 is the triumphant, disciplined answer to the myth's warning: private builders fashioning a machine to climb into the heavens and, unlike Icarus, keeping precisely to their intended path to a 450-km orbit. The ancient story of daring toward the sky finds a controlled, successful echo in a rocket that reaches space and stays its course.",
        "excerpt": "'Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire _of the sun_ should scorch them.'\n[...]\nwhen the boy began to be pleased with a bolder flight, and forsook his guide; and, touched with a desire of reaching heaven, pursued his course still higher. The vicinity of the scorching Sun softened the fragrant wax that fastened his wings.",
        "source": "Ovid, Metamorphoses, Book VIII (the myth of Daedalus and Icarus), literal English prose translation by Henry T. Riley. Project Gutenberg eBook #26073.",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Jules Verne's 1865 novel 'From the Earth to the Moon' imagines an American gun club building a colossal cannon, the Columbiad, to fire a projectile carrying passengers into space, one of the first works to treat spaceflight as a concrete engineering project rather than fantasy. Its climactic chapter, titled 'Fire!', delivers the countdown, the electric spark, the earth-shaking detonation, and the projectile hurled victoriously into the sky. Written more than a century before real rockets flew, it anticipated the theatre of the modern launch that Skyroot's Vikram-1 enacted for real, a purpose-built vehicle roaring off the pad and vanishing upward toward the heavens. Verne's fictional first shot at the stars prefigures a maiden orbital flight born of private ingenuity and audacious ambition.",
        "excerpt": "\"Thirty-five!--thirty-six!--thirty-seven!--thirty-eight!--thirty-nine!--forty! FIRE!!!\" Instantly Murchison pressed with his finger the key of the electric battery, restored the current of the fluid, and discharged the spark into the breech of the Columbiad. An appalling unearthly report followed instantly, such as can be compared to nothing whatever known, not even to the roar of thunder, or the blast of volcanic explosions! An immense spout of fire shot up from the bowels of the earth as from a crater. The earth heaved up, and with great difficulty some few spectators obtained a momentary glimpse of the projectile victoriously cleaving the air in the midst of the fiery vapors!",
        "source": "Jules Verne, From the Earth to the Moon, Chapter XXVI, 'Fire!' (1865; English translation). Project Gutenberg eBook #83.",
        "href": "https://www.gutenberg.org/ebooks/83"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's painting 'Landscape with the Fall of Icarus' (c. 1555-1560s, Royal Museums of Fine Arts of Belgium, Brussels) shows a sunlit sea and a ploughman at work while, almost unnoticed in a corner, Icarus's legs vanish beneath the waves after his fall. The painting is a meditation on human aspiration and the ancient dream, and danger, of flying toward the sun. Set beside Skyroot's successful Vikram-1 launch, Bruegel's quiet tragedy throws the achievement into relief: the same human longing to leave the earth that once ended in a splash now, through careful private engineering, ends in a rocket safely reaching a 450-km orbit. Where the myth painted a fall, India's maiden private orbital flight paints an ascent completed.",
        "excerpt": "In a luminous coastal landscape, a farmer steers his plough and ships sail calmly on a golden sea while, easily missed in the lower right, only Icarus's pale flailing legs remain above the water as he drowns. The vast, indifferent world carries on around the fallen dreamer, the sun that undid him still low and bright on the horizon. The composition turns the mythic ambition to fly into a small, poignant detail dwarfed by ordinary life.",
        "source": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, oil on canvas, c. 1555-1560s. Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/skyroot-vikram-1-orbital-launch--a4.png",
          "alt": "Pieter Bruegel the Elder's painting Landscape with the Fall of Icarus, showing a ploughman and ships as Icarus's legs disappear into the sea.",
          "credit": "Pieter Bruegel the Elder, c. 1555-1560s; Royal Museums of Fine Arts of Belgium, Brussels. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Holst's orchestral suite 'The Planets,' Op. 32 (1914-1917), gives musical character to the worlds of the solar system, from the hammering menace of 'Mars' to the soaring, hymn-like grandeur of 'Jupiter, the Bringer of Jollity' and the quicksilver dash of 'Mercury, the Winged Messenger.' It is the most famous music of the heavens, turning the night sky into sweeping, aspirational sound. Its spirit of reaching outward and upward suits the triumph of Skyroot's Vikram-1, a private rocket lifting a nation's hopes into orbit. Holst's score is the kind of grand, ascending music one imagines playing as a maiden vehicle climbs toward the stars.",
        "excerpt": "Holst's suite conjures the cosmos in sound: 'Mercury, the Winged Messenger' darts with restless, silvery lightness, evoking swift flight, while 'Jupiter, the Bringer of Jollity' unfolds a broad, majestic melody that swells into one of the most stirring anthems of ascent in the orchestral repertoire. Brass and strings build a sense of vast open space and upward striving. The music feels made for the moment a craft leaves the ground and reaches for the heavens.",
        "source": "Gustav Holst, The Planets, Op. 32 (1914-1917), orchestral suite. Full score, public domain, via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/skyroot-vikram-1-orbital-launch--a5.png",
          "alt": "Portrait photograph of English composer Gustav Holst, composer of the orchestral suite The Planets.",
          "credit": "Photograph by Herbert Lambert (1881-1936), c. 1921; National Portrait Gallery. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "norway-drammen-fire-homes-destroyed",
    "headline": "A fire in Norway destroys more than 100 homes near Drammen and spreads into surrounding forests",
    "overview": "A fire that began in a townhouse in Drammen, about 50 kilometres west of Oslo, destroyed more than 100 homes on Friday and spread into nearby forests, forcing hundreds of residents to evacuate. More than 60 firefighters, aided by water-dropping helicopters, battled the blaze into Saturday. No casualties were reported, and the cause was not immediately clear.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNeXZ4SFJQQnBFWmtET1E1cGF2MmY1VTBTRXcta3FCaVduQ3dFZ2F0U1AyMnFUZ1h0QVN4YmFYdGtEeHE5ZnJYd2NGUENWaUpmM3RKR1N4aUJQeEUtVFhJRkZVcUVzNWFxeXZMODJyT2RaN3VYQVQ1WHViOTQ2Ukh4RnowSEc3WWtGZ0hwVnpLd3pJSEtBUDJ6ZE8xNXdQZw?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-17/hundred-homes-damaged-as-fire-rips-through-town-near-oslo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/norway-drammen-fire-homes-destroyed.png",
      "alt": "Helicopters dropping water over a large fire and smoke near a Norwegian town.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of London, September 1666, as recorded by the diarist John Evelyn. Just as the Drammen blaze leapt from a single townhouse to devour more than a hundred homes, London's fire spread street by street until much of the city stood in flame. Evelyn watched families drag their belongings into carts and boats and camp in open fields, exactly as hundreds fled the flames west of Oslo. His eyewitness account of a community in flight before an unstoppable conflagration is the archetype for a town consumed by fire.",
        "excerpt": "Oh, the miserable and calamitous spectacle! such as haply the world had not seen since the foundation of it, nor can be outdone till the universal conflagration thereof. All the sky was of a fiery aspect, like the top of a burning oven, and the light seen above forty miles round about for many nights. God grant mine eyes may never behold the like, who now saw above 10,000 houses all in one flame! The noise and cracking and thunder of the impetuous flames, the shrieking of women and children, the hurry of people, the fall of towers, houses, and churches, was like a hideous storm; and the air all about so hot and inflamed, that at the last one was not able to approach it, so that they were forced to stand still, and let the flames burn on, which they did, for near two miles in length and one in breadth.",
        "source": "John Evelyn, The Diary of John Evelyn, entry for 3 September 1666 (Great Fire of London), ed. William Bray, Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/42081/pg42081.txt",
        "image": {
          "src": "/covers/norway-drammen-fire-homes-destroyed--a0.png",
          "alt": "The Great Fire of London, c.1675, unknown artist, showing the city ablaze along the Thames with Old St Paul's in flames",
          "credit": "The Great Fire of London (c.1675), unknown artist, Museum of London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Ålesund town fire of 23 January 1904, the greatest urban conflagration in modern Norwegian history. Beginning in a single factory in the small hours, the fire raced through a town built almost entirely of tightly packed timber and burned nearly the whole centre in a night, destroying some 850 houses and leaving around 10,000 people homeless in bitter winter. Like the families driven out near Drammen, the population fled into the cold as their wooden homes vanished. It is the closest Norwegian precedent for a community that loses its houses in a single, wind-driven blaze.",
        "excerpt": "The fire broke out around two in the morning on the island of Aspøya and, fanned by a strong storm wind, tore through streets of closely built wooden houses that were the norm in Norwegian towns of the day. By the time it was subdued almost the entire town centre was gone, with roughly 850 buildings destroyed and only about 230 houses left standing within the town borders. Nearly the whole population was driven out into a freezing January night, and international aid, much of it sent in the name of Kaiser Wilhelm II, poured in to shelter the homeless.",
        "source": "\"Ålesund fire\" (23 January 1904), Wikipedia, and Life in Norway, \"The Story of the Ålesund Fire of 1904.\"",
        "href": "https://en.wikipedia.org/wiki/%C3%85lesund_fire"
      },
      {
        "category": "literary",
        "title": "The burning of Troy in Book 2 of Virgil's Aeneid, in John Dryden's translation. Aeneas describes the flames leaping from house to house across the doomed city, the palace of Deiphobus collapsing in smoke and his neighbour Ucalegon's home catching next, until the very sea glows with the light of a burning town. It is Western literature's founding image of a settlement consumed by an uncontrollable fire while its people flee into the night, an ancient mirror of the flames spreading through homes and forest near Drammen.",
        "excerpt": "Then Hector’s faith was manifestly clear’d,\nAnd Grecian frauds in open light appear’d.\nThe palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light.\nNew clamours and new clangours now arise,\nThe sound of trumpets mix’d with fighting cries.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden, Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "Samuel Pepys's diary account of the Great Fire of London, 2 September 1666. Pepys, out on the Thames, watches ordinary people cling to their houses until the flames touch them and then scramble into boats, while even the pigeons refuse to abandon their homes until their wings burn. His close, human-scaled record of a community losing its dwellings to fire, and of the reluctance to flee, echoes the hundreds forced to evacuate the burning townhouses near Drammen.",
        "excerpt": "poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for 2 September 1666, Project Gutenberg (Volume 45: August/September 1666).",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt"
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner's oil painting The Burning of the Houses of Lords and Commons, 16 October 1834 (Cleveland Museum of Art version). Turner rushed to the Thames to witness the Houses of Parliament ablaze and rendered the fire as a towering wall of orange and white heat that dissolves stone into pure light, with tiny crowds gathered helpless before it. The canvas captures the sublime terror of a great building consumed by fire, the same overwhelming scale of flame that turned a townhouse near Drammen into the ruin of a hundred homes.",
        "excerpt": "A vast furnace of yellow-white flame erupts against the night sky, its light smeared across the river and reflected in the water below. Against that inferno the crowds and boats are reduced to dark specks, powerless spectators to a fire that has swallowed a whole seat of government. Turner turns catastrophe into a spectacle of raw, uncontainable heat.",
        "source": "Joseph Mallord William Turner, The Burning of the Houses of Lords and Commons, 16 October 1834, oil on canvas, 1835, Cleveland Museum of Art (acc. 1942.647).",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_16_October_1834_-_1942.647_-_Cleveland_Museum_of_Art.jpg",
        "image": {
          "src": "/covers/norway-drammen-fire-homes-destroyed--a4.png",
          "alt": "Turner's painting of the Houses of Parliament engulfed in a towering blaze of white and orange flame reflected on the Thames",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835), Cleveland Museum of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Great Fire of London, an anonymous oil painting of about 1675 held by the Museum of London. Painted within a decade of the disaster, it shows the city as a continuous curtain of flame stretching along the north bank of the Thames, with Old St Paul's and the medieval churches burning and the river crowded with fleeing boats. The panorama makes vivid what a wind-driven fire does to a town of packed houses, the very scene that unfolded as flames swept from home to home and into the forests near Drammen.",
        "excerpt": "The whole waterfront of the city is shown as one unbroken band of fire, throwing an angry glow over the Thames as smoke boils into a darkened sky. Old St Paul's and a skyline of church towers stand silhouetted against the flames, while the river fills with small boats carrying people and their salvaged belongings away from the burning shore. It is a portrait of an entire town on fire and a population in flight.",
        "source": "Unknown artist, The Great Fire of London, oil on panel, c.1675, Museum of London.",
        "href": "https://commons.wikimedia.org/wiki/File:Great_Fire_London.jpg",
        "image": {
          "src": "/covers/norway-drammen-fire-homes-destroyed--a5.png",
          "alt": "Anonymous c.1675 painting of the Great Fire of London: a wall of flame along the Thames with Old St Paul's burning and boats fleeing",
          "credit": "The Great Fire of London (c.1675), unknown artist, Museum of London. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "us-ends-endangered-species-blanket-protections",
    "headline": "The U.S. cancels automatic Endangered Species Act protections for newly listed threatened animals and plants",
    "overview": "The Interior Department rescinded a decades-old rule that automatically extended full protections to species listed as threatened, so newly listed plants and animals will instead require individual protection plans. Officials said the change adds flexibility for development, while critics warned it could speed extinctions and open habitat to drilling and mining. The blanket-protection rules dated to 1975 for wildlife and 1977 for plants.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxNamFyb3ZPb1RDQmxFdVN3SVRkRjVZcU9Fa1A1V2ZEdlQzZ2dnM0I0WXFLc3I4UjNab0c5Sm1vWWpzelZncnhWb1dNa1RZazJVSXUzRzducXJTWjVKT2JzNldOalktZTBFSmktQnl5d192MHExN0N6d2g0aEtrcUFsa2s5WDNTN2pmNmRzYkVyOG5LZFM3VVZXUzVFRQ?oc=5"
      },
      {
        "name": "The Philadelphia Inquirer",
        "href": "https://www.inquirer.com/news/nation-world/trump-strips-endangered-species-automatic-protection-habitat-loss-deelopment-mining-drilling-20260717.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/us-ends-endangered-species-blanket-protections.png",
      "alt": "A monarch butterfly resting on a flower.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the last passenger pigeon died in the Cincinnati Zoo on September 1, 1914, the United States witnessed the deliberate erasure of what had been the most abundant bird on the continent. Flocks once numbering in the billions had darkened the sky for hours as they passed, yet within a single human lifetime market hunting and the destruction of nesting forests reduced them to a single caged bird named Martha. Her death was among the first extinctions of a species that Americans could watch unfold in real time and know they had caused. The rollback of automatic protections for newly listed threatened species revives exactly the logic that killed her: that a creature abundant or inconvenient today can be surrendered to profit before anyone moves to save it.",
        "excerpt": "Martha, the last passenger pigeon, died alone in her enclosure at the Cincinnati Zoo in 1914, the terminal survivor of a species that had once been counted in the billions. Her body was packed in ice and shipped to the Smithsonian, where it stands mounted still as a warning. She became the emblem of a truth the nation learned too late: that even the most numberless of wild things can be driven to nothing by human hands.",
        "source": "Martha (passenger pigeon), the last of Ectopistes migratorius, died at the Cincinnati Zoological Garden, September 1, 1914.",
        "href": "https://en.wikipedia.org/wiki/Martha_(passenger_pigeon)"
      },
      {
        "category": "historical",
        "title": "On the rocky islet of Eldey off Iceland's coast, on the third of June 1844, fishermen strangled the last breeding pair of great auks and, in the scramble, crushed their single egg beneath a boot. The flightless seabird had ranged across the North Atlantic in vast numbers, but centuries of harvesting for meat, feathers, and finally collectors' cabinets ground it down until a handful remained, and then none. That final act, killing the last two known individuals of a species to sell their skins, distills the choice between profit and stewardship into a single scene. Rescinding the reflex to protect a species the moment it is recognized as imperiled is a modern version of that indifference, betting that extinction can wait while extraction proceeds.",
        "excerpt": "The last confirmed great auks were killed on Eldey on 3 June 1844, taken on the order of a merchant who wanted their skins; as the men seized the incubating pair, the egg the female had been warming was trampled and broken. With that, a bird that had lived across the North Atlantic for ages was gone from the earth entirely. No living person has ever seen another.",
        "source": "The extinction of the great auk (Pinguinus impennis); last pair killed at Eldey, Iceland, June 1844.",
        "href": "https://en.wikipedia.org/wiki/Great_auk"
      },
      {
        "category": "literary",
        "title": "The King James Bible frames humanity's relationship to the living world in a language that has echoed through every debate about conservation since. In Genesis, the dominion granted over the fish, the fowl, and every moving thing is set beside the charge, in the garden, to dress it and to keep it, guardianship rather than plunder. Read together, the verses hold the very tension at the heart of this event: whether dominion means the right to open habitat to drilling and mining, or the duty to tend and preserve what lives. Stripping away automatic protection for threatened creatures answers that ancient question in favor of subduing the earth and against keeping it.",
        "excerpt": "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth.\n\nAnd the LORD God took the man, and put him into the garden of Eden to dress it and to keep it.",
        "source": "The Holy Bible, King James Version (1611), Genesis 1:28 and Genesis 2:15.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Gerard Manley Hopkins wrote \"Inversnaid\" in 1881 after standing beside a wild Scottish burn, and closed it with a plea that has become a rallying cry for those who defend the untamed world. The poem gathers the fern, the foam, the dew-dappled banks into a hymn of praise for wildness itself, then asks what the world would become if it were stripped of its wet and its wildness. Its final line, \"Long live the weeds and the wilderness yet,\" answers the utilitarian view that nature exists only to be tamed and used. Against a policy that would open threatened creatures' habitat to the drill and the mine, Hopkins insists that wildness deserves to survive for its own sake.",
        "excerpt": "Degged with dew, dappled with dew\nAre the groins of the braes that the brook treads through,\nWiry heathpacks, flitches of fern,\nAnd the beadbonny ash that sits over the burn.\n\nWhat would the world be, once bereft\nOf wet and of wildness? Let them be left,\nO let them be left, wildness and wet;\nLong live the weeds and the wilderness yet.",
        "source": "Gerard Manley Hopkins, \"Inversnaid\" (1881), in Poems of Gerard Manley Hopkins (London: Humphrey Milford, 1918).",
        "href": "https://en.wikisource.org/wiki/Poems_of_Gerard_Manley_Hopkins/Inversnaid"
      },
      {
        "category": "artistic",
        "title": "John James Audubon's hand-colored aquatint of the passenger pigeon, Plate LXII of The Birds of America (engraved by Robert Havell in the 1830s), shows a male and female perched on a branch, the lower bird tenderly reaching up to touch the other's bill. Audubon had witnessed flocks so immense they blotted out the sun for days, and painted the bird at the height of its abundance, never imagining it would vanish within a century. Today the plate is less a portrait than a memorial, a species preserved only in pigment because it was not preserved in life. It stands as a visual reminder of what is lost when the impulse to protect a creature is postponed until it is gone.",
        "excerpt": "Two passenger pigeons face each other on a slender branch against a bare ground, the male's iridescent breast catching a coppery light while the female bends near as if in conversation. Audubon renders every feather with the exactness of a naturalist and the tenderness of a mourner, though he could not yet know he was recording a doomed species. The image now carries the weight of an epitaph: the most numerous bird in North America, alive only on paper.",
        "source": "John James Audubon, \"Passenger Pigeon,\" The Birds of America, Plate LXII (Havell edition, 1827-1838). Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:62_Passenger_Pigeon.jpg",
        "image": {
          "src": "/covers/us-ends-endangered-species-blanket-protections--a4.png",
          "alt": "Audubon's hand-colored plate of two passenger pigeons perched on a branch, one reaching to touch the other's bill",
          "credit": "John James Audubon, The Birds of America, Plate LXII (Passenger Pigeon). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Audubon's plate of the Carolina Parrot, Plate XXVI of The Birds of America, is a riot of green and gold: seven parakeets clustered on a cocklebur stalk, the only parrot native to the eastern United States. Farmers shot the flocks as pests, plume hunters took them for hats, and their fatal loyalty, wheeling back to hover over their fallen companions, let gunmen destroy whole flocks at a stand; the last known bird died in the Cincinnati Zoo in 1918. Audubon's brilliant image is now the fullest record of a creature that human indifference erased. Its beauty accuses the calculus that trades living species for short-term gain, the very trade renewed by abandoning automatic protection for those newly found at risk.",
        "excerpt": "Seven Carolina parakeets crowd a single seeding stalk in Audubon's plate, their emerald bodies and yellow-orange heads twisting in every direction, wings spread to reveal patterns the living bird rarely showed. The composition teems with life, yet not one of these birds' kind survives; the species was gone within a lifetime of the painting. What Audubon meant as celebration now reads as elegy for a color that has vanished from the American landscape.",
        "source": "John James Audubon, \"Carolina Parrot,\" The Birds of America, Plate XXVI (Havell edition, 1827-1838). Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:AudubonCarolinaParakeet2.jpg",
        "image": {
          "src": "/covers/us-ends-endangered-species-blanket-protections--a5.png",
          "alt": "Audubon's hand-colored plate of seven Carolina parakeets, green with yellow-orange heads, clustered on a cocklebur stalk",
          "credit": "John James Audubon, The Birds of America, Plate XXVI (Carolina Parrot). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "gamestop-ebay-stake-disclosure",
    "headline": "GameStop discloses a nearly 10% stake in eBay, months after its $56 billion bid to buy the company",
    "overview": "GameStop said in a regulatory filing that it now owns about 43.4 million eBay shares, or 9.8%, roughly three months after making an unsolicited bid of about $56 billion to acquire the online marketplace. The video-game retailer, led by chairman Ryan Cohen, has sharply increased its holding from an earlier 5% economic stake. eBay's board has not accepted the takeover proposal.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQVXdDS1FEendUOG1hQnlkMXZaNHNUUkxmRTJwUWYyMHByZ2VFdjR2Q2VUdEQzQTdzTXhrejdLTWVZNU03d3poeVZIZWViSkJZbUpBeW8tZFlBQUszYlJsSHU2b3psZV9GTC01VEdSOGtuMXpSWF9ERjROQTlMNVFUdXlaUk1mcjBRRHJqby1STFd0UHJiMlRn?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/stock-market-news/gamestop-owns-nearly-10-of-ebay-sec-filing-shows-4799464"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/gamestop-ebay-stake-disclosure.png",
      "alt": "A GameStop retail storefront sign.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Northern Pacific Corner of 1901, when railroad outsider E. H. Harriman, bankrolled by Jacob Schiff's Kuhn, Loeb & Co. and Standard Oil money, quietly bought up shares of the Northern Pacific Railway to wrest it from the entrenched J. P. Morgan and James J. Hill. Just as GameStop's Ryan Cohen has accumulated a near-10% stake in eBay to force a deal on a far larger rival, Harriman's stealthy accumulation aimed to seize a corporation from the men who thought they controlled it. The hidden buying cornered the stock so completely that panicked short sellers drove Northern Pacific shares toward $1,000 on May 9, 1901, triggering a market panic. Only a truce between the moguls, and the creation of the Northern Securities holding company, ended the fight.",
        "excerpt": "Backed by Jacob Schiff's Kuhn, Loeb & Co. and financed with Standard Oil money, E. H. Harriman tried to seize control of the Northern Pacific Railway from the Morgan-Hill faction by aggressively and secretly buying its stock. When the corner became apparent, shorts who had sold shares they did not own scrambled to cover, driving Northern Pacific common from around $150 to an intraday $1,000 within an hour on May 9, 1901, while the rest of the market collapsed in panic and thousands of small investors were ruined.",
        "source": "\"Panic of 1901,\" Wikipedia, on the Northern Pacific corner between E. H. Harriman (Kuhn, Loeb & Co.) and the J. P. Morgan / James J. Hill interests.",
        "href": "https://en.wikipedia.org/wiki/Panic_of_1901",
        "image": {
          "src": "/covers/gamestop-ebay-stake-disclosure--a0.png",
          "alt": "Photographic portrait of railroad magnate Edward H. Harriman (1848-1909), who secretly bought Northern Pacific stock in the 1901 corner.",
          "credit": "George Grantham Bain Collection, Library of Congress (no known copyright restrictions), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The 1988 battle for RJR Nabisco, the defining hostile takeover of the 1980s corporate-raider era, in which Kohlberg Kravis Roberts & Co. launched an unsolicited tender offer to swallow the food-and-tobacco giant in what was then the largest buyout in history. As GameStop, a company dwarfed by eBay, mounts a bold multibillion-dollar reach for a bigger rival, the RJR fight showed how an aggressive suitor could pursue a colossus far larger than itself. Rival bids escalated from $75 to $90 to $112 a share as management and raiders warred for control. Chronicled in 'Barbarians at the Gate,' it became the emblem of Wall Street's audacious, debt-fueled appetite for seizing whole companies.",
        "excerpt": "In October and November 1988 Kohlberg Kravis Roberts & Co. and RJR Nabisco's own management waged an escalating bidding war for the conglomerate, offers climbing from $75 to $90 to $112 per share. KKR's roughly $25 billion victory made it the largest leveraged buyout in history to that point, the emblem of an era in which raiders and financiers, armed with borrowed money, reached to swallow companies many times their own size.",
        "source": "\"RJR Nabisco,\" Wikipedia, on the 1988 leveraged buyout by Kohlberg Kravis Roberts & Co.; popularized in Bryan Burrough and John Helyar, Barbarians at the Gate (1989).",
        "href": "https://en.wikipedia.org/wiki/RJR_Nabisco"
      },
      {
        "category": "literary",
        "title": "Shakespeare's 'The Merchant of Venice' (c. 1596-98), in which the moneylender Shylock advances three thousand ducats to the merchant Antonio but binds the loan with a startling forfeit: a pound of Antonio's own flesh should the debt go unpaid. The scene captures a bargainer who lends and accumulates in pursuit of a larger claim, much as GameStop builds a stake in eBay as leverage over the company it seeks to acquire. What is framed as 'merry sport' is in truth a hard-edged wager on another's ruin. Antonio, over-confident like any target sure a hostile suitor cannot prevail, seals the dangerous bond.",
        "excerpt": "Shy. This kindnesse will I showe,\nGoe with me to a Notarie, seale me there\nYour single bond, and in a merrie sport\nIf you repaie me not on such a day,\nIn such a place, such sum or sums as are\nExprest in the condition, let the forfeite\nBe nominated for an equall pound\nOf your faire flesh, to be cut off and taken\nIn what part of your bodie it pleaseth me",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 3 (First Folio text). Project Gutenberg eBook #2243.",
        "href": "https://www.gutenberg.org/cache/epub/2243/pg2243-images.html"
      },
      {
        "category": "literary",
        "title": "Shakespeare's 'Macbeth' (c. 1606), whose soldier-hero reaches beyond his station to seize a crown that is not his, driven by an ambition he himself confesses has no honest justification. Pausing before the deed, Macbeth admits he has no spur but 'vaulting ambition' that overleaps itself and falls, a warning about grasping for more than one holds. The image resonates with a smaller company vaulting toward a rival many times its size, betting boldly on a prize beyond easy reach. Shakespeare frames overreach not as triumph but as a leap that risks the fall on the far side.",
        "excerpt": "I have no spur\nTo prick the sides of my intent, but only\nVaulting ambition, which o’erleaps itself\nAnd falls on th’ other—",
        "source": "William Shakespeare, Macbeth, Act I, Scene 7. Project Gutenberg eBook #1533.",
        "href": "https://www.gutenberg.org/cache/epub/1533/pg1533-images.html"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys's oil panel 'The Moneylender and His Wife' (1514), a Northern Renaissance portrait of a Flemish banker weighing gold coins on his scales while his wife, a devotional book open before her, is drawn away toward the glint of money. The painting is a meditation on merchant capital and the seductive pull of accumulation, the same acquisitive impulse behind a bidder amassing shares to buy up a marketplace. Matsys renders every ducat, ring, and pearl with cold precision, making wealth itself the picture's true subject. Now in the Louvre, it remains one of art's sharpest images of the money trade.",
        "excerpt": "Behind his careful scales the moneylender counts and weighs gold coins, pearls and rings heaped on the table, while his wife's fingers pause over a prayer book, her gaze pulled from devotion to the money. A convex mirror in the foreground catches a tiny reflected window and a distant figure, folding the whole outside world into the merchant's cramped counting-room. Matsys makes commerce and calculation, the accumulation of value for its own sake, the moral center of the scene.",
        "source": "Quentin Matsys (Quinten Metsys), The Moneylender and His Wife, 1514, oil on panel, Musee du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/gamestop-ebay-stake-disclosure--a4.png",
          "alt": "Quentin Matsys's 1514 painting The Moneylender and His Wife: a banker weighs gold coins on a scale while his wife looks on.",
          "credit": "Quentin Matsys, The Moneylender and His Wife (1514), Musee du Louvre; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Udo Keppler's 1904 chromolithograph 'Next!', published in Puck, which draws the Standard Oil monopoly as a vast octopus, its tentacles wrapped around statehouses, the steel and copper industries, and Congress, with one arm reaching for the White House. The cartoon is the classic image of a single entity swallowing markets and grasping ever outward, a fitting visual for a challenger accumulating a stake to seize a larger rival. Where Keppler's octopus embodies the fear of unchecked corporate appetite, GameStop's reach for eBay evokes the same drama of one enterprise stretching to engulf another. It remains America's defining cartoon of monopoly ambition.",
        "excerpt": "A Standard Oil storage tank becomes a monstrous octopus, its tentacles coiled around the copper, steel and shipping industries and around a state capitol and the United States Congress, while one last arm gropes hungrily toward the White House. Published eight weeks before the 1904 election amid Ida Tarbell's exposes, the image renders corporate appetite as an all-devouring creature reaching for whatever it can seize. The single word 'Next!' warns that no institution is beyond its grasp.",
        "source": "Udo J. Keppler, \"Next!\", chromolithograph, Puck, September 7, 1904 (J. Ottmann Lith. Co.). Library of Congress, LC-DIG-ppmsca-25884.",
        "href": "https://www.loc.gov/pictures/item/2001695241/",
        "image": {
          "src": "/covers/gamestop-ebay-stake-disclosure--a5.png",
          "alt": "Udo Keppler's 1904 Puck cartoon 'Next!' depicting Standard Oil as an octopus with tentacles around industries, Congress, and reaching for the White House.",
          "credit": "Udo J. Keppler, \"Next!\", Puck, 1904; Library of Congress (no known restrictions), via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "japan-flag-desecration-law",
    "headline": "Japan enacts a law criminalising desecration of its national flag, alarming artists and museums",
    "overview": "Japan enacted a law that punishes defiling or damaging the national flag, the hinomaru, with up to two years in prison or a fine of up to 200,000 yen. Artists, critics and museums warned that the vaguely worded measure could chill art, protest and other expression that uses the flag. Supporters in Prime Minister Sanae Takaichi's government cast it as a defence of a national symbol.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/japans-new-flag-desecration-law-raises-alarm-for-artists-1234755073/"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/17/japan-passes-legislation-banning-violation-of-national-flag"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/japan-flag-desecration-law.png",
      "alt": "The red-and-white national flag of Japan, the hinomaru.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In Texas v. Johnson (1989) the U.S. Supreme Court confronted almost exactly the question Japan now revives: may the state punish a citizen for defiling the national flag? Gregory Lee Johnson had burned an American flag outside the 1984 Republican convention and was convicted under a Texas desecration statute. By a 5-4 vote the Court struck the law down, holding that flag burning was expressive conduct protected by the First Amendment. Justice Brennan warned that a government cannot cure the offense a symbol's misuse causes by criminalising it, and that punishing desecration hollows out the very freedom the flag stands for.",
        "excerpt": "If there is a bedrock principle underlying the First Amendment, it is that the government may not prohibit the expression of an idea simply because society finds the idea itself offensive or disagreeable.\nWe do not consecrate the flag by punishing its desecration, for in doing so we dilute the freedom that this cherished emblem represents.",
        "source": "Texas v. Johnson, 491 U.S. 397 (1989), Opinion of the Court by Justice William J. Brennan Jr.",
        "href": "https://en.wikisource.org/wiki/Texas_v._Johnson/Opinion_of_the_Court"
      },
      {
        "category": "historical",
        "title": "West Virginia State Board of Education v. Barnette (1943) tested the flip side of Japan's law, the compelled reverence it implicitly demands. In wartime America, Jehovah's Witness children were expelled for refusing to salute the flag and recite the pledge, a ritual the state made mandatory. The Supreme Court reversed course from an earlier ruling and held that the government may not force citizens to venerate a national symbol against their conscience. Justice Robert Jackson's opinion set a limit on official orthodoxy that speaks directly to a statute policing how the hinomaru may be treated.",
        "excerpt": "If there is any fixed star in our constitutional constellation, it is that no official, high or petty, can prescribe what shall be orthodox in politics, nationalism, religion, or other matters of opinion or force citizens to confess by word or act their faith therein.",
        "source": "West Virginia State Board of Education v. Barnette, 319 U.S. 624 (1943), Opinion of the Court by Justice Robert H. Jackson.",
        "href": "https://en.wikisource.org/wiki/West_Virginia_State_Board_of_Education_v._Barnette/Opinion_of_the_Court"
      },
      {
        "category": "literary",
        "title": "Sophocles' Antigone, staged in Athens around 441 BC, is the founding drama of conscience against the state's decree. King Creon has forbidden the burial of Antigone's brother on pain of death, elevating a civic order into a sacred command; Antigone defies it and buries him anyway. Hauled before Creon, she answers that his edict cannot override the unwritten, eternal laws that no ruler authored and none can repeal. Her defense is the ancestor of every artist and citizen who insists that a state's proclamation about a symbol does not bind the conscience, the very fear Japan's museums now voice.",
        "excerpt": "it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods. For their life is not of today or yesterday, but for all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone, trans. F. Storr (Loeb Classical Library, 1912), lines 450-457, Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "John Milton's Areopagitica (1644) is the great English argument against a state's power to license and suppress expression, written to protest Parliament's order that books be approved before printing. Milton insists that to kill a book is a kind of killing, an assault on living reason itself, and that a free people must be trusted to encounter dangerous ideas. His polemic is the direct forebear of the free-expression principles now invoked against Japan's vague desecration law, which artists fear will license officials to decide in advance what use of the flag is permissible.",
        "excerpt": "as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica: A Speech for the Liberty of Unlicensed Printing (1644), Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/cache/epub/608/pg608.txt"
      },
      {
        "category": "artistic",
        "title": "Childe Hassam's The Avenue in the Rain (1917) shows Fifth Avenue in New York dissolved into a shimmer of rain and reflected Stars and Stripes, painted as America prepared to enter the First World War. It is one of some thirty flag pictures Hassam made in these years, treating the national banner as a subject for beauty and impressionist experiment rather than as untouchable state property. Now hanging in the White House, it demonstrates how central the flag has been to serious art, precisely the creative freedom Japanese painters and museums fear a desecration statute would criminalise the moment an artist bends or reinterprets the hinomaru.",
        "excerpt": "A rain-soaked Fifth Avenue melts into vertical strokes of grey and blue, while rows of American flags blaze red and white above the crowd and smear into liquid reflections on the wet pavement below. Hassam treats the flag not as a fixed icon but as living, mutable colour, dignified yet freely transformed by the artist's eye, the very license a desecration law would place under threat.",
        "source": "Childe Hassam, The Avenue in the Rain, 1917, oil on canvas, The White House collection, Washington, D.C.",
        "href": "https://en.wikipedia.org/wiki/The_Avenue_in_the_Rain",
        "image": {
          "src": "/covers/japan-flag-desecration-law--a4.png",
          "alt": "Childe Hassam's 1917 painting The Avenue in the Rain, showing rain-blurred American flags lining Fifth Avenue and reflected on the wet street",
          "credit": "Childe Hassam, The Avenue in the Rain (1917), The White House collection. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In January 1944, Igor Stravinsky conducted his own reharmonisation of The Star-Spangled Banner in Boston, adding an unexpected dominant-seventh chord that he said was meant to honour the religious feeling of the American people. A Massachusetts statute forbade any 'tampering' with or embellishment of the national anthem, and a police official warned him that a repeat performance could bring a one-hundred-dollar fine. Stravinsky quietly withdrew his arrangement, a reverent artistic gesture recast as a punishable offense against a sacred national symbol, exactly the chilling dynamic Japanese artists foresee when a vaguely worded law lets the state decide that altering the flag is a crime.",
        "excerpt": "Stravinsky's setting keeps the familiar melody but slips a lush, unresolved dominant-seventh chord beneath the words 'land of the free,' turning the martial anthem into something closer to a hymn. What the composer intended as an act of reverence the state treated as forbidden embellishment of a protected national symbol, an artist's respectful reinterpretation collapsed into a policeable transgression.",
        "source": "Igor Stravinsky, arrangement of The Star-Spangled Banner (1941), and the 1944 Boston police warning under Massachusetts' anthem-tampering law; see The First Amendment Encyclopedia, 'National Anthem, Government Regulation.'",
        "href": "https://firstamendment.mtsu.edu/article/national-anthem-government-regulation/",
        "image": {
          "src": "/covers/japan-flag-desecration-law--a5.png",
          "alt": "The original Star-Spangled Banner, the 1814 garrison flag from Fort McHenry, on display at the Smithsonian",
          "credit": "The Star-Spangled Banner flag on display at the Smithsonian, c. 1964. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "british-museum-palestine-labels-probe",
    "headline": "British politicians call for an investigation into the removal of the word 'Palestine' from British Museum labels",
    "overview": "Cross-party MPs demanded an independent investigation into the British Museum's removal of terms including 'Palestine' from object labels, citing fears of political interference and misleading statements by the institution. Internal emails reported by Middle East Eye showed months of lobbying to change the labels, and the museum acknowledged it had not carried out the 'audience testing' it had earlier cited. The museum denies bowing to pressure.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/politicians-call-for-investigation-at-british-museum-1234755037/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/news/uk-politicians-call-for-investigation-of-british-museums-removal-of-palestine-from-display-1234792435/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/british-museum-palestine-labels-probe.png",
      "alt": "The neoclassical facade and columns of the British Museum in London.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In fifteenth-century-BCE Egypt the pharaoh Hatshepsut ruled for two decades, only to have her images and cartouches systematically chiselled from the walls of her mortuary temple at Deir el-Bahari during the reign of her successor Thutmose III. Masons hacked her figure out of the stone and plastered over her royal name, attempting to write a woman king out of the official record and out of the line of succession. Like the British Museum's quiet removal of the word 'Palestine' from its labels, the erasure was less an act of forgetting than of authoring an approved past. And, as with Hatshepsut, whose buried statues were later dug up and reassembled, the scars of the deletion remain visible, testifying to the very thing they were meant to hide.",
        "excerpt": "On the wall of the Anubis shrine at Deir el-Bahari, the gods Horus and Thoth are shown pouring sacred water over the pharaoh, but the pharaoh herself has been hacked from the stone, her figure and cartouche reduced to a rough scar. Thutmose III's masons left the ritual intact while excising the woman king it once honoured, editing the sacred record to erase a reign. The blow marks are still legible, so that the attempt to obliterate Hatshepsut instead memorialises the act of obliteration.",
        "source": "Relief of Horus and Thoth purifying Hatshepsut, with the queen's figure deliberately chiselled away under Thutmose III, Anubis shrine, Mortuary Temple of Hatshepsut, Deir el-Bahari, Egypt, c. 1479-1425 BCE.",
        "href": "https://commons.wikimedia.org/wiki/File:Horus_and_Thot_purifying_Hatshepsut_(chiseled_away_by_her_stepson_Thutmose_III)..._(36101001330).jpg",
        "image": {
          "src": "/covers/british-museum-palestine-labels-probe--a0.png",
          "alt": "Ancient Egyptian relief in which the figure of the pharaoh Hatshepsut has been deliberately chiselled away, leaving a rough blank where she once stood between two gods.",
          "credit": "Relief of Hatshepsut chiselled away, Mortuary Temple at Deir el-Bahari. Photo: Bernard DUPONT / Wikimedia Commons (CC BY-SA 2.0)."
        }
      },
      {
        "category": "historical",
        "title": "During Stalin's Great Purge the secret-police chief Nikolai Yezhov was photographed strolling at the leader's side beside the Volga-Don Canal; after Yezhov himself was arrested and shot in 1940, censors airbrushed him out of the official picture, leaving Stalin walking next to an empty stretch of water. It was bureaucratic erasure as statecraft, the photographic archive continuously rewritten so that the visible past matched the approved present. The British Museum's removal of 'Palestine' from its labels belongs to the same family of gestures, an institution editing the record it is trusted to keep. What the Soviet retouchers did with an airbrush, a wall text can do with a deletion.",
        "excerpt": "Two versions of the same 1937 snapshot survive: in the first, the NKVD chief Nikolai Yezhov walks beside Stalin along the Volga-Don Canal; in the second, made after Yezhov's own execution, he is gone, replaced by a seamless stretch of empty water. Soviet retouchers airbrushed the fallen official out of the photographic record so thoroughly that a casual viewer would never suspect a man had once stood there. The doctored image is the visual grammar of erasure, removing not merely a name but a person from history.",
        "source": "Retouched Soviet photograph of Stalin and Molotov beside the Volga-Don Canal, from which the disgraced NKVD chief Nikolai Yezhov was airbrushed following his 1940 execution; original c. 1937.",
        "href": "https://commons.wikimedia.org/wiki/File:Stalin_and_Molotov_along_the_Volga%E2%80%93Don_Canal,_Nikolai_Yezhov_removed.jpg",
        "image": {
          "src": "/covers/british-museum-palestine-labels-probe--a1.png",
          "alt": "Retouched Soviet photograph of Stalin and Molotov walking by a canal, with the space where Nikolai Yezhov once stood painted over with water.",
          "credit": "Retouched Soviet photograph with Nikolai Yezhov removed, c. 1940. Unknown author / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Shelley's 1818 sonnet 'Ozymandias' imagines a traveller who finds, half-buried in the desert, the shattered statue of a forgotten king whose pedestal still boasts 'My name is Ozymandias, King of Kings.' The colossus meant to broadcast that name forever now testifies only to its vanishing, the surrounding sands 'boundless and bare.' The poem is a meditation on how power tries to fix its own version of history in stone, and on how names are made and unmade over time. It speaks directly to a quarrel over whether the word 'Palestine' should stand or be scrubbed from a museum's labels, and over who gets to decide what a name on a monument is allowed to mean.",
        "excerpt": "I met a Traveller from an antique land,\nWho said, \"Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n\"My name is Ozymandias, King of Kings.\"\nLook on my works ye Mighty, and despair!\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" first published in The Examiner (London), 11 January 1818.",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "In George Orwell's Nineteen Eighty-Four the Party teaches that 'Who controls the past controls the future,' and Winston Smith spends his days at the Ministry of Truth feeding inconvenient facts down the 'memory hole' to be incinerated. A name can be deleted, a person turned into an 'unperson,' a whole country's history rewritten between editions of the record. The novel dramatises precisely the fear voiced by MPs over the British Museum: that a trusted keeper of the record might quietly edit what it displays, removing a word like 'Palestine' and, with it, a claim on collective memory. Orwell's warning is that erasing the label is a way of erasing the thing itself.",
        "excerpt": "In Orwell's Nineteen Eighty-Four, Winston Smith works at the Ministry of Truth rewriting old newspapers so that the past always agrees with the Party's present. Inconvenient names, unpersons, and retracted predictions are dropped into the 'memory hole', a pneumatic chute that carries them to a furnace, leaving no trace that they ever existed. The novel's chilling premise is that whoever controls the record controls reality itself, so that to delete a word is to unmake a fact.",
        "source": "George Orwell, Nineteen Eighty-Four (London: Secker & Warburg, 1949).",
        "href": "https://gutenberg.net.au/ebooks01/0100021h.html"
      },
      {
        "category": "artistic",
        "title": "The Severan Tondo, a rare painted portrait from around 200 CE now in Berlin's Antikensammlung, shows the emperor Septimius Severus with his wife Julia Domna and their two young sons in gilded family unity, except that the face of the younger boy, Geta, has been violently scrubbed away. After Caracalla murdered his brother and imposed a formal damnatio memoriae, Geta's image was gouged out of the panel and his name banned across the empire. The tondo is the ancient world's most vivid surviving picture of official erasure, and an uncanny mirror for a modern museum accused of removing a name from its own displays. That the deletion is so plainly visible only underscores how erasure tends to advertise the very thing it tries to hide.",
        "excerpt": "Painted on a circular wooden panel around 200 CE, the tondo shows the imperial family, Septimius Severus, Julia Domna, and their two sons, posed in gilded harmony. Where the boy Geta's face should be there is now only a smeared brown void, gouged out and daubed over after his brother Caracalla had him murdered and his memory formally condemned. The surviving neck and shoulders make the deletion unmistakable: the picture preserves, in negative, the very person it was ordered to forget.",
        "source": "The Severan Tondo (Berlin Tondo), tempera on wood, c. 199-200 CE, Antikensammlung, Berlin; the face of Geta erased following his damnatio memoriae.",
        "href": "https://commons.wikimedia.org/wiki/File:Tondo_showing_the_Severan_dynasty_Septimius_Severus_with_Julia_Domna,_Caracalla_and_Geta,_whose_face_has_been_erased,_probably_because_of_the_damnatio_memoriae_put_against_him_by_Caracalla,_from_Djemila_(Algeria),_circa_AD_199-200.jpg",
        "image": {
          "src": "/covers/british-museum-palestine-labels-probe--a4.png",
          "alt": "Painted Roman family tondo in which the face of the young Geta has been deliberately scraped away, leaving a brown smear beside his parents and brother.",
          "credit": "The Severan Tondo, c. 199-200 CE, Antikensammlung, Berlin. Photo: Carole Raddato / Wikimedia Commons (CC BY-SA 2.0)."
        }
      },
      {
        "category": "artistic",
        "title": "Archibald Archer's 1819 painting 'The Temporary Elgin Room' shows the British Museum itself at a founding moment, its keepers, trustees and visitors arranged among the Parthenon marbles newly arrived from Athens. It is a self-portrait of the institution deciding how contested heritage should be seen, arranged, labelled and understood, the very power now in dispute. The canvas still belongs to the same museum that MPs accuse of quietly deleting the word 'Palestine' from its labels, making it a pointed image of who controls how history is displayed. Two centuries on, the argument has shifted from which marbles hang on the wall to which words are permitted on the card beside them.",
        "excerpt": "Archer's canvas depicts the crowded temporary gallery where the British Museum first displayed the Parthenon sculptures Lord Elgin had stripped from Athens, complete with trustees, keepers and admiring visitors. It is a portrait of a museum in the act of composing its own authority, deciding what is shown, how it is captioned, and whose story the marbles are made to tell. Two centuries later the same institution stands accused of quietly editing that story again, this time by deleting the word 'Palestine' from its labels.",
        "source": "Archibald Archer, The Temporary Elgin Room, 1819, oil on canvas, British Museum, London.",
        "href": "https://commons.wikimedia.org/wiki/File:Temporary_Elgin_Room_at_the_Museum_in_1819.jpg",
        "image": {
          "src": "/covers/british-museum-palestine-labels-probe--a5.png",
          "alt": "Nineteenth-century oil painting of a gallery in the British Museum, with visitors and staff seated among the displayed Parthenon (Elgin) marbles.",
          "credit": "Archibald Archer, The Temporary Elgin Room, 1819, British Museum. Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "us-hong-kong-emergency-lapse",
    "headline": "The U.S. lets its Hong Kong national-emergency declaration lapse, lifting some sanctions while Trump's 2020 order stays in place",
    "overview": "The Trump administration allowed a national emergency over Hong Kong, first declared in 2020, to expire, prompting the removal of some individuals from a U.S. sanctions blacklist. But Executive Order 13936, which revoked Hong Kong's special trading status, remains in effect, and top officials such as Chief Executive John Lee stay sanctioned under a separate law. The move follows recent U.S.-China trade talks.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNampFOXhtR1UzaFhtSDZYUW04LVpsYXBRcktvYmdFVHBtcm9FWDJWTzVxQlNnaGdHeDFEd1pWdW9QX0FoX01kVGRCYjR5dThBZXF3dWdCZllZUnMwbU5NSW9VQUN6d1VScGJQWC1TaUlVQ3J2Z3g0T0h6al9walYzTnliUXBZbVpRd0RZand4c0VMT250SVhlVFBEQ28wUQ?oc=5"
      },
      {
        "name": "Dim Sum Daily",
        "href": "https://www.dimsumdaily.hk/u-s-revises-hong-kong-sanctions-lists-after-executive-order-lapses/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/us-hong-kong-emergency-lapse.png",
      "alt": "The Hong Kong skyline and Victoria Harbour at dusk.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In March 1809, on his last days in office, Thomas Jefferson signed the Non-Intercourse Act, which quietly dismantled his own hated Embargo. The total ban on American shipping was repealed and the ports were reopened to the world, with one pointed exception: trade with Great Britain and France, the two great powers the embargo had been aimed at, stayed shut. Like Washington letting the Hong Kong emergency lapse while keeping Trump's core order and the top officials sanctioned, it was a partial retreat that eased the pressure on everyone but the principal targets. A sweeping instrument of economic coercion was allowed to expire, but its sharpest edge was deliberately preserved.",
        "excerpt": "That so much of the act laying an embargo on all ships and vessels in the ports and harbors of the United States, and of the several acts supplementary thereto, as forbids the departure of vessels owned by citizens of the United States, and the exportation of domestic and foreign merchandise to any foreign port or place, be, and the same is hereby repealed, after the fifteenth day of March, one thousand eight hundred and nine, except so far as they relate to Great Britain or France, or their colonies or dependencies, or places in the actual possession of either.",
        "source": "Non-Intercourse Act, 10th Congress, Sess. II, Ch. 24, Sec. 12 (approved March 1, 1809).",
        "href": "https://www.ruhr-uni-bochum.de/gna/Quellensammlung/04/04_nonintercourseact_1809.html",
        "image": {
          "src": "/covers/us-hong-kong-emergency-lapse--a0.png",
          "alt": "1807 political cartoon of a snapping turtle labeled 'Ograbme' (embargo spelled backwards) seizing an American merchant, satirizing Jefferson's trade embargo.",
          "credit": "Alexander Anderson, 'Ograbme' (1807), Library of Congress via Wikimedia Commons. Public domain."
        }
      },
      {
        "category": "historical",
        "title": "On February 27, 1972, at the close of Richard Nixon's visit to China, Washington and Beijing issued the Shanghai Communiqué, turning two decades of hostility into a wary opening. The two governments still disagreed sharply over Taiwan and left their deepest quarrels unresolved, yet they declared that moving toward normal relations served everyone's interest and pledged that neither would seek hegemony in the Pacific. It is the same logic behind letting the Hong Kong emergency lapse after trade talks: rivals ease a confrontation in the name of mutual advantage while carefully leaving the hard core of their differences in place. Realpolitik, not a change of heart, does the diplomatic work.",
        "excerpt": "Progress toward the normalization of relations between China and the United States is in the interests of all countries;\n...\nneither should seek hegemony in the Asia-Pacific region and each is opposed to efforts by any other country or group of countries to establish such hegemony;",
        "source": "Joint Communiqué of the United States of America and the People's Republic of China (Shanghai Communiqué), issued at Shanghai, February 27, 1972.",
        "href": "https://history.state.gov/historicaldocuments/frus1969-76v17/d203",
        "image": {
          "src": "/covers/us-hong-kong-emergency-lapse--a1.png",
          "alt": "President Richard Nixon shaking hands with Premier Zhou Enlai on the tarmac in Peking, February 1972.",
          "credit": "White House Photo Office, 'President Nixon and Premier Chou En-Lai Shake Hands at the Nixons' Arrival in Peking' (1972), U.S. National Archives via Wikimedia Commons. Public domain (U.S. Government work)."
        }
      },
      {
        "category": "literary",
        "title": "In the final book of Homer's Iliad, old King Priam crosses the battle lines into the enemy camp and clasps the knees of Achilles, the man who killed his son Hector, to beg for the body back. Achilles, reminded of his own aged father, relents: he lifts the king by the hand, and the two weep together before he agrees to give up the corpse. It is the archetype of a hard adversary easing his grip, principle and vengeance yielding to a negotiated mercy. Washington's decision to lift sanctions and let the Hong Kong emergency expire has the same texture, an implacable posture quietly softened once the moment for relenting arrives.",
        "excerpt": "He took the old man's hand and moved him gently away. The two wept bitterly- Priam, as he lay at Achilles' feet, weeping for Hector, and Achilles now for his father and now for Patroclous, till the house was filled with their lamentation.",
        "source": "Homer, The Iliad, Book XXIV, trans. Samuel Butler (1898).",
        "href": "https://classics.mit.edu/Homer/iliad.24.xxiv.html"
      },
      {
        "category": "literary",
        "title": "In Shakespeare's The Merchant of Venice, Portia stands before the Venetian court and pleads with Shylock to relax the letter of his bond, arguing that mercy freely given blesses the one who grants it as much as the one who receives it. Her speech makes clemency the true mark of power, greater in the mighty than the crown or scepter that enforces their will. The image fits a great power choosing to relax a penalty it was fully entitled to keep enforcing, sanctions loosened not because they were unjust but because relenting can serve the stronger party too. Washington's quiet lifting of some Hong Kong sanctions is that discretionary easing, mercy as a calculated show of strength.",
        "excerpt": "The quality of mercy is not strain'd,\nIt droppeth as the gentle rain from heaven\nUpon the place beneath: it is twice blest;\nIt blesseth him that gives and him that takes:\n'Tis mightiest in the mightiest: it becomes\nThe throned monarch better than his crown;",
        "source": "William Shakespeare, The Merchant of Venice, Act IV, Scene 1 (Portia).",
        "href": "https://shakespeare.mit.edu/merchant/merchant.4.1.html"
      },
      {
        "category": "artistic",
        "title": "Gerard ter Borch's small oil-on-copper 'The Ratification of the Treaty of Munster' (1648) records the exact moment two great powers ended eighty years of war, as Dutch and Spanish envoys raise their hands to swear the peace in the town hall at Munster. It is one of the first paintings to document a diplomatic act as sober fact rather than allegory, a room full of tired negotiators formalizing a settlement that redrew Europe's map. The picture captures the mood of Washington and Beijing easing a standoff by mutual arrangement: no triumph, no embrace, just a status quietly changed by agreement. A long emergency is closed, and the change is ratified by procedure rather than proclaimed as victory.",
        "excerpt": "Ter Borch crowds some seventy-seven figures into a single dim chamber, the Dutch and Spanish delegates clustered at the center with hands raised to take the oath. The colors are muted browns and blacks against pale ruffs and gilt leather, the drama entirely in the solemn stillness of men ending a war by signature. Even the painter himself peers out from the left edge, a witness to a bargain between rivals.",
        "source": "Gerard ter Borch, 'The Ratification of the Treaty of Munster' (1648), oil on copper, National Gallery, London (NG896).",
        "href": "https://www.nationalgallery.org.uk/paintings/gerard-ter-borch-the-ratification-of-the-treaty-of-munster",
        "image": {
          "src": "/covers/us-hong-kong-emergency-lapse--a4.png",
          "alt": "Gerard ter Borch's 1648 painting of Dutch and Spanish envoys swearing the oath ratifying the Treaty of Munster in a crowded town-hall chamber.",
          "credit": "Gerard ter Borch, 'The Ratification of the Treaty of Munster' (1648), National Gallery, London, via Wikimedia Commons. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Amedee Forestier's painting 'The Signing of the Treaty of Ghent, Christmas Eve 1814' shows the British and American negotiators clasping hands across the table as they end the War of 1812, the same conflict that grew out of Jefferson's embargo years. The chief envoys, John Quincy Adams and Britain's Admiral Gambier, shake hands in the center while the other diplomats look on, rivals converting a war into a restored peace. It is the visual grammar of exactly this kind of move: two powers stepping back from confrontation and shaking on a bargain that lets normal relations resume. Washington's decision to lift some sanctions and let the Hong Kong emergency lapse is that handshake in miniature, an easing of hostility sealed by agreement rather than surrender.",
        "excerpt": "Forestier stages the scene as a warm interior tableau: American commissioners in dark coats reach across the green-covered table to grasp the hands of the British delegation, papers and inkstands scattered before them. The gesture at the heart of the canvas is the handshake of former enemies, principle set aside so trade and peace can flow again. Candlelight and rich reds give the reconciliation the glow of a Christmas Eve settlement.",
        "source": "Amedee Forestier, 'The Signing of the Treaty of Ghent, Christmas Eve 1814' (1914), Smithsonian American Art Museum.",
        "href": "https://commons.wikimedia.org/wiki/File:Am%C3%A9d%C3%A9e_Forestier_-_Signing_of_Treaty_of_Ghent_(1814).jpg",
        "image": {
          "src": "/covers/us-hong-kong-emergency-lapse--a5.png",
          "alt": "Amedee Forestier's painting of American and British diplomats shaking hands across a table as they sign the Treaty of Ghent ending the War of 1812.",
          "credit": "Amedee Forestier, 'The Signing of the Treaty of Ghent, Christmas Eve 1814' (1914), Smithsonian American Art Museum, via Wikimedia Commons. Public domain."
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "fairlife-cyberattack-production-halt",
    "headline": "Coca-Cola's Fairlife pauses U.S. production after a ransomware attack breaches the milk brand's systems",
    "overview": "Coca-Cola said its dairy subsidiary Fairlife temporarily suspended U.S. production after detecting unauthorized third-party access to parts of its systems, including production systems, in a ransomware event. The company said product quality and safety were not affected and that its Canadian operations were not impacted. It has notified law enforcement and begun an investigation with outside experts.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxNZkVkZzdhcExfeXNWRWpBd182TVRzc1kzOGE1Y0RSb3Y0aHFwY19PVTU0TmZLX09aZEs3VlR4SVBVZzdMVVhqdkRab2traEE2MlB3V2NUbjktRTBYWHZQd1hEZi1GYVRuTk1DQjZhX01pZkdjVnktbXlVeHFXZTJVMzlZYUxJYUlZcHNIQm43TnhFODI1ZUh3RHZ3?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/coca-cola-fairlife-milk-cyberattack/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/fairlife-cyberattack-production-halt.png",
      "alt": "Cartons of milk on refrigerated supermarket shelves.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 991, after Viking raiders plundered Ipswich and cut down the ealdorman Byrhtnoth at the Battle of Maldon, the English crown chose to buy peace rather than fight, handing over 10,000 pounds of silver to the Danes. It was the first of the payments later remembered as the Danegeld: a great and wealthy realm, unable to keep an unseen and mobile enemy out, paying to make the raiding stop. Fairlife's ransomware crisis is the modern form of the same bargain, an intruder who cannot be caught demanding money to release a system it has seized. Then as now, the tribute buys quiet, not security, and invites the raider to return.",
        "excerpt": "A.D. 991.  This year was Ipswich plundered; and very soon\nafterwards was Alderman Britnoth slain at Maidon.  In this\nsame year it was resolved that tribute should be given, for the\nfirst time, to the Danes, for the great terror they occasioned by\nthe sea-coast.  That was first 10,000 pounds.  The first who\nadvised this measure was Archbishop Siric.",
        "source": "The Anglo-Saxon Chronicle, entry for A.D. 991 (trans. James Ingram / J. A. Giles), Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/657/pg657.txt"
      },
      {
        "category": "historical",
        "title": "Between 1811 and 1816, textile workers across Nottinghamshire, Yorkshire and Lancashire, marching under the name of the mythical \"General Ludd,\" broke into mills at night and smashed the stocking frames and shearing machines with heavy hammers. The Luddites were not opposed to technology as such; they struck at the machines because the machines were the vulnerable heart of the new industrial enterprise, and stopping them stopped the owners' profits. Fairlife's shuttered production lines echo that logic in reverse and at a distance, an attacker who never enters the building halting the machinery all the same. In both cases a modern, mechanized food-and-goods system is revealed to be only as strong as its most breakable moving parts.",
        "excerpt": "Under cover of darkness, bands of framework knitters and croppers moved from workshop to workshop, breaking the mechanized frames and shears that were the beating heart of the mills. Their sledgehammers, some nicknamed \"Enoch,\" could silence a factory's output in a single raid, and the authorities answered with troops and, in 1812, a law making frame-breaking a capital crime. It was sabotage as leverage: halt the machines, and you hold the whole enterprise hostage.",
        "source": "The Luddites and the machine-breaking risings of 1811-1816, English Midlands and North; overview and primary material, British Library.",
        "href": "https://www.bl.uk/collection-items/the-luddites"
      },
      {
        "category": "literary",
        "title": "In Plutarch's Life of Caesar, the young Julius Caesar is seized by Cilician pirates near the island of Pharmacusa and held until a ransom can be raised. Told they wanted twenty talents for him, he laughed and insisted they demand fifty, then lived among his captors for thirty-eight days as though they were his bodyguard, treating the whole hostage-taking with contempt. The episode is the classic literary portrait of extortion at sea: a great enterprise stopped and its owner held for a price by an unseen, lawless band. Fairlife, its systems locked and a payment demanded, is caught in the same ancient transaction, the productive machine frozen until the captors are satisfied.",
        "excerpt": "When these men at first demanded of him twenty talents for his ransom, he laughed at them for not understanding the value of their prisoner, and voluntarily engaged to give them fifty. He presently despatched those about him to several places to raise the money, till at last he was left among a set of the most bloodthirsty people in the world, the Cilicians, only with one friend and two attendants. Yet he made so little of them, that when he had a mind to sleep, he would send to them, and order them to make no noise. For thirty-eight days, with all the freedom in the world, he amused himself with joining in their exercises and games, as if they had not been his keepers, but his guards.",
        "source": "Plutarch, \"Caesar,\" Lives of the Noble Grecians and Romans, translated by John Dryden (revised by A. H. Clough); The Internet Classics Archive.",
        "href": "https://classics.mit.edu/Plutarch/caesar.html"
      },
      {
        "category": "literary",
        "title": "In the ninth chapter of Exodus, when Pharaoh will not release the Israelites, the fifth plague falls not on people but on the herds: a \"very grievous murrain\" that strikes the cattle, horses, camels, oxen and sheep of Egypt, sparing only the livestock of Israel. It is a plague aimed precisely at a nation's animals and food supply, an invisible hand reaching into the fields to kill the source of milk, meat and labor. For Fairlife, a dairy brand whose whole business rests on healthy herds and a clean, working production chain, the image is unnervingly apt, a hidden affliction that halts the flow of milk overnight. The passage frames the modern breach in the oldest terms: a strike at the herd that brings the enterprise to a standstill.",
        "excerpt": "Behold, the hand of the LORD is upon thy cattle which is in the field, upon the horses, upon the asses, upon the camels, upon the oxen, and upon the sheep: there shall be a very grievous murrain.\nAnd the LORD shall sever between the cattle of Israel and the cattle of Egypt: and there shall nothing die of all that is the children's of Israel.\nAnd the LORD appointed a set time, saying, To morrow the LORD shall do this thing in the land.\nAnd the LORD did that thing on the morrow, and all the cattle of Egypt died: but of the cattle of the children of Israel died not one.",
        "source": "The Holy Bible, King James Version, Exodus 9:3-6.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus"
      },
      {
        "category": "artistic",
        "title": "Johannes Vermeer's \"The Milkmaid\" (c. 1658-1661), in the Rijksmuseum, shows a servant pouring a thin steady stream of milk from a jug into a bowl, the entire small world of the kitchen concentrated on that single unbroken flow. It is the quiet essence of the dairy: humble, wholesome, dependent on the pour never stopping. Set beside Fairlife's frozen production lines, the painting reads almost as a warning made tender, everything in the image depends on the milk continuing to move, and a modern dairy enterprise is just this act multiplied a millionfold and run by machines. When the systems lock, the stream that Vermeer immortalized is exactly what stops.",
        "excerpt": "A single figure stands in a plain, sunlit room, tipping an earthenware jug so that a slender thread of milk falls into a waiting bowl; bread, a basket and a gleaming copper pail surround her. Vermeer freezes the one instant of the pour, making an ordinary domestic act feel monumental and fragile at once. The whole painting is an image of continuity, of nourishment flowing steadily, and thus of how much is lost the moment that flow is interrupted.",
        "source": "Johannes Vermeer, The Milkmaid (Het melkmeisje), c. 1658-1661, oil on canvas, Rijksmuseum, Amsterdam (SK-A-2344).",
        "href": "https://www.rijksmuseum.nl/en/collection/SK-A-2344",
        "image": {
          "src": "/covers/fairlife-cyberattack-production-halt--a4.png",
          "alt": "Vermeer's The Milkmaid: a woman in a yellow bodice and blue apron pouring milk from a jug into a bowl in a sunlit kitchen.",
          "credit": "Johannes Vermeer, The Milkmaid (c. 1658-1661), Rijksmuseum, Amsterdam. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin's \"The Plague of Ashdod\" (1630), in the Louvre, depicts a stricken city where the Philistines, punished for seizing the Ark of the Covenant, collapse in the streets as an unseen pestilence spreads among them. Figures cover their noses against the contaminated air, a mother lies dead with her infant, and the ordered classical architecture stands helpless above the chaos, order overtaken by an invisible force. The painting captures exactly the dread behind a ransomware breach: a vast, dignified system paralyzed by an intruder no one can see, its normal life halted in an instant. Fairlife's silenced plant is the modern counterpart, a great enterprise brought to a stop by a contagion that arrives through the systems rather than the air.",
        "excerpt": "In a grand, sunlit classical square, bodies lie scattered where they fell, a mother dead beside her living child while onlookers recoil and press cloths to their faces against the tainted air. Poussin painted it during the Italian plague of 1629-1631, and the picture pulses with the horror of an invisible affliction moving unstoppably through a proud city. Beauty and order remain in the stone facades, but the enterprise of the living has been abruptly, catastrophically halted.",
        "source": "Nicolas Poussin, The Plague of Ashdod (La Peste d'Asdod), 1630, oil on canvas, Musee du Louvre, Paris (INV 7276).",
        "href": "https://en.wikipedia.org/wiki/Plague_of_Ashdod_(Poussin)",
        "image": {
          "src": "/covers/fairlife-cyberattack-production-halt--a5.png",
          "alt": "Poussin's The Plague of Ashdod: a classical city square strewn with plague victims as figures recoil and cover their faces.",
          "credit": "Nicolas Poussin, The Plague of Ashdod (1630), Musee du Louvre, Paris. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "india-wangchuk-hunger-strike-hospitalized",
    "headline": "Indian police forcibly hospitalise education reformer Sonam Wangchuk after 20 days on hunger strike",
    "overview": "Police in India forcibly moved Sonam Wangchuk, a 59-year-old engineer and education reformer, to a New Delhi hospital after his health deteriorated on the 20th day of a hunger strike demanding the education minister's resignation over exam-paper leaks. His fast has become a rallying point for the 'Cockroach Party,' a youth movement named after a top judge's remark likening some jobless young people to cockroaches. Supporters condemned the forced hospitalisation as coercive.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPQTBCbG1NUHJfOEZtSWI3WGx3M2RuWDJHMjNsZDdwZ0YybW1yeWQ5QmFHTWtFcXhzWktqS2ZURGg1eDIzOXZXMWFGRTB5WVljWk1zc0ZQLTBsSHZnME81ZjhQelVzVV9ZLWllX1Y3RzVJWUNXR0dVNVVvNHpmcUYxM1ZmblR4Y1BPUnpSOG83OEd4OFEyZW1Qal9rdF9SSkt3Y0s1a0QyMlVWRWxueVNmV0d4SkFkWHM?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cjej3dxxg2do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/india-wangchuk-hunger-strike-hospitalized.png",
      "alt": "A single empty chair beside a protest banner at a hunger-strike sit-in.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 20 September 1932, in his cell at Yerwada Jail in Pune, Mohandas Gandhi began a fast unto death to protest the British Communal Award granting the so-called untouchables separate electorates. Like Wangchuk today, Gandhi wielded his own starving body as the sole weapon of a citizen with no army, forcing a distant government to reckon with a single conscience. His weakening frame became a national event, drawing crowds and negotiators until, after six days, the settlement known as the Poona Pact reversed the decision. It is the founding template of the Indian fast as moral coercion against the state that Wangchuk consciously invokes.",
        "excerpt": "Gandhi called fasting his ultimate satyagraha, the last resort of the powerless: a deliberate offering of the self to move hearts that argument could not reach. Emaciated on a cot in the prison yard, he turned physical helplessness into overwhelming moral pressure, and the authorities who could have let him die instead came to terms. The Epic Fast established that in India a lone faster's suffering could bend the machinery of a government.",
        "source": "\"Gandhi begins fast in protest of caste separation,\" This Day in History, September 20, 1932, HISTORY.",
        "href": "https://www.history.com/this-day-in-history/gandhi-begins-fast-in-protest-of-caste-separation"
      },
      {
        "category": "historical",
        "title": "In the Maze Prison outside Belfast, the Irish republican Bobby Sands began refusing food on 1 March 1981, the first of ten men who would starve themselves to death that year demanding political-prisoner status. As with Wangchuk, the fast turned a jailed body into a public reckoning: on 9 April, gaunt and dying, Sands was elected a Member of Parliament, his empty seat a rebuke to the state that held him. He died on 5 May after 66 days without food, and his funeral drew tens of thousands. The 1981 strike shows how the slow self-destruction of a single faster can eclipse the government it opposes.",
        "excerpt": "Sands and his comrades refused all food while the state, unwilling to concede and unwilling to force-feed, simply watched them wither in their cells. His election to Parliament while at the edge of death exposed how a hunger striker converts bodily weakness into political authority no prison wall can contain. Ten deaths later, the protest had transformed Irish republican politics and drawn the eyes of the world onto the H-Blocks.",
        "source": "\"The Hunger Strike of 1981 - A Chronology of Main Events,\" CAIN Archive, Ulster University.",
        "href": "https://cain.ulster.ac.uk/events/hstrike/chronology.htm"
      },
      {
        "category": "literary",
        "title": "In Sophocles' tragedy Antigone, first staged in Athens around 441 BC, a young woman defies King Creon's edict and buries her brother, insisting that the eternal laws of the gods outrank any decree of a mortal ruler. Hauled before the king, she does not deny the act but justifies it, choosing death over obedience exactly as Wangchuk chooses starvation over silence. Her speech is the archetype of the single conscience that answers to a higher justice than the state's. Creon's power cannot make her recant; it can only destroy her, and in destroying her it destroys itself.",
        "excerpt": "Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods. For their life is not of today or yesterday, but for all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone, lines 453-457, trans. Sir Richard C. Jebb (Cambridge University Press, 1891), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0186:card=441"
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau's 1849 essay \"Civil Disobedience\" argues that a just individual must withhold cooperation from an unjust government, even at the cost of prison, because a solitary honest man is worth more than a compliant majority. Thoreau spent a night in jail rather than pay a tax supporting slavery, and from that small refusal he built the philosophy of nonviolent resistance that later shaped Gandhi and King, and that animates Wangchuk's fast today. The essay locates moral authority in the lone dissenter who accepts punishment rather than endorse wrong. Its logic is precisely Wangchuk's: to place one's own body on the line as a standing reproach to power.",
        "excerpt": "If any think that their influence would be lost there, and their voices no longer afflict the ear of the State, that they would not be as an enemy within its walls, they do not know by how much truth is stronger than error, nor how much more eloquently and effectively he can combat injustice who has experienced a little in his own person. Under a government which imprisons any unjustly, the true place for a just man is also a prison.",
        "source": "Henry David Thoreau, \"Civil Disobedience\" (1849), Project Gutenberg eBook, On the Duty of Civil Disobedience.",
        "href": "https://www.gutenberg.org/files/71/71-h/71-h.htm"
      },
      {
        "category": "artistic",
        "title": "This 1910 poster, drawn from Alfred Pearse's cartoon \"The Modern Inquisition\" for the Women's Social and Political Union, shows a suffragette pinned to a chair by wardresses while a tube is forced through her nose to break her hunger strike. The WSPU circulated such images precisely because the torture happened out of public sight, turning the faster's ordeal into propaganda against a government that would not let her starve nor grant her cause. It is the visual ancestor of the drama now surrounding Wangchuk, whom police removed to hospital rather than allow to die. The poster makes the state's forcible intervention into an emblem of its own cruelty.",
        "excerpt": "The print depicts a woman held down by uniformed attendants as officials drive a feeding tube into her, her body rigid with resistance and pain. Bold text and stark colours were designed to shock passers-by and voters into recognising force-feeding as state torture. Distributed during the 1910 general election, it weaponised the image of the restrained faster exactly as authorities today must weigh the optics of dragging Wangchuk from his fast.",
        "source": "\"Poster showing a suffragette being force-fed,\" after Alfred Pearse (\"A Patriot\"), Women's Social and Political Union, 1910. Museum of London. Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Poster_showing_a_suffragette_being_force-fed,_1910.jpg",
        "image": {
          "src": "/covers/india-wangchuk-hunger-strike-hospitalized--a4.png",
          "alt": "1910 WSPU poster depicting a suffragette held down and force-fed through a tube in prison",
          "credit": "Women's Social and Political Union / Museum of London, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's 1787 masterpiece \"The Death of Socrates,\" now in the Metropolitan Museum of Art, shows the philosopher upright and serene, reaching for the cup of hemlock rather than renounce his principles before the Athenian state. Condemned for defying civic authority, Socrates turns his own death into a final act of conscience, his calm gesture rebuking the men who ordered it, just as Wangchuk turns his fasting body against India's officials. David painted him as the model of self-sacrifice for truth, teaching to the last breath. The canvas is the great visual statement of the individual who accepts death sooner than betray his cause.",
        "excerpt": "David composes the scene like a stage: grieving disciples recoil in shadow while Socrates, luminous and unbowed, points heavenward and reaches for the poison without fear. The single upright figure against a hostile state distills the theme of a lone conscience choosing self-destruction over submission. Painted on the eve of the French Revolution, it made martyrdom for principle into an image of moral triumph rather than defeat.",
        "source": "Jacques-Louis David, The Death of Socrates, 1787, oil on canvas, 129.5 x 196.2 cm. The Metropolitan Museum of Art, New York (Catharine Lorillard Wolfe Collection, 31.45).",
        "href": "https://www.metmuseum.org/art/collection/search/436105",
        "image": {
          "src": "/covers/india-wangchuk-hunger-strike-hospitalized--a5.png",
          "alt": "Jacques-Louis David's painting The Death of Socrates, the philosopher reaching for the cup of hemlock",
          "credit": "Jacques-Louis David, The Metropolitan Museum of Art, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "burnham-labour-leader",
    "headline": "Andy Burnham is declared leader of Britain's governing Labour Party and will become prime minister on Monday",
    "overview": "Andy Burnham, the former mayor of Greater Manchester, was declared leader of the UK's governing Labour Party on Friday as the sole candidate to replace Keir Starmer, who was forced out by a party rebellion. In his acceptance speech Burnham pledged to \"give them hope back\" and to shift power from Westminster and Whitehall to the places people live. He will become Britain's seventh prime minister in a decade of political turbulence when he succeeds Starmer on Monday.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxOWU05U1otVzNHSXktaWJjX1BBYkdvQTRvb1B1bGZGUUVPcDhTYlA3alczTGszRlMxUi1GN09pbkE0Wjd0c19GbEpzaHRPUGc5a0FIZkRldVplV083LXdfcktDbHZzZk5yTVMwMXpaaU5TYkFTOUhKT2NwWlhMb1FpNTJteURBbGIxd3MzUHZwZUY5WUFhaDNJaTFzMUdvVzJN?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPeWExY2xNUmphWHN6VElGWnFoa1ozR1lVRThIMmdUTGt3b3FjdHVTRUc2WUFyNzVzQzdlMmdoUlZZZnFXenFEQVV3OEY5cjgzZFBfWllGd3lMMThkZ3NXUkxSZnFOcmZhLThxXzVSUGFJU1VPb200YlhwdVBoZG5iMDlsc0htTVV3VDRfSlJYTDVvVHl6UDRtTHltWmppek5MY3RFRFFQR2NmZmszX3lZ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/burnham-labour-leader.png",
      "alt": "Andy Burnham, the newly declared leader of Britain's Labour Party.",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the emperor Domitian was assassinated in AD 96, Rome's Senate handed power peacefully to the elderly, moderate Nerva, who promised to reconcile one-man rule with the old liberties Romans had lost under a tyrant. The historian Tacitus, writing soon after, described the cautious return of hope after years of fear, as a weary people dared once more to speak and to expect better government. It is the same emotional arc Britain is being offered now: a divisive leader forced from the stage, a successor installed without bloodshed, and a pledge to 'give hope back.' Like Nerva, Andy Burnham inherits not a fresh start but a bruised realm hungry to believe that renewal is possible.",
        "excerpt": "Now our spirits begin to revive. But although at the first dawning of this happy period, the emperor Nerva united two things before incompatible, monarchy and liberty; and Trajan is now daily augmenting the felicity of the empire; and the public security has not only assumed hopes and wishes, but has seen those wishes arise to confidence and stability;",
        "source": "Tacitus, The Life of Cnaeus Julius Agricola, §3 (written c. AD 98), English translation, Project Gutenberg eBook #7524.",
        "href": "https://www.gutenberg.org/cache/epub/7524/pg7524.txt",
        "image": {
          "src": "/covers/burnham-labour-leader--a0.png",
          "alt": "Marble portrait bust of the Roman emperor Nerva",
          "credit": "Photo by MumblerJamie, Ny Carlsberg Glyptothek, via Wikimedia Commons, CC BY-SA 2.0"
        }
      },
      {
        "category": "historical",
        "title": "On 9 August 1974, Richard Nixon resigned in disgrace over Watergate and Gerald Ford was sworn in as U.S. president without an election, having reached the office only because his predecessor was forced out. Ford's first task was not policy but reassurance: to tell an exhausted, cynical nation that the constitutional machinery had held and that the crisis was over. His plain-spoken promise of healing after a 'long national nightmare' is precisely the register Burnham is reaching for as he vows to restore hope to a country worn down by a decade of political churn. Both moments show the peculiar duty of the unelected successor: to convert a rupture at the top into a feeling of stability and fresh beginning for ordinary people.",
        "excerpt": "My fellow Americans, our long national nightmare is over. Our Constitution works; our great Republic is a government of laws and not of men. Here the people rule.",
        "source": "Gerald R. Ford, 'Remarks on Taking the Oath of Office,' August 9, 1974 (public domain U.S. government document), Miller Center of Public Affairs / Gerald R. Ford Presidential Library.",
        "href": "https://millercenter.org/the-presidency/presidential-speeches/august-9-1974-remarks-taking-oath-office",
        "image": {
          "src": "/covers/burnham-labour-leader--a1.png",
          "alt": "Official presidential portrait of Gerald R. Ford",
          "credit": "Official White House portrait of Gerald R. Ford, U.S. federal government, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Henry V, the Archbishop of Canterbury marvels at how the wild, disreputable Prince Hal was transformed the instant his father died and the crown passed to him, his old failings seeming to fall away as he assumed the burden of rule. It is the classic drama of succession: a new leader steps forward at the moment of transition and pledges, by his very bearing, that the realm will be better governed than before. Burnham's elevation carries the same hopeful theatre, a former mayor now cast as the reformed and steadier hand a troubled country needs. The scene captures the public wish, half faith and half gamble, that a change at the top can genuinely remake the man and the nation together.",
        "excerpt": "The courses of his youth promised it not.\nThe breath no sooner left his father's body,\nBut that his wildness, mortified in him,\nSeem'd to die too; yea, at that very moment\nConsideration, like an angel, came\nAnd whipp'd the offending Adam out of him,\nLeaving his body as a paradise,\nTo envelop and contain celestial spirits.",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act I, Scene 1 (c. 1599), Moby/Complete Works text, MIT.",
        "href": "https://shakespeare.mit.edu/henryv/henryv.1.1.html",
        "image": {
          "src": "/covers/burnham-labour-leader--a2.png",
          "alt": "Early portrait of King Henry V of England in profile",
          "credit": "Unknown artist, 'King Henry V,' National Portrait Gallery, London, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "At the close of Tennyson's Idylls of the King, the dying Arthur consoles the grieving Sir Bedivere as his kingdom passes away, insisting that the fall of an old order is not an end but the way renewal comes into the world. His famous line, that the old order yields place to the new lest one good custom corrupt the world, turns a moment of loss into a statement of faith in change. Burnham's rise after Starmer's ouster, and his own call to shift power away from Westminster toward 'the places people live,' echoes this conviction that entrenched arrangements must give way for the common good. Tennyson gives the melancholy but hopeful frame for any peaceful handover: the passing of one leader clears ground for the next.",
        "excerpt": "'The old order changeth, yielding place to new,\nAnd God fulfils himself in many ways,\nLest one good custom should corrupt the world.'",
        "source": "Alfred, Lord Tennyson, 'The Passing of Arthur,' Idylls of the King (1869/1885), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Idylls_of_the_King/The_Passing_of_Arthur",
        "image": {
          "src": "/covers/burnham-labour-leader--a3.png",
          "alt": "Painting of the sleeping King Arthur attended by mourners in Avalon",
          "credit": "Edward Burne-Jones, 'The Last Sleep of Arthur in Avalon' (1881–1898), Museo de Arte de Ponce, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ambrogio Lorenzetti's fresco 'Effects of Good Government in the City,' painted for Siena's council chamber in 1338–39, imagines what wise rule looks like from the ground up: busy workshops, dancing citizens, safe streets and a countryside flourishing under just governance. It was made to remind the city's rulers that their decisions were felt in the ordinary lives of the people, a strikingly modern idea of accountable, place-rooted power. That is exactly the promise Burnham stakes his leadership on, shifting authority from a distant Westminster toward the towns and neighbourhoods where people actually live. The painting is the oldest great vision of the hope now being rekindled: that a new and better government will make daily life visibly bloom.",
        "excerpt": "A sweeping panorama of a thriving medieval city under good rule: townsfolk dance in the street, masons build, merchants trade and teachers instruct, while beyond the walls a serene, well-tended countryside stretches to the hills. Every figure is at ease and productive, the whole scene composed as a portrait of prosperity and civic peace flowing directly from just governance.",
        "source": "Ambrogio Lorenzetti, 'Effects of Good Government in the City' (from The Allegory of Good and Bad Government), fresco, 1338–1339, Sala dei Nove, Palazzo Pubblico, Siena.",
        "href": "https://en.wikipedia.org/wiki/The_Allegory_of_Good_and_Bad_Government",
        "image": {
          "src": "/covers/burnham-labour-leader--a4.png",
          "alt": "Fresco of a prosperous, peaceful medieval city with dancing citizens and busy trades",
          "credit": "Ambrogio Lorenzetti, Palazzo Pubblico, Siena (Google Art Project), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel composed 'Zadok the Priest' for the coronation of George II in 1727, setting the biblical scene of Solomon being anointed king to a slow-building orchestral swell that bursts into a jubilant choral shout. Its words, drawn from the anointing of a new sovereign and the people's rejoicing, have crowned every British monarch since, making it the definitive music of peaceful, legitimate succession. As Britain prepares to receive its seventh prime minister in a decade, the anthem's ancient formula, the people rejoicing that a new leader has been raised up, resonates with Burnham's promise of hope and renewal. The piece embodies the moment a nation ritually transfers power and dares to cheer the arrival of the one who comes next.",
        "excerpt": "Zadok the priest and Nathan the prophet anointed Solomon king. And all the people rejoiced and said: God save the King! Long live the King! God save the King! May the King live for ever. Amen. Hallelujah.",
        "source": "George Frideric Handel, 'Zadok the Priest' (Coronation Anthem No. 1, HWV 258), 1727; text adapted from 1 Kings 1:38–40. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/burnham-labour-leader--a5.png",
          "alt": "Portrait of composer George Frideric Handel",
          "credit": "Thomas Hudson, portrait of George Frideric Handel (1756), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "israel-knesset-dissolves-october-election",
    "headline": "Israel's Knesset votes to dissolve and sets an October 27 election, ending the first parliament to serve a full term since 1988",
    "overview": "The Knesset approved its own dissolution on Friday in a 62-0 vote, with Prime Minister Benjamin Netanyahu among those in favor, setting a general election for October 27. It is the first time Israel's parliament has served a full term since 1988. Netanyahu's coalition pushed through several contested laws in its final week, and polls show his bloc trailing a new centrist party led by former military chief Gadi Eisenkot.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxOWVlKd0tvVkdSdUIyMndadGp1c0NRS1pOYVowNmFZdDhxdUxvZDhzUl9OM0x0cDBiUHVGbTRRdDYwLXFidXVzZXc2cTNwMWQyeVF4LVBTbmkxZDdtOUFia29WRURZaWlWR0pPYlNzWk9jQ3ExakxPQjZvWHB5X3VXTUNQS3RBaDlaWkw2bHRmTVdiLVAzajN1UnVn?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/17/israel-headed-for-october-election-as-parliament-dissolved"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/israel-knesset-dissolves-october-election.png",
      "alt": "The Knesset, Israel's parliament building in Jerusalem.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 20 April 1653 Oliver Cromwell strode into the Rump of the Long Parliament and dissolved it at the point of the sword, ending a legislature he judged to have long outlived its mandate. His furious order that the members simply 'go' is the archetype of a parliament's abrupt death — yet where Cromwell used soldiers, Israel's Knesset ended itself peacefully by a 62-0 vote, with the prime minister himself raising his hand in favor. The scene is a dark mirror of the Jerusalem vote: the same recurring moment when a body that has 'sat too long' is brought to a close. It measures how rare and how civilized it is to end a government by ballot rather than by force.",
        "excerpt": "Your country therefore calls upon me to cleanse this Augean stable, by putting a final period to your iniquitous proceedings in this House; and which by God's help, and the strength he has given me, I am now come to do; I command ye therefore, upon the peril of your lives, to depart immediately out of this place; go, get you out! Make haste! Ye venal slaves be gone! So! Take away that shining bauble there, and lock up the doors. In the name of God, go!",
        "source": "Oliver Cromwell, speech dissolving the Rump of the Long Parliament, House of Commons, 20 April 1653 (traditional reconstructed text as printed on Wikisource; the speech survives only through later report, not a verbatim transcript).",
        "href": "https://en.wikisource.org/wiki/Dissolution_of_the_Long_Parliament",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a0.png",
          "alt": "Benjamin West's 1782 painting of Oliver Cromwell, arm raised, ordering soldiers to clear the members from the House of Commons.",
          "credit": "Benjamin West, Oliver Cromwell Dissolving the Long Parliament (1782); via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "In his message to Congress on July 4, 1861, with the Union splitting into civil war, Abraham Lincoln argued that in a constitutional republic disputes must be settled at the polling place rather than the battlefield — that 'ballots are the rightful and peaceful successors of bullets.' That is precisely the wager Israel's Knesset made in dissolving itself and throwing the nation's future to an October 27 election. Netanyahu's bloc, now trailing in the polls, must make its case through the vote, seeking, in Lincoln's words, an 'appeal to ballots themselves at succeeding elections.' The passage frames the coming election as the peaceful successor to the sword.",
        "excerpt": "that ballots are the rightful and peaceful successors of bullets, and that when ballots have fairly and constitutionally decided there can be no successful appeal back to bullets; that there can be no successful appeal except to ballots themselves at succeeding elections.",
        "source": "Abraham Lincoln, Message to Congress in Special Session, July 4, 1861.",
        "href": "https://millercenter.org/the-presidency/presidential-speeches/july-4-1861-july-4th-message-congress",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a1.png",
          "alt": "Photographic portrait of a bearded Abraham Lincoln, head and shoulders, 1863.",
          "credit": "Abraham Lincoln, 1863 portrait; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Coriolanus, the victorious general is forced to stand in the marketplace and beg ordinary citizens for their 'voices' — their votes — before he can take office, a humbling ritual he despises even as he performs it. The play dramatizes the hard truth now facing Netanyahu and the former general Gadi Eisenkot: however great a leader's record in war, power in a republic is granted and revoked by the people at the ballot. Coriolanus tallying his battle wounds to earn 'voices' anticipates a campaign in which military service must be converted into votes. It is the ancient theatre of appealing to the people.",
        "excerpt": "Your voices! For your voices I have fought;\nWatched for your voices; for your voices bear\nOf wounds two dozen odd. Battles thrice six\nI have seen and heard of; for your voices have\nDone many things, some less, some more. Your voices!\nIndeed, I would be consul.",
        "source": "William Shakespeare, Coriolanus, Act II, Scene III.",
        "href": "https://www.gutenberg.org/cache/epub/1535/pg1535.txt",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a2.png",
          "alt": "Thomas Lawrence's 1798 portrait of actor John Philip Kemble in the title role of Coriolanus, standing in Roman military dress.",
          "credit": "Thomas Lawrence, John Philip Kemble as Coriolanus (1798); via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Walt Whitman's 'Election Day, November, 1884' declares that America's grandest spectacle is not Niagara or Yosemite but its 'choosing day' — the 'ballot-shower' of citizens voting, which he calls a 'swordless conflict' mightier than all of Rome's or Napoleon's wars. The poem is a hymn to exactly what Israel's Knesset set in motion by fixing an October 27 election: a peaceful, nationwide contest that stands in for combat. Whitman's snow-flake ballots falling from East to West carry the same faith that the vote, not the sword, decides a nation's fate. It casts the ballot as the successor to the battlefield.",
        "excerpt": "The final ballot-shower from East to West--the paradox and conflict,\nThe countless snow-flakes falling--(a swordless conflict,\nYet more than all Rome’s wars of old, or modern Napoleon’s:) the peaceful choice of all,",
        "source": "Walt Whitman, \"Election Day, November, 1884,\" Leaves of Grass (Sands at Seventy).",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a3.png",
          "alt": "Photographic portrait of Walt Whitman, white-bearded, seated, taken by George Collins Cox in 1887.",
          "credit": "Walt Whitman, photographed by George Collins Cox (1887); via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "George Caleb Bingham's The County Election turns an American voting day into a crowded civic panorama — the messy, communal act by which a people decide their own government. Painted after Bingham himself both lost and won bitterly contested elections, it treats the ballot as the ordinary machinery of self-rule, the same machinery Israel's Knesset has now handed back to its citizens for October 27. Every figure climbing the courthouse steps to vote embodies the moment a nation's fate is thrown to the people. It is the peaceful successor to the sword rendered in oil.",
        "excerpt": "Bingham packs a Missouri courthouse square with citizens on election day: a voter swears his oath with a raised hand, an incapacitated man is helped forward, boys play in the dust, and men of every class argue and mingle around the polling table. The painting presents voting as the boisterous, imperfect, deeply human ritual by which a community chooses its course.",
        "source": "George Caleb Bingham, The County Election, 1852, oil on canvas, Saint Louis Art Museum, St. Louis (acc. 124:1944).",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_County_Election.jpg",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a4.png",
          "alt": "A bustling 19th-century American courthouse square on election day, with citizens voting, arguing, and drinking amid a crowd of many social classes.",
          "credit": "George Caleb Bingham, The County Election (1852), Saint Louis Art Museum; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "The final canvas of Bingham's election trilogy, The Verdict of the People, shows the moment the votes are counted and the result announced to an anxious crowd — jubilation, dejection, and everything between as the people's judgment lands. It captures precisely the suspense Israel now enters: having dissolved its parliament, the nation waits for the electorate to render its verdict on Netanyahu's coalition and Eisenkot's insurgent centrists. Bingham freezes the instant when sovereignty visibly passes to the voters. It is the drama of throwing a government's fate to an election, made visual.",
        "excerpt": "In the last painting of his election series, Bingham depicts the public announcement of a vote's outcome: results are chalked and read out, a banner is unfurled, and a diverse throng reacts with triumph and despair. The scene renders the decisive moment when counted ballots become the sovereign verdict of the people.",
        "source": "George Caleb Bingham, The Verdict of the People, 1854-1855, oil on canvas, Saint Louis Art Museum, St. Louis (acc. 45:2001).",
        "href": "https://commons.wikimedia.org/wiki/File:George_Caleb_Bingham_-_The_Verdict_of_the_People.jpg",
        "image": {
          "src": "/covers/israel-knesset-dissolves-october-election--a5.png",
          "alt": "A 19th-century crowd gathered before a building as election results are announced, some celebrating and others dejected.",
          "credit": "George Caleb Bingham, The Verdict of the People (1854-1855), Saint Louis Art Museum; via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "apple-overtakes-nvidia-most-valuable",
    "headline": "Apple overtakes Nvidia as the world's most valuable company, closing near $4.88 trillion as AI-chip stocks slide",
    "overview": "Apple ended Friday worth about $4.88 trillion, edging past Nvidia's roughly $4.86 trillion after Nvidia's shares fell about 3.5%, and reclaiming a title it last held in early 2025. The shift came as investors reassessed the artificial-intelligence trade, with the Philadelphia Semiconductor Index down nearly 19% from its highs. Nvidia had reigned as the world's most valuable company since June 2025.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOQ0dxV3BmWDRMVmZLTHI0bWpNR2hCVTVfdWloZGRCdnZxTUZNNnBQMGs1bm9oVGpiZVVtclBiNkIxQjF5NlFJY2JjalR4cTIyVEg1TVAycGZpakdXQUxZWEtZWEdMemFhVXFDX2RPX21HV05QMnpVU0REaFpOYjlUVVROV09RdFFURmdVS1FUeFRRcUtoZHdTd3ZKRjNjWVk?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/17/apple-nvidia-aapl-nvda-market-cap.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/apple-overtakes-nvidia-most-valuable.png",
      "alt": "Apple's headquarters, Apple Park, in Cupertino, California.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Cyrus of Persia captured Croesus, king of Lydia, he toppled the man the ancient world named the richest and most fortunate alive. Herodotus tells how Croesus, bound atop a burning pyre, suddenly remembered the warning of Solon that no living man may be called happy, because Fortune reverses everyone in time. The victor Cyrus, hearing this, checked himself with the thought that he too was only a man and no more secure. It is the oldest lesson behind Apple's clawing back the crown from Nvidia: the entity perched highest by market value is exactly the one Fortune is next to move, and today's conqueror is tomorrow's cautionary tale.",
        "excerpt": "to Croesus as he stood upon the pyre there came, although he was in such evil case, a memory of the saying of Solon, how he had said with divine inspiration that no one of the living might be called happy.",
        "source": "Herodotus, The History of Herodotus, Book I (Clio), 1.86, trans. G. C. Macaulay",
        "href": "https://lexundria.com/hdt/1.86/mcly",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a0.png",
          "alt": "Attic red-figure amphora showing Croesus enthroned on his funeral pyre, an attendant lighting the flames.",
          "credit": "Croesus on the pyre, Attic red-figure amphora attributed to Myson, c. 500-490 BC, Louvre (G 197). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Cardinal Thomas Wolsey was, after King Henry VIII himself, the most powerful and wealthiest figure in early sixteenth-century England, controlling church and state alike. When he failed to secure the king's divorce he was stripped of office in 1529 and died in disgrace the next year, his sudden fall the defining lesson of a great man cast down from the summit. In George Cavendish's contemporary Life, the dying cardinal reflects that his worldly diligence had earned only ruin. His reversal maps onto Nvidia's slide from the world's most valuable company back below Apple: dominance built on a single favor of fortune, the AI trade, proved as revocable as a king's grace once investors reassessed.",
        "excerpt": "I see the matter against me how it is framed; but if I had served God as diligently as I have done the king, he would not have given me over in my grey hairs.",
        "source": "George Cavendish, The Life of Cardinal Wolsey (written c. 1557), ed. S. W. Singer",
        "href": "https://www.gutenberg.org/files/54043/54043-h/54043-h.htm",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a1.png",
          "alt": "Portrait of Cardinal Thomas Wolsey in red cardinal's robes.",
          "credit": "Cardinal Thomas Wolsey, unknown artist, late 16th century. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Chaucer's Monk defines tragedy itself as the story of one who stood in high degree and fell out of it into misery, illustrating it with a catalogue of the mighty thrown down. His governing image is the wheel of Fortune, whose turning no one can arrest, and whose motion warns against trusting in prosperity. That medieval formula reads like a script for the leaderboard of most-valuable companies, where Nvidia rode to the very top from June 2025 and was spun back down as AI-chip stocks slid. Apple's return to first place is one more turn of the same wheel the Monk describes: the highest seat is the least secure.",
        "excerpt": "For, certain, when that Fortune list to flee, / There may no man the course of her wheel hold: / Let no man trust in blind prosperity; / Beware by these examples true and old.",
        "source": "Geoffrey Chaucer, \"The Monk's Tale,\" The Canterbury Tales",
        "href": "https://en.wikisource.org/wiki/The_Canterbury_Tales_(unsourced)/The_Monk%27s_Tale",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a2.png",
          "alt": "Illuminated portrait of the Monk on horseback from the Ellesmere manuscript of the Canterbury Tales.",
          "credit": "The Monk, Ellesmere Chaucer manuscript, c. 1400-1410, Huntington Library. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shelley's sonnet gives us the shattered colossus of a king who proclaimed himself \"King of Kings\" and commanded the mighty to look on his works and despair, now only a wreck in empty sand. The poem's irony is that the boast of supremacy is precisely what time and reversal mock; nothing beside the ruin remains. Nvidia's reign as the single most valuable company on earth, and the roughly 19 percent slide of the Philadelphia Semiconductor Index from its highs, echo that inscription's hollowing-out. Every claim to be the unassailable summit, whether a pharaoh's or a chipmaker's, invites the same desert wind.",
        "excerpt": "And on the pedestal these words appear: / \"My name is Ozymandias, King of Kings.\" / Look on my works ye Mighty, and despair! / No thing beside remains.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" The Examiner (London), 11 January 1818",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a3.png",
          "alt": "Colossal broken granite bust of Ramesses II, the 'Younger Memnon,' in the British Museum.",
          "credit": "Colossal bust of Ramesses II, the 'Younger Memnon,' c. 1250 BC, British Museum. The statue's acquisition inspired Shelley's poem. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Edward Burne-Jones's monumental painting in the Musee d'Orsay shows Fortune as a grave, towering goddess turning a great wheel to which three naked men are bound: a slave, a crowned king, and a poet. Their nearly identical bodies rise, crest, and plunge in sequence, so that rank is merely a position on the turning rim, held only for a moment. The image is the exact visual grammar of the day Apple edged past Nvidia near $4.88 trillion while Nvidia's shares fell about 3.5 percent. Whoever occupies the top of the wheel, the most valuable company in the world, is by the goddess's own motion the one about to be carried down.",
        "excerpt": "Fortune, an impassive draped giantess, slowly turns a tall wheel to which three bound nude men are fixed, one ascending, one crowned at the summit, and one already pitching downward. Their interchangeable forms make visible that crown and chains alike are only stations on a rim that never stops moving.",
        "source": "Edward Burne-Jones, The Wheel of Fortune (La Roue de la Fortune), oil on canvas, 1875-1883, Musee d'Orsay, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Edward_Burne-Jones_-_The_Wheel_of_Fortune_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a4.png",
          "alt": "Painting of the goddess Fortune turning a large wheel bearing three bound nude men rising and falling.",
          "credit": "Edward Burne-Jones, The Wheel of Fortune (1875-1883), Musee d'Orsay, Paris. Public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Carl Orff opens and closes his 1936 cantata Carmina Burana with \"O Fortuna,\" thundering the medieval poem that likens Fortune to the moon, forever waxing and waning, and addresses her directly as the ever-turning wheel. The surviving thirteenth-century manuscript that gave Orff his text is headed by a painted Wheel of Fortune, kings rising and tumbling around its rim. Sung and pictured, it is the same reversal that saw Nvidia crowned the world's most valuable company in June 2025 and then slip behind Apple as the AI trade was reappraised. The verse insists that supremacy is by nature dissolubilis, always dissolving, exactly as market crowns change hands.",
        "excerpt": "O Fortuna / velut luna / statu variabilis, / semper crescis / aut decrescis... Sors immanis / et inanis, / rota tu volubilis, / status malus, / vana salus / semper dissolubilis.",
        "source": "Anonymous, \"O Fortuna,\" from the Codex Buranus (Carmina Burana), c. 1230; set to music by Carl Orff, Carmina Burana (1936). Text public domain; Latin verbatim.",
        "href": "https://en.wikipedia.org/wiki/O_Fortuna",
        "image": {
          "src": "/covers/apple-overtakes-nvidia-most-valuable--a5.png",
          "alt": "Medieval manuscript miniature of the Wheel of Fortune with figures rising to and falling from a throne at the top.",
          "credit": "Rota Fortunae, Codex Buranus (Carmina Burana), fol. 1r, c. 1230, Bavarian State Library, Munich (Clm 4660). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "china-british-steel-nationalisation",
    "headline": "China says it 'firmly opposes' Britain's nationalisation of British Steel and warns of damaged investor confidence",
    "overview": "China's Ministry of Commerce said it \"firmly opposes and is strongly dissatisfied with\" the UK's decision to nationalise British Steel, taken this week on national-security grounds, warning it had undermined Chinese firms' confidence in investing in Britain. The plant's Chinese owner, Jingye, bought British Steel for 70 million pounds in 2020 and is seeking full compensation. An independent evaluation will determine any payout.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cjd4kvxpd3do"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/17/china-rebukes-uk-over-nationalisation-of-british-steel"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/china-british-steel-nationalisation.png",
      "alt": "An aerial view of British Steel's Scunthorpe works.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 81 BCE the Han court staged the ancient world's great debate on nationalisation, the 'Discourses on Salt and Iron', in which the emperor's ministers defended state monopolies over iron and salt as the indispensable sinews of imperial power and frontier defence. Confucian critics attacked the monopolies as ruinous to private enterprise, but the officials insisted the forge and the salt-pan were too strategic to leave in private hands. Two millennia later the roles are reversed: it is Beijing that protests when Britain reclaims a strategic ironworks for the state, with a Chinese firm cast as the aggrieved private owner. The argument that control of iron is a matter of national survival, not mere commerce, is older than either nation.",
        "excerpt": "邊用度不足，故興鹽、鐵，設酒榷，置均輸，蕃貨長財，以佐助邊費。",
        "source": "Huan Kuan, Discourses on Salt and Iron (鹽鐵論), Chapter 1 'Benyi' (本議), compiled c. 81–49 BCE",
        "href": "https://zh.wikisource.org/wiki/%E9%B9%BD%E9%90%B5%E8%AB%96/%E5%8D%B701",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a0.png",
          "alt": "A Han dynasty cast-iron plough head, product of the state iron industry debated in the Discourses on Salt and Iron",
          "credit": "Han dynasty cast-iron plough, Shaanxi Provincial Museum; photo by Gary Lee Todd via Wikimedia Commons (CC BY-SA)"
        }
      },
      {
        "category": "historical",
        "title": "In March 1951 Iran's parliament nationalised the British-owned Anglo-Iranian Oil Company, seizing the Abadan refinery, then the largest in the world, on grounds of sovereignty over a strategic industry. London reacted much as Beijing does now: with fury over expropriated foreign property, warnings of ruined confidence and demands framed around compensation. The symmetry is sharp, for in 1951 it was Britain's own flagship asset abroad that was taken, whereas today it is Britain seizing a Chinese-owned works at home. The Iranian law justified the act 'for the Happiness and Prosperity of the Iranian nation', the same language of national interest now invoked over British Steel.",
        "excerpt": "For the Happiness and Prosperity of the Iranian nation and for the purpose of securing world peace, it is hereby resolved that the oil industry throughout all parts of the country, without exception, be nationalized; that is to say, all operations of exploration, extraction and exploitation shall be carried out by the Government.",
        "source": "Iran's Oil Nationalization Law, passed by the Majlis (16th Iranian Parliament), 20 March 1951",
        "href": "https://www.mohammadmossadegh.com/news/iran-oil-nationalization-law-1951/",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a1.png",
          "alt": "Portrait of Mohammad Mosaddegh, the Iranian prime minister who nationalised the British-owned Anglo-Iranian Oil Company",
          "credit": "Portrait of Mohammad Mosaddegh, c. 1952 (iichs.ir), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Richard II, the Duke of York warns the king that to seize the banished Bolingbroke's inheritance is to saw off the very branch the crown sits on: lawful property and orderly succession are the foundation of royal legitimacy itself. Break faith with one man's title, York argues, and you unravel the trust that lets any title stand. It is precisely the warning Beijing now levels at Westminster, that stripping Jingye of British Steel corrodes the security of property on which all future foreign investment depends. Shakespeare stages the eternal collision between sovereign power and private right.",
        "excerpt": "Take Hereford's rights away, and take from Time / His charters and his customary rights; / Let not to-morrow then ensue to-day; / Be not thyself; for how art thou a king / But by fair sequence and succession?",
        "source": "William Shakespeare, Richard II, Act II, Scene 1 (the Duke of York to King Richard), c. 1595",
        "href": "https://shakespeare.mit.edu/richardii/richardii.2.1.html",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a2.png",
          "alt": "The Westminster Abbey portrait of King Richard II, c. 1394–95",
          "credit": "Portrait of Richard II, c. 1394–95, Westminster Abbey; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "When Milton's fallen angels build their capital, Pandemonium, they do it by ripping ore from the earth and smelting it in furnaces fed by 'veins of liquid fire', the poem's great image of raw industry as the foundation of political power. The forge and the molten metal are literally what a sovereign realm is built from. British Steel's blast furnaces at Scunthorpe carry the same charge: whoever controls the fire that founds the metal controls a nation's capacity to arm, build and endure, which is exactly why London judged them too strategic to lose. Milton's infernal foundry is a reminder that the furnace has always been read as the sinew of power.",
        "excerpt": "Nigh on the plain, in many cells prepared, / That underneath had veins of liquid fire / Sluiced from the lake, a second multitude / With wondrous art founded the massy ore, / Severing each kind, and scummed the bullion-dross.",
        "source": "John Milton, Paradise Lost, Book I (1667; 1674 edition)",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a3.png",
          "alt": "John Martin's painting Pandemonium, depicting the fiery infernal capital forged by Milton's fallen angels",
          "credit": "John Martin, 'Le Pandemonium' (1841), Musée du Louvre, Paris; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg's 'Coalbrookdale by Night' (1801) shows the Madeley Wood ironworks erupting in flame against the darkness, the furnace as a new kind of national power and the very cradle of the Industrial Revolution that made Britain the workshop of the world. The painting treats iron-smelting as something between a wonder and a conflagration, awesome and consuming at once. That mythology of the furnace as the source of British might is exactly what is at stake when the state steps in to keep British Steel's blast furnaces alight. To let the fires go out is, in this iconography, to let national power itself die.",
        "excerpt": "A nocturne of the Madeley Wood (Bedlam) furnaces, the canvas throws a violent orange glare across the night sky as the ironworks blaze, silhouetting sheds, carts and labouring figures against columns of fire and smoke. De Loutherbourg renders heavy industry as the 'industrial sublime', at once a celebration of the coke-fired blast furnace and an early reckoning with what it unleashes.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801, oil on canvas, Science Museum, London (Science Museum Group Collection)",
        "href": "https://collection.sciencemuseumgroup.org.uk/objects/co65204/coalbrookdale-by-night-by-philippe-jacques-de-loutherbourg",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a4.png",
          "alt": "Coalbrookdale by Night by Philip James de Loutherbourg, showing ironworks furnaces blazing against a dark sky",
          "credit": "Philip James de Loutherbourg, 'Coalbrookdale by Night' (1801), Science Museum, London; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel's 'The Iron Rolling Mill' (1872–75), subtitled 'Modern Cyclopes', is the first great painting of heavy industry: half-stripped workers wrestling white-hot iron in a Silesian mill, the forge as the roaring engine of a newly unified and industrialising Germany. Menzel makes explicit that a nation's steel is made of both fire and human labour, and that such works are instruments of state power as much as commerce. It is that fusion of strategic industry and national identity that makes governments, British or Chinese, fight over who owns the furnace. The mill is not just a business; it is a sinew of the modern state.",
        "excerpt": "In a cavernous, smoke-filled hall, teams of workers strain around a glowing block of white-hot iron drawn from the rolling mill, their bodies lit by the metal's furnace glare. Menzel documents the machinery, heat and toil of modern heavy industry with unflinching realism, giving the picture its subtitle, 'Modern Cyclopes'.",
        "source": "Adolph Menzel, The Iron Rolling Mill (Das Eisenwalzwerk, 'Modern Cyclopes'), 1872–75, oil on canvas, Alte Nationalgalerie, Berlin",
        "href": "https://en.wikipedia.org/wiki/The_Iron_Rolling_Mill_(Modern_Cyclopes)",
        "image": {
          "src": "/covers/china-british-steel-nationalisation--a5.png",
          "alt": "Adolph Menzel's The Iron Rolling Mill, showing workers labouring around white-hot iron in a 19th-century mill",
          "credit": "Adolph Menzel, 'Das Eisenwalzwerk' (1872–75), Alte Nationalgalerie, Berlin (Google Art Project); public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "faa-boeing-self-certify-737-max-787",
    "headline": "The FAA restores Boeing's authority to certify its own 737 MAX and 787 jets as airworthy, effective July 20",
    "overview": "The Federal Aviation Administration said Friday it will let Boeing resume issuing airworthiness certificates for all 737 MAX and 787 aircraft starting July 20, ending step-by-step limits imposed after the fatal MAX crashes and later 787 quality problems. The agency said Boeing's final safety checks now match its own inspections. Government inspectors will keep overseeing Boeing's factories but focus more on catching defects earlier.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNYVhvMVlsS25hUnpxeUZ5VXRXTWtUVlhtMjU5Q2pic1Vfc3NOZm5aSktBaE5PcDYzX3RhZXRPQjlWN3F1SWVYSVJXY3drcTB0aFVETGVlLTlUU1ZHdkwyYjNzVkZtSzVUeTlrTFJpeEtBeVNVMEpTU0xYM1dINHFXRjkyS2JYcE9pMHMzU1o3QUdINldPcWt4b1gzemhXLWk4NmhGMWV3?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxNYTlDV0tMX2FuX2tob2ZJOGdscjgyV2JxSnI1WDdncjdKMV9nMjF6c01ublFWNndKencxcHdRcDQwSGRJUTJhODVhOVltRXhWaVVqZV9kRnBKRkVNQWhZc2R1QkQ4SFhRZjViSmVkeTNmVnVTVlpQYy1qNDNvVzlxUWE1WjN3eGstSnVuQnFnUHpFZV9TSGdIQmo1R3NUZGhCLXI1YWRLdHFLSXAwUlBjWi1GYjhSZFhVM3VqdllTSQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/faa-boeing-self-certify-737-max-787.png",
      "alt": "A Boeing 737 MAX aircraft in flight.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly 3,800 years before the FAA handed Boeing back the power to certify its own jets, Babylon's King Hammurabi confronted the same problem: what to do when the maker of a structure is also the judge of its safety. His law code did not let builders vouch for their own work with a shrug; it made them personally liable, on pain of death, when a house collapsed and killed its owner, and it forced them to rebuild toppling walls at their own expense. The parallel to Boeing is pointed. Where the FAA now trusts Boeing's final safety checks to match its own inspections, the oldest surviving building law insisted the consequences of self-certification fall squarely and severely on the craftsman.",
        "excerpt": "229. If a builder build a house for some one, and does not construct it properly, and the house which he built fall in and kill its owner, then that builder shall be put to death.\n232. If it ruin goods, he shall make compensation for all that has been ruined, and inasmuch as he did not construct properly this house which he built and it fell, he shall re-erect the house from his own means.\n233. If a builder build a house for some one, even though he has not yet completed it; if then the walls seem toppling, the builder must make the walls solid from his own means.",
        "source": "The Code of Hammurabi, laws 229, 232-233, trans. L. W. King (c. 1754 BCE; translation 1915).",
        "href": "https://avalon.law.yale.edu/ancient/hamcode.asp",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a0.png",
          "alt": "The basalt stele of the Code of Hammurabi, its polished top showing the king before the sun god and its lower body densely covered in cuneiform law.",
          "credit": "Code of Hammurabi stele, Musée du Louvre (Sb 8). Photo by Mbzt, CC BY 3.0 via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "When the FAA lets Boeing stamp its own aircraft airworthy while inspectors keep watch over the factory, it revives a bargain medieval England struck with its goldsmiths. In 1300, Edward I's statute let craftsmen mark their own gold and silver, but only against a fixed standard and under the assay of the Guardians of the Craft, who stamped approved wares with the leopard's head. The maker vouched for the metal, yet an independent 'touch' stood between his word and the public's trust. That is precisely the tension in the Boeing decision: self-marking permitted, but only so long as an outside authority still holds the punch.",
        "excerpt": "no goldsmith… shall from henceforth make or cause to be made any manner of vessel, jewel or any other thing of gold or silver except it be of the true alloy […] and that no manner of vessel of silver depart out of the hands of the workers, until further, that it be marked with the leopard's head",
        "source": "Statute of Edward I, 1300 (28 Edw. I c. 20), as quoted by The Goldsmiths' Company Assay Office, 'History of Hallmarking.'",
        "href": "https://www.assayofficelondon.co.uk/about-us/history-of-hallmarking",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a1.png",
          "alt": "Petrus Christus's 1449 panel of a goldsmith seated in his shop, weighing a ring on a small scale as a couple looks on amid shelves of precious wares.",
          "credit": "Petrus Christus, A Goldsmith in His Shop (1449), The Metropolitan Museum of Art (Robert Lehman Collection, 1975). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Boeing story is, at heart, a fable about a brilliant maker trusted to set the limits of his own creation, and no fable states it more plainly than Ovid's account of Daedalus. The master craftsman builds wings and, before flight, gives the safety rule himself: hold the middle course, neither so low the sea drags you down nor so high the sun melts the wax. The disaster comes when the rule is not respected in the air. For an aircraft maker regaining the right to certify that its own designs stay within safe bounds, the ancient warning lands hard: the craftsman may know exactly where the margins lie, and catastrophe can still follow when they are crossed.",
        "excerpt": "Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire {of the sun} should scorch them. Fly between both; and I bid thee neither to look at Boötes, nor Helice, nor the drawn sword of Orion. Under my guidance, take thy way.",
        "source": "Ovid, Metamorphoses, Book VIII (Daedalus and Icarus), trans. Henry T. Riley (1851).",
        "href": "https://www.gutenberg.org/cache/epub/26073/pg26073.txt",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a2.png",
          "alt": "Herbert Draper's painting of the fallen Icarus, his great feathered wings still strapped to his body, mourned by nymphs against a darkening sea and sky.",
          "credit": "Herbert Draper, The Lament for Icarus (exhibited 1898), Tate. Public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "literary",
        "title": "Restoring Boeing's authority is also a story of redemption after catastrophe, and Coleridge gave that arc its most haunting form. His Mariner commits a needless act of destruction, is punished, and hangs the dead albatross about his neck as a mark of guilt, condemned until he can look on the world he wronged with fresh reverence. Only when a spring of love gushes from his heart and he blesses the living creatures does the weight fall from him. The FAA's decision imagines a similar turning: the disgraced maker, having borne the burden of the MAX crashes, is judged to have changed enough to be trusted again. Whether the penitent is truly reformed, or merely unburdened, is the poem's open question and the regulator's gamble.",
        "excerpt": "O happy living things! no tongue\nTheir beauty might declare:\nA spring of love gushed from my heart,\nAnd I blessed them unaware:\nSure my kind saint took pity on me,\nAnd I blessed them unaware.\n\nThe self same moment I could pray;\nAnd from my neck so free\nThe Albatross fell off, and sank\nLike lead into the sea.",
        "source": "Samuel Taylor Coleridge, The Rime of the Ancient Mariner, Part IV.",
        "href": "https://www.gutenberg.org/cache/epub/151/pg151.txt",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a3.png",
          "alt": "Gustave Doré's engraving of the Ancient Mariner's ship beneath a vast albatross with outstretched wings gliding over a moonlit, ice-strewn sea.",
          "credit": "Gustave Doré, illustration for The Rime of the Ancient Mariner (1877). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's most famous panel is the perfect visual gloss on a self-certification gamble gone wrong. In a sunlit, busy harbor world, a ploughman, a shepherd, and a merchant ship all carry on their work while, almost unnoticed in the corner, a pair of legs vanishes into the sea: Icarus has fallen and no one turns to look. The painting's cold point is that catastrophe from an over-reaching maker can slip by while ordinary commerce hums along undisturbed. As Boeing resumes signing off its own 737 MAX and 787 jets, Bruegel's canvas is a warning that the moment a safety margin fails may be quiet, marginal, and easy for a distracted world to overlook until it is too late.",
        "excerpt": "In this oil painting a farmer ploughs the foreground while a shepherd gazes skyward and merchant ships sail a golden bay; only a pair of pale legs disappearing into the water at lower right, and a scatter of feathers, mark the drowning of Icarus, whom no figure in the scene appears to notice.",
        "source": "Attributed to Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1560s), Royal Museums of Fine Arts of Belgium, Brussels (inv. 4030).",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a4.png",
          "alt": "A luminous coastal landscape with a ploughman, shepherd, and sailing ships; in the lower right corner, the legs of the fallen Icarus disappear into the sea, unnoticed.",
          "credit": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus, Royal Museums of Fine Arts of Belgium. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rembrandt's late masterpiece makes the emotional case for the FAA's wager: that a fallen figure can be received back. A ragged son who squandered everything kneels, head shorn and shoes worn through, while his father lays two weathered hands gently on his back in wordless acceptance, an elder brother watching stiffly from the shadows at the right. It is the definitive image of trust restored after ruin, tender but not naive about the doubters standing by. Set against Boeing's return to self-certifying its aircraft, the painting frames the hope behind the decision, and, in the skeptical brother, the unease of those who fear the embrace comes too soon.",
        "excerpt": "In this large, dark canvas a kneeling, ragged son presses his shorn head to the breast of his aged father, whose two hands rest on the son's back in a gesture of forgiveness, while a tall, richly dressed elder brother observes from the shadowed right, his face reserved and unconvinced.",
        "source": "Rembrandt van Rijn, The Return of the Prodigal Son (c. 1668), The State Hermitage Museum, Saint Petersburg.",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_Harmensz._van_Rijn_-_The_Return_of_the_Prodigal_Son.jpg",
        "image": {
          "src": "/covers/faa-boeing-self-certify-737-max-787--a5.png",
          "alt": "Rembrandt's painting of a kneeling, ragged son embraced by his aged father, whose hands rest on his back, as an elder brother watches from the shadows.",
          "credit": "Rembrandt van Rijn, The Return of the Prodigal Son (c. 1668), The State Hermitage Museum. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "meta-anthropic-compute-lease-deal",
    "headline": "Meta and Anthropic are in talks over a compute-leasing deal worth up to $10 billion, sources say",
    "overview": "Anthropic is in early talks to lease data-center computing power from Meta in an arrangement that could be worth as much as $10 billion over two years, according to reports. Anthropic would pay in monthly instalments and either side could exit early. The talks fit Meta's push to show investors its vast AI spending can earn outside revenue, though a deal is not assured.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNS2NqN2VtZFNDLWpDUGxnTXlpZmdWRmI3QlJyeTZSS2cwOEdyVEVGY0NGd3F4UGdqYkVoTjVaUWR0bzJVcW8yY0N1dG1zUnl0UUVDa2dKYVhKU2F5OWJPTWFfSGdZWlRfMjZZdEVxUTRiVDE1LXhMSjR0a0FOMFItVHA3V3FTYlVjU0Mzcy12VG9JbVlORGF2bXBFa1BIUjBNaHR6ZnBn?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/17/anthropic-meta-ai-compute.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/meta-anthropic-compute-lease-deal.png",
      "alt": "Rows of servers inside a data center.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In August 1939 the two most implacable ideological enemies in Europe — Nazi Germany and the Soviet Union — stunned the world by signing a non-aggression pact, each calculating that a temporary handshake with its rival served its own ambitions. Neither trusted the other; both reserved the right to turn the moment it suited them, and within two years the pact lay in ruins. Meta and Anthropic are competitors racing for the same AI future, yet the compute-leasing talks run on the same logic of convenience: a bargain struck between rivals because, for now, the arithmetic works. As in 1939, either side may walk the instant the numbers change.",
        "excerpt": "Should one of the High Contracting Parties become the object of belligerent action by a third power, the other High Contracting Party shall in no manner lend its support to this third power.",
        "source": "Treaty of Non-Aggression between Germany and the Union of Soviet Socialist Republics (Molotov–Ribbentrop Pact), Article II, signed Moscow, 23 August 1939. The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/20th_century/nonagres.asp",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a0.png",
          "alt": "Joseph Stalin and German foreign minister Joachim von Ribbentrop shaking hands in the Kremlin, Moscow, 23 August 1939.",
          "credit": "German Federal Archives (Bundesarchiv, Bild 183-H27337 / CC-BY-SA 3.0), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Near the end of the Peloponnesian War, oligarchic Sparta — self-styled liberator of Greece — did the unthinkable and took gold from the Persian Empire, the very power Greeks had united to repel a generation earlier, to build the fleet that would finally sink Athens. It was a bargain between civilizational rivals: Persia rented Sparta the sinews of war, and Sparta mortgaged its principles to win. Anthropic leasing Meta's data centers echoes this ancient trade — accepting a competitor's resources to power your own bid for supremacy. As the Greeks learned, whoever pays for the fleet holds a lever over its captain.",
        "excerpt": "The Lacedaemonians and their allies made a treaty with the King and Tissaphernes upon the terms following:... The war with the Athenians shall be carried on jointly by the King and by the Lacedaemonians and their allies.",
        "source": "Thucydides, History of the Peloponnesian War, Book VIII (the first treaty between Sparta and Persia, 412/411 BC), trans. Richard Crawley.",
        "href": "https://classics.mit.edu/Thucydides/pelopwar.8.eighth.html",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a1.png",
          "alt": "A gold Persian daric coin (circa 420 BC) depicting the Achaemenid king as an archer — the currency with which Persia financed Sparta's war fleet.",
          "credit": "Achaemenid gold daric, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Aesop's fable of the Horse, the Hunter, and the Stag is the oldest warning about renting a rival's strength. Desperate to beat the Stag, the Horse lets the Hunter bridle and saddle him — and wins — only to discover the Hunter will never dismount. The moral is precisely the anxiety hovering over Anthropic's talks with Meta: accept a stronger partner's help to defeat your enemy, and you may find you have handed that partner the reins. A short-term edge in compute can harden into long-term dependence on the very company you mean to outrun.",
        "excerpt": "\"Not so fast, friend,\" said the Hunter, \"I have now got you under bit and spur, and prefer to keep you as you are at present.\" If you allow men to use you for your own purposes, they will use you for theirs.",
        "source": "Aesop, \"The Horse, Hunter, and Stag,\" in The Fables of Æsop, ed. Joseph Jacobs (London: Macmillan, 1894).",
        "href": "https://en.wikisource.org/wiki/The_Fables_of_%C3%86sop_(Jacobs)/The_Horse,_Hunter,_and_Stag",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a2.png",
          "alt": "1894 illustration of Aesop's fable in which the hunter bridles and mounts the horse to chase down the stag.",
          "credit": "Illustration by Richard Heighway from The Fables of Æsop (Jacobs, 1894), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Shipwrecked and terrified in a storm, Shakespeare's jester Trinculo crawls under the cloak of the monstrous Caliban for shelter, muttering that misery acquaints a man with strange bedfellows. It is the perfect image of an alliance formed not from affection but from necessity — two unlike creatures huddled together because the weather demands it. Meta and Anthropic, rivals caught in the same commercial storm, would be sharing shelter for exactly that reason. Their compute pact, like Trinculo's, lasts only as long as the tempest.",
        "excerpt": "Alas, the storm is come again. My best way is to creep under his gaberdine. There is no other shelter hereabout. Misery acquaints a man with strange bedfellows. I will here shroud till the dregs of the storm be past.",
        "source": "William Shakespeare, The Tempest, Act 2, Scene 2 (Trinculo). Folger Shakespeare Library.",
        "href": "https://www.folger.edu/explore/shakespeares-works/the-tempest/read/2/2/",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a3.png",
          "alt": "Johann Heinrich Ramberg's scene from The Tempest showing Trinculo, Stephano, and the monster Caliban together.",
          "credit": "Johann Heinrich Ramberg, via Wikimedia Commons (Cornell University; public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Paolo Uccello's mid-15th-century panels of the Battle of San Romano immortalize the age of the condottieri — mercenary captains who rented their armies to whichever Italian city-state paid best, sometimes switching sides mid-campaign. The London panel shows the Florentine commander Niccolò da Tolentino, a hired sword, leading a charge in a war waged largely with leased force. It is a gilded monument to the business of renting power: the means of victory bought, not owned. Anthropic contracting Meta's compute is a modern condotta — hiring another's strength for a fixed term, on terms either party can break.",
        "excerpt": "Painted in tempera and gold on poplar and roughly three metres wide, the panel freezes a thicket of lances and armoured horses around the Florentine captain Niccolò da Tolentino, conspicuous in an outsized patterned hat at the head of the charge. Broken spears litter the ground in near-geometric lines, an early experiment in the new science of perspective. It is one of three panels; this one hangs in the National Gallery, London.",
        "source": "Paolo Uccello, The Battle of San Romano (Niccolò Mauruzi da Tolentino at the Battle of San Romano), c. 1438–40, tempera on panel. The National Gallery, London.",
        "href": "https://www.nationalgallery.org.uk/paintings/paolo-uccello-the-battle-of-san-romano",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a4.png",
          "alt": "Paolo Uccello's The Battle of San Romano (London panel), depicting condottieri mercenaries in an armoured cavalry charge amid a forest of lances.",
          "credit": "Paolo Uccello, The National Gallery, London, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Charles Gounod's 1859 opera Faust set to soaring music the oldest fable of the ruinous bargain: the scholar Faust trades his soul for youth and power, and Mephistopheles agrees to serve him now on the understanding that the accounts will be settled later. \"In this world I will be thy slave,\" the devil sings, \"but down below thou must be mine\" — the deal reverses who serves whom the instant the term expires. That is the quiet risk beneath any arrangement where one power leases its strength to another. Anthropic and Meta would each insist they can simply walk away; Faust thought so too.",
        "excerpt": "MÉPHISTOPHÉLÈS: \"Ici, je suis à ton service, / Mais là-bas tu seras au mien.\" (\"In this world I will be thy slave, / But down below thou must be mine.\")",
        "source": "Charles Gounod (music), Jules Barbier and Michel Carré (libretto), Faust, Act I (1859); bilingual French/English libretto, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/45806/45806-h/45806-h.htm",
        "image": {
          "src": "/covers/meta-anthropic-compute-lease-deal--a5.png",
          "alt": "Ary Scheffer's 1848 painting Faust and Mephistopheles, the scholar beside the devil who has bargained for his soul.",
          "credit": "Ary Scheffer (1848), via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "france-blocks-polymarket",
    "headline": "France orders internet providers to block the prediction market Polymarket over unlicensed gambling",
    "overview": "France's national gaming authority, the ANJ, ordered internet service providers to block access to Polymarket, saying the crypto-based prediction platform offers betting that is not authorised under French law. Visits from French internet addresses had climbed to about 579,000 last month despite an existing ban on transactions. Regulators also flagged weather-linked wagers after a Meteo-France probe was hacked to fix bets.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQOWFYYVd5enczTjZ6dDVnaTlWemJmVTRrS2FOTUdZWXR2Zmd1eHhNZ05VREhNb1hlZktlS0UwYkhkbWtxang4MUdWakpKakpkU2NadlAta0otOEc3N1lDLUVTanlVWm1qNjVMS3paTEQ1cEV5Nkg3a21DYUloSzNjd2hCc1ZwRkZ4OW5GMjE4YmpJNm9HVGtTWGZUU2pUeDJ4TFR2MEtlVDdUREFkRnc?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://www.france24.com/en/france/20260717-france-orders-internet-service-providers-to-block-access-to-polymarket"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/france-blocks-polymarket.png",
      "alt": "A smartphone showing an online betting and prediction-market interface.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before ANJ ordered French ISPs to wall off a crypto betting platform, Roman authorities were already drawing a sharp legal line around wagering. The Digest of Justinian, codifying centuries of Roman law, treated the aleator (dice-player) as a disreputable figure and refused legal protection to those who ran or frequented gambling dens. Strikingly, Roman law did not ban all wagering outright: it carved out an exception for bets on contests of skill and courage, much as France licenses regulated betting while condemning games of pure chance like Polymarket's weather wagers. The parallel is exact — a state deciding which bets on uncertain outcomes are lawful and which are vice.",
        "excerpt": "A Decree of the Senate forbids playing for money, except where the parties contend with spears, or by throwing the javelin, or in running, leaping, wrestling, or boxing, for the purpose of displaying courage and address.",
        "source": "The Digest (Pandects) of Justinian, Book XI, Title 5, 'Concerning Gamblers' (De aleatoribus), trans. Samuel P. Scott (1932).",
        "href": "https://droitromain.univ-grenoble-alpes.fr/Anglica/D11_Scott.htm",
        "image": {
          "src": "/covers/france-blocks-polymarket--a0.png",
          "alt": "Ancient Roman fresco from a Pompeii tavern showing two men seated at a table gambling with dice.",
          "credit": "Fresco, Osteria della Via di Mercurio, Pompeii (before 79 CE); photo Wolfgang Rieger, public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "When Henry VIII's Parliament passed the Unlawful Games Act of 1541, it fretted, as France's ANJ does today, about 'crafty' new games luring the public away from sanctioned activity — then archery, now regulated betting. The Tudor statute condemned freshly invented games and imposed penalties on the 'houses' that hosted them, the sixteenth-century equivalent of ordering the shutdown of a gaming venue. Polymarket, a novel crypto contrivance that drew some 579,000 French visits in a single month, is precisely the kind of 'new and crafty game' the powers that be have always moved to suppress. The instinct to blame ingenious operators and close their premises spans five centuries.",
        "excerpt": "divers and many subtil inventative and crafty persons have found and daily find many and sundry new and crafty games and plays, as logating in the fields, slide-thrift, otherwise called shove-groat...archery is sore decayed, and daily is like to be more minished",
        "source": "Unlawful Games Act 1541 (33 Henry VIII, c. 9), as quoted in the 1911 Encyclopædia Britannica, 'Gaming and Wagering.'",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gaming_and_Wagering",
        "image": {
          "src": "/covers/france-blocks-polymarket--a1.png",
          "alt": "Sixteenth-century oil painting of finely dressed figures gathered around a table playing cards.",
          "credit": "Lucas van Leyden, The Card Players, c. 1517, National Museum, Warsaw; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Meteo-France detail — a probe allegedly hacked to fix weather-linked bets — has an ancient literary twin in the Mahabharata's fateful game of dice. There, the cunning Sakuni plays for the Kaurava side with loaded dice, declaring victory again and again as Yudhishthira stakes and loses his wealth, his kingdom, his brothers, and finally his wife. The epic frames the rigged wager as a civilizational catastrophe, the spark that ignites a ruinous war — a warning that when the outcome of a bet can be secretly manipulated, the whole social order is imperilled. Regulators blocking a market over fixable, weather-linked wagers are grappling with the very anxiety this three-thousand-year-old scene dramatizes.",
        "excerpt": "Hearing these words, Sakuni ready with the dice, and adopting unfair means, said unto Yudhishthira, 'Lo, I have won!'",
        "source": "The Mahabharata, Book 2 (Sabha Parva), Section LX, trans. Kisari Mohan Ganguli (1883–1896).",
        "href": "https://en.wikisource.org/wiki/The_Mahabharata/Book_2:_Sabha_Parva/Section_LX",
        "image": {
          "src": "/covers/france-blocks-polymarket--a2.png",
          "alt": "Mural depicting the great gambling scene of the Mahabharata, with figures gathered at the dice game in a royal assembly.",
          "credit": "Mural after Basawan and Daswanth, Albert Hall Museum, Jaipur; photo Neek-Theri, CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Dostoevsky's The Gambler captures the compulsive pull that makes prediction markets and roulette wheels alike so alarming to regulators. His narrator describes the moment of winning not as prudence rewarded but as an intoxicating dare against fate itself, an urge to keep staking that overrides all reason. This is exactly the behavior France's gaming authority invokes when it treats Polymarket as unlicensed gambling rather than harmless forecasting: the platform's appeal is the same defiant thrill of betting on an uncertain future. The novel, drawn from Dostoevsky's own ruinous addiction, is the enduring portrait of why the state fears the wager.",
        "excerpt": "That, of course, was the proper moment for me to have departed, but there arose in me a strange sensation as of a challenge to Fate—as of a wish to deal her a blow on the cheek, and to put out my tongue at her.",
        "source": "Fyodor Dostoevsky, The Gambler (1866), trans. C. J. Hogarth.",
        "href": "https://www.gutenberg.org/files/2197/2197-h/2197-h.htm",
        "image": {
          "src": "/covers/france-blocks-polymarket--a3.png",
          "alt": "Vasily Perov's 1872 portrait of a pensive Fyodor Dostoevsky seated with clasped hands.",
          "credit": "Vasily Perov, Portrait of F. M. Dostoevsky, 1872, State Tretyakov Gallery, Moscow; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Caravaggio's The Cardsharps stages the exact fear driving France's crackdown: that behind every wager on chance lurks the possibility of a fix. A naive young player studies his hand while an accomplice signals his cards and a second cheat hides extra cards behind his back, ready to swap them in. Painted around 1595, it made Caravaggio's reputation precisely because it exposed the rigged mechanics beneath the game of fortune — the same suspicion regulators voiced when a Meteo-France probe was hacked to determine bets. The canvas is a timeless image of the gulf between the gambler's trust in luck and the manipulation that can decide the outcome.",
        "excerpt": "A finely dressed boy plays cards against an older youth who, watched by a mustachioed conspirator peering over his shoulder, reaches behind his back for concealed cards, while daggers and a backgammon-like edge hint at the danger of the swindle. The scene freezes the instant of deception, contrasting the innocent player's concentration with the cheats' collusion.",
        "source": "Caravaggio (Michelangelo Merisi), The Cardsharps, c. 1595, oil on canvas, Kimbell Art Museum, Fort Worth.",
        "href": "https://en.wikipedia.org/wiki/Cardsharps",
        "image": {
          "src": "/covers/france-blocks-polymarket--a4.png",
          "alt": "Caravaggio painting of a young card player being cheated by two conspirators, one hiding cards behind his back.",
          "credit": "Caravaggio, The Cardsharps, c. 1595, Kimbell Art Museum; public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Georges de La Tour's The Cheat with the Ace of Diamonds, hanging in the Louvre, turns a card table into a moral tableau about the perils of the wager. A richly dressed young man, absorbed in his hand and his pile of gold, is oblivious to the three figures conspiring to strip him of it — the cheat drawing a hidden ace from his belt, the courtesan and servant exchanging glances. Painted around 1636, it presents gambling as a trap laid by the crafty for the unwary, the seventeenth-century artist's verdict on betting as vice. It is the visual argument France's regulators are making when they cast an unlicensed prediction market as a snare rather than a game.",
        "excerpt": "By candid, theatrical light, a lavishly dressed youth ponders his cards and coins while, unseen by him, a cardsharp slides a concealed ace of diamonds from behind his sash and two women trade knowing looks. The painting distills gambling, wine, and lust into a single quiet moment of impending fleecing.",
        "source": "Georges de La Tour, The Cheat with the Ace of Diamonds (Le Tricheur à l'as de carreau), c. 1636, oil on canvas, Musée du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Le_Tricheur_%C3%A0_l'as_de_carreau_-_Georges_de_La_Tour_-_Mus%C3%A9e_du_Louvre_Peintures_RF_1972_8.jpg",
        "image": {
          "src": "/covers/france-blocks-polymarket--a5.png",
          "alt": "Georges de La Tour painting of card players in which one man draws a hidden ace of diamonds from his belt to cheat a wealthy young player.",
          "credit": "Georges de La Tour, Le Tricheur à l'as de carreau, c. 1636, Musée du Louvre; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "eu-carbon-market-slowdown",
    "headline": "The EU proposes slowing its carbon-market emissions cuts and handing industry about 6 billion euros in extra free permits",
    "overview": "The European Commission proposed on Friday to slow the pace at which its Emissions Trading System tightens, cutting the annual \"linear reduction factor\" and granting heavy industry billions in additional free CO2 permits to protect competitiveness. A fast-tracked measure would add free allowances worth about 6 billion euros for 2026-2030, and free permits for heavy industry would run to 2038. Environmental groups said the plan weakens the bloc's flagship climate tool.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ckgv0zd497zo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOYS1kcGtvX2FiY0N0Rl9Ta0txX19fcUZJU3VWMDdqLU51Y1hpVmtyZ040UERmSzJROWdMVWZ4ZlhoRFVRY2V2R3NPRERFTWJvQU51VkkxZkVGMTlzYTJZaURHWmd6V1dwMWxpdGxneUpkby1YekZMdzFnRHJUVlNRZ1Bkdk5lanlhMTNqNy0wZnQ0MldNNHRpMHc5LXpETWtMZm8xRzN3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/eu-carbon-market-slowdown.png",
      "alt": "Cooling towers releasing steam at the Jaenschwalde lignite-fired power station in Germany.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the early 1500s the Church sold indulgences: pay a fee, and a soul could be sprung from purgatory without changing one's conduct. The pardon-sellers turned the hard, distant work of penance into a purchasable convenience, letting buyers keep sinning while the account came due later. The EU's extra free CO2 permits work along the same logic in reverse: heavy industry receives roughly 6 billion euros in allowances that let it keep emitting now, deferring the harder reckoning of decarbonisation. When a promise about a distant common good can be bought down with a payment today, the vow itself loses its bite.",
        "excerpt": "They preach man who say that so soon as the penny jingles into the money-box, the soul flies out [of purgatory].",
        "source": "Martin Luther, Disputation of Doctor Martin Luther on the Power and Efficacy of Indulgences (the Ninety-five Theses), Thesis 27, 1517.",
        "href": "https://en.wikisource.org/wiki/Disputation_of_Doctor_Martin_Luther_on_the_Power_and_Efficacy_of_Indulgences",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a0.png",
          "alt": "A 1510 German woodcut depicting the sale of indulgences, with clergy handing pardon-letters to buyers who pay coins into a coffer.",
          "credit": "Sale of indulgences, woodcut, c. 1510, unknown artist. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 30 September 1938 Neville Chamberlain stepped off the plane from Munich and told a relieved crowd he had brought back \"peace for our time,\" having conceded Czechoslovak territory to Hitler to avoid an immediate confrontation. The comfort was real but bought at the future's expense: the concession bought a year of calm and a far larger cost. The EU's decision to slow its Emissions Trading System, cut the linear reduction factor and hand industry billions in free permits is a similar trade of present ease for a heavier bill later. It relaxes a hard commitment under pressure, buying short-term competitiveness while the climate deadline it was meant to meet moves no closer.",
        "excerpt": "My good friends, this is the second time in our history that there has come back from Germany to Downing Street peace with honour. I believe it is peace for our time.",
        "source": "Neville Chamberlain, remarks at 10 Downing Street, 30 September 1938.",
        "href": "https://en.wikipedia.org/wiki/Peace_for_our_time",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a1.png",
          "alt": "Neville Chamberlain holding the Anglo-German Declaration paper at Heston Aerodrome on 30 September 1938 after returning from Munich.",
          "credit": "Neville Chamberlain at Heston Aerodrome, 30 September 1938. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Marlowe's tragedy, Doctor Faustus signs a deed granting Lucifer his body and soul in exchange for twenty-four years of power and pleasure, treating a distant catastrophe as a price worth paying for present gain. The bargain feels like freedom until the clock runs out and the bill falls due in full. The EU's move to loosen its flagship climate tool for near-term industrial comfort carries the same structure: enjoy the allowances now, defer the cost to a horizon that runs to 2038. Faustus's deed is a warning that promises which mortgage the future for present relief tend to be honoured on the future's terms, not ours.",
        "excerpt": "I, JOHN FAUSTUS, OF WERTENBERG, DOCTOR, BY THESE PRESENTS, DO GIVE BOTH BODY AND SOUL TO LUCIFER PRINCE OF THE EAST, AND HIS MINISTER MEPHISTOPHILIS; AND FURTHERMORE GRANT UNTO THEM, THAT, TWENTY-FOUR YEARS BEING EXPIRED, THE ARTICLES ABOVE-WRITTEN INVIOLATE, FULL POWER TO FETCH OR CARRY THE SAID JOHN FAUSTUS, BODY AND SOUL, FLESH, BLOOD, OR GOODS, INTO THEIR HABITATION WHERESOEVER.",
        "source": "Christopher Marlowe, The Tragical History of Doctor Faustus, Scene V, c. 1604 (Project Gutenberg edition).",
        "href": "https://www.gutenberg.org/cache/epub/779/pg779.txt",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a2.png",
          "alt": "Frontispiece woodcut to a 1620 printing of Doctor Faustus, showing Faustus in a magic circle conjuring a devil.",
          "credit": "Frontispiece to the 1620 quarto of Doctor Faustus. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aesop's grasshopper sings away the summer while the ants store grain, then arrives at their door starving when winter comes, having chosen present ease over provision for a foreseeable hard season. The fable is a parable of resolve for a distant common good: the discipline is dull now but decisive later. Slowing emissions cuts and granting industry billions in extra free permits chooses the grasshopper's summer, easing the pace of the hard work that the climate winter will demand. The moral is unsentimental about who pays when providence is traded for comfort.",
        "excerpt": "THE ANTS were spending a fine winter's day drying grain collected in the summertime. A Grasshopper, perishing with famine, passed by and earnestly begged for a little food. The Ants inquired of him, \"Why did you not treasure up food during the summer?\" He replied, \"I had not leisure enough. I passed the days in singing.\" They then said in derision: \"If you were foolish enough to sing all the summer, you must dance supperless to bed in the winter.\"",
        "source": "Aesop, \"The Ants and the Grasshopper,\" Aesop's Fables, trans. George Fyler Townsend (Project Gutenberg edition).",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a3.png",
          "alt": "Illustration of the grasshopper begging at the ants' door in the snow while the ants tend their stored grain.",
          "credit": "Milo Winter, illustration for The Aesop for Children, 1919. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Turner's Rain, Steam and Speed shows a black locomotive tearing across a bridge through mist, the sublime new power of the industrial age rendered as both thrilling and ominous, its smoke swallowing the landscape. It is the founding image of a fossil-fuelled economy whose emissions the Emissions Trading System was designed to price and shrink. Softening that system and handing coal- and gas-intensive industry billions in free permits eases the pressure on exactly the smoke Turner painted, letting the engine run harder for longer. The canvas hangs in the National Gallery as a reminder of how seductive, and how enduring, the machinery of emissions has proved.",
        "excerpt": "A dark steam locomotive races toward the viewer over the Maidenhead railway bridge, half-dissolved in rain and steam, while the river valley behind it blurs into golden haze. Turner turns industrial power into a natural force, exhilarating and enveloping at once, its plume of smoke merging with the sky.",
        "source": "J. M. W. Turner, Rain, Steam and Speed – The Great Western Railway, 1844, oil on canvas, The National Gallery, London (NG538).",
        "href": "https://en.wikipedia.org/wiki/Rain,_Steam_and_Speed_%E2%80%93_The_Great_Western_Railway",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a4.png",
          "alt": "Turner's painting of a steam locomotive speeding over a bridge through rain and mist, its smoke merging with a hazy golden sky.",
          "credit": "J. M. W. Turner, Rain, Steam and Speed, 1844, National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Steenwyck's vanitas arranges a skull, a guttering lamp, a lute, a shell and a fine sword on a table, worldly pleasures and powers set beside the certainty that time exhausts them. The genre exists to puncture the illusion that present comfort can be enjoyed without a reckoning. The EU's fast-tracked package buys immediate industrial ease with roughly 6 billion euros in free allowances, the kind of near-term comfort a vanitas is built to question. Set against the painting, the choice to dilute a solemn climate commitment for present relief looks like a still life of goods that the future will quietly repossess.",
        "excerpt": "On a table edge, a human skull sits amid emblems of transience: an extinguished lamp trailing smoke, a lute, a Japanese sword, a large shell and books. A single shaft of light falls across them, and objects tip toward the viewer, as if pleasures and possessions are already slipping away.",
        "source": "Harmen Steenwyck, Still Life: An Allegory of the Vanities of Human Life, c. 1640, oil on oak, The National Gallery, London.",
        "href": "https://en.wikipedia.org/wiki/Still_Life:_An_Allegory_of_the_Vanities_of_Human_Life",
        "image": {
          "src": "/covers/eu-carbon-market-slowdown--a5.png",
          "alt": "A Dutch vanitas still life with a skull, extinguished lamp, lute, shell and sword lit by a diagonal shaft of light.",
          "credit": "Harmen Steenwyck, Still Life: An Allegory of the Vanities of Human Life, c. 1640, National Gallery, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "mexico-chiapas-earthquake",
    "headline": "A magnitude 7.3 earthquake strikes off Mexico's Chiapas coast, triggering a tsunami warning felt in Guatemala and El Salvador",
    "overview": "A magnitude 7.3 earthquake struck about 48 km southwest of Aquiles Serdan off the coast of Chiapas at a depth of 15 km on Friday, the USGS said, prompting a tsunami warning for coastlines within 300 km. Shaking was felt in Guatemala and El Salvador, where residents evacuated buildings. Authorities reported no major damage, though two people were injured and some walls and roofs collapsed in Chiapas.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwyjv3815yxo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxNVWxrSEMwLS01RTJuYy04NmVnVm5jS3Z4a09UWXNZZ21RT0tEVU9YSGNrQW9KM0FQZDZlQ2xyOHR5aGNLM3ppUWNkTG9yaGNodnhlVzJjUXRyNEQ1TUw1VWtTLTZhbXRzSHVuNUNmSjJSMTBUYWR6anNLYmNpaXhXRXpMZ2ZoT0dNY09fSUhtYVJwaU82ZGdOOVVWNWwteGJhR2x0bDZaMzY5VzA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/mexico-chiapas-earthquake.png",
      "alt": "Residents gather in a street in San Salvador after evacuating buildings following the earthquake.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On All Saints' Day, 1 November 1755, a great earthquake off Portugal's coast leveled Lisbon in minutes, then sent the sea rushing back over the survivors who had fled to the open waterfront. The three shocks toppled churches and palaces, fires raged for days, and a tsunami swept the Tagus quay just as one now threatens the Chiapas coast within 300 km of the epicenter. Lisbon became Europe's archetype of the earth as sudden leveller of cities and of the sea's second blow after the ground heaves. The magnitude 7.3 Chiapas quake, felt across Guatemala and El Salvador, echoes that same primal sequence in miniature: the shudder underfoot, the warning to flee the shore.",
        "excerpt": "The 1755 Lisbon earthquake, estimated at magnitude 8.5–9.0, struck offshore in the Atlantic and destroyed most of Portugal's capital, killing tens of thousands. It was followed roughly forty minutes later by a tsunami that surged up the Tagus and along the coast, and by fires that burned for days. The disaster became a defining event for Enlightenment debates on nature, providence, and human vulnerability.",
        "source": "The 1755 Lisbon earthquake (All Saints' Day earthquake), Kingdom of Portugal, 1 November 1755.",
        "href": "https://en.wikipedia.org/wiki/1755_Lisbon_earthquake",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a0.png",
          "alt": "Painted allegory of the 1755 Lisbon earthquake showing collapsing buildings, fleeing figures, and chaos amid the ruins.",
          "credit": "João Glama Ströberle, 'Alegoria ao Terramoto de 1755' (c. 1756–1792), Museu Nacional de Arte Antiga, Lisbon. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "At 7:17 on the morning of 19 September 1985, a magnitude 8.0 earthquake off Mexico's Pacific coast rippled inland and shattered Mexico City, collapsing more than 400 buildings and killing thousands. Hospitals, apartment blocks, and offices pancaked as the soft lakebed soil amplified the shaking hundreds of kilometers from the offshore rupture. It remains the nation's deepest scar and its most vivid reminder that the ground beneath human works can betray them without warning. The Chiapas tremor, offshore and coastal like 1985, revives that Mexican memory of the earth as a levller of cities, even when this time the toll was mercifully light.",
        "excerpt": "The 1985 Mexico City earthquake had a moment magnitude of 8.0 and struck off the Pacific coast in the Michoacán subduction zone. Though the epicenter lay far away, the city's ancient lakebed sediments amplified the waves, collapsing 412 buildings and seriously damaging thousands more. At least 5,000 people died, and the catastrophe reshaped Mexican building codes and civil-defense preparedness.",
        "source": "The 1985 Mexico City earthquake, 19 September 1985.",
        "href": "https://en.wikipedia.org/wiki/1985_Mexico_City_earthquake",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a1.png",
          "alt": "Rubble of the collapsed General Hospital in Mexico City after the September 1985 earthquake.",
          "credit": "U.S. Geological Survey (USGS), 1985. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Chapter 5 of Voltaire's 'Candide' (1759), the hero and Pangloss reach Lisbon just as the great earthquake strikes, the sea foaming over the harbor and thirty thousand crushed under the ruins. Voltaire used the real 1755 catastrophe to demolish the comfortable philosophy that this is 'the best of all possible worlds,' making the shaking earth a scandal against human optimism. The passage fuses the two threats now hanging over Chiapas: the collapsing walls and roofs, and the sea heaving up in the harbor. It is literature's sharpest image of nature's indifferent power over human works and human reasoning alike.",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, 'Candide; or, The Optimist,' Chapter V (first published 1759), Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a2.png",
          "alt": "Allegorical painting of the 1755 Lisbon earthquake, the catastrophe Voltaire dramatized in Candide.",
          "credit": "João Glama Ströberle, 'Alegoria ao Terramoto de 1755' (c. 1756–1792), Museu Nacional de Arte Antiga, Lisbon. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Writing to the historian Tacitus, Pliny the Younger recalled standing at Misenum in AD 79 as Vesuvius erupted, the ground convulsing so violently that buildings tottered and the sea was sucked backward off its own shore. His letter is Western literature's first great eyewitness account of the terror of the shaking earth and of the ocean withdrawing before it surges back, the very sequence behind today's tsunami warnings. The stranded sea creatures on the widened shore he describes are the ancient signature of the tsunami hazard now feared along the Chiapas coast. Nearly two millennia on, his words still capture the human awe before nature's sudden power.",
        "excerpt": "The buildings all round us were beginning to totter, and, though we were in the open, the courtyard was so narrow that we were greatly afraid, and indeed sure of being overwhelmed by their fall. ... Moreover, we saw the sea drawn back upon itself, and, as it were, repelled by the quaking of the earth. The shore certainly was greatly widened, and many marine creatures were stranded on the dry sands.",
        "source": "Pliny the Younger, 'Letters,' Book 6, Letter 20 (to Cornelius Tacitus), J. B. Firth translation.",
        "href": "https://www.attalus.org/old/pliny6.html",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a3.png",
          "alt": "Engraving of a city struck by earthquake and tsunami, echoing Pliny's account of the earth shaking and the sea drawn back.",
          "credit": "Anonymous copper engraving, 1755, depicting earthquake and tsunami; original in Museu da Cidade, Lisbon. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Hokusai's 'Under the Wave off Kanagawa,' the famous Great Wave of around 1830–32, freezes the instant a towering sea claws over fragile boats while Mount Fuji sits small and still on the horizon. More than any image, it distills the sea's threat after the ground heaves, the very fear that drove residents of Guatemala and El Salvador to evacuate the shore. The wave's grasping fingers of foam make nature's power over human works vivid and immediate. Held in the Metropolitan Museum of Art, it is the world's most recognized emblem of the ocean rising against those who live at its edge.",
        "excerpt": "This color woodblock print, from Hokusai's series 'Thirty-six Views of Mount Fuji,' shows an enormous cresting wave with clawlike crests of foam about to crash down on slender fishing boats, while a diminished Mount Fuji appears in the distance. The composition sets human vulnerability against the immense, indifferent force of the sea. It has become the defining visual symbol of the ocean's threat to coastal life.",
        "source": "Katsushika Hokusai, 'Under the Wave off Kanagawa (Kanagawa oki nami ura),' also known as The Great Wave, from 'Thirty-six Views of Mount Fuji,' c. 1830–32. The Metropolitan Museum of Art, New York, accession no. JP1847.",
        "href": "https://www.metmuseum.org/art/collection/search/45434",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a4.png",
          "alt": "Hokusai's Great Wave, a giant cresting ocean wave with foam claws towering over small boats, Mount Fuji in the distance.",
          "credit": "Katsushika Hokusai, 'Under the Wave off Kanagawa' (c. 1830–32), The Metropolitan Museum of Art (JP1847). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "This anonymous copper engraving, made in the very year of 1755, shows Lisbon in ruins and flames as tsunami waves rush over the harbor, sinking ships and scattering panicked figures in the foreground. Created to circulate news of the catastrophe across Europe, it captures the double blow the Chiapas warning now anticipates: the city thrown down and the sea surging over the wharfs. The disturbed, ship-swallowing water at its center is the visual ancestor of every modern tsunami alert. Preserved in the Museu da Cidade in Lisbon, it stands as an early attempt to picture the earth's terror and the ocean's threat in a single frame.",
        "excerpt": "This 1755 copper engraving depicts Lisbon during the earthquake of 1 November 1755, showing the city in ruins and in flames while tsunami waves rush upon the shore and destroy the wharfs. The harbor is filled with highly disturbed water that sank many ships, and passengers in the left foreground show signs of panic. It is one of the earliest printed images to depict an earthquake and its accompanying sea surge together.",
        "source": "Anonymous, copper engraving of the 1755 Lisbon earthquake and tsunami, 1755. Original in Museu da Cidade (Museum of Lisbon), Lisbon.",
        "href": "https://commons.wikimedia.org/wiki/File:1755_Lisbon_earthquake.jpg",
        "image": {
          "src": "/covers/mexico-chiapas-earthquake--a5.png",
          "alt": "1755 copper engraving of Lisbon in ruins and flames with tsunami waves overwhelming ships in the harbor and panicked figures fleeing.",
          "credit": "Anonymous copper engraving, 1755; original in Museu da Cidade, Lisbon. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "spacex-starship-abort",
    "headline": "SpaceX aborts a Starship launch at the last second after engine trouble, wiping about $100 billion off its value",
    "overview": "SpaceX aborted its first Starship test flight since going public when four of the booster's 33 engines failed to ignite on Thursday, triggering an automatic hold on the launch pad. Elon Musk said two Raptor engines would be swapped out and a new attempt is planned for early next week. The setback sent the newly public company's shares down about 6%, erasing roughly $100 billion in value.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNajJ3ejNxMzdaYVBnMEdzbGR2SHdoZEhYQVJrVXhweUppX1NTRUk3RmlpMW9lcHZMTTdMcjM2b1FiREdqVWwxa2wyY2ltRFFxTlp1NEtSMnRnbEdXLU1ZMkxZNmVHamtveVJGOU5YRWE5ZDBOMzFNZ1NTZnZaRVlkdWRfRzNzcV8xVHR6Q004M19HMUxDR2Jv?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxNWGtOV1BXNFVRbFBRd1l5MFR0WTlDVWxDQ1piUUhNNVVGVWVzY0FrNUNlQVFRaWZmXzViZHNLb0pKZFhuMVllNXM1aHR0aWtTY1A4YjBmbzRfaHRVTG5RUWpXTEpVUmw5YW9waXpIYVZlRUh1ellsN2VHbHRUYTc3R2lEbFl4Z0l2THFJazd1c3p3UXNxVG1GNXc3aVRfMzIxUUtueTAwUDVyb29nVVdVc3d1YmdBOUthRnFtTXBmcTBuVFZrZzZJdTJ3Zi1SVmc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/spacex-starship-abort.png",
      "alt": "SpaceX's Starship rocket stands on its launch pad.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On August 9, 1896, the German aviation pioneer Otto Lilienthal—the first man to make repeated, controlled glider flights—stalled in a gust over the Rhinow Hills, plunged from about fifty feet, and broke his neck, dying the next day. He had spent years methodically reaching toward powered flight, only to be checked at the very edge of the achievement. Like SpaceX's Starship, halted on the pad when four of thirty-three engines failed to ignite, Lilienthal embodies the fragile machine straining against human ambition, where a single flaw at the threshold undoes the ascent. His often-repeated maxim—that progress demands its casualties—reads as an epitaph for every craft that fails just short of the sky.",
        "excerpt": "Opfer müssen gebracht werden! (Sacrifices must be made!)",
        "source": "Otto Lilienthal, reported last words, 1896; see \"The Last Words of Otto Lilienthal,\" Smithsonian Magazine (Air & Space)",
        "href": "https://www.smithsonianmag.com/air-space-magazine/last-words-otto-lilienthal-180960084/",
        "image": {
          "src": "/covers/spacex-starship-abort--a0.png",
          "alt": "Otto Lilienthal in flight on one of his gliders, launching from the Fliegeberg, 29 June 1895",
          "credit": "Photograph attributed to Richard Neuhauss, 1895; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On December 12, 1965, the Gemini VI-A crew—Wally Schirra and Tom Stafford—sat atop a fully fueled Titan II when its engines ignited and then, after roughly 1.5 seconds, abruptly shut down, triggering an automatic hold. The mission clock had started, yet Schirra, feeling no motion, correctly judged the rocket had not left the pad and chose not to fire the ejection seats, saving the flight. The cause was traced to an electrical umbilical plug and a dust cap left on an engine component—tiny faults arresting a giant machine at the instant of departure. It is the near-exact ancestor of the Starship abort: engines that lit and quit, a launch checked at the last second, and a swift turnaround for a second attempt days later.",
        "excerpt": "The Gemini VI-A launch vehicle's engines ignited on December 12, 1965, but shut down after about 1.5 seconds, triggering a pad abort. Commander Wally Schirra, feeling no liftoff, declined to eject the crew, and the mission flew successfully three days later. The shutdown was traced to a released umbilical plug and a dust cap inadvertently left on an engine component.",
        "source": "NASA, \"Gemini VI\" mission history; and National Air and Space Museum, \"Failure to Launch: The Heart-Stopping Pad Shutdown of Gemini VI-A\"",
        "href": "https://www.nasa.gov/mission/gemini-vi/",
        "image": {
          "src": "/covers/spacex-starship-abort--a1.png",
          "alt": "Astronauts Wally Schirra and Tom Stafford sitting through the Gemini 6 pad abort, 12 December 1965",
          "credit": "NASA, 1965; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Book VIII of Ovid's Metamorphoses, Daedalus fashions wings of feathers and wax and warns his son Icarus to hold the middle course—neither too low, where the sea will drag him, nor too high, where the sun will burn him. Exhilarated by flight, Icarus soars too near the sun; the wax melts, the feathers scatter, and he beats bare arms against the empty air before the sea swallows his cry. The myth is the ur-story of ambition punished at the height of its reach, the fragile contrivance failing precisely when it carries a man toward the heavens. Starship's aborted ascent—engineering that lifts humanity's aspirations only to be checked by its own delicate parts—is Icarus caught, this time, before the fall.",
        "excerpt": "but as he neared the scorching sun, its heat softened the fragrant wax that held his plumes; and heat increasing melted the soft wax—he waved his naked arms instead of wings, with no more feathers to sustain his flight. And as he called upon his father's name his voice was smothered in the dark blue sea.",
        "source": "Ovid, Metamorphoses, Book VIII, translated by Brookes More (1922), via the Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=8:card=183",
        "image": {
          "src": "/covers/spacex-starship-abort--a2.png",
          "alt": "Detail of Icarus's legs disappearing into the sea in Bruegel's Landscape with the Fall of Icarus",
          "credit": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "John Milton's Paradise Lost opens with the aftermath of the most catastrophic ascent-turned-fall in the Western imagination: Satan, who dared to storm heaven itself, hurled flaming from the sky into the abyss. His rebellion is the archetype of hubris—overreaching against a power that checks him at the summit of his defiance and casts him down in ruin and combustion. The imagery of fire, wreckage, and a proud engine of ambition dashed earthward mirrors the language markets reached for as Starship's thwarted launch wiped roughly $100 billion from SpaceX's value. Milton reminds us that the loftiest reach toward the heavens is also the one most exposed to a sudden, humbling arrest.",
        "excerpt": "Him the Almighty Power\nHurled headlong flaming from th' ethereal sky,\nWith hideous ruin and combustion, down\nTo bottomless perdition, there to dwell\nIn adamantine chains and penal fire,\nWho durst defy th' Omnipotent to arms.",
        "source": "John Milton, Paradise Lost, Book I, lines 44–49 (1667), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm",
        "image": {
          "src": "/covers/spacex-starship-abort--a3.png",
          "alt": "Rubens' The Fall of Phaeton, showing a chariot and figures plunging through churning clouds",
          "credit": "Peter Paul Rubens, The Fall of Phaeton, c. 1604–08, National Gallery of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's Landscape with the Fall of Icarus, held by the Royal Museums of Fine Arts of Belgium in Brussels, renders catastrophe as a footnote: a ploughman works his field, ships sail on, and only a pair of pale legs vanishing into the sea marks where a boy has fallen from the sky. The painting's genius is its indifference—the great ascent ends, and the world barely pauses. It offers a wry counterpoint to the spectacle of Starship's abort: the machine that reaches for the heavens can be checked in an instant, while commerce and daily life scarcely break stride. Bruegel captures both the grandeur of the attempt and the smallness of the fall within the vast ordinary world.",
        "excerpt": "Oil on panel, c. 1555–1560s, Royal Museums of Fine Arts of Belgium, Brussels. In a sweeping coastal landscape a farmer ploughs and ships sail onward while, almost unnoticed in the lower right, Icarus's thrashing legs disappear beneath the water—the only trace of his fall from the sky.",
        "source": "Pieter Bruegel the Elder (copy after), Landscape with the Fall of Icarus, Royal Museums of Fine Arts of Belgium, Brussels",
        "href": "https://en.wikipedia.org/wiki/Landscape_with_the_Fall_of_Icarus",
        "image": {
          "src": "/covers/spacex-starship-abort--a4.png",
          "alt": "Landscape with the Fall of Icarus: a ploughman and ships in a bay while Icarus's legs sink into the sea",
          "credit": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1555–1560s, Royal Museums of Fine Arts of Belgium; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens's The Fall of Phaeton, in the National Gallery of Art in Washington, freezes the instant of disaster as Phaeton—who begged to drive the sun-god's chariot and could not master it—is thrown from the sky amid rearing horses, tumbling figures, and roiling storm clouds. Zeus's thunderbolt has checked the reckless ascent, and the whole composition churns with the violence of a fall from the heights. It is hubris made visible: the machine of the sun seized by ambition beyond its bearer's control, then struck down. Rubens's tumult mirrors the shock of Starship's arrested launch, where a bold reach toward orbit was halted and the fall was measured in engines and billions.",
        "excerpt": "Oil on canvas, c. 1604–1608, National Gallery of Art, Washington. Rubens depicts the moment Zeus's thunderbolt strikes: Phaeton is flung backward from the sun-god's chariot as panicked horses scatter, allegorical figures tumble through the clouds, and the sky convulses around the ruined flight.",
        "source": "Peter Paul Rubens, The Fall of Phaeton, c. 1604–1608, National Gallery of Art, Washington, D.C.",
        "href": "https://en.wikipedia.org/wiki/The_Fall_of_Phaeton_(Rubens)",
        "image": {
          "src": "/covers/spacex-starship-abort--a5.png",
          "alt": "The Fall of Phaeton: figures and horses plunging through stormy clouds as Phaeton is cast from the sun chariot",
          "credit": "Peter Paul Rubens, The Fall of Phaeton, c. 1604–1608, National Gallery of Art; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "brenda-fricker-dies",
    "headline": "Brenda Fricker, the first Irish woman to win an Oscar, dies at 81",
    "overview": "Brenda Fricker, who in 1990 became the first Irish woman to win an Academy Award, has died at 81, her agent said. She won best supporting actress for playing Christy Brown's mother opposite Daniel Day-Lewis in the 1989 film 'My Left Foot,' and later became widely loved as the pigeon lady in 'Home Alone 2.' She died peacefully in Dublin after a period of ill health.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQWVFEeTc0Tk1sTEVXeTRsU3NTQklfTFc2WXBWOHBuaUQxZ2lmbjRxNWVEX0dLRXZyTmZuUUMzeXBTYWw1ZlBOVlZ6d3NoMzVtSFZqR0RCMG8ya2JhRnAxWER1UDZUaHhxOV82R01MSWp4RFNIVE10Smg4MEtzNXpRanNBUDdjbFVPUUozdHR5N01nNVlKT1E?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPd2lONWZmSjE1OVlwUkxKcGM0X0R3NkZ5ZVJRNUFmTXBMdXI5UmdlS2Z4NnVCRGRVeUFVRnI1VDlsTnVwemtRblFvU1NtM0tKM2RRT0RQb0QtRzZnRjZhenZpdEJqM3ZtUl9ZdXVwMGR2eWFFRWhrcnU3NzVmbzZlNGZDUmxXMjJ4WGRpdFFMRklkNG84dks0aG13QUhuYVplY2Jz?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/brenda-fricker-dies.png",
      "alt": "A theatrical spotlight over an empty stage, marking the death of actress Brenda Fricker.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When David Garrick, the eighteenth century's supreme actor, was carried to Westminster Abbey in 1779, Samuel Johnson mourned that his friend's death had 'eclipsed the gaiety of nations.' The line has ever since stood for the peculiar grief of losing a performer, a person whose whole art was to live vividly in front of us and then be gone. Brenda Fricker's death at 81 gathers the same feeling: the player who gave us Christy Brown's fierce mother and the tender pigeon lady has left the stage, and the roles remain while the woman who breathed them does not. Garrick and Fricker alike remind us that an actor's immortality is only the shadow the footlights leave behind.",
        "excerpt": "...gratified with this character of our common friend; but what are the hopes of man! I am disappointed by that stroke of death, which has eclipsed the gaiety of nations, and impoverished the publick stock of harmless pleasure.",
        "source": "Samuel Johnson, \"Life of Edmund Smith,\" in Lives of the English Poets (1779–81); Project Gutenberg, Lives of the Poets, Volume 1 (eBook #9823).",
        "href": "https://www.gutenberg.org/cache/epub/9823/pg9823.txt",
        "image": {
          "src": "/covers/brenda-fricker-dies--a0.png",
          "alt": "Sir Joshua Reynolds's painting of the actor David Garrick pulled between the female figures of Tragedy and Comedy.",
          "credit": "Sir Joshua Reynolds, 'David Garrick Between Tragedy and Comedy' (1760–61). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "For seven centuries the medieval hymn 'Stabat Mater' has fixed an image at the center of Christian art: the mother standing beneath her suffering child, refusing to look away. That figure of the mater dolorosa, the devoted and enduring mother, is precisely what Brenda Fricker embodied as Bridget Brown, cradling and fighting for her disabled son in 'My Left Foot,' the role that made her the first Irish woman to win an Oscar. The hymn's Mary and Fricker's Bridget belong to the same long lineage of maternal steadfastness that art keeps returning to. In mourning Fricker, first honored for a mother's devotion, we mourn too that ancient vision of the mother who stays.",
        "excerpt": "Stabat mater dolorosa / iuxta Crucem lacrimosa, / dum pendebat Filius. // At the Cross her station keeping, / stood the mournful Mother weeping, / close to Jesus to the last.",
        "source": "\"Stabat Mater,\" attributed to Jacopone da Todi (13th c.), trans. Edward Caswall, Lyra Catholica (1849); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Stabat_Mater_(Caswall,_unsourced)",
        "image": {
          "src": "/covers/brenda-fricker-dies--a1.png",
          "alt": "Titian's painting of the grieving Virgin Mary, hands open and eyes lifted, in mourning.",
          "credit": "Titian, 'Mater Dolorosa with her Hands apart' (c. 1554), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare gave the theatre its most unsparing image of mortality when Macbeth calls life 'but a walking shadow, a poor player / That struts and frets his hour upon the stage, / And then is heard no more.' The metaphor makes every human life a performance that must end, and it falls with special weight on an actor's death. Brenda Fricker spent her hour upon the stage and screen brilliantly, from Dublin's Abbey Theatre to Hollywood, and now is heard no more. Her passing lends Macbeth's bleak lines an unexpected tenderness: the player is gone, but for a while the strutting and fretting was luminous.",
        "excerpt": "Life's but a walking shadow; a poor player, / That struts and frets his hour upon the stage, / And then is heard no more: it is a tale / Told by an idiot, full of sound and fury, / Signifying nothing.",
        "source": "William Shakespeare, Macbeth, Act V, Scene 5; Project Gutenberg (eBook #1533).",
        "href": "https://www.gutenberg.org/files/1533/1533-0.txt",
        "image": {
          "src": "/covers/brenda-fricker-dies--a2.png",
          "alt": "The Chandos portrait, a painted likeness of William Shakespeare with a small gold earring.",
          "credit": "Attributed to John Taylor, the 'Chandos portrait' of William Shakespeare (c. 1600–1610), National Portrait Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In J.M. Synge's Irish tragedy 'Riders to the Sea,' the old mother Maurya, having lost every son to the water, arrives at a hard peace: 'No man at all can be living for ever, and we must be satisfied.' Synge drew from the Aran Islands a portrait of maternal endurance that is unmistakably Irish and unmistakably universal, the same fusion Fricker achieved on screen. As the first Irish woman to win an Oscar, for playing a mother's devotion, Fricker carried that national tradition of the strong, grieving matriarch into world cinema. Her own quiet death in Dublin after a period of ill health reads like Maurya's acceptance: the sea has done its work, and we must be satisfied.",
        "excerpt": "Michael has a clean burial in the far north, by the grace of the Almighty God. Bartley will have a fine coffin out of the white boards, and a deep grave surely. What more can we want than that? No man at all can be living for ever, and we must be satisfied.",
        "source": "J.M. Synge, Riders to the Sea (1904); Project Gutenberg (eBook #994).",
        "href": "https://www.gutenberg.org/cache/epub/994/pg994.txt",
        "image": {
          "src": "/covers/brenda-fricker-dies--a3.png",
          "alt": "Painted portrait of the Irish playwright John Millington Synge.",
          "credit": "John Butler Yeats, portrait of John Millington Synge (c. 1905). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joshua Reynolds enthroned the actress Sarah Siddons as 'The Tragic Muse' in 1784, elevating a working performer to the dignity of myth and proving that a great actress could be immortalized on a museum wall. Brenda Fricker never sought that grandeur, but her Oscar-winning turn as Christy Brown's mother, and her beloved pigeon lady, gave her a comparable claim to be remembered. Reynolds's canvas insists that the fleeting art of the stage deserves to outlast the performer, which is exactly the consolation we reach for when an actor dies. Set beside Siddons's painted majesty, Fricker's passing invites us to frame her, too, among the muses.",
        "excerpt": "Reynolds seats Siddons on a throne among the shadowy allegorical figures of Pity and Terror, her gaze lifted and hand raised in tragic inspiration. The grandeur deliberately borrows from Michelangelo's prophets, casting a living actress as an eternal muse. The painting hangs in the Huntington Art Gallery in San Marino, California.",
        "source": "Sir Joshua Reynolds, \"Sarah Siddons as the Tragic Muse\" (1784), The Huntington, San Marino, California.",
        "href": "https://commons.wikimedia.org/wiki/File:Reynolds,_Sir_Joshua_-_Mrs_Siddons_as_the_Tragic_Muse_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/brenda-fricker-dies--a4.png",
          "alt": "Sarah Siddons seated as a majestic muse, gazing upward, flanked by shadowy allegorical figures.",
          "credit": "Sir Joshua Reynolds, 'Sarah Siddons as the Tragic Muse' (1784), The Huntington. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "James McNeill Whistler's 'Arrangement in Grey and Black No. 1' (1871), universally known as 'Whistler's Mother,' turned a seated elderly woman into the world's most famous emblem of maternal stillness and devotion. It is fitting company for Brenda Fricker, who twice became the mother the world remembered: the ferocious Bridget Brown and the gentle pigeon lady who mothers a lost boy in 'Home Alone 2.' Whistler's austere portrait, hanging in the Musée d'Orsay, honors the quiet, patient dignity that Fricker made her signature. In her death we lose a real embodiment of what the painting distills, the mother who simply, steadfastly, remains.",
        "excerpt": "A grey-haired woman in a black dress sits in strict profile against a muted grey wall, hands folded in her lap, utterly composed. Whistler subordinated sentiment to a severe harmony of tones, yet the image became an enduring icon of motherhood. It is held by the Musée d'Orsay in Paris.",
        "source": "James McNeill Whistler, \"Arrangement in Grey and Black No. 1 (Portrait of the Artist's Mother)\" (1871), Musée d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Whistlers_Mother_high_res.jpg",
        "image": {
          "src": "/covers/brenda-fricker-dies--a5.png",
          "alt": "An elderly woman in a black dress seated in profile against a grey wall, hands resting in her lap.",
          "credit": "James McNeill Whistler, 'Arrangement in Grey and Black No. 1' (1871), Musée d'Orsay. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "gordon-parks-voices-in-the-mirror",
    "headline": "A major survey of photographer Gordon Parks, 'Voices in the Mirror,' celebrates his work and 20 years of his foundation",
    "overview": "A large-scale exhibition, 'Voices in the Mirror,' gathers the most iconic photographs of Gordon Parks (1912-2006), the pioneering Black American photographer, filmmaker and writer, in a survey marking his career and the 20th anniversary of The Gordon Parks Foundation. Parks chronicled American life, poverty and the civil-rights struggle for Life magazine and later directed the film 'Shaft.' The show brings together his portraits and social-documentary images across decades.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/gordon-parks-photography-voices-in-the-mirror-exhibition/"
      },
      {
        "name": "The Gordon Parks Foundation",
        "href": "https://www.gordonparksfoundation.org"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/gordon-parks-voices-in-the-mirror.png",
      "alt": "A gelatin silver photograph by Gordon Parks from the exhibition 'Voices in the Mirror.'",
      "credit": "Courtesy The Gordon Parks Foundation, via Colossal"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Two decades before Gordon Parks picked up what he called his 'weapon of choice,' the Danish-American reporter Jacob Riis was already forcing comfortable New Yorkers to look at the immigrant poor crammed into Lower East Side tenements. His 1890 book 'How the Other Half Lives' paired blunt prose with flash-lit photographs of families sleeping twelve to a room, and it shamed the city into housing reform. Like Parks, Riis understood the camera as evidence that misery could no longer be denied. The through-line from Riis's slum interiors to Parks's images of Harlem and rural Southern poverty is the same conviction: that documenting the downtrodden is the first step toward making them impossible to ignore.",
        "excerpt": "Long ago it was said that 'one half of the world does not know how the other half lives.' That was true then. It did not know because it did not care. The half that was on top cared little for the struggles, and less for the fate of those who were underneath, so long as it was able to hold them there and keep its own seat.",
        "source": "Jacob A. Riis, How the Other Half Lives: Studies Among the Tenements of New York (New York: Charles Scribner's Sons, 1890), Introduction.",
        "href": "https://en.wikisource.org/wiki/How_the_Other_Half_Lives/Introduction",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a0.png",
          "alt": "Impoverished lodgers crowded into a cramped New York tenement room, photographed by Jacob Riis in 1889.",
          "credit": "Jacob Riis, 'Lodgers in a Crowded Bayard Street Tenement — Five Cents a Spot,' 1889. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the century after Riis, the U.S. Farm Security Administration sent photographers like Dorothea Lange across Depression-era America to document rural destitution, and her 1936 portrait of Florence Owens Thompson, 'Migrant Mother,' became the defining image of that suffering. Working within the same federal documentary tradition, Gordon Parks joined the FSA in 1942 and was mentored by its director Roy Stryker, who taught him to aim his lens at inequality. Lange's photograph, held today at the Library of Congress, gave a weathered, dignified face to millions of the anonymous poor. 'Voices in the Mirror' shows Parks carrying that FSA mission forward into the civil-rights era, insisting that the destitute be seen as fully human.",
        "excerpt": "Dorothea Lange's photograph shows a gaunt, worn migrant mother of seven, her children turned away against her shoulders, gazing past the camera with an expression of exhausted resolve. Made in a Nipomo, California pea-pickers' camp for the Farm Security Administration in March 1936, it distilled the Great Depression's rural poverty into a single unforgettable face. The Library of Congress records the original caption as: destitute pea pickers in California, a mother of seven children, age thirty-two.",
        "source": "Dorothea Lange, 'Migrant Mother,' Nipomo, California, 1936. U.S. Farm Security Administration / Library of Congress Prints and Photographs Division, LC-USF34-009058-C.",
        "href": "https://guides.loc.gov/migrant-mother",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a1.png",
          "alt": "Dorothea Lange's 1936 'Migrant Mother': a careworn woman with two children clinging to her shoulders in a California migrant camp.",
          "credit": "Dorothea Lange, 'Migrant Mother,' 1936. Farm Security Administration, Library of Congress. Public domain."
        }
      },
      {
        "category": "literary",
        "title": "Charles Dickens turned the English novel into an instrument of social exposure, and 'Oliver Twist' (1837–39) dragged readers into the workhouse to witness children starved by a system indifferent to their hunger. The scene in which the orphan Oliver dares to ask for a second helping of gruel remains literature's most famous indictment of institutional cruelty toward the poor. Gordon Parks, himself a novelist and memoirist as well as a photographer, worked in exactly this spirit, using the pen and the camera together to make the neglected visible. Both men insisted that art must side with the hungry child rather than the master who denies him.",
        "excerpt": "'Please, sir, I want some more.' The master was a fat, healthy man; but he turned very pale. He gazed in stupefied astonishment on the small rebel for some seconds, and then clung for support to the copper. The assistants were paralysed with wonder; the boys with fear.",
        "source": "Charles Dickens, Oliver Twist; or, The Parish Boy's Progress (1838), Chapter II.",
        "href": "https://www.gutenberg.org/files/730/730-h/730-h.htm",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a2.png",
          "alt": "George Cruikshank's illustration of a small boy holding an empty bowl before the astonished workhouse master, from Oliver Twist.",
          "credit": "George Cruikshank, 'Oliver asking for more,' illustration for Oliver Twist, c. 1837. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Frederick Douglass, born into slavery, wielded the written word as Gordon Parks would later wield the camera: as testimony that the powerful could not refute. In his 1845 'Narrative,' Douglass corrects the comfortable misreading of enslaved people's songs, revealing them not as signs of contentment but as the sound of anguish. That act of bearing accurate witness to Black suffering, and of restoring dignity and inner life to those society had rendered invisible, is precisely the tradition Parks extended a century later across his photographs of segregation and poverty. 'Voices in the Mirror' places Parks in this lineage of Black American witnesses who documented injustice so it could not be denied.",
        "excerpt": "I have often been utterly astonished, since I came to the north, to find persons who could speak of the singing, among slaves, as evidence of their contentment and happiness. It is impossible to conceive of a greater mistake. Slaves sing most when they are most unhappy. The songs of the slave represent the sorrows of his heart; and he is relieved by them, only as an aching heart is relieved by its tears.",
        "source": "Frederick Douglass, Narrative of the Life of Frederick Douglass, an American Slave (Boston: Anti-Slavery Office, 1845), Chapter II.",
        "href": "https://www.gutenberg.org/cache/epub/23/pg23.txt",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a3.png",
          "alt": "Portrait photograph of Frederick Douglass, circa 1879, the formerly enslaved abolitionist writer and orator.",
          "credit": "George Kendall Warren, portrait of Frederick Douglass, c. 1879. National Archives (NARA 558770). Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco Goya's 'The Third of May 1808,' painted in 1814 and now a centerpiece of the Museo del Prado, is one of art history's first great images to take the side of the anonymous victim rather than the conquering hero. Its central figure, a white-shirted man flinging his arms wide before a faceless firing squad, turns state violence into an unforgettable accusation. Goya's decision to render the powerless with such raw dignity anticipates Gordon Parks's photographs of those crushed by segregation and poverty. Like Goya, Parks aimed his art squarely at injustice, trusting that an image of suffering witnessed can indict the system that caused it.",
        "excerpt": "Goya's canvas shows a Spanish civilian, arms thrown open in the posture of a crucifixion, illuminated by a lantern as a rank of Napoleonic soldiers levels their muskets at him and his terrified companions. At his feet lie the already executed, bloodied on the ground, while more victims wait their turn in the darkness. The painting refuses any heroic gloss, confronting the viewer directly with the human cost of oppression.",
        "source": "Francisco de Goya, 'The 3rd of May 1808 in Madrid' (El Tres de Mayo de 1808), 1814, oil on canvas, Museo del Prado, Madrid (P000749).",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a4.png",
          "alt": "Goya's painting of a white-shirted man with arms outstretched facing a firing squad by lantern light, the dead at his feet.",
          "credit": "Francisco de Goya, 'The Third of May 1808,' 1814. Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-François Millet's 'The Gleaners' (1857), one of the treasures of the Musée d'Orsay, scandalized bourgeois Paris by devoting a monumental canvas to three peasant women stooping to gather the leftover grain the harvest had abandoned. Rather than idealize or pity them, Millet granted the rural poor the solemn dignity earlier painters reserved for saints and nobles. That impulse, to make labor and want beautiful and worthy of sustained attention, is the same one that animates Gordon Parks's tender portraits of the poor. 'Voices in the Mirror' shows Parks, like Millet, insisting that those on society's lowest rung deserve to be seen with reverence rather than contempt.",
        "excerpt": "Millet's painting shows three peasant women bent low across a vast, golden field, their hands sweeping the stubble for stray heads of wheat left after the harvest. Behind them, sunlit stacks and a distant overseer on horseback mark the abundance from which they are excluded. The quiet monumentality of their labor lends the rural poor a gravity and dignity that the Salon of 1857 found unsettling.",
        "source": "Jean-François Millet, 'The Gleaners' (Des glaneuses), 1857, oil on canvas, Musée d'Orsay, Paris (RF 592).",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
        "image": {
          "src": "/covers/gordon-parks-voices-in-the-mirror--a5.png",
          "alt": "Millet's painting of three peasant women bending to glean stray wheat in a wide harvested field under a golden sky.",
          "credit": "Jean-François Millet, 'The Gleaners,' 1857. Musée d'Orsay. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "yemen-tanker-hijacked-somali-pirates",
    "headline": "Suspected Somali pirates hijack the chemical tanker Asana in the Gulf of Aden, the second such seizure this month",
    "overview": "Armed men boarded and seized the Tanzanian-flagged oil and chemical tanker Asana in the Gulf of Aden off southern Yemen on Friday, British maritime authorities said, in what appeared to be an act of Somali piracy rather than a Houthi attack. The vessel, bound for Bosaso in Somalia, sent a distress signal, and a South Korean navy ship responded. It was the second suspected pirate hijacking off Yemen this month.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c7vg6dml34vo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxQeVFJX2dfYlJkR3pBRlZVa2Z2cUN5eWJYd251LWZCTml6QVZhU0ZGT2RnNVQ3RVkwVkpaS1dYa2ZZXzF3eG9XQURfWXpuZ0FuRTBxMVZfU1NZZk5MUlpFRDlnakpSb1BRRUc0U1ZhMktSdTNROE1NVEowMGhDTnVQRU1fOHlVMTYtblJHRFZxdXhtUjF1clZTRm9qRVItRWowVTJzOHZrY3lKeEJ4ZmlYQUQydUd0aVF0NVRZRFVBQU1WZGtROE95bzF2dFI?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/yemen-tanker-hijacked-somali-pirates.png",
      "alt": "Sunset over the Gulf of Aden.",
      "credit": "BBC"
    },
    "edition": "Evening Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the tanker Asana was boarded off Yemen, its captors joined one of the oldest categories in Western law: the pirate as enemy of everyone. Writing in 44 BC, as Rome's own sea-lanes were plagued by raiders, Cicero fixed the idea that a pirate stands outside the ordinary rules that bind even wartime enemies, owed neither faith nor sworn oath. This is the ancient root of hostis humani generis, the common enemy of all mankind, and it is exactly the status modern navies invoke when a South Korean warship races toward a hijacked ship in the Gulf of Aden. Two thousand years later, the sea-robber is still legally a creature apart.",
        "excerpt": "Nam pirata non est ex perduellium numero definitus, sed communis hostis omnium; cum hoc nec fides debet nec ius iurandum esse commune.",
        "source": "Cicero, De Officiis (On Duties), Book III, section 107 (44 BC)",
        "href": "https://www.thelatinlibrary.com/cicero/off3.shtml",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a0.png",
          "alt": "Marble bust of the Roman orator and statesman Cicero, Capitoline Museums, Rome",
          "credit": "Bust of Cicero, Musei Capitolini, Rome; photo by Glauco92, Wikimedia Commons (CC BY-SA 3.0)"
        }
      },
      {
        "category": "historical",
        "title": "The seizure of the Asana echoes the early eighteenth-century Golden Age of piracy, when sea-robbers grew so bold that they choked whole trade routes. Captain Charles Johnson's 1724 chronicle records that the pirates of the West Indies became so numerous and formidable that they interrupted the commerce of Europe itself, much as today's hijackings off Yemen threaten one of the world's busiest shipping arteries. Then as now, lightly armed raiders in small craft could paralyze the movement of goods across an entire sea. The 1718 fall of Blackbeard showed how navies answered the threat, just as warships answer distress calls in the Gulf of Aden today.",
        "excerpt": "the Pyrates in the West-Indies have been so formidable and numerous, that they have interrupted the Trade of Europe into those Parts",
        "source": "Captain Charles Johnson, A General History of the Pyrates, Introduction (London, 1724)",
        "href": "https://www.gutenberg.org/cache/epub/40580/pg40580-images.html",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a1.png",
          "alt": "Painting of the 1718 battle in which Blackbeard the pirate is killed by Lieutenant Maynard's men",
          "credit": "Jean Leon Gerome Ferris, 'The Capture of the Pirate, Blackbeard, 1718' (1920), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The distinction that matters in the Asana case, whether armed boarders are honest seafarers or predators, is as old as Homer. In the Odyssey, the aged king Nestor greets unknown arrivals by bluntly asking whether they come to trade or roam the sea as pirates who risk their own lives to bring ruin to strangers. The question captures the exact ambiguity investigators faced off southern Yemen, weighing piracy against a Houthi attack. For the Greeks, the open water was always a place where a sail on the horizon might mean commerce or plunder, a doubt the Gulf of Aden still forces on every passing crew.",
        "excerpt": "Is it on some business, or do ye wander at random over the sea, even as pirates, who wander hazarding their lives and bringing evil to men of other lands?",
        "source": "Homer, Odyssey, Book 3, lines 71-74, trans. A. T. Murray (Loeb Classical Library, 1919)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0136%3Abook%3D3%3Acard%3D71",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a2.png",
          "alt": "Attic red-figure vase showing Odysseus bound to the mast of his ship amid the perils of the sea",
          "credit": "The 'Siren Vase', Attic red-figure stamnos, c. 480-470 BC, British Museum; photo by Jastrow, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Byron's 1814 blockbuster The Corsair gave the sea-raider his most seductive literary mask, opening with a pirate anthem to boundless freedom over the dark blue waves. That romance of the outlaw ranging the Mediterranean is the mythic shadow behind the grim reality off Yemen, where the men who seized the Asana claim the sea as their hunting ground. Byron's corsairs treat the open water as an ungoverned empire answerable to no flag, precisely the lawless condition that lets modern pirates board a Tanzanian-flagged tanker bound for Bosaso. The poem's glamour and the newswire's distress signal describe the same ancient temptation to plunder the trade routes.",
        "excerpt": "O'er the glad waters of the dark blue sea,\nOur thoughts as boundless, and our souls as free,\nFar as the breeze can bear, the billows foam,\nSurvey our empire, and behold our home!",
        "source": "Lord Byron, The Corsair, Canto I (1814)",
        "href": "https://en.wikisource.org/wiki/The_Corsair_(Byron,_1814)/CANTO_I",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a3.png",
          "alt": "Portrait of Lord Byron in ornate Albanian dress with turban and sash",
          "credit": "Thomas Phillips, 'Lord Byron in Albanian Dress' (1813), Government Art Collection, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Howard Pyle's celebrated 1905 oil 'An Attack on a Galleon' distills the terror of the seized ship into a single image: a towering merchantman helpless before a small, lethal pirate craft as gunfire and smoke sweep its decks. That vision of a big vessel overwhelmed by a nimble raider is almost a portrait of the Asana's fate, boarded and taken by armed men in the Gulf of Aden. Pyle painted the plundered wealth of trade routes as the prize, exactly what makes a laden tanker a target today. The painting hangs in the Delaware Art Museum and remains the defining image of piracy in Western popular art.",
        "excerpt": "Oil on canvas, 1905, depicting a great galleon assaulted at close range by a small pirate vessel, its decks swept by smoke and gunfire as the crew is overwhelmed. Painted by Howard Pyle to illustrate his article 'The Fate of a Treasure Town' in Harper's Monthly Magazine, it is the most famous of his many pirate works.",
        "source": "Howard Pyle, 'An Attack on a Galleon' (1905), oil on canvas, Delaware Art Museum, Museum Purchase 1912",
        "href": "https://emuseum.delart.org/objects/1721/an-attack-on-a-galleon",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a4.png",
          "alt": "Painting of a large galleon under attack by a small pirate craft amid smoke and gunfire on the open sea",
          "credit": "Howard Pyle, 'An Attack on a Galleon' (1905), Delaware Art Museum, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Aert Anthoniszoon's early seventeenth-century seascape 'A French Ship and Barbary Pirates' shows a heavily armed trader beset on both sides by corsair galleys, a scene of Mediterranean commerce raiding that European painters returned to again and again. The image speaks directly to the Asana's ordeal off the Somali and Yemeni coasts, where the descendants of that same threat still fall on merchant vessels crossing narrow, vital waters. For centuries the Barbary corsairs made whole sea-lanes perilous, forcing navies to escort and patrol, just as foreign warships now shepherd traffic through the Gulf of Aden. The canvas, held by the National Maritime Museum in Greenwich, is a reminder that hijacking on a trade route is a very old catastrophe.",
        "excerpt": "Oil painting, c. 1615, showing an armed French merchant ship attacked from both sides by Barbary corsair vessels on a choppy sea. The subject of North African pirates preying on Mediterranean shipping was popular in Dutch and Flemish marine painting, reflecting the constant menace to seaborne trade.",
        "source": "Aert Anthoniszoon, 'A French Ship and Barbary Pirates' (c. 1615), oil on panel, National Maritime Museum, Greenwich, London",
        "href": "https://commons.wikimedia.org/wiki/File:A_French_Ship_and_Barbary_Pirates_(c_1615)_by_Aert_Anthoniszoon.jpg",
        "image": {
          "src": "/covers/yemen-tanker-hijacked-somali-pirates--a5.png",
          "alt": "Seventeenth-century marine painting of a French merchant ship attacked on both sides by Barbary corsair vessels",
          "credit": "Aert Anthoniszoon, 'A French Ship and Barbary Pirates' (c. 1615), National Maritime Museum, Greenwich, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "trump-election-security-primetime-2020-china",
    "headline": "Trump uses a primetime White House address to claim China rigged the 2020 election and to cast doubt on U.S. voting before the midterms",
    "overview": "In a half-hour primetime speech from the White House on Thursday, three months before the November midterm elections, President Trump said he had declassified hundreds of intelligence files that he claimed showed China had tried to swing the 2020 election to Joe Biden, alleging that voter data in 18 states had been \"bought, stolen or hacked,\" including 220 million voter files. The U.S. intelligence community has previously concluded that China did not interfere in the 2020 vote, and reporters were not allowed to question the president. China's foreign ministry rejected the accusations as \"entirely fabricated\" and \"malicious smears.\"",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2k9wvv5wyo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPellVNExpdFBaWXp5dlNSTHpOVWRNNUJSRlZHUm1CX2dXVHI0aThrdWpfNmh2T3Q3RERxRWN4dkNzRDFwbUl1OWFYRm9lSjdVaG16cjJLWFI1T29iRV96NXEtclJGZ0tCWm1hcTdaTFhxVTdyS1hKZUczTGs0M2hHbndkQUsxbmlaNEFlZ1d1UkZKSzVObWdLUnhFbmNROXhSeHZGWnRGVUFZS2tTM0tPN1RBLXg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/trump-election-security-primetime-2020-china.png",
      "alt": "President Trump delivering a primetime address from the White House.",
      "credit": "Official White House photo by Daniel Torok, via Wikimedia Commons (public domain, U.S. federal government work)"
    },
    "lead": true,
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 330 BC, defending himself before the Athenian assembly in the speech On the Crown, Demosthenes turned the charge of corruption outward, branding his rival Aeschines a paid agent of Macedon who had sold the city's interests for foreign gold. The accusation of secret foreign money buying a man's loyalty was the classical demagogue's surest weapon: unprovable, inflammatory, and perfectly suited to a crowd primed to suspect betrayal. Trump's primetime claim that China 'bought, stolen or hacked' the votes of 220 million Americans works the same ancient lever, converting political defeat into a story of purchased treason by a foreign power. Then as now, the charge needs no evidence to do its work; it only needs to be spoken loudly enough to poison trust.",
        "excerpt": "You were hired to ruin the interests of your countrymen; and yet, tho you have been caught yourself in open treason, and informed against yourself after the fact, you revile and reproach me for things which you will find any man is chargeable with sooner than I.",
        "source": "Demosthenes, On the Crown (De Corona), 330 BC, trans. Charles Rann Kennedy, in The World's Famous Orations, Vol. I: Greece (1906); Wikisource.",
        "href": "https://en.wikisource.org/wiki/On_the_Crown",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a0.png",
          "alt": "Marble bust of the orator Demosthenes, Roman copy after a Greek original, Louvre Museum",
          "credit": "Photo by Eric Gaba (Wikimedia user Sting), Louvre Museum, Wikimedia Commons, CC BY-SA 2.5; the ancient bust itself is public domain"
        }
      },
      {
        "category": "historical",
        "title": "On February 9, 1950, Senator Joseph McCarthy stood before a Republican women's club in Wheeling, West Virginia, and waved a paper he said held the names of 205 Communist agents burrowed into the State Department. The list was never produced, the number kept changing, and no name was ever proven, but the theatrical brandishing of a secret dossier and a precise, terrifying figure launched a decade of manufactured suspicion. Trump's invocation of 'declassified files' showing Chinese interference in 18 states echoes McCarthy's method exactly: the unseen document, the oddly specific count, the foreign-directed conspiracy that the audience is asked to fear rather than examine. Both men understood that a number held aloft in a spotlight can override the patient findings of every investigator who actually looked.",
        "excerpt": "While I cannot take the time to name all the men in the State Department who have been named as members of the Communist Party and members of a spy ring, I have here in my hand a list of 205.",
        "source": "Joseph R. McCarthy, address to the Ohio County Women's Republican Club, Wheeling, West Virginia, February 9, 1950; United States Senate historical archive.",
        "href": "https://www.senate.gov/about/powers-procedures/investigations/mccarthy-hearings/communists-in-government-service.htm",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a1.png",
          "alt": "Portrait photograph of Senator Joseph R. McCarthy, 1954",
          "credit": "United Press photograph, 1954, via Wikimedia Commons (public domain in the United States)"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Julius Caesar, Mark Antony seizes a public occasion, Caesar's funeral, and turns a grieving crowd into a mob with insinuation and staged revelation, then coldly watches the chaos he has kindled. Left alone after the oration, he drops the mask and admits that his aim was never truth but the unleashing of ruinous passion. The parallel to a leader using a half-hour of primetime television to stir distrust in the vote is precise: the spectacle is the point, and the speaker profits from the disorder that follows. Antony's private glee at the mischief 'afoot' is the demagogue's confession that inflaming the audience, not informing it, was always the plan.",
        "excerpt": "Now let it work. Mischief, thou art afoot,\nTake thou what course thou wilt!",
        "source": "William Shakespeare, Julius Caesar, Act III, Scene ii (c. 1599); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a2.png",
          "alt": "Title page of the 1623 First Folio of Shakespeare's Comedies, Histories, & Tragedies with the Droeshout engraving",
          "credit": "Martin Droeshout engraving, First Folio title page, 1623, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "George Orwell's Nineteen Eighty-Four imagines a state where the enemy is whatever the leader names it that day, where citizens are marshaled into ritual hatred of a foreign power, and where the record of the past is 'rectified' to match the needs of the present. The Party's genius is not that it lies, but that it makes the public doubt any settled fact, so that yesterday's official conclusion can be overwritten tonight. Trump's primetime reversal of the intelligence community's own finding, that China did not interfere in 2020, enacts this logic in real time: the verified past is declassified into a new fiction, and distrust becomes the governing atmosphere. Orwell's warning was never about a single lie but about the manufacture of a reality in which no one can be sure what is true.",
        "excerpt": "Orwell's Oceania stages a daily Two Minutes Hate in which the population is whipped into fury against a shifting external enemy, Eurasia one week, Eastasia the next, and told to believe the switch was always so. In the Ministry of Truth, Winston Smith spends his days feeding inconvenient records down the 'memory hole,' rewriting history so that the Party's latest claim becomes the only past anyone can cite. The horror is quiet and bureaucratic: not the boot on the face alone, but the calm erasure of the very facts against which a lie could be measured.",
        "source": "George Orwell, Nineteen Eighty-Four (Secker & Warburg, 1949), Part One; Project Gutenberg Australia edition.",
        "href": "https://gutenberg.net.au/ebooks01/0100021.txt",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a3.png",
          "alt": "Press photograph of George Orwell",
          "credit": "Branch of the National Union of Journalists press photo, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Sandro Botticelli's The Calumny of Apelles reconstructs a lost ancient painting as an allegory of the very act of false accusation: a king with the ass's ears of bad judgment leans toward the whispering figures of Ignorance and Suspicion, while a beautiful woman, Calumny, drags an innocent victim by the hair toward the throne, torch in hand. Around them cluster Envy, Fraud, and Deceit, the whole machinery of a manufactured smear. The scene is a diagram of what happens when a ruler prefers the flattering lie to the plain truth, and it maps onto a leader who broadcasts a foreign-conspiracy accusation his own experts have rejected. China's foreign ministry called the charge a 'malicious smear', which is exactly the crime Botticelli painted five centuries ago: calumny dressed as revelation and paraded before power.",
        "excerpt": "On a throne to the right sits a long-eared king flanked by Ignorance and Suspicion who murmur into his ears; before him the ragged figure of Envy leads Calumny, a graceful woman bearing a torch, who hauls a stripped and pleading innocent by the hair, while her attendants Fraud and Deceit adorn her. At the far left the black-cloaked figure of Repentance turns toward the naked figure of Truth, who points to a heaven that the court refuses to see. The panel is a courtroom of lies: false accusation given beauty and momentum, judged by a ruler who has chosen not to look.",
        "source": "Sandro Botticelli, The Calumny of Apelles, tempera on panel, c. 1494-95, Uffizi Gallery, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_La_calumnia_de_Apeles.jpg",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a4.png",
          "alt": "Botticelli's painting The Calumny of Apelles, showing an enthroned king receiving the personifications of slander",
          "credit": "Sandro Botticelli, The Calumny of Apelles (c. 1494-95), Uffizi Gallery, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "In Rossini's The Barber of Seville, the music master Don Basilio explains, in the aria 'La calunnia e un venticello', how to destroy a man: begin with slander as a faint breeze, let it whisper into ears, swell from murmur to roar until it bursts like a cannon shot and leaves the victim crushed beneath a general uproar. Rossini scores the lie's growth as an orchestral crescendo, one of opera's most literal depictions of how a false accusation propagates and doubles until it deafens. A primetime address alleging a stolen election is that venticello amplified to national scale: a suggestion released into eighteen states and 220 million files, engineered to gather force by repetition rather than proof. Basilio's cynical delight is the whole strategy in miniature, calumny built to explode.",
        "excerpt": "La calunnia e un venticello, / un'auretta assai gentile / che insensibile, sottile, / leggermente, dolcemente / incomincia a sussurrar. ... Alla fin trabocca e scoppia, / si propaga, si raddoppia / e produce un'esplosione / come un colpo di cannone, / un tremuoto, un temporale, / un tumulto generale, / che fa l'aria rimbombar.",
        "source": "Cesare Sterbini (libretto), aria 'La calunnia e un venticello' sung by Don Basilio, Act I of Il barbiere di Siviglia, music by Gioachino Rossini (1816); IMSLP.",
        "href": "https://imslp.org/wiki/Il_barbiere_di_Siviglia_(Rossini,_Gioacchino)",
        "image": {
          "src": "/covers/trump-election-security-primetime-2020-china--a5.png",
          "alt": "Photographic portrait of the composer Gioachino Rossini by Etienne Carjat, 1865",
          "credit": "Etienne Carjat, portrait of Gioachino Rossini, 1865, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "tsmc-100-billion-us-chip-expansion",
    "headline": "TSMC pledges another $100 billion for U.S. chip plants, raising its total American investment to about $265 billion",
    "overview": "Taiwan Semiconductor Manufacturing Co. said Thursday it would spend an additional $100 billion to expand chipmaking in the United States, bringing its total U.S. commitments to roughly $265 billion and likely funding four more fabrication plants in Arizona for the most advanced 2-nanometer-and-below chips. Chairman and chief executive C.C. Wei said the money would \"support the strong multiyear demand from our leading U.S. customers.\" The company, riding the artificial-intelligence boom to record profits, raised its 2026 revenue growth forecast to slightly above 40 percent.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxOT2MzZG5oUVN6dDFLX0dtWk5GNXdoakNILXBqRmZsUlQ5NzdEbk1aZTlxcU9xWl9lS1NBLWNwb0JfbWctbUwxeFBKMlNMeVN6UEZmbF95NlRIRVFZbDN2SW9VZjFzUHpTYTljR21GU2xrM1JtRU9ETTFBMnhFeHBQcHRKQzRIV202RWdYZXFmektSalBDckxITVRFeDJNZw?oc=5"
      },
      {
        "name": "Fortune",
        "href": "https://fortune.com/2026/07/16/tsmc-100-billion-us-chip-investment/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/tsmc-100-billion-us-chip-expansion.png",
      "alt": "A silicon wafer being handled inside a semiconductor fabrication plant.",
      "credit": "Photograph by Hunter Trick (TrickHunter), Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the sixth century the Roman emperor Justinian depended on his rival Persia for the age's most coveted high technology: silk, whose secret China and its intermediaries guarded jealously. Then, as Procopius records, two monks smuggled silkworm eggs out of a far eastern land called Serinda and taught Constantinople to breed the worms itself, breaking a foreign monopoly and rooting an advanced craft in new soil. TSMC's transplant of 2-nanometer fabrication from Taiwan to Arizona repeats that ancient logic almost exactly: a superpower, uneasy about relying on distant suppliers for a strategic material, brings the master-craft home. Then it was mulberry leaves and cocoons; now it is extreme-ultraviolet lithography and a $265 billion bet. The impulse to localize the crown jewel of manufacturing is fifteen centuries old.",
        "excerpt": "At about this time certain monks, coming from India and learning that the Emperor Justinian entertained the desire that the Romans should no longer purchase their silk from the Persians, came before the emperor and promised so to settle the silk question that the Romans would no longer purchase this article from their enemies, the Persians, nor indeed from any other nation... They then once more went to Serinda and brought back the eggs to Byzantium, and in the manner described caused them to be transformed into worms, which they fed on the leaves of the mulberry; and thus they made possible from that time forth the production of silk in the land of the Romans.",
        "source": "Procopius, History of the Wars, VIII.xvii (Gothic War IV.17), trans. H. B. Dewing, Loeb Classical Library; text hosted at LacusCurtius (penelope.uchicago.edu, University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/8C*.html",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a0.png",
          "alt": "Byzantine mosaic of Emperor Justinian I and his court, Basilica of San Vitale, Ravenna, c. 547 CE",
          "credit": "Mosaic of Emperor Justinian I, Basilica of San Vitale, Ravenna (c. 547 CE); Wikimedia Commons, public domain"
        }
      },
      {
        "category": "historical",
        "title": "Britain in the 1790s held the world's decisive industrial technology, the water-powered spinning machinery of Arkwright and Strutt, and forbade the export of both the machines and the men who understood them. Samuel Slater, a young apprentice, defeated the ban by carrying nothing on paper: he memorized the mill's every mechanism, sailed to America in disguise, and rebuilt the machinery by hand in Pawtucket, Rhode Island, founding the American cotton industry and earning the epithet 'Slater the Traitor' back home. His story is the exact ancestor of today's news, only inverted in direction: where advanced manufacturing know-how once flowed illicitly from an old power to a new one, TSMC is now deliberately relocating the planet's most advanced fabrication from Taiwan to the United States. Both episodes turn on the same truth, that a nation's real wealth lies less in a single factory than in the transferable mastery of how to make things. The $100 billion buys buildings; the point is the craft that fills them.",
        "excerpt": "He therefore resolved not to take any pattern, nor have any writing or memorandum about him, but trusted wholly to his acquirements in the business and to his excellent memory.",
        "source": "George S. White, Memoir of Samuel Slater: The Father of American Manufactures (Philadelphia, 1836); full text via the Internet Archive.",
        "href": "https://archive.org/stream/memoirsamuelsla02whitgoog/memoirsamuelsla02whitgoog_djvu.txt",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a1.png",
          "alt": "Engraved portrait of Samuel Slater, industrialist and founder of the American cotton-spinning industry",
          "credit": "Portrait of Samuel Slater, from The Biographical Cyclopedia of Representative Men of Rhode Island (1881); Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "When Solomon set out to build the Temple in Jerusalem, the rising kingdom of Israel did not yet possess the finest metalworking skill, so the king reached abroad and fetched Hiram out of Tyre, a master 'filled with wisdom, and understanding, and cunning to work all works in brass.' The most ambitious construction of the age was thus realized by importing a foreign master-craftsman to execute its most advanced work on new ground. That is precisely the shape of TSMC's move: America, hungry for cutting-edge capacity it cannot yet reproduce alone, summons the world's supreme fabricator to raise its most demanding structures in the Arizona desert. Hiram cast the great pillars and the molten sea in bronze; C. C. Wei's engineers will etch circuits a few atoms wide. Across three thousand years the pattern holds, that monumental national projects lean on borrowed genius.",
        "excerpt": "And king Solomon sent and fetched Hiram out of Tyre. He was a widow's son of the tribe of Naphtali, and his father was a man of Tyre, a worker in brass: and he was filled with wisdom, and understanding, and cunning to work all works in brass. And he came to king Solomon, and wrought all his work.",
        "source": "The Holy Bible, King James Version, 1 Kings 7:13-14; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a2.png",
          "alt": "James Tissot, Solomon Dedicates the Temple at Jerusalem, gouache, c. 1896-1902",
          "credit": "James Tissot, 'Solomon Dedicates the Temple at Jerusalem' (c. 1896-1902), The Jewish Museum, New York; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "literary",
        "title": "In Book I of Paradise Lost, the fallen angels, needing a capital worthy of their ambition, follow Mammon to tear open the earth and raise Pandaemonium, a vast gleaming hall conjured almost overnight from ransacked mineral wealth. Milton's scene is the archetype of colossal, capital-hungry industry: gold torn from the ground and marshalled at superhuman speed into a monument of power. TSMC's four new Arizona fabs, sprung from raw desert and financed by fortunes staked on an AI-driven future, are a benign echo of that mythic construction, the same union of immense treasure, engineering scale and sheer will to build. Milton meant Mammon as a warning about worshipping 'trodden gold' over higher things; a modern reader can hold both the awe at the feat and the caution about what such fortunes chase. The 'least erected Spirit' still knows how to raise a palace faster than anyone thought possible.",
        "excerpt": "Mammon led them on—\nMammon, the least erected Spirit that fell\nFrom Heaven; for even in Heaven his looks and thoughts\nWere always downward bent, admiring more\nThe riches of heaven's pavement, trodden gold,\nThan aught divine or holy else enjoyed\nIn vision beatific. By him first\nMen also, and by his suggestion taught,\nRansacked the centre, and with impious hands\nRifled the bowels of their mother Earth\nFor treasures better hid.",
        "source": "John Milton, Paradise Lost, Book I (lines 678-688), 1667; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/26/26-h/26-h.htm",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a3.png",
          "alt": "John Martin, Pandemonium, 1841, oil on canvas, showing the vast infernal palace rising above a fiery landscape",
          "credit": "John Martin, 'Pandemonium' (1841), Musee du Louvre, Paris; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg painted 'Coalbrookdale by Night' in 1801, capturing the Madeley Wood furnaces of Shropshire blazing against the darkness, the very cradle of the Industrial Revolution rendered as an almost apocalyptic vision of fire, smoke and human enterprise. It is the definitive image of a landscape transformed by heavy manufacturing, where a quiet valley becomes the glowing engine of a new economic age. TSMC's Arizona campus is the twenty-first-century successor to Coalbrookdale, another once-empty terrain being remade into a furnace of advanced production, its cleanrooms and construction cranes as defining of our era as those furnaces were of Loutherbourg's. Both scenes fuse dread and wonder at the scale of what industry can raise from raw ground. The geography of manufacturing, then as now, reshapes the very look of the land.",
        "excerpt": "The canvas shows the Madeley Wood (Bedlam) furnaces erupting with orange fire into a smoke-filled night sky, silhouetting sheds, wagons and figures against the blaze. A cold moon and pale distant hills frame the industrial inferno, so that nature and machinery confront each other across the valley. Loutherbourg treats the ironworks with the awe usually reserved for volcanoes or storms, making the birthplace of modern industry look like a scene of sublime terror and creative power at once.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801, oil on canvas, 68 x 107 cm, Science Museum, London (accession 1952-452).",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._-_Coalbrookdale_by_Night_-_WGA13730.jpg",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a4.png",
          "alt": "Philip James de Loutherbourg, Coalbrookdale by Night, 1801, iron furnaces glowing red against a dark sky",
          "credit": "Philip James de Loutherbourg, 'Coalbrookdale by Night' (1801), Science Museum, London; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "In the third scene of Wagner's Das Rheingold, the orchestra plunges the listener down into Nibelheim, the subterranean forge where the dwarf Alberich, having renounced love for gold, drives his enslaved kinsmen to hammer out a hoard of treasure and the ring that confers total power. The famous clangor of tuned anvils makes audible an entire underground economy dedicated to manufacturing wealth and dominion. The analogy to TSMC is pointed and double-edged: here too is a vast productive complex, a hoard of almost unimaginable value, and a race to control the technology on which mastery of the age depends. Wagner wraps his forge in a warning about what the single-minded pursuit of that power can cost. Whether one hears triumph or caution, the scene captures the mythic weight our civilization places on the machinery that mints the future.",
        "excerpt": "Wagner sends the music spiralling downward through hammering, tuned anvils into the smoky depths of Nibelheim, where an enslaved multitude toils without pause at the forge. Alberich's motif gleams with menace as the accumulated gold becomes both fortune and instrument of domination. The relentless metallic rhythm turns industrial labour itself into a force of overwhelming, almost frightening power.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1869), scene 3 (Nibelheim); full scores at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/tsmc-100-billion-us-chip-expansion--a5.png",
          "alt": "Illustration of Scene III of Wagner's Das Rheingold, the capture of Alberich in the forge of Nibelheim",
          "credit": "Michael Echter, illustration of Das Rheingold Scene III (the capture of Alberich), from The Victrola Book of the Opera (1917); Wikimedia Commons, public domain"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "iran-strikes-syria-us-command-center",
    "headline": "Iran says it struck a U.S. command centre in eastern Syria, opening a new front in its war with Washington",
    "overview": "Iran's Islamic Revolutionary Guard Corps said Friday it had carried out a \"surprise attack\" on a U.S. special-operations command centre in southeastern Syria, its first strike inside Syria during the current war, in retaliation for a U.S. attack on Bampur, near Iranshahr, that Tehran said had killed seven of its soldiers. The Guard claimed to have destroyed a radar system and several helicopters and to have killed \"a large number\" of Americans, a claim U.S. Central Command has not confirmed and that CNN said it could not verify. Iranian state media said the country had also attacked U.S. bases in Kuwait and Bahrain as fighting over the Strait of Hormuz escalated.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxOQXVvLTBxWklNRDU2M0l1QTZhUmloM0xqbFM2RWwxaS0yckJVNXZTbkFlZDBQUHZHbDVfOGRDdlNlSDJQNUg5VnZodUs5MzdsUjQxZjFyZl9LaTdBbGhxWU16dk9kRXFKZm9OblFOX0NKNWdweGI4UXNLb0daSjNzdGVmZFJzRjZHUzZFWW51OFhXVjNpeHk2SUs2cGhNeC1VMWxsQVNjWkIzTlFBTjhiRUlrS3o2aDBWb2dCOFlHMWVBMFdt?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/17/iran-war-us-trump-syria-bahrain.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/iran-strikes-syria-us-command-center.png",
      "alt": "An oil tanker in the Strait of Hormuz, the waterway at the centre of the U.S.-Iran war.",
      "credit": "NASA MODIS / Terra satellite, 2020; public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 53 BC the Roman triumvir Crassus led seven legions across the Euphrates into Parthian Mesopotamia, certain the era's dominant war machine would sweep the Persian empire aside. On the burning plain of Carrhae the Parthian general Surena sprang his trap: kettle-drums thundered, the horse-archers' scale armour flashed, and a superpower's infantry was encircled and shot to pieces from the saddle, Crassus killed and his eagles taken. It was the humiliation of the age's foremost military power by a Persian force fighting on the contested ground between the rivers. Iran's boast of a surprise strike that destroyed radar and helicopters at a U.S. forward command centre in Syria, hitting the modern superpower on those same Mesopotamian marches, reaches straight back to Surena's ambush of Crassus.",
        "excerpt": "While the Romans were in consternation at this din, suddenly their enemies dropped the coverings of their armour, and were seen to be themselves blazing in helmets and breastplates, their Margianian steel glittering keen and bright, and their horses clad in plates of bronze and steel. [...] But the Parthians now stood at long intervals from one another and began to shoot their arrows from all sides at once, not with any accurate aim (for the dense formation of the Romans would not suffer an archer to miss even if he wished it), but making vigorous and powerful shots from bows which were large and mighty and curved so as to discharge their missiles with great force.",
        "source": "Plutarch, Life of Crassus 24 (trans. Bernadotte Perrin, Loeb Classical Library, 1916).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Crassus*.html",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a0.png",
          "alt": "Nineteenth-century engraving of the death of Crassus at the Battle of Carrhae, 53 BC",
          "credit": "Cassell's Illustrated Universal History, vol. 3 (1882); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On the eve of the Vietnamese lunar new year in January 1968, North Vietnamese and Viet Cong forces broke the holiday truce with a coordinated wave of surprise assaults on cities and American bases across South Vietnam, even sending a sapper team over the wall of the U.S. Embassy in Saigon. Militarily the offensive was largely repulsed, yet the sheer audacity of striking the superpower's forward strongholds, broadcast into American living rooms, shattered Washington's confidence and turned public opinion against the war. It became the archetype of how a weaker adversary can convert a single spectacular blow against an enemy's command posts into a strategic and psychological earthquake. Iran's claim to have overrun a U.S. special-operations command centre, opening a new front and widening the war, is a bid for exactly that Tet-style shock.",
        "excerpt": "Grainy footage of fighters inside the embassy compound and marines crouched behind its shattered gates carried a message no communique could: nowhere held by the superpower was truly safe. The coordinated strikes on forward bases seized little ground yet cracked the political will behind the war. It endures as the model of the surprise blow whose real target is the enemy's confidence at home.",
        "source": "U.S. Department of State, Office of the Historian, \"U.S. Involvement in the Vietnam War: The Tet Offensive, 1968.\"",
        "href": "https://history.state.gov/milestones/1961-1968/tet",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a1.png",
          "alt": "U.S. troops at the U.S. Embassy in Saigon during the Tet Offensive, 31 January 1968",
          "credit": "U.S. Army photograph, 1968; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ferdowsi's Shah Nameh, the tenth-century Persian Book of Kings, turns on cycles of blood-vengeance between Iran and the rival land of Turan. When the innocent prince Irij is murdered by his own brothers, the aged king Feridun spurns their gifts and gold and vows instead that blood alone for blood must pay, setting in motion a war of retaliation carried on by his heirs against the foreign realms that spilled Persian blood. This is the deep grammar of Iranian epic: an injury to one's own must be answered by a strike against the enemy's kingdom, whatever the cost. Tehran's framing of its Syria attack as revenge for the seven soldiers killed at Bampur, blood for blood and a new front opened against Washington, speaks in Feridun's ancient idiom.",
        "excerpt": "The brothers of my murdered boy,\nWho could a father's hopes destroy,\nAn equal punishment will reap,\nAnd lasting vengeance o'er them sweep.\nThey rooted up my favourite tree,\nBut yet a branch remains to me.\nNow the young lion comes apace,\nThe glory of his glorious race;\nHe comes apace, to punish guilt,\nWhere brother's blood was basely spilt;\nAnd blood alone for blood must pay;\nHence with your gold, depart, away!",
        "source": "Firdausi, The Shah Nameh, \"Minuchihr\" (trans. James Atkinson), in The Persian Literature (Project Gutenberg ebook #10315).",
        "href": "https://www.gutenberg.org/cache/epub/10315/pg10315-images.html",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a2.png",
          "alt": "Persian miniature of the battle between Kay Khusraw and Afrasiyab from the Shahnameh, 1493-1494",
          "credit": "Salik ibn Sa'id, 1493-1494, Freer Gallery of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the Book of Judges, Gideon whittles his host down to a mere three hundred and falls upon the vast Midianite camp in the dead of night. At his signal the men shatter their pitchers, blaze their hidden torches and blow their trumpets on every side, crying \"The sword of the LORD, and of Gideon,\" and the panicked enemy turns its swords upon itself and flees. It is scripture's archetype of the surprise night raid: a smaller force striking a sleeping camp with shock, noise and terror rather than numbers. Iran's account of a stealthy surprise attack that overran a forward American command centre reaches for the same Gideon-like drama of the sudden blow that throws a stronger foe into confusion.",
        "excerpt": "So Gideon, and the hundred men that were with him, came unto the outside of the camp in the beginning of the middle watch; and they had but newly set the watch: and they blew the trumpets, and brake the pitchers that were in their hands. And the three companies blew the trumpets, and brake the pitchers, and held the lamps in their left hands, and the trumpets in their right hands to blow withal: and they cried, The sword of the LORD, and of Gideon. And they stood every man in his place round about the camp; and all the host ran, and cried, and fled.",
        "source": "The Holy Bible, Judges 7:19-21 (King James Version).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a3.png",
          "alt": "Gustave Dore engraving of Gideon's night attack, 'The Midianites Put to Flight,' 1866",
          "credit": "Gustave Dore, 1866, Dore's English Bible; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin's vast canvas \"The Great Day of His Wrath\" (c. 1851) hurls whole cities into a collapsing, fire-lit abyss: mountains uprooted, buildings pitched into the void, humanity dwarfed by a cataclysm of divine retribution. Painted by an artist obsessed with apocalypse and the sublime terror of destruction, it renders the very idea of wrathful, world-ending vengeance as spectacle. Its blazing ruin is a visual analogue to Iran's boast of a base destroyed, radar and helicopters ablaze and \"a large number\" of Americans killed, and to the wider dread that a tit-for-tat over the Strait of Hormuz could tip into something apocalyptic. The painting is less a report than a mood: the escalation of vengeance imagined at the scale of judgment day.",
        "excerpt": "A whole world comes apart on Martin's canvas: cliffs and cities are flung skyward against a sky of blood-red and sulphur, while tiny human figures tumble into a fathomless chasm of fire. There is no single battle here, only the sublime spectacle of wrath made total, destruction imagined as the end of everything.",
        "source": "John Martin, The Great Day of His Wrath, oil on canvas, c. 1851, Tate Britain, London.",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a4.png",
          "alt": "John Martin's apocalyptic painting 'The Great Day of His Wrath,' c. 1851",
          "credit": "John Martin, c. 1851, Tate Britain; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The opening movement of Gustav Holst's orchestral suite The Planets (1914-1916), \"Mars, the Bringer of War,\" grinds forward on a relentless five-beat ostinato, strings struck with the wood of the bow like distant artillery, brass and drums swelling into a mechanised, pitiless march toward catastrophe. Composed on the eve of the First World War, it is one of music's most vivid portraits of war as an impersonal, escalating machine that crushes everything in its path. That inexorable build, a small motif hardening into overwhelming, grinding violence, mirrors the logic of the current spiral: a strike answered by a strike, Bampur repaid in Bahrain and Kuwait, a command centre for a command centre, each blow feeding the next. Holst's Mars is the sound of escalation with no clear off-switch.",
        "excerpt": "A hammering five-in-a-bar rhythm sets the pulse of a war machine; strings rapped with the wood of the bow rattle like far-off gunfire while the brass climbs in cold, blaring dissonance. The music never relents, only accumulates, until the whole orchestra detonates in crushing chords, the terror of mechanised war rendered as relentless, mounting sound.",
        "source": "Gustav Holst, \"Mars, the Bringer of War,\" from The Planets, Op. 32 (1914-1916).",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/iran-strikes-syria-us-command-center--a5.png",
          "alt": "Portrait photograph of composer Gustav Holst, c. 1921",
          "credit": "Herbert Lambert, c. 1921, National Portrait Gallery, London; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "japan-imperial-succession-male-line",
    "headline": "Japan's parliament revises its imperial succession law for the first time in 79 years but keeps the throne closed to women",
    "overview": "Japan's upper house passed a bill on Friday that lets the imperial family adopt single male paternal-line descendants of former royal branches and allows female members to keep their status after marrying commoners, the first revision of the Imperial House Law since 1947. But it leaves intact the ban on women ascending the throne, so Princess Aiko, the emperor's only child, remains ineligible despite broad public support for a female monarch. The change, backed by Prime Minister Sanae Takaichi's conservative party, is meant to shore up a shrinking line of succession now down to three eligible heirs.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cy07rz79zg9o"
      },
      {
        "name": "Nippon.com",
        "href": "https://www.nippon.com/en/news/yjj2026071700121/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/japan-imperial-succession-male-line.png",
      "alt": "The Chrysanthemum Throne and the Japanese imperial palace.",
      "credit": "Photograph by the Prime Minister's Office of Japan (Kantei), 2019, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Fourteen centuries before Japan's parliament reaffirmed that only men may reign, the Chrysanthemum Throne was repeatedly held by women. In 593 the widowed Princess Nukadabe became Empress Suiko, the first of eight female sovereigns who governed the early archipelago, presiding over the arrival of Buddhism and Japan's first constitution. Their reigns are a living refutation of the claim that a woman on the throne betrays 'tradition' — the oldest tradition includes them. That the 2026 revision keeps Princess Aiko ineligible, even while reaching back to defunct branch families for spare men, marks a break with a past in which the sovereign's sex was no barrier at all.",
        "excerpt": "\"the Ministers besought the Empress-consort of the Emperor Nunakura futo-dama-shiki, viz. the Princess Nukada-be, to ascend the throne. The Empress refused, but the public functionaries urged her in memorials three times until she consented, and they accordingly delivered to her the Imperial Seal. ... Winter, 12th month, 8th day. The Empress-consort assumed the Imperial Dignity in the Palace of Toyora.\"",
        "source": "Nihongi: Chronicles of Japan from the Earliest Times to A.D. 697, Book XXII (reign of Empress Suiko), trans. W. G. Aston (London, 1896).",
        "href": "https://en.wikisource.org/wiki/Nihongi:_Chronicles_of_Japan_from_the_Earliest_Times_to_A.D._697/Book_XXII",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a0.png",
          "alt": "Painted portrait of Empress Suiko, first reigning empress of Japan, in courtly Heian-style robes",
          "credit": "Tosa Mitsuyoshi, portrait of Empress Suiko (Edo period), Eifuku-ji, Osaka; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "When the Habsburg male line guttered toward extinction, Emperor Charles VI did the opposite of Japan's lawmakers: in 1713 he issued the Pragmatic Sanction, rewriting the succession so his daughter Maria Theresa could inherit an undivided realm. He spent his remaining years bribing Europe's courts to honor it, and still a coalition tried to dismember her lands in the War of the Austrian Succession — yet she reigned forty years and refounded the dynasty. Japan in 2026 faces the same arithmetic of a dwindling house, three eligible men and a beloved only daughter, but chooses the reverse remedy: import distant male cousins by adoption rather than admit the princess before them. Charles bent the law toward his daughter; Tokyo bends the law around Aiko.",
        "excerpt": "\"The emperor Charles VI. settled the law of succession for the dominions of the house of Habsburg by pragmatic sanction first published on the 19th of April 1713, and thereby prepared the way for the great war which ensued upon his death.\"",
        "source": "\"Pragmatic Sanction,\" Encyclopædia Britannica, 11th ed. (1911).",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Pragmatic_Sanction",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a1.png",
          "alt": "State portrait of Empress Maria Theresa in ceremonial robes as Queen of Hungary",
          "credit": "Martin van Meytens, portrait of Maria Theresa, 1759, Academy of Fine Arts Vienna; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the Book of Numbers, five sisters — Mahlah, Noah, Hoglah, Milcah and Tirzah — stand before Moses because their father died 'and had no sons,' and ask why his name should vanish for want of a male heir. The verdict, delivered as divine law, is that the daughters of Zelophehad 'speak right,' and the inheritance passes to them. It is one of scripture's earliest rulings that a line need not die, nor a daughter be dispossessed, simply because no son survives. Japan's imperial house, down to three men and one excluded princess, confronts the very question the sisters posed — and, for now, answers it the other way.",
        "excerpt": "\"Then came the daughters of Zelophehad, the son of Hepher... and these are the names of his daughters; Mahlah, Noah, and Hoglah, and Milcah, and Tirzah. And they stood before Moses, and before Eleazar the priest... Our father died in the wilderness... and had no sons. Why should the name of our father be done away from among his family, because he hath no son? Give unto us therefore a possession among the brethren of our father. And Moses brought their cause before the Lord. And the Lord spake unto Moses, saying, The daughters of Zelophehad speak right: thou shalt surely give them a possession of an inheritance among their father's brethren; and thou shalt cause the inheritance of their father to pass unto them. And thou shalt speak unto the children of Israel, saying, If a man die, and have no son, then ye shall cause his inheritance to pass unto his daughter.\"",
        "source": "Numbers 27:1–8, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Numbers",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a2.png",
          "alt": "Illustration of the five daughters of Zelophehad standing before Moses to plead for their inheritance",
          "credit": "'The Daughters of Zelophehad,' from The Bible and Its Story Taught by One Thousand Picture Lessons (1908); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Confucian ethics, which shaped Japan's dynastic thinking as deeply as China's, made the male heir a sacred obligation: Mencius taught that 'to have no posterity is the greatest' of unfilial acts. It is precisely this dread of a broken line — of ancestors left without a son to sustain the rites — that animates the 2026 law's strangest provision, the adoption of paternal-line men from long-abolished princely houses. The logic is ancient and patrilineal to its core: continuity is reckoned through fathers and sons, and a daughter, however direct, is held unable to carry it. Princess Aiko's exclusion is the long shadow this doctrine casts across the Chrysanthemum Throne.",
        "excerpt": "\"Mencius said, 'There are three things which are unfilial, and to have no posterity is the greatest of them. Shun married without informing his parents because of this, lest he should have no posterity. Superior men consider that his doing so was the same as if he had informed them.'\"",
        "source": "Mencius, Book IV (Li Lou), Part I, ch. 26, trans. James Legge, The Chinese Classics, vol. 2 (1861/1895).",
        "href": "https://en.wikisource.org/wiki/The_Chinese_Classics/Volume_2/The_Works_of_Mencius/chapter07",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a3.png",
          "alt": "Painted album-leaf portrait of the Confucian philosopher Mencius (Meng Ke)",
          "credit": "Yuan dynasty, 'Half Portraits of the Great Sage and Virtuous Men of Old — Meng Ke,' National Palace Museum, Taipei; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Japanese imperial house traces its descent, and its very right to rule, to Amaterasu — the sun goddess. Shunsai Toshimasa's 1889 triptych captures the moment the world's light returns as she emerges from the rock-cave into which she had withdrawn, coaxed out by the dance of another goddess, Ame-no-Uzume. Here is the founding irony of a throne now closed to women: the dynasty's supreme ancestor is female, and the sacred radiance of the line is imagined as a goddess restored to the sky. As parliament bars Princess Aiko in 2026, the print recalls that Japanese sacred kingship begins not with a father but with a mother of light.",
        "excerpt": "A three-panel woodblock print of the moment daylight returns to the world: the sun goddess Amaterasu, half-emerged from the mouth of the heavenly rock-cave in a blaze of gold, surrounded by the assembled deities as Ame-no-Uzume dances to draw her back into the heavens. Radiant robes and swirling cloud fill the triptych, and the female deity is rendered as the literal source of daylight — and of the imperial line said to descend from her.",
        "source": "Shunsai Toshimasa, Origin of the Cave Door Dance (Amaterasu / Amano-Iwato), colour woodblock triptych, 1889.",
        "href": "https://commons.wikimedia.org/wiki/File:Origin_of_the_Cave_Door_Dance_(Amaterasu)_by_Shunsai_Toshimasa_1889.jpg",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a4.png",
          "alt": "Woodblock triptych of the sun goddess Amaterasu emerging in golden light from the heavenly rock-cave as gods look on",
          "credit": "Shunsai Toshimasa, 1889; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Ring cycle ends in Götterdämmerung — 'The Twilight of the Gods' — as an ancient race of divine rulers, corrupted and dwindling, burns to its extinction, and it is a woman, Brünnhilde, who rides into the pyre to end the old order and cleanse the world. The opera stages the anxiety now hanging over the oldest monarchy on earth: a god-descended dynasty contracting toward its last heirs, its survival wagered on blood and law. Japan's answer is to conjure new men from abolished branches rather than let a daughter carry the flame. Wagner's myth hints at the harder truth — that a line guarded too jealously against its women may be the one the twilight finds first.",
        "excerpt": "Across four operas the drama drives toward a final conflagration: the brass and strings surge as Valhalla and its exhausted gods are consumed by fire, and Brünnhilde, torch in hand, rides her horse into the flames. The closing 'Immolation Scene' is among opera's most overwhelming endings — an entire divine dynasty extinguished, its redemption entrusted to the very woman the gods had cast out.",
        "source": "Richard Wagner, Götterdämmerung (Twilight of the Gods), WWV 86D, third day of Der Ring des Nibelungen, first performed 1876.",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)",
        "image": {
          "src": "/covers/japan-imperial-succession-male-line--a5.png",
          "alt": "Arthur Rackham illustration of the valkyrie Brünnhilde, heroine of Wagner's Ring cycle",
          "credit": "Arthur Rackham, 'Brünnhilde,' from The Rhinegold and the Valkyrie (1910); public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "canada-wildfire-smoke-us-air-quality",
    "headline": "Smoke from Canadian wildfires blankets U.S. cities, triggering hazardous air-quality alerts from Detroit to New York",
    "overview": "A thick haze from 858 wildfires burning across Canada spread over cities including New York, Detroit, Toronto, Chicago, Pittsburgh and much of New England on Thursday, prompting hazardous air-quality alerts and warnings for residents to stay indoors. New York's governor called it a \"very serious health situation,\" outdoor summer-camp events and concerts were cancelled, and beaches were closed along popular lakes. In Ontario, one fire forced a First Nations community to evacuate, with its chief saying the community had been \"burnt to ashes.\"",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c0m7n427xd8o"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQd0hyQ29iWXhJWUVoSzJsMlgyQjA4SnMzN0tmb01EUlFOTUU3Nkl2eVQ0UEVjaU1lQXg4MVNfeTNGQ3BDbXdPWlhNanQxQnVZalk3emlXSkk0RHotTXFsYlMwa0VkNVRqRWxVZ2ZsN0o1QTZzSVNudEc5VUNBQ3Rtb18tVXpZSmRxOGRGZDZR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/canada-wildfire-smoke-us-air-quality.png",
      "alt": "A city skyline shrouded in orange haze from distant wildfire smoke.",
      "credit": "Anthony Quintano, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 19 May 1780 a preternatural darkness fell across New England and eastern Canada: birds roosted at noon, roosters crowed, and townsfolk lit candles to work indoors. Scientists studying fire scars in Ontario's Algonquin forests have since traced the gloom to vast Canadian wildfires whose smoke, mingled with fog, blotted out the sun hundreds of miles to the south. The eeriness of that day, a distant northern fire darkening American skies, is exactly the phenomenon now smothering Detroit, New York and New England as 858 Canadian wildfires again send their pall over the same cities. Two and a half centuries later, the Revolutionary soldier Joseph Plumb Martin's astonished eyewitness account reads like a dispatch from this week.",
        "excerpt": "We were here at the time the 'dark day' happened, (19th of May;) it has been said that the darkness was not so great in New-Jersey as in New-England. How great it was there I do not know, but I know that it was very dark where I then was in New-Jersey; so much so that the fowls went to their roosts, the cocks crew and the whip-poor-wills sung their usual serenade; the people had to light candles in their houses to enable them to see to carry on their usual business; the night was as uncommonly dark as the day was.",
        "source": "Joseph Plumb Martin, The Adventures of a Revolutionary Soldier (originally published 1830), Chapter VI",
        "href": "https://en.wikisource.org/wiki/The_Adventures_Of_A_Revolutionary_Soldier/Chapter_VI.",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a0.png",
          "alt": "Harriet Powers's Pictorial Quilt (1895-1898), whose appliqued panels record celestial wonders including the Dark Day of 19 May 1780",
          "credit": "Harriet Powers, Pictorial Quilt, Museum of Fine Arts, Boston; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In AD 536 a mysterious dust veil dimmed the sun across the Mediterranean for more than a year; the Byzantine historian Procopius, writing during the reign of Justinian, recorded that the sun shed a wan, moon-like light as though in permanent eclipse. Modern ice cores attribute the gloom to a colossal volcanic eruption whose aerosols circled the globe, wrecking harvests and darkening skies far from their source. Like the Canadian smoke now spreading over Toronto, Chicago and the American Northeast, it was a catastrophe whose airborne aftermath reached populations who never saw the fire or the mountain that caused it. Procopius's line captures the same ominous, enfeebled sun that hangs today over hazard-alerted cities.",
        "excerpt": "And it came about during this year that a most dread portent took place. For the sun gave forth its light without brightness, like the moon, during this whole year, and it seemed exceedingly like the sun in eclipse, for the beams it shed were not clear nor such as it is accustomed to shed.",
        "source": "Procopius, History of the Wars, Book IV (The Vandalic War), ch. xiv, trans. H. B. Dewing",
        "href": "https://en.wikisource.org/wiki/History_of_the_Wars/Book_IV",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a1.png",
          "alt": "Sixth-century Byzantine mosaic of the Emperor Justinian and his court from the Basilica of San Vitale, Ravenna, contemporary with the 536 dust veil",
          "credit": "Master of San Vitale, Ravenna; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The ninth plague of Egypt is a thick darkness so palpable that Scripture calls it a darkness which may be felt, halting all movement and business for three days. It is the archetype of a poisoned, oppressive air descending on a whole land as a sign of catastrophe, precisely the register in which New York's governor called this week's smoke a very serious health situation, with beaches closed and residents told to stay indoors. The biblical image of people unable to see one another, immobilized under a befouled sky, mirrors the choking haze that has shuttered outdoor life from Detroit to New England. Here the analogy is not the fire but the shroud of unbreathable darkness that fire has produced.",
        "excerpt": "And the LORD said unto Moses, Stretch out thine hand toward heaven, that there may be darkness over the land of Egypt, even darkness which may be felt. And Moses stretched forth his hand toward heaven; and there was a thick darkness in all the land of Egypt three days: They saw not one another, neither rose any from his place for three days: but all the children of Israel had light in their dwellings.",
        "source": "The Bible, King James Version, Exodus 10:21-23",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a2.png",
          "alt": "Gustave Dore's 1866 wood engraving The Ninth Plague: Darkness, showing figures groping under a black sky over Egypt",
          "credit": "Gustave Dore, Dore's English Bible (1866); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Byron wrote 'Darkness' in 1816, the volcanic 'year without a summer,' when Tambora's ash dimmed European skies and inspired his vision of a world whose bright sun was extinguished. The poem's blackened, rayless heavens and men praying for light distil the primal dread of a sky that will not brighten, the same dread stirred as Canadian smoke turns midday orange and grey over American cities. Byron's apocalyptic imagination was itself a response to a real atmospheric catastrophe carried far from its source, just as today's pall drifts from fires hundreds of miles north. His opening lines could serve as the caption for this week's blotted-out sun.",
        "excerpt": "I had a dream, which was not all a dream.\nThe bright sun was extinguished, and the stars\nDid wander darkling in the eternal space,\nRayless, and pathless, and the icy Earth\nSwung blind and blackening in the moonless air;\nMorn came and went - and came, and brought no day,\nAnd men forgot their passions in the dread\nOf this their desolation; and all hearts\nWere chilled into a selfish prayer for light:",
        "source": "Lord Byron, 'Darkness' (1816)",
        "href": "https://en.wikisource.org/wiki/Darkness_(Byron,_1901)",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a3.png",
          "alt": "John Martin's apocalyptic painting The Great Day of His Wrath (1851-1853), a world convulsed under a fiery, blackened sky",
          "credit": "John Martin, The Great Day of His Wrath, Tate Britain; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner painted 'Chichester Canal' around 1828 with a sun of molten, lurid gold sinking into a hazed sky, colours art historians link to atmospheric ash from the 1815 eruption of Mount Tambora half a world away. Turner turned a distant volcanic catastrophe's airborne residue into strange, glowing beauty, much as this week's Canadian wildfire smoke has painted American skylines in the same uncanny oranges and reds. The painting is a reminder that our most famous 'apocalyptic' skies are often the aesthetic by-product of far-off environmental disaster. Set beside a photograph of a smoke-veiled Manhattan, Turner's burning horizon looks unnervingly contemporary.",
        "excerpt": "Turner's canvas is dominated by a swollen, incandescent sun whose light bleeds across a still canal and stains the whole sky a hazy amber. The haze softens every edge, dissolving masts and shoreline into a glowing, sulphurous atmosphere. It is a distant catastrophe's airborne residue transfigured into eerie, luminous calm, the same lurid palette that smoke now lends to hazard-alerted American cities.",
        "source": "J. M. W. Turner, Chichester Canal (c. 1828), oil on canvas, Tate Britain (N00560)",
        "href": "https://commons.wikimedia.org/wiki/File:Chichester_Canal_(1828).jpg",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a4.png",
          "alt": "J. M. W. Turner's Chichester Canal (c. 1828), a hazy amber sunset over still water, its colours linked to Tambora's volcanic ash",
          "credit": "J. M. W. Turner, Chichester Canal, Tate Britain; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Edvard Munch said the blood-red sky of 'The Scream' (1893) came from an evening when the sky suddenly turned blood red over the fjord, a colour scholars have connected to the vivid twilights cast worldwide by the 1883 eruption of Krakatoa. In Munch's hands an atmosphere poisoned by distant catastrophe becomes an image of pure dread, a sky so wrong it seems to shriek. That is the emotional key of this week's hazardous-air alerts, as an ominous, unnatural sky presses down on millions from Toronto to New York. The Krakatoa-tinged heavens behind Munch's figure are the ancestor of every smoke-reddened skyline now filling the news.",
        "excerpt": "I was walking along the road with two friends - the sun was setting - suddenly the sky turned blood red - I paused, feeling exhausted, and leaned on the fence - there was blood and tongues of fire above the blue-black fjord and the city - my friends walked on, and I stood there trembling with anxiety - and I sensed an infinite scream passing through nature.",
        "source": "Edvard Munch, diary note on the origin of The Scream (Munch, 1893; translated from the Norwegian)",
        "href": "https://commons.wikimedia.org/wiki/File:Edvard_Munch,_1893,_The_Scream,_oil,_tempera_and_pastel_on_cardboard,_91_x_73_cm,_National_Gallery_of_Norway.jpg",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us-air-quality--a5.png",
          "alt": "Edvard Munch's The Scream (1893), a figure clutching its face beneath a swirling blood-red sky",
          "credit": "Edvard Munch, The Scream, National Gallery of Norway; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "trump-media-truth-api-market-feed",
    "headline": "Trump Media plans to sell Wall Street a millisecond feed of 'market-moving' Truth Social posts",
    "overview": "Trump Media said it will begin selling financial institutions a paid data service, called Truth API, that delivers posts from the platform's highest-ranking accounts—currently led by President Trump—to clients in \"milliseconds,\" starting August 1. The company, which is loss-making, is pitching the round-the-clock feed to traders because Trump's posts on trade and tariffs often move global markets within seconds. Interim chief executive Kevin McGurn said \"markets already move on Truth Social posts\" and that the service would create a steady new source of profit; the firm did not say what it would charge.",
    "genre": "Technology",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c79gw4lj89eo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxNUnBoYzROZWtVQ0xoeVRvSkVOTkNsd1ZOMzNIUFdhLXBZeHg2cmU1Yk1sWmdJY2s1TFlKenFhUFVzSk83V2t3NEdoelo2bEYwX3RPTjJ0WU8ybktvZUFWclo3dTdaZ1k5b0JUdTFCQlVUd3FSZllNb1VjSW9IbkFJWXl4bktpWHAwX0V4REV1NFBVSFFhbDRNNFE1LWhTMEZiaV8yWW1vN3FUeUFVZW1qUE5GVjN5TGRYTWw0R2ozNWxzalNyUEE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/trump-media-truth-api-market-feed.png",
      "alt": "Stock traders watching screens of live market data on a trading floor.",
      "credit": "Thomas Edison's Gold & Stock Telegraph ticker, Henry Ford Museum. Photograph by H. Zimmer, CC BY 3.0, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Aristotle records how Thales of Miletus, mocked for the uselessness of philosophy, read the coming season in the stars, foresaw a bumper olive harvest, and quietly paid deposits on every olive-press in Miletus and Chios at off-season rates, then rented them back at a fortune when demand suddenly spiked. It is the West's oldest recorded market corner, and its lesson is pure: profit can flow not from labor but from knowing first. Trump Media's \"Truth API\" is the same maneuver compressed to milliseconds, selling traders the chance to read the coming weather, a presidential post on tariffs, a beat before everyone else and monetize the spread. Where Thales cornered the presses, the paying subscriber corners the seconds. The instrument is faster, but the edge is identical: information asymmetry sold as a service.",
        "excerpt": "Thales, so the story goes, because of his poverty was taunted with the uselessness of philosophy; but from his knowledge of astronomy he had observed while it was still winter that there was going to be a large crop of olives, so he raised a small sum of money and paid round deposits for the whole of the olive-presses in Miletus and Chios, which he hired at a low rent as nobody was running him up; and when the season arrived, there was a sudden demand for a number of presses at the same time, and by letting them out on what terms he liked he realized a large sum of money.",
        "source": "Aristotle, Politics, Book I, ch. 11 (1259a), trans. H. Rackham (Loeb Classical Library).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0058:book=1:section=1259a",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a0.png",
          "alt": "Engraved bust portrait of the ancient Greek philosopher Thales of Miletus.",
          "credit": "Thales of Miletus, engraving by Wilhelm Meyer in Illustrerad verldshistoria (1875). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Legend, burnished by the House of Rothschild's own mystique, holds that Nathan Mayer Rothschild, through a private network of fast boats and couriers, learned of Wellington's victory at Waterloo in June 1815 a full day before the British government's official dispatch, and traded the news on the London exchange before it broke to the public. Whether he made a killing or merely a myth, the episode became the founding parable of speed-as-money: the man with the fastest line to the decisive word owns the market's next move. Trump Media turns that private courier into a subscription product, promising Wall Street the President's market-moving words in milliseconds. Rothschild's packet-boats and riders have become a paid data feed, and the carrier pigeon that beat the market is now sold by the yard.",
        "excerpt": "According to the enduring legend of Waterloo, Nathan Rothschild's couriers carried word of Napoleon's defeat across the Channel ahead of every rival, letting the banker act on the century's most consequential news while London still waited in ignorance. The tale endures precisely because it dramatizes an eternal truth of speculation: privileged early access to price-moving information is itself a form of wealth. Fast intelligence, whether by boat, pigeon, or fiber-optic feed, is the edge that no one who possesses it willingly shares for free.",
        "source": "The Waterloo legend of Nathan Mayer Rothschild (1777-1836); see Niall Ferguson, The House of Rothschild (1998), and The Rothschild Archive.",
        "href": "https://en.wikipedia.org/wiki/Nathan_Mayer_Rothschild",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a1.png",
          "alt": "Portrait of the London banker Nathan Mayer Rothschild.",
          "credit": "Nathan Mayer Rothschild, from the Jewish Encyclopedia (1901-1906). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the opening of Aeschylus's Agamemnon, Clytemnestra reveals how the fall of Troy reached Argos not by ship or runner but by a relay of beacon-fires leaping mountain to mountain across the Aegean, from Ida to Lemnos to Athos and onward, so that the queen holds the war's decisive news while the sleeping city knows nothing. It is antiquity's telegraph, and its whole point is power: she who receives the signal first can act first. Trump Media's \"Truth API\" is Clytemnestra's beacon chain sold to subscribers, a purpose-built relay engineered to carry the ruler's word to a chosen few in milliseconds, ahead of the crowd. The medium is fiber and code rather than pine and flame, but the prize is unchanged: to know, and to move, before the rest of the city.",
        "excerpt": "Hephaestus, from Ida speeding forth his brilliant blaze. Beacon passed beacon on to us by courier-flame: Ida, to the Hermaean crag in Lemnos; to the mighty blaze upon the island succeeded, third, the summit of Athos sacred to Zeus.",
        "source": "Aeschylus, Agamemnon, lines 281-285, trans. Herbert Weir Smyth (Loeb Classical Library, 1926).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0004:card=281",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a2.png",
          "alt": "Painting of Clytemnestra standing after the murder, holding an axe, by John Collier.",
          "credit": "John Collier, Clytemnestra (1882), Guildhall Art Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Genesis, Joseph alone can read Pharaoh's dreams of coming plenty and famine, and on the strength of that foreknowledge he gathers grain \"as the sand of the sea\" through the fat years, then, when scarcity strikes, opens the storehouses and sells to a starving world that streams into Egypt to buy. It is scripture's archetype of privileged information: the one who knows the future first controls the market when it arrives, and the sovereign's household reaps the profit. Trump Media updates the tale, selling not a forecast of the harvest but the very moment a ruler's own words tip the market, letting subscribers buy before the famine of ignorance breaks over ordinary traders. The powerful still profit from foreknowledge of their own storehouse; now the storehouse is a social-media feed.",
        "excerpt": "And Joseph gathered corn as the sand of the sea, very much, until he left numbering; for it was without number. ... And all countries came into Egypt to Joseph for to buy corn; because that the famine was so sore in all lands.",
        "source": "Genesis 41:49, 57, King James Version.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a3.png",
          "alt": "Painting of Joseph enthroned as overseer of Pharaoh's granaries while a scribe tallies the grain.",
          "credit": "Lawrence Alma-Tadema, Joseph, Overseer of Pharaoh's Granaries (1874). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Edgar Degas's Portraits at the Stock Exchange (c. 1878-79) shows the financier Ernest May at the Paris Bourse, a companion leaning in to murmur something at his ear while brokers press behind, a painting built entirely around the whispered tip, the passing of a word that moves money. Degas captures the exact social physics of the modern market: value is minted in who hears what, a half-second before whom. Trump Media's \"Truth API\" industrializes that whisper, replacing the leaned-in confidence with a paid millisecond feed of the President's posts. What Degas painted as an intimate act of privileged access becomes a subscription line item, the whisper at the ear wired to Wall Street and metered by the millisecond.",
        "excerpt": "Degas's canvas frames the market as a theater of confidences: at the center a broker inclines toward Ernest May's ear, his gloved hand almost touching the paper, while a crush of dark-suited figures dissolves into the background. Nothing is bought or sold in the picture except attention itself, the split-second advantage of hearing the word first. The painting makes visible the invisible commodity of the exchange, information delivered privately and acted upon before the room can catch up.",
        "source": "Edgar Degas, Portraits a la Bourse (Portraits at the Stock Exchange), c. 1878-1879, oil on canvas, Musee d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Edgar_Degas_-_Portraits_at_the_Stock_Exchange_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a4.png",
          "alt": "Impressionist painting of a financier at the Paris stock exchange with a colleague whispering in his ear.",
          "credit": "Edgar Degas, Portraits at the Stock Exchange (c. 1878-79), Musee d'Orsay. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth's Emblematical Print on the South Sea Scheme (1721) is the first great satire of a market driven by rumor and access: crowds ride a giddy merry-go-round of speculation while Honesty is broken on a wheel and Fortune's favorites cash out, all whipped up by the promise of easy gain and the manipulation of who knows what. It indicts precisely the ecosystem a \"Truth API\" invites, speculation feeding on privileged, price-moving information, and the well-placed profiting from a frenzy of their own making. Where the South Sea directors talked the market up and sold at the top, Trump Media proposes to sell the utterer's very words as tradable signal. Hogarth's carnival of credulous speculators is our warning label: when the word that moves the market is for sale, the wheel keeps turning and someone always ends up broken beneath it.",
        "excerpt": "Hogarth crowds his print with allegory: a wooden merry-go-round of speculators spins beside a monument inscribed to the ruin of the city by the South Sea scheme, while Honesty is broken on a wheel and Honour is flogged. Villainy, Self-Interest and a leering Devil carve up the body of Fortune and toss the pieces to the scrambling mob. The engraving reads as a single verdict on markets governed by rumor, access and the greed of the well-positioned few.",
        "source": "William Hogarth, Emblematical Print on the South Sea Scheme (The South Sea Scheme), 1721, engraving.",
        "href": "https://en.wikipedia.org/wiki/Emblematical_Print_on_the_South_Sea_Scheme",
        "image": {
          "src": "/covers/trump-media-truth-api-market-feed--a5.png",
          "alt": "Satirical engraving showing crowds of speculators around a merry-go-round during the South Sea Bubble.",
          "credit": "William Hogarth, The South Sea Scheme (1721). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "volkswagen-overhaul-140000-jobs",
    "headline": "Volkswagen's works council says a planned overhaul could cost up to 140,000 jobs as workers prepare to confront the CEO",
    "overview": "Volkswagen's works council said a sweeping restructuring being weighed by chief executive Oliver Blume could ultimately threaten as many as 140,000 jobs, as employee representatives prepared to question him over plans to cut costs at Europe's largest carmaker. Blume has outlined tens of thousands of fresh job cuts on top of an earlier savings drive, along with proposals to halve the model lineup, cut annual capacity to nine million vehicles and potentially close four German plants. The works council and the IG Metall union vowed to \"do everything in our power\" to block the measures.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPZXI5V2RULThybkNadEROSVctcnpWc3FJUlozR2ZYaGJwZXg2TFNsMEs0SXlNV1JhODdjUlUtLXVTLXdFX1FpOGxUMkw1dWxxeEY4UkZJNFNib2ZuSmIteHdMams4R3AyUE9HZ2VEV0hleDhjTWpYRjdGSzV4VHBONkRVOEthTm02MnhUS3Y3cldYYlVzU1pncDI2MTFTR0RUQ1pJX0lWZkFTTkIzZDVZNHlLV3puN00?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-13/vw-ceo-outlines-up-to-50-000-more-job-cuts-to-hit-savings-goals"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/volkswagen-overhaul-140000-jobs.png",
      "alt": "Car bodies moving down a Volkswagen assembly line.",
      "credit": "Volkswagen assembly line, Wolfsburg, 1960, via Wikimedia Commons (CC BY-SA 2.0)"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 494 BC the plebeians of Rome, crushed by debt and denied a political voice, simply walked out of the city and encamped on the Sacred Mount, refusing to work or fight until their grievances were heard - the first recorded general strike, or secessio plebis. The patricians, unable to run the republic without the labour they took for granted, sent the orator Menenius Agrippa, who won the plebs back with his famous parable of the belly and the limbs and the creation of the tribunes to defend them. Volkswagen's works council and IG Metall, vowing to 'do everything in our power' to block Oliver Blume's cuts, are the direct heirs of that ancient withdrawal of labour: a reminder that when the people who actually do the work down tools, even the mightiest institution must come to the table. Then as now, the quarrel is over who bears the cost when the body politic - or the corporation - decides some members may be starved so others may thrive.",
        "excerpt": "In the days when all the parts of the human body were not as now agreeing together, but each member took its own course and spoke its own speech, the other members, indignant at seeing that everything acquired by their care and labour and ministry went to the belly, whilst it, undisturbed in the middle of them, did nothing but enjoy the pleasures provided for it, entered into a conspiracy.",
        "source": "Livy, The History of Rome (Ab Urbe Condita), Book II.32, trans. Rev. Canon Roberts",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=2:chapter=32",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a0.png",
          "alt": "Nineteenth-century engraving of the secession of the plebeians to the Sacred Mount",
          "credit": "B. Barloccini, 'Secession of the People to the Mons Sacer' (1849), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Between 1811 and 1816 the Luddites - skilled English textile workers - smashed the mechanised frames and power looms that were throwing them out of work and driving down wages, until Parliament made frame-breaking a capital crime. In his maiden speech to the House of Lords in February 1812, Lord Byron rose to defend them, insisting that men reduced to starvation by 'improvements in mechanism' deserved bread, not the gallows. His words frame the deepest theme of Volkswagen's crisis: the machine that makes one worker do the work of many, and the human beings 'thrown out of employment' as capacity is cut and plants are shuttered. When the VW works council warns that up to 140,000 jobs and four German factories are at risk, it echoes a two-century argument over whether efficiency should be pursued at any cost to the labourer's dignity.",
        "excerpt": "These machines were to them an advantage, inasmuch as they superseded the necessity of employing a number of workmen, who were left in consequence to starve. By the adoption of one species of Frame in particular, one man performed the work of many, and the superfluous labourers were thrown out of employment... the rejected workmen, in the blindness of their ignorance, instead of rejoicing at these improvements in arts so beneficial to mankind, conceived themselves to be sacrificed to improvements in mechanism.",
        "source": "George Gordon, Lord Byron, Speech on the Frame Work Bill, House of Lords, 27 February 1812, in The Parliamentary Speeches of Lord Byron (1824)",
        "href": "https://archive.org/stream/parliamentaryspe01byro/parliamentaryspe01byro_djvu.txt",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a1.png",
          "alt": "'The Leader of the Luddites', 1812 hand-coloured etching of a machine-breaker",
          "credit": "'The Leader of the Luddites' (1812), hand-coloured etching, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Emile Zola's Germinal (1885) is the great epic of labour against capital: the miners of Montsou, ground down by wage cuts, rise in a doomed strike against a faceless Company that treats them as interchangeable fuel. Zola personifies the pit itself, Le Voreux, as a crouching, gluttonous beast that swallows men whole - the machine and the corporation fused into a single devouring monster. That image maps onto Volkswagen's predicament with uncanny force: a colossal industrial organism, Europe's largest carmaker, contracting its jaws and preparing to consume the livelihoods of tens of thousands. When VW workers assemble to confront their CEO, they step into the same ancient drama Zola dramatised - the collective body of labour facing the cold arithmetic of the balance sheet.",
        "excerpt": "This pit, piled up in the bottom of a hollow, with its squat brick buildings, raising its chimney like a threatening horn, seemed to him to have the evil air of a gluttonous beast crouching there to devour the earth.",
        "source": "Emile Zola, Germinal (1885), trans. Havelock Ellis, Chapter I",
        "href": "https://www.gutenberg.org/files/56528/56528-h/56528-h.htm",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a2.png",
          "alt": "Constantin Meunier painting of coal miners returning from the pit",
          "credit": "Constantin Meunier, 'Return of the Miners', public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Charles Dickens's Hard Times (1854) gave English literature its enduring nightmare of industrial life: Coketown, where the steam-engine's piston works 'monotonously up and down, like the head of an elephant in a state of melancholy madness', and where the workers are known collectively and coldly as 'the Hands'. Dickens indicts a philosophy that reduces human beings to units of production, useful only for the labour their hands can supply and discarded when the ledger demands. Volkswagen's restructuring speaks that same language - capacity, model counts, plant closures - the abstractions behind which stand living workers and the towns built around their factories. To halve the model range and gut whole plants is to treat the Hands once more as mere figures to be subtracted, exactly the dehumanisation Dickens set out to expose.",
        "excerpt": "It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times (1854), Book I, Chapter V, 'The Key-note'",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a3.png",
          "alt": "Interior of a Lancashire cotton mill with workers tending power looms, engraving of 1835",
          "credit": "'Powerloom weaving in 1835', engraving after T. Allom, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Robert Koehler's monumental canvas The Strike (Der Streik, 1886) freezes the exact moment Volkswagen's workers now approach: labourers massed outside the mill gates, confronting the top-hatted owner who stands on his steps as one worker stoops to pick up a stone. Painted the year of the Haymarket affair, it became an icon of organised labour precisely because it captures the charged instant when deference curdles into defiance and management must finally face the people it employs. That is the tableau promised as VW's works council and IG Metall prepare to 'confront the CEO' over cuts that could cost 140,000 jobs. Koehler's crowd - anxious, angry, resolute - is a portrait of collective power discovering its voice, the same voice German trade unionists are raising in Wolfsburg today.",
        "excerpt": "Painted in 1886, Koehler's wide, cinematic canvas stages a confrontation between striking factory hands and their employer at the gates of the works. The owner in his frock coat and top hat stands rigid on the steps while the workers surge below - some pleading, some furious, one bending to seize a rock from the ground. It is one of the first great paintings to place the collective worker, rather than the individual hero, at the centre of the drama, and it reads today as the archetype of every showdown between a workforce and the boss.",
        "source": "Robert Koehler, The Strike (Der Streik), oil on canvas, 1886, Deutsches Historisches Museum, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a4.png",
          "alt": "Robert Koehler's 1886 painting of factory workers confronting a top-hatted employer during a strike",
          "credit": "Robert Koehler, 'The Strike' (1886), Deutsches Historisches Museum, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Diego Rivera's Detroit Industry Murals (1932-33), painted for the Detroit Institute of Arts at the depth of the Depression, are the twentieth century's greatest hymn to - and reckoning with - the automobile assembly line. Across vast frescoed walls, ranks of workers move in choreographed labour beside the churning machinery of Ford's River Rouge plant, human bodies and mechanical forms locked in a single mighty, ambivalent rhythm. Rivera captured both the grandeur of industrial production and the way the line subordinates the worker to the machine's tempo - the very tension now tearing at Volkswagen. As Europe's largest carmaker moves to cut capacity to nine million cars and close plants, Rivera's murals stand as a warning that the auto industry's dream of mechanised abundance has always rested on the fragile, precarious dignity of the men and women on the line.",
        "excerpt": "Rivera's frescoes wrap the museum court in a continuous panorama of automobile manufacture: rows of half-clothed workers heave, bend and haul beside conveyor belts and blast furnaces, dwarfed by the great presses and engine blocks of the Ford Rouge complex. The machinery is rendered with the reverence of cathedral sculpture, yet the human figures - varied in race and strained in posture - keep insisting on the labour that makes the marvel possible. It remains the definitive image of the modern car plant as both temple and treadmill.",
        "source": "Diego Rivera, Detroit Industry Murals (north wall), fresco, 1932-33, Detroit Institute of Arts",
        "href": "https://dia.org/collection/detroit-industry-north-wall/58538",
        "image": {
          "src": "/covers/volkswagen-overhaul-140000-jobs--a5.png",
          "alt": "Diego Rivera's Detroit Industry mural north wall depicting workers on a Ford automobile assembly line",
          "credit": "Diego Rivera, 'Detroit Industry' (north wall, 1932-33), Detroit Institute of Arts, via Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "kimi-k3-largest-open-model",
    "headline": "China's Moonshot AI releases Kimi K3, a 2.8-trillion-parameter model it calls the world's largest open-weight system",
    "overview": "The Chinese startup Moonshot AI unveiled Kimi K3 on Thursday, a mixture-of-experts model with about 2.8 trillion parameters and a one-million-token context window that it says is the largest open-source model yet released and that benchmarks close to the strongest proprietary systems from Anthropic and OpenAI. The model, whose full weights are due to be published on July 27 under a modified MIT licence, is priced at $3 per million input tokens and $15 per million output tokens—the most expensive of any Chinese lab and on par with Anthropic's Claude Sonnet series. It leans on two in-house architectural inventions, Kimi Delta Attention and Attention Residuals.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison",
        "href": "https://simonwillison.net/2026/Jul/16/kimi-k3/"
      },
      {
        "name": "VentureBeat",
        "href": "https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/kimi-k3-largest-open-model.png",
      "alt": "An abstract visualization of a large neural network of glowing nodes.",
      "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna. Public domain via Wikimedia Commons."
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the third century BCE the Ptolemies of Alexandria set out to gather every scroll on earth into a single house of learning, buying, copying, and even confiscating books until the collection swelled toward half a million rolls, a colossal open store of the world's knowledge freely consultable by scholars. Moonshot AI's Kimi K3 revives that Alexandrian ambition in silicon: a 2.8-trillion-parameter model with a million-token memory, its full weights thrown open to all comers under a near-MIT licence. Where Demetrius commanded 'vast sums of money' to hoard the wisdom of every nation, a Chinese lab now spends its compute to compress that wisdom into weights anyone may download. Both gestures wager that knowledge concentrated and shared, rather than guarded, is the surest foundation of a golden age, and both provoke rival powers who would rather keep their libraries private.",
        "excerpt": "Demetrius of Phalerum, the president of the king's library, received vast sums of money, for the purpose of collecting together, as far as he possibly could, all the books in the world. By means of purchase and transcription, he carried out, to the best of his ability, the purpose of the king.",
        "source": "The Letter of Aristeas, sections 9-10, translated by H. St. J. Thackeray (public domain), describing the ambition of the Great Library of Alexandria.",
        "href": "https://www.attalus.org/translate/aristeas1.html",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a0.png",
          "alt": "Nineteenth-century engraving imagining the Great Library of Alexandria, scholars conversing among scrolls and columned halls",
          "credit": "O. Von Corven, The Great Library of Alexandria (19th-century engraving). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "When Johannes Gutenberg pressed movable type into service around 1450, a technology once confined to slow monastic scriptoria became an engine that flooded Europe with cheap books, breaking the clergy's monopoly on the written word and igniting the Reformation and the scientific revolution. Francis Bacon, looking back, ranked printing among the three inventions that had remade the whole world. Kimi K3 is the print revolution's heir: a powerful generative intelligence released not as a jealously licensed proprietary service but as open weights, priced to undercut and shipped to anyone with a hard drive. As printing turned scarce manuscripts into a public commons and unseated established authorities, an open frontier-class model threatens to democratise a capability the largest Western labs had hoped to meter and control.",
        "excerpt": "Again, we should notice the force, effect, and consequences of inventions, which are nowhere more conspicuous than in those three which were unknown to the ancients; namely, printing, gunpowder, and the compass. For these three have changed the appearance and state of the whole world: first in literature, then in warfare, and lastly in navigation; and innumerable changes have been thence derived, so that no empire, sect, or star, appears to have exercised a greater power and influence on human affairs than these mechanical discoveries.",
        "source": "Francis Bacon, Novum Organum, Book I, Aphorism CXXIX, translated by Joseph Devey (1902), on printing as a world-changing invention.",
        "href": "https://www.gutenberg.org/files/45988/45988-h/45988-h.htm",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a1.png",
          "alt": "Jost Amman's 1568 woodcut of a printing workshop, a compositor and pressman at an early wooden printing press",
          "credit": "Jost Amman, The Printer, woodcut from Das Standebuch (1568). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus's Prometheus is the archetype of the benefactor who steals a jealously guarded power of the gods and hands it freely to mortals, and in his great speech he claims to have given humanity not only fire but number, letters, and the memory that undergirds every art. Kimi K3 is a Promethean gift in exactly this key: intelligence itself, once the closely held property of a few Olympian labs, unbound and offered to the whole species under an open licence. Moonshot's engineers, like the Titan, defy the reigning powers who would keep the flame proprietary, and they too may reckon with a backlash from those who fear what mortals will do with such a gift. The play insists that civilisation itself springs from knowledge released rather than hoarded, the very wager an open-weight supermodel makes.",
        "excerpt": "Yes, and numbers, too, chiefest of sciences, I invented for them, and the combining of letters, creative mother of the Muses' arts, with which to hold all things in memory.",
        "source": "Aeschylus, Prometheus Bound, lines 459-461, translated by Herbert Weir Smyth (1926), Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0010%3Acard%3D436",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a2.png",
          "alt": "Peter Paul Rubens's painting Prometheus Bound, the Titan chained to a rock as an eagle tears at him for gifting fire to mankind",
          "credit": "Peter Paul Rubens, Prometheus Bound (c. 1611-1618), Philadelphia Museum of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Mary Shelley subtitled her novel 'The Modern Prometheus,' and her Victor Frankenstein embodies the ecstasy and dread of a maker who discovers the secret of animating matter and dares to bring a new intelligence into being. Kimi K3's 2.8 trillion parameters are a comparable act of creation at colossal scale, and its release to the public transforms the private laboratory experiment into a thing loosed upon the world. Shelley's tale is the enduring cautionary myth of the age of artificial minds: the question is never only whether the creature can be made, but whether its maker can answer for it once it walks free. To open the weights of a frontier model is to grant the creature its own life beyond the creator's control, precisely the moral hazard that has haunted the Modern Prometheus for two centuries.",
        "excerpt": "After days and nights of incredible labour and fatigue, I succeeded in discovering the cause of generation and life; nay, more, I became myself capable of bestowing animation upon lifeless matter.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818; 1831 edition), Chapter 4.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a3.png",
          "alt": "Theodor von Holst's 1831 frontispiece to Frankenstein, the newly animated creature rising as its horrified maker flees",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Heinrich Friedrich Fuger's Prometheus Brings Fire to Mankind renders the myth as pure gift: the Titan bends toward crouching mortals and touches his torch to theirs, and light spreads visibly from one hand to the next. It is an image of a transformative power passing out of divine keeping and into open circulation, kindling flame after flame with no diminishment of the source. That is precisely the logic of an open-weight release like Kimi K3: once the model is downloaded, copied, and fine-tuned across the world, the capability propagates like Fuger's fire, illuminating countless new hands from a single act of generosity. The painting's warm chiaroscuro captures both the promise and the danger of handing so potent a flame to the crowd.",
        "excerpt": "Fuger's neoclassical canvas stages the exact moment of transmission, the Titan's torch meeting the mortals' in a burst of gold against deep shadow. Bodies lean in from the dark toward the new light, their faces lit by a power that was, an instant before, the exclusive property of the gods. The composition makes an abstract idea tangible: a jealously guarded intelligence becoming, in a single gesture, freely shared.",
        "source": "Heinrich Friedrich Fuger, Prometheus Brings Fire to Mankind (c. 1817), oil on canvas, Liechtenstein Museum, Vienna.",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a4.png",
          "alt": "Heinrich Fuger's painting Prometheus Brings Fire to Mankind, the Titan passing a burning torch to mortals emerging from darkness",
          "credit": "Heinrich Friedrich Fuger, Prometheus Brings Fire to Mankind (c. 1817). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's only ballet, The Creatures of Prometheus, dramatises the Titan animating two lifeless clay statues and leading them to the gods to be schooled in the arts and sciences, its exuberant overture heralding the birth of new beings quickened by a stolen spark. The score is a celebration of creation and enlightenment, of raw matter awakened into intelligent life and then taught to reason and to feel. Kimi K3 sounds the same triumphant note: an artificial mind stirred into being at unprecedented scale and then set loose to be tutored by the whole world through open weights. Beethoven's music frames the Promethean act not as transgression but as jubilant gift, the same optimistic register in which a lab releasing its largest model invites all humanity to become its teachers and heirs.",
        "excerpt": "Beethoven's overture opens with a jolt of harmony and then races forward in bright, breathless strings, the musical image of inert matter suddenly quickened into motion. The ballet that follows leads its newborn creatures from clumsy first steps toward grace, knowledge, and joy. It is the Promethean spark scored for orchestra, creation heard as celebration rather than as crime.",
        "source": "Ludwig van Beethoven, Die Geschopfe des Prometheus (The Creatures of Prometheus), Op. 43 (1801), score at the International Music Score Library Project.",
        "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/kimi-k3-largest-open-model--a5.png",
          "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven holding the manuscript of the Missa Solemnis",
          "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven (1820). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "taco-bell-lettuce-cyclosporiasis",
    "headline": "Taco Bell pulls shredded lettuce after a parasite outbreak linked to a single supplier sickens thousands",
    "overview": "Taco Bell said it was indefinitely removing shredded iceberg lettuce from one supplier after U.S. health officials linked it to a multistate outbreak of cyclosporiasis, a parasitic infection that causes prolonged, explosive diarrhoea. The CDC has confirmed 1,645 cases, with roughly 5,100 more under investigation and about 140 people hospitalised and no deaths, across Indiana, Kentucky, Michigan, Ohio and West Virginia since mid-May. An FDA traceback pointed to iceberg lettuce grown in Mexico and supplied by Taylor Farms, which was tied to a similar 2013 outbreak that sickened hundreds.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cm2gnglyv0jo"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/16/health/cyclospora-outbreak-shredded-lettuce"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/taco-bell-lettuce-cyclosporiasis.png",
      "alt": "Shredded iceberg lettuce, the ingredient at the centre of the outbreak.",
      "credit": "CDC Public Health Image Library, via Wikimedia Commons (public domain)"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before microscopes, medieval Europe was scourged by ergotism, or 'St. Anthony's Fire,' a hidden parasite of the food supply: the fungus Claviceps purpurea, which colonised rye in damp seasons and, milled unseen into everyday bread, delivered gangrene, convulsions and hallucinations to whole villages at once. Chroniclers described limbs blackening and 'burning' without any visible wound, because the poison lay concealed in the loaf itself, entering through the one staple everyone trusted. Like today's diners who bit into an ordinary Taco Bell taco and swallowed Cyclospora with the shredded iceberg, medieval sufferers were felled not by rare food but by the most common one, corrupted at a single agricultural source. The parallel is exact in its cruelty: a parasite riding the ordinary grain, or the ordinary leaf, that no eye could detect.",
        "excerpt": "Ergotism, known in the Middle Ages as ignis sacer or 'St. Anthony's Fire,' was caused by eating rye and cereals contaminated with the alkaloid-bearing fungus Claviceps purpurea. Outbreaks could sicken entire communities that shared a single contaminated harvest or mill, producing gangrene, seizures and hallucinations, with the true cause invisible in the bread until modern mycology and food inspection finally traced it to the grain.",
        "source": "Ergotism (St. Anthony's Fire); depicted in Pieter Bruegel the Elder, 'The Beggars' (The Cripples), 1568, Musee du Louvre",
        "href": "https://en.wikipedia.org/wiki/Ergotism",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a0.png",
          "alt": "Pieter Bruegel the Elder, The Beggars (1568), five crippled figures, sometimes read as victims of gangrenous ergotism",
          "credit": "Pieter Bruegel the Elder, Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "In 1854, when cholera exploded through London's Soho, the physician John Snow refused the reigning theory of poisonous 'bad air' and instead did the shoe-leather detective work of tracing every death back to a single source: the public water pump on Broad Street. By mapping the dead and interviewing survivors he showed that nearly all had drunk from that one well, and famously had the pump handle removed to stop the outbreak. This is precisely the logic of the FDA traceback that followed the 2026 cyclosporiasis cases from thousands of scattered patients to iceberg lettuce from one supplier, Taylor Farms, grown in a single region of Mexico. Snow's Broad Street pump and the CDC's contaminated lettuce line are the same story two centuries apart: a dispersed plague resolved into one point of failure in what people ate and drank.",
        "excerpt": "The most terrible outbreak of cholera which ever occurred in this kingdom, is probably that which took place in Broad Street, Golden Square, and the adjoining streets, a few weeks ago. There had been no particular outbreak or increase of cholera, in this part of London, except among the persons who were in the habit of drinking the water of the above-mentioned pump-well.",
        "source": "John Snow, 'On the Mode of Communication of Cholera,' 2nd ed. (London: John Churchill, 1855)",
        "href": "https://books.google.com/books/about/On_the_Mode_of_Communication_of_Cholera.html?id=-N0_AAAAcAAJ",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a1.png",
          "alt": "Portrait of the physician John Snow (1813-1858), pioneer of epidemiology",
          "credit": "Autotype portrait of John Snow, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Sophocles opens 'Oedipus the King' with a plague that has struck Thebes at every level of its food chain, and the whole drama becomes a work of public-health detection: a pollution has entered the city from a single hidden source, and it cannot be lifted until that source is traced and removed. Oedipus, the investigator, methodically questions witnesses and follows the trail, only to discover the contamination lies at the very center of his household. The play dramatises exactly what a modern FDA traceback attempts, the search for the one origin of a diffuse affliction, though here the tainted source is a crime rather than a lettuce field. When Taco Bell 'indefinitely' pulled a single supplier's produce, it was performing the civic act Thebes demanded: identify the pollution and cut it out to make the community whole again.",
        "excerpt": "A blight is on our harvest in the ear,\nA blight upon the grazing flocks and herds,\nA blight on wives in travail; and withal\nArmed with his blazing torch the God of Plague\nHath swooped upon our city emptying\nThe house of Cadmus, and the murky realm\nOf Pluto is full fed with groans and tears.",
        "source": "Sophocles, 'Oedipus the King,' trans. Francis Storr, in 'The Plays of Sophocles' (Loeb / Project Gutenberg)",
        "href": "https://www.gutenberg.org/cache/epub/31/pg31.txt",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a2.png",
          "alt": "Jean-Auguste-Dominique Ingres, Oedipus and the Sphinx (1808), Oedipus questioning the Sphinx",
          "credit": "Jean-Auguste-Dominique Ingres, Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Upton Sinclair's 1906 novel 'The Jungle' tore open Chicago's meatpacking industry, exposing how spoiled, adulterated and rat-fouled food was funneled into the national supply and sold to unsuspecting families. His catalogue of horrors, moldy sausage returned from Europe and 'dosed with borax and glycerine,' meat swept off filthy floors, rats and poisoned bread shovelled into the hoppers together, made contaminated food a public scandal and helped drive the Pure Food and Drug Act into law that same year. The book's enduring warning is that a modern, industrial, single-supplier food chain can quietly deliver poison at scale, precisely the fragility exposed when one supplier's iceberg lettuce sickened more than sixteen hundred people across five states. Sinclair's rats in the hopper and the parasite in the shredded lettuce belong to the same nightmare: what looks like ordinary food, corrupted invisibly at the source.",
        "excerpt": "There was never the least attention paid to what was cut up for sausage; there would come all the way back from Europe old sausage that had been rejected, and that was moldy and white -- it would be dosed with borax and glycerine, and dumped into the hoppers, and made over again for home consumption. There would be meat that had tumbled out on the floor, in the dirt and sawdust, where the workers had tramped and spit uncounted billions of consumption germs. There would be meat stored in great piles in rooms; and the water from leaky roofs would drip over it, and thousands of rats would race about on it... These rats were nuisances, and the packers would put poisoned bread out for them; they would die, and then rats, bread, and meat would go into the hoppers together.",
        "source": "Upton Sinclair, 'The Jungle' (New York: Doubleday, Page & Co., 1906), ch. 14",
        "href": "https://www.gutenberg.org/files/140/140-h/140-h.htm",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a3.png",
          "alt": "Entrance to the Union Stock Yards, Chicago, circa 1901-1907, the setting of Sinclair's The Jungle",
          "credit": "Photograph circa 1901-1907, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin's 'The Plague at Ashdod' (1630-31) depicts the biblical pestilence that fell on the Philistines, and the painter did something startling for his age: he scattered rats across the foreground, among the collapsing and the dead, making visible the unseen carrier of the contagion. Long before germ theory, the picture intuits that plague travels through a physical vector hidden in daily life, an insight vindicated by later science and echoed in every modern outbreak investigation. It is the visual counterpart to today's traceback, which found in a single lettuce line the concealed 'carrier' of Cyclospora that had spread misery across a population. Poussin's stricken city, felled by something creeping unnoticed among its people, is the old face of a very current fear: that the source of our suffering has been beneath our notice all along.",
        "excerpt": "Poussin stages a city convulsed by plague: the dead and dying sprawl across a grand classical square while survivors recoil and cover their faces. In the foreground he paints small rats moving among the bodies, an unusually literal depiction of an invisible agent of contagion, turning a religious scene into a meditation on how pestilence spreads unseen through an ordinary populace.",
        "source": "Nicolas Poussin, 'The Plague at Ashdod,' 1630-1631, oil on canvas, Musee du Louvre (INV 7276)",
        "href": "https://en.wikipedia.org/wiki/Plague_of_Ashdod_(Poussin)",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a4.png",
          "alt": "Nicolas Poussin, The Plague at Ashdod (1630-31), a plague-stricken city with rats visible in the foreground",
          "credit": "Nicolas Poussin, Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Caravaggio's 'Basket of Fruit' (c. 1599) looks at first like a hymn to abundance, a woven basket of apples, grapes, figs and leaves offered at eye level, yet the closer one looks the more corruption appears: a wormhole bored through the apple, spotted and shrivelling leaves, fruit already turning. The painter refused to idealise; he showed produce exactly as it decays, the blemish hidden inside the beautiful. That is the precise unease of the 2026 outbreak, in which crisp, wholesome-looking shredded iceberg concealed a parasite that no diner could see. Caravaggio's basket is a four-hundred-year-old warning about the fragility of trust in food, that the freshest-seeming leaf may carry, unnoticed, the thing that harms us.",
        "excerpt": "On a plain ledge Caravaggio sets a wicker basket brimming with fruit and vine leaves, painted with unsparing realism. An apple is pierced by a wormhole, several leaves are withered, spotted and curling with blight, and the ripe fruit teeters on the edge of decay, so that the image of plenty is shadowed throughout by the reality of corruption concealed within seemingly perfect produce.",
        "source": "Caravaggio (Michelangelo Merisi da Caravaggio), 'Basket of Fruit' (Canestra di frutta), c. 1597-1600, oil on canvas, Biblioteca Ambrosiana, Milan",
        "href": "https://en.wikipedia.org/wiki/Basket_of_Fruit_(Caravaggio)",
        "image": {
          "src": "/covers/taco-bell-lettuce-cyclosporiasis--a5.png",
          "alt": "Caravaggio, Basket of Fruit (c. 1599), a basket of fruit with a wormhole in an apple and withered, blighted leaves",
          "credit": "Caravaggio, Biblioteca Ambrosiana, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "chongqing-landslide-pengshui",
    "headline": "A rain-triggered landslide buries more than 10 buildings in Chongqing, China, forcing over 1,100 to evacuate",
    "overview": "A landslide swept down a hillside in Pengshui County in the southwestern Chinese municipality of Chongqing at about 9:08 a.m. Friday, burying more than 10 residential buildings and trapping an unknown number of people, state media reported. A community worker had spotted falling rocks around 8 a.m. and ordered an evacuation, but the slope gave way during the operation, catching some residents; at least nine people were pulled from the debris as rescuers deployed more than 50 sets of search equipment. More than 1,100 people were moved to safety near the Wujiang River, which cuts through the region's karst mountains.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxQbUJDeWR6ZzBjeW5NNEJUa3ZUeHNmSEFnWXAwREZESldzR0NGbWNFc19OWGx6UlVBcU5RY1R3MjBhZ0pYS0tBV2ZUSWRhTU9HWHhkYmotMG1IUDZaSHM3UXRteXgtRjhVVXRIcExYQzdQRnF0MkhmRExMLWdJZHplT0hESllSVFZfWmpWMkRBTWxzMzRxNGRlcGh6ZGkxWHR6c3FYYWZIVlJqVlI1VHhj?oc=5"
      },
      {
        "name": "NBC News",
        "href": "https://www.nbcnews.com/world/asia/landslide-southwest-china-traps-people-rescue-efforts-underway-rcna587957"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/chongqing-landslide-pengshui.png",
      "alt": "A hillside scarred by a landslide above a river valley.",
      "credit": "Photograph of the Frank Slide, 30 April 1903, Alberta; public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Before dawn on 29 April 1903, roughly 44 million cubic metres of limestone peeled off Turtle Mountain and swept over the eastern edge of the coal town of Frank in Alberta, reaching the valley floor in about a hundred seconds and entombing dozens of sleeping residents. As in Pengshui, the parallel that haunts is not only the burial but the digging-out: seventeen miners tunneled thirteen hours through blocked shafts to daylight, and rescuers pulled survivors, including a two-year-old girl, alive from the rubble. Turtle Mountain's stacked limestone over weaker shale is a close cousin of the karst slopes above the Wujiang, where soluble, fractured rock hides its own instability until it fails. The nine people freed from the Chongqing debris are the direct heirs of Frank's dug-out living, proof that even a mountain's full weight does not always mean the end.",
        "excerpt": "Between roughly seventy and ninety people were killed when a wedge of Turtle Mountain about a kilometre wide broke free at 4:10 a.m. and buried the eastern part of Frank in under two minutes. Yet twenty-three people directly in the slide's path survived, and all seventeen night-shift miners escaped after hours of digging; the toddler Gladys Ennis, found in the mud outside her home, outlived every other survivor. It remains the deadliest rockslide in Canadian history, a whole edge of a town swallowed while it slept.",
        "source": "The Frank Slide, Turtle Mountain, Alberta, 29 April 1903",
        "href": "https://en.wikipedia.org/wiki/Frank_Slide",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a0.png",
          "alt": "1903 photograph of the Frank Slide rock debris covering the valley below Turtle Mountain in Alberta",
          "credit": "Rock slide at Frank, Alta. (1903); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On 4 September 1618 a face of Monte Conto crashed down onto Plurs (Piuro), a rich merchant town in the Val Bregaglia famed for its palazzi and soapstone workshops, and in moments the settlement simply ceased to exist beneath the rubble. Estimates of the dead run from a thousand to well over two thousand; unlike Frank or Pengshui there was almost no digging-out, only a vanished town remembered in engravings that show its streets 'before' and its blank grave 'after.' The Chongqing landslide, which buried more than ten buildings and forced over 1,100 to flee, is a smaller rhyme of that early-modern terror: a hillside that had loomed harmlessly for generations turning, without appeal, into a lid. Plurs is the memento of what the Pengshui evacuation order at 8 a.m. was racing against, the moment when a place can be erased faster than anyone can run.",
        "excerpt": "On the night of 4 September 1618 the flank of the mountain above Plurs gave way and completely wiped out the town, killing between one thousand and roughly two and a half thousand people in what remains one of the worst landslides in recorded history. Contemporaries called it an avalanche, though it was more likely a colossal slide of rock and mud. The prosperous town, its churches and palaces, was buried so deeply that the site was never rebuilt in place.",
        "source": "The destruction of Plurs (Piuro), Val Bregaglia, 4 September 1618",
        "href": "https://en.wikipedia.org/wiki/Piuro",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a1.png",
          "alt": "1618 engraving showing the town of Plurs before its destruction and the blank field of rubble that replaced it after the landslide",
          "credit": "'Eigentlich Vorbildung des schoenen Fleckens Plurs...', 1618 engraving, Bibliotheque nationale de France (Gallica); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Pliny the Younger, writing to the historian Tacitus, left the West's first great eyewitness account of a landscape turning lethal: as Vesuvius erupted in AD 79 he watched the very ground betray the built world around him. His detail of carts sliding on level pavement and the sea recoiling from the shaking earth captures exactly the uncanny instant a Pengshui worker glimpsed at 8 a.m. when rocks began to fall from a slope that had always held. Pliny's crowd, choosing his family's flight plan 'in their panic,' mirrors the more than 1,100 residents hurried from the Wujiang bank while the hillside was still deciding. His letter endures because it names the specific horror of these disasters: not water or fire alone, but solid earth losing its faith with the people who live on it.",
        "excerpt": "For although the ground was perfectly level, the vehicles which we had ordered to be brought with us began to sway to and fro, and though they were wedged with stones, we could not keep them still in their places. Moreover, we saw the sea drawn back upon itself, and, as it were, repelled by the quaking of the earth.",
        "source": "Pliny the Younger, Letters, Book VI, Letter 20 (to Cornelius Tacitus), trans. J. B. Firth (1900)",
        "href": "https://www.attalus.org/old/pliny6.html",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a2.png",
          "alt": "Angelica Kauffmann's 1785 painting of Pliny the Younger and his mother at Misenum as Vesuvius erupts in the distance",
          "credit": "Angelica Kauffmann, 'Pliny the Younger and his Mother at Misenum, 79 A.D.', 1785, Princeton University Art Museum; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the Book of Numbers the rebellion of Korah is punished by the most literal disaster imaginable: the ground splits and the earth 'opens her mouth' to swallow the rebels, their households and their goods, closing over them so that they go down alive into the pit. It is the ur-image of the theme running through Pengshui, the earth itself as devourer of homes, buildings and their occupants gone in an instant beneath the ground. Scripture frames it as judgment, but stripped of theology it is a precise description of a landslide's terror: the solid floor of the world giving way and taking a whole household with it. For a reader watching more than ten Chongqing buildings vanish, this ancient verse supplies the oldest vocabulary we have for a slope that opens and closes over the living.",
        "excerpt": "And it came to pass, as he had made an end of speaking all these words, that the ground clave asunder that was under them: And the earth opened her mouth, and swallowed them up, and their houses, and all the men that appertained unto Korah, and all their goods. They, and all that appertained to them, went down alive into the pit, and the earth closed upon them: and they perished from among the congregation.",
        "source": "Numbers 16:31-33, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Numbers",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a3.png",
          "alt": "Gustave Dore's 1866 engraving of the earth opening to swallow Korah, Dathan and Abiram, figures falling into a chasm",
          "credit": "Gustave Dore, 'The Death of Korah, Dathan and Abiram', from the 1866 illustrated Bible; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov's vast canvas 'The Last Day of Pompeii' (1830-1833) freezes the moment a city dies under a collapsing sky: columns topple, statues pitch from their pedestals, and families shield one another as the built world comes apart above them. Bryullov painted from the excavated ruins themselves, so the picture is at once art and reconstruction, the buried town made to re-enact its own burial. That doubled gesture, catastrophe and unearthing, is the exact arc of Pengshui, where more than ten buildings were swallowed and nine people were then dug back out of the debris. The painting's crowd, caught between flight and paralysis under falling masonry, is the timeless portrait of the 1,100 evacuees on the Wujiang, human figures small beneath a landscape that has turned against them.",
        "excerpt": "A monumental Romantic canvas showing the citizens of Pompeii fleeing beneath a blood-red, lightning-torn sky as buildings and statues collapse around them. Bryullov based the scene on his own study of the excavated city, lending the painting an archaeological precision beneath its operatic terror. Mothers cover children, a fallen woman lies in the foreground, and a charioteer's horses rear as the ground itself seems to buckle.",
        "source": "Karl Bryullov, 'The Last Day of Pompeii', 1830-1833, State Russian Museum, St Petersburg",
        "href": "https://en.wikipedia.org/wiki/The_Last_Day_of_Pompeii",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a4.png",
          "alt": "Karl Bryullov's painting The Last Day of Pompeii, showing citizens fleeing beneath collapsing buildings and a fiery sky",
          "credit": "Karl Bryullov, 'The Last Day of Pompeii' (1830-1833), State Russian Museum; public domain, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin's apocalyptic 'The Great Day of His Wrath' (1851-53) shows entire mountains torn loose and hurled down upon a doomed city, the solid earth itself upended in a black cataract of rock and fire. More than any painting of flood or storm, it visualizes the specific dread of a landslide: not the sea rising but the ground descending, a mountain giving way and burying everything beneath it. That is precisely what unfolded above Pengshui, where a hillside in the karst mountains slid down onto homes along the Wujiang. Martin turns the geologic instant of the Chongqing slope into cosmic theatre, the same overwhelming force that a single worker tried to outrun with an 8 a.m. warning made vast and final on canvas.",
        "excerpt": "An enormous, thunderous canvas in which whole mountains are ripped from their foundations and crash down onto a city amid crimson fire and blackness. Part of Martin's Last Judgement triptych, it renders divine wrath as a geological cataclysm, the earth's own mass turned into a weapon. Tiny human figures are engulfed at the base of the composition as the landscape folds over on itself.",
        "source": "John Martin, 'The Great Day of His Wrath', 1851-1853, Tate, London",
        "href": "https://www.tate.org.uk/art/artworks/martin-the-great-day-of-his-wrath-n05613",
        "image": {
          "src": "/covers/chongqing-landslide-pengshui--a5.png",
          "alt": "John Martin's painting The Great Day of His Wrath, showing mountains collapsing onto a city in fire and darkness",
          "credit": "John Martin, 'The Great Day of His Wrath' (1851-1853), Tate; public domain, via Wikimedia Commons (Google Art Project)"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "crystal-palace-dinosaurs-restored",
    "headline": "London's Victorian Crystal Palace dinosaurs are restored to their original look after decades of decay",
    "overview": "The Grade I-listed Crystal Palace dinosaurs, the world's first life-size models of prehistoric animals, unveiled in south London in 1854, are being returned to their Victorian appearance in a multimillion-pound conservation phase led by HTA Design. Specialists from SSH Conservation have been steam-cleaning the sculptures, stripping decades of overpaint and repairing crumbling mortar, revealing their original detailing for the first time in years. The work, funded partly by the National Lottery Heritage Fund and due for completion in autumn 2026, is part of a wider regeneration that will add a visitor centre and a dinosaur-themed playground.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/17/crystal-palace-dinosaurs-restored-hta-design/"
      },
      {
        "name": "Time Out",
        "href": "https://www.timeout.com/london/news/crystal-palace-dinosaurs-victorian-restoration-071626"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/crystal-palace-dinosaurs-restored.png",
      "alt": "The Victorian life-size dinosaur sculptures at Crystal Palace Park in London.",
      "credit": "Photograph by Ian Wright, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On New Year's Eve 1853, before the models were even finished, Hawkins staged a banquet for twenty-one leading men of science inside the hollow mould of his half-built Iguanodon, with Richard Owen presiding as if enthroned in the beast's skull. The diners toasted the resurrection of the ancient world and roared a specially written song whose refrain insisted the \"jolly old beast\" was \"not deceased.\" That same theatrical faith — that extinct monsters could be summoned back to sensuous, life-size presence for a paying public — is exactly what the current restoration seeks to recover. Scrubbing away decades of decay, HTA Design and SSH Conservation are returning the creatures once feasted inside to the look that astonished their first Victorian audience.",
        "excerpt": "A thousand ages underground, / His skeleton had lain, / But now his body's big and round / And there's life in him again!... The jolly old beast / Is not deceased / There's life in him again! / ROAR",
        "source": "Edward Forbes, song for the \"Dinner in the Iguanodon,\" Crystal Palace, 31 December 1853; lyrics reproduced by the University of Cambridge.",
        "href": "https://www.cam.ac.uk/research/features/iggy-the-iguanodon-and-the-160-year-old-dinosaur-song",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a0.png",
          "alt": "The 1853 New Year's Eve banquet held inside the mould of the Crystal Palace Iguanodon",
          "credit": "Illustrated London News, 7 January 1854; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "When Roman labourers unearthed the Laocoön from a vineyard in 1506, the ancient marble came up broken — the priest's right arm missing — and a generation of Renaissance sculptors argued over how to complete it, eventually bolting on a heroic outstretched arm that proved entirely wrong; the true bent arm was rediscovered only in 1906. Pliny had already immortalised the group as a work carved from a single block and preferable to all other art, making its recovery and repair a founding drama of antiquarian restoration. Hawkins and Owen faced the same puzzle in reverse, reassembling whole animals from scraps of bone, and like Laocoön's restorers they guessed wrong about posture and anatomy. Today's conservators, steam-cleaning and re-mortaring the Grade I-listed monsters, inherit that centuries-old dilemma: how faithfully to mend a famous, flawed reconstruction without erasing the very errors that make it history.",
        "excerpt": "This is the case with the Laocoön in the palace of the emperor Titus, a work superior to any painting and any bronze. Laocoon, his children and the wonderful clasping coils of the snakes were carved from a single block in accordance with an agreed plan by those eminent craftsmen Hagesander, Polydorus and Athenodorus, all of Rhodes.",
        "source": "Pliny the Elder, Natural History 36.37 (Rackham translation), via Attalus.",
        "href": "https://www.attalus.org/translate/pliny_hn36a.html",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a1.png",
          "alt": "The Laocoön and His Sons, ancient marble group in the Vatican Museums",
          "credit": "Photograph by Jastrow; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Dickens opened Bleak House in 1852 — the very months Hawkins was moulding his monsters a few miles to the south — by imagining a Megalosaurus \"forty feet long or so, waddling like an elephantine lizard up Holborn Hill\" through the primordial mud of a fog-bound London. The joke fuses deep geological time with the modern city, precisely the collision the Crystal Palace dinosaurs made concrete in cement and iron. To restore those sculptures is to restore Dickens's fantasy to literal standing: the prehistoric beast still loose in the London suburbs, dredged out of the mud of decades and set once more on its feet.",
        "excerpt": "London. Michaelmas Term lately over, and the Lord Chancellor sitting in Lincoln's Inn Hall. Implacable November weather. As much mud in the streets as if the waters had but newly retired from the face of the earth, and it would not be wonderful to meet a Megalosaurus, forty feet long or so, waddling like an elephantine lizard up Holborn Hill.",
        "source": "Charles Dickens, Bleak House (1852–53), chapter 1.",
        "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a2.png",
          "alt": "Portrait photograph of Charles Dickens, 1850",
          "credit": "Portrait of Charles Dickens, 1850; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Published in 1850, four years before the dinosaurs rose at Sydenham, Tennyson's In Memoriam stared into the same abyss of deep time the models would make visible, hearing Nature cry from \"scarped cliff and quarried stone\" that a thousand types are gone. His phrase \"Nature, red in tooth and claw\" gave Victorian Britain its motto for a creation ruled by extinction and struggle — the very lesson Owen's stone menagerie was built to teach a Sunday crowd. The restoration returns to the park a three-dimensional stanza of that poem: extinct \"types,\" lovingly reconstructed, standing as monuments to loss and to the age that first dared to picture it.",
        "excerpt": "'So careful of the type?' but no. / From scarped cliff and quarried stone / She cries, 'A thousand types are gone: / I care for nothing, all shall go.' ... Who trusted God was love indeed / And love Creation's final law— / Tho' Nature, red in tooth and claw / With ravine, shriek'd against his creed—",
        "source": "Alfred, Lord Tennyson, In Memoriam A. H. H. (1850), canto 56.",
        "href": "https://www.gutenberg.org/cache/epub/70950/pg70950.txt",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a3.png",
          "alt": "Alfred, Lord Tennyson photographed by Julia Margaret Cameron",
          "credit": "Julia Margaret Cameron, 1869; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In 1830 the geologist Henry De la Beche painted Duria Antiquior — \"a more ancient Dorset\" — the first true attempt to picture a whole scene of prehistoric life, its Jurassic sea churning with ichthyosaurs and plesiosaurs biting, spouting and dying, all reconstructed from Mary Anning's fossils. Sold as a lithograph to raise money for Anning, it taught the public to see deep time as a vivid, inhabited world rather than a table of dead bones — the same imaginative leap Hawkins would soon build at life size. The Crystal Palace restoration is the sculptural heir of De la Beche's watercolour: both take the fragmentary evidence of extinction and restore it to full, coloured, breathing spectacle for a general audience.",
        "excerpt": "A crowded, violent panorama of an ancient Dorset sea: a long-necked plesiosaur rears with a fish in its jaws, ichthyosaurs thrash and devour one another, a pterosaur wheels overhead and crocodiles wallow on the shore, while dung and débris drift through the water. Every creature is drawn from real fossils, yet arranged as a living, feeding, dying ecosystem — the earliest visual reconstruction of deep time as a place one could imagine walking into.",
        "source": "Henry De la Beche, Duria Antiquior, 1830, watercolour and lithograph, National Museum Cardiff.",
        "href": "https://commons.wikimedia.org/wiki/File:Duria_Antiquior.jpg",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a4.png",
          "alt": "Duria Antiquior, Henry De la Beche's 1830 reconstruction of prehistoric marine life in ancient Dorset",
          "credit": "Henry De la Beche, 1830, National Museum Cardiff; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In \"Fossiles,\" the twelfth movement of his 1886 Carnival of the Animals, Saint-Saëns set a xylophone rattling like dry bones, quoting his own Danse macabre and a clutch of old nursery tunes so that the long-dead seem to clack briefly back to life. He suppressed the whole suite during his lifetime, and it was released to the public only after his death in 1921 — a work itself buried, then exhumed and restored to the concert hall. That double motion — extinct creatures reanimated, and a hidden masterpiece brought back into the light — mirrors the Crystal Palace project exactly, as beasts left to moulder for decades are steam-cleaned and re-mortared into their original Victorian brilliance.",
        "excerpt": "A dry, brittle xylophone taps out a skeletal dance, its wooden clatter conjuring bones knocking together in the dark. Saint-Saëns weaves in fragments of his own Danse macabre and half-remembered nursery songs, so that fossils and childhood tunes rise together like relics dug from the same ground — the extinct made to caper for a moment before settling back into silence.",
        "source": "Camille Saint-Saëns, Le carnaval des animaux, \"Fossiles\" (No. 12), 1886.",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/crystal-palace-dinosaurs-restored--a5.png",
          "alt": "Portrait of the composer Camille Saint-Saëns",
          "credit": "Portrait of Camille Saint-Saëns; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "steidl-publisher-insolvency",
    "headline": "Steidl, the art world's leading photobook publisher, enters insolvency proceedings in Germany",
    "overview": "Steidl, the Göttingen publishing house founded by Gerhard Steidl in 1969 and revered for its finely printed photobooks, has entered preliminary insolvency proceedings after a creditor petitioned a German court over unpaid social-security contributions. The house had struggled for months to pay staff regularly—some workers reportedly went five or six months without wages—before filing on July 12; outstanding net wage claims run into the tens of thousands of euros. Steidl's lawyer said the triggering dispute had been settled and that talks with potential investors were under way to carry the company \"into the next generation.\"",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/renowned-german-publisher-steidl-faces-bankruptcy-1234754981/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/news/steidl-the-art-worlds-go-to-photobook-publisher-faces-insolvency-proceedings-in-germany-1234792400/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/steidl-publisher-insolvency.png",
      "alt": "Stacks of finely printed photobooks on a press-room table.",
      "credit": "Photograph by Kevin Eng (NYC Wanderer), 2009, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The first printer of movable type in Europe was also its first bankrupt. Johannes Gutenberg built his Mainz workshop on loans from the financier Johann Fust; when Fust demanded repayment in 1455, the master printer was compelled to surrender his presses, types and the great Bible itself to his creditor, who carried the equipment off and printed on without him. It is the founding parable of the trade: the artisan's genius held hostage to the ledger. Steidl's preliminary insolvency in Göttingen, triggered by a creditor's petition over unpaid contributions, is the same ancient collision between the fine art of the book and the arithmetic that finances it.",
        "excerpt": "We do not know the end of these proceedings, but if Gutenberg had prepared any printing materials it would seem that he was compelled to yield up the whole of them to Fust; that the latter removed them to his own house at Mainz, and there, with the assistance of Peter Schöffer, issued various books.",
        "source": "\"Gutenberg, Johann,\" 1911 Encyclopædia Britannica, Vol. 12",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gutenberg,_Johann",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a0.png",
          "alt": "Engraved portrait of Johannes Gutenberg, inventor of movable-type printing in Europe",
          "credit": "Engraving by Nicolas de Larmessin (17th c.), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In 1891 the poet and craftsman William Morris founded the Kelmscott Press to rescue the printed book from Victorian ugliness, designing his own types, choosing handmade paper and dense black ink, and treating each page as an object worthy of art. His masterpiece, the 1896 Kelmscott Chaucer, remains a summit of the printer's craft, yet the press was so bound to his person that it closed within two years of his death. Like Kelmscott, Steidl is the lengthened shadow of one obsessive master, Gerhard Steidl, who oversees ink, paper and press with the same devotion, which is exactly why its financial peril threatens something irreplaceable rather than merely commercial.",
        "excerpt": "I began printing books with the hope of producing some which would have a definite claim to beauty, while at the same time they should be easy to read and should not dazzle the eye, or trouble the intellect of the reader by eccentricity of form in the letters.",
        "source": "William Morris, A Note by William Morris on his Aims in Founding the Kelmscott Press (1898)",
        "href": "https://archive.org/details/ANoteByWilliamMorrisOnHisAimsInFoundingTheKelmscottPressTogether",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a1.png",
          "alt": "A decorated opening of the 1896 Kelmscott Chaucer printed by William Morris's Kelmscott Press",
          "credit": "William Morris / Kelmscott Press, 1896, Google Art Project, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Balzac opens Lost Illusions not with a hero but with a printing house: the Séchard establishment at Angoulême, its antiquated wooden presses groaning under debt, drink and provincial greed. The novel makes the printshop the very theatre of ruin, where the beautiful, slow craft of the book is ground down by creditors and the cheap economics of the age. Its portrait of a press whose survival hangs on unpaid bills and a founder's fading powers could serve as an epigraph to Steidl's insolvency filing. Balzac knew intimately that the trade in ink and paper is also a trade in illusions lost.",
        "excerpt": "At the time when this story opens, the Stanhope press and the ink-distributing roller were not as yet in general use in small provincial printing establishments.",
        "source": "Honoré de Balzac, Lost Illusions (\"Two Poets\"), trans. Ellen Marriage",
        "href": "https://www.gutenberg.org/files/1443/1443-h/1443-h.htm",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a2.png",
          "alt": "1842 daguerreotype portrait of the novelist Honoré de Balzac",
          "credit": "Daguerreotype by Louis-Auguste Bisson, 1842, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "When Milton rose in 1644 to defend the unlicensed press, he did not argue economics but reverence: a book, he insisted, holds the living essence of the mind that made it, and to destroy one is a kind of murder. Areopagitica remains the great hymn to the printed object as a vessel of the human spirit, worth defending against every censor and every indifference. Steidl's photobooks, obsessively printed to preserve an image exactly as its maker intended, are precisely such vessels, embalming a master spirit in paper. Milton's warning gives the news its weight: what is imperilled in Göttingen is not just a firm but a fragile keeper of life beyond life.",
        "excerpt": "a good book is the precious life-blood of a master spirit, embalmed and treasured up on purpose to a life beyond life.",
        "source": "John Milton, Areopagitica (1644)",
        "href": "https://www.gutenberg.org/cache/epub/608/pg608.txt",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a3.png",
          "alt": "Title page of the first 1644 edition of John Milton's Areopagitica",
          "credit": "John Milton, Areopagitica, 1644, Library of Congress, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jost Amman's 1568 woodcut of the printer's workshop, made for the Ständebuch or Book of Trades, is the earliest great image of the craft in action: the pressman hauling the bar, the compositor at his case, sheets drying, ink and paper transformed into pages. It enshrines printing as an honoured guild art, a dignified labour of hand and eye. Steidl in Göttingen is the direct heir of that workshop, still setting, inking and pressing with artisanal care in an age of digital reproduction. To see this house threatened is to watch Amman's proud scene flicker as if the presses themselves might fall silent.",
        "excerpt": "Amman's crisp woodcut frames the printer's shop as a temple of the trade: at the press a workman drags down the bar to kiss paper against inked type, while behind him compositors pick letters from the case, one page at a time. Ink, paper, wood and human patience combine into the printed image, the very craft Steidl still practises by hand.",
        "source": "Jost Amman, \"Der Buchdrucker\" (The Book Printer), from Das Ständebuch (Frankfurt, 1568)",
        "href": "https://commons.wikimedia.org/wiki/File:Buchdrucker-1568.png",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a4.png",
          "alt": "1568 woodcut showing a Renaissance printer's workshop with a press and compositors at their type cases",
          "credit": "Jost Amman, Das Ständebuch, 1568, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Die Meistersinger von Nürnberg closes with the cobbler-poet Hans Sachs pleading that his townsmen never scorn the masters, for it is the guild's patient craft that keeps German art alive from one generation to the next. The opera is a monument to the dignity of the master artisan and to the fragile institutions that transmit a craft over time. Steidl belongs to that same German lineage of the guarded, guild-like mastery of a trade, and its lawyer's stated hope is precisely to carry the house \"into the next generation.\" Sachs's warning rings across the centuries to Göttingen: honour the masters, or watch their art dissolve into vapour.",
        "excerpt": "Verachtet mir die Meister nicht, / und ehrt mir ihre Kunst! ... Drum sag' ich euch: / ehrt eure deutschen Meister!",
        "source": "Richard Wagner, Die Meistersinger von Nürnberg (1868), Act III, Hans Sachs's final address",
        "href": "https://opera-guide.ch/operas/die+meistersinger+von+nurnberg/libretto/de/",
        "image": {
          "src": "/covers/steidl-publisher-insolvency--a5.png",
          "alt": "1545 portrait of Hans Sachs, the Nuremberg mastersinger and poet who is the hero of Wagner's opera",
          "credit": "Portrait by Michael Ostendorfer, 1545, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "russia-blogger-remeslov-arrest",
    "headline": "Russia arrests Ilya Remeslov, a former Kremlin loyalist turned Putin critic, over 'fakes' about the military",
    "overview": "Russian authorities have arrested the blogger Ilya Remeslov on charges of spreading false information about the armed forces, the state news agency TASS reported Friday, citing police, months after he broke with the Kremlin. In a March manifesto that stunned his former allies, Remeslov denounced President Vladimir Putin for sending Russians to their deaths in a \"dead-end war\" and called for him to be tried as a war criminal. His lawyer said he was being moved from St Petersburg to Moscow to face prosecution; the charge carries up to 10 years in prison.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxNZmFWUnd1OE9XanVTTXVmVldpM09tMVk5WWRVSGVGRUtma3lvT1NrMlNxUDBjT0xjVEVoejFHVVowOGQxdW0tY0hvMFA1ajZhbWZSbW4wRVlkb1pKaFpXekVmb2JJcllLSDA3LVdWQnlNc1gwdHhsMGNLMm45WUxIeHJPTkpJX2hIMVQ2dG1ieGxBQnVVdHExYTdlZlduUmw2bDJqbXZERlZIRVE4OFRHVXd3Rkt1VWpOa3hSRw?oc=5"
      },
      {
        "name": "The Moscow Times",
        "href": "https://www.themoscowtimes.com/2026/07/17/pro-kremlin-blogger-arrested-for-war-fakes-months-after-denouncing-putin-a93275"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-17",
    "image": {
      "src": "/covers/russia-blogger-remeslov-arrest.png",
      "alt": "An empty courtroom, where a dissident blogger faces prosecution.",
      "credit": "Ilya Repin, 'Arrest of a Propagandist' (1880-1889), State Tretyakov Gallery. Public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 17 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero was a pillar of the Roman establishment before he turned the full force of his oratory against Mark Antony, branding him in the Philippics an enemy of the Republic and a would-be tyrant. Antony answered not with argument but with proscription: Cicero was hunted down and beheaded, his head and the hands that wrote against Antony nailed to the Rostra where he had spoken. Remeslov, once a servant of the Kremlin, likewise turned his voice on the ruler, demanding Putin be tried as a war criminal for a 'dead-end war.' As with Antony and Cicero, the powerful man indicted by words replies with the machinery of punishment rather than reply.",
        "excerpt": "I defended the republic as a young man, I will not abandon it now that I am old. I scorned the sword of Catiline, I will not quail before yours.",
        "source": "Cicero, Second Philippic (Philippic II), §46, trans. C. D. Yonge, in 'The Orations of Marcus Tullius Cicero'; Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0021:speech=2:chapter=46",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a0.png",
          "alt": "Ancient Roman marble portrait bust of Cicero, first half of the 1st century AD, in the Capitoline Museums, Rome.",
          "credit": "Bust of Cicero, Musei Capitolini, Rome. Photo Glauco92, CC BY-SA, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In 1790 Alexander Radishchev, a customs official in the service of Catherine the Great, printed 'A Journey from St Petersburg to Moscow,' a searing indictment of serfdom and autocratic power. The empress read it as sedition, called him 'a rebel worse than Pugachev,' and had him condemned to death, the sentence commuted to a decade of Siberian exile; nearly the whole edition was destroyed. Two and a half centuries later another once-loyal servant of the Russian state is being moved along that very St Petersburg-to-Moscow road, not as a traveler but as a prisoner, for words the Kremlin deems false and dangerous. The geography of Russian dissent, and the state's answer to it, has scarcely shifted.",
        "excerpt": "Я взглянул окрест меня — душа моя страданиями человечества уязвлена стала. Обратил взоры мои во внутренность мою — и узрел, что бедствия человека происходят от человека.",
        "source": "Александр Радищев, «Путешествие из Петербурга в Москву» (1790), посвящение; Русская виртуальная библиотека (rvb.ru).",
        "href": "https://rvb.ru/18vek/radishchev/01text/vol_1/03prose/021.htm",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a1.png",
          "alt": "Portrait of Alexander Radishchev (1749-1802), Russian writer and social critic, oil on canvas by an unknown painter.",
          "credit": "Portrait of Alexander Radishchev, Radishchev Art Museum, Saratov. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In November 1933 Osip Mandelstam composed a sixteen-line epigram deriding Stalin as the 'Kremlin mountaineer' with 'cockroach whiskers' and fingers 'fat as worms,' a poem he dared only to recite aloud. For those lines he was arrested, exiled, arrested a second time, and died in a Gulag transit camp in 1938. Remeslov's March manifesto is this century's counterpart: words that name and damn the man in the Kremlin, treated by the state as a crime that carries years in the camps. Mandelstam's fate is the standing warning of what Russia does to the writer who names the ruler.",
        "excerpt": "Мы живём, под собою не чуя страны,\nНаши речи за десять шагов не слышны,\nА где хватит на полразговорца,\nТам припомнят кремлёвского горца.\nЕго толстые пальцы, как черви, жирны,\nИ слова, как пудовые гири, верны,\nТараканьи смеются усища\nИ сияют его голенища.",
        "source": "Осип Мандельштам, «Мы живём, под собою не чуя страны…» (ноябрь 1933); Русская виртуальная библиотека (rvb.ru).",
        "href": "https://rvb.ru/20vek/mandelstam/01text/vol_3/01versus/01versus/3_064.htm",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a2.png",
          "alt": "NKVD mug shot of the poet Osip Mandelstam taken after his first arrest in 1934.",
          "credit": "NKVD arrest photograph of Osip Mandelstam, 1934. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Sophocles' tragedy Antigone defies King Creon's edict forbidding the burial of her brother, setting the 'unwritten and unfailing statutes of heaven' above the ruler's decree, and is sealed alive in a tomb for it. Her defense is the founding statement of conscience refusing to bow to state power, whatever the cost. Remeslov made the same wager, placing his judgment of a criminal war above Russia's 'false information' laws and calling openly for the ruler to answer; the state, like Creon, replies with confinement. The oldest political drama is the lone conscience against the sovereign's command.",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the Justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven. For their life is not of to-day or yesterday, but from all time, and no man knows when they were first put forth.",
        "source": "Sophocles, Antigone, trans. Sir Richard C. Jebb (1917); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Antigone",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a3.png",
          "alt": "Nikiforos Lytras's 1865 painting of Antigone mourning before the body of her brother Polynices.",
          "credit": "Nikiforos Lytras, 'Antigone before the dead Polynices' (1865), National Gallery, Athens. Photo Francesco Bini (Sailko), CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's 'The Death of Socrates' (1787) shows the philosopher condemned by Athens for his words reaching for the cup of hemlock while still teaching, his finger raised, serene and unbroken as his followers weep. The state's death sentence is powerless over his conviction; the moral authority lies with the condemned, not the tribunal. Remeslov, like Socrates charged with 'corrupting' the city, faces up to ten years for speech the state calls poison. David's canvas frames the enduring claim of every such trial: it is the truth-teller, not the court, who stands upright.",
        "excerpt": "David stages the hemlock as a moment of teaching rather than defeat: Socrates sits erect on the prison cot, one hand closing on the poisoned cup without looking at it, the other lifted mid-argument toward the heavens. His disciples recoil and cover their faces in grief while he alone is calm, the light falling full on his aged body. The composition makes the condemned man the source of order and clarity, and the sentence of the state a mere formality he transcends.",
        "source": "Jacques-Louis David, 'The Death of Socrates,' 1787, oil on canvas, The Metropolitan Museum of Art, New York (accession 31.45).",
        "href": "https://www.metmuseum.org/art/collection/search/436105",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a4.png",
          "alt": "Jacques-Louis David's 1787 painting 'The Death of Socrates,' showing Socrates reaching for the hemlock while lecturing his grieving followers.",
          "credit": "Jacques-Louis David, 'The Death of Socrates' (1787), Metropolitan Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "After Pravda's 1936 denunciation 'Muddle Instead of Music' nearly destroyed him during the Great Terror, when arrest could come at any night, Shostakovich answered in 1937 with his Fifth Symphony, outwardly a chastened, triumphant tribute to the Soviet state. Yet many hear beneath the surface a coded lament, its hammering finale a portrait of terror wearing the mask of rejoicing, joy enforced at gunpoint. It is the art of the man who must survive the tyrant rather than openly defy him, the opposite pole from Remeslov's frontal denunciation. Both, though, are shaped by the same power that can jail or crush the voice it dislikes; the Fifth is what enforced caution sounds like under a regime that treats dissent as a crime.",
        "excerpt": "The symphony's ambiguity is the point: the D-minor gloom and the funeral tread of the slow movement give way to a blaring, relentless march that can be heard as either genuine victory or coerced celebration. Contemporaries read the finale two ways at once, a survival strategy encoded in sound, and Shostakovich later let it be said that the rejoicing was forced, 'as if someone were beating you with a stick.' Where the dissident speaks plainly and is arrested, the composer smuggles his meaning past the censor in the grammar of the orchestra.",
        "source": "Dmitri Shostakovich, Symphony No. 5 in D minor, Op. 47 (1937); IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.5,_Op.47_(Shostakovich,_Dmitry)",
        "image": {
          "src": "/covers/russia-blogger-remeslov-arrest--a5.png",
          "alt": "Photograph of the composer Dmitri Shostakovich, taken at a Bach commemoration in 1950.",
          "credit": "Dmitri Shostakovich, 1950. Roger & Renate Rossing / Deutsche Fotothek, CC BY-SA 3.0 de, via Wikimedia Commons."
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
