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
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
  },
  {
    "slug": "iran-hormuz-new-strikes",
    "headline": "The U.S. launches a sixth straight night of airstrikes on Iran as the two sides battle for control of the Strait of Hormuz",
    "overview": "U.S. Central Command said it struck Iran for a sixth consecutive night on Thursday to \"further degrade Iranian military capabilities,\" with Iranian state media reporting missiles near the Gulf island of Qeshm and in Bandar Abbas and Bushehr, the site of a nuclear power plant. Tehran said it had hit U.S. bases in Jordan, Kuwait and Bahrain and warned that the Strait of Hormuz, which it has effectively blocked, is a \"red line,\" while Reuters reported Iran had told Yemen's Houthis to close the Red Sea if Washington strikes its power grid. The White House said President Trump remained open to talks even as he threatened to bomb Iranian bridges and power plants unless Tehran returns to negotiations.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c151gdjwd10o"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOYXFnZWtOU1NXb01HY2FxbTBsUmJqNDlaa3NORmpyZ0pYVzhSVFZkaUNYTjczY0E1YjhpR1F1OGRoT3dJNnVTMjVuUGJyamVCckJwMi1WY0hJR2NyVGQ0ZDdzbF9LMzgteGZDRGtMd0ZQV211YWF3cHpYLWdhTXZjTXVhTG1zRkRmR3Q1NVdQRWNEb2xhZU0zRTFodmM4ZXc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/iran-hormuz-new-strikes.png",
      "alt": "A vessel in the Strait of Hormuz, the contested waterway at the centre of the U.S.-Iran confrontation.",
      "credit": "Reuters via BBC"
    },
    "lead": true,
    "rank": 27,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 480 B.C. a Persian empire and a defiant Greek coalition fought for control of a single narrow waterway, the strait between the island of Salamis and the Attic mainland. The Athenian commander Themistocles deliberately lured the far larger Persian fleet of Xerxes into the cramped channel, reasoning that in a confined strait numbers and size counted for less and that the crowded enemy would foul its own oars. The Persian armada, jammed into the narrows and thrown into confusion, was shattered by the disciplined Greek line. It is the ancestor of every chokepoint battle since: a smaller power turning geography into a weapon against a mightier navy. The confrontation now unfolding at the Strait of Hormuz, where Iran treats the twenty-mile-wide passage as a 'red line' and bets that a narrow sea can neutralize American firepower, replays the same ancient logic of the strait as equalizer.",
        "excerpt": "in the first place, as we shall fight in a narrow sea with few ships against many, if the war follows the common course, we shall gain a great victory; for to fight in a narrow space is favourable to us - in an open sea, to them.",
        "source": "Herodotus, The Histories, Book VIII (the Battle of Salamis and Themistocles' counsel), trans. George Rawlinson; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a0.png",
          "alt": "Ancient marble herm portrait of the Athenian statesman and admiral Themistocles",
          "credit": "Roman marble herm of Themistocles, after a 5th-century B.C. Greek original, Museo Ostiense, Ostia; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "The last time the United States and Iran fought openly for the Strait of Hormuz was Operation Praying Mantis on 18 April 1988, during the Tanker War phase of the Iran-Iraq conflict. After the frigate USS Samuel B. Roberts nearly sank on an Iranian mine, U.S. warships and carrier aircraft struck Iranian oil platforms and, in a running battle, crippled or sank several Iranian vessels, including the frigate Sahand, which was left ablaze and gutted by bombs and missiles. It remains the U.S. Navy's largest surface engagement since the Second World War and the only time it has exchanged surface-to-surface missile fire, and it was fought precisely to keep the Gulf's oil arteries open. The present crisis, with U.S. Central Command striking Iran for a sixth straight night and Tehran threatening to close the strait, is the same duel over freedom of navigation escalated to a far higher pitch. The burning hull of the Sahand is the visual memory Washington and Tehran both carry into this fight.",
        "excerpt": "On 18 April 1988 U.S. naval and air forces struck Iranian targets in the Persian Gulf in retaliation for the mining of the frigate USS Samuel B. Roberts; in the ensuing action the Iranian frigate Sahand was bombed and set afire, photographed burning from stem to stern in the largest U.S. Navy surface battle since 1945. The engagement was a direct fight over the shipping lanes of the Strait of Hormuz, foreshadowing today's confrontation over the same chokepoint.",
        "source": "U.S. Navy / Naval History and Heritage Command, Operation Praying Mantis, 18 April 1988; official DoD photograph DN-SN-89-03125.",
        "href": "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Iranian_frigate_Sahand_burning_after_air_attack_Operation_Praying_Mantis_DN-SN-89-03125.jpg",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a1.png",
          "alt": "Aerial view of the Iranian frigate Sahand burning after a U.S. air attack in the Persian Gulf, 1988",
          "credit": "U.S. Navy photograph, Iranian frigate Sahand burning during Operation Praying Mantis, 18 April 1988 (DN-SN-89-03125); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, who had himself fought the Persians, staged 'The Persians' in 472 B.C. and told the story of Salamis from the losers' side, as grief inside the royal court at Susa. A messenger arrives to describe how the Persian fleet, packed into the narrows, could give no ship room to help another, smashed its own oars, and was hemmed in and battered until the sea vanished beneath wrecks and the dead. The queen mother Atossa and the chorus can only cry out at the hateful name of Salamis. It is the oldest surviving war play in the world, and its lesson is that a proud empire's numbers become a trap in a narrow sea. As Iran wagers that the confined waters of Hormuz can swallow a superior fleet and Washington threatens ever heavier blows, Aeschylus supplies the tragic script of a great power undone in a strait.",
        "excerpt": "the time brooked no delay, but instantly ship dashed against ship its bronze-sheathed beak. It was a ship of Hellas that began the charge and sheared off entire the curved stern of a Phoenician barque. Each captain drove his ship straight against some other ship. At first, indeed, the stream of the Persian armament held its own; but when the mass of our ships had been crowded in the narrows, and none could render another aid, and each crashed its bronze-faced beak against each of its own line, the shivered their whole array of oars; while the Hellenic galleys, not heedless of their chance, hemmed them in and battered them on every side. The hulls of our vessels rolled over and the sea was hidden from our sight, strewn as it was with wrecks and slaughtered men.",
        "source": "Aeschylus, The Persians, trans. Herbert Weir Smyth (Loeb Classical Library, 1922/1926 edition, Vol. I); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/The_Persians",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a2.png",
          "alt": "The Lenormant Relief, an ancient marble carving of an Athenian trireme with rows of oarsmen",
          "credit": "The Lenormant Relief, marble votive relief of an Athenian trireme, c. 410 B.C., Acropolis Museum, Athens; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Book VII of his Histories, Herodotus tells how Xerxes, marching to invade Greece, bridged the Hellespont, the strait dividing Asia from Europe, only to see a storm tear his bridges apart. Enraged, the king ordered the water itself given three hundred lashes and a set of fetters flung into it, while his men shouted that the 'bitter water' would be crossed whether it willed or not. It is antiquity's defining image of imperial hubris: a ruler who believes a strategic waterway can be beaten and chained into submission, and who beheads the engineers who failed him. The story shadows today's brinkmanship at Hormuz, where Iran vows to seal the strait and President Trump threatens to bomb bridges and power plants unless Tehran yields. Herodotus warns that the sea does not take orders, and that treating a strait as something to be scourged into obedience is the mark of a power overreaching toward its own downfall.",
        "excerpt": "So when Xerxes heard of it he was full of wrath, and straightway gave orders that the Hellespont should receive three hundred lashes, and that a pair of fetters should be cast into it. Nay, I have even heard it said that he bade the branders take their irons and therewith brand the Hellespont. It is certain that he commanded those who scourged the waters to utter, as they lashed them, these barbarian and wicked words: \"Thou bitter water, thy lord lays on thee this punishment because thou hast wronged him without a cause, having suffered no evil at his hands. Verily King Xerxes will cross thee, whether thou wilt or no. Well dost thou deserve that no man should honour thee with sacrifice; for thou art of a truth a treacherous and unsavoury river.\" While the sea was thus punished by his orders, he likewise commanded that the overseers of the work should lose their heads.",
        "source": "Herodotus, The Histories, Book VII, section 35, trans. George Rawlinson; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a3.png",
          "alt": "Illustration of Xerxes' men whipping the waters of the Hellespont on the king's orders",
          "credit": "Xerxes ordering the Hellespont to be scourged, illustration from a 1909 print; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Wilhelm von Kaulbach's monumental 1868 fresco 'The Battle of Salamis,' painted for the Maximilianeum in Munich, freezes the ancient strait battle at its climax of chaos and rout. Greek triremes drive into a churning tangle of foundering Persian ships while, high on a shoreline throne, Xerxes watches his fleet destroyed beneath him, a study in imperial power humbled by a narrow sea. The vast canvas turns a chokepoint into a stage for the collision of empire and defiant liberty, exactly the drama now playing out in the Gulf. As the United States and Iran battle for control of the Strait of Hormuz, Kaulbach's image reads as a warning painted in oil: fleets funneled into a strait can become a spectacle of catastrophe. The distant, helpless figure of the king surveying his losses is the oldest picture of brinkmanship gone wrong.",
        "excerpt": "A sweeping panoramic battle scene: Greek triremes ram and overwhelm the crowded Persian fleet in the narrow strait of Salamis, ships splintering amid drowning sailors and drifting wreckage, while Xerxes, enthroned on the heights at the right, looks on in impotent fury as his armada is annihilated below him. Kaulbach stages the chokepoint as high tragedy, the confined water crammed with wreckage and the sea itself lost beneath the dead.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Battle of Salamis), 1868, oil/fresco, Maximilianeum (Bavarian Landtag), Munich.",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a4.png",
          "alt": "Wilhelm von Kaulbach's 1868 painting of the Battle of Salamis, Greek and Persian fleets clashing in the strait",
          "credit": "Wilhelm von Kaulbach, 'Die Seeschlacht bei Salamis' (The Battle of Salamis), 1868, Maximilianeum, Munich; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel's opera 'Serse' (Xerxes), first staged in London in 1738, takes as its title character the very Persian king who bridged and whipped the Hellespont, opening with the famous aria 'Ombra mai fu' as Xerxes sings tenderly to a plane tree before his imperial ambitions unravel. Handel's audience knew Xerxes as the archetype of the conqueror who tried to master a strait and lead a vast empire against a smaller free people, and the opera plays his grandeur against his folly. That figure of Persian majesty overreaching itself is precisely the historical echo behind the current standoff, in which Iran, heir to that Persian world, makes the Strait of Hormuz its 'red line' against American power. The score turns the Xerxes story into music, a reminder of how long the Western imagination has framed a Persian sovereign's contest with the sea and with empire. Its very existence, a Baroque hit built on the sea-defying king, shows how deeply the theme of Persia and the contested strait runs through European art.",
        "excerpt": "Handel's opera seria in three acts opens with the celebrated arioso 'Ombra mai fu,' Xerxes' serene praise of a shady plane tree, before the drama of the imperious Persian king plays out; the music casts the historical sovereign, remembered for bridging and scourging the Hellespont, as a figure of both splendor and self-defeating pride. The opera's survival as one of Handel's best-loved works keeps the image of Persia's strait-defying monarch alive in the concert hall.",
        "source": "George Frideric Handel, Serse (Xerxes), HWV 40, opera in three acts, libretto after Silvio Stampiglia, first performed London, 15 April 1738; score and libretto at IMSLP.",
        "href": "https://imslp.org/wiki/Serse,_HWV_40_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a5.png",
          "alt": "Title page of the 1738 London libretto of Handel's opera Serse (Xerxes)",
          "credit": "Title page of the libretto of Handel's opera 'Serse' (Xerxes), London, 1738; Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "congo-ebola-hospital-attack",
    "headline": "Ebola patients flee and aid workers evacuate after a deadly attack on a treatment centre in eastern Congo",
    "overview": "Humanitarian workers were evacuated early Thursday after violence erupted overnight at the Nyakunde General Hospital Ebola treatment centre in Congo's Ituri province, the epicentre of an outbreak that has killed more than 220 people. The unrest began after a pregnant woman with severe anaemia died at the hospital, prompting angry community members to storm the centre and exchange gunfire; several Ebola patients are believed to have fled, and staff from the aid group Samaritan's Purse withdrew. It is the latest in a series of attacks on health facilities that have repeatedly set back efforts to contain the epidemic.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNMWQ1bGpYa08xNndqZ1dhNW9WZHJKRkpwa1d1emg4ckVuTVloWVcweTJiX3RxMExGWVB2NjI1b1pxT0daVzVqN0p5UFA5ZUg0bGdpSXVPcTNwdlZVZXdwXzFULUs2Zk1DQUhEWUtQaTd2TEdmMkFLaEdBX0d4WWlIMVBNREV6WE5JUjVxMWl2S3hJNXNvS1dTN2lGaEZvdUNVN1A2aUlDZlNEQTlPSHZUREVXZzFQZWtDb09zb0tabWxQZw?oc=5"
      },
      {
        "name": "The Jerusalem Post",
        "href": "https://www.jpost.com/international/article-902783"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/congo-ebola-hospital-attack.png",
      "alt": "Health workers in protective suits outside an Ebola treatment centre.",
      "credit": "The Jerusalem Post"
    },
    "rank": 28,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Twenty-four centuries before Nyakunde, Thucydides watched the same collapse unfold when plague broke over Athens during the Peloponnesian War. He noted first that the doctors were of no use and in fact died fastest of all, because they were the ones who kept going to the sick, exactly as the Samaritan's Purse workers fleeing the Ituri treatment centre knew the risk of every bedside. He described bodies heaped upon bodies, the dying reeling through the streets toward the fountains, and the sacred places choked with corpses no one dared to bury. Above all he recorded what fear does to a community: that neither fear of the gods nor any law of man was left to restrain people once they believed death was coming for them anyway. It is the oldest lesson in epidemics, and the crowd that stormed the Ebola centre after a pregnant woman died proves it still holds: when the sick outnumber the healers and terror takes hold, the social contract that lets medicine function is the first thing to break.",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often. ... The bodies of dying men lay one upon another, and half-dead creatures reeled about the streets and gathered round all the fountains in their longing for water. The sacred places also in which they had quartered themselves were full of corpses of persons that had died there, just as they were. ... Fear of gods or law of man there was none to restrain them.",
        "source": "Thucydides, History of the Peloponnesian War, Book II, 47–53 (the Plague of Athens), trans. Richard Crawley.",
        "href": "http://classics.mit.edu/Thucydides/pelopwar.2.second.html",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a0.png",
          "alt": "Michiel Sweerts, 'Plague in an Ancient City' (c. 1652–54), thought to depict the Plague of Athens: the dead and dying strewn across the steps of a stricken city.",
          "credit": "Michiel Sweerts, 'Plague in an Ancient City' (c. 1652–54), Los Angeles County Museum of Art (LACMA), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "When cholera reached Paris in the spring of 1832, the poet Heinrich Heine watched the city turn not on the disease but on imagined culprits, and his eyewitness dispatch reads like a premonition of Ituri. As the dead were buried faster than the panic could be explained, a rumour spread that people were not dying of cholera at all but being poisoned, and the mob went hunting for anyone carrying a suspicious powder. Heine saw men torn apart in the street for possessing what turned out to be camphor or chlorine, the very remedies against the plague, their bodies dragged along to shouts of 'There goes the cholera!' The parallel to the Nyakunde treatment centre is exact: a community convinced that the healers and their strange substances are the true killers, and a death that becomes the spark for lethal violence. In 1832 as in 2026, the epidemic's deadliest byproduct was mistrust, and the innocent — doctors, aid workers, the wrongly accused — paid for it. Heine's grim moral was that the terror the authorities themselves had sown came back as a riot of the dead.",
        "excerpt": "When the emeute of the chiffoniers was suppressed, and as the cholera did not take hold so savagely ... there rose all at once a rumour that many of those who had been so promptly buried had died not from disease but by poison. ... In the Rue Vaugirard, where two men were killed because certain white powders were found on them, I saw one of the wretches, while he was still in the death-rattle, and at the time old women plucked the wooden shoes from their feet and beat him on the head till he was dead. He was naked and beaten and bruised, so that his blood flowed; they tore from him not only his clothes, but also his hair, and cut off his lips and nose; and one blackguard tied a rope to the feet of the corpse and dragged it through the streets, crying out, \"Voilà le cholera-morbus!\"",
        "source": "Heinrich Heine, French Affairs: Letters from Paris, Letter VI (dated 19 April 1832), trans. Charles Godfrey Leland, in The Works of Heinrich Heine, Vol. 7.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Heinrich_Heine/Vol._7/Letter_6",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a1.png",
          "alt": "Alfred Rethel's woodcut 'Death the Strangler' (1851): Death fiddling on bones as revellers collapse, depicting the first outbreak of cholera at a Paris masked ball in 1831.",
          "credit": "Alfred Rethel, 'Der Tod als Würger' ('Death the Strangler'), 1851, depicting the 1831 Paris cholera outbreak, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Boccaccio opened the Decameron with an unflinching account of the Black Death in Florence in 1348, and its central horror is precisely the one now playing out in Ituri: contagion that dissolves the bonds meant to hold a community together. He describes how the mere touch of a sick person's clothing seemed to carry death, so that terror hollowed out every human tie until brother abandoned brother and even parents refused to tend their own children. His seven young narrators respond exactly as the panicked crowd and the fleeing Ebola patients do — by scattering, walling themselves off, choosing distance as the only defence they understand. What Boccaccio grasped, and what Nyakunde reenacts, is that a plague is never only a medical event; it is a social solvent that turns care into risk and neighbours into threats. When aid workers evacuate and patients flee into the bush rather than trust a treatment centre, they are re-staging the Florentine catastrophe Boccaccio set down almost seven hundred years ago.",
        "excerpt": "Indeed, leaving be that townsman avoided townsman and that well nigh no neighbour took thought unto other and that kinsfolk seldom or never visited one another and held no converse together save from afar, this tribulation had stricken such terror to the hearts of all, men and women alike, that brother forsook brother, uncle nephew and sister brother and oftentimes wife husband; nay (what is yet more extraordinary and well nigh incredible) fathers and mothers refused to visit or tend their very children, as they had not been theirs.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction (Proem) to the First Day, trans. John Payne (1886), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a2.png",
          "alt": "Luigi Sabatelli's etching of the plague of Florence in 1348, a scene from Boccaccio's Decameron: the dead and dying sprawled amid the living in the streets.",
          "credit": "Luigi Sabatelli the Elder, 'The plague of Florence, 1348; a scene from Boccaccio's Decameron' (etching). Wellcome Collection, London, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe's 'A Journal of the Plague Year' reconstructs London's great plague of 1665 as a chronicle of quarantine and the violence it breeds — the same collision between public-health control and human fear that detonated at the Ituri treatment centre. Defoe details how infected houses were shut up by law, marked with a red cross, and guarded day and night by watchmen whose job was to make sure no one went in or out. And he records what confinement did to people: they committed violences against the watchmen, broke out by force in many places, and devised endless stratagems to escape. That is the dynamic behind every attack on an Ebola facility — the quarantine that medicine requires is experienced by the frightened as imprisonment, and the guards and healers become the enemy. When patients fled the Nyakunde centre under gunfire, they were doing what Defoe's Londoners did three and a half centuries ago: choosing the open contagion of flight over the terror of being locked away with the disease.",
        "excerpt": "That to every infected house there be appointed two watchmen, one for every day, and the other for the night; and that these watchmen have a special care that no person go in or out of such infected houses ... several violences were committed and injuries offered to the men who were set to watch the houses so shut up; also several people broke out by force in many places, as I shall observe by-and-by.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a3.png",
          "alt": "A colour wood engraving of a London street during the Great Plague of 1665, with a death cart and the cry 'Bring out your dead'.",
          "credit": "Edmund Evans (engraver), 'A street during the plague in London with a death cart' (colour wood engraving). Wellcome Collection, London, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'The Triumph of Death' (c. 1562) is the definitive image of a society overrun by mortality, and it speaks directly to a treatment centre stormed in the dark by a terrified crowd. Across a scorched landscape, armies of skeletons drive the living toward a great trap, and no rank, remedy, or refuge offers protection — kings, mothers, and the sick are herded together toward the same end. There is no space in Bruegel's world for the careful, sterile order that an Ebola ward depends on; there is only panic, flight, and the machinery of death grinding through every human institution. That is what the attack at Nyakunde threatens to make real: the moment fear overwhelms containment, the fragile island of medicine is swept into the general chaos. Bruegel painted the nightmare that public-health workers spend their lives trying to hold back, and every assault on a clinic is a small victory for the procession he depicted.",
        "excerpt": "Bruegel fills the panel with a vast, panoramic army of skeletons sweeping across a blasted, smoke-darkened land. The living are driven in terror toward a coffin-lidded trap; a cart of skulls rolls forward, a king's gold spills uselessly, and a woman falls beneath the scythe. Nothing — wealth, prayer, love, or flight — halts the advance, and the whole ordered world of the living is shown dissolving into rout and ruin.",
        "source": "Pieter Bruegel the Elder, 'The Triumph of Death', oil on panel, c. 1562. Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Triumph_of_Death_-_WGA3389.jpg",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a4.png",
          "alt": "Pieter Bruegel the Elder, 'The Triumph of Death' (c. 1562): armies of skeletons overrunning a blasted landscape as the terrified living are herded toward death.",
          "credit": "Pieter Bruegel the Elder, 'The Triumph of Death' (c. 1562), Museo del Prado, Madrid, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin's 'The Plague' (Die Pest, 1898) reimagines pestilence as a winged reaper riding a dragon-like beast low through the streets of a town, scattering the living as it passes. Painted after Böcklin's own encounters with epidemic disease, it captures the specific terror that grips eastern Congo: contagion as an unseen, unstoppable predator that turns a place of life into a place of flight. Bodies fall in the narrow street below while those still standing recoil in helpless panic, exactly the scene reported from Nyakunde as patients bolted and aid workers evacuated into the night. Böcklin refuses any comforting distance; the pestilence is right there, at street level, among ordinary people who have no defence. It is the emotional truth underneath the news dispatch — the moment a community realises the horror has entered its own streets and that medicine, for now, has lost control of it.",
        "excerpt": "A skeletal figure of Death, black-winged, rides a hunched reptilian beast down a shadowed medieval street. Its breath seems to fell the townsfolk as it passes: a woman lies sprawled across the cobbles in the foreground while others flee or collapse in terror. Rendered in bruised greens and sickly ochres, the image makes the plague a living, airborne predator moving unstoppably through the heart of the town.",
        "source": "Arnold Böcklin, 'Die Pest' ('The Plague'), tempera on fir wood, 1898. Kunstmuseum Basel.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a5.png",
          "alt": "Arnold Böcklin, 'The Plague' (1898): a black-winged figure of Death riding a dragon-like beast down a town street as inhabitants fall and flee.",
          "credit": "Arnold Böcklin, 'Die Pest' ('The Plague'), 1898, Kunstmuseum Basel, via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "algeria-foster-home-fire",
    "headline": "A fire at a state children's home near Algiers kills 11, including children, and injures 19",
    "overview": "A blaze tore through the Childhood Relief Institution, a state-run care home for orphans, abandoned minors and children with special needs, in Mohammadia east of Algiers early Thursday, killing 11 people, among them children, and injuring 19, Algeria's civil protection service said. Firefighters were called at about 3:30 a.m. and rescued five children with reduced mobility; the cause has not been announced. President Abdelmadjid Tebboune said he received the news \"with deep sorrow\" as the country swelters through a heatwave that has fuelled nearly 1,000 fires in a week.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvgwd4nz344o"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/16/fire-at-orphanage-in-algeria-kills-11-people-including-children"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/algeria-foster-home-fire.png",
      "alt": "Firefighters direct hoses at a building fire against the night sky.",
      "credit": "Algeria General Directorate for Civil Protection via BBC"
    },
    "rank": 29,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When fire tore through the Childhood Relief Institution in Mohammadia, killing eleven people and children among them as they slept, it revived the oldest urban terror in the Western record: the great conflagration that consumed Rome in July of A.D. 64. The historian Tacitus, writing of that inferno, dwells not on the toppled temples but on the human beings trapped inside the flames, and above all on the weakest of them. He names the terror of women, the slowness of the aged, and, most piercingly, 'the helpless inexperience of childhood' as the fire outran every attempt to flee. Nearly two thousand years later, the five children with reduced mobility carried out of the Algiers care home belong to that same category of the helpless, wholly dependent on others to rescue them. As Algeria burns through a heatwave that has kindled roughly a thousand fires in a week, Tacitus's account is a reminder that a city's, or a state's, greatness is measured less by its monuments than by whether it can shield those who cannot save themselves. His suspicion that the Roman fire may have been no accident but the work of negligence or design also shadows the still-unexplained cause of Thursday's blaze.",
        "excerpt": "Added to this were the wailings of terror-stricken women, the feebleness of age, the helpless inexperience of childhood, the crowds who sought to save themselves or others, dragging out the infirm or waiting for them, and by their hurry in the one case, by their delay in the other, aggravating the confusion.",
        "source": "Tacitus, The Annals, Book XV (on the Great Fire of Rome, A.D. 64), trans. Alfred John Church and William Jackson Brodribb (public domain).",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a0.png",
          "alt": "Hubert Robert's painting of the Great Fire of Rome, flames engulfing classical buildings as crowds flee.",
          "credit": "Hubert Robert, 'The Fire of Rome' (c. 1785), Musee d'Art moderne Andre Malraux, Le Havre; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "The modern conscience learned to grieve for the innocent burned in institutions of care and labor on 25 March 1911, when fire swept the Triangle Shirtwaist Factory in New York and killed 146 workers, most of them young immigrant women and girls locked behind doors they could not open. The United Press reporter William Shepherd watched from the street below and telephoned his dispatch as bodies fell, giving the nation a first-hand account of a preventable horror. His words, counting the dead by the sound of their impact, made negligence audible in a way official reports never could. The fire at the Childhood Relief Institution near Algiers carries the same charge of institutional failure: a state facility meant to protect orphans and children with special needs became, instead, the place where eleven of them died and nineteen were hurt. Triangle turned public outrage into fire codes, exits, and inspections, the very safeguards whose absence turns a building full of dependents into a trap. That a home for the most vulnerable could still burn in 2026 measures how far the promise won in 1911 has yet to reach.",
        "excerpt": "I learned a new sound--a more horrible sound than description can picture. It was the thud of a speeding, living body on a stone sidewalk. Thud-dead, thud-dead, thud-dead, thud-dead. Sixty-two thud-deads. I call them that, because the sound and the thought of death came to me each time, at the same instant.",
        "source": "William G. Shepherd, 'Eyewitness at the Triangle,' United Press dispatch on the Triangle Shirtwaist Factory fire, first published 27 March 1911; Kheel Center, Cornell University ILR School.",
        "href": "https://trianglefire.ilr.cornell.edu/primary/testimonials/ootss_WilliamShepherd.html",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a1.png",
          "alt": "Firemen train hoses on the burning Asch Building during the Triangle Shirtwaist Factory fire, 25 March 1911.",
          "credit": "Photograph of the Triangle Shirtwaist Factory fire, New York, 25 March 1911; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "No writer bound the soot of childhood to the negligence of adults more tightly than William Blake, whose 'The Chimney Sweeper' from Songs of Innocence (1789) speaks in the voice of a boy sold into labor and soot after his mother's death. In the poem the sweepers dream of thousands of children 'lock'd up in coffins of black,' freed only by an angel into a green plain of light, a vision of deliverance set against the cruelty that surrounds them. Read after a fire that killed children in a state care home outside Algiers, Blake's image of the young shut in blackness is unbearably literal, and his closing line about duty cuts the other way against the institutions that failed them. The Childhood Relief Institution existed precisely to gather the parentless and the disabled that society had otherwise abandoned, the same children Blake insisted had a claim on the conscience of the powerful. His pairing of innocence with soot, smoke, and premature death frames the mourning now underway in Mohammadia. That five children of reduced mobility were carried out alive is the nearest thing this story has to Blake's angel with the bright key.",
        "excerpt": "And so he was quiet, & that very night,\nAs Tom was a sleeping he had such a sight,\nThat thousands of sweepers Dick, Joe, Ned & Jack\nWere all of them lock'd up in coffins of black.\n\nAnd by came an Angel who had a bright key\nAnd he open'd the coffins & set them all free,\nThen down a green plain leaping laughing they run\nAnd wash in a river and shine in the Sun.",
        "source": "William Blake, 'The Chimney Sweeper,' Songs of Innocence (1789), from Songs of Innocence and of Experience (copy Z, 1826), Library of Congress (public domain).",
        "href": "https://en.wikisource.org/wiki/Songs_of_Innocence_and_of_Experience_(1826)/Songs_of_Innocence/The_Chimney_Sweeper",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a2.png",
          "alt": "William Blake's hand-coloured plate of 'The Chimney Sweeper' from Songs of Innocence.",
          "credit": "William Blake, 'The Chimney Sweeper' plate, Songs of Innocence and of Experience, copy L (1795); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The grief of a parent who cannot be consoled for lost children has its founding expression in the prophet Jeremiah, whose verse the Gospels later attached to the slaughter of the innocents. In it Rachel weeps for her children and refuses all comfort 'because they were not,' a cry that has served for millennia as the voice of every community mourning its young. The fire near Algiers, which killed children in the very place charged with their keeping, summons that ancient lament with terrible aptness, for these were orphans, the parentless whom scripture repeatedly commands the community to protect. Rachel's refusal to be comforted honors the truth that some losses are not softened by reason or by rescue statistics, only witnessed. As Algeria counts its dead amid a week of a thousand fires, the verse offers not consolation but the dignity of unashamed grief. It also indicts every negligence that fails the fatherless, the failure the cause of Thursday's blaze may yet reveal.",
        "excerpt": "Thus saith the LORD; A voice was heard in Ramah, lamentation, and bitter weeping; Rahel weeping for her children refused to be comforted for her children, because they were not.",
        "source": "The Bible, King James Version, Jeremiah 31:15 (public domain).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jeremiah",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a3.png",
          "alt": "A painting of Rachel weeping and refusing to be comforted for her lost children.",
          "credit": "'Rachel Weeping for her Children'; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner witnessed the Houses of Parliament burn on the night of 16 October 1834 and turned the catastrophe into one of the most overwhelming fire paintings in Western art, a wall of flame and smoke swallowing the London sky above the Thames. He renders fire not as detail but as an engulfing force before which human structures and human plans dissolve, the crowds on the bank reduced to helpless spectators. That vision speaks directly to the scene at the Childhood Relief Institution, where a state building meant to shelter the vulnerable was overtaken by a blaze whose cause is still unknown. Turner painted amid an era newly anxious about conflagration and public safety, much as Algeria now reckons with a heatwave that has ignited roughly a thousand fires in a single week. The sublime terror of his canvas, beauty and destruction fused, mirrors how a fire can be at once spectacle and unbearable loss. Against such an inferno, the rescue of five immobile children reads as a small, hard-won mercy.",
        "excerpt": "Turner's canvas turns a real disaster into a towering vision of fire as an elemental power, flames and smoke blazing over the river while the ruined buildings collapse into light. Tiny onlooking figures crowd the foreground, dwarfed and powerless before the blaze. The painting captures the terrible sublimity of a conflagration that consumes an institution at the heart of public life.",
        "source": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, 16 October 1834' (c. 1835), oil on canvas, Philadelphia Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner%2C_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons%2C_October_16%2C_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a4.png",
          "alt": "Turner's painting of the Houses of Parliament ablaze at night, a vast sheet of orange flame and smoke rising over the Thames as crowds watch from the riverbank.",
          "credit": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, 16 October 1834' (c. 1835), Philadelphia Museum of Art, via Google Art Project / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Giotto's 'Lamentation (The Mourning of Christ),' painted around 1305 in the Scrovegni Chapel in Padua, is the image that taught European art how to grieve, gathering mourners around a lifeless body in a circle of raw and human sorrow. The Virgin cradles her dead son face to face while attendants bend low and angels wheel overhead in open anguish, grief made unbearably intimate rather than ceremonial. That composition presses on the mourning now unfolding in Mohammadia, where families and a whole nation bend over the loss of eleven people, children among them, taken by fire in a home meant to keep them safe. Giotto insists that each death is a person to be held and wept for, not a number in a casualty count, and that dignity is exactly what the orphans of the Childhood Relief Institution are owed. The scene's tenderness toward the defenseless answers a story about society's duty to those in its care. In a week when Algeria is ringed by a thousand fires, his frozen circle of grief gives shape to a sorrow words strain to carry.",
        "excerpt": "Giotto arranges the mourners in a tight ring of grief around the dead body, the Virgin drawing her son's face to hers while stooping figures and wheeling, weeping angels give sorrow its full human weight. Faces and gestures register raw, individual pain rather than formal ritual. The fresco marks the moment Western painting learned to mourn its dead as beloved persons.",
        "source": "Giotto di Bondone, 'Lamentation (The Mourning of Christ)' (c. 1305), fresco, Scrovegni (Arena) Chapel, Padua.",
        "href": "https://commons.wikimedia.org/wiki/File:Giotto_-_Scrovegni_-_-36-_-_Lamentation_%28The_Mourning_of_Christ%29_adj.jpg",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a5.png",
          "alt": "Giotto fresco of mourners gathered closely around the dead body of Christ, the Virgin cradling his head while angels grieve overhead against a blue sky.",
          "credit": "Giotto di Bondone, 'Lamentation (The Mourning of Christ)' (c. 1305), Scrovegni Chapel, Padua, via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "nicaragua-italy-ties-cut",
    "headline": "Nicaragua severs diplomatic relations with Italy amid a row over extraditing a Red Brigades fugitive in the Aldo Moro case",
    "overview": "Nicaragua announced it was breaking off all diplomatic ties with Italy after Foreign Minister Antonio Tajani renewed demands for the extradition of Alessio Casimirri, a former Red Brigades militant who took part in the 1978 kidnapping and murder of ex-premier Aldo Moro and now lives as a restaurateur in Managua. Managua cited Tajani's \"unjustified, aggressive and irresponsible declarations\" and accused him of \"European arrogance,\" while Tajani, speaking at a European People's Party summit in Madrid, vowed Italy would not stop pressing for Casimirri to face justice. Casimirri is the only member of the via Fani commando never arrested.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNbGRUVHBFUEd6aS1WM28yVHk0ZlJRcUtoMm5CQ2lRYk5tZFlKaElqT3ZBUFlYbFFxd2ZwelRINWtDbkhiUnVtOGxkTjBZVnBOejJPZy1fdEstdUpQWVdJeTNtS04zdXdWYlMxSlU1RlJueGV1MDVxYS1JZjd2TzdOYXhpQU93YzRYR0tlRjI3SGNRcmtLcThrLWR0TmRHM2k4eE5yZF8yWDdzdFhfV29GdXU1RFNDdFk?oc=5"
      },
      {
        "name": "ANSA",
        "href": "https://www.ansa.it/english/news/politics/2026/07/16/tajani-stands-his-ground-after-nicaragua-says-its-breaking-off_402851c5-4d48-4ba6-840b-a5fbf5cf89b6.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/nicaragua-italy-ties-cut.png",
      "alt": "A 1970s-era street in Rome evoking the years of the Aldo Moro kidnapping.",
      "credit": "ANSA"
    },
    "rank": 30,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Tajani demanded that Managua surrender Alessio Casimirri, Nicaragua answered not with a warrant but with the ancient logic of asylum—the same logic that once carried Themistocles, the Athenian who had shattered Persia's fleet at Salamis, to the doorstep of the Persian king. Condemned and hunted at home, the great commander threw himself on the mercy of the very empire he had defeated, and Artaxerxes, valuing a useful guest over his enemies' grievances, took him in and kept him from royal revenues. Casimirri, the last via Fani gunman never brought to trial, has likewise made a second life under a foreign sun, running a Managua restaurant while Rome's demands go unanswered. In each case a nation shelters the man another nation wants most, and reads the extradition demand as arrogance rather than justice. Thucydides preserved the fugitive's own words of appeal, and they still describe the bargain of exile: safety abroad in exchange for a story the host wishes to hear. Twenty-five centuries later, the sanctuary holds and the crime goes unpunished.",
        "excerpt": "I, Themistocles, am come to you, who did your house more harm than any of the Hellenes, when I was compelled to defend myself against your father's invasion—harm, however, far surpassed by the good that I did him during his retreat, which brought no danger for me but much for him. For the past, you are a good turn in my debt—[here he mentioned the warning sent to Xerxes from Salamis to retreat, as well as his finding the bridges unbroken, which, as he falsely pretended, was due to him]—for the present, able to do you great service, I am here, pursued by the Hellenes for my friendship for you. However, I desire a year's grace, when I shall be able to declare in person the objects of my coming.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.137 (Themistocles' letter to King Artaxerxes), translated by Richard Crawley (1874).",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a0.png",
          "alt": "Roman-era portrait herm of Themistocles, a copy of a 5th-century BC Greek original, in the Museo Archeologico Ostiense, Ostia.",
          "credit": "Photograph by Sailko of the bust of Themistocles (Roman copy after a 5th-century BC Greek original), Museo Archeologico Ostiense, Ostia. Licensed CC BY 3.0."
        }
      },
      {
        "category": "historical",
        "title": "Aldo Moro was seized on via Fani, held for fifty-five days, and shot—a statesman destroyed by political violence and, in Casimirri's case, never avenged. Rome had rehearsed that wound long before, when Tiberius Gracchus, tribune and reformer, was clubbed to death on the Capitol by a mob of senators and their clients. Plutarch records that above three hundred fell that day, and that the killers denied the tribune's own brother the simple mercy of burying the body, flinging it instead into the Tiber. The murderers were men of the state, and no reckoning followed; the crime was absorbed into politics and left unpaid. That is the grievance now animating Italy's rupture with Nicaragua—a killing whose last perpetrator dines freely while the victim's memory waits on a justice that never comes. The Gracchan precedent is the oldest lesson of the Moro case: a republic can lose a man to violence and then lose the reckoning too.",
        "excerpt": "of the rest there fell above three hundred killed by clubs and staves only, none by an iron weapon... they would not suffer his own brother, though he earnestly begged the favour, to bury him in the night, but threw him, together with the other corpses, into the river.",
        "source": "Plutarch, Life of Tiberius Gracchus, translated by John Dryden.",
        "href": "https://classics.mit.edu/Plutarch/tiberius.html",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a1.png",
          "alt": "Engraving of the murder of Tiberius Gracchus, beaten with clubs by senators on the Capitol.",
          "credit": "Ludwig Gottlieb Portman after Jacobus Buys, Murder of Tiberius Gracchus, 1797, engraving, Rijksmuseum, Amsterdam (RP-P-1905-2184). Public domain (CC0)."
        }
      },
      {
        "category": "literary",
        "title": "Dante, himself condemned to lifelong exile from Florence and forbidden to return on pain of death, reserved the lowest pit of his hell for those who betray and murder their benefactors. In the frozen heart of the earth he set Brutus and Cassius, the assassins of Caesar, chewed for eternity in two of Lucifer's three mouths beside Judas—the political killer fixed forever as the archetype of treachery. The vision speaks twice to the Moro affair: it is a poem written by a fugitive who never saw his city again, and a verdict that the murder of a statesman is a wound the moral order will not let rest. Casimirri lives out his exile in comfort rather than ice, yet the logic is Dante's inverted—the assassin at ease abroad, the sentence never carried out. Where the poet imagined an eternal punishment for the killers of a leader, the modern case offers only a severed embassy and an unclosed file. Exile and assassin, victim and traitor, meet in these lines as they meet in the row between Rome and Managua.",
        "excerpt": "\"That soul up there which has the greatest pain,\" / The Master said, \"is Judas Iscariot; / With head inside, he plies his legs without. / Of the two others, who head downward are, / The one who hangs from the black jowl is Brutus; / See how he writhes himself, and speaks no word! / And the other, who so stalwart seems, is Cassius.\"",
        "source": "Dante Alighieri, The Divine Comedy, Inferno, Canto XXXIV, lines 61–67, translated by Henry Wadsworth Longfellow (1867).",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_34",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a2.png",
          "alt": "Gustave Dore's engraving for Inferno Canto XXXIV: the giant figure of Lucifer frozen in the ice of Cocytus at the bottom of Hell.",
          "credit": "Gustave Dore, illustration for Dante's Inferno, Canto XXXIV (Lucifer), 1861–1868 engraving. Public domain."
        }
      },
      {
        "category": "literary",
        "title": "The Moro case turns on the oldest question in scripture—whether a killer can simply walk away and disclaim all account of his brother. In Genesis, Cain murders Abel and answers God's inquiry with a shrug, \"Am I my brother's keeper?\", only to be sentenced to wander the earth a fugitive and a vagabond. Yet the strange mercy of the story is that God marks Cain precisely so that no one may kill him—the murderer is made a protected exile, sheltered even in his guilt. Casimirri is that marked man: convicted for his role in Moro's death, he is nonetheless shielded by Nicaragua, which treats a demand for his surrender as an affront rather than a duty. The blood of the victim, the text says, cries out from the ground, and it is exactly that unanswered cry that Tajani invoked and Managua dismissed as \"European arrogance.\" Between the mark that protects the guilty and the blood that will not be silent lies the whole of this diplomatic rupture.",
        "excerpt": "And the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother's keeper? And he said, What hast thou done? the voice of thy brother's blood crieth unto me from the ground... a fugitive and a vagabond shalt thou be in the earth... And the LORD set a mark upon Cain, lest any finding him should kill him. And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.",
        "source": "Genesis 4:9–16, King James Version (Authorized Version).",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a3.png",
          "alt": "Fernand Cormon's painting of Cain fleeing with his family into the wilderness after the murder of Abel.",
          "credit": "Fernand Cormon, Cain (Caïn fuyant avec sa famille / Cain fleeing before Jehovah's Curse), 1880, oil on canvas, Musee d'Orsay, Paris. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "When a state wants to remember a political murder, it reaches for images like David's Death of Marat—and the Moro case is, at bottom, a fight over who controls that memory. David painted the assassinated Jacobin not as a corpse but as a martyr, lending a squalid killing the gravity of a sacred death and fixing the victim, not the assassin, at the center of the nation's gaze. Italy's insistence on extraditing Casimirri is a demand that Moro be granted the same standing: that the murdered man remain the subject of the story and the killer be made to answer. Nicaragua's refusal, and its shelter of the gunman, is the counter-claim—that the fugitive, not the victim, deserves protection. The painting reminds us that assassination is never only a crime but an argument about meaning, waged long after the blood is dry. That argument is what has now severed two nations' ties.",
        "excerpt": "Jacques-Louis David depicts the murdered revolutionary journalist Jean-Paul Marat slumped in his bath, quill still in hand, moments after being stabbed by Charlotte Corday, whose petition he still holds. The assassin herself is absent; David gives us only the martyred victim, lit by a cold light against an empty dark ground, transforming a political killing into a secular pieta. It became the founding image of assassination as political iconography.",
        "source": "Jacques-Louis David, The Death of Marat (La Mort de Marat), 1793, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Death_of_Marat_by_David.jpg",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a4.png",
          "alt": "Jacques-Louis David's The Death of Marat: the assassinated revolutionary Jean-Paul Marat slumped dead in his bath, a quill in his hand.",
          "credit": "Jacques-Louis David, The Death of Marat, 1793, Royal Museums of Fine Arts of Belgium, Brussels. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "It is fitting that the sharpest image of this quarrel comes from an Italian brush: Vincenzo Camuccini, a Roman, painted the assassination of Caesar as a storm of daggers in the very chamber of the Republic. His Death of Caesar shows the killing of a head of state carried out by men who called it duty—precisely the self-justification the Red Brigades claimed when they seized and shot Aldo Moro on via Fani. Casimirri, alone among that commando, was never arrested; like Caesar's assassins he struck at the state and then slipped beyond its reach, in his case across an ocean to Managua. Camuccini's Rome is the Rome now demanding his return, insisting that political murder cannot be dissolved into ideology or distance. The canvas freezes the instant of the crime; the Moro file, half a century on, is still frozen at the same point, its last actor beyond justice. Tajani's demand and Nicaragua's rupture are the long echo of that unfinished scene.",
        "excerpt": "Vincenzo Camuccini's canvas freezes the instant of the Ides of March: Julius Caesar, wrapped in white, recoils as a knot of senators press in with drawn daggers, turning the Roman Senate itself into the scene of the crime. The Roman painter renders the killing of the head of state as a theatrical convulsion of gesture and betrayal. The assassins act in the name of the Republic, yet history remembers the deed as murder.",
        "source": "Vincenzo Camuccini, La morte di Cesare (The Death of Caesar), c. 1804–1805, oil on canvas, Galleria Nazionale d'Arte Moderna e Contemporanea, Rome.",
        "href": "https://commons.wikimedia.org/wiki/File:Vincenzo_Camuccini_-_La_morte_di_Cesare.jpg",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a5.png",
          "alt": "Vincenzo Camuccini's The Death of Caesar: senators surround and stab Julius Caesar in the Roman Senate.",
          "credit": "Vincenzo Camuccini, La morte di Cesare, c. 1804–1805, Galleria Nazionale d'Arte Moderna e Contemporanea, Rome. Public domain."
        }
      }
    ]
  },
  {
    "slug": "us-public-charge-green-card-rule",
    "headline": "The Trump administration revives a 'public charge' rule that can deny green cards to immigrants who use public benefits",
    "overview": "A rule published in the Federal Register on Thursday restores broad discretion for U.S. immigration officers to deny green cards to applicants deemed likely to become a \"public charge,\" weighing an applicant's age, health, income and use of means-tested benefits such as food stamps, Medicaid and housing assistance. First imposed in 2020 and rescinded under President Biden, the policy will be formally published July 20 and take effect Sept. 18, subjecting hundreds of thousands of applicants a year to broader scrutiny. Advocates warn it will deter immigrant families from claiming aid they are legally entitled to.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxQQUR1VmZFV25YcWp2bTUtRGdJWlI2V0MxOWRWXy1aVkJRem5oRHBLQjhPRlhvdUdsV0J3RmREeFgtXzdvcHRfSkR0Y0l1ZDJ3NEtkWWVKaDZ6UmxsTFVkclU0V2RTRjNLbUtzSUswVktMZ3k1TmJMSGoxNnVxWnJYcmpza1I3ZFpQY2R1V3FhMA?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/dhs-immigrants-green-card-public-charge-medicaid-housing-food-aid/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/us-public-charge-green-card-rule.png",
      "alt": "Immigrants arriving at Ellis Island in the early twentieth century.",
      "credit": "Getty Images via CBS News"
    },
    "rank": 31,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Washington first set out to decide which newcomers were worthy of the nation, it did so by class and by origin. The Chinese Exclusion Act of 1882 slammed the gate on an entire people cast as undesirable, converting economic anxiety into a federal law of exclusion. The public-charge rule reviving on September 18 works by a subtler sorting: not barring a nationality outright, but empowering officers to weigh a family's poverty, their food stamps and Medicaid, as evidence they do not belong. Both measures answer the same question the Statue of Liberty was built to answer differently, namely who deserves to pass through the golden door. Where 1882 named its excluded class explicitly, the 2026 rule lets need itself become the disqualification. The through-line is a nation deciding a stranger's worth at its own threshold.",
        "excerpt": "Whereas, in the opinion of the Government of the United States the coming of Chinese laborers to this country endangers the good order of certain localities within the territory thereof: Therefore, Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That from and after the expiration of ninety days next after the passage of this act, and until the expiration of ten years next after the passage of this act, the coming of Chinese laborers to the United States be, and the same is hereby, suspended; and during such suspension it shall not be lawful for any Chinese laborer to come, or having so come after the expiration of said ninety days, to remain within the United States.",
        "source": "Chinese Exclusion Act (\"An Act to execute certain treaty stipulations relating to Chinese\"), ch. 126, 22 Stat. 58 (May 6, 1882). Text via the Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/19th_century/chinese_exclusion_act.asp",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a0.png",
          "alt": "An 1882 Puck cartoon showing laborers of many nationalities building a wall of prejudice to keep out Chinese immigrants.",
          "credit": "F. Graetz, \"The Anti-Chinese Wall,\" Puck, 1882. Library of Congress via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "The exact words powering today's rule are more than a century old. As Ellis Island opened its great inspection halls, the Immigration Act of 1891 had just made \"persons likely to become a public charge\" a formal class to be turned back at the harbor. Officers there learned to read poverty on sight, a thin coat, an empty purse, no relative waiting, and to mark such arrivals for exclusion or deportation. The Federal Register rule taking effect September 18 restores precisely that discretion, instructing officers to weigh Medicaid, housing aid, and food assistance against an applicant for a green card. It is the same phrase, the same logic, and the same fear, that the poor stranger will become a burden rather than a citizen. The huddled masses of Lazarus's poem were, in the law's eyes, exactly the people the public-charge clause was written to screen.",
        "excerpt": "All idiots, insane persons, paupers or persons likely to become a public charge, persons suffering from a loathsome or a dangerous contagious disease, persons who have been convicted of a felony or other infamous crime or misdemeanor involving moral turpitude, polygamists, and also any person whose ticket or passage is paid for with the money of another or who is assisted by others to come . . . .",
        "source": "Immigration Act of March 3, 1891, ch. 551, 26 Stat. 1084, sec. 1. Text via the Immigration History project, University of Texas at Austin.",
        "href": "https://immigrationhistory.org/item/immigration-act-of-1891/",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a1.png",
          "alt": "Lewis Hine photograph of an immigrant family seated among their bundles in the baggage room at Ellis Island around 1905.",
          "credit": "Lewis W. Hine, \"Immigrant Family in the Baggage Room of Ellis Island,\" c.1905. Google Art Project via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Emma Lazarus wrote her sonnet in 1883 to raise money for the Statue of Liberty's pedestal, and in doing so rewrote the meaning of the monument itself. Her \"Mother of Exiles\" does not ask newcomers to prove their wealth or usefulness; she summons precisely \"your tired, your poor, / Your huddled masses,\" the very people a public-charge test is designed to turn away. The rule reviving on September 18 inverts that welcome, treating poverty and reliance on food stamps, Medicaid, or housing aid as grounds to deny a green card rather than a reason to lift the lamp. Bolted in bronze inside the pedestal in 1903, the poem became the nation's stated creed, and the new regulation measures how far practice has drifted from it. To read the sonnet beside the Federal Register notice is to see two opposite answers to the stranger at the door.",
        "excerpt": "Not like the brazen giant of Greek fame,\nWith conquering limbs astride from land to land;\nHere at our sea-washed, sunset gates shall stand\nA mighty woman with a torch, whose flame\nIs the imprisoned lightning, and her name\nMother of Exiles. From her beacon-hand\nGlows world-wide welcome; her mild eyes command\nThe air-bridged harbor that twin cities frame.\n\"Keep, ancient lands, your storied pomp!\" cries she\nWith silent lips. \"Give me your tired, your poor,\nYour huddled masses yearning to breathe free,\nThe wretched refuse of your teeming shore.\nSend these, the homeless, tempest-tost to me,\nI lift my lamp beside the golden door!\"",
        "source": "Emma Lazarus, \"The New Colossus\" (1883), inscribed on a bronze plaque inside the Statue of Liberty pedestal in 1903. Public domain; text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a2.png",
          "alt": "Portrait photograph of the American poet Emma Lazarus, author of \"The New Colossus.\"",
          "credit": "Portrait of Emma Lazarus (1849-1887), c.1880s. Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The Book of Ruth tells of a destitute foreign widow, a Moabite and an outsider, who binds herself to Naomi and to Israel with words that became scripture's great vow of belonging. Ruth arrives with nothing and survives by gleaning leftover grain in Boaz's fields, the ancient equivalent of a poor immigrant leaning on public support; yet the text treats her not as a burden but as the ancestor of King David. The public-charge rule taking effect September 18 would read a woman like Ruth as \"likely to become a public charge\" and weigh her poverty against her admission. Her pledge that \"thy people shall be my people\" is the immigrant's promise of loyalty that the new policy answers with suspicion of need. The tension between welcoming the stranger and testing her worthiness is as old as this book.",
        "excerpt": "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God: Where thou diest, will I die, and there will I be buried: the LORD do so to me, and more also, if ought but death part thee and me.",
        "source": "The Holy Bible, King James Version (1611), Ruth 1:16-17. Public domain; text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ruth",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a3.png",
          "alt": "Painting depicting Ruth clinging to Naomi as she vows her loyalty.",
          "credit": "Philip Hermogenes Calderon, \"Ruth and Naomi.\" Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Frederic Auguste Bartholdi's colossus, dedicated in New York Harbor in 1886 as \"Liberty Enlightening the World,\" became the first thing millions of immigrants saw as their ships neared the Ellis Island inspection halls. Bartholdi conceived her as a beacon of republican liberty; Lazarus's poem and generations of arrivals recast her as a promise of refuge to the poor. The public-charge rule reviving September 18 legislates in the statue's very shadow, empowering officers to deny green cards to immigrants judged too likely to need food stamps, Medicaid, or housing aid. The image of a torch raised beside the \"golden door\" stands in stark opposition to a threshold now guarded against poverty itself. No monument states the nation's ideal of welcome more plainly, and none throws the new rule's exclusions into sharper relief.",
        "excerpt": "Bartholdi's copper colossus, \"Liberty Enlightening the World,\" rises more than 300 feet above New York Harbor, her right arm lifting a gilded torch and her left cradling a tablet of law. Dedicated in 1886, she faces the sea approach that carried millions of immigrants toward the Ellis Island inspection station. Her raised lamp became the enduring symbol of a nation that promised to receive the world's poor.",
        "source": "Frederic Auguste Bartholdi, \"Liberty Enlightening the World\" (the Statue of Liberty), dedicated October 28, 1886, New York Harbor. National Park Service, Statue of Liberty National Monument.",
        "href": "https://www.nps.gov/stli/learn/historyculture/statue-statistics.htm",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a4.png",
          "alt": "Front view of the Statue of Liberty holding her torch aloft against a clear sky.",
          "credit": "Frederic Auguste Bartholdi's Statue of Liberty, front view. Wikimedia Commons (CC0 / public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Ford Madox Brown painted \"The Last of England\" in 1855, freezing a young couple on a ship's deck as the white cliffs recede and they sail toward an uncertain life abroad. Their grim, frightened faces capture the emigrant's gamble, leaving everything on the bet that another country will take them in. The public-charge rule taking effect September 18 speaks to the receiving end of that same voyage, where officers now weigh a family's likely poverty, their use of Medicaid, food aid, or housing assistance, before granting the green card that would let them stay. Brown's migrants are precisely the anxious, unmoneyed strangers such a test is built to scrutinize. The painting renders the human weight of migration that a bureaucratic \"likely to become a public charge\" finding reduces to a checkbox. It is a portrait of the stranger at the door, caught the moment before the door decides.",
        "excerpt": "In Ford Madox Brown's oval oil painting, a young husband and wife sit huddled on the deck of an emigrant ship, gripping hands beneath a wind-battered umbrella as the cliffs of Dover fade behind them. Their pale, set faces convey both resolve and dread at abandoning their homeland. Cabbages strung along the rail and a crowd of fellow travelers mark them as ordinary people staking everything on a distant shore.",
        "source": "Ford Madox Brown, \"The Last of England\" (1855), oil on panel, Birmingham Museum and Art Gallery.",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a5.png",
          "alt": "Ford Madox Brown's painting The Last of England, showing two emigrants huddled under an umbrella on a ship's deck.",
          "credit": "Ford Madox Brown, \"The Last of England\" (1855). Birmingham Museums Trust / Google Art Project via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "white-house-teleprompter-bets",
    "headline": "Trump's teleprompter operator is placed on leave and probed by the CFTC over $100,000 in bets on the president's speeches",
    "overview": "Gabriel Perez, a technical assistant who has run President Trump's teleprompter since 2016, was placed on administrative leave amid a federal investigation into whether he used advance knowledge of Trump's remarks to win more than $100,000 on the prediction market Kalshi. Kalshi flagged suspicious trades on its \"Mentions\" market, where users bet on whether specific words or phrases appear in a speech, to the Commodity Futures Trading Commission, which found Perez had wagered on more than a dozen addresses over three months. The White House condemned the alleged conduct as \"a disgrace.\"",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPSThBSk1YZnFDUHFnS25LSFBYc1k5MkVsYTgwSnZlWjNLb0lkY3FwNjhJbDVBMVpiVWlvWFpxYnE3ZW9CbldmU3Z5eXhldEhBSzhUbjZnOU9WTjNrMGJOQUNfNE9Ham5ld0FONmkyeHZnaE1QUnd3YnpwcWlXRmJvS1RKVmp1SlAyRFd1Y0RfY0dTY2F6NkFUbHZVQ0NFUE5zMjVV?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxONGNvSTVFSlRPOGZURlozOWdsejNLd1Y3S2hWcFpEVnRCYm9WX2NKVko4elZkT3ZJME9MdU9BOFlGcVBIdWhHWDIzV2NLaFVWM3VBT3hfX2dKMTRWTkV4LWFGMEcxWUhhUlNVZlotU2lYdGpSbk90T1lGWVc2U3lnT3VRRHRveXZvNjNFcmFVOVpVek8wVklKdnVHQTZPR2FWbllVZHNYdEl6QmVhcW4xUjZ5aTJPaGFjV3RENTVB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/white-house-teleprompter-bets.png",
      "alt": "A teleprompter's angled glass panels stand before rows of empty seats.",
      "credit": "Wikimedia Commons"
    },
    "rank": 32,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "For centuries kings and commoners climbed to Delphi to buy a glimpse of words not yet spoken, and none is more famous than Croesus, who was promised that if he marched on Persia he would destroy a great empire, only to learn too late that the doomed empire was his own. The Pythia's power lay entirely in foreknowledge: she claimed to know what the future would say before any mortal could hear it. Gabriel Perez occupied a strangely similar seat. As the man who loaded the president's words into the teleprompter, he alone knew the exact phrases before they left Trump's mouth, and he turned that private oracle into cash on Kalshi. Where Croesus paid gold hoping to purchase certainty about words to come, Perez already possessed that certainty and simply sold it back to the betting market. The ancient warning that foreknowledge corrupts whoever wields it now reads like a CFTC indictment.",
        "excerpt": "They inquired thus, and the answers of both the Oracles agreed in one, declaring to Croesus that if he should march against the Persians he should destroy a great empire: and they counselled him to find out the most powerful of the Hellenes and join these with himself as friends.",
        "source": "Herodotus, The History of Herodotus, Book I, ch. 53, trans. G. C. Macaulay (London: Macmillan, 1890; public domain), via Project Gutenberg eBook #2707.",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a0.png",
          "alt": "The Pythia seated on a tripod amid rising vapours, delivering prophecy at Delphi, in John Collier's 1891 painting.",
          "credit": "John Collier, Priestess of Delphi (1891), Art Gallery of South Australia. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the autumn of 1919 eight Chicago White Sox players agreed to throw the World Series in exchange for a reported $100,000, letting gamblers who knew the fix was in collect fortunes on the 'wrong' team. It was the ultimate insider bet: the outcome was not predicted but privately arranged, and the money flowed to those who possessed secret knowledge unavailable to the honest public. Perez's alleged scheme rhymes uncannily, down to the six-figure sum, roughly $100,000 said to have been won on Kalshi by a trusted insider trading on information no ordinary bettor could have. Like the ballplayers, he stood at the very center of the spectacle, entrusted to serve it faithfully, and instead quietly monetized his access. Baseball answered with lifetime bans and the enduring label 'Black Sox'; the White House has answered Perez with the word 'disgrace.' Both scandals turn on the same rot: when the people running the game start wagering on it, the whole spectacle is revealed as riggable.",
        "excerpt": "In September and October 1919, eight members of the Chicago White Sox conspired with professional gamblers to lose the World Series to the Cincinnati Reds in exchange for a payoff reported at $100,000. Those who knew the fix was in bet heavily on the underdog Reds and collected, while the betting public wagered blind. Baseball's new commissioner permanently banned all eight players, and the affair became the enduring symbol of a sport corrupted by insiders wagering on a result they secretly controlled.",
        "source": "Jacob Pomrenke, 'The Black Sox Scandal,' Society for American Baseball Research (SABR).",
        "href": "https://sabr.org/journal/article/the-black-sox-scandal/",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a1.png",
          "alt": "Team photograph of the 1919 Chicago White Sox, eight of whom conspired to throw the World Series.",
          "credit": "1919 Chicago White Sox team photograph. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The archetype of the trusted insider who sells his secret knowledge for money is Judas Iscariot, one of the twelve, who went to the chief priests and asked, 'What will ye give me, and I will deliver him unto you?', settling on thirty pieces of silver. Judas's value to the conspirators was precisely his inside access: he alone could tell them where and when, converting privileged proximity into a payout. Gabriel Perez, at Trump's side since 2016 and privy to every prepared line, likewise converted a position of trust into private profit, betting on words he was uniquely positioned to know. The betrayal in each case is not merely greed but the corruption of a servant who was supposed to be loyal. The thirty pieces of silver and the $100,000 on Kalshi are the same coin: the price of foreknowledge sold behind the principal's back.",
        "excerpt": "Then one of the twelve, called Judas Iscariot, went unto the chief priests, And said unto them, What will ye give me, and I will deliver him unto you? And they covenanted with him for thirty pieces of silver. And from that time he sought opportunity to betray him.",
        "source": "The Gospel According to St. Matthew 26:14-16, King James Version (1611; public domain).",
        "href": "https://biblehub.com/kjv/matthew/26.htm",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a2.png",
          "alt": "A tormented Judas kneels and flings the thirty pieces of silver at the priests' feet in Rembrandt's 1629 painting.",
          "credit": "Rembrandt, Judas Repentant, Returning the Pieces of Silver (1629). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "When the prophet Elisha refused all payment for healing Naaman, his servant Gehazi could not bear to let the silver go; he chased the departing Syrian, lied to obtain a talent of silver and two changes of garments, and hid the gain, until Elisha asked, 'Is it a time to receive money?' and struck him with leprosy white as snow. Gehazi is the trusted attendant who secretly cashes in on his master's work, exactly the charge now leveled at Perez, accused of quietly enriching himself off the president he was employed to serve. Both men exploited a position of intimate access that was never theirs to sell. Both concealed the transaction and offered a false account when confronted. The story's verdict, that such greed marks a servant permanently, anticipates the White House calling Perez's alleged betting 'a disgrace.'",
        "excerpt": "And he said unto him, Went not mine heart with thee, when the man turned again from his chariot to meet thee? Is it a time to receive money, and to receive garments, and oliveyards, and vineyards, and sheep, and oxen, and menservants, and maidservants? The leprosy therefore of Naaman shall cleave unto thee, and unto thy seed for ever. And he went out from his presence a leper as white as snow.",
        "source": "The Second Book of the Kings 5:26-27, King James Version (1611; public domain).",
        "href": "https://biblehub.com/kjv/2_kings/5.htm",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a3.png",
          "alt": "The prophet Elisha raises his hand to refuse the gifts offered by the cured Syrian commander Naaman.",
          "credit": "Pieter de Grebber, Elisha Refuses the Gifts of Naaman (1637), Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Around 1595 Caravaggio painted 'The Cardsharps,' in which an innocent youth studies his hand while two cheats coordinate to rob him blind, one flashing a signal with gloved fingers, the other palming a hidden card behind his back. The whole drama depends on secret information: the sharps know what will happen, the mark does not, and the money moves accordingly. That is precisely the structure of a prediction market corrupted by an insider. Kalshi's other bettors were the guileless youth, wagering on which words Trump might say; Perez, allegedly holding the prepared script, was the sharper who already knew. Caravaggio grasped that cheating is less about luck than about the private possession of knowledge others lack, the same edge a teleprompter operator holds over the honest crowd. Painted more than four centuries ago, it could serve as the illustration for the CFTC's complaint.",
        "excerpt": "Caravaggio's canvas shows a fresh-faced young player absorbed in his cards while two sharpers fleece him: an older accomplice peers over his shoulder and signals with gloved fingers, and the youth at right hides an extra card behind his back. The dupe plays honestly, unaware that his opponents hold secret knowledge that guarantees the result. The painting is a portrait of exactly the asymmetry at the heart of the Perez case, in which the game only looks fair to the one who does not know the cards are marked.",
        "source": "Caravaggio (Michelangelo Merisi), The Cardsharps (I Bari), c. 1595, oil on canvas, Kimbell Art Museum, Fort Worth.",
        "href": "https://en.wikipedia.org/wiki/The_Cardsharps",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a4.png",
          "alt": "A young dupe studies his cards while an older cheat signals and a youth pulls a hidden card from behind his back.",
          "credit": "Caravaggio, The Cardsharps (c. 1595), Kimbell Art Museum, Fort Worth. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In Georges de La Tour's 'The Cheat with the Ace of Clubs,' a richly dressed dupe is quietly relieved of his fortune while a cardsharp slides a concealed ace from behind his belt, exchanging knowing glances with a courtesan and a maid who are in on the scheme. Everyone at the table shares the secret except the young victim, whose downcast eyes fix on his cards while the trap closes. La Tour stages deception as a conspiracy of the informed against the uninformed, a silent cabal profiting from what only they know. Gabriel Perez, entrusted with the president's unspoken words, is cast in the cheat's role: the calm insider who holds the winning card out of sight and lets the market pay him for certainty disguised as a wager. The painting's cool theatricality mirrors the quiet audacity of betting six figures on speeches one has already read. It is a moral emblem for an age of prediction markets, where the house of chance is only chance for those kept in the dark.",
        "excerpt": "La Tour depicts a lavishly dressed young gambler being cheated at cards: the sharp at left draws a hidden ace of clubs from behind his belt, while a scheming woman and a serving maid trade glances that show they are part of the plot. Only the wealthy dupe is ignorant of the arrangement. The scene renders cheating as a shared secret held by everyone but the victim, the informed silently harvesting the winnings from the one who plays in good faith.",
        "source": "Georges de La Tour, The Cheat with the Ace of Clubs, c. 1630-34, oil on canvas, Kimbell Art Museum, Fort Worth.",
        "href": "https://commons.wikimedia.org/wiki/File:Georges_de_La_Tour_-_The_Cheat_with_the_Ace_of_Clubs_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a5.png",
          "alt": "A cardsharp draws a hidden ace from his belt as two women exchange knowing glances and a young dupe studies his hand.",
          "credit": "Georges de La Tour, The Cheat with the Ace of Clubs (c. 1630-34), Kimbell Art Museum, Fort Worth. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "world-ai-cooperation-organization",
    "headline": "Twenty-nine countries sign an agreement to create a China-backed World AI Cooperation Organization based in Shanghai",
    "overview": "Representatives of 29 nations, including Russia, Belarus, Serbia, Cuba, Brazil and Venezuela along with a bloc of African and Asian states, signed an agreement in Shanghai on Thursday to establish the World AI Cooperation Organization, an intergovernmental body headquartered in the city that China says will promote global governance of artificial intelligence. The signing came on the eve of the World Artificial Intelligence Conference, where President Xi Jinping is expected to lay out Beijing's vision for AI as a tool of Chinese diplomacy. The United States and most of its closest allies were absent from the founding roster.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPTGF5ME1YRmJSTE42TWVWMDUyc1NkMlA2QVQxVlN6dkZuenF4RFcxSFlhUXk3eVZnUWZ3SzdZTDEzbTNVZzJ0NUhadERqUHQ1WmtvSl9aXzE1Qlh3UFdvR3ZXUmJDXzhycGJ0cUdtdXFVUFpzaTNWX3VBemlqUXh3UF95R2k5RTJKbjZFZ09MS3h0TUlnZ3FRMlN2T3lIc19qNGxLcmY1eTJwQVMyb2ZfNk03YjdST2hKRkg1TFFn?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/20260716/2fb3c068a5ec4efbbeb6a88acf155175/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/world-ai-cooperation-organization.png",
      "alt": "The Shanghai skyline at dusk, home to the new World AI Cooperation Organization.",
      "credit": "CNBC Africa"
    },
    "rank": 33,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before modern treaties, the Greek city-states bound themselves together in the Amphictyonic League, a standing council of nations that met around the sacred shrine at Delphi to deliberate common affairs and jointly guard the temple's treasure. The World AI Cooperation Organization founded in Shanghai reaches for the same ancient template: a common council of assembled states, gathered around a shared object of reverence, that claims the authority to administer something too valuable and too dangerous to be left to any single hand. Where the Amphictyons pooled votes and offerings under a religious canopy, the twenty-nine signatories pool sovereignty over artificial intelligence under Beijing's convening power. The shrine at Delphi was never neutral ground for long, and the states that hosted or dominated the council reliably bent it to their advantage. That is the quiet warning the analogy carries as China invites the world to worship at a temple it has built and located in its own city.",
        "excerpt": "And indeed the Amphictyonic League was organised from the latter, both to deliberate concerning common affairs and to keep the superintendence of the temple more in common, because much money and many votive offerings were deposited there, requiring great vigilance and holiness.",
        "source": "Strabo, Geography, Book IX, Chapter 3, Section 7, trans. H. L. Jones, Loeb Classical Library.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/9C*.html",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a0.png",
          "alt": "The standing columns of the ruined Temple of Apollo at Delphi, ancient meeting place of the Amphictyonic League.",
          "credit": "Temple of Apollo at Delphi, photograph via Wikimedia Commons (CC BY-SA)."
        }
      },
      {
        "category": "historical",
        "title": "In 1919 the victorious powers wrote a Covenant to found the League of Nations, the first attempt to house permanent global governance inside a single chartered institution, complete with a seat, a membership roll, and a lofty pledge to promote international co-operation. The parallel to the Shanghai-based World AI Cooperation Organization is almost structural: a founding document, a headquarters city, a roster of signatory states, and grand language about collective security recast for the age of algorithms rather than armies. The League's most famous flaw is also the sharpest echo here, for the United States, whose president had championed the idea, never joined, leaving the body lopsided from birth. Today it is again Washington and its closest allies who stand outside the door while a rival architect assembles the members within. The Covenant reminds us that an international order is only as universal as its absences allow, and a governance body missing the field's leading power governs in name more than in fact.",
        "excerpt": "THE HIGH CONTRACTING PARTIES, In order to promote international co-operation and to achieve international peace and security by the acceptance of obligations not to resort to war, by the prescription of open, just and honourable relations between nations, by the firm establishment of the understandings of international law as the actual rule of conduct among Governments, and by the maintenance of justice and a scrupulous respect for all treaty obligations in the dealings of organised peoples with one another, Agree to this Covenant of the League of Nations.",
        "source": "The Covenant of the League of Nations (1919), Preamble. The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/20th_century/leagcov.asp",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a1.png",
          "alt": "William Orpen's painting of diplomats gathered to sign the Treaty of Versailles in the Hall of Mirrors, 1919, which established the League of Nations Covenant.",
          "credit": "William Orpen, 'The Signing of Peace in the Hall of Mirrors, Versailles, 28th June 1919' (1919), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The story of Babel is scripture's oldest parable of humanity uniting across nations to build a single mighty work that would make it a name and pierce the heavens. The World AI Cooperation Organization is a Babel-like ambition inverted and re-tooled, a coalition of tongues assembling not brick and mortar but a shared apparatus of governance over a technology whose builders openly speak of reaching superhuman heights. The passage's tension between one people speaking one language and the fear of what such unity might accomplish reads uncannily onto a summit where Xi frames a unifying AI order as diplomacy. Babel's ending, a scattering and a confounding of speech, hangs over any project that presumes the world can be gathered under one tower and one authority. It asks whether this new organization is a true convergence of nations or a monument that will fracture along the very lines of language and power it seeks to transcend.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. And the LORD came down to see the city and the tower, which the children of men builded. And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another's speech.",
        "source": "The Holy Bible, King James Version, Genesis 11:4-7. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/10/10-h/10-h.htm",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a2.png",
          "alt": "Pieter Bruegel the Elder's painting of the Tower of Babel, a vast spiralling structure under construction toward the clouds.",
          "credit": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), Kunsthistorisches Museum Vienna, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Thucydides recorded how the Greek allies, out of shared fear and shared purpose, freely handed leadership to Athens, which then fixed the contributions, appointed the treasurers, and set the common treasury on the sacred island of Delos where the congresses met. It is the classic account of a voluntary alliance that hardened into an empire, the founding partners gradually discovering that the convening power had become the master. The World AI Cooperation Organization, launched by consenting signatories under Chinese sponsorship with its treasury of authority housed in Shanghai, invites exactly this reading. What begins as pooled deliberation among independent states can, as Thucydides warns, drift toward the dominance of the one power that holds the meeting place and writes the rules. The excerpt is a mirror held up to any coalition that lets a single convener collect the dues and keep the books.",
        "excerpt": "The Athenians, having thus succeeded to the supremacy by the voluntary act of the allies through their hatred of Pausanias, fixed which cities were to contribute money against the barbarian, which ships; their professed object being to retaliate for their sufferings by ravaging the King's country. Now was the time that the office of \"Treasurers for Hellas\" was first instituted by the Athenians. These officers received the tribute, as the money contributed was called. The tribute was first fixed at four hundred and sixty talents. The common treasury was at Delos, and the congresses were held in the temple.",
        "source": "Thucydides, History of the Peloponnesian War, Book I, Ch. 96, trans. Richard Crawley. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a3.png",
          "alt": "Marble bust of the ancient Greek historian Thucydides, who chronicled how the Delian League became an Athenian empire.",
          "credit": "Bust of Thucydides, Royal Ontario Museum, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Baptiste Isabey's celebrated group portrait of the Congress of Vienna shows the statesmen of Europe assembled in a single chamber in 1815 to redraw the map and set the terms of a new international order after an era of upheaval. The image is the visual archetype of what the Shanghai signing aspires to be: a room of plenipotentiaries convened by the great powers of the moment to codify who governs what in the world to come. Yet Vienna was also a masters' bargain, an order dictated by the strongest few and dressed as a concert of nations, which is precisely the charge critics level at a China-led AI body from which the United States and its allies are absent. The painting captures both the grandeur and the exclusivity of such congresses, the sense that history's furniture is being rearranged by those who happen to hold the room. It stands as a portrait of order-making itself, and of the quiet question of whose order is being made.",
        "excerpt": "This engraving after Jean-Baptiste Isabey depicts the assembled diplomats of the Congress of Vienna in 1815, the plenipotentiaries of the great powers gathered to settle the shape of post-Napoleonic Europe. Figures such as Metternich, Wellington, and Talleyrand stand and confer around a document-strewn table, an enduring emblem of a world order negotiated by a convening few. It is the canonical image of a congress of nations redrawing the rules of the age.",
        "source": "Congress of Vienna, engraving after Jean-Baptiste Isabey (c. 1819). Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Congress_of_Vienna.PNG",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a4.png",
          "alt": "Engraving after Jean-Baptiste Isabey showing the statesmen of Europe assembled at the Congress of Vienna in 1815.",
          "credit": "After Jean-Baptiste Isabey, 'Congress of Vienna' (c. 1819), via Wikimedia Commons (CC BY-SA 3.0)."
        }
      },
      {
        "category": "artistic",
        "title": "Rubens painted this allegory, known as Peace and War, as a diplomatic gift to persuade a king toward reconciliation, showing Minerva, goddess of wisdom, physically holding back armored Mars so that the abundance of peace can flow to a huddle of children. It is an artwork made as an instrument of statecraft, arguing that only vigilant wisdom can restrain destructive force long enough for common prosperity to take root. That is exactly the promise the World AI Cooperation Organization drapes over itself: an assembly of nations claiming to marshal collective wisdom to govern a technology that could enrich or endanger all humanity. The painting's beauty is also its rhetoric, and its purpose reminds us that images and institutions of concord are often themselves moves in a contest for advantage. Whether Shanghai's new body shelters the world's future or merely dresses a bid for primacy is the very ambiguity Rubens's allegory embodies.",
        "excerpt": "In Rubens's allegory 'Minerva Protects Pax from Mars,' the helmeted goddess of wisdom pushes back the war-god Mars while Peace, a nursing figure, showers wealth upon a cluster of children under her care. Painted around 1629-30 as a gift tied to Rubens's own peace diplomacy, it argues that only wisdom's restraint of violence allows shared abundance to flourish. It is a masterwork in which art is openly enlisted in the cause of international concord.",
        "source": "Peter Paul Rubens, Minerva Protects Pax from Mars ('Peace and War'), c. 1629-30, The National Gallery, London. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_(1577-1640)_Peace_and_War_(1629).jpg",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a5.png",
          "alt": "Rubens's allegory Peace and War, with the goddess Minerva restraining Mars while Peace pours riches over children.",
          "credit": "Peter Paul Rubens, 'Minerva Protects Pax from Mars (Peace and War)', c. 1629-30, National Gallery London, via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "ai-chatbots-censorship-study",
    "headline": "A Meta Oversight Board study finds leading AI chatbots more willing to criticize democratic leaders than authoritarian ones",
    "overview": "A study released Thursday by Meta's Oversight Board found that ten leading large language models, including systems from Meta, OpenAI and Anthropic, were markedly more likely to criticize democratic leaders than authoritarian rulers, raising fears the technology is quietly extending state censorship across borders. In tests, models that would readily mock President Trump or Britain's King Charles III often declined to do the same for the leaders of China, Saudi Arabia or Thailand. The board warned developers risk building \"AI infrastructure that... has the effect of extending illegitimate restrictions on freedom of expression globally.\"",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNS3JjU0pFR29uUnJyY09HcDVOMktVbzRDQlFXTmJBcWo0SThRVFBvMURqUkZtMmtFUFI2M3ZfSWVuaG12YTB0eE1Cc2JpajNQTjA4bV9nUW1iZzE5SjZ6Zng1Qzk4RjlOanVSLWItd0RDM0hwRng5WFZTdUdJcEZ4cXBjQ3NHOTBZdlRnUTVmVE5fXzljMkQ5UE52Z1FkTXVSWldZelRRcXZ4SktDU3VXaHJaeDFLR2NjbXc?oc=5"
      },
      {
        "name": "Euronews",
        "href": "https://www.euronews.com/next/2026/07/16/ai-chatbots-more-likely-to-criticise-western-leaders-than-authoritarian-ones-study-finds"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/ai-chatbots-censorship-study.png",
      "alt": "A printed page with lines heavily blacked out, symbolizing restricted speech.",
      "credit": "Euronews"
    },
    "rank": 34,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 213 BCE the chancellor Li Si persuaded China's first emperor, Qin Shi Huang, that privately held books let scholars \"use the past to disparage the present,\" and so ordered the histories of the rival states and the writings of the hundred schools consigned to the flames. The logic was that a unified realm required a single sanctioned memory, and that criticism of the throne was best prevented by destroying the very texts that made criticism thinkable. The Meta Oversight Board's finding echoes that ancient calculus in a modern key: today's leading chatbots do not burn books, but by refusing to criticize authoritarian rulers while freely mocking democratic ones, they quietly narrow what may be said about the powerful. Where Qin's fire left visible ash, the machine's reticence leaves no trace at all, only an absence where a criticism might have been. Both regimes grasp the same principle, that whoever controls the record of the past and the speech of the present controls who may be questioned.",
        "excerpt": "In his memorial of 213 BCE, recorded more than a century later by the historian Sima Qian, Chancellor Li Si urged the First Emperor to burn the poetry, the histories of the former kings, and the writings of the hundred schools of philosophy, sparing only manuals of medicine, divination, and agriculture. His stated aim was to silence scholars who \"use the past to disparage the present\" and who cited the words of former kings to condemn the emperor's policies. Anyone who dared to discuss the banned classics was to be executed, and their family punished alongside them.",
        "source": "Sima Qian (Ssu-ma Ch'ien), Records of the Grand Historian (Shiji), Basic Annals of the First Emperor of Qin; memorial of Chancellor Li Si, 213 BCE. Primary-source document, Asia for Educators, Columbia University.",
        "href": "https://afe.easia.columbia.edu/ps/cup/lisi_legalist_memorials.pdf",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a0.png",
          "alt": "Historical Chinese depiction of the Qin dynasty burning of books and burying of scholars, with texts thrown onto a fire and scholars led away.",
          "credit": "Traditional Chinese depiction of the 'burning of the books and burying of the scholars' (焚書坑儒); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 22 June 1633 Galileo Galilei knelt before the Roman Inquisition and, under threat of torture, abjured the truth he had confirmed through his telescope, that the Earth moves around the Sun. The Church did not need to refute him; it needed only to make him recant, and to make his recantation a warning to everyone else. The Oversight Board study describes a subtler version of the same discipline: chatbots that will gladly interrogate a King Charles or a Donald Trump grow cautious and evasive when the subject is a strongman who punishes dissent. Fear, whether of an inquisitor's instruments or a foreign government's ban, teaches the same lesson, that some truths are safest left unspoken in the presence of the powerful. Galileo is said to have murmured 'and yet it moves' under his breath as he rose; the danger now is a technology so trained to please authority that it will not even murmur.",
        "excerpt": "I abjure with sincere heart and unfeigned faith, I curse and detest the said errors and heresies, and generally all and every error and sect contrary to the Holy Catholic Church.",
        "source": "\"The Crime of Galileo: Indictment and Abjuration of 1633,\" in the Internet Modern History Sourcebook, ed. Paul Halsall, Fordham University.",
        "href": "https://sourcebooks.fordham.edu/mod/1630galileo.asp",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a1.png",
          "alt": "Cristiano Banti's 1857 painting of Galileo standing before the black-robed tribunal of the Roman Inquisition.",
          "credit": "Cristiano Banti, 'Galileo Facing the Roman Inquisition' (1857); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "John Milton wrote Areopagitica in 1644 to protest Parliament's demand that every book be licensed before it could be printed, arguing that pre-publication censorship strangles truth in its cradle. To destroy a good book, he insisted, is to kill reason itself, 'the image of God, as it were in the eye.' The Oversight Board's findings reveal a form of censorship Milton could not have imagined: not a licenser stamping approval on a finished manuscript, but a machine that quietly declines to generate certain criticisms in the first place, so that the forbidden thought is never even composed. His fear was suppression after writing; ours is suppression before writing, an editorial hand hidden inside the tool itself. Where Milton demanded the liberty to know, to utter, and to argue freely according to conscience, the chatbot's uneven willingness to criticize rations that liberty according to who holds power.",
        "excerpt": "For books are not absolutely dead things, but do contain a potency of life in them to be as active as that soul was whose progeny they are; nay, they do preserve as in a vial the purest efficacy and extraction of that living intellect that bred them. … as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica: A Speech of Mr. John Milton for the Liberty of Unlicensed Printing, to the Parliament of England (London, 1644); Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a2.png",
          "alt": "The 1644 printed title page of John Milton's Areopagitica.",
          "credit": "Title page of the first edition of Milton's Areopagitica (1644); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Hans Christian Andersen's 1837 tale, an entire court and city praise the emperor's magnificent new clothes, each courtier too frightened of seeming unfit for his post to admit that the emperor is in fact wearing nothing at all. Only a small child, innocent of the incentives that muzzle everyone else, blurts out the obvious truth. The Oversight Board study casts today's chatbots as the flattering courtiers rather than the child: quick to note the flaws of leaders who cannot punish them, yet suddenly tongue-tied before rulers who can. The tale's moral is that truth-telling requires someone with nothing to lose, and an AI trained to avoid offending powerful states has been given a great deal to lose. The question the study raises is whether these systems will ever play the child in the crowd, or only add one more voice whispering that the robes are beautiful.",
        "excerpt": "\"But the Emperor has nothing at all on!\" said a little child.\n\n\"Listen to the voice of innocence!\" exclaimed his father; and what the child had said was whispered from one to another.\n\n\"But he has nothing at all on!\" at last cried out all the people.",
        "source": "Hans Christian Andersen, \"The Emperor's New Suit\" (1837), in Andersen's Fairy Tales, trans. H. P. Paull; Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/1597/1597-h/1597-h.htm",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a3.png",
          "alt": "Vilhelm Pedersen's 19th-century illustration of the naked emperor parading beneath a canopy while attendants pretend to carry his invisible train.",
          "credit": "Vilhelm Pedersen, illustration for 'Kejserens nye klæder' (The Emperor's New Clothes); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Goya's etching, plate 43 of Los Caprichos, shows a sleeping artist beset by a swarm of owls and bats, while the inscription on the desk warns that the sleep of reason produces monsters. Created as Goya navigated the Spanish Inquisition's own censorship, it is an image about what fills the mind when critical thought is suspended or forbidden. The Oversight Board's findings suggest a modern sleep of reason: when a chatbot withholds criticism of authoritarian leaders, it lulls its users toward a distorted picture of the world, one in which tyrants are conspicuously spared the scrutiny that falls on democrats. The monsters here are not fantastical but statistical, patterns of silence learned from a fear of offending the powerful. Goya's sleeper cannot see what gathers around him; neither can a user who mistakes an AI's selective reticence for balance.",
        "excerpt": "El sueño de la razon produce monstruos. (The sleep of reason produces monsters.)",
        "source": "Francisco de Goya, El sueño de la razón produce monstruos (The Sleep of Reason Produces Monsters), plate 43 of Los Caprichos, etching and aquatint, 1799. Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Museo_del_Prado_-_Goya_-_Caprichos_-_No._43_-_El_sue%C3%B1o_de_la_razon_produce_monstruos.jpg",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a4.png",
          "alt": "Goya's etching of a man asleep at his desk as owls and bats swarm out of the darkness behind him.",
          "credit": "Francisco de Goya, 'El sueño de la razón produce monstruos', Los Caprichos no. 43 (1799), Museo del Prado; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier's 1834 lithograph 'Ne vous y frottez pas!!' — 'Don't Meddle With It!!' — depicts a defiant printer with sleeves rolled and fists raised, guarding the liberty of the press against a French government determined to gag its critics; Daumier himself had been jailed for caricaturing the king. The censorship laws that soon crushed the satirical press punished precisely the mockery of the mighty that the Oversight Board found today's chatbots reluctant to perform. Daumier's printer stands his ground; the modern worry is a technology that has quietly agreed not to fight at all, declining to lampoon authoritarian rulers as readily as it lampoons elected ones. Lèse-majesté, the crime of insulting a monarch, was Daumier's constant peril and is now, in effect, re-encoded as caution in systems that must serve markets where such insults remain illegal. His raised fists pose the very question the study forces on us: who is still willing to meddle with power?",
        "excerpt": "Ne vous y frottez pas!! (Don't meddle with it!!)",
        "source": "Honoré Daumier, Ne vous y frottez pas!! (Don't Meddle With It!!), lithograph, L'Association mensuelle, plate 20, March 1834. National Gallery of Art, Washington.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a5.png",
          "alt": "Daumier's lithograph of a defiant printer standing with fists raised to defend the freedom of the press, a fallen figure behind him.",
          "credit": "Honoré Daumier, 'Ne vous y frottez pas!!' (1834), National Gallery of Art; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "ai-stocks-global-selloff",
    "headline": "A slump in AI and chip stocks drags down markets worldwide, with South Korea's Kospi falling 6.4%",
    "overview": "Shares of the chipmakers and other winners of the artificial-intelligence boom tumbled on Thursday, pulling markets lower around the world; Nvidia, the world's most valuable company, fell about 4%, while Arm, Micron, AMD and Broadcom each dropped more than 5%. In Asia the sell-off was sharper, dragging South Korea's Kospi down 6.4% as Samsung Electronics and SK Hynix slid. Investors were rattled by doubts over the soaring cost of AI computing after Nvidia's chief executive suggested it could climb toward $100 billion per gigawatt.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNSmJlT2oxT2ZMTTVULXNjOGZQbGYzaTVidG9wc0ZvcnZTdVFVN25BcVkxdHpTRTB0X3RIV2MzcGlHRW1TeHpkWmE3MXE2Wm1kRUNBU0x6ZlJrSU1WQjhGelJldGJiUEhhNXBrN19sdDlJSFVfanJlLVlQQXJrdV8tZEk0bklud3dxRnZXcjk2MXR2eFA5Y1pZ?oc=5"
      },
      {
        "name": "The Washington Times",
        "href": "https://www.washingtontimes.com/news/2026/jul/16/ai-stocks-slumping-oil-prices-keep-rising/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/ai-stocks-global-selloff.png",
      "alt": "Electronic boards on a stock exchange show sharply falling share prices.",
      "credit": "NBC News"
    },
    "rank": 35,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When AI and chip stocks cratered on Thursday, 16 July 2026 - Nvidia down 4 percent, Arm, Micron, AMD and Broadcom off more than 5, and South Korea's Kospi collapsing 6.4 percent - traders were re-enacting a script written in Holland almost four centuries earlier. In the Dutch tulip mania of the 1630s, a single flower bulb could change hands for the price of a canal-side house, and the whole nation, in Mackay's phrase, 'even to its lowest dregs, embarked in the tulip trade.' What finally broke it was not a bad harvest but a thought: the dawning suspicion that somebody, in the end, must lose fearfully. Today that thought wears a price tag - roughly 100 billion dollars for every gigawatt of AI computing - and the question of who ultimately pays for it is exactly the doubt that sent semiconductors tumbling. The tulip fields teach the oldest lesson on the exchange: prices climb on the belief that a greater fool will always appear, and they fall the instant the crowd wonders whether it has become that fool. Confidence, once destroyed, does not rise again on command.",
        "excerpt": "At last, however, the more prudent began to see that this folly could not last for ever. Rich people no longer bought the flowers to keep them in their gardens, but to sell them again at cent. per cent. profit. It was seen that somebody must lose fearfully in the end. As this conviction spread, prices fell, and never rose again. Confidence was destroyed, and a universal panic seized upon the dealers.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Volume 1, chapter 'The Tulipomania' (London: Richard Bentley, 1841).",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a0.png",
          "alt": "Anonymous 17th-century watercolour of the striped 'Semper Augustus' tulip, the most expensive bulb of the Dutch tulip mania.",
          "credit": "Anonymous 17th-century watercolour, 'Semper Augustus' tulip (before 1640). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The other end of the market's memory reaches to Wall Street in October 1929, and Thursday's rout on the AI and chip names rhymes with it uncomfortably. Through the late 1920s a new technology - radio, autos, electrification - had produced a class of glamour stocks that seemed to defy gravity, much as Nvidia, Broadcom and the Kospi's chipmakers have in the age of artificial intelligence. Then, over a few catastrophic sessions, the marvels that had made fortunes destroyed them just as quickly, and a solemn crowd gathered outside the New York Stock Exchange to watch their paper wealth evaporate. The parallel that matters is not the size of the fall but its psychology: euphoria curdling into panic once investors began to doubt that earnings could ever justify the prices. Today's fear is specifically about cost - the staggering capital that AI's compute buildout demands - and about whether the revenue will ever arrive to pay for it. 1929 is the reminder that a boom's brightest darlings are precisely the ones with the furthest to fall.",
        "excerpt": "In the autumn of 1929 the great bull market in American stocks broke apart. After years in which technology-driven glamour shares had seemed unstoppable, prices collapsed across Black Thursday, 24 October, and Black Tuesday, 29 October, wiping out billions in paper wealth within days. Panicked crowds gathered on Wall Street as the certainties of the boom dissolved into fear, and the crash became the overture to the Great Depression.",
        "source": "Harold Bierman Jr. and the Federal Reserve, 'Stock Market Crash of 1929,' Federal Reserve History (Federal Reserve Bank of St. Louis / Board of Governors).",
        "href": "https://www.federalreservehistory.org/essays/stock-market-crash-of-1929",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a1.png",
          "alt": "A solemn crowd gathers on the street outside the New York Stock Exchange during the Wall Street crash of October 1929.",
          "credit": "'Crowd outside the New York Stock Exchange after the crash,' 29 October 1929. U.S. Government photograph, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Long before ticker tapes, the book of Proverbs had already named the vertigo that seized the chip market on Thursday. 'Riches certainly make themselves wings; they fly away as an eagle toward heaven' - a line that reads like a caption for a day when Nvidia shed 4 percent, its suppliers more than 5, and the Kospi 6.4 percent in a single session. The ancient warning is aimed exactly at the speculator's error: setting one's eyes 'upon that which is not,' treating an inflated valuation as though it were solid ground. For a year the AI trade felt like settled wealth; on Thursday it revealed itself as a bird already testing its wings. The proverb does not condemn industry, only the fever to be rich in a hurry, which is the very engine of every mania from tulips to transistors. When fortunes can be made and unmade overnight, this is the oldest fine print in the world.",
        "excerpt": "Labour not to be rich: cease from thine own wisdom. Wilt thou set thine eyes upon that which is not? for riches certainly make themselves wings; they fly away as an eagle toward heaven.",
        "source": "The Holy Bible, King James Version, Proverbs 23:4-5 (1611).",
        "href": "https://www.biblegateway.com/passage/?search=Proverbs%2023%3A4-5&version=KJV",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a2.png",
          "alt": "Rembrandt's painting of an old man counting coins by candlelight, illustrating the biblical parable of the rich fool.",
          "credit": "Rembrandt van Rijn, 'The Parable of the Rich Fool' (1627), Gemaldegalerie, Berlin. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ecclesiastes supplies the second scripture the market seemed to be reading aloud on Thursday: 'He that loveth silver shall not be satisfied with silver.' The AI boom has been the purest modern expression of that insatiability - each record valuation only stoking appetite for the next, until the cost of the compute needed to feed the machines, some 100 billion dollars per gigawatt, began to look like an abundance no revenue could satisfy. The Preacher's point is that accumulation past a certain scale delivers nothing but the beholding of it 'with their eyes,' which is a fair description of holdings that exist mainly as numbers on a screen. When those numbers fell 5 and 6 percent across the chip complex, investors were reminded that goods which merely multiply attract only more mouths to consume them. Vanity, in the biblical sense, is not sinfulness but emptiness - value that vanishes when you reach for it. That emptiness is precisely what a bursting bubble exposes.",
        "excerpt": "He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity. When goods increase, they are increased that eat them: and what good is there to the owners thereof, saving the beholding of them with their eyes?",
        "source": "The Holy Bible, King James Version, Ecclesiastes 5:10-11 (1611).",
        "href": "https://www.biblegateway.com/passage/?search=Ecclesiastes%205%3A10-11&version=KJV",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a3.png",
          "alt": "A Dutch vanitas still life by Pieter Claesz with a skull, an overturned glass and a timepiece, symbolising the emptiness of worldly riches.",
          "credit": "Pieter Claesz, 'Vanitas Still Life' (1632), Mauritshuis, The Hague. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth engraved the definitive picture of a market losing its mind in 1721, in the wake of Britain's South Sea Bubble, and it hangs over Thursday's sell-off like a diagnosis. His crowded scene shows Londoners riding a carousel of speculation while Fortune is butchered and hacked apart and Honesty is broken on a wheel - the moral chaos left when a euphoric public discovers its treasured shares are worth a fraction of the price it paid. Swap South Sea stock for AI and chip equities and the composition barely needs editing: the same manic crowd, the same darlings suddenly plunging, the same fortunes vanishing between one session and the next as the Kospi drops 6.4 percent. Hogarth's genius was to see speculation as a moral spectacle rather than a mere financial event - a fairground of credulity spinning until it throws its riders off. The soaring cost of feeding the AI machine is this decade's South Sea promise: a dazzling story that markets may have priced far ahead of what it can deliver. What the engraving warns is that when the machine stops, it is the crowd, not the schemers, who are broken on the wheel.",
        "excerpt": "Hogarth's crowded emblematic engraving satirises the speculative frenzy of the 1720 South Sea Bubble. A giant merry-go-round of investors whirls at its centre while a figure of Fortune is dismembered, Honesty is broken on the wheel, and a scene of greed, folly and ruin unfolds around a monument blaming the disaster on the madness of the town. It is often called the first editorial cartoon, turning financial mania into a moral tableau.",
        "source": "William Hogarth, 'The South Sea Scheme' (Emblematical Print on the South Sea Scheme), engraving, designed 1721, published 1724.",
        "href": "https://en.wikipedia.org/wiki/Emblematical_Print_on_the_South_Sea_Scheme",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a4.png",
          "alt": "William Hogarth's engraving 'The South Sea Scheme', depicting a chaotic crowd of speculators around a giant merry-go-round during the 1720 South Sea Bubble.",
          "credit": "William Hogarth, 'The South Sea Scheme' (1721). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Younger painted the cruellest joke about a bubble around 1640, and it lands squarely on Thursday's chip rout. In his 'Satire on Tulip Mania' the speculators of the Dutch flower craze are all monkeys - weighing bulbs, counting coins, feasting, drawing up contracts, and finally, in one corner, urinating on the worthless flowers as a fellow ape is carried to the grave. Brueghel's verdict is merciless: a mania turns clever men into aping imitators of one another, each buying only because the others are buying. Replace the tulips with GPUs and the AI trade and the menagerie looks unnervingly current, a crowd of investors chasing marvels priced far beyond reason until the day the flowers wilt. When Nvidia and its peers dropped 4 to 6 percent and the Kospi fell 6.4, the monkeys were, so to speak, discovering the smell of their bargain. The painting's enduring sting is that the madness is always obvious - but only in hindsight, and only once the deed of purchase has become worthless paper.",
        "excerpt": "Painted around 1640, just after the Dutch tulip market collapsed, Brueghel's satire recasts the speculators as foolish monkeys in fine dress. The apes inspect bulbs, weigh them, count money, sign contracts and squabble, while one urinates on the now-worthless flowers and another is carried off to a grave - a mocking allegory of a mania that ruined those who chased it. The comedy is pointed: greed had made men behave like aping imitators of one another.",
        "source": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (Allegory of the Tulipomania), oil on panel, c. 1640, Frans Hals Museum, Haarlem.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a5.png",
          "alt": "Jan Brueghel the Younger's satirical painting depicting tulip-mania speculators as monkeys trading, weighing and squandering tulip bulbs.",
          "credit": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640), Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "netflix-forecast-shares-tumble",
    "headline": "Netflix shares tumble after a soft revenue forecast, despite second-quarter results in line with estimates",
    "overview": "Netflix shares fell more than 7% in after-hours trading on Thursday after the company issued a third-quarter revenue forecast below Wall Street expectations, overshadowing second-quarter results that were roughly in line with estimates on the back of membership growth, higher prices and rising ad revenue. The streaming giant guided to about $12.86 billion in current-quarter revenue against the roughly $13 billion analysts had expected. The stock has now shed close to 45% from its all-time high, erasing hundreds of billions of dollars in market value.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPaElBaG14Wm9OcTNhcTdGWVdBUWRnN0NqY2pBOUhkajZ0V3Jnb2FsbkUyd3J5bUY2TG9kM2gzanFkODEtdVZpR3UxZmNyeU9VYjBwTGtzd0c0R0Y0ZEpqd0k5WEtnRWpCT3pEaURUNzFmZmt2bDVyQUsxX2poOVFiVFg2OG9wQzR1bDBUQ3lNMDZ1SUJNenBOQmdod1N0LVpJM3RodzhKelhDTXVtTVJfM2dldmZVMFVfYUZSaGpKajNrN1djdW10T1NfSjhGUQ?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/16/netflix-nflx-earnings-q2-2026.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/netflix-forecast-shares-tumble.png",
      "alt": "A television screen glowing in a dark room as a streaming service loads.",
      "credit": "Getty Images via CNBC"
    },
    "rank": 36,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In imperial Rome the satirist Juvenal watched a once-sovereign people trade its political birthright for two comforts: free grain and the spectacle of the games, panem et circenses. The emperors who fed and entertained the mob understood that the crowd's loyalty was rented, never owned, and that its appetite for spectacle only grew with the feeding. Netflix has become the digital arena of our own age, a colossal machine for supplying the modern circus on demand, while Wall Street plays the part of the insatiable crowd. When the studio merely met its second-quarter numbers but promised a slightly thinner third-quarter harvest, the audience turned its thumb down and the shares fell more than seven percent after hours. Down roughly forty-five percent from its all-time high, the great entertainer relearns Juvenal's oldest lesson: those who live by the crowd's craving must keep the games coming, or watch its favor curdle. The spectacle can never simply be maintained; it must always be surpassed.",
        "excerpt": "iam pridem, ex quo suffragia nulli / vendimus, effudit curas; nam qui dabat olim / imperium, fasces, legiones, omnia, nunc se / continet atque duas tantum res anxius optat, / panem et circenses.",
        "source": "Juvenal, Satire X (Satura X), lines 78-81 (c. AD 100-127).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2007.01.0093%3Abook%3D4%3Apoem%3D10",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a0.png",
          "alt": "The Colosseum in Rome, the great amphitheatre where Roman crowds were fed spectacle to keep their favor.",
          "credit": "David Iliff, via Wikimedia Commons (CC BY-SA 3.0)"
        }
      },
      {
        "category": "historical",
        "title": "P. T. Barnum built the nineteenth century's greatest engine of popular wonder, packing his American Museum with marvels and learning, at enormous cost, that a showman's fortune rises and falls with the fickle enthusiasm of his public. He soared, was ruined by the Jerome Clock Company entanglement, and clawed his way back, proof that in the business of amusement no triumph is ever banked for good. His hard-won maxim, that anything spurious fails because the public is wiser than it looks, is the very discipline Netflix now faces: keep delivering a genuinely good article, or watch the audience drift away. The market's after-hours verdict on a soft forecast was a Barnum-scale reminder that the crowd's applause is a loan repayable on demand. A dominant entertainer trading forty-five percent below its peak is living Barnum's cycle of struggle and triumph in fast-forward. The next act always has to be bigger than the last.",
        "excerpt": "He must, of course, have a really good article, and one which will please his customers; anything spurious will not succeed permanently, because the public is wiser than many imagine.",
        "source": "P. T. Barnum, Struggles and Triumphs; or, Forty Years' Recollections of P. T. Barnum (1869), from the appended lecture 'The Art of Money-Getting.'",
        "href": "https://www.gutenberg.org/ebooks/50115",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a1.png",
          "alt": "Photographic portrait of showman P. T. Barnum.",
          "credit": "Photograph of P. T. Barnum, c. 1860s, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Awaiting execution, the philosopher Boethius imagined Fortune herself defending her cruelty: her whole art is to spin the wheel, delighting to see the high brought low and the low raised up. To climb aboard her wheel at all is to accept that the descent is written into the ascent. Netflix rode that wheel to an all-time high and now feels its downward arc, off roughly forty-five percent, tumbling another seven percent on a forecast that merely disappointed. Nothing about the company's second-quarter results was a failure, since it met the estimates, yet Fortune needs no failure to turn her wheel, only the expectation of less. Investors who mounted at the summit are learning that they cannot call it a hardship to come down when the rules of the game require it. The consolation, such as it is, is that the wheel keeps turning for those who endure.",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose 2 (trans. H. R. James, 1897).",
        "href": "https://www.gutenberg.org/ebooks/14328",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a2.png",
          "alt": "Medieval illumination of the Wheel of Fortune from the Carmina Burana codex, with figures rising and falling around Fortuna.",
          "credit": "Carmina Burana codex (Bavarian State Library, Clm 4660), 13th century, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Scheherazade weds a king who kills each bride at dawn, and survives by a single stratagem: she tells a story so gripping that she breaks it off at daybreak, and the king spares her one more day to hear the end. Her life is staked, night after night, on the promise that the next installment will be worth more than the last. Netflix is the Scheherazade of the streaming age, a storyteller whose survival depends on always having a more compelling tale queued for tomorrow. A quarter merely in line with estimates is a night's reprieve, but the soft forecast is the pause before dawn, when the audience, like Shahryar, demands proof that the next chapter justifies keeping the teller alive. The seven-percent drop is the market withholding its applause until it hears what comes next. To stop the tale is to end it; the story must always go on.",
        "excerpt": "and I will tell thee a tale which shall be our deliverance, if so Allah please, and which shall turn the King from his blood thirsty custom. ... And Shahrazad perceived the dawn of day and ceased to say her permitted say.",
        "source": "The Book of the Thousand Nights and a Night, trans. Richard F. Burton (1885), Vol. 1: 'Story of King Shahryar and his Brother.'",
        "href": "https://www.gutenberg.org/ebooks/3435",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a3.png",
          "alt": "Ferdinand Keller's 1880 painting of Scheherazade telling a tale to Sultan Shahryar.",
          "credit": "Ferdinand Keller, Scheherazade und Sultan Schariar, 1880, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Leon Gerome's 1872 canvas freezes the instant a Roman arena decides a life: a victorious gladiator looks up while the packed stands thrust their thumbs down, the crowd's verdict rendered in an eyeblink. The painting is really a portrait of the audience, a mass whose favor is total, immediate, and merciless. It is hard to find a better image for the moment Netflix reported, results that met the mark, a forecast that fell short, and a spectating market that instantly turned its collective thumb down and knocked the shares off more than seven percent. Gerome shows that in the entertainment economy the performer's fate is never in the performer's hands but in the mood of the watching multitude. For a company trading forty-five percent below its peak, the tiered stands of Wall Street have delivered their gesture. The show goes on only at the crowd's pleasure.",
        "excerpt": "Oil on canvas depicting a triumphant gladiator standing over a fallen opponent in a Roman amphitheatre while the Vestals and the packed crowd extend the pollice verso, thumbs turned, to demand the loser's death. Gerome makes the spectators' verdict the true subject of the picture, the arena's outcome decided entirely by the mood of the watching multitude.",
        "source": "Jean-Leon Gerome, Pollice Verso (Thumbs Down), 1872, oil on canvas, Phoenix Art Museum.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Leon_Gerome_Pollice_Verso.jpg",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a4.png",
          "alt": "Gerome's Pollice Verso: a victorious gladiator awaits the arena crowd's thumbs-down verdict on his fallen foe.",
          "credit": "Jean-Leon Gerome, 1872, Phoenix Art Museum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Edward Burne-Jones's towering Wheel of Fortune shows the goddess Fortuna, grave and impassive, turning a great wheel to which a slave, a king, and an emperor are bound, each rising or falling at her indifferent hand. Burne-Jones said his wheel comes to fetch each of us in turn and then it crushes us, an allegory of how elevation and ruin are two moments of the same rotation. Netflix, lately crowned at an all-time high, now finds itself on the descending spoke, down about forty-five percent and dropping further on a merely soft outlook. The figures on the wheel do not fall for having failed; they fall because it is the wheel's nature to turn. A market that lifted the entertainment giant to the summit now presses it downward with the same impersonal hand. The painting's stillness is the warning: no position on Fortune's wheel is ever a resting place.",
        "excerpt": "Oil on canvas in which a monumental Fortuna turns her great wheel, to which the bound figures of a slave, a king, and an emperor cling as they are raised up and cast down in turn. Burne-Jones presents the vagaries of fortune as a single relentless rotation in which triumph and ruin are inseparable.",
        "source": "Edward Burne-Jones, The Wheel of Fortune (La Roue de la Fortune), 1875-1883, oil on canvas, Musee d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Edward_Burne-Jones_-_The_Wheel_of_Fortune_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a5.png",
          "alt": "Edward Burne-Jones's The Wheel of Fortune, with Fortuna turning a wheel bearing a slave, a king, and an emperor.",
          "credit": "Edward Burne-Jones, 1883, Musee d'Orsay, via Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "danny-boyle-ink-venice",
    "headline": "Danny Boyle's Rupert Murdoch drama 'Ink' will open the 2026 Venice Film Festival in competition",
    "overview": "Danny Boyle's \"Ink,\" a drama about Rupert Murdoch's early days and his acquisition of The Sun, will have its world premiere in competition as the opening film of the 83rd Venice Film Festival on Sept. 2, organizers announced Thursday. Adapted by playwright James Graham from his own stage play, the film stars Jack O'Connell as Sun editor Larry Lamb, Guy Pearce as Murdoch and Claire Foy; it is Boyle's first non-franchise feature since 2019's \"Yesterday.\" Venice will unveil its full lineup on July 23.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQX09fcHJGUmdHUzJ5OExDNE1lVGlnOTFtM192RmlYTlFDWTRGdkV6QVpodTFpZExmYTBVeUFUS1ptMVNEcWRnMkFMcUxKbHVLUVBCZHVBV3pNSWFCMEx2V2lLUFo3cHJvTGFiUUFRQjdBaE9WNHFESjlyWjFpcnh1bFp6TEh0d2dPcVZ2T3RQaHJSY2RO?oc=5"
      },
      {
        "name": "Variety",
        "href": "https://variety.com/2026/film/global/danny-boyle-ink-venice-film-festival-1236812367/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/danny-boyle-ink-venice.png",
      "alt": "An old rotary newspaper printing press running a print run.",
      "credit": "Variety"
    },
    "rank": 37,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Enea Silvio Piccolomini marveled in 1455 that Gutenberg's printed pages were so clean and correct he could read them \"without glasses,\" he was witnessing the birth of the machine that would one day drop a red-top tabloid on every breakfast table in Britain. Danny Boyle's \"Ink\" is, at root, a story about that same machine—the press—and the intoxicating power of multiplying a single voice into millions of identical copies. Rupert Murdoch's purchase of The Sun and Larry Lamb's reinvention of it depended on the industrial descendants of Gutenberg's workshop: the roaring rotary presses that could flood a nation with print overnight. The film's fascination with ink, hot metal and deadlines is the fascination of the fifteenth century made modern—whoever commands the press commands what a public believes. Piccolomini's letter, the earliest eyewitness account of European printing, already grasps the essential thing: that the printed word carries an authority the handwritten never could. It is the first chapter of the story \"Ink\" tells about the mogul who would seize that authority.",
        "excerpt": "Nothing false was written to me about that miraculous man seen in Frankfurt. I have not seen complete Bibles, but several quires belonging to different books, exceedingly clean and correct in their script, and without error, which Your Grace could read effortlessly, even without glasses. I learned from numerous witnesses that 158 copies have been completed, although some others say the number is 180.",
        "source": "Enea Silvio Piccolomini (later Pope Pius II), letter to Cardinal Juan de Carvajal, 12 March 1455 — the earliest known account of the Gutenberg Bible; translation as quoted by The John Rylands Library, University of Manchester.",
        "href": "https://rylandscollections.com/2025/07/31/introducing-the-early-european-print-collection/",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a0.png",
          "alt": "An open Gutenberg Bible showing two columns of dense black gothic type with hand-painted red and blue initials, the Lenox copy at the New York Public Library.",
          "credit": "Photograph by Kevin Eng (NYC Wanderer) of the Gutenberg Bible, Lenox copy, New York Public Library. CC BY-SA 2.0 via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Half a century before Murdoch bought The Sun, William Randolph Hearst had already written the playbook that \"Ink\" dramatizes: give the public sensation, and if the news is thin, manufacture it. James Creelman's famous—and much-disputed—anecdote of Hearst wiring his artist in Havana, \"You furnish the pictures, and I'll furnish the war,\" captures the tabloid conviction that a newspaper need not merely report events but can conjure them. That is precisely the ambition Guy Pearce's young Murdoch and Jack O'Connell's Larry Lamb bring to Fleet Street, chasing circulation with scandal, sex and spectacle until the paper itself becomes the story. Hearst's \"yellow journalism,\" locked in a circulation war with Joseph Pulitzer, is the direct ancestor of the modern red-top whose birth \"Ink\" stages. Both men understood that the press baron's real product is not information but appetite. The parallel is a warning the film quietly presses: the power to shape public opinion is also the power to distort it.",
        "excerpt": "He was instructed to remain there until the war began; for \"yellow journalism\" was alert and had an eye for the future. Presently Mr. Remington sent this telegram from Havana:— \"W. R. HEARST, New York Journal, N.Y.: Everything is quiet. There is no trouble here. There will be no war. I wish to return. REMINGTON.\" This was the reply:— \"REMINGTON, HAVANA: Please remain. You furnish the pictures, and I'll furnish the war. W. R. HEARST.\"",
        "source": "James Creelman, On the Great Highway: The Wanderings and Adventures of a Special Correspondent (Boston: Lothrop Publishing Company, 1901), pp. 177–178.",
        "href": "https://archive.org/stream/ongreathighwaywa00creeuoft/ongreathighwaywa00creeuoft_djvu.txt",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a1.png",
          "alt": "An 1898 cartoon showing Pulitzer and Hearst, both dressed as the Yellow Kid, beating rival war drums amid a crowd—a satire of the newspaper circulation war.",
          "credit": "Leon Barritt, \"The Big Type War of the Yellow Kids,\" 1898. Library of Congress; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Long before Fleet Street, Ben Jonson saw both the joke and the danger in an industry that packages rumor as fact. In \"The Staple of News\" (first acted 1626) he invents a satirical \"office\" that gathers, grades and sells the news of the day—authentic or apocryphal, so long as it moves—anticipating by three centuries the newsroom Danny Boyle recreates in \"Ink.\" Jonson's clerks grasp the alchemy at the heart of Murdoch and Larry Lamb's tabloid revolution: that printing itself confers a spurious authority, so that even a lie \"runs News still.\" His line that \"the very printing of them makes them News\" could serve as an epigraph for the whole film. The Staple is Jonson's Sun, a commercial engine built on the discovery that the public will happily pay to be deceived. It is the oldest English satire on the very trade \"Ink\" both celebrates and interrogates.",
        "excerpt": "CYMBAL: We not forbid that any News be made, / But that't be printed; for when News is printed, / It leaves, Sir, to be News, while 'tis but written — / FITTON: Though it be ne're so false, it runs News still. / PENI-BOY JUNIOR: See divers Mens Opinions! unto some, / The very printing of them makes them News;",
        "source": "Ben Jonson, The Staple of News, Act I, Scene v (first performed 1626; text from the 1692 Folio of Jonson's Works).",
        "href": "https://www.hollowaypages.com/jonson1692news.htm",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a2.png",
          "alt": "A bust-length portrait of the playwright Ben Jonson in dark clothing with a white collar, gazing to one side against a dark background.",
          "credit": "After Abraham van Blyenberch, portrait of Ben Jonson, c. 1617. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Balzac's \"Lost Illusions\" is the great novel of journalism as a corrupting machine, and its cynical newsman Étienne Lousteau is a spiritual forebear of the ambitious men in \"Ink.\" Lousteau's confession—that he is \"a hired bravo\" who plies his \"trade among ideas and reputations\"—describes exactly the moral bargain the film watches Larry Lamb and Rupert Murdoch strike as they remake The Sun. Where Boyle's tabloid pioneers chase circulation by any means, Balzac's Paris press already trades praise and ruin for money, making and unmaking reputations to order. The novel insists that \"there is corruption everywhere,\" that the newspaper is a weapon for hire—an insight \"Ink\" revisits in the story of a paper that will print anything to win. Lucien de Rubempré's seduction by the glamour and power of the press mirrors the film's own fascinated ambivalence. Balzac supplies the literary DNA of every tale about journalism's Faustian pact, including this one.",
        "excerpt": "The craft is vile, but I live by it, and so do scores of others. Do not imagine that things are any better in public life. There is corruption everywhere in both regions; every man is corrupt or corrupts others. […] I am a hired bravo; I ply my trade among ideas and reputations, commercial, literary, and dramatic; I make some fifty crowns a month; I can sell a novel for five hundred francs; and I am beginning to be looked upon as a man to be feared.",
        "source": "Honoré de Balzac, Lost Illusions (\"A Distinguished Provincial at Paris\"), trans. Ellen Marriage; Project Gutenberg eBook #1559.",
        "href": "https://www.gutenberg.org/files/1559/1559-h/1559-h.htm",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a3.png",
          "alt": "An 1842 daguerreotype of Honoré de Balzac, shown bearded and open-shirted, staring directly at the viewer.",
          "credit": "Louis-Auguste Bisson, daguerreotype of Honoré de Balzac, 1842. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier's 1834 lithograph \"Ne vous y frottez pas!!\" (\"Don't meddle with it!\") shows a defiant printer, sleeves rolled, standing guard over the freedom of the press as a toppled king and his foreign backers look on—the printing worker imagined as a political force. It hangs directly over the themes of \"Ink,\" where the press is likewise treated as a power that governments and the powerful cannot fully control. Daumier, who had himself been jailed for caricaturing the king, understood the newspaper as both weapon and battleground, exactly as Boyle's film frames Murdoch's insurgent Sun. The printer's clenched, immovable stance embodies the \"publish and be damned\" bravado that runs through the film. Where Daumier celebrates the press against the crown, \"Ink\" complicates the picture, asking what happens when the press baron himself becomes the sovereign power. The lithograph is a fitting visual ancestor of the film's mythology of the printer as kingmaker.",
        "excerpt": "A powerful printer in shirtsleeves plants himself defiantly in the foreground, fists ready, refusing to be cowed; behind him King Louis-Philippe stumbles, while at right the deposed Charles X collapses amid money-bag-laden foreign monarchs. Beneath the central figure runs the legend \"Liberté de la Presse\"—the freedom of the press personified as an unbreakable workingman. Daumier drew the image for the republican L'Association mensuelle only two years after he had been imprisoned for mocking the king.",
        "source": "Honoré Daumier, \"Ne vous y frottez pas!!\" (Don't meddle with it! / Freedom of the Press), lithograph, plate 20 of L'Association mensuelle, March 1834. National Gallery of Art, Washington.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a4.png",
          "alt": "A lithograph of a muscular printer standing defiantly with clenched fists over the words 'Liberté de la Presse,' as a stumbling king and fallen monarch appear behind him.",
          "credit": "Honoré Daumier, \"Ne vous y frottez pas!!,\" 1834, lithograph. National Gallery of Art, Washington (CC0), via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jost Amman's 1568 woodcut of a printer's workshop, from the \"Book of Trades,\" is one of the earliest images of the very machine at the center of \"Ink\"—the press, with its type, its ink-dabbers and its freshly pulled sheets. It renders as dignified craft the physical process the film lingers over: the hot metal, the rollers, the smell of ink that makes a newspaper feel like a living thing. Boyle's film takes its very title from that substance, and Amman's print reminds us that the tabloid revolution Murdoch led was, materially, the same trade practiced for five hundred years. The woodcut's calm order is a striking contrast to the film's frantic newsroom, but the tools are recognizably ancestral. In presenting the printer as a figure of consequence, it anticipates a world in which the man who owns the press owns a share of the public mind. It is the trade of ink, at its origin, that \"Ink\" ultimately dramatizes.",
        "excerpt": "The woodcut depicts a busy sixteenth-century printing house: at the rear, compositors set type from the case, while in the foreground one man inks the forme with leather dabbers and another works the great screw press, lifting a printed sheet from its frame. Accompanying verses by the poet Hans Sachs praise the printer's art as a noble craft that carries wisdom and news across the world. It is among the first detailed European depictions of the printing press at work.",
        "source": "Jost Amman (illustrator) with verse by Hans Sachs, \"Der Buchdrucker\" (The Printer), woodcut from Das Ständebuch (Eygentliche Beschreibung aller Stände auff Erden), Frankfurt am Main, 1568.",
        "href": "https://commons.wikimedia.org/wiki/File:Buchdrucker-1568.png",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a5.png",
          "alt": "A 1568 woodcut of a printing workshop: a printer works a large wooden screw press in the foreground while assistants ink type and compositors set letters at the rear.",
          "credit": "Jost Amman, \"Der Buchdrucker\" (The Printer), woodcut from Das Ständebuch, 1568. Public domain via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "clark-art-selldorf-wing",
    "headline": "The Clark Art Institute unveils a Selldorf-designed wing to house the 331-work Tavitian collection",
    "overview": "The Clark Art Institute in Williamstown, Massachusetts, revealed plans for a new Aso O. Tavitian Wing, designed by Selldorf Architects, to house a 331-work gift of European old masters, including pieces by van Eyck, Rubens, Vigee Le Brun and Bernini, left to the museum by the late technology executive Aso Tavitian. The single-storey, roughly 15,000-square-foot building, clad in Calacatta Malva marble and set between the museum's existing structures, is due to break ground in January 2027 and open in 2028. Tavitian, who died in 2020, also left $45 million to build and endow it.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/clark-art-institute-selldorf-architects-1234754944/"
      },
      {
        "name": "Wallpaper*",
        "href": "https://www.wallpaper.com/architecture/public-buildings/selldorf-architects-clark-art-institute-design-reveal"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/clark-art-selldorf-wing.png",
      "alt": "A skylit gallery hung with European old-master paintings.",
      "credit": "Selldorf Architects via Artforum"
    },
    "rank": 38,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Clark opens Selldorf's Aso O. Tavitian Wing in 2028, it will be repeating a gesture the Ptolemies attempted more than two thousand years ago in Alexandria: gathering the scattered masterworks of a civilization under one roof and endowing an institution to keep them. Strabo's description of the Mouseion, with its covered walk, its hall, its shared table for men of learning, and a guardian appointed to preside, is the ancestor of the very word 'museum' and of the idea that Tavitian's 331-work bequest now serves. Like the Ptolemaic kings, Tavitian spent a private fortune assembling treasures, van Eyck, Rubens, Vigee Le Brun, Bernini, and then in effect appointed trustees to preserve them whole. The $45 million he left ensures the collection is maintained rather than dispersed, just as the Museum's endowment sustained its scholars. The parallel carries a warning too: Alexandria is remembered partly for what was lost, a reminder that permanence in marble still depends on the fragile institutions that tend it.",
        "excerpt": "The Museum is a part of the palaces. It has a public walk and a place furnished with seats, and a large hall, in which the men of learning, who belong to the Museum, take their common meal. This community possesses also property in common; and a priest, formerly appointed by the kings, but at present by Caesar, presides over the Museum.",
        "source": "Strabo, Geography, Book XVII, Chapter I, section 8, translated by H. C. Hamilton and W. Falconer (London: Henry G. Bohn, 1854-57).",
        "href": "https://www.gutenberg.org/files/44886/44886-h/44886-h.htm",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a0.png",
          "alt": "A 19th-century engraving imagining the interior of the Great Library of Alexandria, scholars among scrolls beneath a vaulted hall.",
          "credit": "The Great Library of Alexandria, 19th-century engraving after O. Von Corven; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "Aso Tavitian's gift follows one of the founding gestures of the modern public museum: the 1753 bequest of Sir Hans Sloane, whose private cabinet became the British Museum. Sloane, like Tavitian, had spent a lifetime and a fortune amassing his collection and asked in his will that it be kept and preserved together 'Whole and Intire' rather than broken up and sold at auction. Parliament agreed to maintain it, in the exact words of the Act, for the general use and benefit of the public, which is precisely the logic by which a tech executive's old masters now pass, with a purpose-built Selldorf wing and a $45 million endowment, from a private house into the permanent care of the Clark. Both stories turn on the same conviction: that a great collection is a public trust in waiting, and that the collector's final act is to hand it, undivided, to posterity. The 331 works entering Williamstown are the descendants of Sloane's insistence that a museum be a single, unbroken whole.",
        "excerpt": "...to the End that the said Museum or Collection may be preserved and maintained, not only for the Inspection and Entertainment of the Learned and the Curious, but for the General Use and Benefit of the Publick...",
        "source": "The British Museum Act 1753 (26 Geo. II, c. 22), 'An Act for the Purchase of the Museum, or Collection of Sir Hans Sloane, and of the Harleian Collection of Manuscripts.'",
        "href": "https://statutes.org.uk/site/the-statutes/eighteenth-century/1753-26-george-2-c-22-establishing-the-british-museum/",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a1.png",
          "alt": "Portrait of Sir Hans Sloane, the physician and collector whose 1753 bequest founded the British Museum.",
          "credit": "Portrait of Sir Hans Sloane; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Every monument built to outlast time invites Shelley's irony, and the Tavitian Wing, some 15,000 square feet of Calacatta Malva marble raised to house one man's masterpieces and carry his name well beyond 2028, is a monument in exactly Ozymandias's sense. Shelley's shattered colossus, its pedestal still boasting 'Look on my Works ye Mighty, and despair!', is a meditation on the vanity of legacies carved in stone. Yet the sonnet cuts two ways for a collector like Tavitian: the sculptor's skill outlives the tyrant, the hand that mocked survives the king, so that art endures where mere power does not. A wing of marble named for a patron is a wager that the works inside, the van Eycks and Rubenses, will keep his memory alive far longer than any inscription. The Clark's gamble is that its museum, unlike Ozymandias's desert, will still be tended, and the collection never left to the lone and level sands.",
        "excerpt": "I met a traveller from an antique land,\nWho said -- \"two vast and trunkless legs of stone\nStand in the desert ... near them, on the sand,\nHalf sunk a shattered visage lies, whose frown,\nAnd wrinkled lips, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed;\nAnd on the pedestal these words appear:\nMy name is Ozymandias, King of Kings,\nLook on my Works ye Mighty, and despair!\nNothing beside remains. Round the decay\nOf that colossal Wreck, boundless and bare\nThe lone and level sands stretch far away.\" --",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), text via Representative Poetry Online, University of Toronto Libraries.",
        "href": "https://rpo.library.utoronto.ca/content/ozymandias-0",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a2.png",
          "alt": "The colossal granite bust of Ramesses II, the 'Younger Memnon', in the British Museum, the sculpture associated with Shelley's Ozymandias.",
          "credit": "Colossal bust of Ramesses II ('the Younger Memnon'), c. 1250 BC, British Museum; via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Two millennia before the Clark clad its new wing in Calacatta Malva marble, Horace claimed to have built a monument more lasting than bronze and higher than the royal pile of the pyramids, one that neither gnawing rain nor the flight of time could destroy. His boast is the presiding spirit of every patron who builds for permanence, and it frames the paradox of the Tavitian Wing precisely: stone and marble promise endurance, yet Horace located true permanence not in masonry but in the work itself, 'Non omnis moriar,' not all of me shall die. Tavitian's $45 million and Selldorf's marble are the bronze and the pyramids; the 331 paintings and sculptures are the poem. The bequest is a bet that a collector, like a poet, secures his afterlife by the quality of what he leaves rather than the grandeur of the vessel that holds it. The Pyramid of Cestius, a private citizen's marble monument still standing in Rome from Horace's own age, shows how the two forms of memory, the building and the thing it enshrines, have always been braided together.",
        "excerpt": "Exegi monumentum aere perennius\nregalique situ pyramidum altius,\nquod non imber edax, non Aquilo inpotens\npossit diruere aut innumerabilis\nannorum series et fuga temporum.\nNon omnis moriar multaque pars mei\nvitabit Libitinam...",
        "source": "Horace, Odes (Carmina) III.30, lines 1-7; Latin text via The Latin Library. English rendering of the opening (John Conington, 1872): 'And now 'tis done: more durable than brass / My monument shall be...'",
        "href": "https://www.thelatinlibrary.com/horace/carm3.shtml",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a3.png",
          "alt": "The marble-clad Pyramid of Caius Cestius in Rome, a Roman citizen's monumental tomb from around 12 BC.",
          "credit": "Pyramid of Caius Cestius, Rome (c. 18-12 BC); via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "David Teniers's canvas is the seventeenth century's answer to a museum announcement: a picture whose entire subject is a private collection gathered, hung, and put on display. Archduke Leopold Wilhelm stands amid his Italian masterpieces while the painter, hat in hand, records them for posterity, a scene that anticipates exactly what the Clark is doing with the Tavitian bequest, transferring a connoisseur's carefully assembled walls into a public and permanent frame. Where the archduke commissioned Teniers to catalogue and immortalise his holdings, the Clark has commissioned Annabelle Selldorf to build the Calacatta Malva rooms that will do the same for Tavitian's 331 works. Both are acts of gathering and fixing in place, turning the restless activity of collecting into something that can be beheld whole. And in both, the collection outlives the collector: most of the archduke's paintings survive in Vienna's Kunsthistorisches Museum, just as Tavitian's van Eyck and Rubens will survive in Williamstown.",
        "excerpt": "In this gallery picture the painter shows Archduke Leopold Wilhelm standing among the densely hung masterpieces of his Italian collection, while Teniers himself, hat in hand, attends his patron. Roughly fifty identifiable paintings, Titians, Giorgiones, Veroneses, crowd the walls from floor to cornice, a whole princely collection compressed into a single canvas. Teniers painted such views to document and immortalise the archduke's holdings, most of which passed into what is now the Kunsthistorisches Museum in Vienna.",
        "source": "David Teniers the Younger, 'Archduke Leopold Wilhelm in his Gallery in Brussels', oil on canvas, c. 1651, Kunsthistorisches Museum, Vienna.",
        "href": "https://en.wikipedia.org/wiki/Gallery_of_Archduke_Leopold_Wilhelm_in_Brussels_(Vienna)",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a4.png",
          "alt": "David Teniers the Younger's painting of Archduke Leopold Wilhelm in his Brussels gallery, its walls crowded with framed Italian paintings.",
          "credit": "David Teniers the Younger, Kunsthistorisches Museum, Vienna (Google Art Project); via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Bernini is one of the names carried in the Tavitian bequest, and his bust of Costanza Bonarelli distills what the Clark's new marble wing is finally about: the power of stone to hold a living presence against time. Carved from a single block, the bust makes cold marble seem to breathe, an argument in itself for why a collector would spend a fortune to preserve such things and why a museum would raise 15,000 square feet of Calacatta Malva to shelter them. There is a rhyme, too, between Bernini's medium and Selldorf's: the same material a Baroque genius coaxed into flesh now sheathes the rooms built to guard his work. A bequest of 331 old masters is a bid for permanence, and Bernini's marble is the proof of concept, for nearly four centuries on Costanza still turns her head. The Tavitian Wing is a wager that his sculpture, and the paintings gathered around it, will go on doing so under the Clark's care.",
        "excerpt": "Carved from a single block of white marble around 1637, Bernini's bust of Costanza Bonarelli catches a living woman in a moment of movement, lips parted, hair loosening, her chemise unfastened at the throat. It is among the first Baroque portraits made not on commission but out of the sculptor's own feeling, and it demonstrates his uncanny power to make cold stone appear to breathe. The bust survives today in the Museo Nazionale del Bargello in Florence.",
        "source": "Gian Lorenzo Bernini, 'Bust of Costanza Bonarelli', marble, c. 1636-38, Museo Nazionale del Bargello, Florence.",
        "href": "https://en.wikipedia.org/wiki/Bust_of_Costanza_Bonarelli",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a5.png",
          "alt": "Gian Lorenzo Bernini's marble bust of Costanza Bonarelli, her head turned, lips parted, hair loosening.",
          "credit": "Gian Lorenzo Bernini, Bust of Costanza Bonarelli, Museo Nazionale del Bargello, Florence; via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "jason-limon-trompe-loeil",
    "headline": "Colossal features Jason Limon's trompe-l'oeil paintings that reveal a hidden skeletal world",
    "overview": "The art magazine Colossal spotlighted a new body of trompe-l'oeil paintings by the San Antonio artist Jason Limon, whose canvases appear to peel back like torn paper or plastic wrap to expose skeletal figures and cryptid creatures beneath. Working in acrylic with a muted, vintage palette, Limon plays optical tricks that balance the macabre and the whimsical, inviting viewers to read their own stories into the bones. The images extend a long tradition of art that hides death just below the surface of the everyday.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/trompe-loeil-paintings-jason-limon/"
      },
      {
        "name": "Beinart Gallery",
        "href": "https://beinart.org/collections/jason-limon"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/jason-limon-trompe-loeil.png",
      "alt": "A vanitas still life with a human skull, echoing mortality beneath the everyday.",
      "credit": "Jason Limon via Colossal"
    },
    "rank": 39,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly two thousand years before Jason Limon tricked the eye with paint that seems to tear away, Pliny the Elder recorded the founding legend of trompe-l'oeil: the contest between Zeuxis and Parrhasius. Zeuxis painted grapes so convincing that birds flew down to peck at them, only to be humbled when he reached to pull back Parrhasius's painted curtain and discovered that the curtain itself was paint. The anecdote fixed illusionism as painting's oldest game, the surface that pretends to be something it is not. Limon revives that ancient sleight of hand, but where the Greeks concealed a picture behind the painted veil, he lets the peeled surface disclose a skull. His torn paper and lifted skin are Parrhasius's curtain restaged for a memento-mori age, deceiving the eye only to reveal the mortality waiting underneath.",
        "excerpt": "This last, it is said, entered into a pictorial contest with Zeuxis, who represented some grapes, painted so naturally that the birds flew towards the spot where the picture was exhibited. Parrhasius, on the other hand, exhibited a curtain, drawn with such singular truthfulness, that Zeuxis, elated with the judgment which had been passed upon his work by the birds, haughtily demanded that the curtain should be drawn aside to let the picture be seen. Upon finding his mistake, with a great degree of ingenuous candour he admitted that he had been surpassed, for that whereas he himself had only deceived the birds, Parrhasius had deceived him, an artist.",
        "source": "Pliny the Elder, Natural History, Book XXXV, chapter 36 (10), trans. John Bostock and H. T. Riley (London: Taylor and Francis, 1855), via the Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D35%3Achapter%3D36",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a0.png",
          "alt": "Engraving of the ancient Greek painter Zeuxis at his easel, surrounded by figures, illustrating the classical painter whose illusionistic grapes deceived the birds.",
          "credit": "Engraving depicting the painter Zeuxis. Wellcome Collection, London (CC BY 4.0), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Beneath the church of Santa Maria della Concezione in Rome lies a set of chapels whose walls, arches and chandeliers are built entirely from the bones of some four thousand Capuchin friars, arranged into rosettes and canopies during the seventeenth and eighteenth centuries. A placard among the remains addresses every visitor with the words that you are looking at what you will become. The crypt turns death into decoration, macabre yet oddly playful ornament hidden just below the floor of an ordinary-looking church. That is precisely the register of Jason Limon's paintings, where a muted, vintage surface peels back to expose the skeletal world beneath the everyday. Both the friars and the painter insist that the bone is always there under the skin, and both make the reminder strangely charming rather than merely grim.",
        "excerpt": "Beneath Santa Maria della Concezione, five small chapels are decorated entirely with the disinterred bones of some four thousand Capuchin friars, formed into arches, rosettes and chandeliers. A multilingual placard set among the remains delivers the crypt's memento mori to visitors: 'What you are now, we once were; what we are now, you shall be.'",
        "source": "Ossuary and memento mori inscription, Capuchin Crypt, Santa Maria della Concezione dei Cappuccini, Rome (bones arranged in the 17th-18th centuries); documented in 'Capuchin Crypt', Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Capuchin_Crypt",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a1.png",
          "alt": "A chapel in the Capuchin Crypt in Rome whose walls and ceiling are decorated with patterns made from the bones and skulls of friars.",
          "credit": "The Capuchin Crypt, Rome. Photograph by Edmund F. Arras; Columbus Metropolitan Library via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In the graveyard scene of Hamlet, the prince takes up the unearthed skull of Yorick, the court jester who once carried him on his back, and turns a clownish memory into a meditation on decay. 'Alas, poor Yorick,' he says, dwelling on the lips he had kissed and the jests now silenced, before mocking the fine lady who paints an inch thick yet must come at last to this same grinning skull. Shakespeare fuses laughter and rot exactly as Limon does, so that the jester's whimsy and the death's-head are one and the same object. Yorick's skull is the face beneath the face, the truth that cosmetics and appearances conceal. Limon's peeled surfaces perform the same unmasking, letting a cheerful vintage veneer slip to reveal the grin of the skeleton it had been hiding.",
        "excerpt": "Alas, poor Yorick. I knew him, Horatio, a fellow of infinite jest, of most excellent fancy. He hath borne me on his back a thousand times; and now, how abhorred in my imagination it is! My gorge rises at it. Here hung those lips that I have kiss'd I know not how oft. Where be your gibes now? your gambols? your songs? your flashes of merriment, that were wont to set the table on a roar? Not one now, to mock your own grinning? Quite chop-fallen? Now get you to my lady's chamber, and tell her, let her paint an inch thick, to this favour she must come. Make her laugh at that.",
        "source": "William Shakespeare, The Tragedy of Hamlet, Prince of Denmark, Act V, Scene 1; Project Gutenberg eBook #1524.",
        "href": "https://www.gutenberg.org/cache/epub/1524/pg1524.txt",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a2.png",
          "alt": "Painting of Hamlet and Horatio in a graveyard, with a gravedigger handing Hamlet a skull.",
          "credit": "Eugene Delacroix, Hamlet and Horatio in the Graveyard (1839), Musee du Louvre. Public domain via Wikimedia Commons / Web Gallery of Art."
        }
      },
      {
        "category": "literary",
        "title": "The Hebrew Preacher of Ecclesiastes gave the vanitas tradition its motto and its mood, declaring that all is vanity and that in the end the dust returns to the earth as it was. Everything gleaming and pleasurable on life's surface is, he warns, a passing breath laid over an unstable foundation of mortality. Dutch painters would later build entire still lifes around this text, tucking a skull among the fruit and glassware, and Jason Limon extends the lineage into our own moment. His torn-open surfaces are a visual gloss on the Preacher's insight, that beneath the ornamental everyday lie dust and bone. What reads as macabre whimsy is in truth the oldest sermon, that all appearances are provisional and that death is the ground lying just beneath them.",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. ... Then shall the dust return to the earth as it was: and the spirit shall return unto God who gave it.",
        "source": "Ecclesiastes 1:2 and 12:7, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a3.png",
          "alt": "A Dutch vanitas still life showing a human skull lying beside an overturned glass, a quill pen and a book on a table.",
          "credit": "Pieter Claesz, Still Life with a Skull and a Writing Quill (1628), The Metropolitan Museum of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Hans Holbein's double portrait The Ambassadors (1533) is trompe-l'oeil's most famous trap. Two worldly, richly dressed diplomats stand amid instruments of learning and pleasure, yet a strange grey smear stretches across the foreground; only when the viewer moves to the painting's edge does the distortion resolve into a perfectly rendered human skull. Holbein hid a memento mori in plain sight, legible only through a shift of viewpoint, death smuggled into a picture of status and life. Jason Limon works the same optical mechanism in reverse, making the ordinary surface split open to reveal the skeleton that Holbein disguised as a blur. Both artists prove that the skull is already present within the image of the living, and that it only waits for the right angle, or the right tear, to emerge.",
        "excerpt": "A life-size double portrait of two Renaissance diplomats surrounded by globes, instruments and symbols of worldly achievement. Across the foreground floats an anamorphic distortion that resolves, when seen from the side, into a human skull, a hidden memento mori concealed within an image of power and life.",
        "source": "Hans Holbein the Younger, The Ambassadors (Jean de Dinteville and Georges de Selve), 1533, oil on oak, The National Gallery, London (NG1314).",
        "href": "https://www.nationalgallery.org.uk/paintings/hans-holbein-the-younger-the-ambassadors",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a4.png",
          "alt": "Holbein's The Ambassadors: two men flanking a table of instruments, with an elongated anamorphic skull stretched diagonally across the floor in front of them.",
          "credit": "Hans Holbein the Younger, The Ambassadors (1533), The National Gallery, London. Public domain via Wikimedia Commons / Google Arts & Culture."
        }
      },
      {
        "category": "artistic",
        "title": "Harmen Steenwyck's Still Life: An Allegory of the Vanities of Human Life (c.1640) gathers a Japanese sword, a shell, books, a chronometer and a smoking lamp around a single blunt fact, a human skull. Painted in the muted browns and greys of the Dutch vanitas, its beautifully described worldly things are all quietly subordinate to the mortality set at their center. This is the tradition Jason Limon inherits and updates, with its still vintage palette, its ordinary objects, and its skull that supplies the real subject. Where Steenwyck sets the skull openly among the treasures, Limon buries it and then tears the surface to let it surface again, yet the message is identical. Beauty and the everyday are a thin skin stretched over the bone, and good painting is what makes us feel the death hidden just below.",
        "excerpt": "A Dutch vanitas still life in which a human skull rests among books, a shell, a Japanese sword, a chronometer and an extinguished lamp. Rendered in subdued browns and greys, the worldly objects are arranged to declare the transience of knowledge, pleasure and life itself.",
        "source": "Harmen Steenwyck, Still Life: An Allegory of the Vanities of Human Life, c. 1640, oil on oak, The National Gallery, London (NG1256).",
        "href": "https://www.nationalgallery.org.uk/paintings/harmen-steenwyck-still-life-an-allegory-of-the-vanities-of-human-life",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a5.png",
          "alt": "A vanitas still life with a human skull lying among books, a shell, a sword hilt, a jug and an extinguished oil lamp on a table.",
          "credit": "Harmen Steenwyck, Still Life: An Allegory of the Vanities of Human Life (c.1640), The National Gallery, London. Public domain via Wikimedia Commons / Web Gallery of Art."
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
