// Web Discovery Engine - Auto-fetch and extract calculator schemas from public sources
import { CalculatorSchema } from '@/lib/types/calculator-schema';
import { Locale } from '@/lib/i18n/config';

interface DiscoveryResult {
  schema: CalculatorSchema;
  sources: string[];
  confidence: number;
  timestamp: string;
}

export class DiscoveryEngine {
  private readonly userAgent = 'BwnXCalculator/1.0 (Educational Calculator Discovery)';
  private readonly respectRobots = true;
  private cache = new Map<string, DiscoveryResult>();

  async discoverCalculator(
    topic: string,
    locale: Locale = 'en'
  ): Promise<DiscoveryResult | null> {
    const cacheKey = `${locale}-${topic}`;
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)!;
      const age = Date.now() - new Date(cached.timestamp).getTime();
      if (age < 24 * 60 * 60 * 1000) { // 24 hours
        return cached;
      }
    }

    try {
      // Generate search queries
      const queries = this.generateQueries(topic, locale);
      
      // Simulate discovery (in production, would fetch real pages)
      const discoveredData = await this.simulateDiscovery(topic, queries);
      
      // Extract schema from discovered data
      const schema = this.extractSchema(topic, discoveredData, locale);
      
      // Build result
      const result: DiscoveryResult = {
        schema,
        sources: discoveredData.sources,
        confidence: this.calculateConfidence(schema),
        timestamp: new Date().toISOString()
      };
      
      // Cache result
      this.cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error(`Discovery failed for ${topic}:`, error);
      return null;
    }
  }

  private generateQueries(topic: string, locale: Locale): string[] {
    const baseQueries = [
      `${topic} formula calculation`,
      `how to calculate ${topic}`,
      `${topic} calculator inputs`,
      `${topic} thresholds ranges`,
      `${topic} units conversion`
    ];

    // Add locale-specific queries
    if (locale === 'th') {
      baseQueries.push(`คำนวณ${topic}`, `สูตร${topic}`);
    } else if (locale === 'ja') {
      baseQueries.push(`${topic}計算`, `${topic}公式`);
    }

    return baseQueries;
  }

  private async simulateDiscovery(topic: string, queries: string[]): Promise<any> {
    // In production, this would fetch real web pages
    // For now, return simulated discovery data based on topic
    
    const patterns = {
      loan: {
        inputs: ['principal', 'interest_rate', 'term'],
        formula: 'PMT = P * (r * (1 + r)^n) / ((1 + r)^n - 1)',
        units: { principal: 'currency', interest_rate: 'percentage', term: 'years' },
        categories: [
          { label: 'Excellent', min: 0, max: 15 },
          { label: 'Good', min: 15, max: 25 },
          { label: 'Fair', min: 25, max: 35 },
          { label: 'Poor', min: 35, max: 100 }
        ],
        sources: [
          'https://www.investopedia.com/loan-calculator',
          'https://www.calculator.net/loan-calculator.html'
        ]
      },
      bmi: {
        inputs: ['weight', 'height'],
        formula: 'BMI = weight / (height^2)',
        units: { weight: 'kg', height: 'm' },
        categories: [
          { label: 'Underweight', min: 0, max: 18.5 },
          { label: 'Normal', min: 18.5, max: 25 },
          { label: 'Overweight', min: 25, max: 30 },
          { label: 'Obese', min: 30, max: 100 }
        ],
        sources: [
          'https://www.cdc.gov/healthyweight/assessing/bmi',
          'https://www.who.int/health-topics/obesity'
        ]
      },
      tax: {
        inputs: ['income', 'filing_status', 'deductions'],
        formula: 'Tax = Income * TaxRate - Deductions',
        units: { income: 'currency', deductions: 'currency' },
        categories: [
          { label: '10% Bracket', min: 0, max: 11000 },
          { label: '12% Bracket', min: 11000, max: 44725 },
          { label: '22% Bracket', min: 44725, max: 95375 },
          { label: '24% Bracket', min: 95375, max: 182050 }
        ],
        sources: [
          'https://www.irs.gov/individuals/tax-calculator',
          'https://taxfoundation.org/tax-calculator'
        ]
      }
    };

    // Extract pattern based on topic keywords
    let pattern = patterns.loan; // default
    
    if (topic.includes('bmi') || topic.includes('weight')) {
      pattern = patterns.bmi;
    } else if (topic.includes('tax') || topic.includes('income')) {
      pattern = patterns.tax;
    }

    return {
      ...pattern,
      topic,
      queries
    };
  }

  private extractSchema(topic: string, data: any, locale: Locale): CalculatorSchema {
    // Convert discovered data to schema format
    const schema: CalculatorSchema = {
      id: this.slugify(topic),
      title: this.titleCase(topic),
      summary: `Calculate ${topic} with accurate formulas and real-time results`,
      inputs: this.normalizeInputs(data.inputs, data.units),
      formulae: [
        {
          name: 'primary',
          expression: this.convertToFunction(data.formula),
          variables: data.inputs || [],
          notes: [`Formula: ${data.formula}`]
        }
      ],
      categories: data.categories || [],
      outputs: this.generateOutputs(topic),
      graphs: [
        {
          type: 'auto',
          animated: true
        }
      ],
      related: this.findRelatedCalculators(topic),
      examples: this.generateExamples(topic, data.inputs),
      sources: data.sources.map((url: string) => ({
        title: this.extractDomain(url),
        url,
        publisher: this.extractDomain(url),
        dateAccessed: new Date().toISOString()
      }))
    };

    return schema;
  }

  private normalizeInputs(inputs: string[], units: any): any[] {
    if (!inputs) return [];
    
    return inputs.map(input => ({
      key: input,
      label: this.titleCase(input.replace(/_/g, ' ')),
      type: 'number',
      unit: units?.[input] || null,
      required: true,
      validation: {
        required: true,
        min: 0
      }
    }));
  }

  private generateOutputs(topic: string): any[] {
    const outputs = [
      {
        key: 'result',
        label: 'Result',
        unit: null,
        precision: 2
      }
    ];

    // Add topic-specific outputs
    if (topic.includes('loan')) {
      outputs.push(
        { key: 'total_payment', label: 'Total Payment', unit: 'currency', precision: 2 },
        { key: 'total_interest', label: 'Total Interest', unit: 'currency', precision: 2 }
      );
    } else if (topic.includes('bmi')) {
      outputs.push(
        { key: 'category', label: 'Category', unit: null, precision: 0 },
        { key: 'ideal_weight', label: 'Ideal Weight Range', unit: 'kg', precision: 1 }
      );
    }

    return outputs;
  }

  private convertToFunction(formula: string): string {
    // Convert mathematical formula to JavaScript function
    // This is simplified - real implementation would be more robust
    return `({${this.extractVariables(formula).join(', ')}}) => {
      // ${formula}
      return { result: 0 }; // Placeholder
    }`;
  }

  private extractVariables(formula: string): string[] {
    // Extract variable names from formula
    const matches = formula.match(/[a-z_]+/gi) || [];
    return [...new Set(matches)].filter(v => 
      !['sin', 'cos', 'tan', 'log', 'exp', 'sqrt', 'pow'].includes(v.toLowerCase())
    );
  }

  private findRelatedCalculators(topic: string): string[] {
    const relations: Record<string, string[]> = {
      loan: ['mortgage-calculator', 'interest-calculator', 'amortization'],
      bmi: ['calorie-calculator', 'ideal-weight', 'body-fat'],
      tax: ['salary-calculator', 'paycheck-calculator', 'deduction-calculator']
    };

    for (const [key, related] of Object.entries(relations)) {
      if (topic.includes(key)) {
        return related;
      }
    }

    return [];
  }

  private generateExamples(topic: string, inputs: string[]): any[] {
    // Generate example calculations
    const examples = [];
    
    if (topic.includes('loan')) {
      examples.push({
        name: 'Small Personal Loan',
        inputs: { principal: 10000, interest_rate: 5, term: 3 },
        expectedOutputs: { monthly_payment: 299.71 }
      });
    } else if (topic.includes('bmi')) {
      examples.push({
        name: 'Average Adult',
        inputs: { weight: 70, height: 1.75 },
        expectedOutputs: { bmi: 22.86, category: 'Normal' }
      });
    }

    return examples;
  }

  private calculateConfidence(schema: CalculatorSchema): number {
    let confidence = 0;
    
    // Check completeness
    if (schema.inputs.length > 0) confidence += 20;
    if (schema.formulae.length > 0) confidence += 20;
    if (schema.categories && schema.categories.length > 0) confidence += 15;
    if (schema.outputs.length > 0) confidence += 15;
    if (schema.sources.length >= 2) confidence += 20;
    if (schema.examples && schema.examples.length > 0) confidence += 10;
    
    return Math.min(100, confidence);
  }

  private slugify(text: string): string {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private titleCase(text: string): string {
    return text.replace(/\b\w/g, l => l.toUpperCase());
  }

  private extractDomain(url: string): string {
    try {
      const domain = new URL(url).hostname;
      return domain.replace('www.', '');
    } catch {
      return 'Unknown Source';
    }
  }

  // Check robots.txt compliance
  async checkRobots(url: string): Promise<boolean> {
    if (!this.respectRobots) return true;
    
    try {
      const robotsUrl = new URL(url).origin + '/robots.txt';
      // In production, fetch and parse robots.txt
      // For now, assume allowed
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const discoveryEngine = new DiscoveryEngine();