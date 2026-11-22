"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa6";
import AuthCard from "../components/AuthCard";
import { authClient } from "../lib/auth-client";
import { toast } from "../lib/notify";
import { inputCls } from "../lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password"));

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
      const msg =
        "Password must have an uppercase letter, a lowercase letter and at least 6 characters";
      setError(msg);
      toast("error", "Password requirements not met");
      return;
    }

    setBusy(true);
    const { error: err } = await authClient.signUp.email({
      name: f.get("name"),
      email: f.get("email"),
      password,
      image: f.get("photo"),
    });
    setBusy(false);
    if (err) {
      setError(err.message || "Registration failed");
      toast("error", "Registration failed");
      return;
    }
    toast("success", "Account created successfully");
    router.push("/");
  };

  const google = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <AuthCard
      eyebrow="Join NoiROBO"
      title="Create your account"
      footer={
        <>
          Already registered?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <input name="name" required placeholder="Full name" className={inputCls} />
        <input name="email" type="email" required placeholder="Email" className={inputCls} />
        <input name="photo" type="url" required placeholder="Photo link (direct image URL)" className={inputCls} />
        <input name="password" type="password" required placeholder="Password" className={inputCls} />
        {error && <p className="text-sm text-error">{error}</p>}
        <button disabled={busy} className="btn btn-primary w-full">
          {busy ? "Please wait..." : "Register"}
        </button>
      </form>
      <div className="divider t-caption my-6">OR</div>
      <button onClick={google} className="btn btn-outline-light w-full">
        <FaGoogle /> Continue with Google
      </button>
    </AuthCard>
  );
}