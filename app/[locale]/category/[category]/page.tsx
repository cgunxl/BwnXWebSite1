import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { calculatorCategories, getCalculatorsByCategory } from '@/lib/calculators/registry';
import { i18n } from '@/lib/i18n/config';
import { CalculatorCategory } from '@/lib/types/calculator';
import SearchBar from '@/components/SearchBar';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string; category: string }> 
}): Promise<Metadata> {
  const { locale, category } = await params;
  const categoryInfo = calculatorCategories[category as CalculatorCategory];
  
  if (!categoryInfo) {
    return {
      title: 'Category Not Found',
    };
  }

  const titles = {
    en: `${categoryInfo.name} Calculators - Free Online Tools`,
    th: `เครื่องคิดเลข${getCategoryNameThai(category)} - เครื่องมือออนไลน์ฟรี`,
    // Add more languages...
  };

  const descriptions = {
    en: `Free ${categoryInfo.name.toLowerCase()} calculators online. ${categoryInfo.description}`,
    th: `เครื่องคิดเลข${getCategoryNameThai(category)}ออนไลน์ฟรี ${getCategoryDescriptionThai(category)}`,
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://bwn-x-web-site1.vercel.app/${locale}/category/${category}`,
      languages: Object.fromEntries(
        i18n.locales.map(l => [l, `https://bwn-x-web-site1.vercel.app/${l}/category/${category}`])
      ),
    },
  };
}

