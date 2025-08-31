import { Locale } from '@/lib/i18n/config';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<Locale, string> = {
    en: 'Privacy Policy - BwnXCalculator',
    es: 'Política de Privacidad - BwnXCalculator',
    pt: 'Política de Privacidade - BwnXCalculator',
    de: 'Datenschutzerklärung - BwnXCalculator',
    fr: 'Politique de Confidentialité - BwnXCalculator',
    ja: 'プライバシーポリシー - BwnXCalculator',
    ko: '개인정보 보호정책 - BwnXCalculator',
    zh: '隐私政策 - BwnXCalculator',
    th: 'นโยบายความเป็นส่วนตัว - BwnXCalculator',
    ar: 'سياسة الخصوصية - BwnXCalculator',
    hi: 'गोपनीयता नीति - BwnXCalculator',
    id: 'Kebijakan Privasi - BwnXCalculator',
    ru: 'Политика конфиденциальности - BwnXCalculator',
    it: 'Informativa sulla Privacy - BwnXCalculator',
    nl: 'Privacybeleid - BwnXCalculator',
    vi: 'Chính sách Bảo mật - BwnXCalculator',
    fa: 'سیاست حفظ حریم خصوصی - BwnXCalculator'
  };

  return {
    title: titles[locale] || titles.en,
    description: 'Learn how BwnXCalculator protects your privacy and handles your data across our 430+ calculators in 17 languages.',
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const content: Partial<Record<Locale, any>> = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: December 2024',
      intro: 'At BwnXCalculator, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our calculator services.',
      sections: [
        {
          title: '1. Information We Collect',
          content: [
            'Usage Data: We collect anonymous usage statistics through Google Analytics to improve our services.',
            'Cookies: We use cookies to remember your language preference, theme settings (dark/light mode), and for analytics purposes.',
            'Calculator Inputs: All calculations are performed locally in your browser. We do not store or transmit your calculation data.',
            'Contact Information: Only collected if you voluntarily contact us via email.'
          ]
        },
        {
          title: '2. How We Use Your Information',
          content: [
            'To provide and improve our calculator services',
            'To remember your preferences (language, theme)',
            'To analyze usage patterns and optimize performance',
            'To display relevant advertisements through our advertising partners',
            'To respond to your inquiries when you contact us'
          ]
        },
        {
          title: '3. Advertising',
          content: [
            'We use third-party advertising partners (Google AdSense, Ezoic, PropellerAds) to display ads.',
            'These partners may use cookies to show relevant ads based on your browsing history.',
            'You can opt-out of personalized advertising through your browser settings or ad preferences.',
            'We do not sell your personal data to advertisers.'
          ]
        },
        {
          title: '4. Data Security',
          content: [
            'All data transmission is encrypted using HTTPS protocol.',
            'Calculations are performed locally - your data never leaves your device.',
            'We implement industry-standard security measures to protect our website.',
            'We regularly update our security practices to ensure your safety.'
          ]
        },
        {
          title: '5. Your Rights',
          content: [
            'Access: You can request information about data we have about you.',
            'Deletion: You can request deletion of your data.',
            'Opt-out: You can disable cookies in your browser settings.',
            'Correction: You can request correction of inaccurate data.',
            'Portability: You can request your data in a portable format.'
          ]
        },
        {
          title: '6. Third-Party Links',
          content: [
            'Our calculators may contain links to external websites.',
            'We are not responsible for the privacy practices of these external sites.',
            'We recommend reviewing the privacy policies of any external sites you visit.'
          ]
        },
        {
          title: '7. Children\'s Privacy',
          content: [
            'Our services are not directed to children under 13.',
            'We do not knowingly collect personal information from children.',
            'If you believe we have collected data from a child, please contact us immediately.'
          ]
        },
        {
          title: '8. Changes to This Policy',
          content: [
            'We may update this Privacy Policy from time to time.',
            'Significant changes will be announced on our website.',
            'Continued use of our services constitutes acceptance of the updated policy.'
          ]
        },
        {
          title: '9. Contact Us',
          content: [
            'If you have questions about this Privacy Policy, please contact us:',
            'Email: cgunxlcb@gmail.com',
            'Website: https://bwnxcalculator.com'
          ]
        }
      ]
    },
    th: {
      title: 'นโยบายความเป็นส่วนตัว',
      lastUpdated: 'อัปเดตล่าสุด: ธันวาคม 2567',
      intro: 'ที่ BwnXCalculator เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ นโยบายความเป็นส่วนตัวนี้อธิบายวิธีที่เราเก็บรวบรวม ใช้ และปกป้องข้อมูลของคุณเมื่อใช้บริการเครื่องคิดเลขของเรา',
      sections: [
        {
          title: '1. ข้อมูลที่เราเก็บรวบรวม',
          content: [
            'ข้อมูลการใช้งาน: เราเก็บสถิติการใช้งานแบบไม่ระบุตัวตนผ่าน Google Analytics เพื่อปรับปรุงบริการ',
            'คุกกี้: เราใช้คุกกี้เพื่อจดจำภาษาที่คุณเลือก การตั้งค่าธีม (โหมดมืด/สว่าง) และเพื่อการวิเคราะห์',
            'ข้อมูลการคำนวณ: การคำนวณทั้งหมดทำในเบราว์เซอร์ของคุณ เราไม่เก็บหรือส่งข้อมูลการคำนวณของคุณ',
            'ข้อมูลติดต่อ: เก็บเฉพาะเมื่อคุณติดต่อเราทางอีเมลเท่านั้น'
          ]
        },
        {
          title: '2. วิธีที่เราใช้ข้อมูลของคุณ',
          content: [
            'เพื่อให้บริการและปรับปรุงเครื่องคิดเลขของเรา',
            'เพื่อจดจำการตั้งค่าของคุณ (ภาษา, ธีม)',
            'เพื่อวิเคราะห์รูปแบบการใช้งานและเพิ่มประสิทธิภาพ',
            'เพื่อแสดงโฆษณาที่เกี่ยวข้องผ่านพาร์ทเนอร์โฆษณา',
            'เพื่อตอบข้อซักถามเมื่อคุณติดต่อเรา'
          ]
        },
        {
          title: '3. การโฆษณา',
          content: [
            'เราใช้พาร์ทเนอร์โฆษณาบุคคลที่สาม (Google AdSense, Ezoic, PropellerAds) เพื่อแสดงโฆษณา',
            'พาร์ทเนอร์เหล่านี้อาจใช้คุกกี้เพื่อแสดงโฆษณาที่เกี่ยวข้องตามประวัติการเรียกดูของคุณ',
            'คุณสามารถปิดการโฆษณาส่วนบุคคลผ่านการตั้งค่าเบราว์เซอร์หรือการตั้งค่าโฆษณา',
            'เราไม่ขายข้อมูลส่วนบุคคลของคุณให้กับผู้โฆษณา'
          ]
        },
        {
          title: '4. ความปลอดภัยของข้อมูล',
          content: [
            'การส่งข้อมูลทั้งหมดเข้ารหัสด้วยโปรโตคอล HTTPS',
            'การคำนวณทำในเครื่องของคุณ - ข้อมูลไม่ออกจากอุปกรณ์ของคุณ',
            'เราใช้มาตรการรักษาความปลอดภัยมาตรฐานอุตสาหกรรมเพื่อปกป้องเว็บไซต์',
            'เราอัปเดตแนวทางปฏิบัติด้านความปลอดภัยอย่างสม่ำเสมอเพื่อความปลอดภัยของคุณ'
          ]
        },
        {
          title: '5. สิทธิของคุณ',
          content: [
            'การเข้าถึง: คุณสามารถขอข้อมูลที่เรามีเกี่ยวกับคุณ',
            'การลบ: คุณสามารถขอให้ลบข้อมูลของคุณ',
            'การปฏิเสธ: คุณสามารถปิดคุกกี้ในการตั้งค่าเบราว์เซอร์',
            'การแก้ไข: คุณสามารถขอแก้ไขข้อมูลที่ไม่ถูกต้อง',
            'การพกพา: คุณสามารถขอข้อมูลในรูปแบบที่พกพาได้'
          ]
        },
        {
          title: '6. ลิงก์ภายนอก',
          content: [
            'เครื่องคิดเลขของเราอาจมีลิงก์ไปยังเว็บไซต์ภายนอก',
            'เราไม่รับผิดชอบต่อแนวทางปฏิบัติด้านความเป็นส่วนตัวของเว็บไซต์ภายนอก',
            'เราแนะนำให้ตรวจสอบนโยบายความเป็นส่วนตัวของเว็บไซต์ภายนอกที่คุณเข้าชม'
          ]
        },
        {
          title: '7. ความเป็นส่วนตัวของเด็ก',
          content: [
            'บริการของเราไม่ได้มุ่งเน้นไปที่เด็กอายุต่ำกว่า 13 ปี',
            'เราไม่เก็บข้อมูลส่วนบุคคลจากเด็กโดยเจตนา',
            'หากคุณเชื่อว่าเราเก็บข้อมูลจากเด็ก กรุณาติดต่อเราทันที'
          ]
        },
        {
          title: '8. การเปลี่ยนแปลงนโยบาย',
          content: [
            'เราอาจอัปเดตนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว',
            'การเปลี่ยนแปลงสำคัญจะประกาศบนเว็บไซต์ของเรา',
            'การใช้บริการต่อเนื่องถือว่ายอมรับนโยบายที่อัปเดต'
          ]
        },
        {
          title: '9. ติดต่อเรา',
          content: [
            'หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อ:',
            'อีเมล: cgunxlcb@gmail.com',
            'เว็บไซต์: https://bwnxcalculator.com'
          ]
        }
      ]
    },
    ja: {
      title: 'プライバシーポリシー',
      lastUpdated: '最終更新日：2024年12月',
      intro: 'BwnXCalculatorでは、お客様のプライバシーを重視しています。このプライバシーポリシーでは、当社の計算機サービスをご利用いただく際の情報の収集、使用、保護方法について説明します。',
      sections: [
        {
          title: '1. 収集する情報',
          content: [
            '利用データ：サービス改善のため、Google Analyticsを通じて匿名の利用統計を収集します。',
            'Cookie：言語設定、テーマ設定（ダーク/ライトモード）の記憶、分析目的でCookieを使用します。',
            '計算データ：すべての計算はブラウザ内で実行されます。計算データの保存や送信は行いません。',
            '連絡先情報：メールでお問い合わせいただいた場合のみ収集します。'
          ]
        },
        {
          title: '2. 情報の使用方法',
          content: [
            '計算機サービスの提供と改善',
            '設定（言語、テーマ）の記憶',
            '利用パターンの分析とパフォーマンスの最適化',
            '広告パートナーを通じた関連広告の表示',
            'お問い合わせへの対応'
          ]
        },
        {
          title: '3. 広告について',
          content: [
            '第三者広告パートナー（Google AdSense、Ezoic、PropellerAds）を使用して広告を表示します。',
            'これらのパートナーは、閲覧履歴に基づいて関連広告を表示するためCookieを使用する場合があります。',
            'ブラウザ設定または広告設定からパーソナライズ広告をオプトアウトできます。',
            '個人データを広告主に販売することはありません。'
          ]
        },
        {
          title: '4. データセキュリティ',
          content: [
            'すべてのデータ送信はHTTPSプロトコルで暗号化されています。',
            '計算はローカルで実行され、データがデバイスから離れることはありません。',
            'ウェブサイト保護のため業界標準のセキュリティ対策を実施しています。',
            'セキュリティ慣行を定期的に更新し、安全性を確保しています。'
          ]
        },
        {
          title: '5. お客様の権利',
          content: [
            'アクセス：当社が保有するデータについて情報を請求できます。',
            '削除：データの削除を請求できます。',
            'オプトアウト：ブラウザ設定でCookieを無効にできます。',
            '訂正：不正確なデータの訂正を請求できます。',
            'ポータビリティ：ポータブル形式でデータを請求できます。'
          ]
        },
        {
          title: '6. 外部リンク',
          content: [
            '計算機には外部ウェブサイトへのリンクが含まれる場合があります。',
            '外部サイトのプライバシー慣行について当社は責任を負いません。',
            '訪問する外部サイトのプライバシーポリシーを確認することをお勧めします。'
          ]
        },
        {
          title: '7. 子供のプライバシー',
          content: [
            '当社のサービスは13歳未満の子供を対象としていません。',
            '子供から個人情報を意図的に収集することはありません。',
            '子供からデータを収集したと思われる場合は、直ちにご連絡ください。'
          ]
        },
        {
          title: '8. ポリシーの変更',
          content: [
            'このプライバシーポリシーは随時更新される場合があります。',
            '重要な変更はウェブサイトで発表されます。',
            'サービスの継続使用は更新されたポリシーの承諾とみなされます。'
          ]
        },
        {
          title: '9. お問い合わせ',
          content: [
            'プライバシーポリシーについてご質問がある場合は、お問い合わせください：',
            'メール：cgunxlcb@gmail.com',
            'ウェブサイト：https://bwnxcalculator.com'
          ]
        }
      ]
    },
    // Add placeholders for other languages
    es: { title: 'Política de Privacidad', lastUpdated: 'Última actualización: Diciembre 2024', intro: 'En BwnXCalculator, tomamos su privacidad en serio...', sections: [] },
    pt: { title: 'Política de Privacidade', lastUpdated: 'Última atualização: Dezembro 2024', intro: 'Na BwnXCalculator, levamos sua privacidade a sério...', sections: [] },
    de: { title: 'Datenschutzerklärung', lastUpdated: 'Zuletzt aktualisiert: Dezember 2024', intro: 'Bei BwnXCalculator nehmen wir Ihre Privatsphäre ernst...', sections: [] },
    fr: { title: 'Politique de Confidentialité', lastUpdated: 'Dernière mise à jour: Décembre 2024', intro: 'Chez BwnXCalculator, nous prenons votre vie privée au sérieux...', sections: [] },
    ko: { title: '개인정보 보호정책', lastUpdated: '최종 업데이트: 2024년 12월', intro: 'BwnXCalculator에서는 귀하의 개인정보를 중요하게 생각합니다...', sections: [] },
    zh: { title: '隐私政策', lastUpdated: '最后更新：2024年12月', intro: '在BwnXCalculator，我们重视您的隐私...', sections: [] },
    ar: { title: 'سياسة الخصوصية', lastUpdated: 'آخر تحديث: ديسمبر 2024', intro: 'في BwnXCalculator، نأخذ خصوصيتك على محمل الجد...', sections: [] },
    hi: { title: 'गोपनीयता नीति', lastUpdated: 'अंतिम अपडेट: दिसंबर 2024', intro: 'BwnXCalculator में, हम आपकी गोपनीयता को गंभीरता से लेते हैं...', sections: [] },
    id: { title: 'Kebijakan Privasi', lastUpdated: 'Terakhir Diperbarui: Desember 2024', intro: 'Di BwnXCalculator, kami menganggap serius privasi Anda...', sections: [] },
    ru: { title: 'Политика конфиденциальности', lastUpdated: 'Последнее обновление: Декабрь 2024', intro: 'В BwnXCalculator мы серьезно относимся к вашей конфиденциальности...', sections: [] },
    it: { title: 'Informativa sulla Privacy', lastUpdated: 'Ultimo aggiornamento: Dicembre 2024', intro: 'In BwnXCalculator, prendiamo sul serio la tua privacy...', sections: [] },
    nl: { title: 'Privacybeleid', lastUpdated: 'Laatst bijgewerkt: December 2024', intro: 'Bij BwnXCalculator nemen we uw privacy serieus...', sections: [] },
    vi: { title: 'Chính sách Bảo mật', lastUpdated: 'Cập nhật lần cuối: Tháng 12 2024', intro: 'Tại BwnXCalculator, chúng tôi coi trọng quyền riêng tư của bạn...', sections: [] },
    fa: { title: 'سیاست حفظ حریم خصوصی', lastUpdated: 'آخرین به‌روزرسانی: دسامبر 2024', intro: 'در BwnXCalculator، ما به حریم خصوصی شما اهمیت می‌دهیم...', sections: [] }
  };

  const currentContent = content[locale] || content.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {currentContent.title}
        </h1>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          {currentContent.lastUpdated}
        </p>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          {currentContent.intro}
        </p>

        {currentContent.sections && currentContent.sections.map((section: any, index: number) => (
          <div key={index} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.content.map((item: string, itemIndex: number) => (
                <li key={itemIndex} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {!currentContent.sections && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-gray-700 dark:text-gray-300">
              Full privacy policy content for this language is being prepared. Please refer to the English version for complete information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}