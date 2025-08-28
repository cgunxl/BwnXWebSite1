"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';
import { calcLoan } from '@/lib/calculators';

export default function TuitionLoanClient({ lang }: { lang: string }) {
  const [tuition, setTuition] = useState<number>(40000);
  const [annualRate, setAnnualRate] = useState<number>(5.5);
  const [years, setYears] = useState<number>(10);
  const [deferMonths, setDeferMonths] = useState<number>(0);

  const base = useMemo(() => calcLoan(Math.max(0, tuition), Math.max(0, annualRate), Math.max(0, years)), [tuition, annualRate, years]);
  const deferredInterest = useMemo(() => {
    const rMonthly = Math.max(0, annualRate) / 100 / 12;
    const principal = Math.max(0, tuition);
    return principal * rMonthly * Math.max(0, deferMonths);
  }, [tuition, annualRate, deferMonths]);

  const total = useMemo(() => base.total + deferredInterest, [base.total, deferredInterest]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="tl-amt">Tuition amount</label>
          <input id="tl-amt" className="input" type="number" min={0} step={100} value={tuition} onChange={(e) => setTuition(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="tl-rate">Rate (APR %)</label>
          <input id="tl-rate" className="input" type="number" min={0} step={0.01} value={annualRate} onChange={(e) => setAnnualRate(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="tl-years">Years</label>
          <input id="tl-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="tl-defer">Deferment (months)</label>
          <input id="tl-defer" className="input" type="number" min={0} step={1} value={deferMonths} onChange={(e) => setDeferMonths(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Monthly payment:</strong> {base.monthly.toFixed(2)}</div>
        <div><strong>Total interest:</strong> {(base.interest + deferredInterest).toFixed(2)}</div>
        <div><strong>Total paid:</strong> {total.toFixed(2)}</div>
      </div>
    </div>
  );
}

