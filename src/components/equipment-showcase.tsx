import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EQUIPMENT } from "@/lib/equipment";

/** A swipeable row of tall photo cards: compact on the page, with the device's use revealed on hover (always shown on touch screens). */
export function EquipmentShowcase() {
  const rail = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollCards = (direction: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: direction * ((card?.clientWidth ?? 240) + 16) * 2, behavior: "smooth" });
  };

  const arrow = "flex size-11 items-center justify-center rounded-full border border-navy/20 transition-all duration-300 hover:bg-navy hover:text-ivory disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <ul
        ref={rail}
        onScroll={update}
        tabIndex={0}
        aria-label="Equipment at The Skin Clinic"
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
        style={canNext ? { maskImage: "linear-gradient(to right, black 90%, transparent)" } : undefined}
      >
        {EQUIPMENT.map((e, i) => (
          <li key={e.name} className="group relative aspect-[3/4] w-[12.5rem] shrink-0 snap-start overflow-hidden bg-navy sm:w-[14.5rem] lg:w-[15.5rem]">
            <img
              src={e.image}
              alt={e.name}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: e.position ?? "50% 45%" }}
              className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent transition-opacity duration-500 group-hover:from-navy/95" />
            <span aria-hidden className="absolute left-4 top-4 font-display text-sm tracking-[0.25em] text-ivory/85">{String(i + 1).padStart(2, "0")}</span>
            <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
              <h3 className="font-display text-2xl leading-tight">{e.name}</h3>
              <span aria-hidden className="mt-3 block h-px w-8 bg-sage transition-all duration-500 group-hover:w-20" />
              {e.usedFor && (
                <p className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
                  <span className="overflow-hidden pt-2 text-xs leading-relaxed text-ivory/80">{e.usedFor}</span>
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center gap-6">
        <div aria-hidden className="relative h-px flex-1 bg-navy/15">
          <span className="absolute inset-y-0 left-0 h-0.5 -translate-y-1/4 bg-sage transition-[width] duration-300" style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
        <p className="text-xs tabular-nums tracking-[0.2em] opacity-60">{EQUIPMENT.length} DEVICES</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollCards(-1)} disabled={!canPrev} aria-label="Previous equipment" className={arrow}><ChevronLeft className="size-5" /></button>
          <button type="button" onClick={() => scrollCards(1)} disabled={!canNext} aria-label="Next equipment" className={arrow}><ChevronRight className="size-5" /></button>
        </div>
      </div>
    </div>
  );
}
