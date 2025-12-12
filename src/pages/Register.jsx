import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const backend = import.meta.env.VITE_BACKEND_URL;

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const formContainer = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const formItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onRegister = async (formData) => {
    try {
      const res = await fetch(`${backend}/api/v1/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Registration failed");
      }

      const result = await res.json();

      if (result.token) {
        localStorage.setItem("ff_token", result.token);
      }

      navigate("/details");

    } catch (err) {
      alert(err.message || "Error registering user");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-brand-100 via-brand-100/70 to-brand-100">
      <div className="container-anim-wrapper">

        <div
          className="container-anim-row absolute top-16 left-0 opacity-35"
          style={{ animationDuration: "24s" }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`reg-row1-${i}`} className="container-box" />
          ))}
        </div>

        <div
          className="container-anim-row absolute top-1/2 left-0 opacity-28 scale-90"
          style={{ animationDuration: "30s" }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`reg-row2-${i}`} className="container-box" />
          ))}
        </div>

        <div
          className="container-anim-row absolute bottom-14 left-0 opacity-22 scale-75"
          style={{ animationDuration: "38s" }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`reg-row3-${i}`} className="container-box" />
          ))}
        </div>
      </div>

      <header className="w-full border-b border-brand-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-brand-100 flex items-center justify-center shadow-sm">
              <img src={logo} alt="FastFare" width={40} height={40} className="object-contain h-8"/>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-brand-900">
                FastFare
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10 z-10">
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12">

          <motion.div
            className="flex-1 flex flex-col justify-center"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] text-brand-700 uppercase mb-2">
              Get started free
            </p>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-brand-900 via-brand-800 to-brand-600 bg-clip-text text-transparent">
                We&apos;re more than just{" "}
              </span>
              <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
                shipping.
              </span>
            </h1>
            <p className="mt-3 text-sm md:text-base text-slate-600 max-w-lg">
              Create your FastFare Account, connect your store, add pickup
              details and start dispatching orders in minutes.
            </p>

            <motion.ul
              className="mt-5 space-y-2 text-sm text-slate-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <li>• Real-time shipment tracking across carriers</li>
              <li>• Smart rate selection and performance analytics</li>
              <li>• One dashboard for all your orders and NDRs</li>
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 max-w-md w-full"
          >
            <motion.div
              className="glass-card px-8 py-8 shadow-[0_24px_70px_rgba(3,4,94,0.25)] border-brand-200/80 backdrop-blur-xl"
              whileHover={{ y: -4, boxShadow: "0 28px 80px rgba(3,4,94,0.3)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-2xl bg-brand-100 flex items-center justify-center">
                  <img src={logo} alt="FastFare" width={40} height={40} className="object-contain h-8"/>
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-brand-900">
                      FastFare
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Create your account
                    </span>
                  </div>
                </div>
              </div>

              <motion.form
                onSubmit={handleSubmit(onRegister)}
                className="space-y-4"
                variants={formContainer}
                initial="hidden"
                animate="show"
              >
                <motion.div className="space-y-1" variants={formItem}>
                  <label className="auth-label">Full Name</label>
                  <input
                    {...register("name")}
                    placeholder="Name"
                    className="input-premium ml-1"
                  />
                </motion.div>

                <motion.div className="space-y-1" variants={formItem}>
                  <label className="auth-label">Email</label>
                  <input
                    {...register("email")}
                    placeholder="you@gmail.com"
                    className="input-premium ml-1"
                  />
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  variants={formItem}
                >
                  <div className="space-y-1">
                    <label className="auth-label">Password</label>
                    <input
                      {...register("password")}
                      type="password"
                      placeholder="Create password"
                      className="input-premium ml-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="auth-label">Confirm Password</label>
                    <input
                      {...register("confirm")}
                      type="password"
                      placeholder="Re-enter password"
                      className="input-premium"
                    />
                    {errors.confirm && (
                      <p className="text-[11px] text-red-500 mt-1">
                        {String(errors.confirm.message)}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={formItem}>
                  <button type="submit" className="btn-premium mt-2 p-2">
                    Continue
                  </button>
                </motion.div>
              </motion.form>

              <p className="text-center text-xs text-slate-500 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Login
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
