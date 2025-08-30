// Calculator Factory - Auto-generates calculator implementations
import { Calculator, CalculatorInput, CalculatorOutput } from '@/lib/types/calculator';
import { calculatorDefinitions, generateLocalizedContent, getRelatedCalculators } from './generator';
import { Locale, i18n } from '@/lib/i18n/config';

// Calculator templates by category
const calculatorTemplates: Record<string, any> = {
  // Finance template
  finance: {
    loan: {
      inputs: [
        { key: 'principal', label: 'Principal Amount', type: 'number', unit: 'currency', required: true },
        { key: 'interestRate', label: 'Interest Rate', type: 'number', unit: '%', required: true },
        { key: 'term', label: 'Term', type: 'number', unit: 'years', required: true },
      ],
      outputs: [
        { key: 'monthlyPayment', label: 'Monthly Payment', format: 'currency', visualization: 'gauge' },
        { key: 'totalInterest', label: 'Total Interest', format: 'currency', visualization: 'bar' },
        { key: 'totalPayment', label: 'Total Payment', format: 'currency' },
      ],
      formulas: [
        {
          name: 'monthlyPayment',
          expression: '(principal * (rate / 12)) / (1 - Math.pow(1 + (rate / 12), -months))',
          variables: ['principal', 'rate', 'months'],
        },
      ],
    },
    tax: {
      inputs: [
        { key: 'income', label: 'Annual Income', type: 'number', unit: 'currency', required: true },
        { key: 'deductions', label: 'Deductions', type: 'number', unit: 'currency', defaultValue: 0 },
        { key: 'filingStatus', label: 'Filing Status', type: 'select', options: [
          { value: 'single', label: 'Single' },
          { value: 'married', label: 'Married Filing Jointly' },
          { value: 'head', label: 'Head of Household' },
        ]},
      ],
      outputs: [
        { key: 'taxableIncome', label: 'Taxable Income', format: 'currency' },
        { key: 'federalTax', label: 'Federal Tax', format: 'currency', visualization: 'gauge' },
        { key: 'effectiveRate', label: 'Effective Tax Rate', format: 'percentage' },
        { key: 'afterTaxIncome', label: 'After-Tax Income', format: 'currency' },
      ],
    },
    investment: {
      inputs: [
        { key: 'initialInvestment', label: 'Initial Investment', type: 'number', unit: 'currency', required: true },
        { key: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', unit: 'currency', defaultValue: 0 },
        { key: 'annualReturn', label: 'Expected Annual Return', type: 'number', unit: '%', required: true },
        { key: 'investmentPeriod', label: 'Investment Period', type: 'number', unit: 'years', required: true },
      ],
      outputs: [
        { key: 'futureValue', label: 'Future Value', format: 'currency', visualization: 'gauge' },
        { key: 'totalContributions', label: 'Total Contributions', format: 'currency' },
        { key: 'totalReturns', label: 'Total Returns', format: 'currency', visualization: 'bar' },
      ],
    },
  },
  // Health template
  health: {
    body: {
      inputs: [
        { key: 'weight', label: 'Weight', type: 'number', unit: 'kg', required: true },
        { key: 'height', label: 'Height', type: 'number', unit: 'cm', required: true },
        { key: 'age', label: 'Age', type: 'number', unit: 'years' },
        { key: 'gender', label: 'Gender', type: 'radio', options: [
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
        ]},
        { key: 'activityLevel', label: 'Activity Level', type: 'select', options: [
          { value: 'sedentary', label: 'Sedentary' },
          { value: 'light', label: 'Lightly Active' },
          { value: 'moderate', label: 'Moderately Active' },
          { value: 'active', label: 'Very Active' },
          { value: 'extreme', label: 'Extremely Active' },
        ]},
      ],
      outputs: [
        { key: 'result', label: 'Result', format: 'number', visualization: 'gauge' },
        { key: 'category', label: 'Category', format: 'text', visualization: 'category-bar' },
        { key: 'recommendation', label: 'Recommendation', format: 'text' },
      ],
    },
    pregnancy: {
      inputs: [
        { key: 'lastPeriod', label: 'First Day of Last Period', type: 'date', required: true },
        { key: 'cycleLength', label: 'Average Cycle Length', type: 'number', unit: 'days', defaultValue: 28 },
      ],
      outputs: [
        { key: 'dueDate', label: 'Estimated Due Date', format: 'text' },
        { key: 'currentWeek', label: 'Current Week', format: 'text' },
        { key: 'trimester', label: 'Trimester', format: 'text' },
        { key: 'daysRemaining', label: 'Days Remaining', format: 'number' },
      ],
    },
  },
  // Education template
  education: {
    grade: {
      inputs: [
        { key: 'scores', label: 'Scores', type: 'text', placeholder: 'Enter scores separated by commas', required: true },
        { key: 'weights', label: 'Weights (optional)', type: 'text', placeholder: 'Enter weights separated by commas' },
        { key: 'gradeScale', label: 'Grade Scale', type: 'select', options: [
          { value: '4.0', label: '4.0 Scale' },
          { value: '5.0', label: '5.0 Scale' },
          { value: '100', label: '100 Point Scale' },
        ]},
      ],
      outputs: [
        { key: 'average', label: 'Average', format: 'number', visualization: 'gauge' },
        { key: 'letterGrade', label: 'Letter Grade', format: 'text' },
        { key: 'gpa', label: 'GPA', format: 'number' },
      ],
    },
    math: {
      inputs: [
        { key: 'expression', label: 'Expression', type: 'text', required: true },
        { key: 'variable', label: 'Variable', type: 'text' },
        { key: 'value', label: 'Value', type: 'number' },
      ],
      outputs: [
        { key: 'result', label: 'Result', format: 'text' },
        { key: 'steps', label: 'Solution Steps', format: 'text' },
        { key: 'graph', label: 'Graph', visualization: 'line' },
      ],
    },
  },
  // Conversion template
  conversion: {
    unit: {
      inputs: [
        { key: 'value', label: 'Value', type: 'number', required: true },
        { key: 'fromUnit', label: 'From', type: 'select', required: true },
        { key: 'toUnit', label: 'To', type: 'select', required: true },
      ],
      outputs: [
        { key: 'result', label: 'Result', format: 'number' },
        { key: 'formula', label: 'Conversion Formula', format: 'text' },
      ],
    },
  },
  // Lifestyle template
  lifestyle: {
    date: {
      inputs: [
        { key: 'startDate', label: 'Start Date', type: 'date', required: true },
        { key: 'endDate', label: 'End Date', type: 'date', required: true },
        { key: 'includeEndDate', label: 'Include End Date', type: 'boolean', defaultValue: true },
      ],
      outputs: [
        { key: 'days', label: 'Days', format: 'number' },
        { key: 'weeks', label: 'Weeks', format: 'number' },
        { key: 'months', label: 'Months', format: 'number' },
        { key: 'years', label: 'Years', format: 'number' },
      ],
    },
    random: {
      inputs: [
        { key: 'min', label: 'Minimum', type: 'number', defaultValue: 1 },
        { key: 'max', label: 'Maximum', type: 'number', defaultValue: 100 },
        { key: 'count', label: 'How Many', type: 'number', defaultValue: 1 },
        { key: 'unique', label: 'Unique Numbers', type: 'boolean', defaultValue: false },
      ],
      outputs: [
        { key: 'result', label: 'Result', format: 'text' },
        { key: 'statistics', label: 'Statistics', format: 'text' },
      ],
    },
  },
};

// Determine template type based on calculator ID
function getTemplateType(calculatorId: string): { category: string; type: string } {
  // Finance templates
  if (calculatorId.includes('loan') || calculatorId.includes('mortgage') || calculatorId.includes('lease')) {
    return { category: 'finance', type: 'loan' };
  }
  if (calculatorId.includes('tax') || calculatorId.includes('vat')) {
    return { category: 'finance', type: 'tax' };
  }
  if (calculatorId.includes('investment') || calculatorId.includes('roi') || calculatorId.includes('return') || 
      calculatorId.includes('dividend') || calculatorId.includes('compound')) {
    return { category: 'finance', type: 'investment' };
  }
  
  // Health templates
  if (calculatorId.includes('bmi') || calculatorId.includes('bmr') || calculatorId.includes('calorie') || 
      calculatorId.includes('weight') || calculatorId.includes('body')) {
    return { category: 'health', type: 'body' };
  }
  if (calculatorId.includes('pregnancy') || calculatorId.includes('ovulation') || calculatorId.includes('conception')) {
    return { category: 'health', type: 'pregnancy' };
  }
  
  // Education templates
  if (calculatorId.includes('gpa') || calculatorId.includes('grade')) {
    return { category: 'education', type: 'grade' };
  }
  if (calculatorId.includes('equation') || calculatorId.includes('derivative') || calculatorId.includes('integral')) {
    return { category: 'education', type: 'math' };
  }
  
  // Conversion templates
  if (calculatorId.includes('convert') || calculatorId.includes('converter')) {
    return { category: 'conversion', type: 'unit' };
  }
  
  // Lifestyle templates
  if (calculatorId.includes('date') || calculatorId.includes('age') || calculatorId.includes('time')) {
    return { category: 'lifestyle', type: 'date' };
  }
  if (calculatorId.includes('random') || calculatorId.includes('generator')) {
    return { category: 'lifestyle', type: 'random' };
  }
  
  // Default to finance loan template
  return { category: 'finance', type: 'loan' };
}

// Create calculator from definition
export function createCalculator(calculatorId: string): Calculator | null {
  const definition = calculatorDefinitions.find(d => d.id === calculatorId);
  if (!definition) return null;

  const template = getTemplateType(calculatorId);
  const baseTemplate = calculatorTemplates[template.category]?.[template.type];
  
  if (!baseTemplate) return null;

  // Generate localized content for all languages
  const localizedContent: Record<string, any> = {};
  for (const locale of i18n.locales) {
    localizedContent[locale] = generateLocalizedContent(definition, locale);
  }

  // Generate country-specific data
  const countrySpecific: Record<string, any> = {};
  for (const locale of i18n.locales) {
    countrySpecific[locale] = getCountrySpecificDataForCalculator(definition, locale);
  }

  // Create the calculator
  const calculator: Calculator = {
    id: definition.id,
    category: definition.category,
    slug: definition.slug,
    icon: definition.icon,
    color: getCategoryColor(definition.category),
    inputs: customizeInputs(baseTemplate.inputs, definition),
    outputs: customizeOutputs(baseTemplate.outputs, definition),
    formulas: baseTemplate.formulas || [],
    relatedCalculators: getRelatedCalculators(definition),
    localizedContent,
    countrySpecific,
    tags: generateTags(definition),
    difficulty: getDifficulty(definition),
    popularity: definition.priority,
  };

  return calculator;
}

// Customize inputs based on calculator type
function customizeInputs(templateInputs: any[], definition: any): CalculatorInput[] {
  // Clone and customize inputs based on specific calculator needs
  const inputs = JSON.parse(JSON.stringify(templateInputs));
  
  // Add calculator-specific customizations
  if (definition.id === 'car-loan-calculator') {
    inputs.push({
      key: 'downPayment',
      label: 'Down Payment',
      type: 'number',
      unit: 'currency',
      defaultValue: 0,
    });
  }
  
  if (definition.id === 'crypto-profit') {
    inputs[0].label = 'Investment Amount';
    inputs.push({
      key: 'buyPrice',
      label: 'Buy Price',
      type: 'number',
      unit: 'currency',
      required: true,
    });
    inputs.push({
      key: 'sellPrice',
      label: 'Sell Price',
      type: 'number',
      unit: 'currency',
      required: true,
    });
  }
  
  return inputs;
}

// Customize outputs based on calculator type
function customizeOutputs(templateOutputs: any[], definition: any): CalculatorOutput[] {
  // Clone and customize outputs
  const outputs = JSON.parse(JSON.stringify(templateOutputs));
  
  // Add calculator-specific customizations
  if (definition.id === 'bmi-calculator') {
    outputs[0].label = 'BMI Value';
    outputs[1].label = 'BMI Category';
    outputs.push({
      key: 'idealWeight',
      label: 'Ideal Weight Range',
      format: 'text',
    });
  }
  
  return outputs;
}

// Get category color
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    finance: 'bg-green-500',
    health: 'bg-red-500',
    education: 'bg-blue-500',
    engineering: 'bg-gray-600',
    lifestyle: 'bg-yellow-500',
    insurance: 'bg-indigo-500',
    environment: 'bg-green-600',
    business: 'bg-purple-500',
    technology: 'bg-cyan-500',
    mathematics: 'bg-orange-500',
    conversion: 'bg-teal-500',
    logistics: 'bg-amber-500',
    household: 'bg-lime-500',
    miscellaneous: 'bg-pink-500',
  };
  
  return colors[category] || 'bg-blue-500';
}

