import { useLocation, Link } from "react-router-dom";

export default function JourneyResults() {
  const { state } = useLocation();
  const { profile, recommendations } = state || {};

  if (!profile || !recommendations) {
    return (
      <main className="min-h-screen bg-[#050816] text-slate-100 px-6 py-14">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-2xl p-6 glass-muted">
            <p className="text-sm">No journey found. Start from the <Link to="/journey" className="text-cyan-300">onboarding quiz</Link>.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100 px-6 py-14">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-2xl p-6 glass-muted">
          <h1 className="text-2xl font-bold">Your personalized event journey</h1>
          <p className="text-sm text-slate-400 mt-1">Based on your answers we recommend the following events and a suggested agenda.</p>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div key={rec.event.id} className="rounded-2xl p-4 glass-muted flex gap-4 items-start">
              <div className="flex-shrink-0 w-24 h-16 rounded-md bg-slate-900/60 overflow-hidden">
                {rec.event.imageUrl ? <img src={rec.event.imageUrl} alt={rec.event.title} className="object-cover w-full h-full" /> : <div className="flex h-full items-center justify-center text-sm text-slate-400">No image</div>}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{rec.event.title || rec.event.name || 'Untitled event'}</h3>
                    <p className="text-sm text-slate-400">{rec.event.category} • {rec.event.venue || 'Online'}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-300">Match</div>
                    <div className="text-2xl font-bold text-cyan-300">{rec.score}%</div>
                  </div>
                </div>

                <p className="mt-2 text-sm text-slate-300">{rec.event.description?.slice(0, 180) || 'No description available.'}</p>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
                  {rec.explanations.map((e, i) => (
                    <span key={i} className="rounded-full bg-white/3 px-3 py-1">{e}</span>
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <Link to={`/events/${rec.event.id}`} className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">View event</Link>
                  <button className="rounded-full border border-white/6 px-4 py-2 text-sm text-slate-200">Add to agenda</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-6 glass-muted">
          <h2 className="text-lg font-semibold">Suggested agenda</h2>
          <p className="text-sm text-slate-400 mt-2">We recommend attending the top 3 matches. Each event duration and session times are indicative — check the event page for exact schedule.</p>

          <ol className="mt-4 list-decimal list-inside space-y-3 text-sm text-slate-300">
            {recommendations.slice(0, 3).map((rec, i) => (
              <li key={rec.event.id} className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{rec.event.title || 'Untitled event'}</div>
                  <div className="text-xs text-slate-400">{rec.event.category} • {rec.event.venue || 'Online'}</div>
                </div>
                <div className="text-sm text-slate-300">Match {rec.score}%</div>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </main>
  );
}
