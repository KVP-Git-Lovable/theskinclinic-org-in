import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, MessagesSquare, Microscope, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import drVindhya from "@/assets/dr-vindhya-pai.jpg";
import drPunya from "@/assets/team/dr-punya.jpg";
import drAshwini from "@/assets/team/dr-ashwini.jpg";
import clinicReception from "@/assets/clinic/clinic-reception.jpg";
import clinicHall from "@/assets/clinic/clinic-hall.jpg";


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Dr. Vindhya A. Pai & Team | The Skin Clinic Mangaluru" },
      {
        name: "description",
        content:
          "The Skin Clinic was founded in 2018 by Dr. Vindhya A. Pai. A family dermatology practice in Mangaluru with a team of three dermatologists.",
      },
      { property: "og:title", content: "About — Dr. Vindhya A. Pai & Team | The Skin Clinic Mangaluru" },
      { property: "og:description", content: "A family dermatology practice in Mangaluru, founded in 2018 by Dr. Vindhya A. Pai, with a team of three dermatologists." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const STATS = [
  { value: "2018", label: "Founded in Mangaluru" },
  { value: "3", label: "Consultant dermatologists" },
  { value: "27,000+", label: "Patients cared for" },
  { value: "IADVL", label: "Recognised observership centre, 2023" },
];

const VALUES = [
  { icon: HeartHandshake, title: "Patient experience", body: "No-rush appointments in a comfortable, confidential setting. You are never hurried out of the room." },
  { icon: ShieldCheck, title: "Care first", body: "Consult first, commit later. We explain options, risks and alternatives before you decide anything." },
  { icon: MessagesSquare, title: "Honest communication", body: "Plain language, realistic expectations and no protocol pushed on you." },
  { icon: Microscope, title: "Innovation", body: "Medical-grade lasers and evidence-based techniques, chosen to suit Indian skin and climate." },
];

const TEAM = [
  {
    name: "Dr. Vindhya A. Pai",
    role: "Founder · Consultant Dermatologist",
    quals: "MBBS, MD (DVL)",
    photo: drVindhya,
    bio: [
      "Dr Vindhya Pai is a Dermatologist at KMC Hospital, Dr B R Ambedkar Circle, Mangalore. She is a specialist in the field of Dermatology (Skin, Laser and Surgery). She earned her MBBS degree from Kasturba Medical College, Mangalore in 2010, and then did a preceptorship course at Skin, Laser and Surgery Specialists of New Jersey. Dr Vindhya has done her Masters of Doctorate from Kasturba Medical College, Mangalore.",
      "She worked in the USA under the world-renowned laser surgeon and Dermatologist Dr David J Goldberg in the speciality field of Cosmetic Dermatology. Dr Vindhya Pai has also done a fellowship on the Dermatoscope, in the study of moles, from Cardiff University, United Kingdom.",
    ],
  },
  {
    name: "Dr. Punya Suvarna",
    role: "Consultant Dermatologist",
    quals: "MBBS, MD (DVL)",
    photo: drPunya,
    bio: [
      "Dr Punya Suvarna is a skilled dermatologist with great clinical acumen. She was awarded the Best Outgoing Student for the year 2021 from KMC Manipal, from where she completed her MD in Dermatology, Venereology and Leprosy. She specialises in pigmentary disorders, acne and hair-related issues, and is trained in advanced laser and aesthetic injectable treatments.",
      "She also attained her MRCP SCE (UK) in 2022 and is continuously updating herself on the latest advancements in Dermatology.",
    ],
  },
  {
    name: "Dr. Ashwini Ashokan",
    role: "Consultant Dermatologist",
    quals: "MBBS, MD (DVL)",
    photo: drAshwini,
    bio: [
      "Dr. Ashwini Ashokan is a qualified dermatologist with formal training in Dermatology, Venereology, and Leprosy, having completed her MD from Amrita Institute of Medical Sciences, Kochi, in 2025. Her training involved extensive exposure to both outpatient and inpatient dermatological care, following comprehensive training across diverse dermatological subspecialties.",
      "Her areas of interest include core clinical dermatology, with emphasis on papulosquamous disorders, infections and infestations, pigmentary disorders, hair and scalp diseases, and autoimmune dermatoses. She is also experienced in performing dermatological procedures with a focus on precision and safety.",
    ],
  },
];

const MILESTONES = [
  { year: "2010", text: "Dr. Vindhya completes her MD in Dermatology at KMC Mangalore." },
  { year: "2014", text: "Sets up the aesthetic clinic at KMC Hospital; completes a dermoscopy fellowship at Cardiff University." },
  { year: "2017", text: "Trains in fractional CO2 laser resurfacing in Milan." },
  { year: "2018", text: "The Skin Clinic opens its doors on Kadri Kambla Road, Mangaluru." },
  { year: "2023", text: "Recognised by IADVL as a centre for observerships in aesthetic dermatology." },
];

function About() {
  return (
    <div className="min-h-screen bg-ivory text-navy">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-20 xl:min-h-[36rem] xl:flex xl:flex-col xl:justify-center">
          <div className="xl:max-w-[44rem]">
            <p className="text-[12.5px] uppercase tracking-[0.4em] opacity-50 mb-8 animate-fade-up">About · Est. 2018</p>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl xl:text-7xl 2xl:text-8xl leading-[0.95] animate-fade-up">
              Simply. Better.
              <br />
              <em className="text-sage">Skin.</em>
            </h1>
            <div className="h-px w-24 bg-sage mt-10 origin-left animate-line-draw" style={{ animationDelay: "0.5s" }} />
            <p className="mt-10 max-w-md text-lg leading-relaxed opacity-75">
              Mangaluru's most-loved family skin clinic — a full-spectrum dermatology practice for every age, from
              everyday concerns to advanced laser and aesthetic care.
            </p>
          </div>
        </div>
        {/* Full-bleed photo: a banner under the text on smaller screens, the right 40% of the hero on wide ones. */}
        <div className="relative aspect-[16/10] overflow-hidden xl:absolute xl:inset-y-0 xl:right-0 xl:aspect-auto xl:w-[40%]">
          <img
            src={clinicHall}
            alt="The bright, airy interior of The Skin Clinic"
            style={{ objectPosition: "60% center" }}
            className="hero-kenburns absolute inset-0 size-full object-cover"
            fetchPriority="high"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/35 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 text-[11.5px] uppercase tracking-[0.35em] text-ivory/90">Kadri Kambla Road · Mangaluru</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-navy/10 bg-mist/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-navy/10">
          {STATS.map((s) => (
            <div key={s.label} className="bg-mist/60 px-6 py-10">
              <p className="font-display text-4xl md:text-[3.5rem] leading-none">{s.value}</p>
              <p className="mt-3 text-[11.5px] uppercase tracking-[0.16em] opacity-70 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 py-28 grid md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-5">
          <img src={drVindhya} alt="Dr. Vindhya A. Pai, founder" className="w-full aspect-[4/5] object-cover object-top" loading="lazy" />
        </div>
        <div className="md:col-span-7">
          <p className="text-[12.5px] uppercase tracking-[0.4em] opacity-50 mb-6">Our story</p>
          <h2 className="font-display text-4xl md:text-[3.5rem] leading-[1.1] mb-8">
            Skin care made for <em className="text-sage">our skin and our climate.</em>
          </h2>
          <p className="text-lg leading-relaxed opacity-80 mb-6">
            The Skin Clinic began with a simple idea: Indian skin needs care that suits it, especially in the humid,
            rainy weather of the coast, and not treatments copied from other countries.
          </p>
          <p className="leading-relaxed opacity-70 mb-10">
            Dr. Vindhya A. Pai started the clinic in 2018, after years of work in skin care and cosmetic medicine.
            We combine proven medical treatment with real listening. Today three dermatologists care for families
            across Mangaluru and the coast.
          </p>
          <ol className="border-l border-navy/15 space-y-6 pl-8">
            {MILESTONES.map((m) => (
              <li key={m.year} className="relative">
                <span className="absolute -left-[37px] top-1.5 size-2.5 rounded-full bg-sage" />
                <span className="font-display text-2xl mr-4">{m.year}</span>
                <span className="text-sm opacity-70">{m.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="bg-navy text-ivory py-28">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-[12.5px] uppercase tracking-[0.4em] opacity-50 mb-6">Why patients choose us</p>
          <h2 className="font-display text-5xl md:text-[4.25rem] leading-[1.05] mb-16 max-w-3xl">
            Considered care, <em className="text-sage">without the rush.</em>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-ivory/10">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-navy p-10">
                <v.icon className="size-6 text-sage mb-8" strokeWidth={1.25} />
                <h3 className="font-display text-2xl mb-4">{v.title}</h3>
                <p className="text-sm opacity-65 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <p className="text-[12.5px] uppercase tracking-[0.4em] opacity-50 mb-6">The team</p>
        <h2 className="font-display text-5xl md:text-[4.25rem] mb-16">
          Three dermatologists.
          <br />
          <em className="text-sage">One promise.</em>
        </h2>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-14">
          {TEAM.map((d, i) => (
            <article key={d.name} className={`grid grid-cols-5 gap-6 group ${TEAM.length % 2 === 1 && i === TEAM.length - 1 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-1.25rem)]" : ""}`}>
              <div className="col-span-2 aspect-[4/5] bg-mist/60 overflow-hidden">
                <img
                  src={d.photo}
                  alt={d.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="col-span-3 flex flex-col justify-center">
                <h3 className="font-display text-2xl leading-tight">{d.name}</h3>
                <p className="text-[11.5px] uppercase tracking-[0.18em] text-sage-dark mt-2">{d.role}</p>
                <p className="text-xs opacity-60 mt-1">{d.quals}</p>
                {d.bio.map((p) => (
                  <p key={p.slice(0, 24)} className="text-sm opacity-75 leading-relaxed mt-4">{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Clinic */}
      <section className="bg-mist/40 py-28">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[12.5px] uppercase tracking-[0.4em] opacity-50 mb-6">Inside the clinic</p>
            <h2 className="font-display text-5xl leading-[1.05] mb-8">
              Designed as a
              <br />
              <em className="text-sage">sanctuary.</em>
            </h2>
            <p className="text-lg leading-relaxed opacity-75 mb-8">
              Soft light, quiet corners and a comfortable, confidential setting, with modern treatment rooms
              behind a welcoming reception. Because clinical excellence doesn't have to feel clinical.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-navy text-ivory px-10 py-4 text-[12.5px] uppercase tracking-[0.25em] hover:bg-sage-dark transition-colors"
            >
              Book a consultation <ArrowRight className="size-3" />
            </Link>
          </div>
          <img src={clinicReception} alt="The welcoming reception at The Skin Clinic" style={{ objectPosition: "30% center" }} className="w-full aspect-square object-cover" loading="lazy" />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
