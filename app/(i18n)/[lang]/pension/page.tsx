import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Link from 'next/link';
import PensionClient from '@/lib/clients/PensionClient';
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
  const url = `${origin}${basePath}/${lang}/pension`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/pension`])
  );
  languages['x-default'] = `${origin}${basePath}/en/pension`;
  return {
    title: `Pension Calculator – ${year}`,
    description: `Estimate monthly pension from contributions and returns.`,
    alternates: { canonical: url, languages }
  };
}

export default function PensionPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Pension Calculator</h1>
      <PensionClient lang={lang} />
      <FaqHowToClient lang={lang} slug="pension" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/retirement`}>Retirement</Link>
        <Link className="button ghost" href={`/${lang}/annuity`}>Annuity</Link>
      </nav>
    </div>
  );
}

