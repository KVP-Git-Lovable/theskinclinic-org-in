import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Moon, Sparkles, Sun, Sunrise, Sunset } from "lucide-react";

const STEPS = [
  { time: "Morning", icon: Sunrise, text: "Cleanse gently, moisturise, and apply a broad-spectrum sunscreen." },
  { time: "Midday", icon: Sun, text: "Hot and humid? Reapply sunscreen about every two hours when you're outdoors." },
  { time: "Evening", icon: Sunset, text: "Wash off sweat, sunscreen and the day's pollution with a gentle cleanser." },
  { time: "Night", icon: Moon, text: "Moisturise, and use only the treatments your dermatologist has advised." },
];

/** A small interactive card for the Blog hero: one day of coastal skin care, stepping through on its own and responding to hover. */
export function CoastalDay() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (hovered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % STEPS.length), 3500);
    return () => window.clearInterval(id);
  }, [hovered]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-[28rem] overflow-hidden rounded-2xl border border-sage/25 bg-background/80 p-7 shadow-2xl shadow-sage/15 backdrop-blur"
    >
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-sage/25 blur-3xl ai-float-slow" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-mist blur-3xl ai-float" />
      <p className="relative flex items-center gap-2 text-[11.5px] uppercase tracking-[0.3em] text-sage-dark">
        <Sparkles className="size-3.5" /> A coastal skin day
      </p>
      <h2 className="relative mt-3 font-display text-3xl leading-tight">
        Four small habits, <em className="text-sage">from sunrise to sleep.</em>
      </h2>
      <ol className="relative mt-6 space-y-2">
        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.time}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                aria-current={on}
                className={`group flex w-full items-start gap-4 rounded-xl border p-3.5 text-left transition-all duration-500 ${
                  on ? "border-sage/40 bg-mist/60 shadow-lg shadow-sage/10" : "border-transparent hover:bg-mist/30"
                }`}
              >
                <span className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${on ? "bg-gradient-to-br from-sage to-sage-dark text-ivory scale-110" : "bg-mist text-sage-dark"}`}>
                  <s.icon className="size-5" strokeWidth={1.5} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xl leading-none">{s.time}</span>
                  <span className={`grid transition-all duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <span className="overflow-hidden pt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
      <div className="relative mt-5 flex items-center justify-between gap-4 border-t border-border pt-4">
        <p className="text-xs leading-relaxed text-muted-foreground">General guidance, not a treatment plan.</p>
        <Link to="/skin-ai" className="group inline-flex shrink-0 items-center gap-2 text-sm text-sage-dark">
          Ask Skin AI <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
