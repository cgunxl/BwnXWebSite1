import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import PercentRatioClient from '@/lib/clients/PercentRatioClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Percentage Calculator – ${year}`,
    description: `Part-to-whole percentage and percentage of a value.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/percentage` }
  };
}

export default function PercentagePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Percentage Calculator</h1>
      <PercentRatioClient lang={lang} mode="percentage" />
      <FaqHowToClient lang={lang} slug="percentage" />
    </div>
  );
}

