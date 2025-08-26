"use client";

import { useEffect, useRef, useState } from 'react';

const CONSENT_KEY = "fh-consent";

function hasConsent(): boolean {
	if (typeof window === 'undefined') return false;
	return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

type Props = {};

export default function AdsClient({}: Props) {
	const [enabled, setEnabled] = useState(false);
	const injectedRef = useRef(false);

	useEffect(() => {
		const src = process.env.NEXT_PUBLIC_ADS_SCRIPT_SRC;
		setEnabled(hasConsent() && !!src);
		function onConsent(evt: Event) {
			try {
				const consented = (evt as any).detail === true;
				setEnabled(consented && !!src);
			} catch {}
		}
		window.addEventListener('fh:consent', onConsent as any);
		return () => window.removeEventListener('fh:consent', onConsent as any);
	}, []);

	useEffect(() => {
		if (!enabled || injectedRef.current) return;
		const scriptSrc = process.env.NEXT_PUBLIC_ADS_SCRIPT_SRC!;
		const s = document.createElement('script');
		s.async = true;
		s.src = scriptSrc;
		s.setAttribute('data-ad-top', 'ad-top');
		s.setAttribute('data-ad-bottom', 'ad-bottom');
		document.body.appendChild(s);
		injectedRef.current = true;
		// persist ads; no cleanup
	}, [enabled]);

	return null;
}