import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Link from 'next/link';
import DividendClient from '@/lib/clients/DividendClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/dividend`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/dividend`])
  );
  languages['x-default'] = `${origin}${basePath}/en/dividend`;
  return {
    title: `Dividend Calculator – ${year}`,
    description: `Compute annual dividend income and dividend yield.`,
    alternates: { canonical: url, languages }
  };
}

export default function DividendPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Dividend Calculator</h1>
      <DividendClient lang={lang} />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/stock-return`}>Stock Return</Link>
      </nav>
    </div>
  );
}

