export default function PrivacyPage({ params }: { params: { locale: string } }) {
  const en = params.locale === 'en';
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{en ? 'Privacy Policy' : 'นโยบายความเป็นส่วนตัว'}</h1>
      <p>
        {en
          ? 'This website uses cookies for language preference, theme, analytics (GA4), and ads (CPC networks). We do not sell personal data. You can disable cookies in your browser.'
          : 'เว็บไซต์นี้ใช้คุกกี้เพื่อบันทึกภาษา ธีม การวิเคราะห์ (GA4) และโฆษณา (เครือข่าย CPC) เราไม่ขายข้อมูลส่วนบุคคล ผู้ใช้สามารถปิดคุกกี้ได้จากเบราว์เซอร์'}
      </p>
      <h2>{en ? 'Data Collection' : 'การเก็บข้อมูล'}</h2>
      <ul>
        <li>{en ? 'Language and theme preferences via cookies/localStorage.' : 'ภาษาและธีมผ่านคุกกี้/พื้นที่เก็บข้อมูลภายในเครื่อง'}</li>
        <li>{en ? 'Analytics events via Google Analytics (aggregated).' : 'สถิติเหตุการณ์ผ่าน Google Analytics (แบบรวม)'}</li>
        <li>{en ? 'Ads personalization may use third-party cookies.' : 'การปรับแต่งโฆษณาอาจใช้คุกกี้จากบุคคลที่สาม'}</li>
      </ul>
      <h2>{en ? 'User Safety' : 'ความปลอดภัยของผู้ใช้'}</h2>
      <p>
        {en
          ? 'All calculators are for general information only and not financial, medical, or legal advice.'
          : 'เครื่องคิดเลขเป็นข้อมูลทั่วไป ไม่ใช่คำแนะนำด้านการเงิน สุขภาพ หรือกฎหมาย'}
      </p>
      <p className="text-text-muted text-sm">Contact: cgunxlcb@gmail.com</p>
    </article>
  );
}

