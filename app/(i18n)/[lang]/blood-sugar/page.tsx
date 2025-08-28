import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import UnitConverterClient from '@/lib/clients/UnitConverterClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Blood Sugar Converter – ${year}`,
    description: `Convert blood glucose mg/dL and mmol/L.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/blood-sugar` }
  };
}

export default function BloodSugarPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Blood Sugar Converter</h1>
      <UnitConverterClient lang={lang} category="blood-sugar" />
      <FaqHowToClient lang={lang} slug="blood-sugar" />
    </div>
  );
}

