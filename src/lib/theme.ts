import { useEffect, useState } from "react";

export type ThemeMode = "system" | "light" | "dark";

export const THEME_KEY = "classic-aura-theme";
const EVENT = "classic-aura-theme-change";
const QUERY = "(prefers-color-scheme: light)";

export function readMode(): ThemeMode {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" || saved === "dark" ? saved : "system";
  } catch {
    return "system";
  }
}

function resolve(mode: ThemeMode): "light" | "dark" {
  if (mode !== "system") return mode;
  return window.matchMedia(QUERY).matches ? "light" : "dark";
}

export function applyTheme(mode: ThemeMode) {
  const theme = resolve(mode);
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.dataset.themeMode = mode;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#f6f0e6" : "#1b110a");
}

export function setMode(mode: ThemeMode) {
  try {
    if (mode === "system") localStorage.removeItem(THEME_KEY);
    else localStorage.setItem(THEME_KEY, mode);
  } catch {
    /* storage unavailable: the choice lasts for this visit only */
  }
  applyTheme(mode);
  window.dispatchEvent(new Event(EVENT));
}

/** Current mode (Auto / Light / Dark). Auto follows the phone or computer setting live. */
export function useThemeMode(): ThemeMode {
  const [mode, setModeState] = useState<ThemeMode>("system");

  useEffect(() => {
    const sync = () => setModeState(readMode());
    sync();
    const media = window.matchMedia(QUERY);
    const onSystemChange = () => {
      if (readMode() === "system") applyTheme("system");
    };
    window.addEventListener(EVENT, sync);
    media.addEventListener("change", onSystemChange);
    return () => {
      window.removeEventListener(EVENT, sync);
      media.removeEventListener("change", onSystemChange);
    };
  }, []);

  return mode;
}
