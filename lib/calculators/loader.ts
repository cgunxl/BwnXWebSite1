// Dynamic calculator loader with registry support
import { Calculator } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';
import { getCalculator, isCalculatorRegistered, getImplementationStatus } from './registry';
import { generateCalculator } from './auto-generator';
// import { allCalculators } from './all-calculators';
import { createCalculator } from './factory';

// Legacy implementations (will be phased out)
import { loanCalculator } from './implementations/finance/loan-calculator';
import { mortgageCalculator } from './implementations/finance/mortgage-calculator';
import { carLoanCalculator } from './implementations/finance/car-loan-calculator';
import { creditCardInterestCalculator } from './implementations/finance/credit-card-interest';
import { compoundInterestCalculator } from './implementations/finance/compound-interest';
import { savingsGoalCalculator } from './implementations/finance/savings-goal';
import { retirementCalculator } from './implementations/finance/retirement-calculator';
import { bmiCalculator } from './implementations/health/bmi-calculator';
import { calorieCalculator } from './implementations/health/calorie-calculator';

// Map of legacy manually implemented calculators
const legacyImplementations: Record<string, Calculator> = {
  // These will be replaced by registry implementations
  'car-loan-calculator': carLoanCalculator,
  'credit-card-interest': creditCardInterestCalculator,
  'savings-goal': savingsGoalCalculator,
  'retirement-calculator': retirementCalculator,
};

// Cache for loaded calculators
const calculatorCache = new Map<string, Calculator>();

export async function loadCalculatorData(slug: string, locale: Locale = 'en'): Promise<Calculator | null> {
  const cacheKey = `${locale}-${slug}`;
  
  // Check cache first
  if (calculatorCache.has(cacheKey)) {
    return calculatorCache.get(cacheKey)!;
  }

  try {
    // 1. Check if calculator is in the new registry (has real implementation)
    if (isCalculatorRegistered(slug)) {
      const calculator = getCalculator(slug, locale);
      if (calculator) {
        calculatorCache.set(cacheKey, calculator);
        console.log(`✅ Loaded ${slug} from registry (real implementation)`);
        return calculator;
      }
    }

    // 2. Check legacy implementations
    if (legacyImplementations[slug]) {
      const calculator = legacyImplementations[slug];
      calculatorCache.set(cacheKey, calculator);
      console.log(`📦 Loaded ${slug} from legacy implementation`);
      return calculator;
    }

    // 3. Try factory creation
    const factoryCalculator = createCalculator(slug);
    if (factoryCalculator) {
      calculatorCache.set(cacheKey, factoryCalculator);
      console.log(`🏭 Created ${slug} from factory`);
      return factoryCalculator;
    }

    // 4. Use auto-generator with detected category
    const category = detectCategory(slug);
    const calculator = generateCalculator(slug, category, locale);
    if (calculator) {
      calculatorCache.set(cacheKey, calculator);
      console.log(`🤖 Generated ${slug} using auto-generator`);
      return calculator;
    }

    // 5. Fallback: generate a basic calculator structure
    console.warn(`⚠️ Calculator ${slug} not found, generating fallback`);
    return generateCalculatorFromSlug(slug, locale);

  } catch (error) {
    console.error(`❌ Error loading calculator ${slug}:`, error);
    return null;
  }
}

// Export status function for monitoring
export function getCalculatorStatus() {
  const status = getImplementationStatus();
  return {
    ...status,
    cacheSize: calculatorCache.size,
    cachedCalculators: Array.from(calculatorCache.keys())
  };
}

function generateCalculatorFromSlug(slug: string, locale: Locale): Calculator | null {
  // This is a fallback generator for calculators not yet implemented
  // It creates a basic structure that can be used for any calculator
  
  const name = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const calculator: Calculator = {
    id: slug,
    category: detectCategory(slug),
    slug: slug,
    icon: '🧮',
    color: '#3B82F6',
    inputs: generateDefaultInputs(slug),
    outputs: generateDefaultOutputs(slug),
    formulas: [
      {
        name: 'primary',
        expression: '({value1, value2}) => ({ result: value1 + value2 })',
        variables: ['value1', 'value2'],
        description: 'Basic calculation'
      }
    ],
    relatedCalculators: [],
    localizedContent: generateLocalizedContent(slug, name, locale),
  };

  return calculator;
}

function detectCategory(slug: string): any {
  if (slug.includes('loan') || slug.includes('mortgage') || slug.includes('tax') || slug.includes('interest')) {
    return 'finance';
  }
  if (slug.includes('bmi') || slug.includes('calorie') || slug.includes('health') || slug.includes('weight')) {
    return 'health';
  }
  if (slug.includes('gpa') || slug.includes('grade') || slug.includes('math')) {
    return 'education';
  }
  if (slug.includes('engineering') || slug.includes('ohm') || slug.includes('voltage')) {
    return 'engineering';
  }
  if (slug.includes('age') || slug.includes('date') || slug.includes('time')) {
    return 'lifestyle';
  }
  // Add more category detection...
  return 'miscellaneous';
}

function generateDefaultInputs(slug: string): any[] {
  // Generate basic inputs based on calculator type
  const inputs = [
    {
      key: 'value1',
      label: 'Value 1',
      type: 'number',
      placeholder: 'Enter value',
      required: true,
      validation: { required: true }
    },
    {
      key: 'value2',
      label: 'Value 2',
      type: 'number',
      placeholder: 'Enter value',
      required: true,
      validation: { required: true }
    },
  ];

  return inputs;
}

function generateDefaultOutputs(slug: string): any[] {
  return [
    {
      key: 'result',
      label: 'Result',
      format: 'number',
      precision: 2,
      primary: true
    },
  ];
}

function generateLocalizedContent(slug: string, name: string, locale: Locale): any {
  const content: any = {};
  
  content[locale] = {
    title: name,
    description: `Calculate ${name.toLowerCase()} quickly and accurately with our free online tool.`,
    keywords: [slug, 'calculator', 'online', 'free'],
    faq: [
      {
        question: `What is ${name}?`,
        answer: `${name} is a tool that helps you calculate specific values based on your inputs.`,
      },
      {
        question: `How to use ${name}?`,
        answer: `Simply enter the required values and click Calculate to get your results instantly.`,
      },
    ],
    article: {
      title: `Understanding ${name}`,
      introduction: `This comprehensive guide will help you understand how to use the ${name} effectively.`,
      sections: [
        {
          heading: 'Overview',
          content: `The ${name} is designed to provide quick and accurate calculations for your needs.`,
        },
      ],
      conclusion: `Use our ${name} to make informed decisions based on accurate calculations.`,
      wordCount: 500,
    },
    examples: [],
    references: [],
  };
  
  return content;
}