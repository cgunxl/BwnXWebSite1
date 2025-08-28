import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import RefinanceClient from '@/lib/clients/RefinanceClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Refinance Calculator – ${year}`,
    description: `Compare current monthly payment vs new refi terms including closing costs.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/refinance` }
  };
}

export default function RefinancePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Refinance Calculator</h1>
      <RefinanceClient lang={lang} />
    </div>
  );
}

