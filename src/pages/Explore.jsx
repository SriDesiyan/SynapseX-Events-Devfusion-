import { Link } from "react-router-dom";
import VideoBackground from "../components/VideoBackground";
import { useEffect, useState } from "react";
import { getLiveEvents } from "../firebase/events";
import EventCard from "../components/EventCard";

export default function Explore() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getLiveEvents()
      .then((res) => {
        if (mounted) setEvents(res);
      })
      .catch((err) => console.error(err))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-6 py-14 text-slate-100">
      <VideoBackground />
      <div className="relative z-10 mx-auto max-w-6xl space-y-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-white">Explore events</h1>
              <p className="mt-3 text-slate-300">Browse curated hackathons, workshops, and premium community gatherings.</p>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-400/30 transition hover:bg-cyan-400/15"
            >
              Sign in to book
            </Link>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <p className="text-slate-300">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-slate-300">No events available right now.</p>
          ) : (
            events.map((ev) => (
              <EventCard key={ev.id} event={ev} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
