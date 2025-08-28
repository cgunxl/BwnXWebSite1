"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

function requiredContribution(
  target: number,
  principal: number,
  annualRate: number,
  years: number,
  frequency: number = 12
) {
  const r = annualRate / frequency;
  const n = Math.round(years * frequency);
  const pvGrowth = principal * Math.pow(1 + r, n);
  const needed = Math.max(0, target - pvGrowth);
  if (r === 0) return needed / n;
  return needed * r / (Math.pow(1 + r, n) - 1);
}

export default function SavingsGoalClient({ lang }: { lang: string }) {
  const [target, setTarget] = useState<number>(500000);
  const [principal, setPrincipal] = useState<number>(20000);
  const [rate, setRate] = useState<number>(0.05);
  const [years, setYears] = useState<number>(8);
  const [freq, setFreq] = useState<number>(12);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const contrib = useMemo(() => requiredContribution(target, principal, rate, years, freq), [target, principal, rate, years, freq]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="sg-target">Goal amount</label>
          <input id="sg-target" className="input" type="number" min={0} value={target} onChange={(e) => setTarget(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="sg-principal">{t(lang, 'principal')}</label>
          <input id="sg-principal" className="input" type="number" min={0} value={principal} onChange={(e) => setPrincipal(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="sg-rate">APR</label>
          <input id="sg-rate" className="input" type="number" min={0} step={0.0001} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(rate)}</small>
        </div>
        <div>
          <label className="label" htmlFor="sg-years">{t(lang, 'years')}</label>
          <input id="sg-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="sg-freq">Contributions per year</label>
          <select id="sg-freq" className="input" value={freq} onChange={(e) => setFreq(Number(e.target.value))}>
            <option value={1}>Annual (1)</option>
            <option value={4}>Quarterly (4)</option>
            <option value={12}>Monthly (12)</option>
            <option value={26}>Biweekly (26)</option>
          </select>
        </div>
      </div>
      <div className="result">
        <div><strong>Required contribution:</strong> {nf.format(contrib)} per period</div>
      </div>
      <small className="muted">Solves PMT from FV annuity formula.</small>
    </div>
  );
}

