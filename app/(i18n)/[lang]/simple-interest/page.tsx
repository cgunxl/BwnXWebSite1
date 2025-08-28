import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import SimpleInterestClient from '@/lib/clients/SimpleInterestClient';
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
  const url = `${origin}${basePath}/${lang}/simple-interest`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/simple-interest`])
  );
  languages['x-default'] = `${origin}${basePath}/en/simple-interest`;
  return {
    title: `${t(lang, 'simpleInterestCalc')} – ${year}`,
    description: `${t(lang, 'simpleInterestCalc')} using I = P × r × t. Quick interest and total.`,
    alternates: { canonical: url, languages }
  };
}

export default function SimpleInterestPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'simpleInterestCalc')}</h1>
      <SimpleInterestClient lang={lang} />
      <FaqHowToClient lang={lang} slug="simple-interest" />
    </div>
  );
}

