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
  "iran-hormuz-tanker-strike":
    "A large oil tanker at sea at dusk with a column of dark smoke and orange flame rising from its deck, seen across calm open water, a hazy distant coastline of low arid hills, a few small vessels on the horizon, tense and ominous with no people visible, themes of a strategic sea passage under attack. Absolutely no text, letters, words, numbers, flags, hull markings, logos or writing anywhere in the image",
  "belgium-usa-world-cup-exit":
    "A vast floodlit football stadium at night seen from high in the stands, a brilliant green pitch far below ringed by tiers of blurred spectators, stadium lights blazing, atmospheric and grand with no identifiable faces, themes of a decisive World Cup match. Absolutely no text, letters, words, numbers, scoreboards, jerseys with writing, logos, sponsor boards, banners or writing anywhere in the image",
  "canada-thyssenkrupp-submarines":
    "A dark grey military submarine cutting through cold open sea under an overcast sky, spray breaking over its bow and conning tower, a low wake spreading behind, vast and silent with no people visible, themes of a nation building a new undersea fleet. Absolutely no text, letters, words, numbers, hull numbers, insignia, flags, markings, logos or writing anywhere on the vessel or in the image",
  "sp500-ai-stocks-record":
    "A single luminous upward-climbing line rising steeply across a dark abstract field of soft blurred green and gold light, suggesting a soaring market chart, minimal, sleek and elegant with no people visible, themes of stocks climbing toward a record high. Absolutely no text, letters, words, numbers, tickers, symbols, logos or writing anywhere in the image",
  "vertex-crinetics-acquisition":
    "A single luminous three-dimensional molecular model — clusters of softly glowing spheres joined by slender bonds, like a floating protein or a strand of DNA — suspended against a deep dark clinical blue background, shallow depth of field, precise, elegant and scientific with no people and no surfaces that could bear writing, themes of a new medicine for rare disease. Absolutely no text, letters, words, numbers, labels, logos, symbols or writing anywhere in the image",
  "macron-syria-visit":
    "A single black official state car on an empty road approaching a Middle Eastern city at golden hour, damaged and half-repaired pale stone buildings rising in the hazy distance, long shadows, quiet and momentous with no people visible, themes of a foreign leader visiting a country emerging from war. Absolutely no text, letters, words, numbers, flags, license plates, signs, logos or writing anywhere in the image",
  "texas-app-store-age-verification-scotus":
    "The white marble facade and tall columns of a grand neoclassical courthouse seen from below against a clear pale sky, broad stone steps rising toward the shadowed portico, austere and imposing with no people visible, themes of a high court ruling on who may pass a threshold. Absolutely no text, letters, words, numbers, inscriptions, engravings, signs, logos or writing anywhere on the building or in the image",
  "anthropic-mythos-government-code-audit":
    "Rows of dark server racks receding down a dim data-centre aisle, a single bright beam of cool light sweeping across them like a scanning searchlight, tiny green and amber indicator lights glinting in the shadows, no monitors and no screens anywhere, cold, watchful and futuristic with no people visible, themes of an automated sentinel inspecting hidden systems. Absolutely no text, letters, words, numbers, code, screens, monitors, labels, logos or writing anywhere in the image",
  "toyota-texas-truck-plant":
    "The interior of a vast modern automobile factory, a long assembly line of orange robotic arms poised over bare pickup-truck body shells receding down the hall under bright industrial light, gleaming and orderly with no people visible, themes of a new plant building trucks. Absolutely no text, letters, words, numbers, logos, brand names, badges, signs or writing anywhere in the image",
  "microsoft-4800-ai-layoffs":
    "A vast open-plan office at dusk with long rows of empty desks, darkened monitors and vacant swivel chairs receding into shadow, a single cold shaft of grey light from tall windows, deserted, still and melancholy with no people visible, themes of workers let go and jobs lost to automation. Absolutely no text, letters, words, numbers, screens, logos, brand names, signs or writing anywhere in the image",
  "ukraine-drones-russia-refinery-strike":
    "A large oil refinery at night seen across a dark plain, a tall flare stack and a fuel-storage tank burning bright orange against a black sky, a thin plume of smoke and a distant orange glow on the horizon, tangled silver pipework glinting, deserted with no people visible, themes of fuel installations set ablaze far behind the front line. Absolutely no text, letters, words, numbers, logos, flags, markings or writing anywhere in the image",
  "hamas-dissolves-gaza-government":
    "An empty government council chamber at dawn, curved rows of vacant seats facing a bare unadorned rostrum, cold pale light from high windows falling on the deserted floor, solemn and still with no people visible, themes of a ruling body dissolved and power handed over. Absolutely no text, letters, words, numbers, flags, emblems, seals, logos or writing anywhere in the image",
  "terawulf-anthropic-data-center-lease":
    "The long clean corridor of a vast dim data hall, endless rows of tall server cabinets glowing with cool blue light and receding into deep shadow, cabling looping overhead, ordered, immense and futuristic with no people visible, themes of a colossal engine built to power artificial intelligence. Absolutely no text, letters, words, numbers, screens, labels, logos, brand names or writing anywhere in the image",
  "broadcom-apple-chip-deal-2031":
    "A single mirror-bright silicon wafer held upright under cool clean-room light, its surface catching an intricate grid of microscopic circuitry in faint rainbow diffraction, deep shadow behind, precise, sleek and futuristic with no people visible, themes of two firms bound together over the chips at the heart of modern devices. Absolutely no text, letters, words, numbers, logos, brand names, labels or writing anywhere in the image",
  "lockheed-ultra-maritime-acquisition":
    "The dark curved hull of a submarine cutting slowly through cold grey open sea beneath a heavy overcast sky, a low wake spreading behind it, vast, silent and imposing with no people visible, themes of undersea defence and a giant absorbing a specialist of the deep. Absolutely no text, letters, words, numbers, markings, insignia, flags, hull numbers, logos or writing anywhere on the vessel or in the image",
  "china-official-death-sentence-graft":
    "A deserted formal courtroom at dusk, a single tall carved wooden judge's bench facing rows of empty seats, a set of brass scales of justice on the bench catching a cold shaft of grey light, austere, hushed and severe with no people visible, themes of stern justice handed down for corruption. Absolutely no text, letters, words, numbers, signs, inscriptions, emblems, logos or writing anywhere in the image",
  "trump-wall-street-opening-bell":
    "The grand columned neoclassical facade of a stock exchange building at dawn, tall fluted stone pillars above wide empty steps, furled banners hanging still, a pale gold sky behind, imposing, stately and deserted with no people visible, themes of soaring markets and fortunes staked on the exchange. Absolutely no text, letters, words, numbers, signs, banners, tickers, flags, logos, brand names or writing anywhere in the image",
  "china-pacific-missile-test":
    "A single missile rising on a bright column of flame and a plume of white smoke and spray from the surface of a vast dark ocean at first light, the water churning below it, cold grey sea meeting a pale dawn sky, stark, remote and ominous with no people, land or vessels visible, themes of a distant show of military might over open water. Absolutely no text, letters, words, numbers, flags, insignia, markings, logos or writing anywhere in the image",
  "memphis-national-guard-shooting":
    "A deserted American downtown street at night, wet asphalt reflecting the cold blue-white glare of a single overhead streetlight, shuttered storefronts and long empty sidewalks receding into darkness, tense, still and desolate with no people visible, themes of sudden violence in a city under armed patrol. Absolutely no text, letters, words, numbers, street signs, shop names, license plates, logos, brand names or writing anywhere in the image",
  "australia-fiji-defence-pact":
    "Two hands clasped firmly together in a handshake, seen close up in warm late-afternoon light against a soft-focus backdrop of a calm blue Pacific ocean and sky, sincere, solemn and hopeful, only the two clasped hands and the sea visible and no faces or bodies, themes of two nations binding themselves together in common defence. Absolutely no text, letters, words, numbers, flags, emblems, stars, logos or writing anywhere in the image",
  "inflatable-garments-temperature-regulation":
    "A single inflatable, air-filled padded jacket floating upright against a clean seamless pale studio background, its glossy quilted surface puffed taut with trapped air and catching soft directional light, no person inside and no one visible, sleek, minimal and futuristic, themes of clothing engineered from air to warm or cool the body. Absolutely no text, letters, words, numbers, logos, brand names, labels, tags or writing anywhere in the image",
  "us-july4-record-heat-america-250":
    "A sun-bleached, deserted American small-town main street at high noon under a merciless white-hot sky, heat haze shimmering above the empty asphalt, wilting trees and a dry stone fountain, a lone empty bench in a thin strip of shade, oppressive and still with no people visible, themes of a nation's holiday overwhelmed by dangerous heat. Absolutely no text, letters, words, numbers, flags, signs, shop fronts, logos or writing anywhere in the image",
  "trump-pardons-clean-air-act-convictions":
    "A single heavy diesel haulage truck parked and idling beneath a lone sodium streetlight on an empty industrial lot at night, a faint plume of exhaust haze rising into the cold dark air, still and deserted with no people visible, themes of pollution controls quietly switched off and wrongdoing wiped clean. Absolutely no text, letters, words, numbers, number plates, badges, logos, brand names or writing anywhere in the image",
  "netanyahu-trump-us-summit-iran-rift":
    "Two empty high-backed leather armchairs facing each other across a small polished table in a formal state reception room at dusk, cool light from a tall window, a wide gap of bare floor between them, stately and tense with no people visible, themes of two uneasy allies preparing to meet after a war. Absolutely no text, letters, words, numbers, flags, emblems, logos or writing anywhere in the image",
  "aspen-acres-wildfire-colorado":
    "A steep forested mountain hillside ablaze at dusk, ranks of pine trees burning bright orange with tall flames and churning smoke rising into a darkening sky, an orange glow reflecting off drifting ash, vast and terrifying with no people visible, themes of a fast-moving wildfire consuming the land. Absolutely no text, letters, words, numbers, signs, logos or writing anywhere in the image",
  "geneva-lake-wisconsin-boat-capsize":
    "A small empty pleasure boat overturned and half-submerged on choppy grey lake water beneath a wall of dark churning storm clouds, wind whipping spray off the waves, a distant wooded shore under a bruised sky, desolate and sorrowful with no people visible, themes of a sudden storm and lives lost on the water. Absolutely no text, letters, words, numbers, markings, logos or writing anywhere in the image",
  "peco-philadelphia-utility-workers-strike":
    "A yellow electrical utility hard hat and a pair of heavy work gloves resting on a coil of thick black cable beside a locked chain-link substation gate at grey dawn, transformers and pylons behind, still and abandoned with no people visible, themes of workers laying down their tools. Absolutely no text, letters, words, numbers, signs, logos, brand names or writing anywhere in the image",
  "anthropic-samsung-custom-ai-chip":
    "A single mirror-bright silicon wafer held upright under cool clean-room light, its surface catching an intricate grid of microscopic circuitry in rainbow diffraction, deep shadow behind, precise and futuristic with no people visible, themes of a company forging its own dedicated engine of thought. Absolutely no text, letters, words, numbers, logos, brand names or writing anywhere in the image",
  "argentina-cape-verde-world-cup":
    "An empty floodlit football stadium at night, the pitch a brilliant deep green, a single white ball resting on the centre spot, drifting confetti caught in the bright beams, jubilant and hushed with no people visible, themes of a champion narrowly surviving a thrilling contest. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "egypt-australia-world-cup-shootout":
    "A lone white football resting on the penalty spot before an empty net in a brilliantly floodlit stadium at night, long shadows stretching across the deep green grass, tense and expectant with no people visible, themes of a nation's first historic triumph decided by a single nerveless kick. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "dearborn-fairlane-mall-shooting":
    "A deserted shopping-mall concourse at night, polished floor reflecting shuttered storefronts and a single overhead security light, an abandoned shopping bag lying on its side, cold and eerily silent with no people visible, themes of sudden violence shattering an ordinary public place. Absolutely no text, letters, words, numbers, signs, shop names, logos, brand names or writing anywhere in the image",
  "sudan-el-obeid-rsf-drone-strikes":
    "A shattered, deserted street in a sun-baked North African city at dusk, collapsed masonry and rubble strewn across the road, pale dust hanging in the air and a thin column of smoke rising against an orange sky, desolate and mournful with no people visible, themes of a city bombarded from above. Absolutely no text, letters, words, numbers, signs, logos or writing anywhere in the image",
  "chess-federation-suspends-former-champion":
    "A wooden chessboard mid-game lit dramatically from one side against deep shadow, a single toppled black king lying on its side among the standing carved pieces, tense and final with no people visible, themes of a fallen master brought low by his own reckless words. Absolutely no text, letters, words, numbers, logos or writing anywhere in the image",
  "congo-ebola-outbreak-worst-ever":
    "A row of empty white protective medical suits, gloves and face shields hanging on a rail inside a dim field-clinic tent at dawn, a single folding cot and a stainless tray beside them, the plain undecorated canvas walls completely blank and unmarked, sombre and clinical with no people visible, themes of health workers bracing against a spreading plague. Absolutely no text, letters, words, numbers, signs, labels, symbols, markings, stains, graffiti, logos or writing anywhere on the walls or in the image",
  "nato-ankara-summit-declaration":
    "A tight semicircle of tall bare flagpoles with no flags standing shoulder to shoulder before a grand modern government building of pale stone at dusk, stormlight breaking behind them, a wide empty plaza in front, solemn and resolute, themes of many nations binding themselves to defend one another. Absolutely no text, letters, words, numbers, flags, stars, emblems, logos or writing anywhere in the image",
  "monaco-parcel-bombing-ukrainian-suspect":
    "A dim opulent marble apartment lobby at night, a single plain brown parcel resting alone on the polished floor beside a mirrored wall, cold light and long shadows, deserted and tense with no people visible, themes of a hidden explosive device left behind by a vanished assailant. Absolutely no text, letters, words, numbers, labels, signs, logos or writing anywhere in the image",
  "us-withdraws-troops-nigeria-isis":
    "A remote sun-scorched Sahel airstrip at dawn, a large grey military transport aircraft with its rear ramp lowered on a bare red-earth runway, distant thorn trees and empty savannah under a pale hazy sky, still and deserted with no people visible, themes of soldiers departing a distant land after a campaign. Absolutely no text, letters, words, numbers, tail markings, insignia, flags, logos or writing anywhere on the aircraft or in the image",
  "iran-oil-sales-japan-waiver":
    "A vast oil supertanker seen from a high angle threading a narrow moonlit strait between dark rugged headlands at night, its long wake cutting the black water, calm and immense, themes of sanctioned crude quietly returning to distant markets across the sea. Absolutely no text, letters, words, numbers, ship names, flags, logos or writing anywhere in the image",
  "russia-fuel-crisis-imports-rationing":
    "A large oil refinery at night seen across a dark plain, a tall flare stack and a fuel-storage tank burning bright orange against a black sky, a thin plume of smoke and a distant orange glow on the horizon, tangled silver pipework glinting, themes of a nation's fuel supply crippled and burning. Absolutely no text, letters, words, numbers, logos, flags or writing anywhere in the image",
  "india-tata-apple-iphone-leak":
    "A vast dim data hall with long rows of glowing server cabinets receding into shadow, a single heavy steel cabinet standing open and empty with cold blue light spilling across the floor, ordered and tense with no people visible, themes of guarded secrets stolen and spilled from a corporate vault. Absolutely no text, letters, words, numbers, screens, labels, logos, brand names or writing anywhere in the image",
  "turkey-detains-comedian-erdogan":
    "A single vintage stand-up microphone on a stand under a hot circular pool of light on a bare dark stage, an empty stool beside it and rows of empty seats fading into blackness, a mood of sudden silence, themes of a comedian's voice cut short by the state. Absolutely no text, letters, words, numbers, signs, logos or writing anywhere in the image",
  "canada-alberta-westcoast-oil-pipeline":
    "A broad pipeline right-of-way cut dead straight through dense forested mountains at dawn, a great steel pipe following the cleared corridor toward a distant Pacific inlet glinting under a pale sky, vast and orderly with no people visible, themes of a new artery carrying oil to the sea and distant markets. Absolutely no text, letters, words, numbers, signs, logos, flags or writing anywhere in the image",
  "big-dymak-timber-hq-odense":
    "A striking circular contemporary building of warm exposed timber ribs enclosing a green planted courtyard with stepped terraces, an undulating roof lined with dark solar panels, set between wetlands and a low industrial district at golden hour, serene and modern with almost no one about, themes of visionary sustainable architecture built from natural materials. Absolutely no text, letters, words, numbers, signs, logos, brand names or writing anywhere in the image",
  "moldova-pm-munteanu-resigns":
    "A grand neoclassical parliament building of pale stone at dusk under a brooding grey sky, a wide empty plaza before it and a single bare unmarked flagpole with no flag, one lit window high in the facade, stately and sombre, themes of a leader stepping down and a government falling. Absolutely no text, letters, words, numbers, flags, emblems, logos or writing anywhere in the image",
  "alibaba-bans-anthropic-claude-code":
    "A vast dim data hall with long rows of glowing server cabinets receding into shadow, a single heavy steel door sealed shut across one aisle with cold blue light leaking from its seams, ordered and tense, themes of a powerful software tool shut out over hidden risks. Absolutely no text, letters, words, numbers, screens, logos, brand names or writing anywhere in the image",
  "eu-lawmaker-pegasus-spyware-hack":
    "A single smartphone lying face-up on a dark desk glowing faintly in a shadowed room, a faint reflection of a watching human eye caught in its dark screen, cold light and deep shadow, tense and clandestine, themes of secret surveillance and a hunter turned hunted. The screen is an indistinct blur of pale light. Absolutely no text, letters, words, numbers, app icons, logos or writing anywhere on the screen or in the image",
  "europe-heatwave-excess-deaths":
    "A sun-bleached deserted European city square at noon under a merciless white-hot sky, a dry stone fountain and wilting plane trees shimmering in the heat haze, a single empty bench in a thin strip of shade, oppressive and still with almost no one about, themes of a continent overwhelmed by deadly heat. Absolutely no text, letters, words, numbers, signs, shop fronts, logos or writing anywhere in the image",
  "portugal-croatia-round-of-16":
    "An empty floodlit football stadium at night, the pitch a brilliant green, a single ball resting on the penalty spot, drifting confetti and jubilant emptiness under bright lights, themes of a dramatic late comeback and victory. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "albania-tirana-protest-violence":
    "A tense night-time city square before a grand government building, drifting pale smoke and haze lit by harsh floodlights, scattered stones and an overturned metal barrier on the empty cobblestones, a lone abandoned shoe in the foreground, no people visible, themes of a popular uprising and clashes with police. Absolutely no text, letters, words, numbers, banners, placards, graffiti, logos or writing anywhere in the image",
  "ecb-lagarde-early-exit":
    "A towering glass central-bank skyscraper at dusk reflecting a cool darkening sky beside a wide river, a single small sailboat on the dark water below leaning as if to depart, sleek and imposing, themes of the guardian of a currency weighing whether to leave the helm. Absolutely no text, letters, words, numbers, symbols, currency signs, logos, brand names or writing anywhere in the image",
  "vatican-excommunicates-traditionalist-schism":
    "The candle-lit stone interior of a soaring gothic cathedral at dusk, shafts of pale light through tall arched windows falling on empty pews and a distant altar, a single bishop's mitre resting on a carved wooden stall in the foreground, solemn and hushed, themes of a church divided and clergy cast out. Absolutely no text, letters, words, numbers, inscriptions, logos or writing anywhere in the image",
  "chinese-ai-model-glm-rivals-us-labs":
    "A single bright flame cupped in a pair of open hands and passed toward many reaching hands in the dark, warm glow against deep shadow, themes of a powerful new intelligence spreading cheaply and freely across the world. Absolutely no text, letters, words, numbers, screens, symbols, logos or writing anywhere in the image",
  "microsoft-frontier-ai-deployment-firm":
    "A long clean corridor of a vast dim data hall with a single softly glowing server cabinet, cool blue light spilling from its seams, a lone human figure walking toward it, ordered and quiet, themes of experts sent out to spread a new technology through industry. Absolutely no text, letters, words, numbers, screens, logos, brand names or writing anywhere in the image",
  "germany-merz-tax-pension-labour-reforms":
    "A grand neoclassical government building of pale stone at dusk under a brooding grey sky, a wide empty plaza before it and a row of bare unmarked flagpoles, stately and sober, themes of a nation's leaders overhauling its economy. Absolutely no text, letters, words, numbers, flags, emblems, logos or writing anywhere in the image",
  "tesla-record-q2-deliveries-europe-rebound":
    "Rows of gleaming identical electric cars in flat blocks of colour parked in a vast open lot at golden hour seen from a high angle, sleek and orderly, receding into soft focus, themes of a carmaker's fortunes rebounding and demand returning. Every car surface is smooth, blank and unbadged. Absolutely no text, letters, words, numbers, badges, number plates, logos, brand names or writing anywhere in the image",
  "damascus-cafe-bombing":
    "The dim shattered interior of a small Middle Eastern café at night, overturned chairs and a single cracked table amid drifting dust and smoke, a bare bulb hanging from the ceiling, deserted and still with no people visible, themes of sudden violence tearing into ordinary life. Absolutely no text, letters, words, numbers, signs, menus, logos or writing anywhere in the image",
  "skyroot-vikram-1-first-private-orbital":
    "A slender white rocket standing on a coastal launch pad at dawn wreathed in soft venting vapour, a pale sky and calm sea behind and distant gantry towers, hopeful and still, themes of a young private venture reaching for orbit. Absolutely no text, letters, words, numbers, markings, logos, flags or writing anywhere on the rocket or in the image",
  "hamilton-laocoon-bronze-auction-record":
    "An elegant auction-house saleroom at dusk, a single classical bronze sculpture of intertwined struggling figures dramatically spotlit on a plinth before rows of empty chairs, warm gallery light and deep shadows, themes of an ancient masterpiece and the art market. Absolutely no text, letters, words, numbers, paddles, logos or writing anywhere in the image",
  "mad-tengyun-cloud-buildings-tencent":
    "Three vast smooth cloud-like white office volumes lifted high above the ground on slender structural cores beside a calm sea at golden hour, open shaded public parkland and flowing paths beneath them, futuristic and serene, themes of visionary architecture giving the land back to the city. Absolutely no text, letters, words, numbers, signs, logos, brand names or writing anywhere in the image",
  "uk-apology-forced-adoptions":
    "An empty vintage nursery at dusk, a single plain wooden cradle beneath a tall window with soft grey light, a folded knitted blanket and long shadows on bare floorboards, tender and sorrowful, themes of mothers parted from their children and a long-awaited reckoning. Absolutely no text, letters, words, numbers, signs, logos or writing anywhere in the image",
  "peru-el-nino-state-of-emergency":
    "Dark towering storm clouds massing over a steep Andean valley town of low houses at dusk, a swollen muddy brown river surging past the rooftops below and sheets of rain sweeping in, dramatic and ominous with no people visible, themes of a country bracing for devastating floods. Absolutely no text, letters, words, numbers, signs, logos or writing anywhere in the image",
  "samsung-90-billion-chungcheong":
    "The vast interior of a brightly lit semiconductor fabrication plant, long rows of gleaming machinery and clean-room gantries receding into the distance under cool white light, immense and futuristic, themes of a colossal industrial bet on the future. Absolutely no text, letters, words, numbers, logos, labels, brand names or writing anywhere in the image",
  "papua-rebels-kill-american-pilot":
    "The charred wreckage of a small propeller aircraft smouldering in a remote misty highland jungle clearing at dawn, thick green ridges rising into low cloud behind and a thin plume of grey smoke, desolate and silent with no people visible, themes of an outsider lost to a remote insurgency. Absolutely no text, letters, words, numbers, tail markings, logos, flags or writing anywhere in the image",
  "google-eu-android-fine-upheld":
    "A set of brass scales of justice resting on a dark polished bench before the cool blue glow of a vast glass corporate tower at dusk, a faint arc of small points of light curving above like a ring of stars, imposing and still, themes of a technology giant weighed by the law and found liable. Absolutely no text, letters, words, numbers, logos, brand names, flags or writing anywhere in the image",
  "iran-hormuz-tanker-warning":
    "A massive oil supertanker seen from a high angle threading a narrow moonlit strait between dark rugged headlands at night, its long wake cutting the black water, a small distant patrol boat shadowing it, tense and lonely, themes of a chokepoint that controls the passage of the world's oil. Absolutely no text, letters, words, numbers, ship names, flags, logos or writing anywhere in the image",
  "india-japan-strategic-pacts":
    "A grand diplomatic hall at golden hour with a long polished table and two facing rows of empty chairs, tall windows behind, two tall unadorned banners of deep saffron and pure white flanking the room, dignified and expectant, themes of two great Asian nations binding their fortunes together in technology and trade. Absolutely no text, letters, words, numbers, emblems, flags, logos or writing anywhere in the image",
  "south-korea-kospi-chip-selloff":
    "A vast dim trading floor at night dominated by a huge glowing wall rendered as an abstract cascade of plunging red bars and falling lines, a single silhouetted trader watching from below, cold light and vertigo, themes of a market in freefall as chip fortunes collapse. Absolutely no text, letters, words, numbers, tickers, logos, brand names or writing anywhere in the image",
  "openai-us-government-stake":
    "A colossal softly glowing sphere of blue light suspended beneath a great domed government rotunda of pale marble, a single small human figure standing far below gazing up at it, awe edged with unease, themes of the state taking a share in a powerful new intelligence. Absolutely no text, letters, words, numbers, screens, logos, brand names or writing anywhere in the image",
  "france-wildfires-heatwave":
    "A hillside of dry Mediterranean scrub ablaze at dusk in southern France, walls of orange flame and billowing smoke sweeping toward silhouetted umbrella pines, a water-dropping aircraft banking low through the smoke, fierce and urgent, themes of a land scorched after a brutal heatwave. Absolutely no text, letters, words, numbers, tail markings, logos or writing anywhere in the image",
  "gaza-1000-days-war":
    "A vast expanse of grey rubble and the hollowed concrete shells of ruined apartment blocks stretching to the horizon under a pale dusty sky, a single small figure walking a narrow path through the wreckage, desolate and still with almost no one visible, themes of a city reduced to ruins over a thousand days. Absolutely no text, letters, words, numbers, flags, graffiti, logos or writing anywhere in the image",
  "onion-infowars-sandy-hook":
    "A lone vintage broadcast microphone under a hot pool of light on a dark studio desk, a glowing red on-air style lamp behind it and a jester's motley cap resting beside the mic, wry and theatrical, themes of satire seizing a demagogue's own megaphone for a good cause. Absolutely no text, letters, words, numbers, call signs, logos or writing anywhere in the image",
  "microsoft-lightstorm-undersea-cable":
    "The stern of a cable-laying ship at dawn on a calm open sea, a thick black submarine cable arcing off a great rotating drum down into deep blue water, coils of heavy cable stacked on the wet deck, vast and quiet, themes of a new artery laid across the ocean floor to carry the world's data. Absolutely no text, letters, words, numbers, ship names, logos or writing anywhere in the image",
  "new-jersey-medicaid-employer-fee":
    "A worn wooden bench in a quiet clinic waiting room at dusk, a single empty chair, a stethoscope and a plain unmarked folder resting on the seat, soft window light and long shadows, restrained and sober, themes of who pays for the care of low-wage workers. Absolutely no text, letters, words, numbers, forms, signs, logos or writing anywhere in the image",
  "europe-leaders-close-ranks-trump":
    "A tight circle of tall flagpoles flying plain deep-blue banners standing shoulder to shoulder against a brooding grey sky before a grand classical government facade, stormlight breaking behind, solidarity and resolve, themes of Europe's leaders closing ranks under pressure. Absolutely no text, letters, words, numbers, stars, emblems, logos or writing anywhere in the image",
  "puerto-rico-hurricane-funds-audit":
    "A row of buckled and collapsed steel electrical transmission towers and tangled power lines sprawled across a lush tropical hillside at dusk, a dark unlit village in the valley below and a lone repair truck on an empty road, forlorn and unfinished, themes of a power grid still broken years after the storm. Absolutely no text, letters, words, numbers, signs, logos or writing anywhere in the image",
  "davidson-prize-routemaster-playgrounds":
    "A retired vintage red double-decker bus parked on a leafy residential street at golden hour, seen from a low three-quarter angle, playfully reimagined as a children's play structure with a small metal slide and climbing ropes spilling from its open side onto the pavement, warm and whimsical, themes of a worn-out machine given a joyful second life for play. The bus has a completely blank smooth front with no destination blind, no route board, no number plate and no side adverts — every panel is plain painted metal. Absolutely no text, letters, words, numbers, route numbers, destination signs, number plates, adverts, logos or writing anywhere in the image whatsoever",
  "kyiv-strikes-kill-eight":
    "The shattered facade of a tall apartment block at dawn in a Northern European city, blown-out windows and a plume of grey smoke rising into a pale sky, rubble and a lone bare tree in the foreground, deserted and still with no people visible, themes of a capital city struck from the air. Absolutely no text, letters, words, numbers, signs, logos, flags or writing anywhere in the image",
  "usmca-renewal-declined":
    "A vast container port terminal at dusk straddling a wide river border, towering stacks of plain unmarked shipping containers in flat blocks of colour and idle cranes silhouetted against a brooding grey sky, a lowered barrier across an empty quay, themes of trade between neighbouring nations left in doubt. Every container surface is smooth, blank and unmarked. Absolutely no text, letters, words, numbers, container codes, logos, brand names, flags or writing anywhere in the image",
  "us-iran-doha-talks-conclude":
    "A long empty diplomatic negotiating table in a grand modern hall at dusk, rows of vacant chairs facing one another and a carafe of water at the centre, soft cool light through tall windows, two bare unmarked flagpoles standing at either end, themes of adversaries meeting through intermediaries to ease tensions. Absolutely no text, letters, words, numbers, flags, emblems, logos or writing anywhere in the image",
  "us-ai-voluntary-model-standards":
    "A single vast server cabinet glowing faintly in a dark data hall, cold blue light spilling from its seams, a long clean corridor of machinery receding into shadow, ordered and still, themes of a powerful new intelligence and the rules being drawn around it. Absolutely no text, letters, words, numbers, screens, logos or writing anywhere in the image",
  "germany-charges-ukrainian-nord-stream":
    "A moonlit expanse of dark open sea at night, a violent upwelling of pale gas and churning white foam boiling to the surface from far below, a cold grey sky above and no land in sight, ominous and deserted, themes of hidden sabotage of an undersea pipeline. Absolutely no text, letters, words, numbers, ships, logos, flags or writing anywhere in the image",
  "judge-blocks-usps-mail-voting":
    "A dim postal sorting room at dusk, a tall wall of wooden pigeonhole slots crammed with plain white envelopes, a single canvas mail sack resting on the floor beneath a hanging lamp, deep shadows, themes of the delivery of ballots and the courts guarding the vote. Every envelope is plain and blank. Absolutely no text, letters, words, numbers, addresses, stamps, postmarks, logos or writing anywhere in the image",
  "alibaba-600-million-drug-sales-settlement":
    "A vast dim e-commerce fulfilment warehouse at night, a long conveyor belt heaped with plain brown cardboard parcels curving away into soft focus, towering shelves of blank boxes and idle scanning gantries overhead, cool industrial light, themes of a giant marketplace and the illicit goods traded within it. Every box and parcel is blank and unmarked. Absolutely no text, letters, words, numbers, barcodes, shipping labels, logos, brand names or writing anywhere in the image",
  "belgium-senegal-world-cup-comeback":
    "An empty floodlit football stadium at night, the pitch a brilliant green, a single ball resting on the penalty spot, drifting confetti and jubilant emptiness under bright lights, themes of a dramatic last-gasp comeback and victory snatched at the final moment. Absolutely no text, letters, words, numbers, logos, advertising boards or writing anywhere in the image",
  "us-historic-heatwave-july-fourth":
    "A sun-bleached American city skyline shimmering under a white-hot midday sky in a heatwave, a hazy sun blazing over glass towers, empty sweltering streets and wilting trees in the foreground, oppressive heat haze, themes of a punishing heat dome over the land. Absolutely no text, letters, words, numbers, signs, billboards, logos or writing anywhere in the image",
  "softbank-openai-margin-loan":
    "A towering glass corporate skyscraper at dusk seen from below, its facade reflecting a cool darkening sky, a scattering of faint gold light in its windows, sleek and imposing, themes of vast sums staked on an uncertain future. Absolutely no text, letters, words, numbers, logos, brand names or writing anywhere in the image",
  "rembrandt-hidden-turban-restoration":
    "A conservator's darkened studio, a dim old-master oil painting on an easel lit by a single raking beam of warm light that grazes its cracked varnished surface, a fine brush and cotton swab resting on a cloth in the foreground, hushed and reverent, themes of a hidden image brought back to light. The painting on the easel is an indistinct dark abstract surface with no discernible figures. Absolutely no text, letters, words, numbers, signatures, logos or writing anywhere in the image",
  "swift-kelce-madison-square-garden-wedding":
    "A grand illuminated arena facade at night in a great city, glowing warm light spilling from tall arched entrances onto an empty plaza, a red carpet leading to the doors, festive and expectant, themes of a celebrated public wedding as spectacle. Absolutely no text, letters, words, numbers, marquees, signs, logos or writing anywhere in the image",
  "nrc-radiation-rule-overhaul":
    "The vast concrete cooling towers of a nuclear power plant at dawn releasing soft plumes of white steam into a pale sky, calm green fields in the foreground, monumental and still, themes of atomic power and the unseen hazard it carries. Absolutely no text, letters, words, numbers, signs, logos or writing anywhere in the image",
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
