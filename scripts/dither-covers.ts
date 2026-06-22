// Fetch each remote story cover and rewrite it as a small Bayer-ordered
// dithered greyscale PNG under public/covers/. Run: `npm run images:dither`.

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { bufferToDitheredPng } from "./dither";
import { getPublishedStories } from "../lib/stories";

const OUT_DIR = join(process.cwd(), "public", "covers");

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const stories = await getPublishedStories();
  const withArt = stories.filter((s) => s.image?.src.startsWith("http"));

  for (const story of withArt) {
    const src = story.image!.src;
    const res = await fetch(src);
    if (!res.ok) {
      console.warn(`skip ${story.slug}: HTTP ${res.status}  ${src}`);
      continue;
    }
    const input = Buffer.from(await res.arrayBuffer());
    const png = await bufferToDitheredPng(input);

    await writeFile(join(OUT_DIR, `${story.slug}.png`), png);
    const kb = (n: number) => (n / 1024).toFixed(0).padStart(4);
    console.log(`${story.slug}.png  ${kb(input.length)}KB -> ${kb(png.length)}KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
