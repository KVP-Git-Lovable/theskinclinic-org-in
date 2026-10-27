import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, Phone } from "lucide-react";
import { WhatsAppIcon } from "./whatsapp";
import { CLINIC } from "@/lib/clinic";
import logoAsset from "@/assets/logo.png.asset.json";

const NAV = [
  { to: "/treatments", label: "Treatments" },
  { to: "/skin-ai", label: "Skin AI" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Hours + direct contact — visible at the top of every page */}
      <div
        className={`bg-navy text-ivory overflow-hidden transition-[max-height,opacity] duration-500 ${
          compact ? "max-h-0 opacity-0" : "max-h-14 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-11 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.14em]">
          <span className="flex items-center gap-2 opacity-90 whitespace-nowrap">
            <Clock className="size-4 text-sage shrink-0" strokeWidth={1.5} />
            <span className="hidden sm:inline">Open {CLINIC.hoursDay}</span>
            <span className="sm:hidden">Open Mon–Sat</span>
            <span className="opacity-40">·</span>
            <span className="hidden sm:inline">{CLINIC.hoursTime}</span>
            <span className="sm:hidden">{CLINIC.hoursTimeCompact}</span>
          </span>
          <span className="flex items-center gap-4">
            <a
              href={CLINIC.phoneHref}
              className="group flex items-center gap-2 hover:text-sage transition-colors whitespace-nowrap"
            >
              <Phone className="size-4 text-sage shrink-0" strokeWidth={1.5} />
              {CLINIC.phoneDisplay}
            </a>
            <a
              href={CLINIC.whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="group/wa relative flex items-center gap-2 overflow-hidden border border-ivory/30 px-4 py-1.5 transition-colors duration-300 hover:text-navy whitespace-nowrap before:absolute before:inset-0 before:-z-0 before:origin-left before:scale-x-0 before:bg-ivory before:transition-transform before:duration-300 hover:before:scale-x-100 [&>*]:relative [&>*]:z-10"
            >
              <WhatsAppIcon className="size-3.5 shrink-0 transition-transform duration-300 group-hover/wa:scale-125" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </span>
        </div>
      </div>

      <nav className="w-full bg-ivory/85 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link to="/" aria-label="Tha Skin Clinic — home" className="block">
              <img src={logoAsset.url} alt="The Skin Clinic" className="h-12 w-auto" />
            </Link>
            <div className="hidden md:flex items-center gap-9 text-[13px] uppercase tracking-[0.18em] font-medium">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="relative py-2 opacity-75 transition-opacity hover:opacity-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-sage after:transition-transform after:duration-300 hover:after:scale-x-100"
                  activeProps={{ className: "opacity-100 after:scale-x-100" }}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
