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
// the Afternoon Edition of 11 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Morning Edition of 11 July 2026 and the Evening Edition of 10 July 2026.
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
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
  },
  {
    "slug": "ukraine-pm-svyrydenko-dismissed",
    "headline": "Ukraine's President Zelensky dismisses Prime Minister Yulia Svyrydenko after a year and orders a wartime cabinet reshuffle",
    "overview": "Ukrainian President Volodymyr Zelensky announced on July 12, 2026 that he would replace Prime Minister Yulia Svyrydenko after only about a year in office, prompting the government to resign and triggering a broad wartime cabinet reshuffle. Zelensky said Ukraine was changing its political strategy and would reorganise its leadership, with changes also expected among the heads of law-enforcement agencies. Svyrydenko is widely tipped to become Kyiv's ambassador to the United States, with figures such as Denys Shmyhal and Serhiy Koretskyi mentioned as possible successors.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOWFdBOU1paEhkRXRwdjF6aXZjdWJOeXpzRmxhOG5vTHVqNXdHSzJLWXdDRjlzVE9BUE9zVWdzeDJYUnpDV0V2V3RpSXJLV3h1allFck5jN2tWQV9tVVF0ZjllR2FXd3dzUUVNbGFsNm4tUzNkTkozWUJraWpINmNVZTFxWUJuZ1JXUVpvQWFMd3owT2pJU1YwdEFvYXpqaW8?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPSnhGVVA5VTN4M0liQkZxblJjLVplazZxT3FLTGtrbGp6d2dldFBmX2dkT2M3a0lQNV94enRxaTV6ZUdia2JLTnpzZ3dLdW50aDh2UldEY1ZRemJ3dmFwNTExTFFnOGh0bmtzb1plNm5oeDZkdy1WVjZEMVp5a1JWd19Rb2MydlpNVTFCSnRrRFpVZzFNTHZRaW9kUmJZWU1QaXQxZkxmSExRem1lZ3Zr?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/ukraine-pm-svyrydenko-dismissed.png",
      "alt": "Yulia Svyrydenko, the dismissed Ukrainian prime minister, in an official portrait.",
      "credit": "Photo: Government of Ukraine, official portrait; via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 31 the emperor Tiberius destroyed Sejanus, the prefect who had effectively run the Roman state as his indispensable deputy, by a single letter read aloud in the Senate. Like Zelensky's abrupt removal of a premier he had elevated only a year earlier, it is the archetype of a ruler unmaking his own chief minister overnight.",
        "excerpt": "For the man whom at dawn they had escorted to the senate-hall as a superior being, they were now dragging to prison as if no better than the worst.",
        "source": "Cassius Dio, Roman History, Book LVIII.11, trans. Earnest Cary (Loeb Classical Library, 1924); Bill Thayer's LacusCurtius edition.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/58*.html"
      },
      {
        "category": "historical",
        "title": "In March 1890 Kaiser Wilhelm II forced out Otto von Bismarck, the Iron Chancellor who had built and steered the German Empire, ending decades of dominance almost at a stroke. Zelensky dismissing a prime minister he himself installed echoes this classic clash between a young ruler and the powerful minister he decides he no longer needs.",
        "excerpt": "The conflict between the Chancellor and me arose because of his belief that the social problem could be solved by severe measures.",
        "source": "William II, German Emperor, The Kaiser's Memoirs (Wilhelm II, Emperor of Germany, 1888-1918), trans. Thomas R. Ybarra (New York & London: Harper & Brothers, 1922).",
        "href": "https://www.gutenberg.org/files/43522/43522-h/43522-h.htm"
      },
      {
        "category": "literary",
        "title": "Cardinal Wolsey's farewell in Shakespeare and Fletcher's 'King Henry the Eighth' is English drama's greatest lament for a first minister cast down by his king at the height of his power. It voices exactly the vertigo of a once-untouchable government head, like Svyrydenko, dropped after a single high season of favor.",
        "excerpt": "So farewell, to the little good you beare me. / Farewell? A long farewell to all my Greatnesse. / This is the state of Man; to day he puts forth / The tender Leaues of hopes, to morrow Blossomes, / And beares his blushing Honors thicke vpon him: / The third day, comes a Frost; a killing Frost, / And when he thinkes, good easie man, full surely / His Greatnesse is a ripening, nippes his roote, / And then he fals as I do. I haue ventur'd / Like little wanton Boyes that swim on bladders: / This many Summers in a Sea of Glory, / But farre beyond my depth: my high-blowne Pride / At length broke vnder me.",
        "source": "William Shakespeare and John Fletcher, The Famous History of the Life of King Henry the Eighth, Act III, Scene 2 (First Folio text, c.1613).",
        "href": "https://www.gutenberg.org/cache/epub/2258/pg2258.html"
      },
      {
        "category": "literary",
        "title": "The Book of Esther stages the sudden ruin of Haman, the king's exalted chief minister, hanged on the very gallows he built for another. It is the scriptural template for the vizier who rises to the summit of a court and falls without warning, a reversal mirrored in Svyrydenko's swift dismissal.",
        "excerpt": "And Harbonah, one of the chamberlains, said before the king, Behold also, the gallows fifty cubits high, which Haman had made for Mordecai, who had spoken good for the king, standeth in the house of Haman. Then the king said, Hang him thereon. So they hanged Haman on the gallows that he had prepared for Mordecai. Then was the king's wrath pacified.",
        "source": "The Holy Bible, King James Version (1611), Esther 7:9-10.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Esther"
      },
      {
        "category": "artistic",
        "title": "Haydn's Symphony No. 45 in F-sharp minor, the 'Farewell' Symphony, ends with players blowing out their candles and departing one by one until the stage is nearly empty. It is the perfect musical image of a government hollowing out in a reshuffle, ministers filing out as a leader's cabinet is dismantled.",
        "excerpt": "Composed for Haydn's Esterhazy musicians in 1772, the finale famously thins from a full ensemble to a lone pair of violins as instrumentalists rise, snuff their candles and leave the platform in turn. The IMSLP page carries full scores from Le Duc to Breitkopf & Hartel alongside historic recordings by Antal Dorati and Pablo Casals, the closing bars enacting an orderly, wistful exodus much like a wartime cabinet being emptied and reconstituted.",
        "source": "Joseph Haydn, Symphony No. 45 in F-sharp minor, Hob.I:45 ('Farewell' / 'Abschieds-Symphonie'), 1772; scores and recordings via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Symphony_No.45_in_F-sharp_minor,_Hob.I:45_(Haydn,_Joseph)"
      },
      {
        "category": "artistic",
        "title": "John Tenniel's 1890 Punch cartoon 'Dropping the Pilot' shows Bismarck in pilot's cap descending the ship's ladder while the young Kaiser leans over the rail, watching the indispensable helmsman go. It remains the definitive picture of a leader letting his powerful minister disembark, an apt frame for Zelensky parting with his prime minister mid-voyage.",
        "excerpt": "Tenniel renders the dismissed chancellor as a grizzled ship's pilot in a striped jersey and cap, stepping heavily down the side-ladder of the German ship of state. Above him the crowned young emperor stares down in silence, hands on the rail, the whole scene reduced to a wordless transfer of command. The wood-engraved image turned Bismarck's fall into a single unforgettable emblem of leadership churn at the top of a nation.",
        "source": "John Tenniel (engraved by Joseph Swain), 'Dropping the Pilot', wood engraving published in Punch, 29 March 1890.",
        "href": "https://commons.wikimedia.org/wiki/File:Dropping_the_Pilot.jpg",
        "image": {
          "src": "/covers/ukraine-pm-svyrydenko-dismissed--a5.png",
          "alt": "A cartoon of an old bearded pilot in cap and jersey climbing down a ship's ladder while a young crowned emperor watches from the deck above.",
          "credit": "John Tenniel, 'Dropping the Pilot', 1890; published in Punch; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "uk-widdecombe-murder-arrest",
    "headline": "Former British minister Ann Widdecombe, 78, found murdered at her Devon home; a man is arrested and police cite no political motive",
    "overview": "Ann Widdecombe, the former Conservative prisons minister who later became a Brexit Party MEP and a Reform UK figure, was found dead with serious injuries at her home on Dartmoor in Devon, and police are treating the death as murder. Devon and Cornwall Police said a man had been arrested on suspicion of the killing and that there was no evidence of a political motive, adding that they were keeping an open mind about what had happened. Widdecombe, a familiar face in British public life who also appeared on reality television, was 78.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxQdzNvU2tjajlTZWJVZFZBNldWUUFCMlc0SFp2QmxteTlwMGFPeFlFZFgycGkyNnI2R25VZ2IwT1ZYREpXZG9kc29wVTU2cUtpc2t0bDFZQmxFUURyVUJHNUZuR0ZDVjRpOUxGMkhBeU4zdUtqLXVpNW5RRTVYY19MVjZZZ2IxdmEyUW5rYm1ScUpXRWNraWtkQWw1Sks1N3VXMTI3R0lTZjI4eEZMRDdzb0hSR2JUWmhEQV9PR0ZlYzkyZw?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/10/uk/ann-widdecombe-uk-police-murder-investigation-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/uk-widdecombe-murder-arrest.png",
      "alt": "Ann Widdecombe, the former British minister and MEP, in an official portrait.",
      "credit": "Photo: European Parliament, official MEP portrait; via Wikimedia Commons"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1170 Thomas Becket, England's former Lord Chancellor turned Archbishop of Canterbury, was cut down by four knights before his own altar. Like the killing of Ann Widdecombe, it was the violent death of a prominent public figure whose true motive was fiercely contested.",
        "excerpt": "He had barely finished speaking when the impious knight, fearing that [Thomas] would be saved by the people and escape alive, suddenly set upon him and, shaving off the summit of his crown which the sacred chrism consecrated to God, he wounded the sacrificial lamb of God in the head.",
        "source": "Edward Grim, eyewitness account of the murder of Thomas Becket (c. 1170s), translated in the Internet Medieval Sourcebook, Fordham University.",
        "href": "https://sourcebooks.fordham.edu/source/grim-becket.asp"
      },
      {
        "category": "historical",
        "title": "Spencer Perceval is the only British Prime Minister ever assassinated, shot dead in the lobby of the House of Commons in 1812 by John Bellingham. As with Widdecombe, a British public figure was struck down by an aggrieved man acting from a private grievance rather than a broad political cause.",
        "excerpt": "As he passed through the lobby to reach the house, Bellingham placed a pistol to his breast and fired. Perceval was dead before a doctor could be found",
        "source": "J. A. Hamilton, \"Perceval, Spencer,\" Dictionary of National Biography, 1885-1900, vol. 44.",
        "href": "https://en.wikisource.org/wiki/Dictionary_of_National_Biography,_1885-1900/Perceval,_Spencer"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Julius Caesar dramatises the archetypal killing of a statesman, the conspirators' daggers falling in the Capitol. Its most famous line captures the raw shock of a public man betrayed and struck down, an echo of a nation reeling at Widdecombe's murder.",
        "excerpt": "CAESAR.\n_Et tu, Brute?_—Then fall, Caesar!\n\n[_Dies. The Senators and People retire in confusion._]",
        "source": "William Shakespeare, Julius Caesar, Act III, Scene 1 (Project Gutenberg eBook #1522).",
        "href": "https://www.gutenberg.org/cache/epub/1522/pg1522.txt"
      },
      {
        "category": "literary",
        "title": "Walt Whitman's elegy \"O Captain! My Captain!\" mourns Abraham Lincoln, slain at the very hour of victory. It is the voice of an entire nation grieving a beloved leader suddenly cut down, the same public sorrow provoked by Widdecombe's killing.",
        "excerpt": "O Captain! my Captain! our fearful trip is done,\nThe ship has weather’d every rack, the prize we sought is won,\nThe port is near, the bells I hear, the people all exulting,\nWhile follow eyes the steady keel, the vessel grim and daring;\n      But O heart! heart! heart!\n       O the bleeding drops of red,\n         Where on the deck my Captain lies,\n           Fallen cold and dead.",
        "source": "Walt Whitman, \"O Captain! My Captain!\", Leaves of Grass (Project Gutenberg eBook #1322).",
        "href": "https://www.gutenberg.org/cache/epub/1322/pg1322.txt"
      },
      {
        "category": "artistic",
        "title": "Beethoven's Piano Sonata No. 12 places at its heart a \"Funeral March on the Death of a Hero,\" turning public grief into music. It is the sound of a people burying a fallen figure, a fitting requiem for a nation mourning a prominent life struck down.",
        "excerpt": "Beethoven marked the sonata's third movement \"Marcia funebre sulla morte d'un eroe\" — a slow, tolling march in A-flat minor whose heavy dotted tread and muffled drum-rolls evoke a state funeral. Composed in 1801, the piece became so bound up with public mourning that an orchestrated version was played at Beethoven's own funeral in 1827. It transforms a single death into a whole nation's ceremonial grief.",
        "source": "Ludwig van Beethoven, Piano Sonata No. 12 in A-flat major, Op. 26, third movement, \"Marcia funebre sulla morte d'un eroe\" (1801).",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.12,_Op.26_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David's \"The Death of Marat\" immortalises the assassination of the revolutionary journalist Jean-Paul Marat, stabbed in his bath in 1793. It transfigures the murder of a public political figure into a nation's enduring icon of mourning, as Widdecombe's death has become a moment of collective shock.",
        "excerpt": "David depicts Marat in the moments after the fatal stab, slumped lifeless in his bathtub, the assassin's knife on the floor and the petition that lured his killer still clutched in his hand. The stark, near-empty upper background and the pale, martyred body turn a brutal political murder into a secular pietà. It remains among the most powerful images ever made of a public figure struck down.",
        "source": "Jacques-Louis David, The Death of Marat (La Mort de Marat), 1793, oil on canvas; Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Death_of_Marat_by_David.jpg",
        "image": {
          "src": "/covers/uk-widdecombe-murder-arrest--a5.png",
          "alt": "A murdered man slumped dead in his bathtub, one arm hanging limply over the side still holding a letter, a bloodied knife on the floor beside him.",
          "credit": "Jacques-Louis David, The Death of Marat, 1793; Royal Museums of Fine Arts of Belgium, Brussels; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "germany-funds-ukraine-strike-drones",
    "headline": "Germany agrees to fund 50,000 strike drones for Ukraine in a major boost to Kyiv's arsenal, a source says",
    "overview": "Germany has agreed to bankroll up to 50,000 long-range strike drones for Ukraine, one of the largest known Western drone orders for Kyiv, a source told Reuters. The roughly 90-million-euro ($103 million) deal covers 'Shrike' first-person-view drones built by Ukrainian maker SkyFall and fitted with software from the US firm Auterion that can autonomously track and hit moving targets. Some of the drones have already been delivered, with the rest due this year; the German and Ukrainian defence ministries declined to comment.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxObmw1bUVFVGYxWlZDbmR2eVB0QkZreWY0SW8wUW9rYkdSXzF6QVJWa1QyeDhOLVRjWVNiSkhSVURjdFg4RHA5eW9peC14SzZ3cHNqLVNTS0VsbWdFTlNVREtzTEFnaHpfSFEzWEppbG9taElxMUlHMllGenJiSGJzemQyRFBGS0labzdCX1dYQlEzcDh0ODJ2enpScw?oc=5"
      },
      {
        "name": "U.S. News & World Report",
        "href": "https://www.usnews.com/news/world/articles/2026-07-12/germany-funds-50-000-strike-drones-for-ukraine-source-says"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/germany-funds-ukraine-strike-drones.png",
      "alt": "A small first-person-view quadcopter drone in flight against the sky.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1778 France threw its treasure and arsenals behind the American revolutionaries, a foreign patron pledging to sustain a smaller belligerent's fight for survival against a mightier empire, just as Germany now underwrites Ukraine's drones against Russia.",
        "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
        "source": "Treaty of Alliance Between the United States and France, Article II (February 6, 1778). The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/18th_century/fr1788-2.asp"
      },
      {
        "category": "historical",
        "title": "Facing Axis aggression in 1940, Franklin Roosevelt vowed to make America the factory that would arm every nation resisting tyranny, converting industrial might into allied firepower, the very logic behind Germany bankrolling 50,000 drones for Kyiv.",
        "excerpt": "We must be the great arsenal of democracy. For us this is an emergency as serious as war itself.",
        "source": "Franklin D. Roosevelt, Fireside Chat on National Security (\"Arsenal of Democracy\"), December 29, 1940. The American Presidency Project, UC Santa Barbara.",
        "href": "https://www.presidency.ucsb.edu/documents/fireside-chat-9"
      },
      {
        "category": "literary",
        "title": "In the Iliad, the smith-god Vulcan forges arms for a warrior and builds self-moving tripods that roll into the councils of the gods of their own accord, an ancient dream of the unmanned mechanical instrument of war now realized in the strike drone.",
        "excerpt": "for he was making twenty tripods that were to stand by the wall of his house, and he set wheels of gold under them all that they might go of their own selves to the assemblies of the gods, and come back again- marvels indeed to see.",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler. Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XVIII"
      },
      {
        "category": "literary",
        "title": "Tennyson peered into the future and foresaw nations' fleets doing battle in the sky and a deadly rain falling from the air, a Victorian premonition of aerial and drone warfare descending on cities like Kyiv.",
        "excerpt": "Heard the heavens fill with shouting, and there rain'd a ghastly dew / From the nations' airy navies grappling in the central blue;",
        "source": "Alfred, Lord Tennyson, \"Locksley Hall\" (1842). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Locksley_Hall"
      },
      {
        "category": "artistic",
        "title": "Beethoven's thunderous battle-piece stages a foreign patron's arms triumphing over an aggressor: British and allied forces, cannon fire notated in the score, rout Napoleon's army at Vitoria, an orchestral echo of allied weaponry turning the tide of a war.",
        "excerpt": "Beethoven scores the Battle of Vitoria itself: opposing drum-tattoos and trumpet fanfares announce the British and French camps, the tunes \"Rule Britannia\" and \"Marlborough\" clash across the orchestra, and salvos of cannon and musket fire are written directly into the parts before the enemy is broken and a victory symphony crowns \"God Save the King.\" It is the sound of a coalition's firepower deciding a war.",
        "source": "Ludwig van Beethoven, Wellingtons Sieg, oder Die Schlacht bei Vittoria (Wellington's Victory), Op. 91 (1813). IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Wellingtons_Sieg,_Op.91_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "Leonardo da Vinci sketched a covered, gun-bristling war machine and a scythed chariot four centuries before the tank, imagining a new mechanical instrument that would transform the battlefield, the same imaginative leap embodied in today's mass-produced strike drones.",
        "excerpt": "Leonardo's pen-and-wash sheet designs a conical armoured vehicle ringed with cannon, operated from within, alongside a horse-drawn chariot bristling with rotating scythes, machines conceived to overturn the very nature of combat. It is one of history's earliest visions of the armed, engine-of-war as a self-contained mechanical weapon.",
        "source": "Leonardo da Vinci, Design for a Scythed Chariot and an Armoured Car, c. 1485, pen and ink with wash. The British Museum.",
        "href": "https://commons.wikimedia.org/wiki/File:Da_Vinci_Scythed_Chariot_and_Armoured_Tank.JPG",
        "image": {
          "src": "/covers/germany-funds-ukraine-strike-drones--a5.png",
          "alt": "Leonardo da Vinci's pen-and-ink drawing of a scythed chariot and a conical armoured fighting vehicle bristling with cannon.",
          "credit": "Leonardo da Vinci, Design for a Scythed Chariot and an Armoured Car (c. 1485), The British Museum. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "gaza-israeli-strikes-civilians",
    "headline": "Israeli fire in Gaza kills at least six people, including a young girl, health officials say",
    "overview": "At least six Palestinians, among them a young girl, were killed by Israeli fire in the Gaza Strip, local health officials said, in the latest civilian casualties of the long-running war. Accounts of the toll varied, with some officials putting the number of dead at five. The deaths added to mounting international concern over the human cost of the conflict for Gaza's civilians.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNMG9aTHRZOUl1VXc1WEROTm5fcWJ3RXVEeFpCenhmOW1jalV6RGNpcFpuTUx5LS14blI5ZF9tdHoxZVJsNnIwZFphM0o4c29VdmtZU1hXWWNiTV81UGVEbHlROTRnUDhhdVp0VHMwUFZXazJrX2JRM1ZOeVRHT0gybmpZQXl0TWYxVHE0M1dXV1gwN3Q2T2lmZ1puelRSYzQ0RUE?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNdW16M2JEMFgyMlEyUVJHNW00cVhNVk9zaG5GLVNWMW5aY2c3bjRjRE1kaTBSdHBabHVJWUxibzl0OGpMT29Bek5xa0Y4cmc5RV80SzEwbk9CY0RjUG5WNFdyUVQ1WUJVc3A0RVVWa1VIWnhnWnNzckZYUlEzdXIybGttcDFjRW52eUl1aUNDRmJQdVNNNThfWU1fLXhJd2VBb2lxUE5TTTV6R2Etdk00LXlBUzRKcHI3WlE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/gaza-israeli-strikes-civilians.png",
      "alt": "A view over the rooftops of Deir al-Balah, a town in the Gaza Strip.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 416 BC the great power of Athens crushed the small island of Melos, and Thucydides recorded the arithmetic of conquest without flinching: the men killed, the women and children carried off. As in Gaza, it is the non-combatants who inherit the aftermath of a war fought over their heads.",
        "excerpt": "they yielded themselves to the discretion of the Athenians, who slew all the men of military age, made slaves of the women and children, and inhabited the place with a colony sent thither afterwards of five hundred men of their own.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5.116, trans. Thomas Hobbes (1843 edition), Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Thuc.+5.116&fromdoc=Perseus%3Atext%3A1999.01.0247"
      },
      {
        "category": "historical",
        "title": "When imperial troops stormed Magdeburg in 1631, the mayor Otto von Guericke watched a proud city burn and its unarmed people perish amid a din of shrieks. His eyewitness lament over women and children put to death in a doomed town speaks across four centuries to a bombarded Gaza.",
        "excerpt": "thousands of innocent men, women, and children, in the midst of a horrible din of heartrending shrieks and cries, were tortured and put to death in so cruel and shameful a manner that no words would suffice to describe, nor no tears to bewail it . . . .",
        "source": "Otto von Guericke, eyewitness account of the Sack of Magdeburg (1631), trans. in James Harvey Robinson, Readings in European History (Boston, 1906); Hanover Historical Texts Project.",
        "href": "https://history.hanover.edu/texts/magde.html"
      },
      {
        "category": "literary",
        "title": "Euripides wrote The Trojan Women in 415 BC as the fresh Greek massacre of Melos still hung in the air, giving the stage over to captive mothers who cradle a murdered child. Hecuba's lament over little Astyanax, hurled from the walls of a fallen city, is the oldest voice for a young girl killed in Gaza today.",
        "excerpt": "Ah, what a death hath found thee, little one!\nHadst thou but fallen fighting, hadst thou known\nStrong youth and love and all the majesty\nOf godlike kings, then had we spoken of thee\nAs of one blessèd . . . could in any wise\nThese days know blessedness.",
        "source": "Euripides, The Trojan Women, trans. Gilbert Murray (London, 1905); Project Gutenberg eBook #35171.",
        "href": "https://www.gutenberg.org/files/35171/35171-h/35171-h.htm"
      },
      {
        "category": "literary",
        "title": "John Milton's sonnet on the 1655 slaughter of the Waldensians turns a distant massacre into a cry for divine remembrance, its most unbearable image a mother and infant rolled together down the rocks. It is grief refusing to let the killing of the innocent pass unrecorded, the same refusal owed to Gaza's dead.",
        "excerpt": "Avenge O lord thy slaughter'd Saints, whose bones\nLie scatter'd on the Alpine mountains cold,\nEv'n them who kept thy truth so pure of old\nWhen all our Fathers worship't Stocks and Stones,\nForget not: in thy book record their groanes\nWho were thy Sheep and in their antient Fold\nSlayn by the bloody Piemontese that roll'd\nMother with Infant down the Rocks.",
        "source": "John Milton, “On the Late Massacher in Piemont” (Sonnet XV, c. 1655), The Poetical Works of John Milton; Project Gutenberg eBook #1745.",
        "href": "https://www.gutenberg.org/cache/epub/1745/pg1745.txt"
      },
      {
        "category": "artistic",
        "title": "Gustav Mahler's Kindertotenlieder, or 'Songs on the Death of Children,' sets Friedrich Rückert's poems of parental bereavement to music of unbearable tenderness, the orchestra hushing as if the world itself mourned. Its refusal to console makes it the natural requiem for a young girl among the six killed in Gaza.",
        "excerpt": "A song cycle of five elegies for children who have died, in which a grieving parent watches the sun rise indifferently over a house emptied of its child. Mahler's music moves from stunned quiet to a storm and back to a final lullaby, imagining the little ones at rest as if only sleeping, sheltered now from every storm. It stands among the most desolate and humane laments ever written for the death of the young.",
        "source": "Gustav Mahler, Kindertotenlieder (composed 1901–1904, published 1905), texts by Friedrich Rückert; scores at IMSLP / Petrucci Music Library (public domain).",
        "href": "https://imslp.org/wiki/Kindertotenlieder_(Mahler,_Gustav)"
      },
      {
        "category": "artistic",
        "title": "Goya's The Third of May 1808 fixes forever the instant before civilians are shot by an occupying army, a white-shirted man flinging his arms wide beneath the lanterns as faceless soldiers take aim. Painted in fury and pity, it is Western art's enduring indictment of the state killing of the defenceless, a mirror to the dead of Gaza.",
        "excerpt": "A lantern throws harsh light on a huddle of Madrid townsfolk about to be executed by a rank of Napoleonic soldiers, whose faces we never see. At the centre a man in a white shirt throws his arms open in a gesture of despair and defiance, while the bodies of the already-shot lie in blood at his feet and others cover their eyes. Goya turns an ordinary night of reprisal into a timeless image of innocent civilians slaughtered by armed power.",
        "source": "Francisco de Goya, The Third of May 1808 (El tres de mayo de 1808 en Madrid), 1814, oil on canvas, Museo del Prado, Madrid.",
        "href": "https://en.wikipedia.org/wiki/The_Third_of_May_1808",
        "image": {
          "src": "/covers/gaza-israeli-strikes-civilians--a5.png",
          "alt": "Goya's painting The Third of May 1808: a man in a white shirt with arms flung wide kneels before a firing squad of Napoleonic soldiers at night, lit by a lantern, with the bodies of the already-executed lying in blood at his feet.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "spain-wildfires-casualties",
    "headline": "Wildfires sweeping Spain leave people dead and badly burned as a British couple are rescued from a ravine",
    "overview": "Wildfires raging across Spain have left casualties and forced evacuations, with a British couple badly burned after becoming trapped in a ravine before being rescued, according to reports. The death of a Belgian victim has prompted a dispute after the man's son questioned Spanish officials' account of the warnings that were given, while one village at the epicentre of the fires was left completely charred. Firefighters battled the blazes amid a punishing summer heat.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2x7441762o?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxPdmVtcWZWczZUZnlGX1dvakNYX0pNZUFPdE1TaXBuZGJJTXJNUXFtSGFkQ0ozM09LQkJmd1gtU2t0VmYwTmRVYjIya0hMSG9BUjNOY01heUV2dEZCU0FmTUtGSzRFOE5CTUVjVF9zQlF0MHpXdWg1MjAtNk9Fam00aWNkdDJxZXcyT2JfeFo3UE5zSmgwZFkycFRBYVBQOE1pVzdUZjV1ckU4akNRTzlFcm5vMi1jUkFsMlZfRw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/spain-wildfires-casualties.png",
      "alt": "A wall of wildfire flame consuming trees and brush at the edge of a scorched hillside.",
      "credit": "Photo: McCall Smokejumpers / U.S. Forest Service; via Wikimedia Commons"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When flames overran Rome in AD 64, terrified crowds fled through narrow streets only to find each refuge already ablaze — an ancient echo of the Spanish villagers and travellers scrambling from fire that outran every escape.",
        "excerpt": "The flames, which in full career overran the level districts first, then shot up to the heights, and sank again to harry the lower parts, kept ahead of all remedial measures... Often, while they glanced back to the rear, they were attacked on the flanks or in front; or, if they had made their escape into a neighbouring quarter, that also was involved in the flames.",
        "source": "Tacitus, The Annals, Book XV.38, trans. Alfred John Church and William Jackson Brodribb.",
        "href": "http://penelope.uchicago.edu/Thayer/E/Roman/Texts/Tacitus/Annals/15B*.html"
      },
      {
        "category": "historical",
        "title": "Samuel Pepys watched the Great Fire of London in 1666 arch over a mile of the city and wept, as pigeons singed their wings rather than abandon their homes — the same helpless awe felt before a village left completely charred in Spain.",
        "excerpt": "We staid till, it being darkish, we saw the fire as only one entire arch of fire from this to the other side the bridge, and in a bow up the hill for an arch of above a mile long: it made me weep to see it. The churches, houses, and all on fire and flaming at once; and a horrid noise the flames made, and the cracking of houses at their ruine.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for 2 September 1666.",
        "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September"
      },
      {
        "category": "literary",
        "title": "Virgil likened burning Troy to a wildfire mowing through a cornfield as Aeneas fled the doomed city — the archetype of a landscape consumed by flame and people running before it, as on the ridges of Spain.",
        "excerpt": "Thus, when a flood of fire by wind is borne, / Crackling it rolls, and mows the standing corn... The palace of Deiphobus ascends / In smoky flames, and catches on his friends.",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden.",
        "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm"
      },
      {
        "category": "literary",
        "title": "In Dante's Inferno, flakes of fire rain silently over a burning waste like snow with no wind — an image of fire as terror and awe made eternal, mirroring the ash and flame settling over scorched Spanish hills.",
        "excerpt": "O'er all the sand-waste, with a gradual fall, / Were raining down dilated flakes of fire, / As of the snow on Alp without a wind.",
        "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XIV, trans. Henry Wadsworth Longfellow.",
        "href": "https://www.gutenberg.org/files/1001/1001-h/1001-h.htm"
      },
      {
        "category": "artistic",
        "title": "Wagner's 'Magic Fire Music' closes Die Walküre as Wotan rings his sleeping daughter in a wall of flame — orchestral shimmer that captures both the beauty and the menace of fire, the terror and awe now loosed across Spain.",
        "excerpt": "The 'Feuerzauber' (Magic Fire Music) that ends Act III of Die Walkuere summons a ring of encircling flame through flickering strings and glowing brass. It renders fire as something at once protective and terrible, luminous and consuming. The score is the closest music comes to painting a living wall of fire.",
        "source": "Richard Wagner, Die Walkuere, WWV 86B, Act III, 'Feuerzauber' (Magic Fire Music), 1870.",
        "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Turner painted the Houses of Parliament dissolving into a furnace of light in 1834, the crowd a dark smudge before an overwhelming blaze — the sublime, annihilating fire that has now turned a Spanish village to cinders.",
        "excerpt": "The Burning of the Houses of Lords and Commons, 16 October 1834 depicts a colossal wall of orange flame consuming the Palace of Westminster, its heat reflected across the Thames. Turner reduces stone and crowd alike to shadow before the fire's blinding core. The painting is a study in the sublime terror and awe of a great conflagration.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835), oil on canvas, Cleveland Museum of Art (1942.647).",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_16_October_1834_-_1942.647_-_Cleveland_Museum_of_Art.jpg",
        "image": {
          "src": "/covers/spain-wildfires-casualties--a5.png",
          "alt": "J. M. W. Turner's painting of the Houses of Parliament engulfed in a towering blaze of orange and white flame, its fire reflected across the River Thames with onlookers as dark silhouettes.",
          "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835), Cleveland Museum of Art. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "tcs-ai-engineers-hiring",
    "headline": "India's Tata Consultancy Services plans up to 8,900 AI 'deployment' engineers and hunts for AI acquisitions",
    "overview": "Tata Consultancy Services, India's largest IT-services company, said it plans to build a team of up to 8,900 forward-deployed AI engineers — roughly 1% to 1.5% of its workforce — who embed with clients to speed the adoption of artificial intelligence. Chief Executive K. Krithivasan said the firm is also weighing acquisitions in AI, data security and cybersecurity, a shift after years of relying on organic growth. TCS is betting that AI will create new business rather than erode its outsourcing model.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMixgFBVV95cUxPZHVWMTZfdlZoNHBPbVhNSTktYk5yTzBaN3BOTWc2NjNhczhUWVJVTktLZld3WC0zeGEyREFDZk1kWkFjNzBFaXV0M3JSMC1mNFlPQU9DYy1palFFbTRoUFYxR1JZVDNRVmhCQzREYnMxOGd1cEFhNE9aeTFOVzhDTjF6UVY3b0RzUm5ReWIyQkQ2ZjF2OC1kNG40clpPNzhkTTJZOWJUckc0SUlaWVhaa1VFOVpkVXA3am9aY1I2bWlqODM3N2c?oc=5"
      },
      {
        "name": "Business Standard",
        "href": "https://www.business-standard.com/companies/news/tcs-plans-up-to-8-900-ai-deployment-engineers-seeks-ai-acquisitions-126071200332_1.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/tcs-ai-engineers-hiring.png",
      "alt": "A large data centre complex, representing the computing infrastructure behind artificial intelligence.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When TCS retools thousands of engineers around machines that think, it echoes the stocking-frame panic of 1812, when a single improved loom did the work of many and threw skilled hands into the street. Lord Byron rose in the Lords to defend the Luddites who smashed the machines that had made them superfluous.",
        "excerpt": "By the adoption of one species of Frame in particular, one man performed the work of many, and the superfluous labourers were thrown out of employment.",
        "source": "George Gordon, Lord Byron, maiden speech in the House of Lords on the Frame Work Bill, 27 February 1812 (Hansard, HL Deb vol. 21 cc964-79).",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill"
      },
      {
        "category": "historical",
        "title": "A century after the Luddites, and a century before TCS's AI pivot, John Maynard Keynes gave the fear its modern name. Writing in the depths of the machine age, he warned of a 'new disease' that would haunt every workforce automation outran.",
        "excerpt": "We are being afflicted with a new disease of which some readers may not yet have heard the name, but of which they will hear a great deal in the years to come – namely, technological unemployment. This means unemployment due to our discovery of means of economising the use of labour outrunning the pace at which we can find new uses for labour.",
        "source": "John Maynard Keynes, \"Economic Possibilities for our Grandchildren\" (1930), in Essays in Persuasion.",
        "href": "https://www.marxists.org/reference/subject/economics/keynes/1930/our-grandchildren.htm"
      },
      {
        "category": "literary",
        "title": "TCS's plan to field up to 8,900 AI engineers and buy its way deeper into artificial minds recalls the factory that first gave us the word 'robot.' In Capek's play, manufactured workers are cheaper and more efficient than people until the humans they replace become obsolete.",
        "excerpt": "A Robot can replace two and a half workmen. The human machine was terribly imperfect. It had to be removed sooner or later.",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), Act I, trans. Paul Selver and Nigel Playfair (Doubleday, Page & Co., 1923); spoken by Fabry.",
        "href": "https://www.gutenberg.org/files/59112/59112-h/59112-h.htm"
      },
      {
        "category": "literary",
        "title": "As a services giant bets its future on ever-smarter machines, Samuel Butler's Victorian satire reads like prophecy. His 'Book of the Machines' imagined mechanical intelligence advancing until humanity is quietly demoted beneath its own creations.",
        "excerpt": "we shall gradually be superseded by our own creatures, till we rank no higher in comparison with them, than the beasts of the field with ourselves.",
        "source": "Samuel Butler, Erewhon, Chapter XXIII, \"The Book of the Machines\" (1872).",
        "href": "https://en.wikisource.org/wiki/Erewhon/Chapter_23"
      },
      {
        "category": "artistic",
        "title": "The relentless clangour of a workforce reorganized around machinery has its soundtrack in Mosolov's Soviet factory portrait, where hammering ostinatos and a shaken iron sheet turn the assembly line into music. It is the noise of human labor absorbed into the rhythm of the machine, a fitting overture to an AI-driven retooling.",
        "excerpt": "Composed in 1926-27 as the opening movement of the ballet Steel, Mosolov's Iron Foundry (Zavod) is a churning orchestral machine: pounding brass and percussion imitate stamping presses while a literal sheet of iron is rattled in the score. It is the definitive work of Soviet machine-age music, celebrating industry as pure mechanized motion.",
        "source": "Alexander Mosolov, Steel (Iron Foundry / Zavod), Op. 19 (1926-27), full score, Universal Edition / Muzgiz, 1929.",
        "href": "https://imslp.org/wiki/Steel,_Op.19_(Mosolov,_Alexander)"
      },
      {
        "category": "artistic",
        "title": "Menzel's vast canvas of a rolling mill is the industrial revolution made flesh: dozens of workers dwarfed and lit by the glare of molten iron, their bodies bent to the tempo of the machinery. As TCS reorganizes its people around artificial intelligence, the painting's subtitle, 'Modern Cyclopes,' captures the old question of who serves whom.",
        "excerpt": "In this monumental 1875 painting, Menzel shows a Silesian rolling mill where laborers are subordinated to the churning iron works, illuminated by the incandescent glow of the metal. Based on weeks of on-site sketches, it was among the first great European paintings to depict modern factory production and the human cost of mechanization.",
        "source": "Adolph Menzel, The Iron Rolling Mill (Modern Cyclopes) [Eisenwalzwerk], 1875, oil on canvas, 158 x 254 cm, Alte Nationalgalerie, Berlin.",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/tcs-ai-engineers-hiring--a5.png",
          "alt": "Adolph Menzel's 1875 painting The Iron Rolling Mill: workers laboring amid the fiery glow and machinery of a 19th-century iron foundry.",
          "credit": "Adolph Menzel, The Iron Rolling Mill (Modern Cyclopes), 1875, Alte Nationalgalerie, Berlin. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "bjorn-ulvaeus-ai-music",
    "headline": "ABBA's Björn Ulvaeus says AI-generated music is only getting started: 'We ain't seen nothing yet'",
    "overview": "Björn Ulvaeus, the ABBA co-founder and songwriter, warned that AI-generated music is advancing far faster than the public realises, telling The Associated Press 'we ain't seen nothing yet.' A longtime campaigner for songwriters' rights, Ulvaeus argued that artists must be consulted and paid as the technology reshapes how music is made. He has been experimenting with AI tools himself while cautioning about their disruptive potential.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxOUjhLQklYRVJnblZyLW5sTW1yaVVGZGtGYjAtRHl6eEpSeTRrMFhLa0w2WW5QNGpLSmxrMi1DLVFnWURua3g1WGliaTlqaEVobW4tdC14NjN1YUg2cmVJRkRFQjM0QXZsWVc4TmFNd29vZ1RlZkp0QTN5bTRSNjdCeDVZN3E1dGhaUXQ3N0pPY3R0NmVFaVVkZGpJTUFWU09nNlJtNDFRQ0YtSWRxQm5aamJMUE5ncDNnWmZuaEVvRkhQYUo0Ql95QQ?oc=5"
      },
      {
        "name": "MusicTech",
        "href": "https://musictech.com/news/music/abba-bjorn-ulvaeus-ai/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/bjorn-ulvaeus-ai-music.png",
      "alt": "Björn Ulvaeus, the ABBA co-founder, speaking at an event.",
      "credit": "Photo: via Wikimedia Commons (CC BY)"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before generative models, Jacques de Vaucanson built a life-sized android that actually breathed and fingered a real flute, dazzling 1738 Paris with a machine that seemed to make music with a human soul. Ulvaeus's warning echoes the very first crowd to ask whether a mechanism could truly play.",
        "excerpt": "By the Action of the Lever, which increases the Opening of the Lips, the Action of a living Man is imitated, who increases that Opening for the low Sounds.",
        "source": "Jacques de Vaucanson, An Account of the Mechanism of an Automaton, or Image Playing on the German-Flute (London: T. Parker, 1742), trans. J. T. Desaguliers.",
        "href": "https://archive.org/details/b30358711"
      },
      {
        "category": "historical",
        "title": "In 1906 the march king John Philip Sousa raged that phonographs and player pianos would 'can' music and hollow out human musicianship, the same fear of automation Ulvaeus now voices about AI. A century apart, both ask what happens to the human soul when a machine performs.",
        "excerpt": "Sweeping across the country with the speed of a transient fashion in slang or Panama hats, political war cries or popular novels, comes now the mechanical device to sing for us a song or play for us a piano, in substitute for human skill, intelligence, and soul.",
        "source": "John Philip Sousa, “The Menace of Mechanical Music,” Appleton’s Magazine 8 (September 1906): 278–84.",
        "href": "https://rogershermanhouse.com/2020/07/31/the-menace-of-mechanical-music-by-john-philip-sousa/"
      },
      {
        "category": "literary",
        "title": "In Hoffmann's 1816 tale, Nathaniel falls for Olimpia, whose flawless singing and playing turn out to be the clockwork of an automaton, not a living woman. Her 'disagreeably perfect' performance foreshadows the uncanny, soulless precision that Ulvaeus fears from AI-generated song.",
        "excerpt": "Her playing and singing has the disagreeably perfect, but insensitive time of a singing machine, and her dancing is the same.",
        "source": "E. T. A. Hoffmann, “The Sand-Man” (Der Sandmann, 1816), in Weird Tales, trans. J. Y. Bealby.",
        "href": "https://gutenberg.net.au/ebooks06/0605791h.html"
      },
      {
        "category": "literary",
        "title": "Samuel Butler's 1872 'Book of the Machines' imagined machinery evolving into a new form of life that would quietly outgrow and supplant its makers, the deep anxiety beneath Ulvaeus's 'we ain't seen nothing yet.' Butler already wondered whether creators would be demoted by their own creations.",
        "excerpt": "seeing ourselves gradually superseded by our own creatures, till we rank no higher in comparison with them, than the beasts of the field with ourselves.",
        "source": "Samuel Butler, Erewhon; or, Over the Range (1872), ch. 23, “The Book of the Machines.”",
        "href": "https://en.wikisource.org/wiki/Erewhon/Chapter_23"
      },
      {
        "category": "artistic",
        "title": "In 1791 Mozart grudgingly composed a monumental fantasia not for human hands but for an 'Orgelwalze', a clockwork organ that played automatically from a pinned barrel. It is a landmark case of a great songwriter handing his art to a machine, precisely the boundary Ulvaeus now watches AI cross.",
        "excerpt": "Mozart wrote this dark, contrapuntal Fantasia in F minor to be reproduced automatically by a mechanical organ inside a memorial clock, a machine that would perform it perfectly, forever, with no player present. He privately grumbled about writing for the 'childish' instrument, yet produced one of his grandest keyboard structures. The score is a document of genius composing directly for automation two centuries before the algorithm.",
        "source": "Wolfgang Amadeus Mozart, Fantasia in F minor, K.608 (“für eine Orgelwalze”), 1791.",
        "href": "https://imslp.org/wiki/Fantasia_in_F_minor,_K.608_(Mozart,_Wolfgang_Amadeus)"
      },
      {
        "category": "artistic",
        "title": "This 1789 engraving exposes the secret of 'the Turk', a chess-playing automaton that astonished Europe by seemingly thinking on its own, until it was revealed that a hidden human operator worked the machine. It is the perfect emblem for AI music: dazzling artifice concealing borrowed human labor, exactly the deception Ulvaeus warns audiences to look past.",
        "excerpt": "A cutaway cross-section of Wolfgang von Kempelen's chess-playing 'Turk', the turbaned mechanical figure seated at its cabinet, drawn to reveal how a concealed human director could sit inside and secretly move the pieces. The image lays bare the illusion of an autonomous machine mind, and the very human work hidden within the marvel.",
        "source": "Joseph Friedrich Freiherr von Racknitz, Über den Schachspieler des Herrn von Kempelen und dessen Nachbildung (Leipzig and Dresden, 1789).",
        "href": "https://commons.wikimedia.org/wiki/File:Racknitz_-_The_Turk_3.jpg",
        "image": {
          "src": "/covers/bjorn-ulvaeus-ai-music--a5.png",
          "alt": "1789 engraving showing a cutaway of the Turk chess-playing automaton, a turbaned figure at a cabinet, revealing how a hidden operator could sit inside.",
          "credit": "Joseph Racknitz, 1789, Humboldt University Library, via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "japan-gpif-alternative-investments",
    "headline": "Japan to push its $1.8 trillion public pension fund, the GPIF, toward more alternative investments",
    "overview": "Japan plans to steer its Government Pension Investment Fund — the world's largest, holding roughly $1.8 trillion — to increase holdings of alternative assets such as private equity, infrastructure and real estate, the Nikkei reported. A government panel is expected to recommend raising the alternatives allocation from about 1.7% toward the 5% ceiling, aiming to broaden returns and reduce risk. The move is tied to a wider push to channel investment into domestic growth sectors.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNT3BCNEk4aVozc3pMcDBVN1lqYVRsT1B6VU5UOVNVdWJNWjU2Um9lZ1c2dURqREUtbDZsdzZrUVlsUVJ5MVVnbnV0b0FyWUJJRmR4WGsxZ1AzNzhwbzhUbmxiV1NOZzgwT0NWRmVPaTlLdnY5Z0t4SExITEVhQVlaNWRJQk1jUXdSTGpKTVdqdWpBUk5hbDBiLVRoZkNxSVZzc2o0WGY2RWFnQktlVHZvY0NOYXlsLXcyVGcxVkF4XzBvVmNMRm9OamZBVzc?oc=5"
      },
      {
        "name": "Nikkei Asia",
        "href": "https://asia.nikkei.com/business/finance/japan-wants-pension-whale-gpif-to-dive-deeper-into-alternative-investments"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/japan-gpif-alternative-investments.png",
      "alt": "The Marunouchi financial district in Tokyo, home to major banks and investors.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Like the GPIF's guardians deciding how to deploy a nation's fortune, Pericles' Athens controlled the pooled treasure of an entire alliance — and critics howled that the stewards were spending the common war-chest to gild their own city.",
        "excerpt": "And surely Hellas is insulted with a dire insult and manifestly subjected to tyranny when she sees that, with her own enforced contributions for the war, we are gilding and bedizening our city, which, for all the world like a wanton woman, adds to her wardrobe precious stones and costly statues and temples worth their millions.",
        "source": "Plutarch, \"Life of Pericles,\" 12.2, in Plutarch's Lives, trans. Bernadotte Perrin (Loeb Classical Library, 1916).",
        "href": "http://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
      },
      {
        "category": "historical",
        "title": "Japan weighing riskier alternative bets with its $1.7 trillion pension pot recalls 1720, when a whole nation chased extravagant returns — and the mania grew so blind that people poured money into a venture whose very purpose was kept a secret.",
        "excerpt": "But the most absurd and preposterous of all, and which shewed, more completely than any other, the utter madness of the people, was one started by an unknown adventurer, entitled \"A company for carrying on an undertaking of great advantage, but nobody to know what it is.\"",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (London, 1841), on the South Sea Bubble.",
        "href": "https://www.gutenberg.org/cache/epub/24518/pg24518.txt"
      },
      {
        "category": "literary",
        "title": "The parable of the talents is the original sermon against hoarding: the servant who buries his master's money in the ground for safekeeping is condemned, while the lord insists the coin should at least have been put out at interest — the very case now being made to the GPIF's cautious stewards.",
        "excerpt": "His lord answered and said unto him, Thou wicked and slothful servant, thou knewest that I reap where I sowed not, and gather where I have not strawed: Thou oughtest therefore to have put my money to the exchangers, and then at my coming I should have received mine own with usury.",
        "source": "The Gospel According to St. Matthew 25:26-27, King James Version (1611).",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "literary",
        "title": "Aesop's miser melts his whole fortune into a lump of gold and buries it, gloating but never spending — until it is stolen and a neighbor points out that idle, hoarded wealth was worth no more than a brick in a hole. It is the fable behind every warning against a treasure left to sit.",
        "excerpt": "Don't take it so much to heart, my friend; put a brick into the hole, and take a look at it every day: you won't be any worse off than before, for even when you had your gold it was of no earthly use to you.",
        "source": "Aesop, \"The Miser,\" in Aesop's Fables: A New Translation by V. S. Vernon Jones (London, 1912).",
        "href": "https://www.gutenberg.org/cache/epub/11339/pg11339.txt"
      },
      {
        "category": "artistic",
        "title": "Wagner's Das Rheingold turns the question of hoarded versus working wealth into music-drama: a vast golden treasure guarded beneath the river is seized, forged into a ring of limitless power, and cursed — the price of turning a common trust into a private hoard.",
        "excerpt": "In the opening opera of the Ring cycle, the Rhinemaidens' guarded gold — a shining common treasure — is stolen by Alberich, who renounces love to forge it into a ring of boundless power. What was once a communal fortune becomes a jealously hoarded object, and its accumulation brings only a curse, greed, and ruin upon every hand that holds it.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854; first performed Munich, 1869).",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys's 1514 panel shows a money changer intently weighing gold coins while his wife's attention drifts from her prayer book to the glittering scales — a Renaissance meditation on custody of wealth, the pull of fortune, and where a steward's true eyes should rest.",
        "excerpt": "The banker weighs his coins with fixed concentration while his wife, a devotional book open before her, turns to watch the gold; a convex mirror on the table catches a window and a reading figure, and the meticulous still life of coins, pearls, and scales makes the whole scene a quiet moral emblem about money, value, and attention.",
        "source": "Quentin Matsys (Quinten Metsys), The Money Changer and His Wife (The Moneylender and his Wife), 1514, oil on panel, Musée du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/japan-gpif-alternative-investments--a5.png",
          "alt": "A 16th-century money changer weighs gold coins on a balance while his richly dressed wife pauses over an illuminated prayer book to watch, with coins, pearls, and a convex mirror on the table before them.",
          "credit": "Quentin Matsys, The Money Changer and His Wife (1514), Musée du Louvre. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "iraq-pm-washington-oil-deals",
    "headline": "Iraq's prime minister to visit Washington on Monday with oil and gas deals expected",
    "overview": "Iraqi Prime Minister Mohammed Shia al-Sudani will visit Washington on Monday, where a series of oil and gas agreements between Baghdad and US companies are expected to be signed. Officials say the memorandums of understanding involve firms including Chevron, Halliburton and HKN and are aimed at boosting Iraq's production and creating export routes that reduce its exposure to disruption in the Strait of Hormuz. Discussions are also expected on a proposed multibillion-dollar energy and development fund.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOOW5nMzhBUlZCM1pkTTFfbzBjZTVPQ2hKR19BQTRsQzNYenR1UEhYdDY0eldGOEpuU2JyeVpVeUhMTjh4aVdxZjVtS3pibnFJWkFKS09hR3NtNHlzWElhcUNxWENpZVRrUVRyeXJuSHpwN0R3cnp0WWFPMlMzcnRJNlFCTHM2NHowM3NYaDNyOWJ6b1Z4V0Y5ZG1IYTJEbkRzb21pUVBFNVJ4QlU4VkdyRWZaM2I3dXBHdHhiYk53?oc=5"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2650611/middle-east"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/iraq-pm-washington-oil-deals.png",
      "alt": "A view of Basra, the heart of Iraq's oil industry.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before pipelines and production-sharing contracts, the Persian great king dispatched envoys demanding 'earth and water' from every lesser city as the price of coexistence. Iraq's premier travels to Washington bearing the modern equivalent of that ancient tribute: a claim on the wealth beneath his soil, and the question of who commands it.",
        "excerpt": "Having come to Sardis he proceeded first to send heralds to Hellas, to ask for earth and water",
        "source": "Herodotus, The History of Herodotus, Book VII (Polymnia), section 32, trans. G. C. Macaulay (London: Macmillan, 1890).",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Macaulay)/Book_VII"
      },
      {
        "category": "historical",
        "title": "On Valentine's Day 1945, aboard the USS Quincy in the Suez Canal, a desert king and an American president forged the 'oil-for-security' understanding that still shapes the region. An Iraqi prime minister's oil-and-gas mission to Washington descends directly from that first great bargain between a resource-rich smaller nation and the world's foremost power.",
        "excerpt": "He expressed special interest in irrigation, tree planting and water power which he hoped would be developed after the war in many countries, including the Arab lands.",
        "source": "Memorandum of Conversation Between the King of Saudi Arabia (Abdul Aziz Al Saud) and President Roosevelt, February 14, 1945, Aboard the U.S.S. 'Quincy'; Foreign Relations of the United States, Diplomatic Papers, 1945, Volume VIII, Document 2 (711.90F/2-1445).",
        "href": "https://history.state.gov/historicaldocuments/frus1945v08/d2"
      },
      {
        "category": "literary",
        "title": "Stevenson's tale turns on a chart marked with the 'bulk of treasure' and the deadly bargaining it provokes among those who would possess it. It is the oldest fable of buried wealth: riches sleeping in the ground, and the men who scheme, sail, and betray to control them.",
        "excerpt": "a canvas bag that gave forth, at a touch, the jingle of gold",
        "source": "Robert Louis Stevenson, Treasure Island (London: Cassell & Co., 1883).",
        "href": "https://www.gutenberg.org/files/120/120-h/120-h.htm"
      },
      {
        "category": "literary",
        "title": "Ben Jonson opens his comedy with Volpone kneeling before his hoard as before a shrine, a hymn to the lure of riches that curdles into corruption. It is the timeless warning shadowing every windfall drawn from the earth: the blessing of wealth and its curse are the same coin.",
        "excerpt": "Good morning to the day; and next, my gold: / Open the shrine, that I may see my Saint. ... Hail the world's soul, and mine! more glad than is / The teeming earth to see the long'd-for sun",
        "source": "Ben Jonson, Volpone; or, The Fox (1606), Act I, Scene 1.",
        "href": "https://www.gutenberg.org/cache/epub/4039/pg4039.txt"
      },
      {
        "category": "artistic",
        "title": "Wagner's Ring cycle opens with gold hidden beneath the Rhine, seized by one who renounces love to forge a ring of world-power and, in the taking, lays a curse upon the treasure. No work better captures the theme haunting every oil deal: buried riches that promise dominion and deliver ruin to whoever grasps them.",
        "excerpt": "In the opening scene the Rhinemaidens guard a hoard of gold glowing beneath the river; the dwarf Alberich, spurned in love, forswears love itself to steal it and hammer it into a ring that will make its bearer master of the world. From that theft flows a curse that will destroy gods and men alike, Wagner's parable of wealth torn from the earth and the doom that clings to it.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (first part of Der Ring des Nibelungen), composed 1854; full scores and libretto, public domain.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)"
      },
      {
        "category": "artistic",
        "title": "Holbein's double portrait shows two envoys of a foreign court flanked by instruments of learning and power, with a hidden skull warning that all worldly bargains end in dust. It is the very image of diplomacy: emissaries between nations, the trappings of wealth on display, and mortality lurking beneath the ceremony of the treaty table.",
        "excerpt": "Oil and tempera on oak, 1533: the French ambassador Jean de Dinteville and the bishop-envoy Georges de Selve stand between a table of globes, sundials and lutes, while a distorted skull floats across the foreground, a memento mori beneath the pomp of embassy.",
        "source": "Hans Holbein the Younger, The Ambassadors (Jean de Dinteville and Georges de Selve), 1533, oil and tempera on oak, The National Gallery, London.",
        "href": "https://commons.wikimedia.org/wiki/File:Hans_Holbein_the_Younger_-_The_Ambassadors_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/iraq-pm-washington-oil-deals--a5.png",
          "alt": "Two richly dressed 16th-century envoys stand on either side of a two-tier table bearing globes, scientific instruments and a lute, with a distorted anamorphic skull stretched across the foreground.",
          "credit": "Hans Holbein the Younger, The Ambassadors (1533), The National Gallery, London; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "david-willey-bbc-correspondent-dies",
    "headline": "David Willey, the BBC's long-serving Rome and Vatican correspondent, dies at 93",
    "overview": "David Willey, who reported from Rome for the BBC for more than half a century and became one of the world's foremost chroniclers of the Vatican, has died at the age of 93. Appointed the BBC's Rome correspondent in 1972, he covered five popes and was the corporation's longest-serving foreign correspondent, earning an OBE in 2004 for services to broadcast journalism. Colleagues remembered him as an authoritative and generous witness to decades of Italian and Church history.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn9403518jro?at_medium=RSS&at_campaign=rss"
      },
      {
        "name": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/David_Willey_(journalist)"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/david-willey-bbc-correspondent-dies.png",
      "alt": "St Peter's Basilica in Vatican City, the beat David Willey covered for the BBC for decades.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Like David Willey filing dispatches from Rome across five papacies, the Venerable Bede sat in his Northumbrian monastery in the 8th century, patiently gathering testimony and setting down the record so that later ages would remember. Both were faithful chroniclers who believed that the honest witnessing of events was itself a moral duty.",
        "excerpt": "For if history relates good things of good men, the attentive hearer is excited to imitate that which is good; or if it recounts evil things of wicked persons, none the less the conscientious and devout hearer or reader, shunning that which is hurtful and wrong, is the more earnestly fired to perform those things which he knows to be good, and worthy of the service of God.",
        "source": "Bede, The Ecclesiastical History of the English Nation, Preface addressed to King Ceolwulf (completed c. 731 AD), trans. from the Latin.",
        "href": "https://www.gutenberg.org/cache/epub/38326/pg38326-images.html"
      },
      {
        "category": "historical",
        "title": "William Howard Russell, reporting for The Times from the Crimea in 1854, became the first great war correspondent, insisting on describing only what passed before his own eyes. Like Willey travelling with five popes on more than forty journeys, Russell embodied the reporter who stands at history's edge and records it as it happens.",
        "excerpt": "They swept proudly past, glittering in the morning sun in all the pride and splendour of war. ... I shall proceed to describe, to the best of my power, what occurred under my own eyes.",
        "source": "William Howard Russell, dispatch on the Charge of the Light Brigade, The Times, 14 November 1854.",
        "href": "https://en.wikisource.org/wiki/The_Times/1854/News/The_Charge_of_the_Light_Brigade"
      },
      {
        "category": "literary",
        "title": "In Aeschylus's Agamemnon the Herald returns after ten years to announce the fall of Troy, kissing the soil of his homeland as he delivers his news. He is the archetype of the messenger bearing tidings from afar, as Willey for half a century carried the news of Rome and the Vatican back to listeners across the world.",
        "excerpt": "All hail, soil of Argos, land of my fathers! On this happy day in the tenth year I have come to you.",
        "source": "Aeschylus, Agamemnon, lines 503-504, trans. Herbert Weir Smyth (Loeb Classical Library, 1926).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0004%3Acard%3D489"
      },
      {
        "category": "literary",
        "title": "Herodotus, the 'Father of History', opens his great work by naming himself as the one who inquires, observes, and sets down events so they will not be forgotten. His self-appointed role as narrator and witness is the literary ancestor of every long-serving correspondent, Willey among them, who reports so that human deeds keep their 'meed of glory'.",
        "excerpt": "THESE are the researches of Herodotus of Halicarnassus, which he publishes, in the hope of thereby preserving from decay the remembrance of what men have done, and of preventing the great and wonderful actions of the Greeks and the Barbarians from losing their due meed of glory; and withal to put on record what were their grounds of feud.",
        "source": "Herodotus, The History, Book I, opening proem, trans. George Rawlinson.",
        "href": "https://en.wikisource.org/wiki/History_of_Herodotus/Book_1"
      },
      {
        "category": "artistic",
        "title": "Handel's aria 'How beautiful are the feet' in Messiah exalts the herald whose very footsteps are blessed because they bring glad tidings. It is a musical hymn to the bearer of good news, an image that catches the vocation of Willey, whose voice carried word of Rome to generations of the faithful.",
        "excerpt": "How beautiful are the feet of them that preach the gospel of peace, and bring glad tidings of good things.",
        "source": "George Frideric Handel, Messiah, HWV 56 (1741), Part II, air 'How beautiful are the feet' (libretto after Romans 10:15 / Isaiah 52:7). Public-domain scores at IMSLP.",
        "href": "https://imslp.org/wiki/Messiah,_HWV_56_(Handel,_George_Frideric)"
      },
      {
        "category": "artistic",
        "title": "Caravaggio's Inspiration of Saint Matthew, painted for a church in Rome, shows the evangelist caught mid-sentence at his desk as an angel dictates, the chronicler faithfully committing the news to the page. It is the perfect emblem of the Rome-based recorder of sacred events, the calling David Willey pursued for half a century.",
        "excerpt": "The evangelist Matthew, quill in hand and knee braced on a stool, turns from his book toward a descending angel who counts out the words on his fingers; the scribe, half-rising, strains to catch and set down every syllable of the message he has been given to record.",
        "source": "Caravaggio (Michelangelo Merisi da Caravaggio), The Inspiration of Saint Matthew (San Matteo e l'angelo), 1602, oil on canvas, Contarelli Chapel, San Luigi dei Francesi, Rome.",
        "href": "https://commons.wikimedia.org/wiki/File:Caravaggio_-_San_Matteo_e_l%27angelo.jpg",
        "image": {
          "src": "/covers/david-willey-bbc-correspondent-dies--a5.png",
          "alt": "Caravaggio's painting The Inspiration of Saint Matthew, showing the evangelist at his writing desk turning to an angel who dictates as he records the gospel.",
          "credit": "Caravaggio, The Inspiration of Saint Matthew (1602), San Luigi dei Francesi, Rome. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "mcgregor-loses-ufc-329",
    "headline": "Conor McGregor loses his UFC comeback to Max Holloway at UFC 329 after an early knee injury",
    "overview": "Conor McGregor's long-awaited return to the UFC ended in defeat as he lost to Max Holloway at UFC 329, hampered by a knee injury suffered in the opening round. The former two-division champion, who had been out of the octagon for years, was unable to recover after the early setback. The loss cast fresh doubt over the 37-year-old Irishman's future in mixed martial arts.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQcWZrdnNJYzI3MDVrVXRxbjN1aFpMTFh4XzBoaENsS0lQWXRlNGVkVGozMm1MY2hyYTE5cHJQZGRHUGxQZEZ2Z2xXOWxXTHhIQTFkdlRfaVVieHpBekUybmQ3ZkhUMnhBaGR3V3lyZm1zNGJqNWt2NnhaR3hBbDZvS2hOX0s5bElLOGlzM21iMHdfMjdoNkVLNDNnTU5LRlFq?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxNRmZsTE1zVlRPWkRRY19pQmU1Y0tBSURCR3kzcjM4U3RoY3NOS21YWmdpMGhXbWRRdkE0RnQwbkdNVzV3N1BuWDR4ZjlkT2hnVDhKNVA3YXVHb3UyM0xZVzhwVVJNNW01RzlLdHd6cmhaX3o0YnVReFAxWkZBTWgyd2JkLXdSZUR1Uk1iM3IxcnZZNlNfNWJTYUdvOWZ5azhY?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/mcgregor-loses-ufc-329.png",
      "alt": "The Irish mixed martial artist Conor McGregor.",
      "credit": "Photo: via Wikimedia Commons (CC BY)"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Milo of Croton, six-time Olympic wrestling champion, was the McGregor of the ancient games until age and pride undid him. Like the Irishman reaching for one comeback too many, the old strongman thrust his hands into a task his prime could have managed and found them fatally trapped.",
        "excerpt": "He came across in the land of Crotona a tree-trunk that was drying up; wedges were inserted to keep the trunk apart. Milo in his pride thrust his hands into the trunk, the wedges slipped, and Milo was held fast by the trunk until the wolves—a beast that roves in vast packs in the land of Crotona—made him their prey.",
        "source": "Pausanias, Description of Greece 6.14.8 (trans. W. H. S. Jones, Loeb Classical Library).",
        "href": "https://myths.uvic.ca/PAUS1-6.html"
      },
      {
        "category": "historical",
        "title": "In 1910 James J. Jeffries, the undefeated heavyweight champion, was coaxed from six years of retirement as the 'Great White Hope' to reclaim the throne from Jack Johnson. The rusted, weight-drained legend was battered and stopped in the fifteenth round at Reno—the aging champion's comeback ending exactly as McGregor's did, in a body that no longer answered.",
        "excerpt": "Jeffries had walked away undefeated and unbeaten, then let promoters and a nation's expectations drag him back into the ring at thirty-five after years of ease. He shed a hundred pounds for the fight but could not shed the years; Johnson toyed with him, cut him, and knocked him through the ropes, and the invincible man of the previous era was carried off as a cautionary tale about the comeback that should never have been made.",
        "source": "'World's Championship Battle, July 4, 1910—Round 14' (photographic print of the Johnson–Jeffries fight, Reno, Nevada), Library of Congress Prints and Photographs Division.",
        "href": "https://www.loc.gov/item/96513915/"
      },
      {
        "category": "literary",
        "title": "Achilles, the greatest fighter of the age, kills Lycaon while openly naming the doom that shadows him—the hero who knows an arrow will one day fell even the mightiest body. McGregor, felled by his own knee before the final bell, is the modern echo of the warrior whose invincibility ends at a single vulnerable point.",
        "excerpt": "Therefore, my friend, you too shall die. Why should you whine in this way? Patroclus fell, and he was a better man than you are. I too—see you not how I am great and goodly? I am son to a noble father, and have a goddess for my mother, but the hands of doom and death overshadow me all as surely. The day will come, either at dawn or dark, or at the noontide, when one shall take my life also in battle, either with his spear, or with an arrow sped from his bow.",
        "source": "Homer, The Iliad, Book XXI (trans. Samuel Butler), The Internet Classics Archive.",
        "href": "https://classics.mit.edu/Homer/iliad.21.xxi.html"
      },
      {
        "category": "literary",
        "title": "Samson, the strongest of men, is brought low not by a greater warrior but by his own overconfidence—rising to fight 'as at other times before' only to find his power gone. The fallen strongman ground down in the prison house is the ancient image of a champion who trusts a strength that has quietly deserted him.",
        "excerpt": "And he awoke out of his sleep, and said, I will go out as at other times before, and shake myself. And he wist not that the LORD was departed from him. But the Philistines took him, and put out his eyes, and brought him down to Gaza, and bound him with fetters of brass; and he did grind in the prison house.",
        "source": "The Holy Bible, King James Version, Judges 16:20–21. Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Judges"
      },
      {
        "category": "artistic",
        "title": "Chopin's Marche funèbre, the funeral march at the heart of his Piano Sonata No. 2, is the world's archetypal music for a fallen hero—played at the graves of the great. Its slow, tolling tread is the fitting soundtrack to a champion carried out of the arena, the roar of the crowd curdled into a dirge.",
        "excerpt": "The third movement, marked '3. Marche funèbre,' unfolds as a heavy, tolling procession in B-flat minor before opening into a fragile, consoling middle section and sinking back into the funeral tread—a sonic image of grandeur brought to the grave that has accompanied the mourning of the celebrated for nearly two centuries.",
        "source": "Frédéric Chopin, Piano Sonata No. 2 in B-flat minor, Op. 35, third movement (Marche funèbre), c. 1839. Public-domain scores at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)"
      },
      {
        "category": "artistic",
        "title": "The 'Boxer of Quirinal,' a Hellenistic bronze of a seated fighter, shows a battered champion at rest—face swollen, ears torn, hands still wrapped, turning as if the next blow has already landed. It is antiquity's most human portrait of the wounded warrior after the fight is lost, the very image of McGregor slumped and broken at UFC 329.",
        "excerpt": "The seated bronze boxer leans forward in exhaustion, his cauliflower ears, broken nose, and cut, swollen face rendered in copper-inlaid detail, his leather-bound fists resting on his thighs. He twists his head upward with a look of weary defeat—not the triumphant athlete of earlier Greek art, but a bruised, aging fighter contemplating what the ring has cost him.",
        "source": "'Boxer of Quirinal' (Boxer at Rest), Greek Hellenistic bronze, c. 100–50 BC, Museo Nazionale Romano, Palazzo Massimo alle Terme, Rome. Photograph via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Boxer_of_Quirinal,_Greek_Hellenistic_bronze_sculpture_of_a_sitting_nude_boxer_at_rest,_100-50_BC,_Palazzo_Massimo_alle_Terme,_Rome_(13332932055).jpg",
        "image": {
          "src": "/covers/mcgregor-loses-ufc-329--a5.png",
          "alt": "Hellenistic bronze sculpture of a seated, battered nude boxer at rest, his fists still bound in leather straps, turning his bruised face upward.",
          "credit": "Boxer of Quirinal (Boxer at Rest), c. 100–50 BC, Palazzo Massimo alle Terme, Rome. Photo: Carole Raddato, via Wikimedia Commons, CC BY-SA 2.0."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "footballers-brain-changes-study",
    "headline": "Study finds retired professional soccer players show brain changes but no measurable cognitive decline",
    "overview": "Retired professional soccer players show structural changes in their brains and high rates of anxiety and depression, but no signs of cognitive decline, according to new research presented at the Alzheimer's Association International Conference. Researchers at Imperial College London compared MRI scans of 142 former players aged 30 to 60 with people who had never played contact sports, finding reduced grey matter but normal performance on cognitive tests. The findings echo the team's earlier work on retired rugby players and add to the debate over the long-term effects of heading the ball.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi5AFBVV95cUxOdl84NU42YjZtTXV2Q0JtLUxNV2hWLVZBcmRnbGk2TlhzWXEyeVRnY0ZMR1doZUJzZFdSeHRMbUwtX1NPSlItWkVCYW5zVWtUa1czOTFaTENGZDdQU04wVFhDZEVMaHJ2SmtZb1RZNlZDcDBBNkdmMHB0LXN6dmhXUW5FWkxjR0IwUVZWd2ZIOXJ0RHBPMVUtdkl3RVhqUWU3UnFXakN2SUd0UEEtRkxaNTVScGMyRUVmcEYzcl82Wm14TWphMkRZUnY5MFc3aFJubEZRNzlTTXU4dXpaNTdDcWIzb3A?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://edition.cnn.com/2026/07/12/health/soccer-brain-health-wellness"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/footballers-brain-changes-study.png",
      "alt": "A footballer leaps to head the ball during a match.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly two thousand years before scans revealed footballers' altered brains, the physician Galen watched the athletes of the Roman world and warned that the very training meant to make a body invincible was quietly wearing it down. His image of siege engines shaking a wall to its foundations reads like an ancient description of repeated impacts and their slow, hidden cost.",
        "excerpt": "In the same way as walls shaken to their foundations by machines of war fall easily on the next attack, athletes, their bodies enfeebled by the jolts they have received, are predisposed to become sick on the least provocation.",
        "source": "Galen, Exhortation to the Study of the Arts (Protrepticus), 2nd century AD, trans. Joseph Walsh, M.D.",
        "href": "https://www.homepages.ucl.ac.uk/~ucgajpd/medicina%20antiqua/tr_GalExhort.html"
      },
      {
        "category": "historical",
        "title": "In 1928 the New Jersey pathologist Harrison Martland gave medicine its first clinical account of what the boxing crowd already knew by feel: that repeated blows to the head leave a lasting, degenerative mark. His paper 'Punch Drunk' is the direct ancestor of today's reckoning over head injuries in football and the measurable brain changes now found in retired players.",
        "excerpt": "For some time fight fans and promoters have recognized a peculiar condition occurring among prize fighters which, in ring parlance, they speak of as 'punch drunk.' Fighters in whom the early symptoms are well recognized are said by the fans to be 'cuckoo,' 'goofy,' 'cutting paper dolls,' or 'slug nutty.'",
        "source": "Harrison S. Martland, M.D., 'Punch Drunk,' Journal of the American Medical Association, vol. 91, no. 15, October 13, 1928, pp. 1103-1107.",
        "href": "https://jamanetwork.com/journals/jama/fullarticle/260461"
      },
      {
        "category": "literary",
        "title": "Homer knew that the price of glory is paid by the body. The warrior Sarpedon, greatest of fighters, falls in Book XVI like a felled tree, his strength reduced in an instant to blood-stained dust, a reminder that the champions we cheer are the ones who absorb the blows.",
        "excerpt": "He fell like some oak or silver poplar or tall pine to which woodmen have laid their axes upon the mountains to make timber for ship-building- even so did he lie stretched at full length in front of his chariot and horses, moaning and clutching at the blood-stained dust.",
        "source": "Homer, The Iliad, Book XVI, trans. Samuel Butler (1898).",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XVI"
      },
      {
        "category": "literary",
        "title": "Housman's runner is carried shoulder-high twice: once in triumph, once to his grave. The poem catches the unspoken bargain at the heart of the footballers' study, that the glory of the athlete and the toll on the athlete's body are inseparable, and that the crowd rarely sees the second half of the account.",
        "excerpt": "The time you won your town the race\nWe chaired you through the market-place;\nMan and boy stood cheering by,\nAnd home we brought you shoulder-high.\n\nTo-day, the road all runners come,\nShoulder-high we bring you home,\nAnd set you at your threshold down,\nTownsman of a stiller town.",
        "source": "A. E. Housman, 'To an Athlete Dying Young,' A Shropshire Lad (1896).",
        "href": "https://www.gutenberg.org/files/5720/5720-h/5720-h.htm"
      },
      {
        "category": "artistic",
        "title": "Beethoven placed a funeral march at the heart of a symphony named for a hero, insisting that heroism and grief share the same music. The slow tread of the Marcia funebre mourns the fallen champion, the exhausted body behind the laurels, the cost that arrives after the cheering, an apt accompaniment to a study of what glory does to the brain over time.",
        "excerpt": "The second movement, a Marcia funebre marked Adagio assai, is a wordless funeral procession in C minor: a heavy, halting tread in the strings that mourns the fallen hero even as the symphony celebrates him, sounding the hidden price paid for greatness.",
        "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 ('Eroica'), II. Marcia funebre (1804).",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      },
      {
        "category": "artistic",
        "title": "George Bellows painted two prizefighters locked in a brutal exchange under the lights, bodies straining and blood already drawn, the crowd a hungry blur behind them. It is the sporting spectacle stripped to its physical truth: the beauty and the damage are the same motion, and the blows the men trade are the very ones a modern brain scan learns to read.",
        "excerpt": "Two bare-torsoed boxers collide at the center of the canvas, one driving a blow home as the other reels, their faces reddened and indistinct; below them a wall of shadowed, avid spectators presses toward the ring, turning the athletes' punishment into entertainment.",
        "source": "George Bellows, Both Members of This Club, oil on canvas, 1909, National Gallery of Art, Washington, D.C. (Chester Dale Collection, 1944.13.1).",
        "href": "https://commons.wikimedia.org/wiki/File:George_Bellows_-_Both_Members_of_This_Club.jpg",
        "image": {
          "src": "/covers/footballers-brain-changes-study--a5.png",
          "alt": "Two bloodied boxers clash in a brightly lit ring above a crowd of shadowed, eager spectators; George Bellows, Both Members of This Club, 1909.",
          "credit": "George Bellows (1882-1925), Both Members of This Club, 1909, National Gallery of Art, Washington, D.C. Public domain."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "world-sailing-olympic-footprint",
    "headline": "World Sailing measures the environmental footprint of its Olympic equipment for the first time",
    "overview": "World Sailing has, for the first time, measured the environmental impact of the boats and equipment used across all of its Olympic classes, using life-cycle assessments that track carbon and ecological costs from production to disposal. The governing body said the findings would shape future rules and class selection, and that from 2032 Olympic classes will have to provide independently verified environmental data to be eligible. Boats built from carbon fibre, fibreglass and PVC foam are among the biggest contributors, prompting trials of greener materials.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQWDAwSVZFOENTTWEyRGJzbHUwWF93LWZhMzhSU2JMdVoxeDVWd24zX0ZwX3JQMU5lN2FTRjF6WHh3UGhIN1J3WENoYlAxUjItbGRFV2lIVTVBWks0NGxJbnJzZDNzZExGaFdfQnNnaE1ueXJ5TUduWWFFVXJ2aVB3MnVSRnNidkRnN00wVkRENUJHZ050NFhlbFRhV1diVFFZQXJJOTdyX3piUFZIS0FxbA?oc=5"
      },
      {
        "name": "World Sailing",
        "href": "https://www.sailing.org/2026/01/21/world-sailing-launches-first-olympic-wide-project-to-measure-the-environmental-impact-of-sailing-equipment/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/world-sailing-olympic-footprint.png",
      "alt": "A single-handed Olympic-class sailing dinghy under sail on the water.",
      "credit": "Photo: Wikimedia Commons"
    },
    "edition": "Evening Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1664, the diarist John Evelyn stood before the newborn Royal Society and reckoned the hidden cost of England's fleet: every warship's oaken hull was a felled forest. Long before World Sailing counted the footprint of its boats, Evelyn counted the woodlands consumed to build them and pleaded that the nation replant what its craft had taken.",
        "excerpt": "The knottiest for water-works, piles, and the like, because 'twill drive best, and last longest; the crooked, yet firm, for knee-timber in shipping, millwheels, &c. In a word, how absolutely necessary the oak is above all the trees of the forest in naval-architecture, &c.",
        "source": "John Evelyn, Sylva; or, A Discourse of Forest-Trees, and the Propagation of Timber in His Majesty's Dominions (delivered to the Royal Society, 1662; published 1664), chapter on the Oak.",
        "href": "https://www.gutenberg.org/files/20778/20778-h/20778-h.htm"
      },
      {
        "category": "historical",
        "title": "Matthew Fontaine Maury gathered thousands of ships' logbooks to chart, for the first time, the winds and currents that mariners had merely felt but never measured. His 1855 survey of the sea is the ancestor of World Sailing's ledger: the impulse to quantify the ocean that carries the sail.",
        "excerpt": "There is a river in the ocean. In the severest droughts it never fails, and in the mightiest floods it never overflows. Its banks and its bottom are of cold water, while its current is of warm. The Gulf of Mexico is its fountain, and its mouth is in the Arctic Seas. It is the Gulf Stream. There is in the world no other such majestic flow of waters.",
        "source": "Matthew Fontaine Maury, The Physical Geography of the Sea (New York: Harper & Brothers, 1855), opening of the chapter on the Gulf Stream.",
        "href": "https://archive.org/stream/physicalgeograph01maur/physicalgeograph01maur_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Coleridge's mariner shoots the albatross and brings a curse upon ship and sea, redeemed only when he learns at last to bless the living things of the deep. It is the founding parable of ocean stewardship: the wrong done to nature must be reckoned, and love of every creature is the reckoning.",
        "excerpt": "He prayeth well, who loveth well\nBoth man and bird and beast.\n\nHe prayeth best, who loveth best\nAll things both great and small;\nFor the dear God who loveth us\nHe made and loveth all.",
        "source": "Samuel Taylor Coleridge, \"The Rime of the Ancient Mariner\" (1798; text of 1834), Part VII.",
        "href": "https://www.gutenberg.org/files/151/151-h/151-h.htm"
      },
      {
        "category": "literary",
        "title": "Melville's Ishmael contemplates the sea not as playground but as a vast, remorseless power indifferent to the men who venture upon it in pursuit of the whale. Moby-Dick is the great American accounting of humankind's hunt across the water and what the ocean exacts in return.",
        "excerpt": "Consider the subtleness of the sea; how its most dreaded creatures glide under water, unapparent for the most part, and treacherously hidden beneath the loveliest tints of azure. Consider, once more, the universal cannibalism of the sea; all whose creatures prey upon each other, carrying on eternal war since the world began.",
        "source": "Herman Melville, Moby-Dick; or, The Whale (1851), Chapter 58, \"Brit.\"",
        "href": "https://www.gutenberg.org/files/2701/2701-h/2701-h.htm"
      },
      {
        "category": "artistic",
        "title": "Debussy dissolved the sea into pure orchestral motion, closing his three symphonic sketches with a movement he named the very dialogue at the heart of sailing: wind answering water. La mer listens to the ocean's moods rather than mastering them, a fitting overture to a sport now weighing its own voice in that dialogue.",
        "excerpt": "Trois esquisses symphoniques: I. De l'aube a midi sur la mer (From dawn to noon on the sea); II. Jeux de vagues (Play of the waves); III. Dialogue du vent et de la mer (Dialogue of the wind and the sea).",
        "source": "Claude Debussy, La mer, trois esquisses symphoniques pour orchestre (1903-05), movement titles. Score at the International Music Score Library Project (IMSLP), public domain.",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)"
      },
      {
        "category": "artistic",
        "title": "Turner painted the veteran warship Temeraire, a hero of Trafalgar, being towed by a sooty steam tug to be broken up beneath a blazing sunset. It is the age of sail meeting its end and its reckoning, a ghostly white ship of wind and canvas surrendered to a new machine world, the sea itself bearing witness.",
        "excerpt": "A luminous, pale sailing warship is drawn across still golden water by a small dark steam-tug, its funnel trailing fire and smoke, while a vast sunset burns over the estuary; a mourning tribute to the passing of the age of sail.",
        "source": "J. M. W. Turner, The Fighting Temeraire tugged to her last berth to be broken up, 1839, oil on canvas, National Gallery, London (NG524).",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/world-sailing-olympic-footprint--a5.png",
          "alt": "Turner's oil painting of the pale ghostly warship Temeraire being towed by a dark steam tug across golden water beneath a fiery sunset.",
          "credit": "J. M. W. Turner, The Fighting Temeraire (1839), National Gallery, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "lindsey-graham-dies",
    "headline": "US Senator Lindsey Graham, a close ally of President Trump, dies at 71 after a brief and sudden illness",
    "overview": "Lindsey Graham, the veteran South Carolina Republican and Senate power broker who became one of Washington's most prominent foreign-policy hawks and a close ally of President Trump, died on July 12, 2026 following a brief and unexpected illness, his office said. First elected to the Senate in 2002, he was a fixture of American politics for three decades and a leading voice on national security. Tributes poured in from across the political spectrum, praising his support for Ukraine, trans-Atlantic ties, and Israel.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxNcGhrZ2FzTUtJem9sWmVlbWNIVFdEdmw0dGNpXzZoenpMLXNIVXZGblVJOEs3MUhPU2hwQTF2cUVtU0VfWjZlOUdmc0pfQy0xWE0xYlFuaDhCY0pBcVFMU3p3dkM3ZXhlc04tdTlEOEpSMDVzWkJ4ZkFlQmVPOVM4ZjhoOVZJdHFXRDVIOUhTMDlVZDMtenEyWmxR?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvgj25j6nmeo?at_medium=RSS&at_campaign=rss"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/lindsey-graham-dies.png",
      "alt": "A gray-haired man in a dark suit and blue tie stands smiling in front of an American flag for an official government portrait.",
      "credit": "Photo: Brett Flashnick, U.S. Senate Photographic Studio, official Senate portrait (113th Congress); public domain, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Plutarch's account of the death of Pericles (5th century BC), in which Athens, having lost its foremost statesman and orator to a lingering illness, only then grasped how indispensable his steady leadership had been — a mirror of a capital suddenly bereft of a veteran power broker.",
        "excerpt": "For those who, while he lived, were oppressed by a sense of his power and felt that it kept them in obscurity, straightway on his removal made trial of other orators and popular leaders, only to be led to the confession that a character more moderate than his in its solemn dignity, and more august in its gentleness, had not been created. That objectionable power of his, which they had used to call monarchy and tyranny, seemed to them now to have been a saving bulwark of the constitution, so greatly was the state afflicted by the corruption and manifold baseness which he had kept weak and grovelling.",
        "source": "Plutarch, Life of Pericles 39, trans. Bernadotte Perrin (Loeb Classical Library, 1916).",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Pericles*.html"
      },
      {
        "category": "historical",
        "title": "Major-General Henry Lee's funeral oration for George Washington, delivered before Congress on December 26, 1799 — a nation stunned by the loss of its central statesman to a sudden brief illness, echoing the abrupt passing of a long-serving Washington fixture.",
        "excerpt": "The founder of our federal republic — our bulwark in war, our guide in peace, is no more. Oh that this was but questionable! Hope, the comforter of the wretched, would pour into our agonized hearts its balmy dew. But alas! there is no hope for us; our Washington is removed forever. Possessing the stoutest frame, and purest mind, he had passed nearly to his sixty-eighth year, in the enjoyment of high health, when, habituated by his care of us to neglect himself, a slight cold, disregarded, became inconvenient on Friday, oppressive on Saturday, and defying every medical interposition, before the morning of Sunday, put an end to the best of men. ... First in war — first in peace — and first in the hearts of his countrymen, he was second to none in the humble and endearing scenes of private life; pious, humane, temperate and sincere; uniform, dignified and commanding.",
        "source": "Henry Lee, \"Funeral Oration on the Death of General Washington,\" delivered at the request of Congress, Philadelphia, December 26, 1799.",
        "href": "https://en.wikisource.org/wiki/The_Father_of_His_Country"
      },
      {
        "category": "literary",
        "title": "Mark Antony's funeral oration over the body of the slain Caesar in Shakespeare's Julius Caesar (Act III, Scene ii), the archetype of public grief and eulogy for a fallen man of the state whose death reshapes the republic.",
        "excerpt": "Friends, Romans, countrymen, lend me your ears; I come to bury Caesar, not to praise him. The evil that men do lives after them, The good is oft interred with their bones; So let it be with Caesar.",
        "source": "William Shakespeare, The Tragedy of Julius Caesar, Act III, Scene ii (First Folio, 1623).",
        "href": "https://www.gutenberg.org/files/1522/1522-h/1522-h.htm"
      },
      {
        "category": "literary",
        "title": "Walt Whitman's elegy \"O Captain! My Captain!\" (1865), written to mourn the assassinated Abraham Lincoln — the classic American lament for a leader struck down at the height of his mission, the nation exulting even as its captain lies fallen.",
        "excerpt": "O Captain! my Captain! our fearful trip is done,\nThe ship has weathered every rack, the prize we sought is won,\nThe port is near, the bells I hear, the people all exulting,\nWhile follow eyes the steady keel, the vessel grim and daring;\nBut O heart! heart! heart!\nO the bleeding drops of red,\nWhere on the deck my Captain lies,\nFallen cold and dead.",
        "source": "Walt Whitman, \"O Captain! My Captain!\" (1865), in Poems That Every Child Should Know, ed. Mary E. Burt (1904).",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/O_Captain!_My_Captain!"
      },
      {
        "category": "artistic",
        "title": "John Singleton Copley's grand history painting \"The Death of the Earl of Chatham\" (1779–81) depicts the great orator-statesman William Pitt collapsing on the floor of the House of Lords, surrounded by the assembled peers of the realm — a dramatic image of a leading parliamentary figure struck down at the very seat of power.",
        "excerpt": "Copley freezes the moment William Pitt, 1st Earl of Chatham, is felled by a fatal seizure while rising to speak in the House of Lords on April 7, 1778. The stricken statesman sinks back in his robes as his sons and rival lords rush to catch him, the entire chamber wheeling toward the falling orator. The vast canvas turns a single collapse into a portrait of a nation's political class confronting the sudden loss of one of its towering voices.",
        "source": "John Singleton Copley, The Death of the Earl of Chatham, oil on canvas, 1779–1781; Tate / National Portrait Gallery, London. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Death_of_the_Earl_of_Chatham_by_John_Singleton_Copley.jpg",
        "image": {
          "src": "/covers/lindsey-graham-dies--a4.png",
          "alt": "A robed statesman collapses on the floor of the House of Lords, caught by fellow peers as the crowded chamber turns toward him in alarm.",
          "credit": "John Singleton Copley, The Death of the Earl of Chatham, 1779–1781; Tate / National Portrait Gallery, London; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The \"Marcia funebre\" (second movement) of Beethoven's Symphony No. 3 in E-flat major, \"Eroica\" (1804) — a solemn funeral march conceived to mourn a fallen great man, its muffled drum-tread and grieving C-minor procession the musical embodiment of a state in public mourning.",
        "excerpt": "Beethoven set at the heart of his heroic symphony a full-scale funeral march, its slow strings imitating a muffled drum and a somber procession bearing a hero to the grave. Originally bound up with Beethoven's ideal of a great public man, the movement builds from hushed lament to a shattering climax before dissolving into broken, halting phrases of grief. It remains the archetypal orchestral music of national mourning for a fallen leader.",
        "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 (\"Eroica\"), II. Marcia funebre (Adagio assai), 1804; full score via IMSLP.",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)"
      }
    ],
    "rank": 27
  },
  {
    "slug": "qatar-former-emir-hamad-dies",
    "headline": "Sheikh Hamad bin Khalifa Al Thani, the former emir of Qatar who transformed the Gulf state, dies at 74",
    "overview": "Sheikh Hamad bin Khalifa Al Thani, who seized power from his father in a bloodless 1995 palace coup and turned tiny, gas-rich Qatar into an outsized global player, died on July 12, 2026 at 74, state media reported. During his reign he founded the Al Jazeera news network, hosted major US military bases, built vast sovereign wealth, and won Qatar the right to stage the football World Cup before abdicating in favour of his son in 2013. He was widely regarded as the moderniser who reshaped Qatar's wealth and its far-reaching diplomatic ambitions.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNWjRDaUlZZWhZMlBnRGVNSmRGNzBoLWVGeXJEWVljdkZwNVkwcTNJT3pURUs5aXR5UkF1RzdzZDRUUWNGSnJnajlYRGptM3U1a01lUEVGRk1xT05sWjdRYjd6MFVOd0JYV3paSndLTEJkVkxwQ01UZmp1S0ZvS2ItOFlVT0xfN2dQd05DZThBVk43NldxaElUUEh4S19JdDl6WGc?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNa0haajRKdWJvZENRMEpjQnFRUFJ1cEptbFRKQ1B5WHN2LTlHeDNEUUc2Q1lVS2FNV25jd2cxQUx5M1UwWXB0WWppa2FLallzNnAtWnVxc1I1eGo0UGJQNmpzRUdGR2p0OVVDdmNnODFVdGtuYjM4ZllpX3V3bDBLREVtNDlPUHp4N2ZVV1JZb1JTbkFheVllMDFNMFNTSHdmSGh6bWpUN3NXcDlxWTJMa0h2RQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/qatar-former-emir-hamad-dies.png",
      "alt": "A bearded man in a dark suit stands at a formal diplomatic gathering, photographed in Vienna in 2013.",
      "credit": "Photo: Dragan Tatic / Austrian Foreign Ministry, 5th Global Forum Vienna 2013, 2013; CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Philip II of Macedon in Diodorus Siculus — the prince who took a small, threatened kingdom and made it the greatest power in Europe, just as Hamad turned tiny Qatar into a Gulf heavyweight before handing the throne to his son",
        "excerpt": "For Philip was king over the Macedonians for twenty-four years, and having started from the most insignificant beginnings built up his kingdom to be the greatest of the dominions in Europe, and having taken over Macedonia when she was a slave to the Illyrians, made her mistress of many powerful tribes and states.",
        "source": "Diodorus Siculus, Library of History, Book XVI.1.3 (trans. C. H. Oldfather, Loeb Classical Library), 1st century BC",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/16A*.html"
      },
      {
        "category": "historical",
        "title": "Napoleon's Act of Abdication of 22 June 1815 — a ruler who rose by coup and remade his state, laying down power to proclaim his own son emperor, an echo of Hamad's 2013 abdication in favour of Sheikh Tamim",
        "excerpt": "My political life is terminated, and I proclaim my son, under the title of Napoleon II., Emperor of the French.",
        "source": "Napoleon Bonaparte, Declaration of Abdication, 22 June 1815 (Wikisource, contemporary English translation)",
        "href": "https://en.wikisource.org/wiki/Declaration_of_abdication_by_Napoleon_Bonaparte,_22_June_1815"
      },
      {
        "category": "literary",
        "title": "King Lear's abdication speech — an ageing sovereign who resolves to shed the cares of rule and confer his kingdom on younger hands, the archetype of a monarch stepping down while still alive, as Hamad did in 2013",
        "excerpt": "Meantime we shall express our darker purpose. Give me the map there. Know that we have divided In three our kingdom; and 'tis our fast intent To shake all cares and business from our age, Conferring them on younger strengths, while we Unburden'd crawl toward death.",
        "source": "William Shakespeare, King Lear, Act I, Scene 1 (Yale edition, 1917), first performed c. 1606",
        "href": "https://en.wikisource.org/wiki/King_Lear_(1917)_Yale/Text/Act_I"
      },
      {
        "category": "literary",
        "title": "Machiavelli's The Prince on the peril of the reformer — the hazard borne by any ambitious ruler who introduces a new order of things, mirroring Hamad the moderniser who overturned Qatar's old ways to build Al Jazeera, host US bases and win the World Cup",
        "excerpt": "There is nothing more difficult to take in hand, more perilous to conduct, or more uncertain in its success, than to take the lead in the introduction of a new order of things. Because the innovator has for enemies all those who have done well under the old conditions, and lukewarm defenders in those who may do well under the new.",
        "source": "Niccolò Machiavelli, The Prince, Chapter VI (trans. W. K. Marriott), written 1513",
        "href": "https://www.gutenberg.org/files/1232/1232-h/1232-h.htm"
      },
      {
        "category": "artistic",
        "title": "Frans Francken the Younger, 'Allegory on the Abdication of Emperor Charles V in Brussels' — the great emperor lays down his crowns and passes his realm to his son Philip II while the personified continents kneel with gifts, a sovereign of global reach yielding power to the next generation, as Hamad did",
        "excerpt": "In this allegory the aged, ailing Charles V sits enthroned as he surrenders his vast empire, his heirs Ferdinand I and Philip II beside him. Personifications of his far-flung territories kneel with their banners while the four continents — Europe, Asia, Africa and America — offer tribute, a painted meditation on a world-spanning ruler choosing to relinquish the throne to his son.",
        "source": "Frans Francken the Younger, Allegory on the Abdication of Emperor Charles V in Brussels, 25 October 1555, oil on panel, c. 1630–1640, Rijksmuseum, Amsterdam (SK-A-112)",
        "href": "https://commons.wikimedia.org/wiki/File:Francken_II,_Frans_-_Allegory_on_the_Abdication_of_Emperor_Charles_V_in_Brussels,_25_October_1555,_-_c._1620.jpg",
        "image": {
          "src": "/covers/qatar-former-emir-hamad-dies--a4.png",
          "alt": "An enthroned Emperor Charles V surrenders his crowns to his son as personified continents and territories kneel before him with banners and gifts.",
          "credit": "Frans Francken the Younger, 'Allegory on the Abdication of Emperor Charles V in Brussels, 25 October 1555', c. 1630–1640; Rijksmuseum, Amsterdam (SK-A-112); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's coronation anthem 'Zadok the Priest' — the sacred music of a son anointed king in his father's place, sung at every British coronation since 1727 and drawn from Solomon's succession to David, a fitting note for a Gulf dynasty passing peacefully from father to son",
        "excerpt": "Zadok the priest, and Nathan the prophet, anointed Solomon king; and all the people rejoiced, and said: God save the King! Long live the King! May the King live for ever! Amen. Alleluia.",
        "source": "George Frideric Handel, Zadok the Priest (Coronation Anthem No. 1), HWV 258, composed 1727 for the coronation of King George II; text after 1 Kings 1:38–40",
        "href": "https://imslp.org/wiki/Zadok_the_Priest,_HWV_258_(Handel,_George_Frideric)"
      }
    ],
    "rank": 28
  },
  {
    "slug": "argentina-switzerland-world-cup-semis",
    "headline": "Argentina beat 10-man Switzerland 3-1 in extra time to reach the World Cup semifinals and a clash with England",
    "overview": "Lautaro Martinez and a stunning long-range strike by Julian Alvarez in extra time carried Argentina past 10-man Switzerland 3-1 on July 12, 2026 to reach the World Cup semifinals. Switzerland, reduced to ten after Breel Embolo's second-yellow dismissal, had drawn level through Dan Ndoye before the reigning champions pulled away late. The win sets up a semifinal against England, and the Swiss coach bitterly condemned the video-review decisions that went against his side.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQbjdjRVRIVE9NQVA5aXdUdmlkZzN1dmM1NWgtaFY1TUtzNFlwangwRHBPdWY4TjUyVXkzZzJmRFlRWFMtYnNaSGVKZi1tTS16RzR0a0FBVUljR2NIS0pqTjRxelpPdUJrV3lNZnVpcjJuTEN4RVlnOGotUU1RakFIZXlyaXVrNG5FNGhHREZBcDIwd2hZLXlhYWtqQ01sX2otVWMzQTktYzhTVk5vaXlGU2J0bU9jTzJWd1BLV2YwN0xXemM?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/soccer/story/_/id/49337589/argentina-switzerland-live-world-cup-2026-latest-updates-commentary-score-result-lionel-messi"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/argentina-switzerland-world-cup-semis.png",
      "alt": "A footballer in the sky-blue and white striped shirt of Argentina controls the ball on the pitch during a World Cup match.",
      "credit": "Photo: Hossein Zohrevand, Lionel Messi playing for Argentina at the 2022 FIFA World Cup, 2022; CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Suetonius on Nero at the Olympic chariot race (AD 67): the emperor thrown from his ten-horse team, unable to finish, yet crowned victor anyway — antiquity's most notorious rigged verdict, a mirror of Switzerland's fury at the officials and the contested call that shadowed the result",
        "excerpt": "He drove a chariot in many places, at Olympia even a ten-horse team, although in one of his own poems he had criticised Mithridates for just that thing. But after he had been thrown from the car and put back in it, he was unable to hold out and gave up before the end of the course; but he received the crown just the same.",
        "source": "Suetonius, The Lives of the Caesars, 'Nero', ch. 24, trans. J. C. Rolfe, Loeb Classical Library (London: Heinemann; New York: Macmillan, 1914), via LacusCurtius (Bill Thayer), University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Suetonius/12Caesars/Nero*.html"
      },
      {
        "category": "historical",
        "title": "William B. Travis's 'Victory or Death' letter from the besieged Alamo (24 February 1836): a spirited, hopelessly out-numbered garrison that would not surrender or retreat — the defiant, doomed resistance of ten-man Switzerland refusing to yield to the champions",
        "excerpt": "I have answered the demand with a cannon shot, & our flag still waves proudly from the walls—I shall never surrender or retreat... I am determined to sustain myself as long as possible & die like a soldier who never forgets what is due to his own honor & that of his country—Victory or Death.",
        "source": "William Barret Travis, letter 'To the People of Texas & All Americans in the World', the Alamo, February 24, 1836; original manuscript held by the Texas State Library and Archives Commission, Austin.",
        "href": "https://www.tsl.texas.gov/treasures/republic/alamo/travis-full-text.html"
      },
      {
        "category": "literary",
        "title": "Virgil, Aeneid, Book V — the foot-race at Anchises's funeral games, where a trip fells Salius, the crowd erupts, he storms the judges crying the prize was 'wrongfully conferr'd', and Aeneas rules on the disputed result: the ancient epic's own VAR controversy",
        "excerpt": "He strove th' immediate rival's hope to cross, / And caught the foot of Salius as he rose. ... But Salius enters, and, exclaiming loud / For justice, deafens and disturbs the crowd; / Urges his cause may in the court be heard; / And pleads the prize is wrongfully conferr'd. ... Then thus the prince: “Let no disputes arise: / Where fortune plac'd it, I award the prize.”",
        "source": "Virgil, The Aeneid, Book V, trans. John Dryden (1697), Project Gutenberg eBook #228.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "Homer, Odyssey, Book XXI — the contest of the bow, where one man alone strings the great bow no rival could bend and sends a single arrow clean through all twelve axes: the hero's one flawless, impossible strike, like Julian Alvarez's long-range wonder-goal settling the tie",
        "excerpt": "He took and laid it on the bridge of the bow, and held the notch and drew the string, even from the settle whereon he sat, and with straight aim shot the shaft and missed not one of the axes, beginning from the first axe-handle, and the bronze-weighted shaft passed clean through and out at the last.",
        "source": "Homer, The Odyssey, Book XXI, trans. S. H. Butcher and Andrew Lang (1879), Project Gutenberg eBook #1728.",
        "href": "https://www.gutenberg.org/cache/epub/1728/pg1728.txt"
      },
      {
        "category": "artistic",
        "title": "Alexander von Wagner's 'The Chariot Race' (c. 1882) — quadrigas thundering neck-and-neck round the packed circus, dust flying and one driver flogging his team clear at the death: the raw drama and glory of the games, distilled into a single decisive surge",
        "excerpt": "Von Wagner freezes a Roman chariot race at its climax: four-horse teams thunder round the turn of a packed circus in a storm of dust, one charioteer flogging his straining horses a length clear of the pack as the crowded grandstands erupt. It is the ancient contest rendered as pure spectacle and nerve, victory seized in a single decisive surge. The same raw drama runs through Argentina's breakaway triumph, snatched clear of a spirited pursuer in the final strides.",
        "source": "Alexander von Wagner (1838–1919), The Chariot Race, oil on canvas, c. 1882; Manchester Art Gallery (acc. no. 1898.12).",
        "href": "https://commons.wikimedia.org/wiki/File:Alexander_von_Wagner_(1838-1919)_-_The_Chariot_Race_-_1898.12_-_Manchester_Art_Gallery.jpg",
        "image": {
          "src": "/covers/argentina-switzerland-world-cup-semis--a4.png",
          "alt": "Roman chariots at full gallop thunder round the sand of a packed circus, horses straining and manes flying, one charioteer whipping his four-horse team clear of the pack as the crowded grandstands roar.",
          "credit": "Alexander von Wagner (1838–1919), 'The Chariot Race', oil on canvas, c. 1882; Manchester Art Gallery; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Verdi, 'Gloria all'Egitto' — the Triumphal Scene from Aida (Act II, 1871): the great processional hymn hailing the returning conqueror, laurels twined on the victors' brows, the sound of Argentina's champions marching on to the semifinal in glory",
        "excerpt": "Gloria all'Egitto, ad Iside / Che il sacro suol protegge! / Al Re che il Delta regge / Inni festosi alziam! ... S'intrecci il loto al lauro / Sul crin dei vincitori!",
        "source": "Giuseppe Verdi, Aida, Act II (Triumphal Scene, 'Gloria all'Egitto'); libretto by Antonio Ghislanzoni; first performed Cairo, 1871. Scores at the International Music Score Library Project (IMSLP / Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Aida_(Verdi,_Giuseppe)"
      }
    ],
    "rank": 29
  },
  {
    "slug": "south-china-sea-ruling-reaffirmed",
    "headline": "Fourteen nations and the European Union reaffirm the 2016 ruling that invalidated China's South China Sea claims",
    "overview": "In a joint statement on July 12, 2026 marking the tenth anniversary of a landmark arbitral ruling, fourteen countries and the European Union restated that China's expansive claims to the South China Sea have no basis in international law. The 2016 tribunal had rejected Beijing's \"nine-dash line,\" but China dismisses the decision and continues to assert control over contested waters and reefs. The signatories pressed for freedom of navigation in one of the world's most vital and disputed sea lanes.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQc3pmZ2dBZ2dRWHNTeGJnYUoxRUlqR3hPa3hsMzQyVVU5Nl9kT2FEdlY1SU9QZE9MR1dqM0FxTWNNdzdTOHdCUFRQOE9FNFR4WmtsSjJMZU0tSVZRVlFadTJmU2VzN1JMY1VpYlRzWGtvUl9rT0pDQ2d1ZmgxTTZMRHlBWk1GZEpxZVJHbEYxRTVzVExibVNnVlBJbk11QzlueDNNTlBTX2UzZTFP?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQS09EWmdpMEZqVE9nazcwbDh4TWRGN2J3Z1hSQTVzbzh1QzkyRTRjeENDQ2VRYXc4N2ROcmF2bU00MHZDTWMzVllycFpBT25Idk9TMlZrWWZVSzdxZWV4S2k3V3Z6VGJVTTZmZVd1UTNPdVFwSkNudDRwNmVJVnczWHJ2VExVdEQ3bFY2UVVzREZVRjd1bFhoaFR4MzB1TlJHTnNmdWx2RXdpVmR5Y2VwRU43SUN5dFJyNTlpMm1B?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/south-china-sea-ruling-reaffirmed.png",
      "alt": "A regional map of the South China Sea showing overlapping maritime boundary lines claimed by neighboring coastal states.",
      "credit": "Map: Voice of America (U.S. federal government), South China Sea claims map; public domain, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Grotius and the Free Sea: the 1609 case that no power can own the ocean",
        "excerpt": "the sea is common to all, because it is so limitless that it cannot become a possession of any one, and because it is adapted for the use of all, whether we consider it from the point of view of navigation or of fisheries.",
        "source": "Hugo Grotius, The Freedom of the Seas (Mare Liberum, 1609), trans. Ralph Van Deman Magoffin, Carnegie Endowment, 1916",
        "href": "https://www.gutenberg.org/cache/epub/75962/pg75962-images.html"
      },
      {
        "category": "historical",
        "title": "The Melian Dialogue: a maritime empire tells a small island that law is for equals",
        "excerpt": "right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5.89 (Crawley translation), Perseus Digital Library, Tufts University",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book%3D5:chapter%3D89:section%3D1"
      },
      {
        "category": "literary",
        "title": "Byron's ocean, where empires end at the waterline",
        "excerpt": "Roll on, thou deep and dark blue Ocean—roll!\nTen thousand fleets sweep over thee in vain;\nMan marks the earth with ruin—his control\nStops with the shore;—upon the watery plain\nThe wrecks are all thy deed, nor doth remain\nA shadow of man's ravage, save his own,\nWhen for a moment, like a drop of rain,\nHe sinks into thy depths with bubbling groan,\nWithout a grave, unknelled, uncoffined, and unknown.",
        "source": "Lord Byron, Childe Harold's Pilgrimage, Canto IV, stanza CLXXIX (1818)",
        "href": "https://www.gutenberg.org/files/5131/5131-h/5131-h.htm"
      },
      {
        "category": "literary",
        "title": "Aeschylus on Xerxes, the king who tried to shackle the sea like a slave",
        "excerpt": "for he conceived the hope that he could by shackles, as if it were a slave, restrain the current of the sacred Hellespont, the Bosporus, a stream divine; set himself to fashion a roadway of a new order, and, by casting upon it hammer-wrought fetters, made a spacious causeway for his mighty host. Mortal though he was, he thought in his folly that he would gain the mastery over all the gods, aye even over Poseidon.",
        "source": "Aeschylus, The Persians (472 BC), trans. Herbert Weir Smyth, Harvard University Press, 1926 (Wikisource)",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/The_Persians"
      },
      {
        "category": "artistic",
        "title": "The Cannon Shot: a Dutch man-of-war on the open sea that Grotius called free",
        "excerpt": "Willem van de Velde the Younger paints a Dutch warship firing a salute, its sails slack in a light haze while smaller boats bob alongside on a vast, luminous swell. Made around 1680 for the seafaring republic whose jurists argued the ocean could belong to no one, the picture sets a single vessel of naval power against a limitless expanse of water and sky—the smoke drifting off toward a horizon no flag can fence.",
        "source": "Willem van de Velde the Younger, The Cannon Shot (Het kanonschot), c. 1680, Rijksmuseum, Amsterdam (SK-C-244); public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Het_kanonschot_Rijksmuseum_SK-C-244.jpeg",
        "image": {
          "src": "/covers/south-china-sea-ruling-reaffirmed--a4.png",
          "alt": "A lone Dutch warship fires a salute of smoke on a calm, silvery sea beneath a wide hazed sky, dwarfed by the open water around it.",
          "credit": "Willem van de Velde the Younger, The Cannon Shot (c. 1680), Rijksmuseum; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Debussy's La Mer: the sea rendered as sovereign, ungovernable motion",
        "excerpt": "De l'aube à midi sur la mer — Jeux de vagues — Dialogue du vent et de la mer",
        "source": "Claude Debussy, La mer, trois esquisses symphoniques pour orchestre, CD 111 / L. 109 (1905); International Music Score Library Project (IMSLP)",
        "href": "https://imslp.org/wiki/La_mer,_CD_111_(Debussy,_Claude)"
      }
    ],
    "rank": 30
  },
  {
    "slug": "ukraine-strikes-tanker-sea-of-azov",
    "headline": "Russia says Ukraine struck an oil tanker in the Sea of Azov as Kyiv presses its campaign against Russian fuel",
    "overview": "Russia said on July 12, 2026 that Ukrainian forces had struck an oil tanker in the Sea of Azov, the latest blow in a sustained Ukrainian campaign against the ships and refineries that carry Russia's fuel and revenue. The reported strike widened the war onto the water and deepened Kyiv's targeting of energy infrastructure far behind the front line. Ukraine has increasingly reached tankers and export terminals as it seeks to squeeze Moscow's wartime economy.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxObmhWWC1hanZqY2JNcURXdGVEMGo3MklhRUxMTlM5NG9aWGwya0Z2SE9RanVYNmUyYjRsZnhEOTd6czNUVEo5dlVSaE11TXFjcVhqVGF6MnRZQ2t3ZzlKek84d0tPcExJTnUzeUsyamJFQmcwRk9Yb2pBZGRmOEw0TFFQUF81WjVhNFotQzVvTFZ2QjR2ZkE?oc=5"
      },
      {
        "name": "The Moscow Times",
        "href": "https://www.themoscowtimes.com/2026/07/12/russia-says-ukraine-struck-tanker-in-sea-of-azov-a93227"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/ukraine-strikes-tanker-sea-of-azov.png",
      "alt": "A large red-and-black oil tanker sits low in the water on calm seas near a port entrance under a hazy sky.",
      "credit": "Photo: Paul Harrison, Oil Tanker Stride at Colon, Panama, 2016; CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Dutch fire-ships burn the English fleet in the Medway (1667): an enemy reaches behind the front to torch ships at anchor",
        "excerpt": "the Dutch have broke the chaine and burned our ships, and particularly \"The Royal Charles\" ... \"The Royal James,\" \"Oake,\" and \"London,\" burnt by the enemy with their fire-ships ... I do fear so much that the whole kingdom is undone, that I do this night resolve to study with my father and wife what to do.",
        "source": "The Diary of Samuel Pepys, entries of 12 and 13 June 1667 (Volume 54: June 1667), ed. Henry B. Wheatley. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/4177/pg4177-images.html"
      },
      {
        "category": "historical",
        "title": "Caesar burns the Alexandrian fleet in its own harbour (48 BC): denying an enemy the ships that carry his power",
        "excerpt": "At length Caesar carried his point, and not only set fire to the vessels abovementioned, but to all that were in the arsenals, after which he passed some troops into the Isle of Pharos.",
        "source": "Julius Caesar, Commentaries on the Civil War, Book 3, ch. 111, trans. William Duncan (1856). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0076:book=3:chapter=111"
      },
      {
        "category": "literary",
        "title": "The Trojans hurl fire into the Greek ships in Homer's Iliad, Book 16: the war carried to the vessels, a hull wrapped in flame",
        "excerpt": "Therefore he drew back, and the Trojans flung fire upon the ship which was at once wrapped in flame. The fire was now flaring about the ship's stern, whereon Achilles smote his two thighs and said to Patroclus, 'Up, noble horseman, for I see the glare of hostile fire at our fleet; up, lest they destroy our ships, and there be no way by which we may retreat.'",
        "source": "Homer, The Iliad, Book 16, trans. Samuel Butler (prose, 1898). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0217:book=16:card=112"
      },
      {
        "category": "literary",
        "title": "The burning of the fleet in Virgil's Aeneid, Book 5: flaming brands loosed among the ships until the fire rides the sterns and oars",
        "excerpt": "The flame, unstopp'd at first, more fury gains, / And Vulcan rides at large with loosen'd reins: / Triumphant to the painted sterns he soars, / And seizes, in this way, the banks and crackling oars.",
        "source": "Virgil, The Aeneid, Book 5, trans. John Dryden. Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0052:book=5:card=654"
      },
      {
        "category": "artistic",
        "title": "Ivan Aivazovsky, 'Battle of Çesme at Night' (1848): an entire enemy fleet ablaze on dark water after a fire-ship attack",
        "excerpt": "Aivazovsky paints the night of 25-26 June 1770, when a Russian fire-ship set the Ottoman fleet alight in Chesme Bay. The whole armada burns at once, masts snapping into pillars of flame that redden the smoke and the black water, while a wan moon looks down on the destruction. It is the maritime story's exact image: a fleet turned to fire far from any battle line, a lifeline of ships consumed on the sea.",
        "source": "Ivan Konstantinovich Aivazovsky, Battle of Çesme at Night, 1848, oil on canvas; Feodosia National Gallery, Aivazovsky Museum. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Ivan_Constantinovich_Aivazovsky_-_Battle_of_%C3%87esme_at_Night.JPG",
        "image": {
          "src": "/covers/ukraine-strikes-tanker-sea-of-azov--a4.png",
          "alt": "An entire Ottoman fleet burns on black night water, masts erupting into towers of flame and smoke beneath a pale moon.",
          "credit": "Ivan Aivazovsky, Battle of Çesme at Night, 1848; Feodosia National Gallery (Aivazovsky Museum); public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner, Overture to 'Der fliegende Holländer' (The Flying Dutchman, 1841): a storm-driven, doomed vessel at the mercy of the open sea",
        "excerpt": "Wagner's overture opens with howling horn-calls and surging strings that conjure a gale-lashed sea and a cursed ship driven across it. Brass and timpani break like waves over the deck as the doomed vessel is hurled toward its fate. The music makes audible the theme of the tanker's night: a ship alone on hostile water, no longer safe, tossed between survival and destruction.",
        "source": "Richard Wagner, Der fliegende Holländer, WWV 63 (1841), overture; full orchestral score (Fürstner, 1896). IMSLP / Petrucci Music Library, public domain.",
        "href": "https://imslp.org/wiki/Der_fliegende_Holländer,_WWV_63_(Wagner,_Richard)"
      }
    ],
    "rank": 31
  },
  {
    "slug": "khosla-family-buys-seahawks",
    "headline": "Vinod Khosla's family agrees to buy the Super Bowl champion Seattle Seahawks for a record $9.6 billion",
    "overview": "A group led by the family of venture capitalist Vinod Khosla has agreed to purchase the reigning Super Bowl champion Seattle Seahawks for a reported $9.612 billion, an NFL record, buying the franchise from the estate of the late owner Paul Allen. Neeru Khosla would serve as the team's control owner, and the family must divest its minority stake in the San Francisco 49ers. League owners are expected to vote on the sale at a special meeting in late August.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMifkFVX3lxTE41RHdYR0dRMjRnSUxoQ3ZHQThoSjYta1UwMjVNS0c2NGgyaHpLaTcyZU9rR19XTXh5Q2VsUTQ0ZHF5YjF2cktrbUhqdjNia3I1aDJfZDlDUU1Hd01yblU1OU9EM195VEZnaldBWnphUFk4RW5USUNqWlNiWGJaQQ?oc=5"
      },
      {
        "name": "ESPN",
        "href": "https://www.espn.com/nfl/story/_/id/49337716/khosla-led-group-agrees-buy-seahawks-sources-say-96-billion"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/khosla-family-buys-seahawks.png",
      "alt": "The north exterior of a large open-air sports stadium glows against a deep blue dusk sky above a city street.",
      "credit": "Photo: SounderBruce, Lumen Field north side at dusk, 2022; CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Panem et Circenses: A People Content to Be Bought with Games",
        "excerpt": "Now that no one buys our votes, the public has long since cast off its cares; the people that once bestowed commands, consulships, legions and all else, now meddles no more and longs eagerly for just two things—Bread and Games!",
        "source": "Juvenal, Satire X (\"The Vanity of Human Wishes\"), trans. G. G. Ramsay, Loeb Classical Library, 1918",
        "href": "https://www.tertullian.org/fathers/juvenal_satires_10.htm"
      },
      {
        "category": "historical",
        "title": "A Record Price, Kept Secret: A Beer Baron Buys the Game's Great Champion",
        "excerpt": "New York Yankees Purchase \"Babe\" Ruth from Red Sox. Colonel Ruppert Refuses to Make Public Exact Purchase Price—Ruth Held Out for $20,000 Salary. \"Injustice\" to Red Sox. By Associated Press. New York, January 5.—The purchase of \"Babe\" Ruth of the Boston Americans by the New York American Club was announced tonight by Col. Jacob Ruppert, president of the New York Club. Colonel Ruppert refused to state the price paid.",
        "source": "The Birmingham Age-Herald (Birmingham, Ala.), January 6, 1920, p. 7 (Associated Press); Library of Congress, Chronicling America",
        "href": "https://www.loc.gov/resource/sn85038485/1920-01-06/ed-1/?sp=7"
      },
      {
        "category": "literary",
        "title": "The Prizes by the Course: Achilles Stakes Treasure on a Chariot Race",
        "excerpt": "First stood the prizes to reward the force\nOf rapid racers in the dusty course:\nA woman for the first, in beauty's bloom,\nSkill'd in the needle, and the labouring loom;\nAnd a large vase, where two bright handles rise,\nOf twenty measures its capacious size.",
        "source": "Homer, The Iliad, Book XXIII (\"Funeral Games in Honour of Patroclus\"), trans. Alexander Pope; Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "literary",
        "title": "The Man Who Played with the Faith of Fifty Million People",
        "excerpt": "\"Meyer Wolfshiem? No, he's a gambler.\" Gatsby hesitated, then added, coolly: \"He's the man who fixed the World's Series back in 1919.\" ... The idea staggered me. I remembered, of course, that the World's Series had been fixed in 1919, but if I had thought of it at all I would have thought of it as a thing that merely happened, the end of some inevitable chain. It never occurred to me that one man could start to play with the faith of fifty million people—with the single-mindedness of a burglar blowing a safe.",
        "source": "F. Scott Fitzgerald, The Great Gatsby, Chapter IV (1925); Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/64317/pg64317.txt"
      },
      {
        "category": "artistic",
        "title": "Rome Under Trajan: The Roar and Ruin of the Circus Maximus",
        "excerpt": "Ulpiano Checa's thundering canvas throws the viewer into the dust of the Circus Maximus: four-horse quadrigae strain around the turning-post while a packed grandstand rises in a wall of spectators. It is the spectacle as the ancient world knew it—the games as the property and the passion of an empire, staged for a public whose loyalties belonged to the colors of the racing factions.",
        "source": "Ulpiano Checa, \"Rome Under Trajan—A Chariot Race\" (engraving after his painting, published 1894); via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Great_Men_and_Famous_Women_Volume_1_-_ROME_UNDER_TRAJAN%E2%80%94A_CHARIOT_RACE.jpg",
        "image": {
          "src": "/covers/khosla-family-buys-seahawks--a4.png",
          "alt": "Charioteers and their four-horse teams thunder around the turning-post of a Roman circus as a vast crowd roars, dust and wreckage churning in their wake.",
          "credit": "Ulpiano Checa, \"Rome Under Trajan—A Chariot Race\" (1894 engraving after his painting), public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Music for the Royal Fireworks: An Opulent Fanfare for a Public Triumph",
        "excerpt": "Handel scored his Music for the Royal Fireworks for a colossal wind band—dozens of trumpets, horns, oboes and drums—to crown a lavish public celebration staged in London's Green Park, complete with a towering pyrotechnic pavilion. Its blazing overture is the sound of power made spectacle: a fortune spent so that a triumph might be seen and heard by an entire city. The grandeur is the point, the expense the message—glory purchased and put on magnificent display.",
        "source": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749); full score via IMSLP",
        "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)"
      }
    ],
    "rank": 32
  },
  {
    "slug": "german-carmakers-china-sales-plunge",
    "headline": "Germany's major carmakers report a steep plunge in China sales as domestic rivals seize the market",
    "overview": "Volkswagen, BMW and Mercedes-Benz reported sharply lower sales in China, long their most profitable market, as fast-rising Chinese electric-vehicle makers capture buyers at home, figures released around July 11, 2026 showed. The reversal threatens the earnings and factories that underpin Germany's industrial economy and marks a historic shift in an industry the German firms once dominated. Executives warned of intensifying competition and pressure on jobs at home.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxNQ2VPYW1pQUhrWWg1M0xRWWVUVy1GQ2ljaHdpSU5mdlZmdnhKUlhLcU1BZnhZZWpoOTVnaGdoZ2JwRmNXRnZGZGhtZVlDbWIxa3c2cFdpU0ZwcXJEazY2VXpENWJQZkttbEVmT0dsa2FnRDhBclRXc3dTeElRTWNpT0RQbl9qZFFYdTVaYVlvM1BYc0JILXc?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bnnbloomberg.ca/business/international/2026/07/11/major-german-carmakers-hit-by-steep-china-sales-plunge-as-competition-heats-up/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/german-carmakers-china-sales-plunge.png",
      "alt": "An aerial view of a vast automobile manufacturing complex, its long assembly halls and rows of buildings stretching to the horizon.",
      "credit": "Photo: Carsten Steger, Aerial image of the Wolfsburg Volkswagen Plant, 2024; CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "A Yorkshire cloth town petitions against the machines, 1786",
        "excerpt": "SHEWETH, That the Scribbling-Machines have thrown thousands of your petitioners out of employ, whereby they are brought into great distress, and are not able to procure a maintenance for their families, and deprived them of the opportunity of bringing up their children to labour.",
        "source": "Leeds Woollen Workers' Petition (1786), Internet Modern History Sourcebook, Fordham University",
        "href": "https://sourcebooks.fordham.edu/mod/1786machines.asp"
      },
      {
        "category": "historical",
        "title": "Detroit's Big Three are overrun in their own market, 1980",
        "excerpt": "For a generation the American giants that had invented the mass-market automobile ruled the road unchallenged. Then, at the turn of the 1980s, nimble Japanese makers built smaller, cheaper, more reliable cars than Detroit could answer, driving imports toward a fifth of U.S. sales while Ford, GM and Chrysler bled billions and idled hundreds of thousands of workers. Washington was reduced to pressuring Tokyo into 'voluntary' export restraints to shield its wounded champions, the moment the world's mightiest manufacturing power learned it could be beaten at home.",
        "source": "Stephen D. Cohen, 'The Route to Japan's Voluntary Export Restraints on Automobiles,' National Security Archive (American University)",
        "href": "https://nsarchive2.gwu.edu/japan/scohenwp.htm"
      },
      {
        "category": "literary",
        "title": "'Look on my Works, ye Mighty, and despair': Shelley's Ozymandias",
        "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), via American Literature",
        "href": "https://americanliterature.com/author/percy-bysshe-shelley/poem/ozymandias"
      },
      {
        "category": "literary",
        "title": "'Ill fares the land': Goldsmith's The Deserted Village",
        "excerpt": "Ill fares the land, to hastening ills a prey,\nWhere wealth accumulates, and men decay;\nPrinces and lords may flourish, or may fade;\nA breath can make them, as a breath has made:\nBut a bold peasantry, their country's pride,\nWhen once destroyed, can never be supplied.",
        "source": "Oliver Goldsmith, 'The Deserted Village' (1770), via Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Deserted_Village"
      },
      {
        "category": "artistic",
        "title": "Turner's The Fighting Temeraire: the old giant towed to the breakers",
        "excerpt": "A ghostly, pale-masted warship of the old sailing age, once a hero of Trafalgar, is dragged to the scrapyard by a squat, smoke-belching steam tug beneath a blazing sunset. Turner painted the picture in 1839 as an elegy for a superseded order, the majestic veteran of the wind eclipsed in a single canvas by the small, sooty, unstoppable machine of the new age.",
        "source": "J. M. W. Turner, 'The Fighting Temeraire' (1839), National Gallery, London, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:The_Fighting_Temeraire,_JMW_Turner,_National_Gallery.jpg",
        "image": {
          "src": "/covers/german-carmakers-china-sales-plunge--a4.png",
          "alt": "A ghostly, sunlit sailing warship of the old age is towed to the breaker's yard by a squat, smoke-belching steam tug beneath a fiery sunset.",
          "credit": "J. M. W. Turner, 'The Fighting Temeraire' (1839), National Gallery, London; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's Gotterdammerung: the Twilight of the Gods",
        "excerpt": "The final opera of Wagner's Ring cycle brings the reign of the gods to a cataclysmic close: their fortress Valhalla and the whole age they ruled are consumed in fire as a new order rises from the ashes. Its surging, valedictory music has become the very sound of an epoch ending, of the once-omnipotent brought low and the guard of an entire world changed forever.",
        "source": "Richard Wagner, 'Gotterdammerung' (Twilight of the Gods), WWV 86D (first published 1876), full score via IMSLP",
        "href": "https://imslp.org/wiki/G%C3%B6tterd%C3%A4mmerung,_WWV_86D_(Wagner,_Richard)"
      }
    ],
    "rank": 33
  },
  {
    "slug": "meta-instagram-ai-tool-reined-in",
    "headline": "Meta reins in a new AI tool that automatically accessed users' public Instagram images after criticism",
    "overview": "Following an outcry over privacy, Meta said around July 11, 2026 that it was scaling back a new artificial-intelligence feature that had been automatically drawing on people's public Instagram photos to generate AI content. Critics argued that users had not meaningfully consented to having their images fed into the system. Meta said it would add limits and give people clearer choices over how their pictures are used.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNV3dWTkVYeFZCMmRRcHZMa1BhSGU5dGxTM1VHQnhrV2NmSHJ5RmlGeHRBQmMxZmR0Zno4dmhyamh2NEIxZl9ZSnFtaEdXNDhOWUdWUVQyajk4Y3lpNml2YTA2WVJHRlhGZnJON3hncVpWSlREZ3YwbjFhNXBJYjdpQjJCSEhuVUY4UVZNMnhsOXZyQmdjR0tEM3dPRUdlMENVbV90clVhOFh6blljU05yUzRFTQ?oc=5"
      },
      {
        "name": "TechCrunch",
        "href": "https://techcrunch.com/2026/07/10/meta-removes-controversial-ai-feature-on-instagram-after-backlash/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/meta-instagram-ai-tool-reined-in.png",
      "alt": "The Instagram app icon glowing on a smartphone screen held at an angle.",
      "credit": "Yuri Samoilov / Wikimedia Commons (CC BY 2.0)"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Bentham's Panopticon: the machine for seeing without being seen (1791)",
        "excerpt": "A new mode of obtaining power of mind over mind, in a quantity hitherto without example: and that, to a degree equally without example, secured by whoever chooses to have it so, against abuse.",
        "source": "Jeremy Bentham, \"Panopticon; or, The Inspection-House\" (Preface), 1791",
        "href": "https://en.wikisource.org/wiki/Panopticon_or_the_Inspection-House"
      },
      {
        "category": "historical",
        "title": "Warren and Brandeis warn that the camera has breached the private threshold (1890)",
        "excerpt": "Instantaneous photographs and newspaper enterprise have invaded the sacred precincts of private and domestic life; and numerous mechanical devices threaten to make good the prediction that \"what is whispered in the closet shall be proclaimed from the house-tops.\"",
        "source": "Samuel D. Warren & Louis D. Brandeis, \"The Right to Privacy,\" Harvard Law Review, Vol. 4, No. 5, Dec. 15, 1890",
        "href": "https://groups.csail.mit.edu/mac/classes/6.805/articles/privacy/Privacy_brand_warr2.html"
      },
      {
        "category": "literary",
        "title": "The Picture of Dorian Gray: a likeness captured that takes on a life of its own",
        "excerpt": "\"How sad it is! I shall grow old, and horrible, and dreadful. But this picture will remain always young. It will never be older than this particular day of June.... If it were only the other way! If it were I who was to be always young, and the picture that was to grow old! For that—for that—I would give everything! Yes, there is nothing in the whole world I would not give! I would give my soul for that!\"",
        "source": "Oscar Wilde, \"The Picture of Dorian Gray,\" Chapter II, 1890 (Project Gutenberg)",
        "href": "https://www.gutenberg.org/files/174/174-h/174-h.htm"
      },
      {
        "category": "literary",
        "title": "Orwell's telescreen: the eye that watches every face and cannot be switched off",
        "excerpt": "In Orwell's Nineteen Eighty-Four, the poster reading BIG BROTHER IS WATCHING YOU stares from every wall, and the telescreen in each home both broadcasts and observes, dimming but never fully shutting off. Winston Smith learns to keep his back to the screen and his expression blank, because any glance, any twitch, might be captured and read. It is the nightmare of a citizen whose likeness and attention are always being harvested by a power he never agreed to be seen by.",
        "source": "George Orwell, \"Nineteen Eighty-Four,\" 1949 (Internet Archive)",
        "href": "https://archive.org/details/innernet_1984"
      },
      {
        "category": "artistic",
        "title": "Rubens' Juno and Argus: the hundred watching eyes, harvested and repurposed",
        "excerpt": "Peter Paul Rubens paints the aftermath of the myth in which Argus Panoptes, the giant whose hundred eyes never all slept at once, was set to watch over Io and was then slain by Mercury. In the canvas the goddess Juno gathers the eyes from his severed head and transplants them into the tail of her peacock, turning a slaughtered watchman's gaze into ornament. It is the ancient image of an all-seeing sentinel whose eyes, once taken without his consent, are reproduced and displayed for another's use.",
        "source": "Peter Paul Rubens, \"Juno and Argus,\" c. 1610, Wallraf-Richartz Museum, Cologne",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_Juno_and_Argus_-_WGA20280.jpg",
        "image": {
          "src": "/covers/meta-instagram-ai-tool-reined-in--a4.png",
          "alt": "Juno, attended by other figures and her peacocks, plucks the glowing eyes from the severed head of the hundred-eyed watchman Argus to set them into the bird's tail.",
          "credit": "Peter Paul Rubens, Juno and Argus (c. 1610), Wallraf-Richartz Museum, Cologne; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Redon's floating eye: a single disembodied gaze rising over the world",
        "excerpt": "Odilon Redon's lithograph turns an eye into a hot-air balloon, a solitary eyeball drifting up into the sky bearing a small dish beneath it. Detached from any face or body, the giant eye becomes pure watching, an observing organ set loose to roam and rise without limit. It reads as the perfect emblem of a disembodied, all-seeing gaze lifting above ordinary life and looking down on everyone at once.",
        "source": "Odilon Redon, \"The Eye, Like a Strange Balloon, Mounts Toward Infinity,\" 1882 (lithograph)",
        "href": "https://commons.wikimedia.org/wiki/File:Redon_-_L'oeil,_comme_un_ballon_bizarre,_se_dirige_vers_l'infini,_0217275.jpg"
      }
    ],
    "rank": 34
  },
  {
    "slug": "nicaragua-strips-lawyers-dissent",
    "headline": "Nicaragua strips scores of lawyers of their licenses, widening Ortega's crackdown on dissent",
    "overview": "Nicaragua's government revoked the licenses of numerous lawyers, many of whom had defended government critics, in the latest move by President Daniel Ortega and Vice President Rosario Murillo to silence opposition, rights groups said around July 11, 2026. The purge strips the accused of their profession and livelihood. It extends a years-long campaign that has jailed, exiled and stripped the citizenship of critics of the government.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNUXhHSm9tUnpUdGJRM1dHNGE5UXR5T1p3NHJRNHphYTBSaHJ0Sks2aFhEdmtGcThCZm5CVktZdnlIYzd1dnhjSE9JTGlTMVFGallieUFfWk93ay1JdUcxY3lZM0xYT1ZZSGswUHpMSE56bV9nVVRZWWpJX1VlSWpHWVh1M1BVNHFqN2dpcTBVRE9IeHo3WTVaNTBJQzY1T2VQUWVtRA?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/10/nicaragua-strips-lawyers-of-certification-in-latest-crackdown-on-dissent"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/nicaragua-strips-lawyers-dissent.png",
      "alt": "The weathered shell of the earthquake-ruined Old Cathedral of Managua, its twin bell towers and empty facade standing against a bright Nicaraguan sky.",
      "credit": "Photo: eric molina, 'Antigua Catedral de Managua'; CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Sulla's Proscriptions: Names Posted for Death in the Roman Forum (82 BC)",
        "excerpt": "He said that he was proscribing as many as he could remember, and those who now escaped his memory, he would proscribe at a future time. ... He took away the civil rights from the sons and grandsons of those who had been proscribed, and confiscated the property of all.",
        "source": "Plutarch, Life of Sulla, ch. 31 (trans. Bernadotte Perrin, Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Plutarch/Lives/Sulla*.html"
      },
      {
        "category": "historical",
        "title": "The Nazi Bar Purge: Disbarring Germany's Jewish and Dissident Lawyers (1933)",
        "excerpt": "Within weeks of taking power, the Nazi regime turned the machinery of law against its own guardians. Beginning with the April 7, 1933 laws barring \"non-Aryan\" and politically undesirable officials, the government stripped Jewish and Socialist judges, lawyers, and court officers of the right to practice, purging from the profession the very people who might defend the regime's targets. The measures erased careers and livelihoods overnight and signaled that the courts would now serve the state rather than justice.",
        "source": "United States Holocaust Memorial Museum, Holocaust Encyclopedia, \"Antisemitic Legislation 1933-1939\"",
        "href": "https://encyclopedia.ushmm.org/content/en/article/antisemitic-legislation-1933-1939"
      },
      {
        "category": "literary",
        "title": "Antigone Defies Creon's Decree: The Unwritten Laws Against a Tyrant's Edict",
        "excerpt": "Yes, since it was not Zeus that published me that edict, and since not of that kind are the laws which Justice who dwells with the gods below established among men. Nor did I think that your decrees were of such force, that a mortal could override the unwritten and unfailing statutes given us by the gods.",
        "source": "Sophocles, Antigone, lines 450-457 (trans. Richard C. Jebb), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0186%3Acard%3D441"
      },
      {
        "category": "literary",
        "title": "\"The first thing we do, let's kill all the lawyers\": Shakespeare on Tyranny and the Rule of Law",
        "excerpt": "DICK: The first thing we do, let's kill all the lawyers. CADE: Nay, that I mean to do. Is not this a lamentable thing, that of the skin of an innocent lamb should be made parchment? that parchment, being scribbled o'er, should undo a man?",
        "source": "William Shakespeare, Henry VI, Part 2, Act 4, Scene 2",
        "href": "http://shakespeare.mit.edu/2henryvi/2henryvi.4.2.html"
      },
      {
        "category": "artistic",
        "title": "Goya, The Third of May 1808 - The Execution of the Defenders",
        "excerpt": "Francisco Goya's painting freezes the moment a faceless firing squad levels its muskets at defenseless men. A white-shirted figure throws his arms wide in a posture of martyrdom, illuminated by a lone lantern against the darkness, while the bodies of the already-executed bleed at his feet. It is the definitive image of state power annihilating those who dared to resist, rendering the machinery of repression anonymous and the victims unforgettably human.",
        "source": "Francisco de Goya, El tres de mayo de 1808 en Madrid (1814), Museo del Prado, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:El_tres_de_mayo_de_1808_en_Madrid.jpg",
        "image": {
          "src": "/covers/nicaragua-strips-lawyers-dissent--a4.png",
          "alt": "A white-shirted man flings his arms wide before a faceless firing squad in the lantern-lit night, the bodies of the already-executed at his feet.",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Sibelius's \"Finlandia\": a suppressed nation's hymn against censorship",
        "excerpt": "Jean Sibelius composed Finlandia in 1899 as a defiant protest against the Russian empire's censorship of the Finnish press and its crackdown on dissent, and the authorities promptly banned its performance under its own name. Its churning, ominous opening gives way to a serene, swelling hymn that became the unofficial anthem of a people forbidden to speak freely. It endures as the sound of a nation's conscience refusing to be silenced by a censoring power.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1899; final version 1900), tone poem; full score via IMSLP (Petrucci Music Library).",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)"
      }
    ],
    "rank": 35
  },
  {
    "slug": "us-dangerous-heat-wave-july",
    "headline": "A dangerous heat wave threatens oppressive, near-record temperatures across much of the United States",
    "overview": "Forecasters warned on July 11 and 12, 2026 that a punishing heat wave would bring dangerous, near-record temperatures to a wide swath of the United States, with heat advisories stretching across the Midwest, South and East. Officials urged people to limit outdoor activity as humidity pushed the heat index to hazardous levels. The extreme heat came amid a summer of intensifying global temperature records.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMiigFBVV95cUxPM1NzQVhjN1Q2YkFWNjBIRjU3VzJfMGctRTNnVWk4MnI3S3ZBS3Z0WEJYY2JRN3doOURxeURJYWV4YmwxSVVIUGduTnRFMklRQTdMNU44ZzFiV09Xel9kS1kwWHMwbDVNanNDbGtQWDZpTGhPOWFYTmY1TjA0RVJDbnVKYkNVVFdHNHc?oc=5"
      },
      {
        "name": "The Weather Channel",
        "href": "https://weather.com/2026/07/11/forecast/regional/video/northern-rockies-heat-dome-record-breaking-temperatures"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/us-dangerous-heat-wave-july.png",
      "alt": "Sun-baked, cracked earth of a reservoir bed dried out under intense summer heat.",
      "credit": "Winyadav / Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Hesiod's Season of Wearisome Heat, When Sirius Parches Head and Knees",
        "excerpt": "But when the artichoke flowers, and the chirping grass-hopper sits in a tree and pours down his shrill song continually from under his wings in the season of wearisome heat, then goats are plumpest and wine sweetest; women are most wanton, but men are feeblest, because Sirius parches head and knees and the skin is dry through heat.",
        "source": "Hesiod, Works and Days (ll. 582-596), c. 700 BCE, translated by Hugh G. Evelyn-White (Loeb, 1914); the archaic Greek farmer's calendar of the killing high-summer heat under the Dog Star",
        "href": "https://www.gutenberg.org/cache/epub/348/pg348.txt"
      },
      {
        "category": "historical",
        "title": "The Portentous Summer of 1783: A Blood-Coloured Sun over England",
        "excerpt": "The summer of the year 1783 was an amazing and portentous one, and full of horrible phaenomena... The sun, at noon, looked as blank as a clouded moon, and shed a rust-coloured ferruginous light on the ground, and floors of rooms; but was particularly lurid and blood-coloured at rising and setting. All the time the heat was so intense that butchers’ meat could hardly be eaten on the day after it was killed.",
        "source": "Gilbert White, The Natural History of Selborne (1789), Letter LXV to Daines Barrington, describing the scorching, haze-choked summer that followed Iceland's Laki eruption",
        "href": "https://www.gutenberg.org/cache/epub/1408/pg1408.txt"
      },
      {
        "category": "literary",
        "title": "Coleridge's Becalmed Mariner Beneath a Hot and Copper Sky",
        "excerpt": "All in a hot and copper sky,\nThe bloody Sun, at noon,\nRight up above the mast did stand,\nNo bigger than the Moon.\n\nDay after day, day after day,\nWe stuck, nor breath nor motion;\nAs idle as a painted ship\nUpon a painted ocean.\n\nWater, water, every where,\nAnd all the boards did shrink;\nWater, water, every where,\nNor any drop to drink.",
        "source": "Samuel Taylor Coleridge, 'The Rime of the Ancient Mariner' (first published 1798)",
        "href": "https://www.gutenberg.org/cache/epub/151/pg151.txt"
      },
      {
        "category": "literary",
        "title": "Dante's Burning Desert: Flakes of Fire Raining on the Parched Sand",
        "excerpt": "O'er all the sand-waste, with a gradual fall,\nWere raining down dilated flakes of fire,\nAs of the snow on Alp without a wind... Thus was descending the eternal heat,\nWhereby the sand was set on fire, like tinder\nBeneath the steel, for doubling of the dole.",
        "source": "Dante Alighieri, Inferno, Canto XIV (c. 1320), Henry Wadsworth Longfellow translation (1867); heat as divine affliction in the seventh circle",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_14"
      },
      {
        "category": "artistic",
        "title": "Bruegel's Harvesters Sunk in the Heat of the Midday Wheat Field",
        "excerpt": "Pieter Bruegel the Elder's The Harvesters (1565) sets a sea of ripe, sun-bleached wheat under a hazy summer sky, the whole landscape shimmering in the heat. In the foreground the reapers have surrendered to the noonday sun, sprawled and slumped in the thin shade of a pear tree, one man asleep with his mouth open, too spent to keep working. It is a vision of humanity subdued by an oppressive summer, harvest and exhaustion bound together.",
        "source": "Pieter Bruegel the Elder, The Harvesters (1565), oil on panel, The Metropolitan Museum of Art, New York",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder-_The_Harvesters_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-dangerous-heat-wave-july--a4.png",
          "alt": "Golden fields of ripe wheat shimmer under a hazy summer sky as exhausted peasant reapers sprawl in the thin shade of a tree, overcome by the midday heat.",
          "credit": "Pieter Bruegel the Elder, The Harvesters (1565), The Metropolitan Museum of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Vivaldi's 'Summer': Man and Flock Languish Beneath the Blazing Sun",
        "excerpt": "Sotto dura Staggion dal Sole accesa\nLangue l' huom, langue 'l gregge, ed arde il Pino",
        "source": "Antonio Vivaldi, 'L'estate' (Summer), Concerto No. 2 in G minor, RV 315, from Le quattro stagioni, Op. 8 (published 1725); the accompanying sonnet reads 'Beneath the harsh season fired by the sun, man languishes, the flock languishes, and the pine tree burns.' Score on IMSLP.",
        "href": "https://imslp.org/wiki/Le_quattro_stagioni_(Vivaldi,_Antonio)"
      }
    ],
    "rank": 36
  },
  {
    "slug": "verstas-helsinki-timber-mortuary",
    "headline": "Verstas Architects completes a 'comforting and gentle' timber mortuary in Helsinki",
    "overview": "The Finnish studio Verstas Architects has completed a new mortuary and funeral facility in the Malmi district of Helsinki, using warm natural materials, soft daylight and timber to create what it calls a 'comforting and gentle' place for mourning and farewell, Dezeen reported on July 12, 2026. The building reframes a space devoted to death as one of quiet dignity and consolation. It adds to a growing movement toward humane, carefully considered architecture for grief.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/12/verstas-architects-malmi-mortuary/"
      },
      {
        "name": "City of Helsinki",
        "href": "https://www.hel.fi/en/news/facade-of-the-malmi-mortuary-finished"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/verstas-helsinki-timber-mortuary.png",
      "alt": "The curved, timber-clad Kamppi Chapel, a contemporary Finnish wooden building on a square in central Helsinki.",
      "credit": "Vadelmavene / Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Herodotus and the mourning rites of ancient Egypt (Histories, Book II, 5th century BCE)",
        "excerpt": "The following is the way in which they conduct their mournings and their funerals:- On the death in any house of a man of consequence, forthwith the women of the family beplaster their heads, and sometimes even their faces, with mud; and then, leaving the body indoors, sally forth and wander through the city, with their dress fastened by a band, and their bosoms bare, beating themselves as they walk.",
        "source": "Herodotus, The Histories, Book II, trans. George Rawlinson (Wikisource)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_2"
      },
      {
        "category": "historical",
        "title": "Francois Bernier before the Taj Mahal, a mausoleum raised out of grief (Travels in the Mogul Empire, A.D. 1656-1668)",
        "excerpt": "...the mausoleum of Tage Mehale is an astonishing work. It is possible I may have imbibed an Indian taste; but I decidedly think that this monument deserves much more to be numbered among the wonders of the world than the pyramids of Egypt, those unshapen masses which when I had seen them twice yielded me no satisfaction.",
        "source": "Francois Bernier, Travels in the Mogul Empire, A.D. 1656-1668, trans. Archibald Constable (Internet Archive)",
        "href": "https://archive.org/details/travelsinmogulem00bernuoft"
      },
      {
        "category": "literary",
        "title": "Thomas Gray, 'Elegy Written in a Country Churchyard' (1751)",
        "excerpt": "Beneath those rugged elms, that yew-tree's shade,\nWhere heaves the turf in many a mouldering heap,\nEach in his narrow cell for ever laid,\nThe rude forefathers of the hamlet sleep.",
        "source": "Thomas Gray, Elegy Written in a Country Churchyard (Thomas Gray Archive)",
        "href": "https://www.thomasgray.org/texts/poems/elcc"
      },
      {
        "category": "literary",
        "title": "Walt Whitman's carol to death in 'When Lilacs Last in the Dooryard Bloom'd' (1865)",
        "excerpt": "Come lovely and soothing death,\nUndulate round the world, serenely arriving, arriving,\nIn the day, in the night, to all, to each,\nSooner or later delicate death.",
        "source": "Walt Whitman, Leaves of Grass (1891-92 'Deathbed' edition), Project Gutenberg",
        "href": "https://www.gutenberg.org/files/1322/1322-h/1322-h.htm"
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin, 'Die Toteninsel' (Isle of the Dead), third version, 1883",
        "excerpt": "Böcklin's serene, dreamlike island rises from glassy dark water, a ring of pale rock-cut tombs enclosing a grove of towering black cypresses. A small boat carries a single upright figure draped in white toward the shore, a coffin at its feet, gliding into a hushed architecture built entirely for repose. The painter called it 'a picture for dreaming', and generations have read it as the archetype of a dignified, consoling house for the dead.",
        "source": "Arnold Böcklin, Die Toteninsel (Isle of the Dead), 1883, Alte Nationalgalerie, Berlin (Wikimedia Commons)",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Toteninsel_III_(Alte_Nationalgalerie,_Berlin).jpg",
        "image": {
          "src": "/covers/verstas-helsinki-timber-mortuary--a4.png",
          "alt": "A lone white-clad figure is ferried across still, dark water toward a walled island of towering cypresses and pale rock-hewn tombs, under a hushed twilight sky.",
          "credit": "Arnold Böcklin, Die Toteninsel (Isle of the Dead), third version, 1883, Alte Nationalgalerie, Berlin. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gabriel Fauré, Requiem in D minor, Op. 48, closing with 'In Paradisum' (1877-1893)",
        "excerpt": "Fauré called his Requiem a 'lullaby of death', deliberately turning away from terror and judgment toward tenderness and rest. It closes not with wrath but with 'In Paradisum', a shimmering, weightless prayer that angels lead the departed into paradise, the harp and voices rising like light through timber and stone. Like Verstas Architects' gentle mortuary, the work reframes death as consolation, a soft and dignified place of farewell rather than dread.",
        "source": "Gabriel Fauré, Requiem, Op. 48 (public-domain scores), IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Requiem,_Op.48_(Faur%C3%A9,_Gabriel)"
      }
    ],
    "rank": 37
  },
  {
    "slug": "noskova-wins-wimbledon",
    "headline": "Linda Noskova wins her first Grand Slam title at Wimbledon",
    "overview": "The Czech player Linda Noskova captured her maiden Grand Slam singles title at Wimbledon on July 12, 2026, regrouping after a nervous start to lift the trophy on tennis's most storied grass. The breakthrough crowns a fast-rising career on the sport's grandest stage. Noskova said a glimpse of the championship trophies during a bathroom break had helped her refocus at a decisive moment.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxPbGVFMkRELTVjOFZwLXJEUHZ1R2dqZmJ3S2w1WV83Nm56OGd2M2ZuLXdMazZIWElnUXIzVHBqR2tPbW5OMHl5NmlRQlp2OHRqNThZdkNIYms3MDY0TVQxOU0yVDRhQlJGU1JidEhPUktpbE1sVE5aT1JjN3Q5X1N4X0ExTnRySjNQck5xR093VHpyMlB0Mnc?oc=5"
      },
      {
        "name": "WTA",
        "href": "https://www.wtatennis.com/news/4533700/at-21-linda-noskova-caps-brilliant-fortnight-to-become-youngest-wimbledon-champion-in-15-years-defeats-karolina-muchova"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/noskova-wins-wimbledon.png",
      "alt": "Czech tennis player Linda Noskova on court during the 2023 US Open.",
      "credit": "Hameltion / Wikimedia Commons (CC BY-SA 4.0)"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The boy Alkimedon crowned with olive at Olympia (c. 460 BC), sung by Pindar in his Eighth Olympian Ode",
        "excerpt": "O mother of gold-crowned contests, Olympia, queen of truth; where men that are diviners observing burnt-offerings make trial of Zeus the wielder of white lightnings... Now the boy was fair to look upon, neither shamed he by his deeds his beauty, but in the wrestling match victorious made proclamation that his country was Aigina of long oars.",
        "source": "Pindar, Olympian Ode VIII, trans. Ernest Myers (1874), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/8"
      },
      {
        "category": "historical",
        "title": "Spencer Gore lifts the very first Wimbledon title on the club's new lawns, 1877 — the debut champion of a game not yet a fortnight old",
        "excerpt": "On 19 July 1877, before a few hundred spectators at the All England Croquet and Lawn Tennis Club, a 27-year-old rackets player named Spencer Gore beat William Marshall 6-1, 6-2, 6-4 to win the world's first official lawn tennis tournament. Twenty-two men had each paid a guinea to enter; Gore carried off twelve guineas and a silver challenge cup, and in doing so became the first name inscribed on a trophy that would grow into sport's most storied grass-court crown.",
        "source": "The 1877 Wimbledon Championship, Wikipedia",
        "href": "https://en.wikipedia.org/wiki/1877_Wimbledon_Championship"
      },
      {
        "category": "literary",
        "title": "Apollo consecrates the laurel to victory — the mythic origin of the champion's wreath (Ovid, Metamorphoses, Book I)",
        "excerpt": "Although thou canst not be my bride, thou shalt be called my chosen tree, and thy green leaves, O Laurel! shall forever crown my brows, be wreathed around my quiver and my lyre; the Roman heroes shall be crowned with thee, as long processions climb the Capitol and chanting throngs proclaim their victories; and as a faithful warden thou shalt guard the civic crown of oak leaves fixed between thy branches, and before Augustan gates. And as my youthful head is never shorn, so, also, shalt thou ever bear thy leaves unchanging to thy glory.",
        "source": "Ovid, Metamorphoses, Book I (Apollo and Daphne), trans. Brookes More (1922), via Perseus Digital Library",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=1:card=525"
      },
      {
        "category": "literary",
        "title": "John Keats, awed and trembling beneath the laurel sprigs set upon his 'ambitious head' — a young poet's first crown",
        "excerpt": "Minutes are flying swiftly; and as yet / Nothing unearthly has enticed my brain / Into a delphic labyrinth — I would fain / Catch an unmortal thought to pay the debt / I owe to the kind poet who has set / Upon my ambitious head a glorious gain — / Two bending laurel sprigs — 'tis nearly pain / To be conscious of such a coronet. / Still time is fleeting, and no dream arises / Gorgeous as I would have it — only I see / A trampling down of what the world most prizes, / Turbans and crowns, and blank regality; / And then I run into most wild surmises / Of all the many glories that may be.",
        "source": "John Keats, 'On Receiving a Laurel Crown from Leigh Hunt' (1816-17), via Mapping Keats's Progress (Univ. of Victoria)",
        "href": "https://johnkeats.uvic.ca/poem_on_receiving_a_laurel_crown_from.html"
      },
      {
        "category": "artistic",
        "title": "Frank Dicksee, 'Victory, a Knight Being Crowned with a Laurel-Wreath' — the moment the winner receives the ultimate laurel",
        "excerpt": "A young armoured knight kneels or stands at the height of his triumph while the laurel wreath is lowered onto his brow, the emblem of victory pressed at last upon the deserving head. Dicksee, a Victorian master of romantic pageantry, freezes exactly the instant a challenger becomes a champion — the crowd, the wreath, and the crowning gesture all bent toward the newly made victor.",
        "source": "Frank Bernard Dicksee (1853-1928), oil painting, public domain, via Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Dicksee-Victory,_A_Knight_Being_Crowned_With_A_Laurel-Wreath.jpg",
        "image": {
          "src": "/covers/noskova-wins-wimbledon--a4.png",
          "alt": "A triumphant young knight in armour is crowned with a green laurel wreath, the classic emblem of victory lowered onto the champion's head.",
          "credit": "Frank Bernard Dicksee (1853-1928), 'Victory, a Knight Being Crowned with a Laurel-Wreath', public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Elgar, 'Pomp and Circumstance' March No. 1 in D (Op. 39) — the broad, cresting melody that has become the world's sound of triumphal procession",
        "excerpt": "Elgar's grandest march builds from a striding, ceremonial opening to the soaring central 'Land of Hope and Glory' theme, music written for pageantry and coronation and ever since bound to moments of arrival and honour. It is the swelling, unhurried majesty of a champion walking out to be crowned, the crowd rising as the melody lifts toward its blaze of brass.",
        "source": "Edward Elgar, Pomp and Circumstance Military Marches, Op. 39, No. 1 (1901); full scores public domain via IMSLP",
        "href": "https://imslp.org/wiki/Pomp_and_Circumstance,_Op.39_(Elgar,_Edward)"
      }
    ],
    "rank": 38
  },
  {
    "slug": "cuba-islandwide-blackout-grid",
    "headline": "An islandwide blackout strikes Cuba for the second time in a week as its power grid crumbles",
    "overview": "Cuba was plunged into a nationwide blackout for the second time in a week on July 11, 2026 as its aging, fuel-starved power grid failed again, leaving millions without electricity. Chronic fuel shortages and decrepit thermoelectric plants have pushed the island's system to the brink of collapse. The repeated failures have deepened hardship and public frustration across the country.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP News",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxPSDM2dE5Jck56TlEtSHVlM1pMUmN1UkpqdVFiSkZteWROMWoxQmduVl9FSnUxTGsxajRKOW9DMFBkMS1DdGU4ZjJ4S3JKcUloSTNSU05WcUFQMnRfNFpYNEJDWXlRNm5peWVnTEhTWjZIM0RVTmdvWjVodzFoMldBVmgtdEhqaHJ2VU1lQks4bw?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/10/cuba-suffers-second-island-wide-blackout-in-a-week-amid-trump-fuel-blockade"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-12",
    "image": {
      "src": "/covers/cuba-islandwide-blackout-grid.png",
      "alt": "The rooftops and streets of Old Havana glowing under scattered lights at night.",
      "credit": "Gabriel Rodriguez / Wikimedia Commons (CC BY-SA 2.0)"
    },
    "edition": "Afternoon Edition · 12 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The dimmed sun of 536 AD: a year the light failed over the ancient world",
        "excerpt": "For the sun gave forth its light without brightness, like the moon, during this whole year, and it seemed exceedingly like the sun in eclipse, for the beams it shed were not clear nor such as it is accustomed to shed. And from the time when this thing happened men were free neither from war nor pestilence nor any other thing leading to death.",
        "source": "Procopius, History of the Wars, Book IV (The Vandalic War), ch. 14 (6th century AD; H. B. Dewing trans., Loeb Classical Library)",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Wars/4D*.html"
      },
      {
        "category": "historical",
        "title": "New York's Night of Terror: the 1977 blackout that swallowed a city whole",
        "excerpt": "At 9:34 on the sweltering night of July 13, 1977, lightning strikes toppled New York City's power grid and plunged eight million people into darkness for some twenty-five hours. Where the earlier 1965 outage had passed in orderly calm, this one detonated a city already frayed by fiscal crisis, heat, and fear: arsonists set more than a thousand fires and looters stripped roughly 1,600 stores before the lights returned. The blackout became a lasting emblem of a metropolis pushed to the edge, its fragile systems and its social order failing together in the dark.",
        "source": "New York City blackout of 1977 (July 13-14, 1977)",
        "href": "https://en.wikipedia.org/wiki/New_York_City_blackout_of_1977"
      },
      {
        "category": "literary",
        "title": "The plague of thick darkness over Egypt: a darkness which may be felt",
        "excerpt": "And the LORD said unto Moses, Stretch out thine hand toward heaven, that there may be darkness over the land of Egypt, even darkness which may be felt. And Moses stretched forth his hand toward heaven; and there was a thick darkness in all the land of Egypt three days: They saw not one another, neither rose any from his place for three days: but all the children of Israel had light in their dwellings.",
        "source": "Exodus 10:21-23, King James Version (1611)",
        "href": "https://www.biblegateway.com/passage/?search=Exodus%2010%3A21-23&version=KJV"
      },
      {
        "category": "literary",
        "title": "Byron's \"Darkness\": the bright sun extinguished and a world groping toward its end",
        "excerpt": "I had a dream, which was not all a dream.\nThe bright sun was extinguish'd, and the stars\nDid wander darkling in the eternal space,\nRayless, and pathless, and the icy earth\nSwung blind and blackening in the moonless air;\nMorn came and went--and came, and brought no day,\nAnd men forgot their passions in the dread\nOf this their desolation; and all hearts",
        "source": "Lord Byron (George Gordon), \"Darkness\" (1816), lines 1-8",
        "href": "https://rpo.library.utoronto.ca/content/darkness"
      },
      {
        "category": "artistic",
        "title": "Georges de La Tour, \"The Magdalen with the Smoking Flame\": a single flame against the encroaching dark",
        "excerpt": "In this candlelit night scene of around 1640, Georges de La Tour lets one small flame do battle with an ocean of blackness. The Magdalen sits before a guttering lamp, her hand resting on a skull, the light licking her face and hands while everything beyond dissolves into shadow. It is a painting about the fragility of light itself: how a whole visible world can shrink to the reach of a single trembling flame, and how the dark presses in the moment that flame falters.",
        "source": "Georges de La Tour, \"The Magdalen with the Smoking Flame,\" c. 1640, oil on canvas, Los Angeles County Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:Georges_de_La_Tour_-_The_Magdalen_with_the_Smoking_Flame_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/cuba-islandwide-blackout-grid--a4.png",
          "alt": "A woman sits in near-total darkness beside a single guttering candle flame, its light falling on her face, hands, and a skull while the rest of the room dissolves into black.",
          "credit": "Georges de La Tour, \"The Magdalen with the Smoking Flame,\" c. 1640, Los Angeles County Museum of Art; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Haydn's \"Farewell\" Symphony: the lights snuffed out one by one until the stage goes dark",
        "excerpt": "Composed in 1772, Joseph Haydn's Symphony No. 45 in F-sharp minor ends with one of music's most theatrical acts of vanishing. In the closing Adagio the players finish their lines one by one, each blowing out the candle on his music stand and walking off, until only two muted violins remain in the near-dark. Written so Haydn's musicians could plead to leave their prince's remote palace, the \"Farewell\" turns the extinguishing of lights into the very substance of the piece, a slow descent into darkness and departure.",
        "source": "Joseph Haydn, Symphony No. 45 in F-sharp minor, Hob. I:45, \"Farewell\" (Abschiedssymphonie), 1772 (score, IMSLP)",
        "href": "https://imslp.org/wiki/Symphony_No.45_in_F-sharp_minor,_Hob.I:45_(Haydn,_Joseph)"
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
