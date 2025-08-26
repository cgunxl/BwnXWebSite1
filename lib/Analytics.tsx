"use client";

import { useEffect, useRef, useState } from 'react';

const CONSENT_KEY = "fh-consent";

function hasConsent(): boolean {
	if (typeof window === 'undefined') return false;
	return localStorage.getItem(CONSENT_KEY) === 'accepted';
}

export default function Analytics() {
	const [enabled, setEnabled] = useState(false);
	const injectedRef = useRef(false);

	useEffect(() => {
		setEnabled(hasConsent() && !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
		function onConsent(evt: Event) {
			try {
				const consented = (evt as any).detail === true;
				setEnabled(consented && !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
			} catch {}
		}
		window.addEventListener('fh:consent', onConsent as any);
		return () => window.removeEventListener('fh:consent', onConsent as any);
	}, []);

	useEffect(() => {
		if (!enabled || injectedRef.current) return;
		const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;
		const s1 = document.createElement('script');
		s1.async = true;
		s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
		document.head.appendChild(s1);

		const s2 = document.createElement('script');
		s2.innerHTML = `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${id}', { anonymize_ip: true });`;
		document.head.appendChild(s2);

		injectedRef.current = true;
	}, [enabled]);

	return null;
}