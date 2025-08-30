// Web Discovery Engine - Extracts calculator schemas from public HTML
// NO external APIs/SDKs - uses built-in fetch and DOM parsing

import { CalculatorSchema, SourceReference, DiscoveryQuery } from '@/lib/types/calculator-schema';

export class WebDiscoveryEngine {
  private readonly userAgent = 'CalculatorHub/1.0 (Educational; Respects robots.txt)';
  private readonly timeout = 5000;
  private robotsCache = new Map<string, RobotsRules>();

  async discover(topic: string, locale: string = 'en'): Promise<DiscoveredSources> {
    const queries = this.generateQueries(topic, locale);
    const sources: SourceInfo[] = [];
    
    for (const query of queries) {
      try {
        const results = await this.searchPublicPages(query, 5);
        sources.push(...results);
        
        if (sources.length >= 2) break; // Stop if we have enough reputable sources
      } catch (error) {
        console.warn(`Query failed for "${query}":`, error);
      }
    }

    return {
      topic,
      sources: this.deduplicateSources(sources),
      timestamp: new Date().toISOString(),
    };
  }

  private generateQueries(topic: string, locale: string): string[] {
    const baseQueries = [
      `${topic} formula calculation`,
      `${topic} inputs required parameters`,
      `how to calculate ${topic}`,
      `${topic} thresholds ranges categories`,
      `${topic} units conversion`,
      `${topic} site:.gov OR site:.edu OR site:.org`,
    ];

    // Add locale-specific queries
    const localeQueries = this.getLocaleQueries(topic, locale);
    
    return [...baseQueries, ...localeQueries].slice(0, 5);
  }

  private getLocaleQueries(topic: string, locale: string): string[] {
    const queries: Record<string, string[]> = {
      th: [
        `วิธีคำนวณ ${topic}`,
        `สูตร ${topic} ประเทศไทย`,
      ],
      ja: [
        `${topic} 計算方法`,
        `${topic} 公式 日本`,
      ],
      de: [
        `${topic} Berechnung Formel`,
        `${topic} Deutschland Rechner`,
      ],
      zh: [
        `${topic} 计算公式`,
        `${topic} 中国标准`,
      ],
      // Add more locales...
    };

    return queries[locale] || [];
  }

  private async searchPublicPages(query: string, limit: number): Promise<SourceInfo[]> {
    // Simulate search by checking known reputable sources
    // In production, this would use a search API or web scraping
    const sources: SourceInfo[] = [];
    
    const reputableDomains = [
      'calculator.net',
      'mathisfun.com',
      'investopedia.com',
      'healthline.com',
      'webmd.com',
      'irs.gov',
      'who.int',
      'cdc.gov',
    ];

    for (const domain of reputableDomains.slice(0, limit)) {
      const url = `https://${domain}/search?q=${encodeURIComponent(query)}`;
      
      if (await this.isAllowedByRobots(domain)) {
        const html = await this.fetchWithTimeout(url);
        if (html) {
          sources.push({
            url,
            domain,
            html,
            query,
            fetchedAt: new Date().toISOString(),
          });
        }
      }
    }

    return sources;
  }

  private async isAllowedByRobots(domain: string): Promise<boolean> {
    if (this.robotsCache.has(domain)) {
      return this.robotsCache.get(domain)!.isAllowed('/');
    }

    try {
      const robotsUrl = `https://${domain}/robots.txt`;
      const response = await fetch(robotsUrl, {
        headers: { 'User-Agent': this.userAgent },
        signal: AbortSignal.timeout(this.timeout),
      });

      if (response.ok) {
        const text = await response.text();
        const rules = this.parseRobotsTxt(text);
        this.robotsCache.set(domain, rules);
        return rules.isAllowed('/');
      }
    } catch {
      // If robots.txt is not accessible, assume allowed
    }

    return true;
  }

