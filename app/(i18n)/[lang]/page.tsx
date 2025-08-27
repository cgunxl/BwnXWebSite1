import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}`])
  );
  languages['x-default'] = `${origin}${basePath}/en`;
  return {
    title: `${t(lang, 'siteTitle')} – ${year}`,
    description: t(lang, 'hubIntro'),
    alternates: { canonical: url, languages }
  };
}

export default function HubPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1 style={{marginBottom: 6}}>{t(lang, 'siteTitle')}</h1>
      <p className="muted" style={{marginTop: 0}}>{t(lang, 'hubIntro')}</p>

      <div className="card-grid" style={{marginTop: 16}}>
        <div className="card">
          <h2>{t(lang, 'loanCalc')}</h2>
          <p>{t(lang, 'loan')}: Estimate monthly payment and interest for an amortizing loan.</p>
          <Link className="button" href={`/${lang}/loan`} style={{display:'inline-block', marginTop: 8}}>{t(lang, 'explore')}</Link>
        </div>
        <div className="card">
          <h2>{t(lang, 'mortgageCalc')}</h2>
          <p>{t(lang, 'mortgage')}: Model payments and include optional closing costs.</p>
          <Link className="button" href={`/${lang}/mortgage`} style={{display:'inline-block', marginTop: 8}}>{t(lang, 'explore')}</Link>
        </div>
        <div className="card">
          <h2>{t(lang, 'taxCalc')}</h2>
          <p>{t(lang, 'tax')}: Progressive tax estimate with total tax and effective rate.</p>
          <Link className="button" href={`/${lang}/tax`} style={{display:'inline-block', marginTop: 8}}>{t(lang, 'explore')}</Link>
        </div>
        <div className="card">
          <h2>{t(lang, 'insuranceCalc')}</h2>
          <p>{t(lang, 'insurance')}: Estimate annual premium from insured amount and rate.</p>
          <Link className="button" href={`/${lang}/insurance`} style={{display:'inline-block', marginTop: 8}}>{t(lang, 'explore')}</Link>
        </div>
      </div>
    </div>
  );
}

