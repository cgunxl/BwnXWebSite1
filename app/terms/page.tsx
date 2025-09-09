import React from "react";

export const metadata = {
  title: "Terms of Use | BwnXCalculator",
  description: "Understand your rights and responsibilities when using BwnXCalculator in English and Thai.",
};

export default function TermsPage() {
  return (
    <main className="prose mx-auto px-4 py-8">
      {/* English Section */}
      <h1>Terms of Use</h1>
      <p>
        By accessing BwnXCalculator you agree to use the calculators and content
        solely for personal, non-commercial purposes. Results are provided “as
        is” without warranty of any kind. BwnXCalculator is not liable for any
        loss arising from the use of our tools.
      </p>
      <h2>Disclaimer</h2>
      <ul>
        <li>Calculations are approximations and may not replace expert advice.</li>
        <li>You are responsible for verifying outputs before acting upon them.</li>
        <li>Jurisdiction: governed by the laws of Thailand.</li>
      </ul>
      <h2>Advertising Disclosure</h2>
      <p>
        This site earns revenue from CPC ads and affiliate links, which help us
        keep the service free.
      </p>

      {/* Thai Section */}
      <h1>เงื่อนไขการใช้งาน</h1>
      <p>
        เมื่อเข้าถึง BwnXCalculator ถือว่าคุณยอมรับการใช้เครื่องคิดเลขและเนื้อหาภายในเพื่อวัตถุประสงค์ส่วนบุคคลเท่านั้น ผลลัพธ์ทั้งหมดแสดงตามสภาพ (“as is”) โดยไม่มีการรับประกันใด ๆ เว็บไซต์ไม่รับผิดชอบต่อความเสียหายที่เกิดขึ้นจากการใช้งานเครื่องมือของเรา
      </p>
      <h2>ข้อสงวนสิทธิ์</h2>
      <ul>
        <li>ผลการคำนวณเป็นค่าประมาณ ไม่สามารถใช้แทนคำปรึกษาผู้เชี่ยวชาญ</li>
        <li>ผู้ใช้ต้องตรวจสอบความถูกต้องก่อนนำไปใช้จริง</li>
        <li>เขตอำนาจศาล: กฎหมายประเทศไทย</li>
      </ul>
      <h2>การเปิดเผยโฆษณา</h2>
      <p>
        เว็บไซต์นี้มีรายได้จากโฆษณาแบบ CPC และลิงก์ Affiliate เพื่อสนับสนุนการให้บริการฟรี
      </p>
    </main>
  );
}