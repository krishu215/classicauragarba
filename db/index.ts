import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let sqlClient: ReturnType<typeof postgres> | null = null;

function databaseUrl(): string {
  const url = process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "Missing database connection string: set SUPABASE_DB_URL (or DATABASE_URL).",
    );
  }
  return url;
}

export function database() {
  if (!sqlClient) {
    sqlClient = postgres(databaseUrl(), {
      ssl: "require",
      max: 1,
      prepare: false,
      connect_timeout: 10,
      idle_timeout: 20,
    });
  }
  return drizzle({ client: sqlClient, schema });
}
