import { useEffect } from "react";

export default function BrandLoader({ onFinish }) {
  useEffect(() => {
    const t = setTimeout(() => {
      onFinish && onFinish();
    }, 700);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03040a]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/10 to-violet-500/12 p-1 shadow-[0_0_40px_rgba(139,92,246,0.12)]">
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-gradient-to-br from-[#081223] to-[#0a0f1a] p-4 text-white">
            <span className="text-2xl font-bold tracking-tight text-cyan-200">SX</span>
          </div>
          <span className="absolute -bottom-4 animate-pulse text-sm text-cyan-300/80">Loading</span>
        </div>
        <div className="w-48 overflow-hidden rounded-full bg-slate-900/30">
          <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-300 animate-scan" />
        </div>
      </div>
    </div>
  );
}
