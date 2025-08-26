"use client";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <div className="page-enter page-enter-active">
      <h1>Something went wrong</h1>
      <p className="muted">An unexpected error occurred. Please try again.</p>
      {error?.digest ? <small className="muted">Error ID: {error.digest}</small> : null}
      <div style={{marginTop: 12}}>
        <button className="button" onClick={() => reset()}>Try again</button>
      </div>
    </div>
  );
}