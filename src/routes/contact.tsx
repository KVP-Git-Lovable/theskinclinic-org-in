import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowUpRight, Briefcase, CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { CLINIC } from "@/lib/clinic";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Careers | The Skin Clinic, Mangaluru" },
      {
        name: "description",
        content:
          "Book a dermatology consultation or join our team at The Skin Clinic, Mangaluru. Vyasa Rao Road, Kadri Kambla Road. Call +91 96201 23030.",
      },
      { property: "og:title", content: "Contact & Careers | The Skin Clinic, Mangaluru" },
      { property: "og:description", content: "Book a consultation, find us on the map, or explore careers at The Skin Clinic, Mangaluru." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

const QUICK = [
  { icon: Phone, label: "Call us", value: CLINIC.phoneDisplay, href: CLINIC.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: CLINIC.whatsappHref },
  { icon: Mail, label: "Email", value: CLINIC.email, href: `mailto:${CLINIC.email}` },
  { icon: MapPin, label: "Directions", value: "Open in Google Maps", href: CLINIC.mapHref },
] as const;

const FIND_US = ["Google search", "Instagram", "Facebook", "YouTube", "Friend or family", "Passed by the clinic", "Other"];

const field =
  "peer w-full bg-transparent border-b border-navy/25 pt-6 pb-2 outline-none transition-colors focus:border-sage placeholder-transparent";
const floating =
  "pointer-events-none absolute left-0 top-1.5 text-[10px] uppercase tracking-widest opacity-60 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-sage peer-focus:opacity-100";

function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Hidden honeypot field: real visitors never fill it in, bots usually do.
    if (String(data.get("website") ?? "").trim() !== "") {
      setSent(true);
      form.reset();
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_enquiries").insert({
      name: String(data.get("name") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      interest: String(data.get("interest") ?? "") || null,
      source: String(data.get("source") ?? "") || null,
      message: String(data.get("message") ?? "").trim() || null,
    });
    setSubmitting(false);
    if (error) {
      console.error("[contact] enquiry not saved", error.message);
      toast.error(`Sorry, we couldn't send that. Please call ${CLINIC.phoneDisplay} or message us on WhatsApp.`);
      return;
    }
    setSent(true);
    toast.success("Thank you — we'll be in touch within 24 hours.");
    form.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-ivory text-navy overflow-x-hidden">
      <SiteHeader />

      {/* Hero */}
      <section className="relative max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div aria-hidden className="pointer-events-none absolute -top-16 right-0 size-[26rem] rounded-full bg-sage/20 blur-3xl animate-pulse motion-reduce:animate-none" />
        <p className="relative text-[11px] uppercase tracking-[0.4em] opacity-50 mb-8 animate-fade-up">Contact us</p>
        <h1 className="relative font-display text-6xl md:text-8xl leading-[0.95] animate-fade-up">
          Let's talk about
          <br />
          <em className="text-sage">your skin.</em>
        </h1>
        <div className="relative h-px w-24 bg-sage mt-10 origin-left animate-line-draw" style={{ animationDelay: "0.5s" }} />
      </section>

      {/* Quick actions */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK.map((q, i) => (
            <Reveal key={q.label} delay={i * 80}>
              <a
                href={q.href}
                target={q.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group relative block h-full overflow-hidden border border-navy/15 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-navy before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-navy before:transition-transform before:duration-500 hover:before:scale-y-100 hover:text-ivory"
              >
                <span className="relative z-10 block">
                  <q.icon className="size-7 text-sage mb-8 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.25} />
                  <span className="block text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2">{q.label}</span>
                  <span className="flex items-center justify-between gap-2 font-display text-xl break-all">
                    {q.value}
                    <ArrowUpRight className="size-4 shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Form + map */}
      <section className="max-w-7xl mx-auto px-6 pb-28 grid lg:grid-cols-12 gap-14">
        <Reveal className="lg:col-span-6">
          <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-4">Drop a line</p>
          <h2 className="font-display text-4xl md:text-5xl mb-10">Book a consultation</h2>
          <form onSubmit={handleSubmit} className="space-y-7">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="relative">
              <input id="name" name="name" required maxLength={120} type="text" placeholder="Name" autoComplete="name" className={field} />
              <label htmlFor="name" className={floating}>May I know your name?</label>
            </div>
            <div className="grid sm:grid-cols-2 gap-7">
              <div className="relative">
                <input id="phone" name="phone" required minLength={5} maxLength={30} type="tel" placeholder="Phone" autoComplete="tel" className={field} />
                <label htmlFor="phone" className={floating}>Phone number</label>
              </div>
              <div className="relative">
                <input id="email" name="email" required maxLength={200} type="email" placeholder="Email" autoComplete="email" className={field} />
                <label htmlFor="email" className={floating}>Email address</label>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-7">
              <div>
                <label htmlFor="interest" className="text-[10px] uppercase tracking-widest opacity-60 block">Interested in</label>
                <select id="interest" name="interest" className="w-full bg-transparent border-b border-navy/25 py-3 outline-none transition-colors focus:border-sage">
                  <option>Skin consultation</option>
                  <option>Laser hair reduction</option>
                  <option>Acne / scar treatment</option>
                  <option>Pigmentation / melasma</option>
                  <option>Aesthetic / anti-ageing</option>
                </select>
              </div>
              <div>
                <label htmlFor="source" className="text-[10px] uppercase tracking-widest opacity-60 block">How did you find us?</label>
                <select id="source" name="source" className="w-full bg-transparent border-b border-navy/25 py-3 outline-none transition-colors focus:border-sage">
                  {FIND_US.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="relative">
              <textarea id="message" name="message" maxLength={2000} rows={4} placeholder="Message" className={`${field} resize-none`} />
              <label htmlFor="message" className={floating}>Anything else you'd like us to know?</label>
            </div>
            <button
              type="submit"
              disabled={sent || submitting}
              className="group relative inline-flex items-center gap-3 overflow-hidden bg-navy text-ivory px-12 py-4 text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-sage-dark before:transition-transform before:duration-500 hover:before:scale-x-100 [&>*]:relative [&>*]:z-10"
            >
              {submitting ? (
                <>Sending…</>
              ) : sent ? (
                <>
                  <CheckCircle2 className="size-4" /> Sent — thank you
                </>
              ) : (
                <>
                  Request appointment <Send className="size-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                </>
              )}
            </button>
          </form>
        </Reveal>

        <Reveal className="lg:col-span-6" delay={150}>
          <div className="group relative aspect-[4/3] overflow-hidden border border-navy/15 shadow-sm">
            <iframe
              title="The Skin Clinic on Google Maps"
              src={CLINIC.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0 grayscale-[60%] transition-all duration-700 group-hover:grayscale-0"
              allowFullScreen
            />
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-px bg-navy/10 border border-navy/10">
            <div className="bg-ivory p-7">
              <MapPin className="size-5 text-sage mb-4" strokeWidth={1.25} />
              <p className="text-[10px] uppercase tracking-[0.25em] opacity-50 mb-3">Visit us</p>
              {CLINIC.addressLines.map((l) => (
                <p key={l} className="leading-relaxed">{l}</p>
              ))}
              <a href={CLINIC.mapHref} target="_blank" rel="noreferrer" className="mt-3 inline-block text-[11px] uppercase tracking-[0.2em] text-sage-dark hover:text-navy transition-colors">
                Get directions →
              </a>
            </div>
            <div className="bg-ivory p-7">
              <Clock className="size-5 text-sage mb-4" strokeWidth={1.25} />
              <p className="text-[10px] uppercase tracking-[0.25em] opacity-50 mb-3">Hours</p>
              <p className="leading-relaxed">{CLINIC.hoursDay}</p>
              <p className="leading-relaxed">{CLINIC.hoursTime}</p>
              <p className="mt-3 text-sm opacity-60">{CLINIC.phoneDisplay} · {CLINIC.phone2Display}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Careers */}
      <section id="careers" className="scroll-mt-24 bg-navy text-ivory py-28 relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-24 size-[30rem] rounded-full bg-sage/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Careers</p>
            <h2 className="font-display text-5xl md:text-6xl leading-[1.05]">
              Join our <em className="text-sage">team.</em>
            </h2>
            <div className="h-px w-16 bg-sage my-8" />
            <p className="leading-relaxed opacity-75">
              The Skin Clinic brings the latest technology and state-of-the-art equipment to skin care and cosmetic
              treatments. Our experienced, qualified doctors and caring staff are why patients keep coming back.
            </p>
            <p className="mt-5 leading-relaxed opacity-75">Want to join us? Send your CV, or call to talk it through.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${CLINIC.careersEmail}?subject=Application%20-%20The%20Skin%20Clinic`}
                className="group inline-flex items-center gap-3 bg-ivory text-navy px-8 py-4 text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-sage hover:text-ivory hover:-translate-y-0.5"
              >
                <Mail className="size-4" /> Email your CV
              </a>
              <a
                href={CLINIC.phoneHref}
                className="inline-flex items-center gap-3 border border-ivory/30 px-8 py-4 text-[11px] uppercase tracking-[0.25em] transition-colors hover:bg-ivory hover:text-navy"
              >
                <Phone className="size-4" /> {CLINIC.phoneDisplay}
              </a>
            </div>
            <p className="mt-6 text-sm opacity-60">{CLINIC.careersEmail}</p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={150}>
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-50 mb-5">Current openings</p>
            <article className="group border border-ivory/15 p-8 md:p-10 transition-all duration-500 hover:border-sage hover:bg-ivory/5">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center border border-ivory/20 text-sage transition-transform duration-500 group-hover:rotate-6">
                    <Briefcase className="size-5" strokeWidth={1.25} />
                  </span>
                  <div>
                    <h3 className="font-display text-3xl">Dermatosurgeon</h3>
                    <p className="text-[10px] uppercase tracking-[0.25em] opacity-50 mt-1">Mangaluru · Full time</p>
                  </div>
                </div>
              </div>
              <p className="mt-8 text-[11px] uppercase tracking-[0.25em] opacity-60 mb-4">Requirements</p>
              <ul className="space-y-3">
                {[
                  "MD in Dermatology, Venereology and Leprology",
                  "Fellowship in dermatosurgery and hair transplant",
                  "Proficiency with dermatological tools",
                  "Excellent written and verbal communication",
                  "Good interpersonal skills",
                ].map((r) => (
                  <li key={r} className="flex gap-3 leading-relaxed opacity-85">
                    <CheckCircle2 className="size-4 mt-1 shrink-0 text-sage" strokeWidth={1.5} />
                    {r}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${CLINIC.careersEmail}?subject=Application%20-%20Dermatosurgeon`}
                className="mt-9 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] border-b border-ivory/60 pb-1 transition-colors hover:text-sage hover:border-sage"
              >
                Apply for this role <ArrowUpRight className="size-3.5" />
              </a>
            </article>
            <p className="mt-5 text-sm opacity-55">
              Don't see your role? Send us your CV anyway; we're always glad to meet caring, skilled people.
            </p>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
