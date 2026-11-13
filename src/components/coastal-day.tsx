import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Check, Flame, Moon, RotateCcw, Sparkles, Sun, Sunrise, Sunset } from "lucide-react";

const STEPS = [
  { time: "Morning", icon: Sunrise, text: "Cleanse gently, moisturise, and apply a broad-spectrum sunscreen." },
  { time: "Midday", icon: Sun, text: "Hot and humid? Reapply sunscreen about every two hours when you're outdoors." },
  { time: "Evening", icon: Sunset, text: "Wash off sweat, sunscreen and the day's pollution with a gentle cleanser." },
  { time: "Night", icon: Moon, text: "Moisturise, and use only the treatments your dermatologist has advised." },
];
const POINTS = 25;
const STORAGE_KEY = "coastal-skin-day";
const CONFETTI_COLOURS = ["var(--sage)", "var(--sage-dark)", "#e9c46a", "#f4a261", "#ffffff"];

interface Saved { day: string; done: boolean[]; streak: number; lastWin: string }

const dayString = (offset = 0) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-CA"); // yyyy-mm-dd in the visitor's own time zone
};

function useCountUp(target: number) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setValue(target); from.current = target; return; }
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / 500);
      setValue(Math.round(a + (target - a) * p));
      if (p < 1) raf = requestAnimationFrame(step);
      else from.current = target;
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

/** A ring of small particles that flies out from the ticked step. */
function Burst() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        return (
          <span
            key={i}
            className="ai-burst absolute size-1.5 rounded-full"
            style={{ "--dx": `${Math.cos(angle) * 38}px`, "--dy": `${Math.sin(angle) * 38}px`, background: i % 2 ? "#e9c46a" : "var(--sage)" } as CSSProperties}
          />
        );
      })}
    </span>
  );
}

/**
 * A small game for the Blog hero: tick off each part of a coastal skin day to earn points, fill the ring, and finish with a
 * celebration. The day's ticks and the streak of completed days are kept in this browser only (and silently skipped if it blocks storage).
 */
