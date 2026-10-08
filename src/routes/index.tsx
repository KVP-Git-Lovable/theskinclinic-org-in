import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowDown, ArrowUpRight, ShieldCheck, Sparkles, ScanLine, MessageCircle, Instagram, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { storefrontApiRequest, STOREFRONT_QUERY, formatINR, type ShopifyProduct } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { clinicTeam } from "@/lib/clinic-team";
import { clinicServices } from "@/lib/clinic-services";
import clinicLogo from "@/assets/clinic-logo.png.asset.json";
import clinic from "@/assets/clinic-treatment-room.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Skin Clinic, Mangalore | Dr. Vindhya Pai & Team" },
      {
        name: "description",
        content:
          "Doctor-led medical dermatology and aesthetic care in Mangalore. Meet Dr. Vindhya A. Pai and her team, explore clinic treatments and facilities, and book a consultation.",
      },
      { property: "og:title", content: "The Skin Clinic, Mangalore | Dr. Vindhya Pai & Team" },
      { property: "og:description", content: "Personalised dermatology and aesthetic care, led by Dr. Vindhya A. Pai. Explore our doctors, treatments and technologies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { data, isError } = useQuery({
    queryKey: ["home-products"],
    queryFn: async () => {
      const res = await storefrontApiRequest(STOREFRONT_QUERY, { first: 4, query: null });
      return (res?.data?.products?.edges ?? []) as ShopifyProduct[];
    },
  });
  const founder = clinicTeam[0];
  if (!founder) return null;

  return (
    <div className="clinic-page min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative bg-clinic-mint overflow-hidden">
          <img src={clinic.url} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-15" fetchPriority="high" />
          <div className="absolute inset-0 clinic-hero-wash" />
          <div className="relative max-w-5xl mx-auto px-6 py-10 md:py-12 flex flex-col items-center text-center animate-fade-up">
            <img src={clinicLogo.url} alt="The Skin Clinic" className="w-24 h-16 object-contain mb-3" />
            <h1 className="text-2xl md:text-3xl">The Skin Clinic</h1>
            <p className="text-xs mt-3 mb-6 text-clinic-green/65">Doctor-led dermatology · Mangalore</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl leading-[1.15] max-w-4xl">Advanced dermatology<br className="hidden sm:block" /> for <span className="font-normal border-b-2 border-clinic-butterfly">healthy, confident skin.</span></h2>
            <div className="mt-7 mb-6 flex flex-col items-center">
              <div className="relative"><img src={founder.image} alt={founder.name} className="size-24 rounded-full object-cover border-4 border-clinic-white" /><span className="absolute bottom-0 right-0 size-6 rounded-full bg-clinic-butterfly border-2 border-clinic-white flex items-center justify-center"><Check size={12} aria-hidden="true" /></span></div>
              <p className="font-clinic-display font-semibold mt-3 text-base">{founder.name}</p><p className="text-xs text-clinic-green/65 mt-1">{founder.role} · {founder.credentials}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Button asChild size="lg" className="bg-clinic-green text-clinic-white hover:bg-clinic-green/90 rounded-full h-12 shadow-none px-8"><Link to="/contact">Book a consultation <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline" className="border-clinic-green/20 bg-transparent text-clinic-green hover:bg-clinic-white/60 rounded-full h-12 px-8 shadow-none"><Link to="/treatments" hash="clinic-services">Explore treatments</Link></Button>
            </div>
          </div>
          <a href="#care" aria-label="Explore care options" className="absolute bottom-8 right-8 hidden lg:flex size-10 rounded-full border border-clinic-green/20 items-center justify-center"><ArrowDown size={16} /></a>
        </section>

        <section id="care" className="max-w-7xl mx-auto px-6 py-14 md:py-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row justify-between gap-5 md:items-end"><div><p className="text-xs text-clinic-green/60 mb-4">Care that starts with you</p><h2 className="text-3xl md:text-4xl">What brings you in?</h2></div><p className="text-sm max-w-md leading-relaxed text-clinic-green/70">A skin concern, a change you've noticed or an appearance goal. Start with an assessment, then understand your options.</p></div>
          <div className="grid md:grid-cols-3 gap-8 mt-10 border-t border-clinic-green/15">{[
            { icon: ShieldCheck, title: "Skin, hair & nail health", body: "Rashes, itching, breakouts, hair loss and changing skin spots.", to: "/treatments" as const, hash: "medical" },
            { icon: Sparkles, title: "Cosmetic care", body: "Pigmentation, texture, unwanted hair and age-related changes.", to: "/treatments" as const, hash: "cosmetic" },
            { icon: ScanLine, title: "Facilities & technologies", body: "Understand the technologies used in selected treatment plans.", to: "/facilities" as const, hash: "" },
          ].map(item => <Link key={item.title} to={item.to} hash={item.hash} className="py-7 border-b border-clinic-green/15 group"><item.icon size={25} strokeWidth={1.5} className="mb-5" /><h3 className="text-lg flex justify-between gap-3">{item.title}<ArrowUpRight className="size-5 shrink-0" /></h3><p className="text-sm mt-3 leading-relaxed text-clinic-green/65">{item.body}</p></Link>)}</div>
        </section>

        <section className="bg-clinic-mint"><div className="max-w-7xl mx-auto px-6 py-14 md:py-20 grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20">
          <div><p className="text-xs text-clinic-green/60 mb-4">Treatments, explained</p><h2 className="text-3xl md:text-4xl leading-tight">Good decisions begin<br />with understanding.</h2><p className="text-sm mt-6 leading-relaxed max-w-md text-clinic-green/70">Read about the services listed by our clinic, what they aim to address and the questions worth asking before you decide.</p><Link to="/treatments" hash="clinic-services" className="inline-flex items-center gap-2 underline underline-offset-4 text-sm mt-7">All clinic services <ArrowRight size={16} /></Link></div>
          <div className="border-t border-clinic-green/15">{["clinical-dermatology", "hair-loss", "laser-hair-reduction", "melasma", "anti-ageing-treatment", "pregnancy-dermatoses"].map(slug => { const service = clinicServices.find(s => s.slug === slug); return service ? <Link key={slug} to="/services/$slug" params={{ slug }} className="flex items-start justify-between gap-5 py-5 border-b border-clinic-green/15"><div><h3 className="text-base">{service.name}</h3><p className="text-xs leading-relaxed text-clinic-green/65 mt-2">{service.summary}</p></div><ArrowUpRight className="size-4 shrink-0 mt-1" /></Link> : null; })}</div>
        </div></section>

        <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <p className="text-xs text-clinic-green/60 mb-4">Your dermatology team</p><h2 className="text-3xl md:text-4xl">Expertise with a personal approach.</h2>
          <div className="grid md:grid-cols-[300px_1fr] gap-8 lg:gap-16 mt-10 items-center"><img src={founder.image} alt={founder.name} className="w-full max-w-[300px] aspect-square object-cover" loading="lazy" /><div><p className="text-xs text-clinic-green/60 mb-3">{founder.role}</p><h3 className="text-2xl md:text-3xl">{founder.name}</h3><p className="mt-3 text-sm">{founder.credentials}</p><p className="mt-5 text-sm leading-relaxed text-clinic-green/70 max-w-xl">{founder.description}</p><Link to="/about" className="inline-flex items-center gap-2 underline underline-offset-4 text-sm mt-6">Meet our doctors <ArrowRight size={16} /></Link></div></div>
          <div className="grid sm:grid-cols-3 gap-7 mt-12 pt-10 border-t border-clinic-green/15">{clinicTeam.slice(1).map(doctor => <article key={doctor.name} className="flex flex-col"><img src={doctor.image} alt={doctor.name} className="w-full max-w-[300px] aspect-square object-cover mb-5" loading="lazy" /><h3 className="text-base">{doctor.name}</h3><p className="text-xs mt-2 text-clinic-green/65">{doctor.credentials}</p><p className="text-xs mt-1 text-clinic-green/65">{doctor.role}</p></article>)}</div>
        </section>

        <section className="bg-clinic-green text-clinic-white"><div className="max-w-7xl mx-auto px-6 py-14 md:py-20"><div className="flex flex-col md:flex-row justify-between gap-7 md:items-end"><div><p className="text-xs text-clinic-butterfly mb-4">Facilities & technology</p><h2 className="text-3xl md:text-4xl max-w-2xl">Technology matters.<br />The right assessment matters more.</h2></div><Button asChild variant="outline" className="bg-transparent text-clinic-white border-clinic-white/30 hover:bg-clinic-white hover:text-clinic-green h-12 shadow-none"><Link to="/facilities">Explore our facilities <ArrowRight /></Link></Button></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">{[["lumenis-legend-pro", "Lumenis Legend Pro", "Selected skin-quality and rejuvenation plans."], ["smoothglo", "SmoothGlo", "A combined approach to tone and texture."], ["emface", "Emface", "Non-invasive facial treatment options."], ["emsculpt-neo", "Emsculpt NEO", "Selected body-contouring treatment plans."]].map(([slug, name, body]) => <Link key={slug} to="/facilities/$slug" params={{ slug }} className="border-t border-clinic-white/25 pt-5"><h3 className="text-base flex justify-between gap-3">{name}<ArrowUpRight size={16} /></h3><p className="text-xs mt-3 leading-relaxed text-clinic-white/70">{body}</p></Link>)}</div><p className="text-xs mt-8 text-clinic-white/65">Availability, suitability, risks and expected outcomes are discussed during consultation.</p></div></section>

        <section className="max-w-7xl mx-auto px-6 py-14 md:py-20"><div className="grid md:grid-cols-2 gap-10"><div><MessageCircle strokeWidth={1.5} className="mb-5" /><h2 className="text-3xl">Not sure where to start?</h2><p className="text-sm text-clinic-green/70 mt-5 max-w-md leading-relaxed">Describe your concern for educational reading suggestions and questions to bring to your appointment. No diagnosis or treatment selection.</p><Link to="/treatments" hash="skin-guide" className="inline-flex mt-6 gap-2 underline underline-offset-4 text-sm">Find useful guides <ArrowRight size={16} /></Link></div><div className="md:border-l md:border-clinic-green/15 md:pl-10"><ScanLine strokeWidth={1.5} className="mb-5" /><h2 className="text-3xl">Understand the difference.</h2><p className="text-sm text-clinic-green/70 mt-5 max-w-md leading-relaxed">Compare related medical and cosmetic options by purpose, what to expect and when a clinic assessment should come first.</p><Link to="/treatments" hash="compare" className="inline-flex mt-6 gap-2 underline underline-offset-4 text-sm">Compare care options <ArrowRight size={16} /></Link></div></div></section>

        <section className="bg-clinic-mint"><div className="max-w-7xl mx-auto px-6 py-14 md:py-20"><div className="flex flex-wrap justify-between items-end gap-6 mb-8"><div><p className="text-xs text-clinic-green/60 mb-3">Formula V</p><h2 className="text-3xl md:text-4xl">Continue your skin-care conversation.</h2><p className="mt-4 text-sm text-clinic-green/70">Explore our skincare collection. Ask the clinic what fits your routine.</p></div><Link to="/shop" className="text-sm inline-flex items-center gap-2 underline underline-offset-4">Shop Formula V <ArrowRight size={16} /></Link></div><div className="grid sm:grid-cols-2 gap-5">{data?.slice(0, 4).map(p => <Link key={p.node.id} to="/product/$handle" params={{ handle: p.node.handle }} className="bg-clinic-white border border-clinic-green/10 p-4 flex gap-5 items-center">{p.node.images.edges[0] && <img src={p.node.images.edges[0].node.url} alt={p.node.title} className="size-24 object-cover shrink-0" loading="lazy" />}<div className="min-w-0"><h3 className="text-sm leading-relaxed">{p.node.title}</h3><p className="text-xs mt-3 text-clinic-green/65">{formatINR(p.node.priceRange.minVariantPrice.amount)}</p></div><ArrowUpRight size={16} className="ml-auto shrink-0" /></Link>)}</div>{!data && !isError && <p role="status" className="text-sm mt-6">Loading the skincare collection…</p>}{isError && <p className="text-sm mt-6">The collection couldn't load right now. <Link to="/shop" className="underline">Visit the shop</Link> or contact us for help.</p>}</div></section>

        <section className="max-w-5xl mx-auto px-6 py-14 md:py-20 text-center"><p className="text-xs text-clinic-green/60 mb-4">Your first visit</p><h2 className="text-3xl md:text-4xl">A conversation. An assessment.<br />A plan you understand.</h2><p className="mt-5 text-sm text-clinic-green/70 max-w-xl mx-auto leading-relaxed">Tell us what concerns you. We'll discuss your history, assess your skin and explain possible next steps, alternatives and aftercare.</p><Button asChild className="bg-clinic-green text-clinic-white hover:bg-clinic-green/90 rounded-full h-12 px-8 mt-7 shadow-none"><Link to="/contact">Book a consultation <ArrowRight /></Link></Button><a href="https://www.instagram.com/theskinclinic_mangalore/" target="_blank" rel="noreferrer" className="flex justify-center items-center gap-2 text-xs mt-8 text-clinic-green/65"><Instagram size={15} /> Follow @theskinclinic_mangalore</a></section>
      </main>
      <SiteFooter />
    </div>
  );
}

