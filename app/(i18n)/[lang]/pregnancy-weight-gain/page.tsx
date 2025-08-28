import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import PregnancyWeightGainClient from '@/lib/clients/PregnancyWeightGainClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Pregnancy Weight Gain Calculator – ${year}`,
    description: `Recommended pregnancy weight gain based on pre-pregnancy BMI and gestational weeks.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/pregnancy-weight-gain` }
  };
}

export default function PregnancyWeightGainPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Pregnancy Weight Gain Calculator</h1>
      <PregnancyWeightGainClient lang={lang} />
      <FaqHowToClient lang={lang} slug="pregnancy-weight-gain" />
    </div>
  );
}