// Get country-specific data for calculator
function getCountrySpecificDataForCalculator(definition: any, locale: Locale): any {
  const data: any = {
    currency: getCurrencyForLocale(locale),
    defaultValues: {},
    regulations: {},
  };
  
  // Tax calculators need country-specific rates
  if (definition.id.includes('tax')) {
    data.taxRates = getTaxRatesForLocale(locale);
  }
  
  // Loan calculators need country-specific interest rates
  if (definition.id.includes('loan') || definition.id.includes('mortgage')) {
    data.defaultValues.interestRate = getDefaultInterestRate(locale);
  }
  
  // Health calculators may have different standards
  if (definition.category === 'health') {
    data.standards = getHealthStandardsForLocale(locale);
  }
  
  return data;
}

// Get currency for locale
function getCurrencyForLocale(locale: Locale): string {
  const currencies: Record<Locale, string> = {
    en: 'USD',
    es: 'EUR',
    pt: 'BRL',
    de: 'EUR',
    fr: 'EUR',
    ja: 'JPY',
    ko: 'KRW',
    zh: 'CNY',
    th: 'THB',
    ar: 'SAR',
    hi: 'INR',
    id: 'IDR',
    ru: 'RUB',
    it: 'EUR',
    nl: 'EUR',
    vi: 'VND',
    fa: 'IRR',
  };
  
  return currencies[locale] || 'USD';
}

