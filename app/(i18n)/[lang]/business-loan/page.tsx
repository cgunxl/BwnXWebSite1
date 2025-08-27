import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import BusinessLoanClient from '@/lib/clients/BusinessLoanClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Business Loan Calculator – ${year}`,
    description: `Estimate business loan payment including origination and closing costs.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/business-loan` }
  };
}

export default function BusinessLoanPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Business Loan Calculator</h1>
      <BusinessLoanClient lang={lang} />
    </div>
  );
}

