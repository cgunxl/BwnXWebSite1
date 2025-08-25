'use client';

import { useMemo, useState } from 'react';
import { t } from '../../lib/i18n';
import { calcInsurance } from '../../lib/calculators';

export default function InsuranceEstimator({ lang }: { lang: string }) {
  const [amount, setAmount] = useState<number>(100000);
  const [rate, setRate] = useState<number>(2);
  const result = useMemo(() => calcInsurance(amount || 0, rate || 0), [amount, rate]);
  const nf = useMemo(() => new Intl.NumberFormat(lang), [lang]);
  return (
    <div className="grid">
      <div className="card half">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label className="label">{t(lang,'insuredAmount')}</label>
            <input className="input" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} min={0} step="1000" />
          </div>
          <div className="field">
            <label className="label">{t(lang,'premiumRate')}</label>
            <input className="input" type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} min={0} step="0.1" />
          </div>
          <p className="muted" style={{marginTop:6}}>{t(lang,'disclaimerInsurance')}</p>
        </form>
      </div>
      <div className="card half">
        <div className="result">
          <div><strong>{t(lang,'estimatedPremium')}:</strong> {nf.format(result.premium || 0)}</div>
        </div>
      </div>
    </div>
  );
}

