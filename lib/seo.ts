import type { Locale, Country } from '@/i18n/config';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function localeCountryPath(locale: Locale, country: Country, path: string) {
  return `/${locale}/${country}${path.startsWith('/') ? path : `/${path}`}`;
}

export function canonical(locale: Locale, country: Country, path = '/loan-calculator') {
  return new URL(localeCountryPath(locale, country, path), SITE).toString();
}

export function buildHreflang(locale: Locale, country: Country, path = '/loan-calculator') {
  const locales: Locale[] = ['en','es','pt','de','fr','ja','ko','zh','th','ar','hi','id','ru'];
  const countries: Country[] = ['us','mx','br','de','fr','jp','kr','cn','th','sa','in','id','ru'];
  const languages: Record<string, string> = {};
  for (const l of locales) {
    for (const c of countries) {
      const code = `${l}-${c}`;
      languages[code] = new URL(`/${l}/${c}${path}`, SITE).toString();
    }
  }
  languages['x-default'] = new URL('/en/us' + path, SITE).toString();
  return { languages } as const;
}

export function lastModified() {
  return new Date();
}
