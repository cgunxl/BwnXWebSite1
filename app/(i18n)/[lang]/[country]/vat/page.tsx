import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import { getAllCountries } from '@/lib/countries';
import VatClient from '@/lib/clients/VatClient';
import Link from 'next/link';

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
  const url = `${origin}${basePath}/${lang}/${country}/vat`;
  return {
    title: `VAT / GST – ${country.toUpperCase()} – ${year}`,
    description: `Compute VAT from net or gross and VAT payable for ${country.toUpperCase()}.`,
    alternates: { canonical: url }
  };
}

export default function VatCountryPage({ params }: { params: { lang: string, country: string } }) {
  const { lang, country } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>VAT / GST – {country.toUpperCase()}</h1>
      <p className="muted">SME‑friendly VAT calculator.</p>
      <VatClient lang={lang} country={country} />
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/${country}`}>Hub</Link>
      </nav>
    </div>
  );
}

