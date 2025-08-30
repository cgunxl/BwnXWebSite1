import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CalculatorForm from '@/components/CalculatorForm';
import CalculatorChart from '@/components/CalculatorChart';
import RelatedCalculators from '@/components/RelatedCalculators';
import CalculatorArticle from '@/components/CalculatorArticle';
import CalculatorFAQ from '@/components/CalculatorFAQ';
import ShareButtons from '@/components/ShareButtons';
import { getCalculatorBySlug, getAllCalculators } from '@/lib/calculators/registry';
import { loadCalculatorData } from '@/lib/calculators/loader';
import { i18n } from '@/lib/i18n/config';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; slug: string }> 
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const calculator = await loadCalculatorData(slug);
  
  if (!calculator) {
    return {
      title: 'Calculator Not Found',
    };
  }

  const content = calculator.localizedContent[locale] || calculator.localizedContent['en'];

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: `https://calculatorhub.com/${locale}/calculator/${slug}`,
      languages: Object.fromEntries(
        i18n.locales.map(l => [l, `https://calculatorhub.com/${l}/calculator/${slug}`])
      ),
    },
    openGraph: {
      title: content.title,
      description: content.description,
      url: `https://calculatorhub.com/${locale}/calculator/${slug}`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const calculators = getAllCalculators();
  const locales = i18n.locales;
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const calc of calculators) {
      params.push({ locale, slug: calc.slug });
    }
  }
  return params;
}

export default async function CalculatorPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { locale, slug } = await params;
  const searchParamsData = await searchParams;
  const calculator = await loadCalculatorData(slug);

  if (!calculator) {
    notFound();
  }

  const content = calculator.localizedContent[locale] || calculator.localizedContent['en'];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <a href={`/${locale}`} className="text-blue-600 hover:text-blue-800">
          {locale === 'th' ? 'หน้าแรก' : 'Home'}
        </a>
        <span className="mx-2 text-gray-500">/</span>
        <a href={`/${locale}/category/${calculator.category}`} className="text-blue-600 hover:text-blue-800">
          {getCategoryName(calculator.category, locale)}
        </a>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">{content.title}</span>
      </nav>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Section */}
        <div className="lg:col-span-2">
          {/* Title and Description */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="text-4xl mr-3">{calculator.icon}</span>
              {content.title}
            </h1>
            <p className="text-lg text-gray-600">
              {content.description}
            </p>
          </div>

          {/* Calculator Form */}
          <CalculatorForm 
            calculator={calculator} 
            locale={locale}
            initialInputs={searchParamsData}
          />

          {/* Share Buttons */}
          <div className="mt-8">
            <ShareButtons 
              url={`https://calculatorhub.com/${locale}/calculator/${slug}`}
              title={content.title}
              locale={locale}
            />
          </div>

          {/* Article Content */}
          <div className="mt-12">
            <CalculatorArticle article={content.article} locale={locale} />
          </div>

          {/* Examples */}
          {content.examples && content.examples.length > 0 && (
            <div className="mt-12 bg-blue-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {locale === 'th' ? 'ตัวอย่างการคำนวณ' : 'Calculation Examples'}
              </h2>
              <div className="space-y-6">
                {content.examples.map((example, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-2">{example.title}</h3>
                    <p className="text-gray-600 mb-3">{example.explanation}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Inputs:</span>
                        <pre className="mt-1 text-xs bg-gray-50 p-2 rounded">
                          {JSON.stringify(example.inputs, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <span className="font-medium">Results:</span>
                        <pre className="mt-1 text-xs bg-gray-50 p-2 rounded">
                          {JSON.stringify(example.outputs, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          <div className="mt-12">
            <CalculatorFAQ faq={content.faq} locale={locale} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Related Calculators */}
          <div className="sticky top-24">
            <RelatedCalculators 
              currentCalculator={calculator}
              locale={locale}
            />

            {/* References */}
            {content.references && content.references.length > 0 && (
              <div className="mt-8 bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {locale === 'th' ? 'แหล่งอ้างอิง' : 'References'}
                </h3>
                <ul className="space-y-3">
                  {content.references.map((ref, index) => (
                    <li key={index} className="text-sm">
                      <a 
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-start"
                      >
                        <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>
                          {ref.title}
                          <span className="block text-gray-500 text-xs mt-1">
                            {ref.publisher}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Tips */}
            <div className="mt-8 bg-yellow-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">💡</span>
                {locale === 'th' ? 'เคล็ดลับ' : 'Quick Tips'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  {locale === 'th' 
                    ? 'บันทึก URL เพื่อเก็บค่าที่คำนวณไว้' 
                    : 'Bookmark the URL to save your calculations'}
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  {locale === 'th'
                    ? 'ดาวน์โหลดผลลัพธ์เป็น CSV ได้'
                    : 'Download results as CSV for records'}
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  {locale === 'th'
                    ? 'พิมพ์หรือบันทึกเป็น PDF'
                    : 'Print or save as PDF'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryName(category: string, locale: string): string {
  const names: Record<string, Record<string, string>> = {
    finance: { en: 'Finance', th: 'การเงิน' },
    health: { en: 'Health', th: 'สุขภาพ' },
    education: { en: 'Education', th: 'การศึกษา' },
    engineering: { en: 'Engineering', th: 'วิศวกรรม' },
    // Add more...
  };
  return names[category]?.[locale] || names[category]?.['en'] || category;
}