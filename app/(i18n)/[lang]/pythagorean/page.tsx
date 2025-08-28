import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import PythagoreanClient from '@/lib/clients/PythagoreanClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'pythagoreanCalc')} – ${year}`,
    description: `Solve right triangle sides using the Pythagorean theorem.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/pythagorean` }
  };
}

export default function PythagoreanPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'pythagoreanCalc')}</h1>
      <PythagoreanClient lang={lang} />
      <FaqHowToClient lang={lang} slug="pythagorean" />
    </div>
  );
}

