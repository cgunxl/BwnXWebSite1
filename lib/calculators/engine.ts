// Calculator engine for processing formulas and calculations
import { Calculator, CalculatorInput, CalculatorOutput, CalculatorResult } from '@/lib/types/calculator';

export class CalculatorEngine {
  private calculator: Calculator;
  private locale: string;

  constructor(calculator: Calculator, locale: string = 'en') {
    this.calculator = calculator;
    this.locale = locale;
  }

  /**
   * Process calculator inputs and return results
   */
  calculate(inputs: Record<string, any>): CalculatorResult {
    const processedInputs = this.preprocessInputs(inputs);
    const outputs = this.executeFormulas(processedInputs);
    const postProcessedOutputs = this.postprocessOutputs(outputs, processedInputs);

    return {
      inputs: processedInputs,
      outputs: postProcessedOutputs,
      timestamp: new Date().toISOString(),
      locale: this.locale,
      shareUrl: this.generateShareUrl(processedInputs),
    };
  }

  /**
   * Preprocess and validate inputs
   */
  private preprocessInputs(inputs: Record<string, any>): Record<string, any> {
    const processed: Record<string, any> = {};

    for (const input of this.calculator.inputs) {
      let value = inputs[input.key];

      // Apply default value if not provided
      if (value === undefined || value === null || value === '') {
        if (input.defaultValue !== undefined) {
          value = input.defaultValue;
        } else if (input.required) {
          throw new Error(`Required input ${input.key} is missing`);
        }
      }

      // Type conversion
      if (input.type === 'number' && typeof value === 'string') {
        value = parseFloat(value);
        if (isNaN(value)) {
          throw new Error(`Invalid number for ${input.key}`);
        }
      }

      // Validation
      if (input.validation) {
        const validation = input.validation;
        if (validation.required && !value) {
          throw new Error(validation.message || `${input.label || input.key} is required`);
        }
        if (validation.min !== undefined && Number(value) < validation.min) {
          throw new Error(validation.message || `${input.label || input.key} must be at least ${validation.min}`);
        }
        if (validation.max !== undefined && Number(value) > validation.max) {
          throw new Error(validation.message || `${input.label || input.key} must be at most ${validation.max}`);
        }
        if (validation.pattern && !new RegExp(validation.pattern).test(String(value))) {
          throw new Error(validation.message || `${input.label || input.key} format is invalid`);
        }
      }

      // Range validation for numbers
      if (input.type === 'number') {
        if (input.min !== undefined && value < input.min) {
          throw new Error(`${input.label} must be at least ${input.min}`);
        }
        if (input.max !== undefined && value > input.max) {
          throw new Error(`${input.label} must be at most ${input.max}`);
        }
      }

      processed[input.key] = value;
    }

    return processed;
  }

  /**
   * Execute calculator formulas
   */
  private executeFormulas(inputs: Record<string, any>): Record<string, any> {
    const outputs: Record<string, any> = {};

    // Execute each formula
    for (const formula of this.calculator.formulas) {
      try {
        const result = this.evaluateFormula(formula.expression, inputs);
        outputs[formula.name] = result;
      } catch (error) {
        console.error(`Error executing formula ${formula.name}:`, error);
        outputs[formula.name] = null;
      }
    }

    // Special calculations based on calculator type
    if (this.calculator.id === 'bmi-calculator') {
      outputs.bmi = this.calculateBMI(inputs);
      outputs.category = this.getBMICategory(outputs.bmi, this.locale);
      outputs.healthRisk = this.getBMIHealthRisk(outputs.bmi, this.locale);
      outputs.idealWeight = this.getIdealWeightRange(inputs.height, inputs.unitSystem);
    } else if (this.calculator.id === 'loan-calculator') {
      outputs.payment = this.calculateLoanPayment(inputs);
      outputs.totalPayment = outputs.payment * this.getNumberOfPayments(inputs);
      outputs.totalInterest = outputs.totalPayment - inputs.principal;
      outputs.payoffDate = this.calculatePayoffDate(inputs);
    }
    // Add more calculator-specific logic...

    return outputs;
  }

  /**
   * Calculate BMI
   */
  private calculateBMI(inputs: Record<string, any>): number {
    const { weight, height, unitSystem } = inputs;
    
    if (unitSystem === 'imperial') {
      // BMI = (weight in pounds × 703) / (height in inches)²
      return (weight * 703) / Math.pow(height, 2);
    } else {
      // BMI = weight in kg / (height in meters)²
      const heightInMeters = height / 100;
      return weight / Math.pow(heightInMeters, 2);
    }
  }

  /**
   * Get BMI category based on locale-specific standards
   */
  private getBMICategory(bmi: number, locale: string): string {
    const standards = this.calculator.countrySpecific?.[locale]?.standards || 
                     this.calculator.countrySpecific?.['en']?.standards;

    if (!standards) {
      // Default WHO standards
      if (bmi < 18.5) return 'Underweight';
      if (bmi < 25) return 'Normal Weight';
      if (bmi < 30) return 'Overweight';
      return 'Obese';
    }

    // Use country-specific standards
    if (locale === 'th' || locale === 'ja' || locale === 'zh' || locale === 'ko') {
      // Asian standards
      if (bmi < 18.5) return locale === 'th' ? 'ผอมเกินไป' : 'Underweight';
      if (bmi < 23) return locale === 'th' ? 'น้ำหนักปกติ' : 'Normal Weight';
      if (bmi < 25) return locale === 'th' ? 'น้ำหนักเกิน' : 'Overweight';
      if (bmi < 30) return locale === 'th' ? 'อ้วนระดับ 1' : 'Obese Class I';
      return locale === 'th' ? 'อ้วนระดับ 2' : 'Obese Class II';
    }

    // Western standards
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal Weight';
    if (bmi < 30) return 'Overweight';
    if (bmi < 35) return 'Obese Class I';
    if (bmi < 40) return 'Obese Class II';
    return 'Obese Class III';
  }

