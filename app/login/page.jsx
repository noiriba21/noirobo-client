"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import AuthCard from "../components/AuthCard";
import Spinner from "../components/Spinner";
import { authClient } from "../lib/auth-client";
import { toast } from "../lib/notify";
import { inputCls } from "../lib/constants";

function LoginForm() {
  const router = useRouter();
  const redirect = useSearchParams().get("redirect") || "/";
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const { error: err } = await authClient.signIn.email({
      email: f.get("email"),
      password: f.get("password"),
    });
    setBusy(false);
    if (err) {
      setError(err.message || "Invalid email or password");
      toast("error", "Login failed");
      return;
    }
    toast("success", "Logged in successfully");
    router.push(redirect);
  };

  const google = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: redirect });
  };

  return (
    <AuthCard
      eyebrow="Welcome back"
      title="Login to NoiROBO"
      footer={
        <>
          New here?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="email" type="email" required placeholder="Email" className={inputCls} />
        <input name="password" type="password" required placeholder="Password" className={inputCls} />
        {error && <p className="text-sm text-error">{error}</p>}
        <button disabled={busy} className="btn btn-primary w-full">
          {busy ? "Please wait..." : "Login"}
        </button>
      </form>
      <div className="divider t-caption my-6">OR</div>
      <button onClick={google} className="btn btn-outline-light w-full">
        <FaGoogle /> Continue with Google
      </button>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  );
}