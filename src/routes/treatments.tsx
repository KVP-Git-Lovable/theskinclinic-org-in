import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { TreatmentDetail } from "@/components/treatment-detail";
import { medicalTreatments, cosmeticTreatments } from "@/lib/treatments";
import medicalImage from "@/assets/ig-2.jpg";
import cosmeticImage from "@/assets/ig-3.jpg";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Medical & Cosmetic Treatments | Tha Skin Clinic, Mangalore" },
      { name: "description", content: "Understand medical dermatology and cosmetic care: acne, eczema, hair loss, pigmentation, lasers, peels and injectables. Explore care options with Tha Skin Clinic." },
      { property: "og:title", content: "Medical & Cosmetic Treatments | Tha Skin Clinic" },
      { property: "og:description", content: "Clear, thoughtful guidance on skin conditions, cosmetic treatments and what to expect from your care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Treatments,
});

function Treatments() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="treatment-page">
        <section className="max-w-7xl mx-auto px-6 pt-14 md:pt-20 pb-12 md:pb-16">
          <p className="text-xs text-sage-dark mb-6">Tha Skin Clinic · Mangalore</p>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05] max-w-4xl">Medical & cosmetic care.<br /><em className="text-sage">Thoughtfully personalised.</em></h1>
          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">Relief for a skin concern. A change that feels like you. Understand your options, with care that begins by listening.</p>
            <Button asChild size="lg" className="h-12 self-start md:self-auto rounded-none shadow-none"><Link to="/contact">Book a consultation <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </section>

        <nav aria-label="Treatment categories" className="border-y border-border">
          <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2">
            <Button asChild variant="ghost" className="h-auto py-6 md:py-8 justify-between rounded-none px-0 sm:pr-8 whitespace-normal hover:bg-transparent hover:text-sage-dark">
              <a href="#medical"><span className="flex items-center gap-4"><ShieldCheck className="text-sage" strokeWidth={1.5} /><span className="font-display text-2xl">Medical Dermatology</span></span><ArrowDown aria-hidden="true" /></a>
            </Button>
            <Button asChild variant="ghost" className="h-auto py-6 md:py-8 justify-between rounded-none px-0 sm:pl-8 border-t sm:border-t-0 sm:border-l border-border whitespace-normal hover:bg-transparent hover:text-sage-dark">
              <a href="#cosmetic"><span className="flex items-center gap-4"><Sparkles className="text-sage" strokeWidth={1.5} /><span className="font-display text-2xl">Cosmetic Treatments</span></span><ArrowDown aria-hidden="true" /></a>
            </Button>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Link to="/skin-ai" className="text-sage-dark underline underline-offset-4">Find guides for your concern with Skin AI</Link>
          <Link to="/skin-ai" hash="compare" className="text-sage-dark underline underline-offset-4">Compare related treatments</Link>
        </div>

        <section id="medical" aria-labelledby="medical-heading" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-[1fr_1.65fr] gap-10 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs text-sage-dark mb-5">01 / Skin, hair & nail health</p>
              <h2 id="medical-heading" className="font-display text-4xl md:text-5xl leading-tight">Medical<br />Dermatology</h2>
              <p className="text-lg leading-relaxed text-muted-foreground mt-6 max-w-md">When your skin needs attention, understanding the cause is the first step towards feeling better.</p>
              <p className="text-sm leading-relaxed text-muted-foreground mt-5 max-w-md">From recurring rashes to hair loss and changing moles, a dermatologist can help distinguish similar-looking conditions and guide the right next step.</p>
              <img src={medicalImage} alt="Dermatology examination instruments and a sprig of green leaves on a marble tray" className="mt-8 w-full max-w-md aspect-[4/3] object-cover object-center" loading="lazy" />
              <div className="mt-8 border-t border-border pt-6 max-w-md">
                <div className="flex gap-3 items-start"><ShieldCheck className="size-5 text-sage shrink-0 mt-1" strokeWidth={1.5} /><p className="text-sm leading-relaxed text-muted-foreground">New or changing spots, a non-healing sore or sudden hair loss deserve an in-person assessment.</p></div>
              </div>
            </div>
            <div className="border-t border-border">{medicalTreatments.map((treatment, index) => <TreatmentDetail key={treatment.id} treatment={treatment} index={index} />)}</div>
          </div>
        </section>

        <section id="cosmetic" aria-labelledby="cosmetic-heading" className="scroll-mt-24 bg-mist/30 border-y border-border">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid lg:grid-cols-[1fr_1.65fr] gap-10 lg:gap-20 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs text-sage-dark mb-5">02 / Texture, tone & confidence</p>
              <h2 id="cosmetic-heading" className="font-display text-4xl md:text-5xl leading-tight">Cosmetic<br />Treatments</h2>
              <p className="text-lg leading-relaxed text-muted-foreground mt-6 max-w-md">Subtle improvements. Considered choices. Your features, still unmistakably yours.</p>
              <p className="text-sm leading-relaxed text-muted-foreground mt-5 max-w-md">Explore treatments for scars, unwanted hair, uneven tone and signs of ageing. Suitability depends on your skin, health and expectations—not a trend.</p>
              <img src={cosmeticImage} alt="A drop of clear serum falling from a glass dropper in soft window light" className="mt-8 w-full max-w-md aspect-[4/3] object-cover object-center" loading="lazy" />
              <p className="text-xs text-muted-foreground mt-3">Individual results and recovery vary.</p>
            </div>
            <div className="border-t border-border">{cosmeticTreatments.map((treatment, index) => <TreatmentDetail key={treatment.id} treatment={treatment} index={index} />)}</div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div><p className="text-xs text-sage-dark mb-5">Your first visit</p><h2 className="font-display text-4xl md:text-5xl leading-tight">A conversation.<br /><em className="text-sage">Then a considered plan.</em></h2></div>
            <ol className="divide-y divide-border border-t border-border">
              {[
                ["We listen", "Your concerns, medical history, current products and what you hope to change."],
                ["We assess", "A skin or scalp examination, with tests only when they can help clarify the cause."],
                ["You understand your options", "Recommended care, alternatives, costs, potential risks and aftercare—before you decide."],
              ].map(([title, body], i) => <li key={title} className="flex gap-5 py-6"><span className="text-xs text-sage-dark mt-1 tabular-nums">0{i + 1}</span><div><h3 className="font-display text-2xl">{title}</h3><p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p></div></li>)}
            </ol>
          </div>
          <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row gap-6 justify-between items-start">
            <p className="max-w-2xl text-sm text-muted-foreground leading-relaxed">These guides explain possible care options, not a diagnosis or a guarantee of results. Specific products, devices and specialist procedures are subject to suitability and local availability; confirm them at consultation.</p>
            <Button asChild size="lg" className="h-12 rounded-none shadow-none shrink-0"><Link to="/contact">Talk to a dermatologist <ArrowRight aria-hidden="true" /></Link></Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
