export interface Calculator {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  keywords: string[];
  formula: string;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  faq: FAQ[];
  howToUse: string;
  references: Reference[];
  relatedCalculators: string[];
  icon: string;
  emoji: string;
  localizedContent: {
    [locale: string]: {
      name: string;
      description: string;
      howToUse: string;
      faq: FAQ[];
    };
  };
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'range';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  required: boolean;
  unit?: string;
  localizedLabel: {
    [locale: string]: string;
  };
}

export interface CalculatorOutput {
  id: string;
  label: string;
  type: 'number' | 'text' | 'chart' | 'table';
  format?: string;
  unit?: string;
  localizedLabel: {
    [locale: string]: string;
  };
}

export interface FAQ {
  question: string;
  answer: string;
  localizedQuestion: {
    [locale: string]: string;
  };
  localizedAnswer: {
    [locale: string]: string;
  };
}

export interface Reference {
  title: string;
  url: string;
  type: 'wikipedia' | 'government' | 'educational' | 'financial';
}

export interface CalculationResult {
  [key: string]: any;
}

export interface CalculatorEngine {
  calculate(inputs: Record<string, any>): CalculationResult;
  validate(inputs: Record<string, any>): { valid: boolean; errors: string[] };
}

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  category: string;
  slug: string;
  icon: string;
  emoji: string;
  score: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  emoji: string;
  calculators: string[];
  localizedName: {
    [locale: string]: string;
  };
  localizedDescription: {
    [locale: string]: string;
  };
}