"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function EnterpriseValueClient({ lang }: { lang: string }) {
  const [marketCap, setMarketCap] = useState<number>(1000000000);
  const [totalDebt, setTotalDebt] = useState<number>(200000000);
  const [cash, setCash] = useState<number>(50000000);

  const ev = useMemo(() => {
    return Math.max(0, marketCap) + Math.max(0, totalDebt) - Math.max(0, cash);
  }, [marketCap, totalDebt, cash]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ev-mkt">Market cap</label>
          <input id="ev-mkt" className="input" type="number" min={0} step={0.01} value={marketCap} onChange={(e) => setMarketCap(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="ev-debt">Total debt</label>
          <input id="ev-debt" className="input" type="number" min={0} step={0.01} value={totalDebt} onChange={(e) => setTotalDebt(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ev-cash">Cash and equivalents</label>
          <input id="ev-cash" className="input" type="number" min={0} step={0.01} value={cash} onChange={(e) => setCash(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Enterprise value:</strong> {ev.toLocaleString()}</div>
      </div>
    </div>
  );
}

