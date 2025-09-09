'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/lib/types/seo';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface CalculatorFAQProps {
  faqs: FAQItem[];
  locale: string;
}

export function CalculatorFAQ({ faqs, locale }: CalculatorFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 bg-surface-1 rounded-xl p-6 border border-stroke-soft">
      <h2 className="text-2xl font-semibold text-text-primary mb-6 flex items-center gap-2">
        <HelpCircle className="w-6 h-6 text-accent" />
        {locale === 'th' ? 'คำถามที่พบบ่อย' : locale === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
      </h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-stroke-soft rounded-lg overflow-hidden transition-all duration-200 hover:border-accent/50"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between bg-bg-raised hover:bg-surface-2 transition-colors duration-200"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="text-text-primary font-medium pr-2">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-accent flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-text-secondary flex-shrink-0" />
              )}
            </button>
            
            <div
              id={`faq-answer-${index}`}
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              } overflow-hidden`}
            >
              <div className="px-4 py-3 text-text-secondary bg-bg-base">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}