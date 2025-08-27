import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import Vo2MaxClient from '@/lib/clients/Vo2MaxClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `VO2 Max Calculator – ${year}`,
    description: `Estimate VO2max using the Cooper 12‑minute run test.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/vo2max` }
  };
}

export default function Vo2MaxPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>VO2 Max Calculator</h1>
      <Vo2MaxClient lang={lang} />
    </div>
  );
}

