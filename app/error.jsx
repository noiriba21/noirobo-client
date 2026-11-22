"use client";

export default function GlobalError({ reset }) {
  return (
    <div className="container-x py-32 text-center">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="t-h1 mt-6">
        An unexpected <em>error</em> occurred
      </h1>
      <button onClick={() => reset()} className="btn btn-primary btn-lg mt-10 px-8">
        Try again
      </button>
    </div>
  );
}