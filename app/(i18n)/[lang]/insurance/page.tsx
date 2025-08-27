import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';
import InsuranceClient from '@/lib/clients/InsuranceClient';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/insurance`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/insurance`])
  );
  languages['x-default'] = `${origin}${basePath}/en/insurance`;
  return {
    title: `${t(lang, 'insuranceCalc')} – ${year}`,
    description: `${t(lang, 'insuranceCalc')} for annual premium estimates.`,
    alternates: { canonical: url, languages }
  };
}

export default function InsurancePage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'insuranceCalc')}</h1>
      <p className="muted">{t(lang, 'insuranceDisclaimer')}</p>

      <InsuranceClient lang={lang} />

      <section className="card" style={{marginTop: 16}}>
        <h2>{t(lang, 'whyMatters')}</h2>
        <p>
          Customers judge insurers by how quickly and transparently claims are settled. Slow handling—often caused by manual reviews, siloed data, and poor fraud triage—creates weeks‑long delays, frustrates policyholders, and erodes trust. When fraud detection is inefficient, genuine customers can be over‑scrutinized while organized fraud slips through, driving up loss ratios. Insurers then spend more on administration and investigations, and those costs can ultimately flow into higher premiums. Industry research highlights that modernizing claims with better triage, straight‑through processing, and analytics can cut cycle times and improve satisfaction; conversely, bottlenecks and opaque decisions damage reputation and retention.<sup>[1]</sup> For small businesses, delayed payouts limit working capital when it is most needed; for households, delays after a car crash or property loss can mean added out‑of‑pocket expenses and credit card debt.<sup>[2]</sup> A quick premium estimate sets expectations about ongoing costs, but the value of a policy also depends on claim service quality.
        </p>
        <h3 style={{marginTop: 12}}>{t(lang, 'sources')}</h3>
        <ol>
          <li>[1] [oai_citation:6‡mckinsey.com](https://www.mckinsey.com/industries/financial-services/our-insights/insurance-claims-2030)</li>
          <li>[2] [oai_citation:7‡deloitte.com](https://www2.deloitte.com/us/en/insights/industry/financial-services/insurance.html)</li>
        </ol>
      </section>

      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/loan`}>{t(lang, 'navLoan')}</Link>
        <Link className="button ghost" href={`/${lang}/mortgage`}>{t(lang, 'navMortgage')}</Link>
        <Link className="button ghost" href={`/${lang}/tax`}>{t(lang, 'navTax')}</Link>
      </nav>
    </div>
  );
}

