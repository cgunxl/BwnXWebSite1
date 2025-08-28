import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Link from 'next/link';
import CagrClient from '@/lib/clients/CagrClient';
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
  const url = `${origin}${basePath}/${lang}/cagr`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/cagr`])
  );
  languages['x-default'] = `${origin}${basePath}/en/cagr`;
  return {
    title: `CAGR Calculator – ${year}`,
    description: `Compound annual growth rate from beginning value, ending value, and years.`,
    alternates: { canonical: url, languages }
  };
}

export default function CagrPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>CAGR Calculator</h1>
      <CagrClient lang={lang} />
      <FaqHowToClient lang={lang} slug="cagr" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/roi`}>ROI</Link>
        <Link className="button ghost" href={`/${lang}/npv-irr`}>NPV & IRR</Link>
      </nav>
    </div>
  );
}

