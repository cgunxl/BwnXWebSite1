'use client';

import { useMemo, useState } from 'react';
import { t } from '../../lib/i18n';
import { calcTax } from '../../lib/calculators';

export default function TaxCalculator({ lang }: { lang: string }) {
  const [income, setIncome] = useState<number>(80000);
  const result = useMemo(() => calcTax(income || 0), [income]);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD' }), [lang]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  return (
    <div className="grid">
      <div className="card half">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label className="label">Income</label>
            <input className="input" type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} min={0} step="1000" />
          </div>
          <p className="muted" style={{marginTop:6}}>{t(lang,'disclaimerTax')}</p>
        </form>
      </div>
      <div className="card half">
        <div className="result">
          <div><strong>{t(lang,'totalTax')}:</strong> {nf.format(result.tax || 0)}</div>
          <div><strong>{t(lang,'effectiveRate')}:</strong> {pf.format(result.effectiveRate || 0)}</div>
        </div>
      </div>
    </div>
  );
}

