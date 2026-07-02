"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import type { RasterSourceSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Callout } from "@radix-ui/themes";
import { eraTileJsonUrls, type AtlasEra, type AtlasLocation } from "@/lib/atlas";

// The only file that touches maplibre-gl. The map is a controlled consumer:
// AtlasClient owns which era is active and how opaque the overlay is; this
// component turns that into raster layers and paint transitions.
//
// Historic maps arrive as XYZ tiles from the Allmaps tile server (see
// lib/atlas.ts). If allmaps.xyz ever proves unreliable, the drop-in fallback
// is @allmaps/maplibre's WarpedMapLayer fed with annotationUrl(mapId) — it
// warps IIIF tiles client-side and needs maxPitch 0, which is already set.

interface AtlasMapProps {
  location: AtlasLocation;
  activeEra: AtlasEra | null; // null = the present-day base map alone
  overlayOpacity: number; // 0..1, applied to the active era
  onTileError?: (era: AtlasEra) => void;
}

const BASE_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const layerId = (era: AtlasEra, index: number) => `atlas-${era.id}/${index}`;

// The tile server offers each map as .png and .webp; its TileJSON lists both,
// which MapLibre would rotate through per tile. WebP halves the bytes (the
// difference between usable and painful on a slow connection), so resolve the
// TileJSON ourselves and keep only the WebP template. Falls back to letting
// MapLibre read the TileJSON directly if the fetch fails.
async function rasterSourceSpec(
  tileJsonUrl: string,
): Promise<RasterSourceSpecification> {
  try {
    const response = await fetch(tileJsonUrl);
    const tileJson = await response.json();
    const webpTiles = (tileJson.tiles ?? []).filter((template: string) =>
      /\.webp(\?|$)/.test(template),
    );
    if (webpTiles.length > 0) {
      return {
        type: "raster",
        tiles: webpTiles,
        tileSize: 256,
        bounds: tileJson.bounds,
        minzoom: tileJson.minzoom ?? 0,
        maxzoom: tileJson.maxzoom ?? 14,
        attribution: tileJson.attribution ?? "",
      };
    }
  } catch {
    // fall through to the TileJSON URL
  }
  return { type: "raster", url: tileJsonUrl, tileSize: 256 };
}

