import React, { useState } from 'react';
import {
    ArrowRight, Box, Globe, ShieldCheck, Mail, Ship, Anchor,
    MapPin, Clock, Truck, CheckCircle2, Package, Wallet, Bell, Shield, Phone,
    Menu, X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

const Homepage = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showCustomRate, setShowCustomRate] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
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

    const testimonials = [
        {
            quote: "FastFare digital wallet system has simplified our payment processes significantly. Fast, secure, and professional service.",
            author: "Amit Patel",
            role: "Logistics Head",
            company: "Healthcare Distributors",
        },
        {
            quote: "Real-time tracking with driver verification gives us complete peace of mind. Best B2B logistics partner we've had.",
            author: "Rajesh Kumar",
            role: "Supply Chain Manager",
            company: "Manufacturing Corp",
        },
        {
            quote: "Transparent pricing and predictable delivery windows — great for our inventory planning.",
            author: "Karan Verma",
            role: "Inventory Manager",
            company: "Electronics Pvt Ltd",
        },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="flex items-center justify-between px-6 py-4 md:px-12 lg:px-24">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#FF4500] p-1.5 rounded-lg text-white">
                            <Anchor size={22} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-[#001f3f]">FastFare</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <Link to="/" className="text-[#FF4500] font-semibold">Home</Link>
                        <Link to="/how-it-works" className="hover:text-[#FF4500] transition-colors">How it Works</Link>
                        <Link to="/track" className="hover:text-[#FF4500] transition-colors">Track Shipment</Link>
                        <Link to="/pricing" className="hover:text-[#FF4500] transition-colors">Pricing</Link>
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <Link to="/login" className="text-gray-900 font-medium hover:text-[#FF4500] transition-colors">
                            Sign In
                        </Link>
                        <Link to="/register" className="bg-[#FF4500] hover:bg-[#e03e00] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-orange-200">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="lg:hidden text-gray-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 p-6 space-y-4 shadow-xl absolute w-full left-0">
                        <Link to="/" className="block text-gray-900 font-medium hover:text-[#FF4500]">Home</Link>
                        <Link to="/how-it-works" className="block text-gray-900 font-medium hover:text-[#FF4500]">How it Works</Link>
                        <Link to="/track" className="block text-gray-900 font-medium hover:text-[#FF4500]">Track Shipment</Link>
                        <Link to="/login" className="block text-gray-900 font-medium hover:text-[#FF4500]">Sign In</Link>
                        <Link to="/register" className="block text-[#FF4500] font-bold">Get Started</Link>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative px-6 py-12 md:px-12 lg:px-24 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 z-10">
                        <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF4500] px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                            <Ship size={14} /> Logistics Transport Delivery
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-[#001f3f]">
                            Display Smart
                            <br />
                            <span className="text-[#FF4500]">Container</span> Logistics
                        </h1>

                        <p className="text-gray-500 text-lg max-w-md">
                            Seamless Logistics Solutions. We deliver Trust, not just packages. Experience the future of shipping today.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <Link to="/register" className="flex items-center gap-2 bg-[#FF4500] hover:bg-[#e03e00] text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg hover:shadow-orange-200">
                                Get Started
                                <ArrowRight size={18} />
                            </Link>

                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                    12k+
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        {/* Main Hero Image */}
                        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] shadow-2xl bg-gray-100">
                            <img
                                src="/assets/image_to_be_put.webp"
                                alt="Large cargo ship"
                                className="w-full h-full object-cover"
                            />

                            {/* Floating Cards */}
                            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 animate-fade-in-up">
                                <div className="flex items-center gap-3">
                                    <div className="bg-[#001f3f] p-2 rounded-full text-white">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Protection</p>
                                        <p className="font-bold text-[#001f3f]">100% Secure</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 animate-fade-in-up delay-100">
                                <p className="text-sm font-semibold text-[#001f3f] mb-2">Shipment Status</p>
                                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-[#FF4500]" />
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>In Transit</span>
                                    <span>75%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Metrics Section */}
            <section className="bg-[#001f3f] text-white py-16 px-6 md:px-12 lg:px-24 mt-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="glass-card bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-4xl font-bold mb-2 text-[#FF4500]">150K</h3>
                        <p className="text-gray-300">Logistic Outlets</p>
                    </div>
                    <div className="glass-card bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-4xl font-bold mb-2 text-[#FF4500]">120+</h3>
                        <p className="text-gray-300">Countries Served</p>
                    </div>
                    <div className="glass-card bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-4xl font-bold mb-2 text-[#FF4500]">20M</h3>
                        <p className="text-gray-300">Happy Customers</p>
                    </div>
                    <div className="glass-card bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="text-4xl font-bold mb-2 text-[#FF4500]">500+</h3>
                        <p className="text-gray-300">Awards Won</p>
                    </div>
                </div>
            </section>

            {/* Primary Route Coverage */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#001f3f] mb-4">Primary Route Coverage</h2>
                    <p className="text-xl text-gray-500">Connecting major business hubs with guaranteed delivery times</p>
                </div>

                <div className="bg-white p-12 rounded-3xl shadow-xl max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-3 items-center gap-8">
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 text-[#FF4500] flex items-center justify-center mb-4">
                                <MapPin size={40} />
                            </div>
                            <div className="text-2xl font-bold text-[#001f3f]">Delhi</div>
                            <div className="text-gray-400">Pickup Hub</div>
                        </div>

                        <div className="text-center hidden md:block">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="h-1 w-20 bg-gray-200"></div>
                                <div className="bg-[#001f3f] text-white px-4 py-1 rounded-full text-sm font-bold">12 Hours</div>
                                <div className="h-1 w-20 bg-gray-200"></div>
                            </div>
                            <p className="text-sm text-gray-400">280+ km route</p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 text-[#001f3f] flex items-center justify-center mb-4">
                                <MapPin size={40} />
                            </div>
                            <div className="text-2xl font-bold text-[#001f3f]">Jaipur</div>
                            <div className="text-gray-400">Delivery Hub</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-gray-100">
                        <div className="text-center">
                            <Clock className="w-10 h-10 mx-auto mb-4 text-[#FF4500]" />
                            <div className="text-lg font-bold text-[#001f3f]">12-Hour Delivery</div>
                            <div className="text-gray-400">Guaranteed Timeline</div>
                        </div>
                        <div className="text-center">
                            <ShieldCheck className="w-10 h-10 mx-auto mb-4 text-[#FF4500]" />
                            <div className="text-lg font-bold text-[#001f3f]">100% Insured</div>
                            <div className="text-gray-400">Complete Coverage</div>
                        </div>
                        <div className="text-center">
                            <CheckCircle2 className="w-10 h-10 mx-auto mb-4 text-[#FF4500]" />
                            <div className="text-lg font-bold text-[#001f3f]">99.2% Success</div>
                            <div className="text-gray-400">On-Time Delivery</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#001f3f] mb-4">Why Businesses Choose Us</h2>
                    <p className="text-xl text-gray-500">Enterprise-grade features designed for modern logistics</p>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <div key={i} className="p-8 rounded-2xl border border-gray-100 hover:border-[#FF4500]/30 hover:shadow-xl transition-all group">
                                <div className="w-16 h-16 rounded-xl bg-orange-50 text-[#FF4500] flex items-center justify-center mb-6 group-hover:bg-[#FF4500] group-hover:text-white transition-colors">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-[#001f3f] mb-3">{feature.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* How it Works */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#001f3f] text-white">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">How FastFare Works</h2>
                    <p className="text-xl text-gray-400">Three simple steps to reliable logistics</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {[
                        { step: "01", title: "Book Shipment", desc: "Enter pickup details and confirm booking in minutes.", icon: Package },
                        { step: "02", title: "Track Real-Time", desc: "Monitor your shipment with live GPS and updates.", icon: MapPin },
                        { step: "03", title: "Receive Safely", desc: "Get delivered on time with digital proof of delivery.", icon: CheckCircle2 },
                    ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div key={i} className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="absolute -top-6 left-8 text-6xl font-black text-white/5 select-none">{item.step}</div>
                                <Icon className="w-16 h-16 text-[#FF4500] mb-6 relative z-10" />
                                <h3 className="text-2xl font-bold mb-3 relative z-10">{item.title}</h3>
                                <p className="text-gray-300 relative z-10">{item.desc}</p>
                            </div>
                        )
                    })}
                </div>
            </section>

            {/* Rates Calculator */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center gap-4 mb-12">
                        <button
                            onClick={() => setShowCustomRate(false)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${!showCustomRate ? 'bg-[#001f3f] text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200'}`}
                        >
                            Recommended Rates
                        </button>
                        <button
                            onClick={() => setShowCustomRate(true)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${showCustomRate ? 'bg-[#001f3f] text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200'}`}
                        >
                            Custom Package
                        </button>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
                        {showCustomRate ? (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-[#001f3f] mb-6">Custom Package Builder</h3>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                                        <input type="text" placeholder="Enter weight" className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (LxWxH cm)</label>
                                        <input type="text" placeholder="e.g. 50x30x20" className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Package Type</label>
                                        <select className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition bg-white">
                                            <option>Standard Parcel</option>
                                            <option>Documents</option>
                                            <option>Electronics</option>
                                            <option>Fragile</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Value (₹)</label>
                                        <input type="text" placeholder="Declared value" className="w-full p-3 rounded-lg border border-gray-200 focus:border-[#FF4500] focus:ring-1 focus:ring-[#FF4500] outline-none transition" />
                                    </div>
                                </div>
                                <button className="w-full bg-[#FF4500] hover:bg-[#e03e00] text-white font-bold py-4 rounded-xl transition-colors mt-4">
                                    Calculate Price
                                </button>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-3xl font-bold text-[#001f3f]">₹500</span>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Standard</span>
                                    </div>
                                    <p className="text-gray-600 font-medium mb-4">Small Parcel (up to 25x25x25cm)</p>
                                    <ul className="space-y-2 text-sm text-gray-500 mb-6">
                                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#FF4500]" /> 12-hour delivery guaranteed</li>
                                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#FF4500]" /> Live tracking included</li>
                                    </ul>
                                    <button className="w-full bg-white border-2 border-[#001f3f] text-[#001f3f] hover:bg-[#001f3f] hover:text-white font-bold py-3 rounded-xl transition-colors">
                                        Select Plan
                                    </button>
                                </div>
                                <div className="p-6 rounded-2xl border-2 border-[#FF4500] bg-orange-50/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 bg-[#FF4500] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-3xl font-bold text-[#001f3f]">₹700</span>
                                        <span className="bg-orange-100 text-[#FF4500] px-3 py-1 rounded-full text-xs font-bold">Premium</span>
                                    </div>
                                    <p className="text-gray-600 font-medium mb-4">Medium Parcel (up to 50x50x50cm)</p>
                                    <ul className="space-y-2 text-sm text-gray-500 mb-6">
                                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#FF4500]" /> Direct driver contact</li>
                                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#FF4500]" /> Real-time SMS updates</li>
                                    </ul>
                                    <button className="w-full bg-[#FF4500] hover:bg-[#e03e00] text-white font-bold py-3 rounded-xl transition-colors">
                                        Select Plan
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-white">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-[#001f3f] mb-4">Trusted by Leaders</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex gap-1 text-yellow-400 mb-4">
                                {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
                            </div>
                            <p className="text-gray-600 mb-6 italic">"{t.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#001f3f] text-white flex items-center justify-center font-bold">
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-[#001f3f]">{t.author}</div>
                                    <div className="text-xs text-gray-500">{t.role}, {t.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#FF4500] text-white text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Ship With Confidence?</h2>
                <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">Join thousands of businesses optimizing their logistics with FastFare today.</p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link to="/register" className="bg-white text-[#FF4500] px-8 py-4 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all">Start Shipping Now</Link>
                    <Link to="/contact" className="bg-[#FF4500] border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">Talk to Sales</Link>
                </div>
            </section>

            {/* Main Footer */}
            <footer className="bg-black text-gray-400 py-16 px-6 md:px-12 lg:px-24 border-t border-gray-800">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <Anchor size={24} className="text-[#FF4500]" />
                            <span className="text-2xl font-bold text-white">FastFare</span>
                        </div>
                        <p className="mb-6 text-sm">Enterprise-grade B2B logistics solutions delivering speed, reliability, and transparency.</p>
                        <div className="flex gap-4">
                            <div className="p-2 bg-gray-800 rounded-full hover:bg-[#FF4500] hover:text-white transition-colors cursor-pointer"><Globe size={18} /></div>
                            <div className="p-2 bg-gray-800 rounded-full hover:bg-[#FF4500] hover:text-white transition-colors cursor-pointer"><Mail size={18} /></div>
                            <div className="p-2 bg-gray-800 rounded-full hover:bg-[#FF4500] hover:text-white transition-colors cursor-pointer"><Phone size={18} /></div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Product</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="#" className="hover:text-[#FF4500]">Book Shipment</Link></li>
                            <li><Link to="#" className="hover:text-[#FF4500]">Track Order</Link></li>
                            <li><Link to="#" className="hover:text-[#FF4500]">Pricing</Link></li>
                            <li><Link to="#" className="hover:text-[#FF4500]">Digital Wallet</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="#" className="hover:text-[#FF4500]">About Us</Link></li>
                            <li><Link to="#" className="hover:text-[#FF4500]">Careers</Link></li>
                            <li><Link to="#" className="hover:text-[#FF4500]">Contact</Link></li>
                            <li><Link to="#" className="hover:text-[#FF4500]">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Legal</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="#" className="hover:text-[#FF4500]">Privacy Policy</Link></li>
                            <li><Link to="#" className="hover:text-[#FF4500]">Terms of Service</Link></li>
                            <li><Link to="#" className="hover:text-[#FF4500]">Shipping Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© 2025 FastFare. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link to="#" className="hover:text-white">Privacy</Link>
                        <Link to="#" className="hover:text-white">Terms</Link>
                        <Link to="#" className="hover:text-white">Cookies</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;
