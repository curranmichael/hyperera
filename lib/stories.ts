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
    "slug": "us-service-member-killed-northern-iraq",
    "headline": "A U.S. service member is killed and another wounded in an Iranian attack in northern Iraq as the war's American death toll reaches 17",
    "overview": "U.S. Central Command said a U.S. service member was killed and another wounded in an Iranian attack in northern Iraq on Sunday, one day after two American soldiers were killed in a strike in Jordan. The Associated Press reported that 17 U.S. service members have now died in the war with Iran, a conflict fought largely in the air through missile and drone exchanges. The latest death deepens an escalating confrontation that has drawn in American bases across the region.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxPbWhlMjhBVDQ5MWpFeHNXcUZOcHF4S2NYVzlRRXo4WFhOTmRyWHI1elU3aGRKN21pVzJMTFpvQkIwak9yWnNVbERyNFpuUUhZYTR1SHA3UUJYSlc2MDNDSjhkaXROVFBuelhQbV8xSnlSYTl2Um5VOXNHQ0VqdXRzaEo2djloRWNuSXNaUm1kS2J5VkhvTC1qMDdkWmdmZlo4c3RVRjZ2WlVPUV9SR08yZktIYkNneHc?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMihAFBVV95cUxOR0hpOHR6RFNuWW1CU2M2ZXdqMVgta1lXUld6b2VBSTMzTXdicTQweDJZZ2RaQnhoenBYdExDN0ZtRjlsb3NxRTB4SGtCQUw2aW9jbWZHaWJsc3dhUjVXeDVPRm5NcVQxSVdITmxRbFdMTXlmVTBiWFFDUTNJbnJscWVYc2k?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/us-service-member-killed-northern-iraq.png",
      "alt": "A U.S. Air Force F-15 fighter jet climbing steeply into the sky",
      "credit": "U.S. Air Force (Staff Sgt. Jeffrey Allen). Public domain, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 53 BC the Roman triumvir Marcus Licinius Crassus, hungry for the military glory that rivaled Pompey and Caesar, led roughly 40,000 legionaries across the Euphrates into Parthian Mesopotamia. Near the town of Carrhae, in what is today the borderland of northern Iraq and Syria, the Parthian general Surena trapped the heat-exhausted Romans on open ground and destroyed them with mounted horse-archers who loosed arrows from a distance and never closed to hand-to-hand fighting. Crassus himself was killed during a treacherous parley, and Plutarch reports about twenty thousand Romans slain and ten thousand taken prisoner, with the survivors hunted down as they fled. The disaster opened centuries of grinding, inconclusive warfare between Rome and Parthia along the same Mesopotamian frontier. Just as Crassus's soldiers died far from Rome in the deserts of Mesopotamia, caught in an escalating contest between two empires that neither could end, American service members are now dying in northern Iraq in a war of long-range strikes between the United States and Iran.",
        "excerpt": "Crassus was killed by a Parthian, called Pomaxathres; others say, by a different man, and that Pomaxathres only cut off his head and right hand after he had fallen. But this is conjecture rather than certain knowledge, for those that were by had not leisure to observe particulars, and were either killed fighting about Crassus, or ran off at once to get to their comrades on the hill. But the Parthians coming up to them, and saying that Crassus had the punishment he justly deserved, and that Surena bade the rest come down from the hill without fear, some of them came down and surrendered themselves, others were scattered up and down in the night, a very few of whom got safe home, and others the Arabians, beating through the country, hunted down and put to death. It is generally said, that in all twenty thousand men were slain, and ten thousand taken prisoners.",
        "source": "Plutarch, Life of Crassus (on the death of Crassus at Carrhae, 53 BC), in Plutarch's Lives, translated by John Dryden and revised by Arthur Hugh Clough; via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Lives_(Dryden_translation)/Crassus",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a0.png",
          "alt": "Roman marble portrait head identified as Marcus Licinius Crassus",
          "credit": "Head of Marcus Licinius Crassus, middle of the 1st century BC, Ny Carlsberg Glyptotek, Copenhagen. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In October 1962 the discovery of Soviet nuclear missile sites in Cuba brought the United States and the Soviet Union to the brink of nuclear war. For thirteen days President John F. Kennedy and Premier Nikita Khrushchev traded ultimatums and naval maneuvers while the world waited, with Kennedy warning that any missile fired from Cuba would require a full retaliatory response upon the Soviet Union. On October 27, 1962, the tensest day of the crisis, a U.S. Air Force U-2 reconnaissance plane was shot down over Cuba by a Soviet surface-to-air missile, killing its pilot, Major Rudolf Anderson Jr., the only combat death of the confrontation. His death, ordered by a local Soviet commander without Moscow's direct approval, showed how quickly a standoff between superpowers could turn lethal and how easily events could slip past the leaders trying to control them. Just as Major Anderson was killed far from home by a missile amid tit-for-tat escalation that neither capital fully commanded, U.S. service members are now dying in northern Iraq in an air war of missiles and drones between two powers locked in reprisal.",
        "excerpt": "We no longer live in a world where only the actual firing of weapons represents a sufficient challenge to a nation's security to constitute maximum peril. Nuclear weapons are so destructive and ballistic missiles are so swift, that any substantially increased possibility of their use or any sudden change in their deployment may well be regarded as a definite threat to peace. For many years both the Soviet Union and the United States, recognizing this fact, have deployed strategic nuclear weapons with great care, never upsetting the precarious status quo which insured that these weapons would not be used in the absence of some vital challenge.",
        "source": "John F. Kennedy, Radio and Television Address to the American People on the Soviet Arms Buildup in Cuba, October 22, 1962 (public domain U.S. government work); via Wikisource.",
        "href": "https://en.wikisource.org/wiki/John_F._Kennedy%27s_Address_on_the_Buildup_of_Arms_in_Cuba",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a1.png",
          "alt": "Portrait of Major Rudolf Anderson Jr., U.S. Air Force U-2 pilot",
          "credit": "U.S. Air Force portrait of Major Rudolf Anderson Jr. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Homer's Iliad, composed in the eighth century BC, opens not with triumph but with rage and death: the wrath of Achilles that hurls the souls of countless warriors down to the underworld, leaving their bodies unburied on a foreign shore. The whole epic turns on cycles of vengeance: Achilles withdraws in anger, his friend Patroclus is killed, Achilles kills Hector in revenge, and Hector's father Priam must come begging for his son's body. Again and again Homer names men who fall far from the homes and fathers they will never see again, killed in a war begun over a quarrel between powerful men. The poem's unblinking catalogue of the slain has made it the West's founding meditation on soldiers dying in someone else's fight. Just as the Iliad mourns warriors who perished on a distant shore in an escalating chain of reprisal, this news tells of Americans killed far from home in a widening war of blow and counter-blow.",
        "excerpt": "Achilles' wrath, to Greece the direful spring\nOf woes unnumber'd, heavenly goddess, sing!\nThat wrath which hurl'd to Pluto's gloomy reign\nThe souls of mighty chiefs untimely slain;\nWhose limbs unburied on the naked shore,\nDevouring dogs and hungry vultures tore.\nSince great Achilles and Atrides strove,\nSuch was the sovereign doom, and such the will of Jove!",
        "source": "Homer, The Iliad, Book I, translated by Alexander Pope; Project Gutenberg eBook #6130.",
        "href": "https://www.gutenberg.org/files/6130/6130-h/6130-h.htm",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a2.png",
          "alt": "Marble bust of the poet Homer",
          "credit": "Bust of Homer, British Museum. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Wilfred Owen wrote Dulce et Decorum est in 1917 while recovering from shell shock at Craiglockhart hospital, and it was published in 1920, two years after he was killed in action one week before the Armistice. The poem describes a British gas attack on the Western Front: exhausted soldiers stumbling through mud, one man too slow with his mask, drowning in his own lungs as the poet watches helplessly. Owen ends by denouncing as a lie the old Roman line that it is sweet and fitting to die for one's country. His verse strips away the glory of war to show its mechanized cruelty and the young men consumed by it far from home. Just as Owen forced his readers to see the real cost paid by ordinary soldiers sent to die abroad, the deaths of U.S. service members in northern Iraq are the human price beneath the abstractions of missile exchange and strategic escalation.",
        "excerpt": "Gas!  GAS!  Quick, boys!--An ecstasy of fumbling\nFitting the clumsy helmets just in time,\nBut someone still was yelling out and stumbling\nAnd flound'ring like a man in fire or lime.--\nDim through the misty panes and thick green light,\nAs under a green sea, I saw him drowning.\n\nIn all my dreams before my helpless sight\nHe plunges at me, guttering, choking, drowning.\n\nIf in some smothering dreams, you too could pace\nBehind the wagon that we flung him in,\nAnd watch the white eyes writhing in his face,\nHis hanging face, like a devil's sick of sin,\nIf you could hear, at every jolt, the blood\nCome gargling from the froth-corrupted lungs\nBitter as the cud\nOf vile, incurable sores on innocent tongues,--\nMy friend, you would not tell with such high zest\nTo children ardent for some desperate glory,\nThe old Lie:  Dulce et decorum est\nPro patria mori.",
        "source": "Wilfred Owen, Dulce et Decorum est, in Poems (London, 1920), edited by Siegfried Sassoon; Project Gutenberg eBook #1034.",
        "href": "https://www.gutenberg.org/cache/epub/1034/pg1034.txt",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a3.png",
          "alt": "Photographic portrait of the poet Wilfred Owen",
          "credit": "Photograph of Wilfred Owen, c. 1916. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya painted The Third of May 1808 in 1814 to commemorate the Spanish civilians executed by Napoleon's occupying army in Madrid after the uprising of the previous day. The canvas, now in the Museo del Prado, shows a faceless firing squad in rigid line-abreast gunning down a group of terrified townsmen lit by a single harsh lantern, one figure in a white shirt thrown into a Christlike pose of surrender. Goya refuses to ennoble the killing: the soldiers are an anonymous machine, the victims are known only by their fear, and the ground is already littered with the dead. Painted in the wake of the Peninsular War, it became the archetypal image of state violence and the cycle of uprising and brutal reprisal in modern conflict. Just as Goya fixes the moment when retaliation between an occupier and the occupied hardens into ordinary, anonymous killing, the deaths in northern Iraq mark ordinary soldiers caught in an escalating cycle of strike and counter-strike.",
        "excerpt": "A firing squad of faceless soldiers leans into their rifles in the dark, a single boxy lantern throwing white light onto the men about to die. At the center a man in a white shirt flings his arms wide, his eyes huge, while corpses already lie in their own blood at his feet and a line of the condemned stretches back into the night. The killing is mechanical, anonymous, and unending, the executioners painted as one blank machine and the victims as separate, terrified human faces.",
        "source": "Francisco de Goya, The Third of May 1808 (El Tres de Mayo de 1808), 1814, oil on canvas, Museo Nacional del Prado, Madrid; image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a4.png",
          "alt": "Goya's painting The Third of May 1808 showing a firing squad executing civilians",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Between 1914 and 1916, as the First World War consumed Europe, the English composer Gustav Holst wrote Mars, the Bringer of War, the opening movement of his orchestral suite The Planets, Op. 32. Built on a relentless five-beat ostinato pounded out by strings and timpani, the music grows from a menacing whisper into grinding, dissonant climaxes of brass and organ, evoking not a heroic battle but the impersonal, mechanized momentum of modern war. Holst, writing before the tank and the mass air raid had fully arrived, seemed to hear the machinery of destruction moving on its own, indifferent to the men caught inside it. First performed in full in 1920, it remains the most vivid musical portrait of war as a force beyond any single hand to guide. Just as Mars depicts violence that builds by its own momentum toward catastrophe, the war between the United States and Iran advances through a self-feeding cycle of missile and drone strikes that neither side seems able to halt.",
        "excerpt": "A relentless five-beat rhythm hammers in the low strings and drums, quiet at first, then swelling as brass and organ pile onto it in grinding, dissonant chords. The music never argues or pleads; it simply advances, mechanical and impersonal, building toward a shattering climax of collision and collapse. It is the sound of war as a process that has slipped past any single hand to guide it, its momentum feeding on itself until it detonates.",
        "source": "Gustav Holst, Mars, the Bringer of War, from The Planets, Op. 32 (composed 1914-1916); full score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/us-service-member-killed-northern-iraq--a5.png",
          "alt": "Photographic portrait of the composer Gustav Holst",
          "credit": "Photograph of Gustav Holst. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "spain-win-world-cup-final-2026",
    "headline": "Spain beat 10-man Argentina 1-0 in extra time to win the 2026 World Cup",
    "overview": "Spain defeated Argentina 1-0 after extra time to win the 2026 World Cup, scoring the decisive goal against an Argentine side reduced to 10 men. The result denied Lionel Messi's Argentina back-to-back titles and delivered Spain its second men's World Cup, sixteen years after its first. The final capped a tournament co-hosted by the United States, Canada and Mexico.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxOVUx2OGh0QS1KQmVRb2g0SGlOYmdmdzlEd1E1dTlnYmJoWElCMHR4dnUtR0k3RlMxX3hUcDg1b3VjS2dTVWVKMjN3MmtacGhXWV9VRDg3RTBWSFRfel9nVkFuX21pbFZkTzhkcXhESHJqWUFIcmxaRzRHTFNCYzNsZ3N3Ymo3d1otR2dOSGNQRlpYdFJpbXJHZVdiVnRxTWNnOV9GLVRnanhTZWFhczdYczhsZw?oc=5"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxQTG45T0ZaXzVrTjdEaDBIT010bmFkclUtOGh1NHVyR3NIaFJ2RmV0RHRHTTllR29hWktPczZIN2tiRGJJS3QzWUZCWTlJZ1JCSHp4U0UzVnQ5UkYtb2oyMjBzZ3RndlZYRWVEUzlCS3RWTVNYMS1uM2l6emI5c0dUbzlEREJTN3RxNkItMjV5MGNxcUxMVHc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/spain-win-world-cup-final-2026.png",
      "alt": "A replica of the FIFA World Cup Trophy on display",
      "credit": "Ank Kumar, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In August 480 BC, King Leonidas of Sparta held the narrow coastal pass of Thermopylae with a few thousand Greeks against the vast invading army of the Persian king Xerxes. When a local man named Ephialtes betrayed a mountain path and the defenders were surrounded, Leonidas dismissed most of his allies and made a last stand with his three hundred Spartans and a band of Thespians. Their spears shattered, they fought on with swords, and finally with hands and teeth on a low hillock until they were buried under a storm of Persian arrows, as Herodotus records in his Histories. The doomed defense became the ancient world's emblem of courage against impossible odds and of honor won even in defeat. Just as the shorthanded Spartans earned undying glory even as they were overwhelmed, ten-man Argentina's doomed resistance in the 2026 final showed that a side can fall one blow short and still leave the arena wreathed in honor.",
        "excerpt": "On this spot while defending themselves with daggers, that is those who still had them left, and also with hands and with teeth, they were overwhelmed by the missiles of the Barbarians, some of these having followed directly after them and destroyed the fence of the wall, while others had come round and stood about them on all sides.",
        "source": "Herodotus, The History of Herodotus, Book VII (Polymnia), ch. 225, translated by G. C. Macaulay (Macmillan, 1890); Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/2456/2456-h/2456-h.htm",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a0.png",
          "alt": "Jacques-Louis David's painting of King Leonidas amid the Spartans before the Battle of Thermopylae",
          "credit": "Jacques-Louis David, Leonidas at Thermopylae (1814), Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "On 18 June 1815, near the Belgian village of Waterloo, the Emperor Napoleon Bonaparte staked his restored throne on one last battle against the Duke of Wellington's Anglo-Allied army and Marshal Blucher's advancing Prussians. Late in the day he flung his elite Imperial Guard, the veterans who had never been beaten, up the ridge in a final bid for victory, and, met by disciplined British fire, they broke and fled for the first time in their history. The French army dissolved into rout, and Napoleon, who spoke of dying on the field, was led away as his era closed forever. Sir Edward Creasy ranked Waterloo among the fifteen decisive battles that shaped the world. Just as the greatest commander of his age was denied one final triumph and watched his reign end on that field, Lionel Messi's Argentina was denied back-to-back crowns, and a champion's era passed as the last charge fell short.",
        "excerpt": "Some regiments of the Old Guard in vain endeavoured to form in squares and stem the current. They were swept away, and wrecked among the waves of the flyers. Napoleon had placed himself in one of these squares: Marshal Soult, Generals Bertrand, Drouot, Corbineau, De Flahaut, and Gourgaud, were with him. The Emperor spoke of dying on the field, but Soult seized his bridle and turned his charger round, exclaiming, \"Sire, are not the enemy already lucky enough?\"",
        "source": "Sir Edward Shepherd Creasy, The Fifteen Decisive Battles of the World: from Marathon to Waterloo, ch. XV, 'The Battle of Waterloo, A.D. 1815' (first published 1851); Project Gutenberg ebook #4061.",
        "href": "https://www.gutenberg.org/cache/epub/4061/pg4061.txt",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a1.png",
          "alt": "George Jones's painting of Napoleon leaving the field of Waterloo amid his fleeing army",
          "credit": "George Jones, Napoleon Leaving the Field of Waterloo, 18 June 1815, Nottingham City Museums & Galleries, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "In Homer's Iliad, the climactic duel of the Trojan War pits Achilles, the greatest of the Greek warriors, against Hector, the noble champion and shield of Troy. Deceived by the goddess Athena and abandoned by the gods, Hector realizes he stands alone, yet resolves to die not as a fugitive but in a deed worthy of memory, charging Achilles sword in hand before a spear finds the one gap in his armor. Alexander Pope's celebrated verse translation renders Hector's defiance as he chooses a glorious end over a shameful flight. The scene has stood for nearly three millennia as the archetype of the hero who falls at the very height of the contest, mourned even by his enemies. Just as Troy's champion met his fate in single combat and passed into legend, Messi, the talisman of his generation, was overcome in the arena, a hero denied one last victory before the watching world.",
        "excerpt": "Then welcome fate! ’Tis true I perish, yet I perish great: Yet in a mighty deed I shall expire, Let future ages hear it, and admire!",
        "source": "Homer, The Iliad, Book XXII (The Death of Hector), translated by Alexander Pope (1715-1720); Project Gutenberg ebook #6130.",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a2.png",
          "alt": "Peter Paul Rubens's painting of Achilles slaying Hector in single combat",
          "credit": "Peter Paul Rubens, Achilles Slays Hector (c. 1630-1635), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Alfred, Lord Tennyson wrote 'Ulysses' in 1833 and first published it in 1842, giving voice to the aged Greek hero Odysseus who, restless after his long-sought return to Ithaca, resolves to set sail once more toward the unknown. Old and weakened by time, he summons his mariners for a final voyage, refusing to let age or fate end his quest for noble deeds and vowing to strive, to seek, to find, and not to yield. The poem is the supreme English meditation on the twilight of a heroic life and on the will that endures even as strength fades. Written soon after the death of his friend Arthur Hallam, it fuses private grief with defiant resolve. Just as Tennyson's aging hero insists on one more great endeavor even knowing his powers have waned, Messi sought a last crowning triumph at the close of his era, a bid that, though it fell short, spoke to that same unyielding will.",
        "excerpt": "Tho’ much is taken, much abides; and tho’ We are not now that strength which in old days Moved earth and heaven; that which we are, we are; One equal temper of heroic hearts, Made weak by time and fate, but strong in will To strive, to seek, to find, and not to yield.",
        "source": "Alfred, Lord Tennyson, 'Ulysses' (first published 1842), in The Early Poems of Alfred Lord Tennyson; Project Gutenberg ebook #8601.",
        "href": "https://www.gutenberg.org/files/8601/8601-h/8601-h.htm",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a3.png",
          "alt": "Photographic portrait of the poet Alfred, Lord Tennyson, 1869",
          "credit": "Portrait of Alfred, Lord Tennyson, 1869, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The Winged Victory of Samothrace, carved in gleaming marble around 190 BC and now the crowning glory of the Louvre's grand Daru staircase, depicts the goddess Nike alighting on the prow of a warship. Her wings still beat and her drapery streams as if against a sea wind, capturing the very instant of triumph, most likely raised to commemorate a Greek naval victory in the Aegean. Discovered in fragments on the island of Samothrace in 1863, the headless, armless figure remains among the most celebrated sculptures of the Hellenistic age. She is antiquity's purest embodiment of victory made visible, exultant motion frozen in stone. Just as Nike descends to bestow the laurel at the moment of conquest, Spain's players felt victory alight upon them as the final whistle blew in extra time, while their opponents could only watch the goddess pass them by.",
        "excerpt": "Poised on the prow of a ship, the goddess seems to have just swept down out of the sky, her great wings still sweeping the air behind her. The sea wind presses her thin robe against her body and gathers it into deep, driving folds. There is no head and no arms, and yet nothing feels missing: the whole marble surges forward in the exultant instant of a triumph won.",
        "source": "Winged Victory of Samothrace (Victoire de Samothrace), Hellenistic Greek, c. 190 BC, marble, Musee du Louvre, Paris (inv. Ma 2369).",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010252531",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a4.png",
          "alt": "The Winged Victory of Samothrace, a Hellenistic marble sculpture of the goddess Nike on a ship's prow",
          "credit": "Winged Victory of Samothrace, Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel composed the chorus 'See, the Conqu'ring Hero Comes' in the summer of 1747 to a libretto by Thomas Morell; first written for the oratorio Joshua, its popularity led Handel to add it to Judas Maccabaeus (HWV 63), where it hails the victorious hero's return. Beginning with a hushed treble chorus and building through trumpets and drums to a jubilant full ensemble, the music enacts a conqueror's homecoming, with laurels, sports, and songs of triumph prepared to greet him. It became one of the most enduring victory anthems in Western music, sounded at coronations, medal ceremonies, and the openings of new railways across nineteenth-century Britain. The melody is still played today when champions are crowned. Just as Handel's chorus swells to welcome the triumphant hero home with trumpets and rejoicing, Spain returned as conquering champions of the 2026 World Cup, greeted by the roar of a stadium and a nation's acclaim.",
        "excerpt": "Voices enter softly, and then the trumpets and drums break in and the whole chorus rises in exultation to greet the returning victor. Handel builds the music like a procession: the laurel is brought, songs of triumph are prepared, and the hero's brow is made ready for its crown. It is the sound of a champion welcomed home, a wave of communal joy that has hailed the victorious for nearly three centuries.",
        "source": "George Frideric Handel, 'See, the Conqu'ring Hero Comes,' chorus from the oratorio Judas Maccabaeus, HWV 63 (composed 1747; libretto by Thomas Morell); International Music Score Library Project (IMSLP).",
        "href": "https://imslp.org/wiki/Judas_Maccabaeus,_HWV_63_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/spain-win-world-cup-final-2026--a5.png",
          "alt": "Thomas Hudson's 1756 portrait of the composer George Frideric Handel",
          "credit": "Thomas Hudson, portrait of George Frideric Handel (1756), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "nolan-odyssey-box-office-opening",
    "headline": "Christopher Nolan's 'The Odyssey' opens to $264.1 million worldwide, topping his 'Oppenheimer' debut",
    "overview": "Christopher Nolan's 'The Odyssey,' an adaptation of Homer's epic poem, opened to $264.1 million in worldwide ticket sales, the studio said, surpassing the debut of Nolan's 'Oppenheimer.' The launch ranks among the strongest global openings yet for the director. Some classicists have questioned the film's liberties with the ancient text even as audiences turned out in force.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxQcmM5OFFvSjFuYmlTNkR1SkhuWXdzWjZuRkFjN2VDTFpuejJ6M1l0SFJjemcxZm1GM1BURDhkem1UZmVQajNGV2tlMlRNLTR5RXhaVU1QVlI3VXFVWjJoaUwzZHA3VkkwcC10X0luQnVLeFMzVExrdUoyQTdIRmZ4M0pGWWFHa1h5UHhBNmRJaVBkTEpvbllLcFRTN04?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxQei1XQkJWZ3l6WjVKc0xDNjVMbVhCd0oxanlsUUlzcGJHc01zYTdSRnN4Z0pVNHJqZ2ZSX1IzWVFNSkV3MlBzb1RWOUlDaDkxSDhPNk1lWnFuNlE1SmhzbkVCTURZNXJ3ZXdGTm1zLXV6TDZCOWUyTld2aXhoa3lMQndRVmVVM1pHcFlHVVVEdWg2YkJqX1A3cmRzdEZuVGdQVG1XMzROd1ZMX1l0QVJzLS1PSHJZOWh6T3RLSWEtN05wVVU?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/nolan-odyssey-box-office-opening.png",
      "alt": "Herbert James Draper's painting Ulysses and the Sirens",
      "credit": "Herbert James Draper, 'Ulysses and the Sirens' (1909). Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In classical Athens, Homer's epics were not read privately but performed aloud by professional reciters called rhapsodes at great civic festivals such as the Panathenaea. Plato's dialogue 'Ion' (composed around 380 BCE) captures one such star performer, the rhapsode Ion, fresh from winning first prize at the festival of Asclepius in Epidaurus, who moved audiences numbering in the tens of thousands to tears and terror as he chanted the deeds of Odysseus and Achilles. Socrates treats this as a kind of divine possession, a chain of inspiration running from the Muse through the poet to the performer and finally into the crowd. The recitation of Homer was, in other words, the mass entertainment of its age, a shared public spectacle staged for the whole city. Just as Ion held twenty thousand faces rapt with Homer's tale in the open theatre, Nolan's 'The Odyssey' drew millions into darkened cinemas worldwide on a single opening weekend to hear the same ancient story told anew.",
        "excerpt": "Well, Ion, and what are we to say of a man who at a sacrifice or festival, when he is dressed in holiday attire, and has golden crowns upon his head, of which nobody has robbed him, appears weeping or panic-stricken in the presence of more than twenty thousand friendly faces, when there is no one despoiling or wronging him;--is he in his right mind or is he not?",
        "source": "Plato, 'Ion,' translated by Benjamin Jowett. Project Gutenberg eBook #1635 (archived at gutenberg.org).",
        "href": "https://www.gutenberg.org/ebooks/1635",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a0.png",
          "alt": "Marble portrait bust of the philosopher Plato",
          "credit": "Roman copy of a portrait bust of Plato, Glyptothek, Munich. Photo: User:Bibi Saint-Pol, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 18 April 1914 the Italian silent epic 'Cabiria,' directed by Giovanni Pastrone with intertitles by the poet Gabriele D'Annunzio, premiered in Turin and Milan and became one of the first true blockbusters of the cinema age. Set during the Punic Wars, it dazzled audiences with monumental sets, a towering statue of the god Moloch, and sweeping tracking shots, and it was screened in grand theatres with live orchestras as a prestige public event. The film proved that the ancient world could be rebuilt as spectacle for a new mass medium, influencing D. W. Griffith and generations of epic filmmakers. It turned classical antiquity into a ticketed marvel that drew crowds far beyond the readers of any book. Just as 'Cabiria' transformed the old epic imagination into a shared cinematic sensation for a modern public, Nolan's 'The Odyssey' packages Homer's three-thousand-year-old story as a global opening-weekend event measured in hundreds of millions of dollars.",
        "excerpt": "Premiering in Turin and Milan in the spring of 1914, 'Cabiria' turned the ancient Mediterranean into a moving cathedral of plaster and light, its colossal sets and roaming camera making antiquity feel newly, thrillingly alive. Audiences filed into grand halls where full orchestras underscored the flames of Moloch's temple, and left having witnessed something closer to a civic festival than a mere show. It was proof that the oldest stories could become the newest spectacle.",
        "source": "Still from 'Cabiria' (1914), directed by Giovanni Pastrone; Library of Congress print collection, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Cabiria_LCCN2007676108-restored.jpg",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a1.png",
          "alt": "Restored poster-style still from the 1914 Italian silent epic Cabiria",
          "credit": "Still/print from 'Cabiria' (1914), Library of Congress; restoration by H. Morgillo. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Homer's 'Odyssey,' composed in Greek roughly in the eighth century BCE, is the founding poem of the long voyage home, the nostos of Odysseus as he struggles for ten years to return to Ithaca after the fall of Troy. In the prose translation by Samuel Butler (1900), the poem opens by invoking the Muse to sing of the 'ingenious hero' who wandered far, suffered much at sea, and fought to bring his men safely home. Every later voyage narrative in the Western tradition is in some sense a descendant of this single text, which fuses homecoming, cunning, and the pull of the familiar hearth. It is the sacred old story that Nolan's film both honours and rearranges. Just as the 'Odyssey' has been endlessly recited, translated, and reimagined without exhausting its hold on audiences, Nolan's adaptation draws record crowds precisely because the tale of the man trying to get home still speaks to everyone.",
        "excerpt": "Tell me, O Muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home; but do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home.",
        "source": "Homer, 'The Odyssey,' translated by Samuel Butler. Project Gutenberg eBook #1727 (archived at gutenberg.org).",
        "href": "https://www.gutenberg.org/ebooks/1727",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a2.png",
          "alt": "Marble bust traditionally identified as the poet Homer",
          "credit": "Hellenistic-style marble bust of Homer, British Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "James Joyce's 'Ulysses,' first published in Paris in 1922, is the most famous modern retelling of Homer, mapping the wanderings of Odysseus onto a single ordinary day, 16 June 1904, in Dublin. Its hero, the advertising canvasser Leopold Bloom, is a comic, tender everyman whose small-scale odyssey through the city mirrors, episode by episode, the structure of the ancient epic. Joyce transplanted the sacred old framework into the textures of modern urban life, insisting that myth still lived in the mundane, a project that scandalised some readers even as it electrified others. The book was banned and prosecuted before being recognised as a landmark; its 1922 text is now in the public domain and freely available on Project Gutenberg. Just as Joyce took liberties with Homer's epic to make it new for his own age and provoked purists in the process, Nolan reinvents the 'Odyssey' for the screen, delighting mass audiences even as some classicists question his departures from the ancient text.",
        "excerpt": "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed. A yellow dressinggown, ungirdled, was sustained gently behind him on the mild morning air. He held the bowl aloft and intoned: —Introibo ad altare Dei.",
        "source": "James Joyce, 'Ulysses' (1922). Project Gutenberg eBook #4300 (archived at gutenberg.org).",
        "href": "https://www.gutenberg.org/ebooks/4300",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a3.png",
          "alt": "Portrait photograph of the writer James Joyce, 1915",
          "credit": "James Joyce photographed by Alex Ehrenzweig, 1915 (restored). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The British painter Herbert James Draper completed 'Ulysses and the Sirens' in 1909, a large oil now held at the Ferens Art Gallery in Kingston upon Hull. It depicts the climactic sea-peril of the 'Odyssey': Odysseus lashed to the mast of his ship, straining against his bonds, while sensuous sirens clamber aboard and swirl through the water around the vessel, embodying the deadly seduction that threatens to derail his homecoming. Draper renders the ancient scene with late-Victorian drama and lush colour, translating Homer's verse into a single arresting visual spectacle. The painting is a reminder that the 'Odyssey' has always been reinterpreted through the popular art forms of each era. Just as Draper turned the story's most cinematic moment into a grand, crowd-pleasing image for gallery audiences, Nolan stages the same mythic perils as blockbuster spectacle for viewers around the world.",
        "excerpt": "Odysseus is bound to the mast, sinews taut, his face torn between longing and resolve as the sirens rise dripping from the swell to claw their way aboard. Draper crowds the canvas with sea-green water and pale, urgent bodies, so that the single instant of temptation becomes a whole storm of motion. It is Homer's warning against the sweet voice that would keep a man from home, painted as pure spectacle.",
        "source": "Herbert James Draper, 'Ulysses and the Sirens' (1909), oil on canvas, Ferens Art Gallery, Kingston upon Hull; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Herbert_James_Draper,_Ulysses_and_the_Sirens,_1909.jpg",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a4.png",
          "alt": "Painting of Odysseus bound to the mast as sirens surround his ship",
          "credit": "Herbert James Draper, 'Ulysses and the Sirens' (1909), Ferens Art Gallery. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Claudio Monteverdi's opera 'Il ritorno d'Ulisse in patria' ('The Return of Ulysses to His Homeland'), with a libretto by Giacomo Badoaro, premiered in Venice during the 1639-1640 carnival season and is one of the earliest surviving operas. It dramatises the final movement of the 'Odyssey', the nostos itself: Ulysses' arrival home in Ithaca, the suffering of the faithful Penelope, the slaughter of the suitors, and the couple's long-delayed reunion. Written for Venice's new public opera houses, it turned Homer's homecoming into ticketed musical theatre for a paying urban audience, a genuinely popular spectacle of its day. Monteverdi treats the ancient tale not as a museum piece but as living drama, freely shaped to move contemporary listeners. Just as Monteverdi recast the 'Odyssey' as grand public entertainment for seventeenth-century Venice and found a new mass audience for the old epic, Nolan recasts the same homecoming as twenty-first-century cinema drawing record crowds.",
        "excerpt": "Monteverdi lets the whole weight of the 'Odyssey' fall on its ending, the moment of return, so that years of wandering resolve into a single reunion of husband and wife. Voices ache and swell over the strings as Ulysses sheds his disguise and Penelope, at last, dares to believe. It is the nostos made audible, homecoming staged as public music for a paying crowd.",
        "source": "Claudio Monteverdi, 'Il ritorno d'Ulisse in patria,' SV 325 (1640); full score via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Il_ritorno_d%27Ulisse_in_patria_(Monteverdi,_Claudio)",
        "image": {
          "src": "/covers/nolan-odyssey-box-office-opening--a5.png",
          "alt": "Etched portrait of the composer Claudio Monteverdi",
          "credit": "Etching of Claudio Monteverdi by Barberis. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "taylor-farms-lettuce-cyclospora-recall",
    "headline": "Taylor Farms recalls lettuce in 27 states after the FDA links iceberg lettuce sold at Taco Bell and Walmart to a cyclospora outbreak",
    "overview": "The U.S. Food and Drug Administration identified iceberg lettuce supplied by Taylor Farms and sold at Taco Bell and Walmart locations as the source of a cyclospora outbreak, and Taylor Farms recalled lettuce shipped to 27 states. Cyclosporiasis is an intestinal illness caused by a microscopic parasite spread through contaminated food or water. Health officials urged consumers and restaurants to check for and discard affected products.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxPakZ4ckZETnFzYzROSFpIZmRrZHdPeTl6Mmo4ZVFjYmhJVTl3ZHNjcFRLZmotODlGYVZ5Y2hIdjJxa3NvZUFQb0M0SXRuZGJ5Vi1kMGE2N2RNa0RGMTZLRWYzTmZYME10WVBoRlFsN2tpRUtFY2M2cnlRME90S0dUQWdXRkdUUXJWem43b2dIOWd4YW5GczZPY0w5eF83UVZBOWNoVVJzUlo4SEdh?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c4gw9n1kx9do"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/taylor-farms-lettuce-cyclospora-recall.png",
      "alt": "Heads of iceberg lettuce growing in a field",
      "credit": "Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In late August 1854 a violent cholera outbreak erupted in the Soho district of London, killing more than 500 people in the space of about ten days. The physician John Snow, skeptical of the reigning \"miasma\" theory that blamed foul air, mapped every death and traced the cluster to a single public water pump on Broad Street whose well had been fouled by sewage. When he persuaded the parish authorities to remove the pump's handle, the outbreak subsided, and his investigation became a founding case of modern epidemiology. Snow's method was simple but revolutionary: follow the sick back to the one thing they had in common. Just as John Snow tied hundreds of cholera cases to a single tainted pump, the FDA traced this cyclospora outbreak back to iceberg lettuce from one supplier, Taylor Farms, that had fanned out to Taco Bell and Walmart across 27 states.",
        "excerpt": "On proceeding to the spot, I found that nearly all the deaths had taken place within a short distance of the pump. There were only ten deaths in houses situated decidedly nearer to another street pump. In five of these cases the families of the deceased persons informed me that they always sent to the pump in Broad-street, as they preferred the water to that of the pumps which were nearer. In three other cases the deceased were children who went to school near the pump in Broad-street.",
        "source": "John Snow, On the Mode of Communication of Cholera, 2nd ed. (London: John Churchill, 1855), reproduced on the UCLA John Snow Site, UCLA Fielding School of Public Health.",
        "href": "https://epi-snow.ph.ucla.edu/Stream2_BSPoutbreak_d.html",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a0.png",
          "alt": "John Snow's 1854 map of cholera deaths clustered around the Broad Street pump in Soho, London",
          "credit": "John Snow, cholera map from On the Mode of Communication of Cholera (1855). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In 430 BC, in the second year of the Peloponnesian War, a devastating plague struck Athens while its population was crowded behind the city walls. The historian Thucydides, who caught the disease and survived, recorded that it first appeared in the port of Piraeus, prompting rumors that the enemy Peloponnesians had poisoned the cisterns there. He carefully set down the symptoms so that the sickness might be recognized if it ever returned, refusing to merely guess at its ultimate cause. His account is one of the earliest attempts to reason about how a contagion enters and spreads through a population from a common point. Just as the frightened Athenians suspected their water supply had been tainted at a single source, modern investigators hunted down the hidden origin of the cyclospora sickness and found it in lettuce shipped from one grower to stores and restaurants nationwide.",
        "excerpt": "Suddenly falling upon Athens, it first attacked the population in Piraeus—which was the occasion of their saying that the Peloponnesians had poisoned the reservoirs, there being as yet no wells there—and afterwards appeared in the upper city, when the deaths became much more frequent.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (trans. Richard Crawley). Project Gutenberg eBook #7142.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a1.png",
          "alt": "Michael Sweerts, 'Plague in an Ancient City' (c. 1652), a scene of death often identified with the Plague of Athens",
          "credit": "Michael Sweerts, Plague in an Ancient City, c. 1652–54, Los Angeles County Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe's A Journal of the Plague Year, published in 1722, is a vivid fictionalized eyewitness account of the Great Plague that ravaged London in 1665. Narrated by a citizen who stays in the city as it empties, the book dwells on the terror of an infection that moved unseen, carried by people who looked perfectly healthy and did not yet know they were sick. Defoe returns again and again to the impossibility of quarantine when the contagion spreads insensibly through those who show no symptoms. The horror lies not in visible danger but in the invisible, in provisions and bodies that seem safe until it is too late. Just as Defoe's Londoners could not see the contagion passing among them, cyclospora is an invisible parasite that rode along on ordinary iceberg lettuce, sickening consumers who had no way of knowing their food was contaminated.",
        "excerpt": "the danger was spreading insensibly, for the sick could infect none but those that came within reach of the sick person; but that one man who may have really received the infection and knows it not, but goes abroad and about as a sound person, may give the plague to a thousand people, and they to greater numbers in proportion, and neither the person giving the infection or the persons receiving it know anything of it, and perhaps not feel the effects of it for several days after.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722). Project Gutenberg eBook #376.",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a2.png",
          "alt": "Contemporary illustration of the Great Plague of London, 1665",
          "credit": "The Great Plague of London, 1665. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Sophocles' tragedy Oedipus the King, first performed in Athens around 429 BC, opens with the city of Thebes in the grip of a devastating plague that blights the crops, the herds, and the wombs of women alike. The oracle declares that the pestilence will lift only when the hidden source of the city's pollution is found and driven out, and King Oedipus vows to hunt down the cause. His relentless investigation into the true origin of the sickness ultimately reveals that he himself is the unwitting pollution he seeks. The play is an archetype of the inquiry as public-health detective story: a community cannot heal until the concealed source of its affliction is exposed. Just as Thebes could not recover until the hidden cause of its plague was identified, the outbreak at Taco Bell and Walmart could not be stopped until the FDA traced the contamination back to its true source and Taylor Farms pulled the tainted lettuce from shelves.",
        "excerpt": "She wasteth in the fruitless buds of earth,\nIn parched herds and travail without birth\nOf dying women: yea, and midst of it\nA burning and a loathly god hath lit\nSudden, and sweeps our land, this Plague of power;\nTill Cadmus' house grows empty, hour by hour,\nAnd Hell's house rich with steam of tears and blood.",
        "source": "Sophocles, Oedipus, King of Thebes (trans. Gilbert Murray, 1911). Project Gutenberg eBook #27673.",
        "href": "https://www.gutenberg.org/cache/epub/27673/pg27673.txt",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a3.png",
          "alt": "Oedipus and the Sphinx of Thebes, Attic red-figure kylix, c. 470 BC, Vatican Museums",
          "credit": "Attic red-figure kylix attributed to the Oedipus Painter, c. 470 BC, Vatican Museums. Photo: Carole Raddato, CC BY-SA 2.0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin's tempera painting Die Pest (The Plague), completed in 1898 and held at the Kunstmuseum Basel, personifies epidemic disease as a winged, dragon-like beast ridden by a scythe-wielding figure of Death. The creature swoops low through a narrow medieval street, and in its wake bodies crumple to the ground while survivors flee in panic. Painted late in the artist's life, the work channels the ancient European dread of a contagion that arrives from nowhere and passes invisibly from body to body. It renders in a single terrifying image the idea of sickness sweeping through a community faster than anyone can escape it. Just as Böcklin's plague descends unseen upon an ordinary town, an invisible parasite in everyday lettuce spread quietly through the food supply of 27 states before officials could name and recall its source.",
        "excerpt": "A winged monster the color of decay skims through a cramped town street, and on its back rides a pale figure scattering death with a swinging scythe. Below, the living stumble over the fallen, too slow to outrun a thing that moves through the air itself. Böcklin gives contagion a face but leaves its approach as silent and inescapable as any real epidemic.",
        "source": "Arnold Böcklin, Die Pest (The Plague), 1898, tempera on wood, Kunstmuseum Basel. Via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a4.png",
          "alt": "Arnold Böcklin, 'Die Pest' (The Plague), 1898, Death riding a winged beast through a town",
          "credit": "Arnold Böcklin, Die Pest (The Plague), 1898, Kunstmuseum Basel. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Camille Saint-Saëns composed his tone poem Danse macabre, Op. 40, in 1874, drawing on the medieval \"dance of death\" tradition that flourished in the plague-haunted Europe of the late Middle Ages. In the music, Death appears at midnight, tunes his fiddle, and summons the dead from their graves to dance until the crowing of the cock scatters them at dawn. The danse macabre motif itself was born of the mass mortality of the Black Death, when art insisted that pestilence levels rich and poor without distinction. Saint-Saëns turns that grim folk memory into a whirling, rattling orchestral showpiece. Just as the danse macabre imagines death moving unbidden through a whole population, a single contaminated crop moved silently across state lines, reaching diners and shoppers who never suspected the danger on their plates.",
        "excerpt": "At the stroke of midnight Death draws his bow across the strings, and the dead rise to spin in a clattering waltz until the first cockcrow drives them back underground. The melody is gay and macabre at once, a reminder that the plague once made dancers of everyone it touched. It is the sound of mortality moving freely and impartially through a crowd.",
        "source": "Camille Saint-Saëns, Danse macabre, Op. 40 (1874). Score and details via IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Danse_macabre,_Op.40_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/taylor-farms-lettuce-cyclospora-recall--a5.png",
          "alt": "Portrait of the composer Camille Saint-Saëns",
          "credit": "Camille Saint-Saëns (portrait). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "jingye-british-steel-compensation-claim",
    "headline": "China's Jingye demands UK compensation over the nationalization of British Steel",
    "overview": "China's Jingye Group is demanding compensation from the British government over losses tied to the nationalization of British Steel, whose Scunthorpe works London took control of under emergency powers to keep the country's last virgin steelmaking running. Jingye, which bought British Steel in 2020, says its investment was effectively expropriated. The dispute adds strain to already tense UK-China commercial ties.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxPektqZmZxSDJVTGl0S2lFMU9vT2h3bkw1ekk5YWJPMENWNHBrYUpjNnJMWGRPLTJEd1JHdUpoMW5yN24zRTZvdEhITmMxMEd0dURHTXhNdXpfT2g3WHFIVzZCMTBfMmJXcmUyVkNXdkRLM0JFNWstdU1vS1drMnI5ODBlQmtoRU9hUUJ1YmNLQTJITVpxVGk5VGxFVQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxNc2RqYlFpN2JQRTF1eV9zWnJEWHQxeThpU1Uya2VLVEVqRUFDSUljajMzRTNodE1NWUhlVjdqc3hsMjNqZUVEZF9BSHFpNThWLXAtODZFeXgzdVotSFFla3B4RHo5OTlieHFldkdNaExoVE15WjAwYVZ4QkhtLTlFeXVrVGxHTUdxQjlvOE4zS2I4TC1YVUdoRkhXM1doMW9feEZuUmdMVHJheTFERVE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/jingye-british-steel-compensation-claim.png",
      "alt": "The British Steel works at Scunthorpe, England",
      "credit": "Gareth James, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 18 March 1938 Mexican president Lázaro Cárdenas announced the expropriation of the assets of seventeen foreign oil companies, chiefly the British-Dutch Royal Dutch Shell (El Águila) and the American Standard Oil, after the firms defied a Supreme Court order to settle a bitter labor dispute. Cárdenas placed the wells, refineries and pipelines under a new state monopoly, Petróleos Mexicanos (Pemex), casting oil as the patrimony of the nation rather than the property of foreign shareholders. London and Washington protested furiously, Britain briefly broke off diplomatic relations, and the companies organized a global boycott of Mexican crude while demanding compensation for their seized holdings. After years of arbitration Mexico eventually paid a negotiated sum, far below the owners' original claims, and 18 March became a national holiday. Just as Cárdenas seized foreign-owned oil in the name of national sovereignty and left the former owners pressing for compensation, Britain's emergency takeover of Scunthorpe has left Jingye demanding to be paid for an investment it says was effectively expropriated.",
        "excerpt": "On 18 March 1938, Mexico's President Lázaro Cárdenas signed a decree seizing the properties of foreign oil companies that had defied his government and the courts. Overnight, wells, refineries and pipelines built with foreign capital became the patrimony of the Mexican nation, gathered into the new state firm Pemex. The expelled owners denounced the act as theft and spent years pressing for the compensation they insisted their expropriated assets were worth.",
        "source": "Mexican oil expropriation (18 March 1938), overview via Wikipedia, archived by the Wikimedia Foundation.",
        "href": "https://en.wikipedia.org/wiki/Mexican_oil_expropriation",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a0.png",
          "alt": "Portrait of Mexican president Lázaro Cárdenas",
          "credit": "Lázaro Cárdenas, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In March 1951 the Iranian parliament, led by nationalist prime minister Mohammad Mossadegh, voted to nationalize the Anglo-Iranian Oil Company, the British-controlled concern whose vast Abadan refinery was the largest in the world and whose profits flowed overwhelmingly to London. Britain regarded the company's assets as its property and its lifeblood, imposed a Royal Navy blockade and a global embargo on Iranian oil, and took its claim to the International Court of Justice while Abadan ground to a halt. The confrontation between a sovereign government asserting control over its own resources and a foreign owner demanding redress culminated in 1953 in the CIA- and MI6-backed coup that toppled Mossadegh. The episode became the twentieth century's defining clash between economic nationalism and foreign capital. Just as the British-owned oil company insisted its expropriated Iranian assets must be compensated when a sovereign state seized them, Jingye now stands where the foreign owner once stood, demanding payment from a British government that has invoked national interest to take control of British Steel.",
        "excerpt": "In 1951 Iran's parliament nationalized the Anglo-Iranian Oil Company, wresting the giant Abadan refinery from British hands and declaring the country's oil to be Iranian property. Britain answered with a naval blockade and a worldwide boycott, insisting that the company's seized assets be restored or paid for in full. What began as a quarrel over who owned the wells ended two years later in a foreign-backed coup that removed Mossadegh from power.",
        "source": "Nationalization of the Anglo-Iranian Oil Company and the Abadan Crisis (1951-1953), overview via Wikipedia, archived by the Wikimedia Foundation.",
        "href": "https://en.wikipedia.org/wiki/Abadan_Crisis",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a1.png",
          "alt": "Portrait of Iranian prime minister Mohammad Mossadegh",
          "credit": "Mohammad Mosaddegh, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Émile Zola's novel Germinal (1885) plunges into the coalfields of northern France, where the young migrant Étienne Lantier arrives at the Voreux pit and finds the mine looming in the darkness like a living, insatiable creature. Through the doomed strike of the Maheu family and their fellow miners, Zola dramatizes the grinding collision between labor and the distant capital of the shareholders, between the men who dig the coal and the invisible owners who profit from it. The pit itself becomes a monster that swallows human flesh to feed industry, a symbol of an industrial order that treats workers as fuel. The novel's title, evoking the revolutionary month of Germinal, hints at the buried seeds of revolt. Just as Zola imagined heavy industry as a devouring beast fed by human labor and owned by remote masters, the fight over Scunthorpe pits the men and the nation at the furnaces against a distant owner, raising anew the old question of who truly controls the means of production.",
        "excerpt": "This pit, piled up in the bottom of a hollow, with its squat brick buildings, raising its chimney like a threatening horn, seemed to him to have the evil air of a gluttonous beast crouching there to devour the earth.",
        "source": "Émile Zola, Germinal (1885), English translation, Project Gutenberg (ebook 56528).",
        "href": "https://www.gutenberg.org/cache/epub/56528/pg56528-images.html",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a2.png",
          "alt": "Photographic portrait of Émile Zola by Nadar",
          "credit": "Émile Zola photographed by Nadar, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "William Blake's short lyric beginning \"And did those feet in ancient time,\" written around 1804 as a preface to his epic Milton and later set to music as the hymn Jerusalem, contrasts a vision of a holy, green England with the \"dark Satanic mills\" of the dawning industrial age. In a few charged stanzas Blake indicts the smoke-belching factories and forges that were remaking the nation, and vows a spiritual struggle to build a just society amid them. The poem fuses iron, industry and national destiny into a single burning image, turning the machinery of manufacture into a moral question about what England should become. It has since served as an anthem for those who believe the country's soul is bound up with its labor and its land. Just as Blake set England's identity against the mills that powered its industry, the battle for Britain's last virgin steelworks casts the blast furnaces of Scunthorpe as sinews of national power too vital to leave in foreign hands.",
        "excerpt": "And did the Countenance Divine\nShine forth upon our clouded hills?\nAnd was Jerusalem builded here\nAmong those dark Satanic mills?",
        "source": "William Blake, \"And did those feet in ancient time\" (Preface to Milton, c. 1804), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/And_did_those_feet_in_ancient_time",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a3.png",
          "alt": "Portrait of William Blake by Thomas Phillips",
          "credit": "William Blake by Thomas Phillips, 1807, National Portrait Gallery, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Adolph Menzel's monumental painting Das Eisenwalzwerk (The Iron Rolling Mill), completed in 1875 and now in the Alte Nationalgalerie in Berlin, is one of the first great European canvases to take heavy industry as its subject. It depicts the searing interior of a Silesian rolling mill, where bare-armed workers wrestle a glowing white-hot bar of iron beneath vast machinery, their bodies lit by the furnace glare in a swirl of smoke and effort. Menzel, who made scores of preparatory studies on the factory floor, captured both the raw power of modern steelmaking and the toll it exacted on the men who fed it. The work became an icon of the industrial age and of labor as spectacle and sacrifice. Just as Menzel monumentalized the forge as the fiery heart of a rising nation's strength, the struggle over Scunthorpe treats its furnaces as the irreplaceable sinews of British power, worth seizing to keep alight.",
        "excerpt": "Menzel's canvas throws open the doors of a roaring rolling mill, where men strain half-naked against a bar of iron pulled white-hot from the furnace. Light and smoke coil around their bodies as the great machinery towers over them, indifferent and immense. It is industry rendered as both glory and ordeal, the making of iron shown as the making of a nation's power.",
        "source": "Adolph Menzel, Das Eisenwalzwerk (The Iron Rolling Mill), 1875, Alte Nationalgalerie, Berlin; via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a4.png",
          "alt": "Painting of workers at a glowing iron rolling mill",
          "credit": "Adolph Menzel, The Iron Rolling Mill (1875), Alte Nationalgalerie, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Wright of Derby's painting An Iron Forge, exhibited in 1772 and now in the Tate collection, shows a family gathered around a glowing bar of white-hot iron on the anvil of a blacksmith's forge during the early Industrial Revolution. Wright, celebrated for his dramatic candlelit scenes, makes the incandescent metal the sole source of light, illuminating the proud ironworker, his wife and children in a tableau that dignifies manual labor and the new power of iron. The forge stands as a small temple of industry, where raw material is transformed by fire and human skill into the stuff of a modernizing nation. It captures the moment when Britain's mastery of iron was beginning to remake the world. Just as Wright bathed the ironworker and his forge in the light of the glowing metal that promised national prosperity, the fight to keep Scunthorpe's fires burning treats the ability to make iron and steel as a source of sovereign power too precious to surrender.",
        "excerpt": "Wright lets a single bar of white-hot iron on the anvil light the whole scene, casting its glow across the ironworker and his gathered family. The forge becomes a quiet shrine to human skill and the new power of metal, half domestic hearth and half engine of a changing world. In that incandescent light, the making of iron is shown as something close to sacred.",
        "source": "Joseph Wright of Derby, An Iron Forge, 1772, Tate, London; via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_-_An_Iron_Forge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/jingye-british-steel-compensation-claim--a5.png",
          "alt": "Painting of a family around a glowing iron bar at a forge",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772), Tate, public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "china-chongqing-landslide-rescue",
    "headline": "A landslide in southwestern China kills at least 8 and leaves 34 missing as more rain looms",
    "overview": "Rescuers in southwestern China searched through rubble for survivors after a landslide killed at least eight people and left 34 missing, state media reported. Authorities warned that southern China, including the Chongqing region, faces more heavy rain that could trigger further slides. The disaster is among the deadliest in a punishing season of floods and mountainside collapses.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQRmZoWnNuc19oY2JQX3FqRjc3bkZvS2E4dWU2VlBmdGxlNEQ0a3ZXUXZBVXpUekxhdUhuWVVvendLekM4Z3p3QTNQaktlMExiN0ZKQWJuNzhMdVZDZ01tUUNIY2F6WlZYdkoyaUpNTXJzc3JJdDZfRGNiZVNBS2NrUTFSc0h1bUFtSnJBVlUtRjhvdXF3MHBr?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxONmNaUEtsR0M3eFNjX2N2M0RfQ3NEMXlGYklTZFFhdTNPcW9CZkNQRFlySlpHbmJKN3QzNlNYOGJNejhCWk9jNm41Y1Q3Q2t5cEFwYnp2Zy1XLWtQbEY3TXAzT3JaLU1kQzhodzVKU05hQ2daNkdDcWZUczZjSlg3QUs5NEdLTUlkZkVMQmt3aHRwSUlYajl2NW1ZY1htUGE2Q3lDRGNlQXVCVm1fTHZIOWxza08wYWI4Q2h6ZkppZXNudG8?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/china-chongqing-landslide-rescue.png",
      "alt": "Rock and earth debris from a landslide covering a road",
      "credit": "CaseGrillot, CC0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 24 August AD 79, Mount Vesuvius erupted above the Bay of Naples and buried the Roman towns of Pompeii and Herculaneum under metres of ash, pumice and pyroclastic surge in the course of a single day. Thousands died where they stood or huddled, and centuries later excavators found the hollows left by their decayed bodies and filled them with plaster to recover their final postures. The Roman historian Cassius Dio recorded that the eruption \"buried two entire cities,\" while the young Pliny watched a black cloud roll over the coast. Whole communities simply vanished beneath the debris shed by the mountain, the living entombed by falling earth. Just as Vesuvius smothered Pompeii and Herculaneum under a suffocating blanket of volcanic earth, the Chongqing hillside collapsed onto the homes below, burying residents in mud and rock and leaving rescuers to dig for the missing.",
        "excerpt": "While this was going on, an inconceivable quantity of ashes was blown out, which covered both sea and land and filled all the air. It wrought much injury of various kinds, as chance befell, to men and farms and cattle, and in particular it destroyed all fish and birds. Furthermore, it buried two entire cities, Herculaneum and Pompeii, the latter place while its populace was seated in the theatre.",
        "source": "Cassius Dio, Roman History, Book LXVI (Epitome), trans. Earnest Cary, Loeb Classical Library (1925); digitized at LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Cassius_Dio/66*.html",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a0.png",
          "alt": "Plaster cast of a victim of the AD 79 eruption in the Garden of the Fugitives, Pompeii",
          "credit": "Photograph via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On the morning of 21 October 1966, after days of heavy rain, a vast colliery spoil tip perched above the Welsh mining village of Aberfan gave way and slid down the mountainside as a black slurry of saturated coal waste. The avalanche engulfed Pantglas Junior School and a row of houses, killing 144 people, 116 of them children who had just returned to their classrooms. Miners and rescuers dug frantically through the sodden debris by hand, but almost no one was pulled out alive after the first hour. An official tribunal later blamed the National Coal Board for tipping waste on top of mountain springs, so that the rain turned the heap into a moving mass. Just as the rain-soaked tip buried Aberfan's children and left a village clawing through the muck for survivors, the Chongqing landslide swallowed homes after relentless rain and sent rescuers to search the rubble for the missing.",
        "excerpt": "After days of downpour the mountain of coal waste turned to a black river and poured down onto the school in minutes, silencing a whole generation of a village's children. Fathers came running from the pit to dig into the slurry with their bare hands, listening for any sound beneath the mud. For hours the crowd worked and prayed, but the tip had given up almost no one alive.",
        "source": "People's Collection Wales, \"Aberfan Disaster\" archive; and Report of the Tribunal appointed to inquire into the Disaster at Aberfan on 21st October 1966 (HMSO, 1967).",
        "href": "https://www.peoplescollection.wales/collections/1791831",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a1.png",
          "alt": "Rescuers searching through the demolished Pantglas school after the Aberfan disaster, 1966",
          "credit": "Via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Flood narrative in the Book of Genesis (chapters 6 to 9), preserved here in the King James Version of 1611, tells how God, grieved by human wickedness, sent forty days and nights of rain until the waters prevailed exceedingly and covered even the highest mountains. Every living thing outside Noah's ark perished, drowned and blotted out from the face of the ground. It is the archetypal deluge story of Western literature, an image of the whole world dissolved and of humanity engulfed by rising water. The tale has shaped how cultures narrate catastrophic floods for millennia. Just as Genesis imagines whole populations swept away and buried beneath the waters, the rain-triggered landslide in Chongqing engulfed homes and people, earth and water together closing over the living.",
        "excerpt": "And all flesh died that moved upon the earth, both of fowl, and of cattle, and of beast, and of every creeping thing that creepeth upon the earth, and every man: All in whose nostrils was the breath of life, of all that was in the dry land, died.",
        "source": "The Holy Bible, King James Version, Book of Genesis 7:21-22; Project Gutenberg eBook #10.",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a2.png",
          "alt": "'The Deluge', engraving by Gustave Dore for The Holy Bible, showing figures clinging to a rock above the flood",
          "credit": "Gustave Dore, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In two celebrated letters to the historian Tacitus, written around AD 106, Pliny the Younger described the eruption of Vesuvius that he had witnessed as a young man at Misenum, across the bay, in AD 79. In the second letter he recounts the fall of ash, a darkness like that of a sealed and lightless room, and the panic of crowds groping and fleeing in the dark. His account is the earliest detailed eyewitness description of a volcanic catastrophe and a masterpiece of Latin epistolary prose. He captured both the terror of burial beneath falling debris and the desperate search of families for one another by the sound of their voices. Just as Pliny recorded people crying out for their children and parents amid the choking ash, families in Chongqing waited as rescuers combed the mud for loved ones lost when the slope came down.",
        "excerpt": "You might hear the shrieks of women, the screams of children, and the shouts of men; some calling for their children, others for their parents, others for their husbands, and seeking to recognise each other by the voices that replied; one lamenting his own fate, another that of his family; some wishing to die, from the very fear of dying; some lifting their hands to the gods; but the greater part convinced that there were now no gods at all, and that the final endless night of which we have heard had come upon the world.",
        "source": "Pliny the Younger, Letters, Book VI, Letter 20 (to Tacitus), trans. William Melmoth, rev. F. C. T. Bosanquet; Letters of Pliny, Project Gutenberg eBook #2811.",
        "href": "https://www.gutenberg.org/files/2811/2811-h/2811-h.htm",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a3.png",
          "alt": "'Pliny the Younger and his Mother at Misenum, 79 A.D.', painted by Angelica Kauffmann, 1785",
          "credit": "Angelica Kauffmann; Princeton University Art Museum, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Karl Bryullov painted \"The Last Day of Pompeii\" between 1830 and 1833, a vast Romantic canvas now held in the State Russian Museum in St Petersburg. It depicts the AD 79 eruption of Vesuvius as a moment of sublime terror: columns and statues topple, the sky burns red and black, and figures shield their children and the fallen as ash and stone rain down. Bryullov had walked the excavated ruins and modelled several poses on the plaster casts of the dead. The painting became a European sensation and an enduring emblem of a civilization overwhelmed by nature. Just as Bryullov froze the instant a city was crushed and its people buried beneath a collapsing, fiery sky, the Chongqing landslide struck without warning, burying homes and lives under earth loosened by days of rain.",
        "excerpt": "Bryullov's enormous canvas holds the eye on a single unbearable instant: the ground heaves, monuments crack and fall, and the crowd scatters beneath a sky choked with black smoke and red fire. Mothers curl over their children, a son carries his aged father, and the newly dead lie among the fleeing, all lit by lightning and the glow of the erupting mountain. It is the image of an entire community caught in the act of being swallowed.",
        "source": "Karl Bryullov, \"The Last Day of Pompeii\" (1830-1833), oil on canvas, State Russian Museum, St Petersburg; image via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a4.png",
          "alt": "'The Last Day of Pompeii' by Karl Bryullov, 1830-1833",
          "credit": "Karl Bryullov; State Russian Museum, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "The English Romantic painter John Martin produced several apocalyptic versions of \"The Deluge\" in the 1820s and 1830s, including a celebrated 1834 oil now in the Yale Center for British Art. Martin renders Noah's flood as a cosmic cataclysm: tiny human figures cling to a last black crag while towering walls of water rise beneath a storm-riven sky and a blood-coloured moon. His grand, terrifying visions of the earth engulfed made him one of the most popular artists of his age. The scene distils the horror of a world drowned and of humanity swept helplessly away. Just as Martin's canvas shows helpless figures overwhelmed by an unstoppable surge of water and earth, the deluge of rain in Chongqing loosened the hillside and swept homes and people into the rubble below.",
        "excerpt": "In Martin's vision the last survivors are reduced to specks, clinging to a jagged spur of rock as the sea climbs to drown the mountains. Above them the heavens split with lightning and a lurid moon, and the water advances as an immense, indifferent wall. Nothing human can stand against it; the whole world is going under at once.",
        "source": "John Martin, \"The Deluge\" (1834), oil on canvas, Yale Center for British Art; image via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:John_Martin_-_The_Deluge_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/china-chongqing-landslide-rescue--a5.png",
          "alt": "'The Deluge' by John Martin, 1834",
          "credit": "John Martin; Yale Center for British Art, via Wikimedia Commons (Google Art Project)"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "boeing-farnborough-air-force-one-2028",
    "headline": "Boeing says it is on track to deliver Air Force One in 2028 as costs rise, focusing on production at the Farnborough Airshow",
    "overview": "Boeing told the Farnborough International Airshow it is concentrating on stabilizing aircraft production rather than chasing new orders, and said it remains on track to deliver the delayed new Air Force One presidential jets in 2028 even as costs on the program keep rising. The manufacturer has spent years working to recover from production and safety setbacks. Executives framed the airshow as a moment to prove Boeing's factories are running steadily again.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxNYVQtT1FGajJ6R2NhQ2FoRmZVWlNUMVpCa3NFbkZNSkFhWTd5MXVOWGpqUkpFektxWkg2dEIyQzB5N3l0RUFzVXdsR29mME9HR3I0WVlKMkZDR25BM2V0VEZkVDJxX0x0RzhiTXJrdVktYUZIMVBnWWh1Y0pKMmd4NXU1U2RldWpSZ3hWUTRLaw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOOFN4blNJcmlZR1hNMV9xZ1BkUF9uMjY1TE53bjBxX1B6TmFBRzg3NE1CR0tNME94elA0cEpXRC1FMEttb21zdnR2TTUwOWs1ZS1POEpnZFpRa01udnhhT0VfV2RuT25DRWFiTkU2bGI1NFl3b2lHbVpvdDlRdnpRWnoydXBtX0RFZTZmUjNBTU9BWG44SkdyNnJ2dFhoRDRKNVVnUnEyaVBFSFE3c3J3aEFaRUhBU0Z6?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/boeing-farnborough-air-force-one-2028.png",
      "alt": "A Boeing VC-25, the aircraft that serves as Air Force One",
      "credit": "Oren Rozen, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Swedish warship Vasa was the proudest project of King Gustavus Adolphus, a floating palace bristling with gilded sculpture and two full gun decks, built at Stockholm between 1626 and 1628 under royal pressure to be grander and more heavily armed than any ship afloat. On 10 August 1628, before a celebrating crowd, she set out on her maiden voyage, sailed barely 1,300 metres into Stockholm harbour, heeled over in a gust of wind, took water through her open gun ports and sank, killing about thirty people. Rushed design changes and a top-heavy hull, never properly tested, doomed a vessel meant to advertise the crown's power and craftsmanship. The wreck was raised almost intact in 1961 and is now the centrepiece of Stockholm's Vasa Museum. Just as the Vasa was a ruler's showcase ship pushed toward completion despite unproven engineering, Boeing's presidential jets are a state vessel whose ambitions have collided with the hard limits of getting the manufacturing right.",
        "excerpt": "The Vasa was a ceremonial and military symbol of a rising empire, its hull crowded with hundreds of painted and gilded carvings glorifying the Swedish crown. Ordered in haste and altered during construction to carry ever heavier armament, it capsized within minutes of leaving the quay, a monument to ambition outrunning sound engineering. The disaster showed how a project meant to project power could instead expose the fragility beneath its splendour.",
        "source": "\"Vasa (ship),\" Wikipedia, The Free Encyclopedia (accessed 2026); see also the Vasa Museum, Stockholm.",
        "href": "https://en.wikipedia.org/wiki/Vasa_(ship)",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a0.png",
          "alt": "The ornately carved and gilded stern of the warship Vasa, preserved in the Vasa Museum",
          "credit": "Stern of the Vasa, Vasa Museum, Stockholm; photograph via Wikimedia Commons (CC BY-SA)"
        }
      },
      {
        "category": "historical",
        "title": "The British airship R101 was one of the grandest flying machines ever attempted, a state-backed giant more than 220 metres long built at Cardington to carry passengers across the Empire as part of the government's Imperial Airship Scheme. Beset by delays, ballooning costs, and pressure to prove itself, the R101 was hurried into service before its problems with weight and lift were resolved. On 5 October 1930, on its maiden overseas flight to India, it crashed into a hillside near Beauvais, France, and burst into flames, killing 48 of the 54 people aboard, including the Air Minister Lord Thomson. The catastrophe effectively ended Britain's rigid-airship programme overnight. Just as the R101 was a prestige aircraft rushed aloft before the engineering was truly ready, Boeing's decision at Farnborough to slow down and stabilise production reads as the hard-won lesson that a flagship flying machine cannot be forced to fly on a schedule.",
        "excerpt": "The R101 embodied a nation's dream of mastering the air, a colossal silver hull financed by the state and freighted with imperial expectation. Chronically overweight and behind schedule, it was pushed into a showcase voyage before its designers had solved the problems that dogged it, and it fell in flames on a French hillside. Its wreck became a warning that grand engineering, hurried toward a deadline, can end not in triumph but in disaster.",
        "source": "\"R101,\" Wikipedia, The Free Encyclopedia (accessed 2026).",
        "href": "https://en.wikipedia.org/wiki/R101",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a1.png",
          "alt": "The British rigid airship R101 in flight",
          "credit": "The airship R101 in flight, c. 1929–1930; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Book VIII of Ovid's Metamorphoses, written around 8 AD, the master craftsman Daedalus, imprisoned in Crete with his son Icarus, builds wings of feathers and wax so that the pair may escape by flight, warning the boy to keep a middle course between sea and sun. Exhilarated by the new machine, Icarus climbs too high; the sun melts the wax, his wings fall apart, and he plunges into the sea that would bear his name. Daedalus, the great inventor, is left cursing his own artistry as he buries his son. The tale has stood for two millennia as the archetype of human ingenuity, ambition, and the dream of flight ending in ruin. Just as Daedalus's brilliant contraption is undone by overreach and the limits of its materials, Boeing's presidential jets show how even the most advanced engineering can falter when ambition runs ahead of what can be safely built.",
        "excerpt": "The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
        "source": "Ovid, The Metamorphoses of Ovid, Book VIII, trans. Henry T. Riley (London, 1893); Project Gutenberg eBook #26073.",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a2.png",
          "alt": "Painting of Daedalus fitting winged Icarus with feathered wings",
          "credit": "Anthony van Dyck, Daedalus and Icarus, c. 1620; Art Gallery of Ontario, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The story of the Tower of Babel, told in Genesis 11 of the Hebrew Bible, describes how the descendants of Noah, speaking a single language, resolve to build a city and a tower \"whose top may reach unto heaven\" to make a name for themselves. Their grand construction is a monument to collective ambition, but the project is never finished: God confounds their language so they can no longer understand one another, and the builders are scattered across the earth, leaving the tower unbuilt. The name Babel, glossed as \"confusion,\" became the enduring emblem of an ambitious mega-project undone by human pride and by the practical impossibility of holding it together. For centuries artists and writers have returned to it as the image of overreaching engineering. Just as Babel's builders reached for the heavens only to see their work stall and fragment, Boeing's long-delayed presidential jets illustrate how a soaring project can bog down when ambition outpaces the ability to complete it.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "Genesis 11:4, The Holy Bible, King James Version (1611); Project Gutenberg eBook #10.",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a3.png",
          "alt": "Pieter Bruegel the Elder's painting of the unfinished Tower of Babel",
          "credit": "Pieter Bruegel the Elder, The Tower of Babel, 1563; Kunsthistorisches Museum, Vienna, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "artistic",
        "title": "\"Landscape with the Fall of Icarus,\" a painting associated with Pieter Bruegel the Elder and dating to around the 1560s (the surviving version hangs in the Royal Museums of Fine Arts of Belgium in Brussels), turns the myth of failed flight into a quiet, unsettling landscape. A ploughman, a shepherd, and a fisherman go about their work while, almost unnoticed in a corner of the sea, a pair of pale legs disappears beneath the water: all that remains of Icarus after his plunge. The grand catastrophe of the ambitious flying machine is reduced to a small splash the world barely registers. The painting has become the most famous meditation on the gap between soaring aspiration and its indifferent, humbling end. Just as Bruegel frames the fall of the would-be aviator as the costly footnote to human overreach, the saga of Boeing's presidential jets is a reminder that a flagship dream of flight can quietly founder amid rising costs while ordinary work carries on around it.",
        "excerpt": "In Bruegel's tranquil harbour the eye searches for the hero and finds only two flailing legs vanishing into the green water, easy to miss beside the plodding ploughman and the grazing sheep. The painter renders the collapse of the great flying venture as a small disturbance in the corner of the world, unremarked and almost private. It is a portrait of ambition's downfall dressed as an ordinary afternoon.",
        "source": "Pieter Bruegel the Elder (attrib.), Landscape with the Fall of Icarus, c. 1560s; Royal Museums of Fine Arts of Belgium, Brussels. Image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_de_Oude_-_De_val_van_Icarus.jpg",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a4.png",
          "alt": "Bruegel's painting of a coastal landscape with a ploughman, ships, and the legs of Icarus disappearing into the sea",
          "credit": "After Pieter Bruegel the Elder, Landscape with the Fall of Icarus, c. 1560s; Royal Museums of Fine Arts of Belgium, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Canaletto's \"Return of the Bucintoro on Ascension Day,\" painted around 1732, depicts Venice's most magnificent ceremonial vessel, the Bucintoro, a gilded state galley used by the Doge for the annual \"Marriage of the Sea\" ritual. In the painting the immense, richly ornamented barge, glittering with gold carving and rowed in stately procession before the Doge's Palace, is the ultimate symbol of a ruler's power made visible through lavish craftsmanship. The Bucintoro existed purely to carry the head of state in splendour, a floating throne whose grandeur announced the prestige of the Republic. It stands in the tradition of the ceremonial vessels and state carriages that sovereigns have always commissioned to project majesty. Just as the Bucintoro was a magnificent ship built to bear the ruler in ceremony, Boeing's new Air Force One is the modern presidential vessel, a flying symbol of state whose costly, painstaking construction reflects how much prestige is invested in the craft that carries a leader.",
        "excerpt": "Canaletto sets the Doge's golden barge against the shimmering water before the Piazzetta, every carved figure and gilded flourish catching the Venetian light. The great ceremonial ship dominates a stage crowded with gondolas and onlookers, a spectacle engineered to make the ruler's authority visible on the water. It is the state vessel as pure pageantry, magnificence built to carry power.",
        "source": "Canaletto (Giovanni Antonio Canal), Return of the Bucintoro on Ascension Day, c. 1732. Image via Wikimedia Commons (Google Art Project).",
        "href": "https://commons.wikimedia.org/wiki/File:Canaletto_-_Return_of_%27Il_Bucintoro%27_on_Ascension_Day_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/boeing-farnborough-air-force-one-2028--a5.png",
          "alt": "Canaletto's painting of the gilded Venetian state galley Bucintoro before the Doge's Palace",
          "credit": "Canaletto, Return of the Bucintoro on Ascension Day, c. 1732; via Wikimedia Commons (Google Art Project)"
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "gulf-oil-exports-markets-iran-war",
    "headline": "Gulf oil exports slow and Gulf stock markets fall as the U.S.-Iran war intensifies",
    "overview": "Crude exports from the Gulf jumped in July but tanker shipments have begun slowing as renewed U.S.-Iran hostilities disrupt regional shipping, ship-tracking data showed. Gulf stock markets fell as the fighting intensified, with bourses across the region retreating on fears the war could choke off energy flows through the Strait of Hormuz. The twin pressures underscored how quickly conflict can ripple into the world's oil trade.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiyAFBVV95cUxON0s2bmk4NkZfVGZ5R2tpZzEwYXo4Ymhxb0lyYUlNQlR4X29mekhzS0RGUndSMllMbnpZTGdRYlRZV3NmT0dBNGFyOTkxSFNTZEJTcE05cWtoNzREYU16TW5IUGJ4Zm9qa0lkbUI5Rmg1X1dldEI4MnZJdjNLcTBjTlkyMnRPSzRaUGdtNG9hWFRkaExsV3B4S3ZTb3ptaGlmM2w1ZWcteU5Jc1RTSGFRVjJncHZZLXoxUFliWTFWdGhHWnlkSkRudQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxQTzIxWFlrMnEyMFZoNHBRTjFybFYyNWtmNktvMlRFaGM0X2RBeWNzZzhycWxlVl9rSTlpdnBGVzY2dlZzWkFGUThqbkZPQUREak85NUREUjFkalExaHBJSk53aEFScDA0dFY2b1NwMlNiRVNkWndZanEzM05HVF9NNktScnUyNDdESkY5VlBTZDNsU3c0ZVY4aG1aaWZlZi1iQ3J2Y1Rn?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/gulf-oil-exports-markets-iran-war.png",
      "alt": "An oil tanker under naval escort in the Persian Gulf",
      "credit": "U.S. Navy (PH2 Elliot). Public domain, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the spring of 1452 the Ottoman sultan Mehmed II raised the great fortress of Rumeli Hisari on the European bank of the Bosphorus, the narrow strait guarding Constantinople, and armed it with cannon to command the waterway. He posted an aga and four hundred Janissaries to levy a toll on every passing ship, and when a Venetian vessel refused to submit it was sunk with a single shot, its crew dragged in chains to the Porte. The blockade choked the grain and Black Sea trade that fed the city and helped seal its fall on 29 May 1453, an event that later spurred Europe to seek new sea routes to the spices of the East. A single garrison on a slender channel could throttle the commerce of an empire. Just as one fortress on the Bosphorus once strangled the shipping of a whole capital, so today the fear that war could seal the Strait of Hormuz sends Gulf tankers and stock markets reeling.",
        "excerpt": "he stationed a vigilant Aga and four hundred Janizaries, to levy a tribute on the ships of every nation that should pass within the reach of their cannon. A Venetian vessel, refusing obedience to the new lords of the Bosphorus, was sunk with a single bullet.",
        "source": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire, Chapter LXVIII. Project Gutenberg (public domain).",
        "href": "https://www.gutenberg.org/cache/epub/25717/pg25717.txt",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a0.png",
          "alt": "Sultan Mehmed II and his army entering conquered Constantinople in 1453",
          "credit": "Fausto Zonaro, 'Mehmed II Entering Constantinople' (1903). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "During the October 1973 Arab-Israeli War, the Arab members of OPEC, led by Saudi Arabia, declared an embargo on oil shipments to the United States and other nations that had supported Israel, and cut production besides. The price of crude roughly quadrupled, from about three to twelve dollars a barrel, triggering fuel rationing, shuttered filling stations and the long lines that became the enduring image of the crisis; U.S. and European stock markets slid into a punishing bear market. It took months of shuttle diplomacy before the embargo was lifted in March 1974, but it had exposed how a distant political conflict could seize up the engine of the world economy. Energy had become a weapon, and every importing nation felt its edge. Just as the 1973 embargo showed how quickly war in the Middle East could spike prices and shake markets far away, so the renewed U.S.-Iran fighting now slows Gulf exports and drives regional bourses lower.",
        "excerpt": "During the 1973 Arab-Israeli War, Arab members of the Organization of Petroleum Exporting Countries (OPEC) imposed an embargo against the United States in retaliation for the U.S. decision to re-supply the Israeli military and to gain leverage in the post-war peace negotiations.",
        "source": "U.S. Department of State, Office of the Historian, 'Oil Embargo, 1973-1974' (U.S. government, public domain).",
        "href": "https://history.state.gov/milestones/1969-1976/oil-embargo",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a1.png",
          "alt": "A downtown Portland gas station displays a 'Sold Out' sign during the 1974 fuel shortage",
          "credit": "David Falconer, U.S. National Archives (DOCUMERICA), May 1974. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the opening scene of Shakespeare's The Merchant of Venice (c. 1596-98), the merchant Antonio's friends tease that his melancholy must spring from worry over his fortunes, all of which are ventured at sea. Salarino pictures Antonio's 'argosies with portly sail' riding the ocean like great lords, dwarfing the smaller 'traffickers' that bob past them, and imagines the dreadful moment a wrecking wind might scatter that wealth across the waters. The whole plot turns on this exposure: Antonio's ships are rumored lost, his bond to Shylock falls due, and a man's life hangs on cargoes still at the mercy of wind and rock. Fortune built on distant shipping can capsize in an instant. Just as Antonio's fortunes rise and fall with vessels he cannot see, so Gulf traders and investors watch anxiously as war threatens the tankers carrying their prosperity.",
        "excerpt": "Your mind is tossing on the ocean,\nThere where your argosies, with portly sail\nLike signiors and rich burghers on the flood,\nOr as it were the pageants of the sea,\nDo overpeer the petty traffickers\nThat curtsy to them, do them reverence,\nAs they fly by them with their woven wings.",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene 1. Project Gutenberg (public domain).",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a2.png",
          "alt": "Shylock and his daughter Jessica, a scene from The Merchant of Venice",
          "credit": "Maurycy Gottlieb, 'Shylock and Jessica' (1876). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the frame of the Thousand and One Nights, Sindbad the Sailor recounts to a poor porter how he squandered his inheritance, then sold his goods and staked everything on seaborne trade. In the First Voyage he sails from Basra down through the Persian Gulf with a company of merchants, only to be shipwrecked when the 'island' they land on proves to be a vast whale that dives beneath them. Across seven voyages he is repeatedly enriched and ruined by the sea, his fortune forever hostage to storm, monster and chance in the same Gulf waters that carry today's oil. The tales, translated into English by the eighteenth century, made the merchant-adventurer of the Indian Ocean and the Gulf a byword for wealth wrung from perilous voyages. Just as Sindbad's riches ride the uncertain currents of the Persian Gulf, so the Gulf's modern export trade now trembles as war unsettles the very same passage.",
        "excerpt": "I sold all my household goods by public auction, and joined a company of merchants who traded by sea, embarking with them at Balsora in a ship which we had fitted out between us. We set sail and took our course towards the East Indies by the Persian Gulf, having the coast of Persia upon our left hand and upon our right the shores of Arabia Felix.",
        "source": "'The Seven Voyages of Sindbad the Sailor,' in The Arabian Nights Entertainments (Andrew Lang, ed.). Project Gutenberg (public domain).",
        "href": "https://www.gutenberg.org/files/128/128-h/128-h.htm",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a3.png",
          "alt": "Sindbad the Sailor amid the perils of one of his sea voyages",
          "credit": "Illustration to 'The Fifth Voyage of Sindbad the Sailor.' Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Claude Lorrain painted 'Seaport with the Embarkation of the Queen of Sheba' in 1648, now in the National Gallery, London. It shows a grand Mediterranean harbour at dawn, the low sun laying a golden path across the water while merchant ships ride at anchor and figures load boats along a marble quay lined with palaces. Though its subject is biblical, the picture is really a hymn to seaborne commerce at its serene, prosperous height, the very ideal of trade flowing freely and safely from a great port. That calm is precisely what war removes. Just as Claude's harbour glows with the untroubled abundance of open sea trade, so its opposite haunts the Gulf today, where the threat of a blockaded strait replaces such tranquil commerce with fear and falling markets.",
        "excerpt": "In Claude Lorrain's canvas the harbour lies bathed in a tranquil golden light, its ships mirrored in still water as merchants and porters go calmly about the business of loading and departure. Every mast and colonnade speaks of trade flowing without hindrance, of wealth carried safely across an open and untroubled sea. It is the serene abundance that war and blockade extinguish.",
        "source": "Claude Lorrain, 'Seaport with the Embarkation of the Queen of Sheba' (1648), The National Gallery, London. Via Wikimedia Commons (public domain).",
        "href": "https://commons.wikimedia.org/wiki/File:Claude_Lorrain_-_Seaport_with_the_Embarkation_of_the_Queen_of_Sheba_-_WGA05002.jpg",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a4.png",
          "alt": "A luminous Mediterranean harbour at sunrise crowded with merchant ships and figures on the quay",
          "credit": "Claude Lorrain, 'Seaport with the Embarkation of the Queen of Sheba' (1648), The National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Nikolai Rimsky-Korsakov composed his symphonic suite 'Scheherazade,' Op. 35, in 1888, drawing on the Thousand and One Nights. Its very first movement, 'The Sea and Sinbad's Ship,' rolls out a broad, surging theme that evokes swelling waves and a merchant vessel setting forth across the deep, while a solo violin, the storyteller Scheherazade, weaves the frame that binds the tales. The music captures both the romance and the danger of ocean voyaging: the sea gives fortune and just as readily swallows it. A former naval officer, Rimsky-Korsakov knew the moods of the water at first hand. Just as his surging seascape carries Sinbad's trading ship over waves that may enrich or drown it, so the Gulf's oil-laden vessels now sail waters whose calm has been broken by war.",
        "excerpt": "Rimsky-Korsakov's suite opens with a broad, rocking theme that seems to lift and drop like a ship on an open swell, carrying Sinbad's vessel out toward the horizon. The solo violin returns again and again as the storyteller, spinning fortune and peril from the same restless sea. It is music in which trade, adventure and danger ride the very same waves.",
        "source": "Nikolai Rimsky-Korsakov, 'Scheherazade,' Op. 35 (1888), I. 'The Sea and Sinbad's Ship.' Score via IMSLP (public domain).",
        "href": "https://imslp.org/wiki/Scheherazade,_Op.35_(Rimsky-Korsakov,_Nikolay)",
        "image": {
          "src": "/covers/gulf-oil-exports-markets-iran-war--a5.png",
          "alt": "Portrait of the Russian composer Nikolai Rimsky-Korsakov",
          "credit": "Valentin Serov, 'Portrait of the Composer Nikolai Rimsky-Korsakov' (1898). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "hungary-magyar-nominates-polgar-president",
    "headline": "Hungary's PM Peter Magyar says he will nominate chess champion Judit Polgar as president",
    "overview": "Hungary's prime minister, Peter Magyar, said he will nominate the chess grandmaster Judit Polgar, widely regarded as the strongest female player in the game's history, to become the country's next president. The move follows President Tamas Sulyok's agreement to step down after parliament backed a constitutional change forcing his removal. Polgar would bring an unusually apolitical, internationally admired profile to the largely ceremonial post.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPUWxOZ3R4MG94U0tvZGVmdV9qcS1iMkN3dldKV3o0a1M0VTNlTllWV2JEWlMtTU93eHhZdU1QV0VGMWh6R2ZFcVBZdVE3MGVrSC1ybHUyTUlBbWJTQV9MZGd5M3RfclN2a3Q5STVxWXFoMURUdF95cEw0Y3FSc2tub0ZSaHFpSTBVSjg1RFdjdEstWU5SaDdrN2Vuak1iQnpaa0FhNWFDNVNEUDRDNkE?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/hungary-magyar-nominates-polgar-president.png",
      "alt": "Chess grandmaster Judit Polgar",
      "credit": "Przemyslaw Jahr, CC BY-SA 3.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 458 BC, with a Roman army trapped by the Aequi at Mount Algidus, the Senate turned to Lucius Quinctius Cincinnatus, a former consul who had retired to farm a small plot across the Tiber. The deputation found him at his plough; he laid down his tools, assumed the office of dictator, raised a levy, and crushed the enemy within days. Then, having held absolute power for barely two weeks, he resigned the dictatorship and returned to his fields, becoming Rome's enduring emblem of the reluctant leader who serves and steps aside. Livy preserved the story as a rebuke to those who measure human worth by wealth alone. Just as Rome summoned an unassuming man of proven virtue from private life to hold its highest office and stand above faction, Hungary's leaders would call Judit Polgar from the world of chess into the ceremonial presidency, a figure deliberately placed above the political fray.",
        "excerpt": "The one hope of Rome, L. Quinctius, used to cultivate a four-acre field on the other side of the Tiber, just opposite the place where the dockyard and arsenal are now situated; it bears the name of the ‘Quinctian Meadows.’ There he was found by the deputation from the senate either digging out a ditch or ploughing, at all events, as is generally agreed, intent on his husbandry.",
        "source": "Livy, History of Rome, Book 3, ch. 26 (trans. Rev. Canon Roberts). Perseus Digital Library, Tufts University.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0026%3Abook%3D3%3Achapter%3D26",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a0.png",
          "alt": "Painting of Cincinnatus receiving the Roman senate's deputation at his farm",
          "credit": "Giovanni Francesco Romanelli, Cincinnatus, Musée du Louvre, Paris. Via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Ignacy Jan Paderewski (1860–1941) was the most celebrated pianist of his age, a Polish virtuoso whose recitals in Vienna, Paris, London and America provoked near-hysterical adulation. When Poland regained its independence after the First World War, this artist with no political career was thrust into statecraft: in January 1919 he became Prime Minister and Foreign Minister of the new republic, and he signed the Treaty of Versailles on Poland's behalf. It was his worldwide fame and moral authority, not partisan maneuvering, that made him a unifying national figure. His elevation showed how a country can reach past its politicians to a universally admired talent as a symbol of the nation. Just as Poland turned to a globally renowned musician to embody its young republic, Hungary would raise its most acclaimed chess grandmaster to the presidency as an apolitical figure standing above party.",
        "excerpt": "He made his first public appearance in Vienna in 1887, in Paris in 1889, and in London in 1890, his brilliant playing created a furore which went to almost extravagant lengths of admiration; and his triumphs were repeated in America in 1891. His name at once became synonymous with the highest pitch of pianoforte playing, and society was at his feet.",
        "source": "“Paderewski, Ignace Jan,” Encyclopædia Britannica (11th ed., 1911), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Paderewski,_Ignace_Jan",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a1.png",
          "alt": "Painted portrait of pianist and statesman Ignacy Jan Paderewski",
          "credit": "Lawrence Alma-Tadema, Portrait of Ignacy Jan Paderewski (1891), National Museum in Warsaw. Via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Lewis Carroll's Through the Looking-Glass, and What Alice Found There (1871), young Alice steps into a mirror-world laid out as a giant chessboard, its landscape divided into squares and its inhabitants moving as the pieces. Entering as a mere pawn — the White Queen's Pawn — she is told that if she can reach the eighth rank she will herself become a Queen, and the whole plot follows that promotion across the board. Carroll even prefaced the book with a chess diagram charting Alice's moves to her coronation. The story turns the game into a metaphor for ambition, rules, and the unlikely rise of the smallest player to the highest rank. Just as Carroll's pawn crosses the board to be crowned Queen, a chess prodigy who mastered the sixty-four squares would be raised, in Hungary, to the nation's crowning ceremonial office.",
        "excerpt": "It's a great huge game of chess that's being played—all over the world—if this is the world at all, you know. Oh, what fun it is! How I wish I was one of them! I wouldn't mind being a Pawn, if only I might join—though of course I should like to be a Queen, best.",
        "source": "Lewis Carroll, Through the Looking-Glass, and What Alice Found There (1871), ch. 2. Project Gutenberg eBook #12.",
        "href": "https://www.gutenberg.org/files/12/12-0.txt",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a2.png",
          "alt": "John Tenniel illustration of Alice with the Red Queen on the chessboard landscape",
          "credit": "John Tenniel, illustration for Through the Looking-Glass (1871). Via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Plato's Republic (c. 375 BC), Socrates argues that a just city is impossible until wisdom and power are united in the same hands — the famous doctrine of the philosopher-king. Rulers, he insists, should be those trained in truth rather than those hungry for office, and only when the wise are compelled to govern will the state find rest from its evils. The idea founded a long Western tradition of the scholar-ruler: the master of a demanding discipline summoned, almost against inclination, to lead. It frames high leadership as the duty of the gifted rather than the prize of the ambitious. Just as Plato imagined the state healed by placing a master of rigorous thought at its head, Hungary's plan would set an internationally admired champion — schooled in the most cerebral of games — into its highest office.",
        "excerpt": "Until philosophers are kings, or the kings and princes of this world have the spirit and power of philosophy, and political greatness and wisdom meet in one, and those commoner natures who pursue either to the exclusion of the other are compelled to stand aside, cities will never have rest from their evils,—nor the human race, as I believe,—and then only will this our State have a possibility of life and behold the light of day.",
        "source": "Plato, The Republic, Book V (trans. Benjamin Jowett). Project Gutenberg eBook #1497.",
        "href": "https://www.gutenberg.org/cache/epub/1497/pg1497.txt",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a3.png",
          "alt": "Marble portrait bust of the philosopher Plato",
          "credit": "Roman copy after Silanion, portrait of Plato, Musei Capitolini, Rome. Photo Marie-Lan Nguyen, CC BY 2.5, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Eakins painted The Chess Players in 1876, a small, meticulously observed oil showing two older men bent over a game in the study of the artist's father, who looks on from behind. The scene treats chess as an image of concentration, intellect, and quiet mastery, the players wholly absorbed in a contest of pure mind. Eakins presented the picture to the Metropolitan Museum of Art in 1881, where it remains a touchstone of American realism. The painting elevates the board into a stage for thought and dignity rather than mere pastime. Just as Eakins framed the chessboard as an arena of disciplined intelligence worthy of reverence, Hungary would honor a supreme practitioner of that same intelligence by inviting her into the presidency.",
        "excerpt": "Under a warm lamp the players lean into the board, the room hushed to the geometry of the game. Every carved piece and furrowed brow insists that this is serious work — the labor of the mind made visible. Chess here is no idle diversion but a portrait of intellect at its most composed.",
        "source": "Thomas Eakins, The Chess Players (1876), oil on wood. The Metropolitan Museum of Art, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Chess_Players_MET_DT1506.jpg",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a4.png",
          "alt": "Thomas Eakins painting of two men playing chess as an older man watches",
          "credit": "Thomas Eakins, The Chess Players (1876), The Metropolitan Museum of Art (CC0). Via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Sofonisba Anguissola, one of the first women to win international renown as a painter, completed The Chess Game in 1555, depicting three of her sisters and a servant gathered around a chessboard out of doors. The eldest sister, Lucia, has just won and turns with a knowing smile as the others react — a strikingly intimate scene that presents young women as intellectual equals in a game long coded as male and martial. Anguissola herself broke into a domain closed to women, both as a professional artist and by portraying female mastery of chess. The work now hangs in the National Museum in Poznań. Just as Anguissola pictured a young woman triumphant at the board — a prodigy claiming a space reserved for men — Judit Polgar rose to become the strongest female player in history and now stands to be crowned Hungary's president.",
        "excerpt": "Three sisters gather at the board in the cool of a garden, and the eldest lifts her hand in the small, sure gesture of victory. The painter grants these young women the gravity of strategists, their glances alive with intelligence and delight. In an age that reserved the game for men, the canvas quietly insists that mastery has no sex.",
        "source": "Sofonisba Anguissola, The Chess Game (1555), oil on canvas. National Museum, Poznań, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Chess_Game_(Sofonisba_Anguissola)_1555_(4096x3236px).jpg",
        "image": {
          "src": "/covers/hungary-magyar-nominates-polgar-president--a5.png",
          "alt": "Renaissance painting of three young women playing chess in a garden",
          "credit": "Sofonisba Anguissola, The Chess Game (1555), National Museum in Poznań. Via Wikimedia Commons."
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "taiwan-president-china-taiwan-warning",
    "headline": "Taiwan's president warns the island must not become 'China's Taiwan'",
    "overview": "Taiwan's president said the island's democracy must not be allowed to become 'China's Taiwan,' rejecting Beijing's claim of sovereignty and vowing to defend the self-governed island's freedoms. The remarks came amid sustained military drills and political pressure from China. Beijing regards Taiwan as its territory and has not ruled out taking it by force.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPNmMyZ1pTd2EyNnlYUW5BYnpZOXJXb1BkOGxER3c0SXpjajlNRzlzXzl6cU9qOUhBNmY4VFlOdlFHT0NFcWxMdTNLQkxndmY0ajk5SnBvLVItSWxkQ0lDNGxzZnNfU0ZBUFRhUnZPZHJHZUR4ZGxHdW9NTm41Y0dVSGxDRXdtU2ZHNGYwZzVaS3lMOEhZbWJSUkxyXzRkeE9aSG9rcElHNHpQRmd1X1RJ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/taiwan-president-china-taiwan-warning.png",
      "alt": "The Taipei skyline, with the Taipei 101 tower",
      "credit": "Sinchen.Lin, CC BY 2.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 30 November 1939 the Soviet Union, having demanded territory and military bases that Finland refused to cede, invaded its small northern neighbour with overwhelming force, expecting a swift conquest. Instead, Finnish troops on skis, clad in white and led by Marshal Carl Gustaf Emil Mannerheim, held the frozen Karelian Isthmus through the winter and shattered whole Soviet divisions at battles such as Suomussalmi. Though Finland was finally forced to cede territory in the Moscow Peace Treaty of March 1940, it preserved its independence and its democracy, and the 'spirit of the Winter War' became a lasting emblem of a tiny free nation defying a superpower. A country of under four million had refused to be swallowed by a neighbour of nearly two hundred million. Just as Finland refused Moscow's ultimatum and fought to keep its self-rule, Taiwan's president insists the island's democracy must not be absorbed into 'China's Taiwan.'",
        "excerpt": "The Winter War (1939-1940) began when the Soviet Union, after Finland rejected its territorial demands, launched a massive invasion expecting a quick victory. Finnish forces, vastly outnumbered, held out for more than three months in brutal cold, and though Finland ceded land in the March 1940 peace, it kept its sovereignty and democratic government. The war became an enduring symbol of a small free people refusing to be conquered by a mighty neighbour.",
        "source": "The Winter War (Finland vs. the Soviet Union, 1939-1940); Moscow Peace Treaty, March 1940. Photograph via Imperial War Museums (HU 55566), Wikimedia Commons; historical overview via Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Winter_War",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a0.png",
          "alt": "Finnish troops in white winter gear during the Winter War, 1940",
          "credit": "Finnish troops during the Winter War, 1940. Imperial War Museums (HU 55566), public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 26 July 1581 the representatives of the Low Countries, meeting at The Hague, adopted the Plakkaat van Verlatinghe, the Act of Abjuration, formally renouncing their allegiance to King Philip II of Spain, then the mightiest empire of the age. Reasoning that a ruler who oppresses his subjects and treats them as slaves forfeits his right to rule, the provinces declared themselves free and set in motion the birth of the Dutch Republic. The decision launched decades of war against Habsburg Spain, but the northern provinces ultimately secured their sovereignty and became a beacon of self-government and commerce. It stands as one of history's boldest assertions that a people, not a distant sovereign, hold the right to determine how they are governed. Just as the Dutch provinces rejected a great power's claim to rule them from afar, Taiwan's president rejects Beijing's claim of sovereignty over the island's democratic self-rule.",
        "excerpt": "With the Act of Abjuration of 1581, the provinces of the Low Countries declared that King Philip II of Spain had forfeited his sovereignty by oppressing the people he was meant to protect, and they renounced their allegiance to him. The declaration launched the independent Dutch Republic and decades of war against the Spanish crown. It became a landmark statement that legitimate authority rests on the consent of the governed, not on the claim of a distant power.",
        "source": "Act of Abjuration (Plakkaat van Verlatinghe), 26 July 1581. Image of the original 1581 printing via Wikimedia Commons; historical overview via Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Act_of_Abjuration",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a1.png",
          "alt": "Title page of the 1581 Act of Abjuration (Plakkaat van Verlatinghe)",
          "credit": "Plakkaat van Verlatinghe (Act of Abjuration), 1581. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book 5 of his History of the Peloponnesian War, the Athenian historian Thucydides recounts the confrontation in 416 BC between the imperial city of Athens and the small island of Melos, whose people wished only to remain neutral and free. The Athenian envoys, dispensing with appeals to justice, told the Melians bluntly that in the affairs of men the powerful take what they can and the weak concede what they must. The Melians, refusing to surrender the freedom of a city inhabited for seven hundred years, put their trust in the gods and in hope; Athens then besieged the island, killed its men, and enslaved its women and children. For two and a half millennia the Melian Dialogue has stood as the starkest statement of how empires justify domination, and of a small people's refusal to accept it. Just as the Melians rejected Athens' logic that the strong simply do as they will, Taiwan's president rejects Beijing's assertion that its power alone should settle the island's fate.",
        "excerpt": "since you know as well as we do that right, as the world goes, is only in question between equals in power, while the strong do what they can and the weak suffer what they must.",
        "source": "Thucydides, History of the Peloponnesian War, Book 5.89 (the Melian Dialogue), trans. Richard Crawley. London: J. M. Dent; New York: E. P. Dutton, 1910. Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=5:chapter=89",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a2.png",
          "alt": "Roman marble bust of the historian Thucydides",
          "credit": "Roman bust of Thucydides, Royal Ontario Museum. Photo via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Friedrich Schiller's verse drama Wilhelm Tell (1804) dramatizes the legendary rebellion of the Swiss forest cantons against the tyranny of their Habsburg overlords in the early fourteenth century. In its central scene, the men of Uri, Schwyz, and Unterwalden gather by night on the meadow of the Ruetli above Lake Lucerne and swear a solemn oath to stand together as one people and defend their ancient liberties. Their vow, to be a band of brothers, to be free as their fathers were, and to trust in God rather than quail before the might of man, became a founding myth of Swiss independence and a rallying cry for national freedom across Europe. Schiller turned a small mountain people's defiance of an empire into one of the most enduring dramas of liberty ever written. Just as the Ruetli confederates swore to remain free rather than submit to a foreign power, Taiwan's president vows to defend the island's self-government against absorption.",
        "excerpt": "A band of brothers true we swear to be, / Never to part in danger or in death! ... We swear we will be free as were our sires, / And sooner die than live in slavery! ... We swear, to put our trust in God Most High, / And not to quail before the might of man!",
        "source": "Friedrich Schiller, Wilhelm Tell (1804), Act II, Scene 2 (the Ruetli oath), trans. Theodore Martin. Project Gutenberg eBook #2782.",
        "href": "https://www.gutenberg.org/cache/epub/2782/pg2782.txt",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a3.png",
          "alt": "Painting of the three Swiss confederates swearing the oath on the Ruetli",
          "credit": "Henry Fuseli (Johann Heinrich Fuessli), The Oath on the Ruetli, c. 1780, Kunsthaus Zuerich. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Eugene Delacroix painted La Liberte guidant le peuple (Liberty Leading the People) in 1830 to commemorate the July Revolution that toppled the Bourbon king Charles X in Paris. At its centre a bare-breasted allegory of Liberty, the tricolour flag in one hand and a musket in the other, strides over the barricades and the fallen, leading a mixed crowd of workers, students, and bourgeois toward freedom. Now hanging in the Louvre, the canvas became the definitive image of a people rising to claim its own government against an oppressive power, and an emblem of liberty far beyond France. Its charged fusion of the ideal and the real has made it one of the most recognizable political paintings in the world. Just as Delacroix's Liberty rallies a people to seize its freedom, Taiwan's president summons the island to defend its hard-won democracy against a mightier claimant.",
        "excerpt": "Painted in 1830, Delacroix's Liberty Leading the People shows an armed, flag-bearing figure of Liberty striding over the barricades of revolutionary Paris, leading citizens of every class forward. It transforms a specific uprising into a timeless image of a people asserting its right to self-government against tyranny. Bold, turbulent, and defiant, the canvas has become one of the world's enduring symbols of the struggle for freedom.",
        "source": "Eugene Delacroix, La Liberte guidant le peuple (Liberty Leading the People), 1830, oil on canvas, Musee du Louvre, Paris. Image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a4.png",
          "alt": "Delacroix's painting Liberty Leading the People, with Liberty raising the tricolour over the barricades",
          "credit": "Eugene Delacroix, Liberty Leading the People (1830), Musee du Louvre. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean Sibelius composed Finlandia in 1899, revising it in 1900, at the height of Russian efforts to suppress Finnish autonomy and impose press censorship under the tsar. Written for a patriotic pageant, the tone poem opens with dark, brooding brass evoking oppression before rising to a serene, hymn-like melody that swells into a triumphant affirmation of the national spirit. So charged was its effect that it had to be performed under disguised titles to evade Russian censors, and it became an unofficial anthem of Finnish resistance and eventual independence. Today the 'Finlandia Hymn' remains one of the world's best-loved musical symbols of a small nation's yearning to be free. Just as Sibelius's music gave voice to a people determined not to be silenced by an empire, Taiwan's president gives voice to an island determined to keep its own democratic identity.",
        "excerpt": "Finlandia, composed by Jean Sibelius in 1899 and revised in 1900, begins in dark, oppressive tones before breaking into a soaring hymn of hope and defiance. Written while Russia was tightening its grip on Finland, the work had to be disguised under other names to slip past the censors. It became a musical emblem of a small people's resistance and its longing for independence.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1899, rev. 1900). Score at the Petrucci Music Library (IMSLP); composer portrait (1913) via Wikimedia Commons.",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)",
        "image": {
          "src": "/covers/taiwan-president-china-taiwan-warning--a5.png",
          "alt": "Portrait photograph of the composer Jean Sibelius, 1913",
          "credit": "Jean Sibelius, 1913. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "meta-facebook-instagram-outage",
    "headline": "Meta's Facebook and Instagram are hit by outages affecting users worldwide",
    "overview": "Users of Facebook and Instagram reported outages on Sunday, unable to load feeds or refresh posts across parts of the world, according to Reuters. Meta, which operates both platforms, did not immediately detail a cause as monitoring sites logged a spike in complaints. The disruption briefly cut off billions of people from two of the world's most used social networks.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPZjZCUU55QWV3ZE5DeFpBalhfaVNTR1pMNTFKaFpFNzRYR2o4QWJGZmZoWUJ0c204TXZhNzRjUFZyRXZrdXVpcEtVZThMV0dnUEdjTlgybDdfVHRmSDZVZEtnUWFHaTBUb21CSFhiaUhKbXBnR0FLcDRieVBsVWFCTi1kVUlJam41STByRDlWcjJxYUdaQmIwdTlmdDVyMDg0YjVRWk5JMzRwRDBUbWx3d1ZZcXhvdw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/meta-facebook-instagram-outage.png",
      "alt": "A hand holding a smartphone with a blank screen",
      "credit": "Santeri Viinamaki, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In August 1858 the first transatlantic telegraph cable, laid between Valentia in Ireland and Trinity Bay in Newfoundland, briefly seemed to annihilate the ocean, carrying Queen Victoria's congratulations to President James Buchanan and igniting bonfires and processions in cities on both sides of the Atlantic. Yet the marvel was fleeting: the last coherent message crossed on 1 September 1858, one day short of four weeks, after which its signals dwindled to a few faint whispers and then to nothing. Overworked electricians had driven the delicate line with too high a voltage, and the cable simply died in its ocean grave, plunging the two continents back into weeks of postal silence. The sudden collapse turned public euphoria into profound discouragement, a reminder of how thin the newly woven thread between peoples really was. Just as that celebrated link fell abruptly silent and cut the continents off from one another, Meta's outage severed a global network in an instant, leaving billions unable to reach the people on the other side.",
        "excerpt": "When at last the friends of the Atlantic Telegraph were obliged to confess that the cable had ceased to work; when all the efforts of the electricians failed to draw more than a few faint whispers, a dying gasp, from the depths of the sea, there ensued in the public mind a feeling of profound discouragement.",
        "source": "Henry M. Field, The Story of the Atlantic Telegraph (New York: Charles Scribner's Sons, 1892), ch. XIII. Project Gutenberg eBook #34765.",
        "href": "https://www.gutenberg.org/cache/epub/34765/pg34765.txt",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a0.png",
          "alt": "Painting of HMS Agamemnon paying out the Atlantic telegraph cable at sea in 1858",
          "credit": "Robert Charles Dudley, 'H.M.S. Agamemnon Laying the Atlantic Telegraph Cable in 1858' (The Metropolitan Museum of Art, public domain), via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "For centuries the Roman cursus publicus, the imperial relay of couriers, horses and staging posts, was the nervous system of the state, carrying tax convoys, official dispatches and urgent word of invasion swiftly across provinces from Constantinople to Egypt. Writing in the sixth century, the historian Procopius charged the emperor Justinian with wrecking this network: he suppressed whole stretches of the post, forced couriers onto dangerous small boats, and replaced strings of fast horses with a handful of asses. As a result, news that once crossed a ten-day distance in a single day now arrived too late to be of any use, long after the events it described. The empire's shared channels of information went effectively dark, and provinces that had felt bound to the center found themselves isolated and blind. Just as the deliberate crippling of Rome's message relay left distant communities cut off and uninformed, Meta's silence stranded a connected world that had come to rely on instant word from everywhere at once.",
        "excerpt": "In the case of the road to Persia, he permitted the former system to remain; but everywhere else in the East, as far as Egypt, he reduced the number of stages making a day's journey to one, and provided, instead of horses, a few asses. Consequently news of what happened in each province was brought with great difficulty, too late to be of any use and long after the event, and the farm owners got no benefit of their crops which either rotted or lay idle.",
        "source": "Procopius, The Secret History (Anecdota), ch. 30, trans. Richard Atwater (1927). Internet Medieval Sourcebook, Fordham University.",
        "href": "https://sourcebooks.fordham.edu/basis/procop-anec.asp",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a1.png",
          "alt": "The Tabula Peutingeriana, a long medieval copy of a Roman road-network map",
          "credit": "Tabula Peutingeriana (medieval copy of a Roman itinerary map), Osterreichische Nationalbibliothek, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "In the eleventh chapter of Genesis, the whole earth is said to share a single language and a single speech, and its people gather on a plain in the land of Shinar to build a city and a tower whose top would reach to heaven. Displeased by their unified ambition, the Lord confounds their common tongue so that they can no longer understand one another, and scatters them across the face of the earth, leaving the great work abandoned. The place is named Babel, a byword ever after for the sudden breakdown of shared understanding and the fragmentation of a once-connected humanity. The story turns on a single terrifying idea: that the bond holding a civilization together is language itself, and that when the signal fails, the crowd disperses into mutual incomprehension. Just as one confounded tongue turned a united multitude into scattered strangers, Meta's outage briefly broke the shared channels through which billions speak, refresh and understand one another.",
        "excerpt": "Go to, let us go down, and there confound their language, that they may not understand one another’s speech. So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city. Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth: and from thence did the LORD scatter them abroad upon the face of all the earth.",
        "source": "The Holy Bible, King James Version, Genesis 11:7-9. Project Gutenberg eBook #10.",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a2.png",
          "alt": "Gustave Dore engraving of an angel above the Tower of Babel as the peoples scatter",
          "credit": "Gustave Dore, 'The Confusion of Tongues' (1865), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "E. M. Forster's 1909 story 'The Machine Stops' imagines a future in which humanity lives underground in isolated cells, never meeting face to face, communicating entirely through a vast global apparatus of buttons, screens and speaking-tubes that answers every desire. The heroine Vashti conducts her whole social and intellectual life through this instant network, dismissing her son Kuno's warning that 'the Machine stops' as a piece of venomous nonsense. Then, without the slightest warning, the entire communication-system breaks down all over the world, and the applause, the voices and the summoned friends fall into an unbroken silence. For people who had forgotten how to live outside the network, the failure is not an inconvenience but the end of the world as they understood it. Just as Forster's global communication-system collapses without warning and leaves its dependents suddenly mute and alone, Meta's outage exposed how completely modern life leans on tools that can go dark in a heartbeat.",
        "excerpt": "But there came a day when, without the slightest warning, without any previous hint of feebleness, the entire communication-system broke down, all over the world, and the world, as they understood it, ended.",
        "source": "E. M. Forster, 'The Machine Stops' (1909), in The Eternal Moment and Other Stories. Project Gutenberg eBook #72890.",
        "href": "https://www.gutenberg.org/cache/epub/72890/pg72890.txt",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a3.png",
          "alt": "Painted portrait of the author E. M. Forster by Dora Carrington",
          "credit": "Dora Carrington, portrait of E. M. Forster (1924-25), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'The Tower of Babel', painted in 1563 and now in the Kunsthistorisches Museum in Vienna, depicts a colossal spiralling tower rising into the clouds above a bustling Flemish port, its ramps and arches modeled on the Roman Colosseum. Thousands of tiny laborers, cranes and workshops swarm across its tiers, yet the structure already tilts and cracks, its upper stories unfinished and doomed. Bruegel renders the biblical parable as a monument to overreaching human ambition and to the confusion that will scatter the workers when their common language fails. The painting freezes the moment before a vast collective project, bound together by shared communication, dissolves into disorder. Just as Bruegel's teeming tower stands on the brink of the silence and scattering to come, Meta's global platforms, humming with billions of voices, revealed how quickly a shared structure can falter when its connective language breaks down.",
        "excerpt": "Bruegel populates his tower with a thousand small dramas: masons hauling stone, ships unloading at the quay, a king inspecting the works. The eye climbs the doomed spiral and senses the coming hush, when the shared word that binds all these hands together will suddenly mean nothing. It is a portrait of connection at the very instant before it fails.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (1563), oil on panel, Kunsthistorisches Museum, Vienna. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a4.png",
          "alt": "Bruegel's painting of the vast spiralling Tower of Babel under a cloudy sky",
          "credit": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), Kunsthistorisches Museum, Vienna (Google Art Project), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Cole's 'Desolation', the fifth and final canvas of his 1836 series 'The Course of Empire', shows the same imagined bay he had earlier filled with a thriving metropolis, now returned to silence at dusk. Broken columns and a single ruined arch rise above still water; a solitary heron nests on a toppled pillar where crowds once thronged the forum, and no human figure remains. Cole meant the cycle as a warning that even the mightiest civilizations, with their marketplaces, temples and networks of exchange, inevitably fall quiet and empty. The painting is the visual echo of a great public square from which every voice has vanished. Just as Cole's deserted forum stands eerily mute where a whole society once gathered and spoke, Meta's outage briefly emptied the digital squares where billions meet, leaving the world's common gathering places suddenly still.",
        "excerpt": "Cole paints the aftermath of connection: a ruined arch, a lone bird on a fallen column, a marketplace drained of every voice. Where crowds once traded news across a crowded forum, only water and silence remain. It is the hush that falls when a shared public space goes dark.",
        "source": "Thomas Cole, The Course of Empire: Desolation (1836), oil on canvas, New-York Historical Society. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_The_Course_of_Empire_Desolation_1836.jpg",
        "image": {
          "src": "/covers/meta-facebook-instagram-outage--a5.png",
          "alt": "Thomas Cole painting of ruined classical columns and a lone bird over a silent bay at dusk",
          "credit": "Thomas Cole, 'The Course of Empire: Desolation' (1836), New-York Historical Society, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "canada-bars-congo-travelers-outbreak",
    "headline": "Canada will temporarily bar entry to travelers who have recently been in Congo, against UN advice",
    "overview": "Canada said it will temporarily bar entry to foreign nationals who have recently been in Congo, a precaution the government linked to a disease outbreak there. The measure runs counter to United Nations guidance, which generally opposes blanket travel bans as ineffective and stigmatizing. Public-health experts have long debated whether closing borders slows an epidemic or merely drives it underground.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxQb1BHOFZRUDNmWEJPRW4tNnRsRlhvZ2xWRTlsN2RZRmgyNmhYUkF6SFdBdkplMnZhTHYzTzUtWGxJZjlKNHM4UmNXMmRWZEs5V21taFE1cEtHdWtpUFFTVVFSRkNvQWJla1owRldCMnF3dlNrVGZSYWtiLUxvUUt1N1N6dzlNaEo2ZmY2NldGSndGbHpaOUZyaHVyb3J5QWRwT3Bjb3JOOEFZRnJ6bWdUMGs1M3lSX24yYVFxd3Joa1U4bDFRWkJod0pR?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/canada-bars-congo-travelers-outbreak.png",
      "alt": "Travelers moving through an airport arrivals hall",
      "credit": "Wpcpey, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the summer of 430 BC, in the second year of the Peloponnesian War, a devastating plague swept through Athens, whose walls were crowded with refugees who had fled the Attic countryside ahead of the invading Spartans. The historian Thucydides, who caught the disease and survived, recorded in Book II of his 'History of the Peloponnesian War' how fear itself reshaped human behavior: people were terrified to nurse one another, so that some died in total neglect while those brave enough to tend the sick caught the infection and died too. The Athenians shunned each other, abandoned the customary burial rites, and gave way to lawlessness as social bonds dissolved under the weight of contagion. Thucydides' clinical eye captured the central dilemma of every epidemic, that the instinct to avoid the sick and the duty to care for them pull in opposite directions. Just as Canada now weighs shutting its gates to travelers from Congo, ancient Athens shows how fear of contagion has always driven people to wall themselves off from the afflicted, at a terrible human cost.",
        "excerpt": "On the one hand, if they were afraid to visit each other, they perished from neglect; indeed many houses were emptied of their inmates for want of a nurse: on the other, if they ventured to do so, death was the consequence.",
        "source": "Thucydides, History of the Peloponnesian War, Book II (c. 431-404 BC), Richard Crawley translation, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a0.png",
          "alt": "Baroque painting of a plague-stricken ancient city with the dead and dying strewn among classical ruins",
          "credit": "Michiel Sweerts, 'Plague in an Ancient City' (c. 1652-1654), Los Angeles County Museum of Art, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "During the Great Plague of London in 1665, which killed roughly a fifth of the city's population, authorities enforced a brutal policy of 'shutting up' infected houses, locking the sick together with the healthy behind doors marked with a red cross and the words 'Lord have mercy upon us,' guarded by watchmen. The naval administrator Samuel Pepys recorded the creeping dread in his diary; on 7 June 1665 he saw such marked doors for the first time in Drury Lane and was so unnerved he bought tobacco to chew as a supposed protection. The measure was meant to cordon off contagion by sealing individual households, but it effectively condemned the well along with the ill and bred desperation and evasion. Pepys's entry captures the moment abstract epidemic policy became visible on the streets as a frightening emblem of exclusion. Just as Canada moves to bar entry to those recently in Congo, seventeenth-century London tried to hold back plague by sealing gates and doors against the infected.",
        "excerpt": "This day, much against my will, I did in Drury Lane see two or three houses marked with a red cross upon the doors, and \"Lord have mercy upon us\" writ there; which was a sad sight to me, being the first of the kind that, to my remembrance, I ever saw.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, Volume 35: May/June 1665, entry for 7 June 1665, Project Gutenberg (ebook 4156).",
        "href": "https://www.gutenberg.org/cache/epub/4156/pg4156.txt",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a1.png",
          "alt": "Composite engraving of the Great Plague of London showing death carts, fleeing citizens and shut-up houses",
          "credit": "'Great Plague of London, 1665,' contemporary broadside engraving, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe's 'A Journal of the Plague Year,' published in 1722 but set during London's plague of 1665, is a documentary-style novel narrated by a saddler who stays in the city and observes the epidemic in unflinching detail. A major theme of the book is the official policy of shutting up infected houses, which Defoe's narrator repeatedly condemns as both cruel and useless, arguing that confining the healthy with the sick only spread misery and drove terrified people to break out and flee. Defoe stages the very debate now surrounding travel bans, whether sealing people in (or out) actually stops disease or merely makes them desperate enough to evade control and scatter the contagion further. His narrator concludes bluntly that the practice did not achieve its end. Just as experts warn that Canada's ban on travelers from Congo may drive the outbreak underground rather than contain it, Defoe warned three centuries ago that shutting the gates against plague could not be depended upon.",
        "excerpt": "the shutting up of houses was in no wise to be depended upon. Neither did it answer the end at all, serving more to make the people desperate, and drive them to such extremities as that they would break out at all adventures.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722), Project Gutenberg (ebook 376).",
        "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a2.png",
          "alt": "Portrait of the English writer Daniel Defoe in a periwig",
          "credit": "Portrait of Daniel Defoe, after Sir Godfrey Kneller, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Edgar Allan Poe's 1842 short story 'The Masque of the Red Death' tells of Prince Prospero, who, as a deadly pestilence ravages his country, retreats with a thousand courtiers into a fortified abbey and welds shut its iron gates to keep the plague outside. Behind these sealed walls the prince throws a lavish masked ball, convinced that wealth and isolation can buy immunity, while the poor and the sick are left to die beyond the barrier. The Red Death nonetheless enters, embodied as a masked figure, and destroys them all, exposing the fatal arrogance of believing one can simply lock contagion out. Poe's parable is a meditation on the futility and the moral blindness of exclusion, the fantasy that a border can be sealed tightly enough to hold back a disease. Just as Canada seeks to bar the sick and the exposed at its frontier, Poe's story warns that sealing the gates offers a false and self-deceiving security.",
        "excerpt": "A strong and lofty wall girdled it in. This wall had gates of iron. The courtiers, having entered, brought furnaces and massy hammers and welded the bolts. They resolved to leave means neither of ingress nor egress to the sudden impulses of despair or of frenzy from within.",
        "source": "Edgar Allan Poe, \"The Masque of the Red Death\" (1842), in The Works of Edgar Allan Poe, Project Gutenberg (ebook 1064).",
        "href": "https://www.gutenberg.org/files/1064/1064-h/1064-h.htm",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a3.png",
          "alt": "Photographic portrait of the writer Edgar Allan Poe",
          "credit": "Daguerreotype of Edgar Allan Poe (c. 1849), retouched, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin's oil painting 'Die Pest' (The Plague), completed in 1898 and held at the Kunstmuseum Basel, depicts Death as a winged, scythe-bearing figure riding a monstrous bat-like beast low over the streets of a medieval town, sowing corpses in its wake. The Swiss Symbolist painted it late in his life, after personally losing several children to disease, and the image renders pestilence as an airborne force that no wall or gate could arrest as it swoops down among fleeing, collapsing townspeople. The painting captures the visceral terror of contagion arriving from outside and the helplessness of ordinary people before it. Its very form, a plague that flies over the rooftops, dramatizes how disease slips past every physical barrier meant to hold it back. Just as Canada debates whether closing its borders can stop an outbreak in Congo, Böcklin's vision insists that plague travels on the wind, indifferent to the boundaries humans erect against it.",
        "excerpt": "Böcklin gives contagion a body: a hooded reaper astride a leathery-winged beast, skimming just above the cobblestones of a stricken town. Beneath its shadow figures crumple in doorways and stairwells, too slow to flee the thing that has already flown over the walls. The painting makes visible the oldest fear of every quarantine, that the sickness is already inside the gate.",
        "source": "Arnold Böcklin, 'Die Pest' (The Plague), 1898, tempera on panel, Kunstmuseum Basel; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a4.png",
          "alt": "Symbolist painting of Death as a winged figure with a scythe flying over a medieval town strewn with the dead",
          "credit": "Arnold Böcklin, 'Die Pest' (The Plague), 1898, Kunstmuseum Basel, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Nicolas Poussin's 'The Plague at Ashdod,' painted in 1630-31 and now in the Louvre, depicts the Old Testament episode from the First Book of Samuel in which the Philistine city of Ashdod is struck by plague after they seize the Ark of the Covenant. The French classical master fills the foreground with the dead and dying, including a chilling detail of an infant still trying to nurse at its dead mother's breast, while figures in the middle ground recoil and pinch their noses against the stench and danger of infection. Painted during outbreaks of plague in Italy, the work is a study in the human impulse to flee and turn away from the contagious, isolating the sick with gestures of horror and self-protection. Poussin freezes the exact instant when compassion gives way to the fearful urge to escape. Just as Canada moves to exclude travelers who may carry disease, Poussin's canvas shows the ancient reflex to shrink back and shut out the afflicted in a time of pestilence.",
        "excerpt": "Poussin arranges the catastrophe like a stage: mothers and children lie dead across the paving stones of a sunlit classical city, while the living twist away, one man clamping a cloth to his face against the contagious air. In the shadow of the temple steps, the survivors do not rush to help but pull back, hands raised, bodies half-turned to flee. It is a picture of the moment a community decides to save itself by abandoning the stricken.",
        "source": "Nicolas Poussin, 'The Plague at Ashdod' (La Peste d'Asdod), 1630-1631, oil on canvas, Musée du Louvre, Paris; via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:The_plague_of_ashdod_1630.jpg",
        "image": {
          "src": "/covers/canada-bars-congo-travelers-outbreak--a5.png",
          "alt": "Baroque painting of plague victims in a classical city as onlookers recoil and cover their faces",
          "credit": "Nicolas Poussin, 'The Plague at Ashdod,' 1630-1631, Musée du Louvre, via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "kpf-tp-link-landscape-ribbon-shenzhen",
    "headline": "KPF wraps a Shenzhen tech campus for TP-Link in a one-kilometer 'landscape ribbon'",
    "overview": "The New York firm Kohn Pedersen Fox has completed TP-Link LXD, a technology campus in Shenzhen, China, whose three interconnected towers are wrapped by a one-kilometer-long 'landscape ribbon' of planted terraces and staircases. The 124,600-square-meter complex houses offices, research-and-development space and housing, threading shared greenery up a compact urban site. The design answers a dense brief by turning circulation into a continuous public garden.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/18/tp-link-lxd-tech-campus-kpf-china/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen.png",
      "alt": "The skyline of Shenzhen, China",
      "credit": "Dinkun Chen, CC BY-SA 4.0, via Wikimedia Commons"
    },
    "edition": "Evening Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Hanging Gardens of Babylon were the ancient world's most celebrated marriage of engineering and green fantasy, a terraced park raised on vaulted stone galleries said to have been built by King Nebuchadnezzar II (reigned 605–562 BC) for his Median queen, who missed the wooded hills of her homeland. The Greek historian Diodorus Siculus, writing in the first century BC, described a structure that ascended tier on tier like a theatre, its roofs sealed with reeds, bitumen, baked brick and lead so that deep soil could hold trees on the rooftops, watered by hidden machines that lifted water from the Euphrates. Counted among the Seven Wonders of the World, it fused the idea of a soaring citadel with a planted paradise open to the sky. It made the act of climbing a wall into an ascent through a garden. Just as Babylon lifted a forest onto its ramparts, KPF's TP-Link LXD wraps three Shenzhen towers in a one-kilometre 'landscape ribbon' of planted terraces and stairs, turning the building's circulation into a continuous public garden in the air.",
        "excerpt": "When the ascending terraces had been built, there had been constructed beneath them galleries which carried the entire weight of the planted garden and rose little by little one above the other along the approach; and the uppermost gallery, which was fifty cubits high, bore the highest surface of the park, which was made level with the circuit wall of the battlements of the city.",
        "source": "Diodorus Siculus, Library of History, Book II.10, trans. C. H. Oldfather, Loeb Classical Library (1935); digitized at LacusCurtius, University of Chicago.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diodorus_Siculus/2A*.html",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a0.png",
          "alt": "Ferdinand Knab's 1886 painting imagining the terraced Hanging Gardens of Babylon",
          "credit": "Ferdinand Knab, 'The Hanging Gardens of Babylon' (1886), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Crystal Palace was a colossus of glass and cast iron erected in London's Hyde Park to house the Great Exhibition of 1851, designed by the gardener-turned-engineer Joseph Paxton and built in a matter of months. Some 564 metres long and enclosing 92,000 square metres, its ridge-and-furrow glazing was derived directly from Paxton's greenhouses, and it was raised high enough to shelter Hyde Park's mature elm trees inside the building, so that living nature stood within the industrial cage. Contemporaries hailed it as a vision of a new age in which prefabricated modules could conjure a transparent palace that dissolved the boundary between garden and architecture. It became the emblem of an era's technological ambition and optimism. Just as the Crystal Palace enclosed a park within a feat of modular engineering and made an exhibition hall feel like a conservatory, KPF's TP-Link LXD threads planted terraces through a 124,600-square-metre complex of offices, R&D and housing, dissolving the line between built city and continuous garden.",
        "excerpt": "The Crystal Palace of 1851 was a masterwork of prefabricated glass and iron that grew from Joseph Paxton's greenhouse experiments, its transparent vaults rising over the living elms of Hyde Park. It proved that a building could be at once a machine of modular parts and a garden held up to the light. In its shimmering nave, the age glimpsed a paradise engineered by human hands.",
        "source": "The Great Exhibition of the Works of Industry of All Nations, Hyde Park, London, 1851; contemporary print held via Wikimedia Commons.",
        "href": "https://en.wikisource.org/wiki/Encyclop%C3%A6dia_Britannica,_Ninth_Edition/Exhibition",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a1.png",
          "alt": "Colour print of the Crystal Palace in Hyde Park for the Great Exhibition of 1851",
          "credit": "'The Crystal Palace in Hyde Park for Grand International Exhibition of 1851', via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel is the archetypal story of humanity building skyward, told in the eleventh chapter of the Book of Genesis and fixed in English by the King James Bible of 1611. In the plain of Shinar the whole earth, still of one language, resolves to bake bricks and raise a city with a tower 'whose top may reach unto heaven,' both to make a name for themselves and to keep from being scattered. The Lord comes down, confounds their single tongue into many, and scatters them abroad, leaving the unfinished tower named Babel. It is at once the oldest emblem of collective architectural ambition and a warning about the reach of human hands toward the sky. Just as Babel imagines a single people binding a city and a tower into one soaring gesture, KPF's TP-Link LXD binds three interconnected towers into a single reaching form, though here the skyward ambition is answered by a green ribbon that returns the building to the earth and the public.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "The Holy Bible, King James Version (1611), Genesis 11:4; text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a2.png",
          "alt": "Gustave Doré's engraving 'The Confusion of Tongues' showing the Tower of Babel",
          "credit": "Gustave Doré, 'The Confusion of Tongues' (1865–1868), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Samuel Taylor Coleridge's 'Kubla Khan: or, A Vision in a Dream: A Fragment' was composed in 1797 and published in 1816, reputedly conjured in an opium-tinged reverie after the poet read of Xanadu, the summer capital of the Mongol emperor Kublai Khan. In its opening lines the Khan decrees 'a stately pleasure-dome' where the sacred river Alph runs through caverns to a sunless sea, and 'twice five miles of fertile ground' are girdled with walls and towers, enclosing bright gardens, sinuous rills and incense-bearing trees. The poem became the touchstone image of an earthly paradise raised by human command, a built enclosure in which architecture and cultivated nature are fused into a single visionary decree. It reads circulation, water and greenery as one continuous dream. Just as Kubla Khan decrees a pleasure-dome girdled with gardens and towers, KPF's TP-Link LXD encircles its towers with a kilometre-long ribbon of planted terraces, staircases and greenery, turning a working campus into a garden decreed in the air.",
        "excerpt": "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\nDown to a sunless sea.\nSo twice five miles of fertile ground\nWith walls and towers were girdled round;\nAnd here were gardens bright with sinuous rills\nWhere blossom'd many an incense-bearing tree;",
        "source": "Samuel Taylor Coleridge, 'Kubla Khan', in Christabel; Kubla Khan, a Vision; The Pains of Sleep (London: John Murray, 1816); text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Christabel;_Kubla_Khan;_The_Pains_of_Sleep_(1816)/Kubla_Khan",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a3.png",
          "alt": "Portrait of the poet Samuel Taylor Coleridge",
          "credit": "Portrait of Samuel Taylor Coleridge, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'The Tower of Babel', painted in oil on panel in 1563 and now held in the Kunsthistorisches Museum in Vienna, is the most famous visual image of humanity's tallest ambition. Bruegel sets a vast spiralling ziggurat, modelled in part on the Roman Colosseum, rising into the clouds above a Flemish port city, its ramps and arches swarming with cranes, scaffolds and tiny labourers while King Nimrod inspects the works below. The tower's upper storeys pierce the sky even as its lower courses remain unfinished, capturing both the grandeur and the hubris of building toward heaven. It renders architecture as an entire living world of terraces, tiers and continuous ascent. Just as Bruegel piles arcaded tier upon tier into a single spiralling ascent, KPF's TP-Link LXD winds a one-kilometre landscape ribbon of terraces and staircases around its towers, making the climb through the building a spectacle of layered, inhabited levels.",
        "excerpt": "Bruegel's tower spirals upward in ochre arcades, each terraced storey a small city stacked upon the last, cranes and scaffolds clinging to its flanks. The unfinished summit vanishes into cloud while the base still swarms with labourers, so that ambition and incompletion share the same frame. It is the built dream of reaching heaven, rendered as an endless ascent of tiers.",
        "source": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), oil on panel, Kunsthistorisches Museum, Vienna; image via Wikimedia Commons.",
        "href": "https://en.wikipedia.org/wiki/The_Tower_of_Babel_(Bruegel)",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a4.png",
          "alt": "Pieter Bruegel the Elder's 1563 painting The Tower of Babel, a vast spiralling tower rising into clouds",
          "credit": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), Kunsthistorisches Museum Vienna, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Maarten van Heemskerck's engraving of 'The Hanging Gardens of Babylon' belongs to his celebrated series depicting the Seven Wonders of the Ancient World, designed by the Dutch master and engraved by Philips Galle in Antwerp around 1572. The print imagines the gardens as a monumental colonnaded palace crowned with lush planted terraces and cascading greenery, while gardeners tend the raised beds and figures marvel at the towering walls of Babylon behind. Heemskerck's vision turned a legendary wonder into a concrete image of architecture and cultivated nature fused into a single ornamented mass, a paradise stacked in the air. It gave later Europe its enduring picture of what a building carpeted in gardens might look like. Just as Heemskerck crowns a great structure with terrace upon terrace of hanging greenery, KPF's TP-Link LXD sheathes its Shenzhen towers in a continuous ribbon of planted terraces, realising in steel and soil the paradise-on-earth that the engraving could only imagine.",
        "excerpt": "In Heemskerck's engraving a colonnaded palace rises in receding storeys, each ledge spilling over with trees and trailing vines like a green cascade frozen in stone. Gardeners tend the raised beds while the vast walls of Babylon loom beyond, dwarfing the tiny onlookers. The print makes visible an ancient dream: a building wholly clothed in its own hanging garden.",
        "source": "Maarten van Heemskerck (designer) and Philips Galle (engraver), 'The Hanging Gardens of Babylon', from the series The Eight Wonders of the World, Antwerp, c. 1572; image via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Heemskerck-hanginggardens.jpg",
        "image": {
          "src": "/covers/kpf-tp-link-landscape-ribbon-shenzhen--a5.png",
          "alt": "Maarten van Heemskerck's engraving of the Hanging Gardens of Babylon, a terraced palace covered in greenery",
          "credit": "Maarten van Heemskerck / Philips Galle, 'The Hanging Gardens of Babylon' (c. 1572), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "us-strikes-iran-revolutionary-guard",
    "headline": "The U.S. strikes Iran's Revolutionary Guard after two American troops are killed in Jordan, and Iran hits U.S. bases in Kuwait",
    "overview": "U.S. Central Command said American forces carried out a new round of airstrikes on Saturday night targeting Iran's Revolutionary Guard Corps and its coastal surveillance and air-defense sites, in retaliation for the missile-and-drone attack that killed two U.S. service members in Jordan on Friday, where a third remains missing. Iranian state media said Qeshm Island, near the Strait of Hormuz, was struck, and Iran's army responded with kamikaze-drone attacks on two American bases in Kuwait, Camp Udairi and Ali Al Salem Air Base. The exchange marks a sharp escalation as both sides strike each other's military and critical infrastructure.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQOVVPQXpIUjAzU1c2TG1GcXJUU19aU2FodDRTVWV4RVdVN2stQ1NueUtIRC03M2hXNFZLRkQzUUdqMWNQOVBMbzFmc1NGejY3bXFNSnJYMXNNRTIyMlNMYjFPbXVOcXJCSkFPVHNsMkRvblBzcjc5aXJhbHlndGlrek9RbmVBTlN4SHI3N1VHLUpGVlNmTE4tSlAwSktTd1k?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cgk417jp83po"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/us-strikes-iran-revolutionary-guard.png",
      "alt": "A U.S. military fighter aircraft conducting an airstrike mission at altitude",
      "credit": "Russell Scalf / U.S. Air Force. Public domain, via Wikimedia Commons"
    },
    "lead": true,
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 498 BC, during the Ionian Revolt against Persian rule, an Athenian and Eretrian expeditionary force sailed to Asia Minor, marched inland with the rebel Greeks, and burned Sardis, the seat of the Persian satrap Artaphernes. Herodotus records that when King Darius I learned the Athenians had torched a city of his empire, he shot an arrow toward heaven and swore vengeance, ordering a servant to remind him three times at every dinner, \"Master, remember the Athenians.\" That vow ripened into the punitive expedition crushed at Marathon in 490 BC and then Xerxes' vast invasion of Greece in 480 BC, each campaign answering the last insult. Just as a single strike on one power's forces spiraled into decades of reprisal between Persia and the Greeks, the U.S. blow against Iran's Revolutionary Guard and Iran's answering strike on bases in Kuwait extend an old logic of blow for blow. Like Darius nursing his grudge over every meal, the antagonists here trade escalating punishment that threatens to widen into general war.",
        "excerpt": "he inquired into who the Athenians were; and when he had been informed, he asked for his bow, and having received it and placed an arrow upon the string, he discharged it upwards towards heaven, and as he shot into the air he said: \"Zeus, that it may be granted me to take vengeance upon the Athenians!\" Having so said he charged one of his attendants, that when dinner was set before the king he should say always three times: \"Master, remember the Athenians.\"",
        "source": "Herodotus, The History of Herodotus, Book V.105, translated by G. C. Macaulay (London: Macmillan, 1890), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/2456/2456-h/2456-h.htm",
        "image": {
          "src": "/covers/us-strikes-iran-revolutionary-guard--a0.png",
          "alt": "Ancient marble bust identified as the historian Herodotus",
          "credit": "Bust of Herodotus, Palazzo Massimo alle Terme, Rome. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On January 3, 2020, a U.S. MQ-9 Reaper drone struck a convoy near Baghdad International Airport, killing Major General Qasem Soleimani, commander of the Quds Force of Iran's Islamic Revolutionary Guard Corps, along with Iraqi militia leader Abu Mahdi al-Muhandis. Five days later, on January 8, 2020, Iran launched Operation Martyr Soleimani, firing more than a dozen ballistic missiles at the Al Asad Airbase and another base in Iraq housing U.S. forces, wounding scores of American troops with traumatic brain injuries. It was the first direct, openly acknowledged Iranian missile attack on U.S. positions since the 1988 naval clashes, and for days the world braced for full-scale war before both sides pulled back. Just as the killing of an IRGC commander drew an immediate, calibrated Iranian barrage, this event repeats the same choreography: American forces strike the Revolutionary Guard, and Iran answers by hitting U.S. bases. The precedent shows how quickly a targeted killing and its reprisal can bring two governments to the edge of a war neither claims to want.",
        "excerpt": "In the early hours of January 3, 2020, a U.S. drone strike at Baghdad airport killed Qasem Soleimani, the powerful commander of the IRGC Quds Force, and Iraqi paramilitary chief Abu Mahdi al-Muhandis. On January 8, Iran retaliated under the banner \"Operation Martyr Soleimani,\" launching ballistic missiles at the Al Asad Airbase and a base near Erbil in Iraq, injuring more than one hundred American service members. The exchange marked the most direct U.S.-Iran military confrontation in decades and pushed both nations to the brink of open war.",
        "source": "\"Assassination of Qasem Soleimani,\" Wikipedia (modern factual context; not quoted as public-domain text).",
        "href": "https://en.wikipedia.org/wiki/Assassination_of_Qasem_Soleimani"
      },
      {
        "category": "literary",
        "title": "In Homer's Iliad, the Greek hero Achilles withdraws from the Trojan War in fury until his beloved companion Patroclus, fighting in Achilles' armor, is slain by the Trojan prince Hector. Overwhelmed by grief and rage, Achilles casts aside his quarrel with Agamemnon and vows to kill Hector to avenge his friend, knowing the gods have foretold that his own death will follow soon after. He returns to battle, slaughters Hector, and drags the body around the walls of Troy, a reprisal so total it consumes the avenger himself. Homer even pauses to warn that wrath and revenge are \"sweet to the soul, as honey to the taste,\" yet poison the mind like noxious vapor. Just as Achilles answers the killing of a comrade with an escalating cycle of vengeance, the U.S. strikes on the Revolutionary Guard follow the deaths of two American soldiers, and Iran's counterstrike keeps the deadly exchange turning.",
        "excerpt": "Far lies Patroclus from his native plain!\nHe fell, and falling, wish’d my aid in vain.\nAh then, since from this miserable day\nI cast all hope of my return away;\nSince, unrevenged, a hundred ghosts demand\nThe fate of Hector from Achilles’ hand;\nSince here, for brutal courage far renown’d,\nI live an idle burden to the ground,\n(Others in council famed for nobler skill,\nMore useful to preserve, than I to kill,)\nLet me—But oh! ye gracious powers above!\nWrath and revenge from men and gods remove:\nFar, far too dear to every mortal breast,\nSweet to the soul, as honey to the taste:\nGathering like vapours of a noxious kind\nFrom fiery blood, and darkening all the mind.\nMe Agamemnon urged to deadly hate;\n’Tis past—I quell it; I resign to fate.\nYes—I will meet the murderer of my friend;\nOr (if the gods ordain it) meet my end.",
        "source": "Homer, The Iliad, Book XVIII, translated by Alexander Pope, Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/6130/6130-h/6130-h.htm",
        "image": {
          "src": "/covers/us-strikes-iran-revolutionary-guard--a2.png",
          "alt": "Marble bust of the poet Homer in the British Museum",
          "credit": "Bust of Homer, British Museum. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus' tragedy The Persians, first staged in Athens in 472 BC, is the oldest surviving play in the world and the only Greek tragedy dramatizing contemporary history. Set in the Persian capital of Susa, it shows the royal court and the ghost of King Darius receiving news of Xerxes' catastrophic naval defeat at Salamis in 480 BC, where the invading Persian fleet was shattered by the Greeks. Through a messenger's report and the lamentations of the chorus and Queen Atossa, the play mourns the drowned host, curses the name of Athens, and frames the disaster as the punishment for imperial overreach and the will of the gods. Written by a veteran who had himself fought the Persians, it turns a war of reprisal into a meditation on grief and hubris on both sides. Just as Aeschylus counts the human cost when a great power and Persia trade blows, this cycle of U.S. and Iranian strikes threatens the same harvest of widows and ruined armies.",
        "excerpt": "Messenger\nOut on thee, hateful name of Salamis,\nOut upon Athens, mournful memory!\nChorus\nWoe upon this day's evil fame!\nThou, Athens, art our murderess;\nAlack, full many a Persian dame\nIs left forlorn and husbandless!",
        "source": "Aeschylus, The Persians, translated by E. D. A. Morshead, in Four Plays of Aeschylus (1908), Wikisource.",
        "href": "https://en.wikisource.org/wiki/Four_Plays_of_Aeschylus_(1908)_Morshead/Persians",
        "image": {
          "src": "/covers/us-strikes-iran-revolutionary-guard--a3.png",
          "alt": "Ancient herm portrait bust of the playwright Aeschylus",
          "credit": "Herma of Aeschylus. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "In 1871 the Russian painter Vasily Vereshchagin, who had seen war at first hand in Central Asia, painted The Apotheosis of War: a pyramid of human skulls heaped on a scorched, lifeless plain, ringed by circling crows and the blackened stumps of a dead city. He inscribed the frame with a dedication 'to all great conquerors, past, present and to come,' turning the trophy of victory into an emblem of universal ruin. Rather than glorify a battle, Vereshchagin stripped war down to its only certain yield, a monument of the dead. As the United States and Iran trade strikes and the toll of soldiers mounts, his mountain of skulls is the grim ledger toward which each new cycle of reprisal tends.",
        "excerpt": "Painted in 1871 and now in the Tretyakov Gallery in Moscow, Vereshchagin's canvas shows a pyramid of skulls on a barren plain beneath a pale sky, crows wheeling over the ruins of a burnt town. The artist dedicated it 'to all great conquerors, past, present and to come,' making the heap of the dead the true and only monument that war erects.",
        "source": "Vasily Vereshchagin, The Apotheosis of War (1871), oil on canvas, Tretyakov Gallery, Moscow.",
        "href": "https://commons.wikimedia.org/wiki/File:1871_Vereshchagin_Apotheose_des_Krieges_anagoria.JPG",
        "image": {
          "src": "/covers/us-strikes-iran-revolutionary-guard--a4.png",
          "alt": "A pyramid of human skulls on a barren plain with crows circling under a pale sky.",
          "credit": "Vasily Vereshchagin, The Apotheosis of War, 1871; Tretyakov Gallery, Moscow. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Pyotr Ilyich Tchaikovsky composed his 1812 Overture (Op. 49) in 1880 to commemorate Russia's defense against Napoleon's catastrophic 1812 invasion, which ended with the Grande Armee's ruinous retreat from Moscow. The piece dramatizes the clash of nations in sound, pitting fragments of the French anthem La Marseillaise against Russian hymns and folk tunes, building to a triumphant finale scored with pealing bells and the thunder of live cannon fire. Tchaikovsky musically stages an invasion answered and repelled, the roar of artillery standing in for the reprisals of a great-power war. Written as a public monument to a nation striking back at an aggressor, it renders retaliation as spectacle. Just as the overture's cannon volleys answer one another until the invader is driven out, the U.S. and Iran exchange escalating salvos, each strike demanding a louder reply.",
        "excerpt": "Tchaikovsky's 1812 Overture (Op. 49), completed in 1880, was written to mark Russia's repulse of Napoleon's 1812 invasion. The score famously interweaves La Marseillaise with Russian themes and calls for church bells and cannon fire to depict the battle and the invader's defeat. It has become the most famous musical depiction of a great power striking back against an aggressor, its artillery salvos standing in for the escalating violence of war.",
        "source": "Pyotr Ilyich Tchaikovsky, 1812 Overture (Festival Overture, Op. 49), 1880; public-domain scores at IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/us-strikes-iran-revolutionary-guard--a5.png",
          "alt": "Photographic portrait of the composer Pyotr Ilyich Tchaikovsky",
          "credit": "Portrait of Pyotr Ilyich Tchaikovsky (c. 1870). Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 14
  },
  {
    "slug": "russia-ballistic-missile-attack-kyiv",
    "headline": "Russia launches one of its largest ballistic-missile attacks on Kyiv, killing at least one and wounding more than a dozen",
    "overview": "Russia fired a wave of ballistic missiles and drones at the Ukrainian capital overnight, killing at least one person and wounding more than a dozen, striking both residential and non-residential buildings, officials said. President Volodymyr Zelensky called it 'one of the most massive ballistic attacks on Kyiv' since the start of the full-scale invasion; Ukraine's military said it downed 18 of 41 missiles and intercepted 108 drones. Ukraine pressed its own campaign, with drones striking two oil tankers in the Black Sea and a Russian oil terminal.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxOV3ZwbTkzZS1DdDVUbGlBMG1vZDRUR05ORWFXaFRZWkpaU0M0RjN6Vm1Ib0YyTnpJYWxwemJxZVZkUlgzSmJZNE1YcGFIODdiUDZlMFJiMGhpRTdWUS1tNHNJbGpla2c4eUNJMnVRQUlhREhqZmkzd1pqNDl1QnEwcDVhNmdGNERSUXFCM0htYkVGS1IwRnZ2aWZDVUt1d1MwSlE?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c2el7xpnzrpo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/russia-ballistic-missile-attack-kyiv.png",
      "alt": "Emergency crews at a residential building in Kyiv destroyed by a Russian missile strike",
      "credit": "Pavlo Petrov / State Emergency Service of Ukraine, CC BY 4.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the spring and summer of A.D. 70 the Roman general Titus laid siege to Jerusalem, ringing the city with legions and battering it with torsion catapults and stone-throwing ballistae. The Jewish historian Flavius Josephus, an eyewitness in the Roman camp, recorded that the engines of the Tenth Legion hurled white stones weighing a talent nearly two furlongs, so that watchmen on the towers cried out to warn civilians of each incoming missile. After months of bombardment, famine and street fighting, the Temple was burned and the city destroyed, its population slaughtered or enslaved. The scene of a capital ringed by artillery, its people scanning the sky and shouting warnings of each descending projectile, prefigures Kyiv's residents tracking ballistic missiles and drones overhead and racing for shelter during Russia's overnight barrage.",
        "excerpt": "Now the stones that were cast were of the weight of a talent, and were carried two furlongs and further. The blow they gave was no way to be sustained, not only by those that stood first in the way, but by those that were beyond them for a great space. As for the Jews, they at first watched the coming of the stone, for it was of a white color, and could therefore not only be perceived by the great noise it made, but could be seen also before it came by its brightness; accordingly the watchmen that sat upon the towers gave them notice when the engine was let go, and the stone came from it, and cried out aloud, in their own country language, The Stone Cometh",
        "source": "Flavius Josephus, The Wars of the Jews, Book V, Chapter 6, trans. William Whiston.",
        "href": "https://www.gutenberg.org/cache/epub/2850/pg2850.txt",
        "image": {
          "src": "/covers/russia-ballistic-missile-attack-kyiv--a0.png",
          "alt": "David Roberts, The Siege and Destruction of Jerusalem by the Romans Under the Command of Titus, A.D. 70 (1850), the city burning under Roman assault.",
          "credit": "David Roberts, 1850, oil on canvas. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "From 7 September 1940 to 16 May 1941, Nazi Germany's Luftwaffe subjected Britain to the sustained aerial bombardment known as the Blitz, and London was bombed for 56 of the first 57 consecutive nights. Waves of bombers struck docks, railways and dense residential districts, sending civilians nightly into Underground stations and Anderson shelters as anti-aircraft guns fired back. By the campaign's end roughly 40,000 to 43,000 civilians had been killed across the United Kingdom, nearly half of them in the capital, and some two million homes were damaged or destroyed. Yet Londoners kept working, sheltering and rebuilding, giving rise to the enduring image of a besieged capital's stubborn endurance. Russia's overnight missile-and-drone assault on Kyiv, striking apartment blocks and driving families underground while air defenses engaged overhead, revives that same ordeal of a capital city living and dying under bombs.",
        "excerpt": "The Blitz was a German bombing campaign against the United Kingdom in 1940 and 1941, during the Second World War. Beginning on 7 September 1940, London was systematically bombed by the Luftwaffe for 56 of the following 57 days and nights. Around 40,000 to 43,000 civilians were killed across the United Kingdom, almost half of them in the capital, and roughly two million houses were damaged or destroyed.",
        "source": "\"The Blitz,\" Wikipedia (modern factual context; no copyrighted text quoted).",
        "href": "https://en.wikipedia.org/wiki/The_Blitz"
      },
      {
        "category": "literary",
        "title": "Homer's Iliad, composed in archaic Greece around the eighth century B.C., unfolds entirely in the shadow of a besieged city, as the Greeks encamp before the walls of Troy. In Book XXII the aged King Priam stands on the ramparts and begs his son Hector not to face Achilles, foreseeing in vivid terms the sack that will follow a city's fall: heroes slain, daughters carried off, the town in flames and infants dashed to the ground. Homer makes the terror of the noncombatants, the women and children behind the walls, as central as the duel of champions outside them. That ancient dread of what happens to a captured city and its civilians echoes in Kyiv, where a modern capital endures bombardment and its residents fear for their families huddled in the dark.",
        "excerpt": "My heroes slain, my bridal bed o’erturn’d,\nMy daughters ravish’d, and my city burn’d,\nMy bleeding infants dash’d against the floor;\nThese I have yet to see, perhaps yet more!",
        "source": "Homer, The Iliad, Book XXII, trans. Alexander Pope.",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "literary",
        "title": "The biblical Book of Lamentations, traditionally ascribed to the prophet Jeremiah, mourns the destruction of Jerusalem by the Babylonians in 587 B.C., after a long siege ended in the burning of the city and the Temple. In a series of acrostic dirges it personifies the fallen capital as a widow weeping alone in the night, her streets emptied, her people led into captivity, her gates desolate. The poems fix on the civilian aftermath of war, hunger, grief and exile, rather than on the clash of armies. Read against Russia's bombardment of Kyiv, the opening lament for a great city brought low, its inhabitants killed or scattered while it sits solitary under the weight of war, feels painfully immediate.",
        "excerpt": "1 How doth the city sit solitary, that was full of people! how is she become as a widow! she that was great among the nations, and princess among the provinces, how is she become tributary!\n2 She weepeth sore in the night, and her tears are on her cheeks: among all her lovers she hath none to comfort her: all her friends have dealt treacherously with her, they are become her enemies.\n3 Judah is gone into captivity because of affliction, and because of great servitude: she dwelleth among the heathen, she findeth no rest: all her persecutors overtook her between the straits.\n4 The ways of Zion do mourn, because none come to the solemn feasts: all her gates are desolate: her priests sigh, her virgins are afflicted, and she is in bitterness.",
        "source": "The Holy Bible, King James Version, Lamentations 1:1–4.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Lamentations"
      },
      {
        "category": "artistic",
        "title": "Francisco Goya painted The Third of May 1808 in 1814 to commemorate the civilians of Madrid shot by Napoleon's occupying troops in reprisal for the uprising of the previous day. A faceless firing squad, rendered as an anonymous mechanical line, takes aim at a ragged group of townspeople; at the center a man in a white shirt throws up his arms in a gesture of terror and defiance while the bodies of the already-killed lie bloodied at his feet. Goya refuses any heroic gloss, presenting instead the raw fact of unarmed people slaughtered by military force in their own city. Now in the Museo del Prado, the painting became a founding image of modern war's assault on civilians. Its lantern-lit horror speaks directly to Kyiv, where ordinary residents are killed in their homes by a distant and impersonal military machine.",
        "excerpt": "Painted in 1814 and now in the Museo del Prado, Goya's canvas depicts Spanish civilians being executed by a French firing squad during the Peninsular War. The anonymous soldiers and the terrified white-shirted man with his arms flung wide turn a specific reprisal into a universal image of unarmed people killed by military power in their own city.",
        "source": "Francisco Goya, The Third of May 1808 (1814), oil on canvas, Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:El_tres_de_mayo_de_1808_en_Madrid.jpg",
        "image": {
          "src": "/covers/russia-ballistic-missile-attack-kyiv--a4.png",
          "alt": "Francisco Goya, The Third of May 1808 (1814): a firing squad executes townspeople of Madrid by lantern light, a white-shirted man flinging his arms wide.",
          "credit": "Francisco Goya, 1814, Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens painted The Consequences of War in 1637–1638 for Ferdinando II de' Medici, at the height of the Thirty Years' War that was ravaging central Europe. In a swirling allegory, Mars the god of war strides forward with bloody sword, dragged on by the Fury Alecto and trampling books, a drawing and other emblems of learning and art, while a grieving woman in black, personifying afflicted Europe, throws up her arms beneath a sky torn by discord. Rubens described the scene in a letter as an image of everything that war corrupts and destroys, mother and child among its victims. Housed today in the Palazzo Pitti in Florence, the picture is a Baroque cry against the devastation armies inflict on ordinary life. That lament over a continent trampled by war resonates with Kyiv under Russian missiles, where a city's homes and civilians are crushed beneath the machinery of conflict.",
        "excerpt": "Painted in 1637–1638 and now in the Palazzo Pitti, Florence, Rubens's allegory shows Mars, the god of war, breaking free to trample the arts and learning while a black-clad figure of Europe raises her arms in grief. Composed during the Thirty Years' War, it condemns the ruin that armies bring to civilians and civilization alike.",
        "source": "Peter Paul Rubens, The Consequences of War (1637–1638), oil on canvas, Galleria Palatina, Palazzo Pitti, Florence.",
        "href": "https://en.wikipedia.org/wiki/Consequences_of_War",
        "image": {
          "src": "/covers/russia-ballistic-missile-attack-kyiv--a5.png",
          "alt": "Peter Paul Rubens, The Consequences of War (1637–1638): Mars charges forward trampling the arts while a grieving figure of Europe raises her arms.",
          "credit": "Peter Paul Rubens, 1637–1638, Galleria Palatina, Palazzo Pitti. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "tate-brothers-arrested-miami",
    "headline": "Andrew and Tristan Tate are arrested in the U.S. as new British charges bring their total to 59",
    "overview": "Influencer Andrew Tate and his brother Tristan were arrested in the United States by the U.S. Marshals Service after British prosecutors filed 38 new charges against the pair, the UK Crown Prosecution Service and Bedfordshire police said. Andrew now faces seven further counts of rape along with sex-trafficking and child-image charges, and Tristan faces two rape counts and three trafficking charges, bringing the brothers' total to 59 charges tied to alleged offending between 2010 and 2017. Britain is seeking their extradition; the Tates have denied all wrongdoing.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxQaWVrU0l3eHVCZkRkTjBUdmF1LW5OdTRDTl9wWHZEV1ZGQm9Ha0VsQVVzM2NnY1RZbzh4QUVrT3lVMmlHZjBEWFZYQllmeWVKWm5TVnRJNTVqVDJvOGJRMURxaEVSYzlLMVNTd3FtRDZZSVFUeWFWNFhmV1EyaFRyNWp1RHdXdzNIWWxneTJsZlY3M2oxZWI1MzlVSDhtQlliS1NoeUZZU0p6bWhPNHU4RzBFLUVvZU03ODllRg?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwymly9yd33o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/tate-brothers-arrested-miami.png",
      "alt": "A wooden judge's gavel resting on its sound block in a courtroom",
      "credit": "Joe Gratz, CC0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Alcibiades was the most dazzling and most arrogant man in fifth-century Athens: a ward of Pericles, a pupil of Socrates, a general whose beauty, wealth, and swagger were legendary. In 415 BCE, as he was about to lead the great Sicilian Expedition, the city's sacred Herms were mutilated and Alcibiades was accused of drunkenly profaning the Eleusinian Mysteries. Recalled from the fleet to stand trial, he instead defected to Sparta; at Athens he was condemned to death in his absence, his property seized, and the priests ordered to curse his name. He then spent years as a fugitive bouncing between Sparta, the Persian court, and Athens itself, a man pursued across every jurisdiction of the Greek world. Like the Tate brothers, he was a celebrity of masculine bravado whose charisma could not shield him once the charges, and the summons to answer them across borders, finally caught up.",
        "excerpt": "He was condemned as contumacious upon his not appearing, his property confiscated, and it was decreed that all the priests and priestesses should solemnly curse him.",
        "source": "Plutarch, \"Life of Alcibiades,\" in Plutarch's Lives, translated by John Dryden, revised by Arthur Hugh Clough.",
        "href": "https://en.wikisource.org/wiki/Lives_(Dryden_translation)/Alcibiades"
      },
      {
        "category": "historical",
        "title": "Giacomo Casanova, the Venetian adventurer whose memoirs catalogue hundreds of seductions, was the eighteenth century's most famous self-mythologizing libertine. On the night of 26 July 1755 the State Inquisitors of Venice had him arrested for offenses against religion and public decency, sending the police chief, Messer-Grande, with a band of forty men to seize him and his papers. Without any trial he was locked in the Piombi, the notorious cells under the leads of the Doge's Palace, from which he made a legendary escape in 1756. He then spent decades a fugitive drifting across France, the German states, Russia, and Poland, forever a step ahead of the authorities. His boastful ledger of conquests and his flight across jurisdictions make him an uncanny forerunner of the Tate brothers, self-styled masters of masculine appetite seized by a tribunal and hunted from country to country.",
        "excerpt": "What a strange and unexplained power certain words exercise upon the soul! I, who the evening before so bravely fortified myself with my innocence and courage, by the word tribunal was turned to a stone, with merely the faculty of passive obedience left to me.",
        "source": "Giacomo Casanova, The Memoirs of Jacques Casanova de Seingalt, Vol. 2e: \"Under the Leads,\" Chapter XXVI, translated by Arthur Machen (London edition, 1894).",
        "href": "https://www.gutenberg.org/cache/epub/2960/pg2960.txt",
        "image": {
          "src": "/covers/tate-brothers-arrested-miami--a1.png",
          "alt": "Presumed portrait of Giacomo Casanova, a young man in eighteenth-century dress.",
          "credit": "Portrait of Giacomo Casanova, attributed to Francesco Narici (c. 1760). Via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Molière's Tartuffe, first performed in 1664 and long banned before its 1669 premiere, is the great comedy of the predatory hypocrite unmasked. Tartuffe, a pious fraud, insinuates himself into the household of the gullible Orgon, attempts to seduce Orgon's wife Elmire, and very nearly makes off with the family's property and freedom by means of an incriminating deed. In the play's final scene the sovereign's power intervenes: an Officer of the King arrests not Orgon but Tartuffe himself, revealing him to be a long-hunted criminal already known to justice under other names. The all-seeing Prince, \"not a friend to double dealing,\" pierces the mask that fooled everyone else. Molière's ending, in which state authority reaches out to seize a charismatic manipulator of appearances, prefigures the moment the law closed on the Tate brothers.",
        "excerpt": "Our prince is not a friend to double dealing,\nHis eyes can read men's inmost hearts, and all\nThe art of hypocrites cannot deceive him.\nHis sharp discernment sees things clear and true;\nHis mind cannot too easily be swayed,\nFor reason always holds the balance even.\nHe honours and exalts true piety,\nBut knows the false, and views it with disgust.\nThis fellow was by no means apt to fool him,\nFar subtler snares have failed against his wisdom,\nAnd his quick insight pierced immediately\nThe hidden baseness of this tortuous heart.\nAccusing you, the knave betrayed himself,\nAnd by true recompense of Heaven's justice\nHe stood revealed before our monarch's eyes\nA scoundrel known before by other names,\nWhose horrid crimes, detailed at length, might fill\nA long-drawn history of many volumes.",
        "source": "Molière, Tartuffe; or, The Hypocrite, Act V, Scene VII (the Officer's speech), translated by Curtis Hidden Page.",
        "href": "https://www.gutenberg.org/cache/epub/2027/pg2027.txt"
      },
      {
        "category": "literary",
        "title": "Shakespeare's Measure for Measure, written around 1604, dissects the abuse of power more directly than almost any other play in the canon. Angelo, appointed deputy to govern Vienna in the Duke's absence, presents himself as a paragon of severe virtue, then uses his authority to demand that the novice Isabella surrender her body to him in exchange for sparing her condemned brother's life. The Duke, who has secretly remained to watch, returns to strip away Angelo's mask; confronted with a ruler whose gaze is \"like power divine,\" Angelo can only confess and beg for immediate sentence. Here a powerful man who weaponized his office for sexual coercion is dragged into the light and made to answer. The play's reckoning with predatory authority speaks directly to a case built on charges of rape and trafficking brought against men who traded on their power over others.",
        "excerpt": "O my dread lord,\nI should be guiltier than my guiltiness,\nTo think I can be undiscernible,\nWhen I perceive your Grace, like power divine,\nHath look'd upon my passes. Then, good prince,\nNo longer session hold upon my shame,\nBut let my trial be mine own confession:\nImmediate sentence then, and sequent death,\nIs all the grace I beg.",
        "source": "William Shakespeare, Measure for Measure, Act V, Scene 1 (Angelo's confession).",
        "href": "https://www.gutenberg.org/cache/epub/23045/pg23045.txt"
      },
      {
        "category": "artistic",
        "title": "William Hogarth's A Rake's Progress, a sequence of eight paintings turned into engravings in 1735, is the archetypal visual sermon on the swaggering man of appetite brought low. It follows Tom Rakewell, who inherits a fortune and squanders it on gambling, drink, fashion, and prostitutes, descending stage by stage into ruin. In the fourth plate he is seized by bailiffs in his sedan chair on St. James's Street as he rides to court, arrested for debt; later scenes carry him to a mercenary marriage, the Fleet debtors' prison, and finally madness in Bedlam. Hogarth made the boastful libertine a public spectacle, his vices leading with grim inevitability to arrest and disgrace, a visual precedent for the fall of the Tate brothers from online swagger to a cell.",
        "excerpt": "In the fourth plate of Hogarth's series, Tom Rakewell, midway through squandering his inheritance on gambling, drink, and prostitutes, is seized by bailiffs in his sedan chair on St. James's Street as he rides to court, arrested for debt. The eight scenes trace his fall from spendthrift heir to the debtors' Fleet Prison and, finally, to raving madness in Bedlam. Hogarth's moral sequence turned the boastful man of appetite into a public spectacle of vice ending in ruin.",
        "source": "William Hogarth, A Rake's Progress, Plate 4: \"Arrested for Debt\" (engraving, 1735).",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_A_Rake%27s_Progress_-_Plate_4_-_Arrested_For_Debt.jpg",
        "image": {
          "src": "/covers/tate-brothers-arrested-miami--a4.png",
          "alt": "Hogarth engraving: a young man in a sedan chair on a London street is stopped and arrested by bailiffs.",
          "credit": "William Hogarth, A Rake's Progress, Plate 4, \"Arrested for Debt\" (1735). Via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart and Lorenzo da Ponte's opera Don Giovanni, premiered in Prague in 1787, bears the fuller title Il dissoluto punito, ossia il Don Giovanni, \"The Libertine Punished.\" Its hero is the ultimate boaster of masculine conquest: his servant Leporello unrolls a catalogue aria tallying the master's seductions, ending with \"mille e tre\" in Spain alone. Having murdered the Commendatore, the unrepentant seducer mockingly invites the dead man's stone funeral statue to dinner, and the statue comes, seizing Don Giovanni's hand and commanding him again and again to repent. He refuses to the last and is dragged down into hell as the flames rise. This staged judgment of a swaggering predator who will not repent is the operatic mirror of the Tate brothers hauled before the law across borders. The final damnation was painted by Alexandre-Évariste Fragonard around 1830.",
        "excerpt": "Com.  Pentiti, cangia vita:\n   È l'ultimo momento.\nGio.  No, no, ch'io non mi pento...\n  Vanne lontan da me.\nCom.  Pentiti, scellerato.\nGio.  No, vecchio infatuato.\nCom.  Pentiti.\nGio.  No.\nCom. e Lep.  Sì.\nGio.  No.\nCom.  Ah! tempo più non v'è.",
        "source": "Lorenzo da Ponte (libretto) and Wolfgang Amadeus Mozart (music), Don Giovanni (Il dissoluto punito, ossia il Don Giovanni), K. 527, Act II, final scene (1787).",
        "href": "https://it.wikisource.org/wiki/Don_Giovanni/Atto_secondo",
        "image": {
          "src": "/covers/tate-brothers-arrested-miami--a5.png",
          "alt": "Romantic painting of Don Juan recoiling as the ghostly stone statue of the Commander seizes him.",
          "credit": "Alexandre-Évariste Fragonard (d. 1850), Don Juan and the Statue of the Commander (c. 1830). Via Wikimedia Commons (public domain); source Web Gallery of Art."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "cuban-dissident-otero-exile",
    "headline": "Cuban dissident artist Luis Manuel Otero Alcantara arrives in the U.S. after five years in prison",
    "overview": "Luis Manuel Otero Alcantara, 38, the leader of Cuba's San Isidro Movement of dissident artists and writers, went into exile in the United States after completing a five-year sentence in the maximum-security Guanajay prison, arriving at Miami's airport to supporters singing the national anthem. He had been jailed following the island's largest anti-government protests in decades in 2021, and was released under a U.S. parole arrangement. 'I believe the dictatorship has to end, and the Castro dynasty has to end,' he told reporters.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxPWnl2eDRodnhjYlFNV2xVRU5ONVNhNS1PQURfWEhGcWVkaWZVTlBjUjI1RGNKRzQyVnlLbnFyZS00LV9yb21hXzRaNVFFbzYzTkl4OU0wSmRzZndlSDVLOHd3QlZMTE0tb29oODllWEJ1Q2JJdmRvVlFTbDVuOFBPMnYzaXNXM3ZrTkI0Y1RsRDdCdw?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cx2k77p2r1xo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/cuban-dissident-otero-exile.png",
      "alt": "Classic American cars on a Havana street with Cuba's National Capitol building behind",
      "credit": "Fraganda / Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 8 the emperor Augustus banished Rome's most celebrated poet, Ovid, to Tomis, a bleak Getic outpost on the Black Sea, for a still-mysterious \"poem and a mistake\" (carmen et error). Stripped of the city he loved, Ovid spent his final decade writing the Tristia and Epistulae ex Ponto, elegies that plead for a recall which never came; he died in exile around AD 17. His verse turned banishment itself into an act of defiance, keeping his voice alive beyond the reach of imperial power. Two millennia later Luis Manuel Otero Alcantara, expelled from Cuba after five years in prison, embodies the same ancient pattern: a state that fears an artist so much it would rather exile him than tolerate his work. Like Ovid, he carries his homeland with him, and his art becomes the record of what tyranny tried to erase.",
        "excerpt": "When the most sad remembrance recurs to me of that night, which was my last in the City — when I recal that night, in which I left so much that was dear to me — even now does the tear start from my eyes.",
        "source": "Ovid, Tristia, Book I, Elegy III, trans. Henry T. Riley, in The Fasti, Tristia, Pontic Epistles, Ibis, and Halieuticon of Ovid (London: H. G. Bohn, 1851).",
        "href": "https://archive.org/details/fastitristiapont00ovid",
        "image": {
          "src": "/covers/cuban-dissident-otero-exile--a0.png",
          "alt": "Eugene Delacroix's painting Ovid among the Scythians, showing the exiled poet reclining among the people of the Black Sea coast.",
          "credit": "Eugene Delacroix, Ovid among the Scythians (1859), National Gallery, London. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Aleksandr Solzhenitsyn survived eight years in Stalin's Gulag and then exposed the entire camp system in works such as One Day in the Life of Ivan Denisovich (1962) and The Gulag Archipelago (1973). On 13 February 1974 the Soviet authorities arrested him, stripped his citizenship, and forcibly deported him to West Germany, choosing exile over imprisonment for a writer whose words had become impossible to contain. He lived twenty years abroad, mostly in Vermont, before returning to Russia in 1994 after the USSR collapsed. His expulsion showed how a dictatorship can wield exile as a weapon, and how it can backfire by amplifying the dissident's voice around the world. Otero Alcantara's release from a Cuban prison directly into U.S. exile follows the same logic: the regime rids itself of the man but not of the truth he tells.",
        "excerpt": "Aleksandr Solzhenitsyn (1918-2008) was seized at his Moscow apartment, charged with treason, and deported from the Soviet Union in February 1974 rather than jailed again. The Kremlin calculated that banishing the Nobel laureate would mute him, yet his smuggled manuscripts and public witness only grew louder from abroad. His exile became one of the twentieth century's clearest proofs that a police state cannot imprison an idea.",
        "source": "Aleksandr Solzhenitsyn (1918-2008), Russian novelist and dissident, expelled from the USSR on 13 February 1974.",
        "href": "https://en.wikipedia.org/wiki/Aleksandr_Solzhenitsyn"
      },
      {
        "category": "literary",
        "title": "Exiled from Florence in 1302 amid the wars between the Black and White Guelphs, the poet Dante Alighieri was condemned to death in absentia and never allowed to return to his native city. Wandering the courts of Italy for nearly twenty years, he poured his bitterness and hope into the Divine Comedy, where his ancestor Cacciaguida foretells the taste of another man's bread and the hard stairs of dependency that exile brings. Dante refused a humiliating amnesty that would have required him to confess guilt, insisting on his innocence until his death in Ravenna in 1321. His example fixed the exiled artist as the truth-teller who will not bargain away his conscience for a safe homecoming. Otero Alcantara, freed only on the condition that he leave Cuba, joins that lineage of artists who accept exile rather than submit.",
        "excerpt": "Thou shalt abandon everything beloved\nMost tenderly, and this the arrow is\nWhich first the bow of banishment shoots forth.\nThou shalt have proof how savoureth of salt\nThe bread of others, and how hard a road\nThe going down and up another's stairs.",
        "source": "Dante Alighieri, Paradiso, Canto XVII, trans. Henry Wadsworth Longfellow (1867).",
        "href": "https://monadnock.net/dante/paradiso-17.html"
      },
      {
        "category": "literary",
        "title": "In 1816 Lord Byron visited the Chateau de Chillon on Lake Geneva and was moved by the story of Francois Bonivard, a Genevan patriot chained in its dungeon from 1532 to 1536 for opposing the Duke of Savoy. Byron's poem The Prisoner of Chillon, with its prefatory Sonnet on Chillon, made the prison a shrine to the \"chainless Mind\" — the conviction that liberty lives in the heart even when the body is fettered. The sonnet closes by declaring that the captive's very footsteps appeal from tyranny to God. For a dissident like Otero Alcantara, held five years in Cuban cells for his art, Byron's lines insist that imprisonment cannot chain the conscience. They argue that a jailer's cruelty only sanctifies the prisoner's cause.",
        "excerpt": "Eternal Spirit of the chainless Mind!\nBrightest in dungeons, Liberty! thou art:\nFor there thy habitation is the heart—\nThe heart which love of thee alone can bind;\nAnd when thy sons to fetters are consigned—\nTo fetters, and the damp vault's dayless gloom,\nTheir country conquers with their martyrdom,\nAnd Freedom's fame finds wings on every wind.\nChillon! thy prison is a holy place,\nAnd thy sad floor an altar—for 'twas trod,\nUntil his very steps have left a trace\nWorn, as if thy cold pavement were a sod,\nBy Bonnivard!—May none those marks efface!\nFor they appeal from tyranny to God.",
        "source": "Lord Byron, \"Sonnet on Chillon\" (1816), prefatory to The Prisoner of Chillon.",
        "href": "https://en.wikisource.org/wiki/Sonnet_on_Chillon",
        "image": {
          "src": "/covers/cuban-dissident-otero-exile--a3.png",
          "alt": "Eugene Delacroix's painting The Prisoner of Chillon, showing the chained Bonivard in the castle dungeon.",
          "credit": "Eugene Delacroix, The Prisoner of Chillon (1834), Musee du Louvre. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Eugène Delacroix painted Liberty Leading the People in 1830, weeks after the July Revolution toppled the Bourbon king Charles X, showing a bare-breasted allegory of Liberty striding over the barricades' dead with the tricolor in one hand and a musket in the other, a ragged crowd of workers and students surging behind her. The canvas fused a real Paris uprising with myth, and the restored monarchy found it so dangerous that it was kept from public view for years. It became the enduring emblem of ordinary people rising against a regime that would silence them. As Luis Manuel Otero Alcántara walks free vowing that the dictatorship has to end, Delacroix's Liberty is the image of that same defiant hope carried out of prison and into the open.",
        "excerpt": "Painted in 1830 and now in the Louvre, Delacroix's canvas shows the personification of Liberty, tricolor raised, leading a crowd of Parisians over the bodies of the fallen during the July Revolution. Long deemed too incendiary to display, it became the archetypal image of a people rising to throw off a tyrant.",
        "source": "Eugène Delacroix, Liberty Leading the People (La Liberté guidant le peuple), 1830, oil on canvas, Musée du Louvre, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
        "image": {
          "src": "/covers/cuban-dissident-otero-exile--a4.png",
          "alt": "Allegory of Liberty holding the French tricolor and a musket, leading a crowd over barricades.",
          "credit": "Eugène Delacroix, Liberty Leading the People, 1830; Musée du Louvre, Paris. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "When Verdi's opera Nabucco premiered at La Scala in 1842, its chorus of Hebrew slaves longing for a lost homeland — \"Va, pensiero, sull'ali dorate\" (\"Fly, thought, on wings of gold\") — became an anthem of exile and national yearning, later sung as an unofficial hymn of Italian freedom during the Risorgimento. Set to a libretto by Temistocle Solera drawn from Psalm 137, the melody gives collective voice to a people torn from their native soil, mourning a homeland \"so lovely and so lost.\" The chorus fuses the pain of loss with a refusal to forget. Otero Alcantara arrived in Miami wrapped in a Cuban flag reading \"Patria y Vida,\" the protest anthem he shared a Grammy for. His homecoming-in-exile echoes Va, pensiero, in which the banished sing their homeland's freedom from afar.",
        "excerpt": "Va, pensiero, sull'ali dorate;\nva, ti posa sui clivi, sui colli,\nove olezzano tepide e molli\nl'aure dolci del suolo natal!\nDel Giordano le rive saluta,\ndi Sionne le torri atterrate.\nO, mia patria, sì bella e perduta!\nO, membranza, sì cara e fatal!",
        "source": "Giuseppe Verdi and Temistocle Solera, \"Va, pensiero\" (Chorus of the Hebrew Slaves), from Nabucco, premiered La Scala, 1842.",
        "href": "https://en.wikipedia.org/wiki/Va,_pensiero"
      }
    ],
    "rank": 17
  },
  {
    "slug": "trump-world-cup-final-trophy",
    "headline": "Trump will present the World Cup trophy and host Mexico's president as the U.S.-co-hosted final is played",
    "overview": "President Trump is set to present the World Cup trophy at Sunday's final between Spain and Argentina, casting the tournament co-hosted by the United States, Mexico and Canada as a victory for the country. Mexican President Claudia Sheinbaum will attend the match at Trump's invitation, a rare joint appearance amid strained relations over tariffs and migration. The final caps a tournament that has doubled as a stage for the president's political messaging.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiiAFBVV95cUxNVzFYUG91TzJuN0RjbWhPdVlwako3eUtzNEswNkRZZC02UHprUzFNQ2JrUnJldGotMXhTSEVTbXRRT1BBV0cweHFJN291WFR2T3NuZFJiQ3Eya1h1d2tYWlB2VVRaZjFSYmd0WGY0cHhnaVdDMERaSzJWeFNyQTVKbEc1YVdXYVJN?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxOT1FxbVJVY0k1aVF4cFE3cld3UnQ1bWR1VEtlOWFyRS0yVHhxVmtUNWhfRk80eUd1aWxpWDB6Ui1vZmdTWG85MVR0QUVJcXlZNlhOdl9ILTYxUmVUYVBBTWo5VzF2b0ZURVNmNTBBQm5zajVfeEdEajRxMnctekRqb2d2dHJCZVd2eGN0QThGQWJ1Wi1MX0gxbEp1cFZ2VnRqX2FSbnlNNDZIQlJZUFhwb1g1TmpOLURWTWc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/trump-world-cup-final-trophy.png",
      "alt": "Pitch-side interior view of a large football stadium and its stands",
      "credit": "Paul Gillett / geograph.org.uk, CC BY-SA 2.0, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 80 the emperor Titus dedicated the Flavian Amphitheatre, the Colosseum, in the heart of Rome with roughly a hundred days of games. From the imperial box he presided over gladiatorial combats, a staged naval battle in the flooded Naumachia, and thousands of wild beasts slaughtered in a single day, showering the crowd with gifts and casting himself as the people's benefactor. The spectacle bound the emperor's personal glory to the joy of the masses and the prestige of the state. Ancient historians treated the games less as sport than as an instrument of rule, a public stage on which the sovereign displayed his power and generosity. Trump's plan to hand over the World Cup trophy before a global audience, hosting a fellow head of state, revives the same fusion of the ruler and the great public games.",
        "excerpt": "Having dedicated his amphitheatre, and built some warm baths close by it with great expedition, he entertained the people with most magnificent spectacles. He likewise exhibited a naval fight in the old Naumachia, besides a combat of gladiators; and in one day brought into the theatre five thousand wild beasts of all kinds.",
        "source": "Suetonius, The Lives of the Twelve Caesars, \"Titus,\" ch. 7, trans. Alexander Thomson (rev. T. Forester), via the Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Dtit.%3Achapter%3D7",
        "image": {
          "src": "/covers/trump-world-cup-final-trophy--a0.png",
          "alt": "The Colosseum (Flavian Amphitheatre) in Rome, dedicated by the emperor Titus in AD 80.",
          "credit": "Photo by FeaturedPics, CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The 1936 Summer Olympics were staged in Berlin from 1 to 16 August 1936 by Adolf Hitler's Nazi regime, which seized the Games as a showcase for a resurgent Germany. Hitler formally declared the Games open before a parade of nations, while the state temporarily masked its antisemitism and barred nearly all Jewish and Romani athletes from its own team. The American sprinter Jesse Owens punctured the propaganda by winning four gold medals, in the 100 m, 200 m, long jump, and 4x100 m relay. The tournament showed how a ruler could turn an international sporting festival into an instrument of national prestige and political messaging. Trump's framing of the U.S.-co-hosted final as a national victory, with the president presenting the trophy, follows that modern template of sport fused with statecraft.",
        "excerpt": "Staged in Berlin from 1 to 16 August 1936, the Games became a propaganda vehicle for Hitler's regime, which projected an image of a peaceful, tolerant Germany while barring nearly all Jewish and Romani athletes from its national team. Hitler opened the Games before a record forty-nine nations, and Germany topped the medal table. The American Jesse Owens, winner of four golds, emerged as the most celebrated athlete of the Berlin Games and a living rebuke to Nazi racial ideology.",
        "source": "\"1936 Summer Olympics,\" Wikipedia (modern factual context).",
        "href": "https://en.wikipedia.org/wiki/1936_Summer_Olympics",
        "image": {
          "src": "/covers/trump-world-cup-final-trophy--a1.png",
          "alt": "Jesse Owens competing at the 1936 Olympic Games in Berlin.",
          "credit": "General Services Administration, National Archives; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Writing in Rome in the early second century AD, the satirist Juvenal skewered a citizenry that had traded its political birthright for handouts and entertainment. In his tenth Satire he coined the enduring phrase panem et circenses, bread and circus games, mocking a people who once bestowed commands, consulships, and legions but now anxiously craved only two things. The line became the classic diagnosis of rulers who buy public loyalty and glory through spectacle rather than substance. It names the exact mechanism by which games and giveaways can substitute for genuine civic power. Trump's staging of the World Cup final as a patriotic pageant, complete with the ceremonial award of the trophy, is a contemporary echo of the bread-and-circuses bargain.",
        "excerpt": "iam pridem, ex quo suffragia nulli\nvendimus, effudit curas; nam qui dabat olim\nimperium fasces legiones omnia, nunc se\ncontinet atque duas tantum res anxius optat,\npanem et circenses.",
        "source": "Juvenal, Satire X, lines 77-81 (Latin text), via the Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2007.01.0093%3Abook%3D4%3Apoem%3D10"
      },
      {
        "category": "literary",
        "title": "Around 476 BC the Theban poet Pindar composed his First Olympian Ode to celebrate Hieron, the powerful tyrant of Syracuse, whose horse Pherenikos had won the single-horse race at Olympia. Pindar opens by ranking the Olympic Games above all other contests, then fuses the athletic triumph with the ruler's political majesty, praising Hieron's wealth, sceptre, and just rule alongside the victory. The victory ode was a public act of statecraft, turning a sporting win into an emblem of the sovereign's prestige and legitimacy. Athletic glory and royal power are here inseparable, sung before all of Greece. When Trump presents the World Cup trophy as a national triumph tied to his own leadership, he steps into the ancient role of the ruler who claims the victor's laurel as political capital.",
        "excerpt": "Best is Water of all, and Gold as a flaming fire in the night shineth eminent amid lordly wealth; but if of prizes in the games thou art fain, O my soul, to tell, then, as for no bright star more quickening than the sun must thou search in the void firmament by day, so neither shall we find any games greater than the Olympic",
        "source": "Pindar, The First Olympian Ode (for Hieron of Syracuse), trans. Ernest Myers, from The Extant Odes of Pindar (1874), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Odes_of_Pindar_(Myers)/Olympian_Odes/1",
        "image": {
          "src": "/covers/trump-world-cup-final-trophy--a3.png",
          "alt": "The bronze Charioteer of Delphi (c. 478 BC), a monument commemorating a chariot-race victory dedicated by the Sicilian ruler Polyzalos.",
          "credit": "Charioteer of Delphi, Archaeological Museum of Delphi; photo by Zde, CC BY-SA 4.0, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The French academic painter Jean-Leon Gerome captured the politics of the arena in Pollice Verso (1872), now in the Phoenix Art Museum. A victorious gladiator stands over his fallen opponent in the Colosseum while the crowd and the white-robed Vestal Virgins thrust their thumbs down, demanding death. Gerome renders the amphitheatre as a machine of mass spectacle in which the presiding elite and the roaring public together decide a man's fate. The painting is a study in how rulers and crowds are bound together by games staged for power and display. It is a fitting mirror for a modern leader who presides over a stadium spectacle and hands down the ceremonial verdict of victory before a watching world.",
        "excerpt": "Jean-Leon Gerome's Pollice Verso (1872) is a large academic oil painting depicting a triumphant gladiator in the Roman Colosseum awaiting the crowd's judgment on his beaten rival. The spectators and Vestal Virgins in the stands turn their thumbs down, calling for the kill, while the arena's tiers and imperial box loom behind. The work fixed the popular image of the Roman games as brutal political theater, and its \"thumbs down\" gesture shaped the modern idea of the arena verdict.",
        "source": "Jean-Leon Gerome, Pollice Verso, 1872, oil on canvas, Phoenix Art Museum. Public domain, via Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Leon_Gerome_Pollice_Verso.jpg",
        "image": {
          "src": "/covers/trump-world-cup-final-trophy--a4.png",
          "alt": "Jean-Leon Gerome's 1872 painting Pollice Verso, showing a victorious gladiator in the Colosseum as the crowd gestures thumbs down.",
          "credit": "Jean-Leon Gerome, Pollice Verso (1872), Phoenix Art Museum; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel's chorus \"See, the conquering hero comes,\" set to words by the Reverend Thomas Morell, greets a triumphant leader with trumpets, drums, and the victor's laurel. First composed for the oratorio Joshua in 1748, it proved so popular that Handel inserted it into his earlier oratorio Judas Maccabaeus (HWV 63, premiered in London in 1747), where it now most famously resides. The music became a standard anthem of royal, military, and civic triumph across the following centuries, sounding whenever a conqueror or champion was crowned in public ceremony. Its lyrics literally call for sports, laurels, and songs of triumph to honor the returning hero. That ceremony of the victor hailed amid pageantry is exactly the tableau Trump seeks in presenting the World Cup trophy at the final.",
        "excerpt": "See, the conquering hero comes:\nSound the trumpets, beat the drums.\nSports prepare; the laurel bring:\nSongs of triumph to him sing.\n\nSee the godlike youth advance:\nBreathe the flutes, and lead the dance:\nMyrtle wreaths and roses twine,\nTo deck the hero's brow divine.",
        "source": "Thomas Morell, libretto for G. F. Handel's Judas Maccabaeus (HWV 63), chorus \"See, the conquering hero comes\"; text from the Novello vocal wordbook (archive.org). Score public domain (IMSLP).",
        "href": "https://archive.org/details/judasmaccabaeus00hand_6"
      }
    ],
    "rank": 18
  },
  {
    "slug": "lebanon-aoun-trump-white-house",
    "headline": "Lebanon's president, Joseph Aoun, heads to the White House to press Trump for an Israeli withdrawal",
    "overview": "Lebanese President Joseph Aoun departed for Washington for his first meeting with President Trump, seeking U.S. guarantees that Washington will pressure Israel to implement a fragile framework agreement and withdraw its forces from southern Lebanon. Aoun, who is also expected to seek a reconstruction package after Israeli strikes devastated parts of the south, travels at Trump's invitation. Expectations for the visit are modest, with Trump's attention fixed on the widening war with Iran.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPOU4yVVlYeXdhdDFTY0pNZUZjSzRvWE1mWi1NcF9MVUI5Y3N3aTRrRzU2RnpCc2tzVV9LS21EQ1RPdUFDN0VnVURKZ0V5RTFScVUtTElSUlp3VU1xZE45UWY3ZmV6cnFmeEVFSE4yMEZ5UVFmVEFwczBtRzdoS3dyUGszV2V3anJEOTBOQ3l0bS16aU0zeU8tYUdwSzRBenlEZmVVT2oxNjZCU21mbkRzN1JIakN4UnoxRlpJWjVCNA?oc=5"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/18/lebanons-aoun-to-meet-trump-in-washington-to-discuss-israel-talks"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/lebanon-aoun-trump-white-house.png",
      "alt": "Exterior of the White House in Washington, D.C.",
      "credit": "DJTechYT / Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 433 BC the island city-state of Corcyra (modern Corfu), locked in a bitter quarrel with its mother-city Corinth, dispatched envoys to Athens to beg the greatest naval power in Greece for a defensive alliance. Standing before the Athenian assembly, as recorded by Thucydides, the Corcyraeans argued that their fleet and strategic position made them a prize worth protecting and that Athens's own security demanded the pact. Athens granted only a limited, defensive treaty, enough to deter Corinth without openly provoking war, a hedged commitment that helped ignite the Peloponnesian War. Like Corcyra, Joseph Aoun travels to Washington as the leader of a smaller power courting a mightier patron's shield against a stronger neighbor. He too offers strategic value while managing modest expectations of how far the great power will actually commit on his behalf.",
        "excerpt": "Moreover, can you conceive a stroke of good fortune more rare in itself, or more disheartening to your enemies, than that the power whose adhesion you would have valued above much material and moral strength should present herself self-invited, should deliver herself into your hands without danger and without expense, and should lastly put you in the way of gaining a high character in the eyes of the world, the gratitude of those whom you shall assist, and a great accession of strength for yourselves?",
        "source": "Thucydides, History of the Peloponnesian War, Book I.33 (speech of the Corcyraean envoys at Athens), trans. Richard Crawley.",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm"
      },
      {
        "category": "historical",
        "title": "In December 1776 Benjamin Franklin sailed to Paris as envoy of the fragile, self-declared United States, seeking a great-power patron to help drive British forces from American soil. For more than a year he courted the court of Louis XVI, and after the decisive American victory at Saratoga he persuaded France to sign the Treaty of Alliance on 6 February 1778, binding France to secure American liberty and independence. French money, ships, and soldiers proved decisive at Yorktown in 1781, sealing the outcome. Aoun's mission to the White House echoes Franklin's embassy to Versailles: the representative of a weaker, war-strained nation petitioning a superpower to force out an occupying army and to underwrite reconstruction and survival.",
        "excerpt": "The essential and direct End of the present defensive alliance is to maintain effectually the liberty, Sovereignty, and independance absolute and unlimited of the said united States, as well in Matters of Gouvernement as of commerce.",
        "source": "Treaty of Alliance Between the United States and France, Article 2 (February 6, 1778), The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/18th_century/fr1788-2.asp"
      },
      {
        "category": "literary",
        "title": "In Aeschylus's tragedy The Suppliant Maidens (c. 463 BC), the fifty daughters of Danaus flee Egypt and reach Argos, clutching branches at the altar and imploring King Pelasgus to shelter them from the cousins pursuing them into forced marriage. Pelasgus is caught in an agonizing calculation: to spurn suppliants risks the wrath of Zeus, their divine protector, but to grant asylum means war with Egypt. Unwilling to bear the burden alone, he refers the decision to the Argive people, who vote to protect the refugees. The play stages the very predicament of Aoun's diplomacy, in which a vulnerable petitioner appeals to a powerful ruler for protection, and the potential patron weighs the costs of taking a weaker party under its wing.",
        "excerpt": "Son of Palaechthon, lord of the Pelasgians, hearken unto me with a heart benign. Behold me, thy suppliant, a fugitive, coursing to and fro like a heifer chased by wolves upon precipitous crags.",
        "source": "Aeschylus, The Suppliant Maidens, trans. Herbert Weir Smyth (Loeb Classical Library, 1926).",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/The_Suppliant_Maidens"
      },
      {
        "category": "literary",
        "title": "In the final book of Homer's Iliad, the aged King Priam of Troy steals across enemy lines at night and enters the tent of Achilles, the man who has killed and defiled his son Hector. Kneeling, Priam clasps the knees and kisses the terrible hands of his enemy, invoking Achilles's own father to win pity, and begs for the return of Hector's body. Moved to tears, Achilles relents, granting the ransom and a truce for the burial. Priam's supplication, the ruler of a besieged city humbling himself before overwhelming power to obtain what he cannot seize by force, mirrors Aoun's journey to Washington to plead, from a position of weakness, for relief from a stronger adversary.",
        "excerpt": "Nay, have thou awe of the gods, Achilles, and take pity on me, remembering thine own father. Lo, I am more piteous far than he, and have endured what no other mortal on the face of earth hath yet endured, to reach forth my hand to the face of him that hath slain my sons.",
        "source": "Homer, The Iliad, Book XXIV, trans. A. T. Murray (Loeb Classical Library, 1924).",
        "href": "https://www.theoi.com/Text/HomerIliad24.html",
        "image": {
          "src": "/covers/lebanon-aoun-trump-white-house--a3.png",
          "alt": "Painting of the aged King Priam kneeling and pleading before Achilles in his tent for the body of Hector.",
          "credit": "Gavin Hamilton, Priam Pleading with Achilles for the Body of Hector, c. 1775, Tate. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Artemisia Gentileschi's Esther before Ahasuerus (c. 1628-1635, now in the Metropolitan Museum of Art) depicts the Old Testament queen who risks death by approaching the Persian king unbidden to plead for the survival of her condemned people. Gentileschi paints the dramatic instant of supplication: Esther swooning in her pale satin gown before the startled, enthroned Ahasuerus, her petition hanging in the balance. In the biblical account the king extends his golden sceptre, sparing her life and granting her plea. The canvas crystallizes the theme of Aoun's mission, a lone supplicant appealing to a far mightier sovereign for the deliverance of a threatened nation.",
        "excerpt": "And it was so, when the king saw Esther the queen standing in the court, that she obtained favour in his sight: and the king held out to Esther the golden sceptre that was in his hand. So Esther drew near, and touched the top of the sceptre.",
        "source": "The Book of Esther 5:2 (King James Version); painting: Artemisia Gentileschi, Esther before Ahasuerus, c. 1628-35, The Metropolitan Museum of Art, New York.",
        "href": "https://commons.wikimedia.org/wiki/File:Esther_before_Ahasuerus_MET_DT1440.jpg",
        "image": {
          "src": "/covers/lebanon-aoun-trump-white-house--a4.png",
          "alt": "Baroque painting of Queen Esther fainting in a pale gown as she supplicates the enthroned Persian king Ahasuerus.",
          "credit": "Artemisia Gentileschi, Esther before Ahasuerus, c. 1628-35, The Metropolitan Museum of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Auguste-Dominique Ingres won the Prix de Rome in 1801 with Achilles Receiving the Envoys of Agamemnon, which stages the embassy of Iliad Book 9: Odysseus, Phoenix, and Ajax are sent to the sulking Achilles to entreat him, with gifts and appeals, to rejoin the war and rescue the faltering Greek army. The envoys press forward as supplicants, their outstretched pleading met by the aloof, seated hero holding his lyre. The painting is a study in the choreography of petition, emissaries dispatched to move a greater power to act. Aoun's delegation to the White House replays that ancient scene: envoys of an imperiled people seeking to sway a mightier force to intervene on their behalf.",
        "excerpt": "But if the son of Atreus be too utterly hated by thee at heart, himself and his gifts, yet have thou pity at least on the rest of the Achaeans, that are sore bested throughout the host; these shall honour thee as though thou wert a god, for verily shalt thou win great glory in their eyes.",
        "source": "Scene from Homer, Iliad, Book IX (the Embassy to Achilles), trans. A. T. Murray (Loeb, 1924); painting: Jean-Auguste-Dominique Ingres, Achilles Receiving the Envoys of Agamemnon, 1801.",
        "href": "https://commons.wikimedia.org/wiki/File:Achilles_Receiving_in_his_Tent_the_Envoys_of_Agamemnon_(Jean-Auguste-Dominique_Ingres)_-_Nationalmuseum_-_19221.jpg",
        "image": {
          "src": "/covers/lebanon-aoun-trump-white-house--a5.png",
          "alt": "Neoclassical painting of Agamemnon's envoys standing in supplication before a seated Achilles who holds a lyre in his tent.",
          "credit": "Jean-Auguste-Dominique Ingres, Achilles Receiving the Envoys of Agamemnon, 1801; Nationalmuseum, Stockholm. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "china-cdb-president-graft-probe",
    "headline": "China places Ouyang Weimin, a former China Development Bank president, under an anti-corruption investigation",
    "overview": "China's top anti-graft watchdog, the Central Commission for Discipline Inspection, said it is investigating Ouyang Weimin, who led the state-owned China Development Bank from 2019 until 2023, for 'serious violations of party discipline and the law.' The commission gave no further details. Ouyang, a former vice-governor of Guangdong who spent years at the central bank, is the latest senior figure swept up in President Xi Jinping's long-running campaign against corruption in the financial sector.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPYzlZTGhzUXdyQm52X3RoWkFMTGR1ZExvb0h3UWQ2ZmlMcXVzZTB2UEFyZ3VPRHVwRkt1ZG1nNE9mTWpxX01NQTVXVG5taHJTMXI5MVNxb3FKVEpxSTZ2a1czXzhpNHgySERzVHJxWGZoRndVeGtqZ1UwbWcxWlNEcTlGNDVEblcwMEktbW9vUDJGakhvdjBqdjVoUWR5d09GbUJxR2x3N3FaX01Vd05WYi1XcjlGaHdfRm9GSUg4cw?oc=5"
      },
      {
        "name": "The Star",
        "href": "https://www.thestar.com.my/aseanplus/aseanplus-news/2026/07/19/former-china-development-bank-president-put-under-anti-graft-investigation"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/china-cdb-president-graft-probe.png",
      "alt": "Skyline of the Beijing Central Business District financial towers",
      "credit": "N509FZ / Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Heshen (1750-1799) was the most powerful minister of late imperial China, a Manchu bodyguard who became the favorite of the Qianlong Emperor and rose to Grand Councillor, Minister of Revenue, and head of the Imperial Household, effectively controlling the revenue of the entire empire. Over two decades he amassed a fortune estimated at some 1.1 billion taels of silver, reputedly equal to more than a decade of the Qing state's income. Within days of Qianlong's death in February 1799, the new Jiaqing Emperor arrested him, charged him with twenty crimes of corruption and abuse of power, confiscated his estate, and forced him to hang himself with a length of silk. Heshen embodies the archetype invoked by Beijing's watchdog today: a mighty official who bent the machinery of state to enrich himself, only to be toppled once his protector was gone. The investigation of former China Development Bank president Ouyang Weimin follows the same script of a state-bank chief brought down for graft.",
        "excerpt": "As favorite of the Qianlong Emperor, Heshen controlled the Ministry of Revenue and the empire's finances for two decades, accumulating a fortune reputed to equal roughly twelve years of Qing government revenue. Five days after Qianlong died in February 1799, the Jiaqing Emperor had him arrested and charged with twenty counts including abuse of power and hoarding wealth. On 22 February 1799 he was permitted to hang himself with a rope of golden silk rather than face execution by slow slicing.",
        "source": "Heshen (1750-1799), Grand Councillor under the Qianlong Emperor; account of his fall under the Jiaqing Emperor.",
        "href": "https://en.wikipedia.org/wiki/Heshen",
        "image": {
          "src": "/covers/china-cdb-president-graft-probe--a0.png",
          "alt": "Traditional portrait of the Qing dynasty official Heshen in court robes",
          "credit": "Portrait of Heshen, Qing dynasty. Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "In 70 BC the young advocate Marcus Tullius Cicero prosecuted Gaius Verres, the former Roman governor of Sicily, for extortion and plunder during his three years in the province. Verres had looted temples, seized private estates, taken bribes to fix trials, and even had Roman citizens flogged and crucified; he trusted that his vast stolen wealth could buy an acquittal from a Senate-drawn jury widely believed to be for sale. Cicero gathered evidence across Sicily in fifty days and, breaking with custom, moved straight to witnesses so that Verres, seeing conviction certain, fled into voluntary exile before the case even concluded. The prosecution became the classic Western case of an incorruptible investigator felling a mighty, corrupt official and restoring faith in the courts. The graft probe into a former China Development Bank chief echoes that ancient contest between accumulated corruption and the machinery meant to punish it.",
        "excerpt": "For I have brought before you a man, by acting justly in whose case you have an opportunity of retrieving the lost credit of your judicial proceedings, of regaining your credit with the Roman people, and of giving satisfaction to foreign nations; a man, the embezzler of the public funds, the petty tyrant of Asia and Pamphylia, the robber who deprived the city of its rights, the disgrace and ruin of the province of Sicily.",
        "source": "Cicero, Against Verres, First Pleading, section 2, trans. C. D. Yonge (1903).",
        "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading"
      },
      {
        "category": "literary",
        "title": "In Cantos XXI and XXII of Dante's Inferno (completed c. 1320), the poet and his guide Virgil reach the fifth pit of the eighth circle, where the barrators, souls who bought and sold public office and justice for money, are plunged into a lake of boiling pitch and guarded by the demon Malebranche, who hook and tear any grafter who surfaces. Dante, himself exiled from Florence on trumped-up charges of graft, made corruption of public trust one of Hell's most viscerally punished sins, opening the scene with the famous image of the Venetian Arsenal where shipwrights boil tar. The passage renders political corruption as filth that clings and cannot be washed away. It is a fitting literary mirror for the disgrace attaching to an official under investigation for 'serious violations of discipline and the law,' the language used of the fallen China Development Bank president.",
        "excerpt": "From bridge to bridge thus, speaking other things\nOf which my Comedy cares not to sing,\nWe came along, and held the summit, when\nWe halted to behold another fissure\nOf Malebolge and other vain laments;\nAnd I beheld it marvellously dark.\nAs in the Arsenal of the Venetians\nBoils in the winter the tenacious pitch\nTo smear their unsound vessels o'er again,",
        "source": "Dante Alighieri, The Divine Comedy, Inferno, Canto XXI, ll. 1-9, trans. Henry Wadsworth Longfellow (1867).",
        "href": "https://en.wikisource.org/wiki/The_Divine_Comedy/Inferno/Canto_XXI"
      },
      {
        "category": "literary",
        "title": "Shakespeare and John Fletcher's history play Henry VIII (first performed 1613) dramatizes the fall of Cardinal Thomas Wolsey, the low-born butcher's son who rose to be Lord Chancellor and the king's mightiest minister before his enemies exposed his self-enrichment and secret dealings. In Act 3, Scene 2, stripped of the great seal and his estates, Wolsey delivers his celebrated farewell, watching his glory collapse 'like little wanton boys that swim on bladders.' The speech distills the sudden vertigo of a powerful official who has climbed on royal favor and abruptly loses everything he built. Wolsey's ruin is the literary template for the toppled grandee, the once-untouchable minister brought low. It resonates with the abrupt fall of Ouyang Weimin, a former state-bank president suddenly placed under anti-corruption investigation.",
        "excerpt": "Farewell! a long farewell, to all my greatness!\nThis is the state of man: to-day he puts forth\nThe tender leaves of hopes; to-morrow blossoms,\nAnd bears his blushing honours thick upon him;\nThe third day comes a frost, a killing frost,\nAnd, when he thinks, good easy man, full surely\nHis greatness is a-ripening, nips his root,\nAnd then he falls, as I do.",
        "source": "William Shakespeare and John Fletcher, King Henry VIII, Act 3, Scene 2 (Cardinal Wolsey's farewell).",
        "href": "https://shakespeare.mit.edu/henryviii/henryviii.3.2.html"
      },
      {
        "category": "artistic",
        "title": "The Netherlandish master Gerard David painted 'The Judgment of Cambyses' in 1498 for the aldermen's chamber of the town hall of Bruges, a two-panel warning against judicial corruption. Drawing on a story told by the Greek historian Herodotus, the panels show the corrupt royal judge Sisamnes, who took a bribe to deliver a false verdict, first arrested at his bench by order of the Persian king Cambyses, and then, in the companion scene, being flayed alive as punishment. David set the tale in contemporary Flemish dress to remind the city's own magistrates that taking money to pervert justice invited terrible retribution. The picture is Western art's starkest image of an official destroyed for graft. It offers a vivid emblem for a modern anti-corruption campaign that strips and disgraces once-powerful officials such as the investigated China Development Bank chief.",
        "excerpt": "Gerard David's diptych for Bruges city hall stages the fate of the venal judge Sisamnes in two acts. In the first panel, soldiers seize the richly dressed magistrate at his judicial bench as King Cambyses lists his crime of accepting a bribe. In the companion panel he is stretched on a table and flayed alive, his skin later draped over the seat where his son must judge, a permanent warning to corrupt officials.",
        "source": "Gerard David, The Judgment of Cambyses, 1498, oil on oak panel, Groeningemuseum, Bruges.",
        "href": "https://en.wikipedia.org/wiki/The_Judgment_of_Cambyses",
        "image": {
          "src": "/covers/china-cdb-president-graft-probe--a4.png",
          "alt": "Gerard David's painting showing the corrupt judge Sisamnes seized at his bench by soldiers",
          "credit": "Gerard David, The Judgment of Cambyses (panel 1), 1498, Groeningemuseum, Bruges. Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Between 1338 and 1339 the Sienese painter Ambrogio Lorenzetti covered the walls of the Sala dei Nove, the council chamber of Siena's Palazzo Pubblico, with a vast fresco cycle known as the Allegory of Good and Bad Government. In the Allegory of Good Government, the enthroned figure of the Common Good is flanked by the virtues, while a majestic figure of Justice, holding her scales beneath the gaze of Wisdom, binds the citizens together in concord; the opposing wall shows Tyranny surrounded by Avarice, Fraud, and Division, with Justice bound and helpless. Painted where the city's magistrates deliberated, the cycle was a daily civic sermon: honest, incorruptible rule brings flourishing, while greed and graft bring ruin. It is the definitive visual allegory of the choice between clean and corrupt governance. That contest animates China's long anti-graft campaign and the probe of the former China Development Bank president.",
        "excerpt": "In the Sala dei Nove of Siena's town hall, Lorenzetti's fresco pairs a serene city of Good Government with a decaying city of Bad Government. On the good wall the crowned figure of the Common Good sits enthroned with Peace, Fortitude, and a commanding personification of Justice weighing her scales. On the facing wall a horned Tyrant rules amid Avarice, Fraud, and Cruelty while Justice lies bound at his feet, an image of what corrupt power does to a state.",
        "source": "Ambrogio Lorenzetti, Allegory of Good and Bad Government, 1338-1339, fresco, Sala dei Nove, Palazzo Pubblico, Siena.",
        "href": "https://en.wikipedia.org/wiki/The_Allegory_of_Good_and_Bad_Government",
        "image": {
          "src": "/covers/china-cdb-president-graft-probe--a5.png",
          "alt": "Ambrogio Lorenzetti's fresco Allegory of Good Government with enthroned figures of the Common Good and Justice",
          "credit": "Ambrogio Lorenzetti, Allegory of Good Government, 1338-1339, Palazzo Pubblico, Siena. Wikimedia Commons (public domain, Google Art Project)."
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "peru-earthquake-magnitude",
    "headline": "A magnitude 5.6 earthquake strikes the central Peruvian Andes at shallow depth",
    "overview": "A magnitude 5.6 earthquake struck central Peru's Andean highlands late Saturday at a shallow depth of about 10 kilometers, the European-Mediterranean Seismological Centre and the U.S. Geological Survey reported. Shallow quakes of that size can cause strong shaking near the epicenter, and it ranked among the more powerful tremors to hit the region in years. There were no immediate reports of widespread damage or casualties.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxQNXdkYVQ3QW56b1Y4OXUxei01em1aLW1Yc1dLSllzeDNwaEdzLXVtTS1EWFdLT0tZYmJoT3VIUjdsNXpid2h2ZW1nbVA2RmNLTlljWm5odXZROFhvZjRVMUZtNmJPMVN5eDZlSW9FRWhPcDB0ZnNQcFA2WDVITEQzdWt2dkJ0ZTZGNS1zVFJUVzVDU3k5TFdyMmJldGh5NFhJaHdXRnU2cTB5ckxrZjY2QQ?oc=5"
      },
      {
        "name": "USGS",
        "href": "https://earthquake.usgs.gov/earthquakes/eventpage/us7000t0a3"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/peru-earthquake-magnitude.png",
      "alt": "Andean highland town of Cusco, Peru, set among high mountains",
      "credit": "W. Bulach / Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In February of 62 or 63 CE a violent earthquake shook the Bay of Naples, cracking Herculaneum, jolting Nuceria and Naples, and badly damaging Pompeii seventeen years before Vesuvius buried it. The Roman philosopher Seneca made this Campanian disaster the occasion of Book VI of his Naturales Quaestiones, where he catalogued the ruin, a flock of six hundred sheep killed, statues split, people driven out of their wits, and then turned from physical causes to the deeper human terror the trembling ground provokes. For Seneca an earthquake was uniquely dreadful because it robbed people of the one thing they trusted absolutely, the fixed and solid earth beneath them, forcing a Stoic reckoning with mortality and the limits of safety. The shallow magnitude 5.6 tremor now felt across Peru's central Andes belongs to that same ancient lineage of fear, in which a modest shudder of the ground reopens the oldest question of what, if anything, can be counted secure.",
        "excerpt": "We must seek solace for the anxious and dispel overmastering fear. For what can any one believe quite safe if the world itself is shaken, and its most solid parts totter to their fall? Where, indeed, can our fears have limit if the one thing immovably fixed, which upholds all other things in dependence on it, begins to rock, and the earth lose its chief characteristic, stability?",
        "source": "Seneca, Naturales Quaestiones, Book VI (\"On Earthquakes\"), trans. John Clarke, in Physical Science in the Time of Nero (London: Macmillan, 1910).",
        "href": "http://naturalesquaestiones.blogspot.com/2009/08/book-vi-tr-john-clarke.html"
      },
      {
        "category": "historical",
        "title": "On the night of 28 October 1746, at about half past ten, a colossal earthquake now estimated near magnitude 8.6 destroyed Lima, the capital of Spanish Peru, in three or four minutes and flattened the whole coast around it. Half an hour later a tsunami swept over the port of Callao, where a wave reported at some fifty feet left barely two hundred survivors out of roughly six thousand inhabitants. The catastrophe was chronicled in an eyewitness Spanish relation, translated into English and printed in London in 1748 as a warning and a wonder, and it forced Viceroy Manso de Velasco to plan a lower, wider, more quake-resistant city. That 1746 disaster remains the defining seismic memory of Peru's Andean and coastal heartland, the historical shadow behind every fresh tremor, including the shallow magnitude 5.6 quake that has just rattled the central highlands.",
        "excerpt": "The 1746 Lima–Callao earthquake struck the central Peruvian coast late on 28 October, levelling Lima in minutes and generating a tsunami that all but annihilated the port of Callao. A contemporary account, translated from the Spanish and published in London in 1748, described the ruined churches, the buried inhabitants and the terror of survivors who camped in open fields. It was the deadliest earthquake in Peru's recorded history before 1970 and reshaped how the viceregal capital was rebuilt.",
        "source": "Pedro Lozano, A True and Particular Relation of the Dreadful Earthquake which happen'd at Lima, the Capital of Peru, and the Neighbouring Port of Callao, on the 28th of October, 1746 (London, 1748).",
        "href": "https://archive.org/details/trueparticularre00loza"
      },
      {
        "category": "literary",
        "title": "Voltaire folded the real Lisbon earthquake of 1 November 1755, which killed tens of thousands and shattered Enlightenment optimism, into the fifth chapter of his 1759 satire Candide. His hero and the philosopher Pangloss arrive by sea just as the ground heaves, the harbour boils, buildings collapse and fires race through the streets, whereupon Pangloss keeps insisting that all is for the best in this best of all possible worlds. The scene made Lisbon the emblem of a universe whose blind natural violence mocks every tidy theodicy. Peru's own Andean quakes descend from the same indifferent geology Voltaire dramatized, and the latest shallow magnitude 5.6 tremor is a reminder that the earth still convulses without regard for human explanations.",
        "excerpt": "Scarcely had they reached the city, lamenting the death of their benefactor, when they felt the earth tremble under their feet. The sea swelled and foamed in the harbour, and beat to pieces the vessels riding at anchor. Whirlwinds of fire and ashes covered the streets and public places; houses fell, roofs were flung upon the pavements, and the pavements were scattered. Thirty thousand inhabitants of all ages and sexes were crushed under the ruins.",
        "source": "Voltaire, Candide, or Optimism (1759), Chapter V. Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/19942/19942-h/19942-h.htm",
        "image": {
          "src": "/covers/peru-earthquake-magnitude--a2.png",
          "alt": "Contemporary copper engraving of the 1755 Lisbon earthquake, showing collapsing buildings, fleeing crowds, and ships wrecked by the tsunami.",
          "credit": "Anonymous copper engraving, 1755. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The same Lisbon catastrophe drew from Voltaire a far bleaker work, his 1756 Poeme sur le desastre de Lisbonne, subtitled an examination of the axiom \"All is well.\" Against Leibniz and Pope he confronted the reader directly with the mangled dead, the child crushed beside its mother, and the marble that entombed the innocent, demanding how any benevolent order could be read from such ruin. The poem became a landmark in the philosophical crisis the earthquake provoked, treating seismic catastrophe not as divine message but as a scandal that reason could not sweeten. Its raw grief speaks to any community, the Peruvian Andes among them, that has learned to feel each tremor, including the recent magnitude 5.6 shock, as a question thrown back at heaven.",
        "excerpt": "Unhappy mortals! Dark and mourning earth!\nAffrighted gathering of human kind!\nEternal lingering of useless pain!\nCome, ye philosophers, who cry, \"All's well,\"\nAnd contemplate this ruin of a world.\nBehold these shreds and cinders of your race,\nThis child and mother heaped in common wreck,\nThese scattered limbs beneath the marble shafts—",
        "source": "Voltaire, \"Poem on the Lisbon Disaster\" (1756), trans. Joseph McCabe, in Toleration and Other Essays (New York & London: G. P. Putnam's Sons, 1912). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Toleration_and_other_essays/Poem_on_the_Lisbon_Disaster"
      },
      {
        "category": "artistic",
        "title": "Within months of the 1755 disaster, presses across Europe issued copper engravings of Lisbon's destruction, and one anonymous plate now held in the Museu da Cidade (Museum of Lisbon) became a defining image of the event. It shows the great Portuguese capital simultaneously burning and collapsing while a tsunami surges up the Tagus, swamping the wharves and capsizing ships crowded with people who had fled the shaking to the water's edge. Such prints, sold as news and as memento, fixed the earthquake in the visual imagination of the age as an all-consuming convergence of quake, fire and flood. It offers a vivid frame for reading Peru's seismic present, where the shallow magnitude 5.6 Andean tremor revives a centuries-old iconography of the earth turning against the cities built upon it.",
        "excerpt": "An anonymous 1755 copper engraving, held at the Museu da Cidade in Lisbon, depicts the city in ruins and flames as a tsunami wrecks ships and floods the harbour. It compresses the triple horror of the disaster, earthquake, fire and inundation, into a single dramatic sheet. Widely copied across Europe, such engravings shaped how the catastrophe was seen and remembered.",
        "source": "Anonymous, copper engraving showing the Lisbon earthquake of 1755, 1755. Museu da Cidade (Museum of Lisbon).",
        "href": "https://commons.wikimedia.org/wiki/File:1755_Lisbon_earthquake.jpg",
        "image": {
          "src": "/covers/peru-earthquake-magnitude--a4.png",
          "alt": "1755 copper engraving of the Lisbon earthquake: the city ablaze and in ruins while a tsunami wrecks ships in the harbour.",
          "credit": "Anonymous copper engraving, 1755. Museu da Cidade, Lisbon. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn composed The Seven Last Words of Our Saviour on the Cross in 1786 for the Good Friday liturgy in Cadiz, a set of slow instrumental meditations that he later arranged for string quartet as his Opus 51 (Hoboken III:50–56). After the seven contemplative sonatas, Haydn ends the work with a violent finale titled \"Il terremoto\", the earthquake, marked Presto e con tutta la forza, its hammering unison chords evoking the shaking of the ground and the rending of the temple veil at the moment of Christ's death. It is one of music's most literal depictions of seismic terror, turning the trembling earth into pure sound. Heard beside the shallow magnitude 5.6 quake in the Peruvian Andes, Haydn's terremoto captures how deeply the fear of the shaking earth is woven into art and worship alike.",
        "excerpt": "Haydn crowns The Seven Last Words with a short, ferocious movement he named \"Il terremoto\" (The Earthquake), directing that it be played Presto e con tutta la forza, as fast and as forcefully as possible. Pounding, dissonant chords and abrupt silences imitate the convulsion of the earth at the Crucifixion. It stands as a rare instrumental portrait of an earthquake, terror rendered entirely through rhythm and force.",
        "source": "Joseph Haydn, The Seven Last Words of Our Saviour on the Cross, string quartet version, Op. 51 (Hob. III:50–56), final movement \"Il terremoto\" (Presto e con tutta la forza), 1787. IMSLP.",
        "href": "https://imslp.org/wiki/The_Seven_Last_Words_of_Jesus_Christ,_Hob.III:50-56_(Haydn,_Joseph)"
      }
    ],
    "rank": 21
  },
  {
    "slug": "eu-border-system-ees-delays",
    "headline": "The EU's new biometric Entry/Exit System is nearly tripling passport-control times, an airport chief says",
    "overview": "The European Union's new digital Entry/Exit System, which requires non-EU travelers entering the Schengen area to register fingerprints and a facial photo, has nearly tripled the time it takes to clear passport control, the head of Rome's main airport told the BBC. Ryanair has warned of long queues at 15 European airports, with waits reaching up to five hours at peak times, and border police in Portugal reported software bugs. The European Commission said disruption is limited at most airports and pledged continued support as the system rolls out across 29 countries.",
    "genre": "Technology",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ckg5gg6n9x3o"
      },
      {
        "name": "European Commission",
        "href": "https://travel-europe.europa.eu/ees_en"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/eu-border-system-ees-delays.png",
      "alt": "Automated e-passport control gates at an airport immigration hall",
      "credit": "Zurich International Airport / Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In roughly 6 AD, after Rome annexed Judaea, Publius Sulpicius Quirinius, the governor of Syria, ordered a census of the new province so its people and property could be taxed. Such registrations were a machinery of empire: the Latin census enrolled every head of household, his family and his wealth onto official rolls, binding a person to a place and a fiscal obligation. The Gospel of Luke sets the Nativity against one such decree of Caesar Augustus, when the whole world was to be taxed and each traveler returned to his own city to be enrolled. To be counted was to be made legible to the state, and to travel was to travel toward a registration desk. The EU's Entry/Exit System revives that ancient logic in biometric form: before a non-EU traveler may pass, the frontier must first record who they are and log the crossing in the imperial ledger.",
        "excerpt": "And it came to pass in those days, that there went out a decree from Caesar Augustus that all the world should be taxed. (And this taxing was first made when Cyrenius was governor of Syria.) And all went to be taxed, every one into his own city.",
        "source": "The Gospel According to Saint Luke 2:1–3, King James Version (1611); text from the Project Gutenberg eBook of the King James Bible (eBook #10).",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "historical",
        "title": "The idea that a body could be turned into an unforgeable identity document matured in the late nineteenth century. In Paris in the 1880s the police clerk Alphonse Bertillon built the first scientific identification system, anthropometry, measuring arm span, head length and ear shape to pin each individual to a card in a vast criminal register. In 1892 the English scientist Francis Galton published Finger Prints, drawing on Sir William Herschel's use of inked hands in colonial Bengal to argue that the ridges of the fingertips were a permanent, individual signature. These techniques fixed identity to the body itself rather than to a name that could be changed or a paper that could be forged. When the EES captures a traveler's fingerprints and facial image at the border, it is the direct heir of Bertillon's card and Galton's inked ridge.",
        "excerpt": "They have the unique merit of retaining all their peculiarities unchanged throughout life, and afford in consequence an incomparably surer criterion of identity than any other bodily feature.",
        "source": "Francis Galton, Finger Prints (London: Macmillan and Co., 1892), Introductory chapter; Project Gutenberg eBook #36979.",
        "href": "https://www.gutenberg.org/cache/epub/36979/pg36979.txt"
      },
      {
        "category": "literary",
        "title": "In Franz Kafka's parable „Vor dem Gesetz“ (“Before the Law”), first published in 1915 and later set inside his novel Der Process, a man from the country arrives before the Law and asks to be let in. A doorkeeper (Türhüter) bars the entrance, saying he cannot grant admittance now, and hints at further, more terrible gatekeepers beyond. The man waits for years, bribing and pleading, growing old at the threshold he is never permitted to cross, until the door meant only for him is shut. Kafka turned the checkpoint into an image of power itself: authority that exists to inspect, to defer and to withhold passage. The traveler stalled in an EES queue, waiting to be registered before a gate that decides whether and when he may cross, stands in the doorkeeper's long shadow.",
        "excerpt": "Vor dem Gesetz steht ein Türhüter. Zu diesem Türhüter kommt ein Mann vom Lande und bittet um Eintritt in das Gesetz. Aber der Türhüter sagt, daß er ihm jetzt den Eintritt nicht gewähren könne.",
        "source": "Franz Kafka, „Vor dem Gesetz“ (1915), first printed in Selbstwehr, Jg. 9, Nr. 34; German text via Wikisource.",
        "href": "https://de.wikisource.org/wiki/Vor_dem_Gesetz"
      },
      {
        "category": "literary",
        "title": "The oldest border-control test in Western literature may be the one in the Book of Judges, chapter 12. After the Gileadites defeated the tribe of Ephraim, they seized the fords of the Jordan, the only crossing points, and turned them into checkpoints. Every man who tried to cross was challenged and made to say the word “Shibboleth”; the Ephraimites' dialect could not produce the sound, so they said “Sibboleth” and were killed on the spot, forty-two thousand in all. It is a chilling early instance of identity read off the body itself, a spoken biometric that decides who may pass a frontier. The EES swaps the pronounced password for a fingerprint and a facial scan, but the structure at the border is the same: an involuntary bodily trait, checked at the crossing, sorting those who may go over from those who may not.",
        "excerpt": "And the Gileadites took the passages of Jordan before the Ephraimites: and it was so, that when those Ephraimites which were escaped said, Let me go over; that the men of Gilead said unto him, Art thou an Ephraimite? If he said, Nay; Then said they unto him, Say now Shibboleth: and he said Sibboleth: for he could not frame to pronounce it right. Then they took him, and slew him at the passages of Jordan: and there fell at that time of the Ephraimites forty and two thousand.",
        "source": "The Book of Judges 12:5–6, King James Version (1611); text from the Project Gutenberg eBook of the King James Bible (eBook #10).",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder painted The Census at Bethlehem (also called The Numbering at Bethlehem) in 1566; it hangs today in the Royal Museums of Fine Arts of Belgium in Brussels. He transplants Luke's Roman census into a snow-covered Flemish village, where a crowd presses around a tax-collector's window in the wall of an inn while clerks work with their ledgers and coins. Mary on her donkey and Joseph with his carpenter's saw are almost lost among the more than a hundred ordinary people summoned to be registered. Painted while the Netherlands chafed under the taxes and administration of Habsburg Spain, the scene is quietly political: the census as an everyday act of bureaucratic control. The knot of travelers queuing at that registration window is the direct visual ancestor of today's crowds bunched at an EES kiosk, waiting to be entered into the record.",
        "excerpt": "At the centre of the panel a crowd presses against the window of an inn where officials sit with their account books; a man tallies coins while villagers wait in the trampled snow. Mary in her blue cloak rides a donkey led by Joseph, both nearly anonymous among the scores of figures Bruegel scatters across the frozen village. The painting turns a sacred story into a scene of ordinary administration: the counting of common people at a bureaucratic window.",
        "source": "Pieter Bruegel the Elder, The Census at Bethlehem, 1566, oil on panel, Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Numbering_at_Bethlehem_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/eu-border-system-ees-delays--a4.png",
          "alt": "Snow-covered Flemish village with a crowd of peasants gathered at an inn window to be registered for a census.",
          "credit": "Pieter Bruegel the Elder, The Census at Bethlehem (1566), Royal Museums of Fine Arts of Belgium; via Wikimedia Commons / Google Art Project (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "The Flemish painter Marinus van Reymerswaele made Two Tax Gatherers (also called The Tax Collectors) around 1540; a version hangs in the National Gallery, London. Two officials in extravagant sixteenth-century dress hunch over a table piled with coins, an open ledger and a long parchment roll on which taxable names and sums are meticulously recorded. One writes into the account book while the other stares out, and the whole picture is a satire on greed and the cold machinery of fiscal record-keeping. It distils the essence of bureaucracy: the human being reduced to an entry in a register. The EES is exactly such a ledger updated for the digital age, its rolls now made of fingerprints and facial templates rather than ink and parchment, but still the tabulation of everyone who crosses.",
        "excerpt": "Two richly dressed officials lean over a cluttered table where a ledger lies open beside stacks of coins and a lettered parchment roll. One clerk enters figures into the account book with a quill while the other, cap askew, fixes the viewer with a sidelong look. Reymerswaele makes the paperwork itself the subject: the register, the roll and the counted coin.",
        "source": "Marinus van Reymerswaele, Two Tax Gatherers (The Tax Collectors), c. 1540, oil on oak panel, National Gallery, London.",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_Claesz._van_Reymerswaele_005.jpg",
        "image": {
          "src": "/covers/eu-border-system-ees-delays--a5.png",
          "alt": "Two sixteenth-century tax collectors in elaborate dress bent over a table of coins, an open ledger and a written parchment roll.",
          "credit": "Marinus van Reymerswaele, Two Tax Gatherers (c. 1540), National Gallery, London; via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "caspian-pipeline-oil-tankers-drones",
    "headline": "The Caspian Pipeline Consortium halts oil loadings after Ukrainian drones strike Black Sea tankers",
    "overview": "The Caspian Pipeline Consortium suspended crude loadings at its Black Sea terminal near Novorossiysk after Ukrainian drone attacks struck oil tankers, the consortium said, as Kyiv widened its campaign against Russian energy exports. The CPC carries roughly 80 percent of Kazakhstan's oil exports, and the disruption threatens a significant flow of crude to world markets. The strikes mark a sharpening phase of the war in the Black and Azov seas, where both sides have increasingly targeted shipping.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxNQjFsc1o5b28zLW5TaGc1eWFHWmJfLUpxOGZnOGRRV1BYNm9SYWlKZU9qN3ozSG42cmRBU2p1MHJQN1JvbEpyd1JOc2pCMmNqY0pUbWJMdDhyQVRUYzFSNjBQakhXRl83VkhoX0VuSm1PeDRVRlhIRENBWG9CLW52MVBxQWhaTnllMllDUXZuQmwzTnRhYU5hMmxMSXI1bWlkeGp3dHFweFRGRi1fTjk1UXotT3k0NGdKM2VEc2FIanNuelIzaTF0QWRB?oc=5"
      },
      {
        "name": "The Maritime Executive",
        "href": "https://maritime-executive.com/article/cpc-shuts-down-export-loadings-after-attack-on-spm-buoy"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/caspian-pipeline-oil-tankers-drones.png",
      "alt": "An oil tanker ship at anchor at sea near a harbour",
      "credit": "Clusteringcoefficient / Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 405 BC, in the narrow waters of the Hellespont, the Spartan admiral Lysander destroyed the Athenian fleet at Aegospotami, capturing scores of triremes as they lay drawn up on the beach opposite Lampsacus. That strait was the jugular of Athens, for through it passed the grain ships from the Black Sea on which the city's survival depended. With the fleet gone, Lysander held the chokepoint and blockaded the Piraeus, letting hunger finish the war; within months a starving Athens surrendered and saw its Long Walls torn down. Xenophon records that when word of the disaster reached the city, a wail of grief swept up from the harbour through every street. The Caspian Pipeline Consortium's halt follows the same ancient logic: seize or sever the sea-lane that carries an enemy's lifeblood, and you need not defeat him on land.",
        "excerpt": "It was night when the \"Paralus\" reached Athens with her evil tidings, on\nreceipt of which a bitter wail of woe broke forth. From Piraeus, following\nthe line of the long walls up to the heart of the city, it swept and\nswelled, as each man to his neighbour passed on the news. On that night no\nman slept.",
        "source": "Xenophon, Hellenica, Book II.ii, trans. Henry Graham Dakyns (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm"
      },
      {
        "category": "historical",
        "title": "In the first months of 1942, Admiral Karl Doenitz launched Operation Paukenschlag ('Drumbeat'), sending U-boats to hunt off the United States' Atlantic seaboard in what German crews called the 'Second Happy Time.' Silhouetted against the lights of un-blacked-out coastal cities, oil tankers were torpedoed within sight of American beaches: the tanker SS R. P. Resor was set ablaze off New Jersey on 28 February 1942 and burned for days. The U-boats aimed not at warships but at the oil and cargo that fed the Allied war machine, sinking hundreds of merchantmen and nearly severing the fuel arteries of the war. The episode proved that modern conflict is won or lost along the tanker routes. The Black Sea drone strikes on Caspian-linked tankers repeat that calculus, attacking the vessels that carry crude and bleeding an enemy's economy far from any front line.",
        "excerpt": "In the opening months of 1942 German U-boats sank huge numbers of oil tankers and merchant ships along the U.S. eastern seaboard, often close enough to shore that fires from burning tankers were visible from the beaches, aiming to cut the flow of oil and cargo sustaining the Allied war effort.",
        "source": "Operation Drumbeat (Unternehmen Paukenschlag) / the 'Second Happy Time,' Wikipedia (modern factual context).",
        "href": "https://en.wikipedia.org/wiki/Operation_Drumbeat",
        "image": {
          "src": "/covers/caspian-pipeline-oil-tankers-drones--a1.png",
          "alt": "The oil tanker SS R. P. Resor engulfed in flames after being torpedoed off the coast of New Jersey on 28 February 1942.",
          "credit": "SS R. P. Resor ablaze after being torpedoed, 28 February 1942. Wide World / U.S. Library of Congress, Prints and Photographs Division (cph.3b45438). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book XVI of Homer's Iliad, the Trojans under Hector fight their way to the beached Greek ships and hurl fire onto the vessel by the stern of Protesilaus, the flames leaping up the hull. For the Achaeans the ships are everything: burn them and the whole army is stranded on a hostile shore with no way home. The sight of the blaze at last moves Achilles to send Patroclus into battle to drive the fire back and save the fleet. Homer treats the burning of ships as the ultimate catastrophe, the moment a war turns on the destruction of the means of movement and supply. The drones that set Black Sea tankers alight tap the same primal image: fire at the waterline as the decisive stroke of a war.",
        "excerpt": "And now, tell me, O Muses that hold your mansions on Olympus, how\nfire was thrown upon the ships of the Achaeans. Hector came close up\nand let drive with his great sword at the ashen spear of Ajax. ... Therefore he drew back, and\nthe Trojans flung fire upon the ship which was at once wrapped in\nflame.",
        "source": "Homer, The Iliad, Book XVI, trans. Samuel Butler (Wikisource).",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XVI"
      },
      {
        "category": "literary",
        "title": "Byron's 1814 verse tale The Corsair opens with the pirate Conrad and his band celebrating their dominion over the sea-lanes, living by plunder taken from passing ships across the Aegean and the Levant. The poem sold some ten thousand copies on its first day and fixed the romantic image of the sea-raider who makes the trade routes his hunting ground. Its corsairs embody the old practice of the guerre de course, war waged not on fleets but on commerce, the seizing and burning of merchantmen for profit and power. Byron's exulting 'wild life in tumult' upon the 'dark blue sea' is, stripped of its glamour, the poetry of commerce raiding. Ukrainian drones striking tankers to choke a rival's oil exports are the modern, unromantic heirs of Conrad's raiders.",
        "excerpt": "\"O'er the glad waters of the dark blue sea,\nOur thoughts as boundless, and our souls as free,\nFar as the breeze can bear, the billows foam,\nSurvey our empire, and behold our home!\nThese are our realms, no limits to their sway—\nOur flag the sceptre all who meet obey.",
        "source": "Lord Byron, The Corsair (1814), Canto I, in The Works of Lord Byron, Vol. III, ed. E. H. Coleridge (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/21811/21811-h/21811-h.htm"
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg's oil painting The Battle of the Nile (1800), now in the Tate, depicts the climactic moment of 1 August 1798 in Aboukir Bay, when Nelson's fleet cornered the French and the 120-gun flagship L'Orient caught fire and blew apart. The whole canvas is lit by the orange glare of the exploding ship, its light cast across the water and over the drowning men in the foreground. When first exhibited in London the picture was itself dramatically lit by firelight to heighten the horror of the blast. It stands among art's most famous images of a warship set ablaze, the destruction of a fleet rendered as terrible spectacle. The burning tankers of the Black Sea belong to the same visual tradition: a great vessel turned into a pillar of fire on the open sea.",
        "excerpt": "The painting captures the instant the French flagship L'Orient explodes at the Battle of the Nile, its detonation the sole source of light in the nocturnal scene as debris and men are hurled into the water. De Loutherbourg exhibited the work in 1799 at Robert Bowyer's Historic Gallery in London, where it was illuminated by firelight to intensify the sense of a ship consumed by flame.",
        "source": "Philip James de Loutherbourg, The Battle of the Nile (1800), oil on canvas, Tate, London.",
        "href": "https://en.wikipedia.org/wiki/The_Battle_of_the_Nile_(painting)",
        "image": {
          "src": "/covers/caspian-pipeline-oil-tankers-drones--a4.png",
          "alt": "Night naval battle lit by the fiery explosion of the French flagship L'Orient, with ships and drowning sailors around the blast.",
          "credit": "Philip James de Loutherbourg, The Battle of the Nile (1800), Tate. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Claude Debussy composed La Mer, his three symphonic sketches for orchestra, between 1903 and 1905, publishing the score in Paris in 1905. Rather than staging a naval battle, it paints the sea itself in sound: its calms at dawn, the play of its waves, and in the finale a roaring 'Dialogue of the wind and the sea.' Debussy, who said the sea had always fascinated him, caught both its beauty and its menace, the vast indifferent element on which all shipping lies at the mercy of wind and water. The work is a reminder that the sea-lanes are never truly safe, only quiet for a while. As drones turn Black Sea shipping into a battleground, Debussy's music evokes the element on which the world's oil so precariously rides.",
        "excerpt": "De l'aube à midi sur la mer\nJeux de vagues\nDialogue du vent et de la mer",
        "source": "Claude Debussy, La mer, CD 111 (1905), the three movement titles of the published orchestral score (IMSLP).",
        "href": "https://imslp.org/wiki/La_mer_(Debussy,_Claude)"
      }
    ],
    "rank": 23
  },
  {
    "slug": "world-cup-2030-stadiums",
    "headline": "Dezeen publishes a guide to the stadiums that will host the 2030 World Cup across Spain, Portugal and Morocco",
    "overview": "As the 2026 World Cup final is played, the design magazine Dezeen released a guide to the venues chosen for the 2030 edition, which FIFA will stage across Spain, Portugal and Morocco, with Spain providing the largest share of stadiums. The centenary tournament will open with three commemorative matches in Uruguay, Argentina and Paraguay, where the first World Cup was held in 1930. The lineup spans historic grounds and new arenas, extending a debate over the stadium as monument and civic space.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/19/2030-world-cup-stadiums-future-stadium/"
      },
      {
        "name": "Olympics.com",
        "href": "https://www.olympics.com/en/news/fifa-world-cup-2030-stadiums-spain-portugal-morocco-list"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/world-cup-2030-stadiums.png",
      "alt": "The Santiago Bernabeu stadium, home of Real Madrid in Spain",
      "credit": "Carlos Delgado / Wikimedia Commons, CC BY-SA 3.0"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome's Flavian Amphitheatre, the Colosseum, rose from the drained lake of Nero's Golden House: begun under the emperor Vespasian around AD 72 and completed by his son Titus, who inaugurated it in AD 80 with a hundred days of games. Built of travertine, tufa, and brick-faced concrete, its elliptical bowl seated an estimated fifty thousand spectators, who were sorted by rank and admitted through eighty numbered entrance arches. The historian Cassius Dio and the poet Martial both recorded the opening spectacles of wild-beast hunts, gladiatorial combats, and even a naval battle staged in the flooded arena. For centuries it was the largest amphitheatre ever built and the enduring model for the civic arena as an instrument of imperial spectacle. Dezeen's survey of the 2030 World Cup grounds inherits this ancient equation of the stadium with the state: a vast engineered bowl that both stages mass entertainment and stands as a monument to the power that raised it.",
        "excerpt": "The Flavian Amphitheatre was commissioned around AD 72 under Vespasian and inaugurated by Titus in AD 80 with a hundred days of games. Roughly 189 by 156 metres in plan, it could hold tens of thousands of spectators, admitted and seated by rank through eighty arched entrances. It remains the largest amphitheatre ever built and the archetype of the arena as monumental civic architecture.",
        "source": "Colosseum (Flavian Amphitheatre), Rome, inaugurated AD 80 — encyclopedic entry.",
        "href": "https://en.wikipedia.org/wiki/Colosseum",
        "image": {
          "src": "/covers/world-cup-2030-stadiums--a0.png",
          "alt": "The Roman Colosseum seen from the north-east, its tiered travertine arcades partly ruined.",
          "credit": "Photograph by David Iliff (Diliff), CC BY-SA 2.5, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "When Athens hosted the first modern Olympic Games in 1896, the events were staged in the Panathenaic Stadium, a marble horseshoe on the site of an ancient running track first laid out around 330 BC and rebuilt in Pentelic marble by the Roman magnate Herodes Atticus in AD 144. Long stripped of its stone and buried, the stadium was excavated and reconstructed in gleaming white marble at the expense of the Greek benefactor Georgios Averoff, seating some fifty thousand people for the revived Games. Its popular name, Kallimarmaro (\"beautifully marbled\"), fused deep antiquity with a new spectacle of international sport. The project deliberately rebuilt an ancient arena in order to inaugurate a modern global festival, making the stadium a bridge between classical monument and the twentieth-century mega-event. The 2030 World Cup venues across Spain, Portugal, and Morocco continue that lineage, presenting the stadium as a civic showpiece and a nation's calling card on the world stage.",
        "excerpt": "The Panathenaic Stadium occupies the site of an ancient stadium of about 330 BC, monumentalised in marble by Herodes Atticus in AD 144. Excavated and rebuilt in Pentelic marble with funds from Georgios Averoff, it hosted the opening and closing ceremonies and several events of the 1896 Olympic Games, the first of the modern era. It is often called Kallimarmaro, \"the beautifully marbled\" stadium.",
        "source": "Panathenaic Stadium (Kallimarmaro), Athens, host of the 1896 Olympic Games — encyclopedic entry.",
        "href": "https://en.wikipedia.org/wiki/Panathenaic_Stadium",
        "image": {
          "src": "/covers/world-cup-2030-stadiums--a1.png",
          "alt": "Panoramic view of the marble horseshoe of the Panathenaic Stadium in Athens.",
          "credit": "Photograph by Vangelisb, CC BY-SA 3.0, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Roman poet Martial marked the opening of the Colosseum around AD 80 with his Liber de Spectaculis, a book of epigrams celebrating the new amphitheatre and its games. Its first poem ranks the building above the seven wonders of the ancient world: the pyramids of Memphis, the walls of Babylon, the temple of Artemis, the altar at Delos, and the Mausoleum at Halicarnassus are all said to yield to Caesar's amphitheatre. The claim that fame will henceforth speak of this one work in place of all reframes the arena as the supreme achievement of imperial building. Written for the very crowd that filled its tiers, the epigram treats the stadium as both spectacle and enduring monument. Dezeen's framing of the 2030 stadiums as monuments and civic spaces echoes Martial's ancient boast that the great arena outshines every other wonder its age can name.",
        "excerpt": "Barbara pyramidum sileat miracula Memphis,\n     Assyrius iactet nec Babylona labor;\nnec Triuiae templo molles laudentur Iones,\n     dissimulet Delon cornibus ara frequens\naere nec uacuo pendentia Mausolea\n     laudibus inmodicis Cares in astra ferant.\nOmnis Caesareo cedit labor Amphitheatro,\n     unum pro cunctis fama loquetur opus.",
        "source": "Martial, Liber de Spectaculis (Book of Spectacles), Epigram 1, c. AD 80 — Latin text.",
        "href": "https://thelatinlibrary.com/martial/mart.spec.shtml"
      },
      {
        "category": "literary",
        "title": "In the fourth canto of Childe Harold's Pilgrimage (1818), Lord Byron stood among the moonlit ruins of the Colosseum and made the arena an emblem of Rome's endurance and decay. Quoting a prophecy he attributed to Anglo-Saxon pilgrims, he bound the fate of the amphitheatre to the fate of the city and of the world itself. By Byron's day the structure was a roofless, ivy-grown shell, yet it remained the most eloquent monument to the ancient capacity to build for the crowd. His lines transform the stadium from a place of games into a measure of civilizational permanence. As a design magazine now casts the 2030 World Cup stadiums as lasting civic monuments, Byron's verse is a reminder that such arenas are built to outlive the spectacles they house.",
        "excerpt": "   'While stands the Coliseum, Rome shall stand;\n   When falls the Coliseum, Rome shall fall;\n   And when Rome falls--the World.'  From our own land\n   Thus spake the pilgrims o'er this mighty wall\n   In Saxon times, which we are wont to call\n   Ancient; and these three mortal things are still\n   On their foundations, and unaltered all;\n   Rome and her Ruin past Redemption's skill,\nThe World, the same wide den--of thieves, or what ye will.",
        "source": "Lord Byron, Childe Harold's Pilgrimage, Canto IV, stanza CXLV (1818).",
        "href": "https://www.gutenberg.org/cache/epub/5131/pg5131.txt"
      },
      {
        "category": "artistic",
        "title": "Giovanni Battista Piranesi, the Venetian architect and printmaker, etched the Colosseum around 1748 for his celebrated series Vedute di Roma (Views of Rome). His dramatic, deeply shadowed view exaggerates the amphitheatre's scale, dwarfing the tiny figures who wander among its broken arcades and towering ruined tiers. Sold to travellers on the Grand Tour, such prints fixed the image of the Roman arena as the supreme symbol of monumental architecture across Europe. Piranesi's Colosseum is at once a ruin and a demonstration of what building for the multitude could achieve. His vision of the arena as an awe-inducing civic colossus anticipates the very register in which Dezeen presents the 2030 World Cup stadiums as monuments meant to overwhelm and to endure.",
        "excerpt": "Piranesi's etching from the Vedute di Roma renders the Colosseum from a low, oblique angle, its curved travertine arcades looming over minute human figures. Strong contrasts of light and deep shadow heighten the sense of vast, decaying scale. Printed in large numbers for Grand Tour visitors, the view became one of the most influential images of the arena as monumental architecture.",
        "source": "Giovanni Battista Piranesi, Veduta dell'Anfiteatro Flavio detto il Colosseo, etching from Vedute di Roma, c. 1748; National Gallery of Art, Washington (CC0).",
        "href": "https://commons.wikimedia.org/wiki/File:Giovanni_Battista_Piranesi,_Anfiteatro_Flavio_detto_il_Colosseo,_1748,_NGA_125670.jpg",
        "image": {
          "src": "/covers/world-cup-2030-stadiums--a4.png",
          "alt": "Piranesi's etched view of the ruined Colosseum, its arcades towering over tiny figures.",
          "credit": "Giovanni Battista Piranesi, Vedute di Roma, c. 1748. National Gallery of Art, Washington (CC0), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The American landscape painter Thomas Cole, founder of the Hudson River School, painted Interior of the Colosseum, Rome in 1832 after sketching the monument during his travels in Italy. His oil canvas looks up through the shattered, plant-draped arcades toward the open sky, with small figures and a wayside shrine set against the immense curved walls. Cole, who would soon paint his cycle The Course of Empire, read the ruined arena as a meditation on the rise and fall of civilizations and the vanity of monumental ambition. The picture presents the stadium as a sublime, half-natural ruin that humbles the human figure before it. Its vision of the great arena as both triumph and memento mori shadows any celebration of new stadiums, including the 2030 World Cup venues Dezeen surveys as civic monuments for their own age.",
        "excerpt": "Cole's canvas views the Colosseum from within, gazing up through tiers of broken, vegetation-choked arches to the sky. Diminutive figures and a small altar at the base emphasise the overwhelming scale of the ruined arena. Painted in 1832, it treats the ancient stadium as a sublime monument to imperial grandeur and its decay.",
        "source": "Thomas Cole, Interior of the Colosseum, Rome, oil on canvas, 1832; Albany Institute of History & Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Cole_Thomas_Interior_of_the_Colosseum_Rome_1832.jpg",
        "image": {
          "src": "/covers/world-cup-2030-stadiums--a5.png",
          "alt": "Thomas Cole's 1832 painting looking up through the ruined interior arcades of the Colosseum toward the sky.",
          "credit": "Thomas Cole, Interior of the Colosseum, Rome, 1832. Albany Institute of History & Art, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "japan-gion-festival-floats",
    "headline": "Kyoto's centuries-old Gion Matsuri fills the streets with towering wooden floats",
    "overview": "Kyoto is marking Gion Matsuri, one of Japan's oldest and largest festivals, whose July processions send enormous Yamaboko floats rolling through the city. The festival, held since the ninth century as a Shinto rite to ward off plague and purify the city, features hoko floats that rise as high as 25 meters and are assembled without nails, using only traditional joinery and rope. Its float parades draw crowds to the ancient capital each summer.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxPWktLalZHVE1hVnJLdkpqeVIxeGFqM011dFQ4TTRiVl9rTXlReW5fdW1zS3VwbUl6bzNYekVpM0NQNkd3M1NQeVNzYWVEM3Y2N3ozeWdJRnlOLXBPajczb21rZVlaTk1tVGNkcE5uUE5COHN0SkdjaldXUzEwbUJTNHNhZjZ5TWExdUN4VjJGLWdDbGNVZDJSYjkxblBHZjFYeGc?oc=5"
      },
      {
        "name": "Wikipedia",
        "href": "https://en.wikipedia.org/wiki/Gion_Matsuri"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/japan-gion-festival-floats.png",
      "alt": "A towering Yamaboko float paraded through the streets during Kyoto's Gion Matsuri festival",
      "credit": "Edomura no Tokuzo / Wikimedia Commons, CC BY-SA 4.0"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In classical Athens the Great Panathenaea, reorganized around 566 BCE and held every fourth year, drew the whole city into a single sacred column that wound from the Dipylon gate through the Kerameikos and up to the Acropolis. Citizens marched in ranks with cavalry, sacrificial oxen, baskets of offerings, and a newly woven saffron peplos for Athena, which in the grand years was rigged like a sail on a wheeled ship-cart carried through the streets. Thucydides records that the festival was the one day the marshalled citizens could assemble in arms without suspicion, so central was the procession to civic life, and it was in its very staging, in the Kerameikos, that Hipparchus was assassinated in 514 BCE. Like Kyoto's Gion Matsuri, it fused religion, civic order, and spectacle into a communal march that a whole city rehearsed and remembered. Both cultures answered a god's claim on the town with an ordered procession and a sacred vehicle rolled through the streets.",
        "excerpt": "they only waited for the great feast of the Panathenaea, the sole day upon which the citizens forming part of the procession could meet together in arms without suspicion.\nAt last the festival arrived; and Hippias with his bodyguard was outside the city in the Ceramicus, arranging how the different parts of the procession were to proceed.",
        "source": "Thucydides, History of the Peloponnesian War, VI.56–57, trans. Richard Crawley (London, 1874).",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
        "image": {
          "src": "/covers/japan-gion-festival-floats--a0.png",
          "alt": "Marble relief of mounted horsemen in the cavalcade from the Parthenon frieze, depicting the Panathenaic procession.",
          "credit": "Cavalcade from the Parthenon frieze (5th century BCE), British Museum. Photo by Claire H., CC BY-SA 2.0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In late-medieval England the feast of Corpus Christi and Whitsun became occasions for towns such as York and Chester to stage cycles of biblical plays on wheeled pageant wagons hauled from station to station through the streets. Each craft guild owned and financed its own two-storey wagon, dressing below and performing above, so that the sacred story rolled past every quarter of the city in turn over one or more days. The antiquary Robert Rogers, whose account survives in the Harleian Miscellany, described the Chester wagons beginning at the abbey gates and being wheeled to the high cross before the mayor and on to every street. This was a civic-religious procession in which the community's trades, wealth, and piety were literally built into moving structures. Kyoto's Yamaboko floats, likewise owned and maintained by neighborhood associations and pulled through the city as an act of shared devotion, belong to the same enduring impulse.",
        "excerpt": "The manner of these plays were, every company had his pageant or part, a high scaffold with two rooms, a higher and a lower, upon four wheels. In the lower they apparelled themselves, and in the higher room they played, being all open on the top, that all beholders might hear and see them.\nThey began first at the abbey gates, and when the first pageant was played, it was wheeled to the high cross before the mayor, and so to every street.",
        "source": "Robert Rogers' account of the Chester plays, quoted in Ernest Rhys (ed.), Everyman, with Other Interludes, Introduction (Everyman's Library, 1909).",
        "href": "https://www.gutenberg.org/files/19481/19481-h/19481-h.htm"
      },
      {
        "category": "literary",
        "title": "In the first century BCE the Roman poet Lucretius, in Book II of his De Rerum Natura, paused his atomic philosophy to describe the procession of the Great Mother, Cybele, whose turret-crowned image was borne with solemn awe through many a mighty land. He pictures her lion-drawn car, the clashing cymbals and tambourines of the Galli, and the crowds that scattered rose petals as the divine image passed, blessing the people in mute salutation. The passage is one of antiquity's most vivid literary records of a sacred effigy carried on a wheeled vehicle through the streets of great cities as an act of communal reverence. That is precisely the logic of Kyoto's Gion Matsuri, where towering Yamaboko are drawn through the city to honor the divine and safeguard the community. Across two millennia the same image recurs: a god made present, set on wheels, and paraded before the whole town.",
        "excerpt": "With turret-crown the summit of her head,\nSince, fortressed in her goodly strongholds high,\n'Tis she sustains the cities; now, adorned\nWith that same token, to-day is carried forth,\nWith solemn awe through many a mighty land,\nThe image of that mother, the divine.",
        "source": "Lucretius, Of the Nature of Things (De Rerum Natura), Book II, trans. William Ellery Leonard (1916).",
        "href": "https://www.gutenberg.org/cache/epub/785/pg785.txt"
      },
      {
        "category": "literary",
        "title": "Sophocles' tragedy Oedipus the King, first staged in Athens around 429 BCE, opens on a city gripped by plague: the people of Thebes gather as suppliants at the palace altars, carrying olive branches wreathed with wool while incense, prayers, and cries of woe fill the streets. The play dramatizes a community turning to ritual and supplication to lift a pestilence, staging the ancient conviction that collective sacred action could turn back disease. This is exactly the origin of Kyoto's Gion Matsuri, begun in 869 CE as a goryo-e rite to placate the gods and drive out an epidemic ravaging the capital. Where Thebes sends up incense and litanies, Kyoto sends its purifying floats through the streets. Both are a whole city's answer to plague, expressed as ordered, sacred communal performance.",
        "excerpt": "My children, latest born to Cadmus old,\nWhy sit ye here as suppliants, in your hands\nBranches of olive filleted with wool?\nWhat means this reek of incense everywhere,\nAnd everywhere laments and litanies?\nChildren, it were not meet that I should learn\nFrom others, and am hither come, myself,\nI Oedipus, your world-renowned king.",
        "source": "Sophocles, Oedipus the King (Oedipus Tyrannus), lines 1–8, trans. F. Storr (Loeb Classical Library, 1912).",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm"
      },
      {
        "category": "artistic",
        "title": "Utagawa Hiroshige's color woodblock print \"Sannō Festival Procession at Kōjimachi Itchōme,\" made in 1856 for the series One Hundred Famous Views of Edo, captures the great Sannō Matsuri as its floats enter the shogun's castle at the heart of Edo. In the foreground rises a towering float crowned with an ornamental rooster perched on a legendary Chinese drum, while a monkey float recedes into the distance and crowds throng the street. The Sannō procession numbered more than fifty tall, lavishly decorated floats, one of the few festivals permitted to pass inside the castle gates. Hiroshige's print is a direct pictorial cousin of the Gion Matsuri: a Japanese townscape organized entirely around the passage of enormous festival floats through the city. It shows how deeply the parade of the sacred float is woven into Japan's own civic and artistic imagination.",
        "excerpt": "Utagawa Hiroshige (1797–1858) devoted one of the finest sheets of his last great series to a festival procession, depicting the giant floats of the Sannō Matsuri as they crowd the Kōjimachi quarter. A gilded rooster on a drum tops the nearest float while spectators press in on every side. The print survives as a vivid public-domain record of an Edo-period float festival closely akin to Kyoto's Gion Matsuri.",
        "source": "Utagawa Hiroshige, \"Sannō Festival Procession at Kōjimachi Itchōme,\" from One Hundred Famous Views of Edo, 1856, color woodblock print.",
        "href": "https://commons.wikimedia.org/wiki/File:100_views_edo_065.jpg",
        "image": {
          "src": "/covers/japan-gion-festival-floats--a4.png",
          "alt": "Japanese woodblock print of the Sannō festival, showing a tall float topped by an ornamental rooster on a drum moving through a crowded Edo street.",
          "credit": "Utagawa Hiroshige, One Hundred Famous Views of Edo (1856). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gentile Bellini's monumental canvas \"Procession in St. Mark's Square,\" painted in 1496 for the Scuola Grande di San Giovanni Evangelista, records a Corpus Christi–day procession of the confraternity's relic of the True Cross across the great piazza before the basilica of San Marco. Ranks of white-robed brothers bearing candles file beneath a golden canopy, framed by the mosaicked facade of the church and the assembled citizenry of Venice in meticulous documentary detail. The painting monumentalizes exactly the kind of ordered civic-religious procession that binds a city to its patron saint and sacred objects. It is the European counterpart to the Gion Matsuri's stately column of floats and celebrants moving through Kyoto. Both make the point that a procession is a city portraying itself to itself, its faith, its order, and its continuity paraded through public space.",
        "excerpt": "Gentile Bellini's tempera-and-oil canvas, over seven meters wide, shows the confraternity of San Giovanni Evangelista carrying its relic of the True Cross in procession across the Piazza San Marco on Corpus Christi day. The basilica's façade and hundreds of individually observed Venetians form the backdrop to the ordered ranks of candle-bearing brothers. It is one of the Renaissance's grandest depictions of a communal religious procession through a city's central square.",
        "source": "Gentile Bellini, Procession in St. Mark's Square (Processione in piazza San Marco), 1496, tempera and oil on canvas, Gallerie dell'Accademia, Venice.",
        "href": "https://commons.wikimedia.org/wiki/File:Teleri_della_scuola_di_san_giovanni_ev.,_Gentile_Bellini,_Processione_in_piazza_San_Marco_(1496)_01.JPG",
        "image": {
          "src": "/covers/japan-gion-festival-floats--a5.png",
          "alt": "Renaissance painting of a religious procession of white-robed brothers with candles crossing the Piazza San Marco before the basilica of Venice.",
          "credit": "Gentile Bellini, Procession in St. Mark's Square (1496), Gallerie dell'Accademia, Venice. Photo by Sailko, CC BY-SA 3.0, via Wikimedia Commons."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "western-europe-heatwave",
    "headline": "A blocking heat dome grips Western Europe, fueling wildfires across the Iberian Peninsula and southern France",
    "overview": "A stubborn high-pressure system has locked scorching heat over Western Europe, pushing temperatures in parts of Spain, Portugal and southern France into the low-to-mid 40s Celsius and fanning wildfires across the region. The heat has strained power grids and public-health systems during one of the hottest summers on record, after Europe logged its warmest June ever. Forecasters and the World Meteorological Organization warn that such extremes are being intensified by human-driven climate change.",
    "genre": "Climate",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxQb1JxTEllMHdPcll4UE44T2lsT2VkWV94Zmh6bDVVMmVmMEJHTHBoOFg5cVowc2RtSHR3VGoyR2tJYVFlWlNWZTlkbnNTUWJLV0JMbG5kM1FXdVU2Zmd6T0p2aDV3V0hJUjUzWm1xOTB1MHp1cG0yVm15TXpVc3RLTG1XU3R2UHE5TnJNR0N2MA?oc=5"
      },
      {
        "name": "WMO",
        "href": "https://wmo.int/media/news/records-fall-extreme-heat-grips-europe"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-19",
    "image": {
      "src": "/covers/western-europe-heatwave.png",
      "alt": "Large flames sweeping through a forest during a wildfire",
      "credit": "Karen Murphy / U.S. Fish and Wildlife Service. Public domain, via Wikimedia Commons"
    },
    "edition": "Morning Edition · 19 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1540 Central and Western Europe endured what chroniclers called the greatest drought in living memory: from February to September barely any rain fell, and in Zurich it reportedly did not rain a full day or night for seven months. Summer temperatures probably climbed above 40 degrees Celsius, the Rhine at Basel and Cologne shrank to roughly a tenth of its normal autumn flow, and Lake Constance dropped so low that Roman coins surfaced on its dry bed. Town fires were more frequent that year than in any peaceful year since AD 1000, with smoke drifting from Switzerland to Krakow, and the town of Einbeck burned to the ground on 26 July, killing hundreds. Springs, vines, fruit and hay failed across the north, and a dysentery epidemic later dubbed the 'Big Death' may have claimed around 800,000 lives in Central Europe. Today's blocking heat dome over Iberia and southern France, with rainless skies, readings above 40 degrees Celsius and fire consuming the land, revives the same continental-scale scorching that 1540 first burned into Europe's memory.",
        "excerpt": "In 1540 much of Europe saw only about a quarter of its normal annual precipitation, and estimated annual temperatures ran about 2.4 degrees Celsius above the 1961-1990 baseline, the warmest year between 1500 and 1999. City fires in German territory were more frequent that year than in any peaceful year since AD 1000, with smoke reported from Switzerland to Krakow.",
        "source": "1540 European drought, Wikipedia (drawing on O. Wetter et al., 'The year-long unprecedented European heat and drought of 1540', Climatic Change, 2014).",
        "href": "https://en.wikipedia.org/wiki/1540_European_drought"
      },
      {
        "category": "historical",
        "title": "The summer of 1911 brought one of the most punishing heatwaves on record to Britain and northwestern Europe: an official drought was declared by 20 July after twenty rainless days, and the exceptional heat stretched roughly two and a half months into mid-September. On 9 August the temperature reached 36.7 degrees Celsius at Raunds in Northamptonshire and at Canterbury, a British record that stood for 79 years, while asphalt melted on the roads and wells and water supplies ran dry. Newspapers such as The Times ran daily 'Deaths by heat' columns as fatalities mounted, 5,000 dock workers struck against the intolerable conditions, pastures withered and milk prices rose. The same stalled anticyclonic heat gripped much of France and the near Continent through the summer. That jammed high-pressure pattern of 1911, like today's blocking dome over Spain, Portugal and southern France, shows how a stuck summer atmosphere can bake a whole region for months on end.",
        "excerpt": "The 1911 heatwave saw an official drought declared by 20 July after twenty days without rain, and it persisted about two and a half months into mid-September. The peak reading of 36.7 degrees Celsius on 9 August 1911, recorded at Raunds and Canterbury, remained the British record for 79 years, as wells ran dry, asphalt melted, and newspapers ran 'Deaths by heat' columns.",
        "source": "1911 United Kingdom heat wave, Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/1911_United_Kingdom_heat_wave"
      },
      {
        "category": "literary",
        "title": "In Book II of Ovid's Metamorphoses (composed around 8 AD), Phaethon, son of the Sun, extracts his father's rash promise and seizes the reins of the solar chariot, only to lose control and drive it down toward the earth. The world ignites: crops and forests burn, great cities perish with their walls, mountains from Cilician Taurus and Etna to the Alps and Apennines blaze, and the great rivers, among them the Nile, Rhine, Rhone, Po and Tiber, dry up or flee their beds. Ovid turns cosmic misrule into a vision of the whole land scorched by a sun torn out of its proper course. His image of an unbalanced sky setting continents alight uncannily anticipates how a stalled heat dome now turns Iberia's forests into fuel and pushes its rivers toward their limits.",
        "excerpt": "they crack in chasms. The grass is blighted; trees\nare burnt up with their leaves; the ripe brown crops\ngive fuel for self destruction—Oh what small\ncomplaints! Great cities perish with their walls,\nand peopled nations are consumed to dust—\nthe forests and the mountains are destroyed.",
        "source": "Ovid, Metamorphoses, Book 2 (Phaethon), trans. Brookes More (Boston: Cornhill, 1922), via Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2:card=201"
      },
      {
        "category": "literary",
        "title": "Around 700 BC the Greek poet Hesiod, in Works and Days, marked the peak of summer by the rising of Sirius, the Dog Star, whose fierce heat he says parches head and knees so that the skin is dry. In that wearisome season the cicada shrills from the trees, the flocks are fattest but men grow feeblest, and the farmer is told to retreat to a shady rock, curds and watered wine until the star relents. Hesiod hands down the oldest European name for the deadly core of summer, the 'dog days', when sun and Sirius together were felt as a bodily assault. That parched, enervating heat is exactly the languor now settling over southern Europe as the heat dome drives thermometers into the mid-40s Celsius.",
        "excerpt": "the chirping grass-hopper sits in a tree and pours down his shrill song continually from under his wings in the season of wearisome heat, then goats are plumpest and wine sweetest; women are most wanton, but men are feeblest, because Sirius parches head and knees and the skin is dry through heat.",
        "source": "Hesiod, Works and Days, ll. 582-588, trans. Hugh G. Evelyn-White (Loeb / Harvard University Press, 1914), via Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0132:card=571"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens painted The Fall of Phaeton around 1604-1605, reworking it about 1606-1608; it now hangs in the National Gallery of Art in Washington. The canvas seizes the very instant Ovid describes: Phaethon and the Sun's chariot tumble out of the sky as the maddened horses scatter, the female Hours recoil in terror, and lightning tears through roiling cloud. Rubens makes the sky itself a furnace, the earth about to be set ablaze by a sun wrenched from its course, a Baroque emblem of solar catastrophe and fire loosed upon the world. Its vision of a heaven turned destroyer mirrors today's sense of a sky gone hostile over a burning Mediterranean summer.",
        "excerpt": "The Fall of Phaeton, painted by Peter Paul Rubens about 1604-1605 and later reworked, depicts the mythical moment when the sun-chariot plunges earthward and threatens to burn the world. Rubens fills the sky with panicked horses, recoiling figures of the Hours, and lightning, staging heat and fire as cosmic disaster. The work is in the public domain and hangs in the National Gallery of Art, Washington.",
        "source": "Peter Paul Rubens, The Fall of Phaeton, c. 1604-1605 (reworked c. 1606-1608), oil on canvas, National Gallery of Art, Washington, D.C.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/western-europe-heatwave--a4.png",
          "alt": "Baroque painting of Phaethon and the Sun's chariot plunging from the sky amid panicked horses, recoiling figures and storm clouds.",
          "credit": "Peter Paul Rubens, The Fall of Phaeton (c. 1604-1605), National Gallery of Art, Washington. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Antonio Vivaldi's Summer (L'estate) is the second of The Four Seasons violin concertos, published in 1725 as part of his Op. 8, and it is prefaced by a sonnet describing the season's oppressive heat. The opening lines, 'Sotto dura Staggion dal Sole accesa / Langue l'huom, langue 'l gregge, ed arde il Pino', tell how under a harsh season fired by the sun man languishes, the flock languishes and the pine burns. Vivaldi's music paints first the enervating stillness of the heat, the cuckoo and turtledove, and then the violent thunderstorm that breaks over the parched fields. That double portrait of scorching languor and sudden destructive storm echoes today's heat dome over Western Europe, where blazing drought and the threat of fire hang over the land until the weather violently breaks.",
        "excerpt": "Sotto dura Staggion dal Sole accesa\nLangue l' huom, langue 'l gregge, ed arde il Pino",
        "source": "Antonio Vivaldi, Le quattro stagioni, No. 2 in G minor 'L'estate' (RV 315), Op. 8, published 1725; prefatory sonnet.",
        "href": "https://en.wikipedia.org/wiki/L%27estate"
      }
    ],
    "rank": 26
  },
  {
    "slug": "iran-jordan-attack-us-troops-killed",
    "headline": "Two U.S. troops are killed and one is missing after an Iranian missile and drone attack on forces in Jordan",
    "overview": "U.S. Central Command said two American service members were killed and one remains missing after Iranian ballistic missile and drone attacks on U.S. and partner forces in Jordan, with four others wounded and later discharged. The deaths raise the U.S. toll in the war with Iran to 16 as a preliminary ceasefire has collapsed, Washington has reimposed a blockade of Iranian ports, and Tehran has declared the Strait of Hormuz closed. Iran's supreme leader, Mojtaba Khamenei, said the U.S. president's signature was 'worthless' and warned of further escalation.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQbS1jN0tZcUtrbk9GU3RKeUxqTHM1Qk5DUDF1VDBVOUVqaVp4QV8xWGhEMmtFV3JRRDc1SXlxalZwcElvUlBXQk13R1NPdW91eUFNRF9UT3JRM3ZHTC03a2ZaZmg0Z2tJdXdCRjVMUml0eWtTSWFLU2U5WGxIMHBNSG1hb2dTS3VLak0zVXdZdHhKY1duRml2MW9Ea0xxVlU?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cn8nynv8ze8o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/iran-jordan-attack-us-troops-killed.png",
      "alt": "A Patriot air-defense missile streaks skyward from its launcher during a live firing.",
      "credit": "U.S. Department of Defense. Public domain, via Wikimedia Commons."
    },
    "lead": true,
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 53 BC the Roman commander Crassus led some 40,000 legionaries deep into Mesopotamia against the Parthian Empire, the Iranian power of antiquity. On the parched plain of Carrhae, Parthian horse-archers wheeled out of range and buried the massed Romans under an unending rain of arrows; when Crassus sent his son Publius to break the encirclement, Publius was cut off and killed, and the enemy paraded his severed head on a spear before his father's eyes. Perhaps twenty thousand Romans died in the dust, bewailing an inglorious death, and the disaster opened centuries of ruinous war between Rome and the East. Like the American service members killed in Jordan by Iranian missiles and drones, Carrhae is the archetype of soldiers dying on distant eastern soil under the projectile weapons of an Iranian power, an outpost catastrophe that dragged two nations into open and lasting war.",
        "excerpt": "But here, where the inequality of the ground raised one man above another, and lifted every man who was behind another into greater prominence, there was no such thing as escape, but they were all alike hit with arrows, bewailing their inglorious and ineffectual death. ... Then the Parthians cut off the head of Publius, and rode off at once to attack Crassus.",
        "source": "Plutarch, Life of Crassus 25, trans. Bernadotte Perrin (Loeb Classical Library, 1916); on the Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter=25",
        "image": {
          "src": "/covers/iran-jordan-attack-us-troops-killed--a0.png",
          "alt": "Engraving of the death of Crassus amid falling Roman soldiers at the Battle of Carrhae.",
          "credit": "Death of Crassus at the Battle of Carrhae, engraving from Cassell's Illustrated Universal History, vol. 3, 1882. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On the morning of October 23, 1983, a truck laden with explosives equivalent to some 12,000 pounds of TNT drove into the U.S. Marine barracks at Beirut International Airport and detonated, lifting the four-story building off its foundations before it collapsed on the men sleeping inside. Two hundred forty-one American service members were killed, the Marine Corps' deadliest single day since Iwo Jima. Investigators tied the bombing to Iran-backed operatives, and a U.S. intelligence intercept captured Iranian officials directing their embassy in Damascus to take 'spectacular action against the American Marines' days before the blast. Like the troops killed in Jordan, these were Americans deployed to a far-off Middle Eastern mission and struck down by Iran-linked violence, a nation once again grieving soldiers who fell in an undeclared shadow war.",
        "excerpt": "On October 23, 1983, a truck bomb destroyed the U.S. Marine barracks in Beirut, killing 241 American service members. A federal court later found Iran's Ministry of Information and Security and its proxies responsible, and a September 1983 intercept showed Iranian intelligence directing 'spectacular action against the American Marines.' It remained the deadliest day for the Marine Corps since the Battle of Iwo Jima.",
        "source": "1983 Beirut barracks bombings (U.S. Marine Corps and federal court records, summarized).",
        "href": "https://en.wikipedia.org/wiki/1983_Beirut_barracks_bombings",
        "image": {
          "src": "/covers/iran-jordan-attack-us-troops-killed--a1.png",
          "alt": "Column of smoke rising over Beirut after the explosion that destroyed the U.S. Marine barracks, October 23, 1983.",
          "credit": "U.S. Marine Corps photograph of the Beirut barracks explosion, October 23, 1983. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the fourth book of the Iliad, Homer pauses the clamor of the whole army to mark a single death: young Simoisius, born by the river Simois, struck down by the great spear of Ajax as he strode among the front rank. Homer likens the falling youth to a smooth poplar felled in a marsh, and grieves that he never lived to repay his parents for the care of his rearing, his life cut brief. The passage is the epic's tenderness toward the individual soldier lost in a mass of anonymous slaughter. It rhymes exactly with the American dead in Jordan: young lives cut short far from home, struck down among their comrades, unable ever to return to the families who raised them.",
        "excerpt": "Then Telamonian Aias smote Anthemion's son, the lusty youth Simoeisius, whom on a time his mother had born beside the banks of Simois, as she journeyed down from Ida, whither she had followed with her parents to see their flocks. For this cause they called him Simoeisius; yet paid he not back to his dear parents the recompense of his upbringing, and but brief was the span of his life, for that he was laid low by the spear of great-souled Aias. For, as he strode amid the foremost, he was smitten on the right breast beside the nipple; and clean through his shoulder went the spear of bronze, and he fell to the ground in the dust like a poplar tree.",
        "source": "Homer, Iliad, Book 4, trans. A. T. Murray (Loeb Classical Library, 1924); on the Perseus Digital Library.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=4:card=473"
      },
      {
        "category": "literary",
        "title": "Laurence Binyon wrote 'For the Fallen' in September 1914, weeks into the First World War, sitting on the Cornish cliffs as the first British casualty lists came home from the retreat at Mons. Its central stanzas became the Ode of Remembrance, recited every year at war memorials across the Commonwealth: the soldiers who went with songs to the battle and fell with their faces to the foe, who shall grow not old as the living grow old. Binyon fixes the paradox of the war dead, forever young, forever remembered at the going down of the sun. For the two Americans killed in Jordan and the sixteen now lost in the war with Iran, it is the language a nation reaches for when it must grieve the fallen and vow to remember them.",
        "excerpt": "They went with songs to the battle, they were young,\nStraight of limb, true of eye, steady and aglow.\nThey were staunch to the end against odds uncounted;\nThey fell with their faces to the foe.\n\nThey shall grow not old, as we that are left grow old,\nAge shall not weary them, nor the years condemn.\nAt the going down of the sun and in the morning\nWe will remember them.",
        "source": "Laurence Binyon, 'For the Fallen,' first published in The Times, 21 September 1914; text on Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Times/1914/Arts/For_the_Fallen"
      },
      {
        "category": "artistic",
        "title": "Benjamin West's 1770 painting The Death of General Wolfe shows the British commander James Wolfe expiring on the Plains of Abraham at Quebec, cradled in the arms of grieving officers as a runner sprints in with news of victory too late to reach him. West scandalized the academy by dressing his figures in contemporary uniforms rather than classical robes, insisting a modern soldier's death deserved the grandeur of history painting, and he composed the scene as a secular lamentation over a fallen leader, a pietà in a red coat. It became the defining image of the soldier who dies far from home in the moment of his country's triumph. Its hushed circle of mourners around the dying man mirrors the grief now gathering around American service members killed on distant ground in Jordan.",
        "excerpt": "West arranges a ring of soldiers, officers, and a Native scout around the pale, dying general, a composition consciously echoing a Lamentation over the dead Christ. The whole picture is built to make the viewer mourn a single fallen soldier as a figure of sacrifice, elevating a death on foreign soil into an object of national reverence.",
        "source": "Benjamin West, The Death of General Wolfe, 1770, oil on canvas; National Gallery of Canada, Ottawa.",
        "href": "https://commons.wikimedia.org/wiki/File:Benjamin_West_005.jpg",
        "image": {
          "src": "/covers/iran-jordan-attack-us-troops-killed--a4.png",
          "alt": "Painting of General Wolfe dying on the battlefield, surrounded by mourning officers and soldiers.",
          "credit": "Benjamin West, The Death of General Wolfe, 1770; National Gallery of Canada, Ottawa. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Maurice Ravel composed Le Tombeau de Couperin between 1914 and 1917 while the First World War consumed the friends of his youth, and he dedicated each of its six movements to the memory of a comrade killed at the front, from Lieutenant Jacques Charlot to the brothers Pierre and Pascal Gaudin killed by the same shell. Rather than write a dirge, Ravel cast the memorial as a bright baroque dance suite, and when a critic complained it was too gay for the dead he replied that the dead are sad enough in their eternal silence. The elegance of the music becomes its grief, each graceful movement a headstone bearing a fallen friend's name. It is a model of how art transmutes the loss of soldiers into remembrance, fitting for a moment when America counts its own war dead and searches for how to hold them.",
        "excerpt": "Le Tombeau de Couperin is a memorial in the guise of a dance suite: its Prelude, Fugue, Forlane, Rigaudon, Menuet, and Toccata are each inscribed to a friend of Ravel's who died in the First World War. The music's poised, luminous grace, rather than any funeral solemnity, carries the weight of mourning for the fallen.",
        "source": "Maurice Ravel, Le Tombeau de Couperin (1914-1917); score on IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Le_tombeau_de_Couperin_(Ravel,_Maurice)",
        "image": {
          "src": "/covers/iran-jordan-attack-us-troops-killed--a5.png",
          "alt": "Photographic portrait of the composer Maurice Ravel, circa 1925.",
          "credit": "Maurice Ravel, photographed c. 1925. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 27
  },
  {
    "slug": "hungary-president-sulyok-stands-down",
    "headline": "Hungary's president, Tamas Sulyok, agrees to step down after parliament forces a constitutional amendment",
    "overview": "Hungarian President Tamas Sulyok signed a constitutional amendment that ends his presidency at midnight on Sunday, bowing to a law that Prime Minister Peter Magyar's Tisza party pushed through parliament to oust him. Sulyok, widely seen as a loyalist of former prime minister Viktor Orban, accused the government of violating the rule of law and called the change a 'breaking point in Hungarian constitutional democracy.' Orban, whose party lost power in April after 16 years, denounced the amendment as an act of tyranny.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiogFBVV95cUxNRExvZWZaR0NUN0NMcHg1UTR0TnMwWC1aYlhTcW9XamNiSHVxU1JFa1pMMnc0cWkxNEdGVS1rU2F3Ui04YjFjUmtlaXEyTXdFVmtwYkZmbmdsdFJqSVg2TzNuZlJ2Nnc3cWtwenB0SGdTWlZfUWhIYlRTWTdEcV9QcjRVblBmT293YlZoZW5PdW5rczMwZVFROERVdVFkbmZWX2c?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cpd7q7eev7po"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/hungary-president-sulyok-stands-down.png",
      "alt": "The Hungarian Parliament Building on the bank of the Danube in Budapest.",
      "credit": "Ercsaba74 / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 509 BC, according to Livy, the Romans rose against their last king, Lucius Tarquinius Superbus. Roused by Lucius Junius Brutus, the assembled people voted to strip the king of his authority and pass an act of banishment against him; the city gates were shut in his face and the monarchy itself was abolished, replaced by two annually elected consuls. A single legal act ended a reign and remade the constitution of the state. Like Tamas Sulyok, a ruler tied to the old order was cast out not by the sword but by a formal vote of a new sovereign majority, which then rebuilt the offices of power in its own image.",
        "excerpt": "he persuaded the multitude, already incensed, to deprive the king of his authority, and to order the banishment of L. Tarquin with his wife and children... The gates were shut against Tarquin, and an act of banishment passed against him; the deliverer of the state the camp received with great joy, and the king's sons were expelled... Lucius Tarquin the Proud reigned twenty-five years: the regal form of government continued from the building of the city to this period of its deliverance, two hundred and forty-four years. Two consuls, viz. Lucius Junius Brutus and Lucius Tarquinius Collatinus, were elected by the prefect of the city at the comitia by centuries, according to the commentaries of Servius Tullius.",
        "source": "Livy, History of Rome, Book I.59-60 (trans. D. Spillan)",
        "href": "https://www.gutenberg.org/cache/epub/19725/pg19725.txt"
      },
      {
        "category": "historical",
        "title": "On August 9, 1974, facing near-certain impeachment by a Congress that had turned against him over Watergate, U.S. President Richard Nixon signed a one-sentence letter resigning the office he had won by landslide two years earlier. It was a peaceful but coerced departure: the legislature's power to remove had made his position untenable, and he left rather than be stripped of office by trial. The transfer of power was orderly, yet everyone understood it was compelled. As with Sulyok, a head of state surrendered his office to the constitutional machinery of a hostile majority, framing a legal removal as the price the rule of law exacted from him.",
        "excerpt": "Dear Mr. Secretary: I hereby resign the Office of President of the United States. Sincerely, Richard Nixon",
        "source": "Letter of Resignation of Richard M. Nixon, August 9, 1974 (U.S. National Archives)",
        "href": "https://www.archives.gov/exhibits/american_originals/nixon2.html",
        "image": {
          "src": "/covers/hungary-president-sulyok-stands-down--a1.png",
          "alt": "Nixon's typed one-sentence resignation letter with his signature, dated August 9, 1974",
          "credit": "Letter of Resignation of Richard M. Nixon, 1974. U.S. National Archives and Records Administration, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Richard II, the deposed king is brought before Parliament and made to hand his crown to Henry Bolingbroke. In the great deposition scene he performs his own unmaking line by line, giving away the weight from his head, the sceptre from his hand, and his decrees and statutes, until he is 'unking'd Richard.' The passage turns a raw seizure of power into a ritual of self-abdication, staged for a triumphant new regime. Sulyok's forced signing of the amendment that ended his own presidency echoes Richard's bitter, ceremonial surrender: a ruler compelled to undo himself with his own hand while calling the act a wound to the very order that anointed him.",
        "excerpt": "Now mark me how I will undo myself:\nI give this heavy weight from off my head,\nAnd this unwieldy sceptre from my hand,\nThe pride of kingly sway from out my heart;\nWith mine own tears I wash away my balm,\nWith mine own hands I give away my crown,\nWith mine own tongue deny my sacred state,\nWith mine own breath release all duteous rites:\nAll pomp and majesty I do forswear;\nMy manors, rents, revenues, I forgo;\nMy acts, decrees, and statutes I deny:\nGod pardon all oaths that are broke to me!\nGod keep all vows unbroke are made to thee!\nMake me, that nothing have, with nothing griev'd,\nAnd thou with all pleas'd, that hast all achiev'd!\nLong mayst thou live in Richard's seat to sit,\nAnd soon lie Richard in an earthy pit!\nGod save King Henry, unking'd Richard says,\nAnd send him many years of sunshine days!",
        "source": "William Shakespeare, Richard II, Act IV, Scene 1 (Yale edition, 1921)",
        "href": "https://en.wikisource.org/wiki/Richard_II_(1921)_Yale/Text/Act_IV"
      },
      {
        "category": "literary",
        "title": "In Boethius's sixth-century Consolation of Philosophy, written while its author awaited execution after falling from imperial favor, Fortune herself speaks in her own defense. She insists that raising the low and casting down the mighty is simply the game she never ceases to play, turning her wheel without apology, and points to toppled kings like Croesus and Perseus as proof that no throne is exempt. The overthrow of kingdoms, she says, is the very stuff of tragedy. Sulyok's abrupt fall from the presidency, on the heels of Orban's party losing power after sixteen years, is exactly this turning of the wheel: those who mounted high must not think it a hardship to come down when the rules of the game require it.",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it... What else do tragedies make such woeful outcry over save the overthrow of kingdoms by the indiscriminate strokes of Fortune?",
        "source": "Boethius, The Consolation of Philosophy, Book II (trans. H. R. James)",
        "href": "https://www.gutenberg.org/cache/epub/14328/pg14328.txt"
      },
      {
        "category": "artistic",
        "title": "Paul Delaroche's 1840 painting 'Napoleon I at Fontainebleau on 31 March 1814' shows the emperor slumped in a chair, boots muddy, hat fallen to the floor, staring into ruin at the moment his cause has collapsed. Within days the French Senate would formally decree his deposition and he would abdicate, the towering ruler undone not on a battlefield but by an act of the legislature and the desertion of his own establishment. Delaroche captures the private desolation behind a public fall from supreme power. The image mirrors Sulyok's position at the story's center: a figure of the old regime, isolated and stripped of office, contemplating the abrupt end of an era of dominance.",
        "excerpt": "Delaroche paints the deposed emperor alone in a bare room, his body sagging with exhaustion and defeat, the discarded hat and disordered dress signaling collapsed majesty. The face is inward and stricken, all command drained away. It is a portrait not of battle but of the silent instant when supreme power slips irrecoverably from a ruler's hands.",
        "source": "Paul Delaroche, Napoleon I at Fontainebleau on 31 March 1814 (1840), Musée de l'Armée, Paris",
        "href": "https://www.napoleon.org/en/history-of-the-two-empires/paintings/napoleon-i-at-fontainebleau-31-march-1814/",
        "image": {
          "src": "/covers/hungary-president-sulyok-stands-down--a4.png",
          "alt": "Napoleon sitting dejected in a chair at Fontainebleau, hat on the floor, after his defeat",
          "credit": "Paul Delaroche, Napoleon I at Fontainebleau on 31 March 1814 (1840), Musée de l'Armée, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Handel's 1739 oratorio 'Saul' dramatizes the ruin of Israel's first king, the anointed sovereign whom God rejects in favor of the young David. Consumed by jealousy as his rival's star rises, Saul clings to a throne that divine favor has already withdrawn, and the work builds toward his downfall and the solemn 'Dead March' over his corpse. It is a study of a legitimate ruler displaced when authority passes to the ascendant successor, the old order giving way to the new. Rembrandt's brooding painting of Saul and David captures the same jealous, doomed king; together they echo Sulyok's fate as a loyalist of a fallen power, pushed aside as a triumphant new leadership takes command.",
        "excerpt": "Handel's oratorio traces the reigning king's slide from glory into jealousy and collapse as favor shifts to his rival, culminating in the grave, tolling music of the 'Dead March' that mourns a fallen monarch. The score sets a ruler's downfall as high tragedy, the anointed head of state undone as power visibly transfers to his successor. Rembrandt's paired image renders the same brooding, displaced king wiping away a tear as the young harpist plays.",
        "source": "George Frideric Handel, Saul, HWV 53 (1739); image: Rembrandt, Saul and David (c. 1651-58), Mauritshuis",
        "href": "https://imslp.org/wiki/Saul,_HWV_53_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/hungary-president-sulyok-stands-down--a5.png",
          "alt": "Rembrandt's painting of a brooding King Saul wiping his eye with a curtain while David plays the harp",
          "credit": "Rembrandt van Rijn, Saul and David (c. 1651-58), Mauritshuis, The Hague, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "germany-spahn-surrogacy-resignation",
    "headline": "German coalition leader Jens Spahn resigns over his use of a U.S. surrogate to have a child",
    "overview": "Jens Spahn, parliamentary group leader of Germany's governing Christian Democrats and a former health minister, resigned after facing accusations of hypocrisy over having a child through a surrogate mother in the United States. Surrogacy is banned in Germany, a policy his CDU party and Spahn himself had previously backed, though raising a child born to a surrogate abroad is legal. Chancellor Friedrich Merz called the decision 'right' and 'inevitable,' saying 'credibility is the highest asset in politics.'",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQRVpqcGdjVlJvaUlMRXJLd1Y4dFBoamtNV2Y3WHZ5aXBJS29tY2F6a1NWRHl2OE9hM2lXeF9SRk5CNzlWeVpuRVAzYWprU25MRGdUTHVCS29vNWRacWJ5Nk53Qy1wMTF5M005Ri1OOVI2MzBlS19JdnJ0NjRmdTdhTnBBMDl1cmQweHdPWThXVDZWcGhfUGtqS1l6dHVNMGM5YlRRU1IyWXBER2FzbndyRlM4VQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cq56e9n1ddzo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/germany-spahn-surrogacy-resignation.png",
      "alt": "German Christian Democrat politician Jens Spahn.",
      "credit": "Olaf Kosinsky / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In Nero's Rome, the Stoic philosopher Seneca was revered as the age's great moral teacher, a man who filled his essays with praise of poverty, self-denial, and indifference to riches. Yet within four years at court he had amassed a fortune of three hundred million sesterces, and in 58 AD the veteran senator Publius Suillius rose in public to demand by what philosophy a preacher of simplicity had grown so colossally rich. The charge that stuck was not fraud but hypocrisy: the moralist who did not live his own maxims. Like Jens Spahn, whose party made a virtue of banning surrogacy while he quietly used one abroad, Seneca embodies the oldest political vulnerability of all, the gap between the doctrine a man teaches in public and the life he leads in private.",
        "excerpt": "By what kind of wisdom or maxims of philosophy had Seneca within four years of royal favour amassed three hundred million sesterces? At Rome the wills of the childless were, so to say, caught in his snare while Italy and the provinces were drained by a boundless usury. His own money, on the other hand, had been acquired by industry and was not excessive.",
        "source": "Tacitus, Annals, Book XIII.42 (trans. Church & Brodribb)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_13",
        "image": {
          "src": "/covers/germany-spahn-surrogacy-resignation--a0.png",
          "alt": "Ancient Roman double herm showing the clean-shaven Stoic philosopher Seneca the Younger joined back-to-back with a bearded Socrates.",
          "credit": "Double Herm of Socrates and Seneca, Antikensammlung, Berlin; photograph via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Eliot Spitzer built his entire public identity as New York's crusading attorney general, the self-styled 'Sheriff of Wall Street' who prosecuted prostitution rings and even signed a 2007 law lengthening the jail term for men who patronized prostitutes. In March 2008, a federal wiretap revealed that Spitzer, by then governor, had himself paid more than eighty thousand dollars to a high-end escort agency; within days he resigned. The scandal detonated not because prostitution was exotic but because he had personally enforced the very rule he was breaking. Spitzer is the modern template for Spahn: the official undone not by the act itself but by the exact contradiction between the standard he imposed on others and the exemption he claimed for himself.",
        "excerpt": "The crusading prosecutor who had made his name policing the sins of others was caught paying a premium escort service, and the wiretap transcripts turned his righteous public brand into a punchline overnight. He had signed a law stiffening penalties for men who did exactly what he was doing, and that symmetry, more than the sex, forced his resignation. His downfall became shorthand for the moralist hoisted on his own statute.",
        "source": "Eliot Spitzer prostitution scandal (2008), contemporaneous reporting",
        "href": "https://en.wikipedia.org/wiki/Eliot_Spitzer_prostitution_scandal",
        "image": {
          "src": "/covers/germany-spahn-surrogacy-resignation--a1.png",
          "alt": "Portrait photograph of Eliot Spitzer speaking, dark suit and tie, during his tenure as a New York official.",
          "credit": "Eliot Spitzer; photograph via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Molière's 1664 comedy Tartuffe is the definitive stage portrait of the pious fraud: a man who cloaks naked appetite for money and a married woman beneath ostentatious displays of devotion, and who very nearly ruins the household that took him in. In this speech the level-headed Cléante warns Orgon not to confuse the mask of virtue with the face of it, distinguishing counterfeit sanctity from the real thing as sharply as counterfeit from honest coin. The play was so threatening to the devout establishment of its day that it was banned for years. Spahn, a leader of a party that draped the surrogacy ban in the language of moral principle, stands accused of exactly Cléante's charge: wearing the honoured mask while quietly living otherwise.",
        "excerpt": "What! Will you find no difference between\nHypocrisy and genuine devoutness?\nAnd will you treat them both alike, and pay\nThe self-same honour both to masks and faces\nSet artifice beside sincerity,\nConfuse the semblance with reality,\nEsteem a phantom like a living person,\nAnd counterfeit as good as honest coin?\nMen, for the most part, are strange creatures, truly!",
        "source": "Molière, Tartuffe; or, The Hypocrite, Act I (trans. Curtis Hidden Page, 1908)",
        "href": "https://www.gutenberg.org/cache/epub/2027/pg2027-images.html"
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Measure for Measure, the deputy Angelo is installed as Vienna's rigid enforcer of morality, reviving a dead law that condemns a young man to death for fornication. Then Isabella, the condemned man's chaste sister, comes to plead for mercy, and the puritan discovers to his horror that he lusts after her precisely because she is virtuous. In this soliloquy he watches his own austere self-image collapse in real time, appalled that the strictest judge is himself the sinner. Angelo is the archetype Spahn now inhabits: the public moralist who enforces a prohibition on others while, in private, the same human desire he condemned proves stronger than the principle he preached.",
        "excerpt": "What's this, what's this? Is this her fault or mine?\nThe tempter or the tempted, who sins most? Ha!\nNot she; nor doth she tempt: but it is I\nThat, lying by the violet in the sun,\nDo as the carrion does, not as the flower,\nCorrupt with virtuous season. Can it be\nThat modesty may more betray our sense\nThan woman's lightness? Having waste ground enough,\nShall we desire to raze the sanctuary,\nAnd pitch our evils there? O, fie, fie, fie!\nWhat dost thou, or what art thou, Angelo?\nDost thou desire her foully for those things\nThat make her good?",
        "source": "William Shakespeare, Measure for Measure, Act II, Scene 2",
        "href": "https://www.gutenberg.org/files/23045/23045-h/23045-h.htm"
      },
      {
        "category": "artistic",
        "title": "William Hogarth's 1762 engraving Credulity, Superstition, and Fanaticism crams a church interior with a ranting preacher, swooning worshippers, and dangling puppet-idols, a ferocious satire of religious 'enthusiasm' as theatre and fraud. A thermometer of faith, witches, and grotesque props expose the sanctimony on display as pure performance, the outward show of piety with nothing true beneath it. Hogarth strips the mask from public godliness exactly as Cléante does in Tartuffe, indicting the manufacture of moral display. It reads as a period emblem for the Spahn affair: a governing party that wrapped a ban in the vestments of Christian moral seriousness, and a leader whose private conduct made the display look like just that, a display.",
        "excerpt": "A cavernous church swarms with a preacher whipping his flock into hysteria, worshippers clutching idols and fainting in the pews, every gauge and prop of piety turned into stagecraft. Hogarth loads the frame with instruments that measure faith like fever, so that devotion registers as spectacle rather than substance. The whole scene is an anatomy of sanctimony exposed as show.",
        "source": "William Hogarth, Credulity, Superstition, and Fanaticism, engraving, 1762",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Credulity,_Superstition,_and_Fanaticism.png",
        "image": {
          "src": "/covers/germany-spahn-surrogacy-resignation--a4.png",
          "alt": "Crowded 18th-century satirical engraving of a church where a preacher incites a frenzied congregation clutching idols and swooning amid grotesque props.",
          "credit": "William Hogarth, Credulity, Superstition, and Fanaticism (1762); via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart's 1787 opera Don Giovanni dramatizes a nobleman of boundless private appetite who refuses every summons to repent, until the stone statue of a man he wronged arrives at his table and drags him down to hell. Max Slevogt's electric 1912 portrait known as 'The Red d'Andrade' captures the singer Francisco d'Andrade mid-defiance in that final reckoning, sword and cape flung out against the dark. The opera is the archetypal fable of a public man whose private conduct collides, catastrophically, with the moral order he flouts, the clash between personal pleasure and duty resolved by a fall. It maps onto Spahn's undoing, where a private choice pursued abroad became the pivot on which a public career toppled and 'credibility,' as Chancellor Merz put it, revealed itself as the highest asset a politician holds.",
        "excerpt": "Slevogt paints the baritone as Don Giovanni caught in the graveyard confrontation, body torqued in theatrical defiance, red-lined cape slashing across a shadowed stage. The brushwork is loose and headlong, all motion and bravado on the very brink of the reckoning that will pull the libertine down. It freezes the instant when private license finally meets public judgment.",
        "source": "W. A. Mozart, Don Giovanni, K.527 (1787); painting by Max Slevogt (1912)",
        "href": "https://imslp.org/wiki/Don_Giovanni,_K.527_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/germany-spahn-surrogacy-resignation--a5.png",
          "alt": "Loosely painted 1912 portrait of baritone Francisco d'Andrade costumed as Don Giovanni, cape flying, in a dramatic defiant pose on a darkened stage.",
          "credit": "Max Slevogt, Francisco d'Andrade as Don Giovanni ('The Red d'Andrade'), 1912, Alte Nationalgalerie, Berlin; via Wikimedia Commons."
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "laos-methanol-tourist-deaths-ruling",
    "headline": "Laos says it cannot determine a cause for six tourist deaths from methanol-tainted alcohol in Vang Vieng",
    "overview": "Laos's Ministry of Public Security said it could not establish blame or cause for the November 2024 deaths of six foreign tourists linked to methanol-laced alcohol in Vang Vieng, because no autopsies were conducted on the bodies. The victims, a Briton, two Australians, two Danes and an American, died after a night out; a distillery owner faces charges for selling harmful products and operating illegally, but not for the deaths. Australia summoned the Laotian ambassador, saying it was 'deeply frustrated and bitterly disappointed' that more serious charges were not pursued.",
    "genre": "Culture",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdx8rj99endo"
      },
      {
        "name": "CP24",
        "href": "https://www.cp24.com/news/world/2026/07/18/laos-tourists-authorities-cannot-determine-if-deaths-linked-to-tainted-alcohol/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/laos-methanol-tourist-deaths-ruling.png",
      "alt": "The karst mountains and Nam Song river at Vang Vieng, Laos.",
      "credit": "Jialiang Gao / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the autumn of 1858 a Bradford stallholder known as \"Humbug Billy\" sold peppermint humbugs that a druggist's fatal error had sweetened with arsenic trioxide instead of harmless powdered gypsum. Around twenty people, many of them children, died in agony and more than two hundred more were poisoned. The druggist, his assistant and the sweet-maker were all arrested, and all three were acquitted after the court found that no existing law had been broken. Like the six travellers in Vang Vieng, the Bradford dead were killed by a tainted everyday indulgence, and their grieving families watched the machinery of justice grind to a halt without ever assigning blame.",
        "excerpt": "About five pounds of sweets, adulterated by mistake with roughly twelve pounds of arsenic, reached the public through a market stall; some twenty people died and more than two hundred fell ill. Though three men were charged, the judge ruled the poisoning purely accidental and directed acquittals, leaving no one answerable for the deaths. The scandal shocked the nation and helped drive the Pharmacy Act of 1868, but the dead of Bradford received reform rather than justice.",
        "source": "The 1858 Bradford sweets poisoning; John Leech's cartoon 'The Great Lozenge-Maker,' Punch, 20 November 1858.",
        "href": "https://en.wikipedia.org/wiki/1858_Bradford_sweets_poisoning",
        "image": {
          "src": "/covers/laos-methanol-tourist-deaths-ruling--a0.png",
          "alt": "A skeletal figure of Death grinds poison with a giant pestle and mortar amid barrels of arsenic, in John Leech's 1858 Punch cartoon satirising the Bradford sweets poisoning.",
          "credit": "John Leech, 'The Great Lozenge-Maker. A Hint to Paterfamilias,' Punch, 1858. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "During American Prohibition the federal government, unable to stop bootleggers from re-distilling stolen industrial alcohol, ordered that spirit laced with ever-larger doses of methanol and other poisons. Over the Christmas holiday of 1926 dozens collapsed in New York, and by the era's end as many as 10,000 people are estimated to have died from the adulterated drink. New York's chief medical examiner Charles Norris denounced the policy as \"our noble experiment in extermination,\" yet no official was ever punished for the deaths. As in Laos, a poisoned drink killed the unsuspecting, and the authorities who might have answered for it instead retreated behind a wall of impunity.",
        "excerpt": "To thwart bootleggers, the Treasury ordered industrial alcohol denatured with a deadly formula heavy in methanol; the poison could not be fully filtered out, and drinkers went blind or died. In New York alone hundreds died in a single year, and critics from Columbia's Nicholas Murray Butler to medical examiner Charles Norris condemned what one called \"legalized murder.\" No one in government was ever held to account, and the toll mounted quietly until repeal in 1933.",
        "source": "The 'Chemist's War' of Prohibition, 1926-1933; see Deborah Blum, 'The Chemist's War,' Slate, 19 February 2010.",
        "href": "https://slate.com/technology/2010/02/the-little-told-story-of-how-the-u-s-government-poisoned-alcohol-during-prohibition.html",
        "image": {
          "src": "/covers/laos-methanol-tourist-deaths-ruling--a1.png",
          "alt": "Prohibition agents pour confiscated liquor into a sewer as a police commissioner looks on, New York, around 1921.",
          "credit": "New York City Deputy Police Commissioner John A. Leach watching agents pour liquor into a sewer, c.1921. Library of Congress, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In the final scene of Shakespeare's tragedy, Romeo, believing Juliet dead, drinks a phial of poison bought from a destitute apothecary and dies beside her in the Capulet tomb. His last words toast his love and salute the swift, sure work of the drug before a kiss seals his end. Written more than four centuries ago, the passage distils the horror of a young life ended by a swallowed poison, the same fate that overtook six travellers who raised a glass in Vang Vieng and never woke.",
        "excerpt": "Eyes, look your last!\nArms, take your last embrace! and, lips, O you\nThe doors of breath, seal with a righteous kiss\nA dateless bargain to engrossing death!\nCome, bitter conduct, come, unsavoury guide!\nThou desperate pilot, now at once run on\nThe dashing rocks thy sea-sick weary bark!\nHere's to my love! [Drinks] O true apothecary!\nThy drugs are quick. Thus with a kiss I die.",
        "source": "William Shakespeare, Romeo and Juliet, Act V, Scene 3 (c.1595).",
        "href": "http://shakespeare.mit.edu/romeo_juliet/romeo_juliet.5.3.html"
      },
      {
        "category": "literary",
        "title": "A.E. Housman's elegy, from A Shropshire Lad (1896), watches a young runner carried home twice, once shoulder-high in triumph after winning his race, and again shoulder-high to his grave as the \"townsman of a stiller town.\" The poem finds a bitter mercy in dying before glory fades, the laurel still unwithered on the boy's curls. Its tender grief for youth cut off at its brightest moment mirrors the mourning for six young tourists whose journeys ended abruptly and far from home.",
        "excerpt": "The time you won your town the race\nWe chaired you through the market-place;\nMan and boy stood cheering by,\nAnd home we brought you shoulder-high.\n\nTo-day, the road all runners come,\nShoulder-high we bring you home,\nAnd set you at your threshold down,\nTownsman of a stiller town.\n\nSmart lad, to slip betimes away\nFrom fields where glory does not stay,\nAnd early though the laurel grows\nIt withers quicker than the rose.\n\nEyes the shady night has shut\nCannot see the record cut,\nAnd silence sounds no worse than cheers\nAfter earth has stopped the ears:\n\nNow you will not swell the rout\nOf lads that wore their honours out,\nRunners whom renown outran\nAnd the name died before the man.\n\nSo set, before its echoes fade,\nThe fleet foot on the sill of shade,\nAnd hold to the low lintel up\nThe still-defended challenge-cup.\n\nAnd round that early-laurelled head\nWill flock to gaze the strengthless dead,\nAnd find unwithered on its curls\nThe garland briefer than a girl's.",
        "source": "A.E. Housman, 'To an Athlete Dying Young,' A Shropshire Lad, XIX (1896).",
        "href": "https://en.wikisource.org/wiki/A_Shropshire_Lad/To_an_Athlete_Dying_Young"
      },
      {
        "category": "artistic",
        "title": "Henry Wallis's 1856 painting shows the seventeen-year-old poet Thomas Chatterton lying dead on a garret bed by an open window over the rooftops of London, one arm trailing to the floor, torn manuscripts scattered, and an empty phial of arsenic beside him. The pale, beautiful body and the cold dawn light make the death of the young almost unbearably present. The picture memorialises a gifted life poisoned and lost too soon, an image that speaks directly to the grief for six travellers, barely older than Chatterton, killed by poison far from those who loved them.",
        "excerpt": "The Pre-Raphaelite canvas fixes the moment after Chatterton's suicide by arsenic in 1770: the youth stretched across a narrow bed, chest bare, coppery hair fallen back, his hand let go of an emptied vial. Shreds of his own writings litter the floorboards as first light breaks over a distant St Paul's. Wallis turns a squalid attic death into a luminous elegy for wasted promise, and the frame at its first showing bore Marlowe's line, \"Cut is the branch that might have grown full straight.\"",
        "source": "Henry Wallis, Chatterton (The Death of Chatterton), 1856, oil on canvas, Tate Britain.",
        "href": "https://www.tate.org.uk/art/artworks/wallis-chatterton-n01685",
        "image": {
          "src": "/covers/laos-methanol-tourist-deaths-ruling--a4.png",
          "alt": "A young man lies dead on a bed beside an open attic window at dawn, his arm hanging to the floor, torn papers scattered and an empty poison phial nearby.",
          "credit": "Henry Wallis, 'Chatterton,' 1856, Tate Britain. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart's Requiem in D minor, K.626, left unfinished at his own death in 1791, is the West's most enduring music of mourning, its Lacrimosa rising in slow, weeping phrases over the words \"that day of tears.\" Composed as a mass for the dead, it gives voice to grief and to the plea that the departed be granted rest and eternal light. The surviving autograph breaks off in Mozart's own hand only a few bars into the Lacrimosa, the pen laid down forever. Set against the silence of an inquiry that could name neither cause nor culprit, the Requiem offers the six young dead of Vang Vieng the dignity of a lament that justice withheld.",
        "excerpt": "Lacrimosa dies illa,\nqua resurget ex favilla\njudicandus homo reus.\nHuic ergo parce, Deus:\npie Jesu Domine,\ndona eis requiem. Amen.\n\n(Full of tears will be that day, when from the ashes shall arise the guilty to be judged; therefore spare him, O God: merciful Lord Jesus, grant them rest. Amen.)",
        "source": "W.A. Mozart, Requiem in D minor, K.626 (1791), 'Lacrimosa'; text from the traditional Requiem Mass.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/laos-methanol-tourist-deaths-ruling--a5.png",
          "alt": "A page of Mozart's handwritten Requiem manuscript, the opening bars of the Lacrimosa in ink on aged staff paper, where the score breaks off.",
          "credit": "Autograph manuscript of Mozart's Requiem, K.626, folio 87r (Lacrimosa). Austrian National Library, public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 30
  },
  {
    "slug": "trump-canada-wildfire-smoke-tariffs",
    "headline": "Trump threatens new tariffs on Canada over wildfire smoke drifting into U.S. cities",
    "overview": "President Donald Trump threatened new tariffs on Canada, accusing it of 'willful negligence' as smoke from roughly 955 active wildfires blanketed much of the northern United States in haze. Trump said the U.S. was being 'invaded by filthy, polluted, and unhealthy air' and vowed to call Prime Minister Mark Carney, while Ontario Premier Doug Ford urged Washington to send firefighting help rather than complain. Carney's government pointed to a long history of cross-border cooperation and about C$12 billion invested in forests and fire prevention.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwyq93j34lgo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxOdWRlX0x0cFY3NTVYVE1pbHVGQmZEYkVfLUtJZEZEamlnRk5HemRkckV5RjhRaUhoYVltcWRWcWZDZ2JyNUVFa3B2TW8welVMVFJiUkx4MDVLdlBpaUNNZUJlNGJkSDI4Q1JQcXJQZjFFcVA1N2V3TXJVWFFIc1M3TzdpWVRtcWI4M1ZiWHAyd3RER1I2UEN1U1hRM3dncnNCWjJkeWxlRzZValRldFNXb2FfbmFHMEFLWWpGUmxwVzJWUQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/trump-canada-wildfire-smoke-tariffs.png",
      "alt": "Wildfire smoke casting an orange haze over a North American city skyline.",
      "credit": "Jim Griffin / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "For decades the Consolidated Mining and Smelting Company's smelter at Trail, British Columbia, sent plumes of sulphur-dioxide fumes drifting south down the Columbia valley, scorching farms and forests across the line in Stevens County, Washington. Washington complained to Ottawa in 1925, and the dispute went to an international tribunal that in 1938 and 1941 issued the founding decision of transboundary pollution law: a nation is liable for airborne harm its territory inflicts on a neighbor. The roles are now exactly inverted. In 2026 it is the United States accusing Canada of letting poisoned air cross the border, but where the earlier grievance was settled by arbitration and damages, Trump reaches instead for tariffs and the language of 'willful negligence.'",
        "excerpt": "Under the principles of international law, as well as of the law of the United States, no State has the right to use or permit the use of its territory in such a manner as to cause injury by fumes in or to the territory of another or the properties or persons therein, when the case is of serious consequence and the injury is established by clear and convincing evidence.",
        "source": "Trail Smelter Arbitration (United States v. Canada), Tribunal Decision, 1941",
        "href": "https://leap.unep.org/en/countries/ca/national-case-law/trail-smelter-case-united-states-v-canada"
      },
      {
        "category": "historical",
        "title": "In the autumn of 2015, fires set to clear Indonesian peatland for palm-oil and pulp plantations spun out of control, and southerly winds pushed a choking pall of smoke over Singapore and Malaysia, driving air-quality indices into the 'hazardous' band and shutting schools for millions of children. Kuala Lumpur and Singapore publicly blamed Jakarta for negligence, and Singapore went so far as to prosecute Indonesian companies under its transboundary haze law. It is the closest mirror to the Canada dispute: neighbors gasping under drifting wildfire smoke, pointing across a border at the country where the fires burn, and turning an ecological disaster into a diplomatic and legal grievance. As with Ontario's Doug Ford insisting the answer is firefighting help rather than finger-pointing, the 2015 crisis exposed how smoke that ignores borders strains the politics of the nations it crosses.",
        "excerpt": "The 2015 haze was among the worst on record, blanketing Singapore and Malaysia in smoke from Indonesian peat and forest fires and pushing pollution readings into hazardous territory for weeks. Malaysia's prime minister demanded Indonesia rein in the companies responsible, while Singapore invoked a new law to pursue the firms behind the smoke. Jakarta bristled at being blamed for a haze that clearing fires, drought, and cross-border winds had jointly produced.",
        "source": "2015 Southeast Asian haze; statements by Malaysian and Singaporean officials",
        "href": "https://en.wikipedia.org/wiki/2015_Southeast_Asian_haze",
        "image": {
          "src": "/covers/trump-canada-wildfire-smoke-tariffs--a1.png",
          "alt": "Singapore's Orchard Road shrouded in dense grey haze during the September 2015 transboundary smoke crisis",
          "credit": "Photo via Wikimedia Commons (CC BY-SA)"
        }
      },
      {
        "category": "literary",
        "title": "Charles Dickens opens Bleak House by drowning London in soot and fog until the city itself seems to dissolve, the smoke falling like black snow and the fog creeping into every lung and lamplit court. The polluted air is not mere weather; it is the visible sign of a diseased public life, an atmosphere everyone breathes and no one can escape. Dickens's murky capital, its sun blotted out and its river 'defiled,' is the literary ancestor of the haze that Trump described as an 'invasion' of 'filthy, polluted, and unhealthy air.' Where the novelist saw the smoke as a shared civic affliction to be pitied, the modern quarrel turns the same choking pall into an accusation aimed across a border.",
        "excerpt": "Smoke lowering down from chimney-pots, making a soft black drizzle, with flakes of soot in it as big as full-grown snowflakes—gone into mourning, one might imagine, for the death of the sun. . . . Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls defiled among the tiers of shipping and the waterside pollutions of a great (and dirty) city.",
        "source": "Charles Dickens, Bleak House (1852–53), Chapter 1",
        "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm"
      },
      {
        "category": "literary",
        "title": "In the prologue to Sophocles' Oedipus the King, a priest kneels before the palace to describe a Thebes suffocating under an invisible plague: a blight on the crops, the herds, and the wombs of women, the whole city choked by a pestilence that hangs over it like poisoned air. The catastrophe is understood as a miasma, a pollution that must be traced to its guilty source and driven out before the city can breathe again. Oedipus responds by vowing to find and punish whoever is responsible for the defilement. That ancient logic—that fouled air demands a culprit to blame and expel—echoes uncannily in a president who answers a smoke-shrouded sky by naming a neighbor negligent and threatening to punish it.",
        "excerpt": "A blight is on our harvest in the ear,\nA blight upon the grazing flocks and herds,\nA blight on wives in travail; and withal\nArmed with his blazing torch the God of Plague\nHath swooped upon our city emptying\nThe house of Cadmus, and the murky realm\nOf Pluto is full fed with groans and tears.",
        "source": "Sophocles, Oedipus the King (c. 429 BCE), trans. Francis Storr",
        "href": "https://www.gutenberg.org/cache/epub/31/pg31.txt"
      },
      {
        "category": "artistic",
        "title": "Claude Monet painted the Houses of Parliament again and again from a window of St Thomas's Hospital, and in 'The Houses of Parliament (Effect of Fog)' the great building barely surfaces as a violet silhouette dissolving into a suspended, luminous murk. What Monet found beautiful was precisely London's coal-laden, smoke-thickened air—the very industrial haze that made his celebrated 'effects' possible. The canvas turns polluted atmosphere into an object of wonder, the opposite pole from Trump's framing of drifting smoke as filth and invasion. Seen against the 2026 story, Monet's shimmering fog is a reminder that the same veil over a skyline can be read as sublime or as an act of aggression, depending entirely on who is looking and why.",
        "excerpt": "Monet renders Parliament as a faint blue-grey ghost floating in a dense envelope of fog, its towers half-erased and its outlines bleeding into the tinted air. The polluted London atmosphere is not a nuisance in the painting but its true subject, softening architecture into a mood of suspended light. The effect is haze transfigured—the choking air of an industrial city recast as something ethereal.",
        "source": "Claude Monet, The Houses of Parliament (Effect of Fog), 1903–04, The Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/437128",
        "image": {
          "src": "/covers/trump-canada-wildfire-smoke-tariffs--a4.png",
          "alt": "Claude Monet's painting of the Houses of Parliament dissolving into thick violet-grey fog over the Thames",
          "credit": "Claude Monet, The Metropolitan Museum of Art, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner watched the Palace of Westminster burn on the night of 16 October 1834 and turned the disaster into a roaring canvas of flame and smoke, the blaze boiling up into the sky and smearing the night with red and gold above a stunned crowd on the Thames embankment. The whole composition is dominated by the towering column of smoke that swallows the city's monuments, a spectacle at once terrifying and sublime. It is the pictorial equivalent of ~955 wildfires throwing haze over the northern United States: uncontrolled fire converting the air itself into an overwhelming, sky-filling presence. Turner reminds us that great fires have always been read as omens and calamities, the smoke over a capital both a physical menace and a political shock—here, one that a president has chosen to blame on the country next door.",
        "excerpt": "Turner paints the burning Parliament as a wall of incandescent orange and yellow flame that erupts into a vast, churning cloud of smoke, its lurid glow reflected in the black waters of the Thames. Silhouetted spectators crowd the bridge and bank, dwarfed by the conflagration. The buildings dissolve in the heat while the smoke itself becomes the painting's true colossus, blotting out the sky.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, October 16, 1834 (1834–35), Philadelphia Museum of Art",
        "href": "https://philamuseum.org/collection/object/103831",
        "image": {
          "src": "/covers/trump-canada-wildfire-smoke-tariffs--a5.png",
          "alt": "J. M. W. Turner's painting of the Houses of Parliament ablaze, flames and smoke towering over the Thames and reflected in the water",
          "credit": "J. M. W. Turner, Philadelphia Museum of Art, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "texas-floods-cleanup-rescues",
    "headline": "Texas begins flood cleanup after more than 230 rescues and over two feet of rain in the Hill Country",
    "overview": "Hard-hit Texas communities began cleaning up after a week of punishing rain dropped more than two feet in places, killing at least two people and prompting more than 230 rescues across the Hill Country and areas near the Mexican border. Floodwaters spilled over Interstate 10 near Ozona, where more than 50 people were pulled by boat from flooded apartments and an RV park, and a section of bridge collapsed over the Nueces River in Uvalde County. Forecasters warned that further showers could worsen already swollen rivers.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxPZF9mYkc4MHU2ZW1ZNVVTN2daM0Q4b1JzUmg1dm1tbkg0UjdEVTB3SmJZXzlnR3VvVjFKSHpwRWd2NmtscDhjd1pILUNSMjVGdV9naTR5WEctbFE4cG5hTTlZSExUTkNjMGlHWTg3T2g2VTBzOVBoaS1PLUJHVmJ1SlZWUlp4NHl1clpNa1F2UmI2MXFuQjA1b1hTYnFSUQ?oc=5"
      },
      {
        "name": "WRAL",
        "href": "https://www.wral.com/news/ap/2f17c-threat-of-dangerous-flooding-continues-in-texas-while-hard-hit-areas-launch-cleanup-efforts/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/texas-floods-cleanup-rescues.png",
      "alt": "A swollen river in flood in the Texas Hill Country.",
      "credit": "Wikimedia Commons (public domain)"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the spring of 1927 the Mississippi River, swollen by months of rain, burst through its levee system in roughly 145 places and spread a muddy inland sea more than seventy miles wide across seven states. About 330,000 people were plucked from rooftops, trees and second-story windows by a vast fleet of rescue boats, while some 500 died and hundreds of thousands were left homeless in relief camps. It remains the benchmark American river disaster of rescue-by-boat and slow, mud-caked cleanup after the water finally fell. Texas's Hill Country deluge, with floodwaters spilling over Interstate 10 near Ozona and more than 230 people pulled from flooded apartments and an RV park, is a smaller echo of that same drama: rivers bursting their banks and neighbors ferried to safety through the current.",
        "excerpt": "For weeks the lower Mississippi valley became an inland ocean, its towns marked only by rooftops and the crowns of levees where refugees huddled. Rescuers in skiffs and steamboats worked the flooded farmland day and night, taking families, livestock and whatever could be carried off submerged porches. When the water at last receded it left the land buried in silt, the long labor of cleanup only beginning.",
        "source": "The Great Mississippi Flood of 1927, the most destructive river flood in U.S. history.",
        "href": "https://en.wikipedia.org/wiki/Great_Mississippi_Flood_of_1927",
        "image": {
          "src": "/covers/texas-floods-cleanup-rescues--a0.png",
          "alt": "Black-and-white 1927 photograph of flood refugees and their belongings gathered on high ground during the Great Mississippi Flood at Vicksburg.",
          "credit": "1927 Mississippi Flood, Vicksburg refugees; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On the night of 18-19 November 1421 a violent North Sea storm drove water up the river mouths of the Low Countries and shattered the dikes ringing the Grote Hollandse Waard, drowning dozens of villages in what is now the Netherlands. Estimates of the dead run into the thousands, and the sea held the polders for decades, carving the reed-marsh wilderness still called the Biesbosch. The St. Elizabeth's flood fused storm, river and tide into a single overwhelming inundation, the medieval memory of water reclaiming the land. It is the older European counterpart to Texas's Hill Country deluge, where two feet of rain sent rivers over their banks, collapsed a bridge across the Nueces in Uvalde County, and swallowed roads whole.",
        "excerpt": "When the dikes gave way in the dark, the water poured across the low farmland faster than church bells could warn the sleeping villages. Whole parishes vanished beneath the flood, their steeples left standing briefly above a widening inland sea before they too were lost. For generations afterward the drowned land stayed underwater, a wetland where fields and homes had been.",
        "source": "St. Elizabeth's flood of 1421, which drowned the Grote Hollandse Waard in Holland and Zeeland.",
        "href": "https://en.wikipedia.org/wiki/St._Elizabeth%27s_flood_(1421)",
        "image": {
          "src": "/covers/texas-floods-cleanup-rescues--a1.png",
          "alt": "Late-medieval painted panel depicting the St. Elizabeth's flood, with broken dikes, a church and houses standing amid wide floodwater.",
          "credit": "Master of the St. Elizabeth Panels, c. 1490-1495, Rijksmuseum, Amsterdam; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The flood of Noah in Genesis is the West's foundational deluge story: the fountains of the great deep break open, rain falls forty days and forty nights, and the waters rise until even the mountains vanish beneath fifteen cubits of water. Only those gathered into the ark ride out the catastrophe, lifted up on the face of an all-covering sea while every other living thing is swept away. It is the archetype of the flood as world-ending judgment, and of survival by being carried safely above the rising water. When Texas rescuers pulled more than fifty people by boat from flooded apartments and an RV park, they reenacted the oldest image of the deluge: a vessel bearing the living over waters that have swallowed everything else.",
        "excerpt": "In the six hundredth year of Noah's life, in the second month, the seventeenth day of the month, the same day were all the fountains of the great deep broken up, and the windows of heaven were opened. And the rain was upon the earth forty days and forty nights.\n[...]\nAnd the flood was forty days upon the earth; and the waters increased, and bare up the ark, and it was lift up above the earth. And the waters prevailed, and were increased greatly upon the earth; and the ark went upon the face of the waters. And the waters prevailed exceedingly upon the earth; and all the high hills, that were under the whole heaven, were covered. Fifteen cubits upward did the waters prevail; and the mountains were covered.\n[...]\nAnd every living substance was destroyed which was upon the face of the ground, both man, and cattle, and the creeping things, and the fowl of the heaven; and they were destroyed from the earth: and Noah only remained alive, and they that were with him in the ark.",
        "source": "Genesis 7:11-23, King James Version; Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "literary",
        "title": "In Book I of Ovid's Metamorphoses, Jupiter resolves to drown a wicked human race, and Neptune joins in, striking the earth with his trident so the rivers rush resistless over the plains, sweeping away grain, groves, houses, flocks and people alike. Land and sea lose all distinction until the world becomes a sea without a shore, with only a few survivors clinging to hilltops or drifting in small boats. Written around the turn of the first millennium, it is antiquity's most vivid poem of rivers bursting their banks and a landscape erased by water. It maps almost exactly onto the Hill Country scene, the Nueces and its neighbors overflowing and Interstate 10 vanishing beneath the current near Ozona.",
        "excerpt": "And Neptune with his trident smote the Earth, which trembling with unwonted throes heaved up the sources of her waters bare; and through her open plains the rapid rivers rushed resistless, onward bearing the waving grain, the budding groves, the houses, sheep and men,—and holy temples, and their sacred urns. The mansions that remained, resisting vast and total ruin, deepening waves concealed and whelmed their tottering turrets in the flood and whirling gulf. And now one vast expanse, the land and sea were mingled in the waste of endless waves—a sea without a shore.",
        "source": "Ovid, Metamorphoses, Book I (the flood of Deucalion), trans. Brookes More (1922); Perseus Digital Library, Tufts University.",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0028%3Abook%3D1%3Acard%3D253"
      },
      {
        "category": "artistic",
        "title": "Gustave Doré's 1866 wood-engraving 'The Deluge,' from his illustrated Bible, shows the last survivors of Noah's flood stranded on a shrinking rock: a mother lifts her children toward a merciless sky while a tigress and her cubs crowd the same doomed ledge, the drowned already floating in the black water below. Doré turns the biblical flood into a scene of raw human desperation as the water climbs. The image distills the terror at the heart of every flood, the frantic scramble for higher ground as the river keeps rising. It is the visual key to the Texas rescues, where families in flooded apartments and an RV park waited on whatever high place they could reach for the boats to come.",
        "excerpt": "Doré's dark engraving crowds the last survivors onto a wave-lapped crag: a mother strains upward with a limp child while a wild cat and her cubs snarl beside her, and pale bodies drift face-down in the water below. The horizon is nothing but flood, the ark a distant smudge in a bruised sky. It is the deluge rendered as pure human panic at the moment before the water closes over the rock.",
        "source": "Gustave Doré, 'The Deluge' (Le Déluge), 1866, wood engraving from The Holy Bible.",
        "href": "https://commons.wikimedia.org/wiki/File:Gustave_Dor%C3%A9_-_The_Holy_Bible_-_Plate_I,_The_Deluge.jpg",
        "image": {
          "src": "/covers/texas-floods-cleanup-rescues--a4.png",
          "alt": "Gustave Doré's engraving The Deluge: a mother lifts her children and a tigress crouches on a rock as floodwaters and drowned bodies surround them.",
          "credit": "Gustave Doré, 'The Deluge' (1866), from The Holy Bible; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Michelangelo's fresco 'The Deluge' (1508-1512), on the Sistine Chapel ceiling, spreads the flood across a whole panel: knots of refugees haul bundles and children uphill, one man carries his lifeless son, a small boat is swamped and capsizing in the middle distance, and a crowd shelters beneath a wind-torn cloth as the water rises around a last spit of land. Michelangelo makes the deluge a study in human solidarity and panic, people helping one another flee the water. That is precisely the story of the Texas cleanup, where neighbors and rescuers pulled more than 230 people from the current across the Hill Country and near the Mexican border. The fresco's climbers on their vanishing island are the Renaissance mirror of an RV park and apartments emptied by boat.",
        "excerpt": "Across Michelangelo's crowded panel the survivors of the flood struggle toward a shrinking hill: parents drag and carry their children, a grieving man bears a limp body, and a knot of figures huddles under a billowing shelter as the wind and water close in. Out in the rising flood a laden boat tips and takes on water, its passengers grasping at the gunwales. The fresco reads as one long, muscular scene of people trying to save one another from the deluge.",
        "source": "Michelangelo, 'The Deluge' (Il Diluvio), 1508-1512, fresco, Sistine Chapel ceiling, Vatican.",
        "href": "https://commons.wikimedia.org/wiki/File:The_Deluge_after_restoration.jpg",
        "image": {
          "src": "/covers/texas-floods-cleanup-rescues--a5.png",
          "alt": "Michelangelo's Sistine Chapel fresco The Deluge: crowds flee rising floodwaters carrying children and belongings toward higher ground, with a swamped boat in the distance.",
          "credit": "Michelangelo, 'The Deluge' (1508-1512), Sistine Chapel, Vatican; public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "us-data-center-protests-national",
    "headline": "Data-center opponents stage coordinated protests in at least 125 U.S. locations",
    "overview": "Opponents of the rapid buildout of AI data centers held protests in at least 125 locations across the United States, the first coordinated national demonstration against an infrastructure boom that has roiled local politics. The rallies, organized by a grassroots group called HumansFirst, targeted what it calls the 'unaccountable' expansion and its strain on power bills, water and the environment. A June Reuters/Ipsos poll found only about a third of Americans approve of the pace of data-center construction, and just 14% would welcome one in their community.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisAFBVV95cUxPYk5QUVhhdHdNUVZKT0xJVURINmc1UzZORTZpdGtnaGwxemxTSWZNUTR6MkE3SHY5RjYwSUlQSWFUSlV3RHJGSXJLcjBUWXRlNzBuREwzblp5aEtIdVFRZjJlZmt2dUF6QzNxY2hackV2NDlQbnVGbFBrRnlXOUdycTh1ck5RdUd6WndGOExPN2h5dkVuVUFEVnYzeHdxT1ViWElDZjRpNzFncVFmMEltNg?oc=5"
      },
      {
        "name": "U.S. News",
        "href": "https://www.usnews.com/news/top-news/articles/2026-07-18/us-data-center-protests-go-national-as-backlash-grows"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/us-data-center-protests-national.png",
      "alt": "Rows of server racks inside a data center hall.",
      "credit": "Carl Lender / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the winter of 1811-1816, textile workers across the English Midlands and North smashed the mechanized frames and looms that were displacing their livelihoods, marching by night under the name of a mythical \"General Ludd\" of Sherwood Forest. Framed as criminal riot by Parliament, the Luddite movement was in fact a coordinated popular revolt against machinery introduced without regard for the communities it upended, prompting the state to make frame-breaking a hanging offence. Their proclamations claimed an ancient right to destroy engines that ruined a trade for private profit. Like today's data-center opponents rallying in 125 towns against an \"unaccountable\" buildout, the Luddites were not against progress as such but against a machine age imposed on them from above, at their expense.",
        "excerpt": "Whereas by the charter granted by our late sovereign Lord Charles II ... the framework knitters are empowered to break and destroy all frames and engines that fabricate articles in a fraudulent and deceitful manner ... we therefore the framework knitters do hereby declare the aforesaid Act to be null and void to all intents and purposes whatsoever ... And we do hereby declare to all hosiers lace manufacturers and proprietors of frames that we will break and destroy all manner of frames whatsoever that make the following spurious articles and all frames whatsoever that do not pay the regular prices heretofore agreed to [by] the masters and workmen ... whereas all frames of whatsoever description the work-men of whom are not paid in the current coin of the realm will invariably be destroyed.\nGiven under my hand this first day of January 1812.\nGod protect the Trade.\nNed Lud's-Office\nSherwood Forest",
        "source": "Luddite proclamation \"By the Framework Knitters, a Declaration,\" 1 January 1812, signed from \"Ned Lud's-Office, Sherwood Forest\"",
        "href": "https://www.marxists.org/history/england/combination-laws/ned-ludd-1812.htm"
      },
      {
        "category": "historical",
        "title": "In 1962 Consolidated Edison unveiled plans for the largest pumped-storage power plant in the country, gouged into the face of Storm King Mountain on the Hudson River. Local residents, alarmed that the scenery would be scarred, the town's drinking water endangered and the aqueduct to New York City threatened, formed the Scenic Hudson Preservation Conference in 1963 and fought the utility for seventeen years. Their 1965 court victory established for the first time that ordinary citizens had standing to sue to protect the environment, and by 1980 Con Edison abandoned the project outright. It is a near-exact template for the data-center revolt: a grassroots community coalition resisting a vast, power-hungry piece of energy infrastructure imposed by a corporation, invoking exactly the water, environment and quality-of-life worries now driving protests nationwide.",
        "excerpt": "In September 1962 Consolidated Edison announced plans for a hydroelectric power plant at Storm King Mountain in Cornwall, New York, pumping Hudson River water uphill during low-demand hours and releasing it through turbines at peak. When an artist's rendering revealed how the mountain's face would be scarred, residents organized: the Hudson River Conservation Society and, by 1963, the Scenic Hudson Preservation Conference. Opponents warned of contaminated groundwater threatening Cornwall's drinking water and damage to the Catskill Aqueduct serving New York City. After nearly two decades of hearings and court battles, Con Edison agreed in 1980 to terminate the Storm King plans.",
        "source": "\"Storm King,\" Rescuing the River: 50 Years of Environmental Activism on the Hudson, Hudson River Valley Heritage online exhibit",
        "href": "https://omeka.hrvh.org/exhibits/show/rescuing-the-river/powering-the-hudson/storm-king"
      },
      {
        "category": "literary",
        "title": "William Blake wrote his short preface poem to \"Milton\" around 1804-1810, at the very dawn of the factory age, setting a vision of a holy, green England against the \"dark Satanic Mills\" then rising across the land. The verse became a battle cry precisely because it fuses spiritual protest with a refusal to submit to industrial encroachment, vowing not to cease from \"Mental Fight\" until a better world is built. Its imagery of hills clouded and pastures defiled by relentless machinery speaks directly to communities today watching warehouse-scale server farms consume their landscapes, power and water. Blake gives the data-center backlash its oldest and most resonant slogan: the machine mills as something Satanic set against the human and the sacred.",
        "excerpt": "And did those feet in ancient time\nWalk upon England's mountains green,\nAnd was the holy Lamb of God\nOn England's pleasant pastures seen?\nAnd did the Countenance Divine\nShine forth upon our clouded hills?\nAnd was Jerusalem builded here\nAmong these dark Satanic Mills?\nBring me my Bow of burning gold:\nBring me my Arrows of desire:\nBring me my Spear: O clouds unfold!\nBring me my Chariot of fire:\nI will not cease from Mental Fight,\nNor shall my Sword sleep in my hand,\nTill we have built Jerusalem,\nIn England's green & pleasant Land.",
        "source": "William Blake, preface (\"And did those feet in ancient time\") to Milton: A Poem, c. 1804-1810",
        "href": "https://en.wikisource.org/wiki/The_prophetic_books_of_William_Blake,_Milton/Milton,_preface"
      },
      {
        "category": "literary",
        "title": "In Hard Times (1854), Charles Dickens conjured Coketown, a fictional industrial city choked by smoke, machinery and monotony, where nature is stained purple with dye and the steam-engine nods endlessly \"like the head of an elephant in a state of melancholy madness.\" His portrait is a moral indictment of an industrialism that flattens everything and everyone into sameness for the sake of production. The passage crystallizes the fear now animating data-center opponents: that a wave of humming, resource-devouring infrastructure will remake their towns into featureless service districts for distant machines. Dickens gives the human-versus-machine anxiety of this story its most enduring landscape.",
        "excerpt": "It was a town of red brick, or of brick that would have been red if the smoke and ashes had allowed it; but as matters stood, it was a town of unnatural red and black like the painted face of a savage. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness. It contained several large streets all very like one another, and many small streets still more like one another, inhabited by people equally like one another, who all went in and out at the same hours, with the same sound upon the same pavements, to do the same work.",
        "source": "Charles Dickens, Hard Times (1854), Book the First, Chapter V, \"The Key-note\"",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm"
      },
      {
        "category": "artistic",
        "title": "Philip James de Loutherbourg's \"Coalbrookdale by Night\" (1801) shows the birthplace of the Industrial Revolution ablaze in the dark: the Bedlam Furnaces of Shropshire throwing a hellish orange glare over a valley of smoke, machinery and hauled iron, dwarfing the tiny human figures in the foreground. Painted with something between awe and dread, it became the defining image of industry overwhelming a once-rural landscape. That is exactly the vista data-center opponents invoke, warning of vast, floodlit, energy-guzzling server halls transforming quiet places into round-the-clock industrial zones. The canvas turns the machine age's encroachment into a single, luminous, unsettling scene.",
        "excerpt": "A rural valley is engulfed by the fiery glow of the ironworks: furnaces blaze a lurid orange-red into the night sky, pouring smoke over the darkened hills, while dim human figures and a horse-drawn load are reduced to shadows before the industrial inferno. Loutherbourg paints Coalbrookdale as both spectacle and warning, the machinery of a new age lighting up and consuming the land around it.",
        "source": "Philip James de Loutherbourg, Coalbrookdale by Night (1801), oil on canvas, Science Museum, London",
        "href": "https://commons.wikimedia.org/wiki/File:Philipp_Jakob_Loutherbourg_d._J._-_Coalbrookdale_by_Night_-_WGA13730.jpg",
        "image": {
          "src": "/covers/us-data-center-protests-national--a4.png",
          "alt": "Nighttime scene of the Coalbrookdale ironworks with furnaces glowing fiery orange-red beneath billowing smoke, tiny human and horse figures silhouetted in the foreground.",
          "credit": "Philip James de Loutherbourg, \"Coalbrookdale by Night\" (1801), Science Museum, London — via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Pellizza da Volpedo's monumental \"Il Quarto Stato\" (The Fourth Estate, 1901) shows a mass of laboring men, women and a child advancing steadily toward the viewer across an open square, the front rank lit like classical heroes as the crowd behind them stretches back without end. It is the definitive image of ordinary people rising together, a grassroots multitude claiming its place against entrenched power. That is the visual key to this story: not machine-breaking chaos but an organized human tide, communities converging in 125 towns to be counted against an industrial force they never chose. Pellizza turns the crowd itself into the subject, and into a quiet, unstoppable act of collective will.",
        "excerpt": "A broad column of working people moves forward out of shadow into light, led by three figures at the front, a striding man flanked by a woman holding an infant, with a vast crowd massed behind them filling the width of the canvas. Pellizza da Volpedo monumentalizes the ordinary marching multitude, dignified and resolute, as a single body advancing to claim its rightful place.",
        "source": "Giuseppe Pellizza da Volpedo, Il Quarto Stato (The Fourth Estate), 1901, oil on canvas, Museo del Novecento, Milan",
        "href": "https://commons.wikimedia.org/wiki/File:Quarto_Stato.jpg",
        "image": {
          "src": "/covers/us-data-center-protests-national--a5.png",
          "alt": "A large crowd of working men and women, led by a striding man and a woman carrying a baby, advancing forward across an open square toward the viewer.",
          "credit": "Giuseppe Pellizza da Volpedo, \"Il Quarto Stato\" (1901), Museo del Novecento, Milan — via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 33
  },
  {
    "slug": "pentagon-testosterone-screening-plan",
    "headline": "Doctors question Pentagon plan to screen troops 30 and older for low testosterone",
    "overview": "Medical experts questioned a new order by Defense Secretary Pete Hegseth requiring annual testosterone-deficiency screening for active-duty and reserve service members aged 30 and older, which he says will bolster military readiness. Four of six doctors interviewed by Reuters said there was no solid evidence that broad screening would optimize combat readiness, warning that inappropriate hormone treatment could raise risks including infertility. Hegseth linked the mandate to 'Operator Syndrome' seen in elite special-forces troops, but the researcher who first described the condition said those operators are not representative of the wider force.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPWUJlakhnaXgxcmJlaU01d0J2UU96M3BnX1JMSDhrLV9aT0dSQW1FUWV5c0xLRm9qOXBOWWFvWHNyN096NVRqbGdoVE9kUEJrU1ZBWkVmaVpRa3FPbTk1NE4yWk9ETV9IbE5HNi1Zemo3Rm11VWpqc1BtM1FiMU9WOXpMMDl4RDczZVFjU3hyUEtqdkoyWVozLU9PVWhHV3p5T2VLUlJoc2ZZZWNDeS1jOTgwS3V6N3BDM3g4Q0lpVQ?oc=5"
      },
      {
        "name": "PBS NewsHour",
        "href": "https://www.pbs.org/newshour/world/hegseth-announces-new-policy-to-test-troops-for-low-testosterone-and-offer-them-hormone-replacement-therapy"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/pentagon-testosterone-screening-plan.png",
      "alt": "Aerial view of the Pentagon building near Washington, D.C.",
      "credit": "David B. Gleason / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In archaic Sparta the state claimed a citizen's body before he could even walk. Plutarch records that a newborn was carried to a council of tribal elders at the Lesche, who inspected it for strength and, if it seemed \"puny and ill-shaped,\" ordered it flung into a chasm below Mount Taygetus — not for the child's sake but for \"the public interest.\" Boys who passed were enrolled at seven into the agoge, close-clipped, barefoot, half-starved and taught \"to endure pain and conquer in battle.\" It is the purest ancestor of the impulse behind Hegseth's screening order: the conviction that a soldier's flesh is a strategic asset the state may measure, sort and optimize, and that martial readiness is something you can engineer in the body by decree.",
        "excerpt": "if they found it stout and well made, they gave order for its rearing, and allotted to it one of the nine thousand shares of land above mentioned for its maintenance, but, if they found it puny and ill-shaped, ordered it to be taken to what was called the Apothetae, a sort of chasm under Taygetus; as thinking it neither for the good of the child itself, nor for the public interest, that it should be brought up, if it did not, from the very outset, appear made to be healthy and vigorous. [...] their chief care was to make them good subjects, and to teach them to endure pain and conquer in battle.",
        "source": "Plutarch, Life of Lycurgus (Dryden translation, ed. A. H. Clough, 1859)",
        "href": "https://www.gutenberg.org/cache/epub/674/pg674.txt",
        "image": {
          "src": "/covers/pentagon-testosterone-screening-plan--a0.png",
          "alt": "Marble statue of a helmed Spartan hoplite, 5th century BC, sometimes identified as Leonidas, Archaeological Museum of Sparta",
          "credit": "Marble hoplite (5th c. BC), possibly Leonidas, Archaeological Museum of Sparta; photograph via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "In June 1889 the 72-year-old French physiologist Charles-Édouard Brown-Séquard stood before the Société de Biologie in Paris and announced that he had injected himself with a slurry crushed from the testicles of dogs and guinea pigs — and grown young again. He reported to The Lancet that his strength, stamina and even the arc of his urine had been restored, measuring the gains on a dynamometer. Within months more than 12,000 physicians were peddling his \"Elixir of Life,\" though his extracts contained essentially no testosterone and the effect was placebo. It is the founding episode of the testosterone-cure fantasy that Hegseth's order revives: the seductive, evidence-thin belief that manly vigor can be topped up like a fuel tank, and that virility restored is capability restored.",
        "excerpt": "The day after the first subcutaneous injection, and still more after the two succeeding ones, a radical change took place in me, and I had ample reason to say and to write that I had regained at least all the strength I possessed a good many years ago.",
        "source": "C. E. Brown-Séquard, The Lancet, 1889 (\"The effects produced on man by subcutaneous injections of a liquid obtained from the testicles of animals\")",
        "href": "https://www.usrf.org/news/TRT/Brown-Sequard,%20Lancet,%201889.pdf",
        "image": {
          "src": "/covers/pentagon-testosterone-screening-plan--a1.png",
          "alt": "Portrait of the physiologist Charles-Édouard Brown-Séquard",
          "credit": "Portrait of Charles-Édouard Brown-Séquard; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "In Book XII of the Iliad the Lycian captain Sarpedon turns to his comrade Glaucus and asks why the two of them are honored \"as gods\" with the best land and richest feasts — and answers his own question: because they stand first in the killing. Since death and \"ignoble age\" will claim brave and coward alike, he reasons, a man should spend his life buying glory in the front rank. It is the aristocratic warrior creed in its most naked form, prowess of the body converted directly into worth and rank. That is precisely the equation Hegseth reaches for when he ties combat readiness to hormonal vigor — the ancient dream of the soldier whose physical strength is the measure of the man.",
        "excerpt": "Could all our care elude the gloomy grave,\nWhich claims no less the fearful and the brave,\nFor lust of fame I should not vainly dare\nIn fighting fields, nor urge thy soul to war.\nBut since, alas! ignoble age must come,\nDisease, and death's inexorable doom,\nThe life, which others pay, let us bestow,\nAnd give to fame what we to nature owe;\nBrave though we fall, and honour'd if we live,\nOr let us glory gain, or glory give!",
        "source": "Homer, Iliad, Book XII (Sarpedon to Glaucus), trans. Alexander Pope",
        "href": "https://www.gutenberg.org/cache/epub/6130/pg6130.txt"
      },
      {
        "category": "literary",
        "title": "The seventh-century Spartan poet Tyrtaeus wrote marching songs meant to be chanted around the camp fires, and they read like state propaganda for martial masculinity. In Thomas Campbell's translation the elegy exalts the young man who falls sword in hand and heaps disgrace on the \"recreant\" who flinches, insisting that even in death \"youth's fair form\" is beautiful — the hero-boy \"lovelier far, / For having perished in the front of war.\" Here the ideal male body is not merely useful to the state but sacralized, most perfect at the moment it is spent for the polis. It anticipates the aesthetic underneath the Pentagon plan: the fusion of virility, martial fitness and national strength into a single cult of the soldierly body.",
        "excerpt": "How glorious fall the valiant, sword in hand,\nIn front of battle for their native land!\n[...]\nBut youth's fair form, though fallen, is ever fair,\nAnd beautiful in death the boy appears,\nThe hero boy, that dies in blooming years:\nIn man's regret he lives, and woman's tears;\nMore sacred than in life, and lovelier far,\nFor having perished in the front of war.",
        "source": "Tyrtaeus, \"Martial Elegy,\" trans. Thomas Campbell (in Masterpieces of Greek Literature, 1902)",
        "href": "https://en.wikisource.org/wiki/Masterpieces_of_Greek_Literature_(1902)/Tyrtaeus"
      },
      {
        "category": "artistic",
        "title": "Around 440 BC the sculptor Polykleitos cast a bronze spear-bearer — the Doryphoros — as a deliberate demonstration of his \"Canon,\" a mathematical system for the perfectly proportioned male body. Known today through Roman marble copies like the one from Pompeii now in Naples, the figure is a nude young warrior, spear once resting on his shoulder, weight shifted into an easy contrapposto that made ideal manhood look like natural law. For two and a half millennia this soldier-athlete has been the West's template for what a fighting body ought to be. Hegseth's testosterone regime is a modern echo of the same fantasy — the belief that there is an optimal martial physique, and that troops can and should be tuned toward it.",
        "excerpt": "A Roman marble copy of Polykleitos' bronze Doryphoros: a nude, athletically muscled young soldier caught mid-stride, his weight poised on one leg while the other trails, one hand once gripping a spear. The body is built to a strict canon of proportion, every ratio calculated to embody ideal male strength — the athletic warrior refined into a formula of perfection.",
        "source": "Polykleitos, Doryphoros (Spear-Bearer), c. 440 BC; Roman marble copy, Museo Archeologico Nazionale, Naples",
        "href": "https://commons.wikimedia.org/wiki/File:Doryphoros_MAN_Napoli_Inv6011-2.jpg",
        "image": {
          "src": "/covers/pentagon-testosterone-screening-plan--a4.png",
          "alt": "Roman marble copy of the Doryphoros (Spear-Bearer) of Polykleitos, an idealized nude male warrior, National Archaeological Museum of Naples",
          "credit": "Doryphoros, Roman copy after Polykleitos, Museo Archeologico Nazionale di Napoli; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David labored for years on Leonidas at Thermopylae (finished 1814), a vast canvas crowded with muscular, largely nude Spartan warriors calmly readying themselves to die at the pass. At the center the seated king Leonidas gazes out with serene resolve, his idealized athletic body the moral and physical anchor of the scene — Neoclassicism's hymn to martial virtue as bodily perfection. David painted it as an emblem of self-sacrificing manhood for the nation. It is a direct visual ancestor of the ideology behind the Pentagon's screening plan: the state's romance with the hardened male body as the very substance of readiness, patriotism rendered as testosterone made flesh.",
        "excerpt": "David's monumental Leonidas at Thermopylae fills the canvas with idealized, heroically muscled Spartan soldiers preparing to fight to the death. The nude king sits at the center in perfect composure, sword in hand, his sculpted body radiating disciplined martial strength. Every figure is a Neoclassical study in the beautiful warrior physique — manhood offered up as the ultimate proof of devotion to the state.",
        "source": "Jacques-Louis David, Leonidas at Thermopylae, 1814, oil on canvas, Musée du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_004_Thermopylae.jpg",
        "image": {
          "src": "/covers/pentagon-testosterone-screening-plan--a5.png",
          "alt": "Jacques-Louis David's painting Leonidas at Thermopylae, showing idealized nude and muscular Spartan warriors around the seated King Leonidas",
          "credit": "Jacques-Louis David, Leonidas at Thermopylae (1814), Musée du Louvre; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "germany-raises-terror-threat-level",
    "headline": "Germany raises its terrorism threat level to 'high,' interior minister says",
    "overview": "German Interior Minister Alexander Dobrindt said he had raised the country's abstract terrorism threat level to 'high,' telling the newspaper Welt am Sonntag that a rising volume of intelligence pointed to discernible attack plans against German infrastructure, individuals and institutions. The move comes as Chancellor Friedrich Merz's government prepares to expand the operational powers of Germany's intelligence agencies. 'Plans for attacks against our country are clearly discernible,' Dobrindt said.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxPRTV2cVk1WFpCWkR2cGlkcm90cVVvMkduU0hpUUltS3c3Tnh4QlJleUFveF96VmFIYjdsR0kyZVcxYmxqR1NpNDNpUTB4bnd2b1hCYUdyMWJiREJfczVXVmJoQjhlSV91Z0szcWRQY3pkU2phREdtSi1KRjI1MFI2ZklvWmNCLXllWWdObmszYzZ0dXItQ0g0WVRvcWNYejJ3Vkxac0VlYlQtWkdBWUZkQ1AwUmYyOGNORFhZX2lpVQ?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-18/germany-raises-threat-level-over-terror-attack-risk-welt-says"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/germany-raises-terror-threat-level.png",
      "alt": "The Reichstag building, seat of the German Bundestag, in Berlin.",
      "credit": "Jürgen Matern / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the autumn of 1605 the English state believed a hidden cell meant to blow up King, Lords and Commons together in a single blast beneath Parliament. The plot unravelled not from a battlefield but from intelligence: an anonymous warning, the Monteagle Letter, slipped to a peer telling him to stay away because the assembly would 'receive a terrible blow.' In the paranoid decade that followed, the Crown expanded its security apparatus, tightening the recusancy laws, imposing a new Oath of Allegiance, and treating a whole community as a suspect enemy within. Dobrindt's warning of 'discernible attack plans against German infrastructure, individuals and institutions' echoes that same logic: a cryptic intelligence signal of an unseen attacker, answered by a state reaching for wider powers of surveillance and control.",
        "excerpt": "My lord, out of the love I beare to some of youere frends, I have a care of youre preservacion, therefore I would aduyse you as you tender your life to devise some excuse to shift youer attendance at this parliament, for God and man hath concurred to punishe the wickedness of this tyme, and thinke not slightly of this advertisement, but retire yourself into your country, where you may expect the event in safety, for though there be no apparance of anni stir, yet I saye they shall receive a terrible blow this parliament and yet they shall not seie who hurts them.",
        "source": "The Monteagle Letter, anonymous warning received 26 October 1605 (The National Archives, UK)",
        "href": "https://en.wikisource.org/wiki/Monteagle_Letter",
        "image": {
          "src": "/covers/germany-raises-terror-threat-level--a0.png",
          "alt": "Contemporary engraving of eight of the Gunpowder Plot conspirators grouped in conversation, hats and cloaks, plotting the destruction of Parliament.",
          "credit": "Crispijn van de Passe the Elder, engraving, c.1605. National Portrait Gallery, London (NPG 334a). Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Between the 1880s and the 1900s a wave of anarchist 'propaganda of the deed' — dynamite in cafes and railway stations, the assassinations of a Russian tsar, a French president, an Austrian empress and an American president — convinced the governments of Europe and America that a borderless conspiracy of bomb-throwers could strike anywhere. On 4 May 1886 a bomb hurled into police ranks at Chicago's Haymarket Square killed officers and detonated a national panic that ended in a mass trial and executions. States answered the fear by building the machinery of the modern security state: London's Special Branch, the Tsar's Okhrana, immigration bans on anarchists, and a Rome conference in 1898 to coordinate international surveillance of radicals. Germany's move to a 'high' threat level, paired with the Merz government's plan to expand intelligence-agency powers, belongs to that lineage — a state convinced of a hidden, mobile enemy and reaching for broader watchfulness in response.",
        "excerpt": "In these decades the anarchist with a bomb became the era's archetype of the enemy who could be anyone and could strike anywhere, and each atrocity was met not only with grief but with new statutes, new political police, and new registers of the suspect. The Haymarket bomb of 1886, its thrower never identified, showed how a single unseen attacker could push a whole society toward hasty legislation and expanded surveillance — the reflex of a state that feels itself watched from the shadows.",
        "source": "The Haymarket bombing, Chicago, 4 May 1886, and the transatlantic anarchist 'dynamite' scare (Library of Congress, Chronicling America)",
        "href": "https://guides.loc.gov/chronicling-america-haymarket-affair",
        "image": {
          "src": "/covers/germany-raises-terror-threat-level--a1.png",
          "alt": "Wood engraving of a dynamite bomb exploding in a burst of light among ranks of police as a speaker addresses a crowd at Chicago's Haymarket Square, 1886.",
          "credit": "Thure de Thulstrup, wood engraving in Harper's Weekly, 15 May 1886. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Joseph Conrad's 1907 novel The Secret Agent turns on a foreign embassy official, Mr Vladimir, who lectures the slothful spy Verloc that a purely destructive outrage on a public target is the surest way to frighten a complacent society into repressive legislation. In this passage Vladimir insists the attack must not merely be planned but executed on home soil, and directed at buildings and institutions, so that the shock forces the state's hand. Conrad, writing after the real 1894 Greenwich bombing, anatomises the whole grim mechanism by which a hidden conspiracy and an anxious government feed one another. It reads as an uncanny gloss on Dobrindt's warning of plots against German 'infrastructure, individuals and institutions' and a government preparing, in response, to widen its surveillance powers.",
        "excerpt": "“A series of outrages,” Mr Vladimir continued calmly, “executed here in this country; not only planned here—that would not do—they would not mind. Your friends could set half the Continent on fire without influencing the public opinion here in favour of a universal repressive legislation. They will not look outside their backyard here.” [...] “These outrages need not be especially sanguinary,” Mr Vladimir went on, as if delivering a scientific lecture, “but they must be sufficiently startling—effective. Let them be directed against buildings, for instance.”",
        "source": "Joseph Conrad, The Secret Agent: A Simple Tale (1907), Chapter II",
        "href": "https://www.gutenberg.org/ebooks/974"
      },
      {
        "category": "literary",
        "title": "In Dostoevsky's 1872 novel The Possessed (Demons), the agitator Pyotr Verkhovensky binds a provincial town into a secret revolutionary 'quintet' and boasts of an invisible national organisation. Here the theorist Shigalov recites back to him the terrifying vision he was sold: Russia covered by an 'endless network of knots,' each cell ramifying in secret, working through denunciation and fire to bring the country to a coordinated moment of collapse. Dostoevsky captures the dread of a conspiracy that is everywhere and nowhere, and the mutual paranoia it breeds among watchers and watched. That is precisely the anxiety behind a raised threat level: a state persuaded that unseen cells are laying 'discernible attack plans' against its infrastructure, forced to imagine the hidden enemy within.",
        "excerpt": "you yourself at first and a second time later, drew with great eloquence, but too theoretically, a picture of Russia covered with an endless network of knots. Each of these centres of activity, proselytising and ramifying endlessly, aims by systematic denunciation to injure the prestige of local authority, to reduce the villages to confusion, to spread cynicism and scandals, together with complete disbelief in everything and an eagerness for something better, and finally, by means of fires, as a pre-eminently national method, to reduce the country at a given moment, if need be, to desperation.",
        "source": "Fyodor Dostoevsky, The Possessed (Demons), 1872, trans. Constance Garnett, Part III, Chapter IV",
        "href": "https://www.gutenberg.org/ebooks/8117"
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens painted The Consequences of War in 1637–38, at the height of the Thirty Years' War, as an explicit allegory of a continent given over to violence. Mars, the god of war, strides forward with bloody sword while Venus vainly tries to restrain him; the fury Alecto drags him on with a torch, and beneath his feet lie the trampled emblems of art, learning and civic harmony, as a black-clad figure of Europe throws up her arms and wails. Rubens described the grieving woman as Europe herself, 'afflicted for so many years by rapine, outrage and misery.' The painting gives a face to exactly the atmosphere behind a nation raising its guard against imminent attack — a Europe once more bracing itself, its institutions and its people, against the threat of destruction breaking in from the dark.",
        "excerpt": "An oil allegory in warm, storm-lit color: the armored war-god Mars lunges out of shadow, sword drawn, torch-bearing Fury pulling him on, while Venus and cherubs strain to hold him back and the personified figure of Europe lifts her arms in black-robed despair. Around them the instruments of peaceful life — a book, an architect's compass, a lute — are crushed underfoot, an image of a settled civilization tipping into fear and ruin.",
        "source": "Peter Paul Rubens, The Consequences of War, 1637–1638, oil on canvas. Galleria Palatina, Palazzo Pitti, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Rubens_-_The_Consequences_of_War.jpg",
        "image": {
          "src": "/covers/germany-raises-terror-threat-level--a4.png",
          "alt": "Baroque allegorical painting: the war-god Mars strides forward with sword and shield, pulled by a torch-bearing Fury, as Venus tries to restrain him and a black-robed figure of Europe throws up her arms in grief above trampled books and instruments.",
          "credit": "Peter Paul Rubens, The Consequences of War (1637–38), Galleria Palatina, Palazzo Pitti, Florence. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Gustav Holst composed 'Mars, the Bringer of War' in 1914, the opening movement of his orchestral suite The Planets, on the eve of the First World War. It is built over a relentless, hammered five-beat ostinato — strings played col legno, with the wood of the bow — that advances like an approaching army, swelling through dissonant brass to a series of crushing, terrifying climaxes. The piece does not depict a battle so much as the dread of one coming: the mechanical, inexorable tread of menace closing in. That is the psychological register of a country raised to a 'high' terror alert — the anxious, watchful anticipation of an attack that has not yet fallen, the sense of a threat marching steadily toward the city.",
        "excerpt": "A relentless orchestral march in an off-kilter five-beat meter, opened by strings striking their strings with the wood of the bow and by a menacing timpani and brass tread that never relents. The music builds through grinding, dissonant harmonies to shattering climaxes, evoking not a battle already joined but the mounting, mechanical dread of one bearing down — the sound of a society bracing for impact.",
        "source": "Gustav Holst, 'Mars, the Bringer of War,' from The Planets, Op. 32 (1914–1916)",
        "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
        "image": {
          "src": "/covers/germany-raises-terror-threat-level--a5.png",
          "alt": "Black-and-white portrait photograph of composer Gustav Holst, in profile with round spectacles, c.1921.",
          "credit": "Photograph of Gustav Holst by Herbert Lambert, c.1921. National Portrait Gallery, London. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "us-funds-maga-aligned-europe-groups",
    "headline": "U.S. State Department to fund MAGA-aligned European groups with grants of up to $3 million",
    "overview": "The Trump administration's State Department is offering grants of up to $3 million to European organizations aligned with the MAGA movement to combat 'censorship' and build 'civilisational bonds' with the United States, the Financial Times reported. Almost $5 million is available, expected to be split among two or three recipients working on issues such as national sovereignty and migration. Critics warned the effort, which repurposes a foreign-aid stream to support hard-right European groups, could deepen European resentment even as Trump presses the continent to spend more on defense.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxPOU4xcVQ5aVRTd3hURWx3clNoS2VWdzJ2QWZqc0g1alM2SHJBdk5zWnZqV01ndFhpMXBUQWlhTXdjVTMtdElHYzl0LXlCcFg3bDkyUjFOWm9hOG1zQzdLQnIyZUZpbGxaOFB3MlhITDhYY2I2UU9MTFJSV2FSdU9sbTA5WHROMXhnNnNGSlJ3MUc2U1Fudmp6Mlp3UWlyN0R0Q01NUkxCczFxbjhOUjM5TE1TMUFQTzVDRFN5emFmZjlsTEpodVVaUFJUZ29sdUF2WkQ0VA?oc=5"
      },
      {
        "name": "U.S. News",
        "href": "https://www.usnews.com/news/world/articles/2026-07-18/trump-administration-to-fund-maga-aligned-projects-in-europe-as-he-reorders-us-aid-ft-reports"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/us-funds-maga-aligned-europe-groups.png",
      "alt": "The Harry S. Truman Building, headquarters of the U.S. Department of State in Washington.",
      "credit": "U.S. Department of State / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 395 BC the Persian empire, unable to beat Sparta on the battlefield, opened its treasury instead. The satrap Tithraustes sent Timocrates the Rhodian to Greece with gold worth fifty silver talents, instructed to bind the leading men of Thebes, Corinth, Argos and Athens into a war against Sparta. The bribes landed, factions were bought, and the Corinthian War duly erupted, weakening a rival power from within. It is the oldest template for what the State Department now proposes: a superpower reaching across borders to bankroll congenial factions and reshape another region's politics with its money rather than its armies.",
        "excerpt": "Being at his wits' end how to manage matters, he resolved to send Timocrates the Rhodian to Hellas with a gift of gold worthy fifty silver talents, and enjoined upon him to endeavour to exchange solemn pledges with the leading men in the several states, binding them to undertake a war against Lacedaemon. Timocrates arrived and began to dole out his presents. In Thebes he gave gifts to Androcleidas, Ismenias, and Galaxidorus; in Corinth to Timolaus and Polyanthes; in Argos to Cylon and his party. ... The recipients of the moneys forthwith began covertly to attack the Lacedaemonians in their respective states, and, when they had brought these to a sufficient pitch of hatred, bound together the most important of them in a confederacy.",
        "source": "Xenophon, Hellenica 3.5.1-2 (trans. H. G. Dakyns)",
        "href": "https://www.gutenberg.org/files/1174/1174-h/1174-h.htm",
        "image": {
          "src": "/covers/us-funds-maga-aligned-europe-groups--a0.png",
          "alt": "A gold Achaemenid Persian daric coin showing a kneeling royal archer, the currency Persia used to subsidise foreign factions.",
          "credit": "Gold daric of the Achaemenid Empire, c. 490 BC. Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "From 1950 the CIA covertly built and financed the Congress for Cultural Freedom, its largest and longest secret operation, to wage a 'war of ideas' against Soviet communism among European intellectuals. Through the front it bankrolled sympathetic magazines across the continent, Encounter in London, Preuves in Paris, Der Monat in Berlin, alongside conferences, exhibitions and prizes, until The New York Times and Ramparts exposed the paymaster in 1966-67. Recipients felt betrayed to learn their independence had been an American purchase. The parallel to Washington's new grants is exact in spirit: a great power quietly underwriting ideologically aligned voices abroad to bend another society's culture toward its own foreign-policy interests.",
        "excerpt": "The Congress for Cultural Freedom was the CIA's most ambitious covert cultural campaign, secretly funding a web of European magazines, writers and conferences to promote an anti-communist consensus. Editors and intellectuals believed themselves free agents; in truth their salaries and print runs flowed from a foreign intelligence service. When the funding was unmasked in 1966-67, the revelation discredited the very people it had subsidised and fuelled lasting resentment of American meddling.",
        "source": "Congress for Cultural Freedom (CIA-funded, 1950-1967); Frances Stonor Saunders, Who Paid the Piper?",
        "href": "https://en.wikipedia.org/wiki/Congress_for_Cultural_Freedom"
      },
      {
        "category": "literary",
        "title": "Facing Philip of Macedon's expansion, Demosthenes warned Athens that Greece was being conquered less by arms than by gold, its politicians bought city by city. In the Third Philippic he contrasts an older Greece that execrated anyone who took foreign money with his own corrupted age, in which loyalty and independence 'have been sold in the market and are gone.' The traitor, once punished with the heaviest penalty, now flaunts his hire without shame. Demosthenes gives voice to exactly the fear critics raise about the MAGA grants: that a foreign power's money, funnelled to willing local hands, hollows out a nation's politics from inside and dissolves the mistrust that once guarded it against outsiders.",
        "excerpt": "It meant that men who took money from those who aimed at dominion or at the ruin of Hellas were execrated by all; that it was then a very grave thing to be convicted of bribery; that the punishment for the guilty man was the heaviest that could be inflicted; that for him there could be no plea for mercy, nor hope of pardon. No orator, no general, would then sell the critical opportunity... They did not barter away the harmony between people and people, nor their own mistrust of the tyrant and the foreigner, nor any of these high sentiments. Where are such sentiments now? They have been sold in the market and are gone.",
        "source": "Demosthenes, Third Philippic, secs. 37-39 (Public Orations of Demosthenes)",
        "href": "https://en.wikisource.org/wiki/The_Public_Orations_of_Demosthenes/Philippic_III"
      },
      {
        "category": "literary",
        "title": "Digging for roots in the wilderness, Shakespeare's exiled Timon unearths gold and delivers the theatre's fiercest indictment of money's corrupting power. This 'yellow slave,' he rages, will 'knit and break religions,' ennoble thieves and seat them 'with senators on the bench,' turning black to white and wrong to right. He names gold the 'common whore of mankind' that 'put'st odds among the route of nations', sowing discord between peoples. The speech distils the anxiety beneath this story: that dollars steered to favoured factions can buy legitimacy, install the once-marginal in seats of power, and set nation against nation.",
        "excerpt": "Gold? yellow, glittering, precious gold?\nThus much of this will make black white, foul fair,\nWrong right, base noble, old young, coward valiant. ...\nThis yellow slave\nWill knit and break religions, bless the accursed,\nMake the hoar leprosy adored, place thieves\nAnd give them title, knee and approbation\nWith senators on the bench... Come, damned earth,\nThou common whore of mankind, that put'st odds\nAmong the route of nations, I will make thee\nDo thy right nature.",
        "source": "Shakespeare, Timon of Athens, Act IV, Scene 3",
        "href": "https://shakespeare.mit.edu/timon/timon.4.3.html"
      },
      {
        "category": "artistic",
        "title": "William Hogarth's 'Canvassing for Votes' (1754-55), the second scene of his Humours of an Election series, stages political corruption as broad comedy. At the centre a bewildered farmer is worked over by agents of both parties, each pressing money and favours into his hands to buy his allegiance, while behind them inns and mobs seethe with bribed loyalty and treats. Hogarth's whole cycle is a satire on how cash, not conviction, decides who governs. Painted for a nation where votes were openly purchased, it is the sharpest visual analogue to a policy of dispensing grants to secure friendly political factions, the transaction dressed up as civic friendship.",
        "excerpt": "An oil painting crowded with figures: a country voter at the centre is courted simultaneously by rival party agents pushing coins and bribes into his palms, oblivious to the bought crowds, tavern banners and brawling supporters around him. Hogarth renders the buying of political loyalty as a bustling, faintly absurd marketplace, money changing hands beneath a veneer of hospitality and goodwill.",
        "source": "William Hogarth, Canvassing for Votes (Humours of an Election, Plate II), 1754-55, Sir John Soane's Museum",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth_-_Soliciting_Votes_-_WGA11457.jpg",
        "image": {
          "src": "/covers/us-funds-maga-aligned-europe-groups--a4.png",
          "alt": "Hogarth's painting Canvassing for Votes: a central voter being bribed by rival party agents amid a crowd of purchased supporters.",
          "credit": "William Hogarth, Canvassing for Votes (c. 1754-55). Web Gallery of Art / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Wagner's music-drama 'Das Rheingold' (1869) opens the Ring cycle with a theft that curses the world. The dwarf Alberich renounces love to seize the Rhinemaidens' gold, forging from it a ring that promises mastery over others, and every subsequent grab for that hoard poisons gods and men alike. The work is Western art's grandest parable of gold pursued as an instrument of domination, wealth converted into power over the wills of others. Arthur Rackham's illustration of the Rhine-daughters lamenting their stolen treasure captures the moment that fascination becomes corruption, a fitting emblem for a plan to convert foreign-aid millions into leverage over another continent's politics.",
        "excerpt": "In this scene from the opera's close, Arthur Rackham draws the Rhinemaidens grieving deep in the river for the gold that has been wrenched away and turned into a ring of power. The gleaming treasure that once brought innocent delight has become an engine of domination the moment it is seized for advantage, and its loss shadows the whole cycle with the theme of wealth wielded to rule others.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (1869); illustration by Arthur Rackham (1910)",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/us-funds-maga-aligned-europe-groups--a5.png",
          "alt": "Arthur Rackham illustration of the Rhinemaidens mourning their stolen Rhinegold, the treasure forged into a ring of power.",
          "credit": "Arthur Rackham, 'The Rhine's fair children, bewailing their lost gold, weep' (1910). Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "cfm-leap-1b-durability-certification",
    "headline": "CFM wins FAA and EASA approval for a durability upgrade to the LEAP-1B engine on the Boeing 737 MAX",
    "overview": "CFM International, the GE Aerospace-Safran joint venture, secured U.S. and European certification for a high-pressure turbine durability kit for its LEAP-1B engine, which powers the Boeing 737 MAX. The company said the upgrade roughly doubles the engine's time on wing in hot and harsh environments such as the Middle East and India, with full production expected to change over in early 2027. CFM also won initial engine-level certification for a novel reverse-bleed cooling system designed to cut fuel-nozzle replacements.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxOa1kyS1VFMTRPTHNBT1FpeC1lWTlvQ1Q1Rk4wX0lQME5NcHBEd2FRX2YyVVUzRHgtNElqMm9WM2l6bGEtVkxZZDBiRVJLZl9RUmZUY1lub2RPT2g4SC1tT2p5dElwSEJPQUN3M2F0dFZ4ZHZOb0JTbVROQWx3WnRnRDZKanRWblBpRjdjT2lGblZacHZ6WTl5djNVMXlJRmY1ZGs2NE1hTjVuQS1P?oc=5"
      },
      {
        "name": "GE Aerospace",
        "href": "https://www.geaerospace.com/news/press-releases/cfm-secures-certification-leap-1b-durability-upgrades"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/cfm-leap-1b-durability-certification.png",
      "alt": "A CFM LEAP turbofan engine mounted under an aircraft wing.",
      "credit": "Thyrome / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1712 Thomas Newcomen's atmospheric engine first harnessed fire and steam to do tireless mechanical work, but it was crude and wasteful; James Watt's separate condenser, patented in 1769, transformed that machine into a durable, efficient workhorse that could run for years and powered the Industrial Revolution. Watt's genius was thermal: he stopped the cylinder from being repeatedly heated and chilled, mastering the punishing cycle of heat that had limited every earlier engine. The surviving Watt-type beam engines, still turning their great flywheels in museums, are monuments to endurance won by taming temperature. That is precisely CFM's challenge with the LEAP-1B durability kit: to conquer the heat cycles that wear an engine down and keep it running far longer between overhauls.",
        "excerpt": "James Watt's decisive 1769 improvement, the separate condenser, kept the working cylinder permanently hot while steam was condensed elsewhere, ending the wasteful heat-and-cool cycle of Newcomen's engine. The result was a heat engine efficient and robust enough to run continuously in mines and mills for decades, becoming the enduring prime mover of the age of steam.",
        "source": "The Watt steam engine and Watt's separate condenser (1769).",
        "href": "https://en.wikipedia.org/wiki/Watt_steam_engine",
        "image": {
          "src": "/covers/cfm-leap-1b-durability-certification--a0.png",
          "alt": "A preserved Watt-type beam steam engine with its tall columns, walking beam and great flywheel on museum display.",
          "credit": "Watt-type beam engine (D. Napier & Son, 1832), ETSII Madrid. Photo Nicolas Perez, CC BY-SA 3.0, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the late 1930s Frank Whittle in Britain and Hans von Ohain in Germany independently built the first working turbojets, and von Ohain's engine flew the Heinkel He 178 in 1939 while Whittle's Power Jets W.1 lifted the Gloster E.28/39 in 1941. Their central struggle was not thrust but survival: white-hot gases and spinning turbines destroyed early engines so quickly that the W.1 had a service life measured in only about ten hours. The whole subsequent history of jet propulsion has been a hunt for metals and cooling that let the hot section endure. CFM's LEAP-1B high-pressure turbine durability kit is the latest chapter of that same quest, roughly doubling how long the engine can stay on wing in scorching climates.",
        "excerpt": "The Power Jets W.1, first flown in the Gloster E.28/39 on 15 May 1941, was the first British turbojet to fly, following von Ohain's engine in the He 178 of 1939. Limited by the materials of its day, the early Whittle engine had a service life of only about ten hours, making durability of the hot turbine section the defining engineering problem of the jet age.",
        "source": "Power Jets W.1 (Whittle) and the first flying turbojets, 1939-1941.",
        "href": "https://en.wikipedia.org/wiki/Power_Jets_W.1",
        "image": {
          "src": "/covers/cfm-leap-1b-durability-certification--a1.png",
          "alt": "The Power Jets W.1 turbojet engine, the first British jet engine to fly, on display at the Science Museum, London.",
          "credit": "Power Jets W.1, Science Museum, London. Photo by Nimbus227, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book XVIII of Homer's Iliad, the smith-god Hephaestus (Vulcan) goes to his forge to make new armor for Achilles, setting twenty bellows to blow on his melting-pots, throwing copper, tin, silver and gold into the fire, and taking up hammer and tongs at his great anvil. It is the oldest and most vivid image in Western literature of a divine craftsman mastering fire and metal, blast by regulated blast, to make something that will endure the shock of battle. Homer even has the bellows blow with graded strength, an ancient intuition of the controlled thermal management that modern engines demand. CFM's durability kit is a distant descendant of that forge: high-tech metallurgy bent on making hot metal survive extreme heat.",
        "excerpt": "When he had so said he left her and went to his bellows, turning them towards the fire and bidding them do their office. Twenty bellows blew upon the melting-pots, and they blew blasts of every kind, some fierce to help him when he had need of them, and others less strong as Vulcan willed it in the course of his work. He threw tough copper into the fire, and tin, with silver and gold; he set his great anvil on its block, and with one hand grasped his mighty hammer while he took the tongs in the other.",
        "source": "Homer, Iliad, Book XVIII (trans. Samuel Butler).",
        "href": "https://classics.mit.edu/Homer/iliad.18.xviii.html"
      },
      {
        "category": "literary",
        "title": "In Book VIII of Virgil's Aeneid, Vulcan descends to his subterranean forge beneath a smoking island near Sicily, where the one-eyed Cyclopes wield heavy hammers on eternal anvils amid hissing steel, roaring water and flames driven through fuming vents. Virgil turns the forge into an industrial hell of fire and iron in which molten silver, brass, gold and deadly steel are rolled into the great furnace to make the shield of Aeneas. The scene is a hymn to controlled violence: raw heat and beaten metal disciplined into something strong enough to sustain war. It captures exactly the theme of CFM's LEAP-1B upgrade, human ingenuity taming fire and metal so that a machine can withstand punishing heat.",
        "excerpt": "Sacred to Vulcan's name, an isle there lay, / Betwixt Sicilia's coasts and Lipare, / Rais'd high on smoking rocks; and, deep below, / In hollow caves the fires of Aetna glow. / The Cyclops here their heavy hammers deal; / Loud strokes, and hissings of tormented steel, / Are heard around; the boiling waters roar, / And smoky flames thro' fuming tunnels soar.",
        "source": "Virgil, Aeneid, Book VIII (trans. John Dryden).",
        "href": "https://classics.mit.edu/Virgil/aeneid.8.viii.html"
      },
      {
        "category": "artistic",
        "title": "Diego Velazquez's Apollo in the Forge of Vulcan (1630, Museo del Prado) shows the god Apollo arriving with unwelcome news at Vulcan's smithy, where muscular smiths freeze mid-blow around a glowing bar of iron on the anvil, tongs and hammers in hand, the furnace throwing warm light across their sweating bodies. Velazquez paints the forge not as myth but as a real, sooty workshop of hard bodily labor and radiant heat, dignifying the craft of working metal with fire. It is the human face of taming furnace and hammer, the very labor that turns raw metal into something enduring. That is the enduring drama behind CFM's LEAP-1B durability kit: mastering fire and metal so an engine can bear the heat.",
        "excerpt": "The painting freezes the smiths mid-labor around the anvil, a bar of iron still glowing orange from the furnace, its heat lighting the astonished faces and straining muscles. Velazquez renders the forge as a place of real toil and radiant fire, where hammer, tongs and flame are the everyday tools of mastering metal.",
        "source": "Diego Velazquez, Apollo in the Forge of Vulcan (1630), Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/cfm-leap-1b-durability-certification--a4.png",
          "alt": "Velazquez's painting of Apollo visiting Vulcan's forge, smiths gathered around a glowing bar of iron on the anvil.",
          "credit": "Diego Velazquez, Apollo in the Forge of Vulcan (1630), Museo del Prado. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In Act I of Wagner's opera Siegfried (1876), the young hero forges the shattered sword Nothung anew, singing the ringing Forging Song (\"Nothung! Nothung! Neidliches Schwert!\") as the orchestra hammers in time with his blows, the anvil, bellows and roaring furnace turned into music. Arthur Rackham's 1911 illustration for the opera captures the smithy in Mime's cave, the smith bent over the anvil as sparks fly and a blade takes shape in the firelight. Both music and image make the forge a place of triumphant creation, where broken metal is reheated and reforged into something stronger than before. That is the spirit of CFM's LEAP-1B durability upgrade, reworking the hot heart of the engine so it endures.",
        "excerpt": "Wagner sets Siegfried's re-forging of Nothung to relentless orchestral hammer-strokes, the music itself beating on an imagined anvil as the bellows roar and the blade is plunged hissing into water. Rackham's illustration answers it in ink and colour, the smith crouched over the anvil in the cave's firelight, sparks leaping as the sword is beaten back into being.",
        "source": "Richard Wagner, Siegfried, WWV 86C, Act I (the Forging Song); illustration by Arthur Rackham (1911).",
        "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)",
        "image": {
          "src": "/covers/cfm-leap-1b-durability-certification--a5.png",
          "alt": "Arthur Rackham's illustration of the smith at the anvil forging a sword in Mime's cave, from Wagner's Siegfried.",
          "credit": "Arthur Rackham, illustration for Wagner's Siegfried (1911). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "nokia-hmd-ai-button-feature-phones",
    "headline": "HMD launches four Nokia-branded 4G feature phones with a dedicated AI-assistant button",
    "overview": "HMD unveiled four Nokia-branded 4G feature phones, the Nokia 210 4G, 200 4G, and second-edition 215 4G and 235 4G, that pair physical keypads with a dedicated button for a voice AI assistant powered by the Chinese firm Sikey AI. The button can set alarms, open the camera, toggle a torch or place calls, and comes with a 180-day trial before subscription fees apply. The retro-styled handsets add USB-C charging, up to 13 days of standby and HMD's cloud services, though some users have dismissed the AI feature as a gimmick.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/18/nokia-dumbphones-ai-powered-buttons-this-week/"
      },
      {
        "name": "Digital Trends",
        "href": "https://www.digitaltrends.com/phones/hdm-just-launched-four-dumb-phones-with-a-nokia-badge-and-an-ai-button/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/nokia-hmd-ai-button-feature-phones.png",
      "alt": "A Nokia-branded feature phone with a physical keypad.",
      "credit": "Diamante Phi / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In the 1780s the Hungarian engineer Wolfgang von Kempelen built a wooden box fitted with a bellows for lungs, a vibrating reed for vocal cords, and a rubber funnel of a mouth that a demonstrator squeezed and stopped with his fingers until it wheezed out recognizable words like 'Mama,' 'Papa' and 'Roma.' Audiences leaned in astonished that a contraption of leather and wind could seem to speak, half-charmed and half-suspecting a trick. The engraving above shows just such an 18th-century speaking machine, its keys and pipes laid bare. It is the same bargain HMD now offers: a plain, familiar object, this time a Nokia keypad phone, made to talk back through a dedicated button, its novelty hovering between marvel and gimmick just as Kempelen's box did two centuries ago.",
        "excerpt": "Von Kempelen's 'speaking machine' forced air from a bellows through a reed and a flexible leather resonator, its consonants shaped by an operator's fingers pressing against openings in the tube. Working it like an instrument, he coaxed out whole short words and phrases, the first device to synthesize connected human speech rather than isolated sounds. Contemporaries reported a voice that was uncanny and childlike, and argued over whether it was genuine science or clever showmanship.",
        "source": "Wolfgang von Kempelen, speaking machine (c. 1769-1791), described in Mechanismus der menschlichen Sprache",
        "href": "https://en.wikipedia.org/wiki/Wolfgang_von_Kempelen%27s_speaking_machine",
        "image": {
          "src": "/covers/nokia-hmd-ai-button-feature-phones--a0.png",
          "alt": "Engraving of an 18th-century speaking machine with bellows, pipes and a keyboard mechanism, labelled Fig. 1",
          "credit": "Engraving of von Kempelen's speaking machine, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "On a December day in 1877 Thomas Edison walked into the New York offices of Scientific American, set a small tin-foil cylinder machine on a desk, and turned its crank; to the astonishment of the assembled editors the little box asked after their health and wished them good night in Edison's own recorded voice. No one had ever heard a machine reproduce human speech before, and the editors scrambled to describe a device that could hold a voice captive and give it back on demand. The tin-foil phonograph, a replica of which is shown above, was the original voice-in-a-box. HMD's feature phones update the wonder rather than invent it: press a button and a stored intelligence speaks, exactly the trick that made a roomful of hardened engineers marvel almost 150 years ago.",
        "excerpt": "Mr. Thomas A. Edison recently came into this office, placed a little machine on our desk, turned a crank, and the machine inquired as to our health, asked how we liked the phonograph, informed us that it was very well, and bid us a cordial good night.",
        "source": "\"The Talking Phonograph,\" Scientific American, Vol. 37, No. 25 (December 22, 1877)",
        "href": "https://archive.org/stream/scientific-american-1877-12-22/scientific-american-v37-n25-1877-12-22_djvu.txt",
        "image": {
          "src": "/covers/nokia-hmd-ai-button-feature-phones--a1.png",
          "alt": "Replica of Edison's 1877 tin-foil cylinder phonograph, a hand-cranked brass and wood machine",
          "credit": "Replica of Edison's 1877 tin-foil phonograph, photo by Gregory F. Maxwell, via Wikimedia Commons (GFDL 1.2)"
        }
      },
      {
        "category": "literary",
        "title": "In Robert Greene's Elizabethan comedy Friar Bacon and Friar Bungay, the friar labors seven years to build a head of brass that, once it speaks, will supposedly wall all England in protective bronze. He must catch its first words or the magic fails, yet when he finally sleeps and leaves the servant Miles to watch, the head utters only three cryptic fragments, 'Time is,' 'Time was,' 'Time is past,' before a mysterious hand shatters it. Miles mocks the oracle as an absurd waste of study, unimpressed that a marvel of engineering answers 'with syllables.' It is the oldest complaint about the talking machine, and precisely the one leveled at HMD's AI button: an object built at great effort to speak, dismissed by some users as delivering little more than a gimmick.",
        "excerpt": "THE BRAZEN HEAD. Time is.\nMILES. Time is! Why, Master Brazen-head, have you such a capital nose, and answer you with syllables, Time is? Is this all my master's cunning, to spend seven years' study about Time is?...\nTHE BRAZEN HEAD. Time was...\nTHE BRAZEN HEAD. Time is past.\nThen there is a flash of lightning and a hand appears, which breaks the Head with a hammer.",
        "source": "Robert Greene, Friar Bacon and Friar Bungay (c. 1590), Scene xi",
        "href": "https://www.luminarium.org/renascence-editions/greene2.html"
      },
      {
        "category": "literary",
        "title": "In E. T. A. Hoffmann's 1816 tale The Sandman, the student Nathanael falls hopelessly in love with Olimpia, a beautiful young woman who turns out to be a wind-up automaton assembled by a professor and an eye-maker. Through whole evenings of poured-out passion she answers only with a sighed 'Ach! Ach!', and Nathanael, hearing profundity in her mechanical silence, takes her cold rigidity for a deep and understanding soul. Others find her stiff, taciturn and stupid; he alone is enchanted, mistaking a talking device for a companion. The story anticipates exactly the split reaction to HMD's voice assistant: a manufactured voice in a familiar-seeming shell that some greet as a wonder and others wave off as a hollow trick.",
        "excerpt": "...for she sat with her eyes fixed unchangeably upon his, sighing repeatedly, \"Ach! Ach! Ach!\" Upon this Nathanael would answer, \"Oh, you glorious heavenly lady! You ray from the promised paradise of love! Oh! what a profound soul you have! my whole being is mirrored in it!\" and a good deal more in the same strain. But Olimpia only continued to sigh \"Ach! Ach!\" again and again.",
        "source": "E. T. A. Hoffmann, \"The Sand-Man\" (Der Sandmann, 1816), English translation",
        "href": "https://gutenberg.net.au/ebooks06/0605791h.html"
      },
      {
        "category": "artistic",
        "title": "On the Sistine Chapel ceiling Michelangelo painted the Delphic Sibyl (1509), a young prophetess who turns sharply from her open scroll as though startled by the voice speaking through her, her eyes wide and her lips just parted. In the ancient world the Delphic oracle was the ultimate voice-from-a-source, a human mouthpiece delivering the god's answers to anyone who came to ask. Michelangelo monumentalizes that idea of a seer who gives voice to hidden knowledge on demand. HMD's dedicated AI button revives the same ancient fantasy in the palm of the hand: press it and the small oracle in the box answers your question, sets your alarm, or opens your camera, the modern heir to the sibyl at Delphi.",
        "excerpt": "Michelangelo's fresco shows the Delphic Sibyl seated among painted marble, a book of prophecy held open in one hand as she twists to look outward, brow furrowed and mouth slightly open. Draped in blue, gold and green, she embodies the prophetic voice that answers those who consult it, a human vessel through which unseen knowledge is made to speak.",
        "source": "Michelangelo Buonarroti, The Delphic Sibyl, Sistine Chapel ceiling (1509), Vatican",
        "href": "https://commons.wikimedia.org/wiki/File:Michelangelo_-_Delphic_Sibyl.jpg",
        "image": {
          "src": "/covers/nokia-hmd-ai-button-feature-phones--a4.png",
          "alt": "Michelangelo's fresco of the Delphic Sibyl, a young prophetess with an open scroll turning to look outward",
          "credit": "Michelangelo, The Delphic Sibyl (1509), Sistine Chapel; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "This 1789 engraving by Joseph Racknitz shows a cutaway of the Mechanical Turk, the celebrated chess-playing automaton built by Wolfgang von Kempelen: a turbaned figure seated at a cabinet whose opened doors are meant to reveal only gears and clockwork. In truth a hidden human operator crouched inside worked the levers, so the 'thinking machine' was really a person's intelligence dressed in wood and brass. For decades audiences across Europe were dazzled, unsure whether they faced a genuine automaton or a clever fraud. It is the perfect emblem for HMD's talking phones, where the friendly voice on a retro keypad is in fact powered by remote AI software behind the scenes, an old familiar object given an uncanny new voice and, after 180 days, a fee.",
        "excerpt": "Racknitz's engraving diagrams the interior of von Kempelen's chess automaton, exposing panels, machinery and the cramped space where he believed the concealed operator sat. The turbaned Turk leans over its board as spectators are invited to marvel at a machine that seems to reason, while the real cleverness is hidden inside the cabinet, an early study in how a device can appear to possess a mind of its own.",
        "source": "Joseph Friedrich zu Racknitz, engraving of the Mechanical Turk, from Ueber den Schachspieler des Herrn von Kempelen (1789)",
        "href": "https://commons.wikimedia.org/wiki/File:Racknitz_-_The_Turk_3.jpg",
        "image": {
          "src": "/covers/nokia-hmd-ai-button-feature-phones--a5.png",
          "alt": "1789 engraving showing a cutaway of the Mechanical Turk chess automaton with its internal mechanism exposed",
          "credit": "Joseph Racknitz, engraving of the Mechanical Turk (1789); via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "hdfc-bank-q1-profit-rises",
    "headline": "HDFC Bank's quarterly profit rises 5% to 190.6 billion rupees as bad-loan provisions fall",
    "overview": "India's HDFC Bank, the country's largest private-sector lender, reported an April-June net profit of 190.6 billion rupees ($2.2 billion), up 5% from a year earlier, helped by a 79% drop in provisions for bad loans. Net interest income rose about 7% to 335.3 billion rupees, gross advances grew 15.4% and deposits climbed 14.7% year on year. Asset quality improved from a year ago, with gross non-performing assets at 1.17% of loans.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Business Standard",
        "href": "https://www.business-standard.com/companies/quarterly-results/hdfc-bank-q1fy27-results-net-profit-rises-5-to-19-060-cr-nii-grows-7-126071800598_1.html"
      },
      {
        "name": "Business Today",
        "href": "https://www.businesstoday.in/markets/stocks/story/hdfc-bank-q1-results-net-profit-rises-5-to-rs-19060-crore-nii-up-6-7-key-takeaways-543764-2026-07-18"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-18",
    "image": {
      "src": "/covers/hdfc-bank-q1-profit-rises.png",
      "alt": "An HDFC Bank branch sign in India.",
      "credit": "Jayanta / Wikimedia Commons"
    },
    "edition": "Evening Edition · 18 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1397 Giovanni di Bicci de' Medici moved his small bank from Rome to Florence and founded what would become the largest and most respected banking house in fifteenth-century Europe. Run as a single Florentine partnership that held the controlling share in each of its branches, from Venice to Bruges and London, the Medici bank refined the double-entry ledger and turned careful reckoning into dynastic power, its profits underwriting the family's rise to unofficial rule of the republic. Its fortune rested less on daring than on disciplined accounts, prudent credit and reserves held against loss. HDFC Bank's steadily compounding quarter, its swelling deposits and shrinking provisions, is the same old counting-house arithmetic that once built the house of Medici: patient, ledgered gain accumulating into a great financial estate.",
        "excerpt": "The Medici bank's founding is dated to 1397, when Giovanni di Bicci de' Medici separated his bank from his nephew's and moved it to Florence. It became the largest and most respected bank in Europe during its prime, operating branches across the continent as a single Florentine partnership. Among its contributions to banking and accounting was the improvement of the general ledger through the development of the double-entry system.",
        "source": "The Medici Bank (founded 1397), Florence",
        "href": "https://en.wikipedia.org/wiki/Medici_Bank",
        "image": {
          "src": "/covers/hdfc-bank-q1-profit-rises--a0.png",
          "alt": "Portrait of Giovanni di Bicci de' Medici, founder of the Medici bank",
          "credit": "Portrait of Giovanni di Bicci de' Medici (Uffizi), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "On 27 July 1694, three centuries after the Medici, a royal charter incorporated 'The Governor and Company of the Bank of England,' founded on a scheme by the Scottish projector William Paterson to lend a cash-strapped crown 1.2 million pounds for its war with France. The subscription was filled in just twelve days by 1,268 investors, from merchants and esquires to the king and queen themselves, binding public credit to a permanent institution of accounts. From that founding grew the modern architecture of deposits, reserves and disciplined lending on which great banks still stand. HDFC Bank, India's largest private-sector lender reporting swelling advances and deposits, is a distant heir to that 1694 counting-house model: the great chartered house of finance, prospering by prudent lending and the careful management of other people's money.",
        "excerpt": "The Bank of England was established by royal charter on 27 July 1694 under the Tonnage Act, its subscribers incorporated as 'The Governor and Company of the Bank of England.' Proposed by William Paterson to fund the government during the Nine Years' War, it raised 1.2 million pounds in just twelve days from 1,268 subscribers, including King William and Queen Mary. From this founding grew the modern system of public credit and central banking.",
        "source": "Founding of the Bank of England, 27 July 1694",
        "href": "https://www.bankofengland.co.uk/about/history",
        "image": {
          "src": "/covers/hdfc-bank-q1-profit-rises--a1.png",
          "alt": "The Sealing of the Bank of England Charter, 1694",
          "credit": "The Sealing of the Bank of England Charter, 1694, by Lady Jane Lindsay (1905), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "In the Gospel of Matthew, Jesus tells of a lord who, before a long journey, entrusts his money to three servants and later returns to reckon accounts with them. Two put the talents to work and double them, and are welcomed as 'good and faithful'; the third, who fearfully buried his single talent in the earth, is condemned, and told he ought at least to have put the money 'to the exchangers' to be repaid with interest. It is scripture's great parable of prudent stewardship: capital hidden away is capital wasted, while capital wisely lent and multiplied is rewarded. HDFC Bank's quarter, its advances up more than fifteen percent and its bad-loan provisions falling by nearly four-fifths, reads like the faithful servant's reckoning, money put to work, losses guarded against, and gain brought back to the lord of the ledger.",
        "excerpt": "25:14 For the kingdom of heaven is as a man travelling into a far country, who called his own servants, and delivered unto them his goods. 25:15 And unto one he gave five talents, to another two, and to another one; to every man according to his several ability; and straightway took his journey. 25:16 Then he that had received the five talents went and traded with the same, and made them other five talents. 25:17 And likewise he that had received two, he also gained other two. 25:18 But he that had received one went and digged in the earth, and hid his lord's money. 25:19 After a long time the lord of those servants cometh, and reckoneth with them. 25:20 And so he that had received five talents came and brought other five talents, saying, Lord, thou deliveredst unto me five talents: behold, I have gained beside them five talents more. 25:21 His lord said unto him, Well done, thou good and faithful servant: thou hast been faithful over a few things, I will make thee ruler over many things: enter thou into the joy of thy lord. 25:26 His lord answered and said unto him, Thou wicked and slothful servant, thou knewest that I reap where I sowed not, and gather where I have not strawed: 25:27 Thou oughtest therefore to have put my money to the exchangers, and then at my coming I should have received mine own with usury.",
        "source": "Gospel of Matthew 25:14-27, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Matthew"
      },
      {
        "category": "literary",
        "title": "In 'The Way to Wealth' (1758), Benjamin Franklin gathers a quarter-century of Poor Richard's proverbs into the sermon of old Father Abraham, who preaches industry and thrift to a crowd waiting on an auction. His homely warnings against waste, that small expenses add up and that 'a small leak will sink a great ship,' turn frugality into a moral and financial science, the art of guarding what one has earned. The whole essay is a hymn to prudent gain and provision against loss. HDFC Bank's quarter tells the same lesson in a modern ledger: its 79 percent drop in bad-loan provisions and its improved asset quality are Franklin's careful housekeeping written large, the great house that prospers because it minds its small leaks.",
        "excerpt": "You may think perhaps, that a little Tea, or a little Punch now and then, Diet a little more costly, Clothes a little finer, and a little Entertainment now and then, can be no great Matter; but remember what Poor Richard says, Many a Little makes a Mickle. Beware of little expenses; A small Leak will sink a great Ship; and again, Who Dainties love, shall Beggars prove; and moreover, Fools make Feasts, and wise Men eat them. Buy what thou hast no Need of, and ere long thou shalt sell thy Necessaries.",
        "source": "Benjamin Franklin, 'The Way to Wealth' (1758)",
        "href": "https://monadnock.net/franklin/wealth.html"
      },
      {
        "category": "artistic",
        "title": "Quentin Matsys' 'The Moneylender and His Wife' (1514), in the Louvre, shows an Antwerp banker in his counting-house delicately weighing gold coins and pearls on a small balance, while his richly dressed wife, distracted from her illuminated book of devotion, turns her eyes toward the glinting money. Coins, rings, a convex mirror and account books crowd the table in exquisite detail, and the scene hovers between admiration for careful commerce and warning against worldly greed. It is the definitive portrait of the ledger and the scale, the meticulous reckoning of value that is banking's oldest ritual. HDFC Bank's quarterly results, weighing income against provisions, gains against losses on a vast balance, are the same act of measurement Matsys painted five centuries ago in the temple of coin.",
        "excerpt": "An oil-on-panel painting in which an Antwerp moneylender weighs gold coins and jewels on a fine balance, his wife beside him pausing over an illuminated prayer-book to watch the money. The table is laid with coins, rings, pearls, a weighing-scale and a convex mirror rendered in minute detail. The picture is at once a celebration of careful commerce and a moral meditation on the pull of worldly wealth.",
        "source": "Quentin Matsys, The Moneylender and His Wife (1514), Musee du Louvre",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010061690",
        "image": {
          "src": "/covers/hdfc-bank-q1-profit-rises--a4.png",
          "alt": "The Moneylender and His Wife by Quentin Matsys, 1514, a banker weighing gold coins beside his wife",
          "credit": "Quentin Matsys, The Moneylender and His Wife (1514), Musee du Louvre, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "A generation later, Marinus van Reymerswaele took up the same subject in 'The Moneychanger and His Wife' (1539), now in the Prado, painting a gaunt money-changer in an old-fashioned hat hunched over his coins while his wife records the sums in a ledger. Where Matsys was serene, Reymerswaele is sharper and almost caricatured, the faces intent, the coins heaped, the account-book open, emphasizing the relentless tallying at the heart of finance. The painting became one of the most copied images of the counting-house in Northern Europe, a byword for money weighed and written down. HDFC Bank's earnings statement, deposits up 14.7 percent and every rupee of provision counted and reckoned, is that ledger brought forward into the present, the endless, exacting bookkeeping on which a great house of finance is built.",
        "excerpt": "An oil painting of a lean money-changer seated at his table, counting and weighing coins, while his wife enters the figures in an open account-book. The scene is crowded with stacked coins, documents and the instruments of reckoning, its faces rendered with an almost satirical intensity. One of the most influential and frequently copied images of the counting-house in sixteenth-century Northern European art.",
        "source": "Marinus van Reymerswaele, The Moneychanger and His Wife (1539), Museo del Prado",
        "href": "https://commons.wikimedia.org/wiki/File:Marinus_Claesz._van_Reymerswaele_001.jpg",
        "image": {
          "src": "/covers/hdfc-bank-q1-profit-rises--a5.png",
          "alt": "The Moneychanger and His Wife by Marinus van Reymerswaele, 1539, a money-changer counting coins as his wife keeps the ledger",
          "credit": "Marinus van Reymerswaele, The Moneychanger and His Wife (1539), Museo del Prado, via Wikimedia Commons (public domain)"
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
