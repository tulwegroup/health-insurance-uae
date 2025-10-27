import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // For deployment compatibility - allow server features
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Environment variables for client-side
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  // Allow cross-origin requests for preview
  allowedDevOrigins: ['preview-chat-f0e3a076-e0e6-4a7c-991c-330e12256f20.space.z.ai'],
};

export default nextConfig;
