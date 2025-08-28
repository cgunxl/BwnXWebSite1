import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import HouseAffordabilityClient from '@/lib/clients/HouseAffordabilityClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'houseAffordabilityCalc')} – ${year}`,
    description: `Estimate the maximum home price you can afford based on income, debts, rate, and taxes.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/house-affordability` }
  };
}

export default function HouseAffordabilityPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'houseAffordabilityCalc')}</h1>
      <HouseAffordabilityClient lang={lang} />
      <FaqHowToClient lang={lang} slug="house-affordability" />
    </div>
  );
}

