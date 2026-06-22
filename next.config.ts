import type { NextConfig } from "next";

// Covers are dithered to local PNGs (see scripts/dither-covers.ts) and served
// unoptimized, so no remote image hosts need allow-listing.
const nextConfig: NextConfig = {};

export default nextConfig;
