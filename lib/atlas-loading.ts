// Loading policy for the atlas map: how TileJSON becomes a raster source, how
// failures back off, and which era deserves background warming. Pure logic,
// extracted from AtlasMap.tsx so it can be unit-tested without a browser or
// MapLibre (see tests/atlas-loading.test.ts).

import type { RasterSourceSpecification } from "maplibre-gl";
import type { AtlasEra } from "./atlas";

// TileJSON documents are a few hundred bytes; if one hasn't arrived in ten
// seconds the tile server is down for practical purposes and the retry
// machinery should take over rather than leave the overlay silently blank.
export const TILEJSON_TIMEOUT_MS = 10_000;

// The base style is ~100KB of JSON; `load` never fires if it fails, so this
// deadline is the only thing standing between a dead style host and an
// indefinitely blank atlas.
export const BASE_STYLE_TIMEOUT_MS = 20_000;

// One crossfade duration shared by the paint transition and the
// hide-after-fade timer, so layers never blink out mid-fade.
export const CROSSFADE_MS = 400;

// A load attempt chain is bounded: the initial try plus two retries. Each
// fresh user selection of the era starts a new chain.
export const MAX_LOAD_ATTEMPTS = 3;

// A lone tile 404 (a hole at the edge of the pyramid) leaves the map useful;
// a streak of failures means the source is broken and worth rebuilding.
export const TILE_ERROR_THRESHOLD = 3;

// Exponential backoff between attempts of one chain: 2s, 4s, 8s… capped so a
// long-lived tab never waits minutes to notice the server came back.
export function retryDelayMs(attempt: number): number {
  return Math.min(2_000 * 2 ** (attempt - 1), 30_000);
}

// Which era deserves background tile warming: the one the user is most likely
// to scrub to next. From "Today" that's the newest era; from an era it's the
// next-older one (the usual gesture is scrubbing back), falling back to the
// next-newer at the oldest stop. Exactly one era — warming everything would
// keep five rasters requesting viewport tiles on every pan.
export function warmNeighbor(
  eras: readonly AtlasEra[],
  activeEraId: string | null,
): AtlasEra | null {
  if (eras.length === 0) return null;
  const newest = eras[eras.length - 1];
  if (activeEraId === null) return newest;
  const index = eras.findIndex((era) => era.id === activeEraId);
  if (index === -1) return newest;
  return eras[index - 1] ?? eras[index + 1] ?? null;
}

export interface ResolveRasterSourceOptions {
  signal?: AbortSignal;
  timeoutMs?: number;
  // Injectable for tests; wrapped so the browser gets its own receiver.
  fetchFn?: typeof fetch;
}

// Resolve a TileJSON URL into an inline raster source. The tile server offers
// each map as .png and .webp and its TileJSON lists both, which MapLibre
// would rotate through per tile; WebP halves the bytes (the difference
// between usable and painful on a slow connection), so keep only the WebP
// templates when present. Any failure — timeout, HTTP error, malformed or
// empty payload — throws so the caller's retry machinery owns recovery;
// handing MapLibre the same URL to fetch again would just fail the same way
// without a deadline.
export async function resolveRasterSource(
  tileJsonUrl: string,
  options: ResolveRasterSourceOptions = {},
): Promise<RasterSourceSpecification> {
  const {
    signal,
    timeoutMs = TILEJSON_TIMEOUT_MS,
    fetchFn = (input, init) => fetch(input, init),
  } = options;
  const deadline = AbortSignal.timeout(timeoutMs);
  const response = await fetchFn(tileJsonUrl, {
    signal: signal ? AbortSignal.any([signal, deadline]) : deadline,
  });
  if (!response.ok) {
    throw new Error(`TileJSON request for ${tileJsonUrl} returned ${response.status}`);
  }
  const tileJson = (await response.json()) as {
    tiles?: unknown;
    bounds?: unknown;
    minzoom?: unknown;
    maxzoom?: unknown;
    attribution?: unknown;
  };
  const templates = Array.isArray(tileJson.tiles)
    ? tileJson.tiles.filter((entry): entry is string => typeof entry === "string")
    : [];
  if (templates.length === 0) {
    throw new Error(`TileJSON for ${tileJsonUrl} lists no tile templates`);
  }
  const webpTemplates = templates.filter((template) =>
    /\.webp(\?|$)/.test(template),
  );
  const bounds =
    Array.isArray(tileJson.bounds) &&
    tileJson.bounds.length === 4 &&
    tileJson.bounds.every((edge) => typeof edge === "number")
      ? (tileJson.bounds as [number, number, number, number])
      : undefined;
  return {
    type: "raster",
    tiles: webpTemplates.length > 0 ? webpTemplates : templates,
    tileSize: 256,
    ...(bounds ? { bounds } : {}),
    minzoom: typeof tileJson.minzoom === "number" ? tileJson.minzoom : 0,
    maxzoom: typeof tileJson.maxzoom === "number" ? tileJson.maxzoom : 14,
    attribution:
      typeof tileJson.attribution === "string" ? tileJson.attribution : "",
  };
}