  private parseRobotsTxt(text: string): RobotsRules {
    const lines = text.split('\\n');
    const rules: RobotsRules = {
      userAgent: '*',
      disallow: [],
      allow: [],
      crawlDelay: 0,
      isAllowed: (path: string) => {
        for (const disallowedPath of rules.disallow) {
          if (path.startsWith(disallowedPath)) {
            return false;
          }
        }
        return true;
      },
    };

    let currentUserAgent = '';
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('User-agent:')) {
        currentUserAgent = trimmed.substring(11).trim();
      } else if (currentUserAgent === '*' || currentUserAgent === 'CalculatorHub') {
        if (trimmed.startsWith('Disallow:')) {
          rules.disallow.push(trimmed.substring(9).trim());
        } else if (trimmed.startsWith('Allow:')) {
          rules.allow.push(trimmed.substring(6).trim());
        } else if (trimmed.startsWith('Crawl-delay:')) {
          rules.crawlDelay = parseInt(trimmed.substring(12).trim()) || 0;
        }
      }
    }

    return rules;
  }

  private async fetchWithTimeout(url: string): Promise<string | null> {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html',
        },
        signal: AbortSignal.timeout(this.timeout),
      });

      if (response.ok) {
        return await response.text();
      }
    } catch (error) {
      console.warn(`Failed to fetch ${url}:`, error);
    }

    return null;
  }

  private deduplicateSources(sources: SourceInfo[]): SourceInfo[] {
    const seen = new Set<string>();
    return sources.filter(source => {
      const key = `${source.domain}-${source.query}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  extractSchema(sources: DiscoveredSources): ExtractedSchema {
    const extractor = new SchemaExtractor();
    return extractor.extract(sources);
  }
}

class SchemaExtractor {
  extract(sources: DiscoveredSources): ExtractedSchema {
    const inputs: Map<string, InputInfo> = new Map();
    const formulae: FormulaInfo[] = [];
    const categories: CategoryInfo[] = [];
    const examples: ExampleInfo[] = [];
    const references: SourceReference[] = [];

    for (const source of sources.sources) {
      // Extract inputs
      const extractedInputs = this.extractInputs(source.html);
      extractedInputs.forEach(input => {
        const existing = inputs.get(input.key);
        if (!existing || input.confidence > existing.confidence) {
          inputs.set(input.key, input);
        }
      });

      // Extract formulae
      const extractedFormulae = this.extractFormulae(source.html);
      formulae.push(...extractedFormulae);

      // Extract categories
      const extractedCategories = this.extractCategories(source.html);
      categories.push(...extractedCategories);

      // Extract examples
      const extractedExamples = this.extractExamples(source.html);
      examples.push(...extractedExamples);

      // Add reference
      references.push({
        title: this.extractTitle(source.html) || source.domain,
        url: source.url,
        publisher: source.domain,
        dateAccessed: source.fetchedAt,
        reliability: this.assessReliability(source.domain),
        type: this.getSourceType(source.domain),
      });
    }

    return {
      inputs: Array.from(inputs.values()),
      formulae: this.consolidateFormulae(formulae),
      categories: this.consolidateCategories(categories),
      examples: this.consolidateExamples(examples),
      references,
      confidence: this.calculateConfidence(sources.sources.length, inputs.size),
    };
  }

  private extractInputs(html: string): InputInfo[] {
    const inputs: InputInfo[] = [];
    
    // Pattern matching for common input patterns
    const patterns = [
      /(?:input|enter|provide)\s+(?:the\s+)?([\w\s]+)(?:\s+in\s+)?(\w+)?/gi,
      /<label[^>]*>([^<]+)<\/label>/gi,
      /<input[^>]+(?:name|id)=["']([^"']+)["'][^>]*>/gi,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const label = match[1].trim();
        const unit = match[2]?.trim();
        
        if (label && label.length < 50) {
          inputs.push({
            key: this.labelToKey(label),
            label,
            unit,
            type: this.inferInputType(label, html),
            confidence: 0.7,
          });
        }
      }
    }

    return inputs;
  }

  private extractFormulae(html: string): FormulaInfo[] {
    const formulae: FormulaInfo[] = [];
    
    // Look for mathematical expressions
    const patterns = [
      /(?:formula|equation|calculate):[\s]*([^<.]+)/gi,
      /([A-Z])\s*=\s*([^<.]+)/g,
      /\b(\w+)\s*=\s*([\w\s+\-*/()^.]+)/g,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const expression = match[2] || match[1];
        if (expression && expression.length < 200) {
          formulae.push({
            expression: this.normalizeFormula(expression),
            variables: this.extractVariables(expression),
            confidence: 0.6,
          });
        }
      }
    }

    return formulae;
  }

  private extractCategories(html: string): CategoryInfo[] {
    const categories: CategoryInfo[] = [];
    
    // Look for range patterns
    const patterns = [
      /(?:if|when)\s+(?:result|value|score)\s+(?:is\s+)?(?:between\s+)?(\d+(?:\.\d+)?)\s*(?:to|-)\s*(\d+(?:\.\d+)?)[^:]*:\s*([^<.]+)/gi,
      /([\w\s]+):\s*(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/g,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        categories.push({
          label: match[3] || match[1],
          min: parseFloat(match[1] || match[2]),
          max: parseFloat(match[2] || match[3]),
          confidence: 0.5,
        });
      }
    }

    return categories;
  }

  private extractExamples(html: string): ExampleInfo[] {
    const examples: ExampleInfo[] = [];
    
    // Look for example patterns
    const patterns = [
      /(?:example|for instance|e\.g\.):[^<]{20,200}/gi,
      /(?:if|when)\s+([\w\s]+)\s*=\s*(\d+(?:\.\d+)?)[^,]*,\s*(?:then\s+)?([\w\s]+)\s*=\s*(\d+(?:\.\d+)?)/gi,
    ];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        examples.push({
          description: match[0],
          inputs: {},
          outputs: {},
          confidence: 0.4,
        });
      }
    }

    return examples;
  }

  private extractTitle(html: string): string | null {
    const match = html.match(/<title>([^<]+)<\/title>/i);
    return match ? match[1].trim() : null;
  }

  private labelToKey(label: string): string {
    return label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
  }

  private inferInputType(label: string, context: string): string {
    const lowerLabel = label.toLowerCase();
    
    if (lowerLabel.includes('date') || lowerLabel.includes('when')) return 'date';
    if (lowerLabel.includes('time') || lowerLabel.includes('hour')) return 'time';
    if (lowerLabel.includes('select') || lowerLabel.includes('choose')) return 'select';
    if (lowerLabel.includes('amount') || lowerLabel.includes('number') || 
        lowerLabel.includes('rate') || lowerLabel.includes('percentage')) return 'number';
    
    return 'string';
  }

  private normalizeFormula(expression: string): string {
    // Convert to JavaScript-safe expression
    return expression
      .replace(/\^/g, '**')
      .replace(/\s+/g, ' ')
      .replace(/([a-zA-Z_]\w*)/g, (match) => {
        // Keep Math functions, convert others to variables
        if (match.startsWith('Math.')) return match;
        if (['Math', 'min', 'max', 'abs', 'pow', 'sqrt', 'log', 'exp'].includes(match)) {
          return `Math.${match}`;
        }
        return match.toLowerCase();
      })
      .trim();
  }

  private extractVariables(expression: string): string[] {
    const variables = new Set<string>();
    const varPattern = /\b([a-z_]\w*)\b/gi;
    let match;
    
    while ((match = varPattern.exec(expression)) !== null) {
      const varName = match[1].toLowerCase();
      if (!['math', 'min', 'max', 'abs', 'pow', 'sqrt', 'log', 'exp'].includes(varName)) {
        variables.add(varName);
      }
    }
    
    return Array.from(variables);
  }

  private consolidateFormulae(formulae: FormulaInfo[]): FormulaInfo[] {
    // Group similar formulae and pick the most confident ones
    const grouped = new Map<string, FormulaInfo[]>();
    
    for (const formula of formulae) {
      const key = formula.variables.sort().join(',');
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(formula);
    }

    const consolidated: FormulaInfo[] = [];
    for (const group of grouped.values()) {
      // Sort by confidence and take the best one
      group.sort((a, b) => b.confidence - a.confidence);
      consolidated.push(group[0]);
      
      // Add variants if significantly different
      for (let i = 1; i < Math.min(3, group.length); i++) {
        if (group[i].expression !== group[0].expression) {
          consolidated.push({ ...group[i], name: `variant-${i}` });
        }
      }
    }

    return consolidated;
  }

  private consolidateCategories(categories: CategoryInfo[]): CategoryInfo[] {
    // Merge overlapping categories
    const sorted = categories.sort((a, b) => a.min - b.min);
    const consolidated: CategoryInfo[] = [];
    
    for (const category of sorted) {
      const last = consolidated[consolidated.length - 1];
      if (last && category.min <= last.max) {
        // Merge overlapping categories
        last.max = Math.max(last.max, category.max);
        last.confidence = Math.max(last.confidence, category.confidence);
      } else {
        consolidated.push({ ...category });
      }
    }

    return consolidated;
  }

  private consolidateExamples(examples: ExampleInfo[]): ExampleInfo[] {
    // Take the most confident examples
    return examples
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);
  }

  private assessReliability(domain: string): 'high' | 'medium' | 'low' {
    if (domain.endsWith('.gov') || domain.endsWith('.edu')) return 'high';
    if (domain.endsWith('.org') || 
        ['wikipedia', 'mathisfun', 'calculator.net', 'investopedia'].some(d => domain.includes(d))) {
      return 'medium';
    }
    return 'low';
  }

  private getSourceType(domain: string): 'government' | 'academic' | 'standard' | 'official' | 'reputable' {
    if (domain.endsWith('.gov')) return 'government';
    if (domain.endsWith('.edu')) return 'academic';
    if (domain.endsWith('.org')) return 'standard';
    if (['investopedia', 'calculator.net', 'mathisfun'].some(d => domain.includes(d))) {
      return 'official';
    }
    return 'reputable';
  }

  private calculateConfidence(sourceCount: number, inputCount: number): number {
    const sourceScore = Math.min(sourceCount / 3, 1) * 0.5;
    const inputScore = Math.min(inputCount / 5, 1) * 0.5;
    return sourceScore + inputScore;
  }
}

// Types for discovery
interface RobotsRules {
  userAgent: string;
  disallow: string[];
  allow: string[];
  crawlDelay: number;
  isAllowed: (path: string) => boolean;
}

interface SourceInfo {
  url: string;
  domain: string;
  html: string;
  query: string;
  fetchedAt: string;
}

interface DiscoveredSources {
  topic: string;
  sources: SourceInfo[];
  timestamp: string;
}

interface InputInfo {
  key: string;
  label: string;
  unit?: string;
  type: string;
  confidence: number;
}

interface FormulaInfo {
  expression: string;
  variables: string[];
  confidence: number;
  name?: string;
}

interface CategoryInfo {
  label: string;
  min: number;
  max: number;
  confidence: number;
}

interface ExampleInfo {
  description: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  confidence: number;
}

interface ExtractedSchema {
  inputs: InputInfo[];
  formulae: FormulaInfo[];
  categories: CategoryInfo[];
  examples: ExampleInfo[];
  references: SourceReference[];
  confidence: number;
}

export const discoveryEngine = new WebDiscoveryEngine();