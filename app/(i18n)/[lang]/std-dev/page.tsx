import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import StdVarClient from '@/lib/clients/StdVarClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Standard Deviation Calculator – ${year}`,
    description: `Compute variance and standard deviation.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/std-dev` }
  };
}

export default function StdDevPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Standard Deviation Calculator</h1>
      <StdVarClient lang={lang} />
      <FaqHowToClient lang={lang} slug="std-dev" />
    </div>
  );
}

