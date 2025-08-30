import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Disable Turbopack for production build to avoid issues
  experimental: {
    turbo: undefined,
  },
};

export default nextConfig;