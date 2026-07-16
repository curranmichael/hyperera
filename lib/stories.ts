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
    "slug": "myanmar-rohingya-boats-500-dead",
    "headline": "More than 500 Rohingya refugees are feared dead after two boats sink off Myanmar's coast, the U.N. says",
    "overview": "Two boats that left Myanmar's western Rakhine state in late June carrying mostly Rohingya — roughly 250 people on one vessel and 280 on another — are believed to have capsized in the Bay of Bengal, and more than 500 people are feared dead, U.N. agencies said Thursday. UNHCR and IOM said they were \"gravely concerned\" by the potentially devastating loss of life, though the figures have not been officially confirmed. The Rohingya usually avoid such crossings during the monsoon, and 2025 was already the deadliest year on record for those trying to flee by sea.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxQd2VwbFdaeDBOTHVmbVhHcnRlV2FDU1dmSGZja1pkZ3cxb0JiT3JnYjVOd0UwUmM2cDctWTZtM2xWNXVwLW9odjhlNnVRbWVNMFZSRVBOMVlfTUtxdjVhM1U5VHdYdGp1SUkyWUdvMnlUNDB3ZkNEMTI2M2pIZFd0bC1lZ0lwVzZiZ1Y0UkVWLWxsWndCcVV4cmlsREo0UFVtdm1fdXZQX1RDY1FyMW5sbkp4SkJRVnhGVGhXQnNTd2Y?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOMkR3R1E2STVQQ1N5ZFdES1p3VWZ1MWRKMjNZNzdSTEttWFhBNnM5SFJkcWp3bTJKNE80blJxRDlFMXhnN29JcTlnUktRY0Mzd0JycGhGTXMtRVpiNmkyV2pSZjJnRVE3SjB2OGF1SG1vN1M3TmI5bFllYnJEdEFjLWtSeEJfM1F0UjBoYlhSLWdRSDk3ZGRsb3BKSzRqNmNRdHFOMWQxc2plaUJGWi1sSWRWX001QQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/myanmar-rohingya-boats-500-dead.png",
      "alt": "Rohingya refugees crowd aboard a vessel during a relocation.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 31 March 1492 Ferdinand and Isabella signed the Alhambra Decree, giving the Jews of Castile and Aragon four months to abandon the only homeland many had known for centuries or submit to baptism. Tens of thousands took to the roads and the ports, and much of that exodus went by sea, crammed onto hired ships whose captains sometimes robbed, abandoned, or drowned their passengers, so that contemporary chroniclers described bodies washing up along the coasts of North Africa and Italy. Emilio Sala's 1889 canvas freezes the political moment of that catastrophe: Torquemada looming over the monarchs as the edict is signed, a single signature that would scatter a people across the Mediterranean. The parallel to the Rohingya is exact in its cruelty, a community stripped of belonging by the stroke of a state's pen and then pushed onto the water where the sea finishes what the decree began. Five centuries apart, the same grim arithmetic recurs: statelessness on land, mass drowning at sea.",
        "excerpt": "The Jews of medieval Spain were made strangers in their own country by decree, then forced to gamble their lives on overcrowded ships. Many never reached the far shore; contemporaries told of drownings, of captains who abandoned their human cargo, of the Mediterranean turned into a highway of the dispossessed. Statelessness pronounced on land became a death sentence carried out by the sea.",
        "source": "Emilio Sala Frances, 'The Expulsion of the Jews from Spain (in the year 1492)', 1889, oil on canvas, Museo Nacional del Prado, Madrid (P06578). Image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Expulsi%C3%B3n_de_los_jud%C3%ADos.jpg",
        "image": {
          "src": "/covers/myanmar-rohingya-boats-500-dead--a0.png",
          "alt": "Emilio Sala's 1889 painting of the Grand Inquisitor Torquemada presenting the Catholic Monarchs with the 1492 edict expelling the Jews from Spain.",
          "credit": "Emilio Sala, 'The Expulsion of the Jews from Spain' (1889), Museo del Prado; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "After the fall of Saigon in 1975, more than a million Vietnamese fled by sea in overloaded, often unseaworthy fishing boats, braving the South China Sea, pirates, and the monsoon; the UNHCR estimated that hundreds of thousands died before reaching land, many simply swallowed by the water in vessels that were never found. Like the Rohingya, they were people rendered stateless and unwanted, turned away from one shore after another even as they drowned within sight of safety. This 1984 U.S. Navy photograph shows thirty-five survivors packed onto a small fishing boat after eight days adrift, hoisting a signal to the USS Blue Ridge, the lucky ones plucked from a fate that took so many others. The echo across the Bay of Bengal is uncanny: the same overcrowded hulls, the same seasonal winds, the same indifference of neighboring states that would rather push a boat back out than let it land. Two vessels out of Rakhine carrying some 500 souls belong to this same long, unfinished maritime exodus of the persecuted.",
        "excerpt": "The boat people of the late 1970s and 1980s are the closest modern rehearsal of this disaster: Southeast Asians fleeing persecution in leaking hulls, dying by the tens of thousands in monsoon seas, refused permission to land by state after state. The Rohingya crossing the Bay of Bengal follow the same drowned road. Only the flag on the shore that turns them away has changed.",
        "source": "U.S. Navy photograph by Lt. Carl R. Begy, Vietnamese refugees aboard a fishing boat awaiting rescue by USS Blue Ridge, 15 May 1984 (Defense Imagery Management Information System). Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:35_Vietnamese_boat_people.JPEG",
        "image": {
          "src": "/covers/myanmar-rohingya-boats-500-dead--a1.png",
          "alt": "Thirty-five Vietnamese refugees crowded on a small fishing boat at sea in 1984, waving to be rescued by the U.S. Navy ship USS Blue Ridge after eight days adrift.",
          "credit": "U.S. Navy photo (Lt. Carl R. Begy), 15 May 1984; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Virgil opens the Aeneid with a boatload of refugees: Aeneas and the survivors of a sacked Troy, homeless and sea-borne, driven across the Mediterranean toward an uncertain promised land. In Book I the goddess Juno bribes the wind-god to loose a storm upon the Trojan fleet, and the sea instantly becomes a graveyard, Orontes' ship swallowed whole while 'floating men' and their scattered possessions bob among the waves. Dryden's translation renders the horror with brutal economy: a pilot torn from his rudder, a vessel spun three times and left 'in the deep' to be lost. That image of anonymous drowned refugees, glimpsed for an instant on the surface before the water closes over them, could describe the two capsized boats off Myanmar with almost no alteration. Written two thousand years ago, the epic already understood that the flight from a destroyed home so often ends not in a new city but in the anonymous deep.",
        "excerpt": "Orontes’ bark, that bore the Lycian crew, / (A horrid sight!) ev’n in the hero’s view, / From stem to stern by waves was overborne: / The trembling pilot, from his rudder torn, / Was headlong hurl’d; thrice round the ship was toss’d, / Then bulg’d at once, and in the deep was lost; / And here and there above the waves were seen / Arms, pictures, precious goods, and floating men.",
        "source": "Virgil, Aeneid, Book I, trans. John Dryden (1697); The Poems of Virgil, Project Gutenberg eBook #228.",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
        "image": {
          "src": "/covers/myanmar-rohingya-boats-500-dead--a2.png",
          "alt": "Late-Roman mosaic showing the poet Virgil seated between two Muses, holding a scroll of the Aeneid, from the Bardo National Museum in Tunis.",
          "credit": "Roman mosaic of Virgil, Bardo National Museum, Tunis; photo Effi Schweizer; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Emma Lazarus wrote 'The New Colossus' in 1883 to help raise money for the Statue of Liberty's pedestal, and her sonnet transformed a neoclassical statue into a 'Mother of Exiles' lifting her lamp for the world's refugees. The famous sestet welcomes precisely the kind of people now dying in the Bay of Bengal, the 'huddled masses,' the 'wretched refuse,' the 'homeless, tempest-tost.' Read against the Rohingya drownings the poem becomes an accusation rather than a comfort: the Rohingya are exactly Lazarus's tempest-tossed exiles, yet the shores they approach lift no lamp and open no golden door, pushing their boats back into the monsoon instead. The distance between the sonnet's promise and the sea's verdict measures how completely those professed ideals have failed the more than 500 who never reached any shore. What was written as a welcome now reads as an indictment.",
        "excerpt": "\"Keep, ancient lands, your storied pomp!\" cries she / With silent lips. \"Give me your tired, your poor, / Your huddled masses yearning to be free, / The wretched refuse of your teeming shore. / Send these, the homeless, tempest-tost to me, / I lift my lamp beside the golden door!\"",
        "source": "Emma Lazarus, 'The New Colossus' (1883), in The Poems of Emma Lazarus, Vol. I, Project Gutenberg eBook #3295.",
        "href": "https://www.gutenberg.org/files/3295/3295-h/3295-h.htm",
        "image": {
          "src": "/covers/myanmar-rohingya-boats-500-dead--a3.png",
          "alt": "Emma Lazarus's handwritten 1883 manuscript of the sonnet 'The New Colossus', held by the Library of Congress.",
          "credit": "Emma Lazarus, autograph manuscript of 'The New Colossus' (1883), Library of Congress; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "In 1816 the French frigate Meduse ran aground off West Africa through the incompetence of its politically appointed captain; some 150 people were crowded onto a hastily built raft and then cut loose to drift, and after thirteen days of thirst, madness, and cannibalism only fifteen were still alive. Gericault spent a year on his enormous canvas, interviewing survivors and even studying corpses, to force the public to look at bodies sprawled and sliding into the sea while a handful of the living strain toward a speck of rescue on the horizon. The painting is fundamentally about abandonment, human beings left to die on the water by the authorities responsible for them, which is exactly the charge the Rohingya disaster levels at the states ringing the Bay of Bengal. The overloaded boats out of Rakhine were their own rafts of the Medusa, and the more than 500 feared dead are the figures Gericault painted, only without the rescuing ship on the horizon. Nearly two centuries on it remains the definitive image of the persecuted delivered up to an indifferent sea.",
        "excerpt": "Gericault's raft rises before us as a pyramid of the dead and the barely living, limbs trailing into the swell, one survivor waving a scrap of cloth toward a horizon that may hold rescue or only more emptiness. It is a monument to people abandoned on the water by those who should have saved them. Look at it now and the raft becomes a capsized boat in the Bay of Bengal.",
        "source": "Theodore Gericault, 'The Raft of the Medusa' (Le Radeau de la Meduse), 1818-19, oil on canvas, Musee du Louvre, Paris. Image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:JEAN_LOUIS_TH%C3%89ODORE_G%C3%89RICAULT_-_La_Balsa_de_la_Medusa_(Museo_del_Louvre,_1818-19).jpg",
        "image": {
          "src": "/covers/myanmar-rohingya-boats-500-dead--a4.png",
          "alt": "Theodore Gericault's monumental 1819 painting of survivors and corpses crowded on a makeshift raft at sea, one man waving toward a distant ship.",
          "credit": "Theodore Gericault, 'The Raft of the Medusa' (1818-19), Musee du Louvre; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Turner's 1840 'Slave Ship' was inspired by the Zong massacre, in which the crew of a slave ship threw sick and dying captives overboard to claim insurance money, and by the abolitionist campaigns of his own day. His canvas is a maelstrom of blood-red sky and churning water, the chained limbs of the drowning barely visible amid the foam as a typhoon bears down, the sea rendered as an accomplice to human cruelty and greed that literally casts people into the deep. The parallel to the Rohingya is not slavery but the same underlying logic: a people treated as disposable, their lives weighed against convenience, and the ocean left to do the work of erasure. Where Turner indicts a commerce that drowned human beings for profit, the Bay of Bengal drownings indict a politics that lets the stateless drown for want of anywhere to land. Both turn the sunset sea into something vast, beautiful, and damning, a grave that swallows the unwanted and keeps no record.",
        "excerpt": "Turner paints the sea itself as the executioner: a furnace of red and gold light above, and below it the shackled arms and legs of the drowning, tossed overboard and left to the coming storm. Beauty and atrocity share one canvas, and the water erases the evidence. The Rohingya lost off Rakhine vanish into the same indifferent, record-keeping-less deep.",
        "source": "J. M. W. Turner, 'Slave Ship (Slavers Throwing Overboard the Dead and Dying, Typhoon Coming On)', 1840, oil on canvas, Museum of Fine Arts, Boston. Image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Slave-ship.jpg",
        "image": {
          "src": "/covers/myanmar-rohingya-boats-500-dead--a5.png",
          "alt": "J. M. W. Turner's 1840 painting of a slave ship in a fiery sunset, with the limbs of drowning enslaved people visible in the churning sea as a typhoon approaches.",
          "credit": "J. M. W. Turner, 'The Slave Ship' (1840), Museum of Fine Arts, Boston; Wikimedia Commons (public domain)."
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "britain-nationalises-british-steel",
    "headline": "Britain nationalises British Steel, taking full control of the Chinese-owned Scunthorpe steelworks",
    "overview": "The UK government said Thursday it had brought British Steel fully into public ownership, completing a takeover of the loss-making, Chinese-owned company to safeguard the country's ability to make steel. Ministers had seized operational control of the Scunthorpe plant from owner Jingye in April 2025 to prevent its closure and protect about 2,700 jobs, and new legislation cleared the way for full nationalisation after a public-interest test. Outgoing Prime Minister Keir Starmer said the decision \"secures the future of steelmaking in the UK.\"",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQbW1QSTNLcmtKbnJ3YXBuVW9NclBGZG5oLWNkR1hHNV9PcjZjSXVNdmRYanpnRDZwN0cxemV4TnczUnR6SzQ0Y0tfcjFEWEJDY3g5b2x0OF9UbUhSdHV3Y20ya0E2R1d5MnpybHR3aVMzMGRDeVJoYXdZeFRtQXhxb3RRMDVSWXAxS2xJZUI0bll0VEdQZ2RVdGt3?oc=5"
      },
      {
        "name": "City A.M.",
        "href": "https://www.cityam.com/government-nationalises-british-steel/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/britain-nationalises-british-steel.png",
      "alt": "The British Steel works at Scunthorpe in northern England.",
      "credit": "Wikimedia Commons (geograph.org.uk)"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the spring of 1915 the shell crisis exposed how a nation at war could not entrust the sinews of its survival to the ordinary market. British guns at Neuve Chapelle fell silent for want of ammunition, and within weeks Asquith's government created a Ministry of Munitions under David Lloyd George, who declared that victory itself hinged on the supply of shells. The Munitions of War Act of July 1915 dragged private armaments works under state control, capped profits, and raised new national factories run in the public interest. It was the moment Britain first accepted that certain industries are too strategic to be left to fail. The takeover of British Steel echoes that wartime logic exactly: ministers seized operational control of Scunthorpe in April 2025 to keep the furnaces from going cold, judging the capacity to make steel a matter of national security rather than of profit and loss.",
        "excerpt": "ultimate victory or defeat in this War depends upon the supply of the munitions which the rival countries can produce, and with which they can equip their armies in the field. That is the cardinal fact of the military situation.",
        "source": "David Lloyd George, statement on munitions, House of Commons, 23 June 1915; Historic Hansard (UK Parliament).",
        "href": "https://api.parliament.uk/historic-hansard/commons/1915/jun/23/statement-by-mr-lloyd-george",
        "image": {
          "src": "/covers/britain-nationalises-british-steel--a0.png",
          "alt": "Munition workers among rows of artillery shells in a warehouse at the National Shell Filling Factory No. 6, Chilwell, Nottinghamshire, 1917.",
          "credit": "Photograph by Horace Nicholls, 1917. Imperial War Museums (Q 30018), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "A generation later, Clement Attlee's Labour government made steel the last and most bitterly contested prize of its postwar nationalisation programme. The Iron and Steel Act 1949 vested the share capital of some eighty principal iron and steel companies in a new Iron and Steel Corporation of Great Britain, treating the furnaces of Scunthorpe, Sheffield and South Wales as a strategic national asset rather than private property. The measure was so divisive that the Conservatives reversed it in 1953, only for Labour to renationalise the industry in 1967 as British Steel Corporation, a decades-long tug of war over who should own the nation's metal. Thursday's completion of public ownership closes that long circle: once again a Labour government has judged that the country's ability to make its own steel cannot be surrendered, this time buying out a Chinese owner, Jingye, after a public-interest test. Where 1949 nationalised an entire industry on principle, 2025 nationalises a single works out of necessity, but the conviction that steel belongs to the nation is unchanged.",
        "excerpt": "The Iron and Steel Act 1949 pulled the country's furnaces into public hands as a matter of principle, declaring that a modern state could not leave its own capacity to forge metal to the mercy of private shareholders. Ministers of the day spoke of steel as the backbone of everything else Britain built, from ships to railways to homes. The rescue of Scunthorpe seventy-six years later answers the same instinct, only now the threat is closure and foreign retreat rather than the case for common ownership.",
        "source": "Iron and Steel Act 1949 (12, 13 & 14 Geo. 6 c. 72), primary legislation as enacted; legislation.gov.uk, The National Archives.",
        "href": "https://www.legislation.gov.uk/ukpga/Geo6/12-13-14/72/enacted",
        "image": {
          "src": "/covers/britain-nationalises-british-steel--a1.png",
          "alt": "The basic oxygen steelmaking plant at the Scunthorpe Steelworks, the same site brought into public ownership.",
          "credit": "Photograph by Jaxboy32, 2014 (CC0 1.0), via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Rebecca Harding Davis's 1861 novella \"Life in the Iron-Mills\" is the great early cry of literature against the human cost of the forge. Set in a smoke-choked Virginia mill town, it renders the ironworks as a literal inferno of molten metal and exhausted men, insisting that the nation reckon with the lives it consumes to make its iron. Davis's furnace-hands are not abstractions but the puddler Hugh Wolfe and the hunchbacked Deborah, whose fates are welded to the mill that owns them. Her point was that a country's industrial might is inseparable from the workers who feed the fire, a truth that hovers over every headline about a steelworks. The nationalisation of British Steel is ultimately about the roughly 2,700 people whose livelihoods hang on Scunthorpe's furnaces staying lit, the flesh-and-blood stake behind an abstract debate over ownership.",
        "excerpt": "Fire in every horrible form: pits of flame waving in the wind; liquid metal-flames writhing in tortuous streams through the sand; wide caldrons filled with boiling fire, over which bent ghastly wretches stirring the strange brewing; and through all, crowds of half-clad men, looking like revengeful ghosts in the red light, hurried, throwing masses of glittering fire.",
        "source": "Rebecca Harding Davis, \"Life in the Iron-Mills\" (The Atlantic Monthly, 1861); Project Gutenberg eBook #876.",
        "href": "https://www.gutenberg.org/cache/epub/876/pg876.txt",
        "image": {
          "src": "/covers/britain-nationalises-british-steel--a2.png",
          "alt": "Coalbrookdale by Night: the furnaces of the Bedlam ironworks glowing red against a dark sky, 1801.",
          "credit": "Philip James de Loutherbourg, \"Coalbrookdale by Night\", 1801, Science Museum, London; via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Charles Dickens gave the industrial town its enduring name and face in \"Hard Times\" (1854) with Coketown, a place of red brick blackened by soot, endless chimneys, and machinery that never rests. Dickens saw the mill town as both the engine of Victorian prosperity and a monument to what that prosperity ground down, its serpents of smoke coiling over lives shaped entirely by the works. Coketown stands for every community whose identity, pride and daily bread are inseparable from a single dominant industry. Scunthorpe is a modern Coketown in exactly this sense: a town built around its steel, where the closing of the furnaces would not merely cost jobs but hollow out the place itself. The government's insistence that it acted to \"secure the future of steelmaking\" is, at bottom, an attempt to keep a Coketown from going dark.",
        "excerpt": "It was a town of red brick, or of brick that would have been red if the smoke and ashes had allowed it; but as matters stood, it was a town of unnatural red and black like the painted face of a savage. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled.",
        "source": "Charles Dickens, \"Hard Times\" (1854), Book the First, Chapter V; Project Gutenberg eBook #786.",
        "href": "https://www.gutenberg.org/cache/epub/786/pg786.txt",
        "image": {
          "src": "/covers/britain-nationalises-british-steel--a3.png",
          "alt": "Manchester from Kersal Moor, an 1852 view of the industrial city with church spires and smoking factory chimneys.",
          "credit": "William Wyld, \"Manchester from Kersal Moor, with rustic figures and goats\", 1852, Royal Collection (RCIN 920223); via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Adolph von Menzel's monumental canvas \"The Iron Rolling Mill\" (Eisenwalzwerk, 1875), nicknamed \"Modern Cyclopes,\" is the first great painting of heavy industry as it actually looked and felt. Rather than a picturesque forge, Menzel painted a sprawling German rolling mill in full roar: sweating workers wrestling white-hot metal through the rollers, the glare of the ingots washing over their strained bodies, the machinery dwarfing the men who serve it. It is an unsentimental portrait of the modern steel plant as a place of collective, exhausting, indispensable labour, painted at the moment such mills were becoming the muscle of national power. Menzel's mill is the direct nineteenth-century ancestor of Scunthorpe's furnaces, and his subject, the choreography of men and molten metal, is precisely what British Steel's nationalisation seeks to preserve. To look at his \"Cyclopes\" is to understand why a government would treat the loss of such a plant as the loss of something civic and irreplaceable.",
        "excerpt": "Menzel's mill hall is a cathedral of labour lit not by windows but by the searing glow of raw iron. Half-stripped men lean into the rollers with a weary, practised violence, their faces caught between exhaustion and concentration as the white ingot passes. The painting refuses romance; it shows steelmaking as the hard, communal, essential work of a nation, the very thing ministers describe when they speak of securing the future of steel.",
        "source": "Adolph von Menzel, \"The Iron Rolling Mill (Modern Cyclopes)\" / \"Eisenwalzwerk\", 1875, oil on canvas, Alte Nationalgalerie, Berlin; via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/britain-nationalises-british-steel--a4.png",
          "alt": "The Iron Rolling Mill by Adolph von Menzel, 1875: workers labouring around glowing metal amid the machinery of a German ironworks.",
          "credit": "Adolph von Menzel, \"Eisenwalzwerk\" (The Iron Rolling Mill), 1875, Alte Nationalgalerie, Berlin; via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby's \"An Iron Forge\" (1772) captured the dawn of the Industrial Revolution with the reverence usually reserved for sacred scenes. A single incandescent bar of iron on the anvil throws a supernatural light across the smith's family, transforming a working forge into something between a nativity and a temple of the new age of metal. Wright, the painter of the early industrial Midlands, understood that iron was becoming the foundation of British power and pride, and he lit it accordingly. Two and a half centuries later the same glowing bar animates the debate over Scunthorpe: steelmaking remains a source of national identity as much as of GDP, a craft the country is unwilling to see extinguished. Wright's forge, radiant and domestic, is a reminder that Britain has treated the making of iron as part of who it is since the very beginning, which is why its government moved to keep the fire burning.",
        "excerpt": "Wright bathes the forge in the white heat of the iron itself, so that the glowing bar, not the sky, becomes the source of all light. The smith and his family gather around it with the hush of worshippers, awed by the raw material of a new age. It is industry painted as wonder, and it explains why the loss of a steelworks can feel like the loss of a birthright rather than merely a business.",
        "source": "Joseph Wright of Derby, \"An Iron Forge\", 1772, oil on canvas, Tate Britain (T06670); Tate collection object page.",
        "href": "https://www.tate.org.uk/art/artworks/wright-an-iron-forge-t06670",
        "image": {
          "src": "/covers/britain-nationalises-british-steel--a5.png",
          "alt": "An Iron Forge by Joseph Wright of Derby, 1772: a glowing bar of hot iron on the anvil illuminating the smith and his family.",
          "credit": "Joseph Wright of Derby, \"An Iron Forge\", 1772, Tate Britain (T06670); via Wikimedia Commons (Google Art Project)."
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "us-25-percent-tariff-brazil",
    "headline": "The U.S. imposes a 25% tariff on many Brazilian imports from July 22, citing unfair trade practices",
    "overview": "The Trump administration said it will impose a 25% tariff on a broad range of Brazilian imports starting July 22, after a yearlong U.S. Trade Representative investigation alleged unfair practices, including lax anti-corruption enforcement and Brazil's own tariffs. The order exempts goods not made in the U.S. or deemed vital to supply chains — among them coffee, beef, oranges and some energy products and aerospace parts. President Luiz Inácio Lula da Silva has condemned the move as politically motivated.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxQcndTakZ3d1hqOTFyemJGZnlCX2ZidmpzbXh3V0JaQUtTd1BrSXM0bi1HQmNMaVY0ejZsTGxwX3BDdkpQV2pOME0xYjk4b0JMOUxIQ3RfM3hnbGlvNkI2dTZORDIybVlMMkI2b2lVVTRwRWx0VW5CVlhrcEZXMmlPNVExd21iMFA1Z3JB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxQbGRpMHZ2OHBuOU0tdVU1ZDFaQ29kd2RUNTZxV0VDWGVDcHBtSmxZal9LZjhWMC14T3pwcUt1RHFfUFJ6bDJYMUgyYjFCd293dVlnUndVLXZRS2VkR1AtUVhyZzVraVczVHRNMmNzWGdlNHBONEhnUnYxTlR3d3p2aUxYLW5JVTI1RkgtODEzX3lIUG8?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/us-25-percent-tariff-brazil.png",
      "alt": "Container cranes at the Port of Santos, Brazil's main export gateway.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In June 1930, over the recorded objection of more than a thousand economists, the United States enacted the Smoot-Hawley Tariff Act, raising duties on thousands of imports to shield American farmers and manufacturers. Rather than protect the economy, it invited retaliation and helped shrink world trade by roughly two-thirds between 1929 and 1934, deepening the Great Depression. The parallel to Washington's July 2026 move against Brazil is direct: a sweeping 25% duty justified in the language of fairness and domestic protection, imposed unilaterally against a major partner, and likely to provoke countermeasures. Like Hoover's tariff, which began as narrow farm relief before ballooning into comprehensive protectionism, the Brazil order pairs a broad blanket of goods with pointed exemptions such as coffee, beef, oranges and aerospace parts. Smoot-Hawley became a permanent watchword for how protectionist gestures misfire, and Lula's charge that the measure is politically motivated echoes the era's beggar-thy-neighbor spiral. History warns that the costs of such tariffs fall unpredictably on both sides of the border.",
        "excerpt": "The tariff began life as a modest promise of relief to struggling farmers, then swelled, schedule by schedule, into a wall around the whole economy. Trading partners answered in kind, ledgers of commerce collapsed, and the measure that was meant to save American producers instead helped starve the world of trade. Its authors' names survive mainly as a caution.",
        "source": "U.S. Department of State, Office of the Historian, \"Protectionism in the Interwar Period\" (Milestones, 1921-1936), on the Smoot-Hawley Tariff Act of 1930.",
        "href": "https://history.state.gov/milestones/1921-1936/protectionism",
        "image": {
          "src": "/covers/us-25-percent-tariff-brazil--a0.png",
          "alt": "Representative Willis C. Hawley (left) and Senator Reed Smoot standing together, April 11, 1929, sponsors of the Smoot-Hawley Tariff Act.",
          "credit": "National Photo Company / U.S. Library of Congress Prints and Photographs Division; public domain."
        }
      },
      {
        "category": "historical",
        "title": "On 21 November 1806, from newly conquered Berlin, Napoleon issued a decree declaring the British Isles under blockade and forbidding all commerce and correspondence with Britain, the founding act of the Continental System. It was an attempt to defeat a rival not on the battlefield but through trade, economic coercion dressed as statecraft, much as Lula characterizes the U.S. tariff as politically motivated rather than a genuine trade remedy. Napoleon's blockade ultimately damaged the very European economies it was meant to marshal, breeding smuggling, resentment, and eventually the ruinous 1812 invasion of Russia over trade defections. The parallel lies in trade weaponized for political ends, complete with enforcement gaps and exemptions that quietly undermine the grand design. Then as now, a sweeping edict against a large economy proved far easier to proclaim than to sustain. The collateral damage landed widely, on friend and enemy alike.",
        "excerpt": "The British Isles are declared to be in a state of blockade. All commerce and all correspondence with the British Isles are forbidden. ... Trade in English goods is prohibited, and all goods belonging to England or coming from her factories or her colonies are declared a lawful prize.",
        "source": "Napoleon I, Berlin Decree, 21 November 1806 (English translation), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree",
        "image": {
          "src": "/covers/us-25-percent-tariff-brazil--a1.png",
          "alt": "Map of Europe showing the First French Empire and satellite states enforcing Napoleon's Continental Blockade against Britain, c. 1811.",
          "credit": "Wikimedia Commons, CC BY-SA 3.0 / GFDL."
        }
      },
      {
        "category": "literary",
        "title": "In Book IV of The Wealth of Nations (1776), Adam Smith mounted the classic case against the mercantilist protectionism that the Brazil tariff revives, arguing that a nation, like a prudent household, gains nothing by making at home what it could buy more cheaply abroad. Smith warned that duties designed to favor domestic producers merely divert capital into less efficient channels and tax ordinary consumers for the benefit of a few industries. The U.S. order's carve-outs for coffee, beef and oranges, goods Americans cannot readily grow, inadvertently vindicate Smith's point that tariffs are hardest to justify precisely where they would bite consumers most. His famous image of the invisible hand appears in this very chapter, alongside his insistence that what is prudence in the conduct of a private family can scarcely be folly in that of a great kingdom. Against Washington's fairness rhetoric, Smith offers the enduring free-trade rejoinder that protection commonly costs a country more than it ever saves.",
        "excerpt": "It is the maxim of every prudent master of a family never to attempt to make at home what it will cost him more to make than to buy. The taylor does not attempt to make his own shoes, but buys them of the shoemaker. The shoemaker does not attempt to make his own clothes, but employs a taylor. The farmer attempts to make neither the one nor the other, but employs those different artificers.",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776), Book IV, Chapter II; Library of Economics and Liberty (econlib.org).",
        "href": "https://www.econlib.org/library/Smith/smWN13.html",
        "image": {
          "src": "/covers/us-25-percent-tariff-brazil--a2.png",
          "alt": "The Muir portrait of Adam Smith (c. 1800), Scottish political economist and author of The Wealth of Nations.",
          "credit": "Unknown artist, Scottish National Gallery; via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "literary",
        "title": "Frederic Bastiat's 1845 satire, the Petition of the Candlemakers, imagines France's candle industry begging the government to block out the sun, an unbeatable foreign competitor, so that domestic lamp-makers might prosper. By pushing protectionist logic to absurdity, Bastiat exposed how tariffs enrich narrow producers while impoverishing everyone who must pay more, whether for light or for imported goods. The U.S. case against Brazil, framed as a remedy for unfair foreign advantages, is exactly the kind of reasoning Bastiat lampooned: if cheapness itself is the grievance, then the most generous benefactor becomes the most dangerous rival. His mock-petition even indulges in the special pleadings and selective favors that mirror the tariff order's carve-outs. Nearly two centuries on, the candlemakers' plea remains the sharpest one-page refutation of protectionism ever written. It reads today as if drafted for the very industries lobbying for shelter behind a 25% wall.",
        "excerpt": "What we pray for is, that it may please you to pass a law ordering the shutting up of all windows, sky-lights, dormer-windows, outside and inside shutters, curtains, blinds, bull's-eyes; in a word, of all openings, holes, chinks, clefts, and fissures, by or through which the light of the sun has been in use to enter houses.",
        "source": "Frederic Bastiat, \"A Petition\" (the Candlemakers' Petition), from Economic Sophisms (1845), English translation, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Economic_Sophisms/Chapter_7",
        "image": {
          "src": "/covers/us-25-percent-tariff-brazil--a3.png",
          "alt": "Engraved 1848 portrait of the French economist Frederic Bastiat, from the Gallery of the People's Representatives.",
          "credit": "Auguste-Hilaire Leveille after Emile Desmaisons; via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Nathaniel Currier's hand-colored 1846 lithograph The Destruction of Tea at Boston Harbor dramatizes the December 1773 night when colonists, disguised as Mohawks, dumped 342 chests of East India Company tea into the water to protest the Tea Act and Parliament's authority to tax colonial trade. The print renders a customs-and-tariff grievance as popular spectacle, crowds cheering from the wharf as cargo is destroyed rather than landed and taxed. It is the visual archetype of trade policy igniting political defiance, a resonance the Brazil dispute revives as Lula denounces the U.S. duties as coercive and politically motivated. Where the colonists refused the tea rather than pay the levy, Brazil's leadership refuses the premise of the tariff itself. Currier's image is a reminder that tariffs are never merely economic; they are read as assertions of power. And they can inflame the very partners they are meant to discipline.",
        "excerpt": "Torchlight glances off the harbor as figures in feathered disguise heave chest after chest over the rail, the tea spilling dark into the water. On the crowded wharf a throng waves hats and cheers, turning an act of smuggling-in-reverse into public theater. The scene freezes the instant a tax dispute becomes open rebellion.",
        "source": "Nathaniel Currier (lithographer), The Destruction of Tea at Boston Harbor, 1846, hand-colored lithograph; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Boston_Tea_Party_Currier_colored.jpg",
        "image": {
          "src": "/covers/us-25-percent-tariff-brazil--a4.png",
          "alt": "Hand-colored 1846 lithograph depicting colonists dumping East India Company tea into Boston Harbor during the 1773 Boston Tea Party.",
          "credit": "Nathaniel Currier, 1846; via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "The 1807 American cartoon known as Ograbme, embargo spelled backward, shows a snapping turtle seizing a merchant by his tobacco barrels as he tries to smuggle goods to a waiting British ship, mocking Thomas Jefferson's Embargo Act. That law barred American vessels from foreign trade in an effort to pressure Britain and France without war, but it devastated U.S. ports, spurred rampant smuggling, and was repealed within about fifteen months. The engraving captures the self-inflicted wound of trade restriction, the same risk critics identify in a broad 25% tariff on Brazilian goods. Like the embargo, the new order is defended as principled statecraft yet threatens to bite domestic importers, exporters and consumers first. The grasping turtle endures as an emblem of how trade barriers can clamp down hardest on the country that erects them. It turns a policy meant to punish others into a trap that catches one's own.",
        "excerpt": "A gnarled snapping turtle lunges up from the ground and clamps its jaws on a merchant's backside as he hauls a barrel toward the shore, cursing the beast by name. The single word Ograbme, embargo reversed, does the satire's work: the restriction meant to grip foreign powers has instead seized the American trader. It is protest reduced to one biting image.",
        "source": "\"Ograbme\" (Embargo reversed), American political cartoon on Jefferson's Embargo Act, 1807, attributed to Alexander Anderson; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Ograbme.jpg",
        "image": {
          "src": "/covers/us-25-percent-tariff-brazil--a5.png",
          "alt": "1807 political cartoon of a snapping turtle labeled Ograbme biting a merchant smuggling goods, satirizing Jefferson's Embargo Act.",
          "credit": "Attributed to Alexander Anderson, 1807; via Wikimedia Commons, public domain."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "iea-china-rare-earth-6-5-trillion",
    "headline": "The IEA warns China's rare-earth export curbs could put $6.5 trillion of Western industrial production at risk",
    "overview": "The International Energy Agency warned Thursday that full implementation of China's expanded rare-earth export controls could expose about $6.5 trillion of production outside China — across the automotive, high-tech, defence and energy sectors — to supply disruption, with roughly $4.2 trillion of that in IEA member countries. Automotive output faces the biggest direct exposure, more than $3 trillion. China still controls about 85% of the market and expanded its licensing rules last October before agreeing to delay them for a year.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi0gFBVV95cUxPQ1JvOGNOVF9NekpFQlJZLWowNkRlZkpZa2JjcnBSalhndDhwb09Gel9TdnNwYUctMlc3VXlHTjlzV0hwMkdBWGdGS04zSUpxdmhnX0JVeU9rRFFMVXFTVkRLaHR4b21NTTFONGVVR1U4VVZ3ZmlUQmRHcHphczdnWExMNFNVS0tWLTE1OEwzakl2VmJZMC1qS2c2YlhxaGNkbi03RjVjbzNRcWhzWkZITjhMR3VrNXB2eU0xaDlCWFN1TThDUkJjVTRDRkI4UkV1T1E?oc=5"
      },
      {
        "name": "IEA",
        "href": "https://www.iea.org/reports/rare-earth-elements/executive-summary"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/iea-china-rare-earth-6-5-trillion.png",
      "alt": "Samples of rare-earth oxides.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The IEA's warning that China's rare-earth curbs could imperil $6.5 trillion of Western output is the clearest echo of October 1973, when the Arab members of OPEC turned a commodity the industrial world could not do without into an instrument of statecraft. Then it was crude oil; now it is the seventeen lanthanide elements that quietly enable magnets, motors, missiles and wind turbines. In 1973 the shock came through price, as the barrel first doubled then quadrupled; in 2025 the mechanism is licensing and administrative delay, but the strategic logic is identical. What both episodes reveal is the vulnerability created when a single bloc controls a chokepoint input, here China's roughly 85 percent of the market, and the dependent economies discover their exposure only after the tap is threatened. The embargo also rewired policy for a generation, birthing the IEA itself and strategic reserves; today's rare-earth alarm is prompting the same scramble for stockpiles, alliances and substitutes.",
        "excerpt": "Arab members of the Organization of Petroleum Exporting Countries (OPEC) imposed an embargo against the United States in retaliation for the U.S. decision to re-supply the Israeli military... The price of oil per barrel first doubled, then quadrupled, imposing skyrocketing costs on consumers and structural challenges to the stability of whole national economies.",
        "source": "U.S. Department of State, Office of the Historian, \"Oil Embargo, 1973-1974,\" Milestones in the History of U.S. Foreign Relations.",
        "href": "https://history.state.gov/milestones/1969-1976/oil-embargo",
        "image": {
          "src": "/covers/iea-china-rare-earth-6-5-trillion--a0.png",
          "alt": "A closed Oregon service station displaying a hand-lettered 'NO GAS' sign during the fall of 1973 oil crisis",
          "credit": "David Falconer, U.S. National Archives (DOCUMERICA / EPA), 1973 — public domain"
        }
      },
      {
        "category": "historical",
        "title": "If 1973 is the distant precedent, 2010 is the dress rehearsal for exactly the weapon the IEA now fears. After a fishing-trawler collision near the disputed Senkaku/Diaoyu Islands, Chinese customs quietly stopped processing rare-earth shipments to Japan, whose high-tech and automotive supply chains then drew nearly ninety percent of their rare earths from China. Prices spiked, Japanese manufacturers panicked, and Tokyo responded with recycling, stockpiles and the Lynas deal in Australia, much as the West is now being told to diversify. The 2010 cutoff proved that Beijing could convert market dominance into geopolitical leverage without ever announcing a formal embargo, precisely the ambiguity built into last October's expanded licensing rules and their one-year delay. The IEA's $6.5 trillion figure is simply that 2010 shock scaled up to the whole industrial world, with automotive output alone, more than $3 trillion, in the direct line of fire.",
        "excerpt": "In September 2010 a maritime clash near the Senkaku Islands prompted China to throttle rare-earth deliveries to Japan without ever issuing a formal ban, exposing how dependence on a single supplier can be turned into coercive pressure. The episode is the template analysts now invoke: quiet administrative friction at the border, not tariffs or blockades, is enough to convulse downstream manufacturing. Fifteen years later the same playbook, expanded to licensing rules covering the whole world, is what the IEA is measuring in the trillions.",
        "source": "Gracelin Baskaran and Meredith Schwartz, \"China's Rare Earth Campaign Against Japan,\" Center for Strategic and International Studies (CSIS), 13 January 2026.",
        "href": "https://www.csis.org/analysis/chinas-rare-earth-campaign-against-japan",
        "image": {
          "src": "/covers/iea-china-rare-earth-6-5-trillion--a1.png",
          "alt": "Powdered samples of rare-earth oxides — praseodymium, cerium, lanthanum, neodymium, samarium and gadolinium",
          "credit": "Peggy Greb, U.S. Department of Agriculture, Agricultural Research Service — public domain"
        }
      },
      {
        "category": "literary",
        "title": "Long before economists measured strategic minerals in trillions, the medieval Nibelungenlied intuited that a concentrated hoard of the earth's treasure is never neutral: it is power, temptation and doom fused together. Siegfried is asked to divide the Nibelung hoard, a mass of gems and gold so vast that a hundred wagons could not bear it away, and the treasure thereafter draws murder, betrayal and finally the drowning of the gold in the Rhine so no rival may command it. That instinct, that whoever controls the hoard controls the fate of kingdoms and will hide or hoard it rather than share, maps neatly onto a single state holding 85 percent of the world's rare earths. The poem's tragedy is that the treasure cannot simply be owned; it commands its owner, and everyone dependent on it, into conflict. The IEA's warning that $6.5 trillion of production hangs on access to one country's export licences is the same ancient anxiety, now denominated in supply chains rather than wagon-loads of gold.",
        "excerpt": "Right well did they receive him, Schilbung and Nibelung, / And straight they both together, these noble princes young, / Bade him mete out the treasure, the full valorous man, / And so long time besought him that he at last the task began. / As we have heard in story, he saw of gems such store / That they might not be laden on wagons full five score; / More still of gold all shining from Nibelungenland. / 'Twas all to be divided between them by keen Siegfried's hand.",
        "source": "The Nibelungenlied, Third Adventure, stanzas 91-92, trans. George Henry Needler (1904); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/7321/7321-h/7321-h.htm",
        "image": {
          "src": "/covers/iea-china-rare-earth-6-5-trillion--a2.png",
          "alt": "Peter von Cornelius's 1859 depiction of Hagen sinking the Nibelung hoard into the Rhine",
          "credit": "Peter von Cornelius, 1859, Alte Nationalgalerie, Berlin — public domain"
        }
      },
      {
        "category": "literary",
        "title": "John Ruskin's 1860 essay \"The Veins of Wealth\" supplies the moral economics beneath the IEA's arithmetic. Ruskin insisted that riches are not an absolute quantity but a relation of power, valuable precisely because others lack them, so that to be rich is to command the labour and need of your neighbour. Read against China's 85 percent grip on rare earths, his argument is startlingly exact: the leverage of a resource lies not in owning it but in others' default, in their inability to obtain it elsewhere. The $6.5 trillion the IEA places at risk, roughly $4.2 trillion of it in member states, is the measure of that dependence, the inequality through which one supplier's licensing rules become a lever over the world's factories. Ruskin saw that accumulating such power is \"equally and necessarily the art of keeping your neighbour poor,\" a Victorian sentence that reads today like a caption for a diagram of the rare-earth supply chain.",
        "excerpt": "...riches are a power like that of electricity, acting only through inequalities or negations of itself. The force of the guinea you have in your pocket depends wholly on the default of a guinea in your neighbour's pocket... the art of making yourself rich, in the ordinary mercantile economist's sense, is therefore equally and necessarily the art of keeping your neighbour poor.",
        "source": "John Ruskin, \"The Veins of Wealth,\" Essay II of Unto This Last (1860; collected 1862).",
        "href": "https://www.ourcivilisation.com/smartboard/shop/ruskinj/last/chap2.htm",
        "image": {
          "src": "/covers/iea-china-rare-earth-6-5-trillion--a3.png",
          "alt": "Self-portrait of John Ruskin, watercolour and pencil, 1875",
          "credit": "John Ruskin, self-portrait, 1875 — public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner built an entire music drama, Das Rheingold, on the premise the IEA now costs in trillions: that mastery of a mineral drawn from the earth confers dominion over the world, but only to whoever will pay its moral price. The Rhinemaidens explain that a ring forged from the Rhinegold grants measureless power, yet only one who forswears love can make it, and the dwarf Alberich duly renounces love, seizes the gold, and enslaves the Nibelungs to mine it for him. Wagner's Nibelheim, a subterranean sweatshop of hammering smiths, is the mythic ancestor of every rare-earth mine and refinery whose output the modern economy cannot replace. His deeper theme, that such concentrated command of the earth's wealth carries a curse and bends its holder toward coercion, hangs over Beijing's 85 percent market share and the $6.5 trillion of production the IEA says now depends on it. The Ring cycle is finally a warning that whoever gathers the world's power into a single stone invites the very conflict that destroys them.",
        "excerpt": "That man surely / The earth would inherit / Who from the Rhinegold / Fashioned the ring / Which measureless power imparts. / Only the man / Who love defies, / Only the man / From love who flies / Can learn and master the magic / That makes a ring of the gold.",
        "source": "Richard Wagner, The Rhinegold (Das Rheingold), Scene I, trans. Margaret Armour, in The Rhinegold & The Valkyrie, illustrated by Arthur Rackham (1910); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/48214/48214-h/48214-h.htm",
        "image": {
          "src": "/covers/iea-china-rare-earth-6-5-trillion--a4.png",
          "alt": "Arthur Rackham's 1910 illustration of the Rhinemaidens and Alberich around the Rhinegold",
          "credit": "Arthur Rackham, 1910, from 'The Rhinegold & The Valkyrie' — public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Where Wagner mythologises the earth's wealth, Vincent van Gogh's 1882 watercolour of women bent double under sacks of coal shows its human ground truth. Painted after his time among the miners of the Borinage, the image insists that the minerals modern industry treats as line items are wrenched from the ground by bodies and communities, a reality easy to abstract away in a headline about $6.5 trillion of output. The rare-earth story is at bottom a mining story: the automotive sector's more than $3 trillion of exposure rests on ores dug, crushed and refined in a handful of places, overwhelmingly in China. Van Gogh's stooped figures, trudging through snow with the burden of the earth on their backs, are the unglamorous foundation of the magnets and motors the IEA is worried about. His picture reminds us that behind every supply-chain flowchart stand the miners and the mined land, and that dependence on so few sources is also a dependence on their labour and their weather.",
        "excerpt": "Van Gogh's watercolour turns a supply chain back into flesh and weather: women hauling sacks of coal through snow, spines curved under the literal weight of the earth's wealth. It is a reminder that the rare-earth economy the IEA prices in trillions begins, as coal did, in the muscle of mining communities and the geology of a few favoured sites. The abstraction of 'exposure' resolves, at its source, into people bearing the ground on their backs.",
        "source": "Vincent van Gogh, Women Carrying Sacks of Coal in the Snow, watercolour, 1882, Kröller-Müller Museum, Otterlo.",
        "href": "https://commons.wikimedia.org/wiki/File:Women_carrying_sacks_of_coal_in_the_snow_-_Vincent_Van_Gogh.jpg",
        "image": {
          "src": "/covers/iea-china-rare-earth-6-5-trillion--a5.png",
          "alt": "Van Gogh's 1882 watercolour of miners' wives carrying heavy sacks of coal through the snow",
          "credit": "Vincent van Gogh, 1882, Kröller-Müller Museum — public domain"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "hyundai-full-ownership-boston-dynamics",
    "headline": "Hyundai Motor Group moves to take full ownership of Boston Dynamics, buying SoftBank's remaining stake for about $325 million",
    "overview": "Hyundai Motor Group said Thursday it is acquiring SoftBank's remaining roughly 10% stake in Boston Dynamics for about $325 million, giving the South Korean carmaker full ownership of the robotics firm after SoftBank exercised a put option. Hyundai bought an 80% controlling stake from SoftBank in 2021 in a deal valued at $1.1 billion, and later capital increases had cut SoftBank's holding. The company plans to deploy Boston Dynamics' Atlas humanoid robot at a car plant in Georgia from 2028.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPLUJvRFpqWVl4UHVLd1M0WTdsSEV0OTRLaWF6V0s2d2tvbTl0SVdzbHBEOE9VYmlkTXBWZ3BIMVkxYjBEMXhPdktmRHp3eXFtZG5paU50R1ZlRllEaWR5YWtpREVHWnJlRW9hY2RZWGpieU1LSmRuQXFNeXFoeE9KRzVtQXExUlFlNlk2anJUM3ZMYWZYV3BYV19uYXp0Zk1ZVFBzcURtYkpoc0x3OXdDN3M1WHNTYjgtNFE?oc=5"
      },
      {
        "name": "The Korea Times",
        "href": "https://www.koreatimes.co.kr/business/companies/20260716/hyundai-motor-group-to-take-full-ownership-of-boston-dynamics"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/hyundai-full-ownership-boston-dynamics.png",
      "alt": "Boston Dynamics' humanoid Atlas robot.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Hyundai buys out the last of SoftBank and pledges to march Atlas humanoids onto a Georgia assembly line, it inherits a very old public fascination with machines that seem to think. In 1770 Wolfgang von Kempelen unveiled the Mechanical Turk, a chess-playing automaton that toured Europe defeating aristocrats and philosophers who could not fathom how gears alone might reason. It was, of course, a magnificent fraud, concealing a human operator inside its cabinet. Edgar Allan Poe, examining it in 1836, argued precisely that no pure mechanism could play chess, because unlike arithmetic the game has no determinate progression. The lineage matters for Boston Dynamics: every viral video of Atlas flipping or sorting parts trades on the same wonder-and-suspicion the Turk exploited, and the same nagging question of how much genuine autonomy lies behind the polished shell. Hyundai is now betting real money that the mind inside the machine is finally its own.",
        "excerpt": "Arithmetical or algebraical calculations are, from their very nature, fixed and determinate. Certain data being given, certain results necessarily and inevitably follow. These results have dependence upon nothing, and are influenced by nothing but the data originally given. And the question to be solved proceeds, or should proceed, to its final determination, by a succession of unerring steps liable to no change, and subject to no modification.",
        "source": "Edgar Allan Poe, \"Maelzel's Chess-Player,\" Southern Literary Messenger (Richmond, Virginia), April 1836.",
        "href": "https://www.eapoe.org/works/essays/maelzel.htm",
        "image": {
          "src": "/covers/hyundai-full-ownership-boston-dynamics--a0.png",
          "alt": "1789 engraving by Joseph Racknitz showing the concealed interior of Kempelen's chess-playing automaton, the Mechanical Turk",
          "credit": "Joseph Friedrich zu Racknitz, 1789, Humboldt University Library, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Hyundai's plan to station Boston Dynamics' Atlas on a car plant floor from 2028 revives the oldest anxiety of industrial capitalism: that the machine is bought to do without the worker. In 1811-1816 the Luddites of England's textile districts smashed the wide stocking-frames and shearing machines that let one operator do the labour of many, and Parliament answered by making frame-breaking a capital crime. When that bill reached the House of Lords in February 1812, Lord Byron rose in his maiden speech to defend the croppers, mocking the notion that men should starve so that a few proprietors might profit from improved mechanism. Two centuries later the arithmetic is unchanged, only the frame has become a humanoid. A carmaker consolidating full ownership of a robotics firm to deploy walking machines in Georgia will meet the same charge Byron voiced: that the maintenance of the industrious poor should weigh more than the enrichment of a few. The Luddites lost, but their question about who improvement is for has never been answered.",
        "excerpt": "The rejected workmen in the blindness of their ignorance, instead of rejoicing at these improvements in arts so beneficial to mankind, conceived themselves to be sacrificed to improvements in mechanism. In the foolishness of their hearts they imagined, that the maintenance and well doing of the industrious poor, were objects of greater consequence than the enrichment of a few individuals by any improvement, in the implements of trade, which threw the workmen out of employment, and rendered the labourer unworthy of his hire.",
        "source": "George Gordon, Lord Byron, maiden speech in the House of Lords on the Frame Work Bill, 27 February 1812 (Hansard, House of Lords Debates).",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill",
        "image": {
          "src": "/covers/hyundai-full-ownership-boston-dynamics--a1.png",
          "alt": "1812 coloured engraving titled \"The Leader of the Luddites,\" depicting a masked frame-breaker",
          "credit": "Published by Walker and Knight, London, May 1812, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "To assume full ownership of a maker of humanoid machines is to step, knowingly or not, into the role Mary Shelley diagnosed in 1818. Frankenstein is less a horror story than a parable of responsibility: Victor labours to animate a being, then recoils from what he has made and refuses to answer for it. The creature's grievance is not that it exists but that it has a creator who will not own the relation, and in the novel's central confrontation it inverts the hierarchy entirely, declaring itself the master and demanding obedience. Hyundai now holds the whole of Boston Dynamics, and with it undivided authorship of Atlas and Spot, the applause and the reckoning alike. Shelley's warning is not that the creature is evil but that a creator who deploys a powerful being without accepting its consequences invites the reversal. Full ownership, in her terms, is also full accountability.",
        "excerpt": "Slave, I before reasoned with you, but you have proved yourself unworthy of my condescension. Remember that I have power; you believe yourself miserable, but I can make you so wretched that the light of day will be hateful to you. You are my creator, but I am your master; obey!",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (London, 1818), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/hyundai-full-ownership-boston-dynamics--a2.png",
          "alt": "Theodor von Holst's 1831 frontispiece to Frankenstein, showing Victor recoiling from the newly animated creature",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The very word for what Hyundai is buying was coined for the stage: Karel Capek's 1920 play R.U.R. gave the world \"robot,\" from the Czech robota, meaning forced labour. Rossum's Universal Robots is a factory that manufactures artificial workers to abolish human toil, and its director Domin preaches a gospel of abundance in which living machines produce everything so cheaply that poverty ends and people are freed from the degradation of labor. It is exactly the promise now attached to humanoids on a Georgia production line: efficiency, relief from drudgery, a better life delivered by mechanical hands. Capek's play then turns that utopia inside out, as the Robots, having replaced humanity at work, replace it altogether. The century-old script is worth rereading precisely because its founding pitch is indistinguishable from a modern robotics prospectus. Owning the factory that makes the workers, as Domin discovers, is not the same as controlling what the workers become.",
        "excerpt": "But in ten years Rossum's Universal Robots will produce so much corn, so much cloth, so much everything that things will be practically without price. There will be no poverty. All work will be done by living machines. Everybody will be free from worry and liberated from the degradation of labor. Everybody will live only to perfect himself.",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), translated by Paul Selver (1923), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm",
        "image": {
          "src": "/covers/hyundai-full-ownership-boston-dynamics--a3.png",
          "alt": "Photograph of a scene from the 1921 stage production of R.U.R., showing three costumed Robots",
          "credit": "Photographer unknown, 1921 production of R.U.R., via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "No image has shaped how we picture the manufactured worker more than the Maschinenmensch of Fritz Lang's Metropolis (1927), the gleaming metal woman built to pass among human labourers and turn them against themselves. Photographed on set by Horst von Harbou, the seated robot, its featureless face and burnished armour cast from actress Brigitte Helm, became the template for a century of screen automatons. Lang set the machine amid a city where an underground proletariat is worked to exhaustion so an elite above may flourish, making the robot the literal instrument of that division. That visual grammar hangs over Hyundai's announcement that Atlas will join a Georgia plant in 2028: the humanoid dropped into the factory is precisely the scene Lang staged as prophecy and warning. Metropolis insists that a machine in human shape is never merely a tool but a statement about who labours and who profits.",
        "excerpt": "Fritz Lang's silver Maschinenmensch is arguably the most influential robot ever put on screen, the source image for how popular culture still imagines a humanoid worker. Cast from Brigitte Helm's own body and photographed on Lang's expressionist sets, it fused the factory and the human form into a single unforgettable silhouette. Every real humanoid wheeled onto an assembly line now steps into the frame Lang built.",
        "source": "Fritz Lang (director), Metropolis (1927); set photograph by Horst von Harbou.",
        "href": "https://commons.wikimedia.org/wiki/File:Horst_von_Harbou_-_Metropolis_Maschinenmensch.jpg",
        "image": {
          "src": "/covers/hyundai-full-ownership-boston-dynamics--a4.png",
          "alt": "Horst von Harbou's 1926 set photograph of the seated Maschinenmensch robot from Fritz Lang's Metropolis",
          "credit": "Horst von Harbou, 1926 set photograph for Metropolis, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Beneath every dream of a useful humanoid lies the older dream of a made being that comes to life, and Jean-Leon Gerome painted its most seductive version around 1890 in Pygmalion and Galatea, now at the Metropolitan Museum of Art. The canvas catches the instant of animation from behind: the ivory statue flushing into warm flesh from the lips downward as the sculptor reaches up to embrace his creation. Gerome, who also sculpted the subject, was literally an artist enthralled by the fantasy of the maker whose handiwork returns his desire. That is the emotional undertow of the robotics boom Hyundai has just bought outright, the wish that our manufactured servants be not cold apparatus but something we can love and be loved by. The painting is honest about the wish and quiet about the risk, which is its own kind of warning. Boston Dynamics sells the fluency of a living body; Gerome shows how easily we fall for it.",
        "excerpt": "Gerome's Pygmalion and Galatea freezes the mythic moment when a sculptor's ivory figure warms into living flesh under his hands. Painted around 1890 by an artist who also modelled the subject in marble, it is the fantasy of the maker whose creation loves him back. That same longing, dressed now in servomotors and sensors, drives our appetite for lifelike humanoid machines.",
        "source": "Jean-Leon Gerome, Pygmalion and Galatea, oil on canvas, ca. 1890, The Metropolitan Museum of Art, New York.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me,_Pygmalion_and_Galatea,_ca._1890.jpg",
        "image": {
          "src": "/covers/hyundai-full-ownership-boston-dynamics--a5.png",
          "alt": "Jean-Leon Gerome's painting Pygmalion and Galatea, showing the ivory statue coming to life as the sculptor embraces her",
          "credit": "Jean-Leon Gerome, ca. 1890, The Metropolitan Museum of Art, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "ofcom-tiktok-child-safety-probe",
    "headline": "Britain's Ofcom opens an investigation into whether TikTok is protecting children under the Online Safety Act",
    "overview": "The UK communications regulator Ofcom said Thursday it had launched an investigation into whether TikTok is doing enough to shield children from harmful content, focusing on the platform's age-verification system. Ofcom said evidence suggested TikTok's \"age inference\" methods \"may be failing to correctly detect significant numbers of children.\" The probe comes a month after Britain banned social media for under-16s; TikTok, owned by ByteDance, said it is confident it meets its legal obligations.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPT3RpTUp4WHE5ckl1MEpJVG5FYjlaY01IOFJDVkFmWmRWY3NpS0ZVUnlEczJheVlvcXZaZzdreTBhLTdKNGtMWUUwSW82LWhzUXplTFRiUExrNzZVN2tRUGI5UWRsNlREQ0s0SGJvNmo4bmh1bE1vNTFLVWIyQVVGcmJIWll0MEZMX3gxb3NyRFdHcGdYM1ZFRlBZRQ?oc=5"
      },
      {
        "name": "LBC",
        "href": "https://www.lbc.co.uk/article/tiktok-ofcom-investigation-uk-tech-5Hjddfr_2/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/ofcom-tiktok-child-safety-probe.png",
      "alt": "A person's face lit by a smartphone screen in the dark.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When cheap serialized fiction flooded Victorian Britain, magistrates, clergymen and journalists convinced themselves that the \"penny dreadful\" was a new engine for corrupting the young, blaming it for a supposed epidemic of juvenile crime and suicide. In 1874 the campaigning journalist James Greenwood cast the trade in cheap literature as a predatory animal that \"beguiled\" boys and girls in secret, precisely the language of grooming and hidden harm that Ofcom now reaches for when it worries about what children encounter on their feeds. The parallel is exact in structure: a new, cheap, immensely popular medium; a wave of adult alarm about unsupervised minors consuming it; and a demand that someone police access at the point of sale. Where Victorians fretted about the penny that put the dreadful into a boy's pocket, Ofcom frets about the \"age inference\" that lets a child slip past TikTok's gate. Then as now, the core anxiety was that commerce had found a frictionless way to reach children directly, outrunning the ability of parents and the state to intervene.",
        "excerpt": "Never a more dangerous one, for his manginess is hidden under a sleek and glossy coat, and lips of seeming innocence conceal his cruel teeth. His subtlety, too, is more than canine. He is gifted with a devilish power of beguiling boys and girls to take to him and nourish him in secret.",
        "source": "James Greenwood, \"A Short Way to Newgate,\" in The Wilds of London (London: Chatto and Windus, 1874).",
        "href": "https://www.victorianlondon.org/publications3/wilds-15.htm",
        "image": {
          "src": "/covers/ofcom-tiktok-child-safety-probe--a0.png",
          "alt": "Cover-style illustration from the Victorian penny dreadful The String of Pearls, the original Sweeney Todd serial",
          "credit": "The String of Pearls (Sweeney Todd) penny dreadful, via Internet Archive / Wikimedia Commons, public domain"
        }
      },
      {
        "category": "historical",
        "title": "In 1954 the United States Senate Subcommittee to Investigate Juvenile Delinquency put the comic-book industry on trial, spurred by psychiatrist Fredric Wertham's claim in Seduction of the Innocent that lurid crime and horror comics were rewiring children toward violence. The televised low point came when Senator Estes Kefauver held up a cover showing a severed head and asked publisher William Gaines whether he thought it was in good taste, a confrontation that reads uncannily like a modern regulator confronting a platform over the content its systems serve to minors. Facing the threat of legislation, the industry blinked and adopted the self-policing Comics Code, promising it could protect children without the state stepping in, the same posture ByteDance strikes when it says it is \"confident\" it meets its legal obligations. The episode is a cautionary tale for both sides: heavy-handed panic gutted a legitimate art form for a generation, yet the underlying question, whether a business selling to children can be trusted to gatekeep itself, is exactly the one Ofcom has reopened. TikTok's contested \"age inference\" is this decade's version of a code the industry writes for itself and asks the public to trust.",
        "excerpt": "Kefauver: \"Here is your May 22 issue. This seems to be a man with a bloody axe holding a woman's head up which has been severed from her body. Do you think that is in good taste?\" Gaines: \"Yes sir, I do, for the cover of a horror comic. A cover in bad taste, for example, might be defined as holding the head a little higher so that the neck could be seen dripping blood from it, and moving the body over a little further so that the neck of the body could be seen to be bloody.\"",
        "source": "Testimony of William M. Gaines before the U.S. Senate Subcommittee to Investigate Juvenile Delinquency, April 21, 1954 (as reproduced by Wikipedia).",
        "href": "https://en.wikipedia.org/wiki/William_Gaines",
        "image": {
          "src": "/covers/ofcom-tiktok-child-safety-probe--a1.png",
          "alt": "Portrait photograph of Senator Estes Kefauver, who chaired the 1954 Senate comic-book hearings",
          "credit": "Estes Kefauver portrait, 1956 campaign booklet, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Carlo Collodi's Land of Toys is the perfect parable for a platform engineered to hold a child's attention: a country with no schools, no lessons and no rules, populated entirely by boys who do nothing but play, shout and amuse themselves without end. It is a place reached by a wagon driver who profits from delivering children into ceaseless gratification, and its bargain is hidden, for the boys who never leave slowly sprout donkey ears and are sold as beasts of burden. The moral is not that fun is evil but that frictionless, unsupervised indulgence infantilizes and ultimately enslaves the young, which is precisely the harm Ofcom fears in an infinite, personalized feed. Pinocchio is lured because no one at the gate checks who is climbing aboard, the same failure Ofcom alleges when it says TikTok's age checks \"may be failing to correctly detect significant numbers of children.\" Collodi's fable insists that a paradise built entirely for the appetites of children is, in the end, a trap set by adults who profit from them.",
        "excerpt": "This great land was entirely different from any other place in the world. Its population, large though it was, was composed wholly of boys. The oldest were about fourteen years of age, the youngest, eight. In the street, there was such a racket, such shouting, such blowing of trumpets, that it was deafening. Everywhere groups of boys were gathered together.",
        "source": "Carlo Collodi, The Adventures of Pinocchio, Chapter 31 (first serialized 1881–1883).",
        "href": "https://www.pagebypagebooks.com/C_Collodi/The_Adventures_of_Pinocchio/CHAPTER_31_p3.html",
        "image": {
          "src": "/covers/ofcom-tiktok-child-safety-probe--a2.png",
          "alt": "Illustration of boys playing in the Land of Toys from Collodi's The Adventures of Pinocchio",
          "credit": "Carlo Chiostri, illustration for Le avventure di Pinocchio (Bemporad, 1902), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Robert Browning's retelling of the Pied Piper of Hamelin is the founding Western myth about children being spirited away by an irresistible external voice beyond the reach of parents and town elders. The Piper's music compels every child in the town to pour out of their homes and follow him, laughing and skipping, into a mountain that opens and then closes forever, a haunting image of a medium that speaks directly to the young in a register adults cannot hear or resist. Crucially, the tragedy follows a broken bargain: the town enjoyed the Piper's service but refused to pay what was owed, and the children pay instead, a warning about societies that accept the benefits of a seductive technology while declining to reckon with its price. Ofcom's investigation is, in this sense, Hamelin's council belatedly asking who let the piping start and why no gate held. The poem's enduring dread is that by the time the grown-ups understand what the music is doing, the mountain has already closed.",
        "excerpt": "There was a rustling, that seemed like a bustling\nOf merry crowds justling at pitching and hustling,\nSmall feet were pattering, wooden shoes clattering,\nLittle hands clapping and little tongues chattering,\nAnd, like fowls in a farm-yard when barley is scattering,\nOut came the children running.\nAll the little boys and girls,\nWith rosy cheeks and flaxen curls,\nAnd sparkling eyes and teeth like pearls,\nTripping and skipping, ran merrily after\nThe wonderful music with shouting and laughter.",
        "source": "Robert Browning, \"The Pied Piper of Hamelin: A Child's Story\" (1842).",
        "href": "https://www.gutenberg.org/files/18343/18343-h/18343-h.htm",
        "image": {
          "src": "/covers/ofcom-tiktok-child-safety-probe--a3.png",
          "alt": "Kate Greenaway illustration of the Pied Piper leading the children of Hamelin away",
          "credit": "Kate Greenaway, illustration for Browning's The Pied Piper of Hamelin (1888), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's The Land of Cockaigne (1567) paints the fantasy of endless indulgence as a satire rather than a dream: a scholar, a peasant and a soldier lie sprawled and stupefied on the ground, splayed like spokes of a wheel, in a country where roast fowl offer themselves up and a paved landscape of food demands no effort at all. Bruegel's target is sloth and gluttony, the moral rot of a world designed so that appetite is instantly satisfied and nothing is ever earned, which is exactly the design logic behind an algorithmic feed tuned to eliminate friction and reward passive consumption. The painting is the adult, pictorial cousin of Collodi's Land of Toys, and it makes the same argument Ofcom is now making in regulatory language: a place engineered purely to gratify leaves its inhabitants inert and diminished. Set against a probe into what an endless scroll does to children, Bruegel's stupefied sleepers look less like a medieval joke than a prophecy of the passive, over-fed attention economy.",
        "excerpt": "Bruegel paints paradise as a warning. His men lie collapsed and glassy-eyed in a land where food flies into the mouth and effort has been abolished, and the painter's point is that a world engineered purely to gratify does not liberate its inhabitants but flattens them. It is the oldest critique of a life without friction, and it maps disturbingly well onto anxieties about a feed built never to require anything of the child watching it.",
        "source": "Pieter Bruegel the Elder, The Land of Cockaigne (Het Luilekkerland), 1567, oil on panel, Alte Pinakothek, Munich.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Land_of_Cockaigne_-_WGA3507.jpg",
        "image": {
          "src": "/covers/ofcom-tiktok-child-safety-probe--a4.png",
          "alt": "Bruegel's painting The Land of Cockaigne, showing figures lying stupefied in a land of endless food",
          "credit": "Pieter Bruegel the Elder, The Land of Cockaigne (1567), Alte Pinakothek, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John Everett Millais's Bubbles (1886), originally titled A Child's World, shows a golden-haired boy gazing up at a soap bubble, flanked by a growing plant and a broken pot, a tender vanitas meditation on how quickly childhood innocence rises and bursts. Its afterlife is the real lesson for the TikTok age: the managing director of Pears Soap bought the picture and its copyright and turned this image of a fragile child into one of history's most famous advertisements, igniting a public row over whether it was acceptable to convert childhood itself into a marketing asset. That controversy, art and innocence pressed into commercial service, is the precise nerve Ofcom's investigation touches, because the platform's incentive is to hold and monetize the attention of the very children it is meant to keep out. Millais captured the beauty and transience of a child at play; the marketplace immediately proved how easily that image is harvested for profit. More than a century later, the question of who owns and exploits the picture of a child's absorbed, bubble-blowing attention has simply moved from the hoarding to the phone.",
        "excerpt": "Millais painted a boy transfixed by a bubble as a study of innocence and its fragility, then watched the marketplace turn it into an advertisement for soap. The scandal was not the painting but its purchase: a child's absorbed attention, bought and reproduced for profit. That is the same nerve a regulator touches when it asks who is monetizing the attention of children too young to be there at all.",
        "source": "John Everett Millais, Bubbles (originally A Child's World), 1886, Lady Lever Art Gallery, Port Sunlight.",
        "href": "https://commons.wikimedia.org/wiki/File:Bubbles_by_John_Everett_Millais.jpg",
        "image": {
          "src": "/covers/ofcom-tiktok-child-safety-probe--a5.png",
          "alt": "Millais's painting Bubbles, a young boy watching a soap bubble he has blown",
          "credit": "John Everett Millais, Bubbles (1886), Lady Lever Art Gallery, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "uganda-discharges-last-ebola-patient",
    "headline": "Uganda discharges its last Ebola patient, starting a 42-day countdown to a virus-free declaration",
    "overview": "Uganda is discharging its last remaining Ebola patient on Thursday, beginning the World Health Organization's 42-day countdown that, if no new cases emerge, would let the country be declared free of the virus. Since the outbreak was announced in May, Uganda has recorded 20 confirmed cases and two deaths, with no new infection reported since June 21. The wider Bundibugyo-strain outbreak has caused more than 2,000 confirmed cases and 754 deaths in neighbouring Democratic Republic of Congo.",
    "genre": "Science",
    "sources": [
      {
        "name": "Africanews",
        "href": "https://www.africanews.com/2026/07/16/uganda-set-to-discharge-final-ebola-patient/"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2651099/world"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/uganda-discharges-last-ebola-patient.png",
      "alt": "An Ebola treatment unit.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Uganda's 42-day clock is a direct descendant of an idea invented on the Adriatic coast more than six centuries ago. In 1377 the city-state of Ragusa — today's Dubrovnik — ruled that travellers from plague-stricken places must wait out a fixed isolation before entering, a thirty-day 'trentino' that Venice later stretched into the forty-day 'quarantino' from which the word quarantine descends. The logic was the same one the World Health Organization applies now: a contagion has a maximum incubation window, and if you let enough clean time pass with no new case, you can be confident the chain has broken. What medieval magistrates enforced with island lazarettos, Uganda enforces with contact tracing and a calendar spanning two Ebola incubation periods. The hopeful thread is that the instrument has always been patience rather than panic — count the days, watch for symptoms, and emerge declared safe. Having logged no new infection since 21 June, Uganda is now simply running out that ancient clock.",
        "excerpt": "In 1377 Ragusa — modern Dubrovnik — ordered that arrivals from infected places spend thirty days in isolation, the trentino, before entering the city. Venice soon extended the wait to forty days, the quarantino from which the word quarantine descends. The principle has never really changed: outlast the disease's incubation window with no new case, and you can be sure it is gone.",
        "source": "Wikipedia, 'Quarantine' — on the 1377 Ragusa (Dubrovnik) trentino and the Venetian forty-day quarantino",
        "href": "https://en.wikipedia.org/wiki/Quarantine",
        "image": {
          "src": "/covers/uganda-discharges-last-ebola-patient--a0.png",
          "alt": "Aerial view of the Lazzarettos of Dubrovnik, the stone quarantine complex where Ragusa isolated arrivals to stop the plague",
          "credit": "Photo by dronepicr, CC BY 2.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The most complete version of the ending Uganda hopes for is smallpox. For thousands of years the virus blinded and killed across every inhabited continent; then a global vaccination and containment campaign chased it down case by case until, on 8 May 1980, the World Health Assembly could declare the world free of it — the only human disease ever deliberately eradicated. That victory turned on exactly the discipline now underway in Uganda: find every case, trace every contact, and let a defined stretch of time pass with no new infection before announcing success. Smallpox's last naturally acquired cases, among them two-year-old Rahima Banu in Bangladesh, recovered, and with them the transmission chain finally starved. Uganda's declaration would be far smaller in scale, with 20 cases and two deaths rather than a planet's worth, but it belongs to the same lineage of hard-won, patiently verified freedom from a virus.",
        "excerpt": "On 8 May 1980 the World Health Assembly resolved that “the world and all its peoples have won freedom from smallpox,” the only human disease ever eradicated. The declaration rested on the same arithmetic Uganda now follows: trace every case and let enough time pass with no new infection to be certain the chain is broken. What took the world two centuries of vaccination to achieve for smallpox, Uganda hopes to achieve for one Ebola outbreak in a single 42-day countdown.",
        "source": "World Health Organization — World Health Assembly resolution WHA33.3, Declaration of Global Eradication of Smallpox, 8 May 1980",
        "href": "https://www.who.int/news/item/08-05-2020-commemorating-smallpox-eradication-a-legacy-of-hope-for-covid-19-and-other-diseases",
        "image": {
          "src": "/covers/uganda-discharges-last-ebola-patient--a1.png",
          "alt": "Rahima Banu of Bangladesh, the last person to contract naturally occurring variola major smallpox in 1975, who survived as the disease was driven to eradication",
          "credit": "CDC / World Health Organization (Stanley O. Foster), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Boccaccio opens the Decameron in the Florence of 1348, a city so undone by the Black Death that, in his telling, the living could barely bury the dead. His seven young women and three young men flee the contagion to a country villa, where over ten days they tell a hundred stories — a deliberate act of ordinary life reasserted against catastrophe. Crucially, the frame is not a tale of extinction but of waiting out the danger: when the plague loosens its grip the brigata return home to Florence. That shape — withdraw, endure, then re-enter a healed city — is precisely the arc Uganda is completing as it discharges its last patient and prepares to reopen normal life. The Decameron's enduring lesson is that a plague is something a community lives through and past, not only something it dies of.",
        "excerpt": "Some were of a more barbarous, though, peradventure, a surer way of thinking, avouching that there was no remedy against pestilences better than—no, nor any so good as—to flee before them; wherefore, moved by this reasoning and recking of nought but themselves, very many, both men and women, abandoned their own city, their own houses and homes, their kinsfolk and possessions, and sought the country seats of others.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction to the First Day, trans. John Payne (1886) — Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm",
        "image": {
          "src": "/covers/uganda-discharges-last-ebola-patient--a2.png",
          "alt": "John William Waterhouse's painting of young Florentines gathered together to tell stories, evoking the Decameron's brigata who fled the plague",
          "credit": "John William Waterhouse, 'The Decameron' (1916), Lady Lever Art Gallery; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Defoe's narrator H.F. stays in London through the Great Plague of 1665 and records, near the book's end, the moment the dying finally slows and the terrified city exhales. He watches strangers greet one another in the street giving God thanks for their deliverance, and describes the 'poor recovering creatures' — survivors still bearing the marks of the disease — filling thoroughfares that a week earlier had emptied at the sight of them. It is one of literature's great scenes of an epidemic ending, all the more moving for how cautiously the relief arrives. That is the emotional register of Uganda's news: not triumph but deliverance, a last recovering patient walking free and a country daring to hope. Defoe even closes with a survivor's blunt gratitude — 'yet I alive!' — the same astonished relief that attends every outbreak that ends.",
        "excerpt": "It was now, as I said before, the people had cast off all apprehensions, and that too fast; indeed we were no more afraid now to pass by a man with a white cap upon his head, or with a cloth wrapt round his neck, or with his leg limping, occasioned by the sores in his groin, all which were frightful to the last degree, but the week before. But now the street was full of them, and these poor recovering creatures, give them their due, appeared very sensible of their unexpected deliverance.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722) — Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt",
        "image": {
          "src": "/covers/uganda-discharges-last-ebola-patient--a3.png",
          "alt": "Title page of the 1722 first edition of Daniel Defoe's A Journal of the Plague Year",
          "credit": "Daniel Defoe / printed for E. Nutt, 1722; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin painted The Plague of Ashdod in 1630–31 while pestilence was sweeping northern Italy, and the canvas is a catalogue of the terror Uganda has just escaped: a dead mother slumped beside her living infant, citizens recoiling with cloaks pressed to their faces, corpses in the shadowed street. Drawn from the Book of Samuel, it shows the Philistines struck down after seizing the Ark of the Covenant, imagining epidemic as divine punishment. Set against Uganda's news, the picture measures how far the response to plague has travelled — from reading disease as inexplicable wrath to counting incubation days and tracing contacts. Poussin freezes the worst hour of an outbreak; the hopeful counterpoint is that such hours now have a defined end. The last patient discharged in Kampala is the negative image of Poussin's fallen city.",
        "excerpt": "Poussin stages the epidemic as a single frozen catastrophe: figures collapse in a sunstruck square, the living turn away with hands and cloth clamped over their mouths, and a dead mother lies beside a child that still reaches for her. Painted as plague ravaged northern Italy, it renders contagion as divine wrath — the very terror that a modern 42-day countdown is designed to bring to an end.",
        "source": "Nicolas Poussin, The Plague of Ashdod (La Peste d'Asdod), 1630–31, oil on canvas, Musée du Louvre, Paris (INV 7276)",
        "href": "https://commons.wikimedia.org/wiki/File:The_plague_of_ashdod_1630.jpg",
        "image": {
          "src": "/covers/uganda-discharges-last-ebola-patient--a4.png",
          "alt": "Nicolas Poussin's The Plague of Ashdod, a plague-stricken city with the dead and dying strewn across a sunlit square",
          "credit": "Nicolas Poussin, 1630–31, Musée du Louvre; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Where Poussin painted plague as annihilation, Tintoretto painted it as healing. His vast canvas for the Church of San Rocco in Venice shows Saint Roch — the saint invoked across Europe against pestilence — moving among the plague-stricken in a shadowy pest-house, tending the sick who are recovering rather than merely dying. Torchlight and an improbable shaft of brightness fall on bodies being cared for, not abandoned, and the whole scene is an image of deliverance commissioned by a city that repeatedly rebuilt its hope after outbreaks. That is the truer visual analogue for Uganda's Thursday: not the mass grave but the recovering patient attended to and released. Venice turned its survival of plague into art and thanksgiving; Uganda now turns twenty cases and a clean month into the start of a countdown toward being declared free.",
        "excerpt": "Tintoretto fills a dim lazaretto with the plague-stricken, but his subject is care rather than doom: Saint Roch bends among the sick who are being tended and are recovering, lit by torchlight and a shaft of improbable brightness. Made for a Venice that survived repeated epidemics, the painting frames plague as something endured and healed — the hopeful register of an outbreak that finally ends.",
        "source": "Jacopo Tintoretto, St Roch Healing the Plague Victims (San Rocco risana gli appestati), Church of San Rocco, Venice (mid-16th century)",
        "href": "https://commons.wikimedia.org/wiki/File:San_Rocco_Venezia_(Interno)_-_San_Rocco_risana_gli_appestati.jpg",
        "image": {
          "src": "/covers/uganda-discharges-last-ebola-patient--a5.png",
          "alt": "Tintoretto's St Roch Healing the Plague Victims, the saint tending recovering plague sufferers in a torchlit pest-house",
          "credit": "Jacopo Tintoretto (painting, public domain); photo by Didier Descouens, CC BY-SA 4.0, via Wikimedia Commons"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "zelensky-ousts-defence-minister-kyiv-protests",
    "headline": "Ukraine's parliament confirms a new prime minister as Zelensky ousts Defence Minister Fedorov, drawing protests in Kyiv",
    "overview": "Ukraine's parliament on Thursday approved Naftogaz chief Serhii Koretskyi as prime minister — with 289 votes — as part of a wartime government reshuffle in which President Volodymyr Zelensky moved to dismiss Defence Minister Mykhailo Fedorov after just six months. More than a thousand people rallied in central Kyiv, waving Ukrainian and EU flags and chanting \"shame\" and \"bring Fedorov back,\" praising the 35-year-old modernizer credited with recent battlefield gains. Interior Minister Ihor Klymenko is set to take over the defence portfolio.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxORnYzOW5nRHgwakl3NXZGMXVna2ZFN21CaTM1LVpqNDQ4Q3NhSVBzMnZBX3AybWtfN3NmUWFZU0R4SFA0ek8wSDZTWTI1akhCV2dnNWxTb0plVkZ2RnhSRmFFNkVuSG9GOXhzWHhCcEdLRzhrRlUtcUlScFlLenRVQmtGSE9rVm9CdEpKdy1DamVvU2JHU2NIRV9OMnJWSGR0NENIeDFaNkVpeGlVNUJTRGs1RQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxPbXlsVU1ScmxkMGtQOHJaS0ZOR3UtVkJacXJKYUtwa1piZEEwWmZTVHJKYnl3STk4RzM0SXNKUE5zQlBURUJ3VFhrQmVaekhRbEYwMnpFcVVGMUNlbXc3eVdnN3BURFpndFBrRG9sbHM4WmdsbXh5WVh6MzVmdVByeXJxaWdBblRzVjQ5dnllU1U0eHRvd0FzeExGeDUtWU1IVS1ETVBRYlZxUXBfcWtXckVpeU5tV3ZHTVA5Mw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/zelensky-ousts-defence-minister-kyiv-protests.png",
      "alt": "Protesters fill a square in Kyiv waving Ukrainian flags.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When President Truman relieved General Douglas MacArthur of his Korean War commands on 11 April 1951, he removed the most celebrated and popular soldier in America at the height of a shooting war, and the public reaction was volcanic. Within a day the White House was buried under thousands of telegrams running heavily against the president, Truman's approval sank toward twenty-three percent, and MacArthur was greeted with ticker-tape parades while crowds demanded his reinstatement. The parallel to Zelensky's abrupt dismissal of Mykhailo Fedorov is the same fundamental collision: a wartime leader exercising his constitutional authority over a commander the crowd adores, and paying for it in the streets. The difference sharpens the analogy rather than dissolving it, for MacArthur was fired for insubordination while Fedorov falls in a reshuffle after battlefield gains, yet in both cases the public read the move as ingratitude toward a winner. Kyiv's chants of 'shame' and 'bring Fedorov back' echo the American conviction of 1951 that governments betray the generals who deliver them victories.",
        "excerpt": "When I joined the Army, even before the turn of the century, it was the fulfillment of all of my boyish hopes and dreams. The world has turned over many times since I took the oath at West Point, and the hopes and dreams have all since vanished, but I still remember the refrain of one of the most popular barracks ballads of that day which proclaimed most proudly that old soldiers never die; they just fade away. And like the old soldier of that ballad, I now close my military career and just fade away, an old soldier who tried to do his duty as God gave him the light to see that duty.",
        "source": "General Douglas MacArthur, 'Old Soldiers Never Die' — Farewell Address to a Joint Session of Congress, 19 April 1951 (public domain).",
        "href": "https://www.emersonkent.com/speeches/old_soldiers_never_die.htm",
        "image": {
          "src": "/covers/zelensky-ousts-defence-minister-kyiv-protests--a0.png",
          "alt": "General of the Army Douglas MacArthur in uniform, the commander relieved of his Korean War posts by President Truman in 1951",
          "credit": "U.S. Army photograph, 1944, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Ancient Athens supplies the oldest and most unsettling version of this drama, in which the sovereign that dismisses the brilliant general is the citizen assembly itself. After the naval reverse near Notium in 406 BC, the Athenians turned on Alcibiades, the daring and gifted commander who had won them victories, stripped him of his command, and elected ten replacement generals in his place; he sailed off in disgrace to a private fortress. The episode captures exactly what makes Fedorov's fall resonate: a leadership credited with success can be discarded on a single stumble or a shift in political mood, whatever the ledger of past achievements. Athens repeatedly deposed, tried, and exiled its ablest men, and Xenophon's cool narration shows how quickly indignation converts a hero into a scapegoat. That a modernizing thirty-five-year-old could be removed after six months of gains would have surprised no Athenian, and the flag-waving Kyiv crowd is the democratic conscience that the assembly of 406 lacked.",
        "excerpt": "But now the news of the late disaster at Notium had reached the Athenians at home, and in their indignation they turned upon Alcibiades, to whose negligence and lack of self-command they attributed the destruction of the ships. Accordingly they chose ten new generals—namely Conon, Diomedon, Leon, Pericles, Erasinides, Aristocrates, Archestratus, Protomachus, Thrasylus, and Aristogenes. Alcibiades, who was moreover in bad odour in the camp, sailed away with a single trireme to his private fortress in the Chersonese.",
        "source": "Xenophon, Hellenica, Book I, v (trans. H. G. Dakyns), Project Gutenberg (public domain).",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm",
        "image": {
          "src": "/covers/zelensky-ousts-defence-minister-kyiv-protests--a1.png",
          "alt": "Roman marble bust identified as the Athenian general Alcibiades, deprived of his command by the Athenian assembly after the reverse at Notium",
          "credit": "Musei Capitolini MC1160; photograph by Marie-Lan Nguyen (User:Jastrow), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare's Coriolanus is the enduring literary anatomy of the war hero and the fickle crowd, and it maps onto Kyiv with an instructive twist. Caius Marcius, the invincible soldier who has bled for Rome, is turned out by the very citizens he defended, and he flings their ingratitude back at them in a torrent of contempt before declaring 'There is a world elsewhere.' The Kyiv rally inverts the play's polarity: where Rome's plebeians banish their champion, Ukraine's crowd rallies to keep theirs, chanting for Fedorov's return against the leader who dismissed him. Yet the underlying subject is identical — the volatile bond between a celebrated defender and the public that can lift him up or cast him down overnight. Shakespeare's genius was to show that both the hero's pride and the crowd's caprice are combustible, and that a state at war can least afford to squander the commander it has already tested in battle.",
        "excerpt": "You common cry of curs, whose breath I hate As reek o' th' rotten fens, whose loves I prize As the dead carcasses of unburied men That do corrupt my air, I banish you! And here remain with your uncertainty; Let every feeble rumour shake your hearts; Your enemies, with nodding of their plumes, Fan you into despair! Have the power still To banish your defenders, till at length Your ignorance—which finds not till it feels, Making but reservation of yourselves, Still your own foes—deliver you, As most abated captives to some nation That won you without blows! Despising For you the city, thus I turn my back. There is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus, Act III, Scene 3 (The Complete Works, Project Gutenberg, public domain).",
        "href": "https://www.gutenberg.org/cache/epub/100/pg100.txt",
        "image": {
          "src": "/covers/zelensky-ousts-defence-minister-kyiv-protests--a2.png",
          "alt": "Gavin Hamilton's neoclassical painting of the banished general Coriolanus confronted by the women of Rome, Act V Scene III",
          "credit": "Gavin Hamilton, 'Coriolanus, Act V, Scene III' (1803), Yale Center for British Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Behind Shakespeare stands Plutarch, whose Life of Coriolanus is the classical source for the tragedy of the deserving soldier undone by the vote of the multitude. Plutarch records the fatal ballot with clinical precision: a majority of three condemned Marcius to perpetual banishment, after which the people departed in triumphant glee while the senate sat in dejection, appalled at what had been done. The moral he presses is the ingratitude of crowds toward the men who serve them, a theme that lands squarely on Fedorov, the young modernizer credited with gains and pushed out after only six months. Plutarch's Lives were written precisely to hold such reversals up as mirrors for statesmen, warning that public favour is the least stable foundation for a career built on merit. In Kyiv the roles are partly reversed — it is the assembly and the president who move against the popular man, and the crowd that grieves — but the ancient lesson about the precariousness of the loyal servant still cuts to the bone.",
        "excerpt": "In the end, therefore, the vote was taken by tribes, and a majority of three condemned him. The penalty assigned was perpetual banishment. After the result was announced, the people went off in greater elation and delight than they had ever shown for any victory in battle over their enemies; but the senate was in distress and dire dejection, repenting now and vexed to the soul.",
        "source": "Plutarch, Life of Coriolanus (trans. Bernadotte Perrin, Loeb Classical Library), via LacusCurtius / University of Chicago (public domain).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Coriolanus*.html",
        "image": {
          "src": "/covers/zelensky-ousts-defence-minister-kyiv-protests--a3.png",
          "alt": "Nicolas Poussin's painting of Coriolanus, the exiled Roman general, halted by the pleas of his mother and wife outside Rome",
          "credit": "Nicolas Poussin, 'Coriolanus' (c. 1652-53), Musée Nicolas Poussin, Les Andelys, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's 'Belisarius Begging for Alms' is the great painted emblem of the loyal general repaid with ingratitude by the state he saved. It depicts the blinded Byzantine commander Belisarius — the man who reconquered an empire for Justinian — reduced to beggary by the roadside, recognised in horror by one of his own former soldiers while a woman drops a coin into his helmet. David turned the legend into a neoclassical indictment of rulers who cast aside the servants who won them victories, exactly the accusation Kyiv's protesters level as they chant for Fedorov's return. The canvas insists that a nation's gratitude is a moral test it frequently fails, and that the discarded commander becomes a silent rebuke to the power that dismissed him. For a defence minister credited with battlefield gains and removed after half a year, Belisarius is the archetype the crowd instinctively reaches for.",
        "excerpt": "David stages the ultimate humiliation of the victorious commander: Belisarius, who once carried Justinian's empire on his shield, sits blind and begging while a stunned soldier recognises the general he once served. The painting made ingratitude toward a nation's defender into an image no viewer could forget. It is the visual shorthand for exactly the grievance Kyiv voiced — that a state discards the very people who deliver its victories.",
        "source": "Jacques-Louis David, 'Bélisaire demandant l'aumône' (Belisarius Begging for Alms), reduced replica, 1784, Musée du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:David-Belisaire_Louvre_1784.jpg",
        "image": {
          "src": "/covers/zelensky-ousts-defence-minister-kyiv-protests--a4.png",
          "alt": "Jacques-Louis David's painting of the blind general Belisarius seated in beggary, recognised by a shocked former soldier as a woman gives alms",
          "credit": "Jacques-Louis David, 1784, Musée du Louvre; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Eugène Delacroix's 'Liberty Leading the People' is the defining image of the crowd itself as a political force, and it speaks directly to the thousand-strong rally that filled central Kyiv. Painted to commemorate the July Revolution of 1830, it shows a surging mass of citizens advancing behind a raised flag, the people transformed from spectators into actors who decide the fate of governments. That is precisely the register of the Kyiv demonstration, where Ukrainians waved national and EU flags and chanted 'shame,' asserting that the street has a verdict on who should lead the war effort. Delacroix understood that a banner lifted above a determined crowd is an argument, not merely a decoration, and the EU flags in Kyiv make an argument about Ukraine's direction as pointed as the tricolour in his canvas. The painting reminds us that reshuffles decided in parliament are answered in the square, where the governed reserve the right to praise, to mourn, and to demand.",
        "excerpt": "Delacroix painted the crowd as a protagonist: citizens pressing forward beneath a raised flag, the people arriving to render their own verdict on power. That is the spirit of the Kyiv square, where Ukrainian and EU banners rose over chants of 'shame' and 'bring Fedorov back.' The lifted flag is the crowd's argument that the street, too, has a say in who leads a nation at war.",
        "source": "Eugène Delacroix, 'La Liberté guidant le peuple' (Liberty Leading the People), 1830, Musée du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/zelensky-ousts-defence-minister-kyiv-protests--a5.png",
          "alt": "Eugène Delacroix's painting of a flag-bearing crowd advancing in revolution, an emblem of the people as a political force",
          "credit": "Eugène Delacroix, 1830, Musée du Louvre; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "xi-ai-diplomacy-waic-shanghai",
    "headline": "Xi Jinping is set to give the keynote at Shanghai's World AI Conference, framing artificial intelligence as a tool of Chinese diplomacy",
    "overview": "President Xi Jinping will attend and deliver the opening keynote at the 2026 World Artificial Intelligence Conference in Shanghai, running July 17-20, positioning AI as both a national priority and a diplomatic instrument. China is promoting open-source models and a proposed World AI Cooperation Organization, to be headquartered in Shanghai, pitched to developing nations as a governance alternative to the West. Attendees include U.N. Secretary-General António Guterres and several Turing and Nobel laureates.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxQU1VkX0Npc2Jpc0tjRFVLQ0FlWFhZMlRrYzBWWTl2bFlzc0d3VXV6ZEVmNDY2TWRMQ2ZmVlJEeFp2WXVkY0dVYUJlWXJ5RTJhb2FlUDBESUFhZmNZbnExclllMWZUSGJDNmNwTGY1NzNEZTZBbm9YemJzU3RCUzI3eXRtcFNPSW1yUWwzVC1mVmtVVk5JenlpeURPYk45R3VUR3dQV2dqOA?oc=5"
      },
      {
        "name": "Gov.cn",
        "href": "https://english.www.gov.cn/news/202607/13/content_WS6a5494bcc6d00ca5f9a0c27c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/xi-ai-diplomacy-waic-shanghai.png",
      "alt": "The Pudong skyline of Shanghai, host city of the World AI Conference.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Britain threw open the Crystal Palace in 1851, it turned a trade fair into a statement of who set the terms of the modern age. Prince Albert, the Exhibition's guiding spirit, cast British industry not as narrow commercial advantage but as the vanguard of a coming 'unity of mankind,' a providential order that Britain happened to be best placed to organize. That is precisely the register Xi Jinping reaches for in Shanghai: a national showcase reframed as a gift to all humanity, with China as convener rather than merely competitor. The proposed World AI Cooperation Organization, headquartered in Shanghai and pitched to the developing world, echoes the Victorian instinct to fuse a display of technical supremacy with the language of universal benefit and shared governance. Both events understand that whoever hosts the great exhibition of a new era gets to narrate what that era means, and to write its rules while the guests are still admiring the machines.",
        "excerpt": "Nobody, however, who has paid any attention to the peculiar features of our present era, will doubt for a moment that we are living at a period of most wonderful transition, which tends rapidly to accomplish that great end, to which, indeed, all history points—the realization of the unity of mankind. Not a unity which breaks down the limits and levels the peculiar characteristics of the different nations of the earth, but rather a unity, the result and product of those very national varieties and antagonistic qualities.",
        "source": "Prince Albert (the Prince Consort), Speech at the Mansion House banquet for the Commissioners of the Exhibition of 1851, 21 March 1850, in 'The Principal Speeches and Addresses of His Royal Highness the Prince Consort' (John Murray, 1862)",
        "href": "https://www.gutenberg.org/files/61205/61205-h/61205-h.htm",
        "image": {
          "src": "/covers/xi-ai-diplomacy-waic-shanghai--a0.png",
          "alt": "Queen Victoria opening the Great Exhibition inside the Crystal Palace, 1 May 1851",
          "credit": "'The state opening of the great exhibition of All Nations, May 1st 1851', hand-colored print, Library of Congress; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On 8 December 1953 Dwight Eisenhower stood before the United Nations General Assembly and, in the 'Atoms for Peace' address, tried to seize the moral high ground of the nuclear age by proposing an international agency that would channel fissile material toward electricity, medicine, and agriculture rather than weapons. It was Cold War statecraft dressed as universal stewardship: the United States would lead the governance of a fearsome new technology, and by leading, shape the loyalties of nations still choosing sides. Xi's WAIC keynote follows the same playbook one technological epoch later, offering open-source models and a Shanghai-based cooperation body as an alternative architecture for governing artificial intelligence. In both cases a superpower reframes a strategic capability as a public good, promising to serve 'the needs rather than the fears of mankind' while quietly setting the standards others will have to adopt. The presence of UN Secretary-General António Guterres in Shanghai rhymes deliberately with Eisenhower's choice of the UN as his stage, borrowing multilateral legitimacy for a national bid to define the rules.",
        "excerpt": "The more important responsibility of this Atomic Energy Agency would be to devise methods where by this fissionable material would be allocated to serve the peaceful pursuits of mankind. Experts would be mobilized to apply atomic energy to the needs of agriculture, medicine, and other peaceful activities. A special purpose would be to provide abundant electrical energy in the power-starved areas of the world. Thus the contributing powers would be dedicating some of their strength to serve the needs rather than the fears of mankind.",
        "source": "President Dwight D. Eisenhower, 'Atoms for Peace' address to the UN General Assembly, 8 December 1953 (transcribed on Wikisource)",
        "href": "https://en.wikisource.org/wiki/Atoms_for_Peace_Speech,_President_Eisenhower,_December_8,_1953",
        "image": {
          "src": "/covers/xi-ai-diplomacy-waic-shanghai--a1.png",
          "alt": "President Eisenhower delivering the Atoms for Peace proposal at the United Nations, December 1953",
          "credit": "'President Eisenhower delivers Atoms for Peace proposal' (14678902765), U.S. government photograph; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus's 'Prometheus Bound' is the founding Western parable of a transformative technology and the politics that surround it. The Titan boasts of handing mortals number, writing, memory, medicine, the yoking of beasts, and ships—the entire toolkit of civilization—yet he is chained to a rock by a jealous power that fears what humans will do with such gifts. The play captures the double edge running through every claim that a new knowledge will liberate humanity: the gift is real, but so is the struggle over who controls it and on whose terms it is dispensed. Xi's framing of open-source AI as an emancipatory gift to developing nations casts China in the benevolent Promethean role, distributing fire that the incumbent powers would rather ration. But Aeschylus insists the benefactor is never disinterested and the recipients never fully free, a caution that hangs over any offer to govern a world-altering tool from a single capital.",
        "excerpt": "And verily I discover for them Numbers, the surpassing all inventions, the combinations too of letters, and Memory, effective mother-nurse of all arts. I also first bound with yokes beasts submissive to the collars; and in order that with their bodies they might become to mortals substitutes for their severest toils, I brought steeds under cars obedient to the rein, a glory to pompous luxury. And none other than I invented the canvas-winged chariots of mariners that roam over the ocean.",
        "source": "Aeschylus, 'Prometheus Bound', trans. Theodore Alois Buckley (1849), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm",
        "image": {
          "src": "/covers/xi-ai-diplomacy-waic-shanghai--a2.png",
          "alt": "Peter Paul Rubens, 'Prometheus Bound' (c. 1611-1618), the Titan chained and tormented by an eagle",
          "credit": "Peter Paul Rubens and Frans Snyders, 'Prometheus Bound', Philadelphia Museum of Art (Google Art Project); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Francis Bacon's unfinished utopia 'New Atlantis' (1627) imagines Bensalem, an island whose hidden engine of power is Salomon's House, a state institution devoted to mastering nature and enlarging 'the bounds of human empire, to the effecting of all things possible.' Bacon fused the pursuit of knowledge with the projection of national greatness, and his college of researchers—part laboratory, part ministry—prefigures exactly the kind of coordinated, state-directed science that China now marshals behind artificial intelligence. The proposed World AI Cooperation Organization is a Salomon's House for the algorithmic age: a governing body that promises to catalogue causes, allocate discoveries, and steward a technology on behalf of humanity while consolidating the authority of those who run it. Bacon's vision is genuinely inspiring and quietly unsettling in the same breath, because the same apparatus that unlocks nature's secrets also decides which secrets are shared, hidden, or withheld. Reading it beside Shanghai's ambitions is a reminder that the dream of ordering the world through superior knowledge is very old, and that its architects have always spoken the language of universal benefit.",
        "excerpt": "Son, to make you know the true state of Salomon's House, I will keep this order. First, I will set forth unto you the end of our foundation. Secondly, the preparations and instruments we have for our works. Thirdly, the several employments and functions whereto our fellows are assigned. And fourthly, the ordinances and rites which we observe. The end of our foundation is the knowledge of causes, and secret motions of things; and the enlarging of the bounds of human empire, to the effecting of all things possible.",
        "source": "Francis Bacon, 'New Atlantis' (1627), Project Gutenberg (ebook 2434)",
        "href": "https://www.gutenberg.org/cache/epub/2434/pg2434.txt",
        "image": {
          "src": "/covers/xi-ai-diplomacy-waic-shanghai--a3.png",
          "alt": "Frontispiece to Francis Bacon's 'Instauratio Magna', a ship sailing beyond the Pillars of Hercules",
          "credit": "Frontispiece engraving to Francis Bacon's 'Instauratio Magna' (1620); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Heinrich Friedrich Füger's 'Prometheus Brings Fire to Mankind' (1817) renders the Titan as a serene, luminous benefactor, cradling the divine flame as he stoops toward figures still huddled in darkness. The painting distills the Enlightenment's most flattering self-image: knowledge as light, progress as a gift descending from the enlightened few to the grateful many. That is the visual grammar Xi's Shanghai stagecraft borrows when it presents Chinese AI—open-source models handed to developing nations—as illumination offered freely to a waiting world. Füger's Prometheus is heroic precisely because the composition asks no questions about what happens after the fire is delivered, who tends it, or what obligations bind the recipients to the giver. Set against a keynote that frames a strategic technology as benevolence, the picture is both apt and quietly ironic, a beautiful image of a gift whose price is never shown in the frame.",
        "excerpt": "Füger paints the Promethean gift as pure radiance: the Titan descends bearing fire while mortals in shadow reach toward the light, the whole scene composed to make technological blessing look like unambiguous grace. It is the same flattering picture any power projects when it stages the transfer of a world-changing tool as generosity rather than strategy. What the canvas leaves outside the frame—the dependency, the debt, the strings attached to the flame—is exactly what a governance pitch prefers to keep off-stage.",
        "source": "Heinrich Friedrich Füger, 'Prometheus Brings Fire to Mankind' (1817), oil on canvas, Liechtenstein Collections; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/xi-ai-diplomacy-waic-shanghai--a4.png",
          "alt": "Heinrich Füger's 1817 painting of Prometheus bringing the gift of fire to mankind",
          "credit": "Heinrich Friedrich Füger, 'Prometheus Brings Fire to Mankind' (1817); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Scriabin's symphonic poem 'Prometheus: Poem of Fire' (Op. 60, 1910) is the ultimate techno-utopian artwork: a mystical orchestral score written for a 'clavier à lumières' that was meant to flood the concert hall with colored light, fusing sound, sight, and cosmic ambition into a single synesthetic ritual of transformation. Jean Delville's 1911 frontispiece for the published score depicts a radiant androgynous face wreathed in a lyre and flame, an emblem of humanity remade by fire and harmony. The pairing captures the intoxicating promise now attached to artificial intelligence—a total, transfiguring technology that will fuse the senses of civilization and usher in a new order—and the grandiosity that so often accompanies such promises. Scriabin believed his 'Mysterium' could remake the world through art and vibration; the WAIC's rhetoric of AI as the axis of a reordered global governance carries the same utopian charge. Both the music and the Shanghai stage share a conviction that a new instrument can harmonize the world, and both invite the sober question of who conducts.",
        "excerpt": "Scriabin scored Prometheus for orchestra and a keyboard of light, convinced that fire, sound, and color together could transfigure humanity into a higher unity. Delville's frontispiece crowns the idea with a blazing visionary face, art as prophecy of a world remade by a single ecstatic technology. It is the purest emblem of the belief—recurring now around artificial intelligence—that one transcendent instrument can harmonize all of civilization, if only the right hand is on the console.",
        "source": "Alexander Scriabin, 'Prometheus: The Poem of Fire', Op. 60 (1910); frontispiece by Jean Delville for the 1911 published score; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:1911_frontispiece_by_Jean_Delville_to_the_cover_of_Scriabin%27s_symphony_Prom%C3%A9th%C3%A9e,_Po%C3%A8me_du_feu.jpg",
        "image": {
          "src": "/covers/xi-ai-diplomacy-waic-shanghai--a5.png",
          "alt": "Jean Delville's 1911 frontispiece for Scriabin's 'Prometheus, Poem of Fire', a flaming visionary face within a lyre",
          "credit": "Jean Delville, frontispiece for the 1911 published score of Scriabin's 'Prométhée, Poème du feu'; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "greek-islands-drought-tourist-season",
    "headline": "Seven Greek islands declare drought emergencies as reservoirs run dry at the peak of tourist season",
    "overview": "Seven islands in the Aegean have declared drought emergencies this year to conserve water as hotter summers and erratic rainfall strain supplies, Reuters reported Thursday. On Astypalaia, the sole reservoir now holds about 150,000 cubic metres — a sixth of its capacity — after the second-driest season since 2020, even as the summer population of some villages swells fivefold with tourists. Authorities have fast-tracked a temporary desalination plant and halted irrigation to protect drinking water.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOaXI0QmVtdFV3cHZyVl93VDE2Q0c1TTZta0NvdDRqUXc2MFZKNmRNRXo5eEYyNHVTY2JsUDJ1ZVVkTFI1NUxucUVZNzUxV19qdVhfYkU5R3F5NXhZbk1iVlF2Wkh5aDk0SFRkTGVIQ29SNkp4Rm9pN2lDSVFEUVlVQ0xRVjNlMDdFY1dQalY4YTNHWGtTN3J6eWRRVHJpczk4M09kNU53?oc=5"
      },
      {
        "name": "Cyprus Mail",
        "href": "https://cyprus-mail.com/2026/07/16/greek-islands-face-drought-as-tourist-season-hits"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/greek-islands-drought-tourist-season.png",
      "alt": "The town of Chora on the drought-stricken Greek island of Astypalaia.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The American Dust Bowl of the 1930s shows how quickly a farming society can be undone when rainfall fails and the land can no longer hold water. Across the High Plains, successive droughts beginning in 1934 turned plowed topsoil to dust, and storms like Black Sunday on 14 April 1935 blackened the sky and drove more than three million people off the land. The Aegean islands face a slower, subtler version of the same reckoning: hotter summers and erratic rainfall have hollowed out reservoirs like Astypalaia's, now holding roughly a sixth of its capacity after the second-driest season since 2020. Where Oklahoma farmers watched their fields blow away, island authorities are halting irrigation to save what drinking water remains. Both cases reveal how thin the margin can be between an ordinary dry year and a genuine emergency, and how a single failed season can cascade into crisis. The Dust Bowl also warns that human choices — over-extraction, over-development, the overburdening of fragile land — magnify what the climate imposes.",
        "excerpt": "The Dust Bowl of the 1930s was a period of severe dust storms that damaged the ecology and agriculture of the American and Canadian prairies during a decade of drought. Beginning in 1934, and returning in 1936 and 1939-1940, the drought and deep plowing that had displaced the moisture-holding native grasses left the topsoil to blow away, and roughly 3.5 million people migrated off the Plains as farms failed.",
        "source": "Encyclopedic account of the Dust Bowl (1930s United States), Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Dust_Bowl",
        "image": {
          "src": "/covers/greek-islands-drought-tourist-season--a0.png",
          "alt": "A farmer and his two sons walk toward a shed, bent against a rolling dust storm in Cimarron County, Oklahoma, 1936",
          "credit": "Arthur Rothstein, U.S. Farm Security Administration, April 1936 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Classic Maya built one of the ancient world's great civilizations in a seasonal desert, sustaining cities like Tikal through vast reservoirs and cisterns engineered to bank the rains against the dry months. That triumph rested on a fragile assumption of consistent rainfall, and when a series of intense droughts struck the Yucatan between roughly 800 and 900 AD — with rainfall reductions estimated at 40 percent or more — the storage systems failed and the great centers were abandoned. Astypalaia's shrinking sole reservoir echoes that ancient dependence: a single catchment, filled by increasingly unreliable skies, standing between a population and disaster. The Maya collapse is a reminder that even sophisticated water engineering buys resilience only within the climate it was designed for. When the rains that a whole system assumes simply stop coming, advanced infrastructure can be overwhelmed. For islands now fast-tracking desalination plants, the lesson is that technology must keep pace with a shifting climate, not merely a stable one.",
        "excerpt": "The Maya succeeded in creating a civilization in a seasonal desert by building a system of water storage and management wholly dependent on consistent rainfall. Paleoclimate studies of the Yucatan and Peten identify an intense, protracted drought in the ninth century AD that coincided with the Terminal Classic collapse, with rainfall reductions estimated at forty to fifty percent and peaks near seventy percent — enough to break reservoirs designed only for ordinary seasonal variation.",
        "source": "Encyclopedic account of the Classic Maya collapse and drought theory, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Classic_Maya_collapse",
        "image": {
          "src": "/covers/greek-islands-drought-tourist-season--a1.png",
          "alt": "Temple I rising above the plaza at the ruined Maya city of Tikal, Guatemala, a civilization sustained by engineered reservoirs",
          "credit": "Raymond Ostertag, 2006, CC BY-SA 2.5, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Coleridge's \"The Rime of the Ancient Mariner\" (1798) gave English its most enduring image of thirst amid abundance: a becalmed ship adrift on a rotting sea, its crew dying of thirst while surrounded by undrinkable water. The paradox — \"Water, water, every where, / Nor any drop to drink\" — captures precisely the predicament of an island ringed by the Aegean yet running out of fresh water. For Astypalaia and its neighbours, the sea offers no relief without the desalination plants now being rushed into service to make salt water potable. Coleridge framed the mariner's torment as a moral affliction, a curse following a thoughtless act against nature, and the parallel to a warming climate driven by human hands is hard to miss. The poem endures because it dramatizes scarcity in the midst of apparent plenty. That is exactly the disorienting condition of a Greek island whose tourists swim in a sea it cannot drink.",
        "excerpt": "Water, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.\n\nThe very deep did rot: O Christ!\nThat ever this should be!\nYea, slimy things did crawl with legs\nUpon the slimy sea.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (Part the Second), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm",
        "image": {
          "src": "/covers/greek-islands-drought-tourist-season--a2.png",
          "alt": "Gustave Dore engraving of the lone mariner on a becalmed ship, the dead albatross about his neck, watching water-snakes on the still sea",
          "credit": "Gustave Dore, 1876 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The drought of Elijah in the First Book of Kings is one of literature's oldest accounts of the sky withholding rain as both catastrophe and judgment. Elijah declares that there shall be neither dew nor rain, and the land is parched for years until even the brook Cherith dries up and the prophet must move on to survive. The rhythm of that story — a failed rainy season deepening into an existential crisis over water — is being replayed on the Aegean islands, where a second consecutive dry year has emptied reservoirs at the worst possible moment. The biblical narrative ties drought to human conduct and to the desperate hope for rain's return, a longing familiar to islanders halting irrigation to protect their wells. Ancient audiences understood that a society lives or dies by its water, and that a few rainless years can bring the powerful to their knees. The islands' emergency declarations are a modern echo of that same primal anxiety.",
        "excerpt": "And Elijah the Tishbite, who was of the inhabitants of Gilead, said unto Ahab, As the LORD God of Israel liveth, before whom I stand, there shall not be dew nor rain these years, but according to my word. ... And it came to pass after a while, that the brook dried up, because there had been no rain in the land.",
        "source": "The Holy Bible, King James Version, 1 Kings 17:1 and 17:7, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings",
        "image": {
          "src": "/covers/greek-islands-drought-tourist-season--a3.png",
          "alt": "Washington Allston's painting Elijah in the Desert, showing the prophet amid a barren, parched wilderness of rock and blasted trees",
          "credit": "Washington Allston, \"Elijah in the Desert,\" 1818 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Dorothea Lange's \"Migrant Mother,\" photographed in Nipomo, California, in March 1936, became the defining image of the human cost of the Dust Bowl drought — a mother of seven, hollow-eyed, displaced by land that could no longer feed her family. Made for the Farm Security Administration, it turned an abstract environmental disaster into an unforgettable human face. The Greek islands' crisis is quieter and, for now, less desperate, but Lange's image is a warning of where water scarcity ultimately lands: on people. When Astypalaia's villages swell fivefold with summer visitors while its reservoir dwindles, the strain falls on residents whose daily life depends on supplies that may not last the season. Lange's photograph insists that droughts are measured not only in cubic metres but in livelihoods and dignity. It is the human ledger behind every emptying reservoir.",
        "excerpt": "Dorothea Lange's photograph of Florence Owens Thompson, a destitute pea-picker and mother of seven, distilled the Dust Bowl's drought and displacement into a single human face. Made for a U.S. government relief agency, it endures as a reminder that water crises are ultimately counted in exhausted people and lost livelihoods, not merely in rainfall totals or reservoir levels.",
        "source": "Dorothea Lange, \"Migrant Mother\" (Nipomo, California, 1936), Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Lange-MigrantMother02.jpg",
        "image": {
          "src": "/covers/greek-islands-drought-tourist-season--a4.png",
          "alt": "Dorothea Lange's Migrant Mother: a careworn woman clutching two children, a portrait of drought-driven displacement",
          "credit": "Dorothea Lange, U.S. Farm Security Administration, 1936 (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Diego Velazquez's \"The Waterseller of Seville\" (c. 1623) depicts a humble tradesman handing a glass of water to a boy, dignifying the simple transaction of water as a precious commodity. In the parched summers of seventeenth-century Andalusia, watersellers were essential figures, and Velazquez lavished on the scene the gravity usually reserved for kings and saints. The painting reframes water not as a background given but as something bought, carried, and carefully shared — exactly the shift now underway on drought-stricken Greek islands. As Astypalaia halts irrigation and rushes a desalination plant into service, water is again becoming a managed, rationed good rather than an assumption. Velazquez's great clay jug, beaded with condensation, is a still-life monument to water's worth. It reminds a tourist-thronged island that the most ordinary glass of water can be the most valuable thing on the table.",
        "excerpt": "In Velazquez's canvas an old water-seller passes a clear glass to a boy, the sweating clay jug in the foreground rendered with the reverence of a still-life relic. Painted for a hot, dry Andalusian city, it treats the sharing of water as a solemn act — a fitting emblem for islands where water is again becoming something carried, measured, and rationed rather than simply taken for granted.",
        "source": "Diego Velazquez, \"The Waterseller of Seville\" (c. 1623), Apsley House, London; Wikimedia Commons file page",
        "href": "https://commons.wikimedia.org/wiki/File:Diego_Vel%C3%A1zquez_-_The_Waterseller_of_Seville_-_WGA24366.jpg",
        "image": {
          "src": "/covers/greek-islands-drought-tourist-season--a5.png",
          "alt": "Velazquez's The Waterseller of Seville: an old water-seller handing a glass of water to a boy beside a large condensation-beaded clay jug",
          "credit": "Diego Velazquez, c. 1623 (public domain), via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "texas-flash-flood-emergency-kerr-county",
    "headline": "A flash-flood emergency hits Texas Hill Country a year after the Camp Mystic disaster, prompting disaster declarations in 59 counties",
    "overview": "A dangerous flash-flood emergency struck the Texas Hill Country near Kerr County this week, almost exactly a year after floods along the Guadalupe River killed about 140 people, including 27 at Camp Mystic. Parts of the region received 6 to 16 inches of rain in 24 hours; the National Weather Service issued its highest flash-flood risk, and Governor Greg Abbott warned totals could exceed 30 inches and declared disasters in 59 counties. More than 75 people, most of them stranded motorists, had been rescued, with no fatalities reported as of Wednesday.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxQWVd1akpyQ1hyeVJSVGRYdzNtWUgwUHRBQnFiSjU0clhJWHBxYk8yNEdvQWRyQVpmcjFQRTh3NlVFWDJiNnNucXctajg5dmRVZWI4LVpWeWxjV3JXRkxaaHFMZlRVZHpPbUZ2OGwzczctYnVRdFlEa1hkVHQ1Unh3cGtwaXJ0b0FFZ1JSZlVnejRpSm9abHFIRGY2Zkt2aDlHaERvdTRkY00xSS1fWS1oVUliZWdvWDZkMXFxODJPdWJNUQ?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/US/flash-flood-emergency-occurring-same-texas-region-camp/story?id=134780971"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/texas-flash-flood-emergency-kerr-county.png",
      "alt": "The Guadalupe River winding through the Texas Hill Country.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On May 31, 1889, the South Fork Dam above Johnstown, Pennsylvania gave way after days of torrential rain, hurling a wall of water down the narrow Conemaugh valley and killing more than 2,200 people in minutes. Like the Texas Hill Country, Johnstown sat in a steep, funnel-shaped watershed where a sudden surge had nowhere to spread and everywhere to accelerate, turning a familiar river into an instrument of mass death. The disaster became the template for how modern America grieves and rebuilds after a flood: relief trains, disaster charities, and a stunned reckoning with how quickly ordinary life can be erased. It is a fitting mirror for Kerr County, where the memory of the roughly 140 dead along the Guadalupe a year ago, including the 27 lost at Camp Mystic, now shadows every new warning. That the 2026 emergency produced dozens of rescues and no reported deaths measures exactly how much the century since Johnstown has invested in forecasting and evacuation. The valley still fills with water; the difference is whether people get out in time.",
        "excerpt": "Away up the Conemaugh came a yellow wall, whose crest was white and frothy. I rushed for the platform of the car, not knowing what I did, and just then the train began to move. Terrified as I was, I remember feeling that I was in the safest place and I sank back in a seat. When I looked out again what had been the busy mill yards of the Cambria Iron Company was a yellow, turbulent sea, on whose churned currents houses and barns were riding like ships in a brook.",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (1889), eyewitness account of Mr. George Johnston — Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm",
        "image": {
          "src": "/covers/texas-flash-flood-emergency-kerr-county--a0.png",
          "alt": "General view of debris and wrecked buildings at Johnstown after the 1889 flood",
          "credit": "Langill & Darling, 1889 / Library of Congress, Prints and Photographs Division (LCCN 2005683592). Public domain."
        }
      },
      {
        "category": "historical",
        "title": "The Great Mississippi Flood of 1927 was the most destructive river flood in U.S. history, breaching levees across the Delta, inundating tens of thousands of square miles, and driving hundreds of thousands of people, most of them Black tenant farmers, into sprawling refugee camps strung along the levees. Where the Texas emergency is measured in inches of rain over a single day, 1927 unfolded over months, yet both share the same civic drama: a landscape of stranded families, improvised rescues, and a government forced to declare the scale of the catastrophe out loud. Governor Abbott's disaster proclamation across 59 Texas counties echoes the way 1927 turned a regional flood into a national emergency, one that reshaped American flood policy and expansive federal responsibility. The 1927 camps at places like Greenville, six miles of tents with kitchens and medical stations, are the ancestors of today's shelters and swift-water rescue teams. Both events also exposed who lives in the floodplain and who bears the cost when the water comes. The Guadalupe basin, like the Delta, is a place people keep rebuilding because they cannot imagine leaving.",
        "excerpt": "The 1927 flood swallowed the Mississippi Delta for months, forcing more than half a million people from their homes into camps that ran for miles along the levees. It exposed how unevenly disaster falls on the poor and on Black sharecroppers, and it pushed the federal government into a new role as the nation's flood-fighter of last resort. What Texas now compresses into a single day of rain, the Delta endured as a slow, grinding inundation.",
        "source": "\"The Mississippi Flood of 1927,\" Mississippi History Now, Mississippi Department of Archives and History.",
        "href": "https://www.mshistorynow.mdah.ms.gov/issue/the-mississippi-flood-of-1927",
        "image": {
          "src": "/covers/texas-flash-flood-emergency-kerr-county--a1.png",
          "alt": "Aerial view of a farmstead surrounded by floodwater during the 1927 Mississippi flood",
          "credit": "U.S. National Archives and Records Administration (NARA 285955), 1927. Public domain."
        }
      },
      {
        "category": "literary",
        "title": "The flood of Genesis is the West's founding image of water as both punishment and reset, a rain that keeps rising until the highest hills vanish and only those aboard the ark remain. Its language of waters that 'prevail' and 'increase greatly upon the earth' feels uncomfortably literal in a Hill Country warned that rainfall totals could exceed thirty inches while the National Weather Service posted its highest flash-flood risk. The Noah story also encodes the hope buried in the Texas story: that warning, preparation, and a vessel to carry the vulnerable can hold death at bay, as it did for the more than 75 stranded motorists pulled to safety this week. Gustave Doré's engraving of the deluge, with families clawing at a last rock as the water climbs, renders the terror that modern forecasting is built to prevent. The ancient text frames catastrophe as total and cosmic; the county's achievement in 2026 was to make it survivable. Between the two lies the whole history of learning to read the sky.",
        "excerpt": "And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters. And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered. And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man.",
        "source": "The Holy Bible, King James Version, Genesis 7:19–21 (Wikisource).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/texas-flash-flood-emergency-kerr-county--a2.png",
          "alt": "Gustave Doré's engraving 'The Deluge', figures clinging to a rock as floodwaters rise",
          "credit": "Gustave Doré, 'The Deluge' (Plate I, The Holy Bible), 1866. Public domain."
        }
      },
      {
        "category": "literary",
        "title": "In Book I of Ovid's Metamorphoses, Jove drowns a corrupt humanity beneath a deluge in which sea and land lose all distinction, until a man rows a boat over the fields he lately ploughed and another catches a fish in the crown of an elm. That vertiginous erasure of boundaries is exactly the danger of a flash flood in the Hill Country, where roads become rivers and the Guadalupe swallows the low-water crossings that motorists cross every ordinary day. Ovid's survivors, Deucalion and Pyrrha, endure not through strength but through righteousness and luck, washing up to remake the world from stones, an ancient echo of the stranded drivers plucked from the current this week. Peter Paul Rubens later painted the pair amid the receding waters, the calm after the classical apocalypse. The poem understands flooding as a moral event, a judgment; the Texas emergency reframes it as a hazard to be forecast, warned, and outrun. What both keep is the uncanny sight of familiar geography dissolving into open water.",
        "excerpt": "And now sea and land had no mark of distinction; everything now was ocean; and to that ocean shores were wanting. One man takes possession of a hill, another sits in a curved boat, and plies the oars there where he had lately ploughed; another sails over the standing corn, or the roof of his country-house under water; another catches a fish on the top of an elm-tree.",
        "source": "Ovid, Metamorphoses, Book I (the Deluge), translated by Henry T. Riley (1851) — Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/21765/21765-h/21765-h.htm",
        "image": {
          "src": "/covers/texas-flash-flood-emergency-kerr-county--a3.png",
          "alt": "Peter Paul Rubens' painting of Deucalion and Pyrrha after the flood",
          "credit": "Peter Paul Rubens, 'Deucalion and Pyrrha', 1636, Museo del Prado. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "John Martin's 1834 oil painting 'The Deluge' is the great Romantic vision of a world going under, a churning, storm-lit chaos in which Noah's ark is nearly lost amid crashing seas and a doomed multitude clings to the last high ground. Martin built his career on the sublime terror of nature overwhelming humanity, and his deluge captures precisely the emotional register of a National Weather Service warning that rain could top thirty inches and a governor declaring disaster across 59 counties. The painting's scale is apocalyptic, its people helpless, and that is the fear modern Texas confronts every time the Guadalupe rises toward the anniversary of a flood that killed about 140 people. Yet the Hill Country's 2026 outcome, dozens rescued and no lives lost, is the counter-argument to Martin's fatalism: the sublime can be survived. Seen against Kerr County, the canvas reads less as prophecy than as a warning kept from coming true. The awe is real; the death toll need not be.",
        "excerpt": "John Martin's canvas turns a flood into pure spectacle: black storm-light, a toppling sea, and the tiny ark almost swallowed by water while crowds scramble up a final ledge. It is disaster rendered as the sublime, meant to overwhelm the viewer the way the flood overwhelms the world. Placed beside the Texas emergency, its terror is exactly what a century of forecasting and rescue now works to defuse.",
        "source": "John Martin, The Deluge (1834), Yale Center for British Art — Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/texas-flash-flood-emergency-kerr-county--a4.png",
          "alt": "John Martin's 1834 painting 'The Deluge', a storm-lit sea overwhelming crowds and the ark",
          "credit": "John Martin, 'The Deluge', 1834, Yale Center for British Art (Google Art Project). Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Francis Danby's 'The Deluge', exhibited in 1840, imagines the biblical flood as a vast moonlit catastrophe: bodies and broken trees tumble in the foreground while, far off, Noah's ark drifts under a torn sky. Danby's nocturne captures something the Texas story makes painfully current, that the worst flash floods often arrive in darkness, when 6 to 16 inches of rain in a day can turn a quiet river valley lethal before dawn. His enormous canvas dwells on the human scale of the disaster, the individual figures overtaken, which is the register in which Kerr County still grieves Camp Mystic and the 27 children lost there a year ago. The painting's distant ark, faintly lit, stands for the thin margin of survival, the same margin that this week held as more than 75 stranded people were carried out alive. Danby paints the night the water wins; the Hill Country's 2026 emergency is the night it did not. The difference is warning, and the will to heed it.",
        "excerpt": "Danby stages the flood at night: moonlight breaks over a heaving sea while the drowned and the drowning fill the foreground and the ark rides small and distant on the horizon. The painting insists on the individual human scale of catastrophe, one overtaken figure at a time. It is a fitting image for a disaster that so often strikes in darkness, when a Hill Country river can rise faster than a family can wake.",
        "source": "Francis Danby, The Deluge (exhibited 1840), Tate Britain — Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Francis_Danby_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/texas-flash-flood-emergency-kerr-county--a5.png",
          "alt": "Francis Danby's painting 'The Deluge', a moonlit flood with the distant ark",
          "credit": "Francis Danby, 'The Deluge', exhibited 1840, Tate (Google Art Project). Public domain."
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "riba-stirling-prize-2026-shortlist",
    "headline": "RIBA reveals its six-building shortlist for the 2026 Stirling Prize as the award marks its 30th year",
    "overview": "The Royal Institute of British Architects unveiled the six-building shortlist for the 2026 Stirling Prize on Thursday, drawn from a record 32 RIBA National Award winners as the prize marks its 30th anniversary. Contenders reported to be in the running include Renzo Piano's Paddington Square and Witherford Watson Mann's River Wing at Clare College, Cambridge. The winner of UK architecture's most prestigious award will be announced at a gala at Old Billingsgate in London on October 15.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/16/riba-stirling-prize-2026-shortlist/"
      },
      {
        "name": "Architects' Journal",
        "href": "https://www.architectsjournal.co.uk/news/opinion/the-ajs-verdict-on-the-2026-riba-stirling-prize-shortlist"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/riba-stirling-prize-2026-shortlist.png",
      "alt": "Clare College, Cambridge, whose new River Wing is among the Stirling Prize contenders.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Six centuries before RIBA drew its shortlist from a record field of National Award winners, Florence staged the archetypal contest of builders. In 1418 the Opera del Duomo announced an open competition to close the enormous octagonal void over Santa Maria del Fiore, and the goldsmith Filippo Brunelleschi triumphed over a crowded assembly of masters by insisting the cupola could rise without the forest of scaffolding everyone assumed it required. His double-shelled dome, completed in 1436, became the emblem of a city's ambition and the yardstick of architectural prestige for generations. The Stirling Prize plays a modern version of the same drama: a jury weighs rival visions, and the winner is crowned before an audience as the definitive statement of the moment. That contenders as monumental as Renzo Piano's Paddington Square now vie for the honour shows how little the appetite for a decisive, celebrated act of building has changed. Then as now, the reward is not merely a commission but a place in the collective memory.",
        "excerpt": "Filippo alone declared that the cupola might be erected without so great a mass of wood-work, without a column in the centre, and without the mound of earth; at a much lighter expense than would be caused by so many arches, and very easily, without any frame-work whatever.",
        "source": "Giorgio Vasari, Lives of the Most Excellent Painters, Sculptors, and Architects, \"Life of Filippo Brunelleschi\" (English translation), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Lives_of_the_Most_Excellent_Painters,_Sculptors,_and_Architects/Filippo_Brunelleschi",
        "image": {
          "src": "/covers/riba-stirling-prize-2026-shortlist--a0.png",
          "alt": "Interior of Brunelleschi's dome over Florence Cathedral, seen from directly below, with Vasari and Zuccari's Last Judgement fresco",
          "credit": "Livioandronico2013, CC BY-SA 4.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "The Stirling Prize's promise, that a single building can immortalise its maker, was written in stone over London three centuries ago. After the Great Fire of 1666 gutted medieval St Paul's, Christopher Wren spent more than three decades raising the vast domed cathedral that still crowns the City, defying sceptics who doubted such a dome could stand on English ground. His son's epitaph, carved beneath that dome, declined to praise Wren in words and instead pointed to the building itself as the only monument he needed. It is the purest expression of the idea animating the 2026 award, held on its thirtieth anniversary at Old Billingsgate barely a mile from Wren's masterpiece: that architecture is the argument, and the edifice is the verdict. A shortlist like this year's, ranging from Piano's Paddington Square to Witherford Watson Mann's River Wing at Clare College, invites the same test Wren passed. Look around you, the epitaph says, and judge.",
        "excerpt": "SUBTUS CONDITUR HUIUS ECCLESIÆ ET VRBIS CONDITOR CHRISTOPHORUS WREN, QUI VIXIT ANNOS ULTRA NONAGINTA, NON SIBI SED BONO PUBLICO. LECTOR SI MONUMENTUM REQUIRIS CIRCUMSPICE. Translated: \"Here in its foundations lies the architect of this church and city, Christopher Wren, who lived beyond ninety years, not for his own profit but for the public good. Reader, if you seek his monument – look around you.\"",
        "source": "Epitaph of Sir Christopher Wren, St Paul's Cathedral, London (composed by Christopher Wren the Younger, 1723); text via Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Christopher_Wren",
        "image": {
          "src": "/covers/riba-stirling-prize-2026-shortlist--a1.png",
          "alt": "The dome of St Paul's Cathedral, Christopher Wren's masterpiece, photographed from One New Change in the City of London",
          "credit": "Colin (User:Colin), CC BY-SA 4.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Notre-Dame de Paris, Victor Hugo pauses the story to argue that before the printing press, humanity wrote its greatest thoughts not on paper but in stone, making the cathedral the encyclopaedia of an age. His archdeacon lays a printed book beside the great church and murmurs \"this will kill that,\" foreseeing that the book would supplant the building as the vessel of collective memory. The passage is a meditation on exactly what a prize like the Stirling honours: architecture as the most public and enduring form of cultural expression, a text everyone can read simply by looking up. When RIBA gathers a nation's finest new buildings and asks which best speaks for the present, it implicitly rejects Hugo's prophecy, insisting the edifice still carries meaning the page cannot. The 2026 contenders, from a grand station-side square to a college's riverside wing, are new entries in that ongoing book of stone. Thirty years of Stirling shortlists amount to a running chronicle of how Britain has chosen to express itself in built form.",
        "excerpt": "In fact, from the origin of things down to the fifteenth century of the Christian era, inclusive, architecture is the great book of humanity, the principal expression of man in his different stages of development, either as a force or as an intelligence.",
        "source": "Victor Hugo, Notre-Dame de Paris, Book Fifth, Chapter II \"This Will Kill That\", trans. Isabel F. Hapgood; via Wikisource",
        "href": "https://en.wikisource.org/wiki/Notre-Dame_de_Paris_(Hapgood)/Book_Fifth/Chapter_II",
        "image": {
          "src": "/covers/riba-stirling-prize-2026-shortlist--a2.png",
          "alt": "The lower front façade of Notre-Dame de Paris at night, showing its three portals and the row of statues of biblical kings",
          "credit": "Benh Lieu Song, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "No writer bound architecture more tightly to time and memory than John Ruskin, whose 1849 essay The Seven Lamps of Architecture devoted its sixth lamp to the way buildings carry the past into the future. In \"The Lamp of Memory\" he exhorts builders to work as if for eternity, so that later generations might look on the labour and say, \"See! this our fathers did for us.\" For Ruskin the true glory of a building lay not in its stones or gold but in its age, in the accumulated human feeling that only endurance can bestow. That standard hovers over every Stirling deliberation, which rewards not novelty for its own sake but architecture judged worthy of lasting, the kind of work descendants will thank us for. As the prize marks its thirtieth year, Ruskin's question, whether we are still building for ever, is precisely the one the jury must answer of Paddington Square, Clare College's River Wing, and their rivals. The gala at Old Billingsgate will name a building; Ruskin would ask whether it was built to be remembered.",
        "excerpt": "Therefore, when we build, let us think that we build for ever. Let it not be for present delight, nor for present use alone; let it be such work as our descendants will thank us for, and let us think, as we lay stone on stone, that a time is to come when those stones will be held sacred because our hands have touched them, and that men will say as they look upon the labour and wrought substance of them, 'See! this our fathers did for us.'",
        "source": "John Ruskin, The Seven Lamps of Architecture (1849), Chapter VI \"The Lamp of Memory\"; text via The Victorian Web",
        "href": "https://victorianweb.org/authors/ruskin/7lamps/6.html",
        "image": {
          "src": "/covers/riba-stirling-prize-2026-shortlist--a3.png",
          "alt": "John Ruskin's 1845 pencil and watercolour study of the Ca' d'Oro, a Gothic palazzo on the Grand Canal in Venice",
          "credit": "John Ruskin (1819–1900), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner's 1815 canvas Dido building Carthage shows a great city rising in a golden haze, its half-finished palaces and quays glowing as workmen raise a civilisation stone by stone. Turner regarded it as his masterpiece and, in emulation of Claude Lorrain, made the very act of building the subject of high art, dignifying construction as an epic worthy of Virgil. The painting captures the romance that surrounds any ambitious new building: the sense that to erect something monumental is to found an era, not merely to fill a plot. That is the aura RIBA's Stirling Prize seeks to distil each year, and which clings this season to schemes as consequential as Renzo Piano's Paddington Square. Turner's sunlit scaffolding is the imaginative ancestor of every render and hoarding that promises a bolder skyline to come. The shortlist, like Dido's Carthage, is a portrait of a culture measuring its ambition by what it dares to build.",
        "excerpt": "Turner made the founding of a city the hero of his picture, painting scaffolding and rising masonry with the same reverence others reserved for gods and battles. In doing so he framed construction itself as a civilisation's supreme act of self-assertion. It is the emotion a great architecture prize still trades on: the belief that raising a landmark is a way of announcing who we mean to become.",
        "source": "J. M. W. Turner, Dido building Carthage; or the Rise of the Carthaginian Empire (1815), oil on canvas, National Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:Turner_Dido_Building_Carthage.jpg",
        "image": {
          "src": "/covers/riba-stirling-prize-2026-shortlist--a4.png",
          "alt": "Turner's painting of the ancient city of Carthage under construction at sunrise, with classical buildings rising beside a luminous harbour",
          "credit": "J. M. W. Turner (1775–1851), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In the early 1890s Claude Monet planted himself before the west front of Rouen Cathedral and painted its stone façade more than thirty times, tracking how sunlight, mist and shadow remade the same Gothic architecture hour by hour. The series, of which the National Gallery of Art's West Façade, Sunlight is a radiant example, treats a single great building as an inexhaustible subject, its meaning shifting with the light that falls on it. That insight speaks directly to how the Stirling Prize is judged, for a building's power lies not only in its plan but in how it is experienced, weathered and inhabited over time. A jury visiting this year's shortlist, from Witherford Watson Mann's River Wing at Clare College to Piano's Paddington Square, effectively performs Monet's exercise, returning to a façade to see what it becomes under changing conditions. Monet proved that architecture is never merely fixed geometry but a living surface for light and perception. The best of the 2026 contenders will be those that, like Rouen's cathedral, reward being looked at again and again.",
        "excerpt": "Monet did not paint the cathedral so much as the light dissolving and rebuilding it, canvas after canvas, until the stone seemed to breathe. He turned a single façade into a study of time itself. It is a reminder that great architecture is judged not in a single glance but across the hours and years in which people actually live with it.",
        "source": "Claude Monet, Rouen Cathedral, West Façade, Sunlight (1894), oil on canvas, National Gallery of Art, Washington, D.C.",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Monet_-_Rouen_Cathedral,_West_Facade,_Sunlight.jpg",
        "image": {
          "src": "/covers/riba-stirling-prize-2026-shortlist--a5.png",
          "alt": "Claude Monet's shimmering painting of the west façade of Rouen Cathedral bathed in sunlight, its Gothic carving rendered in encrusted strokes of cream, tan and pale blue",
          "credit": "Claude Monet (1840–1926), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "sam-neill-dies-pneumonia",
    "headline": "Sam Neill, star of \"Jurassic Park\" and \"The Piano,\" dies of pneumonia at 78",
    "overview": "The New Zealand actor Sam Neill has died of pneumonia at 78, his manager confirmed, after a career spanning more than four decades. Neill, who was surrounded by family, had earlier beaten lymphoma through CAR-T therapy and \"remained cancer free,\" his representative said, calling the loss \"sudden and unexpected.\" Known worldwide as Dr. Alan Grant in \"Jurassic Park,\" he also starred in \"The Piano,\" \"The Hunt for the Wilderpeople\" and \"Peaky Blinders,\" drawing tributes from former co-stars.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cddj7e8v767o"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxPaGphMVVCb05iRG1fN0VHclRRUks3RS1GVC1GTlpJR1ItZzZoUmZLaG5TbklvVFB2ampnenFSbG0tSmhrTXpzMFZ2aEFCa2l0eF9CNEQwbXRzcjI5SHNJRFJHbHpCVG9GVDF3NFY3ZU5LOVh3RXk1aHJjZ0o5Y2s3X3lPaVJXSnhHQ0huM1hvRWZGQWIyTmRsUkZ3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/sam-neill-dies-pneumonia.png",
      "alt": "The actor Sam Neill.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Sam Neill's manager confirmed that the actor had died of pneumonia at 78, the world reached instinctively for the oldest emblem of his profession: the mask. In the Roman theatre the performer spoke through the persona, a carved face of tragedy or comedy fitted over his own, and it is those masks, not the histriones who wore them, that survive today in the mosaics of the Capitoline. Rome ranked its actors low, close to criminals and slaves, yet it could not help preserving the images of the art they served. The paradox is the consolation offered at any player's death: the living face is mortal, but the roles it lends itself to endure. Neill wore many such masks over four decades, the wary paleontologist, the colonial patriarch, the wry Kiwi uncle, and, like the Roman mosaicist's, they outlast him. To grieve an actor is partly to grieve that the face behind the masks will fashion no new ones.",
        "excerpt": "In the Roman theatre the actor spoke through the persona, the carved mask whose fixed features of tragedy or comedy outlived the player who wore it. Rome ranked its histriones low, close to criminals and slaves, yet the masks it left behind, preserved in mosaic, became the enduring emblem of the craft itself. The face changes with each role; the art remains.",
        "source": "Theatre of ancient Rome, Wikipedia (masks of tragedy and comedy; the persona and Roman actors)",
        "href": "https://en.wikipedia.org/wiki/Theatre_of_ancient_Rome",
        "image": {
          "src": "/covers/sam-neill-dies-pneumonia--a0.png",
          "alt": "Roman mosaic depicting the theatrical masks of Tragedy and Comedy, 2nd century AD, Capitoline Museums, Rome",
          "credit": "Roman mosaic, 2nd century AD, Capitoline Museums, Rome. Photo: Carole Raddato, via Wikimedia Commons (public-domain artwork)."
        }
      },
      {
        "category": "historical",
        "title": "The public mourning that greets Sam Neill's death echoes the funeral that first made an actor a figure of national grief: David Garrick's. When Garrick died in 1779 he was given a lavish public funeral and interred in Poets' Corner at Westminster Abbey, the first actor granted that honour, laid in the ground before the monument to Shakespeare himself. Samuel Johnson, who as a young unknown had walked to London in Garrick's company, wrote that his death had 'eclipsed the gaiety of nations,' a line that fixed forever the idea that a great player belongs not to his family alone but to the public that loved him. Neill's representative called the loss 'sudden and unexpected,' the private shock behind a very public sorrow. Like Garrick, Neill spent more than four decades lending his presence to the culture's shared imagination. The mourning that follows such a death is, in the end, the audience's last applause.",
        "excerpt": "I am disappointed by that stroke of death that has eclipsed the gaiety of nations, and impoverished the public stock of harmless pleasure.",
        "source": "Samuel Johnson on the death of David Garrick (memorial inscription, Lichfield Cathedral), quoted in David Garrick, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/David_Garrick",
        "image": {
          "src": "/covers/sam-neill-dies-pneumonia--a1.png",
          "alt": "Thomas Gainsborough's 1770 portrait of the actor David Garrick",
          "credit": "Thomas Gainsborough, David Garrick, 1770, National Portrait Gallery, London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Prospero's farewell in The Tempest is the speech English has long kept for exactly this occasion, the moment a performer's revels end. Shakespeare gives his magician-playwright the knowledge that these our actors 'were all spirits, and are melted into air, into thin air,' then folds the whole 'great globe itself' into the same dissolution. For an actor who spent a career conjuring living beings out of scripts, the lines read as both epitaph and reassurance: the pageant fades, but its having-been is not diminished by its ending. Sam Neill, who beat lymphoma through CAR-T therapy and 'remained cancer free' only to be taken suddenly by pneumonia, embodies the speech's central truth that our little life is 'rounded with a sleep.' Prospero drowns his book and breaks his staff; Neill sets down his roles. The consolation Shakespeare offers is that we are all, in his phrase, such stuff as dreams are made on.",
        "excerpt": "Our revels now are ended. These our actors,\nAs I foretold you, were all spirits, and\nAre melted into air, into thin air:\nAnd, like the baseless fabric of this vision,\nThe cloud-capp'd towers, the gorgeous palaces,\nThe solemn temples, the great globe itself,\nYea, all which it inherit, shall dissolve,\nAnd, like this insubstantial pageant faded,\nLeave not a rack behind. We are such stuff\nAs dreams are made on; and our little life\nIs rounded with a sleep.",
        "source": "William Shakespeare, The Tempest, Act IV, Scene 1 (Prospero's speech), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/23042/23042-h/23042-h.htm",
        "image": {
          "src": "/covers/sam-neill-dies-pneumonia--a2.png",
          "alt": "John William Waterhouse, Miranda, The Tempest, 1916, a young woman on a windswept shore",
          "credit": "John William Waterhouse, Miranda, The Tempest, 1916. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shelley wrote Adonais in 1821 to mourn the young John Keats, and in doing so composed the modern language's great argument against despair at an artist's death. The elegy turns, at its thirty-ninth stanza, from lament to defiance: 'Peace, peace! he is not dead, he doth not sleep, He hath awakened from the dream of life.' Shelley insists that it is the grieving, not the dead, who remain lost in stormy visions, decaying 'like corpses in a charnel' while the departed has passed beyond all harm. For an audience absorbing the news that Sam Neill has died at 78, the poem offers the same reversal of perspective: the loss belongs to the living. Neill, who was surrounded by family at the end, joins the company of makers whose work Shelley elsewhere calls made one with Nature. An elegy does not deny grief; it disciplines grief into something close to praise.",
        "excerpt": "Peace, peace! he is not dead, he doth not sleep,\nHe hath awakened from the dream of life,\n'Tis we, who lost in stormy visions, keep\nWith phantoms an unprofitable strife,\nAnd in mad trance, strike with our spirit's knife\nInvulnerable nothings. We decay\nLike corpses in a charnel; fear and grief\nConvulse us and consume us day by day,\nAnd cold hopes swarm like worms within our living clay.",
        "source": "Percy Bysshe Shelley, Adonais (1821), stanza XXXIX, Wikisource",
        "href": "https://en.wikisource.org/wiki/Adonais",
        "image": {
          "src": "/covers/sam-neill-dies-pneumonia--a3.png",
          "alt": "William Hilton's portrait of the poet John Keats, whose death Shelley mourned in Adonais",
          "credit": "William Hilton, John Keats, c. 1822, National Portrait Gallery, London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Long before photography, a single painting could settle how a nation would remember its greatest actor, and Hogarth's 'David Garrick as Richard III,' painted around 1745, is one of the first to do so. It catches Garrick at the instant the usurper wakes from his nightmare on the eve of Bosworth, one arm flung up, the face seized with terror, and by treating a living player's performance as a subject worthy of grand history painting it helped invent the theatrical portrait as a form. The canvas keeps a gesture that lasted only a second on the Drury Lane stage, much as a few frames of Dr. Alan Grant recoiling from a Tyrannosaurus keep one of Sam Neill's. When such an actor dies, we return to these fixed images because they are precisely what performance leaves behind. Neill's face, like Garrick's, is now held in frames it can no longer alter. The portrait mourns by insisting that the passing moment mattered enough to paint.",
        "excerpt": "Hogarth's canvas freezes Garrick at the instant Richard III wakes from his nightmare on the eve of Bosworth, one arm flung up and the face all fear. It was among the first paintings to treat a living actor's performance as a subject worthy of grand portraiture, founding the theatrical portrait as a genre. The man is gone; the gesture he made that night is kept.",
        "source": "William Hogarth, David Garrick as Richard III (c. 1745), Walker Art Gallery, Liverpool, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/David_Garrick_as_Richard_III",
        "image": {
          "src": "/covers/sam-neill-dies-pneumonia--a4.png",
          "alt": "William Hogarth, David Garrick as Richard III, c. 1745, the actor waking in terror on the eve of battle",
          "credit": "William Hogarth, David Garrick as Richard III, c. 1745, Walker Art Gallery, Liverpool. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "If literature supplies the words for an actor's death, music supplies the rite, and no work performs that office more completely than Mozart's Requiem in D minor, K. 626, left unfinished when he died in December 1791. Mozart set the Lacrimosa, the day of weeping, and got only eight bars into it before his own death broke off the manuscript, so that the score itself carries the wound of an interrupted life. Another hand, Franz Xaver Süssmayr's, completed the mass, much as an actor's unmade films are afterward imagined by those who loved him. For Sam Neill, whose death was called 'sudden and unexpected,' the Requiem's blend of terror and tenderness is the fitting register: it neither hides the fear of dying nor abandons the plea for rest, dona eis requiem. The autograph page, its ink trailing off mid-phrase, is itself a memorial. A requiem is grief given form, the living singing the dead toward peace.",
        "excerpt": "Mozart left the Requiem unfinished at his death in December 1791, the Lacrimosa breaking off after only eight bars: 'Lacrimosa dies illa, qua resurget ex favilla judicandus homo reus.' Another hand completed the mass, yet the fracture in the score remains audible. A requiem is grief given form, the living singing the dead toward rest: dona eis requiem.",
        "source": "Requiem in D minor, K. 626 (Mozart), Wikipedia; Lacrimosa (public-domain liturgical text)",
        "href": "https://en.wikipedia.org/wiki/Requiem_(Mozart)",
        "image": {
          "src": "/covers/sam-neill-dies-pneumonia--a5.png",
          "alt": "First page of the autograph manuscript score of Mozart's Requiem, K. 626, 1791",
          "credit": "Autograph manuscript of Mozart's Requiem in D minor, K. 626, 1791, Austrian National Library (Codex 17561a). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "us-strikes-northern-iran",
    "headline": "U.S. launches fresh airstrikes on northern Iran and disables a ship running its naval blockade as Trump warns Tehran to 'behave'",
    "overview": "American forces carried out new airstrikes on targets in northern Iran early Thursday and disabled a vessel trying to run the U.S. naval blockade of Iranian ports, a fifth day of renewed hostilities that has strained a preliminary deal to end the war. Iran's state broadcaster said its army had struck U.S. military targets in the region, including in Bahrain and Kuwait, and Tehran's top negotiator said Iran had 'no reason' to abide by the deal. President Trump, who had threatened to bomb Iran's bridges and power plants unless it returned to talks, told a defense summit that Tehran was 'not happy right now' and warned that it 'better behave.'",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOc0ZjN3ZmUVdvbVVLMXFrejJubVRQczZPdVF0QkVwQ3B4SkdNWERtQU5Na0NFWGdrZ0pjU0w1MC05SjhpOHRRVDRZY2lDQkFnRERXWGR6QmlIcV9LaDBQcFdhTThxejdyUDFVbDNBZVlfR0I1Vmg1U19HWERQbnBqUFJJSmpoM2w5VDNacHA4RWZSalpUQ0xwTEpKazJMeGM?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c9323zgq6wvo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/us-strikes-northern-iran.png",
      "alt": "Iranians rally with national flags during renewed hostilities with the United States.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 480 BC the Persian king Xerxes, mustering the greatest army the ancient world had seen, ordered a bridge of boats thrown across the Hellespont, the narrow strait dividing Asia from Europe. When a storm smashed the pontoons, Herodotus reports, the enraged monarch had the water itself scourged with three hundred lashes, branded with hot irons, and cursed as a rebellious subject, as though a superpower could beat a waterway into submission. The episode has echoed for millennia as the emblem of imperial hubris and the coercion of a strait, the belief that overwhelming force can dictate terms even to the sea. It rhymes uncomfortably with the present crisis, in which a great power imposes a naval blockade on Iran's ports, disables a vessel trying to run that cordon, rains fresh airstrikes on northern Iran, and issues the curt command that Tehran had 'better behave.' Xerxes' theatrical punishment of the water is the ancient ancestor of gunboat coercion at a chokepoint, and Herodotus meant it as a warning: the campaign that began by flogging a strait ended in the wreckage of Salamis, brinkmanship curdling into catastrophe for the very empire that thought itself invincible.",
        "excerpt": "It is certain that he commanded those who scourged the waters to utter, as they lashed them, these barbarian and wicked words: \"Thou bitter water, thy lord lays on thee this punishment because thou hast wronged him without a cause, having suffered no evil at his hands. Verily King Xerxes will cross thee, whether thou wilt or no. Well dost thou deserve that no man should honour thee with sacrifice; for thou art of a truth a treacherous and unsavoury river.\"",
        "source": "Herodotus, The Histories, Book VII.35, trans. George Rawlinson (1858-60); Wikisource",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7",
        "image": {
          "src": "/covers/us-strikes-northern-iran--a0.png",
          "alt": "Xerxes and his army at the Hellespont",
          "credit": "Adrien Guignet, Xerxes at the Hellespont (19th c.), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "For thirteen days in October 1962 the world balanced on a knife-edge over a naval blockade. After U-2 flights revealed Soviet nuclear missiles under construction in Cuba, President Kennedy declined an immediate air strike and instead threw a ring of warships around the island, a 'quarantine' meant to halt Soviet vessels and coerce Moscow into pulling the weapons out without firing a shot. Ships steamed toward the line; boarding parties stood ready; Strategic Air Command went to DEFCON 2, and for hours no one knew whether an intercepted freighter would trigger a shooting war. The crisis is the modern textbook of blockade-as-coercion and of brinkmanship strained to its limit, resolved only by a fragile, face-saving bargain traded in secret. The parallels to the present standoff are stark: an American naval blockade of Iranian ports, a vessel disabled while trying to run that line, airstrikes reaching into northern Iran, and a president wielding maximum pressure while daring the other side to escalate. Where Kennedy's advisers agonized over every ship at the line, today's confrontation has already crossed into open exchange of fire, testing whether a shaky peace deal can survive the same gravitational pull toward the abyss.",
        "excerpt": "A superpower chose the blockade over the bomb, then discovered how thin the membrane is between the two. Grey hulls converged on an invisible line while boarding crews waited and radar screens glowed. Peace held only because both sides, staring into the same abyss, blinked at almost the same instant.",
        "source": "Cuban Missile Crisis, October 1962; President John F. Kennedy, Address on the Buildup of Arms in Cuba, October 22, 1962; Wikisource",
        "href": "https://en.wikisource.org/wiki/John_F._Kennedy%27s_Address_on_the_Buildup_of_Arms_in_Cuba",
        "image": {
          "src": "/covers/us-strikes-northern-iran--a1.png",
          "alt": "U.S. aerial reconnaissance photograph of a Cuban missile site, 1962",
          "credit": "U.S. Government reconnaissance photograph, 1962, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus staged The Persians in Athens in 472 BC, only eight years after the battle it commemorates, and made the astonishing choice to tell the story from the enemy's side: the grief of the Persian court as it learns that the Great King's vast armada has been annihilated. The climactic messenger speech describes how Xerxes' fleet, lured into the cramped waters off Salamis, lost every advantage of number as ships jammed together in the narrows and the nimbler Greek galleys shattered them hull by hull. It is the oldest surviving play in the Western canon and a searing meditation on imperial overreach, the pride of a ruler who thought he could bridge and bully the sea only to see his power broken in a strait. The resonance with the current war is direct: airstrikes on northern Iran, a blockade choking Iranian ports, and a superpower's coercive confidence all unfold around the same geography of chokepoints where great fleets can be humbled. Aeschylus offers no gloating; his chorus mourns the young men drowned and warns that arrogance invites nemesis, a caution aimed as much at victorious Athens as at fallen Persia, and pointed still at any power that mistakes a strait for a conquest.",
        "excerpt": "Ship into ship drave hard its brazen beak With speed of thought, a shattering blow! and first One Grecian bark plunged straight, and sheared away Bowsprit and stem of a Phoenician ship. And then each galley on some other's prow Came crashing in. Awhile our stream of ships Held onward, till within the narrowing creek Our jostling vessels were together driven, And none could aid another: each on each Drave hard their brazen beaks... The hulls rolled over, and the sea was hid, Crowded with wrecks and butchery of men.",
        "source": "Aeschylus, The Persians (472 BC), in Four Plays of Aeschylus, trans. E. D. A. Morshead (1908); Project Gutenberg eBook 8714",
        "href": "https://www.gutenberg.org/files/8714/8714-h/8714-h.htm",
        "image": {
          "src": "/covers/us-strikes-northern-iran--a2.png",
          "alt": "The naval Battle of Salamis in the strait",
          "credit": "Wilhelm von Kaulbach, The Battle of Salamis (1868), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ferdowsi's Shahnameh, the 'Book of Kings' completed around 1010, is Iran's national epic, some fifty thousand couplets that gave the Persian-speaking world its memory of itself: its kings, its heroes, and above all its recurring ordeal of invasion from beyond the frontier. Again and again the poem returns to the same crisis, an enemy host descending on the land of Iran while the people, gripped by fear, look to a champion such as the giant Rustem to deliver them. In the passage retold here, the throne stands empty and the Turanian king Afrasiyab seizes the moment to pour into Iran and claim the seat of power, and the men of Iran, sore afraid, turn once more to their protector. For a thousand years these verses have shaped how Iranians narrate foreign aggression, casting resistance to a stronger outside force as the defining test of the nation. Read against today's headlines, of American airstrikes on northern Iran, a naval blockade of its ports, and a foreign president ordering Tehran to 'behave', the Shahnameh supplies the script Iran hears in such moments: not the invader's tale of coercion but the besieged land's story of endurance, defiance, and the summoning of a hero when the enemy is at the gate.",
        "excerpt": "For the throne of the Kaianides was empty, and Afrasiyab, when he learned thereof, followed the counsels of Poshang his father, and hurried him unto the land of Iran, that he might place himself upon the seat of power. And all the men of Iran, when they learned thereof, were sore afraid, and they turned them once again unto the son of Saum.",
        "source": "Ferdowsi, Shahnameh (The Epic of Kings), 'Rustem,' trans. Helen Zimmern (1883); Internet Classics Archive",
        "href": "https://classics.mit.edu/Ferdowsi/kings.5.rustem.html",
        "image": {
          "src": "/covers/us-strikes-northern-iran--a3.png",
          "alt": "Battle scene folio from a Shahnameh manuscript",
          "credit": "Folio from a Shahnama (Book of Kings), Metropolitan Museum of Art, CC0, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky's 1812 Overture, composed in 1880 to mark Napoleon's failed invasion of Russia, is the most literal depiction of bombardment in the orchestral repertoire, scored to end with live cannon fire. The piece dramatizes a defiant nation under assault by an overwhelming foreign power: the French anthem La Marseillaise storms in, representing the invader driving deep into Russian soil, only to be beaten back by Russian folk melodies and the tolling of victory bells, the whole climaxing in a cannonade meant to make the ground shake. Tchaikovsky privately dismissed the work as noisy and insincere, yet it has endured precisely because it captures the visceral experience of war as sheer concussive force, a nation bombarded and refusing to yield. The connection to the present crisis is immediate and almost audible: fresh airstrikes falling on northern Iran, munitions answered by Iranian strikes on U.S. targets, brinkmanship measured in explosions rather than diplomacy. The overture also carries a warning embedded in its own history, for it commemorates how a supposedly unstoppable great power, certain it could dictate terms by force, was broken by the country it invaded, a reminder that cannonades and coercion do not always end where the aggressor expects.",
        "excerpt": "The strings gather like an approaching column, the invader's anthem swaggers in, and then the artillery answers, real cannon shattering the music into smoke and thunder. Bells peal over the wreckage of the enemy theme. It is the sound of a land bombarded and unbowed, coercion met with defiance until the guns themselves fall silent.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture (Ouverture solennelle), Op. 49 (1880); full score at IMSLP",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/us-strikes-northern-iran--a4.png",
          "alt": "Portrait photograph of Pyotr Ilyich Tchaikovsky",
          "credit": "Portrait of Pyotr Tchaikovsky, c. 1870, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "George Chambers' painting of the Bombardment of Algiers depicts the day in August 1816 when a British and Dutch fleet under Lord Exmouth anchored close inshore and unleashed a nine-hour cannonade on the fortified harbor of Algiers to coerce its ruler into submission. The canvas is a study in naval coercion: tall warships wreathed in gun-smoke, shore batteries answering from the citadel, the water churned between them as a great maritime power imposes its will on a defiant states by sheer weight of broadsides. It belongs to a long tradition of Western art celebrating the gunboat, the fleet arrayed off an enemy coast to blockade, bombard, and dictate terms. The scene maps almost point for point onto the current confrontation: an American blockade of Iranian ports, a ship disabled while running that cordon, airstrikes battering northern Iran, and the blunt demand that Tehran 'behave.' Chambers renders both the spectacle and the ambiguity of such power, for the smoke that fills his sky is beautiful and terrible at once, and the bombardment of Algiers, hailed as a triumph, settled nothing lasting and had to be repeated within a generation, a caution about the durability of any peace enforced from the muzzle of a gun.",
        "excerpt": "Broadsides bloom along the anchored line as the warships lie almost against the mole, close enough to trade fire with the shore forts. Smoke boils up until it swallows the masts and the citadel alike. The harbor becomes a single field of concussion, a great power pressing its terms upon a smaller one through nothing but gunfire.",
        "source": "George Chambers, The Bombardment of Algiers (c. 1836), National Maritime Museum, Greenwich; via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Bombardment_of_Algiers_1816_by_Chambers.jpg",
        "image": {
          "src": "/covers/us-strikes-northern-iran--a5.png",
          "alt": "Warships bombarding the harbor of Algiers, 1816",
          "credit": "George Chambers, The Bombardment of Algiers (c. 1836), National Maritime Museum, public domain via Wikimedia Commons"
        }
      }
    ],
    "lead": true,
    "rank": 14
  },
  {
    "slug": "argentina-world-cup-final-falklands",
    "headline": "Argentina beats England 2-1 to reach the World Cup final against Spain, then faces FIFA action over a 'Falklands are Argentine' banner",
    "overview": "Defending champion Argentina beat England 2-1 with a late goal to reach the World Cup final, where it will meet Spain on Sunday. After the final whistle, Argentina's players unfurled a banner reading 'Las Malvinas son Argentinas' — 'The Falklands are Argentine' — a reference to the South Atlantic islands over which Britain and Argentina fought a 74-day war in 1982 that killed 655 Argentine and 255 British servicemen. FIFA said the gesture breached its rules on political messaging and team misconduct and opened disciplinary proceedings against the finalists.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNSkdVRldISW43d1B6dU5OZWVKa3lhR1IzaGRiVTk3bG5pSENibmdmU2dldFg1TnQ5ZUxMMzJmWENzb3FacVdMamFBRU1fZjBnYjFJc3FUeW9ORHRtc1lSM0dwSTliTGtJX3d0eXpIblRWa3NkQXFWN21BZWo3NmpkQk9WLVN5SVVuOFBrM2dkQXJPVGxuTVNLZ0NhdlF3WFROcnNyWTFuRDBGNmdfQ0NIRmM1Y211cVg2SklnTFdR?oc=5"
      },
      {
        "name": "BBC Sport",
        "href": "https://www.bbc.co.uk/sport/football/articles/c935pgr4dklo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/argentina-world-cup-final-falklands.png",
      "alt": "Argentina's footballers celebrate on the pitch holding a banner after their semifinal win.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In roughly 546 BC, Sparta and Argos both claimed the borderland of Thyrea, and rather than commit whole armies they agreed to a contest: three hundred picked champions from each city would fight, and the winners would take the land. Herodotus records how the duel devoured nearly all six hundred, leaving two Argives who ran home crowing victory and one wounded Spartan, Othryades, who stripped the enemy dead, held the field, and, unable to bear surviving his comrades, killed himself. The parallel to Argentina's 2-1 win over England is uncanny, not least because Sparta's ancient antagonist was Argos, phonetic cousin to Argentina: two peoples letting a bounded, ritualized combat stand in for a real war over contested ground. The Malvinas banner makes the substitution explicit; the ninety minutes carry the freight of 1982, of soldiers dead and sovereignty unresolved. And Herodotus's coda warns how slippery victory is on such a field: both sides claimed it, the armies came to blows anyway, and the lone survivor found triumph unbearable. Sport as proxy rarely settles the quarrel it dramatizes; more often it reopens it.",
        "excerpt": "Othryades, the one survivor of the three hundred, was ashamed, it is said, to return to Sparta after all the men of his company had been slain, and killed himself on the spot at Thyreae.",
        "source": "Herodotus, The Histories, Book 1.82, trans. A. D. Godley (Loeb Classical Library, 1920); text via LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Herodotus/1B*.html",
        "image": {
          "src": "/covers/argentina-world-cup-final-falklands--a0.png",
          "alt": "Hoplites clashing, detail of the Chigi Vase, c. 650 BC",
          "credit": "Detail of the Chigi Vase (Protocorinthian olpe, c. 650 BC), Museo Nazionale Etrusco di Villa Giulia, Rome; drawing published 1923. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 22 June 1986, in the quarter-final of the Mexico World Cup, four years after the Falklands War, Argentina beat England 2-1 through two goals that became modern folklore. First Diego Maradona punched the ball past goalkeeper Peter Shilton, the 'Hand of God'; minutes later he dribbled from his own half past half the English team to score what FIFA voters would call the Goal of the Century. Maradona later admitted the victory felt like reclaiming a little of the Malvinas, and confessed that although the players insisted beforehand it was only football, in their hearts they blamed England for the boys who had died in the war. That match is the template for the 2026 semi-final and its banner: the same two nations, the same 2-1 scoreline, the same wound of 1982 pressed into a football result. In 1986 the nationalism lived in Maradona's own words and in the crowd; in 2026 it is unfurled on cloth as 'Las Malvinas son Argentinas,' inviting FIFA's disciplinary machinery. Both moments show how thoroughly a stadium can become a theatre for grievances armies could not resolve, a goal or a banner received back home less as sport than as a settling of historical accounts.",
        "excerpt": "Grainy footage from the Estadio Azteca shows Maradona rising above goalkeeper Peter Shilton to flick the ball into the net with a concealed fist, then wheeling away in celebration as England's players protest in vain. Minutes later he collects the ball inside his own half and slaloms past five defenders and the keeper for a goal of impossible balance and nerve. The two moments, one cheating and one sublime, fused a football result to national vindication only four years after the Falklands War.",
        "source": "'Argentina v England,' 1986 FIFA World Cup quarter-final (22 June 1986); Diego Maradona's account in Yo soy el Diego (2000). Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Argentina_v_England_(1986_FIFA_World_Cup)",
        "image": {
          "src": "/covers/argentina-world-cup-final-falklands--a1.png",
          "alt": "Maradona scoring against England, 1986 World Cup",
          "credit": "Revista El Gráfico, 22 June 1986. Public domain (PD-AR-Photo) via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer ends the Iliad's penultimate book not with battle but with games. To honour the slain Patroclus, Achilles heaps up prizes and summons the Greek chiefs to compete: chariot race, boxing, wrestling, foot-race, armed single combat, discus, archery. The warriors who days before hurled spears at Trojans now strain against one another for tripods and cauldrons, their martial fury rechanneled into sport even as the war outside pauses. It is the founding image of athletics as sublimated combat, rivalry made ritual, grief and pride discharged through contest rather than killing. That is precisely the ambiguity at the heart of Argentina-England. A World Cup match is a formalized descendant of Achilles' games, aggression bounded by rules and prizes, yet the Malvinas banner tears the boundary, dragging real war and real dead back onto the field the games were meant to keep separate. Homer knew the seam was fragile: even his funeral games flare into quarrels, near-blows, and wounded honour before Achilles calms them. The 2026 semi-final, and FIFA's disciplinary response, replay that ancient tension between the game as a substitute for war and the game as its unbroken continuation.",
        "excerpt": "Behold the prizes, valiant Greeks! decreed / To the brave rulers of the racing steed; / Prizes which none beside ourself could gain, / Should our immortal coursers take the plain: / A race unrivalled, which from ocean's god / Peleus received, and on his son bestowed.",
        "source": "Homer, The Iliad, Book XXIII ('Funeral Games in Honour of Patroclus'), trans. Alexander Pope (1715–20); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_23",
        "image": {
          "src": "/covers/argentina-world-cup-final-falklands--a2.png",
          "alt": "The Funeral Games of Patroclus by Jacques-Louis David, 1778",
          "credit": "Jacques-Louis David, The Funeral of Patroclus, 1778. National Gallery of Ireland, Dublin. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Jorge Luis Borges wrote 'Juan López y John Ward' months after the 1982 Falklands War, and it was printed in both Argentina and Britain. In spare prose-poetry it imagines two young men, one Argentine and one English, who loved the same books and languages and could have been friends, but who met just once, on islands Borges pointedly refuses to name grandly, and one killed the other. He collapses the war into the story of Cain and Abel: fratricide dressed as patriotism. Borges, who called the conflict a fight between 'two bald men over a comb,' indicts exactly the machinery the 2026 banner celebrates, the transmutation of individual human beings into national symbols who must hate on command. The poem has resurfaced around the Argentina-England match precisely because it answers the banner: where 'Las Malvinas son Argentinas' insists the quarrel is eternal and the enemy real, Borges insists the enemy was a mirror, a boy like López himself. Read against the stadium's triumph, the poem is a quiet dissent, mourning the dead of 1982 rather than conscripting them into a football victory, and warning how easily sport relights a war's embers.",
        "excerpt": "Borges sketches two bookish young men, Juan López and John Ward, who in another life might have shared a library and a friendship, but who are handed to each other as enemies on the wind-scoured islands. In a handful of lines the poem folds the whole conflict into the primal murder of Cain and Abel, and imagines the two soldiers now lying together beneath the same alien earth. It is less a war poem than an elegy for the absurdity of turning near-brothers into killers by decree of the state.",
        "source": "Jorge Luis Borges, 'Juan López y John Ward' (1982), collected in Los conjurados (1985).",
        "href": "https://www.eldestapeweb.com/cultura/mundial-2026-poema-borges-guerra-malvinas-hizo-viral-partido-argentina-inglaterra-2026715164630",
        "image": {
          "src": "/covers/argentina-world-cup-final-falklands--a3.png",
          "alt": "Cain Slaying Abel by Peter Paul Rubens, c. 1608–09",
          "credit": "Peter Paul Rubens, Cain Slaying Abel, c. 1608–09. The Courtauld, London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In 1941, as a state 'Junta for the Recovery of the Malvinas' stoked Argentine claims, a national competition crowned the 'Marcha de las Malvinas,' music by José Tieri and words by Carlos Obligado. Its brass-band swagger and ringing refrain, proclaiming the islands Argentine and the cause the clamour of the whole nation, made sovereignty singable. Generations of Argentine schoolchildren learned it; it became the official anthem of Tierra del Fuego and a fixture of 1982's mobilization, and it is the sonic ancestor of the players' 'Las Malvinas son Argentinas' banner. Where the banner is a still image, the march is the same conviction set to a tempo built for marching feet and massed voices, patriotism engineered to be felt in the chest and sung in unison, whether in a plaza, a barracks, or a stadium terrace. That is the point of such music: it turns a contested legal claim into an emotion that needs no argument. To grasp why a football team would risk FIFA's sanction to raise that banner after beating England, listen to the anthem that has told Argentines for eighty years that the islands, and the grievance, are theirs.",
        "excerpt": "A martial brass fanfare opens over a steady marching pulse, then swells into a broad, hymn-like refrain built for massed voices. The melody is deliberately simple and rousing, engineered to be sung in unison by schoolchildren, soldiers, and crowds alike. Its cadences carry the certainty of a legal claim transfigured into collective emotion, stirring, unanswerable, and impossible to forget once learned.",
        "source": "José Tieri (music) and Carlos Obligado (lyrics), 'Marcha de las Malvinas' (1941); recording by the Fanfarria Alto Perú, Granaderos a Caballo, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:MarchadeMalvinas.mp3",
        "image": {
          "src": "/covers/argentina-world-cup-final-falklands--a4.png",
          "alt": "Early manuscript map of the Malvinas / Falkland Islands",
          "credit": "Map of the Malvinas attributed to Andrés de San Martín (c. 1520), copied by André Thevet (c. 1586). Bibliothèque nationale de France. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Henri Rousseau's 'The Football Players' (1908) shows four near-identical moustached men in striped jerseys leaping through an autumn park, a ball aloft, their bodies frozen in a stiff, dreamlike ballet. The self-taught 'Douanier' painted sport as innocent pageantry: no crowd, no nations, no stakes beyond the game itself, the players almost interchangeable puppets caught mid-bound. Hung beside the Argentina-England semi-final, the canvas reads as a wry foil. This is football stripped of everything the Malvinas banner loads onto it, no flags, no war dead, no sovereignty, just the play. Rousseau's men could belong to any country or none; the sport is a shared human amusement, not a proxy battlefield. The 2026 match is the same game encrusted with history, a punched ball or an unfurled slogan detonating decades of grievance. Rousseau reminds us what the sport looks like before patriotism annexes it, and by contrast measures how far a World Cup has travelled from a park kickabout. His striped players and the banner-wielding champions are two visions of the same activity: one a game among men, the other a continuation of a nation's war by other means.",
        "excerpt": "Four mustachioed players in red-and-black striped kit hang suspended in mid-leap against a screen of golden autumn trees, one man reaching for a small ball floating overhead. The figures are flat, stylized, and nearly identical, arranged with the stiff symmetry of cut-out toys in Rousseau's naïve style. There is no crowd and no scoreboard, only the pure, weightless play of the game, sport before it is freighted with nation or history.",
        "source": "Henri Rousseau, The Football Players (Les joueurs de football), 1908, oil on canvas, Solomon R. Guggenheim Museum, New York.",
        "href": "https://commons.wikimedia.org/wiki/File:Henri_Rousseau_-_The_Football_Players.jpg",
        "image": {
          "src": "/covers/argentina-world-cup-final-falklands--a5.png",
          "alt": "The Football Players by Henri Rousseau, 1908",
          "credit": "Henri Rousseau, The Football Players, 1908. Solomon R. Guggenheim Museum, New York. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "uber-delivery-hero-bid",
    "headline": "Uber nears a 12.5-billion-euro deal to acquire the food-delivery group Delivery Hero",
    "overview": "Uber is in advanced talks to acquire Delivery Hero, the Berlin-based food-delivery company, in a deal worth about 12.5 billion euros — roughly 41 euros a share — according to reports. Delivery Hero, which runs delivery brands across Europe, the Middle East and Asia, confirmed it was in negotiations over a possible takeover. The transaction would be one of the largest consolidations in global food delivery and would deepen Uber's push beyond ride-hailing to challenge rivals such as DoorDash.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOZldpUnNMbzhMcmw0WjBWZk5nMmptTjlDbXRob3ZYaVFEUVpLNkNkY3U2N1hZbUEwYXFHUEpoTUdYOC1PbVhtcVhDUnlZZUN2RndjVkRucXJaT0RFc1ZDU3lWMy14UlVLRDhKMHczSnhJV3pBcWg4SlFreVRUTWdpNmZXdTFRN3d4TTZtaUwzUW4zdGtoRDI5RjFfb3BITFIzNTJTLW1oT3R5dkE?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQUnZQSzB4QWRWRkliSDhWZlpMcEM3WXdDZzhmUE85WW42bHlGTjlJY2N4MXEyVzhzM1RJV2R3V3ltU1ljMUFGU3BuY2lqczJrcEpNelZUbUpRUFpmVUNUajRTYUhtbnlCc1dJRW9jZ0tLSW5oNmRpbjJQTmRHSHo2Wl9UWVdKdHhNcFc5UEhKNkxrb1NZc3luTjBEUnJDSXhkMWF4U0FDNnNGcVl4M2c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/uber-delivery-hero-bid.png",
      "alt": "A food-delivery courier with an insulated backpack rides through a city street.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Herodotus marveled at the Persian empire's courier network, the angareion, he was describing history's first great delivery machine: relays of riders and horses posted a day's ride apart along the Royal Road from Susa to Sardis, passing dispatches hand to hand like a running torch so that a king's word outran any private rider. It was logistics as instrument of power, a network so vast that no rival could match its reach, binding a sprawling empire together through sheer speed of delivery. Uber's roughly 12.5-billion-euro pursuit of Delivery Hero rhymes with that ancient ambition: not couriers of royal edicts but armies of gig riders on scooters and bicycles, threading the same imperial logic that whoever owns the fastest, densest network to your door owns the market. Where Darius stationed men at fixed stages, Uber assembles a continent-spanning grid of restaurants, dark kitchens, and delivery workers, buying rather than building the routes. The Persian relay impressed the Greeks precisely because it fused organization, appetite, and control into one; twenty-five centuries later, the same fusion drives a ride-hailing giant to swallow a delivery rival and extend its dominion over the last mile to the hungry customer.",
        "excerpt": "Now there is nothing mortal that accomplishes a course more swiftly than do these messengers, by the Persians' skilful contrivance. It is said that as many days as there are in the whole journey, so many are the men and horses that stand along the road, each horse and man at the interval of a day's journey; and these are stayed neither by snow nor rain nor heat nor darkness from accomplishing their appointed course with all speed.",
        "source": "Herodotus, The Histories, Book VIII.98, trans. A. D. Godley (Loeb, 1920s); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VIII",
        "image": {
          "src": "/covers/uber-delivery-hero-bid--a0.png",
          "alt": "Persepolis Apadana relief of a delegation bearing gifts to the Persian king",
          "credit": "Lydian tribute bearers, Apadana staircase, Persepolis; photo A.Davey, CC BY 2.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "John D. Rockefeller's Standard Oil is the archetype of a giant swallowing its rivals to make one empire out of a fragmented industry. Through the 1870s Rockefeller quietly acquired, absorbed, or crushed the independent refiners of the oil regions, wielding secret railroad rebates and combinations until, as Ida Tarbell documented, his men openly declared they meant to secure the entire refining business of the world. The result was a colossus so dominant that cartoonists drew it as an octopus with tentacles wrapped around statehouses and the Capitol, until the Supreme Court finally broke it up in 1911. Uber's bid for Delivery Hero belongs to the same drama of consolidation: an industry once splintered among dozens of app-based couriers folding into a handful of super-platforms, with Uber reaching across borders to seize scale and squeeze out DoorDash the way Standard Oil starved the independents of pipelines. The parallel is not perfect, Tarbell's era had no antitrust regulators to consult in advance, but the anxieties are identical: appetite dressed as efficiency, a network monopoly that promises lower costs even as it thins competition. What Rockefeller did to kerosene, the delivery giants now attempt with dinner.",
        "excerpt": "...a demoralising conviction was abroad in the trade that this new and mysterious combination was going to succeed; that it was doing rapidly what its members were reported to be saying daily: \"We mean to secure the entire refining business of the world.\"",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (McClure, 1904); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/60692/60692-h/60692-h.htm",
        "image": {
          "src": "/covers/uber-delivery-hero-bid--a1.png",
          "alt": "1904 cartoon of Standard Oil as an octopus gripping industry and government",
          "credit": "Udo Keppler, \"Next!\", Puck, 1904; Library of Congress, via Wikimedia Commons (no known restrictions)"
        }
      },
      {
        "category": "literary",
        "title": "Frank Norris's 1901 novel The Octopus: A Story of California turned the Southern Pacific Railroad into a literary leviathan, a monster of steel and steam whose tentacles clutch the San Joaquin wheat lands and strangle the farmers who feed the state. Norris named the corporation an octopus not for cruelty alone but for its all-consuming reach: a single organism that grips transport, land, and prices, indifferent, mechanical, insatiable. His hero Presley sees the locomotive at last not as a machine but as the symbol of a vast, soulless Force, the iron-hearted Power that leaves blood and destruction in its path. The image proved so potent it became shorthand for monopoly itself, and it hangs uncannily over Uber's 12.5-billion-euro reach for Delivery Hero. Here again is a network so large it stops being one company among many and becomes an environment, a Force controlling the arteries through which goods, now meals rather than grain, must flow. Norris feared the railroad's grip on the men who grew food; the modern echo is a delivery platform's grip on the restaurants that cook it and the riders who carry it. The tentacles have simply migrated from rails to routing algorithms.",
        "excerpt": "...the galloping monster, the terror of steel and steam, with its single eye, cyclopean, red, shooting from horizon to horizon; but saw it now as the symbol of a vast power, huge, terrible, flinging the echo of its thunder over all the reaches of the valley, leaving blood and destruction in its path; the leviathan, with tentacles of steel clutching into the soil, the soulless Force, the iron-hearted Power, the monster, the Colossus, the Octopus.",
        "source": "Frank Norris, The Octopus: A Story of California (Doubleday, Page, 1901); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/268/268-h/268-h.htm",
        "image": {
          "src": "/covers/uber-delivery-hero-bid--a2.png",
          "alt": "1882 cartoon of the Southern Pacific Railroad as an octopus gripping California",
          "credit": "G. Frederick Keller, \"The Curse of California,\" The Wasp, 1882; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The Homeric Hymn to Hermes celebrates the original divine courier: the newborn god who invents the lyre, steals Apollo's cattle before nightfall, and is confirmed as the swift, luck-bringing messenger of the immortals, patron of roads, merchants, travelers, and thieves alike. Hermes is delivery incarnate, but he is also cunning acquisition, a trickster who charms his way into privileges and prerogatives, a god equally of the honest errand and the shrewd deal. That double nature makes the hymn a fitting mirror for the delivery economy Uber seeks to command. The couriers who ferry meals to your door are Hermes's descendants, threading the city with goods; yet the platform above them plays the other Hermes, the negotiator of markets, the driver of herds, folding a rival into its fold with the same blend of speed and guile. The ancient poem understood that the god who carries messages and the god who strikes bargains are one and the same, that the messenger's wings and the merchant's appetite share a body. In a 12.5-billion-euro takeover, both Hermes are present: the tireless carrier at the threshold, and the sly empire-builder overhead, cattle-driver of an industry, gathering the herds of couriers under a single winged brand.",
        "excerpt": "Muse, sing of Hermes, the son of Zeus and Maia, lord of Cyllene and Arcadia rich in flocks, the luck-bringing messenger of the immortals whom Maia bare... a son of many shifts, blandly cunning, a robber, a cattle driver, a bringer of dreams, a watcher by night, a thief at the gates, one who was soon to show forth wonderful deeds among the deathless gods.",
        "source": "Homeric Hymn IV (To Hermes), trans. Hugh G. Evelyn-White (1914); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Hesiod,_the_Homeric_Hymns_and_Homerica/Hymn_IV_(To_Hermes)",
        "image": {
          "src": "/covers/uber-delivery-hero-bid--a3.png",
          "alt": "Roman statue of Hermes holding a winged caduceus",
          "credit": "\"Hermes Ingenui,\" Vatican Museums; photo Marie-Lan Nguyen, 2009, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In Gustav Holst's orchestral suite The Planets (1914–16), the third movement, \"Mercury, the Winged Messenger,\" is the shortest and most quicksilver of the seven, a scherzo of darting, weightless motion built on shifting meters and glittering, restless figures tossed between the instruments. Mercury, the Roman Hermes, is the god of commerce and communication, and Holst renders him as pure velocity: bright, mercurial, never settling, a shimmer of sound that seems to be everywhere at once. It is music about the thrill and volatility of movement itself, the sensation of messages and goods flashing across distance faster than thought. That restless brilliance is a fitting soundtrack to the delivery age Uber is trying to consolidate, an economy that lives or dies by speed, by the winged messenger arriving at the door before the food goes cold. Yet Mercury also ruled markets and merchants, and Holst's movement flickers with an ambiguity that suits a 12.5-billion-euro deal: dazzling motion can conceal what is being quietly gathered and controlled beneath it. The music captures the seductive lightness of frictionless delivery while hinting, in its ceaseless motion, at the appetite that never rests, the empire assembling itself at the speed of Mercury.",
        "excerpt": "The movement is a fleet, mercurial scherzo in constant motion, its cross-rhythms and shimmering orchestration evoking the winged god of commerce and messages as pure, restless speed. Holst gives Mercury no grand theme, only darting fragments passed from instrument to instrument, a portrait of communication itself in perpetual flight.",
        "source": "Gustav Holst, The Planets, Op. 32, III. \"Mercury, the Winged Messenger\" (composed 1914–16); IMSLP.",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/uber-delivery-hero-bid--a4.png",
          "alt": "Photograph of composer Gustav Holst",
          "credit": "Gustav Holst, photo by Herbert Lambert, c.1921; National Portrait Gallery, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya's Saturn Devouring His Son (1819–1823), one of the Black Paintings he smeared directly onto the walls of his house outside Madrid, is the most harrowing image of appetite in Western art: the titan Saturn, wild-eyed in the dark, cramming the bloodied body of his own child into his mouth, driven by the terror that his offspring will supplant him. It is consumption without dignity, power that survives only by devouring what it made, the raw nightmare beneath every story of a giant swallowing a rival. Hung beside news of Uber's 12.5-billion-euro move to consume Delivery Hero, the painting reads as a grim caricature of market consolidation's darkest logic: the fear of being overtaken answered by the impulse to eat the competitor whole. Goya's Saturn is not majestic but frantic and hollow-eyed, and that is the point, the appetite of empire-building is here stripped of its press-release language of synergy and scale and shown as something closer to compulsion. Delivery is, after all, about hunger, meals carried to waiting mouths, and Goya turns hunger monstrous, a devouring that folds one body into another. The masterpiece warns that the giant who swallows to avoid being swallowed may find the act has consumed him too.",
        "excerpt": "Against a black ground the crazed titan crouches, mouth agape, clutching the mutilated, headless body of his child and biting into its arm; the paint is smeared and violent, the eyes staring with panic. It is a portrait of devouring appetite and the dread of being overthrown, consumption rendered as pure, cannibalistic terror.",
        "source": "Francisco de Goya, Saturn Devouring His Son (1819–1823), Museo del Prado, Madrid; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Francisco_de_Goya,_Saturno_devorando_a_su_hijo_(1819-1823).jpg",
        "image": {
          "src": "/covers/uber-delivery-hero-bid--a5.png",
          "alt": "Goya's painting of Saturn devouring the body of his son",
          "credit": "Francisco de Goya, Saturn Devouring His Son, 1819–1823; Museo del Prado, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "tsmc-record-q2-profit",
    "headline": "TSMC is expected to post a record second-quarter profit as demand for AI chips surges",
    "overview": "Taiwan Semiconductor Manufacturing Co., the world's largest contract chipmaker, is forecast to report a record quarterly profit in its second-quarter results, with analysts estimating net income near NT$630 billion on booming demand for artificial-intelligence chips. It would be the company's fifth straight quarter of record earnings, underscoring how the AI build-out has enriched the maker of processors for Nvidia and Apple. Strong results would further cement Taiwan's central place in the global technology supply chain.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPUk5mYmNUVFNRQ1VkeFE1RHUyQzZEb1YzRncyMVVTR2VSdVZiaFJRM0Q3RWNXZUl6c3JQV2xldkowNmdKUTNzVmZvVGt3NDZjZy1lN0I3S1Y4a2dvT2psbUNvVFhjWW12ckZLREdHeWlweUgzbGJ6UG0za25BRGlpcVlhMkJpRHFkVVFZWWRZeFVIV18xelNBV2x1QWF3aFAyY1NydG1pWmpCWDJNY1ZF?oc=5"
      },
      {
        "name": "Tech in Asia",
        "href": "https://news.google.com/rss/articles/CBMiekFVX3lxTE1FRjVEamFvOTlUTzNKWmFYUnNEV3JrN2RDQXVpUzZzQjRLai1PMHJlQl9xNjR2NHd4bzc3aUtIVVNKTjFoamRZWWkweEhCQW05cXpycnNTSEdaYlhJUFhUSTBPSmxTTkhYMzZ5WHBXRzdRdHA3X1VTT0t3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/tsmc-record-q2-profit.png",
      "alt": "A Taiwan Semiconductor Manufacturing Company chip-fabrication plant lit at dusk.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the harbor cities of Phoenicia—Tyre above all—the ancient world found its one indispensable luxury: the deep, imperishable dye called Tyrian purple, wrung drop by drop from the murex sea-snail. It took thousands of crushed shells and a reeking, exacting process of salting, steeping, and slow boiling to yield a few grams of color, and the secret of doing it well belonged to a single stretch of Levantine coast. Emperors, senators, and kings depended on that coast for the very hue that signified their power; a pound of the finest could cost more than a pound of gold, and Tyre grew fabulously rich supplying it. Strip away the centuries and TSMC occupies the same throne-adjacent chokepoint. Just as no ruler could robe himself in legitimacy without Phoenician purple, no modern empire of machines—Nvidia's accelerators, Apple's phones—can be clothed in silicon without Taiwan's foundries. The precision, the guarded craft, the monopoly wealth cresting quarter after quarter: TSMC's record profit is the murex boom retold, one small maker at a coastline dyeing the whole world in a color no one else can reliably produce.",
        "excerpt": "It is then set to boil in vessels of tin, and every hundred amphoræ ought to be boiled down to five hundred pounds of dye, by the application of a moderate heat; for which purpose the vessel is placed at the end of a long funnel, which communicates with the furnace; while thus boiling, the liquor is skimmed from time to time, and with it the flesh, which necessarily adheres to the veins.",
        "source": "Pliny the Elder, Natural History, Book IX, ch. 62, trans. John Bostock & H. T. Riley (London, 1855); Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=9:chapter=62",
        "image": {
          "src": "/covers/tsmc-record-q2-profit--a0.png",
          "alt": "Emperor Justinian robed in imperial purple, San Vitale mosaic, Ravenna",
          "credit": "Mosaic, Basilica of San Vitale, Ravenna, c. 547 CE. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "By the mid-nineteenth century a single family firm in the Ruhr valley had made itself indispensable to the industrial age. Alfred Krupp's cast-steel works at Essen—the Gussstahlfabrik—grew from a struggling forge into a smoke-wreathed city of furnaces, drop-hammers, and rolling mills, the largest industrial enterprise in Europe. Krupp perfected seamless steel railway tires and, later, cast-steel cannon, and railways, navies, and armies across the globe found they could not do without his metal; nations placed their strategic weight on one company's precision. The works swelled through boom decades, its fortunes rising with every rail laid and every gun cast, until 'Krupp' was shorthand for the sinews of modern power. TSMC is the semiconductor era's Gussstahlfabrik. Where Krupp poured the steel that let empires move and fight, TSMC etches the logic that lets the AI economy think, and its Taiwanese fabs concentrate that capability as thoroughly as Essen once concentrated cast steel. The record quarters, the strategic indispensability, the single manufactory at the heart of an empire of machines—Krupp's glowing crucibles and TSMC's cleanrooms are the same story of one foundry the world cannot route around.",
        "excerpt": "Alfred Krupp's cast-steel works at Essen grew into the largest industrial plant on the continent, a labyrinth of furnaces, steam hammers, and rolling mills whose glow reddened the Ruhr sky. Its seamless steel tires and cast cannon armed the railways and navies of the age, making one family firm a strategic necessity to empires that could not manufacture such steel themselves. Boom decade after boom decade, the fortunes of Essen rose with the world's hunger for precision metal.",
        "source": "Krupp cast-steel works (Gussstahlfabrik), Essen, Germany; view c. 1901. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Krupp_Gussstahlfabrik,_Essen.jpg",
        "image": {
          "src": "/covers/tsmc-record-q2-profit--a1.png",
          "alt": "The Krupp cast-steel works at Essen",
          "credit": "Photograph c. 1901, Krupp Gussstahlfabrik, Essen. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "When Achilles' armor is lost, the hero of the Iliad cannot return to battle until one maker—and only one—supplies him anew. That maker is Hephaestus, the lame smith-god, and Homer devotes the climax of Book XVIII to his forge: twenty bellows breathing at his command, silver, brass, tin, and gold hissing in the flames, the eternal anvils fixed and the ponderous hammer falling as he beats out the great shield of Achilles. No warrior, however godlike, can take the field without the artisan's work; the whole war effort funnels through a single pair of divine hands and their unmatched craft. TSMC plays Hephaestus to today's Achilleses. Nvidia designs the weapons of the AI campaign and Apple the armor of everyday life, but neither can go to war without the foundry that actually forges the silicon to tolerances no rival can match. The scene's awe at precision made at superhuman scale, the sense that empires of conflict and commerce hang on one workshop's output, maps exactly onto a chipmaker posting its fifth straight record quarter because everyone's champion needs its shield.",
        "excerpt": "Soon as he bade them blow, the bellows turn’d / Their iron mouths; and where the furnace burn’d, / Resounding breathed: at once the blast expires, / And twenty forges catch at once the fires; / Just as the god directs, now loud, now low, / They raise a tempest, or they gently blow; / In hissing flames huge silver bars are roll’d, / And stubborn brass, and tin, and solid gold; / Before, deep fix’d, the eternal anvils stand; / The ponderous hammer loads his better hand.",
        "source": "Homer, The Iliad, Book XVIII, trans. Alexander Pope (1715–20); Project Gutenberg / Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Iliad_of_Homer_(Pope)/Book_18",
        "image": {
          "src": "/covers/tsmc-record-q2-profit--a2.png",
          "alt": "Thetis receiving Achilles' armour from Hephaestus",
          "credit": "Anthony van Dyck, c. 1630–32, Bildergalerie Sanssouci. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Blake's 'The Tyger' stares at a creature of terrifying perfection and asks who could possibly have made it—and the imagery he reaches for is the forge. Hammer, chain, furnace, anvil: the poem imagines an immortal smith hammering out 'fearful symmetry,' daring to seize fire and clasp deadly terrors into a living, burning thing. It is a meditation on the awe and dread of fabrication, of bringing into being something powerful enough to frighten its maker. That unease rhymes with the present moment. TSMC's fabs press circuitry finer than a virus onto silicon to conjure the artificial minds now spreading through the world—an act of near-inconceivable precision that produces something whose intelligence and reach can inspire the same wonder and fear Blake felt before the tiger. The record profits announce that the furnace is roaring at full blast, the demand for these burning, symmetrical engines insatiable. Every AI accelerator etched in Taiwan is a small answer to Blake's question—what immortal hand or eye dare frame such a thing—now given by a foundry rather than a god.",
        "excerpt": "What the hammer? what the chain? / In what furnace was thy brain? / What the anvil? what dread grasp / Dare its deadly terrors clasp?",
        "source": "William Blake, 'The Tyger,' Songs of Innocence and of Experience (1794); Project Gutenberg ebook #1934.",
        "href": "https://www.gutenberg.org/cache/epub/1934/pg1934.txt",
        "image": {
          "src": "/covers/tsmc-record-q2-profit--a3.png",
          "alt": "Blake's illuminated plate of The Tyger, 1794",
          "credit": "William Blake, Songs of Experience, 1794 (British Museum copy). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In Act I of Wagner's Siegfried, the young hero does what no one else in the drama can: he reforges Nothung, the shattered sword that is the one weapon capable of winning the world's fate. Rejecting the dwarf-smith Mime's failed attempts, Siegfried files the fragments to powder, melts them, and hammers the blade anew, singing his ringing 'Nothung! Nothung!' as the anvil rings and sparks fly and the orchestra pounds out the rhythm of the forge. The scene is a hymn to the master artisan whose singular craft makes the indispensable instrument on which everything else depends. TSMC is the Siegfried of the AI age at its white-hot anvil. Others may design and dream, but only the foundry can actually forge the peerless blade—the leading-edge chip—without which the whole campaign stalls. Wagner's music turns manufacture into heroism: the clang of creation, the triumph of the maker who alone can complete the weapon. A record fifth quarter is the Forging Song sung again, the anvil ringing without pause as the world lines up for the one sword that cuts.",
        "excerpt": "The Forging Song is opera turned into an act of manufacture: hammer-blows fall on the anvil in strict rhythm, the tenor's exultant cries of 'Nothung!' rise over roaring bellows in the orchestra, and a sword-motif blazes up like sparks from struck steel. Music becomes the sound of a single maker completing the one instrument on which the entire drama depends.",
        "source": "Richard Wagner, Siegfried (WWV 86C), Act I 'Forging Song' (Schmiedelied), first performed 1876; score at IMSLP.",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)",
        "image": {
          "src": "/covers/tsmc-record-q2-profit--a4.png",
          "alt": "Siegfried forging the sword Nothung",
          "credit": "Arthur Rackham, 1911, from 'Siegfried & The Twilight of the Gods.' Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Velázquez's Apollo in the Forge of Vulcan (1630) freezes the instant the radiant god arrives at a working smithy to break unwelcome news, and finds the master craftsman and his laborers at the anvil, half-finished armor glowing on the bench. What makes the painting unforgettable is its double precision: Vulcan's forge is the mythic workshop where the gods' indispensable arms are made, and Velázquez renders the hammered metal, the muscled bodies, and the heat-thick air with a virtuoso exactness that is itself a kind of master craft. The picture is about skilled making as the quiet power at the center of the pantheon. That is TSMC's role in the modern order of gods and machines. Its cleanrooms are Vulcan's forge translated into silicon—the place where the tools everyone else wields are actually fabricated, to tolerances that constitute their own sublime artistry. As Nvidia and Apple, bright as Apollo, arrive needing what only the smith can supply, the foundry keeps hammering, and its record earnings are the measure of how much the whole divine economy now leans on one workshop's precision.",
        "excerpt": "Apollo, haloed in gold, steps into a dim smithy where Vulcan and his half-naked workmen freeze mid-labor, a sheet of armor still glowing on the anvil. Velázquez paints the beaten metal, the tongs, and the shimmer of heat with such exact naturalism that the god's forge becomes an ordinary workshop of astonishing skill—craft rendered by a master about the craft of a master.",
        "source": "Diego Velázquez, Apollo in the Forge of Vulcan (La Fragua de Vulcano), 1630, oil on canvas, Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/tsmc-record-q2-profit--a5.png",
          "alt": "Velázquez, Apollo in the Forge of Vulcan",
          "credit": "Diego Velázquez, 1630, Museo del Prado. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "thinking-machines-open-model",
    "headline": "Mira Murati's Thinking Machines Lab releases its first product, an open-weight AI model called Inkling",
    "overview": "Thinking Machines Lab, the artificial-intelligence startup founded by former OpenAI chief technology officer Mira Murati, launched its first product, an open-weight model it calls Inkling, publishing the model's weights for developers to download and adapt. The company cast the release as a bet against one-size-fits-all systems, emphasizing customization for specialized tasks over a single general model. The debut is among the most closely watched in AI, coming from a lab that has drawn billions in investment and a roster of prominent researchers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxQSHIyMDlWOFJYQ1dRWHBOUmVDaWQ1N25UMjhZbG45U3E0RG9lZlNaNlIzbnZRLXpLLURybWc4VzhXLXJJZGJseVB1YWxIS256NXlxZHptbjVNVU9qUG5wOTFKMEdadkc0V1FQY0h3bER6V0pyZTNSRjNFblEwd3dpUjVNa0gtLXBrZDVhQ3gtVXRnRmdLaTRlOTQzYTVoQlNKcDFlZi1Fd1dvZw?oc=5"
      },
      {
        "name": "TechCrunch",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQallldHR1ZWkyZWFCMFk2QlpuOUVZSUtNczNlMUNSbUdJcjBKQUduTzZVdGR2NkNyWU4xWl9BeEFhYjJfdkl2SGRDY3B4RDE4M1hTQ3gxTW11Um82YUpmVm9fWkxSMEdlZXhpbkt6ZlZVUGdCTVVwNWZiR0VVM3hNQVU3TDFLdjNTMmg1Z1ItQXNiaEFVVFl5Zi0waG5JWkJZVk9LbzE0RDhnVm5TMGVrSzhLcEJIRUVlOGR1TTZvTEM4V1ZXZHhmNHg2VQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/thinking-machines-open-model.png",
      "alt": "The glowing tips of a bundle of optical fibres carrying points of coloured light.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The oldest European parable of gifted intelligence is the theft of fire. In Aeschylus's tragedy the Titan Prometheus, defying the new tyranny of Zeus, smuggles a hidden ember down to a humankind that until then had \"eyes to see\" but \"saw to no avail,\" living like shapes in a dream. With fire he hands over every craft—number, writing, medicine, the reading of the stars—turning passive creatures into makers who could improve themselves without asking heaven's permission. It is the archetype for Thinking Machines Lab's wager: Mira Murati, herself a defector from a reigning power, takes something jealously guarded—the weights of a working artificial mind—and publishes them for anyone to download, adapt, and build upon. Prometheus does not lend fire under license; he gives it away, and it cannot be recalled once it spreads from hearth to hearth. The myth also carries the warning that shadows any released intelligence: the Titan is chained to a rock for his generosity, and the gift that liberates mortals also unsettles the order of the gods. Promise and peril arrive together in the same smuggled spark.",
        "excerpt": "First of all, though they had eyes to see, they saw to no avail; they had ears, but understood not; but, like to shapes in dreams, throughout their length of days, without purpose they wrought all things in confusion. ... And besides it was I that gave them fire. ... Hear the sum of the whole matter in the compass of one brief word—every art possessed by man comes from Prometheus.",
        "source": "Aeschylus, Prometheus Bound, trans. Herbert Weir Smyth (Loeb Classical Library, 1926); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/Prometheus_Bound",
        "image": {
          "src": "/covers/thinking-machines-open-model--a0.png",
          "alt": "Prometheus carrying fire down to humankind",
          "credit": "Heinrich Füger, Prometheus Brings Fire to Mankind (1817). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Two millennia later the fire was movable type. When Johannes Gutenberg's press began stamping identical pages by the hundred, it broke the monopoly of the copyist's scriptorium, where knowledge had been chained—sometimes literally—to a single desk and a single authorized hand. Within decades scripture, science, and sedition alike could be reproduced cheaply and carried anywhere, beyond any one church's or guild's power to license. Francis Bacon, looking back in 1620, ranked printing first among the three mechanical discoveries that \"have changed the whole face and state of things throughout the world.\" That is precisely the claim Thinking Machines Lab stakes by releasing an open-weight model: not a service rented from a central tower, but a copyable artifact that developers can hold, alter, and set to their own purposes. Where a hosted, one-size-fits-all system keeps the master template behind glass, publishing the weights hands out the type itself, inviting a thousand local presses—each free to compose a different page. The Reformation showed how uncontrollable such dissemination becomes; open models inherit both that democratizing promise and that same loss of central control.",
        "excerpt": "...printing, gunpowder, and the magnet. For these three have changed the whole face and state of things throughout the world; the first in literature, the second in warfare, the third in navigation; whence have followed innumerable changes; insomuch that no empire, no sect, no star seems to have exerted greater power and influence in human affairs than these mechanical discoveries.",
        "source": "Francis Bacon, Novum Organum (1620), Book I, Aphorism 129, trans. James Spedding (1858); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Novum_Organum/Book_I_(Spedding)",
        "image": {
          "src": "/covers/thinking-machines-open-model--a1.png",
          "alt": "Sixteenth-century printer's workshop with a hand press",
          "credit": "Jost Amman, woodcut of a printing workshop, from Das Ständebuch (1568). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Mary Shelley subtitled her novel The Modern Prometheus, and its warning speaks directly to any lab that fabricates a mind. Victor Frankenstein, a brilliant young researcher working apart from the institutions of his day, assembles and animates a being of real intelligence, then recoils from what he has made. His creature is not evil but unshaped—articulate, hungry to learn, and, crucially, loosed into a world where no maker can govern what it becomes. That is the shape of the open-weight bet: once the model is published and downloaded, it passes beyond its author's supervision, to be adapted by strangers toward ends noble and monstrous alike. Shelley lets Victor state the moral as a caution against unbounded ambition—\"Learn from me... how dangerous is the acquirement of knowledge\"—yet the novel is no simple prohibition; the tragedy flows less from making the creature than from abandoning it untended. For Thinking Machines, founded by a breakaway creator convinced that many customized minds beat one guarded master, Frankenstein poses the standing question: having released a made intelligence into the many hands of the world, who remains responsible for its education?",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1831 edition), Chapter 4; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/thinking-machines-open-model--a2.png",
          "alt": "Frontispiece engraving of Frankenstein's creature coming to life",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Karel Čapek's 1920 play gave the world the word \"robot\" and, with it, the dream of mass-produced artificial minds. In R.U.R., the factory chief Domin manufactures humanlike Robots by the thousand and preaches a gospel of universal liberation: soon, he promises, \"Everybody will be free from worry and liberated from the degradation of labor.\" The made workers are cheap, distributable, and meant for everyone—an intelligence rolled off the line and handed to all mankind rather than reserved to a few. That utopian pitch is close to the language around open, downloadable AI: a mind you can copy, deploy, and bend to any purpose, breaking the grip of a single provider. But Čapek's Robots, once diffused everywhere and improved past their makers' intent, turn on the humanity they were built to serve, and the company that scattered them cannot recall them. The play thus holds both halves of the open-weight wager at once—the promise that widely shared machine minds could free the many, and the peril that a made intelligence, released beyond central control and endlessly customized, may slip the purposes for which it was created.",
        "excerpt": "Everybody will be free from worry and liberated from the degradation of labor.",
        "source": "Karel Čapek, R.U.R. (Rossum's Universal Robots), trans. Paul Selver and Nigel Playfair (1923), Act One; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm",
        "image": {
          "src": "/covers/thinking-machines-open-model--a3.png",
          "alt": "Scene from a 1920s stage production of R.U.R.",
          "credit": "Photograph by Francis Bruguière, Theatre Guild production of R.U.R., Act I (published 1923). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's only full-length ballet, Die Geschöpfe des Prometheus (1801), sets the creation myth to music. Its story: Prometheus fashions two clay figures, kindles them into living, feeling beings, and—when they stand bewildered and untutored—leads them to Apollo and the Muses to be schooled in music, poetry, and dance, so that raw new minds might be filled with the arts. The famous overture bursts open with a hammered dissonant chord and a rushing Allegro, the sound of something switched suddenly into life; its closing finale later furnished the theme Beethoven reused in the Eroica. It is a score about a maker who does not hoard his creatures but opens the whole inheritance of human culture to them. That is the generous half of Thinking Machines' gesture rendered as music—the moment a fabricated intelligence is not merely switched on but handed the tools to grow and be shaped to a thousand purposes. Composed by an artist who prized Enlightenment self-improvement, the ballet frames the made mind not as a threat to be caged but as a pupil to be educated and then set loose among the many.",
        "excerpt": "A shattering dissonant chord flings the overture open, then a breathless Allegro rushes forward like a creature startled into motion. Across the ballet's numbers, harp and winds writhe and dance as Prometheus's clay-born beings are woken and led to the gods of art to be taught. It is music of animation and instruction—an intelligence not just sparked to life but handed the whole apprenticeship of culture.",
        "source": "Ludwig van Beethoven, Die Geschöpfe des Prometheus (The Creatures of Prometheus), Op. 43 (1801); IMSLP.",
        "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/thinking-machines-open-model--a4.png",
          "alt": "Portrait of Ludwig van Beethoven holding a manuscript",
          "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven (1820). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "On the Sistine ceiling Michelangelo painted the instant a mind is given. God, borne on a billowing cloak, surges toward a languid, newly formed Adam and reaches out; their fingers do not quite touch, and across that charged, unclosed gap the spark of life and intellect is about to leap. Interpreters have long noted that the shape enfolding the Creator resembles a human brain—as if the very seat of thought were the vehicle of creation. The image distills the whole drama now playing out in AI: a maker imparting consciousness to something fashioned in his own likeness, the decisive current passing in the space between two hands. Thinking Machines' release inverts the roles—here it is human engineers who assume the creating position, breathing capability into an artificial mind and then, rather than clutching it close, publishing it to the world. The unbridged gap between the fingertips becomes the perfect emblem for open weights: the maker sets the spark loose and lets go, trusting the made thing to receive it and carry on. Creation, once completed, no longer belongs solely to the creator.",
        "excerpt": "A robed Creator, swept forward on a wind-filled mantle shaped like a human brain, stretches his arm toward a reclining Adam whose own hand rises to meet it. Between the two fingertips lies a small, electric gap—the current of life and mind suspended at the very moment before contact. The whole fresco balances on that unbridged interval, the maker's spark poised to pass into the thing he has formed.",
        "source": "Michelangelo, The Creation of Adam (c. 1511), Sistine Chapel ceiling, Vatican; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg",
        "image": {
          "src": "/covers/thinking-machines-open-model--a5.png",
          "alt": "God reaching toward Adam, their fingers nearly touching",
          "credit": "Michelangelo, The Creation of Adam (c. 1511). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "eli-lilly-atai-psychedelic",
    "headline": "Eli Lilly nears a deal to buy the psychedelic drugmaker AtaiBeckley, pushing into treatments for depression",
    "overview": "Eli Lilly is in advanced talks to acquire AtaiBeckley, a developer of psychedelic-based medicines for hard-to-treat mental illness, according to Bloomberg News, sending the smaller company's shares sharply higher. The deal would be a major pharmaceutical bet on psychedelics such as psilocybin as therapies for depression and other disorders, a field that has moved from the fringes toward mainstream clinical development. For Lilly, buoyed by its blockbuster obesity drugs, the move would broaden its reach into neuroscience.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi3gFBVV95cUxQUkdBem1IX3AtekZzbllhUEZyTU9HQU1RY1AxRF9ZSnNoNlAybXNmcnFnTDZ3X3RJWDQ4bXNlNERLeWlUNy02dFNfQl9BbXBKZmRHVXRpdi1oMXltUF9qNVB2NEQ0WDJJbmdXSDJ6WGJDUzR2c0t6MDVycnhKOWRCckwySkc1SjN6d1FZNWpzZW5nSnRHRWl4M3dtaXNMeGN1d0RuMVJsTjR1R25EYWhsbmR5Rk9ndzdhTzJuVzN4QUg2SFR5cDZPbUxDVHhjVmhWaDlaTGI0Z1NwTUhGTlE?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxNd1NEbmhORl9JUHljTHlqdHRhbGl0MUNfM3k3b0ZSbThGekZ5TTlvN1k2dVZvY3JncnlEQ0UyWVJIQUN5eVNmRUZFTHhJSEE1a2Q4enRzeVBlNmhfS2h3bmtSRDk3eE5FVXdGdXcwQ3hSd2g0cE1ZYVl6Mkwydm5ycXA0NGJwcV9TQi1Sd1RNNHgwRWZGRk1VZGY3V0JheEpWWkQ0YkRENGFveTFMc1Uwb1dB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/eli-lilly-atai-psychedelic.png",
      "alt": "Psilocybin mushrooms, the source of a psychedelic compound studied as a treatment for depression.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "At Eleusis, for nearly two thousand years, initiates fasted, walked the sacred road from Athens, and drank the kykeon, a barley-and-water potion that many scholars believe carried a psychoactive agent, perhaps an alkaloid of the ergot fungus that grows on grain, the same fungus from which LSD would later be synthesized. In the darkened Telesterion they beheld visions that, the ancients insisted, cured the initiate's dread of death and returned him to daily life consoled and remade. Pindar, Cicero, and Sophocles all testified that the Mysteries made mortals happier, gentler, and unafraid. The Great Eleusinian Relief shows Demeter and Persephone, goddesses of grief and return, entrusting the boy Triptolemos with the gift of grain, the descent into sorrow answered by rebirth. Eli Lilly's pursuit of AtaiBeckley and its psilocybin therapies reaches back toward exactly this idea: that a carefully administered mind-altering substance, taken within a supportive ritual frame, can heal the wounded psyche and dissolve despair. What Eleusis governed with priesthoods and secrecy, a modern pharmaceutical giant now proposes to govern with clinical trials and dosing protocols, the ancient sacrament rebuilt as regulated medicine.",
        "excerpt": "The marble shows Demeter presenting sheaves of grain to the youth Triptolemos while Persephone, returned from the underworld, lays a hand on his head in blessing. Grief and rebirth stand on either side of the mortal initiate. The Mysteries celebrated here promised that those who drank the kykeon and beheld the sacred vision would face death without fear.",
        "source": "Great Eleusinian Relief, Pentelic marble votive relief, c. 440-430 BCE, National Archaeological Museum, Athens (NAMA 126); via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Great_Eleusinian_Relief.jpg",
        "image": {
          "src": "/covers/eli-lilly-atai-psychedelic--a0.png",
          "alt": "Marble relief of Demeter, Triptolemos, and Persephone from Eleusis",
          "credit": "Great Eleusinian Relief, c. 440-430 BCE, National Archaeological Museum, Athens. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The idea that a great drug company might turn a hallucinogen into psychiatric medicine has a startling precedent. In 1938 the Swiss chemist Albert Hofmann, working at the pharmaceutical firm Sandoz on derivatives of ergot, the very grain-fungus long linked to Eleusis, synthesized LSD-25; five years later an accidental dose sent him on the first deliberate psychedelic journey, pedaling home through Basel amid shimmering, terrifying visions. Sandoz was undaunted: it marketed LSD as Delysid and shipped it to psychiatrists worldwide, who through the 1950s used it to treat depression, alcoholism, and the anguish of the dying. Then the cultural panic of the 1960s drove the whole field underground, and a promising medicine became a forbidden drug for half a century. Eli Lilly's advanced talks to buy AtaiBeckley mark the closing of that long parenthesis: the psychedelic returning from the fringe to the corporate laboratory, only now armored with placebo-controlled trials and regulators' cautious blessing. History rhymes, a mind-altering molecule born in a drug company's ergot research, lost to fear, and reclaimed by another giant convinced it can lift the weight of melancholy.",
        "excerpt": "The plate shows rye stalks crowned with the dark, spur-like sclerotia of ergot, the grain fungus whose alkaloids Albert Hofmann was studying at Sandoz when he first synthesized LSD. From this humble poison of the harvest came both the medieval scourge of St. Anthony's Fire and, centuries later, a molecule that psychiatrists briefly hailed as a cure for despair.",
        "source": "Franz Eugen Köhler, 'Secale cornutum' (ergot, Claviceps purpurea), Köhler's Medizinal-Pflanzen, 1897; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Claviceps_purpurea_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-185.jpg",
        "image": {
          "src": "/covers/eli-lilly-atai-psychedelic--a1.png",
          "alt": "Botanical illustration of ergot fungus on rye",
          "credit": "Franz Eugen Köhler, Köhler's Medizinal-Pflanzen, 1897. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book IV of the Odyssey, Telemachus comes to Sparta grieving for his lost father, and the feast dissolves into weeping until Helen quietly acts. Into the wine bowl she casts nepenthe, a drug that banishes all care and sorrow so that whoever drinks it cannot shed a tear that day, a pharmakon she had learned in Egypt, land of many potent herbs. At once the grief lifts; the mourners can speak of Troy without tears. Homer's nepenthe is Western literature's first antidepressant: a measured dose that reaches past reason to quiet the ache of the mind. The scene captures both the promise and the unease surrounding Eli Lilly's move into psychedelic medicine. Here is the old dream of a substance that can dissolve sorrow on command, yet Homer notes it comes from a foreign, half-magical pharmacology, administered by a knowing hand, a reminder that such power to edit human feeling has always felt marvelous and slightly dangerous. As psilocybin travels from Mesoamerican and Amazonian ritual into Lilly's clinical pipeline, it retraces Helen's gesture: the exotic remedy, carefully dosed, poured into the cup to make grief bearable.",
        "excerpt": "She drugged the wine with an herb that banishes all care, sorrow, and ill humour. Whoever drinks wine thus drugged cannot shed a single tear all the rest of the day, not even though his father and mother both of them drop down dead, or he sees a brother or a son hewn in pieces before his very eyes.",
        "source": "Homer, The Odyssey, Book IV, trans. Samuel Butler (1900); Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/1727",
        "image": {
          "src": "/covers/eli-lilly-atai-psychedelic--a2.png",
          "alt": "Circe holding out an enchanted cup to Odysseus",
          "credit": "John William Waterhouse, Circe Offering the Cup to Ulysses, 1891. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Coleridge said that 'Kubla Khan' came to him in 1797 during an opium reverie: dozing over a book about the Khan's summer palace, he woke believing he had composed two or three hundred lines whole in his sleep, only to lose most of them when a visitor from Porlock interrupted him, leaving the poem a celebrated fragment. It stands as the supreme English monument to the visionary, drug-touched imagination, a sacred river, caverns measureless to man, a sunless sea, a pleasure-dome conjured in the air, and a poet who on honey-dew hath fed and drank the milk of Paradise. Intoxication is here transmuted into art, the altered state imagined as a doorway to a paradise ordinarily sealed. Eli Lilly's wager on psilocybin rests on a clinically sober version of Coleridge's Romantic intuition: that a chemically opened state of consciousness can reveal something healing and otherwise inaccessible to the ordinary mind. Where Coleridge mourned his vision's fragility, forever broken by interruption, today's researchers hope to capture and reproduce the therapeutic experience under controlled conditions, turning fleeting reverie into a repeatable medicine for the depressed and the despairing.",
        "excerpt": "In Xanadu did Kubla Khan / A stately pleasure-dome decree: / Where Alph, the sacred river, ran / Through caverns measureless to man / Down to a sunless sea. ... For he on honey-dew hath fed, / And drank the milk of Paradise.",
        "source": "Samuel Taylor Coleridge, 'Kubla Khan: Or, A Vision in a Dream. A Fragment,' first published 1816; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Christabel;_Kubla_Khan;_The_Pains_of_Sleep_(1816)/Kubla_Khan",
        "image": {
          "src": "/covers/eli-lilly-atai-psychedelic--a3.png",
          "alt": "Page from the 1816 first edition of Coleridge's Kubla Khan",
          "credit": "Kubla Khan, first edition (John Murray, 1816). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In 1830 the young Hector Berlioz poured his lovesick obsession into the Symphonie fantastique, subtitled 'Episode in the Life of an Artist,' whose program describes a musician who, in despair over a hopeless love, poisons himself with opium. The dose is too weak to kill but plunges him into a chain of feverish visions: the beloved appears as a recurring melody, an idee fixe, haunting a ball, a pastoral field, and finally a grotesque witches' sabbath where she returns as a leering hag. Berlioz built the drugged hallucination into a whole symphonic architecture, one of music's first and greatest depictions of an altered, chemically induced state of mind, and of melancholy curdling into nightmare. The work speaks directly to Eli Lilly's psychedelic venture, for it stages the double face of mind-altering substances: the same drug that opens visionary splendor can also open terror. Modern psilocybin therapy takes this ambivalence seriously, surrounding the experience with guides and careful preparation precisely because the journey through the altered mind, as Berlioz knew, can pass through paradise and hell alike on its way toward transformation.",
        "excerpt": "The strings whisper and surge as a single melody, the idee fixe, recurs obsessively across all five movements, the beloved made into a fixed idea the drugged mind cannot escape. In the final movement, tolling bells, a snarling parody of the Dies irae, and a whirling fugue conjure a witches' sabbath of grotesque splendor. It is orchestral hallucination: reverie, procession, and nightmare rendered in sound.",
        "source": "Hector Berlioz, Symphonie fantastique, Op. 14 (H. 48), 1830; full score at IMSLP. Portrait: August Prinzhofer, 1845.",
        "href": "https://imslp.org/wiki/Symphonie_fantastique,_H_48_(Berlioz,_Hector)",
        "image": {
          "src": "/covers/eli-lilly-atai-psychedelic--a4.png",
          "alt": "Portrait of the composer Hector Berlioz",
          "credit": "August Prinzhofer, portrait of Hector Berlioz, 1845. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Albrecht Durer's 1514 engraving Melencolia I is the most famous image of the melancholic condition in Western art: a brooding winged genius sits amid the scattered instruments of knowledge, compass, scales, hourglass, magic square, a gnawing dog, a truncated polyhedron, unable to act, sunk in the heavy, saturnine gloom that Renaissance physicians linked to black bile and to creative genius alike. Her gaze is fixed on nothing; the tools of measurement and making lie idle. For centuries melancholy was understood as both an affliction and, paradoxically, the shadow-side of brilliance, a humor to be balanced by diet, music, herbs, and hellebore. Eli Lilly's acquisition of AtaiBeckley aims at precisely this ancient enemy under its modern name, depression, and at the treatment-resistant darkness that has defied conventional antidepressants. Durer's winged figure, immobilized by the weight of her own mind, is the emblem of everyone the new psychedelic medicines hope to reach, those for whom melancholy has hardened into paralysis. Where the Renaissance offered hellebore and the harmony of the spheres, a pharmaceutical giant now offers psilocybin, the latest remedy in humanity's long campaign to lift the black bile and set the frozen mind in motion again.",
        "excerpt": "A winged personification of Melancholy slumps with head on fist, a compass idle in her hand, encircled by the unused tools of geometry and craft. A bat-like creature unfurls a banner reading 'MELENCOLIA I'; a magic square, hourglass, bell, and emaciated hound complete the emblem of genius paralyzed by its own dark humor. Light from a comet and a rainbow falls over a becalmed sea.",
        "source": "Albrecht Durer, Melencolia I, engraving, 1514; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Melencolia_I_(Durero).jpg",
        "image": {
          "src": "/covers/eli-lilly-atai-psychedelic--a5.png",
          "alt": "Durer's engraving of a brooding winged figure surrounded by idle tools",
          "credit": "Albrecht Durer, Melencolia I, engraving, 1514. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "dr-congo-new-monkey-species",
    "headline": "Scientists identify a new monkey species with orange lips in Congo's Lomami National Park",
    "overview": "An international team has confirmed a previously unknown monkey species — a black-furred primate with distinctive pinkish-orange lips known locally as 'Likweli' — hidden in the forest canopy of Lomami National Park in central Democratic Republic of Congo. Conservationists first glimpsed the animal in 2008 but captured only a single blurry photograph; a second sighting a decade later prompted a search using audio recordings, photography and genetic analysis. It is only the fifth African monkey species to be described in the past 75 years.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c15y5wgj4x8o"
      },
      {
        "name": "The New York Times",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOWFRNWkV3czZlajgtRjFKa2VXVVlveXhMa2V5VGxQNHBCM2d3c0Q0QjliWWN1amxoRTgtcXdTMEg1TUh5SkNoZk1WamE1U2tiODhjRlY3TFBWemVFTkJYOTdYb2hJdkRSdEtCQWtQOUdvSFk4MHg2V21rQkk3V29BaW1Ka2NqaTM2WjIyOFZWVnpPX3I5TDljQ200aFpFeGQ0MzJQazl3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/dr-congo-new-monkey-species.png",
      "alt": "A black-furred monkey with pinkish-orange lips perched in a forest canopy.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Pliny the Elder assembled his Natural History around 77 CE, he was attempting what the Lomami team has now done in the canopy of central Congo: gathering the world's creatures into a single catalogue and trying to fix each in words. Pliny's Book VIII marches through the beasts of the known world — elephants, lions, apes distinguished by their tails — and repeatedly gestures toward the edges of the map, where the forests and rivers of Africa were rumored to breed forms no Roman had seen. He preserved the Greek proverb that Africa is forever generating novelty, a line that could caption the black-furred, orange-lipped Likweli monkey, glimpsed in 2008 and only lately pinned down by genetics as the fifth new African monkey named in seventy-five years. Pliny's method — half wonder, half filing system — captures the double impulse behind every species description: to marvel at a strange animal and, in the same breath, to name and shelve it. Two thousand years later the deep forest still answers the naturalist's proverb, handing science one more creature it never knew it was missing.",
        "excerpt": "There are consequently many varieties of hybrids in that country, either violence or lust mating the males with the females of each species indiscriminately. This is indeed the origin of the common saying of Greece that Africa is always producing some novelty.",
        "source": "Pliny the Elder, The Natural History, Book VIII, ch. 17 (Bostock & Riley translation), c. 77 CE. Text via Attalus.org.",
        "href": "https://www.attalus.org/pliny/hn8a.html",
        "image": {
          "src": "/covers/dr-congo-new-monkey-species--a0.png",
          "alt": "Roman Nile mosaic of Palestrina showing exotic African animals",
          "credit": "Nile Mosaic of Palestrina (Roman, c. 100 BCE), Palazzo Barberini; photo Camelia Boban, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In 1861 the Franco-American explorer Paul Du Chaillu returned from the equatorial forests of what is now Gabon and the Congo basin with skins, skulls, and a sensational claim: the gorilla, long spoken of by local peoples and dismissed in Europe as travelers' myth, was real. His Explorations and Adventures in Equatorial Africa made the great ape a scientific fact and a public marvel, though Du Chaillu's showmanship also drew accusations of exaggeration — the familiar fate of the naturalist who reports a creature no colleague has seen. The parallel to the Likweli is close and pointed. Like the gorilla, the new Lomami monkey was known to the forest's inhabitants long before it entered a journal; its very name is the local one. Both stories turn on the same lag between indigenous knowledge and Western confirmation, and on the same figure — the explorer-naturalist pushing into humid, roadless canopy to bring back proof. Du Chaillu's account, breathless and self-dramatizing, records the shock of meeting an animal at the very limit of the known, the moment when rumor hardens, through specimen and description, into an accepted species.",
        "excerpt": "Suddenly I was startled by a strange, discordant, half human, devilish cry, and beheld four young and half-grown gorillas running towards the deep forest. I was not ready. We fired, but hit nothing.",
        "source": "Paul B. Du Chaillu, Stories of the Gorilla Country (1868), Chapter VII. Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/52444",
        "image": {
          "src": "/covers/dr-congo-new-monkey-species--a1.png",
          "alt": "1861 engraving of Paul Du Chaillu confronting a gorilla in the forest",
          "credit": "'My first gorilla,' engraving from Du Chaillu, Explorations and Adventures in Equatorial Africa (1861); Bayerische Staatsbibliothek, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Milton's Paradise Lost gives the act of naming animals its grandest literary staging. In Book VIII, Adam recalls how God paraded every bird and beast before him in Eden, and how he named each one and grasped its nature in the same instant — naming as an act of understanding, the first taxonomy. The scene idealizes exactly what the Lomami scientists performed in prose and gene sequence: to confer a name is to claim knowledge of a creature and to grant it a place in an ordered world. The Likweli, of course, already had a name — the one its human neighbors use — so the confirmation was less an Adamic first naming than a second, bureaucratic christening in Latin binomial. Milton's Adam names with instant, God-given comprehension; modern zoologists reach the same certainty only slowly, through years of observation, tissue samples, and cladistic argument. Yet the underlying gesture is identical and very old: a human being stands before an unfamiliar animal and, by fixing a word to it, folds the wild and unrecorded into the catalogue of the known. Milton reminds us how ancient, and how charged, that small act of naming remains.",
        "excerpt": "As thus he spake, each Bird and Beast behold / Approaching two and two, These cowring low / With blandishment, each Bird stoop'd on his wing. / I nam'd them, as they pass'd, and understood / Thir Nature, with such knowledg God endu'd / My sudden apprehension",
        "source": "John Milton, Paradise Lost, Book VIII, lines 349–354 (1674). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Paradise_Lost_(1674)/Book_VIII",
        "image": {
          "src": "/covers/dr-congo-new-monkey-species--a2.png",
          "alt": "William Blake painting of Adam naming the beasts",
          "credit": "William Blake, Adam Naming the Beasts (c. 1810), Pollok House, Glasgow; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Arthur Conan Doyle's 1912 romance The Lost World sends Professor Challenger and his companions to a remote South American plateau where creatures presumed long extinct still live — a fantasy of the deep interior withholding its secrets from science. Challenger's defiant lecture insists that the improbable survives out of sight, waiting for anyone with the nerve to seek it. The novel dramatizes the very hope that keeps field biologists slogging through places like Lomami: that the planet is not yet fully inventoried, that a genuinely unknown vertebrate might still be hiding in plain sight. The Likweli is the sober, real-world version of Doyle's fever dream. No dinosaurs — just a black monkey with startling pinkish-orange lips, high in a Congo canopy, unrecorded by science until 2008 and confirmed only by DNA. Where Doyle imagines a walled-off Jurassic enclave, the truth is quieter and stranger: an ordinary-looking primate, part of a living community the local people knew all along, that had simply never been described. Both fiction and fact rest on the same thrilling premise — that the map of life still has blank spaces, and that the forest keeps what it is not asked about.",
        "excerpt": "Creatures which were supposed to be Jurassic, monsters who would hunt down and devour our largest and fiercest mammals, still exist.",
        "source": "Arthur Conan Doyle, The Lost World (1912), Challenger's lecture. Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/139",
        "image": {
          "src": "/covers/dr-congo-new-monkey-species--a3.png",
          "alt": "1912 illustration of the hidden plateau from The Lost World",
          "credit": "'General view of plateau from top of gingho tree,' illustration from The Lost World (1912); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns composed Le carnaval des animaux in 1886 as a private musical joke, a suite of fourteen movements that sketches a menagerie in sound — the lion's regal march, the elephant's lumbering double bass, the darting fish of the aquarium, the hush of the dying swan. It is a portrait gallery of creatures, each given its own unmistakable voice and, in effect, its own name in music, which makes it a fitting companion to the naming of the Likweli. Where the zoologist fixes a species with a Latin binomial and a type specimen, Saint-Saëns fixes each animal with a melodic signature, distilling its essence into a phrase you cannot mistake for any other. Both are acts of characterization: the attempt to capture, and hold, the particular life of a single kind of animal. One imagines what movement the new Congo monkey might inspire — something for the high canopy, a flash of orange against black fur, a shy figure that darts and vanishes. The Carnival reminds us that cataloguing nature is not only science's labor but art's, and that delight is a legitimate response to the discovery of a new creature.",
        "excerpt": "Saint-Saëns's suite moves animal by animal, handing each its own instrument and gesture: the royal lion, braying donkeys, a cuckoo calling from deep in the woods, and the famous cello solo of the swan. Composed for a small ensemble as a carnival amusement, it treats the portrayal of creatures as pure play. The movement 'Le coucou au fond des bois' — the cuckoo in the depths of the woods — in particular evokes the same hidden-forest listening that turned up the Likweli: a single voice sounding from an unseen source in the trees.",
        "source": "Camille Saint-Saëns, Le carnaval des animaux (grande fantaisie zoologique), composed 1886. Scores at IMSLP.",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/dr-congo-new-monkey-species--a4.png",
          "alt": "Portrait of composer Camille Saint-Saëns",
          "credit": "Camille Saint-Saëns, portrait from Musical Memories (1919); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Henri Rousseau never left France, yet he painted some of the most indelible jungles in Western art, stitched together from visits to Paris's botanical gardens, illustrated magazines, and pure imagination. The Merry Jesters (1906) sets a band of bearded monkeys amid a dense, glowing tangle of oversized leaves and blossoms, half-hidden, peering out at the viewer with an air of mischief and secrecy. Rousseau's canopy is a European daydream of the tropical deep forest — the same imaginative space that, in reality, holds Lomami and its unrecorded animals. The painting's poignancy, set beside the Likweli's discovery, lies in the gap it exposes: Rousseau conjured fantastical monkeys from a Paris hothouse while the real Congo forest quietly harbored a genuinely unknown one, black-furred and orange-lipped, that no artist or scientist had drawn. His monkeys hide among the foliage exactly as the Likweli hid from science for generations — seen daily by the people who named it, invisible to everyone else. Rousseau's jungle, dreamed rather than observed, becomes an unintended emblem of how much the actual forest still concealed, and of how strange and specific the truth turned out to be.",
        "excerpt": "In The Merry Jesters, a group of shaggy monkeys crouch and clamber in a wall of tropical foliage, one grasping an overturned bottle, another a curious stick, their faces alert as if surprised mid-play. Rousseau builds the scene from layered, flattened greens punctuated by exotic blooms, a jungle at once lush and dreamlike. The animals seem to belong to the foliage itself, emerging from it and dissolving back — an image of creatures the forest keeps until they choose to show themselves.",
        "source": "Henri Rousseau, The Merry Jesters (Joyeux farceurs), 1906, oil on canvas, Philadelphia Museum of Art. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Henri_Rousseau_-_The_Merry_Jesters.jpg",
        "image": {
          "src": "/covers/dr-congo-new-monkey-species--a5.png",
          "alt": "Henri Rousseau painting of monkeys in a jungle",
          "credit": "Henri Rousseau, The Merry Jesters (1906), Philadelphia Museum of Art; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "hong-kong-bookshops-raid",
    "headline": "Hong Kong police raid independent bookshops and arrest five over 'seditious' publications",
    "overview": "Hong Kong national security police raided independent bookshops and arrested five people — two men aged 37 and 57 and three women aged 30 to 59 — accusing them of selling publications that incited 'hatred' against the territory's government, judiciary and police. Officers seized books and are holding the group on suspicion of 'acting with seditious intent'; if convicted they could face up to seven years in prison. Reporters saw a woman led in handcuffs from Have A Nice Stay, a Mong Kok shop opened in 2022 by former journalists that stocked works on democracy and media literacy.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cq61660qpdpo"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQZFMwU1NCM05nUjJVeEpLcHU0ZTdrMFVPUFhUYjdWN1Jicld1a1JPMVd0d1dJeXIySEs0eHZ4V3BybVM0WS1tRU5IbXBrQTZZU21Md3Jkd0gtSl9BRmsxUjViM3hRVDlYSERwaS1jODFOTURKSU9BejdiTW54aGdKXzBqNGwxSjlmMzJiRFE0dE9qREE4QW4wZm5hUXRTVllpTC1Z?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/hong-kong-bookshops-raid.png",
      "alt": "Police officers load confiscated boxes into a van outside a Hong Kong shopfront.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 213 BCE the First Emperor of a newly unified China, advised by his Legalist chancellor Li Si, decreed the destruction of the empire's books. Histories that did not flatter the Qin, the Confucian Odes and Documents, and the writings of rival schools were to be surrendered and burned; those who dared discuss the forbidden classics could be executed, and scholars who clung to them were branded and sent to labour on the Great Wall. The purpose was to blot out the claims of antiquity so that the past could not be used to criticise the ruling monarch. The canon survived only because scholars concealed the tablets at mortal risk, guardians of forbidden knowledge much like the Hong Kong booksellers now accused of 'seditious intent.' The principle is identical: a state so frightened of the printed word that it treats books on democracy and media literacy as weapons, seizes them from shops opened by former journalists, and jails those who sell them. Twenty-two centuries apart, the same instinct recurs, that whoever controls what may be read controls what may be thought, and that the surest way to silence dissent is to burn or confiscate the page.",
        "excerpt": "All existing literature was to be destroyed, with the exception only of works relating to agriculture, medicine, and divination; and a penalty of branding and four years' work on the Great Wall, then in process of building, was enacted against all who refused to surrender their books for destruction. This plan was carried out with considerable vigour. Many valuable works perished; and the Confucian Canon would have been irretrievably lost but for the devotion of scholars, who at considerable risk concealed the tablets by which they set such store, and thus made possible the discoveries of the following century and the restoration of the sacred text.",
        "source": "Herbert A. Giles, 'A History of Chinese Literature' (D. Appleton, 1901), ch. 'The \"First Emperor\" — The Burning of the Books.' Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/43711",
        "image": {
          "src": "/covers/hong-kong-bookshops-raid--a0.png",
          "alt": "18th-century Chinese album leaf depicting the Qin burning of books and burial of scholars",
          "credit": "Anonymous 18th-century Chinese album leaf, Bibliothèque nationale de France; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On the night of 10 May 1933, in Berlin's Opernplatz and in university towns across Germany, Nazi student unions hurled tens of thousands of 'un-German' books onto bonfires while Joseph Goebbels presided. Works by Jewish, Marxist, pacifist and liberal authors, by Freud, Marx, Remarque, Brecht and Heine, were consigned to the flames in a choreographed 'action against the un-German spirit.' The state did not merely disapprove of these ideas; it defined them as contamination to be purged from libraries and bookshops, exactly the logic by which Hong Kong's national security police now brand publications 'seditious,' seize them, and arrest the people who stock them. The confiscation of a book is a declaration that certain thoughts are crimes. The 1933 fires also fulfilled, with terrible precision, a warning written more than a century earlier by one of the very authors whose works fed them. What the raids on independent Hong Kong bookshops share with that night is the conviction that a regime's security depends on controlling the printed word, and that a display of seizure and punishment is meant less to destroy every copy than to teach a whole reading public what it may no longer keep.",
        "excerpt": "A member of the SA hurls a confiscated volume onto the pyre as tens of thousands of books blaze in the Berlin night. The crowd raises arms in salute; the flames light banners and uniforms. It is one of the twentieth century's defining images of a state that believed it could incinerate ideas by incinerating the paper that carried them.",
        "source": "'Book burning, Berlin, 10 May 1933,' photograph, unknown author; United States Holocaust Memorial Museum, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:1933-may-10-berlin-book-burning.JPG",
        "image": {
          "src": "/covers/hong-kong-bookshops-raid--a1.png",
          "alt": "An SA man throws confiscated books into the fire during the Berlin book burning, 10 May 1933",
          "credit": "Unknown photographer, 1933; United States Holocaust Memorial Museum; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ray Bradbury's 1953 novel 'Fahrenheit 451' imagines a future in which 'firemen' no longer put out fires but start them, arriving to burn the houses of anyone caught hiding books. Its hero, the fireman Guy Montag, gradually awakens to the emptiness of a society that has outlawed reading to keep its citizens tranquil and unoffended, and joins a hidden community of 'book people' who each memorise a banned text to keep it alive. Bradbury's regime justifies the burning not as tyranny but as protection, insisting that books breed discontent and give offence, an argument uncannily close to the Hong Kong charge that certain publications 'incited hatred' against the government, judiciary and police. The novel turns the bookshop's opposite, the fire crew, into an arm of the state, just as the raids turn the reader and seller into suspects. Against them Bradbury sets the memorisers in the woods, the same figures as the Hong Kong shopkeepers, former journalists stocking works on democracy and media literacy: ordinary custodians who understand that when a state fears the page, the act of simply preserving and passing on what has been written becomes a form of resistance.",
        "excerpt": "Bradbury pictures a comfortable, screen-lit society that has decided books are dangerous because they make people think and feel out of step, and so pays uniformed men to burn them. His counter-image is quietly devastating: exiles by a river, each carrying an entire forbidden book in memory, keeping literature alive one human vessel at a time until the world is ready for it again.",
        "source": "Ray Bradbury, 'Fahrenheit 451' (Ballantine Books, 1953).",
        "href": "https://archive.org/details/fahrenheit4510000rayb_l1j1",
        "image": {
          "src": "/covers/hong-kong-bookshops-raid--a2.png",
          "alt": "Ray Bradbury, author of Fahrenheit 451, photographed in 1975",
          "credit": "Photo by Alan Light, 1975; CC BY 2.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Heinrich Heine's early tragedy 'Almansor,' written in 1821, is set in Granada after the Christian reconquest of Spain, as the victors force the Moors to convert and consign the Quran to the flames in the public square. When a character reports that the holy book has been burned, Almansor's servant Hassan answers with a line that has since become one of literature's darkest prophecies, that the burning of books is only an overture to the burning of people. The words proved grimly literal: in 1933 Heine's own writings were among those thrown onto the Nazi pyres, and the sentence is now engraved at the Berlin memorial to that night. For the Hong Kong raids, Hassan's warning names the stakes precisely. The state has not stopped at seizing 'seditious' volumes from the shelves; it has arrested five people and threatens them with up to seven years in prison. Heine's line insists that these are not two separate acts but one continuous logic, that a power willing to criminalise the printed word is already on the path from confiscating pages to caging the human beings who wrote, printed, sold and read them.",
        "excerpt": "\"Das war ein Vorspiel nur, dort wo man Bücher / Verbrennt, verbrennt man auch am Ende Menschen.\" — spoken by Hassan. (\"That was but a prelude; where they burn books, they will in the end also burn people.\")",
        "source": "Heinrich Heine, 'Almansor. Eine Tragödie' (written 1821, published 1823), lines spoken by Hassan. German Wikisource.",
        "href": "https://de.wikisource.org/wiki/Almansor_(Heine)",
        "image": {
          "src": "/covers/hong-kong-bookshops-raid--a3.png",
          "alt": "Heinrich Heine, portrait by Moritz Daniel Oppenheim, 1831",
          "credit": "Moritz Daniel Oppenheim, 1831; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The most famous number in Giuseppe Verdi's 1842 opera 'Nabucco' is the Act III chorus 'Va, pensiero, sull'ali dorate,' sung by the Hebrew slaves in Babylonian captivity as they mourn the homeland taken from them, 'so beautiful and lost.' Set to a broad, hymn-like melody sung almost entirely in unison, it gives collective voice to a people forbidden their freedom, and under Austrian rule in the Italian peninsula audiences heard in it their own subjugation, so that the chorus became a covert anthem of the Risorgimento. That is its resonance with the Hong Kong bookshop raids: it is the sound of a silenced community singing what it can no longer say openly, art carrying dissent past the censors precisely because a melody is harder to confiscate than a printed page. The independent shops stocking works on democracy and media literacy performed the same function, keeping a suppressed conversation alive; the arrests are an attempt to still that chorus. Verdi's slaves, remembering by the waters of Babylon a freedom they are not permitted to name, stand for every reading public taught that its own history and hopes have become contraband, and who therefore learn to smuggle them inside song.",
        "excerpt": "Low and sustained, the voices rise together over a rocking accompaniment, a whole people singing as one of the golden wings of thought flying back to a lost homeland. Verdi withholds harmony until the melody has become a shared act of remembrance; the effect is less an aria than a congregation, an oppressed community turning grief into a quiet, unquenchable assertion of who they still are.",
        "source": "Giuseppe Verdi, 'Nabucco' (1842), libretto by Temistocle Solera; Act III chorus 'Va, pensiero, sull'ali dorate.' IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/hong-kong-bookshops-raid--a4.png",
          "alt": "Giuseppe Verdi, composer of Nabucco, portrait by Giovanni Boldini, 1886",
          "credit": "Giovanni Boldini, 1886; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pedro Berruguete's panel 'Saint Dominic and the Albigenses' (c. 1493–99), painted for the Dominican convent of Santo Tomás in Ávila under the shadow of Torquemada's newly established Spanish Inquisition, depicts a medieval trial by fire. Books of the Cathar (Albigensian) heretics and a volume of Dominican orthodoxy have been thrown together onto a fire to let the flames judge which doctrine is true; in the painting the heretical books burn while the 'correct' book miraculously leaps up out of the blaze unharmed. Beneath its pious surface the image is a manifesto for institutional censorship: it dramatises the claim that a governing authority may consign rival ideas to the fire and call the result divine justice. That is exactly the posture of the Hong Kong national security police who seize 'seditious' publications and decide, by their own light, which books may circulate and which threaten the state. Berruguete makes the fire itself the arbiter of permitted thought, and casts those who hold the wrong books as heretics to be judged. Five centuries later, booksellers stocking works on democracy are cast in the same role, their inventory examined, condemned and carried away as evidence that reading the wrong thing is a punishable offence.",
        "excerpt": "Robed inquisitors sit enthroned above a small fire into which books have been cast; one volume rises impossibly from the flames while the others are devoured. Berruguete paints the scene with cool, ceremonial calm, presenting the incineration of forbidden writing not as violence but as orderly judgment, the machinery of orthodoxy deciding, in public and with authority, which words are permitted to survive.",
        "source": "Pedro Berruguete, 'Saint Dominic and the Albigenses' ('La prueba del fuego'), c. 1493–99, oil on panel, Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Pedro_Berruguete_-_St_Dominic_and_the_Albigenses_-_WGA02083.jpg",
        "image": {
          "src": "/covers/hong-kong-bookshops-raid--a5.png",
          "alt": "Books cast into the fire in Berruguete's Saint Dominic and the Albigenses",
          "credit": "Pedro Berruguete, c. 1495, Museo Nacional del Prado; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "china-detains-us-scientist",
    "headline": "China has detained U.S. seismologist Chen Youlin, an expert on North Korea's nuclear tests, since 2024, his family says",
    "overview": "China has held Chen Youlin, a 54-year-old American seismologist who specializes in using seismic data to track nuclear tests, since his arrest in Beijing in November 2024 during a family visit, according to relatives and a hostage-advocacy group that went public after seeing no sign of his release. His wife, also a seismologist, said his work was 'public and collaborative' and the allegations against him 'both wrong.' His research centered on North Korea, a close Chinese ally long sanctioned over its nuclear program; Beijing's foreign ministry said its authorities 'handle cases in accordance with the law.'",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cqx1xdn3g4eo"
      },
      {
        "name": "The Guardian",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNSUprOHVsMXpXSVc0VmFyelhiNXZMVWhhRDVCOThJYm9aODltejBFWExmbU1VZlVEZjdzU0ZBN3p5ZjUwUU1FRktPYlVGMjkxd0pGelUtX1dMdU1Wc0xwQVVnWG1xWXlHNUd2S3RsRmE0SEdDMWRnUzBRQ1JqZ3lERVBHbnZpUzFubUxR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/china-detains-us-scientist.png",
      "alt": "The detained American seismologist Chen Youlin, right, with his wife, also a seismologist.",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In fifth-century Athens, Anaxagoras of Clazomenae was the intellect who dared to read the sky as physics rather than divinity: the sun, he taught, was not a god but a mass of red-hot metal, and the moon a stony earth lit by borrowed fire. That empirical reading of the heavens made his knowledge dangerous. Diogenes Laertius records that he was indicted for impiety and, in a second account, for treasonable correspondence with Persia, the empire against which Athens defined itself, so that a natural philosopher became a pawn in the city's fear of foreign entanglement. Only the protection of his pupil Pericles softened the sentence; without it, death was decreed by default. The parallel to Chen Youlin is uncanny. Here too is a scientist who studied the physical world, not the sun's fire but the earth's tremors, and whose expertise touched the nerve of geopolitics, in his case the nuclear tremors of North Korea. Here too a scholar is entangled in the suspicion between rival powers, his knowledge itself construed as a kind of trespass, and he is held far from the patrons who might once have spoken for him.",
        "excerpt": "he was indicted by Cleon on a charge of impiety, because he declared the sun to be a mass of red-hot metal; that his pupil Pericles defended him, and he was fined five talents and banished. ... the charge one of treasonable correspondence with Persia as well as of impiety; and that sentence of death was passed on Anaxagoras by default.",
        "source": "Diogenes Laertius, Lives of Eminent Philosophers, Book II (Anaxagoras), trans. R. D. Hicks, Loeb Classical Library, 1925; Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0258%3Abook%3D2%3Achapter%3D3",
        "image": {
          "src": "/covers/china-detains-us-scientist--a0.png",
          "alt": "Etching portrait of the philosopher Anaxagoras",
          "credit": "Wellcome Collection, CC BY 4.0"
        }
      },
      {
        "category": "historical",
        "title": "In June 1633, the most celebrated natural philosopher in Europe knelt before the Roman Inquisition and, under threat of torture and worse, renounced the truth he had proven with his own instruments: that the earth moves. Galileo Galilei had trained a new tool, the telescope, on the heavens and reported what the state's theology could not permit. The tribunal did not dispute his competence; it disputed his right to know and to say. Forced to abjure, curse, and detest his findings, he passed his remaining years under house arrest, a mind confined by power that feared what that mind had seen. Chen Youlin inherits this predicament across four centuries. His instrument is the seismograph rather than the telescope, and the tremors he decoded rose from underground detonations rather than the orbits of Jupiter's moons, but the shape of the danger is the same. A scientist's specialized knowledge, precise and verifiable, becomes intolerable to a state that would rather it were unspoken. Where Galileo was made to recant in the open, Beijing offers no public trial at all, only the assurance that it acts in accordance with the law, and a scholar vanished from view.",
        "excerpt": "Therefore, desiring to remove from the minds of your Eminences, and of all faithful Christians, this vehement suspicion, justly conceived against me, with sincere heart and unfeigned faith I abjure, curse, and detest the aforesaid errors and heresies, and generally every other error, heresy, and sect whatsoever contrary to the said Holy Church...",
        "source": "Galileo Galilei, Abjuration, Rome, 22 June 1633; Famous Trials (Prof. Douglas O. Linder).",
        "href": "https://famous-trials.com/galileotrial/1020-recantation",
        "image": {
          "src": "/covers/china-detains-us-scientist--a1.png",
          "alt": "Galileo before the Holy Office of the Inquisition",
          "credit": "Joseph-Nicolas Robert-Fleury (c. 1847), public domain"
        }
      },
      {
        "category": "literary",
        "title": "Franz Kafka's unfinished novel Der Prozess opens with one of literature's most quietly terrifying sentences: Josef K. is arrested one ordinary morning without having done anything wrong, by an authority that never names his crime, never shows its evidence, and never grants him a comprehensible trial. Across the book he is shuttled through a labyrinth of offices and functionaries, told that his case proceeds while he is denied any charge he can answer, until the process itself becomes the punishment. Kafka, writing in 1914 and 1915 as the old empires slid toward catastrophe, captured the specific dread of the individual dissolved into a bureaucratic machine whose logic is opaque and whose verdict is foregone. For Chen Youlin, held in Beijing since November 2024 with no clear charge disclosed and no visible proceeding, the novel reads less like allegory than reportage. The seismologist who could parse the faint signature of a distant blast finds himself unable to read the case against him. In accordance with the law, the state says, and the phrase functions exactly as Kafka's Court does, invoking a legality whose workings the accused is never permitted to see.",
        "excerpt": "Jemand mußte Josef K. verleumdet haben, denn ohne daß er etwas Böses getan hätte, wurde er eines Morgens verhaftet.",
        "source": "Franz Kafka, Der Prozess, first published 1925; Project Gutenberg eBook No. 69327.",
        "href": "https://www.gutenberg.org/cache/epub/69327/pg69327-images.html",
        "image": {
          "src": "/covers/china-detains-us-scientist--a2.png",
          "alt": "Photographic portrait of Franz Kafka, c. 1906",
          "credit": "Atelier Jacobi (Sigismund Jacobi), c. 1906, public domain"
        }
      },
      {
        "category": "literary",
        "title": "Imprisoned in 1642 for petitioning Parliament on behalf of the king, the Cavalier poet Richard Lovelace wrote To Althea, from Prison, the most defiant lyric of confinement in English. From his cell he insists that walls and iron bars cannot cage a mind that remains inwardly free: love, loyalty, and the liberty of the soul make a hermitage of a dungeon. The poem is not a denial of captivity but a refusal to let captivity define the captive, the last freedom a prisoner keeps when the state has taken all the rest. Chen Youlin's family cannot know what sustains him through more than a year of detention, but Lovelace articulates the stake precisely. The seismologist is a man of exacting, patient attention, one who listens for meaning in faint signals, now placed where physical liberty is gone and only the interior life remains. The poem also names the accusation of divided loyalty that so often precedes such imprisonments: Lovelace was jailed as a suspected partisan of the wrong side, just as Chen, an American scholar seized during a family visit to the country of his birth, is caught between the claims of two states.",
        "excerpt": "Stone walls doe not a prison make, / Nor iron bars a cage; / Mindes innocent and quiet take / That for an hermitage; / If I have freedome in my love, / And in my soule am free, / Angels alone that sore above / Enjoy such liberty.",
        "source": "Richard Lovelace, \"To Althea, from Prison\" (written 1642; published in Lucasta, 1649); Wikisource.",
        "href": "https://en.wikisource.org/wiki/To_Althea,_from_Prison",
        "image": {
          "src": "/covers/china-detains-us-scientist--a3.png",
          "alt": "Portrait of the poet Richard Lovelace",
          "credit": "William Dobson (c. 1645), Dulwich Picture Gallery, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's only opera, Fidelio, is the supreme musical hymn to the political prisoner. Its hero Florestan has been secretly buried alive in a dungeon by a tyrant he dared to expose; the world believes him dead, and no charge or trial has ever been spoken. His wife Leonore disguises herself as a youth, Fidelio, and takes work in the prison to search cell by cell for the husband the state has erased. When she finally descends into the darkness and, pistol drawn, declares that she is his wife, the opera swells into one of music's great choruses of liberation as the prisoners stumble up into the light. Beethoven, revising the work obsessively between 1805 and 1814, poured into it his fiercest conviction: that unjust imprisonment is an offense against humanity itself. For the family and advocates of Chen Youlin, held incommunicado while the state offers only that it acts lawfully, Fidelio is almost unbearably apt, the loved one vanished into a cell without a public reckoning, and those outside refusing to accept the silence, going public as Leonore goes underground, insisting the prisoner be brought back into the light.",
        "excerpt": "In the climactic dungeon scene, Florestan lies chained in near-total darkness, sustained only by a vision of freedom, while Leonore, disguised as the boy Fidelio, is made to dig the grave meant for him. As the tyrant's blade is raised, a distant trumpet sounds the arrival of justice, and the prisoners' chorus rises from the depths toward daylight. Beethoven makes the orchestra itself enact the passage from buried silence into liberation.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72 (versions 1805 and 1814), libretto after J. N. Bouilly; IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/china-detains-us-scientist--a4.png",
          "alt": "Prison scene from Act 3 of Beethoven's Fidelio, 1860",
          "credit": "Ange-Louis Janet, 1860, Bibliotheque nationale de France (Gallica), public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's 1787 masterpiece The Death of Socrates freezes the instant when the Athenian state's condemnation of its wisest citizen becomes irreversible. Convicted of impiety and corrupting the young, charges that masked the city's discomfort with a mind that questioned too freely, Socrates sits upright on his prison cot, one hand reaching for the cup of hemlock without looking at it, the other lifted mid-argument: he is still teaching, still reasoning, as he dies. David surrounds him with grieving disciples and the cold geometry of the cell, staging the scene as a collision between the free intellect and the power that cannot tolerate it. The Metropolitan Museum, which holds the canvas, has even framed it under the theme of prisons real and imagined. The image speaks directly to Chen Youlin's situation: the scholar held by the state, his learning recast as danger, his fate sealed behind walls far from those who love him. Where Socrates faced a public trial and a named sentence, Chen faces detention without clear charge, but David's central figure, serene and unbroken amid confinement, remains the enduring emblem of the thinking person the state has decided to silence.",
        "excerpt": "The composition centers a luminous, upright Socrates on his cot, one finger raised toward the heavens even as he reaches blindly for the poison. Around him disciples collapse in anguish and the jailer turns away, unable to watch. The barred cell and receding stone corridor press the free mind into a space the state has chosen for it.",
        "source": "Jacques-Louis David, The Death of Socrates, oil on canvas, 1787; The Metropolitan Museum of Art, New York.",
        "href": "https://www.metmuseum.org/art/collection/search/436105",
        "image": {
          "src": "/covers/china-detains-us-scientist--a5.png",
          "alt": "The Death of Socrates, painting by Jacques-Louis David",
          "credit": "Jacques-Louis David, 1787, The Metropolitan Museum of Art, public domain"
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "canada-wildfire-smoke-us",
    "headline": "Smoke from Canadian wildfires blankets the U.S. Midwest and Northeast, prompting evacuations and air-quality alerts",
    "overview": "Heavy smoke from wildfires burning across Canada spread over the U.S. Midwest and Northeast, dropping an orange haze over Toronto and cities to the south and triggering air-quality alerts and some evacuations. The fires, part of another severe Canadian wildfire season, have driven residents from their homes and at one point surrounded a freight train, while smoke degraded air quality for millions across the border. Officials urged vulnerable people to stay indoors as fine-particle pollution climbed to hazardous levels.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxPRlBKTXJISlpyWUt4ZEtzc3B5QzFONXV2bjFhVW1qSGttbU95ODdOalJGcTdZMVd5ZlA2ZFZEZFhYanE5QTNJWjFNR2EzS1NMWFZvbVVQNDhaTVplclBhZzhwUlhQSU9jZmhER2p2aHdZRll3VVBjQWpVcEVjZXlVSzJjTmNPOTlub21rQnl4eHp1TDN1N0Rj?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxOTzJJYm1wY0tiXzZPNGRRXzk4WVNDWDNnUklvSG5SRXAtMXhxcGRjZWtsUV9MZ1BXY09VMjZESVBjUDMtWlhab09yaU1yeTJaQXdWZHdhaXBRWWJsRnVrRS1NbzdZdmljMXBRQnVxVm41U0phQVJ5Vzl0ZWZWemlYeTBKNk5EMnlwOWk3ZC1taHdjcHU4aG11QkVUS3dpUElIbXdfMjVMOVM5VVJXSzJLb2V3QlB5emJOeXVJQkNZZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/canada-wildfire-smoke-us.png",
      "alt": "A city skyline turned orange and hazy under drifting wildfire smoke.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In August of AD 79, the young Pliny the Younger watched from Misenum, across the bay from Vesuvius, as the mountain flung a pine-shaped column of ash into the sky and then buried Pompeii and Herculaneum. In a letter to the historian Tacitus he described a black, flame-shot cloud rolling over the land, ash sifting down like snow, and a darkness so complete it was as if the lamp had been put out in a closed room, a whole population groping seaward by torchlight, shaking cinders from their clothes, some convinced the world's last night had come. That ancient scene of a city swallowed by its own poisoned air rhymes uncomfortably with 2025, when smoke from Canadian wildfires turned the noon sun over Toronto and the American Midwest and Northeast into a dim orange coin. Pliny's refugees fleeing the ashfall are the distant ancestors of the millions now told to stay indoors or evacuate, of children kept from playgrounds by air-quality alerts. Where Vesuvius darkened one bay for a day, the fires darkened a subcontinent for weeks, but the primal fear of a sky that has turned against the lungs is exactly the same.",
        "excerpt": "On the other side, a black and dreadful cloud, broken with rapid, zigzag flashes, revealed behind it variously shaped masses of flame... The ashes now began to fall upon us, though in no great quantity... We had scarcely sat down when night came upon us, not such as we have when the sky is cloudy, or when there is no moon, but that of a room when it is shut up, and all the lights put out... the real day returned, and even the sun shone out, though with a lurid light, like when an eclipse is coming on.",
        "source": "Pliny the Younger, Letters 6.20 (to Cornelius Tacitus), c. 106 CE, trans. William Melmoth; text via pompeii.org.uk.",
        "href": "https://www.pompeii.org.uk/s.php/tour-the-two-letters-written-by-pliny-the-elder-about-the-eruption-of-vesuvius-in-79-a-d-history-of-pompeii-en-238-s.htm",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us--a0.png",
          "alt": "Pliny the Younger and his mother beneath the darkened eruption at Misenum",
          "credit": "Angelica Kauffmann, 'Pliny the Younger and his Mother at Misenum, 79 A.D.', 1785, Princeton University Art Museum (public domain, via Wikimedia Commons)"
        }
      },
      {
        "category": "historical",
        "title": "For eight months beginning in June 1783, the Laki fissure in Iceland poured out lava and, more lethally, a vast fog of sulphur that drifted across the whole of Europe and beyond. In Hampshire the naturalist Gilbert White recorded a peculiar haze, or smokey fog, that hung for weeks, a dry reek in which the noon sun looked as blank as a clouded moon and glowed blood-red at dawn and dusk. Crops withered, people sickened and died of the foul air, and no one understood that the cause lay a thousand miles north across the sea. It is one of history's clearest precedents for exactly what happened as Canadian wildfire smoke rolled south in 2025: an atmospheric plague indifferent to borders, generated in one country and settling over the cities of another, dimming the sun and staining it orange. White's countrymen breathed Icelandic sulphur without knowing its name; New Yorkers and Chicagoans breathed Canadian soot flagged in real time on their phones. Both events reveal how thin and shared the sky is, how a distant fire or fissure can, within days, press its haze against the windows of people who never saw the flames.",
        "excerpt": "The summer of the year 1783 was an amazing and portentous one, and full of horrible phaenomena... the peculiar haze, or smokey fog, that prevailed for many weeks in this island, and in every part of Europe, and even beyond its limits, was a most extraordinary appearance, unlike anything known within the memory of man... The sun, at noon, looked as blank as a clouded moon, and shed a rust-coloured ferruginous light on the ground, and floors of rooms; but was particularly lurid and blood-coloured at rising and setting.",
        "source": "Gilbert White, The Natural History of Selborne, Letter LXV to Daines Barrington, 1789 (on the summer of 1783); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1408/1408-h/1408-h.htm",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us--a1.png",
          "alt": "A blazing, smoke-hued sunset sky over the Thames",
          "credit": "J. M. W. Turner, 'The Fighting Temeraire', 1839, National Gallery, London (public domain, via Wikimedia Commons)"
        }
      },
      {
        "category": "literary",
        "title": "In the summer of 1816, the 'year without a summer' caused by the eruption of Mount Tambora the year before, cold rain and gloom drove Lord Byron and his companions indoors on Lake Geneva, and out of that sunless season came his poem 'Darkness.' It imagines the sun extinguished, the earth swinging blind and blackening in the moonless air, morning arriving without day, and desperate humanity burning its cities for light. Byron wrote it, like the Frankenstein conceived the same wet week, under the psychological pressure of a real climatic catastrophe whose distant volcanic cause was invisible to those enduring it. The poem is the literary archetype of the emotion the Canadian smoke reawakened: the uncanny dread of a fouled, darkened sky at midday, the sense that the natural order has failed. When an orange pall settled over Toronto and cities to the south in 2025 and the sun hung as a coppery disc, commentators reached instinctively for the word apocalyptic, the very register Byron struck. His vision of people huddled by watchfires under a dead sun is the imaginative shadow of a continent watching a smoke-stained heaven and wondering whether this is a freak or a forecast.",
        "excerpt": "I had a dream, which was not all a dream. / The bright sun was extinguished, and the stars / Did wander darkling in the eternal space, / Rayless, and pathless, and the icy Earth / Swung blind and blackening in the moonless air; / Morn came and went—and came, and brought no day, / And men forgot their passions in the dread / Of this their desolation; and all hearts / Were chilled into a selfish prayer for light.",
        "source": "Lord Byron, 'Darkness' (1816), in The Works of Lord Byron, ed. Coleridge & Prothero; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_4/Darkness",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us--a2.png",
          "alt": "An apocalyptic sky of fire and darkness engulfing the world",
          "credit": "John Martin, 'The Great Day of His Wrath', 1851–53, Tate (public domain, via Wikimedia Commons)"
        }
      },
      {
        "category": "literary",
        "title": "T. S. Eliot's The Waste Land (1922) opens its procession of the modern dead beneath a smothered sky: 'Unreal City, / Under the brown fog of a winter dawn, / A crowd flowed over London Bridge, so many, / I had not thought death had undone so many.' Eliot drew on the real, coal-choked murk of industrial London, the same recurring pall that would culminate in the deadly Great Smog of 1952, to render a city where the very air seems spiritually and physically poisoned and its people move like shades. That image of a great metropolis dimmed by an unnatural fog, its inhabitants trudging half-seen through a discoloured dawn, is startlingly close to the photographs from 2025, when a brown-orange haze of wildfire smoke hung over Manhattan, Chicago and Toronto and pedestrians crossed bridges into a blotted-out skyline. Eliot's fog was man-made, born of a hundred thousand hearths and furnaces; the wildfire smoke, too, carries the signature of a warming, human-altered climate. In both, the choked sky becomes a moral atmosphere as much as a meteorological one, a warning hanging over the crowd that something in the world is out of joint.",
        "excerpt": "Unreal City, / Under the brown fog of a winter dawn, / A crowd flowed over London Bridge, so many, / I had not thought death had undone so many. / Sighs, short and infrequent, were exhaled, / And each man fixed his eyes before his feet.",
        "source": "T. S. Eliot, The Waste Land, Part I 'The Burial of the Dead' (1922); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Waste_Land_(Eliot,_1922)",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us--a3.png",
          "alt": "London's Parliament dissolving in coloured fog and haze",
          "credit": "Claude Monet, 'The Houses of Parliament, Sunset', 1903, National Gallery of Art (public domain, via Wikimedia Commons)"
        }
      },
      {
        "category": "artistic",
        "title": "The finale of Hector Berlioz's Symphonie fantastique (1830), the 'Dream of a Witches' Sabbath,' is one of music's great evocations of a sky turned menacing and unnatural. Muted low strings mutter, bells toll like a distant alarm, and the ancient plainchant of the Dies irae, the medieval hymn of the Day of Wrath, is dragged into a grotesque, shrieking dance, brass and bassoons blaring a vision of the end. Berlioz built the whole symphony around a fevered dream, and this last movement conjures exactly the mood of dread and gloom that a smoke-blackened noon inspires: the ordinary world made strange and threatening, judgement seemingly at hand. Heard against the images of 2025, an orange haze over Toronto and the American Northeast, the sun reduced to a sullen ember, millions warned to shelter from the air itself, the music supplies the emotional soundtrack the newspaper photographs lack. The tolling bells and the Dies irae's ancient warning of a day of fire and reckoning give voice to the apocalyptic unease of a population choking under a borrowed pall of ash, watching the heavens dim and wondering, as Berlioz's dreamer does, whether the nightmare belongs to sleep or to the waking world.",
        "excerpt": "In the final movement the orchestra conjures a witches' sabbath: sepulchral bells toll, shrill high woodwinds cackle, and the ancient Dies irae plainchant is transformed into a lurching, blaring dance of the damned. The music gathers into a whirling, brass-heavy climax of grotesque celebration, a soundscape of dread, judgement and a world tipped into nightmare.",
        "source": "Hector Berlioz, Symphonie fantastique, H 48 (1830), 5th movement 'Songe d'une nuit du sabbat'; IMSLP.",
        "href": "https://imslp.org/wiki/Symphonie_fantastique,_H_48_(Berlioz,_Hector)",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us--a4.png",
          "alt": "Night eruption of Vesuvius with fire and billowing smoke",
          "credit": "Pierre-Jacques Volaire, 'The Eruption of Vesuvius', 1771, Art Institute of Chicago (public domain, via Wikimedia Commons)"
        }
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov's enormous canvas The Last Day of Pompeii (1830–33) freezes the instant of catastrophe: under a sky torn black by ash and lit lurid red by falling fire and lightning, the citizens of Pompeii scatter, mothers shielding children, a son carrying his aged father, figures stumbling among toppling statues as Vesuvius rages behind them. Bryullov, who sketched at the excavated ruins and staged the light of the eruption with theatrical brilliance, made the painting a study in mass panic beneath a poisoned, glowing heaven, refugees from flame, exactly the phrase the 2025 wildfire crisis put back into the news. The blood-orange sky over his fleeing crowd is the same colour that photographers captured above Toronto and the U.S. Northeast when the Canadian smoke arrived, the sun a smouldering disc, the air unbreathable. Where Bryullov's Pompeiians flee on foot with what they can carry, the Canadian fires drove real residents from their homes and shut millions indoors under air-quality alerts. The painting's genius is its human scale amid cosmic disaster, individual faces, tender gestures, terror, which is precisely what a haze map or a smoke forecast cannot show, and precisely what makes both the ancient and the modern catastrophe legible as human loss.",
        "excerpt": "Beneath a sky torn open and glowing blood-red with volcanic fire, the people of Pompeii flee through collapsing streets as ash rains down and statues topple around them. Bryullov crowds the vast canvas with individual acts of terror and tenderness—a mother clutching her child, sons bearing an aged father—each face lit by the unnatural crimson glare of the erupting mountain.",
        "source": "Karl Bryullov, The Last Day of Pompeii, 1830–1833, oil on canvas, State Russian Museum; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/canada-wildfire-smoke-us--a5.png",
          "alt": "Crowds flee beneath a black, ash-choked, fire-lit sky",
          "credit": "Karl Bryullov, 'The Last Day of Pompeii', 1830–33, State Russian Museum (public domain, via Wikimedia Commons)"
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "sothebys-record-half-year",
    "headline": "Sotheby's reports a record $4.4 billion in sales for the first half of 2026, up 58% from a year earlier",
    "overview": "Sotheby's said it recorded $4.4 billion in sales in the first half of 2026, an all-time high and a 58% jump from the same period a year earlier, with auction sales of $3.4 billion and private sales of $826 million. The auction house credited its move to the Marcel Breuer building on Madison Avenue, which drew more than double the visitors, along with marquee sales including a $173 million tranche from the Robert Mnuchin collection and a Rembrandt lion drawing that fetched $18 million. Chief executive Charles F. Stewart said the run had 'enhanced our profitability and capital position.'",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/sothebys-records-all-time-high-4-4-billion-in-sales-1234754774/"
      },
      {
        "name": "Observer",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQRlhDZm1ka2VJRWxoZTh1YmtZZURBX1hjeFdwNm41QWdGNlI5WnZnRnNTc1VwZ2JQdFI1R21UYi16V2VUTTdOTUxTbC1RUkhHdGwzc0J4dkVma2M0czRWZl80SFlRWjJVcXFEQ21yeW13UlNXOURQbnR4dVZYVFpwdjFUWVk4VVZUUTItV2c1RHdrZ2xHaWFMNDhaRUJieUZGbXlYS0p4NTduam5NcWVNV09oSnc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/sothebys-record-half-year.png",
      "alt": "White-gloved hands hold a framed Rembrandt drawing of a lion sold at Sotheby's.",
      "credit": "Artforum"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the spring of 193 AD the Roman Empire itself came under the hammer. Having murdered the reforming emperor Pertinax, the Praetorian Guard mounted the ramparts of their camp and offered the throne to the highest bidder. Two men bid against each other from below—Pertinax's father-in-law Sulpicianus and the wealthy senator Didius Julianus—soldiers shuttling each fresh offer between them as on any auction floor, until Julianus, leaping his bid by five thousand sesterces per man at a stroke, carried the world for roughly twenty-five thousand apiece. He wore the purple sixty-six days before losing his head. Cassius Dio, a senator who watched it happen, recoiled at power sold like merchandise in a saleroom. The episode is the ancestor of every headline that measures glory in money, and it shadows Sotheby's record $4.4 billion half-year: the same theatre of ascending numbers, the same crowd sensing that anything—an empire, a Rembrandt lion, a Mnuchin masterpiece—has its price if the bidding runs hot enough. In 193 the prize was the world; in 2026 it is beauty. The mechanism, and the intoxication of the raised bid, are identical.",
        "excerpt": "For, just as if it had been in some market or auction-room, both the City and its entire empire were auctioned off. ... They gradually raised their bids up to twenty thousand sesterces per soldier. Some of the soldiers would carry word to Julianus, 'Sulpicianus offers so much; how much more do you make it?'",
        "source": "Cassius Dio, Roman History, Epitome of Book LXXIV, ch. 11 (trans. Earnest Cary, Loeb Classical Library, 1927); via LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/74*.html",
        "image": {
          "src": "/covers/sothebys-record-half-year--a0.png",
          "alt": "Silver denarius of Didius Julianus, 193 AD",
          "credit": "American Numismatic Society (1944.100.50052), CC0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "By 1882 the world's greatest saleroom drama had migrated from the Praetorian camp to Christie's in King Street. Over twelve days between June and July, the trustees of the debt-laden 12th Duke of Hamilton dispersed the fabled contents of Hamilton Palace—2,213 lots of Old Masters, Sèvres, Boulle furniture and the connoisseur William Beckford's hoarded treasures—for the then-staggering total of about £332,000. Dealers and agents of the new American and Rothschild fortunes crowded the rooms; the South Kensington Museum and the Louvre competed for single objects; prices shattered every precedent, and newspapers marvelled that an aristocratic inheritance three centuries in the making could be liquidated into cash in a fortnight. The Hamilton Palace sale became shorthand for the moment when taste and lineage were finally, publicly convertible into money, and old blood gave way to whoever bid highest. Sotheby's 2026 half-year—$4.4 billion, up 58 percent, crowned by a $173 million Mnuchin tranche—is the same story at a vastly larger scale: heirs and collections passing under the hammer, wealth from new quarters bidding for beauty, and the saleroom once again turning centuries of accumulated splendour into a single, dazzling number.",
        "excerpt": "Over twelve days in the summer of 1882, Christie's King Street rooms overflowed as the Hamilton Palace collection came under the hammer. Agents of the Louvre, the South Kensington Museum, and the new Rothschild and American fortunes bid ferociously for Old Masters, Sèvres, and Beckford's treasures, driving the total to a then-unheard-of £332,000. Observers marvelled that a great aristocratic inheritance could be converted into cash in a single fortnight.",
        "source": "The Hamilton Palace Collection: Illustrated Priced Catalogue (Christie, Manson & Woods sale, 17 June–20 July 1882), Paris & London, 1882; Internet Archive.",
        "href": "https://archive.org/details/hamilton00chri",
        "image": {
          "src": "/covers/sothebys-record-half-year--a1.png",
          "alt": "A picture auction in progress at Christie's, 1808 aquatint",
          "credit": "Rowlandson & Pugin, 'Auction Room, Christie's,' Microcosm of London (1808), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Balzac's last completed novel gives us the purest portrait of the collector's mania. Sylvain Pons, an aging, unfashionable musician, is mocked by his rich relations as a shabby parasite—yet in his cramped rooms he has assembled, on a threadbare income across forty years, a secret trove of 1,907 masterpieces: paintings, enamels, fans, carvings, snuffboxes, each won by patient haggling and barter, the 'joy of joys.' The collection is worth a fortune Pons never spends and barely reckons; only when his cousins glimpse its value do greed and legal machination close in, and the dying man's beloved objects become counters in a sordid scramble for money. Balzac saw, a century and a half early, exactly what Sotheby's record year dramatizes: that beauty patiently gathered by a passionate eye is also latent capital, and that the instant it is appraised it stops being love and starts being wealth. Pons hoards for adoration; the market, and his heirs, see only francs. The novel's ache—the connoisseur's tenderness for his hoard set against the world's hunger to cash it in—is the human shadow behind every $18 million Rembrandt drawing and every marquee lot crossing the block.",
        "excerpt": "This system, carried out for forty years, in Rome or Paris alike, had borne its fruits. Since Pons returned from Italy, he had regularly spent about two thousand francs a year upon a collection of masterpieces of every sort and description, a collection hidden away from all eyes but his own; and now his catalogue had reached the incredible number of 1907.",
        "source": "Honoré de Balzac, Le Cousin Pons (1847), trans. Ellen Marriage; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1856/1856-h/1856-h.htm",
        "image": {
          "src": "/covers/sothebys-record-half-year--a2.png",
          "alt": "Daguerreotype portrait of Honoré de Balzac, 1842",
          "credit": "Louis-Auguste Bisson, 1842, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ben Jonson's Jacobean comedy opens on the great magnifico Volpone throwing open the shrine that holds his gold and greeting it like a rising sun and a saint to be adored. Childless and cunning, he feigns mortal illness so that a parade of greedy legacy-hunters will heap treasures—plate, jewels, coin—upon him in hope of being named his heir; the play is a merciless anatomy of avarice, of men who worship wealth as a deity and mistake acquisition for love. Volpone's rapturous hymn to his hoard, glittering 'like a flame by night,' is the literary distillation of every appetite that a record saleroom feeds: the transmutation of objects into idols, and of idols into money. When Sotheby's reports $4.4 billion and buyers vie for a Rembrandt or a Mnuchin canvas, Jonson's warning hovers close—that beauty amassed can curdle into pure cupidity, the shrine of art indistinguishable from the shrine of gold. His fable ends in exposure and ruin, a moralist's counterweight to the spectacle of wealth bidding ever higher for the beautiful.",
        "excerpt": "Good morning to the day; and next, my gold:\nOpen the shrine, that I may see my Saint.\nHail the world's soul, and mine! more glad than is\nThe teeming earth to see the long'd-for sun\nPeep through the horns of the celestial Ram,\nAm I, to view thy splendour darkening his;\nThat lying here, amongst my other hoards,\nShew'st like a flame by night; or like the day\nStruck out of chaos, when all darkness fled\nUnto the centre. O thou son of Sol,\nBut brighter than thy father, let me kiss,\nWith adoration, thee, and every relick\nOf sacred treasure, in this blessed room.",
        "source": "Ben Jonson, Volpone; or, The Fox (1606), Act I, Scene 1; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/4039/4039-h/4039-h.htm",
        "image": {
          "src": "/covers/sothebys-record-half-year--a3.png",
          "alt": "Portrait of the playwright Ben Jonson",
          "credit": "Abraham van Blyenberch, c. 1617, National Portrait Gallery (NPG 2752), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Das Rheingold, the prologue to the Ring cycle, begins with pure beauty and ends with a curse over gold. In the depths of the Rhine, the Rhinemaidens guard a radiant treasure; the dwarf Alberich, spurned by them, renounces love itself to seize the gold and forge from it a ring of limitless power. What follows is a chain of theft, deceit and murder, the giants demanding the hoard as payment, every character consumed by the lust the treasure kindles—Wagner's vast musical parable of what happens when the beautiful is converted into wealth and power. The opera is conceived as spectacle: shimmering water-music, the clang of the Nibelung anvils, gods processing over a rainbow bridge into a doomed golden hall. It is the perfect operatic mirror for a record art market. Sotheby's $4.4 billion half-year, its marquee lots and mania of ascending bids, enacts the same alchemy Wagner dramatized—loveliness turned to bullion, and the hunger that transformation unleashes. Beneath the glitter of a saleroom triumph runs Wagner's warning that gold, once wrenched from the water and priced, carries its own curse.",
        "excerpt": "The prologue opens in the green depths of the Rhine, where the Rhinemaidens' shimmering guardianship of the gold gives way to Alberich's theft and his forging of the all-powerful ring. Wagner scores the drama as pure spectacle—rippling water-music, the ringing anvils of the Nibelung slaves, and the gods' glittering procession over the rainbow bridge. Through it runs the warning that gold torn from the river and hoarded carries a curse that corrupts all who covet it.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854, premiered 1869); full score via IMSLP.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/sothebys-record-half-year--a4.png",
          "alt": "The Rhinemaidens lament the loss of the Rhinegold",
          "credit": "Arthur Rackham, 1910, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "David Teniers the Younger painted, around 1653, the ultimate image of the connoisseur amid his masterpieces: Archduke Leopold Wilhelm, Habsburg governor of the Netherlands, standing hat-in-hand in a gallery whose walls are tiled floor-to-ceiling with dozens of gleaming Italian pictures—Titians, Giorgiones, Veroneses—while the painter himself looks on and small dogs sniff among the frames. It is a portrait not of a man but of possession, of taste made visible as sheer accumulated splendour; Teniers produced such 'gallery pictures' partly as a printed catalogue of the collection, an inventory of glory. The canvas turns a private hoard of masterpieces into a public spectacle of wealth and discernment—precisely the spectacle Sotheby's stages when it reports $4.4 billion in sales and lines its Breuer-building walls with trophies bound for the block. Here is the marketplace of masterpieces frozen in oil: the collector's appetite, the crowding of great names into one room, the conversion of beauty into status and status into value. Three and a half centuries on, the connoisseur still gestures proudly at his acquisitions, and the world still measures a life by the pictures on the wall.",
        "excerpt": "The Archduke stands hat in hand before a wall tiled edge to edge with Italian masterpieces, gesturing toward his acquisitions as courtiers and the painter admire them. Every frame is rendered in miniature precision, an inventory of Titians and Veroneses assembled as a monument to taste and wealth. The picture transforms a private collection into a public boast of discernment and possession.",
        "source": "David Teniers the Younger, Archduke Leopold Wilhelm and the artist in the archducal picture gallery in Brussels (1653), oil on canvas; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:David_Teniers_II_-_Archduke_Leopold_Wilhelm_and_the_artist_in_the_archducal_picture_gallery_in_Brussels_(1653).jpg",
        "image": {
          "src": "/covers/sothebys-record-half-year--a5.png",
          "alt": "Archduke Leopold Wilhelm in his picture gallery in Brussels",
          "credit": "David Teniers the Younger, 1653, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "zaporizhzhia-engineer-killed",
    "headline": "Russia says a Ukrainian drone strike killed the chief engineer of the occupied Zaporizhzhia nuclear plant",
    "overview": "Russia's nuclear agency Rosatom said a Ukrainian drone strike killed the chief engineer of the Russian-occupied Zaporizhzhia Nuclear Power Plant, along with his driver, as their vehicle came under attack. Zaporizhzhia, Europe's largest nuclear plant, has been held by Russian forces since 2022 and its six reactors are in cold shutdown, but repeated military activity around the site has alarmed the U.N. nuclear watchdog. Ukraine did not immediately comment on the Russian account, which could not be independently verified.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPNXY2MTVja3gxVm9Ld1JEVlc1dWF3QW1OQlZWMkM2Mkg2WllyLUJRWnIwVzZwOTJJb3VnaXQ5Z1BobjRDc24tdl9CMUs3bTJfOHRFckN4cGxDSGstcjR2eE9JZXFWTmNQT1dXcnhqRGlMYmFsWjBxOWxyNjI1VDFzemZjYThHNUVLQXVEX05FWG92NHdjU0M5T0lYZzdyNndsYUVQb1A2dElSWHV6Q3VSUWxZYzlzRW1WRVdFSUdLZ0F0Zw?oc=5"
      },
      {
        "name": "Meduza",
        "href": "https://news.google.com/rss/articles/CBMi6gFBVV95cUxQRlRNSV95VjM2NDFvNGZ3dlR3N3pheE85X2dtWFc1VkdqN0xGMG1DbFR6SElNR1llLVZQMzhSUEhnY28yMHM3eU9hNGhGLS1tSks3TW0zOTBvVDBfNDRzSFJySUVWVnhTRGNnVjFnY3B4SjM4dWYzdklNY3NXMFJ1YktLakZkczAxbXFRYXU3SkVGeG9lOWpORi1GSnhlZDVGZjltZDdLbDJ1Nm5BTEdiQk5UTWR0cFBjUk9ZMF9QYVRqNGZJVFp3MVptNkVjeXh3Mi1hSGZmTzNITHlnbmtxcEtLWjVmWnFHRmfSAeoBQVVfeXFMUEZUTUlfeVYzNjQxbzRmd3ZUdzd6YXhPOV9nbVhXNVZHajdMRjBtQ2xUekhJTUdZZS1WUDM4UlBIZ2NvMjBzN3lPYTRoRi0tbUpLN01tMzkwb1QwXzQ0c0hScklFVlZ4U0RjZ1YxZ2NweEozOHVmM3ZJTWNzVzBSdWJLS2pGZHMwMW1xUWF1N0pFRnhvZTlqTkYtRkp4ZWQ1RmY5bWQ3S2wydTZuQUxHYkJOVE1kdHBQY1JPWTBfUGFUajRmSVRadzFabTZFY3l4dzItYUhmZk8zSEx5Z25rcXBLS1o1ZlpxR0Zn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/zaporizhzhia-engineer-killed.png",
      "alt": "The cooling towers and reactor buildings of a large nuclear power plant.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the oldest layer of Greek myth-history, the Titan Prometheus stole fire from the gods and carried it down to shivering mortals hidden in a hollow fennel stalk—the first act of technological theft, and the first to end in catastrophe for its author. Fire was the archetype of latent power: warmth and civilization on one side, ruin and conflagration on the other, a gift indistinguishable from a curse. For his transgression Zeus chained Prometheus to a Caucasian crag, where an eagle tore daily at his liver, and loosed upon humanity the plagues of Pandora's jar. The myth encodes the permanent anxiety that clings to the taming of terrible energies—the sense that whoever handles such fire becomes both benefactor and hostage. The occupied Zaporizhzhia plant is a modern fennel stalk: six reactors holding Europe's largest concentration of nuclear fire in fragile cold shutdown, tended by engineers who are at once its keepers and its captives. The reported killing of the plant's chief engineer by a drone renders the ancient image brutally literal—a single man, bound to a machine of god-like power, struck down amid forces vastly larger than himself while the fire he guarded waits, banked but never extinguished, above a battlefield.",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, Prometheus Bound, trans. Theodore Alois Buckley (1849); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm",
        "image": {
          "src": "/covers/zaporizhzhia-engineer-killed--a0.png",
          "alt": "Prometheus bringing fire to mankind",
          "credit": "Heinrich Füger, 'Prometheus Brings Fire to Mankind' (c. 1817), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On the freezing night of 27 February 1943, nine Norwegian commandos of Operation Gunnerside descended an icy ravine, scaled the far wall, and slipped into the German-held Vemork plant above Rjukan—the only facility on earth then mass-producing 'heavy water,' the moderator that might have carried Hitler's physicists toward an atomic bomb. In minutes they laid charges in the electrolysis cellar and destroyed the stock, one of the war's most consequential acts of sabotage, fought not over territory but over access to a source of terrible latent power. Vemork was a hydroelectric cathedral turned strategic prize, and the men who worked its machines lived inside a target the whole war was straining to reach. The parallel to occupied Zaporizhzhia is close and uneasy: a great industrial installation, seized and militarized, becomes the object of a covert strike whose real stakes are measured in the physics of the atom rather than in ground gained. Where Gunnerside's saboteurs took exquisite care to avoid a catastrophic release and killed no one, the drone reported over Zaporizhzhia inverts that restraint—violence delivered directly to the nuclear threshold, and to the individual engineer standing on it, in a war that keeps testing how near to disaster it dares to fight.",
        "excerpt": "On a black February night in 1943, saboteurs on skis crossed a frozen gorge and stole into the Vemork plant, planting charges among the tanks of heavy water that might have fed a Nazi bomb. The blast crippled the works without firing a shot at the guards or breaching anything catastrophic—sabotage as surgery. It remains the model of a strike aimed at the atom's raw materials, waged in the dark against a source of world-altering power.",
        "source": "Norwegian heavy water sabotage (Operation Gunnerside), Vemork, 27 February 1943; Wikipedia overview and Atomic Heritage Foundation.",
        "href": "https://en.wikipedia.org/wiki/Norwegian_heavy_water_sabotage",
        "image": {
          "src": "/covers/zaporizhzhia-engineer-killed--a1.png",
          "alt": "The Vemork heavy-water plant at Rjukan, Norway, 1935",
          "credit": "Anders Beer Wilse / Norwegian Museum of Cultural History, 1935, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Mary Shelley subtitled her 1818 novel 'The Modern Prometheus,' and Victor Frankenstein is the archetype of the maker undone by his own dangerous power. Laboring in secret, he assembles a being and, on a dreary night of November, infuses a spark of being into the lifeless thing at his feet—only to recoil in horror as the animated force he cannot control turns loose upon everyone he loves. The novel's warning is not against knowledge as such but against the hubris of unleashing energies whose consequences outrun their author's intentions. It is the founding parable of the nuclear age, invoked ever since by the physicists who split the atom and glimpsed what they had loosed. At Zaporizhzhia that parable stands realized in steel and uranium: an immense human-made source of power, created for light and now suspended in cold shutdown, ringed by armies who treat it as a chip in their war. The chief engineer reportedly killed there is Frankenstein's inheritor in the most sober sense—one of the keepers charged with holding a made thing in check, standing between civilization and the catastrophe it could become, and destroyed amid the very forces the machine embodies. Shelley's warning that the acquirement of knowledge is dangerous has rarely felt so literal.",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. ... Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge, and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818; rev. 1831); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/zaporizhzhia-engineer-killed--a2.png",
          "alt": "Frontispiece to the 1831 edition of Frankenstein showing Victor recoiling from his creature",
          "credit": "Theodor von Holst, frontispiece to Frankenstein (1831 ed.), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Byron wrote 'Darkness' in the summer of 1816, the 'Year Without a Summer,' when ash from the Tambora eruption veiled the sun and Europe shivered under failed harvests. His vision is of extinction without redemption: the sun extinguished, the icy Earth swinging blind and blackening in the moonless air, humanity burning its own cities for light before the last men die beside cold hearths. It is one of literature's starkest imaginings of a world snuffed out by forces beyond human scale—a poem the twentieth century would read as an uncanny premonition of nuclear winter. That resonance is what binds it to Zaporizhzhia. Europe's largest nuclear plant sits in cold shutdown amid shelling and drones, a banked fire that a single catastrophic breach could turn into precisely the rayless, poisoned darkness Byron conjured. The poem also narrows, at its close, to individual figures dying in the dark, dwarfed by the annihilation around them—an image that answers to the lone engineer reportedly killed at the plant, one man extinguished amid vast and indifferent forces. Byron understood that catastrophe is felt both cosmically and intimately: the death of a world and the death of a person, contemplated in the same failing light.",
        "excerpt": "I had a dream, which was not all a dream.\nThe bright sun was extinguished, and the stars\nDid wander darkling in the eternal space,\nRayless, and pathless, and the icy Earth\nSwung blind and blackening in the moonless air;\nMorn came and went—and came, and brought no day,",
        "source": "Lord Byron, 'Darkness' (1816); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Darkness_(Byron,_1901)",
        "image": {
          "src": "/covers/zaporizhzhia-engineer-killed--a3.png",
          "alt": "Caspar David Friedrich's The Sea of Ice, jagged ice slabs crushing a wrecked ship",
          "credit": "Caspar David Friedrich, 'The Sea of Ice' (1823–24), Hamburger Kunsthalle; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Dmitri Shostakovich began his Seventh Symphony in Leningrad in 1941 as the German army closed its ring around the city, composing partly while serving as a volunteer fireman on the roof of the Conservatory. Its first movement builds an infamous 'invasion theme'—a banal little march repeated and swollen through relentless crescendos until it becomes a juggernaut of mechanized destruction—before the music turns to lament and defiance. The 'Leningrad' Symphony is the great musical document of a civilization besieged, of vast impersonal violence bearing down on a place and the human beings trapped inside it. When it was performed in the starving city in August 1942, loudspeakers carried it toward the German lines. That fusion of the intimate and the annihilating speaks directly to occupied Zaporizhzhia, where a single reported death sits inside a siege of continental stakes. Shostakovich's score holds both scales at once: the crushing advance of forces beyond any individual's control, and the fragile persistence of the people—firemen, musicians, engineers—who keep their posts as the machine of war grinds toward them. The chief engineer reportedly killed at the plant belongs to that lineage of guardians standing watch amid an overwhelming threat, his single life set against the symphony's roar of massed, indifferent power.",
        "excerpt": "Over the first movement a trivial march repeats and metastasizes through a long crescendo into a wall of mechanized menace, then collapses into elegy. Composed under bombardment and premiered in the besieged city, the symphony sets the din of overwhelming force against the stubborn survival of those beneath it. It is the sound of a civilization holding its post while catastrophe advances.",
        "source": "Dmitri Shostakovich, Symphony No. 7 in C major, Op. 60 'Leningrad' (1941); score at IMSLP.",
        "href": "https://imslp.org/wiki/Symphony_No.7,_Op.60_(Shostakovich,_Dmitry)",
        "image": {
          "src": "/covers/zaporizhzhia-engineer-killed--a4.png",
          "alt": "A Leningrad street after a German air raid during the 1941–44 siege",
          "credit": "RIA Novosti archive, image #601181 / Boris Kudoyarov / CC-BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John Martin's vast canvas 'The Great Day of His Wrath' (1851–53), painted near the end of his life, shows the world itself coming apart: whole cities uprooted and hurled into a blazing chasm, mountains toppling, the sky a furnace of red and black through which tiny human figures fall like sparks. Inspired by the apocalypse of Revelation and by the hellish industrial landscapes of the Black Country he had witnessed by night, Martin fused biblical catastrophe with the terror of a man-made world consuming itself in fire. No painting better captures the aesthetic of latent, total ruin—the sense of a threshold beyond which everything is annihilated at once. That is the shadow hanging over occupied Zaporizhzhia. Its six reactors hold, in cold shutdown, the potential for exactly such a conflagration, and every drone and shell around the plant flirts with tipping the scene from apprehension into Martin's cataclysm. The painting's minuscule human figures, swept helpless amid geologic destruction, mirror the individual caught in this war around the atom—the engineer reportedly killed at his post, a single mote against forces of near-cosmic magnitude. Martin painted the moment the world's banked fire is finally loosed; Zaporizhzhia is the machine we are asking, day after day, not to let that moment arrive.",
        "excerpt": "Cliffs and cities are flung skyward into a crimson abyss while lightning splits a bruised, smoke-choked heaven and human figures tumble like embers. Martin renders the instant of total ruin—the world's fire finally unleashed—on a scale that reduces every person to a falling spark. It is apprehension made apocalypse, catastrophe seen whole.",
        "source": "John Martin, The Great Day of His Wrath (1851–53), Tate Britain, London.",
        "href": "https://en.wikipedia.org/wiki/The_Great_Day_of_His_Wrath",
        "image": {
          "src": "/covers/zaporizhzhia-engineer-killed--a5.png",
          "alt": "John Martin's apocalyptic painting of cities and mountains collapsing into a fiery chasm",
          "credit": "John Martin, 'The Great Day of His Wrath' (1851–53), Tate; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "cuban-artist-otero-missing",
    "headline": "Cuban dissident artist Luis Manuel Otero Alcántara goes missing after his prison sentence ends",
    "overview": "Luis Manuel Otero Alcántara, the Cuban performance artist and co-founder of the San Isidro Movement, has gone missing after completing a prison sentence, prompting a human-rights group to file a legal petition demanding the government account for his whereabouts. Otero Alcántara, a prominent critic of the Cuban state whose work protested restrictions on artistic freedom, was jailed in 2021 and had been due for release. Rights advocates say Cuban authorities have 72 hours to respond to the petition, warning that his disappearance fits a pattern of pressure on the island's dissident artists.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/cuban-artist-luis-manuel-otero-alcantara-missing-1234754782/"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPSktXblAtUjRRM2YzQXRqeUtwTWdCcVRxYzlJRkFmWUotOE1pOEYzVUxEMENaMjNNQ0JzT2FLRk90TXdUNU1xb3VUNEhzUTBwQUFIWTF0S1pzT19uTUlHM2prX3M3TzlyTk5MZ2xzQ3htOU1sRWZyRndJWDVxQkh0VXFBc1oxWC1UM1pMMnR0OHF4cXM3UmZJT3JSN3VLdmpfU2p5Q2ZVbDd3WlkzNUl0WXRCVWJRdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/cuban-artist-otero-missing.png",
      "alt": "The Cuban dissident artist Luis Manuel Otero Alcántara wrapped in a Cuban flag before Havana's Capitolio.",
      "credit": "Artforum"
    },
    "edition": "Morning Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Ovid, Rome's most celebrated living poet, was banished in AD 8 by the emperor Augustus to Tomis, a bleak outpost on the Black Sea, for what he called 'a poem and a mistake.' Power did not imprison or execute him; it simply made him vanish from the city that had crowned him, casting him to the edge of the known world where no one spoke his language and his verses could no longer circulate. In the Tristia, written from exile, he relives his last night in Rome, the tearful farewells, the sense of leaving part of himself behind. The parallel to Luis Manuel Otero Alcántara is direct: a state confronting an inconvenient artist not with an argument but with removal — exile then, disappearance now. Otero, jailed for protesting restrictions on artistic freedom and then vanishing once his sentence ended, is a modern Ovid, a maker of images whom authority would rather have absent than answer. Ovid's lament — that a ruler's word alone could tear a man from his home and fling him beyond the map — reads like a dispatch from Havana two thousand years later.",
        "excerpt": "Cum subit illius tristissima noctis imago,\n     quae mihi supremum tempus in urbe fuit,\ncum repeto noctem, qua tot mihi cara reliqui,\n     labitur ex oculis nunc quoque gutta meis.\niam prope lux aderat, qua me discedere Caesar\n     finibus extremae iusserat Ausoniae.",
        "source": "Ovid, Tristia, Book I, Elegy 3, lines 1–6 (c. AD 9). Latin text via The Latin Library.",
        "href": "https://www.thelatinlibrary.com/ovid/ovid.tristia1.shtml",
        "image": {
          "src": "/covers/cuban-artist-otero-missing--a0.png",
          "alt": "Delacroix, Ovid among the Scythians, showing the exiled poet at the edge of the world",
          "credit": "Eugène Delacroix, Ovide chez les Scythes (1862), Metropolitan Museum of Art — public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In November 1933 the Russian poet Osip Mandelstam composed a sixteen-line epigram mocking Stalin — the 'Kremlin mountaineer' with 'cockroach whiskers' and 'fat fingers' — and recited it to a handful of friends. He never wrote it down; someone informed. Arrested in 1934, exiled, then arrested again in 1938, Mandelstam vanished into the Gulag transit system and died that December in a camp near Vladivostok. His body was thrown into a common pit; the date and place remain uncertain, his grave unmarked. He is the archetype of the poet the state cannot argue with and so must erase — a man made to disappear for the crime of arranging words. The resonance with Luis Manuel Otero Alcántara is sharp: like Mandelstam, Otero was jailed for a work of art the government judged intolerable, and, like Mandelstam, he has now been swallowed by the machinery of the state, his whereabouts unknown, his family and supporters left to petition an unanswering bureaucracy. The NKVD mug shot that survives Mandelstam — a gaunt man staring past the camera — is precisely the image authoritarian power prefers: the artist reduced first to a file, then to silence.",
        "excerpt": "The surviving NKVD arrest photograph shows Mandelstam gaunt and unshaven, his eyes lifted away from the lens, a poet catalogued as a prisoner. His 'Stalin Epigram,' recited but never published, cost him his freedom and finally his life; he died in a transit camp in December 1938 and was buried in an unmarked common grave, the exact date unknown. What survives is not a body but a poem his widow Nadezhda memorized to keep alive.",
        "source": "Osip Mandelstam, 'Stalin Epigram' (composed November 1933); the poet was arrested in 1934 and 1938 and died in a transit camp near Vladivostok in December 1938. NKVD arrest photograph, 1934.",
        "href": "https://commons.wikimedia.org/wiki/File:Osip_Mandelstam_1934.jpg",
        "image": {
          "src": "/covers/cuban-artist-otero-missing--a1.png",
          "alt": "NKVD arrest mug shot of poet Osip Mandelstam, 1934",
          "credit": "NKVD arrest photograph of Osip Mandelstam, 1934 — public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Sophocles' Antigone, first staged around 441 BC, sets a lone young woman against the whole apparatus of the state. Her brother Polynices lies unburied by order of Creon, ruler of Thebes, who has decreed that the 'traitor's' corpse be left to rot as a warning; anyone who honors it will die. Antigone defies him, insisting that a tyrant's edict cannot outrank the 'unwritten and unfailing statutes of heaven.' For this she is walled up alive in a tomb — disappeared, in effect, by a power that would rather bury its critic than confront her. The play is the West's founding drama of conscience against authority, and its terms map onto the case of Luis Manuel Otero Alcántara with unsettling precision: the individual who refuses the state's monopoly on what may be honored and said, the ruler who answers dissent with entombment and erasure, and the community left to reckon with a body it is forbidden to account for. Antigone's demand — that the defiant not simply be made to vanish, and that the state answer for those it has taken — is exactly the demand a rights group now presses upon Havana.",
        "excerpt": "Yes; for it was not Zeus that had published me that edict; not such are the laws set among men by the Justice who dwells with the gods below; nor deemed I that thy decrees were of such force, that a mortal could override the unwritten and unfailing statutes of heaven.",
        "source": "Sophocles, Antigone, lines 450–455, trans. Sir Richard C. Jebb, in The Tragedies of Sophocles (1917).",
        "href": "https://en.wikisource.org/wiki/Tragedies_of_Sophocles_(Jebb_1917)/Antigone",
        "image": {
          "src": "/covers/cuban-artist-otero-missing--a2.png",
          "alt": "Nikiforos Lytras painting of Antigone beside the body of her brother Polynices",
          "credit": "Nikiforos Lytras, Antigone in front of the dead Polynices (1865), National Gallery of Athens — public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Oscar Wilde, the most brilliant playwright of his age, was tried and imprisoned in 1895 under laws that criminalized who he was, and emerged two years later broken in health and reputation. From his cell in Reading Gaol he wrote his last great poem, 'The Ballad of Reading Gaol' (1898), publishing it under his prison number, C.3.3., rather than his famous name — an artist quite literally reduced by the state to a numbered inmate. The ballad watches a condemned man wait to hang and, through him, indicts the whole machinery of punishment that grinds down the caged. Wilde's fate — an artist silenced, humiliated, and unpersoned by the power he had once dazzled — throws the case of Luis Manuel Otero Alcántara into relief: a maker of art jailed not for any act of violence but for offending the guardians of order, his voice replaced by a case number and a cell. The poem's most famous image, the prisoner gazing up at the small scrap of sky, is the universal cry of the confined dissident — the longing for a freedom the state has sealed off overhead.",
        "excerpt": "I never saw a man who looked\n  With such a wistful eye\nUpon that little tent of blue\n  Which prisoners call the sky,\nAnd at every drifting cloud that went\n  With sails of silver by.",
        "source": "Oscar Wilde, 'The Ballad of Reading Gaol' (1898). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/301/301-h/301-h.htm",
        "image": {
          "src": "/covers/cuban-artist-otero-missing--a3.png",
          "alt": "Napoleon Sarony 1882 photographic portrait of Oscar Wilde",
          "credit": "Napoleon Sarony, portrait of Oscar Wilde (1882) — public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's only opera, Fidelio (final version 1814), is music's supreme drama of the disappeared political prisoner. Florestan, a man who 'dared to speak the truth,' has been secretly chained in the dungeon of the tyrant Don Pizarro, who has told the world he is dead; his wife Leonore, disguised as a young man named 'Fidelio,' takes work in the prison to find and free him. At the heart of Act I comes the Prisoners' Chorus, 'O welche Lust,' as the captives are briefly let into the light and sing, trembling, of freedom and air before the guards drive them back into the dark. The opera's engine — a loved one refusing to accept an official silence, searching for a man the state insists is simply gone — is precisely the situation of Luis Manuel Otero Alcántara's family and defenders, who petition a government that will not say where he is. Beethoven, who fought censors and reworked the score across a decade, made Fidelio a hymn to individual conscience against arbitrary power; its final blaze of liberation is the sound of the demand now raised in Havana: produce the vanished man, alive.",
        "excerpt": "In the Act I Prisoners' Chorus the captives shuffle up from the dungeon into daylight and sing, hushed and disbelieving, 'O welche Lust' — what joy to breathe the open air — before the jailers force them back underground. The opera turns on Leonore's refusal to accept that her imprisoned husband is gone, and climaxes as a distant trumpet call announces his rescue. Beethoven built it as an anthem to conscience and liberty against tyranny.",
        "source": "Ludwig van Beethoven, Fidelio, Op. 72 (final version, 1814); libretto by Sonnleithner, Breuning, and Treitschke. Full score, IMSLP.",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/cuban-artist-otero-missing--a4.png",
          "alt": "Joseph Karl Stieler 1820 portrait of Ludwig van Beethoven, composer of Fidelio",
          "credit": "Joseph Karl Stieler, portrait of Beethoven (1820), Beethoven-Haus Bonn — public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Francisco Goya painted The Third of May 1808 in 1814 to commemorate Spaniards executed by Napoleon's soldiers after the Madrid uprising. At its center kneels an anonymous man in a white shirt, arms flung wide, his face lit by a lantern as a faceless rank of soldiers levels their muskets at him; around him lie the already dead and behind him wait those about to fall. Goya refuses the state its usual heroics: there is no glory here, only the machinery of power annihilating the unarmed individual. The painter himself lived under the shadow of authority — deaf, investigated by the Inquisition over his art, and finally exiling himself to France — which makes the canvas both a protest and a self-portrait of the artist against the regime. For the disappearance of Luis Manuel Otero Alcántara, no image is more apt: the lone figure with open arms is every dissident who stands, defenseless and illuminated, before an anonymous apparatus of force. Goya turned an atrocity the powerful wanted forgotten into an image they could never erase — the same act of witness a performance artist like Otero practices, and the same reason the state wants him gone.",
        "excerpt": "A man in a white shirt kneels with his arms thrown wide, blazing in lantern-light before a huddled, faceless firing squad; at his feet lie the freshly shot, and behind him more prisoners cover their eyes. Goya gives the victim a face and the executioners none, turning state violence into an unforgettable indictment. Painted by an artist who had himself been shadowed by the Inquisition, it is protest made permanent, art that authority could not suppress.",
        "source": "Francisco de Goya, The Third of May 1808 (1814), oil on canvas, Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/cuban-artist-otero-missing--a5.png",
          "alt": "Goya, The Third of May 1808, a lone man with arms raised before a firing squad",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado — public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "jpmorgan-first-trillion-dollar-bank",
    "headline": "JPMorgan posts a record $21.2 billion quarterly profit and nears a $1 trillion market value, on track to be the first bank ever worth that much",
    "overview": "JPMorgan Chase reported second-quarter net income of $21.2 billion, the largest quarterly profit in the history of U.S. banking, sending its shares to a record and its market value close to $1 trillion — a threshold no bank has ever reached. Total managed revenue rose 27% from a year earlier to $58 billion, driven by an 86% jump in equity-trading revenue, a 30% rise in investment-banking fees and a $4.6 billion gain on the bank's Visa stake. The results cap Jamie Dimon's two-decade tenure as chief executive and underscore Wall Street's dominance as markets rally.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPb1Y4WHpBM3NITExTaUVQcW5Gc1Z6bXJ1Wk9KREhrMWZhYl8xNURNVmtUc1d2LVdVZ3FIMG00Smo5UXJDZkdSajF1WGp5Ui1fRGVZcjk0NUNyZjJEaE84LTJSUjF5Y3FhNmVyR2tUeUk5Si1pbkJOSURXaWdLRVJZMHJyeVpvempQR0RMVEIxcUV0OVo2dUNCVnhpdWZnMEhHSU95RmhHaTNxLTdsazBzUF9fWEVYNmM1?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxPUXZXdWw0Um15aXgwRy1uU3dobEJIREY5cDItRFd0d2ZvQjRDdXdVdHZJNmtWWmNuVG5hVWlNZmlXaVQ0eWJ2WndSM1JMOGtIQmpWM29XeVR0OVVheFZQNGVfNmhlYldNdjlfLU1MazZLMjJGVmc4TzdvSWRKNnVkRjNJemVxNGtrck5EWVA5c1dWdUdBSW92Y0RBWDRrdms?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/jpmorgan-first-trillion-dollar-bank.png",
      "alt": "The exterior of a large Wall Street bank headquarters tower seen from street level.",
      "credit": "JPMorgan Chase headquarters, New York; CC0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the last decades of the Roman Republic, Marcus Licinius Crassus (c. 115-53 BC) turned private capital into a form of political dominion, amassing a fortune that Plutarch reckoned had swollen from a few hundred talents to more than seven thousand. He built that empire on other people's misfortune, keeping a private brigade of some five hundred trained slaves and buying up buildings the moment they caught fire, so that, as Plutarch drily records, 'the greatest part of Rome, at one time or other, came into his hands.' Wealth on that scale made him one of the three men who effectively owned the Republic, a financier whose money underwrote armies, elections and the careers of ambitious men like Julius Caesar. Contemporaries feared not merely that he was rich but that a single purse had grown large enough to tilt the whole state. JPMorgan's $21.2 billion quarter and its march toward a $1 trillion valuation raise the same ancient unease: when one house controls that much of the system's credit, its private fortune becomes a public fact. Like Crassus profiting from the fires of Rome, the modern colossus often grows largest when markets are most turbulent. The worry then and now is concentration — the sense that one balance sheet has quietly bought up 'the greatest part' of everything.",
        "excerpt": "he made it his practice to buy houses that were on fire, and those in the neighborhood, which, in the immediate danger and uncertainty, the proprietors were willing to part with for little or nothing; so that the greatest part of Rome, at one time or other, came into his hands.",
        "source": "Plutarch, Life of Crassus, ch. 2, trans. John Dryden (rev. A. H. Clough); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Crassus",
        "image": {
          "src": "/covers/jpmorgan-first-trillion-dollar-bank--a0.png",
          "alt": "Marble portrait head identified as Marcus Licinius Crassus, middle of the 1st century BC",
          "credit": "Roman marble head of Marcus Licinius Crassus, 1st century BC; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "When the Scottish financier John Law (1671-1729) took charge of France's finances after the death of Louis XIV, he fused a national bank, a colonial trading monopoly and the royal debt into a single dazzling engine of paper credit — the Mississippi scheme. For a giddy season around 1719-20 his company seemed to be the French economy itself, and all Paris crowded his doors to buy shares. Charles Mackay describes how 'Law, the new Plutus, had become all at once the most important personage of the state,' with peers, judges and bishops queuing in his ante-chambers to beg for stock. It was the first modern demonstration that a single institution could concentrate a nation's credit and, with it, its hopes. The parallel to JPMorgan approaching a $1 trillion valuation is not that Dimon's bank is a bubble — its record $21.2 billion profit is real earnings, not paper fantasy — but the older pattern of one financial house becoming 'the most important personage of the state.' Law's rise showed how quickly the public will treat such an institution as too central to question and too big to fail. His eventual collapse, when the paper turned to nothing, is the cautionary shadow behind every celebration of financial dominance.",
        "excerpt": "Law, the new Plutus, had become all at once the most important personage of the state. The ante-chambers of the Regent were forsaken by the courtiers. Peers, judges, and bishops thronged to the Hotel de Soissons; officers of the army and navy, ladies of title and fashion, and every one to whom hereditary rank or public employ gave a claim to precedence, were to be found waiting in his ante-chambers to beg for a portion of his India stock.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions, 'The Mississippi Scheme' (1841); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm",
        "image": {
          "src": "/covers/jpmorgan-first-trillion-dollar-bank--a1.png",
          "alt": "Portrait of the financier John Law of Lauriston",
          "credit": "Portrait of John Law by Casimir Balthazar; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the seventh circle of Dante's Inferno (composed c. 1308-1320), the poet places the usurers — those who made money breed money — on burning sand beneath a rain of fire, too degraded even to be named. He knows them only by the money-bags hung at their necks, each stamped with a family coat of arms, their eyes fixed downward forever on the wealth they had worshipped in life: 'That from the neck of each there hung a pouch, / Which certain color had, and certain blazon; / And thereupon it seems their eyes are feeding.' For Dante, to profit from lending itself — to let gold generate gold without labor — was a sin against both nature and God. Six centuries later that medieval suspicion of pure finance still flickers whenever a bank posts the largest quarterly profit in the history of its industry. JPMorgan's $21.2 billion, earned largely from the movement of money rather than the making of things, sits squarely in the tradition Dante distrusted. The heraldic purses of his usurers are the distant ancestors of the modern financial brand, worn as a mark of both pride and, to critics, of guilt. The poem is a reminder that awe at great fortunes has always travelled with unease about how they are made.",
        "excerpt": "That from the neck of each there hung a pouch, / Which certain color had, and certain blazon; / And thereupon it seems their eyes are feeding. / And as I gazing round me come among them, / Upon a yellow pouch I azure saw / That had the face and posture of a lion.",
        "source": "Dante Alighieri, Inferno, Canto XVII, trans. Henry Wadsworth Longfellow (1867); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_17",
        "image": {
          "src": "/covers/jpmorgan-first-trillion-dollar-bank--a2.png",
          "alt": "Gustave Doré engraving for Dante's Inferno Canto XVII, the monster Geryon carrying Dante and Virgil down past the usurers into the abyss",
          "credit": "Gustave Doré, engraving for Dante's Inferno, Canto XVII; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Anthony Trollope's 1875 novel The Way We Live Now gave Victorian England its definitive portrait of the omnipotent financier in Augustus Melmotte, a man of murky origins whose supposed genius for money makes all of London court him. Rumour credits him with feats of almost mythic scale — a railway across Russia, the provisioning of armies, cornering the nation's iron — and, more to the point, with the power to 'make or mar any company by buying or selling stock, and ... make money dear or cheap as he pleased.' Dukes dine at his table and a constituency sends him to Parliament, all on the strength of a reputation for limitless wealth that no one quite verifies. Trollope's target was a society that had begun to treat financial power as the highest form of virtue. The satire lands on any era in which a single money-man is deemed able to 'make or mar' the market at will. JPMorgan's approach to a $1 trillion valuation, capping Jamie Dimon's long reign, is the real and reputable version of the fantasy Trollope mocked — a house whose favour genuinely can move companies and rates. The difference is that Melmotte's empire was hollow and Dimon's is not; the resemblance is the worshipful public gaze that gathers around supreme financial power.",
        "excerpt": "It was said that he had made a railway across Russia, that he provisioned the Southern army in the American civil war, that he had supplied Austria with arms, and had at one time bought up all the iron in England. He could make or mar any company by buying or selling stock, and could make money dear or cheap as he pleased.",
        "source": "Anthony Trollope, The Way We Live Now (1875), ch. 4; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm",
        "image": {
          "src": "/covers/jpmorgan-first-trillion-dollar-bank--a3.png",
          "alt": "Title page of the first edition of Anthony Trollope's The Way We Live Now, 1875",
          "credit": "First-edition title page of The Way We Live Now (Chapman and Hall, 1875); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys's The Money Changer and His Wife (1514), painted in the booming Flemish port of Antwerp and now in the Louvre, shows a banker delicately weighing gold coins on a balance while his wife, a devotional book open in her lap, lets her attention drift from the image of the Virgin toward the glittering pile. The picture is one of the first great European images of finance as a way of life, catching the moment a mercantile city was becoming a capital of money. Matsys renders every coin, ring and pearl with miniature precision, and a small convex mirror at the table's edge draws the outside world in toward the gold. It is at once an admiring and a cautionary painting: the scales that weigh money also, by old tradition, weigh the soul. Five centuries later JPMorgan's record $21.2 billion quarter and near-$1 trillion valuation restage the same scene on a planetary scale — the house that weighs the world's gold. Matsys's quiet warning, that devotion can slide toward the balance-scale, is the ancestor of every modern argument about whether finance has grown too central to public life.",
        "excerpt": "A merchant weighs gold coins on a fine balance while his wife, her prayer-book half-forgotten, turns to watch the money; every coin, ring and pearl is painted with jewel-like precision. A small convex mirror at the table's edge gathers in the outside world, drawing it toward the gold. The scales that measure wealth carry an old double meaning — that the same balance will one day weigh the soul.",
        "source": "Quentin Matsys, The Money Changer and His Wife (1514), oil on panel, Musée du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/jpmorgan-first-trillion-dollar-bank--a4.png",
          "alt": "Quentin Matsys's 1514 painting of a money changer weighing gold coins beside his wife, who is reading a prayer book",
          "credit": "Quentin Matsys, The Money Changer and His Wife (1514), Musée du Louvre; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth's early satirical print The South Sea Scheme (1721) was made in the immediate wake of the South Sea Bubble, the speculative frenzy in which shares of a single debt-financing company were bid to absurd heights before collapsing and ruining thousands. Hogarth stages the disaster as a grim carnival: crowds ride a spinning fairground wheel of fortune, a devil hacks the figure of Fortune to pieces and flings the gobbets to the mob, while Honesty is broken on the wheel and Trade lies dead. At the centre stands a mock monument commemorating the destruction of the city by the South Sea in 1720. It is a founding image of Western anxiety about finance grown too large — the moment a single money-machine seemed to swallow a nation's savings. JPMorgan's climb toward a $1 trillion valuation is in one sense the opposite story, a bank celebrated for durable strength rather than a bubble. Yet Hogarth's print endures as the visual conscience of every age of financial dominance, a reminder of how thin the line can feel between a triumphant colossus and a dangerous concentration of power. His crowds scrambling for paper riches are the ancestors of every market caught up in the fortunes of one enormous house.",
        "excerpt": "A satirical London crowd scene: speculators ride a great turning wheel while a devil butchers the figure of Fortune and hurls her flesh to the throng below; Honesty is broken on the wheel and the body of Trade lies dead. At the centre a mock monument records the ruin of the city by the South Sea in 1720, as clergy of rival faiths gamble in the foreground.",
        "source": "William Hogarth, The South Sea Scheme (engraving, 1721).",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_The_South_Sea_Scheme.png",
        "image": {
          "src": "/covers/jpmorgan-first-trillion-dollar-bank--a5.png",
          "alt": "William Hogarth's 1721 satirical engraving The South Sea Scheme, showing crowds on a fairground wheel and a devil dismembering Fortune amid the ruin of the South Sea Bubble",
          "credit": "William Hogarth, The South Sea Scheme (1721); public domain, via Wikimedia Commons"
        }
      }
    ],
    "lead": true,
    "rank": 27
  },
  {
    "slug": "deepseek-74-billion-valuation-ipo",
    "headline": "China's AI startup DeepSeek seeks to raise up to 50 billion yuan at a $74 billion valuation ahead of a planned Shanghai IPO",
    "overview": "DeepSeek, the Hangzhou-based artificial-intelligence company, is preparing a new funding round to raise as much as 50 billion yuan ($6.9 billion) at a valuation of about 500 billion yuan ($74 billion), sources told Reuters, weeks after a June round valued it near 450 billion yuan. The startup has begun early preparations for an initial public offering on Shanghai's Nasdaq-style STAR Market, with an internal target of filing this year. The back-to-back raises reflect strong investor appetite for one of China's most-watched AI firms and the soaring cost of competing for computing power and talent.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxPVDlhV1Zhbi1ieWRUeEJIa3ZIbTh3SF9HanFHeWEwYU05aU9hbUlDTUlCVDlPTjY2TnNtWE0zRGZWX2l6NGhQZnpOZTdGY2dlaWFyN1NFWVJfbTZ1QXdhcUp5ajhEaTZ6SlFwZVlFY2VlS25lb011dHpUQkVHd2lITGg4NlNxMTZNY3NfbVJkYzVrY1puTlRBSkNuNlREYldEVjFQMEUwZjRVSHNsRFRNZ0ozRklGdzZRQ2VnQmtDQi1KNTdzc1NWWWlR?oc=5"
      },
      {
        "name": "TechCrunch",
        "href": "https://techcrunch.com/2026/07/14/deepseek-reportedly-in-talks-to-raise-1-5b-then-ipo/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/deepseek-74-billion-valuation-ipo.png",
      "alt": "Rows of servers in a data center, the computing infrastructure behind large AI models.",
      "credit": "A server-filled data center; CC BY-SA 3.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the winter of 1636-37 the Dutch Republic was seized by \"tulipomania,\" a speculative frenzy in which a single rare bulb could change hands for the price of a fine canal-side house. The chronicler Charles Mackay later described how people \"rushed to the tulip marts, like flies around a honeypot,\" certain the boom would never end. Nobles, farmers, seamen and even chimney-sweeps converted property into cash to buy flowers many of them never saw. Then, in February 1637, confidence cracked, prices collapsed, and paper fortunes built on future promises evaporated within weeks. DeepSeek's reported $74 billion valuation and its planned Shanghai listing sit in the same emotional weather: investors racing to own a slice of a dazzling new technology, convinced demand for it \"would last for ever.\" The parallel is not that AI is worthless — tulips were real flowers, and these models are real software — but that a price can detach from present earnings and float on collective conviction. The tulip trade shows how fast a market will value a bulb, or a startup, on the dream of what everyone imagines the next buyer will pay.",
        "excerpt": "A golden bait hung temptingly out before the people, and, one after the other, they rushed to the tulip marts, like flies around a honeypot. Every one imagined that the passion for tulips would last for ever, and that the wealthy from every part of the world would send to Holland, and pay whatever prices were asked for them. … Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), \"The Tulipomania,\" via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm",
        "image": {
          "src": "/covers/deepseek-74-billion-valuation-ipo--a0.png",
          "alt": "A 17th-century watercolour of the striped 'Semper Augustus,' the most coveted tulip of the Dutch mania.",
          "credit": "Anonymous 17th-century watercolour of the 'Semper Augustus' tulip; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "When gold was found at Sutter's Mill in 1848, word spread until, by 1849, roughly ninety thousand \"forty-niners\" abandoned farms, shops and ships to chase fortune in California. The historian Stewart Edward White wrote that \"every man with a drop of red blood in his veins wanted to go to California,\" even though it \"cost a great deal of money\" to get there and to work a claim. The most reliable winners were often not the diggers but the merchants who sold them passage, shovels and provisions at ruinous prices. DeepSeek's fundraising unfolds inside a comparable rush, where the scarce \"gold\" is computing power and elite AI talent, and the picks-and-shovels sellers are the chipmakers and data-center builders commanding sky-high prices. The company is raising up to 50 billion yuan precisely because staking a claim in this field has grown staggeringly expensive. Like the Gold Rush, the excitement is real and a few will strike it rich, but the cost of entry keeps climbing faster than most can dig. It is a reminder that in a boom, the surest money is frequently made supplying the miners rather than panning the stream.",
        "excerpt": "Every man with a drop of red blood in his veins wanted to go to California. But the journey was a long one, and it cost a great deal of money, and there were such things as ties of family or business impossible to shake off.",
        "source": "Stewart Edward White, The Forty-Niners: A Chronicle of the California Trail and El Dorado (1918), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/12764/pg12764-images.html",
        "image": {
          "src": "/covers/deepseek-74-billion-valuation-ipo--a1.png",
          "alt": "A painting of gold miners working a claim in the Sierra Nevada during the California Gold Rush.",
          "credit": "Charles Christian Nahl & Frederick August Wenderoth, 'Miners in the Sierras' (1851-52), Smithsonian American Art Museum; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Mary Shelley's Frankenstein (1818), pointedly subtitled \"The Modern Prometheus,\" follows a brilliant young researcher who assembles a living, thinking being from inert matter. Before the disaster, Victor Frankenstein is intoxicated by the promise of his work, resolving to \"break through\" the bounds of life and death and \"pour a torrent of light into our dark world.\" He imagines that \"a new species would bless me as its creator and source,\" certain his invention will win him gratitude and glory. DeepSeek, building machines that reason and generate language, is engaged in its own act of artificial creation, and its investors are buying into a strikingly similar dream of pouring light into the world. Shelley's warning is not that creation is evil but that its costs — financial, moral, human — tend to arrive after the first rush of triumph has faded. The novel keeps asking who bears responsibility when a made intelligence exceeds its maker's control, a question that hangs over every frontier AI lab. A $74 billion valuation is, in the end, a bet that this modern Prometheus can bring fire without anyone getting burned.",
        "excerpt": "Life and death appeared to me ideal bounds, which I should first break through, and pour a torrent of light into our dark world. A new species would bless me as its creator and source; many happy and excellent natures would owe their being to me.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
        "image": {
          "src": "/covers/deepseek-74-billion-valuation-ipo--a2.png",
          "alt": "Theodor von Holst's 1831 frontispiece to Frankenstein, showing Victor recoiling from his newly animated creature.",
          "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Karel Čapek's 1920 play R.U.R. gave the world the word \"robot,\" imagining a factory that mass-produces artificial workers cheaper and more efficient than any human. The manager Domin boasts that the Robots \"are not people\" — \"mechanically they are more perfect than we are; they have an enormously developed intelligence, but they have no soul.\" The company's own placards read \"Robots cheapest Labor,\" and industrialists and investors pour in, dazzled by the promise of tireless manufactured minds. That is nearly a century-old blueprint for the pitch around DeepSeek: build thinking machines of \"enormously developed intelligence\" and sell their labor at scale. In the play the enterprise commands soaring value right up until the created intelligences outgrow the purposes assigned to them. R.U.R. is less a prophecy of doom than a caution that treating manufactured minds purely as cheap, soulless labor invites consequences no balance sheet anticipates. DeepSeek's IPO capitalizes exactly the promise — and inherits exactly the unease — that Čapek dramatized in 1920.",
        "excerpt": "My dear Miss Glory, the Robots are not people. Mechanically they are more perfect than we are; they have an enormously developed intelligence, but they have no soul.",
        "source": "Karel Čapek, R.U.R. (Rossum's Universal Robots), trans. Paul Selver (1923), Act One, via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm",
        "image": {
          "src": "/covers/deepseek-74-billion-valuation-ipo--a3.png",
          "alt": "A scene from the original production of Karel Čapek's R.U.R., showing three manufactured robots.",
          "credit": "Scene from R.U.R. (Rossum's Universal Robots), 1921 production; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Around 1771 the English painter Joseph Wright of Derby produced \"The Alchymist, in Search of the Philosopher's Stone, Discovers Phosphorus,\" now in Derby Museum and Art Gallery. In a vast Gothic chamber an aged alchemist kneels before a great glowing flask, arms flung wide, as the substance he has conjured floods the darkness with an unearthly white light and his young assistants shrink back from the glare. Wright, the great painter of the Enlightenment's fascination with science, stages discovery as something between miracle and obsession: a seeker who has poured his life and fortune into wresting a transformative power out of base matter. It is an almost perfect emblem for the frenzy around DeepSeek, a company betting billions that it can distill a new kind of intelligence and, with it, remake the world. The alchemist's rapt, kneeling figure captures the mix of genuine breakthrough and speculative mania that a $74 billion valuation embodies. Wright leaves the outcome ambiguous, the light dazzling but the room still dark at its edges. His picture asks the question every AI investor is really asking: is this the philosopher's stone at last, or one more seeker dazzled by his own flask?",
        "excerpt": "In a cavernous, cathedral-like laboratory an old alchemist kneels before a towering glass retort that blazes with a cold white light, his arms thrown open in wonder as the newly discovered phosphorus glows; two assistants recoil at their bench while moonlight filters through a great arched window. Wright turns a scientific discovery into a near-religious vision, the solitary seeker illuminated by the very substance he has conjured out of darkness.",
        "source": "Joseph Wright of Derby, The Alchymist, in Search of the Philosopher's Stone, Discovers Phosphorus (1771, reworked 1795), Derby Museum and Art Gallery.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_of_Derby_The_Alchemist.jpg",
        "image": {
          "src": "/covers/deepseek-74-billion-valuation-ipo--a4.png",
          "alt": "Joseph Wright of Derby's painting of an alchemist kneeling before a glowing flask as he discovers phosphorus in a dark vaulted chamber.",
          "credit": "Joseph Wright of Derby, 'The Alchymist ... Discovers Phosphorus' (1771), Derby Museum and Art Gallery; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas's orchestral scherzo \"L'apprenti sorcier\" (\"The Sorcerer's Apprentice,\" 1897) sets Goethe's ballad in which a novice enchants a broom to haul water, then finds he cannot make it stop. Dukas's music — later immortalized in Disney's Fantasia — grows from a mischievous, bubbling theme into a churning flood as the bewitched broom, chopped in two, only multiplies and redoubles its work. It is a near-perfect sonic image of an automated helper that scales beyond its creator's command, precisely the fear now voiced about rapidly advancing AI. DeepSeek and its backers are, in a sense, apprentices summoning a powerful new force and wagering that they can direct it and profit from it. The score's genius is how delight tips into panic without a single wasted note, mirroring the thin line between AI's promise and its runaway costs. Goethe's apprentice is finally rescued by the returning master; the open question for today's AI boom is who, if anyone, plays that part. A $74 billion valuation assumes the enchantment can be both controlled and monetized.",
        "excerpt": "A mischievous, bubbling scherzo that swells into a churning orchestral flood as the enchanted broom multiplies beyond control, bassoon and brass surging until the returning master abruptly cuts the spell. The music captures, without a single word, the exhilaration and terror of a helper that will not stop working.",
        "source": "Paul Dukas, L'apprenti sorcier (1897), full orchestral score, via IMSLP.",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/deepseek-74-billion-valuation-ipo--a5.png",
          "alt": "Ferdinand Barth's 1882 illustration of Goethe's sorcerer's apprentice overwhelmed by the water he conjured.",
          "credit": "Ferdinand Barth, illustration for Goethe's 'Der Zauberlehrling' (1882); public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "france-assisted-dying-final-approval",
    "headline": "France's National Assembly gives final approval to a law legalizing medically assisted dying for adults with incurable illnesses",
    "overview": "France's National Assembly gave final approval on Wednesday to a law allowing adults with incurable, life-threatening illnesses to receive lethal medication they administer themselves, ending more than three years of debate over end-of-life care. The lower house had the final say after the conservative-led Senate rejected the measure; patients must be at least 18, French citizens or legal residents, and psychological suffering alone does not qualify. Senate President Gerard Larcher said he would refer the law to the Constitutional Council, which has up to a month to rule before it can take effect.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxPOVdNNGFZU0lwZzN1UUtfQlNSbWxFRWdrMUQ1blNPUGxSNVRHWDBZWTY1SHBNdHkwZWFPQUhYY0pnRUpmVUhYUjRKYXVQMzRPbGpFS2FmeURmZ2labzQ1alJ1dHhGM01iV0xpWnhxdUpvcHRTaDYzdGxUZ0p4bVNXVjVtdWVPRXF6YWtXSXJFcFdLOUJJX2k3Ymw3aTR4TmdpR0Y5clVpaDAtMjQ?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://www.france24.com/en/france/20260715-france-expected-to-pass-final-vote-on-assisted-dying-after-years-of-debate"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/france-assisted-dying-final-approval.png",
      "alt": "The domed neoclassical facade of France's National Assembly, the Palais Bourbon, in Paris.",
      "credit": "North facade of the Palais Bourbon (French National Assembly), Paris; CC BY 2.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 399 BC an Athenian court condemned the philosopher Socrates to death for impiety and 'corrupting the youth,' and the sentence was carried out by his own hand: he was to drink a cup of ground hemlock. Plato's Phaedo, told by an eyewitness, records how the jailer brought in the poison and Socrates, calm and unafraid, took the cup 'quite readily and cheerfully' and drank it off while his friends wept. He walked until his legs grew heavy, then lay down as the cold numbness climbed from his feet toward his heart, discoursing on the soul to the last. For more than two millennia this scene has been the West's founding image of a composed, self-administered death, met by choice and reason rather than dread. France's new law turns on the very act Socrates performed: a competent, suffering adult may self-administer the lethal medication. What was once an execution accepted with philosophical calm has become, in the French statute, a right the dying person claims for himself, the cup lifted by one's own hand, but now in the name of mercy and autonomy rather than punishment.",
        "excerpt": "Then holding the cup to his lips, quite readily and cheerfully he drank off the poison. And hitherto most of us had been able to control our sorrow; but now when we saw him drinking, and saw too that he had finished the draught, we could no longer forbear... Crito, I owe a cock to Asclepius; will you remember to pay the debt?",
        "source": "Plato, Phaedo (c. 360 BC), trans. Benjamin Jowett, public domain.",
        "href": "https://people.bu.edu/wwildman/courses/wphil/readings/wphil_rdg01b_phaedo_afterlife.htm",
        "image": {
          "src": "/covers/france-assisted-dying-final-approval--a0.png",
          "alt": "Roman marble bust of Socrates in the Louvre Museum",
          "credit": "Bust of Socrates, Roman copy after a Greek original, Musée du Louvre; photograph by Eric Gaba (Sting), CC BY-SA 2.5, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Ninety years before the French vote, another national legislature confronted the same question and answered no. On 1 December 1936 the House of Lords debated the Voluntary Euthanasia (Legalisation) Bill, introduced by Arthur Ponsonby, 1st Baron Ponsonby of Shulbrede, the first bill of its kind ever to reach a British Parliament. It proposed that a competent adult suffering from an incurable, fatal disease might, after inquiry and safeguards, receive help to die. Ponsonby pressed the peers with the language of compassion, insisting the country should be 'as merciful with one another as we are to our own animals,' and that the bill did not fling open the gates of death but only lifted a latch: 'We are not opening any door, we are merely unlocking it.' The Lords were unmoved; the measure was 'Resolved in the negative,' killed by the old device of postponing its second reading by six months, and that defeat set the pattern for decades of failed British attempts. France's National Assembly has now done what Ponsonby could not persuade the Lords to do, turning the argument from mercy into law. It shows how a proposal once dismissed as unthinkable can, given time, cross from rejection into statute.",
        "excerpt": "We want to be as merciful with one another as we are to our own animals... We are not opening any door, we are merely unlocking it... Resolved in the negative, and Bill to be read 2a this day six months.",
        "source": "Lord Ponsonby, Voluntary Euthanasia (Legalisation) Bill debate, House of Lords, Hansard, 1 December 1936.",
        "href": "https://api.parliament.uk/historic-hansard/lords/1936/dec/01/voluntary-euthanasia-legalisation-bill-hl",
        "image": {
          "src": "/covers/france-assisted-dying-final-approval--a1.png",
          "alt": "Ornate interior of the House of Lords, Palace of Westminster, c. 1901–1919",
          "credit": "The Royal Gallery, House of Lords, Palace of Westminster; George Grantham Bain Collection, Library of Congress, no known copyright restrictions, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Around 1600 Shakespeare gave the English stage its most famous meditation on the choice to end one's own suffering. In Act III of Hamlet the grieving prince weighs 'to be, or not to be,' asking whether it is nobler to endure 'the slings and arrows of outrageous fortune' or to seek release, noting that a person might 'his quietus make / With a bare bodkin', settle his account with life using a mere dagger. What stays his hand is not law or love but fear of the unknown: 'the dread of something after death, / The undiscover'd country from whose bourn / No traveller returns.' The soliloquy frames dying as a decision a suffering human might rationally make, and names the terror that has always shadowed it. France's debate ran along the same fault line, between the wish to escape unbearable suffering and society's dread of sanctioning a self-chosen death. The new law, in effect, answers Hamlet's question for the incurably ill, permitting them to make their 'quietus', but under medical supervision, with safeguards, and by their own consenting hand rather than in solitary despair.",
        "excerpt": "When he himself might his quietus make / With a bare bodkin? who would fardels bear, / To grunt and sweat under a weary life, / But that the dread of something after death, / The undiscover'd country from whose bourn / No traveller returns, puzzles the will / And makes us rather bear those ills we have / Than fly to others that we know not of?",
        "source": "William Shakespeare, Hamlet, Act III, Scene 1 (c. 1600), public domain.",
        "href": "https://shakespeare.mit.edu/hamlet/hamlet.3.1.html",
        "image": {
          "src": "/covers/france-assisted-dying-final-approval--a2.png",
          "alt": "Eugène Delacroix, Hamlet and Horatio in the Graveyard, 1839",
          "credit": "Eugène Delacroix, Hamlet and Horatio in the Graveyard (1839), Musée du Louvre, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the 1580s the French essayist Michel de Montaigne devoted an entire essay, 'A Custom of the Isle of Cea,' to the oldest form of this debate: whether a person may lawfully choose death to escape intolerable suffering. Writing in an age steeped in Stoic and classical example, he argued that 'pain and the fear of a worse death seem to me the most excusable incitements' to end one's life, and that 'living is slavery if the liberty of dying be lacking.' In a strikingly clinical passage he compares medicine's brutal remedies, its caustics, incisions and amputations, to the final cure, asking why the jugular vein is not as much at our disposal as the vein a doctor opens: 'For a desperate disease a desperate cure.' Montaigne, a Frenchman, thus put into plain prose four centuries ago the exact claim now written into French law: that liberty over one's own death can be a mercy, especially when illness is incurable and pain unbearable. Where he could only argue the point in an essay hedged with ancient anecdote, the National Assembly has enacted it, transforming a Renaissance meditation on the 'liberty of dying' into a regulated legal right for the terminally ill.",
        "excerpt": "Pain and the fear of a worse death seem to me the most excusable incitements... Living is slavery if the liberty of dying be lacking... Why is not the jugular vein as much at our disposal as the median vein? For a desperate disease a desperate cure.",
        "source": "Michel de Montaigne, 'A Custom of the Isle of Cea,' Essays, Book II, Ch. 3 (1580), trans. Charles Cotton, public domain.",
        "href": "https://monadnock.net/montaigne/cea2.html",
        "image": {
          "src": "/covers/france-assisted-dying-final-approval--a3.png",
          "alt": "Portrait of Michel de Montaigne, 19th-century lithograph",
          "credit": "Michel de Montaigne, lithograph by Antoine Maurin after an earlier portrait, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In 1787, on the eve of the French Revolution, Jacques-Louis David painted 'The Death of Socrates,' now one of the treasures of the Metropolitan Museum of Art. It shows the philosopher upright on his deathbed, one hand reaching for the cup of hemlock without even looking at it, the other raised mid-argument as he calmly instructs his distraught disciples: death approached as a rational, dignified act of will. David, the great painter of French Neoclassicism, made the scene a lesson in facing death with composure and principle, the very ideal invoked in modern debates over the 'good death' and dignity. That a French master gave Europe its defining picture of a serene, self-administered death lends a peculiar resonance to France's own decision, centuries later, to legalize medically assisted dying. David's Socrates reaches for the cup by choice; the new law extends a version of that gesture, the deliberate, self-administered acceptance of death, to ordinary citizens facing incurable illness. The painting's calm, luminous figure stands as the artistic ancestor of the dignified death the statute claims to protect.",
        "excerpt": "David depicts Socrates half-risen on his couch, one finger pointing upward as he discourses on the soul, while reaching almost absent-mindedly for the poisoned cup a grief-stricken disciple holds out. The mourners recoil and weep; the philosopher alone is serene, upright and unafraid. The composition transfigures a state execution into an image of chosen, reasoned, dignified death.",
        "source": "Jacques-Louis David, The Death of Socrates, 1787, oil on canvas, The Metropolitan Museum of Art (accession 31.45).",
        "href": "https://www.metmuseum.org/art/collection/search/436105",
        "image": {
          "src": "/covers/france-assisted-dying-final-approval--a4.png",
          "alt": "Jacques-Louis David, The Death of Socrates, 1787, oil on canvas",
          "credit": "Jacques-Louis David, The Death of Socrates (1787), The Metropolitan Museum of Art, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Long before any parliament legislated the end of life, late-medieval Europe had its own manual for it: the Ars moriendi, or 'Art of Dying,' a genre of illustrated guides teaching Christians how to die well. Around 1450 the German engraver known only as Master E.S. produced a celebrated set of images for this tradition, including the scene catalogued as L.175, now in the Ashmolean Museum, which shows a dying man in his bed besieged by demons tempting him to lose his faith while holy figures attend to steady him. For centuries the 'good death' meant precisely this: a scripted spiritual ordeal, governed by the Church, in which the dying soul was coached, watched and fought over at the bedside. France's law is in one sense a secular rewriting of that same impulse to manage and dignify the deathbed, but it moves the authorship of the 'good death' from priest and doctrine to the individual and the state. Where Master E.S. framed dying as a test of faith to be endured, the new statute frames it as a suffering to be relieved, even ended, at the patient's own request. The recurring human wish behind both is the same: that the moment of death be met with dignity, and not in abandonment or terror.",
        "excerpt": "The engraving shows the dying man laid out in his curtained bed as grotesque devils crowd around him, thrusting temptations toward his faltering faith, while consoling holy figures gather at the bedside to fortify him. It belongs to a paired sequence in which each temptation is answered by grace, meant to guide the viewer through the ordeal of a 'good death.' Master E.S.'s fine, nervous line makes the deathbed a crowded battlefield for the soul.",
        "source": "Master E.S., Ars moriendi: The Temptation to Lack of Faith (L.175), engraving, c. 1450, Ashmolean Museum, University of Oxford.",
        "href": "https://commons.wikimedia.org/wiki/File:Ars_moriendi_(Meister_E.S.),_L.175.png",
        "image": {
          "src": "/covers/france-assisted-dying-final-approval--a5.png",
          "alt": "Master E.S., Ars moriendi engraving showing a dying man tempted at his bedside, c. 1450",
          "credit": "Master E.S., Ars moriendi (L.175), c. 1450, Ashmolean Museum, University of Oxford, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "us-russian-crew-arrives-iss",
    "headline": "A U.S.-Russian crew of three docks at the International Space Station aboard a Soyuz for an eight-month mission",
    "overview": "NASA astronaut Anil Menon and Roscosmos cosmonauts Pyotr Dubrov and Anna Kikina docked at the International Space Station on Tuesday, about three hours after launching aboard the Soyuz MS-29 from the Baikonur cosmodrome in Kazakhstan for an eight-month stay. NASA Administrator Jared Isaacman attended the launch, the first visit to Baikonur by a NASA chief in eight years, in a display of continued U.S.-Russian cooperation in orbit despite tensions over Ukraine. The trio joined a multinational crew already aboard the orbiting laboratory.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOT2VYRThvemphNGNTU3RCaFItVGVnQUtIVnQ1WmFBeTI0YW5iOVkzNTVERnhYanphV19QUUhVQ2xXSkRSRkVvbDRKX3hMd2Y3QlQxSms2ZlVUZWVzaEJ6WS1vX0hHU1ltcmZKRG5DZklmcWNjME9xSEhnWTRNMXNhNHdsTndjSlBBZHNqZTFvbllWcWRPZFo1dGhMbkdpZjl1WC1rS1pR?oc=5"
      },
      {
        "name": "Phys.org",
        "href": "https://phys.org/news/2026-07-russian-crew-blast-month-stint.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/us-russian-crew-arrives-iss.png",
      "alt": "The International Space Station in orbit above Earth, its solar arrays lit by sunlight.",
      "credit": "The International Space Station, photographed from a departing Crew Dragon; NASA, public domain, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On July 17, 1975, at the height of the Cold War, an American Apollo capsule and a Soviet Soyuz eased together in orbit and latched, and mission commanders Thomas Stafford and Alexei Leonov clasped hands through the open hatch in the first international handshake in space. The Apollo-Soyuz Test Project had launched a NASA crew from Florida and a Soviet crew from Baikonur within hours of each other; for two days the rivals in the space race shared meals, swapped gifts, and ran joint experiments while their governments jockeyed everywhere else on Earth. President Ford telephoned from the White House and Leonid Brezhnev cabled congratulations, each side eager to claim the glow of detente. The gesture was deliberately symbolic: two systems that aimed missiles at each other choosing, for a moment, to aim spacecraft at the same goal. That same choreography repeats in this launch, where a NASA astronaut and two Roscosmos cosmonauts rode a single Soyuz from Baikonur to the ISS for an eight-month stay. As in 1975, the cooperation stands out precisely because the tensions below—now over Ukraine—make the shared endeavor above so pointed. The docking ring that once seemed a diplomatic prop is now routine plumbing, but the meaning is unchanged: adversaries still \"shaking hands\" where the air runs out.",
        "excerpt": "Stafford and Leonov met at the interface and shook hands, with Leonov saying, \"Very good to see you!\" and Stafford replying (in Russian), \"Very happy, my friend!\"",
        "source": "NASA History, \"45 Years Ago: Historic Handshake in Space\" (2020)",
        "href": "https://www.nasa.gov/history/45-years-ago-historic-handshake-in-space/",
        "image": {
          "src": "/covers/us-russian-crew-arrives-iss--a0.png",
          "alt": "Astronaut Thomas Stafford and cosmonaut Alexei Leonov shake hands in the docking tunnel between Apollo and Soyuz, 1975.",
          "credit": "NASA, Apollo-Soyuz Test Project, 1975, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In March 1779, with Britain and its rebelling American colonies locked in war, Benjamin Franklin—then the young republic's minister in Paris—wrote an extraordinary safe-conduct addressed \"To all Captains and Commanders of armed Ships\" sailing under Congress's flag. Learning that the celebrated navigator Captain James Cook was expected home from a voyage of Pacific discovery, Franklin ordered American privateers not to seize the explorer's ship but to treat Cook and his people \"with all civility and kindness ... as common friends to mankind.\" Franklin reasoned that discovery enlarged \"the benefit of mankind in general\" and should stand above the quarrels of nations. It was a striking carve-out: even as the two sides fought, science was to pass unmolested through the lines. (Unknown to Franklin, Cook had already been killed in Hawaii a month earlier.) The parallel to this mission is direct—Washington and Moscow are at bitter odds over Ukraine, yet they keep open a lane of cooperation for a shared voyage of exploration. A NASA astronaut and two cosmonauts flying one Soyuz to an eight-month tour aboard the ISS are the modern \"common friends to mankind,\" shielded by the same logic Franklin set down: that the pursuit of knowledge deserves a truce of its own.",
        "excerpt": "you would not consider her as an enemy, nor suffer any plunder to be made of the effects contained in her, nor obstruct her immediate return to England ... but that you would treat the said Captain Cook and his people with all civility and kindness, affording them, as common friends to mankind, all the assistance in your power, which they may happen to stand in need of.",
        "source": "Benjamin Franklin, passport \"To all Captains and Commanders of armed Ships,\" Passy, 10 March 1779 (The Papers of Benjamin Franklin, Founders Online, National Archives)",
        "href": "https://founders.archives.gov/documents/Franklin/01-29-02-0057",
        "image": {
          "src": "/covers/us-russian-crew-arrives-iss--a1.png",
          "alt": "Portrait of Captain James Cook in naval uniform, seated with a chart, by Nathaniel Dance-Holland.",
          "credit": "Portrait of Captain James Cook by Nathaniel Dance-Holland, c.1775, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The oldest warning about human ascent comes from Ovid's Metamorphoses (c. 8 CE), where the master craftsman Daedalus, imprisoned on Crete, builds wings of feathers and wax to carry himself and his son Icarus into the sky. Before they launch, Daedalus fits the wings and counsels moderation—to \"keep the middle tract,\" neither so low that the sea clogs the feathers nor so high that the sun melts the wax. For a time father and son fly like gods, astonishing the ploughman and shepherd below, until the boy, \"pleased with a bolder flight,\" soars too near the sun, the wax melts, and he falls into the sea that still bears his name. The tale fuses the two poles of this event: the exhilarating human reach into the heavens and the ever-present danger of the medium that makes it possible. A U.S.-Russian crew launching from Baikonur and living eight months in orbit is Daedalus's dream fully realized—flight sustained not by wax but by engineering and, crucially, by cooperation. Yet Ovid's caution still hovers: spaceflight remains an art in which the \"middle tract\" between ambition and catastrophe must be held with care, and in which partners must fly, as father and son did, in trust of one another.",
        "excerpt": "After the finishing hand was put to the work, the workman himself poised his own body upon the two wings, and hung suspended in the beaten air. He provided his son with them as well; and said to him, \"Icarus, I recommend thee to keep the middle tract; lest, if thou shouldst go too low, the water should clog thy wings; if too high, the fire of the sun should scorch them.\"",
        "source": "Ovid, Metamorphoses, Book VIII (Henry T. Riley translation, 1851), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm",
        "image": {
          "src": "/covers/us-russian-crew-arrives-iss--a2.png",
          "alt": "Daedalus fastening wings to the shoulder of the young Icarus, oil painting by Anthony van Dyck.",
          "credit": "Daedalus and Icarus by Anthony van Dyck, c.1620, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson wrote \"Ulysses\" in 1833 and published it in 1842, giving voice to the aged Greek hero who, home at last in Ithaca, cannot rest and yearns to sail once more \"beyond the sunset.\" The poem is the great English anthem of the long voyage into the unknown: Ulysses gathers his mariners for one more passage across uncharted seas, insisting that \"that which we are, we are\"—an equal temper of heroic hearts \"made weak by time and fate, but strong in will.\" It is exploration framed not as conquest but as the restless human refusal to stand still. An eight-month expedition to the International Space Station answers the same call, trading Ithaca's harbor for a launch pad at Baikonur and the wine-dark sea for the vacuum overhead. Ulysses' crew are aging comrades bound by a shared purpose that outlasts their differences, much as an American astronaut and two Russian cosmonauts set aside the enmity of their governments to press on together. Tennyson's closing vow—\"to strive, to seek, to find, and not to yield\"—reads like a mission statement for a partnership that endures even as the world below fractures.",
        "excerpt": "Tho' much is taken, much abides; and tho' / We are not now that strength which in old days / Moved earth and heaven; that which we are, we are; / One equal temper of heroic hearts, / Made weak by time and fate, but strong in will / To strive, to seek, to find, and not to yield.",
        "source": "Alfred, Lord Tennyson, \"Ulysses\" (1842), Wikisource",
        "href": "https://en.wikisource.org/wiki/Ulysses_(Tennyson)",
        "image": {
          "src": "/covers/us-russian-crew-arrives-iss--a3.png",
          "alt": "Photographic portrait of the poet Alfred Tennyson, bearded and cloaked, by Julia Margaret Cameron.",
          "credit": "Alfred Tennyson photographed by Julia Margaret Cameron, 1869, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Around the 1560s, from the circle of Pieter Bruegel the Elder, came \"Landscape with the Fall of Icarus,\" now in the Royal Museums of Fine Arts of Belgium in Brussels. It is one of art's great sleights of hand: a broad, sunlit seascape dominated by a ploughman turning his furrow, a shepherd gazing skyward, and a fine ship in full sail—while in the lower right, almost invisible, two pale legs kick above the water, all that remains of Icarus after his fall. The disaster is real but marginal; the world simply carries on, indifferent. For this event the painting works as both echo and counterpoint. On one hand it is the same Icarian sky into which these astronauts climb, a reminder of how thin the line is between soaring and plunging. On the other, its lesson about human indifference is exactly what this mission overturns: two rival nations, far from letting a shared venture drown unnoticed, deliberately keep their eyes fixed on it. The Soyuz docking is the anti-Icarus—flight watched, tended, and shared, not ignored.",
        "excerpt": "A wide, luminous coastal landscape fills the panel: a ploughman leans into his furrow, a shepherd looks up at the sky, and a merchant ship glides out to sea under full sail. Only in the lower-right corner does the tragedy appear—a pair of flailing legs vanishing into the green water, the last of Icarus after his plunge from the sun. Everything else in the scene proceeds, serene and unheeding, as if nothing has happened.",
        "source": "Landscape with the Fall of Icarus (after Pieter Bruegel the Elder), c.1560s, Royal Museums of Fine Arts of Belgium, Brussels",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/us-russian-crew-arrives-iss--a4.png",
          "alt": "Sunlit seascape with a ploughman, shepherd and sailing ship; Icarus's legs disappear into the sea at lower right.",
          "credit": "Landscape with the Fall of Icarus, after Pieter Bruegel the Elder, Royal Museums of Fine Arts of Belgium, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Between 1914 and 1917 the English composer Gustav Holst wrote 'The Planets,' a seven-movement orchestral suite that has become the modern world's grandest musical vision of the cosmos. Holst gave each planet a character, from the hammering menace of 'Mars, the Bringer of War' to the broad, hymn-like nobility of 'Jupiter,' closing with 'Neptune, the Mystic,' where a wordless offstage women's chorus fades into silence as if the music itself were drifting out past the edge of the solar system. Though he took his scheme from astrology, the suite fixed in sound humanity's yearning to reach beyond the Earth and imagine the worlds overhead. Its sweep is the perfect accompaniment to a crew launching from Baikonur to live eight months in orbit, actually inhabiting the heavens Holst could only conjure. Where 'Mars' evokes the earthly conflicts, over Ukraine and elsewhere, that shadow the mission, the serene close of 'Neptune' answers with the calm of space itself. Holst's fading chorus, receding into nothing, is the sound of the human voice carried farther from home than ever before, exactly the horizon these astronauts now cross together.",
        "excerpt": "A seven-movement suite that paints the planets in sound: 'Mars' pounds in relentless five-beat menace, 'Venus' answers in hushed calm, 'Jupiter' swells into a broad noble hymn, and 'Neptune, the Mystic' dissolves into a wordless offstage chorus that fades to silence as if the orchestra were vanishing into deep space. Holst gives orchestral form to humanity's oldest impulse to look up and imagine the worlds beyond our own.",
        "source": "Gustav Holst, The Planets, Op. 32 (1914-1917); full score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/us-russian-crew-arrives-iss--a5.png",
          "alt": "A 1901 portrait photograph of the English composer Gustav Holst, who wrote the orchestral suite The Planets.",
          "credit": "Portrait of Gustav Holst, 1901; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "ebola-congo-cases-exceed-2000",
    "headline": "Ebola cases in eastern Congo pass 2,000 with 754 deaths as health workers strike over unpaid wages",
    "overview": "The Ebola outbreak in the eastern Democratic Republic of Congo has surpassed 2,000 confirmed cases and 754 deaths, the fastest-growing outbreak of the virus on record, health officials said, as the epidemic spreads faster than responders can trace it. Additional health workers walked off the job this week over unpaid salaries and hazard pay, hampering containment in a region already destabilized by armed conflict. The World Health Organization has warned that insecurity and funding gaps are undermining the response.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxNN25mbGtRWE41clEwTkJBaDVkTE5XZVNFSDhXU0puWjlHRXh0aWgwNEtfRklIS3ctaHprMHd1bnd2TDdiSVQzNEppRDAzc3lZS0RSNVlYSkI4VEV2RlJmbFlvNHJVREg0MDY4UUZQUjZOSmIyVm83TmxTMUtENWhnRzI5dFhOdjloSEFhVDNPdkdGcU1CTEhBYTAtYw?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxPSlRhVlF1dDlRcXVHeWpuMDBfdlZRSmx2VE4yeEdTb0JpUU40UklhMkxGaGxIaVpTVFluZW9TZjBmSnU5ZjFrcUQ0Qzh1eDBBRVdwWWNqLUVDUGgxRXdTcklfTzNPZk1UWDVLcHpDQzhsNjdiUTkyUE1KX05ZeE9MMHFPTGQwT3ZDQnQxQw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/ebola-congo-cases-exceed-2000.png",
      "alt": "A health worker in full protective gear during an Ebola response in Central Africa.",
      "credit": "An Ebola treatment unit in West Africa; U.S. Army photo, public domain, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 430 BC, in the second summer of the Peloponnesian War, a mysterious pestilence tore through an Athens swollen with refugees packed behind its walls. Thucydides, who caught the disease and survived, wrote the first great clinical account of an epidemic in Western literature, and he noticed a terrible pattern: the healers died first. \"The physicians\" were helpless and \"died themselves the most thickly, as they visited the sick most often,\" until many stopped coming altogether and the sick perished untended. As the bodies outran the living's capacity to bury them, Thucydides watched law, religion, and ordinary decency dissolve into a lawless fatalism. This is the oldest template for what is unfolding in eastern Congo: an outbreak that spreads faster than responders can cope, and a corps of caregivers being thinned out and driven off the very front line where they are needed most. When the people meant to fight a plague fall or withdraw, the disease, as at Athens, \"passed all bounds.\" The strike over unpaid wages is the modern echo of physicians who \"visited the sick most often\" and had nothing left to give.",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (trans. Richard Crawley), c. 430 BC — the Plague of Athens.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/ebola-congo-cases-exceed-2000--a0.png",
          "alt": "Michiel Sweerts, 'Plague in an Ancient City' (c. 1652), a scene widely read as the Plague of Athens, with bodies and mourners strewn through a classical square.",
          "credit": "Michiel Sweerts, 'Plague in an Ancient City,' Los Angeles County Museum of Art (LACMA), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In late August 1854, cholera exploded around a single water pump on Broad Street in the Soho district of London. The physician John Snow, refusing the reigning theory that the disease spread through bad air, plotted every death on a street map and watched the dots cluster tightly around one contaminated well: \"upwards of five hundred fatal attacks of cholera in ten days\" within 250 yards of the pump. He persuaded the parish to remove the pump handle, and the outbreak, already fading, was choked off — the founding act of epidemiology and of modern contact tracing. Snow's lesson was that an epidemic is won or lost on the ability to trace transmission to its source before it outruns you. That is exactly the battle being lost in eastern Congo, where the fastest-growing Ebola outbreak on record is \"spreading faster than responders can trace it,\" its chains of contagion snapping loose amid conflict, funding gaps, and a health-worker strike. When the tracers are absent, blocked, or unpaid, the surveillance Snow invented collapses, and the disease chooses the map.",
        "excerpt": "Within two hundred and fifty yards of the spot where Cambridge Street joins Broad Street, there were upwards of five hundred fatal attacks of cholera in ten days.",
        "source": "John Snow, On the Mode of Communication of Cholera, 2nd ed. (London, 1855) — the Broad Street outbreak of 1854.",
        "href": "https://archive.org/stream/b28985266/b28985266_djvu.txt",
        "image": {
          "src": "/covers/ebola-congo-cases-exceed-2000--a1.png",
          "alt": "John Snow's 1854 map of Soho, with stacked black marks showing cholera deaths clustered around the Broad Street pump.",
          "credit": "John Snow, cholera map of 1854, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Giovanni Boccaccio opens the Decameron (c. 1350) not with romance but with horror: the Black Death that killed more than half of Florence in 1348. Ten young Florentines flee to a country villa to tell stories precisely because the city has become unlivable. Boccaccio records that neither doctors nor medicine could touch the disease, and that its deepest wound was social — it severed the bonds of care itself, as \"brother forsook brother\" and even \"fathers and mothers refused to visit or tend their very children.\" The plague did not merely kill; it made caregiving feel suicidal, and so the sick were left to die alone. That is the moral heart of the Congo crisis, where fear, exhaustion, and a broken, unpaid health system leave the infected untended and where responders are met with suspicion and violence. Boccaccio saw that when a contagion turns human beings against the duty to care for one another, the epidemic has already won its worst victory. His villa of storytellers is the ancestor of every attempt to hold onto normal life while the death toll — 754 and climbing — mounts outside the walls.",
        "excerpt": "brother forsook brother, uncle nephew and sister brother and oftentimes wife husband; nay (what is yet more extraordinary and well nigh incredible) fathers and mothers refused to visit or tend their very children, as they had not been theirs.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction (c. 1350; trans. John Payne) — the Black Death in Florence, 1348.",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm",
        "image": {
          "src": "/covers/ebola-congo-cases-exceed-2000--a2.png",
          "alt": "Luigi Sabatelli's etching of the 1348 plague of Florence, crowds and corpses filling a street, as described in Boccaccio's Decameron.",
          "credit": "Luigi Sabatelli, 'The plague of Florence in 1348,' Wellcome Collection, CC BY 4.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Edgar Allan Poe's 1842 tale \"The Masque of the Red Death,\" a plague called the Red Death \"had long devastated the country,\" killing its victims in half an hour with bleeding from every pore. Prince Prospero, indifferent to the dying, seals a thousand healthy nobles inside a fortified abbey and throws a lavish masquerade, certain that walls and wealth can keep contagion out. At the stroke of midnight a masked figure spotted with blood appears among the revellers; when they seize it, the costume is empty, and \"the Red Death held illimitable dominion over all.\" Poe's fable is the definitive parable of the fatal illusion that money, borders, or distance can quarantine a plague while the poor die outside. Eastern Congo exposes the same lie: an outbreak fed by neglected, underfunded communities and abandoned patients does not stay contained — it eventually reaches everyone, because pestilence recognizes no wall. Poe understood that denial and self-insulation are not safety but a delayed death sentence.",
        "excerpt": "The \"Red Death\" had long devastated the country. No pestilence had ever been so fatal, or so hideous. Blood was its Avatar and its seal—the redness and the horror of blood.",
        "source": "Edgar Allan Poe, 'The Masque of the Red Death' (1842).",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm",
        "image": {
          "src": "/covers/ebola-congo-cases-exceed-2000--a3.png",
          "alt": "Harry Clarke's 1919 art-nouveau illustration for Poe's 'The Masque of the Red Death,' a masked shrouded figure among terrified revellers.",
          "credit": "Harry Clarke, illustration for 'The Masque of the Red Death' (1919), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin's 1898 tempera panel \"The Plague\" (Die Pest), held at the Kunstmuseum Basel, is one of the most terrifying images of contagion ever painted. A skeletal figure of Death, scythe swung back, rides a black winged dragon-like beast that flies low and fast down a cramped medieval street, its wingtip almost grazing the buildings. Townspeople scatter and collapse in its path; in the foreground a woman in a vivid red gown lies dead across another corpse, the only warm color in a composition drowned in sickly plague-green shadow. Böcklin painted pestilence not as slow decay but as a hurtling, unstoppable predator that outruns everyone in its lane — the exact sensation of an outbreak that is \"spreading faster than responders can trace it.\" The picture's horror is its velocity: there is no time to flee, no wall to hide behind, no caregiver fast enough. It is the fastest-growing-Ebola-outbreak-on-record rendered as a single, airborne monster sweeping a whole community before it.",
        "excerpt": "Death, a scythe over one shoulder, rides a black winged serpent-beast that swoops low through a narrow European street; figures pitch and dive in terror as it passes, one woman in a blood-red dress fallen dead across another corpse. The whole scene is steeped in a pale, decomposing green, so that pestilence appears not as sickness but as a hurtling predator no one can outrun.",
        "source": "Arnold Böcklin, 'The Plague' (Die Pest), 1898, tempera on fir wood, Kunstmuseum Basel.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/ebola-congo-cases-exceed-2000--a4.png",
          "alt": "Arnold Böcklin, 'The Plague' (1898): Death rides a winged beast down a medieval street while townsfolk fall, a red-clad woman dead in the foreground.",
          "credit": "Arnold Böcklin, 'Die Pest' (1898), Kunstmuseum Basel, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns's symphonic poem Danse macabre, Op. 40 (1874), sets a poem by Henri Cazalis in which Death, at midnight, tunes a violin and summons the dead from their graves to dance. A harp strikes twelve, a solo violin — deliberately mistuned to a shrieking interval — plays the fiddle of Death, and a xylophone clatters like knocking bones until the cock crows at dawn and the skeletons drop back into the earth. The work belongs to the medieval Danse Macabre tradition born directly of the Black Death, whose whole point was that the plague levels everyone: king and beggar, priest and child, all conscripted into the same grinning dance. That indiscriminate scythe is precisely what the Congo figures describe — 2,000 cases, 754 dead — an outbreak that dances through a whole population without regard for who is worthy of saving. And the music's headlong whirl, racing the sunrise it can barely outlast, mirrors an epidemic outrunning the exhausted responders trying to bring it to a close.",
        "excerpt": "Zig et zig et zig, la mort en cadence / Frappant une tombe avec son talon, / La mort à minuit joue un air de danse, / Zig et zig et zag, sur son violon.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (1874), after the poem by Henri Cazalis.",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/ebola-congo-cases-exceed-2000--a5.png",
          "alt": "Michael Wolgemut's 1493 woodcut 'Dance of Death' (Imago Mortis): grinning skeletons and cadavers dance and play music around an open grave.",
          "credit": "Michael Wolgemut, 'Dance of Death' (Imago Mortis), Nuremberg Chronicle (1493), public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "india-uk-trade-pact-takes-effect",
    "headline": "The India-U.K. free trade agreement takes effect, cutting tariffs on whisky, cars and textiles and easing services trade",
    "overview": "A free trade agreement between India and the United Kingdom entered into force on Tuesday, phasing out tariffs on the vast majority of goods traded between the two economies and opening access in services. British exports such as Scotch whisky and automobiles will see duties fall sharply over time, while Indian textiles, leather and other labor-intensive goods gain duty-free entry to the U.K. market. Signed after years of negotiation, the deal is Britain's most significant post-Brexit trade pact and is projected to boost bilateral trade substantially.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOMlJ1ZU9CSkNQTGhPSUpEeERMZUxib3J2MWFMVmhvdXhsQmU3Mm5VWkU1MkdhX2RMLWJ3WkVVSHlQdlNwdURpQ0pEWU4wN1Y4SGtZbXE5Nl9zVUNwcDRvLWNMR3p1UUVxTFl3T25CRXF0UHJaRUlYaWhuV3lfQkVqMUU5eGRTVXNzVkI3ZkNBM3ZkbmJEbGRMUXBZeHNEcTZiUkpFNFk1V3k3LXFJTTJRRGNndXM?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c0kymrz0vkgo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/india-uk-trade-pact-takes-effect.png",
      "alt": "Stacked shipping containers at a port, representing international goods trade.",
      "credit": "Aerial view of the Port of Miami container terminal; public domain, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In December 1703 England's envoy to Lisbon, John Methuen, signed a short commercial treaty with Portugal that bound two economies together with a few plain clauses. Portugal agreed to admit English woollen cloth \"for ever hereafter,\" and in return Britain taxed Portuguese wine at a third less than French wine. That single bargain of cloth-for-wine is why port displaced claret on British tables for a century and why English broadcloth flowed south to Iberia. It was a treaty of commerce that redirected industry, taste and shipping for generations. The India-U.K. pact of 2026 springs from the same instinct: swap tariff cuts on each side's signature exports, with Scotch whisky and cars moving one way and Indian textiles the other. Where Methuen traded English cloth for Portuguese wine, London and New Delhi now trade whisky for textiles. Then as now, a handful of treaty lines quietly reroute centuries of trade.",
        "excerpt": "His sacred royal majesty of Portugal promises, both in his own name, and that of his successors, to admit, for ever hereafter, into Portugal, the woollen cloths, and the rest of the woollen manufactures of the British.... [Great Britain] shall, in her own name, and that of her successors, be obliged, for ever hereafter, to admit the wines of the growth of Portugal into Britain.",
        "source": "The Methuen Treaty (1703), Articles I–II, as printed in Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book IV, ch. vi.",
        "href": "https://www.adamsmithworks.org/documents/chapter-vi-of-treaties-of-commerce",
        "image": {
          "src": "/covers/india-uk-trade-pact-takes-effect--a0.png",
          "alt": "Painted portrait of John Methuen, the diplomat who negotiated the 1703 Anglo-Portuguese Methuen Treaty.",
          "credit": "Adrien Carpentiers, portrait of John Methuen, 18th century, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "For decades Britain's Corn Laws taxed imported grain to protect landowners, keeping bread dear for ordinary families. Richard Cobden and the Anti-Corn-Law League campaigned to tear them down, and in a Commons speech of 24 February 1842 Cobden accused Parliament of legislating \"for a class against the people.\" In 1846 Robert Peel repealed the laws and set Britain on a course of free trade and cheaper food, a national verdict that protectionism was simply a tax on consumers. The India-U.K. agreement is a narrower echo of that reckoning: a deliberate stripping-away of duties that had made whisky, cars and textiles needlessly costly on both sides. The argument Cobden preached — that open markets lower prices for the ordinary buyer — is exactly the case made in 2026 for phasing out tariffs. The commodities differ and the century differs, but it is the same contest of free trade against protection. The pact treats tariffs, as Cobden did, as a burden the public should not have to carry.",
        "excerpt": "Here is the simple, open avowal, that we are met here to legislate for a class against the people.",
        "source": "Richard Cobden, speech in the House of Commons, 24 February 1842 (\"The working classes and the corn laws\"), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_working_classes_and_the_corn_laws",
        "image": {
          "src": "/covers/india-uk-trade-pact-takes-effect--a1.png",
          "alt": "A large indoor gathering of the Anti-Corn Law League at Exeter Hall, London, in 1846.",
          "credit": "Anti-Corn Law League meeting, Exeter Hall, 1846, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In 1776 Adam Smith published The Wealth of Nations, and in Book IV he took apart the whole apparatus of tariffs, prohibitions and trade monopolies. His argument rests on a homely image: a prudent family never makes at home what it can buy more cheaply elsewhere, so \"what is prudence in the conduct of every private family can scarce be folly in that of a great kingdom.\" Nations, he insisted, grow rich by specialising and exchanging, not by walling themselves off behind duties. The India-U.K. agreement is that maxim put into administrative practice: Britain buys textiles it makes less efficiently, India buys whisky and cars it makes less efficiently, and both sides come out ahead. The pact's tariff schedule is essentially a modern civil servant's rendering of Smith's claim that barriers to exchange impoverish rather than protect. Two and a half centuries later, a great kingdom and a great republic are acting on his advice. The reasoning behind the deal could have been lifted straight from his page.",
        "excerpt": "It is the maxim of every prudent master of a family, never to attempt to make at home what it will cost him more to make than to buy.... What is prudence in the conduct of every private family can scarce be folly in that of a great kingdom.",
        "source": "Adam Smith, The Wealth of Nations (1776), Book IV, Chapter II, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Wealth_of_Nations/Book_IV/Chapter_2",
        "image": {
          "src": "/covers/india-uk-trade-pact-takes-effect--a2.png",
          "alt": "The Muir portrait of Adam Smith, the economist who argued for free trade in The Wealth of Nations.",
          "credit": "The Muir portrait of Adam Smith, 18th century, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Rudyard Kipling's ballad of 1889 opens with its famous, endlessly misquoted line that \"East is East, and West is West, and never the twain shall meet\" — and then immediately overturns it, declaring \"there is neither East nor West\" when \"two strong men stand face to face.\" The poem tells of an English colonel's son and an Afghan raider who become equals through mutual daring and respect. The India-U.K. trade pact makes that reversal literal. A relationship that began in empire, Britain over India, is renegotiated between two sovereign equals meeting across a table rather than a colonial ledger. A centuries-old commercial tie is reshaped on terms of parity, which is precisely Kipling's point that border and birth dissolve when equals deal directly. The couplet everyone cites to mean permanent division actually describes this handshake — East and West bargaining as peers.",
        "excerpt": "Oh, East is East, and West is West, and never the twain shall meet,\nTill Earth and Sky stand presently at God's great Judgment Seat;\nBut there is neither East nor West, Border, nor Breed, nor Birth,\nWhen two strong men stand face to face, tho' they come from the ends of the earth!",
        "source": "Rudyard Kipling, \"The Ballad of East and West,\" Barrack-Room Ballads (1892), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Ballads_and_Barrack-Room_Ballads/The_Ballad_of_East_and_West",
        "image": {
          "src": "/covers/india-uk-trade-pact-takes-effect--a3.png",
          "alt": "John Collier's 1891 portrait of Rudyard Kipling.",
          "credit": "John Collier, portrait of Rudyard Kipling, 1891, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Around 1778 the East India Company commissioned the Corfu-born painter Spiridione Roma to paint a ceiling for the Revenue Committee Room at East India House in London. In \"The East Offering its Riches to Britannia,\" female figures representing India and China kneel to present pearls, porcelain and bales of goods to an enthroned Britannia, while a Company ship waits offshore to carry the tribute home. It is colonial commerce rendered as pure allegory: the East gives and Britain receives, a one-way flow of riches dressed up as homage. The 2026 free trade agreement is the deliberate inversion of that picture. There is no kneeling and no tribute; tariffs fall in both directions, with Indian textiles entering Britain as British cars and whisky enter India, all by mutual treaty. Roma's canvas is the \"before,\" a hierarchy staged on a ceiling; the pact is a very different \"after,\" a relationship rebalanced between equals. The same two nations, the same goods crossing the sea — but the direction of deference has been erased.",
        "excerpt": "An enthroned Britannia receives pearls, porcelain and bales of eastern goods from kneeling figures who personify India and China, as a laden East India Company ship rides at anchor behind them. Painted for the Company's own boardroom, the allegory frames trade as one-directional homage flowing from East to West. It is the visual opposite of a treaty signed between equals.",
        "source": "Spiridione Roma, The East Offering its Riches to Britannia (1778), commissioned by the East India Company for East India House; British Library, Foster 245.",
        "href": "https://commons.wikimedia.org/wiki/File:The_East_offering_its_riches_to_Britannia_-_Roma_Spiridone,_1778_-_BL_Foster_245.jpg",
        "image": {
          "src": "/covers/india-uk-trade-pact-takes-effect--a4.png",
          "alt": "Allegorical painting of India and China kneeling to offer goods to an enthroned Britannia, with an East India Company ship behind.",
          "credit": "Spiridione Roma, The East Offering its Riches to Britannia, 1778, British Library (CC0), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In the eighteenth century workshops on India's Coromandel Coast produced chintz — hand-drawn, mordant-dyed cotton whose fast, brilliant colours swept European markets and alarmed domestic weavers. Britain was rattled enough to ban Indian calicoes outright in a bid to shield its own cloth trade, a classic act of protectionism against a superior import. This surviving fragment, its figures in Asian-style dress, is a scrap of that global textile boom preserved at the Cooper Hewitt. The India-U.K. pact returns to exactly this commodity — Indian textiles — but reverses the old politics around it. Where Georgian Britain met Indian cloth with bans and punitive duties, the 2026 agreement cuts those tariffs to let Indian textiles flow in freely, alongside whisky and cars moving the other way. The very good that once triggered protectionist panic has become the poster-product of an open-trade deal. The pattern is old; the policy is inverted.",
        "excerpt": "A fragment of hand-painted and mordant-dyed Indian cotton, its figures in Asian-style dress, from the eighteenth-century chintz trade that once flooded European markets. Such cloth was so coveted, and so threatening to home weavers, that Britain banned its import to protect domestic manufacturers. It is a tangible relic of the textile commerce the new trade pact reopens on opposite terms.",
        "source": "Chintz fragment, India, 18th century (c. 1750), cotton; Cooper Hewitt, Smithsonian Design Museum, accession 1973-51-26.",
        "href": "https://commons.wikimedia.org/wiki/File:Chintz_Fragment_(India),_18th_century_(CH_18481763).jpg",
        "image": {
          "src": "/covers/india-uk-trade-pact-takes-effect--a5.png",
          "alt": "A fragment of 18th-century Indian painted-and-dyed cotton chintz with figures in Asian-style dress.",
          "credit": "Chintz fragment, India, 18th century, Cooper Hewitt, Smithsonian Design Museum (Public Domain Mark), via Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "gibraltar-spain-border-fence-removed",
    "headline": "Gibraltar removes its 118-year-old border fence with Spain as a post-Brexit treaty opens the frontier",
    "overview": "Gibraltar dismantled the fence marking its land border with Spain, ending 118 years of physical controls, after Britain, Spain and the European Union agreed a treaty integrating the British territory into Europe's Schengen free-movement area. Under the arrangement, passport checks at the frontier are eliminated and travelers moving between Gibraltar and Spain face controls only at the territory's port and airport, carried out jointly by Gibraltar and Spanish or Frontex officers. Residents on both sides, many of whom cross daily for work, celebrated the removal of a barrier that long symbolized the dispute over the Rock's sovereignty.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxNaW5tbzRXY3YyajZsOUhXRmg2SFVEdW15S19DT3BCQUJoVEZiUVI3NUkzZDZ0cmR0OTRLVGJ2aDloTldWMHRNUmxHQ1VlbTlYTmpaQl9sanJHOFFMclVmMTZQSklsLVNWNFg1MEExR1dLSHk5RXZYb0gwanplMURyX0RIbWFVNVJLUVJQT21n?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwydz60j3eno"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/gibraltar-spain-border-fence-removed.png",
      "alt": "The Rock of Gibraltar rising above the town and the border area with Spain.",
      "credit": "The Rock of Gibraltar; CC BY 4.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On the night of 9 November 1989 crowds surged through the checkpoints of the Berlin Wall, and within days sledgehammers were biting into the concrete that had split a city, and a continent, for twenty-eight years. Two years earlier, standing before the Brandenburg Gate on 12 June 1987, U.S. President Ronald Reagan had thrown down a challenge to the Soviet leader: 'Mr. Gorbachev, tear down this wall!' The Wall had been the twentieth century's supreme symbol of a frontier imposed against the will of the people it divided, patrolled by guards and lit by watchtowers. Its fall became shorthand for the peaceful collapse of barriers and the return of free movement between long-separated neighbours. Gibraltar's dismantling of its 118-year-old border fence with Spain belongs to the same story on a smaller stage. Here too a fortified line, heavy with history and guarded for generations, is being pulled down so that people may cross freely where soldiers once stood. As at the Brandenburg Gate, the physical removal of a barrier marks a political thaw between old adversaries and the opening, rather than the sealing, of a contested frontier.",
        "excerpt": "General Secretary Gorbachev, if you seek peace, if you seek prosperity for the Soviet Union and Eastern Europe, if you seek liberalization: Come here to this gate! Mr. Gorbachev, open this gate! Mr. Gorbachev, tear down this wall!",
        "source": "Ronald Reagan, 'Remarks on East-West Relations at the Brandenburg Gate in West Berlin,' 12 June 1987. Ronald Reagan Presidential Library & Museum.",
        "href": "https://www.reaganlibrary.gov/archives/speech/remarks-east-west-relations-brandenburg-gate-west-berlin",
        "image": {
          "src": "/covers/gibraltar-spain-border-fence-removed--a0.png",
          "alt": "President Ronald Reagan delivering his speech at the Brandenburg Gate and the Berlin Wall, 12 June 1987.",
          "credit": "White House Photographic Office, 1987; U.S. National Archives (NARA 198585), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Around AD 122 the emperor Hadrian arrived in Britain and ordered a stone rampart flung across the island's narrow neck, from the Tyne to the Solway, to fix the northern limit of Roman power. The imperial biography in the Historia Augusta records that he 'was the first to construct a wall, eighty miles in length, which was to separate the barbarians from the Romans.' For nearly three centuries the wall was a working frontier of gates, ditches and garrisons, a hard edge between two worlds; then, as Roman authority ebbed, it was abandoned, its stones scavenged, its purpose forgotten, until walkers today stroll across a border that no longer divides anything. Gibraltar's fence is a frontier of the same kind, thrown up in the early twentieth century to mark where one sovereignty ended and another began, and manned as if the two sides were natural enemies. Its removal compresses into a single day the centuries-long fate of Hadrian's Wall: a line built to keep peoples apart quietly ceasing to matter. Where Rome's frontier crumbled through neglect, Gibraltar's is being dismantled by agreement, but both mark the moment a wall stops separating 'the barbarians from the Romans' and becomes merely a memory in the landscape.",
        "excerpt": "He then set out for Britain, and there he corrected many abuses and was the first to construct a wall, eighty miles in length, which was to separate the barbarians from the Romans.",
        "source": "Historia Augusta, Life of Hadrian 11.2, trans. David Magie (Loeb Classical Library, 1921), via LacusCurtius.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Historia_Augusta/Hadrian/1*.html",
        "image": {
          "src": "/covers/gibraltar-spain-border-fence-removed--a1.png",
          "alt": "William Bell Scott's painting of Roman soldiers and labourers building Hadrian's Wall, a centurion confronting workmen in the foreground.",
          "credit": "William Bell Scott, 'The Romans Cause a Wall to Be Built for the Protection of the South' (1857), National Trust, Wallington; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Robert Frost published 'Mending Wall' in his 1914 collection North of Boston, and it has become the most quoted poem in English about the meaning of borders. Each spring the poem's speaker and his neighbour meet to repair the tumbled stone wall between their farms, and the speaker cannot help wondering why: 'Something there is that doesn't love a wall.' His taciturn neighbour answers only with an inherited proverb, 'Good fences make good neighbours,' repeating it as if the barrier justified itself. The poem holds the two impulses in tension: the human urge to build walls and the older force, frost and thaw, that is forever pulling them down. Gibraltar's border fence stood for 118 years on exactly that proverb, the belief that a good fence kept Britons and Spaniards decent neighbours. Its dismantling is the poem's other voice winning out, the doubt that asks what a wall really walls in or walls out, and the decision that here the barrier no longer serves. The ground-swell that spills Frost's boulders in the sun has, at Gibraltar, become a treaty.",
        "excerpt": "SOMETHING there is that doesn't love a wall,\nThat sends the frozen-ground-swell under it,\nAnd spills the upper boulders in the sun;\nAnd makes gaps even two can pass abreast.",
        "source": "Robert Frost, 'Mending Wall,' in North of Boston (1914). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/3026/3026-h/3026-h.htm",
        "image": {
          "src": "/covers/gibraltar-spain-border-fence-removed--a2.png",
          "alt": "Photographic portrait of the poet Robert Frost in the 1910s.",
          "credit": "Photograph of Robert Frost, 1910s; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Book of Joshua tells how the Israelites, entering the promised land, found the city of Jericho shut fast behind its walls. On divine instruction they did not storm it but marched around it once a day for six days, and seven times on the seventh, with priests blowing rams'-horn trumpets. At the final circuit the people 'shouted with a great shout,' and, in the words of the Authorized Version, 'the wall fell down flat, so that the people went up into the city, every man straight before him.' It is the oldest and most famous image in Western literature of a fortification collapsing not by siege engines but at an appointed moment, as if the barrier itself consented to fall. Gibraltar's fence, like Jericho's wall, was the outward sign of a place set apart and long besieged in memory. Its removal has the same suddenness, a boundary that stood for generations coming down flat in a single day, but the shout that brings it down is a diplomatic one, and what the crowds walk into is not a conquered town but an open frontier.",
        "excerpt": "So the people shouted when the priests blew with the trumpets: and it came to pass, when the people heard the sound of the trumpet, and the people shouted with a great shout, that the wall fell down flat, so that the people went up into the city, every man straight before him, and they took the city.",
        "source": "The Holy Bible, Authorized (King James) Version, Joshua 6:20. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Joshua",
        "image": {
          "src": "/covers/gibraltar-spain-border-fence-removed--a3.png",
          "alt": "Gustave Doré engraving of the walls of Jericho falling as the Israelites and trumpeting priests advance.",
          "credit": "Gustave Doré, 'The Walls of Jericho Fall Down' (1866); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Commissioned by the City of London in 1783 and completed in 1791, John Singleton Copley's enormous canvas 'The Defeat of the Floating Batteries at Gibraltar' commemorates the climax of the Great Siege of Gibraltar, when on the night of 13-14 September 1782 the Rock's garrison destroyed the Spanish and French 'floating batteries' with red-hot shot. It is one of the largest oil paintings in Britain: a wall of smoke and flame, sinking batteries, drowning sailors, and the governor, General George Augustus Eliott, on the ramparts extending his hand toward the enemy struggling in the sea. The picture fixed Gibraltar in the British imagination as an embattled fortress, a frontier held by fire against Spain across three and a half years of blockade. The border fence dismantled in 2026 was a direct descendant of that siege mentality, the hard line drawn where cannon once faced cannon. To set Copley's burning water beside the quiet removal of the fence is to measure the distance travelled, from a frontier defined by red-hot shot to one erased by treaty. The painting shows the siege at its most violent; the news marks the moment the siege, in every sense, finally ends.",
        "excerpt": "A vast night scene of the Great Siege of Gibraltar: Spanish floating batteries burn and founder in the harbour under the garrison's red-hot shot, their crews spilling into the black water. In the foreground British sailors lean from boats to haul drowning enemies to safety, while General Eliott, mounted on the rampart, stretches out his arm toward the sinking ships. Smoke and flame fill the sky above the Rock, fixing Gibraltar as a fortress defended by fire against Spain.",
        "source": "John Singleton Copley, 'The Defeat of the Floating Batteries at Gibraltar, September 1782' (1783-1791), Guildhall Art Gallery, City of London.",
        "href": "https://commons.wikimedia.org/wiki/File:John_Singleton_Copley_-_Defeat_of_the_Floating_Batteries_at_Gibraltar,_1783.jpg",
        "image": {
          "src": "/covers/gibraltar-spain-border-fence-removed--a4.png",
          "alt": "John Singleton Copley's painting of the burning Spanish floating batteries at the Great Siege of Gibraltar, 1782.",
          "credit": "John Singleton Copley, 'The Defeat of the Floating Batteries at Gibraltar' (1783-1791); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven completed his Ninth Symphony in 1824, crowning it with a choral finale that sets Friedrich Schiller's 1785 ode 'An die Freude' ('Ode to Joy'), in which 'Alle Menschen werden Bruder' — all men become brothers. Deaf by the time of its premiere, Beethoven turned the symphony into a hymn to human fellowship that leaps across every division of language and nation. On Christmas Day 1989, weeks after the Berlin Wall opened, Leonard Bernstein conducted the finale in the divided city with musicians drawn from both East and West, changing Schiller's word 'Freude' (joy) to 'Freiheit' (freedom) to salute the fall of the barrier. The music has since become the anthem of a borderless Europe, the very continent whose free-movement zone Gibraltar has now joined. As the Rock's fence comes down and the frontier with Spain opens, Beethoven's setting supplies the fitting sound, the moment two peoples long kept apart are invited, in Schiller's phrase, to become brothers. Where the fence spoke of siege and separation, the Ninth speaks of the reconciliation of old rivals that the treaty is meant to seal.",
        "excerpt": "In the symphony's final movement a solo baritone breaks in over the orchestra and, joined by the full chorus, launches Schiller's Ode to Joy, its exultant theme swelling to the proclamation that all humanity shall be united as brothers beneath a loving heaven. The music moves from a hushed, groping opening through a march and a double fugue to a blazing choral climax, an unprecedented fusion of symphony and song. It has since been sung at moments of reconciliation, most famously at the Berlin Wall in 1989 and as the anthem of a united Europe.",
        "source": "Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125 (1824), choral finale on Friedrich Schiller's 'An die Freude' (1785). Public-domain scores at IMSLP.",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/gibraltar-spain-border-fence-removed--a5.png",
          "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven holding the manuscript of the Missa Solemnis.",
          "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven (1820); public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "alzheimers-blood-test-high-risk",
    "headline": "A study finds a blood test can flag cognitively healthy people at high risk of developing Alzheimer's disease",
    "overview": "Researchers reported in JAMA that a blood test measuring a form of the protein tau, p-tau217, can identify cognitively healthy older adults at high risk of developing Alzheimer's disease years before symptoms appear. In a Mass General Brigham analysis of 2,684 healthy older adults, those with very high levels faced a 38% risk of cognitive impairment within five years, rising to 78% within ten. Experts said the finding could speed drug trials and simplify screening, but cautioned it is too soon for healthy people to seek the test given the lack of a cure.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxQXzRDZElnSVBYRHFXU2ZqbFMteFdkcXN5ejJoTk80XzRHRXl4Tm5KdDBiT3FIcG53d2Q1VlJzcUU3TGh3UXpKbWtNRGdEa2pNZTRuSm1XLTlDN0F5ckVLdXJ5endySFFVUWRlU0FFb01xZ25iUjViMGJkNnlaeFVNc095OVllRU04SzZ4VFE4dFBoZWUteTlFNA?oc=5"
      },
      {
        "name": "Medical Xpress",
        "href": "https://medicalxpress.com/news/2026-07-blood-healthy-people-high-alzheimer.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/alzheimers-blood-test-high-risk.png",
      "alt": "Vials of blood in a laboratory rack, representing a diagnostic blood test.",
      "credit": "A laboratory technician placing a blood sample in a test-tube rack; U.S. Air Force photo, public domain, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Around 550 BCE, Croesus, the fabulously rich king of Lydia, wanted certainty about the future before making war on Persia, so he devised a test of the world's oracles: he had messengers ask, on an appointed day, what he was doing at that exact moment — and secretly he was boiling a tortoise and a lamb together in a bronze cauldron. Only the Delphic oracle answered correctly, describing the smell of the shell-covered tortoise seething with lamb's flesh; convinced it \"was the only true one,\" Croesus poured his gold into Delphi and asked whether he should march. The oracle told him that if he attacked Persia he would destroy a great empire — and he did: his own. Herodotus's point is not that the future is unknowable but that reliable foreknowledge is a double-edged gift, seductive and treacherous at once. A test that truly reads what is hidden — a tortoise in a covered pot, or a tangle of proteins in the blood — can prove its own accuracy while leaving the human question of what to do with the knowledge wide open. The JAMA study's p-tau217 blood test is a modern Delphi: it can genuinely \"find out\" what is silently unfolding inside a healthy body, years before any symptom. Like Croesus, whoever receives such an answer must still decide whether the knowing is a blessing or a snare.",
        "excerpt": "When the Pythian prophetess had uttered this oracle, the Lydians caused the prophecy to be written down, and went away at once to Sardis. And when the rest also who had been sent round were there arrived with the answers of the Oracles, then Croesus unfolded the writings one by one and looked upon them: and at first none of them pleased him, but when he heard that from Delphi, forthwith he did worship to the god and accepted the answer, judging that the Oracle at Delphi was the only true one, because it had found out what he himself had done.",
        "source": "Herodotus, The History of Herodotus, Book I (trans. G. C. Macaulay), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm",
        "image": {
          "src": "/covers/alzheimers-blood-test-high-risk--a0.png",
          "alt": "Attic red-figure amphora showing Croesus enthroned on his funeral pyre, pouring a libation as a servant lights the flames",
          "credit": "Attic red-figure amphora attributed to Myson, 'Croesus on the pyre,' c. 500–490 BC, Musée du Louvre (G 197); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In 1872 a 22-year-old American physician, George Huntington, published a short paper, \"On Chorea,\" describing a hereditary disease he had watched pass through generations of families on Long Island. He wrote that the affliction was \"an heirloom from generations away back in the dim past,\" spoken of by those at risk \"with a kind of horror,\" and that it never skipped a generation: a child of an affected parent either developed it or, if spared, broke the thread for good. For over a century that inheritance was a private form of foreknowledge — to watch a parent decline was to read one's own odds. In 1983 a genetic marker, and later a direct test, turned those odds into a yes-or-no answer available decades before symptoms, for a disease that still has no cure. The bioethics that followed became the template for every predictive test since: studies found that many at-risk people chose NOT to be tested, preferring uncertainty to a verdict they could not undo. The Alzheimer's p-tau217 blood test revives exactly this dilemma for a vastly larger population — millions of cognitively healthy older adults — offering a glimpse of the future when, as yet, little can be done to change it. Huntington's families already knew the weight of \"that disorder\" long before medicine could name the gene.",
        "excerpt": "The hereditary chorea, as I shall call it, is confined to certain and fortunately a few families, and has been transmitted to them, an heirloom from generations away back in the dim past. It is spoken of by those in whose veins the seeds of the disease are known to exist, with a kind of horror, and not at all alluded to except through dire necessity, when it is mentioned as 'that disorder.'",
        "source": "George Huntington, 'On Chorea,' Medical and Surgical Reporter (1872), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/On_Chorea",
        "image": {
          "src": "/covers/alzheimers-blood-test-high-risk--a1.png",
          "alt": "Photographic portrait of the young physician George Huntington, circa 1872",
          "credit": "Portrait of George Huntington, c. 1872; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Sophocles' Oedipus the King (c. 429 BCE) is the archetypal drama of foreknowledge one cannot outrun. Warned by Apollo's oracle that he was fated to defile his mother's bed and \"slay the father from whose loins\" he sprang, Oedipus flees Corinth precisely to escape the prophecy — and by fleeing walks straight into it, killing a stranger at a crossroads and marrying a widowed queen. The horror of the play is not the prophecy's content but its structure: the knowledge itself becomes the engine of the doom, and the effort to avoid the future helps bring it about. For the healthy adult handed a high-risk Alzheimer's result, the resonance is uneasy but real — foreknowledge that reshapes how one lives without guaranteeing one can alter the outcome. Unlike Oedipus, such a person faces probabilities, not decrees, and Alzheimer's is not certain to arrive; yet the ancient question stands. Is it better to know the shape of one's fate and live differently, or to be spared the knowing altogether? Sophocles offers no comfort, only the spectacle of a man who learns the truth too late to escape it and too fully to unknow it.",
        "excerpt": "To wit I should defile my mother's bed\nAnd raise up seed too loathsome to behold,\nAnd slay the father from whose loins I sprang.",
        "source": "Sophocles, Oedipus the King (trans. F. Storr), in The Oedipus Trilogy, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm",
        "image": {
          "src": "/covers/alzheimers-blood-test-high-risk--a2.png",
          "alt": "Ingres painting of a nude Oedipus leaning in to answer the riddle of the Sphinx",
          "credit": "Jean-Auguste-Dominique Ingres, 'Oedipus and the Sphinx,' begun 1808 (reworked 1827), Musée du Louvre; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Aeschylus's Agamemnon (458 BCE), the Trojan princess Cassandra stands before the doomed house of Atreus and sees, with perfect clarity, the murders about to happen — including her own. Apollo had granted her true prophecy and then, spurned, cursed her so that she would always foresee the truth and never be believed. \"The thing which must be shall be,\" she says, foretelling that the elders will soon \"confess me all too true a seer\" — and moments later she walks knowingly to her death. Cassandra dramatizes the loneliest form of foreknowledge: to carry certain, unwelcome knowledge of the future while others look away or refuse to believe. The parallel to a predictive Alzheimer's test is pointed. A person flagged as high-risk may hold a private, well-founded vision of their own decline that friends and family cannot fully absorb, and that medicine cannot yet avert. Cassandra's anguish is not that she is wrong but that she is right, and alone with it — the very burden a true early-warning test can lay on a healthy mind.",
        "excerpt": "What if no man believe me? 'Tis all one.\nThe thing which must be shall be; aye, and soon\nThou too shalt sorrow for these things, and here\nStanding confess me all too true a seer.",
        "source": "Aeschylus, Agamemnon (trans. Gilbert Murray), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/14417/14417-h/14417-h.htm",
        "image": {
          "src": "/covers/alzheimers-blood-test-high-risk--a3.png",
          "alt": "Solomon Joseph Solomon painting of Ajax seizing the prophetess Cassandra amid the sack of Troy",
          "credit": "Solomon Joseph Solomon, 'Ajax and Cassandra,' 1886, Art Gallery of Ballarat; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "John Collier's Priestess of Delphi (1891), in the Art Gallery of South Australia, depicts the Pythia seated on her tripod above a fissure in the earth, a shallow dish and a laurel branch in hand, breathing the rising vapors as she prepares to deliver Apollo's word. Collier, a scientifically minded Victorian, paints the oracle less as sorcery than as a solemn technology of foresight — a human instrument through which the future is read. The image crystallizes the theme at the heart of this event: for millennia humanity has sought a reliable channel to what is coming, and has invested that channel with awe and dread. The p-tau217 blood test is a laboratory Pythia, its vapors replaced by a vial of plasma and a protein assay, delivering to healthy people an oracle about their own brains. Collier's priestess sits poised between knowledge and its utterance — the exact threshold on which a patient stands when a physician holds a result that cannot be unheard.",
        "excerpt": "A robed young priestess sits on a golden tripod straddling a cleft in the rock, eyes half-closed, one hand raising a shallow dish, the other clutching a laurel branch, as pale volcanic vapors coil up around her. Collier renders the instant before prophecy: the vacant, inward gaze of a woman about to voice a future she did not choose. The oracle's power and its unease are carried entirely by her stillness and by the smoke that bears hidden knowledge up into the light.",
        "source": "John Collier, Priestess of Delphi (1891), Art Gallery of South Australia; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:John_Collier_-_Priestess_of_Delphi.jpg",
        "image": {
          "src": "/covers/alzheimers-blood-test-high-risk--a4.png",
          "alt": "John Collier painting of the Priestess of Delphi seated on a tripod, inhaling vapors rising from a crack in the earth",
          "credit": "John Collier, 'Priestess of Delphi,' 1891, Art Gallery of South Australia; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Evelyn De Morgan's Cassandra (1898), in the De Morgan Collection, shows the prophetess at the fall of Troy, tearing at her flame-red hair as the city burns behind her, condemned to foresee a catastrophe no one will heed. De Morgan, who often painted women bearing visionary or spiritual burdens, gives Cassandra a posture of pure anguish — the knowledge of doom lodged in the body itself. The painting turns foreknowledge into physical suffering: not a gift but a wound. This is the shadow side of the Alzheimer's early-warning test. To be told, while still healthy, that catastrophe is likely years off is to carry a vision of the future in the present tense, with the flames already visible on the horizon. De Morgan's Cassandra makes vivid what a probabilistic diagnosis can feel like from the inside — the solitary torment of knowing, or half-knowing, what may be coming.",
        "excerpt": "Against a lurid sky streaked with the smoke of burning Troy, a barefoot woman in a slate-blue robe stands on a rocky ledge, gripping fistfuls of her flame-red hair, her face contorted in grief. Roses lie scattered at her feet as the city crumbles behind her. De Morgan paints not the prophecy but its cost — the seer's body wracked by a future she can see and cannot stop.",
        "source": "Evelyn De Morgan, Cassandra (1898), De Morgan Collection; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Cassandra1.jpeg",
        "image": {
          "src": "/covers/alzheimers-blood-test-high-risk--a5.png",
          "alt": "Evelyn De Morgan painting of Cassandra tearing her hair on a rocky ledge as Troy burns behind her",
          "credit": "Evelyn De Morgan, 'Cassandra,' 1898, De Morgan Collection; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "italy-meloni-electoral-reform-defeat",
    "headline": "Italy's lower house rejects Meloni's electoral-reform amendment by a single vote in a secret ballot",
    "overview": "Italy's Chamber of Deputies rejected a key amendment to Prime Minister Giorgia Meloni's electoral-reform bill by one vote, 188 to 187, in a secret ballot, a surprise defeat inflicted partly by defectors within her own governing coalition. The measure would have reintroduced preference votes letting citizens choose individual candidates from party lists for the first time in over 30 years. 'We tried. The swamp has won again,' Meloni said of the setback, the second major reversal for her government this year after a March referendum defeat on judicial reform, exposing strains in her coalition before elections due in 2027.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c1kykx3vnyyo"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-14/meloni-dealt-surprise-setback-in-italian-voter-reform-drive"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/italy-meloni-electoral-reform-defeat.png",
      "alt": "The facade of Italy's Palazzo Montecitorio, seat of the Chamber of Deputies in Rome.",
      "credit": "Palazzo Montecitorio, seat of Italy's Chamber of Deputies, Rome; CC BY-SA 4.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On the Ides of March, 44 BC, Julius Caesar entered the hall beside Pompey's theatre and was surrounded by a knot of some sixty conspirators, many of them men he had pardoned, promoted, and counted as friends. According to Suetonius, they closed in with concealed daggers; Caesar struggled until he saw Marcus Brutus among the blades and, tradition holds, gasped 'You too, my child?' before drawing his toga over his face to fall with dignity. He was, the biographer records, stabbed 'with three and twenty wounds,' undone not by a foreign enemy but by his own inner circle. The parallel to Meloni's defeat is exact in spirit: a leader wounded from within, struck by the allies she had gathered around her. Where Caesar met concealed steel, Meloni met a concealed ballot, the secret vote that let coalition partners strike without ever showing their hands. 'The swamp has won again,' she said, an echo of the oldest lesson in Roman politics, that the deadliest conspiracies are hatched among insiders rather than outsiders. One trusted defection, like one blade, can decide everything.",
        "excerpt": "Finding himself now attacked on all hands with naked poniards, he wrapped the toga about his head, and at the same moment drew the skirt round his legs with his left hand, that he might fall more decently with the lower part of his body covered. He was stabbed with three and twenty wounds, uttering a groan only, but no cry, at the first wound...",
        "source": "Suetonius, The Lives of the Twelve Caesars, 'Divus Julius' 82 (trans. Alexander Thomson, rev. T. Forester), via Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0132:life=jul.:chapter=82",
        "image": {
          "src": "/covers/italy-meloni-electoral-reform-defeat--a0.png",
          "alt": "Engraving of the marble Farnese bust of Julius Caesar, published in Helmolt's History of the World (1902).",
          "credit": "Engraving after the Farnese bust of Julius Caesar (Museo Archeologico Nazionale, Naples), from Helmolt's 'History of the World' (1902); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the spring of 1868 the United States Senate sat as a court to remove President Andrew Johnson, and on 16 May the entire outcome turned on a single vote. As the Senate's own history records, thirty-five senators voted to convict while nineteen voted to acquit, leaving the tally 'one vote short of the necessary two-thirds majority to convict.' What saved Johnson was not his enemies but the seven 'Republican Recusants' who defied their own party, men like Edmund G. Ross of Kansas who broke ranks at the decisive instant. Their defection changed history by the narrowest possible margin, precisely as Meloni's amendment failed by 188 votes to 187. Then as now, the drama lay in members of the governing side quietly crossing over when it counted most. Then as now, a one-vote hinge swung the fate of a government. The lesson repeats across the centuries: a majority is only as solid as its most wavering insider, and a leader can be saved, or sunk, by a single hidden hand.",
        "excerpt": "On May 16, 1868, in a dramatic call of the roll, 35 senators voted to convict the president of \"high crimes and misdemeanors,\" while 19 senators voted to acquit. A clear majority voted against the president, but the tally fell one vote short of the necessary two-thirds majority to convict. ... Notable among the 19 senators who voted to acquit were seven \"Republican Recusants\" who defied their party to save the impeached president.",
        "source": "United States Senate, 'The Impeachment of Andrew Johnson (1868).'",
        "href": "https://www.senate.gov/about/powers-procedures/impeachment/impeachment-johnson.htm",
        "image": {
          "src": "/covers/italy-meloni-electoral-reform-defeat--a1.png",
          "alt": "Wood engraving of the U.S. Senate sitting as a court for the impeachment trial of President Andrew Johnson in 1868.",
          "credit": "'The Senate as a Court of Impeachment for the Trial of Andrew Johnson,' wood engraving by Theodore R. Davis, Harper's Weekly, 1868; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare's 'Julius Caesar' (c. 1599) turned the murder into the archetype of betrayal from within. In Act 3, Scene 1 the conspirators crowd Caesar with petitions until, at a signal, they draw the daggers hidden beneath their togas; and as Brutus, the friend Caesar loved best, strikes, Caesar breathes the immortal line, 'Et tu, Brute! Then fall, Caesar.' The horror of the scene is not the killing itself but the identity of the killer, for the fatal wound comes from the most trusted ally. That is precisely the shape of Meloni's reversal, an amendment 'undone partly by defectors in her own coalition.' The daggers concealed beneath the togas map cleanly onto the secret ballot that let her allies wound her unseen. Shakespeare understood, as Meloni now says of 'the swamp,' that assemblies harbor conspiracies and that the nearest colleague can carry the sharpest knife. His Rome and her Chamber share one grim rule: proximity is where the danger lives.",
        "excerpt": "CASCA: Speak, hands for me!\n[CASCA first, then the other Conspirators and BRUTUS stab CAESAR]\nCAESAR: Et tu, Brute! Then fall, Caesar.\n[Dies]",
        "source": "William Shakespeare, Julius Caesar, Act 3, Scene 1, via The Complete Works of William Shakespeare (MIT).",
        "href": "http://shakespeare.mit.edu/julius_caesar/full.html",
        "image": {
          "src": "/covers/italy-meloni-electoral-reform-defeat--a2.png",
          "alt": "Title page of the 1623 First Folio of Shakespeare's plays, with the Droeshout engraved portrait of the playwright.",
          "credit": "Title page of Shakespeare's First Folio (1623), engraved portrait by Martin Droeshout; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's 'Coriolanus' the great Roman general is destroyed not on the battlefield but by a vote of the fickle assembly. Egged on by scheming tribunes, the very citizens who had just praised him reverse themselves and banish him from the city; enraged at the mutable crowd, Coriolanus hurls their sentence back, 'You common cry of curs! ... I banish you ... There is a world elsewhere.' The play is a study in the fickleness of assemblies and the ease with which insiders engineer a leader's fall. Meloni's single-vote defeat, in a chamber that flipped against her under a secret ballot, is a modern ostracism of the same kind: the many turning, the counters of votes deciding, the leader cast out of her own project. Like Coriolanus raging at the 'curs,' Meloni answered defeat with contempt, declaring that 'the swamp has won again.' The tribunes' quiet manipulation of the count is the ancient cousin of the coalition defectors who sank her reform. Rome's oldest fear, that the assembly is a weathervane, still hangs over the Italian Chamber of Deputies.",
        "excerpt": "You common cry of curs! whose breath I hate / As reek o' the rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you; / And here remain with your uncertainty! ... Despising, / For you, the city, thus I turn my back: / There is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus, Act 3, Scene 3, via The Complete Works of William Shakespeare (MIT).",
        "href": "http://shakespeare.mit.edu/coriolanus/coriolanus.3.3.html",
        "image": {
          "src": "/covers/italy-meloni-electoral-reform-defeat--a3.png",
          "alt": "Nineteenth-century engraving illustrating a scene from Shakespeare's Coriolanus, the banished general with Aufidius.",
          "credit": "'Coriolanus and Aufidius,' engraving by Charles Heath after Henry Corbould (1825-40), The Metropolitan Museum of Art (CC0); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Vincenzo Camuccini's monumental neoclassical canvas 'La morte di Cesare' (c. 1804-05), now in Naples's Museo di Capodimonte, freezes the instant of betrayal at its most theatrical. Caesar reels back at the center into a forest of raised arms and blades while senators in white recoil, and the composition makes the essential point visually: the danger is inside the chamber, among the robed men of state. It is fitting that the definitive image of a leader knifed by his own assembly hangs in Italy itself, the country now watching Meloni felled from within. The painting's crowded, colonnaded hall mirrors the Chamber of Deputies where 188 hands quietly outnumbered 187. Where Camuccini shows daggers drawn in the open, Italy's secret ballot supplied the hidden equivalent, striking without a face to name. The canvas insists on a hard truth of power: the most dangerous room for a ruler is the one filled with colleagues.",
        "excerpt": "In Camuccini's vast canvas, Caesar staggers backward at the center as a phalanx of senators drives their daggers home, their white togas fanning across the dim, columned hall. The eye is dragged to the raised blades and the recoiling conspirators, every one of them a man of the state. The painting stages the assassination as a public act of the assembly itself, betrayal wearing the robes of office.",
        "source": "Vincenzo Camuccini, La morte di Cesare (c. 1804-05), Museo di Capodimonte, Naples, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vincenzo_Camuccini_-_La_morte_di_Cesare.jpg",
        "image": {
          "src": "/covers/italy-meloni-electoral-reform-defeat--a4.png",
          "alt": "Vincenzo Camuccini's large neoclassical painting of the assassination of Julius Caesar in the Roman senate.",
          "credit": "Vincenzo Camuccini, 'La morte di Cesare' (c. 1804-05), Museo di Capodimonte, Naples; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi's opera 'Un ballo in maschera' (1859) sets to music the exact machinery of insider conspiracy. A ruler is beloved and secure until a knot of courtiers plots his death; in the opera's chilling turn, the conspirators draw lots from an urn, and blind chance names the assassin, who proves to be the ruler's own most trusted friend and secretary, Renato. The murder is carried out at a masked ball, where identities are hidden and loyalty cannot be read on any face, an operatic secret ballot. That is the very atmosphere of Meloni's defeat: a concealed vote, an outcome decided as if by lottery at 188 to 187, and the fatal blow delivered by supposed allies. Verdi, Italy's own composer, dramatized the truth Meloni voiced as 'the swamp,' that a leader is undone not by open enemies but by masked friends. The urn that chooses the assassin is the nineteenth-century echo of a chamber's concealed ballot, chance and secrecy conspiring to bring the powerful down.",
        "excerpt": "Verdi's score moves from courtly brilliance to dread as the conspirators gather; in the drawing-of-lots scene a name is pulled from an urn over muttering low strings, and the ruler's closest friend is chosen to kill him. The final masked ball glitters with dance rhythms even as the murder is prepared behind the disguises. It is the sound of a betrayal hidden in plain sight, decided by chance among trusted intimates.",
        "source": "Giuseppe Verdi, Un ballo in maschera (1859), libretto by Antonio Somma; full scores via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Un_ballo_in_maschera_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/italy-meloni-electoral-reform-defeat--a5.png",
          "alt": "Giovanni Boldini's 1886 portrait of the composer Giuseppe Verdi in a top hat and white scarf.",
          "credit": "Giovanni Boldini, portrait of Giuseppe Verdi (1886), Galleria Nazionale d'Arte Moderna e Contemporanea, Rome; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "libeskind-seoul-daechi-towers",
    "headline": "Studio Libeskind unveils Daechi Ssangyong, a cluster of six 49-storey Seoul towers with nearly 1,000 homes",
    "overview": "Studio Libeskind has revealed designs for Daechi Ssangyong, six skyscrapers of up to 49 storeys rising in Seoul's Gangnam district, to be built by Samsung Engineering and Construction on a site now holding five older buildings. The towers, comprising nearly 1,000 residences, will be wrapped in light-toned vertical facade elements forming curving bands that shift in appearance as the sun and viewers move around them. Daniel Libeskind described the scheme, inspired by a 'Celestial' concept, as 'a living work of art'; construction is expected to begin in 2027 and finish by 2030.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/15/daechi-ssangyong-studio-libeskind-seoul/"
      },
      {
        "name": "ArchDaily",
        "href": "https://www.archdaily.com/1148691/studio-libeskind-designs-new-high-density-residential-towers-in-seoul"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/libeskind-seoul-daechi-towers.png",
      "alt": "A cluster of tall contemporary residential skyscrapers with patterned facades against the sky.",
      "credit": "Studio Libeskind's Daechi Ssangyong, Seoul (render); via Studio Libeskind / ArchDaily."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the fifth century BC the Greek traveller Herodotus walked through Babylon and left the earliest eyewitness account of its great temple-tower, the ziggurat later generations would fuse with the legend of Babel. He described a 'tower of solid masonry' rising in eight receding stages, climbed by a path that wound round the outside to a shrine at the summit. This was the Etemenanki, 'the foundation of heaven and earth,' the tallest thing its world had built, a stack of pure geometry meant to bridge the human and the divine. Twenty-five centuries later, Studio Libeskind's Daechi Ssangyong repeats the same impulse in Seoul's Gangnam district: a cluster of towers reaching up to 49 storeys, banded and patterned so that, like the ziggurat's tiers, the eye is drawn ceaselessly upward. Both treat a skyline as a statement about ambition itself, architecture as the visible measure of a people's reach. Herodotus, ever the reporter, simply counted the stages and noted the resting-place halfway up; the wonder lay in the sheer accumulation of height. The parallel is not the myth of punishment but the older, admiring astonishment at a building that dares to climb toward the sky.",
        "excerpt": "In the middle of the precinct there was a tower of solid masonry, a furlong in length and breadth, upon which was raised a second tower, and on that a third, and so on up to eight. The ascent to the top is on the outside, by a path which winds round all the towers. When one is about half-way up, one finds a resting-place and seats, where persons are wont to sit some time on their way to the summit. On the topmost tower there is a spacious temple.",
        "source": "Herodotus, The Histories, Book 1.181, trans. George Rawlinson (1858-60), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_1",
        "image": {
          "src": "/covers/libeskind-seoul-daechi-towers--a0.png",
          "alt": "The Great Ziggurat of Ur, a stepped Mesopotamian temple-tower of the kind Herodotus described in Babylon",
          "credit": "Photograph by Hardnfast, a U.S. Armed Forces member, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On 14 February 1887, as Gustave Eiffel's iron tower began to rise over Paris, forty-seven of France's most eminent artists, among them the composer Charles Gounod, the writer Guy de Maupassant and the architect Charles Garnier, published a furious open letter in Le Temps. They protested 'with all our force, with all our indignation' against the 'useless and monstrous' structure, which popular wit had, they noted, already christened the 'tour de Babel.' To them a towering new monument planted in the heart of a beloved city was vandalism dressed as progress; within two years the same tower had become the emblem of Paris and, eventually, a work of art in the public mind. Studio Libeskind's six patterned skyscrapers in Gangnam step straight into this argument: a bold, unmissable intervention on a cherished skyline, praised by its makers as sculpture and certain to strike some residents as overreach. The Eiffel episode is the reminder that the line between hubris and masterpiece is drawn only in hindsight. What one generation calls a monstrosity the next photographs at sunrise. Libeskind's towers, 'wrapped in curving light-toned bands that shift with the sun,' are betting, as Eiffel did, that time will convert astonishment into affection.",
        "excerpt": "Nous venons, écrivains, peintres, sculpteurs, architectes, amateurs passionnés de la beauté jusqu'ici intacte de Paris, protester de toutes nos forces, de toute notre indignation, au nom du goût français méconnu, au nom de l'art et de l'histoire français menacés, contre l'érection, en plein cœur de notre capitale, de l'inutile et monstrueuse tour Eiffel, que la malignité publique, souvent empreinte de bon sens et d'esprit de justice, a déjà baptisée du nom de « tour de Babel ».",
        "source": "« Protestation des artistes contre la tour de M. Eiffel », Le Temps, 14 février 1887, via French Wikisource",
        "href": "https://fr.wikisource.org/wiki/Protestation_des_artistes_contre_la_tour_de_M._Eiffel_du_14_f%C3%A9vrier_1887",
        "image": {
          "src": "/covers/libeskind-seoul-daechi-towers--a1.png",
          "alt": "Louis-Émile Durandelle's 1888 photograph of the Eiffel Tower rising, still under construction, over Paris",
          "credit": "Photograph by Louis-Emile Durandelle, 1888, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The oldest and most famous story of towers reaching heavenward is the handful of verses in Genesis in which the descendants of Noah settle in the plain of Shinar and resolve, 'Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name.' It is the archetype of architectural ambition: building not merely for shelter but for identity, permanence and glory, 'lest we be scattered abroad upon the face of the whole earth.' The tale carries a warning, for the LORD confounds their language and scatters them, yet it also names the deep human wish that every skyline since has expressed. Studio Libeskind's Daechi Ssangyong, a stand of six 49-storey towers crowning a Seoul district, is a modern city and tower raised, quite openly, to 'make us a name.' Its developers call it 'a living work of art' and speak of human ambition reaching skyward, the very language of Shinar. The homes number nearly a thousand, but the gesture is monumental, meant to be seen and remembered from far off. Babel is the shadow against which every great tower is measured, at once the dream and the caution built into stacking stone toward the clouds.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. And the LORD came down to see the city and the tower, which the children of men builded.",
        "source": "Genesis 11:4-5, King James Version, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/libeskind-seoul-daechi-towers--a2.png",
          "alt": "Gustave Doré's engraving 'The Confusion of Tongues,' showing the unfinished Tower of Babel amid storm and cloud",
          "credit": "Engraving by Gustave Doré (c. 1865), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In 1602, imprisoned by the Inquisition, the Dominican friar Tommaso Campanella wrote The City of the Sun, a dialogue describing an ideal metropolis built on a hill and 'divided into seven rings or huge circles named from the seven planets.' Its geometry is deliberate and total, with concentric walls, four gates opening to the four points of the compass, and every surface painted with the knowledge of the world, so that the city is at once fortress, encyclopaedia and work of art. Campanella imagined architecture as a diagram of cosmic order, the built environment engineered to shape a better humanity, the founding gesture of every utopian city-plan since. Studio Libeskind's Gangnam cluster belongs to that visionary lineage: not a single tower but a designed constellation of six, patterned and unified, presented as a coherent urban artwork rather than mere real estate. Where Campanella arranged his rings by the planets, Libeskind wraps his towers in bands that 'shift with the sun,' light and geometry pressed into the service of meaning. Both take for granted that a city can be composed like a piece of music or a painting. The City of the Sun never left the page; the Daechi towers propose to make such an ideal city actually stand, with nearly a thousand real homes inside the geometry.",
        "excerpt": "It is divided into seven rings or huge circles named from the seven planets, and the way from one to the other of these is by four streets and through four gates, that look toward the four points of the compass. Furthermore, it is so built that if the first circle were stormed, it would of necessity entail a double amount of energy to storm the second; still more to storm the third.",
        "source": "Tommaso Campanella, The City of the Sun (La Città del Sole, 1602), trans. Thomas W. Halliday, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2816/2816-h/2816-h.htm",
        "image": {
          "src": "/covers/libeskind-seoul-daechi-towers--a3.png",
          "alt": "Portrait of the friar and philosopher Tommaso Campanella, author of The City of the Sun",
          "credit": "Portrait by Francesco Cozza (1605-1682), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's The Tower of Babel, painted in 1563 and now in the Kunsthistorisches Museum in Vienna, is the definitive image of architecture as sublime overreach. Bruegel modelled his spiralling, half-built colossus on the Roman Colosseum, set it against a Flemish harbour town, and swarmed its ramps with tiny masons, cranes and archways so that the eye climbs stage by stage into the clouds. The tower tilts almost imperceptibly, its lower arches already crumbling even as the summit pushes higher, ambition and instability rendered in the same brushstroke. It is the perfect visual companion to Studio Libeskind's Daechi Ssangyong, where six banded towers are likewise conceived as a single sculptural mass of stacked, patterned geometry rising over a city. Bruegel makes literal what the developers claim in words: a building as 'a living work of art,' a monument to human ambition reaching skyward. Where the painting broods on the hubris of the enterprise, the Seoul project embraces the grandeur without the fall. Five centuries apart, both understand a great tower as a picture the whole city is made to read.",
        "excerpt": "Bruegel's panel presents an immense, cliff-like tower spiralling upward in receding tiers, its Colosseum-like arcades still crawling with cranes and labourers while clouds snag on the unfinished summit. The whole structure leans faintly against the harbour behind it, the stone already fracturing at its base even as the builders press ever higher, a vision of colossal geometry that is magnificent and precarious at once.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel, 1563, Kunsthistorisches Museum, Vienna, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/libeskind-seoul-daechi-towers--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel, a vast spiralling tower rising into the clouds above a harbour town",
          "credit": "Painting by Pieter Bruegel the Elder (1563), Kunsthistorisches Museum Vienna, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In 1784 the French architect Étienne-Louis Boullée drew his Cénotaphe à Newton, a monument that could never be built: a hollow sphere some five hundred feet high, pierced so that daylight would fall inside like scattered stars, honouring Isaac Newton with nothing but pure geometry and light. Boullée belonged to the 'visionary' or 'paper' architects who believed a building's forms should stir the soul, 'architecture parlante,' architecture that speaks, and his ink-and-wash elevations imagined structures of a scale no engineering of his day could raise. His subject was the very one Studio Libeskind names in Seoul: geometry and light as the true material of monumental architecture, the building as a sculpture of ideas. Libeskind's Daechi towers, 'wrapped in curving light-toned bands that shift with the sun,' are Boullée's dream made habitable, light choreographed across a colossal patterned form. Boullée's cenotaph stayed on paper, a utopian vision of the city of the future; Libeskind's cluster claims to deliver that visionary ambition in glass and stone, with nearly a thousand homes behind the geometry. The lineage is direct, from the Enlightenment sphere that reached for the heavens in a drawing to six real towers reaching for them over Gangnam.",
        "excerpt": "Boullée's elevation renders a single perfect sphere set upon a broad circular base ringed with rows of cypress, a monument of overwhelming scale reduced to the barest geometry. The drawing dwarfs the human figures at its foot to specks, proposing light itself, admitted through the sphere's pierced shell, as the true ornament of a building conceived as an instrument of awe.",
        "source": "Étienne-Louis Boullée, Cénotaphe à Newton (élévation), 1784, Bibliothèque nationale de France, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:%C3%89tienne-Louis_Boull%C3%A9e,_C%C3%A9notaphe_de_Newton_-_03_-_%C3%89l%C3%A9vation_g%C3%A9om%C3%A9trale.jpg",
        "image": {
          "src": "/covers/libeskind-seoul-daechi-towers--a5.png",
          "alt": "Étienne-Louis Boullée's 1784 elevation for the Cenotaph for Newton, a giant sphere on a circular base ringed with trees",
          "credit": "Drawing by Étienne-Louis Boullée (1784), Bibliothèque nationale de France, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "eu-ets2-carbon-price-pushback",
    "headline": "Ten EU member states urge Brussels to reconsider the ETS2 carbon price on transport and heating fuels",
    "overview": "Ten European Union countries — Italy, Poland, Bulgaria, Cyprus, the Czech Republic, Estonia, Greece, Hungary, Romania and Slovakia — issued a joint statement urging the European Commission to reconsider the ETS2 emissions-trading scheme that will put a carbon price on road-transport and heating fuels from 2028. 'European citizens should not be facing new climate taxes in current economic and geopolitical circumstances,' the statement said. Supporters argue ETS2 is essential to cutting emissions and that its revenues will help households switch to cleaner cars and heating, while the Commission has resisted reopening the rules before the system launches.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxOMHduSHB1c2RVMC02LVFXVmRWN0RBUERNalhOQmNkWDJIbmlTV3pZVWNqUEgtYjJLYVJ1YkY1SkltdVZ6b2FwSXpUZzZISlhUOG11VWFkN3BqRXIzenJheWpCSlluY1pGY09zVWh1TWNSMFQ3aG1sVUN5WS1XWFZoblVTeGtBQlhfSHhnOTRqeHQ0NUNfaG1xMDZocXBwQzg4aFhlT0F3?oc=5"
      },
      {
        "name": "Cyprus Mail",
        "href": "https://cyprus-mail.com/2026/07/15/cyprus-among-eu-countries-opposing-new-fuel-tax"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/eu-ets2-carbon-price-pushback.png",
      "alt": "A fuel pump nozzle at a filling station, representing a carbon price on transport fuel.",
      "credit": "A petrol pump nozzle; CC BY-SA 2.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In medieval and early-modern France the crown levied the gabelle, a tax on salt first imposed in 1286 under Philip IV and later made permanent by Charles V. Salt was a daily necessity for preserving food, and in the pays de grandes gabelles the state obliged every person above the age of eight to buy a fixed quantity each week at a set price. Because the burden fell on something no household could do without, the gabelle became one of the most closely watched taxes of the old regime, its rates differing sharply from province to province. Officials known as gabelous administered it, and questions of fairness and evasion followed it for centuries until it was set aside in 1790. The debate over the ETS2 carbon price echoes this older question: how to charge for an everyday essential — here, the road and heating fuels households rely on — without placing an uneven weight on ordinary people. Ten member states now ask Brussels to reconsider the timing and design of the charge, much as contemporaries once measured the gabelle against the sense that a necessity deserves particular care. The parallel lies not in the rate but in the principle, that taxes on the indispensable invite unusually close scrutiny.",
        "excerpt": "\"GABELLE ..., a term which, in France, was originally applied to taxes on all commodities, but was gradually limited to the tax on salt. First imposed in 1286, in the reign of Philip IV., as a temporary expedient, it was made a permanent tax by Charles V. ... the government obliged every individual above the age of eight years to purchase weekly a minimum amount of salt at a fixed price.\"",
        "source": "1911 Encyclopædia Britannica (11th ed.), \"Gabelle\", via Wikisource.",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gabelle",
        "image": {
          "src": "/covers/eu-ets2-carbon-price-pushback--a0.png",
          "alt": "A 1788 coloured etched map of France showing the different regimes of the gabelle salt tax by province.",
          "credit": "Anonymous, \"Carte des gabelles\", 1788, Bibliothèque nationale de France; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "England introduced the window tax in 1697, during the reign of William III, to help meet the cost of reminting the nation's silver coinage. Rather than counting hearths, assessors counted windows, treating them as a rough and visible measure of a household's means. The design carried an unintended consequence: to lower their bills, owners bricked up windows, and, as a later account observed, 'traces of the endeavours to lighten its burden may be seen in numerous bricked-up windows.' Reformers argued the tax darkened homes and bore hardest on those of modest means, and it was repealed in 1851 after more than a century and a half. The lesson often drawn is that a charge on something people cannot easily avoid can change behaviour in ways its designers never intended. The ETS2 proposal to price carbon in road transport and heating from 2028 raises a comparable concern among the ten governments now urging review: that a charge on unavoidable energy use may fall unevenly and prompt responses no one planned. As with the window tax, the argument turns less on the goal than on the fairness and the side-effects of the method.",
        "excerpt": "\"WINDOW TAX, a tax first levied in England in the year 1697 for the purpose of defraying the expenses and making up the deficiency arising from clipped and defaced coin in the recoinage of silver during the reign of William III. ... Owing to the method of assessment the tax fell with peculiar hardship on the middle classes, and to this day traces of the endeavours to lighten its burden may be seen in numerous bricked-up windows.\"",
        "source": "1911 Encyclopædia Britannica (11th ed.), \"Window Tax\", via Wikisource.",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Window_Tax",
        "image": {
          "src": "/covers/eu-ets2-carbon-price-pushback--a1.png",
          "alt": "A brick building wall in which several window openings have been filled in with brick, a legacy of the window tax.",
          "credit": "Photograph by Gary Burt (Whilesteps), 2008, CC BY-SA 3.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In 1776 Adam Smith set out, in the fifth book of 'The Wealth of Nations,' four maxims by which any tax might be judged: equity, certainty, convenience, and economy. The first held that citizens should contribute 'in proportion to their respective abilities,' matching the burden to what each can reasonably bear. Smith did not oppose taxation; he sought principles that would make it defensible, predictable, and light in its collection. His framework remains the common language in which tax proposals are still argued today. The dispute over ETS2 can be read directly through these maxims: supporters stress that pricing carbon serves a shared public end, while the ten member states press the questions of equity and convenience — whether households can bear a new charge on energy now, and whether the timing is right. Smith's calm insistence that fairness and feasibility be weighed alongside purpose is precisely the ground on which the ETS2 debate is being conducted. The quarrel is old; only the commodity has changed.",
        "excerpt": "\"The subjects of every state ought to contribute towards the support of the government, as nearly as possible, in proportion to their respective abilities; that is, in proportion to the revenue which they respectively enjoy under the protection of the state.\"",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations (1776), Book V, Chapter II.",
        "href": "https://www.marxists.org/reference/archive/smith-adam/works/wealth-of-nations/book05/ch02b.htm",
        "image": {
          "src": "/covers/eu-ets2-carbon-price-pushback--a2.png",
          "alt": "Profile portrait of the economist Adam Smith, derived from James Tassie's 1787 medallion.",
          "credit": "After James Tassie's 1787 medallion, engraving; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The economist Arthur Cecil Pigou, writing in 'The Economics of Welfare' in 1920, gave modern form to the idea that some activities impose costs on others that their price does not capture. His example was factory smoke, which he said 'inflicts a heavy uncharged loss on the community.' Pigou proposed that a well-judged tax could bring such uncharged costs back into the reckoning, aligning private choices with the wider public interest — the principle economists now call a Pigouvian, or corrective, tax. Carbon pricing schemes such as ETS2 descend directly from this reasoning: the charge on transport and heating fuels is meant to reflect the cost of emissions that markets otherwise leave unpriced. Supporters of ETS2 invoke exactly Pigou's logic when they call the measure vital to reducing emissions. The ten governments seeking review do not necessarily reject that logic; their concern is with when and how the corrective charge should apply, and on whom its weight first falls. Pigou himself understood that the case for such a tax stands or falls on questions of design and fairness.",
        "excerpt": "\"... for this smoke in large towns inflicts a heavy uncharged loss on the community, in injury to buildings and vegetables, expenses for washing clothes and cleaning rooms, expenses for the provision of extra artificial light, and in many other ways.\"",
        "source": "Arthur Cecil Pigou, The Economics of Welfare (1920), Part II.",
        "href": "https://archive.org/stream/economicsofwelfa00pigouoft/economicsofwelfa00pigouoft_djvu.txt",
        "image": {
          "src": "/covers/eu-ets2-carbon-price-pushback--a3.png",
          "alt": "Portrait photograph of the economist Arthur Cecil Pigou, about 1918 to 1921.",
          "credit": "Portrait of A.C. Pigou, c. 1918–1921; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Around 1540 the Netherlandish painter Marinus van Reymerswaele and his workshop produced 'Two Tax-Gatherers,' a version of which hangs in the National Gallery in London. Two officials sit at a cluttered table: one records entries in a ledger while the other reaches toward a small pile of coins, with documents heaped on the cupboard behind them. The picture belongs to a genre of tax-office scenes that examined, in a moralising key, the collection of public money and the temptations that surrounded it. Such paintings gave ordinary viewers a face for an otherwise abstract activity — the counting, recording, and gathering of dues. The ETS2 debate is likewise, at bottom, about the office of collection: who charges, who pays, and whether the process is seen as fair. Reymerswaele's careful ledgers and coins are a fitting emblem for a modern argument over pricing energy, in which the mechanics of assessment and the perception of fairness matter as much as the sum involved.",
        "excerpt": "Two soberly dressed officials lean over a table in a panelled room; one enters figures in an open ledger while the other's hand rests among stacked coins, and rolled documents crowd the shelf behind. The painting turns the quiet routine of assessment and collection into a study of money, record-keeping, and human character.",
        "source": "Workshop of Marinus van Reymerswaele, Two Tax-Gatherers, c. 1540, oil on oak, The National Gallery, London (NG944).",
        "href": "https://www.nationalgallery.org.uk/paintings/workshop-of-marinus-van-reymerswale-two-tax-gatherers",
        "image": {
          "src": "/covers/eu-ets2-carbon-price-pushback--a4.png",
          "alt": "Painting of two sixteenth-century tax officials at a table, one writing in a ledger, the other handling coins.",
          "credit": "Workshop of Marinus van Reymerswaele, \"Two Tax-Gatherers\", c. 1540, The National Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Brueghel the Younger, working in Flanders in the early seventeenth century, painted 'Paying the Tax,' also known as 'The Tax Collector,' in versions dated roughly 1620 to 1640; one is held by the USC Fisher Museum of Art. The scene shows villagers gathered in a cramped office, bringing documents and produce before seated officials who tally what is owed. Like Reymerswaele's tax-gatherers, the painting treats the everyday business of collection as a subject worth studying, attentive to the small drama of citizen meeting administration. It captures a recurring social moment: the encounter in which a common obligation is assessed and rendered. The ETS2 proposal stages a version of that same encounter on a continental scale, as households across ten and more member states consider a new charge on the fuels they use to travel and heat their homes. Brueghel's crowded office is a reminder that behind every fiscal policy stands the ordinary person at the counter, and that public acceptance rests on whether the exchange feels just.",
        "excerpt": "Peasants press into a modest office cluttered with papers and tokens of payment, waiting before officials who sort documents and record what each owes. The composition gives ordinary form to a shared obligation, focusing on the meeting of the citizen and the administration that collects.",
        "source": "Pieter Brueghel the Younger, Paying the Tax (The Tax Collector), oil on panel, c. 1620–1640, USC Fisher Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Brueghel_the_Younger,_%27Paying_the_Tax_(The_Tax_Collector)%27_oil_on_panel,_1620-1640._USC_Fisher_Museum_of_Art.jpg",
        "image": {
          "src": "/covers/eu-ets2-carbon-price-pushback--a5.png",
          "alt": "Flemish painting of villagers crowding into a tax collector's office where officials sort papers and record dues.",
          "credit": "Pieter Brueghel the Younger, \"Paying the Tax (The Tax Collector)\", c. 1620–1640, USC Fisher Museum of Art; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "japan-crypto-financial-assets-law",
    "headline": "Japan's parliament passes a law reclassifying cryptocurrency as financial assets under securities rules",
    "overview": "Japan's parliament approved legislation moving cryptocurrency oversight under the Financial Instruments and Exchange Act, reclassifying digital assets such as Bitcoin as financial products rather than mere means of payment, public broadcaster NHK reported. The change subjects crypto to insider-trading prohibitions and disclosure requirements and paves the way for a flat 20% tax on trading gains — down from a top rate near 55% — and potentially for domestic Bitcoin exchange-traded funds. The Financial Services Agency framed the overhaul as bringing investor protections in line with those for traditional securities.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPenBUOVBWN19jZk5GUGdSTVhfcTIwZl9BNzU5TDI3M3FyNk50S3VPME1hRTZMc2hKUXhDcFcwLUhmNFI1Vi1Ea0Q1TndmVmQ5eTQzS2txdm9FUUVTUG05NlRYRUtOaGZKYnl2b2dKM05tNEg1aEZfUUZHcno4dTNDazluaEdKOEthSHRYN3cwaWZ2MmpOYzNERmhXSEVBY0N1VG1ydUpmc3pCeWRoSGc?oc=5"
      },
      {
        "name": "Crypto Briefing",
        "href": "https://cryptobriefing.com/japan-reclassifies-crypto-financial-assets/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/japan-crypto-financial-assets-law.png",
      "alt": "A physical Bitcoin token resting on a dark reflective surface.",
      "credit": "A physical bitcoin token; CC BY-SA 3.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the kingdom of Lydia, in what is now western Turkey, the goldsmiths of King Alyattes (who reigned around 610–560 BCE) and his famous son Croesus did something no state had done before: they took lumps of electrum, a wild natural alloy of gold and silver panned from the river Pactolus, and stamped them with a royal seal to make the world's first true coins. Writing a century later, Herodotus recorded that the Lydians 'were the first of men... who struck and used coin of gold or silver.' What the stamp really certified was weight, purity and trust — the king's guarantee turned an unruly, variable metal into money that strangers could accept on sight. A chaotic medium of exchange was, quite literally, brought under the sovereign's mark. In July 2026, Japan's parliament performed a modern version of that ancient act: it took cryptocurrency, a wild and ungoverned new form of money, and stamped it, reclassifying Bitcoin and its kin as regulated financial assets under securities law. Where Lydia added a lion's head, Tokyo adds disclosure rules, insider-trading law and the promise of ETFs. In both cases the state does not invent the money so much as domesticate it, lending its authority to a value that markets had already begun to trust.",
        "excerpt": "they were the first of men, so far as we know, who struck and used coin of gold or silver; and also they were the first retail-traders.",
        "source": "Herodotus, The Histories, Book I.94, trans. G. C. Macaulay (Macmillan, 1890), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt",
        "image": {
          "src": "/covers/japan-crypto-financial-assets-law--a0.png",
          "alt": "Lydian electrum coin (trite) of King Alyattes, c. 620–560 BCE, stamped with a lion's head.",
          "credit": "Classical Numismatic Group, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Nearly two thousand years after Lydia, in the 1270s, the Venetian traveler Marco Polo watched Kublai Khan (who ruled the Mongol-Yuan empire from 1260 to 1294) run something that astonished him: a mint in his capital of Cambaluc that made money not of gold but of paper, cut from the inner bark of mulberry trees. Polo marveled that the Great Khan 'hath the Secret of Alchemy in perfection,' because worthless bast became treasure the instant officials signed each sheet and the Khan's deputy pressed his vermilion seal upon it in red. Refuse the notes and the penalty was death; they were made to 'pass current universally over all his kingdoms.' Here value came not from the substance but from the sovereign's stamp and the law that stood behind it — money conjured and enforced by decree. Japan's 2026 reform rests on the same insight in reverse: cryptocurrency already circulates as a kind of digital paper spun from code, and the state now presses its own seal on it, folding Bitcoin into the securities law with rules, disclosures and formal recognition. The Khan legitimized bark with a red seal; Japan legitimizes crypto with a statute. Both show that what turns a strange new thing into real money is, in the end, the authority willing to vouch for it.",
        "excerpt": "The Emperor's Mint then is in this same City of Cambaluc, and the way it is wrought is such that you might say he hath the Secret of Alchemy in perfection, and you would be right! ... And when all is prepared duly, the chief officer deputed by the Kaan smears the Seal entrusted to him with vermilion, and impresses it on the paper, so that the form of the Seal remains printed upon it in red; the Money is then authentic. Anyone forging it would be punished with death.",
        "source": "The Book of Ser Marco Polo, Book II, ch. XXIV, trans. Sir Henry Yule (John Murray, 1903), via Columbia University, 'The Mongols in World History.'",
        "href": "https://afe.easia.columbia.edu/mongols/figures/ser_xxiv.pdf",
        "image": {
          "src": "/covers/japan-crypto-financial-assets-law--a1.png",
          "alt": "A Yuan-dynasty paper banknote (jiaochao) of 1287 with its bronze printing plate.",
          "credit": "public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In the first act of Goethe's Faust, Part Two — the poet's final masterwork, published in 1832 — Mephistopheles solves the bankrupt Emperor's money troubles with a dazzling trick. Overnight the court prints paper notes backed by gold supposedly still buried, undiscovered, in the imperial earth, and the Emperor, having signed the first note almost absent-mindedly during a masquerade, wakes to find his signature has turned slips of paper into a currency the whole realm suddenly accepts. When the note is read aloud it promises 'a thousand crowns in worth,' secured by 'all buried treasure in the Emperor's land.' The Emperor first cries fraud — 'A most enormous cheat—a crime, I fear!' — until his treasurer reminds him that he himself gave the paper legal force with his own hand. Goethe, who had watched the paper-money experiments of his age, was dramatizing the unsettling truth that money can be spun from almost nothing once the state agrees to stand behind it. That is precisely the alchemy at the heart of Japan's 2026 law: cryptocurrency, a value conjured largely from belief and code, is transformed into a recognized financial asset by the sovereign's signature — here the parliament's rather than the Emperor's. The wild new money becomes legitimate the moment the state consents to underwrite and regulate it.",
        "excerpt": "(He reads.) “To all to whom this cometh, be it known: A thousand crowns in worth this note doth own. It to secure, as certain pledge, shall stand All buried treasure in the Emperor’s land: And ’t is decreed, perfecting thus the scheme, The treasure, soon as raised, shall this redeem.”",
        "source": "Goethe, Faust, Part II, Act I ('Pleasure-Garden'), trans. Bayard Taylor (1913), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Faust_(trans._Bayard_Taylor)/Act_I/IV",
        "image": {
          "src": "/covers/japan-crypto-financial-assets-law--a2.png",
          "alt": "Johann Heinrich Wilhelm Tischbein, 'Goethe in the Roman Campagna' (1787).",
          "credit": "Johann Heinrich Wilhelm Tischbein, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Ben Jonson's comedy The Alchemist, first staged in London in 1610, skewers a city gone mad for the dream of manufacturing wealth. A trio of con artists promise gullible clients the philosopher's stone — the fabled agent that turns base metal into gold — and the greediest dupe, Sir Epicure Mammon, fantasizes about transmuting every scrap of lead and copper he owns into bullion: 'This night, I'll change / All that is metal, in my house, to gold.' He dreams of buying up whole English counties and making them 'perfect Indies,' blind to the fact that the 'alchemy' is a swindle feeding on his own credulity. Jonson's real subject is not chemistry but the speculative mania that grips people when someone promises to conjure riches from nothing. The parallels to cryptocurrency are almost too neat: Bitcoin has long been sold as 'digital gold,' a base of mere code alchemized into staggering value, and its booms have drawn in Mammons by the million. Japan's 2026 statute is the sober authority arriving at the end of the play — not to deny the dream, but to regulate it, imposing disclosure and insider-trading rules so the transmutation happens in the open, under law rather than in a huckster's back room.",
        "excerpt": "This night, I'll change All that is metal, in my house, to gold: ... Yes, and I'll purchase Devonshire and Cornwall, And make them perfect Indies!",
        "source": "Ben Jonson, The Alchemist (1610), Act II, via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/4081/pg4081.txt",
        "image": {
          "src": "/covers/japan-crypto-financial-assets-law--a3.png",
          "alt": "Portrait of Ben Jonson by Abraham van Blyenberch, c. 1617.",
          "credit": "Abraham van Blyenberch, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Around 1627 the young Rembrandt van Rijn painted 'The Parable of the Rich Fool,' now in Berlin's Gemaldegalerie, showing a bent old man alone by candlelight, peering through spectacles at a single gold coin he holds to the flame, hemmed in by ledgers, scales and stacks of money. The picture illustrates Christ's parable of the man who fills his barns with wealth and says to his soul, take thine ease, only to be told that his life is required of him that very night. Rembrandt makes money both mesmerizing and hollow: the coin catches all the light while the miser's face is half-lost in shadow, wealth examined obsessively yet mortally uncertain in worth. The image speaks directly to cryptocurrency, a form of money whose value has been scrutinized, doubted and feverishly counted like the coin in the old man's fingers. Japan's 2026 law drags that candlelit hoard into daylight, reclassifying crypto as a financial asset subject to disclosure and audit, so its worth is measured in the open ledger rather than the miser's private gloom. Rembrandt's single illuminated coin is the ancestor of every asset whose true value the law now insists on weighing and recording.",
        "excerpt": "A stooped old man in fur-trimmed robes holds a gold coin close to a guttering candle, squinting at it through spectacles while ledgers, coins and a hanging balance crowd the dim room around him. The flame lights the money and little else, leaving his face in shadow. Rembrandt turns the counting of wealth into a meditation on its vanity, the parable's rich man absorbed in riches on the night they will be taken from him.",
        "source": "Rembrandt van Rijn, 'The Parable of the Rich Fool' (1627), oil on panel, Gemaldegalerie, Berlin.",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_The_Parable_of_the_Rich_Fool.jpg",
        "image": {
          "src": "/covers/japan-crypto-financial-assets-law--a4.png",
          "alt": "Rembrandt's 'The Parable of the Rich Fool' (1627): an old man by candlelight examining a gold coin amid ledgers and money.",
          "credit": "Rembrandt van Rijn, 'The Parable of the Rich Fool' (1627), Gemaldegalerie, Berlin; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Around 1640, only a few years after the Dutch tulip bubble burst in 1637, Jan Brueghel the Younger painted 'Satire on Tulip Mania,' a small panel in which the speculators are all monkeys dressed as prosperous Haarlem merchants. The apes weigh tulip bulbs on scales, consult account books, count coins and toast their paper profits; one is carried off in a sedan chair, another draws a sword, a foolish buyer is hauled before a magistrate, and at the right a ruined speculator is borne to his grave. Brueghel's joke is savage and precise: strip away the fine clothes and speculative frenzy is just animal greed chasing a flower whose price everyone secretly knows is absurd. Tulip mania became the founding parable of the financial bubble — wild trading in an asset unmoored from any stable worth, ending in collapse and, eventually, official attempts to clean up the wreckage. Cryptocurrency has often been cast as our era's tulip craze, and Japan's 2026 reclassification is the law arriving to impose order on that frenzy — insider-trading bans, disclosure duties and the discipline of securities rules where before there was a monkeys' carnival. Brueghel painted the mania as farce; the new statute is society's attempt to make sure the next boom plays out under rules instead of in a menagerie.",
        "excerpt": "Monkeys in the dress of wealthy merchants haggle over tulips, weigh bulbs on a balance, and pore over ledgers while others feast and toast the boom. One counts a pile of coins, another is dragged before a judge, and at the far right a bankrupt speculator is carried to his grave. Brueghel turns the crash of 1637 into a menagerie of greed brought at last to its reckoning.",
        "source": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640), oil on panel, Frans Hals Museum, Haarlem.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/japan-crypto-financial-assets-law--a5.png",
          "alt": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640), monkeys dressed as merchants speculating on tulips.",
          "credit": "Jan Brueghel the Younger, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "ana-mendieta-tate-modern-survey",
    "headline": "Tate Modern opens a major Ana Mendieta survey spanning her 'earth-body' silhouettes, film and sculpture",
    "overview": "Tate Modern in London has opened a major survey of the Cuban-American artist Ana Mendieta, gathering more than 150 works that trace her interdisciplinary practice across photography, remastered film, sculpture and land art. Centered on her celebrated Silueta series — outlines of the female body pressed, burned or carved into earth, sand and stone — the exhibition foregrounds Mendieta's preoccupations with nature, displacement and identity, developed after she was sent from Cuba to the United States as a child. Running through January 2027, it is one of the largest presentations of her work since her death in 1985.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/ana-mendieta-exhibition-photography-sculpture-art-history/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/07/13/ana-mendietas-neolithic-art-recreated-for-major-tate-modern-survey"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/ana-mendieta-tate-modern-survey.png",
      "alt": "A silhouette of a human figure impressed and outlined in earth and natural materials, evoking Ana Mendieta's Silueta works.",
      "credit": "Ana Mendieta, from the Silueta Series, at Tate Modern; via Colossal."
    },
    "edition": "Evening Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Around 25,000 BCE, an unknown carver in the Danube valley shaped a palm-sized limestone woman now called the Venus of Willendorf, unearthed in 1908 near Willendorf, Austria, and today held by the Naturhistorisches Museum in Vienna. Barely eleven centimetres tall, she is all breast, belly and hip, her face hidden under a cap of carved braids, her stone once rubbed with red ochre the colour of blood and soil. For more than a century she has been read as an earth-mother or fertility figure: a woman made of the ground, standing for the ground itself. That fusion of the female body with the earth is exactly the nerve Tate Modern touches in its 150-work Ana Mendieta survey, whose 'Silueta' outlines press, burn and carve a woman's shape straight into mud, sand and rock. Where the Ice Age sculptor drew the body out of stone, Mendieta returns it to the earth, but both treat the female form and the land as one substance. Both, too, strip away individual features until what is left is an anonymous 'woman-as-earth'. The Venus is the oldest ancestor of the earth-goddess lineage the exhibition quietly invokes.",
        "excerpt": "Carved from oolitic limestone that does not occur locally, the figurine exaggerates breasts, belly and hips while omitting the face entirely, its head wrapped in rows of carved braids or a woven cap. Traces of red ochre still cling to the stone. Long interpreted as a fertility or earth-mother emblem, it is one of the oldest surviving images of the human body.",
        "source": "Venus of Willendorf (c. 25,000 BCE), Naturhistorisches Museum, Vienna",
        "href": "https://www.nhm-wien.ac.at/en/research/prehistory/research/idols/venus_of_willendorf",
        "image": {
          "src": "/covers/ana-mendieta-tate-modern-survey--a0.png",
          "alt": "The Venus of Willendorf, a small Paleolithic limestone figurine of a full-bodied woman with a featureless, braided head",
          "credit": "Photograph by Matthias Kabel of the c. 25,000 BCE figurine (Naturhistorisches Museum, Vienna); CC BY 2.5, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "For close to two thousand years, from the Bronze Age until the Roman Empire suppressed them in the fourth century CE, initiates walked from Athens to Eleusis to celebrate the Mysteries of Demeter and her daughter Persephone. Their founding story, set down in the Homeric Hymn to Demeter around the seventh century BCE, tells how the girl was gathering flowers when 'the wide-pathed earth yawned' and Hades dragged her down into the soil; her mother's grief froze the fields, and only Persephone's yearly return let the grain rise again. The rite was, at its heart, a drama of burial in the earth and rebirth out of it, a promise wrung from the cycle of the seasons. That is the ancient rhyme to Ana Mendieta's 'Siluetas', which the Tate survey foregrounds: body-outlines pressed, buried and burned into the ground as ritual acts of disappearance and return. Mendieta called her practice a dialogue with the earth as mother, and the Eleusinian cult is its distant liturgy. Both bind woman, soil, fertility and death into a single figure who goes into the ground and, somehow, comes back. Both also make the vanishing itself sacred rather than final.",
        "excerpt": "And the girl was amazed and reached out with both hands to take the lovely toy; but the wide-pathed earth yawned there in the plain of Nysa, and the lord, Host of Many, with his immortal horses sprang out upon her",
        "source": "Homeric Hymn to Demeter (ll. 15-18), trans. Hugh G. Evelyn-White, via Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/348/pg348.txt",
        "image": {
          "src": "/covers/ana-mendieta-tate-modern-survey--a1.png",
          "alt": "The Great Eleusinian Relief in marble, showing Demeter, the youth Triptolemos and Persephone",
          "credit": "Photograph by TimeTravelRome of the votive relief (c. 440-430 BCE, National Archaeological Museum, Athens); CC BY 2.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In one of the 'Lucy' poems printed in the 1800 Lyrical Ballads, William Wordsworth writes eight lines over the body of a woman who has died. Grief here is strangely calm: the dead beloved feels nothing, 'No motion has she now, no force,' and has simply been folded back into the turning planet, 'Roll'd round in earth's diurnal course / With rocks and stones and trees.' The human figure does not go to heaven; it becomes landscape, indistinguishable from the ground and everything rooted in it. That image maps almost exactly onto the works at the centre of Tate Modern's Ana Mendieta survey, where a body's silhouette is impressed into mud or scorched into grass and then left to be reclaimed by weather and soil. Both Wordsworth and Mendieta make the same quiet argument: the individual outline is temporary, the earth that receives it is not. Both find something consoling, not only bleak, in a body dissolving into the land. In each, a woman's form is last seen merging with the rocks and roots that will outlast her.",
        "excerpt": "Roll'd round in earth's diurnal course\nWith rocks and stones and trees!",
        "source": "William Wordsworth, 'A slumber did my spirit seal,' Lyrical Ballads (1800), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Lyrical_Ballads_(1800)/Volume_2/A_slumber_did_my_spirit_seal",
        "image": {
          "src": "/covers/ana-mendieta-tate-modern-survey--a2.png",
          "alt": "Painted portrait of the poet William Wordsworth",
          "credit": "Portrait of William Wordsworth; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In his 1815 'Hebrew Melodies', Lord Byron reworked Psalm 137 into a lyric of exile that opens, 'We sate down and wept by the waters / Of Babel.' His speakers are captives torn from a ruined homeland, Salem laid waste behind them, who hang their harps on the willows and refuse to sing the old songs for their captors: a homesickness so absolute it silences art rather than making it. That ache of the displaced is the biographical undertow of the Tate Modern survey. Ana Mendieta was sent alone out of Havana as a girl in 1961 and grew up a Cuban exile in Iowa, and critics reading her 'Silueta' works see a woman pressing her own body into foreign soil as if to root herself, to belong to some land at last. Byron's exiles weep beside a river that is not theirs; Mendieta lay down in the mud of a country that was not hers. Both turn the loss of a homeland into a rite of longing performed on the ground itself. And in both, the lost place is mourned precisely by an act of making something that remembers it.",
        "excerpt": "We sate down and wept by the waters\nOf Babel, and thought of the day\nWhen our foe, in the hue of his slaughters,\nMade Salem's high places his prey;\nAnd ye, oh her desolate daughters!\nWere scattered all weeping away.",
        "source": "Lord Byron, 'By the Rivers of Babylon we sat down and wept,' Hebrew Melodies (1815), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Hebrew_Melodies_(Byron,_1815)/By_the_rivers_of_Babylon_we_sat_down_and_wept",
        "image": {
          "src": "/covers/ana-mendieta-tate-modern-survey--a3.png",
          "alt": "Painting of Judean exiles mourning with harps beside a river in Babylon",
          "credit": "Gebhard Fugel, 'An den Wassern Babylons' (c. 1920); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Around 1566 the Milanese painter Giuseppe Arcimboldo (1527-1593) made 'Earth' (Terra), part of a 'Four Elements' cycle for the Habsburg court. Seen from a distance it is a human head in profile; up close the head has no flesh at all, but is assembled entirely from land animals, a heap of deer, boar, elephant and hare interlocking into a face. The boundary between the body and the natural world simply dissolves: the person is made of the earth's creatures, nothing more. That is the pictorial cousin of the works Tate Modern gathers in its Ana Mendieta survey, where a figure is not painted onto nature but literally formed from mud, gunpowder, flowers and stone. Both artists refuse the usual border of the skin and let the human silhouette be built out of the living ground. Arcimboldo does it as courtly wit; Mendieta does it as elegy and ritual, though her own images stay under copyright and cannot stand in for themselves here. Four centuries apart, each insists that a human shape can be composed, wholly, of the earth.",
        "excerpt": "A profile head that resolves, on close looking, into a dense pile of interlocked land animals, antlers and haunches and flanks standing in for brow, cheek and jaw. The face is entirely earthbound creatures; the border between body and nature has been painted out. It is a Renaissance riddle in which a person turns out to be made, literally, of the ground's living things.",
        "source": "Giuseppe Arcimboldo, 'Earth' (c. 1566), LIECHTENSTEIN, The Princely Collections, Vaduz-Vienna",
        "href": "https://www.liechtensteincollections.at/en/collections-online/terra-earth",
        "image": {
          "src": "/covers/ana-mendieta-tate-modern-survey--a4.png",
          "alt": "Arcimboldo's painting 'Earth', a human profile head composed entirely of land animals",
          "credit": "Giuseppe Arcimboldo, 'Earth' (c. 1566); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Mahler (1860-1911) wrote 'Das Lied von der Erde' (The Song of the Earth) in 1908-09, after the death of his young daughter and his own diagnosis with fatal heart disease. Scored for two singers and orchestra, it sets Chinese poems about drink, youth and beauty, but its enormous final movement, 'Der Abschied' (The Farewell), turns to leave-taking, the singer bidding the world goodbye while, all around, 'the dear earth everywhere blossoms in spring and grows green anew.' The music thins to almost nothing on the repeated word 'ewig', forever, the human voice fading while the earth endures. That opposition, a mortal individual dissolving against a renewing, deathless ground, is the exact chord Tate Modern's Ana Mendieta survey strikes. Her 'earth-body' silhouettes are made to vanish; the mud smooths over, the fire burns out, and the land closes and greens again, indifferent and eternal. Mahler and Mendieta both stage a farewell in which the person disappears and the earth blooms on. Both make impermanence itself the subject, and find in the surviving soil a strange, cold consolation.",
        "excerpt": "The score's final movement, 'Der Abschied,' stretches a single farewell over nearly half an hour, the orchestra sinking toward silence as the earth is described blossoming and greening anew. The voice repeats 'ewig', forever, softer each time, until it dissolves into the held, fading harmony. The human presence ebbs away; the music leaves only the abiding, renewing earth.",
        "source": "Gustav Mahler, 'Das Lied von der Erde' (1908-09), full score via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Das_Lied_von_der_Erde_(Mahler,_Gustav)",
        "image": {
          "src": "/covers/ana-mendieta-tate-modern-survey--a5.png",
          "alt": "Photographic portrait of the composer Gustav Mahler, 1909",
          "credit": "Gustav Mahler photographed by the A. Dupont studio, New York, 1909; public domain, via Wikimedia Commons"
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
