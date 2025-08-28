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
    title: `Temperature Converter – ${year}`,
    description: `Convert Celsius, Fahrenheit, and Kelvin.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/temperature` }
  };
}

export default function TemperaturePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Temperature Converter</h1>
      <UnitConverterClient lang={lang} category="temperature" />
      <FaqHowToClient lang={lang} slug="temperature" />
    </div>
  );
}

