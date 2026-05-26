import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Explore", to: "/explore" },
  { label: "Organizer", to: "/organizer" },
  { label: "Dashboard", to: "/dashboard" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="fixed inset-x-0 top-6 z-20 mx-auto flex max-w-7xl items-center justify-between rounded-[32px] border border-white/10 bg-white/5 px-6 py-4 shadow-glow backdrop-blur-2xl"
    >
      <Link to="/" className="flex items-center gap-3 text-white">
        <span className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400/20 to-violet-500/20 text-lg font-semibold text-cyan-200 ring-1 ring-cyan-300/20">
          SX
        </span>
        <div>
          <p className="text-sm font-semibold tracking-[0.24em] text-cyan-200/90">SynapseX</p>
          <p className="text-xs text-slate-400">AI Events</p>
        </div>
      </Link>

      <div className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <Link key={link.label} to={link.to} className="text-sm text-slate-300 transition hover:text-cyan-200">
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/15"
        >
          Sign in
        </Link>
        <Link
          to="/register"
          className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
        >
          Get started
        </Link>
      </div>
    </motion.nav>
  );
}
