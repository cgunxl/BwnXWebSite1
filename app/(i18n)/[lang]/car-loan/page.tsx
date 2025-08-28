import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import CarLoanClient from '@/lib/clients/CarLoanClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/car-loan`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/car-loan`])
  );
  languages['x-default'] = `${origin}${basePath}/en/car-loan`;
  return {
    title: `Car Loan Calculator – ${year}`,
    description: `Estimate car loan payment including sales tax, fees, and down payment.`,
    alternates: { canonical: url, languages }
  };
}

export default function CarLoanPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Car Loan Calculator</h1>
      <CarLoanClient lang={lang} />
      <section className="card" style={{marginTop: 16}}>
        <h2>{t(lang, 'sources')}</h2>
        <ol>
          <li>[1] APR and sales tax vary by state/country; check official guidance.</li>
        </ol>
      </section>
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/loan`}>{t(lang, 'navLoan')}</Link>
        <Link className="button ghost" href={`/${lang}/vat`}>{t(lang, 'vatCalc')}</Link>
      </nav>
    </div>
  );
}

