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
  "collector-ordered-to-return-nazi-looted-modigliani":
    "An early-20th-century modernist portrait painting in an ornate gilded frame on an easel in a quiet museum gallery, soft daylight, themes of art history and rightful return",
  "australia-sells-canada-radar-in-record-deal":
    "Massive white parabolic radar dishes on a windswept coastal ridge at dusk scanning a vast open sky, themes of vigilance and watchful cooperation",
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
