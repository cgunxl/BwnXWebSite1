"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

// Widmark formula approximation
export default function BacClient({ lang }: { lang: string }) {
  const [weightKg, setWeightKg] = useState<number>(70);
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [drinks, setDrinks] = useState<number>(3); // standard drinks
  const [hours, setHours] = useState<number>(2);

  const r = gender === 'male' ? 0.68 : 0.55;
  const gramsAlcohol = drinks * 14; // 1 standard drink ~14g ethanol
  const bac = useMemo(() => {
    const bodyWaterKg = weightKg * r;
    const raw = (gramsAlcohol / (bodyWaterKg * 1000)) * 100; // %
    const metabolized = 0.015 * Math.max(0, hours);
    return Math.max(0, raw - metabolized);
  }, [weightKg, r, gramsAlcohol, hours]);

  const nf = useMemo(() => new Intl.NumberFormat(lang, { maximumFractionDigits: 3 }), [lang]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bac-g">Gender</label>
          <select id="bac-g" className="input" value={gender} onChange={(e) => setGender(e.target.value as any)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="bac-w">Weight (kg)</label>
          <input id="bac-w" className="input" type="number" min={0} step={0.1} value={weightKg} onChange={(e) => setWeightKg(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bac-d">Drinks</label>
          <input id="bac-d" className="input" type="number" min={0} step={1} value={drinks} onChange={(e) => setDrinks(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="bac-h">Hours</label>
          <input id="bac-h" className="input" type="number" min={0} step={0.1} value={hours} onChange={(e) => setHours(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>BAC (approx):</strong> {nf.format(bac)}%</div>
      </div>
      <small className="muted">Approximation; never drink and drive. Legal limits vary by country.</small>
    </div>
  );
}

