import Link from 'next/link';
import type { Metadata } from 'next';
import { SUPPORTED_LANGS, t } from '../../../lib/i18n';

export const revalidate = 86400;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  return {
    title: `${t(lang,'siteName')} – ${new Date().getFullYear()}`,
    description: t(lang,'hubIntro')
  };
}

export default function HubPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  const base = `/${lang}`;
  return (
    <section className="grid fade-in">
      <div className="card">
        <h1 className="title">{t(lang,'siteName')}</h1>
        <p className="muted">{t(lang,'hubIntro')}</p>
      </div>

      <div className="card half">
        <h2 className="title">{t(lang,'loanCalc')}</h2>
        <p className="muted">{t(lang,'loanDesc')}</p>
        <Link className="btn" href={`${base}/loan`}>{t(lang,'explore')}</Link>
      </div>

      <div className="card half">
        <h2 className="title">{t(lang,'mortgageCalc')}</h2>
        <p className="muted">{t(lang,'mortgageDesc')}</p>
        <Link className="btn" href={`${base}/mortgage`}>{t(lang,'explore')}</Link>
      </div>

      <div className="card half">
        <h2 className="title">{t(lang,'taxCalc')}</h2>
        <p className="muted">{t(lang,'taxDesc')}</p>
        <Link className="btn" href={`${base}/tax`}>{t(lang,'explore')}</Link>
      </div>

      <div className="card half">
        <h2 className="title">{t(lang,'insuranceCalc')}</h2>
        <p className="muted">{t(lang,'insuranceDesc')}</p>
        <Link className="btn" href={`${base}/insurance`}>{t(lang,'explore')}</Link>
      </div>
    </section>
  );
}

