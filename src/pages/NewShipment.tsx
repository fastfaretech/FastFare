import { useState, useEffect } from "react";
import ParticleField from "../components/ParticleField";
import logo from "../assets/logo.png";

// Define types for form objects
interface ContactInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  date?: string;
}

interface PackageDetails {
  type: string;
  service: string;
  weight: string;
  dimensions: string;
  description: string;
  value: string;
}

export default function NewShipment() {
  const [step, setStep] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const [pickup, setPickup] = useState<ContactInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    date: "",
  });

  const [delivery, setDelivery] = useState<ContactInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
  });

  const [packageDetails, setPackageDetails] = useState<PackageDetails>({
    type: "",
    service: "",
    weight: "",
    dimensions: "",
    description: "",
    value: "",
  });

  useEffect(() => {
    let price = 0;

    if (packageDetails.service === "Express") price += 499;
    if (packageDetails.service === "Standard") price += 299;

    const w = parseFloat(packageDetails.weight);
    if (!isNaN(w) && w > 0) {
      price += w * 20;
    }

    const v = parseFloat(packageDetails.value);
    if (!isNaN(v) && v > 10000) {
      price += v * 0.01;
    }

    setTotal(Math.round(price));
  }, [packageDetails]);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <ParticleField />

      <header className="fixed inset-x-0 top-0 z-30">
        <div className="backdrop-blur-md bg-black/30 border-b border-indigo-700/20">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logo} width={40} height={40} />
              <div className="text-white font-extrabold text-lg">FastFare — User</div>
            </div>

            <button
              className="text-slate-300 hover:text-white"
              onClick={() => (window.location.href = "/userdashboard")}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="pt-28 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-cyan-400 mb-6">Book Your Shipment</h2>
        <p className="mb-6 text-slate-300">
          Fast, reliable delivery between Delhi and Jaipur
        </p>

        {step === 1 && (
          <div className="bg-slate-900/60 p-6 rounded-xl border border-indigo-700/20">
            <h3 className="text-xl font-semibold mb-4">Pickup Information</h3>

            <label className="block mb-2">Contact Name *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="John Doe"
              onChange={(e) => setPickup({ ...pickup, name: e.target.value })}
            />

            <label className="block mb-2">Phone Number *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="+91 98765 43210"
              onChange={(e) => setPickup({ ...pickup, phone: e.target.value })}
            />

            <label className="block mb-2">Email Address *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="john@company.com"
              onChange={(e) => setPickup({ ...pickup, email: e.target.value })}
            />

            <label className="block mb-2">Pickup Address *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="Building name, Street, Area"
              onChange={(e) => setPickup({ ...pickup, address: e.target.value })}
            />

            <label className="block mb-2">Pickup City *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="Delhi"
              onChange={(e) => setPickup({ ...pickup, city: e.target.value })}
            />

            <label className="block mb-2">Pickup Date *</label>
            <input
              type="date"
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              onChange={(e) => setPickup({ ...pickup, date: e.target.value })}
            />

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-cyan-500 text-black font-semibold rounded"
                onClick={() => setStep(2)}
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-slate-900/60 p-6 rounded-xl border border-indigo-700/20">
            <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>

            <label className="block mb-2">Recipient Name *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="Jane Smith"
              onChange={(e) => setDelivery({ ...delivery, name: e.target.value })}
            />

            <label className="block mb-2">Recipient Phone *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="+91 98765 43210"
              onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
            />

            <label className="block mb-2">Recipient Email *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="jane@company.com"
              onChange={(e) => setDelivery({ ...delivery, email: e.target.value })}
            />

            <label className="block mb-2">Delivery Address *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="Building name, Street, Area"
              onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
            />

            <label className="block mb-2">Delivery City *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="Jaipur"
              onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
            />

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-slate-700 rounded"
                onClick={() => setStep(1)}
              >
                ← Previous
              </button>
              <button
                className="px-4 py-2 bg-cyan-500 text-black font-semibold rounded"
                onClick={() => setStep(3)}
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-slate-900/60 p-6 rounded-xl border border-indigo-700/20">
            <h3 className="text-xl font-semibold mb-4">Shipment Details</h3>

            <label className="block mb-2">Package Type *</label>
            <select
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              value={packageDetails.type}
              onChange={(e) => setPackageDetails({ ...packageDetails, type: e.target.value })}
            >
              <option value="">Select package type</option>
              <option value="Document">Document</option>
              <option value="Parcel">Parcel</option>
              <option value="Electronics">Electronics</option>
              <option value="Fragile Items">Fragile Items</option>
              <option value="Other">Other</option>
            </select>

            <label className="block mb-2">Service Type *</label>
            <select
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              onChange={(e) => setPackageDetails({ ...packageDetails, service: e.target.value })}
            >
              <option>Express (12 hours) - ₹499 base</option>
              <option>Standard (24 hours) - ₹299 base</option>
            </select>

            <label className="block mb-2">Weight (kg) *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="5"
              onChange={(e) => setPackageDetails({ ...packageDetails, weight: e.target.value })}
            />

            <label className="block mb-2">Dimensions (LxWxH cm)</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="30x20x15"
              onChange={(e) => setPackageDetails({ ...packageDetails, dimensions: e.target.value })}
            />

            <label className="block mb-2">Package Description *</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="Brief description of package contents"
              onChange={(e) => setPackageDetails({ ...packageDetails, description: e.target.value })}
            />

            <label className="block mb-2">Declared Value (₹)</label>
            <input
              className="w-full mb-4 p-2 bg-slate-800 rounded"
              placeholder="10000"
              onChange={(e) => setPackageDetails({ ...packageDetails, value: e.target.value })}
            />

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-slate-700 rounded"
                onClick={() => setStep(2)}
              >
                ← Previous
              </button>
              <button
                className="px-4 py-2 bg-cyan-500 text-black font-semibold rounded"
                onClick={() => setStep(4)}
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-slate-900/60 p-6 rounded-xl border border-indigo-700/20">
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">Review Your Booking</h3>

            <div className="mb-6">
              <h4 className="font-semibold">Pickup Details</h4>
              <p>Contact: {pickup.name}</p>
              <p>Phone: {pickup.phone}</p>
              <p>Address: {pickup.address}, {pickup.city}</p>
              <p>Date: {pickup.date}</p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold">Delivery Details</h4>
              <p>Recipient: {delivery.name}</p>
              <p>Phone: {delivery.phone}</p>
              <p>Address: {delivery.address}, {delivery.city}</p>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold">Shipment Details</h4>
              <p>Type: {packageDetails.type}</p>
              <p>Weight: {packageDetails.weight} kg</p>
              <p>Service: {packageDetails.service}</p>
              <p>Value: ₹{packageDetails.value}</p>
            </div>

            <div className="text-3xl font-bold text-green-400 mb-4">Total Amount: ₹{total}</div>

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-slate-700 rounded"
                onClick={() => setStep(3)}
              >
                ← Previous
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-black font-semibold rounded"
                onClick={() => alert("Shipment Confirmed!")}
              >
                Confirm Booking ✔
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
