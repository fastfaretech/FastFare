import { useEffect, useState } from "react";
import ParticleField from "../components/ParticleField";
import logo from "../assets/logo.png";
import { apiFetch } from "../lib/api";

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/api/v1/admin/users");
        setUsers(res.users || []);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="relative bg-slate-950 min-h-screen text-white">
      <ParticleField />

      {/* SAME NAVBAR AS OTHER PAGES */}
      <header className="fixed inset-x-0 top-0 z-30">
        <div className="backdrop-blur-md bg-black/30 border-b border-indigo-700/20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} width={40} height={40} />
              <div className="text-lg font-bold">FastFare — Admin</div>
            </div>
            <button
              className="text-slate-300 hover:text-white"
              onClick={() => (window.location.href = "/admin/dashboard")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="pt-28 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400">All Users</h2>

        {users.map((user, idx) => (
          <div key={idx} className="p-4 mb-2 bg-slate-900/60 rounded">
            {user.name} — {user.email}
          </div>
        ))}
      </main>
    </div>
  );
}
