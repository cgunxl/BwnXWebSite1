"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function categoryFromDti(dti: number): string {
  if (!Number.isFinite(dti)) return '';
  if (dti < 20) return 'Excellent';
  if (dti < 36) return 'Good';
  if (dti < 43) return 'Acceptable';
  if (dti < 50) return 'High';
  return 'Very High';
}

export default function DtiClient({ lang }: { lang: string }) {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState<string>('80000');
  const [totalMonthlyDebts, setTotalMonthlyDebts] = useState<string>('20000');

  const { dtiPct, category } = useMemo(() => {
    const inc = Math.max(0, toNumberSafe(grossMonthlyIncome, 0));
    const debt = Math.max(0, toNumberSafe(totalMonthlyDebts, 0));
    if (inc <= 0) return { dtiPct: NaN, category: '' };
    const dti = (debt / inc) * 100;
    return { dtiPct: dti, category: categoryFromDti(dti) };
  }, [grossMonthlyIncome, totalMonthlyDebts]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Gross Monthly Income</label>
          <input className="input" type="number" min={0} value={grossMonthlyIncome} onChange={(e)=>setGrossMonthlyIncome(e.target.value)} />
        </div>
        <div>
          <label className="label">Total Monthly Debts</label>
          <input className="input" type="number" min={0} value={totalMonthlyDebts} onChange={(e)=>setTotalMonthlyDebts(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>DTI:</strong> {Number.isFinite(dtiPct) ? `${dtiPct.toFixed(2)}%` : ''}</div>
        <div><strong>Category:</strong> {category}</div>
      </div>
    </div>
  );
}

