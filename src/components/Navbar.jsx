import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../firebase/auth";

const navLinks = [
  { label: "Explore", to: "/explore" },
  { label: "Journey", to: "/journey" },
  { label: "Organizer", to: "/organizer" },
  { label: "Dashboard", to: "/dashboard" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate('/login');
  }
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="fixed inset-x-0 top-6 z-20 mx-auto flex max-w-7xl items-center justify-between rounded-[32px] border border-white/10 bg-white/5 px-4 py-3 shadow-glow backdrop-blur-2xl glass-muted"
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
          <Link key={link.label} to={link.to} className="text-sm text-slate-300 transition hover:text-cyan-200 neon-link">
            {link.label}
          </Link>
        ))}
      </div>

      {/* mobile menu */}
      <div className="md:hidden">
        <button
          aria-label="menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/3 text-white/90 focus-ring"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
        {open && (
          <div className="absolute right-4 top-20 z-40 w-44 rounded-xl border border-white/8 bg-white/3 p-3 backdrop-blur-lg">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className="block px-3 py-2 text-sm text-slate-200" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            {currentUser ? (
              <>
                <div className="border-t border-white/10 my-2 py-2">
                  <p className="px-3 py-1 text-xs text-slate-400">{currentUser.email}</p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full rounded-md bg-rose-500/10 px-3 py-2 text-sm text-rose-200 text-left"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="mt-2 block rounded-md bg-cyan-400/10 px-3 py-2 text-sm text-cyan-100" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
                <Link to="/register" className="mt-1 block rounded-md bg-gradient-to-r from-cyan-400 to-violet-500 px-3 py-2 text-sm font-semibold text-slate-950" onClick={() => setOpen(false)}>
                  Get started
                </Link>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {currentUser ? (
          <>
            <Link to="/dashboard" className="text-sm text-slate-200">{currentUser.displayName || currentUser.email}</Link>
            <button onClick={handleLogout} className="rounded-full bg-rose-500/10 px-5 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/15">Sign out</button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </motion.nav>
  );
}
