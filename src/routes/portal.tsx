import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Patient Portal | Tha Skin Clinic" },
      {
        name: "description",
        content:
          "Sign in to your patient portal to view visit history, prescriptions, and treatment plans.",
      },
      { property: "og:title", content: "Patient Portal | Tha Skin Clinic" },
      { property: "og:description", content: "Sign in to your patient portal to view visit history, prescriptions, and treatment plans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portal,
});

function Portal() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast("Patient Portal launches soon.", {
      description: "We'll notify you at your registered contact.",
    });
  };
  return (
    <div className="min-h-screen bg-ivory text-navy flex flex-col">
      <SiteHeader />
      <section className="flex-1 grid md:grid-cols-2">
        <div className="bg-mist/30 hidden md:flex items-end p-16">
          <div>
            <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Your care, in one place</p>
            <h2 className="font-display text-5xl leading-[1.05] max-w-md">
              Every visit,
              <br />
              <em className="text-sage">every prescription.</em>
            </h2>
            <p className="mt-8 max-w-sm opacity-75">
              Coming soon — access your consultation notes, prescriptions and
              personalised routines from any device.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8 md:p-16">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <Lock className="size-6 text-sage mb-6" strokeWidth={1} />
            <p className="text-[11px] uppercase tracking-[0.4em] opacity-50 mb-6">Patient Portal</p>
            <h1 className="font-display text-4xl mb-10">Welcome back.</h1>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Phone or Patient ID</label>
                <input className="w-full bg-transparent border-b border-navy/25 py-3 focus:border-sage outline-none transition-colors" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest opacity-60 mb-2 block">Password</label>
                <input type="password" className="w-full bg-transparent border-b border-navy/25 py-3 focus:border-sage outline-none transition-colors" />
              </div>
            </div>
            <button
              type="submit"
              className="mt-10 w-full bg-navy text-ivory h-12 text-[11px] uppercase tracking-[0.25em] hover:bg-sage-dark transition-colors"
            >
              Sign in
            </button>
            <p className="mt-6 text-xs opacity-60 text-center">
              New patient?{" "}
              <Link to="/contact" className="border-b border-navy/40 hover:text-sage hover:border-sage">
                Book your first visit
              </Link>
            </p>
            <p className="mt-8 text-[10px] uppercase tracking-widest opacity-40 text-center">
              Portal launching Q3 · Verified secure
            </p>
          </form>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
