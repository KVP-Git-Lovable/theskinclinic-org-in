import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials";

const INTERVAL_MS = 8000;

/** Auto-advancing patient testimonials with arrows, dots and pause-on-hover. */
export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;
  const go = (n: number) => setIndex((n + count) % count);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [index, paused, count]);

  const t = TESTIMONIALS[index];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Patient testimonials"
    >
      <Quote className="size-12 text-sage mb-8" strokeWidth={1} fill="currentColor" aria-hidden />

      <figure key={index} className="animate-fade-up min-h-[17rem] md:min-h-[13rem]" aria-live={paused ? "polite" : "off"}>
        <blockquote className="font-display italic text-2xl md:text-[2rem] leading-[1.35] max-w-5xl">
          {t.text}
        </blockquote>
        <figcaption className="mt-8 flex items-center gap-4">
          <span className="h-px w-10 bg-sage" />
          <span className="text-[11px] uppercase tracking-[0.3em]">{t.name}</span>
          <span className="text-[10px] uppercase tracking-[0.25em] opacity-50">Patient review</span>
        </figcaption>
      </figure>

      <div className="mt-12 flex items-center justify-between gap-6 flex-wrap">
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose testimonial">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className="group h-6 px-0.5 flex items-center"
            >
              <span
                className={`block h-[3px] rounded-full transition-all duration-500 ${
                  i === index ? "w-10 bg-sage" : "w-4 bg-current opacity-25 group-hover:opacity-60"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="size-12 border border-current/30 flex items-center justify-center hover:bg-ivory hover:text-navy transition-colors"
          >
            <ChevronLeft className="size-5" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="size-12 border border-current/30 flex items-center justify-center hover:bg-ivory hover:text-navy transition-colors"
          >
            <ChevronRight className="size-5" strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </div>
  );
}
