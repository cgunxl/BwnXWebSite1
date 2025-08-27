"use client";

import { useMemo, useState } from 'react';
import { t } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

function classifyBmi(bmi: number) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obesity';
}

export default function BmiClient({ lang }: { lang: string }) {
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(65);
  const bmi = useMemo(() => {
    const h = Math.max(0.01, heightCm) / 100;
    return Math.max(0, weightKg) / (h * h);
  }, [heightCm, weightKg]);
  const category = useMemo(() => classifyBmi(bmi), [bmi]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bmi-h">Height (cm)</label>
          <input id="bmi-h" className="input" type="number" min={0} step={0.1} value={heightCm} onChange={(e) => setHeightCm(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="bmi-w">Weight (kg)</label>
          <input id="bmi-w" className="input" type="number" min={0} step={0.1} value={weightKg} onChange={(e) => setWeightKg(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>BMI:</strong> {bmi.toFixed(1)}</div>
        <div><strong>Category:</strong> {category}</div>
      </div>
      <small className="muted">WHO BMI categories.</small>
    </div>
  );
}

