"use client";

import { useMemo, useState } from 'react';
import { t } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function Rule72Client({ lang }: { lang: string }) {
  const [mode, setMode] = useState<'years'|'rate'>('years');
  const [input, setInput] = useState<number>(8); // 8% APR default or 9 years

  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const result = useMemo(() => {
    const x = Math.max(0.000001, input);
    if (mode === 'years') {
      // years to double ≈ 72 / (rate% per year)
      return 72 / (x);
    }
    // required rate % ≈ 72 / years
    return 72 / x;
  }, [mode, input]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="r72-mode">Mode</label>
          <select id="r72-mode" className="input" value={mode} onChange={(e) => setMode(e.target.value as any)}>
            <option value="years">Years to double (given rate %)</option>
            <option value="rate">Required rate % (given years)</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="r72-input">{mode === 'years' ? 'Rate (% per year)' : 'Years'}</label>
          <input id="r72-input" className="input" type="number" min={0.000001} step={0.01} value={input} onChange={(e) => setInput(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        {mode === 'years' ? (
          <div><strong>Years to double:</strong> {new Intl.NumberFormat(lang, { maximumFractionDigits: 2 }).format(result)}</div>
        ) : (
          <div><strong>Required rate:</strong> {pf.format(result / 100)}</div>
        )}
      </div>
      <small className="muted">Heuristic: 72 ÷ rate% ≈ years to double. Accuracy varies by rate.</small>
    </div>
  );
}

