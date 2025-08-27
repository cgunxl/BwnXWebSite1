"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function DividendClient({ lang }: { lang: string }) {
  const [shares, setShares] = useState<number>(1000);
  const [divPerShare, setDivPerShare] = useState<number>(1.25);
  const [price, setPrice] = useState<number>(30);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const total = shares * divPerShare;
  const yieldRate = price > 0 ? divPerShare / price : 0;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="dv-shares">Shares</label>
          <input id="dv-shares" className="input" type="number" min={0} step={1} value={shares} onChange={(e) => setShares(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="dv-dps">Dividend per share (annual)</label>
          <input id="dv-dps" className="input" type="number" min={0} step={0.01} value={divPerShare} onChange={(e) => setDivPerShare(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="dv-price">Share price</label>
          <input id="dv-price" className="input" type="number" min={0} step={0.01} value={price} onChange={(e) => setPrice(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Annual dividend:</strong> {nf.format(total)}</div>
        <div><strong>Dividend yield:</strong> {pf.format(yieldRate)}</div>
      </div>
      <small className="muted">Yield = Dividend per share / Price. Excludes withholding tax.</small>
    </div>
  );
}

