import type { Metadata } from 'next';
import { getAllLocales, t, getCurrencyForLang } from '@/lib/i18n';
import Link from 'next/link';
import LoanClient from '@/lib/clients/LoanClient';
import { getDefaultCountryForLang } from '@/lib/countries';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/loan`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/loan`])
  );
  languages['x-default'] = `${origin}${basePath}/en/loan`;
  return {
    title: `${t(lang, 'loanCalc')} – ${year}`,
    description: `${t(lang, 'loanCalc')} to estimate monthly payments, total, and interest.`,
    alternates: { canonical: url, languages }
  };
}

export default function LoanPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const currency = getCurrencyForLang(lang);
  const country = getDefaultCountryForLang(lang);

  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'loanCalc')}</h1>
      <p className="muted">{t(lang, 'disclaimer')}</p>

      <LoanClient lang={lang} country={country} />

      <section className="card" style={{marginTop: 16}}>
        <h2>{t(lang, 'whyMatters')}</h2>
        <p>
          Predatory lending thrives on complexity and urgency. Many high-cost loans advertise quick approvals but obscure the true cost of credit through opaque disclosures, excessive fees, and triple‑digit APRs. These products are designed to be refinanced repeatedly rather than repaid, trapping borrowers in a cycle of debt and overdraft fees.<sup>[1]</sup> People often turn to these loans not because they misjudge the price, but because they face emergencies—rent due, a medical bill, or a car repair—and have few alternatives due to low income or thin credit files.<sup>[2]</sup> Clear amortization math helps reveal the real monthly burden and how much of each payment goes to interest versus principal. Understanding the total repayment and lifetime interest makes it easier to compare options and push back on junk fees, add‑ons, or refinance pitches that only extend the debt. Using a simple calculator before signing can help borrowers ask better questions, budget realistically, and avoid high‑cost debt spirals.
        </p>
        <h3 style={{marginTop: 12}}>{t(lang, 'sources')}</h3>
        <ol>
          <li>[1] [oai_citation:1‡civilrights.org](https://civilrights.org/edfund/resource/these-are-the-significant-costs-of-predatory-loans/)</li>
          <li>[2] [oai_citation:2‡pewtrusts.org](https://www.pewtrusts.org/en/research-and-analysis/fact-sheets/2012/07/19/payday-lending-in-america-who-borrows-where-they-borrow-and-why)</li>
        </ol>
      </section>

      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/mortgage`}>{t(lang, 'navMortgage')}</Link>
        <Link className="button ghost" href={`/${lang}/tax`}>{t(lang, 'navTax')}</Link>
        <Link className="button ghost" href={`/${lang}/insurance`}>{t(lang, 'navInsurance')}</Link>
      </nav>
    </div>
  );
}

