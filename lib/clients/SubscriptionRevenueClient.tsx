"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function SubscriptionRevenueClient({ lang }: { lang: string }) {
  const [activeSubscribers, setActiveSubscribers] = useState<number>(1000);
  const [pricePerMonth, setPricePerMonth] = useState<number>(15);
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const mrr = useMemo(() => {
    const subs = Math.max(0, Math.floor(activeSubscribers));
    const price = Math.max(0, pricePerMonth);
    const disc = Math.max(0, Math.min(100, discountPercent)) / 100;
    return subs * price * (1 - disc);
  }, [activeSubscribers, pricePerMonth, discountPercent]);

  const arr = useMemo(() => mrr * 12, [mrr]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="sr-subs">Active subscribers</label>
          <input id="sr-subs" className="input" type="number" min={0} step={1} value={activeSubscribers} onChange={(e) => setActiveSubscribers(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="sr-price">Price per month</label>
          <input id="sr-price" className="input" type="number" min={0} step={0.01} value={pricePerMonth} onChange={(e) => setPricePerMonth(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="sr-disc">Discount (%)</label>
          <input id="sr-disc" className="input" type="number" min={0} max={100} step={0.1} value={discountPercent} onChange={(e) => setDiscountPercent(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>MRR:</strong> {mrr.toFixed(2)}</div>
        <div><strong>ARR:</strong> {arr.toFixed(2)}</div>
      </div>
    </div>
  );
}

