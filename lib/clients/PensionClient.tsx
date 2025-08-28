"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function PensionClient({ lang }: { lang: string }) {
  const [currentAge, setCurrentAge] = useState<number>(35);
  const [retireAge, setRetireAge] = useState<number>(60);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(3000);
  const [annualReturnPercent, setAnnualReturnPercent] = useState<number>(5);
  const [withdrawYears, setWithdrawYears] = useState<number>(25);

  const monthsToRetire = useMemo(() => Math.max(0, (retireAge - currentAge) * 12), [currentAge, retireAge]);
  const rMonthly = useMemo(() => Math.max(0, annualReturnPercent) / 100 / 12, [annualReturnPercent]);
  const futureValue = useMemo(() => {
    const n = monthsToRetire;
    const pmt = Math.max(0, monthlyContribution);
    if (rMonthly === 0) return pmt * n;
    const factor = (Math.pow(1 + rMonthly, n) - 1) / rMonthly;
    return pmt * factor;
  }, [monthsToRetire, monthlyContribution, rMonthly]);

  const monthlyPayout = useMemo(() => {
    const n = Math.max(1, withdrawYears * 12);
    const r = rMonthly;
    if (r === 0) return futureValue / n;
    const annuityFactor = (1 - Math.pow(1 + r, -n)) / r;
    return futureValue / annuityFactor;
  }, [futureValue, withdrawYears, rMonthly]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="pen-age">Current age</label>
          <input id="pen-age" className="input" type="number" min={0} step={1} value={currentAge} onChange={(e) => setCurrentAge(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="pen-retire">Retirement age</label>
          <input id="pen-retire" className="input" type="number" min={0} step={1} value={retireAge} onChange={(e) => setRetireAge(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="pen-pmt">Monthly contribution</label>
          <input id="pen-pmt" className="input" type="number" min={0} step={1} value={monthlyContribution} onChange={(e) => setMonthlyContribution(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="pen-ret">Annual return (%)</label>
          <input id="pen-ret" className="input" type="number" min={0} step={0.01} value={annualReturnPercent} onChange={(e) => setAnnualReturnPercent(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="pen-yrs">Withdraw years</label>
          <input id="pen-yrs" className="input" type="number" min={1} step={1} value={withdrawYears} onChange={(e) => setWithdrawYears(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Months to retire:</strong> {monthsToRetire}</div>
        <div><strong>Projected fund at retirement:</strong> {futureValue.toFixed(0)}</div>
        <div><strong>Estimated monthly pension:</strong> {monthlyPayout.toFixed(0)}</div>
      </div>
    </div>
  );
}

