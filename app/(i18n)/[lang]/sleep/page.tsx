import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import SleepClient from '@/lib/clients/SleepClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Sleep Calculator – ${year}`,
    description: `Suggest bedtime from desired wake time and number of sleep cycles.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/sleep` }
  };
}

export default function SleepPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Sleep Calculator</h1>
      <SleepClient lang={lang} />
    </div>
  );
}

