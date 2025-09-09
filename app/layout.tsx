import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "BwnXCalculator - Multi-Language Calculator Hub",
  description: "Free online calculators for finance, health, education, math, and lifestyle in 17 languages",
  keywords: "calculator, online calculator, financial calculator, health calculator, math calculator",
  authors: [{ name: "BwnXCalculator Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0B0D10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0B0D10" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="min-h-screen bg-waves">
        <ThemeProvider>
          {/* Background effects */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-waves" />
            <div className="absolute inset-0 scan-lines opacity-20" />
          </div>
          
          {/* Main content */}
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}