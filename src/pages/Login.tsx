import { motion, type Variants } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import logo from "../assets/logo.png";

const backend = import.meta.env.VITE_BACKEND_URL;

interface FormData {
  email: string;
  password: string;
}

const formContainer:Variants = {
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

const formItem:Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onLogin: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch(`${backend}/api/v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Invalid email or password");
      }

      const result = await res.json();

      if (result.token) {
        localStorage.setItem("ff_token", result.token);
      }

      const redirectTo =
        result.redirect || result.user?.dashboard || result.user?.home || "/";

      navigate(redirectTo);
      reset();
    } catch (err) {
      alert((err as Error).message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-b from-brand-100 via-brand-100/70 to-brand-100">
      <header className="w-full border-b border-brand-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-brand-100 flex items-center justify-center shadow-sm">
              <img src={logo} alt="FastFare" width={40} height={40} className="object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-brand-900">FastFare</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10 z-10">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
          <motion.div
            className="flex-1 space-y-5"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.p
              className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-700"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
              </span>
              FastFare
            </motion.p>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Ship smarter with a{" "}
              <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
                single dashboard.
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-600 max-w-lg">
              Centralize your orders, track shipments in real time, and optimize shipping.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex-1 max-w-md w-full"
          >
            <motion.div
              className="glass-card px-8 py-8"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-2xl bg-brand-100 flex items-center justify-center">
                    <img src={logo} alt="FastFare" width={40} height={40} className="object-contain" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-brand-900">FastFare</span>
                    <span className="text-[11px] text-slate-500">Logistics dashboard</span>
                  </div>
                </div>
              </div>

              <motion.form
                onSubmit={handleSubmit(onLogin)}
                className="space-y-4"
                variants={formContainer}
                initial="hidden"
                animate="show"
              >
                <motion.div variants={formItem}>
                  <label className="auth-label">Email ID </label>
                  <input
                    {...register("email")}
                    placeholder="you@gmail.com"
                    className="input-premium px-4 py-1 ml-5"
                    type="email"
                    required
                  />
                </motion.div>

                <motion.div variants={formItem}>
                  <label className="auth-label">Password</label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Enter your password"
                    className="input-premium px-3 py-1 ml-4"
                    required
                  />
                </motion.div>

                <motion.div variants={formItem}>
                  <button type="submit" className="btn-premium mt-3 p-2">
                    Login to dashboard
                  </button>
                </motion.div>
              </motion.form>

              <p className="text-center text-xs text-slate-500 mt-6">
                New to FastFare?{" "}
                <Link to="/register" className="auth-link text-blue-500 hover:text-indigo-950">
                  Create your free account
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
