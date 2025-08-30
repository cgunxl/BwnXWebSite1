// Intelligent Cross-linking System - Automatically suggest related calculators
import { Calculator } from '@/lib/types/calculator';

interface CrossLink {
  calculatorId: string;
  reason: string;
  relevanceScore: number;
  sharedVariables: string[];
  category: string;
}

export class CrossLinkingSystem {
  // Variable relationships map
  private readonly variableRelations: Record<string, string[]> = {
    // Physical measurements
    height: ['weight', 'bmi', 'body_fat', 'ideal_weight', 'calories'],
    weight: ['height', 'bmi', 'body_fat', 'ideal_weight', 'calories', 'protein'],
    age: ['bmr', 'calories', 'heart_rate', 'life_expectancy', 'retirement'],
    
    // Financial
    principal: ['interest', 'payment', 'loan', 'mortgage', 'amortization'],
    interest_rate: ['principal', 'payment', 'compound', 'savings', 'investment'],
    income: ['tax', 'salary', 'budget', 'savings', 'retirement'],
    expenses: ['budget', 'savings', 'profit', 'break_even'],
    
    // Time
    years: ['months', 'days', 'compound', 'depreciation', 'investment'],
    date: ['age', 'countdown', 'pregnancy', 'deadline'],
    
    // Academic
    gpa: ['grade', 'credits', 'cgpa', 'percentage'],
    score: ['percentage', 'grade', 'rank', 'percentile'],
    
    // Engineering
    voltage: ['current', 'resistance', 'power', 'energy'],
    current: ['voltage', 'resistance', 'power', 'energy'],
    resistance: ['voltage', 'current', 'power'],
    
    // Business
    revenue: ['profit', 'margin', 'break_even', 'roi'],
    cost: ['profit', 'margin', 'markup', 'break_even'],
    profit: ['revenue', 'cost', 'margin', 'roi']
  };

  // Category clusters
  private readonly categoryCluster: Record<string, string[]> = {
    finance: ['loan', 'mortgage', 'investment', 'tax', 'savings', 'retirement', 'interest', 'amortization'],
    health: ['bmi', 'calories', 'body-fat', 'water', 'protein', 'tdee', 'ideal-weight', 'pregnancy'],
    education: ['gpa', 'grade', 'percentage', 'cgpa', 'statistics', 'probability'],
    engineering: ['ohms-law', 'power', 'voltage', 'resistance', 'capacitor', 'inductor'],
    business: ['roi', 'break-even', 'profit-margin', 'markup', 'revenue', 'inventory'],
    lifestyle: ['age', 'date', 'time', 'zodiac', 'birthday', 'countdown'],
    conversion: ['length', 'weight', 'temperature', 'area', 'volume', 'speed']
  };

  // Topic similarity map
  private readonly topicSimilarity: Record<string, string[]> = {
    'loan-calculator': ['mortgage-calculator', 'car-loan-calculator', 'amortization-calculator', 'refinance-calculator'],
    'bmi-calculator': ['body-fat-calculator', 'ideal-weight-calculator', 'calorie-calculator', 'tdee-calculator'],
    'tax-calculator': ['salary-calculator', 'paycheck-calculator', 'income-tax-calculator', 'vat-calculator'],
    'age-calculator': ['date-calculator', 'birthday-calculator', 'zodiac-calculator', 'life-expectancy-calculator'],
    'percentage-calculator': ['ratio-calculator', 'proportion-calculator', 'fraction-calculator'],
    'roi-calculator': ['investment-calculator', 'profit-margin-calculator', 'cagr-calculator'],
    'pregnancy-calculator': ['ovulation-calculator', 'conception-calculator', 'baby-gender-calculator']
  };

