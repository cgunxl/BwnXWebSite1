import React from "react";

export const metadata = {
  title: "Contact | BwnXCalculator",
  description: "Get in touch with the BwnXCalculator team via email in English and Thai.",
};

export default function ContactPage() {
  return (
    <main className="prose mx-auto px-4 py-8">
      {/* English Section */}
      <h1>Contact Us</h1>
      <p>
        We welcome feedback, bug reports, and partnership inquiries. Please reach
        out via email and we will reply promptly.
      </p>
      <p>Email: <a href="mailto:cgunxlcb@gmail.com">cgunxlcb@gmail.com</a></p>

      {/* Thai Section */}
      <h1>ติดต่อเรา</h1>
      <p>
        เรายินดีรับฟังความคิดเห็น ข้อเสนอแนะ และข้อผิดพลาดต่าง ๆ หากต้องการติดต่อทีมงาน สามารถส่งอีเมลมาได้ที่
      </p>
      <p>อีเมล: <a href="mailto:cgunxlcb@gmail.com">cgunxlcb@gmail.com</a></p>
    </main>
  );
}