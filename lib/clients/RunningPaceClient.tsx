"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function pacePerKm(timeMinutes: number, km: number) {
  const pace = Math.max(0, timeMinutes) / Math.max(0.001, km);
  const m = Math.floor(pace);
  const s = Math.round((pace - m) * 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function RunningPaceClient({ lang }: { lang: string }) {
  const [distanceKm, setDistanceKm] = useState<number>(5);
  const [timeMin, setTimeMin] = useState<number>(30);
  const pace = useMemo(() => pacePerKm(timeMin, distanceKm), [timeMin, distanceKm]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="rp-dist">Distance (km)</label>
          <input id="rp-dist" className="input" type="number" min={0} step={0.1} value={distanceKm} onChange={(e) => setDistanceKm(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="rp-time">Time (min)</label>
          <input id="rp-time" className="input" type="number" min={0} step={0.1} value={timeMin} onChange={(e) => setTimeMin(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Pace:</strong> {pace} min/km</div>
      </div>
    </div>
  );
}

