import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import Link from 'next/link';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllLocales().map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const url = `${origin}${basePath}/${lang}/privacy`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/privacy`])
  );
  languages['x-default'] = `${origin}${basePath}/en/privacy`;
  return {
    title: `${t(lang, 'privacy')} – ${year}`,
    description: `${t(lang, 'privacy')} policy for Finance Hub.`,
    alternates: { canonical: url, languages }
  };
}

export default function PrivacyPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'privacy')}</h1>
      <p className="muted">We respect your privacy. Analytics is optional and anonymized.</p>
      <section className="card" style={{marginTop: 16}}>
        <h2>Data Collection</h2>
        <p>We collect aggregate usage analytics only after consent. No personal data is required to use the calculators.</p>
        <h2 style={{marginTop: 12}}>Cookies</h2>
        <p>Only a theme preference and consent choice cookie/localStorage item may be set.</p>
      </section>
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/terms`}>{t(lang, 'terms')}</Link>
        <Link className="button ghost" href={`/${lang}/contact`}>{t(lang, 'contact')}</Link>
      </nav>
    </div>
  );
}