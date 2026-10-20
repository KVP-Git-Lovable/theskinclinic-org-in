import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";
import type { BlogPost } from "@/lib/blog";

/** A vertical clip card that plays silently while it is on screen and opens the full story when clicked. */
export function BlogVideoCard({ post }: { post: BlogPost }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: [0, 0.6] },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  if (!post.video) return null;

  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug }}
      className="group block transition-transform duration-500 hover:-translate-y-2"
    >
      <span className="relative block aspect-[9/16] overflow-hidden bg-ivory/10 shadow-xl ring-1 ring-ivory/10 transition-shadow duration-500 group-hover:shadow-2xl">
        <video
          ref={ref}
          src={`${post.video.src}#t=0.5`}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <span aria-hidden className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-navy/50 to-transparent" />
        <span className="absolute left-3 top-3 bg-ivory/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-navy">{post.category}</span>
        <span className="absolute right-3 top-3 flex items-center gap-1.5 bg-navy/60 px-2.5 py-1 text-[11px] text-ivory backdrop-blur-sm">
          <Play className="size-3" fill="currentColor" /> {post.video.duration}
        </span>
      </span>
      <span className="mt-4 block text-ivory">
        <span className="block font-display text-xl leading-tight md:text-2xl">{post.title}</span>
        <span className="mt-3 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] opacity-70 transition-all duration-300 group-hover:gap-3 group-hover:text-sage group-hover:opacity-100">
          Watch &amp; read <ArrowUpRight className="size-3.5" />
        </span>
      </span>
    </Link>
  );
}
