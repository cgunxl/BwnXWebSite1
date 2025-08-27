import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import HourlyWageClient from '@/lib/clients/HourlyWageClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Hourly Wage Calculator – ${year}`,
    description: `Convert hourly wage to weekly, monthly, and annual pay.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/hourly-wage` }
  };
}

export default function HourlyWagePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Hourly Wage Calculator</h1>
      <HourlyWageClient lang={lang} />
    </div>
  );
}

