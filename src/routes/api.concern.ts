import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/concern")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleConcern } = await import("@/lib/ai/concern.server");
        return handleConcern(request);
      },
    },
  },
});