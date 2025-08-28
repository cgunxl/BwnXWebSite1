"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function erf(x: number): number {
  // Numerical approximation of error function (Abramowitz & Stegun 7.1.26)
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429;
  const p = 0.3275911;
  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  return sign * y;
}

function cdfStandardNormal(z: number): number {
  return 0.5 * (1 + erf(z / Math.SQRT2));
}

export default function ZScoreClient({ lang }: { lang: string }) {
  const [x, setX] = useState<string>('90');
  const [mean, setMean] = useState<string>('80');
  const [sd, setSd] = useState<string>('10');

  const z = useMemo(() => {
    const X = toNumberSafe(x, 0);
    const mu = toNumberSafe(mean, 0);
    const s = toNumberSafe(sd, 1);
    if (s === 0) return NaN;
    return (X - mu) / s;
  }, [x, mean, sd]);

  const p = useMemo(() => Number.isFinite(z) ? cdfStandardNormal(z) : NaN, [z]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">X (value)</label>
          <input className="input" type="number" value={x} onChange={(e)=>setX(e.target.value)} />
        </div>
        <div>
          <label className="label">Mean (μ)</label>
          <input className="input" type="number" value={mean} onChange={(e)=>setMean(e.target.value)} />
        </div>
        <div>
          <label className="label">Std Dev (σ)</label>
          <input className="input" type="number" value={sd} onChange={(e)=>setSd(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>z-score:</strong> {Number.isFinite(z) ? z : '—'}</div>
        <div><strong>P(Z ≤ z):</strong> {Number.isFinite(p) ? p.toFixed(6) : '—'}</div>
      </div>
    </div>
  );
}

