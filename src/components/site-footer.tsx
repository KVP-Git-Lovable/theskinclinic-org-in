import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="bg-navy text-ivory py-24 mt-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <Link to="/" aria-label="Tha Skin Clinic — home" className="mb-8 block">
            <img src={logoAsset.url} alt="The Skin Clinic" className="h-16 w-auto" />
          </Link>
          <p className="max-w-xs opacity-50 text-sm leading-relaxed mb-12">
            A sanctuary for advanced dermatology and aesthetic medicine in the heart of Mangalore —
            led by Dr. Vindhya A. Pai since 2018.
          </p>
          <div className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-40">
            © {new Date().getFullYear()} Tha Skin Clinic. All rights reserved.
          </div>
        </div>
        <div>
          <h5 className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-8">Visit</h5>
          <address className="not-italic text-sm opacity-60 leading-relaxed">
            Kadri Kambla Road<br />
            Mangalore, Karnataka<br />
            575004, India
          </address>
          <p className="mt-4 text-sm opacity-60">
            <a href="tel:+919620123030" className="hover:opacity-100">+91 96201 23030</a>
            <br />
            <a href="tel:+916360753030" className="hover:opacity-100">+91 63607 53030</a>
          </p>
        </div>
        <div>
          <h5 className="text-[11px] uppercase tracking-[0.25em] font-semibold mb-8">Connect</h5>
          <ul className="text-sm opacity-60 space-y-4">
            <li>
              <a
                href="https://www.instagram.com/theskinclinic_mangalore/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-100 transition-opacity"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/919620123030"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-100 transition-opacity"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <Link to="/portal" className="hover:opacity-100 transition-opacity">
                Patient Portal
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:opacity-100 transition-opacity">
                Book Consultation
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
