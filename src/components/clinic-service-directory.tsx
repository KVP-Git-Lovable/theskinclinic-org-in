import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { clinicServices } from "@/lib/clinic-services";

export function ClinicServiceDirectory() {
  return <section id="clinic-services" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16 border-t border-border">
    <p className="text-xs text-sage-dark mb-4">Services from The Skin Clinic</p>
    <h2 className="font-display text-4xl md:text-5xl">Explore our clinic services</h2>
    <p className="mt-5 max-w-2xl text-muted-foreground leading-relaxed">These services are listed on our existing clinic website. Read about their purpose, possible care options and what to discuss before deciding. Your dermatologist will confirm current availability and suitability.</p>
    <div className="grid lg:grid-cols-2 gap-10 mt-10">{(["Medical dermatology", "Cosmetic care"] as const).map(category => <div key={category}>
      <h3 className="font-display text-2xl mb-5">{category}</h3>
      <div className="border-t border-border">{clinicServices.filter(s => s.category === category).map(s => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="block border-b border-border py-5 group"><span className="flex items-start justify-between gap-4 font-medium">{s.name}<ArrowUpRight className="size-4 shrink-0 mt-1 text-sage" /></span><span className="text-sm text-muted-foreground block mt-2 leading-relaxed">{s.summary}</span></Link>)}</div>
    </div>)}</div>
  </section>;
}