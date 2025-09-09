'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, CalculationResult } from '@/types/calculator';
import { CalculatorEngineImpl } from '@/lib/calculator-engine';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { Copy, RotateCcw } from 'lucide-react';

interface CalculatorFormProps {
  calculator: Calculator;
  locale: string;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  calculator,
  locale
}) => {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const engine = new CalculatorEngineImpl(calculator);

  const handleInputChange = (inputId: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [inputId]: value
    }));
    
    // Clear error for this input
    if (errors[inputId]) {
      setErrors(prev => ({
        ...prev,
        [inputId]: ''
      }));
    }
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrors({});

    try {
      const validation = engine.validate(inputs);
      if (!validation.valid) {
        const newErrors: Record<string, string> = {};
        validation.errors.forEach(error => {
          // Try to match error to specific input
          const input = calculator.inputs.find(inp => 
            error.toLowerCase().includes(inp.label.toLowerCase())
          );
          if (input) {
            newErrors[input.id] = error;
          }
        });
        setErrors(newErrors);
        return;
      }

      const calculationResults = engine.calculate(inputs);
      setResults(calculationResults);
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: error instanceof Error ? error.message : 'Calculation failed' });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleReset = () => {
    setInputs({});
    setResults(null);
    setErrors({});
  };

  const handleCopyResult = (value: any) => {
    navigator.clipboard.writeText(String(value));
    // You could add a toast notification here
  };

  const getLocalizedLabel = (input: any) => {
    return input.localizedLabel?.[locale] || input.label;
  };

  const getLocalizedOutputLabel = (output: any) => {
    return output.localizedLabel?.[locale] || output.label;
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card variant="glow">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {calculator.localizedContent?.[locale]?.name || calculator.name}
            </h2>
            <p className="text-text-secondary">
              {calculator.localizedContent?.[locale]?.description || calculator.description}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {calculator.inputs.map((input) => (
              <Input
                key={input.id}
                label={getLocalizedLabel(input)}
                type={input.type}
                placeholder={input.placeholder}
                min={input.min}
                max={input.max}
                step={input.step}
                value={inputs[input.id] || ''}
                onChange={(e) => handleInputChange(input.id, e.target.value)}
                error={errors[input.id]}
                unit={input.unit}
                required={input.required}
              />
            ))}
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="flex-1"
            >
              {isCalculating ? 'Calculating...' : 'Calculate'}
            </Button>
            <Button
              variant="ghost"
              onClick={handleReset}
              className="px-6"
            >
              <RotateCcw size={16} className="mr-2" />
              Reset
            </Button>
          </div>

          {errors.general && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400">{errors.general}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Results */}
      {results && (
        <Card variant="glow">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-primary">Results</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {calculator.outputs.map((output) => {
                const value = results[output.id];
                if (value === undefined || value === null) return null;

                return (
                  <div
                    key={output.id}
                    className="p-4 bg-surface-2/50 rounded-xl border border-stroke-soft"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-text-muted">
                          {getLocalizedOutputLabel(output)}
                        </p>
                        <p className="text-2xl font-bold text-accent">
                          {output.format === 'currency' 
                            ? `$${Number(value).toLocaleString()}`
                            : output.format === 'decimal'
                            ? Number(value).toFixed(2)
                            : String(value)
                          }
                          {output.unit && (
                            <span className="text-text-muted text-lg ml-1">
                              {output.unit}
                            </span>
                          )}
                        </p>
                      </div>
                      <Button
                        variant="icon"
                        size="sm"
                        onClick={() => handleCopyResult(value)}
                        className="ml-2"
                      >
                        <Copy size={16} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* Formula */}
      {calculator.formula && (
        <Card>
          <div>
            <h4 className="text-lg font-semibold text-text-primary mb-2">Formula</h4>
            <code className="text-accent text-sm bg-surface-1 p-2 rounded block">
              {calculator.formula}
            </code>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CalculatorForm;