import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import RectangleAreaClient from '@/lib/clients/RectangleAreaClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'rectangleAreaCalc')} – ${year}`,
    description: `Area, perimeter, and diagonal of a rectangle from width and height.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/rectangle-area` }
  };
}

export default function RectangleAreaPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'rectangleAreaCalc')}</h1>
      <RectangleAreaClient lang={lang} />
      <FaqHowToClient lang={lang} slug="rectangle-area" />
    </div>
  );
}

