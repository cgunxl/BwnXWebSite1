"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function futureValueMonthly(
  current: number,
  monthlyContribution: number,
  annualReturnPercent: number,
  months: number
): number {
  const r = Math.max(0, annualReturnPercent) / 100 / 12;
  if (months <= 0) return current;
  if (r === 0) return current + monthlyContribution * months;
  const growth = Math.pow(1 + r, months);
  const fvCurrent = current * growth;
  const fvContrib = monthlyContribution * ((growth - 1) / r);
  return fvCurrent + fvContrib;
}

export default function RetirementClient({ lang }: { lang: string }) {
  const [currentAgeSafe, setCurrentAgeSafe] = useState<string>('35');
  const [retireAge, setRetireAge] = useState<string>('65');
  const [currentSavings, setCurrentSavings] = useState<string>('20000');
  const [monthlyContrib, setMonthlyContrib] = useState<string>('500');
  const [annualReturn, setAnnualReturn] = useState<string>('6');
  const [inflation, setInflation] = useState<string>('2');
  const [withdrawal, setWithdrawal] = useState<string>('4');

  const result = useMemo(() => {
    const age = Math.max(0, Math.floor(toNumberSafe(currentAgeSafe, 35)));
    const ra = Math.max(age, Math.floor(toNumberSafe(retireAge, 65)));
    const years = ra - age;
    const months = years * 12;
    const principal = Math.max(0, toNumberSafe(currentSavings, 0));
    const contrib = Math.max(0, toNumberSafe(monthlyContrib, 0));
    const ret = Math.max(0, toNumberSafe(annualReturn, 0));
    const inf = Math.max(0, toNumberSafe(inflation, 0));
    const wr = Math.max(0, toNumberSafe(withdrawal, 0));
    const fvNominal = futureValueMonthly(principal, contrib, ret, months);
    const fvReal = fvNominal / Math.pow(1 + inf / 100, years);
    const annualIncomeReal = fvReal * (wr / 100);
    const monthlyIncomeReal = annualIncomeReal / 12;
    const totalContrib = contrib * months;
    return { years, months, fvNominal, fvReal, annualIncomeReal, monthlyIncomeReal, totalContrib };
  }, [currentAgeSafe, retireAge, currentSavings, monthlyContrib, annualReturn, inflation, withdrawal]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Current age</label>
          <input className="input" type="number" min={0} value={currentAgeSafe} onChange={(e)=>setCurrentAgeSafe(e.target.value)} />
        </div>
        <div>
          <label className="label">Retirement age</label>
          <input className="input" type="number" min={0} value={retireAge} onChange={(e)=>setRetireAge(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Current savings</label>
          <input className="input" type="number" min={0} value={currentSavings} onChange={(e)=>setCurrentSavings(e.target.value)} />
        </div>
        <div>
          <label className="label">Monthly contribution</label>
          <input className="input" type="number" min={0} value={monthlyContrib} onChange={(e)=>setMonthlyContrib(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Expected return (annual %)</label>
          <input className="input" type="number" min={0} step={0.1} value={annualReturn} onChange={(e)=>setAnnualReturn(e.target.value)} />
        </div>
        <div>
          <label className="label">Inflation (annual %)</label>
          <input className="input" type="number" min={0} step={0.1} value={inflation} onChange={(e)=>setInflation(e.target.value)} />
        </div>
        <div>
          <label className="label">Withdrawal rate (%)</label>
          <input className="input" type="number" min={0} step={0.1} value={withdrawal} onChange={(e)=>setWithdrawal(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Years to retire:</strong> {result.years}</div>
        <div><strong>Future value (nominal):</strong> {result.fvNominal.toFixed(2)}</div>
        <div><strong>Future value (real):</strong> {result.fvReal.toFixed(2)}</div>
        <div><strong>Est. annual income (real):</strong> {result.annualIncomeReal.toFixed(2)}</div>
        <div><strong>Est. monthly income (real):</strong> {result.monthlyIncomeReal.toFixed(2)}</div>
        <div><strong>Total contributions:</strong> {result.totalContrib.toFixed(2)}</div>
      </div>
      <small className="muted">Assumes monthly contributions at end of month and constant returns. Real value adjusted by inflation.</small>
    </div>
  );
}

