"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function mifflin(sex: 'male'|'female', weightKg: number, heightCm: number, age: number) {
  return sex === 'male' ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5 : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
}

export default function CalorieClient({ lang }: { lang: string }) {
  const [sex, setSex] = useState<'male'|'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);
  const [activity, setActivity] = useState<number>(1.55); // moderate
  const [goal, setGoal] = useState<'maintain'|'loss-0.5'|'loss-1'|'gain-0.25'|'gain-0.5'>('maintain');

  const bmr = useMemo(() => Math.max(0, mifflin(sex, weightKg, heightCm, age)), [sex, weightKg, heightCm, age]);
  const tdee = useMemo(() => bmr * Math.max(1, activity), [bmr, activity]);

  const dailyCalories = useMemo(() => {
    let base = tdee;
    switch (goal) {
      case 'loss-0.5': base -= 500; break;
      case 'loss-1': base -= 1000; break;
      case 'gain-0.25': base += 250; break;
      case 'gain-0.5': base += 500; break;
    }
    return Math.max(0, base);
  }, [tdee, goal]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cal-sex">Sex</label>
          <select id="cal-sex" className="input" value={sex} onChange={(e) => setSex(e.target.value as any)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="cal-age">Age</label>
          <input id="cal-age" className="input" type="number" min={0} step={1} value={age} onChange={(e) => setAge(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cal-h">Height (cm)</label>
          <input id="cal-h" className="input" type="number" min={0} step={0.1} value={heightCm} onChange={(e) => setHeightCm(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="cal-w">Weight (kg)</label>
          <input id="cal-w" className="input" type="number" min={0} step={0.1} value={weightKg} onChange={(e) => setWeightKg(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cal-act">Activity</label>
          <select id="cal-act" className="input" value={activity} onChange={(e) => setActivity(Number(e.target.value))}>
            <option value={1.2}>Sedentary (1.2)</option>
            <option value={1.375}>Light (1.375)</option>
            <option value={1.55}>Moderate (1.55)</option>
            <option value={1.725}>Active (1.725)</option>
            <option value={1.9}>Very Active (1.9)</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="cal-goal">Goal</label>
          <select id="cal-goal" className="input" value={goal} onChange={(e) => setGoal(e.target.value as any)}>
            <option value="maintain">Maintain</option>
            <option value="loss-0.5">Lose ~0.5 kg/week</option>
            <option value="loss-1">Lose ~1 kg/week</option>
            <option value="gain-0.25">Gain ~0.25 kg/week</option>
            <option value="gain-0.5">Gain ~0.5 kg/week</option>
          </select>
        </div>
      </div>
      <div className="result">
        <div><strong>BMR:</strong> {bmr.toFixed(0)} kcal/day</div>
        <div><strong>TDEE:</strong> {tdee.toFixed(0)} kcal/day</div>
        <div><strong>Daily calories:</strong> {dailyCalories.toFixed(0)} kcal/day</div>
      </div>
    </div>
  );
}

