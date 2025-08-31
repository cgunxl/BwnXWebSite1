'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator, CalculatorInput, CalculatorResult } from '@/lib/types/calculator';
import { CalculatorEngine } from '@/lib/calculators/engine';
import { evaluateFormula } from '@/lib/eval';

interface BwnXCalculatorFormProps {
  calculator: Calculator;
  locale: string;
  initialInputs?: Record<string, any>;
}

export default function BwnXCalculatorForm({ 
  calculator, 
  locale, 
  initialInputs = {} 
}: BwnXCalculatorFormProps) {
  const [inputs, setInputs] = useState<Record<string, any>>(initialInputs);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Auto-calculate on input change
  useEffect(() => {
    const hasRequiredInputs = calculator.inputs
      .filter(input => input.required)
      .every(input => inputs[input.key] !== undefined && inputs[input.key] !== '');
    
    if (hasRequiredInputs) {
      handleCalculate();
    }
  }, [inputs]);

  const handleInputChange = (key: string, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    
    // Clear error for this field
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  };

  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    calculator.inputs.forEach(input => {
      const value = inputs[input.key];
      
      if (input.required && (value === undefined || value === '')) {
        newErrors[input.key] = 'This field is required';
      } else if (input.type === 'number' && value !== undefined && value !== '') {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
          newErrors[input.key] = 'Please enter a valid number';
        } else if (input.validation) {
          if (input.validation.min !== undefined && numValue < input.validation.min) {
            newErrors[input.key] = `Minimum value is ${input.validation.min}`;
          }
          if (input.validation.max !== undefined && numValue > input.validation.max) {
            newErrors[input.key] = `Maximum value is ${input.validation.max}`;
          }
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = async () => {
    if (!validateInputs()) return;
    
    setIsCalculating(true);
    setShowResults(false);
    
    try {
      // Simulate calculation delay for smooth animation
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Use the primary formula
      const formula = calculator.formulas?.[0];
      if (!formula) throw new Error('No formula defined');
      
      // Evaluate the formula
      const formulaResult = evaluateFormula(formula.expression, inputs);
      
      // Ensure outputs is an object
      const outputs = typeof formulaResult === 'object' && formulaResult !== null 
        ? formulaResult 
        : { result: formulaResult };
      
      const calculationResult: CalculatorResult = {
        inputs: { ...inputs },
        outputs,
        timestamp: new Date().toISOString(),
        locale,
        shareUrl: `${window.location.origin}/${locale}/calculator/${calculator.slug}?${new URLSearchParams(inputs).toString()}`
      };
      
      setResult(calculationResult);
      setShowResults(true);
      
      // Scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'An error occurred during calculation' });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
    setErrors({});
    setShowResults(false);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    
    const csv = [
      'Field,Value',
      ...Object.entries(result.inputs).map(([key, value]) => `${key},${value}`),
      '',
      'Results',
      ...Object.entries(result.outputs).map(([key, value]) => `${key},${value}`)
    ].join('\\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${calculator.slug}-results.csv`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (result?.shareUrl) {
      navigator.clipboard.writeText(result.shareUrl);
      // Show toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slideUp';
      toast.textContent = 'Link copied to clipboard!';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const renderInput = (input: CalculatorInput, index: number) => {
    const value = inputs[input.key] ?? input.defaultValue ?? '';
    const error = errors[input.key];
    
    return (
      <div 
        key={input.key}
        className="animate-slideIn"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <label 
          htmlFor={input.key}
          className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          {input.label}
          {input.required && <span className="text-red-500 ml-1">*</span>}
          {input.unit && (
            <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
              ({input.unit})
            </span>
          )}
        </label>
        
        {input.type === 'select' ? (
          <select
            id={input.key}
            value={value}
            onChange={(e) => handleInputChange(input.key, e.target.value)}
            className={`
              w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
              ${error 
                ? 'border-red-500 focus:border-red-600' 
                : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
              }
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              focus:outline-none focus:ring-4 focus:ring-blue-500/20
            `}
          >
            <option value="">Select...</option>
            {input.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : input.type === 'radio' ? (
          <div className="flex gap-4">
            {input.options?.map(option => (
              <label key={option.value} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name={input.key}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleInputChange(input.key, e.target.value)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <div className="relative">
            <input
              id={input.key}
              type={input.type}
              value={value}
              onChange={(e) => handleInputChange(input.key, e.target.value)}
              placeholder={input.placeholder}
              step={input.step}
              min={input.min}
              max={input.max}
              className={`
                w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
                ${error 
                  ? 'border-red-500 focus:border-red-600' 
                  : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400'
                }
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                focus:outline-none focus:ring-4 focus:ring-blue-500/20
                ${input.type === 'number' ? 'pr-12' : ''}
              `}
            />
            {input.type === 'number' && input.unit && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 dark:text-gray-400">
                {input.unit}
              </span>
            )}
          </div>
        )}
        
        {error && (
          <p className="mt-2 text-sm text-red-500 animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Calculator Title Card */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl animate-bounce">{calculator.icon}</div>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {calculator.localizedContent?.[locale]?.title || calculator.id}
            </h1>
            <p className="text-blue-100">
              {calculator.localizedContent?.[locale]?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
          <span className="text-3xl">📝</span>
          Enter Your Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculator.inputs.map((input, index) => renderInput(input, index))}
        </div>
        
        {errors.general && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-shake">
            <p className="text-red-600 dark:text-red-400">{errors.general}</p>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="
              px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl
              font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
              flex items-center gap-3
            "
          >
            {isCalculating ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Calculating...
              </>
            ) : (
              <>
                <span className="text-2xl">🧮</span>
                Calculate
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="
              px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
              rounded-xl font-bold text-lg shadow-lg hover:shadow-xl
              transform hover:scale-105 transition-all duration-300
              flex items-center gap-3
            "
          >
            <span className="text-2xl">🔄</span>
            Reset
          </button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && result && (
        <div 
          ref={resultsRef}
          className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-3xl shadow-2xl p-8 animate-slideUp"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-3">
            <span className="text-4xl animate-pulse">✨</span>
            Your Results
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(result.outputs).map(([key, value], index) => {
              const output = calculator.outputs.find(o => o.key === key);
              return (
                <div
                  key={key}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {output?.label || key}
                  </p>
                  <p className={`text-3xl font-bold ${output?.primary ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                    {formatOutput(value, output?.format, locale)}
                  </p>
                  {output?.unit && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {output.unit}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={handleDownloadCSV}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>📥</span> Download CSV
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>🖨️</span> Print
            </button>
            <button
              onClick={handleCopyLink}
              className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>🔗</span> Copy Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatOutput(value: any, format?: string, locale: string = 'en'): string {
  if (format === 'currency') {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: getCurrencyForLocale(locale)
    }).format(value);
  }
  
  if (format === 'percentage') {
    return `${value.toFixed(2)}%`;
  }
  
  if (format === 'number') {
    return new Intl.NumberFormat(locale).format(value);
  }
  
  return String(value);
}

function getCurrencyForLocale(locale: string): string {
  const currencies: Record<string, string> = {
    en: 'USD',
    th: 'THB',
    ja: 'JPY',
    de: 'EUR',
    zh: 'CNY',
    // Add more...
  };
  return currencies[locale] || 'USD';
}