import type { MetadataRoute } from 'next';
import { getAllLocales } from '@/lib/i18n';
import { getAllCountries } from '@/lib/countries';
import { REGISTRY } from '@/lib/registry';

export const revalidate = 86400;

function buildUrls(origin: string, basePath: string) {
  const langs = getAllLocales();
  const countries = getAllCountries();
  const paths = ['', ...REGISTRY.map(r => r.path(':lang').replace('/:lang','').replace(/^\//,'')), 'privacy', 'terms', 'contact'];
  const urls: string[] = [];
  for (const lang of langs) {
    for (const country of countries) {
      const hubPath = `${basePath}/${lang}/${country}`;
      urls.push(`${origin}${hubPath}`);
      for (const p of ['loan','mortgage','tax','vat']) {
        urls.push(`${origin}${hubPath}/${p}`);
      }
    }
    for (const p of paths) {
      const path = p ? `${basePath}/${lang}/${p}` : `${basePath}/${lang}`;
      urls.push(`${origin}${path}`);
    }
  }
  return urls;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const urls = buildUrls(origin, basePath);
  const lastmod = new Date().toISOString();
  return urls.map((u) => ({ url: u, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.7 }));
}
