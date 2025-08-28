"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function OhmsLawClient({ lang }: { lang: string }) {
  const [v, setV] = useState<string>("");
  const [i, setI] = useState<string>("");
  const [r, setR] = useState<string>("");
  const [p, setP] = useState<string>("");

  const solved = useMemo(() => {
    const V = v === "" ? NaN : toNumberSafe(v, NaN);
    const I = i === "" ? NaN : toNumberSafe(i, NaN);
    const R = r === "" ? NaN : toNumberSafe(r, NaN);
    const P = p === "" ? NaN : toNumberSafe(p, NaN);
    let v2 = V, i2 = I, r2 = R, p2 = P;
    // Use relationships: V = I*R; P = V*I = I^2 R = V^2 / R
    // Try to infer missing values iteratively
    for (let k = 0; k < 4; k++) {
      if (!Number.isFinite(v2) && Number.isFinite(i2) && Number.isFinite(r2)) v2 = i2 * r2;
      if (!Number.isFinite(i2) && Number.isFinite(v2) && Number.isFinite(r2)) i2 = r2 === 0 ? NaN : v2 / r2;
      if (!Number.isFinite(r2) && Number.isFinite(v2) && Number.isFinite(i2)) r2 = i2 === 0 ? NaN : v2 / i2;
      if (!Number.isFinite(p2) && Number.isFinite(v2) && Number.isFinite(i2)) p2 = v2 * i2;
      if (!Number.isFinite(v2) && Number.isFinite(p2) && Number.isFinite(i2)) v2 = i2 === 0 ? NaN : p2 / i2;
      if (!Number.isFinite(i2) && Number.isFinite(p2) && Number.isFinite(v2)) i2 = v2 === 0 ? NaN : p2 / v2;
      if (!Number.isFinite(r2) && Number.isFinite(v2) && Number.isFinite(p2)) r2 = p2 === 0 ? NaN : (v2 * v2) / p2;
      if (!Number.isFinite(r2) && Number.isFinite(p2) && Number.isFinite(i2)) r2 = i2 === 0 ? NaN : p2 / (i2 * i2);
    }
    return { V: v2, I: i2, R: r2, P: p2 };
  }, [v, i, r, p]);

  const fmt = (x: number) => (Number.isFinite(x) ? x : '');

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Voltage V (volt)</label>
          <input className="input" type="number" value={v} onChange={(e)=>setV(e.target.value)} placeholder={fmt(solved.V) as any} />
        </div>
        <div>
          <label className="label">Current I (ampere)</label>
          <input className="input" type="number" value={i} onChange={(e)=>setI(e.target.value)} placeholder={fmt(solved.I) as any} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Resistance R (ohm)</label>
          <input className="input" type="number" value={r} onChange={(e)=>setR(e.target.value)} placeholder={fmt(solved.R) as any} />
        </div>
        <div>
          <label className="label">Power P (watt)</label>
          <input className="input" type="number" value={p} onChange={(e)=>setP(e.target.value)} placeholder={fmt(solved.P) as any} />
        </div>
      </div>
      <div className="result">
        <div><strong>V:</strong> {fmt(solved.V) as any}</div>
        <div><strong>I:</strong> {fmt(solved.I) as any}</div>
        <div><strong>R:</strong> {fmt(solved.R) as any}</div>
        <div><strong>P:</strong> {fmt(solved.P) as any}</div>
      </div>
      <small className="muted">Provide any two values to solve the rest. Uses V = I·R and P = V·I.</small>
    </div>
  );
}

