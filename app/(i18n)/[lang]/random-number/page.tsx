import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import RngClient from '@/lib/clients/RngClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Random Number Generator – ${year}`,
    description: `Generate random integers in a range, with options for count and uniqueness.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/random-number` }
  };
}

export default function RandomNumberPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Random Number Generator</h1>
      <RngClient lang={lang} />
      <FaqHowToClient lang={lang} slug="random-number" />
    </div>
  );
}

