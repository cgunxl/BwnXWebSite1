"use client";

import { useMemo, useState } from 'react';

function parseNumbers(input: string): number[] {
  return input.split(/[^-+0-9.eE]+/).filter(Boolean).map(Number).filter((n) => Number.isFinite(n)).sort((a,b)=>a-b);
}

function median(nums: number[]): number {
  if (!nums.length) return 0;
  const mid = Math.floor(nums.length / 2);
  if (nums.length % 2 === 0) return (nums[mid - 1] + nums[mid]) / 2;
  return nums[mid];
}

function modes(nums: number[]): number[] {
  if (!nums.length) return [];
  const counts = new Map<number, number>();
  for (const n of nums) counts.set(n, (counts.get(n) || 0) + 1);
  const max = Math.max(...counts.values());
  const ms = Array.from(counts.entries()).filter(([_, c]) => c === max).map(([n]) => n);
  return ms;
}

export default function MedianModeClient({ lang }: { lang: string }) {
  const [raw, setRaw] = useState<string>('1, 2, 2, 3, 4');
  const nums = useMemo(() => parseNumbers(raw), [raw]);
  const med = useMemo(() => median(nums), [nums]);
  const modeList = useMemo(() => modes(nums), [nums]);
  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="label" htmlFor="mm-input">Numbers</label>
          <textarea id="mm-input" className="input" rows={4} value={raw} onChange={(e) => setRaw(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Median:</strong> {med}</div>
        <div><strong>Mode:</strong> {modeList.length ? modeList.join(', ') : '—'}</div>
      </div>
    </div>
  );
}

