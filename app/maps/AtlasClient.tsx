"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import {
  Box,
  Callout,
  Flex,
  Link,
  SegmentedControl,
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

  const switchCity = (nextSlug: string) => {
    const next = locations.find((candidate) => candidate.slug === nextSlug);
    if (!next) return;
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
              <SegmentedControl.Root
                value={location.slug}
                onValueChange={switchCity}
                size="1"
              >
                {locations.map((candidate) => (
                  <SegmentedControl.Item
                    key={candidate.slug}
                    value={candidate.slug}
                  >
                    {candidate.name}
                  </SegmentedControl.Item>
                ))}
              </SegmentedControl.Root>

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
