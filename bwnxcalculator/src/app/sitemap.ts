import type { MetadataRoute } from 'next';

const locales = ['en','es','pt','de','fr','ja','ko','zh','th','ar','hi','id','ru','it','nl','vi','fa'] as const;
const categories = ['finance','health','education','engineering','lifestyle'];
const slugs: Record<string, string[]> = {
  finance: ['loan-calculator', 'mortgage-calculator', 'compound-interest', 'roi-calculator'],
  health: ['bmi-calculator', 'bmr-calculator', 'calorie-calculator', 'sleep-calculator']
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bwnxcalculator.vercel.app';
  const urls: MetadataRoute.Sitemap = [];
  for (const loc of locales) {
    urls.push({ url: `${base}/${loc}`, priority: 0.9 });
    for (const cat of categories) {
      urls.push({ url: `${base}/${loc}/${cat}`, priority: 0.7 });
      const list = slugs[cat] || [];
      for (const s of list) {
        urls.push({ url: `${base}/${loc}/${cat}/${s}`, priority: 0.6 });
      }
    }
    urls.push({ url: `${base}/${loc}/about` });
    urls.push({ url: `${base}/${loc}/privacy` });
    urls.push({ url: `${base}/${loc}/terms` });
    urls.push({ url: `${base}/${loc}/contact` });
  }
  return urls;
}

