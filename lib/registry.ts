export type CalculatorId =
  | 'loan'
  | 'mortgage'
  | 'tax'
  | 'insurance'
  | 'vat'
  | 'paycheck'
  | 'currency'
  | 'compound'
  | 'savings'
  | 'credit-card';

export type CalculatorEntry = {
  id: CalculatorId;
  path: (lang: string) => string;
  titleKey: string;
  description?: string;
  category: 'finance' | 'tax' | 'insurance' | 'conversion' | 'savings';
  keywords: string[];
};

export const REGISTRY: CalculatorEntry[] = [
  { id: 'loan', path: (lang) => `/${lang}/loan`, titleKey: 'loanCalc', description: 'Amortizing loan monthly payment and totals', category: 'finance', keywords: ['loan','amortization','emi','installment'] },
  { id: 'mortgage', path: (lang) => `/${lang}/mortgage`, titleKey: 'mortgageCalc', description: 'Mortgage with closing costs', category: 'finance', keywords: ['mortgage','home loan','closing costs'] },
  { id: 'tax', path: (lang) => `/${lang}/tax`, titleKey: 'taxCalc', description: 'Progressive tax estimate', category: 'tax', keywords: ['income tax','effective rate','brackets'] },
  { id: 'insurance', path: (lang) => `/${lang}/insurance`, titleKey: 'insuranceCalc', description: 'Premium estimate', category: 'insurance', keywords: ['premium','policy','risk'] },
  { id: 'vat', path: (lang) => `/${lang}/vat`, titleKey: 'vatCalc', description: 'Value-added tax from net/gross', category: 'tax', keywords: ['vat','sales tax','gst','net','gross'] },
  { id: 'paycheck', path: (lang) => `/${lang}/paycheck`, titleKey: 'paycheckCalc', description: 'Net pay after tax and social contributions', category: 'tax', keywords: ['paycheck','take home','salary','net pay'] },
  { id: 'currency', path: (lang) => `/${lang}/currency`, titleKey: 'currencyConverter', description: 'Convert between currencies', category: 'conversion', keywords: ['currency','fx','exchange','forex'] },
  { id: 'compound', path: (lang) => `/${lang}/compound`, titleKey: 'compoundCalc', description: 'Compound interest with contributions', category: 'savings', keywords: ['compound interest','investment','apy'] },
  { id: 'savings', path: (lang) => `/${lang}/savings-goal`, titleKey: 'savingsGoalCalc', description: 'How much to save to reach a goal', category: 'savings', keywords: ['savings','goal','future value'] },
  { id: 'credit-card', path: (lang) => `/${lang}/credit-card`, titleKey: 'creditCardCalc', description: 'Credit card interest and payoff time', category: 'finance', keywords: ['credit card','apr','payoff','interest'] }
];

export function getAllCalculatorPaths(lang: string): string[] {
  return REGISTRY.map((r) => r.path(lang));
}

