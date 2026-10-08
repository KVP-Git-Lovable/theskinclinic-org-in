import { z } from "zod";

export const concernResultSchema = z.object({
  introduction: z.string(),
  guideIds: z.array(z.string()),
  questions: z.array(z.string()),
  consult: z.string(),
  urgent: z.boolean(),
  serverError: z.string().nullable(),
});
export type ConcernResult = z.infer<typeof concernResultSchema>;