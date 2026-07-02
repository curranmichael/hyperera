"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Callout } from "@radix-ui/themes";
import { tileJsonUrl, type AtlasEra, type AtlasLocation } from "@/lib/atlas";

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

export default function AtlasMap({
  location,
  activeEra,
  overlayOpacity,
  onTileError,
}: AtlasMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  // Eras whose sources/layers have been added (lazily, on first activation).
  const mountedErasRef = useRef<Map<string, AtlasEra>>(new Map());
  const erroredSourcesRef = useRef<Set<string>>(new Set());
  const [styleReady, setStyleReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  // Freeze the first location for the constructor; later changes fly, not
  // re-init. Refs also keep the init effect's dependency list honestly empty.
  const initialLocationRef = useRef(location);
  const onTileErrorRef = useRef(onTileError);
  onTileErrorRef.current = onTileError;

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
    map.on("idle", () => container.setAttribute("data-atlas-idle", "true"));
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

  // Era layers + crossfade. Layers mount lazily the first time their era is
  // activated and then stay around at opacity 0, so scrubbing back and forth
  // is instant. The 400ms raster-opacity transition does the actual fade.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !styleReady) return;

    if (activeEra && !mountedErasRef.current.has(activeEra.id)) {
      mountedErasRef.current.set(activeEra.id, activeEra);
      activeEra.mapIds.forEach((mapId, index) => {
        const id = `atlas-${activeEra.id}/${index}`;
        if (!map.getSource(id)) {
          map.addSource(id, {
            type: "raster",
            url: tileJsonUrl(mapId),
            tileSize: 256,
          });
        }
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
      });
    }

    for (const era of mountedErasRef.current.values()) {
      const opacity = era.id === activeEra?.id ? overlayOpacity : 0;
      era.mapIds.forEach((_, index) => {
        const id = `atlas-${era.id}/${index}`;
        if (map.getLayer(id)) {
          map.setPaintProperty(id, "raster-opacity", opacity);
        }
      });
    }
  }, [activeEra, overlayOpacity, styleReady]);

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
