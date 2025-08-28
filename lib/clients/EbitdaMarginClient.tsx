"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function EbitdaMarginClient({ lang }: { lang: string }) {
  const [revenue, setRevenue] = useState<number>(1000000);
  const [ebitda, setEbitda] = useState<number>(200000);

  const margin = useMemo(() => {
    const rev = Math.max(0, revenue);
    if (rev === 0) return 0;
    return Math.max(0, ebitda) / rev;
  }, [revenue, ebitda]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="rev">Revenue</label>
          <input id="rev" className="input" type="number" min={0} step={0.01} value={revenue} onChange={(e) => setRevenue(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="eb">EBITDA</label>
          <input id="eb" className="input" type="number" min={0} step={0.01} value={ebitda} onChange={(e) => setEbitda(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>EBITDA margin:</strong> {(margin * 100).toFixed(2)}%</div>
      </div>
    </div>
  );
}

