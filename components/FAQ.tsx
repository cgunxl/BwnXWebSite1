'use client';

import React, { useState } from 'react';
import { FAQ } from '@/types/calculator';
import { ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface FAQProps {
  faqs: FAQ[];
  locale: string;
}

export const FAQComponent: React.FC<FAQProps> = ({ faqs, locale }) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const getLocalizedQuestion = (faq: FAQ) => {
    return faq.localizedQuestion?.[locale] || faq.question;
  };

  const getLocalizedAnswer = (faq: FAQ) => {
    return faq.localizedAnswer?.[locale] || faq.answer;
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-text-primary">Frequently Asked Questions</h3>
      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const isOpen = openItems.has(index);
          
          return (
            <div
              key={index}
              className="border border-stroke-soft rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-surface-1/50 transition-colors"
              >
                <span className="font-medium text-text-primary">
                  {getLocalizedQuestion(faq)}
                </span>
                <ChevronDown
                  size={20}
                  className={clsx(
                    'text-text-muted transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
              <div
                className={clsx(
                  'overflow-hidden transition-all duration-200',
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <div className="px-4 pb-3 text-text-secondary">
                  {getLocalizedAnswer(faq)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};