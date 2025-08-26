"use client";

import { useMemo, useState } from 'react';
import { TAX_BRACKETS, calcTax } from '@/lib/calculators';
import { t } from '@/lib/i18n';

export default function TaxClient({ lang }: { lang: string }) {
  const [income, setIncome] = useState<number>(120000);

  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD' }), [lang]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const result = useMemo(() => calcTax(income), [income]);

  return (
    <div className="card" style={{marginTop: 12}}>
      <div className="form-row">
        <div>
          <div className="label">{t(lang, 'income')}</div>
          <input className="input" type="number" min={0} value={income} onChange={(e) => setIncome(parseFloat(e.target.value || '0'))} />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}}>
          <button className="button" type="button">{t(lang, 'calculate')}</button>
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