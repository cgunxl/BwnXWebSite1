"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { t } from '@/lib/i18n';
import { getLangFromPath } from '@/lib/path';

const CONSENT_KEY = "fh-consent";

type ConsentValue = "accepted" | "declined" | null;

type Props = { onChange?: (consented: boolean) => void };

export default function ConsentBannerClient({ onChange }: Props) {
	const [choice, setChoice] = useState<ConsentValue>(null);
	const [visible, setVisible] = useState(false);
	const pathname = usePathname() || '/';
	const lang = getLangFromPath(pathname);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const stored = localStorage.getItem(CONSENT_KEY) as ConsentValue | null;
		setChoice(stored);
		setVisible(!stored);
		if (stored && onChange) onChange(stored === "accepted");
	}, [onChange]);

	function decide(v: ConsentValue) {
		setChoice(v);
		setVisible(false);
		if (typeof window !== "undefined" && v) {
			localStorage.setItem(CONSENT_KEY, v);
			try {
				window.dispatchEvent(new CustomEvent('fh:consent', { detail: v === 'accepted' }));
			} catch {}
		}
		if (onChange) onChange(v === "accepted");
	}

	if (!visible) return null;

	return (
		<div style={{ position: 'fixed', bottom: 12, left: 12, right: 12, zIndex: 1000 }}>
			<div style={{ maxWidth: 960, margin: '0 auto' }}>
				<div className="card" role="dialog" aria-live="polite" aria-label="Consent">
					<p style={{ marginTop: 0, marginBottom: 8 }}>{t(lang, 'consentMessage')}</p>
					<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
						<button className="button" onClick={() => decide("accepted")}>{t(lang, 'accept')}</button>
						<button className="button ghost" onClick={() => decide("declined")}>{t(lang, 'decline')}</button>
					</div>
				</div>
			</div>
		</div>
	);
}