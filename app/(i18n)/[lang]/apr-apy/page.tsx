import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import AprApyClient from '@/lib/clients/AprApyClient';
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
  const url = `${origin}${basePath}/${lang}/apr-apy`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/apr-apy`])
  );
  languages['x-default'] = `${origin}${basePath}/en/apr-apy`;
  return {
    title: `${t(lang, 'aprApyCalc')} – ${year}`,
    description: `${t(lang, 'aprApyCalc')} – convert APR↔APY with compounding frequency.`,
    alternates: { canonical: url, languages }
  };
}

export default function AprApyPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'aprApyCalc')}</h1>
      <AprApyClient lang={lang} />
      <FaqHowToClient lang={lang} slug="apr-apy" />
    </div>
  );
}

