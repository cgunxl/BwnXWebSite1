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
    title: `Pressure Converter – ${year}`,
    description: `Convert Pa, kPa, bar, atm, and psi.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/pressure` }
  };
}

export default function PressurePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Pressure Converter</h1>
      <UnitConverterClient lang={lang} category="pressure" />
      <FaqHowToClient lang={lang} slug="pressure" />
    </div>
  );
}

