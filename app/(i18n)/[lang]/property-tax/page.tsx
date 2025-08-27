import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import PropertyTaxClient from '@/lib/clients/PropertyTaxClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/property-tax`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/property-tax`])
  );
  languages['x-default'] = `${origin}${basePath}/en/property-tax`;
  return {
    title: `Property Tax Calculator – ${year}`,
    description: `Estimate property tax from assessed value, exemption and rate.`,
    alternates: { canonical: url, languages }
  };
}

export default function PropertyTaxPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Property Tax Calculator</h1>
      <PropertyTaxClient lang={lang} />
      <section className="card" style={{marginTop: 16}}>
        <h2>{t(lang, 'sources')}</h2>
        <ol>
          <li>[1] Local property tax rates and exemptions vary; consult municipal resources.</li>
        </ol>
      </section>
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/mortgage`}>{t(lang, 'mortgageCalc')}</Link>
      </nav>
    </div>
  );
}

