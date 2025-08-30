// Calculator registry with all 430 calculators organized by category
import { Calculator, CalculatorCategory } from '@/lib/types/calculator';

export const calculatorCategories: Record<CalculatorCategory, {
  name: string;
  description: string;
  icon: string;
  color: string;
}> = {
  finance: {
    name: 'Finance',
    description: 'Loans, investments, taxes, and financial planning',
    icon: '🏦',
    color: 'bg-green-500',
  },
  health: {
    name: 'Health & Fitness',
    description: 'BMI, calories, nutrition, and wellness',
    icon: '❤️',
    color: 'bg-red-500',
  },
  education: {
    name: 'Education & Science',
    description: 'Math, physics, chemistry, and academic tools',
    icon: '📚',
    color: 'bg-blue-500',
  },
  engineering: {
    name: 'Engineering',
    description: 'Technical calculations and engineering tools',
    icon: '⚙️',
    color: 'bg-gray-600',
  },
  lifestyle: {
    name: 'Lifestyle',
    description: 'Daily life, entertainment, and personal tools',
    icon: '🍔',
    color: 'bg-yellow-500',
  },
  insurance: {
    name: 'Insurance',
    description: 'Insurance premiums and coverage calculations',
    icon: '🛡️',
    color: 'bg-indigo-500',
  },
  environment: {
    name: 'Environment',
    description: 'Carbon footprint, energy, and sustainability',
    icon: '🌍',
    color: 'bg-green-600',
  },
  business: {
    name: 'Business',
    description: 'Business metrics, ROI, and profitability',
    icon: '📈',
    color: 'bg-purple-500',
  },
  technology: {
    name: 'Technology',
    description: 'IT, web, and technical calculations',
    icon: '💻',
    color: 'bg-cyan-500',
  },
  mathematics: {
    name: 'Mathematics',
    description: 'Mathematical operations and statistics',
    icon: '📐',
    color: 'bg-orange-500',
  },
  conversion: {
    name: 'Unit Conversion',
    description: 'Convert between different units and measurements',
    icon: '🔁',
    color: 'bg-teal-500',
  },
  logistics: {
    name: 'Logistics & Travel',
    description: 'Shipping, travel costs, and transportation',
    icon: '📦',
    color: 'bg-amber-500',
  },
  household: {
    name: 'Household',
    description: 'Home, utilities, and personal finance',
    icon: '🏠',
    color: 'bg-lime-500',
  },
  miscellaneous: {
    name: 'Miscellaneous',
    description: 'Various tools and calculators',
    icon: '🧪',
    color: 'bg-pink-500',
  },
};

// Finance calculators (40 calculators)
export const financeCalculators = [
  { id: 'loan-calculator', slug: 'loan-calculator', name: 'Loan Calculator' },
  { id: 'mortgage-calculator', slug: 'mortgage-calculator', name: 'Mortgage Calculator' },
  { id: 'car-loan-calculator', slug: 'car-loan-calculator', name: 'Car Loan Calculator' },
  { id: 'credit-card-interest', slug: 'credit-card-interest', name: 'Credit Card Interest Calculator' },
  { id: 'compound-interest', slug: 'compound-interest', name: 'Compound Interest Calculator' },
  { id: 'savings-goal', slug: 'savings-goal', name: 'Savings Goal Calculator' },
  { id: 'retirement-calculator', slug: 'retirement-calculator', name: 'Retirement Calculator' },
  { id: '401k-calculator', slug: '401k-calculator', name: '401k Calculator' },
  { id: 'roth-ira', slug: 'roth-ira', name: 'Roth IRA Calculator' },
  { id: 'tax-calculator', slug: 'tax-calculator', name: 'Tax Calculator' },
  { id: 'vat-calculator', slug: 'vat-calculator', name: 'VAT Calculator' },
  { id: 'property-tax', slug: 'property-tax', name: 'Property Tax Calculator' },
  { id: 'inflation-calculator', slug: 'inflation-calculator', name: 'Inflation Calculator' },
  { id: 'roi-calculator', slug: 'roi-calculator', name: 'ROI Calculator' },
  { id: 'stock-return', slug: 'stock-return', name: 'Stock Return Calculator' },
  { id: 'dividend-calculator', slug: 'dividend-calculator', name: 'Dividend Calculator' },
  { id: 'sip-calculator', slug: 'sip-calculator', name: 'SIP Calculator' },
  { id: 'mutual-fund', slug: 'mutual-fund', name: 'Mutual Fund Calculator' },
  { id: 'currency-converter', slug: 'currency-converter', name: 'Currency Converter' },
  { id: 'crypto-profit', slug: 'crypto-profit', name: 'Crypto Profit Calculator' },
  { id: 'bitcoin-mining', slug: 'bitcoin-mining', name: 'Bitcoin Mining Calculator' },
  { id: 'ethereum-gas', slug: 'ethereum-gas', name: 'Ethereum Gas Fee Calculator' },
  { id: 'nft-profit', slug: 'nft-profit', name: 'NFT Profit Calculator' },
  { id: 'paycheck-calculator', slug: 'paycheck-calculator', name: 'Paycheck Calculator' },
  { id: 'salary-calculator', slug: 'salary-calculator', name: 'Salary Calculator' },
  { id: 'hourly-wage', slug: 'hourly-wage', name: 'Hourly Wage Calculator' },
  { id: 'overtime-pay', slug: 'overtime-pay', name: 'Overtime Pay Calculator' },
  { id: 'freelancer-rate', slug: 'freelancer-rate', name: 'Freelancer Rate Calculator' },
  { id: 'business-loan', slug: 'business-loan', name: 'Business Loan Calculator' },
  { id: 'refinance-calculator', slug: 'refinance-calculator', name: 'Refinance Calculator' },
  { id: 'debt-payoff', slug: 'debt-payoff', name: 'Debt Payoff Calculator' },
  { id: 'amortization', slug: 'amortization', name: 'Amortization Calculator' },
  { id: 'lease-calculator', slug: 'lease-calculator', name: 'Lease Calculator' },
  { id: 'break-even', slug: 'break-even', name: 'Break-even Calculator' },
  { id: 'profit-margin', slug: 'profit-margin', name: 'Profit Margin Calculator' },
  { id: 'markup-calculator', slug: 'markup-calculator', name: 'Markup Calculator' },
  { id: 'discount-calculator', slug: 'discount-calculator', name: 'Discount Calculator' },
  { id: 'sales-tax', slug: 'sales-tax', name: 'Sales Tax Calculator' },
  { id: 'tip-calculator', slug: 'tip-calculator', name: 'Tip Calculator' },
  { id: 'currency-arbitrage', slug: 'currency-arbitrage', name: 'Currency Arbitrage Calculator' },
];

