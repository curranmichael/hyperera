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
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
  },
  {
    "slug": "us-iran-hormuz-blockade-tankers",
    "headline": "The United States begins enforcing a Strait of Hormuz blockade and a 20% shipping levy as Iranian missiles strike tankers, killing a sailor",
    "overview": "Over a third consecutive night of U.S. airstrikes on Iran, President Donald Trump announced a 20% levy on cargo moving through the Strait of Hormuz and said Washington would begin enforcing a maritime blockade of the waterway on Tuesday. The United Arab Emirates condemned what it called a 'brazen' Iranian missile attack on oil tankers in the strait that killed at least one sailor, and Trump sent Congress formal notice that the conflict with Iran had resumed. Oil prices climbed to a one-month high and Asian shares wavered as traders braced for disruption to the world's most important oil chokepoint.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/07/13/nx-s1-5891746/us-iran-strait-of-hormuz-updates"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQdF9iNjRwdm9pODdabFB6TGd0b0llZjQxY3NDQWktelE1c2NnUERlYUs2TnNPc0JBaFZvWlZhM3VfRUVwTV9MZUFteVh3VlV0QVhfZi1NUGpQdEp3elpuYnFrVE9Yb1BzNmtGLWdiYlJ2THBOT3NrRmppdG5mNWFVRDcyWmFSRHJzWXJyVVpQYy16cVZKb1I1UEh4eFdYN1VURkFtQmNVanhnM2I4Y3JSLXhHTmhOMXBmSTRMZE4xam5CSlN1eGFR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/us-iran-hormuz-blockade-tankers.png",
      "alt": "A U.S. Navy aircraft carrier and its strike group steam in column through the narrow Strait of Hormuz.",
      "credit": "U.S. Navy photo by Petty Officer 3rd Class Janae Chambers, via Wikimedia Commons (public domain)"
    },
    "lead": true,
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 413 BC the Syracusans decided to seal the mouth of their Great Harbour, penning the Athenian fleet inside a narrow neck of water it could no longer escape. It is the classic lesson of the chokepoint: whoever controls the strait controls the fate of every ship behind it, and a proud naval power can be trapped by the same geography it came to dominate. Washington's move to close the Strait of Hormuz and blockade Iranian ports is the modern echo, a decision to bar a narrow gate and turn a waterway into a cage. Thucydides shows how quickly such a plan escalates from self-defense to a bid to annihilate the enemy outright.",
        "excerpt": "Meanwhile the Syracusans immediately began to sail freely along the harbour, and determined to close up its mouth, so that the Athenians might not be able to steal out in future, even if they wished. Indeed, the Syracusans no longer thought only of saving themselves, but also how to hinder the escape of the enemy; thinking, and thinking rightly, that they were now much the stronger, and that to conquer the Athenians and their allies by land and sea would win them great glory in Hellas.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII (trans. Richard Crawley)",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "When Woodrow Wilson asked Congress to declare war in April 1917, the trigger was a campaign of attacks on shipping: German submarines sinking merchant vessels without warning and drowning the sailors aboard. Wilson framed strikes on commerce as an assault on all nations, the kind of injury that pulls neutrals and bystanders into a widening war. The Iranian missiles that struck oil tankers in Hormuz and killed a crew member echo that same logic, an attack on civilian shipping that the UAE condemned and that risks dragging outside powers into direct combat. As in 1917, a war on cargo becomes the argument for a much larger war.",
        "excerpt": "The present German submarine warfare against commerce is a warfare against mankind. It is a war against all nations. American ships have been sunk, American lives taken, in ways which it has stirred us very deeply to learn of, but the ships and people of other neutral and friendly nations have been sunk and overwhelmed in the waters in the same way.",
        "source": "Woodrow Wilson, War Message to Congress, April 2, 1917 (U.S. National Archives)",
        "href": "https://www.archives.gov/milestone-documents/address-to-congress-declaration-of-war-against-germany"
      },
      {
        "category": "literary",
        "title": "Aeschylus wrote The Persians for an audience that had itself fought at Salamis, and its messenger describes a superpower's fleet destroyed inside a strait too cramped for its own numbers. The horror is precisely geographic: masses of ships jammed into narrow water, unable to maneuver, colliding with one another as the enemy picks them apart. That is the danger now hanging over Hormuz, where a blockade, a toll, and missile strikes crowd tankers and warships into one of the world's tightest maritime bottlenecks. The play is a warning about hubris in a strait, where scale becomes a liability and a single choke of water can undo a giant.",
        "excerpt": "Meantime from Persia's hosts the deep'ning shout Answer'd their shout; no time for cold delay; But ship 'gainst ship its brazen beak impell'd. First to the charge a Grecian galley rush'd; Ill the Phoenician bore the rough attack, Its sculptured prow all shatter'd. Each advanced Daring an opposite. The deep array Of Persia at the first sustain'd the encounter; But their throng'd numbers, in the narrow seas Confined, want room for action; and, deprived Of mutual aid, beaks clash with beaks, and each Breaks all the other's oars.",
        "source": "Aeschylus, The Persians (trans. Robert Potter)",
        "href": "https://classics.mit.edu/Aeschylus/persians.html"
      },
      {
        "category": "literary",
        "title": "In Book XII of the Odyssey, Odysseus must thread his ship through a strait guarded on one side by the whirlpool Charybdis and on the other by the monster Scylla, who reaches down and snatches six sailors to their deaths. Homer's strait is the original deadly chokepoint: a passage so narrow that ships cannot avoid the peril, and the price of transit is measured in dead crewmen. The Strait of Hormuz has become that same gauntlet, where a tanker's sailor was killed passing through waters ringed by missiles and warships. The poem captures the specific dread of a crew forced through a place where the sea itself has become a weapon.",
        "excerpt": "Then we entered the Straits in great fear of mind, for on the one hand was Scylla, and on the other dread Charybdis kept sucking up the salt water. As she vomited it up, it was like the water in a cauldron when it is boiling over upon a great fire, and the spray reached the top of the rocks on either side. When she began to suck again, we could see the water all inside whirling round and round, and it made a deafening sound as it broke against the rocks. We could see the bottom of the whirlpool all black with sand and mud, and the men were at their wits ends for fear. While we were taken up with this, and were expecting each moment to be our last, Scylla pounced down suddenly upon us and snatched up my six best men.",
        "source": "Homer, The Odyssey, Book XII (trans. Samuel Butler)",
        "href": "https://www.gutenberg.org/cache/epub/1727/pg1727.txt"
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky's The Battle of Chesme at Night depicts an entire fleet ablaze on dark water, the sea lit orange by burning hulls and columns of smoke and flame climbing into the night sky. It renders exactly the image now emerging from Hormuz: ships set on fire in a confined sea, the water itself turned into a field of destruction. The painting also carries the theme of oil and cargo as fuel for catastrophe, the way a strike on shipping becomes a conflagration visible for miles. Aivazovsky, the great painter of naval disaster, gives visual form to the tankers burning in the strait.",
        "excerpt": "A night seascape in which a trapped fleet burns on the water, its hulls glowing and exploding while towers of fire and smoke rise against a black sky. The calm sea mirrors the flames, turning the whole strait into a sheet of light and wreckage. Small boats pick their way among the burning ships, dwarfed by the scale of the destruction.",
        "source": "Ivan Aivazovsky, The Battle of Chesme at Night (1848), via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Ivan_Constantinovich_Aivazovsky_-_Battle_of_%C3%87esme_at_Night.JPG",
        "image": {
          "src": "/covers/us-iran-hormuz-blockade-tankers--a5.png",
          "alt": "Oil painting of a naval fleet burning at night on calm water, flames and smoke rising against a dark sky.",
          "credit": "Ivan Aivazovsky (1848), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Arne's Rule, Britannia! from the masque Alfred is the anthem of a nation claiming ownership of the seas, its refrain vowing that Britannia will rule the waves and command all who sail them. That is the political claim now being asserted over the Strait of Hormuz, where Washington announced it would control the passage, blockade Iranian ports, and charge a 20% levy on cargo for the privilege of protection. The piece captures the old fusion of naval power and maritime toll, the idea that whoever rules a waterway may tax everything that moves through it. Set to swelling music, it is the sound of a great power turning a chokepoint into a source of dominion and revenue.",
        "excerpt": "A grand patriotic ode built on a rising, march-like melody and a triumphant recurring refrain in praise of naval supremacy. The music swells with brass and chorus into an anthem of a maritime empire that claims to command the seas and everyone who sails them. Its confident, ceremonial tone turns control of the waves into a matter of national glory.",
        "source": "Thomas Arne, Rule, Britannia! from the masque Alfred (1740), via IMSLP.",
        "href": "https://imslp.org/wiki/The_Masque_of_Alfred_(Arne,_Thomas_Augustine)"
      }
    ],
    "rank": 27
  },
  {
    "slug": "sudan-rsf-hemedti-death-sentence",
    "headline": "A Sudanese court sentences paramilitary RSF leader Mohamed Hamdan Dagalo to death in absentia over war crimes",
    "overview": "A Sudanese court sentenced Mohamed Hamdan Dagalo, the commander of the paramilitary Rapid Support Forces known as Hemedti, to death in absentia for war crimes, in the first judicial conviction of the group's leadership since Sudan's civil war erupted in April 2023. Fifteen other RSF commanders and allies were condemned alongside him over the killing of a state governor and atrocities in West Darfur. Rights groups warned the army-aligned court's verdict could further dim prospects for a negotiated peace in a war that has killed tens of thousands and displaced millions.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn4dk3kl0l4o"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/news/mena/2026/07/13/army-aligned-sudan-court-deals-blow-to-peace-hopes-with-death-sentence-against-rsf-leader-dagalo/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/sudan-rsf-hemedti-death-sentence.png",
      "alt": "Mohamed Hamdan Dagalo wearing a beige military cap with a round red logo.",
      "credit": "BBC News"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 70 BC the orator Cicero prosecuted Gaius Verres, the Roman governor whose plunder and cruelty devastated the province of Sicily and who illegally scourged and crucified a Roman citizen. Verres fled into exile before judgment, so his condemnation was pronounced over an empty seat, much as Hemedti was convicted with no defendant in the dock. Both cases turn a courtroom into a public reckoning for a strongman who terrorised the very people he was meant to protect. The prosecution's power lies less in seizing the culprit than in naming the atrocity for history.",
        "excerpt": "It is a crime to bind a Roman citizen; to scourge him is a wickedness; to put him to death is almost parricide. What shall I say of crucifying him?",
        "source": "Cicero, In Verrem (Against Verres), Second Pleading, Book 5. Marcus Tullius Cicero (trans. C. D. Yonge). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Against_Verres/Second_pleading/Book_5"
      },
      {
        "category": "historical",
        "title": "At Nuremberg in 1946 the International Military Tribunal tried Hitler's secretary Martin Bormann in absentia and sentenced him to death for war crimes and crimes against humanity, unsure whether he was even alive. The Sudanese court's verdict against Hemedti echoes that precedent closely: a leader of an organised campaign of mass killing condemned to hang though he sits far beyond the court's reach. In both, judges refused to let a defendant's absence harden into impunity. The sentence stands as much as a moral record of the atrocities as a practical order of execution.",
        "excerpt": "Counsel has argued that Bormann is dead and that the Tribunal should not avail itself of Article 12 of the Charter which gives it the right to take proceedings in absentia. But the evidence of death is not conclusive, and the Tribunal, as previously stated, determined to try him in absentia.",
        "source": "Judgment of the International Military Tribunal at Nuremberg: Martin Bormann. The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/imt/judborma.asp"
      },
      {
        "category": "literary",
        "title": "In Canto XII of Dante's Inferno the warlords and tyrants who \"dealt in bloodshed and in pillaging\" are sunk to their brows in a river of boiling blood, guarded by centaurs who shoot any who dare rise too high. Dante imagines a divine tribunal that measures each ruler's punishment to the exact depth of his slaughter and condemns them by name for eternity. Hemedti's sentencing for the killings in West Darfur reaches for the same poetic justice: the man who drowned a region in blood is publicly consigned to judgment. Like Dante's court, the verdict insists the record of atrocity outlives the perpetrator's escape.",
        "excerpt": "People I saw within up to the eyebrows,\nAnd the great Centaur said: “Tyrants are these,\nWho dealt in bloodshed and in pillaging.\n\nHere they lament their pitiless mischiefs; here\nIs Alexander, and fierce Dionysius\nWho upon Sicily brought dolorous years.”",
        "source": "Dante Alighieri, Inferno, Canto XII (the tyrants in the river of boiling blood). Dante Alighieri (trans. Henry Wadsworth Longfellow). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1001/1001-h/1001-h.htm"
      },
      {
        "category": "literary",
        "title": "Euripides' The Trojan Women shows the sack of a city from the victims' side, and the god Poseidon warns the conquering army that those who lay temples and tombs to waste are \"yourselves so soon to die.\" The play frames the massacre of a defenceless population as a crime that summons its own reckoning. Hemedti's RSF stands accused of exactly such atrocities against civilians in Darfur, and the death sentence is the reckoning the play foretells. Both insist that the sacking of a people is never the end of the story.",
        "excerpt": "How are ye blind,\nYe treaders down of cities, ye that cast\nTemples to desolation, and lay waste\nTombs, the untrodden sanctuaries where lie\nThe ancient dead; yourselves so soon to die!",
        "source": "Euripides, The Trojan Women (Poseidon's warning to the sackers of the city). Euripides (trans. Gilbert Murray). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/35171/35171-h/35171-h.htm"
      },
      {
        "category": "artistic",
        "title": "Goya's The Third of May 1808 depicts the summary execution of unarmed civilians, the terrified figures lit against a wall of anonymous rifles. It is the visual grammar of the very atrocities for which Hemedti was condemned: a defenceless population slaughtered by an armed force acting with impunity. The painting also inverts the courtroom's ritual, showing execution without trial where the Sudanese court offers trial without the executed. Set side by side, they frame the war's central question of who answers for the killing of the helpless.",
        "excerpt": "Goya throws a lantern's harsh white light onto a kneeling man in a white shirt, arms flung wide, as a faceless firing squad levels its muskets inches from his chest. Around him the dead already lie in pools of blood while others cover their eyes and wait their turn. The night, the anonymity of the executioners, and the raw terror of the victims make the massacre feel at once specific and endless.",
        "source": "Francisco de Goya, The Third of May 1808 (El Tres de Mayo). Wikimedia Commons (Museo del Prado, public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_in_Google_Earth.jpg",
        "image": {
          "src": "/covers/sudan-rsf-hemedti-death-sentence--a5.png",
          "alt": "Goya's The Third of May 1808: a firing squad executes a group of civilians at night, one kneeling with arms outstretched, the dead lying in blood at his feet.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Verdi's Messa da Requiem sets the medieval Dies irae, the \"Day of Wrath\" on which all deeds are judged and the guilty face their sentence. Its overwhelming force mirrors the moral weight of a court at last pronouncing judgment on the leader of a mass atrocity. Where the Sudanese verdict is symbolic because the defendant is absent, Verdi's judgment is likewise a matter of conscience rather than capture. The Requiem insists that a reckoning withheld on earth is still demanded in full.",
        "excerpt": "In the Dies irae, hammer-blow chords and a shrieking chorus conjure the Day of Wrath, when every hidden deed is dragged into the light for judgment. Brass and bass drum fall like the strokes of doom while the voices plead and tremble before an implacable verdict. The music stages a cosmic tribunal in sound, terrifying and inescapable.",
        "source": "Giuseppe Verdi, Messa da Requiem, \"Dies irae\" (Day of Wrath). IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 28
  },
  {
    "slug": "trump-shrinks-utah-monuments",
    "headline": "President Trump orders roughly 90% cuts to Utah's Bears Ears and Grand Staircase-Escalante national monuments",
    "overview": "President Donald Trump signed proclamations on July 13, 2026, sharply cutting the boundaries of two national monuments in Utah, shrinking Bears Ears from about 1.36 million acres to roughly 121,000 and stripping protection from nearly 1.7 million of Grand Staircase-Escalante's 1.87 million acres. The reductions, deeper than the cuts he made in his first term and reversed under President Biden, reopen close to three million acres of federal land to potential mining, grazing and energy development. Tribal nations and conservation groups called the move heartbreaking and vowed to fight it in court.",
    "genre": "Climate",
    "sources": [
      {
        "name": "The Washington Post",
        "href": "https://www.washingtonpost.com/climate-environment/2026/07/13/trump-again-dramatically-cuts-size-two-national-monuments-utah/"
      },
      {
        "name": "The Hill",
        "href": "https://thehill.com/policy/energy-environment/5966604-trump-shrinks-utah-monuments/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/trump-shrinks-utah-monuments.png",
      "alt": "Sandstone canyon country seen from the Comb Ridge Overlook in Bears Ears National Monument, Utah.",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the second century BCE, Rome's public land, the ager publicus meant for common use, was steadily swallowed by wealthy landholders until Tiberius Gracchus rose to demand it be returned to the people. His reform set the common good against private extraction, much as the fight over Bears Ears sets shared federal wilderness against mining and grazing. Trump's proclamations reopen roughly three million acres to private use, echoing the Roman rich who quietly absorbed the commons under other people's names. Then as now, dispossession was framed as orderly management. And then as now, those with the least standing were the ones displaced.",
        "excerpt": "The savage beasts in Italy, have their particular dens, they have their places of repose and refuge; but the men who bear arms, and expose their lives for the safety of their country, enjoy in the meantime nothing more in it but the air and light; and having no houses or settlements of their own, are constrained to wander from place to place with their wives and children.",
        "source": "Plutarch, Life of Tiberius Gracchus. Wikisource (Plutarch's Lives, tr. Clough)",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Tiberius_Gracchus"
      },
      {
        "category": "historical",
        "title": "John Muir helped launch America's conservation movement by insisting wild places be preserved from the axe of the lumberman and the pick of the prospector. Writing in 1901, he warned that the nation's vast forest reserves were already sadly wasted and threatened at their margins. Shrinking Bears Ears and Grand Staircase-Escalante reverses exactly the impulse Muir fought for, trading protection for extraction. Where Muir saw reserves as a public trust, the new proclamations treat them as inventory to be released. His century-old warning reads as a direct rebuke to the 2026 rollback.",
        "excerpt": "The forty million acres of these reserves are in the main unspoiled as yet, though sadly wasted and threatened on their more open margins by the axe and fire of the lumberman and prospector.",
        "source": "John Muir, Our National Parks. Project Gutenberg (Our National Parks, 1901)",
        "href": "https://www.gutenberg.org/files/60929/60929-h/60929-h.htm"
      },
      {
        "category": "literary",
        "title": "John Clare watched the open moors and commons of his English childhood fenced off by the Enclosure Acts and mourned the loss in The Mores. His lines grieve how enclosure trampled on labour's rights and turned free pasture into private parcels. The 90% cut to Utah's monuments is a modern enclosure, converting shared wilderness into ground opened for private mining and grazing claims. Clare's fences meeting fences in owners' little bounds foreshadow the boundary lines now redrawn across the desert. His elegy for a vanished commons speaks directly to the acres being enclosed again.",
        "excerpt": "Inclosure came and trampled on the grave\nOf labour's rights and left the poor a slave\nAnd memory's pride ere want to wealth did bow\nIs both the shadow and the substance now\n... Fence now meets fence in owners' little bounds\nOf field and meadow large as garden grounds\nIn little parcels little minds to please\nWith men and flocks imprisoned ill at ease",
        "source": "Three Acres and a Cow (John Clare, The Mores)",
        "href": "https://threeacresandacow.co.uk/2014/07/the-mores-by-john-clare/"
      },
      {
        "category": "literary",
        "title": "In Walking, Henry David Thoreau distilled the American case for wildness into a single creed, that in wildness lies the preservation of the world. He treated untamed land not as raw material but as the source of the nation's vitality and freedom. Reopening three million acres to mining and energy inverts that creed, valuing the land only for what can be taken from it. Bears Ears, sacred to tribal nations and prized by conservationists, is precisely the wildness Thoreau meant. His words frame the monument cuts as the loss of something the country cannot manufacture again.",
        "excerpt": "The West of which I speak is but another name for the Wild; and what I have been preparing to say is, that in Wildness is the preservation of the World. Every tree sends its fibers forth in search of the Wild.",
        "source": "Henry David Thoreau, Walking. Project Gutenberg (Walking)",
        "href": "https://www.gutenberg.org/files/1022/1022-h/1022-h.htm"
      },
      {
        "category": "artistic",
        "title": "Thomas Moran's monumental paintings of the American West helped persuade Congress to protect Yellowstone as the first national park in 1872. His Grand Canyon of the Yellowstone rendered the wilderness as something sacred and worth preserving, helping shape the very idea of public land the monuments embody. The 2026 proclamations undo that legacy, treating the red-rock West as territory to be mined rather than beheld. Moran's canvas argued that some landscapes are worth more intact than exploited. Set against the shrinking of Bears Ears, the painting becomes an image of what is being surrendered.",
        "excerpt": "A towering canvas of the Yellowstone's plunging gorge: sunlit cliffs banded in gold, ochre and rose fall away toward a distant thread of waterfall, while storm light breaks over the rim. The wilderness is painted as a cathedral, vast and untouched, its scale dwarfing the two tiny human figures at the edge. It is a landscape rendered explicitly as something to revere and protect, not to strip.",
        "source": "Thomas Moran, The Grand Canyon of the Yellowstone. Wikimedia Commons (public domain, Thomas Moran)",
        "href": "https://commons.wikimedia.org/wiki/File:Thomas_Moran_-_Grand_Canyon_of_the_Yellowstone_-_Smithsonian.jpg",
        "image": {
          "src": "/covers/trump-shrinks-utah-monuments--a5.png",
          "alt": "A towering canvas of the Yellowstone's plunging gorge: sunlit cliffs banded in gold, ochre and rose fall away toward a distant thread of waterfall, while storm light breaks over the rim.",
          "credit": "Thomas Moran, The Grand Canyon of the Yellowstone. Wikimedia Commons (public domain, Thomas Moran)"
        }
      },
      {
        "category": "artistic",
        "title": "Antonin Dvorak composed his New World Symphony in 1893 after immersing himself in American melodies, including those he associated with Native and African American song. Its sweeping Largo evokes the vast open spaces of the continent and a reverence for the land and its first peoples. The shrinking of Bears Ears, a landscape sacred to tribal nations, strikes at exactly the heritage Dvorak tried to honor in sound. The symphony's grandeur stands against the reduction of that wilderness to extractable acreage. It sounds like the memory of a commons the proclamations would enclose.",
        "excerpt": "The famous Largo opens with solemn brass chords that dissolve into a plaintive English-horn melody, a wide, aching theme that seems to survey an immense and lonely landscape. Strings swell and recede like wind moving over open country, evoking distance, memory and loss. The whole movement reads as an elegy for a vast land and the peoples bound to it.",
        "source": "Antonin Dvorak, Symphony No. 9 in E minor, 'From the New World', Op. 95. IMSLP (public domain score)",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.95_(Dvo%C5%99%C3%A1k,_Anton%C3%ADn)"
      }
    ],
    "rank": 29
  },
  {
    "slug": "uk-switzerland-services-trade-deal",
    "headline": "Britain and Switzerland sign a services trade deal that scraps roaming charges and opens Swiss e-gates to UK travelers",
    "overview": "The United Kingdom and Switzerland signed what London called its most significant services trade agreement ever, a deal the government estimates could add about 5.2 billion pounds a year to UK services exports in the long run. The pact commits both countries to scrap mobile roaming charges and will let British travelers use Swiss airport e-gates from later this year, starting with Zurich. It also puts a services-mobility arrangement on a permanent footing, allowing professionals to work for up to 90 days without a permit.",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c621p9yjz1zo"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/13/uk-switzerland-free-trade-deal-brexit.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/uk-switzerland-services-trade-deal.png",
      "alt": "A view of a Swiss flag on a boat on Lake Lucerne and Lucerne city in central Switzerland",
      "credit": "BBC News"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before the European Union, the towns of the Hanseatic League bound themselves together to protect merchants, secure safe passage, and let goods and people move freely across borders. Britain and Switzerland's services pact echoes that medieval instinct: prosperity grows when nations pool trust rather than wall themselves off. Scrapping roaming charges and opening e-gates is a modern version of the League clearing the highroads for its traders. Both are agreements that treat open exchange as a shared civic project. The scale differs, but the logic of mutual advantage is the same.",
        "excerpt": "Peace and security of property, being the very corner-stones of commerce, did the merchant seek above all to secure, and since nothing in this life can be obtained without a struggle, these cities had to fight hard, not only with moral force, but often with the sword, in order to extort from their rulers these elementary rights of civilization.",
        "source": "The Hanseatic League.",
        "href": "https://www.gutenberg.org/cache/epub/39664/pg39664.txt"
      },
      {
        "category": "historical",
        "title": "Richard Cobden built his life around a single conviction: that free trade dissolves the suspicions that set nations against one another. The UK-Switzerland agreement is a small, contemporary vindication of his creed, replacing frictions at the phone bill and the passport gate with easier commerce in services. Where Cobden fought tariffs on corn, today's negotiators target roaming surcharges and border queues. The barriers are humbler, but the aim is the one he named. Every removed obstacle, he argued, knits two peoples a little closer.",
        "excerpt": "Free Trade! What is it? Why, breaking down the barriers that separate nations; those barriers, behind which nestle the feelings of pride, revenge, hatred, and jealousy, which every now and then burst their bounds, and deluge whole countries with blood.",
        "source": "Richard Cobden and the free-trade movement.",
        "href": "https://archive.org/details/speechesonquesti01cobduoft"
      },
      {
        "category": "literary",
        "title": "Walt Whitman heard in the railways and cables of his age a sacred purpose: to weld the world's distant lands together. A services treaty that lets a Briton stride through a Zurich e-gate and use her phone without penalty is exactly the kind of stitching he celebrated. The instruments are prosaic, but the effect is Whitmanian, the distant brought near. Britain and Switzerland are, in his phrase, being connected by network. It is romance dressed as regulation.",
        "excerpt": "Passage to India!\nLo, soul, seest thou not God's purpose from the first?\nThe earth to be spann'd, connected by network,\nThe races, neighbors, to marry and be given in marriage,\nThe oceans to be cross'd, the distant brought near,\nThe lands to be welded together.",
        "source": "Walt Whitman, \"Passage to India\".",
        "href": "https://www.gutenberg.org/files/1322/1322-0.txt"
      },
      {
        "category": "literary",
        "title": "In 'Locksley Hall' Tennyson dreamed of skies crowded with peaceful commerce and a coming 'Federation of the world.' The UK-Switzerland deal is a modest brick in that visionary wall, choosing trade and mobility over friction and distance. His argosies of magic sails have become airliners cleared through automated gates and data flowing without surcharge. The poem's faith that exchange breeds peace underwrites every such treaty. Two nations lowering their barriers is the Parliament of man in miniature.",
        "excerpt": "Saw the heavens fill with commerce, argosies of magic sails,\nPilots of the purple twilight, dropping down with costly bales;\n...\nTill the war-drum throbbed no longer, and the battle-flags were furl'd\nIn the Parliament of man, the Federation of the world.",
        "source": "Alfred, Lord Tennyson, \"Locksley Hall\".",
        "href": "https://www.gutenberg.org/cache/epub/8601/pg8601.txt"
      },
      {
        "category": "artistic",
        "title": "Canaletto painted the Thames thick with the masts and merchantmen that made Georgian London a hub of the world's trade. His luminous port is a portrait of what open commerce looks like when it flourishes: ships, cargo, and people in constant, prosperous motion. The UK-Switzerland services deal seeks the same vitality by other means, unclogging the modern channels of travel and communication. Where Canaletto had river traffic, today's equivalent is the frictionless airport gate and the borderless phone signal. Both depict prosperity as movement made easy.",
        "excerpt": "A wide, sunlit view of the River Thames crowded with sailing vessels and barges, their masts rising like a forest before the distant dome of St Paul's and the spires of the City. Boatmen and merchants throng the water in the foreground while gilded light glints off the rippling surface. The whole canvas hums with the traffic of a great trading port at the height of its commercial confidence.",
        "source": "Canaletto, \"London: The Thames from Somerset House Terrace towards the City\" (c. 1750-51)",
        "href": "https://commons.wikimedia.org/wiki/File:Canaletto_-_London-_The_Thames_from_Somerset_House_Terrace_towards_the_City_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/uk-switzerland-services-trade-deal--a5.png",
          "alt": "A wide, sunlit view of the River Thames crowded with sailing vessels and barges, their masts rising like a forest before the distant dome of St Paul's and the spires of the City.",
          "credit": "Canaletto, \"London: The Thames from Somerset House Terrace towards the City\" (c. 1750-51) Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mendelssohn's concert overture 'Calm Sea and Prosperous Voyage' traces a ship stilled in dead calm, then carried home on rising, favorable winds. It is a musical parable of exactly what a trade agreement promises: the removal of what becalms exchange, followed by a swift and prosperous passage. The UK-Switzerland deal aims to turn the traveller's and exporter's dead calm, the queue and the surcharge, into open water. As the music swells into its bright, arriving finale, it sounds like commerce reaching port. Mutual prosperity, scored for orchestra.",
        "excerpt": "The overture opens in an eerie, motionless hush, strings suspended over a windless sea, before a solo flute signals a freshening breeze. The orchestra gradually gathers momentum until it surges forward on full, glittering sail. It closes with fanfares of safe and joyful arrival in port.",
        "source": "Felix Mendelssohn, \"Calm Sea and Prosperous Voyage\" (Meeresstille und glückliche Fahrt), Op. 27.",
        "href": "https://imslp.org/wiki/Meeresstille_und_gl%C3%BCckliche_Fahrt,_Op.27_(Mendelssohn,_Felix)"
      }
    ],
    "rank": 30
  },
  {
    "slug": "erythrulose-interstellar-sugar",
    "headline": "Astronomers report the first detection of a true sugar, erythrulose, in interstellar space",
    "overview": "An international team led by researcher Izaskun Jimenez-Serra said it had detected erythrulose, a four-carbon sugar, in a molecular cloud near the center of the Milky Way, the first time a true sugar has been identified in interstellar space. Using ultrasensitive radio surveys from the Yebes and IRAM telescopes, the astronomers found the molecule in the cloud G+0.693-0.027, alongside simpler compounds thought to be its chemical precursors. The finding, published in Nature Astronomy, strengthens the idea that the molecular building blocks tied to life can form in space before planets do.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNblN0Q0NkUlI5Sm5abFJvaVRZN3B0OXpLY0dkQWg0Nllna3JlRUQ4S3hqRGJ1dGZWeTQ2WHBuSTF5b2o2UU9iLVc5cWdSLThUVWlJZ2lMZU9aVVAzQjNsTjE5YzJyQ3pfM2tuT1A2VWZDanYtdEc1YVlYMU9DekVyVzYzOXE5bVprUkFLU1RfWU9xZkJQcDVidGFhRjZuQQ?oc=5"
      },
      {
        "name": "Scientific American",
        "href": "https://www.scientificamerican.com/article/scientists-spot-sugar-in-interstellar-space-for-the-first-time-ever/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/erythrulose-interstellar-sugar.png",
      "alt": "Composite image of the center of the Milky Way galaxy, glowing with clouds of gas and dust, where the erythrulose-bearing molecular cloud G+0.693-0.027 lies",
      "credit": "NASA, ESA, JPL-Caltech, CXC and STScI (public domain) via Wikimedia Commons"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Two thousand years before radio telescopes, Lucretius argued that everything we see is built from invisible \"seeds of things\" drifting and combining in an endless void. The detection of erythrulose in a cloud near the galactic center is almost a literal fulfillment of that intuition: a molecular seed of life's chemistry found scattered through interstellar space. Where Lucretius reasoned from pure philosophy that the cosmos is chemically fertile, astronomers now read that same fertility directly in the spectrum of a distant cloud. Ancient atomism imagined the building blocks; modern spectroscopy has begun to catch them in the act.",
        "excerpt": "This ultimate stock we have devised to name\nProcreant atoms, matter, seeds of things,\nOr primal bodies, as primal to the world.",
        "source": "Lucretius, De Rerum Natura (On the Nature of Things), Book I, trans. William Ellery Leonard.",
        "href": "https://www.gutenberg.org/files/785/785-h/785-h.htm"
      },
      {
        "category": "historical",
        "title": "In the 1800s the spectroscope revealed that the stars and nebulae are built from the very same chemical elements found on Earth, and Agnes Clerke chronicled how the heavens became \"celestial laboratories\" open to chemical study. Finding erythrulose — a sugar also present in raspberries and kiwis — in a molecular cloud is the direct heir of that revolution. The same trick of reading light for chemical fingerprints has advanced from identifying elements to identifying an actual sugar in space. What began as proof that the cosmos shares our elements now suggests it can also share our biochemistry.",
        "excerpt": "The sun, stars, and nebulæ form so many celestial laboratories, where the nature and mutual relations of the chemical 'elements' may be tried by more stringent tests than sublunary conditions afford.",
        "source": "Agnes M. Clerke, A Popular History of Astronomy During the Nineteenth Century.",
        "href": "https://www.gutenberg.org/files/28247/28247-h/28247-h.htm"
      },
      {
        "category": "literary",
        "title": "Whitman's speaker sits through an astronomer's lecture of \"proofs, the figures... charts and diagrams\" until, tired of the arithmetic, he wanders out to look up in silence at the stars. The erythrulose discovery lives entirely in that world of columns and measured spectral lines — a molecule confirmed by data, not by eye. Yet what those figures point to is precisely Whitman's wonder: the mystical night sky now revealed to hold the sweet ingredients of life itself. The poem holds both truths at once — the measuring and the marveling — just as this discovery does.",
        "excerpt": "When I heard the learn'd astronomer,\nWhen the proofs, the figures, were ranged in columns before me,\nWhen I was shown the charts and diagrams, to add, divide, and measure them,\nWhen I sitting heard the astronomer where he lectured with much applause in the lecture-room,\nHow soon unaccountable I became tired and sick,\nTill rising and gliding out I wander'd off by myself,\nIn the mystical moist night-air, and from time to time,\nLook'd up in perfect silence at the stars.",
        "source": "Walt Whitman, \"When I Heard the Learn'd Astronomer,\" Leaves of Grass.",
        "href": "https://en.wikisource.org/wiki/When_I_Heard_the_Learn%27d_Astronomer"
      },
      {
        "category": "literary",
        "title": "Dante ends his ascent through the spheres by glimpsing the single \"Love which moves the sun and the other stars\" — one ordering principle binding the whole cosmos to the smallest human longing. Detecting a sugar woven into a cloud near the galaxy's heart echoes that vision of a universe unified from the very large to the very small. The molecule of life turns out to be present in the machinery of the stars themselves, as if chemistry and cosmos were parts of one design. Dante reached this by mystical vision; astronomers now trace a faint version of the same connection in a radio spectrum.",
        "excerpt": "Here vigour failed the lofty fantasy:\nBut now was turning my desire and will,\nEven as a wheel that equally is moved,\nThe Love which moves the sun and the other stars.",
        "source": "Dante Alighieri, Paradiso, Canto XXXIII (closing lines), trans. Henry Wadsworth Longfellow.",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_33"
      },
      {
        "category": "artistic",
        "title": "Van Gogh's swirling night sky turns the heavens into a living, churning field of light and motion, the stars ringed with halos of energy above a quiet town. It captures exactly the intuition behind this discovery: that the cosmos is not cold and inert but restless and generative, a place where things are made. The erythrulose finding gives that romantic vision a chemical basis — the turbulent clouds really are cauldrons brewing the molecules of life. Where Van Gogh painted the sky's fertility as feeling, spectroscopy now measures it as fact.",
        "excerpt": "A small dark village sleeps beneath a sky that will not hold still: enormous stars pulse inside glowing halos, a luminous crescent moon burns at the edge, and a great river of blue and white swirls across the night like a visible current of energy. A dark cypress reaches upward, joining earth to a heaven that seems alive with churning, creative force.",
        "source": "Vincent van Gogh, The Starry Night (1889), Museum of Modern Art; public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/erythrulose-interstellar-sugar--a5.png",
          "alt": "Vincent van Gogh's The Starry Night: a swirling, luminous night sky with pulsing stars and a crescent moon over a sleeping village",
          "credit": "Vincent van Gogh, The Starry Night (1889), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Haydn's oratorio opens with a shadowy \"Representation of Chaos\" and then erupts into a blaze of sound at the words \"and there was Light,\" dramatizing raw matter resolving into an ordered, living world. The erythrulose discovery is a scientific verse of that same creation story — the disordered chemistry of a molecular cloud quietly assembling the sweet building blocks from which life can be built. Both works locate the origin of life not in a single miraculous instant but in the slow patient organizing of the cosmos. Haydn heard creation as music; astronomers now read one of its early chords in a sugar's spectral signature.",
        "excerpt": "Emerging from a hushed, groping orchestral fog that refuses to settle on any key, the oratorio gathers tension until the chorus breaks into a sudden, overwhelming C-major flood of sound on the word \"Light\" — the musical image of chaos giving way to a created, ordered universe. From there the score unfolds the shaping of heavens, seas, and living things as a rising hymn of cosmic fertility.",
        "source": "Joseph Haydn, Die Schöpfung (The Creation), Hob. XXI:2, full score via IMSLP.",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)"
      }
    ],
    "rank": 31
  },
  {
    "slug": "fed-waller-rate-hike-warning",
    "headline": "Fed governor Christopher Waller says a rate hike may be needed if core inflation stays hot",
    "overview": "Federal Reserve Governor Christopher Waller said the central bank may need to tighten monetary policy in the near term if inflation data due this week come in hot again, calling policy at a 'crossroads.' Waller noted that core inflation had climbed from 3% in December to 3.4% by May and warned that price pressures appeared to be broadening through the economy. He cautioned that the Fed should not overreact, saying 'the desire to avoid past mistakes is often the author of new ones,' but signaled he would lean heavily on the coming consumer-price report.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNaW0tUldZeEtOTXVXNFlST05jYjZUMzcxcVZQNl9MVXh3ZXltWVVUcUlMelA2OENsVmdtSDNqTUVBSTBNdEVpbzg3Q1E2N28wMVBlYlZCVS1SYU5XUkVuMUdtUzUwcEJrWmRDYVp2ajg3cHdXMnpHbHhfSHc4Z2VaNmpVZUNrLTFKY2hBdmFwNWt3b2xJdzdRYzFpbUMxSERsdmtTZQ?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/13/waller-says-fed-shouldnt-fight-the-last-war-on-inflation-but-warns-hikes-still-possible.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/fed-waller-rate-hike-warning.png",
      "alt": "Official Federal Reserve portrait of Governor Christopher J. Waller.",
      "credit": "Federal Reserve Board (public domain, U.S. federal government work) via Wikimedia Commons"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 301 CE the emperor Diocletian, facing a debased coinage and prices spiraling out of control, issued his Edict on Maximum Prices to cap what merchants could charge. Its preamble rails against unrestrained greed as an evil the state must fence in with law, exactly the language of stewardship Waller now invokes at the Fed's \"crossroads.\" Where Diocletian tried to choke off runaway prices by decree, the modern central bank reaches instead for interest rates, warning it may have to tighten if core inflation stays hot. Both are attempts to impose discipline on money that has lost its footing. And both wrestle with the same fear: that rising prices punish ordinary people the state is meant to protect.",
        "excerpt": "When some expensiveness should arise (the gods forbid it!) the greed that could not be restrained, as if it ranged in fields spread over some limitless expanse, will be choked off by the limits of our statute and the boundaries of a moderating law.",
        "source": "Diocletian, Edict on Maximum Prices (preamble). Judaism and Rome (translation of Diocletian's Price Edict preamble, AE 1890, 66)",
        "href": "https://www.judaism-and-rome.org/preamble-diocletian%E2%80%99s-%E2%80%98edict-maximum-prices%E2%80%99-ae-1890-66"
      },
      {
        "category": "historical",
        "title": "Writing amid the inflationary chaos that followed the First World War, Keynes warned that debauching the currency was the surest way to unsettle the foundations of society. He described how continuing inflation lets governments quietly confiscate the wealth of their citizens, enriching some and impoverishing many at random. That is precisely the harm Waller cites when he stresses the cost of hot inflation to ordinary people and the discipline needed to tame it. Keynes framed sound money as a matter of social trust, not mere arithmetic. His century-old warning is the intellectual backdrop to a Fed governor threatening to hike rather than let prices run.",
        "excerpt": "Lenin is said to have declared that the best way to destroy the Capitalist System was to debauch the currency. By a continuing process of inflation, governments can confiscate, secretly and unobserved, an important part of the wealth of their citizens. By this method they not only confiscate, but they confiscate arbitrarily; and, while the process impoverishes many, it actually enriches some.",
        "source": "John Maynard Keynes, The Economic Consequences of the Peace. Project Gutenberg (The Economic Consequences of the Peace, 1919)",
        "href": "https://www.gutenberg.org/cache/epub/15776/pg15776.txt"
      },
      {
        "category": "literary",
        "title": "In the second part of Goethe's Faust, Mephistopheles rescues a bankrupt emperor by conjuring paper money, notes backed only by treasure still buried and unmined in the ground. The court rejoices as the printed slips flood the realm, a fable of currency created out of nothing that Goethe meant as a warning about debasement. Waller's caution stands on the opposite bank of that river: the central banker who fears exactly the illusion of easy money and may raise rates to defend the currency's worth. The scene dramatizes how quickly confidence in money can be manufactured, and how fragile it is. It is the temptation Waller warns the Fed must resist.",
        "excerpt": "To all to whom this cometh, be it known: / A thousand crowns in worth this note doth own. / It to secure, as certain pledge, shall stand / All buried treasure in the Emperor's land: / And 'tis decreed, perfecting thus the scheme, / The treasure, soon as raised, shall this redeem.",
        "source": "Goethe, Faust, Part Two (Act I, the paper-money scene). Internet Archive (Faust: The Second Part, tr. Bayard Taylor, 1871)",
        "href": "https://archive.org/download/goethetaylorfaust02/goethetaylorfaust02_djvu.txt"
      },
      {
        "category": "literary",
        "title": "In The Frogs, Aristophanes likens Athens' treatment of its citizens to its coinage, lamenting that the city hoards its pure, full-weight silver and circulates cheap debased tokens instead. It is one of the oldest literary statements of what economists later called Gresham's law, that bad money drives out good. The image speaks directly to Waller's worry about hot inflation eroding the value of the dollar people hold. Where Aristophanes mourned sterling coin driven from use by base metal, the Fed governor warns against letting sound money slide into something worth less. The comedy's ancient complaint about debasement is the same anxiety that now argues for tightening.",
        "excerpt": "Often has it crossed my fancy, that the city loves to deal / With the very best and noblest members of her commonweal, / Just as with our ancient coinage, and the newly-minted gold. / Yea for these, our sterling pieces, all of pure Athenian mould, / All of perfect die and metal, all the fairest of the fair ... / These we use not: but the worthless pinchbeck coins of yesterday, / Vilest die and basest metal, now we always use instead.",
        "source": "Aristophanes, The Frogs (parabasis). Project Gutenberg (The Frogs, tr. B. B. Rogers)",
        "href": "https://www.gutenberg.org/cache/epub/7998/pg7998.txt"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys painted a Flemish moneylender weighing gold coins on a delicate balance while his wife, a devotional book open before her, is drawn from prayer to the glinting metal. The painting is a meditation on the pull between material value and moral judgment, on the honest weighing of money as both a literal and ethical act. Waller's warning about defending the currency's worth is a modern version of that scale: the steward who must weigh prudence against panic. The careful balance in the moneylender's hands mirrors a central bank calibrating whether the moment calls for restraint. It is an image of value measured with painstaking, almost sacred, exactness.",
        "excerpt": "A moneychanger sits at his table delicately balancing gold coins on a small scale, every glint of metal rendered with jeweler's precision. Beside him his wife turns the page of an illuminated prayer book, yet her eyes drift toward the shining money and the scale's fragile equilibrium. A convex mirror in the foreground reflects a distant window, quietly asking the viewer to weigh worldly wealth against the spiritual.",
        "source": "Quentin Matsys, The Moneylender and His Wife (1514). Wikimedia Commons (public domain, Quentin Matsys, 1514)",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/fed-waller-rate-hike-warning--a5.png",
          "alt": "A moneychanger sits at his table delicately balancing gold coins on a small scale, every glint of metal rendered with jeweler's precision.",
          "credit": "Quentin Matsys, The Moneylender and His Wife (1514). Wikimedia Commons (public domain, Quentin Matsys, 1514)"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Das Rheingold opens with pure gold resting untouched beneath the Rhine, until the dwarf Alberich renounces love to seize it and forge a ring of limitless power. The opera turns on the corruption that follows once gold is torn from its natural order and hoarded for domination, a myth of value debased by greed. It resonates with the themes behind Waller's warning: the discipline of hard money, and the ruin that follows when its integrity is abandoned. Where Wagner's gods and dwarves grasp for a cursed treasure, the central banker frames sound money as a trust that must be guarded against overreach. The score sounds the ancient dread of what happens when the measure of wealth is defiled.",
        "excerpt": "From the river's shimmering depths the orchestra builds a single swelling E-flat chord, as if watching sunlight strike the untouched Rhinegold. The Rhinemaidens' voices ripple over the water in innocent play, until Alberich's harsh motif intrudes and the music darkens with the theft and the curse to come. The gold's radiant leitmotif and the grinding menace that overtakes it dramatize, in sound, the corruption of pure value into instrument of power.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1869). IMSLP (public domain score, Das Rheingold)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      }
    ],
    "rank": 32
  },
  {
    "slug": "ecuador-fito-brother-killed",
    "headline": "Gunmen disguised as police kill David Macias, brother of extradited Ecuadorean drug lord 'Fito,' on the Pacific coast",
    "overview": "David Macias, 35, a regional leader of Ecuador's Los Choneros gang and brother of its jailed former boss Adolfo 'Fito' Macias, was shot dead by men dressed as police officers who forced their way into his rented home in the coastal town of Olon. The killing, in the early hours of Sunday, was the latest blow to Los Choneros after the extradition of Fito to the United States last year and the arrest of another brother in Colombia last month. The gunmen fled and no arrests have been announced.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c20yx84g103o"
      },
      {
        "name": "The Star",
        "href": "https://www.the-star.co.ke/news/world/2026-07-13-men-disguised-as-cops-kill-ecuadorean-drug-lords-brother"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/ecuador-fito-brother-killed.png",
      "alt": "Adolfo Macias, alias 'Fito', former leader of Ecuador's Los Choneros gang and brother of the slain David Macias.",
      "credit": "EPA via BBC News"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Second Triumvirate posted its proscription lists, a man's blood relations became a death sentence in themselves. Marcus Cicero and his brother Quintus fled together, marked purely for who they were, before parting on the road that would kill them both. Quintus was betrayed by his own household and cut down beside his son, just as David Macias was hunted for the name he shared with 'Fito'. The oldest lesson of the proscription is the one Olon has just relearned: when a dynasty falls, the killers come next for the kin.",
        "excerpt": "They were conveyed in litters, being worn out by grief; and halting by the way and placing their litters side by side they lamented to one another. ... embracing one another with tears they separated. Now Quintus, not many days after, was betrayed by his slaves to those who were in search of him and put to death with his son.",
        "source": "The Roman proscriptions and the death of Cicero's brother Quintus (Plutarch, Life of Cicero, trans. George Long). Project Gutenberg — Plutarch's Lives, Volume 4.",
        "href": "https://www.gutenberg.org/cache/epub/44315/pg44315.txt"
      },
      {
        "category": "historical",
        "title": "In a Chicago garage the men who wiped out Bugs Moran's crew wore police uniforms and flashed badges, so that murder looked to a neighbour like a routine arrest. The disguise let the killers control the room before a single shot was fired, exactly as men dressed as officers walked into David Macias' home on the Pacific coast. Both scenes belong to a war between rival syndicates for control of a lucrative trade. And both show the same treachery: the uniform of the law turned into the costume of the assassin.",
        "excerpt": "\"Two men in uniforms had rifles or shotguns as they came out the door,\" she said, \"and there were two or three men walking ahead of them with their hands in the air. It looked as though the police were making an arrest, and they all got into an automobile and drove away.\"",
        "source": "The St. Valentine's Day Massacre, Chicago, 14 February 1929 (contemporary eyewitness account, Chicago Tribune, 15 February 1929). Chicagology — The St. Valentine's Day Massacre.",
        "href": "https://chicagology.com/notorious-chicago/stvalentinesmassacre/"
      },
      {
        "category": "literary",
        "title": "Aeschylus built his trilogy on the idea that a house steeped in blood cannot stop the bleeding, because each killing summons the next avenger. 'The slayer of to-day shall die to-morrow' is a precise account of a gang feud that has already taken one Macias brother to a U.S. jail and another to a grave. The Choneros and their rivals are the children of a curse none of them can escape. Their coastal mansions are only the modern halls of high estate on which the clinging grasp of fate closes.",
        "excerpt": "Lo! sin by sin and sorrow dogg'd by sorrow—\nAnd who the end can know?\nThe slayer of to-day shall die to-morrow—\nThe wage of wrong is woe.\n...\nOn him that wrought shall vengeance be outpoured—\nThe tides of doom return.\nThe children of the curse abide within\nThese halls of high estate—\nAnd none can wrench from off the home of sin\nThe clinging grasp of fate.",
        "source": "Aeschylus, Agamemnon (from The House of Atreus, trans. E. D. A. Morshead). Project Gutenberg — The House of Atreus.",
        "href": "https://www.gutenberg.org/cache/epub/8604/pg8604.txt"
      },
      {
        "category": "literary",
        "title": "Unable to reach Macduff himself, Macbeth sends hired killers to force their way into his home and slaughter the family he left behind. The murderers burst in on the wife and children and put them to the sword in their own rooms, punishing them for a bond of blood rather than any deed. It is the same logic that sent gunmen into a rented house in Olon to kill 'Fito's' brother while the boss sat in a cell abroad. Shakespeare knew that when tyrants and warlords cannot strike the man, they strike his kin at the hearth.",
        "excerpt": "FIRST MURDERER. He's a traitor.\nSON. Thou liest, thou shag-ear'd villain!\nFIRST MURDERER. What, you egg! [Stabbing him.] Young fry of treachery!\nSON. He has kill'd me, mother: Run away, I pray you!",
        "source": "William Shakespeare, Macbeth, Act IV, Scene ii (the murderers sent to Macduff's castle). Project Gutenberg — Macbeth.",
        "href": "https://www.gutenberg.org/cache/epub/1533/pg1533.txt"
      },
      {
        "category": "artistic",
        "title": "David painted a leader killed at home by a visitor who gained entry under false pretences, exactly the treachery that let disguised gunmen through David Macias' door. Corday used a petitioner's letter as her disguise the way the Olon assassins used police uniforms. The scene is quiet, intimate and domestic, the violence delivered in the one place a man believes he is safe. It is the visual grammar of the ambush that consumes those who live by the knife or the gun.",
        "excerpt": "The revolutionary Jean-Paul Marat slumps dead in his bath, quill still in one hand and the assassin's letter of introduction in the other, the water darkened with blood. Charlotte Corday had won entry to his private room by pretending to bring information, then struck once he was disarmed by trust. David turns a political murder in a domestic setting into a still, almost sacred image of betrayal.",
        "source": "Jacques-Louis David, The Death of Marat (1793). Wikimedia Commons — Death of Marat by David.",
        "href": "https://commons.wikimedia.org/wiki/File:Death_of_Marat_by_David.jpg",
        "image": {
          "src": "/covers/ecuador-fito-brother-killed--a5.png",
          "alt": "The revolutionary Jean-Paul Marat slumps dead in his bath, quill still in one hand and the assassin's letter of introduction in the other, the water darkened with blood.",
          "credit": "Jacques-Louis David, The Death of Marat (1793). Wikimedia Commons — Death of Marat by David."
        }
      },
      {
        "category": "artistic",
        "title": "Il trovatore is opera's great study of a vendetta that binds brother to brother in death without either fully knowing it. Azucena's hunger for revenge sets in motion a cycle that ends only when the Count destroys the sibling he was fated to destroy. That is the machinery now grinding through the Macias family, where one brother's power dooms the others one by one. Verdi scores in music what the Choneros war spells in blood: those who live by vengeance are consumed by it.",
        "excerpt": "Verdi's opera drives toward a fatal secret: the vengeful Count di Luna sends his rival Manrico to the executioner's block, only to be told by the gypsy Azucena that the man he has just killed was his own brother. A mother's cry for vengeance echoes across a generation until it closes, as a blood feud must, on kin destroying kin. The final chords land as the Count realises the revenge he engineered has devoured his own blood.",
        "source": "Giuseppe Verdi, Il trovatore (1853). IMSLP — Il trovatore (Verdi, Giuseppe)",
        "href": "https://imslp.org/wiki/Il_trovatore_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 33
  },
  {
    "slug": "ice-agent-kills-colombian-maine",
    "headline": "A Colombian national is killed by a U.S. immigration agent during an operation in Maine",
    "overview": "A Colombian man was shot and killed by an Immigration and Customs Enforcement officer during an operation in Maine, the agency said, adding that the officer had been 'fearing for public safety.' The death came less than a week after an undocumented migrant was fatally shot by an immigration agent in Houston, intensifying scrutiny of the use of force in the Trump administration's stepped-up deportation campaign. Local officials and immigrant-rights groups demanded an independent investigation.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c2ly580kxnko"
      },
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxPMkctXzZKbXA0N0pNVGw1Ykt1NjNHMHBCZFluRWE1Q0RMVUZ0cERwOHpZNklyWTZIN0dMc2IzSDdRZC0xMmpnTGRidFFwcldRNkhMNTlxcDFGSlBTV09SZkNzMzJFeWMyV0g2YkNpSGpBR3B1dzJiczFEcGZESG5HNGN6OFZnUEVTam9zZzFUUjhvN3BodzdpNnVB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/ice-agent-kills-colombian-maine.png",
      "alt": "U.S. Immigration and Customs Enforcement (ICE) Enforcement and Removal Operations officers during an enforcement action in Chicago, January 2025",
      "credit": "U.S. Immigration and Customs Enforcement (ICE), public domain (federal government work) via Wikimedia Commons"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In Homer's world the arriving stranger is sacred, placed under the protection of Zeus himself, and the measure of a people is how it receives the shipwrecked wanderer at its shore. Nausicaa answers her frightened maids by insisting the stranger and the poor are heaven-sent guests, not threats to be repelled. The Colombian man killed in Maine stood at exactly that threshold, an outsider arriving among strangers. The ancient duty of xenia asked for shelter and food; the modern encounter answered with a gun.",
        "excerpt": "By Jove the stranger and the poor are sent; / And what to those we give to Jove is lent.",
        "source": "Homer, The Odyssey, Book VI (Alexander Pope translation)",
        "href": "https://www.gutenberg.org/ebooks/3160"
      },
      {
        "category": "historical",
        "title": "When armed agents of the state killed civilians on a Boston street, the young republic did not simply accept the soldiers' account that they had fired in fear. John Adams demanded that passion and politics yield to evidence, that the killing be tried on facts alone. The Maine shooting, with its official claim that the officer feared for public safety against a man who was not even the target of the warrant, raises the same old question of who fired and why. Adams' warning insists that fear cannot be its own acquittal, and that lethal force by authority must answer to the record.",
        "excerpt": "Facts are stubborn things; and whatever may be our wishes, our inclinations, or the dictates of our passions, they cannot alter the state of facts and evidence.",
        "source": "John Adams, defense argument at the Boston Massacre soldiers' trial (1770), in Frederic Kidder, History of the Boston Massacre (1870)",
        "href": "https://archive.org/details/cu31924076622731"
      },
      {
        "category": "literary",
        "title": "Lazarus imagined the nation as a Mother of Exiles lifting a lamp beside a golden door, calling the tired and the poor toward welcome rather than warning. Her sonnet became the country's own account of itself, the promise inscribed on the pedestal that greets arrivals. A Colombian man authorized to work, shot dead during a deportation sweep, marks the distance between that promise and the operation in Maine. The poem reads now as both invitation and indictment, measuring the golden door against the drawn weapon.",
        "excerpt": "Give me your tired, your poor, / Your huddled masses yearning to breathe free, / The wretched refuse of your teeming shore. / Send these, the homeless, tempest-tost to me, / I lift my lamp beside the golden door!",
        "source": "Emma Lazarus, \"The New Colossus\" (1883)",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus"
      },
      {
        "category": "literary",
        "title": "Old and exiled, Oedipus arrives on foreign ground as a wanderer with no standing but his need, begging the natives not to scorn him for being a stranger. His safety hangs entirely on whether the citizens will honor the suppliant or drive him off. The migrant in Maine occupied the same fragile ground, a stranger whose fate turned on the discretion of those with power over him. Sophocles frames the encounter as a test of the community's mercy, and here the test ended in death rather than sanctuary.",
        "excerpt": "Now in God's name, O stranger, scorn me not / As a wayfarer; tell me what I crave.",
        "source": "Sophocles, Oedipus at Colonus (F. Storr translation)",
        "href": "https://www.gutenberg.org/ebooks/31"
      },
      {
        "category": "artistic",
        "title": "Brown painted emigration not as adventure but as raw vulnerability, two people cast onto the water with everything they love at their backs. That mixture of hope and fear is the same freight the Colombian man carried into Maine, the ordinary human gamble of seeking a life across a border. The painting's tight frame closes in on the migrants until their exposure is inescapable. It asks the viewer to see the person before the category, the face before the file.",
        "excerpt": "A young emigrant couple sits huddled at the rail of a departing ship, wrapped against the cold sea spray, the white cliffs of their homeland receding behind them. The woman clasps a baby's hand hidden beneath her cloak while the man stares outward with a set, anxious face, the whole scene ringed by a circular frame that holds them like a locket. It is the migrant's leap into the unknown rendered as tenderness and dread at once, the precise moment a person becomes a stranger bound for another nation.",
        "source": "Ford Madox Brown, \"The Last of England\" (1855)",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/ice-agent-kills-colombian-maine--a5.png",
          "alt": "A young emigrant couple sits huddled at the rail of a departing ship, wrapped against the cold sea spray, the white cliffs of their homeland receding behind them.",
          "credit": "Ford Madox Brown, \"The Last of England\" (1855) Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Dvorak composed his New World symphony as an outsider who found both wonder and loneliness in America, translating the immigrant's divided heart into sound. Its central Largo is the ache of someone far from home, the very condition of the man killed in Maine. The music holds the New World's promise and its melancholy in a single breath. Heard against this event, its longing turns to lament for a life that reached the new land and did not survive it.",
        "excerpt": "Written by a homesick Czech immigrant in America, the symphony aches with the pull between a distant homeland and a strange new land, its famous Largo unfolding as a slow, plaintive melody that sounds like exile set to music. Restless first-movement rhythms surge with the energy and unease of arrival, then dissolve into longing. The whole work is the sound of a stranger listening for home across an ocean.",
        "source": "Antonin Dvorak, Symphony No. 9 in E minor, Op. 95, \"From the New World\" (1893)",
        "href": "https://imslp.org/wiki/Symphony_No.9,_Op.95_(Dvo%C5%99%C3%A1k,_Anton%C3%ADn)"
      }
    ],
    "rank": 34
  },
  {
    "slug": "china-detains-us-seismologist",
    "headline": "China is holding a U.S. seismologist who studied North Korean nuclear tests, facing trial on spying charges",
    "overview": "A Chinese-born American seismologist, Youlin Chen, has been detained in China for nearly two years and faces trial on spying charges, according to a Reuters report, after publishing U.S.-funded research on detecting North Korean nuclear tests. Secretary of State Marco Rubio in March designated Chen, 54, as 'wrongfully detained,' making his release a priority, though Washington had held back a public announcement to allow for quiet diplomacy. The case adds a fresh irritant to a U.S.-China relationship the Trump administration is trying to keep steady after last year's trade war.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxPM2RCTlAtbmVLSG1sQjJCblpURk9nQ2JPWFpoR1dKNWJxQVVZNGpRM1hGSEFKa1VQQy14UnhtcTFOeGswVUhFQXJ3ZWRyekU4NXNzaWhPY2xyN0JoYVg3bnFXTURPSHUyYTZEOUZOWDdIQmZMTVlKV0RHU19qNjRwUDM4NFVZRVp0YnBETnhwWkxKVkpEMHpEY0ZKNEFqdzFQNjlFRE5uMUNyT2hvSXZvc2Q2Q2lIT0l1?oc=5"
      },
      {
        "name": "Yahoo News",
        "href": "https://www.yahoo.com/news/politics/articles/exclusive-china-detains-us-seismologist-194844059.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/china-detains-us-seismologist.png",
      "alt": "A seismogram tracing showing the P-wave and S-wave arrivals of a seismic event, the kind of ground-motion record used to detect and characterize underground nuclear tests.",
      "credit": "Seismogram by Crickett (English Wikipedia), via Wikimedia Commons; released for free use by the copyright holder."
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Boethius was a learned Roman official who, having served the state, found himself accused of conspiracy and condemned to die far from home without a hearing. Like Youlin Chen, he was a man of knowledge suddenly recast as an enemy of the power he had lived under. His complaint that he was punished \"unheard and undefended\" mirrors a secret trial in which the defendant cannot answer the charges. His prison became the place where a scholar's mind was treated as a threat to the regime.",
        "excerpt": "Now for my too great zeal towards the senate I have been condemned to outlawry and death, unheard and undefended, at a distance of near five hundred miles away.",
        "source": "Boethius, \"The Consolation of Philosophy\" (c. 524 AD), written in prison at Pavia while awaiting execution on charges of treasonous conspiracy against Theodoric. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "historical",
        "title": "Galileo was compelled by a tribunal to renounce, under threat, the very research that defined his life's work. His case is the archetype of knowledge itself being prosecuted as a crime against the state's authority. Youlin Chen's published seismic science, funded to detect nuclear tests, has likewise been reframed by a government as espionage. In both, a scientist's data becomes evidence in a trial he never expected to face.",
        "excerpt": "I abjure, curse, and detest the aforesaid errors and heresies, and generally every other error, heresy, and sect whatsoever contrary to the said Holy Church.",
        "source": "Galileo Galilei's forced abjuration before the Roman Inquisition, 22 June 1633, for his scientific findings on the motion of the Earth. Famous Trials (Douglas O. Linder)",
        "href": "https://famous-trials.com/galileotrial/1020-recantation"
      },
      {
        "category": "literary",
        "title": "Byron's prisoner ages and withers not from time but from the slow ruin of captivity. The poem captures how imprisonment erodes the body and spirit of a person held for what he represents to those in power. Reports describe Chen losing thirty to forty pounds and being denied medication across nearly two years in detention. Byron's \"vile repose\" is the same grinding stillness of a cell that consumes a captive far from home.",
        "excerpt": "My hair is grey, but not with years,\nNor grew it white\nIn a single night,\nAs men's have grown from sudden fears:\nMy limbs are bowed, though not with toil,\nBut rusted with a vile repose,\nFor they have been a dungeon's spoil,\nAnd mine has been the fate of those",
        "source": "Lord Byron, \"The Prisoner of Chillon\" (1816), a narrative poem on the long confinement of François Bonivard in a lakeside dungeon. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_4/The_Prisoner_of_Chillon"
      },
      {
        "category": "literary",
        "title": "Socrates stood before the Athenian court accused of corrupting the city, his inquiry and teaching turned into a capital charge. His trial is the enduring image of the individual crushed between his own conscience and the machinery of the state. Youlin Chen, a single scientist, has become a bargaining chip between two great powers who value him more as leverage than as a man. Socrates' words insist that the real injustice lies not in the prisoner's fate but in the wrong done to him.",
        "excerpt": "The difficulty, my friends, is not to avoid death, but to avoid unrighteousness; for that runs faster than death.",
        "source": "Plato, \"Apology\" (the trial and defense of Socrates), Benjamin Jowett translation. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "artistic",
        "title": "David's canvas freezes the instant a scholar accepts punishment rather than surrender his convictions, the state's authority pressing in from the darkness. It renders visible the same collision Youlin Chen embodies: an intellectual held captive because his knowledge unsettles those who govern. The serene captive amid mourning companions evokes a man detained far from a family that can only wait. The painting turns a courtroom verdict into an image of the individual set against the power that would erase him.",
        "excerpt": "David paints Socrates upright on his prison bed, reaching for the cup of hemlock while still lecturing, his finger raised toward the heavens as grief-stricken disciples recoil around him. Light falls sharply on the philosopher's calm, defiant body while his jailer and the shadowed cell close in from the edges. It is the portrait of a thinker condemned by the state yet unbroken, his mind lucid even as power moves to silence him.",
        "source": "Jacques-Louis David, \"The Death of Socrates\" (1787), oil on canvas, The Metropolitan Museum of Art. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:David_-_The_Death_of_Socrates.jpg",
        "image": {
          "src": "/covers/china-detains-us-seismologist--a5.png",
          "alt": "David paints Socrates upright on his prison bed, reaching for the cup of hemlock while still lecturing, his finger raised toward the heavens as grief-stricken disciples recoil around him.",
          "credit": "Jacques-Louis David, \"The Death of Socrates\" (1787), oil on canvas, The Metropolitan Museum of Art. Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Fidelio is the great musical protest against secret, unjust detention, its hero hidden in a dungeon because of what he dared to know. The Prisoners' Chorus gives voice to captives who taste light for a moment before being shut away again, an image of a detainee whose release remains just out of reach. Chen, designated wrongfully detained, is the modern Florestan awaiting rescue through diplomacy rather than a lone heroine. Beethoven's music insists that such prisoners are not forgotten and that their freedom is a moral cause.",
        "excerpt": "In the Prisoners' Chorus, captives are briefly let out into the daylight and sing in hushed wonder of freedom and air, voices swelling and then fearfully falling as the guards return them to darkness. The whole opera turns on Florestan, a man locked away in secret by a powerful enemy for what he knew, and on the devotion that refuses to abandon him. Beethoven makes political imprisonment audible as both a cry against tyranny and a hymn to the loyalty that keeps searching for the disappeared.",
        "source": "Ludwig van Beethoven, \"Fidelio,\" Op. 72 (final version 1814) — the Prisoners' Chorus \"O welche Lust,\" and the opera's story of Leonore rescuing her wrongfully imprisoned husband Florestan. IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 35
  },
  {
    "slug": "judge-trump-irs-lawsuit-improper",
    "headline": "A federal judge finds a Trump IRS lawsuit was filed for an 'improper purpose' and refers a lawyer for possible discipline",
    "overview": "A federal judge ruled that a lawsuit brought by the Trump administration touching the Internal Revenue Service was filed for an 'improper purpose' and referred a government lawyer for possible disciplinary action, a rare rebuke of the administration's use of the courts. The judge found the case misused the judicial process, according to court filings reported by news agencies. The decision adds to a series of clashes between the administration and federal judges over the aggressive legal tactics it has pursued.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxNd25adDEyakJVZHRUVFFOdzJRbE9RYVFRTFRVeExWb2ZydFVsNVJPalhqVmFjaHROckNza2NBd0NVeDlJbHlET1l4ZW5hNXl4U1duOTd3ZGFOVDVTU1lCUm9RQVVOY3ZuZlYzZ3JCUGk1QVg4aTdpZWEzNGpOd0ZoT2xNeUF3WWdhV3dWbjBQazF2Zw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiiwFBVV95cUxNdjhWLThSQkhTLVV3c3o2ZWRyYm1KVjROOWxHWU9KNjg1S2NwYlFzcXhCSE5QeU5BTkIzR3daU1JRWkNkNW1YaHVaNnFneWVaa2hlTjRPREpVTzFHanhXYmRHd0tYNnoxRVJMbjBOUVdaRHVQSXF5UFVJT0FxbjNMOW1pMUFLMW1pQXlz?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/judge-trump-irs-lawsuit-improper.png",
      "alt": "Honore Daumier lithograph from the series 'Les Gens de Justice,' satirizing lawyers and the machinery of a French courtroom.",
      "credit": "Honore Daumier, 'Les Gens de Justice' (c. 1845-1848). Public domain, via Wikimedia Commons."
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Eight centuries before this ruling, Magna Carta bound the crown itself to the principle that justice may not be sold, denied, or delayed for any person. When a federal judge found the administration's IRS suit was filed for an 'improper purpose,' the judge was enforcing that same ancient promise: the machinery of law may not be perverted to serve power. The clause is a vow that right belongs to the governed, not to whoever holds office. The rebuke of a government lawyer echoes the charter's insistence that even the sovereign's servants answer to the law.",
        "excerpt": "To no one will we sell, to no one will we refuse or delay, right or justice.",
        "source": "Magna Carta, clause 40 (1215). The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp"
      },
      {
        "category": "historical",
        "title": "In Marbury v. Madison, Chief Justice Marshall claimed for the courts the authority to say what the law is, cementing the judiciary as a check on the other branches. The judge here exercised precisely that power, declaring that a lawsuit brought by the executive was an abuse of process rather than a legitimate use of it. Marshall's principle is why a single trial judge can tell an administration that its litigation crossed a line. The referral of a lawyer for discipline shows the courts not merely interpreting the law but defending its integrity.",
        "excerpt": "It is emphatically the province and duty of the judicial department to say what the law is. Those who apply the rule to particular cases, must of necessity expound and interpret that rule.",
        "source": "Marbury v. Madison, 5 U.S. 137 (1803), opinion of Chief Justice John Marshall. Legal Information Institute, Cornell Law School.",
        "href": "https://www.law.cornell.edu/supremecourt/text/5/137"
      },
      {
        "category": "literary",
        "title": "In the trial scene of The Merchant of Venice, Portia lets a bad-faith litigant press his claim to its literal edge, then turns the law's own strictness against him. Shylock came to court to weaponize a contract; the bench answers that the very law he invokes forbids what he seeks. So too the federal judge found the administration's IRS suit was a misuse of legal process and turned the court's authority back on the party that abused it. The scene dramatizes the reckoning that awaits those who wield the law in bad faith.",
        "excerpt": "Tarry a little; there is something else.\nThis bond doth give thee here no jot of blood;\nThe words expressly are 'a pound of flesh:'\nTake then thy bond, take thou thy pound of flesh;\nBut, in the cutting it, if thou dost shed\nOne drop of Christian blood, thy lands and goods\nAre, by the laws of Venice, confiscate\nUnto the state of Venice.",
        "source": "William Shakespeare, The Merchant of Venice, Act 4, Scene 1 (Portia). The Complete Works of William Shakespeare (MIT)",
        "href": "https://shakespeare.mit.edu/merchant/merchant.4.1.html"
      },
      {
        "category": "literary",
        "title": "Dickens's Jarndyce and Jarndyce is his indictment of a legal system consumed by process detached from justice. The endless suit shows how courts can be turned into instruments of exhaustion and self-interest rather than truth. The judge's finding of an 'improper purpose' names that same corruption: litigation launched not to resolve a wrong but to serve an ulterior end. The referral of a lawyer for discipline is the check that Dickens's fictional Chancery never received.",
        "excerpt": "Jarndyce and Jarndyce drones on. This scarecrow of a suit has, in course of time, become so complicated that no man alive knows what it means.",
        "source": "Charles Dickens, Bleak House, Chapter 1 ('In Chancery'). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm"
      },
      {
        "category": "artistic",
        "title": "Painted in the 1760s, Gandolfi's figure embodies the impartial power a judge is meant to wield. The scales are the weighing of a lawsuit's true purpose; the sword is the authority to sanction those who abuse the court. In finding the IRS suit improper and referring a lawyer for discipline, the judge acted out this allegory of justice that both measures and enforces. The image is a reminder that judicial power is legitimate only when it stays blind to who stands before it.",
        "excerpt": "Gandolfi personifies Justice as a serene, commanding woman who holds the scales in one hand and the sword in the other, her gaze steady and impartial. The scales weigh each side without favor; the sword stands ready to enforce the verdict. Light falls on her as though truth itself illuminates the judgment.",
        "source": "Gaetano Gandolfi, 'Allegory of Justice' (1760s). Wikimedia Commons (public domain)",
        "href": "https://commons.wikimedia.org/wiki/File:Gandolfi_-_Allegory_of_Justice.jpg",
        "image": {
          "src": "/covers/judge-trump-irs-lawsuit-improper--a5.png",
          "alt": "Gandolfi personifies Justice as a serene, commanding woman who holds the scales in one hand and the sword in the other, her gaze steady and impartial.",
          "credit": "Gaetano Gandolfi, 'Allegory of Justice' (1760s). Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Verdi's setting of the day of judgment captures the gravity of a court calling the powerful to account. The 'improper purpose' ruling is a smaller, earthly version of that reckoning: a moment when misuse of the law is named and answered. The referral of the government lawyer is the judgment falling on a specific actor rather than an abstraction. Verdi reminds us that justice, when it finally speaks, is meant to be felt.",
        "excerpt": "Verdi's 'Dies irae' erupts with hammering chords, thundering bass drum, and a chorus crying out the day of wrath and reckoning. He turns the ancient text on the day of judgment into overwhelming sound, a tribunal from which nothing is hidden and no deed goes unweighed. The music is terror and majesty at once, the moment when accounts come due.",
        "source": "Giuseppe Verdi, Messa da Requiem, 'Dies irae' (1874). IMSLP / Petrucci Music Library (public domain)",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 36
  },
  {
    "slug": "1x-neo-dexterous-robot-hand",
    "headline": "Robotics firm 1X unveils a tendon-driven humanoid hand it says can match or surpass human dexterity",
    "overview": "The robotics company 1X Technologies revealed a new 25-degree-of-freedom, tendon-driven hand for its Neo humanoid robot, saying it was built to 'match or surpass human capability across every dimension that matters.' Featured by design magazine Dezeen, the hand uses fingertip tactile sensors and roughly human-level grip strength to perform fine tasks such as assembling Lego, spinning in a light bulb and plugging in a USB-C cable. The company said it had set up a California production line with capacity for 10,000 units a year and would begin shipping in 2026.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/13/1x-technologies-neo-robot-hand/"
      },
      {
        "name": "Forbes",
        "href": "https://www.forbes.com/sites/johnkoetsier/2026/07/09/human-level-hands-1x-just-gave-humanoid-robot-neo-something-close/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/1x-neo-dexterous-robot-hand.png",
      "alt": "A close-up of 1X Technologies' new tendon-driven Neo humanoid robot hand",
      "credit": "1X Technologies"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly 2,400 years ago Aristotle called the human hand the tool that lets us wield every other tool. 1X's tendon-driven hand is an engineered attempt to reproduce that universal capability in metal and cord. By packing 25 degrees of freedom and fingertip touch into a manipulator meant to grasp almost anything a person can, the company is chasing the oldest definition of what makes the hand special. The dream of copying the tool of tools is now a factory line rated at 10,000 units a year.",
        "excerpt": "It follows that the soul is analogous to the hand; for as the hand is a tool of tools, so the mind is the form of forms and sense the form of sensible things.",
        "source": "Aristotle, On the Soul (De Anima), Book III, ch. 8 (4th century BC). Aristotle, On the Soul (trans. J. A. Smith), MIT Internet Classics Archive.",
        "href": "https://classics.mit.edu/Aristotle/soul.3.iii.html"
      },
      {
        "category": "historical",
        "title": "In 1920 Karel Capek's play gave the world the word robot and its founding anxiety: workers manufactured to labour and nothing else. Capek's engineer strips away everything unnecessary in a person to build the cheapest possible worker, exactly the logic behind a humanoid designed for household and factory tasks. 1X's promise of a hand that can match or surpass human capability, and be mass-produced by the thousand, echoes that assembly line of artificial people. The play's warning about labour replaced by machines hangs over every USB-C port the Neo hand plugs in.",
        "excerpt": "But a working machine must not play the piano, must not feel happy, must not do a whole lot of other things. A gasoline motor must not have tassels or ornaments, Miss Glory. And to manufacture artificial workers is the same thing as the manufacture of a gasoline motor.",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), Act I (1920). Karel Capek, R.U.R. (trans. Paul Selver), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm"
      },
      {
        "category": "literary",
        "title": "Ovid's Pygmalion carves an ivory woman so perfect he falls in love, and when he touches her the ivory turns soft and the veins throb beneath his thumb. The myth turns on touch as the moment lifeless craft crosses into living responsiveness. 1X's fingertips carry tactile sensors that feel pressure and slippage, giving the machine its own version of that responsive thumb. Where a goddess animated Pygmalion's statue, engineers now grant sensation to a hand of tendon and steel.",
        "excerpt": "The pressed ivory becomes soft, and losing its hardness, yields to the fingers, and gives way, just as Hymettian wax grows soft in the sun, and being worked with the fingers is turned into many shapes, and becomes pliable by the very handling. While he is amazed, and is rejoicing, though with apprehension, and is fearing that he is deceived; the lover again and again touches the object of his desires with his hand. It is a real body; the veins throb, when touched with the thumb.",
        "source": "Ovid, Metamorphoses, Book X: Pygmalion (8 AD). Ovid, Metamorphoses Book X (trans. Henry T. Riley), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm"
      },
      {
        "category": "literary",
        "title": "Mary Shelley's Victor Frankenstein watches the dull yellow eye of his creature open, then flees as one hand is stretched out to detain him. The reaching hand is the image of the creature crossing from assembled parts into unsettling life. A humanoid hand that grips a twenty-pound kettlebell yet picks a grape off its stem revives that same mix of wonder and dread at the made thing that moves like us. Frankenstein remains the founding fable of creators who fear what their creatures' hands might do.",
        "excerpt": "I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs. ... one hand was stretched out, seemingly to detain me, but I escaped and rushed downstairs.",
        "source": "Mary Shelley, Frankenstein; or, The Modern Prometheus, Chapter 5 (1818). Mary Shelley, Frankenstein, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "artistic",
        "title": "Michelangelo's Creation of Adam reduces the whole drama of creation to two nearly touching hands, God's finger charging Adam's with life. It is Western art's defining image of the maker reaching out to animate a creature in his own likeness. 1X, building a hand in humanity's image and calling it near-human, inherits that gesture in reverse: now the human is the god extending life to the artificial. The famous gap between the two fingers is exactly the gap the robot's tactile fingertips are engineered to close.",
        "excerpt": "Across the Sistine Chapel ceiling a languid Adam reaches out his left arm, his finger almost meeting the outstretched hand of a windswept God borne on a cloud of angels. The two index fingers hang a breath apart, the whole spark of creation suspended in that unclosed gap. It is the most celebrated pair of hands in Western art, the instant the inert is charged with life through a single touch.",
        "source": "Michelangelo, The Creation of Adam, Sistine Chapel ceiling (c. 1508-1512). Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Creation_of_Adam_(cropped).jpg",
        "image": {
          "src": "/covers/1x-neo-dexterous-robot-hand--a5.png",
          "alt": "Detail of Michelangelo's fresco The Creation of Adam, showing the near-touching hands of God and Adam",
          "credit": "Michelangelo, Sistine Chapel ceiling / Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Leo Delibes's ballet Coppelia turns on the toymaker Dr. Coppelius and his life-sized mechanical dancing doll, so convincing that the young villager Franz falls in love with her, mistaking clockwork for a living girl. Its music dances on the uncanny line between automaton and human that 1X's near-human hand now walks in a Californian factory. The ballet's charm and menace both come from a maker who longs for his doll to move as if alive. A humanoid that assembles Lego and screws in a bulb is that automaton's dream finally made dexterous.",
        "excerpt": "Delibes's score brings to life a village square where an old inventor sets his dark-eyed automaton Coppelia on a balcony, her jerky clockwork nods and mechanical dances so lifelike that a smitten young man courts a machine. When the doll is unmasked and a real girl mimics its stiff, winding-down movements, the music teeters between comedy and dread. It is the sound of the mechanical made in a human likeness, charming and unnerving at once.",
        "source": "Leo Delibes, Coppelia, ou la fille aux yeux d'email (ballet, 1870). IMSLP (Petrucci Music Library)",
        "href": "https://imslp.org/wiki/Copp%C3%A9lia_(Delibes,_L%C3%A9o)"
      }
    ],
    "rank": 37
  },
  {
    "slug": "jeongmin-lee-korean-folklore-ink",
    "headline": "Colossal features Busan artist Jeongmin Lee's ink illustrations steeped in Korean coastal folklore",
    "overview": "The arts publication Colossal spotlighted Jeongmin Lee, a Busan-based artist who draws delicate ink and mineral pigments on traditional Korean mulberry paper, or hanji, to render surreal scenes of life by the sea. Lee builds each composition by reading regional folktales, visiting the places tied to them and collecting fragments of myth and oral history. Many of the works center on women's knowledge, labor and resilience as passed down through coastal storytelling.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/jeongmin-lee-korean-folklore-illustrations/"
      },
      {
        "name": "Jeongmin Lee (Min the Elephant) — artist website",
        "href": "https://mintheelephant.com/work"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/jeongmin-lee-korean-folklore-ink.png",
      "alt": "An ink and mineral-pigment illustration on Korean hanji paper by Jeongmin Lee, rendering a surreal seaside folktale of rippling waves and coastal figures in fine, whirling line.",
      "credit": "Colossal / Jeongmin Lee"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before Jeongmin Lee bent ink across hanji, coastal Korea told stories in which the sea itself was a living, willful power that could rise to the height of the mountains. This old tale of a holy man watching the ocean climb the hills belongs to the same body of regional sea-lore that Lee mines for her surreal shorelines. Both treat the water as a keeper of dread and wonder rather than mere scenery. Her illustrations are, in effect, a modern retelling of exactly this kind of ancient coastal myth.",
        "excerpt": "When cock-crow came, sure enough the sea suddenly lifted its face, overflowed its banks, and the waves came rolling up to the heavens, climbing the mountain-sides till they touched the feet of To-jong.",
        "source": "“The Vision of the Holy Man,” from Korean Folk Tales: Imps, Ghosts and Fairies (tales of Im Bang and Yi Ryuk, trans. James S. Gale, 1913). Project Gutenberg — Korean Folk Tales.",
        "href": "https://www.gutenberg.org/files/51002/51002-h/51002-h.htm"
      },
      {
        "category": "historical",
        "title": "A century ago, a chance manuscript of Im Bang’s stories sent James Gale scrambling to collect and carry Korea’s oral folklore into print before it faded. Jeongmin Lee works in that same preservationist spirit: she reads regional folktales, visits the places tied to them, and gathers fragments of history, myth, and oral memory. Where Gale used translation to keep the tales alive, Lee uses ink and mineral pigment. Both are acts of rescue that turn vanishing coastal storytelling into a durable form.",
        "excerpt": "An old manuscript copy of Im Bang’s stories came into the hands of the translator a year ago, and he gives them now to the Western world that they may serve as introductory essays to the mysteries, and, what many call, absurdities of Asia.",
        "source": "Preface by James S. Gale to Korean Folk Tales (1913), an early-modern effort to gather and preserve Korea’s oral tradition. Project Gutenberg — Korean Folk Tales.",
        "href": "https://www.gutenberg.org/files/51002/51002-h/51002-h.htm"
      },
      {
        "category": "literary",
        "title": "Byron’s famous address to the ocean casts the sea as an immortal, ungovernable force at whose shoreline human control simply stops. That is precisely the border Jeongmin Lee’s folklore lives on — the edge where coastal communities negotiate with a power far larger than themselves. Her women divers and sea-keepers are figures who dwell at that same threshold Byron marks. The poem’s reverence for the deep echoes the awe running through her seaside scenes.",
        "excerpt": "Roll on, thou deep and dark blue Ocean—roll!\nTen thousand fleets sweep over thee in vain;\nMan marks the earth with ruin—his control\nStops with the shore;",
        "source": "Lord Byron, apostrophe to the ocean from Childe Harold’s Pilgrimage, Canto IV (1818). Project Gutenberg — Childe Harold’s Pilgrimage.",
        "href": "https://www.gutenberg.org/cache/epub/5131/pg5131.txt"
      },
      {
        "category": "literary",
        "title": "Whitman opens his great sea-poem with the ocean as an endless rocking cradle that hands down song and memory across a lifetime. Jeongmin Lee’s work is animated by the same idea: the sea as a source of inherited story, its knowledge passed from one generation of coastal women to the next. Both artist and poet treat the shoreline as a place where memory, place, and voice are braided together. Her rippling lines are a visual counterpart to Whitman’s musical shuttle of the waves.",
        "excerpt": "Out of the cradle endlessly rocking,\nOut of the mocking-bird’s throat, the musical shuttle,\nOut of the Ninth-month midnight,",
        "source": "Walt Whitman, opening of “Out of the Cradle Endlessly Rocking,” from Leaves of Grass. Project Gutenberg — Leaves of Grass.",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "artistic",
        "title": "Hokusai’s towering wave is the defining East Asian image of the sea as both beauty and threat, its clawed crest curling over tiny human boats. Jeongmin Lee inherits that visual lineage — the fine, whirling line describing water as something alive and immense. Like Hokusai, she uses traditional materials and a graphic economy of line to fold folklore and coastal danger into a single arresting scene. His wave and her surreal shorelines share the same conviction that the sea deserves to be drawn with awe.",
        "excerpt": "A single deep-blue breaker rears up and arcs across the print, its foaming crest splintering into finger-like claws that seem poised to fall on the slender fishing boats below. Far in the distance, dwarfed by the water, the snow-capped cone of Mount Fuji sits calm and immovable. The composition holds motion and stillness, terror and serenity, in one taut, unforgettable line.",
        "source": "Katsushika Hokusai, The Great Wave off Kanagawa (c. 1830–1832), woodblock print from Thirty-six Views of Mount Fuji. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Katsushika_Hokusai_-_The_Great_Wave_off_the_Coast_of_Kanagawa.jpg",
        "image": {
          "src": "/covers/jeongmin-lee-korean-folklore-ink--a5.png",
          "alt": "Hokusai’s The Great Wave off Kanagawa: a giant cresting wave with clawing foam looming over small boats, with Mount Fuji small in the distance.",
          "credit": "Katsushika Hokusai, The Great Wave off Kanagawa (public domain) via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Debussy’s La mer paints the ocean in sound — shifting light on water, the play of waves, and the dialogue of wind and sea rendered in shimmering orchestral color rather than literal depiction. That impressionistic method mirrors Jeongmin Lee’s own: she chases the symbols, emotions, and questions a folktale leaves behind instead of illustrating it word for word. Both artists evoke the sea’s mood and mystery rather than transcribing it. Heard alongside her ink, La mer feels like the soundtrack to her rippling, folklore-steeped coasts.",
        "excerpt": "One of the most celebrated evocations of the sea in Western music, its three movements move from dawn glinting on the water, through the restless dance of the waves, to a churning conversation between wind and sea. Debussy conjures swells, spray, and shifting light entirely through orchestral color and surging rhythm, suggesting the ocean’s power without ever describing it plainly. The result is atmosphere made audible — a mood-portrait of the deep.",
        "source": "Claude Debussy, La mer, trois esquisses symphoniques pour orchestre (1905). IMSLP / Petrucci Music Library — La mer (Debussy)",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)"
      }
    ],
    "rank": 38
  },
  {
    "slug": "barbican-community-greenhouse",
    "headline": "A barrel-vaulted community greenhouse opens on the Barbican estate in London",
    "overview": "A new barrel-vaulted community greenhouse has been built on London's brutalist Barbican estate, giving residents and visitors a shared space to grow plants amid the concrete complex. Featured by Dezeen, the timber-and-glass structure echoes the estate's arches and adds to the Barbican's celebrated conservatory and gardens. The project reflects a wider push to weave food-growing and green space into dense urban housing.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/13/veggery-barbican-studio-folk-architects-raskl/"
      },
      {
        "name": "Barbican Centre",
        "href": "https://www.barbican.org.uk/whats-on/2026/event/visit-the-conservatory"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-14",
    "image": {
      "src": "/covers/barbican-community-greenhouse.png",
      "alt": "The Veggery, a hexagonal timber-framed community greenhouse with a multi-arched polytunnel roof that echoes the barrel-vaulted arches of the Barbican, standing on the estate beside St Giles' Cripplegate church",
      "credit": "Dezeen"
    },
    "edition": "Morning Edition · 14 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly three thousand years ago, Homer imagined the ultimate civic amenity as a walled, ever-fruiting garden set just beyond the king's threshold, watered by shared springs from which the town's people drew. The new Barbican greenhouse revives that ancient idea of a cultivated green enclosure planted in the heart of a settlement for common benefit. Where Alcinous's orchard fed a Phaeacian court, the Veggery offers estate residents a place to grow plants together amid the concrete. Both treat tended greenery not as luxury but as something a good community keeps close at hand.",
        "excerpt": "Outside the gate of the outer court there is a large garden of about four acres with a wall all round it. It is full of beautiful trees—pears, pomegranates, and the most delicious apples. There are luscious figs also, and olives in full growth. The fruits never rot nor fail all the year round, neither winter nor summer, for the air is so soft that a new crop ripens before the old has dropped.",
        "source": "Homer, The Odyssey, Book VII, trans. Samuel Butler.",
        "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm"
      },
      {
        "category": "historical",
        "title": "In 1851 Joseph Paxton raised a vast barrel-vaulted hall of iron and glass in Hyde Park, so tall its transept could enclose living elm trees under crystal, and Thackeray marveled that a blazing arch of glass had leapt from bare grass \"as though 'twere by a wizard's rod.\" The Barbican's timber-and-glass greenhouse, with its multi-arched roof echoing the estate's vaults, is a small, communal descendant of that glasshouse dream. Both structures answer the same Victorian impulse: to shelter growing green things beneath a transparent, sunlit vault in the middle of a city. Where the Crystal Palace glazed a nation's spectacle, the Veggery glazes a neighbourhood's growing space.",
        "excerpt": "But yesterday a naked sod\nThe dandies sneered from Rotten Row,\nAnd cantered o'er it to and fro:\nAnd see 'tis done!\nAs though 'twere by a wizard's rod\nA blazing arch of lucid glass\nLeaps like a fountain from the grass\nTo meet the sun!\n\nA quiet green but few days since,\nWith cattle browsing in the shade:\nAnd here are lines of bright arcade\nIn order raised!\nA palace as for fairy Prince,\nA rare pavilion, such as man\nSaw never since mankind began,\nAnd built and glazed!",
        "source": "William Makepeace Thackeray, \"May-Day Ode\" (1851), Ballads.",
        "href": "https://www.gutenberg.org/files/2732/2732-h/2732-h.htm"
      },
      {
        "category": "literary",
        "title": "Voltaire ends Candide by having his weary hero renounce grand philosophy for the humble, grounding work of tending a plot of land: \"we must cultivate our garden.\" The Barbican greenhouse is that maxim built in timber and glass, turning a corner of a dense estate into a place where people quietly grow things with their hands. Voltaire's little society finds purpose and peace once each member takes up useful cultivation together, much as the greenhouse means to give residents a shared task and a shared ground. It is the same modest, communal answer to a hard world: plant, tend, and belong.",
        "excerpt": "\"I know also,\" said Candide, \"that we must cultivate our garden.\"\n\"You are right,\" said Pangloss, \"for when man was first placed in the Garden of Eden, he was put there ut operaretur eum, that he might cultivate it; which shows that man was not born to be idle.\"\n\"Let us work,\" said Martin, \"without disputing; it is the only way to render life tolerable.\"",
        "source": "Voltaire, Candide, Chapter XXX (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm"
      },
      {
        "category": "literary",
        "title": "Frances Hodgson Burnett's The Secret Garden turns on a walled, forgotten green space brought back to life by children who choose to tend it, and are themselves healed in the tending. The Barbican greenhouse carries the same promise: an enclosed patch of cultivation set into a hard, built landscape that revives when a community starts to care for it. Burnett's garden becomes the place where lonely, transplanted people finally take root and belong, echoing the festival theme of \"Belonging\" behind the Veggery. Both insist that a shared, sheltered garden can quietly remake the people who work it.",
        "excerpt": "It was the sweetest, most mysterious-looking place anyone could imagine. The high walls which shut it in were covered with the leafless stems of climbing roses which were so thick that they were matted together.",
        "source": "Frances Hodgson Burnett, The Secret Garden, Chapter IX.",
        "href": "https://www.gutenberg.org/files/113/113-h/113-h.htm"
      },
      {
        "category": "artistic",
        "title": "J. McNeven's 1851 lithograph looks down the barrel-vaulted glass transept of the Crystal Palace, capturing the astonishing sight of full-grown elm trees and a fountain sheltered inside a soaring crystal aisle. It is almost a portrait of the Barbican greenhouse's guiding idea a century and a half early: a vaulted, transparent structure that folds living, growing nature into the heart of a man-made monument. The crowds streaming between the arches beneath the glass foreshadow the Veggery's role as a shared public room around its plants. In both, the arched glass roof becomes the frame that lets a garden thrive amid the city.",
        "excerpt": "A brilliant colour lithograph looks the length of the barrel-vaulted glass transept of the Crystal Palace, where a great fountain and full-grown elm trees rise inside the crystal aisles. Crowds in Victorian dress drift between the arches beneath a soaring web of iron and glass that lets the daylight pour down. Nature and industry share a single luminous nave, the living trees framed and sheltered by the shining vault overhead.",
        "source": "J. McNeven, The Transept from the Grand Entrance, Souvenir of the Great Exhibition (1851), Victoria and Albert Museum; public domain via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Crystal_Palace_interior.jpg",
        "image": {
          "src": "/covers/barbican-community-greenhouse--a5.png",
          "alt": "Colour lithograph of the interior of the Crystal Palace in 1851: the barrel-vaulted glass transept enclosing full-grown elm trees and a fountain, with crowds of visitors below",
          "credit": "J. McNeven, 'The Transept from the Grand Entrance' (1851), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's opera Serse opens with the king alone in his garden, singing the tender arioso \"Ombra mai fù\" in gratitude to the cool shade of a single plane tree. That famous melody makes an act of quiet devotion out of resting beneath living leaves, elevating the simple care of a tree to something like reverence. The Barbican greenhouse offers the same unhurried pleasure in a brutalist setting: a green, sheltering space where residents can slow down among growing plants. Handel set the love of tended greenery to music; the Veggery builds a modest timber sanctuary for the same feeling.",
        "excerpt": "The opera opens with Xerxes alone in a garden, addressing a tender arioso to the welcome shade of a plane tree. Over a slow, gently rocking accompaniment the voice unfolds one of the most serene melodies ever written—a hymn of gratitude to a single living tree. Its calm devotion turns the simple act of resting beneath green leaves into something close to reverence.",
        "source": "George Frideric Handel, \"Ombra mai fù\" from Serse (Xerxes), HWV 40 (1738), full score via IMSLP.",
        "href": "https://imslp.org/wiki/Serse,_HWV_40_(Handel,_George_Frideric)"
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
