import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to English version by default
  redirect('/en');
}