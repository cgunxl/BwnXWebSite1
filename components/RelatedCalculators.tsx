import React from 'react';
import Link from 'next/link';
import { Calculator } from '@/lib/types/calculator';
import { getCalculatorBySlug } from '@/lib/calculators/registry';

interface RelatedCalculatorsProps {
  currentCalculator: Calculator;
  locale: string;
}

export default function RelatedCalculators({ currentCalculator, locale }: RelatedCalculatorsProps) {
  // Get related calculators
  const relatedSlugs = currentCalculator.relatedCalculators || [];
  
  // Add smart recommendations based on category and tags
  const smartRecommendations = getSmartRecommendations(currentCalculator);
  const allRelated = [...new Set([...relatedSlugs, ...smartRecommendations])].slice(0, 6);

  const relatedCalculators = allRelated
    .map(slug => getCalculatorBySlug(slug))
    .filter(Boolean);

  if (relatedCalculators.length === 0) {
    return null;
  }

  const title = locale === 'th' ? 'เครื่องคิดเลขที่เกี่ยวข้อง' : 'Related Calculators';
  const subtitle = locale === 'th' 
    ? 'ลองใช้เครื่องมือเหล่านี้ด้วย' 
    : 'You might also find these useful';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
      
      <div className="space-y-3">
        {relatedCalculators.map((calc) => (
          <Link
            key={calc.id}
            href={`/${locale}/calculator/${calc.slug}`}
            className="block group"
          >
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-2xl">{getCalculatorIcon(calc.slug)}</span>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {calc.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  {getShortDescription(calc.slug, locale)}
                </p>
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Cross-category suggestions */}
      {currentCalculator.category === 'health' && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-3">
            {locale === 'th' ? '💡 คำแนะนำพิเศษ' : '💡 Special Recommendations'}
          </p>
          <div className="space-y-2 text-sm">
            {currentCalculator.id === 'bmi-calculator' && (
              <>
                <SuggestionLink
                  href={`/${locale}/calculator/calorie-calculator`}
                  text={locale === 'th' 
                    ? 'คำนวณแคลอรี่ที่ต้องการต่อวัน' 
                    : 'Calculate daily calorie needs'}
                />
                <SuggestionLink
                  href={`/${locale}/calculator/ideal-weight`}
                  text={locale === 'th'
                    ? 'ค้นหาน้ำหนักในอุดมคติของคุณ'
                    : 'Find your ideal weight'}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SuggestionLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="block text-blue-600 hover:text-blue-800 transition-colors">
      → {text}
    </Link>
  );
}

function getSmartRecommendations(calculator: Calculator): string[] {
  const recommendations: Record<string, string[]> = {
    'bmi-calculator': ['bmr-calculator', 'calorie-calculator', 'ideal-weight', 'body-fat'],
    'loan-calculator': ['mortgage-calculator', 'car-loan-calculator', 'compound-interest'],
    'mortgage-calculator': ['loan-calculator', 'refinance-calculator', 'property-tax'],
    // Add more smart recommendations...
  };

  return recommendations[calculator.id] || [];
}

function getCalculatorIcon(slug: string): string {
  const icons: Record<string, string> = {
    'bmi-calculator': '⚖️',
    'bmr-calculator': '🔥',
    'calorie-calculator': '🍎',
    'ideal-weight': '🎯',
    'body-fat': '💪',
    'loan-calculator': '💰',
    'mortgage-calculator': '🏠',
    'car-loan-calculator': '🚗',
    // Add more icons...
  };
  return icons[slug] || '🧮';
}

function getShortDescription(slug: string, locale: string): string {
  const descriptions: Record<string, Record<string, string>> = {
    'bmr-calculator': {
      en: 'Basal metabolic rate',
      th: 'อัตราการเผาผลาญพื้นฐาน',
    },
    'calorie-calculator': {
      en: 'Daily calorie needs',
      th: 'แคลอรี่ที่ต้องการต่อวัน',
    },
    // Add more descriptions...
  };
  
  return descriptions[slug]?.[locale] || descriptions[slug]?.['en'] || 'Professional calculator';
}