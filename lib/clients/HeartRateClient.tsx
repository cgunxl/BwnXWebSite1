"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function HeartRateClient({ lang }: { lang: string }) {
  const [age, setAge] = useState<number>(30);
  const [resting, setResting] = useState<number>(60);

  const maxHr = useMemo(() => Math.max(0, 220 - Math.max(0, age)), [age]);
  const reserve = useMemo(() => Math.max(0, maxHr - Math.max(0, resting)), [maxHr, resting]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="hr-age">Age</label>
          <input id="hr-age" className="input" type="number" min={0} step={1} value={age} onChange={(e) => setAge(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="hr-rest">Resting HR</label>
          <input id="hr-rest" className="input" type="number" min={0} step={1} value={resting} onChange={(e) => setResting(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Max heart rate (220−age):</strong> {maxHr} bpm</div>
        <div><strong>Heart rate reserve:</strong> {reserve} bpm</div>
      </div>
      <small className="muted">Simple 220−age estimate; athletes may differ.</small>
    </div>
  );
}

