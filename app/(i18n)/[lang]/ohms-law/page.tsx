import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import OhmsLawClient from '@/lib/clients/OhmsLawClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Ohm’s Law Calculator – ${year}`,
    description: `Solve V, I, R, P using V=IR and P=VI. Enter any two values.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/ohms-law` }
  };
}

export default function OhmsLawPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Ohm’s Law Calculator</h1>
      <OhmsLawClient lang={lang} />
      <FaqHowToClient lang={lang} slug="ohms-law" />
    </div>
  );
}

