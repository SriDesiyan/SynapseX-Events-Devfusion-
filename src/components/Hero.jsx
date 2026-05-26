import { motion } from "framer-motion";
import NeonButton from "./NeonButton";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-24 sm:px-10 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: "easeOut" }}
        className="mb-6 inline-flex rounded-full px-4 py-2 text-sm text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.18)] glass-muted"
      >
        Launching the future of events — AI-backed, secure, and built for creators.
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        className="space-y-8"
      >
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            SynapseX Events — premium AI-powered events and ticketing.
          </h1>
          <p className="text-lg text-slate-300 sm:text-xl">
            Create, discover, and manage hackathons with a futuristic dark-neon interface, real-time ticketing, and intelligent recommendations.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link to="/explore">
            <NeonButton>Explore events</NeonButton>
          </Link>
          <Link to="/register" className="inline-flex">
            <button className="inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-950/80 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:bg-slate-900/90">
              Start free trial
            </button>
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="mt-12 grid gap-4 sm:grid-cols-3"
      >
        {[
          { label: "90+ events", value: "Curated listings" },
          { label: "Secure checkout", value: "Razorpay sandbox" },
          { label: "AI recommendations", value: "Smart match" },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/8 p-5 glass-muted">
            <p className="text-sm uppercase tracking-wider text-cyan-200/80">{item.label}</p>
            <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
