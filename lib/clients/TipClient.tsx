"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function TipClient({ lang }: { lang: string }) {
  const [bill, setBill] = useState<number>(1000);
  const [rate, setRate] = useState<number>(0.10);
  const [people, setPeople] = useState<number>(1);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const tip = bill * rate;
  const total = bill + tip;
  const perPerson = total / Math.max(1, Math.round(people));

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="tip-bill">Bill</label>
          <input id="tip-bill" className="input" type="number" min={0} value={bill} onChange={(e) => setBill(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="tip-rate">Tip rate</label>
          <input id="tip-rate" className="input" type="number" min={0} step={0.001} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(rate)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="tip-people">People</label>
          <input id="tip-people" className="input" type="number" min={1} step={1} value={people} onChange={(e) => setPeople(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Tip:</strong> {nf.format(tip)}</div>
        <div><strong>Total:</strong> {nf.format(total)}</div>
        <div><strong>Per person:</strong> {nf.format(perPerson)}</div>
      </div>
    </div>
  );
}

