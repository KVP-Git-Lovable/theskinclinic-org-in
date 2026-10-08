import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./cart-drawer";
import clinicLogo from "@/assets/clinic-logo.png.asset.json";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/treatments", label: "Treatments" },
  { to: "/facilities", label: "Facilities" },
  { to: "/shop", label: "Formula V" },
  { to: "/about", label: "Our doctors" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full bg-clinic-white/95 text-clinic-green font-clinic-body backdrop-blur-md border-b border-clinic-green/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8 lg:gap-12">
          <Link to="/" aria-label="The Skin Clinic home" className="shrink-0">
            <img src={clinicLogo.url} alt="The Skin Clinic" className="w-24 h-16 object-contain" />
          </Link>
          <div className="hidden lg:flex items-center gap-6 text-xs font-medium">
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
        <div className="flex items-center gap-3 md:gap-5">
          <Button asChild variant="outline" className="hidden sm:inline-flex h-9 text-xs border-clinic-green/20 text-clinic-green bg-transparent hover:bg-clinic-mint hover:text-clinic-green shadow-none"><Link to="/portal">Patient Portal</Link></Button>
          <CartDrawer />
          <Button variant="ghost" size="icon" className="lg:hidden hover:bg-clinic-mint hover:text-clinic-green" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="clinic-mobile-menu">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
      </div>
      {menuOpen && <div id="clinic-mobile-menu" className="lg:hidden border-t border-clinic-green/10 bg-clinic-white px-6 py-4"><div className="grid gap-1">{NAV.map(n => <Link key={n.to} to={n.to} onClick={() => setMenuOpen(false)} className="text-sm py-3 border-b border-clinic-green/10">{n.label}</Link>)}<Link to="/portal" onClick={() => setMenuOpen(false)} className="text-sm py-3">Patient Portal</Link></div></div>}
    </nav>
  );
}
