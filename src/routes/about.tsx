import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { clinicTeam } from "@/lib/clinic-team";
import clinic from "@/assets/clinic-treatment-room.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dr. Vindhya A. Pai & Team | The Skin Clinic" },
      {
        name: "description",
        content:
          "The Skin Clinic was founded in 2018 by Dr. Vindhya A. Pai. Meet our team of dermatologists caring for Mangalore.",
      },
      { property: "og:title", content: "About — Dr. Vindhya A. Pai & Team | The Skin Clinic" },
      { property: "og:description", content: "The Skin Clinic was founded in 2018 by Dr. Vindhya A. Pai. Meet our team of dermatologists caring for Mangalore." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  const founder = clinicTeam[0];
  if (!founder) return null;
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
          <img src={founder.image} alt="Dr. Vindhya A. Pai, Founder and Chief Dermatologist" className="w-full max-w-[400px] aspect-square object-cover" loading="lazy" />
        </div>
        <div className="md:col-span-6">
          <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Founder & Chief Dermatologist</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.1] mb-8">
            Dr. Vindhya A. Pai
          </h2>
          <p className="text-lg leading-relaxed opacity-80 mb-6">
            MBBS, MD, DNB. {founder.description}
          </p>
          <p className="leading-relaxed opacity-70">
            Alongside Dr. Punya Suvarna, Dr. P. Suraksha and Dr. Ashwini Ashokan, she leads a team caring for medical skin, hair and nail concerns as well as selected cosmetic goals.
          </p>
        </div>
      </section>

      <section className="bg-mist/40 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">The team</p>
          <h2 className="font-display text-5xl md:text-6xl mb-16">Four dermatologists.<br /><em className="text-sage">One promise.</em></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {clinicTeam.map((d) => (
              <div key={d.name} className="bg-ivory p-8">
                <img src={d.image} alt={d.name} className="w-full aspect-square object-cover mb-6" loading="lazy" />
                <h4 className="font-display text-xl leading-tight">{d.name}</h4>
                <p className="text-xs opacity-60 mt-2">{d.role} · {d.credentials}</p>
                <p className="text-sm opacity-70 leading-relaxed mt-4">{d.description}</p>
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
            Take a look inside one of our treatment rooms, photographed at The Skin Clinic.
            During your consultation, ask about the facilities relevant to your care,
            preparation and aftercare.
          </p>
        </div>
        <img src={clinic.url} alt="Treatment room at The Skin Clinic, Mangalore" className="w-full aspect-square object-cover" loading="lazy" />
      </section>

      <SiteFooter />
    </div>
  );
}
