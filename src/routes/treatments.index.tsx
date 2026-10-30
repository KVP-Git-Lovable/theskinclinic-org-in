import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Clock, Layers3 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ServiceCover } from "@/components/service-cover";
import { CLINIC } from "@/lib/clinic";
import { HeroReel } from "@/components/hero-reel";
import {
  AESTHETIC_CONCERNS,
  MEDICAL_CONDITIONS,
  SERVICES,
  SERVICE_CATEGORIES,
  TECHNOLOGY,
  getCategory,
  type ServiceCategoryId,
} from "@/lib/services";

export const Route = createFileRoute("/treatments/")({
  head: () => ({
    meta: [
      { title: "Treatments | The Skin Clinic, Mangaluru" },
      { name: "description", content: "Lasers, peels, scar treatment, anti-ageing, hair restoration, body contouring and medical dermatology at The Skin Clinic, Mangaluru." },
      { property: "og:title", content: "Treatments | The Skin Clinic, Mangaluru" },
      { property: "og:description", content: "Explore every treatment we offer: what it is, who it's for, how many sessions and what to expect." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    // Open the video connections early so the reel starts sooner.
    links: [
      { rel: "preconnect", href: "https://www.youtube-nocookie.com" },
      { rel: "preconnect", href: "https://i.ytimg.com" },
    ],
  }),
  component: Treatments,
});

function Treatments() {
  const [filter, setFilter] = useState<ServiceCategoryId | "all">("all");
  const visible = filter === "all" ? SERVICES : SERVICES.filter((s) => s.category === filter);

  return (
    <div className="min-h-screen bg-ivory text-navy overflow-x-hidden">
      <SiteHeader />

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-14">
        <div aria-hidden className="pointer-events-none absolute -top-16 right-0 size-[26rem] rounded-full bg-sage/20 blur-3xl animate-pulse motion-reduce:animate-none" />
        {/* Muted reel of short treatment clips from the clinic's Skin Talks channel; plays by itself */}
        <div className="hidden xl:block absolute right-6 top-12 z-10 2xl:-right-16 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <HeroReel />
        </div>
        <p className="relative text-[11px] uppercase tracking-[0.4em] opacity-50 mb-8 animate-fade-up">Treatments</p>
        <h1 className="relative font-display text-6xl md:text-8xl leading-[0.95] animate-fade-up">
          Care for your skin,
          <br />
          <em className="text-sage">explained simply.</em>
        </h1>
        <div className="relative h-px w-24 bg-sage mt-10 origin-left animate-line-draw" style={{ animationDelay: "0.5s" }} />
        <div className="relative mt-8 flex flex-col md:flex-row md:items-end xl:flex-col xl:items-start justify-between gap-8">
          <p className="max-w-xl text-lg leading-relaxed opacity-75 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Every treatment below shows who it's for, how it works, how many sessions to expect and the downtime, so you know
            what to expect before you visit. Your doctor will confirm what suits you.
          </p>
          <ul className="flex flex-wrap gap-3 text-sm">
            <li className="flex items-center gap-2 border border-navy/15 px-4 py-2"><Layers3 className="size-4 text-sage" /> {SERVICES.length} treatments</li>
            <li className="flex items-center gap-2 border border-navy/15 px-4 py-2"><Clock className="size-4 text-sage" /> Mon–Sat, 10am–8pm</li>
          </ul>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[84px] z-30 border-y border-navy/10 bg-ivory/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto" role="tablist" aria-label="Treatment categories">
          {[{ id: "all" as const, label: "All treatments" }, ...SERVICE_CATEGORIES].map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={`shrink-0 px-5 py-2.5 text-[13px] border transition-all duration-300 ${
                filter === c.id
                  ? "bg-navy text-ivory border-navy"
                  : "border-navy/20 hover:border-navy hover:-translate-y-0.5"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 80}>
              <Link
                to="/treatments/$slug"
                params={{ slug: s.slug }}
                className="group relative flex h-full flex-col overflow-hidden border border-navy/15 bg-ivory transition-all duration-500 hover:-translate-y-1.5 hover:border-navy hover:shadow-2xl"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-sage transition-transform duration-500 group-hover:scale-x-100" />
                <ServiceCover service={s} categoryLabel={getCategory(s.category).label} />
                <div className="flex flex-1 flex-col p-8">
                <h2 className="font-display text-3xl leading-tight">{s.name}</h2>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed opacity-70">{s.tagline}</p>
                <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-navy/10 pt-5 text-sm">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] opacity-50">Sessions</dt>
                    <dd className="mt-1 leading-snug">{s.sessions.split(",")[0]}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] opacity-50">Downtime</dt>
                    <dd className="mt-1 leading-snug">{s.downtime.split(":")[0].split(";")[0]}</dd>
                  </div>
                </dl>
                <span className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em]">
                  Learn more <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-2" />
                </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Conditions */}
      <section className="bg-mist/40 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Conditions we care for</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] mb-14 max-w-3xl">
              From everyday concerns to <em className="text-sage">complex skin conditions.</em>
            </h2>
          </Reveal>
          <div className="grid lg:grid-cols-2 gap-14">
            <Reveal>
              <h3 className="font-display text-3xl mb-6">Medical dermatology</h3>
              <ul className="flex flex-wrap gap-2.5">
                {MEDICAL_CONDITIONS.map((c) => (
                  <li key={c} className="border border-navy/20 bg-ivory px-4 py-2 text-sm transition-colors hover:bg-navy hover:text-ivory">{c}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <h3 className="font-display text-3xl mb-6">Aesthetic dermatology</h3>
              <ul className="flex flex-wrap gap-2.5">
                {AESTHETIC_CONCERNS.map((c) => (
                  <li key={c} className="border border-navy/20 bg-ivory px-4 py-2 text-sm transition-colors hover:bg-navy hover:text-ivory">{c}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Technology</p>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05] mb-14 max-w-3xl">
            Advanced equipment, <em className="text-sage">chosen with care.</em>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-x-14">
          {TECHNOLOGY.map((t, i) => (
            <Reveal key={t.device} delay={(i % 2) * 80}>
              <div className="flex items-baseline justify-between gap-6 border-b border-navy/10 py-5">
                <span className="font-display text-2xl leading-tight">{t.device}</span>
                <span className="text-sm text-right opacity-65 max-w-[16rem]">{t.usedFor}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-ivory py-24">
        <Reveal className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-6xl leading-[1.05]">
            Not sure which treatment <em className="text-sage">is right for you?</em>
          </h2>
          <p className="mt-6 opacity-70 max-w-xl mx-auto">Consult first, commit later. Your doctor will listen, examine your skin and explain your options.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-3 bg-ivory text-navy px-10 py-4 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-sage hover:text-ivory">
              Book a consultation <ArrowRight className="size-3" />
            </Link>
            <a href={CLINIC.phoneHref} className="inline-flex items-center gap-3 border border-ivory/30 px-10 py-4 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-ivory hover:text-navy">
              Call {CLINIC.phoneDisplay}
            </a>
            <Link to="/skin-ai" className="inline-flex items-center gap-3 border border-ivory/30 px-10 py-4 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-ivory hover:text-navy">
              Try Skin AI
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
