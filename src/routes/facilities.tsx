import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { clinicFacilities } from "@/lib/clinic-facilities";

export const Route = createFileRoute("/facilities")({
  head: () => ({ meta: [
    { title: "Facilities & Technologies | The Skin Clinic, Mangalore" },
    { name: "description", content: "Explore the technologies listed by The Skin Clinic, including laser, light and energy-based treatments. Understand their purpose and questions to discuss with your dermatologist." },
    { property: "og:title", content: "Facilities & Technologies | The Skin Clinic" },
    { property: "og:description", content: "Understand the clinic's technologies, their possible uses and what to ask before deciding on treatment." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Facilities,
});
function Facilities() {
  return <div className="clinic-page min-h-screen"><SiteHeader /><main>
    <section className="bg-clinic-mint"><div className="max-w-7xl mx-auto px-6 py-14 md:py-20"><p className="text-xs mb-5">The Skin Clinic · Mangalore</p><h1 className="text-4xl md:text-6xl leading-tight">Facilities & technologies</h1><p className="mt-6 text-lg max-w-2xl leading-relaxed text-clinic-green/75">Advanced tools are only one part of care. A dermatologist's assessment determines which approach—if any—is appropriate for your skin and health.</p></div></section>
    <section className="max-w-7xl mx-auto px-6 py-14 md:py-20"><h2 className="text-2xl md:text-3xl mb-5">Know the technology. Understand the choice.</h2><p className="text-sm max-w-2xl leading-relaxed text-clinic-green/70">These facilities and treatment technologies are described on the clinic's existing website. Read their purpose and limitations, then confirm current availability, suitability and fees at consultation.</p><div className="grid md:grid-cols-2 gap-x-12 mt-10">{clinicFacilities.map(facility => <Link key={facility.slug} to="/facilities/$slug" params={{ slug: facility.slug }} className="border-t border-clinic-green/15 py-7 block"><h3 className="text-xl flex justify-between items-start gap-4">{facility.name}<ArrowUpRight size={19} className="shrink-0 mt-1" /></h3><p className="text-sm mt-3 leading-relaxed text-clinic-green/70">{facility.summary}</p></Link>)}</div></section>
    <section className="bg-clinic-mint"><div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-6 justify-between md:items-center"><div><h2 className="text-2xl">A treatment should fit you—not the other way around.</h2><p className="mt-4 text-sm text-clinic-green/70">Ask about alternatives, downtime, skin-tone suitability and the expected course before deciding.</p></div><Button asChild className="bg-clinic-green text-clinic-white hover:bg-clinic-green/90 h-12 shrink-0 shadow-none"><Link to="/contact">Talk to the clinic <ArrowRight /></Link></Button></div></section>
  </main><SiteFooter /></div>;
}