import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import clinic from "@/assets/clinic-interior.jpg";
import careStillLife from "@/assets/home-care-still-life.jpg";

export function HomeOpening({ option }: { option: 2 | 3 }) {
  const clinicOpening = option === 2;
  return (
    <section className={`home-opening relative isolate flex items-center overflow-hidden ${clinicOpening ? "home-opening-clinic text-navy" : "home-opening-care text-navy"}`}>
      <img
        src={clinicOpening ? clinic : careStillLife}
        alt={clinicOpening ? "A calm dermatology treatment-room setting" : "Clinical skincare still life with a serum bottle and moisturiser jar"}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        width={1600}
        height={1008}
        fetchPriority="high"
      />
      <div className={`absolute inset-0 -z-10 ${clinicOpening ? "bg-ivory/80" : "home-care-overlay"}`} />
      <div className={`mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-20 ${clinicOpening ? "text-center" : ""}`}>
        <div className={clinicOpening ? "mx-auto max-w-3xl" : "max-w-xl"}>
          <p className="mb-7 text-xs font-semibold text-sage-dark">Mangalore · Dermatologist-led care since 2018</p>
          <h1 className="text-4xl font-medium leading-[1.14] md:text-6xl">Tha Skin Clinic</h1>
          <p className="mt-6 text-2xl leading-snug text-sage-dark md:text-3xl">
            {clinicOpening ? "Expert care. A calmer kind of confidence." : "Thoughtful care, for the skin you’re in."}
          </p>
          <p className={`mt-7 max-w-lg text-base leading-relaxed text-navy/80 md:text-lg ${clinicOpening ? "mx-auto" : ""}`}>
            {clinicOpening
              ? "Medical dermatology, considered aesthetic treatments and a team that takes the time to understand you. Led by Dr. Vindhya A. Pai."
              : "From everyday skin concerns to advanced treatments, find dermatologist-led care and Formula V clinical skincare, led by Dr. Vindhya A. Pai."}
          </p>
          <div className={`mt-9 flex flex-wrap gap-3 ${clinicOpening ? "justify-center" : ""}`}>
            <Button asChild size="lg" className="h-12 rounded-sm bg-navy px-6 text-ivory shadow-none hover:bg-sage-dark">
              <Link to="/contact">Book a consultation <ArrowRight /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-sm border-navy/25 bg-ivory/75 px-6 shadow-none">
              <Link to={clinicOpening ? "/treatments" : "/shop"}>{clinicOpening ? "Explore treatments" : "Explore Formula V"}</Link>
            </Button>
          </div>
          <p className={`mt-8 flex items-center gap-2 text-sm text-navy/75 ${clinicOpening ? "justify-center" : ""}`}>
            <BadgeCheck className="size-4 shrink-0 text-sage-dark" />
            Medical dermatology & aesthetic medicine
          </p>
        </div>
      </div>
    </section>
  );
}