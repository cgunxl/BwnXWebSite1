import { redirect } from 'next/navigation';

export const revalidate = 86400;

export default function Page() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  redirect(`${base}/en`);
}

