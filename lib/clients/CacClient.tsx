"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function CacClient({ lang }: { lang: string }) {
  const [marketingCost, setMarketingCost] = useState<number>(50000);
  const [newCustomers, setNewCustomers] = useState<number>(1000);

  const cac = useMemo(() => {
    const cost = Math.max(0, marketingCost);
    const n = Math.max(1, Math.floor(newCustomers));
    return cost / n;
  }, [marketingCost, newCustomers]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cac-cost">Total marketing cost</label>
          <input id="cac-cost" className="input" type="number" min={0} step={1} value={marketingCost} onChange={(e) => setMarketingCost(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="cac-cust">New customers acquired</label>
          <input id="cac-cust" className="input" type="number" min={1} step={1} value={newCustomers} onChange={(e) => setNewCustomers(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="result">
        <div><strong>CAC:</strong> {cac.toFixed(2)}</div>
      </div>
    </div>
  );
}

