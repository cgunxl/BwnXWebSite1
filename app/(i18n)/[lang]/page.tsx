import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import LangHubClient from '@/lib/clients/LangHubClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}`])
  );
  languages['x-default'] = `${origin}${basePath}/en`;
  return {
    title: `${t(lang, 'siteTitle')} – ${year}`,
    description: t(lang, 'hubIntro'),
    alternates: { canonical: url, languages }
  };
}

export default function HubPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return <LangHubClient lang={lang} />;
}

