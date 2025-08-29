export interface LocaleContent {
  name: string;
  description: string;
  faq: Array<{ question: string; answer: string }>;
  keywords: string[];
  example?: string;
}

export interface CalculatorMeta {
  id: string;
  slug: string; // path segment e.g. "bmi-calculator"
  category: string;
  component: string; // component filename without extension, e.g. "BMICalculator"
  locales: Record<string, LocaleContent>; // key is locale code
  related?: string[]; // array of calculator ids
}