"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function PaydayLoanClient({ lang }: { lang: string }) {
  const [amount, setAmount] = useState<number>(500);
  const [fee, setFee] = useState<number>(75); // flat fee for the term
  const [termDays, setTermDays] = useState<number>(14);

  const apr = useMemo(() => {
    const a = Math.max(0.0001, amount);
    const f = Math.max(0, fee);
    const d = Math.max(1, termDays);
    const periodRate = f / a;
    const periodsPerYear = 365 / d;
    return periodRate * periodsPerYear * 100; // simple APR approximation
  }, [amount, fee, termDays]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="pd-amt">Loan amount</label>
          <input id="pd-amt" className="input" type="number" min={0} step={1} value={amount} onChange={(e) => setAmount(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="pd-fee">Fee</label>
          <input id="pd-fee" className="input" type="number" min={0} step={1} value={fee} onChange={(e) => setFee(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="pd-days">Term (days)</label>
          <input id="pd-days" className="input" type="number" min={1} step={1} value={termDays} onChange={(e) => setTermDays(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Estimated APR:</strong> {apr.toFixed(1)}%</div>
      </div>
    </div>
  );
}

