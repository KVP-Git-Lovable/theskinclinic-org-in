import { Link } from "@tanstack/react-router";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { CLINIC } from "@/lib/clinic";
import logoAsset from "@/assets/logo-white.png.asset.json";

const EXPLORE = [
  { to: "/treatments", label: "Treatments" },
  { to: "/skin-ai", label: "Skin AI" },
  { to: "/about", label: "About & Team" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
  { to: "/contact", hash: "careers", label: "Careers" },
] as const;

const SOCIALS = [
  { href: CLINIC.instagramHref, label: "Instagram", icon: Instagram },
  { href: CLINIC.facebookHref, label: "Facebook", icon: Facebook },
  { href: CLINIC.youtubeHref, label: "YouTube — Skin Talks", icon: Youtube },
] as const;

const linkCls = "opacity-70 hover:opacity-100 hover:text-sage transition-colors";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-ivory border-t border-ivory/10">
      <div className="max-w-7xl mx-auto px-6 py-20 grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Link to="/" aria-label="Tha Skin Clinic — home" className="mb-6 block">
            <img src={logoAsset.url} alt="The Skin Clinic" className="h-16 w-auto" />
          </Link>
          <p className="text-[11px] uppercase tracking-[0.3em] text-sage mb-5">{CLINIC.tagline}</p>
          <p className="max-w-sm opacity-60 text-sm leading-relaxed">
            A family dermatology practice in Mangaluru offering medical dermatology, laser and aesthetic
            medicine — led by Dr. Vindhya A. Pai since 2018.
          </p>
          <div className="mt-8 flex gap-3">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="size-11 border border-ivory/25 flex items-center justify-center hover:bg-ivory hover:text-navy transition-colors"
              >
                <Icon className="size-4" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h5 className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-7">Explore</h5>
          <ul className="space-y-4 text-sm">
            {EXPLORE.map((l) => (
              <li key={l.label}>
                <Link to={l.to} hash={"hash" in l ? l.hash : undefined} className={linkCls}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <h5 className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-7">Visit & contact</h5>
          <ul className="space-y-5 text-sm">
            <li className="flex gap-4">
              <MapPin className="size-4 mt-0.5 shrink-0 text-sage" strokeWidth={1.5} />
              <address className="not-italic opacity-70 leading-relaxed">
                {CLINIC.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
                <a
                  href={CLINIC.mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-[11px] uppercase tracking-[0.2em] text-sage hover:text-ivory transition-colors"
                >
                  Get directions →
                </a>
              </address>
            </li>
            <li className="flex gap-4">
              <Clock className="size-4 mt-0.5 shrink-0 text-sage" strokeWidth={1.5} />
              <span className="opacity-70">
                {CLINIC.hoursDay}
                <br />
                {CLINIC.hoursTime}
              </span>
            </li>
            <li className="flex gap-4">
              <Phone className="size-4 mt-0.5 shrink-0 text-sage" strokeWidth={1.5} />
              <span className="leading-relaxed">
                <a href={CLINIC.phoneHref} className={linkCls}>
                  {CLINIC.phoneDisplay}
                </a>
                <br />
                <a href={CLINIC.phone2Href} className={linkCls}>
                  {CLINIC.phone2Display}
                </a>
              </span>
            </li>
            <li className="flex gap-4">
              <Mail className="size-4 mt-0.5 shrink-0 text-sage" strokeWidth={1.5} />
              <span className="leading-relaxed">
                <a href={`mailto:${CLINIC.email}`} className={`${linkCls} break-all`}>
                  {CLINIC.email}
                </a>
                <br />
                <a href={`mailto:${CLINIC.email2}`} className={`${linkCls} break-all`}>
                  {CLINIC.email2}
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="max-w-7xl mx-auto px-6 pr-24 py-6 flex flex-wrap items-center justify-between gap-4 text-[10px] uppercase tracking-[0.25em] opacity-50">
          <span>© {new Date().getFullYear()} The Skin Clinic, Mangaluru. All rights reserved.</span>
          <nav aria-label="Homepage design previews" className="flex items-center gap-5 normal-case tracking-normal text-xs">
            <span>Preview homepage:</span>
            <Link to="/" activeOptions={{ exact: true }} className="hover:opacity-100 underline-offset-4 hover:underline" activeProps={{ className: "underline" }}>
              Original
            </Link>
            <Link to="/home-option-2" className="hover:opacity-100 underline-offset-4 hover:underline" activeProps={{ className: "underline" }}>
              Option 2
            </Link>
            <Link to="/home-option-3" className="hover:opacity-100 underline-offset-4 hover:underline" activeProps={{ className: "underline" }}>
              Option 3
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
