import { useState, useRef, type FormEvent, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const features = [
  {
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Real-time Monitoring",
    desc: "Track milestones & deliverables across all projects.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/15",
  },
  {
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.636 6.364l.707-.707M12 21v-1m-6.364-1.636l.707-.707M9 12a3 3 0 116 0 3 3 0 01-6 0z"
        />
      </svg>
    ),
    title: "Data-Driven Insights",
    desc: "Analytics for strategic governance decisions.",
    color: "text-violet-400",
    bg: "bg-violet-400/15",
  },
  {
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: "Role-Based Access",
    desc: "Multi-level authentication & data security.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/15",
  },
  {
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
    title: "Workflow Management",
    desc: "Seamless coordination across departments.",
    color: "text-amber-400",
    bg: "bg-amber-400/15",
  },
  {
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "Reports & Compliance",
    desc: "Auto-generated government-aligned reports.",
    color: "text-rose-400",
    bg: "bg-rose-400/15",
  },
  {
    icon: (
      <svg
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
    ),
    title: "Payment Tracking",
    desc: "Monitor invoices, POs, and balance status.",
    color: "text-sky-400",
    bg: "bg-sky-400/15",
  },
];

export default function LoginPage() {
  const { login, verifyOtp } = useAuth();
  const [step, setStep] = useState<"login" | "otp">("login");
  const [currentUsername, setCurrentUsername] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // OTP fields (6 digits)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const handleLogin = async (e: FormEvent) => {
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
      console.log("Login success:", success);
      if (success) {
        setCurrentUsername(username.trim());
        setStep("otp");
        setTimeout(() => inputRefs.current[0]?.focus(), 100);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    const nextIndex = pasted.length < 6 ? pasted.length : 5;
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }
    setLoading(true);
    try {
      const success = await verifyOtp(otpCode);
      if (!success) {
        setError("Invalid OTP. Please try again.");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (currentUsername) {
      setLoading(true);
      try {
        await login(currentUsername, "");
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <main className="relative min-h-dvh overflow-y-auto bg-[#08111f] text-slate-900">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, -16, 0],
            y: [0, -28, 18, 0],
            scale: [1, 1.08, 0.98, 1],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-10rem] top-[-8rem] h-[28rem] w-[28rem] rounded-full bg-primary-500/30 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -32, 18, 0],
            y: [0, 24, -20, 0],
            scale: [1, 0.95, 1.06, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-9rem] top-1/3 h-[30rem] w-[30rem] rounded-full bg-cyan-400/20 blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.18, 0.38, 0.22, 0.18],
            rotate: [0, 12, -8, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-12rem] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-dvh max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] shadow-2xl shadow-black/50 backdrop-blur-2xl lg:grid-cols-[1fr_420px]"
        >
          {/* ── LEFT PANEL ── */}
          <div className="relative hidden lg:flex flex-col justify-between min-h-[640px] p-10 xl:p-12 text-white">
            {/* Top: Logo + branding */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold leading-tight">
                  PM Dashboard
                </p>
                <p className="text-xs text-slate-400">
                  NICSI · Payment Monitoring System
                </p>
              </div>
            </motion.div>

            {/* Middle: Headline + description */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.55 }}
              className="py-8"
            >
              <span className="inline-block mb-3 rounded-full bg-cyan-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-cyan-300 ring-1 ring-cyan-400/25">
                NICSI · Government of India
              </span>
              <h1 className="text-3xl xl:text-4xl font-bold leading-tight text-white">
                NICSI Project
                <br />
                Management Dashboard
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-300 max-w-md">
                A unified platform to monitor, manage, and accelerate government
                digital initiatives — with precision, transparency, and
                efficiency.
              </p>
            </motion.div>

            {/* Bottom: Features grid */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-cyan-300/80">
                Key Features
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {features.map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.52 + i * 0.06, duration: 0.4 }}
                    className="flex items-start gap-2.5 rounded-xl border border-white/8 bg-white/[0.05] p-3 backdrop-blur"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${f.bg} ${f.color}`}
                    >
                      {f.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white leading-snug">
                        {f.title}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400 leading-snug">
                        {f.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT PANEL: Login Form ── */}
          <div className="flex items-center justify-center bg-white/95 backdrop-blur px-6 py-10 sm:px-10 lg:rounded-r-[2rem]">
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.08, delayChildren: 0.25 }}
              className="w-full max-w-sm"
            >
              {/* Form header */}
              <motion.div variants={fadeUp} className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/25">
                  <svg
                    className="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-600">
                  Secure Sign In
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  Welcome Back
                </h2>
                <p className="mt-1.5 text-sm text-slate-500">
                  Enter your credentials to access the dashboard.
                </p>
              </motion.div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v3.75m0 3.75h.008v.008H12V16.5zm9-4.5a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Form */}
              {step === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Username */}
                  <motion.div variants={fadeUp}>
                    <label
                      htmlFor="username"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <svg
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206A8.963 8.963 0 0112 21"
                        />
                      </svg>
                      <input
                        id="username"
                        type="text"
                        autoComplete="username"
                        disabled={loading}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={fadeUp}>
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-sm font-semibold text-slate-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <svg
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16.5 10.5V7.75a4.5 4.5 0 00-9 0v2.75m-.75 0h10.5A1.75 1.75 0 0119 12.25v6A1.75 1.75 0 0117.25 20H6.75A1.75 1.75 0 015 18.25v-6a1.75 1.75 0 011.75-1.75z"
                        />
                      </svg>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        disabled={loading}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-12 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 transition hover:text-slate-700"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c1.707 0 3.32-.406 4.746-1.126M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.066 7.5a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.895 7.895L21 21m-3.227-3.227l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Remember me / Forgot */}
                  <motion.div
                    variants={fadeUp}
                    className="flex items-center justify-between text-sm"
                  >
                    <label className="inline-flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </motion.div>

                  {/* Submit */}
                  <motion.button
                    variants={fadeUp}
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="mt-2 h-11 w-full rounded-xl bg-primary-600 text-sm font-bold text-white shadow-md shadow-primary-600/25 transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                        Signing in...
                      </span>
                    ) : (
                      "Sign in to PM Dashboard"
                    )}
                  </motion.button>
                </form>
              ) : (
                /* ───── OTP VERIFICATION ───── */
                <>
                  <motion.div variants={fadeUp} className="mb-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/25">
                      <svg
                        className="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16.5 10.5V7.75a4.5 4.5 0 00-9 0v2.75m-.75 0h10.5A1.75 1.75 0 0119 12.25v6A1.75 1.75 0 0117.25 20H6.75A1.75 1.75 0 015 18.25v-6a1.75 1.75 0 011.75-1.75z"
                        />
                      </svg>
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary-600">
                      Two-Factor Authentication
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                      Verify OTP
                    </h2>
                    <p className="mt-1.5 text-sm text-slate-500">
                      Enter the 6-digit code sent to your registered mobile
                      number.
                    </p>
                  </motion.div>
                  <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <motion.div variants={fadeUp}>
                      <div className="flex items-center justify-center gap-3">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el) => {
                              inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            disabled={loading}
                            autoFocus={index === 0}
                            onPaste={index === 0 ? handleOtpPaste : undefined}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className="h-14 w-14 rounded-xl border border-slate-200 bg-slate-50 text-center text-xl font-bold text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        ))}
                      </div>
                    </motion.div>
                    <motion.button
                      variants={fadeUp}
                      whileHover={{ scale: loading ? 1 : 1.01 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="h-11 w-full rounded-xl bg-primary-600 text-sm font-bold text-white shadow-md shadow-primary-600/25 transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                          Verifying...
                        </span>
                      ) : (
                        "Verify & Sign In"
                      )}
                    </motion.button>
                  </form>
                  <motion.p
                    variants={fadeUp}
                    className="mt-6 text-center text-sm text-slate-500"
                  >
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleResend}
                      className="font-semibold text-primary-600 hover:text-primary-700 transition-colors disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </motion.p>
                </>
              )}

              {/* Footer note */}
              <motion.p
                variants={fadeUp}
                className="mt-6 text-center text-xs text-slate-400"
              >
                © {new Date().getFullYear()} NICSI · Government of India. All
                rights reserved.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
