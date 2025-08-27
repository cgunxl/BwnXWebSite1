"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function WaterIntakeClient({ lang }: { lang: string }) {
  const [weightKg, setWeightKg] = useState<number>(70);
  const [minutesExercise, setMinutesExercise] = useState<number>(30);
  const [mlPerKg, setMlPerKg] = useState<number>(35); // guideline: 30–35 ml/kg

  const baseMl = useMemo(() => Math.max(0, weightKg) * Math.max(0, mlPerKg), [weightKg, mlPerKg]);
  const exerciseMl = useMemo(() => Math.max(0, minutesExercise) * 12, [minutesExercise]); // +12 ml per minute
  const totalMl = baseMl + exerciseMl;
  const liters = totalMl / 1000;

  const nf = useMemo(() => new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }), [lang]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="wi-w">Weight (kg)</label>
          <input id="wi-w" className="input" type="number" min={0} step={0.1} value={weightKg} onChange={(e) => setWeightKg(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="wi-min">Exercise (min)</label>
          <input id="wi-min" className="input" type="number" min={0} step={1} value={minutesExercise} onChange={(e) => setMinutesExercise(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="wi-mlkg">ml per kg</label>
          <input id="wi-mlkg" className="input" type="number" min={0} step={1} value={mlPerKg} onChange={(e) => setMlPerKg(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Daily water:</strong> {nf.format(liters)} L ({nf.format(totalMl)} ml)</div>
      </div>
      <small className="muted">General guideline; adjust for climate, pregnancy, and medical advice.</small>
    </div>
  );
}

