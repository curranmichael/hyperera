import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  resolveRasterSource,
  retryDelayMs,
  warmNeighbor,
} from "../lib/atlas-loading";
import type { AtlasEra } from "../lib/atlas";

// The regressions these pin down: a hung or malformed TileJSON response used
// to leave an era's overlay silently blank for the rest of the session — the
// fetch had no deadline, no status check, and the fallback re-requested the
// same failing URL through MapLibre. Every failure mode must now throw so
// AtlasMap's retry machinery owns recovery.

const jsonFetch =
  (body: unknown, status = 200): typeof fetch =>
  async () =>
    new Response(JSON.stringify(body), { status });

// Resolves only by rejection, when the combined signal (caller's or the
// timeout's) aborts — the shape of a stalled upstream.
const hangingFetch: typeof fetch = (_input, init) =>
  new Promise((_resolve, reject) => {
    const signal = init?.signal;
    const fail = () => reject(signal?.reason ?? new Error("aborted"));
    if (signal?.aborted) return fail();
    signal?.addEventListener("abort", fail);
  });

describe("resolveRasterSource", () => {
  const url = "https://allmaps.xyz/maps/abc123/tiles.json";

  it("keeps only WebP templates when the TileJSON lists both formats", async () => {
    const spec = await resolveRasterSource(url, {
      fetchFn: jsonFetch({
        tiles: ["https://t/{z}/{x}/{y}.png", "https://t/{z}/{x}/{y}.webp"],
      }),
    });
    assert.deepEqual(
      "tiles" in spec ? spec.tiles : undefined,
      ["https://t/{z}/{x}/{y}.webp"],
    );
  });

  it("falls back to the full template list when no WebP is offered", async () => {
    const spec = await resolveRasterSource(url, {
      fetchFn: jsonFetch({ tiles: ["https://t/{z}/{x}/{y}.png"] }),
    });
    assert.deepEqual(
      "tiles" in spec ? spec.tiles : undefined,
      ["https://t/{z}/{x}/{y}.png"],
    );
  });

  it("carries bounds, zoom range, and attribution through; defaults the rest", async () => {
    const spec = await resolveRasterSource(url, {
      fetchFn: jsonFetch({
        tiles: ["https://t/{z}/{x}/{y}.webp"],
        bounds: [-123, 37, -122, 38],
        minzoom: 8,
        maxzoom: 16,
        attribution: "Somebody",
      }),
    });
    assert.deepEqual(spec.bounds, [-123, 37, -122, 38]);
    assert.equal(spec.minzoom, 8);
    assert.equal(spec.maxzoom, 16);
    assert.equal(spec.attribution, "Somebody");

    const defaulted = await resolveRasterSource(url, {
      fetchFn: jsonFetch({ tiles: ["https://t/{z}/{x}/{y}.webp"] }),
    });
    assert.equal(defaulted.bounds, undefined);
    assert.equal(defaulted.minzoom, 0);
    assert.equal(defaulted.maxzoom, 14);
    assert.equal(defaulted.attribution, "");
  });

  it("rejects on an HTTP error status instead of building a source", async () => {
    await assert.rejects(
      resolveRasterSource(url, { fetchFn: jsonFetch({ message: "boom" }, 500) }),
      /500/,
    );
  });

  it("rejects when the TileJSON lists no usable tile templates", async () => {
    await assert.rejects(
      resolveRasterSource(url, { fetchFn: jsonFetch({}) }),
      /no tile templates/,
    );
    await assert.rejects(
      resolveRasterSource(url, { fetchFn: jsonFetch({ tiles: [] }) }),
      /no tile templates/,
    );
    await assert.rejects(
      resolveRasterSource(url, { fetchFn: jsonFetch({ tiles: [42, null] }) }),
      /no tile templates/,
    );
  });

  it("rejects on a malformed (non-JSON) payload", async () => {
    const textFetch: typeof fetch = async () => new Response("<html>oops</html>");
    await assert.rejects(resolveRasterSource(url, { fetchFn: textFetch }));
  });

  it("aborts a hung request once the timeout elapses", async () => {
    await assert.rejects(
      resolveRasterSource(url, { fetchFn: hangingFetch, timeoutMs: 20 }),
    );
  });

  it("aborts immediately when the caller's signal is already aborted", async () => {
    const controller = new AbortController();
    controller.abort();
    await assert.rejects(
      resolveRasterSource(url, {
        fetchFn: hangingFetch,
        signal: controller.signal,
        timeoutMs: 60_000,
      }),
    );
  });
});

describe("retryDelayMs", () => {
  it("backs off exponentially from two seconds", () => {
    assert.equal(retryDelayMs(1), 2_000);
    assert.equal(retryDelayMs(2), 4_000);
    assert.equal(retryDelayMs(3), 8_000);
  });

  it("caps the delay so a long-lived tab still notices recovery", () => {
    assert.equal(retryDelayMs(10), 30_000);
  });
});

describe("warmNeighbor", () => {
  const era = (id: string, year: number): AtlasEra => ({
    id,
    year,
    label: String(year),
    title: id,
    mapIds: [id],
    attribution: "Test",
    license: "Public domain",
    sourceHref: "https://example.com",
  });
  const eras = [era("a-1850", 1850), era("b-1900", 1900), era("c-1950", 1950)];

  it("warms the newest era while the user is on Today", () => {
    assert.equal(warmNeighbor(eras, null)?.id, "c-1950");
  });

  it("warms the next-older era while an era is active (the scrub-back gesture)", () => {
    assert.equal(warmNeighbor(eras, "c-1950")?.id, "b-1900");
    assert.equal(warmNeighbor(eras, "b-1900")?.id, "a-1850");
  });

  it("warms the next-newer era at the oldest stop", () => {
    assert.equal(warmNeighbor(eras, "a-1850")?.id, "b-1900");
  });

  it("treats an unknown era id like Today rather than crashing", () => {
    assert.equal(warmNeighbor(eras, "missing")?.id, "c-1950");
  });

  it("returns null for a location with no eras", () => {
    assert.equal(warmNeighbor([], null), null);
  });
});
