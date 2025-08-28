"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function ProteinIntakeClient({ lang }: { lang: string }) {
  const [weightKg, setWeightKg] = useState<number>(70);
  const [goal, setGoal] = useState<'general'|'weight-loss'|'muscle-gain'|'athlete'>('general');

  const gramsPerKg = useMemo(() => {
    switch (goal) {
      case 'weight-loss': return 1.6;   // evidence-based ranges
      case 'muscle-gain': return 1.8;
      case 'athlete': return 2.0;
      default: return 1.2; // general health
    }
  }, [goal]);

  const target = useMemo(() => Math.max(0, weightKg) * gramsPerKg, [weightKg, gramsPerKg]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="prot-w">Weight (kg)</label>
          <input id="prot-w" className="input" type="number" min={0} step={0.1} value={weightKg} onChange={(e) => setWeightKg(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="prot-goal">Goal</label>
          <select id="prot-goal" className="input" value={goal} onChange={(e) => setGoal(e.target.value as any)}>
            <option value="general">General health (1.2 g/kg)</option>
            <option value="weight-loss">Weight loss (1.6 g/kg)</option>
            <option value="muscle-gain">Muscle gain (1.8 g/kg)</option>
            <option value="athlete">Athlete (2.0 g/kg)</option>
          </select>
        </div>
      </div>
      <div className="result">
        <div><strong>Protein target:</strong> {target.toFixed(0)} g/day</div>
      </div>
    </div>
  );
}

