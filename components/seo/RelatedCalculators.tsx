'use client';

import React from 'react';
import Link from 'next/link';
import { Calculator as CalcIcon, ArrowRight } from 'lucide-react';
import { getCalculator } from '@/lib/calculators/registry';
import { Locale } from '@/lib/i18n/config';

interface RelatedCalculatorsProps {
  currentCalculatorId: string;
  relatedIds: string[];
  locale: Locale;
  category: string;
}

export function RelatedCalculators({ currentCalculatorId, relatedIds, locale, category }: RelatedCalculatorsProps) {
  const relatedCalculators = relatedIds
    .filter(id => id !== currentCalculatorId)
    .map(id => {
      const calculator = getCalculator(id, locale);
      return calculator ? { ...calculator, id } : null;
    })
    .filter(Boolean)
    .slice(0, 5); // Show max 5 related calculators

  if (relatedCalculators.length === 0) return null;

  return (
    <div className="mt-12 bg-surface-1 rounded-xl p-6 border border-stroke-soft">
      <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
        <CalcIcon className="w-6 h-6 text-accent" />
        {locale === 'th' ? 'เครื่องคำนวณที่เกี่ยวข้อง' : 
         locale === 'es' ? 'Calculadoras Relacionadas' : 
         'Related Calculators'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedCalculators.map((calc) => (
          <Link
            key={calc.id}
            href={`/${locale}/${category}/${calc.id}`}
            className="group bg-bg-raised border border-stroke-soft rounded-lg p-4 hover:border-accent/50 hover:bg-surface-2 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-text-primary font-medium group-hover:text-accent transition-colors">
                  {calc.localizedContent?.[locale]?.title || calc.localizedContent?.en?.title || 'Calculator'}
                </h3>
                <p className="text-sm text-text-secondary mt-1">
                  {(calc.localizedContent?.[locale]?.description || calc.localizedContent?.en?.description || '').substring(0, 60) + '...'}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}