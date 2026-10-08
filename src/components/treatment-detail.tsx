import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface TreatmentInfo {
  id: string;
  name: string;
  summary: string;
  overview: string;
  care: string;
  expectations: string;
}

export function TreatmentDetail({ treatment, index }: { treatment: TreatmentInfo; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `${treatment.id}-details`;
  const triggerId = `${treatment.id}-trigger`;
  return (
    <article className="border-b border-border">
      <h3>
        <Button
          id={triggerId}
          variant="ghost"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(!open)}
          className="group h-auto w-full justify-start items-start gap-4 rounded-none px-0 py-7 text-left whitespace-normal hover:bg-transparent hover:text-sage-dark"
        >
          <span className="mt-2 w-6 shrink-0 font-body text-xs text-muted-foreground tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex-1 min-w-0">
            <span className="block font-display text-2xl md:text-3xl leading-tight">{treatment.name}</span>
            <span className="mt-2 block font-body text-sm font-normal leading-relaxed text-muted-foreground">{treatment.summary}</span>
          </span>
          <span className="mt-2 shrink-0 text-sage">{open ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}</span>
        </Button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!open} className="pl-10 pr-4 pb-8 md:pr-10">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <div><h4 className="mb-2 font-body font-medium text-base text-foreground">Understanding your concern</h4><p>{treatment.overview}</p></div>
          <div><h4 className="mb-2 font-body font-medium text-base text-foreground">Care options to discuss</h4><p>{treatment.care}</p></div>
          <div className="border-l-2 border-sage pl-5"><h4 className="mb-2 font-body font-medium text-base text-foreground">What to expect</h4><p>{treatment.expectations}</p></div>
        </div>
        <Button asChild variant="link" className="h-auto px-0 mt-6 whitespace-normal text-sage-dark">
          <Link to="/contact">Discuss {treatment.name.toLowerCase()} <ArrowRight aria-hidden="true" /></Link>
        </Button>
      </div>
    </article>
  );
}