import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import BreakEvenClient from '@/lib/clients/BreakEvenClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Break-even Calculator – ${year}`,
    description: `Compute break-even units from fixed cost, price, and variable cost per unit.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/break-even` }
  };
}

export default function BreakEvenPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Break-even Calculator</h1>
      <BreakEvenClient lang={lang} />
      <FaqHowToClient lang={lang} slug="break-even" />
    </div>
  );
}

