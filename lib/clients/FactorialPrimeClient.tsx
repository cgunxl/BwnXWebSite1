"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function factorial(n: number): string {
  if (n < 0 || n > 170) return '∞';
  let r = 1;
  for (let i = 2; i <= Math.floor(n); i++) r *= i;
  return String(r);
}

function isPrime(n: number): boolean {
  n = Math.floor(n);
  if (n <= 1) return false; if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export default function FactorialPrimeClient({ mode, lang }: { mode: 'factorial'|'prime'; lang: string }) {
  const [n, setN] = useState<number>(5);
  const result = useMemo(() => mode === 'factorial' ? factorial(n) : (isPrime(n) ? 'Prime' : 'Composite'), [mode, n]);
  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">n</label>
          <input className="input" type="number" min={0} step={1} value={n} onChange={(e)=>setN(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Result:</strong> {result}</div>
      </div>
    </div>
  );
}

