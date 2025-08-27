"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

function sipFutureValue(monthly: number, annualRate: number, years: number) {
  const r = annualRate / 12;
  const n = Math.round(years * 12);
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

export default function SipClient({ lang }: { lang: string }) {
  const [monthly, setMonthly] = useState<number>(10000);
  const [rate, setRate] = useState<number>(0.12);
  const [years, setYears] = useState<number>(10);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const fv = useMemo(() => sipFutureValue(monthly, rate, years), [monthly, rate, years]);
  const invested = monthly * Math.round(years * 12);
  const gain = fv - invested;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="sip-monthly">Monthly investment</label>
          <input id="sip-monthly" className="input" type="number" min={0} step={1} value={monthly} onChange={(e) => setMonthly(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="sip-rate">Expected return (p.a.)</label>
          <input id="sip-rate" className="input" type="number" min={0} step={0.0001} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(rate)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="sip-years">Years</label>
          <input id="sip-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Future value:</strong> {nf.format(fv)}</div>
        <div><strong>Total invested:</strong> {nf.format(invested)}</div>
        <div><strong>Wealth gain:</strong> {nf.format(gain)}</div>
      </div>
      <small className="muted">Uses standard SIP FV formula with monthly compounding.</small>
    </div>
  );
}

