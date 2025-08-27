"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function FreelancerRateClient({ lang }: { lang: string }) {
  const [desiredMonthly, setDesiredMonthly] = useState<number>(120000);
  const [billableHours, setBillableHours] = useState<number>(80);
  const [taxRate, setTaxRate] = useState<number>(0.15);
  const [overhead, setOverhead] = useState<number>(10000);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const preTaxNeeded = desiredMonthly + overhead;
  const grossNeeded = preTaxNeeded / Math.max(0.000001, 1 - taxRate);
  const hourlyRate = grossNeeded / Math.max(1, billableHours);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="fr-month">Desired net per month</label>
          <input id="fr-month" className="input" type="number" min={0} step={1} value={desiredMonthly} onChange={(e) => setDesiredMonthly(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="fr-bill">Billable hours/month</label>
          <input id="fr-bill" className="input" type="number" min={1} step={1} value={billableHours} onChange={(e) => setBillableHours(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="fr-tax">Effective tax rate</label>
          <input id="fr-tax" className="input" type="number" min={0} step={0.001} value={taxRate} onChange={(e) => setTaxRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(taxRate)}</small>
        </div>
        <div>
          <label className="label" htmlFor="fr-oh">Overhead (monthly)</label>
          <input id="fr-oh" className="input" type="number" min={0} step={1} value={overhead} onChange={(e) => setOverhead(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Target gross/month:</strong> {nf.format(grossNeeded)}</div>
        <div><strong>Suggested hourly rate:</strong> {nf.format(hourlyRate)}</div>
      </div>
      <small className="muted">Includes overhead and an effective tax factor; adjust for benefits and buffer.</small>
    </div>
  );
}

