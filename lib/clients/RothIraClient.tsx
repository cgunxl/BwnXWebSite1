"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function futureValueMonthly(principal: number, monthly: number, annualReturnPct: number, months: number): number {
  const r = Math.max(0, annualReturnPct) / 100 / 12;
  if (months <= 0) return principal;
  if (r === 0) return principal + monthly * months;
  const g = Math.pow(1 + r, months);
  return principal * g + monthly * ((g - 1) / r);
}

export default function RothIraClient({ lang }: { lang: string }) {
  const [currentBalance, setCurrentBalance] = useState<string>('0');
  const [annualContribution, setAnnualContribution] = useState<string>('6500');
  const [annualReturn, setAnnualReturn] = useState<string>('7');
  const [years, setYears] = useState<string>('30');

  const result = useMemo(() => {
    const bal = Math.max(0, toNumberSafe(currentBalance, 0));
    const ac = Math.max(0, toNumberSafe(annualContribution, 0));
    const ret = Math.max(0, toNumberSafe(annualReturn, 0));
    const yrs = Math.max(0, Math.floor(toNumberSafe(years, 0)));
    const months = yrs * 12;
    const monthly = ac / 12;
    const fv = futureValueMonthly(bal, monthly, ret, months);
    const totalContrib = ac * yrs;
    return { fv, totalContrib };
  }, [currentBalance, annualContribution, annualReturn, years]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Current balance</label>
          <input className="input" type="number" min={0} value={currentBalance} onChange={(e)=>setCurrentBalance(e.target.value)} />
        </div>
        <div>
          <label className="label">Annual contribution</label>
          <input className="input" type="number" min={0} value={annualContribution} onChange={(e)=>setAnnualContribution(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Expected return (annual %)</label>
          <input className="input" type="number" min={0} step={0.1} value={annualReturn} onChange={(e)=>setAnnualReturn(e.target.value)} />
        </div>
        <div>
          <label className="label">Years</label>
          <input className="input" type="number" min={0} step={1} value={years} onChange={(e)=>setYears(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Projected balance:</strong> {result.fv.toFixed(2)}</div>
        <div><strong>Total contributions:</strong> {result.totalContrib.toFixed(2)}</div>
      </div>
      <small className="muted">Simplified projection. Contribution limits/income phase-outs are not enforced here.</small>
    </div>
  );
}

