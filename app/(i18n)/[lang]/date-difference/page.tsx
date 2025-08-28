import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import DateDiffClient from '@/lib/clients/DateDiffClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Date Difference Calculator – ${year}`,
    description: `Count days, weeks, months/years between two dates (inclusive option).`,
    alternates: { canonical: `${origin}${basePath}/${lang}/date-difference` }
  };
}

export default function DateDifferencePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Date Difference Calculator</h1>
      <DateDiffClient lang={lang} />
      <FaqHowToClient lang={lang} slug="date-difference" />
    </div>
  );
}

