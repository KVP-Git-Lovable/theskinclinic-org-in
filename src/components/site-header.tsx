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
          compact ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-9 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em]">
          <span className="flex items-center gap-2 opacity-90 whitespace-nowrap">
            <Clock className="size-3.5 text-sage shrink-0" strokeWidth={1.5} />
            <span className="hidden sm:inline">Open {CLINIC.hoursDay}</span>
            <span className="sm:hidden">Open daily</span>
            <span className="opacity-40">·</span>
            <span className="hidden sm:inline">{CLINIC.hoursTime}</span>
            <span className="sm:hidden">{CLINIC.hoursTimeCompact}</span>
          </span>
          <span className="flex items-center gap-4">
            <a
              href={CLINIC.phoneHref}
              className="flex items-center gap-2 hover:text-sage transition-colors whitespace-nowrap"
            >
              <Phone className="size-3.5 text-sage shrink-0" strokeWidth={1.5} />
              {CLINIC.phoneDisplay}
            </a>
            <a
              href={CLINIC.whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with us on WhatsApp"
              className="flex items-center gap-2 border border-ivory/25 px-3 py-1 hover:bg-ivory hover:text-navy transition-colors whitespace-nowrap"
            >
              <WhatsAppIcon className="size-3 shrink-0" />
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
            <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium opacity-70">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="hover:opacity-100 transition-opacity"
                  activeProps={{ className: "opacity-100" }}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to="/portal"
              className="hidden sm:inline-block px-5 py-2 border border-navy/20 text-[10px] uppercase tracking-widest hover:bg-navy hover:text-ivory transition-all"
            >
              Patient Portal
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
