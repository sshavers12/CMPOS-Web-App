import { createFileRoute, redirect } from "@tanstack/react-router";

// The before/after presentation lives on the portfolio page.
export const Route = createFileRoute("/before-after")({
  beforeLoad: () => {
    throw redirect({ to: "/portfolio", hash: "before-after" });
  },
});
