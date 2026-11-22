const API = process.env.NEXT_PUBLIC_API_URL;
let cached = { token: null, at: 0 };

export async function getToken() {
  if (cached.token && Date.now() - cached.at < 50 * 60 * 1000) return cached.token;
  const res = await fetch("/api/token", { cache: "no-store" });
  if (!res.ok) return null;
  const data = await res.json();
  cached = { token: data.token, at: Date.now() };
  return data.token;
}

export function clearToken() {
  cached = { token: null, at: 0 };
}

export async function api(path, { method = "GET", body } = {}) {
  const token = await getToken();
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}