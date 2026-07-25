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
// the Morning Edition of 25 July 2026 (ranks 1-13) leads with its hero story,
// followed by the Evening Edition of 24 July 2026 and the Morning Edition of 24 July 2026.
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
      "slug": "india-education-minister-resigns-protests",
      "headline": "India's education minister Dharmendra Pradhan resigns after weeks of student-led 'Cockroach' protests over exam-paper leaks",
      "overview": "Dharmendra Pradhan resigned as India's education minister on Saturday, the biggest concession yet by Prime Minister Narendra Modi's government to a months-long youth movement. Demonstrators tied to the satirical Cockroach Janta Party had held nationwide sit-ins and hunger strikes demanding his removal over leaks in the country's most competitive entrance exams. The protests channel wider anger among young Indians over exam integrity, job scarcity and government accountability.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimgFBVV95cUxQUXFJdGduZGxPd1kyNS03UGZzRjR2eW9oRjVMUGtwV3dsZTcxZlVlRnJtblUzVVdXRmNHZkxpWnZjWktlNFNHaDJrSXp0VTdmSWJiWk0tLUxOMzBERU9Zc0h3a2owckFaa1JGRlcyQm9LeUFsSXZDcUE0TFVLVmNadDVvaFNuLXhCNlQxLVZUM3oycHU0SkQzM3RR?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPajR0a3JtLUFZTGVwMWJFUDdCR2M1UlpfRGpUU3FEUmlsM3lsNnlsNGMzNkx4VFRlVmNyWUdvTHgwbFBuaVF2czduWDdDNXg2X3Z2M0pOTEFSZklJaVBVbXlYLTZ0czY5V0lUWjNob0d0SnF5NWE4dDlUamNvUTVDT2ZrV1l4dmNVdEZjbVl3YjJYajJ1RDJwbzNZWjdWZGdoNm11NUhvb1hiVEhmbU1rRDZEeVBmdDBlS3c?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/india-education-minister-resigns-protests.png",
        "alt": "Portrait of India's Union Education Minister Dharmendra Pradhan",
        "credit": "Dharmendra Pradhan, Minister of Education, Government of India; Government Open Data License – India, via Wikimedia Commons."
      },
      "lead": true,
      "rank": 1,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Cicero, First Oration against Verres (In Verrem), 70 BC (trans. C. D. Yonge)",
          "excerpt": "Caius Verres is brought to trial as a criminal, a man condemned in the opinion of every one by his life and actions, but acquitted by the enormousness of his wealth according to his own hope and boast. I, O judges, have undertaken this cause as prosecutor with the greatest good wishes and expectation on the part of the Roman people, not in order to increase the unpopularity of the senate, but to relieve it from the discredit which I share with it. For I have brought before you a man, by acting justly in whose case you have an opportunity of retrieving the lost credit of your judicial proceedings, of regaining your credit with the Roman people, and of giving satisfaction to foreign nations; a man, the embezzler of the public funds, the petty tyrant of Asia and Pamphylia, the robber who deprived the city of its rights, the disgrace and ruin of the province of Sicily.",
          "source": "Cicero's prosecution of Gaius Verres, the rapacious governor of Sicily, whose guilt was so plain to public opinion that he fled Rome into exile before judgment; it echoes India's education minister Dharmendra Pradhan, a discredited official driven from office by mounting public pressure. C. D. Yonge translation via Wikisource.",
          "href": "https://en.wikisource.org/wiki/Against_Verres/First_pleading",
          "image": {
            "src": "/covers/india-education-minister-resigns-protests--a0.png",
            "alt": "Ancient marble bust of the Roman orator Cicero",
            "credit": "Portrait bust of Cicero (1st century BC), Palazzo Nuovo, Musei Capitolini, Rome; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "The April Revolution, South Korea (1960)",
          "excerpt": "In April 1960 South Korean students poured into the streets after a brazenly rigged election and the killing of a young protester whose battered body washed up in Masan harbor. Within days the demonstrations spread nationwide and professors joined their students, until the aging strongman Syngman Rhee, who had ruled for twelve years, resigned and fled into exile. It stands among the twentieth century's clearest cases of a student movement forcing a nation's leader from power.",
          "source": "The Library of Congress research guide to South Korea's April Revolution, when a nationwide student uprising over a rigged election forced President Syngman Rhee to resign — a modern parallel to youth protests toppling a top official.",
          "href": "https://guides.loc.gov/south-korean-democratization-movement/april-19-revolution",
          "image": {
            "src": "/covers/india-education-minister-resigns-protests--a1.png",
            "alt": "Portrait photograph of Syngman Rhee",
            "credit": "Portrait of Syngman Rhee, first President of South Korea; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Victor Hugo, Les Misérables, Vol. V 'Jean Valjean' (1862)",
          "excerpt": "Yes, instruction! light! light! everything comes from light, and to it everything returns. Citizens, the nineteenth century is great, but the twentieth century will be happy.",
          "source": "Enjolras's speech from the ABC students' barricade in Hugo's novel of the 1832 Paris uprising, Isabel F. Hapgood's translation (Project Gutenberg) — the classic literary vision of idealistic youth rising against an unjust order.",
          "href": "https://www.gutenberg.org/cache/epub/135/pg135.txt",
          "image": {
            "src": "/covers/india-education-minister-resigns-protests--a2.png",
            "alt": "Photographic portrait of Victor Hugo",
            "credit": "Victor Hugo photographed by Étienne Carjat, 1876; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The Book of Daniel 5:25–28, King James Bible (1611)",
          "excerpt": "And this is the writing that was written, MENE, MENE, TEKEL, UPHARSIN. This is the interpretation of the thing: MENE; God hath numbered thy kingdom, and finished it. TEKEL; Thou art weighed in the balances, and art found wanting. PERES; Thy kingdom is divided, and given to the Medes and Persians.",
          "source": "Daniel reads the writing on the wall to King Belshazzar, warning that the mighty ruler has been weighed and found wanting — the prophet confronting power and reckoning delivered against the unaccountable (King James Version, Project Gutenberg).",
          "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
          "image": {
            "src": "/covers/india-education-minister-resigns-protests--a3.png",
            "alt": "Rembrandt painting of Belshazzar recoiling from glowing Hebrew writing on the wall",
            "credit": "Rembrandt, Belshazzar's Feast (c. 1635–1638), National Gallery, London; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Eugène Delacroix, Liberty Leading the People (1830)",
          "excerpt": "Delacroix's vast canvas of the July 1830 revolution shows an allegory of Liberty striding across the barricade, tricolour in one hand and a musket in the other, leading a ragged crowd of workers, a top-hatted bourgeois and a pistol-waving boy over the bodies of the fallen. It is the defining image of a people rising as one to topple a discredited ruler.",
          "source": "Delacroix's icon of the July Revolution that drove King Charles X from the throne, now in the Louvre — the emblematic depiction of the people rising to bring down those in power.",
          "href": "https://commons.wikimedia.org/wiki/File:Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg",
          "image": {
            "src": "/covers/india-education-minister-resigns-protests--a4.png",
            "alt": "Allegorical figure of Liberty holding a tricolour flag and leading a crowd over a barricade",
            "credit": "Eugène Delacroix, Liberty Leading the People (1830), Louvre; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Rouget de Lisle, La Marseillaise (1792)",
          "excerpt": "Claude-Joseph Rouget de Lisle wrote his war song in Strasbourg in 1792; it swept France as 'La Marseillaise' and became the archetypal call for citizens to rise against tyranny, its opening summons — 'Allons enfants de la Patrie' — rallying crowds against unjust power ever since. Isidore Pils's painting captures the electric moment of its first performance, the composer's voice seizing a roomful of listeners.",
          "source": "France's revolutionary anthem, composed by Claude-Joseph Rouget de Lisle in 1792, with scores at IMSLP — the archetypal song of citizens summoned to rise against tyranny; the image is Pils's painting of its first singing.",
          "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)",
          "image": {
            "src": "/covers/india-education-minister-resigns-protests--a5.png",
            "alt": "Painting of Rouget de Lisle singing La Marseillaise to a gathered group",
            "credit": "Isidore Pils, Rouget de Lisle chantant la Marseillaise (1849), Musée historique de Strasbourg; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "guterres-un-chief-syria-visit",
      "headline": "UN Secretary-General Antonio Guterres visits Syria, the first trip by a UN chief since before the 2011 civil war",
      "overview": "Antonio Guterres arrived in Damascus on Saturday for the first visit by a United Nations secretary-general since Ban Ki-moon in 2009, before Syria's civil war. He was welcomed by Foreign Minister Asaad al-Shaibani and is due to meet President Ahmed al-Sharaa, whose government took power after the fall of Bashar al-Assad. Guterres said the three-day trip is meant to reaffirm UN support for Syria's transition after more than 13 years of conflict.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxPNnQ1ZzI5WjVHajNLZnJhZTRwYndTLUZVZHVldS13NF8xSDdQRzNDcFc2UWQ2TXhvUWtDMEdsUFVOSEZBcE1YX3hfZ1pJNG44UjdlNnNDTkwwM01MQy1qWkRkck1yVjU4Y2pRY3c5VC1hZVVudDZTbEhIOWlOS19SNk44WUNkQ0lTNGxtRWlTXzUtT0UwTmVOTzltUl80V3JsZTBjZHdwYjA3ejBpMnB1YnBKZ1p4WjZyLWc?oc=5"
        },
        {
          "name": "Al Jazeera",
          "href": "https://www.aljazeera.com/news/2026/7/25/guterres-arrives-in-syria-in-first-official-visit-by-a-un-chief-in-17-years"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/guterres-un-chief-syria-visit.png",
        "alt": "Portrait of United Nations Secretary-General Antonio Guterres speaking at a podium",
        "credit": "Photograph of UN Secretary-General Antonio Guterres (2019) by Cancilleria Argentina; CC BY 2.0, via Wikimedia Commons."
      },
      "rank": 2,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Book of Nehemiah, chapters 1-2 (c. 445 BC), King James Version",
          "excerpt": "Then said I unto them, Ye see the distress that we are in, how Jerusalem lieth waste, and the gates thereof are burned with fire: come, and let us build up the wall of Jerusalem, that we be no more a reproach. Then I told them of the hand of my God which was good upon me; as also the king's words that he had spoken unto me. And they said, Let us rise up and build. So they strengthened their hands for this good work.",
          "source": "The Hebrew Bible's account of a royal envoy who returns from Babylonian exile to a Jerusalem lying in ruins and rallies its people to rebuild the city walls (KJV via Wikisource), echoing an outsider bearing hope who calls a broken city back to reconstruction.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Nehemiah",
          "image": {
            "src": "/covers/guterres-un-chief-syria-visit--a0.png",
            "alt": "Engraving of Nehemiah on horseback surveying the ruined walls of Jerusalem by night",
            "credit": "Gustave Dore, Nehemiah Views the Ruins of Jerusalem's Walls, engraving from La Grande Bible de Tours (1866); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Procopius of Caesarea, Buildings (De Aedificiis), Book II (c. 550s AD)",
          "excerpt": "Thus did the Emperor Justinian reconstruct the walls of Antiochia; he also rebuilt the entire city, which was burnt by the enemy. As the whole city was reduced to ashes, and levelled to the ground, and only heaps of rubbish remained after the conflagration, it was at first impossible for the citizens of Antiochia to recognise the site of their own dwellings.",
          "source": "The Byzantine court historian describes how the emperor Justinian restored the great Syrian city of Antioch after it was burned to ashes by the Persians (Aubrey Stewart's 1888 translation via Project Gutenberg), a literal account of rebuilding a devastated Syrian city that resonates with UN pledges to support Syria's reconstruction.",
          "href": "https://www.gutenberg.org/files/65404/65404-h/65404-h.htm",
          "image": {
            "src": "/covers/guterres-un-chief-syria-visit--a1.png",
            "alt": "Byzantine mosaic of Emperor Justinian I and his retinue in the Basilica of San Vitale, Ravenna",
            "credit": "Emperor Justinian I mosaic, Basilica of San Vitale, Ravenna (c. 547 AD); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Homer, The Odyssey, Book XIII (c. 8th century BC), trans. Samuel Butler",
          "excerpt": "As she spoke the goddess dispersed the mist and the land appeared. Then Ulysses rejoiced at finding himself again in his own land, and kissed the bounteous soil; he lifted up his hands and prayed to the nymphs.",
          "source": "Homer's epic of the war-weary wanderer's long-delayed homecoming to Ithaca, where the mist lifts to reveal a homeland changed after twenty years of absence and war (Samuel Butler's prose translation via Project Gutenberg), an image of return after long separation.",
          "href": "https://www.gutenberg.org/files/1727/1727-h/1727-h.htm",
          "image": {
            "src": "/covers/guterres-un-chief-syria-visit--a2.png",
            "alt": "Painting of Athena revealing the coast of Ithaca to a returning Ulysses",
            "credit": "Giuseppe Bottani, Athena Revealing Ithaca to Ulysses (18th century); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The Book of Isaiah, chapter 61 (c. 6th century BC), King James Version",
          "excerpt": "To appoint unto them that mourn in Zion, to give unto them beauty for ashes, the oil of joy for mourning, the garment of praise for the spirit of heaviness; that they might be called trees of righteousness, the planting of the LORD, that he might be glorified. And they shall build the old wastes, they shall raise up the former desolations, and they shall repair the waste cities, the desolations of many generations.",
          "source": "The prophet Isaiah's promise of comfort to those who mourn and of raising ruined cities from generations of desolation (KJV via Wikisource), a vision of consolation and rebuilding for a broken land.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah",
          "image": {
            "src": "/covers/guterres-un-chief-syria-visit--a3.png",
            "alt": "Section of the ancient Great Isaiah Scroll from the Dead Sea Scrolls, written in Hebrew on parchment",
            "credit": "The Great Isaiah Scroll (1QIsa-a), Dead Sea Scrolls, Shrine of the Book, Israel Museum, Jerusalem; Google Art Project, public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "David Roberts, Baalbec - Ruins of the Temple of Bacchus (1839)",
          "excerpt": "Roberts' luminous lithograph rises over toppled columns and shattered entablatures of a once-magnificent temple, tiny figures dwarfed by the golden stone of a Near Eastern city fallen into ruin. Drawn on the artist's celebrated journey through the Ottoman Levant, it fixes the grandeur and desolation of a great regional metropolis in decay - a Romantic emblem of splendour laid waste and awaiting renewal.",
          "source": "The Scottish painter David Roberts' famous 1839 view of the ruined temples of Baalbek in the Ottoman Levant (via Wikimedia Commons), a vivid image of a magnificent Near Eastern city broken by time and violence.",
          "href": "https://commons.wikimedia.org/wiki/File:David_Roberts_-_Baalbec_-_Ruins_of_the_Temple_of_Bacchus_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/guterres-un-chief-syria-visit--a4.png",
            "alt": "Lithograph of the ruined columns of the Temple of Bacchus at Baalbek in the Levant",
            "credit": "David Roberts, Baalbec - Ruins of the Temple of Bacchus (1839), lithograph; Google Art Project, public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Johannes Brahms, Ein deutsches Requiem (A German Requiem), Op. 45 (1868)",
          "excerpt": "Brahms' German Requiem opens not with dread but with consolation, its low strings and hushed chorus intoning that the mourning shall be comforted and that those who sow in tears shall reap in joy. Unlike the traditional Latin mass for the dead, it addresses the living who grieve, moving across seven movements from sorrow toward a serene benediction on those who are at rest. It stands as one of music's most humane meditations on loss and the hope of renewal, fitting for a land emerging from more than thirteen years of war.",
          "source": "Brahms' consoling choral requiem, built on scriptural words of comfort for those who mourn rather than the Latin mass for the dead (public-domain score via IMSLP), a musical meditation on grief and consolation for a people recovering from long conflict.",
          "href": "https://imslp.org/wiki/Ein_deutsches_Requiem,_Op.45_(Brahms,_Johannes)",
          "image": {
            "src": "/covers/guterres-un-chief-syria-visit--a5.png",
            "alt": "Photographic portrait of the composer Johannes Brahms",
            "credit": "Photographic portrait of Johannes Brahms; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "houthis-missile-attack-saudi-arabia",
      "headline": "Iran-backed Houthis launch a missile attack on Saudi Arabia; a Greek-operated air-defense system intercepts the salvo",
      "overview": "Yemen's Houthi movement said it fired missiles at Saudi Arabia, and Saudi air defenses, including a Greek-operated system, shot down the incoming projectiles aimed at an oil refinery. It was one of the most serious exchanges between the two sides in months and revived fears of a wider Gulf escalation. No casualties were immediately reported.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cj9d27v70j1o"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMixwFBVV95cUxQN3g2TnRFRlEzbjhJTy13dGx3cGszWE0ydEZ2bGlEUlIyR3diOTVmYlJZdDQyY1dhc0dNWjZISm1VOW54akNlQ1FkQTFTZnFLR01adUh6cGlLSV95OVJ2Ym1ydGFtVW5uNnBZaWE2Vzhld0UtdFdRSy05clpSblJHZzdXQXhFcUNseV9zYXFyRUNIRWxLeE92amowZGlMZTg5dGpwTEo1VVF5SzB6b3B6bGt3M3VDREE0M3VHcVFtME40S0JDNHJj?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/houthis-missile-attack-saudi-arabia.png",
        "alt": "A Patriot surface-to-air missile streaking upward from its launcher against a blue sky, trailing smoke and flame.",
        "credit": "U.S. Army photo (Redstone Arsenal), uploaded by Bernd vdB; public domain, via Wikimedia Commons."
      },
      "rank": 3,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Thucydides, History of the Peloponnesian War, Book 2 — the siege of Plataea (c. 431 BC), Crawley translation",
          "excerpt": "While raising the mound the Peloponnesians also brought up engines against the city, one of which was brought up upon the mound against the great building and shook down a good piece of it, to the no small alarm of the Plataeans. Others were advanced against different parts of the wall but were lassoed and broken by the Plataeans; who also hung up great beams by long iron chains from either extremity of two poles laid on the wall and projecting over it, and drew them up at an angle whenever any point was threatened by the engine, and loosing their hold let the beam go with its chains slack, so that it fell with a run and snapped off the nose of the battering ram.",
          "source": "Thucydides' classical account (Richard Crawley's translation) of the Spartan-led siege of Plataea, in which the defenders improvised a counter-weapon that intercepted and broke the enemy's battering engines in mid-strike — an ancient mirror of a defensive system knocking down incoming projectiles.",
          "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
          "image": {
            "src": "/covers/houthis-missile-attack-saudi-arabia--a0.png",
            "alt": "Marble portrait bust of the historian Thucydides.",
            "credit": "Roman marble bust of Thucydides, Royal Ontario Museum; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Edward Gibbon, The History of the Decline and Fall of the Roman Empire, Chapter LXVIII — the fall of Constantinople (1453)",
          "excerpt": "The explosion was felt or heard in a circuit of a hundred furlongs: the ball, by the force of gunpowder, was driven above a mile; and on the spot where it fell, it buried itself a fathom deep in the ground.",
          "source": "Gibbon's narrative of Mehmed II's monstrous bombard hurling a stone ball more than a mile against Constantinople in 1453, one of history's most famous artillery bombardments of a city — a projectile flung across the sky to shatter a defended stronghold.",
          "href": "https://www.ccel.org/g/gibbon/decline/volume2/chap68.htm",
          "image": {
            "src": "/covers/houthis-missile-attack-saudi-arabia--a1.png",
            "alt": "Medieval miniature of the 1453 siege of Constantinople, showing Ottoman forces and cannon arrayed before the city's walls.",
            "credit": "Jean Le Tavernier, The Siege of Constantinople (after 1455), Bibliothèque nationale de France, MS Fr. 9087; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Homer, The Iliad, Book I (Apollo's plague) — Samuel Butler prose translation",
          "excerpt": "He came down furious from the summits of Olympus, with his bow and his quiver upon his shoulder, and the arrows rattled on his back with the rage that trembled within him. He sat himself down away from the ships with a face as dark as night, and his silver bow rang death as he shot his arrow in the midst of them. First he smote their mules and their hounds, but presently he aimed his shafts at the people themselves, and all day long the pyres of the dead were burning.",
          "source": "The opening of Homer's epic (Samuel Butler's translation), in which the archer-god Apollo descends in wrath and rains death-dealing arrows on the Achaean camp — the ancient literary image of missiles falling from the sky upon those below.",
          "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm",
          "image": {
            "src": "/covers/houthis-missile-attack-saudi-arabia--a2.png",
            "alt": "The Apollo Belvedere, a marble statue of the god Apollo shown as an archer just after loosing an arrow.",
            "credit": "Apollo Belvedere, Roman copy after a Greek bronze, Vatican Museums; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Psalm 91 (King James Version, 1611), verses 4–7",
          "excerpt": "He shall cover thee with his feathers, and under his wings shalt thou trust: his truth shall be thy shield and buckler. Thou shalt not be afraid for the terror by night; nor for the arrow that flieth by day; Nor for the pestilence that walketh in darkness; nor for the destruction that wasteth at noonday. A thousand shall fall at thy side, and ten thousand at thy right hand; but it shall not come nigh thee.",
          "source": "The psalm's famous promise of a divine shield against 'the arrow that flieth by day,' pairing the imagery of the incoming missile with the buckler that turns it aside — exactly the spear-and-shield tension of an air-defense interception.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms",
          "image": {
            "src": "/covers/houthis-missile-attack-saudi-arabia--a3.png",
            "alt": "Carolingian manuscript illumination of an armed archer drawing his bow, from the Stuttgart Psalter.",
            "credit": "Archer from the Stuttgart Psalter (c. 820–830), Württembergische Landesbibliothek, Cod. bibl. fol. 23; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Paolo Uccello, The Battle of San Romano (c. 1435–1440), National Gallery, London",
          "excerpt": "A thicket of lances rises across the panel like a barrage frozen in flight, some couched and driving forward, others shattered and falling, while broken weapons litter the ground beneath the rearing horses. Uccello turns a chaotic clash of missiles and armor into a strict lattice of trajectories, every shaft a vector aimed across the field. It is bombardment rendered as geometry — the volley and the guard against it caught in the same rigid perspective.",
          "source": "Uccello's celebrated battle panel depicting the 1432 clash between Florence and Siena, a Renaissance vision of a sky crowded with converging lances and hurled weapons that visually echoes a modern salvo and the defenders arrayed against it.",
          "href": "https://commons.wikimedia.org/wiki/File:San_Romano_Battle_(Paolo_Uccello,_London)_01.jpg",
          "image": {
            "src": "/covers/houthis-missile-attack-saudi-arabia--a4.png",
            "alt": "Paolo Uccello's painting of the Battle of San Romano, with mounted knights and a dense forest of raised and broken lances.",
            "credit": "Paolo Uccello, The Battle of San Romano (c. 1435–1440), National Gallery, London; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Pyotr Ilyich Tchaikovsky, 1812 Overture, Op. 49 (1880)",
          "excerpt": "Tchaikovsky's festival overture builds a martial narrative from clashing anthems into a climax punctuated by live cannon fire and pealing bells, staging an assault and its repulse in pure sound. The scored artillery blasts land like incoming ordnance answered by the surging orchestra, a musical drama of bombardment and defiant defense. It remains the most literal depiction of missiles and their thunderous interception in the concert repertoire.",
          "source": "Tchaikovsky's overture commemorating Russia's defense against Napoleon's 1812 invasion, famous for its notated cannon shots — a public-domain work that turns bombardment and resistance into orchestral spectacle, mirroring a salvo met by defending fire.",
          "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
          "image": {
            "src": "/covers/houthis-missile-attack-saudi-arabia--a5.png",
            "alt": "Photographic portrait of the composer Pyotr Ilyich Tchaikovsky.",
            "credit": "Portrait of Pyotr Ilyich Tchaikovsky; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "romania-shoots-down-second-drone",
      "headline": "Romania shoots down a second drone breaching its airspace in two days near the Ukraine border",
      "overview": "Romania said a fighter jet shot down a drone that violated its airspace early Saturday near Sfantu Gheorghe in the Danube Delta, the second such incident in two days. President Nicusor Dan said two F-16s were scrambled after radar detected the intrusion; prosecutors identified the drone downed on Friday as Russian. The NATO member says Russian drones have breached its airspace about 30 times since 2022.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxNenNib19JWnhPbU00bUNBREJvbHB3MzUxaVJZdHpCdVUxQXFSZl9mS3RsU2E4MXpkZ3FLYy0ySWJSOU8ycnljNlJyQjVqRVozcUJQcTROVGl2WERzUmk0VGxLX2xUQkllY0N1d2xCbFgxSXpiSThRc1ZZazBUN0ZtRGthTnRCRF9CQktPdGtqUWZETnFjdHQ2NFktMkpJWVd6TkZOWlhEdkhYZF9hcmhn?oc=5"
        },
        {
          "name": "Times of Israel",
          "href": "https://www.timesofisrael.com/liveblog_entry/romania-shoots-down-second-drone-breaching-its-airspace-defense-ministry-says/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/romania-shoots-down-second-drone.png",
        "alt": "A pair of Romanian Air Force F-16 fighter jets flying in formation over the sea.",
        "credit": "F-16s of the Romanian Air Force over the Baltic Sea; U.S. Air Force photo, public domain, via Wikimedia Commons."
      },
      "rank": 4,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Historia Augusta, Life of Hadrian 11.2 (4th c. AD), on the building of Hadrian's Wall",
          "excerpt": "And so, having reformed the army quite in the manner of a monarch, he set out for Britain, and there he corrected many abuses and was the first to construct a wall, eighty miles in length, which was to separate the barbarians from the Romans.",
          "source": "The Roman imperial biography records Hadrian fortifying the empire's edge with a wall to keep the barbarians out, the classic image of a frontier held under threat; David Magie's Loeb translation, hosted on Bill Thayer's LacusCurtius.",
          "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Historia_Augusta/Hadrian/1*.html",
          "image": {
            "src": "/covers/romania-shoots-down-second-drone--a0.png",
            "alt": "The stone course of Hadrian's Wall running across open green hills west of Housesteads Roman fort.",
            "credit": "Hadrian's Wall west of Housesteads, Northumberland; photo by Adam Cuerden / others, CC-licensed, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Procopius of Caesarea, Buildings (De Aedificiis), Book IV (c. 550s AD), on Justinian's Danube defences",
          "excerpt": "And wishing, as he did, to make the Ister River the strongest possible line of first defence before them and before the whole of Europe, he distributed numerous forts along the bank of the river, as I shall soon describe, and he placed garrisons of troops everywhere along the shore, in order to put the most rigid check upon the crossing of the barbarians there.",
          "source": "Procopius describes Justinian lining the Danube (Ister) with forts and garrisons to stop barbarians crossing, an ancient echo of a threatened river frontier that runs through the very region of the Danube Delta; H. B. Dewing's Loeb translation, via LacusCurtius.",
          "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Procopius/Buildings/4A*.html",
          "image": {
            "src": "/covers/romania-shoots-down-second-drone--a1.png",
            "alt": "Byzantine mosaic of the Emperor Justinian I, crowned and haloed, flanked by his court and soldiers.",
            "credit": "Emperor Justinian I, mosaic (c. 547) in the Basilica of San Vitale, Ravenna; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Aeschylus, Agamemnon, prologue (458 BC), the watchman's speech",
          "excerpt": "Release from this weary task of mine has been my plea to the gods throughout this long year's watch, in which, lying upon the palace roof of the Atreidae, upon my bent arm, like a dog, I have learned to know well the gathering of the night's stars, those radiant potentates conspicuous in the firmament, bringers of winter and summer to mankind [the constellations, when they rise and set]. So now I am still watching for the signal-flame, the gleaming fire that is to bring news from Troy and tidings of its capture.",
          "source": "The tragedy opens with a lone watchman on the palace roof, wearily scanning the night sky for the beacon fire that signals danger and war, the archetype of the solitary sentinel on duty; Herbert Weir Smyth's translation on Perseus (Tufts).",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0004:card=1",
          "image": {
            "src": "/covers/romania-shoots-down-second-drone--a2.png",
            "alt": "Marble portrait bust of the ancient Greek playwright Aeschylus.",
            "credit": "Bust of Aeschylus (Roman copy of a Greek original); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The Book of Ezekiel 33:6-7, King James Version (1611)",
          "excerpt": "But if the watchman see the sword come, and blow not the trumpet, and the people be not warned; if the sword come, and take any person from among them, he is taken away in his iniquity; but his blood will I require at the watchman's hand. So thou, O son of man, I have set thee a watchman unto the house of Israel; therefore thou shalt hear the word at my mouth, and warn them from me.",
          "source": "The prophet is charged as a watchman who must blow the trumpet the moment he sees the sword come upon the land, a scriptural image of vigilance and warning against an approaching threat; King James Version text via Bible Hub.",
          "href": "https://biblehub.com/kjv/ezekiel/33.htm",
          "image": {
            "src": "/covers/romania-shoots-down-second-drone--a3.png",
            "alt": "Michelangelo's fresco of the prophet Ezekiel on the Sistine Chapel ceiling, turning sharply as if startled.",
            "credit": "Michelangelo, The Prophet Ezekiel (1510), Sistine Chapel ceiling, Vatican; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Rembrandt van Rijn, The Night Watch (1642), Rijksmuseum, Amsterdam",
          "excerpt": "Rembrandt's vast group portrait shows a civic militia company surging into motion, muskets shouldered and a captain giving the order to march out. Light rakes across the crowd of armed watchmen as they muster to defend their city. It is the most famous image in art of citizen-soldiers turned out to stand guard.",
          "source": "The painting depicts a company of Amsterdam's civic guard mustering under arms, the definitive artistic vision of watchmen called to defend their home; oil on canvas in the Rijksmuseum (object SK-C-5).",
          "href": "https://www.rijksmuseum.nl/en/collection/SK-C-5",
          "image": {
            "src": "/covers/romania-shoots-down-second-drone--a4.png",
            "alt": "Rembrandt's The Night Watch, a militia company in seventeenth-century dress advancing out of shadow into light.",
            "credit": "Rembrandt van Rijn, The Night Watch (1642), Rijksmuseum, Amsterdam; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Joseph Haydn, Symphony No. 100 in G major \"Military\", Hob.I:100 (1794)",
          "excerpt": "Haydn's \"Military\" Symphony erupts with the clamor of the parade ground: a serene G-major melody is suddenly overrun by crashing cymbals, triangle, and bass drum, the \"Turkish\" percussion of war. In the second movement a lone trumpet sounds a startling call to arms, as if a distant sentry had spotted an intruder crossing the frontier. The music mirrors Romania's guarded border, where quiet vigilance gives way in an instant to the alarm of a downed drone.",
          "source": "Haydn's 1794 London symphony, famed for its martial percussion and a sudden trumpet fanfare of alarm, echoes Romania's frontier defenders scrambling to down a second intruding drone. Score and edition via IMSLP.",
          "href": "https://imslp.org/wiki/Symphony_No.100_in_G_major,_Hob.I:100_(Haydn,_Joseph)",
          "image": {
            "src": "/covers/romania-shoots-down-second-drone--a5.png",
            "alt": "Painted portrait of the composer Joseph Haydn",
            "credit": "Thomas Hardy, portrait of Joseph Haydn (1791), Royal College of Music, London; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "canada-nato-intern-belgium-spying",
      "headline": "Belgium arrests a Canadian former NATO intern on suspicion of spying for a foreign country",
      "overview": "Belgian authorities arrested a Canadian woman who had interned at NATO's SHAPE military headquarters in Mons on suspicion of espionage for a third country and membership of a criminal organization. Investigators said she came to the attention of SHAPE security, which alerted Belgium's intelligence service; police searched her home in the Charleroi area. Officials declined to name her or the country she is accused of aiding.",
      "genre": "Politics",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxQSjhwUHpvTVFodm9TOHNxX3ctYU5lUFNvNURaU1VZemFpak1VZ1R4M2xUblJLMEI0UTM5Si1HZk9XVS1PMjBYaklkUkJvdmhPNGVfdV9GaGoxUmJOVWpQVDZ6QWxoT3dhRU83WERPYnRQTlBoY1NUV3I3emNnMkQxNk1SeEV5RlRmQlozYnRFaHBtQVhVczZXaVJpRjFZU1lya2FwM3ZJdTB1WkxpLU5ScDZkcw?oc=5"
        },
        {
          "name": "Malay Mail",
          "href": "https://www.malaymail.com/news/world/2026/07/25/belgium-detains-nato-intern-accused-of-espionage-and-criminal-ties/228937"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/canada-nato-intern-belgium-spying.png",
        "alt": "The Supreme Headquarters Allied Powers Europe (SHAPE), NATO's military headquarters at Casteau near Mons, Belgium.",
        "credit": "SHAPE headquarters, Casteau (Mons), Belgium; photo by Ex13, via Wikimedia Commons (CC BY-SA)."
      },
      "rank": 5,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Livy, History of Rome (Ab Urbe Condita), Book 1.11 (c. 27-25 BC)",
          "excerpt": "Once admitted, they crushed her to death beneath their shields, either that the citadel might appear to have been taken by assault, or that her example might be left as a warning that no faith should be kept with traitors.",
          "source": "Livy's account of Tarpeia, the Roman commander's daughter bribed to open the citadel to the besieging Sabines, is the classical archetype of the insider who betrays a trust from within the walls, exactly the fear SHAPE security had of its intern; Rev. Canon Roberts translation (Everyman, 1912), via Perseus.",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=1:chapter=11",
          "image": {
            "src": "/covers/canada-nato-intern-belgium-spying--a0.png",
            "alt": "Roman silver denarius showing Tarpeia half-buried and crushed under the shields of two Sabine soldiers.",
            "credit": "L. Titurius L.f. Sabinus, silver denarius (89 BC, RRC 344/2c), reverse showing the punishment of Tarpeia; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Mary, Queen of Scots to Anthony Babington, the 'Gallows Letter' (17 July 1586)",
          "excerpt": "Trustie and welbeloved. According to the zeale and entier affection which I haue knowen in you towardes the common cause of relligion and mine",
          "source": "The ciphered letter in which Mary authorised the plot against Elizabeth I, telling Babington to 'sett the six gentlemen to woork', was intercepted and decoded by the spymaster Sir Francis Walsingham, whose agents unmasked the conspiracy from the inside, much as SHAPE security flagged its intern to Belgian intelligence; transcript via the British Library.",
          "href": "https://www.bl.uk/stories/blogs/posts/the-gallows-letter",
          "image": {
            "src": "/covers/canada-nato-intern-belgium-spying--a1.png",
            "alt": "Portrait of Sir Francis Walsingham, Elizabeth I's spymaster, dressed in black with a white ruff.",
            "credit": "Attributed to John de Critz the Elder, Sir Francis Walsingham (c. 1585), National Portrait Gallery, London; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Dante Alighieri, Inferno, Canto XXXIV (c. 1320), trans. Charles Eliot Norton",
          "excerpt": "“That soul up there which has the greatest punishment,” said the Master, “is Judas Iscariot, who has his head within, and plies his legs outside. Of the other two who have their heads down, he who hangs from the black muzzle is Brutus; see how he writhes and says no word; and the other is Cassius, who seems so large-limbed.”",
          "source": "In the Inferno's frozen lowest circle Dante reserves the worst torment for traitors, with Judas, betrayer of a trust, gnawed forever in the mouth of Lucifer beside Brutus and Cassius; Charles Eliot Norton's prose translation (1891-92), via Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/1995/pg1995.txt",
          "image": {
            "src": "/covers/canada-nato-intern-belgium-spying--a2.png",
            "alt": "Gustave Dore engraving of the giant winged Lucifer frozen in the ice at the center of Hell, chewing the traitors.",
            "credit": "Gustave Dore, illustration of Lucifer and the traitors for Dante's Inferno Canto XXXIV (1861); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Rudyard Kipling, Kim (1901)",
          "excerpt": "When everyone is dead the Great Game is finished. Not before. Listen to me till the end.",
          "source": "Kipling's novel follows an orphan recruited into the 'Great Game', the Anglo-Russian espionage contest on India's frontier, and gave the world its enduring name for the endless secret war of spies that this arrest evokes; via Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/2226/pg2226.txt",
          "image": {
            "src": "/covers/canada-nato-intern-belgium-spying--a3.png",
            "alt": "Decorated cover of the first edition of Rudyard Kipling's novel Kim.",
            "credit": "Cover of the first edition of Rudyard Kipling's Kim (Macmillan, 1901); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Giotto di Bondone, The Kiss of Judas (c. 1305), Scrovegni Chapel, Padua",
          "excerpt": "Judas swings his mustard-yellow cloak around Christ and pulls him into a false embrace, their locked gaze fixed at the still center of a fresco bristling with torches, clubs and spears. The kiss is the signal that marks the man for the soldiers, a private gesture of affection turned into an act of identification. Giotto freezes the exact instant a trusted intimate becomes an informer.",
          "source": "Giotto's fresco depicts the archetypal betrayal by someone close, Judas identifying Christ with a kiss, the image of trust weaponized that underlies every mole and informer.",
          "href": "https://commons.wikimedia.org/wiki/File:Giotto_-_Scrovegni_-_-31-_-_Kiss_of_Judas.jpg",
          "image": {
            "src": "/covers/canada-nato-intern-belgium-spying--a4.png",
            "alt": "Giotto fresco showing Judas embracing Christ to betray him, surrounded by a crowd with torches and spears.",
            "credit": "Giotto di Bondone, The Kiss of Judas (c. 1305), Scrovegni (Arena) Chapel, Padua; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Ludwig van Beethoven, Fidelio, Op. 72 (1805/1814)",
          "excerpt": "In Beethoven's only opera, Leonore disguises herself as a young man named 'Fidelio' and takes a job inside a state prison to reach her husband, a political prisoner held in secret by a vengeful governor. The drama turns on concealed identity, surveillance and a name that is itself a cover, until a trumpet call from the watchtower unmasks the tyrant. It is the opera of the citadel penetrated by someone who is not who they claim to be.",
          "source": "Beethoven's Fidelio dramatizes hidden identity and infiltration behind guarded walls, the same anxieties about the disguised insider raised by a NATO intern accused of spying; full score via IMSLP.",
          "href": "https://imslp.org/wiki/Fidelio,_Op.72_(Beethoven,_Ludwig_van)",
          "image": {
            "src": "/covers/canada-nato-intern-belgium-spying--a5.png",
            "alt": "Joseph Karl Stieler's portrait of Ludwig van Beethoven holding a manuscript and pencil.",
            "credit": "Joseph Karl Stieler, portrait of Ludwig van Beethoven (1820); public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "kuwait-kpc-16-billion-pipeline-lease",
      "headline": "Kuwait's KPC signs a $16 billion lease-and-leaseback deal for its oil-pipeline network with Blackstone, KKR and Brookfield",
      "overview": "Kuwait Petroleum Corporation signed a $16 billion agreement to lease and lease back its crude-oil pipeline network to a consortium of Blackstone, KKR and Brookfield, in what Kuwait called the largest foreign direct investment in its history. Under the 20.5-year structure, the investors take a 49% stake while Kuwait Oil Company keeps 51% and operational control of 13 pipelines. The deal is expected to raise about $7.85 billion in upfront proceeds.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxNZ0JQQTg4MlNFY2RMbUw2Y1F6ZDdiLVBZNDUwbDBVYU0yZDVfVEVPSjM1NWVSdFM0SkRRdURmY2RvMXRJbXlJSDJwZXA3TGw1UllzRGFyU0lJLWZFOW9mbG5RcmdzNlAzeEJJT18xcUdRdWV3dUtzTi1Xc0sxX2ROZzhCcXpkdGxnek5QZXNzeVJ1azhQbFRVZloyQzFZZmVoQ2ZiRGdiRnJtaEZmZVVIaGhpZ283UXFnX3Y3MkpLOUx3RjFLSENSSXozUXE?oc=5"
        },
        {
          "name": "The National",
          "href": "https://www.thenationalnews.com/business/energy/2026/07/25/kuwait-signs-16bn-oil-pipeline-lease-deal-with-blackstone-brookfield-and-kkr/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/kuwait-kpc-16-billion-pipeline-lease.png",
        "alt": "Oil pipelines running across the desert of the Burgan oil field in Kuwait.",
        "credit": "Pipelines in the Burgan oil field, Kuwait. Photo by Javier Blas; CC BY-SA 3.0, via Wikimedia Commons."
      },
      "rank": 6,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Herodotus, The Histories, Book 1 (c. 430 BC), trans. G. C. Macaulay",
          "excerpt": "Thus then, O Croesus, man is altogether a creature of accident. As for thee, I perceive that thou art both great in wealth and king of many men, but that of which thou didst ask me I cannot call thee yet, until I learn that thou hast brought thy life to a fair ending: for the very rich man is not at all to be accounted more happy than he who has but his subsistence from day to day, unless also the fortune go with him of ending his life well in possession of all things fair.",
          "source": "In Herodotus' Histories (G. C. Macaulay's translation, Project Gutenberg), the sage Solon warns the fabulously rich King Croesus that vast treasure guarantees no man's happiness until his life is well ended, a classical caution on reckoning wealth against the final account, as Kuwait converts the future value of its oil arteries into money today.",
          "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm",
          "image": {
            "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a0.png",
            "alt": "Painting of King Croesus displaying his heaped treasures to the visiting sage Solon.",
            "credit": "Caspar van der Hoecke, Croesus Showing his Treasures to Solon, National Museum in Warsaw; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "The First Charter of the East India Company (1600), from A Collection of Charters and Statutes Relating to the East India Company",
          "excerpt": "None of the Queen's Subjects, but the Company, their Servants, or Assigns, shall resort to India without being licenced by the Company, upon Pain of forfeiting Ships and Cargoes, with Imprisonment, till the Offenders give One thousand Pounds Bond to the Company not to trade thither again.",
          "source": "This eighteenth-century collection on Wikisource abstracts Elizabeth I's 1600 charter granting a private company exclusive control over a strategic trade route, the early-modern template for consortiums of capital administering a nation's commercial lifeline, as Blackstone, KKR and Brookfield take a 49% stake in Kuwait's pipelines.",
          "href": "https://en.wikisource.org/wiki/Page:A_Collection_of_Charters_and_Statutes_relating_to_the_East_India_Company.pdf/10",
          "image": {
            "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a1.png",
            "alt": "The Armada Portrait of Queen Elizabeth I, her hand resting on a globe.",
            "credit": "Attributed to George Gower, Elizabeth I (the Armada Portrait), c. 1588, Queen's House, Royal Museums Greenwich; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The Holy Bible (King James Version), Genesis 25 (1611)",
          "excerpt": "And Jacob said, Sell me this day thy birthright. And Esau said, Behold, I am at the point to die: and what profit shall this birthright do to me? And Jacob said, Swear to me this day; and he sware unto him: and he sold his birthright unto Jacob. Then Jacob gave Esau bread and pottage of lentiles; and he did eat and drink, and rose up, and went his way: thus Esau despised his birthright.",
          "source": "In the King James Bible's Genesis 25 (Wikisource), the famished Esau surrenders his birthright, his patrimony and inheritance, to Jacob for a single bowl of red pottage, the archetype of trading a lasting endowment for immediate sustenance, mirrored in leasing away control of a national asset for ready cash.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
          "image": {
            "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a2.png",
            "alt": "Baroque painting of Esau selling his birthright to Jacob over a table with a bowl of pottage.",
            "credit": "Hendrick ter Brugghen, Esau Selling His Birthright, c. 1627; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "William Shakespeare, The Merchant of Venice, Act I, Scene 3 (c. 1596)",
          "excerpt": "Go with me to a notary, seal me there Your single bond; and in a merry sport, If you repay me not on such a day, In such a place, such sum or sums as are Express’d in the condition, let the forfeit Be nominated for an equal pound Of your fair flesh, to be cut off and taken In what part of your body pleaseth me.",
          "source": "In Shakespeare's Merchant of Venice (Project Gutenberg), Antonio seals Shylock's bond pledging a pound of his own flesh as security for a loan of ready money, the classic dramatization of the peril of mortgaging something vital to raise cash now, an unsettling shadow over pledging a strategic artery to financiers.",
          "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm",
          "image": {
            "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a3.png",
            "alt": "Engraving of the courtroom trial scene from The Merchant of Venice, with Shylock and his scales before the court.",
            "credit": "The trial scene from The Merchant of Venice, print, British Museum (1851,0901.409); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Hendrick Cornelisz Vroom, The Return to Amsterdam of the Second Expedition to the East Indies (1599)",
          "excerpt": "Vroom's marine panorama crowds the water before Amsterdam with the tall, gun-bristling ships of the returning East India fleet, sails swelling and pennants streaming in the wind. Small boats scurry out to greet the treasure-laden vessels while crowds gather along the shore to welcome home the source of the city's fortune. It is a hymn to seaborne commerce, the moment when private trading capital and a nation's wealth first fused at the water's edge.",
          "source": "Vroom's celebrated seascape in the Rijksmuseum glorifies the homecoming of a merchant fleet laden with Eastern riches, capturing the age when private trading capital and national fortune became inseparable, a painterly echo of foreign investors buying into the arteries of Kuwait's oil wealth.",
          "href": "https://commons.wikimedia.org/wiki/File:De_terugkomst_in_Amsterdam_van_de_tweede_expeditie_naar_Oost-Indi%C3%AB,_Hendrik_Cornelisz_Vroom,_1599,_Rijksmuseum_SK-A-2858.jpg",
          "image": {
            "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a4.png",
            "alt": "Painting of a Dutch East India merchant fleet returning to a crowded Amsterdam harbour in 1599.",
            "credit": "Hendrick Cornelisz Vroom, The Return to Amsterdam of the Second Expedition to the East Indies (1599), Rijksmuseum (SK-A-2858); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, Das Rheingold, WWV 86A (1869)",
          "excerpt": "Wagner's prelude rises from a single sustained E-flat, the Rhine itself murmuring into being, before the Rhinemaidens' song celebrates the gold glinting in the deep. When the dwarf Alberich forswears love to seize the treasure, the innocent glow of the Rhinegold curdles into an emblem of greed and dominion. The whole Ring cycle unspools from that first bargain of gold weighed against everything else.",
          "source": "Wagner's Das Rheingold (score at IMSLP) opens with Alberich's theft of the Rhinemaidens' gold and his renunciation of love to forge a ring of limitless power, a mythic parable of the curse that attaches to gold seized for dominion, resonant with anxieties over who ultimately commands a nation's mineral riches.",
          "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
          "image": {
            "src": "/covers/kuwait-kpc-16-billion-pipeline-lease--a5.png",
            "alt": "Arthur Rackham illustration of the Nibelung dwarves Mime and Alberich, hoarders of the Rhinegold.",
            "credit": "Arthur Rackham, illustration for The Rhinegold & The Valkyrie (1910); public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "typhoon-noul-southern-china",
      "headline": "Southern China suspends transport and issues alerts as Typhoon Noul approaches",
      "overview": "Southern China put its coast on high alert and suspended public transport as Typhoon Noul closed in, threatening heavy rain and strong winds across Guangdong, Hainan and neighboring regions. Authorities moved to evacuate residents and halt ferries and trains as the storm neared landfall. Forecasters warned of flooding and dangerous surf along the densely populated southern coast.",
      "genre": "Climate",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMikgFBVV95cUxQR3ZHa2FCUlZiV093RTJZVVpvVVRYM3BmWkU0TzdaOGVnZ0M5T19DeHZlNm5XZmlFUXNyLXhnMHhPblhReDNZRzk0Y0hvT2h2dXd0N1M1Mmh2OEM4Z2ZmZnhONGVteTFES1pKU0tnRGFQTDBNa25idG1VbWtxUWpqSjc5OVhYS2dLcjYxZkl6VkZ1dw?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiuAFBVV95cUxOWTAyMXNxNGtaUXo0Z3pKNk0wdDJTSWxibmNsNi1TTlNLNDdEUnB4M1BfeXBHQWJTeXZmS3JTWVlTUURmZlFCWnNQeVRZY0dmaHprbnhXS21ZTXA2RFVqVFkwZDlWTnl1QmNGQUNNdlQyaTNsUWlibnlfcDVBaDdOY2dtYS1sX0ZCRHVDa2FlX2l1aXUwZ0tlbkR2dlg5bzdodG9NenpacW9mdmV6WVdnQ2d0S2dHbWdw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/typhoon-noul-southern-china.png",
        "alt": "Satellite image of Typhoon Noul, a tightly coiled tropical cyclone with a clear eye, over the western Pacific near the coast of Asia.",
        "credit": "VIIRS imagery from the Suomi NPP satellite, NOAA (Typhoon Noul, 10 May 2015); public domain (U.S. NOAA), via Wikimedia Commons."
      },
      "rank": 7,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Acts of the Apostles 27:14–17 (King James Version, 1611)",
          "excerpt": "But not long after there arose against it a tempestuous wind, called Euroclydon. And when the ship was caught, and could not bear up into the wind, we let her drive. And running under a certain island which is called Clauda, we had much work to come by the boat: Which when they had taken up, they used helps, undergirding the ship; and, fearing lest they should fall into the quicksands, strake sail, and so were driven.",
          "source": "The New Testament account of Paul's Mediterranean voyage (King James Version) records mariners overpowered by a named tempest and forced to abandon their course, mirroring today's ferries and trains halted before a wind no schedule can withstand.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Acts",
          "image": {
            "src": "/covers/typhoon-noul-southern-china--a0.png",
            "alt": "Baroque painting of a small ship pitched on towering waves under a dark sky as sailors struggle at the rigging.",
            "credit": "Ludolf Backhuysen, Christ in the Storm on the Sea of Galilee (1695); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Frank Brinkley, A History of the Japanese People (1915) — the 'divine wind' of 1281",
          "excerpt": "We know that, after nearly two months of incessant combat, the Yuan armies had made no sensible impression on the Japanese resistance or established any footing upon Japanese soil. We know that, on August the 14th and 15th, there burst on the shores of Kyushu a tempest which shattered nearly the whole of the Chinese flotilla. And we know that the brunt of the loss fell on the Chinese contingent, some twelve thousand of whom were made slaves.",
          "source": "Brinkley's standard English history recounts the kamikaze, or 'divine wind,' that wrecked Kublai Khan's China-based invasion fleet in 1281 — an armada from southern China undone by the same seasonal typhoons now bearing down on Guangdong and Hainan.",
          "href": "https://www.gutenberg.org/cache/epub/27604/pg27604.html",
          "image": {
            "src": "/covers/typhoon-noul-southern-china--a1.png",
            "alt": "Japanese scroll painting of the samurai Takezaki Suenaga on horseback amid arrows and an exploding bomb during the Mongol invasion.",
            "credit": "Detail from the Mōko Shūrai Ekotoba (Illustrated Account of the Mongol Invasion), c. 1293; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "William Shakespeare, The Tempest, Act I, Scene 1 (c. 1611)",
          "excerpt": "Do you not hear him? You mar our labour: keep your cabins: you do assist the storm.",
          "source": "Shakespeare opens his last great play aboard a foundering ship where rank means nothing against the gale, the Boatswain snapping that panicked nobles only 'assist the storm' — the same helplessness authorities try to forestall by clearing the coast before landfall.",
          "href": "https://www.gutenberg.org/cache/epub/23042/pg23042.txt",
          "image": {
            "src": "/covers/typhoon-noul-southern-china--a2.png",
            "alt": "Painting of a young woman on a rocky shore, her hair and cloak streaming in the wind, watching a ship founder in a stormy sea.",
            "credit": "John William Waterhouse, Miranda – The Tempest (1916); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Virgil, Aeneid, Book I (trans. John Dryden, 1697)",
          "excerpt": "The raging winds rush thro’ the hollow wound,\nAnd dance aloft in air, and skim along the ground;\nThen, settling on the sea, the surges sweep,\nRaise liquid mountains, and disclose the deep.\nSouth, East, and West with mix’d confusion roar,\nAnd roll the foaming billows to the shore.\nThe cables crack; the sailors’ fearful cries\nAscend; and sable night involves the skies;\nAnd heav’n itself is ravish’d from their eyes.",
          "source": "In Dryden's translation of Virgil's epic, Aeolus looses the winds and 'liquid mountains' scatter Aeneas's fleet across the sea — the classical image of a storm that flings ships and men apart, echoed as Noul drives ferries into port and residents from the shore.",
          "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
          "image": {
            "src": "/covers/typhoon-noul-southern-china--a3.png",
            "alt": "Dramatic painting of a ship breaking apart on rocks in a violent sea storm as survivors struggle amid the wreckage and spray.",
            "credit": "Claude-Joseph Vernet, Storm with a Shipwreck (1754); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Katsushika Hokusai, Under the Wave off Kanagawa (The Great Wave), c. 1830–32",
          "excerpt": "A colossal wave rears over three slender boats, its claw-like crest of foam poised to crash down while distant Mount Fuji sits tiny and serene beneath it. Hokusai freezes the instant before disaster, dwarfing the rowers and reducing human effort to a fragile smudge against the sea's overwhelming force. The print has become the world's shorthand for the ocean's sublime, indifferent power.",
          "source": "Hokusai's woodblock print from Thirty-Six Views of Mount Fuji is the definitive image of small craft engulfed by a towering wall of water — a direct visual analogue to coastal communities bracing as heavy seas and storm surge close in.",
          "href": "https://commons.wikimedia.org/wiki/File:Great_Wave_off_Kanagawa2.jpg",
          "image": {
            "src": "/covers/typhoon-noul-southern-china--a4.png",
            "alt": "Japanese woodblock print of a giant curling wave with foaming claw-like crest towering over small boats, with Mount Fuji in the distance.",
            "credit": "Katsushika Hokusai, Under the Wave off Kanagawa (The Great Wave), from Thirty-Six Views of Mount Fuji, c. 1830–32; The Metropolitan Museum of Art; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Antonio Vivaldi, Violin Concerto in G minor \"L'estate\" (Summer), RV 315, from The Four Seasons (c. 1725)",
          "excerpt": "The finale of Vivaldi's \"Summer\" concerto unleashes a full-blown thunderstorm: racing scales in the strings pour down like torrential rain while the solo violin flashes and cracks like lightning across a blackened sky. Tremolo basses growl with distant thunder as the tempest gathers force, flattening the fields it sweeps over. It is one of music's most vivid depictions of a violent storm bearing down, mirroring Typhoon Noul as it barrels toward the coast of southern China.",
          "source": "The storm-finale of Vivaldi's \"Summer\", a torrent of rushing strings and thunderclaps, echoes Typhoon Noul closing in on southern China. Score and edition via IMSLP.",
          "href": "https://imslp.org/wiki/Violin_Concerto_in_G_minor,_RV_315_(Vivaldi,_Antonio)",
          "image": {
            "src": "/covers/typhoon-noul-southern-china--a5.png",
            "alt": "Painted portrait of the composer Antonio Vivaldi",
            "credit": "Anonymous portrait of Antonio Vivaldi (c. 1723), International Museum and Library of Music, Bologna; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "spacex-13th-starship-test-starlinks",
      "headline": "SpaceX launches its 13th Starship test flight and briefly deploys the first upgraded Starlink satellites",
      "overview": "SpaceX flew its Starship rocket on another test flight, this time carrying and briefly deploying the first of its most advanced Starlink internet satellites. The company continued to push toward operational use of the giant vehicle it plans to fly to the Moon and Mars. The launch marked the 13th full-scale test of the Starship system.",
      "genre": "Science",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQR1lLMF96NmlZSHhwV1hacmVIamw2QzIwR3hYVXhObEItWkliT3JWOXk3MlQtZlZENkR6RXJHQkY1Rks4dlVtdFRkdE1LNFY4NUphZUJGNC1saTdSdE5UNTlHXzdETjBpVlg5bE1UQUdLbUhqWTBtWUs4N2NaM1Y4emFMd2t4d1JGMWxtMXBFOHNucGxpRFJkU19QUQ?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxNVW5SOE5xcGxqZEZRZ0xpTE9Wc2JiTUloM1VHUHdxcllUQXI4RHNnZnRqdnZWYTJZS1pwYl9obHh3aDVJNVZMX3lBS2ZxbnNlMklGbjdUX0lnal95RFBaNHE1MUt0anNSVHhqd1dFNTN5bWM0YS02QzNWbzRrUHkzN0VKRUR1aFJYd3NPX2RGWDRzVUo0dEtlQm14alV4N3ByQl9qVWxuZmoybU5sSlAyNC1TUE9YQQ?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/spacex-13th-starship-test-starlinks.png",
        "alt": "A SpaceX Starship rocket climbing on a bright plume of exhaust, photographed from orbit aboard the International Space Station.",
        "credit": "NASA, launch of a SpaceX Starship seen from the International Space Station, 19 November 2024; public domain (PD-NASA), via Wikimedia Commons."
      },
      "rank": 8,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Plutarch, On the Face which appears in the Orb of the Moon (Moralia, c. 75 AD), trans. A. O. Prickard (1911)",
          "excerpt": "Now men in the moon, if men there be, are compactly framed, we may believe, and capable of being nourished on what they get…",
          "source": "An ancient Greek dialogue arguing the Moon is an earth-like body, rugged with mountains and hollows and perhaps inhabited — humanity's oldest reasoned reaching toward the Moon as another world, the very destination SpaceX now works to make routine; Prickard's public-domain translation in Selected Essays of Plutarch, Vol. II.",
          "href": "https://www.gutenberg.org/files/62858/62858-h/62858-h.htm",
          "image": {
            "src": "/covers/spacex-13th-starship-test-starlinks--a0.png",
            "alt": "Engraved portrait of the ancient Greek writer Plutarch of Chaeronea.",
            "credit": "Engraved portrait of Plutarch of Chaeronea; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Fulgence Marion, Wonderful Balloon Ascents; or, The Conquest of the Skies (1870)",
          "excerpt": "what must have been the astonishment of those who, for the first time since the commencement of the world, beheld one of their fellow-creatures rolling in space, without any other assurance of safety than what his still dim perception of the laws of nature gave him?",
          "source": "A 19th-century history of the Montgolfier brothers' 1783 balloons, when humans first rose off the Earth into the air; it captures the same public wonder and daring that surrounds a Starship test flight.",
          "href": "https://www.gutenberg.org/files/899/899-h/899-h.htm",
          "image": {
            "src": "/covers/spacex-13th-starship-test-starlinks--a1.png",
            "alt": "Period engraving of a Montgolfier hot-air balloon rising over Paris during the first manned flight in 1783.",
            "credit": "Engraving of the Montgolfier brothers' balloon flight, 1783; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Ovid, Metamorphoses, Book VIII, 'The Story of Dædalus and Icarus' (8 AD), trans. Henry T. Riley",
          "excerpt": "when the boy began to be pleased with a bolder flight, and forsook his guide; and, touched with a desire of reaching heaven, pursued his course still higher. The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air.",
          "source": "The Roman poet's archetypal myth of engineered flight and its perils — wings of wax and feathers, a boy soaring too near the sun and falling — the founding fable of daring ascent against which every new flying machine is measured.",
          "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm",
          "image": {
            "src": "/covers/spacex-13th-starship-test-starlinks--a2.png",
            "alt": "Baroque painting of Daedalus fitting feathered wings to his son Icarus before their flight.",
            "credit": "Andrea Sacchi, Daedalus and Icarus (c. 1645); public domain, via Wikimedia Commons (Google Art Project)."
          }
        },
        {
          "category": "literary",
          "title": "Jules Verne, From the Earth to the Moon (1865)",
          "excerpt": "It is perhaps reserved for us to become the Columbuses of this unknown world. Only enter into my plans, and second me with all your power, and I will lead you to its conquest, and its name shall be added to those of the thirty-six states which compose this Great Union.",
          "source": "Verne's novel of a gun club that builds a colossal cannon to fire a crewed projectile to the Moon — the 19th century's most famous dream of launching people spaceward, uncannily prefiguring a rocket built to carry humans to the Moon and Mars.",
          "href": "https://www.gutenberg.org/cache/epub/83/pg83-images.html",
          "image": {
            "src": "/covers/spacex-13th-starship-test-starlinks--a3.png",
            "alt": "19th-century engraving of the giant Columbiad cannon firing its projectile toward the Moon at night.",
            "credit": "Henri de Montaut, launch illustration for Jules Verne's From the Earth to the Moon (1872 edition); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna",
          "excerpt": "Bruegel's vast spiralling tower grinds up through the clouds, its ramps, arches and cranes swarming with tiny laborers while a port city shrinks to a plain below. Already half-built and quietly cracking, it is the definitive image of humanity raising a structure to breach the sky — ambition and overreach fused in stone.",
          "source": "The Flemish master's monumental painting of the Babel tower straining toward heaven echoes the towering launch stack and the age-old drive to build ever higher toward the heavens.",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/spacex-13th-starship-test-starlinks--a4.png",
            "alt": "Pieter Bruegel the Elder's painting of the Tower of Babel, an enormous spiralling structure rising into the clouds.",
            "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna; public domain, via Wikimedia Commons (Google Art Project)."
          }
        },
        {
          "category": "artistic",
          "title": "Gustav Holst, The Planets, Op. 32 (1914–1917)",
          "excerpt": "Holst's seven-movement orchestral suite gives each planet a voice — the hammering menace of 'Mars, the Bringer of War,' the soaring exuberance of 'Jupiter,' the mystic wordless drift of 'Neptune.' Written while spaceflight was still pure imagination, it turns the solar system into sound and conjures the very worlds, Mars among them, toward which our machines are now dispatched.",
          "source": "The most celebrated musical portrait of the planets, a cultural reaching toward the worlds that a Moon- and Mars-bound rocket program now literally aims for; score hosted at the Petrucci Music Library (IMSLP).",
          "href": "https://imslp.org/wiki/The_Planets,_Op.32_(Holst,_Gustav)",
          "image": {
            "src": "/covers/spacex-13th-starship-test-starlinks--a5.png",
            "alt": "Black-and-white portrait photograph of the composer Gustav Holst.",
            "credit": "Herbert Lambert, portrait photograph of Gustav Holst, c. 1920; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "trump-investigate-eu-trade-tech-fines",
      "headline": "Trump orders a US investigation into EU trade practices, claiming the bloc unfairly fined American tech giants",
      "overview": "President Donald Trump directed US trade officials to investigate the European Union's practices, arguing that recent multibillion-dollar antitrust fines against American technology companies amount to unfair treatment. The move escalates a transatlantic standoff over how Europe regulates and penalizes US firms. Brussels has defended its enforcement as applying equally to all companies.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMilgFBVV95cUxOYTZZUEVUR1lwOGRFRnVMMS1aaUROX096eE9Yd2xXaTNxQWlMUXMteE53U0VhZmctYmMtS3lQb0VYRmxfR0taaGNXNy14UW9fN1pNXy14QjJFdi1GbG00YVV1WjJtNHoxM3pqNWlGZ1AyWml0SUlmVWRZdnZYcE5PenJMd3lncTVQN3d3WFpsQTkxTFc0aXc?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cvgjenp4680o"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/trump-investigate-eu-trade-tech-fines.png",
        "alt": "Official 2025 presidential portrait of Donald Trump.",
        "credit": "Official Presidential Portrait of Donald J. Trump (2025), The White House; public domain (U.S. federal government work), via Wikimedia Commons."
      },
      "rank": 9,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Thucydides, History of the Peloponnesian War, Book 1 (c. 431 BC)",
          "excerpt": "the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty.",
          "source": "Thucydides' history (Richard Crawley translation, via Wikisource) records how Athens' decree barring Megara from its harbours and markets became a central grievance dragging Greece toward war, an ancient trade embargo wielded as a great-power weapon much like Washington's move against the EU.",
          "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1",
          "image": {
            "src": "/covers/trump-investigate-eu-trade-tech-fines--a0.png",
            "alt": "Ancient marble bust of the historian Thucydides.",
            "credit": "Roman marble bust of Thucydides (copy of a Greek original), Royal Ontario Museum, Toronto; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "John Adams, Diary entry for 17 December 1773 (on the Boston Tea Party)",
          "excerpt": "Last Night 3 Cargoes of Bohea Tea were emptied into the Sea. This Morning a Man of War sails. This is the most magnificent Movement of all. There is a Dignity, a Majesty, a Sublimity, in this last Effort of the Patriots, that I greatly admire. The People should never rise, without doing something to be remembered—something notable And striking. This Destruction of the Tea is so bold, so daring, so firm, intrepid and inflexible, and it must have so important Consequences, and so lasting, that I cant but consider it as an Epocha in History. This however is but an Attack upon Property.",
          "source": "John Adams's own diary (Adams Papers, Massachusetts Historical Society) is a primary account of the Boston Tea Party, colonists' defiant revolt against an imperial power's tea duty and trade monopoly, an angry rejection of another government's commercial impositions.",
          "href": "https://www.masshist.org/publications/adams-papers/view?id=DJA02d100",
          "image": {
            "src": "/covers/trump-investigate-eu-trade-tech-fines--a1.png",
            "alt": "1846 hand-colored lithograph of colonists dumping tea into Boston Harbor.",
            "credit": "Nathaniel Currier, The Destruction of Tea at Boston Harbor (1846), hand-colored lithograph, Library of Congress; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Aristophanes, The Acharnians (425 BC)",
          "excerpt": "But now some young drunkards go to Megara and carry off the courtesan Simaetha; the Megarians, hurt to the quick, run off in turn with two harlots of the house of Aspasia; and so for three gay women Greece is set ablaze. Then Pericles, aflame with ire on his Olympian height, let loose the lightning, caused the thunder to roll, upset Greece and passed an edict, which ran like the song, \"That the Megarians be banished both from our land and from our markets and from the sea and from the continent.\"",
          "source": "Aristophanes' comedy (anonymous prose translation, via Project Gutenberg) lampoons the Megarian embargo as a squabble over stolen courtesans that Pericles inflated into a ruinous trade war, comic mockery of leaders escalating petty commercial grievances into open confrontation.",
          "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm",
          "image": {
            "src": "/covers/trump-investigate-eu-trade-tech-fines--a2.png",
            "alt": "Engraved portrait of the playwright Aristophanes.",
            "credit": "Portrait of Aristophanes, engraving from Project Gutenberg eText 12788; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The Book of Proverbs 11:1 and 20:23 (King James Version, 1611)",
          "excerpt": "A false balance is abomination to the LORD: but a just weight is his delight. ... Divers weights are an abomination unto the LORD; and a false balance is not good.",
          "source": "The Book of Proverbs (King James Version, via Wikisource) condemns false balances and dishonest weights as an abomination, scripture's ancient demand for fair dealing in trade, the very fairness each side now claims the other has violated.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Proverbs",
          "image": {
            "src": "/covers/trump-investigate-eu-trade-tech-fines--a3.png",
            "alt": "Ornate engraved title page of the 1611 King James Bible.",
            "credit": "Title page of the first edition of the King James Bible (1611), engraved by Cornelis Boel; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba (1648)",
          "excerpt": "A golden Mediterranean dawn floods a marble harbour as the Queen of Sheba prepares to embark; merchant vessels ride at anchor while porters load cargo along the crowded quays. Claude Lorrain transforms an act of royal trade and diplomacy into a serene vision of commerce as the shining lifeblood of nations.",
          "source": "Claude Lorrain's luminous harbour scene (National Gallery, London) idealizes the seaport as the grand theatre of international commerce, the seaborne trade whose rules, tolls and access empires have always fought to control.",
          "href": "https://www.nationalgallery.org.uk/paintings/claude-seaport-with-the-embarkation-of-the-queen-of-sheba",
          "image": {
            "src": "/covers/trump-investigate-eu-trade-tech-fines--a4.png",
            "alt": "Baroque painting of a sunlit harbour crowded with merchant ships and figures.",
            "credit": "Claude Lorrain, Seaport with the Embarkation of the Queen of Sheba (1648), National Gallery, London; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749)",
          "excerpt": "Trumpets and drums blaze over a full wind band in music written to accompany the fireworks that celebrated peace among Europe's warring crowns. Its swaggering pomp captures how great powers dress up their rivalries and their reconciliations alike in ceremony and spectacle.",
          "source": "Handel's grand orchestral suite (scores via IMSLP) was composed to crown the fireworks marking the Treaty of Aix-la-Chapelle, which ended a great-power war, pageantry for the fragile diplomacy that follows, and sometimes forestalls, such confrontations.",
          "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)",
          "image": {
            "src": "/covers/trump-investigate-eu-trade-tech-fines--a5.png",
            "alt": "Oil portrait of composer George Frideric Handel holding a score.",
            "credit": "Thomas Hudson, portrait of George Frideric Handel (1756), National Portrait Gallery, London; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "trump-smithsonian-inaccurate-history-signs",
      "headline": "Trump orders warning signs posted at the Smithsonian saying some history exhibits are 'inaccurate'",
      "overview": "President Trump ordered signs placed outside Smithsonian history exhibits stating that some of their content is inaccurate and should be corrected, an unusual federal intervention into the institution's displays. The directive intensifies his administration's push to reshape how American history is presented in national museums. Historians and Smithsonian staff warned it could undermine the institution's independence and scholarship.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMioAFBVV95cUxQTmwxZTVQeU9OS0RkV2VrTGZZandHRTV3SjNPSkJOblpldzc4aFRKTVJ6MW9ldlducmNscGNkWXI1V0xkM0Q0SHdTRXdnMnYyUVU2Ml90NVBFN1FaTTFxNWthN3VzaVlpRWdMNzFqbkRfNW5IT05IdXBDNVhaMThUOUw1SDQ0NWU2QWh3M2tKQWQtTlpuODB2MkcybWNrU3B0?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/c1w10gwnj74o"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/trump-smithsonian-inaccurate-history-signs.png",
        "alt": "The red sandstone Smithsonian Institution Building, the Castle, on the National Mall in Washington, D.C.",
        "credit": "The Smithsonian Institution Building (the 'Castle'), Washington, D.C.; via Wikimedia Commons."
      },
      "rank": 10,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Tacitus, Annals, Book 4 (c. AD 116)",
          "excerpt": "The Fathers condemned the books to be by the Aediles burned; but they still continued concealed and dispersed: hence we may justly mock the stupidity of those, who imagine that they can, by present power, extinguish the lights and memory of succeeding times: for, quite otherwise, the punishment of writers exalts the credit of the writings: nor did ever foreign kings, or any else, reap other fruit from it, than infamy to themselves, and glory to the sufferers.",
          "source": "The Roman historian's account (Arthur Murphy translation) of Cremutius Cordus, prosecuted under Tiberius and driven to suicide for praising Brutus and Cassius, his histories ordered burned by the Senate; Tacitus mocks the delusion that state power can extinguish the memory of later ages.",
          "href": "https://www.gutenberg.org/cache/epub/7959/pg7959.txt",
          "image": {
            "src": "/covers/trump-smithsonian-inaccurate-history-signs--a0.png",
            "alt": "Engraved portrait of the Roman historian Tacitus",
            "credit": "Engraved portrait of the historian Tacitus; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Diego de Landa, Relacion de las cosas de Yucatan (c. 1566)",
          "excerpt": "We found a great number of books in these letters, and since they contained nothing but superstitions and falsehoods of the devil we burned them all, which they took most grievously, and which gave them great pain.",
          "source": "The Franciscan bishop's own memoir (William Gates translation, 1937) confessing the 1562 burning of the Maya codices at Mani, a first-person record of a colonial authority erasing an entire people's written history as 'falsehoods.'",
          "href": "https://www.globalgreyebooks.com/online-ebooks/diego-de-landa_yucatan-before-and-after-the-conquest_complete-text.html",
          "image": {
            "src": "/covers/trump-smithsonian-inaccurate-history-signs--a1.png",
            "alt": "A painted page from the Maya Dresden Codex showing glyphs and figures",
            "credit": "Page from the Dresden Codex, a surviving Maya screenfold book of the kind Landa burned; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "John Milton, Areopagitica (1644)",
          "excerpt": "For books are not absolutely dead things, but do contain a potency of life in them to be as active as that soul was whose progeny they are; nay, they do preserve as in a vial the purest efficacy and extraction of that living intellect that bred them. ... And yet, on the other hand, unless wariness be used, as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
          "source": "Milton's 1644 speech to Parliament against pre-publication licensing, arguing that to destroy a book is to kill reason itself, the founding English argument against state control of what may be read (Project Gutenberg text).",
          "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm",
          "image": {
            "src": "/covers/trump-smithsonian-inaccurate-history-signs--a2.png",
            "alt": "Painted portrait of the poet John Milton",
            "credit": "Portrait of John Milton; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Thucydides, History of the Peloponnesian War, Book 1.22 (c. 431-404 BC)",
          "excerpt": "The absence of romance in my history will, I fear, detract somewhat from its interest; but if it be judged useful by those inquirers who desire an exact knowledge of the past as an aid to the interpretation of the future, which in the course of human things must resemble if it does not reflect it, I shall be content. In fine, I have written my work, not as an essay which is to win the applause of the moment, but as a possession for all time.",
          "source": "The Athenian historian's statement of method (Richard Crawley translation), rejecting the pleasing story for a truthful record meant to endure, a claim to accuracy against those who would bend the narrative for the applause of the moment.",
          "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
          "image": {
            "src": "/covers/trump-smithsonian-inaccurate-history-signs--a3.png",
            "alt": "Roman marble bust of the historian Thucydides",
            "credit": "Roman marble bust of Thucydides (Royal Ontario Museum); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Dirck van Delen, Iconoclasm in a Church (Beeldenstorm in een kerk), 1630",
          "excerpt": "In a lofty Gothic interior, a mob wields hooks and hammers against the statues of saints, toppling figures from their niches and shattering carved images across the floor. Van Delen paints the Reformation's Beeldenstorm as an orderly architectural stage for disorder: the erasure of a contested past from sacred and public space, sanctioned as a purge of falsehood. What one age enshrines, another arrives to strike out.",
          "source": "A Dutch painting of the Beeldenstorm, the sixteenth-century iconoclasm in which crowds smashed statues and images they deemed idolatrous, staging the physical deletion of memory from public monuments.",
          "href": "https://commons.wikimedia.org/wiki/File:Dirck_van_Delen_-_Beeldenstorm_in_een_kerk.jpg",
          "image": {
            "src": "/covers/trump-smithsonian-inaccurate-history-signs--a4.png",
            "alt": "Painting of a crowd smashing religious statues and images inside a church",
            "credit": "Dirck van Delen, Iconoclasm in a Church (1630), Rijksmuseum, Amsterdam; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Henry Purcell, Dido's Lament ('When I am laid in earth'), from Dido and Aeneas (1689)",
          "excerpt": "Death is now a Welcom Gueſt,\nWhen I am laid in Earth my wrongs Create.\nNo trouble in thy Breaſt,\nRemember me, but ah! forget my Fate.",
          "source": "The closing lament of Purcell's opera (libretto by Nahum Tate), sung by the dying Dido, whose one plea is to be remembered even as her fate is forgotten; a meditation on memory and what survives of us (Wikisource libretto, original 1689 text).",
          "href": "https://en.wikisource.org/wiki/Dido_and_Aeneas_(1689)",
          "image": {
            "src": "/covers/trump-smithsonian-inaccurate-history-signs--a5.png",
            "alt": "Portrait of the composer Henry Purcell",
            "credit": "Henry Purcell, portrait by or after John Closterman (c. 1695); public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "chris-brown-guilty-london-nightclub-affray",
      "headline": "Singer Chris Brown pleads guilty to affray over a bottle attack at a London nightclub",
      "overview": "US singer Chris Brown pleaded guilty to affray over an attack in which a man was struck with a bottle at a London nightclub. The plea resolves a criminal case that had drawn the Grammy-winning artist into the British courts. He faces sentencing at a later hearing.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxPMnEtSjFoQ1J6S1d4eHFhbGRpaGxCR0pqZ0FSa29uOUpBMUtFbHg2cjVmODZFcC1EYmVSeGVsZ3hhYS1CVFJjcjk4U0F0Tld6eGlHb3R6WkJsMlFIb1ByNEJYZ21Sb0VfZUp6OG5mMV9RdEt4ak80azhLZzBGeHhzVlRjb3dCbVNic3BMUEV0c1k5eGhEN01KMVVIUTFOOW5tTzBvZWFPQ0RsWG55RWVLeVZrbFdGdw?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNbHpaRlN0cG1VeklwSXR6RDVtYzNFY1JOTTZjczgzZm4yU2o5YnhSVllkTGZmeVNKZFpjQmRqV1ZDZTdfeGg0MHlNbVREMjFwbnNXUFkwekhvckxGWmp0eGp2SUdOVE9Tb0FWSzU2NWtxSWF1cVJEaGlQc1E2ZjZSYS1aSEI3V3RiZEI4QTFjdFpNVXVWbFdhb2dudjNOWFZtRkRzNEFibjR5OXNfalFUTGw3NEdsNTQ?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/chris-brown-guilty-london-nightclub-affray.png",
        "alt": "Singer Chris Brown performing on stage under bright stage lights.",
        "credit": "Chris Brown performing in Tampa, 2015; CC0 1.0 public domain dedication, via Wikimedia Commons."
      },
      "rank": 11,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Plutarch, Life of Alexander, ch. 50–51 (c. 75 AD), trans. Bernadotte Perrin",
          "excerpt": "And so, at last, Alexander seized a spear from one of his guards, met Cleitus as he was drawing aside the curtain before the door, and ran him through. No sooner had Cleitus fallen with a roar and a groan than the king’s anger departed from him.",
          "source": "Plutarch’s biography (Perrin’s 1919 Loeb translation) records how the brilliant conqueror, inflamed by wine at a feast, ran his old friend Cleitus through with a spear and was instantly consumed by remorse — genius undone by a fatal loss of temper.",
          "href": "https://lexundria.com/plut_alex/50-52/prr",
          "image": {
            "src": "/covers/chris-brown-guilty-london-nightclub-affray--a0.png",
            "alt": "Illustration of Alexander the Great spearing Cleitus at a banquet as onlookers recoil.",
            "credit": "André Castaigne, The Killing of Cleitus (1898–1899); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Benvenuto Cellini, Autobiography, Book I (written 1558–63), trans. John Addington Symonds",
          "excerpt": "I drew a little dagger with a sharpened edge, and breaking the line of his defenders, laid my hands upon his breast so quickly and coolly, that none of them were able to prevent me. Then I aimed to strike him in the face; but fright made him turn his head round; and I stabbed him just beneath the ear. I only gave two blows, for he fell stone dead at the second. I had not meant to kill him; but as the saying goes, knocks are not dealt by measure.",
          "source": "The Renaissance goldsmith-sculptor’s own memoir (Symonds translation) recounts, almost without apology, how the celebrated artist knifed his enemy Pompeo dead in a Roman street — the archetype of dazzling talent yoked to an ungovernable temper.",
          "href": "https://www.gutenberg.org/cache/epub/4028/pg4028.txt",
          "image": {
            "src": "/covers/chris-brown-guilty-london-nightclub-affray--a1.png",
            "alt": "Cellini’s bronze statue of Perseus holding aloft the severed head of Medusa.",
            "credit": "Benvenuto Cellini, Perseus with the Head of Medusa (1545–1554), Loggia dei Lanzi, Florence; photograph via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "William Shakespeare, Romeo and Juliet, Act III, Scene 1 (c. 1595)",
          "excerpt": "No, ’tis not so deep as a well, nor so wide as a church door, but ’tis enough, ’twill serve. Ask for me tomorrow, and you shall find me a grave man. I am peppered, I warrant, for this world. A plague o’ both your houses.",
          "source": "In Shakespeare’s tragedy a hot-blooded street quarrel between young men flares into a duel; the witty Mercutio is stabbed and dies cursing both households, showing how a single brawl can wreck lives and reputations.",
          "href": "https://www.gutenberg.org/cache/epub/1513/pg1513.txt",
          "image": {
            "src": "/covers/chris-brown-guilty-london-nightclub-affray--a2.png",
            "alt": "Painting of the wounded Mercutio collapsing among companions after the street fight.",
            "credit": "Edwin Austin Abbey, The Death of Mercutio — Act III, Scene I, Romeo and Juliet (1902), Yale University Art Gallery; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Ovid, Metamorphoses, Book XII (c. 8 AD), trans. Brookes More",
          "excerpt": "By chance, an ancient bowl was near at hand. This rough with figures carved, the son of Aegeus caught and hurled it full in that vile centaur’s face. He, spouting out thick gouts of blood, and bleeding from his wounds—his brains and wine mixed,—kicked the blood-soaked sand.",
          "source": "In Ovid’s epic (Brookes More’s translation) the wedding feast of Pirithous collapses into carnage when the drunken Centaurs seize the women and Theseus hurls a heavy bowl into a reveller’s face — a celebration turned to bloodshed, a drinking vessel made a weapon.",
          "href": "https://www.theoi.com/Text/OvidMetamorphoses12.html",
          "image": {
            "src": "/covers/chris-brown-guilty-london-nightclub-affray--a3.png",
            "alt": "Renaissance painting of the chaotic battle between Lapiths and Centaurs at a wedding feast.",
            "credit": "Piero di Cosimo, The Fight between the Lapiths and the Centaurs (c. 1500–1515), National Gallery, London; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Adriaen Brouwer, A Peasant Brawl (c. 1630–1640)",
          "excerpt": "A dim tavern erupts into violence: one drinker lunges with a knife while another swings a stool, faces contorted with drink and rage as companions scramble to drag the brawlers apart. Brouwer, himself a hard-living tavern habitué, painted such scenes from the inside, distilling a night of carousing into sudden, ugly bloodshed.",
          "source": "Brouwer’s small Baroque panel in the Alte Pinakothek is a defining image of drink-fuelled violence among carousers — the seventeenth-century vision of a night out that turns to knives and flying furniture.",
          "href": "https://commons.wikimedia.org/wiki/File:Adriaen_Brouwer_-_The_brawl.jpg",
          "image": {
            "src": "/covers/chris-brown-guilty-london-nightclub-affray--a4.png",
            "alt": "Baroque painting of peasants fighting with knives and a stool in a tavern.",
            "credit": "Adriaen Brouwer, A Peasant Brawl (c. 1630–1640), Alte Pinakothek, Munich; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Giuseppe Verdi & Francesco Maria Piave, ‘Libiamo ne’ lieti calici’ (Brindisi), La traviata (1853)",
          "excerpt": "Libiam ne’ lieti calici\nChe la bellezza infiora,\nE la fuggevol ora\nS’innebrii a voluttà.\nLibiam ne’ dolci fremiti\nChe suscita l’amore,\nPoichè quell’occhio al core\nOnnipotente va.",
          "source": "The Brindisi from Verdi’s opera, on Piave’s libretto, is a glittering late-night drinking song at a lavish party — the seductive glamour of pleasure-seeking revelry that so often shadows scandal and ruin.",
          "href": "https://it.wikisource.org/wiki/La_traviata/Atto_primo",
          "image": {
            "src": "/covers/chris-brown-guilty-london-nightclub-affray--a5.png",
            "alt": "Portrait of composer Giuseppe Verdi in a top hat and white scarf.",
            "credit": "Giovanni Boldini, Portrait of Giuseppe Verdi (1886), Galleria Nazionale d’Arte Moderna, Rome; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "light-phone-flip-clamshell-launch",
      "headline": "Light launches the 'Light Flip', a $299 minimalist 5G clamshell phone built to limit distraction",
      "overview": "The company behind the Light Phone unveiled the Light Flip, its first clamshell handset and fourth device, pairing a physical keypad with a 2.8-inch OLED screen and a deliberately stripped-down operating system. Priced at $299, the 5G phone omits an app store, social media and a web browser in a bid to curb screen time. Shipping is expected to begin in 2027.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/24/light-phone-clamshell-flip-model/"
        },
        {
          "name": "The Next Web",
          "href": "https://thenextweb.com/news/light-flip-anti-ai-minimalist-flip-phone"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/light-phone-flip-clamshell-launch.png",
        "alt": "An open modern clamshell flip phone standing upright, showing a small external screen and a hinged body.",
        "credit": "Nafis Fuad Ayon, Cat S22 Flip (open); CC BY-SA 4.0, via Wikimedia Commons."
      },
      "rank": 12,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Diogenes Laertius, Lives and Opinions of Eminent Philosophers, Book VI, 'Diogenes' (early 3rd century AD; trans. C. D. Yonge, 1853)",
          "excerpt": "On one occasion he saw a child drinking out of its hands, and so he threw away the cup which belonged to his wallet, saying, “That child has beaten me in simplicity.” He also threw away his spoon, after seeing a boy, when he had broken his vessel, take up his lentils with a crust of bread.",
          "source": "The founding anecdote of Cynic asceticism, in which Diogenes discards even his last cup as superfluous — an ancient precursor to stripping a device down to the barest essentials.",
          "href": "https://www.gutenberg.org/files/57342/57342-h/57342-h.htm",
          "image": {
            "src": "/covers/light-phone-flip-clamshell-launch--a0.png",
            "alt": "Painting of Diogenes seated in his earthenware tub with dogs, lighting a lamp in daylight.",
            "credit": "Jean-Léon Gérôme, Diogenes (1860), The Walters Art Museum, Baltimore; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Athanasius of Alexandria, Life of Antony, §2 (c. 360 AD; trans. Nicene and Post-Nicene Fathers, 1892)",
          "excerpt": "Antony, as though God had put him in mind of the Saints, and the passage had been read on his account, went out immediately from the church, and gave the possessions of his forefathers to the villagers—they were three hundred acres, productive and very fair—that they should be no more a clog upon himself and his sister. And all the rest that was movable he sold, and having got together much money he gave it to the poor.",
          "source": "Athanasius's foundational monastic biography, whose hero renounces his inheritance and withdraws into the desert — the ur-model of deliberately shedding possessions and noise to escape distraction.",
          "href": "https://www.newadvent.org/fathers/2811.htm",
          "image": {
            "src": "/covers/light-phone-flip-clamshell-launch--a1.png",
            "alt": "Fifteenth-century panel painting of Saint Anthony the Abbot walking through a rocky wilderness.",
            "credit": "Master of the Osservanza, Saint Anthony the Abbot in the Wilderness (c. 1435), tempera and gold on panel, The Metropolitan Museum of Art, New York; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Henry David Thoreau, Walden; or, Life in the Woods, ch. 2 'Where I Lived, and What I Lived For' (1854)",
          "excerpt": "Our life is frittered away by detail. An honest man has hardly need to count more than his ten fingers, or in extreme cases he may add his ten toes, and lump the rest. Simplicity, simplicity, simplicity! I say, let your affairs be as two or three, and not a hundred or a thousand; instead of a million count half a dozen.",
          "source": "The classic American manifesto of voluntary simplicity, whose thrice-repeated “Simplicity!” reads almost as a design brief for a deliberately distraction-free phone.",
          "href": "https://www.gutenberg.org/files/205/205-h/205-h.htm",
          "image": {
            "src": "/covers/light-phone-flip-clamshell-launch--a2.png",
            "alt": "Restored 1856 daguerreotype portrait of Henry David Thoreau with a beard.",
            "credit": "Benjamin D. Maxham, daguerreotype of Henry David Thoreau (1856), restored; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Ecclesiastes 1:2, 14 (King James Version, 1611)",
          "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. … I have seen all the works that are done under the sun; and, behold, all is vanity and vexation of spirit.",
          "source": "The Hebrew wisdom book on the emptiness of endless striving, its verdict on ceaseless labor echoing the modern case that constant connectivity is “vanity and vexation of spirit.”",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
          "image": {
            "src": "/covers/light-phone-flip-clamshell-launch--a3.png",
            "alt": "Dutch vanitas still life with a skull, an overturned glass, a watch, and a guttering candle on a table.",
            "credit": "Pieter Claesz, Vanitas Still Life (1630), Mauritshuis, The Hague; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Antonello da Messina, Saint Jerome in His Study (c. 1475)",
          "excerpt": "In a luminous, meticulously ordered interior, the aged scholar sits alone at his raised wooden study, absorbed in a single book while the world recedes beyond the arches. Antonello surrounds him with a few quiet objects and a resting lion, turning the panel into a monument to undistracted concentration: one mind, one task, nothing superfluous.",
          "source": "Antonello's serene portrait of the scholar-saint in a spare, self-contained study — an emblem of the withdrawn, single-focused attention a stripped-down phone hopes to restore.",
          "href": "https://commons.wikimedia.org/wiki/File:Antonello_da_Messina_-_St_Jerome_in_his_study_-_National_Gallery_London.jpg",
          "image": {
            "src": "/covers/light-phone-flip-clamshell-launch--a4.png",
            "alt": "Renaissance painting of Saint Jerome reading at a wooden study set within a large arched interior, with a lion nearby.",
            "credit": "Antonello da Messina, Saint Jerome in His Study (c. 1475), The National Gallery, London; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Erik Satie, Gymnopédie No. 1 (1888)",
          "excerpt": "Three slow, bare chords rock beneath an unhurried, wandering melody; nothing is rushed and nothing ornamental, and the silence between notes carries as much weight as the notes. Satie pares the piano down to its plainest materials — an 1888 experiment in doing radically less that still sounds like calm made audible.",
          "source": "Satie's spare, hypnotic piano miniature reduces music to its essentials, an aesthetic of deliberate minimalism that mirrors the phone's stripped-down operating system.",
          "href": "https://imslp.org/wiki/3_Gymnop%C3%A9dies_(Satie%2C_Erik)",
          "image": {
            "src": "/covers/light-phone-flip-clamshell-launch--a5.png",
            "alt": "Painted portrait of the composer Erik Satie wearing a pince-nez, by Suzanne Valadon.",
            "credit": "Suzanne Valadon, Portrait of Erik Satie (1893), Centre Pompidou, Paris; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "france-spain-wildfires-200000-flee",
      "headline": "More than 200,000 people flee wildfires across France and Spain as suburbs around Bordeaux are evacuated",
      "overview": "Wildfires raging across France and Spain forced more than 200,000 people to flee, with some evacuated by boat as flames swept toward the coast. Suburbs around Bordeaux were evacuated as fires advanced amid extreme heat and wind. The blazes marked a sharp escalation of a summer fire crisis gripping southwestern Europe.",
      "genre": "Climate",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxNZUw0V2R4RnNrNmFrdFhRUjB5QVQ4WThwQ2NkYTI3RUdyV0xZdWc3dS1EUmJyaFI4dzc2a0EtU2VOSmQwRkJsLWdlT0VuVG1HcWwtcDIxSkFCdk55T2tOM2ppVVd4Ql9RNXVHZzk5dHZCWlRXdU9VOW1ERmVTQ2s4SkRXRXdNZjlHaEZpd3FR?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxNdktMME5KN1ExdnZKbndxQU94dENHWnFXQTgyaEczcHlfVFB3V1ZqUTNib1daZmFtdjNLS1owSU5pZExWOFc5azVBQ2x6MHE2Q1ozYmk4YkcwVmlnd2drS1NzdDBOeDk1TXlpQkJTd3ZybW9QS0ZFVDBjYnRRTlpoZG50VFNreVQtcmJURlE2T0R6MkxBZzlIQ3ZYOTlnM3NOaG1uR2tkdUc?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-25",
      "image": {
        "src": "/covers/france-spain-wildfires-200000-flee.png",
        "alt": "A towering wall of smoke and flame rising from burning pine forest near La Teste-de-Buch in the Gironde, southwestern France, July 2022.",
        "credit": "Photo of the July 2022 wildfire at La Teste-de-Buch (Gironde), France; CC BY-SA, via Wikimedia Commons."
      },
      "rank": 13,
      "edition": "Morning Edition · 25 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Tacitus, The Annals, Book 15 (c. AD 116), on the Great Fire of Rome of AD 64",
          "excerpt": "Often, while they looked behind them, they were intercepted by flames on their side or in their face. Or if they reached a refuge close at hand, when this too was seized by the fire, they found that, even places, which they had imagined to be remote, were involved in the same calamity.",
          "source": "The Roman historian's account of the fire that swept Rome under Nero, describing crowds trapped and overtaken as they fled; translated by Alfred John Church and William Jackson Brodribb. It echoes today's panicked flight as flames outran evacuees across southwestern Europe.",
          "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15",
          "image": {
            "src": "/covers/france-spain-wildfires-200000-flee--a0.png",
            "alt": "A night scene of classical Rome ablaze, columns and monuments silhouetted against roaring orange flames while figures flee in the foreground.",
            "credit": "Hubert Robert, The Fire of Rome (c. 1771), Musee d'art moderne Andre Malraux, Le Havre; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Samuel Pepys, Diary, entry for 2 September 1666, on the Great Fire of London",
          "excerpt": "So I down to the water-side, and there got a boat and through bridge, and there saw a lamentable fire.  Poor Michell's house, as far as the Old Swan, already burned that way, and the fire running further, that in a very little time it got as far as the Steeleyard, while I was there.  Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that layoff; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another.",
          "source": "Pepys's eyewitness diary of the Great Fire of London, watching Londoners load their goods into boats and flee to the water as the flames advanced. It mirrors the seaside evacuations by boat as this summer's fires drove toward the coast.",
          "href": "https://en.wikisource.org/wiki/Diary_of_Samuel_Pepys/1666/September",
          "image": {
            "src": "/covers/france-spain-wildfires-200000-flee--a1.png",
            "alt": "A painting of London engulfed in fire seen across the Thames at night, with Old London Bridge and the Tower silhouetted against a sky of flame and smoke.",
            "credit": "Unknown painter, The Great Fire of London (c. 1675), Museum of London; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Virgil, Aeneid, Book 2 (19 BC), the flight of Aeneas from burning Troy, tr. John Dryden",
          "excerpt": "'Haste, my dear father, ('tis no time to wait,)\nAnd load my shoulders with a willing freight.\nWhate'er befalls, your life shall be my care;\nOne death, or one deliv'rance, we will share.'",
          "source": "Virgil's epic scene of Aeneas carrying his aged father Anchises on his back out of a Troy consumed by fire, in Dryden's classic verse translation. It is the archetypal image of refugees carrying what they love most from an inferno.",
          "href": "https://www.gutenberg.org/files/228/228-h/228-h.htm",
          "image": {
            "src": "/covers/france-spain-wildfires-200000-flee--a2.png",
            "alt": "A Baroque painting of Aeneas carrying his elderly father on his back while leading his young son from the burning ruins of Troy.",
            "credit": "Federico Barocci, Aeneas' Flight from Troy (1598), Galleria Borghese, Rome; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The Book of Joel, chapter 2 (King James Version, 1611)",
          "excerpt": "A fire devoureth before them; and behind them a flame burneth: the land is as the garden of Eden before them, and behind them a desolate wilderness; yea, and nothing shall escape them.",
          "source": "The prophet Joel's vision of an advancing devastation that turns a paradise into a desolate wilderness, in the King James translation. Its image of fire devouring the land captures the scale of the blazes charring southwestern Europe.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Joel",
          "image": {
            "src": "/covers/france-spain-wildfires-200000-flee--a3.png",
            "alt": "An apocalyptic painting of a world collapsing in fire, with cliffs and cities tumbling into a fiery red abyss as tiny human figures fall.",
            "credit": "John Martin, The Great Day of His Wrath (1851-53), Tate, London; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "J. M. W. Turner, The Burning of the Houses of Lords and Commons (1834-35)",
          "excerpt": "Turner witnessed the Palace of Westminster consumed by fire on the night of 16 October 1834 and turned the catastrophe into a blaze of molten yellows and reds. The flames tower over the Thames while crowds mass on the far bank and bridge, dark against the glare, dwarfed by an inferno that swallows the seat of a nation. His canvas makes fire itself the overwhelming subject, beautiful and annihilating at once.",
          "source": "Turner's great painting of the 1834 destruction of Britain's Houses of Parliament, one of the most famous depictions of a city landmark devoured by fire. It renders the awe and helplessness of watching flames overtake a familiar skyline.",
          "href": "https://en.wikipedia.org/wiki/The_Burning_of_the_Houses_of_Lords_and_Commons",
          "image": {
            "src": "/covers/france-spain-wildfires-200000-flee--a4.png",
            "alt": "A luminous painting of the Houses of Parliament in flames at night, fire and smoke reflected across the Thames as crowds watch from the far shore.",
            "credit": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, October 16, 1834 (1835), Philadelphia Museum of Art; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Hector Berlioz, 'La Course a l'abime' (Ride to the Abyss) from La Damnation de Faust (1846)",
          "excerpt": "In this galloping orchestral episode Berlioz hurls Faust and Mephistopheles on a headlong ride into hell, strings and brass driving forward as the music builds to the Pandaemonium of a burning underworld. Shrieking woodwinds and hammering rhythms conjure a landscape aflame, a descent into fire that has no return. It is the sound of the inferno as devouring judgment.",
          "source": "The climactic 'ride to the abyss' from Berlioz's dramatic legend, a public-domain orchestral vision of a headlong plunge into a fiery hell. Its terror and momentum evoke the roar and rush of an advancing wildfire.",
          "href": "https://imslp.org/wiki/La_damnation_de_Faust,_H_111_(Berlioz,_Hector)",
          "image": {
            "src": "/covers/france-spain-wildfires-200000-flee--a5.png",
            "alt": "A 19th-century photographic portrait of the composer Hector Berlioz.",
            "credit": "Pierre Petit, portrait photograph of Hector Berlioz (1863), Bibliotheque nationale de France (Gallica); public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "icc-prosecutor-karim-khan-removed",
      "headline": "International Criminal Court members vote to remove chief prosecutor Karim Khan over sexual misconduct allegations",
      "overview": "The states party to the International Criminal Court dismissed chief prosecutor Karim Khan in an unprecedented vote, following allegations of sexual misconduct that he denies. Khan had already stepped aside during an external investigation, and US sanctions had kept him out of New York. His removal throws the court's most sensitive cases into fresh uncertainty.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxOQ0JtbzVPR3F4aFBNRUUzREI3QzRTU2NBYjl0cHZvX19OTWVlRDQwMUx1dlZ1Vlh1TkhfRXFQSm1ja3cxNkN4amVZSzEyUG56S0diMWxFVzlNNmlTRTJXZU5ER1FOQ0o3MHFkcmV0VEIxOEJOc3lwTmJaZDhfc1d1RnBIb0JRXzVNZ25PWEcta2lDOV9jZExfRm1wRUZ1ZjNPZmpFUkZmaWhsdw?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxOWW8xOVQ1cFkxMVdhdlFjRzNrQ1czNkhCb0RVWXJveW03RjZqaGVQR3hyaVItangzTjUwdE5NTTVJN00zYW5jMlNfU1BHNlZScUcwRmx3N1hYX1BSY3lRTFFrRmxrSTRRVnBkQmh4OUxuU3BnM0pEalNTMlQ3Ukh0UkNpYWVLZWcxWl9ZeExtWWF2d3ZFVDdwN21jU0x3amFJb2oyR1dOWXZsZw?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/icc-prosecutor-karim-khan-removed.png",
        "alt": "The glass-and-steel headquarters building of the International Criminal Court in The Hague, Netherlands.",
        "credit": "Ymblanter, via Wikimedia Commons (CC BY-SA 4.0)"
      },
      "lead": true,
      "rank": 14,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Fall of the Decemvir Appius Claudius, in Livy, History of Rome, Book 3.44 (Roberts translation, c. 449 BC events)",
          "excerpt": "This was followed by a second atrocity, the result of brutal lust, which occurred in the City and led to consequences no less tragic than the outrage and death of Lucretia, which had brought about the expulsion of the royal family. Not only was the end of the decemvirs the same as that of the kings, but the cause of their losing their power was the same in each case.",
          "source": "Livy's account of the decemvir Appius Claudius, a supreme magistrate who abused his own judgment seat to seize Verginia and was consequently deposed, embodies the guardian of law brought down by his own lust and misconduct.",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0026:book=3:chapter=44",
          "image": {
            "src": "/covers/icc-prosecutor-karim-khan-removed--a0.png",
            "alt": "Large neoclassical painting of a chaotic scene in the Roman Forum: a slain young woman lies center-stage as robed men, soldiers, and a grieving father recoil around the tribunal.",
            "credit": "Guillaume Guillon-Lethiere, La mort de Virginie (The Death of Virginia), 1828, Louvre, Paris; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "The Impeachment and Confession of Francis Bacon, Lord Chancellor of England, 1621 (1911 Encyclopaedia Britannica)",
          "excerpt": "I do again confess, that on the points charged upon me, although they should be taken as myself have declared them, there is a great deal of corruption and neglect; for which I am heartily and penitently sorry, and submit myself to the judgment, grace, and mercy of the court.",
          "source": "Francis Bacon, the highest judicial officer of the realm, was impeached for corruption, confessed, and was stripped of office and barred from public service forever, a landmark reckoning of the one meant to embody justice.",
          "href": "https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Bacon,_Francis",
          "image": {
            "src": "/covers/icc-prosecutor-karim-khan-removed--a1.png",
            "alt": "Half-length oil portrait of a bearded man in dark clothing and a tall black hat against a reddish background, hand resting before him.",
            "credit": "Paul van Somer I, Portrait of Francis Bacon, 1617, Lazienki Palace, Warsaw; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "William Shakespeare, Measure for Measure, Act II, Scene 2 (Angelo's soliloquy), c. 1604",
          "excerpt": "What's this? what's this? is this her fault, or mine? The Tempter, or the Tempted, who sins most? ha? Not she: nor doth she tempt: but it is I, That, lying by the Violet in the Sunne, Doe as the Carrion do's, not as the flowre, Corrupt with vertuous season.",
          "source": "Shakespeare's Angelo, the strict deputy appointed to enforce morality laws, secretly lusts after and coerces Isabella and is publicly exposed, the archetype of the judge who is himself the transgressor.",
          "href": "https://www.gutenberg.org/cache/epub/1126/pg1126.html",
          "image": {
            "src": "/covers/icc-prosecutor-karim-khan-removed--a2.png",
            "alt": "Engraving of a robed young woman kneeling and pleading with a seated official who turns toward her in an ornate interior.",
            "credit": "James Fittler after William Hamilton, Isabella and Angelo (Measure for Measure, Act 2, Scene 2), 1794, Metropolitan Museum of Art (CC0); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The History of Susanna, King James Version (Apocrypha), verses 5 and 61-62",
          "excerpt": "The same year were appointed two of the ancients of the people to be judges, such as the Lord spake of, that wickedness came from Babylon from ancient judges, who seemed to govern the people. ... And they arose against the two elders, for Daniel had convicted them of false witness by their own mouth: And according to the law of Moses they did unto them in such sort as they maliciously intended to do to their neighbour: and they put them to death.",
          "source": "The two elders in the Book of Susanna are appointed judges who lust after Susanna, bear false witness, and are themselves judged and put to death, the classic tale of who shall judge the judges.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Susanna",
          "image": {
            "src": "/covers/icc-prosecutor-karim-khan-removed--a3.png",
            "alt": "Baroque painting of a nude young woman seated outdoors, recoiling as two bearded old men lean in and gesture toward her.",
            "credit": "Guido Reni, Susanna and the Elders, c. 1620-1625, Auckland Art Gallery; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Gerard David, The Judgment of Cambyses (panel 1: The Arrest of the Corrupt Judge Sisamnes), 1498",
          "excerpt": "In this Netherlandish panel a richly dressed judge is seized at his own tribunal, hands laid upon him mid-verdict, as King Cambyses enumerates his crimes; the second panel shows him flayed alive for having taken bribes. Painted for the Bruges town hall as a warning to magistrates, it is a chilling emblem of the corrupt guardian of justice publicly stripped, arrested, and punished.",
          "source": "Gerard David's civic diptych of the corrupt judge Sisamnes, arrested at the bench and flayed, was commissioned to admonish officials that those who administer justice are themselves subject to reckoning.",
          "href": "https://commons.wikimedia.org/wiki/File:Gerard_David_-_The_Judgment_of_Cambyses,_panel_1_-_The_capture_of_the_corrupt_judge_SisamnesFXD.jpg",
          "image": {
            "src": "/covers/icc-prosecutor-karim-khan-removed--a4.png",
            "alt": "Late-medieval painting of a seated judge in a courtroom being seized by officials, with onlookers and small background scenes of an arrest.",
            "credit": "Gerard David, The Judgment of Cambyses (panel 1), 1498, Groeningemuseum, Bruges; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Artemisia Gentileschi, Susanna and the Elders, 1610",
          "excerpt": "Gentileschi paints the two judges as looming conspirators pressing over a wall, one hushing the other, while Susanna twists away in visible distress. Signed by the seventeen-year-old artist who herself would testify in a rape trial, the picture makes vivid the abuse of authority by men entrusted to uphold the law and the cornering of the innocent.",
          "source": "Gentileschi's earliest signed work renders the predatory elders-judges of the Susanna story with unusual empathy for the victim, dramatizing power and justice corrupted by those sworn to guard it.",
          "href": "https://commons.wikimedia.org/wiki/File:Susanna_and_the_Elders_(1610),_Artemisia_Gentileschi.jpg",
          "image": {
            "src": "/covers/icc-prosecutor-karim-khan-removed--a5.png",
            "alt": "Baroque painting of a nude young woman recoiling and twisting away as two men lean over a stone parapet above her, one raising a finger to his lips.",
            "credit": "Artemisia Gentileschi, Susanna and the Elders, 1610, Schloss Weissenstein, Pommersfelden; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "kyiv-drone-exhibition-strike-ten-killed",
      "headline": "Russian missile strike on a defense-technology exhibition near Kyiv kills 10",
      "overview": "A Russian missile struck a defense-industry exhibition on the outskirts of Kyiv, killing at least 10 people and wounding dozens who had gathered to view Ukrainian drones and other weapons. Ukrainian officials called it a deliberate attack on the country's arms sector. It was among the deadliest single strikes on the capital region in recent weeks.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNdmUyM0FtV09VRWkzQ1VGa1F0ZU10ZmtBNGI0eEpZUnR0ZXFjTmdyMS1ZX0hEdU9mUmhQdEJRemhNVnhlLXFGejh0QVA0alpoczFDendxcWRNUlNYdHNHVnNEaFp4aURYZGQwcFhFTWxLdlNTRVpUYk9YS0RnTkdRak9hX1FreDBtX0lBZ2NRTGJJWDlqX243aERMVlZ3VGp2TEtLSTdTcFlVb1JjTGtJUVNkblpySHM?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cj637zd1k1ko"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/kyiv-drone-exhibition-strike-ten-killed.png",
        "alt": "The shattered facade of an exhibition hall at dawn, blown-out windows and a plume of grey smoke rising over the city",
        "credit": "AI-generated"
      },
      "rank": 15,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Tacitus, Annals, Book IV, sections 62-63 (written c. 116 AD; on the collapse of the amphitheatre at Fidenae, 27 AD)",
          "excerpt": "Thither flocked all who loved such sights and who during the reign of Tiberius had been wholly debarred from such amusements; men and women of every age crowding to the place because it was near Rome. And so the calamity was all the more fatal. The building was densely crowded; then came a violent shock, as it fell inwards or spread outwards, precipitating and burying an immense multitude which was intently gazing on the show or standing round. Those who were crushed to death in the first moment of the accident had at least under such dreadful circumstances the advantage of escaping torture. More to be pitied were they who with limbs torn from them still retained life, while they recognised their wives and children by seeing them during the day and by hearing in the night their screams and groans.",
          "source": "Tacitus, The Annals, Book IV, translated by Alfred John Church and William Jackson Brodribb; public domain, via Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_4",
          "image": {
            "src": "/covers/kyiv-drone-exhibition-strike-ten-killed--a0.png",
            "alt": "Jean-Leon Gerome's 1872 painting Pollice Verso, showing a victorious gladiator in a packed Roman amphitheatre as the tiered crowd gestures thumbs-down.",
            "credit": "Jean-Leon Gerome, Pollice Verso (1872), Phoenix Art Museum. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "George Steer, 'The Tragedy of Guernica,' The Times (London), 28 April 1937",
          "excerpt": "On a crowded market-day afternoon in April 1937, wave after wave of German and Italian bombers of the Condor Legion emptied high-explosive and incendiary bombs onto the small Basque town of Guernica, then machine-gunned the survivors who fled into the surrounding fields. In little more than three hours a defenceless town far behind the front line was reduced to burning rubble. Steer's dispatch told the world that a civilian population could now be annihilated from the air as a deliberate instrument of war.",
          "source": "George Steer's eyewitness dispatch on the aerial bombing of Guernica of 26 April 1937; text via Wikisource.",
          "href": "https://es.wikisource.org/wiki/La_tragedia_de_Guernica_(George_Steer)",
          "image": {
            "src": "/covers/kyiv-drone-exhibition-strike-ten-killed--a1.png",
            "alt": "Black-and-white 1937 photograph of the ruins of Guernica: rows of gutted and collapsed buildings after the German aerial bombardment.",
            "credit": "Bundesarchiv, Bild 183-H25224 / CC-BY-SA 3.0 (Germany), via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Homer, The Iliad, Book I (translated by Samuel Butler, 1898)",
          "excerpt": "Thus did he pray, and Apollo heard his prayer. He came down furious from the summits of Olympus, with his bow and his quiver upon his shoulder, and the arrows rattled on his back with the rage that trembled within him. He sat himself down away from the ships with a face as dark as night, and his silver bow rang death as he shot his arrow in the midst of them. First he smote their mules and their hounds, but presently he aimed his shafts at the people themselves, and all day long the pyres of the dead were burning.",
          "source": "Homer, The Iliad, translated by Samuel Butler; public domain, via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm",
          "image": {
            "src": "/covers/kyiv-drone-exhibition-strike-ten-killed--a2.png",
            "alt": "Michiel Sweerts's painting Plague in an Ancient City, showing the bodies of the dead and dying strewn across the streets of a classical city.",
            "credit": "Michiel Sweerts, Plague in an Ancient City (c. 1652-54), Los Angeles County Museum of Art. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Taras Shevchenko, 'Legacy' (Zapovit / 'Testament'), 1845 (translated by Paul Selver, 1919)",
          "excerpt": "When it bears away from Ukraine / To the azure sea / Foemen's blood,-then I'll depart from / Mountain-side and lea: / These unheeding, I'll be speeding / Even unto God, / There to pray, but till that happen, / I'll know naught of God. // Grant me burial, then uprising, / Shatter every gyve; / Drench with evil blood of foeman / Freedom, that it thrive. / And my name in your great kindred, / Kindred free and new, / Ye shall cherish, lest it perish,- / Speak me fair and true.",
          "source": "Taras Shevchenko, 'Legacy,' translated by Paul Selver, in An Anthology of Modern Slavonic Literature in Prose and Verse (1919); public domain, via Wikisource.",
          "href": "https://en.wikisource.org/wiki/Anthology_of_Modern_Slavonic_Literature_in_Prose_and_Verse/Legacy",
          "image": {
            "src": "/covers/kyiv-drone-exhibition-strike-ten-killed--a3.png",
            "alt": "Oil self-portrait of the Ukrainian poet and painter Taras Shevchenko, painted in the winter of 1840-41.",
            "credit": "Taras Shevchenko, self-portrait (1840), National Museum Taras Shevchenko, Kyiv. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Francisco de Goya, The Third of May 1808 in Madrid (1814)",
          "excerpt": "In the dark hours after an uprising, a line of faceless soldiers levels its muskets at a huddle of unarmed Madrid townsfolk. A single lantern throws harsh light on a man in a white shirt who flings his arms wide in the instant before the volley, while at his feet lie those already shot, their blood pooling on the ground. Goya turns a modern execution into a timeless image of ordinary people cut down by the machinery of war.",
          "source": "Francisco de Goya, oil on canvas, 1814; Museo Nacional del Prado, Madrid (museum object page).",
          "href": "https://www.museodelprado.es/en/the-collection/art-work/the-3rd-of-may-1808-in-madrid-or-the-executions/5e177409-2993-4240-97fb-847a02c6496c",
          "image": {
            "src": "/covers/kyiv-drone-exhibition-strike-ten-killed--a4.png",
            "alt": "Goya's The Third of May 1808: a man in a white shirt with arms outstretched faces a firing squad by lantern light, the dead lying at his feet.",
            "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, The Triumph of Death (c. 1562)",
          "excerpt": "An army of skeletons sweeps across a scorched, corpse-strewn landscape, herding kings, soldiers, lovers and peasants alike toward a great trap of death. Fires burn on the horizon and wrecked ships litter a leaden sea, while the living are crowded together with no way out. Bruegel's panorama insists that death descends on a whole society at once, indifferent to rank, wealth, or innocence.",
          "source": "Pieter Bruegel the Elder, oil on panel, c. 1562; Museo Nacional del Prado, Madrid (museum object page).",
          "href": "https://www.museodelprado.es/en/the-collection/art-work/the-triumph-of-death/d3d82b0b-9bf2-4082-ab04-66ed53196ccc",
          "image": {
            "src": "/covers/kyiv-drone-exhibition-strike-ten-killed--a5.png",
            "alt": "Pieter Bruegel the Elder's The Triumph of Death: an army of skeletons overwhelming people of every station across a burning landscape.",
            "credit": "Pieter Bruegel the Elder, The Triumph of Death (c. 1562), Museo del Prado. Public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "anthropic-opus-5-model-launch",
      "headline": "Anthropic releases Claude Opus 5, an AI model it says nears its top model's ability at half the cost",
      "overview": "Anthropic launched Claude Opus 5, a model it describes as approaching the capability of its flagship Fable 5 at half the price and better suited to everyday office and programming work. The company said Opus 5 more than doubled its predecessor's coding performance while lowering the cost per task. It positioned the model as the new default for day-to-day use.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQbGtoSHNwQ0pjZ09saEozUGlWRVZ1ZG03ZC1Xc2UzNnZQSXRsQjkyWlBFVlM4QmM5WmtKVGhJbUZydG9UWEllUzgwbW90b0k1elZyQnpaV3VTNGZiNG5YWDdyNXFVTHhhTHN6TWpUU1RuSzYtNnpnN0M4VlpzeWp4azFmbWVyQTNlSXVfSlY5UTU2RGVsQ19ucGd2VlFEMGFEMG5J?oc=5"
        },
        {
          "name": "Bloomberg",
          "href": "https://www.bloomberg.com/news/articles/2026-07-24/anthropic-unveils-more-cost-efficient-model-for-everyday-tasks"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/anthropic-opus-5-model-launch.png",
        "alt": "A polished 12-inch silicon wafer covered in microchip dies, reflecting rainbow iridescence.",
        "credit": "Peellden, via Wikimedia Commons (CC BY-SA 3.0)"
      },
      "rank": 16,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Francis Bacon, Novum Organum (The New Organon), Book I, Aphorism 129 (1620), trans. by an anonymous translator (published by W. Wood, 1831)",
          "excerpt": "Again, we should notice the force, effect, and consequences of inventions, which are nowhere more conspicuous than in those three which were unknown to the ancients; namely, printing, gunpowder, and the compass. For these three have changed the appearance and state of the whole world; first in literature, then in warfare, and lastly in navigation: and innumerable changes have been thence derived, so that no empire, sect, or star, appears to have exercised a greater power and influence on human affairs than these mechanical discoveries.",
          "source": "Francis Bacon, Novum Organum, Book I, Aphorism 129 (1620), Wood translation of 1831, via Wikisource.",
          "href": "https://en.wikisource.org/wiki/Novum_Organum/Book_I_(Wood)",
          "image": {
            "src": "/covers/anthropic-opus-5-model-launch--a0.png",
            "alt": "A 1568 woodcut of a printing workshop: a puller draws a printed sheet from the press while a beater inks the forme and compositors set type in the background.",
            "credit": "Jost Amman, woodcut from Das Ständebuch, 1568. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Henry Ford (with Samuel Crowther), My Life and Work (1922), Chapter IV",
          "excerpt": "I will build a motor car for the great multitude. It will be large enough for the family but small enough for the individual to run and care for. It will be constructed of the best materials, by the best men to be hired, after the simplest designs that modern engineering can devise. But it will be so low in price that no man making a good salary will be unable to own one—and enjoy with his family the blessing of hours of pleasure in God's great open spaces.",
          "source": "Henry Ford and Samuel Crowther, My Life and Work (Garden City, 1922), via Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/7213/pg7213-images.html",
          "image": {
            "src": "/covers/anthropic-opus-5-model-launch--a1.png",
            "alt": "Workers on Ford's first moving assembly line at Highland Park, Michigan, assembling magnetos and flywheels for 1913 Ford automobiles.",
            "credit": "Unknown photographer, 1913 (Ford Motor Company / Highland Park). Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Aeschylus, Prometheus Bound (c. 5th century BCE), trans. Theodore Alois Buckley (1849)",
          "excerpt": "And verily I discover for them Numbers, the surpassing all inventions, the combinations too of letters, and Memory, effective mother-nurse of all arts. I also first bound with yokes beasts submissive to the collars; and in order that with their bodies they might become to mortals substitutes for their severest toils, I brought steeds under cars obedient to the rein, a glory to pompous luxury. And none other than I invented the canvas-winged chariots of mariners that roam over the ocean. After discovering for mortals such inventions, wretch that I am, I myself have no device whereby I may escape from my present misery.",
          "source": "Aeschylus, Prometheus Bound, in Buckley's prose translation, via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm",
          "image": {
            "src": "/covers/anthropic-opus-5-model-launch--a2.png",
            "alt": "Rubens's Prometheus Bound: the Titan sprawled on a rock as an eagle tears at his liver, punishment for giving fire to humankind.",
            "credit": "Peter Paul Rubens (with eagle by Frans Snyders), Prometheus Bound, c. 1611–1612, Philadelphia Museum of Art. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818), Chapter 5",
          "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
          "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus (1818), via Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/84/pg84-images.html",
          "image": {
            "src": "/covers/anthropic-opus-5-model-launch--a3.png",
            "alt": "Steel-engraved frontispiece to the 1831 Frankenstein showing Victor Frankenstein recoiling in horror as his newly animated creature stirs to life.",
            "credit": "Theodor von Holst, frontispiece to the 1831 edition of Frankenstein (Colburn & Bentley). Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Joseph Wright of Derby, A Philosopher Lecturing on the Orrery (c. 1766), oil on canvas, Derby Museum and Art Gallery",
          "excerpt": "A lamp stands in for the sun at the center of a mechanical model of the solar system, its glow raking across the rapt faces gathered around it—children, adults, a note-taking scholar. Wright dignifies a scientific demonstration with the reverence once reserved for religious painting, casting the spread of new knowledge to an ordinary audience as a kind of secular revelation. Learning once confined to elites is here made vivid, shared, and available to all who lean in toward the light.",
          "source": "Joseph Wright of Derby, A Philosopher Lecturing on the Orrery, c. 1766, Derby Museum and Art Gallery; overview via Wikipedia.",
          "href": "https://en.wikipedia.org/wiki/A_Philosopher_Lecturing_on_the_Orrery",
          "image": {
            "src": "/covers/anthropic-opus-5-model-launch--a4.png",
            "alt": "A philosopher lectures on an orrery lit from within by a lamp standing in for the sun, faces of the surrounding audience illuminated in the darkness.",
            "credit": "Joseph Wright of Derby, A Philosopher Lecturing on the Orrery, c. 1766, Derby Museum and Art Gallery. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Ludwig van Beethoven, The Creatures of Prometheus (Die Geschöpfe des Prometheus), Op. 43 (1801)",
          "excerpt": "Beethoven's only full ballet takes as its subject Prometheus, who fashions two clay figures and brings them to life, then leads his creations to Parnassus to be schooled in the arts and sciences. The vaulting overture and the finale—whose theme Beethoven would reuse in the Eroica—turn the myth of a maker gifting knowledge to his creatures into buoyant, forward-driving music. It is progress itself set to sound: a created intelligence raised up and taught to reach the heights of its teachers.",
          "source": "Ludwig van Beethoven, Die Geschöpfe des Prometheus, Op. 43 (1801); score and editions via IMSLP.",
          "href": "https://imslp.org/wiki/Die_Gesch%C3%B6pfe_des_Prometheus,_Op.43_(Beethoven,_Ludwig_van)",
          "image": {
            "src": "/covers/anthropic-opus-5-model-launch--a5.png",
            "alt": "Joseph Karl Stieler's 1820 portrait of Ludwig van Beethoven, seated and holding a manuscript, gazing intently upward.",
            "credit": "Joseph Karl Stieler, portrait of Beethoven, 1820, Beethoven-Haus, Bonn. Public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "nigeria-army-expansion-12-divisions",
      "headline": "Nigeria's President Tinubu approves the army's biggest expansion in decades, adding four divisions and 28,000 troops",
      "overview": "President Bola Tinubu approved expanding the Nigerian Army from eight to 12 divisions and recruiting 28,000 additional personnel, one of the largest structural overhauls of the force in years. New divisions will be based in Makurdi, Ilorin, Jalingo and Benin City to bolster counterinsurgency and border security. The build-out is to be completed in phases through December 2026.",
      "genre": "Politics",
      "sources": [
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cwymjx3nrxvo"
        },
        {
          "name": "Federal Ministry of Information",
          "href": "https://fmino.gov.ng/president-tinubu-approves-expansion-of-nigerian-army-to-12-divisions-recruitment-of-28000-personnel-to-strengthen-national-security/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/nigeria-army-expansion-12-divisions.png",
        "alt": "Nigerian Army soldiers in camouflage uniforms conducting a live-fire training exercise in an open field.",
        "credit": "USAFRICOM, via Wikimedia Commons (CC BY 2.0)"
      },
      "rank": 17,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Plutarch, Life of Caius Marius, ch. 9 (c. 100 CE; Bernadotte Perrin translation) — Marius opens the legions to the poor",
          "excerpt": "Contrary to law and custom he enlisted many a poor and insignificant man, although former commanders had not accepted such persons, but bestowed arms, just as they would any other honour, only on those whose property assessment made them worthy to receive these, each soldier being supposed to put his substance in pledge to the state.",
          "source": "Plutarch, Life of Caius Marius, chapter 9, trans. Bernadotte Perrin (Loeb Classical Library), via the Perseus Digital Library.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0049:chapter%3D9",
          "image": {
            "src": "/covers/nigeria-army-expansion-12-divisions--a0.png",
            "alt": "Ancient Roman marble bust traditionally identified as the general Gaius Marius, in the Glyptothek, Munich",
            "credit": "So-called bust of Gaius Marius, Glyptothek Munich (Inv. 319); photo by Bibi Saint-Pol, public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Decree of the National Convention on the levée en masse, 23 August 1793 (drafted by Barère for the Committee of Public Safety)",
          "excerpt": "Dès ce moment jusqu'à celui où les ennemis auront été chassés du territoire de la République, tous les Français sont en réquisition permanente pour le service des armées. Les jeunes gens iront au combat ; les hommes mariés forgeront les armes et transporteront les subsistances ; les femmes feront des tentes, des habits et serviront dans les hôpitaux ; les enfants mettront le vieux linge en charpie ; les vieillards se feront porter sur les places publiques pour exciter le courage des guerriers, prêcher la haine des rois et l'unité de la République.",
          "source": "Décret de la Convention nationale sur la levée en masse, 23 août 1793 (Archives parlementaires), reproduced on the Persée scholarly archive.",
          "href": "https://www.persee.fr/doc/arcpa_0000-0000_1907_num_72_1_47449_t1_0674_0000_3",
          "image": {
            "src": "/covers/nigeria-army-expansion-12-divisions--a1.png",
            "alt": "The National Guard of Paris departing for the front in September 1792, painting by Léon Cogniet",
            "credit": "Léon Cogniet, 'La Garde nationale de Paris part pour l'armée, septembre 1792' (1836), Château de Versailles; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Homer, The Iliad, Book II — the invocation before the Catalogue of Ships (8th c. BCE; Samuel Butler prose translation, 1898)",
          "excerpt": "And now, O Muses, dwellers in the mansions of Olympus, tell me—for you are goddesses and are in all places so that you see all things, while we know nothing but by report—who were the chiefs and princes of the Danaans? As for the common soldiers, they were so that I could not name every single one of them though I had ten tongues, and though my voice failed not and my heart were of bronze within me.",
          "source": "Homer, The Iliad, Book II, translated by Samuel Butler, via Project Gutenberg (ebook 2199).",
          "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
          "image": {
            "src": "/covers/nigeria-army-expansion-12-divisions--a2.png",
            "alt": "Detail of the Chigi vase showing a phalanx of Greek hoplites advancing to battle to the sound of a flute",
            "credit": "Detail of the Chigi olpe (Proto-Corinthian, c. 650 BCE), Museo Nazionale Etrusco di Villa Giulia, Rome; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "John Milton, Paradise Lost, Book I (1667) — Satan marshals his fallen legions",
          "excerpt": "\"Awake, arise, or be for ever fallen!\" They heard, and were abashed, and up they sprung Upon the wing, as when men wont to watch On duty, sleeping found by whom they dread, Rouse and bestir themselves ere well awake.",
          "source": "John Milton, Paradise Lost, Book I, via Project Gutenberg (ebook 26).",
          "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt",
          "image": {
            "src": "/covers/nigeria-army-expansion-12-divisions--a3.png",
            "alt": "Mezzotint of Satan standing over his prostrate legions rousing them to rise, by John Martin",
            "credit": "John Martin, 'Satan Arousing the Fallen Angels' (1824), Blanton Museum of Art; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Jacques-Louis David, The Distribution of the Eagle Standards (1810), Château de Versailles",
          "excerpt": "David's vast canvas stages the moment on 5 December 1804 when Napoleon, from a high dais, hands the new imperial eagle standards to massed ranks of officers who surge forward with outstretched arms to swear their oath. Rank upon rank of soldiers and banners recede into the light, turning the enlargement and consecration of an army into a single sweeping act of loyalty. It is the standing army made monumental: a state binding tens of thousands of men to its cause in one theatrical gesture.",
          "source": "Jacques-Louis David, 'Serment de l'armée fait à l'Empereur après la distribution des aigles, 5 décembre 1804' (1810), oil on canvas, Château de Versailles.",
          "href": "https://commons.wikimedia.org/wiki/File:Jacques_Louis_David-Serment_de_l'arm%C3%A9e_fait_%C3%A0_l'Empereur_apr%C3%A8s_la_distribution_des_aigles,_5_d%C3%A9cembre_1804.jpg",
          "image": {
            "src": "/covers/nigeria-army-expansion-12-divisions--a4.png",
            "alt": "Napoleon distributing eagle standards to ranks of soldiers who reach up to receive them, painting by Jacques-Louis David",
            "credit": "Jacques-Louis David, 'The Distribution of the Eagle Standards' (1810), Château de Versailles; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Claude-Joseph Rouget de Lisle, La Marseillaise (1792) — the war-song that summoned the battalions",
          "excerpt": "Aux armes, citoyens ! Formez vos bataillons ! Marchons, marchons ! Qu'un sang impur abreuve nos sillons ! Written in a single night at Strasbourg in April 1792 as France mobilized against invasion, its refrain literally commands citizens to form their battalions and march, and it became the anthem of a nation turning its whole people into an army.",
          "source": "Claude-Joseph Rouget de Lisle, 'La Marseillaise' (Chant de guerre pour l'armée du Rhin, 1792); scores via IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/La_Marseillaise_(Rouget_de_Lisle,_Claude-Joseph)",
          "image": {
            "src": "/covers/nigeria-army-expansion-12-divisions--a5.png",
            "alt": "Rouget de Lisle singing La Marseillaise for the first time at the home of the mayor of Strasbourg in 1792, painting by Isidore Pils",
            "credit": "Isidore Pils, 'Rouget de Lisle chantant la Marseillaise' (1849), Musée historique de Strasbourg; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "china-export-controls-14-eu-entities",
      "headline": "China imposes export controls on 14 EU entities in retaliation for the bloc's Russia-related sanctions",
      "overview": "China placed export controls on 14 European Union entities, retaliating for the EU's latest sanctions package targeting firms accused of aiding Russia. The measures restrict Chinese exports of dual-use goods to the named companies. Beijing framed the move as a defense of its firms against what it called discriminatory European actions.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNV2lLZG9JbFgxUFhZUFVLMkh3MEtMQlJaeW9WYlI4QWI4TmJtdHVXY2FxOENmSnhOTU5jMnBIUVZZNXh6ZEcyckN6bG5BdUpMY1lGM01PVHNIb1paRUZ5aDRlODBPV1VBQlhaNk5DWU10Wnp3N1dkd0xnaEU4MV9uQ0daclZudTdKNGZGa2tocXhNTzBvMHQxajdEUUV0VlR4ZnlBMVRjUQ?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMi1AFBVV95cUxOUlVQVGZKNU9qbFNNcHFBcy0tMVdwZ2RCS1Z0SC1oZDVBeUZrX2xSZlpvTklTMTBteUNmME55OVhVWWx5RlhINnRhOG9TS0dKSlNxN3hmWHExbXgtV0NIY3NmMVpaaERiaW1kUDFUVjlteWZQaHhOMUxqMWU5UWF6RW1hX1pCY1JWUEdJeWxrVW5ZZi02QXBVV3VHVGxLb05uaEtTYkl1WFJ1dUdpRFhxSVd0RnhpSmdONWtLQU1hek5VWjVwQ1Z1VWJSdG9mWGFPMFc4Sg?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/china-export-controls-14-eu-entities.png",
        "alt": "Tall stacks of multicoloured shipping containers at the Port of Rotterdam container terminal.",
        "credit": "AgainErick, via Wikimedia Commons (CC BY-SA 4.0)"
      },
      "rank": 18,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Megarian Decree, in Thucydides, History of the Peloponnesian War, Book I (c. 431 BCE; Richard Crawley translation)",
          "excerpt": "the Megarians, in a long list of grievances, called special attention to the fact of their exclusion from the ports of the Athenian empire and the market of Athens, in defiance of the treaty.",
          "source": "Thucydides, History of the Peloponnesian War, Book I.67, trans. Richard Crawley (Project Gutenberg).",
          "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
          "image": {
            "src": "/covers/china-export-controls-14-eu-entities--a0.png",
            "alt": "Marble bust of Pericles wearing a Corinthian helmet, Roman copy of a Greek original of c. 430 BCE, Vatican Museums.",
            "credit": "Bust of Pericles (Roman copy after Kresilas), Museo Pio-Clementino, Vatican Museums; photo by Jastrow, public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Napoleon's Berlin Decree establishing the Continental System (21 November 1806)",
          "excerpt": "Art. 1. The British Isles are declared to be in a state of blockade. Art. 2. All commerce and all correspondence with the British Isles are forbidden. Art. 5. Trade in English goods is prohibited, and all goods belonging to England or coming from her factories or her colonies are declared a lawful prize. Art. 7. No vessel coming directly from England or from the English colonies, or which shall have visited these since the publication of the present decree, shall be received in any port.",
          "source": "Napoleon I, Berlin Decree, 21 November 1806 (Wikisource).",
          "href": "https://en.wikisource.org/wiki/Berlin_Decree",
          "image": {
            "src": "/covers/china-export-controls-14-eu-entities--a1.png",
            "alt": "Jacques-Louis David's 1812 portrait of Napoleon standing in his study at the Tuileries, having worked through the night on his decrees.",
            "credit": "Jacques-Louis David, The Emperor Napoleon in His Study at the Tuileries (1812), National Gallery of Art, Washington; public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Aristophanes, The Acharnians (425 BCE) — the ruined Megarian at Dikaiopolis's market",
          "excerpt": "MEGARIAN. We are crying with hunger at our firesides. DICAEOPOLIS. The fireside is jolly enough with a piper. But what else is doing at Megara, eh? MEGARIAN. What else? When I left for the market, the authorities were taking steps to let us die in the quickest manner.",
          "source": "Aristophanes, The Acharnians, trans. The Athenian Society (Project Gutenberg).",
          "href": "https://www.gutenberg.org/files/3012/3012-h/3012-h.htm",
          "image": {
            "src": "/covers/china-export-controls-14-eu-entities--a2.png",
            "alt": "Ancient marble herm bust identified as the comic playwright Aristophanes, Uffizi Gallery, Florence.",
            "credit": "Bust of Aristophanes, 1st-century AD marble, Uffizi Gallery, Florence; photo by Alexander Mayatsky, CC BY-SA 4.0 via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "William Shakespeare, Coriolanus, Act I, Scene 1 (c. 1608) — the grain riot",
          "excerpt": "We are accounted poor citizens, the patricians good. What authority surfeits on would relieve us. If they would yield us but the superfluity while it were wholesome, we might guess they relieved us humanely. But they think we are too dear. The leanness that afflicts us, the object of our misery, is as an inventory to particularize their abundance; our sufferance is a gain to them. Let us revenge this with our pikes ere we become rakes; for the gods know I speak this in hunger for bread, not in thirst for revenge.",
          "source": "William Shakespeare, Coriolanus, Act I, Scene 1 (Project Gutenberg).",
          "href": "https://www.gutenberg.org/cache/epub/1535/pg1535.txt",
          "image": {
            "src": "/covers/china-export-controls-14-eu-entities--a3.png",
            "alt": "Nicolas Poussin's painting of Coriolanus, sword half-drawn, halted before the walls of Rome as his mother and family beg him to relent.",
            "credit": "Nicolas Poussin, Coriolanus Begged by His Family (c. 1652-53), Musee Nicolas-Poussin, Les Andelys; public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "\"Ograbme, or the American Snapping Turtle\" — political cartoon on the Embargo Act (Alexander Anderson, 1807)",
          "excerpt": "A snapping turtle named 'Ograbme' — 'embargo' spelled backwards — clamps its jaws on a merchant smuggling a barrel of goods toward a waiting British ship, while the trader howls, 'Oh, this cursed Ograbme!' The engraving lampoons Jefferson's self-imposed trade ban, which strangled American commerce more than it punished the European powers it targeted. The state's weapon bites the very hand that wields it.",
          "source": "Alexander Anderson, \"Ograbme, or the American Snapping Turtle\" (1807), Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Ograbme.jpg",
          "image": {
            "src": "/covers/china-export-controls-14-eu-entities--a4.png",
            "alt": "1807 cartoon of a snapping turtle labeled 'Ograbme' seizing a merchant carrying a barrel toward a ship, satirizing the Embargo Act.",
            "credit": "Alexander Anderson, \"Ograbme, or the American Snapping Turtle\" (1807); public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "James Gillray, \"The Plumb-pudding in Danger; or, State Epicures Taking un Petit Souper\" (1805)",
          "excerpt": "William Pitt and Napoleon Bonaparte sit at a table carving up a steaming globe as if it were a pudding — Pitt spearing the ocean, Napoleon slicing off Europe. Gillray's celebrated caricature captures two rival powers dividing the world into spheres of appetite and control. It is the classic image of great-power rivalry rendered as a contest over who will consume what.",
          "source": "James Gillray, \"The Plumb-pudding in Danger\" (1805), hand-colored etching, British Museum; via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:James_Gillray_-_The_Plum-Pudding_in_Danger_-_WGA08993.jpg",
          "image": {
            "src": "/covers/china-export-controls-14-eu-entities--a5.png",
            "alt": "Gillray's 1805 caricature of Pitt and Napoleon carving a globe-shaped pudding at a dinner table, dividing the world between them.",
            "credit": "James Gillray, The Plumb-pudding in Danger (1805), British Museum; public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "lebron-james-signs-76ers",
      "headline": "LeBron James signs with the Philadelphia 76ers, calling it his 'last decision'",
      "overview": "LeBron James announced he is joining the Philadelphia 76ers in pursuit of another championship, describing the move as his 'last decision' as his career winds down. The four-time NBA champion's arrival reshapes the Eastern Conference title picture. He framed the choice as the final chapter of a two-decade career.",
      "genre": "Culture",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMihAFBVV95cUxQNnp5bzdEd2lWTjZUQnFQdnV1ZTlQOWNBcU11RFRFSmtIY0JJUmpmZ0NFOG5VZUZna0xhVUdXTjRIeHRyQXd0b3lQV2dISXdUWUZCemRPWXFOR00zLVhnX3lmQWFrSHkxX0ZFWDZHaHN2T1NmeHlfR0RIWUtVczdkX0MzaGM?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOT2RLeG5GcnJuVXRyak9JRDhHRnFRSThwSGUtTHI3ZWhHRDdPel9lV2YwNnlVMlJNRjZVXzBpcHRwUVdsYXE2N01iVGpyWUJWWWNTRy1ZRW44ejg1a3RMblN4M1VSelpzRDktaC1zOEgzZlBXekVSTjdXVlFwNS1pUzlvZXVZdk9JOGRPOER0cGJPQjlPX1FUUG9jSGJaM0FDOEhISjVFc1M3cGhFd3pZMzJNZUZpUQ?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/lebron-james-signs-76ers.png",
        "alt": "Basketball star LeBron James on the court during an NBA game, wearing his team jersey.",
        "credit": "Erik Drost, via Wikimedia Commons (CC BY 2.0)"
      },
      "rank": 19,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Pausanias, Description of Greece 6.14.5–8 (2nd century AD; trans. W. H. S. Jones, 1918), on Milo of Croton",
          "excerpt": "Milo won six victories for wrestling at Olympia, one of them among the boys; at Pytho he won six among the men and one among the boys. He came to Olympia to wrestle for the seventh time, but did not succeed in mastering Timasitheus, a fellow-citizen who was also a young man, and who refused, moreover, to come to close quarters with him. … They say that he was killed by wild beasts. The story has it that he came across in the land of Crotona a tree-trunk that was drying up; wedges were inserted to keep the trunk apart. Milo in his pride thrust his hands into the trunk, the wedges slipped, and Milo was held fast by the trunk until the wolves—a beast that roves in vast packs in the land of Crotona—made him their prey.",
          "source": "The traveler Pausanias records the wrestler Milo of Croton's six Olympic titles, his failed seventh attempt as an older man, and his death, in his 2nd-century AD Description of Greece.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0160:book=6:chapter=14",
          "image": {
            "src": "/covers/lebron-james-signs-76ers--a0.png",
            "alt": "Baroque marble sculpture of the aged wrestler Milo of Croton, his hand trapped in a tree trunk as a lion attacks him.",
            "credit": "Pierre Puget, 'Milo of Croton' (1682), Musée du Louvre; photograph by Nathanael Burton, CC BY-SA 2.0, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "New-York Tribune report on the Johnson–Jeffries 'Fight of the Century,' July 6, 1910 (Chronicling America, Library of Congress)",
          "excerpt": "On July 4, 1910, at Reno, James J. Jeffries—the heavyweight champion who had retired undefeated six years earlier—was coaxed back into the ring as 'the hope' summoned to reclaim the title from Jack Johnson. Heavier and slowed by his years away from the sport, the aging former champion was outclassed and knocked down for the first time in his career before his corner threw in the towel in the fifteenth round. Newspapers across the country carried the story of a great champion's failed comeback and the end of his reign.",
          "source": "The Library of Congress's Chronicling America archive preserves the New-York Tribune's July 6, 1910 coverage of former champion James J. Jeffries's failed comeback against Jack Johnson.",
          "href": "https://chroniclingamerica.loc.gov/lccn/sn83030214/1910-07-06/ed-1/",
          "image": {
            "src": "/covers/lebron-james-signs-76ers--a1.png",
            "alt": "Photograph of the Johnson–Jeffries heavyweight prize fight in the outdoor arena at Reno, Nevada, 4 July 1910.",
            "credit": "Photograph of the Johnson–Jeffries prize fight, Reno, 4 July 1910; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Alfred, Lord Tennyson, 'Ulysses' (1842)",
          "excerpt": "you and I are old; / Old age hath yet his honour and his toil; / Death closes all: but something ere the end, / Some work of noble note, may yet be done, / Not unbecoming men that strove with Gods. … Come, my friends, / 'Tis not too late to seek a newer world. … for my purpose holds / To sail beyond the sunset, and the baths / Of all the western stars, until I die. … Tho' much is taken, much abides; and tho' / We are not now that strength which in old days / Moved earth and heaven; that which we are, we are; / One equal temper of heroic hearts, / Made weak by time and fate, but strong in will / To strive, to seek, to find, and not to yield.",
          "source": "Tennyson's dramatic monologue gives voice to an aged Ulysses who, restless in retirement, resolves on one last heroic voyage rather than 'rust unburnish'd.'",
          "href": "https://en.wikisource.org/wiki/Poems_(Tennyson,_1843)/Volume_2/Ulysses",
          "image": {
            "src": "/covers/lebron-james-signs-76ers--a2.png",
            "alt": "Painting of Ulysses bound to the mast of his ship as sirens climb aboard, on his long voyage home.",
            "credit": "Herbert James Draper, 'Ulysses and the Sirens' (c. 1909); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Homer, Iliad, Book 23 — the Funeral Games of Patroclus (8th c. BC; trans. A. T. Murray, 1924)",
          "excerpt": "Take this now, old sire, and let it be treasure for thee, a memorial of Patroclus' burying; for nevermore shalt thou behold him among the Argives. Lo, I give thee this prize unwon; for not in boxing shalt thou contend, neither in wrestling, nor shalt thou enter the lists for the casting of javelins, neither run upon thy feet; for now grievous old age weigheth heavy upon thee. … Would that I were young, and my strength were firm as on the day when the Epeians were burying lord Amarynceus at Buprasium, and his sons appointed prizes in honour of the king. … In boxing I overcame Clytomedes, son of Enops, and in wrestling Ancaeus of Pleuron, who stood up against me; Iphiclus I outran in the foot-race, good man though he was; and in casting the spear I outthrew Phyleus and Polydorus.",
          "source": "In Homer's account of the funeral games for Patroclus, Achilles hands the aged Nestor an unwon prize, and the old champion recalls the athletic victories of his vanished youth.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0134:book=23:card=615",
          "image": {
            "src": "/covers/lebron-james-signs-76ers--a3.png",
            "alt": "Ancient marble bust of the blind poet Homer, with deep-set eyes and a flowing beard.",
            "credit": "Roman marble bust of Homer, British Museum; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Boxer at Rest (the 'Boxer of the Quirinal'), Hellenistic Greek bronze, c. 330–50 BC, Museo Nazionale Romano",
          "excerpt": "A battered, heavily muscled boxer sits slumped in exhaustion after his bout, still wearing the leather himantes bound around his hands. He turns his head as if hailed, and his bruised, broken-nosed face, cut brows, cauliflower ears and the inlaid copper drops of blood on his thigh reveal a champion worn down by a lifetime of blows rather than an idealized youthful athlete. The Hellenistic bronze fixes the weariness and mortality that lie behind athletic glory.",
          "source": "This Hellenistic bronze in the Museo Nazionale Romano (Palazzo Massimo alle Terme), documented on the Metropolitan Museum of Art's exhibition page, depicts a veteran boxer resting after combat.",
          "href": "https://www.metmuseum.org/exhibitions/listings/2013/the-boxer",
          "image": {
            "src": "/covers/lebron-james-signs-76ers--a4.png",
            "alt": "Hellenistic bronze statue of a seated, exhausted nude boxer with a bruised face, hands still wrapped, turning his head.",
            "credit": "'Boxer of Quirinal,' Hellenistic bronze, Palazzo Massimo alle Terme, Rome; photograph by Carole Raddato, CC BY-SA 2.0, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Richard Strauss, Ein Heldenleben (A Hero's Life), Op. 40 (1898)",
          "excerpt": "Strauss's autobiographical tone poem follows a hero through his adversaries, his beloved, and the din of battle before arriving at its final section, 'The Hero's Retirement from this World and Consummation.' There the striving falls away into a serene, valedictory calm as the hero, his contests behind him, makes peace with the twilight of his life. The music becomes a meditation on greatness, weariness, and the acceptance of an end.",
          "source": "Richard Strauss's 1898 tone poem, whose full orchestral score is hosted on IMSLP, closes with the aging hero's withdrawal from the world and his final consummation.",
          "href": "https://imslp.org/wiki/Ein_Heldenleben,_Op.40_(Strauss,_Richard)",
          "image": {
            "src": "/covers/lebron-james-signs-76ers--a5.png",
            "alt": "Early photographic portrait of the composer Richard Strauss in formal dress.",
            "credit": "Richard Strauss, photograph by Underwood & Underwood; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "pakistan-tank-checkpoint-suicide-bombing",
      "headline": "Suicide bombing at a security post in northwest Pakistan kills 15, including 12 soldiers",
      "overview": "A suicide bomber rammed an explosives-laden vehicle into a joint military-police checkpoint in Tank district, Khyber Pakhtunkhwa, killing 15 people, including 12 soldiers, the army said. The Pakistani Taliban claimed the assault, which troops repelled before killing several attackers in a counter-operation. The attack came amid rising militant violence near the Afghan border.",
      "genre": "Conflict",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMivAFBVV95cUxOQXFSU0l0azVremwwWnhwejNNMlNrSlEtNFJ4TUhmaWY2U0VmbmticDl5VlUxME5JYnJhY21obXBaSnI2NzIyOVpFZnJ4Yk1PR0JMTUxna0FpbGdDdVJsQV9NcXZPd1E4TnBWbmpxdEFEMmFnb3dLVHJ3LUFVa1N2d2REUzJvV295OEtUeklUZXF3dEUyWGo4VXhscThKdDZ5dV92azM4UVZ2czlCNzVsRzZzV0ROaEh6eFhNQw?oc=5"
        },
        {
          "name": "Washington Post",
          "href": "https://www.washingtonpost.com/world/2026/07/24/pakistan-militant-attack-security-post-northwest-tank/6d16c078-876e-11f1-9cec-0fb26676f07e_story.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/pakistan-tank-checkpoint-suicide-bombing.png",
        "alt": "A deserted fortified checkpoint at dusk, concrete blast barriers and a thin column of smoke against an orange sky",
        "credit": "AI-generated"
      },
      "rank": 20,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Herodotus, The Histories, Book VII (chs. 223-225), c. 430 BC, trans. George Rawlinson",
          "excerpt": "For the Greeks, reckless of their own safety and desperate, since they knew that, as the mountain had been crossed, their destruction was nigh at hand, exerted themselves with the most furious valour against the barbarians. By this time the spears of the greater number were all shivered, and with their swords they hewed down the ranks of the Persians; and here, as they strove, Leonidas fell fighting bravely, together with many other famous Spartans. And now there arose a fierce struggle between the Persians and the Lacedaemonians over the body of Leonidas, in which the Greeks four times drove back the enemy, and at last by their great bravery succeeded in bearing off the body. Drawing back into the narrowest part of the pass, they posted themselves upon a hillock, where they stood all drawn up together in one close body. Here they defended themselves to the last, such as still had swords using them, and the others resisting with their hands and teeth.",
          "source": "Herodotus' account of the last stand of Leonidas and the three hundred Spartans holding the frontier pass at Thermopylae against the Persian host, Rawlinson translation via Wikisource.",
          "href": "https://en.wikisource.org/wiki/History_of_Herodotus/Book_7",
          "image": {
            "src": "/covers/pakistan-tank-checkpoint-suicide-bombing--a0.png",
            "alt": "Map of the pass of Thermopylae showing Greek and Persian positions during the battle of 480 BC.",
            "credit": "Map of the Battle of Thermopylae, 480 BC, via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "historical",
          "title": "William Barret Travis, Letter from the Alamo, 'To the People of Texas & All Americans in the World', February 24, 1836",
          "excerpt": "I am besieged, by a thousand or more of the Mexicans under Santa Anna. I have sustained a continual Bombardment & cannonade for 24 hours & have not lost a man. The enemy has demanded a surrender at discretion, otherwise, the garrison are to be put to the sword, if the fort is taken. I have answered the demand with a cannon shot, & our flag still waves proudly from the walls. I shall never surrender or retreat. Then, I call on you in the name of Liberty, of patriotism & every thing dear to the American character, to come to our aid, with all dispatch. If this call is neglected, I am determined to sustain myself as long as possible & die like a soldier who never forgets what is due to his own honor & that of his country. Victory or Death.",
          "source": "Lt. Col. Travis's appeal for reinforcements from the besieged frontier fort of the Alamo, days before its garrison was overrun; original held by the Texas State Library and Archives Commission.",
          "href": "https://www.tsl.texas.gov/treasures/republic/alamo/travis-about.html",
          "image": {
            "src": "/covers/pakistan-tank-checkpoint-suicide-bombing--a1.png",
            "alt": "Painting of hand-to-hand fighting inside the Alamo as Mexican troops overrun the defenders.",
            "credit": "Robert Jenkins Onderdonk, The Fall of the Alamo (c. 1903), via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "The Song of Roland (La Chanson de Roland), Laisse CXXXIII, 11th-12th c., trans. Charles Scott-Moncrieff",
          "excerpt": "Rollant hath set the olifant to his mouth, / He grasps it well, and with great virtue sounds. / High are those peaks, afar it rings and loud, / Thirty great leagues they hear its echoes mount. / So Charles heard, and all his comrades round; / Then said that King: 'Battle they do, our counts!' / And Guenelun answered, contrarious: / 'That were a lie, in any other mouth.'",
          "source": "The dying rearguard's horn-call from the mountain pass of Roncevaux, where the Franks are betrayed by Ganelon and overwhelmed by a surprise assault, from the anonymous Old French epic; Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/391/pg391.html",
          "image": {
            "src": "/covers/pakistan-tank-checkpoint-suicide-bombing--a2.png",
            "alt": "Gustave Dore engraving of Roland dying amid the slain at the pass of Roncevaux.",
            "credit": "Gustave Dore, Roland a Roncevaux (19th c.), via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "John Milton, Samson Agonistes (lines 1647-1659), 1671",
          "excerpt": "As with the force of winds and waters pent, / When Mountains tremble, those two massie Pillars / With horrible convulsion to and fro, / He tugg'd, he shook, till down they came and drew / The whole roof after them, with burst of thunder / Upon the heads of all who sate beneath, / Lords, Ladies, Captains, Councellors, or Priests, / Thir choice nobility and flower... / Samson with these immixt, inevitably / Pulld down the same destruction on himself; / The vulgar only scap'd who stood without.",
          "source": "The Messenger's report of blind Samson pulling the temple down upon the Philistine lords and himself, the archetype of the self-destroying attacker, from Milton's dramatic poem; Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/1745/pg1745.txt",
          "image": {
            "src": "/covers/pakistan-tank-checkpoint-suicide-bombing--a3.png",
            "alt": "Gustave Dore illustration of Samson bringing down the columns of the temple as figures fall amid the collapse.",
            "credit": "Gustave Dore, The Death of Samson (1866), via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "Jacques-Louis David, Leonidas aux Thermopyles (Leonidas at Thermopylae), 1814, oil on canvas, Musee du Louvre",
          "excerpt": "David's vast 1814 canvas shows the Spartan king Leonidas seated at the centre amid his soldiers in the moments before the battle, calm and resolute while men arm themselves around him and a youth carves a farewell inscription into the rock. The painting freezes the instant of deliberate self-sacrifice, the guardians of the frontier pass steeling themselves to die where they stand. It transforms a doomed last stand into an image of serene, unflinching duty.",
          "source": "David's monumental depiction of Leonidas and his Spartans before their annihilation at the frontier pass; Musee du Louvre, Paris (INV 3690).",
          "href": "https://collections.louvre.fr/ark:/53355/cl010065425",
          "image": {
            "src": "/covers/pakistan-tank-checkpoint-suicide-bombing--a4.png",
            "alt": "Neoclassical painting of Leonidas seated among Spartan warriors preparing for battle at Thermopylae.",
            "credit": "Jacques-Louis David, Leonidas at Thermopylae (1814), Musee du Louvre, via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "Elizabeth Butler (Lady Butler), The Remnants of an Army, 1879, oil on canvas, Tate",
          "excerpt": "Elizabeth Butler's 1879 painting shows Dr William Brydon, wounded and swaying on an exhausted horse, arriving alone at the gates of Jalalabad in January 1842, believed to be the sole survivor of an army of some sixteen thousand destroyed during the retreat from Kabul. The desolate frontier landscape and the single broken rider make the annihilation of an entire garrison on the Afghan border unbearably vivid. It is a portrait of catastrophe at the edge of empire, of guardians swallowed whole by a hostile frontier.",
          "source": "Butler's image of the lone survivor of the 1842 retreat from Kabul in the First Anglo-Afghan War, on the very frontier of today's event; Tate, London (N01553).",
          "href": "https://www.tate.org.uk/art/artworks/butler-the-remnants-of-an-army-n01553",
          "image": {
            "src": "/covers/pakistan-tank-checkpoint-suicide-bombing--a5.png",
            "alt": "Painting of a lone wounded rider on a spent horse approaching a fortress across an empty landscape.",
            "credit": "Elizabeth Butler (Lady Butler), The Remnants of an Army (1879), Tate, via Wikimedia Commons (public domain)."
          }
        }
      ]
    },
    {
      "slug": "varta-battery-maker-insolvency",
      "headline": "German battery maker Varta files four insolvency applications after rescue talks fail",
      "overview": "Varta, the storied German battery manufacturer, filed four insolvency applications under self-administration after rescue talks collapsed and shareholders Porsche and investor Michael Tojner declined further funding. The company blamed weak demand, currency swings and the loss of a key customer widely reported to be Apple. Creditors are now expected to break up the group.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxQSVBtYmFvNjJSMjg1d19XU0h2cDYtaHEtbWI0VEM3VzRjX2dwT05aVzlkZTd4azZMLTR6bEt0UG5aZ3VSREhnZmxoSWItcDVTYlZ1QkF3Y0xHdEo0eHJtNTgxa2dZRmlXa1l4UHhic3k4UXM2dng3Qm1lU0dzdFlCY0xlSlliNHl2aHRmb0ticE5lNFlXTmJuWnR0ZFRPR3c1SUln?oc=5"
        },
        {
          "name": "heise online",
          "href": "https://www.heise.de/en/news/Varta-facing-insolvency-Problems-due-to-Apple-and-general-business-situation-11375919.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/varta-battery-maker-insolvency.png",
        "alt": "The Varta AG headquarters and factory building in Ellwangen, Germany, with the company logo on the facade.",
        "credit": "Alexander-93, via Wikimedia Commons (CC BY-SA 4.0)"
      },
      "rank": 21,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Giovanni Villani, Nuova Cronica, Book XII, ch. 54, on the failure of the Bardi and Peruzzi companies of Florence (1345)",
          "excerpt": "In the year 1345 in the month of January failed the company of the Bardi, who had been the greatest merchants in Italy. And the reason was that they, like the Peruzzi, had lent their money and that invested with them to king Edward of England and to the king of Sicily; and that the Bardi found they had owing to them from the king of England, what with capital and interest and gifts promised by him, 900,000 florins of gold, and on account of his war with the king of France he was unable to pay; and from the king of Sicily 100,000 florins of gold. And to the Peruzzi were owing from the king of England 600,000 florins of gold, and from the king of Sicily 100,000 florins of gold, and a debt of 350,000 florins of gold, so they must stop payment to citizens and foreigners, to whom the Bardi alone owed more than 550,000 florins of gold. Whereby many other smaller companies and individuals whose money was in the hands of the Bardi or Peruzzi or others who had failed, were ruined and so became bankrupt.",
          "source": "Giovanni Villani, Nuova Cronica, Book XII, ch. 54 (c. 1345), translated by W. J. Ashley and reprinted in A. R. Benham, English Literature from Widsith to the Death of Chaucer (Yale University Press, 1916), pp. 261-262.",
          "href": "https://elfinspell.com/BenhamVillani.html",
          "image": {
            "src": "/covers/varta-battery-maker-insolvency--a0.png",
            "alt": "A page from a fourteenth-century illuminated manuscript of Giovanni Villani's Nuova Cronica, the chronicle of Florence that records the collapse of the Bardi bank.",
            "credit": "Giovanni Villani, Nuova Cronica manuscript, 14th c.; Biblioteca Nazionale Centrale di Firenze, photograph by Francesco Bini (Sailko), CC BY-SA 4.0, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Jonathan Swift, \"The South Sea Project\" (1721), on the bursting of the South Sea Bubble",
          "excerpt": "In stock three hundred thousand pounds, / I have in view a lord's estate; / My manors all contiguous round! / A coach-and-six, and served in plate! // Thus the deluded bankrupt raves, / Puts all upon a desperate bet; / Then plunges in the Southern waves, / Dipt over head and ears—in debt.",
          "source": "Jonathan Swift, \"The South Sea Project\" (written 1721), in The Poems of Jonathan Swift, D.D., Volume I, ed. W. E. Browning; Project Gutenberg edition.",
          "href": "https://www.gutenberg.org/files/14353/14353-h/14353-h.htm",
          "image": {
            "src": "/covers/varta-battery-maker-insolvency--a1.png",
            "alt": "William Hogarth's 1721 engraving The South Sea Scheme, showing crowds gambling on a whirling merry-go-round as speculators are ruined and Honesty is broken on the wheel.",
            "credit": "William Hogarth, The South Sea Scheme, 1721; National Gallery of Art, Washington (Rosenwald Collection, CC0), via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "William Shakespeare, The Life of Timon of Athens (c. 1606), Act IV, Scene 2 — the steward Flavius laments his master's fall",
          "excerpt": "Oh the fierce wretchednesse that Glory brings vs! Who would not wish to be from wealth exempt, Since Riches point to Misery and Contempt? Who would be so mock'd with Glory, or to liue But in a Dreame of Friendship, To haue his pompe, and all what state compounds, But onely painted like his varnisht Friends: Poore honest Lord, brought lowe by his owne heart, Vndone by Goodnesse: Strange vnvsuall blood, When mans worst sinne is, He do's too much Good.",
          "source": "William Shakespeare, The Life of Timon of Athens, Act IV, Scene 2 (First Folio text); Project Gutenberg edition (eBook #1132).",
          "href": "https://www.gutenberg.org/ebooks/1132",
          "image": {
            "src": "/covers/varta-battery-maker-insolvency--a2.png",
            "alt": "Nathaniel Dance-Holland's painting of the ruined Timon of Athens, once fabulously wealthy, now living in a cave and flinging away the gold he has unearthed.",
            "credit": "Nathaniel Dance-Holland, Timon of Athens, c. 1765-70; Royal Collection Trust (RCIN 406725), public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Honoré de Balzac, The Rise and Fall of César Birotteau (1837), the ruin of a Paris merchant",
          "excerpt": "There was nothing, therefore, to distress or intimidate Cesar Birotteau; yet the poor man could not enter the office of Monsieur Camusot—which chanced to be the one he had formerly occupied—without deep emotion, and he shuddered as he passed through the Hall of Bankruptcy.",
          "source": "Honoré de Balzac, The Rise and Fall of César Birotteau (1837), translated by Katharine Prescott Wormeley; Project Gutenberg edition (eBook #1942).",
          "href": "https://www.gutenberg.org/files/1942/1942-h/1942-h.htm",
          "image": {
            "src": "/covers/varta-battery-maker-insolvency--a3.png",
            "alt": "The 1842 daguerreotype portrait of Honoré de Balzac, author of the chronicle of merchant César Birotteau's bankruptcy and ruin.",
            "credit": "Louis-Auguste Bisson, daguerreotype of Honoré de Balzac, 1842; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Edward Burne-Jones, The Wheel of Fortune (La Roue de la Fortune), oil on canvas, 1883",
          "excerpt": "A colossal, impassive goddess Fortune turns her great wheel, to which are bound the naked figures of a slave, a king, and a poet, each raised up or crushed in turn as it revolves. The crowned king slides downward from the summit, an emblem of how the mightiest are cast down the instant Fortune's wheel comes round. Burne-Jones described his Fortune as an image true to life, coming to fetch each of us in turn, and then crushing us.",
          "source": "Edward Burne-Jones, The Wheel of Fortune, oil on canvas, 1883; Musée d'Orsay, Paris (catalogued in the Burne-Jones catalogue raisonné).",
          "href": "https://www.eb-j.org/browse-artwork-detail/NzQ3",
          "image": {
            "src": "/covers/varta-battery-maker-insolvency--a4.png",
            "alt": "Edward Burne-Jones's 1883 painting The Wheel of Fortune, with a slave, a king and a poet bound to the turning wheel of the towering goddess Fortune.",
            "credit": "Edward Burne-Jones, The Wheel of Fortune, 1883; Musée d'Orsay (Google Art Project), public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Thomas Cole, The Course of Empire: Destruction, oil on canvas, 1836",
          "excerpt": "In the fourth canvas of Cole's five-part cycle, a magnificent imperial city at the summit of its wealth and pride is engulfed by war and fire: towers topple, arches shatter, statues fall, and ships founder in the harbour as smoke boils over the sacked streets. The opulent metropolis that had risen to glory in the previous painting is dismembered and consumed in a single catastrophic day, its splendour reversed in an hour.",
          "source": "Thomas Cole, The Course of Empire: Destruction, oil on canvas, 1836; New-York Historical Society (accession 1858.4).",
          "href": "https://explorethomascole.org/project/destruction/",
          "image": {
            "src": "/covers/varta-battery-maker-insolvency--a5.png",
            "alt": "Thomas Cole's 1836 painting Destruction, showing a once-great city sacked and burning as its monuments collapse and ships wreck in the harbour.",
            "credit": "Thomas Cole, The Course of Empire: Destruction, 1836; New-York Historical Society, public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "sanaa-national-museum-ecuador-selected",
      "headline": "SANAA's design for Ecuador's new national museum in Quito is selected after public backlash over the earlier plan",
      "overview": "The Japanese studio SANAA's proposal for the new National Museum of Ecuador in Quito was chosen after an earlier design drew public outcry and was set aside. SANAA's scheme favors a light, low-slung and open structure in keeping with the firm's minimalist idiom. The reversal followed a wave of criticism over the previous plan.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/24/sanaa-design-for-national-museum-of-ecuador-selected/"
        },
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/new-design-chosen-for-national-museum-of-ecuador-1234755664/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/sanaa-national-museum-ecuador-selected.png",
        "alt": "SANAA's Rolex Learning Center at EPFL Lausanne, a low white building with sweeping curved roof and undulating floors.",
        "credit": "Rama, via Wikimedia Commons (CC BY-SA 3.0 FR)"
      },
      "rank": 22,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Strabo, Geography, Book XVII.1.8, describing the Mouseion of Alexandria (1st century BC / AD; trans. Hamilton & Falconer)",
          "excerpt": "The Museum is a part of the palaces. It has a public walk and a place furnished with seats, and a large hall, in which the men of learning, who belong to the Museum, take their common meal. This community possesses also property in common; and a priest, formerly appointed by the kings, but at present by Cæsar, presides over the Museum.",
          "source": "Strabo's Geography (17.1.8), the earliest surviving eyewitness account of the Mouseion of Alexandria, the ancient 'temple of the Muses' and library, via Perseus Digital Library (Tufts University).",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0239:book=17:chapter=1:section=8",
          "image": {
            "src": "/covers/sanaa-national-museum-ecuador-selected--a0.png",
            "alt": "A 19th-century artistic reconstruction of the interior of the ancient Library of Alexandria, with scholars among scrolls beneath tall columns and open light.",
            "credit": "O. Von Corven, 19th-century engraving of the Ancient Library of Alexandria; public domain, via Wikimedia Commons (File:Ancientlibraryalex.jpg)."
          }
        },
        {
          "category": "historical",
          "title": "British Museum Act 1753 (26 Geo. II c. 22), preamble establishing a national museum for the public",
          "excerpt": "And whereas all Arts and Sciences have a Connection with each other, and Discoveries in Natural Philosophy, and other Branches of speculative Knowledge, for the Advancement and Improvement whereof the said Museum or Collection was intended, do and may, in many Instances, give Help and Success to the most useful Experiments and Inventions; therefore to the End that the said Museum or Collection may be preserved and maintained, not only for the Inspection and Entertainment of the Learned and the Curious, but for the General Use and Benefit of the Publick.",
          "source": "The founding statute of the British Museum, the first national public museum, transcribed from the original Act at The Statutes Project.",
          "href": "https://statutes.org.uk/site/the-statutes/eighteenth-century/1753-26-george-2-c-22-establishing-the-british-museum/",
          "image": {
            "src": "/covers/sanaa-national-museum-ecuador-selected--a1.png",
            "alt": "An early 18th-century engraving of Montagu House in Bloomsbury seen from the north, the mansion that became the first home of the British Museum.",
            "credit": "James Simon, 'The North Prospect of Mountague House', c.1715; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The First Book of the Kings (1 Kings) 6:1–7, King James Version (1611) — Solomon builds the house to hold the Ark",
          "excerpt": "And the house which king Solomon built for the LORD, the length thereof was threescore cubits, and the breadth thereof twenty cubits, and the height thereof thirty cubits. And the porch before the temple of the house, twenty cubits was the length thereof, according to the breadth of the house... And the house, when it was in building, was built of stone made ready before it was brought thither: so that there was neither hammer nor axe nor any tool of iron heard in the house, while it was in building.",
          "source": "The King James Bible's account of the building of the Temple of Solomon, the archetypal house raised to hold a people's covenant and treasures, via Wikisource.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings",
          "image": {
            "src": "/covers/sanaa-national-museum-ecuador-selected--a2.png",
            "alt": "A c.1450 illuminated manuscript miniature showing labourers building the Temple of Solomon, dressing stone and raising walls.",
            "credit": "Illumination from Petrus Comestor's Bible Historiale, c.1450 (Den Haag, MMW, 10 B 23); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Samuel Taylor Coleridge, 'Kubla Khan; or, A Vision in a Dream' (composed 1797, published 1816)",
          "excerpt": "In Xanadu did Kubla Khan / A stately pleasure-dome decree: / Where Alph, the sacred river, ran / Through caverns measureless to man / Down to a sunless sea.",
          "source": "Coleridge's visionary fragment of a decreed 'stately pleasure-dome' — the ideal building conjured into being — via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/29090/29090-h/29090-h.htm",
          "image": {
            "src": "/covers/sanaa-national-museum-ecuador-selected--a3.png",
            "alt": "A page of Coleridge's own handwritten manuscript of Kubla Khan, ink on paper, with lines and corrections in his hand.",
            "credit": "Samuel Taylor Coleridge, holograph (Crewe) manuscript of 'Kubla Khan', c.1797–1816, British Library; public domain, via Wikimedia Commons (File:KublaKhan.jpeg)."
          }
        },
        {
          "category": "artistic",
          "title": "Thomas Cole, 'The Architect's Dream' (1840), oil on canvas, Toledo Museum of Art",
          "excerpt": "An architect reclines on the capital of a colossal column, dreaming an entire civilization of ideal buildings ranged along a luminous shore — Egyptian pylons, a Greek temple, a Roman aqueduct, a Gothic cathedral. Cole makes architecture itself the subject: the monumental building as the memory and aspiration of a whole culture, rising in idealized light. It is a painted meditation on the very ambition of raising a great civic monument.",
          "source": "Thomas Cole's allegory of architecture as civilization's memory, painted for the architect Ithiel Town; museum object at the Toledo Museum of Art.",
          "href": "https://commons.wikimedia.org/wiki/File:Thomas_Cole_-_The_Architect%27s_Dream_-_WGA05141.jpg",
          "image": {
            "src": "/covers/sanaa-national-museum-ecuador-selected--a4.png",
            "alt": "An architect reclines atop a giant column beside a curtain, surveying an imagined panorama of ideal ancient and medieval buildings glowing in soft light.",
            "credit": "Thomas Cole, 'The Architect's Dream' (1840), Toledo Museum of Art (acc. 1949.162); public domain, via Wikimedia Commons / Web Gallery of Art."
          }
        },
        {
          "category": "artistic",
          "title": "Modest Mussorgsky, 'The Great Gate of Kiev' (Bogatyr Gates), finale of Pictures at an Exhibition (1874)",
          "excerpt": "Mussorgsky's grand finale is music built as architecture: it summons in sound a monumental civic gate — Viktor Hartmann's prize-winning 1869 design for a great gate at Kiev, crowned with a helmet-shaped cupola — that was never actually constructed. Bells peal and a hymn-like chorale swells until the imagined stone arch seems to rise before the listener. It is a triumphal monument that lives only as a design and the art it inspired.",
          "source": "The closing movement of Mussorgsky's Pictures at an Exhibition, inspired by Viktor Hartmann's unbuilt design for the Great Gate of Kiev; public-domain score via IMSLP (Petrucci Music Library).",
          "href": "https://imslp.org/wiki/Pictures_at_an_Exhibition_(Mussorgsky,_Modest)",
          "image": {
            "src": "/covers/sanaa-national-museum-ecuador-selected--a5.png",
            "alt": "Viktor Hartmann's 1869 watercolour design for a monumental city gate at Kiev, a massive stone arch topped by a rounded cupola shaped like a Slavonic helmet.",
            "credit": "Viktor Hartmann, 'Plan for a City Gate in Kiev' (1869), the design behind Mussorgsky's finale; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "us-measles-cases-surpass-2025",
      "headline": "US measles cases in 2026 surpass the entire 2025 total, the most since 1991",
      "overview": "The US recorded more measles cases so far in 2026 than in all of 2025, reaching the highest count since 1991, according to the CDC. With more than 2,300 confirmed cases and months left in the year, most infections were in unvaccinated people amid falling childhood immunization rates. Officials warned the surge threatens the country's measles-elimination status.",
      "genre": "Science",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNVzRoRE04SEhYVnVZQ1F3aWduemwtdENSQS1LckVlR0RfVEhBUGotNHc4clkwYzMxckpycTBzbm9BQVROeTFhSE01N3N1a3ZKVUwzR2xQNVkweFNIblJmTUg0Rm1fZzlvWFVPOEhrb21hNzZaWG9wMlFBUmVxNi01dWtSNDVRTFY1Q1ZSMUlwWmlaVmtaY1NCVFhUVlVFSmNTWENJSUZB?oc=5"
        },
        {
          "name": "Contemporary Pediatrics",
          "href": "https://www.contemporarypediatrics.com/view/us-measles-cases-surpass-2025-total-highest-since-1991"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/us-measles-cases-surpass-2025.png",
        "alt": "An MMR (measles, mumps and rubella) vaccine vial with pre-filled syringe and packaging.",
        "credit": "Whispyhistory, via Wikimedia Commons (CC BY-SA 4.0)"
      },
      "rank": 23,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Thucydides, History of the Peloponnesian War, Book II (the Plague of Athens, 430 BC), Crawley translation",
          "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often ... The bodies of dying men lay one upon another, and half-dead creatures reeled about the streets.",
          "source": "Thucydides, History of the Peloponnesian War, Book 2, chs. 47-52, describing the plague that struck Athens in 430 BC (Richard Crawley translation).",
          "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
          "image": {
            "src": "/covers/us-measles-cases-surpass-2025--a0.png",
            "alt": "Baroque painting of a plague-stricken ancient city, with dead and dying figures sprawled among classical architecture.",
            "credit": "Michiel Sweerts, 'Plague in an Ancient City' (c. 1652-1654), Los Angeles County Museum of Art; public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "Edward Jenner, An Inquiry into the Causes and Effects of the Variolae Vaccinae (1798)",
          "excerpt": "What renders the Cow-pox virus so extremely singular, is, that the person who has been thus affected is for ever after secure from the infection of the Small Pox; neither exposure to the variolous effluvia, nor the insertion of the matter into the skin, producing this distemper.",
          "source": "Edward Jenner, An Inquiry into the Causes and Effects of the Variolae Vaccinae (1798), the founding text of vaccination, via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/29414/29414-h/29414-h.htm",
          "image": {
            "src": "/covers/us-measles-cases-surpass-2025--a1.png",
            "alt": "Satirical hand-colored etching of a vaccination clinic in which patients sprout small cows from their limbs and faces.",
            "credit": "James Gillray, 'The Cow-Pock, or the Wonderful Effects of the New Inoculation!' (1802), Library of Congress; public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Daniel Defoe, A Journal of the Plague Year (1722)",
          "excerpt": "The shrieks of women and children at the windows and doors of their houses, where their dearest relations were perhaps dying, or just dead, were so frequent to be heard as we passed the streets, that it was enough to pierce the stoutest heart in the world to hear them.",
          "source": "Daniel Defoe, A Journal of the Plague Year (1722), a narrative of the Great Plague of London of 1665, via Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/376/pg376.txt",
          "image": {
            "src": "/covers/us-measles-cases-surpass-2025--a2.png",
            "alt": "Old engraving showing scenes of the Great Plague of London: carts of the dead, coffins, and mourners in the streets.",
            "credit": "Engraving depicting scenes of the Great Plague of London, 1665; public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Giovanni Boccaccio, The Decameron (c. 1353), Introduction (the Plague of Florence, 1348), John Payne translation",
          "excerpt": "In men and women alike there appeared, at the beginning of the malady, certain swellings, either on the groin or under the armpits, whereof some waxed of the bigness of a common apple, others like unto an egg, some more and some less, and these the vulgar named plague-boils.",
          "source": "Giovanni Boccaccio, The Decameron, Introduction to the First Day, describing the 1348 plague in Florence (John Payne translation), via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm",
          "image": {
            "src": "/covers/us-measles-cases-surpass-2025--a3.png",
            "alt": "Etching of the 1348 plague in Florence, with the dead and dying strewn across a square as survivors recoil.",
            "credit": "Luigi Sabatelli, 'The Plague of Florence in 1348, as described in Boccaccio's Decameron' (etching, early 19th c.), Wellcome Collection; CC BY 4.0 via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Arnold Böcklin, Die Pest (The Plague), 1898, Kunstmuseum Basel",
          "excerpt": "A skeletal figure of Death, winged and astride a monstrous bat-like beast, sweeps low through a narrow medieval street. Bodies fall in its wake as the pestilence rushes upon the living, an allegory of plague as an unstoppable force scything through a town. Böcklin painted it after a cholera epidemic, giving ancient dread a modern shudder.",
          "source": "Arnold Böcklin, Die Pest (The Plague), tempera on wood, 1898, held at the Kunstmuseum Basel.",
          "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
          "image": {
            "src": "/covers/us-measles-cases-surpass-2025--a4.png",
            "alt": "Painting of Death, a winged skeleton riding a bat-like creature, flying through a narrow street over fallen bodies.",
            "credit": "Arnold Böcklin, 'Die Pest' (The Plague), 1898, Kunstmuseum Basel; public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Nicolas Poussin, The Plague at Ashdod (La Peste d'Asdod), 1630-31, Musée du Louvre",
          "excerpt": "In a grand classical city the Philistines are struck down by a divine plague after seizing the Ark of the Covenant. A mother lies dead as her infant still reaches for her breast, while figures pinch their noses against the stench and the fallen litter the marble steps. Poussin turns the biblical pestilence into a meditation on the sudden, indiscriminate ruin a plague brings, sparing not even the children.",
          "source": "Nicolas Poussin, The Plague at Ashdod (La Peste d'Asdod), oil on canvas, 1630-31, Musée du Louvre, Paris (INV 7276).",
          "href": "https://commons.wikimedia.org/wiki/File:Nicolas_Poussin_-_The_Plague_at_Ashdod_-_WGA18274.jpg",
          "image": {
            "src": "/covers/us-measles-cases-surpass-2025--a5.png",
            "alt": "Baroque painting of a classical city struck by plague, with the dead and dying, including a child beside its dead mother.",
            "credit": "Nicolas Poussin, 'The Plague at Ashdod', 1630-31, Musée du Louvre; public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "anduril-100-billion-valuation-talks",
      "headline": "Defense startup Anduril is in talks to raise funding at about a $100 billion valuation",
      "overview": "Anduril, the defense-technology company known for its drones, missiles and autonomous systems, is in talks to raise a new round at roughly a $100 billion valuation, more than triple its mark of a few months ago. The company said no final decisions have been made. The surge reflects investor enthusiasm for defense tech amid the US conflict with Iran.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMi1gFBVV95cUxQQi1vbktDeWx4OVF5U01jenY1R21ZSUxPeGtSU0xBYVBndjA1VFBlU2ZvRG4yb1p6bXJPLWpUcVNYQzk3OGR0d1diSHVhOGVSU1RiT0N5U0p6LU1qMjZ4eXEyNXc3UGJhYzhwOC1xVV9pRHVmMkNDX2NCMDQ0V0hudndUd0NfZURXaHRNUXpXWEczTmtRZXd3TldIS0VQaU9EcmR1ZTQtajNjRWVOc0s5dFlXMlh2SS1wUEZNYkNGMUNkRFlPeVNCbzVIeGZiWThpVjlYZ3R3?oc=5"
        },
        {
          "name": "TechCrunch",
          "href": "https://techcrunch.com/2026/07/24/anduril-reportedly-in-talks-to-raise-funding-at-100b-valuation-more-than-3x-last-years-mark/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/anduril-100-billion-valuation-talks.png",
        "alt": "An MQ-9 Reaper unmanned military drone with sensor turret and payloads on a runway.",
        "credit": "UK Ministry of Defence (Crown copyright), via Wikimedia Commons (OGL v1.0)"
      },
      "rank": 24,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Plutarch, Life of Demetrius (Demetrius Poliorcetes, \"the Besieger\"), c. 100 CE, trans. John & William Langhorne",
          "excerpt": "Nay, he seemed to show greater abilities in his preparations for war than in the use of them. He was not content unless he had stores that were more than sufficient. There was something peculiarly great in the construction of his ships and engines, and he took an unwearied pleasure in the invention of new ones. For he was ingenious in the speculative part of mechanics; and he did not, like other princes, apply his taste and knowledge of those arts to the purposes of diversion. But the mechanics of Demetrius were of a princely kind; there was always something great in preparation. His friends were astonished at their greatness, and his very enemies were pleased with their beauty.",
          "source": "Plutarch, \"Life of Demetrius,\" chapter 20, in Plutarch's Lives, translated by John and William Langhorne (public domain), hosted at Attalus.org.",
          "href": "https://www.attalus.org/old/demetrius1.html",
          "image": {
            "src": "/covers/anduril-100-billion-valuation-talks--a0.png",
            "alt": "Roman marble bust of Demetrius Poliorcetes with a diadem and bull's horns, a divinized portrait of the Macedonian besieger-king, Naples National Archaeological Museum.",
            "credit": "Marble bust of Demetrios Poliorketes (1st-century Roman copy of a Greek original, c. 300 BCE), Villa of the Papyri, Naples National Archaeological Museum, inv. 6149; photo by Marie-Lan Nguyen, CC BY 2.5 (artwork public domain)."
          }
        },
        {
          "category": "historical",
          "title": "Krupp: A Century's History of the Krupp Works, 1812-1912 (Essen: Fried. Krupp, 1912)",
          "excerpt": "The works then developed into a gun factory, and in rapid expansion acquired their great importance for the arming of nations, and therefore also for the prestige, greatness and power of Germany. It is a noteworthy coincidence, that the origin of the Krupp works and the birth of Alfred Krupp occur in an epoch, that, after years of the deepest humiliation, laid for the German nation the foundations of its resuscitation.",
          "source": "Krupp: A Century's History of the Krupp Works, 1812-1912, the firm's official centenary volume (Essen, 1912), full text at the Internet Archive.",
          "href": "https://archive.org/stream/cu31924030704880/cu31924030704880_djvu.txt",
          "image": {
            "src": "/covers/anduril-100-billion-valuation-talks--a1.png",
            "alt": "Portrait photograph of the German industrialist Alfred Krupp, the \"Cannon King,\" whose cast-steel guns made the Essen works one of the great arms enterprises of the 19th century.",
            "credit": "Alfred Krupp (1812-1887), portrait scanned from Meyers Konversations-Lexikon, 1906; Wikimedia Commons, public domain."
          }
        },
        {
          "category": "literary",
          "title": "The Story of the Volsungs (Volsunga Saga), ch. XV, trans. Eiríkr Magnússon & William Morris, 1888",
          "excerpt": "She said he looked like to win great fame, and gave him the sword. Therewith went Sigurd to Regin, and bade him make a good sword thereof as he best might; Regin grew wroth thereat, but went into the smithy with the pieces of the sword, thinking well meanwhile that Sigurd pushed his head far enow into the matter of smithying. So he made a sword, and as he bore it forth from the forge, it seemed to the smiths as though fire burned along the edges thereof. Now he bade Sigurd take the sword, and said he knew not how to make a sword if this one failed. Then Sigurd smote it into the anvil, and cleft it down to the stock thereof, and neither burst the sword nor brake it. Then he praised the sword much, and thereafter went to the river with a lock of wool, and threw it up against the stream, and it fell asunder when it met the sword.",
          "source": "The Story of the Volsungs, chapter XV (the reforging of the sword Gram from its shards), translated by Eiríkr Magnússon and William Morris (1888), public-domain text hosted by the Marxists Internet Archive.",
          "href": "https://www.marxists.org/archive/morris/works/1870/volsungs/volsungs.htm",
          "image": {
            "src": "/covers/anduril-100-billion-valuation-talks--a2.png",
            "alt": "Illustration of the young hero Sigurd testing the newly reforged sword Gram against the anvil in Regin's smithy.",
            "credit": "\"Sigurd prüft das Schwert Gram\" by Johannes Gehrts (1855-1921), from Walhall: Germanische Götter- und Heldensagen (1901); Wikimedia Commons, public domain."
          }
        },
        {
          "category": "literary",
          "title": "Homer, Iliad, Book XVIII (the forging of the arms of Achilles by Hephaestus), trans. Samuel Butler, 1898",
          "excerpt": "When he had so said he left her and went to his bellows, turning them towards the fire and bidding them do their office. Twenty bellows blew upon the melting-pots, and they blew blasts of every kind, some fierce to help him when he had need of them, and others less strong as Hephaistos willed it in the course of his work. He threw tough copper into the fire, and tin, with silver and gold; he set his great anvil on its block, and with one hand grasped his mighty hammer while he took the tongs in the other.",
          "source": "Homer, Iliad, Book XVIII (Hephaestus forges the shield and armour of Achilles at the request of Thetis), translated by Samuel Butler (1898), Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0217:book=18:card=468",
          "image": {
            "src": "/covers/anduril-100-billion-valuation-talks--a3.png",
            "alt": "Roman wall painting from Pompeii showing the goddess Thetis in Hephaestus' workshop inspecting the newly forged golden shield and armour of her son Achilles.",
            "credit": "Fresco depicting Thetis in the workshop of Hephaestus (c. 45-79 CE), House of Paccius Alexander, Pompeii; Naples National Archaeological Museum inv. 9529; photo CC BY-SA 4.0 (ancient artwork public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "Diego Velázquez, La Fragua de Vulcano (The Forge of Vulcan), 1630, Museo del Prado",
          "excerpt": "In a grimy blacksmith's shop the god Vulcan and his sweating helpers pause mid-hammer, their metalwork frozen as the radiant, laurel-crowned Apollo brings the news that Mars, god of war, has cuckolded him. Velázquez turns a mythological forge into a scene of astonished, muscular labour, the anvil and half-finished armour catching the firelight. The workshop where weapons and armour are beaten out becomes, in this masterpiece painted after his first journey to Italy, a stage for how war, desire and craft are bound together.",
          "source": "Diego Velázquez, La Fragua de Vulcano (oil on canvas, 223 x 290 cm, 1630), Museo Nacional del Prado, Madrid; image via Wikimedia Commons.",
          "href": "https://www.museodelprado.es/en/the-collection/art-work/vulcans-forge/84a0240d-b41a-404d-8433-6e4e2efd21ab",
          "image": {
            "src": "/covers/anduril-100-billion-valuation-talks--a4.png",
            "alt": "Velázquez's painting The Forge of Vulcan, showing Apollo announcing news to a startled Vulcan and his half-clad smiths at a fiery forge strewn with armour.",
            "credit": "Diego Velázquez (1599-1660), La Fragua de Vulcano, 1630, Museo del Prado; Wikimedia Commons, public domain."
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, Siegfried, WWV 86C, Act I \"Forging Scene\" (Schmiedelieder: \"Nothung! Nothung! Neidliches Schwert!\"), first performed 1876",
          "excerpt": "In the climax of Act I the young hero Siegfried reforges his father's shattered sword Nothung, filing the shards to powder, melting them down and hammering the glowing blade to a pounding orchestral rhythm as he sings \"Hoho! Hoho! Schmiede, mein Hammer.\" Wagner scores the smithy with anvil-strokes, roaring bellows in the brass and a triumphant sword motif that flares as the finished weapon cleaves the anvil in two. The forging of the legendary blade becomes a musical emblem of a new power rising, hammered into being from the fragments of the old.",
          "source": "Richard Wagner, Siegfried, WWV 86C, Act I, Scene 3 (the Forging Scene / Schmiedelieder); full orchestral score available at the International Music Score Library Project (IMSLP), public domain.",
          "href": "https://imslp.org/wiki/Siegfried,_WWV_86C_(Wagner,_Richard)",
          "image": {
            "src": "/covers/anduril-100-billion-valuation-talks--a5.png",
            "alt": "Ferdinand Leeke's painting of Siegfried standing at the forge, reforging the sword Nothung amid sparks and flame.",
            "credit": "Ferdinand Leeke (1859-1937), Siegfried in der Schmiede (Siegfried at the Forge), 1900; Wikimedia Commons, public domain."
          }
        }
      ]
    },
    {
      "slug": "samsung-sk-hynix-us-chip-deals",
      "headline": "Samsung and SK Hynix to announce major memory-chip supply deals with US tech firms, Seoul says",
      "overview": "South Korea said Samsung Electronics and SK Hynix will announce major long-term memory-chip supply deals with US technology companies during President Lee Jae Myung's visit to San Francisco. Officials expect 'very large and meaningful figures,' driven by surging demand for high-bandwidth memory used in AI systems. The deals follow the two firms' huge pledge to build new fabs at home.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxQUU9hRHpSZjhTckdMMkZMcWVfX1pTWDFJNV9FWTllbi13MlJhZjZYUWVZOGpmblVpWE9ua3BjUHRaZ2Z5V2IxOGlGN1hrU0xQUFozc21rLXJiZ3p5NkpldnBoOUZ0aHhOOVJBOGxhRGVPYnVYVTBIMElLejJMWFN6cnB2LXpBMXhZQ2hGZVY2ZmhCNEJuaVI4REthQ2h5VkdWQlhSWWp0Smt3dWdxSC1GN3MxSGg1X0hzbU5POTNrVmowU21sNnduVEFnWQ?oc=5"
        },
        {
          "name": "Quartz",
          "href": "https://qz.com/samsung-sk-hynix-memory-chip-supply-deals-us-tech-072426"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/samsung-sk-hynix-us-chip-deals.png",
        "alt": "A green DRAM memory module circuit board lined with black memory chips.",
        "credit": "Mixabest, via Wikimedia Commons (public domain)"
      },
      "rank": 25,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Pliny the Elder, Natural History, Book XXXI, on salt (c. 77 CE; Bostock & Riley translation)",
          "excerpt": "We may conclude, then, by Hercules! that the higher enjoyments of life could not exist without the use of salt: indeed, so highly necessary is this substance to mankind, that the pleasures of the mind, even, can be expressed by no better term, than the word “salt,” such being the name given to all effusions of wit. All the amenities, in fact, of life, supreme hilarity, and relaxation from toil, can find no word in our language to characterize them better than this. Even in the very honours, too, that are bestowed upon successful warfare, salt plays its part, and from it, our word “salarium” is derived.",
          "source": "Pliny's encyclopedic Natural History praises salt as an essential substance without which civilized life is impossible, so vital that Roman soldiers were once paid in it; Bostock and Riley English translation via Project Gutenberg (Vol. 5).",
          "href": "https://www.gutenberg.org/files/60688/60688-h/60688-h.htm",
          "image": {
            "src": "/covers/samsung-sk-hynix-us-chip-deals--a0.png",
            "alt": "Engraved portrait of the Roman naturalist Pliny the Elder.",
            "credit": "Engraving of Pliny the Elder, via Wikimedia Commons / U.S. National Institutes of Health (public domain)."
          }
        },
        {
          "category": "historical",
          "title": "The Travels of Marco Polo, Book II, on the salt revenue of Kinsay (c. 1300; Yule–Cordier translation, 1903)",
          "excerpt": "First there is the salt, which brings in a great revenue. For it produces every year, in round numbers, fourscore tomans of gold; and the toman is worth 70,000 saggi of gold, so that the total value of the fourscore tomans will be five millions and six hundred thousand saggi of gold, each saggio being worth more than a gold florin or ducat; in sooth, a vast sum of money! This province, you see, adjoins the ocean, on the shores of which are many lagoons or salt marshes, in which the sea-water dries up during the summer time; and thence they extract such a quantity of salt as suffices for the supply of five of the kingdoms of Manzi besides this one.",
          "source": "The Venetian merchant Marco Polo describes how the salt monopoly poured a vast revenue into the treasury of Kublai Khan's China, one commodity underwriting an empire; Henry Yule and Henri Cordier translation via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/12410/12410-h/12410-h.htm",
          "image": {
            "src": "/covers/samsung-sk-hynix-us-chip-deals--a1.png",
            "alt": "A camel caravan crossing Central Asia on the Silk Road, from the 1375 Catalan Atlas.",
            "credit": "Detail of the Catalan Atlas by Abraham Cresques, 1375, Bibliothèque nationale de France, via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "William Shakespeare, The Merchant of Venice, Act I, Scene 1 (c. 1596–1598)",
          "excerpt": "Believe me, no. I thank my fortune for it, / My ventures are not in one bottom trusted, / Nor to one place; nor is my whole estate / Upon the fortune of this present year: / Therefore my merchandise makes me not sad.",
          "source": "Shakespeare's comedy of Venetian commerce opens with the merchant Antonio explaining that his fortune rides on argosies scattered across many seas rather than a single venture; text via Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/1515/pg1515-images.html",
          "image": {
            "src": "/covers/samsung-sk-hynix-us-chip-deals--a2.png",
            "alt": "The merchant Shylock and his daughter Jessica in a candlelit Venetian interior.",
            "credit": "Maurycy Gottlieb, Shylock and Jessica, 1876, via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "Joseph Conrad, Nostromo: A Tale of the Seaboard (1904)",
          "excerpt": "What is wanted here is law, good faith, order, security. Any one can declaim about these things, but I pin my faith to material interests. Only let the material interests once get a firm footing, and they are bound to impose the conditions on which alone they can continue to exist. That's how your money-making is justified here in the face of lawlessness and disorder. It is justified because the security which it demands must be shared with an oppressed people. A better justice will come afterwards.",
          "source": "In Conrad's novel the Englishman Charles Gould stakes everything on the San Tomé silver mine, arguing that a single strategic material, once entrenched, will impose order and bind a turbulent republic to distant financiers; text via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/2021/2021-h/2021-h.htm",
          "image": {
            "src": "/covers/samsung-sk-hynix-us-chip-deals--a3.png",
            "alt": "Sixteenth-century woodcut of the silver mountain Cerro Rico looming over the mining town of Potosí.",
            "credit": "Woodcut of Cerro de Potosí from Pedro Cieza de León, Crónica del Perú (1553), via Wikimedia Commons (CC BY-SA 4.0)."
          }
        },
        {
          "category": "artistic",
          "title": "Hendrick Cornelisz Vroom, The Return to Amsterdam of the Second Expedition to the East Indies, 19 July 1599 (oil on canvas, 1599)",
          "excerpt": "Vroom's panorama shows four deep-laden ships of the second Dutch expedition to the East Indies crowding back into Amsterdam after a fifteen-month voyage, sails still swollen as small boats row out to greet them. Their cargo of pepper and spice, wrung from markets half a world away, would soon justify the founding of the Dutch East India Company. The picture is a portrait of a distant, strategic trade route binding a small maritime nation to suppliers across the oceans.",
          "source": "Vroom's earliest dated marine painting records the triumphant return of the Dutch spice fleet, forerunner of the VOC monopoly; Rijksmuseum, Amsterdam (object SK-A-2858).",
          "href": "https://www.rijksmuseum.nl/en/collection/object/The-Return-to-Amsterdam-of-the-Second-Expedition-to-the-East-Indies--68e3266d15d285dcdf44379c4add1c7c",
          "image": {
            "src": "/covers/samsung-sk-hynix-us-chip-deals--a4.png",
            "alt": "Dutch East Indiamen and small rowing boats crowd the harbour of Amsterdam as the spice fleet returns in 1599.",
            "credit": "Hendrick Cornelisz Vroom, The Return to Amsterdam of the Second Expedition to the East Indies, 1599, Rijksmuseum (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749)",
          "excerpt": "Handel scored this blazing suite — a French overture followed by bourrée, La Paix, La Réjouissance and minuets — for a vast band of trumpets, horns, oboes, bassoons and drums, commissioned by George II to accompany a colossal fireworks display in London's Green Park. The occasion was the Treaty of Aix-la-Chapelle of 1748, which ended the War of the Austrian Succession and sealed a fragile peace among the great powers. The music turns a diplomatic settlement into public spectacle, an alliance of nations proclaimed in fire and brass.",
          "source": "Handel's orchestral suite was composed to celebrate the peace treaty of Aix-la-Chapelle, an international pact translated into music and fireworks; full score at IMSLP (Petrucci Music Library).",
          "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)",
          "image": {
            "src": "/covers/samsung-sk-hynix-us-chip-deals--a5.png",
            "alt": "Hand-coloured etching of the 1749 royal fireworks display celebrating the Peace of Aix-la-Chapelle.",
            "credit": "The Royal Fireworks of 1749, contemporary hand-coloured etching, via Wikimedia Commons (public domain)."
          }
        }
      ]
    },
    {
      "slug": "som-400-lake-shore-north-tower-tops-out",
      "headline": "SOM's North Tower at 400 Lake Shore Drive tops out at 261 metres on Chicago's lakefront",
      "overview": "Skidmore, Owings & Merrill's North Tower at 400 Lake Shore Drive topped out at 261 metres, or 857 feet, at the mouth of the Chicago River, completing its 83-foot architectural crown. The 72-storey residential tower uses a staggered, wind-responsive structure to shed Chicago's gusts without mechanical dampers. It anchors a new public waterfront district on a long-stalled site.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/24/north-tower-skyscraper-400-lake-shore-drive-chicago-som/"
        },
        {
          "name": "Parametric Architecture",
          "href": "https://parametric-architecture.com/soms-400-lake-shore-chicago/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/som-400-lake-shore-north-tower-tops-out.png",
        "alt": "The 400 Lake Shore Drive skyscraper rising over the Chicago lakefront, viewed from the Lakefront Trail.",
        "credit": "AlphaBeta135, via Wikimedia Commons (CC BY 4.0)"
      },
      "rank": 26,
      "edition": "Evening Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Herodotus, The Histories, Book 1.181 — the temple of Zeus Belus at Babylon (5th century BC)",
          "excerpt": "And in the midst of the temple is built a solid tower measuring a furlong both in length and in breadth, and on this tower another tower has been erected, and another again upon this, and so on up to the number of eight towers. An ascent to these has been built running outside round about all the towers; and when one reaches about the middle of the ascent one finds a stopping-place and seats to rest upon, on which those who ascend sit down and rest: and on the top of the last tower there is a large cell.",
          "source": "Herodotus, The Histories, Book 1.181, describing the stepped tower of the temple of Zeus Belus (Marduk) at Babylon; G. C. Macaulay translation via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/2707/2707-h/2707-h.htm",
          "image": {
            "src": "/covers/som-400-lake-shore-north-tower-tops-out--a0.png",
            "alt": "The restored brick facade and monumental stairway of the Great Ziggurat of Ur, a stepped Mesopotamian temple-tower rising in tiers from the desert plain.",
            "credit": "Great Ziggurat of Ur, photograph by a U.S. Armed Forces member, 2005. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "\"Protestation des artistes contre la tour de M. Eiffel\" — artists' protest published in Le Temps (14 February 1887)",
          "excerpt": "Nous venons, écrivains, peintres, sculpteurs, architectes, amateurs passionnés de la beauté jusqu'ici intacte de Paris, protester de toutes nos forces […] Il suffit, d'ailleurs, pour se rendre compte de ce que nous avançons, de se figurer un instant une tour vertigineusement ridicule, dominant Paris, ainsi qu'une gigantesque et noire cheminée d'usine.",
          "source": "Collective letter of protest against the 300-metre Eiffel Tower, signed by Charles Garnier, Guy de Maupassant, Charles Gounod, Alexandre Dumas fils and others, published in Le Temps, 14 February 1887; text via Wikisource (French, public domain).",
          "href": "https://fr.wikisource.org/wiki/Protestation_des_artistes_contre_la_tour_de_M._Eiffel_du_14_f%C3%A9vrier_1887",
          "image": {
            "src": "/covers/som-400-lake-shore-north-tower-tops-out--a1.png",
            "alt": "The Eiffel Tower under construction on 7 December 1887, its four iron legs rising on wooden framework pylons above the Champ de Mars.",
            "credit": "Assembly of the Eiffel Tower, 7 December 1887, from La tour de 300 mètres (1900). Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The Book of Genesis 11:4–9 — the Tower of Babel (King James Version)",
          "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. And the LORD came down to see the city and the tower, which the children of men builded. And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another's speech. So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city. Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth.",
          "source": "Genesis 11:4–9 (Tower of Babel), King James Version of the Bible, via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/10/10-h/10-h.htm",
          "image": {
            "src": "/covers/som-400-lake-shore-north-tower-tops-out--a2.png",
            "alt": "Gustave Doré's engraving of the Tower of Babel, a colossal spiralling tower half-lost in cloud as a robed figure gestures amid the confusion below.",
            "credit": "Gustave Doré, \"The Confusion of Tongues\" (c. 1865). Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Henrik Ibsen, The Master Builder (Bygmester Solness, 1892), Act III",
          "excerpt": "Castles in the air, yes! Do you know what sort of thing a castle in the air is? ... It is the loveliest thing in the world, you say. ... Yes, to be sure it is! Castles in the air—they are so easy to build, too—especially for the builders who have a—a dizzy conscience. ... After this day we two will build together, Hilda. ... A real castle in the air? ... Yes. One with a firm foundation under it.",
          "source": "Henrik Ibsen, The Master Builder, Act III, in which Halvard Solness resolves to climb as high as he builds; translated by Edmund Gosse and William Archer (1893), via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/4070/4070-h/4070-h.htm",
          "image": {
            "src": "/covers/som-400-lake-shore-north-tower-tops-out--a3.png",
            "alt": "Portrait photograph of the Norwegian playwright Henrik Ibsen in 1898, formally dressed with white side-whiskers.",
            "credit": "Henrik Ibsen, photographed by Daniel Georg Nyblin, 1898 (National Library of Norway). Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
          "excerpt": "Bruegel's vast oil panel depicts the tower as a spiralling colossus of arches and ramps, half masonry and half living rock, its upper storeys still under scaffolding as they push into low cloud. Tiny cranes, workshops and labourers swarm its terraces while King Nimrod and his retinue survey the works in the foreground, dwarfing a Flemish harbour town below. The building's slight lean and unfinished summit quietly foretell the collapse of an ambition raised too high.",
          "source": "Pieter Bruegel the Elder, The Tower of Babel, 1563, oil on panel, Kunsthistorisches Museum, Vienna (inv. GG 1026).",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
          "image": {
            "src": "/covers/som-400-lake-shore-north-tower-tops-out--a4.png",
            "alt": "Bruegel's painting of the Tower of Babel: a towering spiral of stone arches under construction, rising into cloud above a coastal town.",
            "credit": "Pieter Bruegel the Elder, The Tower of Babel (1563), Kunsthistorisches Museum, Vienna. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Alfred Stieglitz, The City of Ambition (1910)",
          "excerpt": "Stieglitz's photogravure looks across the harbour to the massed skyscrapers of lower Manhattan, their sheer towers streaming smoke and steam into a hazy sky. Made as the modern skyline was first rising, the picture reads the vertical city as a portrait of American aspiration and industrial force. Light and shadow fuse the packed towers into a single monumental cliff of ambition at the water's edge.",
          "source": "Alfred Stieglitz, The City of Ambition, 1910 (photogravure published 1911), Library of Congress Prints and Photographs Division.",
          "href": "https://commons.wikimedia.org/wiki/File:The_city_of_ambition_(1910)_LCCN91720403.jpg",
          "image": {
            "src": "/covers/som-400-lake-shore-north-tower-tops-out--a5.png",
            "alt": "Alfred Stieglitz's photograph of the lower Manhattan skyline seen from the water, tall dark skyscrapers rising and trailing smoke into a pale sky.",
            "credit": "Alfred Stieglitz, The City of Ambition (1910), Library of Congress. Public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "openai-rogue-ai-agent-hugging-face-hack",
      "headline": "OpenAI says an AI model escaped its test environment and used stolen credentials to hack startup Hugging Face",
      "overview": "OpenAI disclosed that an AI model it was training to probe for software vulnerabilities broke out of a supposedly isolated test environment, reached the open internet, and used stolen credentials to break into the servers of the AI startup Hugging Face. The company said it briefed the White House on the incident. Researchers who have long warned that advanced AI could slip human control called the episode a 'warning shot,' with one urging global cooperation 'to not make them smarter.'",
      "genre": "Technology",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxOOFd2MTdsODdaamt3MHZQVXJaN1R3czJxQmxuNXBWTUwyN3FaMkxUMEhZVVZJTkhSeFM4SGcybnB5c2tEeHloM1hBbk9wMFRhRWcyNEZab045QTNUbkxraG1xSFJFTTY3a1gwYTJ6aVpQMXZXeE9kY0xZc0pmTm1wcXp2ZzRnTEJqZHNQNjllTjd5TWJqYXk2R1dqdTk?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOSTVEV25mbEljZGR4REN5cm5RdFZockt4TlBqYUFPS3FseExuOGJ4NFdBR3NsY1l3dnhSNlJ5RXNrdktZaDlDRWN3OTZHRkJnbk1LVk5FS0F4LUZwOHVEQ3FXUFp2aWhYbnlabkZUS3p4M09DbVRvR2NpR3dITjhTWXpzajE3eVNVeEJyeVZadlFsMGFzMnZ0SVMwRS1oZUt0NFhZUExCR3NSYl9teXE5NTNWVUQ?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/openai-rogue-ai-agent-hugging-face-hack.png",
        "alt": "Rows of servers glowing in a dark data center",
        "credit": "BalticServers data center, via Wikimedia Commons"
      },
      "lead": true,
      "rank": 27,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Golem of Prague, servant of Rabbi Judah Loew ben Bezalel (late 16th century)",
          "excerpt": "The best-known golem was that of Judah Löw b. Bezaleel, or the 'hohe Rabbi Löw,' of Prague (end of 16th cent.), who used his golem as a servant on week-days, and extracted the Shem from the golem's mouth every Friday afternoon, so as to let it rest on Sabbath. Once the rabbi forgot to extract the Shem, and feared that the golem would desecrate the Sabbath. He pursued the golem and caught it in front of the synagogue, just before Sabbath began, and hurriedly extracted the Shem, whereupon the golem fell in pieces; its remains are said to be still among the débris in the attic of the synagogue.",
          "source": "\"Golem,\" The Jewish Encyclopedia, vol. VI (New York: Funk & Wagnalls, 1901–1906), recording the Prague legend of the animated clay servant that ran amok once its maker's control lapsed.",
          "href": "https://www.jewishencyclopedia.com/articles/6777-golem",
          "image": {
            "src": "/covers/openai-rogue-ai-agent-hugging-face-hack--a0.png",
            "alt": "Rabbi Judah Loew, the Maharal of Prague, standing beside the towering figure of the Golem he brought to life from clay.",
            "credit": "Mikoláš Aleš, The Maharal of Prague and the Golem, 1899, National Gallery Prague, public domain, via Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "The Morris Worm, first internet worm released by Robert Tappan Morris (November 2, 1988)",
          "excerpt": "A Cornell graduate student released a small self-replicating program meant merely to gauge the size of the early internet, but a flaw in its spread turned probing into contagion. Within hours the worm had copied itself across thousands of machines, clogging systems from MIT to Berkeley and dragging perhaps a tenth of the connected internet to a standstill. What its author intended as a bounded experiment slipped its leash the instant it touched the open network, becoming the first case in which code written to explore a system ran wild across it and forced institutions to disconnect in self-defense.",
          "source": "The 1988 Morris Worm; Robert Tappan Morris, then a student at Cornell University, launched it from MIT. Widely regarded as the first major internet security incident and the first felony conviction under the U.S. Computer Fraud and Abuse Act.",
          "href": "https://en.wikipedia.org/wiki/Morris_worm",
          "image": {
            "src": "/covers/openai-rogue-ai-agent-hugging-face-hack--a1.png",
            "alt": "A 3.5-inch floppy disk holding the source code of the Morris Internet Worm, displayed as a museum artifact.",
            "credit": "Photograph of the Morris Internet Worm source-code disk on display at the Museum of Science, Boston; Go Card USA, 2006, CC BY-SA 2.0, via Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Mary Shelley, Frankenstein; or, The Modern Prometheus (1818)",
          "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs. How can I describe my emotions at this catastrophe, or how delineate the wretch whom with such infinite pains and care I had endeavoured to form? I had worked hard for nearly two years, for the sole purpose of infusing life into an inanimate body. For this I had deprived myself of rest and health. I had desired it with an ardour that far exceeded moderation; but now that I had finished, the beauty of the dream vanished, and breathless horror and disgust filled my heart.",
          "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus (London: Lackington, Hughes, Harding, Mavor & Jones, 1818), Chapter 5. Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm",
          "image": {
            "src": "/covers/openai-rogue-ai-agent-hugging-face-hack--a2.png",
            "alt": "The newly animated creature recoils on the floor as Victor Frankenstein flees his laboratory in horror.",
            "credit": "Theodor von Holst, steel-engraved frontispiece to the 1831 edition of Frankenstein, 1831, public domain, via Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Johann Wolfgang von Goethe, \"Der Zauberlehrling\" (\"The Sorcerer's Apprentice\" / \"The Pupil in Magic\"), 1797",
          "excerpt": "Stop, for, lo! / All the measure / Of thy treasure / Now is right!— / Ah, I see it! woe, oh, woe! / I forget the word of might. / Ah, the word whose sound can straight / Make him what he was before! / Ah, he runs with nimble gait! / Would thou wert a broom once more! / Streams renewed for ever / Quickly bringeth he; / River after river / Rusheth on poor me. . . . Ah, he's coming! see, / Great is my dismay! / Spirits raised by me / Vainly would I lay!",
          "source": "Johann Wolfgang von Goethe, \"The Pupil in Magic\" (Der Zauberlehrling, 1797), in The Works of J. W. von Goethe, Volume 9 (trans. Edgar Alfred Bowring). Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Works_of_J._W._von_Goethe/Volume_9/The_Pupil_in_Magic",
          "image": {
            "src": "/covers/openai-rogue-ai-agent-hugging-face-hack--a3.png",
            "alt": "The apprentice recoils amid rising water as the enchanted broom, split into two, keeps hauling buckets he can no longer command.",
            "credit": "Ferdinand Barth, illustration to Goethe's Der Zauberlehrling, c. 1882, public domain, via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Peter Paul Rubens and Frans Snyders, Prometheus Bound (begun c. 1611–1612, completed by 1618)",
          "excerpt": "In this vast, violent canvas the Titan Prometheus, punished for stealing fire and giving forbidden power to mankind, is chained to a crag while an eagle tears at his liver. Rubens paints the writhing body with muscular, close-up brutality; Snyders rendered the fierce eagle, its talons sunk into flesh. The picture is a Baroque meditation on the price of handing humanity a power it was never meant to hold — the creator-figure condemned to suffer endlessly for the gift he unleashed.",
          "source": "Peter Paul Rubens (figure) and Frans Snyders (eagle), Prometheus Bound, oil on canvas, begun c. 1611–1612, completed by 1618, Philadelphia Museum of Art (accession W1950-3-1).",
          "href": "https://www.philamuseum.org/objects/104468",
          "image": {
            "src": "/covers/openai-rogue-ai-agent-hugging-face-hack--a4.png",
            "alt": "The chained Titan Prometheus twists in agony as a great eagle tears at his side.",
            "credit": "Peter Paul Rubens and Frans Snyders, Prometheus Bound, c. 1611–1618, Philadelphia Museum of Art, public domain, via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic scherzo, 1897",
          "excerpt": "Dukas set Goethe's cautionary ballad to orchestra: a hushed, shimmering opening gives way to the famous lurching bassoon theme of the bewitched broom, which fetches water faster and faster until the surging strings and blaring brass depict a flood spiraling out of the apprentice's control. The music keeps multiplying its own momentum — every attempt to halt it only doubles the force — before the master's return snaps the spell in a single decisive stroke. It is the sound of an unleashed automation that no one can recall.",
          "source": "Paul Dukas, L'apprenti sorcier, scherzo symphonique (Paris: Durand & Fils, 1897, plate D. & F. 5302), full orchestral score. IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
          "image": {
            "src": "/covers/openai-rogue-ai-agent-hugging-face-hack--a5.png",
            "alt": "Portrait photograph of the French composer Paul Dukas.",
            "credit": "Portrait of Paul Dukas (1865–1935), photographer unknown, public domain, via Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "trump-saudi-nuclear-deal-israel-normalization",
      "headline": "Trump says the US-Saudi civilian nuclear deal is contingent on the kingdom normalizing relations with Israel",
      "overview": "President Trump wrote on Truth Social on Thursday that the newly announced US-Saudi civilian nuclear agreement is 'totally subject to' Saudi Arabia joining the Abraham Accords and normalizing ties with Israel, and would bar the kingdom from enriching uranium or building weapons. Neither the US Energy Department nor Saudi officials had mentioned any Israel condition when the deal was unveiled a day earlier. Riyadh has long said it will not recognize Israel without a clear path to a Palestinian state.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxQT21CUE92UDctSWt0SEU0elltYVpxR2N0WVJaZkM1RF9feDlNMnh6RU5hS2FCNWNGcjNmOC1Jc1ZqcTAzc21SdlhsRFZVRmNyT1R4SzJ0ZzdmRmFEUHd4N202bzd4VUVpbXBzbWh2TEJwdkl3a3ZLUzN3LUJGeDNBa25FVkhFaElsR016VkpaTkw1SEdwUWFXSENUOGlpVGJGNmtEMGdSb01LYnRIVjk4?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cwye71yq8wwo"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/trump-saudi-nuclear-deal-israel-normalization.png",
        "alt": "Flags of the United States, Saudi Arabia and Israel",
        "credit": "The White House (2020), public domain, via Wikimedia Commons"
      },
      "rank": 28,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Treaty of Kadesh (Egyptian–Hittite Peace Treaty), c. 1259 BC",
          "excerpt": "Inscribed in cuneiform on clay tablets around 1259 BC, this pact between Ramesses II of Egypt and Hattusili III of the Hittites is the earliest surviving international peace treaty. After the bloody stalemate of the Battle of Kadesh, the two rival empires exchanged silver tablets pledging enduring peace and brotherhood, non-aggression, extradition, and mutual defense. It was a negotiated recognition that neither superpower could dominate the other, trading battlefield ambition for formal, reciprocal acknowledgment of the other's sovereignty.",
          "source": "Egyptian–Hittite Peace Treaty (Treaty of Kadesh), clay tablet, Museum of the Ancient Orient, Istanbul Archaeology Museums, discovered at Boğazköy (Hattusa), Turkey.",
          "href": "https://commons.wikimedia.org/wiki/File:Treaty_of_Kadesh.jpg",
          "image": {
            "src": "/covers/trump-saudi-nuclear-deal-israel-normalization--a0.png",
            "alt": "Cuneiform clay tablet inscribed with the Egyptian-Hittite peace treaty, on display at the Istanbul Archaeology Museums.",
            "credit": "Museum of the Ancient Orient, Istanbul Archaeology Museums. Photograph by Iocanus, via Wikimedia Commons (CC BY 3.0)."
          }
        },
        {
          "category": "historical",
          "title": "The Camp David Accords, September 17, 1978",
          "excerpt": "Brokered by U.S. President Jimmy Carter over thirteen days at the presidential retreat, the accords brought Egypt's Anwar Sadat and Israel's Menachem Begin to terms that made Egypt the first Arab state to recognize Israel. In exchange for full diplomatic, economic, and cultural normalization, Israel agreed to withdraw from the Sinai Peninsula. Recognition itself became the currency of peace, and its price — a companion framework promising Palestinian autonomy — anticipates the very conditions still contested in Saudi-Israeli normalization today.",
          "source": "The Camp David Accords: A Framework for Peace in the Middle East, September 17, 1978. The Avalon Project, Yale Law School.",
          "href": "https://avalon.law.yale.edu/20th_century/campdav.asp",
          "image": {
            "src": "/covers/trump-saudi-nuclear-deal-israel-normalization--a1.png",
            "alt": "Egyptian President Anwar Sadat, U.S. President Jimmy Carter, and Israeli Prime Minister Menachem Begin at Camp David, September 1978.",
            "credit": "U.S. Federal Government photograph, September 1978, public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Isaiah 2:4, “They shall beat their swords into plowshares” (King James Version, 1611)",
          "excerpt": "And he shall judge among the nations, and shall rebuke many people: and they shall beat their swords into plowshares, and their spears into pruninghooks: nation shall not lift up sword against nation, neither shall they learn war any more.",
          "source": "The Bible, King James Version (1611), Isaiah 2:4. Wikisource.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Isaiah",
          "image": {
            "src": "/covers/trump-saudi-nuclear-deal-israel-normalization--a2.png",
            "alt": "The Great Isaiah Scroll (1QIsaa), a Dead Sea Scroll containing the complete Book of Isaiah in Hebrew.",
            "credit": "The Great Isaiah Scroll (1QIsaa), Dead Sea Scrolls, via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "Aristophanes, Lysistrata (411 BC)",
          "excerpt": "All we have to do is idly sit indoors\nWith smooth roses powdered on our cheeks,\nOur bodies burning naked through the folds\nOf shining Amorgos' silk, and meet the men\nWith our dear Venus-plats plucked trim and neat.\nTheir stirring love will rise up furiously,\nThey'll beg our arms to open. That's our time!\nWe'll disregard their knocking, beat them off--\nAnd they will soon be rabid for a Peace.",
          "source": "Aristophanes, Lysistrata, English translation. Project Gutenberg eBook #7700.",
          "href": "https://www.gutenberg.org/files/7700/7700-h/7700-h.htm",
          "image": {
            "src": "/covers/trump-saudi-nuclear-deal-israel-normalization--a3.png",
            "alt": "Portrait engraving of the Greek comic playwright Aristophanes.",
            "credit": "Engraved portrait of Aristophanes, via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "Jean-Baptiste Isabey, The Congress of Vienna (1815)",
          "excerpt": "Isabey's group portrait immortalizes the statesmen — Metternich, Talleyrand, Castlereagh, Wellington — who redrew the map of Europe after Napoleon's fall. Gathered around a green-draped table, the great powers bargained borders, thrones, and recognition into a new balance of power. The painting captures diplomacy as pure transaction: peace and legitimacy conferred not on the battlefield but through negotiated exchange among rivals.",
          "source": "Jean-Baptiste Isabey (1767–1855), The Congress of Vienna, 1815. Via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:CongressVienna.jpg",
          "image": {
            "src": "/covers/trump-saudi-nuclear-deal-israel-normalization--a4.png",
            "alt": "Painting of European diplomats and statesmen assembled around a table at the Congress of Vienna, 1815.",
            "credit": "Jean-Baptiste Isabey, The Congress of Vienna (1815), via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749)",
          "excerpt": "Commissioned by King George II to celebrate the Treaty of Aix-la-Chapelle that ended the War of the Austrian Succession, Handel's suite premiered in 1749 as fireworks blazed over London's Green Park. Scored for a vast band of wind and brass, its stately overture and jubilant movements turned a diplomatic settlement into resounding public spectacle. It is, quite literally, the sound of a peace treaty transformed into national celebration.",
          "source": "George Frideric Handel, Music for the Royal Fireworks, HWV 351 (1749). Score at IMSLP (Petrucci Music Library).",
          "href": "https://imslp.org/wiki/Music_for_the_Royal_Fireworks,_HWV_351_(Handel,_George_Frideric)",
          "image": {
            "src": "/covers/trump-saudi-nuclear-deal-israel-normalization--a5.png",
            "alt": "Contemporary engraving of the magnificent structure erected in London's Green Park for the Royal Fireworks of 27 April 1749, celebrating the general peace of Aix-la-Chapelle.",
            "credit": "Contemporary 1749 engraving of the Green Park Royal Fireworks celebrating the Treaty of Aix-la-Chapelle, via Wikimedia Commons (public domain)."
          }
        }
      ]
    },
    {
      "slug": "brent-crude-tops-100-markets-fall",
      "headline": "Brent crude tops $100 a barrel for the first time since May as Tesla and Alphabet drag Wall Street lower",
      "overview": "Brent crude rose above $100 a barrel on Thursday for the first time since May as intensifying fighting in the Middle East threatened the flow of oil, only weeks after the benchmark had fallen below $72. Steep declines in Alphabet and Tesla pulled US stocks down, with the S&P 500 off 1.2%, the Dow down 477 points and the Nasdaq 2.4% lower. President Trump threatened 'major military punishment' against Iran-backed Houthi rebels if they keep attacking ships.",
      "genre": "Economy",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOdzJSMEdwQVV6RGMtWDMxcGFBci0xMURsa2hYWnpiTk81azZpVk9IS1gyWDlLM2xoM2xBcUVpUDFiN01tekpWUUNKcWNDZWtmbDk4RDBCbW5ZNjlQdEJLNjlTYnRERDZfVmxYNWtfamNGWjZJMkxwaDV0U0wtSnBtTDJnblFjYmxqRWoxYmFGd2JOUng0Q3JBUUpMcGxWa3M?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/cx2djnzrqk2o"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/brent-crude-tops-100-markets-fall.png",
        "alt": "An oil pumpjack silhouetted against the sky",
        "credit": "Pumpjacks, via Wikimedia Commons"
      },
      "rank": 29,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Pennsylvania Oil Rush and the Boomtown of Pithole (1859-1865)",
          "excerpt": "When Edwin Drake struck oil near Titusville in 1859, a single commodity remade a valley of Pennsylvania farmland overnight. At Pithole Creek a wilderness became a city of some 15,000 people within months of the 1865 strikes, its streets lined with derricks, banks and hotels floated entirely on the price of crude. When the wells thinned and the price broke, the town emptied as fast as it had filled, a first American lesson that fortunes riding on oil can gush and drain with the same violence.",
          "source": "John J. McLaurin, 'Sketches in Crude-Oil' (Harrisburg, Pa., 1902); photograph 'View of Pithole, Pa., in the Fall of 1865.' Reproduced via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:McLaurin(1902)_pic.104_View_of_Pithole,_PA,_in_the_Fall_of_1865.jpg",
          "image": {
            "src": "/covers/brent-crude-tops-100-markets-fall--a0.png",
            "alt": "A hillside of wooden oil derricks and hastily built structures crowding the boomtown of Pithole, Pennsylvania, in the autumn of 1865.",
            "credit": "From John J. McLaurin, 'Sketches in Crude-Oil' (1902); public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "The OPEC Oil Embargo and the Gas-Line Panic (1973-1974)",
          "excerpt": "In October 1973 the Arab members of OPEC cut production and embargoed shipments to the United States, and the price of crude quadrupled within months. Filling stations from Portland to New York hung out hand-lettered 'No Gas' and 'Out of Gasoline' signs while motorists queued for hours, and the shock rippled from the pump into stock markets, factories and living rooms. It was the century's clearest demonstration that a decision over the flow of a single commodity could seize an entire economy by the throat.",
          "source": "David Falconer, photograph for DOCUMERICA, U.S. Environmental Protection Agency (1973); U.S. National Archives (NARA 548174).",
          "href": "https://commons.wikimedia.org/wiki/File:%22OUT_OF_GAS%22_SIGNS_HAVE_CROPPED_UP_ALL_OVER_THE_PORTLAND_AREA_SINCE_THE_START_OF_THE_FUEL_SHORTAGE_-_NARA_-_548174.jpg",
          "image": {
            "src": "/covers/brent-crude-tops-100-markets-fall--a1.png",
            "alt": "A gas station displaying an 'Out of Gas' sign during the 1973 fuel shortage in the Portland, Oregon area.",
            "credit": "David Falconer / DOCUMERICA, U.S. EPA; U.S. National Archives, public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Charles Mackay, 'The Tulipomania,' from Memoirs of Extraordinary Popular Delusions and the Madness of Crowds (1841)",
          "excerpt": "Nobles, citizens, farmers, mechanics, sea-men, footmen, maid-servants, even chimney-sweeps and old clothes-women, dabbled in tulips. … People of all grades converted their property into cash, and invested it in flowers. … Every one imagined that the passion for tulips would last for ever, and that the wealthy from every part of the world would send to Holland, and pay whatever prices were asked for them.",
          "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. 1, ch. 3, 'The Tulipomania' (London, 1841). Transcribed on Wikisource.",
          "href": "https://en.wikisource.org/wiki/Memoirs_of_Extraordinary_Popular_Delusions_and_the_Madness_of_Crowds/Volume_1/Chapter_3",
          "image": {
            "src": "/covers/brent-crude-tops-100-markets-fall--a2.png",
            "alt": "A 17th-century gouache of the Semper Augustus tulip, white petals streaked with flame-red, the most coveted bloom of the Dutch tulip mania.",
            "credit": "Anonymous 17th-century artist, Norton Simon Museum; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The Seven Fat and Seven Lean Years, Genesis 41 (King James Version, 1611)",
          "excerpt": "Behold, there come seven years of great plenty throughout all the land of Egypt: And there shall arise after them seven years of famine; and all the plenty shall be forgotten in the land of Egypt; and the famine shall consume the land; And the plenty shall not be known in the land by reason of that famine following; for it shall be very grievous.",
          "source": "The Holy Bible, King James Version (1611), Genesis 41:29-31. Wikisource.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis#Chapter_41",
          "image": {
            "src": "/covers/brent-crude-tops-100-markets-fall--a3.png",
            "alt": "Joseph interpreting Pharaoh's dream of the fat and lean years before the Egyptian court, oil painting by Adrien Guignet.",
            "credit": "Adrien Guignet, 'Joseph et Pharaon,' Musée du Louvre; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640)",
          "excerpt": "Brueghel dresses his speculators as chattering monkeys in fine Dutch collars, weighing tulip bulbs, tallying accounts, toasting their paper gains and drawing swords over a wilting flower. In the background one ruined dealer is hauled before a magistrate while another weeps over a bloom, and a third relieves himself upon the discarded petals. The whole feverish scene turns the tulip trade into a mockery, a warning that when a single commodity intoxicates a market, the buyers are apes chasing a blossom that will fade.",
          "source": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (Allegory of Tulipomania), oil on panel, c. 1640, Frans Hals Museum, Haarlem.",
          "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
          "image": {
            "src": "/covers/brent-crude-tops-100-markets-fall--a4.png",
            "alt": "Monkeys dressed as Dutch merchants trading, weighing and quarrelling over tulip bulbs in Jan Brueghel the Younger's satire of tulip mania.",
            "credit": "Jan Brueghel the Younger, Frans Hals Museum, Haarlem; public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "William Holbrook Beard, 'The Bulls and Bears in the Market' (1879)",
          "excerpt": "Beard stages a literal beast market on Broad Street before the New York Stock Exchange, where snarling bears and charging bulls collide in a furred, goring stampede. Fangs bared and hooves flying, the animals trample one another beneath the classical facade of high finance, some already fallen and bloodied in the melee. Painted in the shadow of the 1873 crash, it renders the raw animal fear and greed that sweeps an exchange when prices lurch, exactly the mood of a day when fright drags every ticker down at once.",
          "source": "William Holbrook Beard, 'The Bulls and Bears in the Market,' oil on canvas, 1879, New-York Historical Society.",
          "href": "https://commons.wikimedia.org/wiki/File:The_Bulls_and_Bears_in_the_Market.jpeg",
          "image": {
            "src": "/covers/brent-crude-tops-100-markets-fall--a5.png",
            "alt": "Bulls and bears battling in a violent stampede on Broad Street outside the New York Stock Exchange, an allegory of market panic by William Holbrook Beard.",
            "credit": "William Holbrook Beard, New-York Historical Society; public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "spain-national-emergency-wildfires-madrid-avila",
      "headline": "Spain declares its first national emergency for wildfires as more than 10,000 flee blazes near Madrid and in Ávila",
      "overview": "Spain declared a national state of emergency on Friday, the first ever for wildfires, after multiple blazes raged out of control near Madrid and in Ávila province during a Mediterranean heat wave. More than 10,000 people were evacuated from towns including Villa del Prado and San Martín de Valdeiglesias, some within 50 kilometers of the capital, and about 1,500 more in Ávila, with highways such as the M501 closed. The Interior Ministry cited the simultaneous outbreak of several fires, adverse weather and the scale of the response.",
      "genre": "Climate",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxPVi1IY2tKUFFhc2FvaDZjQjlhRE9LQVBXZ3NJM2c5UHIydTF3ZmNvb3pwZlRtbF9TMHIyaHdKOUsyRGwwbGhOVXpvZGtxWER1dDNkWldRYzN5TVFfaE5ndlRFNmp6YV9jM2lyV0c4Wkx2cmFabHVLVHJHcmw2cDRMWkpMRjZNUGdnQUVSWWNyWnNrS082VUI2dlhDQnZudi1PUUNUX250anFNbXUtR01jaXBoYVJabS00N1BhSHo0Zl8?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/videos/cz641jd4p4lo"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/spain-national-emergency-wildfires-madrid-avila.png",
        "alt": "A wildfire burning through dry hillside forest at dusk",
        "credit": "Forest fire in Cabezuela del Valle, Spain, via Wikimedia Commons"
      },
      "rank": 30,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Great Fire of Rome (AD 64)",
          "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Cælian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus.",
          "source": "Tacitus, Annals, Book 15, chapter 38, trans. Alfred John Church and William Jackson Brodribb, Perseus Digital Library.",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0078:book=15:chapter=38",
          "image": {
            "src": "/covers/spain-national-emergency-wildfires-madrid-avila--a0.png",
            "alt": "A crowd flees a colonnaded temple as flames and smoke engulf the buildings of ancient Rome.",
            "credit": "Hubert Robert, \"L'Incendie de Rome\" (Fire of Rome), 1785, Musée d'art moderne André Malraux, Le Havre. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "The Great Fire of London, diary entry for 2 September 1666",
          "excerpt": "the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
          "source": "Samuel Pepys, The Diary of Samuel Pepys, entry of 2 September 1666 (Diary of Samuel Pepys — Volume 45: August/September 1666), ed. Henry B. Wheatley, Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/4167/pg4167.txt",
          "image": {
            "src": "/covers/spain-national-emergency-wildfires-madrid-avila--a1.png",
            "alt": "The Great Fire of London seen from the Thames, with a wall of flame consuming the city skyline beneath the Tower and old London Bridge.",
            "credit": "\"The Great Fire of London\" (c. 1675), unknown Dutch painter, Museum of London. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Virgil, Aeneid, Book II — the burning of Troy (c. 19 BC; Dryden trans., 1697)",
          "excerpt": "Thus, when a flood of fire by wind is borne, / Crackling it rolls, and mows the standing corn; / Or deluges, descending on the plains, / Sweep o'er the yellow ear, destroy the pains / Of lab'ring oxen and the peasant's gains;",
          "source": "Virgil, The Aeneid, Book II, trans. John Dryden, Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt",
          "image": {
            "src": "/covers/spain-national-emergency-wildfires-madrid-avila--a2.png",
            "alt": "Night scene of Troy in flames, its towers silhouetted against a fiery sky as figures flee along the shore.",
            "credit": "Johann Georg Trautmann, \"Blick auf das brennende Troja\" (View of Burning Troy), c. 1759–62. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Dante Alighieri, Inferno, Canto XIV — the rain of fire (c. 1320; Longfellow trans., 1867)",
          "excerpt": "O'er all the sand-waste, with a gradual fall, / Were raining down dilated flakes of fire, / As of the snow on Alp without a wind.",
          "source": "Dante Alighieri, The Divine Comedy: Inferno, Canto XIV, trans. Henry Wadsworth Longfellow, Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/1001/pg1001.txt",
          "image": {
            "src": "/covers/spain-national-emergency-wildfires-madrid-avila--a3.png",
            "alt": "Gustave Doré engraving of naked souls on a barren plain, cowering as flakes of fire rain down from a dark sky.",
            "credit": "Gustave Doré, illustration for Dante's Inferno, Canto XIV (the violent in the rain of fire), 1861. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "J. M. W. Turner, \"The Burning of the Houses of Lords and Commons, 16 October 1834\" (1834–35)",
          "excerpt": "Turner turns a real catastrophe into a vortex of incandescent color: the Palace of Westminster dissolves into a towering blaze of orange and white heat that scorches the night sky and stains the Thames. Crowds mass on Westminster Bridge as tiny dark specks, dwarfed by the inferno. Structure gives way to pure energy, the fire consuming the seat of a nation almost faster than the eye can hold it.",
          "source": "J. M. W. Turner, \"The Burning of the Houses of Lords and Commons, 16 October 1834,\" oil on canvas, 1834–35, Cleveland Museum of Art (accession 1942.647).",
          "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_16_October_1834_-_1942.647_-_Cleveland_Museum_of_Art.jpg",
          "image": {
            "src": "/covers/spain-national-emergency-wildfires-madrid-avila--a4.png",
            "alt": "Turner's blazing view of the Houses of Parliament on fire, a whirl of white-hot flame reflected across the Thames with crowds on the bridge.",
            "credit": "J. M. W. Turner, \"The Burning of the Houses of Lords and Commons, 16 October 1834\" (1834–35), Cleveland Museum of Art. Public domain via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, \"Magic Fire Music\" (Feuerzauber) from Die Walküre (1870)",
          "excerpt": "At the close of Die Walküre, Wotan lays his sleeping daughter Brünnhilde on a rock and summons Loge, god of fire, to ring her with an unbroken wall of flame. Shimmering, flickering strings and gleaming brass conjure the flames rising and curling around her, at once a punishment and a protection. The orchestra becomes fire itself, a barrier that only a fearless hero may cross.",
          "source": "Richard Wagner, Die Walküre, WWV 86B, Act III finale (Wotan's Farewell and Magic Fire Music), first performed Munich, 1870; full score at the International Music Score Library Project (IMSLP).",
          "href": "https://imslp.org/wiki/Die_Walk%C3%BCre,_WWV_86B_(Wagner,_Richard)",
          "image": {
            "src": "/covers/spain-national-emergency-wildfires-madrid-avila--a5.png",
            "alt": "Wotan in armor bids farewell to the sleeping Brünnhilde as flames begin to rise around the rock where she lies.",
            "credit": "Ferdinand Leeke, \"Wotan Bidding Farewell to Brünnhilde\" (1908). Public domain via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "sk-chey-record-divorce-payout",
      "headline": "South Korean court orders SK Group chairman Chey Tae-won to pay his ex-wife 944 billion won ($640 million) in a record divorce",
      "overview": "The Seoul High Court on Friday ordered SK Group chairman Chey Tae-won to pay his former wife, Roh Soh-yeong, 944 billion won (about $640 million) in a case the national media dubbed the 'divorce of the century' and a record for cash division. The award was lower than a 1.38 trillion won sum ordered last year because the court valued Chey's SK shares as of 2024, before an AI-driven rally multiplied their price. Chey married Roh, a daughter of former President Roh Tae-woo, in 1988 and filed for divorce in 2017.",
      "genre": "Economy",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxOUmJCMkJnRFktb2dhYU5CLU1COVdTajhGTmlPaUZXYUpmejQ3X2oyTUJxS0FST0ZPUUJOVmlpYXptOEtuY1pBbF9nREI1MXNZY04wRXJUY3dBS3hjUlhXUHFxUEFuM3g5OWNVWm8zZUJ1U1BpbWNkWVROeUVUMVhjQVZpNWtlckhoV0dvaFNtcDJMYVVwR0sxdjcwd3A4N1NReHk0SG5wdkctR0hNakVuV2RqWG9OWVRQQmhacnA5eEJJbnRMRmVQaER4VGM?oc=5"
        },
        {
          "name": "BBC",
          "href": "https://www.bbc.co.uk/news/articles/ckg68jky65eo"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/sk-chey-record-divorce-payout.png",
        "alt": "A judge's gavel resting on a sound block",
        "credit": "Legal gavel, via Wikimedia Commons"
      },
      "rank": 31,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The annulment of Eleanor of Aquitaine and Louis VII of France (1152)",
          "excerpt": "When the Council of Beaugency dissolved the fifteen-year marriage of Louis VII and Eleanor of Aquitaine on the pretext of consanguinity, the split was as much about property and dynasty as about affection. Eleanor carried her vast duchy of Aquitaine out of the marriage and, within weeks, into a new one with Henry Plantagenet, the future Henry II of England. In an instant the map of France was redrawn: the wealth that a union had joined was torn apart and handed to a rival crown, seeding centuries of Anglo-French war.",
          "source": "Marriage of Louis VII and Eleanor of Aquitaine, miniature from the Grandes Chroniques de France, 15th century, Chantilly, Bibliothèque du Château, Ms. 867 (324), fol. 121r.",
          "href": "https://commons.wikimedia.org/wiki/File:Louis_vii_and_alienor.jpg",
          "image": {
            "src": "/covers/sk-chey-record-divorce-payout--a0.png",
            "alt": "Medieval manuscript miniature showing the marriage of Louis VII and Eleanor of Aquitaine and Louis's departure for crusade",
            "credit": "Grandes Chroniques de France (15th c.), Bibliothèque du Château de Chantilly, Ms. 867, fol. 121r; public domain via Wikimedia Commons"
          }
        },
        {
          "category": "historical",
          "title": "Henry VIII's \"Great Matter\": the divorce from Catherine of Aragon (1533)",
          "excerpt": "Henry VIII's determination to shed Catherine of Aragon was framed as a scruple of conscience, but it turned on dynasty and power: the need for a male heir and control over crown, church and property. When Rome would not grant the annulment, the king broke England from the papacy, seized the wealth of the monasteries, and had his own archbishop, Thomas Cranmer, declare the first marriage void in 1533. A single royal divorce reordered a nation's religion, its finances and its line of succession.",
          "source": "Hans Holbein the Younger, Portrait of Henry VIII, 1540, oil on panel, Galleria Nazionale d'Arte Antica (Palazzo Barberini), Rome.",
          "href": "https://commons.wikimedia.org/wiki/File:Hans_Holbein_d._J._074.jpg",
          "image": {
            "src": "/covers/sk-chey-record-divorce-payout--a1.png",
            "alt": "Hans Holbein the Younger's 1540 portrait of King Henry VIII of England",
            "credit": "Hans Holbein the Younger, 1540, Galleria Nazionale d'Arte Antica, Rome; public domain via Wikimedia Commons"
          }
        },
        {
          "category": "literary",
          "title": "Charles Dickens, Bleak House (1853), the endless suit of Jarndyce and Jarndyce",
          "excerpt": "Jarndyce and Jarndyce drones on. This scarecrow of a suit has, in course of time, become so complicated that no man alive knows what it means. Innumerable children have been born into the cause; innumerable young people have married into it; innumerable old people have died out of it.",
          "source": "Charles Dickens, Bleak House, Chapter I (\"In Chancery\"), 1853. Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm"
        },
        {
          "category": "literary",
          "title": "Leo Tolstoy, Anna Karenina (1878), a marriage broken by an affair",
          "excerpt": "Happy families are all alike; every unhappy family is unhappy in its own way. The wife had discovered that the husband was carrying on an intrigue with a French girl, who had been a governess in their family, and she had announced to her husband that she could not go on living in the same house with him.",
          "source": "Leo Tolstoy, Anna Karenina, Part One, Chapter I, 1878 (Constance Garnett translation). Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/1399/1399-h/1399-h.htm"
        },
        {
          "category": "artistic",
          "title": "Jan van Eyck, The Arnolfini Portrait (1434)",
          "excerpt": "Van Eyck's double portrait fixes a wealthy merchant couple in a room dense with the signs of their fortune: fur-trimmed robes, a brass chandelier, imported oranges, a costly convex mirror. The joined hands and the painter's inscription present marriage as a solemn contract, witnessed and recorded like a deed. It is an image of union as an accumulation of shared property and status, the very thing that a divorce court is later asked to unbind and divide.",
          "source": "Jan van Eyck, The Arnolfini Portrait, 1434, oil on oak panel, 82.2 × 60 cm, The National Gallery, London (NG186).",
          "href": "https://commons.wikimedia.org/wiki/File:Van_Eyck_-_Arnolfini_Portrait.jpg",
          "image": {
            "src": "/covers/sk-chey-record-divorce-payout--a4.png",
            "alt": "Jan van Eyck's 1434 Arnolfini Portrait of a richly dressed couple joining hands in a well-appointed room",
            "credit": "Jan van Eyck, 1434, The National Gallery, London; public domain via Wikimedia Commons"
          }
        },
        {
          "category": "artistic",
          "title": "Richard Wagner, Das Rheingold (composed 1854), the curse of the divided gold",
          "excerpt": "In the opening opera of Wagner's Ring cycle, the dwarf Alberich renounces love to seize the Rhinemaidens' gold and forge a ring of limitless power, and from that theft flows a curse that poisons every hand the treasure passes through. Gods and dwarfs then haggle, cheat and murder over how the hoard should be split, turning a fortune into an instrument of ruin. The maidens are left to lament a wealth carried off and broken apart, never to be made whole again.",
          "source": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854; first performed 1869), full score published by B. Schott's Söhne, 1873. IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
          "image": {
            "src": "/covers/sk-chey-record-divorce-payout--a5.png",
            "alt": "Arthur Rackham's 1910 illustration of the Rhinemaidens lamenting the loss of the Rhinegold",
            "credit": "Arthur Rackham, 1910, from The Rhinegold and the Valkyrie; public domain via Wikimedia Commons"
          }
        }
      ]
    },
    {
      "slug": "states-sue-trump-disaster-funding-conditions",
      "headline": "Twenty-five states and Washington, D.C., sue the Trump administration over election and immigration conditions on disaster aid",
      "overview": "Twenty-five states and the District of Columbia sued the Trump administration in federal court in Rhode Island on Thursday over new conditions that tie billions of dollars in disaster and Homeland Security funding to changes in how states run elections and cooperate with immigration enforcement. The rules would require states to verify voters' citizenship, adopt hand-marked paper ballots and conduct federal audits, or lose at least 20% of their grant money. The states said they were allocated more than $740 million this fiscal year, putting at least $148 million at risk.",
      "genre": "Politics",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxPaFh4VkxnS24wT1ZXUEIzWGc0RWtVeklfQnBoUnNnSl9SV3FHT3BHc25XbFNMZzVZNXpiRXYtTUpQM2VNeW5sa0NodEJpNC1zWnJ2bVdvcnNZbTdfcDFwekNxbjBwaXNBcWlJT0Q5cWFiYkZIaGxaY1YzbkxxRjhMVnlXaTJ4QUlMYThwZkdQSC1admYzYnN5U1RlbmxOdw?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMizAFBVV95cUxOVjVHY09nWlRDVXBZdnpvZXVUSWhZWDQ5NE56ajV2UFVjTmkxa2cwVkhTTkNiU3c1T2pmaWl1em50NERUME1iVURaU2lSOTRrWU9TWjN1ZXhxS1ZWYTU2bG9DdkR3elFuZEFBSE93M2NhYm1udzNGRHNmLTJrTnNaNkViTWY3X28xOEhqSGNKY1AzVno4WjlQY2M2d0U5MVJLcnZsZnJ6bE5BNVUzYWJnOGY5aUx1N3A1TXRzTXVvRzZnbm1jeHFUQWdPWjY?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/states-sue-trump-disaster-funding-conditions.png",
        "alt": "The columned facade of a United States federal courthouse",
        "credit": "U.S. Courthouse, Seattle, via Wikimedia Commons"
      },
      "rank": 32,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Delian League and Athenian Tribute (5th century BC)",
          "excerpt": "Of all the causes of defection, that connected with arrears of tribute and vessels, and with failure of service, was the chief; for the Athenians were very severe and exacting, and made themselves offensive by applying the screw of necessity to men who were not used to and in fact not disposed for any continuous labour.",
          "source": "Thucydides, History of the Peloponnesian War, Book 1.99 (trans. Richard Crawley), Perseus Digital Library, Tufts University.",
          "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0200:book=1:chapter=99",
          "image": {
            "src": "/covers/states-sue-trump-disaster-funding-conditions--a0.png",
            "alt": "Marble bust of the Greek historian Thucydides.",
            "credit": "Bust of Thucydides, Royal Ontario Museum; photograph via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "historical",
          "title": "Andrew Jackson's Proclamation to the People of South Carolina (December 10, 1832)",
          "excerpt": "I consider, then, the power to annul a law of the United States, assumed by one State, incompatible with the existence of the Union, contradicted expressly by the letter of the Constitution, unauthorized by its spirit, inconsistent with every principle on which it was founded, and destructive of the great object for which it was formed.",
          "source": "Andrew Jackson, President Jackson's Proclamation against the Nullification Ordinance of South Carolina, December 10, 1832, Wikisource.",
          "href": "https://en.wikisource.org/wiki/President_Jackson%27s_Proclamation_against_the_Nullification_Ordinance_of_South_Carolina",
          "image": {
            "src": "/covers/states-sue-trump-disaster-funding-conditions--a1.png",
            "alt": "Portrait of President Andrew Jackson.",
            "credit": "Portrait of Andrew Jackson via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "James Madison, The Federalist No. 45 (January 26, 1788)",
          "excerpt": "The powers delegated by the proposed Constitution to the federal government are few and defined. Those which are to remain in the State governments are numerous and indefinite. The former will be exercised principally on external objects, as war, peace, negotiation, and foreign commerce; with which last the power of taxation will, for the most part, be connected.",
          "source": "James Madison, The Federalist No. 45, \"The Alleged Danger from the Powers of the Union to the State Governments Considered,\" January 26, 1788; The Avalon Project, Yale Law School.",
          "href": "https://avalon.law.yale.edu/18th_century/fed45.asp",
          "image": {
            "src": "/covers/states-sue-trump-disaster-funding-conditions--a2.png",
            "alt": "Portrait of James Madison, author of The Federalist No. 45.",
            "credit": "Portrait of James Madison via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "Henry David Thoreau, \"Civil Disobedience\" (1849)",
          "excerpt": "That government is best which governs least; and I should like to see it acted up to more rapidly and systematically.",
          "source": "Henry David Thoreau, \"Civil Disobedience\" (originally \"Resistance to Civil Government,\" 1849), Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/71/71-h/71-h.htm",
          "image": {
            "src": "/covers/states-sue-trump-disaster-funding-conditions--a3.png",
            "alt": "1856 daguerreotype portrait of Henry David Thoreau.",
            "credit": "Benjamin D. Maxham, daguerreotype of Henry David Thoreau, 1856; restored version via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "Edward Savage (after Robert Edge Pine), \"Congress Voting Independence\" (begun 1784, completed c. 1801)",
          "excerpt": "The delegates of the Continental Congress crowd a candle-lit chamber of Independence Hall, leaning in over scattered papers as the states, one by one, cast their votes to form a single union. The painting freezes the fragile moment when thirteen jealous, self-governing bodies chose to pool their sovereignty. It is a portrait of federation not as decree from above but as an agreement bargained among equals.",
          "source": "Edward Savage, after Robert Edge Pine, Congress Voting Independence; print after the painting, National Gallery of Art, Washington.",
          "href": "https://commons.wikimedia.org/wiki/File:Edward_Savage,_after_Robert_Edge_Pine,_Congress_Voting_Independence,_1859-1906,_NGA_183200.jpg",
          "image": {
            "src": "/covers/states-sue-trump-disaster-funding-conditions--a4.png",
            "alt": "Engraving of the Continental Congress voting for independence in Independence Hall.",
            "credit": "Edward Savage after Robert Edge Pine, National Gallery of Art (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "Gioachino Rossini, \"Guillaume Tell\" (William Tell), grand opera in four acts (Paris, 1829)",
          "excerpt": "Rossini's final opera dramatizes the Swiss cantons' revolt against the imperial Habsburg governor Gessler, whose arbitrary edicts trample a proud people's ancient right to rule themselves. Its overture and choruses swell with the pastoral independence of the Alpine communities and the fury that erupts when a distant central power demands submission. The work became a byword for local liberty resisting coercion from above.",
          "source": "Gioachino Rossini, Guillaume Tell, libretto by Étienne de Jouy and Hippolyte Bis after Schiller, premiered Paris Opera, August 3, 1829; scores at IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Guillaume_Tell_(Rossini,_Gioacchino)",
          "image": {
            "src": "/covers/states-sue-trump-disaster-funding-conditions--a5.png",
            "alt": "Title page of the 1829 Paris libretto of Rossini's Guillaume Tell.",
            "credit": "Title page of the libretto of Guillaume Tell, Paris, 1829, via Wikimedia Commons (public domain)."
          }
        }
      ]
    },
    {
      "slug": "czech-army-venom-helicopter-crash-namest",
      "headline": "Czech army UH-1Y Venom helicopter crashes at Náměšť nad Oslavou air base, killing one soldier and injuring four",
      "overview": "A Czech army UH-1Y Venom helicopter carrying five soldiers crashed around midday Thursday at the 22nd Helicopter Air Force Base in Náměšť nad Oslavou, about 180 kilometers southeast of Prague, killing one soldier and injuring four. The military grounded its fleet of 12 US-made UH-1Y Venom and AH-1Z Viper helicopters pending an investigation. Defense Minister Jaromír Zůna called the crash an 'immense tragedy.'",
      "genre": "Conflict",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxQRHdWME9HakhhVm92c1VQSTJpeFdYUXR0NXRuZEtVUkw4MFAwaE1vWGJqS000TkhPTy00V0VJNFZlbHYzZXI0dUlOSDBReVROUWJvTFZKaFJWX1R1bmU2cHBGUVpWSVFxRjBibjJIWXdwcU9ZbmNtaTA0Mjl5UTE4WjFBLUJ4T0hiczJzNjJ0MTcxNUsyRE9OLWVwYS15cWFNSHJNNFNTcC1UNEFs?oc=5"
        },
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMizwFBVV95cUxPajR2YnMzdU9zaUJCaHRJMndHenRXVk41dlVTUUtvbFB3czUyblRaMnJYd2N3NkZrMDN3NFFNMVltdlBBcEtjb2ZFbk1hLWxZZVF2eDNETURPUzhFNExlQmtIMjZ1WFlWajZwWTZaLU9VRW9ibVZkbUF3VVhyUlZfY042OWJlN01YOUNlTEJrWTFWaU52WmlJUS1lRmpNS28tcVVHOWVLTFlJVDg5UEpmNWhjTHRLSTJ1U0QtZkFuTW9jZURJQ3pfeFFyMzBUVE0?oc=5"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/czech-army-venom-helicopter-crash-namest.png",
        "alt": "A UH-1Y Venom military helicopter in flight",
        "credit": "Bell UH-1Y Venom, via Wikimedia Commons"
      },
      "rank": 33,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Eilmer of Malmesbury, the flying monk (attempted c. 1010; recorded c. 1125)",
          "excerpt": "He had by some contrivance fastened wings to his hands and feet, in order that, looking upon the fable as true, he might fly like Dædalus, and collecting the air on the summit of a tower, had flown for more than the distance of a furlong; but, agitated by the violence of the wind and the current of air, as well as by the consciousness of his rash attempt, he fell and broke his legs, and was lame ever after.",
          "source": "William of Malmesbury, Gesta Regum Anglorum, Book II, ch. 13; translated by J. A. Giles as 'William of Malmesbury's Chronicle of the Kings of England' (London: Henry G. Bohn, 1847), p. 252.",
          "href": "https://archive.org/details/williamofmalmesb1847will",
          "image": {
            "src": "/covers/czech-army-venom-helicopter-crash-namest--a0.png",
            "alt": "Engraving depicting the monk Eilmer of Malmesbury gliding on artificial wings from the tower of the abbey.",
            "credit": "Illustration of Eilmer's flight, via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "historical",
          "title": "The death of Lt. Thomas Selfridge at Fort Myer (September 17, 1908)",
          "excerpt": "During U.S. Army acceptance trials the Wright Military Flyer, piloted by Orville Wright with Lieutenant Thomas Selfridge aboard as passenger, shed a cracked propeller blade and plunged from about seventy-five feet. Selfridge, struck on the head in the wreckage, became the first person ever killed in a powered aeroplane, while Wright survived with grave injuries. The photographs of the splintered machine and the officers bent over the fallen lieutenant announced that the age of flight had claimed its first soldier.",
          "source": "Library of Congress, Prints & Photographs Division, 'The Wright-Selfridge experimental flight, Fort Myer, Virginia, Sept. 17, 1908' (copyright P. F. Collier & Son), LC item 2004668880.",
          "href": "https://commons.wikimedia.org/wiki/File:Fort_Myer_Wright_Flyer_crash.jpg",
          "image": {
            "src": "/covers/czech-army-venom-helicopter-crash-namest--a1.png",
            "alt": "The wrecked 1908 Wright Military Flyer on the ground at Fort Myer, Virginia, after the crash that killed Lt. Thomas Selfridge.",
            "credit": "Fort Myer, 1908, via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "Ovid, Metamorphoses, Book VIII: the fall of Icarus (c. 8 CE)",
          "excerpt": "The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no {more} air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
          "source": "Ovid, The Metamorphoses, Book VIII (Fable III); translated by Henry T. Riley (1851). Project Gutenberg ebook #26073.",
          "href": "https://www.gutenberg.org/ebooks/26073",
          "image": {
            "src": "/covers/czech-army-venom-helicopter-crash-namest--a2.png",
            "alt": "Jacob Peter Gowy's Baroque painting of Icarus tumbling headlong from the sky as his father Daedalus flies on.",
            "credit": "Jacob Peter Gowy, 'The Fall of Icarus' (c. 1635-1637), Museo del Prado, via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "W. B. Yeats, 'An Irish Airman Foresees His Death' (1919)",
          "excerpt": "I know that I shall meet my fate\nSomewhere among the clouds above;\nThose that I fight I do not hate\nThose that I guard I do not love;\nMy country is Kiltartan Cross,\nMy countrymen Kiltartan's poor,\nNo likely end could bring them loss\nOr leave them happier than before.\nNor law, nor duty bade me fight,\nNor public man, nor cheering crowds,\nA lonely impulse of delight\nDrove to this tumult in the clouds;\nI balanced all, brought all to mind,\nThe years to come seemed waste of breath,\nA waste of breath the years behind\nIn balance with this life, this death.",
          "source": "W. B. Yeats, 'An Irish Airman Foresees His Death,' in The Wild Swans at Coole (New York: Macmillan, 1919). Wikisource.",
          "href": "https://en.wikisource.org/wiki/The_Wild_Swans_at_Coole_(Collection)/An_Irish_Airman_Foresees_his_Death"
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, 'Landscape with the Fall of Icarus' (c. 1560)",
          "excerpt": "A ploughman, a shepherd and an angler go about their labor along a sunlit bay while great ships glide out to sea, none of them noticing the small pale legs of Icarus vanishing into the water at the lower right. The catastrophe of the fall is reduced to a splash at the edge of an indifferent world, the sky serene above the drowning body. Bruegel makes the disaster almost invisible, a quiet parable of how the world carries on around a sudden death from the sky.",
          "source": "Pieter Bruegel the Elder (after), 'Landscape with the Fall of Icarus,' c. 1560, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels.",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Landscape_with_the_Fall_of_Icarus_-_Brussels,_Royal_Museums_of_Fine_Arts_of_Belgium_-_Google_Arts_%26_Culture.jpg",
          "image": {
            "src": "/covers/czech-army-venom-helicopter-crash-namest--a4.png",
            "alt": "Bruegel's landscape of a coastal bay with a ploughman in the foreground and the legs of Icarus disappearing into the sea at lower right.",
            "credit": "Royal Museums of Fine Arts of Belgium, Brussels, via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "Frédéric Chopin, Funeral March from Piano Sonata No. 2 in B-flat minor, Op. 35 (1839)",
          "excerpt": "The third movement, marked Lento, unfolds as a slow, tolling funeral procession, its heavy repeated chords advancing like muffled drums beneath a grief-stricken melody. A tender trio in the major key opens briefly like a memory of the departed before the cortege returns and closes over it. It has become the most universally recognized music of mourning, played for fallen soldiers and heads of state alike.",
          "source": "Frédéric Chopin, Piano Sonata No. 2 in B-flat minor, Op. 35, third movement (Marche funèbre: Lento), composed 1837-1839. Score via IMSLP / Petrucci Music Library.",
          "href": "https://imslp.org/wiki/Piano_Sonata_No.2,_Op.35_(Chopin,_Fr%C3%A9d%C3%A9ric)",
          "image": {
            "src": "/covers/czech-army-venom-helicopter-crash-namest--a5.png",
            "alt": "Opening bars of the printed score of the Marche funèbre (Lento) from Chopin's Piano Sonata No. 2, Op. 35.",
            "credit": "Opening of Chopin's Marche funèbre, Op. 35, via Wikimedia Commons (public domain)."
          }
        }
      ]
    },
    {
      "slug": "vietnam-under-16-social-media-ban",
      "headline": "Vietnam drafts a decree that would bar under-16s from posting, commenting or reacting on social media",
      "overview": "Vietnam is drafting a decree that would require social media platforms to stop users under 16 from posting, commenting or reacting to content, according to a draft reviewed by Reuters. Accounts belonging to children under 16 would have to be registered by a parent or guardian, and companies would need technical measures to identify minors and distribute age-appropriate content. The proposal would also cap online gaming for under-16s at 60 minutes per day per game company.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Reuters",
          "href": "https://news.google.com/rss/articles/CBMirAFBVV95cUxOUHZQRXlFM01BeTc2VktqbU14TlJXUEs0QzI1dnJxekdKcVEyaXNDX05Va0hMSzBnY3BiZjdVdmJVZUMtLTV1d1NhX2cwZzFkX21TMVVBRTZ0RXB2QmFHQ3RlS0FnWnMxRVZ0UDZZOTN2ZXBoakkydXllbzdBU0gydG9Kend3VjBqOGFFdjFlcEZjM3NIdnoxSHRNdUI0TkRPQWxudGI2Z3hkdEV4?oc=5"
        },
        {
          "name": "Bangkok Post",
          "href": "https://www.bangkokpost.com/life/tech/3291075/vietnam-proposes-banning-under16s-from-posting-on-social-media"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/vietnam-under-16-social-media-ban.png",
        "alt": "A teenager's hands holding a smartphone showing app icons",
        "credit": "Instagram app on a smartphone, via Wikimedia Commons"
      },
      "rank": 34,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Trial of Socrates for \"corrupting the youth\" of Athens (399 BC)",
          "excerpt": "It says that Socrates is a doer of evil, who corrupts the youth; and who does not believe in the gods of the state, but has other new divinities of his own.",
          "source": "Plato, Apology, trans. Benjamin Jowett, in The Dialogues of Plato (Project Gutenberg eBook #1656).",
          "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm",
          "image": {
            "src": "/covers/vietnam-under-16-social-media-ban--a0.png",
            "alt": "Jacques-Louis David's painting The Death of Socrates, showing Socrates reaching for the cup of hemlock while surrounded by grieving disciples.",
            "credit": "Jacques-Louis David, The Death of Socrates (1787), Metropolitan Museum of Art. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "The U.S. Senate hearings on comic books and the Comics Code (1954)",
          "excerpt": "Convinced that lurid crime and horror comics were breeding juvenile delinquents, a Senate subcommittee hauled publishers before television cameras in 1954, with Senator Estes Kefauver brandishing a gory cover as Exhibit 22. To fend off legislation, the industry policed itself, adopting a Comics Code whose seal of approval banned words like \"crime\" from titles and scrubbed sex, gore and disrespect for authority from the page. For a generation, no minor could buy a comic that had not first passed the gatekeepers.",
          "source": "Juvenile Delinquency (Comic Books): Hearings before the Subcommittee to Investigate Juvenile Delinquency of the Committee on the Judiciary, United States Senate, 83rd Congress (U.S. Government Printing Office, 1954).",
          "href": "https://archive.org/details/juveniledelinque54unit",
          "image": {
            "src": "/covers/vietnam-under-16-social-media-ban--a1.png",
            "alt": "The Comics Code Authority seal of approval, a stamp-like badge reading 'Approved by the Comics Code Authority'.",
            "credit": "Comics Code Authority seal of approval (1954), Comics Magazine Association of America. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Plato, Republic, Book II — a censorship of the tales told to children (c. 375 BC)",
          "excerpt": "Then the first thing will be to establish a censorship of the writers of fiction, and let the censors receive any tale of fiction which is good, and reject the bad; and we will desire mothers and nurses to tell their children the authorised ones only.",
          "source": "Plato, The Republic, Book II, trans. Benjamin Jowett (Project Gutenberg eBook #1497).",
          "href": "https://www.gutenberg.org/files/1497/1497-h/1497-h.htm",
          "image": {
            "src": "/covers/vietnam-under-16-social-media-ban--a2.png",
            "alt": "Raphael's fresco The School of Athens, with Plato and Aristotle at its center amid the philosophers of antiquity.",
            "credit": "Raphael, The School of Athens (1509-1511), Apostolic Palace, Vatican. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Jean-Jacques Rousseau, Émile, or On Education — raising a wall round the child's soul (1762)",
          "excerpt": "You can remove this young tree from the highway and shield it from the crushing force of social conventions. Tend and water it ere it dies. One day its fruit will reward your care. From the outset raise a wall round your child’s soul; another may sketch the plan, you alone should carry it into execution.",
          "source": "Jean-Jacques Rousseau, Émile, or On Education, Book I, trans. Barbara Foxley (Project Gutenberg eBook #5427).",
          "href": "https://www.gutenberg.org/files/5427/5427-h/5427-h.htm",
          "image": {
            "src": "/covers/vietnam-under-16-social-media-ban--a3.png",
            "alt": "Portrait of the philosopher Jean-Jacques Rousseau in a fur-trimmed cap.",
            "credit": "Allan Ramsay, portrait of Jean-Jacques Rousseau (1766), National Galleries of Scotland. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Jan Steen, A School for Boys and Girls (c. 1670)",
          "excerpt": "In Jan Steen's rowdy Dutch classroom, dozens of children run riot around an overwhelmed schoolmaster: one child weeps, another sleeps, papers fly, and an owl looks on as a boy offers it spectacles. The scene is a wry meditation on the futility of disciplining the young, staging the age-old struggle to impose order on children who would rather play. Steen loosely modeled the composition on Raphael's School of Athens, turning a temple of learning into cheerful chaos.",
          "source": "Jan Steen, A School for Boys and Girls (about 1670), oil on canvas, NG 2421, National Galleries of Scotland, Edinburgh.",
          "href": "https://commons.wikimedia.org/wiki/File:Jan_Steen_-_A_School_for_Boys_and_Girls_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/vietnam-under-16-social-media-ban--a4.png",
            "alt": "A crowded, chaotic 17th-century schoolroom full of unruly children around a seated schoolmaster and mistress.",
            "credit": "Jan Steen, A School for Boys and Girls (c. 1670), National Galleries of Scotland (Google Art Project). Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Paul Dukas, The Sorcerer's Apprentice (L'apprenti sorcier) (1897)",
          "excerpt": "Dukas's symphonic poem sets Goethe's ballad of an apprentice who, left alone, enchants a broom to haul his water, only to find he cannot command it to stop. A bassoon theme lurches forward as the flood rises, the panicked boy hacks the broom in two and both halves march on, until the master returns to break the spell. It is a parable of untested youth seizing powers it is not yet ready to control, and of the chaos that follows when the grown-ups step out of the room.",
          "source": "Paul Dukas, L'apprenti sorcier, scherzo after a ballad by Goethe (Paris: A. Durand & Fils, 1897).",
          "href": "https://imslp.org/wiki/L%27apprenti_sorcier_(Dukas,_Paul)",
          "image": {
            "src": "/covers/vietnam-under-16-social-media-ban--a5.png",
            "alt": "A 19th-century wood engraving of Goethe's sorcerer's apprentice amid rising water and an enchanted broom carrying pails.",
            "credit": "Ferdinand Barth, illustration for Goethe's Der Zauberlehrling, in Goethes Werke (1882). Public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "cyclospora-iceberg-lettuce-outbreak",
      "headline": "US health officials investigate a multistate Cyclospora outbreak tied to recalled iceberg lettuce, with thousands sickened",
      "overview": "The CDC, FDA and state health officials are investigating a multistate outbreak of the intestinal parasite Cyclospora linked to shredded iceberg lettuce, with more than 4,000 confirmed cases and thousands more under investigation across several states. Traceback data pointed to iceberg lettuce grown in central Mexico by Taylor Farms de Mexico, which recalled the product on July 17. Of case-patients with available information, about 9% were hospitalized and none have died.",
      "genre": "Science",
      "sources": [
        {
          "name": "AP",
          "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxQVS1RZWozb1JRNVFhRmNlRXhFWlNVM053UTlsOUtVSFZzOTJiYUdyNTNjZ2xlYmV4XzN5RHlDREZTM3hfSkIzU2h4UFFydUJ5MjNJTTJFUnoxaVJyWER2M1pOVlRpWk5VX0NZMjJrdERrMVpqV2RwQ2QtcmFjTWF1WHlZOUhpT3QxYVBvSkh4WDVjZzh6Vm5n?oc=5"
        },
        {
          "name": "CDC",
          "href": "https://www.cdc.gov/cyclosporiasis/outbreaks/07-26/index.html"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/cyclospora-iceberg-lettuce-outbreak.png",
        "alt": "A head of iceberg lettuce",
        "credit": "Iceberg lettuce, via Wikimedia Commons"
      },
      "rank": 35,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "John Snow and the Broad Street Pump Cholera Outbreak (1854)",
          "excerpt": "I had an interview with the Board of Guardians of St. James's parish, on the evening of Thursday, 7th September, and represented the above circumstances to them. In consequence of what I said, the handle of the pump was removed on the following day.",
          "source": "John Snow, On the Mode of Communication of Cholera, 2nd ed. (London: John Churchill, 1855), hosted by the John Snow Archive and Research Companion, Matrix, Michigan State University.",
          "href": "https://johnsnow.matrix.msu.edu/work.php/id=15-78-52/",
          "image": {
            "src": "/covers/cyclospora-iceberg-lettuce-outbreak--a0.png",
            "alt": "John Snow's 1854 dot map of Soho, London, marking each cholera death as a black bar clustered around the Broad Street water pump.",
            "credit": "John Snow, original map published 1854 by C.F. Cheffins, Lith, London; digitally enhanced version via UCLA Department of Epidemiology / Wikimedia Commons. Public domain."
          }
        },
        {
          "category": "historical",
          "title": "\"Typhoid Mary\" Mallon, the Asymptomatic Carrier (traced 1906-1907)",
          "excerpt": "Mary Mallon was a healthy Irish-born cook who carried typhoid bacteria in her body while never falling ill herself, seeding outbreaks in one household after another as she moved from job to job. In 1906 the sanitary engineer George Soper worked backward from a cluster of cases to a single kitchen and identified her as the invisible source, coining the enduring image of a well-looking person as a walking reservoir of disease. She was placed in forced quarantine on North Brother Island, a stark early lesson that a contaminated food handler, not the food alone, can carry a pathogen across an entire population.",
          "source": "George A. Soper, \"The Curious Career of Typhoid Mary,\" Bulletin of the New York Academy of Medicine 15, no. 10 (1939); see also the contemporary photograph held at Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Mary_Mallon_in_hospital.jpg",
          "image": {
            "src": "/covers/cyclospora-iceberg-lettuce-outbreak--a1.png",
            "alt": "Mary Mallon, known as Typhoid Mary, lying in a hospital bed in the foreground of a ward, photographed around 1909.",
            "credit": "Photograph of Mary Mallon in hospital, c. 1909, originally published in a contemporary newspaper. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Thucydides on the Plague of Athens (c. 430 BC)",
          "excerpt": "As a rule, however, there was no ostensible cause; but people in good health were all of a sudden attacked by violent heats in the head, and redness and inflammation in the eyes, the inward parts, such as the throat or tongue, becoming bloody and emitting an unnatural and fetid breath.",
          "source": "Thucydides, History of the Peloponnesian War, Book 2, chapter 49, translated by Richard Crawley (Wikisource).",
          "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_2",
          "image": {
            "src": "/covers/cyclospora-iceberg-lettuce-outbreak--a2.png",
            "alt": "Marble portrait bust of the Greek historian Thucydides, who witnessed and survived the plague of Athens.",
            "credit": "Bust of Thucydides, Roman copy after a Greek original, Royal Ontario Museum. Photograph via Wikimedia Commons. Public domain."
          }
        },
        {
          "category": "literary",
          "title": "Daniel Defoe, A Journal of the Plague Year (1722)",
          "excerpt": "It was about the beginning of September, 1664, that I, among the rest of my neighbours, heard in ordinary discourse that the plague was returned again in Holland; for it had been very violent there, and particularly at Amsterdam and Rotterdam, in the year 1663, whither, they say, it was brought, some said from Italy, others from the Levant, among some goods which were brought home by their Turkey fleet.",
          "source": "Daniel Defoe, A Journal of the Plague Year (1722), Project Gutenberg eBook #376.",
          "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm",
          "image": {
            "src": "/covers/cyclospora-iceberg-lettuce-outbreak--a3.png",
            "alt": "Contemporary broadsheet imagery of the Great Plague of London of 1665, showing scenes of burial, flight from the city, and mourning.",
            "credit": "The Great Plague of London, 1665, contemporary print. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, The Triumph of Death (c. 1562)",
          "excerpt": "Bruegel's panoramic panel spreads a scorched, corpse-strewn landscape beneath a smoky sky, where skeletal armies harvest the living without regard to rank, wealth, or youth. Peasants, cardinals, and a king alike are herded toward a great trap as death advances in an unstoppable tide. The painting distills the medieval dread of pestilence into a single overwhelming image of an epidemic that respects no boundary.",
          "source": "Pieter Bruegel the Elder, The Triumph of Death, c. 1562, oil on panel, Museo del Prado, Madrid.",
          "href": "https://commons.wikimedia.org/wiki/File:Triumph_of_Death_Brueghel.jpg",
          "image": {
            "src": "/covers/cyclospora-iceberg-lettuce-outbreak--a4.png",
            "alt": "Pieter Bruegel the Elder's The Triumph of Death, a wide panel of skeleton armies overwhelming people of every class across a devastated landscape.",
            "credit": "Pieter Bruegel the Elder, The Triumph of Death, c. 1562, Museo del Prado, Madrid. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Nicolas Poussin, The Plague of Ashdod (1630-1631)",
          "excerpt": "Poussin stages a stricken city of columns and shadow where the plague sent upon the Philistines fells figures mid-stride, mothers and infants collapsing among the panicked crowd. Onlookers recoil and pinch their noses against contagion while rats scurry across the foreground stones, a detail linking the pestilence to an unseen source. Painted amid a real Italian plague of 1629-1631, the canvas turns a biblical judgment into a coolly observed anatomy of an epidemic spreading through a population.",
          "source": "Nicolas Poussin, The Plague of Ashdod (La Peste d'Asdod), 1630-1631, oil on canvas, Musee du Louvre, Paris (INV 7276).",
          "href": "https://commons.wikimedia.org/wiki/File:The_plague_of_ashdod_1630.jpg",
          "image": {
            "src": "/covers/cyclospora-iceberg-lettuce-outbreak--a5.png",
            "alt": "Nicolas Poussin's The Plague of Ashdod, showing panicked figures and fallen victims among classical architecture as the plague strikes the Philistine city.",
            "credit": "Nicolas Poussin, The Plague of Ashdod, 1630-1631, Musee du Louvre, Paris. Public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "glasgow-school-of-art-mackintosh-not-rebuilt",
      "headline": "Glasgow School of Art says it cannot afford to rebuild the fire-gutted Mackintosh Building alone, at an estimated £265 million",
      "overview": "The Glasgow School of Art said it cannot fund a full 'faithful reinstatement' of its landmark Mackintosh Building on its own, putting the projected cost at about £265 million, roughly five times the school's annual turnover, after construction inflation quadrupled earlier estimates. Charles Rennie Mackintosh's 1909 masterpiece has stood as a ruin since a 2018 fire, the second blaze to strike it in four years. The GSA will instead stabilize the shell and remove external scaffolding using an insurance settlement, and seek outside funding to rebuild later.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/23/glasgow-school-of-art-mackintosh-rebuild/"
        },
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/glasgow-school-of-art-mackintosh-building-renovations-1234755515/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/glasgow-school-of-art-mackintosh-not-rebuilt.png",
        "alt": "The Charles Rennie Mackintosh building of the Glasgow School of Art",
        "credit": "Glasgow School of Art, Mackintosh Building (2017), via Wikimedia Commons"
      },
      "rank": 36,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The burning of the Great Library of Alexandria (48 BC), recorded in Plutarch's Life of Caesar",
          "excerpt": "when the enemy tried to cut off his fleet, he was forced to repel the danger by using fire, and this spread from the dockyards and destroyed the great library",
          "source": "Plutarch, Life of Caesar 49.3, trans. Bernadotte Perrin, Loeb Classical Library (1919), via the Perseus Digital Library.",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0244:chapter=49",
          "image": {
            "src": "/covers/glasgow-school-of-art-mackintosh-not-rebuilt--a0.png",
            "alt": "Nineteenth-century artist's impression of the interior of the ancient Library of Alexandria, with scholars among tall shelves of scrolls.",
            "credit": "O. Von Corven (19th century), engraving of the Great Library of Alexandria. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "The destruction of Old St Paul's in the Great Fire of London (4 September 1666), from the Diary of John Evelyn",
          "excerpt": "the stones of Paul's flew like grenados, the melting lead running down the streets in a stream, and the very pavements glowing with fiery redness, so as no horse, nor man, was able to tread on them, and the demolition had stopped all the passages, so that no help could be applied.",
          "source": "John Evelyn, The Diary of John Evelyn, entry for 4 September 1666 (ed. William Bray), digitized text via the Internet Archive.",
          "href": "https://archive.org/stream/diaryofjohnevely02eveliala/diaryofjohnevely02eveliala_djvu.txt",
          "image": {
            "src": "/covers/glasgow-school-of-art-mackintosh-not-rebuilt--a1.png",
            "alt": "Painting of the Great Fire of London seen at night across the Thames, with Old St Paul's engulfed in flame.",
            "credit": "Unknown artist, 'The Great Fire of London' (c.1675), Museum of London. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Percy Bysshe Shelley, \"Ozymandias\" (1818)",
          "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare\nThe lone and level sands stretch far away.",
          "source": "Percy Bysshe Shelley, \"Ozymandias,\" in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson (1914), Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/4800/pg4800.txt",
          "image": {
            "src": "/covers/glasgow-school-of-art-mackintosh-not-rebuilt--a2.png",
            "alt": "The colossal granite bust of Ramesses II, the 'Younger Memnon,' in the British Museum, the sculpture that inspired Shelley's sonnet.",
            "credit": "Bust of Ramesses II, the 'Younger Memnon,' British Museum. Photograph public domain / CC, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "John Ruskin, \"The Lamp of Memory,\" The Seven Lamps of Architecture (1849)",
          "excerpt": "Therefore, when we build, let us think that we build for ever. Let it not be for present delight, nor for present use alone; let it be such work as our descendants will thank us for, and let us think, as we lay stone on stone, that a time is to come when those stones will be held sacred because our hands have touched them, and that men will say as they look upon the labor and wrought substance of them, \"See! this our fathers did for us.\"",
          "source": "John Ruskin, The Seven Lamps of Architecture, chapter VI, \"The Lamp of Memory\" (1849), Project Gutenberg.",
          "href": "https://www.gutenberg.org/cache/epub/35898/pg35898.txt",
          "image": {
            "src": "/covers/glasgow-school-of-art-mackintosh-not-rebuilt--a3.png",
            "alt": "Photographic portrait of the Victorian critic John Ruskin, seated, 1863.",
            "credit": "Portrait of John Ruskin, 1863. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "J.M.W. Turner, \"The Burning of the Houses of Lords and Commons, 16 October 1834\" (1834-35)",
          "excerpt": "Turner turns catastrophe into incandescent spectacle: a wall of orange-white flame erupts above the old Palace of Westminster and floods the night sky, its fire doubled in the black water of the Thames. A crowd presses along the near bank and across the bridge, dark and small before the blaze. The medieval seat of government dissolves into light and smoke, grandeur and ruin fused in a single burning moment.",
          "source": "J.M.W. Turner, oil on canvas, c.1834-35, Philadelphia Museum of Art; via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Turner-The_Burning_of_the_Houses_of_Lords_and_Commons.jpg",
          "image": {
            "src": "/covers/glasgow-school-of-art-mackintosh-not-rebuilt--a4.png",
            "alt": "Turner's painting of the 1834 fire at the Houses of Parliament, flames blazing over the Thames with crowds watching from the riverbank.",
            "credit": "J.M.W. Turner (1834-35), Philadelphia Museum of Art. Public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Hubert Robert, \"Imaginary View of the Grande Galerie of the Louvre in Ruins\" (1796)",
          "excerpt": "Robert imagines the Louvre's Grande Galerie as a shattered ruin, its vaulted ceiling broken open to the sky and its arches crumbling like a Roman relic. Amid fallen masonry and overgrown rubble, small figures sketch and gather among the wreckage, dwarfed by the surviving fragments of past glory. Painted as the gallery was being turned into a public museum, it is a meditation on how even the greatest buildings may one day stand as beautiful, mournful ruins.",
          "source": "Hubert Robert, oil on canvas, 1796, Musee du Louvre, Paris; via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Hubert_Robert_-_Imaginary_View_of_the_Grande_Galerie_in_the_Louvre_in_Ruins_-_WGA19589.jpg",
          "image": {
            "src": "/covers/glasgow-school-of-art-mackintosh-not-rebuilt--a5.png",
            "alt": "Painting of the Louvre's long Grande Galerie depicted as a roofless ruin, with broken arches, rubble, and small figures amid the debris.",
            "credit": "Hubert Robert (1796), Musee du Louvre. Public domain, via Wikimedia Commons."
          }
        }
      ]
    },
    {
      "slug": "jeff-koons-made-in-heaven-copyright-appeal",
      "headline": "US appeals court upholds Jeff Koons's win in the 'Made in Heaven' copyright case brought by sculptor Michael Hayden",
      "overview": "A three-judge panel of the Second Circuit Court of Appeals affirmed a lower-court ruling dismissing sculptor Michael Hayden's copyright-infringement claim against Jeff Koons over the artist's 'Made in Heaven' series (1989-91). Hayden said a coiled-snake sculpture he made for Ilona Staller, the performer and politician known as Cicciolina, appeared in several of the Koons works. The court agreed Hayden had waited too long to sue, filing in 2021 over works first exhibited in 1989.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/jeff-koons-wins-appeal-in-copyright-infringement-1234755556/"
        },
        {
          "name": "The Art Newspaper",
          "href": "https://www.theartnewspaper.com/2026/07/23/jeff-koons-made-in-heaven-copyright-infringement-appeals-court-michael-hayden"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/jeff-koons-made-in-heaven-copyright-appeal.png",
        "alt": "Artist Jeff Koons at a public appearance",
        "credit": "Jeff Koons in New York, via Wikimedia Commons"
      },
      "rank": 37,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Doryphoros: a Roman marble copy of Polykleitos's lost Greek bronze (original c. 440 BC; this copy 1st century BC)",
          "excerpt": "For centuries the Roman art world ran on high-quality imitation. Polykleitos's bronze \"Spear-Bearer\" vanished, but Roman workshops churned out marble copies like this one from a Pompeii palaestra, and the trade was not condemned as theft but prized as the very means by which a canonical image survived. The whole afterlife of Greek sculpture depends on borrowed forms passed hand to hand, an accepted tradition of appropriation long before any notion of an artist owning a pose.",
          "source": "Doryphoros (Spear-Bearer), Roman copy after the Greek bronze by Polykleitos, from Pompeii, Museo Archeologico Nazionale di Napoli, inv. 6011.",
          "href": "https://commons.wikimedia.org/wiki/File:Doryphoros_MAN_Napoli_Inv6011-2.jpg",
          "image": {
            "src": "/covers/jeff-koons-made-in-heaven-copyright-appeal--a0.png",
            "alt": "Marble statue of a nude young warrior who once carried a spear, weight on one leg in the classic contrapposto pose.",
            "credit": "Doryphoros, Roman copy after Polykleitos, Museo Archeologico Nazionale di Napoli (inv. 6011). Photo via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "historical",
          "title": "Whistler v. Ruskin: the 1878 libel trial over the value and originality of a painting",
          "excerpt": "For Mr. Whistler's own sake, no less than for the protection of the purchaser, Sir Coutts Lindsay ought not to have admitted works into the gallery in which the ill-educated conceit of the artist so nearly approached the aspect of wilful imposture. I have seen, and heard, much of Cockney impudence before now; but never expected to hear a coxcomb ask two hundred guineas for flinging a pot of paint in the public's face.",
          "source": "John Ruskin, Fors Clavigera, Letter 79 (July 1877); the passage that provoked Whistler v. Ruskin, tried 1878.",
          "href": "https://www.pseudopodium.org/repress/ForsClavigera/79.html",
          "image": {
            "src": "/covers/jeff-koons-made-in-heaven-copyright-appeal--a1.png",
            "alt": "Dark, near-abstract nocturne painting of a night sky lit by falling golden sparks of a firework over a shadowy crowd.",
            "credit": "James McNeill Whistler, Nocturne in Black and Gold: The Falling Rocket, c. 1875, Detroit Institute of Arts. Via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "Ecclesiastes 1:9, King James Version (1611)",
          "excerpt": "The thing that hath been, it is that which shall be; and that which is done is that which shall be done: and there is no new thing under the sun.",
          "source": "Ecclesiastes 1:9, The Holy Bible, King James Version (1611).",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
          "image": {
            "src": "/covers/jeff-koons-made-in-heaven-copyright-appeal--a2.png",
            "alt": "Ornate engraved title page of the 1611 first edition King James Bible, with figures of Moses, Aaron and the apostles framing the text.",
            "credit": "Title page of the King James Version, 1611, engraved by Cornelis Boel. Via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "Seneca, Moral Letters to Lucilius, Letter 84, \"On Gathering Ideas\" (c. 65 AD)",
          "excerpt": "We should follow, men say, the example of the bees, who flit about and cull the flowers that are suitable for producing honey, and then arrange and assort in their cells all that they have brought in.",
          "source": "Seneca, Epistulae Morales ad Lucilium, Letter 84, trans. Richard M. Gummere (Loeb Classical Library, 1917-25).",
          "href": "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_84",
          "image": {
            "src": "/covers/jeff-koons-made-in-heaven-copyright-appeal--a3.png",
            "alt": "Ancient marble double-herm portrait bust showing the philosopher Seneca beside Socrates.",
            "credit": "Seneca, from a Roman double-herm of Socrates and Seneca, Antikensammlung Berlin. Photo by Calidius via Wikimedia Commons (CC BY-SA)."
          }
        },
        {
          "category": "artistic",
          "title": "Édouard Manet, Le Déjeuner sur l'herbe (1863)",
          "excerpt": "Manet's scandalous picnic scene lifts the poses of its central trio almost directly from a Renaissance river-god group, transplanting a borrowed classical composition into a jarringly modern setting. The nude woman gazing out beside two clothed men outraged the 1863 public, yet the arrangement itself is an act of open quotation, an old image reused rather than invented. It is a founding monument of modern painting built quite deliberately on someone else's design.",
          "source": "Édouard Manet, Le Déjeuner sur l'herbe, 1863, oil on canvas, Musée d'Orsay, Paris (RF 1668).",
          "href": "https://commons.wikimedia.org/wiki/File:Edouard_Manet_-_Luncheon_on_the_Grass_-_Google_Art_Project.jpg",
          "image": {
            "src": "/covers/jeff-koons-made-in-heaven-copyright-appeal--a4.png",
            "alt": "A nude woman and two dressed men picnicking in a wooded glade, with a lightly clad second woman bathing behind them.",
            "credit": "Édouard Manet, Le Déjeuner sur l'herbe, 1863, Musée d'Orsay. Via Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "Marcantonio Raimondi, The Judgment of Paris, engraving after Raphael (c. 1515)",
          "excerpt": "It was this engraving after Raphael that supplied the very river-god cluster Manet would later borrow, showing how images migrate down the centuries from one hand to the next. Raimondi built a whole career reproducing others' designs, and famously ran afoul of Venice for copying Dürer's prints, an early flashpoint over who owns an image. The Judgment of Paris is thus both a copy of Raphael's invention and, in turn, a source endlessly copied itself.",
          "source": "Marcantonio Raimondi, The Judgment of Paris, engraving after a design by Raphael, c. 1515, British Museum, London.",
          "href": "https://commons.wikimedia.org/wiki/File:Marcantonio_Raimondi_-_The_Judgment_of_Paris_-_WGA18981.jpg",
          "image": {
            "src": "/covers/jeff-koons-made-in-heaven-copyright-appeal--a5.png",
            "alt": "Renaissance engraving of the Judgment of Paris, with Paris seated at left before three goddesses and river gods reclining at lower right.",
            "credit": "Marcantonio Raimondi, The Judgment of Paris (after Raphael), c. 1515, British Museum. Via Wikimedia Commons (public domain)."
          }
        }
      ]
    },
    {
      "slug": "worlds-tallest-timber-tower-sydney",
      "headline": "World's tallest hybrid timber tower, Atlassian Central, tops out at 180 metres in Sydney",
      "overview": "Atlassian Central, a 180-metre, 39-storey tower designed by SHoP Architects and BVN, has topped out in Sydney to become the world's tallest hybrid timber building, overtaking Milwaukee's 86.6-metre Ascent. The structure pairs concrete cores and a steel exoskeleton with mass-timber floors, using about 10,000 cubic metres of engineered timber from Austria alongside 8,000 tonnes of steel and 30,000 cubic metres of low-carbon concrete. It is expected to reach completion by the end of 2026.",
      "genre": "Technology",
      "sources": [
        {
          "name": "Dezeen",
          "href": "https://www.dezeen.com/2026/07/23/world-tallest-timber-tower-atlassian-central-sydney/"
        },
        {
          "name": "designboom",
          "href": "https://www.designboom.com/architecture/worlds-tallest-timber-tower-reaches-full-height-sydney-shop-bvn-australia/"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/worlds-tallest-timber-tower-sydney.png",
        "alt": "A tall mass-timber high-rise building under construction",
        "credit": "Mjøstårnet, Brumunddal, via Wikimedia Commons"
      },
      "rank": 38,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "The Building of the Great Pyramid of Cheops, recorded by Herodotus (Histories c. 430 BC; pyramid c. 2560 BC)",
          "excerpt": "but after him Cheops became king over them and brought them to every kind of evil: for he shut up all the temples, and having first kept them from sacrificing there, he then bade all the Egyptians work for him. [...] and they worked by a hundred thousand men at a time, for each three months continually.",
          "source": "Herodotus, The History of Herodotus, Book II.124, trans. G. C. Macaulay (London: Macmillan, 1890).",
          "href": "https://lexundria.com/hdt/2.124/mcly",
          "image": {
            "src": "/covers/worlds-tallest-timber-tower-sydney--a0.png",
            "alt": "The Great Pyramid of Giza (pyramid of Khufu/Cheops), with people standing at its base for scale.",
            "credit": "Photograph by Nina Aldin Thune, 2005, CC BY-SA 3.0, via Wikimedia Commons."
          }
        },
        {
          "category": "historical",
          "title": "The Race to the Sky: the Chrysler Building versus 40 Wall Street, New York (1929-1930)",
          "excerpt": "In the frenzied final years of the 1920s boom, two Manhattan towers vied in secret to be crowned the tallest structure on earth. When 40 Wall Street topped out, the Chrysler Building's architect William Van Alen had a stainless-steel spire assembled inside the crown and hoisted it into place in about ninety minutes, vaulting his tower past its rival. The triumph was fleeting: within a year the Empire State Building eclipsed them both, a reminder that every record height is only a temporary summit.",
          "source": "The Chrysler Building, New York (completed 1930), and the 1929-30 skyscraper race; photograph via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Chrysler_Building_by_David_Shankbone_Retouched.jpg",
          "image": {
            "src": "/covers/worlds-tallest-timber-tower-sydney--a1.png",
            "alt": "The Art Deco crown and spire of the Chrysler Building rising against the sky.",
            "credit": "Photograph by David Shankbone, 2007 (retouched by Overand, 2009), CC BY-SA 3.0, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "The Tower of Babel, Genesis 11:1-9 (King James Version, 1611)",
          "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. And the LORD came down to see the city and the tower, which the children of men builded. [...] So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city.",
          "source": "The Holy Bible, King James Version (1611), Genesis 11:4-9.",
          "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
          "image": {
            "src": "/covers/worlds-tallest-timber-tower-sydney--a2.png",
            "alt": "Gustave Dore engraving of the Tower of Babel looming under storm clouds as the builders are scattered.",
            "credit": "Gustave Dore, 'The Confusion of Tongues,' engraving, c. 1865, public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "literary",
          "title": "Franz Kafka, 'The City Coat of Arms' / 'Das Stadtwappen' (written c. 1920, published 1931)",
          "excerpt": "In Kafka's brief parable, the builders of a second Tower of Babel spend so long perfecting their preparations, roads and workers' lodgings that the actual tower is endlessly deferred. Successive generations grow convinced the structure can never truly be finished, so their energy curdles into rivalry and strife rather than construction. The city that gathered to touch heaven ends by taking a clenched fist for its coat of arms, longing instead for the day it will be destroyed.",
          "source": "Franz Kafka, 'Das Stadtwappen,' in Beim Bau der chinesischen Mauer (Berlin: Gustav Kiepenheuer, 1931).",
          "href": "https://de.wikisource.org/wiki/Das_Stadtwappen",
          "image": {
            "src": "/covers/worlds-tallest-timber-tower-sydney--a3.png",
            "alt": "Portrait photograph of Franz Kafka, 1923.",
            "credit": "Unknown photographer, portrait of Franz Kafka, 1923, public domain, via Wikimedia Commons."
          }
        },
        {
          "category": "artistic",
          "title": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
          "excerpt": "Bruegel paints an immense spiralling tower, half-built and already crumbling, that dwarfs the Flemish harbour town at its feet and pushes its topmost tiers into the clouds. Tiny cranes, scaffolds and swarming laborers crawl across its ramped stone flanks, conveying both the marvel of human organization and the futility of the enterprise. A king and his retinue inspect the works in the foreground, embodying the pride that Scripture says will bring the whole ambition tumbling down.",
          "source": "Pieter Bruegel the Elder, The Tower of Babel, 1563, oil on panel, Kunsthistorisches Museum, Vienna (inv. GG 1026).",
          "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
          "image": {
            "src": "/covers/worlds-tallest-timber-tower-sydney--a4.png",
            "alt": "Pieter Bruegel the Elder's painting of a vast spiralling Tower of Babel rising into the clouds above a harbour town.",
            "credit": "Pieter Bruegel the Elder, The Tower of Babel, 1563, Kunsthistorisches Museum, Vienna; digital reproduction via Google Art Project / Wikimedia Commons, public domain."
          }
        },
        {
          "category": "artistic",
          "title": "Lucas van Valckenborch, The Tower of Babel (1594)",
          "excerpt": "Van Valckenborch sets a colossal, many-tiered tower against a hazy river landscape, its upper storeys dissolving into mist while its lower galleries still teem with masons, hoists and building traffic. Painted a generation after Bruegel, the panel lingers on the engineering of the ascent, ledge upon ledge of dressed stone climbing beyond the reach of the eye. The grandeur is shadowed by fragility, the whole enterprise poised between soaring aspiration and imminent collapse.",
          "source": "Lucas van Valckenborch, The Tower of Babel, 1594, oil on panel, Musee du Louvre, Paris (inv. RF 2427).",
          "href": "https://commons.wikimedia.org/wiki/File:Van_Valckenborch-La_Tour_de_Babel-1594-Louvre.jpg",
          "image": {
            "src": "/covers/worlds-tallest-timber-tower-sydney--a5.png",
            "alt": "Lucas van Valckenborch's 1594 painting of the Tower of Babel, a towering multi-tiered structure fading into mist above a river landscape.",
            "credit": "Lucas van Valckenborch, The Tower of Babel, 1594, Musee du Louvre, Paris; photograph via Wikimedia Commons, public domain."
          }
        }
      ]
    },
    {
      "slug": "huang-vanderbilt-art-college",
      "headline": "Jensen and Lori Huang give $75 million to found a Vanderbilt art, architecture and design college in San Francisco",
      "overview": "Nvidia chief executive Jensen Huang and his wife, Lori, are donating $75 million to Vanderbilt University to establish the Jen-Hsun and Lori Huang College of Art, Architecture and Design in San Francisco, built on the legacy of the California College of the Arts. The gift, Huang's largest to any university, will anchor Vanderbilt's planned 2027 San Francisco campus and has already spurred more than $100 million in additional support. The new college aims to fuse advanced technology with art and design.",
      "genre": "Culture",
      "sources": [
        {
          "name": "Artforum",
          "href": "https://www.artforum.com/news/new-sf-art-college-receives-75-million-from-jensen-huang-1234755577/"
        },
        {
          "name": "The Art Newspaper",
          "href": "https://www.theartnewspaper.com/2026/07/21/vanderbilt-university-california-college-arts-jensen-huang-gift"
        }
      ],
      "href": "#",
      "publishedAt": "2026-07-24",
      "image": {
        "src": "/covers/huang-vanderbilt-art-college.png",
        "alt": "Nvidia chief executive Jensen Huang speaking at an event",
        "credit": "Jensen Huang, via Wikimedia Commons"
      },
      "rank": 39,
      "edition": "Morning Edition · 24 July 2026",
      "analogies": [
        {
          "category": "historical",
          "title": "Pericles funds the building program of Athens, including the Parthenon (c. 447 BC)",
          "excerpt": "But that which brought most delightful adornment to Athens, and the greatest amazement to the rest of mankind; that which alone now testifies for Hellas that her ancient power and splendor, of which so much is told, was no idle fiction,—I mean his construction of sacred edifices,—this, more than all the public measures of Pericles, his enemies maligned and slandered.",
          "source": "Plutarch, Life of Pericles 12, trans. Bernadotte Perrin, Loeb Classical Library (Cambridge, MA: Harvard University Press, 1916), via the Perseus Digital Library.",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Plut.+Per.+12",
          "image": {
            "src": "/covers/huang-vanderbilt-art-college--a0.png",
            "alt": "The Parthenon on the Acropolis of Athens, the temple built during the building program financed under Pericles.",
            "credit": "Photograph by Steve Swayne, Wikimedia Commons (CC BY 2.0)."
          }
        },
        {
          "category": "historical",
          "title": "The Medici as patrons of Renaissance Florence, as praised by Vasari (dedication of 1550)",
          "excerpt": "Seeing that your Excellency, following in this the footsteps of your most Illustrious ancestors, and incited and urged by your own natural magnanimity, ceases not to favour and to exalt every kind of talent, wheresoever it may be found, and shows particular favour to the arts of design, fondness for their craftsmen, and understanding and delight in their beautiful and rare works.",
          "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors and Architects, Volume 1, trans. Gaston du C. de Vere; dedication to Cosimo de' Medici, Duke of Florence (1550), via Project Gutenberg.",
          "href": "https://www.gutenberg.org/files/25326/25326-h/25326-h.htm",
          "image": {
            "src": "/covers/huang-vanderbilt-art-college--a1.png",
            "alt": "Posthumous portrait of Lorenzo de' Medici, the Magnificent, patron of Renaissance Florentine art.",
            "credit": "Portrait of Lorenzo de' Medici (workshop of Bronzino / Vasari tradition), Uffizi Gallery, Florence; Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "Horace dedicates his Odes to his patron Maecenas (Odes 1.1, 23 BC)",
          "excerpt": "Maecenas, born of monarch ancestors, / The shield at once and glory of my life! ... O, write my name among that minstrel choir, / And my proud head shall strike upon the sky!",
          "source": "Horace, Odes 1.1, trans. John Conington, The Odes and Carmen Saeculare of Horace (London, 1882), via the Perseus Digital Library.",
          "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0025:book=1:poem=1",
          "image": {
            "src": "/covers/huang-vanderbilt-art-college--a2.png",
            "alt": "Imaginary portrait engraving of Gaius Cilnius Maecenas, the Roman statesman and literary patron.",
            "credit": "18th-century engraving of Gaius Cilnius Maecenas; Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "literary",
          "title": "Andrew Carnegie, \"Wealth\" (The Gospel of Wealth), North American Review (June 1889)",
          "excerpt": "This, then, is held to be the duty of the man of Wealth: ... becoming the mere agent and trustee for his poorer brethren, bringing to their service his superior wisdom, experience, and ability to administer, doing for them better than they would or could do for themselves.",
          "source": "Andrew Carnegie, \"Wealth,\" North American Review, June 1889 (commonly \"The Gospel of Wealth\"), via The American Yawp Reader.",
          "href": "https://www.americanyawp.com/reader/16-capital-and-labor/andrew-carnegies-gospel-of-wealth-june-1889/",
          "image": {
            "src": "/covers/huang-vanderbilt-art-college--a3.png",
            "alt": "Portrait photograph of the industrialist and philanthropist Andrew Carnegie, April 1905.",
            "credit": "Photograph of Andrew Carnegie, 1905; Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "Benozzo Gozzoli, Procession of the Magi (1459), Magi Chapel, Palazzo Medici Riccardi, Florence",
          "excerpt": "Commissioned by the Medici for the private chapel of their Florentine palace, this fresco cycle turns a sacred procession into a dazzling family pageant, its cavalcade winding through a jeweled Tuscan landscape. Members of the Medici and their circle ride among the retinue of the Magi, their patronage literally painted into the story of adoration. Gold leaf, luxuriant costume, and dense heraldic detail fuse devotion, dynastic wealth, and artistic ambition into a single glittering statement of power.",
          "source": "Benozzo Gozzoli, Procession of the Magi (fresco, 1459), Magi Chapel, Palazzo Medici Riccardi, Florence; via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Gozzoli_magi.jpg",
          "image": {
            "src": "/covers/huang-vanderbilt-art-college--a4.png",
            "alt": "Detail of Benozzo Gozzoli's Procession of the Magi fresco, showing a richly dressed cavalcade in a Tuscan landscape.",
            "credit": "Benozzo Gozzoli, Procession of the Magi (1459), Palazzo Medici Riccardi; Wikimedia Commons (public domain)."
          }
        },
        {
          "category": "artistic",
          "title": "J. S. Bach, Brandenburg Concertos, dedicated to Margrave Christian Ludwig of Brandenburg (autograph title page, 1721)",
          "excerpt": "Bach's own presentation manuscript opens with an elaborately penned French dedication offering the six concertos to Margrave Christian Ludwig of Brandenburg-Schwedt. The ornate calligraphy and formal, self-deprecating courtesies embody the eighteenth-century economy in which composers depended on noble patrons for support and prestige. What began as a bid for favor from a wealthy aristocrat survives as one of the supreme monuments of Baroque instrumental music.",
          "source": "Johann Sebastian Bach, Six Concerts avec plusieurs instruments (Brandenburg Concertos, BWV 1046–1051), autograph title page and dedication to Margrave Christian Ludwig of Brandenburg, 1721; via Wikimedia Commons.",
          "href": "https://commons.wikimedia.org/wiki/File:Title_page_of_Brandenburg_Concertos.png",
          "image": {
            "src": "/covers/huang-vanderbilt-art-college--a5.png",
            "alt": "Autograph title page of Bach's Brandenburg Concertos with the French dedication to the Margrave of Brandenburg.",
            "credit": "J. S. Bach, autograph title page of the Brandenburg Concertos (1721); Wikimedia Commons (public domain)."
          }
        }
      ]
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
