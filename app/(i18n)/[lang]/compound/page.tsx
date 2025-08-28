import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import CompoundClient from '@/lib/clients/CompoundClient';
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
  const url = `${origin}${basePath}/${lang}/compound`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/compound`])
  );
  languages['x-default'] = `${origin}${basePath}/en/compound`;
  return {
    title: `${t(lang, 'compoundCalc')} – ${year}`,
    description: `${t(lang, 'compoundCalc')} with periodic contributions and compounding frequency.`,
    alternates: { canonical: url, languages }
  };
}

export default function CompoundPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'compoundCalc')}</h1>
      <CompoundClient lang={lang} />
      <FaqHowToClient lang={lang} slug="compound" />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/savings-goal`}>{t(lang, 'savingsGoalCalc')}</Link>
      </nav>
    </div>
  );
}

