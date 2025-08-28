"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function RectangleAreaClient({ lang }: { lang: string }) {
  const [width, setWidth] = useState<string>('10');
  const [height, setHeight] = useState<string>('5');

  const { area, perimeter, diagonal } = useMemo(() => {
    const w = Math.max(0, toNumberSafe(width, 0));
    const h = Math.max(0, toNumberSafe(height, 0));
    const area = w * h;
    const perimeter = 2 * (w + h);
    const diagonal = Math.sqrt(w * w + h * h);
    return { area, perimeter, diagonal };
  }, [width, height]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Width</label>
          <input className="input" type="number" min={0} value={width} onChange={(e)=>setWidth(e.target.value)} />
        </div>
        <div>
          <label className="label">Height</label>
          <input className="input" type="number" min={0} value={height} onChange={(e)=>setHeight(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Area (w×h):</strong> {area}</div>
        <div><strong>Perimeter (2(w+h)):</strong> {perimeter}</div>
        <div><strong>Diagonal (√(w²+h²)):</strong> {diagonal}</div>
      </div>
    </div>
  );
}

