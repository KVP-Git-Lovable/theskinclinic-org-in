import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { clinicServices } from "@/lib/clinic-services";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => { const service = clinicServices.find(s => s.slug === params.slug); if (!service) throw notFound(); return service; },
  head: ({ loaderData }) => {
    const title = `${loaderData?.name ?? "Clinic service"} | The Skin Clinic, Mangalore`;
    const description = loaderData?.summary ?? "Explore dermatologist-led care at The Skin Clinic, Mangalore.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: ServicePage,
});

function ServicePage() {
  const service = Route.useLoaderData();
  return <div className="clinic-page min-h-screen"><SiteHeader /><main>
    <section className="bg-clinic-mint border-b border-clinic-green/10"><div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
      <Link to="/treatments" hash="clinic-services" className="inline-flex items-center gap-2 text-sm mb-8"><ArrowLeft size={16} /> All clinic services</Link>
      <p className="text-xs mb-4">{service.category} · Mangalore</p><h1 className="text-4xl md:text-6xl leading-tight max-w-4xl">{service.name}</h1><p className="mt-6 text-lg max-w-2xl leading-relaxed">{service.summary}</p>
      <Button asChild className="mt-8 bg-clinic-green text-clinic-white hover:bg-clinic-green/90 h-12 shadow-none"><Link to="/contact">Discuss this concern <ArrowRight /></Link></Button>
    </div></section>
    <section className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
      <aside><h2 className="text-2xl">Understand your options</h2><p className="mt-5 text-sm leading-relaxed text-clinic-green/70">A consultation comes before a treatment decision. The information here explains possible care—not a diagnosis, a personalised recommendation or a promise of results.</p><a href="#questions" className="block underline underline-offset-4 mt-5 text-sm">Questions for your visit</a></aside>
      <div className="space-y-10">{[["Understanding the concern", service.overview], ["Care to discuss at the clinic", service.care], ["What to expect", service.expectations], ["When to consult", service.consult]].map(([heading, text]) => <section key={heading} className="border-t border-clinic-green/15 pt-6"><h2 className="text-xl mb-4">{heading}</h2><p className="leading-relaxed text-clinic-green/75">{text}</p></section>)}
      <section id="questions" className="scroll-mt-28 bg-clinic-mint p-6 md:p-8"><h2 className="text-xl mb-5">Questions for your visit</h2><ul className="list-disc pl-5 space-y-3 text-sm leading-relaxed"><li>What is causing my concern, and do I need any tests?</li><li>What are the alternatives—including not having a procedure?</li><li>What risks, recovery and aftercare apply to my skin and health?</li><li>What will the proposed course cost, and how will progress be reviewed?</li></ul></section>
      <p className="text-xs text-clinic-green/65 leading-relaxed">Service listed on the clinic's existing website. Exact methods, devices, fees and current availability must be confirmed during consultation.</p>
      <Button asChild className="bg-clinic-green text-clinic-white hover:bg-clinic-green/90 h-12 shadow-none"><Link to="/contact">Book a consultation <ArrowRight /></Link></Button></div>
    </section>
    <section className="border-t border-clinic-green/10 max-w-6xl mx-auto px-6 py-12"><h2 className="text-2xl mb-6">Related reading</h2><div className="flex flex-wrap gap-6">{clinicServices.filter(s => s.category === service.category && s.slug !== service.slug).slice(0, 3).map(s => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="underline underline-offset-4 text-sm">{s.name}</Link>)}</div></section>
  </main><SiteFooter /></div>;
}