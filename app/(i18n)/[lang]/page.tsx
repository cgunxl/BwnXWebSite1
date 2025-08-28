import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllLocales, t } from '@/lib/i18n';
import { getAllCountries } from '@/lib/countries';
import { REGISTRY } from '@/lib/registry';
import { useState } from 'react';

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
  const recommended = REGISTRY.slice(0, 30);
  const [modal, setModal] = useState<{ title: string; content: string } | null>(null) as any;
  return (
    <div className="page-enter page-enter-active">
      <h1 style={{marginBottom: 6}}>{t(lang, 'siteTitle')}</h1>
      <p className="muted" style={{marginTop: 0}}>{t(lang, 'hubIntro')}</p>

      <div className="card-grid" style={{marginTop: 16}}>
        {recommended.map((r, idx) => (
          <div key={r.id} className="card" style={{ animationDelay: `${idx*20}ms` }}>
            <h2>{t(lang, r.titleKey)}</h2>
            <p className="muted" style={{marginTop: 4}}>{r.description}</p>
            <div style={{ display:'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
              <Link className="button" href={r.path(lang) as any}>{t(lang, 'explore')}</Link>
              <button className="button ghost" onClick={() => setModal({ title: t(lang, r.titleKey), content: `${t(lang, 'howToUse')}: ${r.keywords.slice(0,3).join(', ')}` })}>How to</button>
            </div>
          </div>
        ))}
      </div>

      {modal ? (
        <div role="dialog" aria-modal="true" className="modal" onClick={() => setModal(null as any)}>
          <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>{modal.title}</h3>
            <p>{modal.content}</p>
            <button className="button" onClick={() => setModal(null as any)}>Close</button>
          </div>
        </div>
      ) : null}

      <section className="card" style={{marginTop: 16}}>
        <h2>Browse by country</h2>
        <div className="lang-grid" style={{ marginTop: 8 }}>
          {getAllCountries().map((cc) => (
            <Link key={cc} href={`/${lang}/${cc}`} className="card lang-card">
              <span className="lang-name">{cc.toUpperCase()}</span>
              <span className="lang-code">{cc}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

