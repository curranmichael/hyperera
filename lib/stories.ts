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
    "lead": true,
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
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
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
    "lead": true,
    "rank": 14,
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
    ]
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
    "rank": 15,
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
    ]
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
    "rank": 16,
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
    ]
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
    "rank": 17,
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
    ]
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
    "rank": 18,
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
    ]
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
    "rank": 19,
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
    ]
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
    "rank": 20,
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
    ]
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
    "rank": 21,
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
    ]
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
    "rank": 22,
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
    ]
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
    "rank": 23,
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
    ]
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
    "rank": 24,
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
    ]
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
    "rank": 25,
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
    ]
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
    "rank": 26,
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
    ]
  },
  {
    "slug": "venezuela-earthquakes-235-dead",
    "headline": "Two earthquakes kill at least 235 and injure 4,300 in Venezuela as rescuers search the rubble",
    "overview": "Venezuela's health minister said two powerful earthquakes — a so-called doublet that struck within hours of each other — left around 235 people dead and roughly 4,300 injured along the coast and on the outskirts of Caracas. Rescuers dug through collapsed concrete apartment blocks for survivors as the government appealed for international aid.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxPQUFpX1BxeVRVN1RBaEZmRkVuSXFsclJJQjN2YWlMdnRhaXJnV2ZUNUJkVFJMSEZnSG5ieXl2TUEzQ2FHT0lQNlF5UXlNYUQ4MTVGUEhtMnZHQXVlTEpiWWdEek1DbWpiU29HMm1Rc3Q0Wm1kMmRRNFQ5VEEzMEdYcjFCNlZKVVRHLS1IM2R2b3lHNDkxNnNhRlRnS3R2UTdrbURkNw?oc=5"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cjegdqw5d3yo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/venezuela-earthquakes-235-dead.png",
      "alt": "1755 copper engraving of Lisbon in ruins and flames during the Great Earthquake, with tsunami waves wrecking ships in the harbour and panicked figures fleeing in the foreground",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "lead": true,
    "rank": 27,
    "analogies": [
      {
        "category": "historical",
        "title": "The 1812 Caracas earthquake",
        "excerpt": "On Maundy Thursday, 26 March 1812, a doublet of shocks rupturing the Boconó and San Sebastián faults struck Caracas and La Guaira, killing an estimated 15,000–20,000 people. Royalist clergy called it divine punishment for the independence rebellion, prompting Simón Bolívar's defiant vow that if Nature itself opposed them, they would fight Nature and make it obey. Two centuries later the same coast and capital again face a deadly earthquake doublet.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1812_Caracas_earthquake"
      },
      {
        "category": "historical",
        "title": "The 1755 Lisbon earthquake",
        "excerpt": "Striking on All Saints' Day, 1 November 1755, the Great Lisbon Earthquake and its tsunami and fires killed tens of thousands and razed roughly 85 percent of the city. The catastrophe shook Enlightenment Europe to its philosophical foundations, inspiring Voltaire, Rousseau and Kant to wrestle with the problem of suffering, and gave rise to modern seismology and earthquake-resistant rebuilding.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1755_Lisbon_earthquake"
      },
      {
        "category": "literary",
        "title": "Voltaire, Candide (Chapter V — the Lisbon earthquake)",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "The Book of Lamentations (King James Version)",
        "excerpt": "How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary! She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "John Martin, The Destruction of Pompeii and Herculaneum (1822)",
        "excerpt": "John Martin's vast 1822 canvas imagines the ground heaving and Vesuvius hurling whirlwinds of fire over a doomed city, its temples and amphitheatre lit by an apocalyptic red glare. Tiny human figures scatter in terror through the foreground, dwarfed by the collapsing architecture and a sea lashed into chaos. The painting captures the same primal dread of a city undone in moments by the earth itself.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Destruction_of_Pompeii_and_Herculaneum.jpg",
        "image": {
          "src": "/covers/venezuela-earthquakes-235-dead--art.png",
          "alt": "John Martin's 1822 painting of Pompeii and Herculaneum destroyed, with Vesuvius erupting fire over collapsing temples while tiny figures flee a storm-tossed shore",
          "credit": "John Martin (1789–1854), Tate, London — via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Chopin, Marche funèbre from Piano Sonata No. 2 in B-flat minor, Op. 35",
        "excerpt": "Chopin's solemn Marche funèbre, the third movement of his 1839 Second Piano Sonata, has become the world's archetypal music of mourning, its heavy tolling chords evoking a slow procession through grief. A tender middle section opens like a brief consolation before the relentless death-tread returns. Its weight of lament mirrors the sorrow of communities digging through rubble for their dead.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      }
    ]
  },
  {
    "slug": "trump-seeks-billions-iran-war-funding",
    "headline": "Trump asks Congress for billions in Iran war funding as Senate Republicans reject a war powers resolution",
    "overview": "President Trump asked Congress for billions of dollars to fund continued U.S. military operations against Iran, hours after Senate Republicans rejected a war powers resolution that would have limited his authority to wage the conflict. The request deepened tensions between the White House and lawmakers wary of an open-ended war.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c1eydwldzdjo"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxPOGVVZHRmWUdtV2cxbTI0WFpHdVRZSl9RMDV6Z1pEZmZicFlPUG5lTTVrbE9xNHN4VTdmU3Zwd0JHTHU1SExxQ2lRajNrWElUVXB4SzlqREdXZkVsUTJXbm1kUzFnRXQ5LWluSzNGNXRWUkpMa3VuNTRRam5vYjZodWRmZl9lTGs1Y0VoWmtiN2hlU1Z5eHdyUkpma0laLXZtb053bmx4VEs3SXM?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/trump-seeks-billions-iran-war-funding.png",
      "alt": "Peter Paul Rubens's allegorical painting The Consequences of War (1637-1638), in which Mars the god of war is drawn toward destruction as Europe laments amid the wreckage",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 28,
    "analogies": [
      {
        "category": "historical",
        "title": "Charles I and Ship Money",
        "excerpt": "The attempt of King Charles I from 1634 onwards to levy ship money during peacetime and extend it to the inland counties of England without parliamentary approval provoked fierce resistance.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Ship_money"
      },
      {
        "category": "historical",
        "title": "The War Powers Resolution of 1973",
        "excerpt": "The War Powers Resolution requires the president to notify Congress within 48 hours of committing armed forces to military action and forbids armed forces from remaining for more than 60 days, with a further 30-day withdrawal period, without congressional authorization for use of military force (AUMF) or a declaration of war by the United States.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/War_Powers_Resolution"
      },
      {
        "category": "literary",
        "title": "The Council of the Achaeans — Homer's Iliad, Book I",
        "excerpt": "Son of Atreus, now I think we shall return home, beaten back again, should we even escape death, if war and pestilence alike are to ravage the Achaeans.",
        "source": "Homer, Iliad (Murray translation), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=1:card=53"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Henry V — the king seeks just cause for war",
        "excerpt": "May I with right and conscience make this claim?",
        "source": "William Shakespeare, King Henry V (Act 1, Scene 2), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/1784/pg1784.html"
      },
      {
        "category": "artistic",
        "title": "Cesare Maccari, Cicero Denounces Catiline in the Roman Senate (1889)",
        "excerpt": "Maccari's celebrated fresco places the viewer inside the Roman Senate as Cicero rises to denounce the conspirator Catiline, who sits alone and shunned at the right. The packed tiers of senators embody an assembly weighing the security of the Republic against the ambitions of a single dangerous man. Painted for the Italian Senate's own Palazzo Madama, it has become the enduring popular image of a legislature confronting the question of war and the state's survival.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Cicero_Denounces_Catiline_in_the_Roman_Senate_by_Cesare_Maccari.png",
        "image": {
          "src": "/covers/trump-seeks-billions-iran-war-funding--art.png",
          "alt": "Cicero stands addressing the assembled senators of Rome while Catiline sits isolated and condemned on the far right",
          "credit": "Cesare Maccari (1840-1919), 1889, via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven, Wellington's Victory (Wellingtons Sieg), Op. 91",
        "excerpt": "Beethoven's 'Battle Symphony' stages an actual war in sound, opening with the rival drums and trumpets of the British and French armies before erupting into cannon-fire, musket volleys, and a clash of national anthems. Composed to mark Wellington's 1813 victory at Vitoria, it concludes with a triumphant victory symphony built on 'God Save the King.' The full scores and parts are freely available in the public domain on IMSLP.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      }
    ]
  },
  {
    "slug": "scotus-revives-asylum-restrictions",
    "headline": "US Supreme Court lets Trump administration revive restrictions barring asylum seekers at the southern border",
    "overview": "The U.S. Supreme Court cleared the way for the Trump administration to reinstate a restrictive policy that bars migrants from applying for asylum while at the U.S.-Mexico border. The justices lifted lower-court orders, ruling that migrants standing on the Mexican side of the border are not entitled to seek asylum.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOdWxXMy1BZ3d6OTdfeHNlWHhMLTl2azFpZVBkNG5OQXJZdklWSDN6SndmYUZhZE9SeGZ2M3VWOXZHUUFxZTJKY05xbm9UWFNsc0p0Y1h1UnpuYjB3VDlfWVFfWkJlcjlfcXhGY2JhMlJGc05rSFVLN1RpT3ppR2FrbmJsaFMzUDB0TWNJZmhURlZxTzloUlE?oc=5"
      },
      {
        "name": "SCOTUSblog",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOZ0pHajQ1VkU0TWNlVzByejJGX0E2QzFrdHBsRVYzSzlKd2ZYbHI5b0J1bEY2YjQzN3FDcTFJelJKdG1oNkJHZTVSTDFydkxzQXhsdDF1OFRtM3FXUmYtWnRaSGl1VTlJYXhwTjYwc01aX3Zra3NqVnNuSU1SOXFxRklyVVUxUFl0QkR1TFlfSzJtMEtjZllVWWJsRjlFamlSd3l0ZF9CZVV6SGJObGhTVmxLOA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/scotus-revives-asylum-restrictions.png",
      "alt": "Jewish refugees boarding the German liner MS St. Louis in Hamburg in 1939, fleeing Nazi persecution; the ship was later turned away from Cuba, the United States, and Canada.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 29,
    "analogies": [
      {
        "category": "historical",
        "title": "The Voyage of the MS St. Louis (1939)",
        "excerpt": "In May 1939 the German liner St. Louis sailed from Hamburg carrying 937 passengers, most of them Jews fleeing Nazi persecution. Denied landing in Cuba, the ship lingered off the Florida coast in sight of Miami while the United States refused to admit the refugees; Canada too closed its doors. Forced back to Europe, hundreds of those turned away later perished in the Holocaust.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/MS_St._Louis"
      },
      {
        "category": "historical",
        "title": "The Chinese Exclusion Act (1882)",
        "excerpt": "Signed by President Chester A. Arthur on May 6, 1882, the Chinese Exclusion Act prohibited the immigration of Chinese laborers for ten years and barred Chinese already in the country from naturalizing. It was the first major U.S. law to bar an entire national group from the nation's gates, enshrining in statute the closing of the border to a class of strangers deemed unwelcome.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Chinese_Exclusion_Act"
      },
      {
        "category": "literary",
        "title": "The Aeneid, Book I — the Trojan exiles plead for shelter",
        "excerpt": "We wretched Trojans, toss'd on ev'ry shore,\nFrom sea to sea, thy clemency implore.\nForbid the fires our shipping to deface!",
        "source": "Virgil, The Aeneid (trans. John Dryden), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "The New Colossus by Emma Lazarus (1883)",
        "excerpt": "\"Give me your tired, your poor, / Your huddled masses yearning to breathe free, / The wretched refuse of your teeming shore.\"",
        "source": "Emma Lazarus, \"The New Colossus,\" Wikisource",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus"
      },
      {
        "category": "artistic",
        "title": "The Last of England by Ford Madox Brown (1852–1855)",
        "excerpt": "Ford Madox Brown's tightly framed tondo shows a young emigrant couple huddled at a ship's rail, the white cliffs of England receding behind them in cold sea spray. The wife's gloved hand clasps her husband's, and beneath her shawl a tiny infant's hand is just visible, as the pair set their faces grimly against an uncertain future abroad. Painted as Britain's own poor sailed away in search of refuge, it renders with unsentimental intimacy the human cost of leaving one shore in hope of another.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/scotus-revives-asylum-restrictions--art.png",
          "alt": "A young emigrant couple wrapped in shawls at a ship's rail, the wife clutching a hidden infant's hand, as the English coast fades behind them.",
          "credit": "Ford Madox Brown (1821–1893), Birmingham Museum and Art Gallery, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "\"Va, pensiero\" (Chorus of the Hebrew Slaves) from Verdi's Nabucco",
        "excerpt": "Giuseppe Verdi's 1842 chorus gives voice to the Hebrew captives exiled by the rivers of Babylon, longing for a homeland they can no longer reach. Sung in a sweeping unison line, \"Va, pensiero, sull'ali dorate\" bids their thoughts fly on golden wings back to the hills and shores of their lost country. The IMSLP page offers the public-domain Ricordi score of the opera and this celebrated anthem of the displaced and the dispossessed.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ]
  },
  {
    "slug": "iran-iaea-inspectors-access",
    "headline": "Iran agrees to grant UN nuclear inspectors access to its sites under new deal, IAEA chief says",
    "overview": "A new agreement grants International Atomic Energy Agency inspectors access to Iran's nuclear sites, the agency's director general said, restoring monitoring that had been suspended during the recent conflict between Iran and Israel. The deal aims to rebuild verification of Iran's contested nuclear program.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQbklORW1hNXYwX1pxRFpuTlVTZ0xTZUJOVXdXcUdScUpoQm1fUGx3NUVMZGh4S0hYelhlTEdUd1dDTzUydU9xWW5kWDZxMnd2U3prZklQSXZjRk1aQ2J2OEt5Wkl4Tm1kaktRRDhxdGJlZjJuWF9VNC1jUkhpT2tqajdWbXNYVUhqVTJZZGdCSnNBV0YwOTRCWVhrWnFHdDdkTm9aTkVTOFhfb1BDM0RBZlFn?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://news.google.com/rss/articles/CBMiekFVX3lxTE5KZDZGTkRhbXpuRzBCdkh2T1FDdXl3SzIxWGNwUWhKMVVxcU1RbVlTOXo1ODNxWmxmN0FfdGRqQ3lucFNMRnJ3QmNQTVN1eVFnX1BvWnZMMUlJRE1YY2tLM0o3S1JiY3BzQ3lnZklNai0xVGhReG9sdVFB0gF_QVVfeXFMTkFOT09wUTlLU3Q3eVlPOW1oc1VBNnNBVjFEaVIyd3c5LUFheWZaRGoyLTBPQTFwMkpQNG1xZEdPRElOMFdxMmk5eURJdFFzNXBIdy1iZjVQQUZPQy10YUp1bEFuVUVrYzRlS1dFRmhUZXpXakNXU3czMTU2Qzg2MA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/iran-iaea-inspectors-access.png",
      "alt": "Rembrandt's 1642 painting The Night Watch, depicting a militia company mustering under arms, vigilant in the gloom as their captain steps forward.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 30,
    "analogies": [
      {
        "category": "historical",
        "title": "UNSCOM and the inspectors at Iraq's gate (1991-1999)",
        "excerpt": "After the Gulf War, the UN Special Commission was granted unrestricted freedom of movement and the right to unimpeded access to any site in Iraq to verify the dismantling of its weapons programs. Inspectors uncovered concealed stocks, including thousands of litres of botulism toxin and anthrax, even as Baghdad obstructed and disputed their findings. The episode became the modern template for intrusive, on-the-ground arms-control verification.",
        "source": "Wikipedia: United Nations Special Commission",
        "href": "https://en.wikipedia.org/wiki/United_Nations_Special_Commission"
      },
      {
        "category": "historical",
        "title": "INF Treaty on-site inspections (1987)",
        "excerpt": "The 1987 Intermediate-Range Nuclear Forces Treaty required existing missiles to be destroyed and, for the first time between the superpowers, established a protocol for mutual on-site inspection. Soviet inspectors entered weapons storage areas in Britain while American inspectors watched cruise missiles dismantled, a verification regime that ran until 2001. It enshrined the principle that an adversary's word must be checked at the gate.",
        "source": "Wikipedia: Intermediate-Range Nuclear Forces Treaty",
        "href": "https://en.wikipedia.org/wiki/Intermediate-Range_Nuclear_Forces_Treaty"
      },
      {
        "category": "literary",
        "title": "The exhaustive search in Poe's 'The Purloined Letter'",
        "excerpt": "The cushions we probed with the fine long needles you have seen me employ.",
        "source": "Edgar Allan Poe, 'The Purloined Letter' (The Works of Edgar Allan Poe, Vol. 2)",
        "href": "https://www.gutenberg.org/files/2148/2148-h/2148-h.htm"
      },
      {
        "category": "literary",
        "title": "Juvenal: who will guard the guards?",
        "excerpt": "\"Put on a lock and keep your wife indoors.\" Yes, and who will ward the warders?",
        "source": "Juvenal, Satire VI (trans. G. G. Ramsay), Wikisource",
        "href": "https://en.wikisource.org/wiki/Juvenal_and_Persius/The_Satires_of_Juvenal/Satire_6"
      },
      {
        "category": "artistic",
        "title": "Caravaggio, 'The Incredulity of Saint Thomas' (c. 1601-1602)",
        "excerpt": "Caravaggio paints the literal embodiment of trust-but-verify: the doubting apostle Thomas, refusing to take the resurrection on faith, drives his finger into the wound in Christ's side while Jesus guides his hand. Three furrowed, scrutinizing faces lean in under harsh light, intent on direct physical proof. It is verification made flesh, the inspector compelled to see and touch before he will believe.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Incredulity_of_Saint_Thomas-Caravaggio_(1601-2).jpg",
        "image": {
          "src": "/covers/iran-iaea-inspectors-access--art.png",
          "alt": "Caravaggio's painting of Saint Thomas inserting his finger into the wound in the side of the risen Christ, as two other apostles peer closely.",
          "credit": "Caravaggio (1571-1610), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Bach, 'Wachet auf, ruft uns die Stimme' (Sleepers, Awake!), BWV 140",
        "excerpt": "Bach's 1731 chorale cantata opens with the watchmen's cry ringing from the towers, summoning the sleeping city to vigilance and readiness. Built on Nicolai's hymn and the parable of the wise and foolish virgins, it dramatizes the reward of those who keep watch and stay prepared. Its theme is the night-watchman's vigil, the call to remain alert and open-eyed against what may come.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Wachet_auf,_ruft_uns_die_Stimme,_BWV_140_(Bach,_Johann_Sebastian)"
      }
    ]
  },
  {
    "slug": "ukraine-drone-attack-russian-chemical-plant",
    "headline": "Ukraine launches one of its largest drone attacks on Russia, striking a chemical plant and Crimea",
    "overview": "Russia reported one of the largest Ukrainian drone assaults of the war, with Ukraine striking a Russian chemical plant again and hitting targets across Russian territory and annexed Crimea in a heavy overnight barrage. Russian officials said air defenses intercepted dozens of incoming drones.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxPWUxKWVVURzlOOExucEtWZmFIbmZKNm44RUNyaE44R1NHVElJbkJUS2t5OGRtSTNORUd0YWNud3E0TDhCMXJxVFZ5cnA3S2k2UWtGT3VfWnB0SW1LZUZ4cEkzOXo2OE15X0hZNEhvekE1U0E0NThmWndtRU9sOV9lQWJ2SVhlZXRwQUllY0xlY2xpaUxRVlFGYnhzazdkZ1JJ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNZ2JtQkJhN0ExTUJVa0JudnJObjRlZm1id1gxQWlLWi1nbHJQblNmRlctSmJkc29QVkJDM1NDV0lEOEFnaDdJS0w1emdqV0k1TFdSczRza2hlbHRpbzRSbHd1aW9PWnBzRmlFTjl6T2xOcHoyNnEzaElmWWdwbXJldG5LTW0wbDZiT0tGWGNON0ZqSHJjN1NhUFRLREJIem9nVTJaU2tUZEVJb3N2d1BrRXcwRUpyMTFLR0JuTUtJTHo5UQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/ukraine-drone-attack-russian-chemical-plant.png",
      "alt": "John Martin's apocalyptic painting 'The Great Day of His Wrath', showing a city consumed and torn apart by fire and cataclysm under a burning sky.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 31,
    "analogies": [
      {
        "category": "historical",
        "title": "The Doolittle Raid carries the war to Japan, 1942",
        "excerpt": "Launched on April 18, 1942, it was the first American air operation to strike the Japanese archipelago. The daring long-range raid, flown off an aircraft carrier far from home, demonstrated that an enemy's homeland was no longer safe from attack and delivered a profound psychological blow deep behind the lines.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Doolittle_Raid"
      },
      {
        "category": "historical",
        "title": "Zeppelin night raids on Britain, 1915–1918",
        "excerpt": "Night raids provided a measure of protection from interceptors and anti-aircraft fire but they greatly complicated navigation and landing. Germany's airships were among the first weapons to carry war from the front to civilians far behind the lines, drifting over Britain under cover of darkness to rain bombs on towns and cities.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/German_bombing_of_Britain,_1914%E2%80%931918"
      },
      {
        "category": "literary",
        "title": "H. G. Wells imagines the airship bombardment of a city, 'The War in the Air' (1908)",
        "excerpt": "Below, they left ruins and blazing conflagrations and heaped and scattered dead; men, women, and children mixed together as though they had been no more than Moors, or Zulus, or Chinese.",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/The_War_in_the_Air/Chapter_VI"
      },
      {
        "category": "literary",
        "title": "Tennyson foresees aerial war, 'Locksley Hall' (1842)",
        "excerpt": "Heard the heavens fill with shouting, and there rain'd a ghastly dew\nFrom the nations' airy navies grappling in the central blue;",
        "source": "Wikisource",
        "href": "https://en.wikisource.org/wiki/Locksley_Hall"
      },
      {
        "category": "artistic",
        "title": "John Martin, 'The Destruction of Sodom and Gomorrah' (1852)",
        "excerpt": "Martin's vast canvas shows two cities annihilated by fire and brimstone hurled from the heavens, the buildings dissolving in the heart of a furnace beneath a swirling storm of flame. Fleeing figures in the foreground flee the destruction as lightning strikes the plain. It is one of the great visions in Western art of fire raining from the sky upon a doomed settlement.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_Sodom_and_Gomorrah.jpg",
        "image": {
          "src": "/covers/ukraine-drone-attack-russian-chemical-plant--art.png",
          "alt": "Painting of the biblical cities Sodom and Gomorrah engulfed in a towering storm of fire and brimstone falling from a blazing sky, with tiny figures fleeing in the foreground.",
          "credit": "John Martin (1789–1854), The Destruction of Sodom and Gomorrah, 1852, Laing Art Gallery; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, '1812 Overture' (Ouverture solennelle), Op. 49 (1880)",
        "excerpt": "Tchaikovsky's thunderous festival overture commemorates Russia's repulse of an invading army, building from a solemn hymn to a tumult of clashing themes, pealing bells and live cannon fire. The work has become the archetypal musical depiction of bombardment and martial fury, war rendered as a wall of percussive sound. The full score and parts are freely available in the public domain.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      }
    ]
  },
  {
    "slug": "volkswagen-cut-100000-jobs",
    "headline": "Volkswagen CEO plans to cut up to 100,000 jobs and close four German plants, German report says",
    "overview": "Volkswagen chief executive Oliver Blume is targeting cuts of up to 100,000 jobs over the coming years and the closure of four German factories, Manager Magazin reported. The plan, part of a deep cost-cutting drive, would also spin off the core VW brand as the carmaker grapples with weak demand and the costly shift to electric vehicles.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxQRmpKMDNaaHdMOHRySUVZR2ExZjUxWllrYnVDUGpVQ1UzMkgzcXFPSXAycVJnSkFITXExNEt4elVaZ1NoUnpBLUJhakZjb1NpWnJaRU9YcnAydGFBVlhDVTJwOVRldk9GS2hwQmhISF8xSENmU1ViUVNHUmlFdkE3WUp2UFhsZEZKOXI5bnZ2dVZ2bnA3SkxBSTlZSjlWNWpsR3pBM3JhWGptZ2ZoMmwtNWJoMVB5TkRPVWhYSzhRVDFVNDMwbksxQUlnQ015cThTRnVjNG5n?oc=5"
      },
      {
        "name": "Automotive News",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNcVRyZEhTZ2JsUXNwZkNCcVMxSi1pUy1nU0pLVWZkNXM3WGhCNThfM0NTVlhEbUoxQnotQ2xEYUQ1MzZGNWRLYWdfN05LSFVqNmlmRmtTYWVNYy1fbHFBbWJQV0FJT1lFLUl6QlhldDhhMmZwRGF4U2lvZ04ySENkMk1rQVprenM4dmtGNzJjMA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/volkswagen-cut-100000-jobs.png",
      "alt": "Adolph Menzel's 1875 painting 'The Iron Rolling Mill (Modern Cyclopes)', showing workers laboring amid fire, smoke and machinery in a 19th-century German foundry",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 32,
    "analogies": [
      {
        "category": "historical",
        "title": "The Luddite Uprising (1811-1816)",
        "excerpt": "English textile workers who protested the use of certain types of automated machinery due to concerns relating to worker pay, child labour, working conditions and output quality, organizing raids to destroy the machines that were displacing them.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Luddite"
      },
      {
        "category": "historical",
        "title": "The 1984-1985 UK Miners' Strike and the Death of British Coal",
        "excerpt": "From March 1984 to March 1985, British miners struck against proposed pit closures; the strike ended in a decisive government victory that allowed the closure of most collieries and hastened the collapse of a great industry that once employed hundreds of thousands.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1984%E2%80%931985_United_Kingdom_miners%27_strike"
      },
      {
        "category": "literary",
        "title": "Charles Dickens, Hard Times (1854)",
        "excerpt": "It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled... where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/ebooks/786"
      },
      {
        "category": "literary",
        "title": "Émile Zola, Germinal (1885)",
        "excerpt": "This pit, piled up in the bottom of a hollow, with its squat brick buildings, raising its chimney like a threatening horn, seemed to him to have the evil air of a gluttonous beast crouching there to devour the earth.",
        "source": "Project Gutenberg (trans. Havelock Ellis)",
        "href": "https://www.gutenberg.org/ebooks/56528"
      },
      {
        "category": "artistic",
        "title": "Robert Koehler, The Strike (Der Streik), 1886",
        "excerpt": "Koehler's vast canvas captures the moment of rupture between labor and capital: angry mill workers crowd before a top-hatted factory owner on his steps, one man stooping to gather a stone. Painted the year of the Haymarket affair, it was the first painting of an industrial strike exhibited in America. The faces register exhaustion, defiance and the dread of a vanishing livelihood.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Robert_Koehler_-_Der_Streik_(1886).jpg",
        "image": {
          "src": "/covers/volkswagen-cut-100000-jobs--art.png",
          "alt": "Robert Koehler's 1886 painting 'The Strike', depicting factory workers confronting a top-hatted employer outside a mill, one worker bending to pick up a stone",
          "credit": "Robert Koehler (1850-1917), Deutsches Historisches Museum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Mosolov, Zavod (Iron Foundry), Op. 19 (1926-27)",
        "excerpt": "Mosolov's relentless orchestral movement, the first part of his ballet suite 'Steel', renders the factory itself as music: hammering ostinatos, grinding brass and a shaken metal sheet evoke the pounding of an iron works. A landmark of Soviet machine-age futurism, it celebrates the very industrial din that, a century later, falls silent when the plants close.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
      }
    ]
  },
  {
    "slug": "nyc-board-freezes-rents",
    "headline": "New York rent board approves a two-year freeze on one million regulated apartments, fulfilling Mamdani pledge",
    "overview": "New York City's Rent Guidelines Board voted to freeze rents on roughly one million rent-stabilized apartments for two years, delivering on a central campaign promise by Mayor Zohran Mamdani. Landlord groups condemned the freeze, warning it would deprive aging buildings of funds for maintenance.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cn947pxxz4yo"
      },
      {
        "name": "CNN",
        "href": "https://news.google.com/rss/articles/CBMif0FVX3lxTE82QXp5XzNURC0xZ3VxWHN2NTRrRDdKTE5zblY5TkVIYW1tQ2VNVW5tTEpwVHVZVUR3cGpmZDAtZ19RV0p1UldnOE9vbzlEVG43RXJ6eHU0STVaM2F1eXh1dzl4eEc0dENzbEVDbXNYcmllRGk5Qjcxa2RRN0VzUkU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/nyc-board-freezes-rents.png",
      "alt": "Bandit's Roost, a crowded, squalid tenement alley at 59 1/2 Mulberry Street in New York's Mulberry Bend slum, photographed by Jacob Riis in 1888",
      "credit": "Jacob Riis (1849-1914), via Wikimedia Commons (public domain)"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 33,
    "analogies": [
      {
        "category": "historical",
        "title": "Solon's Seisachtheia: the 'shaking off of burdens' in ancient Athens",
        "excerpt": "The seisachtheia laws immediately cancelled all outstanding debts, retroactively emancipated all Athenian previously enslaved debtors, reinstated all confiscated serf property to the hektemoroi, and forbade the use of personal freedom as collateral in all future debts.",
        "source": "Wikipedia, 'Seisachtheia'",
        "href": "https://en.wikipedia.org/wiki/Seisachtheia"
      },
      {
        "category": "historical",
        "title": "The Emergency Price Control Act of 1942 and wartime U.S. rent ceilings",
        "excerpt": "Enacted to halt 'inflationary spiraling,' the Act gave the Office of Price Administration sweeping power over 'Prices, Rents, And Market And Renting Practices,' freezing what landlords could charge across America's defense-housing areas during the Second World War. It is an early federal precedent for the state intervening to cap rents in a moment of crisis, a measure landlords likewise condemned.",
        "source": "Wikipedia, 'Emergency Price Control Act of 1942'",
        "href": "https://en.wikipedia.org/wiki/Emergency_Price_Control_Act_of_1942"
      },
      {
        "category": "literary",
        "title": "Jacob Riis, How the Other Half Lives (1890)",
        "excerpt": "Collect the rent in advance, or, failing, eject the occupants.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/45502/45502-h/45502-h.htm"
      },
      {
        "category": "literary",
        "title": "Maxim Gorky, The Lower Depths (1902)",
        "excerpt": "You take up a whole lot of room for your two rubles a month.",
        "source": "Project Gutenberg",
        "href": "https://www.gutenberg.org/files/52468/52468-h/52468-h.htm"
      },
      {
        "category": "artistic",
        "title": "George Bellows, Cliff Dwellers (1913)",
        "excerpt": "In this Ashcan School oil painting, the teeming poor of New York's Lower East Side spill out of their tenements onto stoops, sidewalks, and fire escapes on a sweltering summer day. Laundry flaps overhead and a pushcart vendor hawks his wares amid the crowd, a vision of the overcrowded housing of the people that rent regulation was meant to relieve. The work, exhibited at the 1913 Armory Show, distills the human density behind the era's housing reform debates.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:George_Bellows_-_Cliff_Dwellers_(1913).jpg",
        "image": {
          "src": "/covers/nyc-board-freezes-rents--art.png",
          "alt": "Oil painting of a crowded Lower East Side tenement street, with people packed onto stoops, fire escapes, and sidewalks, laundry strung overhead and a pushcart vendor in the foreground",
          "credit": "George Bellows (1882-1925), Los Angeles County Museum of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Stephen Foster, Hard Times Come Again No More (1854)",
        "excerpt": "Foster's parlor song pleads with the comfortable to pause at the door of the poor and hear their lament, its refrain begging that hard times come again no more. Published in New York in 1854, it became an enduring anthem of compassion for the destitute of the growing American city. Its sympathy for those crushed by want echoes the moral case behind shielding tenants from rising rents.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Hard_Times_Come_Again_No_More_(Foster,_Stephen)"
      }
    ]
  },
  {
    "slug": "scotus-strikes-hawaii-gun-law",
    "headline": "US Supreme Court strikes down Hawaii law requiring a permit to carry guns in stores and hotels",
    "overview": "The U.S. Supreme Court struck down a Hawaii law that required businesses to grant explicit permission before firearms could be carried into stores, hotels and other private establishments. The decision marks a significant expansion of the right to carry firearms in public spaces.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQVF9WSjdITWlxaWFSUlNtNHN3THJGaUJDV0YzNE1YalZXa3Z0QmdBa3Q5OElGMFYzMWFTVmhSa0VOX0JzemhoQVRXOGstVnlNNm1rWDIwcmlkbENJLXpSYU5xU2FEOUU0c1cyd1liRllHMS1SNnp4Nkl5TktfYURNWmlRX2tXdzRGLThZNDVQcEpWUG96Rnc?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMiggFBVV95cUxPeVZQVWZMd09xSy00RVFsOU9Iemc1LUFic19ZRlZIN2tGVXQ1YlpUMlFuVTZmZENQZ0tIU3kzUG5fUUYxaGItcDBHdm1qc0JXelFLSC1FUy1yd2tTUFd2Y3IxMnlaTTROVHdCQTVwTGVEQktNc0w3M2dZZ2hYV0ZmMHpR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/scotus-strikes-hawaii-gun-law.png",
      "alt": "The Minute Man, Daniel Chester French's 1874 bronze statue at Concord of an armed colonial militiaman stepping from his plow, musket in hand",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 34,
    "analogies": [
      {
        "category": "historical",
        "title": "The Statute of Northampton (1328): going armed in fairs and markets",
        "excerpt": "nor to go nor ride armed by night nor by day, in fairs, markets, nor in the presence of the justices or other ministers",
        "source": "Statute of Northampton 1328 (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Statute_of_Northampton"
      },
      {
        "category": "historical",
        "title": "The English Bill of Rights (1689): arms for defence",
        "excerpt": "Protestants may have arms for their defence suitable to their conditions and as allowed by law",
        "source": "Bill of Rights 1689 (Wikipedia)",
        "href": "https://en.wikipedia.org/wiki/Bill_of_Rights_1689"
      },
      {
        "category": "literary",
        "title": "Homer, Iliad, Book 3: the arming of Paris",
        "excerpt": "First he greaved his legs with greaves of good make and fitted with ancle-clasps of silver; after this he donned the cuirass of his brother Lycaon, and fitted it to his own body; he hung his silver-studded sword of bronze about his shoulders, and then his mighty shield. On his comely head he set his helmet, well-wrought, with a crest of horse-hair that nodded menacingly above it, and he grasped a redoubtable spear that suited his hands.",
        "source": "The Iliad of Homer (Samuel Butler trans.), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Butler)/Book_3"
      },
      {
        "category": "literary",
        "title": "Shakespeare, Henry V: 'Once more unto the breach'",
        "excerpt": "Once more vnto the Breach, Deare friends, once more; Or close the Wall vp with our English dead:",
        "source": "The Life of King Henry the Fifth (First Folio), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2253/2253-h/2253-h.htm"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens, David Slaying Goliath (1616)",
        "excerpt": "Rubens captures the instant the shepherd David, sling still in hand, overcomes the fallen giant warrior Goliath, a study in the citizen who meets armed force with a humble weapon. The muscular, twisting composition makes the act of bearing and wielding arms its violent center. The canvas hangs in the Norton Simon Museum and is in the public domain.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:David_Slaying_Goliath_by_Peter_Paul_Rubens.jpg",
        "image": {
          "src": "/covers/scotus-strikes-hawaii-gun-law--art.png",
          "alt": "Rubens's painting of David, sling in hand, standing over the slain giant Goliath",
          "credit": "Peter Paul Rubens (1577–1640), via Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Holst, 'Mars, the Bringer of War' from The Planets, Op. 32",
        "excerpt": "Holst's relentless five-beat ostinato and braying brass turn the opening movement of The Planets into a portrait of mechanized, advancing war. Composed 1914–1916 and now in the public domain, the music renders the armed man not as a hero but as an implacable, grinding force. Full scores and parts are freely available on the Petrucci Music Library.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      }
    ]
  },
  {
    "slug": "europe-heatwave-climate-attribution",
    "headline": "Scientists find Europe's record June heatwave was made far more likely by climate change",
    "overview": "A rapid attribution study by climate scientists concluded that Europe's deadly June heatwave, which set temperature records across Britain, Switzerland and beyond, would have been virtually impossible without human-caused climate change. Researchers said warming made the extreme heat several degrees hotter and far more frequent.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxOa0M1dVdRTjNTSDlXLU5XaEVxUzBaSUU0eG80UWdYZVlIaWtHYWVIdHctMXhlWlZlU2JJYm84VGVOaUxKVDZIVTU2N1MyLUdVdW5ldy1uZGNYWktuQ1p3ZzY0aVZJYTZCcnYtaGlIbndob0xmUUJZY1FqN1ZxZXRuUTVtaGNrMUNxaFdtaTR4ek1PZHZUd285YW5OSFNoLWJYR3p0ZGZaYVZwWURPa1hnR2oyMUhPX0E2WTZiYkVnSlNNbWN2U2RocEFB?oc=5"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxNTXlxU2h5YWV6dXUwSHE3c0RidkpRUDBqYWFCeEZNd3BuSnhEUzFNYWI2UHpFLTFRZnZ5MFJPZTljTVY0T2RMblltNXJSZnpnQlhxQzA3MDJZU0pWRFllelIyTEg3UWdpTkxOWHBvbGhqZkNQOFVQcnI0Qy1zbTZqOGVud29QSHY3d1Yza0VwS3VnRkFlMTk5VzEzbGhWeXVsVGFRNF9vQTNFTTBaQmI2WTJR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/europe-heatwave-climate-attribution.png",
      "alt": "Vincent van Gogh's 1888 painting 'The Harvest' (De oogst), showing golden wheat fields baking under the brilliant summer sun of Provence near Arles.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 35,
    "analogies": [
      {
        "category": "historical",
        "title": "The 2003 European heatwave",
        "excerpt": "The summer of 2003 brought Europe its hottest weather since at least 1540 and killed an estimated 70,000 people, a disaster later studied as one of the first heat events shown by attribution science to have been made far more likely by human-caused warming. It stands as the grim precedent against which each new record-breaking summer is now measured.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/2003_European_heat_wave"
      },
      {
        "category": "historical",
        "title": "The Dust Bowl of the 1930s",
        "excerpt": "Severe drought and reckless ploughing of the Great Plains stripped away the topsoil, raising vast black blizzards of dust that buried farms and drove families from the land throughout the 1930s. It remains the archetype of a parched, ruined country in which human action and a punishing sky combined to make catastrophe.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Dust_Bowl"
      },
      {
        "category": "literary",
        "title": "Phaethon scorches the earth (Ovid, Metamorphoses II)",
        "excerpt": "Great cities perish with their walls, / and peopled nations are consumed to dust.",
        "source": "Ovid, Metamorphoses, Book II (trans. Brookes More)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D2"
      },
      {
        "category": "literary",
        "title": "Cassandra's prophecy unheeded (Aeschylus, Agamemnon)",
        "excerpt": "I say thou shalt look upon Agamemnon dead.",
        "source": "Aeschylus, Agamemnon (trans. Herbert Weir Smyth, 1926)",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1926)_v2/Agamemnon"
      },
      {
        "category": "artistic",
        "title": "The Fall of Phaeton — Peter Paul Rubens (c. 1604–1605)",
        "excerpt": "Rubens paints the very instant the boy Phaethon loses control of the sun's chariot, his horses plunging amid a blaze of fire and writhing bodies as the heavens themselves recoil. The scene renders the ancient warning made vivid: a world set alight when a mortal seizes powers over the sun he cannot govern.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/europe-heatwave-climate-attribution--art.png",
          "alt": "Baroque painting of Phaethon falling from the blazing chariot of the sun amid panicked horses and tumbling figures against a fiery sky.",
          "credit": "Peter Paul Rubens, National Gallery of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "'Summer' (L'estate) from Vivaldi's The Four Seasons, RV 315",
        "excerpt": "Vivaldi's Concerto No. 2 in G minor evokes a land languishing under a merciless sun, its opening movement marked by drooping heat and exhaustion before a violent thunderstorm breaks. The accompanying sonnet describes scorched flocks and a shepherd trembling at the approaching tempest, a Baroque portrait of summer's oppressive, dangerous power.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/The_Four_Seasons_(Vivaldi,_Antonio)"
      }
    ]
  },
  {
    "slug": "italy-probes-microsoft-365-price-hike",
    "headline": "Italy's antitrust regulator opens an investigation into Microsoft over its Microsoft 365 price increases",
    "overview": "Italy's competition watchdog opened a probe into Microsoft over price increases for its Microsoft 365 software suite tied to the integration of its Copilot AI features. Regulators are examining whether bundling the AI tools into higher-priced plans harms consumers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQcmR2NXI4RklGVFZIRXRlTC1Dcndyc1VaVWJLQlRmcmt3dTRDTHdqSTFLU2NNVmdxcXFPOHE4ckJGU2FDMnhsMFhMeEJBc2VIelBvYWZUdVVJdDB3Q3BUZER6aVVEbmNEcEVuM2Zycy1VbllhcU14MG9uYUtXRkd6NzNvVXJ3ZUF3YVVNUm1QUmtMMmp0ZW8xbVU5UGRsU0hfMHpWNlIydw?oc=5"
      },
      {
        "name": "Seeking Alpha",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNT2M0Z2daeHFDeHViYy1MN3RuTzlYeGY4TktqeURCUldDenE2UjNUN0FqeG5WTENIYnpRS041Zl9tV2lJbmRFNWRuWWVLZGhBU3NLaDZyZlVnVlFnb2loUTloWURubkRQMUQwUm5uUjBDUEl2R1hqVVVjdnk2VllHNktjcHBteVNuSWpqRDAtS29TZml5RDdRajlLdi02bEdkNDVyZ2Rrd3Vub3hlSkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/italy-probes-microsoft-365-price-hike.png",
      "alt": "1904 political cartoon depicting Standard Oil as a giant octopus, its steel tentacles gripping Congress, state houses, the steel and copper industries, and reaching toward the White House",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 36,
    "analogies": [
      {
        "category": "historical",
        "title": "Standard Oil broken up by the Supreme Court (1911)",
        "excerpt": "The U.S. Supreme Court ruled that John D. Rockefeller's Standard Oil had illegally monopolized the American petroleum industry and ordered the company to break itself up into 34 separate firms, the landmark application of the Sherman Antitrust Act against a dominant trust.",
        "source": "Wikipedia — Standard Oil Co. of New Jersey v. United States",
        "href": "https://en.wikipedia.org/wiki/Standard_Oil_Co._of_New_Jersey_v._United_States"
      },
      {
        "category": "historical",
        "title": "United States v. Microsoft (1998–2001)",
        "excerpt": "The U.S. government's earlier antitrust case against Microsoft turned on whether the company was allowed to bundle its Internet Explorer web browser with the Windows operating system, an alleged tying arrangement used to leverage one monopoly into a neighboring market. The case nearly resulted in the company's breakup.",
        "source": "Wikipedia — United States v. Microsoft Corp.",
        "href": "https://en.wikipedia.org/wiki/United_States_v._Microsoft_Corp."
      },
      {
        "category": "literary",
        "title": "Frank Norris, The Octopus: A Story of California (1901)",
        "excerpt": "the galloping monster, the terror of steel and steam, with its single eye, cyclopean, red, shooting from horizon to horizon; but saw it now as the symbol of a vast power, huge, terrible, flinging the echo of its thunder over all the reaches of the valley, leaving blood and destruction in its path; the leviathan, with tentacles of steel clutching into the soil, the soulless Force, the iron-hearted Power, the monster, the Colossus, the Octopus.",
        "source": "Project Gutenberg — The Octopus by Frank Norris",
        "href": "https://www.gutenberg.org/files/268/268-h/268-h.htm"
      },
      {
        "category": "literary",
        "title": "Frank Norris, The Pit: A Story of Chicago (1903)",
        "excerpt": "It can't be done; first, for the reason that there is a great harvest of wheat somewhere in the world for every month in the year; and, second, because the smart man who runs the corner has every other smart man in the world against him.",
        "source": "Project Gutenberg — The Pit by Frank Norris",
        "href": "https://www.gutenberg.org/cache/epub/4382/pg4382-images.html"
      },
      {
        "category": "artistic",
        "title": "Joseph Keppler, 'The Bosses of the Senate' (Puck, 1889)",
        "excerpt": "Bloated trust magnates, their bodies swollen into giant money bags labeled steel, copper, oil, iron, sugar and tin, loom over the tiny senators of the 50th Congress. Above them a sign declares this 'the Senate of the Monopolists, by the Monopolists, for the Monopolists,' while the gallery marked 'People's Entrance' stands bolted and barred. Recognized as an early antitrust image, it helped feed the public mood that produced the Sherman Antitrust Act.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Bosses_of_the_Senate_by_Joseph_Keppler.jpg",
        "image": {
          "src": "/covers/italy-probes-microsoft-365-price-hike--art.png",
          "alt": "Political cartoon showing corporate trusts as enormous money-bag figures towering over diminutive U.S. senators, with the people's gallery entrance barred shut",
          "credit": "Joseph Keppler, Puck, 1889 — Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner, Das Rheingold, WWV 86A (1869)",
        "excerpt": "The opening drama of Wagner's Ring cycle stages the primal myth of greed and power: the dwarf Alberich renounces love to seize the Rhinegold and forge a ring that promises mastery of the world, while the giants who built Valhalla demand their payment and the gods scheme to keep the hoard. It is an allegory of accumulation without limit, in which whoever monopolizes the treasure is cursed by the very power it confers.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ]
  },
  {
    "slug": "spacex-starlink-mobile-us-consumers",
    "headline": "SpaceX plans to sell Starlink mobile phone service directly to US consumers, Financial Times reports",
    "overview": "Elon Musk's SpaceX is preparing to push its Starlink satellite service into the U.S. consumer mobile market, the Financial Times reported, aiming to offer phone connectivity from space that bypasses traditional cellular carriers. The move would put SpaceX in direct competition with the major U.S. mobile network operators.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0wFBVV95cUxOSkdfekMzbXFsVjJKT3dEWGdLN1hBRDMwNnBJdk54OEppVERtcHhmMUZlS0ZVSXQxSTFCWkVLZmk0ZWVYdFMyeVhJbVRKc3gwaE1UbGdDckQtUUtkUFNRZXVkUm5NNVNRWm1OYndacXBTYklRQnpFQ3FxeWl5YlY1a1dDX0Znbl9iYXdoNWotVUkwR2FubVo5Mk9PSUxoMXdHTVJTcnI0MGM0cmZ2QjZ2UlYzc0J3UUNqd0l6QkVva2REX2FWbWl2dTYtOTQ2emdpMTBn?oc=5"
      },
      {
        "name": "Financial Times",
        "href": "https://news.google.com/rss/articles/CBMicEFVX3lxTFBRN2paclZ1aHEzTU1vd0l4eHhPd0tQd2ZEdDBkSzViRnBEZGRZZ2g0RGFFd3lqdGpsVjZGMTRkakNDdkNQdGZGUTgyZlVkUVpsNUNMUU1JUE8ybDNjNUxQbV93R1N0Vl9NZTJvc3FDRTE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/spacex-starlink-mobile-us-consumers.png",
      "alt": "1865 Harper's Weekly wood engraving celebrating the Atlantic telegraph cable, with the steamship Great Eastern at center and the line from A Midsummer Night's Dream, 'I'll put a girdle round the earth in forty minutes.'",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 37,
    "analogies": [
      {
        "category": "historical",
        "title": "The first transatlantic telegraph cable (1858/1866)",
        "excerpt": "Europe and America are united by telegraph.",
        "source": "Wikipedia: Transatlantic telegraph cable",
        "href": "https://en.wikipedia.org/wiki/Transatlantic_telegraph_cable"
      },
      {
        "category": "historical",
        "title": "The first transcontinental telegraph (1861)",
        "excerpt": "The completion of the line immediately made the Pony Express obsolete, which officially ceased operations two days later, as California Chief Justice Stephen Field telegraphed President Lincoln to pledge the state's loyalty to the Union.",
        "source": "Wikipedia: First transcontinental telegraph",
        "href": "https://en.wikipedia.org/wiki/First_transcontinental_telegraph"
      },
      {
        "category": "literary",
        "title": "Rudyard Kipling, 'The Deep-Sea Cables' (1893)",
        "excerpt": "They have wakened the timeless Things; they have killed their father Time; / Joining hands in the gloom, a league from the last of the sun. / Hush! Men talk to-day o'er the waste of the ultimate slime, / And a new Word runs between: whispering, 'Let us be one!'",
        "source": "Wikisource: A Song of the English (1909)",
        "href": "https://en.wikisource.org/wiki/A_Song_of_the_English_(1909)/The_Deep-Sea_Cables"
      },
      {
        "category": "literary",
        "title": "E. M. Forster, 'The Machine Stops' (1909)",
        "excerpt": "She could not be sure, for the Machine did not transmit nuances of expression. It only gave a general idea of people—an idea that was good enough for all practical purposes, Vashti thought.",
        "source": "Wikisource: The Machine Stops, Chapter I",
        "href": "https://en.wikisource.org/wiki/The_Machine_Stops/Chapter_I"
      },
      {
        "category": "artistic",
        "title": "'The Laying of the Cable—John and Jonathan Joining Hands' (1858)",
        "excerpt": "A jubilant 1858 woodcut shows John Bull and Brother Jonathan—Britain and America—clasping hands across a stormy ocean to celebrate the completed transatlantic cable. Behind them ride the Niagara and the Agamemnon, the very ships that paid out the line, while the figures exchange words of friendship and lasting peace. It is the abolition of distance rendered as a handshake between two shores.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_laying_of_the_cable--John_and_Jonathan_joining_hands_LCCN2004665357.jpg",
        "image": {
          "src": "/covers/spacex-starlink-mobile-us-consumers--art.png",
          "alt": "1858 woodcut of John Bull and Brother Jonathan shaking hands across the Atlantic over the newly laid telegraph cable, with the cable-laying steamships in the background.",
          "credit": "Popular Graphic Arts / Library of Congress, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, 'The Heavens Are Telling' from Die Schöpfung (1798)",
        "excerpt": "The triumphant chorus 'Die Himmel erzählen die Ehre Gottes'—The heavens are telling the glory of God—crowns Part I of Haydn's oratorio The Creation, setting Psalm 19 as a hymn to the firmament. Voices and orchestra surge skyward, the soloists answering one another as day speaks to day across the vault of heaven. Long in the public domain, it is music of the sky itself proclaiming a message across distance.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      }
    ]
  },
  {
    "slug": "david-clayton-thomas-dies-84",
    "headline": "David Clayton-Thomas, lead singer of Blood, Sweat & Tears, dies at 84",
    "overview": "David Clayton-Thomas, the powerhouse Canadian vocalist who fronted Blood, Sweat & Tears and sang the band's hits \"Spinning Wheel\" and \"You've Made Me So Very Happy,\" has died at 84. His gritty, soulful voice helped define the jazz-rock sound of the late 1960s.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxNbFM0dk5OTFZ4c2YxMm9SSUs5Smp0SXlVZC1MRTZyemdELXdxMWYtZHVoVWNoNVctMV96UUZTdEJmdlZvSUo3Z2M5elEzdzNvaGdFREhVT0dpcTNKUUI4YkxvWGZwcWdZTEhfOFd3SlpiUU9BYTUtUXJxN0RvblN6WDVfYnljU3lIU28wUlpKOFdOSjluLWlZSE9SVQ?oc=5"
      },
      {
        "name": "Variety",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPaERHcDRtVlNFb0dZRWhYQzBkcGlaeFlUNUplS284SkNSWWFMQ2ZOY1l5ZDVXQnBGMUEwbkQ5UmVxbG8xX1haWXJabER2Nm9CLUhIVEIzblA4OFJ4ak9LUUgtY2J5OG95UkR3djdldU1aMVlyQ1V4MmdlajZFVmE3NnhzMWhmcms0bjIydnVsdC1pb3FtMkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/david-clayton-thomas-dies-84.png",
      "alt": "Edward Burne-Jones's painting The Wheel of Fortune, in which a towering figure of Fortune turns a great wheel bearing the bound figures of a slave, a king, and a poet as they rise and fall",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 38,
    "analogies": [
      {
        "category": "historical",
        "title": "The death of Farinelli, greatest voice of his age",
        "excerpt": "Carlo Broschi, known as Farinelli (1705–1782), was the most celebrated castrato of the eighteenth century, a singer whose voice could hold a Spanish king spellbound and who reigned over the opera houses of Europe before retiring to a villa near Bologna, where the aging Mozart came to pay homage. His death silenced a voice so rare that no instrument has ever fully reproduced it, a reminder that the most extraordinary singers carry their art irrecoverably into the grave.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Farinelli"
      },
      {
        "category": "historical",
        "title": "The birth of jazz, a fusion of traditions",
        "excerpt": "Its roots are in blues, ragtime, European harmony, African rhythmic rituals, spirituals, hymns, marches, vaudeville song, and dance music.",
        "source": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Jazz"
      },
      {
        "category": "literary",
        "title": "Shelley's elegy for a dead singer of verse",
        "excerpt": "I weep for Adonais—he is dead!",
        "source": "Wikisource — Percy Bysshe Shelley, Adonais",
        "href": "https://en.wikisource.org/wiki/Adonais"
      },
      {
        "category": "literary",
        "title": "Boethius and the turning Wheel of Fortune",
        "excerpt": "I turn the wheel that spins. I delight to see the high come down and the low ascend.",
        "source": "Project Gutenberg — Boethius, The Consolation of Philosophy (trans. H. R. James)",
        "href": "https://www.gutenberg.org/files/14328/14328-h/14328-h.htm"
      },
      {
        "category": "artistic",
        "title": "Gustave Moreau, Orpheus (1865)",
        "excerpt": "Gustave Moreau's dreamlike canvas shows a Thracian maiden cradling the severed head of Orpheus, still resting upon his lyre after the singer has been torn apart, his music outliving his body. The fallen poet-musician, whose song once charmed beasts and stones and moved the gods of the underworld, becomes here an emblem of the voice that death cannot wholly silence. It is a meditation on the mortality of the artist and the strange survival of his song.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Gustave_Moreau_-_Orpheus_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/david-clayton-thomas-dies-84--art.png",
          "alt": "A young woman tenderly holds the severed head of Orpheus resting on his lyre against a mountainous landscape",
          "credit": "Gustave Moreau (1826–1898), Musée d'Orsay, via Google Art Project / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Gluck, Orfeo ed Euridice (1762)",
        "excerpt": "Christoph Willibald Gluck's reform opera dramatizes the archetypal myth of the singer whose art can pierce death itself, as Orpheus descends to the underworld to reclaim his lost Euridice through the sheer power of his voice. Its famous lament Che farò senza Euridice gives music to the grief of irreplaceable loss, the silence left where a beloved voice once sounded. The full score is in the public domain on IMSLP.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Orfeo_ed_Euridice_(Gluck,_Christoph_Willibald)"
      }
    ]
  },
  {
    "slug": "abu-dhabi-gehry-performing-arts",
    "headline": "Abu Dhabi unveils plans for a Frank Gehry-designed performing arts center on Saadiyat Island",
    "overview": "Abu Dhabi revealed designs for Dar Al Funoon, a sweeping performing arts institution designed by architect Frank Gehry, to rise on the emirate's Saadiyat cultural district. The sculptural landmark, drawing on Gehry's signature forms, is slated to open by 2030.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/06/26/dar-al-funoon-abu-dhabi-frank-gehry/"
      },
      {
        "name": "The National",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxOdXJSSWZKR2pWeld5UnBjMVZnWHY4ZkxWbWNjTVVsVk5naHFUemZpVG1RM1M4dF92eHpPX3dFOTdIS3M3MjJMSXlIcGFnZnprMnNxX19wcTRONjJ4ZVZDM3hscFBsbnZLSi1LdXpJS2w3UWRVaVk1WFZBRmhjdlRBX0s5RzVnTnlLVHViNy1zd3RuT1JVQi1PLWk0VVZBbzh4aEZRZjJXam8waVpLb1FEOUlFbC1yclBFaGdQNjFZZG1EWW1pSm04V2s0SzNtWWtnRHZ1Mw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-06-26",
    "image": {
      "src": "/covers/abu-dhabi-gehry-performing-arts.png",
      "alt": "The grand sculpted facade of the Palais Garnier, the Paris opera house designed by Charles Garnier, seen from the Avenue de l'Opera",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 26 June 2026",
    "rank": 39,
    "analogies": [
      {
        "category": "historical",
        "title": "Pericles raises the Parthenon on the Athenian Acropolis",
        "excerpt": "In the mid-5th century BC, when the Athenian Acropolis became the seat of the Delian League, Pericles initiated the building project that lasted the entire second half of the century. The architects Iktinos and Callicrates led the design while the sculptor Phidias oversaw the decoration and the great chryselephantine statue of Athena, making the temple at once a thanksgiving for victory over Persia and a monument to Athenian power and aspiration.",
        "source": "Wikipedia (The Parthenon)",
        "href": "https://en.wikipedia.org/wiki/Parthenon"
      },
      {
        "category": "historical",
        "title": "Napoleon III commissions Charles Garnier's Paris Opera",
        "excerpt": "Built between 1861 and 1875 as part of the Second Empire's reconstruction of Paris under Haussmann, the Palais Garnier was won in open competition by the then-unknown 35-year-old Charles Garnier. Its opulent eclectic design fused Baroque and Renaissance splendor with modern iron framing, becoming probably the most famous opera house in the world and the model of a ruler-sponsored temple of art.",
        "source": "Wikipedia (Palais Garnier)",
        "href": "https://en.wikipedia.org/wiki/Palais_Garnier"
      },
      {
        "category": "literary",
        "title": "Coleridge, 'Kubla Khan' — the stately pleasure-dome decreed",
        "excerpt": "In Xanadu did Kubla Khan / A stately pleasure-dome decree: / Where Alph, the sacred river, ran / Through caverns measureless to man / Down to a sunless sea.",
        "source": "Wikisource (Christabel; Kubla Khan; The Pains of Sleep, 1816)",
        "href": "https://en.wikisource.org/wiki/Christabel;_Kubla_Khan;_The_Pains_of_Sleep_(1816)/Kubla_Khan"
      },
      {
        "category": "literary",
        "title": "Shelley, 'Ozymandias' — the works of mighty kings",
        "excerpt": "And on the pedestal these words appear: / 'My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!' / Nothing beside remains. Round the decay / Of that colossal wreck, boundless and bare, / The lone and level sands stretch far away.",
        "source": "Wikisource (Poems That Every Child Should Know)",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert, 'Project for the Transformation of the Grande Galerie du Louvre' (1796)",
        "excerpt": "Hubert Robert, keeper of the king's paintings, imagined the Louvre's Grande Galerie remade as a luminous temple of art, its long nave divided by double Corinthian columns and transverse arches and washed by skylights from above. The vast hall recedes toward infinity, lined with masterpieces and sculptures, an architect's visionary statement of a great house of art conjured before it was built. It is the eighteenth-century counterpart to a sculptural cultural landmark unveiled as both aspiration and spectacle.",
        "source": "Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_Projet_d%27am%C3%A9nagement_de_la_Grande_Galerie_du_Louvre_(1796).JPG",
        "image": {
          "src": "/covers/abu-dhabi-gehry-performing-arts--art.png",
          "alt": "Oil painting of an imagined grand gallery of the Louvre, a vast skylit hall of double Corinthian columns lined with paintings and sculptures receding into the distance",
          "credit": "Hubert Robert (1796), Musee du Louvre — Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Handel, 'Music for the Royal Fireworks,' HWV 351 (1749)",
        "excerpt": "Composed in 1749 to crown a royal celebration with its blazing fireworks, Handel's suite opens with a majestic French overture for massed trumpets, horns, oboes and drums, ceremonial music written expressly to consecrate a public spectacle of state. Its pomp and brilliance make it a natural fanfare for the grand opening of a temple of the arts. The full scores are public domain and freely downloadable.",
        "source": "IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ]
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
