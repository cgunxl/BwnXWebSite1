"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function karvonen(rest: number, max: number, intensity: number) {
  const reserve = Math.max(0, max - rest);
  return Math.round(rest + reserve * Math.max(0, Math.min(1, intensity)));
}

export default function TargetHrClient({ lang }: { lang: string }) {
  const [age, setAge] = useState<number>(30);
  const [resting, setResting] = useState<number>(60);
  const [intensity, setIntensity] = useState<number>(0.7);

  const maxHr = useMemo(() => Math.max(0, 220 - Math.max(0, age)), [age]);
  const thr = useMemo(() => karvonen(resting, maxHr, intensity), [resting, maxHr, intensity]);
  const zones = useMemo(() => [0.5, 0.6, 0.7, 0.8, 0.9].map((z) => ({ z, hr: karvonen(resting, maxHr, z) })), [resting, maxHr]);

  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 0 }), [lang]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="thr-age">Age</label>
          <input id="thr-age" className="input" type="number" min={0} step={1} value={age} onChange={(e) => setAge(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="thr-rest">Resting HR</label>
          <input id="thr-rest" className="input" type="number" min={0} step={1} value={resting} onChange={(e) => setResting(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="thr-int">Intensity</label>
          <input id="thr-int" className="input" type="number" min={0} step={0.01} value={intensity} onChange={(e) => setIntensity(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(intensity)}</small>
        </div>
      </div>
      <div className="result">
        <div><strong>Target HR:</strong> {thr} bpm</div>
        <div style={{ marginTop: 8 }}>
          <strong>Zones:</strong>
          <ul>
            {zones.map((z) => (
              <li key={z.z}>{pf.format(z.z)}: {z.hr} bpm</li>
            ))}
          </ul>
        </div>
      </div>
      <small className="muted">Karvonen method; consult a professional for training plans.</small>
    </div>
  );
}

