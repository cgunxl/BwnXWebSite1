import type { MetadataRoute } from 'next';
import { getAllLocales } from '@/lib/i18n';

export const revalidate = 86400;

function buildUrls(origin: string) {
  const langs = getAllLocales();
  const paths = ['', 'loan', 'mortgage', 'tax', 'insurance'];
  const urls: string[] = [];
  for (const lang of langs) {
    for (const p of paths) {
      const path = p ? `/${lang}/${p}` : `/${lang}`;
      urls.push(`${origin}${path}`);
    }
  }
  return urls;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const urls = buildUrls(origin);
  const lastmod = new Date().toISOString();
  return urls.map((u) => ({ url: u, lastModified: lastmod }));
}
