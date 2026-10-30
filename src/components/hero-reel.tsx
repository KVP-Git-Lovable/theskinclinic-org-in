import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, Volume2, VolumeX, Youtube } from "lucide-react";
import { YOUTUBE_CHANNEL } from "@/lib/videos";

export interface ReelClip {
  id: string;
  name: string;
  topic: string;
  /** Where to begin (seconds). */
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

const CLIP_MS = 9000;
const MIN_COVER_MS = 2500; // the first clip keeps its still frame this long, so the player's own title bar and buttons have gone
const SWITCH_TIMEOUT_MS = 5000; // never leave a still frame up longer than this when the player is slow

const embed = (clip: ReelClip) =>
  `https://www.youtube-nocookie.com/embed/${clip.id}?autoplay=1&mute=1&controls=0&start=${clip.start}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&fs=0&disablekb=1&enablejsapi=1`;

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

/**
 * A reel of short treatment clips with a clickable list. One YouTube player is created once and told which clip to load:
 * browsers refuse sound in a freshly created player, but a player the visitor has already unmuted keeps its sound.
 * It starts muted and changes clips by itself; with sound on it stays on a clip until it ends or another is picked.
 */
export function HeroReel() {
  const [mounted, setMounted] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [index, setIndex] = useState(0);
  const [covered, setCovered] = useState(true);
  const [muted, setMuted] = useState(true);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const indexRef = useRef(0);
  const mutedRef = useRef(true);
  const expectRef = useRef(REEL_CLIPS[0].id); // the clip we are waiting to see playing
  const videoRef = useRef(""); // the clip the player says it is on
  const coverUntilRef = useRef(0);
  const toggledAtRef = useRef(0);
  const switchedAtRef = useRef(0);
  const timers = useRef<number[]>([]);

  const after = (ms: number, fn: () => void) => { timers.current.push(window.setTimeout(fn, ms)); };
  const send = (func: string, args: unknown[] = []) =>
    frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "*");

  useEffect(() => {
    setMounted(true);
    setAutoplay(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => timers.current.forEach(window.clearTimeout);
  }, []);

  const reveal = () => after(Math.max(0, coverUntilRef.current - Date.now()), () => setCovered(false));

  // Show the clip's still frame, tell the player to load it, and lift the still once it is playing.
  const goTo = (i: number) => {
    const clip = REEL_CLIPS[i];
    indexRef.current = i;
    expectRef.current = clip.id;
    switchedAtRef.current = Date.now();
    coverUntilRef.current = 0;
    setIndex(i);
    setCovered(true);
    send("loadVideoById", [clip.id, clip.start]);
    after(SWITCH_TIMEOUT_MS, () => { if (expectRef.current === clip.id) setCovered(false); });
  };

  // First clip: keep its still frame for a few seconds, then lift it (earlier only if the player is already playing).
  useEffect(() => {
    if (!mounted || !autoplay) return;
    coverUntilRef.current = Date.now() + MIN_COVER_MS;
    after(SWITCH_TIMEOUT_MS + MIN_COVER_MS, () => { if (expectRef.current === REEL_CLIPS[0].id) setCovered(false); });
  }, [mounted, autoplay]);

  // Listen to the player: when a clip is playing, when it ends, and whether sound really switched on.
  useEffect(() => {
    if (!mounted || !autoplay) return;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frameRef.current?.contentWindow || typeof e.data !== "string") return;
      let data: { event?: string; info?: { playerState?: number; muted?: boolean; videoData?: { video_id?: string } } };
      try { data = JSON.parse(e.data); } catch { return; }
      if (data.event !== "infoDelivery" && data.event !== "initialDelivery") return;
      const info = data.info ?? {};
      if (info.videoData?.video_id) videoRef.current = info.videoData.video_id;
      const recentlyToggled = Date.now() - toggledAtRef.current < 3000;
      const recentlySwitched = Date.now() - switchedAtRef.current < 4000;
      if (typeof info.muted === "boolean" && !recentlyToggled && info.muted !== mutedRef.current) {
        mutedRef.current = info.muted;
        setMuted(info.muted);
      }
      if (info.playerState === 1 && videoRef.current === expectRef.current) reveal();
      // The browser refused sound and paused the video: go back to muted playback.
      if (info.playerState === 2 && !mutedRef.current && (recentlyToggled || recentlySwitched)) {
        mutedRef.current = true;
        setMuted(true);
        send("mute");
        send("playVideo");
      }
      if (info.playerState === 0) goTo((indexRef.current + 1) % REEL_CLIPS.length);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [mounted, autoplay]);

  // Muted: change clip every few seconds. With sound on we stay put until the clip ends or one is picked.
  useEffect(() => {
    if (!mounted || !autoplay || !muted) return;
    const t = window.setTimeout(() => goTo((index + 1) % REEL_CLIPS.length), CLIP_MS);
    return () => window.clearTimeout(t);
  }, [index, muted, mounted, autoplay]);

  const toggleSound = () => {
    mutedRef.current = !mutedRef.current;
    toggledAtRef.current = Date.now();
    setMuted(mutedRef.current);
    if (mutedRef.current) send("mute");
    else { send("unMute"); send("setVolume", [100]); send("playVideo"); }
  };

  const pick = (i: number) => {
    if (i === index) return;
    goTo(i);
  };

  const active = REEL_CLIPS[index];

  return (
    <div className="flex items-stretch gap-4 2xl:gap-5">
      {/* Portrait player */}
      <div className="relative w-[16rem] 2xl:w-[19rem] shrink-0 border-[10px] border-ivory bg-ivory shadow-2xl">
        <div className="relative aspect-[9/16] overflow-hidden bg-navy">
          {mounted && autoplay ? (
            <iframe
              ref={frameRef}
              onLoad={() => frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*")}
              title={`${active.name} (Skin Talks)`}
              src={embed(REEL_CLIPS[0])}
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex={-1}
              style={active.landscape ? CROP_LANDSCAPE : CROP_PORTRAIT}
              className="pointer-events-none absolute border-0"
            />
          ) : (
            <Poster key={active.id} clip={active} />
          )}
          {/* The clip's still frame covers the player while a clip loads, so there is never a blank or spinning panel. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 transition-opacity ${covered && autoplay ? "opacity-100 duration-200" : "opacity-0 duration-700"}`}
          >
            <Poster key={active.id} clip={active} />
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
                {i === index && mounted && autoplay && muted && (
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
