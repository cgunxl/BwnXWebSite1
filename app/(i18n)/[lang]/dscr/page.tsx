import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import DscrClient from '@/lib/clients/DscrClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `${t(lang, 'dscrCalc')} – ${year}`,
    description: 'Debt Service Coverage Ratio (DSCR) from NOI and annual debt service.',
    alternates: { canonical: `${origin}${basePath}/${lang}/dscr` }
  };
}

export default function DscrPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'dscrCalc')}</h1>
      <DscrClient lang={lang} />
      <FaqHowToClient lang={lang} slug="dscr" />
    </div>
  );
}

