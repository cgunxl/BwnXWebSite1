// Schema Processor - Normalizes discovered data into CalculatorSchema
import { 
  CalculatorSchema, 
  CalculatorInput, 
  CalculatorFormula,
  CategoryRange,
  CalculatorOutput,
  GraphConfig,
  CalculatorExample,
  SourceReference,
  CountryConfig
} from '@/lib/types/calculator-schema';
import { Locale } from '@/lib/i18n/config';

export class SchemaProcessor {
  private countryConfigs: Record<Locale, CountryConfig> = {
    en: {
      locale: 'en',
      currency: 'USD',
      taxRate: 0.07,
      incomeRanges: { low: 30000, medium: 75000, high: 150000 },
      bmiCategories: { underweight: 18.5, normal: 25, overweight: 30, obese: 35 },
      loanRates: { mortgage: 0.065, car: 0.055, personal: 0.12 },
      retirementAge: 67,
      dateFormat: 'MM/DD/YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'lbs', height: 'inches', distance: 'miles', temperature: 'fahrenheit' },
    },
    th: {
      locale: 'th',
      currency: 'THB',
      taxRate: 0.07,
      incomeRanges: { low: 180000, medium: 600000, high: 1200000 },
      bmiCategories: { underweight: 18.5, normal: 23, overweight: 25, obese: 30 },
      loanRates: { mortgage: 0.055, car: 0.045, personal: 0.15 },
      retirementAge: 60,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    ja: {
      locale: 'ja',
      currency: 'JPY',
      taxRate: 0.10,
      incomeRanges: { low: 3000000, medium: 6000000, high: 12000000 },
      bmiCategories: { underweight: 18.5, normal: 23, overweight: 25, obese: 30 },
      loanRates: { mortgage: 0.015, car: 0.025, personal: 0.08 },
      retirementAge: 65,
      dateFormat: 'YYYY/MM/DD',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    de: {
      locale: 'de',
      currency: 'EUR',
      taxRate: 0.19,
      incomeRanges: { low: 25000, medium: 60000, high: 120000 },
      bmiCategories: { underweight: 18.5, normal: 25, overweight: 30, obese: 35 },
      loanRates: { mortgage: 0.035, car: 0.045, personal: 0.10 },
      retirementAge: 67,
      dateFormat: 'DD.MM.YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    zh: {
      locale: 'zh',
      currency: 'CNY',
      taxRate: 0.13,
      incomeRanges: { low: 60000, medium: 200000, high: 500000 },
      bmiCategories: { underweight: 18.5, normal: 24, overweight: 28, obese: 32 },
      loanRates: { mortgage: 0.045, car: 0.055, personal: 0.12 },
      retirementAge: 60,
      dateFormat: 'YYYY-MM-DD',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    es: {
      locale: 'es',
      currency: 'EUR',
      taxRate: 0.21,
      incomeRanges: { low: 20000, medium: 50000, high: 100000 },
      bmiCategories: { underweight: 18.5, normal: 25, overweight: 30, obese: 35 },
      loanRates: { mortgage: 0.03, car: 0.05, personal: 0.11 },
      retirementAge: 67,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    pt: {
      locale: 'pt',
      currency: 'BRL',
      taxRate: 0.17,
      incomeRanges: { low: 30000, medium: 80000, high: 200000 },
      bmiCategories: { underweight: 18.5, normal: 25, overweight: 30, obese: 35 },
      loanRates: { mortgage: 0.09, car: 0.12, personal: 0.25 },
      retirementAge: 65,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    fr: {
      locale: 'fr',
      currency: 'EUR',
      taxRate: 0.20,
      incomeRanges: { low: 22000, medium: 55000, high: 110000 },
      bmiCategories: { underweight: 18.5, normal: 25, overweight: 30, obese: 35 },
      loanRates: { mortgage: 0.025, car: 0.04, personal: 0.09 },
      retirementAge: 64,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    ko: {
      locale: 'ko',
      currency: 'KRW',
      taxRate: 0.10,
      incomeRanges: { low: 30000000, medium: 70000000, high: 150000000 },
      bmiCategories: { underweight: 18.5, normal: 23, overweight: 25, obese: 30 },
      loanRates: { mortgage: 0.035, car: 0.045, personal: 0.10 },
      retirementAge: 62,
      dateFormat: 'YYYY-MM-DD',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    ar: {
      locale: 'ar',
      currency: 'SAR',
      taxRate: 0.15,
      incomeRanges: { low: 60000, medium: 150000, high: 300000 },
      bmiCategories: { underweight: 18.5, normal: 25, overweight: 30, obese: 35 },
      loanRates: { mortgage: 0.04, car: 0.05, personal: 0.08 },
      retirementAge: 60,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    hi: {
      locale: 'hi',
      currency: 'INR',
      taxRate: 0.18,
      incomeRanges: { low: 300000, medium: 1000000, high: 2500000 },
      bmiCategories: { underweight: 18.5, normal: 23, overweight: 25, obese: 30 },
      loanRates: { mortgage: 0.085, car: 0.095, personal: 0.14 },
      retirementAge: 60,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    id: {
      locale: 'id',
      currency: 'IDR',
      taxRate: 0.11,
      incomeRanges: { low: 50000000, medium: 150000000, high: 500000000 },
      bmiCategories: { underweight: 18.5, normal: 23, overweight: 25, obese: 30 },
      loanRates: { mortgage: 0.095, car: 0.08, personal: 0.16 },
      retirementAge: 58,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    ru: {
      locale: 'ru',
      currency: 'RUB',
      taxRate: 0.20,
      incomeRanges: { low: 400000, medium: 1200000, high: 3000000 },
      bmiCategories: { underweight: 18.5, normal: 25, overweight: 30, obese: 35 },
      loanRates: { mortgage: 0.12, car: 0.15, personal: 0.20 },
      retirementAge: 65,
      dateFormat: 'DD.MM.YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    it: {
      locale: 'it',
      currency: 'EUR',
      taxRate: 0.22,
      incomeRanges: { low: 20000, medium: 50000, high: 100000 },
      bmiCategories: { underweight: 18.5, normal: 25, overweight: 30, obese: 35 },
      loanRates: { mortgage: 0.03, car: 0.045, personal: 0.10 },
      retirementAge: 67,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    nl: {
      locale: 'nl',
      currency: 'EUR',
      taxRate: 0.21,
      incomeRanges: { low: 30000, medium: 70000, high: 150000 },
      bmiCategories: { underweight: 18.5, normal: 25, overweight: 30, obese: 35 },
      loanRates: { mortgage: 0.025, car: 0.04, personal: 0.08 },
      retirementAge: 67,
      dateFormat: 'DD-MM-YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    vi: {
      locale: 'vi',
      currency: 'VND',
      taxRate: 0.10,
      incomeRanges: { low: 100000000, medium: 300000000, high: 800000000 },
      bmiCategories: { underweight: 18.5, normal: 23, overweight: 25, obese: 30 },
      loanRates: { mortgage: 0.11, car: 0.09, personal: 0.18 },
      retirementAge: 60,
      dateFormat: 'DD/MM/YYYY',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
    fa: {
      locale: 'fa',
      currency: 'IRR',
      taxRate: 0.09,
      incomeRanges: { low: 500000000, medium: 1500000000, high: 5000000000 },
      bmiCategories: { underweight: 18.5, normal: 25, overweight: 30, obese: 35 },
      loanRates: { mortgage: 0.18, car: 0.16, personal: 0.22 },
      retirementAge: 60,
      dateFormat: 'YYYY/MM/DD',
      numberFormat: { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 },
      units: { weight: 'kg', height: 'cm', distance: 'km', temperature: 'celsius' },
    },
  };

  process(
    extractedData: any,
    calculatorId: string,
    category: string,
    locale: Locale
  ): CalculatorSchema {
    const config = this.countryConfigs[locale];
    
    // Process inputs with locale-specific defaults
    const inputs = this.processInputs(extractedData.inputs, config);
    
    // Process formulae
    const formulae = this.processFormulae(extractedData.formulae);
    
    // Process categories with locale-specific ranges
    const categories = this.processCategories(extractedData.categories, calculatorId, config);
    
    // Generate outputs based on formula variables
    const outputs = this.generateOutputs(formulae, calculatorId);
    
    // Determine graph type
    const graphs = this.determineGraphs(categories, outputs, calculatorId);
    
    // Process examples with locale-specific values
    const examples = this.processExamples(extractedData.examples, config);
    
    // Get related calculators
    const related = this.getRelatedCalculators(calculatorId, category);
    
    // Generate disclaimers based on category
    const disclaimers = this.generateDisclaimers(category, locale);

    return {
      id: calculatorId,
      category,
      title: this.generateTitle(calculatorId, locale),
      summary: this.generateSummary(calculatorId, locale),
      localeHints: this.generateLocaleHints(calculatorId, locale),
      inputs,
      formulae,
      categories,
      outputs,
      graphs,
      related,
      examples,
      sources: extractedData.references || [],
      disclaimers,
      updatedAt: new Date().toISOString(),
    };
  }

  private processInputs(inputs: any[], config: CountryConfig): CalculatorInput[] {
    return inputs.map(input => {
      const processed: CalculatorInput = {
        key: input.key,
        label: input.label,
        type: input.type || 'number',
        unit: this.normalizeUnit(input.unit, config),
        validation: {
          min: input.min || null,
          max: input.max || null,
          required: input.required !== false,
        },
      };

      // Add locale-specific placeholders
      if (input.unit === config.currency) {
        processed.placeholder = this.formatCurrency(1000, config);
      }

      // Add unit conversion options
      if (input.unit && this.hasUnitConversions(input.unit)) {
        processed.allowedUnits = this.getUnitConversions(input.unit);
      }

      return processed;
    });
  }

  private processFormulae(formulae: any[]): CalculatorFormula[] {
    const processed: CalculatorFormula[] = [];
    
    // Primary formula
    if (formulae.length > 0) {
      processed.push({
        name: 'primary',
        expression: this.sanitizeFormula(formulae[0].expression),
        variables: formulae[0].variables || [],
        notes: formulae[0].notes,
      });
    }

    // Variant formulae
    for (let i = 1; i < Math.min(formulae.length, 3); i++) {
      if (formulae[i].expression !== formulae[0].expression) {
        processed.push({
          name: `variant-${i}` as any,
          expression: this.sanitizeFormula(formulae[i].expression),
          variables: formulae[i].variables || [],
          notes: formulae[i].notes,
        });
      }
    }

    // If no formula found, create a placeholder
    if (processed.length === 0) {
      processed.push({
        name: 'primary',
        expression: '({value}) => value',
        variables: ['value'],
        notes: ['Formula to be determined'],
      });
    }

    return processed;
  }

  private processCategories(
    categories: any[],
    calculatorId: string,
    config: CountryConfig
  ): CategoryRange[] {
    // Use locale-specific categories for known calculators
    if (calculatorId === 'bmi-calculator' && config.bmiCategories) {
      return [
        {
          label: 'Underweight',
          min: null,
          max: config.bmiCategories.underweight,
          color: '#3B82F6',
          icon: '📉',
        },
        {
          label: 'Normal',
          min: config.bmiCategories.underweight,
          max: config.bmiCategories.normal,
          color: '#10B981',
          icon: '✅',
        },
        {
          label: 'Overweight',
          min: config.bmiCategories.normal,
          max: config.bmiCategories.overweight,
          color: '#F59E0B',
          icon: '⚠️',
        },
        {
          label: 'Obese',
          min: config.bmiCategories.overweight,
          max: null,
          color: '#EF4444',
          icon: '🚨',
        },
      ];
    }

    // Process discovered categories
    return categories.map(cat => ({
      label: cat.label,
      min: cat.min || null,
      max: cat.max || null,
      explanation: cat.explanation,
      color: this.getCategoryColor(cat.label),
      icon: this.getCategoryIcon(cat.label),
    }));
  }

  private generateOutputs(formulae: CalculatorFormula[], calculatorId: string): CalculatorOutput[] {
    const outputs: CalculatorOutput[] = [];
    
    // Generate outputs based on calculator type
    const outputConfigs: Record<string, CalculatorOutput[]> = {
      'loan-calculator': [
        { key: 'monthly_payment', label: 'Monthly Payment', format: 'currency', precision: 2, showInSummary: true },
        { key: 'total_payment', label: 'Total Payment', format: 'currency', precision: 2, showInSummary: true },
        { key: 'total_interest', label: 'Total Interest', format: 'currency', precision: 2, showInSummary: true },
      ],
      'bmi-calculator': [
        { key: 'bmi', label: 'BMI', format: 'number', precision: 1, showInSummary: true },
        { key: 'category', label: 'Category', format: 'text', showInSummary: true },
        { key: 'ideal_weight_range', label: 'Ideal Weight Range', format: 'text', showInSummary: true },
      ],
      // Add more calculator-specific outputs...
    };

    return outputConfigs[calculatorId] || [
      { key: 'result', label: 'Result', format: 'number', precision: 2, showInSummary: true },
    ];
  }

  private determineGraphs(
    categories: CategoryRange[],
    outputs: CalculatorOutput[],
    calculatorId: string
  ): GraphConfig[] {
    const graphs: GraphConfig[] = [];

    // If we have categories, use category-bar
    if (categories.length > 0) {
      graphs.push({
        type: 'category-bar',
        animated: true,
        title: 'Result Analysis',
        showLegend: true,
        categoryMap: categories.reduce((map, cat) => {
          map[cat.label] = { min: cat.min, max: cat.max };
          return map;
        }, {} as Record<string, { min: number | null; max: number | null }>),
      });
    }

    // Add calculator-specific graphs
    if (calculatorId.includes('loan') || calculatorId.includes('mortgage')) {
      graphs.push({
        type: 'donut',
        animated: true,
        title: 'Payment Breakdown',
        showLegend: true,
        colors: ['#3B82F6', '#10B981'],
      });
    }

    // Default to gauge if single numeric output
    if (graphs.length === 0 && outputs.some(o => o.format === 'number')) {
      graphs.push({
        type: 'gauge',
        animated: true,
        title: 'Result',
      });
    }

    return graphs;
  }

  private processExamples(examples: any[], config: CountryConfig): CalculatorExample[] {
    // Generate locale-specific examples
    return examples.map(ex => ({
      name: ex.name || 'Example',
      description: ex.description,
      inputs: this.localizeExampleInputs(ex.inputs, config),
      expectedOutputs: ex.outputs,
      locale: config.locale,
    }));
  }

  private getRelatedCalculators(calculatorId: string, category: string): string[] {
    const relations: Record<string, string[]> = {
      'loan-calculator': ['mortgage-calculator', 'car-loan-calculator', 'debt-payoff'],
      'mortgage-calculator': ['loan-calculator', 'refinance-calculator', 'property-tax'],
      'bmi-calculator': ['calorie-calculator', 'ideal-weight', 'body-fat'],
      'calorie-calculator': ['bmi-calculator', 'macro-calculator', 'protein-intake'],
      // Add more relations...
    };

    return relations[calculatorId] || [];
  }

  private generateDisclaimers(category: string, locale: Locale): string[] {
    const disclaimers: Record<string, Record<string, string[]>> = {
      finance: {
        en: ['Results are estimates. Actual rates may vary. Consult a financial advisor.'],
        th: ['ผลลัพธ์เป็นการประมาณการ อัตราจริงอาจแตกต่าง ควรปรึกษาที่ปรึกษาทางการเงิน'],
        // Add more locales...
      },
      health: {
        en: ['For educational purposes only. Not medical advice. Consult healthcare professionals.'],
        th: ['เพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำทางการแพทย์ ควรปรึกษาแพทย์'],
        // Add more locales...
      },
      // Add more categories...
    };

    const defaultDisclaimer: Partial<Record<Locale, string[]>> = {
      en: ['Results are estimates and may vary based on individual circumstances.'],
      th: ['ผลลัพธ์เป็นการประมาณการและอาจแตกต่างตามสถานการณ์ของแต่ละบุคคล'],
    };

    return disclaimers[category]?.[locale] || 
           disclaimers[category]?.['en'] || 
           defaultDisclaimer[locale] || 
           defaultDisclaimer['en'] ||
           ['Results are estimates and may vary based on individual circumstances.'];
  }

  // Helper methods
  private normalizeUnit(unit: string | undefined, config: CountryConfig): string | undefined {
    if (!unit) return undefined;
    
    const unitMap: Record<string, string> = {
      'dollars': config.currency,
      'pounds': config.units?.weight === 'lbs' ? 'lbs' : 'kg',
      'meters': config.units?.distance === 'miles' ? 'feet' : 'm',
      // Add more mappings...
    };

    return unitMap[unit.toLowerCase()] || unit;
  }

  private formatCurrency(amount: number, config: CountryConfig): string {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
    }).format(amount);
  }

  private hasUnitConversions(unit: string): boolean {
    const convertibleUnits = ['kg', 'lbs', 'cm', 'inches', 'celsius', 'fahrenheit', 'm', 'feet'];
    return convertibleUnits.includes(unit);
  }

  private getUnitConversions(unit: string): string[] {
    const conversions: Record<string, string[]> = {
      'kg': ['kg', 'lbs', 'g', 'oz'],
      'lbs': ['lbs', 'kg', 'oz', 'g'],
      'cm': ['cm', 'inches', 'm', 'feet'],
      'inches': ['inches', 'cm', 'feet', 'm'],
      'celsius': ['celsius', 'fahrenheit', 'kelvin'],
      'fahrenheit': ['fahrenheit', 'celsius', 'kelvin'],
      // Add more...
    };

    return conversions[unit] || [unit];
  }

  private sanitizeFormula(expression: string): string {
    // Ensure formula is safe for evaluation
    return expression
      .replace(/[^a-zA-Z0-9_+\-*/().,\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private getCategoryColor(label: string): string {
    const colors: Record<string, string> = {
      'low': '#3B82F6',
      'normal': '#10B981',
      'medium': '#F59E0B',
      'high': '#EF4444',
      'underweight': '#3B82F6',
      'overweight': '#F59E0B',
      'obese': '#EF4444',
      // Add more...
    };

    return colors[label.toLowerCase()] || '#6B7280';
  }

  private getCategoryIcon(label: string): string {
    const icons: Record<string, string> = {
      'low': '📉',
      'normal': '✅',
      'medium': '📊',
      'high': '📈',
      'underweight': '📉',
      'overweight': '⚠️',
      'obese': '🚨',
      // Add more...
    };

    return icons[label.toLowerCase()] || '📊';
  }

  private localizeExampleInputs(inputs: any, config: CountryConfig): Record<string, any> {
    const localized: Record<string, any> = {};
    
    for (const [key, value] of Object.entries(inputs || {})) {
      if (key.includes('amount') || key.includes('price') || key.includes('salary')) {
        // Use locale-specific currency values
        localized[key] = config.incomeRanges.medium / 12; // Monthly average
      } else if (key.includes('weight')) {
        localized[key] = config.units?.weight === 'kg' ? 70 : 154;
      } else if (key.includes('height')) {
        localized[key] = config.units?.height === 'cm' ? 170 : 67;
      } else {
        localized[key] = value;
      }
    }
    
    return localized;
  }

  private generateTitle(calculatorId: string, locale: Locale): string {
    // This would normally use i18n
    const titles: Record<string, string> = {
      'loan-calculator': 'Loan Calculator',
      'mortgage-calculator': 'Mortgage Calculator',
      'bmi-calculator': 'BMI Calculator',
      // Add more...
    };

    return titles[calculatorId] || calculatorId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  private generateSummary(calculatorId: string, locale: Locale): string {
    return `Calculate ${calculatorId.replace(/-/g, ' ')} with precision using our advanced calculator tailored for ${locale.toUpperCase()}.`;
  }

  private generateLocaleHints(calculatorId: string, locale: Locale): string[] {
    const config = this.countryConfigs[locale];
    return [
      `Currency: ${config.currency}`,
      `Tax Rate: ${(config.taxRate * 100).toFixed(0)}%`,
      `Date Format: ${config.dateFormat || 'MM/DD/YYYY'}`,
      `Units: ${config.units?.weight || 'kg'}, ${config.units?.distance || 'km'}`,
    ];
  }
}

export const schemaProcessor = new SchemaProcessor();