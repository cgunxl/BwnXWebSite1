"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function BreakEvenClient({ lang }: { lang: string }) {
  const [fixedCost, setFixedCost] = useState<number>(200000);
  const [price, setPrice] = useState<number>(500);
  const [variableCost, setVariableCost] = useState<number>(200);

  const units = Math.max(0, Math.ceil(fixedCost / Math.max(1e-9, price - variableCost)));

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="be-fixed">Fixed cost</label>
          <input id="be-fixed" className="input" type="number" min={0} value={fixedCost} onChange={(e) => setFixedCost(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="be-price">Unit price</label>
          <input id="be-price" className="input" type="number" min={0} step={1} value={price} onChange={(e) => setPrice(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="be-var">Variable cost/unit</label>
          <input id="be-var" className="input" type="number" min={0} step={1} value={variableCost} onChange={(e) => setVariableCost(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Break-even units:</strong> {units}</div>
      </div>
      <small className="muted">Break-even units = Fixed cost / (Unit price − Variable cost).</small>
    </div>
  );
}

