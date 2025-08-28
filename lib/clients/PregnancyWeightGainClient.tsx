"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function PregnancyWeightGainClient({ lang }: { lang: string }) {
  const [preBmi, setPreBmi] = useState<number>(22);
  const [weeks, setWeeks] = useState<number>(20);

  const recommended = useMemo(() => {
    // Institute of Medicine guidelines (approx):
    // Underweight (BMI <18.5): 12.5–18 kg total; Normal (18.5–24.9): 11.5–16; Overweight (25–29.9): 7–11.5; Obese (>=30): 5–9
    // First trimester: ~0.5–2 kg; 2nd/3rd: ~0.4–0.5 kg/week (normal)
    const category = preBmi < 18.5 ? 'under' : preBmi < 25 ? 'normal' : preBmi < 30 ? 'over' : 'obese';
    let totalMin = 0, totalMax = 0, weekly = 0.45;
    if (category === 'under') { totalMin = 12.5; totalMax = 18; weekly = 0.5; }
    else if (category === 'normal') { totalMin = 11.5; totalMax = 16; weekly = 0.45; }
    else if (category === 'over') { totalMin = 7; totalMax = 11.5; weekly = 0.3; }
    else { totalMin = 5; totalMax = 9; weekly = 0.23; }
    const firstTri = 2; // kg upper end for simplicity
    const beyondFirst = Math.max(0, weeks - 13);
    const est = Math.max(0, Math.min(totalMax, firstTri + beyondFirst * weekly));
    return { category, totalMin, totalMax, weekly, est };
  }, [preBmi, weeks]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Pre-pregnancy BMI</label>
          <input className="input" type="number" min={10} max={60} step={0.1} value={preBmi} onChange={(e)=>setPreBmi(toNumberSafe(e.target.value, 22))} />
        </div>
        <div>
          <label className="label">Gestational age (weeks)</label>
          <input className="input" type="number" min={4} max={42} step={1} value={weeks} onChange={(e)=>setWeeks(toNumberSafe(e.target.value, 20))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Category:</strong> {recommended.category}</div>
        <div><strong>Recommended total gain:</strong> {recommended.totalMin}–{recommended.totalMax} kg</div>
        <div><strong>Typical weekly gain (2nd/3rd):</strong> ~{recommended.weekly} kg/week</div>
        <div><strong>Estimated gain by week {weeks}:</strong> ~{recommended.est.toFixed(1)} kg</div>
      </div>
      <small className="muted">Guidelines vary; always follow clinician advice, especially for multiple pregnancy or medical conditions.</small>
    </div>
  );
}

