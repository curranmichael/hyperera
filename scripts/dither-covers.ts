// Fetch each remote story cover and rewrite it as a small Bayer-ordered
// dithered greyscale PNG under public/covers/. Run: `npm run images:dither`.

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { getPublishedStories } from "../lib/stories";

const OUT_DIR = join(process.cwd(), "public", "covers");
const MAX_WIDTH = 1000;
const LEVELS = 6; // black + 4 greys + white

// 8x8 Bayer threshold matrix, normalised to (0,1).
const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].map((row) => row.map((v) => (v + 0.5) / 64));

// Ordered dithering to LEVELS evenly-spaced grey values. Reads the first of
// `channels` bytes per pixel (greyscale makes them equal) and emits 1 channel.
function dither(data: Buffer, width: number, height: number, channels: number) {
  const out = Buffer.alloc(width * height);
  const max = LEVELS - 1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const scaled = (data[(y * width + x) * channels] / 255) * max;
      const lower = Math.floor(scaled);
      const level = Math.min(max, lower + (scaled - lower > BAYER[y & 7][x & 7] ? 1 : 0));
      out[y * width + x] = Math.round((level / max) * 255);
    }
  }
  return out;
}

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

    const { data, info } = await sharp(input)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .greyscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const png = await sharp(dither(data, info.width, info.height, info.channels), {
      raw: { width: info.width, height: info.height, channels: 1 },
    })
      .png({ palette: true, colors: LEVELS, compressionLevel: 9 })
      .toBuffer();

    await writeFile(join(OUT_DIR, `${story.slug}.png`), png);
    const kb = (n: number) => (n / 1024).toFixed(0).padStart(4);
    console.log(`${story.slug}.png  ${kb(input.length)}KB -> ${kb(png.length)}KB`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
