// Core calculator types and interfaces
export interface LocalizedContent {
  title: string;
  description: string;
  keywords: string[];
  faq: FAQItem[] | any[];
  article: Article | string | any;
  examples?: Example[];
  references?: Reference[];
  [key: string]: any; // Allow any additional properties
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
  type: 'number' | 'text' | 'select' | 'date' | 'boolean' | 'slider' | 'radio' | 'dynamic-list' | 'textarea' | 'checkbox' | 'file' | 'color' | 'range' | 'time' | 'email' | 'url' | 'tel';
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
  fields?: any[]; // For dynamic-list type
  multiple?: boolean; // For file and select types
  accept?: string; // For file type
  minItems?: number; // For dynamic-list minimum items
  maxItems?: number; // For dynamic-list maximum items
  rows?: number; // For textarea
  cols?: number; // For textarea
  pattern?: string; // For input validation
  maxLength?: number; // For text input
  minLength?: number; // For text input
  disabled?: boolean; // For disabled state
  readonly?: boolean; // For readonly state
  autoComplete?: string; // For autocomplete
  className?: string; // For custom styling
  style?: any; // For inline styles
  [key: string]: any; // Allow any additional properties
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

export interface Graph {
  type: 'gauge' | 'bar' | 'line' | 'pie' | 'donut' | 'scatter' | 'area' | 'category-bar' | 'function' | 'histogram' | 'heatmap' | 'bubble' | 'radar' | 'treemap' | 'sankey' | 'waterfall';
  dataKey?: string;
  min?: number;
  max?: number;
  segments?: GraphSegment[];
  categories?: string[];
  xAxis?: string;
  yAxis?: string;
  lines?: string[];
  showProjection?: boolean;
  showMilestones?: boolean;
  showDistribution?: boolean;
  showTrend?: boolean;
  showAverage?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  [key: string]: any; // Allow any additional properties
}

export interface GraphSegment {
  threshold: number;
  color: string;
  label: string;
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
  | 'math'
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
  units?: Record<string, string>;
  category?: string;
  categoryPercentage?: number;
  breakdown?: Record<string, any>;
  warnings?: string[];
  suggestions?: string[];
}

export interface GraphData {
  type: VisualizationType;
  data: any[];
  config?: Record<string, any>;
}