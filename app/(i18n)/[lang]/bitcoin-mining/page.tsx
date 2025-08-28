import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import BitcoinMiningClient from '@/lib/clients/BitcoinMiningClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/bitcoin-mining`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/bitcoin-mining`])
  );
  languages['x-default'] = `${origin}${basePath}/en/bitcoin-mining`;
  return {
    title: `Bitcoin Mining Calculator – ${year}`,
    description: `Estimate BTC/day, revenue and profit from hashrate, power and electricity cost.`,
    alternates: { canonical: url, languages }
  };
}

export default function BitcoinMiningPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Bitcoin Mining Calculator</h1>
      <BitcoinMiningClient lang={lang} />
      <FaqHowToClient lang={lang} slug="bitcoin-mining" />
    </div>
  );
}

