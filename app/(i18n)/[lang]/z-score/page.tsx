import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import ZScoreClient from '@/lib/clients/ZScoreClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Z-Score Calculator – ${year}`,
    description: `Compute z-score and cumulative probability for a value with given mean and standard deviation.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/z-score` }
  };
}

export default function ZScorePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Z-Score Calculator</h1>
      <ZScoreClient lang={lang} />
      <FaqHowToClient lang={lang} slug="z-score" />
    </div>
  );
}

