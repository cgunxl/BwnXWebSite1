import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LANGS, t } from '../../../../lib/i18n';
import MortgageCalculator from '../../../components/MortgageCalculator';

export const revalidate = 86400;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: `${t(lang,'mortgageCalc')} – ${new Date().getFullYear()}`,
    description: t(lang,'mortgageDesc')
  };
}

export default function MortgagePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <section className="fade-in">
      <div className="card">
        <h1 className="title">{t(lang,'mortgageCalc')}</h1>
        <p className="muted">{t(lang,'mortgageDesc')}</p>
      </div>

      <MortgageCalculator lang={lang} />

      <div className="card">
        <h2 className="title">{t(lang,'whyMatters')}</h2>
        <p>
          Closing costs cover services from title insurance and appraisals to credit reports and loan origination, and they often catch first-time buyers off guard. Median total loan costs jumped 21.8% from 2021 to 2022 and neared $6,000 in 2022, intensifying affordability pressures when rates were rising. <sup>[1]</sup> Some lenders advertise “no‑closing‑cost” options, but they typically offset the upfront expense by raising the interest rate, which increases the monthly payment and total interest over time. <sup>[2]</sup> Modeling these tradeoffs helps buyers decide whether to pay more now or spread costs over the life of the loan and to budget for ancillary fees like prepaid taxes and insurance.
        </p>
        <h3 className="title" style={{fontSize:'1.2rem'}}>Sources</h3>
        <p className="muted">
          [1] [oai_citation:3‡consumerfinance.gov](https://www.consumerfinance.gov/data-research/research-reports/2018-mortgage-market-activity-and-trends/#:~:text=median%20total%20loan%20costs%20increased%2021.8%20percent%20from%202021%20to%202022%2C%20to%20%246%2C000%20in%202022)
          <br/>
          [2] [oai_citation:4‡nerdwallet.com](https://www.nerdwallet.com/article/mortgages/no-closing-cost-mortgage)
        </p>
      </div>

      <div className="bottom-nav">
        <Link className="nav-link" href={`/${lang}/loan`}>{t(lang,'loan')}</Link>
        <Link className="nav-link" href={`/${lang}/tax`}>{t(lang,'tax')}</Link>
        <Link className="nav-link" href={`/${lang}/insurance`}>{t(lang,'insurance')}</Link>
      </div>
    </section>
  );
}

