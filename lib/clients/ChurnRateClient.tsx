"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function ChurnRateClient({ lang }: { lang: string }) {
  const [startCustomers, setStartCustomers] = useState<number>(1000);
  const [endCustomers, setEndCustomers] = useState<number>(950);
  const [newCustomers, setNewCustomers] = useState<number>(50);

  const churnRate = useMemo(() => {
    const start = Math.max(1, Math.floor(startCustomers));
    const end = Math.max(0, Math.floor(endCustomers));
    const added = Math.max(0, Math.floor(newCustomers));
    const lost = Math.max(0, start + added - end);
    return (lost / start) * 100;
  }, [startCustomers, endCustomers, newCustomers]);

  const retentionRate = useMemo(() => 100 - Math.max(0, Math.min(100, churnRate)), [churnRate]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="churn-start">Customers at start</label>
          <input id="churn-start" className="input" type="number" min={1} step={1} value={startCustomers} onChange={(e) => setStartCustomers(toNumberSafe(e.target.value, 1))} />
        </div>
        <div>
          <label className="label" htmlFor="churn-end">Customers at end</label>
          <input id="churn-end" className="input" type="number" min={0} step={1} value={endCustomers} onChange={(e) => setEndCustomers(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="churn-new">New customers added</label>
          <input id="churn-new" className="input" type="number" min={0} step={1} value={newCustomers} onChange={(e) => setNewCustomers(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Churn rate:</strong> {churnRate.toFixed(2)}%</div>
        <div><strong>Retention rate:</strong> {retentionRate.toFixed(2)}%</div>
      </div>
    </div>
  );
}

