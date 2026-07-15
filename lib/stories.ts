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
    "slug": "iran-halt-mideast-energy-exports",
    "headline": "Iran's Revolutionary Guard threatens to halt all Middle East energy exports after the U.S. reimposes its naval blockade of Iranian ports",
    "overview": "Iran's paramilitary Revolutionary Guard threatened to stop all oil and gas exports from the Middle East after the United States reimposed a naval blockade of Iranian ports over Tehran's attacks on shipping in the Strait of Hormuz, declaring the region's energy trade would be 'for everyone or for no one.' The blockade, first imposed in mid-April and lifted in mid-June under a 60-day interim deal, was restored early Wednesday as talks over Iran's nuclear program stalled and both sides fought for control of the strait, through which about a fifth of the world's oil and gas passes. Iran also warned it could block additional waterways as retaliatory strikes spread across the region.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOc0ZjN3ZmUVdvbVVLMXFrejJubVRQczZPdVF0QkVwQ3B4SkdNWERtQU5Na0NFWGdrZ0pjU0w1MC05SjhpOHRRVDRZY2lDQkFnRERXWGR6QmlIcV9LaDBQcFdhTThxejdyUDFVbDNBZVlfR0I1Vmg1U19HWERQbnBqUFJJSmpoM2w5VDNacHA4RWZSalpUQ0xwTEpKazJMeGM?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQUFEyN1NxTHNCaG5RT2lOTWY4WWxWd1JQUGpLdV8wY3J0RVp3RmZaN21hcm9YX1A1TWdYc3RMU3BKNV9rd0tqdnM4SEpmamFRLXJIU1NvdnhUYlo5WDFnb2dPY2JfZU5HXzBMR184ei1kSS1zeUthWmltb1VzZWhOR0lCX2FlR0NXSGUxY0gxbVJTVkw2RFo5NnZSVXFhcGYxOUhOS1BJU2gza3VYY3VHT2JEWVV2VHdCdDdmeTRyOElucVF4Mk9r?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/iran-halt-mideast-energy-exports.png",
      "alt": "A large liquefied-natural-gas carrier under way at sea.",
      "credit": "LNG carrier; public domain, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 405 BC, near the end of the long Peloponnesian War, the Spartan admiral Lysander led his fleet to the Hellespont, the narrow strait through which grain ships from the Black Sea fed hungry Athens. There, at Aegospotami, he destroyed the Athenian navy in a single stroke, then closed the waterway and blockaded the Piraeus, choking off the food supply of a city that could not feed itself. The historian Xenophon records how Athens, 'besieged by land and sea,' with 'without ships, without allies, without provisions,' was starved into unconditional surrender within months. It is the classic demonstration that whoever holds a maritime chokepoint holds the life of everyone downstream. The parallel to the Strait of Hormuz is exact: Iran's Revolutionary Guard, like Lysander, grasps that control of a narrow passage is control of an economy, and that a blockade is coercion by other means. Xenophon even underlines the grim reciprocity Iran now invokes with 'for everyone or for no one' — the Athenians, he says, had to 'suffer what they had themselves inflicted upon others.'",
        "excerpt": "Now Lysander, leaving Rhodes, and coasting along Ionia, made his way to the Hellespont, having an eye to the passage of vessels through the Straits, and, in a more hostile sense, on the cities which had revolted from Sparta. […] The Athenians, finding themselves besieged by land and sea, were in sore perplexity what to do. Without ships, without allies, without provisions, the belief gained hold upon them that there was no way of escape. They must now, in their turn, suffer what they had themselves inflicted upon others; not in retaliation, indeed, for ills received, but out of sheer insolence, overriding the citizens of petty states, and for no better reason than that these were allies of the very men now at their gates.",
        "source": "Xenophon, Hellenica, Book II, trans. H. G. Dakyns; Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/1174",
        "image": {
          "src": "/covers/iran-halt-mideast-energy-exports--a0.png",
          "alt": "Engraving of the Spartan general Lysander overseeing the demolition of the Long Walls of Athens after the city's surrender in 404 BC.",
          "credit": "Illustration of Lysander ordering the demolition of the walls of Athens, 404 BC; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In 1609 the young Dutch jurist Hugo Grotius published Mare Liberum ('The Free Sea'), a slim anonymous treatise defending the right of Dutch merchants to sail and trade in the East Indies against Portuguese claims to monopolize the ocean routes. From it grew the doctrine of the freedom of the seas that still underpins international law: the sea belongs to no one and to everyone, and no state may bar another's ships from lawful passage and commerce. Grotius argued that navigation is 'free to all persons whatsoever' and that the ocean, being boundless, cannot be made anyone's private possession. That principle is precisely what a naval blockade of the Strait of Hormuz — and Iran's threat to shut the waterway to all comers — puts in the balance. When the Revolutionary Guard declares the region's energy trade will be 'for everyone or for no one,' it inverts Grotius: the sea becomes a weapon of exclusion rather than a common highway. The four-century-old debate over who may close a strait, and by what right, is the legal ghost haunting the current crisis.",
        "excerpt": "My intention is to demonstrate briefly and clearly that the Dutch — that is to say, the subjects of the United Netherlands — have the right to sail to the East Indies, as they are now doing, and to engage in trade with the people there. I shall base my argument on the following most specific and unimpeachable axiom of the Law of Nations, called a primary rule or first principle, the spirit of which is self-evident and immutable, to wit: Every nation is free to travel to every other nation, and to trade with it. […] For the same reasons the sea is common to all, because it is so limitless that it cannot become a possession of any one, and because it is adapted for the use of all, whether we consider it from the point of view of navigation or of fisheries.",
        "source": "Hugo Grotius, The Freedom of the Seas (Mare Liberum, 1609), trans. Ralph Van Deman Magoffin, ed. James Brown Scott (New York: Oxford University Press, 1916); Internet Archive.",
        "href": "https://archive.org/details/freedomofseasorr1916grot",
        "image": {
          "src": "/covers/iran-halt-mideast-energy-exports--a1.png",
          "alt": "Painted portrait of the Dutch jurist Hugo Grotius in a black doublet with a white ruff collar.",
          "credit": "Michiel Jansz. van Mierevelt, portrait of Hugo Grotius; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book XII of Homer's Odyssey, the sorceress Circe warns Odysseus that his route home runs through a deadly strait guarded on one side by the six-headed monster Scylla and on the other by the whirlpool Charybdis, which three times a day sucks down the sea and vomits it back. There is no way around; the ship must thread the narrows, and Circe counsels that it is better to lose six men to Scylla than the whole crew to the whirlpool. The passage is antiquity's great image of the unavoidable chokepoint — a slender channel of water through which everything must pass and where a single hostile force can exact a terrible toll. The Strait of Hormuz is the modern Scylla and Charybdis: roughly a fifth of the world's oil and gas must squeeze through a passage only a few miles wide, hemmed by hostile shores, where tankers now sail 'in great fear of mind.' Iran's threat to close it, and the U.S. blockade meant to counter it, turn Homer's fable of the perilous strait into a question of global energy security. The whole world, like Odysseus, is forced to run the narrows and pray it loses only six men.",
        "excerpt": "Then we entered the Straits in great fear of mind, for on the one hand was Scylla, and on the other dread Charybdis kept sucking up the salt water. As she vomited it up, it was like the water in a cauldron when it is boiling over upon a great fire, and the spray reached the top of the rocks on either side. When she began to suck again, we could see the water all inside whirling round and round, and it made a deafening sound as it broke against the rocks. We could see the bottom of the whirlpool all black with sand and mud, and the men were at their wits ends for fear.",
        "source": "Homer, The Odyssey, Book XII, trans. Samuel Butler (1900); Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/1727",
        "image": {
          "src": "/covers/iran-halt-mideast-energy-exports--a2.png",
          "alt": "Henry Fuseli's dramatic painting of Odysseus at the ship's prow between the monster Scylla and the whirlpool Charybdis.",
          "credit": "Henry Fuseli (Johann Heinrich Füssli), 'Odysseus in Front of Scylla and Charybdis,' 1794–96; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the sixth chapter of the Book of Revelation, the last book of the Christian New Testament, the Lamb opens the seven seals and looses the Four Horsemen upon the earth. The third, riding a black horse, carries 'a pair of balances' — a merchant's scales — and a voice cries out the wartime price of bread: a whole day's wage for a single measure of wheat, while the command rings out to 'hurt not the oil and the wine.' It is scripture's vision of famine and rationing as instruments of dread — the deliberate manipulation of who may buy grain, and of the flow of oil, as a lever of power over multitudes. The image reads with uncanny force against a threat to halt all Middle East energy exports and choke off a fifth of the world's oil. Here the horseman weighs out scarcity with cold precision, sparing the oil for now but holding it hostage, and the whole market trembles at the price. That a two-thousand-year-old apocalypse should name 'the oil' among the commodities rationed by conflict makes it an eerie mirror for a crisis in which crude itself has become the weapon and the stakes.",
        "excerpt": "And when he had opened the third seal, I heard the third beast say, Come and see. And I beheld, and lo a black horse; and he that sat on him had a pair of balances in his hand. And I heard a voice in the midst of the four beasts say, A measure of wheat for a penny, and three measures of barley for a penny; and see thou hurt not the oil and the wine.",
        "source": "Revelation 6:5–6, King James Version (1611); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Revelation",
        "image": {
          "src": "/covers/iran-halt-mideast-energy-exports--a3.png",
          "alt": "Albrecht Dürer's woodcut of the Four Horsemen of the Apocalypse charging forward, one of them holding a merchant's scales.",
          "credit": "Albrecht Dürer, 'The Four Horsemen of the Apocalypse,' 1498 woodcut; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The German history painter Wilhelm von Kaulbach completed his monumental canvas of the naval Battle of Salamis in 1868 for the Maximilianeum in Munich. It depicts the moment in 480 BC when the outnumbered Greek fleet lured the vast armada of the Persian king Xerxes into the narrow strait between Salamis and the mainland, where the empire's superior numbers became a fatal liability and the ships were smashed against one another in the crush. Kaulbach fills the scene with churning water, splintered hulls and drowning warriors, while a serene Greek victory presides over the chaos — a study in how a great power's overreach founders in a confined channel. The painting speaks directly to the Strait of Hormuz, where the world's mightiest navy and Iran's asymmetric forces contest a passage too narrow for overwhelming force to move freely. Salamis is the archetype of the strait as decisive theatre, the place where empires are checked not by open-sea supremacy but by the geography of the narrows. In both cases the lesson is the same: in a chokepoint, size guarantees nothing.",
        "excerpt": "Kaulbach's vast painting turns the strait of Salamis into a maelstrom of shattered oars, capsizing triremes and figures flung into the foaming sea, the Persian host trapped and destroyed in water too tight for its numbers. Above the carnage he sets allegorical figures of Greek victory and Persian despair, so the canvas reads at once as reportage and as a moral drama about hubris broken upon a narrow channel. It is a nineteenth-century meditation on an ancient truth that a chokepoint can swallow a superpower's advantage whole.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Sea Battle at Salamis), 1868, Maximilianeum, Munich; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/iran-halt-mideast-energy-exports--a4.png",
          "alt": "Wilhelm von Kaulbach's large 1868 painting of the Battle of Salamis, showing Greek and Persian ships colliding in a narrow strait amid drowning warriors.",
          "credit": "Wilhelm von Kaulbach, 'Die Seeschlacht bei Salamis,' 1868, Maximilianeum, Munich; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "'Rule, Britannia!' began as the closing number of the masque Alfred, with music by Thomas Arne and words by the poet James Thomson, first performed in 1740 for Frederick, Prince of Wales. Its swelling refrain — 'Rule, Britannia! rule the waves' — became the anthem of a maritime empire, and its verses make the argument plainly: command of the sea is command of the world's commerce, for 'thy cities shall with commerce shine' and 'all thine shall be the subject main.' The song is the sound of a naval power asserting the right to dominate the sea-lanes and, through them, the trade of nations — the strong dictating to the weak who may pass and prosper. That is exactly the logic now colliding in the Strait of Hormuz, where a blockade and a threatened counter-blockade each claim mastery of a waterway on which the world depends. Heard against Iran's warning that the region's energy will flow 'for everyone or for no one,' the anthem's confident promise of a 'subject main' exposes the age-old contest over who rules the waves — and who is ruled by whoever does.",
        "excerpt": "When Britain first, at Heaven's command,\nArose from out the azure main;\nThis was the charter of the land,\nAnd guardian angels sung this strain:\nRule, Britannia! rule the waves:\nBritons never will be slaves.\n[…]\nTo thee belongs the rural reign;\nThy cities shall with commerce shine:\nAll thine shall be the subject main,\nAnd every shore it circles thine.\nRule, Britannia! rule the waves:\nBritons never will be slaves.",
        "source": "James Thomson, 'Rule, Britannia!', from the masque Alfred (music by Thomas Arne), 1740; The Works of James Thomson, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_James_Thomson/Rule,_Britannia!",
        "image": {
          "src": "/covers/iran-halt-mideast-energy-exports--a5.png",
          "alt": "Engraved portrait of the eighteenth-century English composer Thomas Augustine Arne, who set 'Rule, Britannia!' to music.",
          "credit": "Robert Dunkarton, engraved portrait of the composer Thomas Augustine Arne; public domain, via Wikimedia Commons."
        }
      }
    ],
    "lead": true,
    "rank": 1
  },
  {
    "slug": "china-q2-gdp-cools-2026",
    "headline": "China's economy grows just 4.3% in the second quarter, its slowest pace since 2022, missing forecasts",
    "overview": "China's gross domestic product expanded 4.3% in the April-June quarter from a year earlier, its weakest showing since the end of 2022 and below the 4.5% economists had forecast, as weak consumer demand and the oil shock from the Iran war offset robust factory output and AI-driven exports. Fixed-asset investment fell 5.7% in the first half of the year and property investment dropped 18%, while retail sales rose only 1.0% in June, underscoring an economy increasingly reliant on manufacturing for foreign markets. The figures intensify pressure on Beijing to shore up domestic consumption.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNUXcxSUg1T2RHY1dUVkFETk5ic3hjNnh6eTNKV2Y2M1lvVXh1LTRKUEE2blRYVnVKVkxXWVpSdGg0Q08wTkdSY25aNC1HMGtRUkl1bFIxSGVYb3hJT0dPc1pmNmN6Rl9ROU5xQkJaR0l5YUV0eDl3dW1CbTIxWjBpNjZYZ1Z2alJpRDZPTmktU3NnWW5ETjhMeG5GcDVYRnFMekV5dHR3?oc=5"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cd959x4edy8o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/china-q2-gdp-cools-2026.png",
      "alt": "The skyscrapers of Shanghai's Pudong financial district seen across the water.",
      "credit": "Pudong skyline, Shanghai; photo by Ermell, CC0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Edward Gibbon completed his monumental History of the Decline and Fall of the Roman Empire between 1776 and 1788, tracing how the largest and most productive economy of the ancient world lost its momentum. In his famous 'General Observations on the Fall of the Roman Empire in the West,' Gibbon argued that Rome's collapse was not a sudden accident but the slow working-out of its own success: the very scale of its conquests and the prosperity they bred quietly rotted the supports beneath it. An empire that had grown rich on expansion found its citizens dependent, its productive base hollowed, and its greatness converted into fragility. That diagnosis rhymes with the anxiety behind China's cooling to 4.3% growth, its weakest since 2022, an economy that soared on decades of construction and export and now confronts falling investment, an 18% drop in property, and consumers who will not spend. Gibbon's warning is that 'immoderate greatness' can ripen into decay, that a stupendous fabric can begin to yield to the pressure of its own weight even while it still looks colossal. The slowdown is not ruin, but it raises the same structural question Gibbon posed: whether a great power's growth model can outlast the conditions that created it.",
        "excerpt": "The decline of Rome was the natural and inevitable effect of immoderate greatness. Prosperity ripened the principle of decay; the causes of destruction multiplied with the extent of conquest; and as soon as time or accident had removed the artificial supports, the stupendous fabric yielded to the pressure of its own weight.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire, 'General Observations on the Fall of the Roman Empire in the West' (1776-1788); Christian Classics Ethereal Library.",
        "href": "https://www.ccel.org/g/gibbon/decline/volume1/chap39.htm",
        "image": {
          "src": "/covers/china-q2-gdp-cools-2026--a0.png",
          "alt": "Portrait of the historian Edward Gibbon.",
          "credit": "Henry Walton, Portrait of Edward Gibbon, c. 1773, National Portrait Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the sixteenth and seventeenth centuries Habsburg Spain was the richest and most powerful state in Europe, gorged on the silver of the New World that poured out of mountains like the Cerro Rico of Potosi. Yet the treasure produced a hollow prosperity: prices soared, domestic industry withered, and the bullion flowed straight through Spanish hands to pay for imports and foreign wars, leaving the crown perpetually bankrupt. Writing in 1776, the economist Adam Smith took Spain and Portugal as the great cautionary tale of the mercantile age, noting that the two nations that owned the mines were, paradoxically, among the most beggarly countries in Europe. His point was that a nation's real wealth lies not in a glittering headline number or a favorable trade surplus but in the productive industry and broad-based demand of its own people. That is precisely the imbalance now troubling China: robust factory output and AI-driven exports mask fixed-asset investment down 5.7%, retail sales creeping up just 1.0%, and an economy leaning ever harder on selling to foreigners. Smith's Spain warns that export riches and impressive output can coexist with a domestic economy that fails to enrich its own households. The lesson is that prosperity measured only by what leaves the docks can leave the country itself surprisingly poor.",
        "excerpt": "Have the exorbitant profits of the merchants of Cadiz and Lisbon augmented the capital of Spain and Portugal? Have they alleviated the poverty, have they promoted the industry of those two beggarly countries?",
        "source": "Adam Smith, An Inquiry into the Nature and Causes of the Wealth of Nations, Book IV, Chapter VII (1776); Marxists Internet Archive.",
        "href": "https://www.marxists.org/reference/archive/smith-adam/works/wealth-of-nations/book04/ch07c.htm",
        "image": {
          "src": "/covers/china-q2-gdp-cools-2026--a1.png",
          "alt": "Sixteenth-century woodcut of the Cerro Rico silver mountain at Potosi.",
          "credit": "Pedro Cieza de Leon, view of the Cerro Rico de Potosi, woodcut from Cronica del Peru, 1553; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley wrote the sonnet 'Ozymandias' in 1817, published in Leigh Hunt's Examiner in January 1818, after news of a colossal fragment of a statue of Ramesses II being shipped to the British Museum. In fourteen lines a traveller describes two vast and trunkless legs of stone and a shattered face half-sunk in the desert, all that remains of a king who once commanded the mightiest empire on earth. On the pedestal survives his boast, 'Look on my Works ye Mighty, and despair!' — a command now mocked by the boundless, level sands that stretch away around the wreck. The poem is the definitive short meditation on the transience of power and the vanity of monuments that once seemed permanent. It speaks to a China whose skylines of towers and record output can read like the works of Ozymandias, even as property investment falls 18% and half-finished projects testify to overbuilding. Shelley's warning is not that greatness is fake but that it is perishable, and that inscriptions boasting of endless prosperity are written on stone that time and sand will humble. The sonnet asks any confident power to consider how much of its splendor is durable substance and how much is a colossal wreck waiting to be revealed.",
        "excerpt": "And on the pedestal these words appear:\nMy name is Ozymandias, King of Kings,\nLook on my Works ye Mighty, and despair!\nNothing beside remains. Round the decay\nOf that colossal Wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818); text via Representative Poetry Online, University of Toronto Libraries.",
        "href": "https://rpo.library.utoronto.ca/content/ozymandias-0",
        "image": {
          "src": "/covers/china-q2-gdp-cools-2026--a2.png",
          "alt": "The colossal bust of Ramesses II, the 'Younger Memnon,' in the British Museum.",
          "credit": "Colossal bust of Ramesses II, the 'Younger Memnon,' c. 1250 BC, British Museum, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Oliver Goldsmith published 'The Deserted Village' in 1770, a long pastoral elegy mourning the depopulation of an idealized English village named Auburn, emptied of its people as wealth concentrated and rural life was hollowed out. Goldsmith wrote in a period of rapid economic change, and his lament was pointedly structural: he saw a country growing richer in the aggregate while its ordinary people declined, prosperity and human welfare pulling in opposite directions. The poem's most quoted couplet, that a land fares ill 'Where wealth accumulates, and men decay,' crystallizes the fear that a nation can post gains that never reach the people who make it work. That tension is exactly what unsettles China's 4.3% figure: strong manufacturing and export data set against weak consumer demand, tepid retail sales, and pressure on Beijing to shore up the household spending that a healthy economy requires. Goldsmith's insistence that 'a bold peasantry, their country's pride, When once destroy'd, can never be supplied' is a warning about neglecting the broad base of ordinary demand in favor of headline wealth. His village is an image of the imbalance economists now call the missing consumer. The elegy reminds us that growth which enriches the accounts while the population's own prosperity stalls is a fragile and joyless kind of success.",
        "excerpt": "Ill fares the land, to hastening ills a prey,\nWhere wealth accumulates, and men decay:\nPrinces and lords may flourish, or may fade;\nA breath can make them, as a breath has made:\nBut a bold peasantry, their country's pride,\nWhen once destroy'd, can never be supplied.",
        "source": "Oliver Goldsmith, The Deserted Village (1770); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/50500/50500-h/50500-h.htm",
        "image": {
          "src": "/covers/china-q2-gdp-cools-2026--a3.png",
          "alt": "Portrait of the poet Oliver Goldsmith by Joshua Reynolds.",
          "credit": "Joshua Reynolds, Portrait of Oliver Goldsmith, c. 1770; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Between 1833 and 1836 the American painter Thomas Cole created 'The Course of Empire,' a cycle of five canvases charting the rise and fall of an imagined civilization on a single landscape. The fourth and fifth paintings, 'Destruction' and 'Desolation,' show the great metropolis after its peak: in the final scene the marble city stands broken and abandoned, its columns colonized by weeds while a single heron nests atop a lone pillar at dusk. Cole conceived the series as a moral warning against the assumption that growth and grandeur are permanent, a caution that prosperity built to overreach can slide into decline. The images speak directly to fears surrounding China's slowdown to its weakest quarter since 2022, where a landscape of monumental construction now contends with collapsing property investment and questions about how much was overbuilt. Cole's ruined skyline is the pictorial equivalent of a stalled real-estate boom, splendor that outran the demand needed to sustain it. His cycle does not depict a single catastrophe but a rhythm, empire following the arc from wilderness to consummation to decay, and it invites a great power to ask where on that arc it stands. The quiet desolation of the last canvas is a meditation on how the works of the mighty, once emptied of the human life that filled them, become beautiful and melancholy husks.",
        "excerpt": "In Cole's final canvas the once-magnificent capital lies deserted at twilight, its triumphal architecture reduced to broken colonnades and vine-wrapped ruins mirrored in still water. A solitary column rises against a rose-colored sky, crowned by a bird's nest where crowds once thronged, and nature has begun patiently reclaiming the stones of a vanished prosperity. The painting turns the aftermath of overreaching ambition into a hushed, elegiac landscape in which no people remain to admire what they built.",
        "source": "Thomas Cole, The Course of Empire: Desolation, 1836, oil on canvas, New-York Historical Society; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Desolation_1836.jpg",
        "image": {
          "src": "/covers/china-q2-gdp-cools-2026--a4.png",
          "alt": "Thomas Cole's painting Desolation, showing the ruins of a great city at dusk.",
          "credit": "Thomas Cole, The Course of Empire: Desolation, 1836, New-York Historical Society; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder painted 'The Tower of Babel' around 1563, now in the Kunsthistorisches Museum in Vienna, depicting the biblical megaproject as an immense spiraling structure rising into the clouds above a Flemish port. Bruegel renders the tower with obsessive engineering detail, its ramps and arches teeming with tiny laborers and cranes, yet the building is subtly flawed and unfinished, its lower storeys already crumbling even as the upper ones climb ever higher. The painting is the great Western image of overbuilding and hubris: a monument of such ambition that its own scale and internal contradictions doom it before completion. That resonates with the property and construction excess behind China's cooling economy, where an 18% fall in property investment and years of frenzied building have left a landscape of unfinished and unneeded towers. Bruegel's Babel is a boom made visible, a vast fixed-asset project whose momentum outran any coherent purpose or demand. The story it illustrates ends not with collapse by war but with confusion and abandonment, the workers dispersing when the shared enterprise loses its meaning. As an emblem of construction pursued for its own sake until it cannot be sustained, it captures the structural imbalance economists now urge Beijing to correct.",
        "excerpt": "Bruegel's colossal tower spirals upward through drifting clouds, its countless arches and ramps swarming with workers, hoists, and half-hewn stone. Even at its towering height the structure leans and its earliest levels already show cracks and decay, a monument whose ambition has plainly outstripped what its foundations can bear. Around it a busy harbor town goes about its trade, dwarfed by a project so vast that its very scale foretells the confusion and abandonment to come.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel, c. 1563, oil on panel, Kunsthistorisches Museum, Vienna; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/china-q2-gdp-cools-2026--a5.png",
          "alt": "Pieter Bruegel the Elder's painting The Tower of Babel.",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel, c. 1563, Kunsthistorisches Museum, Vienna; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "asml-raises-2026-forecast-ai",
    "headline": "ASML raises its 2026 revenue forecast to as much as 45 billion euros and plans to expand capacity 30% on AI chip demand",
    "overview": "ASML, the Dutch company that makes the extreme-ultraviolet lithography machines essential to advanced chipmaking, lifted its full-year 2026 revenue guidance to between 43 billion and 45 billion euros, up about 16% at the midpoint, and said it would expand manufacturing capacity by 30% in each of the next two years after AI demand drove second-quarter sales of 9.33 billion euros past expectations. Net income reached 2.92 billion euros and Chief Executive Christophe Fouquet cited 'extremely strong' order intake. It was the second time this year the firm raised its outlook, and its shares rose about 4%.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxPXzZLbXpRNUdRRjYtV203dG1SS1l6U29PMFZGelkzMVV3Mm1tSXI4ak90clF2Q0EwMW5sV1ptV2JURmVSRzYtMUZjenlvLWNuQklqZ2FDX1EzUWR1ZWI0bkZYcXVrbXNTZHdPZS1sNmthTlpOTHNpMkMxc1FfSUR1NEplT3l5Nk84Z3c?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/15/asml-2q-earnings-ai-chips-orders.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/asml-raises-2026-forecast-ai.png",
      "alt": "A 12-inch silicon wafer patterned with microchips, catching the light.",
      "credit": "A 12-inch silicon wafer; photo by Peellden, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When gold was discovered in California in 1848, the surest fortunes were made not by the prospectors clawing at the riverbeds but by the merchants who sold them what they could not do without. Levi Strauss, a Bavarian dry-goods trader in San Francisco, and his partner Jacob Davis grasped that a boom rewards whoever controls the one indispensable supply, and in 1873 they patented the copper-riveted work trouser that miners could not tear. Like ASML today, they never dug for the treasure themselves; they equipped everyone who did, and their patent gave them a defensible near-monopoly over a humble but essential tool. As AI is the gold rush of this decade, ASML's extreme-ultraviolet lithography machines are its riveted denim and its picks and shovels, the gear no serious digger can work without. The parallel even extends to protection: a patent then, an almost unrepeatable engineering moat now, guarding the supplier's grip while the frenzy rages. The picks-and-shovels merchant, it turns out, often outlasts the miners.",
        "excerpt": "My invention relates to a fastening for pocket-openings, whereby the sewed seams are prevented from ripping or starting from frequent pressure or strain thereon; and it consists in the employment of a metal rivet or eyelet at each edge of the pocket-opening, to prevent the ripping of the seam at those points.",
        "source": "Jacob W. Davis (assignor to Levi Strauss & Co.), U.S. Patent No. 139,121, \"Improvement in Fastening Pocket-Openings,\" issued May 20, 1873.",
        "href": "https://patents.google.com/patent/US139121A/en",
        "image": {
          "src": "/covers/asml-raises-2026-forecast-ai--a0.png",
          "alt": "Portrait photograph of Levi Strauss, San Francisco dry-goods merchant.",
          "credit": "Portrait of Levi Strauss, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "For centuries the Republic of Venice held Europe in thrall through a single mastered craft: the making of clear, brilliant glass. In 1291 the Venetian authorities confined the furnaces to the island of Murano, ostensibly against fire but in truth to guard the secret formulas that no rival could reproduce, and the state took the art under its protection, ringing it with laws, privileges, and prohibitions. The master glassmakers were pampered with rank yet forbidden on pain of death to carry their knowledge abroad, so precious was the monopoly they embodied. ASML occupies a strikingly similar position: a single company, in a single small country, holding a body of arcane know-how that the wider world cannot simply copy, and on which an entire luxury of civilization depends. Then it was mirrors and goblets; now it is the light that etches transistors. Both stories show how mastery of one obscure, guarded process can turn a modest place into the indispensable workshop of an age.",
        "excerpt": "The art of the glass-workers was taken under the protection of the Government in 1275, and regulated by a special code of laws and privileges; two fairs were held annually, and the export of all materials, such as alum and sand, which enter into the composition of glass was absolutely forbidden.",
        "source": "\"Murano,\" Encyclopædia Britannica, 11th ed. (1911), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Murano",
        "image": {
          "src": "/covers/asml-raises-2026-forecast-ai--a1.png",
          "alt": "A delicate Venetian glass chalice made in Murano, circa 1500-1550.",
          "credit": "Photo: Sailko, CC BY-SA 3.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book XVIII of the Iliad, the sea-goddess Thetis climbs to the bronze house of Hephaestus, the lame smith-god, to beg new armour for her son Achilles after his own was lost. No warrior, however great, can win without the work of this one incomparable craftsman, and Hephaestus alone can forge a shield so wondrous that all who see it are amazed. Homer devotes a long, rapturous passage to the making itself, the god throwing copper and tin and silver and gold into the fire and hammering the whole cosmos onto the metal. The scene captures a truth ASML embodies: the decisive power in an epic often lies with the maker of the indispensable instrument, not only with the hero who wields it. Achilles' glory is downstream of a craftsman's monopoly on a mastery no one else possesses. So too the chipmakers and AI titans of our moment depend, whether they like it or not, on the one workshop that can make their arms.",
        "excerpt": "Would that I could hide him from death's sight when his hour is come, so surely as I can find him armour that shall amaze the eyes of all who behold it.",
        "source": "Homer, The Iliad, Book XVIII (trans. Samuel Butler, 1898), Internet Classics Archive.",
        "href": "https://classics.mit.edu/Homer/iliad.18.xviii.html",
        "image": {
          "src": "/covers/asml-raises-2026-forecast-ai--a2.png",
          "alt": "Painting of Thetis receiving the newly forged armour for Achilles from Hephaestus.",
          "credit": "Anthony van Dyck, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the Book of Genesis, Joseph interprets Pharaoh's dream of seven fat years and seven lean, and is set over all Egypt to gather grain during the plenty. When famine strikes the whole region, Joseph alone controls the storehouses, and every nation must come to him to buy corn or starve. It is one of literature's oldest portraits of a chokepoint: whoever holds the single essential supply during a time of hunger commands the entire market and, with it, the fate of kingdoms. ASML's grip on extreme-ultraviolet lithography is a modern version of Joseph's granary, the one door through which everyone hungry for advanced chips must pass. The AI world's appetite is the famine; the Dutch storehouse is the only one stocked. The tale is a reminder that foresight and a monopoly on the necessary thing can quietly make one supplier the pivot of a whole civilization.",
        "excerpt": "And Joseph opened all the storehouses, and sold unto the Egyptians; and the famine waxed sore in the land of Egypt. And all countries came into Egypt to Joseph for to buy corn; because that the famine was so sore in all lands.",
        "source": "Genesis 41:56-57, King James Version.",
        "href": "https://biblehub.com/kjv/genesis/41.htm",
        "image": {
          "src": "/covers/asml-raises-2026-forecast-ai--a3.png",
          "alt": "Painting of Joseph distributing and selling grain to the people of Egypt during the famine.",
          "credit": "Bartholomeus Breenbergh, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Johannes Vermeer's The Astronomer, painted in Delft in 1668, shows a scholar in a pool of window light reaching toward a celestial globe, surrounded by the precision instruments of his craft. It is a Dutch image of quiet mastery, the nation's seventeenth-century genius for lenses, optics, maps, and exact measurement distilled into a single absorbed figure. That heritage is not incidental to ASML: the same low country that ground the finest lenses of the Golden Age now builds the most exacting optical machines on Earth, focusing extreme-ultraviolet light to etch features a few atoms wide. Vermeer's astronomer, bent in concentration over an arcane and beautiful apparatus, is a fitting emblem of a craft so refined that only a handful of hands in the world can perform it. The painting honours the invisible discipline behind the instrument, the patient obsession that separates the merely skilled from the truly indispensable. In both cases, Dutch precision becomes the lens through which an age tries to see further.",
        "excerpt": "A scholar in a golden-brown robe leans toward a celestial globe in soft window light, one hand resting on its surface as if to steady the turning heavens. Around him lie the tools of exact knowledge: an open astronomy book, an astrolabe, dividers, the quiet clutter of a mind devoted to measuring the invisible. Vermeer makes the instruments glow with the same reverence as the man, suggesting that mastery and its apparatus are inseparable.",
        "source": "Johannes Vermeer, The Astronomer (1668), oil on canvas, Musée du Louvre, Paris.",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010064324",
        "image": {
          "src": "/covers/asml-raises-2026-forecast-ai--a4.png",
          "alt": "Vermeer's painting of an astronomer reaching toward a celestial globe amid scientific instruments.",
          "credit": "Johannes Vermeer, public domain (Web Gallery of Art), via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "At the heart of Richard Wagner's opera Siegfried (1876), the third part of his Ring cycle, stands one of music's great scenes of craftsmanship: the young hero forges the sword Nothung at the anvil, singing his hammer-blows in time with the pounding orchestra. No one else has been able to reforge the shattered blade; the arcane skill and daring belong to Siegfried alone, and only with that one irreplaceable weapon can the drama's world-shaking deeds be done. Wagner turns the act of making the essential tool into thunderous, exhilarating music, the sparks and bellows rendered in brass and rhythm. The scene mirrors ASML's mystique precisely: the indispensable instrument of a coming age, wrought by a mastery almost no one else commands, without which the great feats simply cannot happen. The forge, not the battlefield, is where the future is actually decided. Wagner understood that whoever can make the sword holds the true, quiet power.",
        "excerpt": "Wagner sets a roaring orchestral forge beneath the tenor's voice, the anvil struck on the beat as fire, bellows, and hammer surge through the brass. The music swells with almost unbearable exhilaration as the fragments melt and the blade is reborn, mastery and machinery fused into a single sound. It is the sound of the one tool being made on which everything that follows depends.",
        "source": "Richard Wagner, Siegfried (WWV 86C), Act I forging scene (\"Schmiedelieder\"), first performed 1876; full score via IMSLP.",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)",
        "image": {
          "src": "/covers/asml-raises-2026-forecast-ai--a5.png",
          "alt": "Painting of Siegfried forging his sword at the smithy's fire.",
          "credit": "Ferdinand Leeke, \"Siegfried in der Schmiede\" (1900), public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "meta-ai-layoffs-lawsuit",
    "headline": "26 Meta employees sue, alleging the company used AI systems to target workers on medical and parental leave for layoffs",
    "overview": "Twenty-six Meta employees sued the company in federal court in Oakland, California, alleging it used internal artificial-intelligence tools, including a chatbot called 'Metamate,' keystroke- and activity-monitoring data, and algorithmic performance rankings, to select staff for layoffs in ways that disproportionately hit workers on medical, parental or family leave. The suit says such scores 'by design' cannot be earned by employees on protected leave, and claims violations of the Family and Medical Leave Act, the Americans with Disabilities Act and pregnancy-discrimination laws; the separations are set to begin July 22. Meta denied using AI to make the cuts, saying the decisions 'were and are made by people, not AI.'",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNRU9KU1hEeHRRaFdZQThmR0xFQXlORHNJOVcxb0NtTFJSWUZDVGhYUE8wMWhOeG9IVkVqYmkwRW1DODVIQlVqX3BpT1ZaQ3llNklUa0N6dHhVVWVrWkxpQ1lxQ2RXMEVhRTQ5Yk04bmNKV25wX2N0cUhJVFUwSzBfdWhPZmsyM0haaWlZTnRIRVFINUhPeHlzT2JzUl9MbUY0WkFWeUJDVQ?oc=5"
      },
      {
        "name": "Fox Business",
        "href": "https://www.foxbusiness.com/technology/meta-employees-sue-allegations-company-used-ai-target-workers-medical-parental-leave-layoffs"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/meta-ai-layoffs-lawsuit.png",
      "alt": "The Meta company sign outside its Menlo Park headquarters.",
      "credit": "Meta headquarters sign, Menlo Park; photo by Nokia621, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1911 the American engineer Frederick Winslow Taylor published 'The Principles of Scientific Management,' the founding gospel of measuring human labor. Stopwatch in hand, his disciples timed every motion a workman made, breaking skilled craft into quantified fragments that management alone controlled and dismissing the worker's own judgment as waste. Taylor openly declared that the individual must yield to the system, and taught that the ideal pig-iron handler should be so stupid he resembled an ox more than a thinking man, a person reduced to a measurable output. This is the direct ancestor of the productivity scores and activity monitoring at the heart of the Meta lawsuit: the same faith that a human being can be captured as a number, ranked, and optimized. Taylor watched the body; Metamate, keystroke logs and algorithmic rankings watch the keyboard, but the logic is identical, marking as inefficient and cutting away those whose measured output falls for whatever human reason. The plaintiffs' complaint that such a score, 'by design,' cannot be earned by an employee on protected leave is Taylorism's long shadow: a system that counts only what it can time, and cannot see the person who is absent.",
        "excerpt": "In the past the man has been first; in the future the system must be first.",
        "source": "Frederick Winslow Taylor, The Principles of Scientific Management (New York and London: Harper & Brothers, 1911).",
        "href": "https://www.gutenberg.org/cache/epub/6435/pg6435.html",
        "image": {
          "src": "/covers/meta-ai-layoffs-lawsuit--a0.png",
          "alt": "Portrait photograph of Frederick Winslow Taylor, founder of scientific management.",
          "credit": "Portrait of Frederick Winslow Taylor, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In 1086, twenty years after his conquest of England, William the Conqueror sent commissioners across his new kingdom to record everything and everyone in it, producing the vast survey later known as the Domesday Book. Contemporaries were both awed and appalled at its totality: every landholder, plough, mill and serf became an entry, a taxable value, a number set down in the king's writ, with no appeal against what was written. The very nickname 'Domesday' likened it to doomsday, the book of final judgment from which no one could escape. It stands as one of history's earliest and most complete acts of turning living people into data for the convenience of power. The Meta suit describes something uncannily similar: an all-seeing internal apparatus of chatbot, keystroke logs and algorithmic rankings that renders each worker as a quantified record and then judges them by it. Then as now, the vulnerable had no way to contest the figure written beside their name; the survey never asked how a person lived, only what they were worth.",
        "excerpt": "So very narrowly, indeed, did he commission them to trace it out, that there was not one single hide, nor a yard of land, nay, moreover (it is shameful to tell, though he thought it no shame to do it), not even an ox, nor a cow, nor a swine was there left, that was not set down in his writ.",
        "source": "The Anglo-Saxon Chronicle, entry for A.D. 1085 (on William I's Domesday survey), trans. Rev. James Ingram.",
        "href": "https://www.gutenberg.org/cache/epub/657/pg657-images.html",
        "image": {
          "src": "/covers/meta-ai-layoffs-lawsuit--a1.png",
          "alt": "A page of the Domesday Book manuscript covered in abbreviated medieval Latin script.",
          "credit": "Extract from the Domesday Book (1086), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Charles Dickens opened his 1854 novel 'Hard Times' inside the schoolroom of Thomas Gradgrind, a man who worships Facts and calculations and regards every child before him as 'a little vessel then and there arranged for having imperial gallons of facts poured into them.' In the industrial town of Coketown, the mill workers are not people but 'Hands,' interchangeable units valued only by what can be stated in figures and sold in the cheapest market. Dickens wrote the book as a furious protest against a philosophy that measured human beings the way a machine measures its throughput, and that had no column for imagination, illness, or love. The parallel to the Meta lawsuit is exact: employees allegedly reduced to algorithmic performance rankings, judged by numbers a machine can tabulate, and discarded when the figures dip. Like Gradgrind's Hands, the workers on medical and parental leave become invisible to a system that recognizes only quantifiable output. The novel's whole argument is that a life cannot be captured in a spreadsheet, and that the attempt to do so grinds down the most human among us.",
        "excerpt": "Now, what I want is, Facts. Teach these boys and girls nothing but Facts. Facts alone are wanted in life. Plant nothing else, and root out everything else.",
        "source": "Charles Dickens, Hard Times (London: Bradbury & Evans, 1854), opening lines.",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm",
        "image": {
          "src": "/covers/meta-ai-layoffs-lawsuit--a2.png",
          "alt": "Portrait photograph of the author Charles Dickens.",
          "credit": "Charles Dickens, photograph by J. Gurney & Son, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "E. M. Forster's 1909 novella 'The Machine Stops' imagines a future in which humanity lives isolated in underground cells, every need met by a vast global Machine that its inhabitants have come to worship as a god. The Machine feeds, houses and connects them, and in return they surrender all judgment to it, printing a liturgy of praise in the book of its rules and treating any who cannot conform as unfit. Those the Machine deems useless, including infants who show too much independence and adults who fall out of step, are quietly condemned to 'Homelessness,' expelled to die on the surface. Forster's nightmare is precisely the fear voiced in the Meta suit: an impersonal automated system, trusted absolutely, that decides who belongs and who is cast out, its verdicts beyond appeal. The workers allegedly targeted while on leave are the story's Homeless, discarded because the Machine's logic has no place for the human circumstances that made them briefly less productive. Written more than a century ago, it warns against exactly the abdication Meta's plaintiffs allege, letting a machine make the judgment that should belong to people.",
        "excerpt": "\"The Machine,\" they exclaimed, \"feeds us and clothes us and houses us; through it we speak to one another, through it we see one another, in it we have our being. The Machine is the friend of ideas and the enemy of superstition: the Machine is omnipotent, eternal; blessed is the Machine.\"",
        "source": "E. M. Forster, \"The Machine Stops,\" first published in The Oxford and Cambridge Review (1909), part III (\"The Homeless\").",
        "href": "https://en.wikisource.org/wiki/The_Machine_Stops/Chapter_III",
        "image": {
          "src": "/covers/meta-ai-layoffs-lawsuit--a3.png",
          "alt": "Painted portrait of the writer E. M. Forster by Roger Fry.",
          "credit": "E. M. Forster, portrait by Roger Fry (c. 1911), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel painted 'The Iron Rolling Mill,' subtitled 'Modern Cyclopes,' between 1872 and 1875, and it is often called the first great painting of the industrial machine age. In a cavernous hall lit by the white glare of molten metal, dozens of workers strain in choreographed unison, their bodies bent to the tempo of the rollers and furnaces that dwarf and dictate to them. Menzel refused to romanticize the scene: the men are near-anonymous, interchangeable, their individuality dissolved into the relentless rhythm of the mechanism they serve. The picture speaks directly to the Meta lawsuit's central image, human beings absorbed into a machine that sets the pace and measures the man against it. Off to one side a laborer washes at a trough and another eats a meager meal, small reminders of the human needs, rest, food, a body, that the machine neither counts nor forgives. It is the visual ancestor of the office where surveillance software tracks each keystroke and the person who steps away, for a child or an illness, simply falls out of the count.",
        "excerpt": "Under a canopy of white furnace-light, Menzel packs his canvas with straining, near-faceless workers whose bodies echo the churning geometry of the rolling machinery around them. The eye is pulled to the glowing bar of iron at the center while the men blur into the mechanism, individuality surrendered to industrial rhythm. At the margins, a worker washing and another eating quietly insist on the human body the machine ignores.",
        "source": "Adolph Menzel, Das Eisenwalzwerk (The Iron Rolling Mill / Modern Cyclopes), oil on canvas, 1872-1875, Alte Nationalgalerie, Berlin.",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/meta-ai-layoffs-lawsuit--a4.png",
          "alt": "Painting of workers laboring around glowing machinery inside a 19th-century iron rolling mill.",
          "credit": "Adolph Menzel, Das Eisenwalzwerk (1872-1875), Google Art Project, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Mosolov composed 'Iron Foundry,' subtitled 'Music of Machines,' around 1926-1927 as an episode from his ballet 'Steel,' at the height of the Soviet avant-garde's fascination with industry. The short orchestral piece is a deliberate portrait of a factory in motion: repeated mechanical figures pile up measure by measure, a sheet of metal is shaken to imitate clattering machinery, and the human players are made to disappear into one vast, pounding, tireless engine. There are no melodies for individuals, only the collective churn of production, the human orchestra transformed into the very machine it depicts. That erasure is what makes it so apt for the Meta lawsuit, in which workers say they were dissolved into a stream of monitored data and algorithmic scores, judged by the rhythm of their output rather than seen as people. Mosolov meant partly to glorify the machine, yet the music also captures its menace, a force that never rests, never tires, and never asks whether the humans feeding it can keep pace. Anyone who slows, who takes leave for a birth or an illness, is simply out of time with a mechanism that recognizes only the beat of relentless production.",
        "excerpt": "The orchestra becomes a factory: ostinato figures accumulate relentlessly, a shaken metal sheet mimics rattling machinery, and horns rise above the din like a whistle over the shop floor. Individual voices vanish into one tireless, pounding engine of sound, a musical machine that never rests and never tires.",
        "source": "Alexander Mosolov, Iron Foundry (Zavod: Muzyka mashin / Music of Machines), Op. 19, from the ballet Steel, 1926-1927.",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
      }
    ],
    "rank": 4
  },
  {
    "slug": "house-daylight-saving-permanent",
    "headline": "U.S. House votes 308-117 to make daylight saving time permanent, sending the Sunshine Protection Act to the Senate",
    "overview": "The House of Representatives passed the Sunshine Protection Act by a bipartisan 308-117 vote, a measure that would make daylight saving time permanent year-round and end the twice-yearly clock changes unless a state opted out before it took effect. Backed by President Donald Trump, supporters said abolishing the switch would spare Americans disrupted sleep and reduce seasonal depression, while critics warned of darker winter mornings and consequences for farmers facing later sunrises. The measure now goes to the Senate, where its prospects are uncertain.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQbmhoWGdKaWVhUlE0Y3RqUzlXNGRmU0FvcDBSdElqQ0NGdG0yVm1HUEh2UTEzNGl0N2RkeFJBdFpqd2FKSW5waE5ua2J3Q05BZnVGSml2XzZSVkwyRm43QWZSTk1Wa2FqTkpHZ1g4RkVXRjlhc0lnek9YZEpiLWVLZWVjWTJqdUZ0bGlDTDRuandsbHdxdkRYcDEwZ1JvdVE?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/14/politics/house-vote-daylight-savings-time"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/house-daylight-saving-permanent.png",
      "alt": "The great clock on the tower of London St Pancras International station.",
      "credit": "Clock tower, London St Pancras International; photo by Elliott Brown, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 46 BC Julius Caesar did what the House now proposes in miniature: he legislated time itself. Finding the Roman year hopelessly out of joint with the sun, its festivals drifting into the wrong seasons because priests slipped in extra months at their pleasure, Caesar summoned the best astronomers of the age and imposed by decree the calendar that still governs the West. Plutarch records that the reform was a triumph of science, but also that it bred resentment among those who felt oppressed by one man rearranging the heavens. When someone remarked that the constellation Lyra would rise the next morning, Cicero dryly answered, 'Yes, in accordance with the edict' - as if even the stars now kept their appointments only because the state commanded it. That ancient joke is the exact anxiety behind the Sunshine Protection Act: the sense that clock time is a human invention, and that legislatures, not the sun, decide when the day begins. Caesar standardized the year across an empire; Congress proposes to freeze the hour across a nation. Both acts reveal how thoroughly humanity has come to treat the natural day as something to be edited, ratified, and enforced.",
        "excerpt": "Caesar called in the best philosophers and mathematicians of his time to settle the point, and out of the systems he had before him, formed a new and more exact method of correcting the calendar, which the Romans use to this day, and seem to succeed better than any nation in avoiding the errors occasioned by the inequality of the cycles. Yet even this gave offense to those who looked with an evil eye on his position, and felt oppressed by his power. Cicero, the orator, when someone in his company chanced to say, the next morning Lyra would rise, replied, \"Yes, in accordance with the edict,\" as if even this were a matter of compulsion.",
        "source": "Plutarch, \"Caesar,\" in Lives of the Noble Grecians and Romans, trans. John Dryden, rev. Arthur Hugh Clough.",
        "href": "https://www.gutenberg.org/cache/epub/674/pg674.txt",
        "image": {
          "src": "/covers/house-daylight-saving-permanent--a0.png",
          "alt": "Reconstruction of the pre-Julian Roman calendar, the Fasti Antiates Maiores, painted in columns of months.",
          "credit": "Reconstruction of the Fasti Antiates Maiores by Levaring, CC0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The idea that a society might reorganize its waking hours to capture more daylight was first floated, half in jest, by Benjamin Franklin in 1784. Writing anonymously to the Journal de Paris, the American envoy claimed to have been startled awake at six in the morning to discover, to his astonishment, that the sun had already risen and was flooding his room with free light his shuttered neighbors were sleeping through. With mock-scientific gravity he calculated the fortune Parisians squandered on candles and tallow simply by rising at noon, and proposed taxes on shutters and cannon fired at dawn to roust the city from bed. It was satire, but it planted the germ of an argument that echoes verbatim in the Sunshine Protection Act: that the clock can be enlisted to shift human activity toward the light and away from the dark. Franklin's letter frames the very trade-off the House debated - sunshine versus artificial light, thrift versus habit, the natural day versus the schedule we impose on it. What he offered as a joke about candles is now sober policy about winter mornings and summer evenings. The permanent-daylight bill is, in a sense, Franklin's 'economical project' finally taken literally.",
        "excerpt": "I got up and looked out to see what might be the occasion of it, when I saw the sun just rising above the horizon, from whence he poured his rays plentifully into my chamber, my domestic having negligently omitted, the preceding evening, to close the shutters. ... An immense sum! that the city of Paris might save every year, by the economy of using sunshine instead of candles.",
        "source": "Benjamin Franklin, letter to the editor of the Journal de Paris (\"An Economical Project\"), 1784.",
        "href": "https://www.webexhibits.org/daylightsaving/franklin3.html",
        "image": {
          "src": "/covers/house-daylight-saving-permanent--a1.png",
          "alt": "Portrait of an aging Benjamin Franklin in a brown coat.",
          "credit": "Joseph Siffred Duplessis, Benjamin Franklin (c. 1785), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Charles Dickens watched a nation surrender its clocks to a schedule in real time, and recorded it in Dombey and Son. Before the railways, every English town kept its own local sun-time, so that noon in Bristol arrived minutes after noon in London; the trains, needing a single timetable to run safely, forced the whole country onto one standardized 'railway time.' In the novel's great set-piece on the transformation of Staggs's Gardens, Dickens catalogues how the railway remade an entire district - its shops, its streets, its very language - and then delivers the astonishing line that even the clocks now told railway time, 'as if the sun itself had given in.' That image is the precise theme of the Sunshine Protection Act: a technological, commercial society overruling the sun and legislating a uniform hour from coast to coast. Dickens saw the sublime and the unsettling in it at once - progress that vanquishes the old irregular rhythms, but at the cost of bending the heavens to a manmade schedule. His sun that 'gives in' is the same sun a permanent clock change would override every dark winter morning. It is the moment a nation decides the timetable, not the daylight, will rule.",
        "excerpt": "There were railway hotels, office-houses, lodging-houses, boarding-houses; railway plans, maps, views, wrappers, bottles, sandwich-boxes, and time-tables; railway hackney-coach and stands; railway omnibuses, railway streets and buildings, railway hangers-on and parasites, and flatterers out of all calculation. There was even railway time observed in clocks, as if the sun itself had given in.",
        "source": "Charles Dickens, Dombey and Son (1848), ch. 15.",
        "href": "https://www.gutenberg.org/cache/epub/821/pg821.txt",
        "image": {
          "src": "/covers/house-daylight-saving-permanent--a2.png",
          "alt": "A steam locomotive rushing through rain and mist across a bridge in Turner's atmospheric painting.",
          "credit": "J. M. W. Turner, Rain, Steam and Speed - The Great Western Railway (1844), National Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "No work in English captures the sheer arbitrariness of clock time better than the Mad Tea-Party in Lewis Carroll's Alice's Adventures in Wonderland. Here Time is not an abstraction but a person, a touchy gentleman with whom the Hatter has personally quarreled - and because Time is offended, the Hatter's clock has stopped dead at six, trapping him and the March Hare in an eternal tea-hour they can never escape. Carroll turns the everyday fiction that we can 'save' or 'waste' or 'beat' time into literal comic nonsense, exposing how much of our timekeeping is convention and negotiation rather than nature. That is exactly the strangeness at the heart of a bill to make daylight saving permanent: the notion that a legislature can quarrel with the clock, freeze the whole country at a chosen hour, and simply refuse to let the setting change. The Hatter's stuck perpetual six o'clock is a fable of what happens when the relationship between the clock and the sun breaks down. Congress, like the Hatter, proposes to keep the hands where it prefers them, natural light be damned. Alice's bafflement is the citizen's, waking in winter darkness to a clock that insists it is later than the sky agrees.",
        "excerpt": "\"If you knew Time as well as I do,\" said the Hatter, \"you wouldn't talk about wasting it. It's him.\" ... \"And ever since that,\" the Hatter went on in a mournful tone, \"he won't do a thing I ask! It's always six o'clock now.\"",
        "source": "Lewis Carroll, Alice's Adventures in Wonderland (1865), ch. 7, \"A Mad Tea-Party.\"",
        "href": "https://www.gutenberg.org/cache/epub/11/pg11.txt",
        "image": {
          "src": "/covers/house-daylight-saving-permanent--a3.png",
          "alt": "Alice at a crowded table with the Mad Hatter, March Hare, and sleeping Dormouse.",
          "credit": "John Tenniel, illustration for Alice's Adventures in Wonderland (1865), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin's A Dance to the Music of Time, painted in Rome around 1634-36, is the great visual meditation on humanity's helpless subjection to time. Four figures - commonly read as Poverty, Labour, Riches, and Pleasure - join hands and turn in a slow ring while a winged, bearded Father Time sits at the right, gravely playing his lyre to set their tempo. Overhead the sun-god Apollo drives his chariot across the sky with the Hours wheeling around him, so that the whole cosmos keeps a single measured beat, and a putto beside Time holds an hourglass while another blows soap bubbles that will burst. The painting insists that time is the music to which all human fortune must dance, an order humans can feel but never command. Set against the Sunshine Protection Act, Poussin's canvas throws the modern ambition into relief: where his mortals merely keep the beat that Time and the sun dictate, a legislature now presumes to change the tempo itself, to fix the hour and hold back the winter dawn. It is a portrait of the very authority - the sun's chariot, Time's own lyre - that a permanent clock change would try to legislate around.",
        "excerpt": "In Poussin's canvas the seasons of human fortune clasp hands and revolve in a stately ring, their steps timed to the lyre of a winged, white-bearded Father Time seated at the edge of the scene. Above them the sun-god Apollo wheels his chariot across the heavens ringed by the dancing Hours, binding earth and sky to one inexorable measure. A child at Time's feet tips an hourglass while another blows fragile bubbles, reminders that the beat plays on whether or not mortals consent - the antithesis of a clock reset by decree.",
        "source": "Nicolas Poussin, A Dance to the Music of Time, oil on canvas, c. 1634-1636, Wallace Collection, London.",
        "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_Dance_to_the_Music_of_Time_-_WGA18303.jpg",
        "image": {
          "src": "/covers/house-daylight-saving-permanent--a4.png",
          "alt": "Four allegorical figures dance in a ring while a winged Father Time plays a lyre and Apollo crosses the sky above.",
          "credit": "Nicolas Poussin, A Dance to the Music of Time (c. 1634-1636), Wallace Collection; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Edvard Grieg's 'Morning Mood' (Morgenstemning), the tender orchestral prelude he wrote in 1875 for Ibsen's Peer Gynt and later placed first in his Peer Gynt Suite No. 1, is music that seems to make the sun come up. A solo flute floats a simple pastoral tune, answered by the oboe and passed around the orchestra in swelling waves until the full ensemble blazes into a golden sunrise, complete with a horn call and the hush of first light over an untouched landscape. It has become the world's shorthand for dawn precisely because it honors the natural rising of the day as something serene, gradual, and given - not scheduled. That is what makes it such a pointed counterpoint to the Sunshine Protection Act, a law about exactly when the human day should be said to begin. Grieg dramatizes the morning light the bill's critics fear losing: the winter sunrises that permanent daylight saving would push deep into the dark hours, so that children wait for school buses and farmers begin their labor under a sky that has not yet answered the clock. Where Congress debates moving the light to the evening, Grieg's piece is a hymn to the morning, and to a sun that keeps its own unlegislated time.",
        "excerpt": "A single flute unfurls a pastoral melody, answered by the oboe and lifted through the strings in gentle, brightening swells until the whole orchestra glows into a sunrise crowned by a distant horn call. The music imitates the slow, unforced arrival of daylight over a still landscape - dawn as something that simply comes, at its own pace, rather than an hour set by statute. It is the natural morning the debate over permanent daylight saving would push back into darkness.",
        "source": "Edvard Grieg, \"Morning Mood\" (Morgenstemning), from the Peer Gynt music, Op. 23 (1875); arranged in Peer Gynt Suite No. 1, Op. 46.",
        "href": "https://imslp.org/wiki/Peer_Gynt_Suite_No.1,_Op.46_(Grieg,_Edvard)",
        "image": {
          "src": "/covers/house-daylight-saving-permanent--a5.png",
          "alt": "Portrait photograph of the composer Edvard Grieg.",
          "credit": "Edvard Grieg portrait, Bergen Public Library, Norway; no known copyright restrictions, via Wikimedia Commons."
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "ann-widdecombe-killed-targeted-attack",
    "headline": "British counter-terrorism police say former MP and TV personality Ann Widdecombe, 78, was killed in a 'targeted attack'",
    "overview": "British counter-terrorism police said Ann Widdecombe, the 78-year-old former Conservative minister, Brexit Party MEP and Reform UK figure, was killed in a 'targeted attack' at her home in Haytor on Dartmoor, Devon, and that a 28-year-old man arrested on suspicion of murder and terrorism offenses remains in custody. Officers said she was attacked around 12:30 p.m. last Wednesday, shortly before she was due to appear on a Channel 5 program, and that counter-terrorism detectives took over the case after new evidence emerged. The motive is still under investigation. Widdecombe, first elected an MP in 1987, later found fame on 'Strictly Come Dancing' and 'Celebrity Big Brother.'",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijAFBVV95cUxOaFNrNjhwbkhMdjZ0dTNVRjNuZl9Rc3NkM3NtX3VhWHhOVklKMG83TTdubWtBRHo4czJuUHVwMWpBaXpXZmFsRnRDc2RVSHl5NURNMUdrcVpWWjRrV25CWkdoVUdtVWVaRXpBbC0zSHF6ODRLbXptd2RCcTFXSUtHTE44U1RFMnF6QUg2Zg?oc=5"
      },
      {
        "name": "ITV News",
        "href": "https://www.itv.com/news/westcountry/2026-07-14/ann-widdecombe-killed-in-targeted-attack-say-counter-terrorism-police"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/ann-widdecombe-killed-targeted-attack.png",
      "alt": "Ann Widdecombe at a European Parliament session in 2019.",
      "credit": "Ann Widdecombe at the European Parliament, 2019; © European Union 2019 - European Parliament, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 43 BC the Roman orator and statesman Marcus Tullius Cicero, one of the most famous public voices of the late Republic, was hunted down and killed after being placed on the proscription lists of the Second Triumvirate. His crime, in the eyes of Mark Antony, was political: the searing speeches known as the Philippics that he had delivered against Antony from the public platform. Fleeing toward the coast, Cicero was overtaken by soldiers led by the tribune Popillius and the centurion Herennius, and rather than resist he leaned out of his litter and offered his neck to the sword. On Antony's orders his head and his hands were severed and displayed on the Rostra, the very speaker's platform from which he had addressed Rome. Plutarch's account records both the physical horror and the way bystanders covered their faces in shame at the killing of so eminent a man. It stands as one of antiquity's starkest examples of a public figure targeted and murdered for a life lived in politics and open speech, a distant mirror to the killing of a former parliamentarian who had spent decades in the public eye.",
        "excerpt": "Then he himself, clasping his chin with his left hand, as was his wont, looked steadfastly at his slayers, his head all squalid and unkempt, and his face wasted with anxiety, so that most of those that stood by covered their faces while Herennius was slaying him. For he stretched his neck forth from the litter and was slain, being then in his sixty-fourth year. Herennius cut off his head, by Antony's command, and his hands—the hands with which he wrote the Philippics.",
        "source": "Plutarch, Life of Cicero, ch. 48 (trans. Bernadotte Perrin, Loeb Classical Library, 1919), via the Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0016:chapter=48",
        "image": {
          "src": "/covers/ann-widdecombe-killed-targeted-attack--a0.png",
          "alt": "Ancient marble bust of the Roman orator and statesman Cicero.",
          "credit": "Bust of Cicero, Musei Capitolini, Rome. Photograph via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "historical",
        "title": "On 29 December 1170 Thomas Becket, Archbishop of Canterbury and one of the most prominent public figures of Norman England, was cut down by four knights inside his own cathedral. The murder grew out of a long and bitter conflict between Becket and King Henry II over the rights of church and crown, and the king's exasperated words were taken by his knights as licence to kill. Becket refused to flee or hide, meeting his attackers at the hour of vespers as monks looked on in horror; the assailants struck him on the head with their swords until he fell dead before the altar. The eyewitness Edward Grim, a clerk who was wounded trying to shield him, left a vivid contemporary account of the archbishop's final words and the blows that felled him. The killing shocked all of Christendom, made Becket a martyr and pilgrimage saint within a few years, and became the archetype of a targeted assassination of a public official at his most vulnerable, unarmed and at home in his own sanctuary. It resonates with the shock of a well-known public figure being struck down in a place that should have been a refuge.",
        "excerpt": "",
        "source": "Edward Grim, eyewitness account of the martyrdom of Thomas Becket, from his Vita S. Thomae (c. 1180), ed. James C. Robertson, Materials for the History of Thomas Becket (Rolls Series, 1875-85); modern translation by Dawn Marie Hayes, Fordham University Internet Medieval Sourcebook.",
        "href": "https://sourcebooks.fordham.edu/source/grim-becket.asp",
        "image": {
          "src": "/covers/ann-widdecombe-killed-targeted-attack--a1.png",
          "alt": "Medieval manuscript illumination showing knights striking down Thomas Becket in Canterbury Cathedral.",
          "credit": "Anonymous illuminator, psalter (c. 1200-1220), British Library, Harley MS 5102, f. 32. Via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "literary",
        "title": "William Shakespeare's tragedy Julius Caesar (c. 1599) dramatizes the most famous political assassination in Western memory: the stabbing of Caesar by a conspiracy of senators, including his friend Brutus, on the Ides of March. The play probes the aftershocks of such an act, the way the killing of one towering public figure fractures a whole political order and unleashes rhetoric, faction and civil war. Caesar's dying line as he sees Brutus among his killers has become shorthand for betrayal, and Mark Antony's funeral oration shows how a murdered leader's body itself becomes a rallying point. Shakespeare is careful to weigh the conspirators' claim to act for the public good against the private treachery and chaos that follow. As a work of literature it captures the peculiar shock that attends the assassination of someone who has stood for years at the centre of public life, and the way a nation reels when a familiar figure is suddenly and violently removed.",
        "excerpt": "CAESAR. Et tu, Brute?—Then fall, Caesar!\n[Dies. The Senators and People retire in confusion.]\nCINNA. Liberty! Freedom! Tyranny is dead!",
        "source": "William Shakespeare, The Tragedy of Julius Caesar, Act III, Scene 1. Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/1522",
        "image": {
          "src": "/covers/ann-widdecombe-killed-targeted-attack--a2.png",
          "alt": "Neoclassical painting of the assassination of Julius Caesar in the Roman senate.",
          "credit": "Vincenzo Camuccini, The Death of Julius Caesar (c. 1804-06). Via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "literary",
        "title": "Shakespeare's Macbeth (c. 1606) turns on the murder of a public figure of the highest rank: the killing of the good King Duncan by his own host and subject, Macbeth. Where Julius Caesar examines an assassination's public consequences, Macbeth burrows into its moral and psychological aftermath, the guilt and disorder that follow the slaying of a trusted leader under his own roof. Immediately after the deed Macbeth is undone by what he has done, hearing phantom voices and staring at his blood-stained hands as if the whole ocean could not wash them clean. Shakespeare frames the regicide as an unnatural act that convulses the natural world, with storms, darkness and omens marking the death of the anointed king. The play stands as literature's great meditation on the horror of a targeted killing that violates the bonds of hospitality and public trust, and on how such violence stains those who commit it and shocks the community it strikes.",
        "excerpt": "Will all great Neptune's ocean wash this blood\nClean from my hand? No, this my hand will rather\nThe multitudinous seas incarnadine,\nMaking the green one red.",
        "source": "William Shakespeare, The Tragedy of Macbeth, Act II, Scene 2. Project Gutenberg.",
        "href": "https://www.gutenberg.org/ebooks/1533",
        "image": {
          "src": "/covers/ann-widdecombe-killed-targeted-attack--a3.png",
          "alt": "Dramatic painting of Lady Macbeth seizing the bloodied daggers after Duncan's murder.",
          "credit": "Johann Heinrich Füssli (Henry Fuseli), Lady Macbeth with the Daggers (c. 1812). Via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's The Death of Marat (1793) is one of the most powerful images ever painted of a political assassination. It depicts Jean-Paul Marat, a radical journalist and leading voice of the French Revolution, moments after he was stabbed to death in his bath at home by Charlotte Corday, who had gained entry on the pretext of delivering a petition. David, Marat's friend and political ally, stripped the scene of clutter and rendered it with austere, almost sacred stillness, transforming a brutal killing into a secular martyrdom. The dead man's arm hangs down like that of the crucified Christ in older paintings, and the wooden crate beside him serves as a stark memorial inscribed to Marat. The picture speaks directly to the themes of a targeted attack on a public figure in the supposed safety of the home, and to the way a violent death can turn a divisive political personality into an emblem for a shaken nation. Its quiet horror lends it an enduring force as an artwork about the mortality of the famous and the danger of a life lived in public.",
        "excerpt": "David's canvas shows Marat slumped dead in his bath, one arm trailing to the floor still holding his pen, a quill and the assassin's knife nearby. The upper half of the painting is an empty, shadowy void, concentrating all attention on the pale, wounded body below. The effect is at once documentary and devotional, presenting the murdered revolutionary as a martyr of the public cause.",
        "source": "Jacques-Louis David, The Death of Marat (La Mort de Marat), 1793, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Death_of_Marat_by_David.jpg",
        "image": {
          "src": "/covers/ann-widdecombe-killed-targeted-attack--a4.png",
          "alt": "Painting of the assassinated revolutionary Marat lying dead in his bath.",
          "credit": "Jacques-Louis David, The Death of Marat (1793), Royal Museums of Fine Arts of Belgium. Via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Frédéric Chopin's Marche funèbre, the solemn third movement of his Piano Sonata No. 2 in B-flat minor, Op. 35 (composed 1837-39), is the most recognizable funeral music in the Western world and has been performed at the state funerals and memorials of countless public figures and heads of state. Though written as absolute music rather than about any single death, its heavy, tolling tread and the tender, hymn-like consolation of its central section have made it a near-universal expression of public mourning, the sound a nation reaches for when a well-known figure dies. It was played at Chopin's own funeral in 1849 and has since accompanied the coffins of statesmen and leaders across continents. As an artistic parallel it captures the collective grief and shock that follow the death of a famous person, and the way music can give shape to a community's sense of loss and mortality. Its measured dignity offers a fitting counterpoint to the abruptness and violence of a targeted killing.",
        "excerpt": "The movement opens with a slow, relentless dotted rhythm in the low register, like muffled drums or the tread of a cortege, building to grief-stricken climaxes. A hushed, songlike middle section in the major key offers a moment of tender consolation before the funeral tread returns and fades. Wordless and instrumental, it conveys the weight of public mourning more directly than any speech.",
        "source": "Frédéric Chopin, Marche funèbre, from Piano Sonata No. 2 in B-flat minor, Op. 35 (1839; third movement composed 1837). Scores via the International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)",
        "image": {
          "src": "/covers/ann-widdecombe-killed-targeted-attack--a5.png",
          "alt": "1849 daguerreotype photograph of the composer Frederic Chopin.",
          "credit": "Louis-Auguste Bisson, daguerreotype of Frédéric Chopin (1849). Via Wikimedia Commons, public domain."
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "russia-odesa-strike-kills-three",
    "headline": "Russian missile and drone strike on Ukraine's port city of Odesa kills three as von der Leyen arrives for defense talks",
    "overview": "A Russian missile and drone attack on the Black Sea port of Odesa killed three people and hospitalized three more on the morning of July 15, damaging residential buildings, a local official said. Moscow said it had struck port infrastructure at Odesa and Chornomorsk, including fuel-unloading facilities and storage tanks, using precision air-launched weapons and attack drones, as the two sides fought for control of the Black Sea. The strike came as European Commission President Ursula von der Leyen arrived in Ukraine for talks on bolstering the country's air defenses.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxOeDFCUTI1UUF5a1pIUXBhV09wZTJobGNVNjRlbDhBZ0RnUVVrcWJGMEtTY01XT3FFMGlxZ3hZb1drVC1ZdWNjeHhGcTNtbmN0TUdnT21PSkwyWm1zaGRITlpaMzhmMGk3TThSb1JqV2lmdnRYYWFzRS1Wbm1xNVBGa28tdXZIUmpSUTJkVXNfaUxUelNRTGpscVNuS1FqZ0M1UDJHMXZzSQ?oc=5"
      },
      {
        "name": "France 24",
        "href": "https://www.france24.com/en/europe/20260715-deadly-russian-strike-hits-odesa-as-von-der-leyen-arrives-in-ukraine-with-defence-plans"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/russia-odesa-strike-kills-three.png",
      "alt": "Cranes and cargo terminals at the Black Sea port of Odesa.",
      "credit": "The port of Odesa, 2016; photo by George Chernilevsky, public domain, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 22 April 1854, at the outset of the Crimean War, an Anglo-French steam squadron stood off the young Russian port of Odesa and opened a sustained bombardment of its harbour, mole and coastal batteries, setting warehouses and shipping ablaze along the Black Sea shore. The city that Russian missiles and drones struck on 15 July 2026 was thus enduring a violence written into its very founding century: a great naval power reaching across the Black Sea to punish a rival by smashing the wharves, fuel stores and quays through which a port lives and breathes. Then as now, the target was harbour infrastructure and the message was coercion, control of the sea asserted by fire rained on the land. Francis Hustwick's canvas records the moment, the fleet wreathed in cannon-smoke while the town smoulders behind its waterfront. The parallels are exact in kind if not in scale: the harbour as prize, the civilian city as hostage, and Odesa cast once more as the contested edge of empires. Nearly two centuries separate the broadsides from the drones, but the logic of bombarding a Black Sea port to break the will behind it has scarcely changed.",
        "excerpt": "Hustwick's painting shows the allied steam-frigates standing close inshore, their broadsides flowering into smoke as shells arc toward the mole; along the waterfront the Russian batteries answer while buildings burn and small craft scatter across a choppy Black Sea. It is a portrait of a working port turned into a target, the harbour infrastructure that gave Odesa its life reduced in a single morning to a field of fire.",
        "source": "Francis Hustwick, 'The Bombardment of Odessa, 22nd April 1854' (1854), depicting the Anglo-French bombardment of Odesa during the Crimean War.",
        "href": "https://commons.wikimedia.org/wiki/File:Francis_Hustwick_-_The_Bombardment_of_Odessa,_22nd_April_1854.jpg",
        "image": {
          "src": "/covers/russia-odesa-strike-kills-three--a0.png",
          "alt": "An Anglo-French fleet bombarding the Russian port of Odesa in 1854, ships wreathed in cannon smoke.",
          "credit": "Francis Hustwick, 'The Bombardment of Odessa, 22nd April 1854' (1854). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In 332 BC Alexander the Great came to the island fortress of Tyre, the greatest port of the Phoenician coast, and when its people refused him entry he resolved to take the sea itself out of the equation, building a vast mole, or causeway, from the mainland toward the walls while his engines and later his fleet closed the ring. Arrian's account, drawn from eyewitness sources, describes a seven-month ordeal of missiles, fire-ships, siege towers and naval assault against a city that trusted its harbours and its command of the water. It is the archetype of the port siege: a maritime city, rich on trade, throttled and finally stormed by a power determined to master the coast. The strike on Odesa belongs to that same ancient grammar of war, the harbour as the throat of a city, and the attacker's certainty that whoever controls the approaches controls the population behind them. Tyre's fuel of survival was its ships and sea-walls; Odesa's is its grain terminals and fuel depots, and both were targeted precisely because a port is where a nation touches the world. Across twenty-three centuries the Mediterranean and the Black Sea rhyme: the island city and the Black Sea city each learning that the sea which made them prosperous also makes them a target.",
        "excerpt": "As long as the mole was being constructed near the mainland, the work made easy and rapid progress, as the material was poured into a small depth of water, and there was no one to hinder them; but when they began to approach the deeper water, and at the same time came near the city itself, they suffered severely, being assailed with missiles from the walls, which were lofty, inasmuch as they had been expressly equipped for work rather than for fighting.",
        "source": "Arrian, The Anabasis of Alexander, Book II, ch. 18 (Siege of Tyre), trans. E. J. Chinnock (London, 1884).",
        "href": "https://www.gutenberg.org/cache/epub/46976/pg46976.txt",
        "image": {
          "src": "/covers/russia-odesa-strike-kills-three--a1.png",
          "alt": "Alexander the Great's forces assaulting the island port of Tyre in 332 BC.",
          "credit": "'Alexander at the Siege of Tyre,' from John Williams, The Life of Alexander the Great (New York, 1902). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer's Iliad unfolds entirely in the tenth year of a siege waged against a walled city beside the sea, the Greek host beached with its ships on the Trojan shore. In the great crisis of Book XV, Hector at last breaks through to the Achaean fleet and calls for fire, and Homer summons the Muses to tell how flame was flung upon the ships, the beachhead and harbour of the invaders set alight. War in the Iliad is inseparable from the shoreline: the ships are the army's lifeline, its fuel and its only means of return, exactly as a port's storage tanks and quays are a modern city's lifeline. The dawn strike on Odesa, damaging fuel-unloading facilities and storage tanks even as it killed civilians in their homes, replays that oldest of images, fire brought to the water's edge to destroy the vessels and stores on which survival depends. Homer's poem also insists on the human cost behind the strategy, the named dead amid the burning, which is the register in which Odesa's three killed and three hospitalised must be read. The Iliad endures because it makes the siege of a coastal city stand for war itself, and the harbour flames of Troy still flicker over the Black Sea.",
        "excerpt": "And now, tell me, O Muses that hold your mansions on Olympus, how fire was thrown upon the ships of the Achaeans. Hector came close up and let drive with his great sword at the ashen spear of Ajax. He cut it clean in two just behind where the point was fastened on to the shaft of the spear. Ajax, therefore, had now nothing but a headless spear, while the bronze point flew some way off and came ringing down on to the ground. Ajax knew the hand of heaven in this, and was dismayed at seeing that Jove had now left him utterly defenceless and was willing victory for the Trojans. Therefore he drew back, and the Trojans flung fire upon the ship which was at once wrapped in flame.",
        "source": "Homer, The Iliad, Book XV, trans. Samuel Butler (1898).",
        "href": "https://www.gutenberg.org/files/2199/2199-0.txt",
        "image": {
          "src": "/covers/russia-odesa-strike-kills-three--a2.png",
          "alt": "Aeneas fleeing the burning city of Troy carrying his father, in Adam Elsheimer's painting.",
          "credit": "Adam Elsheimer, 'The Burning of Troy' (c. 1600-01), Alte Pinakothek, Munich. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "On the night of 13-14 September 1814, Francis Scott Key watched from a truce ship in the Patapsco as the British fleet threw some 1,500 to 1,800 shells and rockets at Fort McHenry, guarding the harbour of Baltimore, and at dawn wrote the verses that became 'The Star-Spangled Banner.' His poem is, at root, a report of a port bombardment endured through the night, the rockets' red glare and the bombs bursting in air, and of the almost unbearable suspense of watching whether a city and its flag would survive the shelling. That is precisely the vigil forced on Odesa's residents on 15 July 2026, sheltering under a pre-dawn barrage of missiles and drones aimed at their waterfront. Key turned the ordeal of a harbour under fire into an anthem of endurance, finding in the surviving flag a symbol of a people who would not be broken by bombardment. The overlap with Odesa is close and poignant: a port city, civilians as witnesses, a night torn by explosions, and the meaning drawn not from conquest but from having withstood. Two centuries on, the imagery of bombs bursting over a defended harbour reads almost as reportage from the Black Sea.",
        "excerpt": "O! say can you see by the dawn’s early light, / What so proudly we hailed at the twilight’s last gleaming, / Whose broad stripes and bright stars through the perilous fight, / O’er the ramparts we watch’d, were so gallantly streaming? / And the Rockets’ red glare, the Bombs bursting in air, / Gave proof through the night that our Flag was still there; / O! say does that star-spangled Banner yet wave, / O’er the Land of the free and the home of the brave?",
        "source": "Francis Scott Key, 'Defence of Fort M'Henry' (Baltimore broadside, 1814), later 'The Star-Spangled Banner.'",
        "href": "https://en.wikisource.org/wiki/Defence_of_Fort_McHenry_(broadside)",
        "image": {
          "src": "/covers/russia-odesa-strike-kills-three--a3.png",
          "alt": "The British fleet bombarding Fort McHenry in Baltimore harbour in 1814, shells arcing through the night.",
          "credit": "John Bower, 'A View of the Bombardment of Fort McHenry' (c. 1814), via Google Art Project / Wikimedia Commons. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, born in Feodosia on the Crimean coast, was the supreme painter of the Black Sea, and in his monumental 'Battle of Sinop' (1853) he depicted the Russian fleet's night annihilation of an Ottoman squadron in a harbour on that same sea, the water and sky lit by burning ships and the flash of guns. Painted at the opening of the Crimean War, it renders the Black Sea as a theatre of fire, the port of Sinop consumed as fleets contest command of the water, the very struggle for control of the Black Sea named in the reports of the strike on Odesa. Aivazovsky's genius was to make cannon-smoke and firelit spray almost beautiful while never disguising the destruction beneath, so that the canvas becomes a meditation on what it means for a harbour to become a battlefield. Set beside news of Odesa's burning fuel depots, it exposes the long continuity of Black Sea warfare across nearly two centuries, the same sea, the same harbours, the same fire on the water. That the painter was himself a son of this coast lends the work a rootedness in the very geography now under attack. His Black Sea aflame is uncannily contemporary.",
        "excerpt": "In the painting the harbour of Sinop is a wall of fire: Ottoman ships explode and burn, masts collapse into the water, and a lurid glow spreads across smoke and sea while the victorious fleet looms in silhouette. Aivazovsky lets the terrible beauty of firelight on water carry the full horror of a port annihilated in a single night.",
        "source": "Ivan Aivazovsky, 'Battle of Sinop' (1853), Central Naval Museum, St Petersburg.",
        "href": "https://commons.wikimedia.org/wiki/File:Battle_of_Sinop.jpg",
        "image": {
          "src": "/covers/russia-odesa-strike-kills-three--a4.png",
          "alt": "Ivan Aivazovsky's painting of the Black Sea harbour of Sinop ablaze during the 1853 naval battle.",
          "credit": "Ivan Aivazovsky, 'Battle of Sinop' (1853), Central Naval Museum, St Petersburg. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky's 1812 Overture (1880) is the most famous musical depiction of a homeland under bombardment and its defenders' endurance, scoring the French invasion of Russia as a clash of themes that culminates in booming cannon fire, pealing bells and a blaze of triumph as the invader is repelled. Written to mark the defence of a nation against a foreign army, it turns the noise of artillery into music and the survival of a people into a crescendo, the emotional arc of a city that withstands attack. Heard against the strike on Odesa, its literal cannon-shots and its imagery of an invaded Russia resonate with an unsettling irony now that a Russian army is the one raining fire on a neighbour's ports. The Overture's power lies in its dramatisation of bombardment as an ordeal to be survived, the same defiance Ukrainians voice as they clear the rubble after each night of missiles and drones. Tchaikovsky gives sonic form to what a bombarded people feel: terror, resistance and, finally, the refusal to be extinguished. It remains the definitive music of a country under attack.",
        "excerpt": "The overture opens with a solemn Orthodox hymn for a threatened land, builds through surging battle music and fragments of the 'Marseillaise,' and detonates into a finale of live cannon, cathedral bells and a national anthem as the invader breaks. It converts the sound of bombardment into an argument for endurance, the din of the guns resolving into the defiance of a people who refuse to fall.",
        "source": "Pyotr Ilyich Tchaikovsky, The Year 1812, Festival Overture in E-flat major, Op. 49 (1880).",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/russia-odesa-strike-kills-three--a5.png",
          "alt": "Photographic portrait of the composer Pyotr Ilyich Tchaikovsky, c. 1870.",
          "credit": "Portrait of Pyotr Ilyich Tchaikovsky, c. 1870. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "kenya-court-rastafari-cannabis",
    "headline": "Kenya's High Court dismisses a Rastafarian group's bid to legalize cannabis for religious use",
    "overview": "Kenya's High Court dismissed a petition by the Rastafari Society of Kenya seeking to let followers grow, possess and use cannabis privately as a religious sacrament, ruling that the group had failed to prove the country's drug laws violated their constitutional right to freedom of religion. Justice Bahati Mwamuye found the evidence for cannabis being an essential element of the faith 'inconsistent and insufficient,' while acknowledging the need for a broader national debate on cannabis policy. The state had argued a religious exemption would undermine anti-drug enforcement; the ruling comes seven years after a court recognized Rastafarianism as a protected religion in Kenya.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c0lyl5ryyr4o"
      },
      {
        "name": "The Star (Kenya)",
        "href": "https://www.the-star.co.ke/news/2026-07-15-court-upholds-ban-on-bhang-urges-future-debate"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/kenya-court-rastafari-cannabis.png",
      "alt": "A view related to Kenya's High Court ruling on Rastafarian cannabis use.",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "For nearly two thousand years the Eleusinian Mysteries drew initiates from across the Greek and Roman worlds to a rite whose central act was the drinking of the kykeon, a barley-and-water potion that scholars have long suspected of inducing an altered, revelatory state. Like the Rastafari who told Kenya's High Court that the herb opens the mind to the divine, the initiates at Eleusis held that a humble prepared drink was the sacramental threshold to communion with a goddess. The myth that founded the rite is preserved in the Homeric Hymn to Demeter, in which the grieving goddess herself refuses ordinary wine and asks instead for the special mixture, sanctifying it for all who would follow. That the drink was 'not lawful' by one standard yet holy by another maps precisely onto the Kenyan dispute over what a state may forbid and a faith may consecrate. Eleusis was tolerated, even honored, by the Athenian state, a striking counterpoint to Justice Bahati Mwamuye's ruling that Kenya's drug law need not bend to a claimed sacrament. It shows how ancient and how contested the question is: when a society's law meets a congregation's holy intoxicant, which authority decides what is sacred?",
        "excerpt": "Then Metaneira filled a cup with sweet wine and offered it to her; but she refused it, for she said it was not lawful for her to drink red wine, but bade them mix meal and water with soft mint and give her to drink.",
        "source": "Homeric Hymn 2 (To Demeter), trans. Hugh G. Evelyn-White, in Hesiod, the Homeric Hymns and Homerica (Loeb Classical Library, 1914).",
        "href": "https://en.wikisource.org/wiki/Hesiod,_the_Homeric_Hymns_and_Homerica/Hymn_II_(To_Demeter)",
        "image": {
          "src": "/covers/kenya-court-rastafari-cannabis--a0.png",
          "alt": "Marble relief showing Demeter, Persephone and the youth Triptolemos, associated with the Eleusinian Mysteries.",
          "credit": "Great Eleusinian Relief, National Archaeological Museum, Athens. Photo: Yair-haklai, CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In 1990 the United States Supreme Court decided Employment Division v. Smith, a case brought by two members of the Native American Church who had been denied unemployment benefits after using peyote, a psychoactive cactus that is the central sacrament of their faith. Their claim was almost identical to that of the Rastafari Society of Kenya: that a criminal drug law, applied to a genuinely religious use of a sacred plant, violated their constitutional right to freely exercise their religion. Writing for the majority, Justice Antonin Scalia refused the exemption, holding that a neutral, generally applicable law does not have to yield to religious objection, however sincere. The parallel to Justice Mwamuye's reasoning is exact, decades and continents apart: the state's interest in uniform drug enforcement was held to outweigh a minority faith's plea to be left alone with its holy herb. The American ruling proved so contentious that Congress passed the Religious Freedom Restoration Act and, later, a specific statutory shelter for peyote in tribal worship. It stands as the modern template for the very conflict Nairobi's court has now revisited, showing how democracies keep drawing and redrawing the line between a drug and a sacrament.",
        "excerpt": "We have never held that an individual's religious beliefs excuse him from compliance with an otherwise valid law prohibiting conduct that the State is free to regulate. On the contrary, the record of more than a century of our free exercise jurisprudence contradicts that proposition.",
        "source": "Employment Division, Department of Human Resources of Oregon v. Smith, 494 U.S. 872 (1990), Opinion of the Court (Scalia, J.).",
        "href": "https://en.wikisource.org/wiki/Employment_Division_Department_of_Human_Resources_of_Oregon_v._Smith/Opinion_of_the_Court",
        "image": {
          "src": "/covers/kenya-court-rastafari-cannabis--a1.png",
          "alt": "A peyote cactus, Lophophora williamsii, the sacramental plant of the Native American Church.",
          "credit": "Lophophora williamsii (peyote). Photo: Frank Vincentz, CC BY-SA 3.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "No text in world literature treats a sacred intoxicant with more rapt devotion than the ninth book of the Rig Veda, whose hundreds of hymns are addressed entirely to Soma, a pressed plant-juice that the ancient priests drank to touch the gods. The Rastafari who came before Kenya's High Court speak of ganja as a means of illumination and worship; three thousand years earlier the Vedic poets sang almost the same claim, that in drinking the sacred draught they crossed from mortal dullness into divine light and even immortality. The most famous verse, from Book 8, is a hymn of ecstatic communion in which the worshipper, filled with Soma, declares himself beyond the reach of enmity and deceit. Here ritual intoxication is not indulgence but the very machinery of religion, the plant itself hymned as a god. It is exactly the theology the Kenyan petitioners argued and the court found 'inconsistent and insufficient' to prove. The Rig Veda is a reminder that for entire civilizations the holy and the intoxicating have been one thing, and that a law dividing them draws a line the ancients would not have recognized.",
        "excerpt": "We have drunk Soma and become immortal; we have attained the light, the Gods discovered. Now what may foeman's malice do to harm us? What, O Immortal, mortal man's deception?",
        "source": "Rig Veda 8.48.3 ('Soma'), trans. Ralph T. H. Griffith, The Hymns of the Rigveda (1896).",
        "href": "https://rigveda-online.github.io/8/48.html"
      },
      {
        "category": "literary",
        "title": "Sophocles' tragedy Antigone, staged in Athens around 441 BC, is the enduring dramatization of a conscience that answers to divine law when the state's law commands otherwise. Antigone defies King Creon's edict to bury her brother, insisting that the 'unwritten and unfailing' statutes of the gods stand above any decree a mortal ruler can proclaim. That is the precise moral shape of the Rastafari case in Nairobi: a believer claiming that a sacred obligation outranks the criminal code, and a state authority answering that the law is the law. Antigone's speech before Creon is one of the oldest and most powerful assertions in literature that human legislation cannot override what a person holds holy. Yet the play is also a tragedy, and Sophocles does not let either side off easily, dramatizing how ruinous the collision between piety and public order can become. When Justice Mwamuye weighed a faith's sacrament against the state's ban, he was adjudicating the very quarrel Sophocles set on stage nearly twenty-five centuries ago, between the law of the city and the law the believer calls divine.",
        "excerpt": "Yea, for these laws were not ordained of Zeus, / And she who sits enthroned with gods below, / Justice, enacted not these human laws. / Nor did I deem that thou, a mortal man, / Could'st by a breath annul and override / The immutable unwritten laws of Heaven. / They were not born today nor yesterday; / They die not; and none knoweth whence they sprang.",
        "source": "Sophocles, Antigone, trans. Francis Storr, in The Oedipus Trilogy (1912).",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm",
        "image": {
          "src": "/covers/kenya-court-rastafari-cannabis--a3.png",
          "alt": "Nikiforos Lytras's painting of Antigone beside the body of her brother Polynices.",
          "credit": "Nikiforos Lytras, Antigone in Front of the Dead Polynices (1865). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Titian's Bacchus and Ariadne, painted around 1520 for the Duke of Ferrara and now in London's National Gallery, is Western art's most exuberant vision of a god of intoxication breaking into the mortal world. Bacchus leaps from his cheetah-drawn chariot amid a reeling procession of wine-flushed revelers, cymbals and satyrs, the whole picture a hymn to sacred ecstasy and divine rapture. Wine here is not mere drink but the emblem of a deity and of the altered, worshipful state his cult induced, the classical world's own union of intoxication and the holy that lies behind the Kenyan Rastafari's claim for their herb. The painting captures precisely what the petitioners argued and the court doubted: that a substance can be, for its devotees, a doorway to the divine rather than a vice. The tumbling maenads and the god's promise to set Ariadne's crown among the stars render intoxication as transcendence, not transgression. Set beside a courtroom weighing whether such rapture deserves the law's protection, Titian's canvas insists on how long, and how gloriously, humanity has painted the sacred as something you can drink.",
        "excerpt": "Titian stages the god of wine mid-leap from his chariot, cloak flying, as a delirious retinue of satyrs and cymbal-clashing maenads spills across the canvas in a haze of ripe color. The scene fuses ecstasy, worship and intoxication into a single radiant image, wine elevated into the presence of a god and the promise of a place among the stars.",
        "source": "Titian, Bacchus and Ariadne, c. 1520-1523, oil on canvas, National Gallery, London (NG35).",
        "href": "https://commons.wikimedia.org/wiki/File:Titian_Bacchus_and_Ariadne.jpg",
        "image": {
          "src": "/covers/kenya-court-rastafari-cannabis--a4.png",
          "alt": "Titian's painting of the god Bacchus leaping from a chariot toward Ariadne amid a procession of revelers.",
          "credit": "Titian, Bacchus and Ariadne (c. 1520-23), National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme's The Christian Martyrs' Last Prayer, worked on across two decades and finished in 1883, shows a small band of believers kneeling in prayer at the center of a Roman arena as lions pad toward them and crosses burn at the edge of the crowd. It is the most famous painted image of a minority faith crushed by the law and spectacle of the state precisely because of how it worshipped. That is the darker shadow behind the Kenyan case: the long history of religions declared illegal, their rites treated as crimes against public order, their adherents forced to choose between the state's command and their God's. The Rastafari before Nairobi's High Court were not thrown to lions, but they pressed the same underlying plea, that a sincere faith should not be punished for practicing what it holds sacred. Gérôme's arena, ringed by an approving public and the machinery of official power, is a warning about how easily a majority can criminalize a minority's devotion. Judged against it, the modern question is milder but continuous: how far must the law bend, or refuse to bend, before a congregation's holy practice?",
        "excerpt": "Gérôme paints a knot of praying figures alone on the arena sand, heads bowed as lions emerge from the shadows and crucified bodies smolder against the tiered, watching crowd. The composition sets fragile, unresisting faith against the vast apparatus of state spectacle, making the persecution of belief into a single hushed, terrible tableau.",
        "source": "Jean-Léon Gérôme, The Christian Martyrs' Last Prayer, 1863-1883, oil on canvas, Walters Art Museum, Baltimore (37.113).",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me_-_The_Christian_Martyrs%27_Last_Prayer_-_Walters_37113.jpg",
        "image": {
          "src": "/covers/kenya-court-rastafari-cannabis--a5.png",
          "alt": "Gérôme's painting of Christian martyrs praying in a Roman arena as lions approach and a crowd looks on.",
          "credit": "Jean-Léon Gérôme, The Christian Martyrs' Last Prayer (1863-83), Walters Art Museum. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "china-electric-taxis-oil-shock",
    "headline": "China leans on its electric-taxi boom to blunt the Strait of Hormuz oil shock as crude imports fall 41%",
    "overview": "China, the largest importer of oil through the Strait of Hormuz, is proving unusually resilient to the wartime oil shock thanks to its rapidly electrifying taxi and ride-hailing fleets, Reuters reported. Riders took 3.05 billion taxi and rideshare trips in May, up 6% since the Iran war began, as a glut of new drivers and cheap electric cars pushed fares down even while gasoline prices rose; about half of China's 1.3 million taxis are now electric, and nearly all of them in big cities. China cut oil imports 41% in June from a year earlier without heavily tapping reserves, easing pressure on a war-constrained global market.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQazduaE1oajJiQ1RMcHZaMko1YzZXaG1XRXFSYzNfYlFmVXlOUGJrTGlzV2R6X3VBMXd1bDVZTkFueTJBUjM5U1JGUTNhLXhhUGZCRXhWMUM1ZEZGZExTd0pOVHdwc05HXzJONlF0RUhIZEhYMTFra04zbVZpRmtXSmlXMERWemZwOGozRVFoR2xsNWh1aFFIa09zdk1VX25ueDlNbzk5a28ycjI0UU1zbG1kVjAtZDg?oc=5"
      },
      {
        "name": "U.S. News",
        "href": "https://money.usnews.com/investing/news/articles/2026-07-15/china-turns-to-electric-taxis-to-soften-hormuz-oil-shock"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/china-electric-taxis-oil-shock.png",
      "alt": "A BYD e5 electric taxicab on a street in Bengbu, China.",
      "credit": "A BYD e5 electric taxicab in Bengbu; photo by DKMcLaren, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Between the sixteenth and eighteenth centuries England ran up against a wall its forests could no longer supply: firewood and charcoal grew scarce and dear as woodlands were felled for fuel, building and iron-smelting, and the nation turned instead to coal dug from the ground and shipped by sea from Newcastle. What had been a nuisance fuel became the sinew of a civilization, heating homes, firing kilns and eventually driving the steam engines of the Industrial Revolution. By 1661 London was so wrapped in coal smoke that John Evelyn wrote 'Fumifugium,' the first treatise on the city's air, testimony to just how completely one energy source had replaced another. It is the archetype of an economy answering scarcity not by doing without but by switching fuels, exactly the maneuver China is now performing in reverse gear: when oil coming through the Strait of Hormuz grew costly and uncertain, its cities leaned on electricity, already abundant and homegrown, to keep the wheels turning. The lesson across four centuries is the same, that a society which can pivot to a new source of power turns a shortage of the old one from a catastrophe into an inconvenience.",
        "excerpt": "Facing a growing timber shortage, early-modern England shifted from wood and charcoal to coal as its principal fuel, an energy substitution so thorough that by 1661 John Evelyn could devote an entire pamphlet to the smoke of 'that Hellish and dismal Cloud of Sea-Coale' hanging over London. Coal went on to power the furnaces, forges and steam engines of the Industrial Revolution, proving that a nation which changes fuels can outgrow the scarcity of the one it leaves behind.",
        "source": "John Evelyn, Fumifugium: or, The Inconveniencie of the Aer and Smoak of London Dissipated (London, 1661), as evidence of England's early-modern transition from wood to coal.",
        "href": "https://archive.org/details/fumifugium00eveluoft",
        "image": {
          "src": "/covers/china-electric-taxis-oil-shock--a0.png",
          "alt": "Night scene of glowing coal-fired ironworks at Coalbrookdale, flames and smoke lighting the sky.",
          "credit": "Philip James de Loutherbourg, Coalbrookdale by Night (1801), Science Museum, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "When the 1973 oil embargo sent crude prices soaring, Brazil, which imported roughly four-fifths of its petroleum, faced a shock strikingly like the one now rattling oil markets. Rather than simply ration, the military government launched the Proalcool National Alcohol Program in 1975, ordering fuel distilled from the country's vast sugarcane crop to be blended into and later to replace gasoline. Idle distilling capacity and a glut of cheap sugar were turned into a strategic fuel, and by the mid-1980s most new Brazilian cars ran on pure ethanol grown at home rather than oil bought abroad. It was an act of national ingenuity that converted a resource crisis into a durable industry and loosened the grip of a foreign chokepoint on the economy. China's answer to the Hormuz oil shock rhymes with Brazil's: confront the vulnerability of imported crude by scaling up a domestic energy source, sugarcane spirit then, electricity now, so that the country's mobility no longer rises and falls with a tanker's passage through a contested strait. Both stories show a large nation deliberately engineering its way out of dependence on someone else's oil.",
        "excerpt": "After the 1973 oil crisis exposed Brazil's dependence on imported petroleum, the government launched the Proalcool program in 1975, financing a nationwide shift from gasoline toward ethanol distilled from domestic sugarcane. Output climbed from about 600 million litres in 1975-76 to some 3.4 billion litres by 1979-80, and within a decade most new Brazilian cars were built to burn home-grown alcohol instead of foreign oil, a deliberate substitution that turned a resource shock into an industry and blunted the leverage of imported crude.",
        "source": "History of ethanol fuel in Brazil (Programa Nacional do Alcool / Proalcool, launched 1975), Brazil's response to the 1973 oil crisis.",
        "href": "https://en.wikipedia.org/wiki/History_of_ethanol_fuel_in_Brazil",
        "image": {
          "src": "/covers/china-electric-taxis-oil-shock--a1.png",
          "alt": "Fuel pump nozzles at a Brazilian filling station offering ethanol alongside gasoline.",
          "credit": "Photo by Harry Wood, CC BY-SA 2.0, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Aesop's fable of the ants and the grasshopper is the oldest parable of thrift and foresight in the Western canon: while the grasshopper fiddles away the summer, the ants labor to lay up grain, and when winter's scarcity arrives it is the industrious who are provisioned and the improvident who go hungry. The moral is not merely about hoarding but about building capacity before you need it, so that a lean season finds you ready rather than ruined. China's resilience to the Hormuz oil shock is a modern gloss on that ant-like foresight: years of relentless investment in electric cars, charging networks and a home-grown power supply amounted to storing energy security against exactly this kind of hard winter in the oil market. When crude imports had to fall sharply, the electrified taxi and ride-hailing fleets were already in place to carry the country's passengers, fares even falling as gasoline rose. The grasshopper's nations, still wholly dependent on the tanker that may or may not arrive, are left to dance supperless while those who prepared keep moving.",
        "excerpt": "THE ANTS were spending a fine winter's day drying grain collected in the summertime. A Grasshopper, perishing with famine, passed by and earnestly begged for a little food. The Ants inquired of him, \"Why did you not treasure up food during the summer?\" He replied, \"I had not leisure enough. I passed the days in singing.\" They then said in derision: \"If you were foolish enough to sing all the summer, you must dance supperless to bed in the winter.\"",
        "source": "Aesop, \"The Ants and the Grasshopper,\" in Aesop's Fables, trans. George Fyler Townsend (Project Gutenberg ed.).",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm",
        "image": {
          "src": "/covers/china-electric-taxis-oil-shock--a2.png",
          "alt": "Illustration of a starving grasshopper begging at the door of the well-provisioned ant.",
          "credit": "Illustration from A Hundred Fables of La Fontaine (1900), illustrated by Percy J. Billinghurst. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Jules Verne's 1874 novel The Mysterious Island, a band of castaways led by the engineer Cyrus Harding survive on a bare Pacific island purely through science and ingenuity, wringing iron, glass, nitroglycerin and even electricity from raw nature. In one celebrated exchange the sailor Pencroft worries what humanity will burn once the coal runs out, and Harding answers that water, split by electricity into hydrogen and oxygen, will become 'the coal of the future,' an inexhaustible fuel outshining coal itself. It is one of literature's most prescient visions of energy substitution: the confident faith that when a familiar fuel is threatened, human cleverness will summon a cleaner, more abundant successor, with electricity as the key that unlocks it. That is precisely the spirit of China's response to the oil shock, meeting a crunch in a fossil resource by turning to electric power and the vehicles it drives. Verne's engineer treats a looming scarcity not as doom but as an invitation to invention, breaking dependence on a finite, extractable fuel. The electric taxis humming through Chinese cities as oil imports fall are, in a sense, Harding's prophecy arriving a century and a half early.",
        "excerpt": "\"Yes, but water decomposed into its primitive elements,\" replied Cyrus Harding, \"and decomposed doubtless, by electricity, which will then have become a powerful and manageable force, for all great discoveries, by some inexplicable laws, appear to agree and become complete at the same time. Yes, my friends, I believe that water will one day be employed as fuel, that hydrogen and oxygen which constitute it, used singly or together, will furnish an inexhaustible source of heat and light, of an intensity of which coal is not capable. ... I believe, then, that when the deposits of coal are exhausted we shall heat and warm ourselves with water. Water will be the coal of the future.\"",
        "source": "Jules Verne, The Mysterious Island (1874; English trans., Project Gutenberg ed.), Part II, ch. XI.",
        "href": "https://www.gutenberg.org/ebooks/1268",
        "image": {
          "src": "/covers/china-electric-taxis-oil-shock--a3.png",
          "alt": "Nineteenth-century engraving of the castaway colonists from Jules Verne's The Mysterious Island.",
          "credit": "Engraving by Jules Ferat (engraved by Charles Barbant) for Jules Verne's L'Ile mysterieuse (Hetzel, 1875). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner's 1839 masterpiece The Fighting Temeraire shows a ghostly white warship, a veteran of Trafalgar, being towed to the breaker's yard by a small, dark, fire-belching steam tug against a blazing sunset. In a single canvas Turner captures an energy transition: the age of sail, powered by the free wind, giving way to the age of steam, powered by coal, the old wooden giant eclipsed by a squat machine that runs on burning fuel. The painting is elegiac yet clear-eyed, mourning the beauty of what passes while acknowledging the new power that has arrived. It is an apt emblem for the moment China's cities are living through, as the century of the internal-combustion engine and the oil it drinks begins to yield to the quieter, electric machine. Where Turner painted wind surrendering to coal, the electric taxi marks coal-and-oil surrendering to the grid, another changing of the guard in what moves us. The sunset in Turner's sky reads equally as an ending and as the fiery dawn of a new source of power.",
        "excerpt": "Turner's canvas sets the pale, majestic hull of the old sailing warship against the squat black steam tug that hauls it to be scrapped, its funnel trailing fire and smoke across a molten sunset. Wind-power, ancient and graceful, is shown ceding the sea to coal-fired steam, an entire era of energy passing in a single luminous image of one technology quietly overtaking another.",
        "source": "Joseph Mallord William Turner, The Fighting Temeraire tugged to her last Berth to be broken up (1839), oil on canvas, National Gallery, London.",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-the-fighting-temeraire",
        "image": {
          "src": "/covers/china-electric-taxis-oil-shock--a4.png",
          "alt": "A pale old sailing warship towed by a dark steam tug beneath a fiery sunset on the Thames.",
          "credit": "Joseph Mallord William Turner, The Fighting Temeraire (1839), National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "During the Second World War the U.S. government waged a campaign to conserve gasoline and rubber for the war effort, and its most famous poster, illustrated by Weimer Pursell in 1943, shows a lone motorist at the wheel with the shadowy profile of Adolf Hitler riding beside him, above the accusation that to drive alone is to serve the enemy. The remedy it urges is collective and startlingly modern: share your car, pool your rides, and stretch scarce fuel by carrying more people in fewer vehicles. It reframed ride-sharing as a patriotic act of resilience in a resource emergency, turning private mobility into a shared, fuel-thrifty enterprise. The parallel to China's blunting of the Hormuz oil shock is almost literal, for it is precisely the booming taxi and ride-hailing fleets, 3.05 billion trips in a single May, that helped the country keep moving while cutting oil imports. Where the wartime poster asked Americans to pack the car to spare fuel, China's electric ride-hailing boom packs passengers into shared electric vehicles that sip no oil at all. In both cases, changing how people travel, not just what powers them, converts an oil crunch into something a society can absorb.",
        "excerpt": "\"When you ride ALONE you ride with Hitler!\" reads the poster's headline, above an image of a solitary driver shadowed by the phantom silhouette of Hitler in the passenger seat, urging Americans to join a car-sharing club and pool their rides so that scarce wartime gasoline would go further.",
        "source": "Weimer Pursell, \"When You Ride Alone You Ride With Hitler!\" poster for the U.S. Office of Price Administration / Government Printing Office, 1943 (U.S. National Archives, NARA 516143).",
        "href": "https://commons.wikimedia.org/wiki/File:%22WHEN_YOU_RIDE_ALONE_YOU_RIDE_WITH_HITLER%22._%22JOIN_A_CAR-SHARING_CLUB_TODAY%22._-_NARA_-_516143.jpg",
        "image": {
          "src": "/covers/china-electric-taxis-oil-shock--a5.png",
          "alt": "1943 U.S. poster of a lone driver shadowed by Hitler, urging carpooling to save gasoline.",
          "credit": "Weimer Pursell for the U.S. Office of Price Administration, 1943. U.S. National Archives (NARA 516143). Public domain."
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "ikea-kompishang-portable-furniture",
    "headline": "IKEA launches Kompishang, an 11-piece collection of portable furniture designed to be moved without a car",
    "overview": "IKEA unveiled Kompishang, a collection of 11 low-cost furniture pieces aimed at young renters who move often, including a side table that can be carried over the arm like a handbag and interlocking stools that slide together into a compact, portable stack. Developed after IKEA spent time with 20-to-28-year-olds living in central London, the range is built around balancing 'permanence and portability,' with prices starting at $10 and even a solid pine desk under $100. It reaches stores on July 31 and the IKEA website on August 15.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/15/ikea-kompishang-affordable-portable-furniture-short-term-rentals/"
      },
      {
        "name": "Homes & Gardens",
        "href": "https://www.homesandgardens.com/decor/ikea-kompishang-collection-announcement"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/ikea-kompishang-portable-furniture.png",
      "alt": "A furnished living-room display inside an IKEA store.",
      "credit": "IKEA living-room display, Rostov-on-Don; photo by Vyacheslav Argenberg, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "For centuries the Mongols of the Eurasian steppe solved the problem IKEA's designers rediscovered: how to own a home and still be free to move. Their answer was the ger, a round dwelling of felt stretched over a collapsible lattice of interlaced sticks, warm, weatherproof, and light enough to be struck, folded, and reassembled in an afternoon. The Flemish friar William of Rubruck, who crossed the Mongol lands in 1253-55, was astonished to find whole houses that were not taken apart at all but simply hoisted onto giant ox-drawn carts and rolled across the grass, home and hearth trundling behind the herds. Where IKEA's Kompishang offers a side table you can carry over your arm and stools that stack for the next apartment, the Mongols engineered the entire house for portability, a civilization built on the premise that dwelling and journey need not be opposites. Both reflect the same instinct, that a home should serve a life in motion rather than pin it in place. The steppe rider and the young London renter alike measure their furniture by whether it can move when they do.",
        "excerpt": "And they make these houses so large that they are sometimes thirty feet in width. I myself once measured the width between the wheel-tracks of a cart twenty feet, and when the house was on the cart it projected beyond the wheels on either side five feet at least.",
        "source": "William of Rubruck, The Journey of William of Rubruck to the Eastern Parts of the World, 1253-1255, trans. William Woodville Rockhill (Hakluyt Society, 1900), on Mongol felt dwellings carried on carts.",
        "href": "https://depts.washington.edu/silkroad/texts/rubruck.html",
        "image": {
          "src": "/covers/ikea-kompishang-portable-furniture--a0.png",
          "alt": "Model of a Mongol ger (felt tent) mounted on a wheeled cart.",
          "credit": "Photo by Gary Todd, Wikimedia Commons, CC0 (public domain dedication)."
        }
      },
      {
        "category": "historical",
        "title": "The Roman legionary carried his household on his back. On the march he shouldered a forked pole, the furca, hung with everything he owned and needed, so laden that soldiers nicknamed themselves 'Marius' mules,' and Josephus, watching the imperial army in the first century, marveled that a foot soldier scarcely needed a pack animal at all. His kit was a study in disciplined minimalism: a saw, a basket, a pick-axe and an axe, a leather strap and a hook, and three days' rations, the tools not just to survive but to build a fortified camp fresh each night and abandon it each dawn. This is portability as design philosophy, every object earning its weight, the whole self reduced to what one person can bear and reuse. IKEA's Kompishang, born from watching twenty-somethings shuttle between short-term London rentals, chases the same discipline in domestic form: interlocking pieces, low weight, nothing you cannot lift and take with you. The legionary and the renter both live by the logic that possessions are burdens first and comforts second, and that mobility is bought by owning less. What the empire demanded of its soldiers, the housing market now quietly demands of the young.",
        "excerpt": "the rest of the foot soldiers have a spear and a long buckler, besides a saw and a basket, a pick-axe and an axe, a thong of leather and a hook, with provisions for three days, so that a footman hath no great need of a mule to carry his burdens.",
        "source": "Flavius Josephus, The Wars of the Jews, Book III, Chapter 5, trans. William Whiston, describing the equipment carried by a Roman foot soldier on the march.",
        "href": "https://www.gutenberg.org/cache/epub/2850/pg2850.txt",
        "image": {
          "src": "/covers/ikea-kompishang-portable-furniture--a1.png",
          "alt": "Detail of a Roman relief showing a legionary's sarcina, the marching pack carried on a forked pole.",
          "credit": "Photo by Gaius Cornelius, Wikimedia Commons, public domain."
        }
      },
      {
        "category": "literary",
        "title": "Homer's Odyssey is the West's founding poem of the wanderer, a man who spends ten years unable to reach the one fixed place he calls home. Its very first lines announce a hero defined not by a throne or a hearth but by travel, 'that ingenious hero who travelled far and wide,' a soul measured by the cities he sees and the sea that tosses him. Odysseus survives on cunning, adaptability, and the few things he can carry or improvise, building a raft from scattered timber when a whole fleet has been lost. The poem holds in tension the very themes IKEA names in its Kompishang collection, permanence and portability: the ache for a settled Ithaca against a life spent perpetually in motion, camping in caves and strangers' halls. Odysseus is the ancestor of every young renter who dreams of a permanent home while living out of what fits in a bag, learning that identity can survive the loss of a fixed address. The oldest story we tell about coming home is really a story about how long one can live without one.",
        "excerpt": "Tell me, O Muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home;",
        "source": "Homer, The Odyssey, Book I, opening lines, trans. Samuel Butler (1900).",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt",
        "image": {
          "src": "/covers/ikea-kompishang-portable-furniture--a2.png",
          "alt": "Engraving of Odysseus adrift on his makeshift raft receiving a veil from the sea-goddess Leucothea.",
          "credit": "William Bromley after Henry Fuseli, 1806, British Museum, via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau went to Walden Pond in 1845 to strip life down to essentials, and the book he wrote there is an extended argument that our possessions own us as much as we own them. In the 'Economy' chapter he pities not the poverty of the migrant he passes on the road but the sheer weight of the bundle on his back, the load of belongings that has become a burden grown out of the body itself. Thoreau's ideal is a life light enough to pick up and carry, unencumbered by the trunks and boxes and furniture that most people spend their years accumulating and dragging behind them. This is precisely the intuition behind IKEA's Kompishang, a range shaped for renters who move so often that every heavy or unwieldy object becomes a liability, and whose freedom depends on owning things they can lift alone. Thoreau would have recognized the interlocking stool and the table carried like a handbag as steps toward his own creed: that we are rich in proportion to what we can afford to let go. The wanderer's few possessions are not a deprivation but, in his telling, a kind of liberation.",
        "excerpt": "When I have met an immigrant tottering under a bundle which contained his all—looking like an enormous wen which had grown out of the nape of his neck—I have pitied him, not because that was his all, but because he had all that to carry.",
        "source": "Henry David Thoreau, Walden; or, Life in the Woods, chapter 'Economy' (1854).",
        "href": "https://www.gutenberg.org/files/205/205-0.txt",
        "image": {
          "src": "/covers/ikea-kompishang-portable-furniture--a3.png",
          "alt": "Daguerreotype portrait of Henry David Thoreau.",
          "credit": "Benjamin D. Maxham, 1856 daguerreotype (restored), via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "In August 1888, near Arles, Vincent van Gogh painted a little cluster of travelers' wagons drawn up in a field, the red and green caravans of a fairground people camped for the night with their horses grazing beside them. He described it to his brother Theo as a study of 'a camp of gypsies,' and the picture radiates a peculiar peace, homes on wheels resting briefly in open country before rolling on. These caravans are portable dwellings in the most literal sense, everything a family owns folded into a box that moves, the same balance of permanence and portability that IKEA now markets to young renters who furnish rooms they will soon leave behind. Van Gogh, himself a restless wanderer who moved from city to city and rarely kept a settled home, was drawn to the beauty of a life lived on the road and to the dignity of people who carry their dwelling with them. The painting turns transience into something luminous rather than pitiable, a home that is nowhere and everywhere. It is the pastoral ancestor of the flat-pack apartment, proof that the movable home has always had its own quiet poetry.",
        "excerpt": "A small oil study of a wandering fairground people's encampment: two red-and-green caravans stand in a sunlit field with their wheels bright against the grass, tethered horses graze at the left, and a few tiny figures move among the wagons under a high summer sky. The whole home of each family is contained in a painted wooden box on wheels, ready to move on at dawn, so that settlement and journey occupy the same peaceful frame.",
        "source": "Vincent van Gogh, The Caravans, Gypsy Camp near Arles (Les roulottes, campement de bohémiens aux environs d'Arles), oil on canvas, 1888, Musée d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Vincent_van_Gogh-_The_Caravans_-_Gypsy_Camp_near_Arles.JPG",
        "image": {
          "src": "/covers/ikea-kompishang-portable-furniture--a4.png",
          "alt": "Van Gogh painting of red and green gypsy caravans camped in a field with grazing horses.",
          "credit": "Vincent van Gogh, 1888, Musée d'Orsay, via Wikimedia Commons, public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Franz Schubert's Winterreise (Winter Journey), composed in 1827 to twenty-four poems by Wilhelm Müller, is the supreme musical portrait of the homeless wanderer. Its very first song, 'Gute Nacht,' opens with one of the loneliest lines in all of song, the traveler noting that he came a stranger and departs a stranger, setting out alone into the snow with no fixed place to go. Across the cycle the wanderer carries almost nothing, a staff, a memory, the frozen landscape his only companion, an image of the human being reduced to what can be borne through the dark. Where IKEA's Kompishang frames transience as a design challenge to be met with cheerful, carriable furniture, Schubert dwells in its melancholy, the ache of a life without a settled hearth, the impermanence that shadows every departure. Yet both speak to the same modern condition, the person who arrives and leaves, arrives and leaves, never quite unpacking. Müller's verses, sung in Schubert's leaden, trudging rhythms, make audible the emotional weather of a rootless life that the flat-pack age has only intensified. To be always able to move is also, the songs remind us, to be always leaving.",
        "excerpt": "Fremd bin ich eingezogen,\nFremd zieh' ich wieder aus.\nDer Mai war mir gewogen\nMit manchem Blumenstrauß.\nDas Mädchen sprach von Liebe,\nDie Mutter gar von Eh' —\nNun ist die Welt so trübe,\nDer Weg gehüllt in Schnee.",
        "source": "Wilhelm Müller, 'Gute Nacht,' opening song of Die Winterreise (1824), set to music by Franz Schubert as Winterreise, D. 911 (1827).",
        "href": "https://de.wikisource.org/wiki/Die_Winterreise_(M%C3%BCller)",
        "image": {
          "src": "/covers/ikea-kompishang-portable-furniture--a5.png",
          "alt": "Portrait of the composer Franz Schubert.",
          "credit": "Wilhelm August Rieder (oil after his 1825 watercolour), via Wikimedia Commons, public domain."
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "air-india-crash-report-october",
    "headline": "India's crash investigators tell the Supreme Court the final report on the Air India 787 disaster that killed 260 may be ready in October",
    "overview": "India's Aircraft Accident Investigation Bureau told the Supreme Court in an affidavit that a draft final report on the June 12, 2025 crash of an Air India Boeing 787 Dreamliner could be ready in about six weeks, around October, saying it had completed 49 of the 66 mandated investigative steps and was in the 'analysis phase.' The bureau said it had transcribed the cockpit voice recorder and, unusually, commissioned a 'psychological autopsy' assessing one or more crew members, but disclosed no findings. The Ahmedabad crash killed 260 people, 241 on board and 19 on the ground, with a single survivor.",
    "genre": "Science",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cjrgrgx2d9qo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxPNmRiTGh4Y0ZlV3Vjd1ZxRkN6d3FaZGQtdlBJb0JseHJPSkdsaUNaS2NUOGpzeWJJQk45X2NpS3Z6eUxreDJDVXZCU1pOT1hnTGNaSWZNNElCSWcybm1Vd05CVDJ3cFoxTHVjdmJCMFRnZFZEZF9tX0Nhb0Yxc3ZEYTBZWl9sbW02QzdrSmt0T3BHQnhkSmtqeUhmYjRTWVNoOWJiS2RUV1pWUFNFV0hJOWExVlM1ZWRMUXI2V0twNXFDX1VTX3c?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/air-india-crash-report-october.png",
      "alt": "An image related to the Air India crash investigation.",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the summer of 79 AD, when Vesuvius buried Pompeii and Herculaneum, the naturalist Pliny the Elder died sailing toward the eruption to observe it, and years later his nephew, Pliny the Younger, wrote two letters to the historian Tacitus that survive as the first great forensic reconstruction of a catastrophe. Working from memory and the testimony of others, the younger Pliny assembled a patient, dispassionate account of the towering cloud, the falling ash, the panic and the final hours, so exact that geologists still call sudden vertical volcanic eruptions 'Plinian' in his honor. His letters embody the same impulse that drives India's crash investigators: to gather every scrap of evidence and set down, calmly and truthfully, exactly what happened and why. The elder Pliny's fatal curiosity, his need to sail closer and understand the phenomenon, mirrors the investigator's duty to move toward the disaster rather than away from it. Across nearly two thousand years, the effort to name the cause of a sudden death from the sky, and to preserve the truth of it for those who come after, connects the affidavit before the Supreme Court to a young Roman's letters to his friend.",
        "excerpt": "The old philosopher, anxious to get a nearer view of what was happening, ordered one of the light vessels belonging to the fleet to be manned.",
        "source": "Pliny the Younger, Letters, Book VI, Letter XVI (to Cornelius Tacitus), on the eruption of Vesuvius and the death of the elder Pliny, c. 106 AD; English rendering by Alfred John Church and William Jackson Brodribb.",
        "href": "https://en.wikisource.org/wiki/Pliny%27s_Letters/Chapter_2",
        "image": {
          "src": "/covers/air-india-crash-report-october--a0.png",
          "alt": "A night painting of Vesuvius erupting, fire and smoke over the Bay of Naples.",
          "credit": "Joseph Wright of Derby, 'Vesuvius in Eruption, with a View over the Islands in the Bay of Naples' (c. 1776-80). Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "historical",
        "title": "On the night of 5 October 1930, His Majesty's Airship R101, the largest flying craft in the world and the pride of Britain's Imperial Airship Scheme, went down in flames on a hillside near Beauvais in France on its maiden voyage to India, killing 48 of the 54 people aboard, including the Air Minister who had championed it. The government convened a formal Court of Inquiry that painstakingly sifted the wreckage, weighed the gasbags and girders, reconstructed the weather and the ship's loss of gas and lift, and questioned whether political haste had sent an untested craft into the sky before it was ready. It is one of the classic modern disaster inquiries into a fall from the heavens, an attempt to hold a machine, its makers and its masters accountable through methodical evidence. The parallels to the Air India Dreamliner investigation are close: a proud aircraft bound for or from India, a sudden plunge, a nation demanding to know the cause, and investigators reckoning with both metal fatigue and human ambition. Then as now, the inquiry had to disentangle mechanical failure from the human factor, the decisions and pressures that put people in the path of catastrophe.",
        "excerpt": "The R101 inquiry stands as one of the twentieth century's defining disaster investigations: officials laid out the scorched girders and torn gasbags, mapped the airship's final loss of height, and probed whether pride and political impatience had pushed an unproven vessel skyward too soon. Its careful weighing of structure against human decision prefigures the modern crash report, where forensic method meets the harder question of why people flew when they did.",
        "source": "Report of the R101 Inquiry (Court of Inquiry into the loss of the airship R101), presented to Parliament, 1931; UK National Archives educational resource on the R101 airship disaster.",
        "href": "https://www.nationalarchives.gov.uk/education/resources/thirties-britain/r101-airship-disaster/",
        "image": {
          "src": "/covers/air-india-crash-report-october--a1.png",
          "alt": "The tangled, burnt-out metal skeleton of the crashed airship R101.",
          "credit": "Photograph of the R101 wreckage, 5 October 1930, UK Government. Public domain (Crown copyright expired), via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the eighth book of Ovid's Metamorphoses, the master craftsman Daedalus fashions wings of feathers and wax so that he and his son Icarus can escape their island prison by air, warning the boy to fly a middle course, neither too low toward the sea nor too high toward the sun. Intoxicated by flight, Icarus soars upward; the sun softens the wax, the feathers scatter, and he plunges into the sea that now bears his name, while his grieving father searches the empty water and finds only floating plumes. It is the founding myth of human flight and its price, the oldest cautionary tale about machines that carry us into the sky and the disaster that follows when something in them fails. Ovid's lines fuse two truths that any crash report must hold together: the wonder of flight and the terrible physics of the fall. As India's investigators transcribe a cockpit voice recorder and reconstruct the last moments of a Dreamliner, they are, in a sense, doing what Daedalus did over the waves, searching the wreckage for the son, for the cause, for the meaning of a fall from the heavens.",
        "excerpt": "but as he neared the scorching sun, its heat / softened the fragrant wax that held his plumes; / and heat increasing melted the soft wax— / he waved his naked arms instead of wings, / with no more feathers to sustain his flight. / And as he called upon his father's name / his voice was smothered in the dark blue sea",
        "source": "Ovid, Metamorphoses, Book VIII (Daedalus and Icarus), c. 8 AD; English translation by Brookes More (1922).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=8:card=183",
        "image": {
          "src": "/covers/air-india-crash-report-october--a2.png",
          "alt": "A painting of the fallen Icarus, wings spread, mourned by nymphs on a rock above the sea.",
          "credit": "Herbert James Draper, 'The Lament for Icarus' (1898), Tate. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "literary",
        "title": "Sophocles' Oedipus the King opens on a city stricken by plague, and its hero, the ruler who once solved the riddle of the Sphinx, vows to hunt down the hidden cause of the catastrophe and drag it into the light, unaware that the investigation will lead back to himself. The play is the archetype of forensic truth-seeking: a relentless inquiry that follows the evidence wherever it goes, cross-examining witnesses and reconstructing a fatal event from testimony, until the buried truth stands revealed. That is precisely the discipline of a modern accident investigation, which must pursue the cause without flinching, even when the trail runs toward uncomfortable human failings rather than simple mechanical fault. The bureau's unusual step of commissioning a 'psychological autopsy' of the crew gives the parallel a sharp edge: like Oedipus, the inquiry probes the human heart as well as the outward disaster, knowing the answer may implicate a person and not only a machine. Sophocles understood that the search for the cause is itself a kind of tragedy, demanding courage to keep looking when one senses what may be found.",
        "excerpt": "Well, I will start afresh and once again / Make dark things clear. Right worthy the concern / Of Phoebus, worthy thine too, for the dead; / I also, as is meet, will lend my aid / To avenge this wrong to Thebes and to the god.",
        "source": "Sophocles, Oedipus Rex (Oedipus the King), c. 429 BC; English translation by Francis Storr (Loeb Classical Library, 1912).",
        "href": "http://classics.mit.edu/Sophocles/oedipus.html",
        "image": {
          "src": "/covers/air-india-crash-report-october--a3.png",
          "alt": "A painting of Oedipus confronting the winged Sphinx on a rocky crag.",
          "credit": "Gustave Moreau, 'Oedipus and the Sphinx' (1864), Metropolitan Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'Landscape with the Fall of Icarus' is one of the most quietly devastating paintings in Western art: a broad, sunlit scene of a ploughman, a shepherd and a merchant ship going peacefully about their day, while in one corner a pair of pale legs vanishes into the sea, the only trace of Icarus's fatal plunge. The painting is a meditation on how catastrophe from the sky can pass almost unnoticed by an indifferent world, the great disaster reduced to a splash at the edge of an ordinary afternoon. It resonates with the aftermath of a modern air crash, where a machine falls out of a clear sky and the world's daily business resumes even as a single, terrible event marks the families and the investigators who cannot look away. The work insists on the smallness of the falling body against the vastness of sea and sky, and on the labor of those, the ploughman then, the investigator now, who keep working the ground while the reckoning goes on nearby. To reconstruct such a fall, to refuse to let it disappear into the corner of the canvas, is the quiet moral duty a crash inquiry performs.",
        "excerpt": "Across a luminous coastal landscape a farmer drives his plough and ships sail on, while in the lower right only two thrashing legs and a scatter of feathers mark where Icarus has struck the water. The catastrophe is pushed to the margin, tiny against the wide indifferent world, so that the eye must search to find the fall at all, an image of how easily a death from the sky can slip past a world intent on its own affairs.",
        "source": "After Pieter Bruegel the Elder, 'Landscape with the Fall of Icarus,' c. 1555-1560, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/air-india-crash-report-october--a4.png",
          "alt": "A sunlit landscape with a ploughman and ships, and Icarus's legs disappearing into the sea in the corner.",
          "credit": "After Pieter Bruegel the Elder, 'Landscape with the Fall of Icarus' (c. 1555-60), Royal Museums of Fine Arts of Belgium. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart's Requiem in D minor, K. 626, left unfinished at the composer's death in 1791 and completed by his pupils, is the West's supreme musical reckoning with sudden death, a Mass for the dead that moves from trembling dread to consolation. Its opening prayer, 'Requiem aeternam dona eis, Domine' (Grant them eternal rest, O Lord), and the anguished 'Lacrimosa' that breaks off where Mozart's own hand stopped, give voice to grief in the face of catastrophe and to the human need to mourn the many at once. When 260 people die in a single instant of falling metal and fire, it is the requiem, more than any report, that can hold the scale of the loss, honoring the 241 aboard, the 19 on the ground and the one who survived. The forensic labor of the crash investigators and the sacred labor of a requiem are complementary answers to the same event: one seeks the cause, the other seeks to grieve and to grant rest. That Mozart's masterpiece was itself left incomplete, a work interrupted by death and finished by others, quietly mirrors an inquiry still in its 'analysis phase,' its final report yet to be written.",
        "excerpt": "Requiem aeternam dona eis, Domine: et lux perpetua luceat eis.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K. 626 (Introitus), 1791, completed by Franz Xaver Süssmayr; text from the Latin Requiem Mass.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/air-india-crash-report-october--a5.png",
          "alt": "A page of Mozart's handwritten Requiem manuscript with staves and inked notation.",
          "credit": "Autograph manuscript page of Mozart's Requiem, K. 626 (Austrian National Library). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "nigeria-fake-agency-boss-arrested",
    "headline": "Nigerian police arrest Adeniyi Adeyemi, head of a bogus presidential investment agency, after weeks on the run",
    "overview": "Nigerian police arrested Adeniyi Adeyemi, who styled himself director-general of a fictitious Presidential Foreign Investment Promotion Council set up inside President Bola Tinubu's office, in Osun State after weeks in hiding. His arrest followed a Federal High Court bench warrant issued in Abuja when he failed to appear to face forgery and impersonation charges; investigators say the signature of the president's chief of staff on his appointment letter had been forged. The scandal, which prompted Tinubu to order a corruption investigation, has gripped Nigeria and spurred calls from civil-society groups and lawmakers for an independent inquiry.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/c17y7ykzgrgo"
      },
      {
        "name": "The Punch",
        "href": "https://punchng.com/breaking-police-confirm-arrest-of-fake-agency-dg-adeyemi-in-osun/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/nigeria-fake-agency-boss-arrested.png",
      "alt": "An image related to Nigeria's fake presidential agency scandal.",
      "credit": "BBC"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the chaos of Russia's Time of Troubles, a young man appeared claiming to be Dmitry Ivanovich, the youngest son of Ivan the Terrible, a prince who had in fact died as a child in 1591. Backed by Polish nobles and the Jesuits, this False Dmitry I invaded Russia in 1604, and after the sudden death of Tsar Boris Godunov he was crowned Tsar of All Russia, reigning for eleven months before he was exposed and murdered in the Moscow uprising of 1606. His whole authority rested on a manufactured identity, a borrowed royal name grafted onto a nobody, exactly as Adeniyi Adeyemi grafted himself onto President Tinubu's office by inventing a 'Presidential Foreign Investment Promotion Council' and a director-generalship that never existed. Two more pretenders would follow him, each claiming to be the same resurrected prince, proof of how a well-timed impersonation can seize the machinery of a state. Like the Nigerian impostor, the False Dmitry wielded real power on a forged basis until the fraud was uncovered and he was violently unmasked. Both stories turn on the terrifying ease with which a fabricated office or bloodline can be made to look official.",
        "excerpt": "During the Time of Troubles, a low-born adventurer took on the name of a dead royal child and rode a forged identity all the way to the throne of Moscow. For eleven months the counterfeit prince gave orders as Tsar, his fictitious pedigree accepted at the highest levels of the state. When the fraud was finally seen through, the pretender was cut down and his brief, invented sovereignty collapsed as quickly as it had arisen.",
        "source": "\"False Dmitry,\" Encyclopaedia Britannica (entry on the three Russian pretenders of the Time of Troubles, 1598-1613).",
        "href": "https://www.britannica.com/topic/False-Dmitry",
        "image": {
          "src": "/covers/nigeria-fake-agency-boss-arrested--a0.png",
          "alt": "Early seventeenth-century portrait of False Dmitry I, the Russian pretender.",
          "credit": "Portrait of False Dmitry I (early 17th century). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Victor Lustig, an Austro-Hungarian con man of the 1920s, staged one of history's most audacious impersonations of official authority when he 'sold' the Eiffel Tower for scrap metal, not once but twice. Reading that the ageing tower was costly to maintain, Lustig had counterfeit government stationery printed, installed himself in a suite at the Hotel de Crillon, and posed as a deputy director-general of the Ministry of Posts and Telegraphs empowered to dispose of the monument. He summoned Paris scrap dealers to a confidential meeting, invented a plausible bureaucratic pretext for the demolition, and walked away with a fortune in bribes and payment before fleeing the country. His fraud is the near-perfect ancestor of Adeniyi Adeyemi's scheme: a swindler manufacturing a fake government post, forged official paper, and an air of state sanction to extract money and prestige. Both men understood that in a large bureaucracy an impressive letter and a confident title can substitute for a real appointment. And both, in the end, were pursued and caught once their invented authority unraveled.",
        "excerpt": "Posing as a ranking official of a French ministry, Lustig used forged government letterhead and a rented hotel suite to convince scrap dealers that he was authorized to sell the Eiffel Tower. He invented an entire bureaucratic pretext, collected his marks' money, and vanished before anyone thought to check whether the office or the authority behind it truly existed. It was theater dressed as officialdom, a fictitious government mandate sold at a profit.",
        "source": "Jeff Maysh, \"The Man Who Sold the Eiffel Tower. Twice.,\" Smithsonian Magazine, March 9, 2016.",
        "href": "https://www.smithsonianmag.com/history/man-who-sold-eiffel-tower-twice-180958370/",
        "image": {
          "src": "/covers/nigeria-fake-agency-boss-arrested--a1.png",
          "alt": "1935 police mugshot of the con man Victor Lustig.",
          "credit": "Victor Lustig, 1935 U.S. federal mugshot. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Nikolai Gogol's 1836 comedy The Government Inspector is the definitive fable of the fake official and the bureaucracy that fools itself into believing him. In a corrupt provincial town, the petty, penniless clerk Khlestakov is mistaken for a powerful inspector-general traveling incognito, and the terrified local officials shower him with bribes, flattery, and lodging while he blithely plays along, inflating his own importance with ever grander lies. Gogol's genius is to show that the impostor barely has to act; the officials' own guilt and awe do the work of inventing his authority, much as a forged appointment letter and the aura of the president's office lent Adeniyi Adeyemi a power he never held. The play ends with the famous arrival of the real inspector, the pretender exposed only after the town has already debased itself, a mirror of the belated bench warrant and arrest in Nigeria. Both the fiction and the news story pivot on bureaucratic fraud, on how easily a title unattached to any real office commands obedience. Gogol turned that recognition into the most enduring satire of officialdom ever written.",
        "excerpt": "I have called you together, gentlemen, to tell you an unpleasant piece of news. An Inspector-General is coming.",
        "source": "Nikolai Gogol, The Inspector-General, trans. Thomas Seltzer, Act I (Project Gutenberg eBook #3735).",
        "href": "https://www.gutenberg.org/files/3735/3735-h/3735-h.htm",
        "image": {
          "src": "/covers/nigeria-fake-agency-boss-arrested--a2.png",
          "alt": "Cover of the first edition of Gogol's play The Government Inspector (Revizor), 1836.",
          "credit": "First edition of Gogol's Revizor (The Government Inspector), 1836. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Herman Melville's last novel, The Confidence-Man: His Masquerade (1857), is a dark meditation on the very archetype the Nigerian scandal revives, the swindler who trades in nothing but manufactured trust. Set aboard a Mississippi steamboat on the first of April, the book follows a shape-shifting figure, possibly a single confidence man in many disguises, who moves among the passengers soliciting their faith, their charity, and ultimately their money on false pretenses. Melville drew on the real-world 'original confidence man' of 1850s New York, and his stranger asks again and again only that people 'have confidence' in him, the same currency Adeniyi Adeyemi exploited when he presented forged papers and a fictitious council to command belief. The novel refuses to resolve who the trickster really is, dramatizing how identity and authority can be endlessly counterfeited in a society eager to be persuaded. Like the fake director-general operating inside the machinery of government, Melville's masquerader thrives precisely because institutions and individuals want to believe the confident face before them. It is the great American parable of the impostor.",
        "excerpt": "At sunrise on a first of April, there appeared, suddenly as Manco Capac at the lake Titicaca, a man in cream-colors, at the water-side in the city of St. Louis.",
        "source": "Herman Melville, The Confidence-Man: His Masquerade (1857), Chapter I (Project Gutenberg eBook #21816).",
        "href": "https://www.gutenberg.org/files/21816/21816-h/21816-h.htm",
        "image": {
          "src": "/covers/nigeria-fake-agency-boss-arrested--a3.png",
          "alt": "First edition title page of Herman Melville's The Confidence-Man, 1857.",
          "credit": "First edition title page of The Confidence-Man, 1857. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Caravaggio's The Cardsharps (I Bari), painted around 1596-1597 and now in the Kimbell Art Museum, is one of art history's most influential images of deception in the act. It shows an innocent, well-dressed youth absorbed in a card game while an older accomplice peers over his shoulder and signals with a gloved hand, and a young cheat at the right reaches behind his back to pull a hidden card, a dagger tucked at his waist. Caravaggio freezes the precise moment before the dupe is fleeced, capturing the choreography of a con: the disguise of respectability, the concealed instrument of fraud, the mark who cannot see what everyone else can. That is the same tableau exposed in Nigeria, where a plausible facade of legitimacy masked a hidden mechanism of forgery and false authority. The gulled cardplayer stands in for a bureaucracy taken in by a confident fraud, the concealed card for the forged signature on a fake appointment letter. Caravaggio makes visible the very anatomy of trickery, the pretender at work moments before the trap is sprung.",
        "excerpt": "Caravaggio paints the con in mid-motion: a naive, richly dressed youth studies his hand while an older sharper spies his cards and flashes a signal with a torn glove, and his young partner slips a concealed card from behind his back. The scene captures deception as a coordinated performance, the smiling accomplice, the hidden card, the mark who trusts the polished surface before him. It is the anatomy of fraud rendered a heartbeat before the victim realizes he has been played.",
        "source": "Caravaggio (Michelangelo Merisi da Caravaggio), The Cardsharps (I Bari), c. 1596-1597, oil on canvas, Kimbell Art Museum, Fort Worth.",
        "href": "https://en.wikipedia.org/wiki/The_Cardsharps",
        "image": {
          "src": "/covers/nigeria-fake-agency-boss-arrested--a4.png",
          "alt": "Caravaggio's painting The Cardsharps, showing a young dupe and two card cheats.",
          "credit": "Caravaggio, The Cardsharps (c. 1596-1597), Kimbell Art Museum. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky's opera Boris Godunov (first version 1869) sets to music the same Russian drama of the impostor tsar, giving the False Dmitry story its grandest artistic form. At its heart is Grigory Otrepyev, a runaway monk who, learning that the murdered prince Dmitry would have been his own age, resolves to impersonate the dead heir and claim the throne, appearing in Poland as the risen tsarevich and marching on Moscow. Mussorgsky counterpoints the guilt-haunted, legitimate ruler Boris against this brazen pretender whose entire claim is a fabrication, dramatizing how a false identity can shake the foundations of a state. The parallel to the Nigerian case is exact in spirit: an ambitious man invents a grand official persona, forges the credentials of legitimacy, and exploits a nation's institutions until he is exposed. In both the opera and the news, the pretender's rise indicts the credulity and disorder around him as much as his own audacity. Sung on the world's great stages, Boris Godunov endures as the definitive musical portrait of the counterfeit official and the pretender unmasked.",
        "excerpt": "Mussorgsky's score pits the tormented Tsar Boris against the runaway monk Grigory, who seizes on the dead prince Dmitry's name to fashion himself a false heir and lay claim to the throne. The music charges the impostor's rise with menace and grandeur, showing a whole realm thrown into crisis by one man's fabricated identity. It is the pretender's masquerade set to some of the most powerful choral and dramatic writing in all of opera.",
        "source": "Modest Mussorgsky, Boris Godunov (opera, 1869 original version), based on Pushkin and the historical False Dmitry.",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)",
        "image": {
          "src": "/covers/nigeria-fake-agency-boss-arrested--a5.png",
          "alt": "Alexander Golovin's 1912 portrait of Fyodor Chaliapin costumed as Boris Godunov.",
          "credit": "Alexander Golovin, Portrait of Fyodor Chaliapin in the Role of Boris Godunov (1912). Public domain, via Wikimedia Commons (Google Art Project)."
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "robert-wun-balloon-couture-gown",
    "headline": "Robert Wun closes his 'Childsplay' Paris couture show with a black gown enveloped in a cloud of balloons",
    "overview": "At Paris Haute Couture Week, designer Robert Wun closed his Autumn/Winter 2026 'Childsplay' collection with a monumental black gown crowned by a chaotic cloud of custom-made balloons, a collection built on the tension between exacting couture craftsmanship and childhood imagination. Real balloons jutted from tailored looks and studded the crinoline of an otherwise conservative silhouette as 'a nod to the transience of infancy,' in a show Dezeen singled out for its spectacle. The finale followed a white look trimmed with translucent balloons before the vivid, multicolored black gown.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/15/robert-wun-haute-couture-dress-balloons-childsplay/"
      },
      {
        "name": "WWD",
        "href": "https://wwd.com/runway/fall-couture-2026/paris/robert-wun/review/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/robert-wun-balloon-couture-gown.png",
      "alt": "A bunch of brightly coloured balloons.",
      "credit": "Colourful balloons; photo by Daniel Hsia, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 19 September 1783 the Montgolfier brothers floated a great paper-and-linen balloon above the courtyard of Versailles, sending a sheep, a duck and a rooster aloft before a spellbound court while a cannon marked the ascent. It was the age's supreme spectacle: mere heated air, invisible and weightless, was suddenly given a vast rounded body that climbed into the sky before the eyes of thousands. Like Robert Wun's balloons crowning a couture gown, the Montgolfiere turned breath and air into a fragile, buoyant form that hovered between craft and wonder, magnificent precisely because it could not last. The balloon of 1783 was a bubble the size of a house, celebrated for its rise even as everyone knew it must sink; the same tension between the inflated marvel and its inevitable descent animates Wun's cloud of latex spheres, an emblem of the transient made monumental. Both stage the intoxicating moment when the ephemeral is lifted up and applauded, air itself dressed for a crowd.",
        "excerpt": "At the Château de Versailles on 19 September 1783, the Montgolfier brothers launched a hot-air balloon carrying a sheep, a duck and a rooster before the king and an astonished crowd. Heated air alone filled the towering sphere, which rose some hundreds of metres and drifted for minutes before settling back to earth. The flight, one of the first in history, made an ephemeral thing of air and fire into a public marvel.",
        "source": "The first hot air balloon flight, 19 September 1783, Château de Versailles; contemporary print of the 1783 Montgolfier balloon demonstration (Library of Congress).",
        "href": "https://en.chateauversailles.fr/discover/history/key-dates/first-hot-air-balloon-flight",
        "image": {
          "src": "/covers/robert-wun-balloon-couture-gown--a0.png",
          "alt": "Period engraving of a 1783 Montgolfier hot-air balloon rising before a crowd of onlookers.",
          "credit": "Contemporary print of the 1783 Montgolfier balloon, Library of Congress, via Wikimedia Commons. Public domain."
        }
      },
      {
        "category": "historical",
        "title": "In the ancient Etruscan and Roman world a freeborn child was hung with a bulla, a rounded locket of gold or leather worn at the neck as an amulet against harm, laid aside only when the boy came of age and put on the adult toga. This small swollen pendant, often shaped like a little bubble, was the badge of a protected, unfinished life, a token of innocence meant to be outgrown. One surviving Etruscan example is embossed with Daedalus and Icarus, the father who fashioned wings from wax and feathers and the son whose flight ended in a fall, so that a charm for a child carried within it a warning about air, ascent and ruin. That pairing speaks directly to Robert Wun's 'Childsplay' balloons studding a solemn couture silhouette 'as a nod to the transience of infancy.' Like the bulla, the balloon is a rounded, fragile thing bound to childhood and destined to be relinquished; like the Icarus it depicts, it is buoyed on air only to be given up. Both objects fix a truth about play: it is precious because it is brief.",
        "excerpt": "The bulla was a rounded amulet-case worn by freeborn Roman children, a protective charm hung at the neck and set aside at the passage into adulthood. Made of gold for the wealthy and leather for the poor, its swelling, bubble-like form marked the wearer as a child under protection. One Etruscan bulla is worked with the story of Daedalus and Icarus, joining the emblem of childhood to the myth of flight and fall.",
        "source": "Bulla (amulet); Etruscan bulla with Daedalus and Icarus, ca. 5th–4th century BCE, The Walters Art Museum (57.371).",
        "href": "https://en.wikipedia.org/wiki/Bulla_(amulet)",
        "image": {
          "src": "/covers/robert-wun-balloon-couture-gown--a1.png",
          "alt": "Gold Etruscan bulla amulet embossed with the figures of Daedalus and Icarus.",
          "credit": "Etruscan bulla with Daedalus and Icarus, The Walters Art Museum (57.371), via Wikimedia Commons. Public domain (CC0)."
        }
      },
      {
        "category": "literary",
        "title": "The Preacher of Ecclesiastes opens with the most famous meditation on transience in Western scripture, condensing all human striving into a single breath: 'Vanity of vanities; all is vanity.' The Hebrew word behind 'vanity,' hevel, literally means a vapour or a puff of breath, so the verse imagines every labour and pleasure as something exhaled and instantly gone, air that briefly takes shape and then disperses. This is the exact register of Robert Wun's balloons, forms swollen with breath and celebrated for a moment before they must deflate, vanity made buoyant and beautiful. The Preacher watches generations rise and pass 'as another generation cometh,' just as a couture balloon inflates only to shrink, spectacle understood from the first as passing. Where the moralist finds sober warning, Wun finds tender play, but both hold the same object to the light: the inflated, glittering thing that cannot keep its air. It is the oldest lesson of the bubble, spoken here as prophecy.",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. What profit hath a man of all his labour which he taketh under the sun? One generation passeth away, and another generation cometh: but the earth abideth for ever.",
        "source": "Ecclesiastes 1:2–4, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
        "image": {
          "src": "/covers/robert-wun-balloon-couture-gown--a2.png",
          "alt": "A vanitas still life with a human skull, books, a shell and an extinguished lamp.",
          "credit": "Harmen Steenwyck, 'Still Life: An Allegory of the Vanities of Human Life,' National Gallery, London, via Wikimedia Commons. Public domain."
        }
      },
      {
        "category": "literary",
        "title": "Wordsworth's great ode mourns the fading of a radiance that surrounds us in infancy and dims as we grow, the childhood vision in which 'every common sight' seemed 'apparelled in celestial light.' He imagines the newborn arriving from a brighter home 'trailing clouds of glory,' only for 'the prison-house' of ordinary adult life to close slowly around 'the growing Boy.' The poem is an elegy for lost innocence, for a luminous ease of wonder that cannot be kept, and it turns childhood itself into something ephemeral, glorious in the having and painful in the losing. Robert Wun's 'Childsplay' collection, with real balloons offered 'as a nod to the transience of infancy,' stages precisely this ache in couture: the balloon is the child's glory made visible, buoyant and shining, and doomed to sink. Like Wordsworth's clouds of glory, the balloons rise trailing brightness and then must settle, drift or burst. The gown becomes an ode of its own to the freshness of a dream that will not last.",
        "excerpt": "But trailing clouds of glory do we come / From God, who is our home: ... Shades of the prison-house begin to close / Upon the growing Boy,",
        "source": "William Wordsworth, 'Ode: Intimations of Immortality from Recollections of Early Childhood' (1807).",
        "href": "https://en.wikisource.org/wiki/Ode:_Intimations_of_Immortality_from_Recollections_of_Early_Childhood",
        "image": {
          "src": "/covers/robert-wun-balloon-couture-gown--a3.png",
          "alt": "Portrait of the young poet William Wordsworth at age 28.",
          "credit": "William Shuter, portrait of William Wordsworth at 28 (1798), via Wikimedia Commons. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Hendrick Goltzius's 1594 engraving 'Quis evadet?' ('Who escapes?') is the defining image of the Renaissance motto homo bulla, 'man is a bubble.' A plump winged infant reclines against a grinning skull, resting his elbow on it as on a pillow, and idly blows a stream of soap bubbles from a pipe while smoke curls from an urn behind him; the Latin verses beneath spell out that a newborn's life is as fleeting as the shining bubble or the vanishing smoke. It fuses the two ideas at the heart of Robert Wun's show, childhood and evanescence, into a single unforgettable emblem: the child at play makes bubbles precisely to watch them burst. Wun's cloud of balloons crowning a black gown is the couture heir to this print, the rounded, breath-filled sphere presented as both delight and memento mori. Where Goltzius sets his bubble against a skull, Wun sets his balloons against exacting, funereal tailoring, so that play and mortality share the same frame. The bubble and the balloon say the same thing across four centuries: catch the shine while it holds.",
        "excerpt": "A winged infant leans against a human skull, blowing a chain of soap bubbles from a clay pipe as smoke rises from an urn behind him. The Latin motto 'Quis evadet?' asks who escapes death, likening a child's brief life to the bubble that gleams and bursts. The engraving is the classic emblem of homo bulla, man as a bubble, uniting childhood and play with the certainty of transience.",
        "source": "Hendrick Goltzius, 'Quis evadet?' (Homo Bulla), engraving, 1594, Rijksmuseum, Amsterdam (RP-P-OB-10.227).",
        "href": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-10.227",
        "image": {
          "src": "/covers/robert-wun-balloon-couture-gown--a4.png",
          "alt": "Engraving of a winged infant blowing soap bubbles while leaning on a human skull.",
          "credit": "Hendrick Goltzius, 'Quis evadet?' (1594), Rijksmuseum, via Wikimedia Commons. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "In Jean Siméon Chardin's 'Soap Bubbles' of about 1733–34, a young man leans from a stone window and, with grave concentration, blows a single translucent bubble that swells at the tip of his straw while a small child rises on tiptoe to watch. The whole painting is a held breath: everything hangs on the fragile, trembling globe that catches the light and must, at any instant, break. Chardin ennobles a child's idle game into a quiet emblem of vanity and impermanence, making the humble bubble carry the weight of a philosophical still life. This is the same alchemy Robert Wun performs on the couture runway, taking the throwaway balloon, another skin of air stretched thin, and lifting it into the realm of high art and hushed attention. Chardin's bubble and Wun's balloons are both breath given a luminous, temporary body, beautiful because they are about to be lost. Each frames the act of watching something inflate as a meditation on how briefly the shining thing can be held. Play, in both, becomes the most serious subject there is.",
        "excerpt": "A young man leans on a stone ledge and blows a large, glistening soap bubble from a straw while a small child peers over the sill to watch it swell. Chardin suspends the scene at the bubble's most fragile moment, poised between perfection and bursting. A humble childhood pastime becomes a tender still life on transience, breath given a shining, momentary form.",
        "source": "Jean Siméon Chardin, 'Soap Bubbles,' ca. 1733–34, oil on canvas, The Metropolitan Museum of Art, New York (Wentworth Fund).",
        "href": "https://commons.wikimedia.org/wiki/File:Soap_Bubbles_MET_DP356133.jpg",
        "image": {
          "src": "/covers/robert-wun-balloon-couture-gown--a5.png",
          "alt": "Painting of a young man leaning from a window blowing a large soap bubble as a child watches.",
          "credit": "Jean Siméon Chardin, 'Soap Bubbles' (ca. 1733–34), The Metropolitan Museum of Art (Wentworth Fund), via Wikimedia Commons. Public domain."
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "paypal-stripe-advent-53bn-bid",
    "headline": "Stripe and private-equity firm Advent make a $53 billion joint offer to buy PayPal, Reuters reports",
    "overview": "Payments company Stripe and the private-equity firm Advent International have jointly offered to acquire PayPal for $60.50 a share, valuing the payments pioneer at more than $53 billion, Reuters reported, citing sources. The bid, backed by about $50 billion in committed bank financing, represents roughly a 28% premium to PayPal's closing price and would leave Stripe and Advent holding equal stakes rather than breaking up the company. PayPal has not yet responded to the approach, which the bidders hope to advance in the coming weeks.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxQeTJ6Wng1a0VaQXRFS3dXYml0Vk1TWTZEYWxOTElCNzJhNU5xamNacW0yczJVT3RZZ2oxcnE0VVhkTEYtS1FZWFIxZTJHNjNaXzVoci00aTNGcEFpTFRXcE1xaVA1cEZ1ZmFKZWRKcm1LcU0wUGZIRXJEMDdXaUM5ektPWUhaQU5mZmMxdWZIYTB3a2hqWlpfR3d3V0tIQWs0SmhKcVpuTVdfbS1VVEx2RjI5RXVkTFk?oc=5"
      },
      {
        "name": "MarketScreener",
        "href": "https://www.marketscreener.com/news/stripe-advent-offer-to-buy-paypal-for-more-than-53-billion-sources-say-ce7f5edddf8bf625"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/paypal-stripe-advent-53bn-bid.png",
      "alt": "The eBay and PayPal sign outside the company's campus in San Jose, California.",
      "credit": "Photo by Leon7, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Marcus Licinius Crassus (c. 115-53 BC) was the richest man of the late Roman Republic, a financier-politician who built his colossal fortune less by trade than by opportunistic acquisition. Plutarch records that Crassus kept a private force of some five hundred trained slaves and, whenever fire broke out in Rome, bought up the burning buildings and their terrified neighbours' houses at knock-down prices, until 'the largest part of Rome came into his possession.' His wealth translated directly into political power, funding Caesar and the First Triumvirate, before hubris drove him to a fatal war against Parthia. The Stripe-Advent bid for PayPal is a modern version of the same instinct: massive concentrated capital (here roughly $50bn of bank financing) mobilised to swallow a whole enterprise in a single stroke. As with Crassus, the aim is not just profit but command of the field, buying up a rival at scale when circumstances make it available on the buyers' terms.",
        "excerpt": "he proceeded to buy slaves who were architects and builders. Then, when he had over five hundred of these, he would buy houses that were afire, and houses which adjoined those that were afire, and these their owners would let go at a trifling price owing to their fear and uncertainty. In this way the largest part of Rome came into his possession.",
        "source": "Plutarch, Life of Crassus 2.4-5, trans. Bernadotte Perrin, Loeb Classical Library (1916); via LacusCurtius (Bill Thayer, University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Crassus*.html",
        "image": {
          "src": "/covers/paypal-stripe-advent-53bn-bid--a0.png",
          "alt": "Ancient Roman marble portrait head identified as Marcus Licinius Crassus.",
          "credit": "Roman marble head identified as Marcus Licinius Crassus, mid-1st century BC, Louvre; photo by Gary Todd, released CC0 1.0 (public domain), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In 1901 the banker J. Pierpont Morgan engineered the creation of the United States Steel Corporation, merging Andrew Carnegie's steel empire with other producers into the world's first billion-dollar company, capitalised at more than a billion dollars plus hundreds of millions in bonds. Morgan bought Carnegie out for roughly $480 million, absorbing the pioneering industrialist rather than competing with him, and welded some seventy per cent of American steel into a single combine backed by a syndicate of banks. Contemporaries saw it as the supreme act of financial consolidation of the age, the 'Morganisation' of an entire industry under Wall Street control. The Stripe and Advent offer for PayPal echoes this template a century later: a bank-financed combination that would fold a payments pioneer into a jointly owned colossus valued above $53bn. In both cases a partnership of financiers, not operating rivals, assembles enormous debt-backed capital to buy dominance of a strategic industry in one decisive transaction.",
        "excerpt": "By April 2, however, Morgan's greatest task was accomplished. The corporation which is his financial masterpiece — by which his reputation will stand or fall — was complete. Its capital was fixed at a little more than a billion dollars, besides three hundred and sixty-six millions of bonded and mortgage debt.",
        "source": "Herbert N. Casson, The Romance of Steel: The Story of a Thousand Millionaires (New York: A. S. Barnes & Co., 1907), ch. VII, 'J. Pierpont Morgan and the United States Steel Corporation'; via Internet Archive.",
        "href": "https://archive.org/stream/romancesteelsto00cassgoog/romancesteelsto00cassgoog_djvu.txt",
        "image": {
          "src": "/covers/paypal-stripe-advent-53bn-bid--a1.png",
          "alt": "Edward Steichen's 1903 photographic portrait of financier J. Pierpont Morgan.",
          "credit": "Edward Steichen, photographic portrait of J. Pierpont Morgan, 1903, The Morgan Library & Museum; public domain (published before 1931), via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Anthony Trollope's satirical novel The Way We Live Now (1875) centres on Augustus Melmotte, a mysterious continental financier who descends on London and dazzles society with rumours of limitless wealth and world-spanning ventures. Melmotte is said to be able to 'make or mar any company by buying or selling stock,' floating a vast railway scheme on little more than confidence and the worship of his money, until his empire of paper collapses. Trollope wrote the book as an indictment of an age in which financial scale had become its own form of moral authority, and mere bigness commanded deference. The proposed Stripe-Advent takeover of PayPal invites the same scrutiny Trollope brought to Melmotte: the spectacle of gigantic sums and bank-backed leverage bidding to reshape a whole industry. His novel is a caution that awe at a financier's power to command billions can outrun any sober reckoning of what the money actually rests upon.",
        "excerpt": "It was said that he had made a railway across Russia, that he provisioned the Southern army in the American civil war, that he had supplied Austria with arms, and had at one time bought up all the iron in England. He could make or mar any company by buying or selling stock, and could make money dear or cheap as he pleased. All this was said of him in his praise,--but it was also said that he was regarded in Paris as the most gigantic swindler that had ever lived;",
        "source": "Anthony Trollope, The Way We Live Now (Chapman and Hall, 1875), ch. IV; Project Gutenberg eBook #5231.",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm",
        "image": {
          "src": "/covers/paypal-stripe-advent-53bn-bid--a2.png",
          "alt": "Photographic portrait of the novelist Anthony Trollope.",
          "credit": "Photographic portrait of Anthony Trollope, from his Autobiography (1883); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Emile Zola's L'Argent ('Money', 1891) follows the speculator Aristide Saccard, who rises from ruin to found the Universal Bank and inflate its shares into a feverish bubble on the Paris Bourse. Zola portrays Saccard as consumed by the lust to rebuild an 'edifice of fortune' and reign as a 'royalty of gold,' pouring other people's capital into ever-grander schemes until the whole structure crashes and drags thousands down with it. The novel dissects money as an intoxicating force that fuses ambition, hubris and the will to dominate the market. The Stripe-Advent bid for PayPal, marshalling around $50bn of financing to seize control of a payments giant, mirrors Saccard's dream of concentrating financial power on a monumental scale. Zola's warning is that such colossal money-building is driven as much by the appetite for supremacy as by any calm calculation of value.",
        "excerpt": "He was seized with a feverish desire to begin all over again, to regain everything, to rise higher than he had ever risen before, to place his foot at last full upon the conquered city. No longer the lying finery of the façade, but the solid edifice of fortune, the true royalty of gold enthroned upon real money bags full to overflowing—that was what he wanted.",
        "source": "Emile Zola, Money (L'Argent), trans. Ernest A. Vizetelly (London: Chatto & Windus, 1894); Project Gutenberg eBook #56987.",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm",
        "image": {
          "src": "/covers/paypal-stripe-advent-53bn-bid--a3.png",
          "alt": "Edouard Manet's 1868 painted portrait of the writer Emile Zola at his desk.",
          "credit": "Edouard Manet, Portrait of Emile Zola, 1868, oil on canvas, Musee d'Orsay, Paris; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys's oil panel The Moneylender and His Wife (1514, Louvre) shows a Flemish banker weighing gold coins and pearls on a balance while his wife, distracted from her illuminated prayer book, turns to watch the money. A tiny convex mirror in the foreground reflects the outside world, and the painting reads as a moral meditation on the seductive gravity of wealth, the way the scales of profit pull attention away from higher things. Painted in Antwerp as it became Europe's financial hub, it captures the exact moment commerce and capital began to reorganise society around money. The image resonates with the Stripe-Advent bid for PayPal, a story in which the weighing of enormous sums, more than $53bn, becomes the decisive act. Matsys's balance and the modern share price are the same instrument: value reduced to a number, and human attention bent toward the gold on the table.",
        "excerpt": "In Matsys's panel the banker's fingers rest on a gilded balance heaped with coins and rings, his gaze fixed on the metal rather than on his wife or her book of devotions. Light glints off the gold and off a small round mirror, in which a window and a distant figure appear, as if the whole world were being drawn into the counting table. The picture makes the reckoning of money literal and central, an emblem of finance quietly taking command of the human field of vision.",
        "source": "Quentin Matsys (Metsys), The Moneylender and His Wife, 1514, oil on panel, 70.5 x 67 cm, Musee du Louvre, Paris (INV 1444); Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/paypal-stripe-advent-53bn-bid--a4.png",
          "alt": "Renaissance painting of a moneylender weighing gold coins on a balance while his wife looks on.",
          "credit": "Quentin Matsys, The Moneylender and His Wife, 1514, oil on panel, Musee du Louvre; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Richard Wagner's opera Das Rheingold (1869), the prologue to his Ring cycle, opens with the Nibelung dwarf Alberich stealing the Rhinemaidens' gold after renouncing love, then forging from it a ring that promises mastery over the whole world. The entire drama turns on the corrupting pursuit of that hoard, as gods, giants and dwarves scheme, cheat and murder to possess the gold and the power it confers, until a curse binds anyone who holds it. Wagner built a four-opera epic on the premise that the amassing of ultimate wealth breeds ambition, betrayal and eventual ruin. The Stripe-Advent offer for PayPal, a bank-financed reach for control of a $53bn payments empire, is a corporate echo of Alberich's forge: capital gathered on a titanic scale to command a market. Wagner's myth frames the perennial question hanging over any such consolidation, whether the ring of financial dominion is worth what must be renounced or risked to seize it.",
        "excerpt": "Arthur Rackham's 1910 illustration for the opera shows the three Rhinemaidens swirling in the depths of the river, mourning the theft of the shining gold that Alberich has torn from its rock. The lost hoard glows at the heart of the scene, the small object on which an entire saga of greed and power will turn. It renders visible the opera's central image: a treasure whose seizure sets in motion an unstoppable contest for dominion.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (first performed 1869); full score via IMSLP / Petrucci Music Library. Illustration: Arthur Rackham, in The Rhinegold & The Valkyrie, trans. Margaret Armour (Heinemann, 1910).",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/paypal-stripe-advent-53bn-bid--a5.png",
          "alt": "Arthur Rackham illustration of the Rhinemaidens lamenting the loss of the stolen Rhinegold.",
          "credit": "Arthur Rackham, 'The Rhinemaidens lament the loss of the Rhinegold', 1910, from The Rhinegold & The Valkyrie; public domain (published before 1931), via Wikimedia Commons."
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "trump-threatens-iran-power-plants",
    "headline": "Trump threatens to bomb Iran's power plants and bridges next week unless Tehran returns to talks",
    "overview": "President Donald Trump said U.S. air strikes on Iran will continue and threatened to destroy the country's power plants and bridges as soon as next week unless Tehran returns to the negotiating table, in an interview with Fox News. The warning came as U.S. forces carried out a fourth consecutive night of strikes near the Strait of Hormuz and reimposed a naval blockade of Iranian ports, cutting maritime traffic through the strait to about a tenth of its normal level. Trump claimed Iran's military had been 'degraded to a very low level' while acknowledging it retained some capability.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cy0608wy8pro"
      },
      {
        "name": "Fox News",
        "href": "https://www.foxnews.com/media/trump-threatens-expand-strikes-iran-says-power-plants-next-go-hit-them-hard"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/trump-threatens-iran-power-plants.png",
      "alt": "A large gas tanker under way at sea.",
      "credit": "Photo by XEON, CC BY 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Melian Dialogue, recorded by the Athenian historian Thucydides in Book 5 of his History of the Peloponnesian War, dramatizes the confrontation of 416 BC in which imperial Athens descended on the small neutral island of Melos. Athens landed a fleet and army, blockaded the town, and offered its people a stark choice: submit and pay tribute, or be annihilated. When the Melians appealed to justice and to the gods, the Athenian envoys brushed such talk aside, insisting that questions of right arise only between equals in power while the strong do as they will. Melos refused, endured the siege, and was destroyed, its men killed and its women and children enslaved. Trump's demand that Iran negotiate or be destroyed, enforced by nightly strikes and a naval blockade throttling shipping, is the Melian ultimatum in modern dress: the strong dictating terms to the weak and framing capitulation as the only rational choice.",
        "excerpt": "right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5 (the Melian Dialogue), 416 BC, trans. Richard Crawley.",
        "href": "https://www.thelatinlibrary.com/imperialism/readings/thucydides8.html",
        "image": {
          "src": "/covers/trump-threatens-iran-power-plants--a0.png",
          "alt": "Marble bust of the ancient Greek historian Thucydides, who recorded the Melian Dialogue.",
          "credit": "Roman-era copy of a Greek portrait of Thucydides, Royal Ontario Museum; photograph released to the public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In October 1962 President John F. Kennedy answered the discovery of Soviet nuclear missiles in Cuba by ordering a naval quarantine, a blockade ringing the island, while demanding the missiles' removal and warning of graver action to come. U.S. warships and patrol aircraft intercepted and turned back Soviet vessels, choking the sea lanes to Cuba as the world edged toward nuclear war. The blockade was coercion by strangulation: an ultimatum enforced not by immediate assault but by cutting a nation off from the sea until it yielded. After thirteen tense days, Moscow negotiated a withdrawal. Trump's reimposed naval blockade near the Strait of Hormuz, cutting Iran's shipping to roughly a tenth of normal while demanding a return to talks, revives the same instrument, the blockade as ultimatum, squeezing a state's maritime lifelines to force it to the table.",
        "excerpt": "Kennedy chose the blockade as a middle path between doing nothing and launching air strikes, a way to apply overwhelming pressure while leaving Khrushchev room to retreat. It worked because the coercion was calibrated and visible: every Soviet ship that slowed or turned back was a public demonstration of who set the terms. The lesson and the danger, that a blockade is an act of war one miscalculation away from catastrophe, hang over every modern attempt to bomb or besiege a rival into negotiating.",
        "source": "The Cuban Missile Crisis and the U.S. naval quarantine of Cuba, October 1962; U.S. Navy patrol photograph of the quarantine operations.",
        "href": "https://commons.wikimedia.org/wiki/File:P-2H_Neptune_over_Soviet_ship_Oct_1962.jpg",
        "image": {
          "src": "/covers/trump-threatens-iran-power-plants--a1.png",
          "alt": "A U.S. Navy P-2 Neptune patrol aircraft flying low over a Soviet freighter during the 1962 naval quarantine of Cuba.",
          "credit": "U.S. Navy, Lockheed SP-2H Neptune of patrol squadron VP-18 over a Soviet freighter, October 1962; public domain (work of the U.S. federal government), via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Act 3, Scene 3 of Shakespeare's Henry V (c. 1599), the English king stands before the besieged French town of Harfleur and delivers a terrifying ultimatum to its governor. If the town does not open its gates at once, Henry warns, he will lose the reins on his soldiers, who will mow down its virgins, spit its infants on pikes, and dash its old men's heads against the walls. The choice he lays out is submission or annihilation: yield now, while mercy is still on offer, or be destroyed. The governor capitulates, and Harfleur is spared the sack. Henry's speech is the archetypal coercive ultimatum, and it maps directly onto Trump's warning to Tehran, negotiate next week or watch your power plants and bridges destroyed, with the devastation presented as the inevitable price of refusal.",
        "excerpt": "The gates of mercy shall be all shut up, / And the flesh'd soldier, rough and hard of heart, / In liberty of bloody hand shall range / With conscience wide as hell, mowing like grass / Your fresh fair virgins and your flow'ring infants.",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act III, Scene III (c. 1599).",
        "href": "https://www.gutenberg.org/files/1521/1521-h/1521-h.htm",
        "image": {
          "src": "/covers/trump-threatens-iran-power-plants--a2.png",
          "alt": "English soldiers assaulting the walls during the 1415 siege of Harfleur.",
          "credit": "Thomas Grieve, scenic design for Charles Kean's 1859 production of Shakespeare's Henry V (the siege of Harfleur), Victoria and Albert Museum; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the Book of Isaiah, chapter 36 (paralleled in 2 Kings 18), the Assyrian empire under Sennacherib besieges Jerusalem and sends his field commander, the Rabshakeh, to shout an ultimatum at the city walls. He mocks King Hezekiah's hopes of rescue, warns the defenders that the siege will reduce them to eating their own dung and drinking their own urine, and dangles a coercive bargain: make peace with me, come out, and you will be resettled in a land as good as your own; otherwise, ruin. It is psychological warfare, the strong empire dictating surrender to a small kingdom by threatening to sever its lifelines. The Rabshakeh's speech prefigures Trump's ultimatum to Iran, submit to talks or have your infrastructure and supply lines destroyed, with capitulation dressed up as the merciful path.",
        "excerpt": "Make an agreement with me by a present, and come out to me: and eat ye every one of his vine, and every one of his fig tree, and drink ye every one the waters of his own cistern; Until I come and take you away to a land like your own land, a land of corn and wine, a land of bread and vineyards.",
        "source": "The Holy Bible, King James Version, Isaiah 36:16-17 (the Rabshakeh's ultimatum to Jerusalem).",
        "href": "https://ebible.org/kjv/ISA36.htm",
        "image": {
          "src": "/covers/trump-threatens-iran-power-plants--a3.png",
          "alt": "Assyrian palace relief depicting soldiers assaulting the walls of the Judahite city of Lachish.",
          "credit": "Assyrian relief of the Siege of Lachish (701 BC), South-West Palace of Sennacherib at Nineveh, now in the British Museum; photograph by Shadsluiter, 2020, CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco Goya's Estragos de la guerra (Ravages of War), plate 30 of his etching series The Disasters of War (created 1810-1820, published 1863), shows the interior of a house blasted apart, its inhabitants hurled amid rubble and broken beams, the domestic world of a besieged town reduced to wreckage. Goya made the series as an unflinching witness to the Peninsular War, when Napoleon's armies besieged Spanish cities and civilians paid the price. The plate captures precisely what a threat to destroy power plants and bridges means on the ground: the annihilation of the ordinary structures that sustain life. It is the visual grammar of coercion by demolition, offering no heroism, only the aftermath of force applied where people live. Set beside Trump's ultimatum to Iran, Goya's image is a reminder of what infrastructure destruction actually looks like once the bombs fall.",
        "excerpt": "The etching carries Goya's own terse caption, Estragos de la guerra, the ravages of war. Bodies and household objects tumble together in a collapsed room, the anonymous debris of a bombarded home. Goya refuses any consoling narrative, presenting only the wreckage that coercive violence leaves behind.",
        "source": "Francisco de Goya, Estragos de la guerra (Ravages of War), plate 30 from Los Desastres de la Guerra, etching and aquatint, 1810-1820 (published 1863).",
        "href": "https://commons.wikimedia.org/wiki/File:Goya-Guerra_(30).jpg",
        "image": {
          "src": "/covers/trump-threatens-iran-power-plants--a4.png",
          "alt": "Goya etching of a room destroyed by bombardment, with bodies strewn among the rubble.",
          "credit": "Francisco de Goya, Estragos de la guerra (Ravages of War), plate 30 of Los Desastres de la Guerra, 1810-1820 (published 1863); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi's opera Nabucco, premiered at La Scala in Milan on 9 March 1842, dramatizes the Babylonian king Nebuchadnezzar's siege and destruction of Jerusalem and the enslavement of the defeated Hebrews. Its most famous number, the chorus Va, pensiero, is the lament of a conquered people carried into captivity, longing for the homeland torn from them by imperial force. The opera stages the essential drama of coercive power: a mighty empire razing a smaller nation's holy city and dictating the terms of its survival. Verdi turned that ancient story of subjugation into music that became an anthem of national resistance. It resonates with Trump's threat to bomb Iran into negotiation, the spectacle of a great power vowing to destroy a weaker nation's cities and lifelines to bend it to its will.",
        "excerpt": "Verdi scores the fall of Jerusalem in blazing brass and thundering chorus, then lets the orchestra fall away for the exiles' hushed lament beside the waters of Babylon. The music holds both faces of coercive war at once: the overwhelming force of the conqueror and the grief of those forced to submit. In the chorus of the enslaved Hebrews, Verdi turns a razed city and a dictated peace into one of the most moving passages in all of opera.",
        "source": "Giuseppe Verdi, Nabucco, opera in four acts, libretto by Temistocle Solera; premiered Teatro alla Scala, Milan, 9 March 1842.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/trump-threatens-iran-power-plants--a5.png",
          "alt": "John Martin's dramatic depiction of the fall of Babylon, a vast city overwhelmed by invading armies.",
          "credit": "John Martin, The Fall of Babylon (Cyrus the Great defeating the Chaldean army), mezzotint, 1831, Wellcome Collection; underlying work public domain (artist died 1854), digitized image CC BY 4.0, via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "ice-suspends-vehicle-stops",
    "headline": "Trump administration orders ICE to suspend most vehicle stops after two deadly shootings",
    "overview": "The Trump administration ordered Immigration and Customs Enforcement to halt most traffic and vehicle stops after two people were fatally shot by agents in separate operations, the White House border czar said. The pause follows the killing of a Colombian national during an operation in Biddeford, Maine, which has drawn criticism and protests. Officials framed the suspension as a temporary safety measure while the agency reviews its use-of-force practices during roadside encounters.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikwFBVV95cUxNem9hWHVZSHg3WE0zdFBvdXd0UFlpaEFETGpxN1d5RVNhZnQ4UGNVMFFNTzNxVmEyUmY3NEVBQUlGM09GdFNhWkl5ampQcC0yVHZpZWFCMmNrS2kwbVplZjJXU3g4emVjYmJpVDZVZ1J0VWVIQmdaSjQ0Q1NWSlVvY201OTI5UFl6Y1BHR2YweXZOY0E?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqwFBVV95cUxQWXlXZUxmWHVwSVRsd19GdUdGZ1pYWlhISElQYlVjTVU2SGRMNDRVSHRxX3RoUXpNRmdnX0VDWGxlTzdNRnRmLXkxSHFBUUZHdC10QUYtTERzaks4VVF4em1kSmRJaVhRMldxOWVLR0duMWVGQ1dZYXBBMl9FQWVyUmRwOHdpaWdMcTFvVGEyeERCYzRTcTlPdVBnencxOWV4R2dMUmM1WXJ0VzA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/ice-suspends-vehicle-stops.png",
      "alt": "A U.S. Immigration and Customs Enforcement vehicle on a city street.",
      "credit": "Photo by Fibonacci Blue, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On the night of March 5, 1770, British soldiers of the 29th Regiment, quartered in Boston to enforce unpopular imperial policy, opened fire on a jeering crowd in King Street, killing five townspeople in what quickly became known as the Boston Massacre. The killings produced such public fury that the royal government felt compelled to pull its forces back: both regiments were withdrawn from the town to Castle William in the harbor, and the soldiers and their commander were put on trial for their conduct. It was a case study in how lethal force by agents of the state, when it spills civilian blood, can force the state itself to retreat and submit to accountability. That is precisely the dynamic in this story: after ICE agents fatally shot two people, including a Colombian national in Biddeford, Maine, the administration ordered agents to stand down from most vehicle stops while use-of-force is reviewed. In both cases outrage over deadly enforcement compelled the authority to rein in the very officers it had deployed.",
        "excerpt": "The said party was formed into a half circle; and within a short time after they had been posted at the Custom House, began to fire upon the people. Captain Preston is said to have ordered them to fire, and to have repeated that order. One gun was fired first; then others in succession and with deliberation, till ten or a dozen guns were fired; or till that number of discharges were made from the guns that were fired.",
        "source": "A Short Narrative of the Horrid Massacre in Boston (Boston, 1770), compiled for the town by James Bowdoin, Samuel Pemberton, and Joseph Warren.",
        "href": "https://www.digitalhistory.uh.edu/active_learning/explorations/revolution/account2.cfm",
        "image": {
          "src": "/covers/ice-suspends-vehicle-stops--a0.png",
          "alt": "Paul Revere's 1770 hand-colored engraving showing a line of British soldiers firing in unison on unarmed Boston townspeople in King Street.",
          "credit": "Paul Revere, 'The Bloody Massacre perpetrated in King-Street Boston' (1770), engraving after Henry Pelham. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On August 16, 1819, some 60,000 people gathered peacefully at St Peter's Field in Manchester to demand parliamentary reform, when local magistrates ordered mounted yeomanry and hussars to charge into the densely packed crowd with drawn sabres. At least eighteen people were killed and hundreds injured in what was bitterly nicknamed 'Peterloo,' and the eyewitness account of the clergyman Edward Stanley captured cavalry 'acting with delegated power' cutting a path toward the speakers' platform. The bloodshed detonated a national outcry, made the massacre a byword for the state's abuse of force against ordinary people, and turned Peterloo into a permanent argument for restraining armed agents of authority. The parallel to this story is direct: state force, unleashed on a crowd or on travelers, produces fatalities that in turn generate a public backlash powerful enough to demand limits. Just as ICE's deadly stops prompted an order to halt most vehicle stops pending review, Peterloo showed how lethal overreach forces a reckoning over who may charge, stop, and strike the public.",
        "excerpt": "An officer and some few others then advanced rather in front of the troop, formed, as I before said, in much disorder and with scarcely the semblance of line, their sabres glistened in the air, and on they went, direct for the hustings. At first, i.e., for a very few paces, their movement was not rapid, and there was some show of an attempt to follow their officer in regular succession, five or six abreast; but, as Mr. Francis Phillips in his pamphlet observes, they soon \"increased their speed,\" and with a zeal and ardour which might naturally be expected from men acting with delegated power against a foe by whom it is understood they had long been insulted with taunts of cowardice, continued their course, seeming individually to vie with each other which should be first.",
        "source": "Rev. Edward Stanley, eyewitness account of the Peterloo Massacre (16 August 1819), in F. A. Bruton (ed.), Three Accounts of Peterloo (Manchester University Press, 1921).",
        "href": "https://www.gutenberg.org/files/37004/37004-h/37004-h.htm",
        "image": {
          "src": "/covers/ice-suspends-vehicle-stops--a1.png",
          "alt": "Coloured 1819 print of the Peterloo Massacre: mounted cavalry with raised sabres trample and cut down a crowd of men, women and children around a reform hustings.",
          "credit": "Richard Carlile, coloured aquatint of the Peterloo Massacre (1 October 1819). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Victor Hugo's Les Misérables (1862), the police inspector Javert embodies the state's machinery of pursuit taken to a merciless extreme, hunting the reformed ex-convict Jean Valjean across decades in the name of law. Hugo describes Javert as a man of two exaggerated virtues, 'respect for authority, hatred of rebellion,' who invests every functionary of the state with blind, absolute faith and admits no exceptions, no mercy, no doubt. The novel dramatizes what happens when an agent of authority equates enforcement with righteousness and cannot conceive that the system he serves might itself be wrong. That is the crisis at the heart of this story: ICE agents empowered to stop and pursue people had that power suspended precisely because unquestioned enforcement turned deadly and forced the state to pause and doubt itself. Javert's eventual inability to reconcile law with conscience is the literary shadow of a review board asking whether the stops were worth the lives.",
        "excerpt": "This man was composed of two very simple and two very good sentiments, comparatively; but he rendered them almost bad, by dint of exaggerating them,—respect for authority, hatred of rebellion; and in his eyes, murder, robbery, all crimes, are only forms of rebellion. He enveloped in a blind and profound faith every one who had a function in the state, from the prime minister to the rural policeman. He covered with scorn, aversion, and disgust every one who had once crossed the legal threshold of evil. He was absolute, and admitted no exceptions.",
        "source": "Victor Hugo, Les Misérables (1862), Volume I ('Fantine'), Book Fifth, ch. V; Isabel F. Hapgood translation.",
        "href": "https://www.gutenberg.org/files/135/135-h/135-h.htm",
        "image": {
          "src": "/covers/ice-suspends-vehicle-stops--a2.png",
          "alt": "Émile Bayard's 1862 engraving of the child Cosette, ragged and barefoot, holding a broom taller than herself, the emblematic image of the downtrodden in Les Misérables.",
          "credit": "Émile Bayard, 'Cosette' engraving for the first edition of Les Misérables (1862). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Sophocles' tragedy Antigone (c. 441 BCE) stages the collision between the power of the state and the claims of conscience, as Antigone defies King Creon's decree forbidding the burial of her brother and answers his authority with an appeal to laws higher than any ruler's edict. Confronting Creon, she insists that no mortal command can 'annul and override' the unwritten and unfailing laws, refusing to accept that the state's writ is the final measure of right. The play is the founding Western meditation on the limits of legitimate authority and on the moment when official power provokes moral and public revolt. In this story, the state's own edict to stop travelers ran up against a hard limit when the stops became lethal, forcing the administration to suspend the very authority it had asserted. Antigone's challenge, that decrees issued by mortal power can be neither absolute nor beyond question, echoes in every review that pauses enforcement after force turns fatal.",
        "excerpt": "Yea, for these laws were not ordained of Zeus,\nAnd she who sits enthroned with gods below,\nJustice, enacted not these human laws.\nNor did I deem that thou, a mortal man,\nCould’st by a breath annul and override\nThe immutable unwritten laws of Heaven.\nThey were not born today nor yesterday;\nThey die not; and none knoweth whence they sprang.",
        "source": "Sophocles, Antigone (c. 441 BCE), lines 450–457; F. Storr translation, Loeb Classical Library (1912).",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm",
        "image": {
          "src": "/covers/ice-suspends-vehicle-stops--a3.png",
          "alt": "Nikiforos Lytras's 1865 painting of Antigone standing in mourning over the dead body of her brother Polynices, defying the king's decree.",
          "credit": "Nikiforos Lytras, 'Antigone before the dead Polynices' (1865), National Gallery, Athens. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya's The Third of May 1808 (painted 1814) depicts a Spanish civilian, arms flung wide, facing a faceless firing squad of Napoleon's soldiers in the dark outside Madrid, a heap of the already-executed bleeding at his feet. Goya deliberately strips the state's agents of individuality, turning them into an anonymous machine of lethal force confronting a single illuminated, unarmed human being. The painting became the archetype of art as indictment, memorializing victims of state violence and demanding that the killing be seen and judged rather than forgotten. It maps closely onto this story, in which armed agents of the state killed civilians, including a Colombian national shot in Biddeford, Maine, and the deaths forced a public reckoning over unaccountable force. Goya's canvas is the visual conscience behind every pause in enforcement that follows a fatal shooting, insisting the dead have faces and the shooters must answer.",
        "excerpt": "A visual work. In the darkness before a Madrid hillside, a white-shirted man throws his arms wide in a posture at once of surrender and crucifixion, lit by a single lantern, while a rigid rank of soldiers levels their muskets at point-blank range. The ground is already slick with the bodies of the shot, and the executioners' faces are hidden, rendering the state's killing anonymous and mechanical.",
        "source": "Francisco de Goya, El 3 de mayo en Madrid (The Third of May 1808), 1814, oil on canvas, Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/ice-suspends-vehicle-stops--a4.png",
          "alt": "Goya's painting The Third of May 1808: a man in a white shirt with arms raised faces a firing squad of soldiers at night, with corpses at his feet.",
          "credit": "Francisco de Goya, 'The Third of May 1808' (1814), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier's lithograph Rue Transnonain, le 15 avril 1834 records the aftermath of a massacre in which French troops, hunting for a sniper during a Paris uprising, stormed an apartment building and slaughtered its unarmed residents in their beds. Daumier shows no soldiers at all, only a slain man in his nightshirt sprawled across the crushed body of a child, a silent, unflinching accusation against the agents of the state who did the killing. Published and circulated to inflame public opinion, the print became one of history's most powerful visual protests against lethal state force and a demand for accountability. It resonates directly with this story, where deadly action by armed agents provoked outrage and compelled the administration to halt most ICE vehicle stops pending a use-of-force review. Like Daumier's image, the news turns on the bodies left behind and on the public refusal to let that force go unexamined.",
        "excerpt": "A visual work. A working-class man in his nightshirt lies dead on the floor of a ransacked bedroom, having fallen backward onto the small crushed body of his child, with another corpse just visible in the shadows. Daumier omits the soldiers entirely, letting the stillness of the murdered civilians deliver the indictment of the state's violence.",
        "source": "Honoré Daumier, Rue Transnonain, le 15 avril 1834, 1834, lithograph, published in L'Association mensuelle.",
        "href": "https://www.metmuseum.org/art/collection/search/365806",
        "image": {
          "src": "/covers/ice-suspends-vehicle-stops--a5.png",
          "alt": "Daumier's lithograph Rue Transnonain: a dead man in a nightshirt lies on the floor of a bedroom, fallen across the body of a child, victims of a military massacre.",
          "credit": "Honoré Daumier, 'Rue Transnonain, le 15 avril 1834' (1834), lithograph. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "sk-hynix-shares-surge-ai-memory",
    "headline": "SK Hynix shares jump 13% in Seoul as cooling U.S. inflation and AI memory demand lift chip stocks",
    "overview": "Shares of South Korean memory-chip maker SK Hynix surged about 13% in Seoul, tracking gains on Wall Street after cooler-than-expected U.S. inflation data and upbeat forecasts for AI-driven memory demand. The rally lifted other chip stocks, with Samsung Electronics rising nearly 8% and equipment maker Hanmi Semiconductor gaining about 25%, as suppliers struggled to meet roughly three-quarters of DRAM demand. SK Hynix's chief executive has warned the industry could face its worst-ever supply shortage in 2027.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOUGIxNS16MnpFT1RUSHlscHBBVnNOLTF3cmxLckNrUFotYUR2dzVFazM4aHpzb1QyX0UwaDZmUWxBT0wtelVpS1prcjVkcE9fSDAyRjFWb0gyX0tOM0JzU1RTR1B5dlJoQ3BGaTdvNnllX2htR3luNE83ZDdaOGg1UmdzT0kwSUp0ZW9udWhGSWl1SzRGMDl6R3pucGNhZnhBclFHU2F4YkZITkR1UEE?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/economy-news/sk-hynix-shares-jump-nearly-12-tracking-us-stock-gains-4792076"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/sk-hynix-shares-surge-ai-memory.png",
      "alt": "A polished 12-inch silicon wafer of the kind used to make memory chips.",
      "credit": "Photo by Peellden, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The British Railway Mania of the 1840s was the era's great technology-driven stock frenzy: a genuinely transformative new technology, the steam railway, convinced investors that a limitless future was arriving, and money poured into hundreds of railway companies floated on Parliament's docket. At the peak in 1845, schemes for thousands of miles of track were promoted with 10-percent 'scrip' deposits, and shares changed hands feverishly before a single rail was laid, minting paper fortunes for promoters like George Hudson, the 'Railway King.' Contemporaries insisted the boom rested on solid ground because railways really were changing the world, only for the market to collapse in 1847 and ruin thousands. The parallel to SK Hynix's 13-percent leap and Hanmi Semiconductor's 25-percent surge is direct: a revolutionary technology, now AI rather than steam, again sends a whole sector of stocks vertical on the conviction that demand can only compound. As in 1845, the underlying innovation is real, which is precisely what makes the speculative fervor around it so hard to distinguish from a bubble.",
        "excerpt": "The extraordinary mania had seized on merchant and manufacturer with a power which defied control. It was condemned by parliament, and two-thirds of the members were dealers. It was condemned by the press, and editors were provisional committee men. It was condemned in the pulpit; and while a bishop was obliged to reprove his clergy, an archbishop was said to hold council with Mr. Hudson. The lord who derided it in the park, was beheld the next day in Throgmorton-street.",
        "source": "John Francis, A History of the English Railway: Its Social Relations and Revelations, 1820–1845 (London: Longman, Brown, Green, & Longmans, 1851).",
        "href": "https://archive.org/stream/ahistoryenglish00englgoog/ahistoryenglish00englgoog_djvu.txt",
        "image": {
          "src": "/covers/sk-hynix-shares-surge-ai-memory--a0.png",
          "alt": "John Leech's Punch cartoon 'Off the Rail,' satirizing railway financier George Hudson, the 'Railway King,' whose speculative empire collapsed after the Railway Mania.",
          "credit": "John Leech, 'Off the Rail,' Punch (c. 1849), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The California Gold Rush of 1848–49 is the archetype of a stampede for a scarce, vital commodity that upends an entire economy overnight. When gold was found at Sutter's Mill, the news emptied towns like Monterey as clerks, soldiers, sailors, and servants abandoned their posts to dig, wages and prices for shovels and provisions exploded, and ordinary men dreamed of instant fortunes pulled from the ground. Walter Colton, the alcalde of Monterey, recorded in his journal how the metal's sudden scarcity value inverted the social order, with millionaires grooming their own horses because no one would work for hire. The story maps onto today's scramble for AI memory chips, where a CEO warns of the worst-ever shortage in 2027 and DRAM supply meets only about 75 percent of demand, so that a scarce commodity again dictates who prospers. Hanmi Semiconductor's 25-percent jump is the modern echo of the miner striking a rich vein: fortunes concentrating around whoever controls the scarce resource everyone suddenly needs.",
        "excerpt": "Tuesday, Aug. 28. The gold mines have upset all social and domestic arrangements in Monterey; the master has become his own servant, and the servant his own lord. The millionaire is obliged to groom his own horse, and roll his wheelbarrow; and the hidalgo—in whose veins flows the blood of all the Cortes—to clean his own boots! Here is lady L——, who has lived here seventeen years, the pride and ornament of the place, with a broomstick in her jewelled hand!",
        "source": "Walter Colton, The Land of Gold; or, Three Years in California (New York: D. W. Evans & Co., 1860), journal entry for August 28.",
        "href": "https://www.gutenberg.org/cache/epub/69727/pg69727-images.html",
        "image": {
          "src": "/covers/sk-hynix-shares-surge-ai-memory--a1.png",
          "alt": "Charles Christian Nahl's 1872 painting 'Sunday Morning in the Mines,' depicting California gold-rush miners at work and at leisure in a frontier camp.",
          "credit": "Charles Christian Nahl, 'Sunday Morning in the Mines' (1872), Crocker Art Museum, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Anthony Trollope's The Way We Live Now (1875) satirizes a London consumed by financial speculation around the great swindler-financier Augustus Melmotte and his scheme for a South Central Pacific and Mexican Railway. The novel's sharpest insight is that the promoters never intend to build the railway at all: the profit is to be made by floating the company and selling shares, so that fortunes materialize 'before a spadeful of earth had been moved.' Glossy prospectuses, gorgeous maps, and the mere reputation of powerful men substitute for any real enterprise, while all of society jostles to get in on the paper. Trollope's target, the gap between a speculative frenzy and the substance beneath it, is exactly the anxiety hovering over a market where chip stocks leap 13 to 25 percent in a day on the promise of AI. The story invites Trollope's question: how much of the surge reflects genuine, buildable demand for memory, and how much is the intoxication of a hot theme that everyone is desperate to trade before the music stops?",
        "excerpt": "The proposed change in the business meant simply the entire sale of the establishment at Fiskerville, and the absorption of the whole capital in the work of getting up the railway. \"If you could realise all the money it wouldn't make a mile of the railway,\" said Paul. Mr. Fisker laughed at him. The object of Fisker, Montague, and Montague was not to make a railway to Vera Cruz, but to float a company. Paul thought that Mr. Fisker seemed to be indifferent whether the railway should ever be constructed or not. It was clearly his idea that fortunes were to be made out of the concern before a spadeful of earth had been moved.",
        "source": "Anthony Trollope, The Way We Live Now (London: Chapman & Hall, 1875), Chapter IX, \"The Great Railway to Vera Cruz.\"",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm",
        "image": {
          "src": "/covers/sk-hynix-shares-surge-ai-memory--a2.png",
          "alt": "Photographic portrait of the Victorian novelist Anthony Trollope, author of The Way We Live Now.",
          "credit": "Portrait of Anthony Trollope (c. 1870s), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Émile Zola's Money (L'Argent, 1891) plunges the reader into the roaring pit of the Paris Bourse, where the speculator Aristide Saccard builds the Universal Bank and whips ordinary investors into a mania for its ever-rising shares. Zola renders speculation as a physical fever: the steps of the Bourse black with swarming crowds, the clamour of bull and bear rolling over the whole city, and sudden ruin and fortune conjured amid savage cries no one fully understands. Saccard dreams of becoming the 'Gold King,' and the share price climbs on faith and frenzy until the inevitable, catastrophic collapse. The scene reads like a period drawing of any modern trading floor lifting SK Hynix and Samsung on a wave of AI euphoria and a soft inflation print. Zola's enduring lesson is that a market's roar can be self-sustaining for a while, drawing everyone in on the belief that this ascent is different, right up to the moment the enormous heart of speculation skips a beat.",
        "excerpt": "The steps and peristyle of the Bourse were quite black with swarming frock-coats; and from among the coulissiers, already installed under the clock and hard at work, there arose the clamour of bull and bear, the flood-tide roar of speculation dominating all the rumbling hubbub of the city. Passers-by turned their heads, curious and fearful as to what might be going on there—all those mysterious financial operations which few French brains can penetrate, all that sudden ruin and fortune brought about—how, none could understand—amid gesticulation and savage cries. And Saccard, standing on the kerb of the footway, deafened by the distant voices, elbowed by the jostling, hurrying crowd, dreamed once more of becoming the Gold King, the sovereign of that fever-infested district, in the centre of which the Bourse, from one till three o'clock, beats as it were like some enormous heart.",
        "source": "Émile Zola, Money (L'Argent), trans. Ernest A. Vizetelly (London: Chatto & Windus, 1894), Chapter I.",
        "href": "https://www.gutenberg.org/files/56987/56987-h/56987-h.htm",
        "image": {
          "src": "/covers/sk-hynix-shares-surge-ai-memory--a3.png",
          "alt": "Edgar Degas's pastel 'Portraits at the Stock Exchange' (c. 1878–79), showing financiers conferring under the portico of the Paris Bourse.",
          "credit": "Edgar Degas, 'Portraits at the Stock Exchange' (c. 1878–79), The Metropolitan Museum of Art (CC0), via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth's engraving The South Sea Scheme (1721) is the founding image of speculative-bubble satire, made in the wake of the South Sea Bubble that ruined countless Britons in 1720. Hogarth crowds his print with allegory: investors of every rank ride a spinning merry-go-round of shares, Honesty is broken on a wheel and Honour flogged, while a devil hacks off slices of Fortune to toss to the greedy mob and clergymen of all faiths gamble in a corner. It is a moral X-ray of a market frenzy, exposing how a mania for easy riches corrodes ordinary trade, virtue, and reason. Set beside a day when cooling inflation and AI hopes send an entire chip sector vaulting 8 to 25 percent, Hogarth's crowd scrambling around the wheel of speculation feels strikingly current. The engraving is a 300-year-old warning that when 'money's magick power' seizes a market, the line between rational investment and collective delusion grows dangerously thin.",
        "excerpt": "See here ye Causes why in London, / So many Men are made, & undone, / That Arts, & honest Trading drop, / To Swarm about ye Devils shop, (A) / Who Cuts out (B) Fortunes Golden Haunches, / Trapping their Souls with Lotts and Chances, / Shareing em from Blue Garters down / To all Blue Aprons in the Town. / Here all Religions flock together, / Like Tame and Wild Fowl of a Feather, / Leaving their strife Religious bustle, / Kneel down to play at pitch and Hussle; (C) / Thus when the Sheepherds are at play, / Their flocks must surely go Astray; / The woeful Cause yt in these Times / (E) Honour, & (D) honesty, are Crimes, / That publickly are punish'd by / (G) Self Interest, and (F) Vilany; / So much for monys magick power / Guess at the Rest you find out more.",
        "source": "William Hogarth, The South Sea Scheme (Emblematical Print on the South Sea Scheme), engraving, 1721, with the artist's inscribed verse.",
        "href": "https://en.wikipedia.org/wiki/Emblematical_Print_on_the_South_Sea_Scheme",
        "image": {
          "src": "/covers/sk-hynix-shares-surge-ai-memory--a4.png",
          "alt": "William Hogarth's 1721 engraving 'The South Sea Scheme,' an allegorical satire of the South Sea Bubble showing crowds riding a merry-go-round of shares while Honesty is broken on a wheel.",
          "credit": "William Hogarth, 'The South Sea Scheme' (1721), National Gallery of Art (CC0), via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Younger's Satire on Tulip Mania (c. 1640) mocks the Dutch tulip craze of the 1630s, the classic case of scarcity inflating a commodity to absurd, unsustainable prices. Brueghel paints the speculators as monkeys dressed as prosperous merchants: they weigh bulbs, count money, sign contracts, feast, and squabble over rare tulips, while at the right a bankrupt ape is hauled before a magistrate and another urinates on the now-worthless flowers. The joke is that grave, respectable trade has become a monkey-house of greed over a perishable bulb whose value existed only in the frenzy of buyers. That satire lands cleanly on a market where DRAM meets barely three-quarters of demand and traders bid chip stocks up double digits in a session on scarcity and AI enthusiasm. Brueghel's tulip mania endures as the ur-example of the crowd convincing itself that a scarce, coveted object must keep rising, an image worth holding up whenever a shortage becomes a speculative rush.",
        "excerpt": "Jan Brueghel the Younger paints the tulip speculators as finely dressed monkeys who weigh bulbs on scales, tally coins, toast their bargains, and draw up contracts, treating a perishable flower as a source of endless riches. At the right the folly turns to ruin: one ape is dragged before a judge as a debtor while another relieves himself on the discarded, now-worthless blooms. The painting reduces a real financial mania to a menagerie of greed, a mocking mirror for any market that mistakes scarcity-driven frenzy for lasting value.",
        "source": "Jan Brueghel the Younger, Satire on Tulip Mania (Allegory of the Tulipomania), oil on panel, c. 1640, Frans Hals Museum, Haarlem.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/sk-hynix-shares-surge-ai-memory--a5.png",
          "alt": "Jan Brueghel the Younger's painting 'Satire on Tulip Mania' (c. 1640), showing monkeys in merchant dress trading tulips, feasting, and being hauled to court as the speculative bubble collapses.",
          "credit": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640), Frans Hals Museum, public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "spain-almeria-wildfire-britons",
    "headline": "Seven Britons among at least 13 killed in one of Spain's deadliest wildfires, in Almeria province",
    "overview": "Seven British nationals are among at least 13 people killed by a wildfire that swept through the Almeria region of southern Spain, authorities said, in one of the deadliest blazes in the country's history. The fire, which broke out near Los Gallardos close to the Sierra de los Filabres, trapped several victims in a car and others who tried to flee on foot along a dry riverbed; almost all of the dead were foreign nationals living in the area. Britain's foreign secretary said the UK was in close contact with Spanish authorities and stood ready to help those affected.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cp8l87784ngo"
      },
      {
        "name": "BBC News",
        "href": "https://www.bbc.co.uk/news/articles/cp9ld3p324jo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/spain-almeria-wildfire-britons.png",
      "alt": "A hillside of scorched, blackened trees after a wildfire.",
      "credit": "Photo by Tony Hisgett, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 79 Mount Vesuvius erupted over the Bay of Naples, burying Pompeii and Herculaneum and killing thousands as a searing cloud of ash, pumice and gas rolled over the land. The only detailed eyewitness account comes from Pliny the Younger, who in two letters to the historian Tacitus described his uncle Pliny the Elder dying near the shore and his own flight with his mother through a darkness pierced by falling embers and the screams of strangers. His scene of people caught between the sea and the mountain, some fleeing, some paralysed, some trampled in the dark, is the ancestor of every account of ordinary lives overtaken by an unstoppable natural force. Almost two millennia later the wildfire near Los Gallardos in Almeria did the same to a small foreign community: people died trapped in a car or running down a dry riverbed as the flames closed in, unable to outpace a disaster that gave no warning. Pliny's letter captures the same terrible mixture of confusion, false hope and helplessness before nature's fury.",
        "excerpt": "In the meantime broad sheets of flame, which rose high in the air, were breaking out in a number of places on Mount Vesuvius and lighting up the sky, and the glare and brightness seemed all the more striking owing to the darkness of the night. ... Then the ashes began to fall, but not thickly: I looked back, and a dense blackness was rolling up behind us, which spread itself over the ground and followed like a torrent. \"Let us turn aside,\" I said, \"while we can still see, lest we be thrown down in the road and trampled on in the darkness by the thronging crowd.\" ... You could hear the wailing of women, the screams of little children, and the shouts of men; some were trying to find their parents, others their children, others their wives, by calling for them and recognising them by their voices alone.",
        "source": "Pliny the Younger, Letters, Book 6, Letter 16, to Cornelius Tacitus (c. AD 79), English translation by J. B. Firth (1900).",
        "href": "https://www.attalus.org/old/pliny6.html",
        "image": {
          "src": "/covers/spain-almeria-wildfire-britons--a0.png",
          "alt": "John Martin's apocalyptic painting of Vesuvius erupting in fire and lightning over Pompeii and Herculaneum, with crowds fleeing in the foreground.",
          "credit": "John Martin, The Destruction of Pompeii and Herculaneum (1822), Tate Britain, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Great Fire of London began in a Pudding Lane bakery in the early hours of 2 September 1666 and, fanned by a strong east wind after a long dry summer, raged for four days until it had consumed some 13,000 houses and the old St Paul's Cathedral. The naval administrator Samuel Pepys watched it from the river and from the Tower, recording in his diary the panic of people flinging their goods into boats, the flames leaping from steeple to steeple, and the pigeons that would not leave their homes until their wings caught fire. His eyewitness detail that after 'so long a drought' everything proved combustible is a direct echo of the tinder-dry conditions that turned Almeria's scrubland into a firestorm. Like Pepys's Londoners, the victims near Los Gallardos stayed close to what was theirs until the fire was upon them, then fled by the only routes left. The diary's mixture of awe and grief, weeping at an 'arch of fire' a mile long, matches the horror of a modern community watching a landscape burn.",
        "excerpt": "poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down. ... and every thing, after so long a drought, proving combustible, even the very stones of churches ... we saw the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it. The churches, houses, and all on fire and flaming at once; and a horrid noise the flames made, and the cracking of houses at their ruins.",
        "source": "The Diary of Samuel Pepys, entry for Sunday 2 September 1666, edited by Henry B. Wheatley; Project Gutenberg eBook 4167.",
        "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt",
        "image": {
          "src": "/covers/spain-almeria-wildfire-britons--a1.png",
          "alt": "Seventeenth-century painting of the Great Fire of London seen from the river, with flames engulfing the city skyline, Old London Bridge and the Tower.",
          "credit": "Unknown painter, The Great Fire of London (c. 1675), Museum of London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book II of Virgil's Aeneid, Aeneas recounts the last night of Troy, when the Greeks pour from the wooden horse and set the city ablaze, so that the whole of Ilium is consumed in a single unstoppable conflagration. Virgil likens the spreading fire to a wind-driven blaze mowing down a field of standing corn, an image of nature and violence combined that leaves no escape; palace after palace catches until the very sea shines with Trojan light. Amid the flames Aeneas gathers a few companions and finally flees, carrying his father, in a scene that has fixed the archetype of fleeing a burning homeland. The catastrophe near Los Gallardos was smaller but rhymed with this ancient horror: an entire community of mostly foreign residents overtaken by fire, some killed as they tried to flee down a dry riverbed. Virgil's line that 'death finds him who flies' is a chilling parallel to victims who died on foot with the blaze at their backs.",
        "excerpt": "Thus, when a flood of fire by wind is borne,\nCrackling it rolls, and mows the standing corn;\nOr deluges, descending on the plains,\nSweep o'er the yellow ear, destroy the pains\nOf lab'ring oxen and the peasant's gains;\nUnroot the forest oaks, and bear away\nFlocks, folds, and trees, and undistinguish'd prey:\nThe shepherd climbs the cliff, and sees from far\nThe wasteful ravage of the wat'ry war. ...\nThe palace of Deiphobus ascends\nIn smoky flames, and catches on his friends.\nUcalegon burns next: the seas are bright\nWith splendour not their own, and shine with Trojan light. ...\nThe fire consumes the town, the foe commands ... Who fights finds death, and death finds him who flies.",
        "source": "Virgil, The Aeneid, Book II, translated by John Dryden (1697); Project Gutenberg eBook 228.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt",
        "image": {
          "src": "/covers/spain-almeria-wildfire-britons--a2.png",
          "alt": "Baroque landscape of Troy in flames at night, with Aeneas carrying his aged father Anchises and figures fleeing the burning city.",
          "credit": "Kerstiaen de Keuninck, Aeneas Fleeing from Burning Troy (c. 1610). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book II of Ovid's Metamorphoses, the boy Phaethon persuades his father the Sun-god to let him drive the chariot of the sun for a day, but he cannot control the horses and the flaming car plunges toward the earth, setting the whole world on fire. Ovid catalogues the devastation with mounting horror: the crops burn, the forests and mountains blaze, great cities and whole nations are turned to ashes, rivers run dry, and the scorched Earth herself cries out to Jupiter for mercy. It is antiquity's great myth of a planet consumed by heat gone catastrophically out of control, an image modern readers cannot help but read against a warming climate. The Almeria fire, one of the deadliest in Spain's history, erupted amid drought and searing summer heat, exactly the conditions Ovid imagines when the land becomes its own fuel. His line that the dry standing corn 'affords fuel for its own destruction' reads like a description of the tinder-dry hills above Los Gallardos.",
        "excerpt": "The Moon, too, wonders that her brother's horses run lower than her own, and the scorched clouds send forth smoke. As each region is most elevated, it is caught by the flames, and cleft, it makes {vast} chasms, and becomes dry, its moisture being carried away. The grass grows pale; the trees, with their foliage, are burnt up; and the dry standing corn affords fuel for its own destruction. {But} I am complaining of trifling {ills}. Great cities perish, together with their fortifications, and the flames turn whole nations, with their populations, into ashes; woods, together with mountains, are on fire.",
        "source": "Ovid, Metamorphoses, Book II (the story of Phaethon), translated by Henry T. Riley (1851); Project Gutenberg eBook 21765 (The Metamorphoses of Ovid, Books I-VII).",
        "href": "https://www.gutenberg.org/cache/epub/21765/pg21765.txt",
        "image": {
          "src": "/covers/spain-almeria-wildfire-britons--a3.png",
          "alt": "Rubens's dramatic painting of Phaethon falling from the runaway chariot of the sun as horses plunge and the sky blazes.",
          "credit": "Peter Paul Rubens, The Fall of Phaeton (c. 1604-1605), National Gallery of Art, Washington, D.C. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov's monumental canvas The Last Day of Pompeii (1830-1833), now in the State Russian Museum in Saint Petersburg, depicts the AD 79 eruption of Vesuvius as a moment of pure human terror. Against a sky torn by lightning and a red glow from the erupting volcano, statues topple from their pedestals and families huddle, shield their children, and try to flee as buildings collapse around them. Bryullov, who had visited the excavated ruins, made the painting a study in vulnerability, the way ordinary people cling to one another and to their possessions in the face of an indifferent, annihilating nature. That is precisely the emotional register of the Almeria wildfire, where a small community, almost all of them foreign residents, was overwhelmed so fast that some died together in a car. The painting's frozen instant of panic and tenderness under a burning sky is a timeless image of the disaster that struck near Los Gallardos.",
        "excerpt": "A vast crowd is caught in the crimson light of Vesuvius: mothers cover their children, a son carries his aged father, horses rear, and antique statues pitch forward from a temple as ash rains down. The composition centres on human tenderness amid catastrophe, ordinary people bound together and utterly at the mercy of the fire consuming their city.",
        "source": "Karl Bryullov, The Last Day of Pompeii, oil on canvas, 1830-1833, State Russian Museum, Saint Petersburg.",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/spain-almeria-wildfire-britons--a4.png",
          "alt": "Karl Bryullov's vast painting of Pompeii's citizens fleeing in terror under a red sky as Vesuvius erupts and statues topple around them.",
          "credit": "Karl Bryullov, The Last Day of Pompeii (1830-1833), State Russian Museum, Saint Petersburg. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "On the night of 16 October 1834 the medieval Palace of Westminster, home to the Houses of Lords and Commons, burned to the ground in a spectacular fire watched by huge crowds along the Thames. J. M. W. Turner witnessed it and produced a pair of oil paintings; the version now in the Philadelphia Museum of Art shows the blaze as a towering eruption of orange and white flame that dissolves the solid architecture of the state into pure incandescent light and smoke, its glare doubled in the river. Turner's genius was to render fire not as an event but as an overwhelming force that swallows everything human-made, dwarfing the tiny spectators on the bridge. That sense of a landmark landscape utterly consumed speaks to the scale of the Almeria wildfire, one of the deadliest Spain has known, in which the countryside itself became an inferno. Turner's canvas is a reminder of how quickly the familiar world can be reduced to a wall of flame.",
        "excerpt": "A colossal sheet of yellow-white fire erupts against the night sky as the Houses of Parliament are consumed, the flames and their reflection turning the Thames to molten light. Westminster Bridge and its crowd of onlookers are reduced to shadowy specks, overwhelmed by a blaze that seems to devour stone itself.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834, oil on canvas, c. 1834-1835, Philadelphia Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/spain-almeria-wildfire-britons--a5.png",
          "alt": "Turner's painting of the Houses of Parliament engulfed in a towering blaze at night, the fire and its reflection blazing across the Thames.",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (c. 1834-1835), Philadelphia Museum of Art. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "openai-first-device-smart-speaker",
    "headline": "OpenAI's first hardware device will be a screen-free, movable smart speaker, Bloomberg reports",
    "overview": "OpenAI's debut consumer device will be a portable, screen-free smart speaker designed as an AI companion for the home, Bloomberg News reported. The battery-powered device is said to include a camera and other sensors to sense its surroundings, along with mechanical parts that let it move to seem lifelike, and is expected to sell for roughly $200 to $300 when it launches, now anticipated in 2027. The product has been developed with the help of former Apple engineers who worked on the iPhone and Mac.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNaUxUUTZHSW1oVGVTai1TN3UwS0Y3WWI5Ql8taXJVUjZ6dGluNXZsSEpKUGYzNWQ4SldCVHpPT2tTNXhUd3dKSEhuZ3BkLWlEWExyLTBOZzkzbDEzRWVsQWNsaHFuMUNXV2p1Vi1PR18yb1Q4ZFRpSmJNWk5kVzJFTUhDUVVoQjdndlJjbEJQSlUwZzlPY3pZTndESHEyalNxdjhpRFltSkh5WGdSLTNLNkZEenR1UQ?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-14/openai-s-first-device-will-be-moveable-screenless-speaker-built-as-ai-companion"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/openai-first-device-smart-speaker.png",
      "alt": "A cylindrical smart speaker standing on a table.",
      "credit": "Photo by Asivechowdhury, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Around 1206, the engineer Ibn al-Razzaz al-Jazari, working for the Artuqid court in Diyarbakir, compiled 'The Book of Knowledge of Ingenious Mechanical Devices,' describing dozens of automata driven by water, floats, and hidden gears. Among them were humanoid servants: a mechanical waitress who poured wine and drink, and a peacock basin from which a small figure emerged to offer soap and then a towel to a person washing their hands. These were not mere clocks but crafted attendants engineered to move, serve, and mimic the courtesies of a living servant, delighting a wealthy household. OpenAI's planned device belongs to the same lineage: a manufactured object given moving mechanical parts, sensors, and a helpful manner so that it registers as a living companion rather than an appliance. What al-Jazari built by hand for a single palace, OpenAI intends to mass-produce for the home at $200 to $300.",
        "excerpt": "A folio from a 1315 manuscript copy shows al-Jazari's automaton wine-server, one of the humanoid serving figures his treatise engineered from floats, tipping buckets, and concealed reservoirs so that a mechanical attendant appeared to pour and serve of its own accord. The book's larger ambition was to make inert brass and wood seem to act with the attentiveness of a living servant.",
        "source": "Ibn al-Razzaz al-Jazari, The Book of Knowledge of Ingenious Mechanical Devices (Kitab fi ma'rifat al-hiyal al-handasiyya), completed 1206; illustrated manuscript copy, 1315.",
        "href": "https://commons.wikimedia.org/wiki/File:Al-Djazari_automate_verseur_de_vin.jpg",
        "image": {
          "src": "/covers/openai-first-device-smart-speaker--a0.png",
          "alt": "Manuscript painting of al-Jazari's automaton wine-server, a standing robed figure holding a vessel, from a 1315 copy of the Book of Knowledge of Ingenious Mechanical Devices.",
          "credit": "Automaton wine-server, folio from a 1315 manuscript of al-Jazari's 'Book of Knowledge of Ingenious Mechanical Devices' (1206), The David Collection, Copenhagen. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In early 1890 the Edison Phonograph Toy Manufacturing Company put on sale the world's first mass-produced talking machine for the home: a 22-inch doll with a miniature wax-cylinder phonograph housed in its metal torso, which recited a nursery rhyme when a handle in its back was cranked. Edison had imagined a beloved artificial companion for children, an inanimate figure lent a human voice by his own recording technology. Instead the tinny, disembodied recordings unsettled buyers, children and adults alike found them frightening, and Edison himself came to call the dolls his 'little monsters'; the product was withdrawn within weeks. It is the closest historical rehearsal for OpenAI's device: a manufactured, affordably priced object engineered to talk and seem alive as a domestic companion, riding the era's newest audio technology into the living room. Edison's failure is also a warning about the uncanny line the new device must cross without repelling the people it means to charm.",
        "excerpt": "A single removable phonograph in the doll's chest played one recorded rhyme at a hand-crank, making it the first consumer product built to speak on its own in the home. Many who heard the ghostly wax recordings found the effect eerie rather than endearing, and the talking doll was pulled from the market after only a few weeks.",
        "source": "Edison's Phonograph Doll (Edison Phonograph Toy Manufacturing Company, 1890); contemporary account in Scientific American, 26 April 1890.",
        "href": "https://en.wikipedia.org/wiki/Edison's_Phonograph_Doll",
        "image": {
          "src": "/covers/openai-first-device-smart-speaker--a1.png",
          "alt": "1890 engraving titled 'The Manufacture of Edison's Talking Doll,' showing workers assembling phonograph dolls in a factory.",
          "credit": "'The Manufacture of Edison's Talking Doll,' Scientific American, 26 April 1890. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book X of Ovid's 'Metamorphoses' (8 CE), the sculptor Pygmalion, disgusted with real women, carves an ivory maiden so lifelike that he falls in love with his own creation. He treats the statue as a living companion, kissing it, dressing it, bringing it gifts, and laying it on a couch, until Venus takes pity and the ivory warms into a breathing woman beneath his hands. It is the founding Western fable of a person building an idealized artificial companion and willing it into seeming life. OpenAI's screen-free 'companion,' engineered with sensors and moving parts precisely so that it feels alive and worthy of affection, is a Pygmalion project in silicon: a crafted object designed to invite the very attachment the artist projected onto his ivory maid. Ovid already understood the psychology the device banks on, the human hunger to love a thing we have made and to believe it loves us back.",
        "excerpt": "And carv'd in iv'ry such a maid, so fair,\nAs Nature could not with his art compare,\nWere she to work; but in her own defence\nMust take her pattern here, and copy hence.\nPleas'd with his idol, he commends, admires,\nAdores; and last, the thing ador'd, desires.\nA very virgin in her face was seen,\nAnd had she mov'd, a living maid had been:\nOne wou'd have thought she cou'd have stirr'd, but strove\nWith modesty, and was asham'd to move.\nArt hid with art, so well perform'd the cheat,\nIt caught the carver with his own deceit:\nHe knows 'tis madness, yet he must adore,\nAnd still the more he knows it, loves the more.",
        "source": "Ovid, Metamorphoses, Book X, 'The Story of Pygmalion and the Statue,' trans. Sir Samuel Garth, John Dryden, et al.",
        "href": "https://classics.mit.edu/Ovid/metam.10.tenth.html"
      },
      {
        "category": "literary",
        "title": "In Book XVIII of Homer's 'Iliad' (c. 8th century BCE), when Thetis visits the smith-god Hephaestus, he is attended by golden handmaidens he has forged himself, mechanical servants that look like living young women and possess sense, speech, strength, and the skill of the gods. They move about the workshop and help their maker at his word, the earliest image in Western literature of manufactured beings that talk, sense, and appear alive. OpenAI's device aims at exactly this ancient dream: a made object, endowed with a voice and sensors and moving parts, that behaves like an intelligent attendant in the home. Homer imagined such helpers as the private luxury of a god; the new device proposes to hand a $200 version of Hephaestus's golden servants to any household. The passage is a reminder that the fantasy of the talking artificial servant is nearly three thousand years old.",
        "excerpt": "There were golden handmaids also who worked for him, and were like real young women, with sense and reason, voice also and strength, and all the learning of the immortals; these busied themselves as the king bade them, while he drew near to Thetis, seated her upon a goodly seat, and took her hand in his own.",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler.",
        "href": "https://classics.mit.edu/Homer/iliad.18.xviii.html"
      },
      {
        "category": "artistic",
        "title": "Jean-Léon Gérôme painted 'Pygmalion and Galatea' around 1890, capturing the instant from Ovid when the ivory statue turns to living flesh: the transformation sweeps up from still-pale legs to a warm, twisting torso as the woman bends down to kiss her astonished maker, whose studio is strewn with the tools and masks of his trade. Gérôme, himself also a sculptor, renders the exact seam between artifact and life, the uncanny threshold where a manufactured figure becomes a responsive companion. That threshold is precisely what OpenAI's designers are chasing with cameras, sensors, and mechanical motion, engineering a device that crosses from object to seemingly alive presence. Gérôme's canvas is the visual shorthand for the story's deepest promise and unease: the moment the made thing looks back and embraces you. It hangs today in the Metropolitan Museum of Art.",
        "excerpt": "Gérôme freezes the change mid-body, cool ivory below giving way to blushing, living flesh above as Galatea leans down to kiss Pygmalion, who reaches up in disbelief. Cupid's arrow, the sculptor's scattered tools, and hanging theatrical masks frame the uncanny instant when a crafted figure becomes a living companion.",
        "source": "Jean-Léon Gérôme, Pygmalion and Galatea, ca. 1890, oil on canvas, The Metropolitan Museum of Art, New York (accession 27.200).",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-L%C3%A9on_G%C3%A9r%C3%B4me,_Pygmalion_and_Galatea,_ca._1890.jpg",
        "image": {
          "src": "/covers/openai-first-device-smart-speaker--a4.png",
          "alt": "Painting of Pygmalion embracing Galatea as her ivory statue turns to living flesh from the waist up, in a sculptor's studio.",
          "credit": "Jean-Léon Gérôme, 'Pygmalion and Galatea,' ca. 1890, The Metropolitan Museum of Art, New York. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In Jacques Offenbach's opera 'Les contes d'Hoffmann' (The Tales of Hoffmann), premiered in 1881 and drawn from E.T.A. Hoffmann's tale 'The Sandman,' the poet Hoffmann falls hopelessly in love with Olympia, the beautiful daughter of the inventor Spalanzani, not knowing she is a wind-up mechanical doll. In her celebrated coloratura showpiece 'Les oiseaux dans la charmille' (the 'Doll Song'), Olympia sings with dazzling, birdlike perfection but periodically runs down mid-phrase and must be wound up again before she can continue. The scene is a comic and unsettling meditation on how readily a person will pour real feeling into an artificial companion built to charm the senses. That is the very hope and hazard of OpenAI's device, a manufactured presence engineered to seem alive and lovable enough that users bond with it. Olympia's stuttering aria is a musical portrait of the uncanny animation of the inanimate, and of the human eagerness to be fooled by it.",
        "excerpt": "Olympia dazzles a besotted Hoffmann with a flawless, mechanical aria, then winds down mid-song and freezes until a servant re-cranks her spring, exposing the doll beneath the illusion. Offenbach turns the automaton's charm and its sudden lifelessness into both comedy and a warning about loving a made thing that only seems alive.",
        "source": "Jacques Offenbach, Les contes d'Hoffmann (The Tales of Hoffmann), opéra, premiered 1881; the 'Olympia' act, libretto by Jules Barbier after E.T.A. Hoffmann.",
        "href": "https://imslp.org/wiki/Les_contes_d'Hoffmann_(Offenbach,_Jacques)",
        "image": {
          "src": "/covers/openai-first-device-smart-speaker--a5.png",
          "alt": "19th-century illustration of the Olympia act of Offenbach's Les contes d'Hoffmann, showing the mechanical doll Olympia among figures on stage.",
          "credit": "Pierre-Auguste Lamy (attributed), illustration of the Olympia act of Offenbach's 'Les contes d'Hoffmann,' 1881; restoration by Adam Cuerden. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "us-june-inflation-cools",
    "headline": "U.S. inflation cooled to 3.5% in June as gasoline prices fell, more than economists expected",
    "overview": "U.S. consumer prices rose 3.5% in the year to June, down sharply from 4.2% in May and below the 3.8% economists had expected, as a steep drop in energy costs pulled the headline rate lower. The consumer price index fell 0.4% on the month, its largest monthly decline since April 2020, with gasoline down 9.7%, while core inflation excluding food and energy was flat on the month at a 2.6% annual pace. The softer reading led traders to bet the Federal Reserve would skip a July interest-rate move.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOZ0ZNbFlHYm1IRUhtaVZuak9fcUVtc0UySC1qWnN6Snk2Rzl1NEFQWU9DblNXVGNVak8wNDNCVEwzRFUtc0xVM0xWWUFEMGFWSzlzcDdJYVQ5U0FxMHkxVDZ6YnpJNmNvdWhJRFlsMWpXYUoyRVd3SVVQS0xuNEdiMWdERkh3VDhHMXNjNDV4c0xURVBfOHc?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPejVocHU3MHFoUThMM0FoSk5ILWllYXdVa09OYmEtTjFoelpoVFl3T2kyYUR3UE85SnVLb01CbjV4TkJhMC0zajNCUHhza3c5RnJJaElFbnUyMV9YSmJ6VDUtWHFBUEdwSHd4eWUxMjNONzd2SS1zaENIdVJfWFFmX200YnV3Ym5YekpxVXBjVm91OWRXUy1xVTJHbkE4cHFOTDJF?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/us-june-inflation-cools.png",
      "alt": "Fuel pumps at a gasoline station.",
      "credit": "Photo by Harrison Keely, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 301 AD the emperor Diocletian, having debased the Roman coinage until a runaway spiral of prices gripped the empire, issued his Edict on Maximum Prices, carving legal ceilings for everything from wheat to wages onto stone slabs set up in public markets. The law was a blunt attempt to command the value of money back into place, and it failed spectacularly: goods vanished from stalls rather than be sold at a loss, black markets flourished, and the decree was eventually abandoned. The chronicler Lactantius records that the scarcity grew worse and blood was shed over trifles before the ordinance was scrapped. It is the ancient bookend to today's story: where Diocletian tried and failed to force prices down by fiat, the June CPI shows prices easing on their own as gasoline fell 9.7% and the headline rate slipped to 3.5%. The contrast underscores how much harder it is to legislate the value of money than to let supply, demand and cooling energy costs do the work.",
        "excerpt": "Then much blood was shed for the veriest trifles; men were afraid to expose anything to sale, and the scarcity became more excessive and grievous than ever, until, in the end, the ordinance, after having proved destructive to multitudes, was from mere necessity abrogated.",
        "source": "Lactantius, Of the Manner in Which the Persecutors Died (De Mortibus Persecutorum), ch. 7, trans. William Fletcher, Ante-Nicene Fathers vol. 7.",
        "href": "https://www.newadvent.org/fathers/0705.htm",
        "image": {
          "src": "/covers/us-june-inflation-cools--a0.png",
          "alt": "Fragment of a stone slab inscribed with Diocletian's Edict on Maximum Prices, displayed in Berlin.",
          "credit": "Fragment of Diocletian's Edict on Maximum Prices (301 AD), Antikensammlung Berlin / Pergamonmuseum. Photo: MatthiasKabel, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "During the French Revolution the National Assembly issued the assignats, paper notes nominally secured by confiscated Church lands, and printed them in ever greater floods to cover the state's debts. As the presses ran, the notes lost value and the prices of bread, shoes and eggs soared week by week; Andrew Dickson White's classic account describes how a gold louis d'or became a silent daily barometer of the assignat's collapse, and how ordinary goods became 'enormously dear.' It is a near-perfect inversion of the June inflation report: where Revolutionary France watched the value of its money erode and everyday prices climb relentlessly, American consumers in June saw the opposite relief, with the annual CPI dropping from 4.2% to 3.5% and the biggest monthly decline since April 2020. White's essay is the cautionary shadow behind every inflation number, a reminder of how painful the erosion of money's value can become. Against that history, a cooling print reads as a hard-won reprieve.",
        "excerpt": "The louis d'or stood in the market as a monitor, noting each day, with unerring fidelity, the decline in value of the assignat; a monitor not to be bribed, not to be scared.",
        "source": "Andrew Dickson White, Fiat Money Inflation in France: How It Came, What It Brought, and How It Ended (1912), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/6949/6949-h/6949-h.htm",
        "image": {
          "src": "/covers/us-june-inflation-cools--a1.png",
          "alt": "A 1793 French Revolution assignat paper banknote.",
          "credit": "French Revolution assignat, 1793. Photo: Joe deSousa, via Wikimedia Commons (CC0 / public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Act I of Goethe's Faust, Part Two, Mephistopheles rescues the bankrupt Emperor by conjuring paper money: notes signed in a festive moment and multiplied a thousandfold overnight, each promising to be redeemed by undiscovered gold buried in the imperial lands. The Chancellor reads the note aloud, the currency spreads 'like wild-fire' through money-changers, landlords, butchers and bakers, and for a giddy moment the whole realm feels rich. Goethe, writing with the memory of the Revolutionary assignats, dramatizes the seductive magic and hidden peril of money whose value rests on faith alone. The scene is the literary archetype of inflation's origins, and it throws the June report into relief: this is a story not of new money conjured into being but of the value of existing money steadying, as gasoline prices fell and the annual inflation rate cooled to 3.5%. Faust reminds readers how easily confidence in money's worth can be inflated, and how welcome its calm restoration feels.",
        "excerpt": "“To all to whom this cometh, be it known:\nA thousand crowns in worth this note doth own.\nIt to secure, as certain pledge, shall stand\nAll buried treasure in the Emperor’s land:\nAnd ’t is decreed, perfecting thus the scheme,\nThe treasure, soon as raised, shall this redeem.”\n[...]\nEmperor.\nAnd with my people does it pass for gold?\nFor pay in court and camp, the notes they hold?\nThen I must yield, although the thing ’s amazing.\nLord High Steward.\n’T was scattered everywhere, like wild-fire blazing,\nAs currency, and none its course may stop.\nA crowd surrounds each money-changer’s shop,\nAnd every note is there accepted duly\nFor gold and silver’s worth — with discount, truly.",
        "source": "Johann Wolfgang von Goethe, Faust, Part Two, Act I (Pleasure-Garden / Paper-Money scene), trans. Bayard Taylor, Wikisource.",
        "href": "https://en.wikisource.org/wiki/Faust_(trans._Bayard_Taylor)/Act_I/IV"
      },
      {
        "category": "literary",
        "title": "In the Book of Genesis, Pharaoh dreams of seven fat cattle devoured by seven lean ones, and Joseph reads the dream as seven years of great plenty to be followed by seven years of grievous famine. Joseph's counsel is to store grain in the fat years so the land can endure the lean ones, an ancient parable of husbanding abundance against future want, of managing the swing between glut and scarcity that drives the price of bread. The story maps onto the rhythm behind the June inflation numbers: after a painful stretch of rising prices, June brought relief, with headline CPI down to 3.5% from 4.2% and the sharpest monthly drop since April 2020. Like Egypt after the fat years, the moment offers a reprieve, but Joseph's warning that plenty can be 'forgotten' in the face of famine echoes the caution in the data, where core inflation held flat at 2.6% and the easing may prove uneven. It is the oldest reminder that fortunes in food and money rise and fall, and that relief should be neither squandered nor assumed permanent.",
        "excerpt": "Behold, there come seven years of great plenty throughout all the land of Egypt: And there shall arise after them seven years of famine; and all the plenty shall be forgotten in the land of Egypt; and the famine shall consume the land; And the plenty shall not be known in the land by reason of that famine following; for it shall be very grievous.",
        "source": "Genesis 41:29–31, King James Version (1611), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/us-june-inflation-cools--a3.png",
          "alt": "Painting of Joseph as overseer of Pharaoh's granaries, a scribe counting grain at his feet.",
          "credit": "Lawrence Alma-Tadema, Joseph, Overseer of Pharaoh's Granaries (1874), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys's 1514 panel The Moneylender and His Wife, now in the Louvre, shows a Flemish couple at a table where the husband weighs gold coins on a delicate balance while his wife, distracted from her illuminated prayer book, watches the scale. Every object is a meditation on value: the convex mirror, the pearls, the scattered coins, the precise tilt of the beam that decides what a piece of metal is truly worth. The painting is one of Western art's great images of the measured, anxious business of pricing money itself, weighing worth grain by grain. That is exactly the drama beneath the June CPI report, where the market re-weighs the value of money each month and found it holding steadier, gasoline down 9.7% and inflation cooling to 3.5%. Matsys makes visible the invisible act at the heart of every inflation number: the constant, careful measuring of what money is worth.",
        "excerpt": "A Flemish moneylender delicately weighs gold and silver coins on a hand-held balance while his richly dressed wife, her prayer book open before her, turns her gaze from devotion to the glinting scale, the couple absorbed in the exacting task of measuring money's worth.",
        "source": "Quentin Matsys, The Moneylender and His Wife (1514), oil on panel, Musée du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/us-june-inflation-cools--a4.png",
          "alt": "A Flemish moneylender weighing coins on a balance while his wife, holding a prayer book, watches.",
          "credit": "Quentin Matsys, The Moneylender and His Wife (1514), Musée du Louvre. Via Wikimedia Commons / The Yorck Project (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 1565 panel The Harvesters, part of his cycle of the seasons and now at the Metropolitan Museum of Art, depicts peasants cutting golden wheat under a hazy summer sky while others rest, eat and drink in the shade of a tree, the year's abundance spread across the land. It is one of art's most humane images of plenty after labor, of the harvest that eases hunger and settles the price of bread. The scene resonates with the relief threaded through the June inflation report: after a painful climb, prices cooled, headline CPI fell 0.4% on the month and the annual rate dropped to 3.5%, an economic harvest of sorts. Bruegel's field of ripe grain stands for the same easing of scarcity that a falling inflation number brings, the sense that the cost of living has, for a season, become more bearable. It is the visual counterpart to relief after hardship, the fat years arriving in paint.",
        "excerpt": "Beneath a hazy summer sky, peasants scythe and gather ripe golden wheat while others rest and share a midday meal in the shade of a tree, the whole valley heavy with the abundance of a good harvest.",
        "source": "Pieter Bruegel the Elder, The Harvesters (1565), oil on panel, The Metropolitan Museum of Art, New York.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-june-inflation-cools--a5.png",
          "alt": "Peasants harvesting and resting in a field of golden wheat under a summer sky.",
          "credit": "Pieter Bruegel the Elder, The Harvesters (1565), The Metropolitan Museum of Art. Via Wikimedia Commons / Google Art Project (public domain)."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "ukraine-downs-five-russian-missiles",
    "headline": "Ukraine says it shot down five Russian ballistic missiles over Kyiv as it seeks to bolster air defenses",
    "overview": "Ukraine's air force said it downed five Russian ballistic missiles during overnight attacks, its first reported interceptions of such missiles in nearly two weeks, though other missiles and drones broke through and struck the capital, Kyiv. Officials said the interceptors were likely U.S.-made Patriot systems, whose munitions have been in short supply amid the war in the Middle East. Russia's defense ministry said its own air defenses had shot down 288 Ukrainian drones over several regions overnight.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOOGlUSjEtcGs2cXl3c3llbFhFNGtvcENoQkF5WTB0TVZVYnk4Y3o5TEZmcXREUjhFRFJBbDQwakM2WjF0S01nQ2ZhaWZaRXdJRk8yc3h2SVhrYTBrZkxpbGpRTWRHWm9Rc2RwRmJfOHNLREVRUzBYNDM3QjNXRF9aM0Rwb3lEc01EUDBKdWZrOVNMaElmZnh2eUI2dEZUWDdTc1pTOVVTaGFCMjN0WDJPaURrX1M?oc=5"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/world/2026/07/14/russia-ukraine-ballistic-missiles-patriot-attacks-kyiv/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/ukraine-downs-five-russian-missiles.png",
      "alt": "A Patriot air-defense missile launcher silhouetted at dawn.",
      "credit": "U.S. Army photo by 2nd Lt. Emily Park, public domain"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the autumn of 1940, London became the front line of the Blitz as the Luftwaffe sent waves of bombers over the capital, beginning with the raids of 7 September that set the East End docks ablaze. Night after night the city's defenders answered with searchlights raking the sky, barrage balloons, the crash of anti-aircraft 'ack-ack' guns, and RAF fighters climbing to intercept the raiders, while ordinary Londoners sheltered and carried on in what became known as the Blitz spirit. Early on the guns and lights struggled to bring the attackers down, but improving radar and gunnery gradually let the defenders claim their share of the sky. The parallel to Kyiv is direct: a besieged capital under sustained aerial bombardment, its skies contested by interceptors, its people enduring nightly assault. Ukraine's air force downing five ballistic missiles over Kyiv is the modern echo of London's gunners and Spitfires wresting back control of the air, one raider at a time.",
        "excerpt": "On the first evening of the Blitz, 7 September 1940, a German Heinkel He 111 was photographed from the air as it droned over Wapping and the Isle of Dogs, the docks below already smoking. Over the months that followed, London's searchlights, anti-aircraft batteries and fighters would turn the night sky into a contested battlefield, and the endurance of its people under bombardment passed into legend as the Blitz spirit.",
        "source": "German Heinkel He 111 bomber over Wapping and the Isle of Dogs, East London, 7 September 1940 (the first day of the Blitz). Australian War Memorial / Imperial War Museums.",
        "href": "https://commons.wikimedia.org/wiki/File:Heinkel_He_111_over_Wapping,_East_London.jpg",
        "image": {
          "src": "/covers/ukraine-downs-five-russian-missiles--a0.png",
          "alt": "Aerial photograph of a German Heinkel He 111 bomber flying over the Thames and the docks of East London on 7 September 1940.",
          "credit": "Photograph taken from a German aircraft, 7 September 1940; Australian War Memorial (C219738) / Imperial War Museums. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the spring of 1453 the Ottoman sultan Mehmed II laid siege to Constantinople, the storied capital of the Byzantine Empire, ringed by the great Theodosian land walls that had turned back attackers for a thousand years. This time the walls faced a new terror: enormous bronze bombards, including the giant cannon cast by the founder Orban, that hurled stone balls weighing hundreds of kilograms and pounded breaches in defenses no earlier army could crack. For weeks the outnumbered defenders manned the ramparts, patching walls by night and beating back assaults by day, until the bombardment and the final storm overwhelmed them on 29 May. The siege is the archetype of a capital enduring relentless bombardment, its shield of walls tested against a revolutionary projectile weapon. Kyiv's struggle is the same duel across the centuries: a besieged capital, its defenses strained against a new generation of bombardment, fighting to keep the shield intact against the missile.",
        "excerpt": "A French manuscript illumination made shortly after the event shows Mehmed II's camp and cannon arrayed before the towers and walls of Constantinople, the defenders crowded on the ramparts as the bombardment falls. It captures the essence of a capital under siege: a ring of walls, an encircling army, and the new artillery battering at the last line of defense.",
        "source": "Jean Le Tavernier, miniature of the Siege of Constantinople (1453), from Bertrandon de la Broquiere's Voyage d'Outremer (Jean Mielot translation), after 1455. Bibliotheque nationale de France, MS Francais 9087, fol. 207v.",
        "href": "https://commons.wikimedia.org/wiki/File:Le_si%C3%A8ge_de_Constantinople_(1453)_by_Jean_Le_Tavernier_after_1455.jpg",
        "image": {
          "src": "/covers/ukraine-downs-five-russian-missiles--a1.png",
          "alt": "Fifteenth-century manuscript illumination of the 1453 siege of Constantinople, showing the Ottoman camp and cannon before the city's walls and towers.",
          "credit": "Jean Le Tavernier (d. 1462), after 1455; Bibliotheque nationale de France (MS Fr. 9087). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer's Iliad is the founding poem of the besieged city, set in the tenth year of the siege of Troy, whose walls stand as the great symbol of a defended capital under assault. In Book 12 the fighting surges against a fortified rampart and the poem describes the missiles flying so densely that Homer likens them to a heavy snowfall sent by Zeus, the very snowflakes imagined as the god's arrows blanketing the earth. It is the ancient image of projectiles raining down on defenders, and of the shield raised to meet the arrow, that runs through the whole epic. That is exactly the scene over Kyiv: a capital under a storm of incoming projectiles, its defenders straining to hold the line as missiles and drones fall like the snow-arrows of the Iliad. When Ukraine's interceptors knock five ballistic missiles out of that storm, they enact the epic's oldest drama, the shield answering the arrow above a besieged city.",
        "excerpt": "And as flakes of snow fall thick on a winter's day, when Zeus, the counsellor, bestirreth him to snow, shewing forth to men these arrows of his...",
        "source": "Homer, Iliad, Book 12, ll. 278ff, trans. A. T. Murray (Loeb Classical Library, 1924), via the Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=12:card=278"
      },
      {
        "category": "literary",
        "title": "Lord Byron's 1815 lyric 'The Destruction of Sennacherib,' from his Hebrew Melodies, retells the biblical deliverance of Jerusalem from the vast Assyrian army of King Sennacherib, whose host is struck down overnight before it can take the city. Byron opens with one of the most famous martial similes in English, the Assyrian sweeping down 'like the wolf on the fold' with spears gleaming like stars, then shows that gigantic force annihilated in a single night so that the besieged capital is spared. The poem is built on the theme of a menacing bombardment against a city that, against the odds, survives the night. The resonance with Kyiv is striking: an overwhelming attacking force loosed against a capital under cover of darkness, and a night in which the defenders, for once, hold and the city endures. Ukraine's overnight interception of five missiles is a small modern version of Byron's deliverance, the threatened capital greeting the dawn still standing.",
        "excerpt": "The Assyrian came down like the wolf on the fold,\nAnd his cohorts were gleaming in purple and gold;\nAnd the sheen of their spears was like stars on the sea,\nWhen the blue wave rolls nightly on deep Galilee.",
        "source": "Lord Byron, 'The Destruction of Sennacherib,' Hebrew Melodies (1815).",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_3/Hebrew_Melodies/The_Destruction_of_Sennacherib"
      },
      {
        "category": "artistic",
        "title": "John Martin's vast 1852 canvas 'The Destruction of Sodom and Gomorrah' is one of the great English images of a city consumed from the sky, painted by an artist famous for apocalyptic scenes of doomed cities under celestial fire. In a lurid red glare, fire and brimstone rain down out of a churning storm onto the towers and buildings of the twin cities, while tiny human figures flee in the foreground and Lot's wife looks back to her destruction. Martin turns bombardment into spectacle: a whole city helpless beneath projectiles falling from the heavens. That is the nightmare vision behind every account of a capital under missile attack, the fire arriving from above with nowhere to hide. Set against the news from Kyiv, the painting dramatizes the stakes of the duel in the sky, the terror of a city under bombardment and, by contrast, the meaning of an air defense that can intercept the fire before it lands.",
        "excerpt": "Martin's canvas glows with an infernal red as a storm in the heavens hurls fire down on the towers of Sodom, the city dissolving into flame while figures scatter helplessly in the foreground. It renders, in paint, the primal dread of a capital being destroyed by projectiles falling out of the sky, the very fate that modern air defenses over Kyiv exist to prevent.",
        "source": "John Martin, The Destruction of Sodom and Gomorrah, oil on canvas, 1852, Laing Art Gallery, Newcastle upon Tyne.",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_Sodom_and_Gomorrah.jpg",
        "image": {
          "src": "/covers/ukraine-downs-five-russian-missiles--a4.png",
          "alt": "John Martin's 1852 painting showing fire raining from a red, storm-filled sky onto the burning cities of Sodom and Gomorrah, with figures fleeing in the foreground.",
          "credit": "John Martin (1789-1854), 1852; Laing Art Gallery, Newcastle upon Tyne. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pyotr Ilyich Tchaikovsky's 1812 Overture, composed in 1880, is the most famous piece of music ever written about a capital under attack, depicting the defense of Russia and Moscow against Napoleon's 1812 invasion. The overture builds from a solemn Orthodox hymn through surging battle music into a climactic storm of cannon fire, pealing bells and a triumphant hymn of deliverance, translating the din of bombardment and its aftermath directly into sound. It is, in effect, an orchestral portrait of a besieged capital enduring assault and emerging defiant, the roar of artillery answered by the ringing of a city's bells. That imagery maps onto the nights over Kyiv, where the thunder of air defense answers the incoming missiles above the capital. There is a bitter irony too: the work celebrates a Russia repelling an invader, and today it is Ukraine's capital that plays the part of the bombarded city holding its ground against the guns.",
        "excerpt": "Tchaikovsky scores the defense of a capital as pure sound: a hymn of prayer, the clash of contending anthems, and finally a barrage of cannon shots and pealing bells that turn bombardment and survival into music. Heard against the news from Kyiv, its artillery climax reads as the roar of a city's defenses answering the missiles overhead.",
        "source": "Pyotr Ilyich Tchaikovsky, The Year 1812, Festival Overture in E-flat major, Op. 49 (composed 1880). IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/ukraine-downs-five-russian-missiles--a5.png",
          "alt": "Photographic portrait of the composer Pyotr Ilyich Tchaikovsky, taken by Emile Reutlinger in 1888.",
          "credit": "Photograph of Pyotr Tchaikovsky by Emile Reutlinger, 1888. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "tyrannosaurus-rex-gus-record-auction",
    "headline": "T. rex skeleton nicknamed 'Gus' sells for a record $50.1 million at Sotheby's in New York",
    "overview": "A 67-million-year-old Tyrannosaurus rex skeleton nicknamed 'Gus' sold for a record $50.1 million at Sotheby's in New York, making it the most expensive dinosaur fossil ever auctioned. The 38-foot specimen, unearthed in Harding County, South Dakota, and among the largest T. rexes known, drew a roughly 10-minute bidding war among seven bidders and far exceeded its $20 million to $30 million estimate. The sale eclipsed the $44.6 million paid in 2024 for the Stegosaurus 'Apex.'",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxORkNGTVhKMER3ZVZJVG1CTnU3NGVmTmc3RTAyTVdTVENmSXdtS0ZVQVNFQTFWcHZ3alNFekFGcW9iVHlTbHJsWmRFZng2YWpYTWJ5STJ0Z2lyV3Y0djBvSnQzYTNkeDZCNmo4b0VXRDR5ZTdZWXNHcm9DUDV4VDNiMzJGdEJCcmgycGdyektyZFdBSkEybTlYbnc1SDhUdVZNN0k1ZFUxR3FtMFBla2JNM0VKcw?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/14/science/gus-t-rex-fossil-sale-auction"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/tyrannosaurus-rex-gus-record-auction.png",
      "alt": "A mounted Tyrannosaurus rex skeleton on display in a museum.",
      "credit": "Photo by Zissoudisctrucker, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the mid-fifth century BC, Herodotus recorded how the Spartans, told by the Delphic oracle that they could never beat Tegea until they recovered the bones of the hero Orestes, sent the agent Lichas to hunt for them. At a Tegean smithy Lichas heard of a coffin twelve feet long unearthed while digging a well, its corpse as huge as the box; convinced these were the giant bones of Orestes, he schemed to lease the courtyard, dug them up, and carried them home to Sparta, whereupon the Spartans triumphed. Modern classicists such as Adrienne Mayor, in 'The First Fossil Hunters,' argue the oversized remains were almost certainly Ice Age fossils, mammoth or mastodon, reinterpreted as the relics of a legendary giant. It is the deepest ancestor of the Gus story: outsized bones of a vanished colossus dug from the ground, invested with extraordinary value, and moved at great effort because of the power and prestige they were believed to confer. Where Sparta prized the bones for victory, a bidder at Sotheby's paid $50.1 million for possession of a comparable relic of the deep past.",
        "excerpt": "I wanted to dig a well in the courtyard here, and in my digging I hit upon a coffin twelve feet long. I could not believe that there had ever been men taller than now, so I opened it and saw that the corpse was just as long as the coffin. I measured it and then reburied it.” So the smith told what he had seen, and Lichas thought about what was said and reckoned that this was Orestes, according to the oracle. [...] He dug up the grave and collected the bones, then hurried off to Sparta with them. Ever since then the Spartans were far superior to the Tegeans whenever they met each other in battle.",
        "source": "Herodotus, The Histories, Book 1, chapter 68 (A. D. Godley translation), Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0126%3Abook%3D1%3Achapter%3D68",
        "image": {
          "src": "/covers/tyrannosaurus-rex-gus-record-auction--a0.png",
          "alt": "Ancient Corinthian black-figure vase showing the hero Perseus, Andromeda, and the sea-monster Ketos, whose bare, skull-like head has been linked by scholars to fossil animal skulls.",
          "credit": "Corinthian vase depicting Perseus, Andromeda and Ketos (c. 6th century BC). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Mary Anning (1799-1847) was a working-class fossil collector of Lyme Regis on England's Dorset coast who, from childhood, prised the skeletons of ichthyosaurs, plesiosaurs and a pterosaur from crumbling seaside cliffs and sold them to survive. An 1865 profile in Charles Dickens's journal 'All the Year Round' records that a lady's payment of half a crown for a fine ammonite first turned her scavenging into a livelihood, and quotes Cuvier calling her plesiosaur 'the most monstrous animal that has yet been found amid the ruins of a former world.' Her creatures, dismissed by some as impossible chimeras, were among the first hard evidence that whole orders of giant life had existed and gone extinct, deep-time monsters converted, bone by bone, into cash for a poor woman and prestige for the gentlemen geologists who bought them. The Gus auction is the same transaction magnified almost beyond recognition: the fossil of a vanished monster, dug from the rock and turned into money, only now the ammonite's half crown has become $50.1 million and the buyer is an anonymous bidder rather than a curious tourist.",
        "excerpt": "Just then a lady gave her half crown for a very choice ammonite. This encouraged her to take to collecting as a regular means of life. [...] Verily, this is altogether the most monstrous animal that has yet been found amid the ruins of a former world. It had a lizard's head, a crocodile's teeth, a trunk and tail like an ordinary quadruped, a chameleon's ribs, a whale's paddles, whilst its neck was of enormous length, like a serpent tacked onto the body.",
        "source": "\"Mary Anning, the Fossil Finder,\" All the Year Round (conducted by Charles Dickens), 11 February 1865, pp. 60-63. Transcription via The Victorian Web.",
        "href": "https://victorianweb.org/periodicals/ayr/anning.html",
        "image": {
          "src": "/covers/tyrannosaurus-rex-gus-record-auction--a1.png",
          "alt": "Painted portrait of fossil collector Mary Anning holding a rock hammer and a specimen, with her dog Tray at her feet and the cliffs of Lyme Regis behind her.",
          "credit": "Portrait of Mary Anning (before 1842), artist unknown; Natural History Museum, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley's sonnet 'Ozymandias,' first published in Leigh Hunt's 'The Examiner' on 11 January 1818, describes a traveller's report of a shattered colossal statue half-sunk in desert sand, its pedestal boasting 'My name is Ozymandias, King of Kings' while nothing but 'lone and level sands' surrounds the wreck. The poem was written as the British Museum was acquiring the colossal bust of Ramesses II (the 'Younger Memnon'), and it distils the theme of a mighty being reduced to a broken relic gawked at by later ages. A T. rex was, in its own kingdom, the ultimate king of kings, its dominion ended sixty-seven million years ago by an extinction more total than any pharaoh's fall. When Gus's 38-foot skeleton stands under Sotheby's lights and the gavel falls at a record price, it is the modern equivalent of the traveller stumbling on the colossal wreck: a monument to vanished power, marvelled at and haggled over by the small, transient creatures who came after.",
        "excerpt": "I met a Traveller from an antique land,\nWho said, “Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n“My name is Ozymandias, King of Kings.”\nLook on my works ye Mighty, and despair!\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley (as \"Glirastes\"), \"Ozymandias,\" The Examiner, No. 524, 11 January 1818. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/tyrannosaurus-rex-gus-record-auction--a2.png",
          "alt": "Early 19th-century print showing labourers hauling the colossal stone head and shoulders of Ramesses II, the 'Younger Memnon,' across the sand toward the Nile.",
          "credit": "Agostino Aglio, print of the removal of the 'Younger Memnon' (Ramesses II) from Belzoni's Narrative (c. 1820). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson's elegy 'In Memoriam A.H.H.' (1850), written over the seventeen years after the death of his friend Arthur Hallam, confronts the new geology and its parade of extinct species with a famous crisis of faith. In the section beginning 'So careful of the type?' Nature herself cries that 'a thousand types are gone,' shows herself 'red in tooth and claw,' and reduces Man to 'a monster then, a dream, / A discord,' mere kin to the 'Dragons of the prime, / That tare each other in their slime.' Tennyson's 'Dragons of the prime' are almost literally what Gus was: an apex predator of the primeval world, a fossil monster that tore other giants apart before joining the thousand vanished types. His lines capture exactly the vertigo of deep time and extinction that hangs over the auction, the sense that this magnificent creature is at once a wonder and a memento mori. That Gus should fetch $50.1 million adds a modern irony Tennyson would have relished: the very emblem of nature's indifference to individual life has become a priceless human trophy.",
        "excerpt": "Who trusted God was love indeed\n  And love Creation's final law—\n  Tho' Nature, red in tooth and claw\nWith ravine, shriek'd against his creed—\n[...]\nNo more? A monster then, a dream,\n  A discord. Dragons of the prime,\n  That tare each other in their slime,\nWere mellow music match'd with him.",
        "source": "Alfred Tennyson, In Memoriam A.H.H. (1850), the canto 'So careful of the type?' (numbered LV in this edition; commonly cited as LVI). Wikisource.",
        "href": "https://en.wikisource.org/wiki/In_Memoriam_(Tennyson)/Canto_55",
        "image": {
          "src": "/covers/tyrannosaurus-rex-gus-record-auction--a3.png",
          "alt": "1830 watercolour of an ancient Dorset sea teeming with prehistoric reptiles, including ichthyosaurs and plesiosaurs attacking and devouring one another among ammonites and marine life.",
          "credit": "Henry De la Beche, 'Duria Antiquior, A More Ancient Dorset' (1830). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Charles R. Knight (1874-1953) was the American painter and sculptor whose reconstructions of prehistoric life, made for the American Museum of Natural History and the Field Museum, defined how the modern public pictures dinosaurs. His depictions of Tyrannosaurus rex, following the type specimen Barnum Brown dug from the American West and unveiled in 1905-06, gave the newly named 'tyrant lizard king' its first vivid public face as a towering, upright predator. Knight's images turned a jumble of excavated bones into an awe-inspiring, almost mythic beast, performing in paint the same alchemy the auction performs in money: transforming fossil remains into an object of wonder and desire. Gus, a 67-million-year-old, 38-foot T. rex, is a direct descendant of the very animal Knight immortalized, and its record sale confirms that the tyrant king Knight helped enthrone reigns now as the supreme trophy of natural history. The paleoartist made the T. rex a cultural treasure; the saleroom has now made it a literal one.",
        "excerpt": "Knight's kangaroo-postured Tyrannosaurus, tail dragging and jaws agape, became the template for every later monster of the museum halls and the movie screen. In a single image he fused scientific reconstruction with primal menace, teaching millions to feel the shiver of standing before a resurrected king of the Cretaceous. His art is the reason a pile of Hell Creek bones can command a nation's attention and a fortune at auction.",
        "source": "Charles R. Knight, restoration of Tyrannosaurus rex (1919), for the American Museum of Natural History. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:T._rex_old_posture.jpg",
        "image": {
          "src": "/covers/tyrannosaurus-rex-gus-record-auction--a4.png",
          "alt": "Early 20th-century painting of Tyrannosaurus rex standing upright in an old-fashioned tail-dragging posture, jaws open, against a barren prehistoric landscape.",
          "credit": "Charles R. Knight, Tyrannosaurus rex restoration (1919). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In 'Fossiles,' the twelfth movement of Camille Saint-Saëns's private 1886 suite 'Le carnaval des animaux' (The Carnival of the Animals), a xylophone clacks out a dry, rattling tune meant to evoke dancing bones, quoting the composer's own 'Danse macabre' alongside old French folk songs like 'Ah! vous dirai-je, maman.' The joke is that fossils, and by extension worn-out old tunes, are the bony leftovers of things once alive, now rattling on in comic afterlife. Saint-Saëns caught, wittily, the strange cultural status of the fossil: a relic of extinction that we handle, arrange, and even make perform for us. The auction of Gus stages the same idea without the irony, as the bones of a long-dead monster are made to dance, this time to the rhythm of a $50.1 million bidding war. Both the movement and the saleroom turn the remains of deep time into a spectacle for a delighted, paying audience.",
        "excerpt": "The 'Fossils' movement lets a xylophone imitate the click of dry bones, a skeleton dance built from recycled melodies, so that the leftovers of the dead literally make the music. It is extinction rendered as entertainment: the relic dug from the past set clattering for our amusement. Heard beside the Gus sale, it sounds like a knowing overture to the commodification of ancient bones.",
        "source": "Camille Saint-Saëns, \"Fossiles\" (No. 12), Le carnaval des animaux (composed 1886; published 1922). IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/tyrannosaurus-rex-gus-record-auction--a5.png",
          "alt": "Portrait drawing of the French composer Camille Saint-Saëns, bearded and in formal 19th-century dress.",
          "credit": "Gustave Boulanger, portrait of Camille Saint-Saëns (1884). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "rauschenberg-gluts-artist-rooms",
    "headline": "Rauschenberg Foundation donates three 'Gluts' sculptures to the Tate-National Galleries of Scotland Artist Rooms collection",
    "overview": "The Robert Rauschenberg Foundation has donated three of the artist's 'Gluts' sculptures to Artist Rooms, the modern-art collection jointly held by Tate and the National Galleries of Scotland. The works - G-I Glut (1986), Rasputin's Revenge Early Winter Glut (1987) and Mobile Cluster Glut (Neapolitan) (1987) - were assembled from salvaged gas-station signs and scrap metal as Rauschenberg's commentary on 1980s consumer excess during an oil glut. The pieces are due to go on display at Tate Modern in 2027.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/robert-rauschenberg-sculptures-donated-to-artist-rooms-1234754495/"
      },
      {
        "name": "The Art Newspaper",
        "href": "https://www.theartnewspaper.com/2026/07/14/robert-rauschenberg-foundation-donates-three-sculptures-to-joint-tate-and-national-galleries-of-scotland-collection"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/rauschenberg-gluts-artist-rooms.png",
      "alt": "A sculpture assembled from welded scrap metal.",
      "credit": "Photo by Thomas (Philadelphia Area), CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Constantine's triumphal arch was raised beside the Colosseum in 315 AD, much of its finest sculpture was not carved fresh but stripped from older imperial monuments — hunting roundels from Hadrian's day, battle panels from Trajan's forum, reliefs from a lost arch of Marcus Aurelius — with the earlier emperors' portrait heads recut into Constantine's own likeness. This deliberate reuse of salvaged fragments, known to art historians as spolia, made a new public monument out of the honoured debris of the past, binding present power to inherited grandeur. Like Rauschenberg's 'Gluts', which weld cast-off gas-station signs and automotive scrap into freshly meaningful objects, the arch turns salvage into statement, refusing to let old material go to waste. Both works prove that assemblage from reclaimed pieces is no modern novelty but a recurring human instinct: to build the monumental and the meaningful out of what an earlier age discarded. And both were made for the public realm — the arch for the Roman people, the 'Gluts' now gifted to a national collection.",
        "excerpt": "The Arch of Constantine is the largest surviving Roman triumphal arch, and its decoration is a patchwork of spolia — medallions, statues and relief panels prised from earlier monuments to Trajan, Hadrian and Marcus Aurelius, their imperial faces recut as Constantine's own. Salvaged stone, reassembled, became a new monument to a new age. Piranesi's eighteenth-century etching records the arch still standing amid the ordinary life of Rome, its reused carvings intact.",
        "source": "Giovanni Battista Piranesi, 'Veduta dell'Arco di Costantino' (View of the Arch of Constantine), from the series 'Vedute di Roma', etching, c. 1748–1778. Rijksmuseum, Amsterdam, object RP-P-OB-39.392.",
        "href": "https://www.rijksmuseum.nl/en/collection/RP-P-OB-39.392",
        "image": {
          "src": "/covers/rauschenberg-gluts-artist-rooms--a0.png",
          "alt": "Piranesi etching of the Arch of Constantine in Rome, its sculptural reliefs — many salvaged from earlier monuments — visible above figures walking below.",
          "credit": "Giovanni Battista Piranesi (1720–1778), 'Veduta dell'Arco di Costantino', etching, c. 1748–1778. Rijksmuseum, Amsterdam (CC0 1.0, public domain), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the Hannover of the early 1920s, the German artist Kurt Schwitters began gluing and nailing together the rubbish of modern city life — tram tickets, commercial labels, newspaper scraps, bits of wire, wood and fabric — into collages and assemblages he called 'Merz', a nonsense syllable he clipped from the word 'Commerzbank' on a torn advertisement. He insisted that a bus ticket or a broken cork could carry the same artistic value as a stroke of paint, and he eventually built entire architectural environments, his 'Merzbau', out of found and reclaimed matter. This was refuse consciously reframed as art, a Dada-era anticipation of exactly the salvage aesthetic Rauschenberg would later pursue. The 'Gluts', pieced together from junked signage and automotive scrap, extend Schwitters's core conviction: that the discarded detritus of commerce and industry can be dignified into deliberate, exhibited form. Where Schwitters mocked the commercial word 'Commerz', Rauschenberg's oil-glut sculptures aim their salvage squarely at the waste of consumer excess.",
        "excerpt": "Merz was Schwitters's own coinage for collage and assemblage built from scavenged scrap — the labels, printed ephemera, wood, fabric and metal he gathered off the streets of Hannover — each fragment, in his view, worth as much as paint. From this refuse he made pictures, and finally whole reclaimed-material environments. It is one of the founding gestures of turning industrial cast-offs into art.",
        "source": "Tate, art term: 'Merz' (Kurt Schwitters, c. 1919 onward). Tate, London.",
        "href": "https://www.tate.org.uk/art/art-terms/m/merz"
      },
      {
        "category": "literary",
        "title": "Charles Dickens's last completed novel, 'Our Mutual Friend' (1864–65), turns literal rubbish into the engine of its plot: the fortune at its centre was heaped up by old Harmon, a 'Dust Contractor' who grew rich on the great mounds of refuse — dust, ash, bone, broken crockery — that Victorian London's waste-pickers sifted for anything resaleable. Dickens saw, decades before assemblage art, that value and even beauty could be salted through the city's discarded matter, and that whole lives could be built on the reclamation of waste. His dust-heaps are both a fortune and a moral emblem: wealth is quite literally raised from what society throws away. Rauschenberg's 'Gluts' perform the same alchemy in metal, welding scrapped signs and automotive junk into objects of worth and meaning. Both the novel and the sculptures insist that refuse is never simply worthless — and both cast a sceptical eye on the greed and glut of a wasteful age.",
        "excerpt": "By which means, or by others, he grew rich as a Dust Contractor, and lived in a hollow in a hilly country entirely composed of Dust. On his own small estate the growling old vagabond threw up his own mountain range, like an old volcano, and its geological formation was Dust. Coal-dust, vegetable-dust, bone-dust, crockery dust, rough dust and sifted dust,—all manner of Dust.",
        "source": "Charles Dickens, 'Our Mutual Friend' (1865), Book the First, Chapter II. Project Gutenberg eBook #883.",
        "href": "https://www.gutenberg.org/files/883/883-h/883-h.htm",
        "image": {
          "src": "/covers/rauschenberg-gluts-artist-rooms--a2.png",
          "alt": "Marcus Stone's illustrated monthly wrapper for 'Our Mutual Friend', showing scenes from the novel including the Boffin dust mounds.",
          "credit": "Marcus Stone (1840–1921), monthly wrapper design for Dickens's 'Our Mutual Friend', August 1864, engraved by the Dalziel Brothers. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Henry David Thoreau's 'Walden; or, Life in the Woods' (1854) is the classic American argument against material glut. Living deliberately in a small cabin he built by Walden Pond, Thoreau reduced his wants to essentials and turned a hard, mocking eye on the accumulating 'luxuries' and 'so called comforts' by which his contemporaries measured success. He held that superfluous possessions do not elevate a life but weigh it down — that most of what commerce urges us to buy is, at best, dispensable and, at worst, a positive obstacle to living well. This is precisely the critique that animates Rauschenberg's 'Gluts', made during the 1980s oil glut as a wry protest against consumer excess and the waste it breeds. Where Thoreau answered abundance by paring life to the bone, Rauschenberg answered it by gathering up the abundance's own cast-off metal and turning the waste back on itself as art. Both ask the same question: how much of what we produce and consume is anything but excess?",
        "excerpt": "Most of the luxuries, and many of the so called comforts of life, are not only not indispensable, but positive hindrances to the elevation of mankind.",
        "source": "Henry David Thoreau, 'Walden; or, Life in the Woods' (1854), chapter 'Economy'. Project Gutenberg eBook #205.",
        "href": "https://www.gutenberg.org/files/205/205-h/205-h.htm",
        "image": {
          "src": "/covers/rauschenberg-gluts-artist-rooms--a3.png",
          "alt": "Title page of the first edition of Thoreau's 'Walden' (1854), with an engraved drawing of his cabin at Walden Pond.",
          "credit": "Title page of the first edition of Henry David Thoreau's 'Walden' (Ticknor and Fields, 1854), cabin drawing by Sophia Thoreau (1819–1876). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Arcimboldo's 'Vertumnus' (c. 1590–91) portrays the Holy Roman Emperor Rudolf II not in flesh but as a teeming assembly of fruit, vegetables and flowers — a pear for a nose, apples and peaches for cheeks, a pod of peas for an eyelid, ears of corn and a bristling collar of blossoms. From a heap of separate, humble natural objects Arcimboldo composes a single coherent, even majestic, image, so that the whole is unmistakably a face while every part remains stubbornly itself. It is assemblage four centuries avant la lettre: meaning wrung from the accumulation and clever recombination of discrete found things. Rauschenberg's 'Gluts' work by the same paradox, welding recognizable gas-station signage and automotive scrap into unified sculptures in which each salvaged fragment is still legibly what it was. Both artists reveal that a coherent artwork can be built entirely from parts the eye can still name — and both quietly comment on abundance, Arcimboldo through his cornucopian glut of produce, Rauschenberg through the surplus of a consumer age.",
        "excerpt": "Arcimboldo builds the emperor's whole head from an accumulation of separate objects — fruit, vegetables, grain and flowers — each one clearly itself and yet, together, unmistakably a human face. It is a composite portrait assembled from many small found things, a Renaissance ancestor of the modern art of assemblage, and a playful glut of natural abundance heaped into the image of a ruler.",
        "source": "Giuseppe Arcimboldo, 'Vertumnus' (Emperor Rudolf II), oil on panel, c. 1590–1591. Skokloster Castle, Sweden.",
        "href": "https://en.wikipedia.org/wiki/Vertumnus_(Arcimboldo)",
        "image": {
          "src": "/covers/rauschenberg-gluts-artist-rooms--a4.png",
          "alt": "Arcimboldo's 'Vertumnus': a portrait of Emperor Rudolf II composed entirely of fruits, vegetables, grain and flowers.",
          "credit": "Giuseppe Arcimboldo (1527–1593), 'Vertumnus' (Rudolf II), c. 1590–91, oil on panel. Skokloster Castle, Sweden. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'The Land of Cockaigne' (1567) paints the mythical paradise of gluttons: a clerk, a peasant and a soldier lie sprawled and stupefied on the ground beneath a table still groaning with food, while a roast fowl lays itself on a platter, a pig trots by with a carving knife already stuck in its flank, and the very fences are woven from sausage. It is a mordant satire on excess — on the sloth, waste and spiritual emptiness that follow when abundance becomes an end in itself. That moral is the exact ancestor of Rauschenberg's 'Gluts', conceived during the 1980s oil glut as a critique of a consumer society drowning in its own surplus and discards. Bruegel warns against the glut with a feast that has collapsed into torpor; Rauschenberg answers a different glut by gathering its industrial leftovers — dead signage, scrap metal — and re-forging them into art. Across four centuries the two works share a subject and a scepticism: the human appetite for more than we need, and the waste it leaves behind.",
        "excerpt": "In a mythical land of plenty, three overfed men lie sprawled in idleness beneath a food-laden table while roast fowl, a knife-stuck pig and sausage fences offer themselves up unbidden. Bruegel turns the fantasy of endless abundance into a biting emblem of gluttony and sloth — a warning that a life surrendered to excess ends not in joy but in stupor.",
        "source": "Pieter Bruegel the Elder, 'The Land of Cockaigne' (Das Schlaraffenland), oil on panel, 1567. Alte Pinakothek, Munich (Bavarian State Painting Collections).",
        "href": "https://en.wikipedia.org/wiki/The_Land_of_Cockaigne_(Bruegel)",
        "image": {
          "src": "/covers/rauschenberg-gluts-artist-rooms--a5.png",
          "alt": "Bruegel's 'The Land of Cockaigne': three sated men lie collapsed on the ground beneath a table of food in a satirical land of gluttonous plenty.",
          "credit": "Pieter Bruegel the Elder (c. 1525–1569), 'The Land of Cockaigne', 1567, oil on panel. Alte Pinakothek, Munich. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "supreme-court-justices-security-testimony",
    "headline": "Supreme Court justices Barrett and Kagan tell Congress threats against them are surging in rare testimony",
    "overview": "Justices Amy Coney Barrett and Elena Kagan made a rare appearance before a House subcommittee to defend the Supreme Court's budget request, warning that threats against the justices are climbing and are projected to rise about 38% this year. Barrett recounted a swatting attempt at her home and being issued a bulletproof vest during a period of intense threats, as the court sought $228 million and more protective agents for each justice. Pressed on ethics, Kagan repeated her support for an enforcement mechanism for the court's 2023 code of conduct.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNbEgzMVhrQzd5MGpaa0dkU052bS1CUEc0T2J6YUFuTVR4MW9vUzl5MTNjV3BQc2g3UHFiNVhXQWFueGZxNlNMWWMzZWwwZ3hFQ0RiSmd5ZDd2TmNLSE1jRm1meElVYmg2bzV3QXdFTzV5T2NOQ2paUWNCWnktM3RVNWNNTjVFWVhHMkU0cDlleGRVeWw0Q1Z5bTNzbURVcEhYZVVadGJR?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixAFBVV95cUxQdjV3R3ktWC05bGl2eV9Gc3NaNTlGY0RwS2F4OVJfNVI1enpEamRnY2d2U1BfMEtCRzdKNVJNc040U1pxZmJHZkV0MHd5VHZtQlZTV2k1UkJ5bmItVWUxWGlwbTNtaE5tNmxhNmpibEUwUXNXZHhQLVFYSDBCSGJyY1ZuRVpqWkxnRzZVM2dKQ1oweDl6LUd0bWVWT1FIUDNJcEVZbS1ET1UxX1piQmFzSW5vSjkxUzVNODBIa191MjhKbnJ4?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/supreme-court-justices-security-testimony.png",
      "alt": "The United States Supreme Court building at dusk.",
      "credit": "Photo by Joe Ravi, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In Herodotus's Histories, the Persian king Cambyses discovers that Sisamnes, one of his Royal Judges, has taken a bribe and 'judged a cause unjustly for money.' Cambyses has him flayed alive, cuts leather thongs from his skin, and stretches them across the very seat of judgment; he then installs Sisamnes's son Otanes as judge, ordering him never to forget what covered his chair. It is the ancient world's starkest parable of the peril attached to the judicial seat and of the demand that judgment be incorruptible. The story sits behind our own culture's oldest image of the vulnerable judge: to render justice is to occupy a dangerous chair. Where Cambyses's terror came from the throne above the judge, the threat facing Justices Barrett and Kagan comes from an inflamed public below, but the underlying truth is the same. The seat of judgment has always been a place of both majesty and menace, and those who sit in it are never fully safe.",
        "excerpt": "This man's father Sisamnes, who had been made one of the Royal Judges, king Cambyses slew, because he had judged a cause unjustly for money, and flayed off all his skin: then after he had torn away the skin he cut leathern thongs out of it and stretched them across the seat where Sisamnes had been wont to sit to give judgment; and having stretched them in the seat, Cambyses appointed the son of that Sisamnes whom he had slain and flayed, to be judge instead of his father, enjoining him to remember in what seat he was sitting to give judgment.",
        "source": "Herodotus, The History of Herodotus, Book V.25, trans. G. C. Macaulay (London: Macmillan, 1890).",
        "href": "https://www.gutenberg.org/files/2456/2456-h/2456-h.htm",
        "image": {
          "src": "/covers/supreme-court-justices-security-testimony--a0.png",
          "alt": "Roman marble bust of the Greek historian Herodotus, who recorded the flaying of the corrupt judge Sisamnes.",
          "credit": "Roman-era marble bust of Herodotus, Metropolitan Museum of Art; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "In 1607, King James I claimed that he could personally decide cases at law, since the law was founded on reason and he possessed reason as fully as his judges. Sir Edward Coke, Chief Justice of the Common Pleas, faced the king down, insisting that causes touching subjects' life, inheritance and goods must be resolved not by the sovereign's 'natural reason' but by the 'artificial reason and judgment of law' won only through long study. When James retorted that this placed him beneath the law, which was treason to affirm, Coke quoted Bracton to his face: the king is under no man, but under God and the law. It is a founding moment of judicial independence, a judge risking a charge of treason to keep judgment free of the powerful. That is precisely the principle at stake when Justices Barrett and Kagan tell Congress that intimidation of judges is surging: an independent judiciary depends on judges who can decide without fear. Coke's danger came from an offended monarch; theirs from swatting calls and threats requiring bulletproof vests and armed protection.",
        "excerpt": "His Majesty was not learned in the laws of his realm of England, and causes which concern the life, or inheritance, or goods, or fortunes of his subjects, are not to be decided by natural reason but by the artificial reason and judgment of law ... with which the King was greatly offended, and said, that then he should be under the law, which was treason to affirm, as he said; to which I said, that Bracton saith, quod Rex non debet esse sub homine, sed sub Deo et lege [That the King ought not to be under any man but under God and the law.].",
        "source": "Sir Edward Coke, Prohibitions del Roy (1607), 12 Co. Rep. 63, 77 Eng. Rep. 1342.",
        "href": "https://en.wikipedia.org/wiki/Case_of_Prohibitions",
        "image": {
          "src": "/covers/supreme-court-justices-security-testimony--a1.png",
          "alt": "Portrait of Sir Edward Coke in judicial robes, the Chief Justice who defended judicial independence before King James I.",
          "credit": "Portrait of Sir Edward Coke, attributed to Gilbert Jackson; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus's Eumenides, the final play of the Oresteia (458 BC), dramatizes the very birth of the law court. To break the endless cycle of blood vengeance pursued by the Furies, the goddess Athena convenes a tribunal of citizen jurors on the hill of Ares to try Orestes, and in doing so founds a standing court for Athens. She charges it to be a body 'untouched by bribes,' held upright by reverence and awe, neither anarchic nor tyrannical, a permanent bulwark of the city. The play makes explicit that a court is fragile and contested: the Furies rage against it, and its authority must be defended if justice is to replace vendetta. That founding anxiety echoes in the testimony of Justices Barrett and Kagan, who describe a court under strain and warn that threats against its members endanger the institution itself. Aeschylus already knew that the incorruptible tribunal is civilization's safeguard and that it survives only so long as the community protects those who sit in judgment.",
        "excerpt": "Thus holding Awe in seemly reverence,\nA bulwark for your state shall ye possess,\nA safeguard to protect your city-walls,\nSuch as no mortals other-where can boast,\nNeither in Scythia, nor in Pelops' realm.\nBehold! This court august, untouched by bribes,\nSharp to avenge, wakeful for those who sleep,\nEstablish I, a bulwark to this land.",
        "source": "Aeschylus, The Eumenides, trans. Anna Swanwick, in The Dramas of Aeschylus (Athena's founding of the Areopagus).",
        "href": "https://en.wikisource.org/wiki/Dramas_of_Aeschylus_(Swanwick)/Eumenides",
        "image": {
          "src": "/covers/supreme-court-justices-security-testimony--a2.png",
          "alt": "Painting of Orestes recoiling from the Furies, the cycle of vengeance that Athena's new court in the Eumenides was founded to end.",
          "credit": "William-Adolphe Bouguereau, Orestes Pursued by the Furies (1862), Chrysler Museum of Art; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Measure for Measure (c. 1604), Duke Vincentio hands his judicial power to the deputy Angelo, a man of severe rectitude who at once revives a harsh law and condemns young Claudio to death for fornication. Pleading for her brother's life, the novice Isabella confronts the judge with the question every human judge must face: how would you fare, she asks, if the highest judge should judge you as you are? Her rebuke to 'proud man, / Drest in a little brief authority' exposes both the majesty and the moral danger of holding power over others' lives, for Angelo will soon corrupt his own office by demanding Isabella's body as the price of mercy. The play is the great literary study of incorruptible judgment tested to breaking point and of the terrible weight carried by anyone empowered to decide. It resonates with a moment when Justices Barrett and Kagan describe rendering judgment under mounting pressure and personal threat. Shakespeare's warning is that the judgment seat both ennobles and endangers whoever occupies it, and that its integrity is never guaranteed.",
        "excerpt": "How would you be,\nIf He, which is the top of judgement, should\nBut judge you as you are? ... but man, proud man,\nDrest in a little brief authority,",
        "source": "William Shakespeare, Measure for Measure, Act II, sc. 2 (Isabella to Angelo), Cambridge edition, 1863.",
        "href": "https://www.gutenberg.org/files/23045/23045-h/23045-h.htm",
        "image": {
          "src": "/covers/supreme-court-justices-security-testimony--a3.png",
          "alt": "Pre-Raphaelite painting of Isabella visiting her imprisoned brother Claudio, a scene from Shakespeare's Measure for Measure.",
          "credit": "William Holman Hunt, Claudio and Isabella (1850), Tate Britain; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Gerard David's monumental diptych The Judgment of Cambyses (1498), painted for the aldermen's chamber of Bruges town hall, renders the Herodotus story in unflinching detail. In the left panel the corrupt judge Sisamnes is arrested at his bench as Cambyses lists his crimes; in the right panel, in one of the most graphic images in Netherlandish art, executioners methodically flay the living judge on a table while his son looks on and, in the background, sits on the newly skin-covered chair. Hung above real magistrates as they deliberated, the picture was a permanent, visceral admonition that those who judge are themselves subject to judgment and that corruption of the office is intolerable. It is the definitive visual emblem of the peril and gravity of the judicial seat. The panel gives haunting form to the theme running through the testimony of Justices Barrett and Kagan: the person who judges is exposed, vulnerable, and inescapably bound to the integrity of the seat they occupy.",
        "excerpt": "David's diptych confronts the viewer with justice at its most brutal: a serene, gilded courtroom on the left gives way to raw physical horror on the right, where the flaying proceeds with clinical calm. The painting was meant to hang over judges as they worked, an image of both the majesty of their office and the annihilating consequences of betraying it. Few artworks so directly fuse the beauty of the law with the bodily danger of those who administer it.",
        "source": "Gerard David, The Judgment of Cambyses, 1498, oil on panel, Groeningemuseum, Bruges.",
        "href": "https://en.wikipedia.org/wiki/The_Judgment_of_Cambyses",
        "image": {
          "src": "/covers/supreme-court-justices-security-testimony--a4.png",
          "alt": "Gerard David's 1498 diptych showing the arrest and flaying of the corrupt Persian judge Sisamnes ordered by King Cambyses.",
          "credit": "Gerard David, The Judgment of Cambyses (1498), Groeningemuseum, Bruges; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Ambrogio Lorenzetti's fresco cycle in the Sala dei Nove of Siena's Palazzo Pubblico (1338-1339) was painted to hang before the nine magistrates who governed the city, a daily reminder of what their decisions were worth. At its heart sits the enthroned figure of Justice, scales held level beneath the guiding hand of Divine Wisdom, one pan rewarding the good and the other punishing the wicked; when Justice is honored the painted city flourishes, and when she is bound and cast down under Tyranny the whole realm decays. The program insists that the entire commonwealth rests on impartial, incorruptible judgment and on the safety of those charged to deliver it. That civic conviction speaks directly to Justices Barrett and Kagan's warning that intimidation of judges threatens not just individuals but the rule of law itself. Lorenzetti made visible, six centuries early, the stakes now being argued before Congress: undermine the judges and you unbalance the scales that hold society together.",
        "excerpt": "Lorenzetti places Justice at the pivot of the whole vision of the good city, her scales poised and serene, tying the fate of the state directly to the integrity of judgment. Painted to face the governing Nine, the fresco warns that where Justice is bound and overthrown, peace, commerce and safety collapse with her. It is among the most eloquent images in Western art of judgment as the load-bearing pillar of civic life.",
        "source": "Ambrogio Lorenzetti, Allegory of Good Government (figure of Justice), Sala dei Nove, Palazzo Pubblico, Siena, 1338-1339.",
        "href": "https://en.wikipedia.org/wiki/The_Allegory_of_Good_and_Bad_Government",
        "image": {
          "src": "/covers/supreme-court-justices-security-testimony--a5.png",
          "alt": "Detail of Lorenzetti's fresco showing the enthroned figure of Justice holding balanced scales in the Allegory of Good Government.",
          "credit": "Ambrogio Lorenzetti, figure of Justice, Allegory of Good Government (1338-1339), Palazzo Pubblico, Siena; via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "osun-osogbo-yoruba-sculptures",
    "headline": "A Met documentary spotlights the sculptures honoring the Yoruba goddess Osun at Nigeria's Osun-Osogbo Sacred Grove",
    "overview": "A short documentary from the Metropolitan Museum of Art turns attention to the Osun-Osogbo Sacred Grove, a 190-acre UNESCO World Heritage site in southwestern Nigeria dedicated to Osun, the Yoruba goddess of rivers and fertility. The film, directed by Sosena Solomon, records the monumental clay, mud and cement sculptures created from the 1960s by the New Sacred Art Movement - led by Austrian-Nigerian artist Susanne Wenger with Yoruba artists including Adebisi Akanji and Kasali Akangbe Ogun - and the caretakers who now repair and preserve them. Annual festivals and pilgrimages keep the grove a living center of worship.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/osun-osogbo-sacred-grove-nigeria-documentary/"
      },
      {
        "name": "UNESCO World Heritage Centre",
        "href": "https://whc.unesco.org/en/list/1118"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/osun-osogbo-yoruba-sculptures.png",
      "alt": "A sculpture of the goddess Osun in the Osun-Osogbo Sacred Grove in Nigeria.",
      "credit": "Photo by Tunde Akangbe, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The great sanctuary of Artemis at Ephesus in Asia Minor housed one of antiquity's most celebrated cult images: a monumental many-breasted statue of the goddess, mistress of wild nature and fecundity, whose temple ranked among the Seven Wonders of the ancient world and drew pilgrims from across Asia and beyond. Temple-wardens and priests tended the sacred image and its rites for centuries, and grand processions honored her at her festival. Like Osun at Osun-Osogbo, Artemis of Ephesus was a female divinity of nature and fertility worshipped through a monumental sculpted idol at a sanctuary that became a magnet for pilgrimage. Both cults fuse the divine feminine, fertility, and a physical sculpture as the enduring focus of communal devotion sustained across generations.",
        "excerpt": "So that not only this our craft is in danger to be set at nought; but also that the temple of the great goddess Diana should be despised, and her magnificence should be destroyed, whom all Asia and the world worshippeth. And when they heard these sayings, they were full of wrath, and cried out, saying, Great is Diana of the Ephesians.",
        "source": "The Acts of the Apostles 19:27–28, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Acts",
        "image": {
          "src": "/covers/osun-osogbo-yoruba-sculptures--a0.png",
          "alt": "Engraving of the multi-breasted cult statue of Artemis (Diana) of Ephesus, a monumental idol of a fertility goddess.",
          "credit": "“Diana of Ephesus,” published 1878. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In India the river Ganges is venerated as the goddess Ganga, a divine feminine embodiment of water, purity, and fertility whose descent from heaven to earth is recounted in Valmiki's Ramayana; for millennia pilgrims have gathered on her banks to bathe, washing away sin and seeking blessing. Ghats, shrines, and festivals along the river preserve an unbroken tradition of devotion to the sacred stream itself. This mirrors Osun, the Yoruba goddess of the river that runs through the Osogbo grove, worshipped as a giver of water, healing, and fertility, whose annual festival draws pilgrims to her sacred waters. Both traditions treat a river as the living body of a goddess and sustain ancient devotion through pilgrimage and repeated ritual across countless generations.",
        "excerpt": "And all the world was glad, whereon\nThe glorious water flowed and shone,\nFor sin and stain were banished thence\nBy the sweet river's influence.",
        "source": "The Rámáyan of Válmíki, Book I, Canto XLIV, “The Descent of Gangà,” trans. Ralph T. H. Griffith (1870–1874).",
        "href": "https://en.wikisource.org/wiki/The_Ramayana/Book_I/Canto_XLIV:_The_Descent_of_Gang%C3%A0",
        "image": {
          "src": "/covers/osun-osogbo-yoruba-sculptures--a1.png",
          "alt": "Raja Ravi Varma's painting of the descent of the river goddess Ganga to earth.",
          "credit": "Raja Ravi Varma, “Descent of Ganga,” c. 1910s. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book 3 of Ovid's Metamorphoses the poet describes Gargaphia, a wooded valley sacred to Diana, goddess of the hunt, holding a grotto and a clear spring where the goddess bathes with her nymphs; when the hunter Actaeon blunders upon her he is transformed into a stag and torn apart by his own hounds. The passage is a canonical literary evocation of a sacred grove — a numinous natural precinct set apart for a goddess, hedged with taboo, where the divine and the watery meet and trespass brings ruin. It resonates deeply with the Osun-Osogbo grove, a forest sanctuary along a river consecrated to a goddess and surrounded by reverence and prohibition. Ovid's grove, like Osogbo's, is a holy place of trees and water where a female deity is present and where intrusion carries grave consequence.",
        "excerpt": "There is a valley called Gargaphia; sacred to Diana, dense with pine trees and the pointed cypress, where, deep in the woods that fringed the valley's edge, was hollowed in frail sandstone and the soft white pumice of the hills an arch, so true it seemed the art of man; for Nature's touch ingenious had so fairly wrought the stone, making the entrance of a grotto cool.",
        "source": "Ovid, Metamorphoses, Book 3 (trans. Brookes More, 1922), Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=3:card=138",
        "image": {
          "src": "/covers/osun-osogbo-yoruba-sculptures--a2.png",
          "alt": "Titian's painting Diana and Actaeon, showing the hunter surprising the goddess Diana bathing with her nymphs at a sacred spring.",
          "credit": "Titian, “Diana and Actaeon,” 1556–1559. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Homeric Hymn to Demeter (c. seventh century BCE) recounts how the goddess of grain and fertility, grieving for her stolen daughter Persephone, comes to Eleusis and commands the townspeople to build her a great temple and altar, promising to teach them her rites herself; the worship she founds there, the Eleusinian Mysteries, would endure for more than a thousand years. The hymn dramatizes the founding of a sanctuary to a fertility goddess and the perpetual, carefully preserved devotion that follows her demand. This parallels the Osun-Osogbo grove, where a goddess of fertility is honored at a consecrated site of altars and sculptures with annual festivals faithfully maintained across generations. Both narratives turn on a fertility goddess who requires a holy place and rites that a community keeps alive across the centuries.",
        "excerpt": "But now, let all the people build me a great temple and an altar below it and beneath the city and its sheer wall upon a rising hillock above Callichorus. And I myself will teach my rites, that hereafter you may reverently perform them and so win the favour of my heart.",
        "source": "Homeric Hymn II (To Demeter), trans. Hugh G. Evelyn-White (1914), in Hesiod, the Homeric Hymns and Homerica.",
        "href": "https://en.wikisource.org/wiki/Hesiod,_the_Homeric_Hymns_and_Homerica/Hymn_II_(To_Demeter)",
        "image": {
          "src": "/covers/osun-osogbo-yoruba-sculptures--a3.png",
          "alt": "Frederic Leighton's painting The Return of Persephone, showing Persephone rising to be reunited with the fertility goddess Demeter.",
          "credit": "Frederic Leighton, “The Return of Persephone,” 1891. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Sandro Botticelli's The Birth of Venus (c. 1484–1486) shows the goddess of love and fertility newly born from the sea, standing upon a scallop shell as the winds blow her to shore — the supreme Renaissance icon of the divine feminine arising from water. Painted in Florence, it distills the ancient conviction that a goddess's power over fertility and generation is inseparable from the element of water. It offers a European visual analogue to Osun, the Yoruba goddess of the river and fertility honored in the Osogbo grove: in both, a female divinity of generative power is bound to water and given lasting form in art. Botticelli painted a water-born fertility goddess much as Susanne Wenger and her Yoruba collaborators sculpted Osun into monumental, enduring shapes.",
        "excerpt": "Botticelli's tempera shows Venus poised on a great shell at the center of the panel, her hair streaming as Zephyr and a breeze-nymph waft her toward land while an attendant hurries to robe her. Sea, wind, and flowers converge on the serene nude figure, making the water-born goddess of fertility the still, radiant heart of the composition.",
        "source": "Sandro Botticelli, The Birth of Venus, c. 1484–1486, tempera on canvas, Uffizi Gallery, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_ProjectFXD.jpg",
        "image": {
          "src": "/covers/osun-osogbo-yoruba-sculptures--a4.png",
          "alt": "Botticelli's The Birth of Venus, the goddess standing on a shell as she is blown ashore over the sea.",
          "credit": "Sandro Botticelli, “The Birth of Venus,” c. 1484–1486. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin's The Sacred Grove (Der heilige Hain, 1882) depicts white-robed worshippers gathered in solemn procession before a flaming altar among towering, shadowed trees, conjuring the hush and awe of an ancient consecrated woodland. The Swiss Symbolist imagined the grove as a threshold between the human and the sacred, a place where ritual is performed in the felt presence of unseen divinity. It is a painted meditation on precisely the kind of site the Osun-Osogbo grove embodies: a forest set apart for worship, where devotees process and make offerings amid trees, altars, and sculpture. Böcklin's canvas gives visual form to the numinous sacred grove that Osogbo makes real, linking European Romantic imagination to a living African place of devotion.",
        "excerpt": "Böcklin ranges dark, columnar trees like the pillars of a temple, their canopy closing overhead into a green vault. At the foot of the grove small white-clad figures move in procession toward a smoking altar, dwarfed by the silent woodland and the sacred presence it seems to hold.",
        "source": "Arnold Böcklin, The Sacred Grove (Der heilige Hain), 1882, oil on canvas.",
        "href": "https://commons.wikimedia.org/wiki/File:B%C3%B6cklin_-_Der_heilige_Hain,_1882,_110.jpg",
        "image": {
          "src": "/covers/osun-osogbo-yoruba-sculptures--a5.png",
          "alt": "Arnold Böcklin's painting The Sacred Grove, with white-robed figures processing before an altar among tall dark trees.",
          "credit": "Arnold Böcklin, “The Sacred Grove (Der heilige Hain),” 1882. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "goudstikker-nazi-looted-painting-returned",
    "headline": "Nazi-looted painting from the Goudstikker collection, rescued from an Amsterdam rubbish pile, to be returned to the dealer's heirs",
    "overview": "A 17th-century Dutch painting looted from the Jewish art dealer Jacques Goudstikker during the Nazi occupation is to be returned to his heirs after spending decades in the home of an Amsterdam man who rescued it from a pile of street rubbish. The work, showing the interior of Amsterdam's Nieuwe Kerk and attributed to the Golden Age painter Hendrick van der Burgh, was identified by a 'Collectie Goudstikker' label on its back. Goudstikker left some 1,400 works, most seized by Hermann Goring; 202 were returned to his heirs in 2006, with many still missing.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/nazi-looted-painting-from-rubbish-pile-to-be-returned-1234754497/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/news/nazi-looted-painting-jacques-goudstikker-returned-1234792013/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-15",
    "image": {
      "src": "/covers/goudstikker-nazi-looted-painting-returned.png",
      "alt": "A Dutch Golden Age painting of a light-filled church interior.",
      "credit": "Pieter Jansz. Saenredam, church interior, 17th century, public domain via Wikimedia Commons"
    },
    "edition": "Morning Edition · 15 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 71 the emperors Vespasian and Titus celebrated a triumph in Rome for the conquest of Judaea, parading through the streets the sacred treasures looted from the destroyed Temple in Jerusalem. The Jewish historian Josephus, an eyewitness, describes the great golden table and the seven-branched golden candlestick carried aloft, with a copy of the Jewish Law borne last of all—plunder stripped from a vanquished people and displayed as the spoils of empire. The Arch of Titus, still standing in the Roman Forum, carved that same procession in stone. The seizure of Jacques Goudstikker's collection under the Nazi occupation belongs to this long history of conquerors carrying off a people's treasures; and just as the memory of the Temple spoils outlived the empire that took them, the 'Collectie Goudstikker' label on the painting's back outlived the regime that stole it, allowing the work to be identified and reclaimed. In both cases the plundered object still carries the identity of those from whom it was taken.",
        "excerpt": "But for those that were taken in the temple of Jerusalem, they made the greatest figure of them all; that is, the golden table, of the weight of many talents; the candlestick also, that was made of gold, though its construction were now changed from that which we made use of; … These lamps were in number seven, and represented the dignity of the number seven among the Jews; and the last of all the spoils, was carried the Law of the Jews.",
        "source": "Flavius Josephus, The Wars of the Jews, Book VII, ch. 5 (the triumph of Vespasian and Titus), trans. William Whiston; Project Gutenberg eBook #2850.",
        "href": "https://www.gutenberg.org/cache/epub/2850/pg2850.txt",
        "image": {
          "src": "/covers/goudstikker-nazi-looted-painting-returned--a0.png",
          "alt": "Relief on the Arch of Titus in Rome showing Roman soldiers carrying off the menorah and other spoils from the Temple in Jerusalem.",
          "credit": "The spoils of Jerusalem, relief on the Arch of Titus, Rome, c. AD 81; photograph public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "As the Second World War ended, Allied art experts known as the Monuments Men raced to recover the vast hoards of art the Nazis had plundered across Europe. In May 1945 they descended into the Altaussee salt mine in Austria, where the regime had hidden thousands of stolen masterpieces, and brought out treasures including the Ghent Altarpiece by Jan van Eyck, later returning them to the nations and families from whom they had been taken. Their work established the modern principle that art looted in war must be restored to its rightful owners rather than kept by the victors. The return of the Goudstikker painting is a distant, small-scale echo of that reckoning: a single stolen canvas, hidden and forgotten for decades, finally traced back to the heirs of the Jewish dealer the Nazis dispossessed. Both stories insist that theft, however long ago, does not extinguish ownership.",
        "excerpt": "In the salt tunnels of Altaussee the Monuments Men found the plunder of a continent stacked in the dark—Van Eyck's Ghent Altarpiece propped on empty cartons, Michelangelo's Bruges Madonna wrapped in mattresses, all mined and hidden by a regime that meant to keep or destroy them. The soldiers who carried the works back into daylight were enacting a new idea: that looted art belongs to those it was stolen from, and must be given back. The recovered Goudstikker painting reaches the same conclusion by a slower, humbler road.",
        "source": "The recovery of Nazi-looted art by the Allied Monuments, Fine Arts, and Archives program at the Altaussee salt mine, 1945, including Jan van Eyck's Ghent Altarpiece. Modern history—described, not quoted.",
        "href": "https://en.wikipedia.org/wiki/Ghent_Altarpiece",
        "image": {
          "src": "/covers/goudstikker-nazi-looted-painting-returned--a1.png",
          "alt": "Two men examining a panel of the Ghent Altarpiece inside the Altaussee salt mine after its recovery from the Nazis in 1945.",
          "credit": "Lt. Daniel J. Kern and Karl Sieber examining the Ghent Altarpiece in the Altaussee mine, 1945; U.S. military photograph, public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Homer's Odyssey, the hero returns after twenty years to find his house on Ithaca overrun by insolent suitors who feast on his flocks and squander his wealth while pressing his wife to remarry. In the underworld the seer Teiresias foretells this dispossession and promises that Odysseus will reclaim his home and take vengeance on those who have consumed his goods. The poem is the founding Western story of a rightful owner returning to recover what others have seized in his absence. The Goudstikker heirs play a version of that role: dispossessed by force and long kept from their inheritance, they are at last recovering property that was never lawfully surrendered. As with Odysseus, the passage of years does not dissolve the claim; it only defers the homecoming.",
        "excerpt": "you will find trouble in your house, which will be overrun by high-handed people, who are devouring your substance under the pretext of paying court and making presents to your wife. When you get home you will take your revenge on these suitors; and after you have killed them by force or fraud in your own house, you must take a well made oar and carry it on and on…",
        "source": "Homer, The Odyssey, Book XI (the prophecy of Teiresias), trans. Samuel Butler; Project Gutenberg eBook #1727.",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "literary",
        "title": "In the Gospel of Luke, Jesus tells of a woman who owns ten silver coins and loses one; she lights a lamp, sweeps the whole house and searches diligently until she finds it, then calls her friends and neighbours to rejoice with her. The tiny parable turns a single recovered object into an occasion of communal joy, insisting that what is lost still matters and is worth an exhaustive search. It reads almost as a script for this news: a Dutch painting lost for decades—quite literally swept up, having been rescued from a heap of street rubbish—and now found and identified by the label on its back. The finder's diligence and the family's recovery mirror the woman lighting her candle to reclaim the one coin among ten. The restitution, like the parable, ends not in mere possession but in rejoicing over a thing thought gone for good.",
        "excerpt": "Either what woman having ten pieces of silver, if she lose one piece, doth not light a candle, and sweep the house, and seek diligently till she find it? And when she hath found it, she calleth her friends and her neighbours together, saying, Rejoice with me; for I have found the piece which I had lost.",
        "source": "The Gospel according to St. Luke 15:8–9 (King James Version); Project Gutenberg eBook #10 (The King James Bible).",
        "href": "https://www.gutenberg.org/files/10/10-0.txt",
        "image": {
          "src": "/covers/goudstikker-nazi-looted-painting-returned--a3.png",
          "alt": "Domenico Fetti's painting of a woman searching her house by lamplight for a lost coin, the Parable of the Lost Drachma.",
          "credit": "Domenico Fetti, The Parable of the Lost Drachma, c. 1618–1622; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Dutch painter Emanuel de Witte specialised in luminous interiors of Amsterdam's churches, among them the Nieuwe Kerk—the very building shown in the recovered Goudstikker painting, whose interior was rendered by Hendrick van der Burgh. De Witte's serene, light-filled naves capture the same Golden Age subject and the same civic pride in these great whitewashed spaces. To look at his Nieuwe Kerk is to see, in effect, a surviving twin of the looted work, a reminder of the world of Dutch church-interior painting from which the stolen canvas came. The return of that canvas restores one more fragment of this tradition to the family robbed of it, reuniting a scattered heritage with its rightful line. Where the theft tried to erase provenance, the painting's subject—an enduring Amsterdam church—quietly outlasted the crime.",
        "excerpt": "De Witte fills the Nieuwe Kerk with a cool northern light that falls across pale stone piers and the small dark figures of worshippers, the vaults rising into a hush of white. Painted in 1657, it belongs to the same genre of Dutch church interiors as the looted Goudstikker picture of the very same church. Seen beside the news of the restitution, it stands as a serene witness to what plunder tried to take and time gave back.",
        "source": "Emanuel de Witte, Interior of the Nieuwe Kerk, Amsterdam, 1657; public domain (CC0) via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Interior_of_the_Nieuwe_Kerk,_Amsterdam_by_Emanuel_de_Witte_1657.jpg",
        "image": {
          "src": "/covers/goudstikker-nazi-looted-painting-returned--a4.png",
          "alt": "Emanuel de Witte's painting of the light-filled interior of the Nieuwe Kerk in Amsterdam.",
          "credit": "Emanuel de Witte, Interior of the Nieuwe Kerk, Amsterdam, 1657; public domain (CC0) via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Verdi's chorus 'Va, pensiero' from Nabucco (1842) gives voice to the Hebrews exiled by the waters of Babylon, their thoughts flying on golden wings back to the lost, beautiful homeland taken from them. Set to Temistocle Solera's verses after Psalm 137, it became the anthem of a dispossessed people yearning for what conquest had stripped away, and one of the most beloved laments of loss in all music. Its ache of 'O mia patria, sì bella e perduta' speaks to the decades in which the Goudstikker family lived with a heritage seized and scattered by the Nazis. The restitution of the rescued painting is a small answer to that lament—one lost fragment of a plundered inheritance flying home at last. The chorus reminds us that behind every looted object stands a people mourning what was carried off.",
        "excerpt": "Va, pensiero, sull'ali dorate; / va, ti posa sui clivi, sui colli, / ove olezzano tepide e molli / l'aure dolci del suolo natal! / Del Giordano le rive saluta, / di Sionne le torri atterrate. / O, mia patria, sì bella e perduta! / O, membranza, sì cara e fatal!",
        "source": "Giuseppe Verdi, Nabucco (1842), 'Va, pensiero' (Chorus of the Hebrew Slaves), libretto by Temistocle Solera; score at IMSLP.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 26
  },
  {
    "slug": "china-purges-ma-xingrui-politburo",
    "headline": "China expels former Politburo member Ma Xingrui from the Communist Party in the third such purge since 2025",
    "overview": "China's ruling Communist Party expelled Ma Xingrui, a former member of its 24-seat Politburo and until recently the party chief of the Xinjiang region, on corruption charges, state media said, making him the third Politburo-level official removed in President Xi Jinping's deepening anti-graft campaign since 2025. Investigators said Ma took bribes, sought advantage for others in official appointments and helped relatives buy property below market price, and his case was referred to prosecutors. The purge underscores how Xi has used the party's discipline apparatus to sideline senior figures across China's security and regional power structures.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxNVDJ0bDJkYnZTU2tsTDVzUjZPQnlveXk3dW9oYjlGMkVUcmt0YllQQ0RPTGYyenczYWtCMVlXbWJtVlp2ODNWdlhZd3ZUemcxOFVDdlFKZEZMTFVBa2VacXRISXB4MGtHTV9LVHFEMWoxd0hqTXFrRHhyVS1OemNGTHQ1eW54QWhlVUlfajBSV0FWbVozZEgyQTBCTUJGTUNiZkRHU292M2pCMURRNUxB?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/newsletters/2026-07-14/china-purges-third-politburo-member-since-2025-in-anti-corruption-drive"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/china-purges-ma-xingrui-politburo.png",
      "alt": "The Great Hall of the People in Beijing, seat of the Chinese Communist Party's most powerful bodies, under an overcast sky.",
      "credit": "Photo by Thomas Fanghänel, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 31 the Roman emperor Tiberius destroyed Lucius Aelius Sejanus, the praetorian prefect he had raised to be the second man in the empire. Sejanus had used his command of the guard and his grip on official appointments to enrich himself and pack the state with clients, until Tiberius, fearing a rival, had a letter read in the Senate ordering his arrest; he was strangled that same day and his statues torn down. The historian Cassius Dio records how the crowd that had escorted him at dawn as a superior being was dragging him to prison by nightfall. Ma Xingrui's fall follows the same arc: a Politburo member who once ran Xinjiang and steered promotions, brought down in a single announcement by the ruler he served. As with Sejanus, the charge sheet of bribery and rigged appointments doubles as a warning to every other lieutenant.",
        "excerpt": "After exalting Sejanus to a high pinnacle of glory and making him a member of his family by his alliance with Julia, the daughter of Drusus, Tiberius later killed him. … the man whom at dawn they had escorted to the senate-hall as a superior being, they were now dragging to prison as if no better than the worst; on him whom they had previously thought worthy of many crowns, they now laid bonds.",
        "source": "Cassius Dio, Roman History, Book LVIII (Loeb Classical Library, trans. Earnest Cary), via LacusCurtius (Bill Thayer, University of Chicago).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/58*.html",
        "image": {
          "src": "/covers/china-purges-ma-xingrui-politburo--a0.png",
          "alt": "Ancient Roman marble bust of the Emperor Tiberius, the ruler who elevated and then destroyed Sejanus",
          "credit": "Marble bust of Tiberius, 1st century AD, Museo Archeologico Regionale, Palermo; photo public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "After Cardinal Mazarin died in 1661, the young Louis XIV resolved to rule France himself and had his superintendent of finances, Nicolas Fouquet, arrested on charges of embezzlement and treason. Fouquet, one of the richest and most powerful men in the kingdom, was tried for three years before a special chamber staffed with his enemies and condemned to lifelong imprisonment, letting the king consolidate personal rule and elevate his rival Colbert. Madame de Sévigné, who followed the proceedings closely, recorded the chancellor pressing Fouquet in open court while the outcome was effectively foreordained. The parallel to Ma Xingrui is direct: an over-mighty official accused of financial crimes and removed through a disciplined legal apparatus that serves the ruler's consolidation of power. In both cases the corruption charge is real enough to stick and convenient enough to eliminate a potential rival.",
        "excerpt": "The chancellor interrupted him: “What! do you mean to say that the king abuses his power?” M. Fouquet replied, “It is you, sir, who say it, not I; this was not my idea, and, in my present situation, I can not but wonder at your wishing to implicate me still further with his majesty; but, sir, you yourself well know that we may be mistaken. When you sign a sentence, you believe it just, yet the next day you annul that sentence; thus you see it is possible to change our opinion.”",
        "source": "Madame de Sévigné, The Letters of Madame de Sévigné to Her Daughter and Friends — letters on the trial of M. Fouquet addressed to the Marquis de Pomponne, 1664; Project Gutenberg eBook #78579.",
        "href": "https://www.gutenberg.org/cache/epub/78579/pg78579.txt",
        "image": {
          "src": "/covers/china-purges-ma-xingrui-politburo--a1.png",
          "alt": "Charles Le Brun's portrait of Nicolas Fouquet, Louis XIV's superintendent of finances arrested for embezzlement",
          "credit": "Charles Le Brun, Portrait of Nicolas Fouquet, 17th century, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare and Fletcher's play King Henry VIII, Cardinal Wolsey — the king's chief minister and one of the mightiest figures in the realm — is stripped of office and possessions the moment the king turns against him. In his farewell soliloquy Wolsey reflects on how abruptly greatness collapses and how wretched is the man who hangs on a prince's favour. The speech is the classic English dramatization of the fall of a once-supreme official brought low by the sovereign he served. It reads as a gloss on Ma Xingrui, a full Politburo member expelled from the party and handed to prosecutors, his career nipped at the moment of apparent ripeness. Like Wolsey, he is a servant of power discarded the instant he becomes a liability.",
        "excerpt": "Farewell! a long farewell, to all my greatness!\nThis is the state of man: to-day he puts forth\nThe tender leaves of hopes; to-morrow blossoms,\nAnd bears his blushing honours thick upon him;\nThe third day comes a frost, a killing frost,\nAnd, when he thinks, good easy man, full surely\nHis greatness is a-ripening, nips his root,\nAnd then he falls, as I do. I have ventured,\nLike little wanton boys that swim on bladders,\nThis many summers in a sea of glory,\nBut far beyond my depth: my high-blown pride\nAt length broke under me and now has left me,\nWeary and old with service, to the mercy\nOf a rude stream, that must for ever hide me.\nVain pomp and glory of this world, I hate ye:\nI feel my heart new open'd. O, how wretched\nIs that poor man that hangs on princes' favours!\nThere is, betwixt that smile we would aspire to,\nThat sweet aspect of princes, and their ruin,\nMore pangs and fears than wars or women have:\nAnd when he falls, he falls like Lucifer,\nNever to hope again.",
        "source": "William Shakespeare and John Fletcher, King Henry VIII, Act 3, Scene 2 (Cardinal Wolsey's soliloquy); The Complete Works of William Shakespeare, MIT.",
        "href": "https://shakespeare.mit.edu/henryviii/henryviii.3.2.html"
      },
      {
        "category": "literary",
        "title": "Arthur Koestler's 1940 novel Darkness at Noon follows Rubashov, an old Bolshevik and former commissar arrested by the very revolutionary regime he helped build and interrogated until he confesses to invented crimes in a show trial. The book is the defining literary study of the party purge — how a movement devours its own leaders and how discipline demands the ritual destruction of once-powerful men. Koestler shows the machinery of denunciation and confession operating with bureaucratic calm. Ma Xingrui's expulsion, announced by the party's discipline inspectors before his case even reaches court, echoes that machinery: a senior insider processed and cast out by the apparatus he once embodied.",
        "excerpt": "Koestler renders the purge from inside the accused's own cell — the endless night interrogations, the pitiless logic that a loyal revolutionary must confess for the good of the Party, the calm ticking of a life once spent at the summit of power. Rubashov comes to see his own liquidation as the natural conclusion of the system he served, and signs his name to it. The novel's horror is procedural rather than violent: the Party need not hate the man it destroys, only file him away.",
        "source": "Arthur Koestler, Darkness at Noon, translated from the German by Daphne Hardy (Macmillan, 1941). Modern copyrighted work — described, not quoted.",
        "href": "https://archive.org/details/darknessatnoon00koes"
      },
      {
        "category": "artistic",
        "title": "Rembrandt's painting Belshazzar's Feast (about 1636–1638, National Gallery, London) depicts the Babylonian king at his banquet, recoiling in terror as a disembodied hand writes his condemnation on the wall. The words, read by the prophet Daniel, declare that the king has been weighed in the balances and found wanting, and that his reign is finished. It is an archetypal image of a mighty ruler suddenly judged and stripped of power at the height of his splendour. The stopped moment of dawning ruin mirrors the logic of Ma Xingrui's downfall — a figure at the peak of official privilege abruptly weighed, found corrupt, and cast down by an authority he cannot resist. Rembrandt fixes on the instant a career ends in a single verdict.",
        "excerpt": "And this is the writing that was written, MENE, MENE, TEKEL, UPHARSIN. This is the interpretation of the thing: MENE; God hath numbered thy kingdom, and finished it. TEKEL; Thou art weighed in the balances, and art found wanting. PERES; Thy kingdom is divided, and given to the Medes and Persians.",
        "source": "Rembrandt van Rijn, Belshazzar's Feast, c. 1636–1638, oil on canvas, National Gallery, London (NG6350); inscription from the Book of Daniel, chapter 5 (King James Version).",
        "href": "https://www.nationalgallery.org.uk/paintings/rembrandt-belshazzar-s-feast",
        "image": {
          "src": "/covers/china-purges-ma-xingrui-politburo--a4.png",
          "alt": "Rembrandt's Belshazzar's Feast: a richly robed king recoils as a glowing hand writes on the wall",
          "credit": "Rembrandt van Rijn, Belshazzar's Feast, c. 1636–1638, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Dies irae of Mozart's Requiem in D minor, K.626 (1791) sets the medieval sequence describing the Day of Wrath, when every hidden deed is exposed before a seated judge and nothing goes unpunished. Mozart renders judgment as a sudden, overwhelming force that spares no rank, the chorus and orchestra crashing in without warning. The text's insistence that all that is concealed will be brought to light speaks directly to an anti-graft reckoning. In Ma Xingrui's case the party's discipline apparatus performs that role, exposing bribes and hidden property deals once shielded by his high office. The movement's terror lies in its impartial finality — the quality Xi's campaign projects as it reaches even the Politburo.",
        "excerpt": "Dies irae, dies illa / solvet saeclum in favilla, / teste David cum Sibylla. … Iudex ergo cum sedebit, / quidquid latet, apparebit; / nil inultum remanebit. (Day of wrath, that day will dissolve the world in ash… When therefore the Judge takes his seat, whatever is hidden shall be revealed; nothing shall remain unpunished.)",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626, 'Sequenz: Dies irae' (completed by F. X. Süssmayr, 1792); Latin sequence attributed to Thomas of Celano, text via the Choral Public Domain Library (CPDL). Score at IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)"
      }
    ],
    "rank": 27
  },
  {
    "slug": "new-york-data-center-moratorium",
    "headline": "New York becomes the first U.S. state to impose a one-year moratorium on large new data centers",
    "overview": "New York became the first U.S. state to halt construction of large new data centers, as Governor Kathy Hochul imposed a one-year moratorium on state permits for facilities drawing 20 megawatts or more amid concern that the artificial-intelligence build-out is driving up electricity bills and straining water supplies. During the pause the state's environmental agency will withhold discretionary permits and draft binding standards, and Hochul said she would also seek to repeal sales-tax breaks for large data centers. The step follows a bill state lawmakers passed in June and makes New York a national test case for regulating AI infrastructure.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxQS1VqV09jX0hhZXQxRXpwaGRHbnY1SmdGT1RMYVEyM1pBaWtyNlBoaTBKYWpCRlMyWHQzMFVCUTFyakRMaDlhTkJpWUtMQThfeFlPQml2RHRUbVJTQmVWMjRvb2w5al9CeW1iQzJ5dkVLUlJHaWZMcXNRbUxZSGdIX2VrZkhKSWplczI1Rlc5d1puZng2Mkc3SXdYM2VYUER4Vnc?oc=5"
      },
      {
        "name": "The Star",
        "href": "https://www.thestar.com.my/tech/tech-news/2026/07/14/new-york-becomes-the-first-state-to-impose-a-data-center-moratorium"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/new-york-data-center-moratorium.png",
      "alt": "Rows of illuminated server racks stretch down the cold aisle of a large data center.",
      "credit": "BalticServers.com, via Wikimedia Commons (CC BY-SA 3.0 / GFDL)"
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before AI, a city government could simply smother a machine it feared. In 1579 the mayor of Danzig, alarmed that a new ribbon-loom weaving four to six pieces at once would throw weavers onto the street, reportedly had its inventor secretly strangled, and across seventeenth-century Europe town councils banned the device outright, as Leyden's did after riots. New York's moratorium is the lawful, humane descendant of that same reflex: a government hitting pause on a technology whose appetite outruns the community's ability to absorb it. Then the fear was for jobs; now it is for power and water. The instinct to freeze a runaway machine is centuries old.",
        "excerpt": "Abbé Lancellotti, in a work that appeared in Venice in 1636, but which was written in 1579, says as follows: “Anthony Müller of Danzig saw about 50 years ago in that town, a very ingenious machine, which weaves 4 to 6 pieces at once. But the Mayor being apprehensive that this invention might throw a large number of workmen on the streets, caused the inventor to be secretly strangled or drowned.” In Leyden, this machine was not used till 1629; there the riots of the ribbon-weavers at length compelled the Town Council to prohibit it.",
        "source": "Karl Marx, Capital, Volume I, Chapter 15 (“Machinery and Modern Industry”), quoting Abbé Lancellotti; Marxists Internet Archive",
        "href": "https://www.marxists.org/archive/marx/works/1867-c1/ch15.htm"
      },
      {
        "category": "historical",
        "title": "In 1974 the very scientists inventing gene-splicing did something almost unheard of: they called for a halt on their own most dangerous work. Led by Paul Berg, they published a letter urging a voluntary worldwide moratorium on certain recombinant-DNA experiments until the hazards could be understood, a pause that culminated in the 1975 Asilomar conference where researchers drafted binding safety rules before proceeding. New York's data-center freeze follows the same three-beat logic almost exactly: stop, study, then permit under standards. The difference is who holds the brake. At Asilomar the industry restrained itself; in Albany it is the state drawing the line around a powerful new technology.",
        "excerpt": "In a landmark 1974 letter to the journals Science and PNAS, Paul Berg and ten colleagues asked scientists worldwide to voluntarily defer whole classes of recombinant-DNA experiments until the risks of moving genes between organisms could be assessed. The following year the Asilomar conference translated that pause into a tiered system of physical and biological containment, allowing the research to resume only under agreed safeguards. It remains the textbook case of a field choosing to hit pause on itself.",
        "source": "Paul Berg et al., “Potential Biohazards of Recombinant DNA Molecules,” Proceedings of the National Academy of Sciences 71:7 (1974); PubMed Central",
        "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC388511/"
      },
      {
        "category": "literary",
        "title": "Goethe's 1797 ballad gives us the enduring image of a convenience, summoned to save labor, that then floods the room. The apprentice enchants a broom to haul water but cannot recall the spell to stop it, and the water rises and rises while he cries out for his master. It is the moratorium's theme in miniature: a marvel that solves one problem while drowning its maker in another. Data centers were conjured to carry our digital water; New York, eyeing the electric bills and the strained reservoirs, is now the apprentice calling for someone to make it stop.",
        "excerpt": "Ever seems the flood to fill, / Ah, he's coming! see, / Great is my dismay! / Spirits raised by me / Vainly would I lay!",
        "source": "Johann Wolfgang von Goethe, “The Pupil in Magic” (Der Zauberlehrling, 1797), trans. Edgar Alfred Bowring, The Works of J. W. von Goethe, Vol. 9; Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic"
      },
      {
        "category": "literary",
        "title": "Samuel Butler's 1872 satire Erewhon imagines a nation that did what no real country ever quite has: it abolished its machines. Centuries before the narrator arrives, the Erewhonians were persuaded by a philosopher's tract that machines were evolving far faster than men and would one day master them, so they smashed nearly every mechanical device and forbade further progress. Butler's “Book of the Machines” is essentially a moratorium manifesto, arguing that it is safer to nip the danger in the bud. As New York freezes permits for the vast machine-halls of the AI age, Butler's fable reads less like whimsy than like a policy memo.",
        "excerpt": "May not the world last twenty million years longer? If so, what will they not in the end become? Is it not safer to nip the mischief in the bud and to forbid them further progress?",
        "source": "Samuel Butler, Erewhon; Or, Over the Range, Chapter XXIII (“The Book of the Machines”), 1872; Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1906/1906-h/1906-h.htm"
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg's 1801 painting Coalbrookdale by Night shows the Bedlam ironworks blazing in the dark, its furnaces throwing a hellish orange glare across the Shropshire valley that gave birth to the Industrial Revolution. It is among the first artworks to treat heavy industry as a sublime and slightly terrifying force, reshaping the land and devouring everything around it. Two centuries on, the data center humming through the night is our Coalbrookdale: the new furnace drinking power and water from the countryside. The painting captures exactly the unease that pushed New York to act.",
        "excerpt": "A nocturne of industry: molten light pours from the furnaces of the Madeley Wood ironworks while smoke and steam boil into a black sky, dwarfing the tiny figures and carts below. Loutherbourg renders the birth of the industrial age as both awe-inspiring and infernal, a landscape being consumed by the very fires of production.",
        "source": "Philip James de Loutherbourg, “Coalbrookdale by Night,” 1801, oil on canvas, Science Museum, London; Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._002.jpg",
        "image": {
          "src": "/covers/new-york-data-center-moratorium--a4.png",
          "alt": "Coalbrookdale by Night (1801): ironworks furnaces glowing red against a dark, smoke-filled night sky.",
          "credit": "Philip James de Loutherbourg, 1801, Science Museum, London (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Paul Dukas turned Goethe's ballad into music in 1897 with L'apprenti sorcier, the symphonic poem later immortalized by Disney's Fantasia. Listen and you hear the runaway logic of the moratorium itself: a mischievous little theme starts up, multiplies, and swells into an unstoppable sloshing march as the enchanted brooms flood the workshop, until a single thunderclap, the master's return, cuts it dead. It is the sound of a system that cannot regulate itself and must be halted from outside. New York's one-year freeze is that thunderclap; the open question is whether the master arrives in time.",
        "excerpt": "Dukas builds the piece from a single skittering motif that begins as a light bassoon curiosity, then breeds and accelerates into a churning, brass-heavy tide as the animated brooms multiply and the water keeps rising. The music has no internal off-switch; only an abrupt orchestral crash, the returning sorcerer, breaks the spell and restores silence.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic poem, 1897, A. Durand & Fils; IMSLP",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)"
      }
    ],
    "rank": 28
  },
  {
    "slug": "china-europe-south-china-sea-ruling",
    "headline": "China urges Europe to withdraw support for the 2016 South China Sea ruling as 14 nations and the EU reaffirm it",
    "overview": "Beijing called on European governments to stop endorsing the 2016 Hague arbitration ruling that rejected most of China's claims in the South China Sea, warning that continued support for the 'illegal' award would harm China-EU ties, after the European Union and 14 countries reaffirmed the decision as 'final and legally binding' on its tenth anniversary. China's foreign ministry repeated that it 'neither accepts nor recognizes' the tribunal, which it says overstepped its jurisdiction. The exchange marks a fresh flashpoint between Beijing and the West over freedom of navigation in one of the world's busiest waterways.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxQM1ZheXdvZmxPZ09nRGcyYXQta1JHLXhGc2tFYXU3TmdoWFZtWXpfdU1zaXNTVG9LTnBKRkxwZ0kwWHBVNGJJU3Z5d2VIRWZiejlBMFFjekhlaWd6OTNIbjNPc01jazd0NWZBQTNMNWlqb01KWG8wRUItUVA2dkZ0cjVaMmxxT0t0QzAwXzEya2ZjNjYwdGdRYTFqLWJ6ZURhVnpFZU9QYkFTMktqWHE0aWlOZ1hsbUwyMnVnSGpPMlRTUQ?oc=5"
      },
      {
        "name": "Taipei Times",
        "href": "https://www.taipeitimes.com/News/front/archives/2026/07/13/2003860650"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/china-europe-south-china-sea-ruling.png",
      "alt": "A Chinese coast guard vessel patrols disputed waters in the South China Sea.",
      "credit": "The Peace Palace, The Hague, seat of the Permanent Court of Arbitration that issued the 2016 South China Sea award. Photo by Thomas Wolf (www.foto-tw.de), CC BY-SA 3.0 DE, via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 416 BC the Athenian empire sent envoys to the tiny island of Melos with a blunt message: talk of justice is meaningless between unequal powers, and the weak must simply accept what the strong impose. Melos refused to surrender its independence, trusting in fairness and hope; Athens besieged the island, killed the men and enslaved the rest. Thucydides preserved the exchange as the founding text of \"might makes right.\" It is precisely this logic that the 2016 Hague ruling, and the 15 governments now reaffirming it, are trying to overturn when a small coastal state invokes law against a giant.",
        "excerpt": "Since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book V (The Melian Dialogue), trans. Richard Crawley",
        "href": "https://sourcebooks.web.fordham.edu/ancient/thuc-melian.asp"
      },
      {
        "category": "historical",
        "title": "In 1609 the Dutch jurist Hugo Grotius published Mare Liberum, arguing that the sea belongs to no single nation and that free navigation is a right of all peoples. Written to defend Dutch traders against Portuguese and Spanish claims to closed seas, it became the cornerstone of the modern law of the sea that produced UNCLOS and the very tribunal in The Hague. Beijing's expansive \"nine-dash line\" is a contemporary version of the closed-sea (mare clausum) claim Grotius attacked. Europe reaffirming the award is, in effect, restating his four-century-old axiom of the free seas.",
        "excerpt": "By the Law of Nations navigation is free to all persons whatsoever... I shall base my argument on the following most specific and unimpeachable axiom of the Law of Nations, called a primary rule or first principle, the spirit of which is self-evident and immutable, to wit: Every nation is free to travel to every other nation, and to trade with it.",
        "source": "Hugo Grotius, The Freedom of the Seas (Mare Liberum, 1609), Chapter I, trans. Ralph Van Deman Magoffin (Carnegie Endowment / Oxford Univ. Press, 1916)",
        "href": "https://bpb-us-w2.wpmucdn.com/sites.umassd.edu/dist/4/628/files/2016/10/Hugo-Grotius-The-Freedom-of-the-Seas1609.pdf"
      },
      {
        "category": "literary",
        "title": "In Chapter 89 of Moby-Dick, Melville lays out the whalemen's entire code of ownership in two brutal rules: a fish already harpooned belongs to whoever holds it, and a loose one is fair game for whoever can grab it first. He then widens the joke into a theory of empires, colonies and human rights themselves as \"Loose-Fish\" waiting to be seized by the strongest. It is a mordant portrait of possession by power rather than by law. A maritime claim asserted by grabbing, and denying any court can say otherwise, is Melville's Loose-Fish doctrine made real.",
        "excerpt": "I. A Fast-Fish belongs to the party fast to it. II. A Loose-Fish is fair game for anybody who can soonest catch it... What are the Rights of Man and the Liberties of the World but Loose-Fish?",
        "source": "Herman Melville, Moby-Dick; or, The Whale (1851), Chapter 89, \"Fast-Fish and Loose-Fish\"",
        "href": "https://en.wikisource.org/wiki/Moby-Dick_(1851)_US_edition/Chapter_89"
      },
      {
        "category": "literary",
        "title": "In Aesop's fable, a wolf that has already decided to eat a lamb methodically invents charges against it, so that the killing will look justified. The lamb refutes every accusation with plain facts, but the facts never mattered; the wolf devours it anyway. The moral is that a tyrant will always manufacture a pretext for tyranny. When a great power dismisses a legal award as \"illegal\" and declares it \"neither accepts nor recognizes\" the tribunal, the lamb's careful, law-based answers meet the same fate.",
        "excerpt": "[A Wolf] resolved not to lay violent hands on him, but to find some plea to justify to the Lamb the Wolf's right to eat him... The tyrant will always find a pretext for his tyranny.",
        "source": "Aesop, \"The Wolf and the Lamb,\" Aesop's Fables, trans. George Fyler Townsend; Internet Classics Archive",
        "href": "https://classics.mit.edu/Aesop/fab.1.1.html"
      },
      {
        "category": "artistic",
        "title": "Hokusai's woodblock print shows a colossal wave curling over three slender fishing boats, its claws of foam about to crash down while Mount Fuji sits tiny on the horizon. The overwhelming sea dwarfs the fragile human vessels clinging to their route. It is an image of small craft trying to hold their line against a force that answers to no one. In a dispute over freedom of navigation, it captures the position of smaller coastal states pressing forward beneath the shadow of a giant's claim.",
        "excerpt": "Katsushika Hokusai's \"Under the Wave off Kanagawa,\" better known as \"The Great Wave,\" is the most famous print of his series Thirty-six Views of Mount Fuji (c. 1830-31). A towering wave overwhelms small boats while distant Fuji stands unmoved, an enduring emblem of human smallness before the power of the sea.",
        "source": "Katsushika Hokusai, \"Under the Wave off Kanagawa (The Great Wave),\" c. 1830-31, from Thirty-six Views of Mount Fuji; public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg",
        "image": {
          "src": "/covers/china-europe-south-china-sea-ruling--a4.png",
          "alt": "Hokusai's woodblock print The Great Wave off Kanagawa: a giant cresting wave towering over three small boats with Mount Fuji in the distance",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1830-31), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Turner's 1839 masterpiece shows the ghostly warship Temeraire, a hero of the Battle of Trafalgar, being towed by a small dark steam-tug to be scrapped, glowing pale against a blazing sunset. It is a meditation on how even the mightiest sea power fades, its command of the waves passing into memory. No fleet, however dominant, rules the ocean forever. Against a giant that treats the South China Sea as its permanent possession, the painting whispers that dominion by force is temporary, while the shared law of the seas endures.",
        "excerpt": "J. M. W. Turner's \"The Fighting Temeraire tugged to her last berth to be broken up\" (1839) depicts a once-great warship, veteran of Trafalgar, hauled off to be dismantled beneath a fiery sunset. The luminous, elegiac scene turns the end of one navy's supremacy into a universal emblem: sea power is mortal, and no empire holds the waves for good.",
        "source": "J. M. W. Turner, \"The Fighting Temeraire tugged to her last berth to be broken up\" (1839), National Gallery, London; public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/china-europe-south-china-sea-ruling--a5.png",
          "alt": "Turner's painting The Fighting Temeraire: a pale ghostly sailing warship towed by a small steam-tug across a golden sunset on calm water",
          "credit": "J. M. W. Turner, The Fighting Temeraire (1839), National Gallery, London; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "google-switzerland-android-search-probe",
    "headline": "Switzerland's competition regulator opens an investigation into Google over Android's dropped search-engine choice screen",
    "overview": "Switzerland's Competition Commission (COMCO/WEKO) opened a preliminary investigation into Google after the company removed the 'choice screen' that let Android users pick a default search engine during setup, a feature Google still offers in the European Economic Area. Regulators said the change could shut out rival search providers and creates unequal treatment for Swiss users, in a market where Google holds about 82% of search. Google said it was aware of the probe and would cooperate fully with the authority.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOUGtmS3lEY2QtaUNTd2NnVFlYZ3drc2pKZWlyQ0J4T1VUVzlLejVPNW1Va3FxUXpzX1R0VmZ5VEtpTmI0dkIwMUhiTF9Vdmc0YUZqZ1lwWjlNZVd1Nk1PcTRWbVBDWG5rSGFvOHh4QWM5TUIwLVRIbE9OeS1vSFFJTzA2bGhnRXdybFJISFY3OEN6WWtocXJRM0tseWp4WmpaNnA2VTJUOHlFeTM4QlIxbDAtRTJLSnExRE9xcFZB?oc=5"
      },
      {
        "name": "SWI swissinfo.ch",
        "href": "https://www.swissinfo.ch/eng/various/weko-is-investigating-google-in-relation-to-search-engines/91742043"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/google-switzerland-android-search-probe.png",
      "alt": "An Android smartphone displays a search bar on its home screen, held in one hand.",
      "credit": "Android smartphone (Samsung Galaxy Note 10), photo via Wikimedia Commons, CC BY-SA."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly four centuries before Android, England's Parliament struck at the exact thing COMCO now fears: a powerful gatekeeper handed an exclusive road that everyone else is forced to travel. The Crown had been selling monopoly patents on playing cards, salt, even the making of glass, and the 1623 Statute of Monopolies declared them void as contrary to the realm's laws. It is among the first times a state formally decided that whoever controls the default channel of commerce must be curbed by statute. Google's roughly 82% grip on Swiss search, hardened by a removed choice screen, is a modern letters-patent by another name: the many funneled through one door because no rival can afford the toll.",
        "excerpt": "...are altogether contrary to the laws of this realm, and so are and shall be utterly void and of none effect, and in no wise to be put in ure or execution.",
        "source": "Statute of Monopolies, 1623 (21 Jac. 1, c. 3), Parliament of England",
        "href": "https://en.wikisource.org/wiki/Statute_of_Monopolies"
      },
      {
        "category": "historical",
        "title": "A generation before Android, another dominant platform learned that the default is the most valuable real estate in all of software. U.S. regulators found that Microsoft used its Windows monopoly to steer users toward Internet Explorer, and courts held that bundling and pre-installation, not merit, kept rivals from ever earning a fair click. The parallel to Switzerland's case is almost exact: remove the moment of choice at setup and inertia quietly does the monopolist's work. The choice screen Google deleted is the 2020s version of the browser Microsoft made hard to replace.",
        "excerpt": "Microsoft enjoys so much power in the market for Intel-compatible PC operating systems that if it wished to exercise this power solely in terms of price, it could charge a price for Windows substantially above that which could be charged in a competitive market.",
        "source": "United States v. Microsoft Corp., Court's Findings of Fact, U.S. District Court (D.D.C.), Nov. 5, 1999, para. 33",
        "href": "https://www.justice.gov/atr/us-v-microsoft-courts-findings-fact"
      },
      {
        "category": "literary",
        "title": "Kafka's parable gives us the choice screen as a nightmare. A man from the country waits his entire life before an open door to the Law, held back by a single doorkeeper who never quite says no, only 'not yet.' The gate was meant for him alone, yet he never walks through it, paralyzed by the gatekeeper's authority until death. That is the quiet violence of a default: the gate is technically open to rival search engines, but whoever guards the threshold, here the setup screen Google controls, decides who is ever really let in.",
        "excerpt": "Vor dem Gesetz steht ein Türhüter. Zu diesem Türhüter kommt ein Mann vom Lande und bittet um Eintritt in das Gesetz.",
        "source": "Franz Kafka, 'Vor dem Gesetz' (Before the Law), 1915",
        "href": "https://de.wikisource.org/wiki/Vor_dem_Gesetz"
      },
      {
        "category": "literary",
        "title": "Hobbes imagined sovereignty as a 'Mortall God,' an artificial giant assembled from the wills of the many who consent to be ruled for the sake of peace. A search monopoly is a commercial Leviathan of the same shape: 82% of a nation's queries flow up into one body because each user, individually, defers to the default. COMCO's probe is the older question in new clothes, namely who checks the Leviathan once it is built. When a private power sets the first choice for millions, the state becomes the only rival sovereign left that can say no.",
        "excerpt": "This is the Generation of that great Leviathan, or rather (to speake more reverently) of that Mortall God, to which wee owe under the Immortall God, our peace and defence.",
        "source": "Thomas Hobbes, Leviathan (1651), Part II, Chapter XVII",
        "href": "https://en.wikisource.org/wiki/Leviathan_(1651)/Chapter_17"
      },
      {
        "category": "artistic",
        "title": "Udo Keppler's 1904 cartoon 'Next!' renders Standard Oil as an octopus, its tentacles coiled around Congress, statehouses, and industry, with one arm reaching for the White House itself. It is the defining image of a monopoly that has stopped competing and started swallowing. Swap crude oil for search queries and the picture updates cleanly: a single firm whose reach into the default settings of every Android phone grips rivals before they can grow. The choice screen was one tentacle the Swiss regulators now want pried loose.",
        "excerpt": "Keppler's octopus captions the modern anxiety perfectly: a single creature whose reach is so total that no institution escapes its grip. Replace the oil tank with a search box and the tentacles become defaults, pre-installs, and the removed choice screen.",
        "source": "Udo J. Keppler, 'Next!', Puck, September 7, 1904 (Library of Congress)",
        "href": "https://commons.wikimedia.org/wiki/File:Standard_oil_octopus_loc_color.jpg",
        "image": {
          "src": "/covers/google-switzerland-android-search-probe--a4.png",
          "alt": "1904 political cartoon depicting Standard Oil as an octopus whose tentacles grip the U.S. Capitol, statehouses, and industry, one arm reaching for the White House",
          "credit": "Udo J. Keppler / Puck, 1904. U.S. Library of Congress (ppmsca.25884). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Keppler's 'The Bosses of the Senate' (1889) shows bloated trust monopolists looming over tiny lawmakers, while the people's entrance to the chamber is bolted shut. The cartoon's entire point is gatekeeping: the powerful decide which door stands open and which is closed. Switzerland's regulators are, in effect, trying to unbolt the people's entrance to search, restoring the moment where an ordinary Android user, not Google's default, picks who gets in. The image is more than a century old and still reads as a caption for this case.",
        "excerpt": "This is a Senate of the Monopolists, by the Monopolists, and for the Monopolists!",
        "source": "Joseph Keppler, 'The Bosses of the Senate', Puck, January 23, 1889 (Library of Congress)",
        "href": "https://commons.wikimedia.org/wiki/File:The_Bosses_of_the_Senate_by_Joseph_Keppler.jpg",
        "image": {
          "src": "/covers/google-switzerland-android-search-probe--a5.png",
          "alt": "1889 cartoon showing giant money-bag 'trust' figures towering over U.S. senators, with a closed 'People's Entrance' to the Senate",
          "credit": "Joseph Keppler / Puck, 1889. U.S. Library of Congress. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "nvidia-halves-asia-chip-buyers",
    "headline": "Nvidia more than halves its approved list of Asian AI-chip buyers to keep restricted GPUs from reaching China",
    "overview": "Nvidia has cut its roster of authorized customers in Asia by more than half after introducing a vetting 'white list' meant to stop its advanced AI processors from being diverted to China, the Financial Times reported. Over recent months the company tightened due diligence on distributors in Singapore, Malaysia and Japan, removing more than half of previous buyers—many of them smaller 'neo-cloud' providers—who may reapply after making changes. The clampdown follows U.S. export controls expected to shrink Nvidia's share of China's AI-chip market from roughly two-thirds in 2024 to single digits.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxQQ042c2NBTzI2SnhBeFZzMC03WndWMmFTRG1KbXI4V2hacnh2SWZUZ29nbkRvcUNVRi1NVEhWd19hSmNNNzh0QzNLVjhZcjFLWXhGdjFhLXIxcDRnUEQ0X0RRaXRVckJRd2Q1bmNpTklSbW5NUnNJUTdNejllLTVpTzF2QkI5V1YwUHVCWVgyREVXZG1QVS1fYWNGRVFweUlVQlpJSVhWNDF6WDd2TGc?oc=5"
      },
      {
        "name": "Zawya (Reuters)",
        "href": "https://www.zawya.com/en/business/technology-and-telecom/nvidia-halves-asia-buyer-list-in-china-chip-crackdown-ft-reports-bo5o1os8"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/nvidia-halves-asia-chip-buyers.png",
      "alt": "A high-end Nvidia data-center GPU board with heat sinks, seen close up.",
      "credit": "NVIDIA H100 Tensor Core GPU. Photo by 极客湾Geekerwan, CC BY 3.0, via Wikimedia Commons."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Nvidia pared its roster of trusted Asian buyers down to a vetted 'white list,' it revived a Cold War instinct: deny the rival the machines that make power. From 1949 the Western allies ran CoCom, a quiet committee in Paris that policed which computers, precision lathes, and microelectronics could cross the Iron Curtain. Like Nvidia's list, CoCom lived by lists — goods permitted, buyers approved, end-users watched — precisely because front companies and transshipment thrived in every gap. Singapore and Kuala Lumpur now play the role once held by Vienna and Zurich: neutral waypoints where a diverted shipment can quietly change its destination.",
        "excerpt": "An informal club of Western governments drew up 'control lists' and demanded that each strategic export declare its true end-user; a computer routed through a Swiss trading house could be traced, denied, or seized if its real destination lay in Moscow. Enforcement leaked constantly through third countries, and CoCom's whole history became a running battle against the diverted shipment.",
        "source": "Coordinating Committee for Multilateral Export Controls (CoCom), 1949–1994",
        "href": "https://en.wikipedia.org/wiki/Coordinating_Committee_for_Multilateral_Export_Controls"
      },
      {
        "category": "historical",
        "title": "Eight centuries before export-control lawyers, the Church wrestled with Nvidia's exact problem: how to stop your own merchants from arming the adversary for profit. The Third Lateran Council of 1179 threatened excommunication, confiscation, and even enslavement for Christians who sold the Saracens arms, iron, and shipbuilding timber — the strategic 'dual-use' goods of their day. The logic is identical to a GPU white list: deny the rival the material that converts directly into military strength. Then as now, the driver was 'cruel avarice,' the fat margin in selling contraband to a forbidden buyer.",
        "excerpt": "Cruel avarice has so seized the hearts of some that though they glory in the name of Christians they provide the Saracens with arms and wood for helmets, and become their equals or even their superiors in wickedness and supply them with arms and necessaries to attack Christians... Therefore we declare that such persons should be cut off from the communion of the church and be excommunicated for their wickedness, that catholic princes and civil magistrates should confiscate their possessions, and that if they are captured they should become the slaves of their captors.",
        "source": "Third Lateran Council (1179), Canon 24",
        "href": "https://www.papalencyclicals.net/councils/ecum11.htm"
      },
      {
        "category": "literary",
        "title": "Nvidia's real fear is the smuggler — the tidy distributor in Singapore who nods through the vetting and ships the accelerators onward to China anyway. Kipling's Sussex ballad is the folk anthem of exactly that trade: goods moving in the dark, everyone paid to look the other way, 'them that ask no questions isn't told a lie.' Swap the brandy and 'baccy for restricted H100 boards and the moral geography is unchanged — a coveted good, a forbidden destination, and a chain of paid intermediaries who profit by watching the wall. The poem is a manual in plausible deniability, the very thing Nvidia's due diligence is meant to strip away.",
        "excerpt": "If you wake at midnight, and hear a horse's feet,\nDon't go drawing back the blind, or looking in the street,\nThem that ask no questions isn't told a lie.\nWatch the wall, my darling, while the Gentlemen go by!\n\nFive and twenty ponies,\nTrotting through the dark—\nBrandy for the Parson,\n'Baccy for the Clerk;\nLaces for a lady; letters for a spy,\nAnd watch the wall, my darling, while the Gentlemen go by!",
        "source": "Rudyard Kipling, 'A Smuggler's Song' (from Puck of Pook's Hill, 1906)",
        "href": "https://en.wikisource.org/wiki/A_Smuggler's_Song"
      },
      {
        "category": "literary",
        "title": "At bottom this is a story about denying a rival the fire. Zeus meant to keep the transformative technology from mortals; Prometheus stole it hidden in a hollow reed and paid for the diversion with eternity chained to a rock. Nvidia's chips are the modern fire — a 'measureless resource' and 'mighty teacher of all arts' that lifts whoever holds it. Export controls cast Washington as Zeus guarding the flame, the smuggling networks as so many Prometheuses, and the blacklists, seizures, and prosecutions as the eagle sent to the liver.",
        "excerpt": "I sought the fount of fire in hollow reed\nHid privily, a measureless resource\nFor man, and mighty teacher of all arts.",
        "source": "Aeschylus, Prometheus Bound (trans. E. B. Browning)",
        "href": "http://classics.mit.edu/Aeschylus/prometheus.html"
      },
      {
        "category": "artistic",
        "title": "Wright of Derby lit his forge like a shrine, the white-hot iron bar the only sun in the room — a reminder that strategic power has always begun in the heat of manufacture. In 1772 the coveted, controllable technology was worked metal; today it is the etched silicon of an AI accelerator. The painting sanctifies the moment of making that nations have forever tried to hoard, license, and deny to rivals. Nvidia's white list is a ledger drawn around a glow much like this one — deciding who may stand in the light of the forge.",
        "excerpt": "A family gathers around a water-powered forge at night, every face lit by a single incandescent billet of iron. Wright makes industrial technology feel sacred and closely held — a source of light and power guarded in the dark. It is the eighteenth century's portrait of the thing worth controlling.",
        "source": "Joseph Wright of Derby, An Iron Forge (1772), Tate Britain",
        "href": "https://www.tate.org.uk/art/artworks/wright-an-iron-forge-t06670",
        "image": {
          "src": "/covers/nvidia-halves-asia-chip-buyers--a4.png",
          "alt": "Joseph Wright of Derby's 1772 painting An Iron Forge: a family lit by a glowing white-hot iron bar in a dark forge.",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772), Tate Britain. Public domain, via Wikimedia Commons / Google Art Project."
        }
      },
      {
        "category": "artistic",
        "title": "Bizet gave smuggling its swagger. In Act III of Carmen the contrabandistas thread the mountain passes by night, singing that fortune waits down below if only they take care not to make a single false step. It is the diverted-goods trade set to music — the thrill and the risk of running forbidden cargo past the guards. Nvidia's tightened vetting is precisely the cordon these smugglers sing about slipping; the chips are the cargo, the neutral ports the moonlit pass.",
        "excerpt": "Écoute, écoute, compagnon, écoute!\nLa fortune est là-bas, là-bas;\nMais prends garde, pendant la route,\nPrends garde de faire un faux pas!",
        "source": "Georges Bizet, Carmen (1875), Act III, 'Marche des contrebandiers'",
        "href": "https://imslp.org/wiki/Carmen_(Bizet,_Georges)"
      }
    ],
    "rank": 31
  },
  {
    "slug": "softbank-son-ai-5-trillion",
    "headline": "SoftBank's Masayoshi Son says the AI boom will require $5 trillion of investment a year by 2040 and dismisses bubble fears",
    "overview": "SoftBank Group founder Masayoshi Son told the company's annual conference in Tokyo that building out artificial intelligence will demand about $5 trillion (800 trillion yen) in investment every year by 2040, calling talk of an AI bubble 'absurd.' Son argued the spending would be sustainable if AI generates a fifth of global GDP by then, and predicted AI data centers would eventually need three terawatts of power—nearly twice today's total global electricity use. The remarks underline SoftBank's all-in wager on AI infrastructure even as investors question the scale of capital flooding into the sector.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxPWkZUSElPZnM5N25jRGkzYnp1bGFGcHI0UkFPc3pQaFFfWnJneGdXMWdCRXNCT3F4N0tZYVVTLU9CUU4xVUg3LVF4aVJsQkNvenNiUURXQ0x4SDRmT1ZpZktxLU1VSmtRZUtmR0RuNVctTGFjandiM3pVTG9sVWdmRDBfMk13SjI4LU1XOEFhNnBHTG84RnVaMC1YQ3JwU3pSSVhDRHR3TEJaMXZJalpHWGJqQUI0RlZKZDN0N3BhdnhpbUxxSXNiVGN0Zw?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/business/softbank/softbank-s-son-says-ai-boom-will-require-5tn-in-annual-investment"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/softbank-son-ai-5-trillion.png",
      "alt": "A vast hall of illuminated server racks representing an artificial-intelligence data center.",
      "credit": "Masayoshi Son, SoftBank founder. Photo by Nobuyuki Hayashi (nobihaya), CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1720 London, investors hurled money at any venture wrapped in the promise of boundless future riches, none more infamous than a company floated 'for carrying on an undertaking of great advantage, but nobody to know what it is.' Its promoter took a fortune in a single morning and vanished across the Channel. When Masayoshi Son insists $5 trillion a year is not a bubble but the sober arithmetic of a golden AI future, he speaks in the same register of visionary certainty that once inflated the South Sea Company before it collapsed and ruined thousands. The line between prophet and promoter is only ever drawn in hindsight.",
        "excerpt": "Next morning, at nine o'clock, this great man opened an office in Cornhill. Crowds of people beset his door, and when he shut up at three o'clock, he found that no less than one thousand shares had been subscribed for, and the deposits paid. He was thus, in five hours, the winner of 2,000 l. ... He was never heard of again.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), 'The South-Sea Bubble'",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-2-the-south-sea-bubble/"
      },
      {
        "category": "historical",
        "title": "A century earlier, Holland lost its head over flower bulbs, until a single rare tulip could fetch the price of a canal-side house and every rank of society was speculating on next spring's blooms. Son's claim that AI will one day generate a fifth of global GDP, and so justify any sum poured into it now, echoes the self-reinforcing logic every mania runs on: the price is rational because everyone believes it will keep climbing. Tulipmania is remembered not because tulips were worthless, but because the story people told about them outran anything they could deliver. Calling bubble fears 'absurd' is precisely what a market says at its peak.",
        "excerpt": "Nobles, citizens, farmers, mechanics, seamen, footmen, maidservants, even chimney-sweeps and old clotheswomen, dabbled in tulips.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841), 'The Tulipomania'",
        "href": "https://www.econlib.org/book-chapters/chapter-ch-3-the-tulipomania/"
      },
      {
        "category": "literary",
        "title": "Humanity's first great capital project, in the Book of Genesis, was a tower 'whose top may reach unto heaven,' an infrastructure gamble meant to make its builders' name immortal. Son's vision of AI data centers drawing three terawatts, nearly twice the world's current electricity, is a literal bid to build toward the heavens on a planetary scale of power and ambition. Babel is the founding parable of collective hubris: the confidence that pooled resources and a single purpose can breach any ceiling. The story ends not in catastrophe but in confusion, as the builders lose the shared language that held the dream together.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Bible, King James Version, Genesis 11:4",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis"
      },
      {
        "category": "literary",
        "title": "Marlowe's Faustus signs away his soul for 'a world of profit and delight, of power, of honour, of omnipotence,' the scholar who craves not knowledge for its own sake but godlike command over the world. Son, who has staked SoftBank's fortunes on an all-in AI wager and speaks of artificial superintelligence as civilization's next engine, is the modern studious artisan reaching for that same omnipotence. The Faustian question is never whether the power is real; it is what must be mortgaged in advance to obtain it. A $5-trillion-a-year altar asks a great deal to be promised up front.",
        "excerpt": "O, what a world of profit and delight, / Of power, of honour, of omnipotence, / Is promis'd to the studious artizan! ... A sound magician is a mighty god: / Here, Faustus, tire thy brains to gain a deity.",
        "source": "Christopher Marlowe, The Tragical History of Doctor Faustus (c. 1604), Scene 1",
        "href": "https://www.gutenberg.org/files/779/779-h/779-h.htm"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 1563 panel renders Babel as a colossal spiraling megastructure, half-built and already fracturing, dwarfing the tiny king who commissioned it. The painting captures the exact mood of a hubristic mega-build: awe at the scale, unease at the foundations. Set beside Son's three-terawatt data-center vision, Bruegel's tower is a warning rendered in oil; the grander the monument to human ambition, the more visible its structural strain. It remains the definitive image of a project reaching past its own limits.",
        "excerpt": "A spiraling brick colossus climbs into the clouds, its upper arches still wrapped in scaffolding while the lower storeys already list and crack. At its foot a king inspects the works as an entire city labors on a monument that will never be finished. Ambition and instability rise together, storey by storey.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/softbank-son-ai-5-trillion--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting of the Tower of Babel, a vast unfinished spiral tower rising into the clouds",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth's 1721 print skewers the South Sea Bubble as a grotesque carnival: crowds ride a giddy merry-go-round of speculation while Honesty is broken on the wheel and Fortune's flesh is hacked away for the mob to fight over. Often called the first editorial cartoon, it turns a financial mania into moral spectacle. It is the ideal visual foil to any era's promise of effortless riches, a reminder that manias look like festivals right up until they don't. Hogarth drew what euphoria conceals.",
        "excerpt": "At the center a wooden machine whirls dizzy speculators in circles while a mob scrambles for shares. Off to one side Honesty is broken on the wheel and Self-Interest flays the body of Fortune, whose scattered flesh the crowd scrabbles over. Hogarth stages the boom as a fairground of folly bound for ruin.",
        "source": "William Hogarth, The South Sea Scheme (Emblematical Print on the South Sea Scheme), 1721",
        "href": "https://www.metmuseum.org/art/collection/search/396205",
        "image": {
          "src": "/covers/softbank-son-ai-5-trillion--a5.png",
          "alt": "William Hogarth's 1721 satirical print The South Sea Scheme, showing crowds on a speculative merry-go-round amid figures of Honesty and Fortune being tortured",
          "credit": "William Hogarth, The South Sea Scheme (1721). Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "south-korea-bok-rate-hike",
    "headline": "South Korea's central bank is expected to raise interest rates on 16 July, its first hike in more than three years",
    "overview": "The Bank of Korea is expected to lift its benchmark seven-day repo rate by a quarter-point to 2.75% on 16 July, which would be its first increase since January 2023, as consumer inflation running near 3.1% and oil prices lifted by Middle East tensions push policymakers to tighten, a Reuters poll of economists found. The move would set South Korea against a broader global drift toward rate cuts, with markets pricing in a further rise to 3.00% by year-end. Analysts said the won's weakness and stubborn price pressures left the bank little room to wait.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxOcVllY0FCSXYtWEhqWHNXUFhEbXVaQVRfTXVCQzF5enF5U0dZaWlZS2RyMjJ1dFhjaXRUVHdNc3lHeWpMNTlPX283TXRGZmdENlZIaURIMWk4Q0NwV09rOGt1Q09PS3BUOXVIX1lwWXVkaThGLWpvOVhPOERiUDFsWW9lbElRMDdNVVZlZHNhTHptUGFKMU5QOUIwREtXQ2xBaG0zWkcyRU5TSmUyZHNjVEc2d3o1S1E1NEkzTFBsSExTTFIwWlE?oc=5"
      },
      {
        "name": "KED Global",
        "href": "https://www.kedglobal.com/bok/newsView/ked202607130001"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/south-korea-bok-rate-hike.png",
      "alt": "The headquarters of the Bank of Korea in central Seoul.",
      "credit": "Bank of Korea head office, Seoul. Photo by 우한길 (HK Woo), via Wikimedia Commons, CC BY 3.0."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Bank of Korea lifts its benchmark rate to 2.75% on 16 July, it revives the hardest lesson a central banker ever learns: that only pain reliably kills inflation. Paul Volcker learned it the brutal way after 1979, driving the U.S. federal funds rate toward 19–20% to break a decade of runaway prices. Mortgages became unaffordable, unemployment climbed toward 10.8%, and Volcker needed bodyguards as farmers blockaded the Fed. Yet inflation that had topped 14% collapsed to near 3%, and the credibility he bought defined a generation of policy. Governor Rhee's quarter-point is a whisper beside Volcker's roar, but the logic is identical: raise the cost of money now, or pay far more later.",
        "excerpt": "On 6 October 1979 Volcker's Fed shifted to constraining bank reserves and let interest rates rise to record highs near 20%. The move triggered a severe recession and double-digit unemployment, but inflation fell from about 11.6% in early 1980 to under 4% by 1983 — and the Fed's hard-won credibility anchored the decades that followed.",
        "source": "Federal Reserve History — 'Volcker's Announcement of Anti-Inflation Measures' (Great Inflation, October 1979)",
        "href": "https://www.federalreservehistory.org/essays/anti-inflation-measures"
      },
      {
        "category": "historical",
        "title": "South Korea confronts oil-driven prices with the disciplined tool of dearer money; the Emperor Diocletian, facing an empire whose debased silver coinage had ignited runaway inflation around 301 AD, reached instead for the opposite and cruder lever — a decree freezing prices by force. His Edict on Maximum Prices set ceilings on a thousand goods and threatened death for overcharging. Merchants simply withdrew their wares, black markets bloomed, and, as the Christian writer Lactantius recorded, blood was spilled over trifles until the law collapsed. It is the enduring counter-example the Bank of Korea implicitly honours: you cannot command prices down, you can only make money scarce and let markets cool. Sound coin, not coercion, is the guardian's real instrument.",
        "excerpt": "\"He also, when by various extortions he had made all things exceedingly dear, attempted by an ordinance to limit their prices. Then much blood was shed for the veriest trifles; men were afraid to expose anything to sale, and the scarcity became more excessive and grievous than ever, until, in the end, the ordinance, after having proved destructive to multitudes, was from mere necessity abrogated.\"",
        "source": "Lactantius, 'Of the Manner in Which the Persecutors Died' (De Mortibus Persecutorum), ch. 7",
        "href": "https://www.newadvent.org/fathers/0705.htm"
      },
      {
        "category": "literary",
        "title": "Interest is the price of borrowed money, and the moral heat around it is as old as lending itself — never fiercer than in Shakespeare's Rialto, where the merchant Antonio despises Shylock for charging usury even as he comes to borrow. Shylock's reply lays bare the ancient argument the Bank of Korea now settles with a policy rate: money has a cost, and to lend it is to demand a return. When the BOK nudges its benchmark to 2.75%, it is officially raising the price Koreans pay 'for use of that which is mine own.' The play dramatises the resentment that dearer money always breeds — the borrower who scorns the lender until he needs him. It is a reminder that every rate decision is also a judgement about who bears the cost of scarce capital.",
        "excerpt": "\"Signior Antonio, many a time and oft / In the Rialto you have rated me / About my moneys and my usances. / Still have I borne it with a patient shrug, / (For suff'rance is the badge of all our tribe.) / You call me misbeliever, cut-throat dog, / And spet upon my Jewish gaberdine, / And all for use of that which is mine own.\"",
        "source": "William Shakespeare, 'The Merchant of Venice', Act 1, Scene 3 (Shylock)",
        "href": "https://www.gutenberg.org/ebooks/1515"
      },
      {
        "category": "literary",
        "title": "Behind every rate hike is a homely truth that Benjamin Franklin spent a career preaching: cheap credit is a seduction, and debt quietly mortgages your freedom. In 'The Way to Wealth', his character Father Abraham warns a crowd tempted by six months' easy credit that borrowing hands another person power over your liberty. That is precisely the discipline the Bank of Korea seeks to restore after years of low rates fed household borrowing — by making money dearer, it forces the thrift Franklin prized. Korea carries some of the world's heaviest household debt, and a 2.75% rate is the stern reminder that the empty bag cannot stand upright. Poor Richard would have recognised the medicine, and swallowed it.",
        "excerpt": "\"But, ah! think what you do when you run in debt; you give to another power over your liberty, If you cannot pay at the time, you will be ashamed to see your creditor; you will be in fear when you speak to him; you will make poor pitiful sneaking excuses, and, by degrees, come to lose your veracity, and sink into base, downright lying.\"",
        "source": "Benjamin Franklin, 'The Way to Wealth' (Poor Richard Improved, 1758)",
        "href": "https://www.gutenberg.org/files/43855/43855-h/43855-h.htm"
      },
      {
        "category": "artistic",
        "title": "Long before central banks, the guardianship of money's value was a scale, a coin, and a careful human eye — nowhere more vividly than in Quentin Matsys's 1514 masterpiece in the Louvre. A money-changer weighs gold coins on delicate scales while his wife, distracted from her prayer book, watches the glinting metal. The painting captures the exact anxiety the Bank of Korea now institutionalises: is this money worth what it claims to be? Every weighed coin is a private act of anti-inflation vigilance, testing for the clipped and debased currency that erodes trust. Raising rates is the modern equivalent of Matsys's scales — a public insistence that the won hold its weight.",
        "excerpt": "A money-changer bends over his balance, weighing gold and pearls with total absorption, while his richly dressed wife lets her illuminated prayer book fall open, her gaze pulled from the sacred page to the shining coins. In the convex mirror on the table a tiny figure reads by a window — a whole world reflected around the act of valuing money. The scene is a quiet sermon on the seductive weight of gold and the eternal task of testing what money is truly worth.",
        "source": "Quentin Matsys, 'The Moneylender and His Wife' (Le prêteur et sa femme), 1514, oil on panel, Musée du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Le_pr%C3%AAteur_et_sa_femme_-_Quentin_Metsys_-_Mus%C3%A9e_du_Louvre_Peintures_INV_1444_%3B_MR_821.jpg",
        "image": {
          "src": "/covers/south-korea-bok-rate-hike--a4.png",
          "alt": "A 16th-century money-changer weighing gold coins on a balance while his wife looks up from her prayer book",
          "credit": "Quentin Matsys, 'The Moneylender and His Wife' (1514), Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's 'Das Rheingold' opens the entire Ring cycle with a parable about the price of money: the dwarf Alberich renounces love itself to seize the Rhinegold and forge a ring of limitless power. From that theft flows a curse that poisons gods and mortals alike — wealth hoarded and debased corrupts everything it touches. The Bank of Korea's stern quarter-point is the sober answer to Alberich's fantasy that money can be conjured without cost. Inflation is the modern curse of debased gold, and tightening is the guardian's grim refusal of the free lunch. Wagner's shimmering, sinister score is the sound of value being stolen; a rate hike is the discipline that guards it.",
        "excerpt": "In the depths of the Rhine, the gold lies guarded and pure until Alberich, spurned and mocked, forswears love forever to tear it from the water and forge the ring of dominion. The music darkens as innocent wealth becomes an instrument of greed, and a curse settles on all who covet it. It is the oldest warning set to sound: gold seized without cost brings ruin, not power.",
        "source": "Richard Wagner, 'Das Rheingold', WWV 86A (1854; premiered 1869) — full score, IMSLP",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ],
    "rank": 33
  },
  {
    "slug": "samsung-us-adr-listing",
    "headline": "Bloomberg reports Samsung Electronics is exploring a U.S. share listing via ADRs; the company denies it",
    "overview": "Samsung Electronics is in early-stage talks with banks about issuing American depositary receipts that would give U.S. investors easier access to its shares, Bloomberg News reported, though Samsung publicly denied it was reviewing such a plan. The report said interest was revived by the blockbuster Nasdaq debut of rival SK Hynix, whose ADRs priced at $149 to raise about $26.5 billion, and by pressure from institutional shareholders. Any listing remains uncertain and could still be abandoned, according to the report.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOV2pYUFhWMjF0QmZ5eXl3NFJ6X2lNSUdqX2FkcWszRjRweGNpUlVWekNPTVExNWRjSk9ua1VOS1pOdktMTnRlUDNILTZIamdaWGlpOXF1cnN1Y0FVb2F1S3hFb2Z3S3pXODhTQ1RHaUdyZWpHQTJjYm0yWVRYZEF1NllXUk1wX2xldXlrVFhDUzhTZnV0S1AxQnNjVlM5ZkEyQmNfSEhMQjJWZ3lHai1iTE1NZU5LZTh5cnZteHBTa3U5Zw?oc=5"
      },
      {
        "name": "Korea JoongAng Daily",
        "href": "https://www.koreajoongangdaily.com/business/samsung-explores-potential-us-adr-listing-bloomberg-news-reports/12773649"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/samsung-us-adr-listing.png",
      "alt": "A Samsung sign on the exterior of a corporate building.",
      "credit": "The New York Stock Exchange seen from Federal Hall. Photo by Wikimedia Commons user Andy C, CC BY-SA 3.0."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1602 the young Dutch Republic did what Samsung is rumored to be weighing: it opened a company to a wider pool of outside capital and, in doing so, invented the modern share market. The States-General fused competing merchant ventures into the United East India Company (VOC) and let ordinary inhabitants subscribe capital and trade their stakes on the Amsterdam Beurs. It was the first time a firm reached past its founders to the broad investing public for money. A Korean chip giant courting U.S. ADR buyers is chasing the same thing four centuries later: deeper, more liquid pools of foreign capital.",
        "excerpt": "held, driven and increased under a fixed and certain unity, order, and police, for all the inhabitants of the united Lands who wished to participate",
        "source": "Charter (Octrooi) of the Dutch East India Company (VOC), 20 March 1602 — English translation",
        "href": "https://en.wikisource.org/wiki/Translation:VOC_charter"
      },
      {
        "category": "historical",
        "title": "When a nation or firm needs money at a scale its home market cannot supply, it travels to the era's dominant financial capital, hat in hand. In 1824 the fledgling Greek revolutionary government floated its bonds not in Athens but on the London Stock Exchange, riding a wave of investor enthusiasm for exotic new issues. London then was what New York is now: the deepest well of capital and the ultimate stamp of financial legitimacy. Samsung's reported flirtation with a U.S. ADR listing follows the same logic that once carried Greek loans, and countless sovereign flotations after them, to the world's leading exchange.",
        "excerpt": "To fund its war of independence, the provisional Greek government sent agents to London and, in February 1824, floated an £800,000 loan on the exchange there rather than raise it at home. Investors, chasing yield and romance, snapped it up before the young state had proven it could survive. Going abroad for capital brought prestige and cash, but it also bound Greece to the judgments of distant financiers.",
        "source": "George Finlay, History of the Greek Revolution (Edinburgh, 1861), vol. II",
        "href": "https://archive.org/details/historyofgreekre02finluoft"
      },
      {
        "category": "literary",
        "title": "Shakespeare gave us the perfect shorthand for a denial that draws attention to the very thing it denies. Watching the Player Queen swear undying fidelity, Hamlet's mother judges the vow overdone and suspect. The louder the insistence, the less anyone believes it. When Samsung flatly denies reviewing a U.S. listing even as Bloomberg reports early talks with banks, the market hears an echo of Gertrude: the emphatic 'no' becomes its own kind of tell.",
        "excerpt": "QUEEN: The lady protests too much, methinks.\nHAMLET: O, but she'll keep her word.",
        "source": "William Shakespeare, Hamlet, Act III, Scene 2",
        "href": "https://www.gutenberg.org/files/1524/1524-h/1524-h.htm"
      },
      {
        "category": "literary",
        "title": "Aesop's frog sees a rival's triumph and cannot bear to be smaller. Told the ox is enormous, the frog puffs itself up, and up, and up, straining to match a peer's bulk until it bursts. The fable is about the danger of measuring yourself against a dazzling competitor. Samsung's revived listing chatter was lit by rival SK Hynix's blockbuster Nasdaq debut, and the story is a warning about ambition driven by a neighbor's success rather than one's own plan.",
        "excerpt": "So the Frog took a deep breath, and blew and blew and blew, and swelled and swelled and swelled. And then he said: \"I'm sure the Ox is not as big as ——\" But at this moment he burst. Moral: Self-conceit may lead to self-destruction.",
        "source": "Aesop, 'The Frog and the Ox,' The Fables of Æsop (Joseph Jacobs, 1894)",
        "href": "https://en.wikisource.org/wiki/The_Fables_of_%C3%86sop_(Jacobs)/The_Frog_and_the_Ox"
      },
      {
        "category": "artistic",
        "title": "Emanuel de Witte painted the beating heart of the world's first stock market: the arcaded courtyard of the Amsterdam Beurs, thronged with merchants striking deals in the light. This was the physical stage on which VOC shares changed hands and the very idea of a public equity market took shape. It is the ancestor of every trading floor Samsung's bankers now eye across the Atlantic. The canvas makes visible what an ADR listing really means: joining the crowd inside the exchange where capital gathers.",
        "excerpt": "De Witte's 1653 canvas floods a Renaissance courtyard with light, its colonnades filled with brokers, buyers and idlers. Amid the bustle a market is being made, share by whispered share. It is a portrait of the exchange as a living organism, the same creature Samsung would be joining were the New York rumors to prove true.",
        "source": "Emanuel de Witte, 'The Courtyard of the Beurs in Amsterdam' (1653), Museum Boijmans Van Beuningen, Rotterdam",
        "href": "https://commons.wikimedia.org/wiki/File:Emanuel_de_Witte_-_De_binnenplaats_van_de_beurs_te_Amsterdam.jpg",
        "image": {
          "src": "/covers/samsung-us-adr-listing--a4.png",
          "alt": "Sunlit arcaded courtyard of the Amsterdam Beurs filled with merchants, by Emanuel de Witte, 1653.",
          "credit": "Emanuel de Witte, 'The Courtyard of the Beurs in Amsterdam' (1653), Museum Boijmans Van Beuningen. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Artemisia Gentileschi painted Fame as a winged woman lifting her trumpet, the classical personification of Fama, or Rumour, whose blast carries a story across the world whether or not it is true. That is exactly the force Samsung is fighting: a Bloomberg report, amplified and half-believed, that no official denial can fully call back once the trumpet has sounded. Gentileschi's allegory captures the tension at the center of this event, the gap between what is loudly reported and what is quietly true. Fame flies faster than any corporate press statement.",
        "excerpt": "Gentileschi's Fame raises her trumpet in a swirl of drapery, radiant and unstoppable. She is Rumour made flesh, the ancient goddess who spreads word of a thing before anyone can confirm it. Once she sounds her note, denial arrives too late to silence the echo.",
        "source": "Artemisia Gentileschi, 'Allegory of Fame' (c. 1630–1635)",
        "href": "https://commons.wikimedia.org/wiki/File:Allegory_of_Fame_by_Artemisia_Gentileschi_ca._1630-1635.jpg",
        "image": {
          "src": "/covers/samsung-us-adr-listing--a5.png",
          "alt": "Allegorical winged female figure raising a trumpet, personifying Fame and Rumour, by Artemisia Gentileschi.",
          "credit": "Artemisia Gentileschi, 'Allegory of Fame' (c. 1630–1635). Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "chipotle-opens-mexico",
    "headline": "Chipotle opens its first restaurant in Mexico, in Nuevo Leon, testing its burritos in the cuisine's home country",
    "overview": "Chipotle Mexican Grill opened its first location in Mexico this week, in San Pedro Garza Garcia in the northern state of Nuevo Leon, bringing its customizable burritos, bowls and tacos to the country whose cuisine inspired the chain. The opening, run with local operator Alsea, is a 'proof of concept' the company says it will extend across Nuevo Leon and into Mexico City by 2027. The move drew mockery online—one commenter called it 'selling Mexico a corporate version of Mexico'—and follows failed forays by other U.S. chains such as Taco Bell, which no longer operates in the country.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c0ryr89gp09o"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/13/chipotle-opening-first-restaurant-in-mexico.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/chipotle-opens-mexico.png",
      "alt": "The storefront of a Chipotle Mexican Grill restaurant with its logo above the entrance.",
      "credit": "Photo by Flickr user 'tacvbo', CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Spanish were led through the great Aztec market of Tlatelolco in 1519, they were stunned by the abundance: cacao, turkeys, chiles, maize and countless herbs — the native larder that would soon cross the Atlantic and rebuild the world's kitchens. These were the foods that made Mexican cuisine the ancestor of the global 'Mexican' menu. Nearly five centuries later, a U.S. chain carries a corporate, Americanized descendant of that pantry back to Nuevo Leon. It is coals to Newcastle: selling Mexico a burrito bowl assembled from Mexico's own ingredients.",
        "excerpt": "The moment we arrived in this immense market, we were perfectly astonished at the vast numbers of people, the profusion of merchandise which was there exposed for sale, and at the good police and order that reigned throughout. […] In another place were sold beans and sage, with other herbs and vegetables. A particular market was assigned for the merchants in fowls, turkeys, ducks, rabbits, hares, deer, and dogs; also for fruit-sellers, pastry-cooks, and tripe-sellers.",
        "source": "Bernal Díaz del Castillo, The Memoirs of the Conquistador Bernal Diaz del Castillo, Written by Himself, Vol. 1 (completed 1568) — on the great market of Tlatelolco",
        "href": "https://www.gutenberg.org/ebooks/32474"
      },
      {
        "category": "historical",
        "title": "Under the Raj, Britain shipped raw Indian cotton to the mills of Manchester, spun and wove it by steam, then sold the finished cloth back to the country that grew the fibre — a homeland made to buy its own material, marked up and rebranded as English. Gandhi's swadeshi answer was to reclaim the spinning wheel and make khadi at home. Chipotle's burrito is the culinary echo: Mexican staples processed into an American format and retailed to Mexicans. It is the old colonial trick of selling a place a reworked version of what it already possessed.",
        "excerpt": "It may be considered a heresy, but I am bound to say that it were better for us to send money to Manchester and to use flimsy Manchester cloth than to multiply mills in India.",
        "source": "M. K. Gandhi, Hind Swaraj or Indian Home Rule (1909), Chapter XIX, 'Machinery'",
        "href": "https://en.wikisource.org/wiki/Hind_Swaraj_(1938_edition)"
      },
      {
        "category": "literary",
        "title": "In Aesop's fable a plain jackdaw dresses himself in cast-off peacock feathers and struts into the peacocks' garden to pass as one of them — only to be recognized, stripped of the borrowed plumes, and then shunned by his own kind as well. It is the ancient parable of the imitation confronting the original: a copy in borrowed finery, exposed the instant it stands beside the source. Chipotle, decked in the plumage of Mexican cuisine and opening its doors inside Mexico, is the jackdaw walking straight into the peacocks' garden. The birds know their own feathers when they see them.",
        "excerpt": "So he picked up some castoff feathers of the Peacocks and stuck them among his own black plumes. […] Then he flew down into the garden among the Peacocks. But they soon saw who he was. Angry at the cheat, they flew at him, plucking away the borrowed feathers and also some of his own. […] Borrowed feathers do not make fine birds.",
        "source": "Aesop, 'The Vain Jackdaw and His Borrowed Feathers,' The Æsop for Children (1919)",
        "href": "https://read.gov/aesop/073.html"
      },
      {
        "category": "literary",
        "title": "Wilde's Lord Darlington defines a cynic as a man who knows the price of everything and the value of nothing — a line tailor-made for a fast-casual chain that can quote a burrito bowl to the cent yet is mocked for selling Mexico 'a corporate version of Mexico.' The gag is authenticity turned into a commodity: heritage priced, portioned, standardized and franchised. A cuisine's meaning is one thing; its menu price is another. Chipotle's Nuevo Leon gambit is a wager that the market price can stand in for the value.",
        "excerpt": "CECIL GRAHAM. What is a cynic? LORD DARLINGTON. A man who knows the price of everything and the value of nothing.",
        "source": "Oscar Wilde, Lady Windermere's Fan (1893), Act III",
        "href": "https://www.gutenberg.org/ebooks/790"
      },
      {
        "category": "artistic",
        "title": "On this page of the Codex Mendoza — an Aztec pictorial manuscript made for Spanish administrators around 1541 — scribes tallied the tribute owed to the empire: green-and-red quetzal-feather headdresses, two spread jaguar pelts, and squat golden bins beside which a Spanish hand has written 'ciento cargas de cacao,' a hundred loads of cacao. It is a native inventory of the very goods — cacao above all, the seed of the world's chocolate — that would soon sail to Europe and conquer the global palate. The manuscript is the origin ledger of Mexican foodways. Chipotle's franchised bowl in Nuevo Leon is the far-flung, corporate return of that pantry to the homeland that first catalogued it.",
        "excerpt": "Rows of feather panaches and two spread jaguar skins hover above squat golden bins, and beside them a Spanish gloss reads 'ciento cargas de cacao.' Cacao beans — at once the money and the ceremonial drink of the Aztecs — are logged here as imperial tribute, centuries before any of it left Mexico to become the world's chocolate. The page is a native accounting of the ingredients a modern chain now sells back across the same border.",
        "source": "Codex Mendoza, folio 47r (c. 1541), Bodleian Library, Oxford (MS. Arch. Selden. A. 1)",
        "href": "https://commons.wikimedia.org/wiki/File:Codex_Mendoza_folio_47r.jpg",
        "image": {
          "src": "/covers/chipotle-opens-mexico--a4.png",
          "alt": "Folio 47r of the Codex Mendoza showing Aztec tribute goods: green and red feather headdresses, two spread jaguar skins, and golden bins, with a Spanish note reading 'ciento cargas de cacao' (a hundred loads of cacao).",
          "credit": "Codex Mendoza, c. 1541, Bodleian Library, Oxford (public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In 1932 the American composer Aaron Copland visited a rowdy Mexico City dance hall called El Salón México, copied tunes out of published folk anthologies, and spun them into a glittering, syncopated orchestral crowd-pleaser — a stylized, exportable 'Mexico' for concert audiences. Tellingly, its 1937 premiere was given in Mexico City itself: an outsider's polished repackaging of Mexican music, played back to Mexicans. Critics have argued ever since over whether it captures Mexico or only a tourist's postcard of it. Chipotle, plotting its own Mexico City debut by 2027, follows the very same score — a foreign gloss on a native source, brought home for sale.",
        "excerpt": "Copland stitched borrowed dance-hall melodies into a brassy, cosmopolitan showpiece — Mexican raw material recast in an American idiom and, pointedly, premiered in Mexico City in 1937. Ever since, listeners have debated whether it renders Mexico or merely a visitor's glossy impression of it, the same charge now leveled at a burrito chain crossing the border. It is an imported version of a culture performed back to the culture that inspired it.",
        "source": "Aaron Copland, El Salón México (1932–36), premiered Mexico City, 27 Aug 1937, Orquesta Sinfónica de México cond. Carlos Chávez",
        "href": "https://www.aaroncopland.com/works/el-salon-mexico/"
      }
    ],
    "rank": 35
  },
  {
    "slug": "eu-bans-sudan-gold",
    "headline": "The EU bans imports of Sudanese gold to choke off financing for the RSF and army in Sudan's civil war",
    "overview": "European Union foreign ministers approved a ban on the purchase, import and transfer of gold from Sudan, together with a ban on exporting mercury and cyanide used in gold mining, saying the trade has become a key source of revenue sustaining a civil war that has raged since April 2023. Sudan is one of Africa's largest gold producers; UN experts estimate more than half its gold is smuggled out—much of it via Egypt, Chad and Libya to Dubai—by the Rapid Support Forces and the army, which control rival goldfields. The EU said the measures aim to 'reduce the resources' available to those perpetuating a conflict that has displaced more than 14 million people.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce3e3nqwr5do"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-13/eu-to-sanction-sudan-s-gold-trade-as-civil-war-rages"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/eu-bans-sudan-gold.png",
      "alt": "Stacked bars of refined gold bullion.",
      "credit": "Stacked gold bullion bars. Photo by Stevebidmead (via Pixabay), released under CC0 1.0 Universal Public Domain Dedication, via Wikimedia Commons (File:Gold_bullion_bars.jpg)."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the EU bars Sudanese gold, it is fighting the oldest engine of conquest: the belief that whoever holds the gold can do anything. Five centuries earlier, Christopher Columbus, stranded on his fourth voyage, wrote to the Spanish crown that gold was not merely wealth but a passport to power and even to heaven. That creed sent conquistadors to melt Inca and Aztec treasure into ingots and drove the plunder of two continents. In Sudan the same logic runs in reverse: the RSF and the army seize rival goldfields precisely because gold buys the guns that keep the war alive.",
        "excerpt": "Gold is most excellent. Gold constitutes treasure, and he who possesses it may do what he will in the world, and may so attain as to bring souls to Paradise.",
        "source": "Christopher Columbus, Letter from the Fourth Voyage (written from Jamaica, 7 July 1503)",
        "href": "https://earlyamericas.wordpress.com/anthology/columbus-letter-from-the-fourth-voyage/"
      },
      {
        "category": "historical",
        "title": "The EU's gold ban is modeled almost exactly on the fight against 'blood diamonds.' In the 1990s, rebel armies in Sierra Leone, Angola and Liberia funded their wars by seizing diamond fields and smuggling the stones onto world markets, so governments built the Kimberley Process to certify diamonds as conflict-free and choke the money at the source. Swap diamonds for gold, and Sierra Leone for Sudan, and the mechanism is identical: cut off the mineral revenue that pays the fighters. Brussels is applying a hard-won lesson about resources that finance slaughter.",
        "excerpt": "Conflict diamonds are defined as 'rough diamonds used by rebel movements or their allies to finance conflict aimed at undermining legitimate governments' (UN Security Council resolution 1459). The Kimberley Process, launched in 2003, is 'a coalition of governments, civil society and the diamond industry to eliminate the trade in so-called conflict diamonds.'",
        "source": "European Commission (Service for Foreign Policy Instruments), 'The Kimberley Process, the fight against conflict diamonds'",
        "href": "https://fpi.ec.europa.eu/what-we-do/kimberley-process-fight-against-conflict-diamonds_en"
      },
      {
        "category": "literary",
        "title": "Two thousand years ago Virgil gave the accursed hunger for gold its immortal name. In the Aeneid, the ghost of murdered Polydorus tells how he was slain for the gold he guarded, and the poet cries out against the greed that drives men to any crime. His phrase 'auri sacra fames' — the accursed lust for gold — is the exact indictment behind the EU's ban. Sudan's war, in which more than half the gold is smuggled out to Dubai to buy weapons, is that ancient hunger armed with modern rifles.",
        "excerpt": "quid non mortalia pectora cogis, auri sacra fames!",
        "source": "Virgil, Aeneid, Book III, lines 56–57 (Latin)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0055%3Abook%3D3%3Acard%3D49"
      },
      {
        "category": "literary",
        "title": "Chaucer's Pardoner tells a parable of gold that kills those who grasp it. Three drunkards go hunting for Death and instead find a hoard of gold florins beneath a tree; delighted, they promptly murder one another to keep it all. The Pardoner's motto — radix malorum est cupiditas, greed is the root of all evils — is the moral spine of the tale. It reads like a fable of Sudan's warlords, who fight over goldfields that fund a war displacing millions, the treasure and the killing inseparable.",
        "excerpt": "And everich of thise riotoures ran / Til he cam to that tree, and ther they founde / Of floryns fyne of gold ycoyned rounde / Wel ny an eighte busshels, as hem thoughte. / No lenger thanne after Deeth they soughte, / But ech of hem so glad was of that sighte, / For that the floryns been so faire and brighte, / That doun they sette hem by this precious hoord.",
        "source": "Geoffrey Chaucer, 'The Pardoner's Tale,' The Canterbury Tales, lines 768–775 (Middle English)",
        "href": "https://chaucer.fas.harvard.edu/pages/pardoners-prologue-introduction-and-tale"
      },
      {
        "category": "artistic",
        "title": "George Frederic Watts painted greed as a god. His 'Mammon' shows the demon of money as a bloated idol enthroned on gold, one careless hand pressing down on the head of a crushed human figure, deaf to the suffering beneath him. Watts meant it as a scornful dedication to Mammon's worshippers — the people who lay human lives at the feet of wealth. It is a portrait of exactly what the EU is trying to interrupt: a trade in Sudanese gold in which the metal is enthroned and the 14 million displaced are the bodies underfoot.",
        "excerpt": "A brutal, crowned idol sits rigid on a golden throne, a bag of coin at his side, while his heavy hands rest without pity on the bowed heads of two pale human victims. Watts strips wealth of all glamour, painting Mammon as a stupid, merciless god served by the ruin of the weak.",
        "source": "George Frederic Watts, Mammon: Dedicated to his Worshippers (1884–85), oil on canvas, Tate Britain, London",
        "href": "https://commons.wikimedia.org/wiki/File:Watts_%E2%80%93_Mammon.jpg",
        "image": {
          "src": "/covers/eu-bans-sudan-gold--a4.png",
          "alt": "George Frederic Watts's painting 'Mammon', a crowned idol enthroned on gold resting his hands on the heads of two crushed human figures.",
          "credit": "George Frederic Watts, Mammon: Dedicated to his Worshippers (1884–85), Tate Britain. Public domain (artist died 1904) via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Grieg's 'In the Hall of the Mountain King' is the sound of greed closing in. In Ibsen's play, the chancer Peer Gynt — who later grows rich through slaving and crooked trade before losing it all — blunders into the troll king's cavern, where the creatures swarm to claim him and everything he has. Grieg builds the scene from a sly, creeping tune into a stamping, accelerating frenzy, a whole hall grasping at once. It is the perfect score for Sudan's rival forces massing over the goldfields, each faction lunging for a hoard that funds the slaughter.",
        "excerpt": "A low, stealthy theme creeps in the bassoons and cellos, then repeats faster and louder, pizzicato feet stamping, until the whole orchestra is a stampede of trolls clawing toward their prize. Grieg turns the pursuit of treasure into pure, accelerating menace that ends in a crash.",
        "source": "Edvard Grieg, 'In the Hall of the Mountain King' (Dovregubbens hall), from the incidental music to Peer Gynt, Op.23 (1875)",
        "href": "https://imslp.org/wiki/Peer_Gynt,_Op.23_(Grieg,_Edvard)"
      }
    ],
    "rank": 36
  },
  {
    "slug": "fontainebleau-forest-fire-arson",
    "headline": "Wildfire in France's Fontainebleau forest near Paris burns more than 1,900 hectares as police probe suspected arson",
    "overview": "A wildfire in the Fontainebleau forest about 60 km southeast of Paris has scorched more than 1,900 hectares (4,700 acres) and forced roughly 1,000 people to evacuate, with authorities deploying four Canadair water-bombers in an unprecedented mobilization for the greater Paris region. Interior Minister Laurent Nunez said around ten separate ignition points pointed to a deliberately set fire, and police detained two suspects, including an 18-year-old found with a lighter and soot on his hands. The blaze, in a former royal hunting estate, is part of a wave of fires across France and Spain during an intense summer heat.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/search?q=site:reuters.com+fontainebleau+fire+when:1d&hl=en-US&gl=US&ceid=US:en"
      },
      {
        "name": "France 24",
        "href": "https://www.france24.com/en/france/20260714-more-than-1-900-hectares-fontainebleau-forest-near-paris-destroyed-by-wildfires"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/fontainebleau-forest-fire-arson.png",
      "alt": "A firefighting aircraft drops water over a forest fire sending up a plume of smoke.",
      "credit": "Kari Greer / U.S. Forest Service (USDA). Public domain (work of the U.S. federal government), via Wikimedia Commons. Canadair CL-415 water-bomber dropping water on the Pioneer Fire, Boise National Forest, 2016 — the same amphibious type of aircraft (four of which were deployed over Fontainebleau)."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Fontainebleau's canopy went up in ten separate columns of smoke and the Interior Minister spoke of a deliberate hand, he was reaching for the oldest suspicion in the Western record: that a great fire is not always an accident. In July 64 AD Rome burned for days through the crowded quarters below the Palatine, and Tacitus reports that firefighters were menaced and firebrands openly thrown, so that many refused to believe the disaster was mere misfortune. The rumour hardened into an accusation against Nero himself, and to deflect it he found scapegoats to punish. Nineteen centuries later, an 18-year-old carrying a lighter is detained beside a former royal forest — the same ancient story of the incendiary hand and the search for who lit the match.",
        "excerpt": "But all human efforts, all the lavish gifts of the emperor, and the propitiations of the gods, did not banish the sinister belief that the conflagration was the result of an order.",
        "source": "Tacitus, Annals, Book XV (trans. Church & Brodribb)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15"
      },
      {
        "category": "historical",
        "title": "The Fontainebleau that burned in 2026 is beloved precisely because artists once fought to save it from a slower destruction. In the 1830s–50s the forest administration was clear-cutting ancient oaks and planting monotonous softwood, and the Barbizon painters — led by Théodore Rousseau, who petitioned Napoleon III's minister de Morny — militated to protect the woodland they painted. Their campaign produced the imperial decree of 13 April 1861 that set aside a 'réserve artistique,' widely called the first nature reserve on earth, protected by law eleven years before Yellowstone. That a fire now devours the very trees the world's first conservationists rescued gives this blaze its peculiar sting.",
        "excerpt": "By the imperial decree of 13 April 1861 an 'artistic reserve' was set aside within the Forest of Fontainebleau at the urging of the Barbizon painters — the first area of land in history to be protected for its beauty rather than its yield, predating Yellowstone by more than a decade. The men who painted its oaks became, almost by accident, the first to argue that a forest could be worth defending simply for what it was.",
        "source": "Milwaukee Art Museum — 'Peasants and Preservation: The Barbizon School Artists and the Struggle for Fontainebleau Forest'",
        "href": "https://blog.mam.org/2020/04/27/peasants-and-preservation-the-barbizon-school-artists-and-the-struggle-for-fontainebleau-forest/"
      },
      {
        "category": "literary",
        "title": "Long before satellite maps of burn scars, the forest fire was poetry's great image of an unstoppable, glittering force. In Book II of the Iliad, Homer likens the massed Greek army pouring onto the plain of Troy to a wildfire seen blazing from a distant mountaintop, its glare thrown up into the sky. It is the identical spectacle that greeted greater Paris this month: a woodland turned to a wall of light visible for miles, unprecedented Canadair bombers wheeling over the smoke. Homer's simile reminds us that humans have always read a forest ablaze as both terror and terrible beauty.",
        "excerpt": "As when some great forest fire is raging upon a mountain top and its light is seen afar, even so as they marched the gleam of their armour flashed up into the firmament of heaven.",
        "source": "Homer, Iliad, Book II (trans. Samuel Butler)",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm"
      },
      {
        "category": "literary",
        "title": "Virgil turned the same fire-image inward, toward loss. In Book II of the Aeneid, Aeneas recounts the night Troy burned, and compares the flames sweeping the doomed city to a firestorm driven by the wind flattening a ripe cornfield — devastation that rolls faster than anyone can flee. The palace of Ucalegon catches next; the sea itself glows with the reflected blaze. The Fontainebleau fire, forcing some thousand people to evacuate a landscape of memory and royal history, replays this ancient grief: a beloved place consumed while its people can only watch the light on the horizon.",
        "excerpt": "Thus, when a flood of fire by wind is borne, / Crackling it rolls, and mows the standing corn.",
        "source": "Virgil, Aeneid, Book II (trans. John Dryden)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "No painter is more bound up with this forest than Théodore Rousseau, the Barbizon master who both immortalised and helped protect it. In 'The Forest of Fontainebleau, Morning' (c. 1850) he paints the very woodland now scorched — great trees rising into a luminous dawn sky, cattle in a glade, the light almost sacred. Rousseau's canvases are the reason the world thinks of Fontainebleau as hallowed ground rather than mere timber. To look at his morning light now is to measure exactly what 1,900 hectares of flame have taken.",
        "excerpt": "Rousseau's oaks stand in a hush of early light, the forest rendered as a cathedral of living wood rather than a stand of trees. It is the vision that persuaded a nation, and then the world, that such a place must never be cut or burned — the same trees over which four water-bombers now circle.",
        "source": "Théodore Rousseau, 'The Forest of Fontainebleau, Morning' (c. 1850), oil on canvas, The Wallace Collection, London",
        "href": "https://commons.wikimedia.org/wiki/File:Th%C3%A9odore_Rousseau_(1812-1867)_-_The_Forest_of_Fontainebleau,_Morning_-_P283_-_The_Wallace_Collection.jpg",
        "image": {
          "src": "/covers/fontainebleau-forest-fire-arson--a4.png",
          "alt": "Théodore Rousseau's oil painting of the Fontainebleau forest at morning: tall trees and cattle in a clearing beneath a luminous dawn sky.",
          "credit": "Théodore Rousseau (1812–1867), The Forest of Fontainebleau, Morning, c. 1850, The Wallace Collection, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Fire has also been staged as spectacle and myth. At the close of Wagner's 'Die Walküre' (1870), Wotan summons the fire-god Loge and rings the sleeping Brünnhilde's rock with a wall of flame in the shimmering 'Magic Fire Music' (Feuerzauber) — an orchestral conjuring of fire as both punishment and enchantment, the incendiary as a god's deliberate act. It is fire willed into being, encircling and consuming, exactly the deliberate ignition investigators suspect at Fontainebleau. Wagner's flickering strings and brass give musical form to the destroyer who sets the world alight.",
        "excerpt": "In the Feuerzauber, Wagner builds fire from the orchestra itself — flickering figures in the strings, the glowing motif of Loge, brass swelling into a blaze that surrounds the mountain. It is the sound of a conflagration summoned on purpose, beautiful and terrible at once.",
        "source": "Richard Wagner, Die Walküre, WWV 86B — 'Wotans Abschied und Feuerzauber' (Act III finale)",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      }
    ],
    "rank": 37
  },
  {
    "slug": "nerihu-mandarin-oriental-facade",
    "headline": "Neri&Hu wraps the Mandarin Oriental's Landmark hotel in Hong Kong in a staggered terracotta-tile 'urban tapestry' facade",
    "overview": "Shanghai studio Neri&Hu unveiled a new facade for Mandarin Oriental The Landmark on Queen's Road in Hong Kong's Central district, cladding the former Harvey Nichols department store in staggered terracotta tiles meant to evoke a woven tapestry and the city's history of intricate tile and metalwork. The architects said the main challenge was to unify a fragmented, previously glass-and-billboard frontage into a single coherent identity for the recently renovated hotel. The redesigned Landmark hotel reopened on 1 June 2026.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/14/nerihu-mandarin-oriental-the-landmark-facade-hong-kong/"
      },
      {
        "name": "Hotel Designs",
        "href": "https://hoteldesigns.net/industry-news/mandarin-oriental-the-landmark-hong-kong-unveils-its-next-chapter/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/nerihu-mandarin-oriental-facade.png",
      "alt": "A hotel facade clad in staggered terracotta tiles resembling woven tapestry in Hong Kong's Central district.",
      "credit": "Natural History Museum, London (Alfred Waterhouse, 1881), buff-and-blue terracotta-tiled facade. Photo: Txllxt TxllxT, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Babylon dressed its walls in fired clay long before Hong Kong did. On the Ishtar Gate the city wrapped raw brick in glazed tiles, turning a defensive mass into a shimmering, patterned skin of lions and rosettes. Herodotus marveled that the very earth dug from the moat was baked and re-laid as ornament. Neri&Hu's staggered terracotta 'urban tapestry' is the same ancient instinct: take clay from the ground, fire it, and make a great building wear a woven face. The Landmark's tiled frontage is a distant cousin of the blue-brick gates of Mesopotamia.",
        "excerpt": "As fast as they dug the moat the soil which they got from the cutting was made into bricks, and when a sufficient number were completed they baked the bricks in kilns. Then they set to building, and began with bricking the borders of the moat, after which they proceeded to construct the wall itself, using throughout for their cement hot bitumen, and interposing a layer of wattled reeds at every thirtieth course of the bricks.",
        "source": "Herodotus, The Histories, Book I.179 (trans. George Rawlinson)",
        "href": "https://earth-history.com/bavbylon/greek-reports-of-babylon",
        "image": {
          "src": "/covers/nerihu-mandarin-oriental-facade--a0.png",
          "alt": "Reconstruction of the glazed blue-brick Ishtar Gate of Babylon at the Pergamon Museum, Berlin",
          "credit": "Ishtar Gate reconstruction, Pergamon Museum, Berlin. Photo: Rictor Norton, CC BY 2.0, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "When American towers first rose in steel, Louis Sullivan sheathed their skeletons in flowering terracotta, insisting a building's surface could sing. Yet even Sullivan argued that ornament was a chosen luxury, never a crutch for weak form; a structure should first be 'comely in the nude.' Neri&Hu take up exactly this tension in Central: beneath the woven tiles sits an ordinary commercial frame, and the terracotta is the deliberate, added grace. Their tapestry unifies a fragmented glass-and-billboard front the way Sullivan's clay foliage once redeemed the blunt Chicago box. The craft of fired clay as considered ornament runs straight from the 1890s to Queen's Road.",
        "excerpt": "If I answer the question in entire candor, I should say that it would be greatly for our aesthetic good if we should refrain entirely from the use of ornament for a period of years, in order that our thought might concentrate acutely upon the production of buildings well formed and comely in the nude... ornament is mentally a luxury, not a necessary.",
        "source": "Louis H. Sullivan, 'Ornament in Architecture,' The Engineering Magazine (1892)",
        "href": "https://www.readingdesign.org/ornament-in-architecture"
      },
      {
        "category": "literary",
        "title": "Penelope kept her suitors at bay with a loom, weaving a shroud by day and secretly unpicking it by night so the cloth was forever both whole and unfinished. Her web is the original story of fabric as strategy: a woven surface that holds an identity together while the world tugs at its threads. Neri&Hu's facade performs a gentler version of the same magic, drawing a single continuous 'tapestry' over a frontage that had unravelled into mismatched glass and signage. Where Penelope wove to delay a decision, the studio weaves to resolve one, binding fragments into one face. Both treat the woven surface as an act of will.",
        "excerpt": "She set up a great tambour frame in her room, and began to work on an enormous piece of fine needlework... we could see her working on her great web all day long, but at night she would unpick the stitches again by torchlight.",
        "source": "Homer, The Odyssey, Book II (trans. Samuel Butler)",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid's Arachne was a weaver so gifted her cloth seemed to breathe, her fingers coaxing raw fleece into images finer than a goddess could bear. Her tale is antiquity's great meditation on the woven surface as both craft and hubris, the loom as a place where skill becomes art. Neri&Hu's terracotta 'urban tapestry' claims that lineage openly, casting the building's outer skin as a piece of virtuoso weaving rendered in clay. The staggered tiles are the studio's threads, teased and twisted into a pattern that reads as fabric from the street. Arachne would recognize the ambition: to make a hard material look impossibly, gracefully woven.",
        "excerpt": "So graceful was her motion then,—if she / was twisting the coarse wool in little balls, / or if she teased it with her finger-tips, / or if she softened the fine fleece, drawn forth / in misty films, or if she twirled the smooth / round spindle with her energetic thumb,",
        "source": "Ovid, Metamorphoses, Book VI (trans. Brookes More)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=6"
      },
      {
        "category": "artistic",
        "title": "In the c.1500 tapestry cycle The Lady and the Unicorn, an entire world of millefleurs, animals and heraldry is knotted into a single flat plane of wool and silk, a wall that is literally cloth. It is the medieval ideal of the building-as-tapestry made real: architecture and narrative dissolved into one continuous woven surface. Neri&Hu invert the material but keep the dream, hanging a 'woven' skin of terracotta over the Mandarin Oriental so the hotel reads as a hung fabric rather than a stacked frame. Both turn a vertical surface into a field to be read, dense with pattern and identity. The Landmark's facade is a tapestry that happens to be fired, not spun.",
        "excerpt": "A field of deep red scattered with a thousand flowers, animals and heraldic devices, the six panels of The Lady and the Unicorn knot an entire courtly world into flat planes of wool and silk. The cloth becomes a wall, and the wall becomes a story, exactly the fusion of surface and image that Neri&Hu chase in terracotta.",
        "source": "The Lady and the Unicorn ('Sight'), c. 1500, Musée de Cluny, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:The_Lady_and_the_unicorn_Sight.jpg",
        "image": {
          "src": "/covers/nerihu-mandarin-oriental-facade--a4.png",
          "alt": "Medieval millefleurs tapestry 'The Lady and the Unicorn: Sight', a lady holding a mirror to a unicorn on a red woven ground",
          "credit": "The Lady and the Unicorn: 'Sight', c. 1500, Musée de Cluny. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Klimt's The Kiss dissolves two embracing figures into a single golden mantle of mosaic-like pattern, so that ornament, not anatomy, holds the image together. It is a masterclass in unifying fragments through a woven, tessellated surface, the very problem Neri&Hu set out to solve on Queen's Road. Their staggered terracotta tiles do for the fractured hotel frontage what Klimt's gold leaf does for his lovers: cloak disparate parts in one shimmering, patterned skin until they read as a whole. Both artists trust surface ornament to carry meaning and identity. The facade, like the painting, becomes a robe of tiles thrown over structure.",
        "excerpt": "Klimt wraps his lovers in a single glittering cloak of gold, spirals and tesserae, until pattern itself becomes the subject and two figures read as one ornamented mass. It is precisely this trick, unifying fragments beneath a woven, tile-like skin, that Neri&Hu perform in terracotta over a once-fractured Hong Kong frontage.",
        "source": "Gustav Klimt, The Kiss (Der Kuss), 1907–1908, Osterreichische Galerie Belvedere, Vienna",
        "href": "https://commons.wikimedia.org/wiki/File:The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
        "image": {
          "src": "/covers/nerihu-mandarin-oriental-facade--a5.png",
          "alt": "Gustav Klimt's The Kiss, two figures embracing within a large patterned cloak of gold leaf",
          "credit": "Gustav Klimt, The Kiss (1907–08), Belvedere, Vienna. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "sean-harte-roy-keane-red-cards",
    "headline": "Irish artist Sean Harte paints all 13 of Roy Keane's career red cards for a Dublin exhibition",
    "overview": "Dublin-based artist Sean Harte has made an oil-pastel painting of each of the 13 red cards footballer Roy Keane received over his career, for a show titled 'Sent Off' opening at Hen's Teeth in Dublin on 3 September. Harte said the series began as a playful personal project after Keane miscounted his dismissals on a podcast, and aims to turn the notorious sending-offs into something 'fun and playful.' The paintings revisit a childhood hero through the flashpoints that defined his combative reputation.",
    "genre": "Culture",
    "sources": [
      {
        "name": "It's Nice That",
        "href": "https://www.itsnicethat.com/articles/sean-harte-sent-off-art-project-140726"
      },
      {
        "name": "Hen's Teeth",
        "href": "https://www.hensteethdublin.com/all-events/sent-off-senie-harte-painting-of-every-roy-keane-red-card"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/sean-harte-roy-keane-red-cards.png",
      "alt": "Football referee's hand holding up a red card against a stadium backdrop.",
      "credit": "Roy Keane in 2014. Photo: Irish Defence Forces (Óglaigh na hÉireann), via Wikimedia Commons, CC BY 2.0."
    },
    "edition": "Afternoon Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before a referee's red card, Athens had its own ritual of sending a man off: ostracism. Each year citizens could scratch a name on a pottery shard and, by vote, banish a prominent figure for ten years. In 482 BCE they expelled Aristides, a general so upright he was nicknamed 'the Just' - the very fame that undid him. Like Roy Keane, whose combative brilliance made him both hero and marked man, Aristides learned that a towering reputation invites the crowd's verdict. Sean Harte's thirteen paintings are a gentler, playful version of that same ancient impulse to commemorate an expulsion.",
        "excerpt": "As therefore, they were writing the names on the sherds, it is reported that an illiterate clownish fellow, giving Aristides his sherd, supposing him a common citizen, begged him to write Aristides upon it; and he being surprised and asking if Aristides had ever done him any injury, 'None at all,' said he, 'neither know I the man; but I am tired of hearing him everywhere called the just.'",
        "source": "Plutarch, Life of Aristides (trans. John Dryden), Internet Classics Archive (MIT)",
        "href": "http://classics.mit.edu/Plutarch/aristide.html"
      },
      {
        "category": "historical",
        "title": "On 15 May 1912, Detroit's Ty Cobb - the fiercest competitor of his age - vaulted the railing at New York's Hilltop Park and thrashed a heckler in the stands. The American League suspended him, and in protest his Tigers teammates went on strike, forcing the club to field amateurs. Cobb, like Roy Keane, was a champion whose genius on the field was inseparable from a temper that repeatedly got him sent off it. His disgrace became the stuff of legend, endlessly retold - much as Keane's thirteen dismissals are now retold in oil pastel. The great competitor undone by his own rage is a story every era rewrites.",
        "excerpt": "The most famous of baseball's hot-tempered stars, Cobb climbed into the grandstand during a game against New York and beat a jeering spectator, then found himself suspended by league president Ban Johnson. His Detroit teammates, refusing to take the field without him, staged the sport's first players' strike. The incident cemented Cobb's reputation as a champion perpetually at war with the crowd.",
        "source": "New-York Tribune, 20 May 1912 (Library of Congress, Chronicling America)",
        "href": "https://chroniclingamerica.loc.gov/lccn/sn83030214/1912-05-20/ed-1/seq-8/"
      },
      {
        "category": "literary",
        "title": "Western literature opens on a red card. The very first word of Homer's Iliad is the wrath of Achilles - the anger of a peerless warrior who, feeling wronged, storms off the field and lets his own side suffer. It is the founding portrait of the great competitor undone by his temper, the hero whose defining trait is rage. Roy Keane, captain and combatant, walks in that ancient tradition of the champion whose fury is inseparable from his greatness. Sean Harte's exhibition turns thirteen fits of that same wrath into something 'fun and playful.'",
        "excerpt": "Sing, O goddess, the anger of Achilles son of Peleus, that brought countless ills upon the Achaeans. Many a brave soul did it send hurrying down to Hades, and many a hero did it yield a prey to dogs and vultures.",
        "source": "Homer, The Iliad, Book I (trans. Samuel Butler), Internet Classics Archive (MIT)",
        "href": "http://classics.mit.edu/Homer/iliad.1.i.html"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Coriolanus is the tragedy of a supreme warrior whose pride and temper get him thrown out of his own city. When Rome moves to banish him, he rounds on the citizens with contempt and banishes them right back before striding into exile. It is the sending-off as high drama: the champion too combative to bend, expelled from the arena that made him. Roy Keane's dismissals carry the same charge - a hero whose refusal to back down turned the field into a place he was repeatedly ordered to leave. Harte's 'Sent Off' reframes that banishment as playful commemoration rather than shame.",
        "excerpt": "You common cry of curs! whose breath I hate / As reek o' the rotten fens, whose loves I prize / As the dead carcasses of unburied men / That do corrupt my air, I banish you; ... Thus I turn my back: / There is a world elsewhere.",
        "source": "William Shakespeare, Coriolanus, Act III, Scene 3, The Complete Works of Shakespeare (MIT)",
        "href": "http://shakespeare.mit.edu/coriolanus/coriolanus.3.3.html"
      },
      {
        "category": "artistic",
        "title": "François-Léon Benouville's 1847 canvas 'The Wrath of Achilles' shows the hero in the grip of the rage that opens the Iliad - furious, withdrawn, undone by his own temper. Painted in Rome as a Prix de Rome pensioner's exercise, it makes anger monumental and beautiful, the way great art has always dignified transgression. That is exactly Sean Harte's move: taking a champion's fits of fury and rendering them, deliberately, as art. Where Benouville ennobles the wrath, Harte makes Keane's thirteen sendings-off 'fun and playful' - two artists commemorating a combative hero's anger on the wall of a gallery.",
        "excerpt": "A neoclassical oil in which Achilles, stripped of his prize by Agamemnon, seethes with the anger that will cost the Greeks dearly - the archetypal image of a champion consumed by his own rage. Benouville painted it while at the Villa Medici; it now hangs in the Musée Fabre, Montpellier.",
        "source": "François-Léon Benouville, 'The Wrath of Achilles' (1847), Musée Fabre, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Leon_Benouville_The_Wrath_of_Achilles.jpg",
        "image": {
          "src": "/covers/sean-harte-roy-keane-red-cards--a4.png",
          "alt": "Neoclassical painting of Achilles seated and seething with anger, 'The Wrath of Achilles' by François-Léon Benouville, 1847",
          "credit": "François-Léon Benouville, 'The Wrath of Achilles' (1847), Musée Fabre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Beethoven's Coriolan Overture (1807) sets the banished warrior to music: relentless, jagged C-minor chords that stalk and stab, the sound of a proud temper unable to yield. Inspired by the Coriolanus tragedy, it is a portrait in sound of the hero whose fury drives him out of his own world. It matches Roy Keane exactly - the driving intensity, the refusal to relent, the combative energy that repeatedly earned him the walk to the tunnel. Where Beethoven gives that wrath thunder, Sean Harte gives it oil pastel, each of Keane's thirteen dismissals recast as a small, playful artwork about a great competitor's temper.",
        "excerpt": "An orchestral overture in C minor whose hammering opening chords depict the intransigent, hot-tempered Coriolanus - a champion whose pride and anger lead to banishment and ruin. Beethoven distils the warrior's fury into music of violent forward drive that finally subsides into collapse.",
        "source": "Ludwig van Beethoven, Coriolan Overture, Op. 62 (1807), scores at IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Coriolan,_Op.62_(Beethoven,_Ludwig_van)"
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
