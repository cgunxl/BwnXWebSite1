"use client";

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { REGISTRY } from './registry';
import { t } from './i18n';

export default function SearchClient({ lang }: { lang: string }) {
  const [query, setQuery] = useState('');
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as typeof REGISTRY;
    return REGISTRY.filter((r) => {
      const key = t(lang, r.titleKey).toLowerCase();
      return (
        key.includes(q) ||
        r.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }).slice(0, 10);
  }, [query, lang]);

  return (
    <div className="search">
      <input
        type="search"
        className="input"
        placeholder={t(lang, 'searchPlaceholder')}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label={t(lang, 'search')}
      />
      {list.length > 0 && (
        <div className="search-results">
          {list.map((r) => (
            <Link key={r.id} href={r.path(lang) as any} className="search-item">
              {t(lang, r.titleKey)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

