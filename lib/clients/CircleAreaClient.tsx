"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function CircleAreaClient({ lang }: { lang: string }) {
  const [radius, setRadius] = useState<string>('10');

  const { area, circumference, diameter } = useMemo(() => {
    const r = Math.max(0, toNumberSafe(radius, 0));
    const area = Math.PI * r * r;
    const circumference = 2 * Math.PI * r;
    const diameter = 2 * r;
    return { area, circumference, diameter };
  }, [radius]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Radius (r)</label>
          <input className="input" type="number" min={0} value={radius} onChange={(e)=>setRadius(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Area (πr²):</strong> {area}</div>
        <div><strong>Circumference (2πr):</strong> {circumference}</div>
        <div><strong>Diameter (2r):</strong> {diameter}</div>
      </div>
    </div>
  );
}

