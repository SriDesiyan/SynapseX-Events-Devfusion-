export default function NeonButton({ children, href, type = "button", onClick }) {
  const className =
    "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(56,189,248,0.24)] transition-transform hover:scale-[1.02]";

  const inner = (
    <span className="relative flex items-center gap-2">
      <span className="absolute -inset-0 rounded-full opacity-0 transition group-hover:opacity-100" style={{ boxShadow: '0 8px 40px rgba(139,92,246,0.12)' }} />
      <span className="relative z-10">{children}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} className={`group ${className}`}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`group ${className}`}>
      {inner}
    </button>
  );
}
