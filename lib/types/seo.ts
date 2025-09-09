// SEO and Content Types for BwnXCalculator

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LocalizedFAQ {
  [locale: string]: FAQItem[];
}

export interface LocalizedArticle {
  [locale: string]: {
    title: string;
    content: string;
    keywords: string[];
    metaDescription: string;
  };
}

export interface CalculatorSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  offers?: {
    '@type': string;
    price: string;
    priceCurrency: string;
  };
}

export interface FAQSchema {
  '@context': string;
  '@type': string;
  mainEntity: Array<{
    '@type': string;
    name: string;
    acceptedAnswer: {
      '@type': string;
      text: string;
    };
  }>;
}

export interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  author: {
    '@type': string;
    name: string;
  };
  datePublished: string;
  dateModified: string;
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
}

export interface HowToSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  step: Array<{
    '@type': string;
    name: string;
    text: string;
  }>;
}

export interface CalculatorSEOContent {
  localizedFAQ: LocalizedFAQ;
  localizedArticle: LocalizedArticle;
  relatedCalculators: string[];
  externalLinks: Array<{
    text: string;
    url: string;
    rel: string;
  }>;
  keywords: {
    [locale: string]: {
      primary: string;
      secondary: string[];
      longtail: string[];
    };
  };
}