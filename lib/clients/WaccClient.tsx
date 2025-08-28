"use client";
import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function WaccClient({ lang }: { lang: string }) {
  const [we, setWe] = useState<string>('60');
  const [re, setRe] = useState<string>('10');
  const [wd, setWd] = useState<string>('30');
  const [rd, setRd] = useState<string>('5');
  const [wp, setWp] = useState<string>('10');
  const [rp, setRp] = useState<string>('7');
  const [tax, setTax] = useState<string>('25');

  const wacc = useMemo(() => {
    const wEquity = toNumberSafe(we, 0) / 100;
    const rEquity = toNumberSafe(re, 0) / 100;
    const wDebt = toNumberSafe(wd, 0) / 100;
    const rDebt = toNumberSafe(rd, 0) / 100;
    const wPref = toNumberSafe(wp, 0) / 100;
    const rPref = toNumberSafe(rp, 0) / 100;
    const t = toNumberSafe(tax, 0) / 100;
    const totalW = wEquity + wDebt + wPref;
    if (totalW <= 0) return NaN;
    // Normalize weights to sum to 1 if needed
    const nwE = wEquity / totalW;
    const nwD = wDebt / totalW;
    const nwP = wPref / totalW;
    const value = nwE * rEquity + nwP * rPref + nwD * rDebt * (1 - t);
    return value * 100;
  }, [we, re, wd, rd, wp, rp, tax]);

  const fmt = (x: number) => (Number.isFinite(x) ? x.toFixed(4) : '');

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        <label>
          <div>Equity weight (%)</div>
          <input value={we} onChange={(e) => setWe(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Equity cost (% Re)</div>
          <input value={re} onChange={(e) => setRe(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Debt weight (%)</div>
          <input value={wd} onChange={(e) => setWd(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Debt cost (% Rd)</div>
          <input value={rd} onChange={(e) => setRd(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Preferred weight (%)</div>
          <input value={wp} onChange={(e) => setWp(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Preferred cost (% Rp)</div>
          <input value={rp} onChange={(e) => setRp(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Tax rate (%)</div>
          <input value={tax} onChange={(e) => setTax(e.target.value)} inputMode="decimal" />
        </label>
      </div>
      <div className="result" style={{ marginTop: 12 }}>
        <div>WACC: <b>{fmt(wacc)}</b>%</div>
      </div>
    </div>
  );
}

