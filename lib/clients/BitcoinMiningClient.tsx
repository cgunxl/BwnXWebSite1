"use client";

import { useMemo, useState } from 'react';
import { t, getCurrencyForLang } from '@/lib/i18n';
import { toNumberSafe } from '@/lib/number';

// Simplified mining revenue model (ignores pool fees, difficulty drift intra-day)
export default function BitcoinMiningClient({ lang }: { lang: string }) {
  const [hashRate, setHashRate] = useState<number>(100); // TH/s
  const [networkHashRate, setNetworkHashRate] = useState<number>(600_000_000); // TH/s (example)
  const [blockReward, setBlockReward] = useState<number>(3.125); // BTC
  const [btcPrice, setBtcPrice] = useState<number>(90000);
  const [powerKw, setPowerKw] = useState<number>(3.2);
  const [electricityRate, setElectricityRate] = useState<number>(0.12); // $/kWh

  const currency = getCurrencyForLang(lang);
  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency }), [lang, currency]);

  const blocksPerDay = 144;
  const share = Math.max(0, hashRate) / Math.max(1, networkHashRate);
  const btcPerDay = share * blocksPerDay * blockReward;
  const revenuePerDayFiat = btcPerDay * Math.max(0, btcPrice);
  const energyPerDayKwh = Math.max(0, powerKw) * 24;
  const energyCostPerDay = energyPerDayKwh * Math.max(0, electricityRate);
  const profitPerDay = revenuePerDayFiat - energyCostPerDay;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bm-hash">Miner hashrate (TH/s)</label>
          <input id="bm-hash" className="input" type="number" min={0} step={0.1} value={hashRate} onChange={(e) => setHashRate(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="bm-net">Network hashrate (TH/s)</label>
          <input id="bm-net" className="input" type="number" min={1} step={1000} value={networkHashRate} onChange={(e) => setNetworkHashRate(toNumberSafe(e.target.value, 1))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bm-reward">Block reward (BTC)</label>
          <input id="bm-reward" className="input" type="number" min={0} step={0.0001} value={blockReward} onChange={(e) => setBlockReward(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="bm-price">BTC price</label>
          <input id="bm-price" className="input" type="number" min={0} step={1} value={btcPrice} onChange={(e) => setBtcPrice(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="bm-power">Power (kW)</label>
          <input id="bm-power" className="input" type="number" min={0} step={0.1} value={powerKw} onChange={(e) => setPowerKw(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="bm-rate">Electricity ($/kWh)</label>
          <input id="bm-rate" className="input" type="number" min={0} step={0.001} value={electricityRate} onChange={(e) => setElectricityRate(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="result">
        <div><strong>BTC/day:</strong> {btcPerDay.toFixed(8)}</div>
        <div><strong>Revenue/day:</strong> {nf.format(revenuePerDayFiat)}</div>
        <div><strong>Energy cost/day:</strong> {nf.format(energyCostPerDay)}</div>
        <div><strong>Profit/day:</strong> {nf.format(profitPerDay)}</div>
      </div>
      <small className="muted">Assumes constant difficulty and no pool fees; actual results vary significantly.</small>
    </div>
  );
}

