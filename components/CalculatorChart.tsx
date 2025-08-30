'use client';

import React from 'react';
import { CalculatorOutput, VisualizationType } from '@/lib/types/calculator';

interface CalculatorChartProps {
  output: CalculatorOutput;
  value: any;
  locale: string;
}

export default function CalculatorChart({ output, value, locale }: CalculatorChartProps) {
  if (!output.visualization || value === null || value === undefined) {
    return null;
  }

  const renderGauge = () => {
    // For BMI, loan amounts, etc.
    const min = 0;
    const max = output.key === 'bmi' ? 40 : 100;
    const percentage = ((value - min) / (max - min)) * 100;
    
    // Color based on value ranges
    let color = 'bg-green-500';
    if (output.key === 'bmi') {
      if (value < 18.5) color = 'bg-yellow-500';
      else if (value < 25) color = 'bg-green-500';
      else if (value < 30) color = 'bg-orange-500';
      else color = 'bg-red-500';
    }

    return (
      <div className="relative w-full h-48">
        <svg className="w-full h-full" viewBox="0 0 200 120">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Value arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 2.51} 251`}
            className={`${color.replace('bg-', 'text-')} transition-all duration-1000 ease-out`}
          />
          {/* Center value */}
          <text
            x="100"
            y="90"
            textAnchor="middle"
            className="text-3xl font-bold fill-current"
          >
            {typeof value === 'number' ? value.toFixed(1) : value}
          </text>
          <text
            x="100"
            y="110"
            textAnchor="middle"
            className="text-sm fill-gray-500"
          >
            {output.unit || output.label}
          </text>
        </svg>
      </div>
    );
  };

  const renderCategoryBar = () => {
    // For BMI categories, risk levels, etc.
    const categories = getCategoriesForOutput(output.key, locale);
    const currentCategory = getCurrentCategory(value, output.key, locale);

    return (
      <div className="w-full space-y-4">
        <div className="relative h-12 bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 via-orange-400 to-red-400 rounded-lg overflow-hidden">
          {/* Category divisions */}
          {categories.map((cat, index) => (
            <div
              key={index}
              className="absolute top-0 h-full border-r border-white/50"
              style={{ left: `${cat.position}%` }}
            >
              <span className="absolute -top-6 text-xs whitespace-nowrap transform -translate-x-1/2">
                {cat.label}
              </span>
            </div>
          ))}
          
          {/* Current value marker */}
          <div
            className="absolute top-0 h-full w-1 bg-gray-900 transition-all duration-1000 ease-out"
            style={{ left: `${getPositionPercentage(value, output.key)}%` }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-2 py-1 rounded text-sm font-semibold whitespace-nowrap">
              {typeof value === 'number' ? value.toFixed(1) : value}
            </div>
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-sm font-medium whitespace-nowrap">
              {currentCategory}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProgressBar = () => {
    const percentage = Math.min(100, Math.max(0, value));
    
    return (
      <div className="w-full">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{output.label}</span>
          <span>{value}%</span>
        </div>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const renderBarChart = () => {
    // Simple bar chart for single values
    const maxValue = output.key === 'totalInterest' ? value * 1.5 : 100;
    const percentage = (value / maxValue) * 100;

    return (
      <div className="w-full h-32 flex items-end">
        <div className="flex-1 relative">
          <div
            className="w-full bg-blue-500 rounded-t transition-all duration-1000 ease-out"
            style={{ height: `${percentage}%` }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold">
              {typeof value === 'number' ? formatNumber(value, locale) : value}
            </div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600">
            {output.label}
          </div>
        </div>
      </div>
    );
  };

  // Helper functions
  const getCategoriesForOutput = (key: string, locale: string) => {
    if (key === 'bmi' || key === 'category') {
      if (locale === 'th') {
        return [
          { label: 'ผอม', position: 0 },
          { label: 'ปกติ', position: 25 },
          { label: 'ท้วม', position: 50 },
          { label: 'อ้วน 1', position: 70 },
          { label: 'อ้วน 2', position: 90 },
        ];
      }
      return [
        { label: 'Under', position: 0 },
        { label: 'Normal', position: 25 },
        { label: 'Over', position: 50 },
        { label: 'Obese I', position: 70 },
        { label: 'Obese II', position: 90 },
      ];
    }
    return [];
  };

  const getCurrentCategory = (value: number, key: string, locale: string) => {
    if (key === 'bmi' || key === 'category') {
      if (typeof value === 'string') return value;
      
      if (locale === 'th') {
        if (value < 18.5) return 'ผอมเกินไป';
        if (value < 23) return 'น้ำหนักปกติ';
        if (value < 25) return 'น้ำหนักเกิน';
        if (value < 30) return 'อ้วนระดับ 1';
        return 'อ้วนระดับ 2';
      }
      
      if (value < 18.5) return 'Underweight';
      if (value < 25) return 'Normal Weight';
      if (value < 30) return 'Overweight';
      if (value < 35) return 'Obese Class I';
      return 'Obese Class II';
    }
    return '';
  };

  const getPositionPercentage = (value: number, key: string) => {
    if (key === 'bmi' || key === 'category') {
      if (typeof value === 'number') {
        // Map BMI value to percentage position
        if (value < 15) return (value / 15) * 20;
        if (value < 18.5) return 20 + ((value - 15) / 3.5) * 10;
        if (value < 25) return 30 + ((value - 18.5) / 6.5) * 30;
        if (value < 30) return 60 + ((value - 25) / 5) * 20;
        if (value < 40) return 80 + ((value - 30) / 10) * 20;
        return 95;
      }
    }
    return 50;
  };

  const formatNumber = (num: number, locale: string) => {
    return new Intl.NumberFormat(locale).format(num);
  };

  // Render based on visualization type
  switch (output.visualization) {
    case 'gauge':
      return renderGauge();
    case 'category-bar':
      return renderCategoryBar();
    case 'progress':
      return renderProgressBar();
    case 'bar':
      return renderBarChart();
    default:
      return null;
  }
}