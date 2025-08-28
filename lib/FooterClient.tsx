"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { SUPPORTED_LANGS, t } from '@/lib/i18n';
import { getLangFromPath } from '@/lib/path';

export default function FooterClient() {
  const pathname = usePathname() || '/';
  const currentLang = useMemo(() => getLangFromPath(pathname), [pathname]);

  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 24 }}>
      <div className="container" style={{ padding: '16px 0', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <nav aria-label="Footer">
          <Link className="button ghost" href={`/${currentLang}/privacy`}>{t(currentLang, 'privacy')}</Link>
          <Link className="button ghost" href={`/${currentLang}/terms`}>{t(currentLang, 'terms')}</Link>
          <Link className="button ghost" href={`/${currentLang}/contact`}>{t(currentLang, 'contact')}</Link>
        </nav>
        <small className="muted">© {new Date().getFullYear()} BwnX Free Calculator</small>
      </div>
    </footer>
  );
}