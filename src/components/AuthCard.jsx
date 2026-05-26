export default function AuthCard({ title, description, children, footer }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-[28px] p-6 glass-muted shadow-glow">
      <div className="space-y-3 pb-3">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">{title}</h1>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
      <div className="space-y-6">{children}</div>
      {footer && <div className="mt-5 text-sm text-slate-400">{footer}</div>}
    </div>
  );
}
