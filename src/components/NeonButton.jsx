export default function NeonButton({ children, href, type = "button", onClick }) {
  const className =
    "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_32px_rgba(56,189,248,0.24)] transition hover:scale-[1.01] hover:brightness-110";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
