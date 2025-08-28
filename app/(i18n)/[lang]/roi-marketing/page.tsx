import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import RoiMarketingClient from '@/lib/clients/RoiMarketingClient';
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
  const url = `${origin}${basePath}/${lang}/roi-marketing`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/roi-marketing`])
  );
  languages['x-default'] = `${origin}${basePath}/en/roi-marketing`;
  return {
    title: `ROI Marketing Calculator – ${year}`,
    description: `Marketing ROI using incremental revenue and gross margin.`,
    alternates: { canonical: url, languages }
  };
}

export default function RoiMarketingPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>ROI Marketing Calculator</h1>
      <RoiMarketingClient lang={lang} />
      <FaqHowToClient lang={lang} slug="roi-marketing" />
    </div>
  );
}

