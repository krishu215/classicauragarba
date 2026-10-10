import { createFileRoute } from "@tanstack/react-router";
import { llmsResponse } from "@/server/seo-files.server";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => llmsResponse(),
    },
  },
});
