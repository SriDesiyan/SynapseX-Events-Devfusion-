import { useParams } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-14 text-slate-100">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <h1 className="text-4xl font-semibold text-white">Event details</h1>
        <p className="mt-3 text-slate-300">Viewing event <span className="font-semibold text-cyan-300">{id}</span>.</p>
      </div>
    </main>
  );
}
