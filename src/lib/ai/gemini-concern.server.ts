import { concernResultSchema, type ConcernResult } from "@/lib/concern-schema";

const DEFAULT_MODEL = "gemini-2.5-flash";
const TIMEOUT_MS = 25_000;

export class GeminiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Calls Google's Gemini API directly (no extra dependency) and returns a validated concern result. */
export async function runGeminiConcern(opts: {
  apiKey: string;
  model?: string;
  system: string;
  concern: string;
  guideIds: string[];
  signal: AbortSignal;
}): Promise<ConcernResult> {
  const model = opts.model || DEFAULT_MODEL;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": opts.apiKey },
    signal: AbortSignal.any([opts.signal, AbortSignal.timeout(TIMEOUT_MS)]),
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: opts.system }] },
      contents: [{ role: "user", parts: [{ text: opts.concern }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1500,
        responseMimeType: "application/json",
        // Flash models can skip "thinking", which keeps answers fast and cheap.
        ...(/flash/.test(model) ? { thinkingConfig: { thinkingBudget: 0 } } : {}),
        responseSchema: {
          type: "OBJECT",
          properties: {
            introduction: { type: "STRING" },
            guideIds: { type: "ARRAY", items: { type: "STRING", enum: opts.guideIds } },
            questions: { type: "ARRAY", items: { type: "STRING" } },
            consult: { type: "STRING" },
            urgent: { type: "BOOLEAN" },
          },
          required: ["introduction", "guideIds", "questions", "consult", "urgent"],
        },
      },
    }),
  });

  if (!response.ok) throw new GeminiError(response.status, `Gemini returned ${response.status}`);
  const payload = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
    promptFeedback?: { blockReason?: string };
  };
  if (payload.promptFeedback?.blockReason) throw new GeminiError(422, "Request was blocked by the AI safety filter");
  const text = payload.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("") ?? "";
  if (!text) throw new GeminiError(502, "Gemini returned no content");
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new GeminiError(502, "Gemini returned invalid JSON");
  }
  return concernResultSchema.parse({ ...(parsed as object), serverError: null });
}
