"use client";

import Link from 'next/link';
import { useState } from 'react';
import { t } from '@/lib/i18n';
import { getAllCountries } from '@/lib/countries';
import { REGISTRY } from '@/lib/registry';

export default function LangHubClient({ lang }: { lang: string }) {
  const recommended = REGISTRY.slice(0, 30);
  const [modal, setModal] = useState<{ title: string; content: string } | null>(null);
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
        <div role="dialog" aria-modal="true" className="modal" onClick={() => setModal(null)}>
          <div className="modal-inner" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>{modal.title}</h3>
            <p>{modal.content}</p>
            <button className="button" onClick={() => setModal(null)}>Close</button>
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

