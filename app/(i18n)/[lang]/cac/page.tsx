import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import CacClient from '@/lib/clients/CacClient';
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
  const url = `${origin}${basePath}/${lang}/cac`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/cac`])
  );
  languages['x-default'] = `${origin}${basePath}/en/cac`;
  return {
    title: `Customer Acquisition Cost (CAC) – ${year}`,
    description: `CAC from total marketing cost divided by new customers acquired.`,
    alternates: { canonical: url, languages }
  };
}

export default function CacPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Customer Acquisition Cost (CAC)</h1>
      <CacClient lang={lang} />
      <FaqHowToClient lang={lang} slug="cac" />
    </div>
  );
}

