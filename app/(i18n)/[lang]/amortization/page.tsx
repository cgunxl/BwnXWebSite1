import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import MortgageClient from '@/lib/clients/MortgageClient';
import { getDefaultCountryForLang } from '@/lib/countries';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Amortization Calculator – ${year}`,
    description: `Build an amortization schedule and download CSV.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/amortization` }
  };
}

export default function AmortizationPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const country = getDefaultCountryForLang(lang);
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'amortizationSchedule')}</h1>
      <MortgageClient lang={lang} country={country} />
    </div>
  );
}

