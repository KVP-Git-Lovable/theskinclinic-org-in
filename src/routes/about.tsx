import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import drVindhya from "@/assets/dr-vindhya.jpg";
import clinic from "@/assets/clinic-interior.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dr. Vindhya A. Pai & Team | Tha Skin Clinic" },
      {
        name: "description",
        content:
          "Tha Skin Clinic was founded in 2018 by Dr. Vindhya A. Pai. Meet our team of dermatologists caring for Mangalore.",
      },
      { property: "og:title", content: "About — Dr. Vindhya A. Pai & Team | Tha Skin Clinic" },
      { property: "og:description", content: "Tha Skin Clinic was founded in 2018 by Dr. Vindhya A. Pai. Meet our team of dermatologists caring for Mangalore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const TEAM = [
  { name: "Dr. Vindhya A. Pai", role: "Founder, Consultant Dermatologist — MD, DNB" },
  { name: "Dr. Punya Suvarna", role: "Consultant Dermatologist — MBBS, MD" },
  { name: "Dr. P. Suraksha", role: "Consultant Dermatologist — MBBS, DDVL" },
  { name: "Dr. Ashwini Ashokan", role: "Consultant Dermatologist — MBBS, MD" },
];

function About() {
  return (
    <div className="min-h-screen bg-ivory text-navy">
      <SiteHeader />

      <section className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-8">Est. 2018</p>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.95] max-w-4xl">
          A quieter kind of
          <br />
          <em className="text-sage">dermatology.</em>
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-6">
          <img src={drVindhya} alt="Dr. Vindhya A. Pai" className="w-full aspect-[4/5] object-cover" loading="lazy" />
        </div>
        <div className="md:col-span-6">
          <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Our philosophy</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-8">
            "The best dermatology is often the least visible."
          </h2>
          <p className="text-lg leading-relaxed opacity-80 mb-6">
            Tha Skin Clinic was born of a simple observation — Indian skin, and Indian
            monsoon skin especially, needs care shaped for its climate, its melanin,
            and its rhythms. Not imported protocols.
          </p>
          <p className="leading-relaxed opacity-70">
            Since 2018, we've built a practice where evidence-based dermatology meets
            genuine listening. Every laser, every prescription, every drop of Formula V
            starts with the same question: what does <em>your</em> skin need?
          </p>
        </div>
      </section>

      <section className="bg-mist/40 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">The team</p>
          <h2 className="font-display text-5xl md:text-6xl mb-16">Four dermatologists.<br /><em className="text-sage">One promise.</em></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((d) => (
              <div key={d.name} className="bg-ivory p-8">
                <div className="aspect-square bg-mist/60 mb-6" />
                <h4 className="font-display text-xl leading-tight">{d.name}</h4>
                <p className="text-xs opacity-60 mt-2">{d.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Inside the clinic</p>
          <h2 className="font-display text-5xl leading-[1.05] mb-8">
            Designed as a
            <br />
            <em className="text-sage">sanctuary.</em>
          </h2>
          <p className="text-lg leading-relaxed opacity-75">
            Soft light. Quiet corners. Sanitised, hospital-grade treatment rooms tucked
            behind a residential-feeling reception. Because clinical excellence doesn't
            have to feel clinical.
          </p>
        </div>
        <img src={clinic} alt="Tha Skin Clinic interior" className="w-full aspect-square object-cover" loading="lazy" />
      </section>

      <SiteFooter />
    </div>
  );
}
