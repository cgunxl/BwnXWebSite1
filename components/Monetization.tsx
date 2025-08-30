'use client';

import React, { useEffect, useState } from 'react';

interface MonetizationProps {
  slot: 'header' | 'sidebar' | 'content' | 'footer' | 'native';
  calculatorCategory?: string;
  locale?: string;
}

export default function Monetization({ slot, calculatorCategory, locale = 'en' }: MonetizationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [adContent, setAdContent] = useState<any>(null);

  useEffect(() => {
    // Simulate ad loading delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      loadAdContent();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const loadAdContent = () => {
    // In production, this would load actual ad content
    // For now, show placeholder based on slot and category
    
    if (slot === 'native' && calculatorCategory === 'finance') {
      setAdContent({
        type: 'native',
        title: 'Compare Loan Rates',
        items: [
          { name: 'Bank A', rate: '3.5%', cta: 'Apply Now' },
          { name: 'Bank B', rate: '3.8%', cta: 'Learn More' },
          { name: 'Bank C', rate: '4.1%', cta: 'Get Quote' }
        ]
      });
    } else if (slot === 'native' && calculatorCategory === 'health') {
      setAdContent({
        type: 'native',
        title: 'Health & Wellness Products',
        items: [
          { name: 'Fitness Tracker', price: '$99', cta: 'Shop Now' },
          { name: 'Protein Powder', price: '$45', cta: 'Buy Now' },
          { name: 'Yoga Mat', price: '$29', cta: 'View Deal' }
        ]
      });
    }
  };

  if (!isVisible) {
    return <div className={`monetization-skeleton ${slot}`} />;
  }

  // Native content block for finance/insurance
  if (slot === 'native' && adContent?.type === 'native') {
    return (
      <div className="native-monetization bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 my-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {adContent.title}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
            Sponsored
          </span>
        </div>
        
        <div className="space-y-3">
          {adContent.items.map((item: any, index: number) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.rate || item.price}
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                {item.cta}
              </button>
            </div>
          ))}
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          * Rates and prices subject to change. Terms apply.
        </p>
      </div>
    );
  }

  // Standard display ad slots
  const adSizes = {
    header: { width: 728, height: 90, label: 'Leaderboard' },
    sidebar: { width: 300, height: 250, label: 'Medium Rectangle' },
    content: { width: 336, height: 280, label: 'Large Rectangle' },
    footer: { width: 728, height: 90, label: 'Leaderboard' }
  };

  const adSize = adSizes[slot as keyof typeof adSizes] || adSizes.content;

  return (
    <div className={`monetization-slot ${slot} my-4`}>
      <div 
        className="ad-container bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center relative overflow-hidden"
        style={{
          maxWidth: adSize.width,
          height: adSize.height,
          margin: slot === 'sidebar' ? '0' : '0 auto'
        }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        
        {/* Ad placeholder */}
        <div className="text-center">
          <div className="text-gray-400 dark:text-gray-600 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4" />
            </svg>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {adSize.label}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {adSize.width} × {adSize.height}
          </p>
        </div>
      </div>
    </div>
  );
}

// Affiliate comparison widget
export function AffiliateComparison({ 
  category, 
  locale = 'en' 
}: { 
  category: string; 
  locale?: string;
}) {
  const affiliates = {
    finance: [
      { name: 'QuickLoans', rating: 4.5, apr: '3.49%', term: '5 years', bonus: '$200 cashback' },
      { name: 'EasyMortgage', rating: 4.3, apr: '3.75%', term: '30 years', bonus: 'No fees' },
      { name: 'SmartInvest', rating: 4.7, apr: '7.5%', term: 'Variable', bonus: '$500 bonus' }
    ],
    insurance: [
      { name: 'SafeGuard', rating: 4.6, coverage: '$500k', premium: '$45/mo', bonus: '3 months free' },
      { name: 'ProtectPlus', rating: 4.4, coverage: '$1M', premium: '$65/mo', bonus: 'Family discount' },
      { name: 'SecureLife', rating: 4.8, coverage: '$750k', premium: '$55/mo', bonus: 'Instant approval' }
    ],
    credit: [
      { name: 'CashRewards Card', rating: 4.5, cashback: '2%', fee: '$0', bonus: '$150 signup' },
      { name: 'Travel Miles Card', rating: 4.7, cashback: '3x miles', fee: '$95', bonus: '50k miles' },
      { name: 'Student Card', rating: 4.2, cashback: '1%', fee: '$0', bonus: '$50 signup' }
    ]
  };

  const items = affiliates[category as keyof typeof affiliates] || affiliates.finance;

  return (
    <div className="affiliate-comparison bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 my-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Compare Top Offers
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Exclusive deals for our users
          </p>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          Partner Offers
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      {item.rating}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {Object.entries(item).filter(([key]) => !['name', 'rating', 'bonus'].includes(key)).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-gray-500 dark:text-gray-400 capitalize">{key.replace('_', ' ')}</p>
                      <p className="font-medium text-gray-900 dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>
                
                {item.bonus && (
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
                    </svg>
                    {item.bonus}
                  </div>
                )}
              </div>
              
              <div className="ml-4">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          <strong>Disclosure:</strong> We may receive compensation when you click on links to products from our partners. 
          This doesn't affect our reviews or recommendations. Terms and conditions apply to all offers.
        </p>
      </div>
    </div>
  );
}