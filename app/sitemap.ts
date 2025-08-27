import type { MetadataRoute } from 'next';
import { getAllLocales } from '@/lib/i18n';
import { getAllCountries } from '@/lib/countries';

export const revalidate = 86400;

function buildUrls(origin: string, basePath: string) {
  const langs = getAllLocales();
  const countries = getAllCountries();
  const paths = ['', 'loan', 'mortgage', 'tax', 'insurance', 'vat', 'paycheck', 'currency', 'compound', 'savings-goal', 'credit-card', 'car-loan', 'property-tax', 'inflation', 'roi', 'stock-return', 'dividend', 'tip', 'discount', 'sales-tax', 'crypto-profit', 'bitcoin-mining', 'eth-gas', 'nft-profit', 'sip', 'mutual-fund', 'hourly-wage', 'overtime', 'freelancer-rate', 'business-loan', 'refinance', 'privacy', 'terms', 'contact'];
  const urls: string[] = [];
  for (const lang of langs) {
    for (const country of countries) {
      // country-specific hubs
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
