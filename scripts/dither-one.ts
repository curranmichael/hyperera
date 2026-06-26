// Dither a single local image file to public/covers/<out>.png
// Usage: node --import tsx scripts/dither-one.ts <inputPath> <outName>
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { bufferToDitheredPng } from "./dither";

async function main() {
  const [input, outName] = process.argv.slice(2);
  if (!input || !outName) throw new Error("usage: dither-one <input> <outName>");
  const OUT_DIR = join(process.cwd(), "public", "covers");
  await mkdir(OUT_DIR, { recursive: true });
  const buf = await readFile(input);
  const png = await bufferToDitheredPng(buf);
  const out = join(OUT_DIR, `${outName}.png`);
  await writeFile(out, png);
  console.log(`wrote ${out} (${(png.length/1024).toFixed(0)}KB)`);
}
main().catch((e) => { console.error("DITHER_FAIL", e.message); process.exit(1); });
