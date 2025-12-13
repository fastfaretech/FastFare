export const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem("ff_token");
  const headers = new Headers(opts.headers || {});
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${BACKEND}${path}`, { ...opts, headers });
  const body = await res.json().catch(() => ({}));

  if (res.status === 401) {
    localStorage.removeItem("ff_token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw Object.assign(new Error(body.message || "API error"), { body, status: res.status });
  }

  return body;
}
