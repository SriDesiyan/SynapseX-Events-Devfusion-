import { useNavigate } from "react-router-dom";
import { logoutUser } from "../firebase/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    navigate("/login", { replace: true });
  }

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-14 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
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
      </div>
    </main>
  );
}
