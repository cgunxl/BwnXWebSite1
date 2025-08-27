import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import CurrencyClient from '@/lib/clients/CurrencyClient';

export const revalidate = 3600; // rates change more often

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/currency`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/currency`])
  );
  languages['x-default'] = `${origin}${basePath}/en/currency`;
  return {
    title: `${t(lang, 'currencyConverter')} – ${year}`,
    description: `${t(lang, 'currencyConverter')} using ECB reference rates via exchangerate.host.`,
    alternates: { canonical: url, languages }
  };
}

export default function CurrencyPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'currencyConverter')}</h1>
      <p className="muted">Powered by ECB reference rates via exchangerate.host.</p>
      <CurrencyClient lang={lang} />
      <section className="card" style={{marginTop: 16}}>
        <h2>{t(lang, 'sources')}</h2>
        <ol>
          <li>[1] ECB reference rates: [oai_citation:10‡ecb.europa.eu](https://www.ecb.europa.eu/stats/eurofxref)</li>
          <li>[2] exchangerate.host free API: [oai_citation:11‡exchangerate.host](https://exchangerate.host/)</li>
        </ol>
      </section>
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/loan`}>{t(lang, 'navLoan')}</Link>
        <Link className="button ghost" href={`/${lang}/tax`}>{t(lang, 'navTax')}</Link>
      </nav>
    </div>
  );
}

