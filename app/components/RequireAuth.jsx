"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "./AuthProvider";
import Spinner from "./Spinner";

export default function RequireAuth({ roles, children }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, pathname, router]);

  if (loading || !user) return <Spinner />;

  if (roles && !roles.includes(role)) {
    return (
      <div className="container-x py-24 text-center">
        <h2 className="t-h2">Access restricted</h2>
        <p className="t-body mt-4">Your account role cannot open this page.</p>
        <Link href="/dashboard" className="btn btn-primary mt-8">
          Back to dashboard
        </Link>
      </div>
    );
  }

  return children;
}