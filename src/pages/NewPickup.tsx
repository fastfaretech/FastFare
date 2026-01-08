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
