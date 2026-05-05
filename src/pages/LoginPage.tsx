import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { userAccounts } from "../data/mockData";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAccounts, setShowAccounts] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password || password.length < 3) {
      setError("Password must be at least 4 characters.");
      return;
    }

    setLoading(true);
    try {
      const success = await login(username.trim(), password);
      if (!success) {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const fillAccount = (acc: typeof userAccounts[number]) => {
    setUsername(acc.name);
    setPassword(acc.password);
    setShowAccounts(false);
    setError("");
  };

  return (
    <main className="relative min-h-dvh overflow-y-auto bg-[#08111f] px-4 py-4 text-slate-900 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 40, -16, 0], y: [0, -28, 18, 0], scale: [1, 1.08, 0.98, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-primary-500/35 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -32, 18, 0], y: [0, 24, -20, 0], scale: [1, 0.95, 1.06, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-9rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan-400/20 blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.22, 0.42, 0.28, 0.22], rotate: [0, 12, -8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-400/16 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-2rem)] max-w-6xl items-center justify-center">
        <motion.section
          initial={{ opacity: 0, scale: 0.96, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="grid w-full overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.08] shadow-2xl shadow-black/40 backdrop-blur-2xl lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="relative hidden min-h-[620px] p-8 text-white lg:block xl:p-10">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.12, delayChildren: 0.18 }}
              className="relative z-10 flex h-full flex-col justify-between"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/15">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m8-4a8 8 0 11-16 0 8 8 0 0116 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold">PM Dashboard</h1>
                  <p className="text-sm text-slate-300">Payment monitoring system</p>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200">NICSI</p>
                <h2 className="mt-4 text-3xl font-bold leading-tight xl:text-[2.5rem]">
                  Welcome to the NICSI Project Management Dashboard
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-6 text-slate-300">
                  A unified platform to monitor, manage, and accelerate government digital initiatives with precision, transparency, and efficiency.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">🚀 Key features</p>
                <ul className="space-y-2.5">
                  {[
                    {
                      icon: "📊",
                      title: "Real-time Project Monitoring",
                      desc: "Track progress, milestones, and deliverables across all projects.",
                    },
                    {
                      icon: "🧠",
                      title: "Data-Driven Decision Making",
                      desc: "Insights & analytics for strategic governance.",
                    },
                    {
                      icon: "🔐",
                      title: "Secure & Role-Based Access",
                      desc: "Multi-level authentication ensuring data security.",
                    },
                    {
                      icon: "⚙️",
                      title: "Integrated Workflow Management",
                      desc: "Seamless coordination between departments, vendors, and stakeholders.",
                    },
                    {
                      icon: "📑",
                      title: "Reports & Compliance Tracking",
                      desc: "Auto-generated reports aligned with government standards.",
                    },
                  ].map((feature, index) => (
                    <motion.li
                      key={feature.title}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + index * 0.08, duration: 0.45, ease: "easeOut" }}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-base">
                        {feature.icon}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{feature.title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-slate-300">{feature.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

          </div>

          <div className="flex min-h-[620px] items-center justify-center bg-white p-5 sm:p-8 lg:bg-white/96">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.08, delayChildren: 0.28 }}
              className="w-full max-w-md"
            >
              <motion.div variants={fadeUp} className="mb-7 text-center lg:text-left">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/25 lg:mx-0">
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 12v-2m8-4a8 8 0 11-16 0 8 8 0 0116 0z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-600">Secure sign in</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">Welcome to PM Dashboard</h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Enter your credentials to continue monitoring payment activity.
                </p>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m0 3.75h.008v.008H12V16.5zm9-4.5a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <motion.div variants={fadeUp}>
                  <label htmlFor="username" className="mb-2 block text-sm font-semibold text-slate-700">
                    Username
                  </label>
                  <div className="relative">
                    <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206A8.963 8.963 0 0112 21" />
                    </svg>
                    <input
                      id="username"
                      type="text"
                      autoComplete="username"
                      disabled={loading}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-950 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="admin"
                    />
                  </div>
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <svg className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 10.5V7.75a4.5 4.5 0 00-9 0v2.75m-.75 0h10.5A1.75 1.75 0 0119 12.25v6A1.75 1.75 0 0117.25 20H6.75A1.75 1.75 0 015 18.25v-6a1.75 1.75 0 011.75-1.75z" />
                    </svg>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      disabled={loading}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm text-slate-950 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 transition hover:text-slate-700"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c1.707 0 3.32-.406 4.746-1.126M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.066 7.5a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.895 7.895L21 21m-3.227-3.227l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="flex items-center justify-between gap-3 text-sm">
                  <label className="inline-flex items-center gap-2 text-slate-600">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                    Remember me
                  </label>
                  <button type="button" className="font-semibold text-primary-600 transition hover:text-primary-700">
                    Forgot password?
                  </button>
                </motion.div>

                <motion.button
                  variants={fadeUp}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="relative h-12 w-full rounded-2xl bg-primary-600 text-sm font-bold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign in to PM Dashboard"
                  )}
                </motion.button>
              </form>

              {/* Demo accounts */}
              <motion.div variants={fadeUp} className="mt-5">
                <button
                  type="button"
                  onClick={() => setShowAccounts((v) => !v)}
                  className="w-full flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-500 ring-1 ring-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <span className="font-medium text-slate-600">Demo accounts — click to view & fill</span>
                  <svg className={`h-4 w-4 transition-transform ${showAccounts ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {showAccounts && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 rounded-2xl ring-1 ring-slate-200 overflow-hidden">
                        {userAccounts.map((acc, idx) => (
                          <button
                            key={acc.email}
                            type="button"
                            onClick={() => fillAccount(acc)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-xs transition-colors hover:bg-primary-50 ${idx > 0 ? "border-t border-slate-100" : ""}`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-[10px] font-bold ${acc.role === "admin" ? "bg-primary-600" : "bg-indigo-400"}`}>
                                {acc.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-700 truncate">{acc.name}</p>
                                <p className="text-slate-400 truncate">{acc.email}</p>
                              </div>
                            </div>
                            <span className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${acc.role === "admin" ? "bg-primary-100 text-primary-700" : "bg-indigo-100 text-indigo-700"}`}>
                              {acc.role}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}