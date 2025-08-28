import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import BmrClient from '@/lib/clients/BmrClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `BMR Calculator – ${year}`,
    description: `Basal Metabolic Rate via Mifflin–St Jeor equation.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/bmr` }
  };
}

export default function BmrPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>BMR Calculator</h1>
      <BmrClient lang={lang} />
    </div>
  );
}

