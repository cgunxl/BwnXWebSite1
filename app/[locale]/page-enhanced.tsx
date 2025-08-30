import { Metadata } from 'next';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import PopularCalculators from '@/components/PopularCalculators';
import CategoryGrid from '@/components/CategoryGrid';
import { getAllCalculators, calculatorCategories } from '@/lib/calculators/registry';
import { Locale } from '@/lib/i18n/config';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<Locale, string> = {
    en: 'Calculator Hub - 430+ Free Online Calculators',
    th: 'ศูนย์เครื่องคิดเลข - คำนวณออนไลน์ฟรี 430+ แบบ',
    ja: '電卓ハブ - 430以上の無料オンライン計算機',
    de: 'Rechner-Hub - 430+ Kostenlose Online-Rechner',
    zh: '计算器中心 - 430+免费在线计算器',
    es: 'Centro de Calculadoras - 430+ Calculadoras En Línea Gratis',
    pt: 'Centro de Calculadoras - 430+ Calculadoras Online Grátis',
    fr: 'Centre de Calculatrices - 430+ Calculatrices En Ligne Gratuites',
    ko: '계산기 허브 - 430개 이상의 무료 온라인 계산기',
    ar: 'مركز الآلات الحاسبة - أكثر من 430 آلة حاسبة مجانية',
    hi: 'कैलकुलेटर हब - 430+ मुफ्त ऑनलाइन कैलकुलेटर',
    id: 'Pusat Kalkulator - 430+ Kalkulator Online Gratis',
    ru: 'Центр Калькуляторов - 430+ Бесплатных Онлайн Калькуляторов',
    it: 'Centro Calcolatrici - 430+ Calcolatrici Online Gratuite',
    nl: 'Rekenmachine Hub - 430+ Gratis Online Rekenmachines',
    vi: 'Trung Tâm Máy Tính - 430+ Máy Tính Trực Tuyến Miễn Phí',
    fa: 'مرکز ماشین حساب - بیش از 430 ماشین حساب آنلاین رایگان',
  };

  const descriptions: Record<Locale, string> = {
    en: 'Access 430+ free online calculators for finance, health, education, and more. Instant results with country-specific calculations.',
    th: 'เข้าถึงเครื่องคิดเลขออนไลน์ฟรีกว่า 430 แบบ สำหรับการเงิน สุขภาพ การศึกษา และอื่นๆ ผลลัพธ์ทันทีพร้อมการคำนวณเฉพาะประเทศ',
    ja: '金融、健康、教育などのための430以上の無料オンライン計算機にアクセス。国別計算で即座に結果を取得。',
    de: 'Zugriff auf über 430 kostenlose Online-Rechner für Finanzen, Gesundheit, Bildung und mehr. Sofortige Ergebnisse mit länderspezifischen Berechnungen.',
    zh: '访问430多个免费在线计算器，涵盖金融、健康、教育等领域。即时结果与特定国家的计算。',
    // Add more...
  };

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: [
      'calculator', 'online calculator', 'free calculator',
      'financial calculator', 'health calculator', 'education calculator',
      'mortgage calculator', 'loan calculator', 'BMI calculator',
    ],
    alternates: {
      canonical: `https://calculatorhub.com/${locale}`,
      languages: {
        'en': 'https://calculatorhub.com/en',
        'th': 'https://calculatorhub.com/th',
        'ja': 'https://calculatorhub.com/ja',
        'de': 'https://calculatorhub.com/de',
        'zh': 'https://calculatorhub.com/zh',
        'es': 'https://calculatorhub.com/es',
        'pt': 'https://calculatorhub.com/pt',
        'fr': 'https://calculatorhub.com/fr',
        'ko': 'https://calculatorhub.com/ko',
        'ar': 'https://calculatorhub.com/ar',
        'hi': 'https://calculatorhub.com/hi',
        'id': 'https://calculatorhub.com/id',
        'ru': 'https://calculatorhub.com/ru',
        'it': 'https://calculatorhub.com/it',
        'nl': 'https://calculatorhub.com/nl',
        'vi': 'https://calculatorhub.com/vi',
        'fa': 'https://calculatorhub.com/fa',
      },
    },
  };
}

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ locale: Locale }> 
}) {
  const { locale } = await params;
  const allCalculators = getAllCalculators();
  
  // Get top 30 recommended calculators
  const recommendedCalculators = [
    'loan-calculator',
    'mortgage-calculator',
    'bmi-calculator',
    'calorie-calculator',
    'tax-calculator',
    'retirement-calculator',
    'compound-interest',
    'currency-converter',
    'gpa-calculator',
    'percentage-calculator',
    'car-loan-calculator',
    'credit-card-interest',
    'savings-goal',
    'inflation-calculator',
    'roi-calculator',
    'bmr-calculator',
    'pregnancy-due-date',
    'age-calculator',
    'tip-calculator',
    'discount-calculator',
    'vat-calculator',
    'salary-calculator',
    'fuel-cost-calculator',
    'break-even',
    'profit-margin',
    'crypto-profit',
    'stock-return',
    'dividend-calculator',
    'paycheck-calculator',
    'overtime-pay',
  ];

  const getLocalizedText = (key: string): string => {
    const texts: Record<string, Record<Locale, string>> = {
      hero_title: {
        en: '430+ Free Online Calculators',
        th: 'เครื่องคิดเลขออนไลน์ฟรี 430+ แบบ',
        ja: '430以上の無料オンライン計算機',
        de: '430+ Kostenlose Online-Rechner',
        zh: '430+免费在线计算器',
        es: '430+ Calculadoras En Línea Gratis',
        pt: '430+ Calculadoras Online Grátis',
        fr: '430+ Calculatrices En Ligne Gratuites',
        ko: '430개 이상의 무료 온라인 계산기',
        ar: 'أكثر من 430 آلة حاسبة مجانية',
        hi: '430+ मुफ्त ऑनलाइन कैलकुलेटर',
        id: '430+ Kalkulator Online Gratis',
        ru: '430+ Бесплатных Онлайн Калькуляторов',
        it: '430+ Calcolatrici Online Gratuite',
        nl: '430+ Gratis Online Rekenmachines',
        vi: '430+ Máy Tính Trực Tuyến Miễn Phí',
        fa: 'بیش از 430 ماشین حساب آنلاین رایگان',
      },
      hero_subtitle: {
        en: 'Professional calculators with country-specific formulas and instant results',
        th: 'เครื่องคิดเลขระดับมืออาชีพ พร้อมสูตรเฉพาะประเทศและผลลัพธ์ทันที',
        ja: '国別の公式と即座の結果を備えたプロフェッショナル計算機',
        de: 'Professionelle Rechner mit länderspezifischen Formeln und sofortigen Ergebnissen',
        zh: '具有特定国家公式和即时结果的专业计算器',
        // Add more...
      },
      search_placeholder: {
        en: 'Search for a calculator...',
        th: 'ค้นหาเครื่องคิดเลข...',
        ja: '計算機を検索...',
        de: 'Rechner suchen...',
        zh: '搜索计算器...',
        // Add more...
      },
      categories_title: {
        en: 'Calculator Categories',
        th: 'หมวดหมู่เครื่องคิดเลข',
        ja: '計算機のカテゴリー',
        de: 'Rechner-Kategorien',
        zh: '计算器类别',
        // Add more...
      },
      recommended_title: {
        en: 'Recommended Calculators',
        th: 'เครื่องคิดเลขแนะนำ',
        ja: 'おすすめの計算機',
        de: 'Empfohlene Rechner',
        zh: '推荐的计算器',
        // Add more...
      },
    };

    return texts[key]?.[locale] || texts[key]?.en || key;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animation */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative">
          <div className="text-center max-w-4xl mx-auto animate-slideIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {getLocalizedText('hero_title')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
              {getLocalizedText('hero_subtitle')}
            </p>
            
            {/* Animated Search Bar */}
            <div className="max-w-2xl mx-auto animate-slideUp">
              <SearchBar 
                locale={locale} 
                placeholder={getLocalizedText('search_placeholder')}
                calculators={allCalculators}
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { number: '430+', label: 'Calculators' },
                { number: '17', label: 'Languages' },
                { number: '100%', label: 'Free' },
                { number: '24/7', label: 'Available' },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover-lift animate-scaleIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeIn">
            {getLocalizedText('categories_title')}
          </h2>
          <CategoryGrid locale={locale} />
        </div>
      </section>

      {/* Recommended Calculators with Modal */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeIn">
            {getLocalizedText('recommended_title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {recommendedCalculators.map((calcId, index) => {
              const calculator = allCalculators.find(c => c.slug === calcId);
              if (!calculator) return null;

              return (
                <Link
                  key={calcId}
                  href={`/${locale}/calculator/${calcId}`}
                  className="group relative bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover-lift animate-slideIn"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{calculator.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {calculator.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {calculator.category}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Link>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href={`/${locale}/calculators`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="mr-2">View All 430+ Calculators</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌍',
                title: 'Country-Specific',
                description: 'Calculations tailored for your region with local currencies, tax rates, and standards.',
              },
              {
                icon: '📊',
                title: 'Visual Results',
                description: 'Interactive charts and animations make understanding your results easy and intuitive.',
              },
              {
                icon: '💾',
                title: 'Save & Share',
                description: 'Download results as CSV, print reports, or share calculations with a simple link.',
              },
              {
                icon: '🔒',
                title: 'Privacy First',
                description: 'All calculations happen in your browser. No data is sent to our servers.',
              },
              {
                icon: '📱',
                title: 'Mobile Friendly',
                description: 'Works perfectly on all devices - phones, tablets, and desktops.',
              },
              {
                icon: '🎯',
                title: 'Accurate & Reliable',
                description: 'Based on official formulas and standards with references provided.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover-lift animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Calculating Now
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions using our calculators every day
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={`/${locale}/calculator/loan-calculator`}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Try Loan Calculator
            </Link>
            <Link
              href={`/${locale}/calculator/bmi-calculator`}
              className="px-8 py-4 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-all duration-300 transform hover:scale-105"
            >
              Try BMI Calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// CSS for grid pattern background
const gridPatternStyles = `
  .bg-grid-pattern {
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
  }
`;