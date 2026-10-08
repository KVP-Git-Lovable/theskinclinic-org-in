import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { clinicFacilities } from "@/lib/clinic-facilities";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/facilities/$slug")({
  loader: ({ params }) => { const facility = clinicFacilities.find(f => f.slug === params.slug); if (!facility) throw notFound(); return facility; },
  head: ({ loaderData }) => {
    const title = `${loaderData?.name ?? "Clinic technology"} | The Skin Clinic, Mangalore`;
    const description = loaderData?.summary ?? "Understand the technologies used in dermatologist-led care at The Skin Clinic.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] };
  },
  component: FacilityPage,
});
function FacilityPage() {
  const facility = Route.useLoaderData();
  return <div className="clinic-page min-h-screen"><SiteHeader /><main>
    <section className="bg-clinic-mint"><div className="max-w-6xl mx-auto px-6 py-12 md:py-16"><Link to="/facilities" className="inline-flex gap-2 items-center text-sm mb-8"><ArrowLeft size={16} /> All facilities</Link><p className="text-xs mb-4">Facilities & technologies</p><h1 className="text-4xl md:text-6xl leading-tight max-w-4xl">{facility.name}</h1><p className="text-lg mt-6 max-w-2xl leading-relaxed">{facility.summary}</p></div></section>
    <section className="max-w-6xl mx-auto px-6 py-14 md:py-20 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20"><aside><h2 className="text-2xl">A considered approach</h2><p className="mt-5 text-sm leading-relaxed text-clinic-green/70">Technology is not a diagnosis or a reason to have a procedure. The clinic will assess your concern and explain whether this approach is appropriate.</p></aside><div className="space-y-10"><section className="border-t border-clinic-green/15 pt-6"><h2 className="text-xl mb-4">What it is used for</h2><p className="leading-relaxed text-clinic-green/75">{facility.overview}</p></section><section className="border-t border-clinic-green/15 pt-6"><h2 className="text-xl mb-4">What to expect & discuss</h2><p className="leading-relaxed text-clinic-green/75">{facility.expectations}</p></section><section className="bg-clinic-mint p-6 md:p-8"><h2 className="text-xl mb-5">Questions for the clinic</h2><ul className="list-disc pl-5 text-sm leading-relaxed space-y-3">{facility.questions.map(q => <li key={q}>{q}</li>)}</ul></section><p className="text-xs text-clinic-green/65 leading-relaxed">Listed on the clinic's existing website. Confirm the exact method, current availability, costs and suitability at consultation. Results vary; this information does not promise a particular outcome.</p><Button asChild className="bg-clinic-green text-clinic-white hover:bg-clinic-green/90 h-12 shadow-none"><Link to="/contact">Discuss your options <ArrowRight /></Link></Button></div></section>
  </main><SiteFooter /></div>;
}