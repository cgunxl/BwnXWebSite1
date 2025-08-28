"use client";

import { useMemo, useState } from 'react';
import { t } from '@/lib/i18n';
import { COUNTRY_LABELS, FAQ_CONTENT, CountryCode, FaqHowTo } from '@/lib/faqContent';

type Props = {
  lang: string;
  slug: string; // e.g., 'roi', 'car-loan', 'bmi'
  defaultCountry?: CountryCode;
};

function getAvailableCountries(slug: string, preferred?: CountryCode[]): CountryCode[] {
  const map = FAQ_CONTENT[slug] || {};
  const keys = Object.keys(map) as CountryCode[];
  if (!keys.length) return [];
  const order: CountryCode[] = preferred && preferred.length ? preferred : ['GLOBAL','TH','US','UK','IN','EU'];
  const set = new Set<CountryCode>();
  for (const k of order) if ((map as any)[k]) set.add(k);
  for (const k of keys) set.add(k);
  return Array.from(set);
}

export default function FaqHowToClient({ lang, slug, defaultCountry = 'GLOBAL' }: Props) {
  const available = useMemo(() => getAvailableCountries(slug), [slug]);
  const initial = useMemo<CountryCode>(() => {
    if (available.includes(defaultCountry)) return defaultCountry;
    if (available.includes('GLOBAL')) return 'GLOBAL';
    return available[0] as CountryCode;
  }, [available, defaultCountry]);
  const [country, setCountry] = useState<CountryCode>(initial);

  const content = useMemo(() => {
    const map = FAQ_CONTENT[slug] || {};
    const byCountry: FaqHowTo | undefined = (map[country] || map.GLOBAL) as FaqHowTo | undefined;
    return byCountry;
  }, [slug, country]);

  if (!content) {
    return null;
  }

  return (
    <section className="card" style={{ marginTop: 16 }}>
      {available.length > 1 ? (
        <div className="form-row" style={{ alignItems: 'center', marginBottom: 8 }}>
          <div>
            <label className="label" htmlFor={`country-${slug}`}>{t(lang, 'selectCountry')}</label>
            <select id={`country-${slug}`} className="input" value={country} onChange={(e) => setCountry(e.target.value as CountryCode)}>
              {available.map((c) => (
                <option key={c} value={c}>{COUNTRY_LABELS[c]}</option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      {content.useCases?.length ? (
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ marginBottom: 8 }}>{t(lang, 'useCases')}</h2>
          <ul className="ul">
            {content.useCases.map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {content.howTo?.length ? (
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ marginBottom: 8 }}>{t(lang, 'howToUse')}</h2>
          <ol className="ol">
            {content.howTo.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </div>
      ) : null}

      {content.faqs?.length ? (
        <div style={{ marginBottom: 12 }}>
          <h2 style={{ marginBottom: 8 }}>{t(lang, 'faq')}</h2>
          <div className="faq">
            {content.faqs.map((qa, i) => (
              <details key={i} className="accordion">
                <summary><strong>{qa.question}</strong></summary>
                <div style={{ paddingTop: 8 }}>{qa.answer}</div>
              </details>
            ))}
          </div>
        </div>
      ) : null}

      {content.references?.length ? (
        <div>
          <h2 style={{ marginBottom: 8 }}>{t(lang, 'sources')}</h2>
          <ol>
            {content.references.map((r, i) => (
              <li key={i}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.label}</a></li>
            ))}
          </ol>
        </div>
      ) : null}
    </section>
  );
}

