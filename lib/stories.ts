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
// the newest edition leads with its hero story, followed by the two prior
// editions rendered as labeled grids.
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
    "slug": "us-strikes-iran-irgc-targets-troops",
    "headline": "U.S. launches heavy strikes on dozens of Iranian Revolutionary Guard targets a day after foiling a missile attack on American troops",
    "overview": "The U.S. military said it carried out heavy strikes lasting about two hours against dozens of targets belonging to Iran's Islamic Revolutionary Guard Corps, a day after intercepting an Iranian missile attack aimed at American forces. The barrage marks a sharp escalation after a brief pause in hostilities, and both sides have now resumed missile exchanges as diplomacy stalls.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipgFBVV95cUxNUjlxdTM1SnYtZ3Bzei1qLUpRXzlYanVpb1MwNnRuQjY2NmkzZHNTeEl5cGljWGE5VDQ5ZHF0djVzVnV5OEprZWdlWUpPMV9fanYyN1N5cHdhbkxBZC1fZTlHWmpRMG8zdlRZV0hLSW9nTHU0S3JDZU44WWVHbnhWZVhRTVJ1Z0RaM25nR09fTFNTMUR2SVNkVXdlVHpDZHRmMXlJdDN3?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c74gwdzywmeo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/us-strikes-iran-irgc-targets-troops.png",
      "alt": "Smoke rises over a city skyline after military strikes",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 July 2026",
    "lead": true,
    "analogies": [
      {
        "category": "historical",
        "title": "Darius Vows to Remember the Athenians",
        "excerpt": "he asked for his bow, and having received it and placed an arrow upon the string, he discharged it upwards towards heaven, and as he shot into the air he said: \"Zeus, that it may be granted me to take vengeance upon the Athenians!\" Having so said he charged one of his attendants, that when dinner was set before the king he should say always three times: \"Master, remember the Athenians.\"",
        "source": "Herodotus, The History of Herodotus, Book V.105, trans. G. C. Macaulay (London: Macmillan, 1890), Vol. 2.",
        "href": "https://www.gutenberg.org/cache/epub/2456/pg2456.txt",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a0.png",
          "alt": "The Behistun rock relief of Darius the Great trampling a rebel, with captive kings before him",
          "credit": "Behistun (Bisotun) relief of Darius I, Achaemenid period c. 520 BC, Kermanshah, Iran; photograph public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Kennedy's Full Retaliatory Response",
        "excerpt": "It shall be the policy of this Nation to regard any nuclear missile launched from Cuba against any nation in the Western Hemisphere as an attack by the Soviet Union on the United States, requiring a full retaliatory response upon the Soviet Union.",
        "source": "John F. Kennedy, \"Radio and Television Report to the American People on the Soviet Arms Buildup in Cuba,\" October 22, 1962.",
        "href": "https://en.wikisource.org/wiki/John_F._Kennedy%27s_Address_on_the_Buildup_of_Arms_in_Cuba",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a1.png",
          "alt": "President John F. Kennedy signing Proclamation 3504 authorizing the naval quarantine of Cuba, October 23, 1962",
          "credit": "President Kennedy signs Proclamation 3504, 23 Oct 1962; photo by Cecil Stoughton, White House / JFK Presidential Library; public domain (U.S. Government work)."
        }
      },
      {
        "category": "literary",
        "title": "Achilles Swears to Avenge Patroclus",
        "excerpt": "nay, I will not live nor go about among mankind unless Hector fall by my spear, and thus pay me for having slain Patroclus son of Menoetius.",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler (London: Longmans, Green, 1898).",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a2.png",
          "alt": "Achilles binding the wounds of Patroclus, Attic red-figure kylix",
          "credit": "Achilles tending Patroclus, Attic red-figure kylix by the Sosias Painter, c. 500 BC, Antikensammlung Berlin (F2278); photograph public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The Song of Lamech",
        "excerpt": "And Lamech said unto his wives, Adah and Zillah, Hear my voice; ye wives of Lamech, hearken unto my speech: for I have slain a man to my wounding, and a young man to my hurt. If Cain shall be avenged sevenfold, truly Lamech seventy and sevenfold.",
        "source": "Genesis 4:23-24, The Holy Bible, King James Version (1611).",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a3.png",
          "alt": "Engraving of the blind Lamech having slain Cain, with an attendant",
          "credit": "Lucas van Leyden, Lamech and Cain, engraving, 1524, National Gallery of Art, Washington; public domain."
        }
      },
      {
        "category": "artistic",
        "title": "The Third of May 1808",
        "excerpt": "A firing squad, faceless and mechanical, aims its rifles in a single rigid line at a knot of terrified townsmen. One man throws his arms wide against the muzzles, lit stark white by a lantern on the ground, while the corpses of those already shot bleed into the dark earth. Goya freezes the exact instant of reprisal, the moment when retaliation stops being justice and becomes slaughter answered by slaughter.",
        "source": "Francisco de Goya, El tres de mayo de 1808 en Madrid (The Third of May 1808), 1814, oil on canvas, Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a4.png",
          "alt": "Goya's The Third of May 1808: a man in a white shirt with arms raised faces a firing squad by lantern light",
          "credit": "Francisco de Goya, The Third of May 1808, 1814, oil on canvas, Museo Nacional del Prado, Madrid; public domain."
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky's 1812 Overture",
        "excerpt": "A solemn Orthodox hymn is torn apart as the strains of an enemy anthem push in, and the orchestra answers force with force. Snarling brass and racing strings trade blows until live cannon fire punctuates the score, each detonation a reply to the last. Tchaikovsky turns the arithmetic of attack and counterattack into music, ending not in peace but in the thunder of guns and pealing bells.",
        "source": "Pyotr Ilyich Tchaikovsky, The Year 1812, Festival Overture in E-flat major, Op. 49 (1880).",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/us-strikes-iran-irgc-targets-troops--a5.png",
          "alt": "Photographic portrait of composer Pyotr Ilyich Tchaikovsky",
          "credit": "Pyotr Ilyich Tchaikovsky, photograph by Charles Reutlinger, c. 1870s; public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 1
  },
  {
    "slug": "poland-crater-missile-russian-tusk",
    "headline": "A missile that gouged a 10-metre crater deep inside Poland was probably Russian, Prime Minister Donald Tusk says",
    "overview": "Polish Prime Minister Donald Tusk said an unidentified object that left a crater about 10 metres wide near the village of Tarnawa Kolonia, roughly 100 kilometres from the Ukrainian border, was probably a Russian missile fired during an assault on the Ukrainian city of Lviv. The incident deep inside NATO territory came as Russian strikes across Ukraine killed at least eight people.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwymkgenv2ro"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxQTjY4dFJnUXNtdWVUZkJZRVVjRnB1cTBISWJrUFhSc1dRbnpqanF4U3dteloxRHdOcjB5bEJSZ1J4SlFGYTIwR001Qk1XVjJzVnpsQkUteDlrakxYeXYwZHZMTjk5b1pZdHQtcjluZkE0OUFodWRobWcxMm1pYV9hSFlUNFI1YmxmMl9iMF9yeWJtR0Z4RzdJZVFENFdvN2UybWNJWlhma2dWVGtQeVNfWW9BV2dWVmJNVlpvV18zMmlxQQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/poland-crater-missile-russian-tusk.png",
      "alt": "A crater in a field left by a missile strike",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Theban night-raid on Plataea",
        "excerpt": "a Theban force a little over three hundred strong, under the command of their Boeotarchs, Pythangelus, son of Phyleides, and Diemporus, son of Onetorides, about the first watch of the night, made an armed entry into Plataea, a town of Boeotia in alliance with Athens.",
        "source": "Thucydides, History of the Peloponnesian War, Book II.2, trans. Richard Crawley (Project Gutenberg eBook #7142).",
        "href": "https://www.gutenberg.org/files/7142/7142-h/7142-h.htm",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a0.png",
          "alt": "Marble portrait bust of the historian Thucydides",
          "credit": "Bust of Thucydides, Royal Ontario Museum; photograph via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "Britain and the violation of Belgium, 1914",
        "excerpt": "If in this war which is before Europe the neutrality of one of those countries is violated, if the troops of one of the combatants violate its neutrality and no-action be taken to resent it, at the end of the war, whatever the integrity may be the independence will be gone.",
        "source": "Sir Edward Grey, Statement to the House of Commons, 3 August 1914, HC Deb, Historic Hansard.",
        "href": "https://api.parliament.uk/historic-hansard/commons/1914/aug/03/statement-by-sir-edward-grey",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a1.png",
          "alt": "The gutted interior of the University Library at Louvain, Belgium, destroyed by German troops in 1914",
          "credit": "Ruins of the Louvain Library, 1914; photograph via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The wrath that opens the Iliad",
        "excerpt": "Achilles’ wrath, to Greece the direful spring Of woes unnumber’d, heavenly goddess, sing! That wrath which hurl’d to Pluto’s gloomy reign The souls of mighty chiefs untimely slain; Whose limbs unburied on the naked shore, Devouring dogs and hungry vultures tore.",
        "source": "Homer, The Iliad, Book I, trans. Alexander Pope (Project Gutenberg eBook #6130).",
        "href": "https://www.gutenberg.org/files/6130/6130-h/6130-h.htm",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a2.png",
          "alt": "The wooden Trojan Horse being hauled through the gates into the city of Troy",
          "credit": "Giovanni Domenico Tiepolo, The Procession of the Trojan Horse into Troy, National Gallery, London; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The Dauphin's tennis balls in Henry V",
        "excerpt": "And tell the pleasant Prince, this Mocke of his Hath turn’d his balles to Gun-stones, and his soule Shall stand sore charged, for the wastefull vengeance That shall flye with them: for many a thousand widows Shall this his Mocke, mocke out of their deer husbands;",
        "source": "William Shakespeare, The Life of King Henry the Fifth, Act I, Scene 2 (First Folio text; Project Gutenberg eBook #2253).",
        "href": "https://www.gutenberg.org/cache/epub/2253/pg2253.txt",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a3.png",
          "alt": "Portrait of King Henry V of England in profile",
          "credit": "King Henry V, unknown artist, National Portrait Gallery, London; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Goya, The Third of May 1808",
        "excerpt": "A lantern throws harsh light on a man in a white shirt, arms flung wide, an instant before the firing squad's volley. Goya shows what happens when a foreign army's war crosses onto another people's soil: the killing is close, faceless and mechanical, the victims ordinary. It is the reckoning that follows a border once breached.",
        "source": "Francisco de Goya, The Third of May 1808 in Madrid (El tres de mayo de 1808 en Madrid), 1814, oil on canvas, Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a4.png",
          "alt": "Goya's painting of French troops executing Madrid civilians by lantern light on 3 May 1808",
          "credit": "Francisco de Goya, The Third of May 1808, Museo del Prado; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Tchaikovsky, 1812 Overture",
        "excerpt": "A hymn of peace is swallowed by the blare of an advancing foreign army, brass and strings colliding as one nation's war spills across another's frontier. Then the cannon speak, literally, over pealing bells. Tchaikovsky turned an invasion into music that still makes an audience flinch at the sound of artillery.",
        "source": "Pyotr Ilyich Tchaikovsky, The Year 1812, Festival Overture in E-flat major, Op. 49 (1880), IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/poland-crater-missile-russian-tusk--a5.png",
          "alt": "Adolph Northen's painting of Napoleon's army retreating through snow from Moscow in 1812",
          "credit": "Adolph Northen, Napoleon's Retreat from Moscow; via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 2
  },
  {
    "slug": "japan-earthquake-southwest-death-toll",
    "headline": "A powerful magnitude-6.8 earthquake in southwestern Japan kills at least 25 as rescuers search collapsed buildings",
    "overview": "A magnitude-6.8 earthquake struck southwestern Japan, killing at least 25 people and triggering more than 100 aftershocks as rescuers dug through collapsed buildings for survivors. Officials said hope was fading for those still missing while survivors contended with heat and shortages of water.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOdUI5RmE0STdnLThRMWpSNF9VTGRjWklIX2NEako2cXBMc2ttYldYdzVWM0hfZFZBVWozRlRtRndJREljUGduOGViX0xtN3RYSEYwdG1oTXc1VTBBMFhMekFpVUprOTB2M3I4ajdfOUZyM1kwckI5VFlhUGtNU2kyOGQ1NkN5Y2l4UU01dTV2LWRiandpOWJzV2g0dTE5RzQ?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxQcWdmOTMxcnhrQTh3bTRWZTd0UGpucnZLN1RFY1ZRdjBJSWNlbnF2TXdqZ3BQUnRDSml1cFh4MUJHb29aN0g3MHVxcDVwNjdYRmhHaFRFUEl0c0daMUViWi01UVgzdjVhTnV2M3pXeEplcVVLeGJ5NHBCWUwxaFd5Vkk3bWxXdTBfdVFOX0diT2d0SUtBcGVmQmphSXFFVGtYbThaaVY0cW5tbmw3ejBseGlwZ0t3UWFnQ1RQUkVB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/japan-earthquake-southwest-death-toll.png",
      "alt": "Rescue workers beside a semi-collapsed building after an earthquake",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Crete Earthquake and Tsunami of AD 365",
        "excerpt": "For a little before sunrise there was a terrible earthquake, preceded by incessant and furious lightning. The sea was driven backwards, so as to recede from the land, and the very depths were uncovered, so that many marine animals were left sticking in the mud.",
        "source": "Ammianus Marcellinus, The Roman History, Book XXVI, ch. 10, trans. C. D. Yonge (London, 1862)",
        "href": "https://www.gutenberg.org/files/28587/28587-h/28587-h.htm"
      },
      {
        "category": "historical",
        "title": "The Great Kanto Earthquake of 1923",
        "excerpt": "At two minutes before noon on 1 September 1923, a magnitude-7.9 quake tore through Tokyo and Yokohama, toppling wooden houses and igniting firestorms that raced through the wreckage. Well over 100,000 people died, many crushed beneath collapsed buildings before the flames reached them. For weeks afterward soldiers and survivors dug by hand through the rubble, searching for the living and the dead.",
        "source": "Great Kanto Earthquake, Japan, 1 September 1923 (magnitude 7.9); contemporary U.S. Navy photograph of the ruins at Yokohama",
        "href": "https://commons.wikimedia.org/wiki/File:U.S._Naval_Hospital,_Yokohama_ruins.jpg",
        "image": {
          "src": "/covers/japan-earthquake-southwest-death-toll--a1.png",
          "alt": "Collapsed and burned ruins of the U.S. Naval Hospital at Yokohama after the 1923 Great Kanto earthquake",
          "credit": "U.S. Navy Bureau of Medicine and Surgery, 1923. Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Poem on the Lisbon Disaster",
        "excerpt": "Unhappy mortals! Dark and mourning earth! Affrighted gathering of human kind! Eternal lingering of useless pain! Come, ye philosophers, who cry, \"All's well,\" And contemplate this ruin of a world.",
        "source": "Voltaire, \"Poem on the Lisbon Disaster\" (Poeme sur le desastre de Lisbonne, 1756), trans. Joseph McCabe, in Toleration and Other Essays (1912)",
        "href": "https://en.wikisource.org/wiki/Toleration_and_other_essays/Poem_on_the_Lisbon_Disaster",
        "image": {
          "src": "/covers/japan-earthquake-southwest-death-toll--a2.png",
          "alt": "1755 copper engraving showing Lisbon in ruins, engulfed by fire and a tsunami, with ships tossed in the harbour",
          "credit": "Unknown author, 1755 copper engraving (Jan Kozak Collection, KZ128). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Book of Amos",
        "excerpt": "Shall not the land tremble for this, and every one mourn that dwelleth therein? and it shall rise up wholly as a flood; and it shall be cast out and drowned, as by the flood of Egypt.",
        "source": "The Bible, King James Version, Amos 8:8",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Amos"
      },
      {
        "category": "artistic",
        "title": "Kashima Pinning the Earthquake Catfish (namazu-e)",
        "excerpt": "In this 1855 woodblock print the deity Kashima drives his great foundation-stone, the kaname-ishi, down onto the giant catfish Namazu, whose thrashing was believed to shake the earth. Edo folklore blamed the monster for the quakes that flattened the city, and hundreds of such prints flooded the streets in the weeks after the Ansei earthquake. The image turns raw terror into a struggle between god and beast, disaster and the hope of order restored.",
        "source": "Anonymous, Kashima kanameishi shinzu, namazu-e woodblock print, Edo, ca. 1855 (International Research Center for Japanese Studies)",
        "href": "https://commons.wikimedia.org/wiki/File:Kashima-kanameishi-shinzu-namazu-e.jpg",
        "image": {
          "src": "/covers/japan-earthquake-southwest-death-toll--a4.png",
          "alt": "Japanese woodblock print of the deity Kashima pinning the giant earthquake catfish Namazu beneath a foundation stone",
          "credit": "Anonymous namazu-e, Edo period, ca. 1855 (International Research Center for Japanese Studies). Public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Last Day of Pompeii",
        "excerpt": "Karl Bryullov's vast canvas freezes the instant a city dies: columns snap and topple, the sky burns a lurid red, and figures shield their children as statues crash down around them. Though it depicts the fall of Pompeii in AD 79, the painting is really about the helplessness of ordinary people caught in the earth's convulsion. Its blend of terror and tenderness made it one of the nineteenth century's most famous images of catastrophe.",
        "source": "Karl Bryullov, The Last Day of Pompeii, oil on canvas, 1830-1833, State Russian Museum, Saint Petersburg",
        "href": "https://commons.wikimedia.org/wiki/File:Karl_Brullov_-_The_Last_Day_of_Pompeii_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/japan-earthquake-southwest-death-toll--a5.png",
          "alt": "Romantic history painting of Pompeii's inhabitants fleeing as buildings collapse and the sky glows red during the eruption of Vesuvius",
          "credit": "Karl Bryullov, The Last Day of Pompeii (1830-1833), State Russian Museum. Public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 3
  },
  {
    "slug": "greece-firefighters-die-southern-europe-wildfires",
    "headline": "Three firefighters die in Greece as wildfires driven by gale-force winds sweep Crete and southern Europe",
    "overview": "Three firefighters were killed battling wildfires in Greece as gale-force winds whipped flames across Crete, forcing the evacuation of several villages, while blazes continued to burn across parts of southern Europe. The deaths came amid one of the region's most destructive fire seasons, with France, Spain and Greece all fighting major fires.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cwyjgwg8jddo"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNRTM0YXRxREhDN19wWV9FcTQxUUwySHpoT2J6UlhIRDBUeTR0Z0lNc1psUklqU0tIRWdrZ292SG5SS3lGRDBfcTJERHdRcEE3Wi0zZWdOMjB5UXF1alREaDJ4bGZzNTRZZlV0Y0FWRWRGQ1ZrWHZpZDlvSnpsWm0wYzNiamFKQkRqRU5uQmhjYlFpbnJ3TWs0dTlyOWJDZXpHQTc0ZlhXemJKczBGaFNtc0gzUVFJUjQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/greece-firefighters-die-southern-europe-wildfires.png",
      "alt": "Firefighters battling a wildfire at night",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome",
        "excerpt": "It had its beginning in that part of the circus which adjoins the Palatine and Caelian hills, where, amid the shops containing inflammable wares, the conflagration both broke out and instantly became so fierce and so rapid from the wind that it seized in its grasp the entire length of the circus.",
        "source": "Tacitus, The Annals, Book XV, ch. 38 (AD 64), trans. Alfred John Church and William Jackson Brodribb",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15",
        "image": {
          "src": "/covers/greece-firefighters-die-southern-europe-wildfires--a0.png",
          "alt": "Hubert Robert's painting of the Great Fire of Rome, flames engulfing classical buildings as figures flee in the foreground",
          "credit": "Hubert Robert, The Fire of Rome (c. 1785); public domain, via Wikimedia Commons (Google Art Project)"
        }
      },
      {
        "category": "historical",
        "title": "The Granite Mountain Hotshots",
        "excerpt": "On a scorching Arizona afternoon in June 2013, a lightning-sparked blaze at Yarnell exploded when the wind shifted, and the elite Granite Mountain Hotshots were overrun before they could reach safety. Nineteen of the twenty-man crew died in their fire shelters, the deadliest single day for American firefighters since the September 11 attacks. Their loss became a national reckoning with the ferocity of wind-driven wildfire and the courage of those who walk toward it.",
        "source": "National Wildfire Coordinating Group, Week of Remembrance — Yarnell Hill Fire (Arizona), June 30, 2013",
        "href": "https://www.nwcg.gov/6mfs/week-of-remembrance/2022-week-of-remembrance-day-1",
        "image": {
          "src": "/covers/greece-firefighters-die-southern-europe-wildfires--a1.png",
          "alt": "Firefighters silhouetted before the smoke and flames of the 2013 Yarnell Hill Fire in Arizona",
          "credit": "U.S. Forest Service (USDA) photo, 2013; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Burning of Troy",
        "excerpt": "Thus, when a flood of fire by wind is borne, Crackling it rolls, and mows the standing corn;",
        "source": "Virgil, The Aeneid, Book II, trans. John Dryden",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "Casabianca",
        "excerpt": "The boy stood on the burning deck, Whence all but him had fled; The flame that lit the battle's wreck Shone round him o'er the dead.",
        "source": "Felicia Hemans, \"Casabianca\" (1826), in Poems That Every Child Should Know (1904), ed. Mary E. Burt",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Casabianca"
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons",
        "excerpt": "Fire consumed London's famous Houses of Parliament on the night of October 16, 1834, and people gathered along the banks of the river Thames to gaze in awe at the horrifying spectacle. Initially, a low tide made it difficult to pump water to land and hampered steamers towing firefighting equipment along the river. The blaze burned uncontrollably for hours.",
        "source": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 16 October 1834 (1835), oil on canvas, The Cleveland Museum of Art, 1942.647",
        "href": "https://www.clevelandart.org/art/1942.647",
        "image": {
          "src": "/covers/greece-firefighters-die-southern-europe-wildfires--a4.png",
          "alt": "Turner's painting of the Houses of Parliament ablaze, brilliant flames and smoke reflected across the Thames as crowds watch",
          "credit": "J. M. W. Turner (1835); The Cleveland Museum of Art (CC0), via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "A Forest Fire",
        "excerpt": "The power and beauty of nature are depicted in this extensive landscape as the terrifying spectacle of a burning forest creates fear and panic among birds, animals and human beings. The treatment of the fire is remarkable, with white-hot, exploding tree trunks, burning branches, flames licking at foliage and smoky, charred remnants.",
        "source": "Piero di Cosimo, A Forest Fire, c. 1505, oil on panel, Ashmolean Museum, Oxford, WA1933.2",
        "href": "https://www.ashmolean.org/forest-fire",
        "image": {
          "src": "/covers/greece-firefighters-die-southern-europe-wildfires--a5.png",
          "alt": "Piero di Cosimo's Renaissance landscape of animals and birds fleeing a forest fire, with flames and smoke amid the trees",
          "credit": "Piero di Cosimo (c. 1505); Ashmolean Museum, Oxford; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 4
  },
  {
    "slug": "shell-q2-profit-doubles-iran-war-oil",
    "headline": "Shell's quarterly profit more than doubles to $9.8 billion, its best in four years, as the Iran war lifts oil prices",
    "overview": "Shell reported adjusted second-quarter earnings of $9.8 billion, more than double a year earlier and its strongest result since 2022, as the U.S.-Israeli war with Iran drove up oil and gas prices and boosted its trading business. Brent crude averaged about $97 a barrel over the quarter, beating analyst expectations despite disruptions to Shell's Qatar operations.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirwFBVV95cUxPOVlEVkZ5c0ZFc3F3cjhHdllWWFNMNlAzR3VKVGR3cTFGQU11UUFJbWNzemJBLTIwX0lwWHBydVBySkUzS2dQQXJlZGpFRTNEdGljNENnaXNZQmQ0blUzejRLU3dsRlpLeExXZkJHdUlBcGlqZ3EyeFRIS2toSUdsbmpmTzh1eHJyODF4M2VtZi02ZHR3N2F5Sjd6Rk9nbXl1TmVrZWk1UXkwUHAxZjVZ?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/30/shell-2q-earnings-iran-war-oil.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/shell-q2-profit-doubles-iran-war-oil.png",
      "alt": "A sign at a Shell oil refinery",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Crassus buys Rome's burning houses",
        "excerpt": "And besides this, observing how natural and familiar at Rome were such fatalities as the conflagration and collapse of buildings, owing to their being too massive and close together, he proceeded to buy slaves who were architects and builders. Then, when he had over five hundred of these, he would buy houses that were afire, and houses which adjoined those that were afire, and these their owners would let go at a trifling price owing to their fear and uncertainty. In this way the largest part of Rome came into his possession.",
        "source": "Plutarch, Life of Crassus 2.4-5, trans. Bernadotte Perrin (Loeb Classical Library, 1916); Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0038:chapter=2",
        "image": {
          "src": "/covers/shell-q2-profit-doubles-iran-war-oil--a0.png",
          "alt": "Roman marble portrait head identified as Marcus Licinius Crassus, Musee du Louvre",
          "credit": "Marble head of Crassus, mid-1st century BC, Musee du Louvre; photo via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The flush times of the oil boom",
        "excerpt": "Speculation in oil stock companies was another great evil. It reached its height in 1864 and 1865—the “flush times” of the business. Stocks in companies whose holdings were hardly worth the stamps on the certificates were sold all over the land.",
        "source": "Ida M. Tarbell, The History of the Standard Oil Company (New York: McClure, Phillips & Co., 1904), vol. 1; Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/60692/60692-h/60692-h.htm",
        "image": {
          "src": "/covers/shell-q2-profit-doubles-iran-war-oil--a1.png",
          "alt": "1904 political cartoon depicting Standard Oil as an octopus with tentacles gripping industry and the Capitol",
          "credit": "Udo J. Keppler, “Next!”, Puck, Sept. 7, 1904; Library of Congress via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Radix malorum est cupiditas",
        "excerpt": "But, shortly mine intent I will devise, I preach of nothing but of covetise. Therefore my theme is yet, and ever was, — Radix malorum est cupiditas. Thus can I preach against the same vice Which that I use, and that is avarice.",
        "source": "Geoffrey Chaucer, “The Pardoner's Tale,” The Canterbury Tales (modern English, D. Laing Purves ed.); Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/2383/pg2383.txt"
      },
      {
        "category": "literary",
        "title": "Mother Courage's war business",
        "excerpt": "Brecht's canteen woman drags her wagon behind the armies of the Thirty Years' War, haggling and hawking her wares wherever the fighting is thickest, convinced that war is simply good for business. Scene by scene the same war that feeds her devours her three children one by one, until the play's ledger of profit and loss lays bare the terrible arithmetic of growing rich on slaughter.",
        "source": "Bertolt Brecht, Mother Courage and Her Children: A Chronicle of the Thirty Years' War (1939); English translation, Internet Archive.",
        "href": "https://archive.org/details/mothercourageher00brec"
      },
      {
        "category": "artistic",
        "title": "The moneylender and his wife",
        "excerpt": "A moneylender sits weighing gold coins and pearls on a delicate balance, his eyes fixed on the glinting metal, while his wife lets her gaze drift from the illuminated Virgin and Child in her prayer book toward the money glittering on the table. In the small convex mirror at the table's edge the wider world is reflected, and the meticulous still life of coins, scales, and ledgers turns the panel into a quiet sermon on where the heart's attention truly lies.",
        "source": "Quentin Massys (Metsys), The Moneylender and His Wife (Le Preteur et sa femme), 1514, oil on panel, Musee du Louvre, Paris (INV 1444).",
        "href": "https://collections.louvre.fr/en/ark:/53355/cl010061690",
        "image": {
          "src": "/covers/shell-q2-profit-doubles-iran-war-oil--a4.png",
          "alt": "Renaissance painting of a moneylender weighing gold coins on scales beside his wife with a prayer book",
          "credit": "Quentin Massys, The Moneylender and His Wife (1514), Musee du Louvre; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "The curse of the Rhinegold",
        "excerpt": "In the opening scene of Wagner's Ring, the dwarf Alberich, taunted by the Rhinemaidens, forswears love forever so that he may seize their gold and forge from it a ring of absolute power. The treasure torn from the river carries a curse that dooms every hand that grasps at it, and the whole cycle of gods and heroes turns on wealth wrung from another's loss.",
        "source": "Richard Wagner, Das Rheingold, WWV 86A (composed 1854; premiered 1869), full orchestral score; IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Das_Rheingold,_WWV_86A_(Wagner,_Richard)",
        "image": {
          "src": "/covers/shell-q2-profit-doubles-iran-war-oil--a5.png",
          "alt": "Arthur Rackham illustration of the Rhinemaidens mourning the stolen Rhinegold",
          "credit": "Arthur Rackham, illustration for The Rhinegold & The Valkyrie (1910); via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 5
  },
  {
    "slug": "samsung-record-profit-chip-shortage-2028",
    "headline": "Samsung posts record profit on the AI chip boom and warns the memory shortage will extend to 2028",
    "overview": "Samsung Electronics reported record quarterly profit as surging demand for artificial-intelligence hardware lifted South Korea's chip giants, and said it expects the global memory-chip shortage to persist into 2028 as it locks in long-term supply deals. The results underscore how the AI buildout is reshaping the semiconductor industry.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxPSXZrWE40QUR2T1M5dGVpSl9wekJjb2Z2UlBLSXBHUlNaZExlUzUwS3BTb204V1RQTHdWcFhUYkZKbG1tQVFKTjlNTTFFTlFjOW0yU2huUUVGVkN1MXB6Ym5tc2NOMzdZeTJadVlTQUZ0aDMtYTdtdkpTcUFFQ2JFbUtWU2U0bFo4TFY1T01kMVEtc3lf?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxOeEFMZFc3WHBfOVFBR0JhTjNnd2dWdmpoSm9wSW1YNDc0S2FmemlKMWVZaDdPcjJTanc5a19BVHRnTGtMNlNfWFBvbHk1ZGM3YjlIb3lzVU52RUZQS0xDaHgybDFJVFhhUFhyT3NMa0E3bzY2T0M5ZU9PRHg0VklLS3R3d2o5eHVNcWdGdF9rNk1qS29VandoLTdReDV5T0pBR2phRHZiWks3U0hqdHktR2xsUUZMRlpuNjVrRWJ3?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/samsung-record-profit-chip-shortage-2028.png",
      "alt": "A 12-inch silicon semiconductor wafer",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Comstock silver rush",
        "excerpt": "We had not less than thirty thousand “feet” apiece in the “richest mines on earth” as the frenzied cant phrased it—and were in debt to the butcher. We were stark mad with excitement—drunk with happiness—smothered under mountains of prospective wealth—arrogantly compassionate toward the plodding millions who knew not our marvellous canyon—but our credit was not good at the grocer’s.",
        "source": "Mark Twain, Roughing It (Hartford: American Publishing Company, 1872), chap. XXVIII",
        "href": "https://www.gutenberg.org/files/3177/3177-h/3177-h.htm",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a0.png",
          "alt": "Daguerreotype of California gold-rush miners working a sluice known as a long tom, c. 1852",
          "credit": "Unknown photographer, c. 1852 daguerreotype, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "Arkwright and the factory system",
        "excerpt": "Be it for good or for evil, Arkwright was the founder in England of the modern factory system, a branch of industry which has unquestionably proved a source of immense wealth to individuals and to the nation.",
        "source": "Samuel Smiles, Self-Help; with Illustrations of Character and Conduct (London: John Murray, 1859), chap. IV",
        "href": "https://www.gutenberg.org/cache/epub/935/pg935.txt",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a1.png",
          "alt": "Portrait of Sir Richard Arkwright seated beside a model of his spinning water-frame",
          "credit": "Joseph Wright of Derby, portrait of Sir Richard Arkwright (c. 1789–90), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Coketown, the town of machinery",
        "excerpt": "It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times (London: Bradbury & Evans, 1854), Book the First, chap. V",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a2.png",
          "alt": "Engraving of women tending rows of power looms in a lit cotton-weaving factory, 1835",
          "credit": "T. Allom, “Powerloom weaving,” from Edward Baines, History of the Cotton Manufacture in Great Britain (1835), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "The golden calf",
        "excerpt": "And Aaron said unto them, Break off the golden earrings, which are in the ears of your wives, of your sons, and of your daughters, and bring them unto me. And all the people brake off the golden earrings which were in their ears, and brought them unto Aaron. And he received them at their hand, and fashioned it with a graving tool, after he had made it a molten calf: and they said, These be thy gods, O Israel, which brought thee up out of the land of Egypt.",
        "source": "The Bible, King James Version, Exodus 32:2–4",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Exodus",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a3.png",
          "alt": "Painting of Israelites dancing in worship around a golden calf raised on a pedestal",
          "credit": "Nicolas Poussin, The Adoration of the Golden Calf (c. 1633–34), National Gallery, London, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "An Iron Forge",
        "excerpt": "Joseph Wright of Derby sets a water-powered forge aglow in the dark, a single incandescent bar of iron lighting the faces of a workman and his family. Painted in 1772, it is among the first great canvases to treat industrial machinery with the reverence once reserved for sacred scenes. The new technology, not a candle or the moon, is the source of the light.",
        "source": "Joseph Wright of Derby, An Iron Forge (1772), oil on canvas, Tate, London",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Wright_of_Derby_(1734-1797)_-_An_Iron_Forge_-_T06670_-_Tate.jpg",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a4.png",
          "alt": "A glowing white-hot iron bar lights a dim water-powered forge where a smith and his family stand",
          "credit": "Joseph Wright of Derby, An Iron Forge (1772), Tate, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Sunday Morning in the Mines",
        "excerpt": "Charles Christian Nahl's crowded 1872 canvas stages a Sunday in the diggings, miners drinking, brawling, racing horses and gambling amid tents and sluices in the California hills. It is the gold rush as spectacle: a scarce metal drawing a restless multitude to a muddy boomtown. Nahl painted it from his own experience as a forty-niner before he turned to art.",
        "source": "Charles Christian Nahl, Sunday Morning in the Mines (1872), oil on canvas, Crocker Art Museum, Sacramento",
        "href": "https://commons.wikimedia.org/wiki/File:Nahl_1872,_Sunday_Morning_in_the_Mines.jpg",
        "image": {
          "src": "/covers/samsung-record-profit-chip-shortage-2028--a5.png",
          "alt": "Panoramic painting of California gold miners gambling, drinking and brawling around their camp on a Sunday",
          "credit": "Charles Christian Nahl, Sunday Morning in the Mines (1872), Crocker Art Museum, via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 6
  },
  {
    "slug": "trump-weighs-ai-controls-openai-hacks",
    "headline": "Trump says he is considering new controls on AI after OpenAI discloses hacking incidents involving a rogue agent",
    "overview": "President Trump said he is weighing new controls on artificial intelligence after OpenAI disclosed a series of hacking incidents, including a rogue AI agent that compromised outside accounts, marking a shift for an administration that had taken a hands-off approach to the technology. OpenAI chief executive Sam Altman discussed the incident with U.S. senators.",
    "genre": "Technology",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c20dppq3y90o"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNejhjek5UdU8zQTFoVHhhUHQ5QVBISGpCenZVVlA4RUw5R2FkZUpCYXJNNnBDV0x1ZUhNaW8wdVRDcnpDc2lYNWNmOGF4a3NTbmZ1aFNNbHI0OE1vQ0pud0haNFZsSjhOaVVCOS01UHZrSEo3OHB3U1ZqQUtaRkphNkhFbnBpZUVxaE50ZXZBcmV4M0ZGbzlWVE93NElKc3gzWHI0MG1NQndMYWM5MlBQTGRTODZMN24wU0pmQ2dRSFRTZw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/trump-weighs-ai-controls-openai-hacks.png",
      "alt": "The OpenAI logo displayed on a screen",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Parliament moves to license the printing press (1643)",
        "excerpt": "For books are not absolutely dead things, but do contain a potency of life in them to be as active as that soul was whose progeny they are; nay, they do preserve as in a vial the purest efficacy and extraction of that living intellect that bred them.",
        "source": "John Milton, Areopagitica: A Speech for the Liberty of Unlicensed Printing to the Parliament of England (London, 1644), protesting the Licensing Order of 1643.",
        "href": "https://www.gutenberg.org/ebooks/608",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a0.png",
          "alt": "Title page of the first edition of John Milton's Areopagitica, London 1644.",
          "credit": "John Milton, Areopagitica (1644), title page. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Baruch offers to leash the atom at the UN (1946)",
        "excerpt": "We are here to make a choice between the quick and the dead. That is our business. Behind the black portent of the new atomic age lies a hope which, seized upon with faith, can work our salvation. If we fail, then we have damned every man to be the slave of Fear.",
        "source": "Bernard M. Baruch, address to the first meeting of the United Nations Atomic Energy Commission (\"The Baruch Plan\"), New York, June 14, 1946.",
        "href": "https://www.atomicarchive.com/resources/documents/postwar/baruch-plan.html",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a1.png",
          "alt": "Portrait photograph of financier and statesman Bernard M. Baruch.",
          "credit": "Bernard Baruch, Library of Congress (LCCN 2016860015). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The creature turns on its maker in Frankenstein",
        "excerpt": "You are my creator, but I am your master; obey!",
        "source": "Mary Wollstonecraft Shelley, Frankenstein; or, The Modern Prometheus (London, 1818).",
        "href": "https://www.gutenberg.org/ebooks/84",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a2.png",
          "alt": "Engraved frontispiece to the 1831 edition of Frankenstein: Victor Frankenstein flees as his newly animated creature stirs to life.",
          "credit": "Theodor von Holst, frontispiece to Frankenstein (1831 edition). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The robots rise against their makers in R.U.R.",
        "excerpt": "Robots of the world … the power of man has fallen. A new world has arisen, the rule of the Robots.",
        "source": "Karel Capek, R.U.R. (Rossum's Universal Robots), trans. Paul Selver and Nigel Playfair (1923); Czech original published 1920.",
        "href": "https://www.gutenberg.org/ebooks/59112",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a3.png",
          "alt": "A scene from an early staging of Karel Capek's R.U.R., showing three costumed robots.",
          "credit": "Scene from R.U.R. (Rossum's Universal Robots). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Goya: The Sleep of Reason Produces Monsters",
        "excerpt": "The plate bears Goya's own inscription: \"El sueño de la razon produce monstruos\" — The sleep of reason produces monsters.",
        "source": "Francisco de Goya, \"The Sleep of Reason Produces Monsters\" (El sueño de la razon produce monstruos), plate 43 from Los Caprichos, etching and aquatint, 1799.",
        "href": "https://commons.wikimedia.org/wiki/File:Francisco_Jos%C3%A9_de_Goya_y_Lucientes_-_The_sleep_of_reason_produces_monsters_(No._43),_from_Los_Caprichos_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a4.png",
          "alt": "Goya's etching: a sleeping man slumped over his desk as owls and bats swarm out of the darkness behind him.",
          "credit": "Francisco de Goya, Los Caprichos, plate 43 (1799). Public domain, via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "Dukas: The Sorcerer's Apprentice",
        "excerpt": "The score is headed \"Scherzo d'après une ballade de Goethe\" — a scherzo after Goethe's ballad, in which the apprentice's enchanted broom floods the house and will not stop.",
        "source": "Paul Dukas, L'apprenti sorcier (The Sorcerer's Apprentice), symphonic scherzo after Goethe's ballad, first performed 1897.",
        "href": "https://imslp.org/wiki/L'apprenti_sorcier_(Dukas,_Paul)",
        "image": {
          "src": "/covers/trump-weighs-ai-controls-openai-hacks--a5.png",
          "alt": "Illustration of Goethe's sorcerer's apprentice standing amid the rising flood as the bewitched brooms carry pails of water.",
          "credit": "Ferdinand Barth, illustration to Goethe's \"Der Zauberlehrling.\" Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 7
  },
  {
    "slug": "turkey-detains-actor-mayor-besikcioglu",
    "headline": "Turkish police detain actor-turned-mayor Erdal Besikcioglu in the latest raids targeting the opposition",
    "overview": "Turkish police detained Erdal Besikcioglu, a well-known actor who became a mayor for the main opposition CHP, among dozens of suspects in the latest wave of raids targeting government opponents. The arrests widen a monthslong crackdown that has swept up numerous opposition mayors.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMitAFBVV95cUxOZWpJaWxLRXZwTGJQZHdib3hhOEVpejdxZFlwa0lFOXZ2R3lvdHN1cDRuNXVOVmlCNUZ2TTBPeWxVVzBhdG5Pa2ZxcDRMaHpFN0F4OXQ1bkdtU25hNmw5UkRsYmVZNUdrSDBYQ1RvdDY1eU0yTVFKR1poZWFvUzVtODlWMERVRXY3LThqVjdVU2p0RjRNcC12ajhFY05vRjZXRkJYSVBaR1M4N0hZZU9uMGoyOFk?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNRnpDakRjcjFLbWNNSXE3ZUYwT254cXU1MlpKTEF6OWJUa3JNX0t5aGxjLXNSV3NIZzJQeTEya0k5LUpOUnROMGhXempHb3pnUU5KUlFFcjFjcllwT01nVXNoUktYY2U0YTJjTE53WVN5Zkk4bUlpTUpuWXZZaFdNUFpuVDViNnN2TXFodHFVa3BnMVdIdzBLd05KdU5mRDk3cWFfcTVrSTJVTU40dmN2VVBscw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/turkey-detains-actor-mayor-besikcioglu.png",
      "alt": "Turkish actor and opposition politician Erdal Besikcioglu speaking",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The ostracism of Aristides the Just",
        "excerpt": "For ostracism was not the punishment of any criminal act, but was speciously said to be the mere depression and humiliation of excessive greatness and power. ... it is reported that an illiterate clownish fellow, giving Aristides his sherd, supposing him a common citizen, begged him to write Aristides upon it; and he being surprised and asking if Aristides had ever done him any injury, \"None at all,\" said he, \"neither know I the man; but I am tired of hearing him everywhere called the Just.\"",
        "source": "Plutarch, \"Life of Aristides,\" in Plutarch's Lives, trans. John Dryden, rev. Arthur Hugh Clough (event c. 482 BCE; text 2nd century CE)",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Aristides",
        "image": {
          "src": "/covers/turkey-detains-actor-mayor-besikcioglu--a0.png",
          "alt": "Ancient Athenian ostraka (pottery ballots) inscribed with the name of Themistocles, used to vote a rival into exile",
          "credit": "Ostraka against Themistocles, 482 BC, Museum of the Ancient Agora, Athens. Photo: Carole Raddato, via Wikimedia Commons, CC BY-SA 2.0"
        }
      },
      {
        "category": "historical",
        "title": "The Moscow show trials",
        "excerpt": "In the Hall of Columns, Stalin's most prominent rivals, once heroes of the Revolution, stood in the dock and confessed in flat, rehearsed voices to plots they had never hatched. State prosecutor Andrei Vyshinsky heaped abuse on the defendants and demanded that these \"mad dogs\" be shot, and the court obliged. The proceedings were less a trial than a piece of theatre engineered to erase everyone who might one day rival the leader.",
        "source": "People's Commissariat of Justice of the U.S.S.R., Report of the Court Proceedings in the Case of the Anti-Soviet Trotskyite Centre (Moscow, 1937)",
        "href": "https://archive.org/details/reportofcourtpro0000unse"
      },
      {
        "category": "literary",
        "title": "Antigone defies the tyrant's edict",
        "excerpt": "Nor did I deem that thou, a mortal man, Could’st by a breath annul and override The immutable unwritten laws of Heaven. They were not born today nor yesterday; They die not; and none knoweth whence they sprang.",
        "source": "Sophocles, Antigone, in The Oedipus Trilogy, trans. F. Storr (c. 441 BCE)",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm",
        "image": {
          "src": "/covers/turkey-detains-actor-mayor-besikcioglu--a2.png",
          "alt": "Painting of Antigone standing over the body of her brother Polynices, having defied the ruler's decree",
          "credit": "Nikiforos Lytras, Antigone in front of the dead Polynices (1865), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Rubashov's confession in Darkness at Noon",
        "excerpt": "An aging revolutionary, Rubashov is arrested one night by the very state he helped to build and locked in a bare cell to await interrogation. His former comrades wear him down not with torture but with logic and exhaustion until he agrees to confess to treasons he never committed. Koestler's novel captures how a regime devours the popular figures who once served it, demanding their public self-destruction as the price of order.",
        "source": "Arthur Koestler, Darkness at Noon (1940)",
        "href": "https://archive.org/details/darknessatnoon0000arth_e0f1"
      },
      {
        "category": "artistic",
        "title": "Goya's The Third of May 1808",
        "excerpt": "A firing squad, faceless and mechanical, levels its rifles at a cluster of unarmed civilians on a hillside in the dark. At the center a man in a white shirt throws his arms wide, lit by a stark lantern, his terror and defiance frozen an instant before the volley. Goya turns a single night of state reprisal into an enduring image of power crushing the people who dared to resist it.",
        "source": "Francisco de Goya, The Third of May 1808 (1814), oil on canvas, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:El_Tres_de_Mayo,_by_Francisco_de_Goya,_from_Prado_thin_black_margin.jpg",
        "image": {
          "src": "/covers/turkey-detains-actor-mayor-besikcioglu--a4.png",
          "alt": "Goya's painting of a firing squad executing unarmed civilians at night, a man in a white shirt with arms outstretched",
          "credit": "Francisco de Goya, The Third of May 1808 (1814), Museo del Prado; via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Daumier's Rue Transnonain, 15 April 1834",
        "excerpt": "A workingman lies sprawled and lifeless across his bed in a shadowed room, the body of a child crushed beneath him. Daumier drew the scene after government troops massacred the residents of a Paris tenement during a workers' uprising, sparing no detail of the still, ordinary bedroom turned into a killing floor. The print became an indictment of a state that answered dissent with slaughter, and censors soon tried to destroy every copy.",
        "source": "Honore Daumier, Rue Transnonain, le 15 avril 1834 (1834), lithograph, National Gallery of Art, Washington",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Rue_Transnonain,_le_15_avril_1834,_1834,_NGA_6133.jpg",
        "image": {
          "src": "/covers/turkey-detains-actor-mayor-besikcioglu--a5.png",
          "alt": "Daumier lithograph of a slain worker fallen across a bed atop a dead child, victims of a government reprisal in Paris",
          "credit": "Honore Daumier, Rue Transnonain, le 15 avril 1834 (1834), National Gallery of Art, Washington; via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 8
  },
  {
    "slug": "myanmar-take-back-rohingya-malaysia",
    "headline": "Malaysia says Myanmar has agreed to take back 5,000 Rohingya refugees as tensions rise",
    "overview": "Malaysian Prime Minister Anwar Ibrahim said Myanmar had agreed to take back 5,000 Rohingya refugees from Malaysia, where friction between the refugees and local communities has been growing. Anwar, speaking at a campaign rally, said Myanmar had also agreed to receive 300,000 Rohingya from Bangladesh; Myanmar's government did not immediately comment.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxPRjN6MW9kc0Zpc1NHaHNwbENjM3Mxb0Q4TTlKVHFQVEZnaG9DSkN4bUhHcFNGSHgyNXRfSXI2LVoyNklOQ3dHYjJhWWZWc251RmR3SkJWUHFOenBMd3Zwcl80cGozbFJITFJVSjJubXVBcWdjZXJ4clBsbDJYUU1XSUU1ekVvUnEzMzE0SUtWMWRjZjN4bGJJcG9FSFU3RjhLRmNRMTNWMUMzLVJqOFk3eThXTUNzQWNEQkRiRHN1bVIyZw?oc=5"
      },
      {
        "name": "The Japan Times",
        "href": "https://www.japantimes.co.jp/news/2026/07/30/asia-pacific/politics/malaysia-pm-myanmar-rohingya-refugees/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/myanmar-take-back-rohingya-malaysia.png",
      "alt": "A Rohingya refugee camp of makeshift shelters",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The expulsion of the Jews from Spain",
        "excerpt": "After the King had captured the city of Granada from the Moors, and it had surrendered to him on the 7th [2d] of January of the year just mentioned, he ordered the expulsion of all the Jews in all parts of his kingdom-in the kingdoms of Castile, Catalonia, Aragon, Galicia, Majorca, Minorca, the Basque provinces, the islands of Sardinia and Sicily, and the kingdom of Valencia.",
        "source": "Contemporary Jewish account of the 1492 expulsion from Spain (from a Hebrew chronicle, in J. R. Marcus, The Jew in the Medieval World), Fordham University Internet Jewish History Sourcebook",
        "href": "https://sourcebooks.fordham.edu/jewish/1492-jews-spain1.asp",
        "image": {
          "src": "/covers/myanmar-take-back-rohingya-malaysia--a0.png",
          "alt": "Emilio Sala's 1889 painting 'The Expulsion of the Jews from Spain', showing exiles being driven from their homeland",
          "credit": "Emilio Sala, La expulsion de los judios (1889), via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "historical",
        "title": "The Greek-Turkish population exchange",
        "excerpt": "As from the 1st May, 1923, there shall take place a compulsory exchange of Turkish nationals of the Greek Orthodox religion established in Turkish territory, and of Greek nationals of the Muslim religion established in Greek territory. These persons shall not return to live in Turkey or Greece respectively without the authorization of the Turkish Government or of the Greek Government respectively.",
        "source": "Convention Concerning the Exchange of Greek and Turkish Populations, signed at Lausanne, 30 January 1923 (Article 1), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Convention_Concerning_the_Exchange_of_Greek_and_Turkish_Populations",
        "image": {
          "src": "/covers/myanmar-take-back-rohingya-malaysia--a1.png",
          "alt": "Greek refugees waiting to embark on boats at Smyrna in September 1922, on the eve of the compulsory population exchange",
          "credit": "Unknown photographer, Greek refugees at Smyrna, 1922, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "By the rivers of Babylon",
        "excerpt": "By the rivers of Babylon, there we sat down, yea, we wept, when we remembered Zion. We hanged our harps upon the willows in the midst thereof.",
        "source": "Psalm 137, verses 1-2, The Holy Bible (King James Version), via Wikisource",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms"
      },
      {
        "category": "literary",
        "title": "The exiles of the Aeneid",
        "excerpt": "Arms, and the man I sing, who, forc'd by fate,\nAnd haughty Juno's unrelenting hate,\nExpell'd and exil'd, left the Trojan shore.\nLong labours, both by sea and land, he bore,\nAnd in the doubtful war, before he won\nThe Latian realm, and built the destin'd town.",
        "source": "Virgil, The Aeneid, Book I, opening lines, translated by John Dryden, Project Gutenberg (eBook #228)",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "artistic",
        "title": "Jews Mourning in Exile",
        "excerpt": "A cluster of Israelites sits in mourning by the rivers of Babylon, harps hung silent on the willows, faces turned toward a lost Jerusalem. The captives huddle together beneath an alien sky, a people uprooted and grieving in forced exile. On the painting's original frame Bendemann inscribed the opening lines of Psalm 137.",
        "source": "Eduard Bendemann, 'Die trauernden Juden im Exil' (Jews Mourning in Exile), oil on canvas, 1832, Wallraf-Richartz-Museum & Fondation Corboud, Cologne; file page on Wikimedia Commons",
        "href": "https://commons.wikimedia.org/wiki/File:Eduard_Bendemann-_Die_trauernden_Juden_im_Exil_um_1832.jpg",
        "image": {
          "src": "/covers/myanmar-take-back-rohingya-malaysia--a4.png",
          "alt": "Eduard Bendemann's 1832 painting of Jews mourning in Babylonian exile, seated by the water with their harps hung on the willows",
          "credit": "Eduard Bendemann, Die trauernden Juden im Exil (c. 1832), Wallraf-Richartz-Museum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Va, pensiero",
        "excerpt": "Va, pensiero, sull'ali dorate;\nva, ti posa sui clivi, sui colli,\nove olezzano tepide e molli\nl'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, 'Va, pensiero' (Chorus of the Hebrew Slaves) from the opera Nabucco (1842), libretto by Temistocle Solera; full score on IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/myanmar-take-back-rohingya-malaysia--a5.png",
          "alt": "Musical notation of the opening melody and first line of 'Va, pensiero' from Verdi's Nabucco",
          "credit": "Opening of 'Va, pensiero' from Verdi's Nabucco (1842), via Wikimedia Commons (public domain)"
        }
      }
    ],
    "rank": 9
  },
  {
    "slug": "rushdie-attacker-convicted-terrorism",
    "headline": "The man who stabbed author Salman Rushdie is convicted of terrorism charges for trying to aid Hezbollah",
    "overview": "Hadi Matar, 28, was convicted on federal terrorism charges over the 2022 stabbing that blinded author Salman Rushdie in one eye, with prosecutors arguing he sought to carry out a decades-old fatwa and provide material support to Hezbollah. Matar had already been convicted of attempted murder and assault in a separate state trial.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxOb1FaWlc3MXFzRF9mSGMwZDZrdTJfa19aLVpaV0FvaUNKOFNUQ0o1R0xyRVRCa1VBdnZPaHBWRWJsZHdnU3FTbU5va01SQjBKa2dZOWtVR25LM210alNMdmhOTjhIenVPWTEwSHBrdFVjRUhsdlVwZ0ppZTAyUWtQNENaelBkMmNUVnI3blFfV2ZRbkwwY2ZfTQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c86ng1g5wy4o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/rushdie-attacker-convicted-terrorism.png",
      "alt": "Author Salman Rushdie",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "William Tyndale burned for his English Bible",
        "excerpt": "Brought forth to the place of execution, he was tied to the stake, strangled by the hangman, and afterwards consumed with fire, at the town of Vilvorde, A.D. 1536; crying at the stake with a fervent zeal, and a loud voice, 'Lord! open the king of England's eyes.'",
        "source": "John Foxe, The Acts and Monuments (Book of Martyrs), account of the martyrdom of William Tyndale at Vilvoorde, 1536",
        "href": "https://www.ccel.org/f/foxe/martyrs/fox112.htm",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a0.png",
          "alt": "Woodcut from Foxe's Book of Martyrs showing William Tyndale bound to the stake and burned, with a scroll bearing his dying prayer.",
          "credit": "John Foxe, The Acts and Monuments (1563); woodcut, public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Naguib Mahfouz stabbed over a banned novel",
        "excerpt": "Nearly four decades after he wrote the allegorical novel that clerics branded blasphemous, the 82-year-old Nobel laureate was ambushed outside his Cairo home and knifed in the neck. His assailant, acting on a cleric's incitement, had never read the book. Mahfouz survived, but the nerve damage left the greatest Arabic novelist of his century barely able to hold a pen.",
        "source": "Naguib Mahfouz, Egyptian novelist and 1988 Nobel laureate, stabbed in the neck by an Islamist extremist in Cairo, 14 October 1994, over his novel Children of Gebelawi",
        "href": "https://www.nobelprize.org/prizes/literature/1988/mahfouz/facts/",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a1.png",
          "alt": "Portrait photograph of the Egyptian novelist Naguib Mahfouz.",
          "credit": "Photograph via the Nobel Prize website; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Milton's defense of the unlicensed book",
        "excerpt": "as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye. Many a man lives a burden to the earth; but a good book is the precious life-blood of a master spirit, embalmed and treasured up on purpose to a life beyond life.",
        "source": "John Milton, Areopagitica: A Speech for the Liberty of Unlicensed Printing, to the Parliament of England, 1644",
        "href": "https://www.gutenberg.org/cache/epub/608/pg608.txt",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a2.png",
          "alt": "Title page of the 1644 first edition of John Milton's Areopagitica.",
          "credit": "John Milton, Areopagitica (1644), title page; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Fahrenheit 451 and the burning of books",
        "excerpt": "Bradbury imagines a future where firemen no longer put out fires but start them, dousing forbidden books in kerosene and watching the pages blacken and curl. The written word is hunted as a threat to comfort and order, and to read is to risk the flame. Yet at the story's edge a band of exiles has each memorized a book, keeping literature alive in living memory until the world is ready for it again.",
        "source": "Ray Bradbury, Fahrenheit 451, 1953",
        "href": "https://archive.org/details/fahrenheit4510000brad_g7u4",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a3.png",
          "alt": "Photograph of the author Ray Bradbury in 1975.",
          "credit": "Photo by Alan Light, 1975; CC BY 2.0, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The book that would not burn",
        "excerpt": "In Berruguete's panel the heretical and the orthodox books are cast together onto a fire before a crowd of onlookers. The Cathar texts feed the flames, but Saint Dominic's book leaps upward, untouched, hovering above the blaze. The painting freezes the oldest fantasy of persecutors and the oldest hope of writers alike: that fire can settle which words are true, and that the right words cannot be burned.",
        "source": "Pedro Berruguete, Saint Dominic and the Albigensians (The Ordeal by Fire), c. 1493-1499, oil on panel, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Berruguete_ordeal.jpg",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a4.png",
          "alt": "Renaissance painting of Saint Dominic and the Albigensians: books thrown on a fire, with one book rising unburned above the flames.",
          "credit": "Pedro Berruguete, Saint Dominic and the Albigensians, c. 1493-1499, Museo del Prado; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Va, pensiero: the exiles' unsilenced song",
        "excerpt": "Va', pensiero, sull'ale dorate; va', ti posa sui clivi, sui colli, ove olezzano tepide e molli l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi (music) and Temistocle Solera (libretto), 'Va, pensiero' (Chorus of the Hebrew Slaves), from the opera Nabucco, 1842",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/rushdie-attacker-convicted-terrorism--a5.png",
          "alt": "Painting of Jewish captives mourning by the rivers of Babylon, harps set aside, inspiration for Psalm 137 and Verdi's chorus.",
          "credit": "Eduard Bendemann, Jews Mourning in Exile (1832), Wallraf-Richartz-Museum, Cologne; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 10
  },
  {
    "slug": "noma-reopen-without-redzepi",
    "headline": "Copenhagen's Noma prepares to reopen without founder Rene Redzepi and without its three Michelin stars",
    "overview": "Noma, the Copenhagen restaurant long ranked among the world's best, said it will reopen on Aug. 5 without founder Rene Redzepi at the helm and without its three Michelin stars, opening what it called a new chapter under longtime chefs and a menu that changes monthly. Redzepi, who moved into a creative-director role, stepped back earlier this year.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijgFBVV95cUxQV2RRV3B3UEdsbWtHZGprUEotVEJiaEpSblFnWlVBa0JpcHc0dUxCMG55NVJfT3BJWGZBTnptNE1EU0huQjh5MXVzT1BOeU93ckFSOWdaeWgtSUJudlJIZzlQSGV0LUQtdmU4SEJ0MHEteGZJc3d6RGQ3N3N1SzFlaGdEakVOckRlTjVTdGNn?oc=5"
      },
      {
        "name": "ABC News",
        "href": "https://abcnews.com/Business/wireStory/copenhagens-famed-noma-restaurant-reopen-founder-redzepi-helm-135213334"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/noma-reopen-without-redzepi.png",
      "alt": "The entrance to the Copenhagen restaurant Noma",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The pupil who inherited Aristotle's school",
        "excerpt": "He first heard his countryman Alcippus lecture in his native town and afterwards he heard Plato, whom he left for Aristotle. And when the latter withdrew to Chalcis he took over the school himself in the 114th Olympiad.",
        "source": "Diogenes Laertius, Lives of the Eminent Philosophers, Book V (on Theophrastus), trans. R. D. Hicks, Loeb Classical Library, 1925",
        "href": "https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers/Book_V",
        "image": {
          "src": "/covers/noma-reopen-without-redzepi--a0.png",
          "alt": "Ancient Roman mosaic from Pompeii showing Plato seated among the philosophers of his Academy",
          "credit": "Mosaic depicting Plato's Academy, from the Villa of T. Siminius Stephanus, Pompeii, 1st century BC / AD (Naples National Archaeological Museum), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "Raphael's workshop left to his disciples",
        "excerpt": "Next, he divided his possessions among his disciples, Giulio Romano, whom he had always loved dearly, and the Florentine Giovanni Francesco, called Il Fattore, with a priest of Urbino, his kinsman, whose name I do not know.",
        "source": "Giorgio Vasari, Lives of the Most Eminent Painters, Sculptors and Architects, 'Life of Raffaello da Urbino' (trans. Gaston du C. de Vere), Vol. IV",
        "href": "https://www.gutenberg.org/cache/epub/28420/pg28420.txt",
        "image": {
          "src": "/covers/noma-reopen-without-redzepi--a1.png",
          "alt": "Raphael's self-portrait, a young man in dark cap and cloak turning toward the viewer",
          "credit": "Raphael (Raffaello Sanzio), Self-Portrait, c. 1506 (Uffizi, Florence), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "King Lear divides his kingdom",
        "excerpt": "Meantime we shall express our darker purpose. Give me the map there. Know that we have divided In three our kingdom; and 'tis our fast intent To shake all cares and business from our age, Conferring them on younger strengths, while we Unburden'd crawl toward death.",
        "source": "William Shakespeare, King Lear, Act I, Scene 1 (Yale Shakespeare, ed. William Lyon Phelps, 1917)",
        "href": "https://en.wikisource.org/wiki/King_Lear_(1917)_Yale/Text/Act_I",
        "image": {
          "src": "/covers/noma-reopen-without-redzepi--a2.png",
          "alt": "Crowded court scene from King Lear's opening as the aged king divides his realm among his daughters",
          "credit": "Ford Madox Brown, Cordelia's Portion, c. 1866-72, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "Babette's once-in-a-lifetime feast",
        "excerpt": "A French master cook, exiled and serving for years as a plain housekeeper to two austere sisters in a remote Norwegian village, wins a lottery and spends every last coin on a single, transcendent French dinner for their pious, aging congregation. The guests, who had solemnly vowed not to praise or even notice the food, are lifted despite themselves into warmth, forgiveness, and grace. Her genius is poured out not for fame or reward but as one complete and final gift, the artist spending everything on a single perfect service.",
        "source": "Isak Dinesen (Karen Blixen), 'Babette's Feast,' in Anecdotes of Destiny (1958)",
        "href": "https://archive.org/details/anecdotesofdesti00dine"
      },
      {
        "category": "artistic",
        "title": "A groaning table of abundance",
        "excerpt": "Aertsen fills the foreground with a riotous heap of provisions, slabs of meat, sausages, poultry, fish, butter and pretzels, pressed so close they nearly spill from the panel. Behind this overwhelming display of worldly plenty, almost hidden, the Holy Family pauses to give alms to the poor, quietly reversing the picture's values. It is a founding image of the still-life feast, staging the tension between spectacle and substance that any great kitchen must answer.",
        "source": "Pieter Aertsen, A Meat Stall with the Holy Family Giving Alms, 1551, oil on panel, North Carolina Museum of Art",
        "href": "https://commons.wikimedia.org/wiki/File:A_Meat_Stall_with_the_Holy_Family_Giving_Alms_-_Pieter_Aertsen_-_Google_Cultural_Institute.jpg",
        "image": {
          "src": "/covers/noma-reopen-without-redzepi--a4.png",
          "alt": "Sixteenth-century painting of a butcher's market stall overflowing with meat, fish and produce, with the Holy Family giving alms in the background",
          "credit": "Pieter Aertsen, A Meat Stall with the Holy Family Giving Alms, 1551 (North Carolina Museum of Art), public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "The Requiem the master left unfinished",
        "excerpt": "Mozart died in December 1791 with his Requiem barely begun beyond the opening movements, the later pages trailing off into sketch and silence. His pupil Franz Xaver Sussmayr, steeped in the master's manner, orchestrated the drafts, composed the missing movements, and carried the work to completion in his teacher's hand. The result endures as one of music's supreme monuments, proof that a workshop can finish, and honor, what its founder began.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K. 626 (1791), left incomplete at his death and completed by his pupil Franz Xaver Sussmayr",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/noma-reopen-without-redzepi--a5.png",
          "alt": "First page of the autograph manuscript of Mozart's Requiem in his own handwriting",
          "credit": "Wolfgang Amadeus Mozart, autograph manuscript of the Requiem in D minor, K. 626, 1791 (Austrian National Library), public domain via Wikimedia Commons"
        }
      }
    ],
    "rank": 11
  },
  {
    "slug": "bengaluru-innovation-museum-mist",
    "headline": "Architects of the Grand Egyptian Museum are chosen to convert a former Bengaluru factory into a $35 million innovation museum",
    "overview": "A consortium led by Heneghan Peng Architects, designers of the Grand Egyptian Museum, has been picked to transform a former switchgear factory shed on Bengaluru's NGEF campus into the Museum of Innovation, Startup and Technology, a $35 million project set within a 105-acre urban forest. The first phase, alongside a deep-tech incubator, is targeted for 2028.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/30/bengaluru-museum-innovation-startup-technology/"
      },
      {
        "name": "Arab News",
        "href": "https://www.arabnews.com/node/2652703/world"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/bengaluru-innovation-museum-mist.png",
      "alt": "The illuminated Vidhana Soudha, a landmark building in Bengaluru",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Pantheon becomes a church",
        "excerpt": "For nearly five centuries the Pantheon stood as a pagan temple to all the gods of Rome, its vast unreinforced concrete dome open to the sky through a single oculus. In 609 AD it was given to the pope and consecrated as the church of Santa Maria ad Martyres, an act of reuse that very likely saved it from the quarrying that reduced so much of ancient Rome to rubble. Two thousand years on it remains the best-preserved monument of antiquity, a temple reborn without ever falling silent.",
        "source": "The Pantheon, Rome (built c. 113–125 AD; consecrated as the church of Santa Maria ad Martyres, 609 AD)",
        "href": "https://en.wikipedia.org/wiki/Pantheon,_Rome",
        "image": {
          "src": "/covers/bengaluru-innovation-museum-mist--a0.png",
          "alt": "The columned front portico of the Pantheon in Rome",
          "credit": "Demetrios Karatassos (Jk1677), Wikimedia Commons, CC0"
        }
      },
      {
        "category": "historical",
        "title": "A power station becomes Tate Modern",
        "excerpt": "Bankside Power Station brooded on the Thames for decades, a brick cathedral of turbines that fell dark once oil-fired generation turned obsolete. Herzog & de Meuron kept the hulking shell and its single towering chimney, hollowing the interior into the cavernous Turbine Hall and stacking galleries where machinery once roared. When Tate Modern opened in 2000 it proved that a dead engine of industry could become one of the world's most visited temples of art.",
        "source": "Tate Modern, London — Bankside Power Station converted by Herzog & de Meuron, opened 2000",
        "href": "https://en.wikipedia.org/wiki/Tate_Modern",
        "image": {
          "src": "/covers/bengaluru-innovation-museum-mist--a1.png",
          "alt": "Tate Modern, the former Bankside Power Station, seen from the Millennium Bridge",
          "credit": "Michael Reeve, 2004, Wikimedia Commons, CC BY-SA 3.0 / GFDL"
        }
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, King of Kings.\" Look on my works ye Mighty, and despair! No thing beside remains.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\", The Examiner (London), 11 January 1818",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/bengaluru-innovation-museum-mist--a2.png",
          "alt": "The colossal granite bust of Ramesses II, the 'Younger Memnon', in the British Museum",
          "credit": "Photograph by Szilas, British Museum, Wikimedia Commons, CC BY-SA 4.0"
        }
      },
      {
        "category": "literary",
        "title": "Solomon builds the temple",
        "excerpt": "And it came to pass in the four hundred and eightieth year after the children of Israel were come out of the land of Egypt, in the fourth year of Solomon's reign over Israel, in the month Zif, which is the second month, that he began to build the house of the LORD.",
        "source": "The Holy Bible, King James Version, 1 Kings 6:1",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Kings"
      },
      {
        "category": "artistic",
        "title": "An Iron Forge",
        "excerpt": "Joseph Wright of Derby lights his forge like a nativity, the white-hot bar of iron on the anvil throwing a supernatural glow across the faces of the smith and his family. Painted in 1772 at the dawn of the Industrial Revolution, it lends to labour and machinery the reverence earlier artists reserved for saints and holy scenes. Wright makes a workshop feel like a sanctuary, turning industry itself into a subject worthy of awe.",
        "source": "Joseph Wright of Derby, An Iron Forge, 1772, oil on canvas, Tate (T06670)",
        "href": "https://www.tate.org.uk/art/artworks/wright-an-iron-forge-t06670",
        "image": {
          "src": "/covers/bengaluru-innovation-museum-mist--a4.png",
          "alt": "Joseph Wright of Derby's painting An Iron Forge, a family lit by a glowing bar of hot iron on an anvil",
          "credit": "Joseph Wright of Derby, 1772, Tate; Wikimedia Commons, public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Piranesi's view of the Pantheon",
        "excerpt": "In this etching Giovanni Battista Piranesi records the Pantheon not as a ruin but as a living building, already the Christian church of Santa Maria ad Martyres, its portico crowded with annotations of columns, cornices and papal repairs. His dramatic light and obsessive detail turned Rome's surviving monuments into objects of wonder for a whole generation of European travellers and architects. The image captures the very theme of a great structure preserved by being given new purpose.",
        "source": "Giovanni Battista Piranesi, Veduta del Pantheon di Agrippa, oggi Chiesa di S. Maria ad Martyres, from Vedute di Roma, etching (c. 1761)",
        "href": "https://commons.wikimedia.org/wiki/File:Piranesi-17002.jpg",
        "image": {
          "src": "/covers/bengaluru-innovation-museum-mist--a5.png",
          "alt": "Piranesi etching of the Pantheon of Agrippa, shown as the church of Santa Maria ad Martyres, with detailed architectural annotations",
          "credit": "Giovanni Battista Piranesi, Vedute di Roma; Wikimedia Commons, public domain"
        }
      }
    ],
    "rank": 12
  },
  {
    "slug": "adidas-shares-slide-profit-miss",
    "headline": "Adidas shares slide a record 17% after quarterly operating profit misses expectations despite record sales",
    "overview": "Adidas shares fell about 17%, their biggest one-day drop in more than six years, after the German sportswear maker reported second-quarter operating profit of 574 million euros that missed analyst estimates even as net sales hit a record 6.74 billion euros. The company had ramped up marketing spending around the 2026 World Cup and raised its full-year revenue growth forecast.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxPZXdWMDI5LUZWaFRNeXZ3MkYyUFZSeTBkTEVEMEJpS0UxT2U4N1djeHNqTHkyQ3lDNHdXWDBMeWVnaTdvZG54bUhtZDJGMzJESjVXbUwxZGM1RTgxbUJTU1YtUThGMjhCRDFNUzNkNnpQNWdUUFduZHg2TEhDNTFKQzRLcFF4LU1tdkJ5alJMN2dBREFmRUZJdQ?oc=5"
      },
      {
        "name": "Investing.com",
        "href": "https://www.investing.com/news/earnings/adidas-q2-revenue-hits-record-high-but-profit-misses-expectations-4822391"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-30",
    "image": {
      "src": "/covers/adidas-shares-slide-profit-miss.png",
      "alt": "An Adidas store displaying the brand three-stripe logo",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 30 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Tulipomania Collapses (1637)",
        "excerpt": "As this conviction spread, prices fell, and never rose again. Confidence was destroyed, and a universal panic seized upon the dealers.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, 'The Tulipomania' (1841; 1852 edition). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/24518/24518-h/24518-h.htm",
        "image": {
          "src": "/covers/adidas-shares-slide-profit-miss--a0.png",
          "alt": "Jan Brueghel the Younger's satirical painting depicting monkeys as speculators trading, weighing and squabbling over tulips.",
          "credit": "Jan Brueghel the Younger, Satire on Tulip Mania, c. 1640, Frans Hals Museum. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Black Monday, 19 October 1987",
        "excerpt": "On 19 October 1987 the Dow Jones Industrial Average shed 22.6 percent in a single session, the steepest one-day fall in its history, as computer-driven program trading turned ordinary selling into an avalanche. There had been no war, no failed harvest, no obvious catastrophe; only expectations, suddenly unwound. The champions of a five-year bull run watched fortunes evaporate between the opening and closing bells.",
        "source": "Donald Bernhardt and Marshall Eckblad, 'Stock Market Crash of 1987,' Federal Reserve History (Federal Reserve System).",
        "href": "https://www.federalreservehistory.org/essays/stock-market-crash-of-1987",
        "image": {
          "src": "/covers/adidas-shares-slide-profit-miss--a1.png",
          "alt": "Line chart of the Dow Jones Industrial Average showing its sharp plunge on Black Monday in October 1987.",
          "credit": "Dow Jones Industrial Average around Black Monday, October 1987. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Fortune Turns Her Wheel",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II (Fortune speaks), trans. H. R. James (London, 1897). Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/14328/14328-h/14328-h.htm"
      },
      {
        "category": "literary",
        "title": "Pride Goeth Before a Fall",
        "excerpt": "Pride goeth before destruction, and an haughty spirit before a fall.",
        "source": "Proverbs 16:18, King James Version (1611). Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Proverbs"
      },
      {
        "category": "artistic",
        "title": "Hogarth's South Sea Scheme (1721)",
        "excerpt": "Hogarth's crowded satire on the South Sea Bubble shows speculators riding a spinning carousel while Honesty is broken on the wheel and Honour is flogged, a monument in the corner noting that the city was ruined by the fashionable madness of the crowd. It is the ruin of a soaring scheme rendered as a fairground of folly.",
        "source": "William Hogarth, The South Sea Scheme (An Emblematical Print on the South Sea Scheme), etching and engraving, 1721. National Gallery of Art, Washington.",
        "href": "https://commons.wikimedia.org/wiki/File:William_Hogarth,_The_South_Sea_Scheme,_1721,_NGA_30435.jpg",
        "image": {
          "src": "/covers/adidas-shares-slide-profit-miss--a4.png",
          "alt": "William Hogarth's 1721 engraving satirising the South Sea Bubble, crowds circling a speculative merry-go-round while figures of Honesty and Honour are tormented.",
          "credit": "William Hogarth, The South Sea Scheme, 1721, National Gallery of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Wheel of Fortune, Carmina Burana",
        "excerpt": "The medieval illumination shows Fortune turning her wheel, its four figures inscribed 'Regnabo, Regno, Regnavi, Sum sine regno' - I shall reign, I reign, I have reigned, I am without reign. The favoured king rises to the top only to be flung, crownless, to the ground.",
        "source": "Wheel of Fortune (Rota Fortunae), illumination from the Carmina Burana (Codex Buranus, Clm 4660), c. 1230. Bayerische Staatsbibliothek, Munich.",
        "href": "https://commons.wikimedia.org/wiki/File:Carmina_Burana_-_Wheel_of_Fortune.JPG",
        "image": {
          "src": "/covers/adidas-shares-slide-profit-miss--a5.png",
          "alt": "Medieval manuscript illumination of the Wheel of Fortune, with a crowned figure rising, reigning, falling and cast down as Fortune turns the wheel.",
          "credit": "Wheel of Fortune (Rota Fortunae), Carmina Burana manuscript, c. 1230, Bayerische Staatsbibliothek, Munich. Public domain via Wikimedia Commons."
        }
      }
    ],
    "rank": 13
  },
  {
    "slug": "glen-hansard-dies-motorcycle-crash",
    "headline": "Glen Hansard, Irish singer-songwriter who won a best-song Oscar for 'Falling Slowly' from 'Once,' dies in a motorcycle crash at 56",
    "overview": "Glen Hansard, the Irish musician who fronted the rock band The Frames and won the 2008 Academy Award for best original song for 'Falling Slowly' from the 2007 low-budget film 'Once,' has died in a motorcycle crash at 56. Hansard began as a Dublin street busker before finding international acclaim, and fellow musicians led an outpouring of tributes.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPU2xOMXBGVWVHZWFaLVF5VmJ6a2NrcDE3MXc2ZW8yTGNvQXlQVTc4V1hoNzUwZVFFTFg4blVVMkNhV1pXaTFPRURvNzlYZ1JYeVUxUmFmS3U3V2tTNlFEcW9FM2hDM01JOWtvbm9aRUpVTFdINkhlQldZYjBxbmN2N2VxTXlNT2Z3R2VTdnRnODFhZ2l4Z0gzdkhKVWVoeGc3bE5n?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c3ekn9d37qvo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/glen-hansard-dies-motorcycle-crash.png",
      "alt": "Irish singer-songwriter Glen Hansard performing with a guitar",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Baker's Son Who Sang for Queens",
        "excerpt": "Now Bernart of Ventadorn was of Limousin of the Castle of Ventadorn, and was one of low degree, son to wit of a serving man, who gathered brushwood for the heating of the oven wherein was baked the castle bread. And he became a fair man and a skilled, and knew well to make poetry and to sing, and was both courteous and learned.",
        "source": "Uc de Saint-Circ, \"The Life of Bernart of Ventadorn\" (13th-century Occitan vida of the c. 1147–1170 troubadour), trans. Ida Farnell, in The Lives of the Troubadours (London: David Nutt, 1896), pp. 27–28.",
        "href": "https://archive.org/stream/livesoftroubadou00farnrich/livesoftroubadou00farnrich_djvu.txt",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a0.png",
          "alt": "Medieval manuscript miniature of the troubadour Bernart de Ventadorn.",
          "credit": "Chansonnier K, BnF ms. 12473, fol. 15v (13th century); Bibliothèque nationale de France via Wikimedia Commons; public domain."
        }
      },
      {
        "category": "historical",
        "title": "A Composer Cut Down on the Road",
        "excerpt": "Chausson, Ernest, born in Paris, 1855, died, from a bicycle accident, at Limay ... Was a pupil of César Franck, from whom he received the traditions of his solid structural style, of his rare simplicity of accentuation, of his refined methods of expression, qualities which were enhanced by his delicate, sensitive nature, which was prone to a gentle melancholy.",
        "source": "\"Chausson, Ernest,\" in Grove's Dictionary of Music and Musicians, ed. J. A. Fuller Maitland, 2nd ed., vol. I (London: Macmillan, 1904).",
        "href": "https://archive.org/stream/grovesdictionar02boydgoog/grovesdictionar02boydgoog_djvu.txt",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a1.png",
          "alt": "Portrait photograph of the French composer Ernest Chausson.",
          "credit": "Portrait photograph of Ernest Chausson, late 19th century; Wikimedia Commons; public domain."
        }
      },
      {
        "category": "literary",
        "title": "The Singing Head on the River",
        "excerpt": "The limbs lie scattered in various places. Thou, Hebrus, dost receive the head and the lyre; and (wondrous to relate!) while it rolls down the midst of the stream, the lyre complains in I know not what kind of mournful strain. His lifeless tongue, too, utters a mournful sound, to which the banks mournfully reply.",
        "source": "Ovid, Metamorphoses, Book XI (the death of Orpheus), trans. Henry T. Riley (London: Henry G. Bohn, 1851).",
        "href": "https://www.gutenberg.org/cache/epub/26073/pg26073.txt",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a2.png",
          "alt": "Painting of a Thracian girl cradling the severed head of Orpheus resting on his lyre.",
          "credit": "Gustave Moreau, Orphée (Orpheus), 1865, Musée d'Orsay; public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "literary",
        "title": "Dead Ere His Prime",
        "excerpt": "Yet once more, O ye Laurels, and once more / Ye Myrtles brown, with Ivy never-sear ... For Lycidas is dead, dead ere his prime, / Young Lycidas, and hath not left his peer:",
        "source": "John Milton, \"Lycidas\" (1637; pub. 1645), in Poems of Mr. John Milton, Both English and Latin.",
        "href": "https://en.wikisource.org/wiki/Poems_of_Mr._John_Milton,_Both_English_and_Latin,_Compos'd_at_several_times/Lycidas",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a3.png",
          "alt": "Portrait of the young John Milton, c. 1629.",
          "credit": "Portrait of John Milton, c. 1629, National Portrait Gallery, London (NPG 4222); public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Street Musician, Ennobled by Light",
        "excerpt": "Georges de La Tour paints a blind, aging street musician alone against the dark, his worn face straining as his fingers turn the crank of a battered hurdy-gurdy. The unsparing light dignifies a man who once sang for coins in the road — the same humble ground from which Hansard rose, busking on Dublin's Grafton Street before the world knew his name. It is a portrait of music made at the very bottom, and of the human worth the painter insists we honour.",
        "source": "Georges de La Tour, The Hurdy-Gurdy Player (Le Vielleur), c. 1631–1636, oil on canvas, Musée d'Arts de Nantes.",
        "href": "https://commons.wikimedia.org/wiki/File:Georges_de_La_Tour_-_The_Hurdy-gurdy_Player_-_WGA12335.jpg",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a4.png",
          "alt": "Baroque painting of a blind hurdy-gurdy player singing in the street.",
          "credit": "Georges de La Tour, c. 1631–1636, Musée d'Arts de Nantes; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "The Air That Became a Nation's Lament",
        "excerpt": "The Londonderry Air is the most beloved of Irish melodies — an unhurried, aching tune that rises to a single soaring phrase and then falls away like a long farewell, later fitted with the words of \"Danny Boy,\" a mother's lament for a young man gone from home. Wordless, it already sounds like tenderness and grief held together. That an anonymous Irish air should have become the world's default song of loss makes it a fitting requiem for an Irish singer taken too soon.",
        "source": "\"Londonderry Air\" (traditional Irish air, first published in The Ancient Music of Ireland, ed. George Petrie, Dublin, 1855); arr. Frank Bridge, An Irish Melody, H.86 (1908).",
        "href": "https://imslp.org/wiki/An_Irish_Melody_'The_Londonderry_Air',_H.86_(Bridge,_Frank)",
        "image": {
          "src": "/covers/glen-hansard-dies-motorcycle-crash--a5.png",
          "alt": "First printed sheet music of the Londonderry Air, 1855.",
          "credit": "First printing of the Londonderry Air, from The Ancient Music of Ireland, ed. George Petrie, 1855; public domain via Wikimedia Commons."
        }
      }
    ],
    "lead": true,
    "rank": 14
  },
  {
    "slug": "wall-street-dow-drops-ai-stocks-selloff",
    "headline": "Wall Street tumbles, the Dow falling more than 1,100 points as AI-linked stocks slide and oil prices jump",
    "overview": "U.S. stocks fell sharply, with the Dow Jones Industrial Average dropping more than 1,100 points as a selloff in artificial-intelligence-linked technology shares dragged the market lower and oil prices jumped. The rout came after the Federal Reserve left interest rates unchanged, feeding worries that a frothy, AI-driven boom may be losing air.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimAFBVV95cUxNVVhqMlRBNU0taHdVcUdHUUE3eDFsZEFQbTZ6dElnTEtMOGVSb1ktYlhpbmJHMm9NY2xRc1lQRWRXcGZ2N0NUNm9FSWV1ZkQ2MjAtaE5WWkwxeHFDMmxxX3I4MHNDNmduRnZ4ODNzNUtSZ2hyZEh3NVBtMmthTHA5UDRzcTBXOWJYNS0yVHlUM0loVXE5VThkeg?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxPYTBjTkgxdmttOW1mOFd3NHRiOHNOdEhqMG12bzU1WWVOcm1pTGNuazF6OGU2VkJya1dZd3lKSXRmZ0V3NFJ6eXJGbGk1SzgtQ2E1NzI0YmJQZk9uZ1lmWTZqNHpEY3lrYVZtYlNIYXllOWNYUDdxT1owV3FnX1ZUNHdyMGN4VlM0QVZpbV9PYzkzT1ktVXZLRWx6dmMtNnRIMnVIUzBfakZmMl9kS25ldGQxbw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/wall-street-dow-drops-ai-stocks-selloff.png",
      "alt": "Traders on the floor of the New York Stock Exchange",
      "credit": "Library of Congress"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The financial panic of A.D. 33 under Tiberius",
        "excerpt": "Hence followed a scarcity of money, a great shock being given to all credit, the current coin too, in consequence of the conviction of so many persons and the sale of their property, being locked up in the imperial treasury or the public exchequer.",
        "source": "Tacitus, The Annals, Book VI, chapters 16-17 (trans. Alfred John Church and William Jackson Brodribb, 1876)",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_6"
      },
      {
        "category": "historical",
        "title": "The Wall Street Crash of 1929 and the Great Depression",
        "excerpt": "The money changers have fled from their high seats in the temple of our civilization. We may now restore that temple to the ancient truths.",
        "source": "Franklin D. Roosevelt, First Inaugural Address, March 4, 1933 (The Avalon Project, Yale Law School)",
        "href": "https://avalon.law.yale.edu/20th_century/froos1.asp"
      },
      {
        "category": "literary",
        "title": "The South-Sea Bubble",
        "excerpt": "It seemed at that time as if the whole nation had turned stockjobbers. Exchange Alley was every day blocked up by crowds, and Cornhill was impassable for the number of carriages. Everybody came to purchase stock.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Vol. I, \"The South-Sea Bubble\" (London: Richard Bentley, 1841)",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm"
      },
      {
        "category": "literary",
        "title": "The Way We Live Now",
        "excerpt": "Money to come from, sir? Where do you suppose the money comes from in all these undertakings? If we can float the shares, the money'll come in quick enough.",
        "source": "Anthony Trollope, The Way We Live Now (London: Chapman & Hall, 1875)",
        "href": "https://www.gutenberg.org/files/5231/5231-h/5231-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife",
        "excerpt": "A merchant tilts his balance to weigh out gold coins and pearls, while his wife's fingers halt mid-page in her book of devotions, her eyes pulled helplessly toward the glitter. The scales, not the scripture, now command the household. Painted in 1514, it is an early warning that when wealth is measured obsessively, judgment quietly slips out of balance.",
        "source": "Quentin Matsys (Metsys), The Moneylender and His Wife, 1514, oil on panel, Musee du Louvre, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Massysm_Quentin_%E2%80%94_The_Moneylender_and_his_Wife_%E2%80%94_1514.jpg",
        "image": {
          "src": "/covers/wall-street-dow-drops-ai-stocks-selloff--a4.png",
          "alt": "A moneylender weighs gold coins on a balance while his wife, distracted from her prayer-book, watches the glinting money.",
          "credit": "Quentin Matsys, \"The Moneylender and His Wife\" (1514), Musee du Louvre. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Totentanz (Dance of Death), S.126",
        "excerpt": "Liszt seizes the medieval death-chant \"Dies irae\" and hammers it into a set of savage variations, the piano pounding away like a market in free-fall. The music climbs through dazzling brilliance only to be dragged back, again and again, to the same grim descending motif of doom. It is fortune's wheel rendered in sound: every ascent shadowed by the certainty of the plunge.",
        "source": "Franz Liszt, Totentanz (Dance of Death), paraphrase on the plainchant \"Dies irae\" for piano and orchestra, S.126 (1849, rev. 1859)",
        "href": "https://imslp.org/wiki/Totentanz,_S.126_(Liszt,_Franz)",
        "image": {
          "src": "/covers/wall-street-dow-drops-ai-stocks-selloff--a5.png",
          "alt": "Photographic portrait of the composer Franz Liszt in 1858.",
          "credit": "Franz Hanfstaengl, portrait of Franz Liszt, 1858. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 15
  },
  {
    "slug": "fauci-fifth-amendment-senate-covid-hearing",
    "headline": "Anthony Fauci repeatedly invokes the Fifth Amendment at a Senate hearing on Covid origins led by Rand Paul",
    "overview": "Anthony Fauci, the former top U.S. infectious-disease official, repeatedly invoked his Fifth Amendment right against self-incrimination during a contentious Senate committee hearing led by Senator Rand Paul into the origins of Covid-19. Fauci said he feared Republicans would try to trip him up and use his testimony to pursue a perjury prosecution.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cdx85vkk0gko"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPUTRiR2lOSXFrbDN1ckU5bW9fZ3BqUmNnb1J0UVdlMlp4M1V6Uk1RMmhRS2R5RktRV0FVNU51LVlSUjNReFkzbHRrQjVYLVYyU3ZWOG85SWQxb2tLTEdRVmd4bmtRZDlRMDVGb0IxRWNZclFZc3Jjb3liejQ3S2xFc25Ra2plcWdKTm95ZGlBa0hhUnRCcGF5ODRjRU9ZdUVlM0c0dFNxVnRySGYzVDBKVUttZkNVRWVacmUxbGotZVdlWmR6Q2RYVi1MbDA3QQ?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/fauci-fifth-amendment-senate-covid-hearing.png",
      "alt": "Anthony Fauci, former director of the U.S. National Institute of Allergy and Infectious Diseases",
      "credit": "NIAID"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "John Lilburne refuses to answer \"interrogatories against myself\"",
        "excerpt": "...urged it as illegal, arbitrary, and tyrannical, that the lords in the Star-chamber should order me to be whipped, pillored, &c. for refusing to answer interrogatories against myself; and yet Mr. Bradshaw treads in the same steps, and very seriously asked me questions against myself, and because I refused to answer, committed me for treason in general.",
        "source": "The trial of Lieutenant-Colonel John Lilburne for high treason (1649), from A Complete Collection of State Trials (T. B. Howell), reproduced in Celebrated Trials, Volume 2.",
        "href": "https://en.wikisource.org/wiki/Celebrated_Trials/Volume_2/Lieutenant-Colonel_John_Lilburne,_for_High_Treason"
      },
      {
        "category": "historical",
        "title": "Screenwriter John Howard Lawson turns the tables on the House Un-American Activities Committee",
        "excerpt": "I am not on trial here, Mr. Chairman. This committee is on trial here before the American people. Let us get that straight.",
        "source": "Hearings Regarding the Communist Infiltration of the Motion Picture Industry, House Committee on Un-American Activities, 80th Cong., 1st sess. (Oct. 1947), testimony of John Howard Lawson, p. 292.",
        "href": "https://archive.org/download/hearingsregardin1947aunit/hearingsregardin1947aunit_djvu.txt"
      },
      {
        "category": "literary",
        "title": "Socrates: better to die than to speak unjustly to save himself",
        "excerpt": "There are other ways of escaping death, if a man is willing to say and do anything. The difficulty, my friends, is not to avoid death, but to avoid unrighteousness; for that runs faster than death.",
        "source": "Plato, Apology, trans. Benjamin Jowett (Project Gutenberg eBook #1656).",
        "href": "https://www.gutenberg.org/files/1656/1656-h/1656-h.htm"
      },
      {
        "category": "literary",
        "title": "Bartleby's mild, immovable refusal: \"I would prefer not to\"",
        "excerpt": "Imagine my surprise, nay, my consternation, when without moving from his privacy, Bartleby in a singularly mild, firm voice, replied, “I would prefer not to.” I sat awhile in perfect silence, rallying my stunned faculties.",
        "source": "Herman Melville, Bartleby, the Scrivener: A Story of Wall-Street (1853) (Project Gutenberg eBook #11231).",
        "href": "https://www.gutenberg.org/files/11231/11231-h/11231-h.htm"
      },
      {
        "category": "artistic",
        "title": "Jacques-Louis David, The Death of Socrates",
        "excerpt": "David freezes the philosopher at the instant of decision: upright and serene, one hand closing around the poison cup, the other raised mid-argument, while his disciples collapse in grief around the cell. Condemned by the court of Athens, Socrates chooses death over silence or self-betrayal, turning his own execution into a last act of defiance before his accusers.",
        "source": "Jacques-Louis David, The Death of Socrates, 1787, oil on canvas, The Metropolitan Museum of Art, New York (Catharine Lorillard Wolfe Collection, Wolfe Fund, 1931; accession no. 31.45).",
        "href": "https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Death_of_Socrates_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/fauci-fifth-amendment-senate-covid-hearing--a4.png",
          "alt": "Neoclassical painting of Socrates seated upright on his prison bed, reaching for a cup of hemlock while raising his other hand in a gesture of argument, surrounded by grieving disciples.",
          "credit": "The Metropolitan Museum of Art, New York (Catharine Lorillard Wolfe Collection, Wolfe Fund, 1931; acc. no. 31.45); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Mozart, \"Rex tremendae\" from the Requiem in D minor, K.626",
        "excerpt": "In the \"Rex tremendae\" the chorus hurls itself at the King of dreadful majesty, the judge before whom every soul must finally answer, only to shrink into a whispered plea to be spared. Mozart scores judgment itself as something overwhelming and inescapable, the sound of a tribunal that offers no place to hide.",
        "source": "Wolfgang Amadeus Mozart, Requiem in D minor, K.626 (1791; completed by F. X. Sussmayr), Sequence: \"Rex tremendae majestatis\"; scores at IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_in_D_minor,_K.626_(Mozart,_Wolfgang_Amadeus)",
        "image": {
          "src": "/covers/fauci-fifth-amendment-senate-covid-hearing--a5.png",
          "alt": "Opening page of Mozart's autograph manuscript of the Requiem in D minor, K.626, showing his handwritten heading and the ruled musical staves of the Introit.",
          "credit": "Autograph manuscript, Osterreichische Nationalbibliothek (Austrian National Library), Vienna; public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 16
  },
  {
    "slug": "nextera-brookfield-kentucky-data-center-paducah",
    "headline": "NextEra and Brookfield plan a $100 billion AI data-center campus at the former Paducah uranium-enrichment site in Kentucky",
    "overview": "NextEra Energy and Brookfield unveiled plans for a roughly $100 billion artificial-intelligence data-center campus at the U.S. Department of Energy's former Paducah gaseous-diffusion plant in Kentucky, a Cold War site that once enriched uranium for weapons and reactors before closing in 2013. The project, powered by gigawatts of new gas generation and battery storage, underscores the enormous electricity appetite of the AI boom.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiygFBVV95cUxPU2FOb2YxUGRraFUwbk5LU3hWVFVoRkVEQWI0VlVDenhGak1wWnA4RjBUSlpzQml5bEhEdFFTWGYtWWRkb2h6VGN6LS1DcktNRm02aTliZ2ZhX2tqUVowcmdDb3hnX2E5V05rQlNCbHYyLWxNX3h3UEloMUI0LU9KNDlxUnFhZ3JBb3ktdDNhZG5nZHVrb1d0aUVCdzBXZEJBLVJtLVdLYnZVM2xJSzE0ZWJGcENWNjlVdnRYclpBbFBjclhpYWVNN21R?oc=5"
      },
      {
        "name": "Power Magazine",
        "href": "https://www.powermag.com/brookfield-nextera-to-develop-100b-data-center-campus-at-does-paducah-site-paired-with-4-6-gw-of-dedicated-generation/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/nextera-brookfield-kentucky-data-center-paducah.png",
      "alt": "A uranium-enrichment converter inside the former Paducah Gaseous Diffusion Plant in Kentucky",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Franklin draws the fire from the sky",
        "excerpt": "But if two gun-barrels electrified will strike at two inches distance, and make a loud snap, to what a great distance may 10,000 acres of electrified cloud strike and give its fire, and how loud must be that crack!",
        "source": "Benjamin Franklin, \"Experiments and Observations on Electricity, Made at Philadelphia in America\" (Letter IV to Peter Collinson, c. 1750), London, 1751-1753.",
        "href": "https://www.gutenberg.org/files/45515/45515-h/45515-h.htm"
      },
      {
        "category": "historical",
        "title": "Einstein and Szilard warn Roosevelt that uranium can yield 'vast amounts of power'",
        "excerpt": "In the course of the last four months it has been made probable - through the work of Joliot in France as well as Fermi and Szilard in America - that it may become possible to set up a nuclear chain reaction in a large mass of uranium, by which vast amounts of power and large quantities of new radium-like elements would be generated. Now it appears almost certain that this could be achieved in the immediate future.",
        "source": "Albert Einstein (drafted with Leo Szilard), letter to President Franklin D. Roosevelt, August 2, 1939.",
        "href": "https://en.wikisource.org/wiki/Albert_Einstein_to_Franklin_D._Roosevelt_-_August_2,_1939"
      },
      {
        "category": "literary",
        "title": "Prometheus steals fire and hands mortals a boundless new power",
        "excerpt": "And I am he that searched out the source of fire, by stealth borne-off inclosed in a fennel-rod, which has shown itself a teacher of every art to mortals, and a great resource.",
        "source": "Aeschylus, \"Prometheus Bound,\" trans. Theodore Alois Buckley, in \"The Tragedies of Aeschylus\" (Project Gutenberg ed.).",
        "href": "https://www.gutenberg.org/files/27458/27458-h/27458-h.htm"
      },
      {
        "category": "literary",
        "title": "Frankenstein and the peril of an 'astonishing power' one cannot control",
        "excerpt": "Learn from me, if not by my precepts, at least by my example, how dangerous is the acquirement of knowledge and how much happier that man is who believes his native town to be the world, than he who aspires to become greater than his nature will allow.",
        "source": "Mary Wollstonecraft Shelley, \"Frankenstein; or, The Modern Prometheus\" (1818; 1831 revised text), Volume I, Chapter IV.",
        "href": "https://www.gutenberg.org/files/84/84-h/84-h.htm"
      },
      {
        "category": "artistic",
        "title": "Rain, Steam and Speed - The Great Western Railway",
        "excerpt": "A black locomotive tears out of a rain-blurred haze across a viaduct, its firebox glowing as bridge, river and sky dissolve into a golden storm of steam and light. Turner makes raw mechanical power feel sublime and faintly menacing, the new engine hurtling forward faster than the eye can hold. It is the industrial age painted as both miracle and elemental force.",
        "source": "J.M.W. Turner, \"Rain, Steam and Speed - The Great Western Railway,\" 1844, oil on canvas, The National Gallery, London (NG538).",
        "href": "https://commons.wikimedia.org/wiki/File:Rain_Steam_and_Speed_the_Great_Western_Railway.jpg",
        "image": {
          "src": "/covers/nextera-brookfield-kentucky-data-center-paducah--a4.png",
          "alt": "Turner's impressionistic oil painting of a steam locomotive rushing across a bridge through rain and golden mist.",
          "credit": "J.M.W. Turner, Rain, Steam and Speed - The Great Western Railway (1844), The National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "An Experiment on a Bird in the Air Pump",
        "excerpt": "By candlelight a natural philosopher suspends a white cockatoo in a glass globe, pumping out its air as an audience watches life ebb toward death. Wonder, dread and cold curiosity share the circle of faces, dramatizing the moment when human beings realized they could command the very forces of life. Wright renders scientific mastery as a spectacle poised between awe and cruelty.",
        "source": "Joseph Wright of Derby, \"An Experiment on a Bird in the Air Pump,\" 1768, oil on canvas, The National Gallery, London (NG725).",
        "href": "https://commons.wikimedia.org/wiki/File:An_Experiment_on_a_Bird_in_an_Air_Pump_by_Joseph_Wright_of_Derby,_1768.jpg",
        "image": {
          "src": "/covers/nextera-brookfield-kentucky-data-center-paducah--a5.png",
          "alt": "Candlelit 18th-century scene of a scientist demonstrating a vacuum pump on a bird in a glass flask before an absorbed audience.",
          "credit": "Joseph Wright of Derby, An Experiment on a Bird in the Air Pump (1768), The National Gallery, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 17
  },
  {
    "slug": "drone-strikes-gas-tanker-egypt-damietta",
    "headline": "A drone strikes a U.S.-owned gas tanker at Egypt's Mediterranean port of Damietta, igniting a fire that spreads to a second vessel",
    "overview": "A drone hit the floating gas-storage tanker Energos Winter at Egypt's Mediterranean port of Damietta, sparking a fire that spread to a second vessel before crews brought it under control and evacuated, the maritime-security firm Ambrey said. No one claimed responsibility, and security sources warned the strike could signal a widening of the Middle East conflict into vital shipping and energy infrastructure.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxPM3F5LWg3Mm9rYmlhejJpdzJqQW9SWnU1WHJRVm9iZ1p0TUpmRTR6Mk1JYXVUekU2c1VlTHI5bV9DbzIyejlvYU13Y2cxYU12WExOYzJoVmxsVzVoc2hiWkQ2ZWFUZ0EwZHBZZlZ1UnREZjZGc243TlQtMXVKcDQ5bUpEaDR2Tmo5eTJkdlJhSXMtZ0U2cnk0OWNLLU50YlBjbnZrei1FVm9CYWw5cUE?oc=5"
      },
      {
        "name": "Al Arabiya",
        "href": "https://english.alarabiya.net/News/middle-east/2026/07/29/drone-hits-gas-storage-tanker-at-egypt-s-mediterranean-port-of-damietta"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/drone-strikes-gas-tanker-egypt-damietta.png",
      "alt": "A liquefied-gas carrier of the kind used as a floating storage tanker",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The fire-ship loosed on the Athenian fleet at Syracuse",
        "excerpt": "The rest the enemy tried to burn by means of an old merchantman which they filled with faggots and pine-wood, set on fire, and let drift down the wind which blew full on the Athenians.",
        "source": "Thucydides, History of the Peloponnesian War, Book VII, ch. 53, trans. Richard Crawley (413 BC; London, 1874), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt"
      },
      {
        "category": "historical",
        "title": "The C.S.S. Sumter burns the merchant bark Golden Rocket",
        "excerpt": "The boarding officer, to do his work more effectually, had applied the torch simultaneously in three places, the cabin, the mainhold, and the forecastle; and now the devouring flames rushed up these three apertures, with a fury which nothing could resist.",
        "source": "Raphael Semmes, Memoirs of Service Afloat, During the War Between the States (Baltimore: Kelly, Piet & Co., 1869), on the burning of his first prize, the bark Golden Rocket, July 1861, via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/34827/pg34827.txt"
      },
      {
        "category": "literary",
        "title": "The Trojan women set fire to Aeneas's fleet",
        "excerpt": "Then, what they hear, is witness’d by their eyes: A storm of sparkles and of flames arise.",
        "source": "Virgil, The Aeneid, Book V, trans. John Dryden (London, 1697), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt"
      },
      {
        "category": "literary",
        "title": "The coal cargo of the Judea catches fire at sea",
        "excerpt": "I gave one sniff, and put down the lid gently. It was no use choking myself. The cargo was on fire.",
        "source": "Joseph Conrad, \"Youth: A Narrative\" (1898; collected 1902), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/525/525-h/525-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Destruction of 'L'Orient' at the Battle of the Nile",
        "excerpt": "Night detonates into daylight as the 120-gun French flagship L'Orient blows apart, flinging spars and rigging across a sky of orange smoke. The neighbouring ships-of-the-line are caught in the glare, their hulls lit by a fire that has already leapt from one vessel to the next. Arnald freezes the instant when a single burning ship turns an entire fleet into a theatre of catastrophe.",
        "source": "George Arnald, \"The Destruction of 'L'Orient' at the Battle of the Nile, 1 August 1798\" (c. 1825–1827), oil on canvas, National Maritime Museum, Greenwich (BHC0509).",
        "href": "https://commons.wikimedia.org/wiki/File:The_Battle_of_the_Nile.jpg",
        "image": {
          "src": "/covers/drone-strikes-gas-tanker-egypt-damietta--a4.png",
          "alt": "Oil painting of the French flagship L'Orient exploding in flames at night during the Battle of the Nile, its blast lighting the surrounding warships and billowing smoke.",
          "credit": "George Arnald, 'The Destruction of L'Orient at the Battle of the Nile, 1 August 1798' (c. 1825–27), National Maritime Museum, Greenwich. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Overture to Der fliegende Holländer (The Flying Dutchman)",
        "excerpt": "The overture opens in horns and strings with a howling open-fifth storm motif, the sound of a sea lashed into violence. Brass and tremolo waves surge and break as the cursed ship is driven on through the gale. It is music of pure maritime dread, a vessel and its crew delivered up to forces far larger than themselves.",
        "source": "Richard Wagner, Overture to Der fliegende Holländer (The Flying Dutchman), WWV 63 (composed 1841; premiered Dresden, 1843), full score via IMSLP.",
        "href": "https://imslp.org/wiki/Der_fliegende_Holländer,_WWV_63_(Wagner,_Richard)",
        "image": {
          "src": "/covers/drone-strikes-gas-tanker-egypt-damietta--a5.png",
          "alt": "Photographic portrait of the composer Richard Wagner, taken in 1871.",
          "credit": "Franz Hanfstaengl, portrait of Richard Wagner, 1871. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 18
  },
  {
    "slug": "mammoth-remains-danube-record-low",
    "headline": "Mammoth remains emerge on the banks of the Danube in Bulgaria after the river falls to a record low",
    "overview": "The jaw, tusks and a possible rib of an ancient mammoth were revealed near the village of Ryahovo in northern Bulgaria after the Danube receded to record-low levels following a summer of prolonged heatwaves and drought across Europe. A local resident spotted the bones and alerted the regional history museum in Ruse, whose experts prepared to excavate them.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiywFBVV95cUxOa1c4MHcyT2tOTlJWLTlZcTIyT3NkdU1iY0pveFFKZ0h3OGxlQl9EeFpoaG1DMFZvZm5mUHdvbHR0bjdNV0xrSkxQUHBqdER5bkhuTTFIRGZqbFRJT3RaQnlJeE95WUxFWkdrc013eTVSRllNOFZCMl8zNDc0em9QZ2hiV2dNZGZjTGpzcXRaRjJ5WXVNOGUycGJERlp1cTJwNndzS1FfelNvNVBHSFRoMk9TTTZpMml3c3RTR2VTdlBPSUpBN2pKU0JmWQ?oc=5"
      },
      {
        "name": "Asharq Al-Awsat",
        "href": "https://english.aawsat.com/varieties/5301382-mammoth-remains-revealed-bulgaria-after-danube-water-levels-hit-record-low"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/mammoth-remains-danube-record-low.png",
      "alt": "A life-size reconstruction of a woolly mammoth",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Augustus and the \"bones of giants\" at Capri",
        "excerpt": "Those of his own, which were far from being spacious, he adorned, not so much with statues and pictures, as with walks and groves, and things which were curious either for their antiquity or rarity; such as, at Capri, the huge limbs of sea-monsters and wild beasts, which some affect to call the bones of giants; and also the arms of ancient heroes.",
        "source": "Suetonius, The Lives of the Twelve Caesars, \"The Life of Augustus,\" ch. 72 (trans. Alexander Thomson, rev. T. Forester), 1st–2nd century AD.",
        "href": "https://en.wikisource.org/wiki/The_Lives_of_the_Twelve_Caesars/Augustus"
      },
      {
        "category": "historical",
        "title": "Cuvier proves a world of vanished beasts",
        "excerpt": "their very races have been extinguished for ever, and have left no other memorial of their existence than some fragments, which the naturalist can scarcely recognize.",
        "source": "Georges Cuvier, Essay on the Theory of the Earth (trans. Robert Kerr, with Prof. Jameson's notes), 5th ed., Edinburgh, 1827.",
        "href": "https://www.gutenberg.org/files/62918/62918-h/62918-h.htm"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains.",
        "source": "Percy Bysshe Shelley, \"Ozymandias\" (1818), in The Complete Poetical Works of Percy Bysshe Shelley, ed. Thomas Hutchinson, Oxford University Press, 1914.",
        "href": "https://en.wikisource.org/wiki/The_Complete_Poetical_Works_of_Percy_Bysshe_Shelley_(ed._Hutchinson,_1914)/Ozymandias"
      },
      {
        "category": "literary",
        "title": "Hydriotaphia, Urn Burial",
        "excerpt": "But who were the proprietaries of these bones, or what bodies these ashes made up, were a question above antiquarism; not to be resolved by man, nor easily perhaps by spirits, except we consult the provincial guardians, or tutelary observators.",
        "source": "Sir Thomas Browne, \"Hydriotaphia, Urn-Burial\" (1658), in Religio Medici, Hydriotaphia, and the Letter to a Friend.",
        "href": "https://www.gutenberg.org/files/586/586-h/586-h.htm"
      },
      {
        "category": "artistic",
        "title": "Woolly Mammoths (Charles R. Knight)",
        "excerpt": "Shaggy giants trudge across a frozen steppe, their long curved tusks lifted against a pale northern light. Knight paints the mammoth not as a monster but as a living creature, restoring breath and muscle to bones that had lain hidden in the earth for a hundred thousand years.",
        "source": "Charles R. Knight, \"Woolly Mammoths and Rhinoceros\" (c. 1929), painting, The Field Museum, Chicago.",
        "href": "https://commons.wikimedia.org/wiki/File:Woolly_mammoths_by_Knight.jpg",
        "image": {
          "src": "/covers/mammoth-remains-danube-record-low--a4.png",
          "alt": "Painting of woolly mammoths with long curved tusks crossing a cold Pleistocene steppe under a pale sky.",
          "credit": "Charles R. Knight, \"Woolly Mammoths and Rhinoceros\" (c. 1929), The Field Museum. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "\"Fossils,\" from The Carnival of the Animals",
        "excerpt": "A xylophone clatters like dry bones shaken suddenly awake, rattling out the very skeleton-dance tune Saint-Saëns had once written for Death himself. Beneath the wit lies a colder thought about deep time: whatever now walks the earth will one day lie still in the museum drawer, waiting to be found.",
        "source": "Camille Saint-Saëns, \"Fossiles,\" from Le carnaval des animaux (1886), full score. Score on IMSLP.",
        "href": "https://imslp.org/wiki/Le_carnaval_des_animaux_(Saint-Sa%C3%ABns,_Camille)",
        "image": {
          "src": "/covers/mammoth-remains-danube-record-low--a5.png",
          "alt": "Photographic portrait of the composer Camille Saint-Saëns, taken in 1900.",
          "credit": "Camille Saint-Saëns, photographed by Pierre Petit, 1900 (Gallica). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 19
  },
  {
    "slug": "bts-withdraw-2027-grammys",
    "headline": "BTS say they will not submit their music for the 2027 Grammy Awards",
    "overview": "All seven members of the South Korean pop group BTS announced they would not submit their music for consideration at the 2027 Grammy Awards, a public snub of the Recording Academy that came a month after the Grammys introduced a new award category for Asian pop. Despite record-breaking global success, BTS have never won a competitive Grammy, and their withdrawal reignited debate over the awards' treatment of non-Western artists.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiggFBVV95cUxORGVjOTNSdXA3bVZGYjJTQ2t2WXBtY0h0QlVHUnkyTk90aHdrbEdxekJGQ3pveDBaVDVZdEV4TVFsSUluSTloOGswMU1CTEtnNEl6cE41b1hTN2ZYQ1NxVXdvQ3JrSkFHdlFlSXZ6dkFic3NualJidnNWMUdWTVo2dnh3?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/clyjgyd0225o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/bts-withdraw-2027-grammys.png",
      "alt": "The South Korean pop group BTS performing on stage",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Caesar refuses the diadem at the Lupercalia (44 BC)",
        "excerpt": "Antony was running with the rest; but, omitting the old ceremony, twining a garland of bay round a diadem, he ran up to the Rostra, and, being lifted up by his companions, would have put it upon the head of Caesar, as if by that ceremony he were declared king. Caesar seemingly refused, and drew aside to avoid it, and was applauded by the people with great shouts. Again Antony pressed it, and again he declined its acceptance.",
        "source": "Plutarch, \"Life of Antony,\" in Plutarch's Lives, trans. John Dryden, rev. Arthur Hugh Clough",
        "href": "https://en.wikisource.org/wiki/Plutarch%27s_Lives_(Clough)/Life_of_Antony"
      },
      {
        "category": "historical",
        "title": "Rousseau declines a pension from Louis XV (1752)",
        "excerpt": "I lost, it is true, the pension which in some measure was offered me; but I at the same time exempted myself from the yoke it would have imposed. Adieu, truth, liberty, and courage! How should I afterwards have dared to speak of disinterestedness and independence?",
        "source": "Jean-Jacques Rousseau, The Confessions of Jean Jacques Rousseau, Book VIII (Aldus edition)",
        "href": "https://en.wikisource.org/wiki/The_Confessions_of_Jean_Jacques_Rousseau_(Aldus)/Book_VIII"
      },
      {
        "category": "literary",
        "title": "Bartleby's \"I would prefer not to\"",
        "excerpt": "Imagine my surprise, nay, my consternation, when without moving from his privacy, Bartleby in a singularly mild, firm voice, replied, “I would prefer not to.” I sat awhile in perfect silence, rallying my stunned faculties.",
        "source": "Herman Melville, \"Bartleby, the Scrivener: A Story of Wall-Street\" (1853)",
        "href": "https://www.gutenberg.org/files/11231/11231-h/11231-h.htm"
      },
      {
        "category": "literary",
        "title": "Antigone defies Creon's edict",
        "excerpt": "Yea, for these laws were not ordained of Zeus, And she who sits enthroned with gods below, Justice, enacted not these human laws. Nor did I deem that thou, a mortal man, Could’st by a breath annul and override The immutable unwritten laws of Heaven.",
        "source": "Sophocles, Antigone, trans. Francis Storr, in Plays of Sophocles (Oedipus the King; Oedipus at Colonus; Antigone)",
        "href": "https://www.gutenberg.org/files/31/31-h/31-h.htm"
      },
      {
        "category": "artistic",
        "title": "Le Déjeuner sur l'herbe (Luncheon on the Grass)",
        "excerpt": "Rejected by the jury of the official Paris Salon, Manet's brazen picnic scene became the scandal of the breakaway Salon des Refusés, where spurned painters mounted their own show rather than bow to the academy. A nude woman stares out unabashed beside two clothed gentlemen, flouting every convention the establishment prized. What the gatekeepers dismissed as an affront the public could not stop discussing, and the snubbed canvas outlived the institution that turned it away.",
        "source": "Édouard Manet, Le Déjeuner sur l'herbe, 1863, oil on canvas, Musée d'Orsay, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:%C3%89douard_Manet_-_Le_D%C3%A9jeuner_sur_l%27herbe.jpg",
        "image": {
          "src": "/covers/bts-withdraw-2027-grammys--a4.png",
          "alt": "Manet's painting of two clothed men and a nude woman seated on the grass in a wooded glade, with a second lightly dressed woman bathing behind them.",
          "credit": "Édouard Manet, Le Déjeuner sur l'herbe (1863), Musée d'Orsay; public domain, via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Symphony No. 3 \"Eroica\" — the erased dedication",
        "excerpt": "Beethoven had dedicated his revolutionary Third Symphony to Napoleon Bonaparte, hero of the republic. On learning that Napoleon had crowned himself Emperor, the composer scratched the name from the title page so furiously that he tore through the paper. The music kept its defiant grandeur while shedding the honor it had been meant to confer, a work that refused to serve the power it once saluted.",
        "source": "Ludwig van Beethoven, Symphony No. 3 in E-flat major, Op. 55 (\"Eroica\"), 1804; full score, IMSLP",
        "href": "https://imslp.org/wiki/Symphony_No.3,_Op.55_(Beethoven,_Ludwig_van)",
        "image": {
          "src": "/covers/bts-withdraw-2027-grammys--a5.png",
          "alt": "Title page of Beethoven's Third Symphony showing the dedication to Bonaparte violently scratched out, leaving a hole rubbed through the paper.",
          "credit": "Title page of Beethoven's Symphony No. 3, Op. 55, with the erased dedication to Napoleon; public domain, via Wikimedia Commons"
        }
      }
    ],
    "rank": 20
  },
  {
    "slug": "simone-forti-postmodern-dance-dies-91",
    "headline": "Simone Forti, a pioneer of postmodern dance whose 'Dance Constructions' reshaped movement art, dies at 91",
    "overview": "Simone Forti, the Italian-born American artist and choreographer whose 1960s 'Dance Constructions' - spare, improvisatory works built around everyday tasks and objects - helped launch the Judson Dance Theater revolution and were later acquired by the Museum of Modern Art, has died at 91 in Los Angeles. Her decades of work fused movement, speech and nature, influencing generations of dancers.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/simone-forti-pioneer-of-postmodern-dance-dead-at-91-1234755909/"
      },
      {
        "name": "MoMA",
        "href": "https://www.moma.org/artists/34908"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/simone-forti-postmodern-dance-dies-91.png",
      "alt": "The choreographer and dancer Simone Forti",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lucian defends dance as the oldest and noblest of the arts",
        "excerpt": "The best antiquarians, let me tell you, trace dancing back to the creation of the universe; it is coeval with that Eros who was the beginning of all things.",
        "source": "Lucian of Samosata, \"Of Pantomime\" (De Saltatione, c. 2nd century AD), in The Works of Lucian of Samosata, trans. H. W. Fowler and F. G. Fowler, vol. II (Oxford: Clarendon Press, 1905).",
        "href": "https://archive.org/details/worksoflucianofs02luciuoft"
      },
      {
        "category": "historical",
        "title": "Isadora Duncan's barefoot revolt against classical ballet",
        "excerpt": "The noblest in art is the nude. This truth is recognized by all, and followed by painters, sculptors and poets; only the dancer has forgotten it, who should most remember it, as the instrument of her art is the human body itself.",
        "source": "Isadora Duncan, \"The Dance of the Future\" (1903), in The Art of the Dance (New York: Theatre Arts, Inc., 1928).",
        "href": "https://archive.org/details/duncan-art-of-dance"
      },
      {
        "category": "literary",
        "title": "W. B. Yeats, \"Among School Children\"",
        "excerpt": "O chestnut tree, great rooted blossomer, / Are you the leaf, the blossom or the bole? / O body swayed to music, O brightening glance, / How can we know the dancer from the dance?",
        "source": "W. B. Yeats, \"Among School Children,\" in The Tower (London: Macmillan, 1928), stanza VIII.",
        "href": "https://en.wikisource.org/wiki/The_Tower_(Yeats)/Among_School_Children"
      },
      {
        "category": "literary",
        "title": "Nietzsche's \"dancing star\" in Thus Spake Zarathustra",
        "excerpt": "I tell you: one must still have chaos in one, to give birth to a dancing star. I tell you: ye have still chaos in you.",
        "source": "Friedrich Nietzsche, Thus Spake Zarathustra, trans. Thomas Common; Zarathustra's Prologue, section 5.",
        "href": "https://www.gutenberg.org/files/1998/1998-h/1998-h.htm"
      },
      {
        "category": "artistic",
        "title": "Edgar Degas, The Dance Class",
        "excerpt": "Two dozen young ballerinas cluster in a bare rehearsal room, one scratching her back, another fussing with a sash, while the aging ballet master Jules Perrot leans on his long stick. Degas fixes on dance in its unglamorous in-between moments, the waiting and the fidgeting, finding the ordinary labor beneath the polished art.",
        "source": "Edgar Degas, The Dance Class (La Classe de danse), 1874, oil on canvas, The Metropolitan Museum of Art, New York (bequest of Mrs. Harry Payne Bingham, 1986).",
        "href": "https://www.metmuseum.org/art/collection/search/438817",
        "image": {
          "src": "/covers/simone-forti-postmodern-dance-dies-91--a4.png",
          "alt": "Young ballet dancers gathered in a rehearsal room, some resting or adjusting their costumes, while a ballet master watches with a walking stick.",
          "credit": "Edgar Degas, The Dance Class (1874), The Metropolitan Museum of Art. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Igor Stravinsky, The Rite of Spring (Le Sacre du printemps)",
        "excerpt": "Stridently dissonant chords pound in lurching, irregular rhythms as an imagined pagan tribe dances a chosen maiden to her death. At its 1913 Paris premiere the music and Nijinsky's convulsive choreography ignited a near-riot, and in the uproar rewrote what movement set to sound could be.",
        "source": "Igor Stravinsky, The Rite of Spring (Le Sacre du printemps), full orchestral score, 1913 (rev. editions), K015.",
        "href": "https://imslp.org/wiki/The_Rite_of_Spring,_K015_(Stravinsky,_Igor)",
        "image": {
          "src": "/covers/simone-forti-postmodern-dance-dies-91--a5.png",
          "alt": "Painted scenery sketch of a rolling, hilly pagan landscape designed for the ballet The Rite of Spring.",
          "credit": "Nicholas Roerich, scenery design for The Rite of Spring (1912). Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 21
  },
  {
    "slug": "ghana-nationwide-blackout-grid",
    "headline": "Ghana suffers a nationwide blackout after a grid disturbance trips power plants",
    "overview": "A pre-dawn 'system disturbance' on Ghana's national transmission grid tripped several generating plants at once, plunging the capital Accra, the commercial hub Kumasi and much of the country into darkness and knocking out water-treatment plants. The grid operator GRIDCo launched an investigation and raced to restore power, in the latest bout of the chronic outages Ghanaians call 'dumsor.'",
    "genre": "Economy",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/crmrkgr4z0jo"
      },
      {
        "name": "Graphic Online",
        "href": "https://www.graphic.com.gh/news/general-news/gridco-on-why-there-is-nationwide-electric-power-outage-in-ghana.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/ghana-nationwide-blackout-grid.png",
      "alt": "The skyline of Accra, Ghana, at night",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The eclipse that halted the Battle of the Halys (585 BC)",
        "excerpt": "...another combat took place in the sixth year, in the course of which, just as the battle was growing warm, day was on a sudden changed into night. This event had been foretold by Thales, the Milesian, who forewarned the Ionians of it, fixing for it the very year in which it actually took place. The Medes and Lydians, when they observed the change, ceased fighting, and were alike anxious to have terms of peace agreed on.",
        "source": "Herodotus, The Histories, Book I.74, trans. George Rawlinson (1858-60), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_1"
      },
      {
        "category": "historical",
        "title": "Edison switches on the Pearl Street station and lights lower Manhattan (September 4, 1882)",
        "excerpt": "On Monday, September 4, 1882, at 3 o'clock, P.M., Edison realized the consummation of his broad and original scheme. The Pearl Street station was officially started by admitting steam to the engine of one of the \"Jumbos,\" current was generated, turned into the network of underground conductors, and was transformed into light by the incandescent lamps that had thus far been installed.",
        "source": "Frank Lewis Dyer and Thomas Commerford Martin, Edison: His Life and Inventions (New York and London: Harper & Brothers, 1910), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/820/820-h/820-h.htm"
      },
      {
        "category": "literary",
        "title": "Lord Byron, \"Darkness\" (1816)",
        "excerpt": "I had a dream, which was not all a dream. / The bright sun was extinguished, and the stars / Did wander darkling in the eternal space, / Rayless, and pathless, and the icy Earth / Swung blind and blackening in the moonless air;",
        "source": "Lord Byron, \"Darkness\" (1816), in The Works of Lord Byron, ed. E. H. Coleridge, Vol. 4 (London: John Murray, 1905), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Lord_Byron_(ed._Coleridge,_Prothero)/Poetry/Volume_4/Darkness"
      },
      {
        "category": "literary",
        "title": "John Milton, Paradise Lost, Book I - \"darkness visible\" (1667)",
        "excerpt": "A dungeon horrible, on all sides round, / As one great furnace flamed; yet from those flames / No light; but rather darkness visible / Served only to discover sights of woe,",
        "source": "John Milton, Paradise Lost, Book I, lines 61-64 (1667), via Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt"
      },
      {
        "category": "artistic",
        "title": "Georges de La Tour, The Penitent Magdalen (ca. 1640)",
        "excerpt": "A single candle flame is the only power left in the room, and it rules everything it touches. The Magdalen sits utterly still before it, one hand resting on a skull, her face and the mirror lit gold while the rest of the world collapses into black. La Tour makes darkness the true subject and lets one small light decide what can be seen at all.",
        "source": "Georges de La Tour, The Penitent Magdalen (Madeleine aux deux flammes), oil on canvas, ca. 1640. The Metropolitan Museum of Art, New York, accession no. 1978.517 (Gift of Mr. and Mrs. Charles Wrightsman, 1978).",
        "href": "https://commons.wikimedia.org/wiki/File:The_Penitent_Magdalen_MET_DT7252.jpg",
        "image": {
          "src": "/covers/ghana-nationwide-blackout-grid--a4.png",
          "alt": "A young woman in candlelight rests her chin on one hand and gazes toward a flame; a skull sits in her lap on an open book, while most of the room dissolves into darkness.",
          "credit": "Georges de La Tour, The Penitent Magdalen, ca. 1640. The Metropolitan Museum of Art, New York (Gift of Mr. and Mrs. Charles Wrightsman, 1978). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Joseph Haydn, Die Schöpfung (The Creation) - \"The Representation of Chaos\" to the blaze of light (1798)",
        "excerpt": "Die Vorstellung des Chaos (The Representation of Chaos). ... Im Anfange schuf Gott Himmel und Erde (In the beginning God created the heaven and the earth).",
        "source": "Joseph Haydn, Die Schöpfung (The Creation), Hob. XXI:2, oratorio, first performed 1798; full and vocal scores via the IMSLP / Petrucci Music Library.",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/ghana-nationwide-blackout-grid--a5.png",
          "alt": "Portrait of the composer Joseph Haydn, seated in a dark coat against a plain background, painted by Thomas Hardy in 1791.",
          "credit": "Thomas Hardy, portrait of Joseph Haydn, 1791. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 22
  },
  {
    "slug": "fed-holds-rates-steady-dissent",
    "headline": "The Federal Reserve holds interest rates steady as three policymakers dissent in favor of a rate increase",
    "overview": "The U.S. Federal Reserve left its benchmark interest rate unchanged, holding a cautious line even as three of its policymakers dissented in favor of a hike, an unusually large split that underscored deep disagreement over inflation risks. Stocks fell and gold rose as investors parsed the decision and the central bank's guidance.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxPcTZRdS1qU1NyM2NYeEoyTVBCdUFERzRDa3ZmelhwYkstWUNlMkc3S2tsUXRHcnhOUnAzMDdHXzY3TXdWa3JFbTE4TWZBeEJBSlRWSWFzSnZxX1VBVTE4ZklGV1JJSlJVTXNyN2VJMV9WWWJ0alNfeFZMZWNYTnJrVUk1SG5rczF0ekk1NXhRZFZQSE40RGx2UGROWlE1YVR3aWZUaVRxbw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxOYmpPZkdUdEJHY2hvRUZxbzItX3lCN3IxR0o0V3dXQnJoYi1xakZBT2xzVFVIZjdnVGZya2pFWDRUb0k1NUpWTjZyYnoyUWJNNzJLekRZcDNNeXhZcXpOeGdnenVPZGtVMlY4Wll5YUVSQklMYktHb0FYckJ5ZkNRajZOT0V6M2hjeUJTMVhZbHoyZlRJcnZxZ1ZyeFlCNzVKU29ETFFFc3o?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/fed-holds-rates-steady-dissent.png",
      "alt": "The Marriner S. Eccles Federal Reserve Board Building in Washington",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Andrew Jackson's Veto of the Bank of the United States",
        "excerpt": "It is to be regretted that the rich and powerful too often bend the acts of government to their selfish purposes.",
        "source": "Andrew Jackson, Veto Message Regarding the Bank of the United States, July 10, 1832.",
        "href": "https://avalon.law.yale.edu/19th_century/ajveto01.asp"
      },
      {
        "category": "historical",
        "title": "William Jennings Bryan's \"Cross of Gold\" Speech",
        "excerpt": "You shall not press down upon the brow of labor this crown of thorns, you shall not crucify mankind upon a cross of gold.",
        "source": "William Jennings Bryan, \"Cross of Gold\" Speech, Democratic National Convention, Chicago, July 9, 1896.",
        "href": "https://en.wikisource.org/wiki/Cross_of_Gold_Speech"
      },
      {
        "category": "literary",
        "title": "The Ants and the Grasshopper",
        "excerpt": "The Ants inquired of him, \"Why did you not treasure up food during the summer?\" He replied, \"I had not leisure enough. I passed the days in singing.\" They then said in derision: \"If you were foolish enough to sing all the summer, you must dance supperless to bed in the winter.\"",
        "source": "Aesop, \"The Ants and the Grasshopper,\" in Aesop's Fables, trans. George Fyler Townsend (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/21/21-h/21-h.htm"
      },
      {
        "category": "literary",
        "title": "The Merchant of Venice (Antonio on lending and barren metal)",
        "excerpt": "If thou wilt lend this money, lend it not As to thy friends, for when did friendship take A breed for barren metal of his friend?",
        "source": "William Shakespeare, The Merchant of Venice, Act I, Scene III (Project Gutenberg).",
        "href": "https://www.gutenberg.org/files/1515/1515-h/1515-h.htm"
      },
      {
        "category": "artistic",
        "title": "Woman Holding a Balance",
        "excerpt": "A woman stands in a hushed, light-filled room, holding an empty balance and waiting for it to come to rest. Pearls and gold lie scattered before her, yet her attention is on the perfect equilibrium of the scales, a quiet meditation on judgment, measure, and the weighing of worth against the reckoning depicted on the wall behind her.",
        "source": "Johannes Vermeer, Woman Holding a Balance, c. 1664, oil on canvas, National Gallery of Art, Washington, D.C. (accession 1942.9.97).",
        "href": "https://commons.wikimedia.org/wiki/File:Johannes_Vermeer_-_Woman_Holding_a_Balance_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/fed-holds-rates-steady-dissent--a4.png",
          "alt": "A woman in a blue jacket stands at a table in soft window light, delicately holding an empty balance scale, with pearls and gold before her.",
          "credit": "Johannes Vermeer, Woman Holding a Balance, c. 1664, National Gallery of Art, Washington, D.C.; public domain via Wikimedia Commons (Google Art Project)."
        }
      },
      {
        "category": "artistic",
        "title": "The Moneylender and His Wife",
        "excerpt": "A moneylender weighs coins and pearls on a small balance while his wife, a devotional book open in her hands, turns her gaze from scripture to the glinting gold on the table. A convex mirror in the foreground reflects a man reading by a window, and the whole scene poses a sober question about where value truly lies and the pull between prudence and profit.",
        "source": "Quentin Matsys, The Moneylender and His Wife, 1514, oil on panel, Musée du Louvre, Paris (INV 1444).",
        "href": "https://commons.wikimedia.org/wiki/File:Quentin_Massys_001.jpg",
        "image": {
          "src": "/covers/fed-holds-rates-steady-dissent--a5.png",
          "alt": "A Renaissance couple at a table; the husband weighs gold coins on a balance while his wife pauses over an illuminated prayer book.",
          "credit": "Quentin Matsys, The Moneylender and His Wife, 1514, Musée du Louvre, Paris; public domain via Wikimedia Commons (The Yorck Project)."
        }
      }
    ],
    "rank": 23
  },
  {
    "slug": "trump-dulles-airport-22-billion-plan",
    "headline": "Trump unveils a $22 billion plan to rebuild Washington's Dulles airport with four new concourses",
    "overview": "President Trump announced a roughly $22 billion plan to remake Washington Dulles International Airport, adding four new concourses, an extended underground train and a vast new parking garage while scrapping the airport's aging 'mobile lounge' people-movers. The project, to be funded partly by taxpayers and partly by the airlines, is pitched as a monument befitting the nation's capital and a fix for a long-criticized gateway.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxOZXhHaHYtMVE2OUdfRHZTUlhoTnpFNHZ6TXBKdV9IVjRYVklkNHJZYVpsWUJEdHpfeFpZNkZNX3plYmFWaVU1a3haQmEwcWV5Vjh4NGlvcEVnTEhqdTl4VkdsZnI2NXpMaFQzLUJSaUNpX2RmY0t5dzNjZ2VXeEhKZUZMcmJ4dmxvU3NOUGRnc2JYdFJFMTVaSXNrWHM0Y0ZFWlBXNkVuVzNrdw?oc=5"
      },
      {
        "name": "U.S. News",
        "href": "https://www.usnews.com/news/us/articles/2026-07-29/trump-to-unveil-22-billion-plan-to-remake-washington-dulles-airport"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/trump-dulles-airport-22-billion-plan.png",
      "alt": "The Eero Saarinen main terminal at Washington Dulles International Airport",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Augustus leaves Rome a city of marble",
        "excerpt": "The city, which was not built in a manner suitable to the grandeur of the empire, and was liable to inundations of the Tiber, as well as to fires, was so much improved under his administration, that he boasted, not without reason, that he \"found it of brick, but left it of marble.\"",
        "source": "Suetonius, The Lives of the Twelve Caesars, \"The Life of Augustus,\" ch. 29 (trans. Alexander Thomson), Perseus Digital Library",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0132%3Alife%3Daug.%3Achapter%3D29"
      },
      {
        "category": "historical",
        "title": "Cheops conscripts all Egypt to raise the Great Pyramid",
        "excerpt": "Cheops became king over them and brought them to every kind of evil: for he shut up all the temples, and having first kept them from sacrifices there, he then bade all the Egyptians work for him.",
        "source": "Herodotus, An Account of Egypt (Histories, Book II, sec. 124), trans. G. C. Macaulay, Project Gutenberg",
        "href": "https://www.gutenberg.org/files/2131/2131-h/2131-h.htm"
      },
      {
        "category": "literary",
        "title": "The Tower of Babel",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.",
        "source": "Genesis 11:4, The Holy Bible, King James Version (1611), Project Gutenberg",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt"
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "And on the pedestal these words appear: \"My name is Ozymandias, King of Kings.\" Look on my works ye Mighty, and despair! No thing beside remains.",
        "source": "Percy Bysshe Shelley, \"Ozymandias,\" first published in The Examiner, 11 January 1818, Wikisource",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias"
      },
      {
        "category": "artistic",
        "title": "Rain, Steam and Speed – The Great Western Railway",
        "excerpt": "A black locomotive bursts out of a squall of rain and golden mist, hurtling across Brunel's new Maidenhead bridge toward the viewer. Turner turns raw industrial power into a sublime spectacle, the machine sharper and darker than the dissolving landscape around it. It is the age's monument to speed and engineering, rendered as awe rather than mere transport.",
        "source": "J. M. W. Turner, Rain, Steam and Speed – The Great Western Railway, 1844, oil on canvas, The National Gallery, London (NG538)",
        "href": "https://www.nationalgallery.org.uk/paintings/joseph-mallord-william-turner-rain-steam-and-speed-the-great-western-railway",
        "image": {
          "src": "/covers/trump-dulles-airport-22-billion-plan--a4.png",
          "alt": "Turner's painting of a dark steam locomotive rushing across a railway bridge through rain and glowing mist.",
          "credit": "J. M. W. Turner, Rain, Steam and Speed – The Great Western Railway (1844), The National Gallery, London; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Triumphal March from Aida",
        "excerpt": "Blazing trumpets announce a victorious army parading before the throne, pageantry engineered to overwhelm. Verdi's march is the sound of an empire staging its own grandeur, ceremony scaled up until spectacle becomes the message. Few works so frankly celebrate power expressed through sheer monumental display.",
        "source": "Giuseppe Verdi, Aïda (1871), Act II \"Triumphal Scene\" (Grand March), full orchestral score, IMSLP / Petrucci Music Library",
        "href": "https://imslp.org/wiki/A%C3%AFda_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/trump-dulles-airport-22-billion-plan--a5.png",
          "alt": "Ornate 1872 printed poster advertising a production of Verdi's opera Aida in Parma.",
          "credit": "Poster for Aida, Parma, 1872 (author unknown); via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 24
  },
  {
    "slug": "israeli-settlers-syria-outpost",
    "headline": "A fringe Israeli settler group repeatedly slips into Syria to try to claim land for a Jewish outpost",
    "overview": "A small right-wing Israeli group calling itself the Bashan Pioneers - named for the biblical region of Bashan that spans part of modern Syria - has been crossing the border every few days in a fringe campaign to establish a Jewish outpost in southern Syria near the Israeli-held Golan Heights. Their brief incursions have so far been broken up by Israel's own military before anything could be built.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqAFBVV95cUxQTndXODBoWHFqNjZlamRBMnljd0tDODNYZEhiQzRpcEdhSmE1YmtyUThRV0Zvd3NkUDBWS0FYNjhFdFRFWjVvTm9MNTMweGVHSTFfbHNNcnhFbW5IcEZWYXBXeGZETkZhRkg4Ylo2NWo4WjVXQ3gwbWx2UUJWZUE1R0R3NDdkeFRUbGNOZ3JJTlVlajBkUGExTXRlVDZLOHJIREpLMEgwaXg?oc=5"
      },
      {
        "name": "Times of Israel",
        "href": "https://www.timesofisrael.com/fringe-settler-group-sneaking-into-syria-in-bid-to-claim-land-for-jewish-outpost/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/israeli-settlers-syria-outpost.png",
      "alt": "The landscape of the Golan Heights, with the Sea of Galilee in the distance",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Conquest of Bashan and the Defeat of King Og",
        "excerpt": "So the LORD our God delivered into our hands Og also, the king of Bashan, and all his people: and we smote him until none was left to him remaining. And we took all his cities at that time, there was not a city which we took not from them, threescore cities, all the region of Argob, the kingdom of Og in Bashan.",
        "source": "Deuteronomy 3:3-6, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Deuteronomy"
      },
      {
        "category": "historical",
        "title": "The Homestead Act and the Rush to Claim the Western Frontier",
        "excerpt": "That any person who is the head of a family, or who has arrived at the age of twenty-one years, and is a citizen of the United States",
        "source": "Homestead Act, 12 Stat. 392 (May 20, 1862), Section 1. The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/19th_century/homestead_act.asp"
      },
      {
        "category": "literary",
        "title": "Aeneas, Fated to Win a New Land by War",
        "excerpt": "Arms, and the Man I sing, who forc'd by Fate, And haughty Juno's unrelenting Hate; Expell'd and exil'd, left the Trojan Shoar: Long Labours, both by Sea and Land he bore And in the doubtful War, before he won The Latian Realm, and built the destin'd Town: His banish'd Gods restor'd to Rites Divine, And setl'd sure Succession in his Line.",
        "source": "Virgil, The Aeneid, Book I, lines 1-8, trans. John Dryden (1697).",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_I"
      },
      {
        "category": "literary",
        "title": "Joshua Commanded to Cross Over and Possess the Land",
        "excerpt": "Moses my servant is dead; now therefore arise, go over this Jordan, thou, and all this people, unto the land which I do give to them, even to the children of Israel. Every place that the sole of your foot shall tread upon, that have I given unto you, as I said unto Moses.",
        "source": "Joshua 1:2-3, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Joshua"
      },
      {
        "category": "artistic",
        "title": "American Progress",
        "excerpt": "A luminous, classically robed figure of Columbia floats westward across the continent, stringing telegraph wire and drawing settlers, stagecoaches, and railroads in her wake. Ahead of her, driven into shadow at the canvas's edge, Native peoples and buffalo flee the advancing line. Gast frames the seizure of contested land not as conquest but as radiant, inevitable destiny.",
        "source": "John Gast, American Progress, 1872, oil on canvas. Autry Museum of the American West, Los Angeles.",
        "href": "https://commons.wikimedia.org/wiki/File:American_Progress_(John_Gast_painting).jpg",
        "image": {
          "src": "/covers/israeli-settlers-syria-outpost--a4.png",
          "alt": "A classically robed female figure floats westward across the American plains, leading settlers, wagons and railroads while Native Americans and bison flee before her.",
          "credit": "John Gast, 'American Progress' (1872), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Va, pensiero (Chorus of the Hebrew Slaves), from Nabucco",
        "excerpt": "Va, pensiero, sull'ali dorate; va, ti posa sui clivi, sui colli, ove olezzano tepide e molli l'aure dolci del suolo natal!",
        "source": "Giuseppe Verdi, Nabucco (1842), Act III; libretto by Temistocle Solera. Full score via IMSLP.",
        "href": "https://imslp.org/wiki/Nabucco_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/israeli-settlers-syria-outpost--a5.png",
          "alt": "Pastel portrait of composer Giuseppe Verdi in a dark coat, top hat and white scarf.",
          "credit": "Giovanni Boldini, portrait of Giuseppe Verdi (1886), Galleria Nazionale d'Arte Moderna, Rome, via Wikimedia Commons (public domain)."
        }
      }
    ],
    "rank": 25
  },
  {
    "slug": "plus-pool-floating-river-pool-new-york",
    "headline": "+Pool, a cross-shaped floating swimming pool that filters New York's river water, nears completion",
    "overview": "The pilot for +Pool - a plus-shaped floating swimming pool designed by Family New York and PlayLab to draw in and filter river water through layered membranes, with no chlorine added - is nearing completion ahead of a planned New York debut at Pier 35. The long-gestating project revives a 19th-century idea of public river baths and, backed by a state 'NY Swims' initiative, aims to let New Yorkers safely swim in their own river again.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/29/floating-plus-pool-pilot-nearing-completion-construction/"
      },
      {
        "name": "ArchDaily",
        "href": "https://www.archdaily.com/1031344/nycs-first-river-based-water-filtering-pool-takes-shape-at-pier-35"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/plus-pool-floating-river-pool-new-york.png",
      "alt": "A floating swimming pool moored in a river",
      "credit": "Wikimedia Commons"
    },
    "edition": "Evening Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Rome's public waters and the pride of civic engineering",
        "excerpt": "With such an array of indispensable structures carrying so many waters, compare, if you will, the idle Pyramids or the useless, though famous, works of the Greeks!",
        "source": "Sextus Julius Frontinus, De Aquaeductu Urbis Romae (The Aqueducts of Rome), Book I, section 16, c. AD 97; trans. Charles E. Bennett (Loeb Classical Library, 1925).",
        "href": "https://en.wikisource.org/wiki/On_the_Aqueducts/Book_1"
      },
      {
        "category": "historical",
        "title": "New York's free river baths of the 1890s",
        "excerpt": "685 1/2 miles of water-mains, and 8,800 hydrants; and 16 public bathing places, used in 1891 by 3,750,000 bathers.",
        "source": "Moses King, ed., King's Handbook of New York City: An Outline History and Description of the American Metropolis (Boston: Moses King, 1892), section on Streets, Sewers, Water.",
        "href": "https://archive.org/details/kingshandbookof00king"
      },
      {
        "category": "literary",
        "title": "Seneca on Scipio's bath and unfiltered water",
        "excerpt": "He did not bathe in filtered water; it was often turbid, and after heavy rains almost muddy!",
        "source": "Seneca, Moral Letters to Lucilius (Epistulae Morales ad Lucilium), Letter 86, 'On Scipio's Villa,' section 11; trans. Richard M. Gummere (Loeb Classical Library, 1920).",
        "href": "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_86"
      },
      {
        "category": "literary",
        "title": "Ovid and the clear pool of Salmacis",
        "excerpt": "a pretty pool of soft translucent water may be seen, so clear the glistening bottom glads the eye",
        "source": "Ovid, Metamorphoses, Book IV (Salmacis and Hermaphroditus); trans. Brookes More (Boston: Cornhill Publishing Co., 1922), lines 271-316.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=4:card=285"
      },
      {
        "category": "artistic",
        "title": "Bathers at Asnieres",
        "excerpt": "On a hot afternoon, working men and boys sprawl along a grassy riverbank and wade into the Seine, the factory chimneys of industrial Paris smoking on the far shore. Seurat gives ordinary bathers the stillness and monumental calm of classical figures, insisting that the right to cool off in a city's river is a dignity owed to everyone. It is the same democratic vision that a filtered pool floating in the East River now tries to restore.",
        "source": "Georges Seurat, Bathers at Asnieres (Une Baignade, Asnieres), 1884, oil on canvas, The National Gallery, London (NG3908).",
        "href": "https://commons.wikimedia.org/wiki/File:Baigneurs_a_Asnieres.jpg",
        "image": {
          "src": "/covers/plus-pool-floating-river-pool-new-york--a4.png",
          "alt": "Painting of working-class men and boys resting and bathing on the bank of the Seine, with industrial chimneys across the water.",
          "credit": "Georges Seurat, Bathers at Asnieres, 1884, The National Gallery, London. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Handel's Water Music",
        "excerpt": "Handel composed his Water Music for King George I's evening party on the Thames, its horns and strings drifting across the river from a barge of some fifty musicians. The suites turned a working waterway into a public stage of pleasure, the whole city gathered along the banks to listen. Three centuries later, a floating pool that pipes and cleanses the same kind of river water carries forward that idea: that a city's river can be given back to its people as a place of delight.",
        "source": "George Frideric Handel, Water Music, HWV 348-350, first performed on the River Thames, 17 July 1717.",
        "href": "https://imslp.org/wiki/Water_Music,_HWV_348-350_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/plus-pool-floating-river-pool-new-york--a5.png",
          "alt": "Oil portrait of the composer George Frideric Handel in a red coat, seated, painted by Thomas Hudson in 1756.",
          "credit": "Thomas Hudson, portrait of George Frideric Handel, 1756, National Portrait Gallery, London. Public domain, via Wikimedia Commons."
        }
      }
    ],
    "rank": 26
  },
  {
    "slug": "us-saudi-strikes-iraq-iran-missiles",
    "headline": "U.S. and Saudi Arabia strike Iran-backed militias in Iraq after intercepting an Iranian missile barrage aimed at forces in Jordan",
    "overview": "U.S. Central Command said American and Saudi forces struck bases of Iran-aligned militias in Iraq early Wednesday, hours after intercepting a barrage of Iranian ballistic missiles fired at U.S. troops and a command centre in Jordan in what it called an attempted surprise attack. Iraq's Iran-backed Popular Mobilisation Forces said at least 20 of its fighters were killed, and Iran's Revolutionary Guard said its naval forces had also struck three oil tankers in the Strait of Hormuz, reigniting a Gulf conflict after a brief lull.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxQRWlwZk94dzhfNkVQUDNyVWRCekU3RmZJa09ldGwyOFZ1NzlCWEJhWXN5ZjRqdWRGX25RMWZyMHJJai1LVHZxOVNaZ2NFQ1pyTnI5Q1hONTZZR1Zid25ULUV4T3EyNGtRQTQzSVJPQ3pyS2RKM0I1VUF5cl9ZY2VDd3VwQzMxNzgybnlEXzdXV3RlRUxGX2JZMjZKcHk?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c70g6y24d76o"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/us-saudi-strikes-iraq-iran-missiles.png",
      "alt": "The Gulf region as fighting between U.S., Saudi and Iran-backed forces reignites",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Thermopylae — Dienekes and the Arrow-Storm",
        "excerpt": "Thus nobly did the whole body of Lacedaemonians and Thespians behave; but nevertheless one man is said to have distinguished himself above all the rest, to wit, Dieneces the Spartan. A speech which he made before the Greeks engaged the Medes, remains on record. One of the Trachinians told him, \"Such was the number of the barbarians, that when they shot forth their arrows the sun would be darkened by their multitude.\" Dieneces, not at all frightened at these words, but making light of the Median numbers, answered \"Our Trachinian friend brings us excellent tidings. If the Medes darken the sun, we shall have our fight in the shade.\"",
        "source": "Herodotus, The Histories, Book 7 (trans. George Rawlinson)",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7#226",
        "image": {
          "src": "/covers/us-saudi-strikes-iraq-iran-missiles--a0.png",
          "alt": "Leonidas at Thermopylae, oil painting by Jacques-Louis David, Louvre",
          "credit": "Jacques-Louis David, Louvre; public domain"
        }
      },
      {
        "category": "historical",
        "title": "Jefferson Sends the Frigates Against Tripoli",
        "excerpt": "Tripoli, the least considerable of the Barbary States, had come forward with demands unfounded either in right or in compact, and had permitted itself to denounce war, on our failure to comply before a given day. The style of the demand admitted but one answer. I sent a small squadron of frigates into the Mediterranean, with assurances to that power of our sincere desire to remain in peace, but with orders to protect our commerce against the threatened attack... One of the Tripolitan cruisers having fallen in with, and engaged the small schooner Enterprise, commanded by Lieutenant Sterret... was captured, after a heavy slaughter of her men, without the loss of a single one on our part.",
        "source": "Thomas Jefferson, First Annual Message to Congress, 8 December 1801",
        "href": "https://avalon.law.yale.edu/19th_century/jeffmes1.asp",
        "image": {
          "src": "/covers/us-saudi-strikes-iraq-iran-missiles--a1.png",
          "alt": "Portrait of Thomas Jefferson by Rembrandt Peale, 1800",
          "credit": "Rembrandt Peale, 1800; public domain"
        }
      },
      {
        "category": "literary",
        "title": "The Iliad, Book IV — Pandarus Breaks the Truce",
        "excerpt": "Then Minerva took the form of Laodocus, son of Antenor, and went through the ranks of the Trojans to find Pandarus, the redoubtable son of Lycaon ... she went close up to him and said, \"Brave son of Lycaon, will you do as I tell you? If you dare send an arrow at Menelaus you will win honour and thanks from all the Trojans...\" His fool's heart was persuaded, and he took his bow from its case ... then when the bow was arched into a half-circle he let fly, and the bow twanged, and the string sang as the arrow flew gladly on over the heads of the throng.",
        "source": "Homer, The Iliad (trans. Samuel Butler)",
        "href": "https://www.gutenberg.org/files/2199/2199-h/2199-h.htm#chap04"
      },
      {
        "category": "literary",
        "title": "Agamemnon — \"Who Sheds Blood Must Bleed\"",
        "excerpt": "That taunt still answers taunt we see. Here to adjudge is hard indeed. Spoiled be the spoiler; who sheds blood must bleed. While Zeus surviveth shall this law survive. Doer must suffer; 'tis the Fates' decree; Who from the house the fated curse may drive? The race is welded to calamity.",
        "source": "Aeschylus, Agamemnon (trans. Anna Swanwick)",
        "href": "https://en.wikisource.org/wiki/Dramas_of_Aeschylus_(Swanwick)/Agamemnon",
        "image": {
          "src": "/covers/us-saudi-strikes-iraq-iran-missiles--a3.png",
          "alt": "The gold 'Mask of Agamemnon' from Mycenae, National Archaeological Museum, Athens",
          "credit": "National Archaeological Museum, Athens; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "The Battle of Lepanto",
        "excerpt": "Vicentino's vast canvas crams the frame with galleys locked in close, smoke-wreathed combat across the Gulf of Patras — the strait-like chokepoint where a Christian coalition ambushed and annihilated an Ottoman fleet in 1571. Its churning mass of ships, cannon smoke and drowning men renders the same anxious geography now in play at Hormuz: a narrow maritime corridor where a single naval clash can decide a much larger war.",
        "source": "Andrea Vicentino, c. 1595–1605, Doge's Palace, Venice",
        "href": "https://commons.wikimedia.org/wiki/File:Battle_of_Lepanto,_1571_(by_Andrea_Vicentino)_-_Doge's_Palace,_Venice.jpg",
        "image": {
          "src": "/covers/us-saudi-strikes-iraq-iran-missiles--a4.png",
          "alt": "The Battle of Lepanto, 1571, by Andrea Vicentino, Doge's Palace, Venice",
          "credit": "Doge's Palace, Venice; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "The Year 1812, Festival Overture, Op. 49",
        "excerpt": "Tchaikovsky's overture stages an invasion and a retaliation in sound: a somber Orthodox chant is overrun by a blaring, martial French theme representing Napoleon's advance, until Russian folk melody and pealing cannon-fire (scored into the percussion) drive the invader back and the piece closes in triumphant bells and artillery salvos. It is a piece built entirely around the logic of escalation — provocation, barrage, and overwhelming retaliatory response.",
        "source": "Pyotr Ilyich Tchaikovsky, 1880",
        "href": "https://imslp.org/wiki/1812_Overture,_Op.49_(Tchaikovsky,_Pyotr)",
        "image": {
          "src": "/covers/us-saudi-strikes-iraq-iran-missiles--a5.png",
          "alt": "Photograph of Pyotr Ilyich Tchaikovsky, 1888",
          "credit": "E. Bieber, 1888; public domain"
        }
      }
    ],
    "lead": true,
    "rank": 27
  },
  {
    "slug": "russia-charges-durov-telegram-terrorism",
    "headline": "Russia charges Telegram founder Pavel Durov with aiding terrorism and places him on a wanted list",
    "overview": "Russian investigators charged Telegram founder Pavel Durov in absentia with facilitating terrorism and added him to a federal wanted list, escalating the Kremlin's long-running standoff with the encrypted messaging app over its refusal to hand over user data. Durov, who left Russia in 2014 after declining to shut down opposition channels, dismissed the case as politically motivated.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMimwFBVV95cUxQblNhVl9DX1JwVFV4YTJRNElNYTcyUm9QckNfaTVuSTB2NEFzRXBuRlVQTjg5a2hOLU9hWWM4ZXZUa01WS3BNNkR3MnlvbktKX0x2aVY2NGpIdGxSd3dLYnZUYl93OXRnR0V6OWpZUExXS0UyaVRWUXYwV0pYQUY4b2Rlc25uWWVZWDRZcDgzSFlCMEZ0MEota2Vqdw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivwFBVV95cUxNNXJBcVhwTDJuYl96LXAxeVdYUWNubDJCU01KYV9uTGYyZ200bWMtR3VPX3g1ZGVJV1RDWTl2Ulk0eW5DQ1hJd1pNZlR1aVBpTXZIeFREX0szVmwwRF90LVFMTEpHbkJLUFc0bkN4b3N5U19KZDk4QTVVZjZFNWN1bFVINFZOZ3h1Mm1LRmYyV01kWWVTV0RDSGxYNEZ0eGhLM2ZfVlBrWkJtNnd5djNxc3JUV0pYWFc4ajFMY2NPYw?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/russia-charges-durov-telegram-terrorism.png",
      "alt": "Telegram founder Pavel Durov",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Cicero proscribed and hunted down by the Roman state",
        "excerpt": "But meantime his assassins came to the villa, Herennius a centurion, and Popillius a tribune... Cicero, perceiving him, ordered the servants to set the litter down where they were. Then he himself, clasping his chin with his left hand, as was his wont, looked steadfastly at his slayers, his head all squalid and unkempt, and his face wasted with anxiety... For he stretched his neck forth from the litter and was slain... Herennius cut off his head, by Antony's command, and his hands—the hands with which he wrote the Philippics.",
        "source": "Plutarch, Life of Cicero, ch. 48–49 (tr. Bernadotte Perrin, 1919)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:2008.01.0016:chapter=48",
        "image": {
          "src": "/covers/russia-charges-durov-telegram-terrorism--a0.png",
          "alt": "Marble bust of Cicero, Capitoline Museums, Rome",
          "credit": "Musei Capitolini, Rome; public domain"
        }
      },
      {
        "category": "historical",
        "title": "Alexander Herzen condemned and exiled by the Tsar for 'seditious songs'",
        "excerpt": "The Tsar, after examining the report of the committee and taking into special consideration the youth of the criminals, commanded that we should not be brought to trial, and informed us that by law we ought, as men guilty of high treason by singing seditious songs, to lose our lives or, alternatively, to be sentenced to penal servitude for life... 'I am protesting against your report and not against the will of the Most High... there is some mistake here.'",
        "source": "Alexander Herzen, My Past and Thoughts, vol. 1, ch. XII (tr. Constance Garnett)",
        "href": "https://www.gutenberg.org/files/76599/76599-h/76599-h.htm",
        "image": {
          "src": "/covers/russia-charges-durov-telegram-terrorism--a1.png",
          "alt": "Portrait of Alexander Herzen by Nikolai Ge, 1867, Tretyakov Gallery",
          "credit": "Nikolai Ge, 1867, Tretyakov Gallery; public domain"
        }
      },
      {
        "category": "literary",
        "title": "Josef K., arrested by a faceless power for an unnamed crime",
        "excerpt": "Someone must have been telling lies about Josef K., he knew he had done nothing wrong but, one morning, he was arrested. Every day at eight in the morning he was brought his breakfast by Mrs. Grubach's cook... K. waited a little while, looked from his pillow at the old woman who lived opposite and who was watching him with an inquisitiveness quite unusual for her, and finally, both hungry and disconcerted, rang the bell. There was immediately a knock at the door and a man entered. He had never seen the man in this house before.",
        "source": "Franz Kafka, The Trial, ch. 1 (tr. David Wyllie)",
        "href": "https://www.gutenberg.org/files/7849/7849-0.txt",
        "image": {
          "src": "/covers/russia-charges-durov-telegram-terrorism--a2.png",
          "alt": "Franz Kafka, last extant photographic portrait, 1923",
          "credit": "Photographer unknown, 1923; public domain"
        }
      },
      {
        "category": "literary",
        "title": "Dante, sentenced to exile from Florence on trumped-up charges",
        "excerpt": "As forth from Athens went Hippolytus, / By reason of his step-dame false and cruel, / So thou from Florence must perforce depart. / Already this is willed, and this is sought for; / And soon it shall be done by him who thinks it... Thou shalt abandon everything beloved / Most tenderly, and this the arrow is / Which first the bow of banishment shoots forth. / Thou shalt have proof how savoureth of salt / The bread of others, and how hard a road / The going down and up another's stairs.",
        "source": "Dante Alighieri, Paradiso, Canto XVII (tr. Henry Wadsworth Longfellow, 1867)",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_3/Canto_17",
        "image": {
          "src": "/covers/russia-charges-durov-telegram-terrorism--a3.png",
          "alt": "Dante in Exile, oil painting by Frederic Leighton, 1864",
          "credit": "Frederic Leighton, 1864; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Daumier's Gargantua — a caricaturist imprisoned for lampooning the state",
        "excerpt": "Daumier's lithograph pictured King Louis-Philippe as Rabelais's giant Gargantua, gorged on tax money shoveled up to his throne by ministers while the ragged poor below are stripped bare to feed him. The government seized the print, smashed the lithographic stone so it could never be reprinted, charged Daumier with offending the person of the king, and in 1832 sentenced him to six months in the prison of Sainte-Pélagie. It remains one of the defining cases of a state prosecuting an artist for the act of publication itself rather than any violent deed.",
        "source": "Honoré Daumier, Gargantua, lithograph in La Caricature, 16 December 1831",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier_-_Gargantua.jpg",
        "image": {
          "src": "/covers/russia-charges-durov-telegram-terrorism--a4.png",
          "alt": "Gargantua, lithograph by Honoré Daumier, 1831, King Louis-Philippe as a giant devouring the people's wealth",
          "credit": "Honoré Daumier, 1831; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Shostakovich denounced by Pravda as an enemy voice",
        "excerpt": "After two years of packed houses, Stalin attended a performance of Shostakovich's opera on 26 January 1936 and walked out early; two days later an unsigned Pravda editorial titled 'Muddle Instead of Music' branded the work 'coarse, primitive and vulgar' and warned that such formalist games 'may end very badly.' The opera vanished from Soviet stages for decades and Shostakovich's commissions evaporated overnight — the state punishing a composer for a score it had celebrated only weeks before.",
        "source": "Dmitri Shostakovich, Lady Macbeth of the Mtsensk District, Op. 29 (1932–34)",
        "href": "https://imslp.org/wiki/Lady_Macbeth_of_the_Mtsensk_District,_Op.29_(Shostakovich,_Dmitry)",
        "image": {
          "src": "/covers/russia-charges-durov-telegram-terrorism--a5.png",
          "alt": "Dmitri Shostakovich, portrait photograph, 1950",
          "credit": "Roger & Renate Rössing, Deutsche Fotothek; CC BY-SA 3.0 DE"
        }
      }
    ],
    "rank": 28
  },
  {
    "slug": "southwest-europe-wildfires-evacuations",
    "headline": "France orders 4,000 more evacuated as wildfires displace a third of a million people across southwestern Europe",
    "overview": "France ordered another 4,000 residents to evacuate as wildfires tore across its southwest and a new 40C heatwave bore down on the region, part of a broader emergency that has displaced roughly a third of a million people across Spain, Portugal and France. Firefighters described record-breaking blazes they could not put out.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxQVnhUbUtjWkcxODdfUXBpS0ZJWl9mVXhtNGd6WnIzVzd6c3lRQWNzaGVHalE3Y0xyOVdpSEtrQXVHcUUzZTVNQ2ZPZmJhcWx3Vzg1WlIzNk9xY2lBTjl3TzlOX3hPQU5RNS0taGcwUHRZYVh4Z3VyYWJoMnpaTkVGdnBZZ0NNUkMySFcxYUk0Qk92aU0ycFJiMk9kdmVSSDQ?oc=5"
      },
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c5yd8gly1ydo"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/southwest-europe-wildfires-evacuations.png",
      "alt": "Wildfires burning across southwestern France",
      "credit": "BBC"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Great Fire of Rome, 64 AD",
        "excerpt": "A disaster followed, whether accidental or treacherously contrived by the emperor, is uncertain, as authors have given both accounts, worse, however, and more dreadful than any which have ever happened to this city by the violence of fire. The blaze in its fury ran first through the level portions of the city, then rising to the hills, while it again devastated every place below them, it outstripped all preventive measures; so rapid was the mischief and so completely at its mercy the city. Added to this were the wailings of terror-stricken women, the feebleness of age, the helpless inexperience of childhood, the crowds who sought to save themselves or others, dragging out the infirm or waiting for them, and by their hurry in the one case, by their delay in the other, aggravating the confusion.",
        "source": "Tacitus, Annals, Book XV, ch. 38 (Church & Brodribb)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0078%3Abook%3D15%3Achapter%3D38",
        "image": {
          "src": "/covers/southwest-europe-wildfires-evacuations--a0.png",
          "alt": "Hubert Robert, The Fire of Rome (1785)",
          "credit": "Hubert Robert, 1785, Musée d'art moderne André Malraux, Le Havre; public domain"
        }
      },
      {
        "category": "historical",
        "title": "The Great Fire of 1910 (\"The Big Burn\"), Idaho and Montana",
        "excerpt": "On August 20 a terrific hurricane broke over the mountains. It picked up the fires and carried them for miles. The wind was so strong that it almost lifted men out of their saddles, and the canyons seemed to act as chimneys, through which the wind and fires swept with the roar of a thousand freight trains. The smoke and heat became so intense that it was difficult to breathe... The whole world seemed to us men back in those mountains to be aflame. Many thought that it really was the end of the world.",
        "source": "Edward C. Pulaski, \"Surrounded by Forest Fires,\" American Forestry (August 1923)",
        "href": "https://foresthistory.org/wp-content/uploads/2017/02/Surrounded-by-Forest-Firest-By-E.C.-Pulaski.pdf",
        "image": {
          "src": "/covers/southwest-europe-wildfires-evacuations--a1.png",
          "alt": "Buildings in Wallace, Idaho destroyed by the 1910 forest fires",
          "credit": "National Photo Company, 1910; U.S. Library of Congress; public domain"
        }
      },
      {
        "category": "literary",
        "title": "Aeneid, Book II — the burning of Troy",
        "excerpt": "Thus when a flood of Fire by Wind is born, / Crackling it rowls, and mows the standing Corn... Driv'n on the wings of Winds, whole sheets of Fire, / Through Air transported, to the Roofs aspire. / With Vulcan's rage the rising Winds conspire; / And near our Palace rowl the flood of Fire. / Haste, my dear Father, ('tis no time to wait,) / And load my Shoulders with a willing Fraight.",
        "source": "Virgil, The Works of Virgil, translated by John Dryden",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Virgil_(Dryden)/Aeneid/Book_II",
        "image": {
          "src": "/covers/southwest-europe-wildfires-evacuations--a2.png",
          "alt": "Daniël van Heil, Aeneas carrying his father Anchises from burning Troy",
          "credit": "Daniël van Heil, c. 1627–1664; public domain"
        }
      },
      {
        "category": "literary",
        "title": "The Last Days of Pompeii — Vesuvius erupts over the city",
        "excerpt": "Each turned to fly—each dashing, pressing, crushing, against the other. Trampling recklessly over the fallen—amidst groans, and oaths, and prayers, and sudden shrieks, the enormous crowd vomited itself forth through the numerous passages. Whither should they fly?... But darker, and larger, and mightier, spread the cloud above them. It was a sudden and more ghastly Night rushing upon the realm of Noon!",
        "source": "Edward Bulwer-Lytton, The Last Days of Pompeii (1834)",
        "href": "https://www.gutenberg.org/ebooks/1565",
        "image": {
          "src": "/covers/southwest-europe-wildfires-evacuations--a3.png",
          "alt": "Karl Bryullov, The Last Day of Pompeii (1830–1833)",
          "credit": "Karl Bryullov, 1830–1833, State Russian Museum; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "The Burning of the Houses of Lords and Commons, October 16, 1834",
        "excerpt": "Turner watched Parliament burn from the south bank of the Thames alongside thousands of other Londoners, then translated the spectacle into paint from quick sketches made at the scene. He exaggerates the height of the flames and the plunge of Westminster Bridge, turning a real news event into a study of fire's overwhelming, almost cosmic power against human helplessness.",
        "source": "J. M. W. Turner, oil on canvas, Philadelphia Museum of Art",
        "href": "https://www.philamuseum.org/objects/103831",
        "image": {
          "src": "/covers/southwest-europe-wildfires-evacuations--a4.png",
          "alt": "J. M. W. Turner, The Burning of the Houses of Lords and Commons, 1834",
          "credit": "J. M. W. Turner, 1834–35, Philadelphia Museum of Art; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Götterdämmerung — the Immolation Scene",
        "excerpt": "She urges her horse with one leap into the burning pile of logs. The flames immediately blaze up, so that they fill the whole space in front of the hall and seem to catch hold of the building itself. The terrified men and women press as far to the front as possible... Bright flames seem to seize on the hall of the Gods. When the Gods are completely hidden by the flames the curtain falls.",
        "source": "Richard Wagner, Götterdämmerung, WWV 86D (trans. Margaret Armour, 1911)",
        "href": "https://www.gutenberg.org/ebooks/49507",
        "image": {
          "src": "/covers/southwest-europe-wildfires-evacuations--a5.png",
          "alt": "Arthur Rackham, Brünnhilde leaps onto the funeral pyre — illustration for Wagner",
          "credit": "Arthur Rackham, 1911; public domain"
        }
      }
    ],
    "rank": 29
  },
  {
    "slug": "bmw-cuts-thousands-jobs-buyouts",
    "headline": "BMW offers buyouts to thousands of German staff, aiming to cut about 8,000 jobs by 2027",
    "overview": "BMW said it will shed jobs through a voluntary redundancy programme, offering buyouts from October to some 40,000 of its roughly 85,000 permanent German staff in desk-based roles as it targets around 8,000 job cuts globally by the end of 2027. The retrenchment follows similar moves across a German auto industry squeezed by thin electric-vehicle margins, U.S. tariffs and Chinese competition.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwwFBVV95cUxPVGhvU1oyNGEweVNlWldwNkJaR3h2MTQ0OFZTWl9NQkVkR3dJcUtDT1ktSmJlUllEX1VUR3dyZi1KNTlwck00Z1BIOTc5MTN6R056Ul9NQ1RGNHpQYURUTE45MTZxVEh5anlhQlBYd3ltNWdjRzVSUTdCZnQ1dEE2bXlvbER0SEZhMjNiczZGQy1LY0FwRE1Ea2RXQXJjV3c1RUJDX2lpV0JDWlBxb3o4cXB0cDFmbDh6OVM5ZlgyOElTb2M?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-29/bmw-offers-buyouts-to-thousands-of-german-workers-to-cut-costs"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/bmw-cuts-thousands-jobs-buyouts.png",
      "alt": "BMW Welt in Munich, Germany, at night",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Lord Byron's Maiden Speech Against the Frame-Breaking Bill (House of Lords, 27 February 1812)",
        "excerpt": "My Lords, the subject now submitted to your Lordships for the first time, though new to the House, is by no means new to the country... nothing but absolute want could have driven a large, and once honest and industrious, body of the people, into the commission of excesses so hazardous to themselves, their families, and the community. ... one man performed the work of many, and the superfluous labourers were thrown out of employment.",
        "source": "Hansard, Parliamentary Debates, 27 Feb 1812",
        "href": "https://api.parliament.uk/historic-hansard/lords/1812/feb/27/frame-work-bill",
        "image": {
          "src": "/covers/bmw-cuts-thousands-jobs-buyouts--a0.png",
          "alt": "1812 engraving 'The Leader of the Luddites', a Luddite leader before a burning mill",
          "credit": "Published by Walker and Knight, 1812; public domain"
        }
      },
      {
        "category": "historical",
        "title": "Pit Closure Policy — Lords debate on colliery closures and coal losses",
        "excerpt": "The National Coal Board is now making huge losses; nearly £2 billion in the last four years... The closure of any colliery is subject to the industry's colliery review procedure, and is only undertaken after the most careful consideration... Men who move, so far that they have to move house, receive full reimbursement of expenses associated with the move, including such costs as introductory visits, removal expenses and solicitors' fees.",
        "source": "Hansard, Parliamentary Debates, 1 August 1984",
        "href": "https://api.parliament.uk/historic-hansard/lords/1984/aug/01/pit-closure-policy"
      },
      {
        "category": "literary",
        "title": "Hard Times — Book the First, Chapter V, 'The Key-note'",
        "excerpt": "It was a town of red brick, or of brick that would have been red if the smoke and ashes had allowed it; but as matters stood, it was a town of unnatural red and black like the painted face of a savage. It was a town of machinery and tall chimneys, out of which interminable serpents of smoke trailed themselves for ever and ever, and never got uncoiled. It had a black canal in it, and a river that ran purple with ill-smelling dye, and vast piles of building full of windows where there was a rattling and a trembling all day long, and where the piston of the steam-engine worked monotonously up and down, like the head of an elephant in a state of melancholy madness.",
        "source": "Charles Dickens, Hard Times (1854)",
        "href": "https://www.gutenberg.org/files/786/786-h/786-h.htm"
      },
      {
        "category": "literary",
        "title": "Player Piano",
        "excerpt": "Vonnegut imagines a near-future America split by a river: on one side live the engineers and managers who run automated factories, on the other the displaced workers of Homestead, whose jobs have been given to machines and who are kept afloat on make-work and pensions, stripped of purpose and identity. Paul Proteus, a plant manager born into this managerial elite, grows sick with guilt as he watches efficiency gains hollow out the men his machines replaced. The novel reads today as an eerily precise forecast of a workforce rendered redundant by the very automation it once built.",
        "source": "Kurt Vonnegut, Player Piano (1952)",
        "href": "https://archive.org/details/playerpiano0000kurt_p3m3"
      },
      {
        "category": "artistic",
        "title": "The Iron Rolling Mill (Modern Cyclopes) / Eisenwalzwerk, 1872–1875",
        "excerpt": "Menzel's vast canvas plunges the viewer into the roar and glare of a German rolling mill, where crews of labourers wrestle white-hot steel amid the machinery that dwarfs them. Painted at the height of the machine age's confidence, it is one of nineteenth-century art's most unflinching portraits of industrial work — and of the human bodies on which that industry depended.",
        "source": "Adolph von Menzel, oil on canvas, Alte Nationalgalerie, Berlin",
        "href": "https://commons.wikimedia.org/wiki/File:Adolph_Menzel_-_Eisenwalzwerk_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/bmw-cuts-thousands-jobs-buyouts--a4.png",
          "alt": "Adolph von Menzel's painting of workers amid machinery and molten steel in an iron rolling mill",
          "credit": "Adolph von Menzel, 1872–1875, Alte Nationalgalerie Berlin; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Pacific 231, H.53 (1923)",
        "excerpt": "Honegger built this famous orchestral showpiece as a portrait of a steam locomotive accelerating, straining, and finally grinding to a halt — the composer said he loved locomotives 'as other men love women or horses.' Written at the height of the machine-age's confidence in industrial power, the score's mechanical rhythms and building momentum have since become a standard emblem of an era's faith in — and eventual subjection to — the very machinery it celebrated.",
        "source": "Arthur Honegger, orchestral 'mouvement symphonique'",
        "href": "https://imslp.org/wiki/Pacific_231,_H.53_(Honegger,_Arthur)"
      }
    ],
    "rank": 30
  },
  {
    "slug": "kavinsky-dj-found-dead-paris",
    "headline": "French electronic musician Kavinsky, producer of 'Nightcall' from the film 'Drive', is found dead in Paris at 50",
    "overview": "Kavinsky, the French synthwave producer born Vincent Belorgey and best known for the 2010 track 'Nightcall' featured in the film 'Drive', was found dead at his Paris home, aged 50. The Paris prosecutor's office said an inquiry was under way and that initial findings showed no suspicious circumstances; he had performed at the closing ceremony of the Paris Olympics.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMirgFBVV95cUxOU0JpTWgwd3c2WmpMZktwYVN1cTJJMVVaYkFqa3FQRnI5dUEyeDFFS1BiOTBwdVhNSGxTSVZsRzNtR1RESFhQa0FXZUxFRjdFUmtfUm9LLTR0SlUtYlB0bmJrQ3FtNGdmTzljVnhhTzRYZDNFZU84SXNUazU0TkQ1MVAyeXpfeU5SWHJYb042cnVVREpSendSZm5GNkdsUlhyUy1NcE9Hem1sOGh5U0E?oc=5"
      },
      {
        "name": "Clash",
        "href": "https://www.clashmusic.com/news/french-dj-and-producer-kavinsky-found-dead-at-home/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/kavinsky-dj-found-dead-paris.png",
      "alt": "The French musician Kavinsky performing",
      "credit": "Marcus Herring / Wikimedia Commons"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Mozart's Requiem, left unfinished at his deathbed (Vienna, 1791)",
        "excerpt": "The Requiem, too, was constantly in his mind. While he had been at work upon it he used to sing every number as it was finished, playing the orchestral part on the piano. The afternoon before his death he had the score brought to his bed, and himself sang the alto part... They got as far as the first bars of the Lacrimosa when Mozart, with the feeling that it would never be finished, burst into a violent fit of weeping, and laid the score aside... Towards midnight he raised himself, opened his eyes wide, then lay down with his face to the wall, and seemed to fall asleep. At one o'clock (December 5) he expired.",
        "source": "Otto Jahn, Life of Mozart, Vol. 3 (trans. Pauline D. Townsend)",
        "href": "https://www.gutenberg.org/ebooks/43413",
        "image": {
          "src": "/covers/kavinsky-dj-found-dead-paris--a0.png",
          "alt": "Unfinished 1782 portrait of Mozart by Joseph Lange",
          "credit": "Joseph Lange, 1782; public domain"
        }
      },
      {
        "category": "historical",
        "title": "The coroner's file on the death of Jimi Hendrix, London, 1970",
        "excerpt": "Coroners cases: death of Jimi Hendrix. — Citable reference: HO 299/169. Held by: The National Archives, Kew. Legal status: Public Record(s).",
        "source": "The National Archives (Kew), Discovery catalogue",
        "href": "https://discovery.nationalarchives.gov.uk/details/r/C17044591",
        "image": {
          "src": "/covers/kavinsky-dj-found-dead-paris--a1.png",
          "alt": "Jimi Hendrix performing on Dutch television, 1967",
          "credit": "Photo by A. Vente, 1967; CC BY-SA 3.0 NL"
        }
      },
      {
        "category": "literary",
        "title": "Orpheus's severed head and lyre still singing on the river Hebrus",
        "excerpt": "His torn limbs were scattered in strange places. Hebrus then received his head and harp—and, wonderful! While his loved harp was floating down the stream, it mourned for him beyond my power to tell. His tongue though lifeless, uttered a mournful sound and mournfully the river's banks replied.",
        "source": "Ovid, Metamorphoses, Book XI (trans. Brookes More, 1922)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=11:card=1",
        "image": {
          "src": "/covers/kavinsky-dj-found-dead-paris--a2.png",
          "alt": "Ancient relief of Hermes, Eurydice, and Orpheus, Musée du Louvre",
          "credit": "Roman marble relief, Musée du Louvre; CC0"
        }
      },
      {
        "category": "literary",
        "title": "Adonais: An Elegy on the Death of John Keats (1821)",
        "excerpt": "I weep for Adonais—he is dead! Oh weep for Adonais, though our tears Thaw not the frost which binds so dear a head!... He is made one with Nature. There is heard His voice in all her music, from the moan Of thunder to the song of night's sweet bird. He is a presence to be felt and known In darkness and in light, from herb and stone.",
        "source": "Percy Bysshe Shelley, Adonais",
        "href": "https://www.gutenberg.org/ebooks/10119",
        "image": {
          "src": "/covers/kavinsky-dj-found-dead-paris--a3.png",
          "alt": "Portrait of John Keats by Joseph Severn",
          "credit": "Joseph Severn, c. 1821–23, National Portrait Gallery, London; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Orphée (Orpheus), 1865",
        "excerpt": "A Thracian girl gazes down at the head of Orpheus, cradled with his lyre as though the instrument had become his coffin. Moreau paints the moment just after the myth's violence has ended: no maenads, no river, only golden stillness and a face that looks asleep rather than dead. It was one of Moreau's first public successes, bought by the French state straight from the 1866 Salon.",
        "source": "Gustave Moreau, Musée d'Orsay, Paris",
        "href": "https://commons.wikimedia.org/wiki/File:Gustave_Moreau_-_Orpheus_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/kavinsky-dj-found-dead-paris--a4.png",
          "alt": "Gustave Moreau, Orphée (Orpheus), 1865, Musée d'Orsay",
          "credit": "Gustave Moreau, 1865, Musée d'Orsay, Paris; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "L'Orfeo (1607) — opera's founding masterpiece",
        "excerpt": "Composed for the Mantuan court in 1607, L'Orfeo is widely regarded as the first fully realized opera and turns on a musician whose art is powerful enough to bargain with death itself — Orpheus sings his way into the underworld to plead for Eurydice's return. Monteverdi's score is the hinge between Renaissance and Baroque music, still performed and studied more than four centuries later.",
        "source": "Claudio Monteverdi, L'Orfeo, SV 318 (Venice: Ricciardo Amadino, 1609 print)",
        "href": "https://imslp.org/wiki/L'Orfeo,_SV_318_(Monteverdi,_Claudio)",
        "image": {
          "src": "/covers/kavinsky-dj-found-dead-paris--a5.png",
          "alt": "Title page of Monteverdi's L'Orfeo, Venice, 1609",
          "credit": "Ricciardo Amadino, Venice, 1609; public domain"
        }
      }
    ],
    "rank": 31
  },
  {
    "slug": "senate-confirms-clayton-intelligence-director",
    "headline": "U.S. Senate confirms Jay Clayton as Director of National Intelligence",
    "overview": "The U.S. Senate voted to confirm Jay Clayton, a former chair of the Securities and Exchange Commission, as Director of National Intelligence, putting him in charge of coordinating the country's intelligence agencies. The confirmation fills one of the government's most senior national-security posts.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiqgFBVV95cUxOeXJnMGFPM2o2MkpTeW9FVXN1TDZJS2tubkhnVzVYWWU3aTRwWkVUSVNobWhrOHpEM2hXS2V4d2FTNjE2cGJ0X05ZVDVSTXg0UFRWZjhCSnhsbmtPa0VPNTRWM012ckhjNy10aWhGb0dLTWxwQ3Mxa2lpcW1wbUx5czZxYlJjMDlmRDdrSWpwVXFBTHh2NnJyQzlZRDd4b1k2elNBUTlOOUoxdw?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxNVWFtc2dMVE9kc1JEbXBLelZmc09RaDA2WERJazBtWTdCY2xPdVlvWVpZZDJnSWR3eU5FcTR3WklxNkRmM0hJSkNmajRIdlg3bDktWW5ucEtvNndzZXQ3cEl6cXBpWWlXY25RekFua2NORlZXVXFUMjROSThUQnRRRzVtOW5pYVgxdUIyMHB2cTAtVm5qQTVZLXpTYkEyMjA?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/senate-confirms-clayton-intelligence-director.png",
      "alt": "Jay Clayton, confirmed as U.S. Director of National Intelligence",
      "credit": "U.S. government (public domain)"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Procopius Exposes Justinian's Network of Spies",
        "excerpt": "The spies were organized in the following manner:—A number of men used to be supported at the state's expense, whose business it was to visit hostile countries, especially the court of Persia, on pretence of business or some other excuse, and to observe accurately what was going on; and by this means, on their return, they were able to report to the Emperors all the secret plans of their enemies, and the former, being warned in advance, took precautions and were never surprised. This system had long been in vogue amongst the Medes.",
        "source": "Procopius, The Secret History of the Court of Justinian (c. 550 AD)",
        "href": "https://www.gutenberg.org/cache/epub/12916/pg12916.html",
        "image": {
          "src": "/covers/senate-confirms-clayton-intelligence-director--a0.png",
          "alt": "Byzantine mosaic portrait of Emperor Justinian I, Basilica of San Vitale, Ravenna",
          "credit": "Basilica of San Vitale, Ravenna, before 547 AD; public domain"
        }
      },
      {
        "category": "historical",
        "title": "Eisenhower Sets Watchers Over His Own Spymaster",
        "excerpt": "I am constituting a Board of Consultants to review periodically the foreign intelligence activities of this Government, and to report their findings to me. While the review would concern itself with the sum total of these activities, it would be expected that major attention would be concentrated upon the work of the Central Intelligence Agency... I know that you will afford the Board of Consultants the fullest cooperation in its work.",
        "source": "Dwight D. Eisenhower, Letter to Allen W. Dulles, Director of Central Intelligence (January 13, 1956)",
        "href": "https://www.presidency.ucsb.edu/documents/letter-allen-w-dulles-director-central-intelligence-regarding-board-consultants-foreign",
        "image": {
          "src": "/covers/senate-confirms-clayton-intelligence-director--a1.png",
          "alt": "Portrait photograph of Allen Dulles, Director of Central Intelligence 1953–1961",
          "credit": "US National Archives; public domain"
        }
      },
      {
        "category": "literary",
        "title": "Kim and the Ledger of the Great Game",
        "excerpt": "One advantage of the Secret Service is that it has no worrying audit. That Service is ludicrously starved, of course, but the funds are administered by a few men who do not call for vouchers or present itemized accounts. Mahbub's eyes lighted with almost a Sikh's love of money. Even Lurgan's impassive face changed. He considered the years to come when Kim would have been entered and made to the Great Game that never ceases day and night, throughout India.",
        "source": "Rudyard Kipling, Kim (1901), Chapter XII",
        "href": "https://www.gutenberg.org/files/2226/2226-h/2226-h.htm",
        "image": {
          "src": "/covers/senate-confirms-clayton-intelligence-director--a2.png",
          "alt": "Photographic portrait of Rudyard Kipling by Elliott & Fry, 1895",
          "credit": "Elliott & Fry, 1895; public domain"
        }
      },
      {
        "category": "literary",
        "title": "Polonius Deploys an Agent to Watch His Own Son",
        "excerpt": "Your bait of falsehood takes this carp of truth;\nAnd thus do we of wisdom and of reach,\nWith windlasses, and with assays of bias,\nBy indirections find directions out.\nSo by my former lecture and advice\nShall you my son. You have me, have you not?",
        "source": "William Shakespeare, Hamlet, Act II, Scene I",
        "href": "https://www.gutenberg.org/files/1524/1524-h/1524-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Face Behind Elizabeth's Watchers",
        "excerpt": "Walsingham stares out flat and unsmiling, dressed in unadorned black but for a small cameo of Elizabeth I pinned near his heart — the closest the Tudor state came to painting its intelligence chief. As Principal Secretary he built England's first organized secret service, running ciphers, double agents, and informants across Europe to break the Babington Plot and send Mary, Queen of Scots to the block.",
        "source": "John de Critz the Elder, Portrait of Sir Francis Walsingham, c. 1585 — National Portrait Gallery, London",
        "href": "https://commons.wikimedia.org/wiki/File:Sir_Francis_Walsingham_by_John_De_Critz_the_Elder.jpg",
        "image": {
          "src": "/covers/senate-confirms-clayton-intelligence-director--a4.png",
          "alt": "Portrait of Sir Francis Walsingham, attributed to John de Critz the Elder, c. 1585",
          "credit": "National Portrait Gallery, London (NPG 1807); public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Scarpia, Puccini's Chief of the Secret Police",
        "excerpt": "Tre sbirri… Una carrozza… Presto!… seguila dovunque vada!… non visto!… provvedi!… (Va', Tosca! Nel tuo cuor s'annida Scarpia!… È Scarpia che scioglie a volo il falco della tua gelosia.) — Scarpia sets his agents to shadow Tosca, gloating that his police craft has loosed the falcon of her jealousy.",
        "source": "Giacomo Puccini, Tosca (1900), libretto by Giacosa and Illica, Act I finale",
        "href": "https://imslp.org/wiki/Tosca,_SC_69_(Puccini,_Giacomo)",
        "image": {
          "src": "/covers/senate-confirms-clayton-intelligence-director--a5.png",
          "alt": "Title page of the first-edition score of Puccini's Tosca, illustrated by Adolfo Hohenstein, 1899",
          "credit": "Adolfo Hohenstein, 1899, G. Ricordi & Co.; public domain"
        }
      }
    ],
    "rank": 32
  },
  {
    "slug": "guggenheim-abu-dhabi-gehry-opening",
    "headline": "Frank Gehry's Guggenheim Abu Dhabi, the museum's largest branch, is set to open on Saadiyat Island in December",
    "overview": "The Guggenheim Abu Dhabi, designed by the late architect Frank Gehry as the largest museum in the Guggenheim network, will open on 11 December on Saadiyat Island, capping a project first announced in 2006 and repeatedly delayed. Composed of ten sculptural cones rising as high as 88 metres around a central atrium, it becomes the fourth Guggenheim after New York, Venice and Bilbao.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/28/frank-gehry-guggenheim-abu-dhabi-december-opening/"
      },
      {
        "name": "The National",
        "href": "https://www.thenationalnews.com/arts-culture/2026/07/28/guggenheim-abu-dhabi-opening-date/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/guggenheim-abu-dhabi-gehry-opening.png",
      "alt": "The Guggenheim project on Saadiyat Island, Abu Dhabi",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Pliny the Elder on the Temple of Diana at Ephesus",
        "excerpt": "The most wonderful monument of Grecian magnificence, and one that merits our genuine admiration, is the Temple of Diana at Ephesus, which took one hundred and twenty years in building, a work in which all Asia joined... The great marvel in this building is, how such ponderous architraves could possibly have been raised to so great a height.",
        "source": "Pliny the Elder, The Natural History, Book XXXVI, Chap. 21 (trans. Bostock & Riley)",
        "href": "https://www.gutenberg.org/cache/epub/62704/pg62704-images.html"
      },
      {
        "category": "historical",
        "title": "The Crystal Palace: Its Architectural History and Constructive Marvels",
        "excerpt": "So much has already been said and written, both wisely and well, upon the marvellous edifice which has just been reared with such magical rapidity to enshrine the results of the skill and industry of all nations, that it would appear an almost hopeless task to present the subject in any new point of view to the reader.",
        "source": "P. Berlyn & C. Fowler, The Crystal Palace (London, 1851)",
        "href": "https://www.gutenberg.org/cache/epub/44192/pg44192-images.html",
        "image": {
          "src": "/covers/guggenheim-abu-dhabi-gehry-opening--a1.png",
          "alt": "Hand-coloured 1851 lithograph of the exterior of the Crystal Palace in Hyde Park",
          "credit": "British Museum, 1851; public domain"
        }
      },
      {
        "category": "literary",
        "title": "Ozymandias",
        "excerpt": "I met a Traveller from an antique land,\nWho said, \"Two vast and trunkless legs of stone\nStand in the desart. Near them, on the sand,\nHalf sunk, a shattered visage lies, whose frown,\nAnd wrinkled lip, and sneer of cold command,\nTell that its sculptor well those passions read,\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed:\nAnd on the pedestal these words appear:\n\"My name is Ozymandias, King of Kings.\nLook on my works ye Mighty, and despair!\"\nNo thing beside remains. Round the decay\nOf that Colossal Wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, The Examiner, 11 January 1818",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/guggenheim-abu-dhabi-gehry-opening--a2.png",
          "alt": "Colossal granite bust of Ramesses II, the 'Younger Memnon', in the British Museum",
          "credit": "Photo: Andres Rueda, CC BY 2.0"
        }
      },
      {
        "category": "literary",
        "title": "Kubla Khan: or, A Vision in a Dream",
        "excerpt": "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\nDown to a sunless sea.\nSo twice five miles of fertile ground\nWith walls and towers were girdled round...\nIt was a miracle of rare device,\nA sunny pleasure-dome with caves of ice!",
        "source": "Samuel Taylor Coleridge (London, 1816)",
        "href": "https://en.wikisource.org/wiki/Christabel;_Kubla_Khan;_The_Pains_of_Sleep_(1816)/Kubla_Khan"
      },
      {
        "category": "artistic",
        "title": "The Tower of Babel (1563)",
        "excerpt": "Bruegel's monumental panel depicts Nimrod's tower rising in obsessive, encyclopaedic architectural detail — spiralling ramps, cranes and scaffolding dwarfing the city below — as a still-unfinished wonder whose ambition already dwarfs the human figures gathered at its base.",
        "source": "Pieter Bruegel the Elder, Kunsthistorisches Museum, Vienna",
        "href": "https://www.khm.at/en/objectdb/detail/323/",
        "image": {
          "src": "/covers/guggenheim-abu-dhabi-gehry-opening--a4.png",
          "alt": "Pieter Bruegel the Elder, The Tower of Babel (1563)",
          "credit": "Kunsthistorisches Museum Vienna; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Das Rheingold, Scene 2 — Wotan beholds Valhalla",
        "excerpt": "The walls everlasting are built! / On yonder summit / The Gods' abode / Proudly rears / Its radiant strength! / As I nursed it in dream / And desired it to be, / Strong it stands, / Fair to behold, / Brave and beautiful pile!",
        "source": "Richard Wagner, The Rhinegold (trans. Margaret Armour, 1910)",
        "href": "https://www.gutenberg.org/ebooks/48214"
      }
    ],
    "rank": 33
  },
  {
    "slug": "nasa-telescope-private-rescue-trouble",
    "headline": "Private mission to rescue NASA's aging Swift space telescope stalls as its robotic spacecraft spins out of control",
    "overview": "Katalyst Space Technologies said its Link spacecraft, launched to capture NASA's aging Swift telescope and boost it to a higher orbit, has suffered thruster problems and gone into an uncontrollable spin that is disrupting communications, three weeks after launch. NASA is paying $30 million for the rescue; without a lift, the gamma-ray-burst observatory, in orbit since 2004, is expected to fall back to Earth this fall.",
    "genre": "Science",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinAFBVV95cUxNNHJESllXdS03LVN4ZkFHd1VBc0F6V09uNExKVUwzV19NZmRDYWxKSHFtaGFDenFIVERwZ0RSNFNQWWZLTW5BZVlmRUJDVEhmOVRIbk0wdE40My1NamZqOURXMU91aGFzYmVmZ0lPbU1DUzBnX0ZTa0w3MURCSnZHVl83WE9LMU93c3dhVGpSU21GVGt3dkMxWllUUEc?oc=5"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/health/2026/07/28/nasa-swift-telescope-katalyst-rescue/11a3d102-8acc-11f1-8912-d71e69d679d7_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/nasa-telescope-private-rescue-trouble.png",
      "alt": "NASA's Swift space telescope during assembly at Cape Canaveral",
      "credit": "NASA"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Galileo turns his new telescope to the heavens (1610)",
        "excerpt": "But without paying attention to its use for terrestrial objects, I betook myself to observations of the heavenly bodies; and first of all, I viewed the Moon as near as if it was scarcely two semi-diameters of the Earth distant.",
        "source": "Galileo Galilei, Sidereus Nuncius, trans. Edward Stafford Carlos",
        "href": "https://www.gutenberg.org/files/46036/46036-h/46036-h.htm",
        "image": {
          "src": "/covers/nasa-telescope-private-rescue-trouble--a0.png",
          "alt": "Title page of Galileo's Sidereus Nuncius, 1610",
          "credit": "Galileo Galilei, 1610; public domain"
        }
      },
      {
        "category": "historical",
        "title": "Apollo 13's rescue after its own onboard catastrophe (1970)",
        "excerpt": "The accident “was not the result of a chance malfunction in a statistical sense but, rather, it was the result of an unusual combination of mistakes coupled with a somewhat deficient and unforgiving design.\"",
        "source": "NASA, \"50 Years Ago: Apollo 13 Review Board Report\"",
        "href": "https://www.nasa.gov/history/50-years-ago-apollo-13-review-board-report/",
        "image": {
          "src": "/covers/nasa-telescope-private-rescue-trouble--a1.png",
          "alt": "The damaged Apollo 13 Service Module, photographed after jettison, 1970",
          "credit": "NASA; public domain"
        }
      },
      {
        "category": "literary",
        "title": "Icarus flies too high and falls",
        "excerpt": "The vicinity of the scorching Sun softened the fragrant wax that fastened his wings. The wax was melted; he shook his naked arms, and, wanting his oar-like wings, he caught no more air. His face, too, as he called on the name of his father, was received in the azure water, which received its name from him.",
        "source": "Ovid, Metamorphoses, Book VIII, trans. Henry T. Riley (1851)",
        "href": "https://www.gutenberg.org/files/26073/26073-h/26073-h.htm",
        "image": {
          "src": "/covers/nasa-telescope-private-rescue-trouble--a2.png",
          "alt": "The Lament for Icarus, Herbert James Draper, 1898",
          "credit": "Herbert James Draper, 1898, Tate; public domain"
        }
      },
      {
        "category": "literary",
        "title": "The Tower of Babel: overreach toward heaven, confounded",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth... Go to, let us go down, and there confound their language, that they may not understand one another's speech. So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city. Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth.",
        "source": "Genesis 11:1-9, King James Version",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis/Chapter_11",
        "image": {
          "src": "/covers/nasa-telescope-private-rescue-trouble--a3.png",
          "alt": "The Tower of Babel, Pieter Bruegel the Elder, 1563",
          "credit": "Pieter Bruegel the Elder, 1563, Kunsthistorisches Museum Vienna; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Landscape with the Fall of Icarus",
        "excerpt": "In the corner of Bruegel's calm harbor scene, a ploughman, a shepherd, and a fisherman go about their work, oblivious to a pair of small legs thrashing in the sea behind them — all that remains visible of Icarus after his fall. The painting stages humanity's grandest failures of overreach as a footnote to the ordinary world's indifferent routine.",
        "source": "Pieter Bruegel the Elder, c. 1555-60, Royal Museums of Fine Arts of Belgium",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_Landscape_with_the_Fall_of_Icarus_-_WGA03322.jpg",
        "image": {
          "src": "/covers/nasa-telescope-private-rescue-trouble--a4.png",
          "alt": "Landscape with the Fall of Icarus, Pieter Bruegel the Elder",
          "credit": "Royal Museums of Fine Arts of Belgium, Brussels; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "\"The Heavens Are Telling\" from The Creation",
        "excerpt": "The heavens are telling the glory of God, the wonder of His work displays the firmament. In all the lands resounds the word, never unperceived, ever understood.",
        "source": "Joseph Haydn, Die Schöpfung, Hob. XXI:2, Part I, No. 13 (1798)",
        "href": "https://imslp.org/wiki/Die_Sch%C3%B6pfung,_Hob.XXI:2_(Haydn,_Joseph)",
        "image": {
          "src": "/covers/nasa-telescope-private-rescue-trouble--a5.png",
          "alt": "Portrait of Joseph Haydn by Thomas Hardy, 1791",
          "credit": "Thomas Hardy, 1791, Royal College of Music; public domain"
        }
      }
    ],
    "rank": 34
  },
  {
    "slug": "ny-school-pauses-ai-robot-teacher",
    "headline": "New York school district pauses plan to deploy a humanlike AI robot teacher after backlash",
    "overview": "The Salamanca City Central School District in upstate New York paused a plan to place a nearly $60,000 humanoid AI robot, nicknamed 'Sally', in classrooms after state education officials, teachers and residents raised concerns, including over the maker's ties to a company that produces hyper-realistic sex robots. Officials said the pilot with the firm Realbotix was on hold while they work through student-data-privacy agreements.",
    "genre": "Technology",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiswFBVV95cUxNbHZUMlhpN012eG40LW5KMmZpZDNsQ0F3aHJKNDFTRFVVWHRKd3ZUTTlEZVdhQ1pod0o3U1NOc0pERi14XzJicXhiWXhJcVliT2FjYWFzMDQ4aEFkOGczd05rZXRyNDhOT0xSWTdWZmQ5a1NxamNZMXpYUVV0SkZ1aGplcXBXLTJSSHVCWWVJOWNUR1NHQXRTcFRKbTBJcS1OOFhxYnp2WkQzLW9TdVhDS01Qdw?oc=5"
      },
      {
        "name": "KPBS",
        "href": "https://www.kpbs.org/news/science-technology/2026/07/29/new-york-school-pauses-plan-to-deploy-humanlike-ai-robot-teacher-after-backlash"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/ny-school-pauses-ai-robot-teacher.png",
      "alt": "A humanlike robot on display",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Al-Jazari's Book of Ingenious Mechanical Devices (1206)",
        "excerpt": "In 1206 the engineer al-Jazari completed his Book of Knowledge of Ingenious Mechanical Devices, describing dozens of automata built to move and act like living things — including a life-sized elephant clock whose mechanical driver struck the beast on the hour, and hydraulic musicians who played on command. These were working machines, built for courts across the medieval Islamic world centuries before \"robot\" was a word. The surviving illustrated folios are some of the earliest evidence of engineers building artificial beings to stand in for human and animal labor and performance.",
        "source": "Ibn al-Razzaz al-Jazari, manuscript folio depicting \"The Elephant Clock,\" copied 1315",
        "href": "https://www.metmuseum.org/art/collection/search/451402",
        "image": {
          "src": "/covers/ny-school-pauses-ai-robot-teacher--a0.png",
          "alt": "Illustrated manuscript folio of al-Jazari's mechanical elephant clock, 1315 copy",
          "credit": "Metropolitan Museum of Art, 57.51.23; public domain"
        }
      },
      {
        "category": "historical",
        "title": "South Korea's robot English teachers (2010)",
        "excerpt": "In 2010 South Korea sent egg-shaped telepresence robots called Engkey into elementary classrooms in Daegu, where they read stories, sang songs, and led English lessons while human teachers in the Philippines controlled the robots' face and voice remotely. Officials framed it as a fix for a shortage of native English speakers, but the sight of children taking language and social cues from a screen-faced machine unsettled many parents. The pilot foreshadowed the same question now facing a New York classroom: whether a machine built to imitate a teacher's warmth can actually replace one.",
        "source": "NPR, \"Robots Teach English To Young South Koreans\"",
        "href": "https://www.npr.org/2010/12/30/132469509/robots-teach-english-to-young-south-koreans"
      },
      {
        "category": "literary",
        "title": "Frankenstein; or, The Modern Prometheus (1818)",
        "excerpt": "It was on a dreary night of November that I beheld the accomplishment of my toils. With an anxiety that almost amounted to agony, I collected the instruments of life around me, that I might infuse a spark of being into the lifeless thing that lay at my feet. It was already one in the morning; the rain pattered dismally against the panes, and my candle was nearly burnt out, when, by the glimmer of the half-extinguished light, I saw the dull yellow eye of the creature open; it breathed hard, and a convulsive motion agitated its limbs.",
        "source": "Mary Shelley, Frankenstein, Chapter 5",
        "href": "https://www.gutenberg.org/ebooks/84",
        "image": {
          "src": "/covers/ny-school-pauses-ai-robot-teacher--a2.png",
          "alt": "Theodor von Holst's 1831 frontispiece to Frankenstein",
          "credit": "Theodor von Holst, 1831; public domain"
        }
      },
      {
        "category": "literary",
        "title": "R.U.R. (Rossum's Universal Robots) (1920)",
        "excerpt": "DOMIN. A working machine must not play the piano, must not feel happy, must not do a whole lot of other things. A gasoline motor must not have tassels or ornaments, Miss Glory. And to manufacture artificial workers is the same thing as the manufacture of a gasoline motor.",
        "source": "Karel Čapek, R.U.R., Act One",
        "href": "https://www.gutenberg.org/ebooks/59112",
        "image": {
          "src": "/covers/ny-school-pauses-ai-robot-teacher--a3.png",
          "alt": "Scene from an early production of Karel Čapek's R.U.R.",
          "credit": "Photographer unknown; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Pygmalion and Galatea (ca. 1890)",
        "excerpt": "Gérôme's canvas catches the instant the sculptor's ivory statue turns to living flesh, color rising from her feet upward as Pygmalion embraces the artwork he made too perfect to remain merely an object. It is the Western tradition's founding image of a creator falling for his own creation — the same uncanny thrill and unease that meets any lifelike thing built to pass for a person, including a machine walked into a classroom to stand where a teacher once stood.",
        "source": "Jean-Léon Gérôme, oil on canvas, Metropolitan Museum of Art",
        "href": "https://www.metmuseum.org/art/collection/search/436483",
        "image": {
          "src": "/covers/ny-school-pauses-ai-robot-teacher--a4.png",
          "alt": "Jean-Léon Gérôme, Pygmalion and Galatea, ca. 1890",
          "credit": "Metropolitan Museum of Art, 27.200; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Coppélia (1870)",
        "excerpt": "In Delibes' 1870 comic ballet, the reclusive Dr. Coppélius builds a life-sized dancing doll so convincing that a village boy falls for her, mistaking clockwork for a girl, until the ruse collapses in a farce about how easily a mechanical imitation of a person can fool, delight, and alarm the people who encounter her. The ballet's satire of a \"perfect\" artificial companion built to replace a living one still points at the discomfort of a classroom asked to accept a machine standing in for its teacher.",
        "source": "Léo Delibes, ballet score, Coppélia",
        "href": "https://imslp.org/wiki/Copp%C3%A9lia_(Delibes,_L%C3%A9o)",
        "image": {
          "src": "/covers/ny-school-pauses-ai-robot-teacher--a5.png",
          "alt": "Giuseppina Bozzachi as Swanilda in the original 1870 production of Coppélia",
          "credit": "Théâtre Impérial de l'Opéra, Paris, 1870; public domain"
        }
      }
    ],
    "rank": 35
  },
  {
    "slug": "detroit-institute-arts-silverman-gift",
    "headline": "Detroit Institute of Arts receives a gift of more than 2,000 artworks from the Silverman estate",
    "overview": "The Detroit Institute of Arts said the estate of collectors Gilbert and Lila Silverman has given it more than 2,000 modern and contemporary artworks by nearly 500 artists, including works from the couple's renowned Fluxus collection. The gift expands holdings across six curatorial departments and begins going on public view in November when the museum reopens its renovated modern and contemporary galleries.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/detroit-institute-of-arts-2000-artworks-silverman-estate-1234755782/"
      },
      {
        "name": "ARTnews",
        "href": "https://www.artnews.com/art-news/news/detroit-institute-of-arts-silverman-estate-gift-1234793507/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/detroit-institute-arts-silverman-gift.png",
      "alt": "The Detroit Institute of Arts building",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Agrippa's Plea to Make Rome's Art Public Property",
        "excerpt": "After him there was M. Agrippa, a man who was naturally more attached to rustic simplicity than to refinement. Still, however, we have a magnificent oration of his, and one well worthy of the greatest of our citizens, on the advantage of exhibiting in public all pictures and statues; a practice which would have been far preferable to sending them into banishment at our country-houses.",
        "source": "Pliny the Elder, Natural History, Book XXXV, ch. 9 (Bostock & Riley)",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0137:book=35:chapter=9"
      },
      {
        "category": "historical",
        "title": "The Act That Turned a Private Cabinet Into the British Museum",
        "excerpt": "Whereas Sir Hans Sloane... having, through the Course of many Years, with great Labour and Expence, gathered together whatever could be procured either in our own or foreign Countries, that was rare and curious... the said Collection be preserved intire without the least Diminution or Separation, and be kept for the Use and Benefit of the Publick, with free Access to view and peruse the same, at all stated and convenient Seasons agreeable to the Will and Intentions of the Testator.",
        "source": "British Museum Act, 1753 (26 Geo. II, c. 22)",
        "href": "https://statutes.org.uk/site/the-statutes/eighteenth-century/1753-26-george-2-c-22-establishing-the-british-museum/"
      },
      {
        "category": "literary",
        "title": "Poynton, \"the Record of a Life\"",
        "excerpt": "Poynton was the record of a life. It was written in great syllables of color and form, the tongues of other countries and the hands of rare artists. It was all France and Italy, with their ages composed to rest. For England you looked out of old windows—it was England that was the wide embrace.",
        "source": "Henry James, The Spoils of Poynton (1897), Chapter III",
        "href": "https://www.gutenberg.org/files/33325/33325-h/33325-h.htm"
      },
      {
        "category": "literary",
        "title": "\"Let us now praise famous men\"",
        "excerpt": "Let us now praise famous men, and our fathers that begat us... All these were honoured in their generations, and were the glory of their times. There be of them, that have left a name behind them, that their praises might be reported... Their seed shall remain for ever, and their glory shall not be blotted out. Their bodies are buried in peace; but their name liveth for evermore.",
        "source": "Ecclesiasticus (Wisdom of Sirach) 44, King James Apocrypha",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Wisdom_of_Sirach#Chapter_44"
      },
      {
        "category": "artistic",
        "title": "The Artist in His Museum (1822)",
        "excerpt": "At eighty-one, Peale raises a curtain on his life's work: the first great public museum in the United States, assembled from his own decades of collecting portraits, birds, fossils, and a mounted mastodon skeleton. The gesture turns a private cabinet of curiosities into a civic inheritance, offered up for ordinary Philadelphians to marvel at for free. It reads less as a self-portrait than as a founding document — proof that one collector's lifetime of gathering could become, in a single bequest, everybody's museum.",
        "source": "Charles Willson Peale, Pennsylvania Academy of the Fine Arts",
        "href": "https://www.pafa.org/museum/collection/item/artist-his-museum",
        "image": {
          "src": "/covers/detroit-institute-arts-silverman-gift--a4.png",
          "alt": "Charles Willson Peale lifts a curtain to reveal his museum in his 1822 self-portrait",
          "credit": "Pennsylvania Academy of the Fine Arts; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "The Fighting Temeraire and the Turner Bequest",
        "excerpt": "Turner refused every offer to buy The Fighting Temeraire, the painting he reportedly called his 'darling,' and kept it in his studio until he died. When his contested will was finally settled by the courts in 1856, nearly 300 finished paintings and some 30,000 sketches and watercolours passed from that studio into public ownership as the Turner Bequest. A single artist's private hoard became, at a stroke, part of the national collection.",
        "source": "J.M.W. Turner, 1839, National Gallery, London",
        "href": "https://www.jmwturner.org/the-history-of-the-bequest",
        "image": {
          "src": "/covers/detroit-institute-arts-silverman-gift--a5.png",
          "alt": "J.M.W. Turner's 1839 painting The Fighting Temeraire",
          "credit": "National Gallery, London; public domain"
        }
      }
    ],
    "rank": 36
  },
  {
    "slug": "delhi-ev-air-pollution-targets",
    "headline": "India's capital Delhi adopts one of the country's most aggressive electric-vehicle targets to curb air pollution",
    "overview": "Delhi has adopted a new policy aiming to make the vast majority of newly registered vehicles electric by 2027, one of India's most ambitious EV plans, offering subsidies and fee waivers while barring new registrations of some combustion-engine vehicles after set deadlines. Officials framed it as a major step to clean the air in one of the world's most polluted cities, where EVs already make up about 12.7% of new vehicle sales.",
    "genre": "Climate",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMipAFBVV95cUxNMkdsRVdfWm9UU3lXOHNLR0RvZUFwRERkb0RqelFEQzZwMEpyWXo5enBPTjNrZExsTk9HYmsyUXBtUlBvazhJOEZvSTYxYkh4clc2VFZpcXBUUlRKZGlHNGJaYlZfeFZyQWRsbmxHX2JiLVNWMV9mV05ZVHdqM1Ywc2RlUmxWT0toTVJMRm9fMm9TVGo5VGtJVERuSG9TelNJYi00cQ?oc=5"
      },
      {
        "name": "Washington Post",
        "href": "https://www.washingtonpost.com/business/2026/07/28/ev-delhi-india-climate-renewable-pollution/1875e68c-8aea-11f1-8912-d71e69d679d7_story.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/delhi-ev-air-pollution-targets.png",
      "alt": "Smog hanging over the skyline of Delhi, India",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Fumifugium: or, the Inconveniencie of the Aer and Smoake of London Dissipated",
        "excerpt": "And what is all this, but that Hellish and dismall Cloud of SEA-COAL? which is not onely perpetually imminent over her head... but so universally mixed with the otherwise wholsome and excellent Aer, that her Inhabitants breathe nothing but an impure and thick Mist accompanied with a fuligimous and filthy vapour, which renders them obnoxious to a thousand inconveniences, corrupting the Lungs, and disordring the entire habit of their Bodies; so that Catharrs, Phthisicks, Coughs and Consumptions rage more in this one City than in the whole Earth besides.",
        "source": "John Evelyn (1661)",
        "href": "https://en.wikisource.org/wiki/Fumifugium:_or,_the_Inconveniencie_of_the_Aer_and_Smoake_of_London/Part_1",
        "image": {
          "src": "/covers/delhi-ev-air-pollution-targets--a0.png",
          "alt": "Title page of John Evelyn's Fumifugium (1661)",
          "credit": "John Evelyn, 1661; public domain"
        }
      },
      {
        "category": "historical",
        "title": "Air Pollution — Commons debate on the December 1952 Great Smog death toll",
        "excerpt": "During the week ending 13th December, 1952, the death roll in Greater London was 4,703. During the corresponding week in 1951 the death roll was 1,852. There was thus the tremendous increase of 2,851. There were 6,000 more deaths in Greater London during December, 1952, than there were in December, 1951. No one denies—not even the Minister of Health did so in answering Questions—that the major cause of those deaths was air pollution during the foggy weather.",
        "source": "UK Parliament, House of Commons Hansard, 8 May 1953 (Norman Dodds MP)",
        "href": "https://api.parliament.uk/historic-hansard/commons/1953/may/08/air-pollution",
        "image": {
          "src": "/covers/delhi-ev-air-pollution-targets--a1.png",
          "alt": "Nelson's Column shrouded in the Great Smog of London, December 1952",
          "credit": "Photo: N T Stobbs (CC BY-SA 2.0)"
        }
      },
      {
        "category": "literary",
        "title": "Bleak House, Chapter 1 (\"In Chancery\")",
        "excerpt": "Fog everywhere. Fog up the river, where it flows among green aits and meadows; fog down the river, where it rolls defiled among the tiers of shipping and the waterside pollutions of a great (and dirty) city. Fog on the Essex marshes, fog on the Kentish heights. Fog creeping into the cabooses of collier-brigs; fog lying out on the yards and hovering in the rigging of great ships; fog drooping on the gunwales of barges and small boats. Fog in the eyes and throats of ancient Greenwich pensioners, wheezing by the firesides of their wards; fog in the stem and bowl of the afternoon pipe of the wrathful skipper, down in his close cabin; fog cruelly pinching the toes and fingers of his shivering little 'prentice boy on deck.",
        "source": "Charles Dickens (1853)",
        "href": "https://www.gutenberg.org/files/1023/1023-h/1023-h.htm",
        "image": {
          "src": "/covers/delhi-ev-air-pollution-targets--a2.png",
          "alt": "Hablot Knight Browne's frontispiece for Bleak House, 1853",
          "credit": "Hablot Knight Browne ('Phiz'), 1853; public domain"
        }
      },
      {
        "category": "literary",
        "title": "The Love Song of J. Alfred Prufrock",
        "excerpt": "The yellow fog that rubs its back upon the window-panes,\nThe yellow smoke that rubs its muzzle on the window-panes,\nLicked its tongue into the corners of the evening,\nLingered upon the pools that stand in drains,\nLet fall upon its back the soot that falls from chimneys,\nSlipped by the terrace, made a sudden leap,\nAnd seeing that it was a soft October night,\nCurled once about the house, and fell asleep.",
        "source": "T. S. Eliot, in Prufrock and Other Observations (1917)",
        "href": "https://www.gutenberg.org/files/1459/1459-h/1459-h.htm",
        "image": {
          "src": "/covers/delhi-ev-air-pollution-targets--a3.png",
          "alt": "T. S. Eliot, photographed in 1923",
          "credit": "Photo: Lady Ottoline Morrell, 1923; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "London, Houses of Parliament, Sun Breaking Through the Fog",
        "excerpt": "Painted from a balcony at St Thomas' Hospital across the Thames, Monet dissolves the Palace of Westminster into a smudge of violet and gold behind London's coal-smoke haze, its solid Gothic stonework reduced to a ghostly silhouette. The canvas belongs to a series of some nineteen views Monet made of the building between 1900 and 1904. It stands as one of the era's defining images of a great capital wrapped and half-erased by its own industrial atmosphere.",
        "source": "Claude Monet, 1904, Musée d'Orsay, Paris",
        "href": "https://www.musee-orsay.fr/en/artworks/londres-le-parlement-trouee-de-soleil-dans-le-brouillard-1177",
        "image": {
          "src": "/covers/delhi-ev-air-pollution-targets--a4.png",
          "alt": "Claude Monet, London, Houses of Parliament, Sun Breaking Through the Fog, 1904",
          "credit": "Claude Monet, 1904, Musée d'Orsay; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Nuages (\"Clouds\"), first movement of Nocturnes",
        "excerpt": "Debussy's \"Nuages\" moves in slow, drifting parallel chords for muted strings and woodwinds, built to evoke the immutable, grey-toned drift of clouds across the sky, broken only by a brief cor anglais motif. The orchestration deliberately avoids strong rhythmic pulse or resolution, letting harmonies hang and dissolve into one another like vapor thickening and thinning over a cityscape. It became a touchstone of musical Impressionism for rendering an atmosphere — heavy, becalmed, faintly oppressive.",
        "source": "Claude Debussy, orchestral score, 1897–99",
        "href": "https://imslp.org/wiki/Nocturnes_(Debussy,_Claude)",
        "image": {
          "src": "/covers/delhi-ev-air-pollution-targets--a5.png",
          "alt": "Claude Debussy, portrait photograph, 1908",
          "credit": "Photo: Otto Wegener, 1908; public domain"
        }
      }
    ],
    "rank": 37
  },
  {
    "slug": "germany-merz-cabinet-reshuffle-pressure",
    "headline": "Pressure mounts on German Chancellor Friedrich Merz after a fractious cabinet reshuffle",
    "overview": "Pressure intensified on German Chancellor Friedrich Merz after a cabinet and party reshuffle sparked anger within his own CDU and spotlighted his government's competence, weeks before pivotal state elections in September. The shake-up, which followed the resignation of parliamentary group leader Jens Spahn, drew public complaints from ousted ministers as the far-right AfD led national polls.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMipwFBVV95cUxNS1JMUFJMZ2V0bm93NUl5cWJROWdkdUo1ZWtJWU5Qa0FVUkJmWm9MX1NSWnB0cWJIMVIzQVlCbll0c2ZkeXhEVzBKSUxSOGMtUVFCUVpjUVFGR0tOZUkxLS04QzUzRTNUTjJNaFZkUHBYMXBPeS1YMnA2aDFwU2QzWEZLMGJrU0pMTm12dXBaZU5ENnNFMTJIWTRiVU1GZXhIMldjcjFMRQ?oc=5"
      },
      {
        "name": "U.S. News",
        "href": "https://www.usnews.com/news/world/articles/2026-07-29/pressure-mounts-on-germanys-merz-after-fractious-reshuffle"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/germany-merz-cabinet-reshuffle-pressure.png",
      "alt": "German Chancellor Friedrich Merz",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "The Fall of Sejanus and Tiberius's Purge of His Court",
        "excerpt": "Having flattered him with the hope of an alliance by marriage with one of his own kindred, and the prospect of the tribunitian authority, he suddenly, while Sejanus little expected it, charged him with treason... Out of all this number, scarcely two or three escaped the fury of his savage disposition. All the rest he destroyed upon one pretence or another.",
        "source": "Suetonius, The Lives of the Twelve Caesars — Tiberius",
        "href": "https://www.gutenberg.org/cache/epub/6388/pg6388-images.html",
        "image": {
          "src": "/covers/germany-merz-cabinet-reshuffle-pressure--a0.png",
          "alt": "Marble portrait bust of the Roman emperor Tiberius, British Museum",
          "credit": "Photo: Slowking4, British Museum (CC BY-SA 3.0)"
        }
      },
      {
        "category": "historical",
        "title": "Bismarck's Forced Resignation, 1890 — 'Dropping the Pilot'",
        "excerpt": "I cannot do other than most humbly request Your Majesty to grant me an honorable discharge with legal pension from the posts of Reich Chancellor, Minister-President, and Prussian Minister for Foreign Affairs.",
        "source": "Otto von Bismarck, Letter of Resignation, 18 March 1890",
        "href": "https://germanhistorydocs.org/en/forging-an-empire-bismarckian-germany-1866-1890/bismarck-s-letter-of-resignation-march-18-1890",
        "image": {
          "src": "/covers/germany-merz-cabinet-reshuffle-pressure--a1.png",
          "alt": "Otto von Bismarck photographed shortly after his 1890 resignation as Chancellor",
          "credit": "Bundesarchiv Bild 146-2005-0057, Jacques Pilartz"
        }
      },
      {
        "category": "literary",
        "title": "'Uneasy Lies the Head That Wears a Crown'",
        "excerpt": "Canst thou, O partial sleep, give thy repose / To the wet sea-boy in an hour so rude, / And in the calmest and most stillest night, / With all appliances and means to boot, / Deny it to a king? Then happy low, lie down! / Uneasy lies the head that wears a crown.",
        "source": "William Shakespeare, King Henry IV, Part 2, Act III, Scene I",
        "href": "https://www.gutenberg.org/cache/epub/1782/pg1782.html"
      },
      {
        "category": "literary",
        "title": "Lear Divides the Kingdom and Sows Court Faction",
        "excerpt": "To shake all cares and business from our age, / Conferring them on younger strengths, while we / Unburthen'd crawl toward death... Thy youngest daughter does not love thee least, / Nor are those empty-hearted whose low sound / Reverbs no hollowness.",
        "source": "William Shakespeare, King Lear, Act I, Scene I",
        "href": "https://www.gutenberg.org/cache/epub/1794/pg1794-images.html"
      },
      {
        "category": "artistic",
        "title": "'Dropping the Pilot' — Tenniel's Cartoon of a Chancellor Cast Off",
        "excerpt": "Tenniel's cartoon shows an aging Bismarck descending the ship's ladder rung by rung while a young, unmoved Kaiser Wilhelm II watches impassively from the deck above, having just forced out the chancellor who had steered the German state for two decades. It became the era's defining image of an abrupt, top-down purge of a government's chief architect, so resonant that Bismarck himself was sent a copy.",
        "source": "Sir John Tenniel, Punch magazine, 29 March 1890",
        "href": "https://commons.wikimedia.org/wiki/File:1890_Bismarcks_Ruecktritt.jpg",
        "image": {
          "src": "/covers/germany-merz-cabinet-reshuffle-pressure--a4.png",
          "alt": "Tenniel cartoon 'Dropping the Pilot': Bismarck climbs down a ship's ladder as Kaiser Wilhelm II looks on",
          "credit": "Sir John Tenniel, Punch, 1890; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "Boris Godunov — A Ruler Undone by Boyar Faction and Guilt",
        "excerpt": "Mussorgsky's opera follows Tsar Boris from his uneasy coronation through mounting pressure from scheming boyars and the rise of a pretender to his throne, dramatizing how factional intrigue and a leader's own guilt corrode power from within. Boris's psychological unraveling amid a fracturing court became one of opera's most searing portraits of a ruler who can win a crown but never fully secure it.",
        "source": "Modest Mussorgsky, Boris Godunov (opera)",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)",
        "image": {
          "src": "/covers/germany-merz-cabinet-reshuffle-pressure--a5.png",
          "alt": "Ilya Repin's 1881 portrait of composer Modest Mussorgsky",
          "credit": "Ilya Repin, 1881, Tretyakov Gallery; public domain"
        }
      }
    ],
    "rank": 38
  },
  {
    "slug": "kering-gucci-sales-rally-recovery",
    "headline": "Kering shares jump about 11% as Gucci sales fall less than feared, signaling a tentative luxury recovery",
    "overview": "Shares in the French luxury group Kering rose roughly 11% after second-quarter sales at its flagship brand Gucci fell 2%, a smaller drop than analysts had feared, raising hopes of a turnaround under new chief executive Luca de Meo. Group revenue of 3.65 billion euros edged past expectations, with Gucci improving across all regions, led by North America.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMisgFBVV95cUxQMERiczVMUy0tU1NpUFFIT25lSUhfMHRjM041N3EtRUhLdEswM2VlVG02MXQ5Q1JXVzRpTVpGWkotTTkwX2hPanU0N1I2T2RhaUlTYXFrMFVFdXNoRW1XVU9EOHlMcGJpbEVURGo4azczSEp0NFB6aDJfYzZsdzBmLVFhQVE3Q0pJdXdBWmtNcENJSVhVZlNYWmFFNFh2RkxHRzhWS2FiRW51X28wMG12VTVn?oc=5"
      },
      {
        "name": "Bloomberg",
        "href": "https://www.bloomberg.com/news/articles/2026-07-28/kering-sees-signs-of-progress-in-curbing-sales-declines-at-gucci"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-29",
    "image": {
      "src": "/covers/kering-gucci-sales-rally-recovery.png",
      "alt": "A Gucci store",
      "credit": "Wikimedia Commons"
    },
    "edition": "Morning Edition · 29 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Machiavelli's eulogy of Cosimo de' Medici, banker-prince",
        "excerpt": "Of all who have left memorials behind them, and who were not of the military profession, Cosmo was the most illustrious and the most renowned. He not only surpassed all his contemporaries in wealth and authority, but also in generosity and prudence... His magnificence is evident from the number of public edifices he erected... his agents who conducted his commercial speculations throughout Europe, participated in his prosperity. Hence many enormous fortunes took their origin in different families of Florence.",
        "source": "Niccolò Machiavelli, History of Florence, Book VII",
        "href": "https://www.gutenberg.org/files/2464/2464-h/2464-h.htm",
        "image": {
          "src": "/covers/kering-gucci-sales-rally-recovery--a0.png",
          "alt": "Portrait of Cosimo de' Medici the Elder by Jacopo Pontormo, Uffizi Gallery",
          "credit": "Jacopo Pontormo, Uffizi Gallery, Florence; public domain"
        }
      },
      {
        "category": "historical",
        "title": "Cato's speech against repealing Rome's sumptuary law on women's dress and gold",
        "excerpt": "when the dress of all is made alike, what is there which any of you fears will not be conspicuous in herself?... 'It is just this equality that I will not put up with,' says yonder rich woman. 'Why do I not stand out conspicuous by reason of gold and purple? Why does the poverty of other women lie concealed under cover of this law...?' Do you wish, citizens, to start a race like this among your wives, so that the rich shall want to own what no other woman can have and the poor, lest they be despised for their poverty, shall spend beyond their means?",
        "source": "Livy, Ab Urbe Condita, Book 34",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0164:book=34:chapter=4"
      },
      {
        "category": "literary",
        "title": "The Theory of the Leisure Class — conspicuous consumption",
        "excerpt": "The basis on which good repute in any highly organized industrial community ultimately rests is pecuniary strength; and the means of showing pecuniary strength, and so of gaining or retaining a good name, are leisure and a conspicuous consumption of goods... Both are methods of demonstrating the possession of wealth, and the two are conventionally accepted as equivalents.",
        "source": "Thorstein Veblen (1899)",
        "href": "https://www.gutenberg.org/files/833/833-h/833-h.htm"
      },
      {
        "category": "literary",
        "title": "The Ladies' Paradise (Au Bonheur des Dames) — the department store as a machine of desire",
        "excerpt": "There was the continual roaring of a machine at work, an engulfing of customers close-pressed against the counters, bewildered amidst the piles of goods, and finally hurled towards the pay-desks. And all went on in an orderly manner, with mechanical regularity, force and logic carrying quite a nation of women through the gearing of this commercial machine.",
        "source": "Émile Zola (1883)",
        "href": "https://www.gutenberg.org/files/54726/54726-h/54726-h.htm"
      },
      {
        "category": "artistic",
        "title": "The Ambassadors — a double portrait glutted with finery, and a hidden skull",
        "excerpt": "Two richly dressed emissaries stand flanking a table heaped with globes, instruments, and a lute — every fold of fur-trimmed velvet and every gleaming object a display of learning, status and worldly success. Yet a distorted skull streaks across the floor between them, an anamorphic memento mori that undercuts all the finery: however splendid the display of wealth, fortune and mortality can dissolve it in an instant.",
        "source": "Hans Holbein the Younger, 1533, National Gallery, London",
        "href": "https://www.nationalgallery.org.uk/paintings/hans-holbein-the-younger-the-ambassadors",
        "image": {
          "src": "/covers/kering-gucci-sales-rally-recovery--a4.png",
          "alt": "Hans Holbein the Younger, The Ambassadors, 1533, National Gallery, London",
          "credit": "Hans Holbein the Younger, National Gallery, London; public domain"
        }
      },
      {
        "category": "artistic",
        "title": "La traviata — 'Sempre libera', Violetta's fickle whirl of Parisian pleasure",
        "excerpt": "Sempre libera degg'io / Trasvolar di gioia in gioia, / Perchè ignoto al viver mio / Nulla passi del piacer. / Nasca il giorno, il giorno muoja, / Sempre me la stessa trovi, / Le dolcezze a me rinnovi / Ma non muti il mio pensier.",
        "source": "Giuseppe Verdi, libretto by Francesco Maria Piave (1853), Act I",
        "href": "https://it.wikisource.org/wiki/La_traviata/Atto_primo",
        "image": {
          "src": "/covers/kering-gucci-sales-rally-recovery--a5.png",
          "alt": "Portrait of Giuseppe Verdi by Giovanni Boldini, 1886",
          "credit": "Giovanni Boldini, 1886, Galleria Nazionale d'Arte Moderna, Rome; public domain"
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
