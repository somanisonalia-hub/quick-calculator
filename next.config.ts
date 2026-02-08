import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Static export for deployment (generates 'out' directory)
  trailingSlash: true,
  
  // Image optimization
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Performance optimizations
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Compression and optimization
  compress: true,
  
  // External packages
  serverExternalPackages: [],
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-i18next', 'i18next'],
    optimizeCss: true,
  },
  
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