export async function generateStaticParams() {
  const categories = Object.keys(calculatorCategories);
  const locales = ['en', 'th', 'es', 'pt', 'de', 'fr', 'ja', 'ko', 'zh', 'ar', 'hi', 'id', 'ru', 'it', 'nl', 'vi', 'fa'];
  
  const params = [];
  for (const locale of locales) {
    for (const category of categories) {
      params.push({ locale, category });
    }
  }
  
  return params;
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ locale: string; category: string }> 
}) {
  const { locale, category } = await params;
  const categoryInfo = calculatorCategories[category as CalculatorCategory];
  
  if (!categoryInfo) {
    notFound();
  }

  const calculatorSlugs = getCalculatorsByCategory(category as CalculatorCategory);
  
  // Convert slugs to calculator objects
  const calculators = calculatorSlugs.map(slug => ({
    id: slug,
    slug: slug,
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: category
  }));
  
  // Group calculators by subcategory or popularity
  const featuredCalculators = calculators.slice(0, 6);
  const allCalculators = calculators;

  const pageContent = {
    en: {
      title: `${categoryInfo.name} Calculators`,
      subtitle: categoryInfo.description,
      featuredTitle: 'Popular Calculators',
      allTitle: `All ${categoryInfo.name} Calculators`,
      searchPlaceholder: `Search ${categoryInfo.name.toLowerCase()} calculators...`,
      breadcrumbHome: 'Home',
      breadcrumbCategories: 'Categories',
      tryCalculator: 'Try Calculator',
      freeOnline: 'Free Online',
      instantResults: 'Instant Results',
      noDownload: 'No Download Required',
    },
    th: {
      title: `เครื่องคิดเลข${getCategoryNameThai(category)}`,
      subtitle: getCategoryDescriptionThai(category),
      featuredTitle: 'เครื่องคิดเลขยอดนิยม',
      allTitle: `เครื่องคิดเลข${getCategoryNameThai(category)}ทั้งหมด`,
      searchPlaceholder: `ค้นหาเครื่องคิดเลข${getCategoryNameThai(category)}...`,
      breadcrumbHome: 'หน้าแรก',
      breadcrumbCategories: 'หมวดหมู่',
      tryCalculator: 'ลองใช้งาน',
      freeOnline: 'ฟรีออนไลน์',
      instantResults: 'ผลลัพธ์ทันที',
      noDownload: 'ไม่ต้องดาวน์โหลด',
    },
  };

  const content = pageContent[locale as keyof typeof pageContent] || pageContent.en;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm">
        <Link href={`/${locale}`} className="text-blue-600 hover:text-blue-800">
          {content.breadcrumbHome}
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <Link href={`/${locale}/categories`} className="text-blue-600 hover:text-blue-800">
          {content.breadcrumbCategories}
        </Link>
        <span className="mx-2 text-gray-500">/</span>
        <span className="text-gray-700">{categoryInfo.name}</span>
      </nav>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-4">
          <span className="text-4xl">{categoryInfo.icon}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {content.title}
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          {content.subtitle}
        </p>

        {/* Category Search */}
        <div className="max-w-2xl mx-auto">
          <SearchBar locale={locale} placeholder={content.searchPlaceholder} />
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard 
          icon="🧮" 
          number={calculators.length} 
          label={locale === 'th' ? 'เครื่องคิดเลข' : 'Calculators'} 
        />
        <StatCard 
          icon="🆓" 
          number="100%" 
          label={content.freeOnline} 
        />
        <StatCard 
          icon="⚡" 
          number="<1s" 
          label={content.instantResults} 
        />
        <StatCard 
          icon="☁️" 
          number="0 MB" 
          label={content.noDownload} 
        />
      </div>

      {/* Featured Calculators */}
      {featuredCalculators.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {content.featuredTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCalculators.map((calc) => (
              <CalculatorCard 
                key={calc.id}
                calculator={calc}
                locale={locale}
                buttonText={content.tryCalculator}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Calculators Grid */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {content.allTitle} ({allCalculators.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {allCalculators.map((calc) => (
            <Link
              key={calc.id}
              href={`/${locale}/calculator/${calc.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-blue-500">
                <div className="text-2xl mb-2 text-center">
                  {getCalculatorIcon(calc.slug)}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                  {calc.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Description */}
      <section className="mt-16 bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {locale === 'th' 
            ? `เกี่ยวกับเครื่องคิดเลข${getCategoryNameThai(category)}` 
            : `About ${categoryInfo.name} Calculators`}
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700">
          {getCategoryLongDescription(category, locale)}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, number, label }: { icon: string; number: string | number; label: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-blue-600">{number}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function CalculatorCard({ 
  calculator, 
  locale, 
  buttonText 
}: { 
  calculator: any; 
  locale: string; 
  buttonText: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="text-3xl">{getCalculatorIcon(calculator.slug)}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {calculator.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {getCalculatorDescription(calculator.slug, locale)}
          </p>
          <Link
            href={`/${locale}/calculator/${calculator.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            {buttonText}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

function getCategoryNameThai(category: string): string {
  const names: Record<string, string> = {
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
    conversion: 'แปลงหน่วย',
    logistics: 'โลจิสติกส์',
    household: 'ครัวเรือน',
    miscellaneous: 'อื่นๆ',
  };
  return names[category] || category;
}

function getCategoryDescriptionThai(category: string): string {
  const descriptions: Record<string, string> = {
    finance: 'คำนวณเงินกู้ การลงทุน ภาษี และการวางแผนการเงิน',
    health: 'คำนวณ BMI แคลอรี่ โภชนาการ และดูแลสุขภาพ',
    education: 'เครื่องมือคณิตศาสตร์ ฟิสิกส์ เคมี และการศึกษา',
    // Add more...
  };
  return descriptions[category] || '';
}

function getCategoryLongDescription(category: string, locale: string): string {
  if (locale === 'th') {
    const descriptions: Record<string, string> = {
      finance: 'เครื่องคิดเลขการเงินช่วยให้คุณวางแผนการเงินได้อย่างมีประสิทธิภาพ ไม่ว่าจะเป็นการคำนวณเงินกู้ ดอกเบี้ย การลงทุน หรือการวางแผนเกษียณ เครื่องมือเหล่านี้ช่วยให้คุณตัดสินใจทางการเงินได้อย่างมั่นใจ',
      health: 'เครื่องคิดเลขสุขภาพช่วยติดตามและปรับปรุงสุขภาพของคุณ ตั้งแต่การคำนวณ BMI แคลอรี่ที่ต้องการ ไปจนถึงการวางแผนโภชนาการและการออกกำลังกาย',
      // Add more...
    };
    return descriptions[category] || '';
  }
  
  const descriptions: Record<string, string> = {
    finance: 'Financial calculators help you make informed decisions about loans, investments, taxes, and retirement planning. From simple interest calculations to complex investment analysis, these tools provide instant, accurate results.',
    health: 'Health calculators assist in monitoring and improving your well-being. Calculate your BMI, daily calorie needs, ideal weight, and more to maintain a healthy lifestyle.',
    // Add more...
  };
  return descriptions[category] || '';
}

function getCalculatorIcon(slug: string): string {
  const icons: Record<string, string> = {
    'loan-calculator': '💰',
    'mortgage-calculator': '🏠',
    'bmi-calculator': '⚖️',
    'calorie-calculator': '🍎',
    // Add more icons...
  };
  return icons[slug] || '🧮';
}

function getCalculatorDescription(slug: string, locale: string): string {
  const descriptions: Record<string, Record<string, string>> = {
    'loan-calculator': {
      en: 'Calculate loan payments, interest, and amortization schedules',
      th: 'คำนวณค่างวด ดอกเบี้ย และตารางผ่อนชำระ',
    },
    'mortgage-calculator': {
      en: 'Calculate mortgage payments with taxes and insurance',
      th: 'คำนวณค่างวดบ้านพร้อมภาษีและประกัน',
    },
    // Add more descriptions...
  };
  return descriptions[slug]?.[locale] || descriptions[slug]?.['en'] || 'Professional calculator tool';
}