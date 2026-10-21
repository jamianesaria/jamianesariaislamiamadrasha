import type { NextConfig } from "next";

const IMMUTABLE_PUBLIC_ASSETS = [
  "/intro-desktop-v2.mp4",
  "/intro-mobile-v2.mp4",
  "/intro-mobile-v3.mp4",
  "/intro-mobile-poster-v3.jpg",
  "/intro-mobile-poster-v2.jpg",
  "/intro-poster.jpg",
  "/hero-courtyard-v2.mp4",
  "/drone_shot_of_madrasha.mp4",
  "/jamia-logo-v2.png",
  "/icon.png",
  "/favicon.ico",
  "/header.jpeg",
  "/prodhan_banner.jpeg",
  "/drone_poster.jpg",
  "/hifz_bibhag.jpeg",
  "/hifz_revision_bibhag.jpeg",
  "/kitab_bibhag.jpeg",
  "/avatar-scholar.svg",
  "/avatar-member.svg",
];

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
    optimizePackageImports: ["lucide-react", "@sanity/icons", "@sanity/ui"],
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  async headers() {
    return IMMUTABLE_PUBLIC_ASSETS.map((source) => ({
      source,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
