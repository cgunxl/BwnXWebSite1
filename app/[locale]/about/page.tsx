import { Locale } from '@/lib/i18n/config';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<Locale, string> = {
    en: 'About BwnXCalculator - Your Trusted Calculator Hub',
    th: 'เกี่ยวกับ BwnXCalculator - ศูนย์รวมเครื่องคิดเลขที่คุณไว้ใจ',
    ja: 'BwnXCalculatorについて - 信頼できる計算機ハブ',
    zh: '关于BwnXCalculator - 您值得信赖的计算器中心',
    es: 'Acerca de BwnXCalculator - Tu Centro de Calculadoras de Confianza',
    fr: 'À propos de BwnXCalculator - Votre Hub de Calculatrices de Confiance',
    de: 'Über BwnXCalculator - Ihr vertrauenswürdiger Rechner-Hub',
    ko: 'BwnXCalculator 소개 - 신뢰할 수 있는 계산기 허브',
    ar: 'حول BwnXCalculator - مركز الآلات الحاسبة الموثوق',
    hi: 'BwnXCalculator के बारे में - आपका विश्वसनीय कैलकुलेटर हब',
    id: 'Tentang BwnXCalculator - Pusat Kalkulator Terpercaya Anda',
    ru: 'О BwnXCalculator - Ваш надежный центр калькуляторов',
    it: 'Informazioni su BwnXCalculator - Il tuo hub di calcolatrici affidabile',
    nl: 'Over BwnXCalculator - Uw betrouwbare rekenmachine-hub',
    vi: 'Về BwnXCalculator - Trung tâm máy tính đáng tin cậy của bạn',
    pt: 'Sobre BwnXCalculator - Seu Hub de Calculadoras Confiável',
    fa: 'درباره BwnXCalculator - مرکز ماشین حساب قابل اعتماد شما'
  };

  return {
    title: titles[locale] || titles.en,
    description: 'Learn about BwnXCalculator - providing 430+ free calculators in 17 languages for finance, health, education, and more.',
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const content: Partial<Record<Locale, any>> = {
    en: {
      title: 'About BwnXCalculator',
      subtitle: 'Your Trusted Calculator Hub Since 2024',
      mission: 'Our Mission',
      missionText: 'To make complex calculations simple and accessible to everyone, regardless of language or location. We provide accurate, reliable, and free calculation tools that help millions make informed decisions daily.',
      vision: 'Our Vision',
      visionText: 'To be the world\'s most comprehensive and localized calculator platform, offering culturally relevant tools that truly serve each community\'s unique needs.',
      features: 'What We Offer',
      featuresList: [
        '430+ specialized calculators across 15 categories',
        '17 languages with true localization, not just translation',
        'Country-specific formulas and regulations',
        'Free forever - no hidden costs or premium features',
        'Privacy-focused - all calculations happen in your browser',
        'Mobile-friendly design for calculations on the go'
      ],
      values: 'Our Values',
      valuesList: [
        'Accuracy: Every formula is verified by experts',
        'Accessibility: Available in multiple languages and devices',
        'Privacy: Your data never leaves your device',
        'Transparency: Clear explanations for every calculation',
        'Community: Built based on user feedback and needs'
      ],
      contact: 'Get in Touch',
      contactText: 'Have suggestions or found an issue? Contact us at',
      email: 'cgunxlcb@gmail.com'
    },
    th: {
      title: 'เกี่ยวกับ BwnXCalculator',
      subtitle: 'ศูนย์รวมเครื่องคิดเลขที่คุณไว้ใจ ตั้งแต่ปี 2024',
      mission: 'พันธกิจของเรา',
      missionText: 'ทำให้การคำนวณที่ซับซ้อนเป็นเรื่องง่ายและเข้าถึงได้สำหรับทุกคน ไม่ว่าจะใช้ภาษาใดหรืออยู่ที่ไหน เรามอบเครื่องมือคำนวณที่แม่นยำ เชื่อถือได้ และฟรี ช่วยให้ผู้คนนับล้านตัดสินใจอย่างมีข้อมูลทุกวัน',
      vision: 'วิสัยทัศน์ของเรา',
      visionText: 'เป็นแพลตฟอร์มเครื่องคิดเลขที่ครอบคลุมและปรับให้เข้ากับท้องถิ่นมากที่สุดในโลก นำเสนอเครื่องมือที่เหมาะสมกับวัฒนธรรมและตอบสนองความต้องการเฉพาะของแต่ละชุมชน',
      features: 'สิ่งที่เรานำเสนอ',
      featuresList: [
        'เครื่องคิดเลขเฉพาะทาง 430+ ตัว ครอบคลุม 15 หมวดหมู่',
        '17 ภาษาพร้อมการปรับให้เข้ากับท้องถิ่นอย่างแท้จริง ไม่ใช่แค่การแปล',
        'สูตรและกฎระเบียบเฉพาะประเทศ',
        'ฟรีตลอดไป - ไม่มีค่าใช้จ่ายแอบแฝงหรือฟีเจอร์พรีเมียม',
        'เน้นความเป็นส่วนตัว - การคำนวณทั้งหมดเกิดขึ้นในเบราว์เซอร์ของคุณ',
        'ดีไซน์รองรับมือถือ สำหรับการคำนวณทุกที่ทุกเวลา'
      ],
      values: 'คุณค่าของเรา',
      valuesList: [
        'ความแม่นยำ: ทุกสูตรได้รับการตรวจสอบโดยผู้เชี่ยวชาญ',
        'การเข้าถึง: ใช้ได้หลายภาษาและอุปกรณ์',
        'ความเป็นส่วนตัว: ข้อมูลของคุณไม่ออกจากอุปกรณ์',
        'ความโปร่งใส: อธิบายชัดเจนสำหรับทุกการคำนวณ',
        'ชุมชน: สร้างขึ้นจากข้อเสนอแนะและความต้องการของผู้ใช้'
      ],
      contact: 'ติดต่อเรา',
      contactText: 'มีข้อเสนอแนะหรือพบปัญหา? ติดต่อเราที่',
      email: 'cgunxlcb@gmail.com'
    },
    // Add other languages...
    ja: {
      title: 'BwnXCalculatorについて',
      subtitle: '2024年から信頼される計算機ハブ',
      mission: '私たちの使命',
      missionText: '言語や場所に関係なく、複雑な計算をシンプルで誰でもアクセスできるものにすること。',
      vision: '私たちのビジョン',
      visionText: '世界で最も包括的でローカライズされた計算機プラットフォームになること。',
      features: '提供するもの',
      featuresList: [
        '15カテゴリーにわたる430以上の専門計算機',
        '17言語での真のローカライゼーション',
        '国別の公式と規制',
        '永久無料',
        'プライバシー重視',
        'モバイルフレンドリー'
      ],
      values: '私たちの価値観',
      valuesList: [
        '正確性：すべての式は専門家によって検証',
        'アクセシビリティ：複数の言語とデバイスで利用可能',
        'プライバシー：データはデバイスを離れません',
        '透明性：すべての計算に明確な説明',
        'コミュニティ：ユーザーのフィードバックに基づいて構築'
      ],
      contact: 'お問い合わせ',
      contactText: 'ご提案や問題がありましたら、',
      email: 'cgunxlcb@gmail.com'
    }
  };

  const currentContent = content[locale] || content.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {currentContent.title}
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
          {currentContent.subtitle}
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            {currentContent.mission}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {currentContent.missionText}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            {currentContent.vision}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {currentContent.visionText}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            {currentContent.features}
          </h2>
          <ul className="space-y-3">
            {currentContent.featuresList.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            {currentContent.values}
          </h2>
          <ul className="space-y-3">
            {currentContent.valuesList.map((value: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-gray-600 dark:text-gray-300">{value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="text-center py-8 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            {currentContent.contact}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            {currentContent.contactText}
          </p>
          <a 
            href={`mailto:${currentContent.email}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            {currentContent.email}
          </a>
        </section>
      </div>
    </div>
  );
}