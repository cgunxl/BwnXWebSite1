"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function AffiliateEarningsClient({ lang }: { lang: string }) {
  const [clicks, setClicks] = useState<number>(10000);
  const [conversionRatePercent, setConversionRatePercent] = useState<number>(3);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(50);
  const [commissionPercent, setCommissionPercent] = useState<number>(8);

  const results = useMemo(() => {
    const cr = Math.max(0, conversionRatePercent) / 100;
    const comm = Math.max(0, commissionPercent) / 100;
    const c = Math.max(0, Math.floor(clicks));
    const orders = c * cr;
    const revenue = orders * Math.max(0, avgOrderValue);
    const commission = revenue * comm;
    return { orders, revenue, commission };
  }, [clicks, conversionRatePercent, avgOrderValue, commissionPercent]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="aff-clicks">Clicks</label>
          <input id="aff-clicks" className="input" type="number" min={0} step={1} value={clicks} onChange={(e) => setClicks(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="aff-cr">Conversion rate (%)</label>
          <input id="aff-cr" className="input" type="number" min={0} max={100} step={0.1} value={conversionRatePercent} onChange={(e) => setConversionRatePercent(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="aff-aov">Average order value</label>
          <input id="aff-aov" className="input" type="number" min={0} step={0.01} value={avgOrderValue} onChange={(e) => setAvgOrderValue(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="aff-comm">Commission (%)</label>
          <input id="aff-comm" className="input" type="number" min={0} max={100} step={0.1} value={commissionPercent} onChange={(e) => setCommissionPercent(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Estimated orders:</strong> {results.orders.toFixed(0)}</div>
        <div><strong>Attributed revenue:</strong> {results.revenue.toFixed(2)}</div>
        <div><strong>Commission earnings:</strong> {results.commission.toFixed(2)}</div>
      </div>
    </div>
  );
}

