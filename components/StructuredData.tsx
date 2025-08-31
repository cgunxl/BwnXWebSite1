import Script from 'next/script';

interface StructuredDataProps {
  type: 'Calculator' | 'FAQPage' | 'WebApplication' | 'BreadcrumbList' | 'Organization';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  let schema: any = {};

  switch (type) {
    case 'Calculator':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': data.name,
        'url': data.url,
        'description': data.description,
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        },
        'aggregateRating': data.rating ? {
          '@type': 'AggregateRating',
          'ratingValue': data.rating.value || '4.8',
          'ratingCount': data.rating.count || 1250,
          'bestRating': '5',
          'worstRating': '1'
        } : undefined,
        'author': {
          '@type': 'Organization',
          'name': 'BwnXCalculator',
          'url': 'https://bwnxcalculator.com'
        },
        'datePublished': data.datePublished || '2024-01-01',
        'dateModified': data.dateModified || new Date().toISOString(),
        'inLanguage': data.language || 'en',
        'keywords': data.keywords?.join(', '),
        'screenshot': data.screenshot,
        'featureList': data.features || [
          'Instant calculation',
          'No registration required',
          'Free to use',
          'Mobile friendly',
          'Multiple languages'
        ]
      };
      break;

    case 'FAQPage':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': data.questions?.map((item: any) => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer
          }
        }))
      };
      break;

    case 'BreadcrumbList':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': data.items?.map((item: any, index: number) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': item.name,
          'item': item.url
        }))
      };
      break;

    case 'Organization':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'BwnXCalculator',
        'url': 'https://bwnxcalculator.com',
        'logo': 'https://bwnxcalculator.com/logo.png',
        'description': 'Free online calculators for finance, health, education, and more in 17 languages',
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': 'cgunxlcb@gmail.com',
          'contactType': 'customer service',
          'availableLanguage': [
            'English', 'Spanish', 'Portuguese', 'German', 'French',
            'Japanese', 'Korean', 'Chinese', 'Thai', 'Arabic',
            'Hindi', 'Indonesian', 'Russian', 'Italian', 'Dutch',
            'Vietnamese', 'Persian'
          ]
        },
        'sameAs': [
          'https://twitter.com/bwnxcalculator',
          'https://facebook.com/bwnxcalculator',
          'https://linkedin.com/company/bwnxcalculator'
        ]
      };
      break;

    case 'WebApplication':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        'name': data.name || 'BwnXCalculator',
        'url': data.url,
        'description': data.description,
        'applicationCategory': 'UtilityApplication',
        'operatingSystem': 'Any',
        'browserRequirements': 'Requires JavaScript',
        'softwareVersion': '1.0',
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'USD'
        }
      };
      break;
  }

  // Remove undefined values
  const cleanSchema = JSON.parse(JSON.stringify(schema));

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleanSchema)
      }}
      strategy="afterInteractive"
    />
  );
}

// Helper function to generate HowTo schema
export function generateHowToSchema(data: {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  totalTime?: string;
  supply?: string[];
  tool?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': data.name,
    'description': data.description,
    'totalTime': data.totalTime,
    'supply': data.supply?.map(item => ({
      '@type': 'HowToSupply',
      'name': item
    })),
    'tool': data.tool?.map(item => ({
      '@type': 'HowToTool',
      'name': item
    })),
    'step': data.steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.name,
      'text': step.text,
      'image': step.image
    }))
  };
}

// Helper function to generate Article schema
export function generateArticleSchema(data: {
  headline: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  wordCount?: number;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': data.headline,
    'description': data.description,
    'author': {
      '@type': 'Person',
      'name': data.author || 'BwnXCalculator Team'
    },
    'datePublished': data.datePublished,
    'dateModified': data.dateModified,
    'image': data.image,
    'wordCount': data.wordCount,
    'keywords': data.keywords?.join(', '),
    'publisher': {
      '@type': 'Organization',
      'name': 'BwnXCalculator',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://bwnxcalculator.com/logo.png'
      }
    }
  };
}

// Helper function to generate Review schema
export function generateReviewSchema(data: {
  itemName: string;
  reviewRating: number;
  reviewBody: string;
  author: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    'itemReviewed': {
      '@type': 'WebApplication',
      'name': data.itemName
    },
    'reviewRating': {
      '@type': 'Rating',
      'ratingValue': data.reviewRating,
      'bestRating': '5',
      'worstRating': '1'
    },
    'reviewBody': data.reviewBody,
    'author': {
      '@type': 'Person',
      'name': data.author
    },
    'datePublished': data.datePublished
  };
}

// Helper function to generate SoftwareApplication schema
export function generateSoftwareApplicationSchema(data: {
  name: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  screenshot?: string;
  aggregateRating?: {
    ratingValue: number;
    ratingCount: number;
  };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': data.name,
    'description': data.description,
    'applicationCategory': data.applicationCategory,
    'operatingSystem': data.operatingSystem,
    'screenshot': data.screenshot,
    'aggregateRating': data.aggregateRating ? {
      '@type': 'AggregateRating',
      'ratingValue': data.aggregateRating.ratingValue,
      'ratingCount': data.aggregateRating.ratingCount
    } : undefined,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };
}

// Helper function to generate LocalBusiness schema (for local SEO)
export function generateLocalBusinessSchema(data: {
  name: string;
  description: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  telephone?: string;
  email?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': data.name,
    'description': data.description,
    'address': data.address ? {
      '@type': 'PostalAddress',
      'streetAddress': data.address.streetAddress,
      'addressLocality': data.address.addressLocality,
      'addressRegion': data.address.addressRegion,
      'postalCode': data.address.postalCode,
      'addressCountry': data.address.addressCountry
    } : undefined,
    'telephone': data.telephone,
    'email': data.email,
    'url': data.url
  };
}