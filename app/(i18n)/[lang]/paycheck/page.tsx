import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import TakeHomeClient from '@/lib/clients/TakeHomeClient';
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
  const url = `${origin}${basePath}/${lang}/paycheck`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/paycheck`])
  );
  languages['x-default'] = `${origin}${basePath}/en/paycheck`;
  return {
    title: `${t(lang, 'paycheckCalc')} – ${year}`,
    description: `${t(lang, 'paycheckCalc')} estimates take‑home pay after tax and social contributions.`,
    alternates: { canonical: url, languages }
  };
}

export default function PaycheckPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const country = getDefaultCountryForLang(lang);

  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'paycheckCalc')}</h1>
      <p className="muted">Educational estimate only; real payroll deductions vary by jurisdiction and benefits.</p>

      <TakeHomeClient lang={lang} country={country} />

      <section className="card" style={{marginTop: 16}}>
        <h2>{t(lang, 'sources')}</h2>
        <ol>
          <li>[1] Progressive bracket examples included from local revenue agencies (simplified).</li>
          <li>[2] Social contributions vary; consult official payroll guidance for your country.</li>
        </ol>
      </section>

      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/tax`}>{t(lang, 'navTax')}</Link>
        <Link className="button ghost" href={`/${lang}/loan`}>{t(lang, 'navLoan')}</Link>
        <Link className="button ghost" href={`/${lang}/mortgage`}>{t(lang, 'navMortgage')}</Link>
      </nav>
    </div>
  );
}

