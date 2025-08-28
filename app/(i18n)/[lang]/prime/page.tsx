import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import FactorialPrimeClient from '@/lib/clients/FactorialPrimeClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Prime Number Checker – ${year}`,
    description: `Check if a number is prime or composite.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/prime` }
  };
}

export default function PrimePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Prime Number Checker</h1>
      <FactorialPrimeClient lang={lang} mode="prime" />
      <FaqHowToClient lang={lang} slug="prime" />
    </div>
  );
}