// Get tax rates for locale
function getTaxRatesForLocale(locale: Locale): any {
  const taxRates: Record<string, any> = {
    en: { federal: [0.10, 0.12, 0.22, 0.24, 0.32, 0.35, 0.37], standardDeduction: 13850 },
    th: { rates: [0, 0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35], allowance: 60000 },
    de: { rates: [0, 0.14, 0.42, 0.45], solidarityTax: 0.055 },
    ja: { rates: [0.05, 0.10, 0.20, 0.23, 0.33, 0.40, 0.45], basicDeduction: 480000 },
    // Add more countries...
  };
  
  return taxRates[locale] || taxRates.en;
}

// Get default interest rate for locale
function getDefaultInterestRate(locale: Locale): number {
  const rates: Record<string, number> = {
    en: 7.0,
    th: 6.5,
    de: 4.5,
    ja: 2.5,
    // Add more...
  };
  
  return rates[locale] || 5.0;
}

// Get health standards for locale
function getHealthStandardsForLocale(locale: Locale): any {
  if (locale === 'th' || locale === 'ja' || locale === 'ko' || locale === 'zh') {
    // Asian standards for BMI
    return {
      bmi: {
        underweight: { max: 18.5 },
        normal: { min: 18.5, max: 22.9 },
        overweight: { min: 23, max: 24.9 },
        obese: { min: 25 },
      },
    };
  }
  
  // Western standards
  return {
    bmi: {
      underweight: { max: 18.5 },
      normal: { min: 18.5, max: 24.9 },
      overweight: { min: 25, max: 29.9 },
      obese: { min: 30 },
    },
  };
}

// Generate tags for SEO
function generateTags(definition: any): string[] {
  const tags = [definition.slug, definition.category];
  
  // Add specific tags based on calculator type
  if (definition.id.includes('loan')) tags.push('loan', 'finance', 'payment');
  if (definition.id.includes('tax')) tags.push('tax', 'income', 'deduction');
  if (definition.id.includes('health')) tags.push('health', 'fitness', 'wellness');
  if (definition.id.includes('crypto')) tags.push('cryptocurrency', 'bitcoin', 'blockchain');
  
  return tags;
}

// Get difficulty level
function getDifficulty(definition: any): 'basic' | 'intermediate' | 'advanced' {
  if (definition.priority > 90) return 'basic';
  if (definition.priority > 70) return 'intermediate';
  return 'advanced';
}