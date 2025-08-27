import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import HeartRateClient from '@/lib/clients/HeartRateClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Heart Rate Calculator – ${year}`,
    description: `Estimate max heart rate (220−age) and heart rate reserve.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/heart-rate` }
  };
}

export default function HeartRatePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Heart Rate Calculator</h1>
      <HeartRateClient lang={lang} />
    </div>
  );
}

