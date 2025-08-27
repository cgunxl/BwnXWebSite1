import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import { getAllCountries } from '@/lib/countries';

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
  const url = `${origin}${basePath}/${lang}/${country}`;
  return {
    title: `${t(lang, 'siteTitle')} – ${country.toUpperCase()} – ${year}`,
    description: t(lang, 'hubIntro'),
    alternates: { canonical: url }
  };
}

export default function CountryHubPage({ params }: { params: { lang: string, country: string } }) {
  const { lang, country } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1 style={{marginBottom: 6}}>{t(lang, 'siteTitle')} – {country.toUpperCase()}</h1>
      <p className="muted" style={{marginTop: 0}}>{t(lang, 'hubIntro')}</p>

      <div className="card-grid" style={{marginTop: 16}}>
        <div className="card">
          <h2>{t(lang, 'loanCalc')}</h2>
          <p>{t(lang, 'loan')}: Estimate payments with local defaults.</p>
          <Link className="button" href={`/${lang}/${country}/loan`} style={{display:'inline-block', marginTop: 8}}>{t(lang, 'explore')}</Link>
        </div>
        <div className="card">
          <h2>{t(lang, 'mortgageCalc')}</h2>
          <p>{t(lang, 'mortgage')}: Include fees and amortization schedule.</p>
          <Link className="button" href={`/${lang}/${country}/mortgage`} style={{display:'inline-block', marginTop: 8}}>{t(lang, 'explore')}</Link>
        </div>
        <div className="card">
          <h2>{t(lang, 'taxCalc')}</h2>
          <p>{t(lang, 'tax')}: Progressive brackets tailored to the country.</p>
          <Link className="button" href={`/${lang}/${country}/tax`} style={{display:'inline-block', marginTop: 8}}>{t(lang, 'explore')}</Link>
        </div>
        <div className="card">
          <h2>Take‑home Pay</h2>
          <p>{t(lang, 'tax')}: Net after tax and social contributions.</p>
          <Link className="button" href={`/${lang}/${country}/takehome`} style={{display:'inline-block', marginTop: 8}}>{t(lang, 'explore')}</Link>
        </div>
        <div className="card">
          <h2>VAT / GST</h2>
          <p>Compute VAT from net or gross and payable VAT.</p>
          <Link className="button" href={`/${lang}/${country}/vat`} style={{display:'inline-block', marginTop: 8}}>{t(lang, 'explore')}</Link>
        </div>
      </div>
    </div>
  );
}

