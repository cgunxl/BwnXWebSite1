"use client";

import { useMemo, useState } from 'react';
import { t } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';
import { usePathname } from 'next/navigation';
import { getCountryFromPath } from '@/lib/path';

function classifyBmiByRegion(bmi: number, region: 'ASIA'|'GLOBAL'): string {
  // WHO Asia thresholds (lower cutoffs)
  if (region === 'ASIA') {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 23) return 'Normal';
    if (bmi < 27.5) return 'Overweight';
    return 'Obesity';
  }
  // WHO global
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obesity';
}

export default function BmiClient({ lang }: { lang: string }) {
  const pathname = usePathname() || '/';
  const country = getCountryFromPath(pathname) || (lang === 'th' || lang === 'zh' || lang === 'ja' || lang === 'ko' || lang === 'vi' || lang === 'id' ? 'th' : 'us');
  const region: 'ASIA'|'GLOBAL' = ['th','cn','jp','kr','vn','id','sg','my','ph','tw','la','mm','kh'].includes(country) ? 'ASIA' : 'GLOBAL';
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(65);
  const bmi = useMemo(() => {
    const h = Math.max(0.01, heightCm) / 100;
    return Math.max(0, weightKg) / (h * h);
  }, [heightCm, weightKg]);
  const category = useMemo(() => classifyBmiByRegion(bmi, region), [bmi, region]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bmi-h">Height (cm)</label>
          <input id="bmi-h" className="input" type="number" min={0} step={0.1} value={heightCm} onChange={(e) => setHeightCm(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="bmi-w">Weight (kg)</label>
          <input id="bmi-w" className="input" type="number" min={0} step={0.1} value={weightKg} onChange={(e) => setWeightKg(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>BMI:</strong> {bmi.toFixed(1)}</div>
        <div><strong>Category:</strong> {category} <small className="muted">({region === 'ASIA' ? 'Asia thresholds' : 'WHO global'})</small></div>
      </div>
      <small className="muted">WHO BMI categories.</small>
    </div>
  );
}

