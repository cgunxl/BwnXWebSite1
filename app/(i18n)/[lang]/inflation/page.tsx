import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import InflationClient from '@/lib/clients/InflationClient';
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
  const url = `${origin}${basePath}/${lang}/inflation`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/inflation`])
  );
  languages['x-default'] = `${origin}${basePath}/en/inflation`;
  return {
    title: `Inflation Calculator – ${year}`,
    description: `Adjust a future amount to today\'s value given inflation.`,
    alternates: { canonical: url, languages }
  };
}

export default function InflationPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Inflation Calculator</h1>
      <InflationClient lang={lang} />
      <FaqHowToClient lang={lang} slug="inflation" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/compound`}>{t(lang, 'compoundCalc')}</Link>
      </nav>
    </div>
  );
}

