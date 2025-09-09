export default function AboutPage({ params }: { params: { locale: string } }) {
  const en = params.locale === 'en';
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{en ? 'About BwnXCalculator' : 'เกี่ยวกับ BwnXCalculator'}</h1>
      <p>
        {en
          ? 'BwnXCalculator is a multilingual Calculator Hub covering finance, health, education, engineering, and lifestyle. Our mission is to make complex calculations simple, trustworthy, and free.'
          : 'BwnXCalculator คือศูนย์รวมเครื่องคิดเลขหลายภาษาครอบคลุม การเงิน สุขภาพ การศึกษา วิศวกรรม และไลฟ์สไตล์ ภารกิจของเราคือทำให้การคำนวณที่ซับซ้อน กลายเป็นเรื่องง่าย น่าเชื่อถือ และใช้ฟรี'}
      </p>
      <h2>{en ? 'Mission' : 'พันธกิจ'}</h2>
      <p>
        {en
          ? 'Make calculations effortless and accurate for everyone, in 17 languages.'
          : 'ทำให้การคำนวณเป็นเรื่องง่ายและแม่นยำสำหรับทุกคน ครอบคลุม 17 ภาษา'}
      </p>
      <h2>{en ? 'Vision' : 'วิสัยทัศน์'}</h2>
      <p>
        {en
          ? 'Become the most complete Calculator Hub with localized content tailored for each country.'
          : 'เป็น Calculator Hub ที่ครบถ้วนที่สุด พร้อมเนื้อหาที่ปรับตามท้องถิ่นของแต่ละประเทศ'}
      </p>
    </article>
  );
}

