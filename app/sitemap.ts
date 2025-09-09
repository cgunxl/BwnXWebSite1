import { MetadataRoute } from 'next';
import { calculators, categories } from '@/data/calculators';

const locales = ['en', 'es', 'pt', 'de', 'fr', 'ja', 'ko', 'zh', 'th', 'ar', 'hi', 'id', 'ru', 'it', 'nl', 'vi', 'fa'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bwnxcalculator.com';
  const staticPages = ['about', 'privacy', 'terms', 'contact'];
  
  const sitemap: MetadataRoute.Sitemap = [];

  // Home pages for each locale
  locales.forEach(locale => {
    sitemap.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    });
  });

  // Category pages for each locale
  locales.forEach(locale => {
    categories.forEach(category => {
      sitemap.push({
        url: `${baseUrl}/${locale}/${category.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8
      });
    });
  });

  // Calculator pages for each locale
  locales.forEach(locale => {
    calculators.forEach(calculator => {
      sitemap.push({
        url: `${baseUrl}/${locale}/${calculator.category}/${calculator.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9
      });
    });
  });

  // Static pages for each locale
  locales.forEach(locale => {
    staticPages.forEach(page => {
      sitemap.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5
      });
    });
  });

  return sitemap;
}