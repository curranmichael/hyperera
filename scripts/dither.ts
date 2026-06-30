// The shared cover treatment: drop to half saturation, resize, then Bayer-ordered
// dither each RGB channel to a small palette PNG. Used by the fetch + generation scripts.

import sharp from "sharp";

export const MAX_WIDTH = 1000;
export const LEVELS = 6; // 6 steps per channel

// 8x8 Bayer threshold matrix, normalised to (0,1).
export const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
].map((row) => row.map((v) => (v + 0.5) / 64));

// Ordered dithering of each RGB channel to LEVELS evenly-spaced values, emitting
// 3 channels. A 1-channel (greyscale) source reads the same byte for all three.
export function dither(data: Buffer, width: number, height: number, channels: number) {
  const out = Buffer.alloc(width * height * 3);
  const max = LEVELS - 1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const threshold = BAYER[y & 7][x & 7];
      const src = (y * width + x) * channels;
      const dst = (y * width + x) * 3;
      for (let c = 0; c < 3; c++) {
        const scaled = (data[src + Math.min(c, channels - 1)] / 255) * max;
        const lower = Math.floor(scaled);
        const level = Math.min(max, lower + (scaled - lower > threshold ? 1 : 0));
        out[dst + c] = Math.round((level / max) * 255);
      }
    }
  }
  return out;
}

// Any encoded image bytes (jpeg/png/webp) -> dithered, half-saturated palette PNG.
export async function bufferToDitheredPng(input: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(input)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .modulate({ saturation: 0.5 })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return sharp(dither(data, info.width, info.height, info.channels), {
    raw: { width: info.width, height: info.height, channels: 3 },
  })
    .png({ palette: true, compressionLevel: 9 })
    .toBuffer();
}
