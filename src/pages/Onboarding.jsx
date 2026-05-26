import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLiveEvents } from "../firebase/events";
import { getRecommendations } from "../utils/aiRecommendation";
import VideoBackground from "../components/VideoBackground";

const INTERESTS = ["Hackathon", "Workshop", "Meetup", "Conference", "Webinar", "Networking"];

export default function Onboarding() {
  const navigate = useNavigate();
  const [interests, setInterests] = useState([]);
  const [skillLevel, setSkillLevel] = useState("intermediate");
  const [goal, setGoal] = useState("learn");
  const [networking, setNetworking] = useState(true);
  const [loading, setLoading] = useState(false);

  function toggleInterest(value) {
    setInterests((prev) => (prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const events = await getLiveEvents();
      const profile = { interests, skillLevel, goal, networking };
      const recommendations = getRecommendations(profile, events, 6);
      navigate("/journey/results", { state: { profile, recommendations } });
    } catch (err) {
      console.error(err);
      alert("Unable to generate recommendations right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-slate-100 px-6 py-14">
      <VideoBackground />
      <div className="relative z-10 mx-auto max-w-3xl space-y-8">
        <div className="rounded-2xl p-6 glass-muted">
          <h1 className="text-2xl font-bold">Personalize your event journey</h1>
          <p className="text-sm text-slate-400 mt-1">Tell us a little about yourself so we can recommend the best events.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl p-6 glass-muted space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300">Interests</label>
            <div className="mt-3 flex flex-wrap gap-3">
              {INTERESTS.map((it) => (
                <button
                  key={it}
                  type="button"
                  onClick={() => toggleInterest(it)}
                  className={`rounded-full px-4 py-2 text-sm ${interests.includes(it) ? 'bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-900' : 'bg-white/3 text-slate-200'}`}
                >
                  {it}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">Skill level</label>
            <div className="mt-2 flex gap-3">
              {['beginner','intermediate','advanced'].map((s) => (
                <label key={s} className="inline-flex items-center gap-2">
                  <input type="radio" name="skill" value={s} checked={skillLevel===s} onChange={() => setSkillLevel(s)} />
                  <span className="text-sm capitalize">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300">Primary goal</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-2 rounded-full bg-white/3 px-4 py-2">
              <option value="learn">Learn new skills</option>
              <option value="network">Meet people</option>
              <option value="build">Build & ship</option>
              <option value="explore">Explore startups</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-300">Prefer networking?</p>
              <p className="text-xs text-slate-400">If enabled we favour events with networking sessions.</p>
            </div>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={networking} onChange={(e) => setNetworking(e.target.checked)} />
            </label>
          </div>

          <div className="flex items-center justify-end">
            <button type="submit" disabled={loading} className="rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 font-semibold text-slate-900">
              {loading ? 'Generating...' : 'Find my journey'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