  // Find related calculators for a given calculator
  findRelatedCalculators(
    calculator: Calculator,
    allCalculators: Calculator[],
    maxResults: number = 6
  ): CrossLink[] {
    const links: CrossLink[] = [];
    const calculatorInputKeys = calculator.inputs.map(i => i.key.toLowerCase());
    
    for (const otherCalc of allCalculators) {
      if (otherCalc.id === calculator.id) continue;
      
      const crossLink = this.calculateRelevance(calculator, otherCalc, calculatorInputKeys);
      if (crossLink.relevanceScore > 0) {
        links.push(crossLink);
      }
    }
    
    // Sort by relevance score and return top results
    return links
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxResults);
  }

  private calculateRelevance(
    calculator: Calculator,
    otherCalculator: Calculator,
    calculatorInputKeys: string[]
  ): CrossLink {
    let relevanceScore = 0;
    const sharedVariables: string[] = [];
    let reason = '';
    
    // Check for shared variables
    const otherInputKeys = otherCalculator.inputs.map(i => i.key.toLowerCase());
    for (const key of calculatorInputKeys) {
      if (otherInputKeys.includes(key)) {
        sharedVariables.push(key);
        relevanceScore += 20;
      }
      
      // Check variable relations
      const related = this.variableRelations[key] || [];
      for (const relatedVar of related) {
        if (otherInputKeys.includes(relatedVar)) {
          relevanceScore += 10;
        }
      }
    }
    
    // Check category similarity
    if (calculator.category === otherCalculator.category) {
      relevanceScore += 15;
    }
    
    // Check if in same cluster
    for (const [cluster, items] of Object.entries(this.categoryCluster)) {
      if (items.includes(calculator.slug) && items.includes(otherCalculator.slug)) {
        relevanceScore += 25;
      }
    }
    
    // Check topic similarity
    const similarTopics = this.topicSimilarity[calculator.id] || [];
    if (similarTopics.includes(otherCalculator.id)) {
      relevanceScore += 30;
    }
    
    // Generate reason
    if (sharedVariables.length > 0) {
      reason = `Shares ${sharedVariables.join(', ')}`;
    } else if (calculator.category === otherCalculator.category) {
      reason = `Related ${calculator.category} calculator`;
    } else if (relevanceScore > 0) {
      reason = 'Complementary calculation';
    }
    
    return {
      calculatorId: otherCalculator.id,
      reason,
      relevanceScore,
      sharedVariables,
      category: otherCalculator.category
    };
  }

  // Get contextual recommendations based on user journey
  getContextualRecommendations(
    currentCalculator: string,
    userHistory: string[],
    allCalculators: Calculator[]
  ): CrossLink[] {
    const recommendations: CrossLink[] = [];
    
    // Analyze user journey patterns
    const patterns = this.analyzeUserJourney(userHistory);
    
    // Financial journey: loan → mortgage → refinance
    if (patterns.includes('finance') && currentCalculator.includes('loan')) {
      recommendations.push({
        calculatorId: 'mortgage-calculator',
        reason: 'Next step: Home loan planning',
        relevanceScore: 90,
        sharedVariables: ['principal', 'interest_rate', 'term'],
        category: 'finance'
      });
    }
    
    // Health journey: bmi → calories → meal planning
    if (patterns.includes('health') && currentCalculator.includes('bmi')) {
      recommendations.push({
        calculatorId: 'calorie-calculator',
        reason: 'Next step: Daily calorie needs',
        relevanceScore: 85,
        sharedVariables: ['weight', 'height', 'age'],
        category: 'health'
      });
    }
    
    // Education journey: gpa → grade needed → scholarship
    if (patterns.includes('education') && currentCalculator.includes('gpa')) {
      recommendations.push({
        calculatorId: 'grade-needed-calculator',
        reason: 'Plan your target grades',
        relevanceScore: 80,
        sharedVariables: ['current_grade', 'target_grade'],
        category: 'education'
      });
    }
    
    return recommendations;
  }

  private analyzeUserJourney(history: string[]): string[] {
    const patterns: string[] = [];
    const categoryCount: Record<string, number> = {};
    
    for (const calcId of history) {
      // Extract category from calculator ID
      for (const [category, items] of Object.entries(this.categoryCluster)) {
        if (items.some(item => calcId.includes(item))) {
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        }
      }
    }
    
    // Find dominant patterns
    for (const [category, count] of Object.entries(categoryCount)) {
      if (count >= 2) {
        patterns.push(category);
      }
    }
    
    return patterns;
  }

  // Generate smart suggestions with reasons
  generateSmartSuggestions(
    calculator: Calculator,
    userContext?: {
      timeOfYear?: string;
      location?: string;
      previousCalculations?: string[];
    }
  ): CrossLink[] {
    const suggestions: CrossLink[] = [];
    
    // Seasonal suggestions
    if (userContext?.timeOfYear) {
      if (userContext.timeOfYear === 'tax-season') {
        suggestions.push({
          calculatorId: 'tax-calculator',
          reason: '🎯 Tax season is here',
          relevanceScore: 95,
          sharedVariables: ['income'],
          category: 'finance'
        });
      } else if (userContext.timeOfYear === 'new-year') {
        suggestions.push({
          calculatorId: 'bmi-calculator',
          reason: '🎯 New Year fitness goals',
          relevanceScore: 85,
          sharedVariables: [],
          category: 'health'
        });
      }
    }
    
    // Location-based suggestions
    if (userContext?.location) {
      // Country-specific calculators
      if (userContext.location === 'US') {
        suggestions.push({
          calculatorId: '401k-calculator',
          reason: '🇺🇸 US retirement planning',
          relevanceScore: 80,
          sharedVariables: ['income', 'age'],
          category: 'finance'
        });
      } else if (userContext.location === 'TH') {
        suggestions.push({
          calculatorId: 'thailand-tax-calculator',
          reason: '🇹🇭 Thai tax calculation',
          relevanceScore: 80,
          sharedVariables: ['income'],
          category: 'finance'
        });
      }
    }
    
    // Based on calculation type
    if (calculator.category === 'finance' && calculator.id.includes('loan')) {
      suggestions.push({
        calculatorId: 'amortization-calculator',
        reason: '📊 See payment breakdown',
        relevanceScore: 90,
        sharedVariables: ['principal', 'interest_rate', 'term'],
        category: 'finance'
      });
      
      suggestions.push({
        calculatorId: 'debt-payoff-calculator',
        reason: '💡 Optimize debt payment',
        relevanceScore: 75,
        sharedVariables: ['principal', 'payment'],
        category: 'finance'
      });
    }
    
    return suggestions;
  }

  // Get complementary calculators (tools that work well together)
  getComplementaryCalculators(calculatorId: string): string[] {
    const complements: Record<string, string[]> = {
      'bmi-calculator': ['calorie-calculator', 'body-fat-calculator', 'ideal-weight-calculator'],
      'loan-calculator': ['amortization-calculator', 'refinance-calculator', 'debt-payoff-calculator'],
      'tax-calculator': ['salary-calculator', 'paycheck-calculator', 'deduction-calculator'],
      'pregnancy-calculator': ['ovulation-calculator', 'baby-name-generator', 'pregnancy-weight-calculator'],
      'gpa-calculator': ['grade-needed-calculator', 'cgpa-calculator', 'class-rank-calculator'],
      'roi-calculator': ['break-even-calculator', 'profit-margin-calculator', 'payback-period-calculator']
    };
    
    return complements[calculatorId] || [];
  }
}

// Export singleton instance
export const crossLinkingSystem = new CrossLinkingSystem();