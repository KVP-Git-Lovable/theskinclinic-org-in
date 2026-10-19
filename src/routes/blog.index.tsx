import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { BLOG_POSTS, formatPostDate, type BlogPost } from "@/lib/blog";

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

/** Cover photo for a post, or its gradient and icon when it has no photo. */
function PostCover({ post, className = "", eager = false }: { post: BlogPost; className?: string; eager?: boolean }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${post.cover} ${className}`}>
      {post.image ? (
        <img
          src={post.image}
          alt=""
          loading={eager ? "eager" : "lazy"}
          style={{ objectPosition: post.imagePosition }}
          className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center">
          <post.icon className="size-24 text-sage-dark/30 group-hover:scale-125 transition-transform duration-1000" strokeWidth={0.6} />
        </span>
      )}
    </div>
  );
}

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

      {/* Posts: one large featured story beside two compact ones, then a grid for any more */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="grid lg:grid-cols-12 gap-8">
          <Reveal className="lg:col-span-7">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group flex h-full flex-col border border-navy/10 bg-ivory hover:border-navy/30 transition-colors overflow-hidden"
            >
              <PostCover post={featured} className="aspect-[16/10]" eager />
              <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-sage-dark mb-4">Featured · {featured.category}</p>
                <h2 className="font-display text-3xl md:text-4xl leading-[1.1] group-hover:text-sage-dark transition-colors">{featured.title}</h2>
                <p className="mt-4 opacity-70 leading-relaxed">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]">
                  Read article <ArrowRight className="size-3 group-hover:translate-x-2 transition-transform" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="lg:col-span-5 flex flex-col gap-8">
            {rest.slice(0, 2).map((p, i) => (
              <Reveal key={p.slug} delay={(i + 1) * 120} className="flex-1">
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group grid h-full grid-cols-5 border border-navy/10 bg-ivory hover:border-navy/30 transition-colors overflow-hidden"
                >
                  <PostCover post={p} className="col-span-2 min-h-[11rem]" />
                  <div className="col-span-3 flex flex-col justify-center p-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-sage-dark mb-2">{p.category}</p>
                    <h3 className="font-display text-xl leading-tight group-hover:text-sage-dark transition-colors">{p.title}</h3>
                    <p className="mt-3 flex items-center gap-2 text-xs opacity-50">
                      <Clock className="size-3" /> {p.readingMinutes} min read
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {rest.length > 2 && (
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.slice(2).map((p, i) => (
              <Reveal key={p.slug} delay={i * 120}>
                <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block h-full">
                  <PostCover post={p} className="aspect-[16/10] mb-6" />
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
        )}
      </section>

      <SiteFooter />
    </div>
  );
}
