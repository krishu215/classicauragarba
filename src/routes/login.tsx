import { createFileRoute } from "@tanstack/react-router";
import { AccountPage } from "@/components/account-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () =>
    seo({
      title: "Login | Classic Aura",
      description: "Sign in with your email and password to see your Classic Aura orders, status and delivery time.",
      path: "/login",
      noindex: true,
    }),
  component: AccountPage,
});