export function CoastalDay() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState<boolean[]>([false, false, false, false]);
  const [streak, setStreak] = useState(0);
  const [lastWin, setLastWin] = useState("");
  const [burst, setBurst] = useState<{ i: number; n: number } | null>(null);
  const [confetti, setConfetti] = useState<{ left: number; delay: number; dur: number; colour: string; w: number }[] | null>(null);
  const loaded = useRef(false);

  const count = done.filter(Boolean).length;
  const points = useCountUp(count * POINTS);
  const complete = count === STEPS.length;
  const streakShown = lastWin === dayString() || lastWin === dayString(-1) ? streak : 0;

  // Load today's ticks and the streak.
  useEffect(() => {
    try {
      const saved: Saved | null = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved) {
        setStreak(saved.streak ?? 0);
        setLastWin(saved.lastWin ?? "");
        if (saved.day === dayString() && Array.isArray(saved.done) && saved.done.length === STEPS.length) {
          setDone(saved.done);
          setTouched(true);
          const next = saved.done.indexOf(false);
          if (next >= 0) setActive(next);
        }
      }
    } catch { /* storage unavailable: the game still works for this visit */ }
    loaded.current = true;
  }, []);

  useEffect(() => {
    if (!loaded.current) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ day: dayString(), done, streak, lastWin } satisfies Saved)); } catch { /* ignore */ }
  }, [done, streak, lastWin]);

  // Until the visitor plays, the highlight steps through the day by itself to show the card is alive.
  useEffect(() => {
    if (touched || hovered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % STEPS.length), 3500);
    return () => window.clearInterval(id);
  }, [touched, hovered]);

  const toggle = (i: number) => {
    setTouched(true);
    const next = done.map((v, k) => (k === i ? !v : v));
    setDone(next);
    if (!done[i]) {
      setBurst({ i, n: Date.now() });
      window.setTimeout(() => setBurst(null), 800);
      const nextOpen = next.indexOf(false);
      if (nextOpen >= 0) window.setTimeout(() => setActive(nextOpen), 600);
      if (next.every(Boolean)) {
        if (lastWin !== dayString()) {
          setStreak(lastWin === dayString(-1) ? streak + 1 : 1);
          setLastWin(dayString());
        }
        setConfetti(Array.from({ length: 30 }, (_, k) => ({
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
          dur: 1.6 + Math.random() * 1.4,
          colour: CONFETTI_COLOURS[k % CONFETTI_COLOURS.length],
          w: 5 + Math.random() * 4,
        })));
        window.setTimeout(() => setConfetti(null), 3600);
      }
    }
  };

  const reset = () => { setDone([false, false, false, false]); setActive(0); setConfetti(null); };

  const R = 20;
  const C = 2 * Math.PI * R;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-[28rem] overflow-hidden rounded-2xl border border-sage/25 bg-background/80 p-6 shadow-2xl shadow-sage/15 backdrop-blur"
    >
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-sage/25 blur-3xl ai-float-slow" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-mist blur-3xl ai-float" />
      {confetti && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
          {confetti.map((c, k) => (
            <span key={k} className="ai-confetti absolute top-0 block rounded-[1px]" style={{ left: `${c.left}%`, width: c.w, height: c.w * 1.6, background: c.colour, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }} />
          ))}
        </div>
      )}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-[11.5px] uppercase tracking-[0.3em] text-sage-dark">
            <Sparkles className="size-3.5" /> A coastal skin day
          </p>
          <h2 className="mt-3 font-display text-[1.7rem] leading-tight">
            Tick each habit, <em className="text-sage">earn your glow.</em>
          </h2>
        </div>
        <div className="relative flex size-14 shrink-0 items-center justify-center" role="img" aria-label={`${count} of ${STEPS.length} habits done`}>
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
            <circle cx="24" cy="24" r={R} fill="none" strokeWidth="4" className="stroke-mist" />
            <circle cx="24" cy="24" r={R} fill="none" strokeWidth="4" strokeLinecap="round" className="stroke-sage transition-[stroke-dashoffset] duration-700" strokeDasharray={C} strokeDashoffset={C * (1 - count / STEPS.length)} />
          </svg>
          <span className="font-display text-lg leading-none">{count}/{STEPS.length}</span>
        </div>
      </div>

      <div className="relative mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-sage-dark"><Sparkles className="size-3" /> {points} pts</span>
        {streakShown > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-amber-800"><Flame className="size-3" /> {streakShown}-day streak</span>
        )}
        {!touched && <span className="text-muted-foreground">Tap a circle as you do it</span>}
      </div>

      {complete && (
        <div className="ai-rise relative mt-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 via-white to-amber-50 p-3.5">
          <span className="ai-pop flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-white shadow-md"><Award className="size-5" /></span>
          <p className="min-w-0 flex-1 text-sm leading-snug"><strong className="font-medium">Glow Getter!</strong> Today's skin day is complete.</p>
          <button type="button" onClick={reset} aria-label="Start the day again" className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-mist hover:text-foreground"><RotateCcw className="size-4" /></button>
        </div>
      )}

      <ol className="relative mt-4 space-y-1.5">
        {STEPS.map((s, i) => {
          const on = i === active;
          const ticked = done[i];
          return (
            <li key={s.time} className={`flex items-start gap-3 rounded-xl border p-3 transition-all duration-500 ${on ? "border-sage/40 bg-mist/60 shadow-lg shadow-sage/10" : "border-transparent hover:bg-mist/30"}`}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={ticked}
                aria-label={`${ticked ? "Undo" : "Mark"} ${s.time} habit`}
                className={`relative flex size-11 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${ticked ? "bg-gradient-to-br from-sage to-sage-dark text-ivory" : on ? "bg-gradient-to-br from-sage/80 to-sage-dark/80 text-ivory scale-105" : "bg-mist text-sage-dark hover:scale-105"}`}
              >
                {ticked ? <Check key="tick" className="ai-pop size-5" strokeWidth={2.5} /> : <s.icon className="size-5" strokeWidth={1.5} />}
                {burst?.i === i && <Burst key={burst.n} />}
              </button>
              <button type="button" onClick={() => { setTouched(true); setActive(i); }} aria-expanded={on} className="min-w-0 flex-1 text-left">
                <span className="flex items-center justify-between gap-2">
                  <span className={`font-display text-xl leading-none ${ticked ? "line-through decoration-sage/60" : ""}`}>{s.time}</span>
                  {ticked && <span className="text-xs text-sage-dark">+{POINTS}</span>}
                </span>
                <span className={`grid transition-all duration-500 ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <span className="min-h-[3.4rem] overflow-hidden pt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</span>
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
