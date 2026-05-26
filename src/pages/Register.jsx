import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmail } from "../firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import AuthCard from "../components/AuthCard";

export default function Register() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [currentUser, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerWithEmail(email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError("Unable to create your account. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10 text-slate-100">
      <div className="w-full max-w-xl">
        <AuthCard
          title="Create your SynapseX account"
          description="Fast registration for organizers and attendees with secure Firebase auth."
          footer={
            <p>
              Already have an account? <Link className="text-cyan-300 hover:text-white" to="/login">Sign in</Link>
            </p>
          }
        >
          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-slate-300">
              Email
              <input
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white shadow-sm outline-none transition focus:border-cyan-300"
                type="email"
                placeholder="hello@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-300">
              Password
              <input
                className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white shadow-sm outline-none transition focus:border-cyan-300"
                type="password"
                placeholder="Create a secure password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={6}
                required
              />
            </label>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-3xl bg-gradient-to-r from-cyan-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </AuthCard>
      </div>
    </main>
  );
}
