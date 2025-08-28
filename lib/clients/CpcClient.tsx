"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function CpcClient({ lang }: { lang: string }) {
  const [cost, setCost] = useState<number>(1000);
  const [clicks, setClicks] = useState<number>(2000);

  const cpc = useMemo(() => {
    const c = Math.max(0, cost);
    const k = Math.max(1, Math.floor(clicks));
    return c / k;
  }, [cost, clicks]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cpc-cost">Total cost</label>
          <input id="cpc-cost" className="input" type="number" min={0} step={0.01} value={cost} onChange={(e) => setCost(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="cpc-clicks">Clicks</label>
          <input id="cpc-clicks" className="input" type="number" min={1} step={1} value={clicks} onChange={(e) => setClicks(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="result">
        <div><strong>CPC:</strong> {cpc.toFixed(4)}</div>
      </div>
    </div>
  );
}

