import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
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
        <section className="max-w-7xl mx-auto px-6 pt-14 md:pt-20 pb-12 md:pb-16">
          <p className="text-xs text-sage-dark mb-6">Tha Skin Clinic · Mangalore</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-4xl">
            Skin AI.<br />
            <em className="text-sage">Understanding, before your visit.</em>
          </h1>
          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Describe your concern in your own words. Skin AI suggests useful reading and
              questions to bring to your appointment — and helps you compare related
              treatments in plain language. It never diagnoses, and nothing you write is stored.
            </p>
            <Button asChild size="lg" className="h-12 self-start md:self-auto rounded-none shadow-none">
              <a href="#skin-guide">Start with your concern <ArrowRight aria-hidden="true" /></a>
            </Button>
          </div>
        </section>

        <nav aria-label="Skin AI tools" className="border-y border-border">
          <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2">
            <Button asChild variant="ghost" className="h-auto py-6 md:py-8 justify-between rounded-none px-0 sm:pr-8 whitespace-normal hover:bg-transparent hover:text-sage-dark">
              <a href="#skin-guide"><span className="flex items-center gap-4"><Sparkles className="text-sage" strokeWidth={1.5} /><span className="font-display text-2xl">Concern Guide</span></span><ArrowRight aria-hidden="true" /></a>
            </Button>
            <Button asChild variant="ghost" className="h-auto py-6 md:py-8 justify-between rounded-none px-0 sm:pl-8 border-t sm:border-t-0 sm:border-l border-border whitespace-normal hover:bg-transparent hover:text-sage-dark">
              <a href="#compare"><span className="flex items-center gap-4"><ShieldCheck className="text-sage" strokeWidth={1.5} /><span className="font-display text-2xl">Compare Treatments</span></span><ArrowRight aria-hidden="true" /></a>
            </Button>
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
