"use client";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    // Determine locale from <html lang> or navigator
    setLang(document.documentElement.lang || navigator.language.slice(0, 2));
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const handle = (choice: "accept" | "reject") => {
    localStorage.setItem("cookie_consent", choice);
    setVisible(false);
    if (choice === "accept") {
      // Dispatch event so layout can load scripts
      window.dispatchEvent(new CustomEvent("cookie-consent-granted"));
    }
  };

  if (!visible) return null;

  const msg = {
    en: {
      text: "We use cookies for analytics and ads. You can opt out anytime.",
      accept: "Accept",
      reject: "Reject",
    },
    th: {
      text: "เว็บไซต์นี้ใช้คุกกี้เพื่อวิเคราะห์การใช้งานและโฆษณา คุณสามารถปฏิเสธได้ตลอดเวลา",
      accept: "ยอมรับ",
      reject: "ปฏิเสธ",
    },
  } as const;
  const copy = msg[lang as keyof typeof msg] || msg.en;

  return (
    <div className="fixed bottom-0 inset-x-0 bg-surface-1 text-text-primary shadow-lg px-4 py-3 flex flex-col sm:flex-row items-center gap-4 z-50">
      <p className="flex-1 text-sm">{copy.text}</p>
      <div className="flex gap-2">
        <button
          onClick={() => handle("reject")}
          className="btn-ghost px-3 py-1 rounded">
          {copy.reject}
        </button>
        <button
          onClick={() => handle("accept")}
          className="btn-primary px-3 py-1 rounded">
          {copy.accept}
        </button>
      </div>
    </div>
  );
}