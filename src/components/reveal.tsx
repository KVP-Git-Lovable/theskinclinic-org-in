import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades and lifts its children into view as they scroll on screen.
 * Content is visible by default (server render, slow hydration, no JS); it only
 * hides after mounting, and only when it starts below the visible area.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on (or above) the screen: leave it visible, no animation.
    if (el.getBoundingClientRect().top < window.innerHeight * 1.05) return;

    setHidden(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHidden(false);
          io.disconnect();
        }
      },
      // Start the reveal well before the element reaches the screen.
      { rootMargin: "0px 0px 35% 0px", threshold: 0 },
    );
    io.observe(el);
    // Safety net: never leave content hidden.
    const fallback = window.setTimeout(() => setHidden(false), 4000);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${hidden ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"} ${className}`}
      style={{ transitionDelay: hidden ? "0ms" : `${delay}ms` }}
    >
      {children}
    </div>
  );
}
