/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: false,
  i18n: {
    locales: [
      'en','es','pt','de','fr','ja','ko','zh','th','ar','hi','id','ru','it','nl','vi','fa'
    ],
    defaultLocale: 'en'
  },
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;
