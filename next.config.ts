import type { NextConfig } from "next";

// Covers are dithered to local PNGs under public/covers (see
// scripts/dither-covers.ts), and the publish validator only accepts
// /covers/*.png paths, so no remote image hosts are allow-listed. Local images
// go through the next/image optimizer (except tinted ones — see CoverImage),
// which needs no host configuration.
const nextConfig: NextConfig = {};

export default nextConfig;
