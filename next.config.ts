import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Google profile pictures (Auth.js / Google OAuth)
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // Unsplash images used in seed data
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Catch-all for any other https image sources
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
