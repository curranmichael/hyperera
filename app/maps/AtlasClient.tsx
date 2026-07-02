"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import {
  Box,
  Callout,
  Flex,
  Link,
  Select,
  Text,
} from "@radix-ui/themes";
import type { AtlasEra, AtlasLocation } from "@/lib/atlas";
import { EraSlider } from "./EraSlider";

// The client boundary for the atlas. MapLibre can only run in the browser, so
// the map is dynamically imported with SSR off — legal here (a client file)
// where it wouldn't be in page.tsx. All UI state lives in this component; the
// map is a controlled consumer.

const AtlasMap = dynamic(() => import("./AtlasMap"), {
  ssr: false,
  loading: () => <div className="atlas-map" aria-hidden />,
});

interface AtlasClientProps {
  locations: AtlasLocation[];
}

// Guess the visitor's nearest city without a geolocation permission prompt:
// the browser's IANA timezone names their region. An exact timezone match
// maps straight to a city; otherwise the UTC offset approximates a longitude
// (15° per hour) and the nearest city center wins — same-continent accuracy,
// which is all "start near me" needs.
const TIMEZONE_CITIES: Record<string, string> = {
  "Europe/London": "london",
  "Europe/Berlin": "berlin",
  "Asia/Singapore": "singapore",
  "America/New_York": "new-york",
  "America/Los_Angeles": "san-francisco",
};

function nearestSlug(locations: AtlasLocation[]): string | null {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const exact = TIMEZONE_CITIES[timeZone];
    if (exact && locations.some((candidate) => candidate.slug === exact)) {
      return exact;
    }
    const approxLng = (-new Date().getTimezoneOffset() / 60) * 15;
    let best: string | null = null;
    let bestDistance = Infinity;
    for (const candidate of locations) {
      let distance = Math.abs(candidate.center[0] - approxLng);
      if (distance > 180) distance = 360 - distance;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = candidate.slug;
      }
    }
    return best;
  } catch {
    return null;
  }
}

export function AtlasClient({ locations }: AtlasClientProps) {
  const [slug, setSlug] = useState(locations[0].slug);
  const location =
    locations.find((candidate) => candidate.slug === slug) ?? locations[0];

  // Slider stops are the location's eras (ascending) plus a synthetic "Today"
  // at the end. Start in the present and let the slider pull you back.
  const [stopIndex, setStopIndex] = useState(location.eras.length);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [failedEra, setFailedEra] = useState<AtlasEra | null>(null);

  const stops = [...location.eras.map((era) => era.label), "Today"];
  const activeEra =
    stopIndex < location.eras.length ? location.eras[stopIndex] : null;

  // Retarget the default city to the visitor's nearest after hydration (the
  // timezone is only knowable client-side, and reading it during the first
  // render would mismatch the server HTML). A manual pick always wins.
  const userChoseRef = useRef(false);
  useEffect(() => {
    if (userChoseRef.current) return;
    const nearest = nearestSlug(locations);
    const next = locations.find((candidate) => candidate.slug === nearest);
    if (next && next.slug !== locations[0].slug) {
      setSlug(next.slug);
      setStopIndex(next.eras.length);
    }
    // Once, on arrival only — locations are static for the page's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchCity = (nextSlug: string) => {
    const next = locations.find((candidate) => candidate.slug === nextSlug);
    if (!next) return;
    userChoseRef.current = true;
    setSlug(nextSlug);
    setStopIndex(next.eras.length); // arrive in the present
    setFailedEra(null);
  };

  return (
    <Box className="atlas-shell">
      <AtlasMap
        location={location}
        activeEra={activeEra}
        overlayOpacity={overlayOpacity}
        onTileError={setFailedEra}
      />

      {failedEra && (
        <Box className="atlas-alert">
          <Callout.Root color="gray" size="1">
            <Callout.Text>
              “{failedEra.title}” isn’t reachable right now — the base map still
              works.{" "}
              <button
                type="button"
                className="atlas-alert__dismiss"
                onClick={() => setFailedEra(null)}
              >
                Dismiss
              </button>
            </Callout.Text>
          </Callout.Root>
        </Box>
      )}

      <div className="atlas-panel">
        <div className="atlas-panel__inner">
          <Flex direction="column" gap="3">
            <Flex align="center" justify="between" gap="3" wrap="wrap">
              {/* A Select rather than SegmentedControl: four cities already
                  overflow a phone-width segmented row, and the list will only
                  grow. (Radix has no searchable combobox; if this list ever
                  gets long, reach for cmdk.) */}
              <Select.Root value={location.slug} onValueChange={switchCity}>
                <Select.Trigger aria-label="City" />
                <Select.Content position="popper">
                  {locations.map((candidate) => (
                    <Select.Item key={candidate.slug} value={candidate.slug}>
                      {candidate.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              {activeEra && (
                <Flex align="center" gap="2" className="atlas-opacity">
                  <Text size="1" color="gray">
                    Overlay
                  </Text>
                  <Slider.Root
                    className="atlas-slider atlas-slider--compact"
                    min={0}
                    max={100}
                    step={1}
                    value={[Math.round(overlayOpacity * 100)]}
                    onValueChange={([next]) => setOverlayOpacity(next / 100)}
                    aria-label="Overlay opacity"
                  >
                    <Slider.Track className="atlas-slider__track">
                      <Slider.Range className="atlas-slider__range" />
                    </Slider.Track>
                    <Slider.Thumb className="atlas-slider__thumb" />
                  </Slider.Root>
                </Flex>
              )}
            </Flex>

            <EraSlider stops={stops} value={stopIndex} onChange={setStopIndex} />

            <Text size="1" color="gray" className="atlas-credit">
              {activeEra ? (
                <>
                  {activeEra.title} ({activeEra.year}) ·{" "}
                  <Link
                    href={activeEra.sourceHref}
                    target="_blank"
                    rel="noreferrer"
                    color="gray"
                    underline="always"
                  >
                    {activeEra.attribution}
                  </Link>{" "}
                  · {activeEra.license}
                </>
              ) : (
                <>The present day — scrub the slider to travel back.</>
              )}
            </Text>
          </Flex>
        </div>
      </div>
    </Box>
  );
}
