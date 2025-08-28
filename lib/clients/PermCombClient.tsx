"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function factorialBig(n: number): bigint {
  n = Math.floor(n);
  if (n < 0) return 0n;
  let r = 1n;
  for (let i = 2; i <= n; i++) r *= BigInt(i);
  return r;
}

function nPr(n: number, r: number): string {
  n = Math.floor(Math.max(0, n));
  r = Math.floor(Math.max(0, r));
  if (r > n) return '0';
  // nPr = n! / (n-r)!
  let res = 1n;
  for (let i = n; i > n - r; i--) res *= BigInt(i);
  return res.toString();
}

function nCr(n: number, r: number): string {
  n = Math.floor(Math.max(0, n));
  r = Math.floor(Math.max(0, r));
  if (r > n) return '0';
  // symmetry
  if (r > n - r) r = n - r;
  let num = 1n, den = 1n;
  for (let i = 1; i <= r; i++) {
    num *= BigInt(n - r + i);
    den *= BigInt(i);
  }
  // integer division is exact here
  return (num / den).toString();
}

export default function PermCombClient({ lang, mode }: { lang: string; mode: 'perm'|'comb' }) {
  const [n, setN] = useState<string>('10');
  const [r, setR] = useState<string>('3');
  const [withRepetition, setWithRepetition] = useState<boolean>(false);

  const result = useMemo(() => {
    const N = toNumberSafe(n, 0);
    const R = toNumberSafe(r, 0);
    if (mode === 'perm') {
      // permutations with repetition: n^r
      if (withRepetition) return String(BigInt(Math.floor(N)) ** BigInt(Math.floor(R)));
      return nPr(N, R);
    }
    // combinations with repetition: (n+r-1 choose r)
    if (withRepetition) return nCr(N + R - 1, R);
    return nCr(N, R);
  }, [n, r, withRepetition, mode]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">n</label>
          <input className="input" type="number" min={0} step={1} value={n} onChange={(e)=>setN(e.target.value)} />
        </div>
        <div>
          <label className="label">r</label>
          <input className="input" type="number" min={0} step={1} value={r} onChange={(e)=>setR(e.target.value)} />
        </div>
      </div>
      <div className="form-row">
        <label className="checkbox">
          <input type="checkbox" checked={withRepetition} onChange={(e)=>setWithRepetition(e.target.checked)} />
          <span style={{ marginLeft: 8 }}>Allow repetition</span>
        </label>
      </div>
      <div className="result">
        <div><strong>Result:</strong> {result}</div>
      </div>
    </div>
  );
}

