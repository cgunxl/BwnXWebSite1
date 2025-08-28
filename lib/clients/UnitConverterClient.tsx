"use client";

import { useMemo, useState } from 'react';
import { convert, ConverterCategory, getUnits, UnitDef } from '@/lib/converters';
import { toNumberSafe } from '@/lib/number';

export default function UnitConverterClient({ lang, category }: { lang: string; category: ConverterCategory }) {
  const units: UnitDef[] = useMemo(() => getUnits(category), [category]);
  const [fromUnit, setFromUnit] = useState<string>(units[0].key);
  const [toUnit, setToUnit] = useState<string>(units[1]?.key || units[0].key);
  const [value, setValue] = useState<number>(1);

  const result = useMemo(() => convert(category, value, fromUnit, toUnit), [category, value, fromUnit, toUnit]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">From</label>
          <select className="input" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {units.map((u) => (
              <option key={u.key} value={u.key}>{u.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">To</label>
          <select className="input" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {units.map((u) => (
              <option key={u.key} value={u.key}>{u.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label">Value</label>
          <input className="input" type="number" value={value} onChange={(e) => setValue(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Result:</strong> {Number.isFinite(result) ? result.toPrecision(8).replace(/\.0+$/,'') : '—'}</div>
      </div>
    </div>
  );
}

