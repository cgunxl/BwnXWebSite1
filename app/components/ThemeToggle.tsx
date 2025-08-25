'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark', isDark);
    }
  }, [isDark]);
  return (
    <button aria-label="Toggle theme" className="icon-btn" onClick={() => setIsDark(v => !v)}>
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}

