import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import VideoBackground from "../components/VideoBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <VideoBackground />
      <Navbar />

      <div className="relative z-10">
        <Hero />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,_rgba(139,92,246,0.16),transparent_36%),radial-gradient(circle_at_left,_rgba(34,211,238,0.14),transparent_25%)]" />
    </main>
  );
}
