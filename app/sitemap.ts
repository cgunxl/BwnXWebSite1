import { MetadataRoute } from 'next';
import { i18n } from '@/lib/i18n/config';
import { getAllCalculators, calculatorCategories } from '@/lib/calculators/registry';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bwn-x-web-site1.vercel.app';
  const calculatorIds = getAllCalculators();
  const categories = Object.keys(calculatorCategories);
  
  const routes: MetadataRoute.Sitemap = [];

  // Add home pages for all locales
  i18n.locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });
  });

  // Add category pages for all locales
  i18n.locales.forEach(locale => {
    categories.forEach(category => {
      routes.push({
        url: `${baseUrl}/${locale}/category/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // Add calculator pages for all locales
  i18n.locales.forEach(locale => {
    calculatorIds.forEach(calculatorId => {
      routes.push({
        url: `${baseUrl}/${locale}/calculator/${calculatorId}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });
  });

  // Add utility pages
  const utilityPages = ['faq', 'how-to-use', 'privacy', 'terms', 'cookies'];
  i18n.locales.forEach(locale => {
    utilityPages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    });
  });

  return routes;
}