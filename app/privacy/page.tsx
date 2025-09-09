import React from "react";

export const metadata = {
  title: "Privacy Policy | BwnXCalculator",
  description: "Learn how BwnXCalculator handles cookies, analytics, and user data in English and Thai.",
};

export default function PrivacyPage() {
  return (
    <main className="prose mx-auto px-4 py-8">
      {/* English Section */}
      <h1>Privacy Policy</h1>
      <p>
        BwnXCalculator values your privacy. We use cookies exclusively for
        language preference, theme choice, analytics (GA4), and advertising
        analytics (CPC ads). We do not sell or share your personal data with
        third parties. You may disable non-essential cookies at any time via our
        cookie banner or your browser settings.
      </p>
      <h2>Data Collection</h2>
      <ul>
        <li>Anonymous usage statistics via Google Analytics 4.</li>
        <li>Advertising performance data provided by certified ad networks.</li>
        <li>Locale and theme settings stored in your browser for UX purposes.</li>
      </ul>
      <h2>User Safety</h2>
      <p>
        All calculators are offered for informational purposes only and do not
        constitute financial, medical, or legal advice.
      </p>

      {/* Thai Section */}
      <h1>นโยบายความเป็นส่วนตัว</h1>
      <p>
        BwnXCalculator เคารพความเป็นส่วนตัวของผู้ใช้ เราใช้คุกกี้เฉพาะเพื่อจดจำภาษาที่คุณเลือก โหมดสีของธีม สถิติการใช้งาน (Google Analytics 4) และการวิเคราะห์ประสิทธิภาพโฆษณาแบบคลิก (CPC Ads) เราไม่จำหน่ายหรือแบ่งปันข้อมูลส่วนบุคคลใด ๆ ให้บุคคลที่สาม คุณสามารถปิดคุกกี้ที่ไม่จำเป็นได้ตลอดเวลาผ่านแบนเนอร์หรือการตั้งค่าเบราว์เซอร์
      </p>
      <h2>การเก็บข้อมูล</h2>
      <ul>
        <li>สถิติการใช้งานแบบไม่ระบุตัวตนผ่าน Google Analytics 4</li>
        <li>ข้อมูลประสิทธิภาพโฆษณาจากเครือข่ายโฆษณาที่ได้รับการรับรอง</li>
        <li>ค่าภาษาและธีมถูกเก็บไว้ในเบราว์เซอร์ของคุณเพื่อประสบการณ์ใช้งาน</li>
      </ul>
      <h2>ความปลอดภัยของผู้ใช้</h2>
      <p>
        เครื่องคิดเลขทั้งหมดจัดทำขึ้นเพื่อข้อมูลทั่วไปเท่านั้น ไม่ถือเป็นคำแนะนำด้านการเงิน สุขภาพ หรือกฎหมาย
      </p>
    </main>
  );
}