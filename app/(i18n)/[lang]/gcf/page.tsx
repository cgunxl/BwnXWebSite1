import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import GcfLcmClient from '@/lib/clients/GcfLcmClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `GCF Calculator – ${year}`,
    description: `Compute greatest common factor (GCF) of a list of integers.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/gcf` }
  };
}

export default function GcfPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>GCF Calculator</h1>
      <GcfLcmClient lang={lang} mode="gcf" />
      <FaqHowToClient lang={lang} slug="gcf" />
    </div>
  );
}

