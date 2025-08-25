import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LANGS, t } from '../../../../lib/i18n';
import TaxCalculator from '../../../components/TaxCalculator';

export const revalidate = 86400;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: `${t(lang,'taxCalc')} – ${new Date().getFullYear()}`,
    description: t(lang,'taxDesc')
  };
}

export default function TaxPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <section className="fade-in">
      <div className="card">
        <h1 className="title">{t(lang,'taxCalc')}</h1>
        <p className="muted">{t(lang,'taxDesc')}</p>
      </div>

      <TaxCalculator lang={lang} />

      <div className="card">
        <h2 className="title">{t(lang,'whyMatters')}</h2>
        <p>
          Progressive tax systems use multiple brackets, deductions, and credits. For households and small businesses, this complexity creates planning uncertainty and compliance burdens—collecting documents, interpreting rules, and filing accurately takes time. Errors can lead to penalties or audits, while over‑withholding reduces cash flow. A simple estimator helps set expectations by translating annual income into an approximate liability and effective rate. It is not a substitute for professional advice but can guide budgeting, withholding adjustments, or quarterly estimates when circumstances change mid‑year.
        </p>
        <h3 className="title" style={{fontSize:'1.2rem'}}>Sources</h3>
        <p className="muted">General guidance; consult a professional for personalized advice.</p>
      </div>

      <div className="bottom-nav">
        <Link className="nav-link" href={`/${lang}/loan`}>{t(lang,'loan')}</Link>
        <Link className="nav-link" href={`/${lang}/mortgage`}>{t(lang,'mortgage')}</Link>
        <Link className="nav-link" href={`/${lang}/insurance`}>{t(lang,'insurance')}</Link>
      </div>
    </section>
  );
}

