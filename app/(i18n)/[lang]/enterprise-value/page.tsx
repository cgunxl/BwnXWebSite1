import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Link from 'next/link';
import EnterpriseValueClient from '@/lib/clients/EnterpriseValueClient';
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
  const url = `${origin}${basePath}/${lang}/enterprise-value`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/enterprise-value`])
  );
  languages['x-default'] = `${origin}${basePath}/en/enterprise-value`;
  return {
    title: `Enterprise Value Calculator – ${year}`,
    description: `Enterprise value from market cap, total debt, and cash.`,
    alternates: { canonical: url, languages }
  };
}

export default function EnterpriseValuePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Enterprise Value Calculator</h1>
      <EnterpriseValueClient lang={lang} />
      <FaqHowToClient lang={lang} slug="enterprise-value" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/roi`}>ROI</Link>
        <Link className="button ghost" href={`/${lang}/wacc`}>WACC</Link>
      </nav>
    </div>
  );
}

