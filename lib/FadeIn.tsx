"use client";

import { useEffect, useState } from 'react';

export default function FadeIn({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setActive(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className={`page-enter ${active ? 'page-enter-active' : ''}`}>
      {children}
    </div>
  );
}