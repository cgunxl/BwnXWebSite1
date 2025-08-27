"use client";

import { useEffect, useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

export default function EthGasClient({ lang }: { lang: string }) {
  const [gasPriceGwei, setGasPriceGwei] = useState<number>(30);
  const [gasUsed, setGasUsed] = useState<number>(21000);
  const [ethUsd, setEthUsd] = useState<number>(3500);
  const [autoFetch, setAutoFetch] = useState<boolean>(false);

  const nf = useMemo(() => new Intl.NumberFormat(lang, { style: 'currency', currency: 'USD' }), [lang]);

  useEffect(() => {
    let cancelled = false;
    async function fetchGas() {
      try {
        // Example free endpoint (may rate limit). Replace with your own provider for production.
        const res = await fetch('https://ethgas.watch/api/gas');
        const data = await res.json();
        if (!cancelled && data?.fast?.gwei) setGasPriceGwei(Number(data.fast.gwei));
      } catch {}
    }
    if (autoFetch) fetchGas();
    return () => { cancelled = true; };
  }, [autoFetch]);

  const ethCost = (gasPriceGwei / 1e9) * gasUsed; // ETH
  const usdCost = ethCost * ethUsd;

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="eg-gwei">Gas price (Gwei)</label>
          <input id="eg-gwei" className="input" type="number" min={0} step={0.1} value={gasPriceGwei} onChange={(e) => setGasPriceGwei(toNumberSafe(e.target.value, 0))} />
        </div>
        <div>
          <label className="label" htmlFor="eg-gas">Gas used</label>
          <input id="eg-gas" className="input" type="number" min={0} step={1} value={gasUsed} onChange={(e) => setGasUsed(toNumberSafe(e.target.value, 0))} />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label className="label" htmlFor="eg-eth">ETH/USD</label>
          <input id="eg-eth" className="input" type="number" min={0} step={0.01} value={ethUsd} onChange={(e) => setEthUsd(toNumberSafe(e.target.value, 0))} />
        </div>
        <div style={{display:'flex', alignItems:'flex-end'}}>
          <label className="select" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <input type="checkbox" checked={autoFetch} onChange={(e) => setAutoFetch(e.target.checked)} /> Auto fetch gas
          </label>
        </div>
      </div>
      <div className="result">
        <div><strong>ETH cost:</strong> {ethCost.toFixed(6)} ETH</div>
        <div><strong>USD cost:</strong> {nf.format(usdCost)}</div>
      </div>
      <small className="muted">Based on EIP-1559 style gas cost approximation; excludes priority fee dynamics.</small>
    </div>
  );
}

