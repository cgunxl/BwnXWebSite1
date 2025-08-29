import { Inter } from "next/font/google";
import Link from "next/link";

export default function Home() {
  const categories = [
    { slug: "finance", name: "Finance" },
    { slug: "health", name: "Health" },
    { slug: "education", name: "Education" },
    // add more later
  ];
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-3xl font-bold">BwnX Free Calculator</h1>
      <ul className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/${cat.slug}`}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
