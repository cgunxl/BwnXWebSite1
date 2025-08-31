/**
 * Calculator Engine - Core calculation logic for BwnXCalculator
 * Evaluates calculator formulas safely and returns results
 */

import { Calculator, CalculatorFormula } from '@/lib/types/calculator';

export class CalculatorEngine {
  /**
   * Execute a calculator formula with given inputs
   */
  static calculate(
    calculator: Calculator,
    inputs: Record<string, any>
  ): Record<string, any> {
    try {
      // Get the primary formula (first one) or the one marked as primary
      const formula = calculator.formulas?.find(f => f.key === 'primary' || f.key === 'calculate') 
                      || calculator.formulas?.[0];
      
      if (!formula) {
        throw new Error('No formula defined for this calculator');
      }

      // Execute the formula
      return this.executeFormula(formula, inputs);
    } catch (error) {
      console.error('Calculation error:', error);
      throw new Error(`Calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Execute a single formula
   */
  private static executeFormula(
    formula: CalculatorFormula,
    inputs: Record<string, any>
  ): Record<string, any> {
    try {
      // Create a safe evaluation context
      const safeContext = this.createSafeContext(inputs);
      
      // Build the function body
      const functionBody = `
        'use strict';
        const { ${Object.keys(inputs).join(', ')} } = inputs;
        ${formula.expression}
      `;

      // Create and execute the function
      const calculationFunction = new Function('inputs', 'Math', 'Date', functionBody);
      const result = calculationFunction(safeContext, Math, Date);

      // Ensure we return an object
      if (typeof result === 'object' && result !== null) {
        return result;
      }

      // If result is a primitive, wrap it
      return { result };
    } catch (error) {
      console.error('Formula execution error:', error);
      throw new Error(`Formula execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create a safe context for formula evaluation
   */
  private static createSafeContext(inputs: Record<string, any>): Record<string, any> {
    // Clone inputs to prevent modification
    const safeInputs = { ...inputs };

    // Convert string numbers to actual numbers where appropriate
    Object.keys(safeInputs).forEach(key => {
      const value = safeInputs[key];
      if (typeof value === 'string' && !isNaN(Number(value)) && value !== '') {
        safeInputs[key] = Number(value);
      }
    });

    return safeInputs;
  }

  /**
   * Validate inputs against calculator requirements
   */
  static validateInputs(
    calculator: Calculator,
    inputs: Record<string, any>
  ): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    calculator.inputs.forEach(input => {
      const value = inputs[input.key];

      // Check required fields
      if (input.required && (value === undefined || value === null || value === '')) {
        errors[input.key] = 'This field is required';
        return;
      }

      // Skip validation for optional empty fields
      if (!input.required && (value === undefined || value === null || value === '')) {
        return;
      }

      // Type-specific validation
      switch (input.type) {
        case 'number':
        case 'slider':
        case 'range':
          const numValue = Number(value);
          if (isNaN(numValue)) {
            errors[input.key] = 'Please enter a valid number';
          } else {
            if (input.min !== undefined && numValue < input.min) {
              errors[input.key] = `Minimum value is ${input.min}`;
            }
            if (input.max !== undefined && numValue > input.max) {
              errors[input.key] = `Maximum value is ${input.max}`;
            }
          }
          break;

        case 'date':
          if (!value || !Date.parse(value)) {
            errors[input.key] = 'Please enter a valid date';
          }
          break;

        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors[input.key] = 'Please enter a valid email address';
          }
          break;

        case 'url':
          try {
            new URL(value);
          } catch {
            errors[input.key] = 'Please enter a valid URL';
          }
          break;

        case 'tel':
          const phoneRegex = /^[\d\s\-\+\(\)]+$/;
          if (!phoneRegex.test(value)) {
            errors[input.key] = 'Please enter a valid phone number';
          }
          break;
      }

      // Check conditional visibility
      if (input.dependsOn && input.showWhen) {
        const shouldShow = this.checkCondition(input.showWhen, inputs);
        if (!shouldShow && input.required) {
          // Remove error if field is hidden
          delete errors[input.key];
        }
      }
    });

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Check if a condition is met for conditional fields
   */
  private static checkCondition(
    condition: Record<string, any>,
    inputs: Record<string, any>
  ): boolean {
    return Object.entries(condition).every(([key, value]) => {
      const inputValue = inputs[key];
      if (Array.isArray(value)) {
        return value.includes(inputValue);
      }
      return inputValue === value;
    });
  }

  /**
   * Format output value based on format type
   */
  static formatOutput(value: any, format?: string, decimals?: number): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    switch (format) {
      case 'currency':
        const num = Number(value);
        if (isNaN(num)) return 'N/A';
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: decimals ?? 2,
          maximumFractionDigits: decimals ?? 2
        }).format(num);

      case 'percentage':
        const pct = Number(value);
        if (isNaN(pct)) return 'N/A';
        return `${pct.toFixed(decimals ?? 2)}%`;

      case 'number':
        const n = Number(value);
        if (isNaN(n)) return 'N/A';
        return n.toFixed(decimals ?? 2);

      case 'text':
      default:
        return String(value);
    }
  }

  /**
   * Get default values for calculator inputs
   */
  static getDefaultValues(calculator: Calculator): Record<string, any> {
    const defaults: Record<string, any> = {};

    calculator.inputs.forEach(input => {
      if (input.defaultValue !== undefined) {
        defaults[input.key] = input.defaultValue;
      } else {
        // Set sensible defaults based on type
        switch (input.type) {
          case 'number':
          case 'slider':
          case 'range':
            defaults[input.key] = input.min ?? 0;
            break;
          case 'boolean':
          case 'checkbox':
            defaults[input.key] = false;
            break;
          case 'date':
            defaults[input.key] = new Date().toISOString().split('T')[0];
            break;
          case 'select':
          case 'radio':
            if (input.options && input.options.length > 0) {
              defaults[input.key] = input.options[0].value;
            }
            break;
          default:
            defaults[input.key] = '';
        }
      }
    });

    return defaults;
  }

  /**
   * Check if a field should be visible based on conditions
   */
  static isFieldVisible(
    input: any,
    currentInputs: Record<string, any>
  ): boolean {
    if (!input.dependsOn || !input.showWhen) {
      return true;
    }

    return this.checkCondition(input.showWhen, currentInputs);
  }
}

export default CalculatorEngine;