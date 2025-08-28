"use client";
import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function DscrClient({ lang }: { lang: string }) {
  const [noi, setNoi] = useState<string>('150000');
  const [ads, setAds] = useState<string>('100000');

  const dscr = useMemo(() => {
    const n = toNumberSafe(noi, 0);
    const d = toNumberSafe(ads, 0);
    if (d === 0) return NaN;
    return n / d;
  }, [noi, ads]);

  const interpretation = useMemo(() => {
    if (!Number.isFinite(dscr)) return '';
    if (dscr < 1) return 'Below 1.0 – insufficient cash flow to cover debt service';
    if (dscr < 1.2) return 'Marginal coverage';
    return 'Healthy coverage';
  }, [dscr]);

  const fmt = (x: number) => (Number.isFinite(x) ? x.toFixed(3) : '');

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        <label>
          <div>Net Operating Income (NOI)</div>
          <input value={noi} onChange={(e) => setNoi(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Annual Debt Service</div>
          <input value={ads} onChange={(e) => setAds(e.target.value)} inputMode="decimal" />
        </label>
      </div>
      <div className="result" style={{ marginTop: 12 }}>
        <div>DSCR: <b>{fmt(dscr)}</b></div>
        <div>{interpretation}</div>
      </div>
    </div>
  );
}

