"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box, Callout } from "@radix-ui/themes";
import { eraTileJsonUrls, type AtlasEra, type AtlasLocation } from "@/lib/atlas";
import {
  BASE_STYLE_TIMEOUT_MS,
  CROSSFADE_MS,
  MAX_LOAD_ATTEMPTS,
  TILE_ERROR_THRESHOLD,
  resolveRasterSource,
  retryDelayMs,
  warmNeighbor,
} from "@/lib/atlas-loading";

// The only file that touches maplibre-gl. The map is a controlled consumer:
// AtlasClient owns which era is active and how opaque the overlay is; this
// component turns that into raster layers and paint transitions.
//
// Each era moves through a small lifecycle — loading → ready | error — held
// in eraStatesRef. Failures (TileJSON timeouts, HTTP errors, streaks of tile
// errors) tear the era's sources back out of the style and retry with bounded
// backoff while the era is on screen, so a transient upstream blip never
// leaves an overlay permanently blank. Residency is bounded too: only the
// active era and one warm neighbor keep layout visibility "visible"; opacity
// 0 alone does not stop a raster layer from requesting viewport tiles on
// every pan, so everything else flips to "none" once its fade-out ends.
//
// Historic maps arrive as XYZ tiles from the Allmaps tile server (see
// lib/atlas.ts). If allmaps.xyz ever proves unreliable, the drop-in fallback
// is @allmaps/maplibre's WarpedMapLayer fed with annotationUrl(mapId) — it
// warps IIIF tiles client-side and needs maxPitch 0, which is already set.

interface AtlasMapProps {
  location: AtlasLocation;
  activeEra: AtlasEra | null; // null = the present-day base map alone
  overlayOpacity: number; // 0..1, applied to the active era
  // Fired when the active era exhausts its retry budget and stays blank.
  onEraError?: (era: AtlasEra) => void;
  // Fired when a previously reported era loads after all, so stale alerts
  // can clear themselves.
  onEraRecovered?: (era: AtlasEra) => void;
}

const BASE_STYLE = "https://tiles.openfreemap.org/styles/liberty";

const layerId = (era: AtlasEra, index: number) => `atlas-${era.id}/${index}`;
const eraLayerIds = (era: AtlasEra) =>
  eraTileJsonUrls(era).map((_, index) => layerId(era, index));

// Where an era is in its loading lifecycle, plus everything needed to cancel
// or retry it. One entry per era that has ever been asked to load this city.
interface EraLoadState {
  era: AtlasEra;
  status: "loading" | "ready" | "error";
  attempts: number; // failed attempts in the current chain
  tileErrors: number; // tile failures since the sources became ready
  controller: AbortController | null; // aborts in-flight TileJSON fetches
  retryTimer: ReturnType<typeof setTimeout> | null;
  reported: boolean; // an error reached the UI and hasn't recovered yet
}

