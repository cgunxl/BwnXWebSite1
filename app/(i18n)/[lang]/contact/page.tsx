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
  const url = `${origin}${basePath}/${lang}/contact`;
  const languages: Record<string, string> = Object.fromEntries(
    getAllLocales().map((lc) => [lc, `${origin}${basePath}/${lc}/contact`])
  );
  languages['x-default'] = `${origin}${basePath}/en/contact`;
  return {
    title: `${t(lang, 'contact')} – ${year}`,
    description: `${t(lang, 'contact')} information for Finance Hub.`,
    alternates: { canonical: url, languages }
  };
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  const { lang } = params;

  return (
    <div className="page-enter page-enter-active">
      <h1>{t(lang, 'contact')}</h1>
      <p className="muted">For feedback or inquiries, please open an issue on our repository.</p>
      <section className="card" style={{marginTop: 16}}>
        <h2>Contact Options</h2>
        <ul>
          <li>GitHub Issues</li>
          <li>Email (optional; add when available)</li>
        </ul>
      </section>
      <nav className="footer-nav">
        <Link className="button ghost" href={`/${lang}/privacy`}>{t(lang, 'privacy')}</Link>
        <Link className="button ghost" href={`/${lang}/terms`}>{t(lang, 'terms')}</Link>
      </nav>
    </div>
  );
}