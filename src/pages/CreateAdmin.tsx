import React, { useState, type JSX } from "react";
import logo from "../assets/logo.png";
import ParticleField from "../components/ParticleField";

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export default function CreateAdmin(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "admin",
  });

  const backend = import.meta.env.VITE_BACKEND_URL;

  const handleCreate = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("ff_admin_token");
      if (!token) return alert("Not authorized");

      const res = await fetch(`${backend}/api/v1/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to create admin");
      }

      alert("Admin created successfully!");
      window.location.href = "/admindashboard";
    } catch (err: any) {
      alert(err.message || "Error creating admin");
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 🔥 Particle Background */}
      <ParticleField />

      {/* NAVBAR */}
      <header className="fixed inset-x-0 top-0 z-20">
        <div className="backdrop-blur-md bg-black/30 border-b border-indigo-700/20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} width={40} height={40} alt="FastFare Logo" />
              <div>
                <div className="text-sm font-semibold text-cyan-300">FastFare</div>
                <div className="text-xs text-slate-400">Create Admin Account</div>
              </div>
            </div>
            <button
              className="text-slate-300 hover:text-white"
              onClick={() => (window.location.href = "/admindashboard")}
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      {/* MAIN FORM CARD */}
      <main className="pt-28 relative z-10">
        <div className="max-w-xl mx-auto mt-10 p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Add New Admin</h2>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-slate-200">Full Name</label>
              <input
                className="w-full p-3 rounded-xl bg-slate-900/40 border border-slate-700 text-white"
                placeholder="Admin Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2 text-slate-200">Email ID</label>
              <input
                type="email"
                className="w-full p-3 rounded-xl bg-slate-900/40 border border-slate-700 text-white"
                placeholder="admin@company.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2 text-slate-200">Phone Number</label>
              <input
                className="w-full p-3 rounded-xl bg-slate-900/40 border border-slate-700 text-white"
                placeholder="+91 98765 43210"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2 text-slate-200">Password</label>
              <input
                type="password"
                className="w-full p-3 rounded-xl bg-slate-900/40 border border-slate-700 text-white"
                placeholder="Create password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>
          <button
            onClick={handleCreate}
            className="w-full mt-8 py-3 bg-cyan-400 text-black font-semibold rounded-xl hover:bg-cyan-300 transition"
          >
            Create Admin
          </button>
        </div>
      </main>
    </div>
  );
}
