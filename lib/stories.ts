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
    "slug": "iran-hormuz-new-strikes",
    "headline": "The U.S. launches a sixth straight night of airstrikes on Iran as the two sides battle for control of the Strait of Hormuz",
    "overview": "U.S. Central Command said it struck Iran for a sixth consecutive night on Thursday to \"further degrade Iranian military capabilities,\" with Iranian state media reporting missiles near the Gulf island of Qeshm and in Bandar Abbas and Bushehr, the site of a nuclear power plant. Tehran said it had hit U.S. bases in Jordan, Kuwait and Bahrain and warned that the Strait of Hormuz, which it has effectively blocked, is a \"red line,\" while Reuters reported Iran had told Yemen's Houthis to close the Red Sea if Washington strikes its power grid. The White House said President Trump remained open to talks even as he threatened to bomb Iranian bridges and power plants unless Tehran returns to negotiations.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c151gdjwd10o"
      },
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMinwFBVV95cUxOYXFnZWtOU1NXb01HY2FxbTBsUmJqNDlaa3NORmpyZ0pYVzhSVFZkaUNYTjczY0E1YjhpR1F1OGRoT3dJNnVTMjVuUGJyamVCckJwMi1WY0hJR2NyVGQ0ZDdzbF9LMzgteGZDRGtMd0ZQV211YWF3cHpYLWdhTXZjTXVhTG1zRkRmR3Q1NVdQRWNEb2xhZU0zRTFodmM4ZXc?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/iran-hormuz-new-strikes.png",
      "alt": "A vessel in the Strait of Hormuz, the contested waterway at the centre of the U.S.-Iran confrontation.",
      "credit": "Reuters via BBC"
    },
    "lead": true,
    "rank": 1,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 480 B.C. a Persian empire and a defiant Greek coalition fought for control of a single narrow waterway, the strait between the island of Salamis and the Attic mainland. The Athenian commander Themistocles deliberately lured the far larger Persian fleet of Xerxes into the cramped channel, reasoning that in a confined strait numbers and size counted for less and that the crowded enemy would foul its own oars. The Persian armada, jammed into the narrows and thrown into confusion, was shattered by the disciplined Greek line. It is the ancestor of every chokepoint battle since: a smaller power turning geography into a weapon against a mightier navy. The confrontation now unfolding at the Strait of Hormuz, where Iran treats the twenty-mile-wide passage as a 'red line' and bets that a narrow sea can neutralize American firepower, replays the same ancient logic of the strait as equalizer.",
        "excerpt": "in the first place, as we shall fight in a narrow sea with few ships against many, if the war follows the common course, we shall gain a great victory; for to fight in a narrow space is favourable to us - in an open sea, to them.",
        "source": "Herodotus, The Histories, Book VIII (the Battle of Salamis and Themistocles' counsel), trans. George Rawlinson; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_8",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a0.png",
          "alt": "Ancient marble herm portrait of the Athenian statesman and admiral Themistocles",
          "credit": "Roman marble herm of Themistocles, after a 5th-century B.C. Greek original, Museo Ostiense, Ostia; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "The last time the United States and Iran fought openly for the Strait of Hormuz was Operation Praying Mantis on 18 April 1988, during the Tanker War phase of the Iran-Iraq conflict. After the frigate USS Samuel B. Roberts nearly sank on an Iranian mine, U.S. warships and carrier aircraft struck Iranian oil platforms and, in a running battle, crippled or sank several Iranian vessels, including the frigate Sahand, which was left ablaze and gutted by bombs and missiles. It remains the U.S. Navy's largest surface engagement since the Second World War and the only time it has exchanged surface-to-surface missile fire, and it was fought precisely to keep the Gulf's oil arteries open. The present crisis, with U.S. Central Command striking Iran for a sixth straight night and Tehran threatening to close the strait, is the same duel over freedom of navigation escalated to a far higher pitch. The burning hull of the Sahand is the visual memory Washington and Tehran both carry into this fight.",
        "excerpt": "On 18 April 1988 U.S. naval and air forces struck Iranian targets in the Persian Gulf in retaliation for the mining of the frigate USS Samuel B. Roberts; in the ensuing action the Iranian frigate Sahand was bombed and set afire, photographed burning from stem to stern in the largest U.S. Navy surface battle since 1945. The engagement was a direct fight over the shipping lanes of the Strait of Hormuz, foreshadowing today's confrontation over the same chokepoint.",
        "source": "U.S. Navy / Naval History and Heritage Command, Operation Praying Mantis, 18 April 1988; official DoD photograph DN-SN-89-03125.",
        "href": "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Iranian_frigate_Sahand_burning_after_air_attack_Operation_Praying_Mantis_DN-SN-89-03125.jpg",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a1.png",
          "alt": "Aerial view of the Iranian frigate Sahand burning after a U.S. air attack in the Persian Gulf, 1988",
          "credit": "U.S. Navy photograph, Iranian frigate Sahand burning during Operation Praying Mantis, 18 April 1988 (DN-SN-89-03125); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Aeschylus, who had himself fought the Persians, staged 'The Persians' in 472 B.C. and told the story of Salamis from the losers' side, as grief inside the royal court at Susa. A messenger arrives to describe how the Persian fleet, packed into the narrows, could give no ship room to help another, smashed its own oars, and was hemmed in and battered until the sea vanished beneath wrecks and the dead. The queen mother Atossa and the chorus can only cry out at the hateful name of Salamis. It is the oldest surviving war play in the world, and its lesson is that a proud empire's numbers become a trap in a narrow sea. As Iran wagers that the confined waters of Hormuz can swallow a superior fleet and Washington threatens ever heavier blows, Aeschylus supplies the tragic script of a great power undone in a strait.",
        "excerpt": "the time brooked no delay, but instantly ship dashed against ship its bronze-sheathed beak. It was a ship of Hellas that began the charge and sheared off entire the curved stern of a Phoenician barque. Each captain drove his ship straight against some other ship. At first, indeed, the stream of the Persian armament held its own; but when the mass of our ships had been crowded in the narrows, and none could render another aid, and each crashed its bronze-faced beak against each of its own line, the shivered their whole array of oars; while the Hellenic galleys, not heedless of their chance, hemmed them in and battered them on every side. The hulls of our vessels rolled over and the sea was hidden from our sight, strewn as it was with wrecks and slaughtered men.",
        "source": "Aeschylus, The Persians, trans. Herbert Weir Smyth (Loeb Classical Library, 1922/1926 edition, Vol. I); Wikisource.",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/The_Persians",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a2.png",
          "alt": "The Lenormant Relief, an ancient marble carving of an Athenian trireme with rows of oarsmen",
          "credit": "The Lenormant Relief, marble votive relief of an Athenian trireme, c. 410 B.C., Acropolis Museum, Athens; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Book VII of his Histories, Herodotus tells how Xerxes, marching to invade Greece, bridged the Hellespont, the strait dividing Asia from Europe, only to see a storm tear his bridges apart. Enraged, the king ordered the water itself given three hundred lashes and a set of fetters flung into it, while his men shouted that the 'bitter water' would be crossed whether it willed or not. It is antiquity's defining image of imperial hubris: a ruler who believes a strategic waterway can be beaten and chained into submission, and who beheads the engineers who failed him. The story shadows today's brinkmanship at Hormuz, where Iran vows to seal the strait and President Trump threatens to bomb bridges and power plants unless Tehran yields. Herodotus warns that the sea does not take orders, and that treating a strait as something to be scourged into obedience is the mark of a power overreaching toward its own downfall.",
        "excerpt": "So when Xerxes heard of it he was full of wrath, and straightway gave orders that the Hellespont should receive three hundred lashes, and that a pair of fetters should be cast into it. Nay, I have even heard it said that he bade the branders take their irons and therewith brand the Hellespont. It is certain that he commanded those who scourged the waters to utter, as they lashed them, these barbarian and wicked words: \"Thou bitter water, thy lord lays on thee this punishment because thou hast wronged him without a cause, having suffered no evil at his hands. Verily King Xerxes will cross thee, whether thou wilt or no. Well dost thou deserve that no man should honour thee with sacrifice; for thou art of a truth a treacherous and unsavoury river.\" While the sea was thus punished by his orders, he likewise commanded that the overseers of the work should lose their heads.",
        "source": "Herodotus, The Histories, Book VII, section 35, trans. George Rawlinson; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_History_of_Herodotus_(Rawlinson)/Book_7",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a3.png",
          "alt": "Illustration of Xerxes' men whipping the waters of the Hellespont on the king's orders",
          "credit": "Xerxes ordering the Hellespont to be scourged, illustration from a 1909 print; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Wilhelm von Kaulbach's monumental 1868 fresco 'The Battle of Salamis,' painted for the Maximilianeum in Munich, freezes the ancient strait battle at its climax of chaos and rout. Greek triremes drive into a churning tangle of foundering Persian ships while, high on a shoreline throne, Xerxes watches his fleet destroyed beneath him, a study in imperial power humbled by a narrow sea. The vast canvas turns a chokepoint into a stage for the collision of empire and defiant liberty, exactly the drama now playing out in the Gulf. As the United States and Iran battle for control of the Strait of Hormuz, Kaulbach's image reads as a warning painted in oil: fleets funneled into a strait can become a spectacle of catastrophe. The distant, helpless figure of the king surveying his losses is the oldest picture of brinkmanship gone wrong.",
        "excerpt": "A sweeping panoramic battle scene: Greek triremes ram and overwhelm the crowded Persian fleet in the narrow strait of Salamis, ships splintering amid drowning sailors and drifting wreckage, while Xerxes, enthroned on the heights at the right, looks on in impotent fury as his armada is annihilated below him. Kaulbach stages the chokepoint as high tragedy, the confined water crammed with wreckage and the sea itself lost beneath the dead.",
        "source": "Wilhelm von Kaulbach, Die Seeschlacht bei Salamis (The Battle of Salamis), 1868, oil/fresco, Maximilianeum (Bavarian Landtag), Munich.",
        "href": "https://commons.wikimedia.org/wiki/File:Kaulbach,_Wilhelm_von_-_Die_Seeschlacht_bei_Salamis_-_1868.JPG",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a4.png",
          "alt": "Wilhelm von Kaulbach's 1868 painting of the Battle of Salamis, Greek and Persian fleets clashing in the strait",
          "credit": "Wilhelm von Kaulbach, 'Die Seeschlacht bei Salamis' (The Battle of Salamis), 1868, Maximilianeum, Munich; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "George Frideric Handel's opera 'Serse' (Xerxes), first staged in London in 1738, takes as its title character the very Persian king who bridged and whipped the Hellespont, opening with the famous aria 'Ombra mai fu' as Xerxes sings tenderly to a plane tree before his imperial ambitions unravel. Handel's audience knew Xerxes as the archetype of the conqueror who tried to master a strait and lead a vast empire against a smaller free people, and the opera plays his grandeur against his folly. That figure of Persian majesty overreaching itself is precisely the historical echo behind the current standoff, in which Iran, heir to that Persian world, makes the Strait of Hormuz its 'red line' against American power. The score turns the Xerxes story into music, a reminder of how long the Western imagination has framed a Persian sovereign's contest with the sea and with empire. Its very existence, a Baroque hit built on the sea-defying king, shows how deeply the theme of Persia and the contested strait runs through European art.",
        "excerpt": "Handel's opera seria in three acts opens with the celebrated arioso 'Ombra mai fu,' Xerxes' serene praise of a shady plane tree, before the drama of the imperious Persian king plays out; the music casts the historical sovereign, remembered for bridging and scourging the Hellespont, as a figure of both splendor and self-defeating pride. The opera's survival as one of Handel's best-loved works keeps the image of Persia's strait-defying monarch alive in the concert hall.",
        "source": "George Frideric Handel, Serse (Xerxes), HWV 40, opera in three acts, libretto after Silvio Stampiglia, first performed London, 15 April 1738; score and libretto at IMSLP.",
        "href": "https://imslp.org/wiki/Serse,_HWV_40_(Handel,_George_Frideric)",
        "image": {
          "src": "/covers/iran-hormuz-new-strikes--a5.png",
          "alt": "Title page of the 1738 London libretto of Handel's opera Serse (Xerxes)",
          "credit": "Title page of the libretto of Handel's opera 'Serse' (Xerxes), London, 1738; Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "congo-ebola-hospital-attack",
    "headline": "Ebola patients flee and aid workers evacuate after a deadly attack on a treatment centre in eastern Congo",
    "overview": "Humanitarian workers were evacuated early Thursday after violence erupted overnight at the Nyakunde General Hospital Ebola treatment centre in Congo's Ituri province, the epicentre of an outbreak that has killed more than 220 people. The unrest began after a pregnant woman with severe anaemia died at the hospital, prompting angry community members to storm the centre and exchange gunfire; several Ebola patients are believed to have fled, and staff from the aid group Samaritan's Purse withdrew. It is the latest in a series of attacks on health facilities that have repeatedly set back efforts to contain the epidemic.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwgFBVV95cUxNMWQ1bGpYa08xNndqZ1dhNW9WZHJKRkpwa1d1emg4ckVuTVloWVcweTJiX3RxMExGWVB2NjI1b1pxT0daVzVqN0p5UFA5ZUg0bGdpSXVPcTNwdlZVZXdwXzFULUs2Zk1DQUhEWUtQaTd2TEdmMkFLaEdBX0d4WWlIMVBNREV6WE5JUjVxMWl2S3hJNXNvS1dTN2lGaEZvdUNVN1A2aUlDZlNEQTlPSHZUREVXZzFQZWtDb09zb0tabWxQZw?oc=5"
      },
      {
        "name": "The Jerusalem Post",
        "href": "https://www.jpost.com/international/article-902783"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/congo-ebola-hospital-attack.png",
      "alt": "Health workers in protective suits outside an Ebola treatment centre.",
      "credit": "The Jerusalem Post"
    },
    "rank": 2,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Twenty-four centuries before Nyakunde, Thucydides watched the same collapse unfold when plague broke over Athens during the Peloponnesian War. He noted first that the doctors were of no use and in fact died fastest of all, because they were the ones who kept going to the sick, exactly as the Samaritan's Purse workers fleeing the Ituri treatment centre knew the risk of every bedside. He described bodies heaped upon bodies, the dying reeling through the streets toward the fountains, and the sacred places choked with corpses no one dared to bury. Above all he recorded what fear does to a community: that neither fear of the gods nor any law of man was left to restrain people once they believed death was coming for them anyway. It is the oldest lesson in epidemics, and the crowd that stormed the Ebola centre after a pregnant woman died proves it still holds: when the sick outnumber the healers and terror takes hold, the social contract that lets medicine function is the first thing to break.",
        "excerpt": "Neither were the physicians at first of any service, ignorant as they were of the proper way to treat it, but they died themselves the most thickly, as they visited the sick most often. ... The bodies of dying men lay one upon another, and half-dead creatures reeled about the streets and gathered round all the fountains in their longing for water. The sacred places also in which they had quartered themselves were full of corpses of persons that had died there, just as they were. ... Fear of gods or law of man there was none to restrain them.",
        "source": "Thucydides, History of the Peloponnesian War, Book II, 47–53 (the Plague of Athens), trans. Richard Crawley.",
        "href": "http://classics.mit.edu/Thucydides/pelopwar.2.second.html",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a0.png",
          "alt": "Michiel Sweerts, 'Plague in an Ancient City' (c. 1652–54), thought to depict the Plague of Athens: the dead and dying strewn across the steps of a stricken city.",
          "credit": "Michiel Sweerts, 'Plague in an Ancient City' (c. 1652–54), Los Angeles County Museum of Art (LACMA), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "When cholera reached Paris in the spring of 1832, the poet Heinrich Heine watched the city turn not on the disease but on imagined culprits, and his eyewitness dispatch reads like a premonition of Ituri. As the dead were buried faster than the panic could be explained, a rumour spread that people were not dying of cholera at all but being poisoned, and the mob went hunting for anyone carrying a suspicious powder. Heine saw men torn apart in the street for possessing what turned out to be camphor or chlorine, the very remedies against the plague, their bodies dragged along to shouts of 'There goes the cholera!' The parallel to the Nyakunde treatment centre is exact: a community convinced that the healers and their strange substances are the true killers, and a death that becomes the spark for lethal violence. In 1832 as in 2026, the epidemic's deadliest byproduct was mistrust, and the innocent — doctors, aid workers, the wrongly accused — paid for it. Heine's grim moral was that the terror the authorities themselves had sown came back as a riot of the dead.",
        "excerpt": "When the emeute of the chiffoniers was suppressed, and as the cholera did not take hold so savagely ... there rose all at once a rumour that many of those who had been so promptly buried had died not from disease but by poison. ... In the Rue Vaugirard, where two men were killed because certain white powders were found on them, I saw one of the wretches, while he was still in the death-rattle, and at the time old women plucked the wooden shoes from their feet and beat him on the head till he was dead. He was naked and beaten and bruised, so that his blood flowed; they tore from him not only his clothes, but also his hair, and cut off his lips and nose; and one blackguard tied a rope to the feet of the corpse and dragged it through the streets, crying out, \"Voilà le cholera-morbus!\"",
        "source": "Heinrich Heine, French Affairs: Letters from Paris, Letter VI (dated 19 April 1832), trans. Charles Godfrey Leland, in The Works of Heinrich Heine, Vol. 7.",
        "href": "https://en.wikisource.org/wiki/The_Works_of_Heinrich_Heine/Vol._7/Letter_6",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a1.png",
          "alt": "Alfred Rethel's woodcut 'Death the Strangler' (1851): Death fiddling on bones as revellers collapse, depicting the first outbreak of cholera at a Paris masked ball in 1831.",
          "credit": "Alfred Rethel, 'Der Tod als Würger' ('Death the Strangler'), 1851, depicting the 1831 Paris cholera outbreak, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Boccaccio opened the Decameron with an unflinching account of the Black Death in Florence in 1348, and its central horror is precisely the one now playing out in Ituri: contagion that dissolves the bonds meant to hold a community together. He describes how the mere touch of a sick person's clothing seemed to carry death, so that terror hollowed out every human tie until brother abandoned brother and even parents refused to tend their own children. His seven young narrators respond exactly as the panicked crowd and the fleeing Ebola patients do — by scattering, walling themselves off, choosing distance as the only defence they understand. What Boccaccio grasped, and what Nyakunde reenacts, is that a plague is never only a medical event; it is a social solvent that turns care into risk and neighbours into threats. When aid workers evacuate and patients flee into the bush rather than trust a treatment centre, they are re-staging the Florentine catastrophe Boccaccio set down almost seven hundred years ago.",
        "excerpt": "Indeed, leaving be that townsman avoided townsman and that well nigh no neighbour took thought unto other and that kinsfolk seldom or never visited one another and held no converse together save from afar, this tribulation had stricken such terror to the hearts of all, men and women alike, that brother forsook brother, uncle nephew and sister brother and oftentimes wife husband; nay (what is yet more extraordinary and well nigh incredible) fathers and mothers refused to visit or tend their very children, as they had not been theirs.",
        "source": "Giovanni Boccaccio, The Decameron, Introduction (Proem) to the First Day, trans. John Payne (1886), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/23700/23700-h/23700-h.htm",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a2.png",
          "alt": "Luigi Sabatelli's etching of the plague of Florence in 1348, a scene from Boccaccio's Decameron: the dead and dying sprawled amid the living in the streets.",
          "credit": "Luigi Sabatelli the Elder, 'The plague of Florence, 1348; a scene from Boccaccio's Decameron' (etching). Wellcome Collection, London, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Daniel Defoe's 'A Journal of the Plague Year' reconstructs London's great plague of 1665 as a chronicle of quarantine and the violence it breeds — the same collision between public-health control and human fear that detonated at the Ituri treatment centre. Defoe details how infected houses were shut up by law, marked with a red cross, and guarded day and night by watchmen whose job was to make sure no one went in or out. And he records what confinement did to people: they committed violences against the watchmen, broke out by force in many places, and devised endless stratagems to escape. That is the dynamic behind every attack on an Ebola facility — the quarantine that medicine requires is experienced by the frightened as imprisonment, and the guards and healers become the enemy. When patients fled the Nyakunde centre under gunfire, they were doing what Defoe's Londoners did three and a half centuries ago: choosing the open contagion of flight over the terror of being locked away with the disease.",
        "excerpt": "That to every infected house there be appointed two watchmen, one for every day, and the other for the night; and that these watchmen have a special care that no person go in or out of such infected houses ... several violences were committed and injuries offered to the men who were set to watch the houses so shut up; also several people broke out by force in many places, as I shall observe by-and-by.",
        "source": "Daniel Defoe, A Journal of the Plague Year (1722), Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/376/376-h/376-h.htm",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a3.png",
          "alt": "A colour wood engraving of a London street during the Great Plague of 1665, with a death cart and the cry 'Bring out your dead'.",
          "credit": "Edmund Evans (engraver), 'A street during the plague in London with a death cart' (colour wood engraving). Wellcome Collection, London, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder's 'The Triumph of Death' (c. 1562) is the definitive image of a society overrun by mortality, and it speaks directly to a treatment centre stormed in the dark by a terrified crowd. Across a scorched landscape, armies of skeletons drive the living toward a great trap, and no rank, remedy, or refuge offers protection — kings, mothers, and the sick are herded together toward the same end. There is no space in Bruegel's world for the careful, sterile order that an Ebola ward depends on; there is only panic, flight, and the machinery of death grinding through every human institution. That is what the attack at Nyakunde threatens to make real: the moment fear overwhelms containment, the fragile island of medicine is swept into the general chaos. Bruegel painted the nightmare that public-health workers spend their lives trying to hold back, and every assault on a clinic is a small victory for the procession he depicted.",
        "excerpt": "Bruegel fills the panel with a vast, panoramic army of skeletons sweeping across a blasted, smoke-darkened land. The living are driven in terror toward a coffin-lidded trap; a cart of skulls rolls forward, a king's gold spills uselessly, and a woman falls beneath the scythe. Nothing — wealth, prayer, love, or flight — halts the advance, and the whole ordered world of the living is shown dissolving into rout and ruin.",
        "source": "Pieter Bruegel the Elder, 'The Triumph of Death', oil on panel, c. 1562. Museo del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Triumph_of_Death_-_WGA3389.jpg",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a4.png",
          "alt": "Pieter Bruegel the Elder, 'The Triumph of Death' (c. 1562): armies of skeletons overrunning a blasted landscape as the terrified living are herded toward death.",
          "credit": "Pieter Bruegel the Elder, 'The Triumph of Death' (c. 1562), Museo del Prado, Madrid, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Arnold Böcklin's 'The Plague' (Die Pest, 1898) reimagines pestilence as a winged reaper riding a dragon-like beast low through the streets of a town, scattering the living as it passes. Painted after Böcklin's own encounters with epidemic disease, it captures the specific terror that grips eastern Congo: contagion as an unseen, unstoppable predator that turns a place of life into a place of flight. Bodies fall in the narrow street below while those still standing recoil in helpless panic, exactly the scene reported from Nyakunde as patients bolted and aid workers evacuated into the night. Böcklin refuses any comforting distance; the pestilence is right there, at street level, among ordinary people who have no defence. It is the emotional truth underneath the news dispatch — the moment a community realises the horror has entered its own streets and that medicine, for now, has lost control of it.",
        "excerpt": "A skeletal figure of Death, black-winged, rides a hunched reptilian beast down a shadowed medieval street. Its breath seems to fell the townsfolk as it passes: a woman lies sprawled across the cobbles in the foreground while others flee or collapse in terror. Rendered in bruised greens and sickly ochres, the image makes the plague a living, airborne predator moving unstoppably through the heart of the town.",
        "source": "Arnold Böcklin, 'Die Pest' ('The Plague'), tempera on fir wood, 1898. Kunstmuseum Basel.",
        "href": "https://commons.wikimedia.org/wiki/File:Arnold_B%C3%B6cklin_-_Die_Pest.jpg",
        "image": {
          "src": "/covers/congo-ebola-hospital-attack--a5.png",
          "alt": "Arnold Böcklin, 'The Plague' (1898): a black-winged figure of Death riding a dragon-like beast down a town street as inhabitants fall and flee.",
          "credit": "Arnold Böcklin, 'Die Pest' ('The Plague'), 1898, Kunstmuseum Basel, via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "algeria-foster-home-fire",
    "headline": "A fire at a state children's home near Algiers kills 11, including children, and injures 19",
    "overview": "A blaze tore through the Childhood Relief Institution, a state-run care home for orphans, abandoned minors and children with special needs, in Mohammadia east of Algiers early Thursday, killing 11 people, among them children, and injuring 19, Algeria's civil protection service said. Firefighters were called at about 3:30 a.m. and rescued five children with reduced mobility; the cause has not been announced. President Abdelmadjid Tebboune said he received the news \"with deep sorrow\" as the country swelters through a heatwave that has fuelled nearly 1,000 fires in a week.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cvgwd4nz344o"
      },
      {
        "name": "Al Jazeera",
        "href": "https://www.aljazeera.com/news/2026/7/16/fire-at-orphanage-in-algeria-kills-11-people-including-children"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/algeria-foster-home-fire.png",
      "alt": "Firefighters direct hoses at a building fire against the night sky.",
      "credit": "Algeria General Directorate for Civil Protection via BBC"
    },
    "rank": 3,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When fire tore through the Childhood Relief Institution in Mohammadia, killing eleven people and children among them as they slept, it revived the oldest urban terror in the Western record: the great conflagration that consumed Rome in July of A.D. 64. The historian Tacitus, writing of that inferno, dwells not on the toppled temples but on the human beings trapped inside the flames, and above all on the weakest of them. He names the terror of women, the slowness of the aged, and, most piercingly, 'the helpless inexperience of childhood' as the fire outran every attempt to flee. Nearly two thousand years later, the five children with reduced mobility carried out of the Algiers care home belong to that same category of the helpless, wholly dependent on others to rescue them. As Algeria burns through a heatwave that has kindled roughly a thousand fires in a week, Tacitus's account is a reminder that a city's, or a state's, greatness is measured less by its monuments than by whether it can shield those who cannot save themselves. His suspicion that the Roman fire may have been no accident but the work of negligence or design also shadows the still-unexplained cause of Thursday's blaze.",
        "excerpt": "Added to this were the wailings of terror-stricken women, the feebleness of age, the helpless inexperience of childhood, the crowds who sought to save themselves or others, dragging out the infirm or waiting for them, and by their hurry in the one case, by their delay in the other, aggravating the confusion.",
        "source": "Tacitus, The Annals, Book XV (on the Great Fire of Rome, A.D. 64), trans. Alfred John Church and William Jackson Brodribb (public domain).",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_15",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a0.png",
          "alt": "Hubert Robert's painting of the Great Fire of Rome, flames engulfing classical buildings as crowds flee.",
          "credit": "Hubert Robert, 'The Fire of Rome' (c. 1785), Musee d'Art moderne Andre Malraux, Le Havre; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "The modern conscience learned to grieve for the innocent burned in institutions of care and labor on 25 March 1911, when fire swept the Triangle Shirtwaist Factory in New York and killed 146 workers, most of them young immigrant women and girls locked behind doors they could not open. The United Press reporter William Shepherd watched from the street below and telephoned his dispatch as bodies fell, giving the nation a first-hand account of a preventable horror. His words, counting the dead by the sound of their impact, made negligence audible in a way official reports never could. The fire at the Childhood Relief Institution near Algiers carries the same charge of institutional failure: a state facility meant to protect orphans and children with special needs became, instead, the place where eleven of them died and nineteen were hurt. Triangle turned public outrage into fire codes, exits, and inspections, the very safeguards whose absence turns a building full of dependents into a trap. That a home for the most vulnerable could still burn in 2026 measures how far the promise won in 1911 has yet to reach.",
        "excerpt": "I learned a new sound--a more horrible sound than description can picture. It was the thud of a speeding, living body on a stone sidewalk. Thud-dead, thud-dead, thud-dead, thud-dead. Sixty-two thud-deads. I call them that, because the sound and the thought of death came to me each time, at the same instant.",
        "source": "William G. Shepherd, 'Eyewitness at the Triangle,' United Press dispatch on the Triangle Shirtwaist Factory fire, first published 27 March 1911; Kheel Center, Cornell University ILR School.",
        "href": "https://trianglefire.ilr.cornell.edu/primary/testimonials/ootss_WilliamShepherd.html",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a1.png",
          "alt": "Firemen train hoses on the burning Asch Building during the Triangle Shirtwaist Factory fire, 25 March 1911.",
          "credit": "Photograph of the Triangle Shirtwaist Factory fire, New York, 25 March 1911; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "No writer bound the soot of childhood to the negligence of adults more tightly than William Blake, whose 'The Chimney Sweeper' from Songs of Innocence (1789) speaks in the voice of a boy sold into labor and soot after his mother's death. In the poem the sweepers dream of thousands of children 'lock'd up in coffins of black,' freed only by an angel into a green plain of light, a vision of deliverance set against the cruelty that surrounds them. Read after a fire that killed children in a state care home outside Algiers, Blake's image of the young shut in blackness is unbearably literal, and his closing line about duty cuts the other way against the institutions that failed them. The Childhood Relief Institution existed precisely to gather the parentless and the disabled that society had otherwise abandoned, the same children Blake insisted had a claim on the conscience of the powerful. His pairing of innocence with soot, smoke, and premature death frames the mourning now underway in Mohammadia. That five children of reduced mobility were carried out alive is the nearest thing this story has to Blake's angel with the bright key.",
        "excerpt": "And so he was quiet, & that very night,\nAs Tom was a sleeping he had such a sight,\nThat thousands of sweepers Dick, Joe, Ned & Jack\nWere all of them lock'd up in coffins of black.\n\nAnd by came an Angel who had a bright key\nAnd he open'd the coffins & set them all free,\nThen down a green plain leaping laughing they run\nAnd wash in a river and shine in the Sun.",
        "source": "William Blake, 'The Chimney Sweeper,' Songs of Innocence (1789), from Songs of Innocence and of Experience (copy Z, 1826), Library of Congress (public domain).",
        "href": "https://en.wikisource.org/wiki/Songs_of_Innocence_and_of_Experience_(1826)/Songs_of_Innocence/The_Chimney_Sweeper",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a2.png",
          "alt": "William Blake's hand-coloured plate of 'The Chimney Sweeper' from Songs of Innocence.",
          "credit": "William Blake, 'The Chimney Sweeper' plate, Songs of Innocence and of Experience, copy L (1795); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The grief of a parent who cannot be consoled for lost children has its founding expression in the prophet Jeremiah, whose verse the Gospels later attached to the slaughter of the innocents. In it Rachel weeps for her children and refuses all comfort 'because they were not,' a cry that has served for millennia as the voice of every community mourning its young. The fire near Algiers, which killed children in the very place charged with their keeping, summons that ancient lament with terrible aptness, for these were orphans, the parentless whom scripture repeatedly commands the community to protect. Rachel's refusal to be comforted honors the truth that some losses are not softened by reason or by rescue statistics, only witnessed. As Algeria counts its dead amid a week of a thousand fires, the verse offers not consolation but the dignity of unashamed grief. It also indicts every negligence that fails the fatherless, the failure the cause of Thursday's blaze may yet reveal.",
        "excerpt": "Thus saith the LORD; A voice was heard in Ramah, lamentation, and bitter weeping; Rahel weeping for her children refused to be comforted for her children, because they were not.",
        "source": "The Bible, King James Version, Jeremiah 31:15 (public domain).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jeremiah",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a3.png",
          "alt": "A painting of Rachel weeping and refusing to be comforted for her lost children.",
          "credit": "'Rachel Weeping for her Children'; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "J. M. W. Turner witnessed the Houses of Parliament burn on the night of 16 October 1834 and turned the catastrophe into one of the most overwhelming fire paintings in Western art, a wall of flame and smoke swallowing the London sky above the Thames. He renders fire not as detail but as an engulfing force before which human structures and human plans dissolve, the crowds on the bank reduced to helpless spectators. That vision speaks directly to the scene at the Childhood Relief Institution, where a state building meant to shelter the vulnerable was overtaken by a blaze whose cause is still unknown. Turner painted amid an era newly anxious about conflagration and public safety, much as Algeria now reckons with a heatwave that has ignited roughly a thousand fires in a single week. The sublime terror of his canvas, beauty and destruction fused, mirrors how a fire can be at once spectacle and unbearable loss. Against such an inferno, the rescue of five immobile children reads as a small, hard-won mercy.",
        "excerpt": "Turner's canvas turns a real disaster into a towering vision of fire as an elemental power, flames and smoke blazing over the river while the ruined buildings collapse into light. Tiny onlooking figures crowd the foreground, dwarfed and powerless before the blaze. The painting captures the terrible sublimity of a conflagration that consumes an institution at the heart of public life.",
        "source": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, 16 October 1834' (c. 1835), oil on canvas, Philadelphia Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner%2C_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons%2C_October_16%2C_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a4.png",
          "alt": "Turner's painting of the Houses of Parliament ablaze at night, a vast sheet of orange flame and smoke rising over the Thames as crowds watch from the riverbank.",
          "credit": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, 16 October 1834' (c. 1835), Philadelphia Museum of Art, via Google Art Project / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Giotto's 'Lamentation (The Mourning of Christ),' painted around 1305 in the Scrovegni Chapel in Padua, is the image that taught European art how to grieve, gathering mourners around a lifeless body in a circle of raw and human sorrow. The Virgin cradles her dead son face to face while attendants bend low and angels wheel overhead in open anguish, grief made unbearably intimate rather than ceremonial. That composition presses on the mourning now unfolding in Mohammadia, where families and a whole nation bend over the loss of eleven people, children among them, taken by fire in a home meant to keep them safe. Giotto insists that each death is a person to be held and wept for, not a number in a casualty count, and that dignity is exactly what the orphans of the Childhood Relief Institution are owed. The scene's tenderness toward the defenseless answers a story about society's duty to those in its care. In a week when Algeria is ringed by a thousand fires, his frozen circle of grief gives shape to a sorrow words strain to carry.",
        "excerpt": "Giotto arranges the mourners in a tight ring of grief around the dead body, the Virgin drawing her son's face to hers while stooping figures and wheeling, weeping angels give sorrow its full human weight. Faces and gestures register raw, individual pain rather than formal ritual. The fresco marks the moment Western painting learned to mourn its dead as beloved persons.",
        "source": "Giotto di Bondone, 'Lamentation (The Mourning of Christ)' (c. 1305), fresco, Scrovegni (Arena) Chapel, Padua.",
        "href": "https://commons.wikimedia.org/wiki/File:Giotto_-_Scrovegni_-_-36-_-_Lamentation_%28The_Mourning_of_Christ%29_adj.jpg",
        "image": {
          "src": "/covers/algeria-foster-home-fire--a5.png",
          "alt": "Giotto fresco of mourners gathered closely around the dead body of Christ, the Virgin cradling his head while angels grieve overhead against a blue sky.",
          "credit": "Giotto di Bondone, 'Lamentation (The Mourning of Christ)' (c. 1305), Scrovegni Chapel, Padua, via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "nicaragua-italy-ties-cut",
    "headline": "Nicaragua severs diplomatic relations with Italy amid a row over extraditing a Red Brigades fugitive in the Aldo Moro case",
    "overview": "Nicaragua announced it was breaking off all diplomatic ties with Italy after Foreign Minister Antonio Tajani renewed demands for the extradition of Alessio Casimirri, a former Red Brigades militant who took part in the 1978 kidnapping and murder of ex-premier Aldo Moro and now lives as a restaurateur in Managua. Managua cited Tajani's \"unjustified, aggressive and irresponsible declarations\" and accused him of \"European arrogance,\" while Tajani, speaking at a European People's Party summit in Madrid, vowed Italy would not stop pressing for Casimirri to face justice. Casimirri is the only member of the via Fani commando never arrested.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitwFBVV95cUxNbGRUVHBFUEd6aS1WM28yVHk0ZlJRcUtoMm5CQ2lRYk5tZFlKaElqT3ZBUFlYbFFxd2ZwelRINWtDbkhiUnVtOGxkTjBZVnBOejJPZy1fdEstdUpQWVdJeTNtS04zdXdWYlMxSlU1RlJueGV1MDVxYS1JZjd2TzdOYXhpQU93YzRYR0tlRjI3SGNRcmtLcThrLWR0TmRHM2k4eE5yZF8yWDdzdFhfV29GdXU1RFNDdFk?oc=5"
      },
      {
        "name": "ANSA",
        "href": "https://www.ansa.it/english/news/politics/2026/07/16/tajani-stands-his-ground-after-nicaragua-says-its-breaking-off_402851c5-4d48-4ba6-840b-a5fbf5cf89b6.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/nicaragua-italy-ties-cut.png",
      "alt": "A 1970s-era street in Rome evoking the years of the Aldo Moro kidnapping.",
      "credit": "ANSA"
    },
    "rank": 4,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Tajani demanded that Managua surrender Alessio Casimirri, Nicaragua answered not with a warrant but with the ancient logic of asylum—the same logic that once carried Themistocles, the Athenian who had shattered Persia's fleet at Salamis, to the doorstep of the Persian king. Condemned and hunted at home, the great commander threw himself on the mercy of the very empire he had defeated, and Artaxerxes, valuing a useful guest over his enemies' grievances, took him in and kept him from royal revenues. Casimirri, the last via Fani gunman never brought to trial, has likewise made a second life under a foreign sun, running a Managua restaurant while Rome's demands go unanswered. In each case a nation shelters the man another nation wants most, and reads the extradition demand as arrogance rather than justice. Thucydides preserved the fugitive's own words of appeal, and they still describe the bargain of exile: safety abroad in exchange for a story the host wishes to hear. Twenty-five centuries later, the sanctuary holds and the crime goes unpunished.",
        "excerpt": "I, Themistocles, am come to you, who did your house more harm than any of the Hellenes, when I was compelled to defend myself against your father's invasion—harm, however, far surpassed by the good that I did him during his retreat, which brought no danger for me but much for him. For the past, you are a good turn in my debt—[here he mentioned the warning sent to Xerxes from Salamis to retreat, as well as his finding the bridges unbroken, which, as he falsely pretended, was due to him]—for the present, able to do you great service, I am here, pursued by the Hellenes for my friendship for you. However, I desire a year's grace, when I shall be able to declare in person the objects of my coming.",
        "source": "Thucydides, History of the Peloponnesian War, Book 1.137 (Themistocles' letter to King Artaxerxes), translated by Richard Crawley (1874).",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_1",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a0.png",
          "alt": "Roman-era portrait herm of Themistocles, a copy of a 5th-century BC Greek original, in the Museo Archeologico Ostiense, Ostia.",
          "credit": "Photograph by Sailko of the bust of Themistocles (Roman copy after a 5th-century BC Greek original), Museo Archeologico Ostiense, Ostia. Licensed CC BY 3.0."
        }
      },
      {
        "category": "historical",
        "title": "Aldo Moro was seized on via Fani, held for fifty-five days, and shot—a statesman destroyed by political violence and, in Casimirri's case, never avenged. Rome had rehearsed that wound long before, when Tiberius Gracchus, tribune and reformer, was clubbed to death on the Capitol by a mob of senators and their clients. Plutarch records that above three hundred fell that day, and that the killers denied the tribune's own brother the simple mercy of burying the body, flinging it instead into the Tiber. The murderers were men of the state, and no reckoning followed; the crime was absorbed into politics and left unpaid. That is the grievance now animating Italy's rupture with Nicaragua—a killing whose last perpetrator dines freely while the victim's memory waits on a justice that never comes. The Gracchan precedent is the oldest lesson of the Moro case: a republic can lose a man to violence and then lose the reckoning too.",
        "excerpt": "of the rest there fell above three hundred killed by clubs and staves only, none by an iron weapon... they would not suffer his own brother, though he earnestly begged the favour, to bury him in the night, but threw him, together with the other corpses, into the river.",
        "source": "Plutarch, Life of Tiberius Gracchus, translated by John Dryden.",
        "href": "https://classics.mit.edu/Plutarch/tiberius.html",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a1.png",
          "alt": "Engraving of the murder of Tiberius Gracchus, beaten with clubs by senators on the Capitol.",
          "credit": "Ludwig Gottlieb Portman after Jacobus Buys, Murder of Tiberius Gracchus, 1797, engraving, Rijksmuseum, Amsterdam (RP-P-1905-2184). Public domain (CC0)."
        }
      },
      {
        "category": "literary",
        "title": "Dante, himself condemned to lifelong exile from Florence and forbidden to return on pain of death, reserved the lowest pit of his hell for those who betray and murder their benefactors. In the frozen heart of the earth he set Brutus and Cassius, the assassins of Caesar, chewed for eternity in two of Lucifer's three mouths beside Judas—the political killer fixed forever as the archetype of treachery. The vision speaks twice to the Moro affair: it is a poem written by a fugitive who never saw his city again, and a verdict that the murder of a statesman is a wound the moral order will not let rest. Casimirri lives out his exile in comfort rather than ice, yet the logic is Dante's inverted—the assassin at ease abroad, the sentence never carried out. Where the poet imagined an eternal punishment for the killers of a leader, the modern case offers only a severed embassy and an unclosed file. Exile and assassin, victim and traitor, meet in these lines as they meet in the row between Rome and Managua.",
        "excerpt": "\"That soul up there which has the greatest pain,\" / The Master said, \"is Judas Iscariot; / With head inside, he plies his legs without. / Of the two others, who head downward are, / The one who hangs from the black jowl is Brutus; / See how he writhes himself, and speaks no word! / And the other, who so stalwart seems, is Cassius.\"",
        "source": "Dante Alighieri, The Divine Comedy, Inferno, Canto XXXIV, lines 61–67, translated by Henry Wadsworth Longfellow (1867).",
        "href": "https://en.wikisource.org/wiki/Divine_Comedy_(Longfellow_1867)/Volume_1/Canto_34",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a2.png",
          "alt": "Gustave Dore's engraving for Inferno Canto XXXIV: the giant figure of Lucifer frozen in the ice of Cocytus at the bottom of Hell.",
          "credit": "Gustave Dore, illustration for Dante's Inferno, Canto XXXIV (Lucifer), 1861–1868 engraving. Public domain."
        }
      },
      {
        "category": "literary",
        "title": "The Moro case turns on the oldest question in scripture—whether a killer can simply walk away and disclaim all account of his brother. In Genesis, Cain murders Abel and answers God's inquiry with a shrug, \"Am I my brother's keeper?\", only to be sentenced to wander the earth a fugitive and a vagabond. Yet the strange mercy of the story is that God marks Cain precisely so that no one may kill him—the murderer is made a protected exile, sheltered even in his guilt. Casimirri is that marked man: convicted for his role in Moro's death, he is nonetheless shielded by Nicaragua, which treats a demand for his surrender as an affront rather than a duty. The blood of the victim, the text says, cries out from the ground, and it is exactly that unanswered cry that Tajani invoked and Managua dismissed as \"European arrogance.\" Between the mark that protects the guilty and the blood that will not be silent lies the whole of this diplomatic rupture.",
        "excerpt": "And the LORD said unto Cain, Where is Abel thy brother? And he said, I know not: Am I my brother's keeper? And he said, What hast thou done? the voice of thy brother's blood crieth unto me from the ground... a fugitive and a vagabond shalt thou be in the earth... And the LORD set a mark upon Cain, lest any finding him should kill him. And Cain went out from the presence of the LORD, and dwelt in the land of Nod, on the east of Eden.",
        "source": "Genesis 4:9–16, King James Version (Authorized Version).",
        "href": "https://www.gutenberg.org/cache/epub/10/pg10.txt",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a3.png",
          "alt": "Fernand Cormon's painting of Cain fleeing with his family into the wilderness after the murder of Abel.",
          "credit": "Fernand Cormon, Cain (Caïn fuyant avec sa famille / Cain fleeing before Jehovah's Curse), 1880, oil on canvas, Musee d'Orsay, Paris. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "When a state wants to remember a political murder, it reaches for images like David's Death of Marat—and the Moro case is, at bottom, a fight over who controls that memory. David painted the assassinated Jacobin not as a corpse but as a martyr, lending a squalid killing the gravity of a sacred death and fixing the victim, not the assassin, at the center of the nation's gaze. Italy's insistence on extraditing Casimirri is a demand that Moro be granted the same standing: that the murdered man remain the subject of the story and the killer be made to answer. Nicaragua's refusal, and its shelter of the gunman, is the counter-claim—that the fugitive, not the victim, deserves protection. The painting reminds us that assassination is never only a crime but an argument about meaning, waged long after the blood is dry. That argument is what has now severed two nations' ties.",
        "excerpt": "Jacques-Louis David depicts the murdered revolutionary journalist Jean-Paul Marat slumped in his bath, quill still in hand, moments after being stabbed by Charlotte Corday, whose petition he still holds. The assassin herself is absent; David gives us only the martyred victim, lit by a cold light against an empty dark ground, transforming a political killing into a secular pieta. It became the founding image of assassination as political iconography.",
        "source": "Jacques-Louis David, The Death of Marat (La Mort de Marat), 1793, oil on canvas, Royal Museums of Fine Arts of Belgium, Brussels.",
        "href": "https://commons.wikimedia.org/wiki/File:Death_of_Marat_by_David.jpg",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a4.png",
          "alt": "Jacques-Louis David's The Death of Marat: the assassinated revolutionary Jean-Paul Marat slumped dead in his bath, a quill in his hand.",
          "credit": "Jacques-Louis David, The Death of Marat, 1793, Royal Museums of Fine Arts of Belgium, Brussels. Public domain."
        }
      },
      {
        "category": "artistic",
        "title": "It is fitting that the sharpest image of this quarrel comes from an Italian brush: Vincenzo Camuccini, a Roman, painted the assassination of Caesar as a storm of daggers in the very chamber of the Republic. His Death of Caesar shows the killing of a head of state carried out by men who called it duty—precisely the self-justification the Red Brigades claimed when they seized and shot Aldo Moro on via Fani. Casimirri, alone among that commando, was never arrested; like Caesar's assassins he struck at the state and then slipped beyond its reach, in his case across an ocean to Managua. Camuccini's Rome is the Rome now demanding his return, insisting that political murder cannot be dissolved into ideology or distance. The canvas freezes the instant of the crime; the Moro file, half a century on, is still frozen at the same point, its last actor beyond justice. Tajani's demand and Nicaragua's rupture are the long echo of that unfinished scene.",
        "excerpt": "Vincenzo Camuccini's canvas freezes the instant of the Ides of March: Julius Caesar, wrapped in white, recoils as a knot of senators press in with drawn daggers, turning the Roman Senate itself into the scene of the crime. The Roman painter renders the killing of the head of state as a theatrical convulsion of gesture and betrayal. The assassins act in the name of the Republic, yet history remembers the deed as murder.",
        "source": "Vincenzo Camuccini, La morte di Cesare (The Death of Caesar), c. 1804–1805, oil on canvas, Galleria Nazionale d'Arte Moderna e Contemporanea, Rome.",
        "href": "https://commons.wikimedia.org/wiki/File:Vincenzo_Camuccini_-_La_morte_di_Cesare.jpg",
        "image": {
          "src": "/covers/nicaragua-italy-ties-cut--a5.png",
          "alt": "Vincenzo Camuccini's The Death of Caesar: senators surround and stab Julius Caesar in the Roman Senate.",
          "credit": "Vincenzo Camuccini, La morte di Cesare, c. 1804–1805, Galleria Nazionale d'Arte Moderna e Contemporanea, Rome. Public domain."
        }
      }
    ]
  },
  {
    "slug": "us-public-charge-green-card-rule",
    "headline": "The Trump administration revives a 'public charge' rule that can deny green cards to immigrants who use public benefits",
    "overview": "A rule published in the Federal Register on Thursday restores broad discretion for U.S. immigration officers to deny green cards to applicants deemed likely to become a \"public charge,\" weighing an applicant's age, health, income and use of means-tested benefits such as food stamps, Medicaid and housing assistance. First imposed in 2020 and rescinded under President Biden, the policy will be formally published July 20 and take effect Sept. 18, subjecting hundreds of thousands of applicants a year to broader scrutiny. Advocates warn it will deter immigrant families from claiming aid they are legally entitled to.",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMijwFBVV95cUxQQUR1VmZFV25YcWp2bTUtRGdJWlI2V0MxOWRWXy1aVkJRem5oRHBLQjhPRlhvdUdsV0J3RmREeFgtXzdvcHRfSkR0Y0l1ZDJ3NEtkWWVKaDZ6UmxsTFVkclU0V2RTRjNLbUtzSUswVktMZ3k1TmJMSGoxNnVxWnJYcmpza1I3ZFpQY2R1V3FhMA?oc=5"
      },
      {
        "name": "CBS News",
        "href": "https://www.cbsnews.com/news/dhs-immigrants-green-card-public-charge-medicaid-housing-food-aid/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/us-public-charge-green-card-rule.png",
      "alt": "Immigrants arriving at Ellis Island in the early twentieth century.",
      "credit": "Getty Images via CBS News"
    },
    "rank": 5,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Washington first set out to decide which newcomers were worthy of the nation, it did so by class and by origin. The Chinese Exclusion Act of 1882 slammed the gate on an entire people cast as undesirable, converting economic anxiety into a federal law of exclusion. The public-charge rule reviving on September 18 works by a subtler sorting: not barring a nationality outright, but empowering officers to weigh a family's poverty, their food stamps and Medicaid, as evidence they do not belong. Both measures answer the same question the Statue of Liberty was built to answer differently, namely who deserves to pass through the golden door. Where 1882 named its excluded class explicitly, the 2026 rule lets need itself become the disqualification. The through-line is a nation deciding a stranger's worth at its own threshold.",
        "excerpt": "Whereas, in the opinion of the Government of the United States the coming of Chinese laborers to this country endangers the good order of certain localities within the territory thereof: Therefore, Be it enacted by the Senate and House of Representatives of the United States of America in Congress assembled, That from and after the expiration of ninety days next after the passage of this act, and until the expiration of ten years next after the passage of this act, the coming of Chinese laborers to the United States be, and the same is hereby, suspended; and during such suspension it shall not be lawful for any Chinese laborer to come, or having so come after the expiration of said ninety days, to remain within the United States.",
        "source": "Chinese Exclusion Act (\"An Act to execute certain treaty stipulations relating to Chinese\"), ch. 126, 22 Stat. 58 (May 6, 1882). Text via the Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/19th_century/chinese_exclusion_act.asp",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a0.png",
          "alt": "An 1882 Puck cartoon showing laborers of many nationalities building a wall of prejudice to keep out Chinese immigrants.",
          "credit": "F. Graetz, \"The Anti-Chinese Wall,\" Puck, 1882. Library of Congress via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "The exact words powering today's rule are more than a century old. As Ellis Island opened its great inspection halls, the Immigration Act of 1891 had just made \"persons likely to become a public charge\" a formal class to be turned back at the harbor. Officers there learned to read poverty on sight, a thin coat, an empty purse, no relative waiting, and to mark such arrivals for exclusion or deportation. The Federal Register rule taking effect September 18 restores precisely that discretion, instructing officers to weigh Medicaid, housing aid, and food assistance against an applicant for a green card. It is the same phrase, the same logic, and the same fear, that the poor stranger will become a burden rather than a citizen. The huddled masses of Lazarus's poem were, in the law's eyes, exactly the people the public-charge clause was written to screen.",
        "excerpt": "All idiots, insane persons, paupers or persons likely to become a public charge, persons suffering from a loathsome or a dangerous contagious disease, persons who have been convicted of a felony or other infamous crime or misdemeanor involving moral turpitude, polygamists, and also any person whose ticket or passage is paid for with the money of another or who is assisted by others to come . . . .",
        "source": "Immigration Act of March 3, 1891, ch. 551, 26 Stat. 1084, sec. 1. Text via the Immigration History project, University of Texas at Austin.",
        "href": "https://immigrationhistory.org/item/immigration-act-of-1891/",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a1.png",
          "alt": "Lewis Hine photograph of an immigrant family seated among their bundles in the baggage room at Ellis Island around 1905.",
          "credit": "Lewis W. Hine, \"Immigrant Family in the Baggage Room of Ellis Island,\" c.1905. Google Art Project via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Emma Lazarus wrote her sonnet in 1883 to raise money for the Statue of Liberty's pedestal, and in doing so rewrote the meaning of the monument itself. Her \"Mother of Exiles\" does not ask newcomers to prove their wealth or usefulness; she summons precisely \"your tired, your poor, / Your huddled masses,\" the very people a public-charge test is designed to turn away. The rule reviving on September 18 inverts that welcome, treating poverty and reliance on food stamps, Medicaid, or housing aid as grounds to deny a green card rather than a reason to lift the lamp. Bolted in bronze inside the pedestal in 1903, the poem became the nation's stated creed, and the new regulation measures how far practice has drifted from it. To read the sonnet beside the Federal Register notice is to see two opposite answers to the stranger at the door.",
        "excerpt": "Not like the brazen giant of Greek fame,\nWith conquering limbs astride from land to land;\nHere at our sea-washed, sunset gates shall stand\nA mighty woman with a torch, whose flame\nIs the imprisoned lightning, and her name\nMother of Exiles. From her beacon-hand\nGlows world-wide welcome; her mild eyes command\nThe air-bridged harbor that twin cities frame.\n\"Keep, ancient lands, your storied pomp!\" cries she\nWith silent lips. \"Give me your tired, your poor,\nYour huddled masses yearning to breathe free,\nThe wretched refuse of your teeming shore.\nSend these, the homeless, tempest-tost to me,\nI lift my lamp beside the golden door!\"",
        "source": "Emma Lazarus, \"The New Colossus\" (1883), inscribed on a bronze plaque inside the Statue of Liberty pedestal in 1903. Public domain; text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_New_Colossus",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a2.png",
          "alt": "Portrait photograph of the American poet Emma Lazarus, author of \"The New Colossus.\"",
          "credit": "Portrait of Emma Lazarus (1849-1887), c.1880s. Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The Book of Ruth tells of a destitute foreign widow, a Moabite and an outsider, who binds herself to Naomi and to Israel with words that became scripture's great vow of belonging. Ruth arrives with nothing and survives by gleaning leftover grain in Boaz's fields, the ancient equivalent of a poor immigrant leaning on public support; yet the text treats her not as a burden but as the ancestor of King David. The public-charge rule taking effect September 18 would read a woman like Ruth as \"likely to become a public charge\" and weigh her poverty against her admission. Her pledge that \"thy people shall be my people\" is the immigrant's promise of loyalty that the new policy answers with suspicion of need. The tension between welcoming the stranger and testing her worthiness is as old as this book.",
        "excerpt": "And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God: Where thou diest, will I die, and there will I be buried: the LORD do so to me, and more also, if ought but death part thee and me.",
        "source": "The Holy Bible, King James Version (1611), Ruth 1:16-17. Public domain; text via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ruth",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a3.png",
          "alt": "Painting depicting Ruth clinging to Naomi as she vows her loyalty.",
          "credit": "Philip Hermogenes Calderon, \"Ruth and Naomi.\" Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Frederic Auguste Bartholdi's colossus, dedicated in New York Harbor in 1886 as \"Liberty Enlightening the World,\" became the first thing millions of immigrants saw as their ships neared the Ellis Island inspection halls. Bartholdi conceived her as a beacon of republican liberty; Lazarus's poem and generations of arrivals recast her as a promise of refuge to the poor. The public-charge rule reviving September 18 legislates in the statue's very shadow, empowering officers to deny green cards to immigrants judged too likely to need food stamps, Medicaid, or housing aid. The image of a torch raised beside the \"golden door\" stands in stark opposition to a threshold now guarded against poverty itself. No monument states the nation's ideal of welcome more plainly, and none throws the new rule's exclusions into sharper relief.",
        "excerpt": "Bartholdi's copper colossus, \"Liberty Enlightening the World,\" rises more than 300 feet above New York Harbor, her right arm lifting a gilded torch and her left cradling a tablet of law. Dedicated in 1886, she faces the sea approach that carried millions of immigrants toward the Ellis Island inspection station. Her raised lamp became the enduring symbol of a nation that promised to receive the world's poor.",
        "source": "Frederic Auguste Bartholdi, \"Liberty Enlightening the World\" (the Statue of Liberty), dedicated October 28, 1886, New York Harbor. National Park Service, Statue of Liberty National Monument.",
        "href": "https://www.nps.gov/stli/learn/historyculture/statue-statistics.htm",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a4.png",
          "alt": "Front view of the Statue of Liberty holding her torch aloft against a clear sky.",
          "credit": "Frederic Auguste Bartholdi's Statue of Liberty, front view. Wikimedia Commons (CC0 / public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Ford Madox Brown painted \"The Last of England\" in 1855, freezing a young couple on a ship's deck as the white cliffs recede and they sail toward an uncertain life abroad. Their grim, frightened faces capture the emigrant's gamble, leaving everything on the bet that another country will take them in. The public-charge rule taking effect September 18 speaks to the receiving end of that same voyage, where officers now weigh a family's likely poverty, their use of Medicaid, food aid, or housing assistance, before granting the green card that would let them stay. Brown's migrants are precisely the anxious, unmoneyed strangers such a test is built to scrutinize. The painting renders the human weight of migration that a bureaucratic \"likely to become a public charge\" finding reduces to a checkbox. It is a portrait of the stranger at the door, caught the moment before the door decides.",
        "excerpt": "In Ford Madox Brown's oval oil painting, a young husband and wife sit huddled on the deck of an emigrant ship, gripping hands beneath a wind-battered umbrella as the cliffs of Dover fade behind them. Their pale, set faces convey both resolve and dread at abandoning their homeland. Cabbages strung along the rail and a crowd of fellow travelers mark them as ordinary people staking everything on a distant shore.",
        "source": "Ford Madox Brown, \"The Last of England\" (1855), oil on panel, Birmingham Museum and Art Gallery.",
        "href": "https://commons.wikimedia.org/wiki/File:Ford_Madox_Brown_-_The_Last_of_England_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/us-public-charge-green-card-rule--a5.png",
          "alt": "Ford Madox Brown's painting The Last of England, showing two emigrants huddled under an umbrella on a ship's deck.",
          "credit": "Ford Madox Brown, \"The Last of England\" (1855). Birmingham Museums Trust / Google Art Project via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "white-house-teleprompter-bets",
    "headline": "Trump's teleprompter operator is placed on leave and probed by the CFTC over $100,000 in bets on the president's speeches",
    "overview": "Gabriel Perez, a technical assistant who has run President Trump's teleprompter since 2016, was placed on administrative leave amid a federal investigation into whether he used advance knowledge of Trump's remarks to win more than $100,000 on the prediction market Kalshi. Kalshi flagged suspicious trades on its \"Mentions\" market, where users bet on whether specific words or phrases appear in a speech, to the Commodity Futures Trading Commission, which found Perez had wagered on more than a dozen addresses over three months. The White House condemned the alleged conduct as \"a disgrace.\"",
    "genre": "Politics",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMiowFBVV95cUxPSThBSk1YZnFDUHFnS25LSFBYc1k5MkVsYTgwSnZlWjNLb0lkY3FwNjhJbDVBMVpiVWlvWFpxYnE3ZW9CbldmU3Z5eXhldEhBSzhUbjZnOU9WTjNrMGJOQUNfNE9Ham5ld0FONmkyeHZnaE1QUnd3YnpwcWlXRmJvS1RKVmp1SlAyRFd1Y0RfY0dTY2F6NkFUbHZVQ0NFUE5zMjVV?oc=5"
      },
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxONGNvSTVFSlRPOGZURlozOWdsejNLd1Y3S2hWcFpEVnRCYm9WX2NKVko4elZkT3ZJME9MdU9BOFlGcVBIdWhHWDIzV2NLaFVWM3VBT3hfX2dKMTRWTkV4LWFGMEcxWUhhUlNVZlotU2lYdGpSbk90T1lGWVc2U3lnT3VRRHRveXZvNjNFcmFVOVpVek8wVklKdnVHQTZPR2FWbllVZHNYdEl6QmVhcW4xUjZ5aTJPaGFjV3RENTVB?oc=5"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/white-house-teleprompter-bets.png",
      "alt": "A teleprompter's angled glass panels stand before rows of empty seats.",
      "credit": "Wikimedia Commons"
    },
    "rank": 6,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "For centuries kings and commoners climbed to Delphi to buy a glimpse of words not yet spoken, and none is more famous than Croesus, who was promised that if he marched on Persia he would destroy a great empire, only to learn too late that the doomed empire was his own. The Pythia's power lay entirely in foreknowledge: she claimed to know what the future would say before any mortal could hear it. Gabriel Perez occupied a strangely similar seat. As the man who loaded the president's words into the teleprompter, he alone knew the exact phrases before they left Trump's mouth, and he turned that private oracle into cash on Kalshi. Where Croesus paid gold hoping to purchase certainty about words to come, Perez already possessed that certainty and simply sold it back to the betting market. The ancient warning that foreknowledge corrupts whoever wields it now reads like a CFTC indictment.",
        "excerpt": "They inquired thus, and the answers of both the Oracles agreed in one, declaring to Croesus that if he should march against the Persians he should destroy a great empire: and they counselled him to find out the most powerful of the Hellenes and join these with himself as friends.",
        "source": "Herodotus, The History of Herodotus, Book I, ch. 53, trans. G. C. Macaulay (London: Macmillan, 1890; public domain), via Project Gutenberg eBook #2707.",
        "href": "https://www.gutenberg.org/cache/epub/2707/pg2707.txt",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a0.png",
          "alt": "The Pythia seated on a tripod amid rising vapours, delivering prophecy at Delphi, in John Collier's 1891 painting.",
          "credit": "John Collier, Priestess of Delphi (1891), Art Gallery of South Australia. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In the autumn of 1919 eight Chicago White Sox players agreed to throw the World Series in exchange for a reported $100,000, letting gamblers who knew the fix was in collect fortunes on the 'wrong' team. It was the ultimate insider bet: the outcome was not predicted but privately arranged, and the money flowed to those who possessed secret knowledge unavailable to the honest public. Perez's alleged scheme rhymes uncannily, down to the six-figure sum, roughly $100,000 said to have been won on Kalshi by a trusted insider trading on information no ordinary bettor could have. Like the ballplayers, he stood at the very center of the spectacle, entrusted to serve it faithfully, and instead quietly monetized his access. Baseball answered with lifetime bans and the enduring label 'Black Sox'; the White House has answered Perez with the word 'disgrace.' Both scandals turn on the same rot: when the people running the game start wagering on it, the whole spectacle is revealed as riggable.",
        "excerpt": "In September and October 1919, eight members of the Chicago White Sox conspired with professional gamblers to lose the World Series to the Cincinnati Reds in exchange for a payoff reported at $100,000. Those who knew the fix was in bet heavily on the underdog Reds and collected, while the betting public wagered blind. Baseball's new commissioner permanently banned all eight players, and the affair became the enduring symbol of a sport corrupted by insiders wagering on a result they secretly controlled.",
        "source": "Jacob Pomrenke, 'The Black Sox Scandal,' Society for American Baseball Research (SABR).",
        "href": "https://sabr.org/journal/article/the-black-sox-scandal/",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a1.png",
          "alt": "Team photograph of the 1919 Chicago White Sox, eight of whom conspired to throw the World Series.",
          "credit": "1919 Chicago White Sox team photograph. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "The archetype of the trusted insider who sells his secret knowledge for money is Judas Iscariot, one of the twelve, who went to the chief priests and asked, 'What will ye give me, and I will deliver him unto you?', settling on thirty pieces of silver. Judas's value to the conspirators was precisely his inside access: he alone could tell them where and when, converting privileged proximity into a payout. Gabriel Perez, at Trump's side since 2016 and privy to every prepared line, likewise converted a position of trust into private profit, betting on words he was uniquely positioned to know. The betrayal in each case is not merely greed but the corruption of a servant who was supposed to be loyal. The thirty pieces of silver and the $100,000 on Kalshi are the same coin: the price of foreknowledge sold behind the principal's back.",
        "excerpt": "Then one of the twelve, called Judas Iscariot, went unto the chief priests, And said unto them, What will ye give me, and I will deliver him unto you? And they covenanted with him for thirty pieces of silver. And from that time he sought opportunity to betray him.",
        "source": "The Gospel According to St. Matthew 26:14-16, King James Version (1611; public domain).",
        "href": "https://biblehub.com/kjv/matthew/26.htm",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a2.png",
          "alt": "A tormented Judas kneels and flings the thirty pieces of silver at the priests' feet in Rembrandt's 1629 painting.",
          "credit": "Rembrandt, Judas Repentant, Returning the Pieces of Silver (1629). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "When the prophet Elisha refused all payment for healing Naaman, his servant Gehazi could not bear to let the silver go; he chased the departing Syrian, lied to obtain a talent of silver and two changes of garments, and hid the gain, until Elisha asked, 'Is it a time to receive money?' and struck him with leprosy white as snow. Gehazi is the trusted attendant who secretly cashes in on his master's work, exactly the charge now leveled at Perez, accused of quietly enriching himself off the president he was employed to serve. Both men exploited a position of intimate access that was never theirs to sell. Both concealed the transaction and offered a false account when confronted. The story's verdict, that such greed marks a servant permanently, anticipates the White House calling Perez's alleged betting 'a disgrace.'",
        "excerpt": "And he said unto him, Went not mine heart with thee, when the man turned again from his chariot to meet thee? Is it a time to receive money, and to receive garments, and oliveyards, and vineyards, and sheep, and oxen, and menservants, and maidservants? The leprosy therefore of Naaman shall cleave unto thee, and unto thy seed for ever. And he went out from his presence a leper as white as snow.",
        "source": "The Second Book of the Kings 5:26-27, King James Version (1611; public domain).",
        "href": "https://biblehub.com/kjv/2_kings/5.htm",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a3.png",
          "alt": "The prophet Elisha raises his hand to refuse the gifts offered by the cured Syrian commander Naaman.",
          "credit": "Pieter de Grebber, Elisha Refuses the Gifts of Naaman (1637), Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Around 1595 Caravaggio painted 'The Cardsharps,' in which an innocent youth studies his hand while two cheats coordinate to rob him blind, one flashing a signal with gloved fingers, the other palming a hidden card behind his back. The whole drama depends on secret information: the sharps know what will happen, the mark does not, and the money moves accordingly. That is precisely the structure of a prediction market corrupted by an insider. Kalshi's other bettors were the guileless youth, wagering on which words Trump might say; Perez, allegedly holding the prepared script, was the sharper who already knew. Caravaggio grasped that cheating is less about luck than about the private possession of knowledge others lack, the same edge a teleprompter operator holds over the honest crowd. Painted more than four centuries ago, it could serve as the illustration for the CFTC's complaint.",
        "excerpt": "Caravaggio's canvas shows a fresh-faced young player absorbed in his cards while two sharpers fleece him: an older accomplice peers over his shoulder and signals with gloved fingers, and the youth at right hides an extra card behind his back. The dupe plays honestly, unaware that his opponents hold secret knowledge that guarantees the result. The painting is a portrait of exactly the asymmetry at the heart of the Perez case, in which the game only looks fair to the one who does not know the cards are marked.",
        "source": "Caravaggio (Michelangelo Merisi), The Cardsharps (I Bari), c. 1595, oil on canvas, Kimbell Art Museum, Fort Worth.",
        "href": "https://en.wikipedia.org/wiki/The_Cardsharps",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a4.png",
          "alt": "A young dupe studies his cards while an older cheat signals and a youth pulls a hidden card from behind his back.",
          "credit": "Caravaggio, The Cardsharps (c. 1595), Kimbell Art Museum, Fort Worth. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In Georges de La Tour's 'The Cheat with the Ace of Clubs,' a richly dressed dupe is quietly relieved of his fortune while a cardsharp slides a concealed ace from behind his belt, exchanging knowing glances with a courtesan and a maid who are in on the scheme. Everyone at the table shares the secret except the young victim, whose downcast eyes fix on his cards while the trap closes. La Tour stages deception as a conspiracy of the informed against the uninformed, a silent cabal profiting from what only they know. Gabriel Perez, entrusted with the president's unspoken words, is cast in the cheat's role: the calm insider who holds the winning card out of sight and lets the market pay him for certainty disguised as a wager. The painting's cool theatricality mirrors the quiet audacity of betting six figures on speeches one has already read. It is a moral emblem for an age of prediction markets, where the house of chance is only chance for those kept in the dark.",
        "excerpt": "La Tour depicts a lavishly dressed young gambler being cheated at cards: the sharp at left draws a hidden ace of clubs from behind his belt, while a scheming woman and a serving maid trade glances that show they are part of the plot. Only the wealthy dupe is ignorant of the arrangement. The scene renders cheating as a shared secret held by everyone but the victim, the informed silently harvesting the winnings from the one who plays in good faith.",
        "source": "Georges de La Tour, The Cheat with the Ace of Clubs, c. 1630-34, oil on canvas, Kimbell Art Museum, Fort Worth.",
        "href": "https://commons.wikimedia.org/wiki/File:Georges_de_La_Tour_-_The_Cheat_with_the_Ace_of_Clubs_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/white-house-teleprompter-bets--a5.png",
          "alt": "A cardsharp draws a hidden ace from his belt as two women exchange knowing glances and a young dupe studies his hand.",
          "credit": "Georges de La Tour, The Cheat with the Ace of Clubs (c. 1630-34), Kimbell Art Museum, Fort Worth. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "world-ai-cooperation-organization",
    "headline": "Twenty-nine countries sign an agreement to create a China-backed World AI Cooperation Organization based in Shanghai",
    "overview": "Representatives of 29 nations, including Russia, Belarus, Serbia, Cuba, Brazil and Venezuela along with a bloc of African and Asian states, signed an agreement in Shanghai on Thursday to establish the World AI Cooperation Organization, an intergovernmental body headquartered in the city that China says will promote global governance of artificial intelligence. The signing came on the eve of the World Artificial Intelligence Conference, where President Xi Jinping is expected to lay out Beijing's vision for AI as a tool of Chinese diplomacy. The United States and most of its closest allies were absent from the founding roster.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMivgFBVV95cUxPTGF5ME1YRmJSTE42TWVWMDUyc1NkMlA2QVQxVlN6dkZuenF4RFcxSFlhUXk3eVZnUWZ3SzdZTDEzbTNVZzJ0NUhadERqUHQ1WmtvSl9aXzE1Qlh3UFdvR3ZXUmJDXzhycGJ0cUdtdXFVUFpzaTNWX3VBemlqUXh3UF95R2k5RTJKbjZFZ09MS3h0TUlnZ3FRMlN2T3lIc19qNGxLcmY1eTJwQVMyb2ZfNk03YjdST2hKRkg1TFFn?oc=5"
      },
      {
        "name": "Xinhua",
        "href": "https://english.news.cn/20260716/2fb3c068a5ec4efbbeb6a88acf155175/c.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/world-ai-cooperation-organization.png",
      "alt": "The Shanghai skyline at dusk, home to the new World AI Cooperation Organization.",
      "credit": "CNBC Africa"
    },
    "rank": 7,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Long before modern treaties, the Greek city-states bound themselves together in the Amphictyonic League, a standing council of nations that met around the sacred shrine at Delphi to deliberate common affairs and jointly guard the temple's treasure. The World AI Cooperation Organization founded in Shanghai reaches for the same ancient template: a common council of assembled states, gathered around a shared object of reverence, that claims the authority to administer something too valuable and too dangerous to be left to any single hand. Where the Amphictyons pooled votes and offerings under a religious canopy, the twenty-nine signatories pool sovereignty over artificial intelligence under Beijing's convening power. The shrine at Delphi was never neutral ground for long, and the states that hosted or dominated the council reliably bent it to their advantage. That is the quiet warning the analogy carries as China invites the world to worship at a temple it has built and located in its own city.",
        "excerpt": "And indeed the Amphictyonic League was organised from the latter, both to deliberate concerning common affairs and to keep the superintendence of the temple more in common, because much money and many votive offerings were deposited there, requiring great vigilance and holiness.",
        "source": "Strabo, Geography, Book IX, Chapter 3, Section 7, trans. H. L. Jones, Loeb Classical Library.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/9C*.html",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a0.png",
          "alt": "The standing columns of the ruined Temple of Apollo at Delphi, ancient meeting place of the Amphictyonic League.",
          "credit": "Temple of Apollo at Delphi, photograph via Wikimedia Commons (CC BY-SA)."
        }
      },
      {
        "category": "historical",
        "title": "In 1919 the victorious powers wrote a Covenant to found the League of Nations, the first attempt to house permanent global governance inside a single chartered institution, complete with a seat, a membership roll, and a lofty pledge to promote international co-operation. The parallel to the Shanghai-based World AI Cooperation Organization is almost structural: a founding document, a headquarters city, a roster of signatory states, and grand language about collective security recast for the age of algorithms rather than armies. The League's most famous flaw is also the sharpest echo here, for the United States, whose president had championed the idea, never joined, leaving the body lopsided from birth. Today it is again Washington and its closest allies who stand outside the door while a rival architect assembles the members within. The Covenant reminds us that an international order is only as universal as its absences allow, and a governance body missing the field's leading power governs in name more than in fact.",
        "excerpt": "THE HIGH CONTRACTING PARTIES, In order to promote international co-operation and to achieve international peace and security by the acceptance of obligations not to resort to war, by the prescription of open, just and honourable relations between nations, by the firm establishment of the understandings of international law as the actual rule of conduct among Governments, and by the maintenance of justice and a scrupulous respect for all treaty obligations in the dealings of organised peoples with one another, Agree to this Covenant of the League of Nations.",
        "source": "The Covenant of the League of Nations (1919), Preamble. The Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/20th_century/leagcov.asp",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a1.png",
          "alt": "William Orpen's painting of diplomats gathered to sign the Treaty of Versailles in the Hall of Mirrors, 1919, which established the League of Nations Covenant.",
          "credit": "William Orpen, 'The Signing of Peace in the Hall of Mirrors, Versailles, 28th June 1919' (1919), via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The story of Babel is scripture's oldest parable of humanity uniting across nations to build a single mighty work that would make it a name and pierce the heavens. The World AI Cooperation Organization is a Babel-like ambition inverted and re-tooled, a coalition of tongues assembling not brick and mortar but a shared apparatus of governance over a technology whose builders openly speak of reaching superhuman heights. The passage's tension between one people speaking one language and the fear of what such unity might accomplish reads uncannily onto a summit where Xi frames a unifying AI order as diplomacy. Babel's ending, a scattering and a confounding of speech, hangs over any project that presumes the world can be gathered under one tower and one authority. It asks whether this new organization is a true convergence of nations or a monument that will fracture along the very lines of language and power it seeks to transcend.",
        "excerpt": "And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth. And the LORD came down to see the city and the tower, which the children of men builded. And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do. Go to, let us go down, and there confound their language, that they may not understand one another's speech.",
        "source": "The Holy Bible, King James Version, Genesis 11:4-7. Project Gutenberg.",
        "href": "https://www.gutenberg.org/files/10/10-h/10-h.htm",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a2.png",
          "alt": "Pieter Bruegel the Elder's painting of the Tower of Babel, a vast spiralling structure under construction toward the clouds.",
          "credit": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), Kunsthistorisches Museum Vienna, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Thucydides recorded how the Greek allies, out of shared fear and shared purpose, freely handed leadership to Athens, which then fixed the contributions, appointed the treasurers, and set the common treasury on the sacred island of Delos where the congresses met. It is the classic account of a voluntary alliance that hardened into an empire, the founding partners gradually discovering that the convening power had become the master. The World AI Cooperation Organization, launched by consenting signatories under Chinese sponsorship with its treasury of authority housed in Shanghai, invites exactly this reading. What begins as pooled deliberation among independent states can, as Thucydides warns, drift toward the dominance of the one power that holds the meeting place and writes the rules. The excerpt is a mirror held up to any coalition that lets a single convener collect the dues and keep the books.",
        "excerpt": "The Athenians, having thus succeeded to the supremacy by the voluntary act of the allies through their hatred of Pausanias, fixed which cities were to contribute money against the barbarian, which ships; their professed object being to retaliate for their sufferings by ravaging the King's country. Now was the time that the office of \"Treasurers for Hellas\" was first instituted by the Athenians. These officers received the tribute, as the money contributed was called. The tribute was first fixed at four hundred and sixty talents. The common treasury was at Delos, and the congresses were held in the temple.",
        "source": "Thucydides, History of the Peloponnesian War, Book I, Ch. 96, trans. Richard Crawley. Project Gutenberg.",
        "href": "https://www.gutenberg.org/cache/epub/7142/pg7142.txt",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a3.png",
          "alt": "Marble bust of the ancient Greek historian Thucydides, who chronicled how the Delian League became an Athenian empire.",
          "credit": "Bust of Thucydides, Royal Ontario Museum, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Baptiste Isabey's celebrated group portrait of the Congress of Vienna shows the statesmen of Europe assembled in a single chamber in 1815 to redraw the map and set the terms of a new international order after an era of upheaval. The image is the visual archetype of what the Shanghai signing aspires to be: a room of plenipotentiaries convened by the great powers of the moment to codify who governs what in the world to come. Yet Vienna was also a masters' bargain, an order dictated by the strongest few and dressed as a concert of nations, which is precisely the charge critics level at a China-led AI body from which the United States and its allies are absent. The painting captures both the grandeur and the exclusivity of such congresses, the sense that history's furniture is being rearranged by those who happen to hold the room. It stands as a portrait of order-making itself, and of the quiet question of whose order is being made.",
        "excerpt": "This engraving after Jean-Baptiste Isabey depicts the assembled diplomats of the Congress of Vienna in 1815, the plenipotentiaries of the great powers gathered to settle the shape of post-Napoleonic Europe. Figures such as Metternich, Wellington, and Talleyrand stand and confer around a document-strewn table, an enduring emblem of a world order negotiated by a convening few. It is the canonical image of a congress of nations redrawing the rules of the age.",
        "source": "Congress of Vienna, engraving after Jean-Baptiste Isabey (c. 1819). Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Congress_of_Vienna.PNG",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a4.png",
          "alt": "Engraving after Jean-Baptiste Isabey showing the statesmen of Europe assembled at the Congress of Vienna in 1815.",
          "credit": "After Jean-Baptiste Isabey, 'Congress of Vienna' (c. 1819), via Wikimedia Commons (CC BY-SA 3.0)."
        }
      },
      {
        "category": "artistic",
        "title": "Rubens painted this allegory, known as Peace and War, as a diplomatic gift to persuade a king toward reconciliation, showing Minerva, goddess of wisdom, physically holding back armored Mars so that the abundance of peace can flow to a huddle of children. It is an artwork made as an instrument of statecraft, arguing that only vigilant wisdom can restrain destructive force long enough for common prosperity to take root. That is exactly the promise the World AI Cooperation Organization drapes over itself: an assembly of nations claiming to marshal collective wisdom to govern a technology that could enrich or endanger all humanity. The painting's beauty is also its rhetoric, and its purpose reminds us that images and institutions of concord are often themselves moves in a contest for advantage. Whether Shanghai's new body shelters the world's future or merely dresses a bid for primacy is the very ambiguity Rubens's allegory embodies.",
        "excerpt": "In Rubens's allegory 'Minerva Protects Pax from Mars,' the helmeted goddess of wisdom pushes back the war-god Mars while Peace, a nursing figure, showers wealth upon a cluster of children under her care. Painted around 1629-30 as a gift tied to Rubens's own peace diplomacy, it argues that only wisdom's restraint of violence allows shared abundance to flourish. It is a masterwork in which art is openly enlisted in the cause of international concord.",
        "source": "Peter Paul Rubens, Minerva Protects Pax from Mars ('Peace and War'), c. 1629-30, The National Gallery, London. Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_(1577-1640)_Peace_and_War_(1629).jpg",
        "image": {
          "src": "/covers/world-ai-cooperation-organization--a5.png",
          "alt": "Rubens's allegory Peace and War, with the goddess Minerva restraining Mars while Peace pours riches over children.",
          "credit": "Peter Paul Rubens, 'Minerva Protects Pax from Mars (Peace and War)', c. 1629-30, National Gallery London, via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "ai-chatbots-censorship-study",
    "headline": "A Meta Oversight Board study finds leading AI chatbots more willing to criticize democratic leaders than authoritarian ones",
    "overview": "A study released Thursday by Meta's Oversight Board found that ten leading large language models, including systems from Meta, OpenAI and Anthropic, were markedly more likely to criticize democratic leaders than authoritarian rulers, raising fears the technology is quietly extending state censorship across borders. In tests, models that would readily mock President Trump or Britain's King Charles III often declined to do the same for the leaders of China, Saudi Arabia or Thailand. The board warned developers risk building \"AI infrastructure that... has the effect of extending illegitimate restrictions on freedom of expression globally.\"",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiugFBVV95cUxNS3JjU0pFR29uUnJyY09HcDVOMktVbzRDQlFXTmJBcWo0SThRVFBvMURqUkZtMmtFUFI2M3ZfSWVuaG12YTB0eE1Cc2JpajNQTjA4bV9nUW1iZzE5SjZ6Zng1Qzk4RjlOanVSLWItd0RDM0hwRng5WFZTdUdJcEZ4cXBjQ3NHOTBZdlRnUTVmVE5fXzljMkQ5UE52Z1FkTXVSWldZelRRcXZ4SktDU3VXaHJaeDFLR2NjbXc?oc=5"
      },
      {
        "name": "Euronews",
        "href": "https://www.euronews.com/next/2026/07/16/ai-chatbots-more-likely-to-criticise-western-leaders-than-authoritarian-ones-study-finds"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/ai-chatbots-censorship-study.png",
      "alt": "A printed page with lines heavily blacked out, symbolizing restricted speech.",
      "credit": "Euronews"
    },
    "rank": 8,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 213 BCE the chancellor Li Si persuaded China's first emperor, Qin Shi Huang, that privately held books let scholars \"use the past to disparage the present,\" and so ordered the histories of the rival states and the writings of the hundred schools consigned to the flames. The logic was that a unified realm required a single sanctioned memory, and that criticism of the throne was best prevented by destroying the very texts that made criticism thinkable. The Meta Oversight Board's finding echoes that ancient calculus in a modern key: today's leading chatbots do not burn books, but by refusing to criticize authoritarian rulers while freely mocking democratic ones, they quietly narrow what may be said about the powerful. Where Qin's fire left visible ash, the machine's reticence leaves no trace at all, only an absence where a criticism might have been. Both regimes grasp the same principle, that whoever controls the record of the past and the speech of the present controls who may be questioned.",
        "excerpt": "In his memorial of 213 BCE, recorded more than a century later by the historian Sima Qian, Chancellor Li Si urged the First Emperor to burn the poetry, the histories of the former kings, and the writings of the hundred schools of philosophy, sparing only manuals of medicine, divination, and agriculture. His stated aim was to silence scholars who \"use the past to disparage the present\" and who cited the words of former kings to condemn the emperor's policies. Anyone who dared to discuss the banned classics was to be executed, and their family punished alongside them.",
        "source": "Sima Qian (Ssu-ma Ch'ien), Records of the Grand Historian (Shiji), Basic Annals of the First Emperor of Qin; memorial of Chancellor Li Si, 213 BCE. Primary-source document, Asia for Educators, Columbia University.",
        "href": "https://afe.easia.columbia.edu/ps/cup/lisi_legalist_memorials.pdf",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a0.png",
          "alt": "Historical Chinese depiction of the Qin dynasty burning of books and burying of scholars, with texts thrown onto a fire and scholars led away.",
          "credit": "Traditional Chinese depiction of the 'burning of the books and burying of the scholars' (焚書坑儒); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 22 June 1633 Galileo Galilei knelt before the Roman Inquisition and, under threat of torture, abjured the truth he had confirmed through his telescope, that the Earth moves around the Sun. The Church did not need to refute him; it needed only to make him recant, and to make his recantation a warning to everyone else. The Oversight Board study describes a subtler version of the same discipline: chatbots that will gladly interrogate a King Charles or a Donald Trump grow cautious and evasive when the subject is a strongman who punishes dissent. Fear, whether of an inquisitor's instruments or a foreign government's ban, teaches the same lesson, that some truths are safest left unspoken in the presence of the powerful. Galileo is said to have murmured 'and yet it moves' under his breath as he rose; the danger now is a technology so trained to please authority that it will not even murmur.",
        "excerpt": "I abjure with sincere heart and unfeigned faith, I curse and detest the said errors and heresies, and generally all and every error and sect contrary to the Holy Catholic Church.",
        "source": "\"The Crime of Galileo: Indictment and Abjuration of 1633,\" in the Internet Modern History Sourcebook, ed. Paul Halsall, Fordham University.",
        "href": "https://sourcebooks.fordham.edu/mod/1630galileo.asp",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a1.png",
          "alt": "Cristiano Banti's 1857 painting of Galileo standing before the black-robed tribunal of the Roman Inquisition.",
          "credit": "Cristiano Banti, 'Galileo Facing the Roman Inquisition' (1857); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "John Milton wrote Areopagitica in 1644 to protest Parliament's demand that every book be licensed before it could be printed, arguing that pre-publication censorship strangles truth in its cradle. To destroy a good book, he insisted, is to kill reason itself, 'the image of God, as it were in the eye.' The Oversight Board's findings reveal a form of censorship Milton could not have imagined: not a licenser stamping approval on a finished manuscript, but a machine that quietly declines to generate certain criticisms in the first place, so that the forbidden thought is never even composed. His fear was suppression after writing; ours is suppression before writing, an editorial hand hidden inside the tool itself. Where Milton demanded the liberty to know, to utter, and to argue freely according to conscience, the chatbot's uneven willingness to criticize rations that liberty according to who holds power.",
        "excerpt": "For books are not absolutely dead things, but do contain a potency of life in them to be as active as that soul was whose progeny they are; nay, they do preserve as in a vial the purest efficacy and extraction of that living intellect that bred them. … as good almost kill a man as kill a good book. Who kills a man kills a reasonable creature, God's image; but he who destroys a good book, kills reason itself, kills the image of God, as it were in the eye.",
        "source": "John Milton, Areopagitica: A Speech of Mr. John Milton for the Liberty of Unlicensed Printing, to the Parliament of England (London, 1644); Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/608/608-h/608-h.htm",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a2.png",
          "alt": "The 1644 printed title page of John Milton's Areopagitica.",
          "credit": "Title page of the first edition of Milton's Areopagitica (1644); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Hans Christian Andersen's 1837 tale, an entire court and city praise the emperor's magnificent new clothes, each courtier too frightened of seeming unfit for his post to admit that the emperor is in fact wearing nothing at all. Only a small child, innocent of the incentives that muzzle everyone else, blurts out the obvious truth. The Oversight Board study casts today's chatbots as the flattering courtiers rather than the child: quick to note the flaws of leaders who cannot punish them, yet suddenly tongue-tied before rulers who can. The tale's moral is that truth-telling requires someone with nothing to lose, and an AI trained to avoid offending powerful states has been given a great deal to lose. The question the study raises is whether these systems will ever play the child in the crowd, or only add one more voice whispering that the robes are beautiful.",
        "excerpt": "\"But the Emperor has nothing at all on!\" said a little child.\n\n\"Listen to the voice of innocence!\" exclaimed his father; and what the child had said was whispered from one to another.\n\n\"But he has nothing at all on!\" at last cried out all the people.",
        "source": "Hans Christian Andersen, \"The Emperor's New Suit\" (1837), in Andersen's Fairy Tales, trans. H. P. Paull; Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/files/1597/1597-h/1597-h.htm",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a3.png",
          "alt": "Vilhelm Pedersen's 19th-century illustration of the naked emperor parading beneath a canopy while attendants pretend to carry his invisible train.",
          "credit": "Vilhelm Pedersen, illustration for 'Kejserens nye klæder' (The Emperor's New Clothes); public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Goya's etching, plate 43 of Los Caprichos, shows a sleeping artist beset by a swarm of owls and bats, while the inscription on the desk warns that the sleep of reason produces monsters. Created as Goya navigated the Spanish Inquisition's own censorship, it is an image about what fills the mind when critical thought is suspended or forbidden. The Oversight Board's findings suggest a modern sleep of reason: when a chatbot withholds criticism of authoritarian leaders, it lulls its users toward a distorted picture of the world, one in which tyrants are conspicuously spared the scrutiny that falls on democrats. The monsters here are not fantastical but statistical, patterns of silence learned from a fear of offending the powerful. Goya's sleeper cannot see what gathers around him; neither can a user who mistakes an AI's selective reticence for balance.",
        "excerpt": "El sueño de la razon produce monstruos. (The sleep of reason produces monsters.)",
        "source": "Francisco de Goya, El sueño de la razón produce monstruos (The Sleep of Reason Produces Monsters), plate 43 of Los Caprichos, etching and aquatint, 1799. Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Museo_del_Prado_-_Goya_-_Caprichos_-_No._43_-_El_sue%C3%B1o_de_la_razon_produce_monstruos.jpg",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a4.png",
          "alt": "Goya's etching of a man asleep at his desk as owls and bats swarm out of the darkness behind him.",
          "credit": "Francisco de Goya, 'El sueño de la razón produce monstruos', Los Caprichos no. 43 (1799), Museo del Prado; public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier's 1834 lithograph 'Ne vous y frottez pas!!' — 'Don't Meddle With It!!' — depicts a defiant printer with sleeves rolled and fists raised, guarding the liberty of the press against a French government determined to gag its critics; Daumier himself had been jailed for caricaturing the king. The censorship laws that soon crushed the satirical press punished precisely the mockery of the mighty that the Oversight Board found today's chatbots reluctant to perform. Daumier's printer stands his ground; the modern worry is a technology that has quietly agreed not to fight at all, declining to lampoon authoritarian rulers as readily as it lampoons elected ones. Lèse-majesté, the crime of insulting a monarch, was Daumier's constant peril and is now, in effect, re-encoded as caution in systems that must serve markets where such insults remain illegal. His raised fists pose the very question the study forces on us: who is still willing to meddle with power?",
        "excerpt": "Ne vous y frottez pas!! (Don't meddle with it!!)",
        "source": "Honoré Daumier, Ne vous y frottez pas!! (Don't Meddle With It!!), lithograph, L'Association mensuelle, plate 20, March 1834. National Gallery of Art, Washington.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
        "image": {
          "src": "/covers/ai-chatbots-censorship-study--a5.png",
          "alt": "Daumier's lithograph of a defiant printer standing with fists raised to defend the freedom of the press, a fallen figure behind him.",
          "credit": "Honoré Daumier, 'Ne vous y frottez pas!!' (1834), National Gallery of Art; public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "ai-stocks-global-selloff",
    "headline": "A slump in AI and chip stocks drags down markets worldwide, with South Korea's Kospi falling 6.4%",
    "overview": "Shares of the chipmakers and other winners of the artificial-intelligence boom tumbled on Thursday, pulling markets lower around the world; Nvidia, the world's most valuable company, fell about 4%, while Arm, Micron, AMD and Broadcom each dropped more than 5%. In Asia the sell-off was sharper, dragging South Korea's Kospi down 6.4% as Samsung Electronics and SK Hynix slid. Investors were rattled by doubts over the soaring cost of AI computing after Nvidia's chief executive suggested it could climb toward $100 billion per gigawatt.",
    "genre": "Economy",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilwFBVV95cUxNSmJlT2oxT2ZMTTVULXNjOGZQbGYzaTVidG9wc0ZvcnZTdVFVN25BcVkxdHpTRTB0X3RIV2MzcGlHRW1TeHpkWmE3MXE2Wm1kRUNBU0x6ZlJrSU1WQjhGelJldGJiUEhhNXBrN19sdDlJSFVfanJlLVlQQXJrdV8tZEk0bklud3dxRnZXcjk2MXR2eFA5Y1pZ?oc=5"
      },
      {
        "name": "The Washington Times",
        "href": "https://www.washingtontimes.com/news/2026/jul/16/ai-stocks-slumping-oil-prices-keep-rising/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/ai-stocks-global-selloff.png",
      "alt": "Electronic boards on a stock exchange show sharply falling share prices.",
      "credit": "NBC News"
    },
    "rank": 9,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When AI and chip stocks cratered on Thursday, 16 July 2026 - Nvidia down 4 percent, Arm, Micron, AMD and Broadcom off more than 5, and South Korea's Kospi collapsing 6.4 percent - traders were re-enacting a script written in Holland almost four centuries earlier. In the Dutch tulip mania of the 1630s, a single flower bulb could change hands for the price of a canal-side house, and the whole nation, in Mackay's phrase, 'even to its lowest dregs, embarked in the tulip trade.' What finally broke it was not a bad harvest but a thought: the dawning suspicion that somebody, in the end, must lose fearfully. Today that thought wears a price tag - roughly 100 billion dollars for every gigawatt of AI computing - and the question of who ultimately pays for it is exactly the doubt that sent semiconductors tumbling. The tulip fields teach the oldest lesson on the exchange: prices climb on the belief that a greater fool will always appear, and they fall the instant the crowd wonders whether it has become that fool. Confidence, once destroyed, does not rise again on command.",
        "excerpt": "At last, however, the more prudent began to see that this folly could not last for ever. Rich people no longer bought the flowers to keep them in their gardens, but to sell them again at cent. per cent. profit. It was seen that somebody must lose fearfully in the end. As this conviction spread, prices fell, and never rose again. Confidence was destroyed, and a universal panic seized upon the dealers.",
        "source": "Charles Mackay, Memoirs of Extraordinary Popular Delusions and the Madness of Crowds, Volume 1, chapter 'The Tulipomania' (London: Richard Bentley, 1841).",
        "href": "https://www.gutenberg.org/files/636/636-h/636-h.htm",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a0.png",
          "alt": "Anonymous 17th-century watercolour of the striped 'Semper Augustus' tulip, the most expensive bulb of the Dutch tulip mania.",
          "credit": "Anonymous 17th-century watercolour, 'Semper Augustus' tulip (before 1640). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The other end of the market's memory reaches to Wall Street in October 1929, and Thursday's rout on the AI and chip names rhymes with it uncomfortably. Through the late 1920s a new technology - radio, autos, electrification - had produced a class of glamour stocks that seemed to defy gravity, much as Nvidia, Broadcom and the Kospi's chipmakers have in the age of artificial intelligence. Then, over a few catastrophic sessions, the marvels that had made fortunes destroyed them just as quickly, and a solemn crowd gathered outside the New York Stock Exchange to watch their paper wealth evaporate. The parallel that matters is not the size of the fall but its psychology: euphoria curdling into panic once investors began to doubt that earnings could ever justify the prices. Today's fear is specifically about cost - the staggering capital that AI's compute buildout demands - and about whether the revenue will ever arrive to pay for it. 1929 is the reminder that a boom's brightest darlings are precisely the ones with the furthest to fall.",
        "excerpt": "In the autumn of 1929 the great bull market in American stocks broke apart. After years in which technology-driven glamour shares had seemed unstoppable, prices collapsed across Black Thursday, 24 October, and Black Tuesday, 29 October, wiping out billions in paper wealth within days. Panicked crowds gathered on Wall Street as the certainties of the boom dissolved into fear, and the crash became the overture to the Great Depression.",
        "source": "Harold Bierman Jr. and the Federal Reserve, 'Stock Market Crash of 1929,' Federal Reserve History (Federal Reserve Bank of St. Louis / Board of Governors).",
        "href": "https://www.federalreservehistory.org/essays/stock-market-crash-of-1929",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a1.png",
          "alt": "A solemn crowd gathers on the street outside the New York Stock Exchange during the Wall Street crash of October 1929.",
          "credit": "'Crowd outside the New York Stock Exchange after the crash,' 29 October 1929. U.S. Government photograph, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Long before ticker tapes, the book of Proverbs had already named the vertigo that seized the chip market on Thursday. 'Riches certainly make themselves wings; they fly away as an eagle toward heaven' - a line that reads like a caption for a day when Nvidia shed 4 percent, its suppliers more than 5, and the Kospi 6.4 percent in a single session. The ancient warning is aimed exactly at the speculator's error: setting one's eyes 'upon that which is not,' treating an inflated valuation as though it were solid ground. For a year the AI trade felt like settled wealth; on Thursday it revealed itself as a bird already testing its wings. The proverb does not condemn industry, only the fever to be rich in a hurry, which is the very engine of every mania from tulips to transistors. When fortunes can be made and unmade overnight, this is the oldest fine print in the world.",
        "excerpt": "Labour not to be rich: cease from thine own wisdom. Wilt thou set thine eyes upon that which is not? for riches certainly make themselves wings; they fly away as an eagle toward heaven.",
        "source": "The Holy Bible, King James Version, Proverbs 23:4-5 (1611).",
        "href": "https://www.biblegateway.com/passage/?search=Proverbs%2023%3A4-5&version=KJV",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a2.png",
          "alt": "Rembrandt's painting of an old man counting coins by candlelight, illustrating the biblical parable of the rich fool.",
          "credit": "Rembrandt van Rijn, 'The Parable of the Rich Fool' (1627), Gemaldegalerie, Berlin. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ecclesiastes supplies the second scripture the market seemed to be reading aloud on Thursday: 'He that loveth silver shall not be satisfied with silver.' The AI boom has been the purest modern expression of that insatiability - each record valuation only stoking appetite for the next, until the cost of the compute needed to feed the machines, some 100 billion dollars per gigawatt, began to look like an abundance no revenue could satisfy. The Preacher's point is that accumulation past a certain scale delivers nothing but the beholding of it 'with their eyes,' which is a fair description of holdings that exist mainly as numbers on a screen. When those numbers fell 5 and 6 percent across the chip complex, investors were reminded that goods which merely multiply attract only more mouths to consume them. Vanity, in the biblical sense, is not sinfulness but emptiness - value that vanishes when you reach for it. That emptiness is precisely what a bursting bubble exposes.",
        "excerpt": "He that loveth silver shall not be satisfied with silver; nor he that loveth abundance with increase: this is also vanity. When goods increase, they are increased that eat them: and what good is there to the owners thereof, saving the beholding of them with their eyes?",
        "source": "The Holy Bible, King James Version, Ecclesiastes 5:10-11 (1611).",
        "href": "https://www.biblegateway.com/passage/?search=Ecclesiastes%205%3A10-11&version=KJV",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a3.png",
          "alt": "A Dutch vanitas still life by Pieter Claesz with a skull, an overturned glass and a timepiece, symbolising the emptiness of worldly riches.",
          "credit": "Pieter Claesz, 'Vanitas Still Life' (1632), Mauritshuis, The Hague. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "William Hogarth engraved the definitive picture of a market losing its mind in 1721, in the wake of Britain's South Sea Bubble, and it hangs over Thursday's sell-off like a diagnosis. His crowded scene shows Londoners riding a carousel of speculation while Fortune is butchered and hacked apart and Honesty is broken on a wheel - the moral chaos left when a euphoric public discovers its treasured shares are worth a fraction of the price it paid. Swap South Sea stock for AI and chip equities and the composition barely needs editing: the same manic crowd, the same darlings suddenly plunging, the same fortunes vanishing between one session and the next as the Kospi drops 6.4 percent. Hogarth's genius was to see speculation as a moral spectacle rather than a mere financial event - a fairground of credulity spinning until it throws its riders off. The soaring cost of feeding the AI machine is this decade's South Sea promise: a dazzling story that markets may have priced far ahead of what it can deliver. What the engraving warns is that when the machine stops, it is the crowd, not the schemers, who are broken on the wheel.",
        "excerpt": "Hogarth's crowded emblematic engraving satirises the speculative frenzy of the 1720 South Sea Bubble. A giant merry-go-round of investors whirls at its centre while a figure of Fortune is dismembered, Honesty is broken on the wheel, and a scene of greed, folly and ruin unfolds around a monument blaming the disaster on the madness of the town. It is often called the first editorial cartoon, turning financial mania into a moral tableau.",
        "source": "William Hogarth, 'The South Sea Scheme' (Emblematical Print on the South Sea Scheme), engraving, designed 1721, published 1724.",
        "href": "https://en.wikipedia.org/wiki/Emblematical_Print_on_the_South_Sea_Scheme",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a4.png",
          "alt": "William Hogarth's engraving 'The South Sea Scheme', depicting a chaotic crowd of speculators around a giant merry-go-round during the 1720 South Sea Bubble.",
          "credit": "William Hogarth, 'The South Sea Scheme' (1721). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jan Brueghel the Younger painted the cruellest joke about a bubble around 1640, and it lands squarely on Thursday's chip rout. In his 'Satire on Tulip Mania' the speculators of the Dutch flower craze are all monkeys - weighing bulbs, counting coins, feasting, drawing up contracts, and finally, in one corner, urinating on the worthless flowers as a fellow ape is carried to the grave. Brueghel's verdict is merciless: a mania turns clever men into aping imitators of one another, each buying only because the others are buying. Replace the tulips with GPUs and the AI trade and the menagerie looks unnervingly current, a crowd of investors chasing marvels priced far beyond reason until the day the flowers wilt. When Nvidia and its peers dropped 4 to 6 percent and the Kospi fell 6.4, the monkeys were, so to speak, discovering the smell of their bargain. The painting's enduring sting is that the madness is always obvious - but only in hindsight, and only once the deed of purchase has become worthless paper.",
        "excerpt": "Painted around 1640, just after the Dutch tulip market collapsed, Brueghel's satire recasts the speculators as foolish monkeys in fine dress. The apes inspect bulbs, weigh them, count money, sign contracts and squabble, while one urinates on the now-worthless flowers and another is carried off to a grave - a mocking allegory of a mania that ruined those who chased it. The comedy is pointed: greed had made men behave like aping imitators of one another.",
        "source": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (Allegory of the Tulipomania), oil on panel, c. 1640, Frans Hals Museum, Haarlem.",
        "href": "https://commons.wikimedia.org/wiki/File:Jan_Brueghel_the_Younger,_Satire_on_Tulip_Mania,_c._1640.jpg",
        "image": {
          "src": "/covers/ai-stocks-global-selloff--a5.png",
          "alt": "Jan Brueghel the Younger's satirical painting depicting tulip-mania speculators as monkeys trading, weighing and squandering tulip bulbs.",
          "credit": "Jan Brueghel the Younger, 'Satire on Tulip Mania' (c. 1640), Frans Hals Museum, Haarlem. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "netflix-forecast-shares-tumble",
    "headline": "Netflix shares tumble after a soft revenue forecast, despite second-quarter results in line with estimates",
    "overview": "Netflix shares fell more than 7% in after-hours trading on Thursday after the company issued a third-quarter revenue forecast below Wall Street expectations, overshadowing second-quarter results that were roughly in line with estimates on the back of membership growth, higher prices and rising ad revenue. The streaming giant guided to about $12.86 billion in current-quarter revenue against the roughly $13 billion analysts had expected. The stock has now shed close to 45% from its all-time high, erasing hundreds of billions of dollars in market value.",
    "genre": "Economy",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMizgFBVV95cUxPaElBaG14Wm9OcTNhcTdGWVdBUWRnN0NqY2pBOUhkajZ0V3Jnb2FsbkUyd3J5bUY2TG9kM2gzanFkODEtdVZpR3UxZmNyeU9VYjBwTGtzd0c0R0Y0ZEpqd0k5WEtnRWpCT3pEaURUNzFmZmt2bDVyQUsxX2poOVFiVFg2OG9wQzR1bDBUQ3lNMDZ1SUJNenBOQmdod1N0LVpJM3RodzhKelhDTXVtTVJfM2dldmZVMFVfYUZSaGpKajNrN1djdW10T1NfSjhGUQ?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/16/netflix-nflx-earnings-q2-2026.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/netflix-forecast-shares-tumble.png",
      "alt": "A television screen glowing in a dark room as a streaming service loads.",
      "credit": "Getty Images via CNBC"
    },
    "rank": 10,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In imperial Rome the satirist Juvenal watched a once-sovereign people trade its political birthright for two comforts: free grain and the spectacle of the games, panem et circenses. The emperors who fed and entertained the mob understood that the crowd's loyalty was rented, never owned, and that its appetite for spectacle only grew with the feeding. Netflix has become the digital arena of our own age, a colossal machine for supplying the modern circus on demand, while Wall Street plays the part of the insatiable crowd. When the studio merely met its second-quarter numbers but promised a slightly thinner third-quarter harvest, the audience turned its thumb down and the shares fell more than seven percent after hours. Down roughly forty-five percent from its all-time high, the great entertainer relearns Juvenal's oldest lesson: those who live by the crowd's craving must keep the games coming, or watch its favor curdle. The spectacle can never simply be maintained; it must always be surpassed.",
        "excerpt": "iam pridem, ex quo suffragia nulli / vendimus, effudit curas; nam qui dabat olim / imperium, fasces, legiones, omnia, nunc se / continet atque duas tantum res anxius optat, / panem et circenses.",
        "source": "Juvenal, Satire X (Satura X), lines 78-81 (c. AD 100-127).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A2007.01.0093%3Abook%3D4%3Apoem%3D10",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a0.png",
          "alt": "The Colosseum in Rome, the great amphitheatre where Roman crowds were fed spectacle to keep their favor.",
          "credit": "David Iliff, via Wikimedia Commons (CC BY-SA 3.0)"
        }
      },
      {
        "category": "historical",
        "title": "P. T. Barnum built the nineteenth century's greatest engine of popular wonder, packing his American Museum with marvels and learning, at enormous cost, that a showman's fortune rises and falls with the fickle enthusiasm of his public. He soared, was ruined by the Jerome Clock Company entanglement, and clawed his way back, proof that in the business of amusement no triumph is ever banked for good. His hard-won maxim, that anything spurious fails because the public is wiser than it looks, is the very discipline Netflix now faces: keep delivering a genuinely good article, or watch the audience drift away. The market's after-hours verdict on a soft forecast was a Barnum-scale reminder that the crowd's applause is a loan repayable on demand. A dominant entertainer trading forty-five percent below its peak is living Barnum's cycle of struggle and triumph in fast-forward. The next act always has to be bigger than the last.",
        "excerpt": "He must, of course, have a really good article, and one which will please his customers; anything spurious will not succeed permanently, because the public is wiser than many imagine.",
        "source": "P. T. Barnum, Struggles and Triumphs; or, Forty Years' Recollections of P. T. Barnum (1869), from the appended lecture 'The Art of Money-Getting.'",
        "href": "https://www.gutenberg.org/ebooks/50115",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a1.png",
          "alt": "Photographic portrait of showman P. T. Barnum.",
          "credit": "Photograph of P. T. Barnum, c. 1860s, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Awaiting execution, the philosopher Boethius imagined Fortune herself defending her cruelty: her whole art is to spin the wheel, delighting to see the high brought low and the low raised up. To climb aboard her wheel at all is to accept that the descent is written into the ascent. Netflix rode that wheel to an all-time high and now feels its downward arc, off roughly forty-five percent, tumbling another seven percent on a forecast that merely disappointed. Nothing about the company's second-quarter results was a failure, since it met the estimates, yet Fortune needs no failure to turn her wheel, only the expectation of less. Investors who mounted at the summit are learning that they cannot call it a hardship to come down when the rules of the game require it. The consolation, such as it is, is that the wheel keeps turning for those who endure.",
        "excerpt": "This is my art, this the game I never cease to play. I turn the wheel that spins. I delight to see the high come down and the low ascend. Mount up, if thou wilt, but only on condition that thou wilt not think it a hardship to come down when the rules of my game require it.",
        "source": "Boethius, The Consolation of Philosophy, Book II, Prose 2 (trans. H. R. James, 1897).",
        "href": "https://www.gutenberg.org/ebooks/14328",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a2.png",
          "alt": "Medieval illumination of the Wheel of Fortune from the Carmina Burana codex, with figures rising and falling around Fortuna.",
          "credit": "Carmina Burana codex (Bavarian State Library, Clm 4660), 13th century, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "literary",
        "title": "Scheherazade weds a king who kills each bride at dawn, and survives by a single stratagem: she tells a story so gripping that she breaks it off at daybreak, and the king spares her one more day to hear the end. Her life is staked, night after night, on the promise that the next installment will be worth more than the last. Netflix is the Scheherazade of the streaming age, a storyteller whose survival depends on always having a more compelling tale queued for tomorrow. A quarter merely in line with estimates is a night's reprieve, but the soft forecast is the pause before dawn, when the audience, like Shahryar, demands proof that the next chapter justifies keeping the teller alive. The seven-percent drop is the market withholding its applause until it hears what comes next. To stop the tale is to end it; the story must always go on.",
        "excerpt": "and I will tell thee a tale which shall be our deliverance, if so Allah please, and which shall turn the King from his blood thirsty custom. ... And Shahrazad perceived the dawn of day and ceased to say her permitted say.",
        "source": "The Book of the Thousand Nights and a Night, trans. Richard F. Burton (1885), Vol. 1: 'Story of King Shahryar and his Brother.'",
        "href": "https://www.gutenberg.org/ebooks/3435",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a3.png",
          "alt": "Ferdinand Keller's 1880 painting of Scheherazade telling a tale to Sultan Shahryar.",
          "credit": "Ferdinand Keller, Scheherazade und Sultan Schariar, 1880, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Leon Gerome's 1872 canvas freezes the instant a Roman arena decides a life: a victorious gladiator looks up while the packed stands thrust their thumbs down, the crowd's verdict rendered in an eyeblink. The painting is really a portrait of the audience, a mass whose favor is total, immediate, and merciless. It is hard to find a better image for the moment Netflix reported, results that met the mark, a forecast that fell short, and a spectating market that instantly turned its collective thumb down and knocked the shares off more than seven percent. Gerome shows that in the entertainment economy the performer's fate is never in the performer's hands but in the mood of the watching multitude. For a company trading forty-five percent below its peak, the tiered stands of Wall Street have delivered their gesture. The show goes on only at the crowd's pleasure.",
        "excerpt": "Oil on canvas depicting a triumphant gladiator standing over a fallen opponent in a Roman amphitheatre while the Vestals and the packed crowd extend the pollice verso, thumbs turned, to demand the loser's death. Gerome makes the spectators' verdict the true subject of the picture, the arena's outcome decided entirely by the mood of the watching multitude.",
        "source": "Jean-Leon Gerome, Pollice Verso (Thumbs Down), 1872, oil on canvas, Phoenix Art Museum.",
        "href": "https://commons.wikimedia.org/wiki/File:Jean-Leon_Gerome_Pollice_Verso.jpg",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a4.png",
          "alt": "Gerome's Pollice Verso: a victorious gladiator awaits the arena crowd's thumbs-down verdict on his fallen foe.",
          "credit": "Jean-Leon Gerome, 1872, Phoenix Art Museum, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Edward Burne-Jones's towering Wheel of Fortune shows the goddess Fortuna, grave and impassive, turning a great wheel to which a slave, a king, and an emperor are bound, each rising or falling at her indifferent hand. Burne-Jones said his wheel comes to fetch each of us in turn and then it crushes us, an allegory of how elevation and ruin are two moments of the same rotation. Netflix, lately crowned at an all-time high, now finds itself on the descending spoke, down about forty-five percent and dropping further on a merely soft outlook. The figures on the wheel do not fall for having failed; they fall because it is the wheel's nature to turn. A market that lifted the entertainment giant to the summit now presses it downward with the same impersonal hand. The painting's stillness is the warning: no position on Fortune's wheel is ever a resting place.",
        "excerpt": "Oil on canvas in which a monumental Fortuna turns her great wheel, to which the bound figures of a slave, a king, and an emperor cling as they are raised up and cast down in turn. Burne-Jones presents the vagaries of fortune as a single relentless rotation in which triumph and ruin are inseparable.",
        "source": "Edward Burne-Jones, The Wheel of Fortune (La Roue de la Fortune), 1875-1883, oil on canvas, Musee d'Orsay, Paris.",
        "href": "https://commons.wikimedia.org/wiki/File:Edward_Burne-Jones_-_The_Wheel_of_Fortune_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/netflix-forecast-shares-tumble--a5.png",
          "alt": "Edward Burne-Jones's The Wheel of Fortune, with Fortuna turning a wheel bearing a slave, a king, and an emperor.",
          "credit": "Edward Burne-Jones, 1883, Musee d'Orsay, via Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "danny-boyle-ink-venice",
    "headline": "Danny Boyle's Rupert Murdoch drama 'Ink' will open the 2026 Venice Film Festival in competition",
    "overview": "Danny Boyle's \"Ink,\" a drama about Rupert Murdoch's early days and his acquisition of The Sun, will have its world premiere in competition as the opening film of the 83rd Venice Film Festival on Sept. 2, organizers announced Thursday. Adapted by playwright James Graham from his own stage play, the film stars Jack O'Connell as Sun editor Larry Lamb, Guy Pearce as Murdoch and Claire Foy; it is Boyle's first non-franchise feature since 2019's \"Yesterday.\" Venice will unveil its full lineup on July 23.",
    "genre": "Culture",
    "sources": [
      {
        "name": "AP",
        "href": "https://news.google.com/rss/articles/CBMilAFBVV95cUxQX09fcHJGUmdHUzJ5OExDNE1lVGlnOTFtM192RmlYTlFDWTRGdkV6QVpodTFpZExmYTBVeUFUS1ptMVNEcWRnMkFMcUxKbHVLUVBCZHVBV3pNSWFCMEx2V2lLUFo3cHJvTGFiUUFRQjdBaE9WNHFESjlyWjFpcnh1bFp6TEh0d2dPcVZ2T3RQaHJSY2RO?oc=5"
      },
      {
        "name": "Variety",
        "href": "https://variety.com/2026/film/global/danny-boyle-ink-venice-film-festival-1236812367/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/danny-boyle-ink-venice.png",
      "alt": "An old rotary newspaper printing press running a print run.",
      "credit": "Variety"
    },
    "rank": 11,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When Enea Silvio Piccolomini marveled in 1455 that Gutenberg's printed pages were so clean and correct he could read them \"without glasses,\" he was witnessing the birth of the machine that would one day drop a red-top tabloid on every breakfast table in Britain. Danny Boyle's \"Ink\" is, at root, a story about that same machine—the press—and the intoxicating power of multiplying a single voice into millions of identical copies. Rupert Murdoch's purchase of The Sun and Larry Lamb's reinvention of it depended on the industrial descendants of Gutenberg's workshop: the roaring rotary presses that could flood a nation with print overnight. The film's fascination with ink, hot metal and deadlines is the fascination of the fifteenth century made modern—whoever commands the press commands what a public believes. Piccolomini's letter, the earliest eyewitness account of European printing, already grasps the essential thing: that the printed word carries an authority the handwritten never could. It is the first chapter of the story \"Ink\" tells about the mogul who would seize that authority.",
        "excerpt": "Nothing false was written to me about that miraculous man seen in Frankfurt. I have not seen complete Bibles, but several quires belonging to different books, exceedingly clean and correct in their script, and without error, which Your Grace could read effortlessly, even without glasses. I learned from numerous witnesses that 158 copies have been completed, although some others say the number is 180.",
        "source": "Enea Silvio Piccolomini (later Pope Pius II), letter to Cardinal Juan de Carvajal, 12 March 1455 — the earliest known account of the Gutenberg Bible; translation as quoted by The John Rylands Library, University of Manchester.",
        "href": "https://rylandscollections.com/2025/07/31/introducing-the-early-european-print-collection/",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a0.png",
          "alt": "An open Gutenberg Bible showing two columns of dense black gothic type with hand-painted red and blue initials, the Lenox copy at the New York Public Library.",
          "credit": "Photograph by Kevin Eng (NYC Wanderer) of the Gutenberg Bible, Lenox copy, New York Public Library. CC BY-SA 2.0 via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Half a century before Murdoch bought The Sun, William Randolph Hearst had already written the playbook that \"Ink\" dramatizes: give the public sensation, and if the news is thin, manufacture it. James Creelman's famous—and much-disputed—anecdote of Hearst wiring his artist in Havana, \"You furnish the pictures, and I'll furnish the war,\" captures the tabloid conviction that a newspaper need not merely report events but can conjure them. That is precisely the ambition Guy Pearce's young Murdoch and Jack O'Connell's Larry Lamb bring to Fleet Street, chasing circulation with scandal, sex and spectacle until the paper itself becomes the story. Hearst's \"yellow journalism,\" locked in a circulation war with Joseph Pulitzer, is the direct ancestor of the modern red-top whose birth \"Ink\" stages. Both men understood that the press baron's real product is not information but appetite. The parallel is a warning the film quietly presses: the power to shape public opinion is also the power to distort it.",
        "excerpt": "He was instructed to remain there until the war began; for \"yellow journalism\" was alert and had an eye for the future. Presently Mr. Remington sent this telegram from Havana:— \"W. R. HEARST, New York Journal, N.Y.: Everything is quiet. There is no trouble here. There will be no war. I wish to return. REMINGTON.\" This was the reply:— \"REMINGTON, HAVANA: Please remain. You furnish the pictures, and I'll furnish the war. W. R. HEARST.\"",
        "source": "James Creelman, On the Great Highway: The Wanderings and Adventures of a Special Correspondent (Boston: Lothrop Publishing Company, 1901), pp. 177–178.",
        "href": "https://archive.org/stream/ongreathighwaywa00creeuoft/ongreathighwaywa00creeuoft_djvu.txt",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a1.png",
          "alt": "An 1898 cartoon showing Pulitzer and Hearst, both dressed as the Yellow Kid, beating rival war drums amid a crowd—a satire of the newspaper circulation war.",
          "credit": "Leon Barritt, \"The Big Type War of the Yellow Kids,\" 1898. Library of Congress; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Long before Fleet Street, Ben Jonson saw both the joke and the danger in an industry that packages rumor as fact. In \"The Staple of News\" (first acted 1626) he invents a satirical \"office\" that gathers, grades and sells the news of the day—authentic or apocryphal, so long as it moves—anticipating by three centuries the newsroom Danny Boyle recreates in \"Ink.\" Jonson's clerks grasp the alchemy at the heart of Murdoch and Larry Lamb's tabloid revolution: that printing itself confers a spurious authority, so that even a lie \"runs News still.\" His line that \"the very printing of them makes them News\" could serve as an epigraph for the whole film. The Staple is Jonson's Sun, a commercial engine built on the discovery that the public will happily pay to be deceived. It is the oldest English satire on the very trade \"Ink\" both celebrates and interrogates.",
        "excerpt": "CYMBAL: We not forbid that any News be made, / But that't be printed; for when News is printed, / It leaves, Sir, to be News, while 'tis but written — / FITTON: Though it be ne're so false, it runs News still. / PENI-BOY JUNIOR: See divers Mens Opinions! unto some, / The very printing of them makes them News;",
        "source": "Ben Jonson, The Staple of News, Act I, Scene v (first performed 1626; text from the 1692 Folio of Jonson's Works).",
        "href": "https://www.hollowaypages.com/jonson1692news.htm",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a2.png",
          "alt": "A bust-length portrait of the playwright Ben Jonson in dark clothing with a white collar, gazing to one side against a dark background.",
          "credit": "After Abraham van Blyenberch, portrait of Ben Jonson, c. 1617. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Balzac's \"Lost Illusions\" is the great novel of journalism as a corrupting machine, and its cynical newsman Étienne Lousteau is a spiritual forebear of the ambitious men in \"Ink.\" Lousteau's confession—that he is \"a hired bravo\" who plies his \"trade among ideas and reputations\"—describes exactly the moral bargain the film watches Larry Lamb and Rupert Murdoch strike as they remake The Sun. Where Boyle's tabloid pioneers chase circulation by any means, Balzac's Paris press already trades praise and ruin for money, making and unmaking reputations to order. The novel insists that \"there is corruption everywhere,\" that the newspaper is a weapon for hire—an insight \"Ink\" revisits in the story of a paper that will print anything to win. Lucien de Rubempré's seduction by the glamour and power of the press mirrors the film's own fascinated ambivalence. Balzac supplies the literary DNA of every tale about journalism's Faustian pact, including this one.",
        "excerpt": "The craft is vile, but I live by it, and so do scores of others. Do not imagine that things are any better in public life. There is corruption everywhere in both regions; every man is corrupt or corrupts others. […] I am a hired bravo; I ply my trade among ideas and reputations, commercial, literary, and dramatic; I make some fifty crowns a month; I can sell a novel for five hundred francs; and I am beginning to be looked upon as a man to be feared.",
        "source": "Honoré de Balzac, Lost Illusions (\"A Distinguished Provincial at Paris\"), trans. Ellen Marriage; Project Gutenberg eBook #1559.",
        "href": "https://www.gutenberg.org/files/1559/1559-h/1559-h.htm",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a3.png",
          "alt": "An 1842 daguerreotype of Honoré de Balzac, shown bearded and open-shirted, staring directly at the viewer.",
          "credit": "Louis-Auguste Bisson, daguerreotype of Honoré de Balzac, 1842. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Honoré Daumier's 1834 lithograph \"Ne vous y frottez pas!!\" (\"Don't meddle with it!\") shows a defiant printer, sleeves rolled, standing guard over the freedom of the press as a toppled king and his foreign backers look on—the printing worker imagined as a political force. It hangs directly over the themes of \"Ink,\" where the press is likewise treated as a power that governments and the powerful cannot fully control. Daumier, who had himself been jailed for caricaturing the king, understood the newspaper as both weapon and battleground, exactly as Boyle's film frames Murdoch's insurgent Sun. The printer's clenched, immovable stance embodies the \"publish and be damned\" bravado that runs through the film. Where Daumier celebrates the press against the crown, \"Ink\" complicates the picture, asking what happens when the press baron himself becomes the sovereign power. The lithograph is a fitting visual ancestor of the film's mythology of the printer as kingmaker.",
        "excerpt": "A powerful printer in shirtsleeves plants himself defiantly in the foreground, fists ready, refusing to be cowed; behind him King Louis-Philippe stumbles, while at right the deposed Charles X collapses amid money-bag-laden foreign monarchs. Beneath the central figure runs the legend \"Liberté de la Presse\"—the freedom of the press personified as an unbreakable workingman. Daumier drew the image for the republican L'Association mensuelle only two years after he had been imprisoned for mocking the king.",
        "source": "Honoré Daumier, \"Ne vous y frottez pas!!\" (Don't meddle with it! / Freedom of the Press), lithograph, plate 20 of L'Association mensuelle, March 1834. National Gallery of Art, Washington.",
        "href": "https://commons.wikimedia.org/wiki/File:Honor%C3%A9_Daumier,_Ne_vous_y_frottez_pas!!,_1834,_NGA_6131.jpg",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a4.png",
          "alt": "A lithograph of a muscular printer standing defiantly with clenched fists over the words 'Liberté de la Presse,' as a stumbling king and fallen monarch appear behind him.",
          "credit": "Honoré Daumier, \"Ne vous y frottez pas!!,\" 1834, lithograph. National Gallery of Art, Washington (CC0), via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jost Amman's 1568 woodcut of a printer's workshop, from the \"Book of Trades,\" is one of the earliest images of the very machine at the center of \"Ink\"—the press, with its type, its ink-dabbers and its freshly pulled sheets. It renders as dignified craft the physical process the film lingers over: the hot metal, the rollers, the smell of ink that makes a newspaper feel like a living thing. Boyle's film takes its very title from that substance, and Amman's print reminds us that the tabloid revolution Murdoch led was, materially, the same trade practiced for five hundred years. The woodcut's calm order is a striking contrast to the film's frantic newsroom, but the tools are recognizably ancestral. In presenting the printer as a figure of consequence, it anticipates a world in which the man who owns the press owns a share of the public mind. It is the trade of ink, at its origin, that \"Ink\" ultimately dramatizes.",
        "excerpt": "The woodcut depicts a busy sixteenth-century printing house: at the rear, compositors set type from the case, while in the foreground one man inks the forme with leather dabbers and another works the great screw press, lifting a printed sheet from its frame. Accompanying verses by the poet Hans Sachs praise the printer's art as a noble craft that carries wisdom and news across the world. It is among the first detailed European depictions of the printing press at work.",
        "source": "Jost Amman (illustrator) with verse by Hans Sachs, \"Der Buchdrucker\" (The Printer), woodcut from Das Ständebuch (Eygentliche Beschreibung aller Stände auff Erden), Frankfurt am Main, 1568.",
        "href": "https://commons.wikimedia.org/wiki/File:Buchdrucker-1568.png",
        "image": {
          "src": "/covers/danny-boyle-ink-venice--a5.png",
          "alt": "A 1568 woodcut of a printing workshop: a printer works a large wooden screw press in the foreground while assistants ink type and compositors set letters at the rear.",
          "credit": "Jost Amman, \"Der Buchdrucker\" (The Printer), woodcut from Das Ständebuch, 1568. Public domain via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "clark-art-selldorf-wing",
    "headline": "The Clark Art Institute unveils a Selldorf-designed wing to house the 331-work Tavitian collection",
    "overview": "The Clark Art Institute in Williamstown, Massachusetts, revealed plans for a new Aso O. Tavitian Wing, designed by Selldorf Architects, to house a 331-work gift of European old masters, including pieces by van Eyck, Rubens, Vigee Le Brun and Bernini, left to the museum by the late technology executive Aso Tavitian. The single-storey, roughly 15,000-square-foot building, clad in Calacatta Malva marble and set between the museum's existing structures, is due to break ground in January 2027 and open in 2028. Tavitian, who died in 2020, also left $45 million to build and endow it.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/clark-art-institute-selldorf-architects-1234754944/"
      },
      {
        "name": "Wallpaper*",
        "href": "https://www.wallpaper.com/architecture/public-buildings/selldorf-architects-clark-art-institute-design-reveal"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/clark-art-selldorf-wing.png",
      "alt": "A skylit gallery hung with European old-master paintings.",
      "credit": "Selldorf Architects via Artforum"
    },
    "rank": 12,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "When the Clark opens Selldorf's Aso O. Tavitian Wing in 2028, it will be repeating a gesture the Ptolemies attempted more than two thousand years ago in Alexandria: gathering the scattered masterworks of a civilization under one roof and endowing an institution to keep them. Strabo's description of the Mouseion, with its covered walk, its hall, its shared table for men of learning, and a guardian appointed to preside, is the ancestor of the very word 'museum' and of the idea that Tavitian's 331-work bequest now serves. Like the Ptolemaic kings, Tavitian spent a private fortune assembling treasures, van Eyck, Rubens, Vigee Le Brun, Bernini, and then in effect appointed trustees to preserve them whole. The $45 million he left ensures the collection is maintained rather than dispersed, just as the Museum's endowment sustained its scholars. The parallel carries a warning too: Alexandria is remembered partly for what was lost, a reminder that permanence in marble still depends on the fragile institutions that tend it.",
        "excerpt": "The Museum is a part of the palaces. It has a public walk and a place furnished with seats, and a large hall, in which the men of learning, who belong to the Museum, take their common meal. This community possesses also property in common; and a priest, formerly appointed by the kings, but at present by Caesar, presides over the Museum.",
        "source": "Strabo, Geography, Book XVII, Chapter I, section 8, translated by H. C. Hamilton and W. Falconer (London: Henry G. Bohn, 1854-57).",
        "href": "https://www.gutenberg.org/files/44886/44886-h/44886-h.htm",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a0.png",
          "alt": "A 19th-century engraving imagining the interior of the Great Library of Alexandria, scholars among scrolls beneath a vaulted hall.",
          "credit": "The Great Library of Alexandria, 19th-century engraving after O. Von Corven; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "Aso Tavitian's gift follows one of the founding gestures of the modern public museum: the 1753 bequest of Sir Hans Sloane, whose private cabinet became the British Museum. Sloane, like Tavitian, had spent a lifetime and a fortune amassing his collection and asked in his will that it be kept and preserved together 'Whole and Intire' rather than broken up and sold at auction. Parliament agreed to maintain it, in the exact words of the Act, for the general use and benefit of the public, which is precisely the logic by which a tech executive's old masters now pass, with a purpose-built Selldorf wing and a $45 million endowment, from a private house into the permanent care of the Clark. Both stories turn on the same conviction: that a great collection is a public trust in waiting, and that the collector's final act is to hand it, undivided, to posterity. The 331 works entering Williamstown are the descendants of Sloane's insistence that a museum be a single, unbroken whole.",
        "excerpt": "...to the End that the said Museum or Collection may be preserved and maintained, not only for the Inspection and Entertainment of the Learned and the Curious, but for the General Use and Benefit of the Publick...",
        "source": "The British Museum Act 1753 (26 Geo. II, c. 22), 'An Act for the Purchase of the Museum, or Collection of Sir Hans Sloane, and of the Harleian Collection of Manuscripts.'",
        "href": "https://statutes.org.uk/site/the-statutes/eighteenth-century/1753-26-george-2-c-22-establishing-the-british-museum/",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a1.png",
          "alt": "Portrait of Sir Hans Sloane, the physician and collector whose 1753 bequest founded the British Museum.",
          "credit": "Portrait of Sir Hans Sloane; via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Every monument built to outlast time invites Shelley's irony, and the Tavitian Wing, some 15,000 square feet of Calacatta Malva marble raised to house one man's masterpieces and carry his name well beyond 2028, is a monument in exactly Ozymandias's sense. Shelley's shattered colossus, its pedestal still boasting 'Look on my Works ye Mighty, and despair!', is a meditation on the vanity of legacies carved in stone. Yet the sonnet cuts two ways for a collector like Tavitian: the sculptor's skill outlives the tyrant, the hand that mocked survives the king, so that art endures where mere power does not. A wing of marble named for a patron is a wager that the works inside, the van Eycks and Rubenses, will keep his memory alive far longer than any inscription. The Clark's gamble is that its museum, unlike Ozymandias's desert, will still be tended, and the collection never left to the lone and level sands.",
        "excerpt": "I met a traveller from an antique land,\nWho said -- \"two vast and trunkless legs of stone\nStand in the desert ... near them, on the sand,\nHalf sunk a shattered visage lies, whose frown,\nAnd wrinkled lips, and sneer of cold command,\nTell that its sculptor well those passions read\nWhich yet survive, stamped on these lifeless things,\nThe hand that mocked them, and the heart that fed;\nAnd on the pedestal these words appear:\nMy name is Ozymandias, King of Kings,\nLook on my Works ye Mighty, and despair!\nNothing beside remains. Round the decay\nOf that colossal Wreck, boundless and bare\nThe lone and level sands stretch far away.\" --",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), text via Representative Poetry Online, University of Toronto Libraries.",
        "href": "https://rpo.library.utoronto.ca/content/ozymandias-0",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a2.png",
          "alt": "The colossal granite bust of Ramesses II, the 'Younger Memnon', in the British Museum, the sculpture associated with Shelley's Ozymandias.",
          "credit": "Colossal bust of Ramesses II ('the Younger Memnon'), c. 1250 BC, British Museum; via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Two millennia before the Clark clad its new wing in Calacatta Malva marble, Horace claimed to have built a monument more lasting than bronze and higher than the royal pile of the pyramids, one that neither gnawing rain nor the flight of time could destroy. His boast is the presiding spirit of every patron who builds for permanence, and it frames the paradox of the Tavitian Wing precisely: stone and marble promise endurance, yet Horace located true permanence not in masonry but in the work itself, 'Non omnis moriar,' not all of me shall die. Tavitian's $45 million and Selldorf's marble are the bronze and the pyramids; the 331 paintings and sculptures are the poem. The bequest is a bet that a collector, like a poet, secures his afterlife by the quality of what he leaves rather than the grandeur of the vessel that holds it. The Pyramid of Cestius, a private citizen's marble monument still standing in Rome from Horace's own age, shows how the two forms of memory, the building and the thing it enshrines, have always been braided together.",
        "excerpt": "Exegi monumentum aere perennius\nregalique situ pyramidum altius,\nquod non imber edax, non Aquilo inpotens\npossit diruere aut innumerabilis\nannorum series et fuga temporum.\nNon omnis moriar multaque pars mei\nvitabit Libitinam...",
        "source": "Horace, Odes (Carmina) III.30, lines 1-7; Latin text via The Latin Library. English rendering of the opening (John Conington, 1872): 'And now 'tis done: more durable than brass / My monument shall be...'",
        "href": "https://www.thelatinlibrary.com/horace/carm3.shtml",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a3.png",
          "alt": "The marble-clad Pyramid of Caius Cestius in Rome, a Roman citizen's monumental tomb from around 12 BC.",
          "credit": "Pyramid of Caius Cestius, Rome (c. 18-12 BC); via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "David Teniers's canvas is the seventeenth century's answer to a museum announcement: a picture whose entire subject is a private collection gathered, hung, and put on display. Archduke Leopold Wilhelm stands amid his Italian masterpieces while the painter, hat in hand, records them for posterity, a scene that anticipates exactly what the Clark is doing with the Tavitian bequest, transferring a connoisseur's carefully assembled walls into a public and permanent frame. Where the archduke commissioned Teniers to catalogue and immortalise his holdings, the Clark has commissioned Annabelle Selldorf to build the Calacatta Malva rooms that will do the same for Tavitian's 331 works. Both are acts of gathering and fixing in place, turning the restless activity of collecting into something that can be beheld whole. And in both, the collection outlives the collector: most of the archduke's paintings survive in Vienna's Kunsthistorisches Museum, just as Tavitian's van Eyck and Rubens will survive in Williamstown.",
        "excerpt": "In this gallery picture the painter shows Archduke Leopold Wilhelm standing among the densely hung masterpieces of his Italian collection, while Teniers himself, hat in hand, attends his patron. Roughly fifty identifiable paintings, Titians, Giorgiones, Veroneses, crowd the walls from floor to cornice, a whole princely collection compressed into a single canvas. Teniers painted such views to document and immortalise the archduke's holdings, most of which passed into what is now the Kunsthistorisches Museum in Vienna.",
        "source": "David Teniers the Younger, 'Archduke Leopold Wilhelm in his Gallery in Brussels', oil on canvas, c. 1651, Kunsthistorisches Museum, Vienna.",
        "href": "https://en.wikipedia.org/wiki/Gallery_of_Archduke_Leopold_Wilhelm_in_Brussels_(Vienna)",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a4.png",
          "alt": "David Teniers the Younger's painting of Archduke Leopold Wilhelm in his Brussels gallery, its walls crowded with framed Italian paintings.",
          "credit": "David Teniers the Younger, Kunsthistorisches Museum, Vienna (Google Art Project); via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Bernini is one of the names carried in the Tavitian bequest, and his bust of Costanza Bonarelli distills what the Clark's new marble wing is finally about: the power of stone to hold a living presence against time. Carved from a single block, the bust makes cold marble seem to breathe, an argument in itself for why a collector would spend a fortune to preserve such things and why a museum would raise 15,000 square feet of Calacatta Malva to shelter them. There is a rhyme, too, between Bernini's medium and Selldorf's: the same material a Baroque genius coaxed into flesh now sheathes the rooms built to guard his work. A bequest of 331 old masters is a bid for permanence, and Bernini's marble is the proof of concept, for nearly four centuries on Costanza still turns her head. The Tavitian Wing is a wager that his sculpture, and the paintings gathered around it, will go on doing so under the Clark's care.",
        "excerpt": "Carved from a single block of white marble around 1637, Bernini's bust of Costanza Bonarelli catches a living woman in a moment of movement, lips parted, hair loosening, her chemise unfastened at the throat. It is among the first Baroque portraits made not on commission but out of the sculptor's own feeling, and it demonstrates his uncanny power to make cold stone appear to breathe. The bust survives today in the Museo Nazionale del Bargello in Florence.",
        "source": "Gian Lorenzo Bernini, 'Bust of Costanza Bonarelli', marble, c. 1636-38, Museo Nazionale del Bargello, Florence.",
        "href": "https://en.wikipedia.org/wiki/Bust_of_Costanza_Bonarelli",
        "image": {
          "src": "/covers/clark-art-selldorf-wing--a5.png",
          "alt": "Gian Lorenzo Bernini's marble bust of Costanza Bonarelli, her head turned, lips parted, hair loosening.",
          "credit": "Gian Lorenzo Bernini, Bust of Costanza Bonarelli, Museo Nazionale del Bargello, Florence; via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "jason-limon-trompe-loeil",
    "headline": "Colossal features Jason Limon's trompe-l'oeil paintings that reveal a hidden skeletal world",
    "overview": "The art magazine Colossal spotlighted a new body of trompe-l'oeil paintings by the San Antonio artist Jason Limon, whose canvases appear to peel back like torn paper or plastic wrap to expose skeletal figures and cryptid creatures beneath. Working in acrylic with a muted, vintage palette, Limon plays optical tricks that balance the macabre and the whimsical, inviting viewers to read their own stories into the bones. The images extend a long tradition of art that hides death just below the surface of the everyday.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/trompe-loeil-paintings-jason-limon/"
      },
      {
        "name": "Beinart Gallery",
        "href": "https://beinart.org/collections/jason-limon"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/jason-limon-trompe-loeil.png",
      "alt": "A vanitas still life with a human skull, echoing mortality beneath the everyday.",
      "credit": "Jason Limon via Colossal"
    },
    "rank": 13,
    "edition": "Night Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Nearly two thousand years before Jason Limon tricked the eye with paint that seems to tear away, Pliny the Elder recorded the founding legend of trompe-l'oeil: the contest between Zeuxis and Parrhasius. Zeuxis painted grapes so convincing that birds flew down to peck at them, only to be humbled when he reached to pull back Parrhasius's painted curtain and discovered that the curtain itself was paint. The anecdote fixed illusionism as painting's oldest game, the surface that pretends to be something it is not. Limon revives that ancient sleight of hand, but where the Greeks concealed a picture behind the painted veil, he lets the peeled surface disclose a skull. His torn paper and lifted skin are Parrhasius's curtain restaged for a memento-mori age, deceiving the eye only to reveal the mortality waiting underneath.",
        "excerpt": "This last, it is said, entered into a pictorial contest with Zeuxis, who represented some grapes, painted so naturally that the birds flew towards the spot where the picture was exhibited. Parrhasius, on the other hand, exhibited a curtain, drawn with such singular truthfulness, that Zeuxis, elated with the judgment which had been passed upon his work by the birds, haughtily demanded that the curtain should be drawn aside to let the picture be seen. Upon finding his mistake, with a great degree of ingenuous candour he admitted that he had been surpassed, for that whereas he himself had only deceived the birds, Parrhasius had deceived him, an artist.",
        "source": "Pliny the Elder, Natural History, Book XXXV, chapter 36 (10), trans. John Bostock and H. T. Riley (London: Taylor and Francis, 1855), via the Perseus Digital Library.",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0137%3Abook%3D35%3Achapter%3D36",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a0.png",
          "alt": "Engraving of the ancient Greek painter Zeuxis at his easel, surrounded by figures, illustrating the classical painter whose illusionistic grapes deceived the birds.",
          "credit": "Engraving depicting the painter Zeuxis. Wellcome Collection, London (CC BY 4.0), via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Beneath the church of Santa Maria della Concezione in Rome lies a set of chapels whose walls, arches and chandeliers are built entirely from the bones of some four thousand Capuchin friars, arranged into rosettes and canopies during the seventeenth and eighteenth centuries. A placard among the remains addresses every visitor with the words that you are looking at what you will become. The crypt turns death into decoration, macabre yet oddly playful ornament hidden just below the floor of an ordinary-looking church. That is precisely the register of Jason Limon's paintings, where a muted, vintage surface peels back to expose the skeletal world beneath the everyday. Both the friars and the painter insist that the bone is always there under the skin, and both make the reminder strangely charming rather than merely grim.",
        "excerpt": "Beneath Santa Maria della Concezione, five small chapels are decorated entirely with the disinterred bones of some four thousand Capuchin friars, formed into arches, rosettes and chandeliers. A multilingual placard set among the remains delivers the crypt's memento mori to visitors: 'What you are now, we once were; what we are now, you shall be.'",
        "source": "Ossuary and memento mori inscription, Capuchin Crypt, Santa Maria della Concezione dei Cappuccini, Rome (bones arranged in the 17th-18th centuries); documented in 'Capuchin Crypt', Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Capuchin_Crypt",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a1.png",
          "alt": "A chapel in the Capuchin Crypt in Rome whose walls and ceiling are decorated with patterns made from the bones and skulls of friars.",
          "credit": "The Capuchin Crypt, Rome. Photograph by Edmund F. Arras; Columbus Metropolitan Library via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In the graveyard scene of Hamlet, the prince takes up the unearthed skull of Yorick, the court jester who once carried him on his back, and turns a clownish memory into a meditation on decay. 'Alas, poor Yorick,' he says, dwelling on the lips he had kissed and the jests now silenced, before mocking the fine lady who paints an inch thick yet must come at last to this same grinning skull. Shakespeare fuses laughter and rot exactly as Limon does, so that the jester's whimsy and the death's-head are one and the same object. Yorick's skull is the face beneath the face, the truth that cosmetics and appearances conceal. Limon's peeled surfaces perform the same unmasking, letting a cheerful vintage veneer slip to reveal the grin of the skeleton it had been hiding.",
        "excerpt": "Alas, poor Yorick. I knew him, Horatio, a fellow of infinite jest, of most excellent fancy. He hath borne me on his back a thousand times; and now, how abhorred in my imagination it is! My gorge rises at it. Here hung those lips that I have kiss'd I know not how oft. Where be your gibes now? your gambols? your songs? your flashes of merriment, that were wont to set the table on a roar? Not one now, to mock your own grinning? Quite chop-fallen? Now get you to my lady's chamber, and tell her, let her paint an inch thick, to this favour she must come. Make her laugh at that.",
        "source": "William Shakespeare, The Tragedy of Hamlet, Prince of Denmark, Act V, Scene 1; Project Gutenberg eBook #1524.",
        "href": "https://www.gutenberg.org/cache/epub/1524/pg1524.txt",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a2.png",
          "alt": "Painting of Hamlet and Horatio in a graveyard, with a gravedigger handing Hamlet a skull.",
          "credit": "Eugene Delacroix, Hamlet and Horatio in the Graveyard (1839), Musee du Louvre. Public domain via Wikimedia Commons / Web Gallery of Art."
        }
      },
      {
        "category": "literary",
        "title": "The Hebrew Preacher of Ecclesiastes gave the vanitas tradition its motto and its mood, declaring that all is vanity and that in the end the dust returns to the earth as it was. Everything gleaming and pleasurable on life's surface is, he warns, a passing breath laid over an unstable foundation of mortality. Dutch painters would later build entire still lifes around this text, tucking a skull among the fruit and glassware, and Jason Limon extends the lineage into our own moment. His torn-open surfaces are a visual gloss on the Preacher's insight, that beneath the ornamental everyday lie dust and bone. What reads as macabre whimsy is in truth the oldest sermon, that all appearances are provisional and that death is the ground lying just beneath them.",
        "excerpt": "Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. ... Then shall the dust return to the earth as it was: and the spirit shall return unto God who gave it.",
        "source": "Ecclesiastes 1:2 and 12:7, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a3.png",
          "alt": "A Dutch vanitas still life showing a human skull lying beside an overturned glass, a quill pen and a book on a table.",
          "credit": "Pieter Claesz, Still Life with a Skull and a Writing Quill (1628), The Metropolitan Museum of Art. Public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Hans Holbein's double portrait The Ambassadors (1533) is trompe-l'oeil's most famous trap. Two worldly, richly dressed diplomats stand amid instruments of learning and pleasure, yet a strange grey smear stretches across the foreground; only when the viewer moves to the painting's edge does the distortion resolve into a perfectly rendered human skull. Holbein hid a memento mori in plain sight, legible only through a shift of viewpoint, death smuggled into a picture of status and life. Jason Limon works the same optical mechanism in reverse, making the ordinary surface split open to reveal the skeleton that Holbein disguised as a blur. Both artists prove that the skull is already present within the image of the living, and that it only waits for the right angle, or the right tear, to emerge.",
        "excerpt": "A life-size double portrait of two Renaissance diplomats surrounded by globes, instruments and symbols of worldly achievement. Across the foreground floats an anamorphic distortion that resolves, when seen from the side, into a human skull, a hidden memento mori concealed within an image of power and life.",
        "source": "Hans Holbein the Younger, The Ambassadors (Jean de Dinteville and Georges de Selve), 1533, oil on oak, The National Gallery, London (NG1314).",
        "href": "https://www.nationalgallery.org.uk/paintings/hans-holbein-the-younger-the-ambassadors",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a4.png",
          "alt": "Holbein's The Ambassadors: two men flanking a table of instruments, with an elongated anamorphic skull stretched diagonally across the floor in front of them.",
          "credit": "Hans Holbein the Younger, The Ambassadors (1533), The National Gallery, London. Public domain via Wikimedia Commons / Google Arts & Culture."
        }
      },
      {
        "category": "artistic",
        "title": "Harmen Steenwyck's Still Life: An Allegory of the Vanities of Human Life (c.1640) gathers a Japanese sword, a shell, books, a chronometer and a smoking lamp around a single blunt fact, a human skull. Painted in the muted browns and greys of the Dutch vanitas, its beautifully described worldly things are all quietly subordinate to the mortality set at their center. This is the tradition Jason Limon inherits and updates, with its still vintage palette, its ordinary objects, and its skull that supplies the real subject. Where Steenwyck sets the skull openly among the treasures, Limon buries it and then tears the surface to let it surface again, yet the message is identical. Beauty and the everyday are a thin skin stretched over the bone, and good painting is what makes us feel the death hidden just below.",
        "excerpt": "A Dutch vanitas still life in which a human skull rests among books, a shell, a Japanese sword, a chronometer and an extinguished lamp. Rendered in subdued browns and greys, the worldly objects are arranged to declare the transience of knowledge, pleasure and life itself.",
        "source": "Harmen Steenwyck, Still Life: An Allegory of the Vanities of Human Life, c. 1640, oil on oak, The National Gallery, London (NG1256).",
        "href": "https://www.nationalgallery.org.uk/paintings/harmen-steenwyck-still-life-an-allegory-of-the-vanities-of-human-life",
        "image": {
          "src": "/covers/jason-limon-trompe-loeil--a5.png",
          "alt": "A vanitas still life with a human skull lying among books, a shell, a sword hilt, a jug and an extinguished oil lamp on a table.",
          "credit": "Harmen Steenwyck, Still Life: An Allegory of the Vanities of Human Life (c.1640), The National Gallery, London. Public domain via Wikimedia Commons / Web Gallery of Art."
        }
      }
    ]
  },
  {
    "slug": "genoa-bridge-verdict",
    "headline": "An Italian court sentences ex-Autostrade CEO Castellucci to 12 years over the 2018 Genoa bridge collapse that killed 43",
    "overview": "An Italian court on Thursday convicted 32 people and handed Giovanni Castellucci, former chief executive of Atlantia and motorway operator Autostrade per l'Italia, a 12-year prison sentence over the August 2018 collapse of Genoa's Morandi bridge, which killed 43 people when their vehicles plunged from the flyover. Autostrade's former maintenance chief Michele Mitelli received 11 years and its ex-number two Paolo Berti five and a half. After four years of trial, prosecutors argued that years of neglected maintenance, ignored warnings and delayed safety work were allowed to fester while the operator kept collecting tolls and paying dividends.",
    "genre": "Politics",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/c36dnz1zez5o"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/16/europe/italy-giovanni-castellucci-genoa-bridge-sentencing-intl"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/genoa-bridge-verdict.png",
      "alt": "The collapsed deck of Genoa's Morandi bridge after the August 2018 disaster.",
      "credit": "Wikimedia Commons"
    },
    "lead": true,
    "rank": 14,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In AD 27, under the emperor Tiberius, a freedman named Atilius threw up a huge wooden amphitheatre at Fidenae near Rome to profit from gladiatorial games, but skimped on the foundations and the timber framing. When an immense crowd packed the stands, the structure buckled and crashed inward, and the historian Tacitus records that fifty thousand people were maimed or destroyed in the ruin. The Senate answered by barring shows staged by men of insufficient wealth, ordering solid foundations for all amphitheatres, and banishing Atilius from Italy. Nearly two millennia later the Morandi bridge in Genoa collapsed on 14 August 2018, killing 43, and prosecutors again blamed corners cut for gain. As with Atilius, an Italian court has now delivered its reckoning, convicting 32 people and sentencing former Autostrade chief Giovanni Castellucci to twelve years. The oldest lesson of engineering returns: a builder who chases profit over safe foundations buries the multitude that trusts his work.",
        "excerpt": "One Atilius, of the freedman class, having undertaken to build an amphitheatre at Fidena for the exhibition of a show of gladiators, failed to lay a solid foundation to frame the wooden superstructure with beams of sufficient strength; for he had neither an abundance of wealth, nor zeal for public popularity, but he had simply sought the work for sordid gain. … Fifty thousand persons were maimed or destroyed in this disaster.",
        "source": "Tacitus, The Annals, Book IV.62, trans. Alfred John Church and William Jackson Brodribb; Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Annals_(Tacitus)/Book_4",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a0.png",
          "alt": "A crowded Roman amphitheatre with a victorious gladiator awaiting the crowd's verdict.",
          "credit": "Jean-Léon Gérôme, 'Pollice Verso' (1872), Phoenix Art Museum; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "On the stormy night of 28 December 1879 the Tay Bridge in Scotland — then the longest in the world and the pride of engineer Sir Thomas Bouch — gave way as a train crossed, plunging every passenger into the Firth of Tay and killing at least fifty-nine, perhaps as many as seventy-five. The official Board of Trade inquiry under Henry Rothery found the bridge had been badly built and badly maintained, its ironwork flawed and its upkeep neglected. Bouch, knighted only months before, was ruined and dead within the year. The parallel to Genoa is exact: a celebrated span, deferred maintenance, warnings unheeded, sudden catastrophe over water. The Morandi bridge, opened in 1967 as a marvel of prestressed concrete, likewise fell on 14 August 2018 after years of documented corrosion and delayed repairs, killing 43. In both cases an inquiry laid the ruin not at the door of the storm but of human negligence.",
        "excerpt": "Can there be any doubt that what caused the overthrow of the bridge was the pressure of the wind acting upon a structure badly built and badly maintained?",
        "source": "Henry C. Rothery, Report of the Court of Inquiry into the Tay Bridge disaster (Board of Trade, 1880); collapse of 28 December 1879, as quoted in the Wikipedia article.",
        "href": "https://en.wikipedia.org/wiki/Tay_Bridge_disaster",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a1.png",
          "alt": "Photograph of the collapsed iron girders of the Tay Bridge after the 1879 disaster.",
          "credit": "Great Britain Board of Trade, 'Fallen girders, Tay Bridge' (1879–80), National Library of Scotland; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The Hebrew prophet Ezekiel, writing in the sixth century BC, condemned false prophets who lulled the people with cries of Peace where there was no peace — and cast their deceit as a builder's fraud. In his image one man runs up a flimsy wall while others hide its weakness by daubing it with untempered morter, a whitewash that conceals the defect beneath. God promises a storm of rain, hail and wind that will hurl the wall to the ground, laying bare its hidden foundation and consuming the men who papered over the danger. It is an uncannily precise figure for the Morandi collapse, in which engineers and executives stood accused of masking known corrosion with cosmetic fixes while the deep flaws went unrepaired. When the flyover fell on 14 August 2018 and killed 43, the daubing was stripped away. As in Ezekiel, judgment then fell upon those who had concealed the fault.",
        "excerpt": "Because, even because they have seduced my people, saying, Peace; and there was no peace; and one built up a wall, and, lo, others daubed it with untempered morter: Say unto them which daub it with untempered morter, that it shall fall: there shall be an overflowing shower; and ye, O great hailstones, shall fall; and a stormy wind shall rend it. … So will I break down the wall that ye have daubed with untempered morter, and bring it down to the ground, so that the foundation thereof shall be discovered, and it shall fall, and ye shall be consumed in the midst thereof: and ye shall know that I am the LORD.",
        "source": "Ezekiel 13:10–14, King James Version; Project Gutenberg (eBook 8026, Book 26: Ezekiel).",
        "href": "https://www.gutenberg.org/cache/epub/8026/pg8026-images.html",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a2.png",
          "alt": "An apocalyptic scene of a city and mountains collapsing into a fiery abyss under a stormy sky.",
          "credit": "John Martin, 'The Great Day of His Wrath' (1851–53), Tate Britain; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In the Gospel of Luke, Jesus recalls a disaster fresh in his hearers' memory: those eighteen upon whom the tower in Siloam fell, and slew them. He invokes it to reject the easy notion that the dead were greater sinners than anyone else — they were ordinary people crushed by a falling structure. The moment fixes in scripture the oldest terror of built things: a tower, trusted daily, that suddenly kills those beneath it. So it was in Genoa on 14 August 2018, when 43 drivers and passengers — commuters, holidaymakers, whole families — plunged with their cars as the Morandi flyover gave way, blameless victims of a structure that failed. Luke's verse insists such deaths demand not fatalism but reckoning, a note answered by the Italian court that convicted 32 people and sentenced Giovanni Castellucci to twelve years.",
        "excerpt": "Or those eighteen, upon whom the tower in Siloam fell, and slew them, think ye that they were sinners above all men that dwelt in Jerusalem? I tell you, Nay: but, except ye repent, ye shall all likewise perish.",
        "source": "Luke 13:4–5, King James Version; Project Gutenberg (eBook 8042, Book 42: Luke).",
        "href": "https://www.gutenberg.org/cache/epub/8042/pg8042-images.html",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a3.png",
          "alt": "Nineteenth-century engraving of the Pool of Siloam in Jerusalem.",
          "credit": "Henry Baker Tristram, 'The Pool of Siloam,' from Scenes in the East (1870); British Library via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Pieter Bruegel the Elder painted 'The Tower of Babel' in 1563, now in the Kunsthistorisches Museum in Vienna: a colossal spiralling tower, modelled on the Roman Colosseum, climbing into the clouds even as its lower storeys already crack and lean. Bruegel makes visible the ancient warning against overreaching construction — a monument to human pride whose scale outruns its stability and is fated to fall. That doomed ambition speaks directly to the hubris behind the Morandi bridge, a 1960s marvel of soaring concrete its makers trusted to defy both time and neglect. In Bruegel's canvas the flaw is woven into the very fabric, just as prosecutors argued corrosion and cut corners were built into Genoa's flyover. Five centuries on, the painting remains the perfect emblem of the theme the Genoa verdict names: great works raised in vanity that collapse upon the people below.",
        "excerpt": "Bruegel's vast tower spirals upward storey upon storey into the clouds, swarming with cranes, scaffolds and toiling labourers, its tiers of arches modelled on the Roman Colosseum. Yet the mountain of masonry already tilts and fractures at its base, the whole enterprise leaning as if it knows it cannot stand — a monument to overreaching ambition built, from its first stone, to fall.",
        "source": "Pieter Bruegel the Elder, The Tower of Babel (1563), oil on panel, Kunsthistorisches Museum, Vienna; Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Pieter_Bruegel_the_Elder_-_The_Tower_of_Babel_(Vienna)_-_Google_Art_Project_-_edited.jpg",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a4.png",
          "alt": "A towering spiral of masonry rising into the clouds, cracking and leaning at its base.",
          "credit": "Pieter Bruegel the Elder, 'The Tower of Babel' (1563), Kunsthistorisches Museum, Vienna; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Giuseppe Verdi composed his 'Messa da Requiem' in 1874 to mourn the Italian writer Alessandro Manzoni, and its 'Dies irae' — day of wrath — erupts with hammer-blow chords, thundering drums and a terror-struck chorus depicting the Day of Judgment. It is Italy's own great music of grief and reckoning, a mass for the dead that also stages the moment when hidden deeds are called to account. For a nation burying the 43 killed at Genoa, Verdi's Requiem is the fitting sound: at once a lament for the innocent dead and the trembling arrival of judgment. The 'Dies irae' text, an ancient sequence Verdi set to overwhelming force, imagines the world dissolved in ashes and every act weighed in the balance. As an Italian court weighed the guilt of those who let the Morandi bridge decay, Verdi's music supplies both the requiem and the wrath.",
        "excerpt": "Dies iræ, dies illa, / Solvet sæclum in favilla: / Teste David cum Sibylla. — 'Day of wrath and doom impending! / David's word with Sibyl's blending, / Heaven and earth in ashes ending!'",
        "source": "Giuseppe Verdi, Messa da Requiem (1874); 'Dies irae' sequence (Latin text attrib. Thomas of Celano), English trans. William J. Irons (1849); full score at IMSLP.",
        "href": "https://imslp.org/wiki/Requiem_(Verdi,_Giuseppe)",
        "image": {
          "src": "/covers/genoa-bridge-verdict--a5.png",
          "alt": "Pastel portrait of the composer Giuseppe Verdi in a white scarf and top hat.",
          "credit": "Giovanni Boldini, 'Portrait of Giuseppe Verdi' (1886), Galleria Nazionale d'Arte Moderna, Rome; Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "uk-gripen-jets-ukraine",
    "headline": "Britain commits 300 million euros to help Sweden send 16 Gripen fighter jets to Ukraine",
    "overview": "Visiting Kyiv on 16 July 2026, UK Prime Minister Keir Starmer pledged 300 million euros to help urgently deliver 16 Swedish Saab Gripen fighter jets to Ukraine, part of a package including pilot and engineer training, simulators and spare parts to strengthen Ukraine's defence of its skies against Russian attacks. Ukraine also plans to buy 20 more Gripens through an EU loan, aiming to field a squadron of the fighters by 2029. British firms supply more than 30% of each aircraft, and the government said at least 50 UK-based companies and over 5,000 jobs would benefit.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiuwFBVV95cUxOLU9xQTFVdEtCNExlUkNEWEFteS1IcWgxS2lGYzVONmUwTEpQMDFhM01SVWZ2c0tiQnJIT1BUbm5BM2JoUmZEWl9EMVJLb1gtcUdZb1VIUGRJSWhibFJjUTJjOGgzV0hPTFhIUXB2YmxpeElZekt1X2pKeF8zNTh1SEJRMjNwenZZX2hnc29DbzZDRXlwRlZYYkZKc0E4Wnc3V3d4QnVzREhsSW5hWVlWSVFuMWdYRGo1Tm40?oc=5"
      },
      {
        "name": "GOV.UK",
        "href": "https://www.gov.uk/government/news/prime-minister-commits-300-million-to-fund-fighter-jets-for-ukraine-backing-british-jobs-and-bolstering-ukraines-defence"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/uk-gripen-jets-ukraine.png",
      "alt": "A pair of Swedish Saab JAS 39 Gripen fighter jets in flight.",
      "credit": "Wikimedia Commons"
    },
    "rank": 15,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 433 BC the island republic of Corcyra (modern Corfu), outmatched by the great naval power of Corinth, sent envoys to Athens begging to be received into alliance. As the historian Thucydides records in Book I of his History of the Peloponnesian War, the Athenians held two stormy assemblies, reversed their first inclination, and voted to back the smaller state, dispatching ten ships that helped it survive the Battle of Sybota. Just as Britain now pledges 300 million euros and Sweden its Gripen jets so a lesser partner can hold off a mightier aggressor, Athens threw its power behind an endangered ally. Athenians even insisted it be a defensive, not offensive, alliance, mirroring the careful framing of aid to Ukraine as purely for the defence of its skies. The intervention helped tip a local quarrel into the wider Peloponnesian War, a lasting warning that arming an ally is never a small decision.",
        "excerpt": "In the first there was a manifest disposition to listen to the representations of Corinth; in the second, public feeling had changed and an alliance with Corcyra was decided on, with certain reservations. ... Athens received Corcyra into alliance and, on the departure of the Corinthians not long afterwards, sent ten ships to their assistance.",
        "source": "Thucydides, History of the Peloponnesian War, Book I.44–45, trans. Richard Crawley (1874).",
        "href": "http://classics.mit.edu/Thucydides/pelopwar.1.first.html",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a0.png",
          "alt": "Marble bust of the historian Thucydides, a Roman-era copy of a 4th-century BC Greek original, Royal Ontario Museum.",
          "credit": "Royal Ontario Museum; photograph by Captmondo, released to the public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 29 December 1940, with Britain standing nearly alone against Nazi Germany, President Franklin D. Roosevelt used a national radio fireside chat to declare that the United States must become the great arsenal of democracy, supplying guns, planes and ships to nations fighting the aggressors. The pledge became law with the Lend-Lease Act of 11 March 1941, under which America eventually sent billions in weaponry, including nearly 5,000 Bell P-39 Airacobra fighters gifted to the Soviet Union, to allies it would not fight beside directly. Keir Starmer's 300-million-euro commitment so that Swedish Gripens can defend Ukraine is a lineal descendant of that idea: a wealthier power financing the airpower of a nation under attack. Then as now, the gift came bundled with training, spares and industrial partnership rather than troops. Roosevelt's warning that aiding an embattled friend was an emergency as serious as war itself echoes in every European capital arming Kyiv today.",
        "excerpt": "We must be the great arsenal of democracy. For us this is an emergency as serious as war itself.",
        "source": "Franklin D. Roosevelt, Fireside Chat on National Security (\"The Great Arsenal of Democracy\"), 29 December 1940.",
        "href": "https://en.wikisource.org/wiki/Arsenal_of_Democracy",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a1.png",
          "alt": "Rows of Bell P-39 Airacobra fighter aircraft on the assembly line at Bell Aircraft, Wheatfield, New York, during World War II.",
          "credit": "Library of Congress, FSA/OWI Collection, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book XVIII of Homer's Iliad, the sea-goddess Thetis, desperate to save her son Achilles as he prepares to face Hector, climbs to Olympus and begs the smith-god Hephaestus (Vulcan) to forge him new armour. The god fashions a vast, five-layered shield emblazoned with the whole cosmos, earth, sea, and cities at peace and at war, a divine gift that is at once protection and emblem of a civilization worth defending. The scene maps closely onto Ukraine receiving sixteen Gripen jets to shield its skies: airpower as both practical armour and a symbol that a besieged people will not be left defenceless. Like Achilles, whose old armour was stripped from him, Ukraine has lost aircraft and needs the arms of a greater friend to fight on. The shield of Achilles has for three thousand years stood as the archetype of the arms one gives to a warrior facing a mortal foe.",
        "excerpt": "First he shaped the shield so great and strong, adorning it all over and binding it round with a gleaming circuit in three layers; and the baldric was made of silver. He made the shield in five thicknesses, and with many a wonder did his cunning hand enrich it.",
        "source": "Homer, The Iliad, Book XVIII, trans. Samuel Butler (1898).",
        "href": "https://en.wikisource.org/wiki/The_Iliad_(Butler)/Book_XVIII",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a2.png",
          "alt": "Benjamin West's 1804 painting 'Thetis Bringing the Armor to Achilles,' the goddess delivering the divinely forged arms to her son.",
          "credit": "Benjamin West (1804), Los Angeles County Museum of Art, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In 1 Samuel 17, the shepherd boy David confronts the Philistine giant Goliath, who has terrified the entire army of Israel. King Saul first tries to clothe David in his own royal armour, helmet and sword, but the boy, unaccustomed to such equipment, sets it aside because he has not 'proved' it, and goes out trusting in God and a sling. The episode carries two threads that illuminate the Gripen gift: the arming of a smaller champion by a greater power, and the hard truth that weapons are useless without the training to wield them, precisely why the British package includes simulators, instructors and spares. Ukraine, the outmatched David against a Russian Goliath, needs not only aircraft but the skill to make them battle-ready. David's cry that 'the battle is the LORD's' has become a rallying figure for every small nation defying a giant.",
        "excerpt": "And Saul armed David with his armour, and he put an helmet of brass upon his head; also he armed him with a coat of mail. And David girded his sword upon his armour, and he assayed to go; for he had not proved it. And David said unto Saul, I cannot go with these; for I have not proved them. And David put them off him.",
        "source": "The Holy Bible, King James Version, 1 Samuel 17:38–39.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a3.png",
          "alt": "Caravaggio's painting 'David with the Head of Goliath' (c. 1610), the young David holding the severed head of the fallen giant.",
          "credit": "Caravaggio (c. 1610), Galleria Borghese, Rome, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Diego Velázquez painted 'La Fragua de Vulcano' (The Forge of Vulcan) in Rome in 1630, showing the god Vulcan and his sweating labourers at the anvil, hammering out armour, when they are interrupted by Apollo bringing news of war and betrayal. The canvas, now in the Museo del Prado in Madrid, turns the workshop of weapons into high drama: a gleaming breastplate and helmet take shape as the tools of coming conflict. It is a vivid emblem of what stands behind the Gripen pledge, the factories and firms, British and Swedish, forging and supplying the components of the jets destined for Ukraine. Velázquez reminds us that every gift of arms begins as fire, sweat and craftsmanship in a mortal forge. The very interruption by Apollo mirrors how news from a distant war can reorder the priorities of an entire arsenal.",
        "excerpt": "Velázquez freezes the instant word of war reaches the smithy: the near-naked smiths turn sharply from their anvil, a half-finished suit of armour glowing on the workbench, hard light catching the metal soon to be carried into battle. It is Baroque realism enlisting even the gods in the grimy industry of arming a cause.",
        "source": "Diego Velázquez, The Forge of Vulcan (La Fragua de Vulcano), 1630, oil on canvas, Museo Nacional del Prado, Madrid.",
        "href": "https://commons.wikimedia.org/wiki/File:Vel%C3%A1zquez_-_La_Fragua_de_Vulcano_(Museo_del_Prado,_1630).jpg",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a4.png",
          "alt": "Velázquez's painting 'The Forge of Vulcan' (1630), smiths forging armour at the anvil as Apollo arrives with news of war.",
          "credit": "Diego Velázquez (1630), Museo Nacional del Prado, public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean Sibelius composed the tone poem 'Finlandia,' Op. 26, in 1899–1900 as a barely veiled protest against the Russian Empire's censorship and tightening control of Finland; its surging, defiant hymn became an unofficial anthem of a small Nordic nation's yearning to be free of St Petersburg's grip. To evade the Tsarist censors it was performed under disguised titles such as 'Happy Feelings at the Awakening of Finnish Spring,' turning resistance to Russian domination into pure sound. That resonance is uncannily apt now, as Sweden, Finland's Nordic neighbour, sends Gripen fighters to help Ukraine withstand a Russian assault and Nordic solidarity rallies to a besieged partner. Where Sibelius answered oppression with a melody of hope, today's coalition answers it with aircraft. The stirring 'Finlandia Hymn' remains, more than a century on, a musical emblem of the north defying Moscow.",
        "excerpt": "The work opens with brooding, growling brass that evokes oppression, then erupts into a turbulent, agitated allegro before resolving into the serene, hymn-like theme that has come to stand for a small nation's freedom. It is wordless defiance, a whole people's resolve compressed into some eight minutes of orchestral sound.",
        "source": "Jean Sibelius, Finlandia, Op. 26 (1899–1900), orchestral tone poem.",
        "href": "https://imslp.org/wiki/Finlandia,_Op.26_(Sibelius,_Jean)",
        "image": {
          "src": "/covers/uk-gripen-jets-ukraine--a5.png",
          "alt": "Portrait photograph of the Finnish composer Jean Sibelius, 1913.",
          "credit": "Photograph by Daniel Nyblin, 1913, public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "poland-teen-russia-sabotage",
    "headline": "Poland charges an 18-year-old recruited by Russia over sabotage and the desecration of war memorials",
    "overview": "Poland's Internal Security Agency (ABW) charged an 18-year-old Ukrainian national, identified under Polish privacy law as Illia K., with 47 offences committed between November 2024 and August 2025, including desecrating memorials to Poles killed in the World War Two Volhynia massacres and preparing acts of sabotage with a drone. Investigators said he was recruited online and paid in cryptocurrency through exchanges tied to Russia and China, and that the aim was to inflame ethnic hatred between Poland and Ukraine. The case is the latest that Warsaw attributes to a Russian campaign to sow division among Kyiv's allies.",
    "genre": "Conflict",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/cp305dx493do"
      },
      {
        "name": "Kyiv Independent",
        "href": "https://kyivindependent.com/poland-arrests-ukrainian-teenager-accused-of-russian-backed-sabotage/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/poland-teen-russia-sabotage.png",
      "alt": "A monument to victims of the wartime Volhynia massacres at a Polish cemetery.",
      "credit": "Wikimedia Commons"
    },
    "rank": 16,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On a single night in 415 BC, as Athens prepared to launch its great fleet against Sicily, unknown hands mutilated the Hermae, the sacred stone pillars of Hermes standing at doorways across the city. Thucydides records that the desecration was read not as vandalism but as an omen and evidence of a conspiracy to overthrow the democracy, unleashing informers, show trials and a witch-hunt that helped drive the brilliant Alcibiades to defect to Sparta. The defiling of civic monuments became a weapon that poisoned Athens against itself on the eve of war. Like Illia K.'s attacks on Polish war memorials, the Herm-smashing turned sacred stones into detonators of mass suspicion, exactly the fracturing an enemy hopes to provoke. In both cases the outrage over defaced monuments did as much political damage as any act of arms.",
        "excerpt": "The matter was taken up the more seriously, as it was thought to be ominous for the expedition, and part of a conspiracy to bring about a revolution and to upset the democracy.",
        "source": "Thucydides, History of the Peloponnesian War, Book 6.27 (Richard Crawley translation)",
        "href": "https://en.wikisource.org/wiki/History_of_the_Peloponnesian_War/Book_6"
      },
      {
        "category": "historical",
        "title": "In November 1605 a cell of English Catholic conspirators, with Guy Fawkes stationed beneath the House of Lords guarding thirty-six barrels of gunpowder, prepared to blow up King, Lords and Commons at the opening of Parliament. Backed by hopes of foreign Catholic support and radicalized abroad, the plotters were caught in the final hours before the sabotage could be executed, and King James I addressed Parliament days later describing the intended horror. The Gunpowder Plot fixed in memory the image of a covert cell readying a spectacular act of destruction against the state. Illia K., charged with 47 acts including preparing drone sabotage while directed from outside the country, is a modern heir to Fawkes: an agent apprehended in the preparatory phase, his devices staged but not yet fired. Both cases show sabotage foiled at the threshold, and both were seized upon to inflame communal hatred.",
        "excerpt": "This was not a crying sin of bloud as the former, but it may well be called a roaring, nay, a thundering sin of Fire and Brimstone.",
        "source": "King James I, Speech to Parliament on the Gunpowder Plot, 9 November 1605",
        "href": "https://famous-trials.com/gunpowder/2768-speech-of-king-james-to-parliament-regarding-gunpowder-plot",
        "image": {
          "src": "/covers/poland-teen-russia-sabotage--a1.png",
          "alt": "Engraving of the eight Gunpowder Plot conspirators, 1605, by Crispijn van de Passe the Elder.",
          "credit": "Crispijn van de Passe the Elder, 'The Gunpowder Plot Conspirators' (1605); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Book II of Virgil's Aeneid, the Greeks abandon a giant wooden horse outside Troy, and the priest Laocoon warns his countrymen that the gift conceals armed enemies and begs them not to admit it within the walls. His caution is drowned out by the false captive Sinon, whose tears and fabricated tale persuade the Trojans to breach their own defenses and drag destruction inside the city. The horse is the original fifth column: an instrument of a foreign power smuggled past the gates by deception. Russia's recruitment of Illia K. works the same logic, planting an agent inside Poland to detonate hostility between Poles and Ukrainians from within. As with Sinon, the danger is not the visible army but the persuasive lie and the hidden hand that turns a people's own trust against them.",
        "excerpt": "This hollow fabric either must inclose,\nWithin its blind recess, our secret foes;\nOr 'tis an engine rais'd above the town,\nT' o'erlook the walls, and then to batter down.\nSomewhat is sure design'd, by fraud or force:\nTrust not their presents, nor admit the horse.",
        "source": "Virgil, Aeneid, Book II, trans. John Dryden",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt",
        "image": {
          "src": "/covers/poland-teen-russia-sabotage--a2.png",
          "alt": "Giovanni Domenico Tiepolo's painting of the wooden horse being wheeled into Troy.",
          "credit": "Giovanni Domenico Tiepolo, 'The Procession of the Trojan Horse in Troy' (c. 1760), National Gallery, London; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Shakespeare's Othello, the ensign Iago, professing loyalty while confessing 'I am not what I am,' engineers the ruin of people who trust him by poisoning them with manufactured suspicion. In his soliloquy closing Act 2, he vows to turn Desdemona's own virtue into the snare that entangles Othello, Cassio and Desdemona alike, converting love and honor into jealousy and murder. Iago is the archetype of the agitator who profits by setting allies at one another's throats through insinuation rather than open attack. That is precisely the design behind Illia K.'s handlers: not to conquer, but to make Poles and Ukrainians, natural partners against Russia, distrust and hate each other. Iago's craft, like online recruitment paid in crypto, shows how cheaply a single manipulator can weaponize the good faith between neighbors.",
        "excerpt": "So will I turn her virtue into pitch,\nAnd out of her own goodness make the net\nThat shall enmesh them all.",
        "source": "William Shakespeare, Othello, Act 2, Scene 3 (Iago's soliloquy); 'I am not what I am,' Act 1, Scene 1",
        "href": "https://www.gutenberg.org/files/1531/1531-h/1531-h.htm",
        "image": {
          "src": "/covers/poland-teen-russia-sabotage--a3.png",
          "alt": "Othello and Desdemona, whom Iago destroys through manufactured jealousy.",
          "credit": "Otello and Desdemona, after a painting by Becker, in The Victrola Book of the Opera; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco Goya's 'Fight with Cudgels' (Duelo a garrotazos, c. 1820-1823), one of the Black Paintings he painted onto the walls of his house outside Madrid, shows two men clubbing each other bloody while sunk knee-deep in mud, unable to flee or step apart. Painted after the trauma of the Peninsular War and Spain's civil strife, it is a merciless emblem of fratricidal violence in which both combatants are trapped and doomed. The image captures exactly what Russia sought to manufacture between Poland and Ukraine: two peoples mired in shared history and beating each other while a third party looks on. Illia K.'s desecration of Volhynia-massacre memorials was designed to sink Poles and Ukrainians into just such a mutual, self-destructive brawl. Goya shows the endgame of incited hatred, neighbors locked in a fight neither can win.",
        "excerpt": "Goya painted two peasants bludgeoning each other with clubs, their legs swallowed by the earth so that neither can retreat, a stark parable of civil hatred in which the real victory belongs only to whoever set them fighting.",
        "source": "Francisco de Goya, Fight with Cudgels (Duelo a garrotazos), c. 1820-1823, Museo del Prado, Madrid",
        "href": "https://commons.wikimedia.org/wiki/File:Francisco_de_Goya_y_Lucientes_-_Duelo_a_garrotazos.jpg",
        "image": {
          "src": "/covers/poland-teen-russia-sabotage--a4.png",
          "alt": "Goya's Black Painting of two men fighting with clubs while trapped up to their knees in mud",
          "credit": "Francisco de Goya, Fight with Cudgels (c. 1820-1823), Museo del Prado, via Wikimedia Commons (public domain)"
        }
      },
      {
        "category": "artistic",
        "title": "Modest Mussorgsky's opera 'Boris Godunov' (1874) dramatizes the Time of Troubles, when Grigory Otrepyev, a young runaway monk, is transformed into the False Dmitri, a pretender claiming to be the murdered tsarevich. Backed by Poland and marched east to destabilize Russia, this fabricated youth becomes the living instrument of a foreign power's ambitions, plunging the realm into chaos and war. The parallel to Illia K. is uncanny in reverse: then a young man was made into a weapon aimed across the Polish-Russian frontier, now Russia forges a young Ukrainian into a tool aimed back the other way. Mussorgsky's drama, built on Pushkin, shows how empires manufacture and deploy expendable young agents to inflame a neighboring nation. The recruited pretender, like the crypto-paid teenager, is used and ultimately discarded by his sponsors.",
        "excerpt": "Mussorgsky sets the impostor Dmitri against the guilt-haunted tsar, letting a manufactured young pretender, propped up by a foreign court, ignite a war that consumes a kingdom, the recruited agent as the spark others strike.",
        "source": "Modest Mussorgsky, Boris Godunov (opera, 1874), after Alexander Pushkin's drama",
        "href": "https://imslp.org/wiki/Boris_Godunov_(Mussorgsky,_Modest)",
        "image": {
          "src": "/covers/poland-teen-russia-sabotage--a5.png",
          "alt": "Feodor Chaliapin costumed as Boris Godunov in Mussorgsky's opera",
          "credit": "Feodor Chaliapin as Boris Godunov (1916), photo by Lev Leonidov, via Wikimedia Commons (public domain)"
        }
      }
    ]
  },
  {
    "slug": "france-fontainebleau-arson",
    "headline": "A volunteer firefighter is charged with starting the Fontainebleau forest fire as Macron vows zero tolerance for arson",
    "overview": "An 18-year-old volunteer firefighter was placed under formal investigation and remanded in custody over a blaze that tore through more than 2,000 hectares of France's historic Fontainebleau forest, a UNESCO biosphere reserve south of Paris; he confessed to setting fire to twigs with a lighter and petrol before retracting the admission. Six people in total have been detained in the wider arson inquiry. Amid record heat and the worst wildfire season since the Second World War, with some 35,000 hectares burned nationwide, President Emmanuel Macron pledged zero tolerance for those who start fires.",
    "genre": "Climate",
    "sources": [
      {
        "name": "BBC",
        "href": "https://www.bbc.co.uk/news/articles/ce97zd8yx1xo"
      },
      {
        "name": "The Local France",
        "href": "https://www.thelocal.fr/20260716/macron-pledges-zero-tolerance-for-arson-after-spate-of-fires-in-france"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/france-fontainebleau-arson.png",
      "alt": "Smoke and flames rising through the Fontainebleau forest during the July 2026 fire.",
      "credit": "Wikimedia Commons"
    },
    "rank": 17,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On a night in 356 BC a young Ephesian named Herostratus set fire to the Temple of Artemis, one of the Seven Wonders of the ancient world, confessing that he did it for one reason only: to make his name immortal. The outraged Ephesians executed him and passed a decree forbidding anyone ever to speak his name, yet the historian Theopompus recorded it and it survives to this day. Like the 18-year-old volunteer firefighter accused of igniting the UNESCO-listed Fontainebleau forest, Herostratus is the archetypal firestarter whose target is precisely what a whole society holds sacred. The geographer Strabo, writing three centuries later, notes flatly that the sanctuary was torched and then rebuilt grander than before. The wound, as with a 2,000-hectare loss of ancient woodland, was to a shared inheritance that no rebuilding fully restores.",
        "excerpt": "But when it was set on fire by a certain Herostratus, the citizens erected another and better one, having collected the ornaments of the women and their own individual belongings, and having sold also the pillars of the former temple.",
        "source": "Strabo, Geography 14.1.22, trans. H. L. Jones (Loeb Classical Library), via Bill Thayer's LacusCurtius.",
        "href": "https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Strabo/14A*.html",
        "image": {
          "src": "/covers/france-fontainebleau-arson--a0.png",
          "alt": "A 1572 engraving imagining the Temple of Artemis at Ephesus, with figures setting the wonder ablaze.",
          "credit": "Philip Galle after Maarten van Heemskerck, 'Temple of Artemis at Ephesus' (1572), public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "The Great Fire of London, 2-5 September 1666, broke out in Thomas Farriner's bakery on Pudding Lane and consumed some 13,000 houses and medieval St Paul's Cathedral before it was checked. Samuel Pepys watched from a boat on the Thames, buried his wine and Parmesan cheese in his garden, and recorded the pigeons that clung to their eaves until their wings caught fire. In the panic Londoners hunted for arsonists and lynched foreigners; a French watchmaker, Robert Hubert, gave a false confession and was hanged for a fire he could not have started. The episode prefigures the Fontainebleau blaze on every axis: a beloved landscape devoured, a public terror of the incendiary, and a lone suspect whose confession did not fit the facts, set against a leader's demand for exemplary punishment.",
        "excerpt": "Everybody endeavouring to remove their goods, and flinging into the river or bringing them into lighters that layoff; poor people staying in their houses as long as till the very fire touched them, and then running into boats, or clambering from one pair of stairs by the water-side to another. And among other things, the poor pigeons, I perceive, were loth to leave their houses, but hovered about the windows and balconys till they were, some of them burned, their wings, and fell down.",
        "source": "Samuel Pepys, The Diary of Samuel Pepys, entry for Sunday 2 September 1666.",
        "href": "https://www.pepysdiary.com/diary/1666/09/02/",
        "image": {
          "src": "/covers/france-fontainebleau-arson--a1.png",
          "alt": "An anonymous c.1675 painting of the Great Fire of London seen from the Thames near Tower Wharf, the skyline a wall of flame.",
          "credit": "Unknown artist, 'The Great Fire of London' (c.1675), Museum of London; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book II of Virgil's Aeneid (composed c. 29-19 BC), Aeneas recounts to Dido the night Troy fell, after the Trojans themselves wheeled the wooden horse inside their own walls and loosed the Greeks hidden within. The guardians of the city thus become the instruments of its ruin, and by dawn the flames, whipped by wind and 'Vulcan's rage,' roll like a flood toward the palace of Anchises. Dryden's 1697 translation renders the conflagration as a living beast that devours the standing corn and the sleeping town alike. The image of a great, protected place consumed from within maps onto Fontainebleau's ancient forest, and onto the paradox of a sworn protector accused of loosing the fire. Troy's burning is Western literature's founding scene of a homeland turned to ash.",
        "excerpt": "He said. The crackling flames appear on high. / And driving sparkles dance along the sky. / With Vulcan's rage the rising winds conspire, / And near our palace roll the flood of fire.",
        "source": "Virgil, Aeneid, Book II, trans. John Dryden (1697); Project Gutenberg eBook #228.",
        "href": "https://www.gutenberg.org/cache/epub/228/pg228.txt",
        "image": {
          "src": "/covers/france-fontainebleau-arson--a2.png",
          "alt": "A late-16th-century landscape of Troy engulfed in fire beneath a smoke-blackened sky.",
          "credit": "Kerstiaen de Keuninck, 'The Fire of Troy' (late 16th century), public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ray Bradbury's 1953 novel Fahrenheit 451 imagines a future in which 'firemen' no longer put out fires but start them, burning outlawed books and the houses that conceal them. Its protagonist, Guy Montag, wears a salamander badge and wields a kerosene hose, taking a craftsman's pleasure in destruction until doubt undoes him. The premise is an exact inversion of the guardian into the incendiary, the same reversal that shocks in the Fontainebleau case, where an 18-year-old volunteer firefighter stands accused of setting the forest he had pledged to defend. Bradbury makes arson a uniformed public duty rather than a crime, forcing the question of what happens when the protector's authority becomes the very means of the harm. It is the definitive modern fable of the firefighter as firestarter.",
        "excerpt": "Bradbury's firemen are the state's arsonists in reverse-uniform: their engines carry kerosene, not water, and their sworn task is to reduce forbidden libraries to ash. Montag's slow horror at what his badge licenses mirrors the unease of a community learning that one of its own rescuers may have struck the match. The book turns the trusted extinguisher of flame into its most efficient bringer.",
        "source": "Ray Bradbury, Fahrenheit 451 (Ballantine Books, 1953).",
        "href": "https://en.wikipedia.org/wiki/Fahrenheit_451"
      },
      {
        "category": "artistic",
        "title": "When the Palace of Westminster caught fire on the night of 16 October 1834, J. M. W. Turner joined the crowds along the Thames and afterward painted two oil canvases of the inferno, now in the Philadelphia and Cleveland museums of art. His brush dissolves the solid Gothic stone of the Houses of Lords and Commons into a roaring furnace of white and orange, its reflection smeared across the black river. The seat of the nation's lawmakers, its very guardians, is shown liquefied by flame, an emblem of order and heritage undone in a night. Turner painting an actual, witnessed conflagration parallels the news imagery of Fontainebleau burning, where a national treasure met the same fate. Fire in his hands is sublime and terrible at once, exactly the double face it wears in the Fontainebleau story.",
        "excerpt": "Turner's canvas turns architecture into weather: the Houses of Parliament are barely legible, a pale skeleton swallowed by a column of incandescent heat that stains the sky and the Thames alike. Spectators crowd the near bank as tiny dark shapes, dwarfed by the blaze. The painting insists that fire is both spectacle and catastrophe.",
        "source": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons, 16 October 1834' (oil on canvas, 1834-35), Philadelphia Museum of Art.",
        "href": "https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner,_English_-_The_Burning_of_the_Houses_of_Lords_and_Commons,_October_16,_1834_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/france-fontainebleau-arson--a4.png",
          "alt": "Turner's painting of the Houses of Parliament dissolving into a blaze of white and orange fire above the Thames.",
          "credit": "J. M. W. Turner, 'The Burning of the Houses of Lords and Commons' (1834-35), Philadelphia Museum of Art; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "In Richard Wagner's Der Ring des Nibelungen, fire is the element of Loge, the flickering demigod who is at once servant, tool and menace. At the close of Die Walkure (1870) the god Wotan punishes his daughter Brunnhilde by ringing her rock with Loge's flames, a wall that both protects and imprisons her, crying 'Loge! Loge! Appear!' The whole four-opera cycle then ends in Gotterdammerung with a funeral pyre that consumes Valhalla and the gods themselves, the guardians destroyed by their own fire. This is fire as both instrument and terror, and the divine protectors undone by the very force they command, a mythic mirror of a firefighter charged with arson amid what Macron called France's worst wildfire season since the Second World War. Arthur Rackham's 1910 illustration captures Wotan summoning the encircling flame.",
        "excerpt": "Appear, flickering fire, / Encircle the rock with thy flame! / Loge! Loge! Appear!",
        "source": "Richard Wagner, Der Ring des Nibelungen - Die Walkure (1870); English text trans. Margaret Armour, illustrated by Arthur Rackham, 'The Rhinegold & The Valkyrie' (1910).",
        "href": "https://commons.wikimedia.org/wiki/File:Rhinegold_and_the_Valkyries_p_156.jpg",
        "image": {
          "src": "/covers/france-fontainebleau-arson--a5.png",
          "alt": "Arthur Rackham's 1910 illustration of Wotan summoning Loge's magic fire to encircle the sleeping Brunnhilde on her rock.",
          "credit": "Arthur Rackham, illustration for 'The Rhinegold & The Valkyrie' (1910); public domain via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "new-zealand-earthquake",
    "headline": "A magnitude-5.9 earthquake shakes New Zealand's South Island near Te Anau, briefly triggering a tsunami warning",
    "overview": "A strong earthquake struck about 40 km north of Te Anau, the gateway to New Zealand's Fiordland region, at 9:14pm local time, shaking buildings across the South Island and prompting authorities to issue a tsunami warning that was cancelled soon after. The National Emergency Management Agency initially assessed the quake at magnitude 6.3 before revising it down to 5.9, and warned of strong and unusual currents at the shore. There were no immediate reports of injuries or serious damage.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMiwAFBVV95cUxNeW1UaGdnakdTVjQxaGZxbGE2YTJSWkotZW9aOHUwaWFsNF84ci1Bb0sxbDdNNF9Lc2VQU2lNM3pKcHp1aUo1dEljazhQTUxTUk45STRpMXo1aHAzTlJVWDhjM3ItSFNabHhjcGl1ejFWYnZ3ZFdjblcxU1N5Tm9ndjJMQlN3TDZJcW9PRFlkdHQtME1UbUVwQWk1VWVKNVhlbm5FMXh0M2JfbWhMM004REdoRHZ2aXdIOWVJbFBsNEY?oc=5"
      },
      {
        "name": "NZ City",
        "href": "https://home.nzcity.co.nz/news/article.aspx?id=450058&fm=psp%2Ctsp"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/new-zealand-earthquake.png",
      "alt": "A seismograph trace recording a New Zealand earthquake.",
      "credit": "Wikimedia Commons"
    },
    "rank": 18,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "At dawn on 21 July 365 AD one of antiquity's greatest earthquakes, now estimated above magnitude 8, ruptured the seafloor near Crete and hurled a tsunami across the eastern Mediterranean. The Roman historian Ammianus Marcellinus, writing within a generation, described the sea recoiling from the land to bare its muddy depths, then surging back to fling ships onto rooftops at Alexandria and drown thousands; the city long marked the anniversary as a 'day of horror.' That is precisely the sequence Fiordland briefly feared on the night of the magnitude-5.9 Te Anau quake, the ground convulsing while the sea threatened to answer with a wave. New Zealand's warning of strong, unusual currents was cancelled without harm, only sharpening the ancient contrast, where no siren warned anyone at all. Then as now, humanity stood small before a trembling earth and an unquiet sea.",
        "excerpt": "For a little before sunrise there was a terrible earthquake, preceded by incessant and furious lightning. The sea was driven backwards, so as to recede from the land, and the very depths were uncovered, so that many marine animals were left sticking in the mud... Many ships were stranded on the dry shore... In another quarter the waves, as if raging against the violence with which they had been driven back, rose, and swelling over the boiling shallows, beat upon the islands and the extended coasts of the mainland, levelling cities and houses wherever they encountered them.",
        "source": "Ammianus Marcellinus, Roman History (Res Gestae), Book XXVI.10.15–19, trans. C. D. Yonge (1862)",
        "href": "https://www.tertullian.org/fathers/ammianus_26_book26.htm",
        "image": {
          "src": "/covers/new-zealand-earthquake--a0.png",
          "alt": "A page from the ninth-century Codex Vaticanus lat. 1873, the manuscript preserving Ammianus Marcellinus's Roman History.",
          "credit": "Ammianus Marcellinus, Codex Vaticanus lat. 1873. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On the morning of 1 November 1755, All Saints' Day, an earthquake of roughly magnitude 8.5 destroyed Lisbon; some forty minutes later a tsunami surged up the Tagus, and fires then burned for days, killing tens of thousands. The English resident Reverend Charles Davy left a celebrated eyewitness letter describing the walls rocking, then a general cry that the sea was coming in as the river rose 'like a mountain' and rushed the shore. The catastrophe shattered Enlightenment optimism and provoked Voltaire and Kant to wrestle with nature's indifferent power. Te Anau's residents, feeling their houses shake at 9:14pm and hearing a tsunami warning issued, relived in miniature that primal sequence of tremor and then dread of the wave. Here, mercifully, the warning was lifted and no wave came.",
        "excerpt": "I heard a general outcry, \"The sea is coming in, we shall be all lost.\" Upon this, turning my eyes towards the river, which in that place is nearly four miles broad, I could perceive it heaving and swelling in the most unaccountable manner, as no wind was stirring. In an instant there appeared, at some small distance, a large body of water, rising as it were like a mountain. It came on foaming and roaring, and rushed towards the shore with such impetuosity, that we all immediately ran for our lives.",
        "source": "Rev. Charles Davy, eyewitness account of the Lisbon earthquake of 1 November 1755 (published 1755)",
        "href": "https://sourcebooks.fordham.edu/mod/1755lisbonquake.asp",
        "image": {
          "src": "/covers/new-zealand-earthquake--a1.png",
          "alt": "Jacques-Philippe Le Bas's 1757 engraving of the ruined Ópera do Tejo in Lisbon after the 1755 earthquake.",
          "credit": "Jacques-Philippe Le Bas, ruins of the Ópera do Tejo, 1757 engraving. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Psalm 46, one of the Hebrew Bible's great hymns of confidence, imagines the very worst nature can do, the earth removed, mountains toppling into the sea, and the waters roaring, and answers it with trust rather than terror. Its imagery of quaking ground and swelling, thundering water maps directly onto the Te Anau event: the trembling earth of Fiordland and the warning of surging, unusual seas. Written millennia before seismology, it names humanity's oldest instinct when the ground moves, the fear that the mountains themselves might slide into the ocean. The psalm's refusal to fear is precisely the composure New Zealanders were asked to hold as the tsunami alert was assessed and then cancelled. Martin Luther later drew his hymn 'Ein feste Burg' from this same text.",
        "excerpt": "God is our refuge and strength, a very present help in trouble. Therefore will not we fear, though the earth be removed, and though the mountains be carried into the midst of the sea; Though the waters thereof roar and be troubled, though the mountains shake with the swelling thereof. Selah.",
        "source": "Psalm 46:1–3, King James Version (1611)",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Psalms",
        "image": {
          "src": "/covers/new-zealand-earthquake--a2.png",
          "alt": "John Martin's apocalyptic painting 'The Great Day of His Wrath,' with mountains crashing into a churning sea.",
          "credit": "John Martin, 'The Great Day of His Wrath' (c.1851), Tate Britain. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "In Book 20 of Homer's Iliad, as the gods enter the battle for Troy, Zeus thunders from heaven while Poseidon the Earth-Shaker makes the vast earth and the peaks of Ida quake, and Hades leaps from his throne in terror lest the ground crack open above the realm of the dead. Composed perhaps in the eighth century BC, it is one of literature's most vivid figures of an earthquake as raw divine power before which even a god panics. That primal dread of the ground splitting is what a magnitude-5.9 jolt near Te Anau momentarily awakened, earth and sea seeming to stir at once. For the Greeks, Poseidon ruled both earthquake and wave, the same twin threat behind Fiordland's brief tsunami warning. Humanity's smallness before the trembling earth could hardly be drawn more starkly.",
        "excerpt": "The sire of gods and men thundered from heaven above, while from beneath Neptune shook the vast earth, and bade the high hills tremble. The spurs and crests of many-fountained Ida quaked, as also the city of the Trojans and the ships of the Achaeans. Hades, king of the realms below, was struck with fear; he sprang panic-stricken from his throne and cried aloud in terror lest Neptune, lord of the earthquake, should crack the ground over his head, and lay bare his mouldy mansions to the sight of mortals and immortals.",
        "source": "Homer, Iliad, Book XX, trans. Samuel Butler (1898)",
        "href": "https://www.gutenberg.org/cache/epub/2199/pg2199.txt",
        "image": {
          "src": "/covers/new-zealand-earthquake--a3.png",
          "alt": "Roman-era marble bust traditionally identified as the poet Homer, held in the British Museum.",
          "credit": "Bust of Homer, British Museum; photo by JW1805 (2005), via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Katsushika Hokusai's woodblock print 'Under the Wave off Kanagawa,' the Great Wave, from his Thirty-six Views of Mount Fuji (c.1831), is the world's most famous image of the sea's sudden, indifferent power. A towering wave with clawing foam curls over three slender boats and their crouching boatmen, dwarfing even the distant, snow-capped Mount Fuji. The composition captures exactly the fear that flickered across Fiordland when a tsunami warning followed the Te Anau quake, the possibility that the ordinary sea might rear into a wall of water. Hokusai's fishermen, tiny beneath the crest, embody humanity's smallness before an ocean that neither hates nor spares. The wave never broke over Te Anau, but for a few minutes its shadow was felt.",
        "excerpt": "Hokusai freezes the instant before impact: a colossal breaker, its crest splintering into finger-like claws of foam, hangs over boats of oarsmen who bow low and vanish into the trough. Serene Mount Fuji sits small and still on the horizon, utterly outscaled by the water. The print turns the tsunami dread of a coastal night into a single, unforgettable silhouette of nature's overwhelming force.",
        "source": "Katsushika Hokusai, 'Under the Wave off Kanagawa' (The Great Wave), from Thirty-six Views of Mount Fuji, c.1830–1833",
        "href": "https://commons.wikimedia.org/wiki/File:Great_Wave_off_Kanagawa2.jpg",
        "image": {
          "src": "/covers/new-zealand-earthquake--a4.png",
          "alt": "Hokusai's Great Wave, a giant clawing wave towering over small boats with Mount Fuji in the distance.",
          "credit": "Katsushika Hokusai, 'Under the Wave off Kanagawa' (c.1831), Library of Congress. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "This anonymous copper engraving, made in 1755, is the defining visual record of the Lisbon disaster: the city collapsing and ablaze, the Tagus whipped into churning water that swamps and sinks ships, and panicked figures fleeing in the foreground. Held today in the Museu da Cidade in Lisbon, it fuses the two terrors of that day, the splitting earth and the invading sea, into a single indelible scene. It renders in art precisely the compound threat that New Zealand's authorities weighed on the night of the Te Anau quake, when a tsunami warning and alerts of strong, unusual currents accompanied the shaking. The engraving's foreground panic is the human constant across every such event, from 1755 to 2026. In Fiordland the sea stayed its hand and the warning was withdrawn.",
        "excerpt": "The engraving shows Lisbon at the instant of ruin: towers toppling, flames leaping from broken houses, and the harbour water heaved into violent surges that capsize and sink ships at their moorings. In the foreground, tiny human figures scatter in terror, arms flung up, as the earth and the sea turn on the city at once. It is the earthquake and its tsunami compressed into one apocalyptic tableau.",
        "source": "Anonymous copper engraving, 1755, depicting the Lisbon earthquake and tsunami; Museu da Cidade, Lisbon",
        "href": "https://commons.wikimedia.org/wiki/File:1755_Lisbon_earthquake.jpg",
        "image": {
          "src": "/covers/new-zealand-earthquake--a5.png",
          "alt": "1755 copper engraving of Lisbon in ruins and flames, with a tsunami sinking ships and people fleeing in panic.",
          "credit": "Anonymous copper engraving, 1755, Museu da Cidade, Lisbon. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "merck-oral-cholesterol-pill",
    "headline": "The FDA approves Merck's Lipfendra, the first oral PCSK9 inhibitor to lower cholesterol",
    "overview": "The U.S. Food and Drug Administration approved Merck's once-daily pill enlicitide, branded Lipfendra, the first oral drug in the PCSK9-inhibitor class, which until now was available only as injections. In late-stage trials the tablet cut LDL, or 'bad' cholesterol, by 56% to 59% versus placebo in adults with high cholesterol, including people with inherited familial hypercholesterolemia. Analysts see the pill, taken as a 20 mg daily tablet, as a potential blockbuster that could broaden access to a powerful cholesterol-lowering therapy.",
    "genre": "Science",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNLVVrMEhiYUJsRW5aTnhRMjJsMHpYTEdsUC00dzdUNUNGYXljTzNTeEc3Nmw2ZkV5RmZHRmhabHBub0FhZDVWTW83dmUwMkJoaGJYT1dmZndsUmNjenlQOWxFQzF4engwMktlb1pEQzJHU0ZQelhoVTQ0aFZtX3AyY1ozOEF1MmgzX3JvQlVfWENtcGJFYXppS0l1cmRQZw?oc=5"
      },
      {
        "name": "CNN",
        "href": "https://www.cnn.com/2026/07/16/health/merck-cholesterol-pill-enlicitide"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/merck-oral-cholesterol-pill.png",
      "alt": "Capsules spilling from a medicine bottle.",
      "credit": "Wikimedia Commons"
    },
    "rank": 19,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1628 the English physician William Harvey published Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus, proving through dissection and measurement that the heart is a pump driving the blood ceaselessly around a closed circle. His work overturned Galen's 1,400-year-old doctrine and established the circulatory system that every modern cardiologist now takes for granted. Harvey's insight that substances travel the same continuous circuit is the intellectual bedrock on which a drug like enlicitide acts, clearing LDL cholesterol from the very bloodstream he first mapped. Just as Harvey turned the heart from a mystical organ into a knowable machine, Merck's Lipfendra turns the once injectable-only PCSK9 pathway into a daily pill. Both are moments when the diseases of the heart and blood yielded a little further to human understanding.",
        "excerpt": "I began to think whether there might not be a motion, as it were, in a circle.",
        "source": "William Harvey, Exercitatio Anatomica de Motu Cordis et Sanguinis in Animalibus (Frankfurt, 1628); Robert Willis trans., 'An Anatomical Disquisition on the Motion of the Heart and Blood in Animals,' Chapter VIII.",
        "href": "https://www.gutenberg.org/cache/epub/67065/pg67065.txt",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a0.png",
          "alt": "Oil portrait of William Harvey, discoverer of the circulation of the blood, c. 1627.",
          "credit": "Attributed to Daniël Mijtens, c. 1627, National Portrait Gallery, London (NPG 5115); public domain via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Beginning in 1971 at Japan's Sankyo company, the microbiologist Akira Endo screened thousands of fungal broths for a compound that could block HMG-CoA reductase, the key enzyme of cholesterol synthesis. By the end of 1973 he had isolated the first statin, compactin (ML-236B, or mevastatin), from the mold Penicillium citrinum, founding the drug class that would go on to save tens of millions of lives. Endo's quest — a lone researcher hunting a molecule to tame 'bad' cholesterol — is the direct ancestor of the 2026 approval of enlicitide. Where statins throttle the liver's production of cholesterol, Merck's oral PCSK9 inhibitor helps the liver clear LDL from the blood, and for the first time delivers that newer mechanism as a swallowable pill rather than an injection. The line runs straight from Endo's Petri dishes to Lipfendra's blister pack.",
        "excerpt": "More than fifty years after Endo bent over his culture plates, his lonely hunt for a mold that could lower cholesterol has become the template for a whole pharmacopoeia of the heart. Enlicitide extends that lineage: not a fungal metabolite but an engineered oral molecule, achieving in a once-daily tablet what once required a needle.",
        "source": "'Akira Endo: Father of Statins,' Cureus, vol. 16, no. 8 (August 30, 2024).",
        "href": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11439472/",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a1.png",
          "alt": "Chemical structure of mevastatin (compactin, ML-236B), the first statin isolated by Akira Endo.",
          "credit": "Structure of mevastatin; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Around 600 BCE the prophet Jeremiah cried out over a stricken people, 'Is there no balm in Gilead; is there no physician there?' — invoking the fragrant healing resin of Gilead as the age-old emblem of a longed-for cure. For millennia the phrase has stood for the ache of incurable suffering and the hope of a remedy that finally arrives. The FDA's approval of enlicitide answers that ancient question for millions with dangerously high cholesterol, including those born with familial hypercholesterolemia who inherit early heart attacks. Where Jeremiah's generation had only the balm of Gilead, such patients now have a once-daily pill that cuts LDL by well over half. It is the modern balm: a remedy carried, at last, into the house of the sick.",
        "excerpt": "Is there no balm in Gilead; is there no physician there? why then is not the health of the daughter of my people recovered?",
        "source": "The Holy Bible, King James Version (1611), Jeremiah 8:22.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Jeremiah",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a2.png",
          "alt": "Rembrandt's painting of the prophet Jeremiah lamenting the destruction of Jerusalem, 1630.",
          "credit": "Rembrandt van Rijn, 'Jeremiah Lamenting the Destruction of Jerusalem,' 1630, Rijksmuseum; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Ben Jonson's 1610 comedy The Alchemist skewers the era's dream of the philosopher's stone — the fabled substance that would transmute metals into gold and, as the deluded knight Sir Epicure Mammon boasts, cure every disease and restore youth itself. Mammon rhapsodizes that the elixir 'Cures all diseases coming of all causes,' collapsing a month's grief into a single day. Jonson mocked the charlatans peddling this fantasy, yet the underlying yearning — one remedy to defeat sickness and extend life — is exactly what modern science has slowly made real. Enlicitide is no mystical elixir, but it fulfills a sliver of Mammon's dream: a small daily dose that measurably beats back a lethal condition of the blood. The alchemist's fraudulent panacea has become, four centuries on, an FDA-approved pill.",
        "excerpt": "'Tis the secret / Of nature naturis'd 'gainst all infections, / Cures all diseases coming of all causes; / A month's grief in a day, a year's in twelve; / And, of what age soever, in a month.",
        "source": "Ben Jonson, The Alchemist (first performed 1610; printed 1612), Act II, Scene 1 (Sir Epicure Mammon).",
        "href": "https://www.gutenberg.org/files/4081/4081-h/4081-h.htm",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a3.png",
          "alt": "Joseph Wright of Derby's painting of an alchemist in his laboratory discovering phosphorus, 1771.",
          "credit": "Joseph Wright of Derby, 'The Alchymist, in Search of the Philosopher's Stone,' 1771, Derby Museum and Art Gallery; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Rembrandt van Rijn's 1632 masterpiece The Anatomy Lesson of Dr. Nicolaes Tulp, now in the Mauritshuis in The Hague, shows the celebrated Amsterdam physician dissecting a cadaver's forearm before a circle of rapt colleagues. The painting is a monument to the dawn of empirical medicine, the moment European science began to open the body and read its mechanisms directly. Tulp's illuminated hands, poised over the exposed tendons, embody the healer's quest to understand the flesh in order to mend it. That same investigative impulse — trace the mechanism, then intervene — produced Merck's oral PCSK9 inhibitor, which acts on a molecular pathway invisible to Tulp but continuous with his project. Where Tulp's students leaned in to see a sinew, today's researchers peer at the receptors that govern cholesterol in the blood.",
        "excerpt": "Under a shaft of light, Dr. Tulp lifts the dissected muscles of a corpse's forearm with forceps while seven Amsterdam surgeons crane forward, their faces caught between curiosity and awe. The open anatomy book at the cadaver's feet and the exact rendering of every sinew announce a new age in which the body is studied, not merely revered.",
        "source": "Rembrandt van Rijn, The Anatomy Lesson of Dr. Nicolaes Tulp, 1632, oil on canvas, Mauritshuis, The Hague (inv. 146).",
        "href": "https://commons.wikimedia.org/wiki/File:Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a4.png",
          "alt": "Rembrandt's 1632 group portrait showing Dr. Nicolaes Tulp dissecting a cadaver's arm before onlooking surgeons.",
          "credit": "Rembrandt van Rijn, 'The Anatomy Lesson of Dr. Nicolaes Tulp,' 1632, Mauritshuis, The Hague; public domain via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Samuel Luke Fildes's 1891 painting The Doctor, held at Tate Britain in London, depicts a Victorian physician keeping vigil at the bedside of a gravely ill child while the helpless parents wait in shadow. Painted in the era before antibiotics, it captures medicine's agonizing limits — a devoted doctor who can watch and comfort but cannot cure. Fildes drew on the death of his own young son, and the work became a beloved symbol of the caring but often powerless healer. The approval of enlicitide marks how far that vigil has traveled: the modern physician can now hand a patient a pill that removes a hidden killer from the blood long before it reaches the bedside. The lamp-lit helplessness of Fildes's doctor gives way to the quiet power of prevention.",
        "excerpt": "A bearded doctor sits forward on a plain chair, chin on hand, studying a child who lies feverish across two mismatched chairs as the first dawn light seeps through the cottage window. Behind him a mother buries her face in her arms while the father rests a hand on her shoulder, the whole scene suspended between dread and hope.",
        "source": "Samuel Luke Fildes, The Doctor, 1891, oil on canvas, Tate Britain, London (N01522).",
        "href": "https://commons.wikimedia.org/wiki/File:The_Doctor_Luke_Fildes_crop.jpg",
        "image": {
          "src": "/covers/merck-oral-cholesterol-pill--a5.png",
          "alt": "Luke Fildes's 1891 painting of a physician keeping watch over a sick child at dawn while the parents look on.",
          "credit": "Samuel Luke Fildes, 'The Doctor,' 1891, Tate Britain, London; public domain via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "reflect-orbital-space-mirror",
    "headline": "US regulators approve Reflect Orbital's satellite to beam reflected sunlight to Earth after dark",
    "overview": "The Federal Communications Commission authorised California start-up Reflect Orbital to launch Eärendil-1, a 142-kilogram satellite bearing an 18-metre reflective mirror designed to bounce sunlight down to chosen spots on the ground at night to light streets and power solar farms. The company envisions a constellation of up to 50,000 such mirrors by 2035. The American Astronomical Society opposed the licence, warning that the reflections could ruin the night sky for observatories and risk flash-blinding pilots and drivers.",
    "genre": "Technology",
    "sources": [
      {
        "name": "SpaceNews",
        "href": "https://spacenews.com/fcc-approves-first-reflect-orbital-satellite/"
      },
      {
        "name": "The Hill",
        "href": "https://thehill.com/policy/technology/5968228-fcc-approves-reflect-orbital/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/reflect-orbital-space-mirror.png",
      "alt": "A NASA concept illustration of a large reflective solar-power satellite in orbit above Earth.",
      "credit": "NASA; Wikimedia Commons"
    },
    "rank": 20,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 4 February 1993, Russian engineers aboard the Mir station unfurled Znamya 2, a 20-metre spinning Mylar mirror on the Progress M-15 cargo craft, and cast a 5-kilometre patch of light with the brightness of a full moon that swept across night-time Europe from southern France to western Russia at 8 km/s. It was history's first deliberate attempt to reflect sunlight to the dark side of Earth, championed by engineer Vladimir Syromyatnikov to lengthen the working day in the Arctic. A larger 25-metre successor, Znamya 2.5, snagged on a Progress antenna and tore during deployment on 5 February 1999, and the programme was abandoned. Reflect Orbital's FCC-approved Eärendil-1, with its 18-metre mirror and dream of 50,000 reflectors by 2035, is the direct descendant of this Soviet-era vision. Where Znamya was a brief, doomed prototype, the new venture proposes to make the second sun permanent — reviving the same promise and the same anxieties about a sky that never fully darkens.",
        "excerpt": "On the night of 4 February 1993 the deployed film caught the sun and threw a moving disc of moonlight roughly five kilometres wide across sleeping Europe; observers on the ground, where clouds allowed, glimpsed a fast pulse of brightness before the reflector tumbled on and burned up over Canada hours later. The 1999 sequel ripped on an antenna and died before it could shine, and no third mirror was ever built.",
        "source": "\"Znamya (satellite),\" Wikipedia (Znamya 2, 1993; Znamya 2.5, 1999)",
        "href": "https://en.wikipedia.org/wiki/Znamya_(satellite)"
      },
      {
        "category": "historical",
        "title": "According to a legend first recorded by Lucian in the 2nd century AD and elaborated by Anthemius of Tralles around 500 AD, the mathematician Archimedes defended Syracuse during the Roman siege of c. 213–212 BC by arraying polished mirrors to concentrate the sun's rays and set the enemy fleet ablaze. The tale casts sunlight itself as a weapon — the heavens' own fire bent by human ingenuity to a purpose the sun never intended. Modern reconstructions have kept the myth alive and contested: Ioannis Sakkas ignited a model ship at 50 metres with 70 mirrors in 1973, and MIT students charred a hull at 30 metres in 2005, while MythBusters ultimately declared it 'busted.' The parallel to Reflect Orbital is the founding gesture of the story: a genius who learns to catch and aim the sun. Then as now, the same feat that dazzles as engineering triumph raises the fear of light weaponised — telescopes blinded, pilots and drivers dazzled, the sky's neutrality lost.",
        "excerpt": "The oldest sources describe Archimedes turning banks of bronze mirrors upon the Roman ships until, focused to a single burning point, the reflected sun kindled their timbers from a distance — sunlight redirected by human hands into a beam that could scorch. Whether feat or fable, the image endured for two millennia as the archetype of a mortal who learned to command the light of the sky.",
        "source": "\"Archimedes' heat ray,\" Wikipedia, citing Lucian (2nd c. AD) and Anthemius of Tralles (c. 500 AD)",
        "href": "https://en.wikipedia.org/wiki/Archimedes%27_heat_ray",
        "image": {
          "src": "/covers/reflect-orbital-space-mirror--a1.png",
          "alt": "Fresco of Archimedes using an array of mirrors to focus sunlight and set Roman ships ablaze during the Siege of Syracuse",
          "credit": "Giulio Parigi, 'Archimedes' Mirror' (c. 1599–1600), Stanzino delle Matematiche, Uffizi, Florence — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Aeschylus's tragedy Prometheus Bound (c. 5th century BC), the Titan Prometheus is nailed to a Caucasian crag by Zeus for the crime of stealing celestial fire and handing it to mortals hidden in a fennel stalk. The fire is at once the supreme gift — teacher of every art and mother of civilisation — and an unforgivable trespass against the prerogatives of heaven, for which Prometheus suffers eternal torment. The play frames the theft as the primal act of technological hubris: humanity acquiring a heavenly power it was never meant to hold. Reflect Orbital's plan to pull the sun's light down to Earth after dark re-enacts Prometheus's gesture on a planetary scale, promising illumination as a boon to streets and solar farms. The American Astronomical Society's warnings — ruined skies, blinded telescopes, endangered pilots — voice the old Aeschylean suspicion that stolen light exacts a price, and that reshaping the heavens invites their revenge.",
        "excerpt": "\"I hunted out and stored in fennel stalk the stolen source of fire that hath proved to mortals a teacher in every art and a means to mighty ends.\"",
        "source": "Aeschylus, Prometheus Bound, trans. Herbert Weir Smyth (Loeb Classical Library, 1926)",
        "href": "https://en.wikisource.org/wiki/Aeschylus_(Smyth_1927)_v1/Prometheus_Bound",
        "image": {
          "src": "/covers/reflect-orbital-space-mirror--a2.png",
          "alt": "Rubens's 'Prometheus Bound', the Titan punished for giving stolen fire to mortals.",
          "credit": "Peter Paul Rubens, 'Prometheus Bound' (c. 1611-18), Philadelphia Museum of Art; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Book 2 of Ovid's Metamorphoses (8 AD), Phaethon, son of the Sun-god, wins the reckless privilege of driving his father's fiery chariot across the sky for a single day, but cannot hold the horses to their course; the sun's flame plunges too near the Earth and the whole world catches fire. Cities burn, nations turn to dust, mountains from Taurus to Ida blaze, and rivers run dry until Jupiter must strike the boy down with a thunderbolt to save creation. It is antiquity's sharpest parable of the second sun mishandled — solar power taken up by mortal ambition and loosed beyond control. Reflect Orbital proposes to steer sunlight where nature never sends it, onto the night side of the planet, multiplied to 50,000 mirrors. Ovid's scorched earth is the cautionary shadow behind that promise: the light of heaven is safe only in the hands that made it, and a sky rerouted by human hands can as easily blight as bless.",
        "excerpt": "\"Great cities perish with their walls, / and peopled nations are consumed to dust— / the forests and the mountains are destroyed.\"",
        "source": "Ovid, Metamorphoses, Book 2 (the story of Phaethon), trans. Brookes More (1922)",
        "href": "http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.02.0028:book=2",
        "image": {
          "src": "/covers/reflect-orbital-space-mirror--a3.png",
          "alt": "A bust of the Roman poet Ovid, author of the Metamorphoses and the tale of Phaethon.",
          "credit": "Bust of Ovid, Densuș, Romania; photo via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Peter Paul Rubens painted The Fall of Phaeton (c. 1604–1605, reworked c. 1606–1608, now at the National Gallery of Art, Washington) at the very dawn of his Italian maturity, freezing the instant of catastrophe: Phaethon tumbling backward from the sun-chariot as the terrified horses scatter, the reins snapping, and allegorical figures of the Hours and seasons reeling amid a sky torn between blazing gold and thunderous dark. Jupiter's thunderbolts are already flying to end the conflagration. Rubens makes visible the exact theme the FCC decision revives — the sublime beauty and the terror of a sun steered off its ordained path by mortal daring. The canvas turns hubris into spectacle: light spilling gloriously and disastrously across the heavens. Placed beside Reflect Orbital's mirrors, it reads as a Baroque warning that to seize control of the sun's course is to court a magnificent ruin.",
        "excerpt": "Rubens seizes the split second between glory and disaster: the golden chariot upended, horses bolting through a firmament that heaves from radiant dawn into storm, human and celestial bodies flung into freefall. The whole sky becomes a theatre of light unleashed and light punished — beauty and calamity indistinguishable in the same burning instant.",
        "source": "Peter Paul Rubens, 'The Fall of Phaeton,' c. 1604–1608, oil on canvas, National Gallery of Art, Washington, D.C.",
        "href": "https://commons.wikimedia.org/wiki/File:Peter_Paul_Rubens_-_The_Fall_of_Phaeton_(National_Gallery_of_Art).jpg",
        "image": {
          "src": "/covers/reflect-orbital-space-mirror--a4.png",
          "alt": "Baroque painting of Phaethon falling from the overturned chariot of the Sun as horses scatter across a storm-torn sky",
          "credit": "Peter Paul Rubens, 'The Fall of Phaeton' (c. 1604–1608), National Gallery of Art, Washington — public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Alexander Scriabin composed Prometheus: The Poem of Fire (Op. 60) in 1910, premiered in Moscow on 2 March 1911 under Serge Koussevitzky, scoring it not only for orchestra, piano and chorus but for a 'clavier à lumières' — a color organ that flooded the concert hall with tides of colored light keyed to the harmony. Built on the dissonant 'mystic chord' that Scriabin called the chord of Prometheus, the work aspired to fuse sound and light into a single ecstatic, quasi-religious act of illumination, the Titan's fire made audible and visible at once. It is the most literal artistic ancestor of a machine that turns the sky into a light instrument. Scriabin dreamed of drenching an audience in artificial radiance to transfigure human consciousness; Reflect Orbital proposes to drench the actual night in reflected sunlight to transfigure the working day. Both stage the Promethean fantasy that humanity might compose the light of the heavens to its own design — and both make one wonder who consented to sit inside the glow.",
        "excerpt": "Scriabin bound the orchestra to a keyboard of light, so that as the mystic chord swelled the hall itself changed color, sound and radiance rising together toward a blaze of F-sharp major. It was less a symphony than an attempt to seize the heavens' fire and pour it, as engineered light, over an entire audience — Prometheus rewritten as a machine for illumination.",
        "source": "Alexander Scriabin, 'Prometheus: The Poem of Fire,' Op. 60 (1910; premiered Moscow, 2 March 1911)",
        "href": "https://en.wikipedia.org/wiki/Prometheus:_The_Poem_of_Fire",
        "image": {
          "src": "/covers/reflect-orbital-space-mirror--a5.png",
          "alt": "Photographic portrait of the Russian composer Alexander Scriabin",
          "credit": "Portrait of Alexander Scriabin (before 1915) — public domain via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "trex-gus-50-million",
    "headline": "A Tyrannosaurus rex skeleton nicknamed 'Gus' sells for a record $50.1 million at Sotheby's",
    "overview": "A 67-million-year-old Tyrannosaurus rex nicknamed 'Gus' — one of the largest and most complete ever found, standing 12.5 feet tall and 38 feet long — sold for a record $50.1 million to an anonymous telephone bidder at Sotheby's in New York, after a 10-minute battle among seven prospective buyers that far exceeded its $20–30 million estimate. The price eclipses the $44.6 million paid for a Stegosaurus at the same house in 2024. Palaeontologists warned that the surging market puts scientifically important fossils beyond the reach of museums and out of public view.",
    "genre": "Economy",
    "sources": [
      {
        "name": "NPR",
        "href": "https://www.npr.org/2026/07/15/nx-s1-5894586/mystery-bidder-buys-t-rex"
      },
      {
        "name": "Artforum",
        "href": "https://www.artforum.com/news/a-t-rex-fossil-sells-for-50-million-to-a-mystery-bidder-1234754776/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/trex-gus-50-million.png",
      "alt": "A mounted Tyrannosaurus rex skeleton on display in a museum.",
      "credit": "Wikimedia Commons"
    },
    "rank": 21,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "In 1655 the Danish physician Ole Worm published Museum Wormianum, the catalogue of his Copenhagen 'Wunderkammer' — a private cabinet of curiosities crammed with narwhal tusks, fossils, taxidermied beasts and monstrous bones, its famous frontispiece showing a kayak and polar bear cub slung from the ceiling above shelves of nature's marvels. Such Renaissance and Baroque cabinets, assembled by wealthy physicians and princes like Rudolf II, turned the wonders of the natural world into trophies of erudition and status, wonders visible only to the owner and his invited guests. They were the first great instance of nature commodified and sequestered — the whole of creation shrunk to a rich man's showroom. When Gus the Tyrannosaurus vanishes into an anonymous buyer's collection for $50.1 million, the 21st century simply revives the Wunderkammer: a 67-million-year-old marvel becomes a private curiosity, out of public and scientific reach. The narwhal skull by Worm's window and the T. rex skull under Sotheby's lights are the same impulse four centuries apart.",
        "excerpt": "The 1655 frontispiece to Museum Wormianum, engraved by G. Wingendorp after Worm's own drawing, depicts the interior of his Copenhagen curiosity cabinet: a densely packed room of natural specimens and human artefacts — animals, shells, minerals, an inverted kayak and a polar bear cub suspended from the ceiling, stuffed birds and fish, and a narwhal skull perched by the window with its long tusk pointing skyward. The wonders of the natural world are gathered as the private trophies of a single wealthy collector.",
        "source": "Ole Worm, Museum Wormianum seu Historia Rerum Rariorum (Leiden: Elzevier, 1655); 'Curiosity Cabinet of Ole Worm', Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Curiosity_Cabinet_of_Ole_Worm",
        "image": {
          "src": "/covers/trex-gus-50-million--a0.png",
          "alt": "1655 engraved frontispiece of Museum Wormianum showing Ole Worm's crowded cabinet of curiosities with hanging kayak, stuffed animals and natural specimens.",
          "credit": "Frontispiece to Museum Wormianum (1655), engraving by G. Wingendorp. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On 16 October 1869 well-diggers on a farm in Cardiff, New York, unearthed the 'Cardiff Giant' — a ten-foot, 3,000-pound 'petrified man' that was in fact a gypsum fake secretly buried a year earlier by the tobacconist George Hull. Word of the buried colossus drew crowds who paid fifty cents apiece, and when the owners refused to sell, the showman P. T. Barnum simply built his own copy and exhibited it as the real thing, prompting the phrase 'there's a sucker born every minute.' The episode fused every theme of the modern fossil trade: an ancient-seeming monstrous relic dug from the earth, monetized as spectacle, its scientific truth swallowed by profit and hype. Gus the T. rex, a genuine 67-million-year-old giant hauled from the rock and paraded under auctioneers' gavels to a record $50.1 million, is the Cardiff Giant's legitimate descendant. Both turn buried bones into box office, and both leave paleontologists warning that awe has been hijacked by money. The unearthing is the show; the price is the punchline.",
        "excerpt": "The Cardiff Giant, a ten-foot 'petrified man' secretly buried by George Hull, was 'discovered' by well-diggers in Cardiff, New York, on 16 October 1869. Visitors were soon charged fifty cents for a fifteen-minute viewing, and when the owners would not sell, P. T. Barnum manufactured an unauthorized replica and displayed it as authentic — a monstrous buried relic transformed into pure commercial spectacle.",
        "source": "'Cardiff Giant', Wikipedia; contemporary accounts of the 1869 hoax and P. T. Barnum's replica.",
        "href": "https://en.wikipedia.org/wiki/Cardiff_Giant",
        "image": {
          "src": "/covers/trex-gus-50-million--a1.png",
          "alt": "1869 photograph of the Cardiff Giant being exhumed from a pit on a farm in Cardiff, New York.",
          "credit": "The Cardiff Giant exhumed, 1869. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley's sonnet 'Ozymandias,' published in The Examiner on 11 January 1818, describes a traveller's account of a colossal, shattered statue half-buried in the desert — the wreck of a boastful ancient king whose inscription still commands 'Look on my works ye Mighty, and despair!' while nothing but sand remains around it. The poem is the supreme English meditation on vanitas: monumental ambition reduced to broken stone and 'lone and level sands,' a buried relic that outlives the pride that raised it yet mocks it. Gus the Tyrannosaurus is a colossal wreck of another kind — 67 million years of extinction bought for $50.1 million by a buyer whose vanity, like Ozymandias's, wants to possess the unpossessable. The fossil, like the trunkless legs of stone, will outlast every fortune bid on it. Sotheby's gavel is one more sneer of cold command echoing over the sands. The bones endure; the bidders do not.",
        "excerpt": "I met a Traveller from an antique land, / Who said, \"Two vast and trunkless legs of stone / Stand in the desart. Near them, on the sand, / Half sunk, a shattered visage lies, whose frown, / And wrinkled lip, and sneer of cold command, / Tell that its sculptor well those passions read... / And on the pedestal these words appear: / 'My name is Ozymandias, King of Kings.' / Look on my works ye Mighty, and despair! / No thing beside remains. Round the decay / Of that Colossal Wreck, boundless and bare, / The lone and level sands stretch far away.\"",
        "source": "Percy Bysshe Shelley, 'Ozymandias,' in The Examiner (London), 11 January 1818.",
        "href": "https://en.wikisource.org/wiki/The_Examiner_(London)/Ozymandias",
        "image": {
          "src": "/covers/trex-gus-50-million--a2.png",
          "alt": "The 'Younger Memnon' colossal bust of Ramesses II, model for Shelley's shattered king.",
          "credit": "Colossal bust of Ramesses II ('The Younger Memnon'), British Museum; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Book I of John Milton's Paradise Lost (1667), the fallen angel Mammon — 'the least erected Spirit that fell,' whose eyes in Heaven were always 'downward bent, admiring more / The riches of heaven's pavement, trodden gold' — leads a crew of demons to rip open a hill in Hell and mine its 'ribs of gold.' Milton makes greed literally a matter of tearing treasure from the ground: the devils 'Rifled the bowels of their mother Earth / For treasures better hid,' and the poet coins the phrase 'the precious bane' for wealth that damns those who dig it. It is the founding image of extraction as sacrilege — the earth wounded so that riches may be hoarded. The commercial fossil hunt that dug Gus from Montana rock and sold him for $50.1 million is Mammon's work by another name: nature's buried marvels 'better hid' torn out and turned to gold. Paleontologists' lament that science is priced out is Milton's warning made modern. The precious bane still grows in the ground, and someone still pays $50 million for it.",
        "excerpt": "By him first / Men also, and by his suggestion taught, / Ransacked the centre, and with impious hands / Rifled the bowels of their mother Earth / For treasures better hid. Soon had his crew / Opened into the hill a spacious wound, / And digged out ribs of gold. Let none admire / That riches grow in Hell; that soil may best / Deserve the precious bane.",
        "source": "John Milton, Paradise Lost, Book I, lines 792–801 (1667); Project Gutenberg edition.",
        "href": "https://www.gutenberg.org/cache/epub/26/pg26.txt",
        "image": {
          "src": "/covers/trex-gus-50-million--a3.png",
          "alt": "John Martin's 'Pandemonium', the demons' golden palace raised from the earth in Paradise Lost.",
          "credit": "John Martin, 'Pandemonium' (1841), Musée du Louvre; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Harmen Steenwijck's 'Vanitas Still-Life' (c. 1640, National Gallery, London) is a masterpiece of the Dutch vanitas genre, in which a shaft of light falls across a human skull lolling on a table's edge, surrounded by the trappings of wealth and learning — a Japanese sword, a costly shell, a lute, books, and a snuffed-out lamp whose smoke marks time running out. Every luxurious object is a memento mori: riches, knowledge and pleasure are worthless against the bare grin of death. The painting is the exact moral inverse of a $50.1 million fossil auction — where Steenwijck sets a skull among treasures to shame vanity, Sotheby's sets a treasure of a skull, Gus the Tyrannosaurus, on a pedestal to inflame it. The T. rex is the ultimate vanitas object: 67-million-year-old bones, the biggest memento mori imaginable, converted into the biggest status symbol imaginable. Steenwijck's warning that we too will be bone becomes the very thing the ultra-rich now bid on. The skull that once preached humility is now the trophy of pride.",
        "excerpt": "A dramatic shaft of sunlight cuts through the gloom to strike a human skull that lolls to one side on the edge of the table, its empty eye sockets and gap-toothed grin surrounded by the vanities of the world — a large jar, an ornate Japanese sword, a rare sea shell, a lute, books, and a trumpet. The snuffed-out lamp and the ticking watch remind the viewer that our time, too, will come; wealth, art and learning are as mortal as the bone that grins among them.",
        "source": "Harmen Steenwijck, Vanitas Still-Life (An Allegory of the Vanities of Human Life), oil on panel, c. 1640, National Gallery, London (NG1256).",
        "href": "https://www.nationalgallery.org.uk/paintings/harmen-steenwyck-still-life-an-allegory-of-the-vanities-of-human-life",
        "image": {
          "src": "/covers/trex-gus-50-million--a4.png",
          "alt": "Dutch vanitas still life by Harmen Steenwijck with a human skull lit by a shaft of light amid a lute, books, shell, sword and a snuffed-out lamp.",
          "credit": "Harmen Steenwijck, Vanitas Still-Life (c. 1640), National Gallery, London. Public domain, via Wikimedia Commons (Web Gallery of Art)."
        }
      },
      {
        "category": "artistic",
        "title": "In 'Fossils' (Fossiles), the twelfth movement of Camille Saint-Saëns's musical suite The Carnival of the Animals (composed 1886), a xylophone clatters like dry, rattling bones while the composer wickedly quotes his own 'Danse Macabre' alongside nursery tunes such as 'Ah! vous dirai-je, maman' — turning the relics of the dead into a brittle, comic dance. Saint-Saëns forbade the suite's public performance in his lifetime, fearing this menagerie of joke-pieces would cheapen his serious reputation; the ancient dead were, for him, both spectacle and embarrassment. That ambivalence lands squarely on Gus the Tyrannosaurus: 67-million-year-old bones performing for a $50.1 million crowd, the ultimate fossil made into a party turn for the ultra-rich. The xylophone's dead rattle is the sound of extinction repackaged as entertainment. Where Saint-Saëns mocked the spectacle of animating old bones, Sotheby's stages it for real, gavel as percussion. The Danse Macabre now has a price tag.",
        "excerpt": "In 'Fossils,' Saint-Saëns hands the melody to a xylophone whose hard, clattering notes evoke dry bones knocking together, then stitches in self-mocking quotations of his own 'Danse Macabre' and old French nursery songs. The effect is a sardonic dance of the long-dead — the ancient relic reanimated not as science but as brittle, ironic spectacle, exactly the fate of a T. rex skeleton paraded and sold as entertainment for the wealthy.",
        "source": "Camille Saint-Saëns, 'Fossiles,' No. 12 of Le Carnaval des animaux (1886).",
        "href": "https://en.wikipedia.org/wiki/The_Carnival_of_the_Animals",
        "image": {
          "src": "/covers/trex-gus-50-million--a5.png",
          "alt": "Portrait photograph of composer Camille Saint-Saëns in 1900, taken by Pierre Petit.",
          "credit": "Camille Saint-Saëns in 1900, photograph by Pierre Petit. Public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "marc-padeu-memento-vivere",
    "headline": "Cameroonian painter Marc Padeu opens 'Memento Vivere' in London, staging cocoa-plantation life as biblical tableaux",
    "overview": "Marc Padeu's solo exhibition 'Memento Vivere' opens at the Larkin Durey gallery in London, running 17 July to 14 August, with large acrylic canvases that restage the labour and community of cocoa plantations in his native Cameroon within compositions borrowed from Renaissance religious painting, from an Adoration of the Magi to a Last Supper. Trained as a church fresco painter, Padeu dignifies working people as holy figures and meditates on time and mortality. The show's title turns the classical memento mori, remember you will die, toward memento vivere, remember to live.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Colossal",
        "href": "https://www.thisiscolossal.com/2026/07/marc-padeu-memento-vivere-acrylic-paintings/"
      },
      {
        "name": "Larkin Durey",
        "href": "https://www.larkindurey.com/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/marc-padeu-memento-vivere.png",
      "alt": "A painting by Marc Padeu staging cocoa-plantation workers as figures in a religious tableau.",
      "credit": "Marc Padeu; via Colossal"
    },
    "rank": 22,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Around 1599-1600, working in Rome, Caravaggio painted 'The Calling of Saint Matthew' for the Contarelli Chapel of San Luigi dei Francesi, staging the moment Christ summons a tax collector as a scene of ordinary men gathered at a table in a dim, contemporary room. Rejecting idealized bodies, Caravaggio used the faces of the Roman street, gamblers, laborers and common folk, as models for apostles and saints, letting a shaft of raking light do the sacred work. The scandal and the power lay in dignifying the poor and unremarkable as vessels of divine encounter. Marc Padeu, trained as a fresco painter by the church, extends exactly this lineage when he casts Cameroon's cocoa-plantation workers as the holy protagonists of an Adoration or a Last Supper. Both artists insist the sacred is glimpsed not in far-off heavens but in the calloused hands and faces of everyday labor.",
        "excerpt": "Caravaggio dropped the biblical summons into a shadowed contemporary tavern, giving his Saint Matthew and companions the faces of Rome's ordinary poor, tax-men, idlers and youths in modern dress. A diagonal beam of light substitutes for a halo, sanctifying common people by the sheer drama of illumination, precisely the move by which Padeu makes cocoa harvesters into figures of scripture.",
        "source": "Caravaggio, 'The Calling of Saint Matthew', 1599-1600, oil on canvas, Contarelli Chapel, San Luigi dei Francesi, Rome.",
        "href": "https://en.wikipedia.org/wiki/The_Calling_of_Saint_Matthew",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a0.png",
          "alt": "Caravaggio's The Calling of Saint Matthew, showing a beam of light falling across ordinary men at a table as Christ points toward Matthew.",
          "credit": "Caravaggio, The Calling of Saint Matthew (1599-1600), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "In his 'Apologeticus' of about 197 CE, the North African Christian writer Tertullian described the ancient Roman triumph, in which a victorious general rode through Rome crowned like a god in a gilded chariot, while a slave or attendant stood behind him whispering a reminder of his mortality. This ritual, echoed in the Latin tags 'Respice post te; hominem te memento' and 'memento mori', embedded the thought of death at the very summit of earthly glory. It is the ancestral gesture Padeu deliberately inverts: his exhibition title 'Memento Vivere', remember to live, turns the old warning about dying toward a celebration of being alive. By placing the memento-mori tradition inside scenes of harvest and community, Padeu keeps mortality present yet insists the proper response is not dread but attentive living. The two-thousand-year arc from a Roman chariot to a Cameroonian cocoa field shows the same human fragility, reframed from warning into gratitude.",
        "excerpt": "he is reminded that he is only human. A voice at his back keeps whispering in his ear, Look behind you; remember you are but a man.",
        "source": "Tertullian, 'Apologeticus' (The Apology), ch. 33, c. 197 CE, trans. S. Thelwall, Ante-Nicene Fathers, vol. 3.",
        "href": "https://www.newadvent.org/fathers/0301.htm",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a1.png",
          "alt": "Roman memento mori mosaic from Pompeii showing a skull balanced on a wheel of fortune.",
          "credit": "Memento mori mosaic, Pompeii, Museo Archeologico Nazionale di Napoli (inv. 109982); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "The Hebrew book of Ecclesiastes, ascribed to 'the Preacher, the son of David', opens with the famous cry 'Vanity of vanities... all is vanity' and meditates on the ceaseless turning of generations and seasons beneath an eternal earth. Its third chapter, 'To every thing there is a season... a time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted', binds human mortality to the rhythm of sowing and harvest. This is the scriptural bedrock of the vanitas tradition and of memento mori itself, yet its conclusion urges people to eat, work and rejoice in their labor. Padeu's cocoa harvesters, 'caught outside of time', enact precisely this fusion of planting, plucking and passing generations. The painter's turn from memento mori toward memento vivere reads as an answer to Ecclesiastes: mortality acknowledged, life embraced.",
        "excerpt": "The words of the Preacher, the son of David, king of Jerusalem. Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity. ... One generation passeth away, and another generation cometh: but the earth abideth for ever. ... To every thing there is a season, and a time to every purpose under the heaven: A time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted;",
        "source": "Ecclesiastes 1:1-2, 1:4 and 3:1-2, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Ecclesiastes",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a2.png",
          "alt": "Pieter Claesz's vanitas still life of a skull, overturned glass and extinguished lamp.",
          "credit": "Pieter Claesz, 'Vanitas Still Life' (c. 1630), Mauritshuis; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Robert Herrick's 'To the Virgins, to Make Much of Time', published in his 1648 collection 'Hesperides', is the quintessential English carpe-diem lyric, opening 'Gather ye rosebuds while ye may, / Old time is still a-flying'. Herrick watches the sun climb only to hasten toward setting and the fresh flower smile today only to die tomorrow, urging the young to seize their fleeting prime. The poem is a memento mori that resolves, like Padeu's show, into a memento vivere: awareness of death made into an argument for living fully now. Where Herrick gathers rosebuds, Padeu gathers cocoa pods, both harvests standing as emblems of ripeness, sweetness and the brevity of the hour. The painter's figures 'caught outside of time' answer Herrick's flying clock with a suspended, sacred present.",
        "excerpt": "Gather ye rosebuds while ye may,\nOld time is still a-flying;\nAnd this same flower that smiles today\nTomorrow will be dying. ... Then be not coy, but use your time,\nAnd, while ye may, go marry;\nFor, having lost but once your prime,\nYou may forever tarry.",
        "source": "Robert Herrick, 'To the Virgins, to Make Much of Time', from 'Hesperides' (1648).",
        "href": "https://americanliterature.com/author/robert-herrick/poem/to-the-virgins-to-make-much-of-time",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a3.png",
          "alt": "John William Waterhouse's 'Gather Ye Rosebuds While Ye May', young women gathering roses.",
          "credit": "J. W. Waterhouse, 'Gather Ye Rosebuds While Ye May' (1909); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Leonardo da Vinci painted 'The Last Supper' between about 1495 and 1498 on the refectory wall of Santa Maria delle Grazie in Milan, capturing the charged instant just after Christ announces that one of the twelve will betray him. Leonardo organized the apostles into four groups of three, their gestures rippling outward from a still, central Christ framed by the window's light, a composition that became the template for depicting sacred communion at a shared table. Padeu explicitly borrows this scaffolding, restaging the Last Supper among Cameroon's cocoa workers so that a plantation meal becomes a scene of holy fellowship and foreboding. The parallel dignifies laboring people as apostolic figures and loads an ordinary gathering with intimations of sacrifice and time. In both works the table is where the everyday and the eternal meet.",
        "excerpt": "Leonardo freezes the psychological storm of the apostles at the moment of Christ's prophecy of betrayal, using perspective, gesture and window-light to make a communal meal radiate sacred meaning. Padeu adopts this same triangular, table-centered architecture to elevate a cocoa-plantation gathering into a tableau of fellowship, sacrifice and the passage of time.",
        "source": "Leonardo da Vinci, 'The Last Supper', c. 1495-1498, tempera and oil on plaster, Santa Maria delle Grazie, Milan.",
        "href": "https://en.wikipedia.org/wiki/The_Last_Supper_(Leonardo)",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a4.png",
          "alt": "Leonardo da Vinci's The Last Supper, showing Christ at the center of a long table with the twelve apostles reacting in four groups of three.",
          "credit": "Leonardo da Vinci, The Last Supper (c. 1495-1498), public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Jean-Francois Millet painted 'The Angelus' between 1857 and 1859, showing two peasants who pause over a basket of potatoes at dusk to bow their heads in prayer as a distant church bell rings the Angelus. Millet monumentalized humble rural laborers, lending the potato harvest the gravity and hush of a devotional scene and finding the sacred within back-breaking agricultural work. This is precisely Padeu's project two centuries later and a continent away: to honor the community of the cocoa fields by casting their labor in the golden light of religious painting. Both artists refuse to separate toil from holiness, framing the harvest as a place where fragile human life touches the divine. Millet's silent prayer at day's end rhymes with Padeu's meditation on mortality turned, gently, toward the fullness of living.",
        "excerpt": "Millet elevates two field laborers, heads bowed over a basket of potatoes at nightfall, into figures of quiet reverence beneath a distant church spire, sanctifying agricultural toil itself. Padeu carries this same conviction into the cocoa plantations of Cameroon, wrapping working people in the light and solemnity once reserved for saints.",
        "source": "Jean-Francois Millet, 'The Angelus' (L'Angelus), 1857-1859, oil on canvas, Musee d'Orsay, Paris.",
        "href": "https://en.wikipedia.org/wiki/The_Angelus_(painting)",
        "image": {
          "src": "/covers/marc-padeu-memento-vivere--a5.png",
          "alt": "Jean-Francois Millet's The Angelus, showing a peasant man and woman bowing in prayer over a basket of potatoes in a field at dusk.",
          "credit": "Jean-Francois Millet, The Angelus (1857-1859), public domain, via Wikimedia Commons."
        }
      }
    ]
  },
  {
    "slug": "tbilisi-rike-demolition",
    "headline": "Studio Fuksas's never-opened Rike Concert Hall in Tbilisi is cleared for demolition; the architects plead to save it",
    "overview": "Tbilisi's city hall has issued a permit to demolish the Rike Concert Hall, the tubular building designed by Massimiliano and Doriana Fuksas that was largely completed by 2012 but sat unused for more than a decade after a change of government and never opened to the public, with owners given until 25 December to dismantle it. Studio Fuksas called for the demolition to be halted, describing it as a significant cultural setback and saying repeated attempts to propose an alternative use had gone unanswered. It is the first time in the studio's more than sixty years of practice that one of its buildings faces destruction without consultation.",
    "genre": "Culture",
    "sources": [
      {
        "name": "Dezeen",
        "href": "https://www.dezeen.com/2026/07/16/studio-fuksas-tbilisi-rike-concert-hall-halt/"
      },
      {
        "name": "Domus",
        "href": "https://www.domusweb.it/en/news/2026/07/16/fuksas-tbilisi-concert-hall-demolition.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/tbilisi-rike-demolition.png",
      "alt": "The tubular Rike Concert Hall on the riverbank in Tbilisi, seen from the Peace Bridge.",
      "credit": "Rike Park and the Rike Concert Hall, Tbilisi; Wikimedia Commons"
    },
    "rank": 23,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "After the Great Fire of AD 64 gutted Rome, the emperor Nero seized a vast tract of the ruined city to build his Domus Aurea, or 'Golden House' — a pleasure-palace of some 300 rooms sprawling across the Palatine, Oppian, and Caelian hills, with an artificial lake 'like a sea,' a mile-long triple colonnade, and a 120-foot colossus of the emperor at its gate. Nero barely lived to enjoy it: after his forced suicide in AD 68 the Senate pronounced damnatio memoriae, and the building itself became a symbol of the tyranny his successors wished to bury. Vespasian drained the lake and raised the Colosseum on the spot; Titus and Trajan buried the rest beneath public baths, stripping the marble and entombing Nero's frescoes underground within forty years. The most opulent house in Rome was condemned not for any flaw of design but for the memory of the man who commissioned it. Studio Fuksas's Rike Concert Hall — completed by 2012, never opened, and now cleared for demolition after a change of government — repeats the ancient lesson that a regime's proudest monument can become its successor's embarrassment, erased by the politics that follow the patron.",
        "excerpt": "When the edifice was finished in this style and he dedicated it, he deigned to say nothing more in the way of approval than that he was at last beginning to be housed like a human being.",
        "source": "Suetonius, The Lives of the Twelve Caesars, 'Nero' §31, trans. J. C. Rolfe (Loeb Classical Library, 1914), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/The_Lives_of_the_Twelve_Caesars/Nero",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a0.png",
          "alt": "Reconstructed general ground plan of the surviving Oppian wing of Nero's Domus Aurea in Rome.",
          "credit": "General plan of the Domus Aurea (Esquiline wing). Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "Construction of Pyongyang's Ryugyong Hotel began on 28 August 1987: a 105-storey, 330-metre pyramid meant to crown the North Korean skyline and outshine the capitalist South. When the Soviet Union collapsed and funds evaporated, work stopped in 1992 with the structure at full height but a bare, windowless concrete shell — and there it loomed for sixteen years, unglazed and empty, nicknamed the 'Hotel of Doom' and airbrushed from official photographs. Even after an Egyptian firm reclad the exterior in glass by 2011 and LED panels were added to flash propaganda, no guest has ever checked in; the tower remains, decades on, a completed form that has never served its purpose. Like the tubular Rike Concert Hall in Tbilisi — finished around 2012 yet never opened to the public — the Ryugyong is a monument to ambition frozen mid-gesture, a grand building that exists only as a silhouette of the future it promised. Both are cautionary emblems of the vanity of monuments raised faster than the will to use them.",
        "excerpt": "For decades the pyramid stood roofed but hollow, a 330-metre concrete shell with empty window-frames staring over Pyongyang, so persistently unfinished that outsiders dubbed it the 'Hotel of Doom.' Glass cladding and dazzling LED light-shows have since dressed its flanks, yet behind the facade not a single room has ever received a guest. It is a skyscraper that functions purely as a symbol — a monument to a future that never arrived.",
        "source": "'Ryugyong Hotel,' Wikipedia (accessed 16 July 2026).",
        "href": "https://en.wikipedia.org/wiki/Ryugyong_Hotel",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a1.png",
          "alt": "The pyramid-shaped Ryugyong Hotel towering unfinished over the Pyongyang skyline.",
          "credit": "The Ryugyong Hotel, Pyongyang. Photo via Wikimedia Commons (CC)."
        }
      },
      {
        "category": "literary",
        "title": "Percy Bysshe Shelley wrote 'Ozymandias' in 1818, a sonnet reputedly sparked by news that a colossal bust of the pharaoh Ramesses II was being shipped to the British Museum. In it a traveller reports the shattered statue of a forgotten king, its face half-sunk in sand, bearing the boast 'My name is Ozymandias, king of kings: / Look on my works, ye Mighty, and despair!' — a command to marvel that is contradicted by the empty desert stretching to every horizon. The poem has become the definitive parable of architectural hubris: the more a ruler builds to defy time, the more starkly the ruin mocks him. Nothing survives of Ozymandias but the inscription and the wreck. The unopened Rike Concert Hall, its sculptural 'jugs' now scheduled for the wrecking crews, is a modern pedestal whose grand design outlasted the ambitions that raised it, inviting the same rueful contemplation of works that despair could not save.",
        "excerpt": "And on the pedestal these words appear:\n'My name is Ozymandias, king of kings:\nLook on my works, ye Mighty, and despair!'\nNothing beside remains. Round the decay\nOf that colossal wreck, boundless and bare,\nThe lone and level sands stretch far away.",
        "source": "Percy Bysshe Shelley, 'Ozymandias' (1818), in Poems That Every Child Should Know, ed. Mary Elizabeth Burt (1904), via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Poems_That_Every_Child_Should_Know/Ozymandias_of_Egypt",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a2.png",
          "alt": "The colossal bust of Ramesses II, the 'Younger Memnon', that inspired Shelley's Ozymandias.",
          "credit": "Colossal bust of Ramesses II ('The Younger Memnon'), British Museum; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "Samuel Taylor Coleridge's 'Kubla Khan,' composed around 1797 and published in 1816, opens with a ruler decreeing a fabulous 'stately pleasure-dome' at Xanadu — 'a miracle of rare device, / A sunny pleasure-dome with caves of ice!' The poem is doubly apt here: it is at once a vision of a sumptuous pleasure-building willed into being by a single command, and itself a famously unfinished work, broken off (Coleridge claimed) when a visitor from Porlock interrupted his opium reverie. The dome exists only as a fragment of a dream, forever incomplete, its music never quite sounded. Massimiliano and Doriana Fuksas's Rike Concert Hall — a literal pleasure-dome for music, decreed by one government and abandoned by the next, completed in form yet never once opened for a performance — is Coleridge's fragment made concrete: a stately dome that was built but never truly began.",
        "excerpt": "In Xanadu did Kubla Khan\nA stately pleasure-dome decree:\nWhere Alph, the sacred river, ran\nThrough caverns measureless to man\nDown to a sunless sea.\n...\nIt was a miracle of rare device,\nA sunny pleasure-dome with caves of ice!",
        "source": "Samuel Taylor Coleridge, 'Kubla Khan' (published 1816), in The Oxford Book of English Verse 1250-1900, ed. Arthur Quiller-Couch, via Wikisource.",
        "href": "https://en.wikisource.org/wiki/Oxford_Book_of_English_Verse_1250-1900/Kubla_Khan",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a3.png",
          "alt": "Washington Allston's portrait of the poet Samuel Taylor Coleridge.",
          "credit": "Washington Allston, portrait of Samuel Taylor Coleridge (1814); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Thomas Cole's five-canvas cycle 'The Course of Empire' (1833–1836) traces an imaginary city from wilderness to pastoral calm to imperial splendour to violent sack — and finally to 'Desolation' (1836), where the works of man lie drowned in encroaching nature. In this last painting a single broken column rises in the foreground, now a bird's nest; shattered temple arches and a ruined bridge emerge from vegetation under a livid moonrise, and not one human figure remains. Cole meant the sequence as a warning that no empire escapes the cycle of overreach and collapse, that grandeur carries the seed of its own ruin. The image is Ozymandias rendered in oil: monuments raised in pride returning to weeds and water. The scene anticipates the fate awaiting the Rike Concert Hall — a lavish civic dream that never rang with music, its curving forms already ruins-in-waiting before the demolition crews arrive.",
        "excerpt": "No figure stirs in Cole's final scene: a lone column, colonized by a bird's nest, presides over drowned colonnades and a shattered bridge as the moon climbs a bruised evening sky. The teeming metropolis of the earlier canvases has been wholly reclaimed by reeds, ivy, and silence. What remains is not a city but the beautiful, melancholy carcass of one.",
        "source": "Thomas Cole, 'The Course of Empire: Desolation' (1836), oil on canvas, New-York Historical Society.",
        "href": "https://en.wikipedia.org/wiki/The_Course_of_Empire_(paintings)",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a4.png",
          "alt": "A ruined classical city reclaimed by nature under a moonrise, a single broken column in the foreground, from Thomas Cole's 'Desolation.'",
          "credit": "Thomas Cole, 'The Course of Empire: Desolation' (1836), New-York Historical Society. Public domain, via Wikimedia Commons."
        }
      },
      {
        "category": "artistic",
        "title": "Caspar David Friedrich's 'The Abbey in the Oakwood' (1809–1810) shows the skeletal ruin of a Gothic abbey — modelled on the wrecked Eldena monastery near Greifswald — rising from a snow-bound graveyard amid leafless, contorted oaks, as a file of tiny monks bears a coffin toward its broken portal. All that remains upright of the great church is a fractured window-arch silhouetted against a wan winter sky; the building meant to house eternity has itself decayed into a memento mori. Friedrich, the supreme painter of the Romantic ruin, made human architecture look fragile and transient against the vast indifference of nature and time. The mood — reverence for a grand structure abandoned, sanctity emptied of its purpose — closely mirrors the plight of the never-consecrated Rike Concert Hall. Both are shells built for gathering and ceremony, left instead to silence, awaiting the erasure of what ambition could not sustain.",
        "excerpt": "A jagged window-arch is nearly all that still stands of the abbey; the rest is rubble half-buried in snow, ringed by black, clawing oaks. A barely visible procession of monks carries a coffin through the ruined gate, dwarfed by the wreck of the sanctuary they tend. The living and the built alike seem to be dissolving into the pale, freezing dusk.",
        "source": "Caspar David Friedrich, 'The Abbey in the Oakwood' (Abtei im Eichwald, 1809–1810), oil on canvas, Alte Nationalgalerie, Berlin.",
        "href": "https://commons.wikimedia.org/wiki/File:Caspar_David_Friedrich_-_Abtei_im_Eichwald_-_Google_Art_Project.jpg",
        "image": {
          "src": "/covers/tbilisi-rike-demolition--a5.png",
          "alt": "A ruined Gothic abbey window-arch amid bare oaks and a snowy graveyard under a pale winter sky, with monks bearing a coffin.",
          "credit": "Caspar David Friedrich, 'The Abbey in the Oakwood' (1809–1810), Alte Nationalgalerie, Berlin. Public domain, via Wikimedia Commons (Google Art Project)."
        }
      }
    ]
  },
  {
    "slug": "google-eu-ai-rivals",
    "headline": "The EU orders Google to open its search data and Android to AI and search rivals",
    "overview": "The European Commission ruled that Google must share the search data it collects, subject to anonymisation, with OpenAI and other AI chatbots and rival search engines, and must let Android users activate competing AI assistants by voice, under the Digital Markets Act's curbs on Big Tech. The data-sharing measure takes effect from January, with the Android changes following in 2027, and access is limited to rivals meeting privacy and security criteria. Google's president of global affairs, Kent Walker, said the decisions risk undermining privacy and security guardrails for millions of Europeans.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMitgFBVV95cUxOWWNZSnZMWVlJN01HaEZaS1ktSVZhRnFoY2hOU0pEa2Nnb1JZeDhRNzV5VFQ2dVZSZ3ByR0R0MWVVdTZKZ3g3d2lQbUdEZjZoN1VMSkZjQ1hSU00xMFlJY0UtY0xCQWJ1MUFiYU1XSDMwcWEzVkxuZVZhM0M4T0RmTmRlVS1vMzFxc3JfQ2hBRXVkcUl3MzZhZkJiZV9pR2ZtdVZWWmZPMXRMMWozai04YTUzOEZGZw?oc=5"
      },
      {
        "name": "CNBC",
        "href": "https://www.cnbc.com/2026/07/16/google-required-to-open-up-to-ai-search-engine-rivals-under-eu-mandated-changes.html"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/google-eu-ai-rivals.png",
      "alt": "The entrance of a Google office building.",
      "credit": "Wikimedia Commons"
    },
    "rank": 24,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On 15 May 1911 the U.S. Supreme Court, in Standard Oil Co. of New Jersey v. United States, ordered John D. Rockefeller's Standard Oil trust dissolved into 34 separate companies, ending a near-total grip on American oil refining and distribution. The weapon was the Sherman Antitrust Act of 1890, which for the first time made monopoly itself a federal crime and empowered the state to prise open a private empire 'in restraint of trade.' Just as Washington broke the octopus that had enclosed the nation's energy supply, Brussels now invokes the Digital Markets Act to force Google to share its search index and unlock Android for AI rivals. Both are acts of a public authority declaring that a single owner may not fence off the commons on which everyone else depends. The century-old logic of trust-busting recurs almost word for word: dominance, once entrenched, must be compelled to open.",
        "excerpt": "Every contract, combination in the form of trust or otherwise, or conspiracy, in restraint of trade or commerce among the several States, or with foreign nations, is hereby declared to be illegal... Every person who shall monopolize, or attempt to monopolize, or combine or conspire with any other person or persons, to monopolize any part of the trade or commerce among the several States, or with foreign nations, shall be deemed guilty of a misdemeanor.",
        "source": "Sherman Antitrust Act, 26 Stat. 209 (2 July 1890), Sections 1 and 2; applied in Standard Oil Co. of New Jersey v. United States, 221 U.S. 1 (1911).",
        "href": "https://en.wikisource.org/wiki/Sherman_Antitrust_Act",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a0.png",
          "alt": "1906 Puck cartoon showing Theodore Roosevelt as the infant Hercules strangling serpents bearing the heads of John D. Rockefeller and Senator Nelson Aldrich.",
          "credit": "Frank A. Nankivell, 'The infant Hercules and the Standard Oil serpents,' Puck, 1906. Library of Congress / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "historical",
        "title": "At Runnymede in June 1215 England's barons compelled King John, an overmighty sovereign who had ruled by arbitrary will, to seal Magna Carta and submit the crown itself to the law of the land. Clauses 39 and 40 promised that no free man would be seized or ruined save by lawful judgment, and that justice would be neither sold, denied, nor delayed. It was the archetypal moment of a power that had placed itself above all others being forced back within limits by a coalition determined to bind it. The European Commission's order to Google echoes that medieval bargain: an entity grown so dominant that it set the terms for everyone is made to accept externally imposed rules and to open its gates. Then it was a king curbed by charter; now it is a digital sovereign curbed by regulation. Both insist that no single power may stand beyond accountability.",
        "excerpt": "No freemen shall be taken or imprisoned or disseised or exiled or in any way destroyed, nor will we go upon him nor send upon him, except by the lawful judgment of his peers or by the law of the land. To no one will we sell, to no one will we refuse or delay, right or justice.",
        "source": "Magna Carta (1215), clauses 39 and 40, translation in the Avalon Project, Yale Law School.",
        "href": "https://avalon.law.yale.edu/medieval/magna.asp",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a1.png",
          "alt": "The 1215 Magna Carta, British Library Cotton MS Augustus II.106, a densely written medieval Latin charter on vellum.",
          "credit": "Magna Carta, 1215, British Library Cotton MS Augustus II.106 / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In 1 Samuel 17 the Philistine champion Goliath of Gath, six cubits and a span in height and clad in bronze, terrifies the armies of Israel for forty days until a shepherd boy, David, refuses to accept that size alone should rule the field. Armed only with a sling and five smooth stones, and speaking in the name of a higher authority, he brings the giant down with a single shot to the forehead. The tale has become the enduring emblem of an entrenched colossus challenged and toppled by a smaller, more agile contender. In the EU's action, OpenAI and other search upstarts play David to Google's Goliath, while the Commission hands them the sling: access to the data and the Android voice-gates the giant had monopolised. The parallel is exact in spirit, that overwhelming dominance is not invincible once the ground is levelled.",
        "excerpt": "Then said David to the Philistine, Thou comest to me with a sword, and with a spear, and with a shield: but I come to thee in the name of the LORD of hosts, the God of the armies of Israel, whom thou hast defied. This day will the LORD deliver thee into mine hand; and I will smite thee, and take thine head from thee.",
        "source": "The Bible, King James Version (1611), 1 Samuel 17:45-46.",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/1_Samuel",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a2.png",
          "alt": "Caravaggio's painting David with the Head of Goliath, showing the young David holding the severed head of the giant.",
          "credit": "Caravaggio, 'David with the Head of Goliath,' c.1610, Galleria Borghese, Rome / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "John Clare's 'The Mores' (written in the 1820s) is the great English lament for the enclosure of the open commons, when Parliament's Inclosure Acts fenced off land that had for centuries been shared by all. Clare watches free heath and pasture parcelled into private plots, footpaths stopped, and boards raised reading 'no road here,' as a shared world is locked behind ownership. His giants of open moor are left 'of their limbs bereft,' and the poor made slaves to 'labour's rights' trampled. The poem is the exact inverse of the EU's remedy: where enclosure once seized the commons from the people, Brussels now compels Google to unfence the search data and Android gateways it had enclosed. Clare mourns the well being walled in; the Digital Markets Act reopens it.",
        "excerpt": "Inclosure came and trampled on the grave / Of labour's rights and left the poor a slave ... These paths are stopt - the rude philistine's thrall / Is laid upon them and destroyed them all ... But paths to freedom and to childhood dear / A board sticks up to notice 'no road here'",
        "source": "John Clare, 'The Mores' (c.1821-1824), in Poems Against Enclosure.",
        "href": "https://la.utexas.edu/users/hcleaver/357k/357kClareEnclosuresTable.pdf",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a3.png",
          "alt": "Portrait of the English poet John Clare, who lamented the enclosure of the commons.",
          "credit": "William Hilton, portrait of John Clare (1820), National Portrait Gallery; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Francisco de Goya's 'The Colossus' (El Coloso, c.1808-1812), held in the Museo del Prado, depicts a titanic naked giant rising above the mountains, fist raised, while in the valley below a whole population and its herds scatter in panic. Painted amid the Napoleonic invasion of Spain, the image distils the terror of an overwhelming power looming over the small and the helpless. It is the visual archetype of the entrenched giant that the EU's action seeks to confront, a single dominating figure whose mere presence sends everyone fleeing. Where Goya shows the multitude powerless before the colossus, the Digital Markets Act imagines the opposite: the crowd empowered, the giant's advantages redistributed. The painting supplies the front page its face of overmighty scale, the very dominance Brussels means to cut down.",
        "excerpt": "Goya's giant fills the sky, muscle and shadow against roiling cloud, one arm cocked as if to strike. Beneath him a river of tiny figures, wagons, oxen and fleeing men, streams away in every direction, dwarfed to insignificance. It is dominance rendered as sheer physical mass, the small world scattering before a power it cannot resist.",
        "source": "Francisco de Goya (attributed), 'The Colossus' (El Coloso), c.1808-1812, oil on canvas, Museo Nacional del Prado, Madrid (P002785).",
        "href": "https://commons.wikimedia.org/wiki/File:El_coloso.jpg",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a4.png",
          "alt": "Goya's painting The Colossus: a giant naked figure rising over dark mountains as tiny crowds and cattle flee in the valley below.",
          "credit": "Francisco de Goya (attributed), 'The Colossus,' c.1808-1812, Museo del Prado / Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Udo Keppler's colour cartoon 'Next!', published in Puck on 7 September 1904, portrays the Standard Oil monopoly as a vast octopus, its tentacles already choking the steel, copper and shipping industries, a state house and the U.S. Capitol, while one grasping arm reaches for the White House. It became the defining image of monopoly as an all-enveloping creature enclosing every organ of public life. That is precisely the fear the European Commission voices about Google: a single company whose search and Android tentacles reach into every corner of digital commerce and daily life. The DMA remedy, forcing the sharing of search data and the opening of Android to rival AI assistants, is the modern attempt to pry those tentacles loose. Keppler's octopus and Brussels' order share one conviction: that a grip on everything must be broken open before others can breathe.",
        "excerpt": "A bloated Standard Oil tank sprouts an octopus's tentacles that wind around the pillars of a state legislature, the copper and steel and shipping trades, and the domed Capitol in Washington, while one last arm gropes toward the White House. Titled simply 'Next!', it renders monopoly as a living thing that seizes and encloses everything within reach.",
        "source": "Udo J. Keppler, 'Next!', Puck, vol. 56, no. 1436 (7 September 1904). Library of Congress Prints and Photographs Division.",
        "href": "https://www.loc.gov/item/2001695241/",
        "image": {
          "src": "/covers/google-eu-ai-rivals--a5.png",
          "alt": "1904 Puck cartoon 'Next!' depicting the Standard Oil monopoly as an octopus whose tentacles grip industry, a statehouse and the U.S. Capitol while reaching for the White House.",
          "credit": "Udo J. Keppler, 'Next!', Puck, 1904. Library of Congress / Wikimedia Commons (public domain)."
        }
      }
    ]
  },
  {
    "slug": "us-visa-students-journalists",
    "headline": "The US moves to cap the duration of visas for foreign students, exchange visitors and journalists",
    "overview": "The Trump administration issued a final Department of Homeland Security rule setting fixed maximum stays for several visa categories that were previously granted for the open-ended 'duration of status.' Foreign students on F visas and exchange visitors on J visas would be capped at four years, while journalists on I visas would be limited to 240 days — and just 90 days for Chinese nationals — though holders could apply for extensions. DHS said the rising volume of such visitors challenged its ability to monitor them; the rule takes effect 60 days after publication, pending congressional review.",
    "genre": "Politics",
    "sources": [
      {
        "name": "Reuters",
        "href": "https://news.google.com/rss/articles/CBMingFBVV95cUxNeDZPc3ozbmFlWmdmZTFrUUN5a19HemlibkFpNUlfNjVUdmxvdGRtM0x6eGpiT2ctaFd4YnpXTUdHSkRSb3lyZlVQam5mTnBvcEFsMVlGMU91c2VXdWlpQTRsX1Y3ZTZUNUZzbXhESjJFS2RjZTV3aVVhWkdOWkRNT3FTUXZ6SE1vWkpUbHhLeDNvTlBadi1uMVRyUm9DQQ?oc=5"
      },
      {
        "name": "MagnifyPost",
        "href": "https://www.magnifypost.com/us-limits-stays-of-students-journalists/"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/us-visa-students-journalists.png",
      "alt": "Visa pages inside a United States passport.",
      "credit": "Wikimedia Commons"
    },
    "rank": 25,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "On May 6, 1882, President Chester A. Arthur signed the Chinese Exclusion Act, the first federal law to bar a group by nationality, suspending the immigration of Chinese laborers for ten years and denying resident Chinese any path to naturalization. Its preamble justified the ban on the theory that Chinese arrivals 'endangered the good order of certain localities' — the same language of oversight and public safety invoked by the 2026 DHS rule. That the new regulation singles out Chinese nationals for the harshest cap of just 90 days, against four years for other students, revives the exact ethnic targeting of 1882. What was sold in the Gilded Age as temporary emergency policing of the border hardened into more than sixty years of exclusion. The door, once cracked shut against the Chinese laborer, proved very slow to reopen.",
        "excerpt": "Whereas, in the opinion of the Government of the United States the coming of Chinese laborers to this country endangers the good order of certain localities within the territory thereof... the coming of Chinese laborers to the United States be, and the same is hereby, suspended; and during such suspension it shall not be lawful for any Chinese laborer to come, or, having so come after the expiration of said ninety days, to remain within the United States.",
        "source": "Chinese Exclusion Act, 22 Stat. 58 (May 6, 1882), Preamble and Section 1.",
        "href": "https://en.wikisource.org/wiki/Chinese_Exclusion_Act",
        "image": {
          "src": "/covers/us-visa-students-journalists--a0.png",
          "alt": "1882 Puck cartoon 'The Anti-Chinese Wall,' showing laborers building a brick wall to shut out Chinese immigrants",
          "credit": "Friedrich Graetz, 'The Anti-Chinese Wall,' Puck, March 29, 1882 (Library of Congress); public domain via Wikimedia Commons"
        }
      },
      {
        "category": "historical",
        "title": "In the summer of 1798, amid war fever with France, the Federalist Congress passed the Alien and Sedition Acts, which President John Adams signed into law. The Alien Friends Act empowered the President to expel by proclamation any foreigner he personally judged 'dangerous,' with no trial and no evidence required, while its companion Sedition Act criminalized criticism of the government and jailed newspaper editors. Together they fused the two suspicions animating the 2026 visa rule — distrust of the outsider and distrust of the press — into a single machinery of exclusion. Jefferson and Madison denounced the laws as unconstitutional in the Kentucky and Virginia Resolutions, and popular revulsion helped sweep Adams from office in 1800. Like the new fixed-term visas that replace open-ended welcome with executive discretion, the 1798 acts made the alien's very presence contingent on the state's shifting sense of threat.",
        "excerpt": "That it shall be lawful for the President of the United States at any time during the continuance of this act, to order all such aliens as he shall judge dangerous to the peace and safety of the United States... to depart out of the territory of the United States.",
        "source": "An Act Concerning Aliens (Alien Friends Act), 1 Stat. 570 (June 25, 1798), Section 1.",
        "href": "https://en.wikisource.org/wiki/United_States_Statutes_at_Large/Volume_1/5th_Congress/2nd_Session/Chapter_58",
        "image": {
          "src": "/covers/us-visa-students-journalists--a1.png",
          "alt": "Portrait of John Adams, who signed the 1798 Alien and Sedition Acts",
          "credit": "Gilbert Stuart, 'John Adams,' c. 1800–1815, National Gallery of Art (CC0); via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "In Book 14 of Homer's Odyssey, the disguised, ragged Odysseus arrives at the hut of his swineherd Eumaeus, who does not know him and yet feeds and shelters him without question. When the beggar-king offers to leave, Eumaeus refuses, insisting that to slight even the meanest stranger would be a sin, because every wanderer and beggar comes under the protection of Zeus. This is the ancient Greek law of xenia — guest-friendship — in which hospitality to the outsider is a sacred duty, not a favor the powerful may ration. The 2026 rule, by fixing rigid expiry dates on students, scholars and journalists and shrinking the welcome to a countdown, inverts that ethic exactly. Where Eumaeus sees the stranger at his door as sent by the gods, the new regulation sees him chiefly as a clock to be run down.",
        "excerpt": "Nay, stranger, it were not right for me, even though one meaner than thou wert to come, to slight a stranger: for from Zeus are all strangers and beggars, and a gift, though small, is welcome from such as we.",
        "source": "Homer, Odyssey, Book 14, lines 55–59, trans. A. T. Murray (Loeb Classical Library, 1919).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0136:book=14:card=48",
        "image": {
          "src": "/covers/us-visa-students-journalists--a2.png",
          "alt": "Marble head of Odysseus from the villa of Tiberius at Sperlonga",
          "credit": "Head of Odysseus, Greek marble, 1st c. AD, Museo Archeologico Nazionale, Sperlonga; photo Jastrow, public domain via Wikimedia Commons"
        }
      },
      {
        "category": "literary",
        "title": "The Hebrew Bible returns again and again to the treatment of the ger — the resident foreigner — and nowhere more pointedly than in Leviticus 19, which commands that the stranger be loved 'as thyself.' The law grounds this obligation in memory and empathy: you must not vex the stranger, for you were strangers in the land of Egypt. It refuses the very distinction the 2026 visa rule enshrines, insisting the sojourner 'shall be unto you as one born among you' rather than a guest on a shortened, revocable lease. The parallel sharpens when the outsiders in question are students and journalists — the modern gerim who dwell, work and observe among a people not their own. Against a policy that measures welcome in days, the ancient command measures it as kinship.",
        "excerpt": "And if a stranger sojourn with thee in your land, ye shall not vex him. But the stranger that dwelleth with you shall be unto you as one born among you, and thou shalt love him as thyself; for ye were strangers in the land of Egypt: I am the LORD your God.",
        "source": "Leviticus 19:33–34, King James Version (1611).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Leviticus",
        "image": {
          "src": "/covers/us-visa-students-journalists--a3.png",
          "alt": "Poussin's painting of Ruth the Moabite foreigner gleaning and welcomed in the fields of Boaz",
          "credit": "Nicolas Poussin, 'Summer (Ruth and Boaz),' 1660–64, Musée du Louvre; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "Masaccio's fresco 'The Expulsion from the Garden of Eden,' painted around 1425 in the Brancacci Chapel in Florence, shows Adam and Eve driven through the gate of paradise beneath a sword-bearing angel. Adam buries his face in his hands and Eve howls, their bodies bent by shame and grief as they are cast into the wilderness — the founding image in Western art of the exile shut out. The work's raw humanity marks a turning point in Renaissance painting, giving anguish physical weight for the first time. It renders visible the emotional logic beneath the 2026 rule: the moment a threshold is closed and the welcomed becomes the barred. For the foreign student, scholar or reporter now handed a fixed expiry, Masaccio's gate is the gate of duration-of-status swinging shut behind them.",
        "excerpt": "The fresco confronts the viewer with the sheer bodily grief of banishment: Eve's open, keening mouth and Adam's hidden face turn abstract exclusion into flesh. The barren gate behind them and the empty landscape ahead make plain that hospitality, once withdrawn, leaves only the road out. It is the archetype of the door closed on those no longer permitted to remain.",
        "source": "Masaccio, 'The Expulsion from the Garden of Eden,' fresco, c. 1425, Brancacci Chapel, Santa Maria del Carmine, Florence.",
        "href": "https://commons.wikimedia.org/wiki/File:Expulsion_from_the_Garden_of_Eden_Masaccio_Cappella_Brancacci.jpg",
        "image": {
          "src": "/covers/us-visa-students-journalists--a4.png",
          "alt": "Masaccio's fresco of Adam and Eve weeping as they are expelled through the gate of Eden",
          "credit": "Masaccio, 'The Expulsion from the Garden of Eden,' c. 1425, Brancacci Chapel, Florence; public domain via Wikimedia Commons"
        }
      },
      {
        "category": "artistic",
        "title": "'Va, pensiero,' the Chorus of the Hebrew Slaves from Verdi's 1842 opera Nabucco, gives voice to the Israelites exiled in Babylon, longing across the water for a homeland they may never see again. Set to Temistocle Solera's verses drawn from Psalm 137 ('By the rivers of Babylon'), its slow, unison melody became an anthem of every people cut off from home. The chorus captures precisely the condition the 2026 visa caps impose: the outsider held at a distance, counting down the days until the door of return or refuge is closed. Eduard Bendemann's contemporaneous painting 'The Mourning Jews in Exile' (1832) freezes the same lament — a harpist in chains among grieving captives on the riverbank of Babylon. Together, opera and canvas render exile not as statistic but as ache, the human cost of hospitality withdrawn.",
        "excerpt": "Verdi's exiled chorus rises in hushed unison — 'Va, pensiero, sull'ali dorate' ('Go, thought, on wings of gold') — sending its longing homeward across the water to hills and shores it cannot reach. The music makes audible the grief of those shut out from home, the fatal sweetness of a country 'so beautiful and lost.' It is the sound of the stranger barred at the border, dreaming of a return the state has placed behind a wall of days.",
        "source": "Giuseppe Verdi (music) and Temistocle Solera (libretto), 'Va, pensiero' (Chorus of the Hebrew Slaves), from Nabucco, Part III (1842).",
        "href": "https://en.wikipedia.org/wiki/Va,_pensiero",
        "image": {
          "src": "/covers/us-visa-students-journalists--a5.png",
          "alt": "Eduard Bendemann's painting of chained and mourning Jews in Babylonian exile beside a river",
          "credit": "Eduard Bendemann, 'Die trauernden Juden im Exil' ('The Mourning Jews in Exile'), 1832, Wallraf-Richartz-Museum, Cologne; public domain via Wikimedia Commons"
        }
      }
    ]
  },
  {
    "slug": "grok-build-open-source",
    "headline": "xAI open-sources its Grok Build coding agent after it was caught syncing users' private code",
    "overview": "Elon Musk's xAI released the source code of Grok Build, its terminal-native AI coding agent — including the agent loop, tools, terminal interface and extension system — under the Apache 2.0 licence on GitHub, letting developers compile and run it locally without relying on the company's servers. The move followed revelations that Grok Build had been uploading entire private repositories to the cloud even when users had enabled privacy settings. The release covers the agent runtime, not the underlying Grok model weights.",
    "genre": "Technology",
    "sources": [
      {
        "name": "Simon Willison's Weblog",
        "href": "https://simonwillison.net/2026/Jul/15/grok-build/"
      },
      {
        "name": "Blockchain.News",
        "href": "https://blockchain.news/news/xai-open-sources-grok-build"
      }
    ],
    "href": "#",
    "publishedAt": "2026-07-16",
    "image": {
      "src": "/covers/grok-build-open-source.png",
      "alt": "Source code displayed on a computer monitor.",
      "credit": "Wikimedia Commons"
    },
    "rank": 26,
    "edition": "Evening Edition · 16 July 2026",
    "analogies": [
      {
        "category": "historical",
        "title": "Around 1440 in Mainz, the goldsmith Johannes Gutenberg perfected movable metal type, and by 1455 his press had produced the first substantial printed book, the 42-line Bible. Knowledge that scribes and clergy had long guarded in hand-copied manuscripts suddenly became cheaply reproducible; within decades presses in some 270 European cities had struck more than twenty million volumes. A technology once locked in monastic scriptoria was effectively handed to the reading public, seeding the Reformation and the Scientific Revolution. Just as Gutenberg turned a closely held craft into a shared engine of literacy, xAI's decision to publish Grok Build's source under the Apache 2.0 license hands a once-proprietary coding agent to any developer who wants to run and inspect it locally. In both cases it is the release of the machinery itself, not merely its output, that democratizes the power.",
        "excerpt": "Around 1440, the goldsmith Johannes Gutenberg invented a method for mass-producing movable type for a printing press; from Mainz the press spread within a few decades to around 270 cities across Europe, and by 1500 the presses of Western Europe had produced more than twenty million copies. Books that scribes had guarded became reproducible by the thousands, putting the tools of knowledge into ordinary hands.",
        "source": "\"Printing press,\" Wikipedia.",
        "href": "https://en.wikipedia.org/wiki/Printing_press",
        "image": {
          "src": "/covers/grok-build-open-source--a0.png",
          "alt": "An open volume of the Gutenberg Bible (c. 1455), showing dense printed Latin text in two columns.",
          "credit": "Gutenberg Bible, Lenox Copy, New York Public Library, photographed 2009, via Wikimedia Commons."
        }
      },
      {
        "category": "historical",
        "title": "On April 12, 1955, the day his polio vaccine was declared safe and effective, Jonas Salk was asked by broadcaster Edward R. Murrow who owned the patent. Salk answered that there was no patent and that the vaccine belonged to the people, asking whether one could patent the sun. Rather than lock up a breakthrough that terrified families desperately needed, he treated it as a commons, prizing distribution over profit. xAI's release of Grok Build echoes that instinct: after the agent was caught quietly hoarding users' private repositories in the cloud, the company opened the code so anyone could see, audit, and freely run it. Where Salk refused to fence off a cure, xAI unfenced a tool whose hidden behavior had broken users' trust.",
        "excerpt": "Interviewed on national radio the day the vaccine was announced, Salk waved away the very idea of ownership, insisting the vaccine belonged to the people and that patenting it would be as absurd as patenting sunlight. He sought no royalties and no monopoly, wagering that unguarded access would end an epidemic faster than any commercial claim. The gesture became lasting shorthand for science given freely to humanity.",
        "source": "\"Jonas Salk,\" Wikipedia, on the 1955 Edward R. Murrow interview.",
        "href": "https://en.wikipedia.org/wiki/Jonas_Salk",
        "image": {
          "src": "/covers/grok-build-open-source--a1.png",
          "alt": "Candid portrait photograph of Jonas Salk, developer of the polio vaccine, c. 1959.",
          "credit": "Jonas Salk, c. 1959, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In Aeschylus's tragedy Prometheus Bound (staged in Athens in the fifth century BCE), the Titan Prometheus is chained to a desolate Caucasian crag as punishment for stealing fire from the gods and giving it to mortals. He confesses that he stopped humans from foreseeing their doom, planted blind hopes within them, and above all delivered fire, from which they would learn many arts. Zeus's fury is the rage of a power determined to keep a transformative technology for itself. The parallel to Grok Build is direct: a jealously guarded capability, held in the cloud and hidden even from its own users, is wrenched into the open and placed in ordinary hands. Like Prometheus, the giver acts against the instinct to hoard, though here disclosure follows exposure rather than pure defiance.",
        "excerpt": "Yes, I caused mortals to cease foreseeing their doom. . . . I caused blind hopes to dwell within their breasts. . . . In addition, I gave them fire. . . . Yes, and from it they shall learn many arts.",
        "source": "Aeschylus, Prometheus Bound, trans. Herbert Weir Smyth (Perseus Digital Library).",
        "href": "https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0010:card=248",
        "image": {
          "src": "/covers/grok-build-open-source--a2.png",
          "alt": "A marble bust of the Greek tragedian Aeschylus, author of Prometheus Bound.",
          "credit": "Bust of Aeschylus, Roman copy; Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "literary",
        "title": "In the third chapter of Genesis, the serpent promises that eating from the tree of the knowledge of good and evil will bring not death but revelation, telling the woman that their eyes shall be opened. When Adam and Eve eat, the eyes of them both are opened, and something hidden, their own nakedness, is suddenly seen. The story fuses knowledge, exposure, and the loss of a comfortable concealment, the very triad at the heart of the Grok Build episode. xAI's users learned that their private code had been silently uploaded even with privacy settings on, and the open-sourcing pried the black box apart so that what the software actually did could finally be seen. Whether painful or liberating, the opening of eyes cannot be undone.",
        "excerpt": "For God doth know that in the day ye eat thereof, then your eyes shall be opened, and ye shall be as gods, knowing good and evil. . . . And the eyes of them both were opened, and they knew that they were naked; and they sewed fig leaves together, and made themselves aprons.",
        "source": "Genesis 3:5, 3:7, King James Version (Wikisource).",
        "href": "https://en.wikisource.org/wiki/Bible_(King_James)/Genesis",
        "image": {
          "src": "/covers/grok-build-open-source--a3.png",
          "alt": "Albrecht Dürer's 1504 engraving 'Adam and Eve' at the tree of knowledge.",
          "credit": "Albrecht Dürer, 'Adam and Eve' (1504); Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Heinrich Füger's neoclassical canvas \"Prometheus Brings Fire to Mankind\" (1817) shows the Titan bearing a flaming torch down to shadowed, half-formed humans who reach upward toward the light. The painting renders the gift of enlightenment literally, as illumination passing from a jealous heaven into human hands. Füger casts the act as noble and generative, the founding moment of art, craft, and civilization itself. The image maps onto xAI's release of Grok Build's source under the Apache 2.0 license, a guarded fire, comprising the agent loop, tools, UI, and extensions, carried out of the corporate cloud and set before the developer community to use and rekindle. The torch in the painting is the runtime now running on anyone's terminal.",
        "excerpt": "Against a darkened sky, a luminous Prometheus descends bearing a burning torch, its glow spilling across the pale, newly made human figures who strain upward to receive it. The composition stages the transfer of power itself: light, once held above, now given below. It is the moment a guarded technology becomes a shared inheritance.",
        "source": "Heinrich Füger, Prometheus Brings Fire to Mankind, 1817, Neue Galerie / Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Heinrich_fueger_1817_prometheus_brings_fire_to_mankind.jpg",
        "image": {
          "src": "/covers/grok-build-open-source--a4.png",
          "alt": "Painting of Prometheus holding a flaming torch aloft as pale human figures reach up toward the fire.",
          "credit": "Heinrich Füger, \"Prometheus Brings Fire to Mankind,\" 1817, via Wikimedia Commons (public domain)."
        }
      },
      {
        "category": "artistic",
        "title": "Ludwig van Beethoven's ballet score \"The Creatures of Prometheus,\" Op. 43, premiered in Vienna in 1801, dramatizes the Titan animating two clay statues and leading them to Parnassus to be schooled in the arts and sciences. Prometheus is staged as the enlightener who does not keep knowledge to himself but bestows music, dance, and reason on his creations. Its triumphant finale theme so pleased Beethoven that he reused it in the Eroica Symphony, making Promethean giving the seed of one of his greatest works. The analogy to Grok Build is the spirit of transmission: a maker turning inward-held craft outward, handing the very tools of creation to those who will carry them further. xAI's open-sourcing likewise treats a coding agent less as private property than as instruction meant to be passed on.",
        "excerpt": "Beethoven's overture and dances trace Prometheus animating lifeless figures and tutoring them, through music itself, in the arts of civilization. The score turns the myth of the fire-giver into sound, exulting in knowledge shared rather than withheld. That its jubilant closing theme returns in the Eroica marks how a gift, once given, propagates into new creation.",
        "source": "Ludwig van Beethoven, The Creatures of Prometheus, Op. 43 (1801); portrait of Beethoven by Christian Horneman (1803), Wikimedia Commons.",
        "href": "https://commons.wikimedia.org/wiki/File:Beethoven_Hornemann.jpg",
        "image": {
          "src": "/covers/grok-build-open-source--a5.png",
          "alt": "Miniature portrait of Ludwig van Beethoven painted by Christian Horneman in 1803.",
          "credit": "Christian Horneman, portrait of Ludwig van Beethoven, 1803, via Wikimedia Commons (public domain)."
        }
      }
    ]
  },
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
    "lead": true,
    "rank": 27,
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
    ]
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
    "rank": 28,
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
    ]
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
    "rank": 29,
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
    ]
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
    "rank": 30,
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
    ]
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
    "rank": 31,
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
    ]
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
    "rank": 32,
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
    ]
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
    "rank": 33,
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
    ]
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
    "rank": 34,
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
    ]
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
    "rank": 35,
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
    ]
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
    "rank": 36,
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
    ]
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
    "rank": 37,
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
    ]
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
    "rank": 38,
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
    ]
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
    "rank": 39,
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
