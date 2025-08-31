import { Locale } from '@/lib/i18n/config';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  
  const titles: Record<Locale, string> = {
    en: 'Contact Us - BwnXCalculator',
    es: 'Contáctanos - BwnXCalculator',
    pt: 'Contate-nos - BwnXCalculator',
    de: 'Kontakt - BwnXCalculator',
    fr: 'Contactez-nous - BwnXCalculator',
    ja: 'お問い合わせ - BwnXCalculator',
    ko: '문의하기 - BwnXCalculator',
    zh: '联系我们 - BwnXCalculator',
    th: 'ติดต่อเรา - BwnXCalculator',
    ar: 'اتصل بنا - BwnXCalculator',
    hi: 'संपर्क करें - BwnXCalculator',
    id: 'Hubungi Kami - BwnXCalculator',
    ru: 'Свяжитесь с нами - BwnXCalculator',
    it: 'Contattaci - BwnXCalculator',
    nl: 'Contact - BwnXCalculator',
    vi: 'Liên hệ - BwnXCalculator',
    fa: 'تماس با ما - BwnXCalculator'
  };

  return {
    title: titles[locale] || titles.en,
    description: 'Get in touch with BwnXCalculator team for questions, feedback, or suggestions about our 430+ calculators.',
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const content: Partial<Record<Locale, any>> = {
    en: {
      title: 'Contact Us',
      subtitle: 'We\'d love to hear from you',
      intro: 'Have questions, feedback, or suggestions? We\'re here to help! Reach out to us and we\'ll get back to you as soon as possible.',
      sections: {
        email: {
          title: 'Email Us',
          description: 'For general inquiries, feedback, or support',
          address: 'cgunxlcb@gmail.com',
          note: 'We typically respond within 24-48 hours'
        },
        feedback: {
          title: 'Send Feedback',
          description: 'Help us improve BwnXCalculator',
          items: [
            'Report calculator errors or bugs',
            'Suggest new calculator features',
            'Request new types of calculators',
            'Share your experience using our tools',
            'Report translation or localization issues'
          ]
        },
        support: {
          title: 'Get Support',
          description: 'Need help using our calculators?',
          items: [
            'How to use specific calculators',
            'Understanding calculation results',
            'Technical issues or errors',
            'Mobile app questions',
            'API or integration inquiries'
          ]
        },
        business: {
          title: 'Business Inquiries',
          description: 'For partnerships and collaborations',
          items: [
            'Advertising opportunities',
            'Affiliate partnerships',
            'API licensing',
            'Custom calculator development',
            'Educational partnerships'
          ]
        },
        legal: {
          title: 'Legal & Privacy',
          description: 'For legal and privacy-related matters',
          items: [
            'Privacy policy questions',
            'Terms of use clarifications',
            'Data deletion requests',
            'GDPR/CCPA inquiries',
            'Copyright or trademark issues'
          ]
        },
        response: {
          title: 'Response Time',
          description: 'When you can expect to hear from us',
          items: [
            'General inquiries: 24-48 hours',
            'Technical support: 24 hours',
            'Business inquiries: 48-72 hours',
            'Legal matters: 3-5 business days'
          ]
        }
      },
      form: {
        title: 'Quick Contact Form',
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Failed to send message. Please try email directly.'
      }
    },
    th: {
      title: 'ติดต่อเรา',
      subtitle: 'เรายินดีที่จะรับฟังจากคุณ',
      intro: 'มีคำถาม ข้อเสนอแนะ หรือความคิดเห็น? เราพร้อมช่วยเหลือ! ติดต่อเราและเราจะตอบกลับโดยเร็วที่สุด',
      sections: {
        email: {
          title: 'อีเมลถึงเรา',
          description: 'สำหรับข้อซักถามทั่วไป ข้อเสนอแนะ หรือการสนับสนุน',
          address: 'cgunxlcb@gmail.com',
          note: 'เรามักจะตอบกลับภายใน 24-48 ชั่วโมง'
        },
        feedback: {
          title: 'ส่งข้อเสนอแนะ',
          description: 'ช่วยเราปรับปรุง BwnXCalculator',
          items: [
            'รายงานข้อผิดพลาดหรือบั๊กของเครื่องคิดเลข',
            'เสนอฟีเจอร์ใหม่สำหรับเครื่องคิดเลข',
            'ขอเครื่องคิดเลขประเภทใหม่',
            'แบ่งปันประสบการณ์การใช้เครื่องมือของเรา',
            'รายงานปัญหาการแปลหรือการแปลเป็นภาษาท้องถิ่น'
          ]
        },
        support: {
          title: 'รับการสนับสนุน',
          description: 'ต้องการความช่วยเหลือในการใช้เครื่องคิดเลข?',
          items: [
            'วิธีใช้เครื่องคิดเลขเฉพาะ',
            'ทำความเข้าใจผลการคำนวณ',
            'ปัญหาทางเทคนิคหรือข้อผิดพลาด',
            'คำถามเกี่ยวกับแอปมือถือ',
            'สอบถามเกี่ยวกับ API หรือการผสานรวม'
          ]
        },
        business: {
          title: 'ติดต่อธุรกิจ',
          description: 'สำหรับความร่วมมือและพันธมิตร',
          items: [
            'โอกาสในการโฆษณา',
            'พันธมิตรพันธมิตร',
            'การอนุญาต API',
            'การพัฒนาเครื่องคิดเลขแบบกำหนดเอง',
            'ความร่วมมือด้านการศึกษา'
          ]
        },
        legal: {
          title: 'กฎหมายและความเป็นส่วนตัว',
          description: 'สำหรับเรื่องกฎหมายและความเป็นส่วนตัว',
          items: [
            'คำถามเกี่ยวกับนโยบายความเป็นส่วนตัว',
            'คำชี้แจงข้อกำหนดการใช้งาน',
            'คำขอลบข้อมูล',
            'สอบถาม GDPR/CCPA',
            'ปัญหาลิขสิทธิ์หรือเครื่องหมายการค้า'
          ]
        },
        response: {
          title: 'เวลาตอบกลับ',
          description: 'เมื่อคุณสามารถคาดหวังที่จะได้ยินจากเรา',
          items: [
            'ข้อซักถามทั่วไป: 24-48 ชั่วโมง',
            'การสนับสนุนทางเทคนิค: 24 ชั่วโมง',
            'สอบถามธุรกิจ: 48-72 ชั่วโมง',
            'เรื่องกฎหมาย: 3-5 วันทำการ'
          ]
        }
      },
      form: {
        title: 'แบบฟอร์มติดต่อด่วน',
        name: 'ชื่อของคุณ',
        email: 'อีเมลของคุณ',
        subject: 'หัวข้อ',
        message: 'ข้อความ',
        submit: 'ส่งข้อความ',
        sending: 'กำลังส่ง...',
        success: 'ส่งข้อความสำเร็จ!',
        error: 'ไม่สามารถส่งข้อความได้ กรุณาลองอีเมลโดยตรง'
      }
    },
    ja: {
      title: 'お問い合わせ',
      subtitle: 'ご連絡をお待ちしています',
      intro: 'ご質問、フィードバック、ご提案がございますか？私たちがお手伝いします！お問い合わせいただければ、できるだけ早く返信いたします。',
      sections: {
        email: {
          title: 'メールでのお問い合わせ',
          description: '一般的なお問い合わせ、フィードバック、サポート',
          address: 'cgunxlcb@gmail.com',
          note: '通常24〜48時間以内に返信いたします'
        },
        feedback: {
          title: 'フィードバックを送る',
          description: 'BwnXCalculatorの改善にご協力ください',
          items: [
            '計算機のエラーやバグを報告',
            '新しい計算機の機能を提案',
            '新しいタイプの計算機をリクエスト',
            'ツールの使用体験を共有',
            '翻訳やローカライゼーションの問題を報告'
          ]
        },
        support: {
          title: 'サポートを受ける',
          description: '計算機の使用についてサポートが必要ですか？',
          items: [
            '特定の計算機の使い方',
            '計算結果の理解',
            '技術的な問題やエラー',
            'モバイルアプリの質問',
            'APIや統合に関するお問い合わせ'
          ]
        },
        business: {
          title: 'ビジネスのお問い合わせ',
          description: 'パートナーシップとコラボレーション',
          items: [
            '広告の機会',
            'アフィリエイトパートナーシップ',
            'APIライセンス',
            'カスタム計算機の開発',
            '教育パートナーシップ'
          ]
        },
        legal: {
          title: '法的事項とプライバシー',
          description: '法的およびプライバシー関連の事項',
          items: [
            'プライバシーポリシーに関する質問',
            '利用規約の明確化',
            'データ削除リクエスト',
            'GDPR/CCPAのお問い合わせ',
            '著作権または商標の問題'
          ]
        },
        response: {
          title: '返信時間',
          description: '返信までの目安',
          items: [
            '一般的なお問い合わせ：24〜48時間',
            '技術サポート：24時間',
            'ビジネスのお問い合わせ：48〜72時間',
            '法的事項：3〜5営業日'
          ]
        }
      },
      form: {
        title: 'クイックコンタクトフォーム',
        name: 'お名前',
        email: 'メールアドレス',
        subject: '件名',
        message: 'メッセージ',
        submit: 'メッセージを送信',
        sending: '送信中...',
        success: 'メッセージが正常に送信されました！',
        error: 'メッセージの送信に失敗しました。直接メールでお試しください。'
      }
    },
    // Add placeholders for other languages
    es: { title: 'Contáctanos', subtitle: 'Nos encantaría saber de ti', intro: '¿Tienes preguntas, comentarios o sugerencias?', sections: {}, form: {} },
    pt: { title: 'Contate-nos', subtitle: 'Adoraríamos ouvir de você', intro: 'Tem perguntas, feedback ou sugestões?', sections: {}, form: {} },
    de: { title: 'Kontakt', subtitle: 'Wir freuen uns von Ihnen zu hören', intro: 'Haben Sie Fragen, Feedback oder Vorschläge?', sections: {}, form: {} },
    fr: { title: 'Contactez-nous', subtitle: 'Nous aimerions avoir de vos nouvelles', intro: 'Avez-vous des questions, des commentaires ou des suggestions?', sections: {}, form: {} },
    ko: { title: '문의하기', subtitle: '여러분의 의견을 듣고 싶습니다', intro: '질문, 피드백 또는 제안이 있으신가요?', sections: {}, form: {} },
    zh: { title: '联系我们', subtitle: '我们很乐意听到您的声音', intro: '有问题、反馈或建议吗？', sections: {}, form: {} },
    ar: { title: 'اتصل بنا', subtitle: 'نود أن نسمع منك', intro: 'هل لديك أسئلة أو ملاحظات أو اقتراحات؟', sections: {}, form: {} },
    hi: { title: 'संपर्क करें', subtitle: 'हम आपसे सुनना पसंद करेंगे', intro: 'प्रश्न, प्रतिक्रिया या सुझाव हैं?', sections: {}, form: {} },
    id: { title: 'Hubungi Kami', subtitle: 'Kami senang mendengar dari Anda', intro: 'Punya pertanyaan, masukan, atau saran?', sections: {}, form: {} },
    ru: { title: 'Свяжитесь с нами', subtitle: 'Мы будем рады услышать вас', intro: 'Есть вопросы, отзывы или предложения?', sections: {}, form: {} },
    it: { title: 'Contattaci', subtitle: 'Ci piacerebbe sentire da te', intro: 'Hai domande, feedback o suggerimenti?', sections: {}, form: {} },
    nl: { title: 'Contact', subtitle: 'We horen graag van je', intro: 'Heb je vragen, feedback of suggesties?', sections: {}, form: {} },
    vi: { title: 'Liên hệ', subtitle: 'Chúng tôi rất muốn nghe từ bạn', intro: 'Có câu hỏi, phản hồi hoặc đề xuất?', sections: {}, form: {} },
    fa: { title: 'تماس با ما', subtitle: 'مایلیم از شما بشنویم', intro: 'سوال، بازخورد یا پیشنهادی دارید؟', sections: {}, form: {} }
  };

  const currentContent = content[locale] || content.en;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {currentContent.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            {currentContent.subtitle}
          </p>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {currentContent.intro}
          </p>
        </div>

        {currentContent.sections?.email && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Email Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">📧</span>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  {currentContent.sections.email.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {currentContent.sections.email.description}
              </p>
              <a 
                href={`mailto:${currentContent.sections.email.address}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-medium"
              >
                {currentContent.sections.email.address}
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                {currentContent.sections.email.note}
              </p>
            </div>

            {/* Response Time */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">⏰</span>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  {currentContent.sections.response.title}
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {currentContent.sections.response.description}
              </p>
              <ul className="space-y-2">
                {currentContent.sections.response.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {currentContent.sections?.feedback && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Feedback */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">💬</span>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {currentContent.sections.feedback.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {currentContent.sections.feedback.description}
              </p>
              <ul className="space-y-1 text-sm">
                {currentContent.sections.feedback.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🛠️</span>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {currentContent.sections.support.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {currentContent.sections.support.description}
              </p>
              <ul className="space-y-1 text-sm">
                {currentContent.sections.support.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Business */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🤝</span>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {currentContent.sections.business.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {currentContent.sections.business.description}
              </p>
              <ul className="space-y-1 text-sm">
                {currentContent.sections.business.items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-1">•</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Contact Form (placeholder) */}
        {currentContent.form?.title && (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 text-center">
              {currentContent.form.title}
            </h2>
            <div className="text-center text-gray-600 dark:text-gray-400">
              <p className="mb-4">
                For now, please contact us directly at:
              </p>
              <a 
                href="mailto:cgunxlcb@gmail.com"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                cgunxlcb@gmail.com
              </a>
            </div>
          </div>
        )}

        {!currentContent.sections?.email && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-gray-700 dark:text-gray-300">
              Full contact information for this language is being prepared. Please contact us at: cgunxlcb@gmail.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
}