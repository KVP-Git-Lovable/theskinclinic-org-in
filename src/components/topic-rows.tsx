const ROWS: string[][] = [
  ["Acne & scars", "Pigmentation", "Hair care", "Laser treatments", "Sun protection", "Diet & skin", "Anti-ageing", "Sensitive skin", "Body contouring", "Skin boosters"],
  ["Melasma", "Botox & fillers", "Chemical peels", "Hydrafacial", "Dandruff", "Eczema", "Skincare routines", "Tattoo removal", "Stretch marks", "PRP"],
];
const fade = "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";

/** Two slow rows of topic tags drifting in opposite directions: a quiet moving texture that shows what the journal covers. */
export function TopicRows({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`space-y-3 overflow-hidden ${className}`} style={{ maskImage: fade, WebkitMaskImage: fade }}>
      {ROWS.map((row, r) => (
        <div key={r} className={`flex w-max ${r === 0 ? "ai-marquee" : "ai-marquee-reverse"}`}>
          {[...row, ...row].map((topic, i) => (
            <span key={i} className="mr-3 whitespace-nowrap rounded-full border border-sage/30 bg-background/70 px-5 py-2 text-sm text-navy/80 backdrop-blur">
              {topic}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
