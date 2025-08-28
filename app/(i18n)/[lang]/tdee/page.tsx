import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import TdeeClient from '@/lib/clients/TdeeClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `TDEE Calculator – ${year}`,
    description: `Total Daily Energy Expenditure based on BMR and activity factor.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/tdee` }
  };
}

export default function TdeePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>TDEE Calculator</h1>
      <TdeeClient lang={lang} />
    </div>
  );
}

