"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function timeFromPace(paceMinPerKm: number, distanceKm: number) {
  const totalMin = Math.max(0, paceMinPerKm) * Math.max(0, distanceKm);
  const h = Math.floor(totalMin / 60);
  const m = Math.floor(totalMin % 60);
  const s = Math.round((totalMin - Math.floor(totalMin)) * 60);
  return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default function MarathonTimeClient({ lang }: { lang: string }) {
  const [paceMin, setPaceMin] = useState<number>(6);
  const [distanceKm, setDistanceKm] = useState<number>(42.195);
  const time = useMemo(() => timeFromPace(paceMin, distanceKm), [paceMin, distanceKm]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="mt-pace">Pace (min/km)</label>
          <input id="mt-pace" className="input" type="number" min={0} step={0.01} value={paceMin} onChange={(e) => setPaceMin(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="mt-dist">Distance (km)</label>
          <input id="mt-dist" className="input" type="number" min={0} step={0.001} value={distanceKm} onChange={(e) => setDistanceKm(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Estimated time:</strong> {time}</div>
      </div>
      <small className="muted">Assumes constant pace; real races vary by course and conditions.</small>
    </div>
  );
}

