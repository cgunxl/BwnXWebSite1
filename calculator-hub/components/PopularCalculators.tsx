'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface PopularCalculatorsProps {
  calculators: any[];
  locale: string;
}

export default function PopularCalculators({ calculators, locale }: PopularCalculatorsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const getCalculatorIcon = (slug: string) => {
    const icons: Record<string, string> = {
      'bmi-calculator': '⚖️',
      'loan-calculator': '💰',
      'mortgage-calculator': '🏠',
      'tax-calculator': '📊',
      'calorie-calculator': '🍎',
      'retirement-calculator': '👴',
      'compound-interest': '📈',
      'currency-converter': '💱',
      'pregnancy-due-date': '👶',
      'salary-calculator': '💵',
      'car-loan-calculator': '🚗',
      'bmr-calculator': '🔥',
      'roi-calculator': '📊',
      'discount-calculator': '🏷️',
      'tip-calculator': '💳',
      'savings-goal': '🎯',
      'credit-card-interest': '💳',
      'inflation-calculator': '📉',
      'body-fat': '💪',
      'ideal-weight': '⚖️',
      'protein-intake': '🥩',
      'water-intake': '💧',
      'tdee-calculator': '⚡',
      'paycheck-calculator': '💰',
      'vat-calculator': '🧾',
      'sales-tax': '🛒',
      'crypto-profit': '₿',
      'stock-return': '📊',
      'break-even': '⚖️',
      'profit-margin': '💹',
    };
    return icons[slug] || '🧮';
  };

  const getCalculatorDescription = (slug: string, locale: string) => {
    const descriptions: Record<string, Record<string, string>> = {
      'bmi-calculator': {
        en: 'Calculate your Body Mass Index',
        th: 'คำนวณดัชนีมวลกาย',
      },
      'loan-calculator': {
        en: 'Calculate loan payments and interest',
        th: 'คำนวณค่างวดและดอกเบี้ยเงินกู้',
      },
      'mortgage-calculator': {
        en: 'Calculate mortgage payments',
        th: 'คำนวณค่างวดบ้าน',
      },
      // Add more descriptions...
    };
    return descriptions[slug]?.[locale] || descriptions[slug]?.['en'] || 'Professional calculator tool';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {calculators.map((calc) => (
        <Link
          key={calc.id}
          href={`/${locale}/calculator/${calc.slug}`}
          className="group relative"
          onMouseEnter={() => setHoveredCard(calc.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={`
            bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300
            transform hover:scale-105 cursor-pointer border-2 border-transparent
            ${hoveredCard === calc.id ? 'border-blue-500' : 'hover:border-gray-200'}
          `}>
            <div className="text-3xl mb-2 text-center">
              {getCalculatorIcon(calc.slug)}
            </div>
            <h3 className="text-sm font-semibold text-gray-900 text-center mb-1 line-clamp-2">
              {calc.name}
            </h3>
            <p className="text-xs text-gray-500 text-center line-clamp-2">
              {getCalculatorDescription(calc.slug, locale)}
            </p>
          </div>

          {/* Hover Tooltip */}
          {hoveredCard === calc.id && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                Click to open {calc.name}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                  <div className="border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}