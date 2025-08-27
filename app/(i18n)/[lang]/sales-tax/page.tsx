import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import VatClient from '@/lib/clients/VatClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/sales-tax`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/sales-tax`])
  );
  languages['x-default'] = `${origin}${basePath}/en/sales-tax`;
  return {
    title: `Sales Tax Calculator – ${year}`,
    description: `Add or remove sales tax from a price and compute payable tax.`,
    alternates: { canonical: url, languages }
  };
}

export default function SalesTaxPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Sales Tax Calculator</h1>
      <VatClient lang={lang} />
      <section className="card" style={{marginTop: 16}}>
        <h2>{t(lang, 'sources')}</h2>
        <ol>
          <li>[1] Sales tax/VAT/GST rates vary by jurisdiction; consult official resources.</li>
        </ol>
      </section>
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/vat`}>{t(lang, 'vatCalc')}</Link>
      </nav>
    </div>
  );
}

