import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import TipClient from '@/lib/clients/TipClient';
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
  const url = `${origin}${basePath}/${lang}/tip`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/tip`])
  );
  languages['x-default'] = `${origin}${basePath}/en/tip`;
  return {
    title: `Tip Calculator – ${year}`,
    description: `Calculate tip, total, and per-person split.`,
    alternates: { canonical: url, languages }
  };
}

export default function TipPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Tip Calculator</h1>
      <TipClient lang={lang} />
      <FaqHowToClient lang={lang} slug="tip" />
    </div>
  );
}

