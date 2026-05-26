import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  if (!event) return null;
  const dateStr = event.date ? new Date(event.date).toLocaleDateString() : "TBA";

  return (
    <Link to={`/events/${event.id}`} className="group block rounded-2xl overflow-hidden border border-white/6 bg-white/3 p-0 shadow-glow transition hover:scale-[1.01]">
      <div className="relative h-44 w-full bg-slate-800">
        {event.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover transition group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">No image</div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
        <p className="mt-1 text-sm text-slate-300">{event.category} • {dateStr}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-medium text-cyan-200">{event.price ? `$${event.price}` : "Free"}</p>
          <span className="text-xs text-slate-400">{event.venue}</span>
        </div>
      </div>
    </Link>
  );
}