export default function AtlasMap({
  location,
  activeEra,
  overlayOpacity,
  onEraError,
  onEraRecovered,
}: AtlasMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const eraStatesRef = useRef<Map<string, EraLoadState>>(new Map());
  // Pending visibility-"none" flips, keyed by era id, so a fading layer is
  // hidden only after its crossfade finishes.
  const hideTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  );
  const styleReadyRef = useRef(false);
  const [styleReady, setStyleReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [baseMapFailed, setBaseMapFailed] = useState(false);
  // Bumped by the "try again" button; the init effect rebuilds the map.
  const [initAttempt, setInitAttempt] = useState(0);

  const onEraErrorRef = useRef(onEraError);
  onEraErrorRef.current = onEraError;
  const onEraRecoveredRef = useRef(onEraRecovered);
  onEraRecoveredRef.current = onEraRecovered;

  // What the paint pass and event handlers need, readable outside React's
  // render cycle. Also keeps the init effect's dependency list honestly
  // limited to initAttempt.
  const paintStateRef = useRef({ location, activeEra, overlayOpacity });
  paintStateRef.current = { location, activeEra, overlayOpacity };

  // After a fade-out completes, flip the era's layers to visibility "none" so
  // they stop participating in tile loading. Re-checked at fire time: if the
  // era became active (or the warm neighbor) meanwhile, it stays visible.
  const scheduleHide = useCallback((era: AtlasEra) => {
    if (hideTimersRef.current.has(era.id)) return;
    const timer = setTimeout(() => {
      hideTimersRef.current.delete(era.id);
      const map = mapRef.current;
      if (!map) return;
      const { location: current, activeEra: active } = paintStateRef.current;
      if (era.id === active?.id) return;
      if (era.id === warmNeighbor(current.eras, active?.id ?? null)?.id) return;
      for (const id of eraLayerIds(era)) {
        if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", "none");
      }
    }, CROSSFADE_MS + 100);
    hideTimersRef.current.set(era.id, timer);
  }, []);

  // Reconcile every ready era with the UI state: the active era fades to the
  // overlay opacity, the warm neighbor stays renderable (visible at opacity
  // 0, so its tiles prefetch into the browser cache), and everything else is
  // hidden once its fade-out finishes. The 400ms raster-opacity transition
  // declared on the layers turns the opacity jumps into the crossfade.
  const syncEraPresentation = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    const {
      location: current,
      activeEra: era,
      overlayOpacity: opacity,
    } = paintStateRef.current;
    const warmId = warmNeighbor(current.eras, era?.id ?? null)?.id ?? null;
    for (const state of eraStatesRef.current.values()) {
      if (state.status !== "ready") continue;
      const isActive = state.era.id === era?.id;
      if (isActive || state.era.id === warmId) {
        const pending = hideTimersRef.current.get(state.era.id);
        if (pending !== undefined) {
          clearTimeout(pending);
          hideTimersRef.current.delete(state.era.id);
        }
        for (const id of eraLayerIds(state.era)) {
          if (!map.getLayer(id)) continue;
          map.setLayoutProperty(id, "visibility", "visible");
          map.setPaintProperty(id, "raster-opacity", isActive ? opacity : 0);
        }
      } else {
        for (const id of eraLayerIds(state.era)) {
          if (map.getLayer(id)) map.setPaintProperty(id, "raster-opacity", 0);
        }
        scheduleHide(state.era);
      }
    }
  }, [scheduleHide]);

  // Tear an era's layers and sources out of the style — after a failure, so a
  // retry rebuilds them from scratch, and on city changes, so the departed
  // city's maps release their tile caches and in-flight requests.
  const removeEraFromMap = useCallback((era: AtlasEra) => {
    const pending = hideTimersRef.current.get(era.id);
    if (pending !== undefined) {
      clearTimeout(pending);
      hideTimersRef.current.delete(era.id);
    }
    const map = mapRef.current;
    if (!map) return;
    for (const id of eraLayerIds(era)) {
      if (map.getLayer(id)) map.removeLayer(id);
      if (map.getSource(id)) map.removeSource(id);
    }
  }, []);

  // An era failed — TileJSON unreachable or invalid, or its tiles kept
  // erroring. Remove any partial layers, then either schedule a backed-off
  // retry (while the era is the one on screen) or report it. Warm-up
  // failures stay silent: selecting the era later starts a fresh chain.
  const mountEraRef = useRef<(era: AtlasEra) => Promise<void>>(async () => {});
  const failEra = useCallback(
    (era: AtlasEra) => {
      const state = eraStatesRef.current.get(era.id);
      if (!state || state.status === "error") return;
      state.controller?.abort();
      state.controller = null;
      state.status = "error";
      state.attempts += 1;
      state.tileErrors = 0;
      removeEraFromMap(era);
      if (paintStateRef.current.activeEra?.id !== era.id) return;
      if (state.attempts < MAX_LOAD_ATTEMPTS) {
        state.retryTimer = setTimeout(() => {
          state.retryTimer = null;
          if (paintStateRef.current.activeEra?.id === era.id) {
            void mountEraRef.current(era);
          }
        }, retryDelayMs(state.attempts));
      } else {
        state.reported = true;
        onEraErrorRef.current?.(era);
      }
    },
    [removeEraFromMap],
  );
  const failEraRef = useRef(failEra);
  failEraRef.current = failEra;

  // Load an era's sources and layers (at opacity 0). Deduplicates against
  // in-flight and completed loads; an errored era re-enters here for its
  // retry. The era only becomes ready — and eligible to fade in — once every
  // one of its TileJSONs has resolved.
  const mountEra = useCallback(
    async (era: AtlasEra) => {
      const map = mapRef.current;
      if (!map) return;
      const existing = eraStatesRef.current.get(era.id);
      if (existing && (existing.status !== "error" || existing.retryTimer !== null)) {
        return;
      }
      const controller = new AbortController();
      const state: EraLoadState = existing ?? {
        era,
        status: "loading",
        attempts: 0,
        tileErrors: 0,
        controller,
        retryTimer: null,
        reported: false,
      };
      state.status = "loading";
      state.controller = controller;
      state.tileErrors = 0;
      eraStatesRef.current.set(era.id, state);
      try {
        const specs = await Promise.all(
          eraTileJsonUrls(era).map((url) =>
            resolveRasterSource(url, { signal: controller.signal }),
          ),
        );
        if (mapRef.current !== map || controller.signal.aborted) return;
        specs.forEach((spec, index) => {
          const id = layerId(era, index);
          if (!map.getSource(id)) map.addSource(id, spec);
          if (!map.getLayer(id)) {
            map.addLayer({
              id,
              type: "raster",
              source: id,
              paint: {
                "raster-opacity": 0,
                "raster-opacity-transition": { duration: CROSSFADE_MS },
                "raster-fade-duration": 300,
              },
            });
          }
        });
        state.status = "ready";
        state.attempts = 0;
        state.controller = null;
        if (state.reported) {
          state.reported = false;
          onEraRecoveredRef.current?.(era);
        }
        syncEraPresentation();
      } catch {
        if (mapRef.current === map && !controller.signal.aborted) {
          failEra(era);
        }
      }
    },
    [failEra, syncEraPresentation],
  );
  mountEraRef.current = mountEra;

  // Background warm-up: once the visible map settles (`idle`), quietly mount
  // the single era the user is most likely to scrub to next. Its layers sit
  // visible at opacity 0, so its tiles land in the browser cache and the
  // crossfade is instant — but only one era does this at a time, so warming
  // never competes with the active view for bandwidth. Respects Data Saver;
  // never retries an era that already failed (selection does that).
  const warmUpNext = useCallback(() => {
    const saveData = (navigator as { connection?: { saveData?: boolean } })
      .connection?.saveData;
    if (saveData) return;
    const { location: current, activeEra: era } = paintStateRef.current;
    const next = warmNeighbor(current.eras, era?.id ?? null);
    if (next && !eraStatesRef.current.has(next.id)) void mountEra(next);
  }, [mountEra]);
  const warmUpRef = useRef(warmUpNext);
  warmUpRef.current = warmUpNext;

  useEffect(() => {
    const container = containerRef.current;
    const eraStates = eraStatesRef.current;
    const hideTimers = hideTimersRef.current;
    if (mapRef.current || !container) return;

    // MapLibre needs WebGL; probe before constructing so machines without it
    // get a quiet fallback instead of a crash.
    const probe = document.createElement("canvas");
    if (!probe.getContext("webgl2") && !probe.getContext("webgl")) {
      setWebglFailed(true);
      return;
    }

    // Read the location at construction time (not a frozen initial value):
    // a base-map retry may happen after the user already switched cities.
    const { location: initialLocation } = paintStateRef.current;
    let map: maplibregl.Map;
    try {
      map = new maplibregl.Map({
        container,
        style: BASE_STYLE,
        center: initialLocation.center,
        zoom: initialLocation.zoom,
        maxPitch: 0,
        pitchWithRotate: false,
        attributionControl: { compact: true },
      });
    } catch {
      setWebglFailed(true);
      return;
    }
    mapRef.current = map;
    setBaseMapFailed(false);

    // The style request has no built-in deadline, and if it fails `load`
    // never fires — without this the atlas would sit on a blank canvas
    // forever with no error surfaced anywhere.
    let baseFailed = false;
    const failBaseMap = () => {
      if (baseFailed || styleReadyRef.current) return;
      baseFailed = true;
      clearTimeout(styleDeadline);
      setBaseMapFailed(true);
    };
    const styleDeadline = setTimeout(failBaseMap, BASE_STYLE_TIMEOUT_MS);

    map.on("load", () => {
      clearTimeout(styleDeadline);
      styleReadyRef.current = true;
      setStyleReady(true);
    });

    map.on("error", (event) => {
      const sourceId = (event as { sourceId?: string }).sourceId;
      if (sourceId?.startsWith("atlas-")) {
        const eraId = sourceId.split("/")[0].slice("atlas-".length);
        const state = eraStates.get(eraId);
        if (!state || state.status !== "ready") return;
        state.tileErrors += 1;
        if (state.tileErrors >= TILE_ERROR_THRESHOLD) {
          failEraRef.current(state.era);
        }
        return;
      }
      // Errors without an atlas source id before the style is ready mean the
      // base style itself failed to arrive. Afterwards they're transient
      // base-tile hiccups MapLibre absorbs on its own.
      failBaseMap();
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
      styleReadyRef.current = false;
      clearTimeout(styleDeadline);
      for (const state of eraStates.values()) {
        state.controller?.abort();
        if (state.retryTimer !== null) clearTimeout(state.retryTimer);
      }
      eraStates.clear();
      for (const timer of hideTimers.values()) clearTimeout(timer);
      hideTimers.clear();
      setStyleReady(false);
      map.remove();
    };
  }, [initAttempt]);

  // City change: dispose the departed city's eras outright — abort their
  // fetches, cancel retries, drop their sources — then fly. (The initial
  // location is handled by the constructor; flyTo to the same spot is a
  // no-op-ish ease, so no guard.)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const keep = new Set(location.eras.map((era) => era.id));
    for (const [eraId, state] of eraStatesRef.current) {
      if (keep.has(eraId)) continue;
      state.controller?.abort();
      if (state.retryTimer !== null) clearTimeout(state.retryTimer);
      removeEraFromMap(state.era);
      eraStatesRef.current.delete(eraId);
    }
    map.flyTo({ center: location.center, zoom: location.zoom });
  }, [location.slug, location.center, location.zoom, location.eras, removeEraFromMap]);

  // Era activation: make sure the active era's layers exist. A fresh
  // selection of a failed era gets a fresh retry budget — kept separate from
  // the paint pass below so dragging the opacity slider can't spam retries.
  useEffect(() => {
    if (!mapRef.current || !styleReady || !activeEra) return;
    const state = eraStatesRef.current.get(activeEra.id);
    if (state?.status === "error" && state.retryTimer === null) {
      state.attempts = 0;
    }
    void mountEra(activeEra);
  }, [activeEra, styleReady, mountEra]);

  // Crossfade + residency on every era or opacity change.
  useEffect(() => {
    if (!mapRef.current || !styleReady) return;
    syncEraPresentation();
  }, [activeEra, overlayOpacity, styleReady, syncEraPresentation]);

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

  return (
    <>
      <div ref={containerRef} className="atlas-map" />
      {baseMapFailed && (
        <Box className="atlas-alert">
          <Callout.Root color="gray" size="1">
            <Callout.Text>
              The base map didn’t load — check the connection and{" "}
              <button
                type="button"
                className="atlas-alert__dismiss"
                onClick={() => setInitAttempt((attempt) => attempt + 1)}
              >
                try again
              </button>
              .
            </Callout.Text>
          </Callout.Root>
        </Box>
      )}
    </>
  );
}
