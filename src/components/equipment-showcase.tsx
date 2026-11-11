import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EQUIPMENT } from "@/lib/equipment";

const SPEED = 28; // pixels per second: a slow, steady drift
const HOLD_MS = 6000; // after a touch or an arrow press, leave the row alone this long

/**
 * A looping row of tall photo cards that drifts along slowly by itself (compact on the page; the device's use is revealed on hover and
 * always shown on touch screens). The list is drawn twice so the end joins the start without a jump. It stops while hovered, focused,
 * touched or off screen, and does not move by itself for visitors who prefer reduced motion.
 */
export function EquipmentShowcase() {
  const rail = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const touchingRef = useRef(false);
  const holdUntilRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.2 });
    observer.observe(el);

    // One full set of cards is the distance from the first card to its copy.
    const period = () => (el.children[EQUIPMENT.length] as HTMLElement).offsetLeft - (el.children[0] as HTMLElement).offsetLeft;
    let pos = 0;
    let last = performance.now();
    let shown = -1;
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const p = period();
      const holding = pausedRef.current || touchingRef.current || Date.now() < holdUntilRef.current;
      if (holding || !visible || reduced) pos = el.scrollLeft; // follow the visitor's own scrolling
      else pos += SPEED * dt;
      // Keep the view inside the two copies: jump by exactly one set, which looks identical.
      if (!touchingRef.current && p > el.clientWidth) {
        if (pos > 2 * p - el.clientWidth - 2) pos -= p;
        else if (pos < 2) pos += p;
      }
      if (Math.abs(el.scrollLeft - pos) > 0.01) el.scrollLeft = pos;
      if (p > 0) {
        const pct = Math.floor((((el.scrollLeft % p) + p) % p) / p * 100);
        if (pct !== shown) { shown = pct; setProgress(pct / 100); }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);

  const hold = () => { holdUntilRef.current = Date.now() + HOLD_MS; };
  const scrollCards = (direction: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    hold();
    const card = el.querySelector("li");
    el.scrollBy({ left: direction * ((card?.clientWidth ?? 240) + 16) * 2, behavior: "smooth" });
  };

  const arrow = "flex size-11 items-center justify-center rounded-full border border-navy/20 transition-all duration-300 hover:bg-navy hover:text-ivory";
  const fade = "linear-gradient(to right, transparent, black 5%, black 94%, transparent)";

  return (
    <div>
      <ul
        ref={rail}
        tabIndex={0}
        aria-label="Equipment at The Skin Clinic"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        onFocus={() => { pausedRef.current = true; }}
        onBlur={() => { pausedRef.current = false; }}
        onTouchStart={() => { touchingRef.current = true; }}
        onTouchEnd={() => { touchingRef.current = false; hold(); }}
        className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
        style={{ maskImage: fade, WebkitMaskImage: fade }}
      >
        {[...EQUIPMENT, ...EQUIPMENT].map((e, i) => {
          const copy = i >= EQUIPMENT.length;
          return (
            <li
              key={`${e.name}-${copy ? "b" : "a"}`}
              aria-hidden={copy || undefined}
              className="group relative aspect-[3/4] w-[12.5rem] shrink-0 overflow-hidden bg-navy sm:w-[14.5rem] lg:w-[15.5rem]"
            >
              <img
                src={e.image}
                alt={copy ? "" : e.name}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: e.position ?? "50% 45%" }}
                className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent transition-opacity duration-500 group-hover:from-navy/95" />
              <span aria-hidden className="absolute left-4 top-4 font-display text-sm tracking-[0.25em] text-ivory/85">{String((i % EQUIPMENT.length) + 1).padStart(2, "0")}</span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                <h3 className="font-display text-2xl leading-tight">{e.name}</h3>
                <span aria-hidden className="mt-3 block h-px w-8 bg-sage transition-all duration-500 group-hover:w-20" />
                {e.usedFor && (
                  <p className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                    <span className="overflow-hidden pt-2 text-xs leading-relaxed text-ivory/80">{e.usedFor}</span>
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 flex items-center gap-6">
        <div aria-hidden className="relative h-px flex-1 bg-navy/15">
          <span className="absolute inset-y-0 left-0 h-0.5 -translate-y-1/4 bg-sage" style={{ width: `${Math.max(4, progress * 100)}%` }} />
        </div>
        <p className="text-xs tabular-nums tracking-[0.2em] opacity-60">{EQUIPMENT.length} DEVICES</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollCards(-1)} aria-label="Previous equipment" className={arrow}><ChevronLeft className="size-5" /></button>
          <button type="button" onClick={() => scrollCards(1)} aria-label="Next equipment" className={arrow}><ChevronRight className="size-5" /></button>
        </div>
      </div>
    </div>
  );
}
