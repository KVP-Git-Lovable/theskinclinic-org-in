import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Columns2 } from "lucide-react";
import { medicalTreatments, cosmeticTreatments } from "@/lib/treatments";
import { comparisonGroups, comparisonNotes } from "@/lib/treatment-comparisons";

const allGuides = [...medicalTreatments, ...cosmeticTreatments];
const selectClass = "w-full bg-background border border-border px-3 py-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-sage transition-shadow hover:border-sage/60";

export function TreatmentComparison() {
  const [groupId, setGroupId] = useState(comparisonGroups[0].id);
  const [left, setLeft] = useState(comparisonGroups[0].ids[0]);
  const [right, setRight] = useState(comparisonGroups[0].ids[1]);
  const group = comparisonGroups.find(g => g.id === groupId)!;
  const changeGroup = (id: string) => {
    const next = comparisonGroups.find(g => g.id === id)!;
    setGroupId(id); setLeft(next.ids[0]); setRight(next.ids[1]);
  };
  return (
    <section id="compare" aria-labelledby="compare-heading" className="scroll-mt-24 bg-mist/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-center gap-3 text-sage-dark text-xs mb-5"><Columns2 size={18} strokeWidth={1.5} /> UNDERSTAND THE DIFFERENCE</div>
        <h2 id="compare-heading" className="font-display text-4xl md:text-5xl">Two options. <em className="text-sage">A clearer picture.</em></h2>
        <p className="mt-5 text-muted-foreground max-w-2xl leading-relaxed">Medical care addresses skin health. Cosmetic care may improve appearance. Related options are not necessarily alternatives—and you may not need a procedure at all.</p>
        <div className="grid md:grid-cols-3 gap-5 mt-8">
          <label className="text-sm">Your skin concern<select value={groupId} onChange={e => changeGroup(e.target.value)} className={`${selectClass} mt-2`}>{comparisonGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}</select></label>
          <label className="text-sm">Choose a treatment<select value={left} onChange={e => setLeft(e.target.value)} className={`${selectClass} mt-2`}>{group.ids.filter(id => id !== right).map(id => <option key={id} value={id}>{allGuides.find(g => g.id === id)?.name}</option>)}</select></label>
          <label className="text-sm">Compare with<select value={right} onChange={e => setRight(e.target.value)} className={`${selectClass} mt-2`}>{group.ids.filter(id => id !== left).map(id => <option key={id} value={id}>{allGuides.find(g => g.id === id)?.name}</option>)}</select></label>
        </div>
        <div aria-live="polite" className="grid md:grid-cols-2 mt-8 gap-5">
          {[left, right].map(id => {
            const guide = allGuides.find(g => g.id === id)!;
            const notes = comparisonNotes[id];
            return <article key={id} className="ai-rise bg-background border border-border rounded-2xl p-6 md:p-8 min-w-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sage/15">
              <p className="text-xs text-sage-dark mb-3">{medicalTreatments.some(g => g.id === id) ? "MEDICAL DERMATOLOGY" : "COSMETIC CARE"}</p>
              <h3 className="font-display text-3xl leading-tight min-h-16">{guide.name}</h3>
              <dl className="mt-6 divide-y divide-border">
                {[["Purpose", notes.purpose], ["What to expect", notes.expect], ["When to consult the clinic", notes.consult]].map(([label, text]) => <div key={label} className="py-5"><dt className="font-medium text-sm mb-2">{label}</dt><dd className="text-sm leading-relaxed text-muted-foreground">{text}</dd></div>)}
              </dl>
              <a href={`#${id}-trigger`} className="text-sm text-sage-dark underline underline-offset-4 inline-flex items-center gap-2 mt-3">Read the full guide <ArrowRight size={15} /></a>
            </article>;
          })}
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground">This comparison is for learning, not personalised treatment selection. Recovery and results vary; confirm suitability, exact methods and local availability with your dermatologist.</p>
          <Link to="/contact" className="shrink-0 text-sm text-sage-dark inline-flex gap-2 items-center">Discuss your options <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}