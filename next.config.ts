import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hosts allowed for next/image optimization. picsum.photos serves the
    // placeholder covers; add real publisher / CDN hosts as stories go live.
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
