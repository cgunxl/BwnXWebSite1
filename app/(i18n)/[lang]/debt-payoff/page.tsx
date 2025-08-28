import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import DebtPayoffClient from '@/lib/clients/DebtPayoffClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Debt Payoff Calculator – ${year}`,
    description: `Estimate payoff time and total interest for revolving debt.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/debt-payoff` }
  };
}

export default function DebtPayoffPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Debt Payoff Calculator</h1>
      <DebtPayoffClient lang={lang} />
      <FaqHowToClient lang={lang} slug="debt-payoff" />
    </div>
  );
}

