"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

function futureValue(
  principal: number,
  annualRate: number,
  years: number,
  contribution: number = 0,
  frequency: number = 12
) {
  const r = annualRate / frequency;
  const n = Math.round(years * frequency);
  const growthPrincipal = principal * Math.pow(1 + r, n);
  const growthContrib = contribution > 0 && r > 0
    ? contribution * ((Math.pow(1 + r, n) - 1) / r)
    : contribution * n;
  return growthPrincipal + growthContrib;
}

export default function CompoundClient({ lang }: { lang: string }) {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(0.06);
  const [years, setYears] = useState<number>(10);
  const [monthly, setMonthly] = useState<number>(200);
  const [freq, setFreq] = useState<number>(12);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const fv = useMemo(() => futureValue(principal, rate, years, monthly, freq), [principal, rate, years, monthly, freq]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ci-principal">{t(lang, 'principal')}</label>
          <input id="ci-principal" className="input" type="number" min={0} value={principal} onChange={(e) => setPrincipal(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="ci-rate">APR</label>
          <input id="ci-rate" className="input" type="number" min={0} step={0.0001} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(rate)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ci-years">{t(lang, 'years')}</label>
          <input id="ci-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="ci-monthly">Monthly contribution</label>
          <input id="ci-monthly" className="input" type="number" min={0} step={1} value={monthly} onChange={(e) => setMonthly(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ci-freq">Compounds per year</label>
          <select id="ci-freq" className="input" value={freq} onChange={(e) => setFreq(Number(e.target.value))}>
            <option value={1}>Annual (1)</option>
            <option value={4}>Quarterly (4)</option>
            <option value={12}>Monthly (12)</option>
            <option value={365}>Daily (365)</option>
          </select>
        </div>
      </div>
      <div className="result">
        <div><strong>Future value:</strong> {nf.format(fv)}</div>
      </div>
      <small className="muted">Formula: FV = P(1+r/m)^(m·t) + PMT·(((1+r/m)^(m·t)−1)/ (r/m))</small>
    </div>
  );
}

