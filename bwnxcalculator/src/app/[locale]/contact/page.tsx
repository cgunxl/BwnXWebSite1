export default function ContactPage({ params }: { params: { locale: string } }) {
  const en = params.locale === 'en';
  return (
    <article className="prose prose-invert max-w-none">
      <h1>{en ? 'Contact' : 'ติดต่อเรา'}</h1>
      <p>{en ? 'Have feedback or questions?' : 'มีข้อเสนอแนะหรือคำถาม?'}</p>
      <p>
        {en ? 'Email:' : 'อีเมล:'} <a href="mailto:cgunxlcb@gmail.com">cgunxlcb@gmail.com</a>
      </p>
    </article>
  );
}

