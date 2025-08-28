import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import NpvIrrClient from '@/lib/clients/NpvIrrClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'npvIrrCalc')} – ${year}`,
    description: 'Compute Net Present Value (NPV) and Internal Rate of Return (IRR) from a cash flow series.',
    alternates: { canonical: `${origin}${basePath}/${lang}/npv-irr` }
  };
}

export default function NpvIrrPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'npvIrrCalc')}</h1>
      <NpvIrrClient lang={lang} />
      <FaqHowToClient lang={lang} slug="npv-irr" />
    </div>
  );
}

