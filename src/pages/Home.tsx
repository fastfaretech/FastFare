import { useEffect, useState, type JSX } from "react";
import logo from "../assets/logo.png";

interface User {
  role?: string;
  user?: {
    role?: string;
  };
}

export default function Root(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  const apiFetch = async (endpoint: string): Promise<any> => {
    const token = localStorage.getItem("ff_token");

    const res = await fetch(`http://localhost:3000${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (!res.ok) {
      throw new Error("Not authorized");
    }

    return res.json();
  };

  useEffect(() => {
    (async () => {
      try {
        const me: User = await apiFetch("/api/v1/user/me");

        const role = me?.role || me?.user?.role || "user";

        if (role === "admin") window.location.href = "/dashboard/admin";
        else if (role === "partner" || role === "logistics_partner")
          window.location.href = "/dashboard/partner";
        else window.location.href = "/dashboard/user";
      } catch (e: any) {
        setErr(e?.message || "Not logged in");
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <img src={logo} alt="FastFare" width={64} />
          <div className="mt-4 text-sm text-slate-600">
            Checking your session…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-card p-8 max-w-2xl text-center">
        <img src={logo} alt="FastFare" width={150} className="mx-auto"/>
        <h2 className="mt-1 text-xl font-semibold text-brand-900">
          Welcome to FastFare
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Please login to continue to your dashboard.
        </p>
        <div className="mt-6">
          <a href="/login" className="btn-premium px-6 py-2 inline-block">
            Login
          </a>
        </div>
        {err && <p className="mt-3 text-xs text-red-500">{err}</p>}
      </div>
    </div>
  );
}
