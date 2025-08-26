/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  experimental: {
    typedRoutes: true
  },
  trailingSlash: false
};

export default nextConfig;
