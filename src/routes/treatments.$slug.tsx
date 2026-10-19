import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarClock, CheckCircle2, Clock, MessageCircle, Phone, Info } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ServiceCover } from "@/components/service-cover";
import { CLINIC } from "@/lib/clinic";
import { SERVICES, getCategory, getService } from "@/lib/services";

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    if (!getService(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ params }) => {
    const s = getService(params.slug);
    const title = s ? `${s.name} in Mangaluru | The Skin Clinic` : "Treatment | The Skin Clinic";
    return {
      meta: [
        { title },
        { name: "description", content: s ? `${s.tagline} ${s.whatItIs}` : "" },
        { property: "og:title", content: title },
        { property: "og:description", content: s?.tagline ?? "" },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-ivory text-navy">
      <SiteHeader />
      <div className="max-w-3xl mx-auto px-6 py-40 text-center">
        <h1 className="font-display text-5xl mb-6">Treatment not found</h1>
        <Link to="/treatments" className="text-[11px] uppercase tracking-[0.25em] border-b border-navy pb-1">
          See all treatments
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const s = getService(slug)!;
  const cat = getCategory(s.category);
  const related = SERVICES.filter((r) => r.category === s.category && r.slug !== s.slug).slice(0, 3);

  const facts = [
    { icon: CalendarClock, label: "Sessions", value: s.sessions },
    { icon: Clock, label: "Downtime", value: s.downtime },
    ...(s.extras ?? []).map((e) => ({ icon: CheckCircle2, label: e.label, value: e.value })),
  ];

  return (
    <div className="min-h-screen bg-ivory text-navy overflow-x-hidden">
      <SiteHeader />

      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-mist via-mist/60 to-ivory">
        <s.icon aria-hidden className="absolute -right-10 -bottom-12 size-[26rem] text-sage-dark/10 animate-soft-zoom" strokeWidth={0.5} />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20">
          <Link to="/treatments" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] opacity-70 hover:opacity-100 mb-10">
            <ArrowLeft className="size-3" /> All treatments
          </Link>
          <p className="text-[10px] uppercase tracking-[0.3em] text-sage-dark mb-5 animate-fade-up">{cat.label}</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1] max-w-4xl animate-fade-up">{s.name}</h1>
          <p className="mt-6 text-xl md:text-2xl max-w-2xl leading-snug opacity-75 animate-fade-up" style={{ animationDelay: "0.2s" }}>{s.tagline}</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-8 space-y-14">
          <Reveal>
            <div className="group">
              <ServiceCover service={s} showLabel={false} className="aspect-[21/9]" />
            </div>
          </Reveal>
          {/* Fact tiles */}
          <Reveal>
            <dl className="grid sm:grid-cols-2 gap-4">
              {facts.map((f) => (
                <div key={f.label} className="flex gap-4 border border-navy/15 p-6 transition-colors hover:border-sage">
                  <f.icon className="size-6 shrink-0 text-sage" strokeWidth={1.25} />
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.25em] opacity-55">{f.label}</dt>
                    <dd className="mt-1.5 text-lg leading-snug">{f.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl mb-4">What it is</h2>
            <p className="text-lg leading-[1.75] opacity-80">{s.whatItIs}</p>
            {s.device && <p className="mt-3 text-sm opacity-55">Technology: {s.device}</p>}
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl mb-5">Who it's for</h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {s.bestFor.map((b) => (
                <li key={b} className="flex gap-3 text-lg leading-snug">
                  <CheckCircle2 className="size-5 mt-1 shrink-0 text-sage" strokeWidth={1.5} />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl mb-5">How it works</h2>
            <ol className="space-y-5">
              {s.howItWorks.map((h, i) => (
                <li key={h} className="flex gap-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy text-ivory text-sm">{i + 1}</span>
                  <p className="text-lg leading-[1.7] opacity-80 pt-0.5">{h}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <p className="flex gap-3 border-l-2 border-sage bg-mist/50 p-5 text-sm leading-relaxed opacity-80">
              <Info className="size-4 mt-0.5 shrink-0 text-sage-dark" />
              Results and recovery vary from person to person. Whether this treatment suits you, and how many sessions you need, is
              decided by your doctor after an examination.
            </p>
          </Reveal>
        </div>

        {/* Booking card */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 bg-navy text-ivory p-8">
            <p className="font-display text-3xl leading-tight">Interested in {s.name}?</p>
            <p className="mt-3 text-sm opacity-70">Consult first, commit later. Your doctor will explain your options.</p>
            <Link
              to="/contact"
              className="mt-7 flex items-center justify-between bg-ivory text-navy px-6 py-4 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-sage hover:text-ivory"
            >
              Book a consultation <ArrowRight className="size-3.5" />
            </Link>
            <a href={CLINIC.phoneHref} className="mt-3 flex items-center gap-3 border border-ivory/30 px-6 py-4 text-sm transition-colors hover:bg-ivory hover:text-navy">
              <Phone className="size-4" /> {CLINIC.phoneDisplay}
            </a>
            <a href={CLINIC.whatsappHref} target="_blank" rel="noreferrer" className="mt-3 flex items-center gap-3 border border-ivory/30 px-6 py-4 text-sm transition-colors hover:bg-ivory hover:text-navy">
              <MessageCircle className="size-4" /> WhatsApp us
            </a>
            <p className="mt-6 text-xs opacity-55">{CLINIC.hoursDay}, {CLINIC.hoursTime}</p>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-mist/40 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-8">More in {cat.label.toLowerCase()}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/treatments/$slug"
                  params={{ slug: r.slug }}
                  className="group border border-navy/15 bg-ivory p-7 transition-all duration-300 hover:-translate-y-1 hover:border-navy hover:shadow-lg"
                >
                  <r.icon className="size-6 text-sage mb-5" strokeWidth={1.25} />
                  <h3 className="font-display text-2xl leading-tight">{r.name}</h3>
                  <p className="mt-2 text-sm opacity-65 leading-relaxed">{r.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em]">
                    Learn more <ArrowRight className="size-3 transition-transform group-hover:translate-x-2" />
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
