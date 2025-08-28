import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import BondYieldClient from '@/lib/clients/BondYieldClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'bondYieldCalc')} – ${year}`,
    description: 'Solve yield to maturity (YTM) from bond price, coupon, and term.',
    alternates: { canonical: `${origin}${basePath}/${lang}/bond-yield` }
  };
}

export default function BondYieldPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'bondYieldCalc')}</h1>
      <BondYieldClient lang={lang} />
      <FaqHowToClient lang={lang} slug="bond-yield" />
    </div>
  );
}

