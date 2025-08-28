import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import StreamingBandwidthClient from '@/lib/clients/StreamingBandwidthClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Streaming Bandwidth Calculator – ${year}`,
    description: `Estimate streaming throughput and capacity needs from bitrate and concurrency.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/streaming-bandwidth` }
  };
}

export default function StreamingBandwidthPage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Streaming Bandwidth Calculator</h1>
      <StreamingBandwidthClient lang={lang} />
      <FaqHowToClient lang={lang} slug="streaming-bandwidth" />
    </div>
  );
}

