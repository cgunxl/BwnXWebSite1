"use client";

import { useMemo, useState } from 'react';
import { toNumberSafe } from '@/lib/number';

function rollDie(sides: number): number { return Math.floor(Math.random() * sides) + 1; }

export default function DiceClient({ lang }: { lang: string }) {
  const [dice, setDice] = useState<string>('2');
  const [sides, setSides] = useState<string>('6');
  const [modifier, setModifier] = useState<string>('0');

  const result = useMemo(() => {
    const d = Math.max(1, toNumberSafe(dice, 1));
    const s = Math.max(2, toNumberSafe(sides, 6));
    const m = toNumberSafe(modifier, 0);
    const rolls: number[] = [];
    for (let i = 0; i < d; i++) rolls.push(rollDie(s));
    const sum = rolls.reduce((a,b)=>a+b,0) + m;
    return { rolls, sum };
  }, [dice, sides, modifier]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div>
          <label className="label">Dice (count)</label>
          <input className="input" type="number" min={1} value={dice} onChange={(e)=>setDice(e.target.value)} />
        </div>
        <div>
          <label className="label">Sides</label>
          <input className="input" type="number" min={2} value={sides} onChange={(e)=>setSides(e.target.value)} />
        </div>
        <div>
          <label className="label">Modifier</label>
          <input className="input" type="number" value={modifier} onChange={(e)=>setModifier(e.target.value)} />
        </div>
      </div>
      <div className="result">
        <div><strong>Rolls:</strong> {result.rolls.join(', ')}</div>
        <div><strong>Total:</strong> {result.sum}</div>
      </div>
    </div>
  );
}

