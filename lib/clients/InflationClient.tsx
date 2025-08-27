"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

function adjustForInflation(amount: number, annualRate: number, years: number) {
  const factor = Math.pow(1 + annualRate, years);
  return amount / factor; // real value in today's terms
}

export default function InflationClient({ lang }: { lang: string }) {
  const [amount, setAmount] = useState<number>(100000);
  const [rate, setRate] = useState<number>(0.03);
  const [years, setYears] = useState<number>(5);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const real = useMemo(() => adjustForInflation(amount, rate, years), [amount, rate, years]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="inf-amount">Future amount</label>
          <input id="inf-amount" className="input" type="number" min={0} value={amount} onChange={(e) => setAmount(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="inf-rate">Inflation</label>
          <input id="inf-rate" className="input" type="number" min={0} step={0.0001} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(rate)} per year</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="inf-years">{t(lang, 'years')}</label>
          <input id="inf-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Real value today:</strong> {nf.format(real)}</div>
      </div>
      <small className="muted">Rule of 72 approximation: years to halve ≈ 72 / (inflation% per year).</small>
    </div>
  );
}

