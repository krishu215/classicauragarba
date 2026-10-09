import { drizzle } from "drizzle-orm/netlify-db";
import * as schema from "./schema";

let client: ReturnType<typeof createClient> | null = null;

function createClient() {
  // Connects to this site's Netlify Database automatically (NETLIFY_DB_URL), where the migrations are applied.
  return drizzle({ schema });
}

export function database() {
  if (!client) client = createClient();
  return client;
}
