/** Read a required environment variable on the server. Throws a clear error if it is missing. */
export function env(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function optionalEnv(name: string): string | undefined {
  const value = process.env[name];
  return value ? value : undefined;
}

/** Public site URL without a trailing slash. Used for payment return links and emails. */
export function siteUrl(): string {
  return (optionalEnv("SITE_URL") ?? "https://classicauragarba.vercel.app").replace(/\/+$/, "");
}
