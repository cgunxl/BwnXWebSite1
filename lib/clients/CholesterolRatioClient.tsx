"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function CholesterolRatioClient({ lang }: { lang: string }) {
  const [total, setTotal] = useState<number>(180);
  const [hdl, setHdl] = useState<number>(55);
  const ratio = useMemo(() => (hdl > 0 ? total / hdl : 0), [total, hdl]);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { maximumFractionDigits: 2 }), [lang]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="chol-total">Total cholesterol (mg/dL)</label>
          <input id="chol-total" className="input" type="number" min={0} step={1} value={total} onChange={(e) => setTotal(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="chol-hdl">HDL (mg/dL)</label>
          <input id="chol-hdl" className="input" type="number" min={0} step={1} value={hdl} onChange={(e) => setHdl(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Total/HDL ratio:</strong> {nf.format(ratio)}</div>
      </div>
      <small className="muted">For education only; speak with a clinician for interpretation.</small>
    </div>
  );
}

