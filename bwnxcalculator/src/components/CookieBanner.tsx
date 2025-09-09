"use client";
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) setShow(true);
  }, []);
  const handle = (c: 'accept' | 'reject') => {
    localStorage.setItem('cookie_consent', c);
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-[#0F1115] border-t border-stroke-soft text-text-primary">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center gap-3">
        <p className="text-sm text-text-secondary flex-1">We use cookies for analytics and ads. See our <a className="underline" href="/en/privacy">Privacy Policy</a>.</p>
        <div className="flex gap-2">
          <button className="btn-ghost" onClick={() => handle('reject')}>Reject</button>
          <button className="btn-primary" onClick={() => handle('accept')}>Accept</button>
        </div>
      </div>
    </div>
  );
}

