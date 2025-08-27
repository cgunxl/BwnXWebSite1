import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import TargetHrClient from '@/lib/clients/TargetHrClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Target Heart Rate Calculator – ${year}`,
    description: `Karvonen method target heart rate zones.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/target-hr` }
  };
}

export default function TargetHrPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Target Heart Rate Calculator</h1>
      <TargetHrClient lang={lang} />
    </div>
  );
}

