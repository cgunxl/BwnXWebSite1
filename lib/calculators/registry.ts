// Calculator Registry - Central registration of all calculator implementations
import { Calculator } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';

// Import all calculator batches
import { financeCalculatorsBatch1 } from './implementations/finance-batch1';
import { healthCalculatorsBatch2 } from './implementations/health-batch2';
import { educationCalculatorsBatch3 } from './implementations/education-batch3';
import { megaBatchCalculators } from './implementations/mega-batch';

// Calculator factory type
type CalculatorFactory = (locale: Locale) => Calculator;

// Registry of all calculator factories
const calculatorRegistry: Map<string, CalculatorFactory> = new Map();

// Register Finance Calculators (Batch 1)
const financeCalculators = [
  'loan-calculator',
  'mortgage-calculator', 
  'tax-calculator',
  'compound-interest'
];

financeCalculators.forEach((id, index) => {
  if (financeCalculatorsBatch1[index]) {
    calculatorRegistry.set(id, financeCalculatorsBatch1[index]);
  }
});

// Register Health Calculators (Batch 2)
const healthCalculators = [
  'bmi-calculator',
  'calorie-calculator',
  'body-fat-calculator',
  'pregnancy-calculator',
  'water-intake-calculator'
];

healthCalculators.forEach((id, index) => {
  if (healthCalculatorsBatch2[index]) {
    calculatorRegistry.set(id, healthCalculatorsBatch2[index]);
  }
});

// Register Education Calculators (Batch 3)
const educationCalculators = [
  'gpa-calculator',
  'percentage-calculator',
  'scientific-calculator',
  'statistics-calculator',
  'grade-needed-calculator'
];

educationCalculators.forEach((id, index) => {
  if (educationCalculatorsBatch3[index]) {
    calculatorRegistry.set(id, educationCalculatorsBatch3[index]);
  }
});

// Register Mega Batch Calculators
const megaBatchIds = [
  'ohms-law-calculator',
  'age-calculator',
  'length-converter',
  'break-even-calculator',
  'roi-calculator'
];

megaBatchIds.forEach((id, index) => {
  if (megaBatchCalculators[index]) {
    calculatorRegistry.set(id, megaBatchCalculators[index]);
  }
});

// Get calculator by ID and locale
export function getCalculator(id: string, locale: Locale): Calculator | null {
  const factory = calculatorRegistry.get(id);
  if (factory) {
    return factory(locale);
  }
  
  // Fallback to auto-generated calculator if not found
  console.log(`Calculator ${id} not found in registry, falling back to auto-generation`);
  return null;
}

// Get all registered calculator IDs
export function getRegisteredCalculatorIds(): string[] {
  return Array.from(calculatorRegistry.keys());
}

// Check if calculator is registered
export function isCalculatorRegistered(id: string): boolean {
  return calculatorRegistry.has(id);
}

// Get calculator count by category
export function getCalculatorCountByCategory(): Record<string, number> {
  const counts: Record<string, number> = {
    finance: 0,
    health: 0,
    education: 0,
    math: 0,
    engineering: 0,
    lifestyle: 0,
    conversion: 0,
    business: 0,
    tech: 0,
    environment: 0,
    misc: 0
  };
  
  calculatorRegistry.forEach((factory, id) => {
    const calc = factory('en'); // Use default locale to get category
    if (calc && calc.category) {
      counts[calc.category] = (counts[calc.category] || 0) + 1;
    }
  });
  
  return counts;
}

// Get implementation status
export function getImplementationStatus() {
  const totalCalculators = 430; // Target number
  const implemented = calculatorRegistry.size;
  const percentage = (implemented / totalCalculators) * 100;
  
  return {
    implemented,
    total: totalCalculators,
    percentage: percentage.toFixed(1),
    remaining: totalCalculators - implemented,
    byCategory: getCalculatorCountByCategory()
  };
}

// Export additional functions for components
export function getAllCalculators(): string[] {
  return Array.from(calculatorRegistry.keys());
}

export function getCalculatorBySlug(slug: string): any {
  // Return a basic calculator definition
  return {
    id: slug,
    slug: slug,
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: 'finance'
  };
}

export function getCalculatorsByCategory(category: string): string[] {
  const calculators: string[] = [];
  calculatorRegistry.forEach((factory, id) => {
    const calc = factory('en');
    if (calc && calc.category === category) {
      calculators.push(id);
    }
  });
  return calculators;
}

// Export calculator categories
export const calculatorCategories: Record<string, any> = {
  finance: {
    name: 'Finance',
    description: 'Financial calculators for loans, investments, and taxes',
    icon: '💰',
    color: '#10B981'
  },
  health: {
    name: 'Health & Fitness',
    description: 'Health, nutrition, and fitness calculators',
    icon: '❤️',
    color: '#EF4444'
  },
  education: {
    name: 'Education',
    description: 'Academic and educational calculators',
    icon: '🎓',
    color: '#3B82F6'
  },
  math: {
    name: 'Mathematics',
    description: 'Mathematical and scientific calculators',
    icon: '📐',
    color: '#8B5CF6'
  },
  engineering: {
    name: 'Engineering',
    description: 'Engineering and technical calculators',
    icon: '⚙️',
    color: '#F59E0B'
  },
  lifestyle: {
    name: 'Lifestyle',
    description: 'Daily life and personal calculators',
    icon: '🏠',
    color: '#EC4899'
  },
  insurance: {
    name: 'Insurance',
    description: 'Insurance calculators and estimators',
    icon: '🛡️',
    color: '#06B6D4'
  },
  conversion: {
    name: 'Conversion',
    description: 'Unit and measurement converters',
    icon: '🔄',
    color: '#84CC16'
  },
  business: {
    name: 'Business',
    description: 'Business and commerce calculators',
    icon: '💼',
    color: '#F97316'
  },
  tech: {
    name: 'Technology',
    description: 'Technology and IT calculators',
    icon: '💻',
    color: '#6366F1'
  },
  environment: {
    name: 'Environment',
    description: 'Environmental and sustainability calculators',
    icon: '🌍',
    color: '#059669'
  },
  miscellaneous: {
    name: 'Miscellaneous',
    description: 'Other useful calculators',
    icon: '🎯',
    color: '#78716C'
  }
};

// Export registry for debugging
export { calculatorRegistry };