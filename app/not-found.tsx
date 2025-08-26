export default function NotFound() {
  return (
    <div className="page-enter page-enter-active">
      <h1>Page not found</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <div className="footer-nav" style={{marginTop: 12}}>
        <a className="button ghost" href="/en">Home</a>
        <a className="button ghost" href="/en/loan">Loan</a>
        <a className="button ghost" href="/en/mortgage">Mortgage</a>
        <a className="button ghost" href="/en/tax">Tax</a>
        <a className="button ghost" href="/en/insurance">Insurance</a>
      </div>
    </div>
  );
}