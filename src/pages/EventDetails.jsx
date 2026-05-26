import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventById, deleteEvent } from "../firebase/events";
import { useAuth } from "../contexts/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getEventById(id)
      .then((res) => mounted && setEvent(res))
      .catch((err) => console.error(err))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  async function handleDelete() {
    if (!confirm("Delete this event? This action cannot be undone.")) return;
    try {
      await deleteEvent(id);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Unable to delete event.");
    }
  }

  if (loading) {
    return <main className="min-h-screen bg-[#050816] px-6 py-14 text-slate-100">Loading...</main>;
  }

  if (!event) {
    return <main className="min-h-screen bg-[#050816] px-6 py-14 text-slate-100">Event not found.</main>;
  }

  const isOrganizer = currentUser?.uid === event.organizerId;

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-14 text-slate-100">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-semibold text-white">{event.title}</h1>
            <p className="mt-3 text-slate-300">{event.category} • {event.venue} • {event.date}</p>
            <p className="mt-4 text-slate-200">{event.description}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold text-cyan-200">{event.price ? `$${event.price}` : "Free"}</p>
            <p className="text-sm text-slate-400">Organizer: {event.organizerEmail}</p>
            {isOrganizer && (
              <div className="mt-4 flex flex-col gap-2">
                <button onClick={() => navigate(`/organizer?edit=${event.id}`)} className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">Edit</button>
                <button onClick={handleDelete} className="rounded-full bg-rose-500/10 px-4 py-2 text-sm text-rose-200">Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
