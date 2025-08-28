import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import PermCombClient from '@/lib/clients/PermCombClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Combination Calculator – ${year}`,
    description: `Compute combinations nCr and (n+r-1 choose r) with repetition.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/combination` }
  };
}

export default function CombinationPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Combination Calculator</h1>
      <PermCombClient lang={lang} mode="comb" />
      <FaqHowToClient lang={lang} slug="combination" />
    </div>
  );
}

