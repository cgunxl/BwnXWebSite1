import { 
  CalculatorSchema, 
  FAQSchema, 
  BreadcrumbSchema, 
  ArticleSchema,
  HowToSchema 
} from '@/lib/types/seo';
import { Calculator } from '@/lib/types/calculator';
import { Locale } from '@/lib/i18n/config';

export class SchemaGenerator {
  private static baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bwnxcalculator.com';

  static generateCalculatorSchema(
    calculator: Calculator,
    locale: Locale,
    category: string
  ): CalculatorSchema {
    const url = `${this.baseUrl}/${locale}/${category}/${calculator.id}`;
    const localizedContent = calculator.localizedContent[locale] || calculator.localizedContent.en;
    
    return {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: localizedContent?.title || 'Calculator',
      description: localizedContent?.description || '',
      url,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    };
  }

  static generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
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

  static generateBreadcrumbSchema(
    locale: Locale,
    category: string,
    calculatorName: string,
    calculatorId: string
  ): BreadcrumbSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${this.baseUrl}/${locale}`
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: category.charAt(0).toUpperCase() + category.slice(1),
          item: `${this.baseUrl}/${locale}/${category}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: calculatorName,
          item: `${this.baseUrl}/${locale}/${category}/${calculatorId}`
        }
      ]
    };
  }

  static generateArticleSchema(
    title: string,
    description: string,
    datePublished: string = new Date().toISOString(),
    dateModified: string = new Date().toISOString()
  ): ArticleSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description,
      author: {
        '@type': 'Organization',
        name: 'BwnXCalculator'
      },
      datePublished,
      dateModified,
      publisher: {
        '@type': 'Organization',
        name: 'BwnXCalculator',
        logo: {
          '@type': 'ImageObject',
          url: `${this.baseUrl}/logo.png`
        }
      }
    };
  }

  static generateHowToSchema(
    name: string,
    description: string,
    steps: Array<{ name: string; text: string }>
  ): HowToSchema {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name,
      description,
      step: steps.map(step => ({
        '@type': 'HowToStep',
        name: step.name,
        text: step.text
      }))
    };
  }

  static generateAllSchemas(
    calculator: Calculator,
    locale: Locale,
    category: string,
    faqs: Array<{ question: string; answer: string }>,
    articleTitle: string,
    articleDescription: string
  ): string {
    const localizedContent = calculator.localizedContent[locale] || calculator.localizedContent.en;
    const schemas: any[] = [
      this.generateCalculatorSchema(calculator, locale, category),
      this.generateFAQSchema(faqs),
      this.generateBreadcrumbSchema(locale, category, localizedContent?.title || 'Calculator', calculator.id),
      this.generateArticleSchema(articleTitle, articleDescription)
    ];

    // Add HowTo schema for calculation steps
    const howToSteps = [
      { name: "Enter Input Values", text: "Input all required values such as amount, rate, and term" },
      { name: "Review Settings", text: "Check that all values are correct and in the right units" },
      { name: "Calculate", text: "Click the Calculate button to get your results" },
      { name: "Analyze Results", text: "Review your calculated results and explore different scenarios" }
    ];

    const calculatorName = localizedContent?.title || 'Calculator';
    
    schemas.push(this.generateHowToSchema(
      `How to Use ${calculatorName}`,
      `Step-by-step guide to using our ${calculatorName}`,
      howToSteps
    ));

    return schemas.map(schema => 
      `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    ).join('\n');
  }
}