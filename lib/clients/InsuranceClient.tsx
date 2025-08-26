"use client";

import { useMemo, useState } from 'react';
import { calcInsurance } from '@/lib/calculators';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function InsuranceClient({ lang }: { lang: string }) {
  const [amount, setAmount] = useState<number>(100000);
  const [rate, setRate] = useState<number>(0.02);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);
  const result = useMemo(() => calcInsurance(amount, rate), [amount, rate]);

  return (
    <div className="card" style={{marginTop: 12}}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="ins-amount">{t(lang, 'principal')}</label>
          <input id="ins-amount" className="input" type="number" min={0} value={amount} onChange={(e) => setAmount(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="ins-rate">{t(lang, 'premiumRate')}</label>
          <input id="ins-rate" className="input" type="number" min={0} step={0.0001} value={rate} onChange={(e) => setRate(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>{t(lang, 'estimatedPremium')}:</strong> {nf.format(result.premium || 0)} ({pf.format(rate)})</div>
      </div>
    </div>
  );
}