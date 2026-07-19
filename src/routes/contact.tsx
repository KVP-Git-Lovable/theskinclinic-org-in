import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Consultation | Tha Skin Clinic, Mangalore" },
      {
        name: "description",
        content:
          "Book a dermatology consultation at Tha Skin Clinic, Mangalore. Kadri Kambla Road. Call +91 96201 23030.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Thank you — we'll be in touch within 24 hours.");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen bg-ivory text-navy">
      <SiteHeader />
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-8">Say hello</p>
        <h1 className="font-display text-6xl md:text-8xl leading-[0.95]">
          Let's talk about
          <br />
          <em className="text-sage">your skin.</em>
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32 grid md:grid-cols-12 gap-16">
        <form onSubmit={handleSubmit} className="md:col-span-7 space-y-8">
          <div>
            <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Name</label>
            <input required type="text" className="w-full bg-transparent border-b border-navy/25 py-3 focus:border-sage outline-none transition-colors" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Phone</label>
              <input required type="tel" className="w-full bg-transparent border-b border-navy/25 py-3 focus:border-sage outline-none transition-colors" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Email</label>
              <input required type="email" className="w-full bg-transparent border-b border-navy/25 py-3 focus:border-sage outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Interested in</label>
            <select className="w-full bg-transparent border-b border-navy/25 py-3 focus:border-sage outline-none transition-colors">
              <option>Skin consultation</option>
              <option>Laser hair reduction</option>
              <option>Acne / scar treatment</option>
              <option>Pigmentation / melasma</option>
              <option>Aesthetic / anti-ageing</option>
              <option>Formula V product advice</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Anything else you'd like us to know?</label>
            <textarea rows={4} className="w-full bg-transparent border-b border-navy/25 py-3 focus:border-sage outline-none transition-colors resize-none" />
          </div>
          <button
            type="submit"
            disabled={sent}
            className="bg-navy text-ivory px-12 py-4 text-[11px] uppercase tracking-[0.25em] hover:bg-sage-dark transition-colors disabled:opacity-50"
          >
            {sent ? "Sent — thank you" : "Request appointment"}
          </button>
        </form>

        <aside className="md:col-span-5 space-y-10">
          <Info icon={MapPin} label="Visit us" lines={["Kadri Kambla Road,", "Mangalore, Karnataka 575004"]} />
          <Info icon={Phone} label="Call" lines={["+91 96201 23030", "+91 63607 53030"]} />
          <Info icon={MessageCircle} label="WhatsApp" lines={["+91 96201 23030"]} link="https://wa.me/919620123030" />
          <Info icon={Clock} label="Hours" lines={["Mon–Sat: 10am — 7pm", "Sunday: By appointment"]} />
        </aside>
      </section>

      <SiteFooter />
    </div>
  );
}

function Info({ icon: Icon, label, lines, link }: {
  icon: typeof MapPin; label: string; lines: string[]; link?: string;
}) {
  const content = (
    <>
      <Icon className="size-5 text-sage mb-4" strokeWidth={1} />
      <p className="text-[10px] uppercase tracking-[0.25em] opacity-50 mb-3">{label}</p>
      {lines.map((l) => (
        <p key={l} className="text-lg leading-relaxed">{l}</p>
      ))}
    </>
  );
  if (link) return <a href={link} target="_blank" rel="noreferrer" className="block hover:text-sage transition-colors">{content}</a>;
  return <div>{content}</div>;
}
