import type { Metadata } from "next";
import { getAtlasLocations } from "@/lib/atlas";
import { AtlasClient } from "./AtlasClient";

export const metadata: Metadata = {
  title: "Atlas — Hyperera",
  description:
    "A time slider over the map: start in the present-day city and scrub back through georeferenced historic maps of San Francisco, New York, and London.",
};

// Server shell for the atlas: reads the curated locations and hands them to
// the client boundary. All interactivity (and MapLibre itself) lives there.
export default async function AtlasPage() {
  const locations = await getAtlasLocations();
  return <AtlasClient locations={locations} />;
}
