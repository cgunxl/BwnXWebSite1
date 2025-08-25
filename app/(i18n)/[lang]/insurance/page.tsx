import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LANGS, t } from '../../../../lib/i18n';
import InsuranceEstimator from '../../../components/InsuranceEstimator';

export const revalidate = 86400;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: `${t(lang,'insuranceCalc')} – ${new Date().getFullYear()}`,
    description: t(lang,'insuranceDesc')
  };
}

export default function InsurancePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <section className="fade-in">
      <div className="card">
        <h1 className="title">{t(lang,'insuranceCalc')}</h1>
        <p className="muted">{t(lang,'insuranceDesc')}</p>
      </div>

      <InsuranceEstimator lang={lang} />

      <div className="card">
        <h2 className="title">{t(lang,'whyMatters')}</h2>
        <p>
          Slow claim settlements and inefficient fraud case management create delays, reduce transparency, and erode trust. Policyholders and businesses can face cash‑flow strain while waiting for reimbursement, affecting payroll, repairs, or medical care. For insurers, operational bottlenecks raise administrative costs and damage reputation, which ultimately can lead to higher premiums and customer churn. Improving upstream risk assessment and downstream claims handling shortens cycle times and enhances satisfaction; until then, a quick premium estimate helps set expectations and budget for coverage alongside deductibles and exclusions.
        </p>
        <h3 className="title" style={{fontSize:'1.2rem'}}>Sources</h3>
        <p className="muted">
          [1] [oai_citation:5‡mckinsey.com](https://www.mckinsey.com/industries/financial-services/our-insights/fighting-claims-fraud-a-global-study-on-insurer-efforts-and-results)
        </p>
      </div>

      <div className="bottom-nav">
        <Link className="nav-link" href={`/${lang}/loan`}>{t(lang,'loan')}</Link>
        <Link className="nav-link" href={`/${lang}/mortgage`}>{t(lang,'mortgage')}</Link>
        <Link className="nav-link" href={`/${lang}/tax`}>{t(lang,'tax')}</Link>
      </div>
    </section>
  );
}

