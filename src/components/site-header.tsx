import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./cart-drawer";
import logoAsset from "@/assets/logo.png.asset.json";

const NAV = [
  { to: "/treatments", label: "Treatments" },
  { to: "/skin-ai", label: "Skin AI" },
  { to: "/shop", label: "Formula V" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-ivory/85 backdrop-blur-md border-b border-border">
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
          <CartDrawer />
        </div>
      </div>
    </nav>
  );
}
