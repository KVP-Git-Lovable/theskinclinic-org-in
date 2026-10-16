import { useEffect, useState } from "react";

export interface HeroSlide {
  src: string;
  alt: string;
  eyebrow: string;
  caption: string;
  /** Lower-resolution photos: shown sharp at a modest size over a blurred copy of themselves. */
  framed?: boolean;
}

const INTERVAL_MS = 6000;

/** Auto-advancing crossfade slideshow with a slow zoom and a progress indicator. */
export function HeroSlideshow({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [index, paused, slides.length]);

  return (
    <div
      className="relative size-full overflow-hidden bg-mist"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {slides.map((s, i) => {
        const active = i === index;
        const fade = `transition-opacity duration-[1600ms] ease-in-out ${active ? "opacity-100" : "opacity-0"}`;
        if (s.framed) {
          return (
            <div key={s.src} aria-hidden={!active} className={`absolute inset-0 ${fade}`}>
              <img src={s.src} alt="" loading="lazy" className="absolute inset-0 size-full object-cover scale-125 blur-2xl opacity-80" />
              <div className="absolute inset-0 bg-navy/25" />
              <div className="absolute inset-0 flex items-center justify-center pb-24 px-10">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className={`max-h-[62%] w-auto max-w-[min(100%,34rem)] object-contain border-[10px] border-ivory shadow-2xl ${active ? "hero-float" : ""}`}
                />
              </div>
            </div>
          );
        }
        return (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            fetchPriority={i === 0 ? "high" : "auto"}
            loading={i === 0 ? "eager" : "lazy"}
            aria-hidden={!active}
            className={`absolute inset-0 size-full object-cover ${fade} ${active ? "hero-kenburns" : ""}`}
          />
        );
      })}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />

      {/* Caption that re-animates on each slide */}
      <div key={index} className="absolute bottom-24 left-10 right-10 text-ivory animate-fade-up">
        <p className="text-[10px] uppercase tracking-[0.35em] opacity-80 mb-3">{slides[index].eyebrow}</p>
        <p className="font-display text-3xl lg:text-4xl leading-tight max-w-md">{slides[index].caption}</p>
      </div>

      {/* Progress indicators */}
      <div className="absolute bottom-8 left-10 right-10 flex gap-3">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            className="group relative h-6 flex-1 flex items-center"
          >
            <span className="relative block h-px w-full bg-ivory/35 group-hover:bg-ivory/60 transition-colors overflow-hidden">
              <span
                key={`${index}-${paused}`}
                className={`absolute inset-y-0 left-0 bg-ivory ${i === index && !paused ? "hero-progress" : ""}`}
                style={{ width: i < index || (i === index && paused) ? "100%" : i === index ? undefined : "0%" }}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
