import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import VatClient from '@/lib/clients/VatClient';
import { getDefaultCountryForLang } from '@/lib/countries';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/vat`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/vat`])
  );
  languages['x-default'] = `${origin}${basePath}/en/vat`;
  return {
    title: `${t(lang, 'vatCalc')} – ${year}`,
    description: `${t(lang, 'vatCalc')} to add or extract VAT and compute payable VAT.`,
    alternates: { canonical: url, languages }
  };
}

export default function VatPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const country = getDefaultCountryForLang(lang);

  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'vatCalc')}</h1>
      <p className="muted">This tool helps calculate VAT from net or gross amounts, and net VAT payable for businesses.</p>

      <VatClient lang={lang} country={country} />

      <FaqHowToClient lang={lang} slug="vat" />

      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/loan`}>{t(lang, 'navLoan')}</Link>
        <Link className="button ghost" href={`/${lang}/mortgage`}>{t(lang, 'navMortgage')}</Link>
        <Link className="button ghost" href={`/${lang}/tax`}>{t(lang, 'navTax')}</Link>
      </nav>
    </div>
  );
}

