"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function MacroClient({ lang }: { lang: string }) {
  const [calories, setCalories] = useState<number>(2000);
  const [proteinPct, setProteinPct] = useState<number>(0.3);
  const [fatPct, setFatPct] = useState<number>(0.25);

  const carbsPct = useMemo(() => {
    const p = Math.max(0, proteinPct);
    const f = Math.max(0, fatPct);
    return Math.max(0, 1 - p - f);
  }, [proteinPct, fatPct]);

  const proteinG = useMemo(() => (calories * proteinPct) / 4, [calories, proteinPct]);
  const fatG = useMemo(() => (calories * fatPct) / 9, [calories, fatPct]);
  const carbsG = useMemo(() => (calories * carbsPct) / 4, [calories, carbsPct]);

  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 0 }), [lang]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="mc-cal">Calories</label>
          <input id="mc-cal" className="input" type="number" min={0} step={1} value={calories} onChange={(e) => setCalories(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="mc-pro">Protein %</label>
          <input id="mc-pro" className="input" type="number" min={0} step={0.01} value={proteinPct} onChange={(e) => setProteinPct(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(proteinPct)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="mc-fat">Fat %</label>
          <input id="mc-fat" className="input" type="number" min={0} step={0.01} value={fatPct} onChange={(e) => setFatPct(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(fatPct)}</small>
        </div>
        <div>
          <label className="label">Carbs % (auto)</label>
          <div className="input" aria-readonly>{pf.format(carbsPct)}</div>
        </div>
      </div>
      <div className="result">
        <div><strong>Protein:</strong> {proteinG.toFixed(0)} g</div>
        <div><strong>Fat:</strong> {fatG.toFixed(0)} g</div>
        <div><strong>Carbs:</strong> {carbsG.toFixed(0)} g</div>
      </div>
      <small className="muted">Uses 4/4/9 kcal per gram for protein/carbs/fat.</small>
    </div>
  );
}

