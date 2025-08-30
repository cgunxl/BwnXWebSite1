import { Metadata } from 'next';
import Link from 'next/link';
import { calculatorCategories, getPopularCalculators } from '@/lib/calculators/registry';
import SearchBar from '@/components/SearchBar';
import PopularCalculators from '@/components/PopularCalculators';
import CategoryGrid from '@/components/CategoryGrid';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    en: 'Free Online Calculator Hub - 430+ Calculators',
    th: 'ศูนย์รวมเครื่องคิดเลขออนไลน์ฟรี - 430+ เครื่องมือ',
    es: 'Centro de Calculadoras en Línea Gratis - 430+ Herramientas',
    pt: 'Centro de Calculadoras Online Grátis - 430+ Ferramentas',
    de: 'Kostenloser Online-Rechner Hub - 430+ Rechner',
    fr: 'Hub de Calculatrices en Ligne Gratuit - 430+ Outils',
    ja: '無料オンライン計算機ハブ - 430以上のツール',
    ko: '무료 온라인 계산기 허브 - 430개 이상의 도구',
    zh: '免费在线计算器中心 - 430多种工具',
    ar: 'مركز الآلات الحاسبة المجانية - أكثر من 430 أداة',
    hi: 'मुफ्त ऑनलाइन कैलकुलेटर हब - 430+ उपकरण',
    id: 'Pusat Kalkulator Online Gratis - 430+ Alat',
    ru: 'Бесплатный онлайн калькулятор - 430+ инструментов',
    it: 'Hub di Calcolatrici Online Gratuito - 430+ Strumenti',
    nl: 'Gratis Online Calculator Hub - 430+ Rekenmachines',
    vi: 'Trung tâm Máy tính Trực tuyến Miễn phí - 430+ Công cụ',
    fa: 'مرکز ماشین حساب آنلاین رایگان - بیش از 430 ابزار',
  };

  const descriptions = {
    en: 'Access 430+ free online calculators for finance, health, education, engineering, and more. Professional tools with instant results.',
    th: 'เข้าถึงเครื่องคิดเลขออนไลน์ฟรีกว่า 430 ตัว สำหรับการเงิน สุขภาพ การศึกษา วิศวกรรม และอื่นๆ เครื่องมือระดับมืออาชีพพร้อมผลลัพธ์ทันที',
    // Add more languages...
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    alternates: {
      canonical: `https://calculatorhub.com/${locale}`,
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const popularCalculators = getPopularCalculators(30);

  const heroContent = {
    en: {
      title: 'Your Complete Calculator Hub',
      subtitle: '430+ Professional Calculators at Your Fingertips',
      description: 'From financial planning to health assessments, find the perfect calculator for your needs. All tools are free, accurate, and available in 17 languages.',
      searchPlaceholder: 'Search for a calculator...',
    },
    th: {
      title: 'ศูนย์รวมเครื่องคิดเลขครบวงจร',
      subtitle: 'เครื่องมือคำนวณระดับมืออาชีพกว่า 430 ชนิด',
      description: 'ตั้งแต่การวางแผนการเงินไปจนถึงการประเมินสุขภาพ ค้นหาเครื่องคิดเลขที่เหมาะกับความต้องการของคุณ ทุกเครื่องมือฟรี แม่นยำ และใช้ได้ใน 17 ภาษา',
      searchPlaceholder: 'ค้นหาเครื่องคิดเลข...',
    },
    // Add more languages...
  };

  const content = heroContent[locale as keyof typeof heroContent] || heroContent.en;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {content.title}
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          {content.subtitle}
        </p>
        <p className="text-gray-500 max-w-3xl mx-auto mb-8">
          {content.description}
        </p>

        {/* Search Bar */}
        <SearchBar locale={locale} placeholder={content.searchPlaceholder} />
      </section>

      {/* Popular Calculators */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {locale === 'th' ? 'เครื่องคิดเลขยอดนิยม' : 'Popular Calculators'}
        </h2>
        <PopularCalculators calculators={popularCalculators} locale={locale} />
      </section>

      {/* Categories Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {locale === 'th' ? 'หมวดหมู่ทั้งหมด' : 'All Categories'}
        </h2>
        <CategoryGrid categories={calculatorCategories} locale={locale} />
      </section>

      {/* Features Section */}
      <section className="bg-white rounded-2xl shadow-xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {locale === 'th' ? 'ทำไมต้องเลือกเรา' : 'Why Choose Our Calculators'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon="🎯"
            title={locale === 'th' ? 'แม่นยำ' : 'Accurate'}
            description={locale === 'th' ? 'สูตรคำนวณที่ผ่านการตรวจสอบ' : 'Verified formulas and calculations'}
          />
          <FeatureCard
            icon="🌍"
            title={locale === 'th' ? '17 ภาษา' : '17 Languages'}
            description={locale === 'th' ? 'รองรับผู้ใช้ทั่วโลก' : 'Supporting users worldwide'}
          />
          <FeatureCard
            icon="📱"
            title={locale === 'th' ? 'ใช้ได้ทุกอุปกรณ์' : 'Responsive'}
            description={locale === 'th' ? 'ใช้งานได้บนมือถือและคอมพิวเตอร์' : 'Works on all devices'}
          />
          <FeatureCard
            icon="🆓"
            title={locale === 'th' ? 'ฟรี 100%' : '100% Free'}
            description={locale === 'th' ? 'ไม่มีค่าใช้จ่ายใดๆ' : 'No hidden costs or fees'}
          />
        </div>
      </section>

      {/* Statistics */}
      <section className="text-center mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard number="430+" label={locale === 'th' ? 'เครื่องคิดเลข' : 'Calculators'} />
          <StatCard number="17" label={locale === 'th' ? 'ภาษา' : 'Languages'} />
          <StatCard number="14" label={locale === 'th' ? 'หมวดหมู่' : 'Categories'} />
          <StatCard number="100%" label={locale === 'th' ? 'ฟรี' : 'Free'} />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
      <div className="text-3xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}