import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Sparkles, ShieldCheck } from "lucide-react";
import { AiOrb } from "@/components/ai-orb";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { SkinConcernGuide } from "@/components/skin-concern-guide";
import { TreatmentComparison } from "@/components/treatment-comparison";

export const Route = createFileRoute("/skin-ai")({
  head: () => ({
    meta: [
      { title: "Skin AI — Concern Guide & Treatment Comparisons | Tha Skin Clinic" },
      { name: "description", content: "Describe your skin concern in your own words and let Skin AI suggest helpful guides and questions for your visit — plus plain-language comparisons of related treatments. Educational only, never a diagnosis." },
      { property: "og:title", content: "Skin AI — Concern Guide & Treatment Comparisons | Tha Skin Clinic" },
      { property: "og:description", content: "Describe your skin concern and get suggested reading and questions for your appointment — educational guidance, never a diagnosis." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SkinAI,
});

function SkinAI() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="treatment-page">
        <section className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-mist/60 via-background to-background" />
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-[30rem] rounded-full bg-sage/25 blur-3xl ai-float-slow" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 size-[22rem] rounded-full bg-mist blur-3xl ai-float" />
          <div className="relative max-w-7xl mx-auto px-6 pt-14 md:pt-20 pb-12 md:pb-16 grid lg:grid-cols-[1fr_22rem] gap-10 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-sage/30 bg-background/70 px-4 py-1.5 text-xs text-sage-dark backdrop-blur mb-6 animate-fade-up">
                <Sparkles size={14} strokeWidth={1.75} /> Tha Skin Clinic · Mangalore
              </p>
              <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-4xl animate-fade-up">
                Skin AI.<br />
                <em className="bg-gradient-to-r from-sage via-sage-dark to-sage bg-clip-text text-transparent">Understanding, before your visit.</em>
              </h1>
              <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Describe your concern in your own words. Skin AI suggests useful reading and
                  questions to bring to your appointment — and helps you compare related
                  treatments in plain language. It never diagnoses, and nothing you write is stored.
                </p>
                <Button asChild size="lg" className="group h-12 self-start md:self-auto rounded-full px-7 bg-gradient-to-r from-navy to-sage-dark shadow-lg shadow-sage/30 transition-all hover:-translate-y-0.5 hover:shadow-xl">
                  <a href="#skin-guide">Start with your concern <ArrowRight aria-hidden="true" className="transition-transform group-hover:translate-x-1" /></a>
                </Button>
              </div>
            </div>
            <div aria-hidden="true" className="relative hidden lg:flex h-80 items-center justify-center">
              <AiOrb className="size-40" busy />
              {[
                { label: "Guides", cls: "left-0 top-6 ai-float", icon: Sparkles },
                { label: "Questions", cls: "right-0 top-24 ai-float-slow", icon: MessageCircle },
                { label: "Compare", cls: "left-4 bottom-4 ai-float-slow", icon: ShieldCheck },
              ].map(({ label, cls, icon: Icon }) => (
                <span key={label} className={`absolute inline-flex items-center gap-2 rounded-full border border-sage/25 bg-background/80 px-4 py-2 text-sm shadow-lg shadow-sage/10 backdrop-blur ${cls}`}>
                  <Icon size={15} strokeWidth={1.5} className="text-sage" /> {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <nav aria-label="Skin AI tools" className="max-w-7xl mx-auto px-6 pb-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: "#skin-guide", label: "Concern Guide", icon: Sparkles },
              { href: "#compare", label: "Compare Treatments", icon: ShieldCheck },
            ].map(({ href, label, icon: Icon }) => (
              <a key={href} href={href} className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-border bg-background p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sage/50 hover:shadow-xl hover:shadow-sage/15">
                <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-sage/0 via-sage/0 to-sage/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-full bg-mist text-sage-dark transition-transform duration-300 group-hover:scale-110"><Icon strokeWidth={1.5} /></span>
                  <span className="font-display text-2xl">{label}</span>
                </span>
                <ArrowRight aria-hidden="true" className="relative transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </nav>

        <SkinConcernGuide />
        <TreatmentComparison />

        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="border-t border-border pt-8 flex flex-col md:flex-row gap-6 justify-between items-start">
            <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">
              Skin AI offers educational guidance only — it is not a diagnosis, a treatment
              plan, or a substitute for a dermatologist's assessment. Your description is
              processed to respond and is not saved by this site. For urgent symptoms,
              seek in-person medical care.
            </p>
            <Button asChild size="lg" className="h-12 rounded-none shadow-none shrink-0">
              <Link to="/contact">Talk to a dermatologist <ArrowRight aria-hidden="true" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
