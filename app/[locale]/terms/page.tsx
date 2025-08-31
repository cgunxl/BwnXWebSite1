import { Locale } from '@/lib/i18n/config';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<Locale, string> = {
    en: 'Terms of Use - BwnXCalculator',
    es: 'Términos de Uso - BwnXCalculator',
    pt: 'Termos de Uso - BwnXCalculator',
    de: 'Nutzungsbedingungen - BwnXCalculator',
    fr: 'Conditions d\'Utilisation - BwnXCalculator',
    ja: '利用規約 - BwnXCalculator',
    ko: '이용약관 - BwnXCalculator',
    zh: '使用条款 - BwnXCalculator',
    th: 'ข้อกำหนดการใช้งาน - BwnXCalculator',
    ar: 'شروط الاستخدام - BwnXCalculator',
    hi: 'उपयोग की शर्तें - BwnXCalculator',
    id: 'Syarat Penggunaan - BwnXCalculator',
    ru: 'Условия использования - BwnXCalculator',
    it: 'Termini di Utilizzo - BwnXCalculator',
    nl: 'Gebruiksvoorwaarden - BwnXCalculator',
    vi: 'Điều khoản Sử dụng - BwnXCalculator',
    fa: 'شرایط استفاده - BwnXCalculator'
  };

  return {
    title: titles[locale] || titles.en,
    description: 'Terms and conditions for using BwnXCalculator services - 430+ calculators in 17 languages.',
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const content: Partial<Record<Locale, any>> = {
    en: {
      title: 'Terms of Use',
      lastUpdated: 'Last Updated: December 2024',
      intro: 'Welcome to BwnXCalculator. By using our website and services, you agree to comply with and be bound by the following terms and conditions.',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: [
            'By accessing and using BwnXCalculator, you accept and agree to be bound by these Terms of Use.',
            'If you do not agree to these terms, please do not use our services.',
            'We reserve the right to update these terms at any time without prior notice.',
            'Your continued use of the service following any changes constitutes acceptance of those changes.'
          ]
        },
        {
          title: '2. Use of Services',
          content: [
            'Our calculators are provided for informational and educational purposes only.',
            'Results should not be used as professional advice for financial, medical, legal, or other critical decisions.',
            'You must verify all calculations independently before making important decisions.',
            'We recommend consulting with qualified professionals for specific advice.'
          ]
        },
        {
          title: '3. Disclaimer of Warranties',
          content: [
            'Services are provided "as is" without any warranties, express or implied.',
            'We do not guarantee the accuracy, completeness, or reliability of calculations.',
            'We do not warrant that the service will be uninterrupted or error-free.',
            'Use of our calculators is at your own risk.'
          ]
        },
        {
          title: '4. Limitation of Liability',
          content: [
            'BwnXCalculator shall not be liable for any direct, indirect, incidental, or consequential damages.',
            'This includes but is not limited to loss of profits, data, or business opportunities.',
            'We are not responsible for decisions made based on calculator results.',
            'Our maximum liability shall not exceed the amount you paid to use our services (which is zero for free users).'
          ]
        },
        {
          title: '5. Intellectual Property',
          content: [
            'All content, features, and functionality are owned by BwnXCalculator.',
            'This includes but is not limited to text, graphics, logos, and software.',
            'You may not reproduce, distribute, or create derivative works without our permission.',
            'You may use calculator results for personal, non-commercial purposes.'
          ]
        },
        {
          title: '6. User Conduct',
          content: [
            'You agree not to use our services for any unlawful purpose.',
            'You will not attempt to gain unauthorized access to our systems.',
            'You will not interfere with or disrupt the service or servers.',
            'You will not use automated systems to access the service without permission.'
          ]
        },
        {
          title: '7. Advertising and Affiliate Links',
          content: [
            'Our website displays third-party advertisements and affiliate links.',
            'We are not responsible for the content or accuracy of third-party advertisements.',
            'Clicking on ads or affiliate links may result in us receiving compensation.',
            'Your interactions with advertisers are solely between you and the advertiser.'
          ]
        },
        {
          title: '8. Privacy',
          content: [
            'Your use of our services is also governed by our Privacy Policy.',
            'By using BwnXCalculator, you consent to our data practices as described in the Privacy Policy.',
            'We use cookies and similar technologies as outlined in our Privacy Policy.'
          ]
        },
        {
          title: '9. Indemnification',
          content: [
            'You agree to indemnify and hold BwnXCalculator harmless from any claims arising from your use of the service.',
            'This includes any violation of these Terms of Use.',
            'This includes any damage caused by your actions to other users or third parties.'
          ]
        },
        {
          title: '10. Governing Law',
          content: [
            'These Terms of Use are governed by the laws of Thailand.',
            'Any disputes shall be resolved in the courts of Thailand.',
            'You agree to submit to the jurisdiction of Thai courts.'
          ]
        },
        {
          title: '11. Contact Information',
          content: [
            'For questions about these Terms of Use, please contact us:',
            'Email: cgunxlcb@gmail.com',
            'Website: https://bwnxcalculator.com'
          ]
        }
      ]
    },
    th: {
      title: 'ข้อกำหนดการใช้งาน',
      lastUpdated: 'อัปเดตล่าสุด: ธันวาคม 2567',
      intro: 'ยินดีต้อนรับสู่ BwnXCalculator การใช้เว็บไซต์และบริการของเรา หมายความว่าคุณยอมรับและผูกพันตามข้อกำหนดและเงื่อนไขต่อไปนี้',
      sections: [
        {
          title: '1. การยอมรับข้อกำหนด',
          content: [
            'การเข้าถึงและใช้งาน BwnXCalculator คุณยอมรับและตกลงผูกพันตามข้อกำหนดการใช้งานนี้',
            'หากคุณไม่เห็นด้วยกับข้อกำหนดเหล่านี้ กรุณาอย่าใช้บริการของเรา',
            'เราขอสงวนสิทธิ์ในการอัปเดตข้อกำหนดเหล่านี้ได้ตลอดเวลาโดยไม่ต้องแจ้งล่วงหน้า',
            'การใช้บริการต่อเนื่องหลังจากมีการเปลี่ยนแปลงถือว่าคุณยอมรับการเปลี่ยนแปลงนั้น'
          ]
        },
        {
          title: '2. การใช้บริการ',
          content: [
            'เครื่องคิดเลขของเราให้บริการเพื่อการให้ข้อมูลและการศึกษาเท่านั้น',
            'ผลลัพธ์ไม่ควรใช้เป็นคำแนะนำระดับมืออาชีพสำหรับการตัดสินใจด้านการเงิน การแพทย์ กฎหมาย หรืออื่นๆ ที่สำคัญ',
            'คุณต้องตรวจสอบการคำนวณทั้งหมดอย่างอิสระก่อนตัดสินใจสำคัญ',
            'เราแนะนำให้ปรึกษาผู้เชี่ยวชาญที่มีคุณสมบัติสำหรับคำแนะนำเฉพาะ'
          ]
        },
        {
          title: '3. การปฏิเสธการรับประกัน',
          content: [
            'บริการให้ "ตามสภาพ" โดยไม่มีการรับประกันใดๆ ทั้งโดยชัดแจ้งหรือโดยนัย',
            'เราไม่รับประกันความถูกต้อง ความสมบูรณ์ หรือความน่าเชื่อถือของการคำนวณ',
            'เราไม่รับประกันว่าบริการจะไม่หยุดชะงักหรือปราศจากข้อผิดพลาด',
            'การใช้เครื่องคิดเลขของเราเป็นความเสี่ยงของคุณเอง'
          ]
        },
        {
          title: '4. ข้อจำกัดความรับผิด',
          content: [
            'BwnXCalculator จะไม่รับผิดต่อความเสียหายทางตรง ทางอ้อม โดยบังเอิญ หรือที่ตามมา',
            'รวมถึงแต่ไม่จำกัดเพียงการสูญเสียผลกำไร ข้อมูล หรือโอกาสทางธุรกิจ',
            'เราไม่รับผิดชอบต่อการตัดสินใจที่ทำตามผลลัพธ์ของเครื่องคิดเลข',
            'ความรับผิดสูงสุดของเราจะไม่เกินจำนวนเงินที่คุณจ่ายเพื่อใช้บริการ (ซึ่งเป็นศูนย์สำหรับผู้ใช้ฟรี)'
          ]
        },
        {
          title: '5. ทรัพย์สินทางปัญญา',
          content: [
            'เนื้อหา คุณสมบัติ และฟังก์ชันทั้งหมดเป็นของ BwnXCalculator',
            'รวมถึงแต่ไม่จำกัดเพียงข้อความ กราฟิก โลโก้ และซอฟต์แวร์',
            'คุณไม่สามารถทำซ้ำ แจกจ่าย หรือสร้างงานอนุพันธ์โดยไม่ได้รับอนุญาต',
            'คุณสามารถใช้ผลลัพธ์เครื่องคิดเลขเพื่อวัตถุประสงค์ส่วนตัวที่ไม่ใช่เชิงพาณิชย์'
          ]
        },
        {
          title: '6. พฤติกรรมผู้ใช้',
          content: [
            'คุณตกลงที่จะไม่ใช้บริการของเราเพื่อวัตถุประสงค์ที่ผิดกฎหมาย',
            'คุณจะไม่พยายามเข้าถึงระบบของเราโดยไม่ได้รับอนุญาต',
            'คุณจะไม่รบกวนหรือขัดขวางบริการหรือเซิร์ฟเวอร์',
            'คุณจะไม่ใช้ระบบอัตโนมัติเพื่อเข้าถึงบริการโดยไม่ได้รับอนุญาต'
          ]
        },
        {
          title: '7. การโฆษณาและลิงก์พันธมิตร',
          content: [
            'เว็บไซต์ของเราแสดงโฆษณาบุคคลที่สามและลิงก์พันธมิตร',
            'เราไม่รับผิดชอบต่อเนื้อหาหรือความถูกต้องของโฆษณาบุคคลที่สาม',
            'การคลิกโฆษณาหรือลิงก์พันธมิตรอาจทำให้เราได้รับค่าตอบแทน',
            'การโต้ตอบของคุณกับผู้โฆษณาเป็นเรื่องระหว่างคุณกับผู้โฆษณาเท่านั้น'
          ]
        },
        {
          title: '8. ความเป็นส่วนตัว',
          content: [
            'การใช้บริการของเรายังอยู่ภายใต้นโยบายความเป็นส่วนตัวของเรา',
            'การใช้ BwnXCalculator คุณยินยอมให้เราปฏิบัติต่อข้อมูลตามที่อธิบายในนโยบายความเป็นส่วนตัว',
            'เราใช้คุกกี้และเทคโนโลยีที่คล้ายกันตามที่ระบุในนโยบายความเป็นส่วนตัว'
          ]
        },
        {
          title: '9. การชดใช้ค่าเสียหาย',
          content: [
            'คุณตกลงที่จะชดใช้และปกป้อง BwnXCalculator จากการเรียกร้องใดๆ ที่เกิดจากการใช้บริการของคุณ',
            'รวมถึงการละเมิดข้อกำหนดการใช้งานนี้',
            'รวมถึงความเสียหายที่เกิดจากการกระทำของคุณต่อผู้ใช้อื่นหรือบุคคลที่สาม'
          ]
        },
        {
          title: '10. กฎหมายที่ใช้บังคับ',
          content: [
            'ข้อกำหนดการใช้งานนี้อยู่ภายใต้กฎหมายของประเทศไทย',
            'ข้อพิพาทใดๆ จะได้รับการแก้ไขในศาลของประเทศไทย',
            'คุณตกลงที่จะยอมรับเขตอำนาจศาลของศาลไทย'
          ]
        },
        {
          title: '11. ข้อมูลติดต่อ',
          content: [
            'หากมีคำถามเกี่ยวกับข้อกำหนดการใช้งาน กรุณาติดต่อ:',
            'อีเมล: cgunxlcb@gmail.com',
            'เว็บไซต์: https://bwnxcalculator.com'
          ]
        }
      ]
    },
    ja: {
      title: '利用規約',
      lastUpdated: '最終更新日：2024年12月',
      intro: 'BwnXCalculatorへようこそ。当社のウェブサイトおよびサービスを使用することにより、以下の利用規約に同意し、拘束されることに同意したものとみなされます。',
      sections: [
        {
          title: '1. 規約の承諾',
          content: [
            'BwnXCalculatorにアクセスし使用することで、これらの利用規約に同意したものとみなされます。',
            'これらの規約に同意しない場合は、当社のサービスを使用しないでください。',
            '当社は事前の通知なしにいつでもこれらの規約を更新する権利を留保します。',
            '変更後もサービスを継続して使用することは、それらの変更を承諾したものとみなされます。'
          ]
        },
        {
          title: '2. サービスの利用',
          content: [
            '当社の計算機は情報提供および教育目的でのみ提供されています。',
            '結果を金融、医療、法律、その他の重要な決定の専門的アドバイスとして使用すべきではありません。',
            '重要な決定を下す前に、すべての計算を独自に検証する必要があります。',
            '特定のアドバイスについては、資格のある専門家に相談することをお勧めします。'
          ]
        },
        {
          title: '3. 保証の免責',
          content: [
            'サービスは明示的または黙示的な保証なしに「現状のまま」提供されます。',
            '計算の正確性、完全性、信頼性を保証しません。',
            'サービスが中断されないこと、エラーがないことを保証しません。',
            '当社の計算機の使用は自己責任で行ってください。'
          ]
        },
        {
          title: '4. 責任の制限',
          content: [
            'BwnXCalculatorは直接的、間接的、偶発的、または結果的な損害について責任を負いません。',
            'これには利益、データ、ビジネス機会の損失が含まれますが、これらに限定されません。',
            '計算機の結果に基づいて行われた決定について責任を負いません。',
            '当社の最大責任は、サービス使用のために支払った金額を超えないものとします（無料ユーザーの場合はゼロ）。'
          ]
        },
        {
          title: '5. 知的財産',
          content: [
            'すべてのコンテンツ、機能、機能性はBwnXCalculatorが所有しています。',
            'これにはテキスト、グラフィック、ロゴ、ソフトウェアが含まれますが、これらに限定されません。',
            '許可なく複製、配布、派生作品の作成はできません。',
            '計算結果を個人的、非商業的目的で使用することができます。'
          ]
        },
        {
          title: '6. ユーザーの行動',
          content: [
            '違法な目的で当社のサービスを使用しないことに同意します。',
            '当社のシステムへの不正アクセスを試みません。',
            'サービスやサーバーを妨害または中断しません。',
            '許可なく自動化システムを使用してサービスにアクセスしません。'
          ]
        },
        {
          title: '7. 広告とアフィリエイトリンク',
          content: [
            '当社のウェブサイトは第三者の広告とアフィリエイトリンクを表示します。',
            '第三者広告のコンテンツや正確性について責任を負いません。',
            '広告やアフィリエイトリンクをクリックすると、当社が報酬を受け取る場合があります。',
            '広告主とのやり取りは、お客様と広告主の間でのみ行われます。'
          ]
        },
        {
          title: '8. プライバシー',
          content: [
            '当社のサービスの使用は、プライバシーポリシーにも準拠します。',
            'BwnXCalculatorを使用することで、プライバシーポリシーに記載されているデータ慣行に同意したものとみなされます。',
            'プライバシーポリシーに記載されているように、Cookieおよび類似の技術を使用します。'
          ]
        },
        {
          title: '9. 補償',
          content: [
            'サービスの使用から生じるいかなる請求からもBwnXCalculatorを免責し、無害に保つことに同意します。',
            'これには利用規約の違反が含まれます。',
            'これには他のユーザーや第三者に対する行動による損害が含まれます。'
          ]
        },
        {
          title: '10. 準拠法',
          content: [
            'これらの利用規約はタイの法律に準拠します。',
            'いかなる紛争もタイの裁判所で解決されるものとします。',
            'タイの裁判所の管轄権に従うことに同意します。'
          ]
        },
        {
          title: '11. お問い合わせ',
          content: [
            '利用規約についてご質問がある場合は、お問い合わせください：',
            'メール：cgunxlcb@gmail.com',
            'ウェブサイト：https://bwnxcalculator.com'
          ]
        }
      ]
    },
    // Add placeholders for other languages
    es: { title: 'Términos de Uso', lastUpdated: 'Última actualización: Diciembre 2024', intro: 'Bienvenido a BwnXCalculator...', sections: [] },
    pt: { title: 'Termos de Uso', lastUpdated: 'Última atualização: Dezembro 2024', intro: 'Bem-vindo ao BwnXCalculator...', sections: [] },
    de: { title: 'Nutzungsbedingungen', lastUpdated: 'Zuletzt aktualisiert: Dezember 2024', intro: 'Willkommen bei BwnXCalculator...', sections: [] },
    fr: { title: 'Conditions d\'Utilisation', lastUpdated: 'Dernière mise à jour: Décembre 2024', intro: 'Bienvenue sur BwnXCalculator...', sections: [] },
    ko: { title: '이용약관', lastUpdated: '최종 업데이트: 2024년 12월', intro: 'BwnXCalculator에 오신 것을 환영합니다...', sections: [] },
    zh: { title: '使用条款', lastUpdated: '最后更新：2024年12月', intro: '欢迎使用BwnXCalculator...', sections: [] },
    ar: { title: 'شروط الاستخدام', lastUpdated: 'آخر تحديث: ديسمبر 2024', intro: 'مرحبًا بك في BwnXCalculator...', sections: [] },
    hi: { title: 'उपयोग की शर्तें', lastUpdated: 'अंतिम अपडेट: दिसंबर 2024', intro: 'BwnXCalculator में आपका स्वागत है...', sections: [] },
    id: { title: 'Syarat Penggunaan', lastUpdated: 'Terakhir Diperbarui: Desember 2024', intro: 'Selamat datang di BwnXCalculator...', sections: [] },
    ru: { title: 'Условия использования', lastUpdated: 'Последнее обновление: Декабрь 2024', intro: 'Добро пожаловать в BwnXCalculator...', sections: [] },
    it: { title: 'Termini di Utilizzo', lastUpdated: 'Ultimo aggiornamento: Dicembre 2024', intro: 'Benvenuto su BwnXCalculator...', sections: [] },
    nl: { title: 'Gebruiksvoorwaarden', lastUpdated: 'Laatst bijgewerkt: December 2024', intro: 'Welkom bij BwnXCalculator...', sections: [] },
    vi: { title: 'Điều khoản Sử dụng', lastUpdated: 'Cập nhật lần cuối: Tháng 12 2024', intro: 'Chào mừng đến với BwnXCalculator...', sections: [] },
    fa: { title: 'شرایط استفاده', lastUpdated: 'آخرین به‌روزرسانی: دسامبر 2024', intro: 'به BwnXCalculator خوش آمدید...', sections: [] }
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
              Full terms of use content for this language is being prepared. Please refer to the English version for complete information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}