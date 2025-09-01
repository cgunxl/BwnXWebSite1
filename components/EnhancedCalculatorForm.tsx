'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Calculator, CalculatorInput, CalculatorResult } from '@/lib/types/calculator';
import { CalculatorEngine } from '@/lib/calculators/engine';
// No external animation libraries - using CSS animations only

interface EnhancedCalculatorFormProps {
  calculator: Calculator;
  locale: string;
  initialInputs?: Record<string, any>;
  onCalculate?: (result: CalculatorResult) => void;
}

export default function EnhancedCalculatorForm({ 
  calculator, 
  locale, 
  initialInputs = {},
  onCalculate 
}: EnhancedCalculatorFormProps) {
  const [inputs, setInputs] = useState<Record<string, any>>(initialInputs);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Use static CalculatorEngine API (no constructor)

  // Auto-calculate on input change
  useEffect(() => {
    const hasRequiredInputs = calculator.inputs.every(input => 
      !input.required || (inputs[input.key] !== undefined && inputs[input.key] !== '')
    );
    
    if (hasRequiredInputs && Object.keys(inputs).length > 0) {
      handleCalculate();
    }
  }, [inputs]);

  const handleInputChange = (key: string, value: any) => {
    setInputs(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrors({});
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // Smooth animation
      const outputs = CalculatorEngine.calculate(calculator, inputs);
      const calculationResult: CalculatorResult = {
        inputs: { ...inputs },
        outputs,
        timestamp: new Date().toISOString(),
        locale,
        shareUrl: typeof window !== 'undefined'
          ? `${window.location.origin}${window.location.pathname}?${new URLSearchParams(inputs as any).toString()}`
          : ''
      };
      setResult(calculationResult);
      setShowResults(true);
      
      if (onCalculate) {
        onCalculate(calculationResult);
      }
      
      // Smooth scroll to results
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
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
    setShowResults(false);
  };

  const handleDownloadCSV = () => {
    if (!result) return;
    
    const csv = [
      ['Field', 'Value'],
      ...Object.entries(inputs).map(([key, value]) => [key, value]),
      ['---', '---'],
      ...Object.entries(result.outputs).map(([key, value]) => [key, value])
    ].map(row => row.join(',')).join('\\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${calculator.slug}-${new Date().toISOString()}.csv`;
    a.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const params = new URLSearchParams();
    Object.entries(inputs).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, value.toString());
      }
    });
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const renderInput = (input: CalculatorInput, index: number) => {
    const value = inputs[input.key] ?? '';
    const error = errors[input.key];

    return (
      <div
        key={input.key}
        className="mb-6 animate-slideIn"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="relative">
          <label 
            htmlFor={input.key}
            className={`block text-sm font-medium mb-2 transition-colors ${
              error ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            {input.label || input.key}
            {input.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {input.type === 'number' && (
            <div className="relative group">
              <input
                type="number"
                id={input.key}
                value={value}
                onChange={(e) => handleInputChange(input.key, e.target.value)}
                onFocus={(e) => e.target.select()}
                placeholder={input.placeholder || `Enter ${input.label?.toLowerCase() || 'value'}`}
                min={input.min}
                max={input.max}
                step={input.step}
                className={`w-full px-4 py-3 pr-12 border rounded-xl transition-all duration-300
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  hover:border-blue-400 calc-button
                  ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600'}
                  ${isCalculating ? 'animate-pulse' : ''}
                `}
                required={input.required}
              />
              {input.unit && (
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  {input.unit}
                </span>
              )}
              {input.tooltip && (
                <div className="absolute left-0 -top-8 px-2 py-1 bg-gray-800 text-white text-xs rounded
                  opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {input.tooltip}
                </div>
              )}
            </div>
          )}

          {input.type === 'select' && (
            <select
              id={input.key}
              value={value}
              onChange={(e) => handleInputChange(input.key, e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl transition-all duration-300
                focus:ring-2 focus:ring-blue-500 focus:border-transparent
                hover:border-blue-400 calc-button appearance-none
                ${error ? 'border-red-500 bg-red-50' : 'border-gray-300 dark:border-gray-600'}
              `}
              required={input.required}
            >
              <option value="">Select {input.label}</option>
              {input.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {input.type === 'slider' && (
            <div className="space-y-2">
              <input
                type="range"
                id={input.key}
                value={value || input.min || 0}
                onChange={(e) => handleInputChange(input.key, e.target.value)}
                min={input.min}
                max={input.max}
                step={input.step}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                  dark:bg-gray-700 accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{input.min}</span>
                <span className="font-bold text-blue-500">{value || input.min || 0}</span>
                <span>{input.max}</span>
              </div>
            </div>
          )}

          {error && (
            <p className="mt-1 text-sm text-red-500 animate-fadeIn">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 animate-fadeIn">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculator.inputs.map((input, index) => renderInput(input, index))}
        </div>

        {errors.general && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-slideIn">
            <p className="text-red-600 dark:text-red-400">{errors.general}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 animate-slideUp" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl
              font-semibold transition-all duration-300 transform hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed calc-button
              shadow-lg hover:shadow-xl"
          >
            {isCalculating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Calculating...
              </span>
            ) : (
              <>
                <span className="mr-2">🧮</span>
                Calculate
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
              text-gray-700 dark:text-gray-200 rounded-xl font-semibold
              transition-all duration-300 transform hover:scale-105 calc-button"
          >
            <span className="mr-2">🔄</span>
            Reset
          </button>

          {result && (
            <>
              <button
                onClick={handleDownloadCSV}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl
                  font-semibold transition-all duration-300 transform hover:scale-105 calc-button"
              >
                <span className="mr-2">📥</span>
                Download CSV
              </button>

              <button
                onClick={handlePrint}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl
                  font-semibold transition-all duration-300 transform hover:scale-105 calc-button"
              >
                <span className="mr-2">🖨️</span>
                Print
              </button>

              <button
                onClick={handleCopyLink}
                className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl
                  font-semibold transition-all duration-300 transform hover:scale-105 calc-button
                  relative"
              >
                <span className="mr-2">🔗</span>
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Results Section */}
      {showResults && result && (
        <div
          ref={resultsRef}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20
            rounded-2xl shadow-xl p-6 md:p-8 border border-blue-200 dark:border-blue-800 animate-scaleIn"
        >
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              📊 Results
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(result.outputs).map(([key, value], index) => (
                <div
                  key={key}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md hover-lift animate-slideIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {key.replace(/_/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase())}
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 number-transition">
                    {typeof value === 'number' 
                      ? new Intl.NumberFormat(locale).format(value)
                      : value}
                  </p>
                  {result.units?.[key] && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {result.units[key]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Category Bar Visualization */}
            {result.category && (
              <div className="mt-8 animate-slideUp" style={{ animationDelay: '0.5s' }}>
                <h4 className="text-lg font-semibold mb-4">Category Analysis</h4>
                <div className="category-bar">
                  <div 
                    className="category-marker"
                    style={{ left: `${result.categoryPercentage || 50}%` }}
                  />
                  <div className="category-labels">
                    <span>Low</span>
                    <span>Normal</span>
                    <span>High</span>
                    <span>Very High</span>
                  </div>
                </div>
                <p className="text-center mt-4 text-lg font-medium">
                  {result.category}
                </p>
              </div>
            )}

            {/* Detailed Breakdown */}
            {result.breakdown && (
              <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl animate-fadeIn" style={{ animationDelay: '0.6s' }}>
                <h4 className="font-semibold mb-3">Detailed Breakdown</h4>
                <div className="space-y-2">
                  {Object.entries(result.breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
      )}
    </div>
  );
}