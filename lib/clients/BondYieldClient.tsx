"use client";
import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function priceGivenYield(face: number, couponRate: number, ytm: number, years: number, freq: number): number {
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

function solveYtm(face: number, couponRate: number, price: number, years: number, freq: number): number | null {
  // Use bisection over [0, 1000%]
  const target = price;
  const f = (ytm: number) => priceGivenYield(face, couponRate, ytm, years, freq) - target;
  let lo = 0;
  let hi = 1000; // extremely high bound
  let fLo = f(lo);
  let fHi = f(hi);
  let tries = 0;
  while (fLo * fHi > 0 && tries < 50) {
    hi *= 2;
    fHi = f(hi);
    tries++;
  }
  if (fLo * fHi > 0) return null;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const fMid = f(mid);
    if (Math.abs(fMid) < 1e-8) return mid;
    if (fLo * fMid <= 0) {
      hi = mid;
      fHi = fMid;
    } else {
      lo = mid;
      fLo = fMid;
    }
  }
  return (lo + hi) / 2;
}

export default function BondYieldClient({ lang }: { lang: string }) {
  const [price, setPrice] = useState<string>('1000');
  const [face, setFace] = useState<string>('1000');
  const [coupon, setCoupon] = useState<string>('5');
  const [years, setYears] = useState<string>('10');
  const [freq, setFreq] = useState<'1' | '2'>('2');

  const ytm = useMemo(() => {
    const p = toNumberSafe(price, 0);
    const f = toNumberSafe(face, 0);
    const c = toNumberSafe(coupon, 0);
    const n = toNumberSafe(years, 0);
    const q = parseInt(freq, 10);
    const y = solveYtm(f, c, p, n, q);
    return y;
  }, [price, face, coupon, years, freq]);

  const fmt = (x: number | null) => (x == null || !Number.isFinite(x as number) ? '' : (x as number).toFixed(6));

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        <label>
          <div>Market price</div>
          <input value={price} onChange={(e) => setPrice(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Face value</div>
          <input value={face} onChange={(e) => setFace(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Coupon rate (% annual)</div>
          <input value={coupon} onChange={(e) => setCoupon(e.target.value)} inputMode="decimal" />
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
        <div>Yield to Maturity: <b>{fmt(ytm)}</b>%</div>
      </div>
    </div>
  );
}

