// One-off: fetch remote artwork images (Wikimedia) for this edition's visual
// analogies and write them as dithered greyscale PNGs at public/covers/<slug>--art.png.
// Throttled + retried with a descriptive UA (Wikimedia 429s on rapid requests).
// Reads a mapping file passed as argv[2]: { "<slug>": "<remote url>", ... }
// Idempotent: skips a slug whose --art.png already exists.

import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { bufferToDitheredPng } from "./dither";

const OUT_DIR = join(process.cwd(), "public", "covers");
const UA = "HypereraBot/1.0 (https://enai.io; curran@enai.io)";

async function exists(p: string) {
  try { await access(p); return true; } catch { return false; }
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url: string, attempts = 5): Promise<Buffer> {
  let delay = 2000;
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      if (i >= attempts) throw err;
      console.warn(`  retry ${i}: ${(err as Error).message} (wait ${delay}ms)`);
      await sleep(delay);
      delay *= 2;
    }
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const mapPath = process.argv[2];
  const map: Record<string, string> = JSON.parse(await readFile(mapPath, "utf8"));
  const failed: string[] = [];

  for (const [slug, url] of Object.entries(map)) {
    const out = join(OUT_DIR, `${slug}--art.png`);
    if (await exists(out)) { console.log(`skip ${slug}--art (exists)`); continue; }
    try {
      const input = await fetchWithRetry(url);
      const png = await bufferToDitheredPng(input);
      await writeFile(out, png);
      console.log(`${slug}--art.png  ${(input.length / 1024).toFixed(0)}KB -> ${(png.length / 1024).toFixed(0)}KB`);
    } catch (err) {
      failed.push(slug);
      console.warn(`FAIL ${slug}: ${(err as Error).message}`);
    }
    await sleep(1800); // be polite to Wikimedia
  }

  if (failed.length) {
    console.error(`\n${failed.length} failed (re-run to retry): ${failed.join(", ")}`);
    process.exit(1);
  }
  console.log("\nall artwork dithered.");
}

main().catch((err) => { console.error(err); process.exit(1); });
