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
    "slug": "graham-dies-aortic-tear",
    "headline": "U.S. Senator Lindsey Graham dies at 71; a medical examiner attributes his death to an aortic tear",
    "overview": "U.S. Senator Lindsey Graham of South Carolina, a prominent Republican and hawkish foreign-policy voice who was a close ally of President Donald Trump, died over the weekend at age 71, and a medical examiner said on July 13, 2026, that the cause was a tear in his aorta. The four-term senator, a fixture on Capitol Hill for more than two decades, was remembered across party lines as colleagues returned to a Senate facing an uncertain agenda. Officials in South Carolina began weighing how to fill his seat.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxNcGhrZ2FzTUtJem9sWmVlbWNIVFdEdmw0dGNpXzZoenpMLXNIVXZGblVJOEs3MUhPU2hwQTF2cUVtU0VfWjZlOUdmc0pfQy0xWE0xYlFuaDhCY0pBcVFMU3p3dkM3ZXhlc04tdTlEOEpSMDVzWkJ4ZkFlQmVPOVM4ZjhoOVZJdHFXRDVIOUhTMDlVZDMtenEyWmxR?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn75083d472o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/graham-dies-aortic-tear.png",
      "alt": "Official U.S. Senate photographic portrait of Lindsey Graham of South Carolina.",
      "credit": "United States Congress (Senate), official Senate portrait. Public domain (work of the U.S. federal government) via Wikimedia Commons."
    },
    "lead": true,
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Athens' guiding voice, the strategist Pericles, was carried off by plague barely two and a half years into the war he had counseled — his body failing where his judgment had not. Thucydides observes that the city came to appreciate the correctness of his foresight only after his death, the way a republic suddenly weighs a fixture it had taken for granted. Graham, a hawkish architect of America's posture abroad, is felled not by an enemy but by his own aorta, and Washington now measures the silence he leaves.",
        "excerpt": "For as long as he was at the head of the state during the peace, he pursued a moderate and conservative policy; and in his time its greatness was at its height. When the war broke out, here also he seems to have rightly gauged the power of his country. He outlived its commencement two years and six months, and the correctness of his previsions respecting it became better known by his death.",
        "source": "Thucydides, History of the Peloponnesian War, Book II, ch. 65, trans. Richard Crawley (c. 431–404 BC; translation 1874). Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Henry Clay, the Great Compromiser and towering Senate orator, died in 1852 and was mourned by rivals as much as allies; the young Lincoln, adopting a political opponent's newspaper tribute, gave the grief its language. The passage laments a voice 'hushed—hushed for ever,' the loss of a form that once rose in the council-chambers to beat back the storms of faction. The Senate that reconvenes to eulogize Graham across the aisle reenacts an old American rite: the chamber briefly uniting to bury one of its own fixtures.",
        "excerpt": "Alas! who can realize that Henry Clay is dead! Who can realize that never again that majestic form shall rise in the council-chambers of his country to beat back the storms of anarchy which may threaten, or pour the oil of peace upon the troubled billows as they rage and menace around? Who can realize that the workings of that mighty mind have ceased, that the throbbings of that gallant heart are stilled, that the mighty sweep of that graceful arm will be felt no more, and the magic of that eloquent tongue, which spake as spake no other tongue besides, is hushed—hushed for ever!",
        "source": "Abraham Lincoln, Eulogy on Henry Clay, delivered at Springfield, Illinois, July 6, 1852 (quoting a contemporary newspaper tribute); in Life and Works of Abraham Lincoln, Vol. III. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Life_and_Works_of_Abraham_Lincoln/Volume_3/Eulogy_of_Henry_Clay"
      },
      {
        "category": "literary",
        "title": "Shirley's dirge insists that no rank or armour shields a man from death — 'Death lays his icy hand on kings,' and sceptre and crown tumble into common dust. A senator of great power and sharper tongue is, at the last, leveled with any 'poor crooked scythe and spade.' A torn aorta is that icy hand, indifferent to office, party, or the strength of the man it seizes.",
        "excerpt": "The glories of our blood and state\nAre shadows, not substantial things;\nThere is no armour against fate;\nDeath lays his icy hand on kings:\nSceptre and Crown\nMust tumble down,\nAnd in the dust be equal made\nWith the poor crooked scythe and spade.",
        "source": "James Shirley, \"Death the Leveller\" (from The Contention of Ajax and Ulysses, 1659), as printed in Palgrave's Golden Treasury of English Songs and Lyrics. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Page:Golden_Treasury_of_English_Songs_and_Lyrics.djvu/75"
      },
      {
        "category": "literary",
        "title": "David's lament over Saul and Jonathan is the archetype of the eulogy that crosses enmity: he mourns even the king who had hunted him, crying 'how are the mighty fallen.' For a warrior-politician the elegy fits doubly, since the mighty man and the weapons of war perish together. Its refrain supplies the very note Washington strikes when old adversaries rise to praise a fallen hawk.",
        "excerpt": "The beauty of Israel is slain upon thy high places: how are the mighty fallen! ... How are the mighty fallen in the midst of the battle! O Jonathan, thou wast slain in thine high places. I am distressed for thee, my brother Jonathan: very pleasant hast thou been unto me: thy love to me was wonderful, passing the love of women. How are the mighty fallen, and the weapons of war perished!",
        "source": "The Holy Bible, King James Version (1611), 2 Samuel 1:19, 25–27 — David's lament for Saul and Jonathan. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/2_Samuel"
      },
      {
        "category": "artistic",
        "title": "Copley's vast canvas freezes the moment the Earl of Chatham — William Pitt, the great war-voice of his age — collapses mid-debate among the assembled peers, his body giving way inside the very chamber where his eloquence had reigned. Fifty-five statesmen turn as one toward the stricken orator, a legislature absorbing in real time the fall of its fixture. It is the nearest thing painting offers to a senator struck down on the floor, and to the hush that follows.",
        "excerpt": "Oil on canvas depicting William Pitt, 1st Earl of Chatham, seized by a fatal collapse during a debate in the House of Lords on 7 April 1778. Robed peers crowd around and reach toward the falling statesman beneath a shadowed canopy; light falls on his pale, swooning figure at the center as the chamber freezes in alarm.",
        "source": "John Singleton Copley, The Death of the Earl of Chatham, 1779–81, oil on canvas, Tate / National Portrait Gallery, London. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Death_of_the_Earl_of_Chatham_by_John_Singleton_Copley.jpg",
        "image": {
          "src": "/covers/graham-dies-aortic-tear--a5.png",
          "alt": "Crowded 18th-century House of Lords scene in which the robed Earl of Chatham collapses at center, held up by alarmed peers who press around him.",
          "credit": "John Singleton Copley, The Death of the Earl of Chatham (1779–81), Tate. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The second movement of Beethoven's 'Eroica' is a funeral march written for a fallen hero — a slow C-minor tread over muffled, drum-like basses that has accompanied the mourning of statesmen and soldiers for two centuries. Beethoven set it inside a symphony about heroic ambition precisely to reckon with the grief that shadows the man of action. It is the sound a republic makes when it lays a warrior to rest.",
        "excerpt": "A funeral march (Marcia funebre: Adagio assai) in C minor forming the symphony's second movement: a solemn, halting theme over low muffled figures suggesting drums and a procession, rising to a fugal climax before dissolving into broken, fading phrases of mourning.",
        "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 (\"Eroica\"), 2nd movement, \"Marcia funebre,\" composed 1803–04. Full score at IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 1
  },
  {
    "slug": "qatar-former-emir-hamad-dies",
    "headline": "Sheikh Hamad bin Khalifa Al Thani, the former emir who transformed Qatar into a gas-rich power, dies at 74",
    "overview": "Sheikh Hamad bin Khalifa Al Thani, who seized power in Qatar in a bloodless 1995 coup against his father and later abdicated in favor of his son in 2013, has died at 74, the Qatari royal court announced on July 13, 2026. During his reign he turned the small Gulf peninsula into one of the world's wealthiest states, building a vast liquefied-natural-gas industry, founding the Al Jazeera network, and winning the bid to host the 2022 World Cup. He was mourned across the Arab world as an ambitious and transformative leader.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNWjRDaUlZZWhZMlBnRGVNSmRGNzBoLWVGeXJEWVljdkZwNVkwcTNJT3pURUs5aXR5UkF1RzdzZDRUUWNGSnJnajlYRGptM3U1a01lUEVGRk1xT05sWjdRYjd6MFVOd0JYV3paSndLTEJkVkxwQ01UZmp1S0ZvS2ItOFlVT0xfN2dQd05DZThBVk43NldxaElUUEh4S19JdDl6WGc?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxObXNsemVrTDJtTnUzY3hkSVNKRWJkT3hnNEZkWENpc2VSYlhuR2hZbmVKZFlWQ3dfdVhsamxCNXFSMENzNmhfU2VnTzJHTTFfeDg2Z3QtYXhyQUFveGhOLU9OTV9GblVkdHN2NUZObmdyN0lPTmRrYTlUN1lzZWpvU2syNlM4aVNJU1E3anZnM3YwZE00LTItMkhpMW5zQzFaYnFwNzlzdGZTbVVxb3RN0gG0AUFVX3lxTE1SVS1PNUNQUjN0N1k4RzNvWlJPX1hmMTFuTXBRZjgzQjUtRnhhZHFCUVRyTHZybmhGend5RzJfQWV6bDdQaUNwTWo5X1o2U0FhTkJfYWxrdzhxdlJDQ0NEZUg5aHQtenFGejFBOGJOMzhuQ0JQYU1oZ05iOFRNTUdEdnFSVHhsSnEtNFRaR2V6QXRNWFBJZFF6V0dlOU83YnNkQnFoZmZOZk93VlVfV2xncjB1Ug?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/qatar-former-emir-hamad-dies.png",
      "alt": "Sheikh Hamad bin Khalifa Al Thani, Emir of Qatar, photographed during a 1997 visit to the Pentagon.",
      "credit": "U.S. Department of Defense (Pentagon) photograph, 11 June 1997. Public domain (U.S. federal government work), via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Croesus turned a modest Anatolian kingdom into a byword for wealth, panning gold from the sands of the river Pactolus much as Hamad drew fortunes from the gas beneath Qatar's peninsula. When the Athenian sage Solon toured his treasure-houses, he pointedly refused to call the king happy, insisting no man be judged fortunate until his life has closed. For an emir who amassed glittering wealth and then, rarely, laid down power before death could take it, Solon's caution reads like the fitting text at the graveside.",
        "excerpt": "For thyself, oh! Croesus, I see that thou art wonderfully rich, and art the lord of many nations; but with respect to that whereon thou questionest me, I have no answer to give, until I hear that thou hast closed thy life happily.",
        "source": "Herodotus, The Histories, Book 1.32, trans. George Rawlinson (1858-60); Solon's reply to Croesus, King of Lydia.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_1"
      },
      {
        "category": "historical",
        "title": "In December 1783, at the height of his power and adored by an army that might have crowned him king, George Washington instead handed his commission back to Congress and rode home to his farm. The voluntary surrender of supreme authority is among history's rarest acts, which is precisely what made Hamad's 2013 abdication so startling to the watching world. Both men chose to leave the stage while still applauded, trusting a chosen successor rather than clinging until death pried power from their hands.",
        "excerpt": "Having now finished the work assigned to me, I retire from the great theatre of Action; and bidding an Affectionate farewell to this August body under whose orders I have so long acted, I here offer my Commission, and take my leave of all the employments of public life.",
        "source": "George Washington, Address to Congress on Resigning His Commission, Annapolis, 23 December 1783.",
        "href": "https://en.wikisource.org/wiki/Resignation_as_commander-in-chief_of_the_Continental_Army"
      },
      {
        "category": "literary",
        "title": "Shakespeare's dying Henry IV wakes to find his son Hal has already lifted the crown from the pillow and set it on his own head, and the old king's wounded question captures the ancient friction between a father's throne and a son's ambition. Hamad did not wait by any deathbed: in 1995 he took power from his living father in a bloodless palace coup, seizing the crown, as the play has it, before its hour was ripe. Yet the drama's deeper irony fits him too, for this usurping son would one day hand the same crown, freely, to a son of his own.",
        "excerpt": "Dost thou so hunger for mine empty chair / That thou wilt needs invest thee with my honors / Before thy hour be ripe?",
        "source": "William Shakespeare, Henry IV, Part 2, Act 4, Scene 3 (Folger Shakespeare Library edition); King Henry IV rebuking Prince Hal.",
        "href": "https://www.folger.edu/explore/shakespeares-works/henry-iv-part-2/read/4/3/"
      },
      {
        "category": "literary",
        "title": "Shelley's traveller finds only two vast legs and a shattered face half-sunk in desert sand, all that survives of a king who once commanded the mighty to look on his works and despair. It is the eternal rebuke to every ruler who builds monuments against mortality, and it hangs over the gleaming towers Hamad raised from the Gulf sand. The obituary of any desert king is written, in the end, in that boundless and level emptiness stretching far away.",
        "excerpt": "And on the pedestal these words appear: / 'My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!' / Nothing beside remains. Round the decay / Of that colossal wreck, boundless and bare, / The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), closing lines.",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt"
      },
      {
        "category": "artistic",
        "title": "Honthorst paints the moment the wise Solon stands unimpressed before Croesus enthroned amid his heaped gold and silver, warning that no measure of treasure secures a happy end. The Caravaggesque light falls at once on the king's glittering riches and on the sage's raised, cautioning hand, a Baroque memento that wealth and mortality keep close company. Set beside the passing of a monarch who turned a poor peninsula into one of Earth's richest states, the canvas becomes a quiet meditation on what gold can never purchase.",
        "excerpt": "Oil on canvas in which the Athenian lawgiver Solon, gesturing in admonition, confronts the seated Lydian king Croesus surrounded by gold and silver vessels. Dramatic chiaroscuro throws the piled treasure into gleaming relief against deep shadow, staging the sage's warning that riches are no guarantee of a fortunate life.",
        "source": "Gerard van Honthorst, Solon and Croesus, 1624, oil on canvas, Hamburger Kunsthalle, Hamburg (inv. HK-772).",
        "href": "https://commons.wikimedia.org/wiki/File:Honthorst_solon_and_croesus.jpg",
        "image": {
          "src": "/covers/qatar-former-emir-hamad-dies--a5.png",
          "alt": "Baroque painting of the sage Solon gesturing in warning before King Croesus seated among heaps of gold and silver treasure.",
          "credit": "Gerard van Honthorst, Solon and Croesus (1624), Hamburger Kunsthalle. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Handel wrote Zadok the Priest for a coronation, its long-gathering strings breaking into a sudden choral blaze at the instant a new king is anointed and the people cry that he may live for ever. Its words recall the orderly passing of David's crown to Solomon, power delivered to a chosen heir, the very thing Hamad enacted in 2013 when he anointed his son emir. The anthem is a hymn to succession itself, and to the hope that a kingdom outlasts the king who made it.",
        "excerpt": "Zadok the priest, and Nathan the prophet, anointed Solomon king. And all the people rejoiced, and said: God save the King! Long live the King! May the King live for ever.",
        "source": "George Frideric Handel, Zadok the Priest, HWV 258, Coronation Anthem No. 1 (1727); words after 1 Kings 1:38-40.",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)"
      }
    ],
    "rank": 2
  },
  {
    "slug": "houthis-accuse-saudi-sanaa-airport",
    "headline": "Yemen's Houthis accuse Saudi Arabia of airstrikes on Sanaa's international airport and vow retaliation",
    "overview": "Yemen's Iran-aligned Houthi movement said Saudi-led airstrikes hit Sanaa International Airport on July 13, 2026, and vowed to retaliate, in a sharp escalation of a conflict that had been relatively quiet. The Houthis, who control the capital and much of northern Yemen, said the strikes damaged the airport; there was no immediate Saudi confirmation. The exchange revived fears of a wider resumption of a war that has already caused one of the world's worst humanitarian crises.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQMGJJX3RrZlBnOUd3aXc5VlloY3JNOVN4V0xqX1EycG5QcU5DNUlWQU1qNmZWbUpMTTFLZjdyTzY1NTFNOFJ1d3F1aFlobUMzN1VDdnp3RWJibHI2MGFaaWZzdTJGVEJfYlFVZk5DUVRCN1V6Z1JOMTl5aldnOFUtUXdSSFFEZmR4ZUhueEM0M1o4VE4wck1HTmF5SQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxQV2Q4MUdSUXZ0ZWdUWnM4SFNoV0lqYlBHTy1PMURKeFA1TS02RWRjbVZDYzJTY29obkdIa29MV2Y1WjZta2c5TXRzTEdNRjc3alR0MGtNV3QzUXpoanJyLWQ4VHV4NlM2WloyaWZaenV1Y1hqUjY1dHNaaXRiWnoxdmxLYWtyNURVQlRfblZjaFBYTmdXNDVVVFFlM1BWS3M2SzFOcm5MakVrYWNwM01aT0s2UThnckpQRDlSUjdqRjlMaWM4eTJtRG5JZU9FQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/houthis-accuse-saudi-sanaa-airport.png",
      "alt": "The old city of Sana'a, Yemen, with its distinctive traditional tower-houses",
      "credit": "Rod Waddington, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 25 BC the emperor Augustus dispatched Aelius Gallus with a Roman army deep into 'Arabia Felix' — the incense-rich south of Yemen — to seize the fabled wealth of Saba. Strabo, writing within living memory of the campaign, records how the legions reached the walls of Marib and laid siege to it, only to break off, beaten less by the defenders than by thirst and disease. Two thousand years later a foreign power again strikes at the Sabaean heartland from outside, and the hinterland of that same ancient capital becomes once more a theatre of siege.",
        "excerpt": "advanced to a city called Marsiaba, which belonged to the tribe of the Rhammanitae, who were subject to Ilasarus. Now he assaulted and besieged this city for six days, but for want of water desisted.",
        "source": "Strabo, Geography, Book XVI, Chapter 4, section 24 (on the expedition of Aelius Gallus into Arabia Felix); English translation, LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/16D*.html"
      },
      {
        "category": "historical",
        "title": "On 26 April 1937 the German Condor Legion and Italian aircraft reduced the Basque town of Guernica to rubble in a single afternoon, the first time modern warplanes deliberately annihilated a defenceless town — an atrocity that gave the twentieth century its template for the terror-bombing of cities. Photographs of its gutted streets became a universal emblem of what falls from the sky onto civilians. The Houthi charge that warplanes struck Sanaa's airport places Yemen's capital in that same long shadow, where a city wakes to find its gateway to the world in ruins.",
        "excerpt": "In a single afternoon, waves of bombers and fighters set the market town ablaze and machine-gunned those who fled into the surrounding fields, leaving its centre a smoking shell. It was aerial warfare turned deliberately upon civilians, and the ruined streets recorded in this photograph became the century's enduring image of a city bombed from the air.",
        "source": "Photograph of the ruins of Guernica after the aerial bombing of 26 April 1937 by the German Condor Legion; German Federal Archives (Bundesarchiv, Bild 183-H25224).",
        "href": "https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-H25224,_Guernica,_Ruinen.jpg",
        "image": {
          "src": "/covers/houthis-accuse-saudi-sanaa-airport--a2.png",
          "alt": "The ruins of Guernica, Spain, in 1937 after the aerial bombardment by the German Condor Legion",
          "credit": "Bundesarchiv, Bild 183-H25224 / Unknown author / CC-BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The oldest war poem in the Western canon opens not with a battle but with a wrath — the anger that spends brave lives and yields heroes as a prey to dogs and vultures. Homer's Troy is a besieged city awaiting its doom, and the Iliad's engine is the endless answer of blow to blow, vengeance breeding vengeance until a whole people is consumed. The Houthi vow to retaliate for the strike on Sanaa echoes that oldest logic, in which wrath calls forth wrath and no side can say where the reckoning ends.",
        "excerpt": "Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans. Many a brave soul did it send hurrying down to Hades, and many a hero did it yield a prey to dogs and vultures, for so were the counsels of Jove fulfilled from the day on which the son of Atreus, king of men, and great Achilles, first fell out with one another.",
        "source": "Homer, The Iliad, Book I (opening), translated by Samuel Butler (1898); Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt"
      },
      {
        "category": "literary",
        "title": "The Books of Kings preserve the memory of Sheba — the ancient south-Arabian kingdom centred on Yemen — as a byword for fabulous wealth: a queen arriving at Jerusalem with camel-trains of gold and spices in an abundance never seen again. That prosperous, storied land is the same Yemen now battered by a decade of war and fresh airstrikes. Set against a bombed capital, the scripture's vision of Sheba's caravans and treasure reads as an elegy for a kingdom whose fame has curdled into ruin.",
        "excerpt": "And when the queen of Sheba heard of the fame of Solomon concerning the name of the LORD, she came to prove him with hard questions. And she came to Jerusalem with a very great train, with camels that bare spices, and very much gold, and precious stones... And she gave the king an hundred and twenty talents of gold, and of spices very great store, and precious stones: there came no more such abundance of spices as these which the queen of Sheba gave to king Solomon.",
        "source": "The Holy Bible, King James Version, 1 Kings 10:1-2, 10 (the visit of the Queen of Sheba to Solomon); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "artistic",
        "title": "John Martin painted 'The Great Day of His Wrath' with the whole material world hurled into a fiery abyss, entire cities torn from their foundations by cataclysm — a Victorian vision of divine vengeance and total destruction drawn from the Book of Revelation. Its lurid glare and collapsing towers eerily anticipate the modern spectacle of a metropolis lit up under bombardment. It offers a fitting image for a capital its inhabitants say was struck from the heavens, and for the answering 'wrath' each side now promises the other.",
        "excerpt": "A whole landscape of cities and mountains is flung into a blazing chasm, rocks and buildings toppling amid a red and thunderous darkness. Martin renders the wrath of the Apocalypse as an apocalypse of the built world itself — towers and multitudes swallowed in a single instant of fire.",
        "source": "John Martin, The Great Day of His Wrath (1851-1853), oil on canvas, Tate Britain, London.",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Great_Day_of_His_Wrath_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/houthis-accuse-saudi-sanaa-airport--a5.png",
          "alt": "John Martin's apocalyptic painting The Great Day of His Wrath, showing a city and mountains cast into a fiery abyss",
          "credit": "John Martin, The Great Day of His Wrath (1851-53), Tate Britain; public domain, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi set the medieval 'Dies irae' — the 'day of wrath' — as the terrifying heart of his Requiem: hammering drums and a shrieking chorus conjuring a world dissolved in ashes. Composed in 1874, it remains music's most visceral rendering of judgement falling from above, of a day when the sky itself becomes an instrument of destruction. Its Latin lines, sung over and over as catastrophe descends, speak uncannily to a city bracing under airstrikes and to the vows of retribution that follow.",
        "excerpt": "Dies iræ, dies illa, / Solvet sæclum in favilla, / Teste David cum Sybilla. / Quantus tremor est futurus, / Quando Judex est venturus, / Cuncta stricte discussurus.",
        "source": "Giuseppe Verdi, Messa da Requiem (1874), 'Dies irae' movement; text from the medieval Latin sequence attributed to Thomas of Celano. Score at IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 3
  },
  {
    "slug": "germany-convicts-couple-yazidi-enslavement",
    "headline": "A German court convicts an Iraqi couple of enslaving Yazidi girls under the Islamic State",
    "overview": "A court in Germany on July 13, 2026, convicted an Iraqi couple of enslavement and crimes against humanity for holding Yazidi girls as slaves after the pair joined the Islamic State group, sentencing one defendant to life imprisonment. Prosecutors said the couple bought and abused captives seized during ISIS's 2014 genocide of the Yazidi minority in northern Iraq. The verdict is part of Germany's use of universal-jurisdiction laws to prosecute atrocities committed abroad.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cg53rp4e2j4o"
      },
      {
        "name": "Deutsche Welle",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxOS2RpT0hYS1g5V24xZEU2emxHLWhlS2c5NTlwb2FiR2llMUFwWXo1LWRMd2IzdUtTUDJsMm9jcVk4R0lqdnN4VEQ4Z2o3VE42VXJVWndOWUFLZ1A0Uk5IZFdlUUJaV1l4Sm4zeXduSnZXQXZUSU9tSVpIaVlfOWpoOUtheHNHRDhlaEFKTzE5QdIBjwFBVV95cUxQb3RoUkZRLWZYRFFvWm1faWNXd21EUGRSUnNpbmtrbkR4MDR0ZUh4akdWR3RiTHU2VUlWalIzeF8yUXRGWmtPajA0SUFYaDMyQnpSLUlmTVNsUVQtQXM1Ui1ieUZoeUR3THVISlRqXzMtUUg3NzhQVHFBVEJLbklxeDZDN1ZqQlg0azlDSGRxbw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/germany-convicts-couple-yazidi-enslavement.png",
      "alt": "Nazi defendants seated in the dock at the Nuremberg Trials, 1945-46, where 'crimes against humanity' were first prosecuted.",
      "credit": "U.S. Army photograph of the defendants at the Nuremberg Trials, 1945-46. Public domain, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 416 BCE the Athenians besieged the small neutral island of Melos, and when it fell they killed every man of military age and sold the women and children into slavery. Thucydides records the atrocity in flat, unsparing prose that has echoed for millennia as the archetype of the strong doing what they will to the weak. The Yazidi women and girls seized by ISIS in 2014 relive that ancient logic of conquest, in which the female body is counted among the spoils. Germany's verdict answers Thucydides' silence with a name and a sentence.",
        "excerpt": "And the town being now strongly besieged, there being also within some that practised to have it given up, they yielded themselves to the discretion of the Athenians, who slew all the men of military age, made slaves of the women and children, and inhabited the place with a colony sent thither afterwards of five hundred men of their own.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5, ch. 116 (the fate of Melos), translated by Thomas Hobbes (1629); Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0247%3Abook%3D5%3Achapter%3D116"
      },
      {
        "category": "historical",
        "title": "When the Allies tried Nazi leaders at Nuremberg in 1945-46, the tribunal's charter coined a new legal category, 'crimes against humanity,' and listed enslavement among them. Its founding principle, that atrocities against a civilian population may be judged even when a state sanctioned them, is exactly what the German court invoked in 2026. Convicting an Iraqi couple under universal jurisdiction for crimes committed in Iraq is Nuremberg's long shadow reaching across borders and decades. The dock at Nuremberg and the dock in Germany are the same seat.",
        "excerpt": "Crimes against Humanity: namely, murder, extermination, enslavement, deportation, and other inhumane acts committed against any civilian population, before or during the war; or persecutions on political, racial or religious grounds in execution of or in connection with any crime within the jurisdiction of the Tribunal, whether or not in violation of the domestic law of the country where perpetrated.",
        "source": "Charter of the International Military Tribunal (Nuremberg), Article 6(c), 8 August 1945; The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/imt/imtconst.asp"
      },
      {
        "category": "literary",
        "title": "Euripides staged The Trojan Women in 415 BCE, only months after Athens' own sack of Melos, forcing his city to look upon the women it had enslaved. Hecuba, once queen of Troy, foresees herself dragged to a master's threshold to raise the children of her enemies. The play insists that the captive is a person with a remembered name and throne, not a chattel, the same insistence Yazidi survivors carried into a German courtroom. Across twenty-four centuries the lament of the enslaved woman is unchanged.",
        "excerpt": "And I the agèd, where go I,\n  A winter-frozen bee, a slave\nDeath-shapen, as the stones that lie\n  Hewn on a dead man's grave:\nThe children of mine enemy\nTo foster, or keep watch before\nThe threshold of a master's door,\n  I that was Queen in Troy!",
        "source": "Euripides, The Trojan Women, translated by Gilbert Murray (1905); the lament of Hecuba. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/10096/pg10096.txt"
      },
      {
        "category": "literary",
        "title": "Harriet Jacobs wrote Incidents in the Life of a Slave Girl (1861) to expose what enslavement meant for a girl: to be told she is another's property, subject to his will, with no shadow of law to shield her. Her testimony, set down while the wound was fresh, gives voice to the specific violation the Yazidi girls endured, ownership, sexual coercion, and the absence of any protector. Jacobs believed that naming the crime in a survivor's own words was itself an act of justice. The German verdict is the law at last catching up to that demand.",
        "excerpt": "He told me I was his property; that I must be subject to his will in all things. My soul revolted against the mean tyranny. But where could I turn for protection? No matter whether the slave girl be as black as ebony or as fair as her mistress. In either case, there is no shadow of law to protect her from insult, from violence, or even from death; all these are inflicted by fiends who bear the shape of men.",
        "source": "Harriet Jacobs, Incidents in the Life of a Slave Girl, Written by Herself (1861), from the chapter 'The Trials of Girlhood.' Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/11030/pg11030.txt"
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme's The Slave Market shows a buyer coldly probing the mouth of a naked captive woman while robed men appraise her like livestock. Painted as a nineteenth-century Orientalist tableau, it lays bare the ancient commerce in enslaved women that ISIS revived in 2014, complete with price lists and slave markets for captured Yazidis. The picture denies the viewer any comfortable distance; we are made to stand among the buyers. It is the visual grammar of the crime the German court condemned.",
        "excerpt": "Gérôme depicts a slave market in which a nude captive woman is displayed for sale as a prospective buyer forces open her mouth to inspect her teeth, the way one would check livestock. Around her, robed men wait their turn to appraise the merchandise. The cool, meticulous realism makes the transaction all the more chilling: a human being reduced to a body for purchase.",
        "source": "Jean-Léon Gérôme (1824-1904), The Slave Market (Le Marché d'esclaves), oil on canvas; via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_The_Slave_Market_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/germany-convicts-couple-yazidi-enslavement--a5.png",
          "alt": "Oil painting of a slave market: a nude captive woman stands while a buyer inspects her teeth and robed men look on.",
          "credit": "Jean-Léon Gérôme, 'The Slave Market' (Le Marché d'esclaves). Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Verdi's Nabucco (1842) gives the enslaved Hebrews, exiled in Babylon, the chorus 'Va, pensiero,' thought flying on golden wings back to a lost homeland. It became an anthem for every people torn from its soil and held in bondage, its longing indistinguishable from that of the Yazidis driven from Sinjar into captivity. The chorus mourns a ruined temple and a scattered nation, precisely the fate ISIS sought to impose on a religious minority. The music does what the verdict does: it refuses to let the captives be forgotten.",
        "excerpt": "Va, pensiero, sull'ali dorate;\nVa, ti posa sui clivi, sui colli,\nove olezzano tepide e molli\nl'aure dolci del suolo natal!\nDel Giordano le rive saluta,\ndi Sionne le torri atterrate…",
        "source": "Giuseppe Verdi, Nabucco (1842), Act III, 'Va, pensiero, sull'ali dorate' (Chorus of the Hebrew Slaves), libretto by Temistocle Solera. Full score on IMSLP (public domain).",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "congo-ebola-spreads-provinces",
    "headline": "Democratic Republic of Congo's Ebola outbreak spreads to two more provinces",
    "overview": "The Democratic Republic of Congo said its Ebola outbreak has spread to two additional provinces, health officials reported on July 13, 2026, widening an emergency that has strained the country's health system. Authorities are racing to trace contacts and deploy vaccines against the hemorrhagic fever, which spreads through bodily fluids and can be highly lethal. The World Health Organization has flagged the outbreak as a serious concern.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQeHZ5TlB5OTAwb0tINDBBRVBYaU5ERXJZQkthTmYtMXVlcTl4dFp1VFg4cFZlM0h6WGlTQ3hiWUpKSnFfX2VvZ2xJY013TXdrTTcxd3ZWTjNHM0JWVTRXZDI2MW9tRC1nZ05vRkZ1YUF5OFlFUXRaZXcxRi02a3U5TzBWZzJpOXVQWWEyWVZIaWdYeThxMHJMdFRWeDBfOURDQXB6WWk5TEN6TzY1MUVHSWUxTDVuQ2JLY0c2bQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://news.google.com/rss/articles/CBMiWkFVX3lxTE1wVERtZkpCMzNrZ1lKNHVlQ1RaS2N1QVcyaVRMT3JTV2puMTVvWm1IUEhVWklQVVFteDkyWEtXbmRiRHY5alpBN0hydEJuZDF6WXhxa003NXRqdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/congo-ebola-spreads-provinces.png",
      "alt": "Colorized transmission electron micrograph of an Ebola virus virion.",
      "credit": "Cynthia Goldsmith / CDC Public Health Image Library (PHIL #10816); public domain via Wikimedia Commons"
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 430 BC a plague, said to have travelled from Ethiopia through Egypt before striking Athens, mirrors the way Congo's Ebola has now leapt across provincial borders. Thucydides, who caught the disease and survived, recorded not only its relentless geographic spread but how mortal fear corroded the bonds of law and faith. His warning that a stricken people, expecting to die, ceases to be restrained by god or law is the oldest account of how contagion dissolves a society.",
        "excerpt": "It first began, it is said, in the parts of Ethiopia above Egypt, and thence descended into Egypt and Libya and into most of the King's country. Suddenly falling upon Athens, it first attacked the population in Piraeus... Fear of gods or law of man there was none to restrain them. As for the first, they judged it to be just the same whether they worshipped them or not, as they saw all alike perishing; and for the last, no one expected to live to be brought to trial for his offences",
        "source": "Thucydides, History of the Peloponnesian War, Book II, the Plague of Athens (430 BC), trans. Richard Crawley",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "As Ebola widens its reach across the Congo, the marked doors of London in 1665 offer a nearer echo. Samuel Pepys, walking through Drury Lane during the Great Plague, saw the first houses sealed and painted with a red cross and the plea 'Lord have mercy upon us'. His visceral dread, and his resort to tobacco against the contagion, capture the private terror that spreads faster than any pathogen.",
        "excerpt": "This day, much against my will, I did in Drury Lane see two or three houses marked with a red cross upon the doors, and \"Lord have mercy upon us\" writ there; which was a sad sight to me, being the first of the kind that, to my remembrance, I ever saw. It put me into an ill conception of myself and my smell, so that I was forced to buy some roll-tobacco to smell to and chaw, which took away the apprehension.",
        "source": "The Diary of Samuel Pepys, entry for 7 June 1665 (Great Plague of London), ed. Mynors Bright and H. B. Wheatley",
        "href": "https://www.gutenberg.org/files/4162/4162-h/4162-h.htm"
      },
      {
        "category": "literary",
        "title": "Boccaccio framed the Decameron with the 1348 plague of Florence, whose horror was less the dying than the unravelling of human ties. He describes brother forsaking brother and parents abandoning their own children to the pestilence - the same fracture the Congo's health workers fight as fear of Ebola tempts families to flee the sick. It is literature's classic anatomy of how an epidemic corrodes love and duty from within.",
        "excerpt": "that brother forsook brother, uncle nephew and sister brother and oftentimes wife husband; nay (what is yet more extraordinary and well nigh incredible) fathers and mothers refused to visit or tend their very children, as they had not been theirs.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction to Day the First (the 1348 plague of Florence), trans. John Payne",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm"
      },
      {
        "category": "literary",
        "title": "Defoe's Journal of the Plague Year reconstructs London's 1665 outbreak through the rising bills of mortality and the panicked exodus of those with means to run. His scene of nobility and gentry thronging out of the city, carts loaded with goods, is the archetype of flight from a stricken land - and a mirror of the population movements that now help Ebola jump from province to province. The novel shows how rumor, statistics and fear drive an epidemic's human geography.",
        "excerpt": "increase of burials in St Giles's parish more than usual, it began to be suspected that the plague was among the people at that end of the town... the richer sort of people, especially the nobility and gentry from the west part of the city, thronged out of town with their families and servants in an unusual manner",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722), a narrative of London's Great Plague of 1665",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm"
      },
      {
        "category": "artistic",
        "title": "Bruegel's The Triumph of Death imagines pestilence as an unstoppable army of skeletons overrunning an entire land, dragging king and peasant alike into a single, borderless catastrophe. Painted around 1562 in the shadow of Europe's recurring plagues, it renders exactly the dread now spreading with Ebola across the Congo's provinces: a contagion that respects no rank, prayer or frontier. The panel is the visual grammar of an emergency that strains every bond of society at once.",
        "excerpt": "An army of skeletons lays waste to a scorched, smoke-darkened land while the living are herded toward a coffin-like trap. The dead haul a cart of skulls and cut down king, cardinal and peasant without distinction; no rank, wealth or prayer holds back the advancing tide. It is a whole world engulfed at once by a borderless mortality.",
        "source": "Pieter Bruegel the Elder, The Triumph of Death, c. 1562, oil on panel, Museo Nacional del Prado, Madrid (P01393)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Triumph_of_Death_by_Pieter_Bruegel_the_Elder.jpg",
        "image": {
          "src": "/covers/congo-ebola-spreads-provinces--a5.png",
          "alt": "Pieter Bruegel the Elder's painting The Triumph of Death, showing armies of skeletons overwhelming people of every rank across a devastated landscape.",
          "credit": "Pieter Bruegel the Elder, c. 1562, Museo del Prado; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Saint-Saëns's Danse macabre sets Henri Cazalis's poem of Death fiddling in a graveyard at midnight while the dead rise and dance - the plague year's oldest emblem, the danse macabre, turned into sound. Its whirling waltz, quoting the Dies irae chant of judgment, evokes the leveling terror of an epidemic in which all ranks join the same procession. As Ebola spreads through the Congo, the tone poem is a fitting requiem for a fear that dances across every border.",
        "excerpt": "Zig et zig et zig, la mort en cadence\nFrappant une tombe avec son talon,\nLa mort à minuit joue un air de danse,\nZig et zig et zag, sur son violon.\n\nLe vent d'hiver souffle, et la nuit est sombre,\nDes gémissements sortent des tilleuls;\nLes squelettes blancs vont à travers l'ombre\nCourant et sautant sous leurs grands linceuls,",
        "source": "Henri Cazalis, 'Danse macabre' (epigraph poem), set by Camille Saint-Saëns as Danse macabre, Op. 40 (1874); score at IMSLP",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)"
      }
    ],
    "rank": 5
  },
  {
    "slug": "spacex-starship-review-cleared",
    "headline": "A U.S. regulator closes its safety review, clearing SpaceX's Starship for its next test flight",
    "overview": "A U.S. aviation regulator has closed its mishap review of SpaceX's giant Starship rocket, clearing the way for the company's next test flight, officials said on July 13, 2026. The decision follows a string of explosive test failures during the vehicle's development and comes weeks after SpaceX's landmark stock-market debut. Starship, the most powerful rocket ever built, is central to plans for carrying cargo and eventually people beyond Earth orbit.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxNSDlGX0dNNkh1R0ttWnF1YjkweWdic25XU3dQUGtKTTRmWldTenhab0d0dk80c0JZZUJkdkJGTm5pT01tVVJsMDFOdG02UlRGbG9TY0Z2bGp2Q3VhazVORzd4ZkFCd1pzSlFTQzdkT21LLU1hanNBMWVMaFBHclNQb2VRcmE0VkJraVpjbWxOM2hrdHU4eHBfMVNXSG5RRS05NUh2T0VZQmY1N05mRFlUMGYtYldtRWxZbndtU3RUSHZwN05Y?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c3wyj6e4210o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/spacex-starship-review-cleared.png",
      "alt": "The launch plume of a SpaceX Starship rocket rising from the Texas coast, photographed from orbit aboard the International Space Station.",
      "credit": "NASA / Don Pettit; public domain (work of the U.S. federal government), via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Before rockets, humanity's first ascent to the heavens rode on hot air and hydrogen. In 1783 Benjamin Franklin stood in a Paris crowd and watched an unmanned balloon climb until it was 'scarce bigger than an Orange,' the first craft people ever sent deliberately toward the sky. Like the crowds now tracking Starship, he understood that a fragile, half-understood machine had opened a road upward, and that the point was not immediate use but wonder and what might follow.",
        "excerpt": "There was some Wind, but not very strong. A little Rain had wet it, so that it shone, and made an agreeable Appearance. It diminish'd in Apparent Magnitude as it rose, till it enter'd the Clouds, when it seem'd to me scarce bigger than an Orange, and soon after became invisible, the Clouds concealing it.",
        "source": "Benjamin Franklin to Sir Joseph Banks, 30 August 1783, describing M. Charles's hydrogen balloon ascent at the Champ de Mars, Paris (27 August 1783); reprinted in Abbott Lawrence Rotch, 'Benjamin Franklin and the First Balloons' (Worcester, 1907), Project Gutenberg.",
        "href": "https://gutenberg.org/files/43809/43809-h/43809-h.htm"
      },
      {
        "category": "historical",
        "title": "Starship's promise is to carry cargo and people beyond Earth orbit, the same frontier Apollo 11 first crossed in 1969. That triumph came only after the fatal Apollo 1 fire and years of explosive test failures, until the Eagle finally settled onto the Moon and Neil Armstrong stepped down. A regulator clearing Starship to fly again after its own string of fiery breakups echoes that pattern exactly: catastrophe, relentless iteration, and then a giant leap.",
        "excerpt": "Houston, Tranquility Base here, the Eagle has landed. [...] That's one small step for [a] man, one giant leap for mankind.",
        "source": "Apollo 11 lunar landing and first steps, 20 July 1969; NASA History, '55 Years Ago: Apollo 11's One Small Step, One Giant Leap.'",
        "href": "https://www.nasa.gov/history/55-years-ago-apollo-11s-one-small-step-one-giant-leap/"
      },
      {
        "category": "literary",
        "title": "The daring and hubris of flight has a founding myth: Daedalus's wax-and-feather wings and his son Icarus's fatal climb toward the sun. Starship's repeated fiery disintegrations read like Icarus falls in miniature, the price of soaring too fast and too high on untested wings. Yet Daedalus, who buried his son, flew on to safety, the myth's quiet reminder that the fall is a lesson to those willing to try the sky again.",
        "excerpt": "but as he neared the scorching sun, its heat softened the fragrant wax that held his plumes; and heat increasing melted the soft wax— he waved his naked arms instead of wings, with no more feathers to sustain his flight. And as he called upon his father's name his voice was smothered in the dark blue sea, now called Icarian from the dead boy's name.",
        "source": "Ovid, Metamorphoses, Book VIII (Daedalus and Icarus), trans. Brookes More (Boston: Cornhill Publishing Co., 1922); Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=8:card=183"
      },
      {
        "category": "literary",
        "title": "In 1865 Jules Verne imagined an American gun club firing three men moonward from Florida, uncannily near the coast from which SpaceX now launches. His departure is pure fire and thunder, a projectile 'victoriously cleaving the air in the midst of the fiery vapors.' Starship, the most powerful rocket ever built, makes Verne's spectacle literal, and a regulator's approval is the modern counterpart of his Gun Club's long-awaited command to fire.",
        "excerpt": "Instantly Murchison pressed with his finger the key of the electric battery, restored the current of the fluid, and discharged the spark into the breech of the Columbiad. An appalling unearthly report followed instantly, such as can be compared to nothing whatever known, not even to the roar of thunder, or the blast of volcanic explosions! No words can convey the slightest idea of the terrific sound! An immense spout of fire shot up from the bowels of the earth as from a crater. The earth heaved up, and with great difficulty some few spectators obtained a momentary glimpse of the projectile victoriously cleaving the air in the midst of the fiery vapors!",
        "source": "Jules Verne, From the Earth to the Moon, Chapter XXVI ('Fire!'), trans. Louis Mercier and Eleanor E. King (1873); Wikisource.",
        "href": "https://en.wikisource.org/wiki/From_the_Earth_to_the_Moon/Chapter_XXVI"
      },
      {
        "category": "artistic",
        "title": "Bruegel sets a great catastrophe in a corner: a ploughman, a shepherd, and a fisherman work on while Icarus's pale legs vanish into the sea, unnoticed. It is a bracing gloss on Starship's explosions, dramatic fireballs the world quickly moves past as the next launch is prepared. The painting quietly asks whether we truly reckon with the fall, or simply keep our eyes on the flight and the fields.",
        "excerpt": "In a luminous coastal landscape a ploughman, a shepherd and a fisherman go calmly about their work while, almost hidden in the lower right, two pale legs disappear into the green water, all that is left of Icarus after his plunge from the sky. The great human disaster is reduced to a splash at the edge of an indifferent, sunlit world that carries on regardless.",
        "source": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1555-1560, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/spacex-starship-review-cleared--a5.png",
          "alt": "Bruegel painting of a sunlit sea and coastline with a ploughman, a shepherd and a sailing ship, while Icarus's legs disappear into the water at the lower right.",
          "credit": "Pieter Bruegel the Elder, Landscape with the Fall of Icarus (c. 1555-1560), Royal Museums of Fine Arts of Belgium, Brussels; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Holst gave each planet a musical character, turning the night sky into an orchestral cosmos decades before any human could reach it. From the pounding march of 'Mars, the Bringer of War' to the soaring hymn at the heart of 'Jupiter,' the suite captures both the fire-and-thunder of a launch and the longing that drives Starship beyond Earth. As a regulator clears the path toward other worlds, Holst's cosmic imagination sounds less like fantasy than like a score written for the mission.",
        "excerpt": "Composed between 1914 and 1917, the seven-movement orchestral suite portrays the planets as astrological characters, from the relentless five-beat march of 'Mars, the Bringer of War' and the broad soaring melody at the centre of 'Jupiter' to the fading, wordless offstage voices that close 'Neptune, the Mystic.' Its enormous orchestra conjures the scale, menace and wonder of the heavens.",
        "source": "Gustav Holst, The Planets, Op. 32 (1914-1917), full orchestral score; IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)"
      }
    ],
    "rank": 6
  },
  {
    "slug": "bangladesh-floods-51-dead",
    "headline": "Floods and landslides in Bangladesh kill at least 51 people and displace more than a million",
    "overview": "Days of heavy monsoon rain have triggered floods and landslides across south-eastern Bangladesh, killing at least 51 people and affecting more than a million, officials said on July 13, 2026. Thousands have lost their homes as rivers burst their banks and hillsides collapsed, submerging villages and cutting off roads. Bangladesh, a low-lying delta nation, is among the countries most exposed to the intensifying floods driven by a warming climate.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce8k7e75k7go"
      },
      {
        "name": "The Independent",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOcE84LVBrVFFiajFfNlFFbXZyTTFibGpZVXBDQXJsMmZ4ZzJFbEVXVEZRTDRaNi12REQ1dy1Udmh2V3VGejBSX0VPdGRfaHhwTDNtSzIxcThXbmFteVlSSHRNVV9UWWJBVXJYSHhzV01HM3p0MDFzYWVzQjVkLUQ5SFBSSnhWeldkV0kza0kwSHBCVUtfd1hGeDV5NlVWWkhNWTJGWGk5VjltVXN3ZTFrMDJ5bw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/bangladesh-floods-51-dead.png",
      "alt": "A man wades away from his flooded house carrying belongings during severe monsoon flash flooding in Sylhet, Bangladesh.",
      "credit": "Photograph by Nayeemibnmatiur, 2022. CC BY-SA 4.0, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nineteen centuries before Bangladesh's rivers burst their banks, Tacitus recorded the Tiber swelling with unbroken rain until it drowned the low-lying quarters of Rome, killing people and toppling buildings. His terse account is a reminder that settlements beside great rivers have always lived at the water's mercy. As the monsoon submerges the delta's villages, the same ancient dynamic plays out: a river fed past its limits, and human life paying the price.",
        "excerpt": "In the same year the Tiber, swollen by continuous rains, flooded the level portions of the city. Its subsidence was followed by a destruction of buildings and of life.",
        "source": "Tacitus, The Annals, Book I, ch. 76, trans. Alfred John Church and William Jackson Brodribb (London: Macmillan, 1876), via the Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=1:chapter=76"
      },
      {
        "category": "historical",
        "title": "In 1889 a dam above Johnstown, Pennsylvania gave way after days of torrential rain, and a wall of water annihilated the valley while a survivor watched houses crushed like egg shells. Like the Bangladeshi villages swept away when hillsides collapsed and rivers overflowed, Johnstown shows how quickly rushing water can erase a whole community. The disaster became a byword for the sudden, total helplessness of people before a flood they cannot outrun.",
        "excerpt": "\"I cannot describe the mad rush,\" he said. \"At first it looked like dust. That must have been the spray. I could see houses going down before it like a child's play blocks set on edge in a row. As it came nearer I could see houses totter for a moment, then rise and the next moment be crushed like egg shells, against each other.\"",
        "source": "Willis Fletcher Johnson, History of the Johnstown Flood (Philadelphia: Edgewood Publishing Co., 1889), eyewitness account of Richard Davis, via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/41271/41271-h/41271-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid's telling of Deucalion's flood imagines the gods drowning the whole earth until land and sea become a sea without a shore, its survivors clinging to the nearest hill or riding out the deluge in a boat. That image of humanity reduced to seeking any scrap of high ground mirrors the million-plus Bangladeshis driven from submerged homes toward shelter. The classical deluge myth frames the monsoon catastrophe as an ancient, recurring terror: the world unmade by water.",
        "excerpt": "the budding groves, the houses, sheep and men,—\nand holy temples, and their sacred urns.\nThe mansions that remained, resisting vast\nand total ruin, deepening waves concealed\nand whelmed their tottering turrets in the flood\nand whirling gulf. And now one vast expanse,\nthe land and sea were mingled in the waste\nof endless waves—a sea without a shore.\n\nOne desperate man seized on the nearest hill;\nanother sitting in his curved boat,\nplied the long oar where he was wont to plow;",
        "source": "Ovid, Metamorphoses, Book I (the flood of Deucalion), trans. Brookes More (Boston: Cornhill Publishing Co., 1922), via the Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=253"
      },
      {
        "category": "literary",
        "title": "The oldest surviving flood story, carved on Assyrian tablets from Nineveh, has the storm-god's cyclone climb to the mountains and turn all mankind to mud while even the gods cower in terror by the wall. Its vision of water as an overwhelming, world-ending force resonates with a delta nation where a single monsoon can put a million lives underwater. Millennia apart, the Bangladeshi villager on the rooftop and Ut-Napishtim in his ship share the same smallness before the rising flood.",
        "excerpt": "110. Swiftly it mounted up ..... [the water] reached to the mountains\n111. [The water] attacked the people like a battle.\n112. Brother saw not brother.\n113. Men could not be known (or, recognized) in heaven.\n114. The gods were terrified at the cyclone.\n115. They betook themselves to flight and went up into the heaven of Anu.\n116. The gods crouched like a dog and cowered by the wall.\n[...]\n132. The sea became quiet and went down, and the cyclone and the rain-storm ceased.\n133. I looked over the sea and a calm had come,\n134. And all mankind were turned into mud,",
        "source": "The Babylonian Story of the Deluge as Told by Assyrian Tablets from Nineveh, Eleventh Tablet of the Epic of Gilgamish, trans. E. A. Wallis Budge (British Museum, 1920), via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/7096/7096-h/7096-h.htm"
      },
      {
        "category": "artistic",
        "title": "Gustave Doré's 1866 engraving 'The Deluge' shows a knot of the doomed clinging to a last bare rock as the biblical floodwaters climb, a mother straining to lift her child clear of the surge. It distils exactly what south-eastern Bangladesh endured: families crowded onto whatever high ground remained as villages vanished beneath the water. Doré makes visible the terror behind the statistics — the human scramble for refuge when almost none is left.",
        "excerpt": "A cluster of naked figures clings to the last spur of rock rising above the swelling flood, a mother reaching up to hold her infant clear of the waves while the light breaks coldly over the drowning world. Below them bodies drift in a churning, shoreless sea, and the whole earth seems about to vanish beneath the deluge.",
        "source": "Gustave Doré, 'The Deluge' (Plate I), engraving from The Holy Bible, According to the Authorised Version, with Illustrations by Gustave Doré (London: Cassell, 1866)",
        "href": "https://commons.wikimedia.org/wiki/File:Gustave_Doré_-_The_Holy_Bible_-_Plate_I,_The_Deluge.jpg",
        "image": {
          "src": "/covers/bangladesh-floods-51-dead--a5.png",
          "alt": "Engraving of naked figures and animals clinging to a bare rock as biblical floodwaters rise around them, a mother lifting her child above the waves.",
          "credit": "Gustave Doré, 'The Deluge' (Plate I, The Holy Bible, 1866). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns opened his 1875 oratorio 'Le Déluge' with a famous Prélude whose long, keening violin solo over hushed strings evokes both the grief and the inexorable rise of the biblical flood. The music turns catastrophe into lament, holding the same emotional space as a nation mourning at least 51 dead and more than a million displaced. Its slow gathering of sound mirrors the way monsoon water rises quietly and then overwhelms everything.",
        "excerpt": "The Prélude unfolds as a hushed, sustained string chorale broken by a single violin's rising, mournful song — the sound of waters silently gathering. Saint-Saëns lets the line swell and subside like a tide, transforming the story of the Flood into a meditation on sorrow and the slow, unstoppable approach of the deep.",
        "source": "Camille Saint-Saëns, Le déluge (The Flood), Op. 45, oratorio (1875), full score and Prélude, via IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Le_déluge,_Op.45_(Saint-Saëns,_Camille)"
      }
    ],
    "rank": 7
  },
  {
    "slug": "eu-record-russian-lng-imports",
    "headline": "The EU imported a record volume of liquefied natural gas from Russia's largest plant in early 2026",
    "overview": "The European Union imported a record amount of liquefied natural gas from Russia's biggest LNG facility in the first half of 2026, data showed on July 13, even as the bloc plans to ban Russian gas imports by 2027. The purchases underscore how difficult Europe has found it to sever its energy ties with Moscow while the war in Ukraine continues. Critics say the revenue helps fund the Kremlin's war effort.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQNFNYaWdWVnhkOWpJTTItbGUtMUtPdTFoUmlndFExemVGOEsySmx2RkdCVzItZjNtS21sZ2EzMHZLd1MzNzVjNXk1bzdqSUx6dXNvWTBhUVpfSGs5QWQ5TnlKZXVwNHVqY3lONnNWMVNPMjR3U0Iwbm1sTVdZM1RjTUlkaFJWSEtUY0VUS3Vab0swczJpQkthMXlWUm5RMzJMZWQ3c0tR?oc=5"
      },
      {
        "name": "OilPrice.com",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNVzhLOG5qUG1Ua09tekVBT1FWbXA2N3pVdzRyTnBPZ2tVUThUVno3MERQNk1uM0g0bE04UFJ1ZnZPdHNoM1cyTGNzOUdwRGtLdEpiQzJxUVNPQ0dZVFY4NlFKU3ItcFJrbnRDRlJWdVA3SFZlMDgtbm93S3RFTTAzd0ZBeFltb3ZfclRFbWxjUkU2WlY3ZVNnQ2tDMG94dzNKUXNWNnpMY3BfYktWVnRJbi13cw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/eu-record-russian-lng-imports.png",
      "alt": "A large membrane-type liquefied natural gas carrier at sea, its rounded cargo-containment domes visible along the deck.",
      "credit": "Photo by 青空白帆 (Aozora Hakuhan), CC BY 2.1 Japan, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1806 Napoleon decreed a total blockade of Britain, forbidding all commerce with the enemy across his continent — yet European ports could not quit British goods, and the smuggling never stopped. The Continental System is the mirror image of the EU's predicament: a sweeping prohibition on paper undone by an appetite that reality refuses to surrender. Then as now, a declared embargo collided with the stubborn economics of dependence, and the trade flowed on beneath the decree.",
        "excerpt": "ART. 1. The British Isles are declared to be in a state of blockade.\nART. 2. All commerce and all correspondence with the British Isles are forbidden. Consequently letters or packages directed to England or to an Englishman or written in the English language shall not pass through the mails and shall be seized.",
        "source": "Napoleon I, Berlin Decree, 21 November 1806, Articles 1–2 (Continental System)",
        "href": "https://en.wikisource.org/wiki/Berlin_Decree"
      },
      {
        "category": "historical",
        "title": "When Arab producers cut oil to the West in the winter of 1973, Nixon told Americans that their prosperity had 'bumped up against the limits' of a supply held hostage by hostile powers abroad. The embargo exposed how a great economy can be gripped by the very nation it opposes, its furnaces fed by an adversary's spigot. Europe's record purchases of Russian LNG in 2026 replay that lesson: the belt-tightening vow and the wrenching difficulty of severing an energy lifeline to a rival.",
        "excerpt": "Because of that war, most of the Middle Eastern oil producers have reduced overall production and cut off their shipments of oil to the United States. By the end of this month, more than 2 million barrels a day of oil we expected to import into the United States will no longer be available. … In the long run, it means that we must develop new sources of energy which will give us the capacity to meet our needs without relying on any foreign nation.",
        "source": "Richard Nixon, “Address to the Nation About Policies To Deal With the Energy Shortages,” November 7, 1973 (Public Papers of the Presidents)",
        "href": "https://www.presidency.ucsb.edu/documents/address-the-nation-about-policies-deal-with-the-energy-shortages"
      },
      {
        "category": "literary",
        "title": "Esau, faint with hunger, trades his birthright — his lasting inheritance — for a single bowl of red lentil pottage, and 'despised' the very thing he sold. It is the oldest parable of surrendering a great principle to an immediate appetite. Europe's leaders, having vowed to end their reliance on Moscow by 2027, keep reaching for the warmth of the pottage while the birthright of independence waits on tomorrow.",
        "excerpt": "29 And Jacob sod pottage: and Esau came from the field, and he was faint: 30 And Esau said to Jacob, Feed me, I pray thee, with that same red pottage; for I am faint: therefore was his name called Edom. 31 And Jacob said, Sell me this day thy birthright. 32 And Esau said, Behold, I am at the point to die: and what profit shall this birthright do to me? 33 And Jacob said, Swear to me this day; and he sware unto him: and he sold his birthright unto Jacob. 34 Then Jacob gave Esau bread and pottage of lentiles; and he did eat and drink, and rose up, and went his way: thus Esau despised his birthright.",
        "source": "Genesis 25:29–34, Authorized (King James) Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis/Chapter_25"
      },
      {
        "category": "literary",
        "title": "Marlowe's scholar cuts his own arm and signs away his soul in blood for the power he craves, sealing a bargain he knows will damn him. It is the archetype of the Faustian pact: taking what you need from a dangerous supplier while condemning the source. Critics who say Europe's gas payments fund the Kremlin's war invoke exactly this bargain — the fatal purchase whose price is paid later, in a coin one dreads to name.",
        "excerpt": "Lo, Mephistophilis, for love of thee,\nI cut mine arm, and with my proper blood\nAssure my soul to be great Lucifer's,\nChief lord and regent of perpetual night!\nView here the blood that trickles from mine arm,\nAnd let it be propitious for my wish.\n…\nConsummatum est; this bill is ended,\nAnd Faustus hath bequeath'd his soul to Lucifer.",
        "source": "Christopher Marlowe, The Tragical History of Doctor Faustus (based on the 1604 quarto), Scene V",
        "href": "https://www.gutenberg.org/files/779/779-h/779-h.htm"
      },
      {
        "category": "artistic",
        "title": "Hendrick ter Brugghen's candlelit canvas fixes the instant of the bargain: Jacob's outstretched hand, the steaming bowl, Esau leaning in with his hunter's game, the inheritance changing hands in shadow. The Caravaggesque chiaroscuro turns a domestic transaction into something grave and irreversible. It is the visual counterpart to Europe's dilemma — a momentous exchange conducted for the sake of warmth and appetite, weighed in the balance of the moment rather than the future.",
        "excerpt": "A c.1625 Utrecht Caravaggist oil painting depicting Genesis 25:29–34: the seated Jacob gestures toward a bowl of red pottage as Esau, holding a staff with slain game, agrees to sell his birthright, the figures modelled in dramatic candlelight against darkness.",
        "source": "Hendrick ter Brugghen (1588–1629), “Esau Selling His Birthright,” c.1625, Gemäldegalerie, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Hendrick_ter_Brugghen_-_Esau_Selling_His_Birthright_-_WGA22163.jpg",
        "image": {
          "src": "/covers/eu-record-russian-lng-imports--a5.png",
          "alt": "Baroque candlelit painting of Jacob handing a bowl of red pottage to Esau, who leans in holding a staff with dead game, as their aged parents look on in shadow.",
          "credit": "Hendrick ter Brugghen, Esau Selling His Birthright, c.1625, Gemäldegalerie Berlin. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In the opening scene of Wagner's Das Rheingold the dwarf Alberich renounces love itself to tear the gold from the Rhine and forge a ring of limitless power — wealth wrenched from the earth at a cursed price. Wagner's shimmering, rising orchestral surge that opens the cycle makes primal power seem to well up from the deep. It is the perfect mythic frame for energy drawn from the ground and the moral cost of grasping it: gold, greed, fire, and a bargain that damns the taker.",
        "excerpt": "At the close of Scene 1 the Nibelung Alberich, spurned by the Rhinemaidens, forswears love in order to seize the Rhinegold and forge from it the ring of world-mastery — Wagner setting the theft of power from the deep to surging, elemental music, the Rhinemaidens' cries fading as he flees with the plundered gold.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (full score, Mainz: B. Schott’s Söhne, 1873), Scene 1",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ],
    "rank": 8
  },
  {
    "slug": "intel-ireland-ai-investment",
    "headline": "Intel announces a 5-billion-euro investment to expand its chipmaking operations in Ireland",
    "overview": "Intel said on July 13, 2026, it will invest about 5 billion euros (roughly $5.7 billion) to expand its semiconductor manufacturing in Ireland, as it races to keep pace with surging demand for artificial-intelligence chips. The move deepens the U.S. company's decades-long presence at its Leixlip campus near Dublin and bolsters Europe's ambitions to build more advanced chips at home. Intel has been retooling its strategy amid intense competition in the AI era.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPdUpmMER1MXFvS29zY1R4cWY5N3pGQkR0bnFYeVFuY0NCWkFMWXBCQlBLWFh3Vk5VVDkwaTlwMWtxQm1jTG9MY0dRSVA4R2VmVmtxZ1o2eXlUVGl4Q1EwUjBwdjRlSWEtZW1TQVRUVkRYemJHWXYyamQwVmxHWUotVzhlRDltRXBLZURpdDhSYmM1ZmZYUVljcEtCSFo0c2szblRQQ0RDdThoT2NLZFdEREpjbVI?oc=5"
      },
      {
        "name": "Financial Times",
        "href": "https://news.google.com/rss/articles/CBMihAFBVV95cUxQR2FWUERTWVNnUGJDM3NMdmRkNEhKS0lGT21LQU5ERVZPLUl0R283azk2SDlXLTlsQ1V0NTNYS2VxMzF5T3BHbEpldmF5WW11cGwtN0tROHFXVjBXNXpMNV9KbTFlSWJKM0hDUGhQQzN2X3g3VEU0eDZ0cHBBSEQtSXlVVVg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/intel-ireland-ai-investment.png",
      "alt": "A polished 12-inch silicon wafer with a mirror-like reflective surface, the raw substrate of semiconductor chip manufacturing.",
      "credit": "Photo by Peellden, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder, writing in first-century Rome, saw iron as the double-edged gift of the forge: the metal that tills the earth and also arms the killer. Intel's five-billion-euro furnace at Leixlip works the same alchemy in silicon, refining sand into the wafers that will drive both medicine and munitions in the AI age. Two thousand years on, Pliny's line that mankind has 'given wings to iron and taught it to fly' reads like a caption for chips that now think.",
        "excerpt": "Next to copper we must give an account of the metal known as iron, at the same time the most useful and the most fatal instrument in the hand of mankind. For by the aid of iron we lay open the ground, we plant trees, we prepare our vineyard-trees, and we force our vines each year to resume their youthful state, by cutting away their decayed branches. It is by the aid of iron that we construct houses, cleave rocks, and perform so many other useful offices of life. But it is with iron also that wars, murders, and robberies are effected, and this, not only hand to hand, but from a distance even, by the aid of missiles and winged weapons... This last I regard as the most criminal artifice that has been devised by the human mind; for, as if to bring death upon man with still greater rapidity, we have given wings to iron and taught it to fly.",
        "source": "Pliny the Elder, Natural History, Book XXXIV, Chapter 39 (14), 'Iron Ores'; trans. John Bostock & H. T. Riley (London, 1855)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=34:chapter=39"
      },
      {
        "category": "historical",
        "title": "In 1829, watching Britain remade by steam, iron and the factory, Thomas Carlyle declared his era 'the Mechanical Age' and a nation transformed by machinery. Ireland's bet on becoming Europe's chip forge is the same wager at a new frontier, with silicon standing in for steam. Intel's Leixlip expansion is a fresh sign of the times: the engines of the age are once again being cast, and a country is being reshaped by the industry it hosts.",
        "excerpt": "Were we required to characterise this age of ours by any single epithet, we should be tempted to call it, not an Heroical, Devotional, Philosophical, or Moral Age, but, above all others, the Mechanical Age. It is the Age of Machinery, in every outward and inward sense of that word; the age which, with its whole undivided might, forwards, teaches and practises the great art of adapting means to ends.",
        "source": "Thomas Carlyle, 'Signs of the Times', The Edinburgh Review, No. XCVIII (June 1829)",
        "href": "https://sourcebooks.fordham.edu/mod/carlyle-times.asp"
      },
      {
        "category": "literary",
        "title": "When Achilles needed new armour, Hephaestus fired twenty bellows and laid bronze, tin, gold and silver on the flame, the god as master fabricator forging the tools of a hero's power. Intel's fabs are the modern smithy, where inert elements are heated, layered and etched into instruments of both war and wonder. The shield of Achilles and the AI accelerator share a lineage: raw matter transfigured by fire and craft into an edge no rival can match.",
        "excerpt": "And the bellows, twenty in all, blew upon the melting-vats, sending forth a ready blast of every force, now to further him as he laboured hard, and again in whatsoever way Hephaestus might wish and his work go on. And on the fire he put stubborn bronze and tin and precious gold and silver; and thereafter he set on the anvil-block a great anvil, and took in one hand a massive hammer, and in the other took he the tongs. First fashioned he a shield, great and sturdy",
        "source": "Homer, Iliad, Book XVIII, lines 470-478; trans. A. T. Murray (Loeb Classical Library, 1924)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=18:card=468"
      },
      {
        "category": "literary",
        "title": "Blake's tiger is dreamed at a cosmic forge, 'In what furnace was thy brain?', all awe and dread at a made intelligence too fearsome for its maker fully to grasp. It is an uncanny anticipation of the AI chip: a brain assembled in a furnace, its symmetry fearful. As Intel stokes its Irish furnaces to feed a surging demand for artificial minds, Blake's hammer-and-anvil question hangs over the crucible.",
        "excerpt": "And what shoulder, & what art,\nCould twist the sinews of thy heart?\nAnd when thy heart began to beat.\nWhat dread hand? & what dread feet?\n\nWhat the hammer? what the chain,\nIn what furnace was thy brain?\nWhat the anvil? what dread grasp.\nDare its deadly terrors clasp!",
        "source": "William Blake, 'The Tyger', Songs of Experience (1794)",
        "href": "https://en.wikisource.org/wiki/Songs_of_Innocence_and_of_Experience_(1826)/Songs_of_Experience/The_Tyger"
      },
      {
        "category": "artistic",
        "title": "Velazquez froze the instant Apollo strides into Vulcan's smoky workshop, the smiths caught mid-hammer, iron glowing on the anvil amid startled, sinewy bodies. It is the forge rendered as a place of hard labour and sudden revelation, divine news breaking into a room of sweat and metal. Swap cleanroom whites for the smoke and it becomes the Leixlip fab: skilled hands turning fire and matter into the most coveted tools of the age.",
        "excerpt": "Velazquez's 'The Forge of Vulcan' (1630) captures the moment the sun-god Apollo interrupts the lame smith Vulcan at his anvil to reveal his wife's infidelity. Half-naked labourers freeze around a bar of white-hot iron, hammers suspended, faces turning in astonishment. The painting dignifies the sweat and craft of the metalworker's shop, treating the forge as a theatre where raw fire and skilled hands meet.",
        "source": "Diego Velazquez, The Forge of Vulcan (La Fragua de Vulcano), oil on canvas, 1630, Museo Nacional del Prado, Madrid (P001171)",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/intel-ireland-ai-investment--a5.png",
          "alt": "Baroque painting of Vulcan's forge: muscular smiths pause around a bar of glowing iron on an anvil as the radiant god Apollo arrives with news.",
          "credit": "Diego Velazquez, The Forge of Vulcan (1630), Museo del Prado; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi set his roaming smiths singing at dawn, hammers ringing on anvils in opera's most famous chorus, labour turned to exultant music: 'All'opra! all'opra!' ('To work! To work!'). The Anvil Chorus is the sound of the forge as the beating engine of a community's life and pride. Intel's Irish expansion promises the same percussion at industrial scale, the ceaseless beat of fabrication, a nation keeping time with the machines that make the future.",
        "excerpt": "Vedi! le fosche notturne spoglie\nDe' cieli sveste l'immensa vôlta;\nSembra una vedova che alfin si toglie\ni bruni panni ond'era involta.\nAll'opra! all'opra!\nDàgli! Martella!",
        "source": "Giuseppe Verdi, Il trovatore (1853), Act II, No. 7, 'Coro di zingari' (Anvil Chorus); libretto by Salvatore Cammarano",
        "href": "https://imslp.org/wiki/Il_trovatore_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 9
  },
  {
    "slug": "nobel-laureates-ai-economy-warning",
    "headline": "More than 200 experts, including 16 Nobel laureates, urge urgent action on AI's economic impact",
    "overview": "More than 200 experts, among them 16 Nobel laureates along with leading economists and AI researchers, issued a statement on July 13, 2026, urging governments to prepare urgently for artificial intelligence's disruption of jobs and the economy. The signatories warned that the window to manage a rapid transformation of work is closing, and called for policies to cushion displacement and share the gains. The appeal reflects mounting concern that AI could reshape labor markets faster than societies can adapt.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQTUt1OTNadWljZVE1WXI3UzhWbC15R3h2eVpFWXFkY2wzeTcyWGNsaFZnYjc5TFhzTE1wX1RRQmdSRGJ5VkFRRzUxZUJ0N0tYdXBkZk1IdGlETTRfaDVXbUs2aTAtcjI3TU9UOFZKU1A3SEs0R25wWWNYTlFyZDZ2ejRGUkJiMjdYaFdOTE9zbmF5QTRxTTFzSmxGWHZqOUhYS1RfNFNGVFdYN00?oc=5"
      },
      {
        "name": "Stanford Digital Economy Lab",
        "href": "https://news.google.com/rss/articles/CBMiZEFVX3lxTE15SUdjbjdsTlBkdkZnTHB5TVhPcjBsS1BrZ1Q4NXFXSl9rVEUwRnNzVy1HbG84aFlJUDVpd08tenFDdUE1dm1ydVdFODNXY29KV2JOSGYycTB2dzJCNEd2ZW41cm4?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/nobel-laureates-ai-economy-warning.png",
      "alt": "1835 engraving of workers tending rows of mechanical power looms inside an early industrial textile mill.",
      "credit": "'Powerloom weaving in 1835,' engraving by J. Tingle after T. Allom, from Edward Baines, History of the Cotton Manufacture in Great Britain (1835). Wikimedia Commons (public domain)."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Twenty-three centuries before the Nobel laureates' statement, Aristotle already imagined both the dream and the disquiet now returning: tools that could 'accomplish their own work,' shuttles that weave with no hand to guide them. He used the fantasy to ask who would still be needed once machines did the labour, the very question today's economists press, and hinted at the freedom such self-working instruments might bring, if their gains were shared.",
        "excerpt": "If every instrument could accomplish its own work, obeying or anticipating the will of others, like the statues of Daedalus, or the tripods of Hephaestus, which, says the poet, 'of their own accord entered the assembly of the Gods'; if, in like manner, the shuttle would weave and the plectrum touch the lyre without a hand to guide them, chief workmen would not want servants, nor masters slaves.",
        "source": "Aristotle, Politics, Book I (translated by Benjamin Jowett), c. 350 BCE",
        "href": "https://en.wikisource.org/wiki/The_Politics_(translated_by_Jowett)/Book_1"
      },
      {
        "category": "historical",
        "title": "In his 1812 maiden speech to the House of Lords, Lord Byron rose to defend the Nottingham weavers who had smashed the 'improved' frames that put them out of work, the original Luddites, then facing the death penalty for machine-breaking. His argument that the wellbeing of the labouring poor mattered more than the enrichment of a few by machinery that displaced them is precisely the case the 2026 statement makes: cushion the transition and share the gains, or reap desperation.",
        "excerpt": "By the adoption of one species of Frame in particular, one man performed the work of many, and the superfluous labourers were thrown out of employment. … The rejected workmen in the blindness of their ignorance, instead of rejoicing at these improvements in arts so beneficial to mankind, conceived themselves to be sacrificed to improvements in mechanism.",
        "source": "George Gordon, Lord Byron, Speech on the Frame Work Bill, House of Lords, 27 February 1812 (Hansard, HL Deb vol. 21)",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill"
      },
      {
        "category": "literary",
        "title": "The ballad of John Henry, the steel-driving man who out-hammered the steam drill only to die with his hammer in his hand, is America's folk memory of flesh racing the machine and winning at the cost of its life. The Nobel laureates warn that a comparable contest is now arriving for human labour on a vast scale, and ask governments to ensure workers are cushioned rather than simply left, like John Henry, to fall.",
        "excerpt": "John Henry went to the mountain,\nBeat that steam-drill down;\nRock was high, po' John was small,\nHe laid down his hammer an' he died,\nLaid down his hammer an' he died.",
        "source": "Howard W. Odum and Guy B. Johnson, Negro Workaday Songs (Chapel Hill: University of North Carolina Press, 1926), Chapter I; via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/69378/69378-h/69378-h.htm"
      },
      {
        "category": "literary",
        "title": "In Samuel Butler's 1872 satire Erewhon, the citizens have banned all machines, persuaded by a philosopher's 'Book of the Machines' that mechanical evolution will one day outrun humanity until people rank no higher beside their own creations than cattle beside us. It is the earliest sustained version of the fear the AI researchers now voice, that unless we choose to act we may be 'gradually superseded by our own creatures.'",
        "excerpt": "it is the machines which act upon man and make him man, as much as man who has acted upon and made the machines; but we must choose between the alternative of undergoing much present suffering, or seeing ourselves gradually superseded by our own creatures, till we rank no higher in comparison with them, than the beasts of the field with ourselves.",
        "source": "Samuel Butler, Erewhon (1872), Chapter XXIII, 'The Machines—concluded' (The Book of the Machines)",
        "href": "https://en.wikisource.org/wiki/Erewhon/Chapter_23"
      },
      {
        "category": "artistic",
        "title": "This hand-coloured etching of 1812 turns the frame-breakers' phantom captain, 'General Ludd,' into a towering figure in a patterned dress striding past mills set ablaze, the industrial age's own image of labour rising against the machine. It is the visual ancestor of today's anxiety and a warning in itself: when displacement is left unmanaged, the historic response has been rage and wreckage, exactly the disorder the laureates hope urgent policy can forestall.",
        "excerpt": "A hand-coloured etching from May 1812 imagines 'General Ludd,' the imaginary leader of the frame-breakers, as a giant in a spotted gown brandishing weapons while cropping-mills burn behind him and Luddite crowds gather. Published as machine-breaking spread through the English textile districts, it dramatises a workforce that felt sacrificed to new machinery and turned to destroying it.",
        "source": "The Leader of the Luddites, hand-coloured etching, published by Walker and Knight, Sweetings Alley, Royal Exchange, London, May 1812 (British Museum)",
        "href": "https://commons.wikimedia.org/wiki/File:Luddite.jpg",
        "image": {
          "src": "/covers/nobel-laureates-ai-economy-warning--a5.png",
          "alt": "1812 hand-coloured etching depicting 'The Leader of the Luddites,' a costumed figure standing before burning textile mills as machine-breakers assemble.",
          "credit": "The Leader of the Luddites, hand-coloured etching, London, May 1812. British Museum, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas set to music the oldest parable of technology unleashed: the sorcerer's apprentice who enchants a broom to fetch his water, then cannot halt the rising flood he has summoned. His galloping 1897 scherzo is the sound of a new power called up and lost control of, the very peril the experts describe, urging that we learn to govern a rapid transformation before, like the apprentice, we are engulfed by it.",
        "excerpt": "Dukas's symphonic scherzo, after Goethe's ballad 'Der Zauberlehrling,' conjures the apprentice who bewitches a broom to haul water and then, ignorant of the counter-spell, watches it multiply and flood the house. A sly bassoon theme lurches to life and swells into an unstoppable churning tumult, until only the returning master can command the deluge to stop, a compact fable of forces easier to start than to arrest.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic scherzo after Goethe's ballad, 1897; full score via IMSLP",
        "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 10
  },
  {
    "slug": "global-smartphone-shipments-13-year-low",
    "headline": "Global smartphone shipments fall to their lowest second-quarter level in 13 years amid a memory-chip crunch",
    "overview": "Worldwide smartphone shipments in the second quarter of 2026 fell to their lowest level for the period in 13 years, researchers said on July 13, as a shortage of memory chips—worsened by soaring demand from AI data centers—squeezed manufacturers. Rising component costs have pushed up prices and dampened consumer demand for new handsets. The slump highlights how the AI boom is reshaping the electronics supply chain.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPUzVTX3dRNjRNZWhfaklORDE4aXE1RzV4NGwtNXVNSDBHMllBN1ZlOU44NnQxMWk5WXlXckRHcWNreFNGb3BKY1RFdjdIbWNNUF90TE1QVUtFTEMzeXNCTlFfRktPbXJETTNlLUk5MjZxQUZxVkItUkZ1NW1NWU5nVUVLYXl0d3FrU3B3U0NqQ1E0bGU3SHltSm1RTjk3NHVkdFRKOFRPNl9xZm5VNks1Q3N0bF9EZE4yRjhfZzVzT3dJVE5KZko0RFpxdjBldw?oc=5"
      },
      {
        "name": "Firstpost",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxQeDFTc0d6cjhaNWtoblI4NXMwSUhJaEtDaFZWZXlWNGFLWDIwMDR5YktjVkNScFBUMVhQRTVCZDlGSjUwb1VLVUpXY0NrV3FBeGdBWXdIWENRd1NSNmxUX2tHNFdZcTNkUldOX3F5WjJRNDEzYnUyMmlaR0lNUE54ZjRleUtvOVAtc1RZbEZpM2VzbnFFR04yeDNwWXhHb3ZGdVVoRjFSZHpReVdrdzc4MVVfQzlQVHBSUTZBSkxLSdIBxAFBVV95cUxOVXVweFNvQjhpOVplYlVNekFONTJGMGlrOEg0NVVwVG5tNllUOXd2N0VBbmVwMHpnSzd6YjBra2dxSWRoX3JadUdaSkF6OUhjQjJoTEozWTFGdzllSUd4WGlFRUtvSTg4NHRGRFREVkJUTjByTEJDWWJudnk5Vkh6VnhSdTBEUXQ1aHdjbmo5Z29iWDlnamJ6aG5oSGpNWl92WjFJWlg2UjZBLXBsRTVHRlRpMWVTTjBEOEhva1lrbnBTeFFY?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/global-smartphone-shipments-13-year-low.png",
      "alt": "Silicon wafers and derived electronic microchip products displayed in a case.",
      "credit": "Photo by Wikimedia Commons user ArticCynda, 2017. CC0 1.0 public domain dedication, via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 51 the largest city on earth discovered that its abundance was borrowed. Rome fed itself not from Italian fields but from grain fleets sailing out of Africa and Egypt, and when that distant supply faltered the capital came within days of empty granaries. Q2 2026 is the same lesson in silicon: a smartphone industry that looks self-sufficient in fact depends on a thin, far-off stream of memory chips, and when a hungrier customer diverts the flow, the shortfall arrives with startling speed.",
        "excerpt": "It was ascertained that Rome had provisions for no more than fifteen days, and it was through the signal bounty of heaven and the mildness of the winter that its desperate plight was relieved. ... But we prefer to cultivate Africa and Egypt, and trust the life of the Roman people to ships and all their risks.",
        "source": "Cornelius Tacitus, The Annals, Book XII, chapter 43, trans. Alfred John Church and William Jackson Brodribb; Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=12:chapter=43"
      },
      {
        "category": "historical",
        "title": "In April 1942 Franklin Roosevelt explained to Americans why the shelves were thinning: a single overriding demand, the war effort, was swallowing the materials and labor that ordinary goods required, so what remained had to be rationed among everyone else. The AI data-center boom of 2026 plays the wartime role, consuming the world's memory chips and forcing the mundane economy of consumer phones into scarcity, higher prices, and rationed supply.",
        "excerpt": "Because the demands of the war effort require the rationing of goods of which there is not enough to go around. ... Because the stopping of purchases of non-essentials will release thousands of workers who are needed in the war effort.",
        "source": "Franklin D. Roosevelt, Fireside Chat 21, \"On Sacrifice,\" April 28, 1942; Miller Center, University of Virginia.",
        "href": "https://millercenter.org/the-presidency/presidential-speeches/april-28-1942-fireside-chat-21-sacrifice"
      },
      {
        "category": "literary",
        "title": "The oldest script for a supply shock is Joseph's reading of Pharaoh's dream: seven years of great plenty, then seven years of famine so severe the plenty is forgotten. The memory-chip market has always moved in exactly this fat-and-lean cycle of glut and shortage, and 2026 is its lean turn, the abundance of cheap components giving way to a dearth that spreads, as in Genesis, over all the face of the earth.",
        "excerpt": "Behold, there come seven years of great plenty throughout all the land of Egypt: And there shall arise after them seven years of famine; and all the plenty shall be forgotten in the land of Egypt; and the famine shall consume the land; And the plenty shall not be known in the land by reason of that famine following; for it shall be very grievous. ... And the famine was over all the face of the earth.",
        "source": "The Holy Bible, King James Version, Genesis 41:29–31, 56; Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Malthus built his gloomy arithmetic on a mismatch of rates: appetite that multiplies geometrically against a supply that can only crawl upward by addition. That is precisely the squeeze behind the 2026 shortage, where the exponential hunger of AI compute outruns the slow, capital-heavy expansion of chip fabrication, so demand outstrips what the fabs can produce and something, this time the smartphone, must go without.",
        "excerpt": "Population, when unchecked, increases in a geometrical ratio. Subsistence increases only in an arithmetical ratio. ... the power of population is indefinitely greater than the power in the earth to produce subsistence for man.",
        "source": "Thomas Robert Malthus, An Essay on the Principle of Population (1798), Chapter I; Project Gutenberg (ebook 4239).",
        "href": "https://www.gutenberg.org/files/4239/4239-h/4239-h.htm"
      },
      {
        "category": "artistic",
        "title": "Bruegel's harvesters rest in a sea of gold, the wheat so tall it dwarfs them, a portrait of the fat years at their peak. Read against a memory famine, the painting is the boom before the bust: the golden plenty that markets, like the peasants dozing in the corn, assume will last, and whose passing into scarcity is the whole story of Q2 2026.",
        "excerpt": "Pieter Bruegel the Elder's 1565 panel shows laborers reaping and gathering a towering wheat field under a hazy summer sky, one group cutting the standing grain while others rest and eat in its shade. It is an image of overflowing abundance and ripe harvest, the visual embodiment of the plentiful years that precede a coming dearth.",
        "source": "Pieter Bruegel the Elder, The Harvesters, 1565, oil on wood, The Metropolitan Museum of Art, New York; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/global-smartphone-shipments-13-year-low--a5.png",
          "alt": "Peasants harvesting and resting in a vast golden wheat field under a hazy summer sky, Pieter Bruegel the Elder, The Harvesters, 1565.",
          "credit": "Pieter Bruegel the Elder, The Harvesters (1565), The Metropolitan Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Handel set the whole Joseph saga to music in 1743, dramatizing the years of famine, the crowds crying for bread, and the granaries that stood between Egypt and starvation. The oratorio turns a supply crisis into lament and deliverance, the same emotional arc now playing out in miniature as chip shortages ripple through a global industry that had grown used to plenty.",
        "excerpt": "Handel's English oratorio Joseph and His Brethren dramatizes the biblical account of Egypt's seven years of famine, the desperate crowds seeking bread, and Joseph's stewardship of the royal storehouses. Its choruses and arias move from anxiety over scarcity toward relief and providence, giving the ancient shortage a voice of both lamentation and hope.",
        "source": "George Frideric Handel, Joseph and His Brethren, HWV 59 (composed 1743, first performed 1744), libretto by James Miller; full score on IMSLP.",
        "href": "https://imslp.org/wiki/Joseph_and_His_Brethren,_HWV_59_(Handel,_George_Frideric)"
      }
    ],
    "rank": 11
  },
  {
    "slug": "eu-gaza-recovery-fund-billion",
    "headline": "The EU and dozens of nations pledge about $1 billion for a Gaza recovery fund",
    "overview": "The European Union, helping to rally dozens of countries, announced on July 13, 2026, that donors had pledged about $1 billion for a fund to help Gaza recover from the devastation of war. Organizers said the money would go toward rebuilding homes, infrastructure and basic services in the shattered territory. The pledges come as international efforts intensify to stabilize Gaza and address a dire humanitarian situation.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxOeGI1VkFkR0VDbHY3VTJESEFyVjg4MFFleTRRVTRsODdrRlhHQ0N5RlZaaVJLdHl4OVBmVGprMXk0ZGRJZ0ppM2MtemNMTEt2ZWdyeDlVVVNxVmxpWW5Xa1Qzc1JqdmEzT0hTQXhWTTFUdllGTDAxYUV5aFl3cEtYOTlhbXhkTDhkX21nNzdtSzA5SlZkcG55TzRWUQ?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQbGdRamk1ajJnclJtTldlbEs4N1RLd3VFbDM5bVYwVC16VFBkVWpRSWZiRW5rVW9qdGZoalMyTHZJVDEwSHVZcDNqR0VTeTB5ZEFjYzZvVEhPWWduMG8tU2JhRUJDV3R2WTltS2pYcUJyeHVabjhTdUxkeXlHdFlrS1JSbk1uakdQbWNWazVscWhTZFNEQWYzT2h6WTBCTl9DYk1MNDV4RHFkQVJsd1RBM0VvdDZ5WWpqV1pxVA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/eu-gaza-recovery-fund-billion.png",
      "alt": "Black-and-white 1945 photograph of laborers rebuilding the war-ruined city of Warsaw amid rubble.",
      "credit": "Unknown photographer, 1945; print from Polish Archive negative, Marek Tuszynski collection, public domain via Wikimedia Commons."
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Persians withdrew from a scorched Attica in 479 BC, the Athenians raced to raise their ruined walls, and Thucydides records that the whole population laboured at the task, pulling down their own houses for stone. The billion-dollar Gaza fund echoes that ancient truth: a shattered community is rebuilt not by decree alone but by pooled, collective effort. Then as now, reconstruction was as much an act of communal will as of masonry.",
        "excerpt": "all the men in the city, in the meantime, both they and their wives and children, sparing neither private nor public edifice that might advance the work but pulling all down whatsoever, should help to raise it.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.90.3, translated by Thomas Hobbes (1629), Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Thuc.+1.90.3"
      },
      {
        "category": "historical",
        "title": "In 1947 George Marshall told Harvard's graduating class that American aid would be directed against 'hunger, poverty, desperation and chaos,' launching the greatest reconstruction of a ruined continent in modern history. The EU-led pledge for Gaza consciously inherits that model: dozens of nations pooling money to revive homes, infrastructure and the ordinary economy of a devastated place. Marshall's warning still applies today — money buys bricks, but its true aim is the conditions in which a normal life can resume.",
        "excerpt": "Our policy is directed not against any country or doctrine but against hunger, poverty, desperation, and chaos. Its purpose should be the revival of a working economy in the world so as to permit the emergence of political and social conditions in which free institutions can exist.",
        "source": "George C. Marshall, remarks at Harvard University, 5 June 1947 (The Marshall Plan Speech), Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Marshall_Plan_Speech"
      },
      {
        "category": "literary",
        "title": "The Book of Nehemiah tells how a returning exile rallied a demoralised people to rebuild Jerusalem's broken walls and fire-burned gates, and they answered, 'Let us rise up and build.' The image of a city lying waste, its gates consumed by fire, maps almost exactly onto Gaza's rubble, and the recovery fund is a modern echo of that summons to rise and rebuild. It is among the oldest reconstruction stories in the Western canon.",
        "excerpt": "Then said I unto them, Ye see the distress that we are in, how Jerusalem lieth waste, and the gates thereof are burned with fire: come, and let us build up the wall of Jerusalem, that we be no more a reproach. ... And they said, Let us rise up and build. So they strengthened their hands for this good work.",
        "source": "The Bible, King James Version, Nehemiah 2:17-18, Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Nehemiah"
      },
      {
        "category": "literary",
        "title": "Longfellow closes 'The Building of the Ship' by turning a newly launched vessel into the ship of state, with all humanity 'hanging breathless on thy fate.' Rebuilding Gaza is the launch of just such a fragile new vessel, and the world's donors, like the poem's onlookers, have staked their hopes on whether it will hold together and sail. The lines capture the anxious hope that attends any great act of building.",
        "excerpt": "Thou, too, sail on, O Ship of State!\nSail on, O Union, strong and great!\nHumanity with all its fears,\nWith all the hopes of future years,\nIs hanging breathless on thy fate!",
        "source": "Henry Wadsworth Longfellow, 'The Building of the Ship' (1849), in The Seaside and the Fireside, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Seaside_and_the_Fireside/The_Building_of_the_Ship"
      },
      {
        "category": "artistic",
        "title": "Bernardo Bellotto's meticulous 1770s views of Warsaw became, nearly two centuries later, the very blueprints from which the city was rebuilt after the Nazis razed it, proof that a devastated place can be raised again from careful record and collective resolve. Warsaw's phoenix-like return is the encouraging precedent behind the Gaza fund: even near-total destruction need not be the last word. The painting now hangs beside the buildings it helped resurrect.",
        "excerpt": "A luminous panorama of eighteenth-century Warsaw stretched along the Vistula, its palaces, spires and busy riverbank rendered with near-photographic exactness. Painted to glorify a thriving capital, the canvas later served an unimagined purpose: guiding architects who conjured the shattered city back into being after 1945. It stands as a portrait of a place twice made whole.",
        "source": "Bernardo Bellotto, View of Warsaw from the Royal Palace (1773), Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Bernardo_Bellotto,_il_Canaletto_-_View_of_Warsaw_from_the_Royal_Palace_-_WGA01842.jpg",
        "image": {
          "src": "/covers/eu-gaza-recovery-fund-billion--a5.png",
          "alt": "Eighteenth-century oil painting of Warsaw's skyline of palaces and church spires along the Vistula river under a wide sky, by Bernardo Bellotto.",
          "credit": "Bernardo Bellotto, View of Warsaw from the Royal Palace (1773); Web Gallery of Art, public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's 1811 incidental music 'The Ruins of Athens' imagines the goddess Minerva waking after two thousand years to find her once-glorious city in ruins, before the score turns toward revival and festive celebration. Its arc, from mourning over a fallen city to the joy of renewal, mirrors the hope that the Gaza fund will carry the territory from rubble toward rebuilt life. Even the famous Turkish March strides like a procession returning to a restored capital.",
        "excerpt": "Beethoven's overture and choruses move from a solemn lament over a city fallen into ruin toward triumphant, celebratory renewal. Composed to consecrate a new theatre, the music dramatizes desolation giving way to reconstruction and communal rejoicing. Its progression from grief to festival makes it a fitting anthem for any place striving to rise from its own ruins.",
        "source": "Ludwig van Beethoven, Die Ruinen von Athen (The Ruins of Athens), Op. 113 (1811), full score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Die_Ruinen_von_Athen,_Op.113_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 12
  },
  {
    "slug": "john-buck-woodblock-panels",
    "headline": "Colossal features Montana artist John Buck's large pen-and-ink panels drawn from folklore and memory",
    "overview": "The art magazine Colossal on July 13, 2026, spotlighted new work by the Bozeman, Montana-based artist John Buck, whose large-scale pen-and-ink drawings on wooden panels weave together folklore, personal memory and everyday observation into dense, uncanny landscapes. Long known for his woodblock prints and kinetic sculptures, Buck fills each panel with symbolic imagery and layered narrative. The feature places his intricate, storytelling compositions before a wide online audience.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/john-buck-wooden-panel-pink-ink-drawings/"
      },
      {
        "name": "Smithsonian American Art Museum",
        "href": "https://americanart.si.edu/artist/john-buck-638"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/john-buck-woodblock-panels.png",
      "alt": "A dense pen-and-ink landscape by John Buck on a wooden panel, crowded with symbolic plants, rock formations and layered narrative imagery.",
      "credit": "John Buck, via Colossal"
    },
    "edition": "Evening Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Five centuries before John Buck carved and drew his teeming Montana panels, Albrecht Dürer was cutting the Apocalypse into blocks of pearwood in Nuremberg, at the moment the woodcut first flowered into serious art. Like Buck's crowded pen-and-ink worlds, Dürer's sheets pack visionary folklore, symbol and terror into a single dense field made from carved wood. This 1911 account of that flowering catches exactly the quality Buck inherits: rugged strength, restless vehemence, and a love of gnarled, writhing, agitated line.",
        "excerpt": "Founding himself to some extent on the traditional motives, Dürer conceived and carried out a set of designs in which the qualities of the German late Gothic style, its rugged strength and restless vehemence, its love of gnarled forms, writhing actions and agitated lines, are fused by the fire of the young master's spirit into vital combination with something of the majestic power and classic severity which he had seen and admired in the works of Mantegna.",
        "source": "Encyclopædia Britannica, 11th ed. (1911), \"Dürer, Albrecht,\" on the Apocalypse woodcuts, via Wikisource",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/D%C3%BCrer,_Albrecht"
      },
      {
        "category": "historical",
        "title": "Buck's long practice as a woodblock printmaker reaches back to another carved-block tradition on the far side of the world: the Japanese ukiyo-e print of the Edo period, cut into cherrywood and pulled by the thousand. Arthur Davison Ficke's 1915 survey describes a whole floating world crowded onto small sheets, teeming with actors, heroes, festivals and folklore, the same dense inventory of everyday life and legend that Buck layers across his panels. It is a different era and a different hemisphere, but the impulse is his: to fit an entire jostling world into one hand's-breadth of image.",
        "excerpt": "In them appear the forms and faces of the popular actors in their admired rôles, fashionable courtesans decked in all the splendour of their unhappy but far-famed days and nights, legendary heroes, dancers, wrestlers, and popular entertainers. In the matter of landscape, the scenes shown are the festival-crowded temples of Yedo, the sunlit tea-gardens and gay midnight boating-parties of the Sumida River, the great highroads of national travel, the famous spots of popular recreation.",
        "source": "Arthur Davison Ficke, Chats on Japanese Prints (1915), ch. I, \"Preliminary Survey,\" via Project Gutenberg",
        "href": "https://www.gutenberg.org/files/46753/46753-h/46753-h.htm"
      },
      {
        "category": "literary",
        "title": "Buck's ambition to compress a whole cosmos into one panel is the oldest impulse in Western art-writing: Homer's description of the Shield of Achilles, on which the god Hephaestus hammers the earth, the heavens, the sea and every constellation before crowding on cities, weddings, harvests and war. It is ekphrasis as world-making, a single wrought surface asked to hold everything at once. Buck's dense pen-and-ink fields are that same shield redrawn in ink on wood, a private universe engraved into one plane.",
        "excerpt": "Therein he wrought the earth, therein the heavens therein the sea, and the unwearied sun, and the moon at the full, and therein all the constellations wherewith heaven is crowned—the Pleiades, and the Hyades and the mighty Orion, and the Bear, that men call also the Wain, that circleth ever in her place, and watcheth Orion, and alone hath no part in the baths of Ocean.",
        "source": "Homer, Iliad 18.483–489, trans. A. T. Murray (Loeb, 1924), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D478"
      },
      {
        "category": "literary",
        "title": "Because Buck is a printmaker who draws dreamlike, symbol-laden worlds, no writer suits him better than William Blake, who etched his own visionary books plate by plate. In this \"Memorable Fancy\" Blake imagines the very act of printmaking as a descent through infernal chambers where raw metal is melted, cast and finally arranged as books, knowledge cut and corroded into form. It is a myth of the carved and bitten plate as the engine of imagination, exactly the alchemy by which Buck turns memory and folklore into image.",
        "excerpt": "I was in a Printing house in Hell & saw the method in which knowledge is transmitted from generation to generation. In the first chamber was a Dragon-Man, clearing away the rubbish from a caves mouth; within, a number of dragons were hollowing the cave, In the second chamber was a Viper folding round the rock & the cave, and others adorning it with gold silver and precious stones. In the third chamber was an Eagle with wings and feathers of air, he caused the inside of the cave to be infinite, around were numbers of Eagle like men, who built palaces in the immense cliffs. In the fourth chamber were Lions of flaming fire raging around & melting the metals into living fluids. In the fifth chamber were Unnam'd forms, which cast the metals into the expanse, There they were reciev'd by Men who occupied the sixth chamber, and took the forms of books & were arranged in libraries.",
        "source": "William Blake, The Marriage of Heaven and Hell (c. 1790), \"A Memorable Fancy,\" via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Marriage_of_Heaven_and_Hell"
      },
      {
        "category": "artistic",
        "title": "If Buck's uncanny, symbol-crowded landscapes have a single ancestor in painting, it is Hieronymus Bosch's Garden of Earthly Delights, a triptych so dense with folklore, allegory and hybrid creatures that the eye can wander it for hours and never exhaust its stories. Bosch, like Buck, builds a whole teeming, dreamlike world into one pictorial field where every figure is a legible sign and the total effect is delirium. Painted around 1500 on oak panels, it remains the definitive image of the artist as maker of an entire cosmos in miniature.",
        "excerpt": "Bosch's central panel swarms with naked figures, oversized fruit, glassy spheres and improbable birds, a paradise tipping into fever dream. Left and right wings swing from a serene Eden to a black, burning hell of monstrous instruments and tormented bodies. Every inch is worked and populated, so that the three joined panels read as one vast, uncanny landscape crowded with symbol and story.",
        "source": "Hieronymus Bosch, The Garden of Earthly Delights (c. 1490–1500), oil on oak panels, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:The_Garden_of_earthly_delights.jpg",
        "image": {
          "src": "/covers/john-buck-woodblock-panels--a5.png",
          "alt": "Hieronymus Bosch's triptych The Garden of Earthly Delights, its three panels crowded with hundreds of small nude figures, fantastical creatures, giant fruit and a burning hell.",
          "credit": "Hieronymus Bosch, The Garden of Earthly Delights (c. 1490–1500), Museo del Prado; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Buck's panels invite the same slow, room-by-room looking that Mussorgsky set to music in Pictures at an Exhibition, a suite that walks the listener from image to image, its recurring Promenade the tread of a viewer moving down a gallery wall. Each movement conjures a discrete little world of gnomes, castles, marketplaces, catacombs and the witch Baba Yaga, folklore and observation rendered as sound. It is the aural twin of a Buck composition: a crowded sequence of vivid, symbolic scenes gathered into one teeming, unified whole.",
        "excerpt": "Composed in 1874, Mussorgsky's piano suite translates a memorial exhibition of Viktor Hartmann's drawings into music, each of the ten \"pictures\" a sharply drawn miniature world. A returning Promenade carries the listener between them, from a lurching gnome and a haunted old castle to a squabbling Tuileries garden, the hut of Baba Yaga on its fowl's legs, and the towering Great Gate of Kiev. The whole is a gallery in sound, dense with folkloric and everyday imagery.",
        "source": "Modest Mussorgsky, Pictures at an Exhibition (Картинки с выставки), for piano, 1874, via IMSLP",
        "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)"
      }
    ],
    "rank": 13
  },
  {
    "slug": "sam-neill-dies-78",
    "headline": "Sam Neill, New Zealand star of 'Jurassic Park' and 'The Piano,' dies at 78",
    "overview": "New Zealand actor Sam Neill, whose five-decade career ranged from paleontologist Alan Grant in Steven Spielberg's 'Jurassic Park' to Jane Campion's Oscar-winning 'The Piano,' died at 78, his family announced on July 13, 2026. Neill had revealed a diagnosis of blood cancer in 2023 but continued acting and writing. Co-stars and directors paid tribute, with several calling him 'one of the greats.'",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPcE03QUlhM0JXeU1TMXZ5S0VwaW5yYjhYbTVieFNzV3B0SFZENEVhMlJPMF9JWGhkNmE1Z3JDRW1xMFNqVV9lckwtaXVZNDJpX3k2SDlVa3h4Q1ZEUEtvd1duVmZvSHZYNXlXRWNRczBZQlItbHpReWhtZmxYajlvYzBtYTEwcmNZYUpJamlVaFQtQl9kWlE?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMihAFBVV95cUxQLWFfTWZncUdQb2YwZHJ3cy0tYW5LZURDRGllYmx6VFNzUG13bk9ZUllEZklVSXA2eE8xY0gzeGtVd1dJNlVVbDdIejN2TTY4N3NhTjdtNGk5eUdncnVLNjJBbWpVNy1ZVlZ0aE90RXBqem5wbU9qeEhnM1ZSU1lkcHJuZlg?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/sam-neill-dies-78.png",
      "alt": "Sam Neill, the New Zealand actor, in close-up portrait.",
      "credit": "Photo: Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the first Roman emperor lay dying, he had his hair combed, then asked the friends around his bed whether he had played his part well in the comedy of life, capping the question with a stock actor's tag begging the house for applause. It is the oldest surviving instance of a public man treating his whole existence as a role now ending, and it fits Sam Neill precisely: a player of five decades, from paleontologist Alan Grant to Ada's husband in 'The Piano,' who answered a blood-cancer diagnosis by simply keeping on with the work. Augustus poses the question every beloved actor's death forces on the watching crowd, and the tributes, like the applause he asked for, are the reply.",
        "excerpt": "Do you think that I have acted my part on the stage of life well? ... If all be right, with joy your voices raise, / In loud applauses to the actor's praise.",
        "source": "Suetonius, The Lives of the Twelve Caesars, 'The Life of Augustus,' section 99 (the deathbed scene), trans. Alexander Thomson, rev. T. Forester; Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Daug.%3Achapter%3D97"
      },
      {
        "category": "historical",
        "title": "When the great actor David Garrick died in 1779, his old friend Samuel Johnson found the only words large enough: the stroke had 'eclipsed the gaiety of nations.' Johnson understood that a supreme performer is not private property but a public resource, a common stock of pleasure whose loss registers as a dimming felt across whole countries, which is exactly the note struck by the tributes now calling Neill 'one of the greats.' Two and a half centuries apart, the same truth holds: when a player who delighted millions dies, the world is measurably poorer in joy.",
        "excerpt": "with David Garrick, whom I hoped to have gratified with this character of our common friend: but what are the hopes of man! I am disappointed by that stroke of death, which has eclipsed the gaiety of nations, and impoverished the publick stock of harmless pleasure.",
        "source": "Samuel Johnson, 'Edmund Smith,' in The Lives of the Most Eminent English Poets (1779-81), Volume 2; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Lives_of_the_Most_Eminent_English_Poets/Volume_2/Smith"
      },
      {
        "category": "literary",
        "title": "Jaques' great speech turns every life into a performance of seven acts, each of us merely a player making our exits and our entrances. For an actor whose single lifetime contained a paleontologist, a colonial husband, a vampire hunter and a hundred others, 'one man in his time plays many parts' is not metaphor but biography. Sam Neill's death is the last exit of a man who spent fifty years demonstrating the line's literal truth.",
        "excerpt": "All the world's a stage, / And all the men and women merely players; / They have their exits and their entrances, / And one man in his time plays many parts, / His acts being seven ages.",
        "source": "William Shakespeare, As You Like It, Act II, Scene VII (Jaques); Project Gutenberg (eBook #1523).",
        "href": "https://www.gutenberg.org/cache/epub/1523/pg1523.txt"
      },
      {
        "category": "literary",
        "title": "Grieving his dead friend, Tennyson stared into the new geology and recoiled: Nature keeps no single creature, and from the quarried rock she cries that a thousand types are gone. His 'Dragons of the prime, / That tare each other in their slime' are the very deep-time monsters Alan Grant made his life's study, and the same abyss of extinction and lost aeons that 'Jurassic Park' reopened for a mass audience. The poem sets one man's death against the vanishing of whole species, which is exactly the scale on which we find ourselves mourning a paleontologist of the screen.",
        "excerpt": "'So careful of the type?' but no. / From scarped cliff and quarried stone / She cries, 'a thousand types are gone: / I care for nothing, all shall go.' ... No more? A monster then, a dream, / A discord. Dragons of the prime, / That tare each other in their slime, / Were mellow music match'd with him.",
        "source": "Alfred, Lord Tennyson, In Memoriam A.H.H., section LVI ('So careful of the type'), first published 1850; Wikisource.",
        "href": "https://en.wikisource.org/wiki/In_Memoriam_(Tennyson)/Canto_55"
      },
      {
        "category": "artistic",
        "title": "Painted in 1830 from the fossils Mary Anning was prising out of the Dorset cliffs, De la Beche's watercolour was the first serious attempt to picture deep time itself, a teeming, savage sea of ichthyosaurs and plesiosaurs, the lost world made visible. It is the direct ancestor of every 'Jurassic Park' frame, and of the wonder Sam Neill's Alan Grant wore while gazing up at a living brachiosaur. To mourn Neill is partly to mourn the actor who, more than any other, taught cinema audiences to feel awe before the extinct.",
        "excerpt": "The watercolour crowds a single stormy scene with the reconstructed monsters of prehistoric Dorset: a long-jawed ichthyosaur clamps onto the neck of a thrashing plesiosaur while pterosaurs wheel overhead, ammonites and fish fill the water, and turtles and crocodiles lurk at the shoreline. It is a vision of extinction as ceaseless struggle, the deep past summoned back into vivid, violent life, exactly the imaginative feat that would later make dinosaurs a mass spectacle on screen.",
        "source": "Henry De la Beche, Duria Antiquior (A More Ancient Dorset), 1830, watercolour; Amgueddfa Cymru - National Museum Wales, Cardiff; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Duria_Antiquior.jpg",
        "image": {
          "src": "/covers/sam-neill-dies-78--a6.png",
          "alt": "An 1830 watercolour crowding a prehistoric sea and shore with ichthyosaurs, plesiosaurs, pterosaurs, ammonites, fish and other extinct creatures fighting and swimming beneath a stormy sky.",
          "credit": "Henry De la Beche, Duria Antiquior (A More Ancient Dorset), 1830; Amgueddfa Cymru - National Museum Wales; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Purcell wrote this music for a queen's funeral in 1695, scoring a nation's grief for muffled drums and the strange, keening slide of flat trumpets, and setting the burial sentence 'Man that is born of a woman hath but a short time to live.' It is the sound of a public mourning a beloved figure with ceremony and restraint, the collective hush that now gathers around Neill's name. Within months Purcell himself was dead, his own funeral using this very music: the maker of the elegy became its subject, as every performer eventually does.",
        "excerpt": "A slow processional march for muffled drums and brass opens the sequence, its solemn tread answered by a spare canzona and by the burial-service anthems 'Man that is born of a woman,' 'In the midst of life we are in death,' and 'Thou knowest, Lord, the secrets of our hearts.' The flattened trumpets give the whole an austere, otherworldly grief, the ritual voice of a whole community gathered to send off one of its own with dignity.",
        "source": "Henry Purcell, Music for the Funeral of Queen Mary, Z.860 (1695); International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Music_for_the_Funeral_of_Queen_Mary,_Z.860_(Purcell,_Henry)"
      }
    ],
    "rank": 14
  },
  {
    "slug": "russia-foils-ukraine-airbase-attack",
    "headline": "Russia says it thwarted a Ukrainian attack on air bases deep inside its territory as Kyiv's allies pledge more air defenses",
    "overview": "Russia's Federal Security Service said on July 13, 2026, that it had foiled a Ukrainian attempt to strike air bases deep inside Russian territory, detaining people it accused of preparing the operation. The claim came as Ukraine's Western allies said they would muster additional air-defense systems for Kyiv, where officials report intensifying Russian aerial bombardment. Neither side's battlefield accounts could be independently verified.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxNdjN6eTdBN01Sc1lkS0V3RVM4dkkzX1ctSDdMLXRlamRiV3RBUG54bXhjTWd6LUV5Q2F4VFRKdjI2alFvS0dqVjh1RzhlYmpsS2QwTFFpZFRSNWVFMjN3SW93TW1lSXhHRVBteGhQTDhyVmFmLUdBTDNCUkRUdndCM3pOWHZwaXU1T204RkcxWklmS0xQXzNnM0VEVFdYNTZUb08xNjlQbkhyZUpaRkV0dDBWTUVfVzRHcGs0SVhB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxORUUxeU9vejR3WVlNVlVpZldacDVMZ053eTVaaW5YeUM5RUNRNl9xX1p3bHlxMWdsejA3b3FoUTN4blVUdkZfQ0FRVlpjcEZMY2dlNnJKa29DM1VIaHNvQ09vRXJJcHFhc0Noc1MxWmdrQXdmeDlUZnFwYjZPWjA2SVYxSW01X1lMUEYxNG0tYkdNRzF1SVRnMzJ1NzVsdmpUc3ZRcm1wT0FBVEplc0xLdUNFbThCSXY3UzBLYnNwTnJqbGJKVkExWERWeVgtQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/russia-foils-ukraine-airbase-attack.png",
      "alt": "Silhouetted military aircraft on a runway at dusk under a wide sky.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the first act of the Peloponnesian War, a Theban strike force slipped into Plataea by night through a gate opened by an insider, only for the defenders to realize how few the raiders actually were, hem them in, and cut them down or take them prisoner. It is the ancient template for exactly what Moscow now claims: an infiltration deep into hostile ground, discovered and rolled up, its perpetrators detained. As at Plataea, the numbers, the plot, and the treachery are asserted long before any neutral party can weigh them.",
        "excerpt": "a Theban force a little over three hundred strong, under the command of their Boeotarchs, Pythangelus, son of Phyleides, and Diemporus, son of Onetorides, about the first watch of the night, made an armed entry into Plataea, a town of Boeotia in alliance with Athens. ... But somehow or other, during the negotiations, they discovered the scanty numbers of the Thebans, and decided that they could easily attack and overpower them; the mass of the Plataeans being averse to revolting from Athens.",
        "source": "Thucydides, History of the Peloponnesian War, Book II, chapters 2–3, translated by Richard Crawley (1874), hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "In 1780 a scheme to hand West Point to the British collapsed when militiamen stopped Major John André and found the incriminating papers hidden in his boot, unmasking Benedict Arnold and sending André to the gallows as a spy. It is the same shape as the FSB's account: a plot against a strategic stronghold detected, its agent seized with the evidence on him. André's dignified plea from captivity is a reminder that behind every foiled-plot communique stands a real prisoner awaiting judgment.",
        "excerpt": "Bouy'd above the terror of death, by the consciousness of a life devoted to honourable pursuits, and stained with no action that can give me remorse, I trust that the request I make to your Excellency at this serious period, and which is to soften my last moments, will not be rejected. ... I shall experience the operation of these feelings in your breast, by being informed that I am not to die on a gibbet.",
        "source": "Major John André to General Washington, 1 October 1780, in Proceedings of a Board of General Officers Held by Order of His Excellency Gen. Washington ... Respecting Major John André (Philadelphia: Francis Bailey, 1780); Project Gutenberg eBook #49585.",
        "href": "https://www.gutenberg.org/cache/epub/49585/pg49585-images.html"
      },
      {
        "category": "literary",
        "title": "Virgil's account of Troy's last night is the founding myth of sabotage deep behind the walls: raiders smuggled inside the defenses, waiting for darkness to spring open their hiding place, kill the sentries, and throw the gates wide to the army outside. A strike aimed at air bases far inside enemy territory belongs to this lineage of the hidden blow struck from within. It is also a parable of counter-intelligence, for Troy fell only because it failed to see the trick in time.",
        "excerpt": "When Sinon, favour'd by the Partial Gods, / Unlock'd the Horse, and op'd his dark abodes: / Restor'd to vital Air our hidden Foes, / Who joyful from their long Confinement rose.",
        "source": "Virgil, Aeneid, Book II, translated by John Dryden (1697), in The Works of Virgil, hosted at Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "literary",
        "title": "Stephen Crane opens his Civil War novel with a rumor of a coming movement, solemnly certified by a chain of supposedly reliable men, none of whom the reader can check. It is a perfect miniature of the fog of war and of a story in which neither side's claims can be independently verified. Like the soldiers who argue over whether the tale is true, the world reads Moscow's and Kyiv's dueling announcements without any way to know.",
        "excerpt": "He was swelled with a tale he had heard from a reliable friend, who had heard it from a truthful cavalryman, who had heard it from his trustworthy brother, one of the orderlies at division headquarters.",
        "source": "Stephen Crane, The Red Badge of Courage, Chapter 1 (New York: D. Appleton and Company, 1895); Project Gutenberg eBook #73.",
        "href": "https://www.gutenberg.org/files/73/73-h/73-h.htm"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky's overture stages a homeland under invasion and its defiant defense: the invader's anthem swells, then is drowned by pealing bells and the thunder of cannon fire. Written to mark Russia's survival of a foreign army, it now plays with grim irony over a war in which Russian cities and airfields are themselves under bombardment and Ukraine's allies rush more air defenses to shield the skies. The music is pure spectacle of a capital declaring it will not be broken from above.",
        "excerpt": "Tchaikovsky's 1812 builds from a solemn Orthodox hymn into a battle painted in sound, quoting the French Marseillaise only to blast it apart with artillery salvos and a final blaze of bells. It is one of music's most literal depictions of a nation defending its ground against attack, and its cannon shots make the bombardment audible, a besieged people answering fire from the sky with fire of its own.",
        "source": "Pyotr Ilyich Tchaikovsky, The Year 1812, Festival Overture in E-flat major, Op. 49 (1880); full orchestral score, IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "John Fraser's sombre canvas fixes the terror of the first air war: a Zeppelin pinned high in the crossed beams of searchlights over London, a fire glowing among the rooftops below. It is the direct ancestor of today's bombarded capitals and the batteries straining to defend them, the moment a besieged city first learned to fight the enemy in its own sky. A century on, the same drama plays over Ukrainian cities as allies pledge fresh systems to hold the darkness overhead.",
        "excerpt": "A night scene of wartime London: the great airship hangs faint and pale in a converging lattice of searchlight beams, while below a smear of orange marks a building set alight by the raid. Silhouetted roofs and chimneys crowd the lower edge, a sleeping city rendered defenseless yet watchful, the whole picture organized around the beams reaching up to seize the intruder from the black sky.",
        "source": "John Fraser (1858–1927), 'A Zeppelin raid, 8 October 1915', oil on canvas, c.1915; Royal Museums Greenwich (National Maritime Museum, Caird Collection, BHC0660).",
        "href": "https://www.rmg.co.uk/collections/objects/rmgc-object-12152",
        "image": {
          "src": "/covers/russia-foils-ukraine-airbase-attack--a6.png",
          "alt": "A dark night painting of a Zeppelin airship caught in crossing searchlight beams over London, with a fire glowing among silhouetted rooftops below.",
          "credit": "John Fraser, 'A Zeppelin raid, 8 October 1915', c.1915; Royal Museums Greenwich (National Maritime Museum); public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "paris-wildfires-exceptional-scale",
    "headline": "France deploys water-bombing aircraft against wildfires of 'exceptional scale' near Paris",
    "overview": "French authorities sent water-bombing planes and hundreds of firefighters to battle wildfires described as being of 'exceptional scale' on the outskirts of Paris on July 13, 2026, as a heatwave gripped much of Europe. Residents were evacuated from several communities as the blazes tore through tinder-dry vegetation. The fires near the capital add to a punishing summer of wildfires across France, Spain and the Mediterranean.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/clye4z168edo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOYm5sa1JvamNIZWFmYkJMNENoZElOUWpJbDJOanJFOG9xMzlTMy1BWVBMVU1pRlNfRnplbnRFZ2w3WVpkQ1A2b1JhRUtDQWlISFdYZVJnZ2VNb2RDUmxlSDhYVnBBTGZYa0tNRjB5SGs2ek1PRmFQNUdTcy14a2dtaFVNQlYyNk9vclZadjZ3cDRMYk0yWGYwSVlwLVpHWkZBeGhpUUJiaC16UldLMGRZempiQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/paris-wildfires-exceptional-scale.png",
      "alt": "A firefighting aircraft dropping water over a wildfire near a wooded ridge.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When flames of 'exceptional scale' race through the tinder-dry outskirts of a great capital, they echo the summer of AD 64, when fire erupted near Rome's crowded shops and, whipped by wind, outran every attempt to stop it. Tacitus watched a metropolis discover that its own density and dry timber made it defenceless. Nearly two millennia later, France's water-bombers answer the same terror over Paris: a city ringed by ground primed to burn.",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Cælian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus. ... The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city.",
        "source": "Tacitus, The Annals, Book XV, chapter 38, trans. Alfred John Church and William Jackson Brodribb.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book%3D15:chapter%3D38"
      },
      {
        "category": "historical",
        "title": "Pepys names the exact ingredients of the Paris emergency of 2026: a mighty wind, a long drought, and everything turned combustible. In September 1666 he watched Londoners abandon their homes and flee only when the fire touched them, scrambling into boats as churches and houses flamed at once. The tinder-dry vegetation and evacuated residents outside Paris rhyme uncannily with his eyewitness diary.",
        "excerpt": "the wind mighty high and driving it into the City; and every thing, after so long a drought, proving combustible ... The churches, houses, and all on fire and flaming at once ... poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs ...",
        "source": "The Diary of Samuel Pepys, entry for 2 September 1666; transcribed extract, The National Archives (UK).",
        "href": "https://www.nationalarchives.gov.uk/education/resources/great-fire-of-london-examine-the-evidence/extracts-from-samuel-pepys-diary/"
      },
      {
        "category": "literary",
        "title": "Homer reached for wildfire to capture the most awesome sight he could imagine: a boundless forest ablaze on a mountaintop, its glare visible from far off. It is exactly the image a summer of Mediterranean fires now makes literal, as blazes crown the ridges of France and Spain. The simile that once dignified an army's advance today describes the enemy itself, seen from a water-bomber's cockpit over Paris.",
        "excerpt": "Even as a consuming fire maketh a boundless forest to blaze on the peaks of a mountain, and from afar is the glare thereof to be seen, even so from their innumerable bronze, as they marched forth, went the dazzling gleam up through the sky unto the heavens.",
        "source": "Homer, The Iliad, Book II, lines 455–458, trans. A. T. Murray (Loeb Classical Library, 1924).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book%3D2:card%3D455"
      },
      {
        "category": "literary",
        "title": "Ovid's Phaethon, unable to steer the sun's chariot, drags fire across the whole world until crops, forests and mountains ignite and the cracked earth splits open with heat. It is the ancient world's most vivid parable of a sky grown too hot and a land that becomes its own fuel. As a European heatwave scorches vegetation into kindling around Paris, the myth reads less like fantasy than forecast.",
        "excerpt": "Great cities perish with their walls, and peopled nations are consumed to dust— the forests and the mountains are destroyed. ... The grass is blighted; trees are burnt up with their leaves; the ripe brown crops give fuel for self destruction.",
        "source": "Ovid, Metamorphoses, Book II (the fall of Phaethon), trans. Brookes More (Cornhill, Boston, 1922).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book%3D2:card%3D201"
      },
      {
        "category": "artistic",
        "title": "Turner stood on the Thames in October 1834 and turned a national catastrophe into a wall of incandescent colour, the seat of government dissolving into gold and smoke as crowds watched from the water. His canvas is what a heatwave conflagration looks like when it reaches the edge of a capital: beauty and dread fused in the same glare. Over Paris in 2026, the same terrible light rises above the rooftops.",
        "excerpt": "A vast fire engulfs the Houses of Parliament on the Thames, flames and glowing smoke filling the sky while crowds of onlookers gather on the river and bank.",
        "source": "Joseph Mallord William Turner, The Burning of the Houses of Lords and Commons, 16th October, 1834 (1834–35), oil on canvas, Philadelphia Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Turner-The_Burning_of_the_Houses_of_Lords_and_Commons.jpg",
        "image": {
          "src": "/covers/paris-wildfires-exceptional-scale--a6.png",
          "alt": "A vast fire engulfs the Houses of Parliament on the Thames, flames and glowing smoke filling the sky while crowds of onlookers gather on the river and bank.",
          "credit": "Joseph Mallord William Turner, The Burning of the Houses of Lords and Commons, 16th October, 1834, 1834–35; Philadelphia Museum of Art; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Wagner ends Die Walküre by summoning fire as both punishment and protection: Wotan calls up Loge, and a ring of magic flame rises to encircle the sleeping Brünnhilde, the orchestra flickering and roaring in the Feuerzauber. It is fire as destroyer and guardian at once, the double face the theme of renewal after burning demands. As France battles flame while hoping for the land's regrowth, the music's shimmering blaze feels newly close.",
        "excerpt": "In this closing scene of Act III, Wotan lays his daughter to sleep and calls on the fire-god Loge to ring her rock with flame, and the orchestra answers with the shimmering, crackling music known as the Magic Fire. Wagner makes the blaze at once a sentence and a shelter, destroyer and keeper of what lies within it. The passage is the operatic archetype of fire that ravages and yet promises what may wake beyond it.",
        "source": "Richard Wagner, 'Feuerzauber' (Magic Fire Music) / Wotans Abschied, Act III of Die Walküre, WWV 86B (1856); scores at IMSLP.",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      }
    ],
    "rank": 16
  },
  {
    "slug": "volkswagen-50000-job-cuts",
    "headline": "Volkswagen CEO tells staff up to 50,000 more jobs may be cut to close a competitiveness gap",
    "overview": "Volkswagen chief executive Oliver Blume warned employees in an internal memo that Europe's biggest carmaker may need to cut roughly 50,000 more jobs on top of an earlier round of 50,000 reductions, citing a cost disadvantage of about 20% against rivals, reports said on July 13, 2026. Blume said he could not yet confirm competitive uses into the 2030s for plants at Emden, Hanover, Zwickau and Neckarsulm, but preferred 'intelligent solutions' to outright closures. The disclosure signals VW is weighing cuts of up to 100,000 positions.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxPN2o2QnVTcDBKZVhGQmFLZ2tPUVRIZGJGa2NNdU5kRm9WVzAzQkJ6Z09sQ3JFR19VUUM4M0h2ZncwSW5iS3ZZSTBHeXRCbWg0bFVBb004RGFZcnUzcUtqSHlYS2REQXdqODFfMmgwRTFWZ1RkQVEzbGJ0VFU0QWRwZWgwbmRWRFktMHdLcGlkU3BNWDFDWGVKSlpBbVloZl9vUTh3X3F6R0Y0MGZmNG1oU3lVWFo?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/stock-market-news/volkswagen-ceo-threatens-50000-more-job-cuts-in-memo-to-staff-4787685"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/volkswagen-50000-job-cuts.png",
      "alt": "The facade of a large automotive assembly plant under an overcast sky.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Two centuries before Blume's memo, English framework knitters watched machines swallow their trade and struck back with hammers and threats. The Luddites were not mindless machine-haters but skilled men whose livelihoods were being engineered out of existence, exactly the anxiety now stalking Emden, Zwickau and Neckarsulm. When management speaks of a 20% cost gap and idle plants, it echoes the same logic that once made the hand-weaver obsolete overnight.",
        "excerpt": "I do hereby discharge, all manner of Persons, who has been, employ'd by me, in giveing any information, of breaking Frames, to the Town Clerk, or to the Corporation Silley Committee ~ any Person found out, in so doing or attempting to give any information, will be Punish'd with death... (by order of King Lud)",
        "source": "\"Ned Lud's Proclamation,\" 23 December 1811, The National Archives (Kew), catalogue reference HO 42/118.",
        "href": "https://www.nationalarchives.gov.uk/explore-the-collection/stories/the-proclamation-of-ned-ludd/"
      },
      {
        "category": "historical",
        "title": "Jarrow was Britain's Zwickau: a one-industry town undone when Palmer's shipyard closed and left thousands of skilled men with no work and no future. In 1936 its MP marched the unemployed to London and read their plight into the parliamentary record, much as VW's plant towns now brace to hear whether their factories have a competitive use into the 2030s. The cold ministerial arithmetic of jobless shipwrights prefigures the cold arithmetic of 50,000, then 100,000, positions.",
        "excerpt": "on 28th September last, there were 1,185 unemployed shipyard workers, skilled and unskilled, resident in Jarrow. In addition there were 818 general labourers unemployed in Jarrow, some of whom were probably unskilled shipyard workers.",
        "source": "Walter Runciman, President of the Board of Trade, replying to Miss Ellen Wilkinson, \"Jarrow,\" House of Commons debate, 4 November 1936, Hansard (Historic Hansard, UK Parliament).",
        "href": "https://api.parliament.uk/historic-hansard/commons/1936/nov/04/jarrow"
      },
      {
        "category": "literary",
        "title": "Thomas Carlyle diagnosed the ailment in 1829, christening his era the Mechanical Age and mourning the artisan pushed aside by a faster, lifeless replacement. His image of iron fingers seizing the weaver's shuttle reads like an epitaph for the assembly-line worker displaced by automation and cheaper rivals. Carlyle's unease that nothing is done any longer by hand is precisely the competitiveness gap VW now names as its reason to cut.",
        "excerpt": "The shuttle drops from the fingers of the weaver, and falls into iron fingers that ply it faster. ... On every hand, the living artisan is driven from his workshop, to make room for a speedier, inanimate one.",
        "source": "Thomas Carlyle, \"Signs of the Times,\" Edinburgh Review, 1829; reproduced in the Fordham University Internet Modern History Sourcebook.",
        "href": "https://sourcebooks.fordham.edu/mod/carlyle-times.asp"
      },
      {
        "category": "literary",
        "title": "Dickens gave the factory town a face in Coketown, where the smoke never uncoiled and the steam-engine nodded like a maddened elephant. It is the archetype of the industrial community whose whole existence is fused to the machines within it, the fate now hanging over Volkswagen's company towns. Read against a memo warning of 100,000 lost jobs, Coketown becomes a portrait of what a place stands to lose when the pistons finally stop.",
        "excerpt": "It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. ... and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times, Book the First, Chapter V, \"The Key-note,\" 1854; Project Gutenberg eBook #786.",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm"
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel's monumental Iron Rolling Mill of 1875 is the first great painting of heavy German industry, showing sweat-lit workers wrestling glowing metal amid the din of the machines that made and consumed them. Its Silesian rail works stands as the ancestor of the vast VW plants now facing an uncertain future. Menzel caught both the might of German manufacturing and its human cost, the same double truth beneath a memo about closing a 20% cost gap.",
        "excerpt": "A vast, smoke-hazed factory hall in which half-naked laborers strain around a white-hot ingot at the rolling machines, while others rest, wash, or eat a snatched meal at the edges, the scene lit by the furnace glare of industrial Germany at its height.",
        "source": "Adolph Menzel, The Iron Rolling Mill (Eisenwalzwerk), oil on canvas, 1872-1875; Alte Nationalgalerie, Berlin (via Wikimedia Commons).",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/volkswagen-50000-job-cuts--a6.png",
          "alt": "Oil painting of a crowded, smoky iron rolling mill with muscular workers maneuvering a glowing white-hot bar of iron under the furnace light, while other laborers rest and eat at the margins of the hall.",
          "credit": "Adolph Menzel, The Iron Rolling Mill (Eisenwalzwerk), 1875; Alte Nationalgalerie, Berlin; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Mosolov's orchestral episode Iron Foundry turns the factory itself into music, hammering out the clangor, repetition and relentless power of the machine age in sound. Composed as industry was being exalted as destiny, it captures the very forces, mechanization and remorseless efficiency, that now threaten to render tens of thousands of VW workers surplus. The piece thrills and unnerves at once, an apt score for creative destruction on the assembly line.",
        "excerpt": "Mosolov's short orchestral movement builds a deafening ostinato of grinding, pounding rhythms and shrieking brass, a sonic portrait of the factory floor in which the machine, not the worker, is the hero. It celebrates industrial might while hinting at how easily the human being is drowned out by it.",
        "source": "Alexander Mosolov, \"Iron Foundry\" (Zavod), from Steel (Stal), Op. 19, first performed 1927, first published 1929; score at the International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
      }
    ],
    "rank": 17
  },
  {
    "slug": "tsmc-record-q2-ai-demand",
    "headline": "TSMC reports record second-quarter revenue, up 36%, on surging AI chip demand",
    "overview": "Taiwan Semiconductor Manufacturing Co., the world's largest contract chipmaker, said second-quarter revenue rose about 36% from a year earlier to a record T$1.27 trillion (about $39.6 billion), driven by booming demand for artificial-intelligence chips. The figure, reported on July 13, 2026, topped analyst estimates, and June revenue alone jumped nearly 68%. TSMC makes the most advanced processors for customers including Nvidia and Apple.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOcEVtckxTOVlzOGY4clpUVGtUcEpoUTc1Qjg5NWxTUFh3TFRwbjJyTkhSLXh0d1AxVE5JRUJOVlVMQWxVT2NUMERNSzBRc1lWYnQyX0x2S0hjci1kLTNTTm9aQ3BaTWpvRHdqemxSYXZiSmVuQXI5eUdJblYxa01wSnl0U085Z056NldneVZBNVQ3VzBKTTVPZHlkRVRzR2JZX3J1NG1GVnk1WmRRUjlmNHBvYUFaekNQS1VMYw?oc=5"
      },
      {
        "name": "The Star",
        "href": "https://www.thestar.com.my/tech/tech-news/2026/07/13/tsmc-posts-record-revenue-in-second-quarter-on-ai-demand"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/tsmc-record-q2-ai-demand.png",
      "alt": "A mirror-bright silicon wafer catching the light in a semiconductor facility.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before silicon, Athens minted its power from a single seam of ore: the silver of Laurium, whose bullion built the fleet that beat Persia at Salamis. Xenophon marveled that demand for the metal was uniquely bottomless, never glutting the way grain or furniture did. TSMC's wafers are the Laurium of the AI age, a scarce output the great powers cannot get enough of, the more they buy the more they crave.",
        "excerpt": "One more illustration: take the case of movable property. No one when he has got sufficient furniture for his house dreams of making further purchases on this head, but of silver no one ever yet possessed so much that he was forced to cry \"enough.\"",
        "source": "Xenophon, Ways and Means (On Revenues), sec. 4, trans. H. G. Dakyns; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1179/1179-h/1179-h.htm"
      },
      {
        "category": "historical",
        "title": "In the oil age, one firm sat astride the commodity the whole economy suddenly ran on. Ida Tarbell's landmark expose described Standard Oil as the most perfect trust ever built, a chokepoint through which a hungry nation's fuel had to pass. TSMC occupies the same indispensable narrows for advanced processors, the single supplier without whom Nvidia and Apple cannot ship, a bottleneck at the heart of an empire of commerce.",
        "excerpt": "It is the most perfectly developed trust in existence; that is, it satisfies most nearly the trust ideal of entire control of the commodity in which it deals.",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (1904), Preface; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/60692/60692-h/60692-h.htm"
      },
      {
        "category": "literary",
        "title": "When Achilles needs armor fit to change the course of a war, the gods do not send a general but a maker: Hephaestus at his twenty bellows, coaxing bronze, tin, gold and silver into the shield that will decide everything. Homer understood that the smith, not the hero, holds the pivot of the age. So it is with the foundry in Hsinchu that forges the chips every champion of the AI war must wield.",
        "excerpt": "And the bellows, twenty in all, blew upon the melting-vats, sending forth a ready blast … And on the fire he put stubborn bronze and tin and precious gold and silver.",
        "source": "Homer, Iliad, Book 18 (lines 468-475), trans. A. T. Murray (1924); Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0134%3Abook%3D18%3Acard%3D468"
      },
      {
        "category": "literary",
        "title": "Kipling gave the machines their own boastful voice, tracing their descent from raw ore through furnace and lathe into obedient, tireless power. His chant of things cast and wrought and tooled to a thousandth of an inch is precisely the poetry of TSMC's craft, where advantage is measured in nanometers. The tools of a new age must first be forged to impossible tolerances before they will serve their masters day and night.",
        "excerpt": "We were taken from the ore-bed and the mine, / We were melted in the furnace and the pit— / We were cast and wrought and hammered to design, / We were cut and filed and tooled and gauged to fit.",
        "source": "Rudyard Kipling, \"The Secret of the Machines\" (from A School History of England, 1911); Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Secret_of_the_Machines"
      },
      {
        "category": "artistic",
        "title": "Velazquez froze the instant a workshop's rhythm breaks: Apollo strides into the smithy with world-changing news, and Vulcan's half-forged armor hangs in the sudden hush, hammers stilled, faces lit by the fire. It is the drama of the maker's shop as the fulcrum of gods and empires. The picture makes visible what a quarterly earnings line only implies, that history turns on who controls the forge.",
        "excerpt": "Velazquez's 1630 canvas sets the radiant god Apollo among grimy, muscular smiths in Vulcan's forge, their labor arrested by his arrival. Sunlit flesh, glowing iron, and the tools of the trade give monumental dignity to the workshop on which even the gods depend.",
        "source": "Diego Velazquez, The Forge of Vulcan (Vulcan's Forge), 1630, oil on canvas; Museo Nacional del Prado, Madrid (P001171).",
        "href": "https://www.museodelprado.es/en/the-collection/art-work/vulcans-forge/84a0240d-b41a-404d-8433-6e4e2efd21ab",
        "image": {
          "src": "/covers/tsmc-record-q2-ai-demand--a6.png",
          "alt": "The radiant god Apollo, wreathed in laurel, addresses a group of near-naked blacksmiths who pause at their anvil and forge, a sheet of glowing iron between them, in Velazquez's dim workshop interior.",
          "credit": "Diego Velazquez, The Forge of Vulcan, 1630; Museo Nacional del Prado; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Verdi opened the second act of Il trovatore with hammers, not violins: a chorus of laborers striking anvils at dawn, turning the din of the forge into exhilarating music. The Anvil Chorus made an aria out of skilled, rhythmic making, the sound of a boom in full swing. It is the fitting overture for a company whose record-breaking quarter is, at bottom, the roar of an unmatched workshop running at full heat.",
        "excerpt": "Verdi's celebrated \"Coro di zingari\" opens Act II with workers hammering their anvils in time as day breaks, the ring of steel woven straight into the orchestra. The number turns the labor of the forge into swaggering, triumphant song, the music of craft at full production.",
        "source": "Giuseppe Verdi, \"Coro di zingari\" (Anvil Chorus), Il trovatore, Act II (1853); score at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Il_trovatore_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 18
  },
  {
    "slug": "hungary-parliament-ousts-president",
    "headline": "Hungary's parliament moves to remove President Tamas Sulyok in Magyar's rollback of the Orban era",
    "overview": "Hungary's parliament was set to approve a constitutional amendment on July 13, 2026, to remove President Tamas Sulyok, whom Prime Minister Peter Magyar has called a 'puppet' of former premier Viktor Orban. Magyar, whose Tisza party ended Orban's 16-year rule in an April landslide, commands a two-thirds majority that makes passage all but certain. The bill also caps lawmakers' service at 12 years, part of a wider dismantling of Orban-era power structures.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxQY01qMXV0dmtuN2pGZko3aUVzYm01Zng4WGlYTVZaaTUxdTVBRWx6SWtEWFBwaXl4VXZGQXhZRUU0VnlsVUlJazVJR3FYeE5IcUZDR042alowZDhUaE5KaVR2NnotZGJTQzB5RFpJdlctekxnUy1ZZGpuaUZrekFQWmJuZlhKVHVNUi1yWmloZ0xzbWFPWUdQWkFGVzdmck1LSUwxUmFyMHp2bURQbEtEODM5YTc2clF6aUR3?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-13/hungary-is-poised-to-oust-president-in-a-rollback-of-orban-era"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/hungary-parliament-ousts-president.png",
      "alt": "The Hungarian Parliament Building on the Danube in Budapest.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Lucius Tarquinius Superbus, Rome's last and proudest king, was locked out of the city and stripped of his rule by public decree, Romans traded one-man government for elected consuls answerable to the assembly. Hungary's parliament, voting to remove a president cast as Orban's man and to cap lawmakers at twelve years, reaches for that same founding gesture: dismantling a strongman's machine and hedging future power with law. Livy's telling is antiquity's template for a nation changing its guard by lawful assembly rather than by blood.",
        "excerpt": "Tarquin found the gates shut, and a decree of banishment passed against him; the Liberator of the City received a joyous welcome in the camp, and the king's sons were expelled from it.",
        "source": "Livy, The History of Rome, Book 1, ch. 60, trans. Rev. Canon Roberts (New York: E. P. Dutton, 1912); Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book%3D1:chapter%3D60"
      },
      {
        "category": "historical",
        "title": "In 1689 England's Convention Parliament did not merely defeat James II on the battlefield; it declared, as a lawful assembly, that the king had forfeited the throne and then bound his successors with a written settlement of rights. Peter Magyar's Tisza, wielding a two-thirds majority to amend the constitution and term-limit its own members, echoes that revolutionary formula: remove the ruler by the legislature, and rewire the state so the old order cannot easily return. Both moments dress the toppling of a strongman in the sober language of statute.",
        "excerpt": "the said late King James the Second having abdicated the government and the throne being thereby vacant",
        "source": "An Act Declaring the Rights and Liberties of the Subject and Settling the Succession of the Crown (English Bill of Rights), 1689; The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/17th_century/england.asp"
      },
      {
        "category": "literary",
        "title": "Shakespeare stages the removal of a figurehead as a strange, self-cancelling ritual: Richard is compelled to narrate his own unkinging, handing crown and sceptre away before the assembled lords who have already chosen his successor. Magyar's charge that President Sulyok is a mere puppet of the fallen Orban finds its poetry here, in a monarch reduced to reciting the terms of his own erasure. The scene is the archetype of a ceremonial ruler dissolved by those who now hold real power.",
        "excerpt": "With mine own tears I wash away my balm,\nWith mine own hands I give away my crown,\nWith mine own tongue deny my sacred state,\nWith mine own breath release all duteous oaths.",
        "source": "William Shakespeare, King Richard II, Act IV, Scene 1; Project Gutenberg (eBook #1512).",
        "href": "https://www.gutenberg.org/cache/epub/1512/pg1512.txt"
      },
      {
        "category": "literary",
        "title": "Shelley's sonnet is the definitive image of a long-ruling strongman's machine outlived by its own wreckage: a shattered colossus in the sand, its boast of permanence mocked by the empty desert around it. As Hungary sets about dismantling sixteen years of Orban's apparatus and unseating the figure who fronted it, the poem supplies the caption for every toppled monument to durable power. The frown of cold command survives only as stone; the empire it commanded is gone.",
        "excerpt": "And on the pedestal these words appear:\n\"My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!\"\nNothing beside remains.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), in The Hundred Best Poems (Lyrical) in the English Language, Second Series; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Hundred_Best_Poems_(lyrical)_in_the_English_language_-_second_series/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Delacroix painted the July Revolution of 1830, when Parisians rose over the barricades and swept away the restored Bourbon king Charles X, replacing an ancien regime that had overreached its power. Liberty herself, tricolour aloft, embodies a nation changing its guard and its ruler in a single surge. The canvas is the visual anthem of Magyar's promised rollback: a people reclaiming the state from a leader who ruled too long, marching over the debris of the old order.",
        "excerpt": "A bare-armed allegory of Liberty in a Phrygian cap strides forward over a barricade of paving stones and fallen bodies, raising the French tricolour in one hand and a bayoneted musket in the other, a pistol-wielding boy and armed citizens surging behind her toward the viewer.",
        "source": "Eugene Delacroix, La Liberte guidant le peuple (Liberty Leading the People), 1830; Musee du Louvre, Paris (RF 129); via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/hungary-parliament-ousts-president--a6.png",
          "alt": "A bare-armed woman personifying Liberty, wearing a Phrygian cap, leads armed men over a barricade strewn with bodies, holding the French tricolour flag high and a musket, with a boy brandishing two pistols beside her.",
          "credit": "Eugene Delacroix, Liberty Leading the People (La Liberte guidant le peuple), 1830; Musee du Louvre, Paris; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven wrote his Egmont music for Goethe's tragedy of a nobleman who resists an occupying tyranny and is executed for it, only for his death to ignite a people's liberation. The overture darkens under the weight of oppression before breaking, in its closing bars, into a blazing Victory Symphony that announces the fall of the oppressor. It is the sound of an old regime collapsing and a nation exhaling free again, the very arc Magyar claims for the end of the Orban era.",
        "excerpt": "The overture opens with heavy, sarabande-like chords evoking Spanish tyranny, builds through mounting tension, and erupts at the close into a triumphant coda in F major, Beethoven's Siegessymphonie proclaiming liberation from oppressive rule.",
        "source": "Ludwig van Beethoven, Egmont, Op. 84 (1810), incidental music to Goethe's tragedy; IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Egmont,_Op.84_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 19
  },
  {
    "slug": "eu-child-social-media-limit",
    "headline": "EU to propose age limits on children's social media access, von der Leyen says",
    "overview": "European Commission President Ursula von der Leyen said on July 13, 2026, that the EU will present a proposal after the summer to set age-appropriate limits on children's access to social media. Receiving an expert report on protecting minors online, she said the bloc must 'set the age at which children can legally access social media' and weigh phased access for different age ranges. 'This is not about whether children can access social media,' she said. 'It is about whether and when social media can access our children.'",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOZWhSQXVjSldmQ1RPUFBPaE0wSVA5QmN3M2lxcU0xVU02amh3VWJFaFZnRVJVVzh0aTVrWU4wd1BmdjZtdlVUMkJTNi04WkQ0SXh2OVJ0TnZ1dzNtd1czZDltelJNcE1WSDl1cEVfcUZIVXIzOGlHUXdaRjJzRldhNWVHZGtGSnBCVEdHbHY5UUZtaWN5WXhzZGtMYldtSldWM2cwQ1N6UDl1NXRZM2tycFY1UQ?oc=5"
      },
      {
        "name": "RTÉ",
        "href": "https://www.rte.ie/news/europe/2026/0713/1583074-eu-social-media/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/eu-child-social-media-limit.png",
      "alt": "A young person's face lit by the pale glow of a smartphone in a dark room.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Twenty-four centuries before von der Leyen worried about \"whether and when social media can access our children,\" Plato had already made the guardianship of young minds a matter of statecraft. In the Republic he insists that the tales children first absorb be licensed by the city, because the soul at that age is soft wax taking a permanent stamp. His proposal that authorities decide what may reach the impressionable young is the ancestor of every age gate the modern state now debates.",
        "excerpt": "You know also that the beginning is the most important part of any work, especially in the case of a young and tender thing; for that is the time at which the character is being formed and the desired impression is more readily taken.",
        "source": "Plato, The Republic, Book II, trans. Benjamin Jowett (c. 375 BCE; Jowett translation, 3rd ed. 1888).",
        "href": "https://en.wikisource.org/wiki/The_Republic_of_Plato/Book_2"
      },
      {
        "category": "historical",
        "title": "When von der Leyen says \"we need to set the age at which children can legally access social media,\" she echoes a distinctly modern reflex: fixing a legal minimum age to shield the young from a force adults judge harmful. In 1916 the United States tried exactly that with the Keating-Owen Act, barring interstate commerce in goods made by children under fourteen. The parallel is structural: draw a bright legal line at a birthday, and let the state stand guardian on the other side of it.",
        "excerpt": "no producer, manufacturer, or dealer shall ship or deliver for shipment in interstate or foreign commerce, any article or commodity the product of any mill, cannery, workshop, factory, or manufacturing establishment, situated in the United States, in which within thirty days prior to the removal of such product therefrom children under the age of fourteen years have been employed or permitted to work",
        "source": "Keating-Owen Child Labor Act, Public Law 64-249, 39 Stat. 675 (1916); U.S. National Archives.",
        "href": "https://www.archives.gov/milestone-documents/keating-owen-child-labor-act"
      },
      {
        "category": "literary",
        "title": "Rousseau's Emile is the founding fantasy of the protected childhood: a boy sealed off from a corrupting society so that his innate goodness is not spoiled before it can take root. The whole treatise turns on the conviction that the child must be guarded from influences he cannot yet judge for himself. That is precisely the anxiety behind an age limit on social media, restated in the language of interfaces and feeds.",
        "excerpt": "God makes all things good; man meddles with them and they become evil.",
        "source": "Jean-Jacques Rousseau, Emile, or On Education (1762), trans. Barbara Foxley (Everyman ed.).",
        "href": "https://www.gutenberg.org/files/5427/5427-h/5427-h.htm"
      },
      {
        "category": "literary",
        "title": "Von der Leyen's warning that the real question is whether social media \"can access our children\" summons the oldest image of the predator who lures the young away with irresistible enchantment. In Browning's telling the Pied Piper's music opens a door in the hillside and the town's children file in, never to return, while the adults stand helpless. The platforms are cast in the piper's role, and the proposed age limit is the townsfolk's belated attempt to block the door.",
        "excerpt": "When, lo, as they reached the mountain-side,\nA wondrous portal opened wide,\nAs if a cavern was suddenly hollowed;\nAnd the Piper advanced and the children followed,",
        "source": "Robert Browning, \"The Pied Piper of Hamelin: A Child's Story\" (1842).",
        "href": "https://www.gutenberg.org/files/18343/18343-h/18343-h.htm"
      },
      {
        "category": "artistic",
        "title": "Schubert's setting of Goethe's Erlkonig dramatizes the exact terror at the heart of the debate: a supernatural voice whispers seductive promises to a child, audible only to him, while the father who clutches him rides desperately for safety. The Erl-King's coaxing—pretty games, bright flowers, golden robes—is the algorithmic feed made lyric, an enticement pitched past the parent to the child alone. An age limit is the state trying to do what the galloping father cannot: put its body between the child and the voice.",
        "excerpt": "Du liebes Kind, komm, geh mit mir!\nGar schöne Spiele spiel' ich mit dir;\nManch' bunte Blumen sind an dem Strand,\nMeine Mutter hat manch gülden Gewand.",
        "source": "Johann Wolfgang von Goethe, \"Erlkonig\" (1782), set to music by Franz Schubert, D. 328 (1815).",
        "href": "https://de.wikisource.org/wiki/Erlk%C3%B6nig"
      },
      {
        "category": "artistic",
        "title": "In the first canvas of Thomas Cole's Voyage of Life, an infant glides from a dark cavern into radiant morning, steered down the river by a serene guardian angel who holds the tiller. It is childhood imagined as a passage that must be watched over, innocence carried safely past dangers it cannot yet see. Cole's angel is the visual embodiment of the protective state von der Leyen invokes—the guardian standing at the threshold, deciding when the young may be trusted to steer for themselves.",
        "excerpt": "A serene infant voyager drifts from a shadowed cave into golden light aboard a small boat, while a winged guardian angel stands at the stern with a hand on the tiller, guiding the child down a calm river past flowering banks—Thomas Cole's allegory of watched-over childhood at the outset of life's journey.",
        "source": "Thomas Cole, The Voyage of Life: Childhood, 1842, oil on canvas; National Gallery of Art, Washington, D.C. (accession 1971.16.1).",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Cole_-_The_Voyage_of_Life_Childhood,_1842_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/eu-child-social-media-limit--a6.png",
          "alt": "An infant in a small boat emerges from a dark cavern into sunlit landscape, steered by a winged guardian angel standing at the stern.",
          "credit": "Thomas Cole, The Voyage of Life: Childhood, 1842; National Gallery of Art, Washington, D.C.; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "france-summons-russia-cyberattack",
    "headline": "France to summon Russia's ambassador over a 'vast' cyberattack and spying campaign across Europe",
    "overview": "France will summon Russia's ambassador in Paris in the coming days over what Foreign Minister Jean-Noel Barrot called a vast cyberattack and espionage campaign targeting at least 10 European countries, officials said on July 13, 2026. Paris is preparing to sanction nine individuals and four entities it accuses of acting for Russia's FSB security service, saying the attacks struck government ministries, businesses and infrastructure including rail networks. The move coincides with fresh EU measures against Russian intelligence officers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxOaWdORHF0VmZIR0NyNDdnWXgzREtsLUw1VFhBbF9WMl9nVnBvN2J5emJieUJwQmRkTEJ2SkQ4SkJNSTNkNWlQWC1XY1NiZDhSeGEtZEJ4UldYVk5ZWTlKTHppQ3M1YnJUNldjaTZrZEFSREY5M2oxc1BFOURHT1QzN21XckVLeC1jak5ZZzk1MV9XaHpyelhpQldHLWI2eDRRY2EtdzlvalFPSmNEdFN0WHptNEowbzczUC1VUlA4RndQOXM?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-13/france-to-summon-russia-ambassador-over-cyber-attacks"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/france-summons-russia-cyberattack.png",
      "alt": "A darkened server room with rows of blinking network equipment.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before firewalls, Sun Tzu taught that empires rise and fall on the unseen labor of agents. His treatise makes espionage not a dirty afterthought but the very engine of statecraft, the 'foreknowledge' a sovereign cannot buy from oracles or logic but only from planted men. France's dossier on nine FSB operatives is a modern ledger of exactly the shadow-work the ancient strategist prized and feared.",
        "excerpt": "Thus, what enables the wise sovereign and the good general to strike and conquer, and achieve things beyond the reach of ordinary men, is foreknowledge. Now this foreknowledge cannot be elicited from spirits; it cannot be obtained inductively from experience, nor by any deductive calculation.",
        "source": "Sun Tzu, The Art of War, Chapter XIII: 'The Use of Spies,' trans. Lionel Giles (1910).",
        "href": "https://en.wikisource.org/wiki/The_Art_of_War_(Giles)/The_Use_of_Spies"
      },
      {
        "category": "historical",
        "title": "In 1917 a secret German cable to Mexico was plucked from the wires and cracked by British cryptographers, turning an intercepted whisper into a diplomatic detonation that helped drag America into war. The exposure of a covert state scheme, and the rupture that followed, prefigures Paris summoning Moscow's envoy with evidence of a campaign meant never to be seen. Then as now, the deepest weapon was not the message but the proof that it had been caught.",
        "excerpt": "We intend to begin on the first of February unrestricted submarine warfare. We shall endeavor in spite of this to keep the United States of America neutral... an understanding on our part that Mexico is to reconquer the lost territory in Texas, New Mexico, and Arizona.",
        "source": "The Zimmermann Telegram (decoded), 1917, General Records of the Department of State; U.S. National Archives.",
        "href": "https://www.archives.gov/milestone-documents/zimmermann-telegram"
      },
      {
        "category": "literary",
        "title": "Virgil gave the West its enduring image of the poisoned gift: a hollow offering wheeled willingly through the gates, its 'secret foes' waiting inside the walls. Laocoon's unheeded warning is the ancestor of every intrusion alert dismissed as noise, and the very word for the malware that slips into ministries and rail systems is 'Trojan.' France now inspects the horse that at least ten European nations had already hauled indoors.",
        "excerpt": "This hollow Fabrick either must inclose, / Within its blind Recess, our secret Foes... Trust not their Presents, nor admit the Horse.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden (1697).",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II"
      },
      {
        "category": "literary",
        "title": "Conrad's tale turns on a foreign embassy quietly ordering an outrage against infrastructure, using a shabby agent to strike at the symbols of a rival nation while keeping official hands clean. Mr Vladimir's scheme to blow up an emblem of modern order is the fictional cousin of a spy service reaching for rail networks and ministries, and his embassy is precisely the sort of mission whose ambassador a wounded state finally summons.",
        "excerpt": "The sacrosanct fetish of to-day is science... Yes, the blowing up of the first meridian is bound to raise a howl of execration.",
        "source": "Joseph Conrad, The Secret Agent: A Simple Tale (1907), Chapter II.",
        "href": "https://www.gutenberg.org/files/974/974-h/974-h.htm"
      },
      {
        "category": "artistic",
        "title": "Domenico Tiepolo paints the fatal moment of welcome: a joyous crowd straining to drag the great pale horse through Troy's gates, while off to the side Cassandra, who sees the doom inside it, is dragged away unheeded. The canvas is a study in celebrated self-deception, the citadel opening its own defenses to the enemy it cannot see. It is the truest portrait of a continent that admitted the intrusion before it learned what it carried.",
        "excerpt": "Giovanni Domenico Tiepolo's oil painting depicts Trojans hauling the enormous wooden horse toward their city walls amid a triumphant throng, with the doomed prophetess Cassandra visible in the turmoil; the horse conceals the Greek soldiers who will sack Troy from within.",
        "source": "Giovanni Domenico Tiepolo, 'The Procession of the Trojan Horse into Troy,' c. 1760, oil on canvas; The National Gallery, London (NG3319).",
        "href": "https://www.nationalgallery.org.uk/paintings/giovanni-domenico-tiepolo-the-procession-of-the-trojan-horse-into-troy",
        "image": {
          "src": "/covers/france-summons-russia-cyberattack--a6.png",
          "alt": "Painting of a crowd of Trojans pulling a large white wooden horse toward the walls of Troy under a pale sky.",
          "credit": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy, c. 1760; The National Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Grieg's famous movement begins as a barely audible tiptoe, a single sly theme creeping in the low strings, then repeats faster and louder until the hidden crowd erupts into full, menacing force. It is the sound of an unseen hand advancing in the dark, the stealthy approach that goes unnoticed until it is suddenly everywhere at once. That accelerating dread, from silence to alarm, is the tempo of a cyber-intrusion discovered too late.",
        "excerpt": "Grieg's orchestral movement mimics stealth and infiltration: a soft, sneaking theme in the low strings is repeated with mounting speed and volume until it explodes into a frenzied, overwhelming climax, evoking an unseen force closing in from the shadows.",
        "source": "Edvard Grieg, 'In the Hall of the Mountain King,' Peer Gynt Suite No. 1, Op. 46 (1875/1888).",
        "href": "https://imslp.org/wiki/Peer_Gynt_Suite_No.1,_Op.46_(Grieg,_Edvard)"
      }
    ],
    "rank": 21
  },
  {
    "slug": "china-gdp-growth-slows",
    "headline": "China's economy seen slowing to 4.5% growth in the second quarter, raising pressure for more stimulus",
    "overview": "China's economy is forecast to have grown about 4.5% year-on-year in the second quarter of 2026, cooling from 5.0% in the first three months, as a prolonged property slump and soft consumer spending weighed on activity, a Reuters poll showed ahead of official data due this week. Strong AI-driven exports and industrial output propped up headline growth even as domestic demand weakened. Investors are watching a late-July Politburo meeting for signs of fresh stimulus.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOaDRzUXJhcGQwVGFqa24yUkZSTjVKbzh6WURPM1YwT1NsUWp5TEI4UE1lSS1HRVZHa3p2el83Ui12d2hTYnBFdExxOFQwZmw5eGpDWFdoSmFXYmpoTFZkT3lTd1paRnkwMlFITnQwdHYxbmxQdEpncGhDU0ZlZ0laQ210NE9YVG1VTHotTlpsaDdETkdiaUwxazBpWlZPdnlVcEQ4N3FJZ0dIeTZXSVE?oc=5"
      },
      {
        "name": "ING Think",
        "href": "https://think.ing.com/articles/second-quarter-slowdown-underway-in-china/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/china-gdp-growth-slows.png",
      "alt": "The skyline of a major Chinese financial district seen across the water at dusk.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In A.D. 33 the Rome of Tiberius seized up in a credit crunch strikingly like the one gripping Chinese property: old debts called in, land suddenly unsellable, prices sliding, fortunes wiped out. The emperor's answer was pure stimulus, a hundred million sesterces poured through the banks as interest-free loans to steady the market. Two millennia later, investors watching for a rescue from the late-July Politburo await that same imperial instinct to prime the pump when a great engine falters.",
        "excerpt": "The facilities for selling were followed by a fall of prices, and the deeper a man was in debt, the more reluctantly did he part with his property, and many were utterly ruined.",
        "source": "Tacitus, The Annals, Book VI, chapter 17, translated by Alfred John Church and William Jackson Brodribb; Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D6%3Achapter%3D17"
      },
      {
        "category": "historical",
        "title": "John Law's Mississippi scheme swelled France with paper riches until a single breath of mistrust collapsed the whole glittering edifice, and no hand could raise it again. China's deflating property market and its years of speculative excess rhyme with that reversal from mania to ruin. The lesson Mackay drew in 1841 still shadows any economy learning that confidence, once punctured, does not easily reinflate.",
        "excerpt": "So with Law and his paper system. No sooner did the breath of popular mistrust blow steadily upon it, than it fell to ruins, and none could raise it up again.",
        "source": "Charles Mackay, \"The Mississippi Scheme,\" Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841); Project Gutenberg (eBook #24518).",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm"
      },
      {
        "category": "literary",
        "title": "Pharaoh's dream gave the ancient world its most enduring image of the business cycle: seven fat years devoured by seven lean. China's long run of five-percent-plus plenty is now giving way to a leaner season of 4.5 percent, with a property slump and cautious consumers thinning the harvest. The Politburo is cast as Joseph, weighing how much grain to release from the granary before the famine bites.",
        "excerpt": "Behold, there come seven years of great plenty throughout all the land of Egypt: And there shall arise after them seven years of famine; and all the plenty shall be forgotten in the land of Egypt; and the famine shall consume the land;",
        "source": "Genesis 41:29-30, King James Version; Project Gutenberg (The Bible, King James version, Book 1: Genesis, eBook #8001).",
        "href": "https://www.gutenberg.org/cache/epub/8001/pg8001.txt"
      },
      {
        "category": "literary",
        "title": "In Zola's Money, the Paris Bourse teems with speculators swarming its steps like human insects, feverish with the passion for easy gain that precedes every crash. It is the boom's intoxication rendered in prose, the euphoria that carried China through its property and credit expansion. Zola knew, as every bubble's chroniclers do, how swiftly the swarm scatters once the fever breaks.",
        "excerpt": "the shining steps of the Bourse were sprinkled with human insects--insects ever climbing",
        "source": "Émile Zola, Money (L'Argent), translated by Ernest A. Vizetelly, chapter I, \"The Temple of Mammon\"; Project Gutenberg (eBook #56987).",
        "href": "https://www.gutenberg.org/cache/epub/56987/pg56987.txt"
      },
      {
        "category": "artistic",
        "title": "Millet's three stooped women glean the stray stalks left after a rich harvest, finding dignity in the lean aftermath of plenty. It is the very image of an economy past its zenith, where households scrape value from what the boom left behind and consumers spend warily. Behind the gleaners the golden stacks of the good years stand distant and already gathered in.",
        "excerpt": "Three peasant women bow to the shorn field, gathering by hand the few grains the harvesters missed. Painted in 1857, the scene ennobles the meagre labour of taking what abundance has left behind, the careful husbandry of a season visibly past its peak.",
        "source": "Jean-François Millet, The Gleaners (Des glaneuses), 1857, oil on canvas; Musée d'Orsay, Paris; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Fran%C3%A7ois_Millet_-_Gleaners_-_Google_Art_Project_2.jpg",
        "image": {
          "src": "/covers/china-gdp-growth-slows--a6.png",
          "alt": "Three peasant women bending low to gather stray stalks of wheat across a shorn stubble field after the harvest, with bountiful stacks, a cart and workers in the sunlit distance.",
          "credit": "Jean-François Millet, The Gleaners (Des glaneuses), 1857; Musée d'Orsay, Paris; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Vivaldi's Four Seasons turns the year into music, Autumn's harvest revelry of song, dance and drink dissolving into Winter's biting cold and chattering teeth. The suite is the boom-and-bust cycle scored for strings, abundance and want following one another as surely as the seasons. China's cooling from 5.0 to 4.5 percent is that same turn, away from the warmth of the harvest and toward a harder, quieter time.",
        "excerpt": "Across four violin concertos Vivaldi paints the turning year, from the drunken joy of the autumn harvest to the shivering hardship of deep winter. The music makes audible the oldest economic truth of all: that seasons of plenty and seasons of want succeed one another in an unbroken cycle.",
        "source": "Antonio Vivaldi, The Four Seasons (Le quattro stagioni), from Il cimento dell'armonia e dell'inventione, Op. 8 (1725); scores at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Violin_Concertos,_Op.8_(Vivaldi,_Antonio)"
      }
    ],
    "rank": 22
  },
  {
    "slug": "india-us-trade-talks",
    "headline": "India holds out for better terms in U.S. trade talks as a tariff deadline looms",
    "overview": "India is holding out for more favorable terms in trade negotiations with the United States, with Trade Minister Piyush Goyal saying New Delhi will not implement a deal unless it secures a clear advantage, according to a report on July 13, 2026. Talks failed to produce an interim agreement during a recent visit by U.S. Trade Representative Jamieson Greer, as Washington withheld assurances on India's demands for a tariff edge over rivals such as China. Most Indian goods now face a 10% U.S. tariff, with steeper levies threatened later this month.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQSklkdlhBUTRGM2pHY3huUUdzMFJsVllYekhuak5CWlNMOXp1OTNEQW50WF9oQ0IyY05sTkZ5R3QwQWZCTjlya09hRkhldFhKeVIzM0xjcGVURlNuYmZVOEd5NkJpZEZUcmNHVFBOYW81a2NFYzR1czJRdnBsU0ZQMU5vSVR2cENGOUJCWmd4MmJqekJSX1czaDUxWkVZc3NWZDVVOFZ3NFg?oc=5"
      },
      {
        "name": "The Business Standard",
        "href": "https://www.tbsnews.net/world/south-asia/emboldened-india-holds-out-better-terms-us-trade-talks-1486761"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/india-us-trade-talks.png",
      "alt": "Stacked shipping containers at a busy international cargo port.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Lord Macartney's 1793 embassy asked the Qing court to open wider to British commerce, the Qianlong Emperor answered from a position of supreme confidence, declining to trade advantage for novelty. Like New Delhi refusing to sign until the terms clearly favor India, the throne set no value on a bargain it judged unequal. It is the ancient posture of the great power that will not be rushed into another's deal.",
        "excerpt": "our Celestial Empire possesses all things in prolific abundance and lacks no product within its own borders. There was therefore no need to import the manufactures of outside barbarians in exchange for our own produce.",
        "source": "Qianlong Emperor, Edict to King George III (1793), Internet Modern History Sourcebook, Fordham University.",
        "href": "https://sourcebooks.fordham.edu/mod/1793qianlong.asp"
      },
      {
        "category": "historical",
        "title": "On August 15, 1971, Richard Nixon reached for the same lever now hanging over India: a blanket 10 percent surcharge on imports, wielded openly as leverage to force better terms from trading partners. He cast the tariff as temporary and conditional, a bargaining chip to be withdrawn once others yielded. Half a century later a 10 percent U.S. tariff again frames the haggle, and again the smaller party must decide whether to bend or hold out.",
        "excerpt": "As a temporary measure, I am today imposing an additional tax of 10 percent on goods imported into the United States. It is an action to make certain that American products will not be at a disadvantage because of unfair exchange rates. When the unfair treatment is ended, the import tax will end as well.",
        "source": "Richard Nixon, \"Address to the Nation Outlining a New Economic Policy: 'The Challenge of Peace,'\" August 15, 1971. The American Presidency Project, UC Santa Barbara.",
        "href": "https://www.presidency.ucsb.edu/documents/address-the-nation-outlining-new-economic-policy-the-challenge-peace"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Shylock is the archetype of the negotiator who dictates his own terms, naming an exact and unbending forfeit before he will seal any bond. Piyush Goyal's insistence that no deal be implemented without a clear advantage echoes that mercantile precision, the refusal to lend goodwill without a written edge. Every trade table has its moment where one side coolly nominates the price of agreement.",
        "excerpt": "let the forfeit\nBe nominated for an equal pound\nOf your fair flesh, to be cut off and taken\nIn what part of your body pleaseth me.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 3. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "literary",
        "title": "In Genesis, Abraham conducts the oldest haggle in Western literature, pressing the LORD down from fifty righteous men to ten before he is satisfied. It is patient, incremental bargaining, each concession banked and then pushed a step further, the merchant who will not stop at the first offer. India's demand to grind the terms toward its own advantage follows that same downward negotiation, verse by verse toward a better number.",
        "excerpt": "And he said, Oh let not the Lord be angry, and I will speak yet but this once: Peradventure ten shall be found there. And he said, I will not destroy it for ten's sake.",
        "source": "Genesis 18:32, Bible (King James Version). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys's 1514 panel freezes the exact instant of hard commerce: a moneychanger weighing gold coin by coin on his balance while his wife, distracted from her prayer book, watches the scales. The painting insists that in the marketplace, advantage is measured with cold precision and nothing is taken on faith. It is the visual grammar of the trade table where India now weighs each concession before agreeing to anything.",
        "excerpt": "A Flemish oil panel showing a moneylender carefully weighing gold coins on a small balance while his richly dressed wife pauses over an illuminated book to watch the scales, a convex mirror on the table reflecting the room, emblem of scrutiny and mercantile calculation.",
        "source": "Quentin Matsys, The Moneylender and His Wife, 1514, oil on panel, Louvre Museum, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/india-us-trade-talks--a6.png",
          "alt": "A Renaissance moneylender weighing gold coins on a balance scale while his wife, holding an illuminated prayer book, watches the scales; coins, pearls, and a convex mirror rest on the table before them.",
          "credit": "Quentin Matsys, The Moneylender and His Wife, 1514; Louvre Museum, Paris; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Smetana's comic opera The Bartered Bride turns a village marriage into a protracted commercial negotiation, its shrewd broker Kecal bargaining over a contract while the true parties hold out for the terms they actually want. Beneath the sparkling dances runs a plot about a deal that only works when both sides secure their advantage. It is the marketplace haggle set to music, buoyant on the surface, unyielding underneath, much like India's insistence on a bargain worth signing.",
        "excerpt": "Smetana's 1866 opera stages a bargain over a bride as brisk transactional comedy, with the marriage broker Kecal driving terms and the lovers refusing to be sold cheaply; the ebullient overture and Act-two dances carry a story that is, at heart, about holding out for a deal on one's own terms.",
        "source": "Bedřich Smetana, The Bartered Bride (Prodaná nevěsta), JB 1:100 (1866). IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/The_Bartered_Bride,_JB_1:100_(Smetana,_Bed%C5%99ich)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "indian-scientists-brainstem-atlas",
    "headline": "Indian scientists release a detailed 3D atlas of the human brainstem, mapping more than 200 clusters",
    "overview": "Researchers at the Sudha Gopalakrishnan Brain Centre at IIT Madras have built a highly detailed three-dimensional atlas of the human brainstem, one of the brain's least-understood regions, drawing renewed attention in coverage published July 13, 2026. About 20 scientists spent 18 months manually analyzing more than 200 brain sections, combining MRI scans, microscopic anatomy and 3D reconstruction to chart over 200 clusters and make the map freely available online. Researchers hope comparing healthy and diseased tissue will aid study of Parkinson's, stroke, Alzheimer's and sudden infant death syndrome.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cg53l737v1qo"
      },
      {
        "name": "IIT Madras — ANCHOR Atlas",
        "href": "https://anchor.humanbrain.in/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/indian-scientists-brainstem-atlas.png",
      "alt": "A luminous three-dimensional rendering of the human brainstem against a dark background.",
      "credit": "Illustration: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Eighteen centuries before the IIT Madras team traced 200 clusters through the brainstem, Galen of Pergamon insisted that the body's construction was no accident but the work of a supreme craft, everything shaped toward a purpose. The Sudha Gopalakrishnan atlas is the modern proof of that ancient faith: patient dissection revealing a hidden order in which nothing is superfluous. Where Galen reasoned toward Nature's artistry, twenty scientists have now rendered it visible, cluster by cluster.",
        "excerpt": "This faculty we also state to be artistic—nay, the best and highest art—doing everything for some purpose, so that there is nothing ineffective or superfluous, or capable of being better disposed.",
        "source": "Galen, On the Natural Faculties, Book I, trans. Arthur John Brock (London: William Heinemann; New York: G. P. Putnam's Sons, 1916), Project Gutenberg eBook #43383.",
        "href": "https://www.gutenberg.org/files/43383/43383-h/43383-h.htm"
      },
      {
        "category": "historical",
        "title": "In February 2001 an international consortium released a draft of the human genome and, crucially, gave it away for free to every laboratory on earth. The brainstem atlas repeats that gesture on the scale of a single organ: a public map of the body's most vital territory, released online without restriction. Both projects turned years of meticulous labor into shared infrastructure, betting that open data accelerates the fight against disease.",
        "excerpt": "The genome map has its own precedent in openness. Like the consortium that placed the human sequence in public databases so any researcher could use it without permission or fee, the brainstem atlas is freely downloadable—a common chart for the study of Parkinson's, stroke, Alzheimer's and sudden infant death.",
        "source": "\"International Human Genome Sequencing Consortium Publishes Sequence and Analysis of the Human Genome,\" National Human Genome Research Institute (NHGRI), February 12, 2001.",
        "href": "https://www.genome.gov/10002192/2001-release-first-analysis-of-human-genome"
      },
      {
        "category": "literary",
        "title": "Dante began his descent lost in a dark wood, needing a guide and a map to cross a realm no living traveler had charted. The brainstem is medicine's equivalent of that shadowed country—the narrow stalk governing breath and heartbeat, long too dim and dense to survey. The new 3D atlas is the Virgil that leads clinicians through it, giving structure and named landmarks to a region once entered only in the dark.",
        "excerpt": "Midway upon the journey of our life\n  I found myself within a forest dark,\n  For the straightforward pathway had been lost.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto I, trans. Henry Wadsworth Longfellow, Project Gutenberg eBook #1001.",
        "href": "https://www.gutenberg.org/files/1001/1001-h/1001-h.htm"
      },
      {
        "category": "literary",
        "title": "Conrad's Marlow remembered a boyhood spent bent over maps, drawn to the blank spaces where the known world gave out. The human brainstem has been one of anatomy's last such blanks—an inviting emptiness at the base of the mind. By mapping more than 200 clusters across 200-plus sections, the IIT Madras team has filled in one of those white patches, converting terra incognita into surveyed ground.",
        "excerpt": "Now when I was a little chap I had a passion for maps. I would look for hours at South America, or Africa, or Australia, and lose myself in all the glories of exploration. At that time there were many blank spaces on the earth, and when I saw one that looked particularly inviting on a map (but they all look that) I would put my finger on it and say, 'When I grow up I will go there.'",
        "source": "Joseph Conrad, Heart of Darkness (1899; Project Gutenberg eBook #219).",
        "href": "https://www.gutenberg.org/files/219/219-h/219-h.htm"
      },
      {
        "category": "artistic",
        "title": "In 1632 Rembrandt froze the moment a physician turned dissection into public knowledge, his surgeons leaning in as Dr. Tulp lifts the tendons of a forearm into the light. The painting is the atlas-maker's act made human: careful hands opening the body so that a room of watchers may finally see how it is built. Four centuries later, twenty scientists in Chennai perform the same ritual with MRI and microscopy, sharing their anatomy lesson with the whole world at once.",
        "excerpt": "Rembrandt's canvas stages the anatomist's labor as revelation—a corpse under bright light, learned witnesses crowding close, structure exposed for study rather than spectacle. It is the human counterpart of the brainstem atlas: the moment careful dissection is transformed into a lesson others can share.",
        "source": "Rembrandt van Rijn, The Anatomy Lesson of Dr. Nicolaes Tulp, 1632, oil on canvas, Mauritshuis, The Hague.",
        "href": "https://www.mauritshuis.nl/en/our-collection/artworks/146-the-anatomy-lesson-of-dr-nicolaes-tulp",
        "image": {
          "src": "/covers/indian-scientists-brainstem-atlas--a6.png",
          "alt": "Oil painting in which Dr. Nicolaes Tulp, wearing a black hat, uses forceps to demonstrate the muscles of a dissected left forearm to seven attentive surgeons gathered around a pale corpse on a table.",
          "credit": "Rembrandt van Rijn, The Anatomy Lesson of Dr. Nicolaes Tulp, 1632; Mauritshuis, The Hague; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Andreas Vesalius's De humani corporis fabrica of 1543 married rigorous dissection to breathtaking woodcut art, its flayed and skeletal figures standing in living landscapes as if the interior of the body were a country to be toured. It was the first true atlas of the human frame, replacing inherited error with things actually seen. The brainstem atlas is its direct descendant—Vesalius's ambition rebuilt in three dimensions, charting the one region his knife could barely reach.",
        "excerpt": "Vesalius's engraved figures turned dissection into a printed atlas anyone could open, each plate a surveyed page of the body's fabric. The IIT Madras reconstruction extends that project into the brainstem—the same patient labor of revealing hidden order, now rendered as a navigable 3D map.",
        "source": "Andreas Vesalius, De humani corporis fabrica libri septem (Basel: Johannes Oporinus, 1543); plate digitized by the Wellcome Collection, London, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Vesalius,_De_humani_corporis_fabrica,_1543_Wellcome_L0031739.jpg"
      }
    ],
    "rank": 24
  },
  {
    "slug": "seoul-trinket-consumer-culture",
    "headline": "In Seoul's Seongsu district, collectible 'trinkets' and pop-up shops drive a new consumer culture",
    "overview": "A wave of collectible keyring 'trinkets,' curated select shops and viral pop-ups is reshaping consumer culture in Seoul, centered on the former industrial district of Seongsu-dong, design magazine It's Nice That reported on July 13, 2026. Shoppers festoon bags with dangling plush charms in what Korean commentators call a 'feel-conomy' of emotion-driven, short-term purchases, while the city hosted more than 3,000 pop-up stores in 2025. Seongsu has become Seoul's answer to Brooklyn's Williamsburg or Tokyo's Daikanyama.",
    "genre": "Culture",
    "sources": [
      {
        "name": "It's Nice That",
        "href": "https://www.itsnicethat.com/articles/the-view-from-seoul-microtrends-in-seong-su-select-shops-creative-industry-130726"
      },
      {
        "name": "Beyond Retail Industry",
        "href": "https://www.beyondretailindustry.com/retail/from-factories-to-fashion-the-retail-miracle-of-seongsu-dong-south-korea/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/seoul-trinket-consumer-culture.png",
      "alt": "A cluster of small plush keyring charms dangling from a handbag.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before plush charms swung from Seongsu shoppers' bags, the Dutch Republic lost its head over another small, coveted object: the tulip bulb. In the frenzy of 1636-37, chronicled by Charles Mackay, a flower became a talisman of status and speculation, its price detached from any use, driven purely by the craving to possess what everyone else desired. Seoul's 'feel-conomy' of emotion-driven collectibles rhymes with that first great fad, where the marketplace of desire briefly swallowed reason whole.",
        "excerpt": "Nobles, citizens, farmers, mechanics, sea-men, footmen, maid-servants, even chimney-sweeps and old clothes-women, dabbled in tulips.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Volume 1, Chapter 3, \"The Tulipomania\" (1841).",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_3"
      },
      {
        "category": "historical",
        "title": "A closer cousin to Seongsu's keyring craze is the Beanie Baby mania that swept America in the late 1990s. Ty Inc. turned $5 plush animals, each with a name, a personality and a heart-shaped tag, into emotional talismans and speculative assets, engineering scarcity through staged 'retirements' until rare examples changed hands for thousands. When the manufactured magic wore off, the once-priceless collections became near worthless, a cautionary echo for any consumer culture built on charm and manufactured rarity.",
        "excerpt": "Ty Inc. transformed cheap plush toys into emotional talismans and speculative assets by attaching names, personalities and a sense of engineered scarcity, so that collectors treated $5 animals as alternative investments worth thousands. The bubble burst when buyers realized the rarity was manufactured, and the hoarded stock collapsed to a fraction of its peak value.",
        "source": "Natasha Frost, \"How the Beanie Baby Craze Came to a Crashing End,\" HISTORY (A&E Television Networks), 2023, updated 2025.",
        "href": "https://www.history.com/articles/how-the-beanie-baby-craze-came-to-a-crashing-end"
      },
      {
        "category": "literary",
        "title": "Alexander Pope's mock-epic The Rape of the Lock (1712) already understood the modern shopper who festoons herself with the world's small treasures. At Belinda's dressing table, cosmetics, pins and love-letters are laid out like sacred offerings, the toilette a ritual of adornment and vanity. Pope's glittering inventory of baubles anticipates the Seongsu bag hung with charms, where identity is assembled from curated, collectible trifles.",
        "excerpt": "Here files of pins extend their shining rows, / Puffs, Powders, Patches, Bibles, Billet-doux.",
        "source": "Alexander Pope, The Rape of the Lock, Canto I, in The Rape of the Lock, and Other Poems (Project Gutenberg edition).",
        "href": "https://www.gutenberg.org/files/9800/9800-h/9800-h.htm"
      },
      {
        "category": "literary",
        "title": "Thorstein Veblen gave the impulse behind Seongsu's status-signaling its enduring name: conspicuous consumption. Writing in 1899, he argued that wealth and taste mean nothing unless made visible to others, so goods become badges displayed for esteem. A plush trinket dangling where everyone can see it is precisely Veblen's evidence, worn on the outside of the bag, that the owner belongs to the desirable, in-the-know crowd.",
        "excerpt": "In order to gain and to hold the esteem of men it is not sufficient merely to possess wealth or power. The wealth or power must be put in evidence, for esteem is awarded only on evidence.",
        "source": "Thorstein Veblen, The Theory of the Leisure Class (1899), Chapter 3 (Project Gutenberg edition).",
        "href": "https://www.gutenberg.org/cache/epub/833/pg833.txt"
      },
      {
        "category": "artistic",
        "title": "The Dutch vanitas painters turned the accumulation of precious trinkets into a moral spectacle. In Pieter Claesz's still life, a jewelry box, shells, a globe and gleaming objects are arranged beside a skull, beauty and possession shadowed by transience. It is the perfect mirror for a 'feel-conomy' of collectible charms, a reminder that the delight of adornment and the emptiness of mere stuff have always been painted in the same frame.",
        "excerpt": "In this vanitas still life, Pieter Claesz gathers a jewelry box, exotic shells, a globe and other worldly treasures around a human skull and an overturned vessel. The gleaming trinkets celebrate the pleasure of collecting even as the skull insists on how fleeting such delights, and their owners, truly are.",
        "source": "Pieter Claesz, Vanitas Still Life with Skull, Globe, Shells, Jewelry Box and Other Objects, 1653 (Wikimedia Commons).",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Claesz_-_Vanitas_still_life_with_skull,_globe,_shells,_jewelry_box_and_other_objects.jpg",
        "image": {
          "src": "/covers/seoul-trinket-consumer-culture--a6.png",
          "alt": "A Dutch Golden Age vanitas still life showing a human skull beside an open jewelry box, seashells, a globe, an overturned glass and other precious objects on a dark tabletop.",
          "credit": "Pieter Claesz, Vanitas Still Life with Skull, Globe, Shells, Jewelry Box and Other Objects, 1653; private collection; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys's The Moneylender and His Wife (1514) stages the marketplace of desire five centuries early. The husband weighs gold coins and pearls with rapt attention while his wife's devotional book slips from her fingers, worldly baubles quietly winning her gaze. As Seongsu's select shops and viral pop-ups make shopping itself a curated ritual, Matsys's convex mirror and glittering trinkets warn how easily the shine of small treasures can pull the eye from everything else.",
        "excerpt": "Matsys shows a moneylender weighing gold and pearls while his wife, meant to be at prayer, lets her devotional book fall open as her eyes drift to the glittering coins and trinkets on the table. The worldly goods and their reflected shine dramatize how the marketplace of desire captures attention and displaces the spirit.",
        "source": "Quentin Matsys (Quinten Metsys), The Moneylender and His Wife, 1514, oil on panel, Musee du Louvre, Paris (Wikimedia Commons).",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg"
      }
    ],
    "rank": 25
  },
  {
    "slug": "pokemon-go-ten-years",
    "headline": "Pokémon Go marks 10 years with a Times Square 'raid,' still drawing millions of players",
    "overview": "Pokémon Go, the augmented-reality game that sent crowds into streets and parks chasing virtual creatures, marked its 10th anniversary in July 2026, capped by a 1,000-person 'raid' in New York's Times Square, with the milestone examined in coverage published July 13, 2026. Now owned by Scopely, the game still draws millions of daily players a decade after its 2016 launch. Its GO Fest 2026 debuted Mega Mewtwo and, for the first time, let every trainer join for free.",
    "genre": "Technology",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cevlwk4nrm7o"
      },
      {
        "name": "Variety",
        "href": "https://variety.com/2026/gaming/news/pokemon-go-fest-10-year-anniversary-mewtwo-times-square-1236806876/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/pokemon-go-ten-years.png",
      "alt": "A crowd of people outdoors holding up smartphones at night.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before smartphones plotted creatures onto a map, a whole population moved as one toward a shared point on the ground. Herodotus describes the annual river-pilgrimage to Bubastis, where hundreds of thousands converged on a single city for a festival of music, noise and revelry. The 1,000-strong Times Square 'raid' is a miniature of the same instinct: the crowd summoned by a common quest, flowing bodily into one place to celebrate together.",
        "excerpt": "they sail men and women together, and a great multitude of each sex in every boat; and some of the women have rattles and rattle with them, while some of the men play the flute during the whole time of the voyage, and the rest, both women and men, sing and clap their hands … To this place (so say the natives) they come together year by year even to the number of seventy myriads of men and women, besides children.",
        "source": "Herodotus, The History of Herodotus, trans. G. C. Macaulay, Book II (An Account of Egypt), section 60. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/2131/2131-h/2131-h.htm"
      },
      {
        "category": "historical",
        "title": "Pokémon Go fused a festival crowd with something older and stranger: the collector's compulsion, the need to catch, hoard and complete a set of prized specimens. Charles Mackay's account of the Dutch tulip craze of the 1630s is the classic anatomy of that madness, a fever for coveted, essentially decorative objects that swept up an entire society. Swap tulip bulbs for rare virtual creatures and the shape of the mania is uncannily familiar.",
        "excerpt": "In 1634, the rage among the Dutch to possess them was so great that the ordinary industry of the country was neglected, and the population, even to its lowest dregs, embarked in the tulip trade.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions, \"The Tulipomania\" (first published 1841). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm"
      },
      {
        "category": "literary",
        "title": "The game's players are a modern company of pilgrims, strangers of every sort gathering and setting out together toward waypoints and gyms as the season turns. Chaucer opens The Canterbury Tales with exactly this stirring, the spring restlessness that sends ordinary folk streaming out of doors onto the road to a shared destination. The pull is the same whether the goal is a saint's shrine or a raid boss.",
        "excerpt": "Than longen folk to goon on pilgrimages / (And palmers for to seken straunge strondes)",
        "source": "Geoffrey Chaucer, The Canterbury Tales, \"General Prologue,\" in Chaucer's Works, Vol. IV, ed. W. W. Skeat. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/22120/22120-h/22120-h.htm"
      },
      {
        "category": "literary",
        "title": "Augmented reality lays an enchanted layer over the ordinary world, so that a park bench or a fountain becomes the site of a monster and a battle. Cervantes wrote the founding comedy of this overlay: Don Quixote, gazing at a plain of windmills, sees instead a line of monstrous giants he is honor-bound to charge. Every player who lifts a phone and finds a fantastical creature perched on the real street is, gently, his heir.",
        "excerpt": "At this point they came in sight of thirty or forty windmills that there are on that plain, and as soon as Don Quixote saw them he said to his squire, 'Fortune is arranging matters for us better than we could have shaped our desires ourselves, for look there, friend Sancho Panza, where thirty or more monstrous giants present themselves…'",
        "source": "Miguel de Cervantes, Don Quixote, trans. John Ormsby, Vol. I, Chapter VIII. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/996/996-h/996-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Times Square raid, a public square packed with people absorbed in a single game, has a startling ancestor in paint. Pieter Bruegel's Children's Games crams more than two hundred figures into a town square and its streets, each lost in one of scores of games played at once, a whole community turned into a field of play. Bruegel treats their games with grave seriousness, exactly the mood of adults who spend a decade chasing pocket monsters through their own neighborhoods.",
        "excerpt": "Bruegel fills an entire town and its square with more than two hundred children swarming through dozens of games at once, from hoops and hobbyhorses to leapfrog and blind man's buff. The eye finds no center, only a teeming grid of play stretching to the horizon, so that ordinary civic space is wholly given over to games. It reads today like a bird's-eye view of a city block during a raid, every corner occupied by someone intent on the same shared amusement.",
        "source": "Pieter Bruegel the Elder, Children's Games (1560), oil on panel, Kunsthistorisches Museum, Vienna (inv. GG_1017); via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Children%E2%80%99s_Games_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/pokemon-go-ten-years--a6.png",
          "alt": "A bird's-eye view of a town square and streets swarming with more than two hundred children playing dozens of different games at once.",
          "credit": "Pieter Bruegel the Elder, Children's Games, 1560; Kunsthistorisches Museum, Vienna; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "At the heart of Pokémon Go is the hunt itself, crowds streaming into parks and woods after dark to pursue elusive quarry glimpsed only through a screen. Paolo Uccello's The Hunt in the Forest sends a whole company of huntsmen, horses and hounds racing into a nocturnal wood, all funneled by perspective toward a single vanishing point deep among the trees. Uccello even notes that a hunt by night is playful and symbolic rather than real, a game dressed as a chase, which is precisely what the app made of the city after sundown.",
        "excerpt": "Uccello sends a crowd of huntsmen, red-clad and mounted, with dogs and beaters, all rushing rightward into a black forest lit only by a scatter of gold flecks and a crescent moon. Diminishing figures pull the eye toward a distant vanishing point where the unseen quarry waits, converting a hunt into a dazzling geometric game. It is the chase as pure spectacle, a nighttime pursuit of prey that is barely there, staged for the pleasure of the pursuit.",
        "source": "Paolo Uccello, The Hunt in the Forest (c. 1465–1470), tempera and oil with traces of gold on panel, Ashmolean Museum, Oxford.",
        "href": "https://www.ashmolean.org/hunt-forest"
      }
    ],
    "rank": 26
  },
  {
    "slug": "sinner-defends-wimbledon-title",
    "headline": "Jannik Sinner beats Alexander Zverev to retain his Wimbledon singles title, his second in a row and fifth Grand Slam",
    "overview": "Italy's Jannik Sinner defended his Wimbledon men's singles crown on July 12, 2026, defeating Alexander Zverev 6-7(7), 7-6(2), 6-3, 6-4 for his second straight title at the All England Club and his fifth Grand Slam overall. The world No. 1 rebounded from an early set loss and from the memory of his French Open final collapse to become the 10th man in the Open Era to defend a Wimbledon title. Zverev, seeking his first Wimbledon crown weeks after claiming his maiden major at Roland Garros, fell just short.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxPZ3U5ZEZRREVyOUZQUk9xdHc4Tmp0enI0Qm5ERHNnQ0dXRk1BSzVoN0tRT2VpT1dGdF9SVUQ1b0o5YWhuZHpHalZqN1Nic2ptRmZDNjZxY3o1Z0lvZjI1OC12ZFBzT2pzbW1RX0ItN1dPTzFwMDNZeG1iUnloNjNxY3gzamdDMWRtX3pKbmphNzFhYVE?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/tennis/story/_/id/49342484/wimbledon-2026-men-final-live-tennis-latest-updates-jannik-sinner-alexander-zverev-news-results-schedule-weather"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/sinner-defends-wimbledon-title.png",
      "alt": "Jannik Sinner, the Italian world No. 1 tennis player, in close-up.",
      "credit": "Photo: Wikimedia Commons (CC0)"
    },
    "lead": true,
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before Sinner walked back onto Centre Court to guard his crown, the Greeks measured greatness by the man who could win the same contest again and again. Pausanias records Milo of Croton, the wrestler who took the Olympic olive six times and reigned as the ancient world's supreme champion of single combat. Sinner's second straight Wimbledon and fifth major place him in that lineage of serial victors whose mastery is proven not once but repeatedly, until a rival finally refuses to close.",
        "excerpt": "The statue of Milo the son of Diotimus was made by Dameas, also a native of Crotona. Milo won six victories for wrestling at Olympia, one of them among the boys; at Pytho he won six among the men and one among the boys. He came to Olympia to wrestle for the seventh time, but did not succeed in mastering Timasitheus, a fellow-citizen who was also a young man, and who refused, moreover, to come to close quarters with him.",
        "source": "Pausanias, Description of Greece, Book 6.14.5, trans. W. H. S. Jones and H. A. Ormerod (Loeb Classical Library, 1918), hosted at the Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0160%3Abook%3D6%3Achapter%3D14"
      },
      {
        "category": "historical",
        "title": "Sinner's title defense was really a defense against his own recent history: only weeks after collapsing in the French Open final, he had to walk back into the arena and risk failing again. Theodore Roosevelt's 1910 Sorbonne address gave that predicament its most enduring language, honoring the striver whose face is marred by dust and sweat and blood over the critic who never enters. Dropping the opening set to Zverev and then daring greatly to win the next three, Sinner embodied the man who knows in the end the triumph of high achievement.",
        "excerpt": "The credit belongs to the man who is actually in the arena, whose face is marred by dust and sweat and blood; who strives valiantly; who errs, who comes short again and again, because there is no effort without error and shortcoming; but who does actually strive to do the deeds; who knows great enthusiasms, the great devotions; who spends himself in a worthy cause; who at the best knows in the end the triumph of high achievement, and who at the worst, if he fails, at least fails while daring greatly, so that his place shall never be with those cold and timid souls who neither know victory nor defeat.",
        "source": "Theodore Roosevelt, \"Citizenship in a Republic\" (the \"Man in the Arena\" speech), delivered at the Sorbonne, Paris, 23 April 1910, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Citizenship_in_a_Republic"
      },
      {
        "category": "literary",
        "title": "The archetype of the champion who returns to reclaim what is his is Odysseus, who strings the great bow no suitor could bend and wins back his household in a hall of rivals. Homer frames the feat as effortless mastery, the hero handling his weapon as a bard strings a lyre. Sinner, returning to Centre Court to answer every challenger and repossess the title, reenacts that ancient scene of rightful reclamation after long trial.",
        "excerpt": "But Ulysses, when he had taken it up and examined it all over, strung it as easily as a skilled bard strings a new peg of his lyre and makes the twisted gut fast at both ends. Then he took it in his right hand to prove the string, and it sang sweetly under his touch like the twittering of a swallow. The suitors were dismayed, and turned colour as they heard it; at that moment, moreover, Jove thundered loudly as a sign, and the heart of Ulysses rejoiced as he heard the omen that the son of scheming Saturn had sent him.",
        "source": "Homer, The Odyssey, Book XXI, trans. Samuel Butler (1900), Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "literary",
        "title": "Virgil ends the Aeneid not with an army but with two men and a decision, Aeneas and Turnus resolving an entire war in single combat. The duel turns on will, endurance, and one final, unanswerable stroke, the essence of a contest decided between two individuals. Sinner's four-set victory over Zverev, hand to hand across the net for the crown, is that same reduction of everything to one champion outlasting one rival.",
        "excerpt": "He rais’d his arm aloft, and, at the word,\nDeep in his bosom drove the shining sword.\nThe streaming blood distain’d his arms around;\nAnd the disdainful soul came rushing through the wound.",
        "source": "Virgil, The Aeneid, Book XII, trans. John Dryden (1697), Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "Handel's oratorio Judas Maccabaeus gave Western music its definitive anthem of the returning victor, the chorus \"See, the conqu'ring hero comes,\" written to greet a champion home in triumph. So beloved was the melody that it became the standard music of laurels and homecomings across Europe. It is the sound imagined for Sinner lifting the trophy a second straight year, the conquering hero acclaimed once more.",
        "excerpt": "See, the conqu'ring hero comes!",
        "source": "George Frideric Handel, Judas Maccabaeus, HWV 63 (1747), libretto by Thomas Morell, Act III chorus; scores via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Jean-Leon Gerome's Pollice Verso freezes the instant single combat resolves into victory, the triumphant gladiator standing over a fallen foe while the arena renders its verdict. Nothing in the image survives but the winner and the crowd's judgment, the purest picture of individual mastery in contest. It is the visual counterpart to a Wimbledon final: one competitor left standing, the crowd deciding the champion.",
        "excerpt": "A victorious Roman gladiator stands over his defeated opponent in the arena, turning to the roaring crowd whose downturned thumbs demand the loser's death, the ultimate image of a single combatant's triumph.",
        "source": "Jean-Leon Gerome, Pollice Verso (\"Thumbs Down\"), oil on canvas, 1872; Phoenix Art Museum; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Leon_Gerome_Pollice_Verso.jpg",
        "image": {
          "src": "/covers/sinner-defends-wimbledon-title--a6.png",
          "alt": "A victorious Roman gladiator stands over a fallen opponent on the sand of a crowded amphitheater, looking up toward spectators who thrust their thumbs downward.",
          "credit": "Jean-Leon Gerome, Pollice Verso, 1872; Phoenix Art Museum; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "oil-jumps-us-iran-hormuz-strikes",
    "headline": "Oil prices jump about 3% and Asian shares slide as the United States and Iran escalate strikes around the Strait of Hormuz",
    "overview": "Crude oil prices rose roughly 3% and Asian equity markets fell as trading opened on July 13, 2026 after the United States and Iran exchanged fresh military strikes around the Strait of Hormuz. Brent and U.S. benchmarks climbed on fears that the fighting could choke the roughly one-fifth of the world's seaborne oil that passes through the strait, even as Washington insisted the waterway remained open to commercial traffic. Safe-haven assets firmed while regional stock indexes retreated.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxOUFpPY1lfc0lIc0xsNVlaSkZQanVuM3RZd0lUMTdLMlktT0dLajFOWExXSTZEd1pJd1kteDBWeTk5UnFHMmFtdUE1cWdmMEZwaDR4M09lV3NENXlhTHIwOUc1NEhTbGNYQTBZUmFNYlRIT3RUWWNyc3JZOXR2WXFrTWRFTmc1V2FHWnlDRW90YkJrOW1WWGstZ0d1bS1JaEJYZTcya0dUdkN4VzZQczhz?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQS2QwU3pIcHNXVlZZZW1SUXpNSVlUYlRILUdqUmJBODg5ZDh0Q3d4U21VZkdHZGhmZDlnNFFxYWZ1Y1AwTTJ1bTBZVlQ5ZFpSSngtMTdzNzljNExjWk15WE11MDBScXMwTmJkcG9NM2lEMjM3Z1E5ODNPWWljYnVxUko5T21tZ055eHhtMnh0bDZNZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/oil-jumps-us-iran-hormuz-strikes.png",
      "alt": "A large crude oil tanker moored at a loading terminal on the water.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 480 BC the survival of Greece turned on a chokepoint. Themistocles gambled everything on luring Xerxes' vast fleet into the narrow strait at Salamis, where sheer numbers became a liability and a smaller navy could win. Herodotus preserves his argument that a narrow sea, not open water, was where the decisive blow had to fall - the same logic that today makes the roughly twenty-mile-wide Strait of Hormuz, gateway for a fifth of the world's seaborne oil, matter more than any fleet.",
        "excerpt": "But if you do as I counsel you, you will thereby profit as I shall show: firstly, by engaging their many ships with our few in narrow seas, we shall win a great victory, if the war have its rightful issue; for it is for our advantage to fight in a strait as it is theirs to have wide sea-room.",
        "source": "Herodotus, The Histories (The Persian Wars), Book VIII, chapter 60, trans. A. D. Godley (London: William Heinemann, 1922); via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Herodotus_The_Persian_Wars_(Godley)/Book_VIII"
      },
      {
        "category": "historical",
        "title": "For seventy years the great powers tried to place the Suez chokepoint beyond the reach of war, pledging in 1888 that the canal would always be free and open and never be subjected to blockade. The 1956 Suez Crisis shattered that promise: the waterway was seized, blocked with scuttled ships, and closed, convulsing oil and freight prices worldwide. The paper guarantee reads like Washington's insistence that Hormuz stays open even as strikes fly - a reminder that a narrow waterway's openness is asserted far more easily than it is secured.",
        "excerpt": "The Suez Maritime Canal shall always be free and open, in time of war as in time of peace, to every vessel of commerce or of war, without distinction of flag. Consequently, the High Contracting Parties agree not in any way to interfere with the free use of the Canal, in time of war as in time of peace. The Canal shall never be subjected to the exercise of the right of blockade.",
        "source": "Convention Respecting the Free Navigation of the Suez Maritime Canal (Convention of Constantinople), Article I, signed at Constantinople, 29 October 1888; via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Constantinople_Convention_of_the_Suez_Canal"
      },
      {
        "category": "literary",
        "title": "The oldest image of a strait in Western literature is a trap with death on either hand. Circe warns Odysseus that his ship must thread a passage pinched between Scylla's cliff and the whirlpool Charybdis, where there is no safe course, only a choice of losses. It is the archetype of the contested narrows - one ship, one channel, catastrophe pressing from both shores - that makes markets shudder whenever the Strait of Hormuz is threatened.",
        "excerpt": "On the other part are two rocks, whereof the one reaches with sharp peak to the wide heaven, and a dark cloud encompasses it; this never streams away, and there is no clear air about the peak neither in summer nor in harvest tide. No mortal man may scale it or set foot thereon, not though he had twenty hands and feet. For the rock is smooth, and sheer, as it were polished. And in the midst of the cliff is a dim cave turned to Erebus, towards the place of darkness, whereby ye shall even steer your hollow ship, noble Odysseus. ... But that other cliff, Odysseus, thou shalt note, lying lower, hard by the first: thou couldest send an arrow across. And thereon is a great fig-tree growing, in fullest leaf, and beneath it mighty Charybdis sucks down black water, for thrice a day she spouts it forth, and thrice a day she sucks it down in terrible wise.",
        "source": "Homer, The Odyssey, Book XII, trans. S. H. Butcher and Andrew Lang (London: Macmillan, 1879); Project Gutenberg ebook 1728.",
        "href": "https://www.gutenberg.org/files/1728/1728-h/1728-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare captures how distant water can hold a fortune hostage. In the play's opening scene the merchant Antonio's friends picture his argosies at the mercy of winds and rocks, a cargo of silks and spices that is worth a fortune one moment and nothing the next at a single gust. It is the psychology of the oil trader watching Hormuz: wealth measured in ships at sea, and a price that lurches on the mere rumor of danger in a far-off channel.",
        "excerpt": "My winde cooling my broth, Would blow me to an Ague, when I thought What harme a winde too great might doe at sea. I should not see the sandie houre-glasse runne, But I should thinke of shallows, and of flats, And see my wealthy Andrew docks in sand, Vailing her high top lower then her ribs To kisse her buriall; should I goe to Church And see the holy edifice of stone, And not bethinke me straight of dangerous rocks, Which touching but my gentle Vessels side Would scatter all her spices on the streame, Enrobe the roring waters with my silkes, And in a word, but euen now worth this, And now worth nothing.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 1 (First Folio, 1623 text); Project Gutenberg ebook 2243.",
        "href": "https://www.gutenberg.org/files/2243/2243-h/2243-h.htm"
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky's 1812 Overture is the sound of a distant war felt as physical shock. It stages Napoleon's 1812 invasion of Russia as clashing anthems, tolling bells, and finally live cannon fire - conflict at the far edge of the map detonating into the concert hall. That transmission of faraway violence into an immediate, visceral jolt mirrors how strikes around Hormuz ripple within an afternoon into oil screens and equity indices thousands of miles away.",
        "excerpt": "The Petrucci Music Library work page records the \"Work Title\" as \"1812 Overture,\" the \"Alternative. Title\" as \"The Year 1812 / 1812 год (1812 god),\" the \"Year/Date of Composition\" as \"1880,\" and the \"First Perf ormance. 1882/8/20 in Moscow, Art & Industry Exhibition: Ippolit Altani (conductor).\"",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture (Ouverture solennelle \"1812\"), Op. 49, composed 1880; Petrucci Music Library (IMSLP).",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)"
      },
      {
        "category": "artistic",
        "title": "Kaulbach's mural-scale canvas freezes the moment a superpower's fleet is destroyed inside a narrow strait. Xerxes watches helplessly from a cliff-side throne as his galleys, too many for the channel, foul one another and sink among the wreckage - the chokepoint turning quantity into ruin. Painted for the Bavarian parliament as a lesson about power and its limits, it is the visual archetype of the Hormuz fear: that command of a sea means nothing without command of the narrows.",
        "excerpt": "A vast horizontal panorama of the sea-fight jammed into the Salamis narrows: Greek triremes ram and splinter the crowded Persian galleys while drowning men flail in the churning water. High on a rocky throne at the right, Xerxes and his court look on in dismay as the empire's overwhelming numbers are undone by the tightness of the strait. Smoke, torn sails, and tangled oars fill the constricted channel, where escape is impossible.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Naval Battle at Salamis), 1868, Maximilianeum, Munich; public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/oil-jumps-us-iran-hormuz-strikes--a6.png",
          "alt": "Panoramic 19th-century painting of the naval Battle of Salamis: Greek and Persian galleys collide and sink in a narrow strait as King Xerxes watches from a throne on the cliff at right.",
          "credit": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Naval Battle at Salamis), 1868; Maximilianeum, Munich; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "europe-heatwave-excess-deaths",
    "headline": "Europe recorded about 10,000 excess deaths during a late-June heatwave, new mortality data show",
    "overview": "European countries reported more than 10,000 excess deaths during the record-breaking heatwave that gripped the west of the continent in late June, according to data published by the EuroMOMO mortality-monitoring network. More than 9,000 of the deaths were among people aged 65 and older, and researchers said the surge is 'difficult to explain by anything but the extreme heat.' Belgium recorded its highest heatwave excess mortality since records began in 2000, and scientists say the heat would have been virtually impossible without human-caused climate change.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxOdHBJbVNOU1YwZVlzckc5bzdtRVU3bnJtRHRnckl1Yjk1TDdCSHZTTDNTdjJ4R1pSYjF6R3VLb0JVS1p3VWJOLVdHSlh5RHp1RkNWaGdrQWVGZDE2OWllenU4TF91c2lwWEdSdG9uX3g2VzNMZ2s0TGNuQldjemRrVy00UUwzNTdCcjJFVnhhR3JwbTJhYmZHWnotQlBIUjRuNlV0dWdKZ2QtTFZfOF85WEpsRlFSZVpGM2xIN2pHR19pRUVldnk0?oc=5"
      },
      {
        "name": "AOL",
        "href": "https://www.aol.com/articles/europe-recorded-10-000-excess-231044000.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/europe-heatwave-excess-deaths.png",
      "alt": "A large digital thermometer sign showing an extreme high temperature during a heatwave.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 430 BCE, as a crowded Athens sweltered under siege, Thucydides watched a pestilence overwhelm the city, killing indiscriminately and defeating every remedy. His eyewitness tally of the dead heaped in the streets is the West's first great record of mass mortality from an invisible natural killer, a chilling ancestor to today's counts of heat-driven excess deaths.",
        "excerpt": "The bodies of dying men lay one upon another, and half-dead creatures reeled about the streets and gathered round all the fountains in their longing for water.",
        "source": "Thucydides, History of the Peloponnesian War, Book II.52 (the Plague of Athens, 430 BCE), trans. Richard Crawley.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2"
      },
      {
        "category": "historical",
        "title": "Nearly a millennium later, in 541 CE, the historian Procopius chronicled the plague of Justinian as it swept Constantinople, filling the tallies with thousands of dead each day and sparing neither rich nor poor. Like modern mortality networks reckoning a heatwave's toll, he counted the catastrophe in daily death figures, recording a natural scourge that seemed capable of erasing humankind.",
        "excerpt": "the whole human race came near to being annihilated ... the tale of dead reached five thousand each day, and again it even came to ten thousand and still more than that",
        "source": "Procopius, History of the Wars, Book II.22-23 (the Plague of Justinian, 541 CE), trans. H. B. Dewing (Loeb Classical Library).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/2F*.html"
      },
      {
        "category": "literary",
        "title": "Daniel Defoe's 1722 novel reconstructs London's Great Plague of 1665 through its obsessive accounting of the weekly bills of mortality. His narrator's suspicion that the official numbers badly understated the true dead prefigures exactly the modern idea of excess deaths: the recognition that a silent killer's real toll always outruns what is first recorded.",
        "excerpt": "The second week in June, the parish of St Giles, where still the weight of the infection lay, buried 120, whereof though the bills said but sixty-eight of the plague, everybody said there had been 100 at least.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722).",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt"
      },
      {
        "category": "literary",
        "title": "In Coleridge's celebrated ballad, a becalmed ship lies trapped beneath a merciless, blood-red sun that stands motionless at noon, and one by one the crew perish of heat and thirst. The image of a killing sun no bigger than the moon burning over dying men is Romantic literature's starkest vision of deadly heat as a natural executioner.",
        "excerpt": "All in a hot and copper sky / The bloody sun at noon, / Right up above the mast did stand, / No bigger than the moon.",
        "source": "Samuel Taylor Coleridge, 'The Rime of the Ancient Mariner,' in Lyrical Ballads (1800 edition), Part II.",
        "href": "https://en.wikisource.org/wiki/Lyrical_Ballads_(1800)/Volume_1/The_Ancient_Mariner"
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi prefaced the 'Summer' concerto of The Four Seasons (c. 1725) with a sonnet depicting a landscape prostrated by the burning sun: man and flock languish, and the pine tree scorches. Composed three centuries ago, its music and verse render the oppressive, life-sapping heat of a European summer, the very condition that today drives thousands of excess deaths.",
        "excerpt": "Sotto dura Staggion dal Sole accesa / Langue l' huom, langue 'l gregge, ed arde il Pino;",
        "source": "Antonio Vivaldi, Concerto No. 2 in G minor, RV 315, 'L'estate' (Summer), from Le quattro stagioni, Op. 8 (c. 1725); accompanying sonnet, first movement.",
        "href": "https://www.baroquemusic.org/vivaldiseasons.html"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's The Harvesters (1565) shows peasants collapsed in exhaustion beneath the blazing sun of high summer, one man sprawled asleep amid the scorched golden wheat. Painted as northern Europe's climate turned, it captures the human body pushed to its limit by seasonal heat and labor: a serene yet pointed image of our vulnerability to the summer sun.",
        "excerpt": "Under a hazy, heat-whitened sky, laborers pause in a vast field of ripe wheat; some cut and bundle the crop while others slump in the shade of a tree, one man sprawled flat on his back, overcome by the midday heat. The scorched gold of the harvest and the drooping, sun-struck figures make the painting a quiet meditation on human frailty before the summer sun.",
        "source": "Pieter Bruegel the Elder, The Harvesters, 1565, oil on wood, The Metropolitan Museum of Art, New York (accession 19.164).",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/europe-heatwave-excess-deaths--a6.png",
          "alt": "Pieter Bruegel the Elder's 1565 painting The Harvesters: peasants harvesting and resting, one asleep, in a field of golden wheat under the summer sun.",
          "credit": "Pieter Bruegel the Elder, The Harvesters (1565), The Metropolitan Museum of Art, New York. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "typhoon-bavi-china-landfall",
    "headline": "Typhoon Bavi makes landfall in eastern China after nearly two million people are evacuated",
    "overview": "Typhoon Bavi came ashore near Taizhou in the eastern Chinese province of Zhejiang after authorities evacuated nearly two million people from its path, bringing fierce winds, heavy rain and coastal flooding. The storm forced the suspension of trains, flights and ferries and shut businesses and schools across the region before weakening as it moved inland. It was the latest powerful typhoon to test China's mass-evacuation and disaster-response systems during a stormy summer.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxOeUVORnVJVlAxZ1U2R2VGdy1UYUFGeU9OWW16dVkzb0tTUlo5em16Z2xzTXBTUlZTNVRnNXlQbGdrRFF0TURjLWJ0SUYxRHdpM1o4ZFJhcEgzNF9OWG5hUHR4YTRTTk5PY1Y4VFdJVEdkalYtVFd4eEtKb016TUpOekFYRkp5SU5EM1N5ZXY1TWJSRDlnMEZWTzVRYWg1cjNzWm1HZUZicVp4RnM?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOOW1ZaVBLeDMtNnVBWU9ZRXBmanFWcG9XV2tEbDE2dFM5V3BZanRzRHRPUmtzdm8wVk1KWlVUX2hSTnlMM1hBczh6LUJGNEYtNnA0LWRCdEZUZWdsTGQ5dTBhSEYzZ0lBQTBhRVRDeXU0R0JNOHpQSVlDTFFXeG84azZGZzd0ZHhwUXpYSnhialJ2WnVaaWc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/typhoon-bavi-china-landfall.png",
      "alt": "A satellite view of a large swirling typhoon with a clear eye over the ocean.",
      "credit": "Image: NOAA, via Wikimedia Commons (public domain)"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1281 Kublai Khan launched the largest seaborne invasion the world had yet seen against Japan, only for a typhoon to shatter his fleet on the rocks, the storm the Japanese remembered as kamikaze, the 'divine wind.' Marco Polo, hearing the tale in China, recorded how a north wind rose and drove the Great Kaan's armada to ruin. Seven centuries later the same East Asian seas still dictate terms to states and armies. As Typhoon Bavi bore down on Zhejiang, nearly two million people were ordered inland, humanity again ceding ground before the wind.",
        "excerpt": "There arose a north wind which blew with great fury, and caused great damage along the coasts of that Island, for its harbours were few. It blew so hard that the Great Kaan's fleet could not stand against it.",
        "source": "Marco Polo, The Book of Ser Marco Polo, the Venetian, trans. Henry Yule, Book III, Chapter III (\"What Further Came of the Great Kaan's Expedition Against Chipangu\"); The Travels of Marco Polo, Volume 2 (public domain).",
        "href": "https://www.gutenberg.org/files/12410/12410-h/12410-h.htm"
      },
      {
        "category": "historical",
        "title": "On 8 September 1900 a hurricane obliterated Galveston, Texas, drowning several thousand people in the deadliest natural disaster in United States history, a city caught with little warning and nowhere to flee. Paul Lester's contemporary chronicle captures the sheer physical violence of such a storm as it turns ordinary objects into weapons. The contrast measures a century of change: where Galveston could not evacuate, Zhejiang moved nearly two million people inland ahead of Bavi's landfall near Taizhou.",
        "excerpt": "The wind tore slates from roofs and carried them along like wafers. A person struck by one of these, driven with the fearful violence of the storm, was certain to be maimed, if not killed outright.",
        "source": "Paul Lester, The Great Galveston Disaster (Philadelphia, 1900), introductory account by Richard Spillane (public domain).",
        "href": "https://www.gutenberg.org/files/60105/60105-h/60105-h.htm"
      },
      {
        "category": "literary",
        "title": "Shakespeare opens The Tempest inside the storm itself, on the deck of a foundering ship where a boatswain bellows orders into a gale that no seamanship can master. The mariners' final cry, 'We split, we split!', is the sound of human order dissolving before wind and wave. It is the same helplessness felt along the Zhejiang coast as Bavi suspended ferries, flights and trains and forced a vast retreat inland.",
        "excerpt": "Blow, till thou burst thy wind, if room enough! ... All lost! to prayers, to prayers! all lost!",
        "source": "William Shakespeare, The Tempest, Act I, Scene 1 (c. 1611), Wikisource (Rackham edition, public domain).",
        "href": "https://en.wikisource.org/wiki/The_Tempest_(Rackham)/Act_1"
      },
      {
        "category": "literary",
        "title": "In Book 5 of the Odyssey, Poseidon spies Odysseus alone at sea and gathers every wind at once to smash his raft, blotting out sky and water in a single darkness. The oldest European poetry already knew the terror Bavi renewed off Taizhou: a lone human being dwarfed by a sea that a greater power has stirred to fury. Where Homer's hero clings to a spar, a modern state answers the same sea by marching millions out of its reach.",
        "excerpt": "So saying, he gathered the clouds, and seizing his trident in his hands troubled the sea, and roused all blasts of all manner of winds, and hid with clouds land and sea alike; and night rushed down from heaven.",
        "source": "Homer, The Odyssey, Book 5, lines 291-294, trans. A. T. Murray (Loeb, 1919), Perseus Digital Library (public domain).",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=5:card=291"
      },
      {
        "category": "artistic",
        "title": "The fourth movement of Beethoven's Sixth Symphony, the Pastoral, is headed simply 'Gewitter. Sturm' (Thunderstorm. Storm). Out of a calm countryside Beethoven builds a full orchestral cloudburst, low strings rumbling like distant thunder before violins and timpani erupt into driving rain and shrieking wind, then subside into gratitude as the storm passes. It is a musical premonition of exactly the sequence Zhejiang endured as Bavi's winds and torrents struck the coast and then weakened inland.",
        "excerpt": "Beethoven translates a gathering storm into pure orchestral force: distant thunder in the cellos and basses swells into a downpour of racing strings, stabbing brass and timpani that overwhelm the pastoral calm before dissolving into relief. The movement dramatizes the storm as an overwhelming natural power that human figures can only shelter from and wait out.",
        "source": "Ludwig van Beethoven, Symphony No. 6 in F major, Op. 68 ('Pastoral'), fourth movement, 'Gewitter. Sturm' (composed 1808), score at the International Music Score Library Project (IMSLP, public domain).",
        "href": "https://imslp.org/wiki/Symphony_No.6,_Op.68_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Hokusai's 'The Great Wave off Kanagawa' freezes a towering claw of water at the instant before it crashes onto three slender boats whose crews bow low over their oars, with Mount Fuji shrunk to a small peak beneath the wave's crest. It is the definitive image of humanity dwarfed by the fury of wind and water, tiny hulls at the mercy of a sea that fills the sky. It stands as an apt emblem for the coastal communities of Zhejiang and the nearly two million people ordered to flee inland before Typhoon Bavi.",
        "excerpt": "A colossal breaking wave, its foam splayed into grasping claws, rears over three low fishing boats whose oarsmen crouch helplessly, while the distant cone of Mount Fuji sits dwarfed beneath the towering surge, an image of small human vessels overwhelmed by the immensity of the sea.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa, from Thirty-six Views of Mount Fuji, colour woodblock print, c. 1830-1832, Metropolitan Museum of Art (accession JP1847); via Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/typhoon-bavi-china-landfall--a6.png",
          "alt": "Hokusai's woodblock print The Great Wave off Kanagawa: a huge cresting wave with claw-like foam towering over small boats, with Mount Fuji small in the distance.",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1830-1832), Metropolitan Museum of Art / Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "mcconnell-absence-fall-pneumonia",
    "headline": "U.S. Senator Mitch McConnell says a fall and pneumonia have kept him from the Senate, breaking weeks of silence about his health",
    "overview": "Senator Mitch McConnell, the former Republican leader, said on July 12, 2026 that a fall and a bout of pneumonia had led to his hospitalization and prolonged absence from the Senate, ending weeks of speculation about his condition. In a statement, the 84-year-old Kentucky lawmaker said he was recovering but was not yet able to return to Washington. His absence has deepened questions about the health and longevity of the Senate's most senior members.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOMjV5djRSZDZsX3ZyaFFXUkhDOFVWLUZEVlByVmtSczRSYTZfTVoxdWlIRGtsaGJzbmpYMV9BNXlhb3JkS2VYc0VtMFdqRXgzNVlPR09IbWtGbjhzbTI2eUFWQUJTeVFaSHVkUlhEQnNjUGMzSWFJaUJ3OWtKYXdwZmdLeUFTaUdIZG5TRlFpbGhLREVKTUc2YlVBSjI?oc=5"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQQkJ6LUFlaXZEX1Y0WkRoMHE1eTdERFl1UmlDTzBJNUZwZnpudFgwbWVlbEVEWlBfd0hHX2dVVXFtYktfRmRpd3AyUWVMakRKVThXY3RBVmVpUFVrOFB0T0xocWxuS1VxTktzZkpNRk1yMGZ6RFlsaWZjUlN2Si1KQ0hQc0s1MllBSnhxMVlqNmdoVVhKajV4Vkp2Q3hnNktPTUVvdHZpOVk3TFU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/mcconnell-absence-fall-pneumonia.png",
      "alt": "The United States Capitol in Washington under a bright sky.",
      "credit": "Photo: Wikimedia Commons (public domain)"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "For twenty-three years Tiberius ruled the Roman world, yet in his final months his body failed him even as he labored to conceal it, keeping his words and looks under guard and masking his weakness with forced courtesy. Tacitus records the aged emperor's slow, hidden decline, the physician who felt his pulse under pretense and the false reports of death, as the frailty of the flesh finally overtook the most powerful man alive. It is the ancient template for a long-dominant statesman whose grip on office outlasts the strength of his body, and whose true condition is the last thing anyone is permitted to see.",
        "excerpt": "Tiberius's bodily powers were now leaving him, but not his skill in dissembling. There was the same stern spirit; he had his words and looks under strict control, and occasionally would try to hide his weakness, evident as it was, by a forced politeness.",
        "source": "Tacitus, The Annals, Book VI.50, trans. Alfred John Church and William Jackson Brodribb (London: Macmillan, 1876), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_6"
      },
      {
        "category": "historical",
        "title": "Woodrow Wilson's stroke of 1919 was screened from the country for months, his incapacity softened into vague bulletins even as the presidency drifted. His secretary Joseph Tumulty describes the broken leader wheeled out in an invalid chair, wrapped in blankets, insisting on being kept in the fight though barely able to speak, a man of vast office reduced to frailty yet unwilling to let go. The parallel to an 84-year-old senator absent and long silent about a fall and pneumonia is close: the same clinging to a public role, the same managed quiet around a body that has given way.",
        "excerpt": "Even when he lay seriously ill, he insisted upon being taken in his invalid chair along the White House portico to the window of my outer office each day during the controversy in the Senate over the Treaty. There day after day in the coldest possible weather I conferred with him and discussed every phase of the fight on the Hill. He would sit in his chair, wrapped in blankets, and though hardly able, because of his physical condition, to discuss these matters with me, he evidenced in every way a tremendous interest in everything that was happening in the Capitol that had to do with the Treaty.",
        "source": "Joseph P. Tumulty, Woodrow Wilson As I Know Him (New York: Doubleday, Page & Co., 1921), via Project Gutenberg (ebook 8124).",
        "href": "https://www.gutenberg.org/ebooks/8124"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Lear, who begins the play parceling out a kingdom, ends it as a very foolish fond old man, fourscore and upward, uncertain of where he is or whether his own mind still serves him. The tragedy turns on a ruler who could not measure the distance between the power he still claimed and the frailty that had quietly overtaken him. For any long-serving leader in physical decline, Lear is the enduring warning about age, authority, and the failing of the perfect mind.",
        "excerpt": "Pray do not mocke me: / I am a very foolish fond old man, / Fourescore and vpward, / Not an houre more, nor lesse: / And to deale plainely, / I feare I am not in my perfect mind.",
        "source": "William Shakespeare, King Lear, Act IV, Scene vii, via Project Gutenberg (ebook 1128).",
        "href": "https://www.gutenberg.org/ebooks/1128"
      },
      {
        "category": "literary",
        "title": "Granted endless life but not endless youth, Tennyson's Tithonus withers without release, consumed by an immortality that has become a slow decay at the edge of the world. The poem is the twilight distilled: a once-favored figure who lingers past his season, watching his strength ebb while the world renews itself around him. It speaks to the peculiar cruelty of a long life in public power, outlasting one's own vigor, wanting neither to leave nor able fully to remain.",
        "excerpt": "The woods decay, the woods decay and fall, / The vapours weep their burthen to the ground, / Man comes and tills the field and lies beneath, / And after many a summer dies the swan. / Me only cruel immortality / Consumes: I wither slowly in thine arms,",
        "source": "Alfred Tennyson, \"Tithonus\" (1860), in Enoch Arden, etc. (London: Edward Moxon, 1864), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Enoch_Arden,_etc/Tithonus"
      },
      {
        "category": "artistic",
        "title": "In Goetterdaemmerung (Twilight of the Gods), Wagner closes his cycle with the ruler Wotan stripped of power, the spear of his authority shattered, sitting silent among the gods as he awaits the end. Waltraute's narration paints him motionless and grave, clutching the splinters of his broken staff, presiding in name over a dominion whose collapse he can no longer prevent. It is the definitive musical image of the twilight of a long reign, of an aged sovereign whose authority survives him only as ceremony while his strength and his world drain away.",
        "excerpt": "So sitzt er, sagt kein Wort, auf hehrem Sitze stumm und ernst, des Speeres Splitter fest in der Faust.",
        "source": "Richard Wagner, Goetterdaemmerung, WWV 86D (first performed 1876), Act I, Waltraute's narration; full score via IMSLP.",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Copley's vast canvas freezes the instant on 7 April 1778 when William Pitt, Earl of Chatham, the aged, gout-stricken statesman who had dominated Britain, collapsed mid-speech in the House of Lords and had to be caught by those around him. The painting makes a public spectacle of frailty overtaking power: the great orator felled in the very chamber that was his stage, ringed by peers who can only watch. It is the archetypal image of a towering political figure struck down by the body's failure at the height of a debate on the fate of the nation.",
        "excerpt": "The stricken Earl of Chatham, robed in state, sinks backward in a dead faint on the floor of the House of Lords, caught in the arms of his fellow peers as the assembled ranks of a hushed chamber turn toward the collapsing statesman.",
        "source": "John Singleton Copley, The Death of the Earl of Chatham, oil on canvas, 1779-1781 (Tate; long displayed at the National Portrait Gallery, London); object page at Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Death_of_the_Earl_of_Chatham_by_John_Singleton_Copley.jpg",
        "image": {
          "src": "/covers/mcconnell-absence-fall-pneumonia--a6.png",
          "alt": "Oil painting: the elderly Earl of Chatham in peer's robes collapses backward and is caught by other lords on the floor of the House of Lords, surrounded by rows of watching peers.",
          "credit": "John Singleton Copley, The Death of the Earl of Chatham (1779-1781). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "syria-new-parliament-first-session",
    "headline": "Syria's new parliament holds its first session in Damascus, the first since the ouster of former President Bashar al-Assad",
    "overview": "Syria's newly formed parliament convened for its first session in Damascus on July 12, 2026, the first sitting of the legislature since the fall of former President Bashar al-Assad. The gathering marked a milestone in the country's political transition, with the new assembly tasked with helping to shape post-Assad governance. The session underscored both the ambitions and the fragility of Syria's attempt to rebuild state institutions after years of civil war.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxPbHdwdUIyU2tsMVJLZjE1Q0p6blAwRTdPcEVkM2tudTlwTTJpelFrT3AxWi0ydWVCamVFaHczQ2JlYWxtTWFuWVVhVXRlN0ZLVm1DM0ZuenFOWUdaaDZmWjFYZW1oMXEtVXFSekJ5X1ZQYXBxT0JxYWxPdWY3TEZLWHhKR0ROcXVnRmdld2ZB?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxOX2ZCcEtqYlFjUXpUaGF5UEZUZklqaDJMSGI5NXRUdGI1bERBcnpUaXlkQl9jZnIxeVBYYWpTN2lpdFJFZUd4UWhVenhrWmotcHhHNi1RMU4tUHV3N3g3UXNLd2cycDdoT1NWUWNsa1NmaURWSDVOZlQ3S2lhM2RJQnpIck1ZTlNlVnBVbVdtREhlaGMxcDIyZlhSY3BDd3N1WkVj?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/syria-new-parliament-first-session.png",
      "alt": "The skyline of Damascus, Syria, with rooftops and hills beyond.",
      "credit": "Photo: Wikimedia Commons (public domain)"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Rome expelled its last king, it did not merely remove a tyrant; it invented an institution to replace him, vesting sovereignty in annual magistrates bound by law rather than a throne. Livy opens his account of the free republic exactly where Syria's deputies now stand: at the fragile threshold where a people, freed from one-man rule, must build offices, terms, and laws that outlast any ruler. The first session in Damascus is a modern echo of that ancient wager that liberty is safest when power is temporary and answerable.",
        "excerpt": "The new liberty enjoyed by the Roman people, their achievements in peace and war, annual magistracies, and laws superior in authority to men will henceforth be my theme.",
        "source": "Livy, The History of Rome, Book 2, chapter 1, trans. Rev. Canon Roberts (London: J. M. Dent & Sons, 1905). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0151:book=2:chapter=1"
      },
      {
        "category": "historical",
        "title": "On the eve of independence, India's Constituent Assembly gathered at midnight to convert a nation long ruled from abroad into a self-governing republic. Nehru named the moment precisely: a people 'long suppressed' finding utterance at the instant an old age ends and a new one begins. Syria's first post-Assad parliament reaches for the same threshold, a suppressed nation attempting to give its silenced voice an institutional form.",
        "excerpt": "At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom. A moment comes, which comes but rarely in history, when we step out from the old to the new, when an age ends, and when the soul of a nation, long suppressed, finds utterance.",
        "source": "Jawaharlal Nehru, 'A Tryst with Destiny,' address to the Constituent Assembly of India, New Delhi, 14 August 1947. Wikisource.",
        "href": "https://en.wikisource.org/wiki/A_Tryst_With_Destiny"
      },
      {
        "category": "literary",
        "title": "At the climax of Aeschylus's Oresteia, the cycle of blood-vengeance that has consumed a royal house is ended not by another killing but by the founding of a public tribunal. Athena establishes a standing council of citizen-judges to stand guard over the city forever, replacing private retribution with an institution of shared justice. It is the archetypal image for Syria's task: converting the settling of scores under tyranny into an assembly that can hold the state to account.",
        "excerpt": "I establish this tribunal, untouched by greed, worthy of reverence, quick to anger, awake on behalf of those who sleep, a guardian of the land.",
        "source": "Aeschylus, Eumenides, lines 704-706, trans. Herbert Weir Smyth, Loeb Classical Library (Cambridge, MA: Harvard University Press, 1926). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0006:card=681"
      },
      {
        "category": "literary",
        "title": "Tennyson defends the slow, unglamorous work of building representative government, a land where a man 'may speak the thing he will' and where freedom is enlarged not by decree but by accumulated precedent. The poem captures the unromantic patience that a first parliament demands: institutions widen gradually, session by session, rather than arriving whole. For a Syrian assembly convening amid fragility, it frames self-government as a structure that must be broadened carefully rather than proclaimed.",
        "excerpt": "It is the land that freemen till, / That sober-suited Freedom chose, / The land, where girt with friends or foes / A man may speak the thing he will; / A land of settled government, / A land of just and old renown, / Where Freedom broadens slowly down / From precedent to precedent",
        "source": "Alfred Tennyson, 'You Ask Me, Why, Though Ill at Ease,' Poems (London: Edward Moxon, 1843), Vol. 1. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Poems_(Tennyson,_1843)/Volume_1/%22You_Ask_Me,_Why,_Though_Ill_at_Ease%22"
      },
      {
        "category": "artistic",
        "title": "Verdi's chorus of exiled Hebrew slaves, longing on wings of gold for a lost homeland, became an unofficial anthem of Italian national rebirth, sung by peoples yearning to reconstitute themselves as a free nation. Its power lies in a captive community imagining the restoration of its country and its own collective voice. As Syrians attempt to reassemble a shattered state, the lament of a people mourning a homeland 'so beautiful and lost' resonates with the fragile hope of rebuilding it.",
        "excerpt": "Va, pensiero, sull'ali dorate; / va, ti posa sui clivi, sui colli, / ove olezzano tepide e molli / l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, Nabucco (1842), Part III: 'Va, pensiero' (Chorus of the Hebrew Slaves), libretto by Temistocle Solera. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "David's great drawing freezes the instant a locked-out chamber of commoners became a nation's legislature: deputies of the Third Estate throwing up their arms to swear they will not disband until France has a constitution. It is the founding gesture of modern representative government, an assembly declaring that it exists wherever its members gather, independent of any king. The image is a direct visual analogue for Syria's first session, an assembly claiming its own authority in the wake of a fallen ruler.",
        "excerpt": "David never finished the vast canvas the drawing was meant to become; the Revolution outran the picture as its heroes fell from favor. Yet the sketch survives as the purest record of the oath itself, arms raised toward Bailly at the center, a whole room bound to a single vow. Unfinished, it mirrors every constituent assembly that must build a state faster than events allow.",
        "source": "Jacques-Louis David, The Oath of the Tennis Court (Le Serment du Jeu de paume), 1791, pen and brown ink with wash heightened with white. Château de Versailles. Web Gallery of Art via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Oath_of_the_Tennis_Court_-_WGA06111.jpg",
        "image": {
          "src": "/covers/syria-new-parliament-first-session--a6.png",
          "alt": "Jacques-Louis David's 1791 pen-and-ink drawing of the Tennis Court Oath, with deputies of the French Third Estate raising their arms to swear not to disband until a constitution is written.",
          "credit": "Jacques-Louis David, 'The Oath of the Tennis Court' (1791), Chateau de Versailles. Public domain, via Web Gallery of Art / Wikimedia Commons."
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "gibraltar-spain-border-controls-removed",
    "headline": "Gibraltar removes 118-year-old border controls with Spain under a new UK-EU treaty, ending routine land checks",
    "overview": "Gibraltar began dismantling the 118-year-old physical border controls at its land crossing with Spain, opening the frontier to routine passage for the first time in generations under a new UK-EU treaty finalized after years of negotiation. From July 15, 2026, the fence known as La Verja and its passport queues are being removed, with checks shifted to Gibraltar's airport and seaport and a customs union established with the EU. The change is aimed at easing the daily crossing for roughly 15,000 Spanish frontier workers and freeing the movement of goods.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwydz60j3eno"
      },
      {
        "name": "UK Parliament (House of Commons Library)",
        "href": "https://commonslibrary.parliament.uk/uk-eu-agreement-on-gibraltar-what-has-been-agreed/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/gibraltar-spain-border-controls-removed.png",
      "alt": "The Rock of Gibraltar rising above the town and bay.",
      "credit": "Photo: Wikimedia Commons (CC BY 4.0)"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Gibraltar lifts the fence at La Verja, a barrier that has divided a peninsula for 118 years dissolves into ordinary passage. Antiquity knew the same charged moment in reverse of a siege: in 404 BC, at the close of the Peloponnesian War, the victorious Peloponnesians tore down the Long Walls that had sealed Athens off from its port at Piraeus. The demolition of a fortified boundary was greeted not as defeat alone but as a supposed dawn of freedom, walls giving way to open movement between peoples.",
        "excerpt": "After this Lysander sailed into Piraeus, the exiles returned, and the Peloponnesians with great enthusiasm began to tear down the walls to the music of flute-girls, thinking that that day was the beginning of freedom for Greece.",
        "source": "Xenophon, Hellenica 2.2.23, trans. Carleton L. Brownson (Loeb Classical Library, 1918), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Xen.+Hell.+2.2.23"
      },
      {
        "category": "historical",
        "title": "The clearest modern echo of a long-closed frontier reopening is the night of 9 November 1989, when the checkpoints of the Berlin Wall were thrown open and East and West Berliners crossed freely for the first time in 28 years. Two years earlier, standing at the Brandenburg Gate, President Ronald Reagan had made the demand that came to define the era: that the gate be opened and the wall torn down. Gibraltar's dismantling of routine land checks belongs to the same long story of contested boundaries yielding to free movement.",
        "excerpt": "At the Brandenburg Gate in June 1987, Reagan pointed to the wall dividing the city and called directly on the Soviet leader to open the gate and tear the barrier down. He framed the wall as a scar across a continent and its removal as the test of genuine freedom and reform. Within two and a half years the checkpoints stood open and the crossing became routine.",
        "source": "Ronald Reagan, \"Remarks on East-West Relations at the Brandenburg Gate in West Berlin,\" June 12, 1987, Ronald Reagan Presidential Library & Museum, U.S. National Archives.",
        "href": "https://www.reaganlibrary.gov/archives/speech/remarks-east-west-relations-brandenburg-gate-west-berlin"
      },
      {
        "category": "literary",
        "title": "A border is finally a question about whether neighbours need a barrier between them at all. Robert Frost's \"Mending Wall\" stages exactly that argument across a stone boundary two men rebuild each spring, one of them doubting whether the wall serves any purpose while the other clings to inherited proverb. As Gibraltar removes a fence that separated Spanish workers from their daily jobs, Frost's meditation on what a wall keeps in and out, and why we build them, reads as a fable of the crossing itself.",
        "excerpt": "Something there is that doesn't love a wall, / That sends the frozen-ground-swell under it, / And spills the upper boulders in the sun; / And makes gaps even two can pass abreast. ... He only says, 'Good fences make good neighbours.'",
        "source": "Robert Frost, \"Mending Wall,\" in North of Boston (New York: Henry Holt and Company, 1914), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/North_of_Boston/Mending_Wall"
      },
      {
        "category": "literary",
        "title": "The oldest and most dramatic image of a barrier coming down in Western literature is the fall of the walls of Jericho, where a fortified boundary that shut a people out collapses utterly and the way in lies open. The story turns a wall from an absolute division into a threshold that can be crossed. Gibraltar's La Verja is no citadel, but the symbolic force is kindred: a long-standing physical boundary falls, and passage that was blocked becomes free.",
        "excerpt": "So the people shouted when the priests blew with the trumpets: and it came to pass, when the people heard the sound of the trumpet, and the people shouted with a great shout, that the wall fell down flat, so that the people went up into the city, every man straight before him, and they took the city.",
        "source": "The Book of Joshua 6:20, King James Version (1611), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Joshua"
      },
      {
        "category": "artistic",
        "title": "No artwork is more bound to the fall of a wall than Beethoven's Ninth Symphony: when the Berlin Wall came down, Leonard Bernstein conducted its choral finale in the divided city with the word Freude (joy) sung as Freiheit (freedom). Setting Schiller's \"An die Freude,\" the finale proclaims that joy reunites what custom had rigidly sundered and that all people become brothers. It is the definitive anthem of barriers between peoples dissolving, apt for the day a frontier reopens.",
        "excerpt": "Deine Zauber binden wieder, / Was die Mode streng geteilt; / Alle Menschen werden Brüder, / Wo dein sanfter Flügel weilt.",
        "source": "Ludwig van Beethoven, Symphony No. 9 in D minor, Op. 125 (1824), choral finale on Friedrich Schiller's \"An die Freude\" (1785); score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.125_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Hubert Robert painted the Bastille while it was actually being torn down in the first days after 14 July 1789, capturing the exact moment a symbol of despotic enclosure begins to dissolve into rubble and open sky. Tiny figures swarm the massive fortress walls, dwarfed by the barrier even as they dismantle it, so that the picture becomes an image of a hated boundary being turned back into common ground. It is the visual archetype of Gibraltar's own scene: a long-standing physical barrier coming down, stone by stone, into free passage.",
        "excerpt": "In warm evening light the great cylindrical towers of the Bastille stand nearly whole, their crowns already broken open, while smoke still drifts from the fires of the assault. Workmen crawl across the ramparts and gather at the base, their smallness making the fortress loom, yet the walls are visibly opening to the air. What was an impassable barrier is caught in the act of becoming a ruin one can walk through.",
        "source": "Hubert Robert, La Bastille dans les premiers jours de sa demolition (The Bastille in the First Days of its Demolition), 1789, oil on canvas, Musee Carnavalet, Paris; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Bastille_in_the_first_days_of_its_demolition,_by_Hubert_Robert_(cropped).jpg",
        "image": {
          "src": "/covers/gibraltar-spain-border-controls-removed--a6.png",
          "alt": "Hubert Robert's 1789 painting showing the massive round towers of the Bastille being demolished, with small workers on the ramparts and smoke drifting from the fortress.",
          "credit": "Hubert Robert, The Bastille in the First Days of its Demolition (1789), Musee Carnavalet, Paris. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "israel-election-october-27",
    "headline": "Israel's governing coalition says the country's next election will be held on October 27, 2026",
    "overview": "Israel's national election will be held on October 27, 2026, coalition head Ofir Katz told a parliamentary committee, confirming the date set by law after months of uncertainty over whether the vote might come early. Holding to the original date means Prime Minister Benjamin Netanyahu's government will serve out a full term, and the ballot will be Israel's first since the 2023 Hamas attack and the wars that followed in Gaza, Lebanon and Iran. Surveys have suggested Netanyahu's coalition could lose, though his rivals have no clear path to a governing majority.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxQbVlfeEhKTEQwUVJDNzQ3eWVJM2JQd2JNMUZSV2pMVFRQUnp3YUNlN1RRQ2VmWVVITTZiUzJwZEJGbWVNUzR5Y0FPaHRZZU5YM0FpQ3Z0UWo1UGI5Tk9BNlNfNUhMMmRGckxhSHBDTzk5RWtsUTM5bGxfTjFkWEp3dF9Mb2RiT1kyNUZINksyTk9KQWt0Tk1qdjNjcjJqOURpUUxKQllTR2M3TC1wRzRLY3Z3N2o?oc=5"
      },
      {
        "name": "Haaretz",
        "href": "https://www.haaretz.com/israel-news/elections/2026-07-12/ty-article/.premium/israels-2026-election-will-take-place-on-october-27-netanyahu-coalition-says/0000019f-56aa-d9b4-abdf-dfebadd60000"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/israel-election-october-27.png",
      "alt": "The Knesset, Israels parliament building, in Jerusalem.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before ballots, Athens summoned its citizens to judge their leaders directly, scratching names onto potsherds to decide who should be cast out. Even Aristides, surnamed 'the Just,' was not spared the people's verdict. The anecdote of the ostracism captures the essence of an appointed reckoning at which a nation weighs a public figure's record and renders its judgment, no matter his past service. Like Israel's electorate summoned to the polls after years of war, the Athenians answered to no one but themselves.",
        "excerpt": "an unlettered and utterly boorish fellow handed his ostrakon to Aristides, and asked him to write Aristides on it. He, astonished, asked the man what possible wrong Aristides had done him. 'None whatever,' was the answer, 'I don't even know the fellow, but I am tired of hearing him everywhere called The Just.'",
        "source": "Plutarch, Life of Aristides 7, trans. Bernadotte Perrin, Loeb Classical Library (1914), via Bill Thayer's LacusCurtius (University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Aristides*.html"
      },
      {
        "category": "historical",
        "title": "In July 1945, with victory in Europe barely won, Winston Churchill faced his own appointed verdict at the ballot box, and the people who had followed him through the war turned him out of office. The war leader was repudiated in a landslide, his coalition swept aside by voters hungry for a different future. It is the archetype of a triumphant wartime leader summoned to judgment and found wanting, an outcome that shadows Netanyahu as surveys warn his coalition could lose. Delivering victory abroad, history shows, guarantees nothing at home.",
        "excerpt": "A leader who had steered his nation through its darkest hour submitted himself to the electorate expecting gratitude, and instead met rejection. The people, weary of war and fixed on the peace to come, delivered a crushing defeat that stunned the world. Winning the war, it turned out, was no promise of winning the vote.",
        "source": "\"1945 United Kingdom general election,\" documenting the Conservative defeat of Winston Churchill by Clement Attlee's Labour Party on 5 July 1945. Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/1945_United_Kingdom_general_election"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Coriolanus dramatizes the raw moment when a war hero must stand before the common people and beg their 'voices'—their votes—to win the consulship he believes he has earned in battle. His contempt for the ritual of submitting to popular judgment ultimately undoes him. The scene is a timeless portrait of a proud commander compelled to face the electorate's verdict, the same crucible that awaits any leader summoned to the polls after years of war.",
        "excerpt": "Your voices: for your voices I have fought;\nWatch'd for your voices; for Your voices bear\nOf wounds two dozen odd; battles thrice six\nI have seen and heard of; for your voices have\nDone many things, some less, some more your voices:\nIndeed I would be consul.",
        "source": "William Shakespeare, Coriolanus, Act II, Scene 3, via The Complete Works of William Shakespeare (MIT).",
        "href": "https://shakespeare.mit.edu/coriolanus/coriolanus.2.3.html"
      },
      {
        "category": "literary",
        "title": "At Belshazzar's feast, a disembodied hand writes upon the wall as the king revels, and the prophet Daniel reads the sentence: the reign has been numbered, weighed in the balances, and found wanting. It is the archetypal day of reckoning, a ruler abruptly summoned to account and judged deficient. For a nation and its leader facing a fateful appointed verdict after years of upheaval, no image speaks more directly of power measured and found short.",
        "excerpt": "And this is the writing that was written, MENE, MENE, TEKEL, UPHARSIN. This is the interpretation of the thing: MENE; God hath numbered thy kingdom, and finished it. TEKEL; Thou art weighed in the balances, and art found wanting. PERES; Thy kingdom is divided, and given to the Medes and Persians.",
        "source": "The Holy Bible, King James Version (1611), Daniel 5:25-28, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Daniel"
      },
      {
        "category": "artistic",
        "title": "Mozart's Requiem opens its Sequence with the 'Dies irae'—the day of wrath—setting the ancient hymn of the Last Judgment to music of terror and trembling, a whole world called to account in a single reckoning. The movement gives sound to the idea of an appointed day when all are summoned before a final verdict. Its imagery of a fixed day of judgment resonates with a nation gathering to the ballot to render its collective sentence on those who have led it through war.",
        "excerpt": "Dies irae, dies illa,\nSolvet saeclum in favilla:\nTeste David cum Sibylla.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (1791), 'Dies irae' (Sequentia; Latin text attributed to Thomas of Celano, 13th c.), via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Hogarth's An Election Entertainment, first of his four paintings on the Humours of an Election, throws open the messy, boisterous reality of a contest for power: candidates plying voters with food and drink, factions brawling, the whole raucous machinery of a decisive vote. It is a satirical yet vivid depiction of the setting where power is won and lost by the people's decision. As Israel readies for its own appointed contest at the ballot, Hogarth's crowded tavern remains the enduring image of an election as the arena of public judgment.",
        "excerpt": "A crowded tavern seethes with the chaos of an election feast: a Whig candidate is pawed and toasted by voters he is bribing, drink flows, a brick sails through the window from the mob outside, and a wounded partisan is tended amid the din. Hogarth stages the whole grubby spectacle of a contest for power as a parody of the Last Supper, the nation's verdict bought and brawled over around the table.",
        "source": "William Hogarth, An Election Entertainment (plate one of Humours of an Election), 1754-55, oil on canvas, Sir John Soane's Museum, London; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_028.jpg",
        "image": {
          "src": "/covers/israel-election-october-27--a6.png",
          "alt": "Hogarth's crowded, chaotic 18th-century election banquet in a tavern, with candidates plying voters, brawling, and a mob outside the window.",
          "credit": "William Hogarth, 'An Election Entertainment' (1754-55), Sir John Soane's Museum, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "doj-investigates-uaw-fain",
    "headline": "U.S. Justice Department opens a grand jury investigation into UAW President Shawn Fain over benefits for his fiancee",
    "overview": "The U.S. Justice Department has opened a grand jury investigation into United Auto Workers President Shawn Fain over allegations that he pressured another top union official to secure financial benefits for his fiancee and her sister, according to reports. A union monitor's report said it had substantiated a claim that Fain acted improperly to obtain a bonus for his fiancee and that he retaliated against Vice President Rich Boyer for refusing to approve it. Fain has called the allegations false and accused Boyer of trying to influence this fall's UAW leadership election.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNVG02SE16bkx3NlVrWVVvRnNjSjY2eUJWUnZ4Z3FNazlmUW9sSlJsWmxtZjB2Z1pxTGxodk5Nb19nN3BsUm96dHNoaDBaUWE3U25kUmZrSWhERW1xbW9GLWU0azh5WG1XYVhyNnpGNFpzeHpZejBWZzVpTUtnTzJ2LWNtS2pkOEFWTkw2WTQyclRfb1FQUFU3MmF6Y3g5bjN2WGZ2dFlR?oc=5"
      },
      {
        "name": "Fortune",
        "href": "https://fortune.com/2026/07/12/doj-investigation-grand-jury-uaw-president-shawn-fain/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/doj-investigates-uaw-fain.png",
      "alt": "The facade of the U.S. Department of Justice building in Washington.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 70 BC the young advocate Cicero prosecuted Gaius Verres, the Roman governor of Sicily, for looting the province he had sworn to protect and rewarding cronies with plunder. Verres had treated public office as a private fortune, and the trial became the ancient world's defining reckoning with a powerful official who abused his position for gain. Like the grand-jury inquiry into Shawn Fain, the case turned on whether a leader entrusted with others' welfare had bent that authority to enrich his own circle.",
        "excerpt": "the embezzler of the public funds, the petty tyrant of Asia and Pamphylia, the robber who deprived the city of its rights, the disgrace and ruin of the province of Sicily.",
        "source": "Marcus Tullius Cicero, The First Oration Against Verres (Actio Prima in C. Verrem), 70 BC, translated by C. D. Yonge.",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading"
      },
      {
        "category": "historical",
        "title": "Francis Bacon rose to become Lord Chancellor of England, the very fountainhead of the nation's justice and a celebrated champion of reason and reform. In 1621 Parliament charged him with twenty-three counts of taking bribes from litigants, and the great moralist of the age was forced to confess and surrender his office in disgrace. His fall echoes in the Fain investigation: a figure who claimed the moral high ground brought under suspicion of trading the powers of his office for private benefit.",
        "excerpt": "I do plainly and ingenuously confess that I am guilty of corruption, and do renounce all defence.",
        "source": "Francis Bacon, \"The Confession and Humble Submission of me, Lord Chancellor,\" to the House of Lords, 30 April 1621; reprinted in the Introduction to The Essays of Francis Bacon.",
        "href": "https://en.wikisource.org/wiki/The_Essays_of_Francis_Bacon/Introduction_I"
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Measure for Measure the deputy Angelo is installed to clean up a lax city and enforce a strict moral law, presenting himself as the incorruptible reformer. Yet he swiftly abuses the authority handed to him, threatening to condemn a man unless the man's sister yields to his own desire. Angelo's private aside captures the hypocrisy at the heart of any corruption inquiry into a self-styled champion of virtue, including the allegations that Fain leveraged his union post for personal favor.",
        "excerpt": "Thieves for their robbery have authority / When judges steal themselves.",
        "source": "William Shakespeare, Measure for Measure, Act II, Scene 2 (Angelo).",
        "href": "https://www.gutenberg.org/cache/epub/1530/pg1530.txt"
      },
      {
        "category": "literary",
        "title": "Moliere's Tartuffe is a smooth impostor who cloaks naked self-interest in the language of piety, worming his way into a household to seize its wealth and betray those who trusted him. The comedy skewers the way a pretended saint can exploit the reverence he commands until he is finally unmasked. The play speaks directly to the theme of the Fain case: a leader who trades on moral authority while accused of steering benefits to himself and his kin.",
        "excerpt": "He passes for a saint in your opinion. In fact, he's nothing but a hypocrite.",
        "source": "Moliere, Tartuffe; Or, The Hypocrite, Act I, Scene 1 (Dorine), translated by Curtis Hidden Page.",
        "href": "https://www.gutenberg.org/cache/epub/2027/pg2027.txt"
      },
      {
        "category": "artistic",
        "title": "Mozart's opera Le nozze di Figaro pits the servant Figaro against Count Almaviva, a nobleman who schemes to abuse his rank and revive the feudal droit du seigneur over Figaro's bride. In his defiant cavatina Figaro warns the Count that he will no longer submit to a master who exploits his office for private appetite. The aria is a musical fable of authority turned to personal advantage and the reckoning that follows, resonating with a union chief accused of bending his power to favor those close to him.",
        "excerpt": "Se vuol ballare, signor Contino, il chitarrino le suonerò.",
        "source": "Wolfgang Amadeus Mozart, Le nozze di Figaro, K. 492 (1786), libretto by Lorenzo Da Ponte; Figaro's cavatina \"Se vuol ballare,\" Act I.",
        "href": "https://imslp.org/wiki/Le_nozze_di_Figaro,_K.492_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "Thomas Nast's 1871 cartoon lampooned the Tammany Hall boss William M. Tweed and his ring, who plundered New York's treasury through padded contracts and kickbacks while posing as friends of the working man. Here the ring's leaders stand in a circle, each pointing at his neighbor as the caption demands to know who stole the people's money. The image became the enduring emblem of a political boss's corruption and evasion, a fitting visual counterpart to a probe into whether a modern labor leader diverted benefits to his own family.",
        "excerpt": "A wood-engraved caricature in which the Tammany Ring's bosses form a ring and each points to the man beside him, dodging the printed question of who stole the people's money with the answer 'Twas him. Nast turns collective guilt and mutual finger-pointing into a portrait of leaders looting the public purse.",
        "source": "Thomas Nast, \"Two Great Questions\" (\"Who Stole the People's Money?\"), Harper's Weekly, 19 August 1871; Library of Congress (LCCN 2006685392).",
        "href": "https://commons.wikimedia.org/wiki/File:Two_great_questions._%22Who_is_Ingersoll%27s_Co.%3F_-_%22Who_stole_the_people%27s_money%3F_-_Th._Nast._LCCN2006685392.jpg",
        "image": {
          "src": "/covers/doj-investigates-uaw-fain--a6.png",
          "alt": "Thomas Nast's 1871 cartoon of the Tammany Ring standing in a circle, each boss pointing to the next in answer to 'Who stole the people's money?'",
          "credit": "Thomas Nast, Harper's Weekly, 19 August 1871. Library of Congress (LCCN 2006685392). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "sk-hynix-nasdaq-debut-drop",
    "headline": "SK Hynix shares tumble more than 12% in Seoul after a record $26.5 billion Nasdaq debut",
    "overview": "Shares of South Korean memory-chip maker SK Hynix fell more than 12% in Seoul on July 13, 2026, days after its American depositary receipts began trading on the Nasdaq in a $26.5 billion listing, the largest U.S. share sale ever by a foreign company. Investors locked in profits after the stock jumped in its Wall Street debut and weighed caution over second-quarter earnings and the pace of shipments of its advanced HBM4 artificial-intelligence memory chips. The pullback opened a discount of more than 20% between the company's U.S. and Korean listings.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOb0RGSUR2QnZDb0VoSlZLUklaU0RqVEpseEtkZFZTQ0hzenRMcDRzdWFwNjJIMTZSN2xuYXZlcF9wQ0xPYTNhRTIzVElQUVZCUWZURjdYazJTU2NqNlgybkZJX1pCek5scjNpaUNpTGNSLXZndnZZZXpTQ0N3VGxZVnowYkNvbm80bWpDSW4wMVV1VUZKaEZacWF1WTN3MUJxY0dSdWpCdllvN2JIR3lfTGM3NnlOdw?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/13/sk-hynix-shares-fall-after-stellar-nasdaq-debut.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/sk-hynix-nasdaq-debut-drop.png",
      "alt": "A silicon semiconductor wafer reflecting iridescent rainbow colors.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch tulip craze of the 1630s is the archetype of a euphoric market debut that curdles into a rout. As bulbs of a novel luxury good became tradable tokens, every rank of society poured its savings into them, prices doubled overnight, and paper fortunes bloomed - until confidence evaporated and the same crowd that had rushed in was ruined. SK Hynix's record listing and 12% same-day reversal replays the pattern: a new prize (AI memory chips instead of flowers), a scramble to own it, and a swift cashing-out.",
        "excerpt": "Nobles, citizens, farmers, mechanics, sea-men, footmen, maid-servants, even chimney-sweeps and old clothes-women, dabbled in tulips. People of all grades converted their property into cash, and invested it in flowers.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. 1, Chapter 3, “The Tulipomania” (London: Richard Bentley, 1841).",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_3"
      },
      {
        "category": "historical",
        "title": "A century later the South Sea Bubble of 1720 showed how a dazzling flotation could inflate on nothing but confidence and the promise of untold riches from a distant trade. Shares were snapped up at fantastical prices by a public that neither understood nor cared what the enterprise actually did, and imitators multiplied until the whole edifice collapsed. The frenzy around a landmark offering and an unproven future - here, a record Nasdaq debut riding hopes for HBM4 - and the profit-taking that follows echo that speculative delirium.",
        "excerpt": "A company for carrying on an undertaking of great advantage, but nobody to know what it is. Were not the fact stated by scores of credible witnesses, it would be impossible to believe that any person could have been duped by such a project.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. 1, Chapter 2, “The South-Sea Bubble” (London: Richard Bentley, 1841).",
        "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_2"
      },
      {
        "category": "literary",
        "title": "In Little Dorrit, Dickens diagnoses speculative mania as a contagion: the financier Merdle is worshipped as the greatest man alive and everyone rushes to invest in his ventures, spreading the fever like a plague until his sudden ruin wipes out fortunes across society. The novel captures exactly the crowd psychology behind a euphoric debut and its reversal - adulation, imitation, then panic. SK Hynix's investors, chasing an AI-memory darling and then bolting for the exits, move to the same rhythm.",
        "excerpt": "That it is at least as difficult to stay a moral infection as a physical one; that such a disease will spread with the malignity and rapidity of the Plague; that the contagion, when it has once made head, will spare no pursuit or condition, but will lay hold on people in the soundest health, and become developed in the most unlikely constitutions.",
        "source": "Charles Dickens, Little Dorrit, Book 2, Chapter 13, “The Progress of an Epidemic” (London: Bradbury and Evans, 1857).",
        "href": "https://en.wikisource.org/wiki/Little_Dorrit/Book_2/Chapter_13"
      },
      {
        "category": "literary",
        "title": "Writing in the wake of the South Sea Bubble, Pope's verse satire on the use of riches casts the age of paper wealth and stock-jobbing as a rising flood of avarice that levels every distinction of rank. His prophecy that corruption would 'deluge all' while statesman and servant alike ply the stocks skewers the mania for speculative gain. It reads as a period portrait of the very appetite - fortunes chased on paper - that a record share sale and its swift sell-off put on display.",
        "excerpt": "At length Corruption, like a gen'ral Flood, (So long by watchful Ministers withstood) Shall deluge all; and Av'rice creeping on, Spread like a low-born Mist, and blot the Sun; Statesman and Patriot ply alike the Stocks, Peeress and Butler share alike the Box, The Judge shall job, the Bishop bite the Town, And mighty Dukes pack Cards for half a crown.",
        "source": "Alexander Pope, An Epistle to the Right Honourable Allen, Lord Bathurst (Moral Essays, Epistle III, “Of the Use of Riches”), 1733.",
        "href": "https://en.wikisource.org/wiki/An_Epistle_to_the_Right_Honourable_Allen,_Lord_Bathurst"
      },
      {
        "category": "artistic",
        "title": "The Beggar's Opera opened in 1728, when the ruin of the South Sea Bubble was still raw, and Gay and Pepusch turned the mercenary temper of the age into ballad-satire. Its very first air declares a world in which every profession cheats every other and self-interest rules all - the same cynicism that surfaces when a market stampedes into a hot offering and then just as quickly cashes out. As a musical portrait of a society where everything and everyone is for sale, it frames the fickle, self-serving crowd behind any boom and bust.",
        "excerpt": "Through all the Employments of Life / Each Neighbour abuses his Brother; / Whore and Rogue they call Husband and Wife: / All Professions be-rogue one another: / The Priest calls the Lawyer a Cheat, / The Lawyer be-knaves the Divine: / And the Statesman, because he's so great, / Thinks his Trade as honest as mine.",
        "source": "John Gay (libretto) and Johann Christoph Pepusch (music), The Beggar's Opera, Air I (London, 1728).",
        "href": "https://imslp.org/wiki/The_Beggar%27s_Opera_(Pepusch,_John_Christopher)"
      },
      {
        "category": "artistic",
        "title": "Hendrik Pot's allegory of tulip mania shows Flora, goddess of flowers, borne on a wind-driven wagon crowded with drinkers and men weighing coin, while Haarlem weavers fling down their tools to chase it toward the sea where it will founder. It is a mocking emblem of speculative folly - fortune riding the wind, the crowd abandoning honest work to follow a fragile bubble to its wreck. Painted amid the 1637 crash, it is the perfect visual mirror for a giddy market debut that reverses into a fall.",
        "excerpt": "A satirical procession: Flora and her hangers-on ride a wheeled sailing-car that catches the wind, drink and weigh money as they go, and are followed by weavers who have thrown away their looms - all rolling toward the open sea in the distance, where the wagon and its fools are bound to sink.",
        "source": "Hendrik Gerritsz. Pot, Flora's Mallewagen (Flora's Wagon of Fools), c. 1637-1640, oil on panel, Frans Hals Museum, Haarlem.",
        "href": "https://commons.wikimedia.org/wiki/File:Flora%27s_Malle-wagen_van_Hendrik_Pot_1640.jpg",
        "image": {
          "src": "/covers/sk-hynix-nasdaq-debut-drop--a6.png",
          "alt": "Allegorical painting of Flora, goddess of flowers, riding a wind-blown wagon crowded with tulip speculators and money-weighers as weavers abandon their looms to follow it toward the sea.",
          "credit": "Hendrik Gerritsz. Pot, Flora's Mallewagen (c. 1637-1640), Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "disney-moana-box-office-disappoints",
    "headline": "Disney's live-action 'Moana' disappoints with a $43 million U.S. opening, among the weakest for its remakes",
    "overview": "Disney's live-action remake of 'Moana' opened to just $43 million at North American theaters, well below the studio's projection of $60 million to $65 million and a global launch of about $95 million. Made on a budget of roughly $250 million before marketing, the film ranks among the weakest debuts for a Disney live-action remake, rivaling 2025's 'Snow White.' The result revives questions about the studio's reliance on reworking its animated catalog, arriving only a decade after the original and less than two years after its sequel.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiggFBVV95cUxPUmp1MFdramN1R2ZzZHRDcE15UXl1SjAxdzV0bnFHY0QtVWtvQlh2aWRtYlg2MnhJUjVuaXlMOEJyYi1GUm1USEtBcTdjbDBGVVNHWGhhazNqX3NCaHF1UWg4RkVSUTNlTEFhTHY5NWprcGFkdVhUMXZyQnRSVFhZWEhB?oc=5"
      },
      {
        "name": "Variety",
        "href": "https://variety.com/2026/film/box-office/moana-box-office-opening-weekend-weakest-disney-live-action-remake-1236808979/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/disney-moana-box-office-disappoints.png",
      "alt": "An empty auditorium with rows of seats facing a stage and screen.",
      "credit": "Photo: Wikimedia Commons (CC0)"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nero poured the wealth of an empire into the Domus Aurea, a pleasure-palace so vast and gilded it swallowed the heart of Rome, only to muse at its dedication that he could now begin to live like a human being. It is the archetype of the ruinously expensive spectacle built to glorify a patron rather than to serve an audience, opulence mistaken for achievement. Disney's quarter-billion-dollar remake, gold-plating a story it told only a decade ago, is the modern echo: colossal outlay, diminishing wonder, a great house that fails to fill.",
        "excerpt": "There were dining-rooms with fretted ceils of ivory, whose panels could turn and shower down flowers and were fitted with pipes for sprinkling the guests with perfumes. The main banquet hall was circular and constantly revolved day and night, like the heavens. When the edifice was finished in this style and he dedicated it, he deigned to say nothing more in the way of approval than that he was at last beginning to be housed like a human being.",
        "source": "Suetonius, The Lives of the Caesars, \"Nero,\" 31 (trans. J. C. Rolfe, Loeb Classical Library, 1914), via LacusCurtius.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Nero*.html"
      },
      {
        "category": "historical",
        "title": "Herodotus records how Cheops emptied Egypt of its wealth and worked a hundred thousand men in relays for decades to raise the Great Pyramid, a monument to one man's vanity that ground his people into misery. It is the ancient template of the white-elephant project: prodigious cost, colossal scale, and a legacy of exhaustion rather than delight. A studio staking $250 million to re-erect a monument it already built recalls the same hubris, grandeur pursued for its own sake until the treasury and the goodwill run dry.",
        "excerpt": "Cheops succeeded to the throne, and plunged into all manner of wickedness. He closed the temples, and forbade the Egyptians to offer sacrifice, compelling them instead to labour, one and all, in his service. A hundred thousand men laboured constantly, and were relieved every three months by a fresh lot. It took ten years' oppression of the people to make the causeway for the conveyance of the stones, a work not much inferior, in my judgment, to the pyramid itself.",
        "source": "Herodotus, The History, Book II.124-125 (trans. George Rawlinson), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_2"
      },
      {
        "category": "literary",
        "title": "Shelley's traveller finds only a shattered colossus in the sand, its boastful inscription outlived by the very ruin it denies, the sculptor's pride reduced to a lesson in transience. The poem is the definitive fable of monumental ambition humbled, of works erected to command awe that instead command pity. A once-unassailable studio, confident that its name alone will summon the crowds, discovers on the boundless sands of the box office that nothing beside remains.",
        "excerpt": "And on the pedestal these words appear: 'My name is Ozymandias, king of kings: Look on my works, ye Mighty, and despair!' Nothing beside remains. Round the decay Of that colossal wreck, boundless and bare, The lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, \"Ozymandias of Egypt,\" in Poems That Every Child Should Know, ed. Mary Elizabeth Burt (1904), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt"
      },
      {
        "category": "literary",
        "title": "The Preacher, a king who built houses, planted vineyards and heaped up every splendour, turns at last to survey his labours and finds them vanity, all a chasing after wind. His verdict that there is no new thing under the sun is the oldest warning against the exhaustion of a formula, against mistaking repetition for creation. A catalogue endlessly reworked, each remake grander and emptier than the last, lives out the sermon: great works and grand outlays, and no profit under the sun.",
        "excerpt": "I made me great works; I builded me houses; I planted me vineyards. The thing that hath been, it is that which shall be; and that which is done is that which shall be done: and there is no new thing under the sun. Then I looked on all the works that my hands had wrought, and on the labour that I had laboured to do: and, behold, all was vanity and vexation of spirit, and there was no profit under the sun.",
        "source": "Ecclesiastes 1:9, 2:4, 2:11 (King James Version), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes"
      },
      {
        "category": "artistic",
        "title": "Bizet's Carmen premiered in 1875 to a cold, scandalized house; the composer died three months later believing his masterpiece a humiliating failure, never seeing it become one of the most beloved operas ever written. It is the paradigm of the much-hyped spectacle that fails to draw its crowd on opening night, brilliance greeted with indifference. Disney's stumble is the inversion of Carmen's fate, a proven property that opened weak, a reminder that neither novelty nor familiarity guarantees the audience will come.",
        "excerpt": "L'amour est un oiseau rebelle Que nul ne peut apprivoiser, Et c'est bien en vain qu'on l'appelle, S'il lui convient de refuser.",
        "source": "Georges Bizet, Carmen, opera in four acts, libretto by Henri Meilhac and Ludovic Halevy (1875); full score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Carmen_(Bizet,_Georges)"
      },
      {
        "category": "artistic",
        "title": "Bruegel's Tower of Babel rises in tier upon spiraling tier, a construction of impossible ambition already cracking under its own weight, its builders dwarfed by a monument that can never be finished. It is the enduring image of the over-reaching project doomed by hubris, magnificence collapsing into confusion. A studio piling remake upon remake toward some ever-higher peak of spectacle inhabits the same doomed scaffold, grandeur that overreaches and comes to nothing.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "Genesis 11:4 (King James Version), depicted in Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/disney-moana-box-office-disappoints--a6.png",
          "alt": "Pieter Bruegel the Elder's oil painting of the Tower of Babel, an immense spiraling tiered tower under construction, partly ruined, dwarfing the surrounding city and harbour.",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "south-africa-deports-foreigners",
    "headline": "South Africa says more than 53,000 foreigners have been deported in a stepped-up migration campaign",
    "overview": "South Africa said that 53,449 foreign nationals had been deported or repatriated over roughly five weeks, one of its biggest crackdowns on undocumented migrants in years, Justice Minister Mmamoloko Kubayi announced. The removals, dominated by Malawians, Zimbabweans and Mozambicans, follow weeks of anti-immigration protests marked by violence, intimidation and looting, with demonstrators demanding tighter borders and mass deportations. Authorities warned protesters against conducting unauthorised searches of homes and businesses suspected of sheltering migrants, in a country with a long history of anti-migrant violence.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-12/south-africa-says-53-449-migrants-returned-or-deported-in-crackdown"
      },
      {
        "name": "Daily Dispatch",
        "href": "https://www.dailydispatch.co.za/news/2026-07-12-over-53000-foreigners-deported-or-repatriated-in-less-than-a-month/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/south-africa-deports-foreigners.png",
      "alt": "The South African national flag displayed at an unveiling ceremony.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1492 Ferdinand and Isabella cast an entire people out of Spain, giving the Jews four months to sell their homes and leave on pain of death. The Alhambra Decree is the archetype of the state-ordered expulsion: an unwanted minority blamed for a society's ills and told to 'depart and never to return.' South Africa's sweeping removal of tens of thousands of foreign nationals amid xenophobic protest echoes the same logic of purging a scapegoated group to 'remedy' the troubles of the realm.",
        "excerpt": "resolve to order the said Jews and Jewesses of our kingdoms to depart and never to return or come back to them or to any of them ... they depart from all of these our said realms and lordships, along with their sons and daughters, menservants and maidservants.",
        "source": "Edict of Expulsion of the Jews (the Alhambra Decree), issued by Ferdinand II of Aragon and Isabella I of Castile, Granada, 31 March 1492; English translation, Florida Atlantic University.",
        "href": "https://www.fau.edu/artsandletters/pjhr/chhre/pdf/hh-alhambra-1492-english.pdf"
      },
      {
        "category": "historical",
        "title": "After the Greco-Turkish war, the 1923 Lausanne Convention did something modern states had rarely dared: it made the uprooting of populations legal and compulsory, forcibly exchanging roughly two million Orthodox Christians and Muslims across the Aegean by religion alone. Framed as an orderly solution, it condemned families to become strangers in lands they had never seen. It stands as the twentieth century's template for turning mass expulsion into official policy, a warning that resonates in South Africa's stepped-up campaign of deportation and repatriation.",
        "excerpt": "As from the 1st May, 1923, there shall take place a compulsory exchange of Turkish nationals of the Greek Orthodox religion established in Turkish territory, and of Greek nationals of the Muslim religion established in Greek territory. These persons shall not return to live in Turkey or Greece respectively without the authorization of the Turkish Government or of the Greek Government respectively.",
        "source": "Convention Concerning the Exchange of Greek and Turkish Populations, signed at Lausanne, 30 January 1923, Article 1.",
        "href": "https://en.wikisource.org/wiki/Convention_Concerning_the_Exchange_of_Greek_and_Turkish_Populations"
      },
      {
        "category": "literary",
        "title": "No text has given displacement a more enduring voice than Psalm 137, the lament of Judeans deported to Babylon after Jerusalem's fall, weeping for a homeland they may never see again. It captures the inner cost of forced migration: the grief, the memory, and the impossible demand to sing while in captivity. In it the deported foreigners of any age, hustled to the borders of a country that no longer wants them, find their oldest elegy.",
        "excerpt": "By the rivers of Babylon, there we sat down, yea, we wept, when we remembered Zion. We hanged our harps upon the willows in the midst thereof. For there they that carried us away captive required of us a song; and they that wasted us required of us mirth, saying, Sing us one of the songs of Zion. How shall we sing the LORD's song in a strange land?",
        "source": "Psalm 137:1-4, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "In the play Sir Thomas More, a speech widely attributed to Shakespeare confronts a London mob rioting to drive out foreign migrants. More turns the crowd's fury back on itself, asking them to imagine themselves as the hunted refugees and to see xenophobia as a self-devouring cruelty. Written more than four centuries ago, it reads as a direct rebuke to the anti-immigrant violence and looting that has accompanied South Africa's expulsions.",
        "excerpt": "Imagine that you see the wretched strangers, / Their babies at their backs and their poor luggage, / Plodding to the ports and coasts for transportation ... This is the strangers' case; / And this your mountainish inhumanity.",
        "source": "William Shakespeare (attrib.), the 'Strangers' Case' addition to The Book of Sir Thomas More, c. 1603; text via the Folger Shakespeare Library.",
        "href": "https://www.folger.edu/blogs/shakespeare-and-beyond/the-strangers-case/"
      },
      {
        "category": "artistic",
        "title": "Verdi's chorus of Hebrew slaves, exiled by the waters of Babylon, sings its thoughts homeward on golden wings to the lost hills of the fatherland. First heard in 1842, 'Va, pensiero' became the anthem of every uprooted and homesick people, an aching hymn of longing sung by the driven-out. Its yearning for a 'suolo natal' - a native soil now out of reach - gives melody to the plight of the tens of thousands expelled from South Africa.",
        "excerpt": "Va, pensiero, sull'ali dorate; va, ti posa sui clivi, sui colli, ove olezzano tepide e molli l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, 'Va, pensiero' (Chorus of the Hebrew Slaves), from Nabucco (1842), Act III; libretto by Temistocle Solera.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      },
      {
        "category": "artistic",
        "title": "Eduard Bendemann's large canvas shows Judean captives slumped in mourning beneath the willows of Babylon, harps set aside, a whole community frozen in the numbness of exile. Painted around 1832, it made the image of a people driven from their land into one of the nineteenth century's defining pictures of displacement. Its silent, huddled figures - the very picture of the stranger cast out - mirror the crowds now repatriated across South Africa's borders.",
        "excerpt": "A defeated people sits in exile by the rivers of Babylon: elders bow their heads, a mother clutches her child, and a silent harp hangs unused on the branches above them. The painting renders forced migration not as a single act of violence but as a lasting condition of grief, memory, and longing for a homeland placed forever out of reach.",
        "source": "Eduard Bendemann, Die trauernden Juden im Exil (The Mourning Jews in Exile), c. 1832, oil on canvas, Wallraf-Richartz Museum, Cologne.",
        "href": "https://commons.wikimedia.org/wiki/File:Eduard_Bendemann-_Die_trauernden_Juden_im_Exil_um_1832.jpg",
        "image": {
          "src": "/covers/south-africa-deports-foreigners--a6.png",
          "alt": "Painting of Judean captives mourning in exile by the rivers of Babylon, seated beneath willow trees with a harp hanging on a branch.",
          "credit": "Eduard Bendemann, Die trauernden Juden im Exil (c. 1832), Wallraf-Richartz Museum, Cologne. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "bangkok-pub-fire",
    "headline": "Fire at a Bangkok pub kills at least 27 people and critically injures more than 20, Thai officials say",
    "overview": "A fast-moving fire tore through the Na Ladprao pub in northern Bangkok early on July 13, 2026, killing at least 27 people and critically injuring more than 20 before firefighters brought the blaze under control in about half an hour. Prime Minister Anutin Charnvirakul, who went to the scene, said a performer had reported smoke from a circuit breaker near the stage followed by an explosion and thick smoke that quickly filled the venue. The cause of the fire is under investigation.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNcU5scGJEQ180c2NSNHpsckgwa09pYlMzN0NCWkpLQ3Y1OERrNFJZTGlZWkIwM2R0by1JamVsS3FxcTZfMkFia3hCMzYyNm9tbzhLLUxEU2RnYnpEVkVDcjVwNHpPNHEzdmZqWkJGRFd2TkU1dUdsRndxVGRCSjhBTWNmV0ZuejRkbXNsUmFndmZLNkhGVGhDYlZuQVRqbVZGQXFtN3pXTQ?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/12/asia/bangkok-deadly-fire-pub-latam-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-13",
    "image": {
      "src": "/covers/bangkok-pub-fire.png",
      "alt": "A fire engine with emergency lights parked on a city street at night.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Morning Edition · 13 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When flames raced through the Na Ladprao pub, they found the same allies fire has always exploited in a packed room: crowding, confusion, and a single choked path to the door. Nearly two thousand years earlier, Tacitus described how the great fire of Rome in AD 64 began among goods that burned easily and, driven by the wind, outran every attempt to stop it. His account of a conflagration that gathered strength in an instant is the oldest template for a modern catastrophe in which the blaze moves faster than the people can flee.",
        "excerpt": "It took its rise in the part of the Circus touching the Palatine and Caelian Hills; where, among the shops packed with inflammable goods, the conflagration broke out, gathered strength in the same moment, and, impelled by the wind, swept the full length of the Circus.",
        "source": "Tacitus, Annals, Book XV, ch. 38 (trans. John Jackson, Loeb Classical Library, 1937), on the Great Fire of Rome, AD 64. Text at LacusCurtius (Bill Thayer, University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Tacitus/Annals/15B*.html"
      },
      {
        "category": "historical",
        "title": "Sixteen centuries after Rome and a world away from Bangkok, Samuel Pepys stood on the Thames and watched the Great Fire of London devour the city in September 1666. His diary catches the human panic of a fire nobody can outrun: people clinging to their homes until the flames touched them, then scrambling for boats, and even the pigeons too loath to leave until their wings burned. It is the same terror the Na Ladprao survivors describe, of smoke and fire closing off every exit at once.",
        "excerpt": "Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that lay off; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for Sunday 2 September 1666 (the Great Fire of London). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September"
      },
      {
        "category": "literary",
        "title": "The oldest literary image of a crowded place turned to fire is a city, not a nightclub, yet the horror rhymes exactly. In Book II of the Aeneid, Aeneas watches Troy consumed in a single night, the flames rolling over roofs like a harvest ablaze or a flood whelming the fields, one great house after another catching light. Virgil's blaze that fills a whole hall with a roar and answering glow reads like a witness account of the Bangkok pub, where an explosion and thick smoke swallowed the room before anyone could reach the stage door.",
        "excerpt": "'t was like an harvest burning, when wild winds uprouse the flames; 't was like a mountain stream that bursts in flood and ruinously whelms sweet fields and farms and all the ploughman's toil, whirling whole groves along... Deiphobus' great house sank vanquished in the fire. Ucalegon's hard by was blazing, while the waters wide around Sigeum gave an answering glow.",
        "source": "Virgil, The Aeneid, Book II, ll. 298-317 (trans. Theodore C. Williams, 1910). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0054:book=2:card=298"
      },
      {
        "category": "literary",
        "title": "Charlotte Bronte gave English fiction its most famous burning hall in Jane Eyre, where Thornfield is reduced to ruin in a single night. An innkeeper's plain report of a fire breaking out in the dark, engulfing the whole building before help could arrive, is the exact shape of the Na Ladprao disaster: a place of shelter and gathering that becomes, within minutes, one mass of flame. The terror lies in how little time there is between the first sign of smoke and the moment the roof is lost.",
        "excerpt": "The fire broke out at dead of night, and before the engines arrived from Millcote, the building was one mass of flame. It was a terrible spectacle: I witnessed it myself.",
        "source": "Charlotte Bronte, Jane Eyre (1847), Chapter XXXVI. Wikisource (Page:Jane Eyre.djvu/363).",
        "href": "https://en.wikisource.org/wiki/Page:Jane_Eyre.djvu/363"
      },
      {
        "category": "artistic",
        "title": "Wagner ended his four-opera Ring cycle with the ultimate conflagration of a hall: Brunnhilde rides her horse into Siegfried's funeral pyre and the flames rise until they seize Valhalla itself, the towering home of the gods, and burn it to nothing. The Immolation Scene turns fire into a wall of orchestral sound that fills the whole theatre, an apt music for a night when the Bangkok pub's own stage became the center of the blaze. In Wagner as in Bangkok, a place built for gathering and spectacle is where the fire takes hold.",
        "excerpt": "Fliegt heim, ihr Raben! Raunt es eurem Herren, was hier am Rhein ihr gehort!... So werf' ich den Brand in Walhalls prangende Burg.",
        "source": "Richard Wagner, Gotterdammerung (Twilight of the Gods), WWV 86D (1876), Act III, Scene 3, 'Brunnhilde's Immolation Scene.' Full score at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "On the night of 16 October 1834 the Houses of Parliament caught fire and burned before a crowd of thousands, and J. M. W. Turner painted the spectacle as a towering sheet of orange flame doubling in the black water of the Thames. His canvas captures exactly what makes a great fire so terrible and so mesmerising: the way a landmark of ordinary public life becomes, in hours, an inferno that dwarfs the tiny figures watching. It is the visual counterpart to the Na Ladprao fire, a familiar place of assembly transformed into a wall of fire and smoke.",
        "excerpt": "Turner shows the night sky and river alike drowned in a furnace glow, the stone facade of Parliament dissolving into flame while smoke boils upward and a helpless crowd lines the bridge. The fire is the true subject, vast and unstoppable, reducing a great public building to a silhouette against its own destruction.",
        "source": "Joseph Mallord William Turner, The Burning of the Houses of Lords and Commons, 16th October, 1834, oil on canvas, 1834-35. Philadelphia Museum of Art (John Howard McFadden Collection, 1928). Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Turner-The_Burning_of_the_Houses_of_Lords_and_Commons.jpg",
        "image": {
          "src": "/covers/bangkok-pub-fire--a6.png",
          "alt": "J. M. W. Turner's painting of the 1834 fire at the Houses of Parliament: a huge blaze of orange and yellow flame engulfs the buildings on the Thames, its light reflected in the water as tiny spectators watch from a bridge.",
          "credit": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, 16th October, 1834' (1834-35), Philadelphia Museum of Art (John Howard McFadden Collection). Public domain, via Wikimedia Commons."
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
