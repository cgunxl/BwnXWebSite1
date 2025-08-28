import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import { getDefaultCountryForLang } from '@/lib/countries';
import TakeHomeClient from '@/lib/clients/TakeHomeClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'salaryCalc')} – ${year}`,
    description: `Estimate net salary after income tax and social contributions.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/salary` }
  };
}

export default function SalaryPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const country = getDefaultCountryForLang(lang);
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'salaryCalc')}</h1>
      <TakeHomeClient lang={lang} country={country} />
      <FaqHowToClient lang={lang} slug="salary" />
    </div>
  );
}

