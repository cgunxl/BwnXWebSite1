'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, CalculatorInput, CalculatorResult } from '@/lib/types/calculator';
import { CalculatorEngine } from '@/lib/calculators/engine';

interface CalculatorFormProps {
  calculator: Calculator;
  locale: string;
  initialInputs?: Record<string, any>;
  onCalculate?: (result: CalculatorResult) => void;
}

export default function CalculatorForm({ 
  calculator, 
  locale, 
  initialInputs = {},
  onCalculate 
}: CalculatorFormProps) {
  const [inputs, setInputs] = useState<Record<string, any>>(initialInputs);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const engine = new CalculatorEngine(calculator, locale);

  // Initialize default values
  useEffect(() => {
    const defaults: Record<string, any> = {};
    for (const input of calculator.inputs) {
      if (input.defaultValue !== undefined && !(input.key in initialInputs)) {
        defaults[input.key] = input.defaultValue;
      }
    }
    
    // Add country-specific defaults
    const countryDefaults = calculator.countrySpecific?.[locale]?.defaultValues;
    if (countryDefaults) {
      Object.assign(defaults, countryDefaults);
    }
    
    setInputs(prev => ({ ...defaults, ...prev }));
  }, [calculator, locale]);

  const handleInputChange = (key: string, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    // Clear error for this field
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrors({});
    
    try {
      const calculationResult = engine.calculate(inputs);
      setResult(calculationResult);
      if (onCalculate) {
        onCalculate(calculationResult);
      }
    } catch (error: any) {
      setErrors({ general: error.message || 'Calculation error' });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
    setErrors({});
  };

  const renderInput = (input: CalculatorInput) => {
    const value = inputs[input.key] || '';
    const error = errors[input.key];

    switch (input.type) {
      case 'number':
        return (
          <div className="relative">
            <input
              type="number"
              id={input.key}
              value={value}
              onChange={(e) => handleInputChange(input.key, e.target.value)}
              placeholder={input.placeholder}
              min={input.min}
              max={input.max}
              step={input.step}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              required={input.required}
            />
            {input.unit && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {input.unit}
              </span>
            )}
          </div>
        );

      case 'select':
        return (
          <select
            id={input.key}
            value={value}
            onChange={(e) => handleInputChange(input.key, e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            required={input.required}
          >
            {input.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {input.options?.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name={input.key}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleInputChange(input.key, e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span>{option.label}</span>
                {option.description && (
                  <span className="text-sm text-gray-500">({option.description})</span>
                )}
              </label>
            ))}
          </div>
        );

      case 'slider':
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{input.min}</span>
              <span className="font-semibold">{value || input.min}</span>
              <span>{input.max}</span>
            </div>
            <input
              type="range"
              id={input.key}
              value={value || input.min}
              onChange={(e) => handleInputChange(input.key, e.target.value)}
              min={input.min}
              max={input.max}
              step={input.step}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        );

      default:
        return (
          <input
            type="text"
            id={input.key}
            value={value}
            onChange={(e) => handleInputChange(input.key, e.target.value)}
            placeholder={input.placeholder}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            required={input.required}
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <form onSubmit={(e) => { e.preventDefault(); handleCalculate(); }} className="space-y-6">
        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculator.inputs.map((input) => (
            <div key={input.key} className="space-y-2">
              <label htmlFor={input.key} className="block text-sm font-medium text-gray-700">
                {input.label}
                {input.required && <span className="text-red-500 ml-1">*</span>}
                {input.tooltip && (
                  <span className="ml-2 text-gray-400 cursor-help" title={input.tooltip}>
                    ⓘ
                  </span>
                )}
              </label>
              {renderInput(input)}
              {errors[input.key] && (
                <p className="text-sm text-red-600">{errors[input.key]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{errors.general}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            type="submit"
            disabled={isCalculating}
            className="flex-1 sm:flex-none px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isCalculating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </span>
            ) : (
              'Calculate'
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Results Display */}
      {result && (
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {calculator.outputs.map((output) => {
              const value = result.outputs[output.key];
              if (value === null || value === undefined) return null;

              return (
                <div key={output.key} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">{output.label}</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">
                    {value}
                  </div>
                  {output.description && (
                    <div className="text-xs text-gray-500 mt-1">
                      {output.description}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}