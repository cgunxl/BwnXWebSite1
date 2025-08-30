'use client';

import React, { useState } from 'react';
import { FAQItem } from '@/lib/types/calculator';

interface CalculatorFAQProps {
  faq: FAQItem[];
  locale: string;
}

export default function CalculatorFAQ({ faq, locale }: CalculatorFAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const title = locale === 'th' ? 'คำถามที่พบบ่อย' : 'Frequently Asked Questions';

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <span className="text-3xl mr-3">❓</span>
        {title}
      </h2>

      <div className="space-y-4">
        {faq.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900 pr-4">
                {item.question}
              </h3>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openItems.includes(index) && (
              <div className="px-6 pb-4">
                <div className="text-gray-700 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Schema.org FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(item => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </div>
  );
}