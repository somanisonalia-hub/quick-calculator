import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Disabled for development - allows dynamic routes
  trailingSlash: true,
  images: {
    unoptimized: false, // Enable image optimization for production
    formats: ['image/webp', 'image/avif'],
  },
  serverExternalPackages: [],
};

export default nextConfig;
