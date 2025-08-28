import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import RunningPaceClient from '@/lib/clients/RunningPaceClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Running Pace Calculator – ${year}`,
    description: `Compute pace per km from distance and time.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/running-pace` }
  };
}

export default function RunningPacePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Running Pace Calculator</h1>
      <RunningPaceClient lang={lang} />
    </div>
  );
}

