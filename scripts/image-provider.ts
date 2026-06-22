// Cover generation via Vercel AI Gateway. The model is a swappable
// "provider/model" string; flux-2-klein-9b is cheap, fast, and what Hermes
// Agent defaults to. Needs AI_GATEWAY_API_KEY in the environment.

import { experimental_generateImage as generateImage } from "ai";

const MODEL = "bfl/flux-2-klein-9b";

export async function generateCover(prompt: string): Promise<Uint8Array> {
  // Cap each call so a hung gateway request fails fast; the script retries.
  const { image } = await generateImage({
    model: MODEL,
    prompt,
    aspectRatio: "16:9",
    maxRetries: 0,
    abortSignal: AbortSignal.timeout(90_000),
  });
  return image.uint8Array;
}
