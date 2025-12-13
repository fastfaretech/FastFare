import React, { useEffect, useState, type JSX } from "react";
import { motion } from "framer-motion";
import ParticleField from "../components/ParticleField";
import { apiFetch } from "../lib/api";
import logo from "../assets/logo.png";

const itemAnim = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };
const GLASS_CARD_DARK =
    "glass-card p-6 rounded-3xl border border-indigo-700/18 backdrop-blur-xl shadow-xl bg-indigo-900/22 text-white";
const GLASS_CARD_LIGHT =
    "glass-card p-6 rounded-3xl border border-indigo-200/40 backdrop-blur-xl shadow-xl bg-white/90 text-black";
const INLINE_BADGE =
    "inline-flex items-center gap-3 bg-indigo-700/12 rounded-full px-5 py-2 border border-indigo-600/12";

// Types for dashboard data
interface PartnerStats {
    assigned?: number;
    awaitingPickup?: number;
    delivered?: number;
    earnings?: number;
    fleetName?: string;
    [key: string]: unknown;
}

interface Task {
    id?: string;
    awb?: string;
    status?: string;
    to?: {
        city?: string;
        address?: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

interface PartnerDashboardResponse extends PartnerStats {
    tasks?: Task[];
}

const NavBar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const links = ["Dashboard", "Tasks", "Collections"];

    return (
        <header className="fixed inset-x-0 top-0 z-30">
            <div className="backdrop-blur-md bg-black/30 border-b border-indigo-700/20">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="FastFare" width={40} height={40} />
                        <div className="text-white font-extrabold text-lg">
                            FastFare — Partner
                        </div>
                    </div>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {links.map((l) => (
                            <a
                                key={l}
                                href="#"
                                className="text-sm text-slate-200 hover:text-white"
                            >
                                {l}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            className="text-slate-200 hover:text-white"
                            onClick={() => (window.location.href = "/login")}
                        >
                            Sign in
                        </button>
                        <button
                            className="px-4 py-2 rounded-lg bg-cyan-500/95 text-black font-semibold shadow-lg hover:scale-105 transition"
                            onClick={() => (window.location.href = "/partner/tasks")}
                        >
                            Open Tasks
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-slate-200 text-2xl"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label="Toggle navigation"
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-indigo-700/30 bg-black/70">
                        <nav className="px-6 py-4 space-y-3">
                            {links.map((l) => (
                                <a
                                    key={l}
                                    href="#"
                                    className="block text-sm text-slate-200 hover:text-white"
                                >
                                    {l}
                                </a>
                            ))}

                            <div className="mt-4 space-y-2">
                                <button
                                    className="block w-full text-left text-slate-200 hover:text-white"
                                    onClick={() => (window.location.href = "/login")}
                                >
                                    Sign in
                                </button>
                                <button
                                    className="block w-full mt-1 px-4 py-2 rounded-lg bg-cyan-500/95 text-black font-semibold shadow-lg"
                                    onClick={() => (window.location.href = "/partner/tasks")}
                                >
                                    Open Tasks
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default function PartnerDashboard(): JSX.Element | null {
    const [mounted, setMounted] = useState<boolean>(false);
    const [stats, setStats] = useState<PartnerStats>({});
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setMounted(true);
        (async () => {
            try {
                const p = (await apiFetch(
                    "/api/v1/partner/dashboard"
                ).catch(() => null)) as PartnerDashboardResponse | null;
                if (p) {
                    setStats(p);
                    setTasks(p.tasks || []);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (!mounted) return null;

    return (
        <>
            <NavBar />

            <main className="pt-28 min-h-screen bg-gradient-to-br from-brand-900 via-slate-900 to-black text-white relative overflow-hidden">
                <ParticleField />

                <section className="container mx-auto px-6 pb-16 relative z-10">
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Overview Card */}
                            <div className={GLASS_CARD_DARK}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className={INLINE_BADGE}>
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                            <span className="text-sm font-semibold text-slate-200">
                                                Partner Overview
                                            </span>
                                        </div>

                                        <h2 className="mt-4 text-3xl font-black text-white">
                                            Operations
                                        </h2>
                                        <p className="text-slate-200 mt-2">
                                            Assigned tasks, pickups and collections in one place.
                                        </p>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            className="px-4 py-2 bg-indigo-600 rounded-lg text-white font-semibold"
                                            onClick={() =>
                                                (window.location.href = "/partner/tasks")
                                            }
                                        >
                                            Open Tasks
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-white/10 rounded-lg text-white"
                                            onClick={() => {
                                                localStorage.removeItem("ff_token");
                                                window.location.href = "/login";
                                            }}
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                    {[
                                        { label: "Assigned Today", value: stats.assigned },
                                        { label: "Awaiting Pickup", value: stats.awaitingPickup },
                                        { label: "Delivered Today", value: stats.delivered },
                                    ].map((s, i) => (
                                        <div
                                            key={i}
                                            className="p-4 rounded-2xl bg-indigo-900/14 border border-indigo-700/12"
                                        >
                                            <div className="text-xs text-slate-300">{s.label}</div>
                                            <div className="text-2xl font-bold text-white">
                                                {s.value ?? "—"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tasks */}
                            <motion.div
                                initial="hidden"
                                animate="show"
                                variants={itemAnim}
                                className={GLASS_CARD_DARK}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">
                                            Today's Tasks
                                        </h3>
                                        <p className="text-slate-200 text-sm">
                                            Manage pickups and update statuses quickly.
                                        </p>
                                    </div>
                                    <button
                                        className="px-4 py-2 bg-cyan-500 rounded-lg text-black font-semibold"
                                        onClick={() =>
                                            (window.location.href = "/partner/tasks")
                                        }
                                    >
                                        Open Tasks
                                    </button>
                                </div>

                                {/* List */}
                                <div className="mt-6 space-y-3">
                                    {loading ? (
                                        <div className="text-slate-300">Loading tasks…</div>
                                    ) : tasks.length === 0 ? (
                                        <div className="text-slate-300">
                                            No tasks for today.
                                        </div>
                                    ) : (
                                        tasks.slice(0, 6).map((t) => (
                                            <div
                                                key={t.id || t.awb}
                                                className="flex justify-between items-center p-3 rounded-xl bg-indigo-900/12 border border-indigo-700/10"
                                            >
                                                <div>
                                                    <div className="font-medium text-white">
                                                        {t.awb || t.id}
                                                    </div>
                                                    <div className="text-xs text-slate-300">
                                                        {t.to?.city || t.to?.address}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-slate-300">
                                                    {t.status}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>

                            {/* Reconciliation */}
                            <motion.div
                                initial="hidden"
                                animate="show"
                                variants={itemAnim}
                                className={GLASS_CARD_DARK}
                            >
                                <h3 className="text-xl font-bold text-white">
                                    Reconciliation
                                </h3>
                                <p className="text-slate-200 text-sm mt-1">
                                    View recent collections and request payouts.
                                </p>

                                <div className="mt-4 flex gap-2">
                                    <button
                                        className="px-4 py-2 bg-white/10 rounded-lg text-white"
                                        onClick={() =>
                                            (window.location.href = "/partner/collections")
                                        }
                                    >
                                        Collections
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-cyan-500 rounded-lg text-black"
                                        onClick={() =>
                                            (window.location.href = "/partner/payout")
                                        }
                                    >
                                        Request Payout
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Sidebar */}
                        <aside className="space-y-6">
                            {/* Earnings */}
                            <div className={GLASS_CARD_LIGHT}>
                                <div className="text-xs text-slate-700">
                                    Earnings (month)
                                </div>
                                <div className="mt-2 text-black text-2xl">
                                    ₹ {stats.earnings ?? "—"}
                                </div>
                            </div>

                            {/* Fleet */}
                            <div className={GLASS_CARD_LIGHT}>
                                <div className="text-xs text-slate-700">Fleet</div>
                                <div className="mt-2 text-black">
                                    {stats.fleetName || "No fleet set"}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className={GLASS_CARD_LIGHT}>
                                <div className="text-xs text-slate-700">
                                    Quick Actions
                                </div>
                                <div className="mt-3 grid gap-2">
                                    <button
                                        className="px-3 py-2 rounded bg-indigo-50 text-slate-900 hover:bg-indigo-100 transition"
                                        onClick={() =>
                                            (window.location.href = "/partner/new-pickup")
                                        }
                                    >
                                        New Pickup
                                    </button>
                                    <button
                                        className="px-3 py-2 rounded bg-indigo-50 text-slate-900 hover:bg-indigo-100 transition"
                                        onClick={() =>
                                            (window.location.href = "/partner/scan")
                                        }
                                    >
                                        Scan & Update
                                    </button>
                                </div>
                            </div>

                            {/* Driver Section */}
                            <div className={GLASS_CARD_LIGHT}>
                                <div className="text-xs text-slate-700">
                                    Driver Section
                                </div>

                                <div className="mt-3 grid gap-4">
                                    <div>
                                        <label className="block text-xs text-slate-600 mb-1">
                                            Driver Name
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 rounded bg-indigo-50 border border-indigo-200 text-slate-900"
                                            placeholder="Enter driver name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs text-slate-600 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            className="w-full px-3 py-2 rounded bg-indigo-50 border border-indigo-200 text-slate-900"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <button
                                        className="px-3 py-2 rounded bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
                                        onClick={() =>
                                            alert("Driver Added! (Backend connection pending)")
                                        }
                                    >
                                        Add Driver
                                    </button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                <footer className="bg-transparent text-slate-300 py-8 border-t border-indigo-700/8 relative z-10">
                    <div className="container mx-auto px-6 text-sm flex justify-between">
                        <div>© 2025 FastFare. All rights reserved.</div>
                        <div className="flex gap-6">
                            <a className="hover:text-white">Privacy</a>
                            <a className="hover:text-white">Terms</a>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
