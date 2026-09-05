import { useState } from "react";
import { Button } from "./Buttons";
import { CopyIcon, CheckIcon } from "./Icons";
import { copyText } from "./clipboard";

type Props = { path: string; label: string; tone?: "primary" | "dark" | "light" | "outline" };

export function CopyLinkButton({ path, label, tone = "dark" }: Props) {
  const [state, setState] = useState<"idle" | "done" | "failed">("idle");

  async function onCopy() {
    const url = `${window.location.origin}${path}`;
    const ok = await copyText(url);
    setState(ok ? "done" : "failed");
    window.setTimeout(() => setState("idle"), 2500);
  }

  return (
    <span className="stack" style={{ display: "inline-grid", gap: "0.35rem" }}>
      <Button tone={tone} onClick={onCopy} aria-describedby={`copy-status-${path.replace(/\W/g, "") || "root"}`}>
        {state === "done" ? <CheckIcon /> : <CopyIcon />}
        {state === "done" ? "Link copied" : label}
      </Button>
      <span
        id={`copy-status-${path.replace(/\W/g, "") || "root"}`}
        className={`status ${state === "done" ? "status--ok" : ""}`}
        role="status"
        aria-live="polite"
      >
        {state === "done" ? "The link is on your clipboard." : state === "failed" ? "Copy failed. Select the address bar to copy it." : ""}
      </span>
    </span>
  );
}
