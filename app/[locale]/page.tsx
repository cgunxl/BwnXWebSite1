import BwnXHeader from '@/components/ui/BwnXHeader';
import CategoryGrid from '@/components/CategoryGrid';
import PopularCalculators from '@/components/PopularCalculators';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { Locale } from '@/lib/i18n/config';
import { getTopCalculators, calculatorCategories } from '@/data/calculators-complete';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const topCalculators = getTopCalculators(30);

  return (
    <div className="min-h-screen">
      <BwnXHeader locale={locale} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-aqua/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              BwnX<span className="text-accent">Calculator</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {locale === 'th' 
                ? 'ศูนย์รวมเครื่องคิดเลขออนไลน์ 430+ ประเภท รองรับ 17 ภาษา'
                : '430+ Professional Calculators in 17 Languages'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="tag">
                <span className="mr-2">🌍</span>
                17 Languages
              </div>
              <div className="tag">
                <span className="mr-2">🧮</span>
                430+ Calculators
              </div>
              <div className="tag">
                <span className="mr-2">⚡</span>
                Instant Results
              </div>
              <div className="tag">
                <span className="mr-2">🎯</span>
                100% Free
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-8">
              <h2 className="text-2xl font-semibold mb-4 text-center">
                {locale === 'th' ? 'ค้นหาเครื่องคิดเลขที่คุณต้องการ' : 'Find Your Calculator'}
              </h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder={locale === 'th' ? 'ค้นหา... (เช่น BMI, ดอกเบี้ย, ภาษี)' : 'Search... (e.g., BMI, Interest, Tax)'}
                  className="input w-full pl-12 pr-4 py-4 text-lg"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 text-xs bg-surface-1 text-text-muted rounded border border-stroke-soft">
                  /
                </kbd>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            {locale === 'th' ? 'หมวดหมู่' : 'Categories'}
          </h2>
          <CategoryGrid categories={calculatorCategories} locale={locale} />
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-bg-raised/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            {locale === 'th' ? 'เครื่องคิดเลขยอดนิยม' : 'Popular Calculators'}
          </h2>
          <PopularCalculators calculators={topCalculators} locale={locale} />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-12 text-center">
            {locale === 'th' ? 'ทำไมต้องเลือก BwnXCalculator?' : 'Why Choose BwnXCalculator?'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌐',
                title: locale === 'th' ? 'รองรับหลายภาษา' : 'Multi-Language Support',
                description: locale === 'th' 
                  ? 'ใช้งานได้ 17 ภาษา พร้อมเนื้อหาที่ปรับให้เหมาะกับแต่ละประเทศ'
                  : 'Available in 17 languages with localized content for each region'
              },
              {
                icon: '🎯',
                title: locale === 'th' ? 'แม่นยำและเชื่อถือได้' : 'Accurate & Reliable',
                description: locale === 'th'
                  ? 'สูตรคำนวณที่ผ่านการตรวจสอบ พร้อมอ้างอิงจากแหล่งข้อมูลน่าเชื่อถือ'
                  : 'Verified formulas with references from trusted sources'
              },
              {
                icon: '⚡',
                title: locale === 'th' ? 'รวดเร็วและใช้งานง่าย' : 'Fast & Easy to Use',
                description: locale === 'th'
                  ? 'คำนวณทันที ไม่ต้องรีโหลดหน้า พร้อม UI ที่ทันสมัย'
                  : 'Instant calculations without page reload, modern UI design'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-8 text-center hover:scale-105 transition-transform animate-fade-in"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === 'th' 
                ? 'เริ่มใช้งานเครื่องคิดเลขฟรีวันนี้'
                : 'Start Using Our Free Calculators Today'
              }
            </h2>
            <p className="text-xl text-text-secondary mb-8">
              {locale === 'th'
                ? 'ไม่ต้องสมัครสมาชิก ไม่มีค่าใช้จ่าย ใช้งานได้ทันที'
                : 'No registration required. No fees. Start calculating instantly.'
              }
            </p>
            <button className="btn btn-primary text-lg px-8 py-4">
              {locale === 'th' ? 'เลือกเครื่องคิดเลข' : 'Choose a Calculator'}
            </button>
          </div>
        </div>
      </section>

      <Footer locale={locale} />
      <CookieConsent locale={locale} />
    </div>
  );
}