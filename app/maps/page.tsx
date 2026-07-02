import type { Metadata } from "next";
import { getAtlasLocations } from "@/lib/atlas";
import { AtlasClient } from "./AtlasClient";

export const metadata: Metadata = {
  title: "Atlas — Hyperera",
  description:
    "A time slider over the map: start in the present-day city and scrub back through georeferenced historic maps of San Francisco, New York, London, Berlin, Munich, and Singapore.",
};

// Server shell for the atlas: reads the curated locations and hands them to
// the client boundary. All interactivity (and MapLibre itself) lives there.
// The preconnect hints ship in the initial HTML (React hoists them to <head>),
// so the TLS handshakes to both tile hosts happen while the map bundle is
// still downloading — a full round-trip saved on slow connections.
export default async function AtlasPage() {
  const locations = await getAtlasLocations();
  return (
    <>
      <link
        rel="preconnect"
        href="https://tiles.openfreemap.org"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://allmaps.xyz"
        crossOrigin="anonymous"
      />
      <AtlasClient locations={locations} />
    </>
  );
}
