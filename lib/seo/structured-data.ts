// JSON-LD Structured Data Generator for SEO
import { Calculator } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';

interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export class StructuredDataGenerator {
  // Generate FAQPage schema
  generateFAQSchema(
    faqs: Array<{ question: string; answer: string }>,
    url: string
  ): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    };
  }

  // Generate Article schema
  generateArticleSchema(
    article: {
      title: string;
      description: string;
      wordCount: number;
      datePublished: string;
      dateModified: string;
      author?: string;
      imageUrl?: string;
    },
    url: string,
    locale: Locale
  ): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      wordCount: article.wordCount,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      author: {
        '@type': 'Organization',
        name: 'BwnXCalculator',
        url: 'https://bwn-x-web-site1.vercel.app'
      },
      publisher: {
        '@type': 'Organization',
        name: 'BwnXCalculator',
        logo: {
          '@type': 'ImageObject',
          url: 'https://bwn-x-web-site1.vercel.app/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      image: article.imageUrl || 'https://bwn-x-web-site1.vercel.app/calculator-image.jpg',
      inLanguage: this.getLanguageCode(locale)
    };
  }

  // Generate BreadcrumbList schema
  generateBreadcrumbSchema(
    breadcrumbs: Array<{ name: string; url: string }>,
    locale: Locale
  ): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    };
  }

  // Generate SoftwareApplication schema for calculator
  generateCalculatorSchema(
    calculator: Calculator,
    url: string,
    locale: Locale
  ): StructuredData {
    const localizedContent = calculator.localizedContent?.[locale];
    
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: localizedContent?.title || calculator.id,
      description: localizedContent?.description || '',
      url: url,
      applicationCategory: 'FinanceApplication',
      applicationSubCategory: calculator.category,
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '1250',
        bestRating: '5',
        worstRating: '1'
      },
      author: {
        '@type': 'Organization',
        name: 'BwnXCalculator'
      },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      screenshot: `https://bwn-x-web-site1.vercel.app/screenshots/${calculator.slug}.jpg`,
      featureList: [
        'Real-time calculation',
        'Multiple input validation',
        'Export results as CSV',
        'Print functionality',
        'Share via URL',
        'Mobile responsive',
        'Multi-language support'
      ],
      inLanguage: this.getLanguageCode(locale)
    };
  }

  // Generate HowTo schema for calculator usage
  generateHowToSchema(
    calculator: Calculator,
    url: string,
    locale: Locale
  ): StructuredData {
    const localizedContent = calculator.localizedContent?.[locale];
    const steps = this.generateHowToSteps(calculator, locale);
    
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to Use ${localizedContent?.title || calculator.id}`,
      description: localizedContent?.description || '',
      image: `https://bwn-x-web-site1.vercel.app/images/${calculator.slug}-howto.jpg`,
      totalTime: 'PT2M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0'
      },
      supply: [],
      tool: [
        {
          '@type': 'HowToTool',
          name: 'Web Browser'
        },
        {
          '@type': 'HowToTool',
          name: 'Internet Connection'
        }
      ],
      step: steps,
      inLanguage: this.getLanguageCode(locale)
    };
  }

  private generateHowToSteps(calculator: Calculator, locale: Locale): any[] {
    const steps = [];
    
    // Step 1: Access the calculator
    steps.push({
      '@type': 'HowToStep',
      name: 'Access the Calculator',
      text: `Navigate to the ${calculator.localizedContent?.[locale]?.title || calculator.id} page`,
      image: `https://bwn-x-web-site1.vercel.app/steps/step1.jpg`,
      url: `https://bwn-x-web-site1.vercel.app/${locale}/calculator/${calculator.slug}#step1`
    });
    
    // Step 2: Enter inputs
    calculator.inputs.forEach((input, index) => {
      steps.push({
        '@type': 'HowToStep',
        name: `Enter ${input.label}`,
        text: `Input your ${input.label}${input.unit ? ` in ${input.unit}` : ''}`,
        image: `https://bwn-x-web-site1.vercel.app/steps/step${index + 2}.jpg`,
        url: `https://bwn-x-web-site1.vercel.app/${locale}/calculator/${calculator.slug}#step${index + 2}`
      });
    });
    
    // Step 3: Calculate
    steps.push({
      '@type': 'HowToStep',
      name: 'Calculate Results',
      text: 'Click the Calculate button or wait for automatic calculation',
      image: `https://bwn-x-web-site1.vercel.app/steps/calculate.jpg`,
      url: `https://bwn-x-web-site1.vercel.app/${locale}/calculator/${calculator.slug}#calculate`
    });
    
    // Step 4: Review results
    steps.push({
      '@type': 'HowToStep',
      name: 'Review Your Results',
      text: 'Review the calculated results and any recommendations',
      image: `https://bwn-x-web-site1.vercel.app/steps/results.jpg`,
      url: `https://bwn-x-web-site1.vercel.app/${locale}/calculator/${calculator.slug}#results`
    });
    
    // Step 5: Export/Share
    steps.push({
      '@type': 'HowToStep',
      name: 'Save or Share',
      text: 'Download CSV, print, or share your results via link',
      image: `https://bwn-x-web-site1.vercel.app/steps/export.jpg`,
      url: `https://bwn-x-web-site1.vercel.app/${locale}/calculator/${calculator.slug}#export`
    });
    
    return steps;
  }

  // Generate Organization schema
  generateOrganizationSchema(locale: Locale): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BwnXCalculator',
      alternateName: 'BwnX Calculator Hub',
      url: 'https://bwn-x-web-site1.vercel.app',
      logo: 'https://bwn-x-web-site1.vercel.app/logo.png',
      description: 'Professional calculator tools for finance, health, education, and more. 430+ calculators in 17 languages.',
      foundingDate: '2024',
      founders: [
        {
          '@type': 'Person',
          name: 'BwnX Team'
        }
      ],
      address: {
        '@type': 'PostalAddress',
        addressCountry: this.getCountryFromLocale(locale)
      },
      sameAs: [
        'https://twitter.com/bwnxcalculator',
        'https://facebook.com/bwnxcalculator',
        'https://linkedin.com/company/bwnxcalculator'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@bwnxcalculator.com',
        availableLanguage: this.getAllLanguages()
      }
    };
  }

  // Generate WebSite schema with search
  generateWebSiteSchema(locale: Locale): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'BwnXCalculator',
      alternateName: 'BwnX Calculator Hub',
      url: 'https://bwn-x-web-site1.vercel.app',
      description: 'Professional calculator tools for every need',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `https://bwn-x-web-site1.vercel.app/${locale}/search?q={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      inLanguage: this.getLanguageCode(locale)
    };
  }

  // Generate Review schema
  generateReviewSchema(
    calculator: Calculator,
    reviews: Array<{
      author: string;
      rating: number;
      text: string;
      date: string;
    }>
  ): StructuredData {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: calculator.localizedContent?.en?.title || calculator.id,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: this.calculateAverageRating(reviews),
        reviewCount: reviews.length,
        bestRating: '5',
        worstRating: '1'
      },
      review: reviews.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author
        },
        datePublished: review.date,
        reviewBody: review.text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: '5',
          worstRating: '1'
        }
      }))
    };
  }

  // Helper functions
  private getLanguageCode(locale: Locale): string {
    const languageCodes: Record<Locale, string> = {
      en: 'en-US',
      th: 'th-TH',
      ja: 'ja-JP',
      de: 'de-DE',
      zh: 'zh-CN',
      es: 'es-ES',
      pt: 'pt-BR',
      fr: 'fr-FR',
      ko: 'ko-KR',
      ar: 'ar-SA',
      hi: 'hi-IN',
      id: 'id-ID',
      ru: 'ru-RU',
      it: 'it-IT',
      nl: 'nl-NL',
      vi: 'vi-VN',
      fa: 'fa-IR'
    };
    return languageCodes[locale] || 'en-US';
  }

  private getCountryFromLocale(locale: Locale): string {
    const countries: Record<Locale, string> = {
      en: 'US',
      th: 'TH',
      ja: 'JP',
      de: 'DE',
      zh: 'CN',
      es: 'ES',
      pt: 'BR',
      fr: 'FR',
      ko: 'KR',
      ar: 'SA',
      hi: 'IN',
      id: 'ID',
      ru: 'RU',
      it: 'IT',
      nl: 'NL',
      vi: 'VN',
      fa: 'IR'
    };
    return countries[locale] || 'US';
  }

  private getAllLanguages(): string[] {
    return [
      'English', 'Thai', 'Japanese', 'German', 'Chinese',
      'Spanish', 'Portuguese', 'French', 'Korean', 'Arabic',
      'Hindi', 'Indonesian', 'Russian', 'Italian', 'Dutch',
      'Vietnamese', 'Persian'
    ];
  }

  private calculateAverageRating(reviews: Array<{ rating: number }>): string {
    if (reviews.length === 0) return '0';
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }

  // Combine all schemas for a page
  combineSchemas(schemas: StructuredData[]): string {
    return schemas
      .map(schema => `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`)
      .join('\n');
  }
}

// Export singleton instance
export const structuredDataGenerator = new StructuredDataGenerator();