import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import FuelCostClient from '@/lib/clients/FuelCostClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Fuel Cost Calculator – ${year}`,
    description: `Estimate trip fuel needed and cost from distance, efficiency, and fuel price.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/fuel-cost` }
  };
}

export default function FuelCostPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Fuel Cost Calculator</h1>
      <FuelCostClient lang={lang} />
      <FaqHowToClient lang={lang} slug="fuel-cost" />
    </div>
  );
}

