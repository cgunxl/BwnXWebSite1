'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SUPPORTED_LANGS, t } from '../../lib/i18n';

export default function LangPicker() {
  const [path, setPath] = useState<string>('');
  useEffect(() => { setPath(window.location.pathname); }, []);
  const currentLang = path.split('/')[1] || 'en';
  const rest = path.split('/').slice(2).join('/') || '';
  return (
    <details className="lang-menu">
      <summary className="nav-link" aria-label={t(currentLang,'language')}>
        🌐 {currentLang}
      </summary>
      <div style={{position:'absolute', marginTop:8, padding:8, background:'var(--card)', border:'1px solid var(--border)', borderRadius:8, boxShadow:'0 4px 12px var(--shadow)', display:'grid', gridTemplateColumns:'repeat(4, auto)', gap:6}}>
        {SUPPORTED_LANGS.map((code) => {
          const href = `/${code}/${rest}`.replace(/\/$/, '');
          return <Link key={code} className="nav-link" href={href || `/${code}`}>{code}</Link>;
        })}
      </div>
    </details>
  );
}

