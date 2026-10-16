import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { BLOG_POSTS, formatPostDate, getPost } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { slug: post.slug };
  },
  head: ({ params }) => {
    const post = getPost(params.slug);
    const title = post ? `${post.title} | The Skin Clinic Mangaluru` : "Article | The Skin Clinic";
    return {
      meta: [
        { title },
        { name: "description", content: post?.excerpt ?? "" },
        { property: "og:title", content: title },
        { property: "og:description", content: post?.excerpt ?? "" },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-ivory text-navy">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-6 py-40 text-center">
        <h1 className="font-display text-5xl mb-6">Article not found</h1>
        <Link to="/blog" className="text-[11px] uppercase tracking-[0.25em] border-b border-navy pb-1">
          Back to the journal
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  component: BlogPostPage,
});

function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 z-[60] h-0.5 w-full bg-transparent" aria-hidden>
      <div className="h-full bg-sage transition-[width] duration-100" style={{ width: `${pct}%` }} />
    </div>
  );
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getPost(slug)!;
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-ivory text-navy overflow-x-hidden">
      <ReadingProgress />
      <SiteHeader />

      <header className={`bg-gradient-to-br ${post.cover} relative overflow-hidden`}>
        <post.icon aria-hidden className="absolute -right-10 -bottom-10 size-96 text-sage-dark/15 animate-soft-zoom" strokeWidth={0.5} />
        <div className="relative max-w-3xl mx-auto px-6 pt-20 pb-20">
          <Link to="/blog" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] opacity-70 hover:opacity-100 mb-12">
            <ArrowLeft className="size-3" /> The journal
          </Link>
          <p className="text-[10px] uppercase tracking-[0.3em] text-sage-dark mb-5 animate-fade-up">{post.category}</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] animate-fade-up">{post.title}</h1>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 text-sm opacity-70 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {post.author} · {formatPostDate(post.date)} · <Clock className="size-3.5" /> {post.readingMinutes} min read
          </p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-20">
        <p className="font-display text-2xl md:text-3xl leading-snug text-sage-dark mb-12">{post.excerpt}</p>
        <div className="space-y-6 text-lg leading-[1.8] opacity-85">
          {post.body.map((b, i) => {
            if (b.type === "h")
              return (
                <Reveal key={i}>
                  <h2 className="font-display text-3xl md:text-4xl text-navy pt-6">{b.text}</h2>
                </Reveal>
              );
            if (b.type === "ul")
              return (
                <Reveal key={i}>
                  <ul className="space-y-3 border-l-2 border-sage pl-6">
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </Reveal>
              );
            return (
              <Reveal key={i}>
                <p>{b.text}</p>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-20 bg-navy text-ivory p-10 md:p-14 text-center">
            <p className="font-display text-3xl md:text-4xl leading-tight">Have a skin concern on your mind?</p>
            <p className="mt-3 opacity-70">Consult first, commit later. No rush, no pressure.</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-3 bg-ivory text-navy px-10 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-sage hover:text-ivory transition-colors"
            >
              Book a consultation <ArrowRight className="size-3" />
            </Link>
          </div>
        </Reveal>
      </article>

      {related.length > 0 && (
        <section className="bg-mist/40 py-24">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-10">Keep reading</p>
            <div className="grid md:grid-cols-2 gap-10">
              {related.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group block">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-sage-dark mb-3">{p.category}</p>
                  <h3 className="font-display text-2xl leading-tight group-hover:text-sage-dark transition-colors">{p.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em]">
                    Read <ArrowRight className="size-3 group-hover:translate-x-2 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </div>
  );
}
