import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Rule72Client from '@/lib/clients/Rule72Client';
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
  const url = `${origin}${basePath}/${lang}/rule-72`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/rule-72`])
  );
  languages['x-default'] = `${origin}${basePath}/en/rule-72`;
  return {
    title: `${t(lang, 'rule72Calc')} – ${year}`,
    description: `${t(lang, 'rule72Calc')} – quick heuristic to estimate doubling time or required rate.`,
    alternates: { canonical: url, languages }
  };
}

export default function Rule72Page({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'rule72Calc')}</h1>
      <Rule72Client lang={lang} />
      <FaqHowToClient lang={lang} slug="rule-72" />
    </div>
  );
}

