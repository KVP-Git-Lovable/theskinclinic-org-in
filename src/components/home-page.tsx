import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Waves, Zap, Heart, Instagram, BadgeCheck, Users, Clock, Phone, Star } from "lucide-react";
import { HomeOpening } from "@/components/home-opening";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CLINIC } from "@/lib/clinic";
import { WhatsAppButton } from "@/components/whatsapp";
import { HeroSlideshow, type HeroSlide } from "@/components/hero-slideshow";
import { VideoGallery } from "@/components/video-gallery";
import { Reveal } from "@/components/reveal";
import hero from "@/assets/hero-portrait.jpg";
import drVindhyaAsset from "@/assets/dr-vindhya-pai.jpg.asset.json";
const drVindhya = drVindhyaAsset.url;
import clinic from "@/assets/clinic-interior.jpg";
import ig1 from "@/assets/ig-1.jpg";
import tourExterior from "@/assets/tour/tour-13.jpg";
import tourTreatmentRoom from "@/assets/tour/tour-15.jpg";
import tourReception from "@/assets/tour/tour-11.jpg";
import ig2 from "@/assets/ig-2.jpg";
import ig3 from "@/assets/ig-3.jpg";
import ig4 from "@/assets/ig-4.jpg";
import ig5 from "@/assets/ig-5.jpg";
import ig6 from "@/assets/ig-6.jpg";


const SERVICES = [
  { icon: Sparkles, title: "Acne & Scar Therapy", body: "Micro-needling, TCA cross, and layered laser protocols for lasting clarity." },
  { icon: Waves, title: "Laser Hair Reduction", body: "US-FDA cleared diode laser tailored to Indian skin tones and hormones." },
  { icon: Zap, title: "Pigmentation & Melasma", body: "Q-Switched Nd:YAG with prescription-grade home care for even, radiant tone." },
  { icon: Heart, title: "Aesthetic Medicine", body: "Botox, fillers, PRP and thread-lift — always subtle, always your face." },
];

const HIGHLIGHTS = [
  { icon: BadgeCheck, value: "Board-Certified", label: "Dermatologist-led care — MD (DVL)" },
  { icon: Zap, value: "Medical-Grade", label: "Clinical lasers & prescription protocols" },
  { icon: Waves, value: "Coastal-Climate", label: "Care tuned for humid Mangalore" },
  { icon: Users, value: "27,000+", label: "Patients cared for since 2018" },
  { icon: Star, value: "4.85 / 5", label: "Average patient feedback" },
];

const HERO_SLIDES: HeroSlide[] = [
  { src: hero, alt: "Portrait of confident, healthy skin", eyebrow: "Medical dermatology", caption: "Skin that feels unmistakably yours." },
  { src: tourExterior, alt: "The Skin Clinic building surrounded by greenery on Kadri Kambla Road, Mangaluru", eyebrow: "Visit us", caption: "A calm clinic in the heart of Mangaluru." },
  { src: tourTreatmentRoom, alt: "A bright, modern treatment room at The Skin Clinic", eyebrow: "Our treatment rooms", caption: "Modern, comfortable care designed around you." },
  { src: tourReception, alt: "The welcoming reception area at The Skin Clinic", eyebrow: "A warm welcome", caption: "No rush. No pressure. Just thoughtful care." },
];

const IG_TILES = [ig1, ig2, ig3, ig4, ig5, ig6];

