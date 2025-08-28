"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function MarkupClient({ lang }: { lang: string }) {
  const [cost, setCost] = useState<number>(100);
  const [markupRate, setMarkupRate] = useState<number>(0.25);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const price = Math.max(0, cost) * (1 + Math.max(0, markupRate));
  const margin = price > 0 ? (price - cost) / price : 0;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="mk-cost">Cost</label>
          <input id="mk-cost" className="input" type="number" min={0} value={cost} onChange={(e) => setCost(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="mk-rate">Markup</label>
          <input id="mk-rate" className="input" type="number" min={0} step={0.001} value={markupRate} onChange={(e) => setMarkupRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(markupRate)}</small>
        </div>
      </div>
      <div className="result">
        <div><strong>Price:</strong> {nf.format(price)}</div>
        <div><strong>Implied margin:</strong> {pf.format(margin)}</div>
      </div>
      <small className="muted">Markup based on cost; margin is profit/revenue.</small>
    </div>
  );
}

