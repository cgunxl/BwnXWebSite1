// Calculator Registry - Central registration of all calculator implementations
import { Calculator } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';

// Import all calculator batches
import { financeCalculatorsBatch1 } from './implementations/finance-batch1';
import { healthCalculatorsBatch2 } from './implementations/health-batch2';
import { educationCalculatorsBatch3 } from './implementations/education-batch3';

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

// Export registry for debugging
export { calculatorRegistry };