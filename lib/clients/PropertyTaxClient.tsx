"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function PropertyTaxClient({ lang }: { lang: string }) {
  const [assessed, setAssessed] = useState<number>(3000000);
  const [exemption, setExemption] = useState<number>(50000);
  const [rate, setRate] = useState<number>(0.012); // 1.2% annual

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 3 }), [lang]);

  const taxable = Math.max(0, assessed - Math.max(0, exemption));
  const annual = taxable * Math.max(0, rate);
  const monthly = annual / 12;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="pt-assessed">Assessed value</label>
          <input id="pt-assessed" className="input" type="number" min={0} value={assessed} onChange={(e) => setAssessed(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="pt-exempt">Exemption</label>
          <input id="pt-exempt" className="input" type="number" min={0} value={exemption} onChange={(e) => setExemption(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="pt-rate">Tax rate</label>
          <input id="pt-rate" className="input" type="number" min={0} step={0.0001} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(rate)} per year</small>
        </div>
      </div>
      <div className="result">
        <div><strong>Taxable value:</strong> {nf.format(taxable)}</div>
        <div><strong>Annual tax:</strong> {nf.format(annual)}</div>
        <div><strong>Monthly:</strong> {nf.format(monthly)}</div>
      </div>
      <small className="muted">Local millage rates and exemptions vary by jurisdiction.</small>
    </div>
  );
}

