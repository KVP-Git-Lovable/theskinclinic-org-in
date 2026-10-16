import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Skin Journal — Articles | The Skin Clinic Mangaluru" },
      { name: "description", content: "Skin care advice and treatment explainers from the dermatologists at The Skin Clinic, Mangaluru." },
      { property: "og:title", content: "Skin Journal | The Skin Clinic Mangaluru" },
      { property: "og:description", content: "Skin care advice and treatment explainers from our dermatologists." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <div className="min-h-screen bg-ivory text-navy overflow-x-hidden">
      <SiteHeader />

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div aria-hidden className="pointer-events-none absolute -top-10 right-0 size-[28rem] rounded-full bg-sage/20 blur-3xl animate-pulse motion-reduce:animate-none" />
        <p className="relative text-[11px] uppercase tracking-[0.4em] opacity-50 mb-8 animate-fade-up">The journal</p>
        <h1 className="relative font-display text-6xl md:text-8xl leading-[0.95] max-w-4xl animate-fade-up">
          Skin, <em className="text-sage">understood.</em>
        </h1>
        <div className="relative h-px w-24 bg-sage mt-10 origin-left animate-line-draw" style={{ animationDelay: "0.5s" }} />
        <p className="relative mt-8 max-w-xl text-lg leading-relaxed opacity-75 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Practical skin care advice and honest treatment guides from our dermatologists, written for how skin really behaves on the coast.
        </p>
      </section>

      {/* Featured post */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <Reveal>
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="group grid md:grid-cols-12 border border-navy/10 hover:border-navy/30 transition-colors overflow-hidden"
          >
            <div className={`md:col-span-6 relative min-h-[18rem] bg-gradient-to-br ${featured.cover} flex items-center justify-center overflow-hidden`}>
              <featured.icon className="size-40 text-sage-dark/30 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-1000" strokeWidth={0.6} />
            </div>
            <div className="md:col-span-6 p-10 md:p-14 flex flex-col justify-center bg-ivory">
              <p className="text-[10px] uppercase tracking-[0.3em] text-sage-dark mb-5">Featured · {featured.category}</p>
              <h2 className="font-display text-3xl md:text-4xl leading-[1.1] group-hover:text-sage-dark transition-colors">{featured.title}</h2>
              <p className="mt-5 opacity-70 leading-relaxed">{featured.excerpt}</p>
              <span className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]">
                Read article <ArrowRight className="size-3 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Post grid */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 120}>
              <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block h-full">
                <div className={`aspect-[16/10] bg-gradient-to-br ${p.cover} flex items-center justify-center overflow-hidden mb-6`}>
                  <p.icon className="size-24 text-sage-dark/30 group-hover:scale-125 group-hover:-rotate-6 transition-transform duration-1000" strokeWidth={0.6} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-sage-dark mb-3">{p.category}</p>
                <h3 className="font-display text-2xl leading-tight group-hover:text-sage-dark transition-colors">{p.title}</h3>
                <p className="mt-3 text-sm opacity-65 leading-relaxed line-clamp-3">{p.excerpt}</p>
                <p className="mt-4 flex items-center gap-2 text-xs opacity-50">
                  {formatPostDate(p.date)} · <Clock className="size-3" /> {p.readingMinutes} min read
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
