import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import calculators from "@/data/calculators/index";
import { CalculatorMeta } from "@/types/calculator";
import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import { readFileSync } from "fs";
import path from "path";

interface Props {
  calculator: CalculatorMeta;
  messages: any;
  locale: string;
}

export default function CalculatorPage({ calculator, messages, locale }: Props) {
  const Component = dynamic(() => import(`@/components/calculators/${calculator.component}`), { ssr: false });
  return (
    <NextIntlClientProvider messages={messages} locale={locale} timeZone="UTC">
      <main className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{calculator.locales[locale].name}</h1>
        <Component />
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">FAQ</h2>
          <ul className="space-y-2">
            {calculator.locales[locale].faq.map((q, i) => (
              <li key={i}>
                <details>
                  <summary className="cursor-pointer font-medium">{q.question}</summary>
                  <p className="mt-1 ml-4">{q.answer}</p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </NextIntlClientProvider>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: any[] = [];
  calculators.forEach((calc) => {
    Object.keys(calc.locales).forEach((loc) => {
      paths.push({ params: { locale: loc, slug: calc.slug } });
    });
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug, locale } = params as { slug: string; locale: string };
  const calculator = calculators.find((c) => c.slug === slug);
  if (!calculator) return { notFound: true };
  const messagesPath = path.join(process.cwd(), `src/locales/${locale}/common.json`);
  const messages = JSON.parse(readFileSync(messagesPath, "utf8"));
  return {
    props: {
      calculator,
      messages,
      locale,
    },
  };
};