"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function randomInt(min: number, max: number): number {
  min = Math.floor(min);
  max = Math.floor(max);
  if (max < min) [min, max] = [max, min];
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function RngClient({ lang }: { lang: string }) {
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('100');
  const [count, setCount] = useState<string>('1');
  const [unique, setUnique] = useState<boolean>(false);
  const [seed, setSeed] = useState<string>('');

  const out = useMemo(() => {
    let mn = toNumberSafe(min, 0);
    let mx = toNumberSafe(max, 0);
    let c = Math.max(1, Math.min(1000, toNumberSafe(count, 1)));
    if (mx < mn) [mn, mx] = [mx, mn];
    if (unique) c = Math.min(c, mx - mn + 1);
    // Note: non-cryptographic RNG; seed not used (placeholder UI)
    const set = new Set<number>();
    const arr: number[] = [];
    while (arr.length < c) {
      const r = randomInt(mn, mx);
      if (unique) {
        if (!set.has(r)) { set.add(r); arr.push(r); }
      } else {
        arr.push(r);
      }
    }
    return arr;
  }, [min, max, count, unique, seed]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Min</label>
          <input className="input" type="number" value={min} onChange={(e)=>setMin(e.target.value)} />
        </div>
        <div>
          <label className="label">Max</label>
          <input className="input" type="number" value={max} onChange={(e)=>setMax(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Count</label>
          <input className="input" type="number" min={1} max={1000} value={count} onChange={(e)=>setCount(e.target.value)} />
        </div>
        <div style={{ alignSelf: 'end' }}>
          <label className="checkbox">
            <input type="checkbox" checked={unique} onChange={(e)=>setUnique(e.target.checked)} />
            <span style={{ marginLeft: 8 }}>Unique values</span>
          </label>
        </div>
      </div>
      <div className="result">
        <div><strong>Result:</strong> {out.join(', ')}</div>
      </div>
      <small className="muted">For cryptographic needs, use a secure RNG. This is for general purposes.</small>
    </div>
  );
}

