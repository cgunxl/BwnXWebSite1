'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calculator, CalculatorInput, CalculatorResult } from '@/lib/types/calculator';
import { CalculatorEngine } from '@/lib/calculators/engine';

interface BwnXCalculatorFormProps {
  calculator: Calculator;
  locale: string;
  initialInputs?: Record<string, any>;
  onCalculate?: (result: CalculatorResult) => void;
}

export default function BwnXCalculatorForm({ 
  calculator, 
  locale, 
  initialInputs = {},
  onCalculate 
}: BwnXCalculatorFormProps) {
  const [inputs, setInputs] = useState<Record<string, any>>(initialInputs);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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
        inputs,
        outputs,
        timestamp: new Date().toISOString(),
        locale,
        category: calculator.category,
        shareUrl: `${window.location.origin}/${locale}/${calculator.category}/${calculator.slug}`
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
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'Calculation failed. Please check your inputs.' });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setInputs({});
    setResult(null);
    setShowResults(false);
    setErrors({});
  };

  const handleCopy = async (value: any, key: string) => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopiedField(key);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    
    const shareData = {
      title: `${calculator.localizedContent[locale]?.title || calculator.id} - BwnXCalculator`,
      text: `Check out my calculation results!`,
      url: result.shareUrl
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      handleCopy(result.shareUrl, 'shareUrl');
    }
  };

  const renderInput = (input: CalculatorInput) => {
    const value = inputs[input.key] || input.defaultValue || '';
    const error = errors[input.key];
    
    switch (input.type) {
      case 'select':
        return (
          <div key={input.key} className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              {input.label}
              {input.required && <span className="text-accent ml-1">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(input.key, e.target.value)}
              className="input w-full"
            >
              <option value="">{input.placeholder || 'Select...'}</option>
              {input.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        );
      
      case 'radio':
        return (
          <div key={input.key} className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              {input.label}
              {input.required && <span className="text-accent ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {input.options?.map(option => (
                <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
                  <input
                    type="radio"
                    name={input.key}
                    value={option.value}
                    checked={value === option.value}
                    onChange={(e) => handleInputChange(input.key, e.target.value)}
                    className="w-4 h-4 text-accent bg-bg-raised border-stroke-soft focus:ring-accent focus:ring-2"
                  />
                  <span className="text-text-primary group-hover:text-accent transition-colors">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        );
      
      case 'slider':
        return (
          <div key={input.key} className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">
                {input.label}
                {input.required && <span className="text-accent ml-1">*</span>}
              </label>
              <span className="text-lg font-semibold text-accent">
                {value} {input.unit}
              </span>
            </div>
            <input
              type="range"
              min={input.min || 0}
              max={input.max || 100}
              step={input.step || 1}
              value={value}
              onChange={(e) => handleInputChange(input.key, parseFloat(e.target.value))}
              className="w-full h-2 bg-surface-1 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-text-muted">
              <span>{input.min || 0}</span>
              <span>{input.max || 100}</span>
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        );
      
      default:
        return (
          <div key={input.key} className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary">
              {input.label}
              {input.required && <span className="text-accent ml-1">*</span>}
            </label>
            <div className="relative">
              <input
                type={input.type}
                value={value}
                onChange={(e) => handleInputChange(input.key, 
                  input.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
                )}
                placeholder={input.placeholder}
                min={input.min}
                max={input.max}
                step={input.step}
                className="input w-full pr-12"
              />
              {input.unit && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                  {input.unit}
                </span>
              )}
            </div>
            {input.tooltip && (
              <p className="text-xs text-text-muted">{input.tooltip}</p>
            )}
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-6 text-text-primary">
          Enter Your Values
        </h3>
        
        {errors.general && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            {errors.general}
          </div>
        )}
        
        <div className="grid gap-6 md:grid-cols-2">
          {calculator.inputs.map(renderInput)}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="btn btn-primary flex items-center space-x-2"
          >
            {isCalculating ? (
              <>
                <div className="w-4 h-4 border-2 border-bg-deep border-t-transparent rounded-full animate-spin" />
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <span>🧮</span>
                <span>Calculate</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleReset}
            className="btn btn-ghost"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results */}
      {showResults && result && (
        <div ref={resultsRef} className="result-box animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-text-primary">
              Results
            </h3>
            <button
              onClick={handleShare}
              className="btn-icon"
              title="Share results"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a3 3 0 10-5.464 0m5.464 0a3 3 0 10-5.464 0M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {calculator.outputs.map(output => {
              const value = result.outputs[output.key];
              if (value === undefined) return null;
              
              return (
                <div key={output.key} className="group">
                  <div className="flex justify-between items-center p-4 bg-surface-1/20 rounded-lg border border-accent/20 hover:border-accent/40 transition-colors">
                    <div>
                      <p className="text-sm text-text-secondary mb-1">{output.label}</p>
                      <p className="text-2xl font-bold text-accent">
                        {output.prefix}{typeof value === 'number' ? value.toLocaleString() : value}{output.suffix}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(value, output.key)}
                      className="btn-icon opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy value"
                    >
                      {copiedField === output.key ? (
                        <span className="text-accent">✓</span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          
          {result.timestamp && (
            <p className="text-xs text-text-muted mt-4">
              Calculated at: {new Date(result.timestamp).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}