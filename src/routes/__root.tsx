import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import appCss from "../styles.css?url";
import { applyTheme, readMode } from "@/lib/theme";

/** Re-applies the saved theme once the page is interactive, so a reload can never fall back to dark. */
function ThemeSync() {
  useEffect(() => {
    applyTheme(readMode());
  }, []);
  return null;
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1b110a" },
    ],
    scripts: [
      {
        children:
          'try{var s=localStorage.getItem("classic-aura-theme");var m=s==="light"||s==="dark"?s:"system";var t=m==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):m;var d=document.documentElement;d.dataset.theme=t;d.dataset.themeMode=m;var c=document.querySelector("meta[name=theme-color]");if(c)c.setAttribute("content",t==="light"?"#f6f0e6":"#1b110a")}catch(e){}',
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&family=Jost:wght@300;400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: () => (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeSync />
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
});
