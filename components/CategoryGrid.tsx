'use client';

import React from 'react';
import Link from 'next/link';
import { CalculatorCategory } from '@/lib/types/calculator';

interface CategoryGridProps {
  categories: Record<string, {
    name: string | Record<string, string>;
    description: string;
    icon: string;
    color: string;
    slug?: string;
  }>;
  locale: string;
}

export default function CategoryGrid({ categories, locale }: CategoryGridProps) {
  const getCategoryName = (category: string, locale: string) => {
    const translations: Record<string, Record<string, string>> = {
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
        tech: 'ไอที',
        mathematics: 'คณิตศาสตร์',
        math: 'คณิต',
        conversion: 'แปลงหน่วย',
        logistics: 'โลจิสติกส์',
        household: 'ครัวเรือน',
        miscellaneous: 'อื่นๆ',
      },
      // Add more languages...
    };
    
    const categoryData = categories[category];
    if (!categoryData) return category;
    
    if (typeof categoryData.name === 'string') {
      return translations[locale]?.[category] || categoryData.name;
    } else if (categoryData.name && typeof categoryData.name === 'object') {
      return categoryData.name[locale] || categoryData.name.en || categoryData.name[Object.keys(categoryData.name)[0]] || category;
    }
    
    return category;
  };

  const getCategoryDescription = (category: string, locale: string) => {
    const translations: Record<string, Record<string, string>> = {
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
        tech: 'แบนด์วิธ คลาวด์ รหัสผ่าน และเครื่องมือไอที',
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

  const categoryOrder = [
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
    'math',
    'conversion',
    'logistics',
    'household',
    'miscellaneous',
  ] as const;

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
            <div className="glass-card p-6 hover:scale-[1.02]">
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-4
                group-hover:scale-110 transition-transform duration-300
              `} style={{
                background: `linear-gradient(135deg, ${(cat?.color)||'#3B82F6'}22, ${(cat?.color)||'#3B82F6'}44)`
              }}>
                <span className="text-3xl">{cat?.icon || '🧮'}</span>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {getCategoryName(category, locale)}
              </h3>
              <p className="text-sm text-text-secondary line-clamp-2">
                {getCategoryDescription(category, locale)}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-accent">
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