import React from "react";

export const metadata = {
  title: "About | BwnXCalculator",
  description: "Mission and vision of BwnXCalculator calculator hub in English and Thai.",
};

export default function AboutPage() {
  return (
    <main className="prose mx-auto px-4 py-8">
      {/* English Section */}
      <h1>About BwnXCalculator</h1>
      <p>
        BwnXCalculator is a multilingual calculator hub designed to simplify complex
        computations for users worldwide. Our mission is to deliver accurate, fast,
        and accessible calculation tools across finance, health, education, and
        everyday life. We envision becoming the world’s most trusted destination
        for data-driven decision-making.
      </p>
      <h2>Mission</h2>
      <p>
        Make sophisticated calculations effortless so that anyone—regardless of age
        or technical skill—can obtain reliable answers in seconds.
      </p>
      <h2>Vision</h2>
      <p>
        To be the authoritative global resource for calculators, localized content,
        and educational insights that empower better choices.
      </p>

      {/* Thai Section */}
      <h1>เกี่ยวกับ BwnXCalculator</h1>
      <p>
        BwnXCalculator คือศูนย์รวมเครื่องคิดเลขหลายภาษาที่ออกแบบมาเพื่อทำให้การคำนวณซับซ้อนกลายเป็นเรื่องง่ายสำหรับทุกคนทั่วโลก ภารกิจของเราคือการนำเสนอเครื่องมือคำนวณที่แม่นยำ รวดเร็ว และเข้าถึงได้ ครอบคลุมทั้งการเงิน สุขภาพ การศึกษา และไลฟ์สไตล์
      </p>
      <h2>พันธกิจ</h2>
      <p>
        ทำให้การคำนวณที่ซับซ้อนกลายเป็นเรื่องง่ายและเชื่อถือได้ เพื่อให้ใครก็ตาม—ไม่ว่าจะอายุเท่าไรหรือมีทักษะแค่ไหน—สามารถได้ผลลัพธ์ภายในไม่กี่วินาที
      </p>
      <h2>วิสัยทัศน์</h2>
      <p>
        มุ่งสู่การเป็นแหล่งข้อมูลเครื่องคิดเลขและเนื้อหาที่เชื่อถือได้ระดับโลก พร้อมเนื้อหาท้องถิ่นที่ช่วยให้ผู้ใช้ตัดสินใจได้ดีขึ้น
      </p>
    </main>
  );
}