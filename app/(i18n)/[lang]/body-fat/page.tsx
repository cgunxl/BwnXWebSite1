import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import BodyFatClient from '@/lib/clients/BodyFatClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Body Fat Calculator – ${year}`,
    description: `Estimate body fat percentage using circumference measurements.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/body-fat` }
  };
}

export default function BodyFatPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Body Fat Calculator</h1>
      <BodyFatClient lang={lang} />
    </div>
  );
}

