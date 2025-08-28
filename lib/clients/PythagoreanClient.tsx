"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function PythagoreanClient({ lang }: { lang: string }) {
  const [a, setA] = useState<string>('3');
  const [b, setB] = useState<string>('4');
  const [c, setC] = useState<string>('');

  const solved = useMemo(() => {
    const ax = toNumberSafe(a, NaN);
    const bx = toNumberSafe(b, NaN);
    const cx = toNumberSafe(c, NaN);
    const nums = [ax, bx, cx].filter((v) => Number.isFinite(v));
    if (nums.length < 2) return { a: NaN, b: NaN, c: NaN };
    // Solve the missing side using a^2 + b^2 = c^2
    if (!Number.isFinite(ax)) {
      const bb = bx;
      const cc = cx;
      if (!Number.isFinite(bb) || !Number.isFinite(cc) || cc <= bb) return { a: NaN, b: bx, c: cx };
      return { a: Math.sqrt(cc * cc - bb * bb), b: bx, c: cx };
    }
    if (!Number.isFinite(bx)) {
      const aa = ax;
      const cc = cx;
      if (!Number.isFinite(aa) || !Number.isFinite(cc) || cc <= aa) return { a: ax, b: NaN, c: cx };
      return { a: ax, b: Math.sqrt(cc * cc - aa * aa), c: cx };
    }
    // solve c
    if (!Number.isFinite(cx)) {
      const aa = ax;
      const bb = bx;
      return { a: ax, b: bx, c: Math.sqrt(aa * aa + bb * bb) };
    }
    // default return c from a,b
    return { a: ax, b: bx, c: Math.sqrt(ax * ax + bx * bx) };
  }, [a, b, c]);

  const fmt = (x: number) => (Number.isFinite(x) ? x : '');

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">a (leg)</label>
          <input className="input" type="number" min={0} value={a} onChange={(e)=>setA(e.target.value)} />
        </div>
        <div>
          <label className="label">b (leg)</label>
          <input className="input" type="number" min={0} value={b} onChange={(e)=>setB(e.target.value)} />
        </div>
        <div>
          <label className="label">c (hypotenuse)</label>
          <input className="input" type="number" min={0} value={c} onChange={(e)=>setC(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>a:</strong> {fmt(solved.a)}</div>
        <div><strong>b:</strong> {fmt(solved.b)}</div>
        <div><strong>c:</strong> {fmt(solved.c)}</div>
      </div>
    </div>
  );
}

