"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function LtvClient({ lang }: { lang: string }) {
  const [propertyValue, setPropertyValue] = useState<string>('3000000');
  const [loanAmount, setLoanAmount] = useState<string>('2400000');

  const { ltvPct, equityPct } = useMemo(() => {
    const v = Math.max(0, toNumberSafe(propertyValue, 0));
    const l = Math.max(0, toNumberSafe(loanAmount, 0));
    if (v <= 0) return { ltvPct: NaN, equityPct: NaN };
    const ltv = (l / v) * 100;
    const eq = 100 - ltv;
    return { ltvPct: ltv, equityPct: eq };
  }, [propertyValue, loanAmount]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Property Value</label>
          <input className="input" type="number" min={0} value={propertyValue} onChange={(e)=>setPropertyValue(e.target.value)} />
        </div>
        <div>
          <label className="label">Loan Amount</label>
          <input className="input" type="number" min={0} value={loanAmount} onChange={(e)=>setLoanAmount(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>LTV:</strong> {Number.isFinite(ltvPct) ? `${ltvPct.toFixed(2)}%` : ''}</div>
        <div><strong>Equity:</strong> {Number.isFinite(equityPct) ? `${equityPct.toFixed(2)}%` : ''}</div>
      </div>
    </div>
  );
}

