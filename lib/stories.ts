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
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
  },
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
