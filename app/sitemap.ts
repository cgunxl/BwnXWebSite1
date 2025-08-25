import type { NextRequest } from 'next/server';
import { SUPPORTED_LANGS } from '../lib/i18n';

export const revalidate = 86400;

export async function GET(_req: NextRequest) {
  const host = typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SITE_URL ? process.env.NEXT_PUBLIC_SITE_URL : 'https://example.com';
  const urls: string[] = [];
  for (const lang of SUPPORTED_LANGS) {
    urls.push(`${host}/${lang}`);
    urls.push(`${host}/${lang}/loan`);
    urls.push(`${host}/${lang}/mortgage`);
    urls.push(`${host}/${lang}/tax`);
    urls.push(`${host}/${lang}/insurance`);
  }
  const lastmod = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    urls.map(u => `<url><loc>${u}</loc><lastmod>${lastmod}</lastmod></url>`).join('') +
    `</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

import { LOCALES, COUNTRIES, type Locale, type Country } from '@/i18n/config';
import { canonical, lastModified } from '@/lib/seo';

export default function sitemap() {
  const urls: { url: string; lastModified: Date; changeFrequency: 'weekly'; priority: number }[] = [];
  for (const l of LOCALES) {
    for (const c of COUNTRIES) {
      urls.push({ url: canonical(l as Locale, c as Country), lastModified: lastModified(), changeFrequency: 'weekly', priority: 0.9 });
    }
  }
  return urls;
}
