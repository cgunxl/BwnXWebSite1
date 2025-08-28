"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function CpmClient({ lang }: { lang: string }) {
  const [cost, setCost] = useState<number>(1500);
  const [impressions, setImpressions] = useState<number>(300000);

  const cpm = useMemo(() => {
    const c = Math.max(0, cost);
    const i = Math.max(1, Math.floor(impressions));
    return (c / i) * 1000;
  }, [cost, impressions]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cpm-cost">Total cost</label>
          <input id="cpm-cost" className="input" type="number" min={0} step={0.01} value={cost} onChange={(e) => setCost(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="cpm-imp">Impressions</label>
          <input id="cpm-imp" className="input" type="number" min={1} step={1} value={impressions} onChange={(e) => setImpressions(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="result">
        <div><strong>CPM:</strong> {cpm.toFixed(4)}</div>
      </div>
    </div>
  );
}

