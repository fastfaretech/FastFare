import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import ParticleField from "../components/ParticleField";
import logo from "../assets/logo.png";

interface Shipment {
  id: string;
  awb: string;
  from: {
    city: string;
  };
  to: {
    city: string;
  };
  driver?: string;
}

interface ApiResponse {
  shipments: Shipment[];
}

export default function NewPickup() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch("/api/v1/partner/incoming-shipments");
        setShipments((res as ApiResponse).shipments || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const assignDriver = async (shipmentId: string) => {
    const driver = prompt("Enter driver ID or phone:");
    if (!driver) return;

    try {
      await apiFetch("/api/v1/partner/assign-driver", {
        method: "POST",
        body: JSON.stringify({ shipmentId, driver }),
      });
      alert("Driver assigned!");
      window.location.reload();
    } catch (e) {
      alert("Failed to assign driver");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <ParticleField />

      <header className="fixed inset-x-0 top-0 z-30">
        <div className="backdrop-blur-md bg-black/30 border-b border-indigo-700/20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} alt="FastFare" width={40} height={40} />
              <div className="text-white font-extrabold text-lg">FastFare — Partner</div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {["Dashboard", "Tasks", "Collections"].map((l) => (
                <a key={l} href="#" className="text-sm text-slate-200 hover:text-white">
                  {l}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <button
                className="text-slate-200 hover:text-white hidden md:inline"
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

            {/* Mobile Menu Button */}
            <div className="md:hidden text-slate-200 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              ☰
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden bg-black/40 p-4">
              {["Dashboard", "Tasks", "Collections"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="block text-sm text-slate-200 hover:text-white py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {l}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="relative z-10 p-6 pt-28 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-cyan-400 mb-8">Incoming Shipments</h2>

        {loading ? (
          <div className="text-slate-300">Loading…</div>
        ) : shipments.length === 0 ? (
          <div className="text-slate-300">No incoming shipments.</div>
        ) : (
          shipments.map((s) => (
            <div
              key={s.id || s.awb}
              className="p-4 mb-3 rounded-xl bg-slate-800/60 border border-cyan-700/10 backdrop-blur-sm flex justify-between"
            >
              <div>
                <div className="text-white font-semibold">{s.awb || s.id}</div>
                <div className="text-slate-300 text-sm">
                  {s.from?.city} → {s.to?.city}
                </div>
              </div>

              <div>
                {s.driver ? (
                  <span className="text-green-400 text-sm">Assigned to {s.driver}</span>
                ) : (
                  <button
                    onClick={() => assignDriver(s.id)}
                    className="px-3 py-2 bg-cyan-500 text-black rounded font-semibold hover:bg-cyan-400"
                  >
                    Assign Driver
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
