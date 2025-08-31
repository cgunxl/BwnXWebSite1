'use client';

import { useState, useEffect } from 'react';
import { Locale } from '@/lib/i18n/config';

interface CookieConsentProps {
  locale: Locale;
}

export default function CookieConsent({ locale }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const translations: Record<Locale, any> = {
    en: {
      title: '🍪 We use cookies',
      message: 'We use cookies to improve your experience, analyze traffic, and serve personalized ads.',
      accept: 'Accept All',
      reject: 'Reject All',
      customize: 'Customize',
      learnMore: 'Learn more',
      privacyPolicy: 'Privacy Policy',
      necessary: 'Necessary Cookies',
      necessaryDesc: 'Required for the website to function properly',
      analytics: 'Analytics Cookies',
      analyticsDesc: 'Help us understand how visitors use our website',
      advertising: 'Advertising Cookies',
      advertisingDesc: 'Used to show relevant ads based on your interests',
      save: 'Save Preferences'
    },
    th: {
      title: '🍪 เราใช้คุกกี้',
      message: 'เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์ วิเคราะห์การใช้งาน และแสดงโฆษณาที่เหมาะสม',
      accept: 'ยอมรับทั้งหมด',
      reject: 'ปฏิเสธทั้งหมด',
      customize: 'ปรับแต่ง',
      learnMore: 'เรียนรู้เพิ่มเติม',
      privacyPolicy: 'นโยบายความเป็นส่วนตัว',
      necessary: 'คุกกี้ที่จำเป็น',
      necessaryDesc: 'จำเป็นสำหรับการทำงานของเว็บไซต์',
      analytics: 'คุกกี้วิเคราะห์',
      analyticsDesc: 'ช่วยให้เราเข้าใจว่าผู้เยี่ยมชมใช้เว็บไซต์อย่างไร',
      advertising: 'คุกกี้โฆษณา',
      advertisingDesc: 'ใช้แสดงโฆษณาที่เกี่ยวข้องตามความสนใจของคุณ',
      save: 'บันทึกการตั้งค่า'
    },
    ja: {
      title: '🍪 クッキーを使用しています',
      message: 'エクスペリエンスの向上、トラフィックの分析、パーソナライズされた広告の表示のためにクッキーを使用しています。',
      accept: 'すべて受け入れる',
      reject: 'すべて拒否',
      customize: 'カスタマイズ',
      learnMore: '詳細',
      privacyPolicy: 'プライバシーポリシー',
      necessary: '必須クッキー',
      necessaryDesc: 'ウェブサイトが正しく機能するために必要',
      analytics: '分析クッキー',
      analyticsDesc: '訪問者のウェブサイト利用を理解するのに役立つ',
      advertising: '広告クッキー',
      advertisingDesc: '興味に基づいた関連広告を表示するために使用',
      save: '設定を保存'
    },
    zh: {
      title: '🍪 我们使用Cookie',
      message: '我们使用Cookie来改善您的体验、分析流量并提供个性化广告。',
      accept: '接受全部',
      reject: '拒绝全部',
      customize: '自定义',
      learnMore: '了解更多',
      privacyPolicy: '隐私政策',
      necessary: '必要Cookie',
      necessaryDesc: '网站正常运行所必需',
      analytics: '分析Cookie',
      analyticsDesc: '帮助我们了解访客如何使用网站',
      advertising: '广告Cookie',
      advertisingDesc: '用于根据您的兴趣显示相关广告',
      save: '保存偏好'
    },
    es: {
      title: '🍪 Usamos cookies',
      message: 'Usamos cookies para mejorar tu experiencia, analizar el tráfico y mostrar anuncios personalizados.',
      accept: 'Aceptar todo',
      reject: 'Rechazar todo',
      customize: 'Personalizar',
      learnMore: 'Más información',
      privacyPolicy: 'Política de privacidad',
      necessary: 'Cookies necesarias',
      necessaryDesc: 'Requeridas para que el sitio web funcione correctamente',
      analytics: 'Cookies analíticas',
      analyticsDesc: 'Nos ayudan a entender cómo los visitantes usan nuestro sitio',
      advertising: 'Cookies publicitarias',
      advertisingDesc: 'Se utilizan para mostrar anuncios relevantes según tus intereses',
      save: 'Guardar preferencias'
    },
    fr: {
      title: '🍪 Nous utilisons des cookies',
      message: 'Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et afficher des publicités personnalisées.',
      accept: 'Tout accepter',
      reject: 'Tout refuser',
      customize: 'Personnaliser',
      learnMore: 'En savoir plus',
      privacyPolicy: 'Politique de confidentialité',
      necessary: 'Cookies nécessaires',
      necessaryDesc: 'Requis pour le bon fonctionnement du site',
      analytics: 'Cookies analytiques',
      analyticsDesc: 'Nous aident à comprendre comment les visiteurs utilisent notre site',
      advertising: 'Cookies publicitaires',
      advertisingDesc: 'Utilisés pour afficher des publicités pertinentes selon vos intérêts',
      save: 'Enregistrer les préférences'
    },
    de: {
      title: '🍪 Wir verwenden Cookies',
      message: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern, den Verkehr zu analysieren und personalisierte Werbung anzuzeigen.',
      accept: 'Alle akzeptieren',
      reject: 'Alle ablehnen',
      customize: 'Anpassen',
      learnMore: 'Mehr erfahren',
      privacyPolicy: 'Datenschutzerklärung',
      necessary: 'Notwendige Cookies',
      necessaryDesc: 'Erforderlich für die ordnungsgemäße Funktion der Website',
      analytics: 'Analyse-Cookies',
      analyticsDesc: 'Helfen uns zu verstehen, wie Besucher unsere Website nutzen',
      advertising: 'Werbe-Cookies',
      advertisingDesc: 'Werden verwendet, um relevante Anzeigen basierend auf Ihren Interessen anzuzeigen',
      save: 'Einstellungen speichern'
    },
    ko: {
      title: '🍪 쿠키 사용',
      message: '경험 개선, 트래픽 분석 및 맞춤 광고 제공을 위해 쿠키를 사용합니다.',
      accept: '모두 수락',
      reject: '모두 거부',
      customize: '사용자 지정',
      learnMore: '자세히 알아보기',
      privacyPolicy: '개인정보 처리방침',
      necessary: '필수 쿠키',
      necessaryDesc: '웹사이트가 제대로 작동하는 데 필요',
      analytics: '분석 쿠키',
      analyticsDesc: '방문자가 웹사이트를 어떻게 사용하는지 이해하는 데 도움',
      advertising: '광고 쿠키',
      advertisingDesc: '관심사에 따라 관련 광고를 표시하는 데 사용',
      save: '환경설정 저장'
    },
    ar: {
      title: '🍪 نستخدم ملفات تعريف الارتباط',
      message: 'نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور وعرض إعلانات مخصصة.',
      accept: 'قبول الكل',
      reject: 'رفض الكل',
      customize: 'تخصيص',
      learnMore: 'اعرف المزيد',
      privacyPolicy: 'سياسة الخصوصية',
      necessary: 'ملفات تعريف الارتباط الضرورية',
      necessaryDesc: 'مطلوبة لعمل الموقع بشكل صحيح',
      analytics: 'ملفات تعريف الارتباط التحليلية',
      analyticsDesc: 'تساعدنا على فهم كيفية استخدام الزوار لموقعنا',
      advertising: 'ملفات تعريف الارتباط الإعلانية',
      advertisingDesc: 'تستخدم لعرض إعلانات ذات صلة بناءً على اهتماماتك',
      save: 'حفظ التفضيلات'
    },
    hi: {
      title: '🍪 हम कुकीज़ का उपयोग करते हैं',
      message: 'हम आपके अनुभव को बेहतर बनाने, ट्रैफ़िक का विश्लेषण करने और व्यक्तिगत विज्ञापन दिखाने के लिए कुकीज़ का उपयोग करते हैं।',
      accept: 'सभी स्वीकार करें',
      reject: 'सभी अस्वीकार करें',
      customize: 'अनुकूलित करें',
      learnMore: 'और जानें',
      privacyPolicy: 'गोपनीयता नीति',
      necessary: 'आवश्यक कुकीज़',
      necessaryDesc: 'वेबसाइट के ठीक से काम करने के लिए आवश्यक',
      analytics: 'विश्लेषण कुकीज़',
      analyticsDesc: 'आगंतुक हमारी वेबसाइट का उपयोग कैसे करते हैं यह समझने में मदद करती हैं',
      advertising: 'विज्ञापन कुकीज़',
      advertisingDesc: 'आपकी रुचियों के आधार पर प्रासंगिक विज्ञापन दिखाने के लिए उपयोग की जाती हैं',
      save: 'प्राथमिकताएं सहेजें'
    },
    id: {
      title: '🍪 Kami menggunakan cookie',
      message: 'Kami menggunakan cookie untuk meningkatkan pengalaman Anda, menganalisis lalu lintas, dan menampilkan iklan yang dipersonalisasi.',
      accept: 'Terima Semua',
      reject: 'Tolak Semua',
      customize: 'Sesuaikan',
      learnMore: 'Pelajari lebih lanjut',
      privacyPolicy: 'Kebijakan Privasi',
      necessary: 'Cookie Penting',
      necessaryDesc: 'Diperlukan agar situs web berfungsi dengan baik',
      analytics: 'Cookie Analitik',
      analyticsDesc: 'Membantu kami memahami bagaimana pengunjung menggunakan situs kami',
      advertising: 'Cookie Iklan',
      advertisingDesc: 'Digunakan untuk menampilkan iklan yang relevan berdasarkan minat Anda',
      save: 'Simpan Preferensi'
    },
    ru: {
      title: '🍪 Мы используем файлы cookie',
      message: 'Мы используем файлы cookie для улучшения вашего опыта, анализа трафика и показа персонализированной рекламы.',
      accept: 'Принять все',
      reject: 'Отклонить все',
      customize: 'Настроить',
      learnMore: 'Узнать больше',
      privacyPolicy: 'Политика конфиденциальности',
      necessary: 'Необходимые файлы cookie',
      necessaryDesc: 'Требуются для правильной работы веб-сайта',
      analytics: 'Аналитические файлы cookie',
      analyticsDesc: 'Помогают нам понять, как посетители используют наш сайт',
      advertising: 'Рекламные файлы cookie',
      advertisingDesc: 'Используются для показа релевантной рекламы на основе ваших интересов',
      save: 'Сохранить настройки'
    },
    it: {
      title: '🍪 Utilizziamo i cookie',
      message: 'Utilizziamo i cookie per migliorare la tua esperienza, analizzare il traffico e mostrare annunci personalizzati.',
      accept: 'Accetta tutto',
      reject: 'Rifiuta tutto',
      customize: 'Personalizza',
      learnMore: 'Scopri di più',
      privacyPolicy: 'Informativa sulla privacy',
      necessary: 'Cookie necessari',
      necessaryDesc: 'Richiesti per il corretto funzionamento del sito web',
      analytics: 'Cookie analitici',
      analyticsDesc: 'Ci aiutano a capire come i visitatori utilizzano il nostro sito',
      advertising: 'Cookie pubblicitari',
      advertisingDesc: 'Utilizzati per mostrare annunci pertinenti in base ai tuoi interessi',
      save: 'Salva preferenze'
    },
    nl: {
      title: '🍪 We gebruiken cookies',
      message: 'We gebruiken cookies om uw ervaring te verbeteren, verkeer te analyseren en gepersonaliseerde advertenties te tonen.',
      accept: 'Alles accepteren',
      reject: 'Alles weigeren',
      customize: 'Aanpassen',
      learnMore: 'Meer informatie',
      privacyPolicy: 'Privacybeleid',
      necessary: 'Noodzakelijke cookies',
      necessaryDesc: 'Vereist voor de goede werking van de website',
      analytics: 'Analytische cookies',
      analyticsDesc: 'Helpen ons te begrijpen hoe bezoekers onze site gebruiken',
      advertising: 'Advertentiecookies',
      advertisingDesc: 'Gebruikt om relevante advertenties te tonen op basis van uw interesses',
      save: 'Voorkeuren opslaan'
    },
    vi: {
      title: '🍪 Chúng tôi sử dụng cookie',
      message: 'Chúng tôi sử dụng cookie để cải thiện trải nghiệm của bạn, phân tích lưu lượng truy cập và hiển thị quảng cáo được cá nhân hóa.',
      accept: 'Chấp nhận tất cả',
      reject: 'Từ chối tất cả',
      customize: 'Tùy chỉnh',
      learnMore: 'Tìm hiểu thêm',
      privacyPolicy: 'Chính sách bảo mật',
      necessary: 'Cookie cần thiết',
      necessaryDesc: 'Cần thiết để trang web hoạt động đúng cách',
      analytics: 'Cookie phân tích',
      analyticsDesc: 'Giúp chúng tôi hiểu cách khách truy cập sử dụng trang web',
      advertising: 'Cookie quảng cáo',
      advertisingDesc: 'Được sử dụng để hiển thị quảng cáo phù hợp dựa trên sở thích của bạn',
      save: 'Lưu tùy chọn'
    },
    pt: {
      title: '🍪 Usamos cookies',
      message: 'Usamos cookies para melhorar sua experiência, analisar o tráfego e exibir anúncios personalizados.',
      accept: 'Aceitar todos',
      reject: 'Rejeitar todos',
      customize: 'Personalizar',
      learnMore: 'Saiba mais',
      privacyPolicy: 'Política de Privacidade',
      necessary: 'Cookies necessários',
      necessaryDesc: 'Necessários para o funcionamento adequado do site',
      analytics: 'Cookies analíticos',
      analyticsDesc: 'Nos ajudam a entender como os visitantes usam nosso site',
      advertising: 'Cookies de publicidade',
      advertisingDesc: 'Usados para exibir anúncios relevantes com base em seus interesses',
      save: 'Salvar preferências'
    },
    fa: {
      title: '🍪 ما از کوکی‌ها استفاده می‌کنیم',
      message: 'ما از کوکی‌ها برای بهبود تجربه شما، تحلیل ترافیک و نمایش تبلیغات شخصی‌سازی شده استفاده می‌کنیم.',
      accept: 'پذیرش همه',
      reject: 'رد همه',
      customize: 'سفارشی‌سازی',
      learnMore: 'بیشتر بدانید',
      privacyPolicy: 'سیاست حفظ حریم خصوصی',
      necessary: 'کوکی‌های ضروری',
      necessaryDesc: 'برای عملکرد صحیح وب‌سایت ضروری است',
      analytics: 'کوکی‌های تحلیلی',
      analyticsDesc: 'به ما کمک می‌کند بفهمیم بازدیدکنندگان چگونه از سایت ما استفاده می‌کنند',
      advertising: 'کوکی‌های تبلیغاتی',
      advertisingDesc: 'برای نمایش تبلیغات مرتبط بر اساس علایق شما استفاده می‌شود',
      save: 'ذخیره تنظیمات'
    }
  };

  const t = translations[locale] || translations.en;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie-consent');
      if (!consent) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    // Load analytics and ad scripts
    loadAnalytics();
    loadAds();
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
  };

  const handleSavePreferences = (preferences: any) => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      ...preferences,
      timestamp: new Date().toISOString()
    }));
    setShowBanner(false);
    setShowDetails(false);
    
    if (preferences.analytics) loadAnalytics();
    if (preferences.advertising) loadAds();
  };

  const loadAnalytics = () => {
    // Load Google Analytics or other analytics
    if (typeof window !== 'undefined' && !(window as any).gtag) {
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
      script.async = true;
      document.head.appendChild(script);
    }
  };

  const loadAds = () => {
    // Load ad scripts (Google AdSense, etc.)
    if (typeof window !== 'undefined' && !(window as any).adsbygoogle) {
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXX');
      document.head.appendChild(script);
    }
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg animate-slideUp">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">{t.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t.message}{' '}
                <a href={`/${locale}/privacy`} className="text-blue-600 hover:underline">
                  {t.learnMore}
                </a>
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => setShowDetails(true)}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t.customize}
              </button>
              <button
                onClick={handleReject}
                className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {t.reject}
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t.accept}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Cookie Settings Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">{t.customize}</h2>
            
            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{t.necessary}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.necessaryDesc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5"
                  />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{t.analytics}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.analyticsDesc}</p>
                  </div>
                  <input
                    type="checkbox"
                    id="analytics"
                    className="w-5 h-5"
                  />
                </div>
              </div>

              {/* Advertising Cookies */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{t.advertising}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.advertisingDesc}</p>
                  </div>
                  <input
                    type="checkbox"
                    id="advertising"
                    className="w-5 h-5"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const analytics = (document.getElementById('analytics') as HTMLInputElement)?.checked;
                  const advertising = (document.getElementById('advertising') as HTMLInputElement)?.checked;
                  handleSavePreferences({
                    necessary: true,
                    analytics,
                    advertising
                  });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {t.save}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}