import { useEffect, useState, type CSSProperties } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, AlertTriangle, Loader2, Check } from "lucide-react";
import { concernResultSchema, type ConcernResult } from "@/lib/concern-schema";
import { medicalTreatments, cosmeticTreatments } from "@/lib/treatments";
import { Button } from "@/components/ui/button";
import { AiOrb } from "@/components/ai-orb";

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

/** Types the text out as if the AI were writing it; shows it at once for screen readers and reduced motion. */
function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(text.length); return; }
    setShown(0);
    const id = window.setInterval(() => setShown(n => { if (n >= text.length) { window.clearInterval(id); return n; } return n + 2; }), 18);
    return () => window.clearInterval(id);
  }, [text]);
  return <><span className="sr-only">{text}</span><span aria-hidden="true">{text.slice(0, shown)}{shown < text.length && <span className="ai-blink ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-sage-dark" />}</span></>;
}

const reveal = (i: number) => ({ "--ai-delay": `${i * 110}ms` }) as CSSProperties;

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
  const fill = Math.min(100, (concern.length / 2000) * 100);
  return (
    <section id="skin-guide" aria-labelledby="skin-guide-heading" className="scroll-mt-24 max-w-7xl mx-auto px-6 py-16 md:py-24">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="flex items-center gap-2 text-xs text-sage-dark mb-5"><Sparkles size={18} strokeWidth={1.5} /> YOUR SKIN, IN YOUR WORDS</p>
          <h2 id="skin-guide-heading" className="font-display text-4xl md:text-5xl leading-tight">Not sure where<br />to begin?<br /><em className="bg-gradient-to-r from-sage via-sage-dark to-sage bg-clip-text text-transparent">Start with a concern.</em></h2>
          <p className="mt-6 leading-relaxed text-muted-foreground max-w-md">Describe what's on your mind. Our AI guide finder suggests useful reading and questions for your appointment—not a diagnosis or a treatment plan.</p>
          <div className="mt-6 flex gap-3 rounded-xl border border-sage/20 bg-mist/40 p-4"><ShieldCheck className="text-sage shrink-0" size={20} /><p className="text-sm leading-relaxed text-muted-foreground">A dermatologist's assessment comes first. AI can make mistakes; don't use it to decide which treatment to have.</p></div>
          <p className="mt-5 text-xs text-muted-foreground leading-relaxed">For breathing trouble, facial swelling, severe blistering, a fast-spreading rash with fever or sudden vision changes, seek urgent medical care. Call 112 in an emergency—don't wait for this tool.</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-sage/25 bg-gradient-to-br from-background via-mist/30 to-sage/10 p-6 md:p-8 shadow-2xl shadow-sage/10">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-sage/20 blur-3xl ai-float-slow" />
          <form className="relative" onSubmit={e => { e.preventDefault(); setResult(null); setNotice(""); submit({ concern: concern.trim(), consent }); }}>
            <div className="flex items-start gap-4">
              <AiOrb className="size-12 mt-0.5" busy={isLoading} />
              <div>
                <label htmlFor="skin-concern" className="font-medium">What would you like help understanding?</label>
                <p id="concern-hint" className="text-sm text-muted-foreground mt-2">Tell us what you notice, where it is and how long it's been happening. Please leave out names, phone numbers and other identifying details.</p>
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-border bg-background/80 backdrop-blur transition-shadow focus-within:border-sage focus-within:shadow-lg focus-within:shadow-sage/20">
              <textarea id="skin-concern" aria-describedby="concern-hint concern-privacy" required minLength={15} maxLength={2000} disabled={isLoading} value={concern} onChange={e => setConcern(e.target.value)} placeholder="For example: I've had recurring breakouts on my cheeks for three months, and some leave dark marks…" rows={5} className="w-full rounded-xl bg-transparent p-4 text-sm leading-relaxed resize-y focus:outline-none disabled:opacity-60" />
              <div className="flex items-center gap-3 px-4 pb-3">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-mist"><div className="h-full rounded-full bg-gradient-to-r from-sage to-sage-dark transition-all duration-300" style={{ width: `${fill}%` }} /></div>
                <p className="text-xs text-muted-foreground tabular-nums">{concern.length} / 2,000</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">{examples.map((example, i) => <button key={example} type="button" disabled={isLoading} onClick={() => { setConcern(example); setResult(null); setNotice(""); }} className="group inline-flex items-center gap-1.5 rounded-full border border-sage/30 bg-background py-2 pl-3 pr-4 text-xs transition-all hover:-translate-y-0.5 hover:border-sage hover:bg-mist/60 hover:shadow-md disabled:opacity-50"><Sparkles size={13} className="text-sage transition-transform group-hover:rotate-12" />{["Breakouts & marks", "Itchy scalp", "Uneven tone"][i]}</button>)}</div>
            <label className="mt-6 flex gap-3 rounded-xl border border-border bg-background/60 p-4 text-xs leading-relaxed text-muted-foreground cursor-pointer transition-colors hover:border-sage/40"><input type="checkbox" required checked={consent} disabled={isLoading} onChange={e => setConsent(e.target.checked)} className="mt-1 accent-sage shrink-0" /><span id="concern-privacy">I agree to send this description to the AI Gateway for educational guidance. The clinic site does not save my concern or result, and this is not sent to the clinic or added to a patient record. The AI service processes it to respond.</span></label>
            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <Button type="submit" disabled={isLoading || concern.trim().length < 15 || !consent} className="group h-12 rounded-full px-7 bg-gradient-to-r from-navy to-sage-dark shadow-lg shadow-sage/30 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:shadow-none">{isLoading ? <><Loader2 size={18} className="animate-spin" /> Finding useful guides…</> : <>Find guides & questions <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></>}</Button>
              {isLoading ? <Button type="button" variant="ghost" className="rounded-full" onClick={() => { stop(); setResult(null); setNotice("Request stopped. You can edit your concern and try again."); }}>Stop</Button> : <Button type="button" variant="ghost" className="rounded-full" onClick={reset}>Clear</Button>}
            </div>
          </form>
          {isLoading && <div className="relative mt-8 rounded-xl border border-sage/20 bg-background/70 p-5">
            <div className="flex items-center gap-4">
              <AiOrb className="size-10" busy />
              <p role="status" className="text-sm text-muted-foreground">Preparing educational suggestions. No diagnosis is being made.</p>
              <span aria-hidden className="ml-auto flex gap-1.5">{[0, 1, 2].map(i => <span key={i} className="ai-dot size-2 rounded-full bg-sage" style={reveal(i * 2)} />)}</span>
            </div>
            <div aria-hidden className="mt-5 space-y-3">{[92, 78, 60].map(w => <div key={w} className="ai-shimmer h-3 rounded-full bg-gradient-to-r from-mist via-white to-mist" style={{ width: `${w}%` }} />)}</div>
          </div>}
          {(error || notice) && !isLoading && <p role="alert" className="relative mt-5 rounded-r-xl border-l-2 border-sage bg-mist/40 py-3 pl-4 pr-3 text-sm leading-relaxed">{error?.message ?? notice}</p>}
          {result && !isLoading && <div aria-live="polite" className="relative mt-8 pt-8 border-t border-border space-y-6">
            {result.urgent && <div role="alert" className="ai-rise flex gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm"><AlertTriangle className="shrink-0" size={20} /><div><strong>Seek urgent in-person care</strong><p className="mt-2">{result.consult}</p></div></div>}
            <div className="ai-rise" style={reveal(0)}><p className="inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1 text-xs text-sage-dark mb-3"><Sparkles size={12} /> AI-GENERATED · EDUCATIONAL ONLY</p><h3 className="font-display text-3xl">A starting point for your visit</h3><p className="text-sm leading-relaxed text-muted-foreground mt-3 min-h-16"><Typewriter text={result.introduction} /></p></div>
            {result.guideIds.length > 0 && <div className="ai-rise" style={reveal(1)}><h4 className="font-medium text-sm mb-3">Guides you may find useful</h4><div className="space-y-3">{result.guideIds.map((id, i) => { const guide = allGuides.find(g => g.id === id); return guide ? <a key={id} href={`/treatments#${id}-trigger`} className="ai-rise group flex gap-4 rounded-xl bg-background border border-border p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-sage hover:shadow-lg hover:shadow-sage/15" style={reveal(i + 2)}><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mist font-display text-lg text-sage-dark">{i + 1}</span><span className="min-w-0 flex-1"><span className="flex justify-between items-start gap-3 font-display text-xl">{guide.name}<ArrowRight size={17} className="mt-1 shrink-0 transition-transform group-hover:translate-x-1" /></span><span className="block text-xs text-muted-foreground mt-2">{guide.summary}</span></span></a> : null; })}</div></div>}
            <div className="ai-rise" style={reveal(3)}><h4 className="font-medium text-sm mb-3">Questions to bring to the clinic</h4><ul className="space-y-3 text-sm text-muted-foreground leading-relaxed">{result.questions.map((question, i) => <li key={i} className="ai-rise flex gap-3 rounded-xl bg-background/70 border border-border p-3" style={reveal(i + 4)}><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-dark"><Check size={12} strokeWidth={2.5} /></span>{question}</li>)}</ul></div>
            {!result.urgent && <div className="ai-rise rounded-xl border border-sage/25 bg-gradient-to-br from-mist/60 to-background p-5" style={reveal(5)}><h4 className="font-medium text-sm mb-2">Your next step</h4><p className="text-sm leading-relaxed text-muted-foreground">{result.consult}</p></div>}
            <div className="ai-rise flex flex-wrap gap-5 text-sm" style={reveal(6)}><Link to="/contact" className="text-sage-dark underline underline-offset-4">Contact the clinic</Link><a href="#compare" className="text-sage-dark underline underline-offset-4">Compare related options</a></div>
          </div>}
        </div>
      </div>
    </section>
  );
}
