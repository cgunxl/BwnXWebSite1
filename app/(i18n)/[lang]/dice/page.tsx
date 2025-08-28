import type { Metadata } from 'next';
import { getAllLocales } from '@/lib/i18n';
import DiceClient from '@/lib/clients/DiceClient';
import FaqHowToClient from '@/lib/clients/FaqHowToClient';

export const revalidate = 86400;

export async function generateStaticParams() { return getAllLocales().map((lang) => ({ lang })); }

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const { lang } = params;
  const year = new Date().getFullYear();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    title: `Dice Roller – ${year}`,
    description: `Roll N dice with S sides and an optional modifier.`,
    alternates: { canonical: `${origin}${basePath}/${lang}/dice` }
  };
}

export default function DicePage({ params }: { params: { lang: string } }) {
  const { lang } = params;
  return (
    <div className="page-enter page-enter-active">
      <h1>Dice Roller</h1>
      <DiceClient lang={lang} />
      <FaqHowToClient lang={lang} slug="dice" />
    </div>
  );
}

