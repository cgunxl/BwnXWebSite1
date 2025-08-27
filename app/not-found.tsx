import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-enter page-enter-active">
      <h1>Page not found</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <div className="footer-nav" style={{marginTop: 12}}>
        <Link className="button ghost" href="/en">Home</Link>
        <Link className="button ghost" href="/en/loan">Loan</Link>
        <Link className="button ghost" href="/en/mortgage">Mortgage</Link>
        <Link className="button ghost" href="/en/tax">Tax</Link>
        <Link className="button ghost" href="/en/insurance">Insurance</Link>
      </div>
    </div>
  );
}