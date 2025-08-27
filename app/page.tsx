import Link from 'next/link';
import { getAllLocales, getNativeName, isRtlLang } from '@/lib/i18n';

export const revalidate = 86400;

export default function Page() {
  const languages = getAllLocales();
  return (
    <div className="page-enter page-enter-active">
      <h1 style={{ marginBottom: 6 }}>Choose your language</h1>
      <p className="muted" style={{ marginTop: 0 }}>Select a language to explore calculators.</p>
      <div className="lang-grid" style={{ marginTop: 16 }}>
        {languages.map((lc, idx) => (
          <Link
            key={lc}
            href={`/${lc}`}
            className="card lang-card"
            style={{ animationDelay: `${idx * 40}ms` }}
            aria-label={getNativeName(lc)}
            dir={isRtlLang(lc) ? 'rtl' : 'ltr'}
          >
            <span className="lang-name">{getNativeName(lc)}</span>
            <span className="lang-code">{lc}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

