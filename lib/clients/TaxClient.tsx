"use client";

import { useMemo, useState } from 'react';
import { TAX_BRACKETS, calcTax } from '@/lib/calculators';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function TaxClient({ lang }: { lang: string }) {
  const [income, setIncome] = useState<number>(120000);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const result = useMemo(() => calcTax(income), [income]);

  return (
    <div className="card" style={{marginTop: 12}}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="tax-income">{t(lang, 'income')}</label>
          <input id="tax-income" className="input" type="number" min={0} value={income} onChange={(e) => setIncome(toNumberSafe(e.target.value, 0))} />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}} aria-hidden>
          <button className="button" type="button" disabled>{t(lang, 'results')}</button>
        </div>
      </div>
      <div className="result">
        <div><strong>{t(lang, 'totalTax')}:</strong> {nf.format(result.tax || 0)}</div>
        <div><strong>{t(lang, 'effectiveTaxRate')}:</strong> {pf.format(result.effectiveRate || 0)}</div>
      </div>
      <small className="muted" style={{display:'block', marginTop: 8}}>Brackets: {TAX_BRACKETS.map((b, i) => `${i === 0 ? 0 : TAX_BRACKETS[i-1].limit}–${b.limit === Number.POSITIVE_INFINITY ? '∞' : b.limit} @ ${(b.rate*100).toFixed(0)}%`).join('; ')}</small>
    </div>
  );
}