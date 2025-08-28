import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import WaccClient from '@/lib/clients/WaccClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'waccCalc')} – ${year}`,
    description: 'Weighted Average Cost of Capital (WACC) from capital structure and costs.',
    alternates: { canonical: `${origin}${basePath}/${lang}/wacc` }
  };
}

export default function WaccPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'waccCalc')}</h1>
      <WaccClient lang={lang} />
      <FaqHowToClient lang={lang} slug="wacc" />
    </div>
  );
}

