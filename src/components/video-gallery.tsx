import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { VIDEOS, YOUTUBE_CHANNEL } from "@/lib/videos";

/** Click-to-play grid: the YouTube player only loads once a video is chosen. */
export function VideoGallery({ dark = false }: { dark?: boolean }) {
  const [active, setActive] = useState(VIDEOS[0].id);
  const current = VIDEOS.find((v) => v.id === active) ?? VIDEOS[0];
  const [playing, setPlaying] = useState(false);

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <Reveal className="lg:col-span-8">
        <div className="relative aspect-video bg-black overflow-hidden group">
          {playing ? (
            <iframe
              key={current.id}
              className="absolute inset-0 size-full"
              src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0`}
              title={current.title}
              allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${current.title}`}
              className="absolute inset-0 size-full"
            >
              <img
                src={`https://i.ytimg.com/vi/${current.id}/hqdefault.jpg`}
                alt=""
                className="size-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex size-20 items-center justify-center rounded-full bg-ivory text-navy shadow-xl group-hover:scale-110 transition-transform duration-500">
                  <span className="absolute inset-0 rounded-full bg-ivory/50 animate-ping motion-reduce:hidden" />
                  <Play className="relative size-7 translate-x-0.5" fill="currentColor" />
                </span>
              </span>
              <span className="absolute bottom-0 left-0 p-6 text-left text-ivory">
                <span className="block text-[10px] uppercase tracking-[0.3em] opacity-80 mb-2">{current.tag}</span>
                <span className="block font-display text-2xl md:text-3xl leading-tight max-w-xl">{current.title}</span>
              </span>
            </button>
          )}
        </div>
      </Reveal>

      <div className="lg:col-span-4 flex flex-col gap-3">
        {VIDEOS.map((v, i) => (
          <Reveal key={v.id} delay={i * 80}>
            <button
              type="button"
              onClick={() => {
                setActive(v.id);
                setPlaying(true);
              }}
              className={`w-full flex gap-4 items-center text-left p-2 border transition-colors ${
                v.id === active
                  ? dark
                    ? "border-sage bg-ivory/10"
                    : "border-sage bg-mist/60"
                  : dark
                    ? "border-ivory/10 hover:border-ivory/40"
                    : "border-navy/10 hover:border-navy/40"
              }`}
            >
              <span className="relative w-28 shrink-0 aspect-video overflow-hidden bg-black">
                <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt="" className="size-full object-cover" loading="lazy" />
                <Play className="absolute inset-0 m-auto size-5 text-ivory drop-shadow" fill="currentColor" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-[0.2em] opacity-60">{v.tag}</span>
                <span className="block text-sm leading-snug line-clamp-2 mt-1">{v.title}</span>
              </span>
            </button>
          </Reveal>
        ))}
        <a
          href={YOUTUBE_CHANNEL}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] hover:text-sage transition-colors"
        >
          More on our YouTube channel <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </div>
  );
}
