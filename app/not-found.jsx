import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="t-display mt-6">
        Page <em>not found</em>
      </h1>
      <p className="t-lead mx-auto mt-6 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary btn-lg mt-10 px-8">
        Back to home
      </Link>
    </div>
  );
}