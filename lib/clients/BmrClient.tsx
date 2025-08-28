"use client";

import { useMemo, useState } from 'react';
import { t } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

function mifflinStJeor(sex: 'male'|'female', weightKg: number, heightCm: number, age: number) {
  // BMR (kcal/day)
  if (sex === 'male') return 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  return 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

export default function BmrClient({ lang }: { lang: string }) {
  const [sex, setSex] = useState<'male'|'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const bmr = useMemo(() => Math.max(0, mifflinStJeor(sex, weightKg, heightCm, age)), [sex, weightKg, heightCm, age]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bmr-sex">Sex</label>
          <select id="bmr-sex" className="input" value={sex} onChange={(e) => setSex(e.target.value as any)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="bmr-age">Age</label>
          <input id="bmr-age" className="input" type="number" min={0} step={1} value={age} onChange={(e) => setAge(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bmr-h">Height (cm)</label>
          <input id="bmr-h" className="input" type="number" min={0} step={0.1} value={heightCm} onChange={(e) => setHeightCm(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="bmr-w">Weight (kg)</label>
          <input id="bmr-w" className="input" type="number" min={0} step={0.1} value={weightKg} onChange={(e) => setWeightKg(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>BMR (kcal/day):</strong> {bmr.toFixed(0)}</div>
      </div>
      <small className="muted">Mifflin–St Jeor equation.</small>
    </div>
  );
}

