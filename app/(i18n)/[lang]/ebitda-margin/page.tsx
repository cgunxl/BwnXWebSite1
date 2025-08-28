import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Link from 'next/link';
import EbitdaMarginClient from '@/lib/clients/EbitdaMarginClient';
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
  const url = `${origin}${basePath}/${lang}/ebitda-margin`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/ebitda-margin`])
  );
  languages['x-default'] = `${origin}${basePath}/en/ebitda-margin`;
  return {
    title: `EBITDA Margin Calculator – ${year}`,
    description: `Compute EBITDA margin from revenue and EBITDA.`,
    alternates: { canonical: url, languages }
  };
}

export default function EbitdaMarginPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>EBITDA Margin Calculator</h1>
      <EbitdaMarginClient lang={lang} />
      <FaqHowToClient lang={lang} slug="ebitda-margin" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/profit-margin`}>Profit Margin</Link>
        <Link className="button ghost" href={`/${lang}/roi`}>ROI</Link>
      </nav>
    </div>
  );
}

