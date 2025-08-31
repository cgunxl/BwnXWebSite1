import { notFound } from 'next/navigation';
import { i18n, localeNames, localeFlags, isRTL } from '@/lib/i18n/config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import GoogleAnalytics from '@/components/Analytics';
import CookieConsent from '@/components/CookieConsent';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate locale
  if (!i18n.locales.includes(locale as any)) {
    notFound();
  }

  const dir = isRTL(locale as any) ? 'rtl' : 'ltr';

  return (
    <ThemeProvider>
      <div dir={dir} className="flex flex-col min-h-screen">
        <GoogleAnalytics />
        <CookieConsent locale={locale as any} />
        <Header locale={locale} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer locale={locale} />
      </div>
    </ThemeProvider>
  );
}