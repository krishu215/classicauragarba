import { createFileRoute } from "@tanstack/react-router";
import { sitemapResponse } from "@/server/seo-files.server";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => sitemapResponse(),
    },
  },
});
