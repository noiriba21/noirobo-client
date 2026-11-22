"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";
import { api, clearToken } from "../lib/api";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export default function AuthProvider({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const [profile, setProfile] = useState(null);
  const [ready, setReady] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      setProfile(await api("/users/me"));
    } catch {
      setProfile(null);
    }
    setReady(true);
  }, []);

  const email = session?.user?.email;

  useEffect(() => {
    if (email) {
      setReady(false);
      loadProfile();
    } else {
      setProfile(null);
      setReady(true);
    }
  }, [email, loadProfile]);

  const logout = async () => {
    clearToken();
    await authClient.signOut();
    setProfile(null);
  };

  const user = session?.user || null;
  const loading = isPending || (!!user && !ready);

  return (
    <Ctx.Provider
      value={{ user, profile, role: profile?.role, loading, logout, refresh: loadProfile }}
    >
      {children}
    </Ctx.Provider>
  );
}