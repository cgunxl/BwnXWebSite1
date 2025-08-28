import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import ChurnRateClient from '@/lib/clients/ChurnRateClient';
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
  const url = `${origin}${basePath}/${lang}/churn-rate`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/churn-rate`])
  );
  languages['x-default'] = `${origin}${basePath}/en/churn-rate`;
  return {
    title: `${t(lang, 'churnRateCalc')} – ${year}`,
    description: `Monthly churn and retention from start, end and new customers.`,
    alternates: { canonical: url, languages }
  };
}

export default function ChurnRatePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'churnRateCalc')}</h1>
      <ChurnRateClient lang={lang} />
      <FaqHowToClient lang={lang} slug="churn-rate" />
    </div>
  );
}

