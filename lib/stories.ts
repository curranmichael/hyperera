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

// Hand-curated front page. The 2026-06-24 edition (ranks 1-13) leads; the prior
// 2026-06-23 edition follows (ranks 14-26). Selected from the live RSS feeds in
// `lib/feeds.ts`. The analogies are the heart of each story: six per event, two
// per category, each linking to a real human-written source (a primary text,
// museum object page, or archive). Excerpts quote the most relevant passage
// verbatim where the source is public domain, and otherwise describe rather than
// quote, in keeping with the strict-verification ethos. Covers are dithered local copies: feed
// or rights-clean Wikimedia art credited to the source, otherwise an
// AI-generated illustration (credit "AI-generated", from `npm run images:generate`).
// Source links to AP/Reuters are Google News redirects (see `lib/feeds.ts`); a
// later verify pass canonicalizes them.
const stories: Story[] = [
  {
    slug: "congress-invokes-war-powers-to-halt-trump-iran-war",
    headline:
      "Congress passes a war powers measure rebuking Trump over the Iran strikes",
    overview:
      "Both houses of Congress have passed a war powers measure rebuking President Trump's military action against Iran — the first time the resolution has cleared Congress since it was written. The vote is a rare assertion that the power to make war was meant to be shared, even as its practical force remains uncertain.",
    genre: "Politics",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/ce8j6g3v3r4o",
      },
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMipAFBVV95cUxQNmhxUVNibG82ZUN6NG5vUGVEb3c3X3ExNXJKYjFwYzZCYi03ZGFjX2JNZ1VyNzRzSzF5U3V4LVhIUGM4U0lrZzY4SmhBeGZuVHlqLWxsQ3hPRk5aYVZtT2ZPUk84LUl2LWw1WEl5ai1OS3ZFcGlKTmpEZmVPeG5rT1QwOFVoY25iS2NXRjBPTnQtNnBxYkNpQXFVT1hKTEJYbGJpSg?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-24",
    image: {
      src: "/covers/congress-invokes-war-powers-to-halt-trump-iran-war.png",
      alt: "An empty legislative chamber at dawn",
      credit: "BBC",
    },
    lead: true,
    rank: 1,
    analogies: [
      {
        category: "historical",
        title: "The English Bill of Rights, 1689",
        excerpt: "That the raising or keeping a standing army within the kingdom in time of peace, unless it be with consent of Parliament, is against law;",
        source: "Act of Parliament, 1689 — The Avalon Project, Yale Law School",
        href: "https://avalon.law.yale.edu/17th_century/england.asp",
      },
      {
        category: "historical",
        title: "Thucydides, the Mytilenean Debate, 427 BCE",
        excerpt: "The morrow brought repentance with it and reflection on the horrid cruelty of a decree, which condemned a whole city to the fate merited only by the guilty. This was no sooner perceived by the Mitylenian ambassadors at Athens and their Athenian supporters, than they moved the authorities to put the question again to the vote; which they the more easily consented to do, as they themselves plainly saw that most of the citizens wished some one to give them an opportunity for reconsidering the matter. An assembly was therefore at once called.",
        source: "History of the Peloponnesian War, Book 3.36 (Crawley trans.)",
        href: "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_3",
      },
      {
        category: "literary",
        title: "Aeschylus, \"The Persians,\" 472 BCE",
        excerpt: "And who is set over them as shepherd and is master of their host? Of no man are they called the slaves or vassals.",
        source: "Tragedy, 472 BCE — Perseus Digital Library (Smyth trans.)",
        href: "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0012:card%3D232",
      },
      {
        category: "literary",
        title: "Shakespeare, \"Henry V,\" Act 4, Scene 1",
        excerpt: "But if the cause be not good, the king himself hath a heavy reckoning to make, when all those legs and arms and heads, chopped off in battle, shall join together at the latter day and cry all 'We died at such a place;' some swearing, some crying for a surgeon, some upon their wives left poor behind them, some upon the debts they owe, some upon their children rawly left.",
        source: "History play, 1600 — The Complete Works, MIT",
        href: "http://shakespeare.mit.edu/henryv/henryv.4.1.html",
      },
      {
        category: "artistic",
        title: "Francisco Goya, \"The Third of May 1808\"",
        excerpt: "A lantern throws its hard white light on a man in a white shirt, arms flung wide, the instant before the volley. Facing him a rank of soldiers, faceless, bent to their rifles, a single machine of the state. At his feet the already dead; behind him the line of those still to die, hands at their eyes. Goya paints the war-maker's arithmetic from the wrong end of the barrel: the reckoning that comes, as it always does, too late for the man in the white shirt.",
        source: "Oil on canvas, 1814 — Museo del Prado, Madrid",
        href: "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        image: {
          src: "/covers/congress-invokes-war-powers-to-halt-trump-iran-war--a4.png",
          alt: "Goya, “The Third of May 1808”",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "Beethoven, Symphony No. 3 \"Eroica,\" Op. 55, 1804",
        excerpt: "He had written the hero's name across the title page in his own hand, dedication to the one man who seemed to carry the rights of all men. Then word came that the man had crowned himself, and Beethoven took the page and scratched the name out so hard the pen tore through the paper. What was meant to honor a liberator became music \"to the memory of a great man\" — the artist reaching back to recall a tribute he could no longer give to a ruler who had set himself above the people.",
        source: "Orchestral score, 1804 — IMSLP",
        href: "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)",
      },
    ],
  },
  {
    slug: "ai-stocks-slump-revives-the-bubble-question",
    headline:
      "Tech sell-off drags Wall Street lower and revives AI-bubble fears",
    overview:
      "A sharp slide in big technology shares dragged Wall Street lower, reviving the question of whether the long AI rally is investors taking profit or the first crack in a bubble. For now no one can say which, and the not-knowing is itself the story.",
    genre: "Economy",
    sources: [
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMijwFBVV95cUxPc0hsaTJHSzN3R1pMUkVGZUZncFczQjZMaHh6RzNzS3BFYWs4ZDQ2b3IzcDE2TXo4LVdReE9QSkNMLXY0eDJBR3RGUzZ0Z2ltUTZLUDdKd2ZsaERzVnZFcXlod1hrVTU1V3VQUngtam9CX0FoWWZOUTVtUlVRakhvcEw4Ti1vQ3ZjbmRsak95MA?oc=5",
      },
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMigwFBVV95cUxOVVhrUmdEOThuTVBvZ2hvWXR5QjJXLXRnb2NicWtJX0hBcWJNRV9yVHlONk5CWkcyeG1rcjJweXdkVDUzYmtUU3o2MHhfM0MyVVZJNEUwaUJQYzh2YWlCTWtiZF85OFJDWTNIRktqVk9jZ1hyRjAyX1NTVzNqakVBdDVYTQ?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-23",
    image: {
      src: "/covers/ai-stocks-slump-revives-the-bubble-question.png",
      alt: "A trading floor as the tide turns",
      credit: "Wikimedia Commons",
    },
    rank: 2,
    analogies: [
      {
        category: "historical",
        title: "The South Sea Bubble bursts, 1720",
        excerpt: "Sensible men beheld the extraordinary infatuation of the people with sorrow and alarm. There were some both in and out of parliament who foresaw clearly the ruin that was impending.",
        source: "Economic history — Mackay, 1841",
        href: "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm",
      },
      {
        category: "historical",
        title: "Tulipomania collapses, Holland, 1630s",
        excerpt: "At last, however, the more prudent began to see that this folly could not last for ever. Rich people no longer bought the flowers to keep them in their gardens, but to sell them again at cent per cent profit. It was seen that somebody must lose fearfully in the end. As this conviction spread, prices fell, and never rose again.",
        source: "Economic history — Mackay, 1841",
        href: "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm",
      },
      {
        category: "literary",
        title: "Anthony Trollope, \"The Way We Live Now\" (1875)",
        excerpt: "How odd it seems! It isn't a fortnight since we all thought him the greatest man in London.",
        source: "Novel, 1875",
        href: "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm",
      },
      {
        category: "literary",
        title: "Émile Zola, \"Money\" (L'Argent, 1891)",
        excerpt: "This was the usual result which attends an augmentation of capital: the classic whip-stroke, the trick of stimulating success, of urging the quotations into a brisk canter whenever there is a new issue. But the rise was also in a measure due to the genuine importance of the enterprises which the Bank was about to launch. The large yellow bills, placarded all over Paris, announcing the approaching opening of the Carmel silver mines, had ended by turning every head.",
        source: "Novel, 1891 (trans. Vizetelly)",
        href: "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm",
      },
      {
        category: "artistic",
        title: "Hogarth, \"The South Sea Scheme\" (1721)",
        excerpt: "Hogarth's first great satire sets a fairground of greed beneath the City's spires: speculators ride a whirligig while Honesty is broken on the wheel and Honour flogged, the crowd gambling its way to ruin even as the machine spins on. It is the bubble drawn as a carnival — euphoria and the gallows in a single frame.",
        source: "Engraving, 1721",
        href: "https://en.wikipedia.org/wiki/Emblematical_Print_on_the_South_Sea_Scheme",
        image: {
          src: "/covers/ai-stocks-slump-revives-the-bubble-question--a4.png",
          alt: "Hogarth, “The South Sea Scheme”",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "Edward Matthew Ward, \"The South Sea Bubble, a Scene in 'Change Alley in 1720\" (1847)",
        excerpt: "Ward paints the morning after as a heaving crush in 'Change Alley: top-hatted gentlemen and ruined clerks press together in a street that has become a casino, faces lit with greed turning to dread. Looking back from Victorian London at a crash a century gone, he makes speculation a costume drama whose moral never dates.",
        source: "Oil on canvas, 1847 — Tate",
        href: "https://www.tate.org.uk/art/artworks/ward-the-south-sea-bubble-a-scene-in-change-alley-in-1720-n00432",
      },
    ],
  },
  {
    slug: "ships-return-to-the-strait-of-hormuz-amid-toll-warnings",
    headline:
      "Ships return to the Strait of Hormuz as the US warns Iran against tolls",
    overview:
      "Dozens of ships moved again through the Strait of Hormuz after a US–Iran deal, even as the UN moved to evacuate stranded sailors and Washington warned against any attempt to levy tolls on the passage. The fate of a fifth of the world's oil hangs on a channel a few miles wide.",
    genre: "Conflict",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/c24yr796emzo",
      },
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMivwFBVV95cUxNSjlBc1JxN0hPX3MwaDU1UDMyeEE1SG1tRS1ma1FpSENKVVdpVzY3eUNoeUJvdGtVVDZtRm84UG1jTjBwV0s0RTExRHZCczB3TnBYN05CSlJueGNLSU1zeUstS0U0NTBBa0NhUU00VE0wQWFWU0ZfWGtiT2tfeVBpdWV1NmZ3UlBvTmxwRXU3WlVPNGdDU3VWNXJMOWJfNWM1ZEtyNS1YV3JlY2xEeTZmczZsRmdrd1AzMVhZTEFVdw?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-23",
    image: {
      src: "/covers/ships-return-to-the-strait-of-hormuz-amid-toll-warnings.png",
      alt: "Tankers threading a narrow strait",
      credit: "BBC",
    },
    rank: 3,
    analogies: [
      {
        category: "historical",
        title: "The Sound Dues at Elsinore (debated in the House of Commons, 5 June 1857)",
        excerpt: "The delays ships meet with at Elsinore from having to remain for their necessary papers from the Custom House is often the cause of many disasters.",
        source: "Hansard, UK Parliament",
        href: "https://api.parliament.uk/historic-hansard/commons/1857/jun/05/sound-dues-committee",
      },
      {
        category: "historical",
        title: "The Suez Crisis, 1956 — Nasser's Nationalization Speech (Alexandria, 26 July 1956)",
        excerpt: "Egypt nationalized the Egyptian Suez Canal company. When Egypt granted the concession to de Lesseps it was stated in the concession between the Egyptian Government and the Egyptian company that the company of the Suez Canal is an Egyptian company subject to Egyptian authority.",
        source: "Fordham Modern History Sourcebook",
        href: "https://sourcebooks.fordham.edu/mod/1956nasser-suez1.asp",
      },
      {
        category: "literary",
        title: "Homer, \"Odyssey\" — Scylla and Charybdis (Book 12, 8th c. BCE)",
        excerpt: "No ship ever yet got past her without losing some men, for she shoots out all her heads at once, and carries off a man in each mouth.",
        source: "Epic, trans. Samuel Butler",
        href: "https://www.gutenberg.org/cache/epub/1727/pg1727.html",
      },
      {
        category: "literary",
        title: "Apollonius Rhodius, \"Argonautica\" — the Clashing Rocks (Book 2, 3rd c. BCE)",
        excerpt: "First entrust the attempt to a dove when ye have sent her forth from the ship. And if she escapes safe with her wings between the rocks to the open sea, then no more do ye refrain from the path, but grip your oars well in your hands and cleave the sea's narrow strait, for the light of safety will be not so much in prayer as in strength of hands.",
        source: "Epic, trans. R. C. Seaton",
        href: "https://www.gutenberg.org/cache/epub/13977/pg13977.html",
      },
      {
        category: "artistic",
        title: "Henry Fuseli, \"Odysseus in front of Scylla and Charybdis\" (oil on canvas, 1794–1796)",
        excerpt: "Fuseli stages the strait as a single instant of dread: Odysseus rears up in his open boat, shield flung above his head, while the six necks of Scylla coil down from the cliff to pluck his oarsmen one by one. Below the hull the funnel of Charybdis turns. There is no third course between the two—only the toll, paid in men, that the narrows always exact.",
        source: "Aargauer Kunsthaus, Aarau",
        href: "https://commons.wikimedia.org/wiki/File:Johann_Heinrich_F%C3%BCssli_054.jpg",
        image: {
          src: "/covers/ships-return-to-the-strait-of-hormuz-amid-toll-warnings--a4.png",
          alt: "Fuseli, “Odysseus before Scylla and Charybdis”",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "Maerten van Heemskerck, \"The Colossus of Rhodes\" (engraving, Seven Wonders series, 1572)",
        excerpt: "Heemskerck sets the bronze giant astride the harbour mouth, one foot on each mole, while small ships pass beneath his legs into the port. The conceit is historically false—the real Colossus never spanned the entrance—but it captures the older truth the print means to flatter: whoever stands over the narrows commands everything that would sail through them.",
        source: "Engraving, publ. Philips Galle",
        href: "https://commons.wikimedia.org/wiki/File:Colossus_of_Rhodes.jpg",
      },
    ],
  },
  {
    slug: "mamdani-slate-sweeps-new-york-primaries",
    headline:
      "Mamdani-backed candidates sweep New York's Democratic primaries",
    overview:
      "Candidates backed by Zohran Mamdani swept New York's Democratic primaries, ousting two incumbents from Congress, while a scion of the Kennedy family lost a crowded, expensive race. A generation that ran the city's politics is being shown the door.",
    genre: "Politics",
    sources: [
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMimwFBVV95cUxQY0lqaEZQNlNDM2hCUEZvTXdfMmZ0R050aTZWOUlsR0RYZWQ5ZkUwcHJkd0FyOHBqOG9kS1o0MF9GeWpqd0M0ajdqOE5vWXZxb1VsZUhrSzFjaG1xbkNNZTc4aGpIYXoxQjVIX3dKVXBraUEwVHh0Ny1PREtLR3dETXRxWG9KNVNaVHBmRURhdjloVk5TS2lwbzVDcw?oc=5",
      },
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/clye652m41po",
      },
    ],
    href: "#",
    publishedAt: "2026-06-24",
    image: {
      src: "/covers/mamdani-slate-sweeps-new-york-primaries.png",
      alt: "An election night, a changing of the guard",
      credit: "BBC",
    },
    rank: 4,
    analogies: [
      {
        category: "historical",
        title: "The fall of Boss Tweed and Tammany Hall, New York (1871)",
        excerpt: "I don't care who does the electing, so long as I get to do the nominating.",
        source: "William M. Tweed, Wikiquote",
        href: "https://en.wikiquote.org/wiki/William_M._Tweed",
      },
      {
        category: "historical",
        title: "Plutarch, Life of Tiberius Gracchus, ch. 9 (Perrin trans., 1921)",
        excerpt: "The wild beasts that roam over Italy have every one of them a cave or lair to lurk in; but the men who fight and die for Italy enjoy the common air and light, indeed, but nothing else; houseless and homeless they wander about with their wives and children.",
        source: "Perseus Digital Library",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0065:chapter=9",
      },
      {
        category: "literary",
        title: "Shakespeare, Henry IV, Part 2, Act V, Scene 5 (c. 1597)",
        excerpt: "I know thee not, old man: fall to thy prayers; How ill white hairs become a fool and jester! I have long dream'd of such a kind of man, So surfeit-swell'd, so old and so profane; But, being awaked, I do despise my dream.",
        source: "The Complete Works of Shakespeare (MIT)",
        href: "https://shakespeare.mit.edu/2henryiv/2henryiv.5.5.html",
      },
      {
        category: "literary",
        title: "Ecclesiastes 1:4, King James Version (1611)",
        excerpt: "One generation passeth away, and another generation cometh: but the earth abideth for ever.",
        source: "Wikisource",
        href: "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
      },
      {
        category: "artistic",
        title: "Thomas Nast, \"The Tammany Tiger Loose,\" Harper's Weekly (Nov. 11, 1871), wood engraving",
        excerpt: "The Tammany Tiger Loose—'What are you going to do about it?'",
        source: "Wikimedia Commons",
        href: "https://commons.wikimedia.org/wiki/File:Nast-Tammany.jpg",
        image: {
          src: "/covers/mamdani-slate-sweeps-new-york-primaries--a4.png",
          alt: "Thomas Nast, “The Tammany Tiger Loose”",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "\"The World Turned Upside Down,\" English broadside ballad (1646)",
        excerpt: "Yet let's be content, and the times lament, you see the world turn'd upside down.",
        source: "Wikipedia (Thomason Tracts, 8 April 1646)",
        href: "https://en.wikipedia.org/wiki/The_World_Turned_Upside_Down",
      },
    ],
  },
  {
    slug: "ukraine-strikes-rail-bridge-to-isolate-crimea",
    headline:
      "Ukraine strikes a railway bridge to cut supplies to Crimea",
    overview:
      "Ukraine says it struck a railway bridge carrying supplies toward Crimea, part of a campaign to isolate the Russian-held peninsula, as Sevastopol and occupied Kherson reported power outages. The aim is older than the weapons: sever the line and the held ground starves.",
    genre: "Conflict",
    sources: [
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMiowFBVV95cUxQd1VSejl2SUhJMm5fZDVLcW84X0FKOUpnc0tKUHVSYkNLR3lxY1JFNFBRTE50RkgxcVRJY1hMR0VQVGlkcWRIaldSNjZDbnRPQW44R2dLWFdoWGV2c2lHVGNpWWxxU2xIdHhSTWVya2xXUElVb3M1NFRjdk9SWjN3Y3JjUjRza3kyX0pIOTVHOWVMdnlHWVVET0d5SWNKV25HLWlZ?oc=5",
      },
      {
        name: "Euronews",
        href: "https://www.euronews.com/my-europe/2026/06/23/ukraine-says-key-crimea-rail-bridge-no-longer-exists-after-drone-strikes",
      },
    ],
    href: "#",
    publishedAt: "2026-06-23",
    image: {
      src: "/covers/ukraine-strikes-rail-bridge-to-isolate-crimea.png",
      alt: "A severed railway bridge at dusk",
      credit: "Euronews",
    },
    rank: 5,
    analogies: [
      {
        category: "historical",
        title: "Sherman's Memoirs, on the March to the Sea and the twisting of the rails (1864)",
        excerpt: "The best and easiest way is the one I have described, of heating the middle of the iron-rails on bonfires made of the cross-ties, and then winding them around a telegraph-pole or the trunk of some convenient sapling.",
        source: "Memoirs of Gen. W. T. Sherman, Vol. II (Project Gutenberg)",
        href: "https://www.gutenberg.org/files/5853/5853-h/5853-h.htm",
      },
      {
        category: "historical",
        title: "Caesar, The Gallic War, Book VII.68 — the circumvallation of Alesia (52 BC)",
        excerpt: "On reconnoitering the situation of the city, finding that the enemy were panic-stricken, because the cavalry in which they placed their chief reliance, were beaten, he encouraged his men to endure the toil, and began to draw a line of circumvallation round Alesia.",
        source: "Perseus Digital Library (McDevitte & Bohn trans.)",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0001:book=7:chapter=68",
      },
      {
        category: "literary",
        title: "Homer, Iliad, Book XII — the Achaean wall and trench fail to hold (8th c. BC)",
        excerpt: "So then amid the huts the valiant son of Menoetius was tending the wounded Eurypylus, but the others, Argives and Trojans, fought on in throngs, nor were the ditch of the Danaans and their wide wall above long to protect them.",
        source: "Perseus Digital Library (A. T. Murray trans.)",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=12:card=1",
      },
      {
        category: "literary",
        title: "Tasso, Jerusalem Delivered — the drought that withers the besiegers' water (Fairfax trans., 1600)",
        excerpt: "And little Siloe that his store bestows / Of purest crystal on the Christian bands, / The pebbles naked in his channel shows / And scantly glides above the scorched sands.",
        source: "Jerusalem Delivered, trans. Edward Fairfax (Project Gutenberg)",
        href: "https://www.gutenberg.org/files/392/392-h/392-h.htm",
      },
      {
        category: "artistic",
        title: "George N. Barnard, 'Sherman's men destroying railroad,' Atlanta (photograph, 1864)",
        excerpt: "Soldiers stand along a torn-up line outside Atlanta, the rails levered loose and the ties stacked to burn — the photograph fixes the precise act behind this week's bridge strike: not a battle won, but a lifeline severed, the held ground quietly left to wither. Logistics, the war's silent arbiter, made visible.",
        source: "Library of Congress / Wikimedia Commons",
        href: "https://commons.wikimedia.org/wiki/File:Sherman_railroad_destroy.jpg",
        image: {
          src: "/covers/ukraine-strikes-rail-bridge-to-isolate-crimea--a4.png",
          alt: "Sherman's men destroying the railroad, 1864",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "J. B. Elliott, 'Scott's Great Snake' — the Anaconda Plan to strangle the Confederacy (lithograph, 1861)",
        excerpt: "A great serpent labeled with Winfield Scott's coastal blockade and Mississippi thrust coils around the seceded South, its body a tightening ring meant to cut the Confederacy off from what fed it and squeeze until its breath gave out. The cartoon makes the event's own logic plain: to break a place, ring it and starve it.",
        source: "Library of Congress, Geography and Map Division",
        href: "https://www.loc.gov/item/99447020",
      },
    ],
  },
  {
    slug: "a-single-fault-halts-all-of-germanys-trains",
    headline:
      "An IT failure briefly halts Germany's entire rail network",
    overview:
      "Germany's rail network was briefly halted nationwide after an IT and communications malfunction, stranding trains across the country before service resumed. A single point of failure showed how much of modern life rests on one quietly humming system.",
    genre: "Technology",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/crm0ek4z7ggo",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMiwgFBVV95cUxORmdjb1p0RTZETDI1XzhnSjJpTnpRSkJuSENLLU5ZQmQ2emZ5QjVLZWhxdS1MQXFIZUk4OVdITVpPdjAxS1E5eUxCWTFIX2NrVEtOUjFmek5NM1REUWR0LUl3ZW83VFhCYlFyTER3ZnlfVEVLYldpWGk2UXQ1Z0h0ekhPalFoTS1yLVB0cjgwOFF1OEdYcDhXVk0xSmJXQ05XM3NKOUZ5Mlo1UkpTaDJjYjExMC1xZ25hTW1BbmNfdS1rUQ?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-24",
    image: {
      src: "/covers/a-single-fault-halts-all-of-germanys-trains.png",
      alt: "An empty platform beneath a stopped clock",
      credit: "BBC",
    },
    rank: 6,
    analogies: [
      {
        category: "historical",
        title: "The Northeast Blackout of November 9, 1965",
        excerpt: "The safety relay had been misprogrammed, and it did what it had been asked to do: to disconnect under the loads it perceived. Instantly, the load that was flowing on the tripped line redistributed to the other lines, causing them to become overloaded. Their own protective relays, which are also designed to protect the lines from overload, tripped, isolating Beck Station.",
        source: "Wikipedia (Federal Power Commission findings)",
        href: "https://en.wikipedia.org/wiki/Northeast_blackout_of_1965",
      },
      {
        category: "historical",
        title: "The AT&T Long-Distance Network Collapse, January 15, 1990",
        excerpt: "The problem repeated iteratively throughout the 114 switches in the network, blocking over 50 million calls in the nine hours it took to stabilize the system. ... Because every switch contained the same software, the resets cascaded down the network, incapacitating the system.",
        source: "Cal Poly, \"All Circuits Are Busy Now\"",
        href: "https://users.csc.calpoly.edu/~jdalbey/SWE/Papers/att_collapse",
      },
      {
        category: "literary",
        title: "E. M. Forster, \"The Machine Stops\" (1909), Chapter III",
        excerpt: "But there came a day when, without the slightest warning, without any previous hint of feebleness, the entire communication-system broke down, all over the world, and the world, as they understood it, ended.",
        source: "Wikisource",
        href: "https://en.wikisource.org/wiki/The_Machine_Stops/Chapter_III",
      },
      {
        category: "literary",
        title: "Benjamin Franklin, \"The Way to Wealth\" (1758)",
        excerpt: "A little neglect may breed great mischief; for want of a nail the shoe was lost; for want of a shoe the horse was lost; and for want of a horse the rider was lost; being overtaken and slain by the enemy; all for want of a little care about a horse-shoe nail.",
        source: "Project Gutenberg",
        href: "https://www.gutenberg.org/files/43855/43855-h/43855-h.htm",
      },
      {
        category: "artistic",
        title: "Pieter Bruegel the Elder, \"The Tower of Babel\" (1563, oil on panel)",
        excerpt: "And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another's speech.",
        source: "Kunsthistorisches Museum, Vienna (text: Genesis 11, KJV)",
        href: "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)",
        image: {
          src: "/covers/a-single-fault-halts-all-of-germanys-trains--a4.png",
          alt: "Bruegel, “The Tower of Babel”",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "François-Bernard Lépicié after Chardin, \"Le Château de cartes\" (1743, engraving)",
        excerpt: "Aimable Enfant que le plaisir décide, / Nous badinons de vos frêles travaux: / Mais entre nous, quel est le plus solide. / De nos projets ou bien de vos châteaux.",
        source: "Harvard Art Museums",
        href: "https://harvardartmuseums.org/collections/object/354739",
      },
    ],
  },
  {
    slug: "anthropics-mythos-model-breaches-classified-systems",
    headline:
      "Anthropic's Mythos AI found vulnerabilities in classified US systems",
    overview:
      "Anthropic's Mythos model found vulnerabilities in classified US government systems, according to reports — an AI turning its attention to the very defenses meant to be impregnable. The tool built to help now reads every door, and the question is who holds the key.",
    genre: "Technology",
    sources: [
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQTEx4cERSZUZNYkRrVFVLVXpTRlh0NDNnZEF5OGg1cXI4WGwweDdzdFM0dFVUZ3YwWXNTUEVjZHhyWUJLWTlFVUw4eXREaG8wbDZaVFFpb0owVE9RbjhTN3JrYUoycGpqamRkd3lmTDRZaUNvUmEwTXhDNHZKU1hjTWkza2hvTWVCYURISXN2eVMtcXhybldMVVBrTV9KS01rRVJPUFpGcHA2LWtKTEZQbHdYS1E0YWVkcUI4SXNvdXg?oc=5",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMivwFBVV95cUxOYkVjS1FaVVQ2OWktYzZzT0kzdHZGVWE0eks1bnp4VFdQbzlHWlRMQUNaSWNPVkpWdURmbFdrOEJkQ09kMlQxNk9EZEtsVEZLNG5GeG9FanpjblBON194Y3UzUlVNUDE3SkVZTWExU2VCUHZGVlkybVFURFFzdXJVQWlobmYxeFRoalFpM1A5ZWNDQ2FNZnlkUXBObmpyMHkzVHpwWEJKT0ZJRk9OdjZGYkFhSEVwSHpsU0ZIR2Jobw?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-24",
    image: {
      src: "/covers/anthropics-mythos-model-breaches-classified-systems.png",
      alt: "A vault door standing ajar",
      credit: "Wikimedia Commons",
    },
    rank: 7,
    analogies: [
      {
        category: "historical",
        title: "The Oracle of Delphi answers Croesus — Herodotus, Histories I.53 (5th c. BC)",
        excerpt: "Both the oracles agreed in the tenor of their reply, which was in each case a prophecy that if Croesus attacked the Persians, he would destroy a mighty empire, and a recommendation to him to look and see who were the most powerful of the Greeks, and to make alliance with them.",
        source: "Herodotus, Histories (Rawlinson trans.)",
        href: "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_1",
      },
      {
        category: "historical",
        title: "The Zimmermann Telegram, decrypted by British cryptanalysts (January 1917)",
        excerpt: "We intend to begin on the first of February unrestricted submarine warfare. We shall endeavor in spite of this to keep the United States of America neutral.",
        source: "U.S. National Archives",
        href: "https://www.archives.gov/milestone-documents/zimmermann-telegram",
      },
      {
        category: "literary",
        title: "Virgil, Aeneid, Book II — the Wooden Horse enters Troy (19 BC)",
        excerpt: "Ourselves did make a breach within our walls and opened wide the ramparts of our city. … till o'er our walls the fatal engine climbed, pregnant with men-at-arms.",
        source: "Virgil, Aeneid II (Williams trans., Perseus)",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0054:book=2:card=234",
      },
      {
        category: "literary",
        title: "Aeschylus, Prometheus Bound — the forbidden gift of letters and number (5th c. BC)",
        excerpt: "Yes, and numbers, too, chiefest of sciences, I invented for them, and the combining of letters, creative mother of the Muses' arts, with which to hold all things in memory.",
        source: "Aeschylus, Prometheus Bound (Smyth trans., Perseus)",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=436",
      },
      {
        category: "artistic",
        title: "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy (oil on canvas, c. 1760)",
        excerpt: "Tiepolo paints the moment of the breach made festival: the great wooden horse, taller than the gatehouse, is hauled through Troy's broken wall by a jubilant crowd who mistake their undoing for a triumph. The fortified city, receding into bright Roman stonework behind, has opened its own defenses to the engine of its ruin.",
        source: "National Gallery, London / Wikimedia Commons",
        href: "https://www.nationalgallery.org.uk/paintings/giovanni-domenico-tiepolo-the-procession-of-the-trojan-horse-into-troy",
        image: {
          src: "/covers/anthropics-mythos-model-breaches-classified-systems--a4.png",
          alt: "Tiepolo, “The Procession of the Trojan Horse into Troy”",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "Goethe, \"Prometheus\" — ode of defiant creation (written c. 1773, published 1789)",
        excerpt: "Here sit I, forming mortals After my image; A race resembling me, To suffer, to weep, To enjoy, to be glad, And thee to scorn, As I!",
        source: "The Works of J. W. von Goethe, Vol. 9 (Wikisource)",
        href: "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/Prometheus",
      },
    ],
  },
  {
    slug: "parthenons-restored-west-facade-unveiled",
    headline:
      "The Parthenon's restored west facade is unveiled in Athens",
    overview:
      "Restorers in Athens unveiled the Parthenon's western facade, freed of scaffolding and partly recomposed from its scattered stones. Each replaced block reopens an old question: how much of a ruin can be remade before it becomes something new.",
    genre: "Culture",
    sources: [
      {
        name: "Artforum",
        href: "https://www.artforum.com/news/western-facade-of-the-parthenon-restored-and-unobstructed-1234752681/",
      },
      {
        name: "Euronews",
        href: "https://www.euronews.com/culture/2026/06/18/keeping-up-appearances-greece-reveals-parthenon-facade-after-220-years",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/parthenons-restored-west-facade-unveiled.png",
      alt: "The Parthenon freed of its scaffolding",
      credit: "Artforum",
    },
    rank: 8,
    analogies: [
      {
        category: "historical",
        title: "Plutarch, Life of Pericles (on the building of the Parthenon), c. 100 CE",
        excerpt: "For every particular piece of his work was immediately, even at that time, for its beauty and elegance, antique; and yet in its vigor and freshness looks to this day as if it were just executed. There is a sort of bloom of newness upon those works of his, preserving them from the touch of time, as if they had some perennial spirit and undying vitality mingled in the composition of them.",
        source: "Plutarch, Lives (Dryden–Clough), Wikisource",
        href: "https://en.wikisource.org/wiki/Plutarch's_Lives_(Clough)/Life_of_Pericles",
      },
      {
        category: "historical",
        title: "Lord Elgin's removal of the Parthenon marbles, 1801–1812 (the contested ownership)",
        excerpt: "Between 1801 and 1812, agents of Thomas Bruce, 7th Earl of Elgin, removed about half of the surviving sculptures of the Parthenon, as well as architectural members and sculpture from the Propylaea and Erechtheum; to facilitate transport, members were sawn and sliced into smaller sections. Greece has disputed the British Museum's ownership ever since, holding that the sculptures were taken unethically and should be reunited with those in the Acropolis Museum.",
        source: "Elgin Marbles, Wikipedia (overview of primary record)",
        href: "https://en.wikipedia.org/wiki/Elgin_Marbles",
      },
      {
        category: "literary",
        title: "Plutarch, Life of Theseus (the Ship of Theseus), c. 100 CE",
        excerpt: "The ship wherein Theseus and the youth of Athens returned had thirty oars, and was preserved by the Athenians down even to the time of Demetrius Phalereus, for they took away the old planks as they decayed, putting in new and stronger timber in their place, insomuch that this ship became a standing example among the philosophers, for the logical question as to things that grow; one side holding that the ship remained the same, and the other contending that it was not the same.",
        source: "Plutarch, Lives (Dryden–Clough), Wikisource",
        href: "https://en.wikisource.org/wiki/Plutarch's_Lives_(Clough)/Life_of_Theseus",
      },
      {
        category: "literary",
        title: "Percy Bysshe Shelley, \"Ozymandias\" (sonnet, 1818)",
        excerpt: "And on the pedestal these words appear: \"My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!\" Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare The lone and level sands stretch far away.",
        source: "Shelley, \"Ozymandias,\" Wikisource",
        href: "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias",
      },
      {
        category: "artistic",
        title: "Frederic Edwin Church, The Parthenon (oil on canvas, 1871)",
        excerpt: "Church visited Greece in 1869 and made numerous studies of the ruined Acropolis at dusk; the resulting 1871 canvas, now in the Metropolitan Museum of Art, sets the bare temple against a reddening sky, its foreground strewn with fallen capitals and column drums. The picture treats the Parthenon not as it once stood but as a luminous ruin, a monument whose grandeur is inseparable from its decay.",
        source: "The Parthenon (painting), Metropolitan Museum of Art via Wikipedia",
        href: "https://en.wikipedia.org/wiki/The_Parthenon_(painting)",
        image: {
          src: "/covers/parthenons-restored-west-facade-unveiled--a4.png",
          alt: "Frederic Church, “The Parthenon”",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "The Parthenon Frieze by Phidias (marble relief, c. 443–437 BCE)",
        excerpt: "It was sculpted between c. 443 and 437 BC, most likely under the direction of Phidias, and the more accepted view is that it depicts the Greater Panathenaic procession. Fifty-six blocks of the frieze are at the British Museum in London (forming the major part of the Elgin Marbles); forty blocks are in the Acropolis Museum in Athens, and the remainder of fragments are shared between six other institutions.",
        source: "Parthenon Frieze, Wikipedia (British Museum / Acropolis Museum)",
        href: "https://en.wikipedia.org/wiki/Parthenon_Frieze",
      },
    ],
  },
  {
    slug: "picasso-richter-hockney-top-art-basel-2026",
    headline:
      "Picasso, Richter and Hockney top the sales at Art Basel 2026",
    overview:
      "Works by Picasso, Richter and Hockney drew the largest sums at Art Basel 2026, the fair where the value of art is set in public, in real time. The spectacle is part market, part theater: a painting becomes worth exactly what the room will say out loud.",
    genre: "Culture",
    sources: [
      {
        name: "Artforum",
        href: "https://www.artforum.com/news/picasso-richter-and-hockney-earn-at-art-basel-2026-1234752945/",
      },
      {
        name: "ARTnews",
        href: "https://www.artnews.com/list/art-news/market/top-sales-art-basel-1234789900/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-23",
    image: {
      src: "/covers/picasso-richter-hockney-top-art-basel-2026.png",
      alt: "A fair of priceless canvases",
      credit: "Artforum",
    },
    rank: 9,
    analogies: [
      {
        category: "historical",
        title: "The Tulipomania, Holland, 1636–37 (Charles Mackay, 1841)",
        excerpt: "Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips. People of all grades converted their property into cash, and invested it in flowers. At first, as in all these gambling mania, confidence was at its height, and every body gained.",
        source: "Mackay, Extraordinary Popular Delusions",
        href: "https://www.econlib.org/library/Mackay/macEx.html?chapter_num=4",
      },
      {
        category: "historical",
        title: "Vasari on Lorenzo de' Medici's patronage and garden of antiquities (Lives, Life of Torrigiano, 1568)",
        excerpt: "Truly magnificent was the example thus given by Lorenzo, and whenever Princes and other persons of high degree choose to imitate it, they will always gain everlasting honour and glory thereby; since he who assists and favors, in their noble undertakings, men of rare and beautiful genius, from whom the world receives such beauty, honour, convenience and benefit, deserves to live forever in the minds and memories of mankind.",
        source: "Vasari, Lives of the Most Eminent Painters",
        href: "https://www.italianrenaissanceresources.com/units/unit-3/sub-page-03/giorgio-vasaris-description-of-the-medici-academy/",
      },
      {
        category: "literary",
        title: "Honoré de Balzac, \"The Unknown Masterpiece\" (Le Chef-d'œuvre inconnu, 1831)",
        excerpt: "\"I like your saint,\" the old man remarked, addressing Porbus. \"I would give you ten golden crowns for her over and above the price the Queen is paying; but as for putting a spoke in that wheel,--the devil take it!\"",
        source: "Balzac, The Unknown Masterpiece (Project Gutenberg)",
        href: "https://www.gutenberg.org/ebooks/23060",
      },
      {
        category: "literary",
        title: "Oscar Wilde, \"The Picture of Dorian Gray\" (1890), Lord Henry on price and value",
        excerpt: "\"So sorry I am late, Dorian. I went to look after a piece of old brocade in Wardour Street and had to bargain for hours for it. Nowadays people know the price of everything and the value of nothing.\"",
        source: "Wilde, The Picture of Dorian Gray (Project Gutenberg)",
        href: "https://www.gutenberg.org/files/174/174-h/174-h.htm",
      },
      {
        category: "artistic",
        title: "Adriaen van Utrecht, \"Vanitas — Still Life with Bouquet and Skull\" (oil on canvas, c. 1642)",
        excerpt: "The Flemish vanitas heaps the spoils of worldly fortune—coins and jewels, a bouquet already wilting, books and a wine glass—around a human skull, so that the eye is invited to price the riches and then reminded that none of it can be kept. It is the seventeenth century's answer to the saleroom: a painting that puts a market on display only to weigh it against the grave.",
        source: "Wikimedia Commons (public domain)",
        href: "https://commons.wikimedia.org/wiki/File:Adriaen_van_Utrecht-_Vanitas_-_Still_Life_with_Bouquet_and_Skull.JPG",
        image: {
          src: "/covers/picasso-richter-hockney-top-art-basel-2026--a4.png",
          alt: "Adriaen van Utrecht, “Vanitas Still Life”",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "Quentin Matsys, \"The Moneylender and His Wife\" (oil on panel, 1514, Musée du Louvre)",
        excerpt: "Matsys sets a money-changer weighing gold coins and pearls on a balance while his wife, a book of devotion open before her, lets her eyes drift from the Virgin and Child toward the glittering scales. A convex mirror on the table catches the wider world; the panel turns the act of pricing precious things into a moral spectacle, beauty and devotion forever tilting against the weight of the coin.",
        source: "Wikipedia / Wikimedia Commons (public domain)",
        href: "https://en.wikipedia.org/wiki/The_Money_Changer_and_His_Wife",
      },
    ],
  },
  {
    slug: "klara-and-the-sun-trailer-arrives",
    headline:
      "First trailer arrives for the film of Ishiguro’s “Klara and the Sun”",
    overview:
      "The first trailer arrived for the film of Kazuo Ishiguro's “Klara and the Sun,” narrated by an artificial friend who studies human feeling from the outside. The story asks the old question in a new casing: what do we owe the things we make to care for us?",
    genre: "Culture",
    sources: [
      {
        name: "Kottke",
        href: "https://kottke.org/26/06/0049195-the-trailer-for-klara-and",
      },
      {
        name: "Variety",
        href: "https://variety.com/2026/film/news/klara-and-the-sun-trailer-jenna-ortega-taika-waititi-1235997680/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/klara-and-the-sun-trailer-arrives.png",
      alt: "An artificial figure turned toward the sun",
      credit: "Variety",
    },
    rank: 10,
    analogies: [
      {
        category: "historical",
        title: "Babylonian Talmud, Sanhedrin 65b — Rava's golem (c. 5th–6th c. CE)",
        excerpt: "Indeed, Rava created a man, a golem, using forces of sanctity. Rava sent his creation before Rabbi Zeira. Rabbi Zeira would speak to him but he would not reply. Rabbi Zeira said to him: You were created by one of the members of the group, one of the Sages. Return to your dust.",
        source: "Sefaria (William Davidson Talmud)",
        href: "https://www.sefaria.org/Sanhedrin.65b.16",
      },
      {
        category: "historical",
        title: "Jacques de Vaucanson, \"An Account of the Mechanism of an Automaton\" (London, 1742)",
        excerpt: "Together with a description of an artificial duck, eating, drinking, macerating the food, and voiding excrements; pluming her wings, picking her feathers, and performing several operations in imitation of a living duck.",
        source: "Internet Archive",
        href: "https://archive.org/details/b30358711",
      },
      {
        category: "literary",
        title: "Mary Shelley, \"Frankenstein; or, The Modern Prometheus,\" Chapter 10 (1831)",
        excerpt: "Every where I see bliss, from which I alone am irrevocably excluded. I was benevolent and good; misery made me a fiend. Make me happy, and I shall again be virtuous.",
        source: "Wikisource",
        href: "https://en.wikisource.org/wiki/Frankenstein,_or_the_Modern_Prometheus_(Revised_Edition,_1831)/Chapter_10",
      },
      {
        category: "literary",
        title: "Carlo Collodi, \"The Adventures of Pinocchio,\" Chapter 36 (1883; Eng. trans. 1904)",
        excerpt: "How funny I was when I was a marionette! and how happy I am now that I have become a real live boy!",
        source: "Wikisource",
        href: "https://en.wikisource.org/wiki/The_Adventures_of_Pinocchio_(1904)/Chapter_36",
      },
      {
        category: "artistic",
        title: "Jean-Léon Gérôme, \"Pygmalion and Galatea,\" oil on canvas (c. 1890), Metropolitan Museum of Art",
        excerpt: "The ivory seemed to soften at the touch, and its firm texture yielded to his hand, as honey-wax of Mount Hymettus turns to many shapes when handled in the sun... Now real, true to life— the maiden felt the kisses given to her, and blushing, lifted up her timid eyes, so that she saw the light and sky above, as well as her rapt lover while he leaned gazing beside her.",
        source: "Wikimedia Commons / The Met",
        href: "https://commons.wikimedia.org/wiki/File:WLA_metmuseum_Jean-Leon_Gerome_Pygmalion_and_Galatea.jpg",
        image: {
          src: "/covers/klara-and-the-sun-trailer-arrives--a4.png",
          alt: "Gérôme, “Pygmalion and Galatea”",
          credit: "Wikimedia Commons (The Metropolitan Museum of Art)",
        },
      },
      {
        category: "artistic",
        title: "The beloved automaton Olympia — source of Delibes's ballet \"Coppélia\" (1870); after E.T.A. Hoffmann, \"The Sand-Man\" (1816)",
        excerpt: "And it was only when at last Nathanael rose and kissed her lips or her hand that she said, \"Ach! Ach!\" and then \"Good-night, dear.\" Arrived in his own room, Nathanael would break out with, \"Oh! what a brilliant—what a profound mind! Only you—you alone understand me.\"",
        source: "Project Gutenberg Australia",
        href: "https://gutenberg.net.au/ebooks06/0605791h.html",
      },
    ],
  },
  {
    slug: "aaltos-paimio-sanatorium-to-become-a-hotel",
    headline:
      "Aalto’s Paimio Sanatorium will be converted into a hotel by Snøhetta",
    overview:
      "Alvar and Aino Aalto's Paimio Sanatorium, a landmark of healing modernism designed down to the patients' basins, will be converted into a hotel by Snøhetta. A building made to mend the sick will now be asked to rest the well.",
    genre: "Culture",
    sources: [
      {
        name: "Dezeen",
        href: "https://www.dezeen.com/2026/06/23/aaltos-paimio-sanatorium-set-to-be-turned-into-future-oriented-hotel-by-snohetta/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-23",
    image: {
      src: "/covers/aaltos-paimio-sanatorium-to-become-a-hotel.png",
      alt: "A white modernist sanatorium among pines",
      credit: "Wikimedia Commons",
    },
    rank: 11,
    analogies: [
      {
        category: "historical",
        title: "Augustus J. C. Hare on the Baths of Diocletian remade as a church (Walks in Rome, vol. II, 1874)",
        excerpt: "Pius IV, declaring that angel-worship had never been sanctioned by the Church, except under the three names mentioned in Scripture, ordered the pictures of Del Duca to be taken away. At the same time he engaged Michael Angelo to convert the great oblong hall of the Baths (Calidarium) into a church.",
        source: "Augustus J. C. Hare, Walks in Rome (Internet Archive)",
        href: "https://archive.org/details/harewalksinrome02hare",
      },
      {
        category: "historical",
        title: "Francis Aidan Gasquet, \"Suppression of English Monasteries under Henry VIII\" (Catholic Encyclopedia, 1913)",
        excerpt: "that what had been a monument of architectural beauty in the past was now a \"bare roofless choir, where late the sweet birds sang.\"",
        source: "Catholic Encyclopedia (1913), Wikisource",
        href: "https://en.wikisource.org/wiki/Catholic_Encyclopedia_(1913)/Suppression_of_English_Monasteries_under_Henry_VIII",
      },
      {
        category: "literary",
        title: "Thomas Mann, Der Zauberberg, Erster Band (1924), \"Ankunft\"",
        excerpt: "Heimat und Ordnung lagen nicht nur weit zurück, sie lagen hauptsächlich klaftertief unter ihm, und noch immer stieg er darüber hinaus. [Homeland and order lay not only far behind, they lay above all fathoms-deep beneath him, and still he kept climbing higher above them — Hans Castorp ascending toward the mountain sanatorium, a world apart from the flatland below.]",
        source: "Project Gutenberg (German, public domain)",
        href: "https://www.gutenberg.org/ebooks/65661",
      },
      {
        category: "literary",
        title: "Frances Hodgson Burnett, The Secret Garden (1911), ch. XXI",
        excerpt: "\"I shall get well! I shall get well!\" he cried out. \"Mary! Dickon! I shall get well! And I shall live forever and ever and ever!\"",
        source: "Project Gutenberg",
        href: "https://www.gutenberg.org/ebooks/113",
      },
      {
        category: "artistic",
        title: "Photograph of Paimio Sanatorium amid its forest (Aino and Alvar Aalto, 1933; photo 2022)",
        excerpt: "A distant view of the long white sanatorium set deep among pines — the building the Aaltos conceived as a medical instrument, sited apart from the world so that light, air, and silence might themselves do the curing. What was built to hold the tubercular now waits to hold the traveler; the world-apart endures, its purpose exchanged.",
        source: "Wikimedia Commons (CC0)",
        href: "https://commons.wikimedia.org/wiki/File:Paimio_sanatorium_covered_by_trees.jpg",
        image: {
          src: "/covers/aaltos-paimio-sanatorium-to-become-a-hotel--a4.png",
          alt: "Paimio Sanatorium among the pines",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "Caspar David Friedrich, The Abbey in the Oakwood (Abtei im Eichwald), oil on canvas, 1809–1810",
        excerpt: "Through bare oaks a procession of monks bears a coffin toward the shattered Gothic arch of a ruined abbey, the last upright fragment of a place once built for prayer and now a roofless skeleton against a wintry sky. Friedrich turns a building made for the care of souls into an image of what time does to such places — the function gone, the architecture left to mean something new. It is the sanatorium's question rendered in paint: what becomes of a house raised for healing once the healing is over.",
        source: "Alte Nationalgalerie, Berlin (Wikimedia Commons, public domain)",
        href: "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Abtei_im_Eichwald_-_Google_Art_Project.jpg",
      },
    ],
  },
  {
    slug: "ballista-spider-builds-a-spring-loaded-trap",
    headline:
      "Scientists discover an Australian spider that builds a spring-loaded trap",
    overview:
      "Researchers in the far-north Queensland rainforest have described a new spider — nicknamed the “ballista,” after the ancient catapult — that stores elastic energy in its silk and flings a single species of aggressive green tree ant into its web. The mechanics, filmed with high-speed cameras, appear in the journal Current Biology.",
    genre: "Science",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/c70y138y995o",
      },
      {
        name: "CNN",
        href: "https://www.cnn.com/2026/06/23/science/ballista-spider-trap-ant",
      },
    ],
    href: "#",
    publishedAt: "2026-06-23",
    image: {
      src: "/covers/ballista-spider-builds-a-spring-loaded-trap.png",
      alt: "A tiny spider beside its silk snare",
      credit: "BBC",
    },
    rank: 12,
    analogies: [
      {
        category: "historical",
        title: "Walter Scott, Tales of a Grandfather, ch. VIII — Robert the Bruce and the spider (1828)",
        excerpt: "The insect made the attempt again and again without success; and at length Bruce counted that it had tried to carry its point six times, and been as often unable to do so. It came into his head that he had himself fought just six battles against the English and their allies, and that the poor persevering spider was exactly in the same situation with himself, having made as many trials, and been as often disappointed in what it aimed at.",
        source: "Internet Archive (Scott, Tales of a Grandfather)",
        href: "https://archive.org/details/talesofgrandfath0001sirw",
      },
      {
        category: "historical",
        title: "Jean-Henri Fabre, The Life of the Spider, on the Narbonne Lycosa's burrow and ambush (trans. 1912)",
        excerpt: "Hiding behind the wall, she sees the stranger advancing, keeps her eyes on him and suddenly pounces when he comes within reach. These abrupt tactics make the thing a certainty.",
        source: "Project Gutenberg (Fabre, The Life of the Spider)",
        href: "https://readingroo.ms/1/8/8/1887/1887-h/1887-h.htm",
      },
      {
        category: "literary",
        title: "Ovid, Metamorphoses VI — the transformation of Arachne (trans. Brookes More, 1922)",
        excerpt: "Her slender fingers gathered to her sides as long thin legs; and all her other parts were fast absorbed in her abdomen—whence she vented a fine thread;—and ever since, Arachne, as a spider, weaves her web.",
        source: "Perseus Digital Library (Tufts)",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=6:card=129",
      },
      {
        category: "literary",
        title: "Mary Howitt, \"The Spider and the Fly\" (1829)",
        excerpt: "The Spider turned him round about, and went into his den, / For well he knew the silly Fly would soon come back again; / So he wove a subtle web in a little corner sly, / And set his table ready to dine upon the Fly.",
        source: "Wikisource",
        href: "https://en.wikisource.org/wiki/The_Spider_and_the_Fly_(Weed)",
      },
      {
        category: "artistic",
        title: "Odilon Redon, \"The Smiling Spider\" (lithograph after the charcoal noir, 1881/1887)",
        excerpt: "A bristling black orb of a body, perched on ten splayed legs, turns toward the viewer a broad human grin. Redon makes the ambusher genial: the thing that waits in the dark is given a face, and the face is pleased. The horror lies in its patience and its courtesy, the same lure the trapdoor offers the passerby.",
        source: "Wikimedia Commons (Musée du Louvre)",
        href: "https://commons.wikimedia.org/wiki/File:Redon_smiling-spider.jpg",
        image: {
          src: "/covers/ballista-spider-builds-a-spring-loaded-trap--a4.png",
          alt: "Odilon Redon, “The Smiling Spider”",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "Diego Velázquez, \"Las Hilanderas (The Fable of Arachne)\", oil on canvas (c. 1655–1660, Museo del Prado)",
        excerpt: "In the dim foreground women card and spin, a wheel blurred to a haze of spokes by the speed of the work; behind them, lit like a stage, the contest of mortal and goddess plays out before a woven tapestry. Velázquez folds the whole myth into a workshop—the labor of the thread and the doom it courts in one room. The weaver is at once artisan and quarry, her diligence the very thing that traps her.",
        source: "Wikimedia Commons (Museo del Prado)",
        href: "https://commons.wikimedia.org/wiki/File:Velazquez-las_hilanderas.jpg",
      },
    ],
  },
  {
    slug: "brexit-ten-years-on",
    headline:
      "Britain marks ten years since the Brexit referendum",
    overview:
      "A decade on from the referendum that took Britain out of the European Union, the anniversary brought fresh reckonings with what was promised and what arrived. The argument that was supposed to be settled by a single vote has outlived it.",
    genre: "Politics",
    sources: [
      {
        name: "Kottke",
        href: "https://kottke.org/26/06/0049189-brexit-vote-10-years-on",
      },
      {
        name: "Al Jazeera",
        href: "https://www.aljazeera.com/news/2026/6/23/brexit-10-years-on-what-has-changed-in-the-uk-explained-in-maps-and-charts",
      },
    ],
    href: "#",
    publishedAt: "2026-06-23",
    image: {
      src: "/covers/brexit-ten-years-on.png",
      alt: "A divided union, ten years on",
      credit: "Al Jazeera",
    },
    rank: 13,
    analogies: [
      {
        category: "historical",
        title: "Norwegian referendum on the dissolution of the union with Sweden (13 August 1905)",
        excerpt: "Voters were asked whether they approved the \"already completed dissolution of the union\" — \"den stedfundne Opløsning af Unionen.\" The result was 368,208 in favour to 184 against: 99.95 percent for the parting, 0.05 percent against. A union of nearly a century was undone by a single ballot, and what looked at the time like a clean break opened a long negotiation over crown, borders, and the terms of separate life.",
        source: "1905 union dissolution referendum",
        href: "https://en.wikipedia.org/wiki/1905_Norwegian_union_dissolution_referendum",
      },
      {
        category: "historical",
        title: "Livy, Ab Urbe Condita, Book 2.32 — the First Secession of the Plebs and Menenius Agrippa's fable (c. 494 BC; Foster trans., 1919)",
        excerpt: "\"In the days when man's members did not all agree amongst themselves, as is now the case, but had each its own ideas and a voice of its own, the other parts thought it unfair that they should have the worry and the trouble and the labour of providing everything for the belly, while the belly remained quietly in their midst with nothing to do but to enjoy the good things which they bestowed upon it.\" Resolving to starve it, the limbs starved themselves, \"and the whole body were reduced to the utmost weakness.\"",
        source: "Livy, History of Rome (Perseus)",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0151%3Abook%3D2%3Achapter%3D32",
      },
      {
        category: "literary",
        title: "Aesop, \"The Bundle of Sticks\" (Jacobs translation, The Fables of Æsop)",
        excerpt: "An old man on the point of death summoned his sons around him to give them some parting advice. He ordered his servants to bring in a faggot of sticks, and said to his eldest son: \"Break it.\" The son strained and strained, but with all his efforts was unable to break the Bundle. \"Untie the faggots,\" said the father, \"and each of you take a stick.\" When they had done so, he called out to them: \"Now, break,\" and each stick was easily broken. The moral: \"Union gives strength.\"",
        source: "Aesop's Fables (Wikisource)",
        href: "https://en.wikisource.org/wiki/The_Fables_of_%C3%86sop_(Jacobs)/The_Bundle_of_Sticks",
      },
      {
        category: "literary",
        title: "William Shakespeare, King Lear, Act 1, Scene 1 (c. 1606)",
        excerpt: "\"Know that we have divided / In three our kingdom, and 'tis our fast intent / To shake all cares and business from our age, / Conferring them on younger strengths, while we / Unburdened crawl toward death.\" The realm is parted in a single afternoon on a flush of promises; the long aftermath is storm, exile, and a king who learns too late what the dividing line has cost.",
        source: "King Lear (Folger Shakespeare)",
        href: "https://www.folger.edu/explore/shakespeares-works/king-lear/read/1/1/",
      },
      {
        category: "artistic",
        title: "Jacob Jordaens (after Rubens), The Golden Apple of Discord / The Wedding of Thetis and Peleus, oil on canvas, c. 1633",
        excerpt: "Into a wedding feast of the gods, Discord rolls a single golden apple inscribed \"to the fairest,\" and the goddesses fall to quarreling — the small, vain choice from which, the myth insists, a ten-year war and the ruin of a city would follow. Jordaens crowds the canvas with finery and gesture, the gleaming apple already loose among the guests: the seed of division dropped, lightly, at the very moment of supposed union.",
        source: "Wikimedia Commons (public domain)",
        href: "https://commons.wikimedia.org/wiki/File:Golden_Apple_of_Discord_by_Jacob_Jordaens.jpg",
        image: {
          src: "/covers/brexit-ten-years-on--a4.png",
          alt: "Jordaens, “The Golden Apple of Discord”",
          credit: "Wikimedia Commons",
        },
      },
      {
        category: "artistic",
        title: "Friedrich Schiller, \"An die Freude\" (Ode to Joy), 1785 — set by Beethoven and adopted as the Anthem of Europe",
        excerpt: "\"Deine Zauber binden wieder, / Was die Mode streng getheilt; / Alle Menschen werden Brüder, / Wo dein sanfter Flügel weilt.\" — \"Your magic binds again what custom strictly parted; all men become brothers where your gentle wing alights.\" The verses Europe chose for its anthem, sung wordlessly at every union ceremony, make a quiet irony of any nation that chooses, instead, to be parted again.",
        source: "Schiller, An die Freude (Wikisource)",
        href: "https://de.wikisource.org/wiki/An_die_Freude_(Schiller)",
      },
    ],
  },
  {
    slug: "starmer-to-resign-as-uk-prime-minister",
    headline:
      "Keir Starmer says he will resign as UK prime minister",
    overview:
      "Keir Starmer says he will step down as UK prime minister, throwing British politics open again as the party turns to who comes next, with Andy Burnham among the names. The exit resets a government still early in its term.",
    genre: "Politics",
    sources: [
      {
        name: "NPR",
        href: "https://www.npr.org/2026/06/22/nx-s1-5866231/keir-starmer-resigns",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMiswFBVV95cUxQNGtvWjFQWS1WTXM2ZkZHM0Jaei1QaEl4OF9NVXdQdEF1UVFPamVfX2VVd2ZkaDh0RG9OMTNIRUxBd3F2S0ZGWkl0Nzg1REc0b1pKQWFtb2hzZHFZaEpEZFV4UVBhWWV6YV9YdUNKVFNHdzBUUUFKb1RYczNKaTI4aVRWMDBCWU8yc3kyM29lNlUtR0ttTXhlZ01zZXVpT2hYNjlGZ3JKbGtKWVVSQkdTZXdyQQ?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/starmer-to-resign-as-uk-prime-minister.png",
      alt: "A leader stepping down from high office",
      credit: "Wikimedia Commons",
    },
    rank: 14,
    analogies: [
      {
        category: "historical",
        title: "Cincinnatus lays down the dictatorship, 458 BCE",
        excerpt:
          "Called from his plough to rescue Rome, he took absolute power, won his war, and within days handed the office back and walked home to the field. Rome kept his name for centuries less for the victory than for the leaving. The rarest measure of a ruler is how lightly he holds on.",
        source: "Roman history",
        href: "https://www.gutenberg.org/ebooks/19725",
      },
      {
        category: "historical",
        title: "Diocletian retires to his garden, 305 CE",
        excerpt:
          "The emperor who had reorganized the whole Roman world simply stepped down and took up gardening on the Dalmatian coast. Pressed later to return to power, he is said to have answered that if they could see the cabbages he had grown they would never ask. Authority, for once, treated as a thing one could be finished with.",
        source: "Roman history",
        href: "https://www.gutenberg.org/ebooks/731",
      },
      {
        category: "literary",
        title: "Shakespeare, “Richard II”",
        excerpt:
          "A king unkings himself on stage, narrating his own undoing as he sets the crown down and asks what he is once the title is gone. The deposition scene turns resignation into a mirror held up to power, the moment the office is shown to outlive the man who filled it.",
        source: "History play, c. 1595",
        href: "https://www.folger.edu/explore/shakespeares-works/richard-ii/read/",
      },
      {
        category: "literary",
        title: "Sophocles, “Oedipus at Colonus”",
        excerpt:
          "The once all-powerful king arrives at the end stripped of office, blind and exiled, discovering what a leader becomes when the power is spent. Sophocles makes the aftermath of authority, not its exercise, the real subject of the play.",
        source: "Tragedy, 401 BCE",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0190",
      },
      {
        category: "artistic",
        title: "Mussorgsky, “Boris Godunov” (the death scene)",
        excerpt:
          "Undone by guilt and the long weight of rule, the tsar bids farewell to his son and lets the crown fall away from him. Power here ends not in triumph but in a slow, exhausted breath, the ruler smallest at the very moment he relinquishes the throne.",
        source: "Opera, 1874",
        href: "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)",
      },
      {
        category: "artistic",
        title: "Delaroche, “Napoleon at Fontainebleau, 31 March 1814”",
        excerpt:
          "The emperor sits slumped in a plain chair the morning of his first abdication, an entire collapsed campaign written into one posture. Delaroche paints supreme power not at its height but at the instant it drains out of a man, leaving only the tired body behind.",
        source: "Oil on canvas, 1845",
        href: "https://www.napoleon.org/en/history-of-the-two-empires/paintings/napoleon-i-at-fontainebleau-31-march-1814/",
      },
    ],
  },
  {
    slug: "us-eases-iran-oil-sanctions-as-tehran-denies-inspector-claim",
    headline:
      "US eases Iran oil sanctions as Tehran denies agreeing to inspections",
    overview:
      "Washington eased oil sanctions on Iran after talks in Switzerland, but Tehran publicly denied US claims that it had agreed to readmit nuclear inspectors. The central fact of the deal is now contested, with each side describing a different agreement.",
    genre: "Conflict",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/c3vy3nr63gxo",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMipgFBVV95cUxQeUJQNlpPSVpIZmFCR1pnckJLd25Eblo1OERBRFdscDFOOUZHbURVM2tNd1hPaHo5aHIxeExhbGt5R2RxZjFDMWhENm9GQnpadlRNQVg4QTN4ODBwRUNuVGNYLUt3YUdBODJSTXpEZHF3QjN0Zk1iVlVzdnhEblh3N0JkZUNTU3Q5QmxKdUEwTVc5LUd2czMxTC1FQVpDdnVvaWg2Tkh3?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-23",
    image: {
      src: "/covers/us-eases-iran-oil-sanctions-as-tehran-denies-inspector-claim.png",
      alt: "Adversaries at a contested negotiating table",
      credit: "BBC",
    },
    rank: 15,
    analogies: [
      {
        category: "historical",
        title: "The Reykjavík summit, 1986",
        excerpt:
          "Reagan and Gorbachev walked away from Iceland with no agreement and the talks branded a failure, yet almost everything that mattered had quietly shifted on the table that weekend. The arms deals that followed were written, in effect, in a room everyone had already called a collapse.",
        source: "Historical record",
        href: "https://nsarchive2.gwu.edu/NSAEBB/NSAEBB203/index.htm",
      },
      {
        category: "historical",
        title: "The Cuban Missile Crisis back channel, 1962",
        excerpt:
          "While public ultimatums hardened by the hour, the decisive bargain moved through a private channel the cameras never saw. Brinkmanship and negotiation ran on two clocks at once, and the version announced to the world was not quite the version that ended the crisis.",
        source: "Historical record",
        href: "https://nsarchive.gwu.edu/briefing-book/cuba-cuban-missile-crisis/2022-10-27/cuban-missile-crisis-60-most-dangerous-day",
      },
      {
        category: "literary",
        title: "Thucydides, the Melian Dialogue",
        excerpt:
          "The oldest surviving script for talks between a strong power and a weak one, where the mighty propose their terms and the weak must weigh survival against pride. Thucydides lets the asymmetry speak plainly, the powerful conceding nothing they are not forced to concede.",
        source: "History, 5th c. BCE",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=5:chapter=84",
      },
      {
        category: "literary",
        title: "Akutagawa, “In a Grove”",
        excerpt:
          "A single act is recounted by every witness in a different and irreconcilable way, until the truth dissolves into competing testimonies. It is the perfect shape for a deal where one side announces a concession and the other denies it was ever made.",
        source: "Short story, 1922",
        href: "https://www.aozora.gr.jp/cards/000879/card179.html",
      },
      {
        category: "artistic",
        title: "Picasso, “Dove of Peace”",
        excerpt:
          "A single line drawing of a bird, made for a peace congress, was asked to carry more hope than any one meeting could bear. The emblem endures precisely because the peace it stood for kept arriving late.",
        source: "Lithograph, 1949",
        href: "https://www.tate.org.uk/art/artworks/picasso-dove-p11366",
      },
      {
        category: "artistic",
        title: "Penderecki, “Threnody to the Victims of Hiroshima”",
        excerpt:
          "Fifty-two strings shriek and scrape at the edge of what instruments can do, rendering the stakes the negotiators are really bargaining against. The piece is the silence under every diplomatic communiqué made suddenly, unbearably audible.",
        source: "Composition, 1960",
        href: "https://www.wisemusicclassical.com/work/31499/Threnody-To-the-Victims-of-Hiroshima--Krzysztof-Penderecki/",
      },
    ],
  },
  {
    slug: "trump-backed-outsider-wins-colombia-election",
    headline: "Trump-backed outsider leads Colombia's election as his rival disputes the count",
    overview:
      "Abelardo de la Espriella holds a razor-thin lead as initial counts make him the apparent winner of Colombia's presidential vote. His rival disputes the result, and the outcome remains unsettled.",
    genre: "Politics",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/clye4ky2yzpo",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMiswFBVV95cUxNSVJHUHV0QWpad1RsZ3czaHFKb1hOU1V4aW5oeGZlbkFfeVNIdHdVdmpqQmRQMUh0cHlFUXFzcnNHdjU1aXNqUFU5NV9lVHZJdVI3QS1aSjJ3LXY3aDlqTnJmeFcyVzZfWVE3a0VOU2VLcU16RzlzQ2hWcTYtWTdHRTM2ODhZby1Od3V4UGM3OXRHbC1XNlRBNGozTUowcFM4N0VYS3IxS3JiVDJNTEpyeHdicw?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/trump-backed-outsider-wins-colombia-election.png",
      alt: "A contested presidential count",
      credit: "BBC",
    },
    rank: 16,
    analogies: [
      {
        category: "historical",
        title: "Louis-Napoléon's election, 1848",
        excerpt:
          "An outsider rode a borrowed and famous name to a landslide in France's first popular presidential election, promising to embody the people. Within four years he had dismantled the republic that elected him and crowned himself emperor.",
        source: "Historical record",
        href: "https://www.britannica.com/biography/Napoleon-III-emperor-of-France",
      },
      {
        category: "historical",
        title: "The Hayes-Tilden election, 1876",
        excerpt:
          "A US presidential result hung for months on disputed counts and rival tallies, settled at last by a backroom bargain rather than the ballot box. The lesson held: the contest does not end when the votes are cast, only when one side concedes the count.",
        source: "Historical record",
        href: "https://history.house.gov/Historical-Highlights/1851-1900/The-electoral-vote-count-of-the-1876-presidential-election/",
      },
      {
        category: "literary",
        title: "García Márquez, “The Autumn of the Patriarch”",
        excerpt:
          "Colombia's own laureate dissolves into the mind of an ageing dictator, mapping the solitude and the slow seduction of unaccountable power. No writer has better caught how the strongman comes to mistake himself for the nation.",
        source: "Novel, 1975",
        href: "https://www.penguin.co.uk/books/482985/the-autumn-of-the-patriarch-by-gabriel-garcia-marquez/9780241968635",
      },
      {
        category: "literary",
        title: "Sarmiento, “Facundo”",
        excerpt:
          "Argentina's great nineteenth-century polemic framed Latin American politics as a contest between civilization and the charismatic strongman of the frontier. Its template, the outsider who governs by force of personality, keeps returning to the ballot.",
        source: "Essay, 1845",
        href: "https://www.gutenberg.org/ebooks/33267",
      },
      {
        category: "artistic",
        title: "Botero, “The Presidential Family”",
        excerpt:
          "Colombia's most famous brush swelled its presidents and officers to absurd, balloon-like bulk, dignity inflated to the edge of caricature. The joke and the menace are the same: power that has grown far past its proper size.",
        source: "Oil on canvas, 1967",
        href: "https://www.moma.org/collection/works/80711",
      },
      {
        category: "artistic",
        title: "Goya, “Charles IV of Spain and His Family”",
        excerpt:
          "Goya arranged the royal family in their finery and painted every weakness and vanity into their faces without flattery. It remains the sharpest reminder that a portrait of power can quietly tell the truth power would rather not hear.",
        source: "Oil on canvas, 1800",
        href: "https://www.museodelprado.es/en/the-collection/art-work/the-family-of-carlos-iv/f47898fc-aa1c-48f6-a779-71759e417e74",
      },
    ],
  },
  {
    slug: "red-heat-alerts-across-france-italy-spain",
    headline: "Red heat alerts cover France, Italy and Spain as temperatures top 40C",
    overview:
      "Red heat alerts cover swaths of France, Italy and Spain as forecasts push past 40C, with deaths already reported and authorities restricting outdoor activity. The European summer has arrived as an emergency.",
    genre: "Climate",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/c0jy9g96086o",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMinwFBVV95cUxQTGhnZE1kNUxUcTJpWmdWMnhlRzhpN1kwZWRQOFRtSG9aUS0wNnBoaDdMSGtiOWtQWFFNOFI4dzNhUXpONllqMEhSZGsxMDJEd1R2ZE5yZHFnUDNlaVdqSkJHeVlac3JOb3V2WXFTQUVBRmJKYjNlQldVT0haRjFLMHVMNW1vVXNYNG5MZi1WS2ZqaW93SkxPUzg1dGhSM2s?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/red-heat-alerts-across-france-italy-spain.png",
      alt: "Europe under an intensifying heatwave",
      credit: "BBC",
    },
    rank: 17,
    analogies: [
      {
        category: "historical",
        title: "The scorching summer of 1788",
        excerpt:
          "A brutal drought and failed harvest sent bread prices soaring in the year before the Bastille fell, turning weather into political tinder. The heat did not make the revolution, but it helped lay the dry kindling under it.",
        source: "Historical record",
        href: "https://link.springer.com/article/10.1007/s10887-023-09230-y",
      },
      {
        category: "historical",
        title: "The European heatwave of 2003",
        excerpt:
          "Tens of thousands died across the continent in a single summer, many of them alone and elderly in cities built for a cooler climate. It was the first modern warning that heat itself, not storm or flood, would be the quiet mass killer.",
        source: "Historical record",
        href: "https://www.eurosurveillance.org/content/10.2807/esm.10.07.00551-en",
      },
      {
        category: "literary",
        title: "J. G. Ballard, “The Drought”",
        excerpt:
          "Ballard imagines a world reorganizing itself slowly around the absence of water, society thinning and hardening as the rivers vanish. The catastrophe is not an explosion but a long, patient evaporation of the ordinary.",
        source: "Novel, 1964",
        href: "https://harpercollins.co.uk/products/the-drought-j-g-ballard",
      },
      {
        category: "literary",
        title: "Dante, “Inferno”, Canto XIV",
        excerpt:
          "Dante sets a circle of the damned beneath a slow rain of fire on burning sand, punishment delivered as relentless, inescapable heat. Seven centuries on, the image of a sky that scorches what lies under it reads less like allegory than forecast.",
        source: "Poem, c. 1320",
        href: "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_14",
      },
      {
        category: "artistic",
        title: "Turner, “Regulus”",
        excerpt:
          "Turner pushed the sun to the center of the canvas and let its glare all but dissolve the harbor and the figures into white. The painting is what overwhelming heat feels like rather than how it looks, light as a physical force that erases.",
        source: "Oil on canvas, 1828",
        href: "https://www.tate.org.uk/art/artworks/turner-regulus-n00519",
      },
      {
        category: "artistic",
        title: "John Luther Adams, “Become Ocean”",
        excerpt:
          "Three orchestral tides swell and recede in vast slow waves built from the imagery of melting ice and rising seas. It is climate rendered as sound, a beauty that is also a steadily advancing threat.",
        source: "Composition, 2013",
        href: "https://www.boosey.com/shop/prod/Adams-Luther-John-Become-Ocean-Full-Score/2312569",
      },
    ],
  },
  {
    slug: "un-says-myanmar-army-killed-over-700-civilians",
    headline: "UN says Myanmar's military killed more than 700 civilians in six months",
    overview:
      "A UN report documents more than 700 civilians killed by Myanmar's military over six months, including scores of children. The toll is set down as evidence, an attempt to keep the dead from going uncounted.",
    genre: "Conflict",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/cnv97e42r7yo",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/un-says-myanmar-army-killed-over-700-civilians.png",
      alt: "Counting the civilian dead of a war",
      credit: "BBC",
    },
    rank: 18,
    analogies: [
      {
        category: "historical",
        title: "Guernica, 1937",
        excerpt:
          "The deliberate aerial bombing of a Basque market town made civilians the target rather than the collateral, a tactic the century would repeat without end. Its name survived because an artist refused to let the dead become a statistic.",
        source: "Historical record",
        href: "https://en.wikipedia.org/wiki/Bombing_of_Guernica",
      },
      {
        category: "historical",
        title: "Lemkin and the word genocide, 1948",
        excerpt:
          "A Polish lawyer who lost his family invented a word for the crime that had no name, and pressed the world to write it into law. The UN tally from Myanmar is the distant machinery of that idea, the insistence that mass killing be named and counted.",
        source: "Treaty, 1948",
        href: "https://www.un.org/en/genocide-prevention/1948-convention",
      },
      {
        category: "literary",
        title: "Euripides, “The Trojan Women”",
        excerpt:
          "Euripides gives the whole aftermath of a sacked city to its widows and children, the people history usually leaves off the page. Written the year his own city had slaughtered a neutral island's men, it is the oldest protest against the cost of war on those who cannot fight.",
        source: "Tragedy, 415 BCE",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0124",
      },
      {
        category: "literary",
        title: "Vasily Grossman, “Life and Fate”",
        excerpt:
          "Grossman keeps the human ledger behind the front line, insisting that each number in a death toll was once a particular person with a particular morning. The novel's quiet argument is that to count carefully is itself a form of resistance.",
        source: "Novel, 1960",
        href: "https://www.nyrb.com/products/life-and-fate",
      },
      {
        category: "artistic",
        title: "Picasso, “Guernica”",
        excerpt:
          "A mural of grey, white and black anguish that turned one town's bombing into the century's defining image of civilian slaughter. Picasso refused color and refused comfort, leaving only the scream and the wreckage.",
        source: "Oil on canvas, 1937",
        href: "https://www.museoreinasofia.es/en/collections/artwork/guernica-0/",
      },
      {
        category: "artistic",
        title: "Käthe Kollwitz, “In Memoriam Karl Liebknecht”",
        excerpt:
          "Kollwitz, who lost her own son to the war, carved the bereaved gathered around the dead with a tenderness that turns grief into testimony. Her mourners are the toll made visible, one bowed body standing for the seven hundred.",
        source: "Woodcut, 1920",
        href: "https://www.moma.org/collection/works/71889",
      },
    ],
  },
  {
    slug: "alan-greenspan-fed-maestro-dies-at-100",
    headline: "Alan Greenspan, longtime Federal Reserve chair, dies at 100",
    overview:
      "Alan Greenspan, who chaired the US Federal Reserve for nearly two decades and was cast as the inscrutable maestro of the economy, has died at 100. His long tenure and famously cryptic pronouncements outlived their own myth.",
    genre: "Economy",
    sources: [
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMilgFBVV95cUxNalBqeTVydzFhdkdETElZWW5ZZTRSM3ZsaUtCaVZSMGNCZTQ2dXNmMDdGQzBKUlphSDB0d21EanZqWmhqMmVKeUhiOWdtWS14akk1Z3lxTHBkTGc0SGZPQnhtX3MxazFQLVRaUFc4bFZudnJJdlAwTnRPZW9jVGswWmJrMDBxNUllSW9yT3cwcm8yTFZPMkE?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/alan-greenspan-fed-maestro-dies-at-100.png",
      alt: "A central banker who spoke in riddles",
      credit: "Federal Reserve",
    },
    rank: 19,
    analogies: [
      {
        category: "historical",
        title: "The Oracle of Delphi",
        excerpt:
          "States went to war and kings staked everything on pronouncements deliberately phrased to be read either way. Greenspan's prized art of saying something while committing to nothing was the same ancient power, an ambiguity the mighty chose to obey.",
        source: "Greek antiquity",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0126",
      },
      {
        category: "historical",
        title: "John Law and the Mississippi Bubble, 1720",
        excerpt:
          "A brilliant financier persuaded a kingdom that paper and confidence could stand in for gold, and for a giddy season he was right. When the bubble he had inflated burst, it took the economy and his reputation with it, the maestro's oldest cautionary twin.",
        source: "Historical record",
        href: "https://www.britannica.com/money/Mississippi-Bubble",
      },
      {
        category: "literary",
        title: "Goethe, “Faust”, Part Two",
        excerpt:
          "Goethe has Mephistopheles solve an emperor's debts by inventing paper money, conjuring value out of a signature and a promise. It remains the sharpest fable of monetary magic, wealth summoned from nothing by a man everyone agrees to trust.",
        source: "Drama, 1832",
        href: "https://www.gutenberg.org/ebooks/63203",
      },
      {
        category: "literary",
        title: "Ayn Rand, “Atlas Shrugged”",
        excerpt:
          "The young Greenspan sat in Rand's circle as she wrote her hymn to the heroic capitalist and the gold standard. That a disciple of her absolutism became the most powerful steward of fiat money is one of the century's quiet ironies.",
        source: "Novel, 1957",
        href: "https://www.penguinrandomhouse.com/books/296832/atlas-shrugged-centennial-ed-hc-by-ayn-rand/",
      },
      {
        category: "artistic",
        title: "Quentin Massys, “The Moneylender and His Wife”",
        excerpt:
          "A man weighs gold coins on a delicate balance while his wife's attention drifts from her prayer book to the scales. It is the oldest portrait of the office Greenspan held, the keeper of the balance on whom everyone's faith and money rest.",
        source: "Oil on panel, 1514",
        href: "https://collections.louvre.fr/en/ark:/53355/cl010061690",
      },
      {
        category: "artistic",
        title: "Charles Ives, “The Unanswered Question”",
        excerpt:
          "A solitary trumpet poses the same riddle again and again while the strings drift on, serene and unhelping, and no answer ever comes. It is Fedspeak set to music, the question left permanently, deliberately open.",
        source: "Composition, 1908",
        href: "https://imslp.org/wiki/The_Unanswered_Question_(Ives,_Charles)",
      },
    ],
  },
  {
    slug: "oracle-sheds-21000-jobs-amid-ai",
    headline: "Oracle cuts about 21,000 jobs as it leans into AI",
    overview:
      "Oracle's workforce shrank by roughly 21,000 people as the company leaned into AI, one of the largest cuts yet attributed to automation inside a single firm. The technology sold as help arrives, for those workers, as replacement.",
    genre: "Technology",
    sources: [
      {
        name: "Reuters",
        href: "https://news.google.com/rss/articles/CBMimwFBVV95cUxOU0xZSHdqTkZTenRqaEM4VEFGbmRPYndlel94bldUTXlFUHJnZV9BRHFja0QyZThTV1JrbFJLNFZiaDZubnBGMWlmUEZJd3p1eTI5dkRialdHUmNpZkctdWxRVGJCLUlIaVlGZXpXeDRYWm1ucE9xbENVcWRINTBacU5oanJ5SGZZQm9rd3FHWkFzOXBvdUFQWDFPNA",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/oracle-sheds-21000-jobs-amid-ai.png",
      alt: "The headquarters of a company automating its own workforce",
      credit: "Håkan Dahlström, CC BY",
    },
    rank: 20,
    analogies: [
      {
        category: "historical",
        title: "The Luddites, 1811",
        excerpt:
          "Skilled weavers smashed the power frames that were turning their craft into something a machine could do faster and cheaper. They were not fools afraid of progress but workers who saw, correctly, who the new efficiency was for.",
        source: "Historical record",
        href: "https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-proclamation-of-ned-ludd/",
      },
      {
        category: "historical",
        title: "John Henry and the steam drill",
        excerpt:
          "The steel-driving man raced the machine sent to replace him, won, and died with the hammer in his hand. The legend endures because it names the wager every automated worker is quietly asked to make and cannot win twice.",
        source: "American folk ballad",
        href: "https://www.loc.gov/item/ihas.200196572/",
      },
      {
        category: "literary",
        title: "Karel Čapek, “R.U.R.”",
        excerpt:
          "The play that gave the world the word robot imagines artificial workers built to take every human job, until there is nothing left for people to do. Čapek saw a century early that the trouble begins not when the machines fail but when they succeed.",
        source: "Play, 1920",
        href: "https://www.gutenberg.org/ebooks/59112",
      },
      {
        category: "literary",
        title: "Kurt Vonnegut, “Player Piano”",
        excerpt:
          "Vonnegut's first novel pictures a society so automated that its engineers have optimized ordinary people out of any reason to exist. The machines work beautifully, and that is exactly the problem the book refuses to let go.",
        source: "Novel, 1952",
        href: "https://www.penguinrandomhouse.com/books/184341/player-piano-by-kurt-vonnegut/",
      },
      {
        category: "artistic",
        title: "Diego Rivera, “Detroit Industry Murals”",
        excerpt:
          "Rivera wrapped a courtyard in the choreography of the assembly line, men and machines fused into one vast organism of production. He painted the factory at its mightiest, the human hands still indispensable in a way this week's news quietly undoes.",
        source: "Fresco, 1932",
        href: "https://dia.org/collection/detroit-industry-murals/58537",
      },
      {
        category: "artistic",
        title: "Honegger, “Pacific 231”",
        excerpt:
          "Honegger built an entire orchestral piece out of a steam locomotive gathering speed, thrilled and a little afraid of the machine's momentum. It is the sound of an age falling in love with the engine that would not need it.",
        source: "Composition, 1923",
        href: "https://imslp.org/wiki/Pacific_231_(Honegger,_Arthur)",
      },
    ],
  },
  {
    slug: "glm-5-2-most-powerful-open-weights-model",
    headline: "GLM-5.2 is released as the most powerful open-weights model yet",
    overview:
      "A new release, GLM-5.2, is described as probably the most powerful text-only open-weights language model to date, putting frontier-grade capability in the hands of anyone who can run it. The gate around the most advanced models keeps slipping.",
    genre: "Technology",
    sources: [
      {
        name: "Simon Willison's Weblog",
        href: "https://simonwillison.net/2026/Jun/17/glm-52/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-17",
    image: {
      src: "/covers/glm-5-2-most-powerful-open-weights-model.png",
      alt: "A powerful new capability set loose in the world",
      credit: "AI-generated",
    },
    rank: 21,
    analogies: [
      {
        category: "historical",
        title: "Diderot's “Encyclopédie”, 1751",
        excerpt:
          "A team of writers set out to gather all of human knowledge into one work and put it in the hands of any literate citizen, against the wishes of church and crown. The point was never the volumes themselves but the leveling, knowledge taken out of the gatekeepers' hands.",
        source: "Reference work, 1751",
        href: "https://encyclopedie.uchicago.edu/",
      },
      {
        category: "historical",
        title: "Gutenberg's press, c. 1450",
        excerpt:
          "Movable type took the copying of texts away from the monastery scriptorium and made multiplication cheap and uncontrollable. Within decades the ideas the authorities most wanted contained were the ones spreading fastest, the original lesson in what release really means.",
        source: "Historical record",
        href: "https://www.loc.gov/exhibits/bibles/the-gutenberg-bible.html",
      },
      {
        category: "literary",
        title: "Aeschylus, “Prometheus Bound”",
        excerpt:
          "Prometheus steals fire from the gods and hands it to mortals, and is chained to a rock for the gift. The myth fixes forever the double face of a released power, the same flame that warms the world being the one its giver is punished for letting go.",
        source: "Tragedy, 5th c. BCE",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010",
      },
      {
        category: "literary",
        title: "Mary Shelley, “Frankenstein”",
        excerpt:
          "A maker brings a powerful new being into the world and discovers at once that creating it and controlling it are different problems entirely. Two centuries on the anxiety is unchanged, the thing you set loose not asking permission for what it becomes.",
        source: "Novel, 1818",
        href: "https://www.gutenberg.org/ebooks/84",
      },
      {
        category: "artistic",
        title: "Cornelius Cardew, “Treatise”",
        excerpt:
          "A 193-page score of pure abstract notation with no instructions, free for anyone to interpret and perform however they can. Cardew released authorship itself, handing the work over as open material rather than fixed commands, an art object shaped like open weights.",
        source: "Graphic score, 1963",
        href: "https://www.wisemusicclassical.com/work/64858/Treatise--Cornelius-Cardew/",
      },
      {
        category: "artistic",
        title: "Sol LeWitt, the wall drawings",
        excerpt:
          "LeWitt sold not paintings but instructions, certificates of directions anyone could follow to execute the work on any wall. The piece lives in the rules, not the object, runnable wherever there is someone to carry it out.",
        source: "Conceptual art, 1968",
        href: "https://www.moma.org/collection/works/79898",
      },
    ],
  },
  {
    slug: "oldest-evidence-of-plague-mass-death-found",
    headline: "DNA reveals the oldest known evidence of mass death from plague",
    overview:
      "Researchers report DNA evidence of mass death from plague roughly 5,000 years ago, pushing the recorded reach of the disease deep into prehistory. The same pathogen that haunts the written record turns out to be far older than its chronicles.",
    genre: "Science",
    sources: [
      {
        name: "Kottke.org",
        href: "https://kottke.org/26/06/0049192-scientists-have-found-evi",
      },
      {
        name: "The New York Times",
        href: "https://www.nytimes.com/2026/06/17/science/oldest-plague-siberian-skeletons.html",
      },
    ],
    href: "#",
    publishedAt: "2026-06-17",
    image: {
      src: "/covers/oldest-evidence-of-plague-mass-death-found.png",
      alt: "The plague bacterium under the microscope",
      credit: "NIAID",
    },
    rank: 22,
    analogies: [
      {
        category: "historical",
        title: "The Black Death, 1347",
        excerpt:
          "In four years the pestilence killed perhaps half of Europe and rewrote everything from wages to faith in its wake. The new DNA pushes the same killer thousands of years further back, making the medieval catastrophe one chapter in a far longer book.",
        source: "Historical record",
        href: "https://en.wikipedia.org/wiki/Black_Death",
      },
      {
        category: "historical",
        title: "The Plague of Justinian, 541 CE",
        excerpt:
          "Procopius watched the same bacterium empty the streets of Constantinople and described the dying with a clinician's exactness. That his sixth-century plague and a 5,000-year-old grave carry the identical pathogen collapses the distance between ancient and prehistoric.",
        source: "History, 6th c. CE",
        href: "https://sourcebooks.fordham.edu/source/542procopius-plague.asp",
      },
      {
        category: "literary",
        title: "Defoe, “A Journal of the Plague Year”",
        excerpt:
          "Defoe reconstructed London's 1665 plague as a tissue of bills of mortality, rumor and shuttered houses, the bureaucracy of mass death. His insistence on counting the dead street by street is the literary ancestor of the lab now counting them by their DNA.",
        source: "Chronicle, 1722",
        href: "https://www.gutenberg.org/ebooks/376",
      },
      {
        category: "literary",
        title: "Boccaccio, “The Decameron”",
        excerpt:
          "Boccaccio opens with the plague emptying Florence, then sends ten young people to the hills to tell stories against the dark. The frame is the oldest answer to catastrophe we keep returning to, to survive, gather, and narrate the dead so they are not simply gone.",
        source: "Stories, c. 1353",
        href: "https://www.gutenberg.org/ebooks/23700",
      },
      {
        category: "artistic",
        title: "Bruegel, “The Triumph of Death”",
        excerpt:
          "Bruegel filled a panoramic landscape with armies of skeletons harvesting the living of every rank without exception. It is the plague century's clearest verdict, painted, death as the great leveler that spares no station.",
        source: "Oil on panel, c. 1562",
        href: "https://www.museodelprado.es/en/the-collection/art-work/the-triumph-of-death/d3d82b0b-9bf2-4082-ab04-66ed53196ccc",
      },
      {
        category: "artistic",
        title: "Holbein, “The Dance of Death”",
        excerpt:
          "Holbein's tiny prints send a grinning skeleton to collect pope and peasant, merchant and child alike, each in the middle of ordinary life. The series fixed the medieval intuition the new graves confirm, that the contagion makes no distinctions, and never did.",
        source: "Woodcuts, 1538",
        href: "https://www.metmuseum.org/art/collection/search/360011",
      },
    ],
  },
  {
    slug: "clive-davis-music-starmaker-dies-at-94",
    headline: "Clive Davis, the record executive behind decades of hits, dies at 94",
    overview:
      "Clive Davis, the record executive who shaped the careers of Whitney Houston, Bruce Springsteen and many others, has died at 94. He was the impresario behind the talent, the ear that turned performers into stars.",
    genre: "Culture",
    sources: [
      {
        name: "BBC",
        href: "https://www.bbc.com/news/articles/c3vy3e6q90qo",
      },
      {
        name: "AP",
        href: "https://news.google.com/rss/articles/CBMilwFBVV95cUxPMm1EYUhaTjVLS2NKdlpSMmJmdDU2T2RkMGhXUllTUF9LT2VRVXJXVzdiSEZUb19SVkcyMmppLW5HSTM5VEZxTWc3VkdrODAwbFNPc0tKLXJTNUI4NnpneHZvU1lRYnFRWG53eFhWa1RvT0pNRFFLa1d1T29tcUczRGt2ZDM1SllLQ2FVRTdrY1U1SzlBbHVv?oc=5",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/clive-davis-music-starmaker-dies-at-94.png",
      alt: "The impresario behind the talent",
      credit: "Wikimedia (CC BY)",
    },
    rank: 23,
    analogies: [
      {
        category: "historical",
        title: "Maecenas, patron of the Augustan poets",
        excerpt:
          "The Roman statesman who funded Virgil and Horace gave his very name to the idea of patronage, the powerful figure who makes art possible from behind it. Horace opens his odes by turning to him first, the way every star turns to the one who backed them.",
        source: "Roman poetry, 1st c. BCE",
        href: "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0024:book=1:poem=1",
      },
      {
        category: "historical",
        title: "Diaghilev and the Ballets Russes",
        excerpt:
          "Diaghilev wrote no music and danced no steps, yet he assembled the composers, dancers and painters who remade twentieth-century art around his company. The impresario's gift is not talent but the ear and the nerve to gather it and stake everything on it.",
        source: "Historical record",
        href: "https://www.vam.ac.uk/collections/diaghilev-and-the-ballet-russes",
      },
      {
        category: "literary",
        title: "Balzac, “Lost Illusions”",
        excerpt:
          "Balzac laid bare the machinery that manufactures and destroys artistic reputations, the trade in fame that runs beneath the art. Two centuries on, the starmaker's industry he dissected is recognizable to the last contract and betrayal.",
        source: "Novel, 1843",
        href: "https://www.gutenberg.org/ebooks/13159",
      },
      {
        category: "literary",
        title: "Goethe, “Wilhelm Meister's Apprenticeship”",
        excerpt:
          "Goethe followed a young man drawn into the theater and the long apprenticeship that turns raw promise into a finished artist. Behind every discovered star stands this older story, the patient, unglamorous shaping of talent into a career.",
        source: "Novel, 1796",
        href: "https://www.gutenberg.org/ebooks/36483",
      },
      {
        category: "artistic",
        title: "Warhol and “The Velvet Underground & Nico”",
        excerpt:
          "Warhol attached his name and his peeling banana to an unknown band, less producing the music than framing it as something worth hearing. It is the impresario's act in pop form, the curator who lends his authority until the talent can carry its own.",
        source: "Album cover, 1967",
        href: "https://www.moma.org/collection/works/297601",
      },
      {
        category: "artistic",
        title: "“A Great Day in Harlem”, 1958",
        excerpt:
          "Fifty-seven jazz musicians gathered on a Harlem stoop for a single morning photograph, an entire ecosystem of talent in one frame. It is a portrait of the world the starmaker works inside, the dense human network from which the famous few are drawn.",
        source: "Photograph, 1958",
        href: "https://en.wikipedia.org/wiki/A_Great_Day_in_Harlem",
      },
    ],
  },
  {
    slug: "leonora-carrington-shape-of-dreams-sculptures",
    headline:
      "Leonora Carrington's surrealist creatures go on show as bronze sculptures",
    overview:
      "An exhibition brings out Leonora Carrington's sculptural work, the bronze and gilded creatures that step from her surrealist paintings into solid form. The dream bestiary she painted for decades is finally given a body.",
    genre: "Culture",
    sources: [
      {
        name: "Colossal",
        href: "https://www.thisiscolossal.com/2026/06/leonora-carrington-shape-of-dreams-sculptures-jewelry/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-18",
    image: {
      src: "/covers/leonora-carrington-shape-of-dreams-sculptures.png",
      alt: "A surreal dream creature cast in solid form",
      credit: "Colossal",
    },
    rank: 24,
    analogies: [
      {
        category: "historical",
        title: "Breton's Surrealist Manifesto, 1924",
        excerpt:
          "Breton declared the dream and the unconscious legitimate material for art, as real and usable as anything in waking life. Carrington's solid creatures are that founding claim taken literally, the contents of sleep cast in bronze.",
        source: "Manifesto, 1924",
        href: "https://archive.org/details/andrebretonmanifestoesofsurrealism",
      },
      {
        category: "historical",
        title: "The alchemical tradition and “Splendor Solis”",
        excerpt:
          "Carrington steeped herself in alchemy's bestiary of hybrid beasts and transformations, the old dream of turning base matter into gold. Her gilded figures are a modern page of that tradition, the laboratory reimagined as a sculptor's studio.",
        source: "Alchemical manuscript, 1582",
        href: "https://en.wikipedia.org/wiki/Splendor_Solis",
      },
      {
        category: "literary",
        title: "Lewis Carroll, “Alice's Adventures in Wonderland”",
        excerpt:
          "Carroll built a world that runs on dream logic, where impossible creatures speak in earnest and the rules change without warning. Carrington's animals belong to the same lineage, escapees from a story that takes the absurd entirely seriously.",
        source: "Novel, 1865",
        href: "https://www.gutenberg.org/ebooks/11",
      },
      {
        category: "literary",
        title: "Leonora Carrington, “The Hearing Trumpet”",
        excerpt:
          "Carrington was a writer as strange as she was a painter, and her novel sends a 92-year-old woman into a surreal convent of revolt and transformation. The sculptures share its key, the marvelous treated as ordinary, the fantastic reported in a level voice.",
        source: "Novel, 1974",
        href: "https://www.nyrb.com/products/the-hearing-trumpet",
      },
      {
        category: "artistic",
        title: "Bosch, “The Garden of Earthly Delights”",
        excerpt:
          "Bosch populated his triptych with hybrid creatures and impossible machines five centuries before the word surrealism existed. He is the distant ancestor of Carrington's bestiary, proof the dream menagerie is one of art's oldest impulses.",
        source: "Oil on panel, c. 1500",
        href: "https://www.museodelprado.es/en/the-collection/art-work/the-garden-of-earthly-delights-triptych/02388242-6d6a-4e9e-a992-e1311eab3609",
      },
      {
        category: "artistic",
        title: "Remedios Varo, the visionary canvases",
        excerpt:
          "Varo, Carrington's closest friend in their Mexico City exile, painted alchemists and travelers in glowing dreamlike interiors. The two women built a private surrealist world together, and these sculptures are one room of it stepped into three dimensions.",
        source: "Paintings, 1950s",
        href: "https://www.moma.org/collection/works/291307",
      },
    ],
  },
  {
    slug: "pilfered-picasso-found-in-paris-drug-bust",
    headline: "A stolen Picasso worth millions is found in a Paris drug raid",
    overview:
      "Police searching a suburban Paris home during a narcotics raid turned up a stolen Picasso worth as much as $17 million. The painting had been living underground as contraband, a masterpiece hidden in plain sight.",
    genre: "Culture",
    sources: [
      {
        name: "Artforum",
        href: "https://www.artforum.com/news/paris-drug-bust-nets-pilfered-picasso-1234752741/",
      },
    ],
    href: "#",
    publishedAt: "2026-06-22",
    image: {
      src: "/covers/pilfered-picasso-found-in-paris-drug-bust.png",
      alt: "A recovered painting surfacing from the underground",
      credit: "AI-generated",
    },
    rank: 25,
    analogies: [
      {
        category: "historical",
        title: "The theft of the “Mona Lisa”, 1911",
        excerpt:
          "An ordinary museum worker walked out of the Louvre with the most famous painting on earth under his coat, and the empty wall drew bigger crowds than the picture had. The theft proved that stealing a masterpiece only deepens its fame.",
        source: "Historical record",
        href: "https://www.louvre.fr/en/explore/the-palace/from-the-mona-lisa-to-the-wedding-feast-at-cana",
      },
      {
        category: "historical",
        title: "The Gardner Museum heist, 1990",
        excerpt:
          "Thieves cut thirteen works from their frames in Boston and vanished, and the empty frames still hang where the paintings were. The case is the standing reminder that a stolen masterpiece often simply disappears, too hot to sell and too precious to destroy.",
        source: "Historical record",
        href: "https://www.fbi.gov/history/famous-cases/isabella-stewart-gardner-museum-heist",
      },
      {
        category: "literary",
        title: "Poe, “The Purloined Letter”",
        excerpt:
          "Poe's detective finds the stolen prize not in some clever hiding place but sitting in plain sight, exactly where no one thought to look. A priceless Picasso surfacing in a dealer's flat is the same trick, the valuable thing hidden by sheer ordinariness.",
        source: "Short story, 1844",
        href: "https://www.gutenberg.org/ebooks/2148",
      },
      {
        category: "literary",
        title: "Donna Tartt, “The Goldfinch”",
        excerpt:
          "Tartt's novel follows a small stolen painting kept secret for years, a hidden masterpiece that warps the life of everyone who holds it. It is the inner life of exactly this kind of case, the contraband canvas as a private burden and a curse.",
        source: "Novel, 2013",
        href: "https://www.hachettebookgroup.com/titles/donna-tartt/the-goldfinch/9780316055437/",
      },
      {
        category: "artistic",
        title: "Caravaggio, “Nativity with St Francis and St Lawrence”",
        excerpt:
          "Cut from its frame in a Palermo oratory in 1969 and never recovered, the painting is the most famous ghost in art crime. It is the darker possibility shadowing every recovery, the masterpiece that goes underground and never comes back.",
        source: "Oil on canvas, 1609",
        href: "https://www.fbi.gov/investigate/violent-crime/art-crime/fbi-top-ten-art-crimes/nativity-with-san-lorenzo-and-san-francesco",
      },
      {
        category: "artistic",
        title: "Picasso, “Les Demoiselles d'Avignon”",
        excerpt:
          "No artist's work is stolen more often, the name itself functioning as portable, convertible value in the underworld. The market turned his canvases into a kind of currency, which is precisely how one ends up as collateral in a drug raid.",
        source: "Oil on canvas, 1907",
        href: "https://www.moma.org/collection/works/79766",
      },
    ],
  },
  {
    slug: "from-olivetti-to-instagram-brand-design-history",
    headline: "A new book traces modern brand design from Olivetti to Instagram",
    overview:
      "A new design publication traces modern brand identity from early twentieth-century modernism to the social-media feed, the long arc from Olivetti's typewriters to Instagram's logo. The mark a company makes is read as a history of how we have learned to see.",
    genre: "Culture",
    sources: [
      {
        name: "It's Nice That",
        href: "https://www.itsnicethat.com/features/katharina-sussek-jens-muller-the-elements-of-brand-design-taschen-publication-graphic-design-spotlight-170626",
      },
    ],
    href: "#",
    publishedAt: "2026-06-17",
    image: {
      src: "/covers/from-olivetti-to-instagram-brand-design-history.png",
      alt: "A century of brand marks laid side by side",
      credit: "It's Nice That",
    },
    rank: 26,
    analogies: [
      {
        category: "historical",
        title: "Peter Behrens and AEG, 1907",
        excerpt:
          "Behrens designed not just AEG's products but its logo, typeface, buildings and posters as a single coherent system, inventing the corporate identity. Every brand guideline since descends from his idea that a company could be designed whole.",
        source: "Corporate identity, 1907",
        href: "https://www.moma.org/collection/works/5490",
      },
      {
        category: "historical",
        title: "Adriano Olivetti's design culture",
        excerpt:
          "Olivetti made design a corporate philosophy, treating typewriters, shopfronts and factories as expressions of one humane idea of the company. It is the high-water mark the feed's flattened logos are measured against, design as conviction rather than decoration.",
        source: "Industrial design, 1968",
        href: "https://www.moma.org/collection/works/4576",
      },
      {
        category: "literary",
        title: "Ruskin, “The Nature of Gothic”",
        excerpt:
          "Ruskin argued that how a thing is made is written all over how it looks, and that machine perfection costs something human. His quarrel with mass production is the unease that still haunts a brand language built to be infinitely, frictionlessly reproduced.",
        source: "Essay, 1853",
        href: "https://www.gutenberg.org/ebooks/30755",
      },
      {
        category: "literary",
        title: "Marshall McLuhan, “The Medium is the Massage”",
        excerpt:
          "McLuhan insisted that every new medium quietly reshapes the message and the people using it, the form mattering more than the content it carries. The move from Olivetti's page to Instagram's square is exactly his thesis, a new medium remaking the mark to fit itself.",
        source: "Book, 1967",
        href: "https://gingkopress.com/shop/the-medium-is-the-massage-softcover/",
      },
      {
        category: "artistic",
        title: "Piet Mondrian and De Stijl",
        excerpt:
          "Mondrian reduced the visible world to a grid of black lines and primary blocks, a severe vocabulary that became the unspoken grammar of modern design. Strip a century of logos to their bones and his rectangles are still holding them up.",
        source: "Oil on canvas, 1921",
        href: "https://www.moma.org/collection/works/79002",
      },
      {
        category: "artistic",
        title: "El Lissitzky, “Beat the Whites with the Red Wedge”",
        excerpt:
          "Lissitzky compressed a civil war into a red wedge driving into a white circle, pure geometry made to persuade. It is the moment design discovered it could carry an argument with shape alone, the ancestor of every brand that means to move you before you read a word.",
        source: "Lithograph, 1919",
        href: "https://commons.wikimedia.org/wiki/File:Artwork_by_El_Lissitzky_1919.jpg",
      },
    ],
  },
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
