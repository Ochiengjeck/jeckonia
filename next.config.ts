import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Temporary placeholder images seeded for portfolio/blog items until
      // real screenshots are uploaded through the admin panel.
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
