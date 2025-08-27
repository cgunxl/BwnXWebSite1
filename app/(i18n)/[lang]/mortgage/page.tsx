import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import MortgageClient from '@/lib/clients/MortgageClient';
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
  const url = `${origin}${basePath}/${lang}/mortgage`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/mortgage`])
  );
  languages['x-default'] = `${origin}${basePath}/en/mortgage`;
  return {
    title: `${t(lang, 'mortgageCalc')} – ${year}`,
    description: `${t(lang, 'mortgageCalc')} including optional closing costs.`,
    alternates: { canonical: url, languages }
  };
}

export default function MortgagePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const country = getDefaultCountryForLang(lang);

  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'mortgageCalc')}</h1>
      <p className="muted">{t(lang, 'disclaimer')}</p>

      <MortgageClient lang={lang} country={country} />

      <section className="card" style={{marginTop: 16}}>
        <h2>{t(lang, 'whyMatters')}</h2>
        <p>
          Closing costs are not just a line item—they bundle fees for title insurance, appraisal, credit reports, origination, recording and more, which can surprise first‑time buyers at the closing table.<sup>[1]</sup> In 2022, the median total loan costs on new mortgages jumped 21.8% from 2021 and hovered near $6,000, driven by higher interest rates and third‑party fees.<sup>[2]</sup> Some lenders advertise “no‑closing‑cost” mortgages, but they typically offset that concession with a higher interest rate via lender credits, which raises the monthly payment and increases total interest over time.<sup>[3]</sup> Running the numbers with a calculator helps borrowers decide whether to pay costs upfront, accept credits, or negotiate. Even a small change in rate can add thousands over a 30‑year term. Including closing costs in the modeled principal reveals the true “all‑in” monthly burden and prevents under‑budgeting for homeownership.
        </p>
        <h3 style={{marginTop: 12}}>{t(lang, 'sources')}</h3>
        <ol>
          <li>[1] [oai_citation:3‡cfpb.gov](https://www.consumerfinance.gov/ask-cfpb/what-are-mortgage-closing-costs-en-120/)</li>
          <li>[2] [oai_citation:4‡cfpb.gov](https://www.consumerfinance.gov/about-us/blog/the-cost-of-taking-out-a-mortgage-soared-in-2022/)</li>
          <li>[3] [oai_citation:5‡cfpb.gov](https://www.consumerfinance.gov/ask-cfpb/what-are-lender-credits-and-how-do-they-work-en-114/)</li>
        </ol>
      </section>

      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/loan`}>{t(lang, 'navLoan')}</Link>
        <Link className="button ghost" href={`/${lang}/tax`}>{t(lang, 'navTax')}</Link>
        <Link className="button ghost" href={`/${lang}/insurance`}>{t(lang, 'navInsurance')}</Link>
      </nav>
    </div>
  );
}

