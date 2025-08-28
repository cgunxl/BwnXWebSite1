import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import CustomerLtvClient from '@/lib/clients/CustomerLtvClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/ltv-customer`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/ltv-customer`])
  );
  languages['x-default'] = `${origin}${basePath}/en/ltv-customer`;
  return {
    title: `Customer LTV Calculator – ${year}`,
    description: `Estimate customer lifetime value using ARPU, margin, and churn.`,
    alternates: { canonical: url, languages }
  };
}

export default function LtvCustomerPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Customer LTV Calculator</h1>
      <CustomerLtvClient lang={lang} />
      <FaqHowToClient lang={lang} slug="ltv-customer" />
    </div>
  );
}

