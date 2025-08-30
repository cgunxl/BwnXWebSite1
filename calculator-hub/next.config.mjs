/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Disable turbopack for production
  experimental: {
    turbo: false,
  },
  // TypeScript configuration
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  // Module resolution
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': process.cwd(),
    };
    return config;
  },
};

export default nextConfig;