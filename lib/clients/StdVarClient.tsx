"use client";

import { useMemo, useState } from 'react';

function parseNumbers(input: string): number[] {
  return input.split(/[^-+0-9.eE]+/).filter(Boolean).map(Number).filter((n) => Number.isFinite(n));
}

function variance(nums: number[]): number {
  if (!nums.length) return 0;
  const mean = nums.reduce((a,b)=>a+b,0)/nums.length;
  return nums.reduce((a,b)=>a + (b-mean)*(b-mean), 0) / nums.length;
}

function stddev(nums: number[]): number { return Math.sqrt(variance(nums)); }

export default function StdVarClient({ lang }: { lang: string }) {
  const [raw, setRaw] = useState<string>('2, 4, 4, 4, 5, 5, 7, 9');
  const nums = useMemo(() => parseNumbers(raw), [raw]);
  const v = useMemo(() => variance(nums), [nums]);
  const s = useMemo(() => stddev(nums), [nums]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="label" htmlFor="stdvar-input">Numbers</label>
          <textarea id="stdvar-input" className="input" rows={4} value={raw} onChange={(e) => setRaw(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Variance:</strong> {v}</div>
        <div><strong>Std Dev:</strong> {s}</div>
      </div>
    </div>
  );
}

