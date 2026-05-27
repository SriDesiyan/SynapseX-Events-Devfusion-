import { useState, useEffect } from "react";
import { createEvent, updateEvent, getEventById } from "../firebase/events";
import { uploadEventImage } from "../firebase/storage";
import { useAuth } from "../contexts/AuthContext";

const categories = [
  "Hackathon",
  "Workshop",
  "Meetup",
  "Conference",
  "Webinar",
  "Networking",
];

export default function EventForm({ editingEventId, onEditComplete }) {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    title: "",
    category: "Hackathon",
    date: "",
    venue: "",
    price: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleFile(event) {
    const file = event.target.files[0];
    setImageFile(file ?? null);
  }

  useEffect(() => {
    let mounted = true;
    if (!editingEventId) return;
    getEventById(editingEventId)
      .then((ev) => {
        if (!mounted || !ev) return;
        setForm({
          title: ev.title || "",
          category: ev.category || "Hackathon",
          date: ev.date || "",
          venue: ev.venue || "",
          price: ev.price ? String(ev.price) : "",
          description: ev.description || "",
        });
      })
      .catch((err) => console.error(err));
    return () => (mounted = false);
  }, [editingEventId]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.title.trim()) {
      setError("Please enter the event title.");
      return;
    }

    if (!form.date) {
      setError("Please choose the event date.");
      return;
    }

    if (!form.venue.trim()) {
      setError("Please enter the venue.");
      return;
    }

    if (!form.description.trim()) {
      setError("Please write a short description.");
      return;
    }

    if (Number(form.price) < 0) {
      setError("Ticket price cannot be negative.");
      return;
    }

    // When editing, allow keeping existing image if no new file selected
    if (!imageFile && !editingEventId) {
      setError("Please upload an event image.");
      return;
    }

    setLoading(true);

    try {
      if (editingEventId) {
        // Update existing event
        await updateEvent(editingEventId, {
          title: form.title.trim(),
          category: form.category,
          date: form.date,
          venue: form.venue.trim(),
          description: form.description.trim(),
          price: Number(form.price),
        });

        if (imageFile) {
          const imageUrl = await uploadEventImage(imageFile, editingEventId);
          await updateEvent(editingEventId, { imageUrl });
        }

        setSuccess("Event updated successfully.");
        if (onEditComplete) onEditComplete();
      } else {
        const eventRef = await createEvent({
          title: form.title.trim(),
          category: form.category,
          date: form.date,
          venue: form.venue.trim(),
          description: form.description.trim(),
          price: Number(form.price),
          organizerId: currentUser?.uid,
          organizerEmail: currentUser?.email,
          imageUrl: "",
          status: "draft",
        });

        const imageUrl = await uploadEventImage(imageFile, eventRef.id);
        await updateEvent(eventRef.id, {
          imageUrl,
          status: "live",
        });

        setSuccess("Event created successfully. It will appear in the dashboard shortly.");
        setForm({
          title: "",
          category: "Hackathon",
          date: "",
          venue: "",
          price: "",
          description: "",
        });
        setImageFile(null);
        event.target.reset();
      }
    } catch (err) {
      console.error(err);
      setError("Unable to save the event. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">{editingEventId ? "Edit event" : "Create a new event"}</h2>
        <p className="text-sm text-slate-400">Add event details, set the ticket price, and upload an image for the listing.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          Event title
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            type="text"
            placeholder="AI Hackathon 2026"
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-slate-950 text-white">
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          Date
          <input
            name="date"
            value={form.date}
            onChange={handleChange}
            type="date"
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          Venue
          <input
            name="venue"
            value={form.venue}
            onChange={handleChange}
            type="text"
            placeholder="Neon Labs Arena"
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          />
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-300">
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the event, speakers, workshops, and audience benefits."
          className="w-full rounded-[28px] border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
        />
      </label>

      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-300">
          Ticket price (USD)
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            min="0"
            step="0.01"
            placeholder="25"
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-300">
          Event image
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition file:mr-4 file:border-0 file:rounded-full file:bg-cyan-400/10 file:px-4 file:py-2 file:text-sm file:text-cyan-100"
          />
        </label>
      </div>

      {imageFile && (
        <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
          Selected image: <span className="font-medium text-white">{imageFile.name}</span>
        </div>
      )}

      {error && <p className="text-sm text-rose-400">{error}</p>}
      {success && <p className="text-sm text-emerald-300">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-3xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-4 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (editingEventId ? "Updating..." : "Saving event...") : (editingEventId ? "Update event" : "Create event")}
      </button>
    </form>
  );
}
