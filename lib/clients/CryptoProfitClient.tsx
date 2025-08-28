"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function CryptoProfitClient({ lang }: { lang: string }) {
  const [buyPrice, setBuyPrice] = useState<number>(30000);
  const [sellPrice, setSellPrice] = useState<number>(36000);
  const [quantity, setQuantity] = useState<number>(0.5);
  const [feeRate, setFeeRate] = useState<number>(0.001); // 0.1% per trade

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 3 }), [lang]);

  const grossBuy = buyPrice * quantity;
  const grossSell = sellPrice * quantity;
  const fees = grossBuy * feeRate + grossSell * feeRate;
  const profit = grossSell - grossBuy - fees;
  const roi = grossBuy > 0 ? profit / grossBuy : 0;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cp-buy">Buy price</label>
          <input id="cp-buy" className="input" type="number" min={0} value={buyPrice} onChange={(e) => setBuyPrice(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="cp-sell">Sell price</label>
          <input id="cp-sell" className="input" type="number" min={0} value={sellPrice} onChange={(e) => setSellPrice(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="cp-qty">Quantity</label>
          <input id="cp-qty" className="input" type="number" min={0} step={0.00000001} value={quantity} onChange={(e) => setQuantity(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="cp-fee">Exchange fee</label>
          <input id="cp-fee" className="input" type="number" min={0} step={0.0001} value={feeRate} onChange={(e) => setFeeRate(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(feeRate)} per trade</small>
        </div>
      </div>
      <div className="result">
        <div><strong>Buy cost:</strong> {nf.format(grossBuy)}</div>
        <div><strong>Sell proceeds:</strong> {nf.format(grossSell)}</div>
        <div><strong>Fees:</strong> {nf.format(fees)}</div>
        <div><strong>Profit:</strong> {nf.format(profit)}</div>
        <div><strong>ROI:</strong> {pf.format(roi)}</div>
      </div>
      <small className="muted">Excludes slippage, funding, and tax; fee assumption is per side.</small>
    </div>
  );
}