  /**
   * Get BMI health risk level
   */
  private getBMIHealthRisk(bmi: number, locale: string): string {
    if (locale === 'th') {
      if (bmi < 18.5 || bmi >= 30) return 'สูง';
      if (bmi >= 25) return 'ปานกลาง';
      return 'ต่ำ';
    }

    if (bmi < 18.5 || bmi >= 30) return 'High';
    if (bmi >= 25) return 'Moderate';
    return 'Low';
  }

  /**
   * Get ideal weight range
   */
  private getIdealWeightRange(height: number, unitSystem: string): string {
    if (unitSystem === 'imperial') {
      // Convert to metric for calculation
      const heightCm = height * 2.54;
      const minWeight = 18.5 * Math.pow(heightCm / 100, 2) * 2.205;
      const maxWeight = 24.9 * Math.pow(heightCm / 100, 2) * 2.205;
      return `${minWeight.toFixed(0)}-${maxWeight.toFixed(0)} lbs`;
    } else {
      const heightM = height / 100;
      const minWeight = 18.5 * Math.pow(heightM, 2);
      const maxWeight = 24.9 * Math.pow(heightM, 2);
      return `${minWeight.toFixed(0)}-${maxWeight.toFixed(0)} kg`;
    }
  }

  /**
   * Calculate loan payment
   */
  private calculateLoanPayment(inputs: Record<string, any>): number {
    const { principal, interestRate, term, paymentFrequency } = inputs;
    
    let periodsPerYear = 12; // monthly by default
    if (paymentFrequency === 'biweekly') periodsPerYear = 26;
    if (paymentFrequency === 'weekly') periodsPerYear = 52;
    
    const rate = interestRate / 100 / periodsPerYear;
    const numberOfPayments = term * periodsPerYear;
    
    if (rate === 0) {
      return principal / numberOfPayments;
    }
    
    const payment = principal * (rate * Math.pow(1 + rate, numberOfPayments)) / 
                   (Math.pow(1 + rate, numberOfPayments) - 1);
    
    return payment;
  }

  /**
   * Get number of payments for loan
   */
  private getNumberOfPayments(inputs: Record<string, any>): number {
    const { term, paymentFrequency } = inputs;
    
    let periodsPerYear = 12;
    if (paymentFrequency === 'biweekly') periodsPerYear = 26;
    if (paymentFrequency === 'weekly') periodsPerYear = 52;
    
    return term * periodsPerYear;
  }

  /**
   * Calculate loan payoff date
   */
  private calculatePayoffDate(inputs: Record<string, any>): string {
    const numberOfPayments = this.getNumberOfPayments(inputs);
    const { paymentFrequency } = inputs;
    
    const today = new Date();
    const payoffDate = new Date(today);
    
    if (paymentFrequency === 'monthly') {
      payoffDate.setMonth(payoffDate.getMonth() + numberOfPayments);
    } else if (paymentFrequency === 'biweekly') {
      payoffDate.setDate(payoffDate.getDate() + (numberOfPayments * 14));
    } else if (paymentFrequency === 'weekly') {
      payoffDate.setDate(payoffDate.getDate() + (numberOfPayments * 7));
    }
    
    return payoffDate.toLocaleDateString(this.locale, { 
      year: 'numeric', 
      month: 'long' 
    });
  }

  /**
   * Evaluate a formula expression safely
   */
  private evaluateFormula(expression: string, inputs: Record<string, any>): any {
    try {
      // Create a safe evaluation context
      const func = new Function(...Object.keys(inputs), `return ${expression}`);
      return func(...Object.values(inputs));
    } catch (error) {
      console.error('Formula evaluation error:', error);
      return null;
    }
  }

  /**
   * Validate input against a rule
   */
  private validateInput(value: any, validation: any): boolean {
    if (validation.required && !value) return false;
    if (validation.min !== undefined && Number(value) < validation.min) return false;
    if (validation.max !== undefined && Number(value) > validation.max) return false;
    if (validation.pattern && !new RegExp(validation.pattern).test(String(value))) return false;
    return true;
  }

  /**
   * Post-process outputs for display
   */
  private postprocessOutputs(outputs: Record<string, any>, inputs: Record<string, any>): Record<string, any> {
    const processed: Record<string, any> = {};

    for (const output of this.calculator.outputs) {
      let value = outputs[output.key];

      if (value !== null && value !== undefined) {
        // Format based on output type
        if (output.format === 'currency') {
          const currency = this.calculator.countrySpecific?.[this.locale]?.currency || 'USD';
          value = this.formatCurrency(value, currency);
        } else if (output.format === 'percentage') {
          value = `${(value * 100).toFixed(output.precision || 2)}%`;
        } else if (output.format === 'number' && output.precision !== undefined) {
          value = parseFloat(value).toFixed(output.precision);
        }
      }

      processed[output.key] = value;
    }

    return processed;
  }

  /**
   * Format currency based on locale
   */
  private formatCurrency(value: number, currency: string): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  }

  /**
   * Generate shareable URL with inputs
   */
  private generateShareUrl(inputs: Record<string, any>): string {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(inputs)) {
      if (value !== null && value !== undefined && value !== '') {
        params.append(key, value.toString());
      }
    }
    return `?${params.toString()}`;
  }
}