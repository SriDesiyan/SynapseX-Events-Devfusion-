import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center px-6 py-16 text-slate-100">
      <div className="w-full max-w-4xl rounded-[36px] border border-white/10 bg-white/5 p-10 shadow-glow backdrop-blur-xl">
        <div className="space-y-6">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/90">SynapseX Events</p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-white sm:text-6xl">
              AI-powered events with modern ticketing and premium organizer workflows.
            </h1>
            <p className="mt-6 max-w-xl text-slate-300">
              Explore futuristic startup-friendly hackathons, book tickets instantly, manage events with smart recommendations, and unlock a premium neon experience.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/explore"
              className="inline-flex items-center justify-center rounded-3xl bg-cyan-400/10 px-7 py-3 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/20 transition hover:bg-cyan-400/15"
            >
              Browse events
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 to-violet-500 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
