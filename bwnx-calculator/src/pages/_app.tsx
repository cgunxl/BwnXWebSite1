import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps & { pageProps: { messages?: any } }) {
  return (
    <NextIntlClientProvider messages={pageProps.messages || {}}>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
