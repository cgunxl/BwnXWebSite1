export default function TermsPage({ params }: { params: { locale: string } }) {
  const en = params.locale === 'en';
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{en ? 'Terms of Use' : 'เงื่อนไขการใช้งาน'}</h1>
      <ul>
        <li>{en ? 'Results are general estimates and not professional advice.' : 'ผลลัพธ์เป็นการประมาณทั่วไป ไม่ใช่คำแนะนำจากผู้เชี่ยวชาญ'}</li>
        <li>{en ? 'You are responsible for how you use the results.' : 'ผู้ใช้รับผิดชอบต่อการนำผลลัพธ์ไปใช้'}</li>
        <li>{en ? 'We are not liable for damages arising from use of the site.' : 'เว็บไซต์ไม่รับผิดชอบต่อความเสียหายที่เกิดจากการใช้งาน'}</li>
        <li>{en ? 'This site may earn from CPC ads or affiliate links.' : 'เว็บไซต์มีรายได้จากโฆษณา CPC หรือ Affiliate'}</li>
        <li>{en ? 'Jurisdiction: Thailand.' : 'เขตอำนาจศาล: ประเทศไทย'}</li>
      </ul>
    </article>
  );
}

