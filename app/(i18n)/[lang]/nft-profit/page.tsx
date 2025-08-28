import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import NftProfitClient from '@/lib/clients/NftProfitClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/nft-profit`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/nft-profit`])
  );
  languages['x-default'] = `${origin}${basePath}/en/nft-profit`;
  return {
    title: `NFT Profit Calculator – ${year}`,
    description: `Estimate NFT profit after royalties and platform fees.`,
    alternates: { canonical: url, languages }
  };
}

export default function NftProfitPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>NFT Profit Calculator</h1>
      <NftProfitClient lang={lang} />
    </div>
  );
}

