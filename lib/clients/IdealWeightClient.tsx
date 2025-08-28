"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function devine(sex: 'male'|'female', heightCm: number) {
  const heightIn = heightCm / 2.54;
  const base = sex === 'male' ? 50 : 45.5; // kg
  const overIn = Math.max(0, heightIn - 60);
  return base + 2.3 * overIn;
}

export default function IdealWeightClient({ lang }: { lang: string }) {
  const [sex, setSex] = useState<'male'|'female'>('male');
  const [heightCm, setHeightCm] = useState<number>(175);
  const kg = useMemo(() => devine(sex, heightCm), [sex, heightCm]);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { maximumFractionDigits: 1 }), [lang]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="iw-sex">Sex</label>
          <select id="iw-sex" className="input" value={sex} onChange={(e) => setSex(e.target.value as any)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="iw-h">Height (cm)</label>
          <input id="iw-h" className="input" type="number" min={0} step={0.1} value={heightCm} onChange={(e) => setHeightCm(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Ideal weight:</strong> {nf.format(kg)} kg</div>
      </div>
      <small className="muted">Devine formula; alternatives include Robinson, Miller.</small>
    </div>
  );
}

