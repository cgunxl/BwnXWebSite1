"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

export default function NftProfitClient({ lang }: { lang: string }) {
  const [buy, setBuy] = useState<number>(1.2); // ETH
  const [sell, setSell] = useState<number>(1.6); // ETH
  const [royalty, setRoyalty] = useState<number>(0.05);
  const [platformFee, setPlatformFee] = useState<number>(0.025);
  const [ethUsd, setEthUsd] = useState<number>(3500);

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD' }), [lang]);
  const pf = useMemo(() => new Intl.NumberFormat(lang, { style: 'percent', maximumFractionDigits: 2 }), [lang]);

  const proceedsEth = sell * (1 - royalty - platformFee);
  const profitEth = proceedsEth - buy;
  const profitUsd = profitEth * ethUsd;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="nft-buy">Buy (ETH)</label>
          <input id="nft-buy" className="input" type="number" min={0} step={0.0001} value={buy} onChange={(e) => setBuy(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="nft-sell">Sell (ETH)</label>
          <input id="nft-sell" className="input" type="number" min={0} step={0.0001} value={sell} onChange={(e) => setSell(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="nft-roy">Royalty</label>
          <input id="nft-roy" className="input" type="number" min={0} step={0.001} value={royalty} onChange={(e) => setRoyalty(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(royalty)}</small>
        </div>
        <div>
          <label className="label" htmlFor="nft-fee">Platform fee</label>
          <input id="nft-fee" className="input" type="number" min={0} step={0.001} value={platformFee} onChange={(e) => setPlatformFee(toNumberSafe(e.target.value, 0))} />
          <small className="muted">{pf.format(platformFee)}</small>
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="nft-ethusd">ETH/USD</label>
          <input id="nft-ethusd" className="input" type="number" min={0} step={0.01} value={ethUsd} onChange={(e) => setEthUsd(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>Proceeds:</strong> {proceedsEth.toFixed(4)} ETH</div>
        <div><strong>Profit:</strong> {profitEth.toFixed(4)} ETH ({nf.format(profitUsd)})</div>
      </div>
      <small className="muted">Excludes gas fees and slippage; royalty/platform fee applied on sale.</small>
    </div>
  );
}

