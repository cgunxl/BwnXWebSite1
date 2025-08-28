"use client";

import { useMemo, useState } from 'react';

function parseInts(input: string): number[] {
  return input.split(/[^-+0-9]+/).filter(Boolean).map((s)=>parseInt(s,10)).filter((n)=>Number.isFinite(n));
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.trunc(a));
  b = Math.abs(Math.trunc(b));
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a / gcd(a,b) * b);
}

function gcdAll(nums: number[]): number {
  if (!nums.length) return 0;
  return nums.reduce((acc, n) => gcd(acc, n));
}

function lcmAll(nums: number[]): number {
  if (!nums.length) return 0;
  return nums.reduce((acc, n) => lcm(acc, n));
}

export default function GcfLcmClient({ lang, mode }: { lang: string; mode: 'gcf'|'lcm' }) {
  const [raw, setRaw] = useState<string>('12, 18, 30');
  const nums = useMemo(() => parseInts(raw), [raw]);
  const value = useMemo(() => (mode === 'gcf' ? gcdAll(nums) : lcmAll(nums)), [nums, mode]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="label">Numbers</label>
          <input className="input" value={raw} onChange={(e)=>setRaw(e.target.value)} placeholder="e.g., 12, 18, 30" />
        </div>
      </div>
      <div className="result">
        <div><strong>{mode === 'gcf' ? 'GCF' : 'LCM'}:</strong> {value}</div>
      </div>
    </div>
  );
}

