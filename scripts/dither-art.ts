// Fetch remote images (Wikimedia/open archives) as dithered PNGs at public/covers/<name>.png.
// argv[2] = JSON map { "<name>": "<url>" }, e.g. "<slug>--a1"; throttled/retried, skips existing.
// Names follow the positional convention in publish-weekly.md: analogy n (1-based) is <slug>--a<n>.

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

  for (const [name, url] of Object.entries(map)) {
    const out = join(OUT_DIR, `${name}.png`);
    if (await exists(out)) { console.log(`skip ${name} (exists)`); continue; }
    try {
      const input = await fetchWithRetry(url);
      const png = await bufferToDitheredPng(input);
      await writeFile(out, png);
      console.log(`${name}.png  ${(input.length / 1024).toFixed(0)}KB -> ${(png.length / 1024).toFixed(0)}KB`);
    } catch (err) {
      failed.push(name);
      console.warn(`FAIL ${name}: ${(err as Error).message}`);
    }
    await sleep(1800); // be polite to Wikimedia
  }

  if (failed.length) {
    console.error(`\n${failed.length} failed (re-run to retry): ${failed.join(", ")}`);
    process.exit(1);
  }
  console.log("\nall images dithered.");
}

main().catch((err) => { console.error(err); process.exit(1); });
