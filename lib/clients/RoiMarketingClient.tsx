"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function RoiMarketingClient({ lang }: { lang: string }) {
  const [spend, setSpend] = useState<number>(10000);
  const [incrementalRevenue, setIncrementalRevenue] = useState<number>(20000);
  const [grossMarginPercent, setGrossMarginPercent] = useState<number>(60);

  const roi = useMemo(() => {
    const s = Math.max(0.0001, spend);
    const rev = Math.max(0, incrementalRevenue);
    const margin = Math.max(0, grossMarginPercent) / 100;
    const profit = rev * margin - s;
    return profit / s;
  }, [spend, incrementalRevenue, grossMarginPercent]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="roi-spend">Marketing spend</label>
          <input id="roi-spend" className="input" type="number" min={0} step={1} value={spend} onChange={(e) => setSpend(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="roi-rev">Incremental revenue</label>
          <input id="roi-rev" className="input" type="number" min={0} step={1} value={incrementalRevenue} onChange={(e) => setIncrementalRevenue(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="roi-margin">Gross margin (%)</label>
          <input id="roi-margin" className="input" type="number" min={0} max={100} step={0.1} value={grossMarginPercent} onChange={(e) => setGrossMarginPercent(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>ROI (marketing):</strong> {(roi * 100).toFixed(2)}%</div>
      </div>
    </div>
  );
}

