import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, Volume2, VolumeX, Youtube } from "lucide-react";
import { YOUTUBE_CHANNEL } from "@/lib/videos";

export interface ReelClip {
  id: string;
  name: string;
  topic: string;
  /** Where to begin (seconds). The player loads hidden for a few seconds first, so this is set a little early. */
  start: number;
  /** Widescreen (16:9) source; shown as a centred portrait crop. */
  landscape?: boolean;
}

// Short moments from the clinic's own Skin Talks videos, mixing the doctors and focusing on treatments.
export const REEL_CLIPS: ReelClip[] = [
  { id: "3uRFY00obxg", name: "Melasma", topic: "Causes & treatment", start: 24, landscape: true },
  { id: "-YmJRNUVfic", name: "Botox", topic: "Fine lines", start: 1 },
  { id: "PP2r5LTJm9M", name: "Revlite Laser Toning", topic: "Pigmentation & tone", start: 24, landscape: true },
  { id: "ZxNetrk4RYo", name: "Skin Boosters", topic: "Hydration & glow", start: 1 },
  { id: "oETsUP9D7Ig", name: "Laser Hair Reduction", topic: "How it works", start: 24, landscape: true },
  { id: "tv2oHFnsvQM", name: "IPL Treatment", topic: "Sun damage & pigmentation", start: 1 },
  { id: "yx8o7BRV1kw", name: "Skincare Routine", topic: "Daily care tips", start: 0 },
  { id: "0jXgdrOkX8U", name: "Chemical Peel", topic: "Brighter complexion", start: 1 },
];
const CLIP_BY_ID = Object.fromEntries(REEL_CLIPS.map((c) => [c.id, c]));

const CLIP_MS = 9000;
const SWAP_LEAD_MS = 6000; // the next clip loads this long before it fades in, so the player's own buttons have gone

const embed = (clip: ReelClip) =>
  `https://www.youtube-nocookie.com/embed/${clip.id}?autoplay=1&mute=1&controls=0&start=${clip.start}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1&enablejsapi=1`;

// Sound is switched with YouTube's postMessage commands, so the iframes never reload.
const sendCommand = (frame: HTMLIFrameElement | null, func: string, args: unknown[] = []) =>
  frame?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");

/** The clip's still frame, shown while its player loads. Shorts use the 4:3 still (its bars fall outside the portrait crop); widescreen clips use the HD still. */
function Poster({ clip }: { clip: ReelClip }) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${clip.id}/${clip.landscape ? "maxresdefault" : "hqdefault"}.jpg`);
  return (
    <img
      src={src}
      alt=""
      onError={() => setSrc(`https://i.ytimg.com/vi/${clip.id}/mqdefault.jpg`)}
      className="absolute inset-0 size-full object-cover"
    />
  );
}

// The player is drawn larger than its frame so its title bar and logo fall outside the visible area.
const CROP_PORTRAIT = { width: "132%", height: "132%", left: "-16%", top: "-16%" } as const;
// A 16:9 video shown full-height in the portrait frame, keeping its centre.
// It is also drawn taller than the frame so the video's own subtitle line (near the bottom) falls outside it.
const CROP_LANDSCAPE = { width: "427%", height: "135%", left: "-163%", top: "-8%" } as const;

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
  const [muted, setMuted] = useState(true);
  const mutedRef = useRef(true);
  const playerRef = useRef<HTMLDivElement>(null);

  const applySound = (frame: HTMLIFrameElement | null) => {
    if (mutedRef.current) return;
    sendCommand(frame, "unMute");
    sendCommand(frame, "setVolume", [100]);
  };
  const toggleSound = () => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    playerRef.current?.querySelectorAll("iframe").forEach((frame) => {
      if (mutedRef.current) sendCommand(frame, "mute");
      else applySound(frame);
    });
  };

  useEffect(() => {
    setMounted(true);
    setAutoplay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Keep the first clip covered while the player loads and hides its own buttons.
  useEffect(() => {
    if (!mounted || !autoplay) return;
    const t = setTimeout(() => setCovered(false), 6500);
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
        <div ref={playerRef} className="relative aspect-[9/16] overflow-hidden bg-navy">
          {mounted && autoplay
            ? slots.map((id, i) =>
                id ? (
                  <iframe
                    key={i}
                    onLoad={(e) => {
                      // A clip loaded after sound was switched on starts muted; the player needs a moment before it takes commands.
                      const frame = e.currentTarget;
                      [800, 2000].forEach((ms) => window.setTimeout(() => applySound(frame), ms));
                    }}
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
            : <Poster key={active.id} clip={active} />}
          {/* While the first player loads (and hides its own buttons) show the clip's still frame instead of a blank panel. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${covered && autoplay ? "opacity-100" : "opacity-0"}`}
          >
            <Poster clip={REEL_CLIPS[0]} />
          </div>
          {mounted && !autoplay && (
            <span className="absolute inset-0 flex items-center justify-center bg-navy/30">
              <span className="flex size-14 items-center justify-center rounded-full bg-ivory text-navy shadow-xl">
                <Play className="size-5 translate-x-0.5" fill="currentColor" />
              </span>
            </span>
          )}
          <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 pr-16 text-ivory">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-75">Skin Talks</p>
            <p className="mt-1 font-display text-xl leading-tight">{active.name}</p>
          </div>
          {mounted && autoplay && (
            <button
              type="button"
              onClick={toggleSound}
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
              aria-pressed={!muted}
              title={muted ? "Turn sound on" : "Turn sound off"}
              className="absolute bottom-3 right-3 z-10 flex size-10 items-center justify-center rounded-full bg-ivory/90 text-navy shadow-lg transition-colors hover:bg-ivory"
            >
              {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
            </button>
          )}
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
          className="mt-3 inline-flex items-center justify-center gap-2 bg-sage-dark px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-ivory transition-colors hover:bg-navy"
        >
          <Youtube className="size-4 shrink-0" />
          More on YouTube
          <ArrowUpRight className="size-3.5 shrink-0" />
        </a>
      </div>
    </div>
  );
}
