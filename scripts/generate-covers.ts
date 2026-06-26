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
