export default function VideoBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        autoPlay
        muted
        loop
        playsInline
        src="https://cdn.coverr.co/videos/coverr-futuristic-city-lights-5252/1080p.mp4"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.18),_transparent_20%),linear-gradient(180deg,rgba(15,23,42,0.24),rgba(15,23,42,0.88))]" />
      <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(15,23,42,0.95),transparent)]" />
    </div>
  );
}
