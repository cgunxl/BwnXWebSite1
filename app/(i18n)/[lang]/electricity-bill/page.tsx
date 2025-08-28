import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import ElectricityBillClient from '@/lib/clients/ElectricityBillClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Electricity Bill Calculator – ${year}`,
    description: `Estimate monthly electricity bill from kWh, energy rate, Ft, service fee, and tax.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/electricity-bill` }
  };
}

export default function ElectricityBillPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Electricity Bill Calculator</h1>
      <ElectricityBillClient lang={lang} />
      <FaqHowToClient lang={lang} slug="electricity-bill" />
    </div>
  );
}

