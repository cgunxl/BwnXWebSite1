import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import MutualFundClient from '@/lib/clients/MutualFundClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/mutual-fund`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/mutual-fund`])
  );
  languages['x-default'] = `${origin}${basePath}/en/mutual-fund`;
  return {
    title: `Mutual Fund Calculator – ${year}`,
    description: `Estimate net return after expense ratio using buy/sell NAV and holding period.`,
    alternates: { canonical: url, languages }
  };
}

export default function MutualFundPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Mutual Fund Calculator</h1>
      <MutualFundClient lang={lang} />
    </div>
  );
}

