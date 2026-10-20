import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { YOUTUBE_CHANNEL } from "@/lib/videos";

export interface ReelClip {
  id: string;
  name: string;
  topic: string;
}

// Short clips from the clinic's own Skin Talks YouTube channel.
export const REEL_CLIPS: ReelClip[] = [
  { id: "DSW1a4s9nQE", name: "Pico Toning", topic: "Pigmentation & even tone" },
  { id: "-YmJRNUVfic", name: "Botox", topic: "Fine lines" },
  { id: "ZxNetrk4RYo", name: "Skin Boosters", topic: "Hydration & glow" },
  { id: "Ntxdc_mWBMc", name: "Scar Refining", topic: "Smoother skin" },
  { id: "tv2oHFnsvQM", name: "IPL Treatment", topic: "Sun damage & pigmentation" },
  { id: "nHmOZmG2QkA", name: "CO₂ Laser", topic: "Resurfacing & acne scars" },
  { id: "0jXgdrOkX8U", name: "Chemical Peel", topic: "Brighter complexion" },
  { id: "WSSkgXrQUtQ", name: "PRP Treatment", topic: "Skin & hair rejuvenation" },
];

const CLIP_MS = 9000;
const SWAP_LEAD_MS = 2200; // standby clip loads this long before it fades in

const embed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`;

/** A muted reel of short treatment clips that plays and changes by itself, with a clickable list. */
export function HeroReel() {
  const [mounted, setMounted] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [index, setIndex] = useState(0);
  const [slots, setSlots] = useState<[string, string]>([REEL_CLIPS[0].id, ""]);
  const [front, setFront] = useState<0 | 1>(0);
  const frontRef = useRef<0 | 1>(0);
  const slotsRef = useRef<[string, string]>(slots);

  useEffect(() => {
    setMounted(true);
    setAutoplay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Advance on a timer; the timer restarts whenever a clip is picked by hand.
  useEffect(() => {
    if (!mounted || !autoplay) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % REEL_CLIPS.length), CLIP_MS);
    return () => clearTimeout(t);
  }, [index, mounted, autoplay]);

  // Load the next clip in the hidden player, then fade it in.
  useEffect(() => {
    const wanted = REEL_CLIPS[index].id;
    if (slotsRef.current[frontRef.current] === wanted) return;
    const standby = frontRef.current === 0 ? 1 : 0;
    const next: [string, string] = [...slotsRef.current] as [string, string];
    next[standby] = wanted;
    slotsRef.current = next;
    setSlots(next);
    const t = setTimeout(() => {
      frontRef.current = standby;
      setFront(standby);
    }, SWAP_LEAD_MS);
    return () => clearTimeout(t);
  }, [index]);

  const active = REEL_CLIPS[index];

  return (
    <div className="flex items-stretch gap-4 2xl:gap-5">
      {/* Portrait player */}
      <div className="relative w-[16rem] 2xl:w-[19rem] shrink-0 border-[10px] border-ivory bg-ivory shadow-2xl">
        <div className="relative aspect-[9/16] overflow-hidden bg-navy">
          {mounted && autoplay
            ? slots.map((id, i) =>
                id ? (
                  <iframe
                    key={i}
                    title={`${active.name} (Skin Talks)`}
                    src={embed(id)}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    tabIndex={-1}
                    className={`pointer-events-none absolute inset-0 size-full border-0 transition-opacity duration-700 ${front === i ? "opacity-100" : "opacity-0"}`}
                  />
                ) : null,
              )
            : (
              <img src={`https://i.ytimg.com/vi/${active.id}/hqdefault.jpg`} alt="" className="absolute inset-0 size-full object-cover" />
            )}
          {mounted && !autoplay && (
            <span className="absolute inset-0 flex items-center justify-center bg-navy/30">
              <span className="flex size-14 items-center justify-center rounded-full bg-ivory text-navy shadow-xl">
                <Play className="size-5 translate-x-0.5" fill="currentColor" />
              </span>
            </span>
          )}
          <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-ivory">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-75">Skin Talks</p>
            <p className="mt-1 font-display text-xl leading-tight">{active.name}</p>
          </div>
        </div>
      </div>

      {/* Clip list */}
      <div className="flex w-[13rem] 2xl:w-[15rem] flex-col justify-between py-1">
        <ul className="flex flex-col gap-1.5">
          {REEL_CLIPS.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index}
                className={`group relative block w-full overflow-hidden border px-3 py-2 text-left transition-colors ${
                  i === index ? "border-navy bg-navy text-ivory" : "border-navy/15 hover:border-navy/50"
                }`}
              >
                <span className="block text-sm leading-tight">{c.name}</span>
                <span className={`block text-[11px] leading-tight ${i === index ? "opacity-70" : "opacity-50"}`}>{c.topic}</span>
                {i === index && mounted && autoplay && (
                  <span
                    key={index}
                    aria-hidden
                    className="hero-progress absolute inset-x-0 bottom-0 h-0.5 bg-sage"
                    style={{ animationDuration: `${CLIP_MS}ms` }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] hover:text-sage transition-colors"
        >
          More on YouTube <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
