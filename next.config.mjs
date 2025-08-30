/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // TypeScript configuration
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  // Configure for static export for GitHub Pages
  output: process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'github' ? 'export' : undefined,
  basePath: process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'github' ? '/BwnXWebSite1' : '',
  assetPrefix: process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'github' ? '/BwnXWebSite1' : '',
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