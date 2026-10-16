import { useEffect, useState } from "react";

export interface HeroSlide {
  src: string;
  alt: string;
  eyebrow: string;
  caption: string;
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
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          fetchPriority={i === 0 ? "high" : "auto"}
          loading={i === 0 ? "eager" : "lazy"}
          aria-hidden={i !== index}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          } ${i === index ? "hero-kenburns" : ""}`}
        />
      ))}

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
