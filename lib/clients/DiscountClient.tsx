"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function DiscountClient({ lang }: { lang: string }) {
  const [price, setPrice] = useState<number>(1500);
  const [discount, setDiscount] = useState<number>(0.15);
  const [extra, setExtra] = useState<number>(0);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const after = price * (1 - Math.max(0, discount)) - Math.max(0, extra);
  const saved = price - after;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="dc-price">Original price</label>
          <input id="dc-price" className="input" type="number" min={0} value={price} onChange={(e) => setPrice(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="dc-discount">Discount</label>
          <input id="dc-discount" className="input" type="number" min={0} step={0.001} value={discount} onChange={(e) => setDiscount(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(discount)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="dc-extra">Extra amount off (coupon)</label>
          <input id="dc-extra" className="input" type="number" min={0} step={1} value={extra} onChange={(e) => setExtra(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Final price:</strong> {nf.format(Math.max(0, after))}</div>
        <div><strong>You save:</strong> {nf.format(Math.max(0, saved))}</div>
      </div>
    </div>
  );
}

