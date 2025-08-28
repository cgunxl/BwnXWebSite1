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
    title: `LCM Calculator – ${year}`,
    description: `Compute least common multiple (LCM) of a list of integers.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/lcm` }
  };
}

export default function LcmPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>LCM Calculator</h1>
      <GcfLcmClient lang={lang} mode="lcm" />
      <FaqHowToClient lang={lang} slug="lcm" />
    </div>
  );
}

