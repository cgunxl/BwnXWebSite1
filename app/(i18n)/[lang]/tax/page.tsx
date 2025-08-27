import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import TaxClient from '@/lib/clients/TaxClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/tax`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/tax`])
  );
  languages['x-default'] = `${origin}${basePath}/en/tax`;
  return {
    title: `${t(lang, 'taxCalc')} – ${year}`,
    description: `${t(lang, 'taxCalc')} using simple progressive brackets.`,
    alternates: { canonical: url, languages }
  };
}

export default function TaxPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'taxCalc')}</h1>
      <p className="muted">{t(lang, 'taxDisclaimer')}</p>

      <TaxClient lang={lang} />

      <section className="card" style={{marginTop: 16}}>
        <h2>{t(lang, 'whyMatters')}</h2>
        <p>
          Progressive systems use multiple brackets, credits, and deductions that interact in ways most households only encounter once per year. Employers withhold based on a worksheet, but actual liability depends on filing status, dependents, above‑the‑line adjustments, and phase‑outs. Complexity raises the time and stress cost of compliance and increases the risk of misreporting. Incorrect filings can trigger penalties or refund delays, while over‑withholding effectively acts as an interest‑free loan to the government. A simple estimator helps households sanity‑check whether their withholding is on track and what their effective rate looks like at different income levels. That, in turn, informs savings plans, charitable giving, and timing income or deductions. If your finances involve self‑employment income, equity compensation, rental losses, or international considerations, professional advice is warranted. For everyone else, a quick preview like this can reduce surprises and make paycheck decisions more deliberate.
        </p>
        <h3 style={{marginTop: 12}}>{t(lang, 'sources')}</h3>
        <ol>
          <li>[1] Common tax guidance: consult a qualified tax professional for personal advice.</li>
        </ol>
      </section>

      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/loan`}>{t(lang, 'navLoan')}</Link>
        <Link className="button ghost" href={`/${lang}/mortgage`}>{t(lang, 'navMortgage')}</Link>
        <Link className="button ghost" href={`/${lang}/insurance`}>{t(lang, 'navInsurance')}</Link>
      </nav>
    </div>
  );
}

