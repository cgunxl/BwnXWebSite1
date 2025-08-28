"use client";
import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function priceBond(face: number, couponRate: number, ytm: number, years: number, freq: number): number {
  const n = Math.max(0, Math.round(years * freq));
  const c = face * (couponRate / 100) / freq;
  const r = (ytm / 100) / freq;
  let pv = 0;
  for (let t = 1; t <= n; t++) {
    pv += c / Math.pow(1 + r, t);
  }
  pv += face / Math.pow(1 + r, n);
  return pv;
}

export default function BondPriceClient({ lang }: { lang: string }) {
  const [face, setFace] = useState<string>('1000');
  const [coupon, setCoupon] = useState<string>('5');
  const [ytm, setYtm] = useState<string>('5');
  const [years, setYears] = useState<string>('10');
  const [freq, setFreq] = useState<'1' | '2'>('2');

  const value = useMemo(() => {
    const f = toNumberSafe(face, 0);
    const c = toNumberSafe(coupon, 0);
    const y = toNumberSafe(ytm, 0);
    const n = toNumberSafe(years, 0);
    const q = parseInt(freq, 10);
    return priceBond(f, c, y, n, q);
  }, [face, coupon, ytm, years, freq]);

  const fmt = (x: number) => (Number.isFinite(x) ? x.toFixed(4) : '');

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        <label>
          <div>Face value</div>
          <input value={face} onChange={(e) => setFace(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Coupon rate (% annual)</div>
          <input value={coupon} onChange={(e) => setCoupon(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Yield to maturity (% annual)</div>
          <input value={ytm} onChange={(e) => setYtm(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Years to maturity</div>
          <input value={years} onChange={(e) => setYears(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Coupon frequency</div>
          <select value={freq} onChange={(e) => setFreq(e.target.value as any)}>
            <option value="1">Annual</option>
            <option value="2">Semiannual</option>
          </select>
        </label>
      </div>
      <div className="result" style={{ marginTop: 12 }}>
        <div>Price: <b>{fmt(value)}</b></div>
      </div>
    </div>
  );
}

