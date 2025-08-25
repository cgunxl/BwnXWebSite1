import { ImageResponse } from 'next/og';
import type { Locale, Country } from '@/i18n/config';
import { marketOf } from '@/lib/markets';
import { emi } from '@/lib/loan';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage({ params }: { params: { locale: Locale; country: Country } }) {
  const { country } = params;
  const m = marketOf(country);
  const principal = 200000;
  const years = 30;
  const payment = emi(principal, m.exampleAPR, years);

  const FLAGS: Record<string, string> = {
    us: '🇺🇸', mx: '🇲🇽', br: '🇧🇷', de: '🇩🇪', fr: '🇫🇷', jp: '🇯🇵', kr: '🇰🇷', cn: '🇨🇳', th: '🇹🇭', sa: '🇸🇦', in: '🇮🇳', id: '🇮🇩', ru: '🇷🇺'
  };

  return new ImageResponse(
    (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: '#111', color: '#fff', padding: 48, flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 72 }}>{FLAGS[country]}</div>
        <div style={{ fontSize: 56, fontWeight: 700, marginTop: 12 }}>Loan Calculator</div>
        <div style={{ fontSize: 36, marginTop: 8 }}>Monthly: {m.symbol}{payment.toFixed(0)}</div>
        <div style={{ fontSize: 24, opacity: 0.8, marginTop: 8 }}>{principal.toLocaleString()} @ {m.exampleAPR}% for {years} years</div>
      </div>
    ),
    { ...size }
  );
}
