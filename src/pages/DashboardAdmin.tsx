import { useEffect, useState, type JSX } from "react";
import ParticleField from "../components/ParticleField";
import { motion } from "framer-motion";
import { Truck, CheckCircle2, Clock, Package, ArrowRight } from "lucide-react";
import { apiFetch } from "../lib/api";
import logo from "../assets/logo.png";

// Types
interface Stats {
    activeUsers?: number;
    shipmentsToday?: number;
    partners?: number;
    apiStatus?: string;
    [key: string]: unknown;
}

interface Admin {
    email: string;
    role?: string;
    [key: string]: unknown;
}

interface AdminListResponse {
    admins: Admin[];
}

// CARD CSS
const cardAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const GLASS_CARD_DARK =
    "glass-card p-6 rounded-3xl border border-indigo-700/18 backdrop-blur-xl shadow-2xl bg-indigo-900/22 text-white";
const GLASS_CARD_LIGHT =
    "glass-card p-6 rounded-3xl border border-indigo-200/40 backdrop-blur-xl shadow-2xl bg-white/90 text-black";
const INLINE_BADGE =
    "inline-flex items-center gap-3 bg-indigo-700/12 rounded-full px-5 py-2 border border-indigo-600/12";

function NavBar(): JSX.Element {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const links = ["Overview", "Partners", "Users", "Shipments"];

    return (
        <header className="fixed inset-x-0 top-0 z-30">
            <div className="backdrop-blur-md bg-black/30 border-b border-indigo-700/20">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={logo}
                            alt="FastFare"
                            width={40}
                            height={40}
                            className="object-contain h-8"
                        />
                        <div className="text-white font-extrabold text-lg">
                            FastFare — Admin
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

                    <div className="hidden md:flex items-center gap-4">
                        <button
                            className="text-slate-200 hover:text-white"
                            onClick={() => (window.location.href = "/login")}
                        >
                            Sign in
                        </button>
                        <button
                            className="px-4 py-2 rounded-lg bg-cyan-500/95 text-black font-semibold shadow-lg hover:scale-105 transition"
                            onClick={() => (window.location.href = "/register")}
                        >
                            Get Started
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-slate-200 text-2xl"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-indigo-700/30">
                        <nav className="px-6 py-4 space-y-3 bg-black/60">
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
                                    className="w-full text-left text-slate-200 hover:text-white"
                                    onClick={() => (window.location.href = "/login")}
                                >
                                    Sign in
                                </button>
                                <button
                                    className="w-full mt-1 px-4 py-2 rounded-lg bg-cyan-500/95 text-black font-semibold shadow-lg"
                                    onClick={() => (window.location.href = "/register")}
                                >
                                    Get Started
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

export default function Page(): JSX.Element | null {
    const [mounted, setMounted] = useState<boolean>(false);
    const [stats, setStats] = useState<Stats>({});
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        (async () => {
            try {
                const s = (await apiFetch(
                    "/api/v1/admin/stats"
                ).catch(() => null)) as Stats | null;
                const a = (await apiFetch(
                    "/api/v1/admin/list-admins"
                ).catch(() => null)) as AdminListResponse | null;

                if (s) setStats(s);
                if (a && Array.isArray(a.admins)) setAdmins(a.admins);
            } catch (e: any) {
                console.error(e);
                setError(e?.message || "Failed to load admin data");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (!mounted) return null;

    const handleCreate = async (): Promise<void> => {
        const email = prompt("New admin email:");
        if (!email) return;
        try {
            await apiFetch("/api/v1/admin/create", {
                method: "POST",
                body: JSON.stringify({ email }),
            });

            alert("Invite sent / admin created.");
            const a = (await apiFetch(
                "/api/v1/admin/list-admins"
            ).catch(() => null)) as AdminListResponse | null;
            if (a && Array.isArray(a.admins)) setAdmins(a.admins);
        } catch (e: any) {
            alert(e?.message || "Failed to create admin");
        }
    };

    return (
        <>
            <NavBar />

            <main className="pt-28 min-h-screen bg-gradient-to-br from-brand-900 via-slate-900 to-black text-white relative overflow-hidden">
                <ParticleField />

                <section className="container mx-auto px-6 pb-16 relative z-10">
                    <div className="grid lg:grid-cols-3 gap-8 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            <div className={GLASS_CARD_DARK}>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className={INLINE_BADGE}>
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                            <span className="text-sm font-semibold text-slate-200">
                                                Platform Stats
                                            </span>
                                        </div>

                                        <h2 className="mt-4 text-3xl font-black text-white">
                                            Overview
                                        </h2>
                                        <p className="text-slate-200 mt-2">
                                            Global metrics and platform health at-a-glance.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() =>
                                                (window.location.href = "/admin/create-admin")
                                            }
                                            className="px-3 py-2 rounded bg-indigo-50 text-slate-900 hover:bg-indigo-100 transition"
                                        >
                                            Add New Admin
                                        </button>
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem("ff_token");
                                                window.location.href = "/login";
                                            }}
                                            className="px-4 py-2 bg-white/10 rounded-lg text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                                    <div className="p-4 rounded-2xl bg-indigo-900/14 border border-indigo-700/12">
                                        <div className="text-xs text-slate-300">Active Users</div>
                                        <div className="text-2xl font-bold text-white">
                                            {stats.activeUsers ?? "—"}
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-indigo-900/14 border border-indigo-700/12">
                                        <div className="text-xs text-slate-300">
                                            Shipments Today
                                        </div>
                                        <div className="text-2xl font-bold text-white">
                                            {stats.shipmentsToday ?? "—"}
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-indigo-900/14 border border-indigo-700/12">
                                        <div className="text-xs text-slate-300">Partners</div>
                                        <div className="text-2xl font-bold text-white">
                                            {stats.partners ?? "—"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                initial="hidden"
                                animate="show"
                                variants={cardAnim}
                                className={GLASS_CARD_DARK}
                            >
                                <h3 className="text-xl font-bold text-white">Admins</h3>
                                <p className="text-slate-200 text-sm mt-1">
                                    Manage administrative users and permissions.
                                </p>

                                <div className="mt-6 space-y-3">
                                    {loading ? (
                                        <div className="text-slate-300">Loading admins…</div>
                                    ) : admins.length === 0 ? (
                                        <div className="text-slate-300">No admins found</div>
                                    ) : (
                                        admins.map((a) => (
                                            <div
                                                key={a.email}
                                                className="flex justify-between items-center p-3 rounded-xl bg-indigo-900/12 border border-indigo-700/10"
                                            >
                                                <div>
                                                    <div className="font-medium text-white">
                                                        {a.email}
                                                    </div>
                                                    <div className="text-xs text-slate-300">
                                                        {a.role || "admin"}
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <button className="px-3 py-1 rounded bg-white/6 text-white">
                                                        Impersonate
                                                    </button>
                                                    <button className="px-3 py-1 rounded bg-white/6 text-white">
                                                        Reset
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        </div>

                        <aside className="space-y-6">
                            <div className={GLASS_CARD_DARK}>
                                <div className="text-xs text-slate-300">Health</div>
                                <div className="mt-2 text-white">
                                    API: {stats.apiStatus ?? "OK"}
                                </div>
                            </div>

                            <div className={GLASS_CARD_LIGHT}>
                                <h4 className="text-black font-semibold">Quick Links</h4>
                                <div className="mt-3 grid gap-2">
                                    <button
                                        onClick={() =>
                                            (window.location.href = "/admin/users")
                                        }
                                        className="flex "
                                    >
                                        Users
                                    </button>
                                    <button
                                        onClick={() =>
                                            (window.location.href = "/admin/partners")
                                        }
                                        className="flex "
                                    >
                                        Partners
                                    </button>
                                    <button
                                        onClick={() =>
                                            (window.location.href = "/admin/shipments")
                                        }
                                        className="flex "
                                    >
                                        Shipments
                                    </button>
                                </div>
                            </div>

                            <div className={GLASS_CARD_DARK}>
                                <h4 className="text-white font-semibold">Recent Trends</h4>
                                <div className="mt-2 text-slate-300 text-sm">
                                    Simple summary — add charts later.
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
