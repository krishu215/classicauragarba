import { waitUntil } from "@vercel/functions";

/** Run slow work (like sending email) after the response has gone out, so the customer never waits for it. */
export function background(task: Promise<unknown>) {
  const safe = task.catch((cause) => console.error("[background]", cause));
  try {
    waitUntil(safe);
  } catch {
    // Not on Vercel: the promise still runs, it just is not guaranteed to finish after the response.
  }
}
