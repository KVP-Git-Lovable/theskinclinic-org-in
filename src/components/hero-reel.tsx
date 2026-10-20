import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { YOUTUBE_CHANNEL } from "@/lib/videos";

export interface ReelClip {
  id: string;
  name: string;
  topic: string;
  /** Seconds to skip so the clip opens on the treatment, not the greeting. */
  start: number;
  /** Widescreen (16:9) source; shown as a centred portrait crop. */
  landscape?: boolean;
}

// Short moments from the clinic's own Skin Talks videos, mixing the doctors and focusing on treatments.
export const REEL_CLIPS: ReelClip[] = [
  { id: "3uRFY00obxg", name: "Melasma", topic: "Causes & treatment", start: 30, landscape: true },
  { id: "-YmJRNUVfic", name: "Botox", topic: "Fine lines", start: 7 },
  { id: "PP2r5LTJm9M", name: "Revlite Laser Toning", topic: "Pigmentation & tone", start: 30, landscape: true },
  { id: "ZxNetrk4RYo", name: "Skin Boosters", topic: "Hydration & glow", start: 7 },
  { id: "oETsUP9D7Ig", name: "Laser Hair Reduction", topic: "How it works", start: 30, landscape: true },
  { id: "tv2oHFnsvQM", name: "IPL Treatment", topic: "Sun damage & pigmentation", start: 7 },
  { id: "yx8o7BRV1kw", name: "Skincare Routine", topic: "Daily care tips", start: 4 },
  { id: "0jXgdrOkX8U", name: "Chemical Peel", topic: "Brighter complexion", start: 7 },
];
const CLIP_BY_ID = Object.fromEntries(REEL_CLIPS.map((c) => [c.id, c]));

const CLIP_MS = 9000;
const SWAP_LEAD_MS = 4000; // the next clip loads this long before it fades in, so the player's own buttons have gone

const embed = (clip: ReelClip) =>
  `https://www.youtube-nocookie.com/embed/${clip.id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${clip.id}&start=${clip.start}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1`;

// The player is drawn larger than its frame so its title bar and logo fall outside the visible area.
const CROP_PORTRAIT = { width: "132%", height: "132%", left: "-16%", top: "-16%" } as const;
// A 16:9 video shown full-height in the portrait frame, keeping its centre.
const CROP_LANDSCAPE = { width: "354%", height: "112%", left: "-127%", top: "-6%" } as const;

/** A muted reel of short treatment clips that plays and changes by itself, with a clickable list. */
export function HeroReel() {
  const [mounted, setMounted] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [index, setIndex] = useState(0);
  const [covered, setCovered] = useState(true);
  const [slots, setSlots] = useState<[string, string]>([REEL_CLIPS[0].id, ""]);
  const [front, setFront] = useState<0 | 1>(0);
  const frontRef = useRef<0 | 1>(0);
  const slotsRef = useRef<[string, string]>(slots);

  useEffect(() => {
    setMounted(true);
    setAutoplay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Keep the first clip covered while the player loads and hides its own buttons.
  useEffect(() => {
    if (!mounted || !autoplay) return;
    const t = setTimeout(() => setCovered(false), 4200);
    return () => clearTimeout(t);
  }, [mounted, autoplay]);

  // Put a clip into the hidden player so it is loaded (and its own buttons gone) before it is shown.
  const loadStandby = (clipIndex: number) => {
    const wanted = REEL_CLIPS[clipIndex].id;
    if (slotsRef.current[0] === wanted || slotsRef.current[1] === wanted) return;
    const standby = frontRef.current === 0 ? 1 : 0;
    const next: [string, string] = [...slotsRef.current] as [string, string];
    next[standby] = wanted;
    slotsRef.current = next;
    setSlots(next);
  };
  const flipTo = (clipIndex: number) => {
    const which = slotsRef.current[0] === REEL_CLIPS[clipIndex].id ? 0 : 1;
    frontRef.current = which;
    setFront(which);
  };

  // Every few seconds: load the next clip early, then fade to it and move the highlight with it.
  useEffect(() => {
    if (!mounted || !autoplay) return;
    const nextIndex = (index + 1) % REEL_CLIPS.length;
    const preload = setTimeout(() => loadStandby(nextIndex), Math.max(0, CLIP_MS - SWAP_LEAD_MS));
    const swap = setTimeout(() => {
      flipTo(nextIndex);
      setIndex(nextIndex);
    }, CLIP_MS);
    return () => {
      clearTimeout(preload);
      clearTimeout(swap);
    };
  }, [index, mounted, autoplay]);

  const pick = (i: number) => {
    if (i === index) return;
    loadStandby(i);
    setIndex(i);
    window.setTimeout(() => flipTo(i), SWAP_LEAD_MS);
  };

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
                    src={embed(CLIP_BY_ID[id])}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    tabIndex={-1}
                    style={CLIP_BY_ID[id].landscape ? CROP_LANDSCAPE : CROP_PORTRAIT}
                    className={`pointer-events-none absolute border-0 transition-opacity duration-700 ${front === i ? "opacity-100" : "opacity-0"}`}
                  />
                ) : null,
              )
            : (
              <img src={`https://i.ytimg.com/vi/${active.id}/hqdefault.jpg`} alt="" className="absolute inset-0 size-full object-cover" />
            )}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-navy to-navy/90 transition-opacity duration-1000 ${covered && autoplay ? "opacity-100" : "opacity-0"}`}
          />
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
                onClick={() => pick(i)}
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
          Watch more treatment videos <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