// Health calculators (24 calculators)
export const healthCalculators = [
  { id: 'bmi-calculator', slug: 'bmi-calculator', name: 'BMI Calculator' },
  { id: 'bmr-calculator', slug: 'bmr-calculator', name: 'BMR Calculator' },
  { id: 'calorie-calculator', slug: 'calorie-calculator', name: 'Calorie Calculator' },
  { id: 'macro-calculator', slug: 'macro-calculator', name: 'Macro Calculator' },
  { id: 'protein-intake', slug: 'protein-intake', name: 'Protein Intake Calculator' },
  { id: 'water-intake', slug: 'water-intake', name: 'Water Intake Calculator' },
  { id: 'ideal-weight', slug: 'ideal-weight', name: 'Ideal Weight Calculator' },
  { id: 'body-fat', slug: 'body-fat', name: 'Body Fat Calculator' },
  { id: 'tdee-calculator', slug: 'tdee-calculator', name: 'TDEE Calculator' },
  { id: 'running-pace', slug: 'running-pace', name: 'Running Pace Calculator' },
  { id: 'marathon-time', slug: 'marathon-time', name: 'Marathon Time Calculator' },
  { id: 'vo2-max', slug: 'vo2-max', name: 'VO2 Max Calculator' },
  { id: 'heart-rate', slug: 'heart-rate', name: 'Heart Rate Calculator' },
  { id: 'target-heart-rate', slug: 'target-heart-rate', name: 'Target Heart Rate Calculator' },
  { id: 'pregnancy-due-date', slug: 'pregnancy-due-date', name: 'Pregnancy Due Date Calculator' },
  { id: 'ovulation-calculator', slug: 'ovulation-calculator', name: 'Ovulation Calculator' },
  { id: 'conception-calculator', slug: 'conception-calculator', name: 'Conception Calculator' },
  { id: 'pregnancy-weight-gain', slug: 'pregnancy-weight-gain', name: 'Pregnancy Weight Gain Calculator' },
  { id: 'blood-alcohol', slug: 'blood-alcohol', name: 'Blood Alcohol Calculator' },
  { id: 'cholesterol-ratio', slug: 'cholesterol-ratio', name: 'Cholesterol Ratio Calculator' },
  { id: 'insulin-dose', slug: 'insulin-dose', name: 'Insulin Dose Calculator' },
  { id: 'ivf-success', slug: 'ivf-success', name: 'IVF Success Calculator' },
  { id: 'sleep-calculator', slug: 'sleep-calculator', name: 'Sleep Calculator' },
  { id: 'stress-level', slug: 'stress-level', name: 'Stress Level Calculator' },
];

// Export all calculator lists
export const allCalculatorLists = {
  finance: financeCalculators,
  health: healthCalculators,
  // Add more categories here...
};

// Function to get calculator by slug
export function getCalculatorBySlug(slug: string): any {
  for (const list of Object.values(allCalculatorLists)) {
    const calculator = list.find(calc => calc.slug === slug);
    if (calculator) return calculator;
  }
  return null;
}

// Function to get calculators by category
export function getCalculatorsByCategory(category: CalculatorCategory): any[] {
  return allCalculatorLists[category] || [];
}

// Function to get all calculators
export function getAllCalculators(): any[] {
  return Object.values(allCalculatorLists).flat();
}

// Function to get popular calculators
export function getPopularCalculators(limit: number = 30): any[] {
  // Return top 30 most popular calculators
  const popularSlugs = [
    'bmi-calculator',
    'mortgage-calculator',
    'loan-calculator',
    'tax-calculator',
    'calorie-calculator',
    'retirement-calculator',
    'compound-interest',
    'currency-converter',
    'pregnancy-due-date',
    'salary-calculator',
    'car-loan-calculator',
    'bmr-calculator',
    'roi-calculator',
    'discount-calculator',
    'tip-calculator',
    'savings-goal',
    'credit-card-interest',
    'inflation-calculator',
    'body-fat',
    'ideal-weight',
    'protein-intake',
    'water-intake',
    'tdee-calculator',
    'paycheck-calculator',
    'vat-calculator',
    'sales-tax',
    'crypto-profit',
    'stock-return',
    'break-even',
    'profit-margin',
  ];
  
  return popularSlugs
    .map(slug => getCalculatorBySlug(slug))
    .filter(Boolean)
    .slice(0, limit);
}