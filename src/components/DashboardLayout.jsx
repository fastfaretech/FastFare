import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex dashboard-bg">

      {/* Floating CTA */}
      <button
        className="floating-cta btn-premium"
        onClick={() => (window.location.href = "/shipments/new")}
        aria-label="Create new shipment"
      >
        <span className="mr-2">New Shipment</span>
      </button>

      {/* Sidebar */}
      <aside className="w-72 hidden lg:flex flex-col p-4 gap-4 border-r border-brand-100 bg-white/60 backdrop-blur-xl sticky top-0 h-screen premium-shadow">
        
        <div className="flex items-center gap-3 px-2 py-3">
          <img src={logo} alt="FastFare" width={40} height={40} className="object-contain h-8"/>
          <div>
            <div className="text-sm font-semibold text-brand-900">FastFare</div>
            <div className="text-xs text-slate-500">Logistics Portal</div>
          </div>
        </div>

        <nav className="mt-4 flex-1 space-y-1 text-sm">
          <Link to="/dashboard/user" className="block p-3 rounded-xl hover:bg-brand-100/50">
            Dashboard
          </Link>
          <Link to="/shipments" className="block p-3 rounded-xl hover:bg-brand-100/50">
            Shipments
          </Link>
          <Link to="/tracking" className="block p-3 rounded-xl hover:bg-brand-100/50">
            Track
          </Link>
          <Link to="/wallet" className="block p-3 rounded-xl hover:bg-brand-100/50">
            Wallet
          </Link>
          <Link to="/support" className="block p-3 rounded-xl hover:bg-brand-100/50">
            Support
          </Link>
        </nav>

        <div className="mt-auto px-2 pb-4">
          <button
            onClick={() => {
              localStorage.removeItem("ff_token");
              window.location.href = "/login";
            }}
            className="btn-secondary w-full py-3"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <header className="w-full border-b border-brand-200/50 bg-white/70 backdrop-blur-xl sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 rounded-md bg-white/70 shadow-sm">
                ☰
              </button>
              <div className="text-sm font-medium text-brand-900">Dashboard</div>
              <div className="text-xs text-slate-500">
                Welcome to your logistics hub
              </div>
            </div>

            <div className="text-xs text-slate-500">Demo Mode</div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto p-6">{children}</main>
      </div>
    </div>
  );
}
