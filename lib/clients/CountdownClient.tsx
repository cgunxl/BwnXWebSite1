"use client";

import { useEffect, useMemo, useState } from 'react';

function diffMs(target: Date, now: Date) {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function CountdownClient({ lang }: { lang: string }) {
  const [target, setTarget] = useState<string>('2025-12-31T23:59:59');
  const targetDate = useMemo(() => new Date(target), [target]);
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeLeft = useMemo(() => diffMs(targetDate, now), [targetDate, now]);

  return (
    <div className="card" style={{ marginTop: 12 }}>
      <div className="form-row">
        <div style={{ gridColumn: '1 / -1' }}>
          <label className="label">Target date & time</label>
          <input className="input" type="datetime-local" value={target} onChange={(e)=>setTarget(e.target.value)} />
        </div>
      </div>
      <div className="result" style={{ fontSize: 18 }}>
        <div><strong>Time left:</strong> {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</div>
      </div>
    </div>
  );
}

