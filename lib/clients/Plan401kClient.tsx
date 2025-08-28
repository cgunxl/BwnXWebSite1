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

export default function Plan401kClient({ lang }: { lang: string }) {
  const [currentBalance, setCurrentBalance] = useState<string>('10000');
  const [annualSalary, setAnnualSalary] = useState<string>('60000');
  const [employeePct, setEmployeePct] = useState<string>('10');
  const [employerMatchPct, setEmployerMatchPct] = useState<string>('50');
  const [employerCapPct, setEmployerCapPct] = useState<string>('6');
  const [annualReturn, setAnnualReturn] = useState<string>('7');
  const [years, setYears] = useState<string>('30');

  const result = useMemo(() => {
    const bal = Math.max(0, toNumberSafe(currentBalance, 0));
    const sal = Math.max(0, toNumberSafe(annualSalary, 0));
    const emp = Math.max(0, toNumberSafe(employeePct, 0)) / 100;
    const match = Math.max(0, toNumberSafe(employerMatchPct, 0)) / 100;
    const cap = Math.max(0, toNumberSafe(employerCapPct, 0)) / 100;
    const ret = Math.max(0, toNumberSafe(annualReturn, 0));
    const yrs = Math.max(0, Math.floor(toNumberSafe(years, 0)));
    const months = yrs * 12;
    const employeeAnnual = sal * emp;
    const employerAnnual = Math.min(sal * cap, sal * emp) * match;
    const totalAnnual = employeeAnnual + employerAnnual;
    const monthly = totalAnnual / 12;
    const fv = futureValueMonthly(bal, monthly, ret, months);
    return { employeeAnnual, employerAnnual, totalAnnual, monthly, fv };
  }, [currentBalance, annualSalary, employeePct, employerMatchPct, employerCapPct, annualReturn, years]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Current balance</label>
          <input className="input" type="number" min={0} value={currentBalance} onChange={(e)=>setCurrentBalance(e.target.value)} />
        </div>
        <div>
          <label className="label">Annual salary</label>
          <input className="input" type="number" min={0} value={annualSalary} onChange={(e)=>setAnnualSalary(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Employee contribution (%)</label>
          <input className="input" type="number" min={0} step={0.1} value={employeePct} onChange={(e)=>setEmployeePct(e.target.value)} />
        </div>
        <div>
          <label className="label">Employer match (%)</label>
          <input className="input" type="number" min={0} step={0.1} value={employerMatchPct} onChange={(e)=>setEmployerMatchPct(e.target.value)} />
          <small className="muted">Match percent of capped salary</small>
        </div>
        <div>
          <label className="label">Employer cap (of salary %)</label>
          <input className="input" type="number" min={0} step={0.1} value={employerCapPct} onChange={(e)=>setEmployerCapPct(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Expected return (annual %)</label>
          <input className="input" type="number" min={0} step={0.1} value={annualReturn} onChange={(e)=>setAnnualReturn(e.target.value)} />
        </div>
        <div>
          <label className="label">Years to contribute</label>
          <input className="input" type="number" min={0} step={1} value={years} onChange={(e)=>setYears(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Employee annual:</strong> {result.employeeAnnual.toFixed(2)}</div>
        <div><strong>Employer annual:</strong> {result.employerAnnual.toFixed(2)}</div>
        <div><strong>Total annual:</strong> {result.totalAnnual.toFixed(2)}</div>
        <div><strong>Projected balance:</strong> {result.fv.toFixed(2)}</div>
      </div>
      <small className="muted">Simplified model; contribution limits and taxes are not included.</small>
    </div>
  );
}

