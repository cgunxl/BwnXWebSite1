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
    title: `Volume Converter – ${year}`,
    description: `Convert liters, gallons, cups, and more.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/volume` }
  };
}

export default function VolumePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Volume Converter</h1>
      <UnitConverterClient lang={lang} category="volume" />
      <FaqHowToClient lang={lang} slug="volume" />
    </div>
  );
}

