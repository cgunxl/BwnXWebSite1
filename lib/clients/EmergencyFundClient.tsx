"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function EmergencyFundClient({ lang }: { lang: string }) {
  const [monthlyExpenses, setMonthlyExpenses] = useState<string>('30000');
  const [targetMonths, setTargetMonths] = useState<string>('6');
  const [currentSavings, setCurrentSavings] = useState<string>('20000');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('5000');

  const result = useMemo(() => {
    const exp = Math.max(0, toNumberSafe(monthlyExpenses, 0));
    const months = Math.max(0, Math.floor(toNumberSafe(targetMonths, 0)));
    const cur = Math.max(0, toNumberSafe(currentSavings, 0));
    const contrib = Math.max(0, toNumberSafe(monthlyContribution, 0));
    const target = exp * months;
    const shortfall = Math.max(0, target - cur);
    const monthsToGoal = contrib > 0 ? Math.ceil(shortfall / contrib) : Infinity;
    return { target, shortfall, monthsToGoal };
  }, [monthlyExpenses, targetMonths, currentSavings, monthlyContribution]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Monthly Expenses</label>
          <input className="input" type="number" min={0} value={monthlyExpenses} onChange={(e)=>setMonthlyExpenses(e.target.value)} />
        </div>
        <div>
          <label className="label">Target Months</label>
          <input className="input" type="number" min={0} step={1} value={targetMonths} onChange={(e)=>setTargetMonths(e.target.value)} />
        </div>
        <div>
          <label className="label">Current Savings</label>
          <input className="input" type="number" min={0} value={currentSavings} onChange={(e)=>setCurrentSavings(e.target.value)} />
        </div>
        <div>
          <label className="label">Monthly Contribution</label>
          <input className="input" type="number" min={0} value={monthlyContribution} onChange={(e)=>setMonthlyContribution(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Target Amount:</strong> {result.target}</div>
        <div><strong>Shortfall:</strong> {result.shortfall}</div>
        <div><strong>Estimated Months to Goal:</strong> {Number.isFinite(result.monthsToGoal) ? result.monthsToGoal : '∞'}</div>
      </div>
    </div>
  );
}

