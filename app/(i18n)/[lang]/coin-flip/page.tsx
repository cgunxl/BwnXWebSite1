import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import CoinFlipClient from '@/lib/clients/CoinFlipClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Coin Flip Simulator – ${year}`,
    description: `Simulate coin tosses and track heads/tails counts and sequence.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/coin-flip` }
  };
}

export default function CoinFlipPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Coin Flip Simulator</h1>
      <CoinFlipClient lang={lang} />
      <FaqHowToClient lang={lang} slug="coin-flip" />
    </div>
  );
}

