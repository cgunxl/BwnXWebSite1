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