export function HomePage({ option = 1 }: { option?: 1 | 2 | 3 }) {
  return (
    <div className={`min-h-screen bg-ivory text-navy overflow-x-hidden ${option === 1 ? "" : "home-alternative"}`}>
      <SiteHeader />

      {/* HERO */}
      {option !== 1 ? <HomeOpening option={option} /> : <section className="relative min-h-[92vh] flex items-center">
        <div className="absolute inset-0 grid md:grid-cols-2">
          <div className="bg-mist/30" />
          <div className="relative overflow-hidden hidden md:block">
            <HeroSlideshow slides={HERO_SLIDES} />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 py-32">
          <div className="animate-fade-up">
            <p className="text-[11px] uppercase tracking-[0.4em] opacity-80 mb-8">
              Since 2018 — Mangalore
            </p>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Quiet confidence,<br />
              <em className="text-sage">worn as skin.</em>
            </h1>
            <div className="h-px w-24 bg-sage mt-10 origin-left animate-line-draw" style={{ animationDelay: "0.6s" }} />
            <p className="mt-10 text-lg max-w-md leading-relaxed opacity-75">
              A dermatology practice for people who prefer results that whisper —
              not shout. Board-certified care, medical-grade lasers, and
              considered aesthetic medicine.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group bg-navy text-ivory px-10 py-4 text-[11px] uppercase tracking-[0.25em] flex items-center gap-3 hover:bg-sage-dark transition-colors"
              >
                Book a consultation
                <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/treatments"
                className="px-10 py-4 text-[11px] uppercase tracking-[0.25em] border border-navy/20 hover:bg-navy hover:text-ivory transition-all"
              >
                Explore treatments
              </Link>
            </div>
          </div>
        </div>
      </section>}

      {/* KEY PROMISES — highlighted, scannable */}
      <section className="border-y border-navy/10">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-navy/10">
          {HIGHLIGHTS.map((h) => (
            <div key={h.value} className="bg-mist/60 px-6 py-9 flex flex-col gap-3">
              <h.icon className="size-5 text-sage" strokeWidth={1.25} />
              <p className="font-display text-2xl md:text-[1.75rem] leading-none">{h.value}</p>
              <p className="text-[10px] uppercase tracking-[0.14em] leading-relaxed opacity-85 max-w-[15rem]">
                {h.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OPEN HOURS + DIRECT CONTACT */}
      <section className="bg-navy text-ivory">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
          <div className="flex items-center gap-4">
            <Clock className="size-8 text-sage shrink-0" strokeWidth={1} />
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] opacity-75 mb-2">Clinic hours</p>
              <p className="font-display text-2xl md:text-3xl leading-none">
                {CLINIC.hoursDay} · {CLINIC.hoursTime}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={CLINIC.phoneHref}
              className="group flex items-center gap-3 border border-ivory/25 px-8 py-4 hover:bg-ivory hover:text-navy transition-colors"
            >
              <Phone className="size-4 text-sage shrink-0" strokeWidth={1.5} />
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase tracking-[0.2em] opacity-75 group-hover:opacity-90">
                  Call the clinic
                </span>
                <span className="block font-display text-xl md:text-2xl">{CLINIC.phoneDisplay}</span>
              </span>
            </a>
            <WhatsAppButton label="Chat on WhatsApp" />
          </div>
        </div>
      </section>

      {/* PHILOSOPHY / DOCTOR */}
      <section className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={drVindhya} alt="Dr. Vindhya A. Pai" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">The Founder</p>
          <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">
            Dr. Vindhya A. Pai
            <br />
            <em className="text-sage text-4xl md:text-5xl">MD, Dermatology (DVL)</em>
          </h2>
          <div className="h-px w-16 bg-sage my-8" />
          <p className="text-lg leading-relaxed opacity-80 mb-6">
            "Skin remembers everything. Kindness, most of all." — a phrase Dr. Vindhya
            returns to in every consultation. Trained across some of India's leading
            institutions, she built Tha Skin Clinic in 2018 as a place where evidence
            meets empathy.
          </p>
          <p className="leading-relaxed opacity-70 mb-10">
            Alongside a team of three fellow dermatologists — Dr. Punya Suvarna,
            Dr. P. Suraksha and Dr. Ashwini Ashokan — the practice sees over 1,200
            patients each month across medical dermatology and aesthetic medicine.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] border-b border-navy pb-1 hover:text-sage hover:border-sage transition-colors"
          >
            Meet the team
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-mist/40 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-20 flex-wrap gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">What we do</p>
              <h2 className="font-display text-5xl md:text-6xl max-w-xl leading-[1.05]">
                A quieter, more considered approach to skin.
              </h2>
            </div>
            <Link to="/treatments" className="text-[11px] uppercase tracking-[0.25em] border-b border-navy pb-1 hover:text-sage hover:border-sage transition-colors">
              All treatments →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-navy/10">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="bg-ivory p-10 group hover:bg-navy hover:text-ivory transition-colors duration-500"
              >
                <s.icon className="size-6 mb-8 text-sage group-hover:text-ivory transition-colors" strokeWidth={1} />
                <h3 className="font-display text-2xl mb-4">{s.title}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL / EDUCATION */}
      <section className="bg-navy text-ivory py-32">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-square overflow-hidden">
            <img src={clinic} alt="Tha Skin Clinic interior" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Skin, understood</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05] mb-10">
              Knowledge, generously shared.
            </h2>
            <div className="space-y-8">
              <Fact q="Why does melasma worsen in monsoon?" a="Coastal humidity increases oxidative stress on melanocytes. Antioxidant-forward routines — Vitamin C, niacinamide — matter more than heavy actives." />
              <Fact q="How often should I laser for hair reduction?" a="Every 6–8 weeks for facial, 8–10 weeks for body. Six sessions offer ~85% reduction on Fitzpatrick IV–V skin." />
              <Fact q="Can I start retinol at 25?" a="Yes — a low-strength encapsulated retinol, twice weekly, remains the single most-studied ingredient for prevention." />
            </div>
          </div>
        </div>
      </section>

      {/* SKIN TALKS VIDEOS */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Skin Talks</p>
              <h2 className="font-display text-5xl md:text-6xl leading-[1.05] max-w-2xl">
                Watch, learn, <em className="text-sage">then decide.</em>
              </h2>
            </div>
            <Link to="/blog" className="text-[11px] uppercase tracking-[0.25em] border-b border-navy pb-1 hover:text-sage hover:border-sage transition-colors">
              Read the journal →
            </Link>
          </div>
        </Reveal>
        <VideoGallery />
      </section>

      {/* INSTAGRAM STRIP */}
      <IGStrip />

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-40 text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-8">Begin</p>
        <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
          Skin that feels
          <br />
          <em className="text-sage">unmistakably yours.</em>
        </h2>
        <p className="mt-10 text-lg opacity-75 max-w-lg mx-auto">
          Your first consultation is a conversation — no pressure, no protocol pushed on you.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 bg-navy text-ivory px-12 py-4 mt-12 text-[11px] uppercase tracking-[0.25em] hover:bg-sage-dark transition-colors"
        >
          Book a consultation
          <ArrowRight className="size-3" />
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}

function Fact({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border-b border-ivory/15 pb-6 group"
    >
      <div className="flex justify-between items-center gap-6">
        <span className="font-display text-2xl">{q}</span>
        <span className="text-2xl font-light">{open ? "−" : "+"}</span>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? "max-h-40 mt-4 opacity-70" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm leading-relaxed">{a}</p>
      </div>
    </button>
  );
}

function IGStrip() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);
  return (
    <section className="py-24 border-t border-navy/10">
      <div className="max-w-7xl mx-auto px-6 flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-4">Journal</p>
          <h3 className="font-display text-4xl">@theskinclinic_mangalore</h3>
        </div>
        <a
          href="https://www.instagram.com/theskinclinic_mangalore/"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] uppercase tracking-[0.25em] flex items-center gap-2 hover:text-sage transition-colors"
        >
          <Instagram className="size-4" strokeWidth={1} />
          Follow
        </a>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-2">
        {IG_TILES.map((src, i) => (
          <a
            key={i}
            href="https://www.instagram.com/theskinclinic_mangalore/"
            target="_blank"
            rel="noreferrer"
            className={`aspect-square overflow-hidden bg-mist/30 transition-all duration-1000 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <img src={src} alt="Instagram post" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
          </a>
        ))}
      </div>
    </section>
  );
}
