import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Temporary placeholder images seeded for portfolio/blog items until
      // real screenshots are uploaded through the admin panel.
      { protocol: "https", hostname: "picsum.photos" },
      // Admin-uploaded images (profile/about/portfolio/testimonial/blog
      // cover photos), stored in Cloudinary instead of the local
      // filesystem -- see app/api/admin/upload/route.ts.
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  experimental: {
    // Shared hosting (CloudLinux LVE on Spaceship/cPanel) caps the number of
    // OS processes an account can spawn. Next's build otherwise forks a
    // worker per CPU for static generation, which trips that cap with
    // "spawn ... EAGAIN". Capping at 1 worker avoids the extra fork()s at
    // the cost of a slower (serialized) build.
    cpus: 1,
  },
};

export default nextConfig;
