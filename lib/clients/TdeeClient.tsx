"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function mifflin(sex: 'male'|'female', weightKg: number, heightCm: number, age: number) {
  return sex === 'male' ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5 : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

export default function TdeeClient({ lang }: { lang: string }) {
  const [sex, setSex] = useState<'male'|'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [activity, setActivity] = useState<number>(1.55); // moderate

  const bmr = useMemo(() => Math.max(0, mifflin(sex, weightKg, heightCm, age)), [sex, weightKg, heightCm, age]);
  const tdee = useMemo(() => bmr * Math.max(1, activity), [bmr, activity]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="tdee-sex">Sex</label>
          <select id="tdee-sex" className="input" value={sex} onChange={(e) => setSex(e.target.value as any)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="tdee-age">Age</label>
          <input id="tdee-age" className="input" type="number" min={0} step={1} value={age} onChange={(e) => setAge(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="tdee-h">Height (cm)</label>
          <input id="tdee-h" className="input" type="number" min={0} step={0.1} value={heightCm} onChange={(e) => setHeightCm(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="tdee-w">Weight (kg)</label>
          <input id="tdee-w" className="input" type="number" min={0} step={0.1} value={weightKg} onChange={(e) => setWeightKg(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="tdee-act">Activity</label>
          <select id="tdee-act" className="input" value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
            <option value={1.2}>Sedentary (1.2)</option>
            <option value={1.375}>Light (1.375)</option>
            <option value={1.55}>Moderate (1.55)</option>
            <option value={1.725}>Active (1.725)</option>
            <option value={1.9}>Very Active (1.9)</option>
          </select>
        </div>
      </div>
      <div className="result">
        <div><strong>BMR:</strong> {bmr.toFixed(0)} kcal/day</div>
        <div><strong>TDEE:</strong> {tdee.toFixed(0)} kcal/day</div>
      </div>
    </div>
  );
}

