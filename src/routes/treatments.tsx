import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/treatments")({
  head: () => ({
    meta: [
      { title: "Treatments — Dermatology, Laser & Aesthetics | Tha Skin Clinic" },
      {
        name: "description",
        content:
          "Comprehensive dermatology and aesthetic treatments in Mangalore: acne, pigmentation, laser hair reduction, anti-ageing, botox, fillers, PRP, and more.",
      },
    ],
  }),
  component: Treatments,
});

const CATEGORIES = [
  {
    heading: "Medical Dermatology",
    items: [
      { name: "Acne & Post-Acne Scarring", body: "Root-cause protocols combining prescriptions, chemical peels, subcision and fractional lasers.", price: "From ₹1,200" },
      { name: "Pigmentation & Melasma", body: "Multi-modal care with Q-Switched Nd:YAG, cysteamine, and evidence-based topicals.", price: "From ₹2,500" },
      { name: "Hair Loss & PRP", body: "Trichoscopy-guided diagnosis with GFC / PRP for men and women.", price: "From ₹3,500" },
      { name: "Nail & Skin Infections", body: "Culture-guided antifungal, antibacterial and biopsy-based dermato-pathology care.", price: "From ₹900" },
    ],
  },
  {
    heading: "Laser & Energy Devices",
    items: [
      { name: "Diode Laser Hair Reduction", body: "US-FDA cleared, safe for all Indian skin tones. Six-session protocol.", price: "From ₹1,500 / area" },
      { name: "Q-Switched Nd:YAG Toning", body: "Pigment removal, tattoo removal, skin brightening.", price: "From ₹3,000" },
      { name: "Fractional CO₂ Resurfacing", body: "For acne scars, stretch marks and skin resurfacing.", price: "From ₹6,000" },
      { name: "HIFU & Ultherapy", body: "Non-surgical skin tightening for face, neck and jawline.", price: "From ₹20,000" },
    ],
  },
  {
    heading: "Aesthetic Medicine",
    items: [
      { name: "Botulinum Toxin (Botox)", body: "For dynamic lines, jawline slimming, and hyperhidrosis. Always subtle.", price: "From ₹250 / unit" },
      { name: "Dermal Fillers", body: "Hyaluronic acid — lips, cheeks, tear-trough, chin. Structural, not overdone.", price: "From ₹22,000 / syringe" },
      { name: "Skin Boosters & PRP", body: "Profhilo, Sunekos and PRP for skin quality, glow and hydration.", price: "From ₹15,000" },
      { name: "Thread Lift", body: "PDO threads for jawline, brow, and neck definition.", price: "From ₹35,000" },
    ],
  },
];

function Treatments() {
  return (
    <div className="min-h-screen bg-ivory text-navy">
      <SiteHeader />
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-8">Our practice</p>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.95] max-w-4xl">
          Treatments,
          <br />
          <em className="text-sage">rooted in evidence.</em>
        </h1>
        <p className="mt-10 max-w-2xl text-lg opacity-75 leading-relaxed">
          Every plan starts with a conversation. We diagnose before we treat and
          only recommend what your skin actually needs — nothing more.
        </p>
      </section>

      {CATEGORIES.map((cat) => (
        <section key={cat.heading} className="max-w-7xl mx-auto px-6 pb-24">
          <div className="border-t border-navy/15 pt-12">
            <h2 className="font-display text-4xl mb-12">{cat.heading}</h2>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
              {cat.items.map((t) => (
                <div key={t.name} className="border-b border-navy/10 pb-10">
                  <div className="flex justify-between items-start gap-6 mb-3">
                    <h3 className="font-display text-2xl">{t.name}</h3>
                    <span className="text-xs uppercase tracking-widest opacity-50 whitespace-nowrap mt-2">
                      {t.price}
                    </span>
                  </div>
                  <p className="text-sm opacity-70 leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <SiteFooter />
    </div>
  );
}
