import React, { useEffect, useRef, useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleField from "../components/ParticleField";
import logo from "../assets/logo.png";

import {
    Truck,
    Wallet,
    Bell,
    Shield,
    Clock,
    MapPin,
    Package,
    ArrowRight,
    CheckCircle2,
    Star,
    type LucideIcon,
    Phone,
    Mail,
    Globe,
} from "lucide-react";

// type LucideIcon = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
    rating: number;
}

interface Feature {
    icon: LucideIcon;
    title: string;
    desc: string;
}

interface StatItem {
    value: string;
    label: string;
    icon: LucideIcon;
}

const testimonials: Testimonial[] = [
    {
        quote:
            "FastFare digital wallet system has simplified our payment processes significantly. Fast, secure, and professional service.",
        author: "Amit Patel",
        role: "Logistics Head",
        company: "Healthcare Distributors",
        rating: 5,
    },
    {
        quote:
            "12-hour guaranteed delivery between Delhi-Jaipur changed how we plan inventory. Never going back to traditional logistics.",
        author: "Priya Sharma",
        role: "Operations Director",
        company: "E-Commerce Giant",
        rating: 5,
    },
    {
        quote:
            "Real-time tracking with driver verification gives us complete peace of mind. Best B2B logistics partner we've had.",
        author: "Rajesh Kumar",
        role: "Supply Chain Manager",
        company: "Manufacturing Corp",
        rating: 5,
    },
    {
        quote: "FastFare delivers our shipments reliably every time without fail.",
        author: "Sonal Mehta",
        role: "Procurement Lead",
        company: "Retail Chain",
        rating: 5,
    },
    {
        quote:
            "Transparent pricing and predictable delivery windows — great for our inventory planning.",
        author: "Karan Verma",
        role: "Inventory Manager",
        company: "Electronics Pvt Ltd",
        rating: 5,
    },
    {
        quote: "Verified drivers and quick support make operations frictionless.",
        author: "Nisha Rao",
        role: "Head - Operations",
        company: "Pharma Logistics",
        rating: 5,
    },
];

const features: Feature[] = [
    {
        icon: Wallet,
        title: "Digital Wallet System",
        desc: "Seamless payment processing with instant wallet recharge and transaction history.",
    },
    {
        icon: Bell,
        title: "Instant Notifications",
        desc: "Real-time SMS, email, and push notifications at every milestone.",
    },
    {
        icon: Shield,
        title: "Verified Driver Network",
        desc: "Every driver is background-verified with insurance coverage for maximum security.",
    },
    {
        icon: Truck,
        title: "Live GPS Tracking",
        desc: "Monitor shipments in real-time with accurate ETA predictions and route visualization.",
    },
];

const stats: StatItem[] = [
    { value: "50,000+", label: "Shipments Delivered", icon: Package },
    { value: "1,200+", label: "Happy Businesses", icon: Truck },
    { value: "10 Hours", label: "Avg Delivery Time", icon: Clock },
    { value: "99.2%", label: "On-Time Rate", icon: CheckCircle2 },
];

