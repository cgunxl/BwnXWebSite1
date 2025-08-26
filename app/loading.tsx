export default function RootLoading() {
  return (
    <div className="container" aria-busy="true" aria-live="polite">
      <div className="card" style={{marginTop: 12}}>
        <div style={{height: 18, width: '50%', background: 'var(--border)', borderRadius: 6}} />
        <div style={{height: 12, width: '80%', background: 'var(--border)', borderRadius: 6, marginTop: 8}} />
        <div style={{height: 12, width: '60%', background: 'var(--border)', borderRadius: 6, marginTop: 8}} />
      </div>
    </div>
  );
}