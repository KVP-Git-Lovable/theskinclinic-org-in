import { useState } from "react";
import { useObject } from "@ai-sdk/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import { concernResultSchema, type ConcernResult } from "@/lib/concern-schema";
import { medicalTreatments, cosmeticTreatments } from "@/lib/treatments";
import { Button } from "@/components/ui/button";

const allGuides = [...medicalTreatments, ...cosmeticTreatments];
const examples = ["I have recurring breakouts and marks left behind. What should I discuss?", "My scalp has been itchy and flaky for several weeks.", "I'd like to understand options for uneven tone and sensitive skin."];

async function guidanceFetch(input: RequestInfo | URL, init?: RequestInit) {
  const response = await fetch(input, init);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? "Guidance is unavailable. You can still browse the guides or contact the clinic.");
  }
  return response;
}

export function SkinConcernGuide() {
  const [concern, setConcern] = useState("");
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<ConcernResult | null>(null);
  const [notice, setNotice] = useState("");
  const { submit, stop, clear, error, isLoading } = useObject({
    api: "/api/concern", schema: concernResultSchema, fetch: guidanceFetch,
    onFinish: ({ object, error: validationError }) => {
      if (object && !validationError) setResult(object);
      else setNotice("We couldn't prepare a complete result. Please browse the guides or contact the clinic.");
    },
  });
  const reset = () => { stop(); clear(); setResult(null); setConcern(""); setConsent(false); setNotice(""); };
  return (
    <section id="skin-guide" aria-labelledby="skin-guide-heading" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
        <div>
          <p className="flex items-center gap-2 text-xs text-sage-dark mb-5"><Sparkles size={18} strokeWidth={1.5} /> YOUR SKIN, IN YOUR WORDS</p>
          <h2 id="skin-guide-heading" className="font-display text-4xl md:text-5xl leading-tight">Not sure where<br />to begin?<br /><em className="text-sage">Start with a concern.</em></h2>
          <p className="mt-6 leading-relaxed text-muted-foreground max-w-md">Describe what's on your mind. Our AI guide finder suggests useful reading and questions for your appointment—not a diagnosis or a treatment plan.</p>
          <div className="mt-6 flex gap-3 border-t border-border pt-6"><ShieldCheck className="text-sage shrink-0" size={20} /><p className="text-sm leading-relaxed text-muted-foreground">A dermatologist's assessment comes first. AI can make mistakes; don't use it to decide which treatment to have.</p></div>
          <p className="mt-5 text-xs text-muted-foreground leading-relaxed">For breathing trouble, facial swelling, severe blistering, a fast-spreading rash with fever or sudden vision changes, seek urgent medical care. Call 112 in an emergency—don't wait for this tool.</p>
        </div>
        <div className="border border-border bg-mist/20 p-6 md:p-8">
          <form onSubmit={e => { e.preventDefault(); setResult(null); setNotice(""); submit({ concern: concern.trim(), consent }); }}>
            <label htmlFor="skin-concern" className="font-medium text-sm">What would you like help understanding?</label>
            <p id="concern-hint" className="text-sm text-muted-foreground mt-2 mb-4">Tell us what you notice, where it is and how long it's been happening. Please leave out names, phone numbers and other identifying details.</p>
            <textarea id="skin-concern" aria-describedby="concern-hint concern-privacy" required minLength={15} maxLength={2000} disabled={isLoading} value={concern} onChange={e => setConcern(e.target.value)} placeholder="For example: I've had recurring breakouts on my cheeks for three months, and some leave dark marks…" rows={5} className="w-full border border-border bg-background p-4 text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-sage disabled:opacity-60" />
            <p className="text-right text-xs text-muted-foreground mt-1">{concern.length} / 2,000</p>
            <div className="mt-3 flex flex-wrap gap-2">{examples.map((example, i) => <button key={example} type="button" disabled={isLoading} onClick={() => { setConcern(example); setResult(null); setNotice(""); }} className="text-xs border border-border bg-background py-2 px-3 hover:border-sage disabled:opacity-50">{["Breakouts & marks", "Itchy scalp", "Uneven tone"][i]}</button>)}</div>
            <label className="mt-6 flex gap-3 text-xs leading-relaxed text-muted-foreground cursor-pointer"><input type="checkbox" required checked={consent} disabled={isLoading} onChange={e => setConsent(e.target.checked)} className="mt-1 accent-sage shrink-0" /><span id="concern-privacy">I agree to send this description to the AI Gateway for educational guidance. The clinic site does not save my concern or result, and this is not sent to the clinic or added to a patient record. The AI service processes it to respond.</span></label>
            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <Button type="submit" disabled={isLoading || concern.trim().length < 15 || !consent} className="h-12 rounded-none shadow-none">{isLoading ? <><Loader2 size={18} className="animate-spin" /> Finding useful guides…</> : <>Find guides & questions <ArrowRight size={18} /></>}</Button>
              {isLoading ? <Button type="button" variant="ghost" onClick={() => { stop(); setResult(null); setNotice("Request stopped. You can edit your concern and try again."); }}>Stop</Button> : <Button type="button" variant="ghost" onClick={reset}>Clear</Button>}
            </div>
          </form>
          {isLoading && <p role="status" className="mt-4 text-sm text-muted-foreground">Preparing educational suggestions. No diagnosis is being made.</p>}
          {(error || notice) && !isLoading && <p role="alert" className="mt-5 text-sm leading-relaxed border-l-2 border-sage pl-4">{error?.message ?? notice}</p>}
          {result && !isLoading && <div aria-live="polite" className="mt-8 pt-8 border-t border-border space-y-6">
            {result.urgent && <div role="alert" className="flex gap-3 bg-amber-50 border border-amber-200 p-4 text-sm"><AlertTriangle className="shrink-0" size={20} /><div><strong>Seek urgent in-person care</strong><p className="mt-2">{result.consult}</p></div></div>}
            <div><p className="text-xs text-sage-dark mb-3">AI-GENERATED · EDUCATIONAL ONLY</p><h3 className="font-display text-3xl">A starting point for your visit</h3><p className="text-sm leading-relaxed text-muted-foreground mt-3">{result.introduction}</p></div>
            {result.guideIds.length > 0 && <div><h4 className="font-medium text-sm mb-3">Guides you may find useful</h4><div className="space-y-2">{result.guideIds.map(id => { const guide = allGuides.find(g => g.id === id); return guide ? <a key={id} href={`#${id}-trigger`} className="block bg-background border border-border p-4 hover:border-sage"><span className="flex justify-between items-start gap-3 font-display text-xl">{guide.name}<ArrowRight size={17} className="mt-1 shrink-0" /></span><span className="block text-xs text-muted-foreground mt-2">{guide.summary}</span></a> : null; })}</div></div>}
            <div><h4 className="font-medium text-sm mb-3">Questions to bring to the clinic</h4><ul className="list-disc pl-5 space-y-3 text-sm text-muted-foreground leading-relaxed">{result.questions.map((question, i) => <li key={i}>{question}</li>)}</ul></div>
            {!result.urgent && <div className="border-l-2 border-sage pl-4"><h4 className="font-medium text-sm mb-2">Your next step</h4><p className="text-sm leading-relaxed text-muted-foreground">{result.consult}</p></div>}
            <div className="flex flex-wrap gap-5 text-sm"><Link to="/contact" className="text-sage-dark underline underline-offset-4">Contact the clinic</Link><a href="#compare" className="text-sage-dark underline underline-offset-4">Compare related options</a></div>
          </div>}
        </div>
      </div>
    </section>
  );
}