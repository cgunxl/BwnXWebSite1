"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

// YMCA formula approximation using waist for men; for women, hip + waist - neck, simplified
export default function BodyFatClient({ lang }: { lang: string }) {
  const [sex, setSex] = useState<'male'|'female'>('male');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [waistCm, setWaistCm] = useState<number>(85);
  const [neckCm, setNeckCm] = useState<number>(38);
  const [hipCm, setHipCm] = useState<number>(95);

  const bf = useMemo(() => {
    const h = Math.max(1, heightCm);
    if (sex === 'male') {
      return Math.max(0, Math.min(0.6, (waistCm - neckCm) / h)) * 100;
    }
    return Math.max(0, Math.min(0.6, (waistCm + hipCm - neckCm) / (2 * h))) * 100;
  }, [sex, heightCm, waistCm, neckCm, hipCm]);

  const nf = useMemo(() => new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }), [lang]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bf-sex">Sex</label>
          <select id="bf-sex" className="input" value={sex} onChange={(e) => setSex(e.target.value as any)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="bf-h">Height (cm)</label>
          <input id="bf-h" className="input" type="number" min={0} step={0.1} value={heightCm} onChange={(e) => setHeightCm(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bf-waist">Waist (cm)</label>
          <input id="bf-waist" className="input" type="number" min={0} step={0.1} value={waistCm} onChange={(e) => setWaistCm(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="bf-neck">Neck (cm)</label>
          <input id="bf-neck" className="input" type="number" min={0} step={0.1} value={neckCm} onChange={(e) => setNeckCm(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      {sex === 'female' && (
        <div className="form-row">
          <div>
            <label className="label" htmlFor="bf-hip">Hip (cm)</label>
            <input id="bf-hip" className="input" type="number" min={0} step={0.1} value={hipCm} onChange={(e) => setHipCm(toNumberSafe(e.target.value, 0))} />
          </div>
        </div>
      )}
      <div className="result">
        <div><strong>Body fat:</strong> {nf.format(bf)}%</div>
      </div>
      <small className="muted">Approximation for educational use; DEXA/skin-folds are more accurate.</small>
    </div>
  );
}

