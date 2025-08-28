"use client";
import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function computeNpv(rateDecimal: number, cashflows: number[]): number {
  let total = 0;
  for (let t = 0; t < cashflows.length; t++) {
    total += cashflows[t] / Math.pow(1 + rateDecimal, t);
  }
  return total;
}

function computeIrr(cashflows: number[], guess = 0.1): number | null {
  // Newton-Raphson with fallback to bisection
  const maxIter = 100;
  const tol = 1e-7;

  const npv = (r: number) => computeNpv(r, cashflows);
  const dNpv = (r: number) => {
    let d = 0;
    for (let t = 1; t < cashflows.length; t++) {
      d += -t * cashflows[t] / Math.pow(1 + r, t + 1);
    }
    return d;
  };

  let r = guess;
  for (let i = 0; i < maxIter; i++) {
    const f = npv(r);
    const df = dNpv(r);
    if (Math.abs(df) < 1e-12) break;
    const rNext = r - f / df;
    if (!Number.isFinite(rNext)) break;
    if (Math.abs(rNext - r) < tol) return rNext;
    r = rNext;
  }

  // Bisection in [-0.9999, 10]
  let lo = -0.9999;
  let hi = 10;
  let fLo = npv(lo);
  let fHi = npv(hi);
  if (Number.isNaN(fLo) || Number.isNaN(fHi)) return null;
  if (fLo === 0) return lo;
  if (fHi === 0) return hi;
  // Ensure opposite signs; if not, expand hi
  let tries = 0;
  while (fLo * fHi > 0 && tries < 20) {
    hi *= 2;
    fHi = npv(hi);
    tries++;
  }
  if (fLo * fHi > 0) return null;
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const fMid = npv(mid);
    if (Math.abs(fMid) < tol) return mid;
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

export default function NpvIrrClient({ lang }: { lang: string }) {
  const [rate, setRate] = useState<string>('10');
  const [initial, setInitial] = useState<string>('-10000');
  const [series, setSeries] = useState<string>('3000, 3500, 4000, 4500, 5000');

  const parsed = useMemo(() => {
    const r = toNumberSafe(rate, 0) / 100;
    const c0 = toNumberSafe(initial, 0);
    const flows = series
      .split(/[,\n]/)
      .map((s) => toNumberSafe(s, NaN))
      .filter((x) => Number.isFinite(x)) as number[];
    const cashflows = [c0, ...flows];
    const npv = computeNpv(r, cashflows);
    const irr = computeIrr(cashflows, 0.1);
    return { r, cashflows, npv, irr };
  }, [rate, initial, series]);

  const fmt = (x: number | null) =>
    x == null || !Number.isFinite(x as number) ? '' : (x as number).toFixed(6);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
        <label>
          <div>Discount rate (%)</div>
          <input value={rate} onChange={(e) => setRate(e.target.value)} inputMode="decimal" />
        </label>
        <label>
          <div>Initial cash flow (t=0)</div>
          <input value={initial} onChange={(e) => setInitial(e.target.value)} inputMode="decimal" />
        </label>
      </div>
      <label style={{ display: 'block', marginTop: 12 }}>
        <div>Future cash flows (comma or newline separated)</div>
        <textarea value={series} onChange={(e) => setSeries(e.target.value)} rows={4} />
      </label>
      <div className="result" style={{ marginTop: 12 }}>
        <div>NPV: <b>{fmt(parsed.npv)}</b></div>
        <div>IRR: <b>{parsed.irr == null ? '' : (parsed.irr * 100).toFixed(6)}%</b></div>
      </div>
    </div>
  );
}

