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
    title: `Permutation Calculator – ${year}`,
    description: `Compute permutations nPr and n^r (with repetition).`,
    alternates: { canonical: `${origin}${basePath}/${lang}/permutation` }
  };
}

export default function PermutationPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Permutation Calculator</h1>
      <PermCombClient lang={lang} mode="perm" />
      <FaqHowToClient lang={lang} slug="permutation" />
    </div>
  );
}

