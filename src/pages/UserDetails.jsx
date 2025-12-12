import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import logo from "../assets/logo.png";

const backend = import.meta.env.VITE_BACKEND_URL;

const schema = z.object({
  name: z.string().min(2),
  age: z.string().min(1),
  dob: z.string().optional(),
  companyName: z.string().min(2),
  gstin: z
    .string()
    .length(15, "GSTIN must be exactly 15 characters")
    .optional()
    .or(z.literal("")),
  address: z.string().min(10),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export default function UserDetails() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formValues) => {
    try {
      const token = localStorage.getItem("ff_token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const payload = {
        name: formValues.name,
        age: formValues.age,
        dob: formValues.dob || null,
        companyName: formValues.companyName,
        gstin: formValues.gstin || "",
        address: formValues.address,
        phone: formValues.phone,
      };

      const res = await fetch(`${backend}/api/v1/user/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        localStorage.removeItem("ff_token");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Failed to update details");
      }

      window.location.href = "/dashboard/user";
    } catch (err) {
      alert(err.message || "Error submitting details.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      <header className="w-full border-b border-brand-200/60 bg-white/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="FastFare" width={40} height={40} className="object-contain h-8 rounded-lg"/>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-brand-900">
                FastFare
              </span>
            </div>
          </div>

          <span className="text-[11px] font-medium text-slate-500">
            Setup progress:{" "}
            <span className="text-brand-700 font-semibold">Step 2 of 2</span>
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl"
        >
          <div className="glass-card px-10 py-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-brand-900">
                  Finish setting up your account
                </h1>
                <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-xl">
                  These details are used on invoices and shipping labels.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="h-7 w-7 rounded-full bg-brand-100 flex items-center justify-center text-xs font-semibold text-brand-800">
                    1
                  </span>
                  <span className="text-[11px] text-slate-500">Account</span>
                </div>
                <div className="h-px w-6 bg-slate-200" />
                <div className="flex items-center gap-1">
                  <span className="h-7 w-7 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold">
                    2
                  </span>
                  <span className="text-[11px] text-slate-700">
                    Business details
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              <section className="bg-brand-100/60 rounded-2xl p-6 border border-brand-200">
                <h2 className="text-sm font-semibold text-brand-800 mb-4">
                  Personal Details
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="auth-label">Full Name</label>
                    <input {...register("name")} placeholder="Name" className="input-premium ml-1" />
                  </div>

                  <div className="space-y-1">
                    <label className="auth-label">Age</label>
                    <input {...register("age")} placeholder="Age" className="input-premium ml-1" />
                  </div>

                  <div className="space-y-1">
                    <label className="auth-label">Phone No.</label>
                    <input {...register("phone")} placeholder="Phone No." className="input-premium ml-1" />
                  </div>
                </div>
              </section>

              <section className="bg-brand-100/60 rounded-2xl p-6 border border-brand-200">
                <h2 className="text-sm font-semibold text-brand-800 mb-4">
                  Company Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="auth-label">Company Name</label>
                    <input {...register("companyName")} placeholder="Company Name" className="input-premium ml-1" />
                  </div>

                  <div>
                    <label className="auth-label">GSTIN</label>
                    <input
                      {...register("gstin")}
                      placeholder="15-character GSTIN"
                      className="input-premium uppercase font-mono tracking-wide ml-1"
                    />
                  </div>

                  <div>
                    <label className="auth-label">Full Company Address</label>
                    <textarea
                      {...register("address")}
                      rows={3}
                      className="input-premium resize-none ml-1"
                      placeholder="House no, street, city, PIN"
                    />
                  </div>
                </div>
              </section>

              <div className="flex flex-col md:flex-row justify-between gap-3">
                <p className="text-[11px] text-slate-500 md:mt-2">
                  By continuing, you confirm details are correct.
                </p>
                <button type="submit" className="btn-premium text-sm md:w-56">
                  Register
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
