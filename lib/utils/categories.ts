import { calculatorCategories as dataCategories } from '@/data/calculators-complete';
import { calculatorCategories as registryCategories } from '@/lib/calculators/registry';

// Merge categories from both sources to get complete data
export const mergedCategories = {
  ...registryCategories,
  ...Object.entries(dataCategories).reduce((acc, [key, value]) => {
    acc[key] = {
      ...registryCategories[key],
      ...value,
      name: value.name, // Use localized names from data
      color: registryCategories[key]?.color || '#000000',
      description: registryCategories[key]?.description || ''
    };
    return acc;
  }, {} as Record<string, any>)
};

// Helper to get category display name
export function getCategoryDisplayName(category: any, locale: string): string {
  if (!category) return '';
  
  if (typeof category.name === 'string') {
    return category.name;
  } else if (category.name && typeof category.name === 'object') {
    return category.name[locale] || category.name.en || Object.values(category.name)[0] || '';
  }
  
  return '';
}