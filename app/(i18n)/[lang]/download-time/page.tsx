import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import DownloadTimeClient from '@/lib/clients/DownloadTimeClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Download Time Calculator – ${year}`,
    description: `Estimate download time from file size, link speed, and protocol overhead.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/download-time` }
  };
}

export default function DownloadTimePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Download Time Calculator</h1>
      <DownloadTimeClient lang={lang} />
      <FaqHowToClient lang={lang} slug="download-time" />
    </div>
  );
}

