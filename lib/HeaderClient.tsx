"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { SUPPORTED_LANGS, t, isRtlLang, getNativeName } from './i18n';
import { getLangFromPath, replaceLang, getCountryFromPath, replaceCountry } from './path';
import { SUPPORTED_COUNTRIES } from './countries';

export default function HeaderClient() {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const currentLang = useMemo(() => getLangFromPath(pathname), [pathname]);
  const currentCountry = useMemo(() => getCountryFromPath(pathname) || 'th', [pathname]);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('fh-theme');
    const preferDark = stored ? stored === 'dark' : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(preferDark);
    document.body.classList.toggle('theme-dark', preferDark);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.toggle('theme-dark', isDark);
    localStorage.setItem('fh-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRtlLang(currentLang) ? 'rtl' : 'ltr';
  }, [currentLang]);

  return (
    <header>
      <div className="container header-inner">
        <div className="brand">
          <span aria-hidden>💹</span>
          <Link href={`/${currentLang}`} style={{ textDecoration: 'none', color: 'inherit' }}>{t(currentLang, 'siteTitle')}</Link>
        </div>
        <nav className="nav" aria-label="Primary">
          <Link href={`/${currentLang}/loan`}>{t(currentLang, 'navLoan')}</Link>
          <Link href={`/${currentLang}/mortgage`}>{t(currentLang, 'navMortgage')}</Link>
          <Link href={`/${currentLang}/tax`}>{t(currentLang, 'navTax')}</Link>
          <Link href={`/${currentLang}/insurance`}>{t(currentLang, 'navInsurance')}</Link>
        </nav>
        <div className="controls">
          <label className="select" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="sr-only">{t(currentLang, 'language')}</span>
            <select
              aria-label={t(currentLang, 'language')}
              value={currentLang}
              onChange={(e) => router.push(replaceLang(pathname, e.target.value) as any)}
              style={{ background: 'transparent', border: 'none', outline: 'none' }}
            >
              {SUPPORTED_LANGS.map((lc) => (
                <option key={lc} value={lc}>{getNativeName(lc)}</option>
              ))}
            </select>
          </label>
          <label className="select" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="sr-only">Country</span>
            <select
              aria-label="Country"
              value={currentCountry}
              onChange={(e) => router.push(replaceCountry(pathname, e.target.value) as any)}
              style={{ background: 'transparent', border: 'none', outline: 'none' }}
            >
              {SUPPORTED_COUNTRIES.map((cc) => (
                <option key={cc} value={cc}>{cc.toUpperCase()}</option>
              ))}
            </select>
          </label>
          <button
            className="button ghost"
            aria-label={t(currentLang, 'theme')}
            onClick={() => setIsDark((v) => !v)}
            title={isDark ? t(currentLang, 'light') : t(currentLang, 'dark')}
          >
            {isDark ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
}