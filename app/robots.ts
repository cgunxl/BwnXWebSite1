import type { MetadataRoute } from 'next';

export const revalidate = 86400;

export default function robots(): MetadataRoute.Robots {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const sitemap = `${origin}${basePath}/sitemap.xml`;
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: origin.replace(/\/$/, ''),
    sitemap
  };
}