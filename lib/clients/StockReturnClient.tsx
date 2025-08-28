"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';
import { t, getCurrencyForLang } from '@/lib/i18n';

export default function StockReturnClient({ lang }: { lang: string }) {
  const [buy, setBuy] = useState<number>(100);
  const [sell, setSell] = useState<number>(130);
  const [shares, setShares] = useState<number>(100);
  const [div, setDiv] = useState<number>(0); // total dividends per share

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const cost = buy * shares;
  const proceeds = (sell + div) * shares;
  const profit = proceeds - cost;
  const roi = profit / Math.max(1, cost);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="sr-buy">Buy price</label>
          <input id="sr-buy" className="input" type="number" min={0} value={buy} onChange={(e) => setBuy(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="sr-sell">Sell price</label>
          <input id="sr-sell" className="input" type="number" min={0} value={sell} onChange={(e) => setSell(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="sr-shares">Shares</label>
          <input id="sr-shares" className="input" type="number" min={0} step={1} value={shares} onChange={(e) => setShares(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="sr-div">Dividends per share</label>
          <input id="sr-div" className="input" type="number" min={0} step={0.01} value={div} onChange={(e) => setDiv(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Cost:</strong> {nf.format(cost)}</div>
        <div><strong>Proceeds:</strong> {nf.format(proceeds)}</div>
        <div><strong>Profit:</strong> {nf.format(profit)}</div>
        <div><strong>ROI:</strong> {pf.format(roi)}</div>
      </div>
      <small className="muted">Excludes commissions, taxes, and FX effects.</small>
    </div>
  );
}

