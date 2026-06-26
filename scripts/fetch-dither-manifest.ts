// Fetch a list of remote images (Wikimedia etc.) with throttling + backoff and
// dither each to public/covers/<out>.png. Skips outputs that already exist.
// Usage: node --import tsx scripts/fetch-dither-manifest.ts <manifest.json>
// manifest: [{ "url": "...", "out": "slug-or-slug--art" }]
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import { join } from "node:path";
import { bufferToDitheredPng } from "./dither";

const UA = "HypereraBot/1.0 (https://enai.io; curran@enai.io)";
const OUT_DIR = join(process.cwd(), "public", "covers");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function exists(p: string) { try { await access(p); return true; } catch { return false; } }

async function fetchBuf(url: string): Promise<Buffer> {
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA, "Accept": "image/*" } });
    if (res.ok) {
      const ct = res.headers.get("content-type") || "";
      if (!ct.startsWith("image/")) throw new Error(`not an image: ${ct}`);
      return Buffer.from(await res.arrayBuffer());
    }
    if (res.status === 429 || res.status >= 500) { await sleep(1500 * 2 ** i); continue; }
    throw new Error(`HTTP ${res.status}`);
  }
  throw new Error("retries exhausted");
}

async function main() {
  const manifest = JSON.parse(await readFile(process.argv[2], "utf8")) as {url:string;out:string}[];
  await mkdir(OUT_DIR, { recursive: true });
  const failed: {out:string;err:string}[] = [];
  for (const { url, out } of manifest) {
    const dest = join(OUT_DIR, `${out}.png`);
    if (await exists(dest)) { console.log(`skip ${out} (exists)`); continue; }
    try {
      const buf = await fetchBuf(url);
      const png = await bufferToDitheredPng(buf);
      await writeFile(dest, png);
      console.log(`OK   ${out}.png  ${(png.length/1024).toFixed(0)}KB`);
    } catch (e) {
      const err = (e as Error).message;
      console.warn(`FAIL ${out}: ${err}  <- ${url}`);
      failed.push({ out, err });
    }
    await sleep(1600);
  }
  if (failed.length) {
    console.error(`\n${failed.length} FAILED:`);
    failed.forEach(f => console.error(`  ${f.out}: ${f.err}`));
    process.exit(2);
  }
  console.log("\nall images fetched");
}
main().catch((e) => { console.error(e); process.exit(1); });
