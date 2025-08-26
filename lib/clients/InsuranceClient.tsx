"use client";

import { useMemo, useState } from 'react';
import { calcInsurance } from '@/lib/calculators';
import { t } from '@/lib/i18n';

export default function InsuranceClient({ lang }: { lang: string }) {
  const [amount, setAmount] = useState<number>(100000);
  const [rate, setRate] = useState<number>(0.02);

  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD' }), [lang]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const result = useMemo(() => calcInsurance(amount, rate), [amount, rate]);

  return (
    <div className="card" style={{marginTop: 12}}>
      <div className="form-row">
        <div>
          <div className="label">{t(lang, 'principal')}</div>
          <input className="input" type="number" min={0} value={amount} onChange={(e) => setAmount(parseFloat(e.target.value || '0'))} />
        </div>
        <div>
          <div className="label">{t(lang, 'premiumRate')}</div>
          <input className="input" type="number" min={0} step={0.0001} value={rate} onChange={(e) => setRate(parseFloat(e.target.value || '0'))} />
        </div>
      </div>
      <div className="result">
        <div><strong>{t(lang, 'estimatedPremium')}:</strong> {nf.format(result.premium || 0)} ({pf.format(rate)})</div>
      </div>
    </div>
  );
}