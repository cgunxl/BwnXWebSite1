import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { getCalculator } from '@/lib/calculators/registry';
import { Locale, locales } from '@/lib/i18n/config';
import BwnXCalculatorForm from '@/components/ui/BwnXCalculatorForm';
import { CalculatorFAQ } from '@/components/seo/CalculatorFAQ';
import { CalculatorArticle } from '@/components/seo/CalculatorArticle';
import { RelatedCalculators } from '@/components/seo/RelatedCalculators';
import { ExternalLinks } from '@/components/seo/ExternalLinks';
import { SchemaGenerator } from '@/lib/seo/schema-generator';
import { financeSEOContent } from '@/data/seo/finance-calculators-seo';
import { ArrowLeft, Calculator as CalcIcon } from 'lucide-react';
import Link from 'next/link';

type PageProps = {
  params: Promise<{
    locale: Locale;
    category: string;
    slug: string;
  }>;
};

// Get SEO content for calculator
function getCalculatorSEO(calculatorId: string, locale: Locale) {
  // For now, we only have finance SEO content
  // In production, you'd have SEO content for all categories
  const seoContent = financeSEOContent[calculatorId];
  
  if (!seoContent) {
    // Return default content if not found
    return {
      faqs: [],
      article: null,
      relatedCalculators: [],
      externalLinks: [],
      keywords: null
    };
  }

  return {
    faqs: seoContent.localizedFAQ[locale] || seoContent.localizedFAQ.en || [],
    article: seoContent.localizedArticle[locale] || seoContent.localizedArticle.en || null,
    relatedCalculators: seoContent.relatedCalculators || [],
    externalLinks: seoContent.externalLinks || [],
    keywords: seoContent.keywords[locale] || seoContent.keywords.en || null
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const calculator = getCalculator(resolvedParams.slug, resolvedParams.locale);
  
  if (!calculator) {
    return {
      title: 'Calculator Not Found',
      description: 'The requested calculator could not be found.'
    };
  }

  const seo = getCalculatorSEO(resolvedParams.slug, resolvedParams.locale);
  const localizedContent = calculator.localizedContent[resolvedParams.locale] || calculator.localizedContent.en;
  const name = localizedContent?.title || 'Calculator';
  const description = localizedContent?.description || '';
  
  const title = seo.keywords?.primary ? `${seo.keywords.primary} | ${name} - BwnXCalculator` : `${name} - BwnXCalculator`;
  const metaDescription = seo.article?.metaDescription || description;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bwnxcalculator.com';
  const canonicalUrl = `${baseUrl}/${resolvedParams.locale}/${resolvedParams.category}/${resolvedParams.slug}`;

  // Generate hreflang links
  const languages: Record<string, string> = {};
  locales.forEach(locale => {
    languages[locale] = `${baseUrl}/${locale}/${resolvedParams.category}/${resolvedParams.slug}`;
  });

  return {
    title,
    description: metaDescription,
    keywords: seo.keywords ? [seo.keywords.primary, ...seo.keywords.secondary].join(', ') : undefined,
    alternates: {
      canonical: canonicalUrl,
      languages
    },
    openGraph: {
      title,
      description: metaDescription,
      url: canonicalUrl,
      siteName: 'BwnXCalculator',
      locale: resolvedParams.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: metaDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams() {
  const calculatorIds = [
    'loan-calculator',
    'mortgage-calculator',
    'tax-calculator',
    'compound-interest',
    'bmi-calculator',
    'calorie-calculator',
    'body-fat-calculator',
    'pregnancy-calculator',
    'water-intake-calculator',
    'gpa-calculator',
    'percentage-calculator',
    'scientific-calculator',
    'statistics-calculator',
    'grade-needed-calculator',
    'ohms-law-calculator',
    'age-calculator',
    'length-converter',
    'break-even-calculator',
    'roi-calculator',
    'love-calculator',
    'lucky-number',
    'birthday-calculator',
    'personality-test'
  ];

  const categories = {
    'loan-calculator': 'finance',
    'mortgage-calculator': 'finance',
    'tax-calculator': 'finance',
    'compound-interest': 'finance',
    'bmi-calculator': 'health',
    'calorie-calculator': 'health',
    'body-fat-calculator': 'health',
    'pregnancy-calculator': 'health',
    'water-intake-calculator': 'health',
    'gpa-calculator': 'education',
    'percentage-calculator': 'education',
    'scientific-calculator': 'education',
    'statistics-calculator': 'education',
    'grade-needed-calculator': 'education',
    'ohms-law-calculator': 'engineering',
    'age-calculator': 'lifestyle',
    'length-converter': 'conversion',
    'break-even-calculator': 'business',
    'roi-calculator': 'business',
    'love-calculator': 'fun',
    'lucky-number': 'fun',
    'birthday-calculator': 'fun',
    'personality-test': 'fun'
  };

  const paths = [];
  
  for (const locale of locales) {
    for (const calculatorId of calculatorIds) {
      paths.push({
        locale,
        category: categories[calculatorId as keyof typeof categories] || 'misc',
        slug: calculatorId
      });
    }
  }

  return paths;
}

export default async function CalculatorPage({ params }: PageProps) {
  const resolvedParams = await params;
  const calculator = getCalculator(resolvedParams.slug, resolvedParams.locale);
  
  if (!calculator) {
    notFound();
  }

  const seo = getCalculatorSEO(resolvedParams.slug, resolvedParams.locale);
  const localizedContent = calculator.localizedContent[resolvedParams.locale] || calculator.localizedContent.en;
  const name = localizedContent?.title || 'Calculator';
  
  // Generate all schemas
  const schemas = SchemaGenerator.generateAllSchemas(
    calculator,
    resolvedParams.locale,
    resolvedParams.category,
    seo.faqs,
    seo.article?.title || name,
    seo.article?.metaDescription || localizedContent?.description || ''
  );

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemas }}
      />
      
      <div className="min-h-screen bg-bg-deep">
        {/* Animated background */}
        <div className="fixed inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent-2/10 animate-pulse" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href={`/${resolvedParams.locale}`} className="text-text-secondary hover:text-accent transition-colors">
                    Home
                  </Link>
                </li>
                <li className="text-text-muted">/</li>
                <li>
                  <Link href={`/${resolvedParams.locale}/${resolvedParams.category}`} className="text-text-secondary hover:text-accent transition-colors capitalize">
                    {resolvedParams.category}
                  </Link>
                </li>
                <li className="text-text-muted">/</li>
                <li className="text-text-primary">{name}</li>
              </ol>
            </nav>

            {/* Back button */}
            <Link 
              href={`/${resolvedParams.locale}/${resolvedParams.category}`} 
              className="inline-flex items-center gap-2 text-text-secondary hover:text-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              {resolvedParams.locale === 'th' ? 'กลับ' : resolvedParams.locale === 'es' ? 'Volver' : 'Back'}
            </Link>

            {/* Main content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator section */}
              <div className="lg:col-span-2">
                <div className="bg-surface-1 rounded-xl p-6 border border-stroke-soft shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <CalcIcon className="w-8 h-8 text-accent" />
                    </div>
                    <div>
                      <h1 className="text-3xl font-bold text-text-primary">{name}</h1>
                      <p className="text-text-secondary mt-1">
                        {localizedContent?.description || ''}
                      </p>
                    </div>
                  </div>

                  <BwnXCalculatorForm calculator={calculator} locale={resolvedParams.locale} />
                </div>

                {/* Article section */}
                {seo.article && (
                  <CalculatorArticle 
                    title={seo.article.title}
                    content={seo.article.content}
                    locale={resolvedParams.locale}
                  />
                )}

                {/* FAQ section */}
                {seo.faqs.length > 0 && (
                  <CalculatorFAQ faqs={seo.faqs} locale={resolvedParams.locale} />
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Related calculators */}
                {seo.relatedCalculators.length > 0 && (
                  <RelatedCalculators
                    currentCalculatorId={resolvedParams.slug}
                    relatedIds={seo.relatedCalculators}
                    locale={resolvedParams.locale}
                    category={resolvedParams.category}
                  />
                )}

                {/* External links */}
                {seo.externalLinks.length > 0 && (
                  <ExternalLinks links={seo.externalLinks} locale={resolvedParams.locale} />
                )}

                {/* Ad placeholder */}
                <div className="mt-8 bg-surface-1 rounded-xl p-6 border border-stroke-soft">
                  <div className="text-center text-text-muted">
                    <p className="text-sm">Advertisement</p>
                    <div className="mt-2 bg-bg-raised rounded-lg h-64 flex items-center justify-center border border-stroke-soft">
                      <span className="text-xs">Ad Space 300x250</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}