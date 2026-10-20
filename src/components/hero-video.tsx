import { useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

/**
 * A short, muted, looping clip from the clinic's own YouTube channel that starts by itself.
 * Visitors who prefer reduced motion see the poster first and press play.
 */
export function HeroVideo({ videoId, label }: { videoId: string; label: string }) {
  const [mounted, setMounted] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(true);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAutoplay(!reduce);
    setStarted(!reduce);
  }, []);

  const send = (func: "mute" | "unMute") =>
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args: [] }), "*");

  const toggleSound = () => {
    send(muted ? "unMute" : "mute");
    setMuted(!muted);
  };

  const src =
    `https://www.youtube-nocookie.com/embed/${videoId}` +
    `?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1`;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-navy">
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        onError={(e) => {
          e.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        }}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      {mounted && started && (
        <iframe
          ref={frame}
          title={label}
          src={src}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 border-0"
          tabIndex={-1}
        />
      )}
      {mounted && !autoplay && !started && (
        <button
          type="button"
          onClick={() => setStarted(true)}
          aria-label={`Play video: ${label}`}
          className="absolute inset-0 flex items-center justify-center bg-navy/30"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-ivory text-navy shadow-xl">
            <Play className="size-6 translate-x-0.5" fill="currentColor" />
          </span>
        </button>
      )}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-ivory">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] opacity-80">Skin Talks</p>
          <p className="mt-1 font-display text-xl leading-tight">{label}</p>
        </div>
        {started && (
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className="flex size-10 shrink-0 items-center justify-center border border-ivory/60 bg-navy/40 backdrop-blur-sm transition-colors hover:bg-ivory hover:text-navy"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
