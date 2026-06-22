import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hosts allowed for next/image optimization. picsum.photos serves the
    // placeholder covers; the rest are publisher / CDN hosts for live story art.
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "ichef.bbci.co.uk" },
      { protocol: "https", hostname: "static.dezeen.com" },
      { protocol: "https", hostname: "kottke.org" },
    ],
  },
};

export default nextConfig;
