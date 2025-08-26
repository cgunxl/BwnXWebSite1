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
  const url = `${origin}${basePath}/${lang}/terms`;
  const languages = Object.fromEntries(getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/terms`]));
  return {
    title: `${t(lang, 'terms')} – ${year}`,
    description: `${t(lang, 'terms')} of use for Finance Hub.`,
    alternates: { canonical: url, languages }
  };
}

export default function TermsPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'terms')}</h1>
      <p className="muted">Content is informational only and not professional advice.</p>
      <section className="card" style={{marginTop: 16}}>
        <h2>Use of Service</h2>
        <p>By using this site, you agree not to rely on calculators as professional financial, tax, or insurance advice.</p>
        <h2 style={{marginTop: 12}}>Liability</h2>
        <p>We provide the site &quot;as is&quot; without warranties; we are not liable for any damages resulting from its use.</p>
      </section>
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/privacy`}>{t(lang, 'privacy')}</Link>
        <Link className="button ghost" href={`/${lang}/contact`}>{t(lang, 'contact')}</Link>
      </nav>
    </div>
  );
}