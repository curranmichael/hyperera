// Generate a cover for each AI-credited story, then run it through the shared
// dither pipeline so it matches the site. Run: `npm run images:generate`.
// Targets stories whose image credit is "AI-generated"; idempotent — skips slugs
// whose PNG already exists (delete one to regenerate it).

import { access, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { bufferToDitheredPng } from "./dither";
import { generateCover } from "./image-provider";
import { getPublishedStories } from "../lib/stories";

const OUT_DIR = join(process.cwd(), "public", "covers");

const STYLE =
  "Cinematic photographic still, dramatic natural light, shallow depth of field, " +
  "evocative and atmospheric. Symbolic, not literal reportage. " +
  "No text, no lettering. Simply a newsreel image.";
// Classical alt:
// "Classical fine-art oil painting in the manner of the old masters. Rich
//  chiaroscuro, painterly texture, evocative and timeless. Symbolic, not literal
//  reportage. No text or lettering, no identifiable real people.";

// Scene-based prompts for stories whose headline/overview trips the model's
// content filter (charged terms hang the request). Keyed by slug.
const PROMPT_OVERRIDES: Record<string, string> = {
  "china-export-controls-japan":
    "A vast container port terminal at dusk, towering stacks of plain unmarked shipping containers in flat blocks of colour and idle cranes silhouetted against a brooding grey sky, a lowered barrier across an empty quay, themes of trade between two great nations abruptly restricted. Every container surface is smooth, blank and unmarked. Absolutely no text, letters, words, numbers, container codes, logos, brand names, flags or writing anywhere in the image",
  "google-klarna-antitrust-sweden":
    "A small set of brass scales of justice resting on a dark polished desk before the cool blue glow of a towering glass corporate skyscraper at dusk, soft reflections and shallow depth of field, themes of a technology giant weighed in the balance and found liable. Absolutely no text, letters, words, numbers, logos, brand names or writing anywhere in the image",
  "un-panel-ai-catastrophic-risks":
    "A single vast server cabinet glowing faintly in a dark data hall, cold blue light spilling from its seams while the long shadow of a human figure falls across the floor before it, ominous and still, themes of a powerful new intelligence and the fear of losing control. Absolutely no text, letters, words, numbers, screens, logos or writing anywhere in the image",
  "kroger-giant-eagle-acquisition":
    "A brightly lit empty supermarket aisle receding into soft focus, tall shelves stocked with plain unlabelled cartons and cans under clean cool light, a single shopping trolley resting at the far end, themes of grocery chains merging and consolidating. Every package is plain and blank. Absolutely no text, letters, words, numbers, brand names, price tags, logos or writing anywhere in the image",
  "cma-cgm-fedex-logistics-deal":
    "A huge container ship stacked with plain unmarked containers docked beside towering cranes at a port terminal at golden hour, calm water in the foreground, themes of a shipping empire expanding onto land and into logistics. Every container and surface is smooth, blank and unmarked. Absolutely no text, letters, words, numbers, container codes, logos, brand names or writing anywhere in the image",
  "micron-gm-chip-supply-deal":
    "A single polished silicon wafer held under bright directional light, its concentric circuitry catching a faint rainbow sheen, a blurred automobile assembly line receding into cool shadow behind, shallow depth of field, themes of chips and cars bound together in a supply pact. Absolutely no text, letters, words, numbers, logos, badges, brand names or writing anywhere in the image",
  "poland-russia-sabotage-warning":
    "Empty railway tracks curving away into darkness beneath a single cold security floodlight, a faint drift of smoke and long shadows across the gravel, tense and deserted with no people visible, themes of covert sabotage and a shadow war behind the lines. Absolutely no text, letters, words, numbers, signs, logos, flags or writing anywhere in the image",
  "romania-storm-deadly":
    "Dark towering storm clouds massing over the rooftops and church spires of a Central European city at dusk, sheets of rain and a bent tree lashed by wind in the foreground, a deserted wet street, dramatic and ominous, themes of a violent storm sweeping the land. Absolutely no text, letters, words, numbers, signs, shop fronts, logos or writing anywhere in the image",
  "uganda-marburg-case":
    "A lone laboratory worker in a full white protective suit and mask handling a single small glass vial under the cold blue light of a biosafety cabinet in a darkened lab, sterile and tense, themes of a lethal virus contained and watched. Absolutely no text, letters, words, numbers, labels, logos or writing anywhere in the image",
  "carroll-trump-damages-appeal":
    "The tall stone steps and fluted columns of a great supreme court building at dusk, a set of brass scales of justice resting on a plinth in the foreground, a lone long shadow stretching across the marble, themes of the powerful finally held to account. Absolutely no text, letters, words, numbers, inscriptions, logos or writing anywhere in the image",
  "mexico-city-world-cup-deaths":
    "A dense night-time crowd of football fans seen from behind waving plain banners beneath a great illuminated monument in a city square, coloured light and drifting haze, a mood of celebration edged with unease and shadow, themes of mass jubilation turned to tragedy. Every banner and flag is plain and blank. Absolutely no text, letters, words, numbers, logos, brand names or writing anywhere in the image",
  "canada-eurovision-2027-debut":
    "A grand concert stage bathed in sweeping beams of coloured spotlight and drifting haze, a single microphone on a stand at centre before a dark empty auditorium, glamorous and expectant, themes of a great international song contest. Absolutely no text, letters, words, numbers, logos, screens, brand names or writing anywhere in the image",
  "swiss-traditionalists-defy-pope":
    "The candle-lit stone interior of a soaring gothic cathedral at dusk, shafts of pale light falling through tall arched windows onto empty pews and a distant altar, a single bishop's mitre resting on a carved wooden stall in the foreground, solemn and hushed, themes of a church divided and the old rite defying Rome. Absolutely no text, letters, words, numbers, inscriptions, logos or writing anywhere in the image",
  "sudan-rsf-el-fasher-crimes":
    "A deserted, war-scarred city in the arid Sahel at dusk, shuttered low buildings and empty dust-blown streets beneath a heavy, smoke-darkened sky, a lone abandoned sandal in the foreground, bleak and silent with no people visible, themes of a city sacked and its people driven out. Absolutely no text, letters, words, numbers, flags, logos or writing anywhere in the image",
  "colorado-kiros-defeats-degette":
    "A quiet American polling place at dusk, a plain wooden ballot box on a bare table beneath a single hanging lamp, an empty voting booth with a drawn curtain to one side, plain walls, themes of an election upset and a changing of the guard. Absolutely no text, letters, words, numbers, posters, signage, logos or writing anywhere in the image",
  "student-loan-forgiveness-struck-down":
    "An empty grand courtroom at dusk, a carved wooden judge's bench beneath tall windows with cold light, a set of brass scales of justice resting on the bench beside a single closed folder, deep shadows, themes of the courts checking a decree. Absolutely no text, letters, words, numbers, documents with writing, logos or writing anywhere in the image",
  "eu-parcel-fee-shein-temu":
    "A vast parcel-sorting depot at night, a conveyor belt heaped with small plain brown cardboard boxes flowing toward the camera, idle scanning gantries overhead, cool industrial light, themes of a flood of cheap parcels meeting a new toll. Every box is blank and unmarked. Absolutely no text, letters, words, numbers, barcodes, shipping labels, logos, brand names or writing anywhere in the image",
  "australia-big-four-accounting-breakup":
    "A hushed corporate boardroom at dusk, a long polished table and empty leather chairs, a set of brass scales of justice on the wall, floor-to-ceiling windows with a cool city skyline beyond, themes of powerful firms weighed and divided. Absolutely no text, letters, words, numbers, logos, brand names or writing anywhere in the image",
  "south-korea-google-android-app-store":
    "A single smartphone held in a hand in soft directional light against a dark background, its screen showing a neat grid of plain blank rounded app tiles in muted colours, shallow depth of field, themes of a digital gatekeeper and the marketplace it controls. The app tiles are blank with no symbols. Absolutely no text, letters, words, numbers, logos, brand names, app names, icons or writing anywhere on the screen or in the image",
  "mexico-beat-ecuador-world-cup":
    "An empty floodlit football stadium at night, the pitch a brilliant green, a single ball resting on the centre spot, drifting confetti and jubilant emptiness, themes of a host nation's triumph and a long drought finally ended. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "spain-june-heat-deaths":
    "A sun-bleached Spanish city square at midday in a heatwave, pale cobblestones and a dry stone fountain shimmering under a white-hot sky, a few figures resting in a thin strip of shade, wilting trees, oppressive heat haze, themes of a country overwhelmed by extreme heat. Absolutely no text, letters, words, numbers, signs, shop fronts, logos or writing anywhere in the image",
  "california-food-date-labels":
    "Rows of neatly stacked packaged food on brightly lit grocery-store shelves receding into soft focus, cool clean supermarket light, plain unlabelled cartons and cans, themes of abundance, freshness and waste. Every package is plain and blank. Absolutely no text, letters, words, numbers, brand names, price tags, date stamps, logos or writing anywhere on any package or in the image",
  "scotus-transgender-school-sports":
    "An empty outdoor running track at dusk, crisp white starting blocks and curving lane lines stretching away under stadium floodlights, a brilliant green infield, deserted and still, themes of competition, fairness and who may take the field. Absolutely no text, letters, words, numbers, lane numbers, logos, advertising boards or writing anywhere in the image",
  "ukraine-dubna-second-strike":
    "A large industrial complex at night seen across a dark plain, tall towers and a storage tank burning bright orange against a black sky, a thin plume of smoke and a distant orange glow on the horizon, tangled silver pipework glinting, themes of distant infrastructure struck in war. Absolutely no text, letters, words, numbers, logos, flags or writing anywhere in the image",
  "europe-heatwave-record-deaths":
    "A sun-bleached European city square at midday in a heatwave, cobblestones and a dry stone fountain shimmering under a white-hot sky, a few people resting in a thin strip of shade, wilting trees, oppressive heat haze, themes of a continent overwhelmed by extreme heat. Absolutely no text, letters, words, numbers, signs, shop fronts, logos or writing anywhere in the image",
  "ghana-accra-flooding-deaths":
    "A flooded tropical city street at grey dawn, muddy brown water rising over the wheels of cars and the steps of low concrete houses, palm trees and drooping power lines overhead, bleak and deserted, themes of a neighbourhood overwhelmed by floodwater. There are no signs or boards of any kind anywhere. Absolutely no text, letters, words, numbers, street signs, shop signs, billboards, licence plates, logos or writing anywhere in the image",
  "ubs-million-new-millionaires":
    "A scattering of gleaming plain gold coins heaped on a dark polished surface in the foreground, a softly blurred glittering city skyline of glass towers at dusk behind, cool light and shallow depth of field, themes of swelling wealth and a widening gap. The coins are plain blank discs. Absolutely no text, letters, words, numbers, currency symbols, faces, logos or writing anywhere in the image",
  "usmca-withdrawal-countdown":
    "A vast container port at dusk, towering stacks of shipping containers in plain flat solid blocks of colour and idle cranes silhouetted under a brooding sky, a lowered barrier across the empty quay, themes of cross-border trade halted between nations. Every container surface is completely smooth, blank and unmarked with no codes, no markings and no symbols of any kind. Absolutely no text, letters, words, numbers, container codes, serial numbers, logos, brand names, flags or writing anywhere in the image",
  "meta-states-child-addiction-suit":
    "A young child's face softly lit from below by the pale glow of a smartphone held in the dark, wide absorbed eyes reflecting the screen, the room around them deep in shadow, themes of children, screens and addictive design. The screen is an indistinct blur of pale light. Absolutely no text, letters, words, numbers, app icons, logos or writing anywhere on the screen or in the image",
  "brazil-beat-japan-world-cup":
    "An empty floodlit football stadium at night, the pitch a brilliant green, a single ball resting on the centre spot, drifting confetti and jubilant emptiness, themes of a dramatic last-minute victory. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "rick-owens-adidas-aircon-tracksuits":
    "Several avant-garde inflatable puffed-up tracksuits in muted grey and black displayed on faceless mannequins under soft directional studio light against a pale seamless background, bulbous rounded sculptural forms, shallow depth of field, themes of futuristic fashion and wearable climate control. Absolutely no text, letters, words, numbers, logos, brand names, stripes that form letters or writing anywhere in the image",
  "israel-strikes-gaza-children":
    "A cluster of makeshift tents and stretched tarpaulins of displaced families on rubble-strewn ground at dusk beneath a heavy, smoke-darkened sky, a few small belongings scattered in the dust, bleak and silent with no people visible, themes of war's toll on the innocent and families left sheltering in the open. Absolutely no text, letters, words, numbers, flags, logos or writing anywhere in the image",
  "morocco-eliminate-netherlands-world-cup":
    "An empty floodlit football stadium at night, the pitch a brilliant green, a single ball resting on the penalty spot, drifting confetti and jubilant emptiness, themes of a dramatic penalty-shootout victory and an underdog's triumph. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "australia-sues-amazon-prime-ads":
    "A glowing flat-screen television on a low stand in a dim, empty living room at night, its bright screen an indistinct abstract wash of coloured light interrupting a film, a remote control resting on the arm of a sofa in the foreground, themes of advertising intruding on paid entertainment. The screen shows only a blur of colour. Absolutely no text, letters, words, numbers, logos, brand names, channel icons or writing anywhere on the screen or in the image",
  "uk-cma-app-store-payments":
    "A single smartphone held in a hand in soft directional light against a dark background, its screen showing a neat grid of plain blank rounded app tiles in muted colours, shallow depth of field, themes of a digital marketplace and the gateway to it. The app tiles are blank with no symbols on them. Absolutely no text, letters, words, numbers, logos, brand names, app names, icons or writing anywhere on the screen or in the image",
  "paraguay-knock-germany-out-world-cup":
    "An empty floodlit football stadium at night, the pitch a brilliant green, a single ball resting on the centre spot, drifting confetti and jubilant emptiness, themes of a dramatic underdog victory and a mighty favourite toppled. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "trump-vehicle-right-to-repair":
    "A close-up of a mechanic's bare hands working with a wrench deep in the open engine bay of an older car, warm garage light, scattered hand tools resting on a cloth, shallow depth of field, themes of self-reliance and the freedom to mend what you own. Absolutely no text, letters, words, numbers, logos, badges, gauges or writing anywhere in the image",
  "turrell-100th-skyspace-aarhus":
    "The interior of a vast dark domed chamber with a single large circular oculus open at its apex to a deep twilight sky, soft graded light washing the smooth curved walls, a few small silhouetted figures seated far below gazing upward, serene and meditative, themes of light, perception and the heavens. Absolutely no text, letters, words, numbers or writing anywhere in the image",
  "ukraine-drones-russian-refinery-fuel":
    "A large oil refinery at night seen across a dark plain, tall flare stacks and a fuel-storage tank burning bright orange against a black sky, a thin plume of smoke and a distant orange glow on the horizon, tangled silver pipelines glinting, themes of energy infrastructure struck in war and spreading fuel shortages. Absolutely no text, letters, words, numbers, logos, flags or writing anywhere in the image",
  "strategy-value-below-bitcoin":
    "A single large iridescent soap bubble drifting and beginning to deflate above a dark polished table in a dim room, a faint cool light passing through it, swirling shadows behind, themes of speculative value inflated and collapsing. Absolutely no text, letters, words, numbers, symbols, currency signs or writing anywhere in the image",
  "apple-india-antitrust-copy-paste":
    "A small set of brass scales of justice resting on a dark desk before the cool glow of a sleek modern glass storefront at dusk, soft reflections and shallow depth of field, themes of a technology giant weighed in the balance and accused. Absolutely no text, letters, words, numbers, logos, brand names, app icons or writing anywhere in the image",
  "colorado-west-wildfires-firefighters":
    "A wild mountain ridgeline in the American West ablaze at dusk, orange flames running through dry scrub and pine as towering walls of smoke billow into a darkening sky, distant tiny silhouettes of firefighters against the inferno, themes of wildfire, danger and sacrifice. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "pakistan-afghan-border-operation":
    "A rugged arid mountain frontier at dawn under a pale sky, a lone stone watchtower and a winding razor-wire border fence crossing stony ridges, deserted and tense, themes of a contested borderland. Absolutely no text, letters, words, numbers, flags, logos or writing anywhere in the image",
  "south-korea-ai-chip-megaplan":
    "The vast interior of a brightly lit semiconductor fabrication plant, long rows of gleaming machinery and clean-room gantries stretching into the distance under cool white light, futuristic and immense, themes of grand industrial ambition. Absolutely no text, letters, words, numbers, logos, labels or writing anywhere in the image",
  "texas-bible-required-reading":
    "A quiet sunlit American elementary-school classroom, rows of small empty wooden desks and a single closed leather-bound book resting on the teacher's lectern, warm morning light through tall windows, themes of childhood, learning and scripture. The book is plainly bound with a blank cover. Absolutely no text, letters, words, numbers, titles, logos or writing anywhere in the image",
  "israel-recognizes-armenian-genocide":
    "A solemn stone memorial of tall carved upright basalt slabs arranged in a circle on a windswept hillside at dusk, an eternal flame burning low at its center, bare and reverent, themes of remembrance and mourning. Absolutely no text, letters, words, numbers, inscriptions, symbols or writing anywhere in the image",
  "sovereign-funds-energy-dollar":
    "Rows of tall white wind turbines and dark solar arrays stretching to the horizon across an open plain at golden hour beneath a wide clear sky, vast and orderly, themes of wealth shifting into energy. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "philippines-solar-rush":
    "The crowded corrugated rooftops of a dense tropical Philippine neighborhood, many freshly installed blue solar panels gleaming under a brilliant midday sun, palm trees between the houses, themes of ordinary households seizing the power of the sun. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "nasa-swift-telescope-rescue":
    "A lone satellite observatory drifting in low Earth orbit high above the blue curve of the planet, sunlight glinting off its golden solar panels against the deep black of space, scattered stars behind, themes of a fragile machine falling and a daring rescue. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "canada-south-africa-world-cup":
    "A floodlit football stadium at night, the green pitch glowing brilliantly under bright lights, players celebrating near a corner flag amid drifting confetti and a blurred roaring crowd, themes of a dramatic last-minute victory. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "sothebys-lewis-collection-record":
    "An elegant auction-house saleroom with a packed crowd of bidders seen from behind, facing a raised wooden rostrum where an auctioneer stands, a single large gilt-framed painting illuminated on the wall behind, warm gallery light, themes of art, money and spectacle. The framed painting shows only an indistinct abstract wash. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "meta-ai-glasses-kylie-jenner":
    "A single pair of sleek modern smart glasses resting on a minimalist pale studio surface, a tiny camera lens just visible at one corner, soft directional light and shallow depth of field, glamorous and clean, themes of fashionable technology and augmented sight. Absolutely no text, letters, words, numbers, logos, brand names or writing anywhere in the image",
  "austria-anthropic-eu":
    "A grand modern European institutional building of glass and steel at dusk, a sweeping curved facade reflecting cool blue twilight, a row of bare unmarked flagpoles before it, stately and quiet, themes of Europe courting innovation. Absolutely no text, letters, words, numbers, flags, emblems, logos or writing anywhere in the image",
  "vietnam-arrests-dissent":
    "A long empty prison corridor of grey concrete lined with heavy steel-barred cell doors in dim light, a single small barred window casting a faint shaft of pale light onto the floor, bleak and silent, themes of dissent silenced and confinement. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "iran-strikes-bahrain-kuwait":
    "A dark Gulf coastline at night seen from far away, a faint orange glow low on the horizon and thin streaks of light crossing a starless sky above a distant silhouetted military port, tense and deserted, themes of a fragile truce shattered and war spreading across the water. Absolutely no text, letters, words, numbers, logos, flags or writing anywhere in the image",
  "uganda-military-shuts-media":
    "An old printing press standing dark, cold and motionless in a deserted newspaper press hall at night, the lights switched off and a single blank unfinished front page left in the carriage, deep shadows, themes of a silenced press. Absolutely no text, letters, words, numbers, headlines, logos or writing anywhere in the image",
  "south-korea-japan-defence-ties":
    "Two plain bare flagpoles standing side by side at dusk before a calm modern government building, soft cool light and a wide quiet plaza, themes of two former adversaries drawing together in alliance. Absolutely no text, letters, words, numbers, flags, emblems, logos or writing anywhere in the image",
  "vw-shareholder-china-models-germany":
    "A vast, empty German automobile assembly hall at dawn, long idle production lines and silent robotic arms under high skylights, a single unfinished car body on the line, themes of an industrial giant idled and changing hands. Absolutely no text, letters, words, numbers, logos, badges or writing anywhere in the image",
  "kentucky-flooding-deaths":
    "A flooded residential street at grey dawn, muddy brown water rising over the hoods of submerged cars and the front porches of clapboard houses, bare trees and drooping power lines overhead, bleak and deserted, themes of a neighbourhood overwhelmed by rising floodwater. There are no signs or boards of any kind anywhere. Absolutely no text, letters, words, numbers, street signs, road signs, billboards, licence plates, shop signs, logos or writing anywhere in the image",
  "austria-algeria-world-cup-thriller":
    "An empty floodlit football stadium at night, the pitch a brilliant green, a single ball resting on the centre spot, drifting confetti and jubilant emptiness, themes of a dramatic last-minute result. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "german-court-google-ai-liability":
    "A dim, empty room lit only by the cold glow of a computer monitor whose screen shows a blurred, indistinct wash of pale light reflected on a glass desk, a small set of brass scales of justice resting in the foreground shadow, themes of machine-made words and accountability. Absolutely no text, letters, words, numbers, legible code, logos or writing anywhere in the image",
  "wild-form-stonewall-bar":
    "A warm, intimate cocktail bar interior of flowing curved microcement walls and vaulted archways with no straight lines, soft amber lighting and rounded booths, empty and inviting, themes of sanctuary and organic form. Absolutely no text, letters, words, numbers, signs, logos or writing anywhere in the image",
  "pakistan-rangers-hq-attack":
    "A high fortified perimeter wall of a security compound at night, harsh floodlights cutting through drifting smoke and dust, an empty guard post and a lowered barrier across the entrance, tense and deserted, themes of a stronghold under assault. Absolutely no text, letters, words, numbers, logos, flags, emblems or writing anywhere in the image",
  "ukraine-strikes-russian-refineries":
    "A large oil and gas refinery at night seen across a dark plain, tall flare stacks burning bright orange against a black sky, a thin plume of smoke and a distant orange glow on the horizon, tangled silver pipelines glinting, themes of energy infrastructure struck in war. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "hezbollah-rejects-israel-lebanon-deal":
    "A long empty diplomatic conference table in a grand hall with cold light from tall windows, an overturned empty chair pushed back from the table, two bare flagpoles with no flags at either end, themes of a fractured agreement and a party walking away from peace. Absolutely no text, letters, words, numbers, flags, emblems or writing anywhere in the image",
  "australia-toughens-child-social-media-ban":
    "A young child's hands cradling a softly glowing smartphone in a darkened room, the pale screen light on a face turned away in shadow, a parent's silhouette reaching in from the edge of the frame, themes of childhood, screens and protection. Absolutely no text, letters, words, numbers, logos, app icons or writing anywhere on the screen or in the image",
  "ntsb-ends-tesla-power-steering-probe":
    "A close-up photograph of a plain modern car steering wheel with a smooth unmarked centre hub, dim leather dashboard at dusk seen from the driver's seat, an empty road blurred through the windscreen, cool light and shallow depth of field, themes of control and machinery under scrutiny. This is a real photograph, NOT a video frame: no screen, no display overlay, no video player, no progress bar or playback controls, no on-screen buttons or icons. Absolutely no text, letters, words, numbers, digits, gauges with numerals, logos, badges or writing anywhere in the image",
  "cape-verde-world-cup-round-of-32":
    "An empty floodlit football stadium at night, the pitch a brilliant green, a single ball resting on the centre spot, drifting confetti and jubilant emptiness, themes of an underdog's historic triumph and national joy. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "gehry-abu-dhabi-arts-venue":
    "A monumental sculptural building of curving, fragmented silver-white forms rising against a clear desert sky beside calm water at golden hour, abstract futuristic architecture, themes of a visionary arts landmark. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "arizona-sect-leader-convicted-abuse":
    "A lonely two-lane desert highway stretching toward distant bare hills under a vast pale sky at dusk, a single battered trailer parked on the dusty shoulder, long shadows and emptiness, themes of hidden lives exposed and a long road to justice. Absolutely no text, letters, words, numbers, road signs or writing anywhere in the image",
  "willison-red-team-ai-assistant":
    "A dim room lit only by the cool glow of a computer monitor, an out-of-focus screen of faint code reflected in a pair of glasses on a desk, a small locked brass padlock resting in the foreground, themes of digital defence and an unbreached secret. Absolutely no text, letters, words, numbers, legible code, logos or writing anywhere in the image",
  "trump-tariff-digital-services-tax":
    "A vast container port at dusk, towering stacks of shipping containers and idle cranes under a brooding sky, a lowered barrier across the quay, themes of trade halted and tariffs raised between nations. Absolutely no text, letters, words, numbers, logos, flags or writing anywhere in the image",
  "burkina-faso-cuts-france-ties":
    "A bare metal flagpole with no flag standing at dusk before a weathered colonial-era government building in West Africa, an empty courtyard and long shadows, themes of severed ties and a nation asserting its independence. Absolutely no text, letters, words, numbers, flags, emblems or writing anywhere in the image",
  "us-restricts-frontier-ai-trusted":
    "A single softly glowing computer server cabinet sealed behind a heavy locked steel vault door in a dim concrete room, cold blue light leaking from the seams, themes of a powerful technology kept under guard and its access restricted. Absolutely no text, letters, words, numbers, logos, screens or writing anywhere in the image",
  "greece-satellites-wildfires-first":
    "The view from high above the Earth at night, a small satellite silhouette in the foreground, far below a single tiny orange ember of a wildfire glowing on a dark Mediterranean coastline, stars and the gentle curve of the planet, themes of vigilance and early warning from space. Absolutely no text, letters, words, numbers or writing anywhere in the image",
  "edf-sells-north-america-kkr":
    "Rows of tall white wind turbines stretching across a vast North American plain at dawn, soft mist and a wide pale sky, a single empty road leading toward them, themes of a clean-power business changing hands. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "meta-prediction-markets-arena":
    "A clear glass crystal ball resting on a dark polished table in a dim room, a single shaft of cool light passing through it and casting a soft glow, swirling shadows behind, themes of foretelling uncertain futures and speculation. Absolutely no text, letters, words, numbers, symbols or writing anywhere in the image",
  "dea-fentanyl-allowed-on-streets":
    "A dim evidence storage room at night, rows of sealed clear plastic bags of white powder stacked on a steel table under a single hanging lamp, a watchful figure standing back in deep shadow doing nothing, themes of institutional inaction and a slow-moving harm allowed to spread. Absolutely no text, letters, words, numbers, labels or writing anywhere in the image",
  "judge-halts-federal-voter-list":
    "A single plain wooden ballot box resting on a bare table in a vast empty marble hall, a cold shaft of light from a high window, deep shadows, themes of citizens counted and the limits of central power. Absolutely no text, letters, words, numbers, posters, signage or writing anywhere in the image",
  "swatch-sues-samsung-watch-faces":
    "Extreme macro close-up of the intricate brass gears, springs, screws and ruby jewels of an exposed mechanical watch movement, dramatic raking light, shallow depth of field, blank metal surfaces with no markings, themes of precision craftsmanship and imitation. No dials, no clock faces, no hands. Absolutely no text, letters, words, numbers, brand names or writing anywhere in the image",
  "kazakhstan-cuts-oil-after-drone-strike":
    "An oil and gas processing plant at night seen across a dark plain, tall flare stacks burning orange against a black sky, pipelines glinting, a thin plume of smoke drifting, themes of energy infrastructure disrupted by distant war. Absolutely no text, letters, words, numbers or writing anywhere in the image",
  "ecuador-beats-germany-world-cup":
    "An empty floodlit football stadium at night, the pitch a brilliant green, a single ball at the centre circle, jubilant emptiness and drifting confetti, themes of an underdog's historic triumph and national joy. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "pharrell-louis-vuitton-tidal-wave":
    "A vast curling wall of water rising behind an empty modern fashion runway at dusk, dramatic spotlights and drifting mist, glamorous and theatrical, themes of spectacle and the sea. Absolutely no text, letters, words, logos, numbers or writing anywhere in the image",
  "venezuela-earthquakes-strike-caracas":
    "Rescue workers and residents gathered before a partly collapsed concrete apartment building at dawn in a Latin American city, dust hanging in the air, themes of sudden catastrophe and survival",
  "us-clears-f-35-jet-sales-to-turkey":
    "A sleek grey modern fighter jet parked on a runway at dusk under a dramatic sky, ground crew small in the distance, themes of alliance and military power",
  "white-house-seeks-87-billion-iran-war-ebola":
    "The dome of a grand white neoclassical capitol building against a brooding stormy sky, themes of government, money and the cost of war",
  "ntsb-investigates-texas-tesla-crash":
    "A damaged modern electric car at the roadside on a dark highway at night, hazard lights glowing and an investigator's flashlight beam, themes of technology and accident",
  "france-air-conditioning-debate-heatwave":
    "A sun-bleached European city square at midday in a heatwave, people resting in narrow strips of shade by a dry fountain, shimmering heat haze, themes of sweltering summer",
  "chemours-forever-chemicals-settlement":
    "Pale chemical foam gathering on the still surface of a river beneath the silhouette of an industrial plant at dusk, themes of pollution and reckoning",
  "world-court-judges-sue-trump-over-sanctions":
    "An empty carved wooden judge's bench in a grand courtroom beneath a set of brass scales of justice, cold light from tall windows, themes of law confronting power",
  "pilfered-picasso-found-in-paris-drug-bust":
    "A gilt-framed old painting wrapped in cloth, recovered under a bare lamp on a table in a dim apartment, themes of stolen art resurfacing",
  "glm-5-2-most-powerful-open-weights-model":
    "A single bright flame cupped in open hands and passed outward toward many reaching hands in the dark, warm glow, themes of knowledge set free",
  "north-korea-commissions-nuclear-armed-warship":
    "A grey steel warship's prow seen at dawn from the dockside, calm harbour water, low mist, themes of naval power and cold ambition",
  "nato-chief-rutte-heads-to-white-house-before-summit":
    "Two national flags on tall poles before a grand white columned government building under an overcast sky, themes of diplomacy and uneasy alliance",
  "supreme-court-sides-with-trump-on-green-card-holders":
    "The marble steps and columns of a great supreme court building at dusk, a lone figure small at the base, themes of law and the outsider",
  "colombia-de-la-espriella-wins-runoff":
    "A dim polling station at night, two officials counting blank paper ballots at a wooden table under a single hanging lamp, plain bare plaster walls with no posters or signs, a plain unmarked flag drooping on a pole by an open doorway, deep shadows, themes of a nation divided and a knife-edge election. Absolutely no text, letters, words, numbers, posters, signage or writing anywhere in the image",
  "japan-iwate-earthquake":
    "A quiet coastal Japanese town at dawn seen from a hillside, the calm grey sea beyond a harbour, power lines swaying, an empty railway platform, themes of seismic unease and stillness after a tremor",
  "carone-adams-bribery-charges":
    "An empty marble courthouse corridor at dusk, tall columns and a polished floor, a single shaft of cold light, themes of public trust and reckoning",
  "anduril-nissan-plant-drones":
    "The vast empty floor of a shuttered automobile assembly hall, idle robotic arms and skylights, a lone small drone silhouette on a workbench, themes of industry turned from peace to war",
  "iraq-weighs-opec-exit":
    "A lone oil derrick and storage tanks silhouetted against a hazy desert sunset, a single road leading away, themes of resource wealth and a parting of ways",
  "pentagon-restores-flu-shots":
    "Rows of empty steel bunk beds in a long military barracks dormitory at dawn, pale light through high windows, themes of close quarters and contagion",
  "china-future-industries-bubble":
    "A glittering forest of glass skyscrapers rising into mist at dusk, a single iridescent soap bubble drifting among the towers, themes of dazzling speculation and fragility",
  "trump-withholds-housing-bill":
    "A grand domed legislative capitol at dusk under a brooding stormy sky, in the foreground a completely blank sheet of plain white paper and a capped fountain pen resting on a dark desk, the paper is empty with no writing on it, themes of stalled power and brinkmanship. Absolutely no text, letters, words, handwriting, numbers or writing anywhere in the image",
  "south-africa-world-cup-knockouts":
    "An empty floodlit football stadium at night, the pitch a brilliant green, a lone ball at the centre circle, jubilant emptiness, themes of historic triumph and national pride",
};

async function exists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

// The gateway occasionally times out (retryable 408); retry before giving up.
async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  for (let i = 1; ; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i >= attempts) throw err;
      console.warn(`  retry ${i}/${attempts - 1}: ${(err as Error).message}`);
    }
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const stories = await getPublishedStories();
  const targets = stories.filter((s) => s.image?.credit === "AI-generated");
  const failed: string[] = [];

  for (const story of targets) {
    const out = join(OUT_DIR, `${story.slug}.png`);
    if (await exists(out)) {
      console.log(`skip ${story.slug} (exists)`);
      continue;
    }

    const subject = PROMPT_OVERRIDES[story.slug] ?? `${story.headline}. ${story.overview}`;
    const prompt = `${subject} — ${STYLE}`;
    try {
      const png = await withRetry(async () =>
        bufferToDitheredPng(Buffer.from(await generateCover(prompt))),
      );
      await writeFile(out, png);
      console.log(`${story.slug}.png  generated -> ${(png.length / 1024).toFixed(0)}KB`);
    } catch (err) {
      failed.push(story.slug);
      console.warn(`fail ${story.slug}: ${(err as Error).message}`);
    }
  }

  if (failed.length) {
    console.error(`\n${failed.length} failed (re-run to retry): ${failed.join(", ")}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