function LandingPage(): JSX.Element | null {
    const [mounted, setMounted] = useState<boolean>(false);
    const [activeFeature, setActiveFeature] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const autoplayRef = useRef<number | null>(null);
    const featuresCount = features.length;
    const [showCustom, setShowCustom] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
        if (typeof window === "undefined") return;

        const mq = window.matchMedia("(prefers-color-scheme: dark)");

        const apply = (dark: boolean) => {
            if (dark) document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
        };

        apply(mq.matches);

        const onChange = (e: MediaQueryListEvent) => apply(e.matches);

        if (mq.addEventListener) mq.addEventListener("change", onChange);
        else mq.addListener(onChange);

        return () => {
            if (mq.removeEventListener) mq.removeEventListener("change", onChange);
            else mq.removeListener(onChange);
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const delayMs = 4200;
        if (autoplayRef.current) {
            window.clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
        if (!isPaused) {
            autoplayRef.current = window.setInterval(() => {
                setActiveFeature((prev) => (prev + 1) % featuresCount);
            }, delayMs);
        }
        return () => {
            if (autoplayRef.current) {
                window.clearInterval(autoplayRef.current);
                autoplayRef.current = null;
            }
        };
    }, [isPaused, featuresCount]);

    if (!mounted) return null;

    const NavBar: React.FC = () => {
        const [mobileOpen, setMobileOpen] = useState<boolean>(false);

        return (
            <header className="fixed inset-x-0 top-0 z-30">
                <div className="backdrop-blur-md bg-black/30 border-b border-indigo-700/20">
                    <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={logo} alt="FastFare" width={40} height={40} />
                            <div className="text-white font-extrabold text-lg">FastFare</div>
                        </div>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            <a
                                href="/"
                                className="text-white underline underline-offset-8 decoration-cyan-400"
                            >
                                Home
                            </a>
                            <a
                                href="/user/new-shipment"
                                className="text-slate-200 hover:text-white"
                            >
                                Book Shipment
                            </a>
                            <a href="#" className="text-slate-200 hover:text-white">
                                Track
                            </a>
                            <a href="#" className="text-slate-200 hover:text-white">
                                Wallet
                            </a>
                            <a href="#" className="text-slate-200 hover:text-white">
                                Pricing
                            </a>
                            <a href="#" className="text-slate-200 hover:text-white">
                                Contact
                            </a>
                        </nav>

                        {/* Desktop actions */}
                        <div className="hidden md:flex items-center gap-4">
                            <a
                                href="/login"
                                className="text-slate-200 hover:text-white"
                            >
                                Sign in
                            </a>
                            <a
                                href="/register"
                                className="px-4 py-2 rounded-lg bg-cyan-500/95 text-black font-semibold shadow-lg hover:scale-105 transition"
                            >
                                Get Started
                            </a>
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
                                <a href="/" className="block text-slate-200 hover:text-white">
                                    Home
                                </a>
                                <a
                                    href="/user/new-shipment"
                                    className="block text-slate-200 hover:text-white"
                                >
                                    Book Shipment
                                </a>
                                <a href="#" className="block text-slate-200 hover:text-white">
                                    Track
                                </a>
                                <a href="#" className="block text-slate-200 hover:text-white">
                                    Wallet
                                </a>
                                <a href="#" className="block text-slate-200 hover:text-white">
                                    Pricing
                                </a>
                                <a href="#" className="block text-slate-200 hover:text-white">
                                    Contact
                                </a>

                                <hr className="my-3 border-indigo-700/40" />

                                <a
                                    href="/login"
                                    className="block text-slate-200 hover:text-white mb-2"
                                >
                                    Sign in
                                </a>
                                <a
                                    href="/register"
                                    className="block px-4 py-2 rounded-lg bg-cyan-500/95 text-black font-semibold shadow-lg text-center"
                                >
                                    Get Started
                                </a>
                            </nav>
                        </div>
                    )}
                </div>
            </header>
        );
    };

    const GLASS_CARD_DARK =
        "glass-card p-8 rounded-3xl border border-indigo-600/20 backdrop-blur-xl shadow-2xl bg-indigo-900/6 text-white";
    const GLASS_CARD_LIGHT =
        "glass-card p-8 rounded-3xl border border-indigo-200/40 backdrop-blur-xl shadow-2xl bg-white/90 text-black";
    const INLINE_BADGE =
        "inline-flex items-center gap-3 bg-indigo-700/10 backdrop-blur rounded-full px-5 py-2 border border-indigo-600/10";

    return (
        <>
            <NavBar />

            {/* HERO */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-brand-900 via-slate-900 to-black text-white pt-24">
                <ParticleField />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left column */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className={INLINE_BADGE}>
                                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                <span className="text-sm font-semibold text-slate-100">
                                    Enterprise Logistics Platform
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black leading-tight">
                                Lightning-Fast <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-white">
                                    B2B Logistics
                                </span>
                            </h1>

                            <p className="text-xl text-slate-200 max-w-2xl">
                                Guaranteed 12-hour delivery between Delhi ↔ Jaipur. Professional,
                                reliable, and transparent logistics solutions built for modern
                                enterprises.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="/user/new-shipment"
                                    className="btn-premium px-8 py-5 text-lg font-bold shadow-2xl hover:shadow-cyan-500/25 transition-all flex items-center gap-3 group bg-indigo-600"
                                >
                                    Book Shipment{" "}
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition" />
                                </a>
                                <a
                                    href="/tracking"
                                    className="bg-indigo-900/20 backdrop-blur-lg border border-indigo-700/30 text-white px-8 py-5 rounded-2xl font-semibold hover:bg-indigo-900/30 transition"
                                >
                                    Track Package
                                </a>
                            </div>

                            <div className="flex flex-wrap gap-6 items-center pt-8">
                                <div className="flex -space-x-3">
                                    {["A", "B", "C", "D"].map((l, i) => (
                                        <div
                                            key={i}
                                            className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg border-2 border-indigo-700/20"
                                        >
                                            {l}
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">
                                        1,200+ Businesses Trust Us
                                    </div>
                                    <div className="flex gap-1 mt-2 items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                        <span className="ml-2 font-semibold">4.9/5 Rating</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right column */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="relative"
                        >
                            <div className={GLASS_CARD_LIGHT}>
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-black">
                                            Your Shipment Journey
                                        </h3>
                                        <p className="text-sm text-slate-600 mt-1">
                                            Live tracking active • ETA: 4 hours
                                        </p>
                                    </div>
                                    <div className="text-4xl">🚚</div>
                                </div>

                                <div className="space-y-8 text-slate-800">
                                    <div className="flex items-center gap-4">
                                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                                        <div>
                                            <div className="font-semibold text-black">Picked Up</div>
                                            <div className="text-sm text-slate-600">
                                                Delhi Hub - Sector 18
                                            </div>
                                        </div>
                                        <span className="ml-auto text-sm font-medium text-green-600">
                                            Completed
                                        </span>
                                    </div>

                                    <div className="relative pl-14">
                                        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-indigo-300" />
                                        <div className="relative">
                                            <div className="absolute -left-9 top-1 w-6 h-6 bg-indigo-400 rounded-full flex items-center justify-center">
                                                <Truck className="w-4 h-4 text-white" />
                                            </div>
                                            <div className="font-semibold text-black">In Transit</div>
                                            <div className="text-sm text-slate-600">NH-48 Highway</div>
                                            <div className="mt-3 w-full bg-indigo-200 rounded-full h-3 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "68%" }}
                                                    transition={{ duration: 2, ease: "easeOut" }}
                                                    className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500"
                                                />
                                            </div>
                                            <div className="text-right text-sm text-slate-600 mt-1">
                                                68% • 280 km route
                                            </div>
                                        </div>
                                    </div>

                                    <a
                                        href="/tracking/12345"
                                        className="block text-center py-4 bg-transparent rounded-2xl font-semibold hover:bg-indigo-50 transition text-slate-700"
                                    >
                                        View Live Tracking →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* STATS */}
            <section className="py-20 bg-gradient-to-b from-slate-900 to-black text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => {
                            const StatIcon = stat.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center group"
                                >
                                    <div className="inline-flex p-6 rounded-3xl bg-indigo-900/8 backdrop-blur-lg border border-indigo-700/20 mb-4 group-hover:scale-110 transition-transform">
                                        <StatIcon className="w-12 h-12 text-cyan-400" />
                                    </div>
                                    <div className="text-4xl md:text-5xl font-black">
                                        {stat.value}
                                    </div>
                                    <div className="text-slate-400 mt-2">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* PRIMARY ROUTE */}
            <section className="py-24 bg-gradient-to-b from-slate-900 via-brand-900 to-black text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-5xl font-black mb-4">Primary Route Coverage</h2>
                    <p className="text-xl text-slate-400 mb-16">
                        Connecting major business hubs with guaranteed delivery times
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className={`${GLASS_CARD_DARK} max-w-4xl mx-auto p-12 rounded-3xl`}
                    >
                        <div className="grid md:grid-cols-3 items-center gap-8">
                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-white flex items-center justify-center mb-4">
                                    <MapPin className="w-16 h-16 text-slate-900" />
                                </div>
                                <div className="text-3xl font-bold">Delhi</div>
                                <div className="text-slate-400">Pickup Hub</div>
                            </div>

                            <div className="text-center">
                                <div className="inline-flex items-center gap-4">
                                    <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-indigo-500" />
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-400 flex flex-col items-center justify-center text-white font-bold shadow-2xl">
                                        <span className="text-3xl">12</span>
                                        <span className="text-xs">Hours</span>
                                    </div>
                                    <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-cyan-400" />
                                </div>
                                <div className="mt-4 text-sm text-slate-400">280+ km route</div>
                            </div>

                            <div className="text-center">
                                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-indigo-600 to-white flex items-center justify-center mb-4">
                                    <MapPin className="w-16 h-16 text-slate-900" />
                                </div>
                                <div className="text-3xl font-bold">Jaipur</div>
                                <div className="text-slate-400">Delivery Hub</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8 mt-12">
                            {[
                                { icon: Clock, label: "12-Hour Delivery", sub: "Guaranteed Timeline" },
                                { icon: Shield, label: "100% Insured", sub: "Complete Coverage" },
                                { icon: CheckCircle2, label: "99.2% Success", sub: "On-Time Delivery" },
                            ].map((item, i) => {
                                const ItemIcon = item.icon;
                                return (
                                    <div key={i} className="text-center">
                                        <ItemIcon className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                                        <div className="text-xl font-bold">{item.label}</div>
                                        <div className="text-slate-400">{item.sub}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FEATURES */}
            <section
                className="py-24 bg-black text-white"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
            >
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-8">
                        <div className="text-sm text-slate-400 uppercase mb-2">
                            Process
                        </div>
                        <h2 className="text-5xl font-black mb-4">
                            Why Leading Businesses Choose FastFare
                        </h2>
                        <p className="text-xl text-slate-400">
                            Enterprise-grade features designed for modern B2B logistics
                            operations
                        </p>
                    </div>

                    <div className="flex items-center justify-between max-w-6xl mx-auto mb-6">
                        <div />
                        <div className="flex items-center gap-3">
                            <button
                                aria-label="Previous feature"
                                onClick={() =>
                                    setActiveFeature(
                                        (prev) => (prev - 1 + features.length) % features.length
                                    )
                                }
                                className="p-2 rounded-md bg-indigo-900/10 hover:bg-indigo-900/20 transition"
                            >
                                ‹
                            </button>
                            <div className="flex items-center gap-2">
                                {features.map((_, i) => (
                                    <button
                                        key={i}
                                        aria-label={`Go to feature ${i + 1}`}
                                        onClick={() => setActiveFeature(i)}
                                        className={`w-3 h-3 rounded-full ${i === activeFeature
                                            ? "bg-cyan-400"
                                            : "bg-indigo-800/40"
                                            } transition`}
                                    />
                                ))}
                            </div>
                            <button
                                aria-label="Next feature"
                                onClick={() =>
                                    setActiveFeature((prev) => (prev + 1) % features.length)
                                }
                                className="p-2 rounded-md bg-indigo-900/10 hover:bg-indigo-900/20 transition"
                            >
                                ›
                            </button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 mt-6 max-w-6xl mx-auto">
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            const isActive = i === activeFeature;
                            return (
                                <motion.div
                                    key={i}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: isActive ? -6 : 0,
                                        scale: isActive ? 1.03 : 1,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 120,
                                        damping: 16,
                                        duration: 0.6,
                                    }}
                                    className={`relative overflow-hidden rounded-3xl p-12 flex flex-col items-center justify-start gap-6 shadow-lg border ${isActive
                                        ? "border-cyan-400/30 bg-slate-100 text-slate-900 ring-2 ring-cyan-400/10"
                                        : "border-slate-200 bg-slate-100 text-slate-900"
                                        }`}
                                >
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                aria-hidden
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 0.08, scale: 1.4 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{ duration: 0.8 }}
                                                className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-indigo-600 pointer-events-none"
                                                style={{ mixBlendMode: "multiply", borderRadius: 20 }}
                                            />
                                        )}
                                    </AnimatePresence>

                                    <div className="relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-400 to-indigo-600 shadow-md">
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>

                                    <h3 className="relative z-10 text-2xl font-extrabold">
                                        {feature.title}
                                    </h3>
                                    <p className="relative z-10 text-slate-600 max-w-[20rem] leading-relaxed">
                                        {feature.desc}
                                    </p>

                                    {isActive && (
                                        <motion.a
                                            layout
                                            href="/features"
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.12 }}
                                            className="mt-4 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/10 hover:bg-indigo-900/20 text-sm font-semibold"
                                        >
                                            Learn more →
                                        </motion.a>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-24 bg-gradient-to-b from-black to-slate-900 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-5xl font-black mb-6">How FastFare Works</h2>
                    <p className="text-xl text-slate-400 mb-16">
                        Three simple steps to reliable, fast logistics
                    </p>

                    <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {[
                            {
                                step: "01",
                                title: "Book Your Shipment",
                                desc: "Enter pickup and delivery details, select service type, and confirm your booking in under 2 minutes.",
                                icon: Package,
                            },
                            {
                                step: "02",
                                title: "Track in Real-Time",
                                desc: "Monitor your shipment journey with live GPS tracking and milestone updates.",
                                icon: MapPin,
                            },
                            {
                                step: "03",
                                title: "Receive & Confirm",
                                desc: "Get your package delivered on time with digital proof of delivery and automatic confirmation.",
                                icon: CheckCircle2,
                            },
                        ].map((item, i) => {
                            const StepIcon = item.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.12 }}
                                    className="relative"
                                >
                                    <div className="text-9xl font-black text-white/5 absolute -top-10 left-1/2 -translate-x-1/2">
                                        {item.step}
                                    </div>
                                    <div className="relative bg-indigo-900/6 backdrop-blur-lg border border-indigo-700/20 rounded-3xl p-12 hover:border-cyan-500/50 transition-all">
                                        <div className="text-8xl mb-8">
                                            <StepIcon className="w-20 h-20" />
                                        </div>
                                        <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                                        <p className="text-slate-400 text-lg">{item.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* RATES */}
            <section className="py-20 bg-white text-slate-900">
                <div className="container mx-auto px-6">
                    <div className="mt-6 text-center rounded-lg mb-10 bg-slate-100 p-3">
                        <button
                            className={`px-4 py-2 rounded-lg font-medium ${!showCustom ? "bg-white" : "text-slate-600"
                                }`}
                            onClick={() => setShowCustom(false)}
                        >
                            Recommended
                        </button>

                        <button
                            className={`px-4 py-2 rounded-lg font-medium ${showCustom ? "bg-white" : "text-slate-600"
                                }`}
                            onClick={() => setShowCustom(true)}
                        >
                            Custom your package
                        </button>
                    </div>
                    {showCustom && (
                        <div className="border rounded-xl p-8 bg-slate-50 mt-10">

                            <h3 className="text-2xl font-bold mb-6">Custom Package Builder</h3>

                            <div className="grid md:grid-cols-2 gap-6">

                                <div>
                                    <label className="block mb-2 text-slate-700">Weight (kg)</label>
                                    <input
                                        className="w-full p-2 bg-white border rounded"
                                        placeholder="Enter weight"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-slate-700">Dimensions (cm)</label>
                                    <input
                                        className="w-full p-2 bg-white border rounded"
                                        placeholder="L × W × H"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-slate-700">Package Type</label>
                                    <select className="w-full p-2 bg-white border rounded">
                                        <option>Document</option>
                                        <option>Parcel</option>
                                        <option>Electronics</option>
                                        <option>Fragile Items</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-slate-700">Declared Value (₹)</label>
                                    <input
                                        className="w-full p-2 bg-white border rounded"
                                        placeholder="e.g., 8000"
                                    />
                                </div>
                            </div>

                            <button className="mt-6 px-4 py-2 bg-cyan-500 text-black font-semibold rounded">
                                Calculate Price →
                            </button>
                        </div>
                    )}


                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="border rounded-xl p-8 bg-slate-50">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="text-2xl font-bold">₹500</div>
                                <div className="flex-1">
                                    <div className="text-2xl font-black">
                                        Parcel size up to
                                        <br />
                                        25×25×25cm
                                    </div>
                                </div>
                            </div>

                            <hr className="my-6" />

                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                                        ✓
                                    </div>
                                    <div>12-hour guaranteed delivery</div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                                        ✓
                                    </div>
                                    <div>Live tracking throughout journey</div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                                        ✓
                                    </div>
                                    <div>Verified driver assigned</div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                                        ✓
                                    </div>
                                    <div>Proof of delivery included</div>
                                </li>
                            </ul>

                            <div className="mt-8">
                                <a
                                    href="/book"
                                    className="block text-center py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-lg font-bold"
                                >
                                    Book your parcel now
                                </a>
                            </div>
                        </div>

                        <div className="border rounded-xl p-8 bg-slate-50">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="text-2xl font-bold">₹700</div>
                                <div className="flex-1">
                                    <div className="text-2xl font-black">
                                        Parcel size up to
                                        <br />
                                        50×50×50cm
                                    </div>
                                </div>
                            </div>

                            <hr className="my-6" />

                            <ul className="space-y-3 text-slate-700">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                                        ✓
                                    </div>
                                    <div>Direct driver communication</div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                                        ✓
                                    </div>
                                    <div>Real-time SMS updates</div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                                        ✓
                                    </div>
                                    <div>Feature text goes here</div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center">
                                        ✓
                                    </div>
                                    <div>Same-day delivery guaranteed</div>
                                </li>
                            </ul>

                            <div className="mt-8">
                                <a
                                    href="/book"
                                    className="block text-center py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-lg font-bold"
                                >
                                    Book your parcel now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="py-20 bg-slate-900 text-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
                        Customer testimonials
                    </h2>
                    <p className="text-center text-slate-400 mb-10">
                        Positive reviews Of Our Users.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="bg-indigo-800/75 p-6 rounded-lg shadow-inner relative border border-indigo-700/40"
                            >
                                <div className="absolute -top-4 right-4 text-sm font-semibold bg-indigo-700/60 rounded px-3 py-1">
                                    ★★★★★
                                </div>
                                <p className="mb-6 leading-relaxed text-slate-100">
                                    "{t.quote}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                                        {t.author
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </div>
                                    <div>
                                        <div className="font-bold">{t.author}</div>
                                        <div className="text-sm text-slate-300">
                                            {t.role}, {t.company}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-r from-cyan-600 to-indigo-700 text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-5xl md:text-6xl font-black mb-6">
                        Ready to Transform Your Logistics?
                    </h2>
                    <p className="text-2xl text-white/90 mb-12">
                        Join 1,200+ businesses already shipping smarter with FastFare
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="/register"
                            className="bg-white text-brand-700 px-12 py-6 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all hover:scale-105"
                        >
                            Start Shipping Now <ArrowRight className="inline ml-2" />
                        </a>
                        <a
                            href="/contact"
                            className="bg-white/20 backdrop-blur-lg border-2 border-white text-white px-12 py-6 rounded-2xl text-xl font-bold hover:bg-white/30 transition"
                        >
                            Talk to Sales
                        </a>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-black text-slate-400 py-16 border-t border-indigo-700/10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                                    FF
                                </div>
                                <span className="text-2xl font-bold text-white">FastFare</span>
                            </div>
                            <p className="mb-6 text-slate-300">
                                Enterprise-grade B2B logistics solutions delivering speed,
                                reliability, and transparency for modern businesses.
                            </p>

                            <div className="text-sm text-slate-300 mb-3">
                                Get the latest news on FastFare features, routes, and logistics
                                innovations delivered to your inbox.
                            </div>
                            <div className="flex gap-2">
                                <input
                                    aria-label="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none text-slate-900"
                                />
                                <button className="px-4 py-3 bg-cyan-400 text-black rounded-r-lg font-semibold">
                                    Subscribe
                                </button>
                            </div>
                            <div className="text-xs text-slate-400/70 mt-2">
                                By subscribing you agree to our Privacy Policy and consent to
                                receive updates from FastFare.
                            </div>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>
                                    <a href="user/new-shipment" className="hover:underline">
                                        Book shipment
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Track order
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Pricing
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Routes
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Wallet
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>
                                    <a href="#" className="hover:underline">
                                        About us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Careers
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Testimonials
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-slate-300">
                                <li>
                                    <a href="#" className="hover:underline">
                                        Privacy policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Terms of service
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Shipping policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Cookie settings
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:underline">
                                        Updates
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-indigo-700/10 mt-12 pt-8 flex flex-wrap justify-between items-center text-sm">
                        <div className="flex gap-6 text-slate-300">
                            <a href="#" className="hover:underline">
                                Privacy policy
                            </a>
                            <a href="#" className="hover:underline">
                                Terms of service
                            </a>
                            <a href="#" className="hover:underline">
                                Cookies settings
                            </a>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-900/10 flex items-center justify-center hover:bg-indigo-800/20 transition">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-indigo-900/10 flex items-center justify-center hover:bg-indigo-800/20 transition">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <div className="w-8 h-8 rounded-full bg-indigo-900/10 flex items-center justify-center hover:bg-indigo-800/20 transition">
                                    <Globe className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="text-slate-300">
                                © 2025 FastFare. All rights reserved.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default LandingPage;
