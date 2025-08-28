import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import BondPriceClient from '@/lib/clients/BondPriceClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'bondPriceCalc')} – ${year}`,
    description: 'Price a coupon bond from yield to maturity (YTM), coupon, and term.',
    alternates: { canonical: `${origin}${basePath}/${lang}/bond-price` }
  };
}

export default function BondPricePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'bondPriceCalc')}</h1>
      <BondPriceClient lang={lang} />
      <FaqHowToClient lang={lang} slug="bond-price" />
    </div>
  );
}

