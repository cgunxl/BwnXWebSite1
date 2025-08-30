// Universal Calculator Schema Types
export interface CalculatorSchema {
  id: string;                    // slug, kebab-case, locale-agnostic
  category: string;              // finance|health|math|engineering|lifestyle|insurance|environment|business|tech|fun|logistics|household|conversion|misc
  title: string;                 // human-readable (localized at render)
  summary: string;               // short summary from sources
  localeHints?: string[];        // notes for localization (units, examples)
  
  inputs: CalculatorInput[];
  formulae: CalculatorFormula[];
  categories?: CategoryRange[];
  outputs: CalculatorOutput[];
  graphs?: GraphConfig[];
  related?: string[];            // list of related calculator slugs
  examples?: CalculatorExample[];
  sources: SourceReference[];
  disclaimers?: string[];        // short YMYL warnings per locale
  updatedAt?: string;           // ISO8601
}

export interface CalculatorInput {
  key: string;
  label: string;                // i18n key
  type: 'number' | 'string' | 'select' | 'date' | 'time' | 'slider' | 'dynamic_list';
  unit?: string | null;         // canonical unit (e.g., 'kg', 'USD', 'year')
  allowedUnits?: string[];      // convertible units (e.g., ['kg','lb'])
  placeholder?: string;
  tooltip?: string;
  validation: {
    min?: number | null;
    max?: number | null;
    required: boolean;
    pattern?: string;
  };
  options?: Array<{
    label: string;
    value: string | number;
  }>;
  subInputs?: CalculatorInput[]; // for dynamic_list type
  defaultValue?: any;
  step?: number;
  dependsOn?: string[];          // other input keys this depends on
}

export interface CalculatorFormula {
  name: 'primary' | `variant-${string}`;
  expression: string;            // pure function string e.g. "({p,r,n}) => p*r/(1-((1+r)**-n))"
  variables: string[];           // keys used from inputs
  notes?: string[];             // citations/explanations
  conditions?: Record<string, any>; // conditions for this formula to apply
}

export interface CategoryRange {
  label: string;                 // e.g., 'Underweight', 'Normal', 'Overweight'
  min: number | null;           // inclusive; null to mean -∞
  max: number | null;           // exclusive; null to mean +∞
  explanation?: string;
  color?: string;               // for visualization
  icon?: string;                // emoji or icon class
}

export interface CalculatorOutput {
  key: string;
  label: string;
  unit?: string | null;
  precision?: number | null;     // decimals
  explanation?: string;
  format?: 'number' | 'currency' | 'percentage' | 'text';
  showInSummary?: boolean;      // show in quick result card
}

export interface GraphConfig {
  type: 'auto' | 'category-bar' | 'gauge' | 'line' | 'bar' | 'scatter' | 'donut' | 'distribution' | 'candlestick';
  x?: string;                    // key|time|computed
  y?: string;                    // key|computed
  animated: boolean;
  categoryMap?: Record<string, { min: number | null; max: number | null }>;
  title?: string;
  showLegend?: boolean;
  colors?: string[];
}

export interface CalculatorExample {
  name: string;
  description?: string;
  inputs: Record<string, any>;
  expectedOutputs?: Record<string, any>;
  locale?: string;              // specific locale for this example
}

export interface SourceReference {
  title: string;
  url: string;
  publisher: string;
  dateAccessed: string;         // ISO8601
  reliability?: 'high' | 'medium' | 'low';
  type?: 'government' | 'academic' | 'standard' | 'official' | 'reputable';
}

export interface LocalizedContent {
  title: string;
  description: string;
  keywords: string[];
  article: ArticleContent;
  faq: FAQItem[];
  references: SourceReference[];
  examples: CalculatorExample[];
  disclaimers?: string[];
  tips?: string[];
  howToUse?: string[];
}

export interface ArticleContent {
  introduction: string;
  whatYouNeed?: string[];
  howItWorks?: string;
  interpretation?: string;
  examples?: string[];
  limitations?: string;
  tips?: string[];
  conclusion?: string;
  wordCount?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface CalculatorResult {
  outputs: Record<string, any>;
  category?: string;
  categoryPercentage?: number;
  breakdown?: Record<string, any>;
  units?: Record<string, string>;
  warnings?: string[];
  suggestions?: string[];
}

// Discovery Types
export interface DiscoveryQuery {
  topic: string;
  queries: string[];
  limit: number;
  preferredSources: string[];
}

export interface DiscoveredSchema {
  schema: CalculatorSchema;
  confidence: number;
  conflicts?: Array<{
    field: string;
    variants: any[];
    sources: string[];
  }>;
  warnings?: string[];
}

// Cross-link Rules
export interface CrossLinkRule {
  ifHas: string[];              // input keys
  suggest: string[];             // calculator slugs
  reason?: string;               // explanation
}

export interface CrossLinkCluster {
  name: string;
  calculators: string[];
  sequence?: string[];           // suggested order
}

// Country-specific configurations
export interface CountryConfig {
  locale: string;
  currency: string;
  taxRate: number;
  incomeRanges: {
    low: number;
    medium: number;
    high: number;
  };
  bmiCategories?: {
    underweight: number;
    normal: number;
    overweight: number;
    obese: number;
  };
  loanRates?: {
    mortgage: number;
    car: number;
    personal: number;
  };
  retirementAge?: number;
  dateFormat?: string;
  numberFormat?: Intl.NumberFormatOptions;
  units?: {
    weight: 'kg' | 'lbs';
    height: 'cm' | 'inches' | 'feet';
    distance: 'km' | 'miles';
    temperature: 'celsius' | 'fahrenheit';
  };
}