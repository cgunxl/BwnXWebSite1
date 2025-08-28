"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function CustomerLtvClient({ lang }: { lang: string }) {
  const [arpuMonthly, setArpuMonthly] = useState<number>(30);
  const [grossMarginPercent, setGrossMarginPercent] = useState<number>(70);
  const [churnMonthlyPercent, setChurnMonthlyPercent] = useState<number>(5);

  const ltv = useMemo(() => {
    const arpu = Math.max(0, arpuMonthly);
    const margin = Math.max(0, grossMarginPercent) / 100;
    const churn = Math.max(0.0001, churnMonthlyPercent) / 100;
    // SaaS heuristic: LTV = ARPU * margin / churn
    return (arpu * margin) / churn;
  }, [arpuMonthly, grossMarginPercent, churnMonthlyPercent]);

  const avgLifespanMonths = useMemo(() => {
    const churn = Math.max(0.0001, churnMonthlyPercent) / 100;
    return 1 / churn;
  }, [churnMonthlyPercent]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ltv-arpu">ARPU (monthly)</label>
          <input id="ltv-arpu" className="input" type="number" min={0} step={0.01} value={arpuMonthly} onChange={(e) => setArpuMonthly(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="ltv-margin">Gross margin (%)</label>
          <input id="ltv-margin" className="input" type="number" min={0} max={100} step={0.1} value={grossMarginPercent} onChange={(e) => setGrossMarginPercent(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ltv-churn">Churn rate (%/month)</label>
          <input id="ltv-churn" className="input" type="number" min={0} max={100} step={0.1} value={churnMonthlyPercent} onChange={(e) => setChurnMonthlyPercent(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Avg lifespan:</strong> {avgLifespanMonths.toFixed(1)} months</div>
        <div><strong>Customer LTV:</strong> {ltv.toFixed(2)}</div>
      </div>
    </div>
  );
}

