import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

const FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-ink px-6 text-center text-cream">
      <span className="text-gold" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={1.5} />
      </span>
      <h1 className="font-display text-4xl">Something went wrong</h1>
      <p className="max-w-md text-sm break-words text-mute">
        {import.meta.env.DEV ? errorMessage(error) : "Please reload the page, or go back to the home page."}
      </p>
      <div className="mt-3 flex gap-3">
        <button type="button" className="btn btn-line" onClick={() => window.location.reload()}>
          Reload
        </button>
        <a className="btn btn-solid" href="/">
          Home
        </a>
      </div>
    </main>
  );
}
