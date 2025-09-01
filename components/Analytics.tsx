'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Track page views
export function useAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
    }
  }, [pathname, searchParams]);
}

// Google Analytics functions
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track calculator usage
export const trackCalculation = (calculatorName: string, inputs: any) => {
  event({
    action: 'calculate',
    category: 'Calculator',
    label: calculatorName,
  });
};

// Track language change
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  event({
    action: 'language_change',
    category: 'Localization',
    label: `${fromLang}_to_${toLang}`,
  });
};

// Track theme change
export const trackThemeChange = (theme: 'light' | 'dark') => {
  event({
    action: 'theme_change',
    category: 'UI',
    label: theme,
  });
};

// Track search
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  event({
    action: 'search',
    category: 'Search',
    label: searchTerm,
    value: resultsCount,
  });
};

// Track FAQ interaction
export const trackFAQ = (question: string, calculatorName: string) => {
  event({
    action: 'faq_view',
    category: 'FAQ',
    label: `${calculatorName}: ${question}`,
  });
};

// Track external link clicks
export const trackExternalLink = (url: string, calculatorName: string) => {
  event({
    action: 'external_link_click',
    category: 'External Links',
    label: `${calculatorName}: ${url}`,
  });
};

// Track copy result
export const trackCopyResult = (calculatorName: string, result: string) => {
  event({
    action: 'copy_result',
    category: 'Calculator',
    label: calculatorName,
  });
};

// Track share
export const trackShare = (platform: string, calculatorName: string) => {
  event({
    action: 'share',
    category: 'Social',
    label: `${platform}: ${calculatorName}`,
  });
};

// Track ad interaction
export const trackAdInteraction = (adType: string, position: string) => {
  event({
    action: 'ad_interaction',
    category: 'Monetization',
    label: `${adType}_${position}`,
  });
};

// Google Analytics Script Component
export default function GoogleAnalytics() {
  // Check if user has consented to analytics cookies
  let hasConsent = false;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('cookie-consent');
      if (raw) {
        const parsed = JSON.parse(raw);
        hasConsent = !!parsed.analytics;
      }
    } catch {
      hasConsent = false;
    }
  }

  if (!hasConsent || !GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}

// Web Vitals tracking
export function sendWebVitals({ id, name, label, value }: any) {
  // Send Core Web Vitals to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    });
  }
}

// Custom hooks for specific tracking
export function useCalculatorTracking(calculatorName: string) {
  return {
    trackCalculation: (inputs: any) => trackCalculation(calculatorName, inputs),
    trackFAQ: (question: string) => trackFAQ(question, calculatorName),
    trackExternalLink: (url: string) => trackExternalLink(url, calculatorName),
    trackCopyResult: (result: string) => trackCopyResult(calculatorName, result),
    trackShare: (platform: string) => trackShare(platform, calculatorName),
  };
}

// Ecommerce tracking for affiliate links
export const trackAffiliateClick = (
  product: string,
  merchant: string,
  value: number,
  calculatorName: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'select_item', {
      currency: 'USD',
      value: value,
      items: [
        {
          item_id: product,
          item_name: product,
          affiliation: merchant,
          item_category: 'Affiliate',
          item_category2: calculatorName,
          price: value,
          quantity: 1
        }
      ]
    });
  }
};

// Performance monitoring
export const trackPerformance = (metric: string, value: number) => {
  event({
    action: 'performance',
    category: 'Performance',
    label: metric,
    value: Math.round(value),
  });
};

// Error tracking
export const trackError = (error: string, component: string) => {
  event({
    action: 'error',
    category: 'Error',
    label: `${component}: ${error}`,
  });
};

// User engagement tracking
export const trackEngagement = (action: string, time: number) => {
  event({
    action: 'engagement',
    category: 'User Engagement',
    label: action,
    value: Math.round(time),
  });
};

// Conversion tracking
export const trackConversion = (type: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GA_MEASUREMENT_ID}/conversion_id`, // Replace with actual conversion ID
      value: value,
      currency: 'USD',
      conversion_type: type
    });
  }
};

// Custom dimension tracking
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

// Session tracking
export const trackSession = (duration: number, pageCount: number) => {
  event({
    action: 'session_end',
    category: 'Session',
    label: `pages_${pageCount}`,
    value: Math.round(duration / 1000), // Convert to seconds
  });
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}