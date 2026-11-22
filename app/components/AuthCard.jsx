export default function AuthCard({ eyebrow, title, children, footer }) {
  return (
    <div className="container-x flex min-h-[80vh] items-center justify-center py-16">
      <div className="card-dark w-full max-w-md p-8 sm:p-10" style={{ transform: "none" }}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="t-h2 mt-4">{title}</h1>
        <div className="mt-8">{children}</div>
        <div className="t-small mt-8 text-center">{footer}</div>
      </div>
    </div>
  );
}