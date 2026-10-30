/** A softly glowing, floating orb used as the face of Skin AI. `busy` makes it pulse while a result is being prepared. */
export function AiOrb({ className = "size-24", busy = false }: { className?: string; busy?: boolean }) {
  return (
    <span aria-hidden="true" className={`relative inline-block shrink-0 ${className}`}>
      <span className={`absolute inset-0 rounded-full bg-sage/40 ${busy ? "ai-ring" : "opacity-0"}`} />
      <span className="absolute -inset-[8%] rounded-full opacity-70 blur-md ai-spin-slow" style={{ background: "conic-gradient(from 0deg, var(--sage), transparent 35%, var(--mist), transparent 70%, var(--sage))" }} />
      <span
        className="absolute inset-0 rounded-full shadow-[0_10px_40px_-8px] shadow-sage/60"
        style={{ background: "radial-gradient(circle at 30% 26%, white 0%, color-mix(in oklab, var(--sage) 35%, white) 28%, var(--sage) 62%, var(--sage-dark) 100%)" }}
      />
      <span className="absolute left-[22%] top-[16%] h-[22%] w-[34%] rounded-full bg-white/70 blur-[3px]" />
    </span>
  );
}
