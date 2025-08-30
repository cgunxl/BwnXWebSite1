// Core calculator types and interfaces
export interface LocalizedContent {
  title: string;
  description: string;
  keywords: string[];
  faq: FAQItem[];
  article: Article;
  examples?: Example[];
  references?: Reference[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  title: string;
  introduction: string;
  sections: ArticleSection[];
  conclusion: string;
  wordCount?: number;
}

export interface ArticleSection {
  heading: string;
  content: string;
  subSections?: ArticleSection[];
}

export interface Example {
  title: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  explanation: string;
}

export interface Reference {
  title: string;
  url: string;
  publisher: string;
  dateAccessed: string;
  type: 'government' | 'academic' | 'organization' | 'commercial';
}

export interface CalculatorInput {
  key: string;
  label: string;
  type: 'number' | 'text' | 'select' | 'date' | 'boolean' | 'slider' | 'radio';
  unit?: string;
  placeholder?: string;
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  options?: SelectOption[];
  validation?: {
    min?: number;
    max?: number;
    required?: boolean;
    pattern?: string;
    message?: string;
  };
  tooltip?: string;
  dependsOn?: string[];
  showWhen?: Record<string, any>;
}

export interface SelectOption {
  value: string | number;
  label: string;
  description?: string;
}

export interface ValidationRule {
  type: 'min' | 'max' | 'pattern' | 'custom';
  value: any;
  message: string;
}

export interface CalculatorOutput {
  key: string;
  label: string;
  value?: any;
  unit?: string;
  format?: 'number' | 'currency' | 'percentage' | 'text';
  precision?: number;
  decimals?: number;
  description?: string;
  category?: string;
  visualization?: VisualizationType;
  primary?: boolean;
}

export type VisualizationType = 
  | 'gauge' 
  | 'bar' 
  | 'line' 
  | 'pie' 
  | 'area' 
  | 'scatter' 
  | 'category-bar'
  | 'progress';

export interface CalculatorFormula {
  name: string;
  expression: string;
  variables: string[];
  description?: string;
  source?: string;
}

export interface Calculator {
  id: string;
  category: CalculatorCategory;
  slug: string;
  icon: string;
  color: string;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  formulas: CalculatorFormula[];
  graph?: Graph;
  relatedCalculators?: string[];
  localizedContent: Record<string, LocalizedContent>;
  countrySpecific?: Record<string, CountrySpecificData>;
  tags?: string[];
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  popularity?: number;
}

export interface CountrySpecificData {
  currency?: string;
  taxRates?: Record<string, number>;
  regulations?: Record<string, any>;
  standards?: Record<string, any>;
  defaultValues?: Record<string, any>;
  units?: Record<string, string>;
}

export type CalculatorCategory = 
  | 'finance'
  | 'health'
  | 'education'
  | 'engineering'
  | 'lifestyle'
  | 'insurance'
  | 'environment'
  | 'business'
  | 'technology'
  | 'mathematics'
  | 'conversion'
  | 'logistics'
  | 'household'
  | 'miscellaneous';

export interface CalculatorResult {
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  timestamp: string;
  locale: string;
  shareUrl?: string;
}

export interface GraphData {
  type: VisualizationType;
  data: any[];
  config?: Record<string, any>;
}