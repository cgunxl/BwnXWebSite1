import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import CryptoProfitClient from '@/lib/clients/CryptoProfitClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/crypto-profit`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/crypto-profit`])
  );
  languages['x-default'] = `${origin}${basePath}/en/crypto-profit`;
  return {
    title: `Crypto Profit Calculator – ${year}`,
    description: `Estimate crypto profit factoring buy/sell price, quantity and fees.`,
    alternates: { canonical: url, languages }
  };
}

export default function CryptoProfitPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Crypto Profit Calculator</h1>
      <CryptoProfitClient lang={lang} />
    </div>
  );
}

