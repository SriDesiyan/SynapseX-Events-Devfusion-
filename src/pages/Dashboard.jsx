import { useNavigate } from "react-router-dom";
import { logoutUser } from "../firebase/auth";
import VideoBackground from "../components/VideoBackground";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { getEventsByOrganizer } from "../firebase/events";
import EventCard from "../components/EventCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    let mounted = true;
    getEventsByOrganizer(currentUser.uid)
      .then((res) => mounted && setMyEvents(res))
      .catch((err) => console.error(err));
    return () => (mounted = false);
  }, [currentUser]);

  async function handleLogout() {
    await logoutUser();
    navigate("/login", { replace: true });
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] px-6 py-14 text-slate-100">
      <VideoBackground />
      <div className="relative z-10 mx-auto max-w-5xl space-y-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-white">Organizer dashboard</h1>
              <p className="mt-3 text-slate-300">Manage events, tickets, and generate AI recommendations from a single panel.</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/15"
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white mb-4">My events</h2>
          {myEvents.length === 0 ? (
            <p className="text-slate-300">You have no events yet. Create one from the Organizer page.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myEvents.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
