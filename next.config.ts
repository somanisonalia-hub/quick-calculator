import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Static export for deployment (generates 'out' directory)
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
  },
  serverExternalPackages: [],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
