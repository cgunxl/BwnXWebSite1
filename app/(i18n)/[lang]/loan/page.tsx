import type { Metadata } from 'next';
import Link from 'next/link';
import { SUPPORTED_LANGS, t } from '../../../../lib/i18n';
import LoanCalculator from '../../../components/LoanCalculator';

export const revalidate = 86400;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: `${t(lang,'loanCalc')} – ${new Date().getFullYear()}`,
    description: t(lang,'loanDesc')
  };
}

export default function LoanPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <section className="fade-in">
      <div className="card">
        <h1 className="title">{t(lang,'loanCalc')}</h1>
        <p className="muted">{t(lang,'loanDesc')}</p>
      </div>

      <LoanCalculator lang={lang} />

      <div className="card">
        <h2 className="title">{t(lang,'whyMatters')}</h2>
        <p>
          Predatory lending often hides true costs behind opaque terms, add-on products, and complex fee structures, making it difficult for borrowers to compare offers or understand long-term obligations. High interest rates and fees can snowball, turning an emergency cash need into a months-long cycle of debt when payments mostly cover interest and not principal. <sup>[1]</sup> Households facing income volatility, medical bills, or job loss frequently have limited options and accept expensive credit out of necessity, not choice. <sup>[2]</sup> A transparent loan calculator helps reveal the full repayment and interest burden upfront so borrowers can weigh alternatives—such as negotiating payment plans, seeking nonprofit counseling, or building savings buffers—before costs become unmanageable.
        </p>
        <h3 className="title" style={{fontSize:'1.2rem'}}>Sources</h3>
        <p className="muted">
          [1] [oai_citation:1‡civilrights.org](https://civilrights.org/edfund/resource/these-are-the-significant-costs-of-predatory-loans/#:~:text=loans%20from%20responsible%20ones%C2%A0is%20a,an%20endless%20cycle%20of%20debt)
          <br/>
          [2] [oai_citation:2‡pewtrusts.org](https://www.pewtrusts.org/research-and-analysis/issue-briefs/2012/07/19/payday-lending-in-america-who-borrows-where-they-borrow-and-why)
        </p>
      </div>

      <div className="bottom-nav">
        <Link className="nav-link" href={`/${lang}/mortgage`}>{t(lang,'mortgage')}</Link>
        <Link className="nav-link" href={`/${lang}/tax`}>{t(lang,'tax')}</Link>
        <Link className="nav-link" href={`/${lang}/insurance`}>{t(lang,'insurance')}</Link>
      </div>
    </section>
  );
}

