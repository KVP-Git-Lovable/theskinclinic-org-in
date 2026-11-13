import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Moon, Sparkles, Sun, Sunrise, Sunset } from "lucide-react";

const STEPS = [
  { time: "Morning", icon: Sunrise, glow: "from-amber-200/70 to-rose-100/40", text: "Cleanse gently, moisturise, and apply a broad-spectrum sunscreen." },
  { time: "Midday", icon: Sun, glow: "from-yellow-100/80 to-sky-100/60", text: "Hot and humid? Reapply sunscreen about every two hours when you're outdoors." },
  { time: "Evening", icon: Sunset, glow: "from-orange-200/70 to-fuchsia-100/40", text: "Wash off sweat, sunscreen and the day's pollution with a gentle cleanser." },
  { time: "Night", icon: Moon, glow: "from-indigo-200/60 to-slate-300/40", text: "Moisturise, and use only the treatments your dermatologist has advised." },
];

/**
 * A calm animated card for the Blog hero: one day of coastal skin care. The highlight moves from morning to night on its own,
 * the glow behind the card changes with the time of day, and a line fills down the timeline. Hovering pauses it; clicking a step jumps to it.
 */
export function CoastalDay() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % STEPS.length), 4000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative w-[28rem] overflow-hidden rounded-2xl border border-sage/25 bg-background/85 p-7 shadow-2xl shadow-sage/15 backdrop-blur"
    >
      {/* The glow behind the card follows the time of day. */}
      {STEPS.map((s, i) => (
        <div key={s.time} aria-hidden className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.glow} transition-opacity duration-[1500ms] ${i === active ? "opacity-100" : "opacity-0"}`} />
      ))}
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-sage/25 blur-3xl ai-float-slow" />

      <p className="relative flex items-center gap-2 text-[11.5px] uppercase tracking-[0.3em] text-sage-dark">
        <Sparkles className="size-3.5" /> A coastal skin day
      </p>
      <h2 className="relative mt-3 font-display text-3xl leading-tight">
        Four small habits, <em className="text-sage">from sunrise to sleep.</em>
      </h2>

      <ol className="relative mt-7">
        {/* The timeline: a faint line with a brighter part that grows down to the active step. */}
        <span aria-hidden className="absolute left-[1.35rem] top-6 bottom-6 w-px bg-sage/20" />
        <span
          aria-hidden
          className="absolute left-[1.35rem] top-6 w-px bg-gradient-to-b from-sage to-sage-dark transition-[height] duration-[1200ms] ease-out"
          style={{ height: `calc((100% - 3rem) * ${active / (STEPS.length - 1)})` }}
        />
        {STEPS.map((s, i) => {
          const on = i === active;
          const passed = i < active;
          return (
            <li key={s.time}>
              <button type="button" onClick={() => setActive(i)} aria-current={on} className="relative flex w-full items-start gap-4 rounded-xl py-2.5 text-left">
                <span className="relative flex size-11 shrink-0 items-center justify-center">
                  {on && <span aria-hidden className="ai-ring absolute inset-0 rounded-full bg-sage/40" />}
                  <span className={`relative flex size-11 items-center justify-center rounded-full transition-all duration-700 ${on ? "scale-110 bg-gradient-to-br from-sage to-sage-dark text-ivory shadow-lg shadow-sage/40" : passed ? "bg-sage/25 text-sage-dark" : "bg-mist text-sage-dark/70"}`}>
                    <s.icon className={`size-5 transition-transform duration-1000 ${on ? "rotate-[360deg]" : ""}`} strokeWidth={1.5} />
                  </span>
                </span>
                <span className="min-w-0 pt-1">
                  <span className={`block font-display text-xl leading-none transition-opacity duration-500 ${on ? "opacity-100" : "opacity-60"}`}>{s.time}</span>
                  <span className={`grid transition-all duration-700 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <span className="overflow-hidden">
                      <span className={`block pt-2 text-sm leading-relaxed text-muted-foreground transition-transform duration-700 ${on ? "translate-y-0" : "translate-y-2"}`}>{s.text}</span>
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="relative mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
        <p className="text-xs leading-relaxed text-muted-foreground">General guidance, not a treatment plan.</p>
        <Link to="/skin-ai" className="group inline-flex shrink-0 items-center gap-2 text-sm text-sage-dark">
          Ask Skin AI <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
