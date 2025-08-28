import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import ProfitMarginClient from '@/lib/clients/ProfitMarginClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Profit Margin Calculator – ${year}`,
    description: `Compute gross and operating margin from revenue, COGS, and OPEX.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/profit-margin` }
  };
}

export default function ProfitMarginPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Profit Margin Calculator</h1>
      <ProfitMarginClient lang={lang} />
      <FaqHowToClient lang={lang} slug="profit-margin" />
    </div>
  );
}

