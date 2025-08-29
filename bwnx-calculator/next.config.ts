import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: [
      "en",
      "es",
      "pt",
      "de",
      "fr",
      "ja",
      "ko",
      "zh",
      "th",
      "ar",
      "hi",
      "id",
      "ru",
      "it",
      "nl",
      "vi",
      "fa",
    ],
    defaultLocale: "en",
    localeDetection: false,
  },
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
