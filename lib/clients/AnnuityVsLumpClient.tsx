"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function pvAnnuity(payment: number, rate: number, n: number): number {
  const r = rate;
  if (r === 0) return payment * n;
  const factor = 1 - Math.pow(1 + r, -n);
  return payment * (factor / r);
}

export default function AnnuityVsLumpClient({ lang }: { lang: string }) {
  const [payment, setPayment] = useState<number>(2000); // per month
  const [years, setYears] = useState<number>(20);
  const [discountRateAnnual, setDiscountRateAnnual] = useState<number>(5);
  const [lumpSum, setLumpSum] = useState<number>(300000);

  const n = useMemo(() => Math.max(0, years) * 12, [years]);
  const rMonthly = useMemo(() => Math.max(0, discountRateAnnual) / 100 / 12, [discountRateAnnual]);
  const pv = useMemo(() => pvAnnuity(Math.max(0, payment), rMonthly, n), [payment, rMonthly, n]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="avl-pay">Annuity payment (monthly)</label>
          <input id="avl-pay" className="input" type="number" min={0} step={1} value={payment} onChange={(e) => setPayment(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="avl-years">Years</label>
          <input id="avl-years" className="input" type="number" min={0} step={1} value={years} onChange={(e) => setYears(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="avl-rate">Discount rate (APR %)</label>
          <input id="avl-rate" className="input" type="number" min={0} step={0.01} value={discountRateAnnual} onChange={(e) => setDiscountRateAnnual(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="avl-lump">Lump sum</label>
          <input id="avl-lump" className="input" type="number" min={0} step={1000} value={lumpSum} onChange={(e) => setLumpSum(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Present value of annuity:</strong> {pv.toFixed(2)}</div>
        <div><strong>Lump sum offered:</strong> {Math.max(0, lumpSum).toFixed(2)}</div>
        <div><strong>Recommendation:</strong> {pv > lumpSum ? 'Annuity (higher PV)' : pv < lumpSum ? 'Lump sum (higher PV)' : 'Equivalent'}</div>
      </div>
    </div>
  );
}

