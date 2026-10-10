/** Run slow work (like sending email) after the response has gone out, so the customer never waits for it. */
export function background(task: Promise<unknown>) {
  const safe = task.catch((cause) => console.error("[background]", cause));
  try {
    // Vercel keeps the function alive until this finishes. (Same hook the @vercel/functions package uses, without needing the package.)
    const context = (globalThis as Record<symbol, { get?: () => { waitUntil?: (promise: Promise<unknown>) => void } | undefined } | undefined>)[
      Symbol.for("@vercel/request-context")
    ];
    context?.get?.()?.waitUntil?.(safe);
  } catch {
    // Not on Vercel: the promise still runs, it just is not guaranteed to finish after the response.
  }
}
