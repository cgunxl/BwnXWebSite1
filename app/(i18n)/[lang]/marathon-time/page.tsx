import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import MarathonTimeClient from '@/lib/clients/MarathonTimeClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Marathon Time Calculator – ${year}`,
    description: `Estimate race time from target pace and distance.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/marathon-time` }
  };
}

export default function MarathonTimePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Marathon Time Calculator</h1>
      <MarathonTimeClient lang={lang} />
    </div>
  );
}

