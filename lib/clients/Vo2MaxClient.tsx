"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

// Cooper test: VO2max (ml/kg/min) = (distance_m - 504.9) / 44.73
export default function Vo2MaxClient({ lang }: { lang: string }) {
  const [distanceM, setDistanceM] = useState<number>(2400);
  const vo2 = useMemo(() => (Math.max(0, distanceM) - 504.9) / 44.73, [distanceM]);

  const nf = useMemo(() => new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }), [lang]);
  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="v2m-dist">Distance in 12 min (m)</label>
          <input id="v2m-dist" className="input" type="number" min={0} step={1} value={distanceM} onChange={(e) => setDistanceM(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>VO2max:</strong> {nf.format(vo2)} ml/kg/min</div>
      </div>
      <small className="muted">Cooper test estimate; lab testing provides more accurate VO2max.</small>
    </div>
  );
}

