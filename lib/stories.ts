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
    "rank": 1
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
    "rank": 2
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
    "rank": 3
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
    "rank": 4
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
    "rank": 5
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
    "rank": 6
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
    "rank": 7
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
    "rank": 8
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
    "rank": 9
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
    "rank": 10
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
    "rank": 11
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
    "rank": 12
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
    "rank": 13
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
    "rank": 14
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
    "rank": 15
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
    "rank": 16
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
    "rank": 17
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
    "rank": 18
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
    "rank": 19
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
    "rank": 20
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
    "rank": 21
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
    "rank": 22
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
    "rank": 23
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
    "rank": 24
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
    "rank": 25
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
    "rank": 26
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
    "rank": 27
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
    "rank": 28
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
    "rank": 29
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
    "rank": 30
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
    "rank": 31
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
    "rank": 32
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
    "rank": 33
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
    "rank": 34
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
    "rank": 35
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
    "rank": 36
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
    "rank": 37
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
    "rank": 38
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
