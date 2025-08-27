import type { Metadata } from 'next';
import { getAllLocales, t, getCurrencyForLang } from '@/lib/i18n';
import { getAllCountries } from '@/lib/countries';
import Link from 'next/link';
import LoanClient from '@/lib/clients/LoanClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  const langs = getAllLocales();
  const countries = getAllCountries();
  return langs.flatMap((lang) => countries.map((country) => ({ lang, country })));
}

export async function generateMetadata({ params }: { params: { lang: string, country: string } }): Promise<Metadata> {
  const { lang, country } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/${country}/loan`;
  return {
    title: `${t(lang, 'loanCalc')} – ${country.toUpperCase()} – ${year}`,
    description: `${t(lang, 'loanCalc')} with local currency and amortization schedule.`,
    alternates: { canonical: url }
  };
}

export default function LoanCountryPage({ params }: { params: { lang: string, country: string } }) {
  const { lang, country } = params;
  getCurrencyForLang(lang); // preload Intl locale
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'loanCalc')} – {country.toUpperCase()}</h1>
      <p className="muted">{t(lang, 'disclaimer')}</p>

      <LoanClient lang={lang} country={country} />

      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/${country}/mortgage`}>{t(lang, 'navMortgage')}</Link>
        <Link className="button ghost" href={`/${lang}/${country}/tax`}>{t(lang, 'navTax')}</Link>
      </nav>
    </div>
  );
}

