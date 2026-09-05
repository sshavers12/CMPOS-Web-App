import type { ReactNode } from "react";
import { InfoIcon } from "./Icons";

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="notice" role="note">
      <InfoIcon />
      <div>{children}</div>
    </div>
  );
}
