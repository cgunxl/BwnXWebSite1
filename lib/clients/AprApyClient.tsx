"use client";

import { useMemo, useState } from 'react';
import { t } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

function aprToApy(apr: number, n: number): number {
  if (n <= 0) return apr;
  return Math.pow(1 + apr / n, n) - 1;
}

function apyToApr(apy: number, n: number): number {
  if (n <= 0) return apy;
  return n * (Math.pow(1 + apy, 1 / n) - 1);
}

export default function AprApyClient({ lang }: { lang: string }) {
  const [mode, setMode] = useState<'apr2apy'|'apy2apr'>('apr2apy');
  const [rate, setRate] = useState<number>(0.10);
  const [freq, setFreq] = useState<number>(12);

  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 6 }), [lang]);

  const output = useMemo(() => {
    const r = Math.max(0, rate);
    const n = Math.max(1, Math.round(freq));
    return mode === 'apr2apy' ? aprToApy(r, n) : apyToApr(r, n);
  }, [mode, rate, freq]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="apr-mode">Mode</label>
          <select id="apr-mode" className="input" value={mode} onChange={(e) => setMode(e.target.value as any)}>
            <option value="apr2apy">APR → APY</option>
            <option value="apy2apr">APY → APR</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="apr-rate">{mode === 'apr2apy' ? 'APR' : 'APY'}</label>
          <input id="apr-rate" className="input" type="number" min={0} step={0.000001} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(rate)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="apr-freq">Compounds per year</label>
          <select id="apr-freq" className="input" value={freq} onChange={(e) => setFreq(Number(e.target.value))}>
            <option value={1}>Annual (1)</option>
            <option value={2}>Semiannual (2)</option>
            <option value={4}>Quarterly (4)</option>
            <option value={12}>Monthly (12)</option>
            <option value={365}>Daily (365)</option>
          </select>
        </div>
      </div>
      <div className="result">
        <div><strong>{mode === 'apr2apy' ? 'APY' : 'APR'}:</strong> {pf.format(output)}</div>
      </div>
      <small className="muted">{mode === 'apr2apy' ? 'APY = (1 + APR/m)^(m) − 1' : 'APR = m × ((1+APY)^(1/m) − 1)'}</small>
    </div>
  );
}

