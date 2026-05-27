import EventForm from "../components/EventForm";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Organizer() {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const editId = search.get("edit");

  function handleEditComplete() {
    navigate("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-14 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Organizer dashboard</p>
            <h1 className="text-4xl font-semibold text-white">Create and publish events</h1>
            <p className="text-slate-400">
              Use the event creation form below to add event details, upload an image, and set ticket pricing.
            </p>
          </div>
        </div>

        <EventForm editingEventId={editId} onEditComplete={handleEditComplete} />
      </div>
    </main>
  );
}
