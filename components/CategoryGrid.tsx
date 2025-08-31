'use client';

import React from 'react';
import Link from 'next/link';
import { CalculatorCategory } from '@/lib/types/calculator';

interface CategoryGridProps {
  categories: Record<CalculatorCategory, {
    name: string;
    description: string;
    icon: string;
    color: string;
  }>;
  locale: string;
}

export default function CategoryGrid({ categories, locale }: CategoryGridProps) {
  const getCategoryName = (category: CalculatorCategory, locale: string) => {
    const translations: Record<string, Record<CalculatorCategory, string>> = {
      th: {
        finance: 'การเงิน',
        health: 'สุขภาพ',
        education: 'การศึกษา',
        engineering: 'วิศวกรรม',
        lifestyle: 'ไลฟ์สไตล์',
        insurance: 'ประกัน',
        environment: 'สิ่งแวดล้อม',
        business: 'ธุรกิจ',
        technology: 'เทคโนโลยี',
        mathematics: 'คณิตศาสตร์',
        math: 'คณิต',
        conversion: 'แปลงหน่วย',
        logistics: 'โลจิสติกส์',
        household: 'ครัวเรือน',
        miscellaneous: 'อื่นๆ',
      },
      // Add more languages...
    };
    
    return translations[locale]?.[category] || categories[category].name;
  };

  const getCategoryDescription = (category: CalculatorCategory, locale: string) => {
    const translations: Record<string, Record<CalculatorCategory, string>> = {
      th: {
        finance: 'เงินกู้ การลงทุน ภาษี และการวางแผนการเงิน',
        health: 'BMI แคลอรี่ โภชนาการ และสุขภาพ',
        education: 'คณิตศาสตร์ ฟิสิกส์ เคมี และเครื่องมือการศึกษา',
        engineering: 'การคำนวณทางเทคนิคและวิศวกรรม',
        lifestyle: 'ชีวิตประจำวัน ความบันเทิง และเครื่องมือส่วนตัว',
        insurance: 'เบี้ยประกันและความคุ้มครอง',
        environment: 'คาร์บอนฟุตพริ้นท์ พลังงาน และความยั่งยืน',
        business: 'เมตริกธุรกิจ ROI และความสามารถในการทำกำไร',
        technology: 'ไอที เว็บ และการคำนวณทางเทคนิค',
        mathematics: 'การดำเนินการทางคณิตศาสตร์และสถิติ',
        math: 'การคำนวณทางคณิตศาสตร์',
        conversion: 'แปลงระหว่างหน่วยและการวัดต่างๆ',
        logistics: 'การขนส่ง ค่าเดินทาง และการขนส่ง',
        household: 'บ้าน สาธารณูปโภค และการเงินส่วนบุคคล',
        miscellaneous: 'เครื่องมือและเครื่องคิดเลขต่างๆ',
      },
      // Add more languages...
    };
    
    return translations[locale]?.[category] || categories[category].description;
  };

  const categoryOrder: CalculatorCategory[] = [
    'finance',
    'health',
    'education',
    'engineering',
    'lifestyle',
    'insurance',
    'environment',
    'business',
    'technology',
    'mathematics',
    'conversion',
    'logistics',
    'household',
    'miscellaneous',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categoryOrder.map((category) => {
        const cat = categories[category];
        if (!cat) return null;
        return (
          <Link
            key={category}
            href={`/${locale}/category/${category}`}
            className="group"
          >
            <div className={`
              bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300
              transform hover:scale-105 cursor-pointer border-2 border-transparent
              hover:border-blue-500 dark:hover:border-blue-400
            `}>
              <div className={`
                w-16 h-16 rounded-full ${cat?.color || 'bg-blue-500'} bg-opacity-20 flex items-center justify-center mb-4
                group-hover:scale-110 transition-transform duration-300
              `}>
                <span className="text-3xl">{cat?.icon || '🧮'}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {getCategoryName(category, locale)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {getCategoryDescription(category, locale)}
              </p>
              <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                <span>{locale === 'th' ? 'ดูเครื่องคิดเลขทั้งหมด' : 'View all calculators'}</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}