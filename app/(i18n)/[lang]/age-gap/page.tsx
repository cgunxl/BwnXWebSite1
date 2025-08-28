import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import AgeGapClient from '@/lib/clients/AgeGapClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Age Gap Calculator – ${year}`,
    description: `Compute the age difference between two birth dates in years, months, and days.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/age-gap` }
  };
}

export default function AgeGapPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Age Gap Calculator</h1>
      <AgeGapClient lang={lang} />
      <FaqHowToClient lang={lang} slug="age-gap" />
    </div>
  );
}

