export default function AuthCard({ title, description, children, footer }) {
  return (
    <div className="mx-auto w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
      <div className="space-y-4 pb-4">
        <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
        <p className="text-sm text-slate-300">{description}</p>
      </div>
      <div className="space-y-6">{children}</div>
      {footer && <div className="mt-6 text-sm text-slate-400">{footer}</div>}
    </div>
  );
}
