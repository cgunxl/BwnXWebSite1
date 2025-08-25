'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LangPicker from './LangPicker';
import { t } from '../../lib/i18n';
import { useEffect, useMemo, useState } from 'react';

export default function Header() {
  const [path, setPath] = useState<string>('');
  useEffect(() => { setPath(window.location.pathname); }, []);
  const currentLang = useMemo(() => path.split('/')[1] || 'en', [path]);
  const base = `/${currentLang}`;
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <Link href={base} className="nav-link">{t(currentLang,'siteName')}</Link>
        </div>
        <nav className="nav-links">
          <Link className="nav-link" href={`${base}/loan`}>{t(currentLang,'loan')}</Link>
          <Link className="nav-link" href={`${base}/mortgage`}>{t(currentLang,'mortgage')}</Link>
          <Link className="nav-link" href={`${base}/tax`}>{t(currentLang,'tax')}</Link>
          <Link className="nav-link" href={`${base}/insurance`}>{t(currentLang,'insurance')}</Link>
        </nav>
        <div className="controls">
          <ThemeToggle />
          <LangPicker />
        </div>
      </div>
      <div className="container">
        {/* Ad Slot Top */}
        <div id="ad-top" className="ad-slot"></div>
        {/* TODO: paste your ad script here */}
        {/* Google Analytics */}
        {/* TODO: paste GA4 script here */}
      </div>
    </header>
  );
}

