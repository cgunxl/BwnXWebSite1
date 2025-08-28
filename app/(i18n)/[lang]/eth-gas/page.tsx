import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import EthGasClient from '@/lib/clients/EthGasClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/eth-gas`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/eth-gas`])
  );
  languages['x-default'] = `${origin}${basePath}/en/eth-gas`;
  return {
    title: `Ethereum Gas Fee Calculator – ${year}`,
    description: `Estimate ETH and USD transaction cost from gas price, gas used and ETH/USD.`,
    alternates: { canonical: url, languages }
  };
}

export default function EthGasPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Ethereum Gas Fee Calculator</h1>
      <EthGasClient lang={lang} />
      <FaqHowToClient lang={lang} slug="eth-gas" />
    </div>
  );
}

