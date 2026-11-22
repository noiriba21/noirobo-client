"use client";
import { useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import { api } from "../../lib/api";
import { authClient } from "../../lib/auth-client";
import { toast } from "../../lib/notify";
import { inputCls } from "../../lib/constants";

export default function Profile() {
  const { profile, refresh } = useAuth();
  const [f, setF] = useState({
    name: profile?.name || "",
    photo: profile?.photo || "",
    phone: profile?.phone || "",
    address: profile?.address || "",
  });
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api("/users/me", { method: "PATCH", body: f });
      try {
        await authClient.updateUser({ name: f.name, image: f.photo });
      } catch {}
      await refresh();
      toast("success", "Profile updated");
    } catch (err) {
      toast("error", err.message);
    }
    setBusy(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="t-h2">Profile</h1>
      <div className="flex items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={f.photo || "https://placehold.co/96x96/12161c/ff6a1a?text=U"}
          alt="profile"
          className="h-20 w-20 rounded-full border border-white/20 object-cover"
        />
        <div>
          <p className="t-h4">{profile?.name}</p>
          <p className="t-small capitalize">{profile?.role}</p>
        </div>
      </div>
      <form onSubmit={submit} className="card-dark grid gap-4 p-6 sm:grid-cols-2" style={{ transform: "none" }}>
        <label className="t-small">
          Name
          <input required value={f.name} onChange={set("name")} className={`${inputCls} mt-1`} />
        </label>
        <label className="t-small">
          Email
          <input disabled value={profile?.email || ""} className={`${inputCls} mt-1 opacity-60`} />
        </label>
        <label className="t-small">
          Phone number
          <input value={f.phone} onChange={set("phone")} className={`${inputCls} mt-1`} />
        </label>
        <label className="t-small">
          Profile image link
          <input value={f.photo} onChange={set("photo")} className={`${inputCls} mt-1`} />
        </label>
        <label className="t-small sm:col-span-2">
          Address
          <input value={f.address} onChange={set("address")} className={`${inputCls} mt-1`} />
        </label>
        <div className="sm:col-span-2">
          <button disabled={busy} className="btn btn-primary px-8">
            {busy ? "Saving..." : "Update profile"}
          </button>
        </div>
      </form>
    </div>
  );
}