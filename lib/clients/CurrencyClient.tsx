"use client";

import { useEffect, useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';

type RatesResponse = {
  base: string;
  rates: Record<string, number>;
  date?: string;
};

const DEFAULTS = ['USD','EUR','THB','JPY','GBP','AUD','CAD','CNY','KRW','INR','IDR','VND'];

export default function CurrencyClient({ lang }: { lang: string }) {
  const [base, setBase] = useState<string>(getCurrencyForLang(lang));
  const [target, setTarget] = useState<string>('USD');
  const [amount, setAmount] = useState<number>(100);
  const [rates, setRates] = useState<RatesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchRates() {
      setLoading(true);
      setError(null);
      try {
        // Use ECB public JSON via exchangerate.host (no key, uses ECB reference rates)
        const res = await fetch(`https://api.exchangerate.host/latest?base=${encodeURIComponent(base)}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setRates({ base: data.base, rates: data.rates, date: data.date });
      } catch (e: any) {
        if (!cancelled) setError(e?.message || 'Failed to load rates');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchRates();
    return () => { cancelled = true; };
  }, [base]);

  const converted = useMemo(() => {
    if (!rates) return 0;
    const r = rates.rates[target];
    if (!r) return 0;
    return Math.max(0, amount) * r;
  }, [rates, target, amount]);

  const currencies = useMemo(() => {
    const keys = rates ? Object.keys(rates.rates) : DEFAULTS;
    const set = Array.from(new Set([base, ...keys, ...DEFAULTS]));
    return set.sort();
  }, [rates, base]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cur-base">From</label>
          <select id="cur-base" className="input" value={base} onChange={(e) => setBase(e.target.value)}>
            {currencies.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="cur-target">To</label>
          <select id="cur-target" className="input" value={target} onChange={(e) => setTarget(e.target.value)}>
            {currencies.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cur-amount">Amount</label>
          <input id="cur-amount" className="input" type="number" min={0} value={amount} onChange={(e) => setAmount(Number(e.target.value || 0))} />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}}>
          <button className="button" type="button" disabled>{t(lang, 'results')}</button>
        </div>
      </div>
      {error && <div className="card" style={{ background: '#fee2e2', borderColor: '#fecaca' }}>{error}</div>}
      <div className="result">
        <div><strong>{amount} {base}</strong> ≈ {converted.toLocaleString(lang, { maximumFractionDigits: 4 })} <strong>{target}</strong></div>
        {rates?.date && <small className="muted">Rates date: {rates.date} (from ECB via exchangerate.host)</small>}
      </div>
    </div>
  );
}