export default function AtlasMap({
  location,
  activeEra,
  overlayOpacity,
  onTileError,
}: AtlasMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  // Eras whose sources/layers have been (or are being) added.
  const mountedErasRef = useRef<Map<string, AtlasEra>>(new Map());
  const erroredSourcesRef = useRef<Set<string>>(new Set());
  const [styleReady, setStyleReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  // Freeze the first location for the constructor; later changes fly, not
  // re-init. Refs also keep the init effect's dependency list honestly empty.
  const initialLocationRef = useRef(location);
  const onTileErrorRef = useRef(onTileError);
  onTileErrorRef.current = onTileError;

  // What the paint pass needs, readable from map event handlers.
  const paintStateRef = useRef({ location, activeEra, overlayOpacity });
  paintStateRef.current = { location, activeEra, overlayOpacity };

  // Set every mounted era's opacity: the active era to the overlay value,
  // everything else to 0. The 400ms raster-opacity transition declared on the
  // layers turns these jumps into the crossfade.
  const applyOpacities = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const { activeEra: era, overlayOpacity: opacity } = paintStateRef.current;
    for (const mounted of mountedErasRef.current.values()) {
      const value = mounted.id === era?.id ? opacity : 0;
      eraTileJsonUrls(mounted).forEach((_, index) => {
        const id = layerId(mounted, index);
        if (map.getLayer(id)) map.setPaintProperty(id, "raster-opacity", value);
      });
    }
  }, []);

  // Add an era's sources and layers (at opacity 0) if not already present.
  // Async because the source spec resolves TileJSON for WebP tiles; re-applies
  // opacities afterwards so an era activated before its layers finished
  // mounting still fades in.
  const mountEra = useCallback(
    async (era: AtlasEra) => {
      const map = mapRef.current;
      if (!map || mountedErasRef.current.has(era.id)) return;
      mountedErasRef.current.set(era.id, era);
      await Promise.all(
        eraTileJsonUrls(era).map(async (url, index) => {
          const spec = await rasterSourceSpec(url);
          if (mapRef.current !== map) return; // unmounted mid-fetch
          const id = layerId(era, index);
          if (!map.getSource(id)) map.addSource(id, spec);
          if (!map.getLayer(id)) {
            map.addLayer({
              id,
              type: "raster",
              source: id,
              paint: {
                "raster-opacity": 0,
                "raster-opacity-transition": { duration: 400 },
                "raster-fade-duration": 300,
              },
            });
          }
        }),
      );
      applyOpacities();
    },
    [applyOpacities],
  );

  // Background warm-up: once the visible map settles (`idle`), quietly mount
  // the next era layer for this city, newest first — the usual gesture is
  // scrubbing back from Today. Layers sit at opacity 0 but still fetch their
  // tiles, so by the time the user reaches an era its tiles are already in
  // the browser cache and the crossfade is instant. `idle` only fires when
  // nothing else is loading, so this never competes with the active view for
  // bandwidth, and each idle round mounts one more era — natural pacing.
  // Respects Data Saver.
  const warmUpNext = useCallback(() => {
    const saveData = (navigator as { connection?: { saveData?: boolean } })
      .connection?.saveData;
    if (saveData) return;
    const { location: current } = paintStateRef.current;
    const next = [...current.eras]
      .reverse()
      .find((era) => !mountedErasRef.current.has(era.id));
    if (next) void mountEra(next);
  }, [mountEra]);
  const warmUpRef = useRef(warmUpNext);
  warmUpRef.current = warmUpNext;

  useEffect(() => {
    const container = containerRef.current;
    const mountedEras = mountedErasRef.current;
    if (mapRef.current || !container) return;

    // MapLibre needs WebGL; probe before constructing so machines without it
    // get a quiet fallback instead of a crash.
    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl2") && !probe.getContext("webgl")) {
      setWebglFailed(true);
      return;
    }

    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container,
        style: BASE_STYLE,
        center: initialLocationRef.current.center,
        zoom: initialLocationRef.current.zoom,
        maxPitch: 0,
        pitchWithRotate: false,
        attributionControl: { compact: true },
      });
    } catch {
      setWebglFailed(true);
      return;
    }
    mapRef.current = map;

    map.on("load", () => setStyleReady(true));

    // Surface a failing historic-map source once, without killing the map.
    map.on("error", (event) => {
      const sourceId = (event as { sourceId?: string }).sourceId;
      if (!sourceId?.startsWith("atlas-")) return;
      if (erroredSourcesRef.current.has(sourceId)) return;
      erroredSourcesRef.current.add(sourceId);
      const era = mountedEras.get(sourceId.split("/")[0].slice("atlas-".length));
      if (era) onTileErrorRef.current?.(era);
    });

    // `data-atlas-idle` lets tests wait for tiles to settle before screenshots.
    map.on("idle", () => {
      container.setAttribute("data-atlas-idle", "true");
      warmUpRef.current();
    });
    map.on("dataloading", () => container.removeAttribute("data-atlas-idle"));
    map.on("movestart", () => container.removeAttribute("data-atlas-idle"));

    return () => {
      mapRef.current = null;
      mountedEras.clear();
      setStyleReady(false);
      map.remove();
    };
  }, []);

  // Fly when the city changes (the initial location is handled by the
  // constructor; flyTo to the same spot is a no-op-ish ease, so no guard).
  useEffect(() => {
    mapRef.current?.flyTo({ center: location.center, zoom: location.zoom });
  }, [location.slug, location.center, location.zoom]);

  // Era activation: make sure the active era's layers exist, then crossfade.
  // Mounted layers stay around at opacity 0, so scrubbing back and forth is
  // instant.
  useEffect(() => {
    if (!mapRef.current || !styleReady) return;
    if (activeEra) void mountEra(activeEra);
    applyOpacities();
  }, [activeEra, overlayOpacity, styleReady, mountEra, applyOpacities]);

  if (webglFailed) {
    return (
      <div className="atlas-map atlas-map--fallback">
        <Callout.Root color="gray">
          <Callout.Text>
            The atlas needs WebGL to draw its maps, and this browser doesn’t
            offer it. Try a current browser with hardware acceleration enabled.
          </Callout.Text>
        </Callout.Root>
      </div>
    );
  }

  return <div ref={containerRef} className="atlas-map" />;
}
