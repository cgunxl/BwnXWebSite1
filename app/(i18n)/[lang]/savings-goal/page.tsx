import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import SavingsGoalClient from '@/lib/clients/SavingsGoalClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/savings-goal`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/savings-goal`])
  );
  languages['x-default'] = `${origin}${basePath}/en/savings-goal`;
  return {
    title: `${t(lang, 'savingsGoalCalc')} – ${year}`,
    description: `${t(lang, 'savingsGoalCalc')} computes required periodic contributions to reach a goal.`,
    alternates: { canonical: url, languages }
  };
}

export default function SavingsGoalPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'savingsGoalCalc')}</h1>
      <SavingsGoalClient lang={lang} />
      <section className="card" style={{marginTop: 16}}>
        <h2>{t(lang, 'sources')}</h2>
        <ol>
          <li>[1] Time value of money formulas – PMT and FV.</li>
        </ol>
      </section>
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/compound`}>{t(lang, 'compoundCalc')}</Link>
      </nav>
    </div>
  );
}

